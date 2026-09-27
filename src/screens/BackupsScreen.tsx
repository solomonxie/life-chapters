import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { parseBackup } from '../data/plan';
import { dailyDay, groupSnapshots, snapshotTime, KEEP_DAYS, PER_DAY } from '../data/snapshots';
import { addDays } from '../domain/dates';
import { formatDate } from '../domain/format';
import { files, icloud } from '../platform';
import { backupNow, useBackups } from '../state/autobackup';
import { actions, useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, space, type, usePalette } from '../ui';

const LOCAL_INFO = `A copy after every change, never overwritten. Each day keeps its latest ${PER_DAY}; days older than a week are cleared. They live in Files › Life Chapters › Backups.`;
const ICLOUD_INFO =
  'One file a day in iCloud Drive › Life Chapters, replaced on every change that day. It survives losing the phone. Turn it on in Settings.';

export function BackupsScreen() {
  const p = usePalette();
  const now = useStore(s => s.now);
  const icloudOn = useStore(s => s.settings.icloudBackup);
  const lastLocal = useBackups(s => s.lastLocal);
  const [local, setLocal] = useState<string[]>([]);
  const [cloud, setCloud] = useState<string[]>([]);
  const [openDay, setOpenDay] = useState<string | null>(now);

  const refresh = useCallback(() => {
    files.listBackups().then(setLocal);
    if (icloudOn) icloud.list().then(n => setCloud(n.filter(x => dailyDay(x))));
  }, [icloudOn]);

  useFocusEffect(refresh);
  useEffect(refresh, [lastLocal, refresh]);

  const dayLabel = (day: string) =>
    day === now ? 'Today' : day === addDays(now, -1) ? 'Yesterday' : formatDate(day);

  const restore = async (label: string, read: () => Promise<string>) => {
    let text: string;
    try {
      text = await read();
    } catch (e) {
      Alert.alert("Can't open this copy", (e as Error).message);
      return;
    }
    const parsed = parseBackup(text);
    if (!parsed.ok) {
      Alert.alert("Can't restore", parsed.error);
      return;
    }
    const { anchors, tracks, entries } = parsed.plan;
    Alert.alert(
      `Restore from ${label}?`,
      `It has ${anchors.length} dates, ${tracks.length} tracks, ${entries.length} stories. What you have now stays in Backups.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore',
          style: 'destructive',
          onPress: async () => {
            await backupNow();
            actions.replacePlan(parsed.plan);
          },
        },
      ],
    );
  };

  const days = groupSnapshots(local);

  return (
    <ScrollView style={{ backgroundColor: p.bg }} contentContainerStyle={styles.content}>
      <SectionHeader
        title="On this iPhone"
        count={days.reduce((n, d) => n + d.names.length, 0)}
        info={LOCAL_INFO}
      />
      {days.length ? (
        <Card>
          <Rows>
            {days.map(d => (
              <View key={d.day}>
                <ListRow
                  label={dayLabel(d.day)}
                  value={`${d.names.length}`}
                  open={openDay === d.day}
                  onPress={() => setOpenDay(o => (o === d.day ? null : d.day))}
                />
                {openDay === d.day
                  ? d.names.map(n => (
                      <ListRow
                        key={n}
                        label={`   ${snapshotTime(n)}`}
                        tone="accent"
                        onPress={() =>
                          restore(`${dayLabel(d.day).toLowerCase()} ${snapshotTime(n).slice(0, 5)}`, () =>
                            files.readBackup(n),
                          )
                        }
                      />
                    ))
                  : null}
              </View>
            ))}
          </Rows>
        </Card>
      ) : (
        <Text style={[type.body, styles.pad, { color: p.dim }]}>
          The first snapshot is written with your next change.
        </Text>
      )}

      <SectionHeader title="iCloud Drive" count={icloudOn ? cloud.length : undefined} info={ICLOUD_INFO} />
      {icloudOn ? (
        cloud.length ? (
          <Card>
            <Rows>
              {cloud.map(n => (
                <ListRow
                  key={n}
                  label={dayLabel(dailyDay(n)!)}
                  value={dailyDay(n) === now ? 'replaced all day' : undefined}
                  onPress={() => restore(`iCloud, ${dayLabel(dailyDay(n)!).toLowerCase()}`, () => icloud.read(n))}
                />
              ))}
            </Rows>
          </Card>
        ) : (
          <Text style={[type.body, styles.pad, { color: p.dim }]}>Nothing in iCloud yet.</Text>
        )
      ) : (
        <Text style={[type.body, styles.pad, { color: p.dim }]}>Off. Turn it on in Settings › Backup.</Text>
      )}

      <View style={styles.buttons}>
        <Button title="Show in Files" onPress={() => files.openFolder('Backups')} />
      </View>
      <Text style={[type.caption, styles.foot, { color: p.faint }]}>
        Snapshots older than {KEEP_DAYS} days are cleared automatically.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 80 },
  pad: { paddingHorizontal: space.lg },
  buttons: { padding: space.lg, paddingTop: space.xl },
  foot: { textAlign: 'center', paddingHorizontal: space.xl },
});
