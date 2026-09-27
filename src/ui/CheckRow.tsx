import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { space, type } from './theme';
import { usePalette } from './usePalette';

/** [x] item — a checklist line. Optional › for rows that also go somewhere. */
export function CheckRow({
  label,
  checked,
  onToggle,
  onOpen,
  detail,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onOpen?: () => void;
  detail?: string;
}) {
  const p = usePalette();
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onToggle}
        hitSlop={space.sm}
        style={styles.hit}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel={label}>
        <View
          style={[
            styles.box,
            { borderColor: checked ? p.done : p.faint, backgroundColor: checked ? p.done : 'transparent' },
          ]}>
          {checked ? <Text style={[styles.tick, { color: p.onAccent }]}>✓</Text> : null}
        </View>
        <View style={styles.text}>
          <Text
            style={[type.body, { color: checked ? p.dim : p.text }]}
            numberOfLines={2}>
            {label}
          </Text>
          {detail ? <Text style={[type.caption, { color: p.dim }]}>{detail}</Text> : null}
        </View>
      </Pressable>
      {onOpen ? (
        <Pressable
          onPress={onOpen}
          hitSlop={space.md}
          accessibilityRole="button"
          accessibilityLabel={`Open ${label}`}>
          <Text style={[type.body, { color: p.faint }]}>›</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    gap: space.sm,
    minHeight: 48,
  },
  hit: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: space.md },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: { fontSize: 14, fontWeight: '700', lineHeight: 16 },
  text: { flex: 1 },
});
