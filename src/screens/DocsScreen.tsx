import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatDate, formatMonth, formatRelative, formatShort } from '../domain/format';
import { documentViews, groupDocuments, type DocView } from '../domain/plan';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Card, EmptyState, Rows, SectionHeader, space, type, usePalette } from '../ui';

export function DocsScreen({ navigation }: NativeStackScreenProps<Routes, 'Docs'>) {
  const p = usePalette();
  const plan = useStore(s => s.plan);
  const view = useStore(s => s.view);
  const now = useStore(s => s.now);
  const [q, setQ] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerSearchBarOptions: {
        placeholder: 'Search documents',
        onChangeText: e => setQ(e.nativeEvent.text),
        onCancelButtonPress: () => setQ(''),
      },
    });
  }, [navigation]);

  const docs = useMemo(
    () => documentViews(plan.documents, view, plan.instances),
    [plan.documents, plan.instances, view],
  );
  const needle = q.trim().toLowerCase();
  const groups = groupDocuments(
    docs.filter(d => !needle || d.name.toLowerCase().includes(needle)),
    now,
  );

  const go = (d: DocView) => navigation.navigate('Document', { documentId: d.id });

  if (!docs.length) {
    return (
      <ScrollView style={{ backgroundColor: p.bg }} contentInsetAdjustmentBehavior="automatic">
        <EmptyState title="Nothing to keep track of" body="Documents appear as steps ask for them." />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      keyboardDismissMode="on-drag">
      {groups.expiring.length ? (
        <>
          <SectionHeader title="⚠ Expiring" tone="late" count={groups.expiring.length} />
          <Card>
            <Rows>
              {groups.expiring.map(d => (
                <Pressable
                  key={d.id}
                  onPress={() => go(d)}
                  style={({ pressed }) => [styles.expiring, pressed && { backgroundColor: p.hairline }]}
                  accessibilityRole="button">
                  <View style={styles.flex}>
                    <Text style={[type.label, { color: p.text }]} numberOfLines={1}>
                      {d.name}
                    </Text>
                    <Text style={[type.caption, { color: d.clash ? p.late : p.dim }]}>
                      {d.expiresOn! < now ? 'expired' : 'expires'} {formatDate(d.expiresOn!)} ·{' '}
                      {formatRelative(d.expiresOn!, now).replace('late', 'ago')}
                    </Text>
                    <Text style={[type.caption, { color: p.dim }]}>
                      {d.clash
                        ? `needed by ${d.clash.consumer.title} · ${formatShort(d.clash.consumer.dueBy)}`
                        : d.neededBy
                        ? `needed by ${d.neededBy.title} · ${formatShort(d.neededBy.dueBy)}`
                        : 'not needed again'}
                    </Text>
                  </View>
                  {d.clash ? <Text style={[type.label, { color: p.late }]}>!</Text> : null}
                  <Text style={{ color: p.faint }}>›</Text>
                </Pressable>
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      {groups.held.length ? (
        <>
          <SectionHeader title="Held" count={groups.held.length} />
          <Card>
            <Rows>
              {groups.held.map(d => (
                <Row key={d.id} d={d} onPress={() => go(d)} value={d.expiresOn ? `exp ${formatMonth(d.expiresOn)}` : 'no expiry'} />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      {groups.missing.length ? (
        <>
          <SectionHeader title="Missing" count={groups.missing.length} />
          <Card>
            <Rows>
              {groups.missing.map(d => (
                <Row
                  key={d.id}
                  d={d}
                  box
                  onPress={() => go(d)}
                  value={d.neededBy ? formatShort(d.neededBy.startBy) : undefined}
                />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}
    </ScrollView>
  );
}

function Row({ d, value, box, onPress }: { d: DocView; value?: string; box?: boolean; onPress: () => void }) {
  const p = usePalette();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: p.hairline }]}
      accessibilityRole="button"
      accessibilityLabel={`${d.name}${box ? ', missing' : ''}${value ? `, ${value}` : ''}`}>
      {box ? <View style={[styles.box, { borderColor: p.faint }]} /> : null}
      <Text style={[type.body, styles.flex, { color: p.text }]} numberOfLines={1}>
        {d.name}
      </Text>
      {value ? <Text style={[type.caption, { color: p.dim }]}>{value}</Text> : null}
      <Text style={{ color: p.faint }}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  flex: { flex: 1 },
  expiring: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    minHeight: 48,
  },
  box: { width: 18, height: 18, borderRadius: 5, borderWidth: 1.5 },
});
