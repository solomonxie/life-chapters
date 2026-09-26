import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { space, type } from './theme';
import { usePalette } from './usePalette';

export interface Option {
  value: string;
  label: string;
  group?: string;
}

/**
 * A form row whose options unfold in place and push the rest of the form down,
 * per the `uiux` skill's mobile rule — nothing is covered, so there's nothing to
 * dismiss and no Cancel/Done.
 */
export function UnfoldingPicker({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  value: string;
  options: Option[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  const palette = usePalette();
  const selected = options.find(o => o.value === value);

  return (
    <View>
      <Pressable
        onPress={onToggle}
        style={styles.row}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${label}, ${selected?.label ?? value}`}>
        <Text style={[type.label, { color: palette.text }]}>{label}</Text>
        <View style={styles.trailing}>
          <Text style={[type.label, { color: palette.dim }]}>
            {selected?.label ?? value}
          </Text>
          <Text style={{ color: palette.dim }}>{open ? '⌄' : '›'}</Text>
        </View>
      </Pressable>

      {open ? (
        <View style={[styles.panel, { borderTopColor: palette.hairline }]}>
          {options.map((option, i) => (
            <React.Fragment key={option.value}>
              {option.group && option.group !== options[i - 1]?.group ? (
                <Text style={[type.heading, styles.group, { color: palette.dim }]}>
                  {option.group.toUpperCase()}
                </Text>
              ) : null}
              <Pressable
                onPress={() => onSelect(option.value)}
                style={styles.option}
                accessibilityRole="radio"
                accessibilityState={{ selected: option.value === value }}>
                <Text style={[styles.tick, { color: palette.accent }]}>
                  {option.value === value ? '✓' : ''}
                </Text>
                <Text style={[type.body, { color: palette.text }]}>
                  {option.label}
                </Text>
              </Pressable>
            </React.Fragment>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
  },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  panel: { borderTopWidth: StyleSheet.hairlineWidth },
  tick: { width: 18 },
  group: { paddingTop: space.md, paddingHorizontal: space.lg },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
  },
});
