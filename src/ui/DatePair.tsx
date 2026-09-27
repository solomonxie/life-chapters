import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatDate, formatPrecise, formatRelative, formatAgo } from '../domain/format';
import type { CivilDate, DatePrecision } from '../domain/types';
import { space, type } from './theme';
import { usePalette } from './usePalette';

export { formatDate, formatRelative } from '../domain/format';

/** Absolute and relative together — neither alone does the job. */
export function DatePair({
  date,
  now,
  precision = 'day',
  fact = false,
  lateRed = true,
}: {
  date: CivilDate | null;
  now?: CivilDate;
  precision?: DatePrecision;
  /** A thing that happened: "13 years ago", never "late". */
  fact?: boolean;
  lateRed?: boolean;
}) {
  const palette = usePalette();
  if (!date) {
    return (
      <Text style={[type.caption, { color: palette.dim }]}>— · blocked</Text>
    );
  }
  const relative = fact ? formatAgo(date, now) : formatRelative(date, now);
  const late = !fact && relative.endsWith('late');
  return (
    <View style={styles.row}>
      <Text style={[type.caption, { color: palette.text }]}>
        {precision === 'day' ? formatDate(date) : formatPrecise(date, precision)}
      </Text>
      <Text style={[type.caption, { color: palette.dim }]}> · </Text>
      <Text
        style={[
          type.caption,
          { color: late && lateRed ? palette.late : palette.dim },
        ]}>
        {relative}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: space.xs / 2 },
});
