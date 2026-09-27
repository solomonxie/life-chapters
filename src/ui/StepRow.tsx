import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDate, formatMonth, formatRelative, formatShort, formatSpan } from '../domain/format';
import { diffDays } from '../domain/dates';
import type { Move } from '../domain/radar';
import type { CivilDate, ScheduledStep } from '../domain/types';
import { InfoPopover } from './InfoPopover';
import { space, type } from './theme';
import { usePalette } from './usePalette';

/**
 * The app's most reused row: Radar groups, chapter detail, track detail. One
 * trailing value per state — date, "5 days late", "blocked", "not for me".
 */
export function StepRow({
  step,
  now,
  subtitle,
  move,
  detailed = false,
  lateRed = false,
  onPress,
}: {
  step: ScheduledStep & { completedOn?: CivilDate };
  now: CivilDate;
  subtitle?: string;
  move?: Move;
  /** Two-line form for ACT NOW: "start by Sep 20 · 5 days late". */
  detailed?: boolean;
  /** Red is reserved for ACT NOW; elsewhere late reads in the normal dim. */
  lateRed?: boolean;
  onPress?: () => void;
}) {
  const p = usePalette();
  const open = step.status === 'pending' || step.status === 'snoozed';
  const blocked = open && step.blockedByLate.length > 0;
  const late = open && !blocked && !step.snoozedUntil && step.startBy < now;
  const mark = step.status === 'done' ? '✓' : late || step.atRisk ? '⚠' : '';
  const markColor = step.status === 'done' ? p.done : lateRed ? p.late : p.warn;

  let trailing: string;
  if (step.status === 'done') trailing = formatShort(step.startBy);
  else if (step.status === 'skipped') trailing = 'not for me';
  else if (step.snoozedUntil && step.snoozedUntil > now)
    trailing = `snoozed ${formatSpan(diffDays(now, step.snoozedUntil))}`;
  else if (blocked) trailing = 'blocked';
  else if (late) trailing = formatRelative(step.startBy, now);
  else trailing = sameYear(step.startBy, now) ? formatShort(step.startBy) : formatMonth(step.startBy);

  const a11y = [
    step.title,
    step.status === 'done' ? `done ${formatDate(step.startBy)}` : trailing,
    move ? `moved ${move.to < move.from ? 'earlier' : 'later'}, was ${formatDate(move.from)}` : '',
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={a11y}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: p.hairline }]}>
      <Text style={[type.body, styles.mark, { color: markColor }]}>{mark}</Text>
      <View style={styles.body}>
        <Text
          numberOfLines={detailed ? 2 : 1}
          style={[
            type.label,
            {
              color: step.status === 'done' || step.status === 'skipped' ? p.dim : p.text,
              textDecorationLine: step.status === 'skipped' ? 'line-through' : 'none',
            },
          ]}>
          {step.title}
        </Text>
        {detailed && open ? (
          <Text style={[type.caption, { color: late && lateRed ? p.late : p.dim }]}>
            {blocked
              ? 'blocked · waiting on a late step'
              : `start by ${formatShort(step.startBy)} · ${formatRelative(step.startBy, now)}`}
          </Text>
        ) : null}
        {subtitle ? (
          <Text numberOfLines={1} style={[type.caption, { color: p.dim }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {!detailed || !open ? (
        <Text
          style={[
            type.caption,
            styles.trailing,
            { color: late && lateRed ? p.late : p.dim },
          ]}>
          {trailing}
        </Text>
      ) : null}
      {move ? (
        <InfoPopover
          label={`Moved ${move.to < move.from ? 'earlier' : 'later'}, why`}
          title={`Was ${formatDate(move.from)}`}
          text={`Now ${formatDate(move.to)}. Moved because: ${move.cause}.`}>
          <Text style={[type.caption, { color: p.accent }]}>
            {move.to < move.from ? '▲' : '▼'}
          </Text>
        </InfoPopover>
      ) : null}
      <Text style={[type.body, { color: p.faint }]}>›</Text>
    </Pressable>
  );
}

const sameYear = (a: CivilDate, b: CivilDate) => a.slice(0, 4) === b.slice(0, 4);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    minHeight: 48,
  },
  mark: { width: 18, textAlign: 'center' },
  body: { flex: 1, gap: 2 },
  trailing: { flexShrink: 0, maxWidth: 120, textAlign: 'right' },
});
