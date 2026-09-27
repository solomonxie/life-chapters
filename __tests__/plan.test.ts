import { BUNDLED_PLAYBOOKS } from '../src/content';
import { addDays } from '../src/domain/dates';
import {
  documentViews,
  groupDocuments,
  lifeChapters,
  planView,
  timelineNodes,
} from '../src/domain/plan';
import type { Anchor, StepInstance, Track } from '../src/domain/types';

const NOW = '2026-09-26';
const anchors: Anchor[] = [
  { id: 'b', kind: 'born', label: 'Born', place: "Xi'an", date: '1991-04-12', precision: 'day' },
  { id: 'm', kind: 'migrated', label: 'Migrated to a country', place: 'Australia', date: '2024-09-14', precision: 'day' },
  { id: 'v', kind: 'visa-lodge', label: 'Lodge a visa application', date: '2027-12-01', precision: 'day' },
];
const tracks: Track[] = [
  { id: 't', playbookId: 'skilled-migration-au', anchorId: 'v', anchorEventDate: '2000-01-01' },
];
const instances: StepInstance[] = [];

describe('plan view', () => {
  const view = planView(BUNDLED_PLAYBOOKS, tracks, anchors, instances, NOW);

  it('schedules a track off its anchor, not its stale stored date', () => {
    const lodge = view.steps.find(s => /Lodge the visa/.test(s.title))!;
    expect(lodge.dueBy).toBe('2027-12-01');
  });

  it('names a track whose playbook is gone instead of crashing', () => {
    const v = planView([], tracks, anchors, instances, NOW);
    expect(v.broken).toEqual([{ trackId: 't', error: 'Its playbook is missing.' }]);
  });
});

describe('timeline', () => {
  const view = planView(BUNDLED_PLAYBOOKS, tracks, anchors, instances, NOW);
  const nodes = timelineNodes(anchors, tracks, view.steps, NOW);

  it('reads kinds with their detail, and adds only the next round birthday', () => {
    expect(nodes.map(n => n.label)).toEqual([
      "Born · Xi'an",
      'Migrated to Australia',
      'Lodge a visa application',
      'Turns 40',
    ]);
    expect(nodes[3].date).toBe('2031-04-12');
  });

  it('counts open steps on the anchor their track hangs off', () => {
    expect(nodes.find(n => n.id === 'v')!.pendingSteps).toBe(view.steps.length);
    expect(nodes.find(n => n.id === 'm')!.pendingSteps).toBe(0);
  });

  it('names the current chapter after the kind that opened it', () => {
    const current = lifeChapters(nodes, NOW).find(p => p.isCurrent)!;
    expect(current.label).toBe('Settling in · Australia');
  });
});

describe('documents', () => {
  const pb = BUNDLED_PLAYBOOKS.find(p => p.id === 'skilled-migration-au')!;
  const english = pb.steps.find(s => s.id === 'english-test')!;
  const doneEnglish: StepInstance[] = [
    {
      id: 'i',
      trackId: 't',
      stepId: english.id,
      status: 'done',
      completedOn: '2024-01-10',
      checkedDocuments: [],
      checkedPrepare: [],
    },
  ];

  it('derives expiry from the step that produced it', () => {
    const view = planView(BUNDLED_PLAYBOOKS, tracks, anchors, doneEnglish, NOW);
    const doc = documentViews([], view, doneEnglish).find(d => d.name === english.documents[0])!;
    expect(doc.held).toBe(true);
    expect(doc.expiresOn).toBe(addDays('2024-01-10', english.validForDays!));
  });

  it('puts a document that dies before a step needs it under expiring', () => {
    const view = planView(BUNDLED_PLAYBOOKS, tracks, anchors, doneEnglish, NOW);
    const docs = documentViews(
      [{ id: 'passport', name: 'Passport', issuedOn: '2018-01-01', expiresOn: '2027-01-01' }],
      view,
      doneEnglish,
    );
    const groups = groupDocuments(docs, NOW);
    const passport = groups.expiring.find(d => d.id === 'passport')!;
    expect(passport.clash?.gapDays).toBeGreaterThan(0);
  });

  it('an unheld document is missing, ordered by when it is first needed', () => {
    const view = planView(BUNDLED_PLAYBOOKS, tracks, anchors, [], NOW);
    const missing = groupDocuments(documentViews([], view, []), NOW).missing;
    const starts = missing.map(d => d.neededBy?.startBy ?? '9999');
    expect([...starts].sort()).toEqual(starts);
  });
});
