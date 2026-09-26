import type { Anchor, Playbook, StepInstance, Track } from '../domain/types';

/**
 * A hand-written stand-in so the engine and the screens have something to draw
 * before the researched playbooks land (IMPLEMENT_PLAN.md T2.3). Dates and
 * durations here are plausible, not verified — this is a fixture, not advice.
 */
export const demoPlaybook: Playbook = {
  id: 'demo-migration',
  title: 'Skilled migration · demo',
  anchorKind: 'visa-lodged',
  reviewedAt: '2026-09-26',
  steps: [
    {
      id: 'subclass',
      title: 'Choose visa subclass',
      offsetDays: -540,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Read the points test', 'List occupations that match'],
      howTo: 'Compare the points you can actually evidence, not the maximum.',
    },
    {
      id: 'english-test',
      title: 'Sit an English test',
      offsetDays: -420,
      durationDays: 60,
      validForDays: 730,
      dependsOn: ['subclass'],
      documents: ['Test result'],
      prepare: ['Book a sitting', 'Two practice papers'],
    },
    {
      id: 'skills-assessment',
      title: 'Skills assessment',
      offsetDays: -300,
      durationDays: 120,
      validForDays: 1095,
      dependsOn: ['english-test'],
      documents: ['Assessment outcome letter', 'Employment references'],
      prepare: ['Collect payslips', 'Reference letters on letterhead'],
    },
    {
      id: 'police-check',
      title: 'Police check',
      offsetDays: -60,
      durationDays: 21,
      validForDays: 90,
      dependsOn: ['subclass'],
      documents: ['National police check', 'Overseas police certificate'],
      prepare: ['Address history, last 10 years'],
      howTo: 'Only accepted for 3 months — ordering it early means paying twice.',
    },
    {
      id: 'lodge',
      title: 'Lodge the application',
      offsetDays: 0,
      durationDays: 7,
      dependsOn: ['skills-assessment', 'police-check'],
      documents: ['Passport', 'Birth certificate'],
      prepare: ['Scan everything into Docs'],
    },
  ],
};

export const demoAnchors: Anchor[] = [
  {
    id: 'born',
    kind: 'born',
    label: 'Born',
    date: '1991-04-12',
    precision: 'day',
  },
  {
    id: 'graduated',
    kind: 'graduated',
    label: 'Graduated · BSc',
    date: '2013-01-01',
    precision: 'year',
  },
  {
    id: 'visa-lodged',
    kind: 'visa-lodged',
    label: 'Lodge the visa application',
    date: '2027-06-01',
    precision: 'day',
  },
];

export const demoTrack: Track = {
  id: 'track-demo',
  playbookId: demoPlaybook.id,
  anchorEventDate: '2027-06-01',
};

export const demoInstances: StepInstance[] = demoPlaybook.steps.map(step => ({
  id: `inst-${step.id}`,
  trackId: demoTrack.id,
  stepId: step.id,
  status: 'pending',
  checkedDocuments: [],
  checkedPrepare: [],
}));
