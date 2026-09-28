import type { Playbook } from '../../domain/types';

export const adultAdminCn: Playbook = {
  id: 'adult-admin-cn',
  title: 'Adult paperwork · renewals and yearly tax · China',
  summary:
    'Paperwork plan for adult life in mainland China from 22 to 60: ID card, driving licence, passport and permit renewals, the yearly income tax reconciliation and deductions, social insurance record checks, residents\' medical insurance and the private pension. Recurring items show once, at their first date.',
  region: 'China',
  country: 'CN',
  family: 'adult-admin',
  anchorKind: 'born',
  ages: { from: 22, to: 60 },
  conditions: [
    'You are a Chinese citizen living in mainland China, aged 22 to 60',
    'Renewal dates depend on when each document was issued; the dates here assume common ages, so move them to the expiry dates on your own cards',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Resident Identity Card Law of the PRC (2003 text) — gov.cn',
      url: 'https://www.gov.cn/gongbao/content/2003/content_62254.htm',
    },
    {
      title: 'Resident Identity Card Law of the PRC (2011 amendment, fingerprints) — National People\'s Congress',
      url: 'http://www.npc.gov.cn/zgrdw/npc/xinwen/2011-10/31/content_1678466_2.htm',
    },
    {
      title: 'Motor Vehicle Driving Licence Application and Use Provisions (MPS Order 162) — gov.cn',
      url: 'https://www.gov.cn/gongbao/content/2022/content_5679696.htm',
    },
    {
      title: 'Traffic Safety Integrated Service Platform (交管12123) — Ministry of Public Security',
      url: 'https://www.122.gov.cn/',
    },
    {
      title: 'National Immigration Administration',
      url: 'https://www.nia.gov.cn/',
    },
    {
      title: 'Interim Measures for Special Additional Deductions of Individual Income Tax (2018) — gov.cn',
      url: 'https://www.gov.cn/zhengce/content/2018-12/22/content_5351181.htm',
    },
    {
      title: 'When to do the annual individual income tax reconciliation — Shanxi Tax Service, State Taxation Administration',
      url: 'http://shanxi.chinatax.gov.cn/web/detail/sx-11400-548-1805765',
    },
    {
      title: 'State Taxation Administration',
      url: 'https://www.chinatax.gov.cn/',
    },
    {
      title: 'National Social Insurance Public Service Platform',
      url: 'https://si.12333.gov.cn/osptb/index.html',
    },
    {
      title: 'Ministry of Human Resources and Social Security',
      url: 'https://www.mohrss.gov.cn/',
    },
    {
      title: 'National Healthcare Security Administration',
      url: 'https://www.nhsa.gov.cn/',
    },
  ],
  steps: [
    {
      id: 'tax-deductions',
      title: 'Confirm next year\'s special additional deductions (专项附加扣除)',
      offsetDays: 8126,
      durationDays: 14,
      ages: { from: 22 },
      dependsOn: [],
      documents: ['Deduction declaration in the individual income tax app'],
      prepare: ['Children\'s education or infant care details', 'Rent contract or mortgage details', 'Parents\' details, for elderly support', 'Continuing education certificates'],
      conditions: ['Only if a deduction applies to you'],
      howTo:
        '1. Each December the individual income tax app (个人所得税) asks for the next year\'s deductions to be confirmed; unconfirmed ones may stop being applied from January.\n2. Deductions cover children\'s education, infant care under 3, continuing education, serious illness medical costs, mortgage interest or rent, and elderly support.\n3. Check each item still fits: a move, a new child, a paid-off mortgage or a parent turning 60 changes them.\n4. This repeats every December; the date here is only the first one, so move it to December.',
    },
    {
      id: 'tax-reconciliation',
      title: 'Do the annual income tax reconciliation (年度汇算)',
      offsetDays: 8401,
      durationDays: 120,
      ages: { from: 23 },
      dependsOn: ['tax-deductions'],
      documents: ['Reconciliation result'],
      prepare: ['Income from all employers and other sources in the year', 'Special additional deductions', 'Class I bank card for refunds'],
      conditions: ['Only if you had income taxed in China the year before'],
      howTo:
        '1. The reconciliation for a tax year runs from March 1 to June 30 of the following year, in the individual income tax app.\n2. It settles a refund or extra tax across wages, labour fees, author fees and royalties.\n3. The tax authority sets who is required to file; early in the window the app may ask for a booking.\n4. This repeats every year; the date here is only the first one, so move it into the March to June window.',
    },
    {
      id: 'insurance-record',
      title: 'Check your social insurance record (社保缴费记录)',
      offsetDays: 8126,
      durationDays: 7,
      ages: { from: 22 },
      dependsOn: [],
      documents: ['Social insurance contribution record'],
      prepare: ['Resident ID card', 'Electronic social security card or the 掌上12333 app', 'A list of employers and cities you worked in'],
      howTo:
        '1. Look up contribution months on the National Social Insurance Public Service Platform, the 掌上12333 app or the local platform.\n2. Compare them with payslips; missing months, a wrong contribution base (缴费基数) or a gap between jobs are easier to fix within the year.\n3. Months of unbroken contributions often count for home purchase eligibility, hukou points and school places in big cities.\n4. This repeats yearly; the date here is only the first one.',
    },
    {
      id: 'resident-medical',
      title: 'Pay the yearly residents\' medical insurance (城乡居民医保)',
      offsetDays: 8216,
      durationDays: 30,
      ages: { from: 22 },
      dependsOn: [],
      documents: ['Payment record'],
      prepare: ['Resident ID card', 'Where your hukou or residence permit is', 'The local payment window'],
      conditions: ['Only if you are not covered by employee medical insurance, e.g. not employed or between jobs'],
      howTo:
        '1. Urban and rural residents\' basic medical insurance is paid once a year for the next calendar year, usually in a window set locally, often from autumn to the end of the year.\n2. Pay through the tax app, a bank app, WeChat or Alipay, or the local medical insurance office.\n3. Paying late can bring a waiting period before cover starts; check the local rule.\n4. This repeats yearly; the date here is only the first one, so move it to the local window.',
    },
    {
      id: 'private-pension',
      title: 'Pay into the private pension account (个人养老金)',
      offsetDays: 8341,
      durationDays: 14,
      ages: { from: 22 },
      dependsOn: [],
      documents: ['Private pension account statement'],
      prepare: ['Resident ID card', 'A bank that offers private pension accounts', 'How much to put in this year'],
      conditions: ['Only if you pay into the employee or residents\' basic pension and choose to take part'],
      howTo:
        '1. The private pension (个人养老金) is voluntary; the account is opened through the national platform or a bank app.\n2. Contributions up to 12,000 yuan a year are deductible from income tax; payments by December 31 count for that tax year, so claim them in the reconciliation or with the employer.\n3. The money is locked until retirement or another allowed reason; withdrawals are taxed at a low flat rate (check current).\n4. This repeats yearly; the date here is only the first one. Not financial advice.',
    },
    {
      id: 'huiminbao',
      title: 'Decide on the city\'s supplementary health cover (惠民保)',
      offsetDays: 8216,
      durationDays: 30,
      ages: { from: 22 },
      dependsOn: [],
      documents: ['Policy confirmation'],
      prepare: ['Your basic medical insurance', 'Existing health conditions', 'The city scheme\'s enrolment window'],
      conditions: ['Optional; only if your city runs such a scheme'],
      howTo:
        '1. Many cities back a low-cost commercial plan (城市定制型商业医疗保险, often called 惠民保) that pays some costs basic medical insurance does not.\n2. Enrolment is usually open once a year, often with no health questions; the deductible and what it pays vary by city.\n3. It is private insurance, not social insurance. Not financial advice.\n4. This repeats yearly; move the date to the city\'s window.',
    },
    {
      id: 'licence-first-renewal',
      title: 'Renew the driving licence at 6 years (机动车驾驶证换证)',
      offsetDays: 8981,
      durationDays: 30,
      ages: { from: 24, to: 25 },
      dependsOn: [],
      documents: ['Driving licence'],
      prepare: ['Resident ID card', 'Health check the vehicle office asks for', '交管12123 app sign-in'],
      conditions: ['Only if you hold a driving licence; the date assumes it was first issued at about 18'],
      howTo:
        '1. Under MPS Order 162, a first licence is valid for 6 years; renewal is applied for within 90 days before it expires.\n2. A driver who never reached 12 points in any scoring cycle usually moves to a 10-year licence, then to a long-term one; otherwise the next one is 6 years again.\n3. Many places accept the renewal and health check online through 交管12123, including outside the issuing area.\n4. Move this date to 90 days before the expiry on your licence.',
    },
    {
      id: 'licence-second-renewal',
      title: 'Renew the driving licence at 10 years',
      offsetDays: 12633,
      durationDays: 30,
      ages: { from: 34, to: 35 },
      dependsOn: ['licence-first-renewal'],
      documents: ['Driving licence'],
      prepare: ['Resident ID card', 'Health check the vehicle office asks for'],
      conditions: ['Only if you hold a driving licence and moved to a 10-year one'],
      howTo:
        '1. At the end of the 10-year licence, a driver without a 12-point cycle usually moves to a long-term licence (长期).\n2. Apply within 90 days before expiry, online or at the vehicle management office.\n3. Move this date to 90 days before the expiry on your licence.',
    },
    {
      id: 'id-card-26',
      title: 'Renew the resident ID card at 26 (居民身份证换领)',
      offsetDays: 9496,
      durationDays: 60,
      ages: { from: 26, to: 26 },
      dependsOn: [],
      documents: ['Resident ID card'],
      prepare: ['Current ID card', 'Household register (户口簿), if asked', 'ID photo taken at the office or an approved studio'],
      conditions: ['Only if your card was issued between 16 and 25, so valid for 10 years'],
      howTo:
        '1. Cards issued from 16 to 25 are valid for 10 years; from 26 to 45, 20 years; from 46, long-term.\n2. A new card can be applied for up to 3 months before the old one expires, at the police station where the hukou is, and in many cities anywhere in the country (异地换领).\n3. Fingerprints are recorded again; a temporary ID card can be issued while waiting.\n4. The date assumes a card issued at 16; move it to your card\'s expiry.',
    },
    {
      id: 'passport',
      title: 'Renew the passport and the Hong Kong and Macao permit (护照 / 港澳通行证)',
      offsetDays: 10227,
      durationDays: 30,
      ages: { from: 28 },
      dependsOn: [],
      documents: ['Passport', 'Exit-Entry Permit for Travelling to and from Hong Kong and Macao (往来港澳通行证)'],
      prepare: ['Resident ID card', 'Old passport and permit', 'Photo meeting the exit-entry photo rules'],
      conditions: ['Only if you hold a passport or travel permit'],
      howTo:
        '1. Adult passports and Hong Kong and Macao permits are valid for 10 years.\n2. Mainland residents can apply at any exit-entry administration office in the country, not only where the hukou is.\n3. Many countries ask for 6 months of validity left at entry, so renew well before expiry.\n4. This repeats every 10 years; the date assumes documents first issued at 18, so move it to about 6 months before your own expiry.',
    },
    {
      id: 'id-card-46',
      title: 'Renew the resident ID card at 46 for a long-term card',
      offsetDays: 16801,
      durationDays: 60,
      ages: { from: 46, to: 46 },
      dependsOn: ['id-card-26'],
      documents: ['Resident ID card'],
      prepare: ['Current ID card', 'ID photo taken at the office or an approved studio'],
      conditions: ['Only if your 20-year card expires at about 46'],
      howTo:
        '1. A card issued from 46 is long-term (长期) and does not need renewing for age.\n2. Apply up to 3 months before the old one expires.\n3. The date assumes a card issued at 26; move it to your card\'s expiry.',
    },
  ],
};
