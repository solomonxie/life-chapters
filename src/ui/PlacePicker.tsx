import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { placeLabel, searchPlaces } from '../domain/places';
import { countryName } from '../domain/regions';
import { useStore } from '../state/store';
import { space, type } from './theme';
import { usePalette } from './usePalette';

/**
 * The `Place` row unfolded: search the bundled city list (shown in English,
 * Chinese places also found by their Chinese name), or keep whatever was typed.
 */
export function PlacePicker({
  value,
  onPick,
}: {
  value?: string;
  onPick: (place: string | undefined) => void;
}) {
  const p = usePalette();
  const [q, setQ] = useState('');
  const typed = q.trim();
  const near = countryName(useStore(s => s.mine.where.country)) ?? 'Canada';
  const matches = useMemo(() => searchPlaces(typed, 8, near), [typed, near]);
  const labels = matches.map(placeLabel);
  const exact = labels.some(l => l.toLowerCase() === typed.toLowerCase());

  return (
    <View style={[styles.panel, { borderColor: p.hairline }]}>
      <TextInput
        autoFocus
        value={q}
        onChangeText={setQ}
        placeholder="City, town, or type your own"
        placeholderTextColor={p.faint}
        returnKeyType="done"
        autoCorrect={false}
        onSubmitEditing={() => typed && onPick(labels[0] ?? typed)}
        style={[type.body, styles.input, { color: p.text, backgroundColor: p.bg }]}
        accessibilityLabel="Search places"
      />
      {matches.map((m, i) => (
        <Pressable
          key={`${labels[i]}-${m.rank}`}
          onPress={() => onPick(labels[i])}
          style={styles.option}
          accessibilityRole="button"
          accessibilityLabel={labels[i]}>
          <View style={styles.flex}>
            <Text style={[type.body, { color: p.text }]} numberOfLines={1}>
              {m.name}
            </Text>
            <Text style={[type.caption, { color: p.dim }]} numberOfLines={1}>
              {[m.admin !== m.name ? m.admin : '', m.country].filter(Boolean).join(', ')}
            </Text>
          </View>
        </Pressable>
      ))}
      {typed && !exact ? (
        <Pressable
          onPress={() => onPick(typed)}
          style={styles.option}
          accessibilityRole="button"
          accessibilityLabel={`Use ${typed}`}>
          <Text style={[type.body, { color: p.accent }]}>Use “{typed}”</Text>
        </Pressable>
      ) : null}
      {!typed && value ? (
        <Pressable
          onPress={() => onPick(undefined)}
          style={styles.option}
          accessibilityRole="button"
          accessibilityLabel="Remove the place">
          <Text style={[type.body, { color: p.late }]}>Remove the place</Text>
        </Pressable>
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
  option: { paddingVertical: space.sm, paddingHorizontal: space.lg, minHeight: 44, justifyContent: 'center' },
  flex: { flex: 1 },
});
