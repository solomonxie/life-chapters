import { resolve } from './dates';
import type { Chapter, Entry } from './types';

export interface ChapterStories {
  /** Null for stories dated before the first chapter opens. */
  chapter: Chapter | null;
  entries: Entry[];
}

const when = (e: Entry) => resolve(e.date, e.precision);

/** The chapter a date falls in — chapters are half-open, [start, end). */
export function chapterOf(date: string, chapters: Chapter[]): Chapter | null {
  return (
    chapters.find(c => c.start <= date && (c.end === null || date < c.end)) ?? null
  );
}

/**
 * Stories filed under the chapter their date lands in, newest chapter first
 * and newest story first within it. Nobody files a story by hand, so moving a
 * date re-files every story around it.
 */
export function storiesByChapter(entries: Entry[], chapters: Chapter[]): ChapterStories[] {
  const groups = new Map<Chapter | null, Entry[]>();
  for (const e of entries) {
    const c = chapterOf(when(e), chapters);
    groups.set(c, [...(groups.get(c) ?? []), e]);
  }
  return [...groups]
    .map(([chapter, list]) => ({
      chapter,
      entries: list.sort((a, b) => (when(a) > when(b) ? -1 : when(a) < when(b) ? 1 : b.updatedOn.localeCompare(a.updatedOn))),
    }))
    .sort((a, b) => (b.chapter?.start ?? '') .localeCompare(a.chapter?.start ?? ''));
}

export const storiesIn = (chapter: Chapter, entries: Entry[]) =>
  entries.filter(e => chapterOf(when(e), [chapter]) !== null);

/** Every word of the query must appear, in title or body, any case. */
export function searchEntries(entries: Entry[], query: string): Entry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return entries;
  return entries.filter(e => {
    const text = `${e.title ?? ''} ${e.body}`.toLowerCase();
    return words.every(w => text.includes(w));
  });
}

/** First line of the body, for list rows. */
export const excerpt = (e: Entry, max = 90) => {
  const line = e.body.trim().split('\n')[0] ?? '';
  return line.length > max ? `${line.slice(0, max - 1)}…` : line;
};
