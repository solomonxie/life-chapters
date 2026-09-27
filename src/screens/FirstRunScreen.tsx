import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { resolve } from '../domain/dates';
import { kindById, kindLabel } from '../domain/kinds';
import { haptic } from '../platform';
import { actions, useStore } from '../state/store';
import { Button, Card, DateWheel, Rows, space, type, usePalette } from '../ui';

const BEHIND = ['graduated', 'first-job', 'migrated', 'married', 'child-born', 'home-bought'];

/** Three screens, no skip on the first, because one anchor draws nothing. */
export function FirstRunScreen() {
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const now = useStore(s => s.now);
  const playbooks = useStore(s => s.playbooks);
  const anchors = useStore(s => s.mine.anchors);
  const thisYear = Number(now.slice(0, 4));

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [born, setBorn] = useState('1990-06-15');
  const [kind, setKind] = useState<string | null>(null);
  const [when, setWhen] = useState(`${thisYear - 2}-01-15`);
  const [picked, setPicked] = useState<string | null>(null);
  const [trackDate, setTrackDate] = useState(now);

  const finish = () => actions.updateSettings({ firstRunDone: true });

  const next1 = () => {
    actions.saveAnchor({ kind: 'born', label: 'Born', date: born, precision: 'day' });
    haptic('light');
    setStep(2);
  };

  const add2 = () => {
    if (kind) {
      actions.saveAnchor({ kind, label: kindLabel(kind), date: when, precision: 'month' });
      haptic('light');
    }
    setStep(3);
  };

  const attach = (playbookId: string) => {
    const pb = playbooks.find(x => x.id === playbookId)!;
    const existing = anchors.find(a => a.kind === pb.anchorKind);
    if (existing) actions.attachTrack(pb.id, existing.id);
    else
      actions.saveAnchor(
        { kind: pb.anchorKind, label: kindLabel(pb.anchorKind), date: trackDate, precision: 'day' },
        [pb.id],
      );
    haptic('success');
    finish();
  };

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + space.xxl, paddingBottom: insets.bottom + space.xl }]}>
      <Text style={[type.caption, styles.center, { color: p.dim }]}>{step} of 3</Text>

      {step === 1 ? (
        <>
          <Text style={[type.title, styles.center, { color: p.text }]}>Life Chapters</Text>
          <Text style={[type.body, styles.center, { color: p.dim }]}>
            Two dates and it starts drawing.
          </Text>
          <Text style={[type.headline, styles.q, { color: p.text }]}>When were you born?</Text>
          <Card style={styles.card}>
            <DateWheel value={born} onChange={setBorn} minYear={1920} maxYear={thisYear} />
          </Card>
          <Button title="Next" kind="primary" onPress={next1} disabled={born > now} />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Text style={[type.title, styles.center, { color: p.text }]}>One more.</Text>
          <Text style={[type.headline, styles.q, { color: p.text }]}>
            Anything big already behind you?
          </Text>
          <Card>
            <Rows>
              {BEHIND.map(k => (
                <Pressable
                  key={k}
                  onPress={() => setKind(x => (x === k ? null : k))}
                  style={styles.option}
                  accessibilityRole="radio"
                  accessibilityLabel={kindLabel(k)}
                  accessibilityState={{ selected: kind === k }}>
                  <Text style={[styles.tick, { color: p.accent }]}>{kind === k ? '✓' : ''}</Text>
                  <Text style={[type.body, { color: p.text }]}>{kindLabel(k)}</Text>
                </Pressable>
              ))}
            </Rows>
          </Card>
          {kind ? (
            <>
              <Text style={[type.label, styles.q, { color: p.text }]}>When, roughly?</Text>
              <Card style={styles.card}>
                <DateWheel value={when} precision="month" onChange={setWhen} minYear={Number(born.slice(0, 4))} maxYear={thisYear} />
              </Card>
            </>
          ) : null}
          <View style={styles.row}>
            <Button title="Skip" style={styles.flex} onPress={() => setStep(3)} />
            <Button title="Add" kind="primary" style={styles.flex} disabled={!kind || resolve(when, 'month') > now} onPress={add2} />
          </View>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <Text style={[type.title, styles.center, { color: p.text }]}>Pick a plan</Text>
          <Text style={[type.body, styles.center, { color: p.dim }]}>
            A plan turns a date into dated steps. It's guidance, not advice.
          </Text>
          <Card>
            <Rows>
              {playbooks.map(pb => {
                const has = anchors.some(a => a.kind === pb.anchorKind);
                const open = picked === pb.id;
                return (
                  <View key={pb.id}>
                    <Pressable
                      onPress={() => (has ? attach(pb.id) : setPicked(open ? null : pb.id))}
                      style={styles.option}
                      accessibilityRole="button"
                      accessibilityLabel={`${pb.title}. ${pb.summary ?? ''}`}
                      accessibilityState={{ expanded: has ? undefined : open }}>
                      <View style={styles.flex}>
                        <Text style={[type.label, { color: p.text }]}>{pb.title}</Text>
                        <Text style={[type.caption, { color: p.dim }]}>{pb.summary}</Text>
                      </View>
                      <Text style={{ color: p.faint }}>{open ? '⌄' : '›'}</Text>
                    </Pressable>
                    {open ? (
                      <View style={styles.unfold}>
                        <Text style={[type.caption, styles.pad, { color: p.dim }]}>
                          {kindById(pb.anchorKind)?.label} — when?
                        </Text>
                        <DateWheel value={trackDate} onChange={setTrackDate} minYear={thisYear - 10} maxYear={thisYear + 15} />
                        <Button title="Attach" kind="primary" style={styles.attach} onPress={() => attach(pb.id)} />
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </Rows>
          </Card>
          <Button title="Later" kind="plain" onPress={finish} style={styles.later} />
        </>
      ) : null}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  content: { paddingHorizontal: space.lg, gap: space.md },
  center: { textAlign: 'center' },
  q: { marginTop: space.lg },
  card: { marginHorizontal: 0 },
  row: { flexDirection: 'row', gap: space.md, marginTop: space.md },
  flex: { flex: 1 },
  option: { flexDirection: 'row', alignItems: 'center', gap: space.sm, padding: space.lg, minHeight: 48 },
  tick: { width: 18 },
  unfold: { paddingBottom: space.md },
  pad: { paddingHorizontal: space.lg },
  attach: { marginHorizontal: space.lg },
  later: { alignSelf: 'center', marginTop: space.md },
});
