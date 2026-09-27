import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

/** One route table for every tab's stack, so any screen can push any detail. */
export type Routes = {
  Timeline: undefined;
  Phase: { eventId: string };
  AnchorEdit: { anchorId?: string; kind?: string } | undefined;
  Settings: undefined;
  Reminders: undefined;
  Sources: undefined;
  About: undefined;
  Radar: { anchorId?: string } | undefined;
  Tracks: undefined;
  Library: undefined;
  Playbook: { playbookId: string; trackId?: string };
  Docs: undefined;
  Document: { documentId: string };
  Step: { instanceId: string };
  FirstRun: undefined;
};

export type Nav = NativeStackNavigationProp<Routes>;

export const useNav = () => useNavigation<Nav>();

/** Jump to a tab's root, optionally pushing a screen on top. */
export function goTab(
  nav: { navigate: (...args: any[]) => void },
  tab: 'TimelineTab' | 'RadarTab' | 'TracksTab' | 'DocsTab',
  screen?: keyof Routes,
  params?: object,
) {
  nav.navigate(tab, screen ? { screen, params, initial: false } : undefined);
}
