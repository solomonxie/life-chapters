import { opens } from './kinds';
import type { Anchor, CivilDate, Playbook } from './types';

/** A country, and within Canada a province: what decides whose rules a plan follows. */
export interface Where {
  country?: string;
  province?: string;
}

/** Countries with plans; after Canada and China, the ones with only visa plans. */
export const COUNTRIES = [
  { code: 'CA', name: 'Canada' },
  { code: 'CN', name: 'China' },
  { code: 'US', name: 'United States' },
  { code: 'PH', name: 'Philippines' },
  { code: 'JP', name: 'Japan' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'SCHENGEN', name: 'Schengen area (Europe)' },
];

/** One short-stay visa covers them all; a plan with country 'SCHENGEN' fits any of them. */
const SCHENGEN = new Set([
  'AT', 'BE', 'BG', 'HR', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IT', 'LV', 'LI', 'LT',
  'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH',
]);

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

/** Last part of a place label → ISO code, as the city list names countries. */
const COUNTRY_NAMES: Record<string, string> = {
  canada: 'CA',
  china: 'CN',
  'united states': 'US',
  philippines: 'PH',
  japan: 'JP',
  'united kingdom': 'GB',
  austria: 'AT',
  belgium: 'BE',
  bulgaria: 'BG',
  croatia: 'HR',
  czechia: 'CZ',
  denmark: 'DK',
  estonia: 'EE',
  finland: 'FI',
  france: 'FR',
  germany: 'DE',
  greece: 'GR',
  hungary: 'HU',
  iceland: 'IS',
  italy: 'IT',
  latvia: 'LV',
  liechtenstein: 'LI',
  lithuania: 'LT',
  luxembourg: 'LU',
  malta: 'MT',
  'the netherlands': 'NL',
  netherlands: 'NL',
  norway: 'NO',
  poland: 'PL',
  portugal: 'PT',
  romania: 'RO',
  slovakia: 'SK',
  slovenia: 'SI',
  spain: 'ES',
  sweden: 'SE',
  switzerland: 'CH',
};

export const provinceName = (code?: string) => PROVINCES.find(p => p.code === code)?.name;
export const countryName = (code?: string) =>
  COUNTRIES.find(c => c.code === code)?.name ??
  Object.entries(COUNTRY_NAMES).find(([, c]) => c === code)?.[0].replace(/\b\w/g, l => l.toUpperCase()) ??
  code;

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

/** Where they last moved to (or were born), from the places on their events. */
export const livesIn = (anchors: Anchor[], now: CivilDate): Where =>
  whereOf(residenceOf(anchors, now)?.location);

const sameCountry = (plan: string, place: string) =>
  plan === place || (plan === 'SCHENGEN' && SCHENGEN.has(place));

/** A plan fits unless its country or province is known to differ. */
export const fits = (pb: Playbook, w: Where) =>
  (!pb.country || !w.country || sameCountry(pb.country, w.country)) &&
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
 * The event that decided where a plan's date counts: the date's own place,
 * or else the latest move. Editing its Place is how to change it.
 */
export function decidedBy(
  anchor: Pick<Anchor, 'kind' | 'location'> | undefined,
  anchors: Anchor[],
  now: CivilDate,
): Anchor | undefined {
  if (anchor && anchor.kind !== 'born' && whereOf(anchor.location).country) return anchor as Anchor;
  return residenceOf(anchors, now) ?? (anchor?.location ? (anchor as Anchor) : undefined);
}

/** Whose passport they hold, as far as the app can tell: the country they were born in. */
export const citizenOf = (anchors: Anchor[]): string | undefined =>
  whereOf(anchors.find(a => a.kind === 'born')?.location).country;

/** Where they lived just before an event: what a plan about leaving is matched against. */
export const livedBefore = (anchor: Pick<Anchor, 'date'> & { id?: string }, anchors: Anchor[]): Where =>
  livesIn(anchors.filter(a => a.id !== anchor.id && a.date < anchor.date), anchor.date);

/** Whose rules a plan on this date follows: where it counts, or for a plan about leaving, where they left. */
export const whereFor = (pb: Playbook, anchor: Anchor | undefined, lives: Where, anchors: Anchor[]): Where =>
  pb.leaving && anchor ? livedBefore(anchor, anchors) : whereAt(anchor, lives);

/**
 * Plans a date opens: the ones whose country and province fit where it
 * counts, or, for a plan about leaving (emigrating, a trip out), where they
 * lived before it — and then only when the event takes them somewhere else.
 */
export function plansFor(
  anchor: Pick<Anchor, 'kind' | 'location'> & Partial<Pick<Anchor, 'id' | 'date'>>,
  lives: Where,
  playbooks: Playbook[],
  anchors: Anchor[] = [],
): Playbook[] {
  const here = whereAt(anchor, lives);
  const before = anchor.date ? livedBefore(anchor as Anchor, anchors) : lives;
  const passport = citizenOf(anchors);
  return playbooks.filter(pb => {
    if (!opens(anchor.kind, pb)) return false;
    if (pb.citizen && anchor.kind === 'trip' && passport && pb.citizen !== passport) return false;
    if (pb.citizen && pb.citizen === here.country) return false;
    if (!pb.leaving) return fits(pb, here);
    return !!before.country && fits(pb, before) && here.country !== before.country;
  });
}
