import { diffDays } from './dates';
import { MissingDependencyError, PlaybookCycleError, topoSort } from './schedule';
import type { CivilDate, Playbook, StepTemplate } from './types';

export type Validation =
  | { ok: true; playbook: Playbook }
  | { ok: false; error: string };

const CIVIL = /^\d{4}-\d{2}-\d{2}$/;

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const strings = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every(x => typeof x === 'string');

const int = (v: unknown): v is number =>
  typeof v === 'number' && Number.isInteger(v);

/**
 * Everything an imported file must satisfy before it may produce a date. Errors
 * name the step by its title, since that's what the user can find.
 */
export function validatePlaybook(input: unknown): Validation {
  const fail = (error: string): Validation => ({ ok: false, error });

  if (!isObj(input)) return fail('This file is not a playbook.');
  const { id, title, anchorKind, reviewedAt, steps } = input;
  if (typeof id !== 'string' || !id) return fail('The playbook has no id.');
  if (typeof title !== 'string' || !title) return fail('The playbook has no title.');
  if (typeof anchorKind !== 'string' || !anchorKind) {
    return fail(`"${title}" doesn't say which date it hangs off (anchorKind).`);
  }
  if (typeof reviewedAt !== 'string' || !CIVIL.test(reviewedAt)) {
    return fail(`"${title}" has no review date (reviewedAt, YYYY-MM-DD).`);
  }
  if (!Array.isArray(steps) || steps.length === 0) {
    return fail(`"${title}" has no steps.`);
  }

  const seen = new Set<string>();
  for (const [i, raw] of steps.entries()) {
    if (!isObj(raw)) return fail(`Step ${i + 1} is not a step.`);
    const name = typeof raw.title === 'string' && raw.title ? raw.title : `#${i + 1}`;
    if (typeof raw.id !== 'string' || !raw.id) return fail(`Step "${name}" has no id.`);
    if (seen.has(raw.id)) return fail(`Two steps share the id "${raw.id}".`);
    seen.add(raw.id);
    if (typeof raw.title !== 'string' || !raw.title) {
      return fail(`Step "${raw.id}" has no title.`);
    }
    if (!int(raw.offsetDays)) return fail(`Step "${name}" has no whole-day offset.`);
    if (!int(raw.durationDays) || raw.durationDays < 0) {
      return fail(`Step "${name}" needs a duration of zero days or more.`);
    }
    if (
      raw.validForDays !== undefined &&
      (!int(raw.validForDays) || raw.validForDays <= 0)
    ) {
      return fail(`Step "${name}" has a validity window that isn't a positive number of days.`);
    }
    for (const key of ['dependsOn', 'documents', 'prepare'] as const) {
      if (raw[key] !== undefined && !strings(raw[key])) {
        return fail(`Step "${name}" has a malformed ${key} list.`);
      }
    }
    if (raw.howTo !== undefined && typeof raw.howTo !== 'string') {
      return fail(`Step "${name}" has a malformed how-to.`);
    }
  }

  const playbook: Playbook = {
    ...(input as unknown as Playbook),
    steps: (steps as Record<string, unknown>[]).map(
      s =>
        ({
          ...s,
          dependsOn: (s.dependsOn as string[] | undefined) ?? [],
          documents: (s.documents as string[] | undefined) ?? [],
          prepare: (s.prepare as string[] | undefined) ?? [],
        } as StepTemplate),
    ),
  };

  const titleOf = (stepId: string) =>
    playbook.steps.find(s => s.id === stepId)?.title ?? stepId;

  try {
    topoSort(playbook.steps);
  } catch (e) {
    if (e instanceof PlaybookCycleError) {
      const loop = e.stepIds.slice(e.stepIds.indexOf(e.stepIds[e.stepIds.length - 1]));
      const [a, b] = [titleOf(loop[0]), titleOf(loop[1])];
      return fail(
        loop.length <= 3
          ? `Step "${a}" depends on "${b}", which depends back on it.`
          : `Steps depend on each other in a loop: ${loop.map(titleOf).join(' → ')}.`,
      );
    }
    if (e instanceof MissingDependencyError) {
      return fail(
        `Step "${titleOf(e.stepId)}" depends on "${e.missingId}", which isn't in this playbook.`,
      );
    }
    throw e;
  }

  return { ok: true, playbook };
}

/** Whole years since the playbook was last checked against the real rules. */
export const reviewAgeYears = (reviewedAt: CivilDate, now: CivilDate): number =>
  Math.floor(diffDays(reviewedAt, now) / 365.2425);

export const STALE_AFTER_YEARS = 2;

export const isStale = (playbook: Playbook, now: CivilDate): boolean =>
  reviewAgeYears(playbook.reviewedAt, now) >= STALE_AFTER_YEARS;
