import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { InfoPopover } from './InfoPopover';
import { radius, space, type } from './theme';
import { usePalette } from './usePalette';

/** HEADING  ⓘ                    (n) — optionally collapsible, remembered by the caller. */
export function SectionHeader({
  title,
  count,
  info,
  tone = 'normal',
  collapsed,
  onToggle,
  right,
}: {
  title: string;
  count?: number | string;
  info?: string;
  tone?: 'normal' | 'late';
  collapsed?: boolean;
  onToggle?: () => void;
  right?: React.ReactNode;
}) {
  const p = usePalette();
  const color = tone === 'late' ? p.late : p.dim;
  const body = (
    <View style={styles.header}>
      <Text style={[type.heading, { color }]} accessibilityRole="header">
        {title.toUpperCase()}
      </Text>
      {info ? <InfoPopover text={info} /> : null}
      <View style={styles.spacer} />
      {right}
      {count !== undefined ? (
        <Text style={[type.caption, { color: p.dim }]}>({count})</Text>
      ) : null}
      {onToggle ? (
        <Text style={[type.caption, { color: p.dim }]}>{collapsed ? '›' : '⌄'}</Text>
      ) : null}
    </View>
  );
  return onToggle ? (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityState={{ expanded: !collapsed }}
      accessibilityLabel={`${title}, ${count ?? ''}`}>
      {body}
    </Pressable>
  ) : (
    body
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const p = usePalette();
  return <View style={[styles.card, { backgroundColor: p.card }, style]}>{children}</View>;
}

/** Hairline between rows inside a card, inset to the text. */
export function Divider({ inset = space.lg }: { inset?: number }) {
  const p = usePalette();
  return <View style={[styles.divider, { backgroundColor: p.hairline, marginLeft: inset }]} />;
}

/** Interleaves dividers between children. */
export function Rows({ children, inset }: { children: React.ReactNode; inset?: number }) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <>
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <Divider inset={inset} /> : null}
          {child}
        </React.Fragment>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.sm,
    minHeight: 44,
  },
  spacer: { flex: 1 },
  card: { marginHorizontal: space.lg, borderRadius: radius.lg, overflow: 'hidden' },
  divider: { height: StyleSheet.hairlineWidth },
});
