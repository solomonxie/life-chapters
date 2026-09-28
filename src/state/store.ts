import { create } from 'zustand';
import { BUNDLED_PLAYBOOKS } from '../content';
import { resolve, today } from '../domain/dates';
import { docId, planView, trackAnchorDate, type PlanView } from '../domain/plan';
import { LINKED_KINDS, ME, ME_PERSON, countsFrom, isLinkedKind, mirrorOf, ownerOf, scopeTo, type Scoped } from '../domain/people';
import { livesIn, type Where } from '../domain/regions';
import { recordMoves, summarize, type Moves } from '../domain/radar';
import { planRedo } from '../domain/schedule';
import type {
  Anchor,
  CivilDate,
  Person,
  DocumentRecord,
  Playbook,
  StepInstance,
  Track,
} from '../domain/types';
import {
  DEFAULT_SETTINGS,
  EMPTY_PLAN,
  type Plan,
  type Settings,
} from '../data/plan';
import type { Repository } from '../data/repository';

export interface Toast {
  id: number;
  message: string;
  undoable: boolean;
}

interface Snapshot {
  plan: Plan;
  moves: Moves;
}

/** The board on screen: one person's dates, plans, steps and documents. */
export interface Mine extends Scoped {
  person: Person;
  /** Country and province: set on the person, or inferred from their events. */
  where: Where;
  view: PlanView;
}

/** What the last plan change was, for the change log. */
export interface LastChange {
  cause: string;
  detail: string | null;
  person: string;
}

export interface AppState {
  ready: boolean;
  lastChange: LastChange | null;
  mine: Mine;
  now: CivilDate;
  plan: Plan;
  settings: Settings;
  moves: Moves;
  playbooks: Playbook[];
  view: PlanView;
  toast: Toast | null;
  undoSnapshot: Snapshot | null;
}

const newId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const instanceId = (trackId: string, stepId: string) => `${trackId}:${stepId}`;

function derive(plan: Plan, now: CivilDate, personId: string) {
  const userIds = new Set(plan.playbooks.map(p => p.id));
  const playbooks = [
    ...BUNDLED_PLAYBOOKS.filter(p => !userIds.has(p.id)),
    ...plan.playbooks,
  ];
  const person = plan.people.find(p => p.id === personId) ?? plan.people[0] ?? ME_PERSON;
  const scoped = scopeTo(person.id, plan);
  return {
    playbooks,
    view: planView(playbooks, plan.tracks, plan.anchors, plan.instances, now),
    mine: {
      ...scoped,
      person,
      where: livesIn(scoped.anchors, now),
      view: planView(playbooks, scoped.tracks, scoped.anchors, scoped.instances, now),
    },
  };
}

const personIdNow = () => get().settings.personId;

/** Date kinds whose shipped label changed; a date still showing the old default takes the new one. */
const RELABELED: Record<string, string> = {
  'Migrated to a country': 'Relocated to a country',
  'Lodge a visa application': 'Apply for permanent residence',
  'Visa granted': 'Permit or visa granted',
};

/** Bundled playbooks that changed id once they became provincial. */
const RENAMED: Record<string, string> = {
  'pregnancy-ca': 'pregnancy-on',
  'newborn-ca': 'newborn-on',
  'early-years-ca': 'early-years-on',
  'coming-of-age-ca': 'coming-of-age-on',
  'retirement-ca': 'retirement-on',
};

let repo: Repository | null = null;
let toastSeq = 0;

const initialNow = today();

export const useStore = create<AppState>(() => ({
  ready: false,
  now: initialNow,
  plan: EMPTY_PLAN,
  settings: DEFAULT_SETTINGS,
  moves: {},
  ...derive(EMPTY_PLAN, initialNow, ME),
  toast: null,
  undoSnapshot: null,
  lastChange: null,
}));

const get = useStore.getState;
const set = useStore.setState;

function persist() {
  const { plan, settings, moves } = get();
  repo?.save({ ...plan, settings, moves }).catch(e => console.warn('save failed', e));
}

interface CommitOptions {
  /** Few words naming the cause, kept with each move: "Police check done". */
  cause: string;
  /** Instances the user touched directly — they don't get a ▲▼. */
  exclude?: string[];
  toast?: (s: { moved: number; direction: 'earlier' | 'later' }) => string | null;
}

