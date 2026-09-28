import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resolve } from '../domain/dates';
import { formatPrecise } from '../domain/format';
import { kindById, opens } from '../domain/kinds';
import { countsFrom, isLinkedKind } from '../domain/people';
import { plansFor } from '../domain/regions';
import type { DatePrecision } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { haptic } from '../platform';
import { actions, useStore } from '../state/store';
import {
  Button,
  Card,
  CheckRow,
  DateWheel,
  KindPicker,
  PlacePicker,
  ListRow,
  Rows,
  SectionHeader,
  UnfoldingPicker,
  space,
  type,
  usePalette,
} from '../ui';

type Open = 'what' | 'where' | 'when' | 'precision' | null;

const PRECISIONS = [
  { value: 'year', label: 'just the year' },
  { value: 'month', label: 'month and year' },
  { value: 'day', label: 'to the day' },
];

export function AnchorEditScreen({ route, navigation }: NativeStackScreenProps<Routes, 'AnchorEdit'>) {
  const p = usePalette();
  const anchorId = route.params?.anchorId;
  const plan = useStore(s => s.mine);
  const playbooks = useStore(s => s.playbooks);
  const view = useStore(s => s.mine.view);
  const now = useStore(s => s.now);
  const people = useStore(s => s.plan.people);
  const me = useStore(s => s.mine.person.id);
  const others = people.filter(x => x.id !== me);
  const allAnchors = useStore(s => s.plan.anchors);
  const existing = plan.anchors.find(a => a.id === anchorId);

  const startKind = existing?.kind ?? route.params?.kind ?? 'migrated';
  const [kind, setKind] = useState(startKind);
  const [label, setLabel] = useState(existing?.label ?? kindById(startKind)?.label ?? '');
  const [place, setPlace] = useState(existing?.place ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [location, setLocation] = useState(existing?.location);
  const [date, setDate] = useState(existing?.date ?? (startKind === 'born' ? '1990-01-01' : now));
  const [precision, setPrecision] = useState<DatePrecision>(existing?.precision ?? 'day');
  const [open, setOpen] = useState<Open>(existing ? null : 'what');
  const [attach, setAttach] = useState<string[]>([]);
  const saved = useRef(false);

  const [start] = useState({ kind, label, place, note, location, date, precision });
  const changed =
    start.kind !== kind ||
    start.label !== label ||
    start.place !== place ||
    start.note !== note ||
    start.location !== location ||
    start.date !== date ||
    start.precision !== precision ||
    attach.length > 0;
  const dirty = !existing || changed;

  const linked = isLinkedKind(kind);
  const toggle = (row: Open) => setOpen(o => (o === row ? null : row));
  const where = useStore(s => s.mine.where);
  const allTracks = useStore(s => s.plan.tracks);
  const draft = { id: anchorId, kind, personId: existing?.personId ?? me, linkId: existing?.linkId };
  const who = place.trim();
  const unlocks = plansFor({ kind, location }, where, playbooks).flatMap(pb => {
    const from = opens(kind, pb);
    const on = countsFrom(pb, draft, allAnchors);
    if (from === 'born' && !on) return [];
    if (from === 'child' && !on && !who) return [];
    const attached = !!on?.id && allTracks.some(t => t.playbookId === pb.id && t.anchorId === on.id);
    const detail =
      from === 'born' ? ' · counts from Born' : from === 'child' ? ` · on ${who}'s board` : '';
    return [{ pb, attached, detail }];
  });

  const doSave = () => {
    saved.current = true;
    actions.saveAnchor(
      {
        id: existing?.id,
        kind,
        label: label.trim() || 'An event',
        place: place.trim() || undefined,
        note: note.trim() || undefined,
        location,
        date,
        precision,
      },
      attach,
      linked ? place : undefined,
    );
    haptic('success');
    navigation.goBack();
  };

  const save = () => {
    const moved = existing && resolve(existing.date, existing.precision) !== resolve(date, precision);
    const trackIds = new Set(plan.tracks.filter(t => t.anchorId === anchorId).map(t => t.id));
    const steps = view.steps.filter(s => trackIds.has(s.trackId));
    if (moved && steps.length) {
      const doneCount = steps.filter(s => s.status === 'done').length;
      Alert.alert(
        `Move "${existing!.label}" to ${formatPrecise(date, precision)}?`,
        `${steps.length - doneCount} steps get rescheduled.${
          doneCount ? ` ${doneCount} already done keep their real dates.` : ''
        }`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Move it', style: 'default', onPress: doSave },
        ],
      );
    } else {
      doSave();
    }
  };

  const remove = () => {
    if (!existing) return;
    const n = plan.tracks.filter(t => t.anchorId === existing.id).length;
    const alsoOn = allAnchors
      .filter(a => existing.linkId && a.linkId === existing.linkId && a.id !== existing.id)
      .map(a => people.find(x => x.id === (a.personId ?? 'me'))?.name)
      .filter(Boolean);
    const detail = [
      n ? `${n} plan${n === 1 ? '' : 's'} lose${n === 1 ? 's' : ''} their event and detach.` : '',
      alsoOn.length ? `Also removed from ${alsoOn.join(' and ')}'s timeline.` : '',
    ].filter(Boolean).join(' ');
    Alert.alert(
      `Delete "${existing.label}"?`,
      detail || undefined,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            saved.current = true;
            actions.deleteAnchor(existing.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: existing ? 'Edit event' : 'Add an event',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityRole="button">
          <Text style={[type.body, { color: p.accent }]}>Cancel</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={save} hitSlop={12} accessibilityRole="button" disabled={!dirty}>
          <Text style={[type.body, { color: p.accent, fontWeight: '600', opacity: dirty ? 1 : 0.4 }]}>
            Save
          </Text>
        </Pressable>
      ),
    });
  });

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (saved.current || !changed) return;
        e.preventDefault();
        Alert.alert(existing ? 'Discard your changes?' : 'Discard this event?', undefined, [
          { text: 'Keep editing', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        ]);
      }),
    [navigation, changed, existing],
  );

  const future = resolve(date, precision) > now;
  const thisYear = new Date().getFullYear();

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <Card style={styles.form}>
        <ListRow label="What" value={label} open={open === 'what'} onPress={() => toggle('what')} />
        {open === 'what' ? (
          <KindPicker
            value={kind}
            label={label}
            onPick={(k, l) => {
              setKind(k);
              setLabel(l);
              setAttach([]);
              setOpen(existing ? null : 'when');
              haptic('selection');
            }}
          />
        ) : null}
        <View style={[styles.divider, { backgroundColor: p.hairline }]} />
        <ListRow
          label="Place"
          value={location ?? 'optional'}
          open={open === 'where'}
          onPress={() => toggle('where')}
        />
        {open === 'where' ? (
          <PlacePicker
            value={location}
            onPick={v => {
              setLocation(v);
              setOpen(null);
              haptic('selection');
            }}
          />
        ) : null}
        <View style={[styles.divider, { backgroundColor: p.hairline }]} />
        <ListRow
          label="When"
          value={formatPrecise(date, precision)}
          open={open === 'when'}
          onPress={() => toggle('when')}
        />
        {open === 'when' ? (
          <DateWheel
            value={date}
            precision={precision}
            onChange={setDate}
            minYear={1900}
            maxYear={thisYear + 40}
          />
        ) : null}
        <View style={[styles.divider, { backgroundColor: p.hairline }]} />
        <UnfoldingPicker
          label="Precision"
          value={precision}
          options={PRECISIONS}
          open={open === 'precision'}
          onToggle={() => toggle('precision')}
          onSelect={v => {
            setPrecision(v as DatePrecision);
            setOpen(null);
          }}
        />
        <View style={[styles.divider, { backgroundColor: p.hairline }]} />
        <View style={styles.inputRow}>
          <Text style={[type.body, { color: p.text }]}>{linked ? 'Who' : 'Event name'}</Text>
          <TextInput
            value={place}
            onChangeText={setPlace}
            onFocus={() => setOpen(null)}
            placeholder={placeholderFor(kind)}
            placeholderTextColor={p.faint}
            style={[type.body, styles.input, { color: p.dim }]}
            returnKeyType="done"
            accessibilityLabel={linked ? 'Who' : 'Event name'}
          />
        </View>
        {linked && others.length ? (
          <View style={styles.chips}>
            {others.map(x => (
              <Pressable
                key={x.id}
                onPress={() => setPlace(x.name)}
                style={[styles.chip, { backgroundColor: place === x.name ? p.accentSoft : p.bg }]}
                accessibilityRole="button"
                accessibilityState={{ selected: place === x.name }}>
                <Text style={[type.caption, { color: p.accent }]}>{x.name}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </Card>

      <SectionHeader title="Notes" />
      <Card>
        <TextInput
          value={note}
          onChangeText={setNote}
          onFocus={() => setOpen(null)}
          placeholder="What happened, who was there, what it meant"
          placeholderTextColor={p.faint}
          multiline
          scrollEnabled={false}
          style={[type.body, styles.notes, { color: p.text }]}
          accessibilityLabel="Notes"
        />
      </Card>

      {future ? (
        <Text style={[type.caption, styles.note, { color: p.dim }]}>
          That's ahead — it'll show as a plan, not a fact.
        </Text>
      ) : null}

      {unlocks.length ? (
        <>
          <SectionHeader title="Plans this unlocks" />
          <Card>
            <Rows>
              {unlocks.map(({ pb, attached, detail }) =>
                attached ? (
                  <ListRow key={pb.id} label={pb.title} value="✓ attached" chevron={false} />
                ) : (
                  <CheckRow
                    key={pb.id}
                    label={pb.title}
                    detail={`${pb.steps.length} steps${detail} · attaches on Save`}
                    checked={attach.includes(pb.id)}
                    onToggle={() =>
                      setAttach(a => (a.includes(pb.id) ? a.filter(x => x !== pb.id) : [...a, pb.id]))
                    }
                    onOpen={() => navigation.navigate('Playbook', { playbookId: pb.id })}
                  />
                ),
              )}
            </Rows>
          </Card>
        </>
      ) : null}

      {existing ? (
        <View style={styles.delete}>
          <Button title="Delete this event" destructive onPress={remove} />
        </View>
      ) : null}
    </ScrollView>
  );
}

const placeholderFor = (kind: string) =>
  ({
    born: 'optional',
    graduated: 'a degree',
    migrated: 'a country',
    'moved-city': 'a city',
    'school-start': "the child's name",
    'child-born': "the child's name",
    'visa-lodge': 'the program',
    'visa-granted': 'the permit',
    visit: 'who: Mom and Dad…',
    trip: 'a country',
  }[kind] ?? 'optional');

const styles = StyleSheet.create({
  content: { paddingTop: space.lg, paddingBottom: 80 },
  form: {},
  divider: { height: StyleSheet.hairlineWidth, marginLeft: space.lg },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    minHeight: 48,
    gap: space.md,
  },
  input: { flex: 1, textAlign: 'right', paddingVertical: space.md },
  notes: { minHeight: 96, padding: space.lg, paddingTop: space.md, textAlignVertical: 'top' },
  note: { paddingHorizontal: space.xl, paddingTop: space.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, paddingHorizontal: space.lg, paddingBottom: space.md },
  chip: { paddingHorizontal: space.md, paddingVertical: space.xs + 2, borderRadius: 14 },
  delete: { padding: space.lg, paddingTop: space.xxl },
});
