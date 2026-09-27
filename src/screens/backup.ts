import { Alert } from 'react-native';
import { parseBackup, serializePlan } from '../data/plan';
import { files } from '../platform';
import { actions, useStore } from '../state/store';

export async function exportBackup(): Promise<boolean> {
  const { plan, now } = useStore.getState();
  const text = serializePlan(plan, now);
  const path = await files.writeTemp(`Life Chapters backup ${now}.json`, text);
  const shared = await files.share(path);
  if (shared) actions.updateSettings({ lastExport: { on: now, bytes: text.length } });
  return shared;
}

export async function importBackup() {
  const path = await files.pickFile(['public.json', 'public.plain-text']);
  if (!path) return;
  const parsed = parseBackup(await files.readText(path));
  if (!parsed.ok) {
    Alert.alert("Can't import", parsed.error);
    return;
  }
  const cur = useStore.getState().plan;
  const next = parsed.plan;
  Alert.alert(
    'Replace your plan?',
    `This file has ${next.anchors.length} dates and ${next.tracks.length} plans. Your current ${cur.anchors.length} dates and ${cur.tracks.length} plans are overwritten.`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Replace', style: 'destructive', onPress: () => actions.replacePlan(next) },
    ],
  );
}
