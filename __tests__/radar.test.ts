import { addDays } from '../src/domain/dates';
import {
  bucketOf,
  bucketize,
  deltaOf,
  recordMoves,
  summarize,
} from '../src/domain/radar';
import type { ScheduledStep } from '../src/domain/types';

const NOW = '2026-09-26';

const step = (id: string, startBy: string, extra: Partial<ScheduledStep> = {}): ScheduledStep => ({
  stepId: id,
  instanceId: `i-${id}`,
  title: id,
  status: 'pending',
  dueBy: addDays(startBy, 30),
  startBy,
  earliestStart: null,
  atRisk: false,
  blockedBy: [],
  blockedByLate: [],
  ...extra,
});

describe('radar buckets', () => {
  it('groups by start-by, late and imminent together in act-now', () => {
    expect(bucketOf(step('late', addDays(NOW, -5)), NOW)).toBe('now');
    expect(bucketOf(step('soon', addDays(NOW, 14)), NOW)).toBe('now');
    expect(bucketOf(step('d', addDays(NOW, 15)), NOW)).toBe('d90');
    expect(bucketOf(step('y', addDays(NOW, 200)), NOW)).toBe('year');
    expect(bucketOf(step('l', addDays(NOW, 400)), NOW)).toBe('later');
  });

  it('a step due in years but slow to obtain is act-now today', () => {
    const slow = step('slow', NOW, { dueBy: addDays(NOW, 730) });
    expect(bucketOf(slow, NOW)).toBe('now');
  });

  it('a snooze pushes a step out until the snooze ends', () => {
    const s = step('s', NOW, { status: 'snoozed', snoozedUntil: addDays(NOW, 30) });
    expect(bucketOf(s, NOW)).toBe('d90');
  });

  it('leaves out done and skipped steps, and sorts each group by date', () => {
    const b = bucketize(
      [
        step('b', addDays(NOW, 3)),
        step('a', addDays(NOW, 1)),
        step('done', NOW, { status: 'done' }),
        step('skip', NOW, { status: 'skipped' }),
      ],
      NOW,
    );
    expect(b.now.map(s => s.stepId)).toEqual(['a', 'b']);
  });
});

describe('reflow deltas', () => {
  const before = [step('a', '2027-01-12'), step('b', '2027-02-01')];

  it('marks what moved, which way, and from where', () => {
    const after = [step('a', '2026-10-03'), step('b', '2027-03-01')];
    const moves = recordMoves({}, before, after, 'Police check done', NOW);
    expect(moves['i-a']).toMatchObject({ from: '2027-01-12', to: '2026-10-03' });
    expect(deltaOf(moves['i-a'])).toBe('earlier');
    expect(deltaOf(moves['i-b'])).toBe('later');
  });

  it('keeps the first "was" date across repeated moves, clears on return', () => {
    const once = recordMoves({}, before, [step('a', '2027-01-01'), before[1]], 'x', NOW);
    const twice = recordMoves(once, [step('a', '2027-01-01'), before[1]], [step('a', '2026-12-01'), before[1]], 'y', NOW);
    expect(twice['i-a'].from).toBe('2027-01-12');
    const back = recordMoves(twice, [step('a', '2026-12-01')], [step('a', '2027-01-12')], 'z', NOW);
    expect(back['i-a']).toBeUndefined();
  });

  it('forgets a move after two weeks', () => {
    const moves = recordMoves({}, before, [step('a', '2027-01-01'), before[1]], 'x', NOW);
    const later = recordMoves(moves, before, before, 'noop', addDays(NOW, 15));
    expect(later).toEqual({});
  });

  it('never marks the step the user touched', () => {
    const after = [step('a', '2026-10-03'), before[1]];
    expect(recordMoves({}, before, after, 'x', NOW, ['i-a'])).toEqual({});
    expect(summarize(before, after, ['i-a']).moved).toBe(0);
  });

  it('summarizes count and dominant direction for the toast', () => {
    const after = [step('a', '2026-10-03'), step('b', '2027-01-01')];
    expect(summarize(before, after)).toEqual({ moved: 2, direction: 'earlier' });
  });
});
