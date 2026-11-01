import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch } from 'react-native';
import { useNav } from '../navigation/routes';
import { resetDemo, setDemo, useDemo } from '../state/demo';
import { Card, ListRow, Rows, SectionHeader, space, usePalette } from '../ui';
import { SettingsSection } from './SettingsSection';

export const DEMO_INFO =
  "A sample family's plan, in a store of its own: your plan isn't read, changed or backed up while it's on screen, and reminders and calendar stay as your plan left them. Turn it off to come straight back.";

/** Pushed from the link at the bottom of the timeline. */
export function SettingsScreen() {
  const p = usePalette();
  const nav = useNav();
  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <SettingsSection navigation={nav} />
      <DemoSection />
    </ScrollView>
  );
}

function DemoSection() {
  const { on, switching } = useDemo();
  const reset = () =>
    Alert.alert('Reset demo data?', 'Back to the sample plan as first installed. Your own plan is not touched.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetDemo },
    ]);
  return (
    <>
      <SectionHeader title="Demo" info={DEMO_INFO} />
      <Card>
        <Rows>
          <ListRow
            label="Demo data"
            detail={on ? 'Showing a sample plan, not yours.' : 'Show a sample plan instead of yours'}
            chevron={false}
            right={
              <Switch
                value={on}
                disabled={switching}
                onValueChange={setDemo}
                accessibilityLabel="Demo data"
              />
            }
          />
          {on ? <ListRow label="Reset demo data" tone="late" chevron={false} onPress={reset} /> : null}
        </Rows>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 80 + space.lg },
});
