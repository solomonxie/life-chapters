import React, { useMemo } from 'react';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { formatShort } from '../domain/format';
import type { PlannedStep } from '../domain/plan';
import { BUCKETS, bucketize, type Bucket } from '../domain/radar';
import type { Nav } from '../navigation/routes';
import { haptic, reminders } from '../platform';
import { useReminders } from '../state/reminders';
import { actions, useStore } from '../state/store';
import { Button, Card, Rows, SectionHeader, StepRow, SwipeRow, space, type, usePalette } from '../ui';
import { ExpiringDocs, FinishedPlans, RunningPlans } from './PlanList';
import { pickSnooze } from './snooze';

const TITLES: Record<Bucket, string> = {
  now: '⚠ Act now',
  d90: 'Next 90 days',
  year: 'This year',
  later: 'Later',
};

/** Everything ahead for the person on screen, under their timeline. */
export function PlansSection({ navigation }: { navigation: Nav }) {
  const p = usePalette();
  const mine = useStore(s => s.mine);
  const moves = useStore(s => s.moves);
  const now = useStore(s => s.now);
  const settings = useStore(s => s.settings);
  const permission = useReminders(s => s.permission);

  const buckets = useMemo(() => bucketize(mine.view.steps, now), [mine.view.steps, now]);
  const total = BUCKETS.reduce((n, b) => n + buckets[b].length, 0);
  const hasPlans = mine.tracks.length > 0;

  const toggleCollapsed = (b: Bucket) => {
    const c = settings.collapsed;
    actions.updateSettings({ collapsed: c.includes(b) ? c.filter(x => x !== b) : [...c, b] });
  };

  const showBanner = permission === 'denied' && !settings.deniedBannerDismissed && hasPlans;

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

  const nextUp = mine.view.steps
    .filter(s => s.status === 'pending' || s.status === 'snoozed')
    .sort((a, b) => (a.startBy < b.startBy ? -1 : 1))[0];

  return (
    <>
      <SectionHeader title="Plans" />
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

      <ExpiringDocs navigation={navigation} />
      <RunningPlans navigation={navigation} />

      {hasPlans && total === 0 ? (
        <Text style={[type.body, styles.clear, { color: p.dim }]}>
          Nothing to start yet ✓{nextUp ? ` Next is ${nextUp.title}, ${formatShort(nextUp.startBy)}.` : ''}
        </Text>
      ) : null}

      {BUCKETS.map(b => {
        const items = buckets[b];
        if (!items.length) return null;
        const collapsed = settings.collapsed.includes(b) && b !== 'now';
        return (
          <React.Fragment key={b}>
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
          </React.Fragment>
        );
      })}

      {total > 0 ? (
        <Text style={[type.caption, styles.hint, { color: p.faint }]}>
          Swipe a step left for Done or Snooze, right for Not for me.
        </Text>
      ) : null}

      <FinishedPlans navigation={navigation} />

      <Button
        title={hasPlans ? '+ Add a plan' : 'Browse plans'}
        kind={hasPlans ? 'plain' : 'primary'}
        style={styles.add}
        onPress={() => navigation.navigate('Library')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.md,
    paddingHorizontal: space.lg,
    marginTop: space.md,
  },
  clear: { paddingHorizontal: space.lg },
  hint: { textAlign: 'center', padding: space.lg },
  add: { alignSelf: 'flex-start', marginLeft: space.lg, marginTop: space.md },
});
