import type { Playbook } from '../../domain/types';

export const adultAdminBc: Playbook = {
  id: 'adult-admin-bc',
  title: 'Adult paperwork · renewals and yearly tax · British Columbia',
  summary:
    'The recurring paperwork of adult life in British Columbia from 19 to 65: the yearly return and credits, savings room, ID renewals, health cover and legal papers.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'adult-admin',
  anchorKind: 'born',
  ages: { from: 19, to: 65 },
  conditions: [
    'An adult living in British Columbia, from 19 to 65',
    'Some steps are only for Canadian citizens, renters, home owners or people without workplace benefits',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Important dates for individuals — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/important-dates-individuals.html',
    },
    {
      title: 'Canada Groceries and Essentials Benefit (CGEB) — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-groceries-essentials-benefit.html',
    },
    {
      title: "Renter's tax credit — Province of British Columbia",
      url: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/personal/credits/renters-tax-credit',
    },
    {
      title: 'Home owner grant — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/annual-property-tax/home-owner-grant',
    },
    {
      title: 'Before you contribute to a TFSA — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributing/before.html',
    },
    {
      title: 'Opening your FHSAs — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account/opening-your-fhsas.html',
    },
    {
      title: 'How contributions affect your RRSP deduction limit — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/contributions-affect-your-rrsp-prpp-deduction-limit.html',
    },
    {
      title: 'Apply for a new adult passport — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/new-adult-passport.html',
    },
    {
      title: 'Renew or replace a BC Services Card — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/your-card/replace-renew-card',
    },
    {
      title: 'Fair PharmaCare plan — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/who-we-cover/fair-pharmacare-plan',
    },
    {
      title: 'Health Connect Registry — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/health-connect-registry',
    },
    {
      title: 'Canadian Dental Care Plan: Do you qualify — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/dental/dental-care-plan/qualify.html',
    },
    {
      title: 'Incapacity planning — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/managing-your-health/incapacity-planning',
    },
  ],
  steps: [
    {
      id: 'tax-return',
      title: 'File the yearly tax return',
      offsetDays: 6940,
      durationDays: 30,
      ages: { from: 19, to: 65 },
      dependsOn: [],
      documents: ['T4 and other tax slips', 'Notice of assessment'],
      prepare: ['Social Insurance Number', 'CRA My Account sign-in', 'Receipts for tuition, rent, medical and donations'],
      howTo:
        '1. The return is due April 30 each year; with self-employment income (yours or a spouse’s), filing is due June 15, but any balance is still due April 30.\n2. Filing even with little or no income keeps benefits such as the Canada Groceries and Essentials Benefit (CGEB) and, for parents, the Canada Child Benefit coming.\n3. With a spouse or common-law partner, both file every year; benefits are worked out from family income.\n4. The B.C. Family Benefit comes automatically with the Canada Child Benefit; there is no separate application.\n5. This repeats every year; the date here is an estimate for the first return after 19.',
    },
    {
      id: 'renters-credit',
      title: "Claim the B.C. renter's tax credit",
      offsetDays: 6940,
      durationDays: 30,
      ages: { from: 19, to: 65 },
      conditions: ['Only if you rented a home in B.C. for at least 6 months of the year'],
      dependsOn: [],
      documents: ['Form BC479 British Columbia Credits'],
      prepare: ['Rental address and months rented', 'Adjusted family net income'],
      howTo:
        "1. The credit is claimed on form BC479 with the tax return.\n2. It is for people 19 or older, a parent, or living with a spouse on December 31, who rented an eligible unit in B.C. for at least 6 one-month periods.\n3. The maximum is $400; it shrinks above an income threshold and is refundable (check current amounts).\n4. This repeats every year with the return.",
    },
    {
      id: 'savings-room',
      title: 'Check TFSA, FHSA and RRSP room',
      offsetDays: 7000,
      durationDays: 14,
      ages: { from: 19, to: 65 },
      dependsOn: [],
      documents: ['Notice of assessment'],
      prepare: ['CRA My Account sign-in', 'Statements from each account'],
      howTo:
        '1. TFSA room builds from the year you turn 18 and carries forward; CRA My Account shows it, but recent contributions may not be counted yet.\n2. An FHSA is for first-time home buyers: up to $8,000 a year and $40,000 in total (check current); ask the issuer about the minimum age to open one in B.C., where the age of majority is 19.\n3. RRSP room comes from earned income and is on the notice of assessment; contributions for a tax year are due 60 days after the year ends.\n4. Not financial advice; this repeats every year.',
    },
    {
      id: 'estate',
      title: 'Make a will, enduring power of attorney and representation agreement',
      offsetDays: 6970,
      durationDays: 30,
      ages: { from: 19, to: 65 },
      dependsOn: [],
      documents: ['Will', 'Enduring power of attorney', 'Representation agreement'],
      prepare: ['Who should decide on money and on care', 'Beneficiaries on TFSA, RRSP, pension and insurance'],
      howTo:
        '1. In B.C. an enduring power of attorney covers financial affairs, and a representation agreement covers health and personal care.\n2. An advance directive gives or refuses consent to health care directly.\n3. The standard provincial forms are optional.\n4. Review after marriage, separation, a child or buying a home.\n5. Not legal advice; age 19 here is only a prompt.',
    },
    {
      id: 'pharmacare',
      title: 'Register for Fair PharmaCare',
      offsetDays: 7000,
      durationDays: 30,
      ages: { from: 19, to: 65 },
      conditions: ['Only if you are enrolled in MSP and not registered yet'],
      dependsOn: [],
      documents: ['Fair PharmaCare confirmation of coverage'],
      prepare: ['Personal Health Number', 'Social Insurance Number', 'Net income from the tax return of 2 years ago'],
      howTo:
        '1. Fair PharmaCare is open to anyone enrolled in MSP; the deductible depends on family net income, not age.\n2. Register online, by phone with Health Insurance BC, or on paper.\n3. Return the CRA consent form within 30 days, or the temporary coverage ends.\n4. Coverage continues while income can be checked with the CRA each year, so keep filing taxes.',
    },
    {
      id: 'doctor',
      title: 'Join the Health Connect Registry',
      offsetDays: 6960,
      durationDays: 7,
      ages: { from: 19, to: 65 },
      conditions: ['Only if you have no family doctor or nurse practitioner'],
      dependsOn: [],
      documents: [],
      prepare: ['Personal Health Number', 'Contact details'],
      howTo:
        '1. The Health Connect Registry matches people with a family doctor or nurse practitioner in their area.\n2. Register online or by calling 8-1-1.\n3. Keep the contact details current while waiting.',
    },
    {
      id: 'dental',
      title: 'Check the Canadian Dental Care Plan',
      offsetDays: 7030,
      durationDays: 30,
      ages: { from: 19, to: 65 },
      conditions: ['Only if you have no dental insurance and adjusted family net income is under $90,000'],
      dependsOn: ['tax-return'],
      documents: [],
      prepare: ['Social Insurance Number', "Spouse's tax return filed too"],
      howTo:
        '1. The plan is for Canadian residents for tax purposes with no access to private dental insurance, including health spending accounts.\n2. Adjusted family net income is under $90,000, and the tax returns for the previous year are filed.\n3. Government dental programs do not count as private insurance.\n4. Check again whenever workplace benefits start or stop.',
    },
    {
      id: 'passport',
      title: 'Renew the adult passport',
      offsetDays: 7305,
      durationDays: 30,
      validForDays: 3652,
      ages: { from: 20, to: 65 },
      conditions: ['Only for Canadian citizens with a passport'],
      dependsOn: [],
      documents: ['Passport', 'Passport photos'],
      prepare: ['Expiry date of the current passport', 'Travel plans in the next 6 months'],
      howTo:
        '1. Adult passports are valid for 5 or 10 years.\n2. Many countries want 6 months of validity left past the return date.\n3. The last child passport usually runs out around 20; move this date to your own expiry.\n4. This repeats every 5 or 10 years.',
    },
    {
      id: 'licence-card',
      title: "Renew the driver's licence and BC Services Card",
      offsetDays: 7670,
      durationDays: 30,
      ages: { from: 19, to: 65 },
      dependsOn: [],
      documents: ["BC Driver's Licence and Services Card", 'BC Services Card'],
      prepare: ['Expiry date on the card', 'Current address'],
      howTo:
        "1. The licence and the BC Services Card can be one combined card, renewed at an ICBC driver licensing office; renewals are usually every 5 years (check the expiry on the card).\n2. Renewing the BC Services Card also renews MSP enrolment.\n3. Without a licence, the photo BC Services Card is renewed on its own before it expires.\n4. The date here is an estimate; move it to the expiry on your card. This repeats at each expiry.",
    },
    {
      id: 'home-owner-grant',
      title: 'Claim the home owner grant',
      offsetDays: 10958,
      durationDays: 30,
      ages: { from: 19, to: 65 },
      conditions: ['Only if you own and live in your home in B.C.'],
      dependsOn: [],
      documents: ['Property tax notice'],
      prepare: ['Jurisdiction and roll number', 'Social Insurance Number'],
      howTo:
        '1. The grant lowers property tax on a principal residence and is claimed every year.\n2. Claim after the property tax notice arrives and before the tax due date.\n3. Apply online, by phone or at Service BC; check the current assessed value limit.\n4. The date here is an estimate; move it to your next property tax notice.',
    },
  ],
};
