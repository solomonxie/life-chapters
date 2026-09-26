import type { CivilDate, ScheduledStep } from '../domain/types';

export interface Reminder {
  id: string;
  title: string;
  body: string;
  on: CivilDate;
}

/**
 * iOS keeps at most this many pending local notifications per app, so a plan
 * with hundreds of steps can only ever queue the nearest few — see
 * docs/DESIGN.md#constraints and IMPLEMENT_PLAN.md T4.3.
 */
export const PENDING_LIMIT = 64;

export interface Notifier {
  requestPermission(): Promise<boolean>;
  pending(): Promise<Reminder[]>;
  replaceQueue(reminders: Reminder[]): Promise<void>;
  cancelAll(): Promise<void>;
}

export function remindersFor(
  steps: ScheduledStep[],
  leadDays: number,
): Reminder[] {
  return steps
    .filter(s => s.status === 'pending')
    .map(s => ({
      id: `step:${s.instanceId}`,
      title: s.title,
      body: `Start by ${s.startBy}`,
      on: s.startBy,
    }))
    .sort((a, b) => (a.on < b.on ? -1 : 1))
    .map(r => ({ ...r, on: shift(r.on, -leadDays) }));
}

const shift = (date: CivilDate, days: number): CivilDate => {
  const [y, m, d] = date.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  return t.toISOString().slice(0, 10);
};

/** Stands in until notifee is wired up (IMPLEMENT_PLAN.md T4.2). */
export function createNoopNotifier(): Notifier {
  let queue: Reminder[] = [];
  return {
    requestPermission: async () => false,
    pending: async () => queue,
    replaceQueue: async reminders => {
      queue = reminders.slice(0, PENDING_LIMIT);
    },
    cancelAll: async () => {
      queue = [];
    },
  };
}
