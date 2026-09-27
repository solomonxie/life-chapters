import { addDays, diffDays, maxDate } from './dates';
import type {
  CivilDate,
  Playbook,
  ScheduledStep,
  StepInstance,
  StepTemplate,
  Track,
} from './types';

export class PlaybookCycleError extends Error {
  constructor(readonly stepIds: string[]) {
    super(`Cyclic dependency between steps: ${stepIds.join(' → ')}`);
    this.name = 'PlaybookCycleError';
  }
}

export class MissingDependencyError extends Error {
  constructor(readonly stepId: string, readonly missingId: string) {
    super(`Step "${stepId}" depends on "${missingId}", which does not exist`);
    this.name = 'MissingDependencyError';
  }
}

/** Dependency order, so a step is always scheduled after everything it needs. */
export function topoSort(steps: StepTemplate[]): StepTemplate[] {
  const byId = new Map(steps.map(s => [s.id, s]));
  const state = new Map<string, 'open' | 'closed'>();
  const out: StepTemplate[] = [];

  const visit = (step: StepTemplate, path: string[]) => {
    if (state.get(step.id) === 'closed') return;
    if (state.get(step.id) === 'open') {
      throw new PlaybookCycleError([...path, step.id]);
    }
    state.set(step.id, 'open');
    for (const depId of step.dependsOn) {
      const dep = byId.get(depId);
      if (!dep) throw new MissingDependencyError(step.id, depId);
      visit(dep, [...path, step.id]);
    }
    state.set(step.id, 'closed');
    out.push(step);
  };

  for (const step of steps) visit(step, []);
  return out;
}

/** The playbook as this track sees it: its own steps plus any the user added. */
export function effectiveSteps(playbook: Playbook, track: Track): StepTemplate[] {
  const extraDeps = track.extraDependsOn ?? {};
  return [...playbook.steps, ...(track.extraSteps ?? [])].map(step =>
    extraDeps[step.id]
      ? { ...step, dependsOn: [...step.dependsOn, ...extraDeps[step.id]] }
      : step,
  );
}

/**
 * Schedules a track backward from its anchor event.
 *
 *   dueBy         = anchorDate + offsetDays
 *   latestStart   = dueBy − durationDays
 *   earliestStart = dueBy − validForDays − durationDays
 *   startBy       = max(latestStart, when every dependency actually finishes)
 *
 * A done step is pinned to the date it really happened, so its successors
 * reflow off reality rather than off the original estimate. A skipped step
 * holds nothing up.
 */
export function schedule(
  playbook: Playbook,
  track: Track,
  instances: StepInstance[],
  now?: CivilDate,
): ScheduledStep[] {
  const byStepId = new Map(instances.map(i => [i.stepId, i]));
  const finishOf = new Map<string, CivilDate>();
  const lateIds = new Set<string>();
  const result: ScheduledStep[] = [];

  for (const step of topoSort(effectiveSteps(playbook, track))) {
    const instance = byStepId.get(step.id);
    const status = instance?.status ?? 'pending';
    const dueBy =
      instance?.dueOverride ?? addDays(track.anchorEventDate, step.offsetDays);
    const latestStart = addDays(dueBy, -step.durationDays);
    const earliestStart =
      step.validForDays === undefined
        ? null
        : addDays(dueBy, -step.validForDays - step.durationDays);

    const depFinishes = step.dependsOn
      .map(id => finishOf.get(id))
      .filter((d): d is CivilDate => d !== undefined);
    const startBy = maxDate(latestStart, ...depFinishes);

    const doneOn =
      status === 'done' && instance?.completedOn ? instance.completedOn : null;
    if (status !== 'skipped') {
      finishOf.set(step.id, doneOn ?? addDays(startBy, step.durationDays));
    }

    const open = (id: string) => {
      const s = byStepId.get(id)?.status;
      return s !== 'done' && s !== 'skipped';
    };
    const blockedBy = step.dependsOn.filter(open);
    if (!doneOn && status !== 'skipped' && now !== undefined && startBy < now) {
      lateIds.add(step.id);
    }

    result.push({
      stepId: step.id,
      instanceId: instance?.id ?? `unbound:${step.id}`,
      title: step.title,
      status,
      dueBy,
      startBy: doneOn ?? startBy,
      earliestStart,
      atRisk: startBy > latestStart,
      blockedBy,
      blockedByLate: blockedBy.filter(id => lateIds.has(id)),
      expiresOn:
        doneOn && step.validForDays !== undefined
          ? addDays(doneOn, step.validForDays)
          : undefined,
      snoozedUntil: status === 'snoozed' ? instance?.snoozedUntil : undefined,
    });
  }

  return result;
}

export interface ExpiryClash {
  source: ScheduledStep;
  consumer: ScheduledStep;
  /** Days between the result expiring and the consumer's due date. */
  gapDays: number;
}

/**
 * A held result that dies before the step needing it comes due. Settled once
 * the consumer is finished, or once a redo of the source is planned for it.
 */
export function expiryClashes(
  scheduled: ScheduledStep[],
  playbook: Playbook,
  track?: Track,
): ExpiryClash[] {
  const steps = track ? effectiveSteps(playbook, track) : playbook.steps;
  const templates = new Map(steps.map(s => [s.id, s]));
  const byId = new Map(scheduled.map(s => [s.stepId, s]));
  const clashes: ExpiryClash[] = [];

  for (const step of steps) {
    const consumer = byId.get(step.id);
    if (!consumer || consumer.status === 'done' || consumer.status === 'skipped') {
      continue;
    }
    for (const depId of step.dependsOn) {
      const source = byId.get(depId);
      const redone = step.dependsOn.some(
        id => templates.get(id)?.redoOf === depId,
      );
      if (source?.expiresOn && source.expiresOn < consumer.dueBy && !redone) {
        clashes.push({
          source,
          consumer,
          gapDays: diffDays(source.expiresOn, consumer.dueBy),
        });
      }
    }
  }

  return clashes;
}

/**
 * Inserts a repeat of `sourceId` that finishes by the time `consumerId` needs
 * to start, and makes the consumer wait for it. Returns the new track; the
 * caller reflows.
 */
export function planRedo(
  playbook: Playbook,
  track: Track,
  sourceId: string,
  consumerId: string,
  scheduled: ScheduledStep[],
): Track {
  const steps = effectiveSteps(playbook, track);
  const source = steps.find(s => s.id === sourceId);
  const consumer = scheduled.find(s => s.stepId === consumerId);
  if (!source || !consumer) return track;

  const base = source.redoOf ?? source.id;
  const taken = new Set(steps.map(s => s.id));
  let n = 1;
  while (taken.has(`${base}~redo${n}`)) n++;
  const id = `${base}~redo${n}`;

  const redo: StepTemplate = {
    ...source,
    id,
    title: `${source.title} (redo)`,
    offsetDays: diffDays(track.anchorEventDate, consumer.startBy),
    redoOf: sourceId,
  };
  const deps = track.extraDependsOn?.[consumerId] ?? [];
  return {
    ...track,
    extraSteps: [...(track.extraSteps ?? []), redo],
    extraDependsOn: { ...track.extraDependsOn, [consumerId]: [...deps, id] },
  };
}
