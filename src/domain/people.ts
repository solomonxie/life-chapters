import { opens } from './kinds';
import type { Anchor, DocumentRecord, Person, Playbook, StepInstance, Track } from './types';

export const ME = 'me';
export const ME_PERSON: Person = { id: ME, name: 'Me' };

/** Records from before people existed belong to "me". */
export const ownerOf = (x: { personId?: string }) => x.personId ?? ME;

/** Kinds that tie two people together, and what the other side sees. */
export const LINKED_KINDS: Record<string, string> = {
  'child-born': 'born',
  married: 'married',
};

export const isLinkedKind = (kind: string) => kind in LINKED_KINDS;

/**
 * The date a plan opened by `event` hangs on: the event itself, the person's
 * own Born, or the linked child's Born. Undefined when that date doesn't exist yet.
 */
export function countsFrom(
  pb: Playbook,
  event: Pick<Anchor, 'kind' | 'personId' | 'linkId'> & { id?: string },
  anchors: Anchor[],
): Anchor | undefined {
  const from = opens(event.kind, pb);
  if (from === 'self') return anchors.find(a => a.id === event.id) ?? (event as Anchor);
  if (from === 'born') return anchors.find(a => a.kind === 'born' && ownerOf(a) === ownerOf(event));
  if (from === 'child') return event.linkId ? anchors.find(a => a.kind === 'born' && a.linkId === event.linkId) : undefined;
  return undefined;
}

export function trackOwner(track: Track, anchors: Anchor[]): string {
  if (track.personId) return track.personId;
  const anchor = anchors.find(a => a.id === track.anchorId);
  return anchor ? ownerOf(anchor) : ME;
}

export interface Scoped {
  anchors: Anchor[];
  tracks: Track[];
  instances: StepInstance[];
  documents: DocumentRecord[];
}

/**
 * One person's board. A linked event names the other person by their current
 * name, so renaming Ava renames "Ava born" too.
 */
export function scopeTo(
  personId: string,
  plan: Scoped & { people: Person[] },
): Scoped {
  const nameOf = (id: string) => plan.people.find(p => p.id === id)?.name;
  const anchors = plan.anchors
    .filter(a => ownerOf(a) === personId)
    .map(a =>
      a.withPersonId && a.kind !== 'born' ? { ...a, place: nameOf(a.withPersonId) ?? a.place } : a,
    );
  const tracks = plan.tracks.filter(t => trackOwner(t, plan.anchors) === personId);
  const trackIds = new Set(tracks.map(t => t.id));
  return {
    anchors,
    tracks,
    instances: plan.instances.filter(i => trackIds.has(i.trackId)),
    documents: plan.documents.filter(d => ownerOf(d) === personId),
  };
}

/** The same event as the other person sees it: "Ava born" on mine is "Born" on hers. */
export function mirrorOf(anchor: Anchor, id: string, otherId: string, ownName: string): Anchor {
  const kind = LINKED_KINDS[anchor.kind];
  return {
    id,
    kind,
    label: kind === 'born' ? 'Born' : anchor.label,
    place: kind === 'born' ? undefined : ownName,
    location: anchor.location,
    date: anchor.date,
    precision: anchor.precision,
    personId: otherId,
    withPersonId: ownerOf(anchor),
    linkId: anchor.linkId,
  };
}
