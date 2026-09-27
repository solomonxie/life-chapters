import React, { useLayoutEffect, useMemo, useState } from 'react';
import { ActionSheetIOS, Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resolve } from '../domain/dates';
import { formatDuration, formatMonth, formatPrecise } from '../domain/format';
import { kindLabel } from '../domain/kinds';
import { ME } from '../domain/people';
import { anchorDisplay } from '../domain/plan';
import { provinceName, twinFor } from '../domain/provinces';
import { schedule, topoSort } from '../domain/schedule';
import type { StepTemplate } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { haptic } from '../platform';
import { actions, useStore } from '../state/store';
import { AppliesIf, Button, Card, Disclaimer, ListRow, Rows, SectionHeader, StepRow, space, type, usePalette } from '../ui';
import { exportPlaybook } from './playbookFiles';

export function PlaybookScreen({ route, navigation }: NativeStackScreenProps<Routes, 'Playbook'>) {
  const p = usePalette();
  const { playbookId, trackId } = route.params;
  const playbook = useStore(s => s.playbooks.find(x => x.id === playbookId));
  const playbooks = useStore(s => s.playbooks);
  const plan = useStore(s => s.mine);
  const view = useStore(s => s.mine.view);
  const moves = useStore(s => s.moves);
  const now = useStore(s => s.now);
  const track = plan.tracks.find(t => t.id === trackId);
  const candidates = plan.anchors.filter(a => a.kind === playbook?.anchorKind);
  const [previewId, setPreviewId] = useState(candidates[0]?.id);
  const anchor = plan.anchors.find(a => a.id === (track?.anchorId ?? previewId));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: playbook?.title ?? '',
      headerRight: () => (
        <Pressable onPress={menu} hitSlop={12} accessibilityRole="button" accessibilityLabel="More">
          <Text maxFontSizeMultiplier={1.3} style={[type.headline, { color: p.accent }]}>⋯</Text>
        </Pressable>
      ),
    });
  });

  const preview = useMemo(() => {
    if (!playbook || !anchor) return null;
    const scheduled = schedule(playbook, {
      id: 'preview',
      playbookId: playbook.id,
      anchorEventDate: resolve(anchor.date, anchor.precision),
    }, []);
    const starts = scheduled.map(s => s.startBy).sort();
    const ends = scheduled.map(s => s.dueBy).sort();
    return { first: starts[0], last: ends[ends.length - 1] };
  }, [playbook, anchor]);

  const depth = useMemo(() => (playbook ? depths(playbook.steps) : new Map<string, number>()), [playbook]);

  if (!playbook) return null;
  const twin = twinFor(playbook, plan.province, playbooks);

  const trackSteps = track ? view.steps.filter(s => s.trackId === track.id) : [];
  const ordered = topoSort(playbook.steps);

  function menu() {
    const opts = ['Duplicate', 'Export…', ...(track ? ['Detach'] : []), 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions(
      { options: opts, cancelButtonIndex: opts.length - 1, destructiveButtonIndex: track ? 2 : undefined },
      i => {
        if (opts[i] === 'Duplicate') {
          const id = actions.duplicatePlaybook(playbook!.id);
          if (id) navigation.push('Playbook', { playbookId: id });
        }
        if (opts[i] === 'Export…') exportPlaybook(playbook!).catch(() => {});
        if (opts[i] === 'Detach') detach();
      },
    );
  }

  const detach = () => {
    const done = trackSteps.filter(s => s.status === 'done').length;
    Alert.alert(
      `Detach "${playbook.title}"?`,
      `${trackSteps.length} steps go${done ? `, including ${done} done` : ''}.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Detach',
          style: 'destructive',
          onPress: () => {
            actions.detachTrack(track!.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const attach = () => {
    if (!anchor) return;
    actions.attachTrack(playbook.id, anchor.id);
    haptic('success');
    navigation.popToTop();
  };

  const pickAnchor = () => {
    if (candidates.length < 2) return;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Anchor on',
        options: [...candidates.map(a => `${anchorDisplay(a)} · ${formatPrecise(a.date, a.precision)}`), 'Cancel'],
        cancelButtonIndex: candidates.length,
      },
      i => {
        if (i >= candidates.length) return;
        if (track) actions.reanchorTrack(track.id, candidates[i].id);
        else setPreviewId(candidates[i].id);
      },
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <View style={styles.head}>
        <Text style={[type.caption, { color: p.dim }]}>
          {playbook.steps.length} steps · anchored on "{kindLabel(playbook.anchorKind)}"
          {playbook.region ? ` · ${playbook.region}` : ''}
        </Text>
        {playbook.summary ? (
          <Text style={[type.body, { color: p.text }]}>{playbook.summary}</Text>
        ) : null}
        <AppliesIf ages={playbook.ages} conditions={playbook.conditions} />
        <Disclaimer playbook={playbook} now={now} />
      </View>

      {playbook.province && plan.province && playbook.province !== plan.province ? (
        <Card style={[styles.needs, { backgroundColor: p.lateSoft }]}>
          <Text style={[type.body, styles.flex, { color: p.text }]}>
            ⚠ {provinceName(playbook.province)} rules. {plan.person.id === ME ? 'You live' : `${plan.person.name} lives`} in{' '}
            {provinceName(plan.province)}.
          </Text>
          {twin ? (
            <Button
              title={track ? `Switch to ${provinceName(plan.province)}` : `See ${provinceName(plan.province)}`}
              kind="plain"
              onPress={() => {
                if (track) {
                  const id = actions.switchTrack(track.id, twin.id);
                  navigation.replace('Playbook', { playbookId: twin.id, trackId: id ?? undefined });
                } else {
                  navigation.replace('Playbook', { playbookId: twin.id });
                }
              }}
            />
          ) : null}
        </Card>
      ) : null}

      {!track ? (
        <View style={styles.attach}>
          <Button title="Attach to my plan" kind="primary" disabled={!anchor} onPress={attach} />
          {!anchor ? (
            <Card style={[styles.needs, { backgroundColor: p.accentSoft }]}>
              <Text style={[type.body, styles.flex, { color: p.text }]}>
                Needs a "{kindLabel(playbook.anchorKind)}" date first.
              </Text>
              <Button
                title="Add it"
                kind="plain"
                onPress={() => navigation.navigate('AnchorEdit', { kind: playbook.anchorKind })}
              />
            </Card>
          ) : null}
        </View>
      ) : null}

      {anchor ? (
        <Card style={styles.card}>
          <Rows>
            <ListRow
              label="Anchored on"
              value={formatPrecise(anchor.date, anchor.precision)}
              detail={anchorDisplay(anchor)}
              onPress={candidates.length > 1 ? pickAnchor : undefined}
            />
            {preview ? (
              <ListRow
                label="First step"
                value={`${track ? 'starts' : 'would start'} ${formatMonth(preview.first)}`}
                chevron={false}
              />
            ) : null}
            {preview ? (
              <ListRow
                label="Last step"
                value={`${track ? 'finishes' : 'would finish'} ${formatMonth(preview.last)}`}
                chevron={false}
              />
            ) : null}
          </Rows>
        </Card>
      ) : null}

      <SectionHeader title="Steps" count={playbook.steps.length} />
      <Card>
        <Rows>
          {track
            ? trackSteps.map(s => (
                <StepRow
                  key={s.instanceId}
                  step={s}
                  now={now}
                  move={moves[s.instanceId]}
                  onPress={() => navigation.navigate('Step', { instanceId: s.instanceId })}
                />
              ))
            : ordered.map((s, i) => <TemplateRow key={s.id} step={s} n={i + 1} depth={depth.get(s.id) ?? 0} />)}
        </Rows>
      </Card>

      {playbook.sources?.length ? (
        <>
          <SectionHeader
            title="Sources"
            info="Where the playbook's author checked the steps. Opens in Safari — the app itself sends nothing."
          />
          <Card>
            <Rows>
              {playbook.sources.map(s => (
                <ListRow
                  key={s.url}
                  label={s.title}
                  detail={s.url.replace(/^https?:\/\//, '').split('/')[0]}
                  tone="accent"
                  onPress={() => Linking.openURL(s.url)}
                />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}
    </ScrollView>
  );
}

function TemplateRow({ step, n, depth }: { step: StepTemplate; n: number; depth: number }) {
  const p = usePalette();
  const bits = [`takes ${formatDuration(step.durationDays)}`];
  if (step.validForDays) bits.push(`valid ${formatDuration(step.validForDays)}`);
  return (
    <View style={[styles.tpl, { paddingLeft: space.lg + depth * 12 }]}>
      <Text style={[type.caption, styles.n, { color: p.dim }]}>{depth ? '└' : n}</Text>
      <View style={styles.flex}>
        <Text style={[type.body, { color: p.text }]}>{step.title}</Text>
        <Text style={[type.caption, { color: p.dim }]}>{bits.join(' · ')}</Text>
      </View>
    </View>
  );
}

/** Longest chain of prerequisites before each step — the tree's indent. */
function depths(steps: StepTemplate[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const s of topoSort(steps)) {
    out.set(s.id, s.dependsOn.length ? Math.min(4, 1 + Math.max(...s.dependsOn.map(d => out.get(d) ?? 0))) : 0);
  }
  return out;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  flex: { flex: 1 },
  head: { paddingHorizontal: space.lg, paddingTop: space.sm, gap: space.sm },
  attach: { padding: space.lg, gap: space.md },
  needs: { marginHorizontal: 0, flexDirection: 'row', alignItems: 'center', padding: space.md, gap: space.sm },
  card: { marginTop: space.md },
  tpl: { flexDirection: 'row', gap: space.sm, paddingRight: space.lg, paddingVertical: space.md },
  n: { width: 18, paddingTop: 2 },
});
