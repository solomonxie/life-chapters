import { BUNDLED_PLAYBOOKS } from '../src/content';
import { createMemoryRepository } from '../src/data/memory';
import { EMPTY_PLAN } from '../src/data/plan';
import { opens } from '../src/domain/kinds';
import { ME } from '../src/domain/people';
import { plansFor } from '../src/domain/regions';
import { actions, useStore } from '../src/state/store';

const BC = { country: 'CA', province: 'BC' };
const ids = (kind: string) => plansFor({ kind }, BC, BUNDLED_PLAYBOOKS).map(p => p.id);
const state = () => useStore.getState();

describe('what an event opens', () => {
  it('opens plans counted from Born for school, retiring and a child', () => {
    expect(ids('school-start')).toEqual(['school-years-bc']);
    expect(ids('retire').sort()).toEqual(['retire-ca', 'retirement-bc']);
    expect(ids('child-born').sort()).toEqual(['early-years-bc', 'newborn-bc']);
  });

  it('every event but a permit or a trip has a plan in BC', () => {
    expect(ids('graduated')).toEqual(['graduated-ca']);
    expect(ids('first-job')).toEqual(['first-job-ca']);
    expect(ids('new-job')).toEqual(['first-job-ca']);
    expect(ids('moved-city')).toEqual(['moved-city-bc']);
    expect(ids('home-bought')).toEqual(['home-bought-bc']);
    for (const kind of ['job-lost', 'business-started', 'home-sold', 'car-bought', 'cohabiting', 'separated', 'caregiving', 'family-death', 'pr-landed', 'visa-granted']) {
      expect([kind, ids(kind).length > 0]).toEqual([kind, true]);
    }
  });

  it('a new job opens the job-start plans', () => {
    expect(opens('new-job', { anchorKind: 'first-job' })).toBe('self');
    expect(opens('new-job', { anchorKind: 'born', family: 'retirement' })).toBeNull();
  });
});

describe('attaching from the event form', () => {
  beforeAll(async () => {
    await actions.load(createMemoryRepository());
    actions.replacePlan(EMPTY_PLAN);
  });

  it("puts a child's newborn plan on her board, counted from her birth", () => {
    actions.saveAnchor({ kind: 'child-born', label: 'Child born', date: '2025-03-18', precision: 'day' }, ['newborn-bc'], 'Ava');
    const ava = state().plan.people.find(p => p.name === 'Ava')!;
    const born = state().plan.anchors.find(a => a.kind === 'born' && a.personId === ava.id)!;
    expect(state().plan.tracks).toMatchObject([{ playbookId: 'newborn-bc', personId: ava.id, anchorId: born.id }]);
  });

  it('hangs school years on their own Born, and skips it with no Born', () => {
    actions.switchPerson(ME);
    actions.saveAnchor({ kind: 'school-start', label: 'Starts primary school', date: '1994-09-01', precision: 'day' }, ['school-years-bc']);
    expect(state().plan.tracks).toHaveLength(1);
    actions.saveAnchor({ kind: 'born', label: 'Born', date: '1988-08-06', precision: 'day' });
    actions.saveAnchor({ kind: 'school-start', label: 'Starts primary school', date: '1994-09-01', precision: 'day' }, ['school-years-bc']);
    const born = state().mine.anchors.find(a => a.kind === 'born')!;
    expect(state().plan.tracks[1]).toMatchObject({ playbookId: 'school-years-bc', personId: ME, anchorId: born.id });
  });
});
