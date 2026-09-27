import React, { useMemo } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import * as S from '../screens';
import { usePalette, type Palette } from '../ui';
import type { Routes } from './routes';
import { useStore } from '../state/store';

const Stack = createNativeStackNavigator<Routes>();
const Root = createNativeStackNavigator();

export const navRef = createNavigationContainerRef<any>();

/** Detail screens any screen can push. */
function shared() {
  return (
    <>
      <Stack.Screen
        name="Step"
        component={S.StepScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Document"
        component={S.DocumentScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Playbook"
        component={S.PlaybookScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Library"
        component={S.LibraryScreen}
        options={{ title: 'Library' }}
      />
      <Stack.Screen
        name="Chapter"
        component={S.ChapterScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="AnchorEdit"
        component={S.AnchorEditScreen}
        options={{ presentation: 'modal', title: 'Add an event' }}
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

/** One page, no tab bar: the timeline, with everything else pushed on top. */
function MainStack() {
  const p = usePalette();
  return (
    <Stack.Navigator screenOptions={stackOptions(p)}>
      <Stack.Screen name="Timeline" component={S.TimelineScreen} />
      <Stack.Screen name="Reminders" component={S.RemindersScreen} />
      <Stack.Screen name="Backups" component={S.BackupsScreen} />
      <Stack.Screen name="Sources" component={S.SourcesScreen} options={{ title: 'Playbooks' }} />
      <Stack.Screen name="About" component={S.AboutScreen} />
      <Stack.Screen
        name="Person"
        component={S.PersonScreen}
        options={{ presentation: 'modal', title: '' }}
      />
      {shared()}
    </Stack.Navigator>
  );
}

export function RootNavigator({ onReady }: { onReady?: () => void }) {
  const scheme = useColorScheme();
  const p = usePalette();
  const needsFirstRun = useStore(
    s => s.plan.anchors.length === 0 && !s.settings.firstRunDone,
  );
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = useMemo(
    () => ({
      ...base,
      colors: {
        ...base.colors,
        primary: p.accent,
        background: p.bg,
        card: p.card,
        text: p.text,
        border: p.hairline,
      },
    }),
    [base, p],
  );

  return (
    <NavigationContainer theme={theme} ref={navRef} onReady={onReady}>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {needsFirstRun ? (
          <Root.Screen name="FirstRun" component={S.FirstRunScreen} />
        ) : (
          <Root.Screen name="Main" component={MainStack} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}
