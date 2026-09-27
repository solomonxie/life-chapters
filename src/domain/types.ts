/** A calendar date with no time and no zone: `YYYY-MM-DD`. */
export type CivilDate = string;

/** How exactly a remembered date is known. */
export type DatePrecision = 'year' | 'month' | 'day';

export interface Anchor {
  id: string;
  kind: string;
  label: string;
  place?: string;
  date: CivilDate;
  precision: DatePrecision;
}

export interface LifeEvent {
  id: string;
  label: string;
  date: CivilDate;
  source: 'anchor' | 'derived';
  anchorId?: string;
  /** What the phase that starts here is called, if not the event label. */
  phaseLabel?: string;
}

export interface Phase {
  eventId: string;
  label: string;
  start: CivilDate;
  end: CivilDate | null;
  isCurrent: boolean;
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
  anchorKind: string;
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
  issuedOn?: CivilDate;
  expiresOn?: CivilDate;
  number?: string;
  /** File name inside the app's Documents/Scans folder. */
  scanPath?: string;
}
