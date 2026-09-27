import { create } from 'zustand';
import { serializePlan, type Plan } from '../data/plan';
import { dailyName, snapshotName, snapshotsToPrune } from '../data/snapshots';
import { today } from '../domain/dates';
import { files, icloud, type ICloudStatus } from '../platform';
import { useStore } from './store';

export interface BackupState {
  lastLocal: string | null;
  localCount: number;
  lastICloud: string | null;
  icloudStatus: ICloudStatus | 'unknown';
  error: string | null;
}

export const useBackups = create<BackupState>(() => ({
  lastLocal: null,
  localCount: 0,
  lastICloud: null,
  icloudStatus: 'unknown',
  error: null,
}));

/** Rapid edits (ticking five checkboxes) settle into one snapshot. */
const SETTLE_MS = 1500;

let writing: Promise<void> = Promise.resolve();

/**
 * One backup pass: a new snapshot on the phone (never overwritten, then
 * pruned to 20 a day for 7 days) and, if on, today's iCloud file replaced.
 */
export function backupNow(plan: Plan = useStore.getState().plan): Promise<void> {
  writing = writing.then(async () => {
    const now = new Date();
    const day = today(now);
    const text = serializePlan(plan, day);
    try {
      const name = snapshotName(now);
      await files.writeBackup(name, text);
      const names = await files.listBackups();
      const gone = snapshotsToPrune(names, day);
      if (gone.length) await files.deleteBackups(gone);
      useBackups.setState({
        lastLocal: name,
        localCount: names.length - gone.length,
        error: null,
      });
    } catch (e) {
      useBackups.setState({ error: `Couldn't write a snapshot: ${(e as Error).message}` });
    }

    if (useStore.getState().settings.icloudBackup) {
      const status = await icloud.status();
      useBackups.setState({ icloudStatus: status });
      if (status === 'available') {
        try {
          await icloud.write(dailyName(day), text);
          useBackups.setState({ lastICloud: `${day}T${now.toTimeString().slice(0, 8)}` });
        } catch (e) {
          useBackups.setState({ error: `Couldn't write to iCloud: ${(e as Error).message}` });
        }
      }
    }
  });
  return writing;
}

/** Backs up after every plan change; call once the store has loaded. */
export function startAutoBackup() {
  let timer: ReturnType<typeof setTimeout> | null = null;
  icloud.status().then(s => useBackups.setState({ icloudStatus: s }));
  files.listBackups().then(names => {
    const sorted = names.filter(n => /^\d{4}-/.test(n)).sort();
    useBackups.setState({ localCount: sorted.length, lastLocal: sorted[sorted.length - 1] ?? null });
  });

  return useStore.subscribe((s, prev) => {
    const turnedOn = s.settings.icloudBackup && !prev.settings.icloudBackup;
    if (s.plan === prev.plan && !turnedOn) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => backupNow(useStore.getState().plan), turnedOn ? 0 : SETTLE_MS);
  });
}
