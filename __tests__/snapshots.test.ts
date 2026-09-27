import {
  dailyDay,
  dailyName,
  groupSnapshots,
  snapshotName,
  snapshotTime,
  snapshotsToPrune,
  changeLine,
  changeLogName,
} from '../src/data/snapshots';

const TODAY = '2026-09-26';
const at = (day: string, i: number) => `${day}T10-00-${String(i).padStart(2, '0')}-000.json`;

describe('snapshots', () => {
  it('one file a day, in local time; a tag keeps a one-off apart', () => {
    expect(snapshotName(new Date(2026, 8, 26, 21, 5, 3))).toBe('2026-09-26.json');
    expect(snapshotName(new Date(2026, 8, 26, 9), 'before-restore')).toBe('2026-09-26-before-restore.json');
    expect(snapshotTime('2026-09-26.json')).toBe('latest');
    expect(snapshotTime('2026-09-26-before-restore.json')).toBe('before restore');
  });

  it('still reads the hourly and per-change names written before', () => {
    expect(snapshotTime('2026-09-26T21.json')).toBe('21:00');
    expect(snapshotTime('2026-09-26T21-05-33-120.json')).toBe('21:05');
    expect(snapshotsToPrune(['2026-09-26T21-05-33-120.json'], TODAY)).toEqual([]);
  });

  it('keeps the newest few of a day and drops the rest', () => {
    const day = Array.from({ length: 8 }, (_, i) => at(TODAY, i));
    expect(snapshotsToPrune(day, TODAY)).toEqual(day.slice(0, 3));
  });

  it('keeps 30 days including today, drops anything older', () => {
    const names = ['2026-08-28.json', '2026-08-27.json', '2026-01-01.json', `${TODAY}.json`];
    expect(snapshotsToPrune(names, TODAY)).toEqual(['2026-01-01.json', '2026-08-27.json']);
  });

  it('never touches files that are not snapshots, the change log included', () => {
    expect(snapshotsToPrune(['notes.txt', 'life-chapters-2020-01-01.json', 'changes-2020.log'], TODAY)).toEqual([]);
  });

  it('writes one tab-separated change line, newlines flattened', () => {
    const at = new Date(2026, 8, 27, 14, 3, 22);
    expect(changeLogName(at)).toBe('changes-2026.log');
    expect(changeLine(at, 'Me', 'Ava born moved\n3 steps')).toBe('2026-09-27 14:03:22\tMe\tAva born moved 3 steps\n');
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
