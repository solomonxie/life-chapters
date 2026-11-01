import { addDays } from '../src/domain/dates';
import { createMemoryRepository } from '../src/data/memory';
import { actions, useStore } from '../src/state/store';

const repo = createMemoryRepository();

beforeAll(() => actions.load(repo));

describe('store', () => {
  it('attaches the tracks picked while saving a date, and schedules them', () => {
    const id = actions.saveAnchor(
      { kind: 'visa-lodge', label: 'Apply for permanent residence', date: '2028-06-01', precision: 'day' },
      ['skilled-migration-ca'],
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

describe('moving a step', () => {
  it('replaces the suggested date, pushes what waits on it, and can go back', () => {
    actions.saveAnchor(
      { kind: 'visa-lodge', label: 'Apply for permanent residence', date: '2029-06-01', precision: 'day' },
      ['skilled-migration-ca'],
    );
    const s = useStore.getState();
    const step = s.view.steps.find(x => x.status === 'pending' && s.view.steps.some(y => y.template.dependsOn.includes(x.stepId) && y.trackId === x.trackId))!;
    const waiter = s.view.steps.find(y => y.trackId === step.trackId && y.template.dependsOn.includes(step.stepId))!;
    const later = addDays(step.dueBy, 200);
    actions.moveDue(step.instanceId, later);
    let v = useStore.getState().view.steps;
    expect(v.find(x => x.instanceId === step.instanceId)!.dueBy).toBe(later);
    expect(v.find(x => x.instanceId === waiter.instanceId)!.startBy >= later).toBe(true);
    actions.moveDue(step.instanceId, undefined);
    v = useStore.getState().view.steps;
    expect(v.find(x => x.instanceId === step.instanceId)!.dueBy).toBe(step.dueBy);
  });
});

describe('a trip with an end and a purpose', () => {
  const stepIds = () => {
    const s = useStore.getState();
    const t = s.plan.tracks.find(x => x.playbookId === 'visa-us-ph')!;
    return new Map(s.view.steps.filter(x => x.trackId === t.id).map(x => [x.stepId, x]));
  };

  it('follows the return date and drops other purposes', () => {
    const id = actions.saveAnchor(
      { kind: 'trip', label: 'Trip abroad', location: 'New York, New York, United States', date: '2027-08-01', precision: 'day', purpose: 'leisure' },
      ['visa-us-ph'],
    );
    let steps = stepIds();
    expect(steps.has('business-letter')).toBe(false);
    expect(steps.has('host-invitation')).toBe(false);
    expect(steps.get('return')!.dueBy).toBe('2027-08-31');

    const trip = useStore.getState().plan.anchors.find(a => a.id === id)!;
    actions.saveAnchor({ ...trip, end: '2027-08-20', purpose: 'business' });
    steps = stepIds();
    expect(steps.get('return')!.dueBy).toBe('2027-08-20');
    expect(steps.get('i94-check')!.dueBy).toBe('2027-08-27');
    expect(steps.has('business-letter')).toBe(true);
    expect(useStore.getState().toast?.message).toMatch(/rescheduled\.$/);
  });
});

describe('a shipped plan that gained steps', () => {
  it('gives an attached track instances for the new steps on load', async () => {
    const before = useStore.getState().plan;
    const track = before.tracks.find(t => t.playbookId === 'visa-us-ph')!;
    const stored = {
      ...before,
      settings: useStore.getState().settings,
      moves: {},
      instances: before.instances.filter(i => !(i.trackId === track.id && i.stepId === 'insurance-check')),
    };
    await actions.load(createMemoryRepository(stored));
    const step = useStore.getState().view.steps.find(s => s.trackId === track.id && s.stepId === 'insurance-check')!;
    expect(step.instanceId.startsWith('unbound:')).toBe(false);
  });
});
