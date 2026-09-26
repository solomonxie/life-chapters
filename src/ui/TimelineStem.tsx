import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CivilDate, DatePrecision } from '../domain/types';
import { space, type } from './theme';
import { usePalette } from './usePalette';

export interface StemNode {
  id: string;
  year: string;
  label: string;
  date: CivilDate;
  precision: DatePrecision;
  pendingSteps?: number;
}

/**
 * The continuous life line. A plain dated list would read as a table — the
 * unbroken stem is what makes forty years feel like one object.
 */
export function TimelineStem({
  nodes,
  now,
  onPressNode,
}: {
  nodes: StemNode[];
  now: CivilDate;
  onPressNode?: (node: StemNode) => void;
}) {
  const palette = usePalette();
  const todayIndex = nodes.findIndex(n => n.date > now);
  const cut = todayIndex === -1 ? nodes.length : todayIndex;

  return (
    <View>
      {nodes.map((node, i) => (
        <React.Fragment key={node.id}>
          {i === cut ? <TodayMarker now={now} /> : null}
          <Pressable
            onPress={() => onPressNode?.(node)}
            style={styles.row}
            accessibilityRole="button"
            accessibilityLabel={`${node.label}, ${node.year}`}>
            <Text style={[type.caption, styles.year, { color: palette.dim }]}>
              {node.year}
            </Text>
            <Text style={{ color: i < cut ? palette.past : palette.accent }}>
              {bullet(node, i < cut)}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                type.label,
                styles.label,
                { color: i < cut ? palette.dim : palette.text },
              ]}>
              {node.label}
            </Text>
            {node.pendingSteps ? (
              <Text style={[type.caption, { color: palette.dim }]}>
                ({node.pendingSteps})
              </Text>
            ) : null}
            <Text style={{ color: palette.dim }}>›</Text>
          </Pressable>
          {i < nodes.length - 1 ? (
            <View
              style={[
                styles.stem,
                {
                  backgroundColor:
                    i === cut - 1 ? palette.accent : palette.hairline,
                  width: i === cut - 1 ? 3 : 1,
                },
              ]}
            />
          ) : null}
        </React.Fragment>
      ))}
    </View>
  );
}

const bullet = (node: StemNode, past: boolean) =>
  node.precision === 'day' ? (past ? '●' : '○') : past ? '◍' : '○';

function TodayMarker({ now }: { now: CivilDate }) {
  const palette = usePalette();
  return (
    <View style={styles.today}>
      <View style={[styles.rule, { backgroundColor: palette.accent }]} />
      <Text style={[type.heading, { color: palette.accent }]}>
        TODAY · {now}
      </Text>
      <View style={[styles.rule, { backgroundColor: palette.accent }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.sm,
  },
  year: { width: 44 },
  label: { flex: 1 },
  stem: { height: 18, marginLeft: 56 },
  today: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.sm,
  },
  rule: { flex: 1, height: 1 },
});
