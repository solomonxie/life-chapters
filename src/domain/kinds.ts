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
  /** A dated moment on the line that doesn't start a new chapter: a visit. */
  moment?: boolean;
}

export const ANCHOR_KINDS: AnchorKind[] = [
  { id: 'born', label: 'Born', group: 'Life', chapter: 'Growing up' },
  { id: 'graduated', label: 'Graduated', group: 'School', chapter: 'Early career' },
  { id: 'school-start', label: 'Starts primary school', group: 'School', chapter: 'School years', withDetail: '{} starts primary school' },
  { id: 'first-job', label: 'First job', group: 'Work', chapter: 'Working' },
  { id: 'new-job', label: 'New job', group: 'Work', chapter: 'New role' },
  { id: 'retire', label: 'Retire', group: 'Work', chapter: 'Retirement' },
  // Ids stay as first shipped; saved dates keep working. Labels are what people see.
  { id: 'migrated', label: 'Relocated to a country', group: 'Moving', chapter: 'Settling in', withDetail: 'Relocated to {}' },
  { id: 'moved-city', label: 'Moved city', group: 'Moving', chapter: 'New city', withDetail: 'Moved to {}' },
  { id: 'visa-granted', label: 'Permit or visa granted', group: 'Moving', chapter: 'On a permit' },
  { id: 'visa-lodge', label: 'Apply for permanent residence', group: 'Moving', chapter: 'Applying for PR' },
  { id: 'pr-landed', label: 'Became a permanent resident', group: 'Moving', chapter: 'Permanent resident' },
  { id: 'married', label: 'Married', group: 'Family', chapter: 'Married life' },
  { id: 'baby-due', label: 'Baby due', group: 'Family', chapter: 'Expecting' },
  { id: 'child-born', label: 'Child born', group: 'Family', chapter: 'Young family', withDetail: '{} born' },
  { id: 'home-bought', label: 'Bought a home', group: 'Family', chapter: 'Homeowner' },
  { id: 'visit', label: 'Visitors arrive', group: 'Family', chapter: 'Visit', withDetail: '{} arrive', moment: true },
  { id: 'trip', label: 'Trip abroad', group: 'Moving', chapter: 'Trip', withDetail: 'Trip to {}', moment: true },
];

export const kindById = (id: string): AnchorKind | undefined =>
  ANCHOR_KINDS.find(k => k.id === id);

export const kindLabel = (id: string): string => kindById(id)?.label ?? id;

/** "Migrated to Canada", "Born · Xi'an", or just the label. */
export function anchorTitle(kind: string, label: string, detail?: string): string {
  if (!detail) return label;
  const k = kindById(kind);
  if (k?.withDetail && label === k.label) return k.withDetail.replace('{}', detail);
  return `${label} · ${detail}`;
}
