import type { Playbook } from '../../domain/types';

const CRA = 'https://www.canada.ca/en/revenue-agency/services';
const PENSIONS = 'https://www.canada.ca/en/services/benefits/publicpensions';

export const retireCa: Playbook = {
  id: 'retire-ca',
  title: 'Leaving work · pensions and benefits · Canada',
  summary:
    'Paperwork plan around the last day of work in Canada: public pension applications, the workplace pension choice, moving group savings, replacing workplace benefits, and tax on pension income.',
  region: 'Canada',
  country: 'CA',
  family: 'retire',
  anchorKind: 'retire',
  conditions: [
    'You are retiring from work in Canada, fully or mostly',
    'The date is the last day of work; the age-based CPP, OAS and RRIF steps are in the retirement plans for British Columbia and Ontario',
    'Some steps apply only to people with a workplace pension, group savings or group benefits',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    { title: 'CPP retirement pension: Apply — Canada.ca', url: `${PENSIONS}/cpp/cpp-benefit/apply.html` },
    { title: 'Old Age Security: Apply — Canada.ca', url: `${PENSIONS}/old-age-security/apply.html` },
    { title: 'CPP Post-retirement benefit — Canada.ca', url: `${PENSIONS}/cpp/post-retirement-benefit.html` },
    { title: 'My Service Canada Account — Canada.ca', url: 'https://www.canada.ca/en/employment-social-development/services/my-account.html' },
    { title: 'Options for your own RRSPs — Canada.ca', url: `${CRA}/tax/individuals/topics/rrsps-related-plans/rrsp-options-when-you-turn-71/options-your-rrsps.html` },
    { title: 'TD1 forms for pay received on January 1, 2026 or later — Canada.ca', url: `${CRA}/forms-publications/td1-personal-tax-credits-returns/td1-forms-pay-received-on-january-1-later.html` },
    { title: 'Paying your income tax by instalments — Canada.ca', url: `${CRA}/tax/individuals/topics/about-your-tax-return/making-payments-individuals/paying-your-income-tax-instalments.html` },
    { title: 'Canadian Dental Care Plan — Canada.ca', url: 'https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html' },
    { title: 'EI Record of Employment — Canada.ca', url: 'https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/ei-roe.html' },
    { title: 'Fair PharmaCare plan — Province of British Columbia', url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/who-we-cover/fair-pharmacare-plan' },
    { title: 'Get coverage for prescription drugs (Ontario Drug Benefit) — Ontario.ca', url: 'https://www.ontario.ca/page/get-coverage-prescription-drugs' },
  ],
  steps: [
    {
      id: 'public-pensions',
      title: 'Apply for CPP and OAS if not already done',
      offsetDays: -180,
      durationDays: 30,
      dependsOn: [],
      documents: ['CPP application confirmation', 'OAS enrolment letter or application'],
      prepare: ['My Service Canada Account sign-in', 'SIN', 'Bank details for direct deposit', 'Chosen start month'],
      conditions: ['Only if you plan to start CPP or OAS around the time you stop work'],
      howTo:
        '1. CPP can start from 60 and is applied for online up to 12 months before the chosen start month.\n2. OAS starts from 65; many people are enrolled automatically, others apply up to 11 months ahead.\n3. Stopping work does not force either to start; waiting raises the monthly amount, up to 70.\n4. The age-based steps are in the retirement plan for your province.',
    },
    {
      id: 'pension-choice',
      title: 'Choose how to take the workplace pension',
      offsetDays: -120,
      durationDays: 60,
      dependsOn: [],
      documents: ['Pension options statement', 'Signed election form', 'Spousal waiver, if a joint pension is declined'],
      prepare: ['Lifetime pension amounts for each option', 'Commuted value, if offered', 'Spouse\'s pension and health situation'],
      conditions: ['Only if you belong to a workplace defined benefit pension plan'],
      howTo:
        '1. The plan administrator sends a statement with the options: a lifetime pension (single, or joint and survivor), and sometimes a lump-sum commuted value.\n2. A commuted value usually moves to a locked-in account (LIRA or LIF) up to a tax limit, with any excess paid as taxable cash.\n3. Declining a joint and survivor pension usually needs the spouse\'s signed waiver.\n4. The election window is set by the plan, often 60 to 90 days; the choice is usually final.',
    },
    {
      id: 'group-savings',
      title: 'Move group RRSP or defined contribution savings',
      offsetDays: -60,
      durationDays: 30,
      dependsOn: [],
      documents: ['Group plan statement', 'Transfer forms'],
      prepare: ['Receiving institution and account type', 'Plan deadline after leaving'],
      conditions: ['Only if you have a group RRSP, DPSP or defined contribution pension'],
      howTo:
        '1. Group plans usually ask for a decision within a set time after leaving; otherwise money may be moved to a default option.\n2. Group RRSP money can move to an individual RRSP or straight to a RRIF or annuity; locked-in pension money moves to a LIRA, LIF or annuity.\n3. A direct transfer avoids withholding tax.\n4. RRSPs convert to a RRIF or annuity by the end of the year of turning 71; see the retirement plan for your province.',
    },
    {
      id: 'benefits',
      title: 'Replace group health and dental benefits',
      offsetDays: 0,
      durationDays: 30,
      dependsOn: [],
      documents: ['Benefits termination letter', 'Conversion or individual plan confirmation'],
      prepare: ['Prescriptions and regular dental needs', 'Retiree benefits booklet, if any', 'Household net income'],
      howTo:
        '1. Group benefits usually end on or soon after the last day of work; some employers offer retiree benefits.\n2. Insurers often let people convert to an individual plan without a medical questionnaire if they apply within a short window, often about 31 days; the booklet has the real deadline.\n3. The Canadian Dental Care Plan covers residents without dental insurance and with adjusted family net income under $90,000.\n4. Drug costs: British Columbia\'s Fair PharmaCare is income-based at any age; the Ontario Drug Benefit covers most people 65 and over.',
    },
    {
      id: 'final-pay',
      title: 'Check the final pay, vacation pay and Record of Employment',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: [],
      documents: ['Final pay stub', 'Record of Employment (ROE)'],
      prepare: ['Unused vacation days', 'My Service Canada Account sign-in'],
      howTo:
        '1. Final pay includes earned wages and unused vacation pay; provincial employment standards set the deadline.\n2. The employer issues a Record of Employment, viewable in My Service Canada Account.\n3. Any retiring allowance can be partly transferred to an RRSP only for service years before 1996.',
    },
    {
      id: 'withholding',
      title: 'Set tax withholding on pension income',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['TD1 for the pension payer', 'Request for voluntary federal income tax deductions (ISP-3520)'],
      prepare: ['Expected total income for the year', 'Every pension and RRIF source'],
      conditions: ['Only if you receive a workplace pension, CPP, OAS or RRIF payments'],
      howTo:
        '1. Each payer withholds as if it were the only income, so several pensions together can leave tax owing.\n2. A TD1 to the pension payer, or a request for extra deductions, raises withholding; for CPP and OAS, Service Canada takes form ISP-3520 or a request in My Service Canada Account.\n3. Without enough withheld, the CRA may send instalment reminders the next year.',
    },
    {
      id: 'post-retirement',
      title: 'Note CPP contributions if working again after starting CPP',
      offsetDays: 90,
      durationDays: 14,
      dependsOn: [],
      documents: ['Form CPT30, if opting out'],
      prepare: ['Age', 'Pay stub showing CPP deductions'],
      conditions: ['Only if you draw CPP and keep or take up paid work before 70'],
      howTo:
        '1. Working while receiving CPP between 60 and 70 means paying CPP contributions, which build a Post-Retirement Benefit added to the pension the next year.\n2. From 65 to 70, contributions can be stopped with form CPT30 given to the employer.\n3. The Post-Retirement Benefit is paid automatically.',
    },
    {
      id: 'tax-return',
      title: 'File the first return with pension income',
      offsetDays: 300,
      durationDays: 30,
      dependsOn: ['withholding'],
      documents: ['T4A', 'T4A(P)', 'T4A(OAS)', 'T4RIF', 'Notice of assessment'],
      prepare: ['All slips for the year', 'Spouse\'s income, for pension splitting'],
      howTo:
        '1. The return is due April 30 of the next year; slips arrive by the end of February.\n2. Eligible pension income can give the pension income amount and, with a spouse, pension splitting on form T1032.\n3. If tax owing is over $3,000, the CRA may ask for quarterly instalments afterwards.\n4. This date is an estimate; move it to April 30.',
    },
  ],
};
