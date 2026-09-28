import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatAges } from '../domain/format';
import { kindLabel } from '../domain/kinds';
import { ME } from '../domain/people';
import { ageOn, anchorDisplay } from '../domain/plan';
import { COUNTRIES, decidedBy, fits, provinceName, whereFor, whereName } from '../domain/regions';
import type { Playbook } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, space, usePalette } from '../ui';
import { importPlaybook } from './playbookFiles';

const COMING_SOON = ['United States'];
/** Places they don't live in show this many, then "Show all". */
const FOLDED_SHOWN = 3;

interface Group {
  key: string;
  title: string;
  items: Playbook[];
  open: boolean;
}

export function LibraryScreen({ navigation }: NativeStackScreenProps<Routes, 'Library'>) {
  const p = usePalette();
  const playbooks = useStore(s => s.playbooks);
  const plan = useStore(s => s.mine);
  const now = useStore(s => s.now);
  const [q, setQ] = useState('');
  const [toggled, setToggled] = useState<string[]>([]);
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
  const suggested = matches.filter(
    pb =>
      notOutgrown(pb) &&
      plan.anchors.some(a => a.kind === pb.anchorKind && fits(pb, whereFor(pb, a, where, plan.anchors))),
  );
  const groups = byPlace(matches, where).map(g => ({
    ...g,
    open: !!needle || (toggled.includes(g.key) ? !g.open : g.open),
  }));
  const decided = decidedBy(undefined, plan.anchors, now);
  const whose = plan.person.id === ME ? 'your' : `${plan.person.name}'s`;
  const born = plan.anchors.find(a => a.kind === 'born');
  const livesDetail = decided
    ? `From ${whose} "${anchorDisplay(decided)}" event · ${decided.location}`
    : 'Add a place to Born or a move to open the plans that apply';
  const toggle = (key: string) =>
    setToggled(t => (t.includes(key) ? t.filter(k => k !== key) : [...t, key]));
  const fixPlace = () =>
    navigation.navigate('AnchorEdit', decided ? { anchorId: decided.id } : born ? { anchorId: born.id } : { kind: 'moved-city' });

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
      <Card style={styles.lives}>
        <ListRow
          label={where.country ? `Lives in ${whereName(where)}` : 'Where do they live?'}
          detail={livesDetail}
          tone="accent"
          onPress={fixPlace}
        />
      </Card>
      {suggested.length ? (
        <>
          <SectionHeader
            title="Fits your events"
            count={suggested.length}
            info="Plans that hang off a kind of event this person already has, fit where that event happened, and that they haven't aged past."
          />
          <Card>
            <Rows>{suggested.map(row)}</Rows>
          </Card>
        </>
      ) : null}
      {groups.map(g => (
        <React.Fragment key={g.key}>
          <SectionHeader title={g.title} count={g.items.length} />
          <Card>
            <Rows>
              {(g.open ? g.items : g.items.slice(0, FOLDED_SHOWN)).map(row)}
              {g.items.length > FOLDED_SHOWN && !needle ? (
                <ListRow
                  label={g.open ? 'Show fewer' : `Show all ${g.items.length}`}
                  tone="accent"
                  chevron={false}
                  onPress={() => toggle(g.key)}
                />
              ) : null}
            </Rows>
          </Card>
        </React.Fragment>
      ))}
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
  lives: { marginTop: space.sm },
});

/**
 * Country, then within Canada nationwide and each province. Where they live
 * comes first and open; the rest show their first few.
 */
function byPlace(playbooks: Playbook[], where: { country?: string; province?: string }): Group[] {
  const countries = [...COUNTRIES].sort((a, b) => (a.code === where.country ? -1 : b.code === where.country ? 1 : 0));
  const groups: Group[] = [];
  for (const c of countries) {
    const mine = playbooks.filter(pb => pb.country === c.code);
    const provinces = [...new Set(mine.map(pb => pb.province).filter((x): x is string => !!x))].sort((a, b) =>
      a === where.province ? -1 : b === where.province ? 1 : (provinceName(a) ?? a) < (provinceName(b) ?? b) ? -1 : 1,
    );
    const nationwide = mine.filter(pb => !pb.province);
    const fitsHere = (province?: string) =>
      c.code === where.country && (!province || !where.province || province === where.province);
    if (nationwide.length) {
      groups.push({
        key: c.code,
        title: provinces.length ? `${c.name} · nationwide` : c.name,
        items: nationwide,
        open: fitsHere(),
      });
    }
    for (const pr of provinces) {
      groups.push({
        key: `${c.code}-${pr}`,
        title: `${c.name} · ${provinceName(pr) ?? pr}`,
        items: mine.filter(pb => pb.province === pr),
        open: fitsHere(pr),
      });
    }
  }
  const other = playbooks.filter(pb => !COUNTRIES.some(c => c.code === pb.country));
  if (other.length) groups.push({ key: 'other', title: 'Other', items: other, open: false });
  return groups.filter(g => g.items.length);
}
