import { addDays, diffDays } from '../src/domain/dates';
import {
  MissingDependencyError,
  PlaybookCycleError,
  expiryClashes,
  schedule,
  topoSort,
} from '../src/domain/schedule';
import type { Playbook, StepInstance, Track } from '../src/domain/types';

const ANCHOR = '2027-01-01';

const track: Track = {
  id: 't',
  playbookId: 'p',
  anchorEventDate: ANCHOR,
};

const playbook = (steps: Playbook['steps']): Playbook => ({
  id: 'p',
  title: 'Test',
  anchorKind: 'k',
  reviewedAt: '2026-09-26',
  steps,
});

const pending = (stepIds: string[]): StepInstance[] =>
  stepIds.map(stepId => ({
    id: `i-${stepId}`,
    trackId: 't',
    stepId,
    status: 'pending',
    checkedDocuments: [],
    checkedPrepare: [],
  }));

const done = (
  instances: StepInstance[],
  stepId: string,
  on: string,
): StepInstance[] =>
  instances.map(i =>
    i.stepId === stepId ? { ...i, status: 'done' as const, completedOn: on } : i,
  );

const index = (steps: ReturnType<typeof schedule>) =>
  new Map(steps.map(s => [s.stepId, s]));

const chain = playbook([
  { id: 'a', title: 'A', offsetDays: -100, durationDays: 10, dependsOn: [], documents: [], prepare: [] },
  { id: 'b', title: 'B', offsetDays: -50, durationDays: 20, validForDays: 30, dependsOn: ['a'], documents: [], prepare: [] },
  { id: 'c', title: 'C', offsetDays: 0, durationDays: 5, dependsOn: ['b'], documents: [], prepare: [] },
]);

describe('backward scheduling', () => {
  it('derives dueBy from the anchor and the offset', () => {
    const s = index(schedule(chain, track, pending(['a', 'b', 'c'])));
    expect(s.get('a')!.dueBy).toBe(addDays(ANCHOR, -100));
    expect(s.get('c')!.dueBy).toBe(ANCHOR);
  });

  it('starts just in time: startBy is dueBy minus the duration', () => {
    const s = index(schedule(chain, track, pending(['a', 'b', 'c'])));
    expect(diffDays(s.get('a')!.startBy, s.get('a')!.dueBy)).toBe(10);
    expect(diffDays(s.get('c')!.startBy, s.get('c')!.dueBy)).toBe(5);
  });

  it('clamps how early a result may be obtained before it expires', () => {
    const s = index(schedule(chain, track, pending(['a', 'b', 'c'])));
    // B is valid 30 days and takes 20 to get, so starting >50 days before
    // its deadline throws the result away.
    expect(diffDays(s.get('b')!.earliestStart!, s.get('b')!.dueBy)).toBe(50);
    expect(s.get('a')!.earliestStart).toBeNull();
  });

  it('lists the dependencies still outstanding, and drops them once done', () => {
    const instances = pending(['a', 'b', 'c']);
    expect(index(schedule(chain, track, instances)).get('b')!.blockedBy).toEqual(['a']);
    expect(
      index(schedule(chain, track, done(instances, 'a', '2026-01-01'))).get('b')!
        .blockedBy,
    ).toEqual([]);
  });
});

