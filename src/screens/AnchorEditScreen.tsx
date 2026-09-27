import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resolve } from '../domain/dates';
import { formatPrecise } from '../domain/format';
import { kindById } from '../domain/kinds';
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
  ListRow,
  Rows,
  SectionHeader,
  UnfoldingPicker,
  space,
  type,
  usePalette,
} from '../ui';

type Open = 'what' | 'when' | 'precision' | null;

const PRECISIONS = [
  { value: 'year', label: 'just the year' },
  { value: 'month', label: 'month and year' },
  { value: 'day', label: 'to the day' },
];

export function AnchorEditScreen({ route, navigation }: NativeStackScreenProps<Routes, 'AnchorEdit'>) {
  const p = usePalette();
  const anchorId = route.params?.anchorId;
  const plan = useStore(s => s.plan);
  const playbooks = useStore(s => s.playbooks);
  const view = useStore(s => s.view);
  const now = useStore(s => s.now);
  const existing = plan.anchors.find(a => a.id === anchorId);

  const startKind = existing?.kind ?? route.params?.kind ?? 'migrated';
  const [kind, setKind] = useState(startKind);
  const [label, setLabel] = useState(existing?.label ?? kindById(startKind)?.label ?? '');
  const [place, setPlace] = useState(existing?.place ?? '');
  const [date, setDate] = useState(existing?.date ?? (startKind === 'born' ? '1990-01-01' : now));
  const [precision, setPrecision] = useState<DatePrecision>(existing?.precision ?? 'day');
  const [open, setOpen] = useState<Open>(existing ? null : 'what');
  const [attach, setAttach] = useState<string[]>([]);
  const saved = useRef(false);

  const dirty =
    !existing ||
    existing.kind !== kind ||
    existing.label !== label ||
    (existing.place ?? '') !== place ||
    existing.date !== date ||
    existing.precision !== precision ||
    attach.length > 0;

  const toggle = (row: Open) => setOpen(o => (o === row ? null : row));
  const unlocks = playbooks.filter(pb => pb.anchorKind === kind);
  const attachedHere = new Set(
    plan.tracks.filter(t => t.anchorId === anchorId).map(t => t.playbookId),
  );

  const doSave = () => {
    saved.current = true;
    actions.saveAnchor(
      { id: existing?.id, kind, label: label.trim() || 'A date', place: place.trim() || undefined, date, precision },
      attach,
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
    Alert.alert(
      `Delete "${existing.label}"?`,
      n ? `${n} track${n === 1 ? '' : 's'} lose${n === 1 ? 's' : ''} their anchor and detach.` : undefined,
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
      title: existing ? 'Edit date' : 'Add a date',
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
        if (saved.current || !dirty) return;
        e.preventDefault();
        Alert.alert(existing ? 'Discard your changes?' : 'Discard this date?', undefined, [
          { text: 'Keep editing', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        ]);
      }),
    [navigation, dirty, existing],
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
        <View style={styles.inputRow}>
          <Text style={[type.body, { color: p.text }]}>Detail</Text>
          <TextInput
            value={place}
            onChangeText={setPlace}
            onFocus={() => setOpen(null)}
            placeholder={placeholderFor(kind)}
            placeholderTextColor={p.faint}
            style={[type.body, styles.input, { color: p.dim }]}
            returnKeyType="done"
            accessibilityLabel="Detail"
          />
        </View>
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
      </Card>

      {future ? (
        <Text style={[type.caption, styles.note, { color: p.dim }]}>
          That's ahead — it'll show as a plan, not a fact.
        </Text>
      ) : null}

      {unlocks.length ? (
        <>
          <SectionHeader title="Tracks this unlocks" />
          <Card>
            <Rows>
              {unlocks.map(pb =>
                attachedHere.has(pb.id) ? (
                  <ListRow key={pb.id} label={pb.title} value="✓ attached" chevron={false} />
                ) : (
                  <CheckRow
                    key={pb.id}
                    label={pb.title}
                    detail={`${pb.steps.length} steps · attaches on Save`}
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
          <Button title="Delete this date" destructive onPress={remove} />
        </View>
      ) : null}
    </ScrollView>
  );
}

const placeholderFor = (kind: string) =>
  ({
    born: 'a place',
    graduated: 'a degree',
    migrated: 'a country',
    'moved-city': 'a city',
    'school-start': "the child's name",
    'child-born': "the child's name",
    'visa-lodge': 'the visa',
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
  note: { paddingHorizontal: space.xl, paddingTop: space.sm },
  delete: { padding: space.lg, paddingTop: space.xxl },
});
