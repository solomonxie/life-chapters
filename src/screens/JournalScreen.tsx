import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatPrecise } from '../domain/format';
import { excerpt, searchEntries, storiesByChapter } from '../domain/journal';
import { anchorDisplay, lifeChapters, timelineNodes } from '../domain/plan';
import type { Entry } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { actions, useStore } from '../state/store';
import { Card, EmptyState, Rows, SectionHeader, space, type, usePalette } from '../ui';

export function JournalScreen({ navigation }: NativeStackScreenProps<Routes, 'Journal'>) {
  const p = usePalette();
  const plan = useStore(s => s.plan);
  const view = useStore(s => s.view);
  const now = useStore(s => s.now);
  const collapsed = useStore(s => s.settings.collapsed);
  const [q, setQ] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerSearchBarOptions: {
        placeholder: 'Search stories',
        onChangeText: e => setQ(e.nativeEvent.text),
        onCancelButtonPress: () => setQ(''),
      },
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('Entry')}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Write a story">
          <Text style={[type.headline, { color: p.accent }]}>＋</Text>
        </Pressable>
      ),
    });
  }, [navigation, p]);

  const chapters = useMemo(
    () => lifeChapters(timelineNodes(plan.anchors, plan.tracks, view.steps, now), now),
    [plan.anchors, plan.tracks, view.steps, now],
  );
  const found = searchEntries(plan.entries, q);
  const groups = storiesByChapter(found, chapters);
  const searching = q.trim().length > 0;

  if (!plan.entries.length) {
    return (
      <ScrollView style={{ backgroundColor: p.bg }} contentInsetAdjustmentBehavior="automatic">
        <EmptyState
          title="No stories yet"
          body="Write down what happened, filed under the chapter it happened in."
          action="Write the first one"
          onAction={() => navigation.navigate('Entry')}
        />
      </ScrollView>
    );
  }

  const toggle = (key: string) =>
    actions.updateSettings({
      collapsed: collapsed.includes(key) ? collapsed.filter(k => k !== key) : [...collapsed, key],
    });

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      keyboardDismissMode="on-drag">
      {searching && !found.length ? (
        <Text style={[type.body, styles.none, { color: p.dim }]}>Nothing matches "{q.trim()}".</Text>
      ) : null}
      {groups.map((g, i) => {
        const key = `chapter:${g.chapter?.eventId ?? 'before'}`;
        // The newest chapter starts open; older ones fold unless opened.
        const folded = !searching && (i === 0 ? collapsed.includes(key) : !collapsed.includes(`open:${key}`));
        return (
          <View key={key}>
            <SectionHeader
              title={g.chapter?.label ?? 'Before the first chapter'}
              count={g.entries.length}
              collapsed={folded}
              onToggle={() => (i === 0 ? toggle(key) : toggle(`open:${key}`))}
            />
            {!folded ? (
              <Card>
                <Rows>
                  {g.entries.map(e => (
                    <StoryRow
                      key={e.id}
                      entry={e}
                      about={plan.anchors.find(a => a.id === e.anchorId)}
                      onPress={() => navigation.navigate('Entry', { entryId: e.id })}
                    />
                  ))}
                </Rows>
              </Card>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
}

export function StoryRow({
  entry,
  about,
  onPress,
}: {
  entry: Entry;
  about?: Parameters<typeof anchorDisplay>[0];
  onPress: () => void;
}) {
  const p = usePalette();
  const when = formatPrecise(entry.date, entry.precision);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: p.hairline }]}
      accessibilityRole="button"
      accessibilityLabel={`${entry.title ?? excerpt(entry, 40)}, ${when}`}>
      <View style={styles.flex}>
        <Text style={[type.caption, { color: p.dim }]} numberOfLines={1}>
          {about ? `${when} · ${anchorDisplay(about)}` : when}
        </Text>
        {entry.title ? (
          <Text style={[type.label, { color: p.text }]} numberOfLines={1}>
            {entry.title}
          </Text>
        ) : null}
        <Text style={[type.body, { color: entry.title ? p.dim : p.text }]} numberOfLines={2}>
          {excerpt(entry, 160) || ' '}
        </Text>
      </View>
      <Text style={{ color: p.faint }}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  flex: { flex: 1, gap: 2 },
  none: { padding: space.xl, textAlign: 'center' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
});
