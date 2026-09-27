import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { actions, useStore } from '../state/store';
import { radius, space, type } from './theme';
import { usePalette } from './usePalette';

const VISIBLE_MS = 5000;

/**
 * One line, one action. Every reflow the user didn't directly make shows up
 * here, with Undo, so nothing moves silently.
 */
export function ToastHost({ bottom }: { bottom: number }) {
  const p = usePalette();
  const toast = useStore(s => s.toast);
  const canUndo = useStore(s => s.undoSnapshot !== null);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!toast) return;
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    const t = setTimeout(() => {
      Animated.timing(fade, { toValue: 0, duration: 220, useNativeDriver: true }).start(() =>
        actions.dismissToast(),
      );
    }, VISIBLE_MS);
    return () => clearTimeout(t);
  }, [toast, fade]);

  if (!toast) return null;

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      style={[
        styles.toast,
        {
          bottom,
          backgroundColor: p.text,
          opacity: fade,
          transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
        },
      ]}>
      <Text style={[type.body, styles.text, { color: p.bg === '#000000' ? '#000' : '#fff' }]}>
        {toast.message}
      </Text>
      {toast.undoable && canUndo ? (
        <Pressable
          onPress={actions.undo}
          hitSlop={space.md}
          accessibilityRole="button"
          accessibilityLabel="Undo">
          <Text style={[type.label, { color: p.accent, fontWeight: '600' }]}>Undo</Text>
        </Pressable>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: space.lg,
    right: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    borderRadius: radius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  text: { flex: 1 },
});
