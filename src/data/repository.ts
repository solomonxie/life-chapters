import type {
  Anchor,
  DocumentRecord,
  Playbook,
  StepInstance,
  Track,
} from '../domain/types';

/**
 * Everything the app persists. SQLite lands behind this interface later
 * (docs/IMPLEMENT_PLAN.md T2.5); the in-memory store below is what the screens
 * develop against until then.
 */
export interface Repository {
  anchors(): Promise<Anchor[]>;
  saveAnchor(anchor: Anchor): Promise<void>;
  deleteAnchor(id: string): Promise<void>;

  playbooks(): Promise<Playbook[]>;
  savePlaybook(playbook: Playbook): Promise<void>;

  tracks(): Promise<Track[]>;
  saveTrack(track: Track): Promise<void>;
  deleteTrack(id: string): Promise<void>;

  instances(trackId?: string): Promise<StepInstance[]>;
  saveInstance(instance: StepInstance): Promise<void>;

  documents(): Promise<DocumentRecord[]>;
  saveDocument(doc: DocumentRecord): Promise<void>;
}

export interface Seed {
  anchors?: Anchor[];
  playbooks?: Playbook[];
  tracks?: Track[];
  instances?: StepInstance[];
  documents?: DocumentRecord[];
}

export function createMemoryRepository(seed: Seed = {}): Repository {
  const anchors = new Map((seed.anchors ?? []).map(a => [a.id, a]));
  const playbooks = new Map((seed.playbooks ?? []).map(p => [p.id, p]));
  const tracks = new Map((seed.tracks ?? []).map(t => [t.id, t]));
  const instances = new Map((seed.instances ?? []).map(i => [i.id, i]));
  const documents = new Map((seed.documents ?? []).map(d => [d.id, d]));

  return {
    anchors: async () => [...anchors.values()],
    saveAnchor: async a => {
      anchors.set(a.id, a);
    },
    deleteAnchor: async id => {
      anchors.delete(id);
    },

    playbooks: async () => [...playbooks.values()],
    savePlaybook: async p => {
      playbooks.set(p.id, p);
    },

    tracks: async () => [...tracks.values()],
    saveTrack: async t => {
      tracks.set(t.id, t);
    },
    deleteTrack: async id => {
      tracks.delete(id);
    },

    instances: async trackId =>
      [...instances.values()].filter(
        i => trackId === undefined || i.trackId === trackId,
      ),
    saveInstance: async i => {
      instances.set(i.id, i);
    },

    documents: async () => [...documents.values()],
    saveDocument: async d => {
      documents.set(d.id, d);
    },
  };
}
