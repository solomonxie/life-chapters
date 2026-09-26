import {
  addDays,
  diffDays,
  fromDayNumber,
  maxDate,
  resolve,
  toDayNumber,
  yearsBetween,
} from '../src/domain/dates';

describe('civil dates', () => {
  it('round-trips through day numbers', () => {
    for (const date of ['1991-04-12', '2024-02-29', '2027-01-01']) {
      expect(fromDayNumber(toDayNumber(date))).toBe(date);
    }
  });

  it('crosses month, year, and leap boundaries', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2024-02-28', 1)).toBe('2024-02-29');
    expect(addDays('2025-02-28', 1)).toBe('2025-03-01');
    expect(addDays('2027-01-01', -1)).toBe('2026-12-31');
  });

  it('diffs signed', () => {
    expect(diffDays('2026-09-26', '2026-10-01')).toBe(5);
    expect(diffDays('2026-10-01', '2026-09-26')).toBe(-5);
    expect(diffDays('2026-09-26', '2026-09-26')).toBe(0);
  });

  it('resolves a fuzzy anchor to a usable day', () => {
    expect(resolve('2013-01-01', 'year')).toBe('2013-07-01');
    expect(resolve('2013-03-01', 'month')).toBe('2013-03-15');
    expect(resolve('2013-03-09', 'day')).toBe('2013-03-09');
  });

  it('compares lexically, which is why dates are strings', () => {
    expect(maxDate('2026-09-26', '2026-10-01', '2025-01-01')).toBe('2026-10-01');
  });

  it('counts whole years', () => {
    expect(yearsBetween('1991-04-12', '2026-09-26')).toBe(35);
    expect(yearsBetween('1991-04-12', '1992-04-11')).toBe(0);
  });
});
