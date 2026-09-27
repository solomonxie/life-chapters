import React, { useLayoutEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { diffDays } from '../domain/dates';
import { formatPrecise } from '../domain/format';
import { lifePhases, openSteps, phaseSteps, timelineNodes } from '../domain/plan';
import type { Routes } from '../navigation/routes';
import { useStore } from '../state/store';
import { Button, Card, ListRow, Rows, SectionHeader, StepRow, space, type, usePalette } from '../ui';
import { PhaseBar } from './TimelineScreen';

export function PhaseScreen({ route, navigation }: NativeStackScreenProps<Routes, 'Phase'>) {
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
  const phase = lifePhases(nodes, now).find(x => x.eventId === eventId);
  const anchor = plan.anchors.find(a => a.id === eventId);
  const nextNode = node ? nodes.find(n => n.date > node.date) : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({ title: phase?.label ?? node?.label ?? '' });
  }, [navigation, phase, node]);

  if (!node) return null;

  const trackIds = new Set(plan.tracks.filter(t => t.anchorId === eventId).map(t => t.id));
  const steps = openSteps(
    view.steps.filter(
      s => trackIds.has(s.trackId) || (phase ? phaseSteps(phase, [s]).length > 0 : false),
    ),
  ).sort((a, b) => (a.startBy < b.startBy ? -1 : 1));
  const unlocks = anchor ? playbooks.filter(pb => pb.anchorKind === anchor.kind) : [];
  const years = phase?.end ? Math.max(1, Math.round(diffDays(phase.start, phase.end) / 365.25)) : null;
  const yearN = phase ? Math.floor(diffDays(phase.start, now) / 365.25) + 1 : null;

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <Card style={styles.head}>
        {phase ? <PhaseBar start={phase.start} end={phase.end} now={now} /> : null}
        <Text style={[type.caption, { color: p.dim }]}>
          {phase?.isCurrent && years && yearN
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

      <SectionHeader title={phase?.isCurrent ? 'Active steps' : 'Steps'} count={steps.length} />
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
      ) : (
        <Text style={[type.body, styles.empty, { color: p.dim }]}>Nothing to start in this stretch.</Text>
      )}

      {nextNode ? (
        <>
          <SectionHeader title="Ends with" />
          <Card>
            <ListRow
              label={`○ ${nextNode.label}`}
              value={formatPrecise(nextNode.date, nextNode.precision)}
              onPress={() => navigation.push('Phase', { eventId: nextNode.id })}
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
});
