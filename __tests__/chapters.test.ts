import { lifeChapters, timelineNodes } from '../src/domain/plan';
import type { Anchor } from '../src/domain/types';
import { currentChapter, deriveChapters } from '../src/domain/chapters';
import type { LifeEvent } from '../src/domain/types';

const events: LifeEvent[] = [
  { id: 'b', label: 'Born', date: '1991-04-12', source: 'anchor' },
  { id: 'm', label: 'Migrated', date: '2024-09-14', source: 'anchor' },
  { id: 'c', label: 'Citizenship eligible', date: '2029-09-14', source: 'derived' },
];

describe('chapters', () => {
  it('folds events into contiguous intervals, last one open-ended', () => {
    const chapters = deriveChapters(events, '2026-09-26');
    expect(chapters.map(p => [p.start, p.end])).toEqual([
      ['1991-04-12', '2024-09-14'],
      ['2024-09-14', '2029-09-14'],
      ['2029-09-14', null],
    ]);
  });

  it('marks exactly one chapter current', () => {
    const chapters = deriveChapters(events, '2026-09-26');
    expect(chapters.filter(p => p.isCurrent)).toHaveLength(1);
    expect(currentChapter(chapters)?.label).toBe('Migrated');
  });

  it('sorts unordered input', () => {
    const chapters = deriveChapters([...events].reverse(), '2026-09-26');
    expect(chapters[0].label).toBe('Born');
  });

  it('has no current chapter when every event is ahead', () => {
    const chapters = deriveChapters(events, '1980-01-01');
    expect(currentChapter(chapters)).toBeUndefined();
  });

  it('a chapter boundary belongs to the later chapter', () => {
    expect(currentChapter(deriveChapters(events, '2024-09-14'))?.label).toBe(
      'Migrated',
    );
  });
});

describe('moments', () => {
  it("a visit sits on the line without opening a chapter", () => {
    const anchors: Anchor[] = [
      { id: 'b', kind: 'born', label: 'Born', date: '1990-01-01', precision: 'day' },
      { id: 'v', kind: 'visit', label: 'Visitors arrive', place: 'Mom and Dad', date: '2026-10-01', precision: 'day' },
    ];
    const nodes = timelineNodes(anchors, [], [], '2026-09-27');
    expect(nodes.map(n => n.label)).toContain('Mom and Dad arrive');
    expect(lifeChapters(nodes, '2026-09-27').map(c => c.eventId)).toEqual(['b']);
  });
});
