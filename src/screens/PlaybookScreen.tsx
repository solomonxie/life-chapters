import React, { useLayoutEffect, useMemo, useState } from 'react';
import { ActionSheetIOS, Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { resolve } from '../domain/dates';
import { formatDuration, formatMonth, formatPrecise } from '../domain/format';
import { kindLabel } from '../domain/kinds';
import { ME } from '../domain/people';
import { anchorDisplay } from '../domain/plan';
import { bucketize } from '../domain/radar';
import { decidedBy, fits, rulesName, whereFor, whereName, twinFor } from '../domain/regions';
import { schedule, topoSort } from '../domain/schedule';
import type { StepTemplate } from '../domain/types';
import type { Routes } from '../navigation/routes';
import { haptic } from '../platform';
import { actions, useStore } from '../state/store';
import { AppliesIf, Button, Card, Disclaimer, ListRow, Rows, SectionHeader, StepRow, SwipeRow, space, type, usePalette } from '../ui';
import { pickSnooze } from './snooze';
import { exportPlaybook } from './playbookFiles';

/** Next steps shows the nearest few; the full list is below. */
const NEXT_SHOWN = 3;
const SOURCES_SHOWN = 3;

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
  const [aboutOpen, setAboutOpen] = useState(false);
  const [allSources, setAllSources] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
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
  const due = whereFor(playbook, anchor, plan.where, plan.anchors);
  const twin = twinFor(playbook, due, playbooks);

  const trackSteps = track ? view.steps.filter(s => s.trackId === track.id) : [];
  const buckets = bucketize(trackSteps, now);
  const actNow = buckets.now;
  const nextSteps = [...buckets.d90, ...buckets.year, ...buckets.later].slice(0, NEXT_SHOWN);
  const decided = decidedBy(anchor, plan.anchors, now);
  const whose = plan.person.id === ME ? 'your' : `${plan.person.name}'s`;
  const sources = playbook.sources ?? [];

  const swipeRow = (s: (typeof trackSteps)[number]) => (
    <SwipeRow
      key={s.instanceId}
      trailing={[
        { label: 'Done', color: p.done, onPress: () => { haptic('success'); actions.markDone(s.instanceId); } },
        { label: 'Snooze', color: p.accent, onPress: () => pickSnooze(s.instanceId) },
      ]}
      leading={[{ label: 'Not for me', color: p.dim, onPress: () => actions.skip(s.instanceId) }]}>
      <StepRow
        step={s}
        now={now}
        move={moves[s.instanceId]}
        onPress={() => navigation.navigate('Step', { instanceId: s.instanceId })}
      />
    </SwipeRow>
  );
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
        <Text style={[type.title, { color: p.text }]} accessibilityRole="header">
          {playbook.title}
        </Text>
        <Text style={[type.caption, { color: p.dim }]}>
          {playbook.steps.length} steps · anchored on "{kindLabel(playbook.anchorKind)}"
          {playbook.region ? ` · ${playbook.region}` : ''}
        </Text>
        {playbook.summary || playbook.ages || playbook.conditions?.length ? (
          <Pressable
            onPress={() => setAboutOpen(o => !o)}
            style={styles.about}
            accessibilityRole="button"
            accessibilityState={{ expanded: aboutOpen }}
            accessibilityHint={aboutOpen ? 'Folds the description' : 'Shows the whole description'}>
            {playbook.summary ? (
              <Text style={[type.body, { color: p.text }]} numberOfLines={aboutOpen ? undefined : 2}>
                {playbook.summary}
              </Text>
            ) : null}
            {aboutOpen ? <AppliesIf ages={playbook.ages} conditions={playbook.conditions} /> : null}
            <Text style={[type.caption, { color: p.accent }]}>{aboutOpen ? 'Less' : 'More'}</Text>
          </Pressable>
        ) : null}
        <Disclaimer playbook={playbook} now={now} />
      </View>

      {!fits(playbook, due) ? (
        <Card style={[styles.wrong, { backgroundColor: p.accentSoft }]}>
          <Text style={[type.body, { color: p.text }]}>
            This plan follows {rulesName(playbook)} rules, but{' '}
            {decided?.location
              ? `${whose} "${anchorDisplay(decided)}" event is in ${decided.location}.`
              : `this counts as ${whereName(due)}.`}
          </Text>
          <View style={styles.row}>
          {decided ? (
            <Button
              title="Edit event"
              kind="plain"
              onPress={() => navigation.navigate('AnchorEdit', { anchorId: decided.id })}
            />
          ) : null}
          {twin ? (
            <Button
              title={track ? `Switch to ${whereName(due)}` : `See ${whereName(due)}`}
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
          </View>
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

      {actNow.length ? (
        <>
          <SectionHeader title="Act now" count={actNow.length} />
          <Card>
            <Rows inset={space.lg + 18 + space.sm}>{actNow.map(swipeRow)}</Rows>
          </Card>
        </>
      ) : null}
      {nextSteps.length ? (
        <>
          <SectionHeader title="Next steps" />
          <Card>
            <Rows inset={space.lg + 18 + space.sm}>{nextSteps.map(swipeRow)}</Rows>
          </Card>
        </>
      ) : null}
      {actNow.length || nextSteps.length ? (
        <Text style={[type.caption, styles.hint, { color: p.faint }]}>
          Swipe a step left for Done or Snooze, right for Not for me.
        </Text>
      ) : null}

      <SectionHeader title={track ? 'All steps' : 'Steps'} count={playbook.steps.length} />
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

      {sources.length ? (
        <>
          <SectionHeader
            title="Sources"
            info="Where the playbook's author checked the steps. Opens in Safari — the app itself sends nothing."
          />
          <Card>
            <Rows>
              {(allSources ? sources : sources.slice(0, SOURCES_SHOWN)).map(s => (
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
          {sources.length > SOURCES_SHOWN ? (
            <Button
              title={allSources ? 'Show fewer' : `Show all ${sources.length}`}
              kind="plain"
              style={styles.more}
              onPress={() => setAllSources(x => !x)}
            />
          ) : null}
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
  wrong: { padding: space.md, gap: space.xs },
  row: { flexDirection: 'row', gap: space.lg },
  about: { gap: space.xs },
  hint: { textAlign: 'center', paddingHorizontal: space.lg, paddingTop: space.sm },
  more: { alignSelf: 'flex-start', marginLeft: space.lg, marginTop: space.sm },
  card: { marginTop: space.md },
  tpl: { flexDirection: 'row', gap: space.sm, paddingRight: space.lg, paddingVertical: space.md },
  n: { width: 18, paddingTop: 2 },
});
