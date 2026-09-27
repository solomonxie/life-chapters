import { NativeModules } from 'react-native';

/**
 * The app's own Swift modules (ios/LifeChapters/Native). Each falls back to a
 * harmless no-op when absent, so tests and a JS-only run don't crash.
 */
const N = NativeModules as Record<string, any>;

export type Permission = 'granted' | 'denied' | 'undetermined';

export interface NativeReminder {
  id: string;
  title: string;
  body: string;
  /** One-off: civil date. Repeating: weekday (1 = Sunday). */
  date?: string;
  weekday?: number;
  hour: number;
  target: string;
}

export const reminders = {
  status: (): Promise<Permission> => N.Reminders?.status() ?? Promise.resolve('undetermined'),
  request: (): Promise<boolean> => N.Reminders?.request() ?? Promise.resolve(false),
  replaceQueue: (items: NativeReminder[]): Promise<number> =>
    N.Reminders?.replaceQueue(items) ?? Promise.resolve(0),
  pendingCount: (): Promise<number> => N.Reminders?.pendingCount() ?? Promise.resolve(0),
  takeOpened: (): Promise<string | null> => N.Reminders?.takeOpened() ?? Promise.resolve(null),
};

export const files = {
  writeTemp: (name: string, text: string): Promise<string> => N.Files.writeTemp(name, text),
  readText: (path: string): Promise<string> => N.Files.readText(path),
  share: (path: string): Promise<boolean> => N.Files.share(path),
  /** Uniform type identifiers, e.g. public.json. Resolves a local path or null. */
  pickFile: (kinds: string[]): Promise<string | null> => N.Files.pickFile(kinds),
  addScan: (source: 'camera' | 'photos' | 'files'): Promise<string | null> =>
    N.Files.addScan(source),
  scanPath: (name: string): Promise<string | null> =>
    N.Files?.scanPath(name) ?? Promise.resolve(null),
  deleteScan: (name: string): Promise<void> => N.Files?.deleteScan(name) ?? Promise.resolve(),
  openFolder: (which: 'Scans' | 'Backups'): Promise<boolean> => N.Files.openFolder(which),
  writeBackup: (name: string, text: string): Promise<void> =>
    N.Files?.writeBackup(name, text) ?? Promise.resolve(),
  appendBackup: (name: string, text: string): Promise<void> =>
    N.Files?.appendBackup(name, text) ?? Promise.resolve(),
  listBackups: (): Promise<string[]> => N.Files?.listBackups() ?? Promise.resolve([]),
  readBackup: (name: string): Promise<string> => N.Files.readBackup(name),
  deleteBackups: (names: string[]): Promise<void> =>
    N.Files?.deleteBackups(names) ?? Promise.resolve(),
};

export type ICloudStatus = 'available' | 'driveOff' | 'notEntitled' | 'notReady';

export const icloud = {
  status: (): Promise<ICloudStatus> => N.ICloudBackup?.status() ?? Promise.resolve('notEntitled'),
  write: (name: string, text: string): Promise<void> => N.ICloudBackup.write(name, text),
  list: (): Promise<string[]> => N.ICloudBackup?.list() ?? Promise.resolve([]),
  read: (name: string): Promise<string> => N.ICloudBackup.read(name),
};

export const calendar = {
  /** Resolves the number written, or -1 when access is refused. */
  sync: (events: Array<{ title: string; date: string; notes?: string }>): Promise<number> =>
    N.CalendarMirror?.sync(events) ?? Promise.resolve(0),
  remove: (): Promise<void> => N.CalendarMirror?.remove() ?? Promise.resolve(),
};

export type HapticKind = 'success' | 'warning' | 'light' | 'medium' | 'selection';

let hapticsOn = true;
export const setHapticsEnabled = (on: boolean) => {
  hapticsOn = on;
};
export const haptic = (kind: HapticKind = 'light') => {
  if (hapticsOn) N.Haptics?.play(kind);
};
