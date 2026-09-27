import {
  dailyDay,
  dailyName,
  groupSnapshots,
  snapshotName,
  snapshotTime,
  snapshotsToPrune,
} from '../src/data/snapshots';

const TODAY = '2026-09-26';
const at = (day: string, i: number) => `${day}T10-00-${String(i).padStart(2, '0')}-000.json`;

describe('snapshots', () => {
  it('names sort in time order, in local time', () => {
    const a = snapshotName(new Date(2026, 8, 26, 9, 5, 3, 7));
    const b = snapshotName(new Date(2026, 8, 26, 21, 5, 3, 7));
    expect(a).toBe('2026-09-26T09-05-03-007.json');
    expect(a < b).toBe(true);
    expect(snapshotTime(b)).toBe('21:05:03');
  });

  it('keeps the newest 20 of a day and drops the rest', () => {
    const day = Array.from({ length: 25 }, (_, i) => at(TODAY, i));
    const gone = snapshotsToPrune(day, TODAY);
    expect(gone).toEqual(day.slice(0, 5));
  });

  it('keeps 7 days including today, drops anything older', () => {
    const names = [at('2026-09-20', 1), at('2026-09-19', 1), at('2026-08-01', 1), at(TODAY, 1)];
    expect(snapshotsToPrune(names, TODAY)).toEqual([at('2026-08-01', 1), at('2026-09-19', 1)]);
  });

  it('never touches files that are not snapshots', () => {
    expect(snapshotsToPrune(['notes.txt', 'life-chapters-2020-01-01.json'], TODAY)).toEqual([]);
  });

  it('groups newest day first, newest snapshot first', () => {
    const g = groupSnapshots([at('2026-09-25', 1), at(TODAY, 1), at(TODAY, 2), 'x.json']);
    expect(g.map(d => d.day)).toEqual([TODAY, '2026-09-25']);
    expect(g[0].names).toEqual([at(TODAY, 2), at(TODAY, 1)]);
  });

  it('one iCloud name per day', () => {
    expect(dailyName(TODAY)).toBe('life-chapters-2026-09-26.json');
    expect(dailyDay(dailyName(TODAY))).toBe(TODAY);
    expect(dailyDay('other.json')).toBeNull();
  });
});
