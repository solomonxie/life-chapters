import { AppState } from 'react-native';
import { formatShort } from '../domain/format';
import { isOpen } from '../domain/radar';
import { rebuildQueue } from '../notify/notifier';
import { calendar, reminders, setHapticsEnabled } from '../platform';
import { useReminders } from './reminders';
import { actions, useStore } from './store';

/**
 * Keeps what iOS holds — reminders, the optional calendar — in step with the
 * plan. Runs after every reflow and every foreground; cheap to call again.
 */
export async function syncNow() {
  const { view, now, settings } = useStore.getState();
  setHapticsEnabled(settings.haptics);
  // Ask once, at the first moment a reminder would mean something.
  if (!settings.askedNotifications && view.steps.some(isOpen)) {
    actions.updateSettings({ askedNotifications: true });
    if ((await reminders.status()) === 'undetermined') await reminders.request();
  }
  try {
    const q = await rebuildQueue(view.steps, now, settings);
    useReminders.setState(q);
  } catch (e) {
    console.warn('reminder sync failed', e);
  }
  if (settings.calendarMirror) {
    const events = view.steps.filter(isOpen).map(s => ({
      title: `Start: ${s.title}`,
      date: s.startBy,
      notes: `${s.playbook.title} · due ${formatShort(s.dueBy)}. From Life Chapters — a plan, not advice.`,
    }));
    const n = await calendar.sync(events).catch(() => 0);
    useReminders.setState({ calendarDenied: n < 0 });
  }
}

let timer: ReturnType<typeof setTimeout> | null = null;
const soon = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(syncNow, 400);
};

/** Wires the plan to iOS. `open` is called with a notification's target. */
export function startSync(open: (target: string) => void) {
  const unsub = useStore.subscribe((s, prev) => {
    if (s.view !== prev.view || s.settings !== prev.settings) soon();
    if (prev.settings.calendarMirror && !s.settings.calendarMirror) calendar.remove();
  });

  const checkOpened = async () => {
    const target = await reminders.takeOpened();
    if (target) open(target);
  };

  const sub = AppState.addEventListener('change', state => {
    if (state === 'active') {
      actions.refreshToday();
      soon();
      checkOpened();
    }
  });

  syncNow();
  checkOpened();

  return () => {
    unsub();
    sub.remove();
  };
}
