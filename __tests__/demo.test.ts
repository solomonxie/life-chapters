import { NativeModules } from 'react-native';
import { DEMO_EVENTS, DEMO_PERSON_PLANS } from '../demo/plan';
import { BUNDLED_PLAYBOOKS } from '../src/content';
import { demoDate } from '../src/content/sample';
import { createMemoryRepository } from '../src/data/memory';
import type { Stored } from '../src/data/plan';
import { files, icloud, setStoreRegion, storeRegion } from '../src/platform';
import { backupNow } from '../src/state/autobackup';
import { openData, resetDemo, setDemo, useDemo, type Flags } from '../src/state/demo';
import { actions, useStore } from '../src/state/store';
import { syncNow } from '../src/state/sync';

const native = {
  Files: { writeBackup: jest.fn(() => Promise.resolve()), appendBackup: jest.fn(() => Promise.resolve()), listBackups: jest.fn(() => Promise.resolve([])), deleteBackups: jest.fn(() => Promise.resolve()) },
  ICloudBackup: { status: jest.fn(() => Promise.resolve('available')), write: jest.fn(() => Promise.resolve()), list: jest.fn(() => Promise.resolve([])) },
  Reminders: { status: jest.fn(() => Promise.resolve('granted')), request: jest.fn(), replaceQueue: jest.fn((items: unknown[]) => Promise.resolve(items.length)), pendingCount: jest.fn(), takeOpened: jest.fn(() => Promise.resolve(null)) },
  CalendarMirror: { sync: jest.fn(() => Promise.resolve(1)), remove: jest.fn(() => Promise.resolve()) },
};
Object.assign(NativeModules, native);

const memoryFlags = (): Flags & { values: Map<string, string> } => {
  const values = new Map<string, string>();
  return { values, get: async k => values.get(k) ?? null, set: async (k, v) => void values.set(k, v) };
};

let realSaved: Stored | null = null;
const real = createMemoryRepository();
const realSave = real.save;
real.save = async s => {
  realSaved = JSON.parse(JSON.stringify(s));
  return realSave(s);
};
const flags = memoryFlags();
const stores = { real: () => real, demo: () => createMemoryRepository(), flags };
const resetNative = () => Object.values(native).forEach(m => Object.values(m).forEach(f => f.mockClear()));

describe('demo data', () => {
  beforeAll(async () => {
    await openData(stores);
    actions.updateSettings({ firstRunDone: true, calendarMirror: true, icloudBackup: true });
    actions.saveAnchor({ kind: 'born', label: 'Born', date: '1985-02-03', precision: 'day' });
  });

  it('opens the real plan when the flag is off', () => {
    expect(useDemo.getState()).toMatchObject({ on: false });
    expect(useStore.getState().plan.anchors.map(a => a.date)).toEqual(['1985-02-03']);
  });

  it('switches to a seeded demo plan without writing to the real store', async () => {
    const before = JSON.stringify(realSaved);
    await setDemo(true);
    const s = useStore.getState();
    expect(useDemo.getState().on).toBe(true);
    expect(flags.values.get('demo')).toBe('1');
    expect(s.plan.people.map(p => p.name)).toEqual(expect.arrayContaining(['Me', 'Sam', 'Ava']));
    expect(s.plan.anchors.length).toBeGreaterThanOrEqual(DEMO_EVENTS.length);
    expect(s.plan.documents.some(d => d.id === 'passport')).toBe(true);
    expect(s.view.steps.some(x => x.status === 'done')).toBe(true);
    expect(s.view.steps.some(x => x.status === 'pending')).toBe(true);

    actions.saveAnchor({ kind: 'married', label: 'Married', date: '2020-01-01', precision: 'day' });
    expect(JSON.stringify(realSaved)).toBe(before);
  });

  it('keeps reminders, calendar and backups away from iOS while demo data is on', async () => {
    resetNative();
    await syncNow();
    await backupNow();
    expect(native.Reminders.replaceQueue).not.toHaveBeenCalled();
    expect(native.CalendarMirror.sync).not.toHaveBeenCalled();
    expect(native.Files.writeBackup).not.toHaveBeenCalled();
    expect(native.ICloudBackup.write).not.toHaveBeenCalled();
    expect((await files.listBackups()).length).toBe(1);
    expect((await icloud.list()).length).toBe(1);
  });

  it('resets to the sample plan', () => {
    resetDemo();
    expect(useStore.getState().plan.anchors.some(a => a.date === '2020-01-01')).toBe(false);
    expect(useStore.getState().plan.people.some(p => p.name === 'Ava')).toBe(true);
  });

  it('comes back to the real plan and resumes syncing it', async () => {
    resetNative();
    await setDemo(false);
    expect(useStore.getState().plan.anchors.map(a => a.date)).toEqual(['1985-02-03']);
    expect(flags.values.get('demo')).toBe('0');
    await backupNow();
    expect(native.Files.writeBackup).toHaveBeenCalled();
    await syncNow();
    expect(native.Reminders.replaceQueue).toHaveBeenCalled();
  });

  it('reopens demo data when it was on at last launch', async () => {
    flags.values.set('demo', '1');
    await openData(stores);
    expect(useDemo.getState().on).toBe(true);
    expect(useStore.getState().plan.people.some(p => p.name === 'Ava')).toBe(true);
  });
});

describe('demo/plan.ts', () => {
  const ids = new Set(BUNDLED_PLAYBOOKS.map(p => p.id));

  it('only names bundled playbooks', () => {
    const named = [...DEMO_EVENTS.flatMap(e => e.plans ?? []), ...DEMO_PERSON_PLANS.flatMap(p => p.plans)];
    expect(named.filter(id => !ids.has(id))).toEqual([]);
  });

  it('resolves relative dates against today', () => {
    expect(demoDate('1991-04-12', '2026-10-01')).toBe('1991-04-12');
    expect(demoDate({ days: 30 }, '2026-10-01')).toBe('2026-10-31');
    expect(demoDate({ years: -2, on: '09-14' }, '2026-10-01')).toBe('2024-09-14');
  });
});

describe('storeRegion', () => {
  it('is us unless the build says cn', () => {
    expect(storeRegion()).toBe('us');
    setStoreRegion('cn');
    expect(storeRegion()).toBe('cn');
    setStoreRegion('bogus');
    expect(storeRegion()).toBe('us');
  });
});
