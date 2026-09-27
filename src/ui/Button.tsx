import React from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { radius, space, type } from './theme';
import { usePalette } from './usePalette';
import { spoken } from './spoken';

/**
 * [[ primary ]] filled, ( secondary ) plain, ! destructive in red. Disabled
 * keeps its place and dims, with the reason written next to it by the caller.
 */
export function Button({
  title,
  onPress,
  onLongPress,
  kind = 'secondary',
  destructive = false,
  disabled = false,
  style,
  accessibilityHint,
}: {
  title: string;
  onPress: () => void;
  onLongPress?: () => void;
  kind?: 'primary' | 'secondary' | 'plain';
  destructive?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityHint?: string;
}) {
  const p = usePalette();
  const tint = destructive ? p.late : p.accent;
  const primary = kind === 'primary';
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={spoken(title)}
      accessibilityState={{ disabled }}
      accessibilityHint={accessibilityHint}
      hitSlop={kind === 'plain' ? space.sm : 0}
      style={({ pressed }) => [
        kind !== 'plain' && styles.base,
        primary && { backgroundColor: tint },
        kind === 'secondary' && { backgroundColor: destructive ? p.lateSoft : p.accentSoft },
        { opacity: disabled ? 0.4 : pressed ? 0.6 : 1 },
        style,
      ]}>
      <Text
        style={[
          type.label,
          { color: primary ? p.onAccent : tint, textAlign: 'center' },
          primary && styles.bold,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    borderRadius: radius.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  bold: { fontWeight: '600' },
});
