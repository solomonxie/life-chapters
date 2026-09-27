import type { Playbook } from '../../domain/types';

export const retirementBc: Playbook = {
  id: 'retirement-bc',
  title: 'Retirement · British Columbia',
  summary:
    'Paperwork plan for public pensions, registered savings and senior benefits from 55 to 72. Federal rules, with British Columbia drug, income and property tax programs.',
  region: 'British Columbia, Canada',
  province: 'BC',
  family: 'retirement',
  anchorKind: 'born',
  ages: { from: 55, to: 72 },
  conditions: [
    'You live in Canada; the drug, supplement and property tax programs are for British Columbia residents',
    'You paid into the Canada Pension Plan, or expect OAS from living in Canada',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'My Service Canada Account — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/my-account.html',
    },
    {
      title: 'CPP Statement of Contributions — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/statement-contributions.html',
    },
    {
      title: 'CPP retirement pension: When to start — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-benefit/when-start.html',
    },
    {
      title: 'CPP retirement pension: Apply — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-benefit/apply.html',
    },
    {
      title: 'Old Age Security: Eligibility — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/eligibility.html',
    },
    {
      title: 'Old Age Security: Apply — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/apply.html',
    },
    {
      title: 'Old Age Security: When to start — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/when-start.html',
    },
    {
      title: 'Guaranteed Income Supplement — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/guaranteed-income-supplement.html',
    },
    {
      title: 'Options for your own RRSPs — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/rrsp-options-when-you-turn-71/options-your-rrsps.html',
    },
    {
      title: 'RRSP options when you turn 71 — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/rrsp-options-when-you-turn-71.html',
    },
    {
      title: 'Receiving income from a RRIF — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-retirement-income-fund-rrif/receiving-income-a-rrif.html',
    },
    {
      title: 'Fair PharmaCare plan — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/who-we-cover/fair-pharmacare-plan',
    },
    {
      title: "Senior's Supplement — Province of British Columbia",
      url: 'https://www2.gov.bc.ca/gov/content/family-social-supports/seniors/financial-legal-matters/income-security-programs/seniors-supplement',
    },
    {
      title: 'Property tax deferment program: Eligibility — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/annual-property-tax/property-tax-deferment-program/eligibility',
    },
    {
      title: 'Apply for the property tax deferment program — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/annual-property-tax/property-tax-deferment-program/apply',
    },
    {
      title: 'Home owner grant for seniors — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/annual-property-tax/home-owner-grant/senior',
    },
    {
      title: 'Apply for the home owner grant — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/annual-property-tax/home-owner-grant/apply',
    },
    {
      title: 'Incapacity planning — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/managing-your-health/incapacity-planning',
    },
    {
      title: 'Advance care planning — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/family-social-supports/seniors/health-safety/advance-care-planning',
    },
    {
      title: 'Wills, Estates and Succession Act, S.B.C. 2009, c. 13',
      url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/09013_01',
    },
  ],
  steps: [
    {
      id: 'msca',
      title: 'Sign up for My Service Canada Account',
      offsetDays: 20089,
      durationDays: 14,
      ages: { from: 55, to: 55 },
      dependsOn: [],
      documents: [],
      prepare: ['Social Insurance Number', 'GCKey, or online banking for a Sign-In Partner'],
      howTo:
        '1. Register with a GCKey or through a Sign-In Partner (online banking).\n2. Identity may be confirmed with a Personal Access Code sent by mail.\n3. The account is where CPP and OAS are applied for and tracked.\n4. The 14 days is an estimate, to allow for a mailed code.',
    },
    {
      id: 'cpp-statement',
      title: 'Check your CPP Statement of Contributions',
      offsetDays: 20119,
      durationDays: 14,
      ages: { from: 55, to: 55 },
      dependsOn: ['msca'],
      documents: ['CPP Statement of Contributions'],
      prepare: ['Old T4 slips', 'Notices of assessment for self-employed years'],
      howTo:
        '1. In My Service Canada Account, open Canada Pension Plan and view contributions and benefit estimates.\n2. Compare each year with your T4 slips; report errors straight away with T4s, an employer letter, or a T1 and notice of assessment.\n3. It can also be requested by mail.',
    },
    {
      id: 'cpp-choose',
      title: 'Choose when to start CPP',
      offsetDays: 21550,
      durationDays: 30,
      ages: { from: 59, to: 59 },
      dependsOn: ['cpp-statement'],
      documents: [],
      prepare: ['CPP benefit estimates', 'Health, other income and work plans'],
      howTo:
        '1. CPP can start any time from age 60 to 70.\n2. Before 65 it drops 0.6% a month, up to 36% less at 60.\n3. After 65 it rises 0.7% a month, up to 42% more at 70.\n4. There is no gain in waiting past 70.\n5. Not financial advice; the Service Canada estimates help compare.',
    },
    {
      id: 'cpp-apply',
      title: 'Apply for the CPP retirement pension',
      offsetDays: 23559,
      durationDays: 28,
      ages: { from: 64, to: 64 },
      dependsOn: ['cpp-choose'],
      documents: ['CPP decision letter'],
      prepare: ['Social Insurance Number', 'Bank details for direct deposit', 'Countries lived or worked in', "Children's details, for the child-rearing provision"],
      howTo:
        '1. Apply up to 12 months before the chosen start date, in My Service Canada Account.\n2. Online applications get a decision by mail within 28 days; paper within 120 days.\n3. This date assumes a start at 65; move it to about 6 months before the start age you chose.',
    },
    {
      id: 'oas-letter',
      title: 'Watch for the OAS enrolment letter',
      offsetDays: 23406,
      durationDays: 30,
      ages: { from: 64, to: 64 },
      dependsOn: [],
      documents: ['OAS enrolment letter'],
      prepare: ['Check the mail around your 64th birthday'],
      howTo:
        '1. Most people get a letter around their 64th birthday saying they are enrolled automatically for OAS at 65.\n2. OAS needs at least 10 years living in Canada after age 18 (20 years if living abroad).\n3. You can delay OAS to as late as 70: it rises 0.6% a month, up to 36% at 70. If you qualify for GIS, there is no gain in waiting.',
    },
    {
      id: 'oas-apply',
      title: 'Apply for Old Age Security',
      offsetDays: 23436,
      durationDays: 30,
      ages: { from: 64, to: 64 },
      conditions: ['Only if no enrolment letter came a month after your 64th birthday'],
      dependsOn: ['oas-letter'],
      documents: [],
      prepare: ['Social Insurance Number', 'Dates lived in Canada since 18', 'Bank details'],
      howTo:
        '1. If a month has passed since your 64th birthday with no letter, contact Service Canada or apply.\n2. Online applications open once you are at least 1 month past your 64th birthday, in My Service Canada Account.\n3. The 30 days is an estimate.',
    },
    {
      id: 'gis',
      title: 'Check the Guaranteed Income Supplement',
      offsetDays: 23741,
      durationDays: 30,
      ages: { from: 65, to: 72 },
      conditions: ['Only if your income is low'],
      dependsOn: ['oas-letter'],
      documents: [],
      prepare: ['File your taxes every year'],
      howTo:
        '1. GIS is for people 65 or older who get OAS and have a low income.\n2. Service Canada enrols most people automatically if it has their information.\n3. Unfiled taxes can stop or reduce GIS.\n4. GIS does not increase if you delay OAS.',
    },
    {
      id: 'pharmacare',
      title: 'Register for Fair PharmaCare',
      offsetDays: 20149,
      durationDays: 30,
      ages: { from: 55, to: 55 },
      conditions: ['Only if your family is not registered yet'],
      dependsOn: [],
      documents: ['Fair PharmaCare confirmation of coverage'],
      prepare: ['Personal Health Numbers', 'Social Insurance Numbers for the adults', 'Net income from the tax return of 2 years ago'],
      howTo:
        '1. Fair PharmaCare is open to anyone enrolled in MSP; coverage depends on family net income, not age, and there is no separate drug plan that starts at a set age.\n2. Register online, by phone with Health Insurance BC, or on paper.\n3. Return the CRA consent form within 30 days, or the temporary coverage ends.\n4. Once registered you stay covered as long as income can be checked with the CRA each year, so keep filing taxes.\n5. Age 55 here is only a prompt; register any time.',
    },
    {
      id: 'tax-deferment',
      title: 'Look into the property tax deferment program',
      offsetDays: 20271,
      durationDays: 30,
      ages: { from: 55, to: 72 },
      conditions: ['Only if you own and live in your home in B.C.'],
      dependsOn: [],
      documents: ['Property tax notice', 'BC Assessment notice'],
      prepare: ['Jurisdiction and roll number', 'Mortgage and other charges on the property', 'Check the current interest rate and fees'],
      howTo:
        '1. The regular program is for owners 55 or older in the current year, surviving spouses and people with disabilities; only one owner needs to be 55.\n2. You need to have lived in B.C. at least one year, live in the home as your principal residence, have paid earlier taxes, and keep at least 25% equity.\n3. It is a loan: interest accrues and the deferred taxes are repaid when the home is sold or transferred.\n4. Apply online through eTaxBC between May 1 and December 31; automatic renewal can carry it to later years.\n5. Not financial advice; the date here is an estimate for the first spring after you turn 55.',
    },
    {
      id: 'estate',
      title: 'Update the will, enduring power of attorney and representation agreement',
      offsetDays: 21915,
      durationDays: 30,
      ages: { from: 60, to: 60 },
      dependsOn: [],
      documents: ['Will', 'Enduring power of attorney', 'Representation agreement', 'Advance directive'],
      prepare: ['Who should decide on money and on care', 'Beneficiaries on RRSPs, pensions and insurance'],
      howTo:
        '1. In B.C. an enduring power of attorney covers financial affairs, and a representation agreement covers health and personal care.\n2. A section 9 representation agreement covers personal and health care; a section 7 one can also cover routine finances and legal services.\n3. An advance directive gives or refuses consent to health care directly; without a representative, providers turn to a temporary substitute decision maker from a set list.\n4. The standard provincial forms are optional, and the My Voice guide walks through advance care planning.\n5. Not legal advice; age 60 here is only a prompt; review after any big change.',
    },
    {
      id: 'home-grant',
      title: 'Claim the senior home owner grant',
      offsetDays: 23772,
      durationDays: 30,
      ages: { from: 65, to: 72 },
      conditions: ['Only if you own and live in your home in B.C.'],
      dependsOn: [],
      documents: ['Property tax notice'],
      prepare: ['Jurisdiction and roll number', 'Social Insurance Number', 'Check the current assessed value limit'],
      howTo:
        '1. Owners who are 65 or older in the current year can claim the higher additional grant on their principal residence.\n2. The grant is claimed every year: after the property tax notice arrives and before the tax due date, and no later than December 31.\n3. Apply online through eTaxBC, by phone or at Service BC.\n4. Above the assessed value limit, a low-income grant supplement may still apply.\n5. The date here is an estimate; move it to your next property tax notice.',
    },
    {
      id: 'seniors-supplement',
      title: "Check the BC Senior's Supplement",
      offsetDays: 23802,
      durationDays: 30,
      ages: { from: 65, to: 72 },
      conditions: ['Only if you get the Guaranteed Income Supplement'],
      dependsOn: ['gis'],
      documents: [],
      prepare: ['File your taxes every year'],
      howTo:
        "1. The Senior's Supplement tops up low-income B.C. residents who get OAS and GIS.\n2. There is no application; it starts one month after your first OAS and GIS payment.\n3. The amount is based on your OAS and GIS, which use last year's tax return.",
    },
    {
      id: 'rrsp-convert',
      title: 'Convert the RRSP to a RRIF or annuity',
      offsetDays: 25933,
      durationDays: 30,
      ages: { from: 71, to: 71 },
      conditions: ['Only if you have an RRSP'],
      dependsOn: [],
      documents: [],
      prepare: ['RRSP statements', 'Talk to the RRSP issuer'],
      howTo:
        '1. By the end of the year you turn 71, choose to withdraw the RRSP, transfer it to a RRIF, or buy an annuity.\n2. December 31 of that year is also the last day to contribute to your own RRSP.\n3. Direct transfers to a RRIF or annuity have no tax withheld; a withdrawal does.\n4. This date is your 71st birthday, a safe point before the December 31 deadline.',
    },
    {
      id: 'rrif-min',
      title: 'Take the first RRIF minimum withdrawal',
      offsetDays: 26298,
      durationDays: 30,
      ages: { from: 72, to: 72 },
      conditions: ['Only if you have a RRIF'],
      dependsOn: ['rrsp-convert'],
      documents: [],
      prepare: ["Minimum amount from the RRIF carrier", "Spouse's date of birth, if using their age"],
      howTo:
        '1. Minimum payments start the year after the RRIF is set up, and continue every year.\n2. The carrier sets the minimum from your age at the start of the year; you can elect your spouse\'s age instead.\n3. You can take more than the minimum, but not less.\n4. RRIF payments are taxable income in the year received.',
    },
  ],
};
