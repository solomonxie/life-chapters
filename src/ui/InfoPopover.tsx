import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, space, type } from './theme';
import { usePalette } from './usePalette';

/**
 * The ⓘ beside a section heading. Long explanations live in here, not under the
 * heading, so the controls stay above the fold — `uiux` skill, mobile.
 */
export function InfoPopover({ text }: { text: string }) {
  const palette = usePalette();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        hitSlop={space.md}
        accessibilityRole="button"
        accessibilityLabel="More about this">
        <Text style={{ color: palette.accent }}>ⓘ</Text>
      </Pressable>
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={[styles.bubble, { backgroundColor: palette.card }]}>
            <Text style={[type.body, { color: palette.text }]}>{text}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: space.xl,
    backgroundColor: '#00000055',
  },
  bubble: { borderRadius: radius.lg, padding: space.lg },
});
