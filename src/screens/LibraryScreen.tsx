import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { kindLabel } from '../domain/kinds';
import type { Playbook } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, space, usePalette } from '../ui';
import { importPlaybook } from './playbookFiles';

export function LibraryScreen({ navigation }: NativeStackScreenProps<Routes, 'Library'>) {
  const p = usePalette();
  const playbooks = useStore(s => s.playbooks);
  const plan = useStore(s => s.plan);
  const [q, setQ] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search',
        hideWhenScrolling: false,
        onChangeText: e => setQ(e.nativeEvent.text),
        onCancelButtonPress: () => setQ(''),
      },
    });
  }, [navigation]);

  const needle = q.trim().toLowerCase();
  const matches = playbooks.filter(
    pb =>
      !needle ||
      pb.title.toLowerCase().includes(needle) ||
      (pb.summary ?? '').toLowerCase().includes(needle) ||
      (pb.region ?? '').toLowerCase().includes(needle),
  );
  const kinds = new Set(plan.anchors.map(a => a.kind));
  const fits = matches.filter(pb => kinds.has(pb.anchorKind));

  const row = (pb: Playbook) => {
    const attached = plan.tracks.some(t => t.playbookId === pb.id);
    return (
      <ListRow
        key={pb.id}
        label={pb.title}
        detail={`from "${kindLabel(pb.anchorKind)}"`}
        value={attached ? '✓ attached' : `${pb.steps.length} steps`}
        onPress={() =>
          navigation.navigate('Playbook', {
            playbookId: pb.id,
            trackId: plan.tracks.find(t => t.playbookId === pb.id)?.id,
          })
        }
      />
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      keyboardDismissMode="on-drag">
      {fits.length ? (
        <>
          <SectionHeader
            title="Fits your dates"
            count={fits.length}
            info="Playbooks that hang off a kind of date you've already entered."
          />
          <Card>
            <Rows>{fits.map(row)}</Rows>
          </Card>
        </>
      ) : null}
      <SectionHeader title="Everything" count={matches.length} />
      <Card>
        <Rows>{matches.map(row)}</Rows>
      </Card>
      <View style={styles.import}>
        <Button
          title="Import a playbook file…"
          onPress={async () => {
            const id = await importPlaybook();
            if (id) navigation.navigate('Playbook', { playbookId: id });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  import: { padding: space.lg, paddingTop: space.xl },
});
