import { addDays } from '../domain/dates';
import type { CivilDate } from '../domain/types';

/** Snapshots kept per calendar day, newest first. */
export const PER_DAY = 20;
/** Days of snapshots kept, today included. */
export const KEEP_DAYS = 7;

const pad = (n: number, w = 2) => String(n).padStart(w, '0');

/**
 * `2026-09-26T21-05-33-120.json` in local time — sorts by name, and the day
 * is the first ten characters, which is all the pruning needs.
 */
export function snapshotName(at: Date): string {
  return `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())}T${pad(
    at.getHours(),
  )}-${pad(at.getMinutes())}-${pad(at.getSeconds())}-${pad(at.getMilliseconds(), 3)}.json`;
}

const SNAPSHOT = /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}\.json$/;

export const isSnapshot = (name: string) => SNAPSHOT.test(name);

export const snapshotDay = (name: string): CivilDate => name.slice(0, 10);

/** "21:05:33" */
export const snapshotTime = (name: string) => name.slice(11, 19).replace(/-/g, ':');

/**
 * Which snapshots to delete: anything from before the 7-day window, and within
 * each day everything past its newest 20. Files that aren't snapshots are
 * never touched.
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
