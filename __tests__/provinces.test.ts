import { createMemoryRepository } from '../src/data/memory';
import { EMPTY_PLAN } from '../src/data/plan';
import { ME } from '../src/domain/people';
import { fitsProvince, livesIn, provinceOf, twinFor } from '../src/domain/provinces';
import type { Anchor, Playbook } from '../src/domain/types';
import { actions, useStore } from '../src/state/store';

const at = (date: string, location?: string): Anchor =>
  ({ id: date, kind: 'moved-city', label: 'Moved city', date, precision: 'day', location });

describe('provinces', () => {
  it('reads the province from a Canadian place only', () => {
    expect(provinceOf('Vancouver, British Columbia, Canada')).toBe('BC');
    expect(provinceOf('London, Ontario, Canada')).toBe('ON');
    expect(provinceOf('London, England, United Kingdom')).toBeUndefined();
    expect(provinceOf('进贤谢家村')).toBeUndefined();
  });

  it('lives where the latest past event happened, unless set by hand', () => {
    const anchors = [at('2020-01-01', 'Toronto, Ontario, Canada'), at('2024-06-01', 'Burnaby, British Columbia, Canada'), at('2030-01-01', 'Calgary, Alberta, Canada')];
    expect(livesIn(undefined, anchors, '2026-09-27')).toBe('BC');
    expect(livesIn('ON', anchors, '2026-09-27')).toBe('ON');
    expect(livesIn(undefined, [], '2026-09-27')).toBeUndefined();
  });

  it('fits Canada-wide plans everywhere and provincial ones at home', () => {
    const on = { province: 'ON', family: 'school-years', id: 'on' } as Playbook;
    const bc = { province: 'BC', family: 'school-years', id: 'bc' } as Playbook;
    const federal = { id: 'ca' } as Playbook;
    expect(fitsProvince(federal, 'BC')).toBe(true);
    expect(fitsProvince(on, 'BC')).toBe(false);
    expect(fitsProvince(on, undefined)).toBe(true);
    expect(twinFor(on, 'BC', [on, bc, federal])).toBe(bc);
    expect(twinFor(bc, 'BC', [on, bc])).toBeUndefined();
  });
});

describe('province in the store', () => {
  beforeAll(async () => {
    await actions.load(createMemoryRepository());
    actions.replacePlan(EMPTY_PLAN);
  });

  it('infers from a place on a date, and a hand-set province wins', () => {
    actions.saveAnchor({ kind: 'migrated', label: 'Migrated to a country', location: 'Vancouver, British Columbia, Canada', date: '2024-09-14', precision: 'day' });
    expect(useStore.getState().mine.province).toBe('BC');
    actions.setProvince(ME, 'ON');
    expect(useStore.getState().mine.province).toBe('ON');
    actions.setProvince(ME, undefined);
    expect(useStore.getState().mine.province).toBe('BC');
  });

  it('switching a plan to its twin keeps its date and replaces its steps, in one undo', () => {
    actions.saveAnchor({ kind: 'born', label: 'Born', date: '1988-08-06', precision: 'day' });
    const born = useStore.getState().mine.anchors.find(a => a.kind === 'born')!;
    const trackId = actions.attachTrack('retirement-on', born.id)!;
    const twin = useStore.getState().playbooks.find(p => p.family === 'retirement' && p.province !== 'ON');
    if (!twin) return;
    const next = actions.switchTrack(trackId, twin.id)!;
    const s = useStore.getState();
    expect(s.plan.tracks).toMatchObject([{ id: next, playbookId: twin.id, anchorId: born.id }]);
    expect(s.plan.instances.every(i => i.trackId === next)).toBe(true);
    actions.undo();
    expect(useStore.getState().plan.tracks[0].playbookId).toBe('retirement-on');
  });
});
