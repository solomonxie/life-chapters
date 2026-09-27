import React, { useLayoutEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { diffDays } from '../domain/dates';
import { formatPrecise } from '../domain/format';
import { lifeChapters, openSteps, chapterSteps, timelineNodes } from '../domain/plan';
import { storiesByChapter, storiesIn } from '../domain/journal';
import type { Routes } from '../navigation/routes';
import { StoryRow } from './JournalScreen';
import { useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, StepRow, space, type, usePalette } from '../ui';
import { ChapterBar } from './TimelineScreen';

export function ChapterScreen({ route, navigation }: NativeStackScreenProps<Routes, 'Chapter'>) {
  const p = usePalette();
  const { eventId } = route.params;
  const plan = useStore(s => s.plan);
  const view = useStore(s => s.view);
  const playbooks = useStore(s => s.playbooks);
  const moves = useStore(s => s.moves);
  const now = useStore(s => s.now);

  const nodes = useMemo(
    () => timelineNodes(plan.anchors, plan.tracks, view.steps, now),
    [plan.anchors, plan.tracks, view.steps, now],
  );
  const node = nodes.find(n => n.id === eventId);
  const chapter = lifeChapters(nodes, now).find(x => x.eventId === eventId);
  const anchor = plan.anchors.find(a => a.id === eventId);
  const nextNode = node ? nodes.find(n => n.date > node.date) : undefined;

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
  const stories = chapter
    ? storiesByChapter(storiesIn(chapter, plan.entries), [chapter]).flatMap(g => g.entries)
    : [];
  const unlocks = anchor ? playbooks.filter(pb => pb.anchorKind === anchor.kind) : [];
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
        </Text>
      </Card>

      {unlocks.length ? (
        <>
          <SectionHeader title="Opens" />
          <Card>
            <Rows>
              {unlocks.map(pb => {
                const attached = plan.tracks.some(
                  t => t.playbookId === pb.id && t.anchorId === eventId,
                );
                return (
                  <ListRow
                    key={pb.id}
                    label={pb.title}
                    value={attached ? '✓ attached' : `${pb.steps.length} steps`}
                    onPress={() =>
                      navigation.navigate('Playbook', {
                        playbookId: pb.id,
                        trackId: plan.tracks.find(t => t.playbookId === pb.id && t.anchorId === eventId)?.id,
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

      {chapter ? (
        <>
          <SectionHeader title="Stories" count={stories.length} />
          {stories.length ? (
            <Card>
              <Rows>
                {stories.map(e => (
                  <StoryRow
                    key={e.id}
                    entry={e}
                    about={plan.anchors.find(a => a.id === e.anchorId)}
                    onPress={() => navigation.navigate('Entry', { entryId: e.id })}
                  />
                ))}
              </Rows>
            </Card>
          ) : null}
          <Button
            title="+ Write a story"
            kind="plain"
            style={styles.write}
            onPress={() =>
              navigation.navigate('Entry', {
                date: chapter.isCurrent ? now : chapter.start,
                anchorId: anchor?.id,
              })
            }
          />
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
            title="Edit this date"
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
  write: { alignSelf: 'flex-start', marginLeft: space.lg, marginTop: space.sm },
});
