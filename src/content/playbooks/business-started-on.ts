import type { Playbook } from '../../domain/types';

export const businessStartedOn: Playbook = {
  id: 'business-started-on',
  title: 'Self-employed or starting a business · Ontario',
  summary:
    'Paperwork plan for a sole proprietorship or partnership in Ontario, from the business name and CRA accounts to HST, workers, EI special benefits and the first self-employed tax return.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'business-started',
  anchorKind: 'business-started',
  ages: { from: 18 },
  conditions: [
    'You are starting to work for yourself in Ontario, as a sole proprietor or in a partnership; the event date is when you start trading',
    'Incorporating a company follows different steps and filings',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Business name registration — Ontario.ca',
      url: 'https://www.ontario.ca/page/business-name-registration',
    },
    {
      title: 'Business Names Act, R.S.O. 1990, c. B.17',
      url: 'https://www.ontario.ca/laws/statute/90b17',
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
      title: 'BizPaL business permits and licences',
      url: 'https://www.bizpal-perle.ca/',
    },
    {
      title: 'Workplace Safety and Insurance Board (WSIB)',
      url: 'https://www.wsib.ca/en/businesses',
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
      id: 'register',
      title: 'Register the business name in the Ontario Business Registry',
      offsetDays: -7,
      durationDays: 3,
      validForDays: 1826,
      conditions: ['Only if you trade under a name other than your own full name'],
      dependsOn: [],
      documents: ['Master Business Licence'],
      prepare: ['Business name and a name search', 'Owner or partner details', 'Business address', 'Check the current fee'],
      howTo:
        '1. Register online in the Ontario Business Registry; the registration is issued as a Master Business Licence.\n2. A sole proprietor trading only under their own full name does not need to register.\n3. The registration lasts 5 years and is renewed in the same registry; check current.\n4. Registration with the province is separate from any municipal licence.',
    },
    {
      id: 'business-number',
      title: 'Get a CRA business number and program accounts',
      offsetDays: 0,
      durationDays: 7,
      conditions: ['Only if you will register for HST, open a payroll account, or import or export'],
      dependsOn: [],
      documents: ['Business number confirmation'],
      prepare: ['Social Insurance Number', 'Business name and address', 'Start date and expected revenue'],
      howTo:
        '1. Register online with Business Registration Online, by phone or by mail; the Ontario Business Registry can also link or request one.\n2. The business number is 9 digits; each program account (RT for HST, RP for payroll) is added to it.\n3. A sole proprietor with no HST, payroll or trade accounts may not need one.',
    },
    {
      id: 'records',
      title: 'Set up a business bank account and bookkeeping',
      offsetDays: 0,
      durationDays: 14,
      dependsOn: [],
      documents: ['Business bank account details'],
      prepare: ['Master Business Licence, if registered', 'Receipts folder or bookkeeping app'],
      howTo:
        '1. Keeping business money separate makes the T2125 and any HST return easier.\n2. The CRA generally asks for records and receipts to be kept for 6 years after the tax year they relate to.\n3. Track home office and vehicle use from the start; only the business share is deductible.',
    },
    {
      id: 'local-licence',
      title: 'Check for a municipal business licence',
      offsetDays: 14,
      durationDays: 14,
      dependsOn: [],
      documents: ['Business licence, if needed'],
      prepare: ['Business address', 'Zoning or home-based business rules for your city', 'Check the current fee'],
      howTo:
        '1. Ontario municipalities license some types of business (for example food, trades, personal services, taxis) rather than all of them.\n2. BizPaL lists the permits and licences for your type of business and location.\n3. Licences are usually renewed every year.',
    },
    {
      id: 'wsib',
      title: 'Register with the WSIB',
      offsetDays: 30,
      durationDays: 7,
      conditions: ['Only if you hire workers, work in construction, or want optional coverage for yourself'],
      dependsOn: [],
      documents: ['WSIB account number'],
      prepare: ['Business number', 'Type of work and expected payroll'],
      howTo:
        '1. Most employers in Ontario register with the WSIB within 10 days of hiring their first worker; check current.\n2. Independent operators in construction generally need their own coverage.\n3. Other sole proprietors can buy optional insurance for themselves.',
    },
    {
      id: 'payroll',
      title: 'Open a payroll account before the first payday',
      offsetDays: 30,
      durationDays: 7,
      conditions: ['Only if you hire employees'],
      dependsOn: ['business-number'],
      documents: ['Payroll (RP) account number'],
      prepare: ['Business number', "Each employee's SIN and TD1 and TD1ON forms", 'First pay date'],
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
      id: 'hst',
      title: 'Watch the $30,000 small supplier limit and register for HST',
      offsetDays: 90,
      durationDays: 7,
      conditions: ['Only if taxable sales pass $30,000 in four consecutive calendar quarters, or you choose to register earlier'],
      dependsOn: [],
      documents: ['HST (RT) account number'],
      prepare: ['Sales by calendar quarter', 'Business number, if you have one'],
      howTo:
        '1. Check total taxable sales every quarter; the limit counts the last four calendar quarters together.\n2. Passing $30,000 in a single quarter means registering within 29 days, with HST charged from the sale that went over.\n3. Ontario has no separate provincial sales tax; the 13% HST covers both parts.\n4. Registering early lets you claim input tax credits on business costs.',
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
