import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ANCHOR_KINDS } from '../domain/kinds';
import { space, type } from './theme';
import { usePalette } from './usePalette';

/**
 * The `What` list, unfolded in place with a filter field on top. Typing a kind
 * that isn't listed keeps it as free text.
 */
export function KindPicker({
  value,
  label,
  onPick,
}: {
  value: string;
  label: string;
  onPick: (kind: string, label: string) => void;
}) {
  const p = usePalette();
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const matches = ANCHOR_KINDS.filter(
    k => !needle || k.label.toLowerCase().includes(needle) || k.group.toLowerCase().includes(needle),
  );

  return (
    <View style={[styles.panel, { borderColor: p.hairline }]}>
      <TextInput
        autoFocus
        value={q}
        onChangeText={setQ}
        placeholder="Search or type your own"
        placeholderTextColor={p.faint}
        returnKeyType="done"
        onSubmitEditing={() => {
          if (!needle) return;
          const exact = matches[0];
          if (exact && exact.label.toLowerCase() === needle) onPick(exact.id, exact.label);
          else onPick('custom', q.trim());
        }}
        style={[type.body, styles.input, { color: p.text, backgroundColor: p.bg }]}
        accessibilityLabel="Search kinds of date"
      />
      {matches.map((k, i) => (
        <React.Fragment key={k.id}>
          {k.group !== matches[i - 1]?.group ? (
            <Text style={[type.heading, styles.group, { color: p.dim }]}>{k.group.toUpperCase()}</Text>
          ) : null}
          <Pressable
            onPress={() => onPick(k.id, k.label)}
            style={styles.option}
            accessibilityRole="radio"
            accessibilityState={{ selected: k.id === value }}>
            <Text style={[styles.tick, { color: p.accent }]}>{k.id === value ? '✓' : ''}</Text>
            <Text style={[type.body, { color: p.text }]}>{k.label}</Text>
          </Pressable>
        </React.Fragment>
      ))}
      {needle && !matches.some(k => k.label.toLowerCase() === needle) ? (
        <Pressable
          onPress={() => onPick('custom', q.trim())}
          style={styles.option}
          accessibilityRole="button">
          <Text style={[styles.tick, { color: p.accent }]}>+</Text>
          <Text style={[type.body, { color: p.accent }]}>Use “{q.trim()}”</Text>
        </Pressable>
      ) : null}
      {value === 'custom' && !needle ? (
        <View style={styles.option}>
          <Text style={[styles.tick, { color: p.accent }]}>✓</Text>
          <Text style={[type.body, { color: p.text }]}>{label}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: space.sm },
  input: {
    marginHorizontal: space.lg,
    marginTop: space.sm,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: 8,
  },
  group: { paddingTop: space.md, paddingHorizontal: space.lg },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.sm + 2,
    paddingHorizontal: space.lg,
  },
  tick: { width: 18 },
});
