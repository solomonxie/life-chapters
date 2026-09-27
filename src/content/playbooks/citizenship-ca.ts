import type { Playbook } from '../../domain/types';

export const citizenshipCa: Playbook = {
  id: 'citizenship-ca',
  title: 'Citizenship · CA',
  summary:
    'Paperwork plan for citizenship by grant as an adult permanent resident, from landing to the oath.',
  region: 'Canada',
  anchorKind: 'migrated',
  ages: { from: 18 },
  conditions: [
    "You're a permanent resident",
    '1,095 days physically in Canada in the 5 years before you apply',
    'Taxes filed for 3 of those 5 years, if you had to file',
  ],
  reviewedAt: '2026-09-26',
  version: 1,
  sources: [
    {
      title: 'Canadian citizenship: Who can apply',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/eligibility.html',
    },
    {
      title: 'Apply for citizenship: Calculate your physical presence',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/adult-minor/how/physical-presence.html',
    },
    {
      title: 'Citizenship: Proof of language skills',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/eligibility/language-proof.html',
    },
    {
      title: 'Adult citizenship: Forms and documents',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/adult-minor/how/adult-forms-documents.html',
    },
    {
      title: 'Apply for citizenship: Adults',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/apply.html',
    },
    {
      title: 'Citizenship test',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html',
    },
    {
      title: 'Citizenship ceremony',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-ceremony.html',
    },
    {
      title: 'After the citizenship ceremony',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-ceremony/after.html',
    },
    {
      title: 'Apply for a new adult passport',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/new-adult-passport.html',
    },
  ],
  steps: [
    {
      id: 'travel-log',
      title: 'Start a log of days spent outside Canada',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Travel history'],
      prepare: ['Departure and return dates', 'Keep boarding passes or passport stamps'],
      howTo:
        '1. The requirement is at least 1,095 days physically in Canada in the 5 years before applying.\n2. IRCC offers an optional travel journal for trips outside Canada; it is not sent with the application.',
    },
    {
      id: 'pr-date',
      title: 'Record the permanent residence date',
      offsetDays: 60,
      durationDays: 1,
      dependsOn: [],
      documents: ['Confirmation of Permanent Residence'],
      prepare: ['Save the COPR', 'Move this date to the real date permanent residence began'],
      howTo:
        '1. Days as a permanent resident count in full.\n2. Days in Canada as a temporary resident or protected person in the 5 years count as half days, up to 365 days of credit.',
    },
    {
      id: 'tax-check',
      title: 'Check tax returns are filed for 3 of the last 5 years',
      offsetDays: 1100,
      durationDays: 14,
      dependsOn: [],
      documents: ['Notice of assessment'],
      prepare: ['List the tax years filed', 'File any missing returns'],
      howTo:
        '1. Filing Canadian income taxes for at least 3 of the 5 years before applying is part of the requirement, if the applicant had to file.',
    },
    {
      id: 'presence-check',
      title: 'Run the IRCC physical presence calculator',
      offsetDays: 1110,
      durationDays: 7,
      dependsOn: ['travel-log', 'pr-date'],
      documents: ['Physical presence calculation'],
      prepare: ['Permanent residence date', 'All absences in the 5 years', 'Any time as a temporary resident'],
      howTo:
        '1. The calculator is in the IRCC online account; online applications use it there.\n2. Paper applications include the calculator printout or form CIT 0407.\n3. An application without the calculation is returned.',
    },
    {
      id: 'language-proof',
      title: 'Gather language proof (ages 18 to 54)',
      offsetDays: 1110,
      durationDays: 30,
      dependsOn: [],
      documents: ['Language proof'],
      prepare: ['An approved test result, or', 'A diploma, transcript or certificate from study in English or French'],
      howTo:
        '1. Skip if under 18 or 55 and over.\n2. The level is CLB 4 or higher in speaking and listening, in English or French.',
    },
    {
      id: 'identity-docs',
      title: 'Gather passports, ID and photos',
      offsetDays: 1110,
      durationDays: 30,
      dependsOn: [],
      documents: ['Passport', 'Second piece of identification', 'Citizenship photos'],
      prepare: [
        'Colour copies of identity pages of every passport held during the 5 years',
        'Two pieces of personal identification',
        'Evidence of any name change',
        'Certified translations where needed',
      ],
      howTo:
        '1. The document checklist (CIT 0007) lists what the application includes.\n2. A police certificate may be needed for any country where 183 days or more in a row were spent in the 4 years before applying.',
    },
    {
      id: 'apply',
      title: 'Apply for citizenship online',
      offsetDays: 1125,
      durationDays: 3,
      dependsOn: ['tax-check', 'presence-check', 'language-proof', 'identity-docs'],
      documents: [
        'Citizenship application receipt',
        'Physical presence calculation',
        'Language proof',
        'Passport',
        'Citizenship photos',
      ],
      prepare: ['Check the current fees', 'IRCC account login'],
      howTo:
        '1. IRCC encourages online applications; paper is for specific cases.\n2. Fees include a processing fee and a right of citizenship fee.\n3. This date assumes 1,095 days in Canada since becoming a permanent resident, plus a buffer; move it if absences push it later.',
    },
    {
      id: 'aor',
      title: 'Watch for the acknowledgement of receipt',
      offsetDays: 1185,
      durationDays: 60,
      dependsOn: ['apply'],
      documents: ['Acknowledgement of receipt'],
      prepare: ['Check the IRCC account and email'],
      howTo:
        '1. An online application gets an email confirmation straight away.\n2. The acknowledgement of receipt follows once processing starts.\n3. Dates here are rough placeholders.',
    },
    {
      id: 'study',
      title: 'Study Discover Canada for the test',
      offsetDays: 1245,
      durationDays: 60,
      dependsOn: ['aor'],
      documents: [],
      prepare: ['Download Discover Canada', 'Practice questions on the IRCC site'],
      howTo:
        '1. Questions cover rights and responsibilities, history, geography and government, from the official study guide Discover Canada.\n2. Applicants aged 18 to 54 usually take the test.',
    },
    {
      id: 'test',
      title: 'Take the online citizenship test',
      offsetDays: 1275,
      durationDays: 1,
      dependsOn: ['study'],
      documents: ['Test invitation'],
      prepare: ['Invitation email', 'Quiet room and a working device'],
      howTo:
        '1. IRCC sends an invitation with the test window.\n2. The test is online: 20 questions in 45 minutes, and 15 correct answers pass.\n3. Move this date to the invitation date once known.',
    },
    {
      id: 'decision',
      title: 'Watch for the application decision',
      offsetDays: 1395,
      durationDays: 90,
      dependsOn: ['test'],
      documents: [],
      prepare: ['Check the IRCC account and email'],
      howTo:
        '1. An interview or hearing may follow, depending on the test result.\n2. Dates here are rough placeholders.',
    },
    {
      id: 'ceremony',
      title: 'Take the oath at the citizenship ceremony',
      offsetDays: 1455,
      durationDays: 30,
      dependsOn: ['decision'],
      documents: ['Citizenship certificate'],
      prepare: ['Ceremony invitation', 'Identification and PR card', 'Check whether it is virtual or in person'],
      howTo:
        '1. Adults approved for citizenship take the oath; citizenship takes effect once it is taken.\n2. The PR card is collected at the ceremony.\n3. An electronic certificate is usually in the IRCC portal within 5 business days of the signed oath form; paper certificates come at in-person ceremonies or by mail.',
    },
    {
      id: 'vote',
      title: 'Register to vote with Elections Canada',
      offsetDays: 1470,
      durationDays: 7,
      dependsOn: ['ceremony'],
      documents: [],
      prepare: ['Citizenship certificate details', 'Current address'],
      howTo:
        '1. Federal voter registration is with Elections Canada.\n2. Provincial and local elections have their own lists.',
    },
    {
      id: 'ca-passport',
      title: 'Apply for a Canadian passport',
      offsetDays: 1500,
      durationDays: 30,
      validForDays: 3652,
      dependsOn: ['ceremony'],
      documents: ['Canadian passport', 'Citizenship certificate', 'Passport photo'],
      prepare: ['Check the current fee', 'Guarantor and 2 references', 'Pick 5- or 10-year validity'],
      howTo:
        '1. The citizenship certificate comes first; it is not a travel document.\n2. Adult passports come with 5- or 10-year validity; this step assumes 10.',
    },
  ],
};
