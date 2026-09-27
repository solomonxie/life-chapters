import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BUNDLED_PLAYBOOKS } from '../content';
import { formatMonth } from '../domain/format';
import { isStale } from '../domain/playbook';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Card, ListRow, Rows, SectionHeader, space, type, usePalette } from '../ui';

export function SourcesScreen({ navigation }: NativeStackScreenProps<Routes, 'Sources'>) {
  const p = usePalette();
  const playbooks = useStore(s => s.playbooks);
  const now = useStore(s => s.now);
  const bundled = new Set(BUNDLED_PLAYBOOKS.map(b => b.id));
  const byAge = [...playbooks].sort((a, b) => (a.reviewedAt < b.reviewedAt ? -1 : 1));
  const groups = [
    { title: 'Bundled with the app', items: byAge.filter(pb => bundled.has(pb.id)) },
    { title: 'Yours', items: byAge.filter(pb => !bundled.has(pb.id)) },
  ];

  return (
    <ScrollView style={{ backgroundColor: p.bg }} contentContainerStyle={styles.content}>
      <Text style={[type.caption, styles.intro, { color: p.dim }]}>
        Oldest review first. A playbook over two years old is labelled, never hidden — check its
        steps against the current rules.
      </Text>
      {groups.map(g =>
        g.items.length ? (
          <React.Fragment key={g.title}>
            <SectionHeader title={g.title} count={g.items.length} />
            <Card>
              <Rows>
                {g.items.map(pb => (
                  <ListRow
                    key={pb.id}
                    label={pb.title}
                    value={`${isStale(pb, now) ? '⚠ ' : ''}${formatMonth(pb.reviewedAt)}`}
                    tone={isStale(pb, now) ? 'late' : 'normal'}
                    onPress={() => navigation.navigate('Playbook', { playbookId: pb.id })}
                  />
                ))}
              </Rows>
            </Card>
          </React.Fragment>
        ) : null,
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 80 },
  intro: { paddingHorizontal: space.lg, paddingTop: space.lg },
});
