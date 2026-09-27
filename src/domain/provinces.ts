import type { Anchor, CivilDate, Playbook } from './types';

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

export const provinceName = (code?: string) => PROVINCES.find(p => p.code === code)?.name;

/** "Vancouver, British Columbia, Canada" → "BC"; anything outside Canada → undefined. */
export function provinceOf(location?: string): string | undefined {
  if (!location || !/canada/i.test(location)) return undefined;
  const parts = location.split(',').map(s => s.trim().toLowerCase());
  return PROVINCES.find(p => parts.includes(p.name.toLowerCase()))?.code;
}

/** Set by hand, or else where their latest event so far happened. */
export function livesIn(set: string | undefined, anchors: Anchor[], now: CivilDate): string | undefined {
  if (set) return set;
  return [...anchors]
    .filter(a => a.date <= now)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(a => provinceOf(a.location))
    .find(Boolean);
}

/** A Canada-wide plan fits anyone; a provincial one fits its province, or anyone while it's unknown. */
export const fitsProvince = (pb: Playbook, province?: string) =>
  !pb.province || !province || pb.province === province;

/** The same life stage for another province, if one ships. */
export const twinFor = (pb: Playbook, province: string | undefined, all: Playbook[]) =>
  province && pb.family && pb.province !== province
    ? all.find(x => x.family === pb.family && x.province === province)
    : undefined;
