import React, { useRef } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { space, type } from './theme';
import { usePalette } from './usePalette';

export interface SwipeAction {
  label: string;
  color: string;
  onPress: () => void;
}

const ACTION_W = 84;

/**
 * Swipe ← for trailing actions, → for leading ones. Horizontal only once the
 * finger has clearly chosen horizontal, so vertical scrolling stays free.
 */
export function SwipeRow({
  children,
  leading = [],
  trailing = [],
}: {
  children: React.ReactNode;
  leading?: SwipeAction[];
  trailing?: SwipeAction[];
}) {
  const p = usePalette();
  const x = useRef(new Animated.Value(0)).current;
  const rest = useRef(0);

  const snap = (to: number) => {
    rest.current = to;
    Animated.spring(x, { toValue: to, useNativeDriver: true, bounciness: 0 }).start();
  };

  const maxRight = leading.length * ACTION_W;
  const maxLeft = -trailing.length * ACTION_W;

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy) * 2,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (_, g) => {
        const next = Math.max(maxLeft - 24, Math.min(maxRight + 24, rest.current + g.dx));
        x.setValue(next);
      },
      onPanResponderRelease: (_, g) => {
        const at = rest.current + g.dx;
        if (at < maxLeft / 2 && trailing.length) snap(maxLeft);
        else if (at > maxRight / 2 && leading.length) snap(maxRight);
        else snap(0);
      },
      onPanResponderTerminate: () => snap(0),
    }),
  ).current;

  const run = (a: SwipeAction) => {
    snap(0);
    a.onPress();
  };

  return (
    <View
      style={styles.wrap}
      accessibilityActions={[...leading, ...trailing].map(a => ({ name: a.label, label: a.label }))}
      onAccessibilityAction={e => {
        const a = [...leading, ...trailing].find(x2 => x2.label === e.nativeEvent.actionName);
        if (a) a.onPress();
      }}>
      <View style={[StyleSheet.absoluteFill, styles.under]}>
        <View style={styles.side}>
          {leading.map(a => (
            <Pressable key={a.label} onPress={() => run(a)} style={[styles.action, { backgroundColor: a.color }]}>
              <Text style={[type.caption, styles.actionText, { color: p.onAccent }]}>{a.label}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.side}>
          {trailing.map(a => (
            <Pressable key={a.label} onPress={() => run(a)} style={[styles.action, { backgroundColor: a.color }]}>
              <Text style={[type.caption, styles.actionText, { color: p.onAccent }]}>{a.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Animated.View
        {...pan.panHandlers}
        style={{ transform: [{ translateX: x }], backgroundColor: p.card }}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden' },
  under: { flexDirection: 'row', justifyContent: 'space-between' },
  side: { flexDirection: 'row' },
  action: { width: ACTION_W, alignItems: 'center', justifyContent: 'center', padding: space.xs },
  actionText: { fontWeight: '600', textAlign: 'center' },
});
