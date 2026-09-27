import React, { useEffect, useState } from 'react';
import { Appearance, StatusBar, View, useColorScheme } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { seedSample } from './src/content/sample';
import { EMPTY_PLAN } from './src/data/plan';
import { createSqliteRepository } from './src/data/sqlite';
import type { Repository } from './src/data/repository';
import { RootNavigator, navRef } from './src/navigation';
import { startAutoBackup } from './src/state/autobackup';
import { startSync } from './src/state/sync';
import { trackOwner } from './src/domain/people';
import { actions, useStore } from './src/state/store';
import { ToastHost, usePalette } from './src/ui';

/** A notification's target: "plans" or "step:<instanceId>". A step opens on its owner's board. */
function openTarget(target: string) {
  if (!navRef.isReady()) return;
  const [kind, id] = target.split(/:(.+)/);
  const s = useStore.getState();
  const track = s.plan.tracks.find(t => id?.startsWith(`${t.id}:`));
  if (track) actions.switchPerson(trackOwner(track, s.plan.anchors));
  navRef.navigate('Main', kind === 'step' && id ? { screen: 'Step', params: { instanceId: id } } : { screen: 'Timeline' });
}

/** "Timeline", "Timeline:Ava" (her board), "Step:3" (nth open step), "Document:passport" … after seeding. */
function qaJump(target: string) {
  const [screen, arg] = target.split(':');
  const s = useStore.getState();
  if (screen === 'Timeline' && arg) {
    const person = s.plan.people.find(x => x.name === arg);
    if (person) actions.switchPerson(person.id);
  }
  const mine = useStore.getState().mine;
  const open = mine.view.steps.filter(x => x.status === 'pending').sort((a, b) => (a.startBy < b.startBy ? -1 : 1));
  const params: Record<string, object | undefined> = {
    Step: { instanceId: open[Number(arg ?? 0)]?.instanceId },
    Document: { documentId: arg ?? 'passport' },
    Playbook: { playbookId: arg ?? 'skilled-migration-ca', trackId: mine.tracks.find(t => t.playbookId === (arg ?? 'skilled-migration-ca'))?.id },
    Chapter: { eventId: mine.anchors.find(a => a.kind === (arg ?? 'migrated'))?.id },
    AnchorEdit: arg ? { anchorId: mine.anchors.find(a => a.kind === arg)?.id } : undefined,
  };
  const known = ['Chapter', 'AnchorEdit', 'Reminders', 'Backups', 'Sources', 'About', 'Step', 'Library', 'Playbook', 'Document'];
  navRef.navigate('Main', known.includes(screen) ? { screen, params: params[screen] } : { screen: 'Timeline' });
}

function Shell({ repository, qa }: { repository: Repository; qa?: string }) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const ready = useStore(s => s.ready);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    actions.load(repository).then(() => {
      if (!qa) return;
      const [spec, scheme] = qa.split('@');
      if (scheme === 'light' || scheme === 'dark') Appearance.setColorScheme(scheme);
      const [seed, jump] = spec.split('>');
      if (seed === 'sample') {
        actions.replacePlan(EMPTY_PLAN);
        actions.updateSettings({ firstRunDone: true });
        seedSample();
      } else if (seed === 'empty') {
        actions.replacePlan(EMPTY_PLAN);
        actions.updateSettings({ firstRunDone: false });
      }
      if (jump) setTimeout(() => qaJump(jump), 300);
    });
  }, [repository, qa]);

  useEffect(() => {
    if (ready && navReady) return startSync(openTarget);
  }, [ready, navReady]);

  // QA runs write sample data; keep it out of the real Backups folder.
  useEffect(() => {
    if (ready && !qa) return startAutoBackup();
  }, [ready, qa]);

  if (!ready) return <View style={{ flex: 1, backgroundColor: p.bg }} />;

  return (
    <>
      <RootNavigator onReady={() => setNavReady(true)} />
      <ToastHost bottom={insets.bottom + 58} />
    </>
  );
}

export default function App({ repository, qa }: { repository?: Repository; qa?: string }) {
  const dark = useColorScheme() === 'dark';
  const [repo] = useState(
    () => repository ?? (qa ? createSqliteRepository('qa.db') : createSqliteRepository()),
  );
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <Shell repository={repo} qa={qa} />
    </SafeAreaProvider>
  );
}
