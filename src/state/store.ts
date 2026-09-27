import { create } from 'zustand';
import { BUNDLED_PLAYBOOKS } from '../content';
import { resolve, today } from '../domain/dates';
import { docId, planView, trackAnchorDate, type PlanView } from '../domain/plan';
import { recordMoves, summarize, type Moves } from '../domain/radar';
import { planRedo } from '../domain/schedule';
import type {
  Anchor,
  CivilDate,
  DocumentRecord,
  Entry,
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

export interface AppState {
  ready: boolean;
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

function derive(plan: Plan, now: CivilDate) {
  const userIds = new Set(plan.playbooks.map(p => p.id));
  const playbooks = [
    ...BUNDLED_PLAYBOOKS.filter(p => !userIds.has(p.id)),
    ...plan.playbooks,
  ];
  return {
    playbooks,
    view: planView(playbooks, plan.tracks, plan.anchors, plan.instances, now),
  };
}

let repo: Repository | null = null;
let toastSeq = 0;

const initialNow = today();

export const useStore = create<AppState>(() => ({
  ready: false,
  now: initialNow,
  plan: EMPTY_PLAN,
  settings: DEFAULT_SETTINGS,
  moves: {},
  ...derive(EMPTY_PLAN, initialNow),
  toast: null,
  undoSnapshot: null,
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
  const derived = derive(next, s.now);
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

export const actions = {
  async load(repository: Repository) {
    repo = repository;
    const stored = await repository.load();
    const plan = stored
      ? {
          anchors: stored.anchors,
          playbooks: stored.playbooks,
          tracks: stored.tracks,
          instances: stored.instances,
          documents: stored.documents,
          entries: stored.entries ?? [],
        }
      : EMPTY_PLAN;
    const now = today();
    set({
      ready: true,
      now,
      plan,
      settings: stored?.settings ?? DEFAULT_SETTINGS,
      moves: stored?.moves ?? {},
      ...derive(plan, now),
    });
  },

  /** Day rolled over while the app slept. */
  refreshToday() {
    const now = today();
    if (now === get().now) return;
    set({ now, ...derive(get().plan, now) });
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
      ...derive(snap.plan, get().now),
      undoSnapshot: null,
      toast: { id: ++toastSeq, message: 'Undone.', undoable: false },
    });
    persist();
  },

  // ── Anchors ──────────────────────────────────────────────────────────────

  saveAnchor(anchor: Omit<Anchor, 'id'> & { id?: string }, attach: string[] = []) {
    const { plan, playbooks } = get();
    const isNew = !anchor.id;
    const saved: Anchor = { ...anchor, id: anchor.id ?? newId() };
    const date = resolve(saved.date, saved.precision);

    let tracks = plan.tracks.map(t =>
      t.anchorId === saved.id ? { ...t, anchorEventDate: date } : t,
    );
    let instances = plan.instances;
    for (const playbookId of attach) {
      const playbook = playbooks.find(p => p.id === playbookId);
      if (!playbook) continue;
      const track: Track = { id: newId(), playbookId, anchorId: saved.id, anchorEventDate: date };
      tracks = [...tracks, track];
      instances = [...instances, ...instancesFor(track, playbook)];
    }

    commit(
      {
        ...plan,
        anchors: isNew
          ? [...plan.anchors, saved]
          : plan.anchors.map(a => (a.id === saved.id ? saved : a)),
        tracks,
        instances,
      },
      {
        cause: `${saved.label} moved`,
        toast: ({ moved }) =>
          moved > 0 ? `${plural(moved, 'step')} rescheduled.` : null,
      },
    );
    return saved.id;
  },

  deleteAnchor(id: string) {
    const { plan } = get();
    const gone = new Set(plan.tracks.filter(t => t.anchorId === id).map(t => t.id));
    commit(
      {
        ...plan,
        anchors: plan.anchors.filter(a => a.id !== id),
        tracks: plan.tracks.filter(t => !gone.has(t.id)),
        instances: plan.instances.filter(i => !gone.has(i.trackId)),
        entries: plan.entries.map(e => (e.anchorId === id ? { ...e, anchorId: undefined } : e)),
      },
      { cause: 'A date was deleted', toast: () => 'Date deleted.' },
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
    const title = playbooks.find(p => p.id === track?.playbookId)?.title ?? 'Track';
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
    if (checking && !next.documents.some(d => d.id === key)) {
      next = { ...next, documents: [...next.documents, { id: key, name, issuedOn: s.now }] };
    }
    commit(next, { cause: 'Document', exclude: [id], toast: () => null });
  },

  // ── Documents ────────────────────────────────────────────────────────────

  saveDocument(doc: DocumentRecord) {
    const { plan } = get();
    const exists = plan.documents.some(d => d.id === doc.id);
    commit(
      {
        ...plan,
        documents: exists
          ? plan.documents.map(d => (d.id === doc.id ? doc : d))
          : [...plan.documents, doc],
      },
      { cause: `${doc.name} updated`, toast: () => null },
    );
  },

  forgetDocument(id: string) {
    const { plan } = get();
    const name = plan.documents.find(d => d.id === id)?.name;
    commit(
      {
        ...plan,
        documents: plan.documents.filter(d => d.id !== id),
        instances: plan.instances.map(i => ({
          ...i,
          checkedDocuments: i.checkedDocuments.filter(n => docId(n) !== id),
        })),
      },
      { cause: 'Document forgotten', toast: () => `${name ?? 'Document'} forgotten.` },
    );
  },

  // ── Journal ──────────────────────────────────────────────────────────────

  /** Stories don't move any dates, so no reflow toast — just keep them. */
  saveEntry(entry: Omit<Entry, 'id' | 'createdOn' | 'updatedOn'> & { id?: string }) {
    const { plan, now } = get();
    const existing = plan.entries.find(e => e.id === entry.id);
    const saved: Entry = {
      ...entry,
      id: entry.id ?? newId(),
      createdOn: existing?.createdOn ?? now,
      updatedOn: now,
    };
    commit(
      {
        ...plan,
        entries: existing
          ? plan.entries.map(e => (e.id === saved.id ? saved : e))
          : [...plan.entries, saved],
      },
      { cause: 'Story', toast: () => null },
    );
    return saved.id;
  },

  deleteEntry(id: string) {
    const { plan } = get();
    commit(
      { ...plan, entries: plan.entries.filter(e => e.id !== id) },
      { cause: 'Story deleted', toast: () => 'Story deleted.' },
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

  replacePlan(plan: Plan) {
    commit(plan, { cause: 'Backup imported', toast: () => 'Plan replaced from the backup.' });
  },

  updateSettings(patch: Partial<Settings>) {
    set({ settings: { ...get().settings, ...patch } });
    persist();
  },
};
