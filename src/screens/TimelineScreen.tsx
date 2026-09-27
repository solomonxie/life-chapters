import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { diffDays } from '../domain/dates';
import { formatMonth } from '../domain/format';
import { ageOn, lateSteps, lifePhases, openSteps, timelineNodes } from '../domain/plan';
import { goTab, useNav } from '../navigation/routes';
import { useStore } from '../state/store';
import { Button, Card, EmptyState, TimelineStem, space, type, usePalette } from '../ui';

export function TimelineScreen() {
  const p = usePalette();
  const nav = useNav();
  const plan = useStore(s => s.plan);
  const view = useStore(s => s.view);
  const now = useStore(s => s.now);

  const nodes = useMemo(
    () => timelineNodes(plan.anchors, plan.tracks, view.steps, now),
    [plan.anchors, plan.tracks, view.steps, now],
  );
  const phase = useMemo(() => lifePhases(nodes, now).find(x => x.isCurrent), [nodes, now]);
  const age = ageOn(plan.anchors, now);
  const open = openSteps(view.steps);
  const running = open.filter(s => s.startBy <= now).length;
  const next = open
    .filter(s => s.startBy > now)
    .sort((a, b) => (a.startBy < b.startBy ? -1 : 1))[0];
  const late = lateSteps(view.steps, now).length;

  if (plan.anchors.length === 0) {
    return (
      <View style={[styles.fill, { backgroundColor: p.bg }]}>
        <EmptyState
          title="Life Planner"
          body="Two dates and it starts drawing."
          action="When were you born?"
          onAction={() => nav.navigate('AnchorEdit', { kind: 'born' })}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      {phase ? (
        <>
          <Text style={[type.heading, styles.now, { color: p.dim }]}>
            NOW{age !== null ? ` · AGE ${age}` : ''}
          </Text>
          <Pressable
            onPress={() => nav.navigate('Phase', { eventId: phase.eventId })}
            accessibilityRole="button"
            accessibilityLabel={`Current phase: ${phase.label}`}>
            <Card style={styles.nowCard}>
              <Text style={[type.headline, { color: p.text }]} numberOfLines={1}>
                {phase.label}
              </Text>
              <PhaseBar start={phase.start} end={phase.end} now={now} />
              <View style={styles.nowFoot}>
                <Text style={[type.caption, styles.fill, { color: p.dim }]}>
                  {stepsLine(running, next ? diffDays(now, next.startBy) : null, plan.tracks.length)}
                </Text>
                <Text style={{ color: p.faint }}>›</Text>
              </View>
            </Card>
          </Pressable>
        </>
      ) : null}

      <View style={styles.stem}>
        <TimelineStem
          nodes={nodes}
          now={now}
          lateCount={late}
          onPressLate={() => goTab(nav, 'RadarTab')}
          onPressNode={n =>
            n.source === 'anchor' && n.date <= now
              ? nav.navigate('AnchorEdit', { anchorId: n.id })
              : nav.navigate('Phase', { eventId: n.id })
          }
          onPressBadge={n => goTab(nav, 'RadarTab', 'Radar', { anchorId: n.id })}
        />
      </View>

      {plan.tracks.length === 0 ? (
        <Card style={styles.noTrack}>
          <Text style={[type.body, { color: p.dim }]}>Dates, but no plan yet.</Text>
          <Button title="Add a track" onPress={() => goTab(nav, 'TracksTab', 'Library')} />
        </Card>
      ) : null}

      <Button
        title="+ Add a date"
        kind="plain"
        onPress={() => nav.navigate('AnchorEdit')}
        style={styles.add}
      />
    </ScrollView>
  );
}

const stepsLine = (running: number, nextIn: number | null, tracks: number) => {
  if (tracks === 0) return 'No tracks yet';
  const parts = [`${running} step${running === 1 ? '' : 's'} running`];
  if (nextIn !== null) parts.push(`next starts in ${nextIn}d`);
  return parts.join(' · ');
};

/** Sep 2024 ───●──── Sep 2029, ● at today. */
export function PhaseBar({ start, end, now }: { start: string; end: string | null; now: string }) {
  const p = usePalette();
  const ratio = end ? Math.min(1, Math.max(0, diffDays(start, now) / diffDays(start, end))) : 0.5;
  return (
    <View style={styles.bar}>
      <Text style={[type.caption, { color: p.dim }]}>{formatMonth(start)}</Text>
      <View style={styles.track}>
        <View style={[styles.line, { backgroundColor: p.hairline }]} />
        <View style={[styles.line, styles.lineDone, { width: `${ratio * 100}%`, backgroundColor: p.accent }]} />
        <View style={[styles.dot, { left: `${ratio * 100}%`, backgroundColor: p.accent, borderColor: p.card }]} />
      </View>
      <Text style={[type.caption, { color: p.dim }]}>{end ? formatMonth(end) : '…'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { paddingBottom: 120 },
  now: { paddingHorizontal: space.lg, paddingTop: space.sm, paddingBottom: space.sm },
  nowCard: { padding: space.lg, gap: space.md },
  nowFoot: { flexDirection: 'row', alignItems: 'center' },
  stem: { paddingTop: space.lg },
  noTrack: { padding: space.lg, gap: space.md, marginTop: space.md },
  add: { alignSelf: 'flex-start', marginLeft: space.lg + 44 + space.sm, marginTop: space.md },
  bar: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  track: { flex: 1, height: 14, justifyContent: 'center' },
  line: { position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 1 },
  lineDone: { right: undefined },
  dot: { position: 'absolute', width: 14, height: 14, borderRadius: 7, marginLeft: -7, borderWidth: 2 },
});
