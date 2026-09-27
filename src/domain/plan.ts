import { addDays, diffDays, resolve, yearsBetween } from './dates';
import { anchorTitle, kindById } from './kinds';
import { deriveChapters } from './chapters';
import { isOpen } from './radar';
import { effectiveSteps, expiryClashes, schedule, type ExpiryClash } from './schedule';
import type {
  Anchor,
  CivilDate,
  DocumentRecord,
  LifeEvent,
  Chapter,
  Playbook,
  ScheduledStep,
  StepInstance,
  StepTemplate,
  Track,
} from './types';

/** A scheduled step with enough context to draw it anywhere. */
export interface PlannedStep extends ScheduledStep {
  trackId: string;
  playbook: Playbook;
  template: StepTemplate;
  /** 1-based position in the track's dependency order. */
  index: number;
  total: number;
}

export interface PlannedClash extends ExpiryClash {
  trackId: string;
}

export interface PlanView {
  steps: PlannedStep[];
  clashes: PlannedClash[];
  /** Tracks that couldn't be scheduled, with the reason. */
  broken: Array<{ trackId: string; error: string }>;
}

/** The date a track hangs off: its anchor, resolved for precision. */
export function trackAnchorDate(track: Track, anchors: Anchor[]): CivilDate {
  const anchor = anchors.find(a => a.id === track.anchorId);
  return anchor ? resolve(anchor.date, anchor.precision) : track.anchorEventDate;
}

/** Every attached track, scheduled. The only place the screens get dates from. */
export function planView(
  playbooks: Playbook[],
  tracks: Track[],
  anchors: Anchor[],
  instances: StepInstance[],
  now: CivilDate,
): PlanView {
  const view: PlanView = { steps: [], clashes: [], broken: [] };

  for (const t of tracks) {
    const playbook = playbooks.find(p => p.id === t.playbookId);
    if (!playbook) {
      view.broken.push({ trackId: t.id, error: 'Its playbook is missing.' });
      continue;
    }
    const track = { ...t, anchorEventDate: trackAnchorDate(t, anchors) };
    const mine = instances.filter(i => i.trackId === t.id);
    try {
      const scheduled = schedule(playbook, track, mine, now);
      const templates = new Map(effectiveSteps(playbook, track).map(s => [s.id, s]));
      scheduled.forEach((s, i) =>
        view.steps.push({
          ...s,
          trackId: t.id,
          playbook,
          template: templates.get(s.stepId)!,
          index: i + 1,
          total: scheduled.length,
        }),
      );
      for (const c of expiryClashes(scheduled, playbook, track)) {
        view.clashes.push({ ...c, trackId: t.id });
      }
    } catch (e) {
      view.broken.push({ trackId: t.id, error: (e as Error).message });
    }
  }

  return view;
}

export const openSteps = (steps: PlannedStep[]) => steps.filter(isOpen);

export const lateSteps = (steps: PlannedStep[], now: CivilDate) =>
  openSteps(steps).filter(s => s.startBy < now && !s.snoozedUntil);

// ── Timeline ────────────────────────────────────────────────────────────────

export interface TimelineNode extends LifeEvent {
  precision: Anchor['precision'];
  pendingSteps: number;
}

export function anchorDisplay(anchor: Anchor): string {
  return anchorTitle(anchor.kind, anchor.label, anchor.place);
}

/**
 * Anchors plus the one derived milestone worth showing: the next round
 * birthday. Each carries the count of open steps in tracks hanging off it.
 */
