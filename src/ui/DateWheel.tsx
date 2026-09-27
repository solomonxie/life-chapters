import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, type ScrollViewInstance } from 'react-native';
import type { CivilDate, DatePrecision } from '../domain/types';
import { haptic } from '../platform';
import { radius, space, type } from './theme';
import { usePalette } from './usePalette';

const ROW = 38;
const VISIBLE = 5;
const MONTHS = 'January February March April May June July August September October November December'.split(' ');

const daysIn = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Month · day · year wheels that unfold in place under a form row. Columns
 * follow precision — a year-only date shows just the year wheel.
 */
export function DateWheel({
  value,
  precision = 'day',
  onChange,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 40,
}: {
  value: CivilDate;
  precision?: DatePrecision;
  onChange: (date: CivilDate) => void;
  minYear?: number;
  maxYear?: number;
}) {
  const p = usePalette();
  const [y, m, d] = value.split('-').map(Number);
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => String(minYear + i));
  const days = Array.from({ length: daysIn(y, m) }, (_, i) => String(i + 1));

  const set = (ny: number, nm: number, nd: number) => {
    const day = Math.min(nd, daysIn(ny, nm));
    const next = `${ny}-${pad(nm)}-${pad(day)}`;
    if (next !== value) {
      haptic('selection');
      onChange(next);
    }
  };

  return (
    <View style={styles.wrap}>
      <View
        pointerEvents="none"
        style={[styles.band, { backgroundColor: p.accentSoft, top: ROW * 2 }]}
      />
      {precision !== 'year' ? (
        <Wheel
          items={MONTHS}
          index={m - 1}
          flex={1.6}
          label="Month"
          onIndex={i => set(y, i + 1, d)}
        />
      ) : null}
      {precision === 'day' ? (
        <Wheel items={days} index={d - 1} flex={0.8} label="Day" onIndex={i => set(y, m, i + 1)} />
      ) : null}
      <Wheel
        items={years}
        index={Math.max(0, y - minYear)}
        flex={1}
        label="Year"
        onIndex={i => set(minYear + i, m, d)}
      />
    </View>
  );
}

function Wheel({
  items,
  index,
  flex,
  label,
  onIndex,
}: {
  items: string[];
  index: number;
  flex: number;
  label: string;
  onIndex: (i: number) => void;
}) {
  const p = usePalette();
  const ref = useRef<ScrollViewInstance>(null);
  const settled = useRef(index);

  useEffect(() => {
    if (settled.current !== index) {
      settled.current = index;
      ref.current?.scrollTo({ y: index * ROW, animated: true });
    }
  }, [index]);

  const settle = (offset: number) => {
    const i = Math.max(0, Math.min(items.length - 1, Math.round(offset / ROW)));
    if (i !== settled.current) {
      settled.current = i;
      onIndex(i);
    }
  };

  return (
    <ScrollView
      ref={ref}
      style={{ flex, height: ROW * VISIBLE }}
      contentOffset={{ x: 0, y: index * ROW }}
      contentContainerStyle={{ paddingVertical: ROW * 2 }}
      showsVerticalScrollIndicator={false}
      snapToInterval={ROW}
      decelerationRate="fast"
      nestedScrollEnabled
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ text: items[index] }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={e => {
        const next = e.nativeEvent.actionName === 'increment' ? index + 1 : index - 1;
        if (next >= 0 && next < items.length) onIndex(next);
      }}
      onMomentumScrollEnd={e => settle(e.nativeEvent.contentOffset.y)}
      onScrollEndDrag={e => {
        if (!e.nativeEvent.velocity || Math.abs(e.nativeEvent.velocity.y) < 0.05) {
          settle(e.nativeEvent.contentOffset.y);
        }
      }}>
      {items.map((item, i) => (
        <View key={item + i} style={styles.item}>
          <Text
            maxFontSizeMultiplier={1.4}
            style={[
              type.body,
              { color: i === index ? p.text : p.dim, fontWeight: i === index ? '600' : '400' },
            ]}>
            {item}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingHorizontal: space.lg,
    paddingVertical: space.xs,
    gap: space.sm,
  },
  band: {
    position: 'absolute',
    left: space.md,
    right: space.md,
    height: ROW,
    borderRadius: radius.sm,
    marginTop: space.xs,
  },
  item: { height: ROW, alignItems: 'center', justifyContent: 'center' },
});
