import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { radius, space, type } from './theme';
import { usePalette } from './usePalette';

export function ProgressBar({ done, total }: { done: number; total: number }) {
  const palette = usePalette();
  const ratio = total === 0 ? 0 : done / total;
  const complete = total > 0 && done === total;

  return (
    <View style={styles.row}>
      <View style={[styles.track, { backgroundColor: palette.hairline }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${ratio * 100}%`,
              backgroundColor: complete ? palette.done : palette.accent,
            },
          ]}
        />
      </View>
      <Text style={[type.caption, { color: palette.dim }]}>
        {done}/{total}
        {complete ? ' ✓' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  track: { flex: 1, height: 6, borderRadius: radius.sm, overflow: 'hidden' },
  fill: { height: '100%' },
});
