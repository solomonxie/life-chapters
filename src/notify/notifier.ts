import type { PlannedStep } from '../domain/plan';
import type { Settings } from '../data/plan';
import type { CivilDate } from '../domain/types';
import { reminders, type Permission } from '../platform';
import { buildQueue } from './queue';

export interface QueueState {
  permission: Permission;
  queued: number;
  wanted: number;
  through: CivilDate | null;
}

/** Hands iOS the nearest reminders. Safe to call on every reflow. */
export async function rebuildQueue(
  steps: PlannedStep[],
  now: CivilDate,
  settings: Settings,
): Promise<QueueState> {
  const permission = await reminders.status();
  const plan = buildQueue(steps, now, {
    leadDays: settings.leadDays,
    hour: 9,
    digest: settings.digestOn ? { weekday: settings.digestWeekday, hour: settings.digestHour } : null,
  });
  if (permission !== 'granted') {
    return { permission, queued: 0, wanted: plan.wanted, through: null };
  }
  const queued = await reminders.replaceQueue(plan.items);
  return { permission, queued, wanted: plan.wanted, through: plan.through };
}
