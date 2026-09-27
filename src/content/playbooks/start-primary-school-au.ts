import type { Playbook } from '../../domain/types';

export const startPrimarySchoolAu: Playbook = {
  id: 'start-primary-school-au',
  title: 'Start primary school · NSW',
  summary:
    'Paperwork and preparation track for a child starting Kindergarten at a NSW public school.',
  region: 'NSW, Australia',
  anchorKind: 'school-start',
  reviewedAt: '2026-09-26',
  version: 1,
  sources: [
    {
      title: 'Primary school enrolment — NSW Department of Education',
      url: 'https://education.nsw.gov.au/schooling/parents-and-carers/choosing-a-school-setting/enrolment/primary-school-enrolment',
    },
    {
      title: 'Starting Kindergarten FAQs',
      url: 'https://education.nsw.gov.au/early-childhood-education/information-for-parents-and-carers/transition-to-school/starting-kindergarten-FAQs',
    },
    {
      title: 'School Finder',
      url: 'https://education.nsw.gov.au/school-finder',
    },
    {
      title: 'Enrolment of students in NSW government schools (policy)',
      url: 'https://education.nsw.gov.au/policy-library/policies/pd-2002-0006',
    },
  ],
  steps: [
    {
      id: 'eligibility',
      title: 'Check the starting-age window',
      offsetDays: -540,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['Child\'s date of birth', 'Starting year options'],
      howTo:
        '1. In NSW, a child can usually start Kindergarten in a year if they turn 5 on or before 31 July that year.\n2. Schooling is compulsory by the 6th birthday, so families often have a choice of two years.',
    },
    {
      id: 'local-school',
      title: 'Find the local intake-area school',
      offsetDays: -420,
      durationDays: 14,
      dependsOn: ['eligibility'],
      documents: [],
      prepare: ['Home address', 'Shortlist of nearby schools'],
      howTo:
        '1. School Finder on the NSW Department of Education site shows the designated school for an address.\n2. Out-of-area enrolment depends on each school\'s places and policy.',
    },
    {
      id: 'visit',
      title: 'Visit schools and attend open days',
      offsetDays: -330,
      durationDays: 60,
      dependsOn: ['local-school'],
      documents: [],
      prepare: ['Questions list', 'Check each school\'s open-day dates'],
      howTo:
        '1. Many schools run tours or information evenings in the year before Kindergarten.\n2. Dates are usually posted on each school\'s website or newsletter.',
    },
    {
      id: 'birth-certificate',
      title: 'Locate or order the birth certificate',
      offsetDays: -300,
      durationDays: 30,
      dependsOn: [],
      documents: ['Birth certificate'],
      prepare: ['Check the current fee if ordering a copy'],
      howTo:
        '1. Schools usually ask for proof of identity and date of birth, often a birth certificate or passport.\n2. NSW certificates are ordered from NSW Registry of Births, Deaths and Marriages; other states and countries have their own registries.',
    },
    {
      id: 'proof-of-address',
      title: 'Gather proof of address',
      offsetDays: -270,
      durationDays: 30,
      dependsOn: [],
      documents: ['Proof of address'],
      prepare: ['Council rates notice, lease, or utility bill', 'Check it shows the current address'],
      howTo:
        '1. Schools commonly accept a council rates notice, residential lease, or utility bill.\n2. Some schools ask for more than one document; check with the school.',
    },
    {
      id: 'immunisation',
      title: 'Download the immunisation history statement',
      offsetDays: -270,
      durationDays: 7,
      dependsOn: [],
      documents: ['Immunisation history statement'],
      prepare: ['Medicare online account via myGov', 'Check vaccinations are up to date'],
      howTo:
        '1. The statement comes from the Australian Immunisation Register, usually via a Medicare online account.\n2. A recent copy is usually preferred at enrolment.',
    },
    {
      id: 'enrol',
      title: 'Submit the enrolment application',
      offsetDays: -240,
      durationDays: 14,
      dependsOn: ['local-school', 'visit', 'birth-certificate', 'proof-of-address', 'immunisation'],
      documents: [
        'Enrolment application',
        'Birth certificate',
        'Proof of address',
        'Immunisation history statement',
      ],
      prepare: [
        'Family law or court orders, if any',
        'Emergency contacts',
        'Visa details, if not an Australian citizen or permanent resident',
      ],
      howTo:
        '1. Applications are usually made online or on the department\'s application-to-enrol form.\n2. Schools often take Kindergarten enrolments from around the middle of the year before; check the school\'s dates.',
    },
    {
      id: 'health-plans',
      title: 'Share health and support plans with the school',
      offsetDays: -200,
      durationDays: 30,
      dependsOn: ['enrol'],
      documents: ['Health care plan'],
      prepare: ['Allergy or asthma action plans', 'Reports from therapists or specialists'],
      howTo:
        '1. Skip if not relevant.\n2. Schools usually meet with families about medical or learning support needs before the start date.',
    },
    {
      id: 'oshc',
      title: 'Book before- and after-school care',
      offsetDays: -150,
      durationDays: 30,
      dependsOn: ['enrol'],
      documents: ['Care booking confirmation'],
      prepare: ['Days needed', 'Check waitlists', 'Child Care Subsidy details'],
      howTo:
        '1. Care is often run by a separate provider on the school site.\n2. Places can have waitlists; enquire early.',
    },
    {
      id: 'transition',
      title: 'Attend orientation and transition sessions',
      offsetDays: -60,
      durationDays: 30,
      dependsOn: ['enrol'],
      documents: [],
      prepare: ['Note session dates', 'Tell the preschool or childcare centre'],
      howTo:
        '1. Most schools run Kindergarten orientation sessions in Term 4 of the year before.\n2. Preschools may share a transition-to-school statement with the school.',
    },
    {
      id: 'uniform',
      title: 'Buy the school uniform',
      offsetDays: -30,
      durationDays: 21,
      dependsOn: ['transition'],
      documents: [],
      prepare: ['Uniform shop hours', 'Sizes with room to grow', 'Hat and shoes'],
    },
    {
      id: 'supplies',
      title: 'Buy the book pack and school bag',
      offsetDays: -14,
      durationDays: 14,
      dependsOn: ['transition'],
      documents: [],
      prepare: ['School supply list', 'Lunchbox and drink bottle'],
    },
    {
      id: 'ready',
      title: 'Label everything and practise the school route',
      offsetDays: -3,
      durationDays: 7,
      dependsOn: ['uniform', 'supplies'],
      documents: [],
      prepare: ['Name labels', 'Drop-off and pick-up plan', 'First-day time and gate'],
    },
  ],
};
