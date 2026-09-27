/**
 * The kinds of date a person can enter. A playbook names one of these as its
 * `anchorKind`; an anchor of that kind is what "unlocks" it.
 */
export interface AnchorKind {
  id: string;
  label: string;
  group: 'Life' | 'Moving' | 'Family' | 'School' | 'Work';
  /** What the chapter starting at this date is called on the Timeline. */
  chapter: string;
  /** How a place or detail reads with this kind; `{}` is the detail. */
  withDetail?: string;
}

export const ANCHOR_KINDS: AnchorKind[] = [
  { id: 'born', label: 'Born', group: 'Life', chapter: 'Growing up' },
  { id: 'graduated', label: 'Graduated', group: 'School', chapter: 'Early career' },
  { id: 'school-start', label: 'Starts primary school', group: 'School', chapter: 'School years', withDetail: '{} starts primary school' },
  { id: 'first-job', label: 'First job', group: 'Work', chapter: 'Working' },
  { id: 'new-job', label: 'New job', group: 'Work', chapter: 'New role' },
  { id: 'retire', label: 'Retire', group: 'Work', chapter: 'Retirement' },
  { id: 'migrated', label: 'Migrated to a country', group: 'Moving', chapter: 'Settling in', withDetail: 'Migrated to {}' },
  { id: 'moved-city', label: 'Moved city', group: 'Moving', chapter: 'New city', withDetail: 'Moved to {}' },
  { id: 'visa-granted', label: 'Visa granted', group: 'Moving', chapter: 'On a visa' },
  { id: 'visa-lodge', label: 'Lodge a visa application', group: 'Moving', chapter: 'Applying' },
  { id: 'married', label: 'Married', group: 'Family', chapter: 'Married life' },
  { id: 'child-born', label: 'Child born', group: 'Family', chapter: 'Young family', withDetail: '{} born' },
  { id: 'home-bought', label: 'Bought a home', group: 'Family', chapter: 'Homeowner' },
];

export const kindById = (id: string): AnchorKind | undefined =>
  ANCHOR_KINDS.find(k => k.id === id);

export const kindLabel = (id: string): string => kindById(id)?.label ?? id;

/** "Migrated to Australia", "Born · Xi'an", or just the label. */
export function anchorTitle(kind: string, label: string, detail?: string): string {
  if (!detail) return label;
  const k = kindById(kind);
  if (k?.withDetail && label === k.label) return k.withDetail.replace('{}', detail);
  return `${label} · ${detail}`;
}
