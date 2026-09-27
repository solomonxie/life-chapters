import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatShort } from '../domain/format';
import { anchorDisplay, type PlannedStep } from '../domain/plan';
import { BUCKETS, bucketize, type Bucket } from '../domain/radar';
import type { Routes } from '../navigation/routes';
import { goTab } from '../navigation/routes';
import { haptic, reminders } from '../platform';
import { useReminders } from '../state/reminders';
import { actions, useStore } from '../state/store';
import {
  Card,
  CheckRow,
  EmptyState,
  Rows,
  SectionHeader,
  StepRow,
  SwipeRow,
  space,
  type,
  usePalette,
} from '../ui';
import { pickSnooze } from './snooze';

const TITLES: Record<Bucket, string> = {
  now: '⚠ Act now',
  d90: 'Next 90 days',
  year: 'This year',
  later: 'Later',
};

type Only = 'all' | 'blocked' | 'docs';

export function RadarScreen({ route, navigation }: NativeStackScreenProps<Routes, 'Radar'>) {
  const p = usePalette();
  const view = useStore(s => s.view);
  const plan = useStore(s => s.plan);
  const playbooks = useStore(s => s.playbooks);
  const moves = useStore(s => s.moves);
  const now = useStore(s => s.now);
  const settings = useStore(s => s.settings);
  const permission = useReminders(s => s.permission);
  const [filterOpen, setFilterOpen] = useState(false);
  const [hidden, setHidden] = useState<string[]>([]);
  const [only, setOnly] = useState<Only>('all');
  const anchorId = route.params?.anchorId;
  const anchor = plan.anchors.find(a => a.id === anchorId);

  const filtered = anchorId || hidden.length || only !== 'all';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerRight: () => (
        <Pressable
          onPress={() => setFilterOpen(o => !o)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityState={{ expanded: filterOpen }}>
          <Text style={[type.body, { color: p.accent }]}>
            {filterOpen ? 'Filter ⌄' : filtered ? 'Filter ●' : 'Filter…'}
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, filterOpen, filtered, p]);

  const steps = useMemo(() => {
    const anchorTracks = anchorId
      ? new Set(plan.tracks.filter(t => t.anchorId === anchorId).map(t => t.id))
      : null;
    return view.steps.filter(s => {
      if (anchorTracks && !anchorTracks.has(s.trackId)) return false;
      if (hidden.includes(s.trackId)) return false;
      if (only === 'blocked' && s.blockedBy.length === 0) return false;
      if (only === 'docs') {
        const inst = plan.instances.find(i => i.id === s.instanceId);
        if (!s.template.documents.some(d => !inst?.checkedDocuments.includes(d))) return false;
      }
      return true;
    });
  }, [view.steps, plan.tracks, plan.instances, anchorId, hidden, only]);

  const buckets = useMemo(() => bucketize(steps, now), [steps, now]);
  const total = BUCKETS.reduce((n, b) => n + buckets[b].length, 0);

  const toggleCollapsed = (b: Bucket) => {
    const c = settings.collapsed;
    actions.updateSettings({ collapsed: c.includes(b) ? c.filter(x => x !== b) : [...c, b] });
  };

  const showBanner = permission === 'denied' && !settings.deniedBannerDismissed && plan.tracks.length > 0;

  const row = (s: PlannedStep, b: Bucket) => (
    <SwipeRow
      key={s.instanceId}
      trailing={[
        { label: 'Done', color: p.done, onPress: () => { haptic('success'); actions.markDone(s.instanceId); } },
        { label: 'Snooze', color: p.accent, onPress: () => pickSnooze(s.instanceId) },
      ]}
      leading={[{ label: 'Not for me', color: p.dim, onPress: () => actions.skip(s.instanceId) }]}>
      <StepRow
        step={s}
        now={now}
        detailed={b === 'now'}
        lateRed={b === 'now'}
        move={moves[s.instanceId]}
        subtitle={s.playbook.title}
        onPress={() => navigation.navigate('Step', { instanceId: s.instanceId })}
      />
    </SwipeRow>
  );

  const nextUp = steps
    .filter(s => s.status === 'pending' || s.status === 'snoozed')
    .sort((a, b) => (a.startBy < b.startBy ? -1 : 1))[0];

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      {filterOpen ? (
        <Card style={styles.filter}>
          <SectionHeader title="Track" />
          <Rows>
            {plan.tracks.map(t => (
              <CheckRow
                key={t.id}
                label={trackName(t.playbookId, t.anchorId)}
                checked={!hidden.includes(t.id)}
                onToggle={() =>
                  setHidden(h => (h.includes(t.id) ? h.filter(x => x !== t.id) : [...h, t.id]))
                }
              />
            ))}
          </Rows>
          <View style={[styles.segment, { backgroundColor: p.bg }]}>
            {(['all', 'blocked', 'docs'] as Only[]).map(o => (
              <Pressable
                key={o}
                onPress={() => setOnly(o)}
                accessibilityRole="radio"
                accessibilityState={{ selected: only === o }}
                style={[styles.segItem, only === o && { backgroundColor: p.card }]}>
                <Text style={[type.caption, { color: only === o ? p.text : p.dim, fontWeight: '600' }]}>
                  {o === 'all' ? 'All' : o === 'blocked' ? 'Blocked' : 'Waiting on a doc'}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>
      ) : null}

      {anchor ? (
        <Pressable
          onPress={() => navigation.setParams({ anchorId: undefined })}
          style={[styles.chip, { backgroundColor: p.accentSoft }]}
          accessibilityRole="button"
          accessibilityLabel={`Showing ${anchorDisplay(anchor)} only. Clear`}>
          <Text style={[type.caption, { color: p.accent }]}>
            Only {anchorDisplay(anchor)}  ✕
          </Text>
        </Pressable>
      ) : null}

      {showBanner ? (
        <Card style={[styles.banner, { backgroundColor: p.lateSoft }]}>
          <Text style={[type.body, styles.flex, { color: p.text }]}>
            Reminders are off, so nothing will warn you.
          </Text>
          <Pressable
            onPress={async () => {
              if (!(await reminders.request())) Linking.openSettings();
            }}
            hitSlop={8}
            accessibilityRole="button">
            <Text style={[type.label, { color: p.accent }]}>Allow</Text>
          </Pressable>
          <Pressable
            onPress={() => actions.updateSettings({ deniedBannerDismissed: true })}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Dismiss">
            <Text style={[type.label, { color: p.dim }]}>✕</Text>
          </Pressable>
        </Card>
      ) : null}

      {plan.tracks.length === 0 ? (
        <EmptyState
          title="Nothing ahead"
          body="Add a track and the dates fill in."
          action="Browse tracks"
          onAction={() => goTab(navigation, 'TracksTab', 'Library')}
        />
      ) : total === 0 ? (
        <EmptyState
          title="Nothing to start yet ✓"
          body={nextUp ? `Next is ${nextUp.title}, ${formatShort(nextUp.startBy)}.` : 'Every step is done or set aside.'}
        />
      ) : null}

      {plan.tracks.length > 0 && buckets.now.length === 0 && total > 0 ? (
        <>
          <SectionHeader title="Act now" count={0} />
          <Text style={[type.body, styles.clear, { color: p.dim }]}>Nothing to start yet ✓</Text>
        </>
      ) : null}

      {BUCKETS.map(b => {
        const items = buckets[b];
        if (!items.length) return null;
        const collapsed = settings.collapsed.includes(b) && b !== 'now';
        return (
          <View key={b}>
            <SectionHeader
              title={TITLES[b]}
              count={items.length}
              tone={b === 'now' ? 'late' : 'normal'}
              collapsed={collapsed}
              onToggle={b === 'now' ? undefined : () => toggleCollapsed(b)}
            />
            {!collapsed ? (
              <Card>
                <Rows inset={space.lg + 18 + space.sm}>{items.map(s => row(s, b))}</Rows>
              </Card>
            ) : null}
          </View>
        );
      })}

      {total > 0 ? (
        <Text style={[type.caption, styles.hint, { color: p.faint }]}>
          Swipe a step left for Done or Snooze, right for Not for me.
        </Text>
      ) : null}
    </ScrollView>
  );

  function trackName(playbookId: string, aId?: string) {
    const title = playbooks.find(x => x.id === playbookId)?.title ?? playbookId;
    const a = plan.anchors.find(x => x.id === aId);
    const pb = playbooks.find(x => x.id === playbookId);
    return a?.place && !pb?.region?.includes(a.place) ? `${title} · ${a.place}` : title;
  }
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  flex: { flex: 1 },
  filter: { marginTop: space.sm, paddingBottom: space.md },
  segment: { flexDirection: 'row', margin: space.lg, marginBottom: 0, borderRadius: 8, padding: 2 },
  segItem: { flex: 1, alignItems: 'center', paddingVertical: space.sm, borderRadius: 7 },
  chip: {
    alignSelf: 'flex-start',
    marginHorizontal: space.lg,
    marginTop: space.sm,
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 2,
    borderRadius: 14,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.md,
    paddingHorizontal: space.lg,
    marginTop: space.md,
  },
  clear: { paddingHorizontal: space.lg },
  hint: { textAlign: 'center', padding: space.xl },
});