export function timelineNodes(
  anchors: Anchor[],
  tracks: Track[],
  steps: PlannedStep[],
  now: CivilDate,
): TimelineNode[] {
  const nodes: TimelineNode[] = anchors.map(a => {
    const kind = kindById(a.kind);
    const trackIds = new Set(tracks.filter(t => t.anchorId === a.id).map(t => t.id));
    return {
      id: a.id,
      label: anchorDisplay(a),
      date: resolve(a.date, a.precision),
      source: 'anchor',
      anchorId: a.id,
      chapterLabel: kind ? (a.place ? `${kind.chapter} · ${a.place}` : kind.chapter) : undefined,
      precision: a.precision,
      pendingSteps: openSteps(steps).filter(s => trackIds.has(s.trackId)).length,
    };
  });

  const born = anchors.find(a => a.kind === 'born');
  if (born) {
    const birth = resolve(born.date, born.precision);
    const age = yearsBetween(birth, now);
    const next = (Math.floor(age / 10) + 1) * 10;
    const [y, m, d] = birth.split('-');
    const date = `${Number(y) + next}-${m}-${m === '02' && d === '29' ? '28' : d}`;
    nodes.push({
      id: `turns-${next}`,
      label: `Turns ${next}`,
      date,
      source: 'derived',
      precision: born.precision === 'day' ? 'day' : 'year',
      pendingSteps: 0,
    });
  }

  return nodes.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

export const lifeChapters = (nodes: TimelineNode[], now: CivilDate): Chapter[] =>
  deriveChapters(
    nodes.filter(n => n.source === 'anchor'),
    now,
  );

export function ageOn(anchors: Anchor[], now: CivilDate): number | null {
  const born = anchors.find(a => a.kind === 'born');
  return born ? yearsBetween(resolve(born.date, born.precision), now) : null;
}

/** Steps whose due date falls inside the chapter. */
export function chapterSteps(chapter: Chapter, steps: PlannedStep[]): PlannedStep[] {
  return steps.filter(
    s => s.dueBy >= chapter.start && (chapter.end === null || s.dueBy < chapter.end),
  );
}

// ── Documents ───────────────────────────────────────────────────────────────

export const docId = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export interface DocView {
  id: string;
  name: string;
  record?: DocumentRecord;
  held: boolean;
  issuedOn?: CivilDate;
  expiresOn?: CivilDate;
  /** Every step that lists this document, in schedule order. */
  askedBy: PlannedStep[];
  /** The next open step that lists it. */
  neededBy?: PlannedStep;
  /** It dies before a step that needs it comes due. */
  clash?: { consumer: PlannedStep; source?: PlannedStep; gapDays: number };
}

export type DocGroup = 'expiring' | 'held' | 'missing';

/** Soon enough to belong in ⚠ EXPIRING even without a clash. */
export const EXPIRING_DAYS = 180;

export function documentViews(
  records: DocumentRecord[],
  view: PlanView,
  instances: StepInstance[],
): DocView[] {
  const names = new Map<string, string>();
  for (const s of view.steps) for (const n of s.template.documents) names.set(docId(n), n);
  for (const r of records) names.set(r.id, r.name);

  const checked = new Set(
    instances.flatMap(i => i.checkedDocuments.map(docId)),
  );

  return [...names].map(([id, name]) => {
    const record = records.find(r => r.id === id);
    const askedBy = view.steps
      .filter(s => s.template.documents.some(n => docId(n) === id))
      .sort((a, b) => (a.dueBy < b.dueBy ? -1 : 1));
    const producer = askedBy.find(s => s.status === 'done' && s.expiresOn);
    const validity = askedBy.find(s => s.template.validForDays)?.template.validForDays;
    const issued = record?.issuedOn ?? producer?.startBy;
    const expiresOn =
      record?.expiresOn ??
      producer?.expiresOn ??
      (issued && validity && !record?.noExpiry ? addDays(issued, validity) : undefined);
    const held = !!record?.issuedOn || checked.has(id) || !!producer;
    const neededBy = askedBy.find(s => isOpen(s) && s !== producer);

    let clash: DocView['clash'];
    const engine = view.clashes.find(c =>
      c.source.stepId === producer?.stepId && c.trackId === producer?.trackId,
    );
    if (engine) {
      const consumer = view.steps.find(
        s => s.trackId === engine.trackId && s.stepId === engine.consumer.stepId,
      )!;
      clash = { consumer, source: producer, gapDays: engine.gapDays };
    } else if (held && expiresOn) {
      const after = askedBy.find(s => isOpen(s) && s !== producer && expiresOn < s.dueBy);
      if (after) clash = { consumer: after, gapDays: diffDays(expiresOn, after.dueBy) };
    }

    return {
      id,
      name,
      record,
      held,
      issuedOn: record?.issuedOn ?? producer?.startBy,
      expiresOn,
      askedBy,
      neededBy,
      clash,
    };
  });
}

export function groupDocuments(
  docs: DocView[],
  now: CivilDate,
): Record<DocGroup, DocView[]> {
  const soon = addDays(now, EXPIRING_DAYS);
  const out: Record<DocGroup, DocView[]> = { expiring: [], held: [], missing: [] };
  for (const d of docs) {
    if (!d.held) out.missing.push(d);
    else if (d.clash || (d.expiresOn && d.expiresOn <= soon)) out.expiring.push(d);
    else out.held.push(d);
  }
  const byExpiry = (a: DocView, b: DocView) =>
    (a.expiresOn ?? '9999') < (b.expiresOn ?? '9999') ? -1 : 1;
  out.expiring.sort(byExpiry);
  out.held.sort(byExpiry);
  out.missing.sort((a, b) =>
    (a.neededBy?.startBy ?? '9999') < (b.neededBy?.startBy ?? '9999') ? -1 : 1,
  );
  return out;
}
