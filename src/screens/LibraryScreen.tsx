import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatAges } from '../domain/format';
import { kindLabel } from '../domain/kinds';
import { ageOn } from '../domain/plan';
import type { Playbook } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, space, usePalette } from '../ui';
import { importPlaybook } from './playbookFiles';

const COMING_SOON = ['United States', 'China'];

export function LibraryScreen({ navigation }: NativeStackScreenProps<Routes, 'Library'>) {
  const p = usePalette();
  const playbooks = useStore(s => s.playbooks);
  const plan = useStore(s => s.mine);
  const now = useStore(s => s.now);
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
  const matches = playbooks
    .filter(
      pb =>
        !needle ||
        pb.title.toLowerCase().includes(needle) ||
        (pb.summary ?? '').toLowerCase().includes(needle) ||
        (pb.region ?? '').toLowerCase().includes(needle),
    )
    .sort((a, b) => (a.ages?.from ?? 99) - (b.ages?.from ?? 99));
  const soon = COMING_SOON.filter(r => !needle || r.toLowerCase().includes(needle));
  const kinds = new Set(plan.anchors.map(a => a.kind));
  const age = ageOn(plan.anchors, now);
  const notOutgrown = (pb: Playbook) =>
    pb.anchorKind !== 'born' || !pb.ages?.to || age === null || age <= pb.ages.to;
  const fits = matches.filter(pb => kinds.has(pb.anchorKind) && notOutgrown(pb));

  const row = (pb: Playbook) => {
    const attached = plan.tracks.some(t => t.playbookId === pb.id);
    return (
      <ListRow
        key={pb.id}
        label={pb.title}
        detail={`from "${kindLabel(pb.anchorKind)}"${pb.ages ? ` · ${formatAges(pb.ages)}` : ''}`}
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
            info="Plans that hang off a kind of date this person already has, and that they haven't aged past."
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
      {soon.length ? (
        <>
          <SectionHeader title="Coming soon" info="Playbooks for Canada only, for now." />
          <Card>
            <Rows>
              {soon.map(r => (
                <ListRow key={r} label={r} tone="dim" accessibilityLabel={`${r}, coming soon`} />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}
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
