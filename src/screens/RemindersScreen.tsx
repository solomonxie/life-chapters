import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { formatMonth } from '../domain/format';
import { weekdayName } from '../notify/queue';
import { syncNow } from '../state/sync';
import { useReminders } from '../state/reminders';
import { actions, useStore } from '../state/store';
import {
  Button,
  Card,
  InfoPopover,
  ListRow,
  ProgressBar,
  Rows,
  SectionHeader,
  UnfoldingPicker,
  space,
  type,
  usePalette,
} from '../ui';
import { CAP_INFO } from './SettingsScreen';

const LEADS = [0, 3, 7, 14, 30].map(d => ({
  value: String(d),
  label: d === 0 ? 'same day' : `${d} days before`,
  short: d === 0 ? 'same day' : `${d} days`,
}));
const DAYS = [1, 2, 3, 4, 5, 6, 7].map(d => ({ value: String(d), label: weekdayName(d) }));
const HOURS = [7, 8, 9, 10, 12, 18, 20].map(h => ({
  value: String(h),
  label: h === 12 ? 'noon' : h > 12 ? `${h - 12}pm` : `${h}am`,
}));

type Open = 'lead' | 'day' | 'hour' | null;

export function RemindersScreen() {
  const p = usePalette();
  const settings = useStore(s => s.settings);
  const rem = useReminders();
  const [open, setOpen] = useState<Open>(null);
  const toggle = (o: Open) => setOpen(x => (x === o ? null : o));
  const denied = rem.permission === 'denied';

  return (
    <ScrollView style={{ backgroundColor: p.bg }} contentContainerStyle={styles.content}>
      <View style={styles.gap} />
      <Card>
        <UnfoldingPicker
          label="Remind me before start-by"
          value={String(settings.leadDays)}
          options={LEADS}
          open={open === 'lead'}
          onToggle={() => toggle('lead')}
          onSelect={v => {
            actions.updateSettings({ leadDays: Number(v) });
            setOpen(null);
          }}
        />
      </Card>

      <View style={styles.gap} />
      <Card>
        <Rows>
          <ListRow
            label="Weekly digest"
            chevron={false}
            right={
              <Switch
                value={settings.digestOn}
                onValueChange={v => actions.updateSettings({ digestOn: v })}
                accessibilityLabel="Weekly digest"
              />
            }
          />
          {settings.digestOn ? (
            <UnfoldingPicker
              label="Day"
              value={String(settings.digestWeekday)}
              options={DAYS}
              open={open === 'day'}
              onToggle={() => toggle('day')}
              onSelect={v => {
                actions.updateSettings({ digestWeekday: Number(v) });
                setOpen(null);
              }}
            />
          ) : null}
          {settings.digestOn ? (
            <UnfoldingPicker
              label="Time"
              value={String(settings.digestHour)}
              options={HOURS}
              open={open === 'hour'}
              onToggle={() => toggle('hour')}
              onSelect={v => {
                actions.updateSettings({ digestHour: Number(v) });
                setOpen(null);
              }}
            />
          ) : null}
        </Rows>
      </Card>

      <SectionHeader
        title="Queued with iOS"
        right={<Text style={[type.caption, { color: p.dim }]}>{rem.queued}/64</Text>}
      />
      <Card style={styles.queue}>
        <View style={styles.row}>
          <View style={styles.flex}>
            <ProgressBar done={rem.queued} total={64} />
          </View>
          <InfoPopover text={CAP_INFO(rem.wanted)} />
        </View>
        <Text style={[type.caption, { color: p.dim }]}>
          {denied
            ? 'Reminders are turned off in iOS Settings, so nothing is queued.'
            : rem.through
            ? `Through ${formatMonth(rem.through)}. The rest queue up as these fire.`
            : 'Nothing to queue yet.'}
        </Text>
        <Button title="Rebuild the queue" onPress={() => syncNow()} style={styles.left} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 80 },
  gap: { height: space.lg },
  flex: { flex: 1 },
  queue: { padding: space.lg, gap: space.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  left: { alignSelf: 'flex-start' },
});
