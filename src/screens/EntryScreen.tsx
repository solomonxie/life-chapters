import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resolve } from '../domain/dates';
import { formatPrecise } from '../domain/format';
import { chapterOf } from '../domain/journal';
import { anchorDisplay, lifeChapters, timelineNodes } from '../domain/plan';
import type { DatePrecision } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { haptic } from '../platform';
import { actions, useStore } from '../state/store';
import {
  Button,
  Card,
  DateWheel,
  ListRow,
  UnfoldingPicker,
  space,
  type,
  usePalette,
} from '../ui';

type Open = 'when' | 'precision' | 'about' | null;

const PRECISIONS = [
  { value: 'year', label: 'just the year' },
  { value: 'month', label: 'month and year' },
  { value: 'day', label: 'to the day' },
];

export function EntryScreen({ route, navigation }: NativeStackScreenProps<Routes, 'Entry'>) {
  const p = usePalette();
  const plan = useStore(s => s.plan);
  const view = useStore(s => s.view);
  const now = useStore(s => s.now);
  const existing = plan.entries.find(e => e.id === route.params?.entryId);

  const [date, setDate] = useState(existing?.date ?? route.params?.date ?? now);
  const [precision, setPrecision] = useState<DatePrecision>(existing?.precision ?? 'day');
  const [title, setTitle] = useState(existing?.title ?? '');
  const [body, setBody] = useState(existing?.body ?? '');
  const [anchorId, setAnchorId] = useState(existing?.anchorId ?? route.params?.anchorId);
  const [open, setOpen] = useState<Open>(null);
  const saved = useRef(false);

  const chapters = useMemo(
    () => lifeChapters(timelineNodes(plan.anchors, plan.tracks, view.steps, now), now),
    [plan.anchors, plan.tracks, view.steps, now],
  );
  const chapter = chapterOf(resolve(date, precision), chapters);
  const about = plan.anchors.find(a => a.id === anchorId);

  const dirty = existing
    ? existing.date !== date ||
      existing.precision !== precision ||
      (existing.title ?? '') !== title ||
      existing.body !== body ||
      existing.anchorId !== anchorId
    : body.trim().length > 0 || title.trim().length > 0;
  const canSave = body.trim().length > 0 || title.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    saved.current = true;
    actions.saveEntry({
      id: existing?.id,
      date,
      precision,
      title: title.trim() || undefined,
      body: body.trimEnd(),
      anchorId,
    });
    haptic('success');
    navigation.goBack();
  };

  const remove = () =>
    Alert.alert('Delete this story?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          saved.current = true;
          actions.deleteEntry(existing!.id);
          navigation.goBack();
        },
      },
    ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: existing ? 'Edit story' : 'A story',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} accessibilityRole="button">
          <Text style={[type.body, { color: p.accent }]}>Cancel</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={save} hitSlop={12} accessibilityRole="button" disabled={!canSave || !dirty}>
          <Text
            style={[
              type.body,
              styles.bold,
              { color: p.accent, opacity: canSave && dirty ? 1 : 0.4 },
            ]}>
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
        Alert.alert(existing ? 'Discard your changes?' : 'Discard this story?', undefined, [
          { text: 'Keep writing', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        ]);
      }),
    [navigation, dirty, existing],
  );

  const toggle = (o: Open) => setOpen(x => (x === o ? null : o));
  const sortedAnchors = [...plan.anchors].sort((a, b) => (a.date < b.date ? -1 : 1));

  return (
    <KeyboardAvoidingView style={styles.flex} behavior="padding" keyboardVerticalOffset={60}>
      <ScrollView
        style={{ backgroundColor: p.bg }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <Card>
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
              maxYear={Number(now.slice(0, 4)) + 30}
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
          <ListRow
            label="About"
            value={about ? anchorDisplay(about) : 'none'}
            open={open === 'about'}
            onPress={() => toggle('about')}
          />
          {open === 'about' ? (
            <View style={[styles.panel, { borderTopColor: p.hairline }]}>
              {[undefined, ...sortedAnchors].map(a => (
                <Pressable
                  key={a?.id ?? 'none'}
                  onPress={() => {
                    setAnchorId(a?.id);
                    if (a && !existing && !body) {
                      setDate(a.date);
                      setPrecision(a.precision);
                    }
                    setOpen(null);
                  }}
                  style={styles.option}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: anchorId === a?.id }}>
                  <Text style={[styles.tick, { color: p.accent }]}>{anchorId === a?.id ? '✓' : ''}</Text>
                  <Text style={[type.body, styles.flex, { color: p.text }]} numberOfLines={1}>
                    {a ? anchorDisplay(a) : 'None'}
                  </Text>
                  {a ? (
                    <Text style={[type.caption, { color: p.dim }]}>{formatPrecise(a.date, a.precision)}</Text>
                  ) : null}
                </Pressable>
              ))}
            </View>
          ) : null}
        </Card>

        <Text style={[type.caption, styles.chapter, { color: p.dim }]}>
          {resolve(date, precision) > now
            ? "That's ahead — a letter to later."
            : `Chapter: ${chapter?.label ?? 'before the first chapter'}`}
        </Text>

        <Card style={styles.writing}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            onFocus={() => setOpen(null)}
            placeholder="Title (optional)"
            placeholderTextColor={p.faint}
            style={[type.headline, styles.title, { color: p.text }]}
            returnKeyType="next"
            accessibilityLabel="Title"
          />
          <View style={[styles.divider, styles.flush, { backgroundColor: p.hairline }]} />
          <TextInput
            value={body}
            onChangeText={setBody}
            onFocus={() => setOpen(null)}
            placeholder="What happened?"
            placeholderTextColor={p.faint}
            multiline
            autoFocus={!existing}
            scrollEnabled={false}
            textAlignVertical="top"
            style={[type.body, styles.body, { color: p.text }]}
            accessibilityLabel="Story"
          />
        </Card>

        {existing ? (
          <View style={styles.delete}>
            <Text style={[type.caption, styles.meta, { color: p.faint }]}>
              Written {formatPrecise(existing.createdOn, 'day')}
              {existing.updatedOn !== existing.createdOn
                ? ` · edited ${formatPrecise(existing.updatedOn, 'day')}`
                : ''}
            </Text>
            <Button title="Delete this story" destructive onPress={remove} />
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bold: { fontWeight: '600' },
  content: { paddingTop: space.lg, paddingBottom: 120 },
  divider: { height: StyleSheet.hairlineWidth, marginLeft: space.lg },
  flush: { marginLeft: 0 },
  panel: { borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: space.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.sm + 2,
    paddingHorizontal: space.lg,
  },
  tick: { width: 18 },
  chapter: { paddingHorizontal: space.xl, paddingTop: space.sm, paddingBottom: space.md },
  writing: {},
  title: { paddingHorizontal: space.lg, paddingVertical: space.md },
  body: { paddingHorizontal: space.lg, paddingVertical: space.md, minHeight: 240, lineHeight: 23 },
  delete: { padding: space.lg, paddingTop: space.xl, gap: space.md },
  meta: { textAlign: 'center' },
});