describe('reflow', () => {
  // A takes 100 days and isn't due until anchor-100, but B — which needs A —
  // is due at anchor-150. The playbook's own deadlines contradict each other.
  const tight = playbook([
    { id: 'a', title: 'A', offsetDays: -100, durationDays: 100, dependsOn: [], documents: [], prepare: [] },
    { id: 'b', title: 'B', offsetDays: -150, durationDays: 10, dependsOn: ['a'], documents: [], prepare: [] },
  ]);

  it('a dependency finishing late pushes its successor past the safe start', () => {
    const s = index(schedule(tight, track, pending(['a', 'b'])));
    // B's own deadline wants it started at anchor-160, but A won't be finished
    // until anchor-100. The dependency wins, and the step is flagged.
    expect(s.get('b')!.startBy).toBe(addDays(ANCHOR, -100));
    expect(s.get('b')!.atRisk).toBe(true);
  });

  it('finishing a step early moves its successors earlier', () => {
    const before = index(schedule(tight, track, pending(['a', 'b'])));
    const after = index(
      schedule(
        tight,
        track,
        done(pending(['a', 'b']), 'a', addDays(ANCHOR, -280)),
      ),
    );
    expect(after.get('b')!.startBy < before.get('b')!.startBy).toBe(true);
    expect(after.get('b')!.atRisk).toBe(false);
  });

  it('moving the anchor shifts every pending date by the same amount', () => {
    const base = index(schedule(chain, track, pending(['a', 'b', 'c'])));
    const moved = index(
      schedule(
        chain,
        { ...track, anchorEventDate: addDays(ANCHOR, 120) },
        pending(['a', 'b', 'c']),
      ),
    );
    for (const id of ['a', 'b', 'c']) {
      expect(diffDays(base.get(id)!.dueBy, moved.get(id)!.dueBy)).toBe(120);
      expect(diffDays(base.get(id)!.startBy, moved.get(id)!.startBy)).toBe(120);
    }
  });

  it('a step already done keeps its real date when the anchor moves', () => {
    const realDate = '2026-03-04';
    const instances = done(pending(['a', 'b', 'c']), 'a', realDate);
    for (const shift of [0, 120, -400]) {
      const s = index(
        schedule(
          chain,
          { ...track, anchorEventDate: addDays(ANCHOR, shift) },
          instances,
        ),
      );
      expect(s.get('a')!.startBy).toBe(realDate);
    }
  });

  it('records when a completed result expires', () => {
    const s = index(
      schedule(chain, track, done(pending(['a', 'b', 'c']), 'b', '2026-05-01')),
    );
    expect(s.get('b')!.expiresOn).toBe('2026-05-31');
    expect(s.get('a')!.expiresOn).toBeUndefined();
  });
});

describe('playbook validity', () => {
  it('orders steps so a dependency always comes first', () => {
    const ids = topoSort(chain.steps).map(s => s.id);
    expect(ids.indexOf('a')).toBeLessThan(ids.indexOf('b'));
    expect(ids.indexOf('b')).toBeLessThan(ids.indexOf('c'));
  });

  it('rejects a cycle instead of inventing dates', () => {
    const cyclic = playbook([
      { id: 'x', title: 'X', offsetDays: 0, durationDays: 1, dependsOn: ['y'], documents: [], prepare: [] },
      { id: 'y', title: 'Y', offsetDays: 0, durationDays: 1, dependsOn: ['x'], documents: [], prepare: [] },
    ]);
    expect(() => schedule(cyclic, track, pending(['x', 'y']))).toThrow(
      PlaybookCycleError,
    );
  });

  it('names the dependency that does not exist', () => {
    const dangling = playbook([
      { id: 'x', title: 'X', offsetDays: 0, durationDays: 1, dependsOn: ['ghost'], documents: [], prepare: [] },
    ]);
    expect(() => schedule(dangling, track, pending(['x']))).toThrow(
      MissingDependencyError,
    );
  });
});

describe('expiry clashes', () => {
  it('flags a held result that dies before the step needing it comes due', () => {
    const instances = done(pending(['a', 'b', 'c']), 'b', '2026-05-01');
    const scheduled = schedule(chain, track, instances);
    const clashes = expiryClashes(scheduled, chain);
    expect(clashes).toHaveLength(1);
    expect(clashes[0].source.stepId).toBe('b');
    expect(clashes[0].consumer.stepId).toBe('c');
  });

  it('stays quiet when the result is still valid', () => {
    const instances = done(pending(['a', 'b', 'c']), 'b', addDays(ANCHOR, -10));
    expect(expiryClashes(schedule(chain, track, instances), chain)).toEqual([]);
  });
});
