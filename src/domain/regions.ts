import { opens } from './kinds';
import type { Anchor, CivilDate, Playbook } from './types';

/** A country, and within Canada a province: what decides whose rules a plan follows. */
export interface Where {
  country?: string;
  province?: string;
}

/** Countries with plans. */
export const COUNTRIES = [
  { code: 'CA', name: 'Canada' },
  { code: 'CN', name: 'China' },
];

export const PROVINCES = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' },
];

const COUNTRY_NAMES: Record<string, string> = {
  canada: 'CA',
  china: 'CN',
  'united states': 'US',
};

export const provinceName = (code?: string) => PROVINCES.find(p => p.code === code)?.name;
export const countryName = (code?: string) =>
  Object.entries(COUNTRY_NAMES).find(([, c]) => c === code)?.[0].replace(/\b\w/g, l => l.toUpperCase()) ?? code;

/** "Burnaby" or "British Columbia" or "China". */
export const whereName = (w: Where) => provinceName(w.province) ?? countryName(w.country);

/** Whose rules a plan carries: "Ontario", "China". */
export const rulesName = (pb: Playbook) => provinceName(pb.province) ?? countryName(pb.country);

const CJK = /[一-鿿]/;

/**
 * "Vancouver, British Columbia, Canada" → CA/BC. A place typed in Chinese with
 * no country ("进贤谢家村") is taken as China.
 */
export function whereOf(location?: string): Where {
  if (!location) return {};
  const parts = location.split(',').map(s => s.trim().toLowerCase());
  const country = COUNTRY_NAMES[parts[parts.length - 1]] ?? (CJK.test(location) ? 'CN' : undefined);
  const province =
    country === 'CA' ? PROVINCES.find(p => parts.includes(p.name.toLowerCase()))?.code : undefined;
  return { country, province };
}

/** Kept for places that only care about the province. */
export const provinceOf = (location?: string) => whereOf(location).province;

/** Dates that say where someone lives; a wedding or a trip abroad doesn't. */
const RESIDENCE_KINDS = new Set(['born', 'migrated', 'moved-city', 'home-bought']);

/** The latest date so far that says where they live and has a known place. */
export const residenceOf = (anchors: Anchor[], now: CivilDate): Anchor | undefined =>
  [...anchors]
    .filter(a => a.date <= now && RESIDENCE_KINDS.has(a.kind) && whereOf(a.location).country)
    .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

/** Set by hand, or else where they last moved to (or were born). */
export function livesIn(set: Where | undefined, anchors: Anchor[], now: CivilDate): Where {
  if (set?.country) return set;
  return whereOf(residenceOf(anchors, now)?.location);
}

/** A plan fits unless its country or province is known to differ. */
export const fits = (pb: Playbook, w: Where) =>
  (!pb.country || !w.country || pb.country === w.country) &&
  (!pb.province || !w.province || pb.province === w.province);

/** The same life stage for somewhere else, if one ships. */
export function twinFor(pb: Playbook, w: Where, all: Playbook[]): Playbook | undefined {
  if (!pb.family || !w.country || fits(pb, w)) return undefined;
  const candidates = all.filter(x => x.family === pb.family && x.country === w.country && fits(x, w));
  return candidates.find(x => x.province === w.province) ?? candidates[0];
}

/**
 * Whose rules a plan on this date follows. A wedding or a due date follows
 * where it happens; a Born date drives plans for years, so where they live now
 * wins over the birthplace.
 */
export function whereAt(anchor: Pick<Anchor, 'kind' | 'location'> | undefined, lives: Where): Where {
  if (!anchor) return lives;
  const here = whereOf(anchor.location);
  if (anchor.kind === 'born') return lives.country ? lives : here;
  if (!here.country) return lives;
  return here.province || here.country !== lives.country ? here : { ...here, province: lives.province };
}

/** Why: "lives in British Columbia", "Married in Ontario", "lives in China". */
export function whereWhy(anchor: Pick<Anchor, 'kind' | 'label' | 'location'> | undefined, lives: Where): string {
  const at = whereAt(anchor, lives);
  const here = whereOf(anchor?.location);
  const fromEvent = anchor && anchor.kind !== 'born' && here.country && here.country === at.country;
  return fromEvent ? `${anchor!.label} in ${whereName(at)}` : `lives in ${whereName(at)}`;
}

/**
 * What decided where a plan's date counts: the date's own place, "Lives in"
 * set by hand, or the latest move. The event, when there is one, can be edited.
 */
export function decidedBy(
  anchor: Pick<Anchor, 'kind' | 'location'> | undefined,
  set: Where | undefined,
  anchors: Anchor[],
  now: CivilDate,
): { event?: Anchor; byHand?: boolean } {
  if (anchor && anchor.kind !== 'born' && whereOf(anchor.location).country) return { event: anchor as Anchor };
  if (set?.country) return { byHand: true };
  return { event: residenceOf(anchors, now) ?? (anchor?.location ? (anchor as Anchor) : undefined) };
}

/** Plans a date opens: the ones whose country and province fit where it counts. */
export const plansFor = (anchor: Pick<Anchor, 'kind' | 'location'>, lives: Where, playbooks: Playbook[]) =>
  playbooks.filter(pb => opens(anchor.kind, pb) && fits(pb, whereAt(anchor, lives)));
