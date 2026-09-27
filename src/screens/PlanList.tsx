import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDate, formatMonth, formatRelative, formatShort } from '../domain/format';
import { documentViews, groupDocuments, type PlannedStep } from '../domain/plan';
import { provinceName } from '../domain/provinces';
import { isOpen } from '../domain/radar';
import type { Nav } from '../navigation/routes';
import { useStore } from '../state/store';
import { Card, ProgressBar, Rows, SectionHeader, space, type, usePalette } from '../ui';

function usePlans() {
  const plan = useStore(s => s.mine);
  const view = useStore(s => s.mine.view);
  const playbooks = useStore(s => s.playbooks);
  const plans = plan.tracks.map(t => {
    const steps = view.steps.filter(s => s.trackId === t.id);
    const counted = steps.filter(s => s.status !== 'skipped');
    const done = counted.filter(s => s.status === 'done').length;
    const next = steps.filter(isOpen).sort((a, b) => (a.startBy < b.startBy ? -1 : 1))[0];
    const anchor = plan.anchors.find(a => a.id === t.anchorId);
    const playbook = playbooks.find(x => x.id === t.playbookId);
    return { t, done, total: counted.length, next, anchor, playbook };
  });
  return {
    running: plans.filter(x => x.done < x.total || x.total === 0),
    finished: plans.filter(x => x.total > 0 && x.done === x.total),
    broken: view.broken,
  };
}

const open = (navigation: Nav, trackId: string, playbookId: string) =>
  navigation.navigate('Playbook', { playbookId, trackId });

export function RunningPlans({ navigation }: { navigation: Nav }) {
  const p = usePalette();
  const now = useStore(s => s.now);
  const province = useStore(s => s.mine.province);
  const { running } = usePlans();
  if (!running.length) return null;
  return (
    <>
      <SectionHeader title="Your plans" count={running.length} />
      <Card>
        <Rows>
          {running.map(x => (
            <Pressable
              key={x.t.id}
              onPress={() => open(navigation, x.t.id, x.t.playbookId)}
              style={({ pressed }) => [styles.plan, pressed && { backgroundColor: p.hairline }]}
              accessibilityRole="button"
              accessibilityLabel={`${x.playbook?.title}, ${x.done} of ${x.total} done`}>
              <View style={styles.flex}>
                <Text style={[type.label, { color: p.text }]} numberOfLines={1}>
                  {x.playbook?.title ?? 'Missing playbook'}
                  {x.anchor?.place && !x.playbook?.region?.includes(x.anchor.place)
                    ? ` · ${x.anchor.place}`
                    : ''}
                </Text>
                <View style={styles.progress}>
                  <View style={styles.flex}>
                    <ProgressBar done={x.done} total={x.total} />
                  </View>
                  <Text style={[type.caption, { color: p.dim }]}>{nextLabel(x.next, now)}</Text>
                </View>
                {x.playbook?.province && province && x.playbook.province !== province ? (
                  <Text style={[type.caption, { color: p.late }]}>
                    {provinceName(x.playbook.province)} rules · lives in {provinceName(province)}
                  </Text>
                ) : null}
              </View>
              <Text style={{ color: p.faint }}>›</Text>
            </Pressable>
          ))}
        </Rows>
      </Card>
    </>
  );
}

export function FinishedPlans({ navigation }: { navigation: Nav }) {
  const p = usePalette();
  const { finished, broken } = usePlans();
  return (
    <>
      {finished.length ? (
        <>
          <SectionHeader title="Done" count={finished.length} />
          <Card>
            <Rows>
              {finished.map(x => (
                <Pressable
                  key={x.t.id}
                  onPress={() => open(navigation, x.t.id, x.t.playbookId)}
                  style={styles.plan}
                  accessibilityRole="button"
                  accessibilityLabel={`${x.playbook?.title}, done`}>
                  <Text style={[type.label, styles.flex, { color: p.dim }]}>
                    <Text style={{ color: p.done }}>✓ </Text>
                    {x.playbook?.title}
                  </Text>
                  <Text style={[type.caption, { color: p.dim }]}>
                    {x.done}/{x.total}
                  </Text>
                  <Text style={{ color: p.faint }}>›</Text>
                </Pressable>
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      {broken.length ? (
        <>
          <SectionHeader title="Can't schedule" tone="late" count={broken.length} />
          <Card style={styles.broken}>
            {broken.map(b => (
              <Text key={b.trackId} style={[type.caption, { color: p.late }]}>
                {b.error}
              </Text>
            ))}
          </Card>
        </>
      ) : null}
    </>
  );
}

/** Documents run out on their own schedule, so they surface here rather than in a tab. */
export function ExpiringDocs({ navigation }: { navigation: Nav }) {
  const p = usePalette();
  const plan = useStore(s => s.mine);
  const view = useStore(s => s.mine.view);
  const now = useStore(s => s.now);
  const expiring = useMemo(
    () => groupDocuments(documentViews(plan.documents, view, plan.instances), now).expiring,
    [plan.documents, plan.instances, view, now],
  );
  if (!expiring.length) return null;
  return (
    <>
      <SectionHeader title="⚠ Expiring" tone="late" count={expiring.length} />
      <Card>
        <Rows>
          {expiring.map(d => (
            <Pressable
              key={d.id}
              onPress={() => navigation.navigate('Document', { documentId: d.id })}
              style={({ pressed }) => [styles.plan, pressed && { backgroundColor: p.hairline }]}
              accessibilityRole="button"
              accessibilityLabel={`${d.name}, ${d.expiresOn! < now ? 'expired' : 'expires'} ${formatDate(d.expiresOn!)}${
                d.clash ? `, needed by ${d.clash.consumer.title}` : ''
              }`}>
              <View style={styles.flex}>
                <Text style={[type.label, { color: p.text }]} numberOfLines={1}>
                  {d.name}
                </Text>
                <Text style={[type.caption, { color: d.clash ? p.late : p.dim }]}>
                  {d.expiresOn! < now ? 'expired' : 'expires'} {formatDate(d.expiresOn!)} ·{' '}
                  {formatRelative(d.expiresOn!, now).replace('late', 'ago')}
                  {d.clash ? ` · needed by ${d.clash.consumer.title}` : ''}
                </Text>
              </View>
              <Text style={{ color: p.faint }}>›</Text>
            </Pressable>
          ))}
        </Rows>
      </Card>
    </>
  );
}

const nextLabel = (next: PlannedStep | undefined, now: string) => {
  if (!next) return 'nothing next';
  return next.startBy.slice(0, 4) === now.slice(0, 4)
    ? `next ${formatShort(next.startBy)}`
    : `next ${formatMonth(next.startBy)}`;
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  plan: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    minHeight: 56,
  },
  progress: { flexDirection: 'row', alignItems: 'center', gap: space.md, marginTop: space.xs },
  broken: { padding: space.lg, gap: space.xs },
});
