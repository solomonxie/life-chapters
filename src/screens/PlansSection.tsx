import React from 'react';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import type { Nav } from '../navigation/routes';
import { reminders } from '../platform';
import { useReminders } from '../state/reminders';
import { actions, useStore } from '../state/store';
import { Button, Card, SectionHeader, space, type, usePalette } from '../ui';
import { ExpiringDocs, FinishedPlans, RunningPlans } from './PlanList';

/** Everything ahead for the person on screen, under their timeline. */
export function PlansSection({ navigation }: { navigation: Nav }) {
  const p = usePalette();
  const mine = useStore(s => s.mine);
  const settings = useStore(s => s.settings);
  const permission = useReminders(s => s.permission);
  const hasPlans = mine.tracks.length > 0;

  const showBanner = permission === 'denied' && !settings.deniedBannerDismissed && hasPlans;

  return (
    <>
      <SectionHeader title="Plans" count={mine.tracks.length || undefined} />
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
  add: { alignSelf: 'flex-start', marginLeft: space.lg, marginTop: space.md },
});
