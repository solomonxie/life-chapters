import type { Playbook } from '../../domain/types';

export const retirementOn: Playbook = {
  id: 'retirement-on',
  title: 'Retirement · Ontario',
  summary:
    'Paperwork plan for public pensions, registered savings and senior benefits from 55 to 72. Federal rules, with Ontario health programs.',
  region: 'Ontario, Canada',
  province: 'ON',
  family: 'retirement',
  anchorKind: 'born',
  ages: { from: 55, to: 72 },
  conditions: [
    'You live in Canada; the dental and drug programs are for Ontario residents',
    'You paid into the Canada Pension Plan, or expect OAS from living in Canada',
  ],
  reviewedAt: '2026-09-26',
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
      title: 'Ontario Seniors Dental Care Program — Ontario.ca',
      url: 'https://www.ontario.ca/page/dental-care-low-income-seniors',
    },
    {
      title: 'Get coverage for prescription drugs — Ontario.ca',
      url: 'https://www.ontario.ca/page/get-coverage-prescription-drugs',
    },
    {
      title: 'Make a power of attorney — Ontario.ca',
      url: 'https://www.ontario.ca/page/make-power-attorney',
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
      id: 'estate',
      title: 'Update the will and powers of attorney',
      offsetDays: 21915,
      durationDays: 30,
      ages: { from: 60, to: 60 },
      dependsOn: [],
      documents: ['Will', 'Continuing power of attorney for property', 'Power of attorney for personal care'],
      prepare: ['Who should decide on money and on care', 'Beneficiaries on RRSPs, pensions and insurance'],
      howTo:
        '1. Ontario has two powers of attorney: a continuing power of attorney for property and one for personal care.\n2. Without an attorney for property, family, including a spouse, cannot automatically step in; they may need to go to court.\n3. You can make one yourself for free or with a lawyer.\n4. Not legal advice; age 60 here is only a prompt; review after any big change.',
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
      id: 'odb',
      title: 'Start using the Ontario Drug Benefit',
      offsetDays: 23772,
      durationDays: 1,
      ages: { from: 65, to: 65 },
      conditions: ['Only if you live in Ontario'],
      dependsOn: [],
      documents: ['Health card'],
      prepare: ['Bring the health card to the pharmacy'],
      howTo:
        '1. You join the Ontario Drug Benefit automatically on the first day of the month after you turn 65; a letter comes about 3 months before.\n2. Lower-income seniors can apply to the Seniors Co-Payment Program to pay less.',
    },
    {
      id: 'dental',
      title: 'Apply to the Ontario Seniors Dental Care Program',
      offsetDays: 23772,
      durationDays: 30,
      ages: { from: 65, to: 72 },
      conditions: ['Only if you live in Ontario, your income is under the program limit and you have no other dental benefits apart from the CDCP'],
      dependsOn: [],
      documents: [],
      prepare: ['Social Insurance Number', 'Latest tax return filed', 'Check the current income limits'],
      howTo:
        '1. For Ontario residents 65 or older with low income and no other dental benefits apart from the Canadian Dental Care Plan.\n2. Apply online, or on paper from the local public health unit; income is checked from your tax return.\n3. Coverage ends every July 31 and most people are renewed automatically if they keep filing taxes.',
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
