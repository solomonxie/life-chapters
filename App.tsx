import React, { useEffect, useState } from 'react';
import { StatusBar, View, useColorScheme } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { seedSample } from './src/content/sample';
import { EMPTY_PLAN } from './src/data/plan';
import { createSqliteRepository } from './src/data/sqlite';
import type { Repository } from './src/data/repository';
import { RootNavigator, navRef } from './src/navigation';
import { startSync } from './src/state/sync';
import { actions, useStore } from './src/state/store';
import { ToastHost, usePalette } from './src/ui';

/** A notification's target: "radar" or "step:<instanceId>". */
function openTarget(target: string) {
  if (!navRef.isReady()) return;
  const [kind, id] = target.split(/:(.+)/);
  navRef.navigate('Main', {
    screen: 'RadarTab',
    params:
      kind === 'step' && id
        ? { screen: 'Step', params: { instanceId: id }, initial: false }
        : { screen: 'Radar' },
  });
}

/** "Radar", "Step:3" (nth open step), "Document:passport" … after seeding. */
function qaJump(target: string) {
  const [screen, arg] = target.split(':');
  const tabOf: Record<string, string> = {
    Timeline: 'TimelineTab', Phase: 'TimelineTab', Settings: 'TimelineTab', Reminders: 'TimelineTab',
    AnchorEdit: 'TimelineTab', Sources: 'TimelineTab', About: 'TimelineTab',
    Radar: 'RadarTab', Step: 'RadarTab',
    Tracks: 'TracksTab', Library: 'TracksTab', Playbook: 'TracksTab',
    Docs: 'DocsTab', Document: 'DocsTab',
  };
  const s = useStore.getState();
  const open = s.view.steps.filter(x => x.status === 'pending').sort((a, b) => (a.startBy < b.startBy ? -1 : 1));
  const params: Record<string, object | undefined> = {
    Step: { instanceId: open[Number(arg ?? 0)]?.instanceId },
    Document: { documentId: arg ?? 'passport' },
    Playbook: { playbookId: arg ?? 'skilled-migration-au', trackId: s.plan.tracks.find(t => t.playbookId === (arg ?? 'skilled-migration-au'))?.id },
    Phase: { eventId: s.plan.anchors.find(a => a.kind === (arg ?? 'migrated'))?.id },
    AnchorEdit: arg ? { anchorId: s.plan.anchors.find(a => a.kind === arg)?.id } : undefined,
  };
  const tab = tabOf[screen] ?? 'TimelineTab';
  const root = tab.replace('Tab', '');
  navRef.navigate('Main', {
    screen: tab,
    params: screen === root ? { screen } : { screen, params: params[screen], initial: false },
  });
}

function Shell({ repository, qa }: { repository: Repository; qa?: string }) {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const ready = useStore(s => s.ready);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    actions.load(repository).then(() => {
      if (!qa) return;
      const [seed, jump] = qa.split('>');
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
