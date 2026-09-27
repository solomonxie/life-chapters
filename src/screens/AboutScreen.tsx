import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, space, type, usePalette } from '../ui';
import { VERSION } from './SettingsScreen';

const PARAGRAPHS = [
  'Enter the dates that matter and the app works out the rest: the phase you are in, what is coming, and every step to start now for something years away to land on time.',
  'Playbooks describe paperwork. They are not legal, immigration, tax or financial advice, and every one shows when it was last reviewed. Rules change; check the official source before relying on a step.',
  'Everything stays on this iPhone. No account, no server, no analytics. The only thing that ever leaves is a file you export yourself through the share sheet.',
];

export function AboutScreen() {
  const p = usePalette();
  return (
    <ScrollView style={{ backgroundColor: p.bg }} contentContainerStyle={styles.content}>
      <Text style={[type.title, styles.title, { color: p.text }]}>Life Planner</Text>
      <Text style={[type.caption, styles.version, { color: p.dim }]}>Version {VERSION}</Text>
      <Card style={styles.card}>
        {PARAGRAPHS.map(t => (
          <Text key={t} style={[type.body, { color: p.text }]}>
            {t}
          </Text>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 80, paddingTop: space.xl },
  title: { textAlign: 'center' },
  version: { textAlign: 'center', paddingBottom: space.lg },
  card: { padding: space.lg, gap: space.md },
});
