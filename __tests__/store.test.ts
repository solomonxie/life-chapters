import { createMemoryRepository } from '../src/data/memory';
import { actions, useStore } from '../src/state/store';

const repo = createMemoryRepository();

beforeAll(() => actions.load(repo));

describe('store', () => {
  it('attaches the tracks picked while saving a date, and schedules them', () => {
    const id = actions.saveAnchor(
      { kind: 'visa-lodge', label: 'Lodge a visa application', date: '2028-06-01', precision: 'day' },
      ['skilled-migration-au'],
    );
    const s = useStore.getState();
    expect(s.plan.tracks).toHaveLength(1);
    expect(s.plan.tracks[0].anchorId).toBe(id);
    expect(s.view.steps.length).toBeGreaterThan(10);
  });

  it('marking a step done reflows, toasts, and can be undone', async () => {
    const first = useStore.getState().view.steps.find(s => s.blockedBy.length === 0)!;
    actions.markDone(first.instanceId, '2026-01-01');
    let s = useStore.getState();
    expect(s.view.steps.find(x => x.instanceId === first.instanceId)!.status).toBe('done');
    expect(s.toast?.message).toMatch(/^Done\./);
    expect(s.moves[first.instanceId]).toBeUndefined();

    actions.undo();
    s = useStore.getState();
    expect(s.view.steps.find(x => x.instanceId === first.instanceId)!.status).toBe('pending');
  });

  it('moving an anchor shows how many steps were rescheduled and marks them', () => {
    const anchor = useStore.getState().plan.anchors[0];
    actions.saveAnchor({ ...anchor, date: '2028-09-01' });
    const s = useStore.getState();
    expect(s.toast?.message).toMatch(/steps rescheduled\.$/);
    expect(Object.values(s.moves).every(m => m.to > m.from)).toBe(true);
  });

  it('persists through the repository', async () => {
    await new Promise<void>(r => setTimeout(r, 0));
    const stored = await repo.load();
    expect(stored?.anchors[0].date).toBe('2028-09-01');
  });

  it('deleting the anchor detaches its tracks', () => {
    actions.deleteAnchor(useStore.getState().plan.anchors[0].id);
    const s = useStore.getState();
    expect(s.plan.tracks).toEqual([]);
    expect(s.plan.instances).toEqual([]);
  });
});
