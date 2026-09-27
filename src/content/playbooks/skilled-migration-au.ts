import type { Playbook } from '../../domain/types';

export const skilledMigrationAu: Playbook = {
  id: 'skilled-migration-au',
  title: 'Skilled migration · AU',
  summary:
    'Paperwork track for a points-tested 189/190 application, from occupation check to lodging and follow-up documents.',
  region: 'Australia',
  anchorKind: 'visa-lodge',
  reviewedAt: '2026-09-26',
  version: 1,
  sources: [
    {
      title: 'Skilled Independent visa (subclass 189) — points-tested stream',
      url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189/points-tested',
    },
    {
      title: 'SkillSelect — Expression of Interest',
      url: 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect/expression-of-interest',
    },
    {
      title: 'Competent English',
      url: 'https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language/competent-english',
    },
    {
      title: 'Character requirements for visas',
      url: 'https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/character',
    },
    {
      title: 'When to have health examinations',
      url: 'https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health/when-to-have-health-examinations',
    },
  ],
  steps: [
    {
      id: 'occupation',
      title: 'Check the occupation list and points estimate',
      offsetDays: -560,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: [
        'Shortlist matching occupations',
        'Note the assessing authority for each',
        'List points you can evidence',
      ],
      howTo:
        '1. The skilled occupation lists and points table are published on the Home Affairs site.\n2. Each occupation names an assessing authority.\n3. Points claims are usually counted only where evidence exists.',
    },
    {
      id: 'passport',
      title: 'Check passport validity',
      offsetDays: -500,
      durationDays: 30,
      dependsOn: [],
      documents: ['Passport'],
      prepare: ['Check the expiry date', 'Renew if it expires during the likely processing period'],
      howTo:
        '1. The same passport details are usually entered in SkillSelect and ImmiAccount.\n2. A renewal mid-process usually means updating details with the Department.',
    },
    {
      id: 'english-test',
      title: 'Book and sit an English test',
      offsetDays: -440,
      durationDays: 60,
      validForDays: 1095,
      dependsOn: ['occupation'],
      documents: ['English test result'],
      prepare: ['Pick an approved test', 'Book a sitting', 'Practice papers'],
      howTo:
        '1. Home Affairs publishes the approved tests and score bands.\n2. Results are generally accepted for 3 years; check which date the rule is measured from for the subclass.\n3. Some passports count as evidence of competent English instead of a test.',
    },
    {
      id: 'evidence',
      title: 'Collect qualification and employment evidence',
      offsetDays: -440,
      durationDays: 60,
      dependsOn: ['occupation'],
      documents: [
        'Degree certificates and transcripts',
        'Employment references',
        'Payslips',
      ],
      prepare: [
        'Reference letters on letterhead with duties and dates',
        'Certified copies or scans as the authority specifies',
        'Translations for non-English documents',
      ],
      howTo:
        '1. Each assessing authority publishes its own document checklist.\n2. Employment references usually list duties, hours, and dates.',
    },
    {
      id: 'skills-assessment',
      title: 'Apply for a skills assessment',
      offsetDays: -320,
      durationDays: 120,
      validForDays: 1095,
      dependsOn: ['english-test', 'evidence'],
      documents: [
        'Skills assessment outcome',
        'Degree certificates and transcripts',
        'Employment references',
      ],
      prepare: ['Create an account with the assessing authority', 'Check the current fee'],
      howTo:
        '1. Applications go to the assessing authority for the nominated occupation, not to Home Affairs.\n2. Processing times vary by authority; some offer priority processing.\n3. Validity is often 3 years unless the outcome letter states otherwise.',
    },
    {
      id: 'eoi',
      title: 'Submit an Expression of Interest in SkillSelect',
      offsetDays: -300,
      durationDays: 7,
      validForDays: 730,
      dependsOn: ['skills-assessment'],
      documents: ['Expression of Interest', 'Skills assessment outcome', 'English test result'],
      prepare: [
        'Skills assessment reference number',
        'English test details',
        'Employment and study history',
      ],
      howTo:
        '1. An EOI is lodged online in SkillSelect and ranked by points claimed.\n2. An EOI usually stays in SkillSelect for up to 2 years.\n3. Claims are usually updated in the EOI when circumstances change.',
    },
    {
      id: 'state-nomination',
      title: 'Apply for state or territory nomination (190 only)',
      offsetDays: -240,
      durationDays: 60,
      dependsOn: ['eoi'],
      documents: ['State nomination approval', 'Expression of Interest'],
      prepare: ['Read the target state\'s criteria', 'Note any residence or job-offer conditions'],
      howTo:
        '1. Skip this step for a 189 application.\n2. Each state or territory runs its own nomination process and criteria.\n3. Some states invite from the EOI; others take a separate application.',
    },
    {
      id: 'invitation',
      title: 'Receive an invitation to apply',
      offsetDays: -50,
      durationDays: 180,
      validForDays: 60,
      dependsOn: ['eoi', 'state-nomination'],
      documents: ['Invitation to apply'],
      prepare: ['Watch SkillSelect and email', 'Note the 60-day lodgement window'],
      howTo:
        '1. Invitations are issued in rounds; timing is not predictable.\n2. An invitation usually gives 60 days to lodge the visa application.\n3. Move this step\'s date to the real invitation date once it arrives.',
    },
    {
      id: 'identity-docs',
      title: 'Gather identity and civil documents',
      offsetDays: -30,
      durationDays: 30,
      dependsOn: ['passport'],
      documents: [
        'Passport',
        'Birth certificate',
        'National identity card',
        'Marriage or relationship evidence',
        'Passport photo',
      ],
      prepare: [
        'Documents for every family member included',
        'Certified translations where needed',
        'Colour scans',
      ],
      howTo:
        '1. ImmiAccount lists evidence categories after the application form is filled.\n2. Documents are usually attached as scans.',
    },
    {
      id: 'form-80',
      title: 'Complete Form 80 personal particulars',
      offsetDays: -14,
      durationDays: 21,
      dependsOn: ['invitation'],
      documents: ['Form 80'],
      prepare: [
        'Address history, last 10 years',
        'Employment history with gaps explained',
        'Travel history',
      ],
      howTo:
        '1. Form 80 is often requested for skilled visas; some applicants attach it at lodgement.\n2. Dates and addresses usually need to match the EOI and application.',
    },
    {
      id: 'lodge',
      title: 'Lodge the visa application in ImmiAccount',
      offsetDays: 0,
      durationDays: 3,
      dependsOn: ['invitation', 'identity-docs', 'form-80', 'english-test', 'skills-assessment'],
      documents: [
        'Visa application receipt',
        'Passport',
        'English test result',
        'Skills assessment outcome',
      ],
      prepare: ['Check the current fee', 'Re-check claims against the EOI'],
      howTo:
        '1. Applications are usually made online via ImmiAccount after the invitation.\n2. Claims in the application are usually expected to match the EOI at invitation time.\n3. A bridging visa may be granted if applying onshore.',
    },
    {
      id: 'police-au',
      title: 'Order an Australian police check',
      offsetDays: 21,
      durationDays: 14,
      validForDays: 365,
      dependsOn: ['lodge'],
      documents: ['Australian police check'],
      prepare: ['Identity documents for the AFP check', 'Names used, including previous names'],
      howTo:
        '1. The AFP national police check is ordered online for immigration purposes.\n2. It can be attached before or after lodging; later ordering keeps it valid longer.\n3. Usually needed if the applicant spent 12 months or more in Australia in the last 10 years.',
    },
    {
      id: 'police-overseas',
      title: 'Order overseas police certificates',
      offsetDays: 45,
      durationDays: 60,
      validForDays: 365,
      dependsOn: ['invitation'],
      documents: ['Overseas police certificate'],
      prepare: [
        'List countries lived in 12+ months (last 10 years, since age 16)',
        'Look up each country\'s process',
      ],
      howTo:
        '1. Certificates are usually needed from each country lived in for 12 months or more in the last 10 years since age 16.\n2. Home Affairs lists how to get a certificate for each country.\n3. Some countries take months; timing here is a rough estimate.',
    },
    {
      id: 'health',
      title: 'Arrange health examinations',
      offsetDays: 28,
      durationDays: 28,
      validForDays: 365,
      dependsOn: ['lodge'],
      documents: ['Health examination results'],
      prepare: ['HAP ID from ImmiAccount', 'Book with an approved clinic', 'Bring the passport'],
      howTo:
        '1. Required exams are listed in ImmiAccount after lodging, with a HAP ID.\n2. Exams are done at approved panel clinics.\n3. Results are generally valid for 12 months.',
    },
    {
      id: 'upload',
      title: 'Upload remaining documents to ImmiAccount',
      offsetDays: 60,
      durationDays: 7,
      dependsOn: ['police-au', 'police-overseas', 'health'],
      documents: ['Australian police check', 'Overseas police certificate', 'Health examination results'],
      prepare: ['Check for any request-for-information messages'],
      howTo:
        '1. Further documents are usually attached to the lodged application in ImmiAccount.\n2. Requests for more information usually carry their own response deadline.',
    },
  ],
};
