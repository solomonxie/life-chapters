/** A calendar date with no time and no zone: `YYYY-MM-DD`. */
export type CivilDate = string;

/** How exactly a remembered date is known. */
export type DatePrecision = 'year' | 'month' | 'day';

export interface Anchor {
  id: string;
  kind: string;
  label: string;
  place?: string;
  /** Where it happened: a listed city ("Toronto, Ontario, Canada") or free text. */
  location?: string;
  date: CivilDate;
  precision: DatePrecision;
  /** The user's own words about what happened. */
  note?: string;
  /** Whose board this sits on; absent means "me". */
  personId?: string;
  /** The other person in a linked event (spouse, child, parent). */
  withPersonId?: string;
  /** Shared by the two copies of a linked event, one per person. */
  linkId?: string;
}

export interface Person {
  id: string;
  name: string;
  /** Where they live now; otherwise inferred from their events. */
  country?: string;
  province?: string;
}

export interface LifeEvent {
  id: string;
  label: string;
  date: CivilDate;
  source: 'anchor' | 'derived';
  anchorId?: string;
  /** What the chapter that starts here is called, if not the event label. */
  chapterLabel?: string;
}

export interface Chapter {
  eventId: string;
  label: string;
  start: CivilDate;
  end: CivilDate | null;
  isCurrent: boolean;
}

/** Whole years of age of the person the anchor is about; `to` inclusive, open if absent. */
export interface AgeRange {
  from: number;
  to?: number;
}

export interface StepTemplate {
  id: string;
  title: string;
  /** Relative to the anchor event. Negative means before it. */
  offsetDays: number;
  /** How long the thing takes to obtain or complete. */
  durationDays: number;
  /** How long the result stays valid once obtained. */
  validForDays?: number;
  dependsOn: string[];
  documents: string[];
  prepare: string[];
  howTo?: string;
  ages?: AgeRange;
  /** Plain-language "applies if…" lines; a step that doesn't apply gets "Not for me". */
  conditions?: string[];
  /** Set on a step the user inserted, e.g. a redo; names the original. */
  redoOf?: string;
}

export interface Source {
  title: string;
  url: string;
}

export interface Playbook {
  id: string;
  title: string;
  /** One line under the title, describing the track — never an instruction. */
  summary?: string;
  region?: string;
  /** ISO country code ("CA", "CN"); absent means anywhere. */
  country?: string;
  /** Two-letter code for a provincial plan ("ON", "BC"); absent means country-wide. */
  province?: string;
  /** Same life stage across provinces ("school-years"), so a plan can swap for its twin. */
  family?: string;
  anchorKind: string;
  ages?: AgeRange;
  /** Who this is for, in plain language. */
  conditions?: string[];
  reviewedAt: CivilDate;
  version?: number;
  sources?: Source[];
  steps: StepTemplate[];
}

export type InstanceStatus = 'pending' | 'done' | 'skipped' | 'snoozed';

export interface StepInstance {
  id: string;
  trackId: string;
  stepId: string;
  status: InstanceStatus;
  completedOn?: CivilDate;
  snoozedUntil?: CivilDate;
  /** Set via "Move due date…" — replaces anchor + offset for this step. */
  dueOverride?: CivilDate;
  note?: string;
  checkedDocuments: string[];
  checkedPrepare: string[];
}

export interface Track {
  id: string;
  playbookId: string;
  personId?: string;
  /** The anchor this track hangs off; its date wins over `anchorEventDate`. */
  anchorId?: string;
  anchorEventDate: CivilDate;
  /** Steps the user added to this track only, e.g. a planned redo. */
  extraSteps?: StepTemplate[];
  /** Extra dependencies per step id, e.g. a consumer waiting on a redo. */
  extraDependsOn?: Record<string, string[]>;
}

export interface ScheduledStep {
  stepId: string;
  instanceId: string;
  title: string;
  status: InstanceStatus;
  dueBy: CivilDate;
  /** Latest date you can start and still hit `dueBy`, pushed by dependencies. */
  startBy: CivilDate;
  /** Starting before this wastes the result — it expires before `dueBy`. */
  earliestStart: CivilDate | null;
  /** True when a dependency pushed `startBy` past the point of no return. */
  atRisk: boolean;
  /** Step ids that must finish first and haven't. */
  blockedBy: string[];
  /** Set once done and the result has a validity window. */
  expiresOn?: CivilDate;
  snoozedUntil?: CivilDate;
  /** Dependencies that are themselves late, so this date can't be trusted. */
  blockedByLate: string[];
}

export interface DocumentRecord {
  id: string;
  name: string;
  personId?: string;
  issuedOn?: CivilDate;
  expiresOn?: CivilDate;
  number?: string;
  /** The user said it never expires; don't infer one from a step. */
  noExpiry?: boolean;
  /** File name inside the app's Documents/Scans folder. */
  scanPath?: string;
}

