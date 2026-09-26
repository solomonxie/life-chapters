import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { space, type, usePalette } from '../ui';

/** Stands in for a screen until its IMPLEMENT_PLAN task lands. */
export function Placeholder({
  task,
  drawing,
  note,
}: {
  task: string;
  drawing: string;
  note?: string;
}) {
  const palette = usePalette();
  return (
    <View style={[styles.wrap, { backgroundColor: palette.bg }]}>
      <Text style={[type.heading, { color: palette.dim }]}>{task}</Text>
      <Text style={[type.mono, { color: palette.accent }]}>{drawing}</Text>
      {note ? (
        <Text style={[type.caption, styles.note, { color: palette.dim }]}>
          {note}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    padding: space.xl,
  },
  note: { textAlign: 'center' },
});
