import type { Playbook } from '../../domain/types';

export const firstJobCa: Playbook = {
  id: 'first-job-ca',
  title: 'Starting a job · Canada',
  summary:
    'Paperwork plan for starting a job in Canada, first or later: SIN and tax forms, contract and probation, benefits and pension enrolment, the first pay stub, then the T4 and the tax return.',
  region: 'Canada',
  country: 'CA',
  family: 'first-job',
  anchorKind: 'first-job',
  ages: { from: 15 },
  conditions: [
    'You are starting a job as an employee in Canada, your first or a new one',
    'Employment standards are provincial; British Columbia and Ontario are described, other provinces have their own',
    'Some steps apply only to work permit holders or to someone leaving another job',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'The Social Insurance Number (SIN) Code of Practice — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/reports/code-of-practice.html',
    },
    {
      title: 'Social Insurance Number: Apply — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/apply.html',
    },
    {
      title: 'TD1 forms for 2026 for pay received on January 1, 2026 or later — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/td1-personal-tax-credits-returns/td1-forms-pay-received-on-january-1-later.html',
    },
    {
      title: 'About the deduction of Canada Pension Plan (CPP) contribution — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp.html',
    },
    {
      title: 'About the deduction of EI premiums — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei.html',
    },
    {
      title: 'EI Record of Employment — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/ei-roe.html',
    },
    {
      title: 'Employers: How to complete the record of employment (ROE) form — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/reports/roe-guide.html',
    },
    {
      title: 'My Service Canada Account — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/my-account.html',
    },
    {
      title: 'Line 10100 – Employment income — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-10100-employment-income.html',
    },
    {
      title: 'Due dates and payment dates - Personal income tax — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/important-dates-individuals.html',
    },
    {
      title: 'Sign in to your CRA account — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html',
    },
    {
      title: 'How contributions affect your RRSP deduction limit — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/contributions-affect-your-rrsp-prpp-deduction-limit.html',
    },
    {
      title: 'Contributing to a TFSA — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributions.html',
    },
    {
      title: 'Find out if you need a work permit (work permit types) — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/work-permit-types.html',
    },
    {
      title: 'Employment standards — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards',
    },
    {
      title: 'Quitting, getting fired or laid off — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/termination',
    },
    {
      title: 'Your guide to the Employment Standards Act — ontario.ca',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0',
    },
    {
      title: 'Termination of employment — Your guide to the Employment Standards Act, ontario.ca',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/termination-employment',
    },
  ],
  steps: [
    {
      id: 'permit-match',
      title: 'Check the job fits your work permit',
      offsetDays: -21,
      durationDays: 7,
      dependsOn: [],
      documents: ['Work permit', 'Offer letter'],
      prepare: ['Employer name, job title and location on the permit, if it names them'],
      conditions: ['Only if you work in Canada on a work permit'],
      howTo:
        '1. An employer-specific work permit names the employer and usually the job and location; a different employer means a new permit first.\n2. An open work permit covers most employers, with some exceptions listed on the permit.\n3. The permit expiry sets how long the job can run on it.\n4. IRCC is the reference; this is not immigration advice.',
    },
    {
      id: 'sin-expiry',
      title: 'Check your SIN expiry matches the permit',
      offsetDays: -7,
      durationDays: 7,
      dependsOn: ['permit-match'],
      documents: ['SIN confirmation letter', 'Work permit'],
      prepare: ['Permit expiry date', 'SIN confirmation letter or record'],
      conditions: ['Only if your SIN starts with 9 (temporary residents)'],
      howTo:
        '1. A SIN starting with 9 carries the same expiry date as the work permit.\n2. After a permit renewal, Service Canada updates the SIN expiry; an employer can ask to see the new date.\n3. Renewing the permit before it expires keeps maintained status while waiting.',
    },
    {
      id: 'contract',
      title: 'Read the offer letter or employment contract',
      offsetDays: -14,
      durationDays: 7,
      dependsOn: [],
      documents: ['Signed offer letter or employment contract'],
      prepare: ['Pay, hours and start date', 'Probation length', 'Benefits and pension waiting periods', 'Notice and termination clauses'],
      howTo:
        '1. The offer or contract sets pay, hours, duties, probation and benefits start dates.\n2. A contract can give more than provincial employment standards, not less.\n3. Keep a signed copy; it is the reference later for probation, benefits and notice.',
    },
    {
      id: 'sin',
      title: 'Give your Social Insurance Number to the employer',
      offsetDays: 3,
      durationDays: 3,
      dependsOn: [],
      documents: ['Social Insurance Number'],
      prepare: ['SIN confirmation letter or record'],
      howTo:
        '1. Under the SIN Code of Practice, a new employee gives the SIN to the employer no later than 3 days after starting.\n2. Without a SIN yet, work can begin: apply within those 3 days and give the number within 3 days of receiving it.\n3. Applying is free, online, in person at Service Canada, or by mail.',
    },
    {
      id: 'td1',
      title: 'Fill in the TD1 federal and provincial forms',
      offsetDays: 3,
      durationDays: 3,
      dependsOn: [],
      documents: ['TD1 Personal Tax Credits Return (federal)', 'TD1 for your province or territory'],
      prepare: ['Credits you can claim: tuition, disability, dependants', 'Other jobs held at the same time'],
      howTo:
        '1. The federal TD1 and the provincial TD1 (TD1BC in British Columbia, TD1ON in Ontario) tell the employer how much tax to withhold.\n2. Without them, the employer withholds using the basic personal amount only.\n3. Someone with two jobs usually claims the credits at one of them only.\n4. A new form is filed when credits change; Quebec has its own provincial form.',
    },
    {
      id: 'direct-deposit',
      title: 'Set up direct deposit for pay',
      offsetDays: 7,
      durationDays: 3,
      dependsOn: [],
      documents: ['Void cheque or direct deposit form'],
      prepare: ['Bank, transit and account numbers'],
      howTo:
        '1. Employers usually ask for a void cheque or the bank\'s direct deposit form.\n2. Most banks produce the form in online banking.',
    },
    {
      id: 'standards',
      title: 'Note probation and your province\'s employment standards',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: ['contract'],
      documents: [],
      prepare: ['Province where you work', 'Probation length from the contract'],
      howTo:
        '1. Minimum wage, overtime, vacation, leaves and termination notice come from the province\'s employment standards law; federally regulated jobs (banks, airlines, telecoms) follow the Canada Labour Code.\n2. British Columbia (Employment Standards Act): after 3 consecutive months of work, the employer owes written notice or compensation for length of service on ending the job, with exceptions such as just cause.\n3. Ontario (Employment Standards Act, 2000): after 3 months of continuous employment, notice or termination pay applies, with exceptions.\n4. A probation clause in the contract does not remove these minimums.\n5. Other provinces publish their own rules; the province\'s employment standards site is the reference.',
    },
    {
      id: 'roe',
      title: 'Check the Record of Employment from the previous job',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: [],
      documents: ['Record of Employment (ROE)'],
      prepare: ['My Service Canada Account sign-in'],
      conditions: ['Only if you left another job'],
      howTo:
        '1. The previous employer issues an ROE whenever earnings stop; electronic ROEs are due within 5 calendar days after the end of the pay period in which the job ended.\n2. ROEs can be viewed and printed in My Service Canada Account.\n3. It matters for any EI claim; errors are fixed by asking the previous employer for an amended ROE.',
    },
    {
      id: 'first-pay',
      title: 'Check your first pay stub',
      offsetDays: 30,
      durationDays: 3,
      dependsOn: ['sin', 'td1', 'direct-deposit'],
      documents: ['First pay stub'],
      prepare: ['Agreed pay and hours', 'CRA Payroll Deductions Online Calculator, to compare'],
      howTo:
        '1. Deductions usually shown: CPP contributions, EI premiums and income tax (federal and provincial); Quebec shows QPP and QPIP instead.\n2. CPP stops for the year once earnings pass the yearly maximum, plus a second tier (CPP2) above it; EI stops at its own maximum.\n3. Benefit premiums, pension or RRSP contributions and union dues may also appear.\n4. Errors are easiest to fix with payroll early in the year.',
    },
    {
      id: 'benefits',
      title: 'Enrol in group benefits within the enrolment window',
      offsetDays: 45,
      durationDays: 14,
      dependsOn: ['contract'],
      documents: ['Benefits enrolment confirmation', 'Benefits card'],
      prepare: ['Dependants\' names and birth dates', 'Beneficiary for life insurance', 'Spouse\'s plan details, for coordination'],
      conditions: ['Only if the employer offers health, dental or insurance benefits'],
      howTo:
        '1. Many plans have a waiting period, then an enrolment window, often 30 to 90 days after starting.\n2. Enrolling late can mean proof of good health or waiting for the next open enrolment, depending on the insurer.\n3. Coverage can be coordinated with a spouse\'s plan.\n4. The date here is an estimate; the benefits booklet has the real window.',
    },
    {
      id: 'pension',
      title: 'Join the workplace pension or group RRSP match',
      offsetDays: 90,
      durationDays: 14,
      dependsOn: ['contract'],
      documents: ['Pension or group RRSP enrolment confirmation'],
      prepare: ['Contribution rate for the full employer match', 'Beneficiary', 'Investment choice'],
      conditions: ['Only if the employer offers a pension plan or group RRSP'],
      howTo:
        '1. Employers may match contributions up to a set percentage; some plans enrol automatically, others wait for the employee.\n2. Eligibility may start after a waiting period, often around 3 months.\n3. Pension contributions reduce next year\'s RRSP room through a pension adjustment on the T4.\n4. The date here is an estimate.',
    },
    {
      id: 'probation-end',
      title: 'Mark the end of probation',
      offsetDays: 90,
      durationDays: 1,
      dependsOn: ['standards'],
      documents: [],
      prepare: ['Probation end date from the contract'],
      howTo:
        '1. Many contracts set a 3-month probation; some benefits and pension plans start after it.\n2. A review meeting is common near the end.\n3. The date here assumes 3 months; move it to the contract\'s date.',
    },
    {
      id: 't4',
      title: 'Collect your T4 slip',
      offsetDays: 240,
      durationDays: 14,
      dependsOn: [],
      documents: ['T4 slip'],
      prepare: ['Employer\'s payroll portal', 'CRA My Account, where T4s also appear'],
      howTo:
        '1. Employers issue T4 slips for the calendar year by the end of February of the next year.\n2. Each employer in the year issues its own T4.\n3. If one has not arrived by early April, the CRA suggests contacting the employer.\n4. This date assumes a mid-year start; move it to the end of February after the first year of work.',
    },
    {
      id: 'tax-return',
      title: 'File the income tax return',
      offsetDays: 300,
      durationDays: 30,
      dependsOn: ['t4'],
      documents: ['Notice of assessment'],
      prepare: ['All T4 slips for the year', 'Receipts for credits and deductions', 'CRA My Account sign-in'],
      howTo:
        '1. For most people the return is due April 30 of the year after.\n2. Filing online with certified software gets a notice of assessment within about 2 weeks.\n3. Filing also keeps benefits such as the GST/HST credit coming.\n4. This date assumes a mid-year start; move it to April 30.',
    },
    {
      id: 'room',
      title: 'Note RRSP and TFSA contribution room in CRA My Account',
      offsetDays: 360,
      durationDays: 14,
      dependsOn: ['tax-return'],
      documents: [],
      prepare: ['CRA My Account sign-in', 'Latest notice of assessment'],
      howTo:
        '1. The notice of assessment and CRA My Account show the RRSP deduction limit for the year: 18% of last year\'s earned income up to a yearly maximum, minus any pension adjustment, plus unused room.\n2. TFSA room grows each year from age 18 while resident in Canada; My Account shows it, though recent-year contributions may not be counted yet.\n3. RRSP contributions more than $2,000 over the limit, and any TFSA excess, are taxed 1% a month until removed.\n4. With a first job, RRSP room starts building from this year\'s earnings and shows on the next notice of assessment.',
    },
  ],
};
