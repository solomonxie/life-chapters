import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatAges } from '../domain/format';
import type { AgeRange } from '../domain/types';
import { space, type } from './theme';
import { usePalette } from './usePalette';

/** Who a playbook or step is for: an age range and "applies if…" lines. */
export function AppliesIf({ ages, conditions }: { ages?: AgeRange; conditions?: string[] }) {
  const p = usePalette();
  if (!ages && !conditions?.length) return null;
  return (
    <View style={styles.wrap}>
      {ages ? (
        <Text style={[type.caption, { color: p.dim }]}>For {formatAges(ages)}</Text>
      ) : null}
      {conditions?.map(c => (
        <Text key={c} style={[type.caption, { color: p.dim }]}>
          • {c}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.xs },
});
