import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { space, type } from './theme';
import { usePalette } from './usePalette';

export function EmptyState({
  title,
  body,
  action,
  onAction,
}: {
  title: string;
  body?: string;
  action?: string;
  onAction?: () => void;
}) {
  const p = usePalette();
  return (
    <View style={styles.wrap}>
      <Text style={[type.headline, styles.center, { color: p.text }]}>{title}</Text>
      {body ? <Text style={[type.body, styles.center, { color: p.dim }]}>{body}</Text> : null}
      {action && onAction ? (
        <Button title={action} kind="primary" onPress={onAction} style={styles.button} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: space.sm, padding: space.xxl },
  center: { textAlign: 'center' },
  button: { marginTop: space.md, alignSelf: 'stretch' },
});
