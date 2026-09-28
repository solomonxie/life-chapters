import React, { useLayoutEffect, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { diffDays } from '../domain/dates';
import { formatPrecise } from '../domain/format';
import { lifeChapters, openSteps, chapterSteps, timelineNodes } from '../domain/plan';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, StepRow, space, type, usePalette } from '../ui';
import { ChapterBar } from './TimelineScreen';
import { plansFor } from '../domain/regions';
import { countsFrom, ownerOf } from '../domain/people';

export function ChapterScreen({ route, navigation }: NativeStackScreenProps<Routes, 'Chapter'>) {
  const p = usePalette();
  const { eventId } = route.params;
  const plan = useStore(s => s.mine);
  const view = useStore(s => s.mine.view);
  const playbooks = useStore(s => s.playbooks);
  const moves = useStore(s => s.moves);
  const allAnchors = useStore(s => s.plan.anchors);
  const allTracks = useStore(s => s.plan.tracks);
  const now = useStore(s => s.now);

  const nodes = useMemo(
    () => timelineNodes(plan.anchors, plan.tracks, view.steps, now),
    [plan.anchors, plan.tracks, view.steps, now],
  );
  const node = nodes.find(n => n.id === eventId);
  const chapter = lifeChapters(nodes, now).find(x => x.eventId === eventId);
  const anchor = plan.anchors.find(a => a.id === eventId);
  const nextNode = node ? nodes.find(n => n.date > node.date && !n.moment) : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({ title: chapter?.label ?? node?.label ?? '' });
  }, [navigation, chapter, node]);

  if (!node) return null;

  const trackIds = new Set(plan.tracks.filter(t => t.anchorId === eventId).map(t => t.id));
  const steps = openSteps(
    view.steps.filter(
      s => trackIds.has(s.trackId) || (chapter ? chapterSteps(chapter, [s]).length > 0 : false),
    ),
  ).sort((a, b) => (a.startBy < b.startBy ? -1 : 1));
  const past = !!chapter?.end && chapter.end <= now;
  const unlocks = anchor
    ? plansFor(anchor, plan.where, playbooks).filter(pb => {
        const on = countsFrom(pb, anchor, allAnchors);
        return on && ownerOf(on) === plan.person.id;
      })
    : [];
  const years = chapter?.end ? Math.max(1, Math.round(diffDays(chapter.start, chapter.end) / 365.25)) : null;
  const yearN = chapter ? Math.floor(diffDays(chapter.start, now) / 365.25) + 1 : null;

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <Card style={styles.head}>
        {chapter ? <ChapterBar start={chapter.start} end={chapter.end} now={now} /> : null}
        <Text style={[type.caption, { color: p.dim }]}>
          {chapter?.isCurrent && years && yearN
            ? `year ${yearN} of ${years}`
            : node.date > now
            ? `starts ${formatPrecise(node.date, node.precision)}`
            : `since ${formatPrecise(node.date, node.precision)}`}
          {anchor?.location ? ` · ${anchor.location}` : ''}
        </Text>
      </Card>

      {unlocks.length ? (
        <>
          <SectionHeader title="Opens" />
          <Card>
            <Rows>
              {unlocks.map(pb => {
                const on = anchor && countsFrom(pb, anchor, allAnchors);
                const track = allTracks.find(t => t.playbookId === pb.id && t.anchorId === on?.id);
                const attached = !!track;
                return (
                  <ListRow
                    key={pb.id}
                    label={pb.title}
                    value={attached ? '✓ attached' : `${pb.steps.length} steps`}
                    onPress={() =>
                      navigation.navigate('Playbook', {
                        playbookId: pb.id,
                        trackId: track?.id,
                      })
                    }
                  />
                );
              })}
            </Rows>
          </Card>
        </>
      ) : null}

      {steps.length || !past ? (
        <SectionHeader title={chapter?.isCurrent ? 'Active steps' : 'Steps'} count={steps.length} />
      ) : null}
      {steps.length ? (
        <Card>
          <Rows inset={space.lg + 18 + space.sm}>
            {steps.slice(0, 30).map(s => (
              <StepRow
                key={s.instanceId}
                step={s}
                now={now}
                move={moves[s.instanceId]}
                subtitle={s.playbook.title}
                onPress={() => navigation.navigate('Step', { instanceId: s.instanceId })}
              />
            ))}
          </Rows>
        </Card>
      ) : !past ? (
        <Text style={[type.body, styles.empty, { color: p.dim }]}>Nothing to start in this stretch.</Text>
      ) : null}

      {anchor ? (
        <>
          <SectionHeader title="Notes" />
          {anchor.note ? (
            <Card>
              <Pressable
                onPress={() => navigation.navigate('AnchorEdit', { anchorId: anchor.id })}
                style={styles.note}
                accessibilityRole="button"
                accessibilityHint="Edits the notes">
                <Text style={[type.body, { color: p.text }]}>{anchor.note}</Text>
              </Pressable>
            </Card>
          ) : (
            <Button
              title="+ Add notes"
              kind="plain"
              style={styles.write}
              onPress={() => navigation.navigate('AnchorEdit', { anchorId: anchor.id })}
            />
          )}
        </>
      ) : null}

      {nextNode ? (
        <>
          <SectionHeader title="Ends with" />
          <Card>
            <ListRow
              label={`○ ${nextNode.label}`}
              value={formatPrecise(nextNode.date, nextNode.precision)}
              onPress={() => navigation.push('Chapter', { eventId: nextNode.id })}
            />
          </Card>
        </>
      ) : null}

      {anchor ? (
        <View style={styles.edit}>
          <Button
            title="Edit this event"
            onPress={() => navigation.navigate('AnchorEdit', { anchorId: anchor.id })}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  head: { padding: space.lg, gap: space.sm, marginTop: space.sm },
  empty: { paddingHorizontal: space.lg },
  edit: { padding: space.lg, paddingTop: space.xl },
  note: { padding: space.lg },
  write: { alignSelf: 'flex-start', marginLeft: space.lg, marginTop: space.sm },
});
