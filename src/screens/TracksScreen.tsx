import React, { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatMonth, formatShort } from '../domain/format';
import type { PlannedStep } from '../domain/plan';
import { isOpen } from '../domain/radar';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Button, Card, EmptyState, ProgressBar, Rows, SectionHeader, space, type, usePalette } from '../ui';

export function TracksScreen({ navigation }: NativeStackScreenProps<Routes, 'Tracks'>) {
  const p = usePalette();
  const plan = useStore(s => s.plan);
  const view = useStore(s => s.view);
  const playbooks = useStore(s => s.playbooks);
  const now = useStore(s => s.now);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('Library')}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Add a track">
          <Text maxFontSizeMultiplier={1.3} style={[type.headline, { color: p.accent }]}>＋</Text>
        </Pressable>
      ),
    });
  }, [navigation, p]);

  const tracks = plan.tracks.map(t => {
    const steps = view.steps.filter(s => s.trackId === t.id);
    const counted = steps.filter(s => s.status !== 'skipped');
    const done = counted.filter(s => s.status === 'done').length;
    const next = steps.filter(isOpen).sort((a, b) => (a.startBy < b.startBy ? -1 : 1))[0];
    const anchor = plan.anchors.find(a => a.id === t.anchorId);
    const playbook = playbooks.find(x => x.id === t.playbookId);
    return { t, steps, done, total: counted.length, next, anchor, playbook };
  });
  const running = tracks.filter(x => x.done < x.total || x.total === 0);
  const finished = tracks.filter(x => x.total > 0 && x.done === x.total);

  if (!plan.tracks.length) {
    return (
      <ScrollView style={{ backgroundColor: p.bg }} contentInsetAdjustmentBehavior="automatic">
        <EmptyState
          title="No tracks yet"
          body="A track turns your dates into steps."
          action="Browse the library"
          onAction={() => navigation.navigate('Library')}
        />
      </ScrollView>
    );
  }

  const open = (trackId: string, playbookId: string) =>
    navigation.navigate('Playbook', { playbookId, trackId });

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      {running.length ? (
        <>
          <SectionHeader title="Running" count={running.length} />
          <Card>
            <Rows>
              {running.map(x => (
                <Pressable
                  key={x.t.id}
                  onPress={() => open(x.t.id, x.t.playbookId)}
                  style={({ pressed }) => [styles.track, pressed && { backgroundColor: p.hairline }]}
                  accessibilityRole="button"
                  accessibilityLabel={`${x.playbook?.title}, ${x.done} of ${x.total} done`}>
                  <View style={styles.flex}>
                    <Text style={[type.label, { color: p.text }]} numberOfLines={1}>
                      {x.playbook?.title ?? 'Missing playbook'}
                      {x.anchor?.place && !x.playbook?.region?.includes(x.anchor.place)
                        ? ` · ${x.anchor.place}`
                        : ''}
                    </Text>
                    <View style={styles.progress}>
                      <View style={styles.flex}>
                        <ProgressBar done={x.done} total={x.total} />
                      </View>
                      <Text style={[type.caption, { color: p.dim }]}>{nextLabel(x.next, now)}</Text>
                    </View>
                  </View>
                  <Text style={{ color: p.faint }}>›</Text>
                </Pressable>
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      {finished.length ? (
        <>
          <SectionHeader title="Done" count={finished.length} />
          <Card>
            <Rows>
              {finished.map(x => (
                <Pressable
                  key={x.t.id}
                  onPress={() => open(x.t.id, x.t.playbookId)}
                  style={styles.track}
                  accessibilityRole="button">
                  <Text style={[type.label, styles.flex, { color: p.dim }]}>
                    <Text style={{ color: p.done }}>✓ </Text>
                    {x.playbook?.title}
                  </Text>
                  <Text style={[type.caption, { color: p.dim }]}>
                    {x.done}/{x.total}
                  </Text>
                  <Text style={{ color: p.faint }}>›</Text>
                </Pressable>
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      {view.broken.length ? (
        <>
          <SectionHeader title="Can't schedule" tone="late" count={view.broken.length} />
          <Card style={styles.broken}>
            {view.broken.map(b => (
              <Text key={b.trackId} style={[type.caption, { color: p.late }]}>
                {b.error}
              </Text>
            ))}
          </Card>
        </>
      ) : null}

      <View style={styles.browse}>
        <Button title="Browse the library" onPress={() => navigation.navigate('Library')} />
      </View>
    </ScrollView>
  );
}

const nextLabel = (next: PlannedStep | undefined, now: string) => {
  if (!next) return 'nothing next';
  return next.startBy.slice(0, 4) === now.slice(0, 4)
    ? `next ${formatShort(next.startBy)}`
    : `next ${formatMonth(next.startBy)}`;
};

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  flex: { flex: 1 },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    minHeight: 56,
  },
  progress: { flexDirection: 'row', alignItems: 'center', gap: space.md, marginTop: space.xs },
  broken: { padding: space.lg, gap: space.xs },
  browse: { padding: space.lg, paddingTop: space.xl },
});
