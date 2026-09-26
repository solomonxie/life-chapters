import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, space, type } from './theme';
import { usePalette } from './usePalette';

/**
 * One line, one action. Shown after a reflow so the schedule change is visible
 * and reversible without hunting for what moved.
 */
export function ReflowToast({
  moved,
  direction,
  onUndo,
}: {
  moved: number;
  direction: 'earlier' | 'later';
  onUndo?: () => void;
}) {
  const palette = usePalette();
  const message =
    moved === 0
      ? 'Done.'
      : `Done. ${moved} later step${moved === 1 ? '' : 's'} moved ${direction}.`;

  return (
    <View style={[styles.toast, { backgroundColor: palette.card }]}>
      <Text style={[type.caption, styles.text, { color: palette.text }]}>
        {message}
      </Text>
      {onUndo ? (
        <Pressable onPress={onUndo} accessibilityRole="button">
          <Text style={[type.label, { color: palette.accent }]}>Undo</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    margin: space.lg,
    padding: space.md,
    borderRadius: radius.md,
  },
  text: { flex: 1 },
});
