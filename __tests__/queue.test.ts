import { addDays } from '../src/domain/dates';
import type { PlannedStep } from '../src/domain/plan';
import { buildQueue, PENDING_LIMIT } from '../src/notify/queue';

const NOW = '2026-09-26';
const pb = { id: 'p', title: 'Track', anchorKind: 'k', reviewedAt: NOW, steps: [] };

const step = (n: number, startBy: string, status: PlannedStep['status'] = 'pending') =>
  ({
    stepId: `s${n}`,
    instanceId: `i${n}`,
    title: `Step ${n}`,
    status,
    dueBy: startBy,
    startBy,
    earliestStart: null,
    atRisk: false,
    blockedBy: [],
    blockedByLate: [],
    trackId: 't',
    playbook: pb,
    template: {} as never,
    index: n,
    total: 0,
  } as PlannedStep);

const opts = { leadDays: 14, hour: 9, digest: { weekday: 1, hour: 9 } };

describe('reminder queue', () => {
  const many = Array.from({ length: 300 }, (_, i) => step(i, addDays(NOW, 30 + i)));

  it('never hands iOS more than 64, digest included', () => {
    const q = buildQueue(many, NOW, opts);
    expect(q.items).toHaveLength(PENDING_LIMIT);
    expect(q.items.filter(i => i.weekday)).toHaveLength(1);
    expect(q.wanted).toBe(300);
  });

  it('takes the nearest ones, lead days ahead of start-by', () => {
    const q = buildQueue(many, NOW, opts);
    expect(q.items[0]).toMatchObject({ id: 'step:i0', date: addDays(NOW, 16) });
    expect(q.through).toBe(addDays(NOW, 30 + 62 - 14));
  });

  it('a late step reminds tomorrow, not in the past', () => {
    const q = buildQueue([step(1, addDays(NOW, -5))], NOW, { ...opts, digest: null });
    expect(q.items).toEqual([expect.objectContaining({ date: addDays(NOW, 1) })]);
    expect(q.items[0].body).toMatch(/^Start by today\./);
  });

  it('skips steps that are done or not for me', () => {
    const q = buildQueue([step(1, NOW, 'done'), step(2, NOW, 'skipped')], NOW, opts);
    expect(q.items.map(i => i.id)).toEqual(['digest']);
  });
});
