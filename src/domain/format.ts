import { diffDays, today } from './dates';
import type { CivilDate, DatePrecision } from './types';

const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

/** Nov 12, 2026 */
export function formatDate(date: CivilDate): string {
  const [y, m, d] = date.split('-');
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

/** Nov 12 */
export function formatShort(date: CivilDate): string {
  const [, m, d] = date.split('-');
  return `${MONTHS[Number(m) - 1]} ${Number(d)}`;
}

/** Nov 2026 */
export function formatMonth(date: CivilDate): string {
  const [y, m] = date.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

/** As precise as the date is actually known: 2013 · Sep 2024 · Sep 14, 2024. */
export function formatPrecise(date: CivilDate, precision: DatePrecision): string {
  if (precision === 'year') return date.slice(0, 4);
  if (precision === 'month') return formatMonth(date);
  return formatDate(date);
}

/** in 47 days · 5 days late · today — the plan slipped, nobody failed. */
export function formatRelative(date: CivilDate, now: CivilDate = today()): string {
  const days = diffDays(now, date);
  if (days === 0) return 'today';
  if (days === -1) return '1 day late';
  if (days < 0) return days > -60 ? `${-days} days late` : `${Math.round(-days / 30)} months late`;
  if (days === 1) return 'tomorrow';
  if (days < 45) return `in ${days} days`;
  if (days < 365) return `in ${Math.round(days / 30.44)} months`;
  const years = Math.round(days / 365.25);
  return `in ${years} year${years === 1 ? '' : 's'}`;
}

/** 13 years ago · in 3 years — for facts, where "late" makes no sense. */
export function formatAgo(date: CivilDate, now: CivilDate = today()): string {
  const days = diffDays(date, now);
  if (days < 0) return formatRelative(date, now);
  if (days === 0) return 'today';
  if (days < 45) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (days < 365) return `${Math.round(days / 30.44)} months ago`;
  const years = Math.floor(days / 365.25);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

/** 2w · 3d — compact durations for badges. */
export function formatSpan(days: number): string {
  if (days % 7 === 0 && days >= 7) return `${days / 7}w`;
  if (days >= 60) return `${Math.round(days / 30.44)}mo`;
  return `${days}d`;
}

/** 3 months · 2 years · 45 days, for validity windows. */
export function formatDuration(days: number): string {
  if (days >= 365 && days % 365 < 20) {
    const y = Math.round(days / 365);
    return `${y} year${y === 1 ? '' : 's'}`;
  }
  if (days >= 28) {
    const m = Math.round(days / 30.44);
    return `${m} month${m === 1 ? '' : 's'}`;
  }
  return `${days} day${days === 1 ? '' : 's'}`;
}
