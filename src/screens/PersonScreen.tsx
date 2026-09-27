import React, { useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatPrecise } from '../domain/format';
import { ME } from '../domain/people';
import { PROVINCES, whereName, type Where } from '../domain/regions';
import type { Routes } from '../navigation/routes';
import { haptic } from '../platform';
import { actions, useStore } from '../state/store';
import { Card, DateWheel, ListRow, Rows, SectionHeader, UnfoldingPicker, space, type, usePalette } from '../ui';

type Relation = 'child' | 'partner' | 'parent';

const RELATIONS = [
  { value: 'child', label: 'Child' },
  { value: 'partner', label: 'Partner' },
  { value: 'parent', label: 'Parent' },
];

/** New person, a person linked to whoever is on screen, a rename, or where they live. */
export function PersonScreen(props: NativeStackScreenProps<Routes, 'Person'>) {
  return props.route.params.mode === 'province' ? <LivesIn {...props} /> : <PersonForm {...props} />;
}

/** Plans follow this; "from their events" reads where they last moved to. */
function LivesIn({ route, navigation }: NativeStackScreenProps<Routes, 'Person'>) {
  const p = usePalette();
  const personId = route.params.personId ?? ME;
  const person = useStore(s => s.plan.people.find(x => x.id === personId));
  const current = useStore(s => s.mine);
  const inferred = current.person.id === personId && !person?.country ? current.where : undefined;
  const isMe = personId === ME;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Lives in',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityRole="button">
          <Text style={[type.body, { color: p.accent }]}>Done</Text>
        </Pressable>
      ),
    });
  });

  const pick = (where: Where | undefined) => {
    actions.setWhere(personId, where);
    haptic('selection');
    navigation.goBack();
  };
  const is = (country: string, province?: string) =>
    person?.country === country && person?.province === province;
  const row = (label: string, selected: boolean, onPress: () => void, key = label) => (
    <ListRow
      key={key}
      label={`${selected ? '✓ ' : '   '}${label}`}
      chevron={false}
      accessibilityLabel={label}
      selected={selected}
      onPress={onPress}
    />
  );

  return (
    <ScrollView style={{ backgroundColor: p.bg }} contentContainerStyle={styles.content}>
      <Text style={[type.caption, styles.note, { color: p.dim }]}>
        School, health cards, licences, marriage and pensions follow where{' '}
        {isMe ? 'you live' : `${person?.name ?? 'they'} lives`}. A date with a place of its own — a
        wedding abroad, say — follows that place instead.
      </Text>
      <Card>
        <ListRow
          label={`${!person?.country ? '✓ ' : '   '}From ${isMe ? 'my' : 'their'} events`}
          detail={
            inferred?.country
              ? `Now: ${whereName(inferred)}, from where ${isMe ? 'you' : 'they'} last moved`
              : 'Set a place on Born or a move to work it out'
          }
          chevron={false}
          accessibilityLabel="Work it out from the places on their events"
          selected={!person?.country}
          onPress={() => pick(undefined)}
        />
      </Card>
      <SectionHeader title="Canada" />
      <Card>
        <Rows>
          {PROVINCES.map(x => row(x.name, is('CA', x.code), () => pick({ country: 'CA', province: x.code }), x.code))}
        </Rows>
      </Card>
      <SectionHeader title="China" />
      <Card>{row('China', is('CN'), () => pick({ country: 'CN' }))}</Card>
    </ScrollView>
  );
}

