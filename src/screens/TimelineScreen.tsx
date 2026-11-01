import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { diffDays } from '../domain/dates';
import { formatLasts, formatMonth, formatPrecise } from '../domain/format';
import { ME, menuPeople } from '../domain/people';
import { placeShort } from '../domain/places';
import {
  lateSteps,
  openSteps,
  timelineNodes,
  type TimelineNode,
} from '../domain/plan';
import { useNav } from '../navigation/routes';
import { useDemo } from '../state/demo';
import { actions, useStore } from '../state/store';
import {
  Button,
  Card,
  EmptyState,
  ListRow,
  Rows,
  SectionHeader,
  space,
  type,
  usePalette,
} from '../ui';
import { PlansSection } from './PlansSection';

/** The whole app on one page: whose board, their paperwork, their events, their plans, then Settings. */
export function TimelineScreen() {
  const p = usePalette();
  const nav = useNav();
  const plan = useStore(s => s.mine);
  const view = useStore(s => s.mine.view);
  const people = useStore(s => s.plan.people);
  const allAnchors = useStore(s => s.plan.anchors);
  const now = useStore(s => s.now);
  const demo = useDemo(s => s.on);
  const [menu, setMenu] = useState(false);
  const scroll = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const plansY = useRef(0);
  const person = plan.person;
  const isMe = person.id === ME;

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <Pressable
          onPress={() => setMenu(m => !m)}
          hitSlop={8}
          style={styles.title}
          accessibilityRole="button"
          accessibilityLabel={`Paper Works, showing ${
            isMe ? 'you' : person.name
          }. Switch person`}
          accessibilityState={{ expanded: menu }}
        >
          <Text
            maxFontSizeMultiplier={1.4}
            style={[type.headline, { color: p.text }]}
          >
            Paper Works {menu ? '▴' : '▾'}
          </Text>
          {!isMe ? (
            <Text
              maxFontSizeMultiplier={1.4}
              style={[type.caption, { color: p.dim }]}
              numberOfLines={1}
            >
              {person.name}
            </Text>
          ) : null}
        </Pressable>
      ),
    });
  }, [nav, menu, person.name, isMe, p]);

  const nodes = useMemo(
    () =>
      timelineNodes(plan.anchors, plan.tracks, view.steps, now)
        .filter(n => n.source === 'anchor')
        .map(n => {
          const a = plan.anchors.find(x => x.id === n.anchorId);
          const other = a?.withPersonId
            ? people.find(x => x.id === a.withPersonId)
            : undefined;
          return {
            ...n,
            noted: !!a?.note,
            where: a?.location ? placeShort(a.location) : undefined,
            person: other && {
              id: other.id,
              name: other.name,
              role: a?.kind === 'born' ? 'parent' : undefined,
            },
          };
        }),
    [plan.anchors, plan.tracks, view.steps, now, people],
  );
  const open = openSteps(view.steps);
  const running = open.filter(s => s.startBy <= now).length;
  const next = open
    .filter(s => s.startBy > now)
    .sort((a, b) => (a.startBy < b.startBy ? -1 : 1))[0];
  const late = lateSteps(view.steps, now).length;
  const upcoming = nodes.filter(n => n.date > now);
  const past = nodes.filter(n => n.date <= now).reverse();
  const openEvent = (n: EventNode) =>
    n.source === 'anchor' && n.date <= now
      ? nav.navigate('AnchorEdit', { anchorId: n.id })
      : nav.navigate('Chapter', { eventId: n.id });

  const go = (fn: () => void) => {
    setMenu(false);
    fn();
  };
  const remove = () =>
    Alert.alert(
      `Remove ${person.name}?`,
      'Their events and plans go. Events on other boards stay.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => go(() => actions.removePerson(person.id)),
        },
      ],
    );

  return (
    <ScrollView
      ref={scroll}
      style={{ backgroundColor: p.bg }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      {menu ? (
        <Card style={styles.menu}>
          <Rows>
            {menuPeople(people, allAnchors, person.id).map(x => (
              <ListRow
                key={x.id}
                label={`${x.id === person.id ? '✓ ' : '   '}${x.name}`}
                chevron={false}
                accessibilityLabel={`${x.name}${
                  x.id === person.id ? ', showing' : ''
                }`}
                onPress={() => go(() => actions.switchPerson(x.id))}
              />
            ))}
            <ListRow
              label="＋ New person"
              onPress={() => go(() => nav.navigate('Person', { mode: 'new' }))}
            />
            <ListRow
              label={`Link a person to ${person.name}`}
              detail="A child, partner or parent, joined by the event that ties you"
              onPress={() => go(() => nav.navigate('Person', { mode: 'link' }))}
            />
            <ListRow
              label={`Rename ${person.name}`}
              onPress={() =>
                go(() =>
                  nav.navigate('Person', {
                    mode: 'rename',
                    personId: person.id,
                  }),
                )
              }
            />
            {!isMe ? (
              <ListRow
                label={`Remove ${person.name}`}
                tone="late"
                chevron={false}
                onPress={remove}
              />
            ) : null}
          </Rows>
        </Card>
      ) : null}

      {plan.anchors.length === 0 ? (
        <EmptyState
          title={isMe ? 'Paper Works' : person.name}
          body="Add the event your paperwork is for — a move, a trip, a new baby, a visa — and the forms it needs line up in order."
          action="Add an event"
          onAction={() => nav.navigate('AnchorEdit')}
        />
      ) : (
        <>
          <SectionHeader title="Paperwork" />
          <Card>
            <Rows>
              {late > 0 ? (
                <ListRow
                  label={`⚠ ${late} step${late === 1 ? ' is' : 's are'} late`}
                  tone="late"
                  onPress={() =>
                    scroll.current?.scrollTo({ y: plansY.current })
                  }
                />
              ) : null}
              <ListRow
                label={stepsLine(
                  running,
                  next ? diffDays(now, next.startBy) : null,
                  plan.tracks.length,
                )}
                tone={plan.tracks.length ? 'normal' : 'dim'}
                onPress={() => scroll.current?.scrollTo({ y: plansY.current })}
              />
            </Rows>
          </Card>

          {upcoming.length ? (
            <EventList title="Coming up" nodes={upcoming} onPress={openEvent} />
          ) : null}
          {past.length ? (
            <EventList title="Past" nodes={past} onPress={openEvent} />
          ) : null}

          <Button
            title="+ Add an event"
            kind="plain"
            onPress={() => nav.navigate('AnchorEdit')}
            style={styles.add}
          />

          <View onLayout={e => (plansY.current = e.nativeEvent.layout.y)}>
            <PlansSection navigation={nav} />
          </View>
        </>
      )}

      <Card style={styles.settings}>
        <ListRow
          label="Settings"
          value={demo ? 'demo data' : undefined}
          onPress={() => nav.navigate('Settings')}
        />
      </Card>
    </ScrollView>
  );
}