/** Every plan change goes through here: reflow, record what moved, persist. */
function commit(next: Plan, opts: CommitOptions) {
  const s = get();
  const derived = derive(next, s.now, s.settings.personId);
  const exclude = opts.exclude ?? [];
  const summary = summarize(s.view.steps, derived.view.steps, exclude);
  const message = opts.toast
    ? opts.toast(summary)
    : summary.moved > 0
    ? `${summary.moved} step${summary.moved === 1 ? '' : 's'} moved ${summary.direction}.`
    : null;

  set({
    plan: next,
    ...derived,
    moves: recordMoves(s.moves, s.view.steps, derived.view.steps, opts.cause, s.now, exclude),
    undoSnapshot: { plan: s.plan, moves: s.moves },
    toast: message ? { id: ++toastSeq, message, undoable: true } : s.toast,
    lastChange: { cause: opts.cause, detail: message, person: s.mine.person.name },
  });
  persist();
}

const updateInstance = (id: string, patch: (i: StepInstance) => StepInstance) => {
  const { plan } = get();
  return {
    ...plan,
    instances: plan.instances.map(i => (i.id === id ? patch(i) : i)),
  };
};

const titleOf = (id: string) =>
  get().view.steps.find(s => s.instanceId === id)?.title ?? 'Step';

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

function instancesFor(track: Track, playbook: Playbook): StepInstance[] {
  return [...playbook.steps, ...(track.extraSteps ?? [])].map(step => ({
    id: instanceId(track.id, step.id),
    trackId: track.id,
    stepId: step.id,
    status: 'pending',
    checkedDocuments: [],
    checkedPrepare: [],
  }));
}

function linkParent(name: string, date: CivilDate, precision: Anchor['precision']) {
  const { plan, mine } = get();
  const childId = mine.person.id;
  let anchors = plan.anchors;
  let people = plan.people;
  let born = mine.anchors.find(a => a.kind === 'born');
  const linkId = born?.linkId ?? newId();
  if (born) {
    anchors = anchors.map(a => (a.id === born!.id ? { ...a, linkId } : a));
  } else {
    born = { id: newId(), kind: 'born', label: 'Born', date, precision, personId: childId, linkId };
    anchors = [...anchors, born];
  }
  let parent = people.find(p => p.id !== childId && p.name.toLowerCase() === name.trim().toLowerCase());
  if (!parent) {
    parent = { id: newId(), name: name.trim() };
    people = [...people, parent];
  }
  const childName = mine.person.name;
  const already = anchors.some(a => a.linkId === linkId && ownerOf(a) === parent!.id);
  if (!already) {
    anchors = [
      ...anchors,
      {
        id: newId(),
        kind: 'child-born',
        label: 'Child born',
        place: childName,
        date: born.date,
        precision: born.precision,
        personId: parent.id,
        withPersonId: childId,
        linkId,
      },
    ];
  }
  commit({ ...plan, people, anchors }, { cause: `${parent.name} linked`, toast: () => null });
  return parent.id;
}

