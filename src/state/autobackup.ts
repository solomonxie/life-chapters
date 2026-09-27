import { create } from 'zustand';
import { serializePlan, type Plan } from '../data/plan';
import { changeLine, changeLogName, dailyName, isSnapshot, snapshotName, snapshotsToPrune } from '../data/snapshots';
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

/** Rapid edits (ticking five checkboxes) settle into one write of today's copy. */
const SETTLE_MS = 1500;

let writing: Promise<void> = Promise.resolve();

/**
 * One backup pass: today's copy on the phone replaced (older days kept 30
 * days) and, if on, today's iCloud file replaced.
 */
export function backupNow(plan: Plan = useStore.getState().plan, tag?: string): Promise<void> {
  writing = writing.then(async () => {
    const now = new Date();
    const day = today(now);
    const text = serializePlan(plan, day);
    try {
      const name = snapshotName(now, tag);
      await files.writeBackup(name, text);
      const names = await files.listBackups();
      const gone = snapshotsToPrune(names, day);
      if (gone.length) await files.deleteBackups(gone);
      useBackups.setState({
        lastLocal: `${day}T${now.toTimeString().slice(0, 5)}`,
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

/** One line per change, in order, straight away — the daily copy can wait to settle. */
function logChange(who: string, what: string) {
  const at = new Date();
  writing = writing.then(() =>
    files.appendBackup(changeLogName(at), changeLine(at, who, what)).catch(e =>
      useBackups.setState({ error: `Couldn't add to the change log: ${(e as Error).message}` }),
    ),
  );
}

/** Backs up after every plan change; call once the store has loaded. */
export function startAutoBackup() {
  let timer: ReturnType<typeof setTimeout> | null = null;
  icloud.status().then(s => useBackups.setState({ icloudStatus: s }));
  files.listBackups().then(names => {
    const sorted = names.filter(isSnapshot).sort();
    useBackups.setState({ localCount: sorted.length, lastLocal: sorted[sorted.length - 1] ?? null });
  });

  return useStore.subscribe((s, prev) => {
    const turnedOn = s.settings.icloudBackup && !prev.settings.icloudBackup;
    if (s.plan !== prev.plan && s.lastChange && s.lastChange !== prev.lastChange) {
      logChange(s.lastChange.person, [s.lastChange.cause, s.lastChange.detail].filter(Boolean).join(' · '));
    }
    if (s.plan === prev.plan && !turnedOn) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => backupNow(useStore.getState().plan), turnedOn ? 0 : SETTLE_MS);
  });
}