type EventNode = TimelineNode & { noted?: boolean; where?: string };

/** Each event with its date, place, length and how many steps it still needs. */
function EventList({
  title,
  nodes,
  onPress,
}: {
  title: string;
  nodes: EventNode[];
  onPress: (n: EventNode) => void;
}) {
  return (
    <>
      <SectionHeader title={title} />
      <Card>
        <Rows>
          {nodes.map(n => (
            <ListRow
              key={n.id}
              label={`${n.label}${n.noted ? ' ✎' : ''}`}
              detail={[
                formatPrecise(n.date, n.precision),
                n.where,
                n.end ? formatLasts(n.date, n.end) : undefined,
              ]
                .filter(Boolean)
                .join(' · ')}
              value={n.pendingSteps ? `${n.pendingSteps} to do` : undefined}
              tone={n.pendingSteps ? 'normal' : 'dim'}
              onPress={() => onPress(n)}
            />
          ))}
        </Rows>
      </Card>
    </>
  );
}

const stepsLine = (running: number, nextIn: number | null, tracks: number) => {
  if (tracks === 0) return 'No paperwork plans yet';
  const parts = [`${running} step${running === 1 ? '' : 's'} running`];
  if (nextIn !== null) parts.push(`next starts in ${nextIn}d`);
  return parts.join(' · ');
};

/** Sep 2024 ───●──── Sep 2029, ● at today. */
export function ChapterBar({
  start,
  end,
  now,
}: {
  start: string;
  end: string | null;
  now: string;
}) {
  const p = usePalette();
  const ratio = end
    ? Math.min(1, Math.max(0, diffDays(start, now) / diffDays(start, end)))
    : 0.5;
  return (
    <View style={styles.bar}>
      <Text style={[type.caption, { color: p.dim }]}>{formatMonth(start)}</Text>
      <View style={styles.track}>
        <View style={[styles.line, { backgroundColor: p.hairline }]} />
        <View
          style={[
            styles.line,
            styles.lineDone,
            { width: `${ratio * 100}%`, backgroundColor: p.accent },
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              left: `${ratio * 100}%`,
              backgroundColor: p.accent,
              borderColor: p.card,
            },
          ]}
        />
      </View>
      <Text style={[type.caption, { color: p.dim }]}>
        {end ? formatMonth(end) : '…'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { paddingBottom: 120 },
  title: { alignItems: 'center' },
  menu: { marginTop: space.sm },
  settings: { marginTop: space.xl },
  add: { alignSelf: 'flex-start', marginLeft: space.lg, marginTop: space.md },
  bar: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  track: { flex: 1, height: 14, justifyContent: 'center' },
  line: { position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 1 },
  lineDone: { right: undefined },
  dot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: -7,
    borderWidth: 2,
  },
});
