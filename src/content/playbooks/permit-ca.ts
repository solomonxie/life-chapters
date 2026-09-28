import type { Playbook } from '../../domain/types';

const IRCC = 'https://www.canada.ca/en/immigration-refugees-citizenship/services';

export const permitCa: Playbook = {
  id: 'permit-ca',
  title: 'On a work or study permit · Canada',
  summary:
    'Paperwork plan for living on a Canadian work or study permit once it is granted: its conditions, SIN and health records, family permits, the renewal before expiry, and the route to permanent residence.',
  region: 'Canada',
  country: 'CA',
  family: 'permit',
  anchorKind: 'visa-granted',
  conditions: [
    'You hold a Canadian work or study permit, new or extended',
    'The date is the day the permit was issued; arrival steps are in the relocation plans',
    'Health steps describe British Columbia and Ontario; other provinces have their own',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    { title: 'Work permit types — Canada.ca', url: `${IRCC}/work-canada/permit/temporary/work-permit-types.html` },
    { title: 'Extend your work permit — Canada.ca', url: `${IRCC}/work-canada/permit/temporary/extend.html` },
    { title: 'Extend your study permit — Canada.ca', url: `${IRCC}/study-canada/extend-study-permit.html` },
    { title: 'Maintained status — Canada.ca', url: `${IRCC}/work-canada/permit/temporary/extend/maintained-status.html` },
    { title: 'Change the conditions of your work permit — Canada.ca', url: `${IRCC}/work-canada/permit/temporary/change-conditions.html` },
    { title: 'Work off campus as an international student — Canada.ca', url: `${IRCC}/study-canada/work/work-off-campus.html` },
    { title: 'Open work permits for family members of workers — Canada.ca', url: `${IRCC}/work-canada/permit/temporary/eligibility/family-members.html` },
    { title: 'Social Insurance Number: Eligibility — Canada.ca', url: 'https://www.canada.ca/en/employment-social-development/services/sin/eligibility.html' },
    { title: 'Medical Services Plan eligibility — Province of British Columbia', url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible' },
    { title: 'Apply for OHIP and get a health card — Ontario.ca', url: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
    { title: 'Express Entry: Canadian Experience Class — Canada.ca', url: `${IRCC}/immigrate-canada/express-entry/who-can-apply/canadian-experience-class.html` },
  ],
  steps: [
    {
      id: 'conditions',
      title: 'Read the conditions printed on the permit',
      offsetDays: 0,
      durationDays: 3,
      dependsOn: [],
      documents: ['Work or study permit'],
      prepare: ['Name, dates and conditions on the permit', 'Offer letter or school letter, to compare'],
      howTo:
        '1. An employer-specific permit names the employer and often the job and location; working elsewhere needs a new permit or a change of conditions first.\n2. An open permit covers most employers, with any exceptions printed on it.\n3. A study permit sets the school level and whether off-campus work is allowed; the weekly limit on off-campus hours during school terms changes, so check current.\n4. Mistakes on the permit are fixed through IRCC\'s correction process.',
    },
    {
      id: 'sin-expiry',
      title: 'Update the SIN expiry with Service Canada',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: ['conditions'],
      documents: ['SIN confirmation letter', 'Work or study permit'],
      prepare: ['New permit', 'Current SIN'],
      conditions: ['Only if you already have a SIN starting with 9 from an earlier permit'],
      howTo:
        '1. A SIN starting with 9 expires with the permit it was issued on.\n2. After a new permit, Service Canada updates the expiry online, in person or by mail.\n3. The employer can ask to see the new date for payroll.',
    },
    {
      id: 'health-record',
      title: 'Send the new permit to the provincial health plan',
      offsetDays: 14,
      durationDays: 10,
      dependsOn: ['conditions'],
      documents: ['Work or study permit', 'Health card or BC Services Card'],
      prepare: ['Personal health number'],
      conditions: ['Only if you already have provincial health coverage tied to an earlier permit'],
      howTo:
        '1. British Columbia: MSP coverage for permit holders is set to end with the permit; sending the new permit to Health Insurance BC extends it.\n2. Ontario: a health card for a permit holder expires with the permit; renewing it at ServiceOntario with the new permit keeps OHIP going.\n3. A gap between permits can leave a gap in coverage; private insurance can fill it.',
    },
    {
      id: 'family-permits',
      title: 'Check permits for a spouse and children',
      offsetDays: 30,
      durationDays: 21,
      dependsOn: ['conditions'],
      documents: ['Marriage or common-law proof', "Children's birth certificates"],
      prepare: ['Your job\'s TEER level and permit length', 'School plans for the children'],
      conditions: ['Only if a spouse, partner or children live with you in Canada or plan to'],
      howTo:
        '1. Spouses of some workers and students can get an open work permit; since 2025 IRCC limits this by occupation, program and time left on the permit, so check current.\n2. Minor children of work or study permit holders can often attend preschool, primary or secondary school without a study permit; post-secondary study needs one.\n3. Family permits usually expire with the principal applicant\'s, so renewals line up.\n4. Not immigration advice; the IRCC pages decide eligibility.',
    },
    {
      id: 'employer-change',
      title: 'Get a new permit before changing employer',
      offsetDays: 90,
      durationDays: 60,
      dependsOn: ['conditions'],
      documents: ['New job offer', 'LMIA or offer of employment number'],
      prepare: ['New employer\'s details', 'Current permit'],
      conditions: ['Only if you hold an employer-specific permit and plan to change job'],
      howTo:
        '1. An employer-specific permit covers only the named employer; a new job usually needs a new permit, often with a new LMIA or an employer compliance offer number.\n2. Some workers in Canada can start the new job while the application is processed; IRCC lists who qualifies, so check current.\n3. The date here is a placeholder; move it to before the planned change.',
    },
    {
      id: 'next-route',
      title: 'Look at the route to the next permit or permanent residence',
      offsetDays: 180,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ['Months of skilled work in Canada', 'Language test plans', 'Provincial nominee program criteria'],
      howTo:
        '1. The Canadian Experience Class counts 1 year of skilled paid work in Canada in the last 3 years; see the "Skilled migration · CA" plan.\n2. Provincial nominee programs have streams for workers and graduates; see the provincial nomination plans for British Columbia and Ontario.\n3. Graduates may qualify for a post-graduation work permit; see the graduation plan.\n4. Not immigration advice; check the IRCC and provincial pages.',
    },
    {
      id: 'renew-reminder',
      title: 'Start gathering papers for the permit renewal',
      offsetDays: 275,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ['Permit expiry date', 'Updated job offer, LMIA or school enrolment letter', 'Passport expiry date'],
      conditions: ['Only if you plan to stay past the permit expiry date'],
      howTo:
        '1. About 90 days before expiry leaves time for new letters, an LMIA if needed, and passport renewal.\n2. A permit cannot run past the passport\'s expiry, so an expiring passport shortens it.\n3. This date assumes a 1-year permit; move it to about 90 days before the printed expiry.',
    },
    {
      id: 'renew',
      title: 'Apply to extend the permit before it expires',
      offsetDays: 335,
      durationDays: 30,
      dependsOn: ['renew-reminder'],
      documents: ['Work or study permit', 'Extension application confirmation'],
      prepare: ['IRCC account sign-in', 'Fees', 'Supporting letters'],
      conditions: ['Only if you plan to stay past the permit expiry date'],
      howTo:
        '1. IRCC suggests applying at least 30 days before the permit expires.\n2. Applying before it expires gives maintained status: work or study can continue under the same conditions until a decision.\n3. Leaving Canada while waiting can end maintained status, so check the IRCC page before travelling.\n4. This date assumes a 1-year permit; move it to 30 or more days before the printed expiry. Renewals repeat for each permit.',
    },
    {
      id: 'after-renewal',
      title: 'Pass the new permit to Service Canada, the health plan and the employer',
      offsetDays: 400,
      durationDays: 14,
      dependsOn: ['renew'],
      documents: ['New work or study permit'],
      prepare: ['Copies of the new permit'],
      conditions: ['Only once a new permit is issued'],
      howTo:
        '1. Service Canada updates the SIN expiry; Health Insurance BC or ServiceOntario updates health coverage; payroll or the school updates its records.\n2. A new permit restarts this plan from its issue date.',
    },
  ],
};
