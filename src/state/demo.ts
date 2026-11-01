import { create } from 'zustand';
import { seedSample } from '../content/sample';
import { EMPTY_PLAN } from '../data/plan';
import type { Repository } from '../data/repository';
import { setDemoMode } from '../platform';
import { backupsSettled, refreshBackupState } from './autobackup';
import { actions, useStore } from './store';
import { syncNow } from './sync';

export interface Flags {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

export interface DataStores {
  real: () => Repository;
  demo: () => Repository;
  flags?: Flags;
}

/** `on`: demo data is on screen. */
export const useDemo = create(() => ({ on: false, switching: false }));

let stores: DataStores | null = null;
let real: Repository | null = null;
let demo: Repository | null = null;

async function openDemo() {
  await actions.load((demo ??= stores!.demo()));
  if (useStore.getState().plan.anchors.length === 0) seedDemo();
}

function seedDemo() {
  // The real app's notification prompt is not the demo's to trigger.
  actions.updateSettings({ firstRunDone: true, icloudBackup: true, askedNotifications: true });
  seedSample();
}

/** Opens the store the app was last on. */
export async function openData(s: DataStores) {
  stores = s;
  const on = (await s.flags?.get('demo').catch(() => null)) === '1';
  useDemo.setState({ on });
  if (!on) return actions.load((real ??= s.real()));
  setDemoMode(true);
  await openDemo();
}

/**
 * Real ↔ demo in place. The demo plan has its own store, and while it's on
 * screen reminders, calendar and backups never reach iOS or the real files.
 */
export async function setDemo(on: boolean) {
  const { on: was, switching } = useDemo.getState();
  if (!stores || switching || on === was) return;
  useDemo.setState({ switching: true });
  try {
    await backupsSettled();
    if (on) {
      setDemoMode(true);
      await openDemo();
    } else {
      await actions.load((real ??= stores.real()));
      await backupsSettled();
      setDemoMode(false);
      syncNow();
    }
    refreshBackupState();
    useDemo.setState({ on });
    await stores.flags?.set('demo', on ? '1' : '0').catch(e => console.warn('demo flag not saved', e));
  } finally {
    useDemo.setState({ switching: false });
  }
}

/** Back to the plan in `demo/`, as first installed. */
export function resetDemo() {
  if (!useDemo.getState().on) return;
  actions.replacePlan(EMPTY_PLAN);
  seedDemo();
}
