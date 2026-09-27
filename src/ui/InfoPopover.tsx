import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, space, type } from './theme';
import { usePalette } from './usePalette';

/**
 * The ⓘ beside a heading. Long explanations live in here, not under the
 * heading, so the controls stay above the fold — `uiux` skill, mobile.
 * Pass children to use something other than ⓘ as the trigger (e.g. ▲▼).
 */
export function InfoPopover({
  text,
  title,
  children,
  label = 'More about this',
}: {
  text: string;
  title?: string;
  children?: React.ReactNode;
  label?: string;
}) {
  const p = usePalette();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        hitSlop={space.md}
        accessibilityRole="button"
        accessibilityLabel={label}>
        {children ?? <Text style={[type.body, { color: p.accent }]}>ⓘ</Text>}
      </Pressable>
      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          style={[styles.backdrop, { backgroundColor: p.backdrop }]}
          onPress={() => setOpen(false)}
          accessibilityLabel="Close">
          <View style={[styles.bubble, { backgroundColor: p.card }]}>
            {title ? (
              <Text style={[type.label, styles.title, { color: p.text }]}>{title}</Text>
            ) : null}
            <Text style={[type.body, { color: p.text }]}>{text}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', padding: space.xl },
  bubble: { borderRadius: radius.lg, padding: space.lg },
  title: { marginBottom: space.xs, fontWeight: '600' },
});
