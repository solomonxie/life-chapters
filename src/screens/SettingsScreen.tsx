import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatDate } from '../domain/format';
import { isStale } from '../domain/playbook';
import { goTab, type Routes } from '../navigation/routes';
import { weekdayName } from '../notify/queue';
import { useReminders } from '../state/reminders';
import { actions, useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, space, type, usePalette } from '../ui';
import { exportBackup, importBackup } from './backup';

export const VERSION = '0.1.0';

export const CAP_INFO = (wanted: number) =>
  `iOS holds at most 64 pending reminders per app. Your plan has ${wanted} open steps, so only the nearest ones are handed over; the queue refills each time you open the app or the plan changes. Nothing is lost — a step years out just has no alarm set yet.`;

export function SettingsScreen({ navigation }: NativeStackScreenProps<Routes, 'Settings'>) {
  const p = usePalette();
  const settings = useStore(s => s.settings);
  const plan = useStore(s => s.plan);
  const playbooks = useStore(s => s.playbooks);
  const now = useStore(s => s.now);
  const rem = useReminders();
  const [exporting, setExporting] = useState(false);
  const denied = rem.permission === 'denied';
  const stale = playbooks.filter(pb => isStale(pb, now)).length;
  const docCount = new Set([
    ...plan.documents.map(d => d.id),
  ]).size;

  const hour = (h: number) => (h === 12 ? '12pm' : h > 12 ? `${h - 12}pm` : `${h}am`);

  return (
    <ScrollView style={{ backgroundColor: p.bg }} contentContainerStyle={styles.content}>
      <SectionHeader title="Reminders" info={CAP_INFO(rem.wanted)} />
      {denied ? (
        <Card style={[styles.denied, { backgroundColor: p.lateSoft }]}>
          <Text style={[type.body, styles.flex, { color: p.text }]}>⚠ Turned off in iOS Settings.</Text>
          <Button title="Open Settings" kind="plain" onPress={() => Linking.openSettings()} />
        </Card>
      ) : (
        <Text style={[type.caption, styles.oneLine, { color: p.dim }]}>
          Only the steps you haven't started.
        </Text>
      )}
      <Card>
        <Rows>
          <ListRow
            label="Remind me before start-by"
            value={settings.leadDays === 0 ? 'same day' : `${settings.leadDays} days`}
            disabled={denied}
            onPress={() => navigation.navigate('Reminders')}
          />
          <ListRow
            label="Weekly digest"
            value={settings.digestOn ? `${weekdayName(settings.digestWeekday).slice(0, 3)} ${hour(settings.digestHour)}` : 'off'}
            disabled={denied}
            onPress={() => navigation.navigate('Reminders')}
          />
          <ListRow
            label="Nearest reminders queued"
            value={`${rem.queued}/64`}
            onPress={() => navigation.navigate('Reminders')}
          />
        </Rows>
      </Card>

      <SectionHeader title="Your plan" />
      <Card>
        <Rows>
          <ListRow label="Dates" value={String(plan.anchors.length)} onPress={() => goTab(navigation, 'TimelineTab')} />
          <ListRow label="Tracks" value={String(plan.tracks.length)} onPress={() => goTab(navigation, 'TracksTab')} />
          <ListRow label="Documents" value={String(docCount)} onPress={() => goTab(navigation, 'DocsTab')} />
        </Rows>
      </Card>

      <SectionHeader
        title="Backup"
        info="The whole plan as one JSON file, out through the share sheet — save it to Files, AirDrop it, anywhere. Nothing is uploaded by the app. Import the same file to restore. Scans aren't included; they live in Files › Life Planner."
      />
      <Card>
        <ListRow
          label="Last export"
          value={
            settings.lastExport
              ? `${formatDate(settings.lastExport.on)} · ${Math.max(1, Math.round(settings.lastExport.bytes / 1024))} KB`
              : 'never'
          }
          chevron={false}
        />
        {!settings.lastExport ? (
          <Text style={[type.caption, styles.pad, { color: p.warn }]}>Nothing is backed up.</Text>
        ) : null}
        <View style={styles.buttons}>
          <Button
            title={exporting ? 'Exporting…' : 'Export…'}
            disabled={exporting}
            style={styles.flex}
            onPress={async () => {
              setExporting(true);
              try {
                await exportBackup();
              } finally {
                setExporting(false);
              }
            }}
          />
          <Button title="Import…" disabled={exporting} style={styles.flex} onPress={importBackup} />
        </View>
      </Card>

      <SectionHeader title="Playbooks" />
      <Card>
        <Rows>
          <ListRow
            label="Sources"
            value={plan.playbooks.length ? `bundled + ${plan.playbooks.length} yours` : 'bundled only'}
            onPress={() => navigation.navigate('Sources')}
          />
          <ListRow
            label="Check review dates"
            value={stale ? `${stale} old` : 'all current'}
            tone={stale ? 'late' : 'normal'}
            onPress={() => navigation.navigate('Sources')}
          />
        </Rows>
      </Card>

      <View style={styles.gap} />
      <Card>
        <Rows>
          <ListRow
            label="Calendar export"
            detail={
              rem.calendarDenied && settings.calendarMirror
                ? 'Calendar access is off in iOS Settings.'
                : 'Start-by dates in a "Life Planner" calendar'
            }
            chevron={false}
            right={
              <Switch
                value={settings.calendarMirror}
                onValueChange={v => actions.updateSettings({ calendarMirror: v })}
                accessibilityLabel="Calendar export"
              />
            }
          />
          <ListRow
            label="Haptics"
            chevron={false}
            right={
              <Switch
                value={settings.haptics}
                onValueChange={v => actions.updateSettings({ haptics: v })}
                accessibilityLabel="Haptics"
              />
            }
          />
        </Rows>
      </Card>

      <View style={styles.gap} />
      <Card>
        <ListRow label="About" onPress={() => navigation.navigate('About')} />
      </Card>
      <Text style={[type.caption, styles.tagline, { color: p.dim }]}>
        Life Planner {VERSION} · not advice
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 80 },
  flex: { flex: 1 },
  oneLine: { paddingHorizontal: space.lg, paddingBottom: space.sm },
  denied: { flexDirection: 'row', alignItems: 'center', padding: space.md, paddingHorizontal: space.lg, marginBottom: space.sm },
  pad: { paddingHorizontal: space.lg, paddingBottom: space.sm },
  buttons: { flexDirection: 'row', gap: space.md, padding: space.lg, paddingTop: space.xs },
  gap: { height: space.xl },
  tagline: { textAlign: 'center', padding: space.lg },
});
