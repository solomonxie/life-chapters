import type { Playbook } from '../../domain/types';

const IRCC = 'https://www.canada.ca/en/immigration-refugees-citizenship/services';

export const prCa: Playbook = {
  id: 'pr-ca',
  title: 'Life as a permanent resident · Canada',
  summary:
    'Paperwork plan for the years after landing as a permanent resident: the PR card, SIN and health records, benefits that open up, family sponsorship, the residency obligation and the card renewal.',
  region: 'Canada',
  country: 'CA',
  family: 'pr',
  anchorKind: 'pr-landed',
  conditions: [
    'You became a permanent resident of Canada, at a port of entry or from inside Canada',
    'Health and benefit steps describe British Columbia and Ontario; other provinces have their own',
    'Some steps apply only to people who held a permit before, or have family abroad',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    { title: 'Understand PR status — Canada.ca', url: `${IRCC}/new-immigrants/pr-card/understand-pr-status.html` },
    { title: 'Get, renew or replace a PR card — Canada.ca', url: `${IRCC}/permanent-residents/card/apply.html` },
    { title: 'Getting your PR card after you apply — Canada.ca', url: `${IRCC}/permanent-residents/card/after-next-steps.html` },
    { title: 'Permanent resident travel document — Canada.ca', url: `${IRCC}/permanent-residents/travel-document.html` },
    { title: 'Social Insurance Number: Eligibility — Canada.ca', url: 'https://www.canada.ca/en/employment-social-development/services/sin/eligibility.html' },
    { title: 'Sponsor your family members — Canada.ca', url: `${IRCC}/immigrate-canada/family-sponsorship.html` },
    { title: 'Canadian Dental Care Plan — Canada.ca', url: 'https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html' },
    { title: 'Newcomers to Canada (immigrants) — Canada Revenue Agency', url: 'https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/newcomers-canada-immigrants.html' },
    { title: 'Medical Services Plan eligibility — Province of British Columbia', url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible' },
    { title: 'Apply for OHIP and get a health card — Ontario.ca', url: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
  ],
  steps: [
    {
      id: 'card-address',
      title: 'Give IRCC a Canadian mailing address and photo for the PR card',
      offsetDays: 0,
      durationDays: 14,
      dependsOn: [],
      documents: ['Confirmation of Permanent Residence (COPR)'],
      prepare: ['Canadian mailing address', 'PR card photo to IRCC specifications', 'Permanent Residence Portal sign-in, if landing from inside Canada'],
      howTo:
        '1. IRCC sends the first PR card automatically when it has a Canadian mailing address and photo within 180 days of becoming a permanent resident; the first card is then free.\n2. At a port of entry, the officer usually takes the address; landing from inside Canada, the portal asks for it.\n3. An address change before the card arrives goes to IRCC through its web form.',
    },
    {
      id: 'sin-update',
      title: 'Update the Social Insurance Number record with Service Canada',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: [],
      documents: ['Confirmation of Permanent Residence (COPR)', 'SIN confirmation letter'],
      prepare: ['Current SIN starting with 9', 'COPR or PR card'],
      conditions: ['Only if your SIN starts with 9 (issued while on a permit)'],
      howTo:
        '1. A SIN starting with 9 is for temporary residents and expires with the permit; permanent residents hold a SIN that does not expire.\n2. Service Canada updates the record online, in person or by mail with the COPR; check whether a new number is issued.\n3. Applying and updating are free.',
    },
    {
      id: 'sin-employer',
      title: 'Give the updated SIN to the employer',
      offsetDays: 21,
      durationDays: 3,
      dependsOn: ['sin-update'],
      documents: ['SIN confirmation letter'],
      prepare: ['Payroll or HR contact'],
      conditions: ['Only if your SIN starts with 9 and you are employed'],
      howTo:
        '1. Payroll uses the SIN and its expiry for the T4 and the Record of Employment.\n2. The employer no longer needs a work permit on file once PR status is shown.',
    },
    {
      id: 'health-status',
      title: 'Update health coverage to permanent resident status',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Confirmation of Permanent Residence (COPR)', 'Health card or BC Services Card'],
      prepare: ['Personal health number', 'Proof of address'],
      conditions: ['Only if your provincial health coverage was tied to a permit, or you have none yet'],
      howTo:
        '1. British Columbia: send the COPR to Health Insurance BC so MSP coverage is no longer set to end with a permit; newcomers without MSP apply, and coverage usually starts after a waiting period of up to 3 months.\n2. Ontario: take the COPR and two other documents to ServiceOntario for a health card tied to PR status; there is no waiting period for OHIP.\n3. Other provinces have their own health plans.',
    },
    {
      id: 'cra-status',
      title: 'Tell the CRA about the new immigration status',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['SIN', 'COPR', 'CRA My Account sign-in', 'Form RC66 if applying for child benefits for the first time'],
      conditions: ['Only if you or your spouse get, or could get, the Canada Child Benefit or other CRA benefits'],
      howTo:
        '1. Canada Child Benefit eligibility depends partly on immigration status; the CRA can ask for proof of it.\n2. Status can be updated in CRA My Account or on form RC66SCH.\n3. Provincial child benefits (BC Family Benefit, Ontario Child Benefit) are paid through the same CCB account.',
    },
    {
      id: 'benefits-recheck',
      title: 'Re-check benefits, tuition and student aid that PR status opens',
      offsetDays: 60,
      durationDays: 21,
      dependsOn: [],
      documents: [],
      prepare: ['Last notice of assessment', 'Household income', 'School or college registration, if studying'],
      howTo:
        '1. Permanent residents usually pay domestic tuition rather than international fees; the school sets when the change takes effect.\n2. Federal and provincial student aid (StudentAid BC, OSAP) open to permanent residents.\n3. The Canadian Dental Care Plan covers residents without private dental insurance and with adjusted family net income under $90,000, once tax returns are filed.\n4. British Columbia: Healthy Kids and Fair PharmaCare rely on MSP and income; Ontario: OHIP+ covers many drugs for those under 25 without a private plan.\n5. Rules change; check the current pages.',
    },
    {
      id: 'sponsorship',
      title: 'Look into sponsoring family members',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ['Relationship documents', 'Income for the last years, for parents and grandparents'],
      conditions: ['Only if a spouse, partner, dependent child, parent or grandparent lives outside Canada or without status'],
      howTo:
        '1. Permanent residents living in Canada can sponsor a spouse, common-law or conjugal partner, and dependent children.\n2. Parents and grandparents go through the Parents and Grandparents Program, which opens only to people invited from an interest-to-sponsor pool, with a minimum income over several tax years; the super visa is the alternative for long visits.\n3. Sponsors sign an undertaking to support the person for a set number of years.\n4. Not immigration advice; the IRCC pages decide eligibility.',
    },
    {
      id: 'prtd',
      title: 'Apply for a PR travel document before returning without a card',
      offsetDays: 365,
      durationDays: 30,
      dependsOn: [],
      documents: ['Permanent resident travel document (PRTD)'],
      prepare: ['Passport', 'Proof of days in Canada', 'Travel dates'],
      conditions: ['Only if you are outside Canada, or leaving, without a valid PR card'],
      howTo:
        '1. Airlines and other commercial carriers ask for a valid PR card or a PRTD before boarding for Canada.\n2. The PRTD is applied for from outside Canada; IRCC checks the residency obligation when deciding.\n3. By land in a private vehicle, a PR can present other proof of status at the border.\n4. The date here is a placeholder; move it to before the trip.',
    },
    {
      id: 'residency',
      title: 'Check the 730-day residency obligation',
      offsetDays: 1460,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ['Travel history: entry and exit dates', 'Passport stamps or a CBSA travel history request'],
      howTo:
        '1. Permanent residents stay in Canada at least 730 days in any 5-year period; the days need not be in a row.\n2. Some days abroad count, for example accompanying a Canadian citizen spouse, or working abroad full-time for a Canadian business; IRCC has a tool to check.\n3. An expired PR card does not end PR status; status ends only by a formal decision, renunciation, a removal order or becoming a citizen.\n4. This check repeats before any long stay abroad.',
    },
    {
      id: 'card-renew',
      title: 'Renew the PR card',
      offsetDays: 1560,
      durationDays: 60,
      dependsOn: ['card-address'],
      documents: ['PR card'],
      prepare: ['Card expiry date', 'Photos', 'Travel history for the last 5 years', 'Fee payment'],
      conditions: ['Only if you are not yet a Canadian citizen'],
      howTo:
        '1. PR cards are usually valid for 5 years; the expiry is printed on the card.\n2. IRCC takes renewals when the card expires in less than 9 months, or has expired.\n3. Apply through the online portal; processing times are listed on the IRCC page.\n4. This date assumes a 5-year card from landing; move it to 9 months before the printed expiry. Renewals repeat every card term.',
    },
    {
      id: 'card-chase',
      title: 'Follow up if the first PR card has not arrived',
      offsetDays: 180,
      durationDays: 14,
      dependsOn: ['card-address'],
      documents: [],
      prepare: ['Application number or UCI', 'Date of landing'],
      conditions: ['Only if the first PR card has not arrived'],
      howTo:
        '1. Without an address and photo sent within 180 days of landing, the first card goes through a regular application on form IMM 5444 in the Permanent Residence Portal.\n2. IRCC\'s card processing times and web form are the ways to follow up.',
    },
  ],
};
