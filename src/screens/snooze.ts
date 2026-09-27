import { ActionSheetIOS } from 'react-native';
import { addDays } from '../domain/dates';
import { actions, useStore } from '../state/store';

const OPTIONS: Array<[string, number]> = [
  ['1 week', 7],
  ['2 weeks', 14],
  ['1 month', 30],
  ['3 months', 91],
];

/** Snooze from today. The step comes back to ACT NOW when it ends. */
export function pickSnooze(instanceId: string) {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      title: 'Snooze until…',
      options: [...OPTIONS.map(o => o[0]), 'Cancel'],
      cancelButtonIndex: OPTIONS.length,
    },
    i => {
      if (i < OPTIONS.length) {
        actions.snooze(instanceId, addDays(useStore.getState().now, OPTIONS[i][1]));
      }
    },
  );
}
