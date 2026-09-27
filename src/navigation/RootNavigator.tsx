import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import * as S from '../screens';
import { usePalette, type Palette } from '../ui';
import type { Routes } from './routes';
import { useStore } from '../state/store';

const Stack = createNativeStackNavigator<Routes>();
const Root = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export const navRef = createNavigationContainerRef<any>();

/** Detail screens every tab can push. */
function shared() {
  return (
    <>
      <Stack.Screen name="Step" component={S.StepScreen} options={{ title: '' }} />
      <Stack.Screen name="Document" component={S.DocumentScreen} options={{ title: '' }} />
      <Stack.Screen name="Playbook" component={S.PlaybookScreen} options={{ title: '' }} />
      <Stack.Screen name="Library" component={S.LibraryScreen} options={{ title: 'Library' }} />
      <Stack.Screen name="Chapter" component={S.ChapterScreen} options={{ title: '' }} />
      <Stack.Screen
        name="Entry"
        component={S.EntryScreen}
        options={{ presentation: 'modal', title: 'A story' }}
      />
      <Stack.Screen
        name="AnchorEdit"
        component={S.AnchorEditScreen}
        options={{ presentation: 'modal', title: 'Add a date' }}
      />
    </>
  );
}

const stackOptions = (p: Palette) => ({
  headerLargeTitleShadowVisible: false,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: p.bg },
  headerTintColor: p.accent,
  headerTitleStyle: { color: p.text },
  headerLargeTitleStyle: { color: p.text },
  contentStyle: { backgroundColor: p.bg },
  headerBackButtonDisplayMode: 'minimal' as const,
});

function TimelineFlow() {
  const p = usePalette();
  return (
    <Stack.Navigator screenOptions={stackOptions(p)}>
      <Stack.Screen
        name="Timeline"
        component={S.TimelineScreen}
        options={({ navigation }) => ({
          title: 'Life Chapters',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Settings">
              <Text maxFontSizeMultiplier={1.3} style={[styles.gear, { color: p.accent }]}>⚙︎</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Settings" component={S.SettingsScreen} />
      <Stack.Screen name="Reminders" component={S.RemindersScreen} />
      <Stack.Screen name="Backups" component={S.BackupsScreen} />
      <Stack.Screen name="Sources" component={S.SourcesScreen} options={{ title: 'Playbooks' }} />
      <Stack.Screen name="About" component={S.AboutScreen} />
      {shared()}
    </Stack.Navigator>
  );
}

function JournalFlow() {
  const p = usePalette();
  return (
    <Stack.Navigator screenOptions={stackOptions(p)}>
      <Stack.Screen name="Journal" component={S.JournalScreen} />
      {shared()}
    </Stack.Navigator>
  );
}

function RadarFlow() {
  const p = usePalette();
  return (
    <Stack.Navigator screenOptions={stackOptions(p)}>
      <Stack.Screen name="Radar" component={S.RadarScreen} />
      {shared()}
    </Stack.Navigator>
  );
}

function TracksFlow() {
  const p = usePalette();
  return (
    <Stack.Navigator screenOptions={stackOptions(p)}>
      <Stack.Screen name="Tracks" component={S.TracksScreen} />
      {shared()}
    </Stack.Navigator>
  );
}

function DocsFlow() {
  const p = usePalette();
  return (
    <Stack.Navigator screenOptions={stackOptions(p)}>
      <Stack.Screen name="Docs" component={S.DocsScreen} />
      {shared()}
    </Stack.Navigator>
  );
}

/** Drawn tab icons: a stem, a radar ring, stacked tracks, a page. */
function TabIcon({ name, color }: { name: string; color: string }) {
  if (name === 'TimelineTab') {
    return (
      <View style={styles.icon}>
        <View style={[styles.stemLine, { backgroundColor: color }]} />
        <View style={[styles.stemDot, { top: 3, borderColor: color, backgroundColor: color }]} />
        <View style={[styles.stemDot, { top: 14, borderColor: color }]} />
      </View>
    );
  }
  if (name === 'JournalTab') {
    return (
      <View style={styles.icon}>
        <View style={[styles.book, { borderColor: color }]}>
          <View style={[styles.spine, { backgroundColor: color }]} />
        </View>
      </View>
    );
  }
  if (name === 'RadarTab') {
    return (
      <View style={styles.icon}>
        <View style={[styles.ring, { borderColor: color }]} />
        <View style={[styles.ringInner, { borderColor: color }]} />
        <View style={[styles.ringDot, { backgroundColor: color }]} />
      </View>
    );
  }
  if (name === 'TracksTab') {
    return (
      <View style={[styles.icon, styles.bars]}>
        {[22, 16, 19].map((w, i) => (
          <View key={i} style={[styles.bar, { width: w, backgroundColor: color }]} />
        ))}
      </View>
    );
  }
  return (
    <View style={styles.icon}>
      <View style={[styles.page, { borderColor: color }]}>
        {[10, 10, 6].map((w, i) => (
          <View key={i} style={[styles.pageLine, { width: w, backgroundColor: color }]} />
        ))}
      </View>
    </View>
  );
}

function MainTabs() {
  const p = usePalette();
  const lateCount = useStore(
    s => s.view.steps.filter(x => x.status === 'pending' && x.startBy < s.now).length,
  );
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: p.accent,
        tabBarInactiveTintColor: p.dim,
        tabBarStyle: { backgroundColor: p.card, borderTopColor: p.hairline },
        tabBarIcon: ({ color }) => <TabIcon name={route.name} color={color} />,
      })}>
      <Tabs.Screen name="TimelineTab" component={TimelineFlow} options={{ title: 'Timeline' }} />
      <Tabs.Screen name="JournalTab" component={JournalFlow} options={{ title: 'Journal' }} />
      <Tabs.Screen
        name="RadarTab"
        component={RadarFlow}
        options={{
          title: 'Radar',
          tabBarBadge: lateCount > 0 ? lateCount : undefined,
          tabBarBadgeStyle: { backgroundColor: p.late },
        }}
      />
      <Tabs.Screen name="TracksTab" component={TracksFlow} options={{ title: 'Tracks' }} />
      <Tabs.Screen name="DocsTab" component={DocsFlow} options={{ title: 'Docs' }} />
    </Tabs.Navigator>
  );
}

