import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import {
  AnchorEditScreen,
  DocsScreen,
  DocumentScreen,
  RadarScreen,
  SettingsScreen,
  StepScreen,
  TimelineScreen,
  TracksScreen,
} from '../screens';
import { usePalette } from '../ui';

export type TimelineStackParams = {
  Timeline: undefined;
  AnchorEdit: { anchorId?: string } | undefined;
  Settings: undefined;
  Step: { instanceId: string };
};

export type RadarStackParams = {
  Radar: undefined;
  Step: { instanceId: string };
};

export type TracksStackParams = {
  Tracks: undefined;
  Step: { instanceId: string };
};

export type DocsStackParams = {
  Docs: undefined;
  Document: { documentId: string };
};

const TimelineStack = createNativeStackNavigator<TimelineStackParams>();
const RadarStack = createNativeStackNavigator<RadarStackParams>();
const TracksStack = createNativeStackNavigator<TracksStackParams>();
const DocsStack = createNativeStackNavigator<DocsStackParams>();
const Tabs = createBottomTabNavigator();

function TimelineFlow() {
  const palette = usePalette();
  return (
    <TimelineStack.Navigator>
      <TimelineStack.Screen
        name="Timeline"
        component={TimelineScreen}
        options={({ navigation }) => ({
          title: 'Life Planner',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              accessibilityRole="button"
              accessibilityLabel="Settings">
              <Text style={[styles.gear, { color: palette.accent }]}>⚙</Text>
            </Pressable>
          ),
        })}
      />
      <TimelineStack.Screen
        name="AnchorEdit"
        component={AnchorEditScreen}
        options={{ title: 'Add a date', presentation: 'modal' }}
      />
      <TimelineStack.Screen name="Settings" component={SettingsScreen} />
      <TimelineStack.Screen name="Step" component={StepScreen} />
    </TimelineStack.Navigator>
  );
}

function RadarFlow() {
  return (
    <RadarStack.Navigator>
      <RadarStack.Screen name="Radar" component={RadarScreen} />
      <RadarStack.Screen name="Step" component={StepScreen} />
    </RadarStack.Navigator>
  );
}

function TracksFlow() {
  return (
    <TracksStack.Navigator>
      <TracksStack.Screen name="Tracks" component={TracksScreen} />
      <TracksStack.Screen name="Step" component={StepScreen} />
    </TracksStack.Navigator>
  );
}

function DocsFlow() {
  return (
    <DocsStack.Navigator>
      <DocsStack.Screen name="Docs" component={DocsScreen} />
      <DocsStack.Screen name="Document" component={DocumentScreen} />
    </DocsStack.Navigator>
  );
}

const TAB_GLYPH: Record<string, string> = {
  TimelineTab: '│',
  RadarTab: '◎',
  TracksTab: '≡',
  DocsTab: '🗎',
};

export function RootNavigator() {
  const scheme = useColorScheme();
  const palette = usePalette();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: palette.accent,
          tabBarIcon: ({ color }) => (
            <Text style={[styles.tabGlyph, { color }]}>
              {TAB_GLYPH[route.name] ?? '•'}
            </Text>
          ),
        })}>
        <Tabs.Screen
          name="TimelineTab"
          component={TimelineFlow}
          options={{ title: 'Timeline' }}
        />
        <Tabs.Screen
          name="RadarTab"
          component={RadarFlow}
          options={{ title: 'Radar' }}
        />
        <Tabs.Screen
          name="TracksTab"
          component={TracksFlow}
          options={{ title: 'Tracks' }}
        />
        <Tabs.Screen
          name="DocsTab"
          component={DocsFlow}
          options={{ title: 'Docs' }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gear: { fontSize: 18 },
  tabGlyph: { fontSize: 16 },
});
