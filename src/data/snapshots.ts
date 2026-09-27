import { addDays } from '../domain/dates';
import type { CivilDate } from '../domain/types';

/** Files kept per calendar day: the day's copy, plus a tagged one or older per-change ones. */
export const PER_DAY = 5;
/** Days of copies kept, today included. The change log is never pruned. */
export const KEEP_DAYS = 30;

const pad = (n: number, w = 2) => String(n).padStart(w, '0');

const dayOf = (at: Date) => `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())}`;

/**
 * One file per day, `2026-09-26.json` in local time, overwritten by every
 * change that day. A tag keeps a one-off apart: `2026-09-26-before-restore.json`.
 * Names sort in time order and the day is the first ten characters.
 */
export function snapshotName(at: Date, tag?: string): string {
  return `${dayOf(at)}${tag ? `-${tag}` : ''}.json`;
}

/** Daily or tagged, or the hourly and per-change names written before. */
const SNAPSHOT = /^\d{4}-\d{2}-\d{2}(T\d{2}(-\d{2}-\d{2}-\d{3})?)?(-[a-z-]+)?\.json$/;

export const isSnapshot = (name: string) => SNAPSHOT.test(name);

export const snapshotDay = (name: string): CivilDate => name.slice(0, 10);

/** "latest", "before restore", or a time for an older hourly or per-change file. */
export function snapshotTime(name: string): string {
  const m = /^\d{4}-\d{2}-\d{2}(?:T(\d{2})(?:-(\d{2})-\d{2}-\d{3})?)?(?:-([a-z-]+))?\.json$/.exec(name);
  if (!m) return '';
  const [, hour, minute, tag] = m;
  if (hour) return `${hour}:${minute ?? '00'}${tag ? ` ${tag.replace(/-/g, ' ')}` : ''}`;
  return tag ? tag.replace(/-/g, ' ') : 'latest';
}

/**
 * Which snapshots to delete: anything from before the 30-day window, and
 * within each day everything past its newest few. Files that aren't snapshots
 * — the change log included — are never touched.
 */
export function snapshotsToPrune(
  names: string[],
  today: CivilDate,
  perDay = PER_DAY,
  days = KEEP_DAYS,
): string[] {
  const oldest = addDays(today, -(days - 1));
  const byDay = new Map<string, string[]>();
  const out: string[] = [];
  for (const name of names.filter(isSnapshot)) {
    const day = snapshotDay(name);
    if (day < oldest) out.push(name);
    else byDay.set(day, [...(byDay.get(day) ?? []), name]);
  }
  for (const list of byDay.values()) {
    out.push(...list.sort().reverse().slice(perDay));
  }
  return out.sort();
}

/** Newest first, grouped by day. */
export function groupSnapshots(names: string[]): Array<{ day: CivilDate; names: string[] }> {
  const byDay = new Map<string, string[]>();
  for (const n of names.filter(isSnapshot).sort().reverse()) {
    byDay.set(snapshotDay(n), [...(byDay.get(snapshotDay(n)) ?? []), n]);
  }
  return [...byDay].map(([day, list]) => ({ day, names: list }));
}

/** The one iCloud file for a day, replaced on every change that day. */
export const dailyName = (day: CivilDate) => `life-chapters-${day}.json`;

const DAILY = /^life-chapters-(\d{4}-\d{2}-\d{2})\.json$/;

export const dailyDay = (name: string): CivilDate | null => DAILY.exec(name)?.[1] ?? null;

/** Append-only, one file a year, plain text readable in Files. */
export const changeLogName = (at: Date) => `changes-${at.getFullYear()}.log`;

/** `2026-09-27 14:03:22\tMe\tAva born moved · 3 steps rescheduled` */
export function changeLine(at: Date, who: string, what: string): string {
  const time = `${pad(at.getHours())}:${pad(at.getMinutes())}:${pad(at.getSeconds())}`;
  return `${dayOf(at)} ${time}\t${who}\t${what.replace(/[\t\n]+/g, ' ')}\n`;
}
