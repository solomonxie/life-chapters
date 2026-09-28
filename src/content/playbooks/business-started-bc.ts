import type { Playbook } from '../../domain/types';

export const businessStartedBc: Playbook = {
  id: 'business-started-bc',
  title: 'Self-employed or starting a business · British Columbia',
  summary:
    'Paperwork plan for a sole proprietorship or partnership in British Columbia, from the business name and CRA accounts to sales taxes, workers, EI special benefits and the first self-employed tax return.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'business-started',
  anchorKind: 'business-started',
  ages: { from: 19 },
  conditions: [
    'You are starting to work for yourself in British Columbia, as a sole proprietor or in a partnership; the event date is when you start trading',
    'Incorporating a company follows different steps and filings',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Register a proprietorship or partnership — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies/proprietorships-partnerships',
    },
    {
      title: 'BC Registries and Online Services',
      url: 'https://www.bcregistry.gov.bc.ca/',
    },
    {
      title: 'Business number registration — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/registering-your-business/register.html',
    },
    {
      title: 'When to register for and start charging the GST/HST — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/when-register-charge.html',
    },
    {
      title: 'PST registration — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/sales-taxes/pst/register',
    },
    {
      title: 'BizPaL business permits and licences',
      url: 'https://www.bizpal-perle.ca/',
    },
    {
      title: 'Register for coverage — WorkSafeBC',
      url: 'https://www.worksafebc.com/en/insurance/need-coverage/who-needs-coverage',
    },
    {
      title: 'Open or manage a payroll account — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/open-manage-payroll-account.html',
    },
    {
      title: 'EI special benefits for self-employed people — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/ei/ei-self-employed-workers.html',
    },
    {
      title: 'Sole proprietorships and partnerships — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/sole-proprietorships-partnerships.html',
    },
    {
      title: 'Paying your income tax by instalments — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/payments/payments-cra/individual-payments/income-tax-instalments.html',
    },
  ],
  steps: [
    {
      id: 'name-request',
      title: 'Request and reserve a business name',
      offsetDays: -30,
      durationDays: 3,
      validForDays: 56,
      conditions: ['Only if you trade under a name other than your own'],
      dependsOn: [],
      documents: ['Name request approval'],
      prepare: ['Two or three name choices', 'A short description of the business', 'Check the current fee ($30 at review)'],
      howTo:
        '1. Submit a name request online through BC Registries; priority service costs more and is faster.\n2. An approved name is held for 56 days; after that a new request is needed.\n3. Trading under your own name alone does not need registration, but registering protects the name.',
    },
    {
      id: 'register',
      title: 'Register the proprietorship or partnership with BC Registries',
      offsetDays: -7,
      durationDays: 3,
      conditions: ['Only if you trade under a name other than your own'],
      dependsOn: ['name-request'],
      documents: ['Statement of registration'],
      prepare: ['Approved name request number', 'Owner or partner details', 'Business address', 'Check the current fee ($40 at review)'],
      howTo:
        '1. Register online through the BC Business Registry, or at a Service BC office, before the name request expires.\n2. Registration with the province is separate from a local business licence.\n3. Keep the statement of registration; banks ask for it to open a business account.',
    },
    {
      id: 'business-number',
      title: 'Get a CRA business number and program accounts',
      offsetDays: 0,
      durationDays: 7,
      conditions: ['Only if you will register for GST, open a payroll account, or import or export'],
      dependsOn: [],
      documents: ['Business number confirmation'],
      prepare: ['Social Insurance Number', 'Business name and address', 'Start date and expected revenue'],
      howTo:
        '1. Register online with Business Registration Online, by phone or by mail; BC Registries can also request one when you register.\n2. The business number is 9 digits; each program account (RT for GST, RP for payroll) is added to it.\n3. A sole proprietor with no GST, payroll or trade accounts may not need one.',
    },
    {
      id: 'pst',
      title: 'Register to collect BC PST',
      offsetDays: -7,
      durationDays: 14,
      conditions: ['Only if you sell or lease taxable goods, software or taxable services in British Columbia'],
      dependsOn: [],
      documents: ['PST registration number'],
      prepare: ['What you sell and to whom', 'Estimated yearly sales', 'Business number, if you have one'],
      howTo:
        '1. Register with the province before you start selling taxable goods or services.\n2. Small sellers with low yearly sales may be exempt; check the current small seller threshold.\n3. Returns are filed on the schedule the province assigns (monthly, quarterly or yearly).',
    },
    {
      id: 'records',
      title: 'Set up a business bank account and bookkeeping',
      offsetDays: 0,
      durationDays: 14,
      dependsOn: [],
      documents: ['Business bank account details'],
      prepare: ['Statement of registration, if registered', 'Receipts folder or bookkeeping app'],
      howTo:
        '1. Keeping business money separate makes the T2125 and any GST return easier.\n2. The CRA generally asks for records and receipts to be kept for 6 years after the tax year they relate to.\n3. Track home office and vehicle use from the start; only the business share is deductible.',
    },
    {
      id: 'local-licence',
      title: 'Get a municipal business licence',
      offsetDays: 14,
      durationDays: 14,
      dependsOn: [],
      documents: ['Business licence'],
      prepare: ['Business address', 'Zoning or home-based business rules for your city', 'Check the current fee'],
      howTo:
        '1. Most BC municipalities license businesses operating within their boundaries, including many home-based ones.\n2. BizPaL lists the permits and licences for your type of business and location.\n3. Licences are usually renewed every year.',
    },
    {
      id: 'worksafebc',
      title: 'Register with WorkSafeBC',
      offsetDays: 30,
      durationDays: 7,
      conditions: ['Only if you hire workers, or want optional personal coverage for yourself'],
      dependsOn: [],
      documents: ['WorkSafeBC account number'],
      prepare: ['Business number', 'Type of work and expected payroll'],
      howTo:
        '1. Employers in BC register before workers start.\n2. Sole proprietors and partners are not covered automatically; optional personal protection can be bought.\n3. Premiums are reported and paid on the schedule WorkSafeBC sets.',
    },
    {
      id: 'payroll',
      title: 'Open a payroll account before the first payday',
      offsetDays: 30,
      durationDays: 7,
      conditions: ['Only if you hire employees'],
      dependsOn: ['business-number'],
      documents: ['Payroll (RP) account number'],
      prepare: ['Business number', "Each employee's SIN and TD1 forms", 'First pay date'],
      howTo:
        '1. Add an RP program account to the business number before the first payday.\n2. Deduct CPP, EI and income tax from each pay; most new employers remit by the 15th of the next month.\n3. File T4 slips and the summary by the end of February each year.',
    },
    {
      id: 'ei-special',
      title: 'Decide whether to opt in to EI special benefits',
      offsetDays: 90,
      durationDays: 14,
      dependsOn: [],
      documents: ['EI registration confirmation'],
      prepare: ['My Service Canada Account', 'Expected self-employed earnings'],
      howTo:
        '1. Self-employed people can opt in to EI maternity, parental, sickness and caregiving benefits; regular EI is not included.\n2. Claims can be made 12 months after registering, and need a minimum of self-employed earnings in the previous calendar year; check current amounts.\n3. Once a benefit is paid, premiums continue for as long as you stay self-employed.',
    },
    {
      id: 'gst',
      title: 'Watch the $30,000 small supplier limit and register for GST',
      offsetDays: 90,
      durationDays: 7,
      conditions: ['Only if taxable sales pass $30,000 in four consecutive calendar quarters, or you choose to register earlier'],
      dependsOn: [],
      documents: ['GST (RT) account number'],
      prepare: ['Sales by calendar quarter', 'Business number, if you have one'],
      howTo:
        '1. Check total taxable sales every quarter; the limit counts the last four calendar quarters together.\n2. Passing $30,000 in a single quarter means registering within 29 days, with GST charged from the sale that went over.\n3. In British Columbia GST is 5%, charged alongside PST where PST applies.\n4. Registering early lets you claim input tax credits on business costs.',
    },
    {
      id: 'tax-return',
      title: 'File the first self-employed tax return (T2125)',
      offsetDays: 500,
      durationDays: 30,
      dependsOn: ['records'],
      documents: ['Notice of assessment'],
      prepare: ['Income and expense records for the year', 'Home office and vehicle logs', 'T4 slips from any job'],
      howTo:
        '1. Report business income and expenses on form T2125 with your T1 return.\n2. Self-employed people pay both the employee and employer shares of CPP (Schedule 8).\n3. The return is due June 15, but any balance owing is due April 30; interest runs from April 30.\n4. This date is an estimate; move it to the year after your first business year. It repeats every year.',
    },
    {
      id: 'instalments',
      title: 'Pay tax instalments',
      offsetDays: 620,
      durationDays: 7,
      conditions: ['Only if net tax owing is more than $3,000 this year and in either of the two previous years'],
      dependsOn: ['tax-return'],
      documents: ['CRA instalment reminder'],
      prepare: ['Last notice of assessment', 'Estimate of this year\'s income'],
      howTo:
        '1. Instalments are due March 15, June 15, September 15 and December 15.\n2. The CRA mails reminders with suggested amounts; paying those avoids instalment interest.\n3. This is the first one after tax is owed; they repeat every quarter.',
    },
  ],
};
