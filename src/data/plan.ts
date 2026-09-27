import type { Moves } from '../domain/radar';
import type {
  Anchor,
  CivilDate,
  DocumentRecord,
  Entry,
  Playbook,
  StepInstance,
  Track,
} from '../domain/types';

/** Everything the user owns. Bundled playbooks are code, not data, and not here. */
export interface Plan {
  anchors: Anchor[];
  /** Imported or forked playbooks only. */
  playbooks: Playbook[];
  tracks: Track[];
  instances: StepInstance[];
  documents: DocumentRecord[];
  entries: Entry[];
}

export interface Settings {
  leadDays: number;
  digestWeekday: number; // 1 = Sunday, per iOS
  digestHour: number;
  digestOn: boolean;
  calendarMirror: boolean;
  haptics: boolean;
  lastExport?: { on: CivilDate; bytes: number };
  deniedBannerDismissed: boolean;
  collapsed: string[];
  firstRunDone: boolean;
  /** iOS only lets us ask once; after that it's Settings. */
  askedNotifications: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  leadDays: 14,
  digestWeekday: 1,
  digestHour: 9,
  digestOn: true,
  calendarMirror: false,
  haptics: true,
  deniedBannerDismissed: false,
  collapsed: ['year', 'later'],
  firstRunDone: false,
  askedNotifications: false,
};

export interface Stored extends Plan {
  settings: Settings;
  moves: Moves;
}

export const EMPTY_PLAN: Plan = {
  anchors: [],
  playbooks: [],
  tracks: [],
  instances: [],
  documents: [],
  entries: [],
};

export const BACKUP_FORMAT = 'life-chapters-backup';
export const BACKUP_VERSION = 2;

export function serializePlan(plan: Plan, now: CivilDate): string {
  return JSON.stringify(
    { format: BACKUP_FORMAT, version: BACKUP_VERSION, exportedOn: now, ...plan },
    null,
    2,
  );
}

export type ParsedBackup = { ok: true; plan: Plan } | { ok: false; error: string };

const isArr = (v: unknown): v is unknown[] => Array.isArray(v);

/** Reads a backup file. Shape-checks only; playbooks re-validate on use. */
export function parseBackup(text: string): ParsedBackup {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: "This file isn't JSON." };
  }
  const o = raw as Record<string, unknown>;
  if (!o || o.format !== BACKUP_FORMAT) {
    return { ok: false, error: "This isn't a Life Chapters backup." };
  }
  if (typeof o.version !== 'number' || o.version > BACKUP_VERSION) {
    return { ok: false, error: 'This backup is from a newer version of the app.' };
  }
  for (const key of ['anchors', 'playbooks', 'tracks', 'instances', 'documents']) {
    if (!isArr(o[key])) return { ok: false, error: `The backup is missing its ${key}.` };
  }
  return {
    ok: true,
    plan: {
      anchors: o.anchors as Anchor[],
      playbooks: o.playbooks as Playbook[],
      tracks: o.tracks as Track[],
      instances: o.instances as StepInstance[],
      documents: o.documents as DocumentRecord[],
      entries: isArr(o.entries) ? (o.entries as Entry[]) : [],
    },
  };
}
