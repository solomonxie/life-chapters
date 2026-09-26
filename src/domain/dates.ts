import type { CivilDate, DatePrecision } from './types';

const MS_PER_DAY = 86_400_000;

const pad = (n: number) => String(n).padStart(2, '0');

export function toDayNumber(date: CivilDate): number {
  const [y, m, d] = date.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / MS_PER_DAY);
}

export function fromDayNumber(days: number): CivilDate {
  const d = new Date(days * MS_PER_DAY);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(
    d.getUTCDate(),
  )}`;
}

export const addDays = (date: CivilDate, days: number): CivilDate =>
  fromDayNumber(toDayNumber(date) + days);

/** Signed day count from `from` to `to`. */
export const diffDays = (from: CivilDate, to: CivilDate): number =>
  toDayNumber(to) - toDayNumber(from);

export const compareDates = (a: CivilDate, b: CivilDate): number =>
  a < b ? -1 : a > b ? 1 : 0;

export const minDate = (...dates: CivilDate[]): CivilDate =>
  dates.reduce((a, b) => (a < b ? a : b));

export const maxDate = (...dates: CivilDate[]): CivilDate =>
  dates.reduce((a, b) => (a > b ? a : b));

/** Today as a civil date in the device's own zone. */
export function today(now: Date = new Date()): CivilDate {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )}`;
}

/**
 * A fuzzy anchor resolved to a usable day. "Graduated in 2013" schedules from
 * mid-2013 rather than pretending to know January 1st.
 */
export function resolve(date: CivilDate, precision: DatePrecision): CivilDate {
  const [y, m] = date.split('-');
  if (precision === 'year') return `${y}-07-01`;
  if (precision === 'month') return `${y}-${m}-15`;
  return date;
}

export const yearsBetween = (from: CivilDate, to: CivilDate): number =>
  Math.floor(diffDays(from, to) / 365.2425);
