import { compareDates } from './dates';
import type { CivilDate, LifeEvent, Chapter } from './types';

/**
 * Events fold into the contiguous intervals between them. The last chapter is
 * open-ended, and exactly one chapter contains today unless every event is ahead.
 */
export function deriveChapters(events: LifeEvent[], now: CivilDate): Chapter[] {
  const sorted = [...events].sort((a, b) => compareDates(a.date, b.date));

  return sorted.map((event, i) => {
    const end = sorted[i + 1]?.date ?? null;
    return {
      eventId: event.id,
      label: event.chapterLabel ?? event.label,
      start: event.date,
      end,
      isCurrent: event.date <= now && (end === null || now < end),
    };
  });
}

export const currentChapter = (chapters: Chapter[]): Chapter | undefined =>
  chapters.find(p => p.isCurrent);
