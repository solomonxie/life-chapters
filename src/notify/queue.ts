import { addDays, maxDate } from '../domain/dates';
import { formatRelative, formatShort } from '../domain/format';
import type { PlannedStep } from '../domain/plan';
import { attentionDate, isOpen } from '../domain/radar';
import type { CivilDate } from '../domain/types';
import type { NativeReminder } from '../platform';

/** iOS holds at most 64 pending local notifications per app. */
export const PENDING_LIMIT = 64;

export interface QueuePlan {
  items: NativeReminder[];
  /** Open steps that deserve a reminder, queued or not. */
  wanted: number;
  /** Date of the last one-off reminder handed to iOS. */
  through: CivilDate | null;
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const weekdayName = (w: number) => WEEKDAYS[(w - 1 + 7) % 7];

/**
 * The nearest reminders that fit under the cap, one per open step at
 * `startBy − leadDays` (never in the past), plus the weekly digest. The rest
 * wait for the next rebuild, which happens on every foreground and reflow.
 */
export function buildQueue(
  steps: PlannedStep[],
  now: CivilDate,
  opts: { leadDays: number; hour: number; digest: { weekday: number; hour: number } | null },
): QueuePlan {
  const tomorrow = addDays(now, 1);
  const candidates = steps
    .filter(isOpen)
    .map(s => ({ step: s, on: maxDate(addDays(attentionDate(s), -opts.leadDays), tomorrow) }))
    .sort((a, b) => (a.on < b.on ? -1 : a.on > b.on ? 1 : 0));

  const room = PENDING_LIMIT - (opts.digest ? 1 : 0);
  const chosen = candidates.slice(0, room);

  const items: NativeReminder[] = chosen.map(({ step, on }) => {
    const due = attentionDate(step);
    const when = due <= on ? 'today' : `${formatShort(due)} · ${formatRelative(due, on)}`;
    return {
      id: `step:${step.instanceId}`,
      title: step.title,
      body: `Start by ${when}. ${step.playbook.title}`,
      date: on,
      hour: opts.hour,
      target: `step:${step.instanceId}`,
    };
  });

  if (opts.digest) {
    items.push({
      id: 'digest',
      title: 'This week in your plan',
      body: 'Open the Radar to see what needs starting.',
      weekday: opts.digest.weekday,
      hour: opts.digest.hour,
      target: 'radar',
    });
  }

  return {
    items,
    wanted: candidates.length,
    through: chosen.length ? chosen[chosen.length - 1].on : null,
  };
}
