import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatAges } from '../domain/format';
import { kindLabel } from '../domain/kinds';
import { ageOn } from '../domain/plan';
import { countryName, fits, provinceName, whereAt, whereName } from '../domain/regions';
import type { Playbook } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, space, usePalette } from '../ui';
import { importPlaybook } from './playbookFiles';

const COMING_SOON = ['United States'];

export function LibraryScreen({ navigation }: NativeStackScreenProps<Routes, 'Library'>) {
  const p = usePalette();
  const playbooks = useStore(s => s.playbooks);
  const plan = useStore(s => s.mine);
  const now = useStore(s => s.now);
  const [q, setQ] = useState('');
  const [othersOpen, setOthersOpen] = useState(false);
  const where = plan.where;

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
  const age = ageOn(plan.anchors, now);
  const notOutgrown = (pb: Playbook) =>
    pb.anchorKind !== 'born' || !pb.ages?.to || age === null || age <= pb.ages.to;
  const here = matches.filter(pb => fits(pb, where));
  const elsewhere = matches.filter(pb => !fits(pb, where));
  const suggested = matches.filter(
    pb =>
      notOutgrown(pb) &&
      plan.anchors.some(a => a.kind === pb.anchorKind && fits(pb, whereAt(a, where))),
  );
  const pickProvince = () => navigation.navigate('Person', { mode: 'province', personId: plan.person.id });

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
      {suggested.length ? (
        <>
          <SectionHeader
            title="Fits your dates"
            count={suggested.length}
            info="Plans that hang off a kind of date this person already has, fit where that date happened, and that they haven't aged past."
          />
          <Card>
            <Rows>{suggested.map(row)}</Rows>
          </Card>
        </>
      ) : null}
      <SectionHeader
        title={
          !where.country
            ? 'Everything'
            : where.province
            ? `${countryName(where.country)} and ${provinceName(where.province)}`
            : countryName(where.country) ?? 'Everything'
        }
        count={here.length}
      />
      <Card>
        <Rows>
          {here.map(row)}
          <ListRow
            label={where.country ? `Lives in ${whereName(where)}` : 'Where do they live?'}
            detail={where.country ? 'Plans for other places are below' : 'Pick a place to see only the plans that apply'}
            tone="accent"
            onPress={pickProvince}
          />
        </Rows>
      </Card>
      {elsewhere.length ? (
        <>
          <SectionHeader
            title="Other places"
            count={elsewhere.length}
            collapsed={!othersOpen && !needle}
            onToggle={() => setOthersOpen(o => !o)}
          />
          {othersOpen || needle ? (
            <Card>
              <Rows>{elsewhere.map(row)}</Rows>
            </Card>
          ) : null}
        </>
      ) : null}
      {soon.length ? (
        <>
          <SectionHeader title="Coming soon" info="Plans for Canada and China, for now." />
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
