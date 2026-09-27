import { Alert } from 'react-native';
import { validatePlaybook } from '../domain/playbook';
import type { Playbook } from '../domain/types';
import { files } from '../platform';
import { actions, useStore } from '../state/store';

/** Out through the share sheet as plain JSON — the same shape import accepts. */
export async function exportPlaybook(playbook: Playbook) {
  const { id, title, summary, region, anchorKind, reviewedAt, version, sources, steps } = playbook;
  const json = JSON.stringify({ id, title, summary, region, anchorKind, reviewedAt, version, sources, steps }, null, 2);
  const path = await files.writeTemp(`${id}.json`, json);
  await files.share(path);
}

/** Document picker → validate → save. Resolves the new playbook's id. */
export async function importPlaybook(): Promise<string | null> {
  const path = await files.pickFile(['public.json', 'public.plain-text']);
  if (!path) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(await files.readText(path));
  } catch {
    Alert.alert("Can't import", "This file isn't JSON.");
    return null;
  }
  const result = validatePlaybook(parsed);
  if (!result.ok) {
    Alert.alert("Can't import", result.error);
    return null;
  }
  const existing = useStore.getState().playbooks.find(p => p.id === result.playbook.id);
  if (existing) {
    return new Promise(resolveId =>
      Alert.alert(
        `Replace "${existing.title}"?`,
        'A playbook with the same id is already in your library. Attached tracks reflow against the new steps.',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolveId(null) },
          {
            text: 'Replace',
            style: 'destructive',
            onPress: () => {
              actions.savePlaybook(result.playbook);
              resolveId(result.playbook.id);
            },
          },
        ],
      ),
    );
  }
  actions.savePlaybook(result.playbook);
  return result.playbook.id;
}
