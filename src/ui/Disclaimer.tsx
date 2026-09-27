import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatMonth } from '../domain/format';
import { isStale, reviewAgeYears } from '../domain/playbook';
import type { CivilDate, Playbook } from '../domain/types';
import { space, type } from './theme';
import { usePalette } from './usePalette';

/** On every playbook and step surface. Never dismissible, never a modal. */
export function Disclaimer({
  playbook,
  now,
  onPress,
}: {
  playbook: Playbook;
  now: CivilDate;
  onPress?: () => void;
}) {
  const p = usePalette();
  const stale = isStale(playbook, now);
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={styles.wrap} accessibilityRole="text">
      <Text style={[type.caption, { color: p.dim }]}>
        Reviewed {formatMonth(playbook.reviewedAt)} · not official advice
      </Text>
      {stale ? (
        <View style={styles.row}>
          <Text style={[type.caption, styles.flex, { color: p.warn }]}>
            ⚠ Over {reviewAgeYears(playbook.reviewedAt, now)} years old. Check the steps against
            the current rules.
          </Text>
          {onPress ? <Text style={{ color: p.faint }}>›</Text> : null}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 2 },
  row: { flexDirection: 'row', gap: space.sm, alignItems: 'center' },
  flex: { flex: 1 },
});
