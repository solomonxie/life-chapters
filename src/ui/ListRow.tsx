import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { space, type } from './theme';
import { usePalette } from './usePalette';
import { spoken } from './spoken';

/** Label on the left, value on the right, › when it goes somewhere. */
export function ListRow({
  label,
  value,
  detail,
  onPress,
  chevron = !!onPress,
  open,
  disabled,
  tone = 'normal',
  right,
  accessibilityLabel,
}: {
  label: string;
  value?: string;
  detail?: string;
  onPress?: () => void;
  chevron?: boolean;
  /** For in-place unfolding rows: › becomes ⌄. */
  open?: boolean;
  disabled?: boolean;
  tone?: 'normal' | 'accent' | 'late' | 'dim';
  right?: React.ReactNode;
  accessibilityLabel?: string;
}) {
  const p = usePalette();
  const color =
    tone === 'accent' ? p.accent : tone === 'late' ? p.late : tone === 'dim' ? p.dim : p.text;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={open === undefined ? { disabled } : { expanded: open, disabled }}
      accessibilityLabel={accessibilityLabel ?? spoken([label, value].filter(Boolean).join(', '))}
      style={({ pressed }) => [
        styles.row,
        { opacity: disabled ? 0.4 : 1, backgroundColor: pressed ? p.hairline : 'transparent' },
      ]}>
      <View style={styles.left}>
        <Text style={[type.body, { color }]} numberOfLines={2}>
          {label}
        </Text>
        {detail ? (
          <Text style={[type.caption, { color: p.dim }]} numberOfLines={2}>
            {detail}
          </Text>
        ) : null}
      </View>
      {value ? (
        <Text style={[type.body, styles.value, { color: p.dim }]} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      {right}
      {chevron ? (
        <Text style={[type.body, { color: p.faint }]}>{open ? '⌄' : '›'}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    minHeight: 48,
  },
  left: { flexGrow: 1, flexShrink: 1, gap: 2 },
  value: { flexShrink: 1, maxWidth: '55%', textAlign: 'right' },
});
