import React, { useLayoutEffect, useState } from 'react';
import { ActionSheetIOS, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { diffDays } from '../domain/dates';
import { formatDate, formatDuration, formatShort, formatSpan } from '../domain/format';
import { docId } from '../domain/plan';
import type { Routes } from '../navigation/routes';
import { haptic } from '../platform';
import { actions, useStore } from '../state/store';
import {
  AppliesIf,
  Button,
  Card,
  CheckRow,
  DatePair,
  DateWheel,
  Disclaimer,
  InfoPopover,
  Rows,
  SectionHeader,
  StepRow,
  space,
  type,
  usePalette,
} from '../ui';
import { pickSnooze } from './snooze';

type Panel = 'doneOn' | 'due' | null;

export function StepScreen({ route, navigation }: NativeStackScreenProps<Routes, 'Step'>) {
  const p = usePalette();
  const { instanceId } = route.params;
  const view = useStore(s => s.view);
  const instances = useStore(s => s.plan.instances);
  const moves = useStore(s => s.moves);
  const now = useStore(s => s.now);
  const step = view.steps.find(s => s.instanceId === instanceId);
  const instance = instances.find(i => i.id === instanceId);
  const [panel, setPanel] = useState<Panel>(null);
  const [pickDate, setPickDate] = useState(now);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () =>
        step ? (
          <Pressable onPress={menu} hitSlop={12} accessibilityRole="button" accessibilityLabel="More">
            <Text maxFontSizeMultiplier={1.3} style={[type.headline, { color: p.accent }]}>⋯</Text>
          </Pressable>
        ) : null,
    });
  });

  if (!step || !instance) {
    return (
      <View style={[styles.gone, { backgroundColor: p.bg }]}>
        <Text style={[type.body, { color: p.dim }]}>This step is no longer in your plan.</Text>
      </View>
    );
  }

  const trackSteps = view.steps.filter(s => s.trackId === step.trackId);
  const blocks = trackSteps.filter(s => s.template.dependsOn.includes(step.stepId));
  const waitsFor = trackSteps.filter(s => step.template.dependsOn.includes(s.stepId));
  const clash = view.clashes.find(c => c.trackId === step.trackId && c.source.stepId === step.stepId);
  const open = step.status === 'pending' || step.status === 'snoozed';
  const blocked = open && step.blockedByLate.length > 0;
  const blocker = trackSteps.find(s => s.stepId === step.blockedByLate[0]);
  const expired = step.status === 'done' && step.expiresOn && step.expiresOn < now;
  const firstOpenConsumer = blocks.find(s => s.status === 'pending' || s.status === 'snoozed');
  const docsDone = step.template.documents.filter(d => instance.checkedDocuments.includes(d)).length;
  const prepDone = step.template.prepare.filter(x => instance.checkedPrepare.includes(x)).length;

  function menu() {
    const opts = [
      step!.status === 'skipped' ? 'Restore' : 'Not for me',
      instance?.note ? 'Edit note' : 'Add a note',
      'Move due date…',
      'View in playbook',
      'Cancel',
    ];
    ActionSheetIOS.showActionSheetWithOptions(
      { options: opts, cancelButtonIndex: 4, destructiveButtonIndex: step!.status === 'skipped' ? undefined : 0 },
      i => {
        if (i === 0) step!.status === 'skipped' ? actions.restore(instanceId) : actions.skip(instanceId);
        if (i === 1) editNote();
        if (i === 2) {
          setPickDate(step!.dueBy);
          setPanel('due');
        }
        if (i === 3) navigation.navigate('Playbook', { playbookId: step!.playbook.id, trackId: step!.trackId });
      },
    );
  }

  const editNote = () =>
    Alert.prompt(
      'Note',
      undefined,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: (text?: string) => actions.setNote(instanceId, text ?? '') },
      ],
      'plain-text',
      instance.note ?? '',
    );

  const markDone = () => {
    haptic('success');
    actions.markDone(instanceId);
  };

  const redo = () => {
    if (!firstOpenConsumer) {
      actions.reopen(instanceId);
      return;
    }
    const id = actions.planRedo(step.trackId, step.stepId, firstOpenConsumer.stepId);
    if (id) navigation.push('Step', { instanceId: id });
  };

  const tryDocDone = (name: string) => {
    const checking = !instance.checkedDocuments.includes(name);
    actions.toggleDocument(instanceId, name);
    haptic('selection');
    if (checking && open && docsDone + 1 === step.template.documents.length) {
      Alert.alert('Every document is in.', `Mark "${step.title}" done?`, [
        { text: 'Not yet', style: 'cancel' },
        { text: 'Mark done', onPress: markDone },
      ]);
    }
  };

  const validInfo = step.template.validForDays
    ? `${step.title} is usually accepted for ${formatDuration(step.template.validForDays)} from issue.${
        step.earliestStart
          ? ` Starting before ${formatDate(step.earliestStart)} risks it expiring before ${formatShort(
              step.dueBy,
            )} — paying for it twice.`
          : ''
      }`
    : '';

  return (
    <ScrollView
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <View style={styles.head}>
        <Text style={[type.title, { color: p.text }]} accessibilityRole="header">
          {step.title}
        </Text>
        <Text style={[type.caption, { color: p.dim }]}>
          {step.playbook.title} · step {step.index} of {step.total}
        </Text>
        <AppliesIf ages={step.template.ages} conditions={step.template.conditions} />
        <Disclaimer playbook={step.playbook} now={now} />
      </View>

      <Card style={styles.dates}>
        {step.status === 'done' ? (
          <>
            <View style={styles.line}>
              <Pressable
                style={styles.flex}
                onPress={() => {
                  setPickDate(step.startBy);
                  setPanel(panel === 'doneOn' ? null : 'doneOn');
                }}
                accessibilityRole="button"
                accessibilityLabel={`Done on ${formatDate(step.startBy)}. Change the date`}>
                <Text style={[type.label, { color: p.done }]}>
                  ✓ Done · {formatDate(step.startBy)} <Text style={[type.caption, { color: p.accent }]}>Change ›</Text>
                </Text>
              </Pressable>
              <Button title="Undo" kind="plain" onPress={() => actions.reopen(instanceId)} />
            </View>
            {step.expiresOn ? (
              <Text style={[type.caption, { color: expired ? p.late : p.dim }]}>
                {expired ? `⚠ Expired ${formatDate(step.expiresOn)}.` : `valid until ${formatDate(step.expiresOn)}`}
              </Text>
            ) : null}
          </>
        ) : step.status === 'skipped' ? (
          <>
            <View style={styles.line}>
              <Text style={[type.label, styles.flex, { color: p.dim }]}>Not for me</Text>
              <Button title="Restore" kind="plain" onPress={() => actions.restore(instanceId)} />
            </View>
            {blocks.length ? (
              <Text style={[type.caption, { color: p.dim }]}>
                {blocks.length} later step{blocks.length === 1 ? ' no longer waits' : 's no longer wait'} for it.
              </Text>
            ) : null}
          </>
        ) : (
          <>
            <DateLine label="start by">
              {blocked ? (
                <Text style={[type.caption, { color: p.dim }]}>— blocked</Text>
              ) : (
                <DatePair date={step.startBy} now={now} lateRed={false} />
              )}
            </DateLine>
            <Pressable
              onPress={() => {
                setPickDate(step.dueBy);
                setPanel(panel === 'due' ? null : 'due');
              }}
              accessibilityRole="button"
              accessibilityLabel={`Due by ${formatDate(step.dueBy)}, ${instance.dueOverride ? 'moved by you' : 'suggested'}. Change`}>
              <DateLine label="due by">
                <View style={styles.line}>
                  <Text style={[type.caption, styles.flex, { color: p.text }]}>
                    {formatDate(step.dueBy)}
                    <Text style={{ color: p.dim }}>{instance.dueOverride ? '  · moved by you' : '  · suggested'}</Text>
                  </Text>
                  <Text style={[type.caption, { color: p.accent }]}>Change ›</Text>
                </View>
              </DateLine>
            </Pressable>
            {step.snoozedUntil && step.snoozedUntil > now ? (
              <View style={styles.line}>
                <Text style={[type.caption, styles.flex, { color: p.dim }]}>
                  snoozed {formatSpan(diffDays(now, step.snoozedUntil))} · until {formatShort(step.snoozedUntil)}
                </Text>
                <Button title="Clear" kind="plain" onPress={() => actions.clearSnooze(instanceId)} />
              </View>
            ) : null}
          </>
        )}
        {step.template.validForDays ? (
          <DateLine label="valid">
            <View style={styles.line}>
              <Text style={[type.caption, styles.flex, { color: p.text }]}>
                {formatDuration(step.template.validForDays)} from issue
              </Text>
              <InfoPopover title="Why not earlier" text={validInfo} />
            </View>
          </DateLine>
        ) : null}
        {step.atRisk && open ? (
          <Text style={[type.caption, { color: p.warn }]}>
            ⚠ A step before it runs late, so this starts after it ideally should.
          </Text>
        ) : null}
      </Card>

      {panel ? (
        <Card style={styles.panel}>
          <Text style={[type.label, styles.pad, { color: p.text }]}>
            {panel === 'doneOn' ? 'Done on' : 'Move the due date to'}
          </Text>
          <DateWheel
            value={pickDate}
            onChange={setPickDate}
            minYear={Number(now.slice(0, 4)) - 30}
            maxYear={Number(now.slice(0, 4)) + (panel === 'doneOn' ? 0 : 30)}
          />
          <View style={styles.actionsInner}>
            <Button title="Cancel" kind="plain" onPress={() => setPanel(null)} />
            {panel === 'due' && instance.dueOverride ? (
              <Button
                title="Reset"
                kind="plain"
                onPress={() => {
                  actions.moveDue(instanceId, undefined);
                  setPanel(null);
                }}
              />
            ) : null}
            <Button
              title={panel === 'doneOn' ? (step.status === 'done' ? 'Save' : 'Mark done') : 'Move it'}
              kind="primary"
              disabled={panel === 'doneOn' && pickDate > now}
              onPress={() => {
                if (panel === 'doneOn') {
                  haptic('success');
                  actions.markDone(instanceId, pickDate);
                } else actions.moveDue(instanceId, pickDate);
                setPanel(null);
              }}
            />
          </View>
        </Card>
      ) : null}

      {clash && !expired ? (
        <Card style={[styles.alert, { backgroundColor: p.lateSoft }]}>
          <Pressable
            onPress={() =>
              navigation.push('Step', {
                instanceId: trackSteps.find(s => s.stepId === clash.consumer.stepId)!.instanceId,
              })
            }
            accessibilityRole="button"
            accessibilityLabel={`Warning: expires ${formatDate(step.expiresOn!)}, ${clash.gapDays} days before ${clash.consumer.title} needs it. Open that step`}>
            <Text style={[type.body, { color: p.text }]}>
              ⚠ Expires {formatDate(step.expiresOn!)} — {clash.gapDays} days before {clash.consumer.title} needs it. ›
            </Text>
          </Pressable>
          <Button title="Plan a redo" onPress={redo} />
        </Card>
      ) : null}
      {expired ? (
        <Card style={[styles.alert, { backgroundColor: p.lateSoft }]}>
          <Text style={[type.body, { color: p.text }]}>
            {firstOpenConsumer ? `${firstOpenConsumer.title} still needs it.` : 'Redo this step if it is needed again.'}
          </Text>
          <Button title="Redo" kind="primary" onPress={redo} />
        </Card>
      ) : null}

      {open ? (
        <View style={styles.actions}>
          <Button
            title="Mark done"
            kind="primary"
            style={styles.flex}
            onPress={markDone}
            onLongPress={() => {
              setPickDate(now);
              setPanel(x => (x === 'doneOn' ? null : 'doneOn'));
            }}
            accessibilityHint="Long-press to pick the day it was done"
          />
          <Button title="Snooze…" onPress={() => pickSnooze(instanceId)} />
        </View>
      ) : null}
      {blocked && blocker ? (
        <Text style={[type.caption, styles.pad, { color: p.dim }]}>
          ← waiting on "{blocker.title}"
        </Text>
      ) : null}
      {open && panel === null ? (
        <Text style={[type.caption, styles.pad, { color: p.faint }]}>
          Long-press Mark done if it happened on an earlier day.
        </Text>
      ) : null}


      {step.template.documents.length ? (
        <>
          <SectionHeader title="Documents to obtain" right={<Count n={docsDone} of={step.template.documents.length} />} />
          <Card>
            <Rows inset={space.lg + 22 + space.md}>
              {step.template.documents.map(d => (
                <CheckRow
                  key={d}
                  label={d}
                  checked={instance.checkedDocuments.includes(d)}
                  onToggle={() => tryDocDone(d)}
                  onOpen={() => navigation.navigate('Document', { documentId: docId(d) })}
                />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      {step.template.prepare.length ? (
        <>
          <SectionHeader
            title="Prepare"
            right={<Count n={prepDone} of={step.template.prepare.length} />}
            info="Prep never holds up a later step — it's here so nothing is forgotten, not to gate anything."
          />
          <Card>
            <Rows inset={space.lg + 22 + space.md}>
              {step.template.prepare.map(x => (
                <CheckRow
                  key={x}
                  label={x}
                  checked={instance.checkedPrepare.includes(x)}
                  onToggle={() => {
                    haptic('selection');
                    actions.togglePrepare(instanceId, x);
                  }}
                />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      <SectionHeader
        title="How to"
        info="How this paperwork usually goes, written by the playbook's author. Rules change — check the official source before relying on it."
      />
      <Card style={styles.howto}>
        {step.template.howTo ? (
          step.template.howTo.split('\n').map((line, i) => (
            <Text key={i} style={[type.body, { color: p.text }]}>
              {line}
            </Text>
          ))
        ) : (
          <Text style={[type.body, { color: p.dim }]}>Nothing written yet.</Text>
        )}
        {instance.note ? (
          <Pressable onPress={editNote} accessibilityRole="button" style={[styles.note, { borderColor: p.hairline }]}>
            <Text style={[type.caption, { color: p.dim }]}>YOUR NOTE</Text>
            <Text style={[type.body, { color: p.text }]}>{instance.note}</Text>
          </Pressable>
        ) : (
          <Button title="Add a note" kind="plain" onPress={editNote} style={styles.left} />
        )}
      </Card>

      {blocks.length ? (
        <>
          <SectionHeader title="Blocks" />
          <Card>
            <Rows inset={space.lg + 18 + space.sm}>
              {blocks.map(s => (
                <StepRow
                  key={s.instanceId}
                  step={s}
                  now={now}
                  move={moves[s.instanceId]}
                  onPress={() => navigation.push('Step', { instanceId: s.instanceId })}
                />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}

      {waitsFor.length ? (
        <>
          <SectionHeader title="Waits for" />
          <Card>
            <Rows inset={space.lg + 18 + space.sm}>
              {waitsFor.map(s => (
                <StepRow
                  key={s.instanceId}
                  step={s}
                  now={now}
                  move={moves[s.instanceId]}
                  onPress={() => navigation.push('Step', { instanceId: s.instanceId })}
                />
              ))}
            </Rows>
          </Card>
        </>
      ) : null}
    </ScrollView>
  );
}

function DateLine({ label, children }: { label: string; children: React.ReactNode }) {
  const p = usePalette();
  return (
    <View style={styles.dateLine}>
      <Text style={[type.caption, styles.dateLabel, { color: p.dim }]}>{label}</Text>
      <View style={styles.flex}>{children}</View>
    </View>
  );
}

function Count({ n, of }: { n: number; of: number }) {
  const p = usePalette();
  return (
    <Text style={[type.caption, { color: n === of ? p.done : p.dim }]}>
      {n}/{of}
      {n === of ? ' ✓' : ''}
    </Text>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  gone: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl },
  head: { paddingHorizontal: space.lg, paddingTop: space.sm, paddingBottom: space.md, gap: space.xs },
  dates: { padding: space.lg, gap: space.sm },
  dateLine: { flexDirection: 'row', alignItems: 'center', gap: space.md, minHeight: 24 },
  dateLabel: { width: 64 },
  line: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  flex: { flex: 1 },
  alert: { padding: space.lg, gap: space.md, marginTop: space.md },
  actions: { flexDirection: 'row', gap: space.md, paddingHorizontal: space.lg, paddingTop: space.lg },
  actionsInner: { flexDirection: 'row', justifyContent: 'flex-end', gap: space.md, padding: space.lg },
  pad: { paddingHorizontal: space.lg, paddingTop: space.sm },
  panel: { marginTop: space.md, paddingTop: space.md },
  howto: { padding: space.lg, gap: space.sm },
  note: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: space.sm, marginTop: space.xs, gap: 2 },
  left: { alignSelf: 'flex-start', marginTop: space.xs },
});
