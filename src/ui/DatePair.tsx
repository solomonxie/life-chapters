import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { diffDays, today } from '../domain/dates';
import type { CivilDate } from '../domain/types';
import { space, type } from './theme';
import { usePalette } from './usePalette';

const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

export function formatDate(date: CivilDate): string {
  const [y, m, d] = date.split('-');
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function formatRelative(date: CivilDate, now = today()): string {
  const days = diffDays(now, date);
  if (days === 0) return 'today';
  if (days < 0) return `${-days} days late`;
  if (days < 45) return `in ${days} days`;
  if (days < 365) return `in ${Math.round(days / 30)} months`;
  return `in ${Math.round(days / 365)} years`;
}

/** Absolute and relative together — neither alone does the job. */
export function DatePair({
  date,
  now,
}: {
  date: CivilDate | null;
  now?: CivilDate;
}) {
  const palette = usePalette();
  if (!date) {
    return <Text style={[type.caption, { color: palette.dim }]}>— · blocked</Text>;
  }
  const relative = formatRelative(date, now);
  const late = relative.endsWith('late');
  return (
    <View style={styles.row}>
      <Text style={[type.caption, { color: palette.text }]}>
        {formatDate(date)}
      </Text>
      <Text style={[type.caption, { color: palette.dim }]}> · </Text>
      <Text style={[type.caption, { color: late ? palette.late : palette.dim }]}>
        {relative}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.xs / 2 },
});