export function RootNavigator({ onReady }: { onReady?: () => void }) {
  const scheme = useColorScheme();
  const p = usePalette();
  const needsFirstRun = useStore(s => s.plan.anchors.length === 0 && !s.settings.firstRunDone);
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = useMemo(
    () => ({
      ...base,
      colors: { ...base.colors, primary: p.accent, background: p.bg, card: p.card, text: p.text, border: p.hairline },
    }),
    [base, p],
  );

  return (
    <NavigationContainer theme={theme} ref={navRef} onReady={onReady}>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {needsFirstRun ? (
          <Root.Screen name="FirstRun" component={S.FirstRunScreen} />
        ) : (
          <Root.Screen name="Main" component={MainTabs} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gear: { fontSize: 22 },
  icon: { width: 26, height: 24, alignItems: 'center', justifyContent: 'center' },
  stemLine: { position: 'absolute', width: 2, top: 2, bottom: 2, borderRadius: 1 },
  stemDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, borderWidth: 1.5 },
  ring: { position: 'absolute', width: 22, height: 22, borderRadius: 11, borderWidth: 1.5 },
  ringInner: { position: 'absolute', width: 12, height: 12, borderRadius: 6, borderWidth: 1.5 },
  ringDot: { width: 4, height: 4, borderRadius: 2 },
  bars: { gap: 4, alignItems: 'flex-start' },
  bar: { height: 3, borderRadius: 1.5 },
  book: { width: 20, height: 22, borderRadius: 3, borderWidth: 1.5, borderLeftWidth: 4 },
  spine: { position: 'absolute', left: 3, right: 3, top: 5, height: 1.5, borderRadius: 1 },
  page: { width: 18, height: 22, borderRadius: 3, borderWidth: 1.5, padding: 3, gap: 3 },
  pageLine: { height: 1.5, borderRadius: 1 },
});