export const actions = {
  async load(repository: Repository) {
    repo = repository;
    const stored = await repository.load();
    const plan = stored
      ? {
          people: stored.people?.length ? stored.people : [ME_PERSON],
          anchors: stored.anchors.map(a => ({ ...a, label: RELABELED[a.label] ?? a.label })),
          playbooks: stored.playbooks,
          tracks: stored.tracks.map(t => ({ ...t, playbookId: RENAMED[t.playbookId] ?? t.playbookId })),
          instances: stored.instances,
          documents: stored.documents,
        }
      : EMPTY_PLAN;
    const now = today();
    const saved = stored?.settings ?? DEFAULT_SETTINGS;
    const settings = plan.people.some(x => x.id === saved.personId) ? saved : { ...saved, personId: ME };
    set({
      ready: true,
      now,
      plan,
      settings,
      moves: stored?.moves ?? {},
      ...derive(plan, now, settings.personId),
    });
  },

  /** Day rolled over while the app slept. */
  refreshToday() {
    const now = today();
    if (now === get().now) return;
    set({ now, ...derive(get().plan, now, personIdNow()) });
  },

  dismissToast() {
    set({ toast: null });
  },

  undo() {
    const snap = get().undoSnapshot;
    if (!snap) return;
    set({
      plan: snap.plan,
      moves: snap.moves,
      ...derive(snap.plan, get().now, personIdNow()),
      undoSnapshot: null,
      toast: { id: ++toastSeq, message: 'Undone.', undoable: false },
      lastChange: { cause: 'Undone', detail: get().lastChange?.cause ?? null, person: get().mine.person.name },
    });
    persist();
  },

  // ── Anchors ──────────────────────────────────────────────────────────────

  /**
   * `withName` on a spouse or child event links that person: found by name or
   * created, and given the same event on their own board.
   */
  saveAnchor(anchor: Omit<Anchor, 'id'> & { id?: string }, attach: string[] = [], withName?: string) {
    const { plan, playbooks } = get();
    const existing = plan.anchors.find(a => a.id === anchor.id);
    const personId = anchor.personId ?? existing?.personId ?? personIdNow();
    let saved: Anchor = {
      ...existing,
      ...anchor,
      id: anchor.id ?? newId(),
      personId,
    };
    let people = plan.people;
    let anchors = plan.anchors;

    const name = withName?.trim();
    if (isLinkedKind(saved.kind) && name) {
      let other = people.find(p => p.id !== personId && p.name.toLowerCase() === name.toLowerCase());
      if (!other) {
        other = { id: newId(), name };
        people = [...people, other];
      }
      saved = { ...saved, withPersonId: other.id, place: other.name, linkId: saved.linkId ?? newId() };
      const ownName = people.find(p => p.id === personId)?.name ?? 'Me';
      const mirrorKind = LINKED_KINDS[saved.kind];
      const mirror = anchors.find(
        a =>
          a.linkId === saved.linkId &&
          a.id !== saved.id &&
          a.kind === mirrorKind &&
          (mirrorKind === 'born' || ownerOf(a) !== personId),
      );
      const next = mirrorOf(saved, mirror?.id ?? newId(), other.id, ownName);
      anchors = mirror
        ? anchors.map(a =>
            a.id === mirror.id ? { ...a, ...next, place: next.place ?? a.place, location: next.location } : a,
          )
        : [...anchors, next];
    } else if (saved.linkId) {
      anchors = anchors.map(a =>
        a.linkId === saved.linkId && a.id !== saved.id
          ? { ...a, date: saved.date, precision: saved.precision, location: saved.location }
          : a,
      );
    }
    anchors = existing ? anchors.map(a => (a.id === saved.id ? saved : a)) : [...anchors, saved];

    const moved = new Map(
      anchors.filter(a => a.linkId && a.linkId === saved.linkId).map(a => [a.id, a]),
    );
    moved.set(saved.id, saved);
    let tracks = plan.tracks.map(t => {
      const a = t.anchorId ? moved.get(t.anchorId) : undefined;
      return a ? { ...t, anchorEventDate: resolve(a.date, a.precision) } : t;
    });
    let instances = plan.instances;
    for (const playbookId of attach) {
      const playbook = playbooks.find(p => p.id === playbookId);
      const on = playbook && countsFrom(playbook, saved, anchors);
      if (!playbook || !on) continue;
      const track: Track = {
        id: newId(),
        playbookId,
        personId: ownerOf(on),
        anchorId: on.id,
        anchorEventDate: resolve(on.date, on.precision),
      };
      tracks = [...tracks, track];
      instances = [...instances, ...instancesFor(track, playbook)];
    }

    commit(
      { ...plan, people, anchors, tracks, instances },
      {
        cause: `${saved.label} moved`,
        toast: ({ moved }) =>
          moved > 0 ? `${plural(moved, 'step')} rescheduled.` : null,
      },
    );
    return saved.id;
  },

  /** Takes the other person's copy of a linked event with it; the person stays. */
  deleteAnchor(id: string) {
    const { plan } = get();
    const linkId = plan.anchors.find(a => a.id === id)?.linkId;
    const ids = new Set(plan.anchors.filter(a => a.id === id || (linkId && a.linkId === linkId)).map(a => a.id));
    const gone = new Set(plan.tracks.filter(t => t.anchorId && ids.has(t.anchorId)).map(t => t.id));
    commit(
      {
        ...plan,
        anchors: plan.anchors.filter(a => !ids.has(a.id)),
        tracks: plan.tracks.filter(t => !gone.has(t.id)),
        instances: plan.instances.filter(i => !gone.has(i.trackId)),
      },
      { cause: 'An event was deleted', toast: () => 'Event deleted.' },
    );
  },

  // ── Tracks ───────────────────────────────────────────────────────────────

  attachTrack(playbookId: string, anchorId: string) {
    const { plan, playbooks } = get();
    const playbook = playbooks.find(p => p.id === playbookId);
    const anchor = plan.anchors.find(a => a.id === anchorId);
    if (!playbook || !anchor) return null;
    const track: Track = {
      id: newId(),
      playbookId,
      personId: ownerOf(anchor),
      anchorId,
      anchorEventDate: resolve(anchor.date, anchor.precision),
    };
    commit(
      {
        ...plan,
        tracks: [...plan.tracks, track],
        instances: [...plan.instances, ...instancesFor(track, playbook)],
      },
      {
        cause: `${playbook.title} attached`,
        toast: () => `${playbook.title} attached · ${plural(playbook.steps.length, 'step')}.`,
      },
    );
    return track.id;
  },

  reanchorTrack(trackId: string, anchorId: string) {
    const { plan } = get();
    const anchor = plan.anchors.find(a => a.id === anchorId);
    if (!anchor) return;
    commit(
      {
        ...plan,
        tracks: plan.tracks.map(t =>
          t.id === trackId
            ? { ...t, anchorId, anchorEventDate: resolve(anchor.date, anchor.precision) }
            : t,
        ),
      },
      { cause: `Now anchored on ${anchor.label}` },
    );
  },

  detachTrack(trackId: string) {
    const { plan, playbooks } = get();
    const track = plan.tracks.find(t => t.id === trackId);
    const title = playbooks.find(p => p.id === track?.playbookId)?.title ?? 'Plan';
    commit(
      {
        ...plan,
        tracks: plan.tracks.filter(t => t.id !== trackId),
        instances: plan.instances.filter(i => i.trackId !== trackId),
      },
      { cause: `${title} detached`, toast: () => `${title} detached.` },
    );
  },

  planRedo(trackId: string, sourceStepId: string, consumerStepId: string) {
    const { plan, playbooks, view } = get();
    const track = plan.tracks.find(t => t.id === trackId);
    const playbook = playbooks.find(p => p.id === track?.playbookId);
    if (!track || !playbook) return null;
    const anchored = { ...track, anchorEventDate: trackAnchorDate(track, plan.anchors) };
    const scheduled = view.steps.filter(s => s.trackId === trackId);
    const next = planRedo(playbook, anchored, sourceStepId, consumerStepId, scheduled);
    const redo = next.extraSteps?.[next.extraSteps.length - 1];
    if (!redo || next === anchored) return null;
    const saved = { ...next, anchorEventDate: track.anchorEventDate };
    commit(
      {
        ...plan,
        tracks: plan.tracks.map(t => (t.id === trackId ? saved : t)),
        instances: [
          ...plan.instances,
          {
            id: instanceId(trackId, redo.id),
            trackId,
            stepId: redo.id,
            status: 'pending',
            checkedDocuments: [],
            checkedPrepare: [],
          },
        ],
      },
      {
        cause: `Redo of ${redo.title.replace(/ \(redo\)$/, '')} planned`,
        toast: () => `Redo planned: ${redo.title.replace(/ \(redo\)$/, '')}.`,
      },
    );
    return instanceId(trackId, redo.id);
  },

  // ── Steps ────────────────────────────────────────────────────────────────

  markDone(id: string, on: CivilDate = get().now) {
    commit(
      updateInstance(id, i => ({ ...i, status: 'done', completedOn: on, snoozedUntil: undefined })),
      {
        cause: `${titleOf(id)} done`,
        exclude: [id],
        toast: ({ moved, direction }) =>
          moved === 0
            ? 'Done.'
            : `Done. ${plural(moved, 'later step')} moved ${direction}.`,
      },
    );
  },

  reopen(id: string) {
    commit(
      updateInstance(id, i => ({ ...i, status: 'pending', completedOn: undefined })),
      { cause: `${titleOf(id)} reopened`, exclude: [id] },
    );
  },

  snooze(id: string, until: CivilDate) {
    commit(
      updateInstance(id, i => ({ ...i, status: 'snoozed', snoozedUntil: until })),
      { cause: `${titleOf(id)} snoozed`, exclude: [id], toast: () => 'Snoozed.' },
    );
  },

  clearSnooze(id: string) {
    commit(
      updateInstance(id, i => ({ ...i, status: 'pending', snoozedUntil: undefined })),
      { cause: `${titleOf(id)} unsnoozed`, exclude: [id] },
    );
  },

  skip(id: string) {
    commit(updateInstance(id, i => ({ ...i, status: 'skipped' })), {
      cause: `${titleOf(id)} marked not for me`,
      exclude: [id],
      toast: ({ moved, direction }) =>
        moved === 0
          ? 'Marked not for me.'
          : `Marked not for me. ${plural(moved, 'later step')} moved ${direction}.`,
    });
  },

  restore(id: string) {
    commit(updateInstance(id, i => ({ ...i, status: 'pending' })), {
      cause: `${titleOf(id)} restored`,
      exclude: [id],
    });
  },

  moveDue(id: string, date: CivilDate | undefined) {
    commit(updateInstance(id, i => ({ ...i, dueOverride: date })), {
      cause: `${titleOf(id)} due date moved`,
      exclude: [id],
    });
  },

  setNote(id: string, note: string) {
    commit(updateInstance(id, i => ({ ...i, note: note || undefined })), {
      cause: 'Note',
      exclude: [id],
      toast: () => null,
    });
  },

  togglePrepare(id: string, item: string) {
    commit(
      updateInstance(id, i => ({
        ...i,
        checkedPrepare: i.checkedPrepare.includes(item)
          ? i.checkedPrepare.filter(x => x !== item)
          : [...i.checkedPrepare, item],
      })),
      { cause: 'Prep', exclude: [id], toast: () => null },
    );
  },

  /** Checking a document also records it as held from today. */
  toggleDocument(id: string, name: string) {
    const s = get();
    const instance = s.plan.instances.find(i => i.id === id);
    const checking = !instance?.checkedDocuments.includes(name);
    let next = updateInstance(id, i => ({
      ...i,
      checkedDocuments: checking
        ? [...i.checkedDocuments, name]
        : i.checkedDocuments.filter(x => x !== name),
    }));
    const key = docId(name);
    const personId = s.mine.person.id;
    if (checking && !next.documents.some(d => d.id === key && ownerOf(d) === personId)) {
      next = { ...next, documents: [...next.documents, { id: key, name, issuedOn: s.now, personId }] };
    }
    commit(next, { cause: 'Document', exclude: [id], toast: () => null });
  },

  // ── Documents ────────────────────────────────────────────────────────────

  saveDocument(doc: DocumentRecord) {
    const { plan, mine } = get();
    const saved = { ...doc, personId: mine.person.id };
    const same = (d: DocumentRecord) => d.id === doc.id && ownerOf(d) === saved.personId;
    commit(
      {
        ...plan,
        documents: plan.documents.some(same)
          ? plan.documents.map(d => (same(d) ? saved : d))
          : [...plan.documents, saved],
      },
      { cause: `${doc.name} updated`, toast: () => null },
    );
  },

  forgetDocument(id: string) {
    const { plan, mine } = get();
    const same = (d: DocumentRecord) => d.id === id && ownerOf(d) === mine.person.id;
    const name = plan.documents.find(same)?.name;
    const own = new Set(mine.tracks.map(t => t.id));
    commit(
      {
        ...plan,
        documents: plan.documents.filter(d => !same(d)),
        instances: plan.instances.map(i =>
          own.has(i.trackId)
            ? { ...i, checkedDocuments: i.checkedDocuments.filter(n => docId(n) !== id) }
            : i,
        ),
      },
      { cause: 'Document forgotten', toast: () => `${name ?? 'Document'} forgotten.` },
    );
  },

  // ── Playbooks and backup ─────────────────────────────────────────────────

  savePlaybook(playbook: Playbook) {
    const { plan } = get();
    const exists = plan.playbooks.some(p => p.id === playbook.id);
    commit(
      {
        ...plan,
        playbooks: exists
          ? plan.playbooks.map(p => (p.id === playbook.id ? playbook : p))
          : [...plan.playbooks, playbook],
      },
      { cause: `${playbook.title} updated` },
    );
  },

  duplicatePlaybook(id: string) {
    const source = get().playbooks.find(p => p.id === id);
    if (!source) return null;
    const copy: Playbook = { ...source, id: `${source.id}-copy-${newId()}`, title: `${source.title} (copy)` };
    actions.savePlaybook(copy);
    return copy.id;
  },

  /** Back to Me if the person on screen isn't in the new plan. */
  replacePlan(plan: Plan) {
    const people = plan.people?.length ? plan.people : [ME_PERSON];
    if (!people.some(x => x.id === personIdNow())) set({ settings: { ...get().settings, personId: ME } });
    commit(plan, { cause: 'Backup imported', toast: () => 'Plan replaced from the backup.' });
  },

  updateSettings(patch: Partial<Settings>) {
    set({ settings: { ...get().settings, ...patch } });
    persist();
  },

  // ── People ───────────────────────────────────────────────────────────────

  switchPerson(personId: string) {
    const s = get();
    const settings = { ...s.settings, personId };
    set({ settings, ...derive(s.plan, s.now, personId) });
    persist();
  },

  /** A board of their own, not tied to anyone. */
  addPerson(name: string) {
    const { plan } = get();
    const person: Person = { id: newId(), name: name.trim() || 'Someone' };
    commit({ ...plan, people: [...plan.people, person] }, { cause: `${person.name} added`, toast: () => null });
    actions.switchPerson(person.id);
    return person.id;
  },

  /**
   * A child, partner or parent of whoever is on screen, joined by the event
   * that ties them. A parent gets "<name> born" tied to this person's Born.
   */
  linkPerson(
    name: string,
    relation: 'child' | 'partner' | 'parent',
    date: CivilDate,
    precision: Anchor['precision'],
  ) {
    if (relation === 'parent') return linkParent(name, date, precision);
    const kind = relation === 'child' ? 'child-born' : 'married';
    const id = actions.saveAnchor(
      { kind, label: relation === 'child' ? 'Child born' : 'Married', date, precision },
      [],
      name,
    );
    return get().plan.anchors.find(a => a.id === id)?.withPersonId ?? null;
  },

  /** Swap a plan for its twin in another province, on the same date; progress doesn't carry over. */
  switchTrack(trackId: string, playbookId: string) {
    const { plan, playbooks } = get();
    const track = plan.tracks.find(t => t.id === trackId);
    const playbook = playbooks.find(p => p.id === playbookId);
    if (!track || !playbook) return null;
    const next: Track = { ...track, id: newId(), playbookId, extraSteps: undefined, extraDependsOn: undefined };
    commit(
      {
        ...plan,
        tracks: plan.tracks.map(t => (t.id === trackId ? next : t)),
        instances: [...plan.instances.filter(i => i.trackId !== trackId), ...instancesFor(next, playbook)],
      },
      { cause: `Switched to ${playbook.title}`, toast: () => `Switched to ${playbook.title}.` },
    );
    return next.id;
  },

  renamePerson(id: string, name: string) {
    const { plan } = get();
    if (!name.trim()) return;
    commit(
      { ...plan, people: plan.people.map(p => (p.id === id ? { ...p, name: name.trim() } : p)) },
      { cause: 'Renamed', toast: () => null },
    );
  },

  /** Their board goes; events on other boards stay, no longer linked. */
  removePerson(id: string) {
    const { plan } = get();
    if (id === ME) return;
    const name = plan.people.find(p => p.id === id)?.name ?? 'Person';
    const gone = new Set(plan.tracks.filter(t => ownerOf(t) === id || plan.anchors.some(a => a.id === t.anchorId && ownerOf(a) === id)).map(t => t.id));
    if (get().settings.personId === id) actions.switchPerson(ME);
    commit(
      {
        ...plan,
        people: plan.people.filter(p => p.id !== id),
        anchors: plan.anchors
          .filter(a => ownerOf(a) !== id)
          .map(a => (a.withPersonId === id ? { ...a, withPersonId: undefined, linkId: undefined } : a)),
        tracks: plan.tracks.filter(t => !gone.has(t.id)),
        instances: plan.instances.filter(i => !gone.has(i.trackId)),
        documents: plan.documents.filter(d => ownerOf(d) !== id),
      },
      { cause: `${name} removed`, toast: () => `${name} removed.` },
    );
  },
};
