import { compareDates } from './dates';
import type { CivilDate, LifeEvent, Phase } from './types';

/**
 * Events fold into the contiguous intervals between them. The last phase is
 * open-ended, and exactly one phase contains today unless every event is ahead.
 */
export function derivePhases(events: LifeEvent[], now: CivilDate): Phase[] {
  const sorted = [...events].sort((a, b) => compareDates(a.date, b.date));

  return sorted.map((event, i) => {
    const end = sorted[i + 1]?.date ?? null;
    return {
      label: event.label,
      start: event.date,
      end,
      isCurrent: event.date <= now && (end === null || now < end),
    };
  });
}

export const currentPhase = (phases: Phase[]): Phase | undefined =>
  phases.find(p => p.isCurrent);
