export interface Place {
  name: string;
  zh: string;
  admin: string;
  country: string;
  /** 0 is the most populous. */
  rank: number;
}

interface Indexed extends Place {
  key: string;
  where: string;
}

const fold = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

let index: Indexed[] | null = null;

/** Parsed on first search, not at launch; the list is a few hundred KB. */
function places(): Indexed[] {
  if (index) return index;
  const { CITIES, REGIONS } = require('../content/cities') as typeof import('../content/cities');
  const regions = REGIONS.split('\n').map(r => r.split('\t'));
  index = CITIES.split('\n').map((row, rank) => {
    const [name, region, zh] = row.split('\t');
    const [admin, country] = regions[Number(region)];
    return { name, zh, admin, country, rank, key: fold(name), where: fold(`${admin} ${country}`) };
  });
  return index;
}

export const placeLabel = (p: Pick<Place, 'name' | 'admin' | 'country'>) =>
  [p.name, p.admin !== p.name ? p.admin : '', p.country].filter(Boolean).join(', ');

/** The town alone, for tight rows: "Toronto" from "Toronto, Ontario, Canada". */
export const placeShort = (label: string) => label.split(',')[0].trim();

/**
 * Prefix matches first, then word starts, then anywhere; bigger places first
 * within each. "london, on" narrows by region or country after the comma.
 */
export function searchPlaces(query: string, limit = 8): Place[] {
  const [head, ...rest] = query.split(',');
  const needle = fold(head.trim());
  const within = fold(rest.join(' ').trim());
  if (!needle) return [];
  const scored: { p: Indexed; score: number }[] = [];
  for (const p of places()) {
    if (within && !p.where.includes(within)) continue;
    let score = -1;
    if (p.key.startsWith(needle) || (p.zh && p.zh.startsWith(head.trim()))) score = 0;
    else if (p.key.includes(` ${needle}`) || p.key.includes(`-${needle}`)) score = 1;
    else if (p.key.includes(needle) || (p.zh && p.zh.includes(head.trim()))) score = 2;
    if (score >= 0) scored.push({ p, score });
  }
  return scored
    .sort((a, b) => a.score - b.score || a.p.rank - b.p.rank)
    .slice(0, limit)
    .map(({ p }) => ({ name: p.name, zh: p.zh, admin: p.admin, country: p.country, rank: p.rank }));
}
