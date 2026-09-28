import type { Playbook } from '../../domain/types';

export const businessStartedCn: Playbook = {
  id: 'business-started-cn',
  title: 'Self-employed or starting a business · China',
  summary:
    'Paperwork plan for working for yourself in mainland China, as a flexible worker, an individual business (个体工商户) or a small company: the business licence, tax, social insurance paid on your own account, the provident fund, staff, and the yearly report and tax filing.',
  region: 'China',
  country: 'CN',
  family: 'business-started',
  anchorKind: 'business-started',
  ages: { from: 16 },
  conditions: [
    'You are starting to work for yourself or opening a business in mainland China',
    'Some steps apply only to a registered business, a company, or one that hires staff',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'State Administration for Market Regulation',
      url: 'https://www.samr.gov.cn/',
    },
    {
      title: 'National Enterprise Credit Information Publicity System (国家企业信用信息公示系统)',
      url: 'https://www.gsxt.gov.cn/',
    },
    {
      title: 'State Taxation Administration',
      url: 'https://www.chinatax.gov.cn/',
    },
    {
      title: 'Social Insurance Law of the PRC — State Taxation Administration law library',
      url: 'https://fgk.chinatax.gov.cn/zcfgk/c100009/c5192937/content.html',
    },
    {
      title: 'National social insurance public service platform',
      url: 'https://si.12333.gov.cn/osptb/index.html',
    },
    {
      title: 'Housing Provident Fund Regulations, consolidated text — Ministry of Justice regulations database',
      url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1822',
    },
    {
      title: 'Decision amending the Labour Contract Law of the PRC (2012) — gov.cn',
      url: 'https://www.gov.cn/flfg/2012-12/28/content_2305571.htm',
    },
    {
      title: 'Ministry of Human Resources and Social Security',
      url: 'https://www.mohrss.gov.cn/',
    },
  ],
  steps: [
    {
      id: 'choose-form',
      title: 'Choose the form: flexible work, individual business or company',
      offsetDays: -60,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ['Expected income and costs', 'Whether you will hire staff', 'Whether clients need invoices (发票)'],
      howTo:
        '1. Flexible work (灵活就业) with no registration suits freelance and gig work; some small, occasional activities are exempt from registration, and tax is then withheld by the payer or paid through the tax app.\n2. An individual business (个体工商户) is registered by one person or a family; the owner answers for debts with personal assets.\n3. A limited company (有限责任公司) is a separate legal person; under the Company Law as revised from July 2024, subscribed capital is paid in within 5 years.\n4. The form sets how tax is paid and which steps below apply.',
    },
    {
      id: 'licence',
      title: 'Register for a business licence (营业执照)',
      offsetDays: -14,
      durationDays: 14,
      dependsOn: ['choose-form'],
      documents: ['Business licence (营业执照)'],
      prepare: ['Resident ID card', 'Business name, 2 or 3 choices', 'Proof of the premises: lease or property certificate', 'Scope of business'],
      conditions: ['Only if you register an individual business or a company'],
      howTo:
        '1. Apply to the local market regulation bureau (市场监督管理局), in most places online.\n2. The licence carries a unified social credit code; tax registration comes with it (多证合一).\n3. Individual business registration charges no fee.\n4. The time taken is an estimate.',
    },
    {
      id: 'permits',
      title: 'Get any trade permits the business needs',
      offsetDays: 14,
      durationDays: 21,
      dependsOn: ['licence'],
      documents: ['Permit, e.g. food business licence (食品经营许可证)'],
      prepare: ['Business licence', 'Premises layout', 'Staff health certificates, for food'],
      conditions: ['Only if the trade needs a permit, e.g. food, medicine, education, transport'],
      howTo:
        '1. Some trades need a permit beyond the licence; the market regulation bureau and the relevant department list which.\n2. Permits are often checked on site before issue.\n3. The time taken is an estimate.',
    },
    {
      id: 'tax-setup',
      title: 'Set up tax: electronic tax bureau and invoices',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: ['licence'],
      documents: ['Electronic tax bureau (电子税务局) login'],
      prepare: ['Business licence', 'Resident ID card', 'Mobile number in your own name', 'Bank account'],
      conditions: ['Only if you register an individual business or a company'],
      howTo:
        '1. After the licence, confirm the tax details on the electronic tax bureau of the province; the tax office sets which taxes and periods apply.\n2. Most new small businesses start as small-scale VAT taxpayers (小规模纳税人); the monthly or quarterly sales below which VAT is exempt is set by current notices, so check current.\n3. Electronic invoices (数电发票) are issued through the same system.',
    },
    {
      id: 'bank',
      title: 'Open a business bank account',
      offsetDays: 21,
      durationDays: 14,
      dependsOn: ['licence'],
      documents: ['Bank account agreement'],
      prepare: ['Business licence', 'Legal representative\'s or owner\'s ID card', 'Company seals, if a company'],
      conditions: ['Only if you register an individual business or a company'],
      howTo:
        '1. A company opens a basic account (基本存款账户) for its main transactions and tax payments.\n2. An individual business can open a business account; banks set their own documents and checks.\n3. The time taken is an estimate.',
    },
    {
      id: 'pension',
      title: 'Join basic pension insurance as a flexible worker',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Social insurance record'],
      prepare: ['Resident ID card', 'Social security card', 'Local contribution base range'],
      conditions: ['Only if no employer pays your social insurance'],
      howTo:
        '1. Individual business owners and flexible workers can join basic pension insurance on their own account, through the social insurance office, the tax app or the national platform.\n2. The contribution base is chosen within the local range, usually 60% to 300% of the local average wage; the whole amount is paid by you.\n3. Many cities now accept flexible workers where they work without a local hukou; check current.\n4. Keeping contributions unbroken counts for the pension and, in some cities, for home purchase, hukou and school places.\n5. Payments recur monthly, quarterly or yearly as chosen.',
    },
    {
      id: 'medical',
      title: 'Keep medical insurance going',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Medical insurance record'],
      prepare: ['Resident ID card', 'Social security card'],
      conditions: ['Only if no employer pays your medical insurance'],
      howTo:
        '1. Flexible workers can join employee medical insurance on their own account, or resident medical insurance (城乡居民医保) paid yearly.\n2. A gap can bring a waiting period before benefits restart, set locally.\n3. Leaving a job for self-employment is the usual moment for a gap; paying the next month avoids one.',
    },
    {
      id: 'provident-fund',
      title: 'Check voluntary housing provident fund contributions',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: [],
      documents: ['Provident fund account'],
      prepare: ['Resident ID card', 'Existing provident fund account, if any'],
      conditions: ['Only if you want to keep paying into the provident fund'],
      howTo:
        '1. The provident fund regulations as revised in 2026 let the self-employed and flexible workers pay in voluntarily; the local fund centre sets how, and some cities had pilots before.\n2. Contributions can later be used for rent, a home purchase or a provident fund loan, under local rules.\n3. Check current with the local fund centre.',
    },
    {
      id: 'staff',
      title: 'Hire staff: contracts, social insurance and provident fund',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Signed labour contracts', 'Staff social insurance and provident fund registrations'],
      prepare: ['Business licence', 'Staff ID cards', 'Pay levels'],
      conditions: ['Only if you hire employees'],
      howTo:
        '1. Under the Labour Contract Law, a written contract is signed within a month of each start date.\n2. Under the Social Insurance Law, the employer registers each employee for social insurance within 30 days of hiring, and does the same with the provident fund.\n3. Income tax on wages is withheld each month through the electronic tax bureau or the natural person tax management system (自然人电子税务局).',
    },
    {
      id: 'quarterly-tax',
      title: 'File the first quarterly business income tax return (经营所得预缴)',
      offsetDays: 105,
      durationDays: 15,
      dependsOn: [],
      documents: ['Tax return and payment record'],
      prepare: ['Income and costs for the quarter', 'Invoices issued and received'],
      conditions: ['Only if you have business income as an individual business, sole proprietor or partnership'],
      howTo:
        '1. Business income (经营所得) of an individual business is taxed under individual income tax; tax is prepaid within 15 days after each quarter ends.\n2. Many small individual businesses are taxed on an assessed basis (核定征收) set by the tax office.\n3. Companies file VAT and corporate income tax on their own periods instead.\n4. This date assumes the first quarter ends about 90 days in; it repeats every quarter.',
    },
    {
      id: 'personal-pension',
      title: 'Consider a private pension account (个人养老金)',
      offsetDays: 90,
      durationDays: 7,
      dependsOn: [],
      documents: ['Private pension account'],
      prepare: ['Resident ID card', 'Bank card', 'Individual income tax app'],
      conditions: ['Only if you pay into basic pension insurance'],
      howTo:
        '1. Open through a bank or the national social insurance platform; contributions up to 12,000 yuan a year are deducted from taxable income.\n2. It has been open nationwide since December 2024.\n3. Contributions for a year are made by December 31; the step repeats each year.',
    },
    {
      id: 'annual-tax',
      title: 'File the annual business income reconciliation (经营所得汇算)',
      offsetDays: 270,
      durationDays: 90,
      dependsOn: [],
      documents: ['Annual reconciliation return'],
      prepare: ['Full-year income and costs', 'Quarterly prepayments', 'Special additional deductions, if there is no wage income'],
      conditions: ['Only if you have business income as an individual business, sole proprietor or partnership'],
      howTo:
        '1. Business income for a year is reconciled by March 31 of the following year.\n2. Wage income is reconciled separately, from March 1 to June 30.\n3. Where there is no wage income, the basic 60,000 yuan a year and special additional deductions can be claimed against business income.\n4. This date assumes a mid-year start; move it to March 31 of the year after. It repeats each year.',
    },
    {
      id: 'annual-report',
      title: 'Submit the annual report (年度报告)',
      offsetDays: 365,
      durationDays: 180,
      dependsOn: ['licence'],
      documents: ['Annual report submission record'],
      prepare: ['Business licence', 'Operating figures for the past year'],
      conditions: ['Only if you registered an individual business or a company'],
      howTo:
        '1. Each registered business reports on the past year through the National Enterprise Credit Information Publicity System between January 1 and June 30.\n2. A business that misses it is listed as abnormal (经营异常名录), which can affect loans and contracts.\n3. This date assumes a mid-year start; move it to June 30 of the year after. It repeats each year.',
    },
  ],
};