function PersonForm({ route, navigation }: NativeStackScreenProps<Routes, 'Person'>) {
  const p = usePalette();
  const { mode, personId } = route.params;
  const now = useStore(s => s.now);
  const current = useStore(s => s.mine.person);
  const ownBorn = useStore(s => s.mine.anchors.find(a => a.kind === 'born'));
  const renaming = useStore(s => s.plan.people.find(x => x.id === personId));
  const [name, setName] = useState(renaming?.name ?? '');
  const [relation, setRelation] = useState<Relation>('child');
  const [date, setDate] = useState(now);
  const [open, setOpen] = useState<'relation' | 'date' | null>(null);
  const ready = name.trim().length > 0;
  const whose = current.id === ME ? 'you' : current.name;
  const fixedDate = relation === 'parent' && ownBorn;
  const shownDate = fixedDate ? ownBorn.date : date;

  const save = () => {
    if (!ready) return;
    if (mode === 'rename' && personId) actions.renamePerson(personId, name);
    else if (mode === 'new') actions.addPerson(name);
    else {
      const id = actions.linkPerson(name, relation, date, 'day');
      if (id) actions.switchPerson(id);
    }
    haptic('success');
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mode === 'rename' ? 'Rename' : mode === 'new' ? 'New person' : `Link to ${whose}`,
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityRole="button">
          <Text style={[type.body, { color: p.accent }]}>Cancel</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={save} hitSlop={12} accessibilityRole="button" disabled={!ready}>
          <Text style={[type.body, { color: p.accent, fontWeight: '600', opacity: ready ? 1 : 0.4 }]}>
            {mode === 'link' ? 'Link' : 'Save'}
          </Text>
        </Pressable>
      ),
    });
  });

  return (
    <ScrollView style={{ backgroundColor: p.bg }} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Card>
        <View style={styles.inputRow}>
          <Text style={[type.body, { color: p.text }]}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            onFocus={() => setOpen(null)}
            autoFocus={mode !== 'link'}
            placeholder="Their name"
            placeholderTextColor={p.faint}
            style={[type.body, styles.input, { color: p.dim }]}
            returnKeyType="done"
            onSubmitEditing={save}
            accessibilityLabel="Name"
          />
        </View>
        {mode === 'link' ? (
          <>
            <View style={[styles.divider, { backgroundColor: p.hairline }]} />
            <UnfoldingPicker
              label="Is your"
              value={relation}
              options={RELATIONS}
              open={open === 'relation'}
              onToggle={() => setOpen(o => (o === 'relation' ? null : 'relation'))}
              onSelect={v => {
                setRelation(v as Relation);
                setOpen(null);
              }}
            />
            <View style={[styles.divider, { backgroundColor: p.hairline }]} />
            <ListRow
              label={relation === 'child' ? 'Born' : relation === 'parent' ? `${current.name} born` : 'Married'}
              value={fixedDate ? formatPrecise(ownBorn.date, ownBorn.precision) : formatPrecise(shownDate, 'day')}
              open={open === 'date'}
              onPress={fixedDate ? undefined : () => setOpen(o => (o === 'date' ? null : 'date'))}
            />
            {open === 'date' && !fixedDate ? (
              <DateWheel value={date} precision="day" onChange={setDate} minYear={1900} maxYear={Number(now.slice(0, 4)) + 5} />
            ) : null}
          </>
        ) : null}
      </Card>
      {mode === 'link' ? (
        <>
          <SectionHeader title="What happens" />
          <Text style={[type.caption, styles.note, { color: p.dim }]}>
            {relation === 'child'
              ? `"${name.trim() || 'Child'} born" goes on ${whose === 'you' ? 'your' : `${whose}'s`} timeline, and ${name.trim() || 'they'} get a board of their own that starts on that date.`
              : relation === 'parent'
              ? `${name.trim() || 'They'} get a board with "${current.name} born" on it, tied to ${whose === 'you' ? 'your' : `${whose}'s`} birth date.`
              : `The wedding goes on both timelines. Moving the date on one moves it on the other.`}
          </Text>
        </>
      ) : mode === 'new' ? (
        <Text style={[type.caption, styles.note, { color: p.dim }]}>
          A separate board with its own dates and plans, not tied to anyone.
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: space.lg, paddingBottom: 80 },
  divider: { height: StyleSheet.hairlineWidth, marginLeft: space.lg },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: space.lg, minHeight: 48, gap: space.md },
  input: { flex: 1, textAlign: 'right', paddingVertical: space.md },
  note: { paddingHorizontal: space.xl, paddingTop: space.sm },
});
