import type { Playbook } from '../../domain/types';

const CRA = 'https://www.canada.ca/en/revenue-agency/services/tax';
const EMIGRANTS = `${CRA}/international-non-residents/individuals-leaving-entering-canada-non-residents`;

export const leavingCanadaCa: Playbook = {
  id: 'leaving-canada-ca',
  title: 'Leaving Canada · moving abroad',
  summary:
    'Paperwork plan for moving from Canada to another country: tax residency and departure tax, benefits and health coverage that stop, registered accounts as a non-resident, PR status, pensions and the final return.',
  region: 'Canada',
  country: 'CA',
  family: 'leaving-canada',
  anchorKind: 'migrated',
  leaving: true,
  conditions: [
    'You lived in Canada and are moving abroad for the long term',
    'The date is the day you leave Canada',
    'Health steps describe British Columbia and Ontario; other provinces have their own',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    { title: 'Leaving Canada (emigrants) — Canada.ca', url: `${EMIGRANTS}/leaving-canada-emigrants.html` },
    { title: 'Dispositions of property for emigrants — Canada.ca', url: `${EMIGRANTS}/dispositions-property.html` },
    { title: 'Determining your residency status — Canada.ca', url: `${CRA}/international-non-residents/information-been-moved/determining-your-residency-status.html` },
    { title: 'Non-residents of Canada — Canada.ca', url: `${EMIGRANTS}/non-residents-canada.html` },
    { title: 'Electing under section 217 — Canada.ca', url: `${EMIGRANTS}/electing-under-section-217.html` },
    { title: 'Understand PR status — Canada.ca', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/pr-card/understand-pr-status.html' },
    { title: 'Old Age Security: Eligibility — Canada.ca', url: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/eligibility.html' },
    { title: 'My Service Canada Account — Canada.ca', url: 'https://www.canada.ca/en/employment-social-development/services/my-account.html' },
    { title: 'Voting by special ballot from outside Canada — Elections Canada', url: 'https://www.elections.ca/content.aspx?section=vot&dir=bal/outside&document=index&lang=e' },
    { title: 'Medical Services Plan eligibility — Province of British Columbia', url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible' },
    { title: 'Apply for OHIP and get a health card — Ontario.ca', url: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
  ],
  steps: [
    {
      id: 'residency',
      title: 'Work out when you stop being a Canadian tax resident',
      offsetDays: -90,
      durationDays: 30,
      dependsOn: [],
      documents: ['Form NR73, if asking the CRA for an opinion'],
      prepare: ['Home, spouse and dependants staying or leaving', 'Bank accounts, cards, licence and health card', 'Tax treaty with the new country'],
      howTo:
        '1. Residency for tax depends on residential ties: a home, a spouse or dependants, and secondary ties such as belongings, accounts, a licence and health coverage.\n2. The departure date is usually the latest of leaving, the spouse or dependants leaving, or becoming resident in the new country.\n3. Form NR73 asks the CRA for an opinion; it is optional.\n4. A tax treaty can settle cases where both countries claim residence.',
    },
    {
      id: 'departure-tax',
      title: 'List property for the deemed disposition on leaving',
      offsetDays: -60,
      durationDays: 30,
      dependsOn: ['residency'],
      documents: ['Form T1161, if property is over $25,000', 'Form T1243', 'Form T1244, if deferring the tax'],
      prepare: ['Fair market value of shares, funds, crypto and collections on the departure date', 'Original cost of each'],
      howTo:
        '1. On leaving, most property is treated as sold at fair market value, and any gain is taxed on the final return; this is often called departure tax.\n2. Canadian real estate, RRSPs, RRIFs, TFSAs and pensions are generally not part of it.\n3. Form T1161 lists property worth more than $25,000 in total; T1243 works out the gain.\n4. The tax on the gain can be deferred with security using form T1244.',
    },
    {
      id: 'registered-accounts',
      title: 'Check the rules for RRSP, TFSA and FHSA as a non-resident',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Latest account statements'],
      prepare: ['Home Buyers\' Plan or Lifelong Learning Plan balance', 'Plans to withdraw from abroad'],
      howTo:
        '1. A TFSA can stay open, but contributions while non-resident are taxed 1% a month until withdrawn, and no new room builds.\n2. RRSPs can stay; withdrawals as a non-resident face non-resident withholding tax, which a treaty can lower.\n3. An unpaid Home Buyers\' Plan or Lifelong Learning Plan balance has special repayment rules on leaving; check current.\n4. FHSA rules for non-residents limit tax-free home purchase withdrawals; check current.\n5. The new country may tax these accounts differently.',
    },
    {
      id: 'banks',
      title: 'Tell banks and payers you are becoming a non-resident',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: ['residency'],
      documents: [],
      prepare: ['Foreign address', 'List of Canadian accounts, investments and payers'],
      howTo:
        '1. Canadian payers take non-resident withholding tax from interest, dividends, pensions and RRSP payments to non-residents; a treaty may lower the rate.\n2. Some brokers limit trading or new products for non-residents.\n3. NR4 slips replace T5 and similar slips from then on.',
    },
    {
      id: 'pr-status',
      title: 'Decide what to do with permanent resident status',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: [],
      documents: ['PR card'],
      prepare: ['Days in Canada in the last 5 years', 'Plans to return'],
      conditions: ['Only if you are a permanent resident, not a citizen'],
      howTo:
        '1. PR status is kept while the 730-days-in-5-years residency obligation can still be met; some time abroad with a Canadian citizen spouse or for a Canadian employer counts.\n2. Status is not lost automatically; it ends by a formal decision, a removal order, or voluntary renunciation.\n3. Voluntary renunciation is an IRCC application, useful for example to visit later as a visitor without questions about residency.\n4. Not immigration advice; check the IRCC pages.',
    },
    {
      id: 'health',
      title: 'Tell the provincial health plan you are leaving',
      offsetDays: 0,
      durationDays: 7,
      dependsOn: [],
      documents: ['Health card or BC Services Card'],
      prepare: ['Departure date', 'Personal health number'],
      howTo:
        '1. British Columbia: Health Insurance BC is told of a permanent move; MSP ends and the BC Services Card is no longer used for health.\n2. Ontario: ServiceOntario is told of the move; OHIP ends once someone no longer lives in Ontario.\n3. Coverage in the new country, or private insurance, fills the gap from the departure date.',
    },
    {
      id: 'benefits',
      title: 'Tell the CRA your departure date and stop benefits',
      offsetDays: 0,
      durationDays: 14,
      dependsOn: ['residency'],
      documents: [],
      prepare: ['CRA My Account sign-in', 'Departure date', 'Foreign address'],
      howTo:
        '1. Non-residents generally cannot get the Canada Child Benefit or the Canada Groceries and Essentials Benefit; provincial payments through the CRA stop too.\n2. The CRA asks to be told the departure date promptly; payments received after leaving are paid back.\n3. A foreign mailing address keeps CRA letters arriving.',
    },
    {
      id: 'pensions',
      title: 'Update Service Canada for CPP and OAS',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['CPP Statement of Contributions'],
      prepare: ['My Service Canada Account sign-in', 'Foreign address and bank'],
      howTo:
        '1. CPP is paid abroad once someone qualifies, wherever they live.\n2. OAS is paid abroad indefinitely after at least 20 years in Canada after age 18; with less, it stops after 6 months away. GIS stops after 6 months abroad.\n3. Canada has social security agreements with many countries, which can count time in both toward eligibility.\n4. A copy of the CPP Statement of Contributions is worth keeping.',
    },
    {
      id: 'vote',
      title: 'Register to vote from abroad',
      offsetDays: 60,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['Last Canadian address', 'Passport or citizenship proof'],
      conditions: ['Only if you are a Canadian citizen aged 18 or over'],
      howTo:
        '1. Elections Canada keeps an International Register of Electors; citizens abroad vote by special ballot in federal elections.\n2. Provincial elections have their own rules.',
    },
    {
      id: 'final-return',
      title: 'File the departure-year tax return',
      offsetDays: 240,
      durationDays: 30,
      dependsOn: ['departure-tax'],
      documents: ['Notice of assessment'],
      prepare: ['Slips for the part-year', 'Forms T1161 and T1243, if they apply', 'Departure date', 'World income after leaving, for credits'],
      howTo:
        '1. The final return is due April 30 of the year after leaving and shows the departure date in the residence section.\n2. Income up to the departure date is taxed as a resident; credits may be prorated.\n3. Later years: a Canadian return is filed only for some Canadian income, such as employment in Canada or a section 217 election on pensions.\n4. The date here is an estimate; move it to April 30.',
    },
  ],
};
