import { addDays, maxDate } from './dates';
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

/**
 * Schedules a track backward from its anchor event.
 *
 *   dueBy         = anchorDate + offsetDays
 *   latestStart   = dueBy − durationDays
 *   earliestStart = dueBy − validForDays − durationDays
 *   startBy       = max(latestStart, when every dependency actually finishes)
 *
 * A done step is pinned to the date it really happened, so its successors
 * reflow off reality rather than off the original estimate.
 */
export function schedule(
  playbook: Playbook,
  track: Track,
  instances: StepInstance[],
): ScheduledStep[] {
  const byStepId = new Map(instances.map(i => [i.stepId, i]));
  const finishOf = new Map<string, CivilDate>();
  const result: ScheduledStep[] = [];

  for (const step of topoSort(playbook.steps)) {
    const instance = byStepId.get(step.id);
    const dueBy = addDays(track.anchorEventDate, step.offsetDays);
    const latestStart = addDays(dueBy, -step.durationDays);
    const earliestStart =
      step.validForDays === undefined
        ? null
        : addDays(dueBy, -step.validForDays - step.durationDays);

    const depFinishes = step.dependsOn
      .map(id => finishOf.get(id))
      .filter((d): d is CivilDate => d !== undefined);
    const startBy = maxDate(latestStart, ...depFinishes);

    const done = instance?.status === 'done' && instance.completedOn;
    const finish = done ? instance!.completedOn! : addDays(startBy, step.durationDays);
    finishOf.set(step.id, finish);

    result.push({
      stepId: step.id,
      instanceId: instance?.id ?? `unbound:${step.id}`,
      title: step.title,
      status: instance?.status ?? 'pending',
      dueBy,
      startBy: done ? instance!.completedOn! : startBy,
      earliestStart,
      atRisk: startBy > latestStart,
      blockedBy: step.dependsOn.filter(
        id => byStepId.get(id)?.status !== 'done',
      ),
      expiresOn:
        done && step.validForDays !== undefined
          ? addDays(instance!.completedOn!, step.validForDays)
          : undefined,
    });
  }

  return result;
}

/** A held document that dies before the step needing it comes due. */
export function expiryClashes(
  scheduled: ScheduledStep[],
  playbook: Playbook,
): Array<{ source: ScheduledStep; consumer: ScheduledStep }> {
  const byId = new Map(scheduled.map(s => [s.stepId, s]));
  const clashes: Array<{ source: ScheduledStep; consumer: ScheduledStep }> = [];

  for (const step of playbook.steps) {
    const consumer = byId.get(step.id);
    if (!consumer) continue;
    for (const depId of step.dependsOn) {
      const source = byId.get(depId);
      if (source?.expiresOn && source.expiresOn < consumer.dueBy) {
        clashes.push({ source, consumer });
      }
    }
  }

  return clashes;
}
