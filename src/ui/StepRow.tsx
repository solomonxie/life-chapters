import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ScheduledStep } from '../domain/types';
import { DatePair } from './DatePair';
import { space, type } from './theme';
import { usePalette } from './usePalette';

export type Delta = 'earlier' | 'later' | null;

/** The app's most reused row: Radar groups, phase detail, track detail. */
export function StepRow({
  step,
  playbook,
  delta = null,
  onPress,
}: {
  step: ScheduledStep;
  playbook?: string;
  delta?: Delta;
  onPress?: () => void;
}) {
  const palette = usePalette();
  const blocked = step.blockedBy.length > 0 && step.status === 'pending';
  const mark =
    step.status === 'done' ? '✓' : step.atRisk || blocked ? '⚠' : ' ';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${step.title}, ${step.status}`}
      style={styles.row}>
      <Text style={[type.body, { color: markColor(step, palette) }]}>
        {mark}
      </Text>
      <View style={styles.body}>
        <Text
          numberOfLines={1}
          style={[
            type.label,
            {
              color: step.status === 'done' ? palette.dim : palette.text,
              textDecorationLine:
                step.status === 'skipped' ? 'line-through' : 'none',
            },
          ]}>
          {step.title}
        </Text>
        {playbook ? (
          <Text style={[type.caption, { color: palette.dim }]}>{playbook}</Text>
        ) : null}
      </View>
      <View style={styles.trailing}>
        <DatePair date={blocked ? null : step.startBy} />
        {delta ? (
          <Text style={[type.caption, { color: palette.dim }]}>
            {delta === 'earlier' ? '▲' : '▼'}
          </Text>
        ) : null}
        <Text style={[type.body, { color: palette.dim }]}>›</Text>
      </View>
    </Pressable>
  );
}

const markColor = (
  step: ScheduledStep,
  palette: ReturnType<typeof usePalette>,
) => {
  if (step.status === 'done') return palette.done;
  if (step.atRisk) return palette.late;
  return palette.dim;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
  },
  body: { flex: 1, gap: 2 },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
});
