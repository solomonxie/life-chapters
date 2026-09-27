import { addDays, maxDate } from './dates';
import type { CivilDate, ScheduledStep } from './types';

export type Bucket = 'now' | 'd90' | 'year' | 'later';

export const BUCKETS: Bucket[] = ['now', 'd90', 'year', 'later'];

/** Anything to start within this many days counts as "act now". */
export const ACT_NOW_DAYS = 14;

/** When a step next asks for attention: its start-by, or the end of a snooze. */
export const attentionDate = (step: ScheduledStep): CivilDate =>
  step.snoozedUntil ? maxDate(step.startBy, step.snoozedUntil) : step.startBy;

export const isOpen = (step: ScheduledStep): boolean =>
  step.status === 'pending' || step.status === 'snoozed';

export function bucketOf(step: ScheduledStep, now: CivilDate): Bucket {
  const on = attentionDate(step);
  if (on <= addDays(now, ACT_NOW_DAYS)) return 'now';
  if (on <= addDays(now, 90)) return 'd90';
  if (on <= addDays(now, 365)) return 'year';
  return 'later';
}

/**
 * Open steps grouped by how soon they must be *started* — not by due date,
 * which is the whole point: a long lead time lands in ACT NOW years early.
 */
export function bucketize<T extends ScheduledStep>(
  steps: T[],
  now: CivilDate,
): Record<Bucket, T[]> {
  const out: Record<Bucket, T[]> = { now: [], d90: [], year: [], later: [] };
  for (const step of steps.filter(isOpen)) out[bucketOf(step, now)].push(step);
  for (const b of BUCKETS) {
    out[b].sort((a, c) =>
      attentionDate(a) < attentionDate(c) ? -1 : attentionDate(a) > attentionDate(c) ? 1 : 0,
    );
  }
  return out;
}

/** A pending step's start-by moved without the user touching that step. */
export interface Move {
  from: CivilDate;
  to: CivilDate;
  /** Civil date the move happened. */
  on: CivilDate;
  /** What caused it, in a few words: "Police check done", "Migrated moved". */
  cause: string;
}

export type Moves = Record<string, Move>;

/** How long a ▲▼ stays on a row after the reflow that caused it. */
export const MOVE_VISIBLE_DAYS = 14;

/**
 * Folds one reflow into the running set of visible moves. A step that drifts
 * back to where it started loses its arrow; one that keeps moving keeps its
 * original `from`, so "was Jan 12" always means the date the user last saw.
 */
export function recordMoves(
  previous: Moves,
  before: ScheduledStep[],
  after: ScheduledStep[],
  cause: string,
  now: CivilDate,
  exclude: string[] = [],
): Moves {
  const was = new Map(before.map(s => [s.instanceId, s]));
  const next: Moves = {};
  const cutoff = addDays(now, -MOVE_VISIBLE_DAYS);

  for (const [id, move] of Object.entries(previous)) {
    if (move.on >= cutoff) next[id] = move;
  }

  for (const step of after) {
    const old = was.get(step.instanceId);
    if (!old || !isOpen(step) || exclude.includes(step.instanceId)) continue;
    if (old.startBy === step.startBy) continue;
    const from = next[step.instanceId]?.from ?? old.startBy;
    if (from === step.startBy) {
      delete next[step.instanceId];
    } else {
      next[step.instanceId] = { from, to: step.startBy, on: now, cause };
    }
  }

  return next;
}

export const deltaOf = (move: Move | undefined): 'earlier' | 'later' | null =>
  !move ? null : move.to < move.from ? 'earlier' : 'later';

/** Summary for the toast: how many moved and which way most of them went. */
export function summarize(
  before: ScheduledStep[],
  after: ScheduledStep[],
  exclude: string[] = [],
): { moved: number; direction: 'earlier' | 'later' } {
  const was = new Map(before.map(s => [s.instanceId, s.startBy]));
  let earlier = 0;
  let later = 0;
  for (const step of after) {
    const old = was.get(step.instanceId);
    if (!old || !isOpen(step) || exclude.includes(step.instanceId)) continue;
    if (step.startBy < old) earlier++;
    else if (step.startBy > old) later++;
  }
  return { moved: earlier + later, direction: later > earlier ? 'later' : 'earlier' };
}
