import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDate, formatPrecise } from '../domain/format';
import type { CivilDate, DatePrecision } from '../domain/types';
import { space, type } from './theme';
import { usePalette } from './usePalette';

export interface StemNode {
  id: string;
  label: string;
  date: CivilDate;
  precision: DatePrecision;
  source: 'anchor' | 'derived';
  pendingSteps?: number;
  /** Stories filed in the chapter this node opens. */
  stories?: number;
}

const YEAR_W = 44;
const RAIL_W = 24;
const DOT = 14;

type Seg = 'none' | 'thin' | 'thick' | 'dots';

/**
 * The continuous life line. A plain dated list would read as a table — the
 * unbroken stem is what makes forty years feel like one object. The thick
 * stretch either side of TODAY is the chapter you're in; nothing else marks it.
 */
export function TimelineStem({
  nodes,
  now,
  lateCount = 0,
  onPressNode,
  onPressBadge,
  onPressLate,
}: {
  nodes: StemNode[];
  now: CivilDate;
  lateCount?: number;
  onPressNode?: (node: StemNode) => void;
  onPressBadge?: (node: StemNode) => void;
  onPressLate?: () => void;
}) {
  const p = usePalette();
  const firstFuture = nodes.findIndex(n => n.date > now);
  const cut = firstFuture === -1 ? nodes.length : firstFuture;

  // Segment above/below each node: thick when it touches TODAY.
  const above = (i: number): Seg => (i === 0 ? 'none' : i === cut ? 'thick' : 'thin');
  const below = (i: number): Seg =>
    i === nodes.length - 1 ? 'dots' : i === cut - 1 ? 'thick' : 'thin';

  const today = (
    <>
      <TodayMarker now={now} />
      {lateCount > 0 ? (
        <Pressable
          onPress={onPressLate}
          style={({ pressed }) => [styles.row, pressed && { backgroundColor: p.hairline }]}
          accessibilityRole="button"
          accessibilityLabel={`${lateCount} steps are late. Open Radar`}>
          <View style={styles.year} />
          <Rail top="thick" bottom={cut < nodes.length ? 'thick' : 'none'} />
          <Text style={[type.label, styles.flex, { color: p.late }]}>
            ⚠ {lateCount} step{lateCount === 1 ? ' is' : 's are'} late
          </Text>
          <Text style={{ color: p.faint }}>›</Text>
        </Pressable>
      ) : cut < nodes.length ? (
        <View style={[styles.row, styles.spacer]}>
          <View style={styles.year} />
          <Rail top="thick" bottom="thick" />
        </View>
      ) : null}
    </>
  );

  return (
    <View>
      {nodes.map((node, i) => {
        const past = i < cut;
        return (
          <React.Fragment key={node.id}>
            {i === cut ? today : null}
            <Pressable
              onPress={() => onPressNode?.(node)}
              style={({ pressed }) => [styles.row, pressed && { backgroundColor: p.hairline }]}
              accessibilityRole="button"
              accessibilityLabel={`${node.label}, ${formatPrecise(node.date, node.precision)}${
                node.pendingSteps ? `, ${node.pendingSteps} open steps` : ''
              }`}>
              <Text style={[type.caption, styles.year, { color: p.dim }]}>
                {node.date.slice(0, 4)}
              </Text>
              <Rail
                top={above(i)}
                bottom={below(i)}
                dot={past ? (node.precision === 'day' ? 'filled' : 'fuzzy') : 'ring'}
              />
              <Text
                numberOfLines={1}
                style={[type.label, styles.flex, { color: past ? p.dim : p.text }]}>
                {node.label}
              </Text>
              {node.stories ? (
                <Text
                  style={[type.caption, { color: p.dim }]}
                  accessibilityLabel={`${node.stories} stories`}>
                  ✎ {node.stories}
                </Text>
              ) : null}
              {node.pendingSteps ? (
                <Pressable
                  onPress={() => onPressBadge?.(node)}
                  hitSlop={space.sm}
                  accessibilityRole="button"
                  accessibilityLabel={`${node.pendingSteps} open steps, show in Radar`}>
                  <Text style={[type.caption, { color: p.accent }]}>({node.pendingSteps})</Text>
                </Pressable>
              ) : null}
              <Text style={{ color: p.faint }}>›</Text>
            </Pressable>
          </React.Fragment>
        );
      })}
      {cut === nodes.length ? today : null}
    </View>
  );
}

function Rail({ top, bottom, dot }: { top: Seg; bottom: Seg; dot?: 'filled' | 'fuzzy' | 'ring' }) {
  const p = usePalette();
  const seg = (s: Seg, pos: 'top' | 'bottom') => {
    if (s === 'none') return null;
    if (s === 'dots') {
      return (
        <View style={[styles.segDots, pos === 'top' ? styles.top : styles.bottom]}>
          {[0, 1, 2].map(k => (
            <View key={k} style={[styles.dotlet, { backgroundColor: p.faint }]} />
          ))}
        </View>
      );
    }
    return (
      <View
        style={[
          styles.seg,
          pos === 'top' ? styles.top : styles.bottom,
          s === 'thick'
            ? { width: 4, marginLeft: -2, backgroundColor: p.accent }
            : { width: 2, marginLeft: -1, backgroundColor: p.hairline },
        ]}
      />
    );
  };
  return (
    <View style={styles.rail}>
      {seg(top, 'top')}
      {seg(bottom, 'bottom')}
      {dot ? (
        <View
          style={[
            styles.dot,
            dot === 'filled' && { backgroundColor: p.past, borderColor: p.past },
            dot === 'fuzzy' && { backgroundColor: p.hairline, borderColor: p.past },
            dot === 'ring' && { backgroundColor: p.bg, borderColor: p.accent },
          ]}
        />
      ) : null}
    </View>
  );
}

function TodayMarker({ now }: { now: CivilDate }) {
  const p = usePalette();
  return (
    <View style={styles.today} accessibilityRole="header" accessibilityLabel={`Today, ${formatDate(now)}`}>
      <View style={[styles.rule, styles.ruleShort, { backgroundColor: p.accent }]} />
      <Text style={[type.heading, { color: p.accent }]}>TODAY · {formatDate(now).toUpperCase()}</Text>
      <View style={[styles.rule, { backgroundColor: p.accent }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    minHeight: 60,
  },
  spacer: { minHeight: 20 },
  year: { width: YEAR_W },
  flex: { flex: 1 },
  rail: { width: RAIL_W, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' },
  seg: { position: 'absolute', left: '50%' },
  top: { top: 0, height: '50%' },
  bottom: { bottom: 0, height: '50%' },
  segDots: { position: 'absolute', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: DOT },
  dotlet: { width: 3, height: 3, borderRadius: 1.5 },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2, borderWidth: 2.5 },
  today: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.xs,
    paddingHorizontal: space.lg,
  },
  rule: { flex: 1, height: 2, borderRadius: 1 },
  ruleShort: { flex: 0, width: YEAR_W },
});
