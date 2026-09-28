import type { Playbook } from '../../domain/types';

export const adultAdminOn: Playbook = {
  id: 'adult-admin-on',
  title: 'Adult paperwork · renewals and yearly tax · Ontario',
  summary:
    'The recurring paperwork of adult life in Ontario from 18 to 65: the yearly return and credits, savings room, ID renewals, health cover and legal papers.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'adult-admin',
  anchorKind: 'born',
  ages: { from: 18, to: 65 },
  conditions: [
    'An adult living in Ontario, from 18 to 65',
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
      title: 'Ontario Trillium Benefit — Ontario.ca',
      url: 'https://www.ontario.ca/page/ontario-trillium-benefit',
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
      title: "Renew a driver's licence — Ontario.ca",
      url: 'https://www.ontario.ca/page/renew-drivers-licence',
    },
    {
      title: 'Health card renewal — Ontario.ca',
      url: 'https://www.ontario.ca/page/health-card-renewal',
    },
    {
      title: 'Learn about OHIP+ — Ontario.ca',
      url: 'https://www.ontario.ca/page/learn-about-ohip-plus',
    },
    {
      title: 'Get help with high prescription drug costs — Ontario.ca',
      url: 'https://www.ontario.ca/page/get-help-high-prescription-drug-costs',
    },
    {
      title: 'Find a family doctor or nurse practitioner — Ontario.ca',
      url: 'https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner',
    },
    {
      title: 'Canadian Dental Care Plan: Do you qualify — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/dental/dental-care-plan/qualify.html',
    },
    {
      title: 'Make a power of attorney — Ontario.ca',
      url: 'https://www.ontario.ca/page/make-power-attorney',
    },
  ],
  steps: [
    {
      id: 'tax-return',
      title: 'File the yearly tax return',
      offsetDays: 6575,
      durationDays: 30,
      ages: { from: 18, to: 65 },
      dependsOn: [],
      documents: ['T4 and other tax slips', 'Notice of assessment'],
      prepare: ['Social Insurance Number', 'CRA My Account sign-in', 'Receipts for tuition, rent, property tax, medical and donations'],
      howTo:
        '1. The return is due April 30 each year; with self-employment income (yours or a spouse’s), filing is due June 15, but any balance is still due April 30.\n2. Filing even with little or no income keeps benefits such as the Canada Groceries and Essentials Benefit (CGEB) and, for parents, the Canada Child Benefit coming.\n3. With a spouse or common-law partner, both file every year; benefits are worked out from family income.\n4. The Ontario Child Benefit comes with the Canada Child Benefit; there is no separate application.\n5. This repeats every year; the date here is an estimate for the first return after 18.',
    },
    {
      id: 'on-ben',
      title: 'Apply for the Ontario Trillium Benefit (ON-BEN)',
      offsetDays: 6575,
      durationDays: 30,
      ages: { from: 18, to: 65 },
      conditions: ['Only if you paid rent or property tax in Ontario, or may get the Ontario sales tax credit'],
      dependsOn: [],
      documents: ['ON-BEN Application Form, in the tax return package'],
      prepare: ['Rent paid or property tax paid for the year', 'Address and landlord or roll number details'],
      howTo:
        '1. The Ontario Trillium Benefit combines the Ontario Energy and Property Tax Credit, the Northern Ontario Energy Credit and the Ontario Sales Tax Credit.\n2. It is applied for with the ON-BEN form in the tax return, by April 30.\n3. The sales tax credit is for people 19 or older, or younger with a spouse or child; other age and household rules apply to each part (check current).\n4. Amounts over $500 can be paid monthly from July or as one payment the next June.\n5. This repeats every year with the return.',
    },
    {
      id: 'savings-room',
      title: 'Check TFSA, FHSA and RRSP room',
      offsetDays: 6635,
      durationDays: 14,
      ages: { from: 18, to: 65 },
      dependsOn: [],
      documents: ['Notice of assessment'],
      prepare: ['CRA My Account sign-in', 'Statements from each account'],
      howTo:
        '1. TFSA room builds from the year you turn 18 and carries forward; CRA My Account shows it, but recent contributions may not be counted yet.\n2. An FHSA is for first-time home buyers 18 or older: up to $8,000 a year and $40,000 in total (check current).\n3. RRSP room comes from earned income and is on the notice of assessment; contributions for a tax year are due 60 days after the year ends.\n4. Not financial advice; this repeats every year.',
    },
    {
      id: 'estate',
      title: 'Make a will and powers of attorney for property and personal care',
      offsetDays: 6605,
      durationDays: 30,
      ages: { from: 18, to: 65 },
      dependsOn: [],
      documents: ['Will', 'Continuing power of attorney for property', 'Power of attorney for personal care'],
      prepare: ['Who should decide on money and on care', 'Beneficiaries on TFSA, RRSP, pension and insurance'],
      howTo:
        '1. In Ontario a power of attorney for property covers money and property (from 18), and a power of attorney for personal care covers health and care decisions (from 16).\n2. Both can be made for free with the Ontario kit or online tool, or with a lawyer.\n3. Review after marriage, separation, a child or buying a home.\n4. Not legal advice; age 18 here is only a prompt.',
    },
    {
      id: 'drug-cover',
      title: 'Check drug cover when OHIP+ ends at 25',
      offsetDays: 9101,
      durationDays: 30,
      ages: { from: 24, to: 25 },
      conditions: ['Only if you have no private drug plan'],
      dependsOn: [],
      documents: [],
      prepare: ['Prescriptions taken regularly', 'Household income from the last tax return'],
      howTo:
        '1. OHIP+ covers eligible prescriptions for people 24 and under with OHIP and no private plan.\n2. It stops on the 25th birthday, or once a private plan starts.\n3. The Trillium Drug Program helps with high drug costs compared with household income, including for people with a private plan.\n4. Check a workplace or student plan first.',
    },
    {
      id: 'doctor',
      title: 'Register with Health Care Connect',
      offsetDays: 6595,
      durationDays: 7,
      ages: { from: 18, to: 65 },
      conditions: ['Only if you have no family doctor or nurse practitioner'],
      dependsOn: [],
      documents: [],
      prepare: ['Ontario health card number', 'Mailing address matching the health card'],
      howTo:
        '1. Health Care Connect assigns a Care Connector to look for a family doctor, nurse practitioner or team taking new patients nearby.\n2. Register online or by calling 811; people who used it before re-register by phone.\n3. Keep the health card current while waiting.',
    },
    {
      id: 'dental',
      title: 'Check the Canadian Dental Care Plan',
      offsetDays: 6665,
      durationDays: 30,
      ages: { from: 18, to: 65 },
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
      id: 'licence',
      title: "Renew the driver's licence",
      offsetDays: 7670,
      durationDays: 30,
      ages: { from: 18, to: 65 },
      conditions: ["Only if you have an Ontario driver's licence"],
      dependsOn: [],
      documents: ["Ontario driver's licence"],
      prepare: ['Expiry date on the licence', 'Current address'],
      howTo:
        '1. Ontario licences are renewed every 5 years, online if eligible or at a ServiceOntario centre.\n2. Free reminders by email, text or phone can be set up.\n3. The date here is an estimate; move it to the expiry on your licence. This repeats every 5 years.',
    },
    {
      id: 'health-card',
      title: 'Renew the photo health card',
      offsetDays: 7670,
      durationDays: 42,
      ages: { from: 18, to: 65 },
      dependsOn: [],
      documents: ['Ontario photo health card'],
      prepare: ["Driver's licence or Ontario Photo Card, for online renewal", 'Current address'],
      howTo:
        '1. Photo health cards are renewed every 5 years; a reminder comes by mail.\n2. Online renewal works within 180 days before or after expiry, with an up-to-date photo on file and a licence or Ontario Photo Card.\n3. A red and white card is replaced in person at ServiceOntario.\n4. The new card arrives in about 4 to 6 weeks, at no cost. This repeats every 5 years.',
    },
  ],
};
