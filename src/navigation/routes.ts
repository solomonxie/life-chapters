import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

/** One route table for the one stack. */
export type Routes = {
  Timeline: undefined;
  Chapter: { eventId: string };
  AnchorEdit: { anchorId?: string; kind?: string } | undefined;
  Reminders: undefined;
  Backups: undefined;
  Sources: undefined;
  About: undefined;
  Person: { mode: 'new' | 'link' | 'rename'; personId?: string };
  Library: undefined;
  Playbook: { playbookId: string; trackId?: string };
  Document: { documentId: string };
  Step: { instanceId: string };
  FirstRun: undefined;
};

export type Nav = NativeStackNavigationProp<Routes>;

export const useNav = () => useNavigation<Nav>();
