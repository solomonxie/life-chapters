import { BUNDLED_PLAYBOOKS } from '../src/content';
import { createMemoryRepository } from '../src/data/memory';
import { EMPTY_PLAN } from '../src/data/plan';
import { countryName, decidedBy, fits, livesIn, plansFor, twinFor, whereAt, whereOf, whereWhy } from '../src/domain/regions';
import type { Anchor, Playbook } from '../src/domain/types';
import { actions, useStore } from '../src/state/store';

const at = (date: string, location?: string, kind = 'moved-city'): Anchor =>
  ({ id: date, kind, label: 'Moved city', date, precision: 'day', location });
const BC = { country: 'CA', province: 'BC' };

describe('where a place is', () => {
  it('reads country and, in Canada, province', () => {
    expect(whereOf('Vancouver, British Columbia, Canada')).toEqual(BC);
    expect(whereOf('Nanchang, Jiangxi, China')).toEqual({ country: 'CN', province: undefined });
    expect(whereOf('London, England, United Kingdom')).toEqual({ country: undefined, province: undefined });
  });

  it('takes a place typed in Chinese as China', () => {
    expect(whereOf('进贤谢家村').country).toBe('CN');
  });
});

describe('where someone lives', () => {
  it('is where they last moved to, so far', () => {
    const anchors = [at('2020-01-01', 'Toronto, Ontario, Canada'), at('2024-06-01', 'Burnaby, British Columbia, Canada'), at('2030-01-01', 'Calgary, Alberta, Canada')];
    expect(livesIn(anchors, '2026-09-27')).toEqual(BC);
    expect(livesIn([], '2026-09-27')).toEqual({});
  });

  it("isn't moved by a wedding", () => {
    const anchors = [at('2020-01-01', 'Vancouver, British Columbia, Canada'), at('2024-06-01', 'Toronto, Ontario, Canada', 'married')];
    expect(livesIn(anchors, '2026-09-27')).toEqual(BC);
  });
});

describe('what decided the place', () => {
  const moved = at('2023-01-02', 'Vancouver, Washington, United States', 'migrated');
  const born = at('1988-08-06', 'Nanchang, Jiangxi, China', 'born');

  it('names the latest move for a Born plan, so a wrong pick can be fixed', () => {
    expect(decidedBy(born, [born, moved], '2026-09-27')).toBe(moved);
    expect(countryName(whereOf(moved.location).country)).toBe('United States');
  });

  it("is the plan's own date when it has a place", () => {
    const wedding = at('2022-06-22', 'Toronto, Ontario, Canada', 'married');
    expect(decidedBy(wedding, [moved], '2026-09-27')).toBe(wedding);
  });
});

describe('which plans fit', () => {
  const on = { id: 'on', country: 'CA', province: 'ON', family: 'school-years' } as Playbook;
  const bc = { id: 'bc', country: 'CA', province: 'BC', family: 'school-years' } as Playbook;
  const cn = { id: 'cn', country: 'CN', family: 'school-years' } as Playbook;
  const federal = { id: 'ca', country: 'CA' } as Playbook;

  it('fits by country, then province', () => {
    expect(fits(federal, BC)).toBe(true);
    expect(fits(on, BC)).toBe(false);
    expect(fits(cn, BC)).toBe(false);
    expect(fits(cn, { country: 'CN' })).toBe(true);
    expect(fits(on, {})).toBe(true);
  });

  it('finds the twin for where they are', () => {
    expect(twinFor(on, BC, [on, bc, cn])).toBe(bc);
    expect(twinFor(bc, { country: 'CN' }, [on, bc, cn])).toBe(cn);
    expect(twinFor(bc, BC, [on, bc, cn])).toBeUndefined();
  });

  it('a wedding follows where it happens; a birth follows where they live now', () => {
    const wedding = { kind: 'married', label: 'Married', location: 'Toronto, Ontario, Canada' };
    const born = { kind: 'born', label: 'Born', location: '进贤谢家村' };
    expect(whereAt(wedding, BC)).toEqual({ country: 'CA', province: 'ON' });
    expect(whereAt(born, BC)).toEqual(BC);
    expect(whereAt(born, {}).country).toBe('CN');
    expect(whereWhy(wedding, BC)).toBe('Married in Ontario');
    expect(whereWhy(born, BC)).toBe('lives in British Columbia');
  });

  it('a wedding in Toronto opens the Ontario plan for someone in BC', () => {
    const wedding = { kind: 'married', location: 'Toronto, Ontario, Canada' };
    expect(plansFor(wedding, BC, BUNDLED_PLAYBOOKS).map(p => p.id)).toEqual(['marriage-on']);
  });
});

describe('plans about leaving', () => {
  const exit = { id: 'exit', country: 'CN', leaving: true, anchorKind: 'migrated' } as Playbook;
  const arrive = { id: 'arrive', country: 'CA', province: 'BC', anchorKind: 'migrated' } as Playbook;
  const born = at('1988-08-06', 'Nanchang, Jiangxi, China', 'born');

  it('match where they lived before, and only when the event takes them elsewhere', () => {
    const toBC = at('2023-01-02', 'Vancouver, British Columbia, Canada', 'migrated');
    expect(plansFor(toBC, BC, [exit, arrive], [born, toBC]).map(p => p.id)).toEqual(['exit', 'arrive']);
    const withinChina = at('2010-01-02', 'Shanghai, China', 'migrated');
    expect(plansFor(withinChina, {}, [exit, arrive], [born, withinChina]).map(p => p.id)).toEqual([]);
  });
});

describe('where, in the store', () => {
  beforeAll(async () => {
    await actions.load(createMemoryRepository());
    actions.replacePlan(EMPTY_PLAN);
  });

  it('follows the latest move, and moving again moves it', () => {
    actions.saveAnchor({ kind: 'migrated', label: 'Relocated to a country', location: 'Vancouver, British Columbia, Canada', date: '2024-09-14', precision: 'day' });
    expect(useStore.getState().mine.where).toEqual(BC);
    actions.saveAnchor({ kind: 'moved-city', label: 'Moved city', location: 'Nanchang, Jiangxi, China', date: '2025-05-01', precision: 'day' });
    expect(useStore.getState().mine.where).toEqual({ country: 'CN', province: undefined });
    actions.deleteAnchor(useStore.getState().mine.anchors.find(a => a.kind === 'moved-city')!.id);
    expect(useStore.getState().mine.where).toEqual(BC);
  });

  it('switching a plan to its twin keeps its date and replaces its steps, in one undo', () => {
    actions.saveAnchor({ kind: 'born', label: 'Born', date: '1988-08-06', precision: 'day' });
    const born = useStore.getState().mine.anchors.find(a => a.kind === 'born')!;
    const trackId = actions.attachTrack('retirement-on', born.id)!;
    const next = actions.switchTrack(trackId, 'retirement-bc')!;
    const s = useStore.getState();
    expect(s.plan.tracks).toMatchObject([{ id: next, playbookId: 'retirement-bc', anchorId: born.id }]);
    expect(s.plan.instances.every(i => i.trackId === next)).toBe(true);
    actions.undo();
    expect(useStore.getState().plan.tracks[0].playbookId).toBe('retirement-on');
  });
});
