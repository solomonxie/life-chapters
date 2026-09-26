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
}

export interface Phase {
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
}

export interface Playbook {
  id: string;
  title: string;
  anchorKind: string;
  reviewedAt: CivilDate;
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
  checkedDocuments: string[];
  checkedPrepare: string[];
}

export interface Track {
  id: string;
  playbookId: string;
  anchorEventDate: CivilDate;
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
}

export interface DocumentRecord {
  id: string;
  name: string;
  issuedOn?: CivilDate;
  expiresOn?: CivilDate;
  scanPath?: string;
}
