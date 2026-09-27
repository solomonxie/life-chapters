import { chapterOf, excerpt, searchEntries, storiesByChapter } from '../src/domain/journal';
import type { Chapter, Entry } from '../src/domain/types';

const chapters: Chapter[] = [
  { eventId: 'b', label: 'Growing up', start: '1991-04-12', end: '2013-07-01', isCurrent: false },
  { eventId: 'g', label: 'Early career', start: '2013-07-01', end: '2024-09-14', isCurrent: false },
  { eventId: 'm', label: 'Settling in', start: '2024-09-14', end: null, isCurrent: true },
];

const entry = (id: string, date: string, extra: Partial<Entry> = {}): Entry => ({
  id,
  date,
  precision: 'day',
  body: `Story ${id}`,
  createdOn: '2026-09-26',
  updatedOn: '2026-09-26',
  ...extra,
});

describe('journal', () => {
  it('files a story under the chapter its date falls in, boundaries half-open', () => {
    expect(chapterOf('2013-07-01', chapters)!.label).toBe('Early career');
    expect(chapterOf('2013-06-30', chapters)!.label).toBe('Growing up');
    expect(chapterOf('1980-01-01', chapters)).toBeNull();
  });

  it('files a fuzzy date by its resolved middle, not January 1st', () => {
    const [group] = storiesByChapter([entry('y', '2013-01-01', { precision: 'year' })], chapters);
    expect(group.chapter!.label).toBe('Early career');
  });

  it('lists newest chapter first and newest story first, early stories last', () => {
    const groups = storiesByChapter(
      [entry('a', '2000-01-01'), entry('b', '2025-01-01'), entry('c', '2026-01-01'), entry('x', '1985-05-05')],
      chapters,
    );
    expect(groups.map(g => g.chapter?.label ?? null)).toEqual(['Settling in', 'Growing up', null]);
    expect(groups[0].entries.map(e => e.id)).toEqual(['c', 'b']);
  });

  it('searches every word across title and body', () => {
    const list = [entry('a', '2020-01-01', { title: 'Landing day', body: 'Two suitcases' }), entry('b', '2020-01-01')];
    expect(searchEntries(list, 'landing SUITCASES').map(e => e.id)).toEqual(['a']);
    expect(searchEntries(list, '  ')).toHaveLength(2);
  });

  it('excerpts the first line only', () => {
    expect(excerpt(entry('a', '2020-01-01', { body: 'First line\nsecond' }))).toBe('First line');
  });
});
