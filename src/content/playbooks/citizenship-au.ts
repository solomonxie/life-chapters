import type { Playbook } from '../../domain/types';

export const citizenshipAu: Playbook = {
  id: 'citizenship-au',
  title: 'Citizenship · AU',
  summary:
    'Paperwork track for citizenship by conferral under the general residence requirement, from arrival to ceremony.',
  region: 'Australia',
  anchorKind: 'migrated',
  reviewedAt: '2026-09-26',
  version: 1,
  sources: [
    {
      title: 'Become an Australian citizen (by conferral)',
      url: 'https://immi.homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident',
    },
    {
      title: 'Residence Calculator',
      url: 'https://immi.homeaffairs.gov.au/help-support/tools/residence-calculator',
    },
    {
      title: 'Citizenship test',
      url: 'https://immi.homeaffairs.gov.au/citizenship/test-and-interview/learn-about-citizenship-interview-and-test/learn-about-citizenship-test',
    },
    {
      title: 'Citizenship processing times',
      url: 'https://immi.homeaffairs.gov.au/citizenship/citizenship-processing-times/citizenship-processing-times',
    },
    {
      title: 'Citizenship ceremony',
      url: 'https://immi.homeaffairs.gov.au/citizenship/ceremony',
    },
  ],
  steps: [
    {
      id: 'travel-log',
      title: 'Start a log of days spent outside Australia',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Travel history'],
      prepare: ['Departure and return dates', 'Keep boarding passes or passport stamps'],
      howTo:
        '1. The general residence requirement counts absences: no more than 12 months in the 4 years before applying, and no more than 90 days in the last 12 months.\n2. Movement records can also be requested from Home Affairs.',
    },
    {
      id: 'pr-grant',
      title: 'Record the permanent residence grant date',
      offsetDays: 1095,
      durationDays: 1,
      dependsOn: [],
      documents: ['Visa grant notice'],
      prepare: ['Save the grant letter', 'Move this date to the real grant date'],
      howTo:
        '1. The general requirement includes the last 12 months before applying as a permanent resident.\n2. If permanent residence came later than 3 years after arrival, the application date moves later too.',
    },
    {
      id: 'residence-check',
      title: 'Run the Home Affairs residence calculator',
      offsetDays: 1430,
      durationDays: 7,
      dependsOn: ['travel-log', 'pr-grant'],
      documents: ['Travel history'],
      prepare: ['Arrival date', 'PR grant date', 'All absences'],
      howTo:
        '1. The residence calculator on the Home Affairs site checks the 4-year and absence rules.\n2. Only time in Australia on a valid visa usually counts.\n3. Some groups have different requirements; the calculator and guidance note them.',
    },
    {
      id: 'identity-docs',
      title: 'Gather identity documents',
      offsetDays: 1430,
      durationDays: 30,
      dependsOn: [],
      documents: ['Passport', 'Birth certificate', 'Proof of residential address', 'Passport photo'],
      prepare: ['Evidence of any name change', 'Colour scans', 'Certified translations where needed'],
      howTo:
        '1. Applications usually list documents for identity, photo, and a current Australian address.\n2. Originals are usually brought to the test or interview appointment.',
    },
    {
      id: 'identity-declaration',
      title: 'Get the identity declaration and photo endorsed',
      offsetDays: 1450,
      durationDays: 14,
      dependsOn: ['identity-docs'],
      documents: ['Identity declaration', 'Passport photo'],
      prepare: ['Find an eligible endorser who has known you for a while', 'Two recent photos'],
      howTo:
        '1. An Australian citizen in an eligible occupation usually signs the declaration and a photo.\n2. The current form and endorser rules are listed with the application; check before asking someone.',
    },
    {
      id: 'apply',
      title: 'Apply for citizenship by conferral',
      offsetDays: 1461,
      durationDays: 3,
      dependsOn: ['residence-check', 'identity-declaration'],
      documents: [
        'Citizenship application receipt',
        'Passport',
        'Birth certificate',
        'Proof of residential address',
        'Identity declaration',
      ],
      prepare: ['Check the current fee', 'ImmiAccount login'],
      howTo:
        '1. Applications are usually made online via ImmiAccount.\n2. This date assumes 4 years since arrival with the last 12 months as a permanent resident; move it if that differs.',
    },
    {
      id: 'study',
      title: 'Study Our Common Bond for the test',
      offsetDays: 1581,
      durationDays: 60,
      dependsOn: ['apply'],
      documents: [],
      prepare: ['Download the official resource', 'Practice test on the Home Affairs site'],
      howTo:
        '1. Test questions are drawn from the official book Australian Citizenship: Our Common Bond.\n2. Most applicants aged 18 to 59 sit the test.',
    },
    {
      id: 'test',
      title: 'Attend the citizenship test and interview',
      offsetDays: 1641,
      durationDays: 1,
      dependsOn: ['study'],
      documents: ['Passport', 'Birth certificate', 'Proof of residential address'],
      prepare: ['Appointment letter', 'Original identity documents'],
      howTo:
        '1. The Department sends an appointment; timing depends on current processing.\n2. The test is computer-based, multiple choice.\n3. Move this date to the appointment date once known.',
    },
    {
      id: 'decision',
      title: 'Watch for the application decision',
      offsetDays: 1761,
      durationDays: 90,
      dependsOn: ['test'],
      documents: ['Citizenship approval'],
      prepare: ['Check ImmiAccount and email', 'Report travel or address changes'],
      howTo:
        '1. Processing times vary; Home Affairs publishes current estimates.\n2. Dates here are rough placeholders.',
    },
    {
      id: 'ceremony',
      title: 'Attend the citizenship ceremony',
      offsetDays: 1851,
      durationDays: 30,
      dependsOn: ['decision'],
      documents: ['Citizenship certificate'],
      prepare: ['Ceremony invitation letter', 'Photo identification', 'Check the dress and guest details'],
      howTo:
        '1. Ceremonies are usually run by local councils.\n2. Invitations usually arrive about four weeks before.\n3. Citizenship usually takes effect at the pledge.',
    },
    {
      id: 'enrol-vote',
      title: 'Enrol to vote with the AEC',
      offsetDays: 1865,
      durationDays: 7,
      dependsOn: ['ceremony'],
      documents: [],
      prepare: ['Citizenship certificate details', 'Driver licence or passport'],
      howTo:
        '1. Enrolment is usually done online with the Australian Electoral Commission.\n2. Some ceremonies hand out enrolment forms on the day.',
    },
    {
      id: 'au-passport',
      title: 'Apply for an Australian passport',
      offsetDays: 1911,
      durationDays: 42,
      validForDays: 3652,
      dependsOn: ['ceremony'],
      documents: ['Australian passport', 'Citizenship certificate', 'Passport photo'],
      prepare: ['Check the current fee', 'Guarantor details', 'Book an interview at a post office'],
      howTo:
        '1. Applications usually start online at the Australian Passport Office site and finish with an interview.\n2. Adult passports are usually valid for 10 years.',
    },
  ],
};
