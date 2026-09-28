import type { Playbook } from '../../domain/types';

export const jobLostCn: Playbook = {
  id: 'job-lost-cn',
  title: 'Job ended · China',
  summary:
    'Paperwork plan for when a job in mainland China ends: the leaving certificate, final pay and severance, labour arbitration time limits, unemployment registration and benefit, keeping social insurance unbroken, the housing provident fund and income tax.',
  region: 'China',
  country: 'CN',
  family: 'job-lost',
  anchorKind: 'job-lost',
  ages: { from: 16 },
  conditions: [
    'A job as an employee in mainland China has ended, by layoff, dismissal, contract expiry or resignation',
    'Some steps apply only when the employer ended the contract, to someone without a new job yet, or to a dispute',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Decision amending the Labour Contract Law of the PRC (2012) — gov.cn',
      url: 'https://www.gov.cn/flfg/2012-12/28/content_2305571.htm',
    },
    {
      title: 'Social Insurance Law of the PRC — State Taxation Administration law library',
      url: 'https://fgk.chinatax.gov.cn/zcfgk/c100009/c5192937/content.html',
    },
    {
      title: 'Housing Provident Fund Regulations, consolidated text — Ministry of Justice regulations database',
      url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1822',
    },
    {
      title: 'National social insurance public service platform',
      url: 'https://si.12333.gov.cn/osptb/index.html',
    },
    {
      title: 'Ministry of Human Resources and Social Security',
      url: 'https://www.mohrss.gov.cn/',
    },
    {
      title: 'State Taxation Administration',
      url: 'https://www.chinatax.gov.cn/',
    },
  ],
  steps: [
    {
      id: 'leaving-proof',
      title: 'Get the leaving certificate and file transfer (离职证明)',
      offsetDays: 7,
      durationDays: 7,
      dependsOn: [],
      documents: ['Certificate of termination of the labour contract (解除或者终止劳动合同的证明)'],
      prepare: ['Labour contract', 'Handover done', 'Any written notice of termination from the employer'],
      howTo:
        '1. Under the Labour Contract Law, the employer issues a certificate when the contract ends, and moves the personnel file (档案) and social insurance within 15 days.\n2. The certificate usually states the contract term, the end date, the job and years of service.\n3. It is needed for unemployment registration and by most new employers.\n4. If the employer delays, the local labour inspection office (劳动保障监察) takes complaints.',
    },
    {
      id: 'final-pay',
      title: 'Check the final pay and unused annual leave',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Final payslip'],
      prepare: ['Labour contract', 'Days of annual leave taken this year', 'Last attendance record'],
      howTo:
        '1. Wages up to the last day are paid in full when the contract ends, usually on the next payday.\n2. Under the paid annual leave rules, unused leave for the part of the year worked is paid at 300% of the daily wage (the normal day\'s pay plus 200%).\n3. Keep the final payslip; it is useful evidence in any later dispute.',
    },
    {
      id: 'severance',
      title: 'Check severance pay (经济补偿)',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Severance calculation or agreement'],
      prepare: ['Start date of the job', 'Average monthly wage over the last 12 months', 'Reason given for the ending'],
      conditions: ['Only if the employer ended the contract, did not renew it, or the law otherwise gives severance'],
      howTo:
        '1. Under the Labour Contract Law, severance is one month\'s wage per full year of service (N); 6 months to under a year counts as a year, under 6 months as half a month.\n2. Where the monthly wage is over three times the local average, the wage used is capped at three times the average and the years at 12.\n3. Where the employer ends the contract without 30 days\' written notice in the cases that allow it, one extra month is paid in lieu (N+1).\n4. An unlawful dismissal can lead to double severance (2N) instead.\n5. A resignation on your own initiative usually brings no severance, unless the employer broke the law first, e.g. unpaid wages or no social insurance.\n6. A mutual agreement to end the contract is put in writing; read the amounts before signing.',
    },
    {
      id: 'severance-tax',
      title: 'Check how severance is taxed',
      offsetDays: 45,
      durationDays: 7,
      dependsOn: ['severance'],
      documents: ['Individual income tax app record of the payment'],
      prepare: ['Severance amount'],
      conditions: ['Only if severance was paid'],
      howTo:
        '1. One-off compensation for ending a labour contract is tax-free up to three times the local average annual wage; the part above is taxed on its own, not added to the year\'s wages.\n2. This treatment has been extended by later notices; check current.\n3. The employer withholds; the payment then shows in the individual income tax app.',
    },
    {
      id: 'non-compete',
      title: 'Check any non-compete agreement (竞业限制)',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Non-compete agreement or contract clause'],
      prepare: ['Scope, region and length of the restriction', 'Monthly compensation agreed'],
      conditions: ['Only if you signed a non-compete'],
      howTo:
        '1. Under the Labour Contract Law, a non-compete lasts at most 2 years after leaving and applies to senior staff, technical staff and others with confidentiality duties.\n2. The employer pays monthly compensation during the restriction.\n3. Keep records of the payments received.',
    },
    {
      id: 'arbitration',
      title: 'Note the time limit for labour arbitration (劳动仲裁)',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Arbitration application'],
      prepare: ['Labour contract', 'Payslips and bank records', 'Termination notice', 'Chat records or emails'],
      conditions: ['Only if there is a dispute with the employer'],
      howTo:
        '1. Under the Labour Dispute Mediation and Arbitration Law, the time limit is one year from the day the right was known to be infringed.\n2. Applications go to the labour dispute arbitration commission where the job was or where the employer is registered; it charges no fee.\n3. Arbitration usually comes before any court case for labour disputes.\n4. The 30 days here is a placeholder, not the deadline.',
    },
    {
      id: 'unemployment-registration',
      title: 'Register as unemployed (失业登记)',
      offsetDays: 7,
      durationDays: 3,
      dependsOn: [],
      documents: ['Unemployment registration record'],
      prepare: ['Resident ID card', 'Leaving certificate, if already issued'],
      conditions: ['Only if you have no new job yet'],
      howTo:
        '1. Registration is with the public employment service, at the place of residence or hukou, or online through the national social insurance public service platform, 掌上12333 or the local app.\n2. It opens free job-search services and training, and is a condition of unemployment benefit.\n3. Registering promptly keeps the benefit months from slipping.',
    },
    {
      id: 'unemployment-benefit',
      title: 'Apply for unemployment benefit (失业保险金)',
      offsetDays: 21,
      durationDays: 14,
      dependsOn: ['leaving-proof', 'unemployment-registration'],
      documents: ['Benefit approval'],
      prepare: ['Resident ID card', 'Leaving certificate', 'Social security card', 'Months of unemployment insurance paid'],
      conditions: ['Only if you paid unemployment insurance for at least a year and did not leave of your own will'],
      howTo:
        '1. Under the Social Insurance Law, the conditions are: at least one year of contributions, leaving not by your own choice, and unemployment registration with a wish to find work.\n2. Benefit lasts up to 12 months for 1 to under 5 years of contributions, 18 months for 5 to under 10, and 24 months for 10 or more.\n3. The monthly amount is set by the province, below the local minimum wage.\n4. While drawing it, employee medical insurance continues, paid from the unemployment fund.\n5. It stops on a new job, moving abroad, reaching pension age, or refusing suitable work or training without reason.\n6. Apply online through the national platform or 掌上12333, or at the local office.',
    },
    {
      id: 'insurance-gap',
      title: 'Keep social insurance unbroken (避免社保断缴)',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Social insurance record'],
      prepare: ['Social security card', 'Local contribution base range'],
      conditions: ['Only if no new job starts soon'],
      howTo:
        '1. When the employer stops paying, contributions can continue as a flexible worker (灵活就业): basic pension and medical insurance, paid by you, at a base chosen within the local range, usually 60% to 300% of the local average wage.\n2. Many cities now let flexible workers join where they work without a local hukou; check current.\n3. A break in medical insurance can bring a waiting period before benefits restart, set locally.\n4. Home purchase eligibility, hukou points and school places in some cities count unbroken months of social insurance.\n5. The record shows in the electronic social security card or on the national platform.',
    },
    {
      id: 'personnel-file',
      title: 'Check where your personnel file (档案) went',
      offsetDays: 45,
      durationDays: 30,
      dependsOn: ['leaving-proof'],
      documents: ['File receipt or transfer letter'],
      prepare: ['Name of the previous employer or talent centre that held it'],
      conditions: ['Only if you have a personnel file'],
      howTo:
        '1. Files held by the employer are moved within 15 days of the contract ending, usually to a public talent exchange or employment service centre.\n2. Files move between offices, not through your hands.\n3. The file matters for professional titles, civil service applications and pension records.',
    },
    {
      id: 'provident-fund',
      title: 'Check the housing provident fund account (住房公积金封存)',
      offsetDays: 45,
      durationDays: 30,
      dependsOn: [],
      documents: ['Provident fund account statement'],
      prepare: ['Resident ID card', 'National provident fund app or local fund centre app'],
      howTo:
        '1. Under the provident fund regulations, the employer asks the fund centre to transfer or seal (封存) the account within 30 days of the job ending.\n2. A sealed account keeps its balance and interest; the next employer transfers it on.\n3. Withdrawal is limited to the listed reasons, such as rent, buying a home, loan repayment or retirement; some cities also allow withdrawal after a spell of unemployment, set locally, so check current.\n4. A provident fund mortgage keeps running; check with the lender how repayments continue without monthly contributions.',
    },
    {
      id: 'reconciliation',
      title: 'Do the annual income tax reconciliation (汇算清缴)',
      offsetDays: 300,
      durationDays: 120,
      dependsOn: [],
      documents: ['Reconciliation result'],
      prepare: ['Income from all employers in the year', 'Special additional deductions', 'Class I bank card'],
      howTo:
        '1. The reconciliation for a tax year runs from March 1 to June 30 of the following year, in the individual income tax app.\n2. A job ending mid-year often leaves too much tax withheld, since each employer counted only its own months; a refund can follow.\n3. The tax authority sets who is required to file.\n4. This date assumes a mid-year ending; move it to June 30 of the year after.',
    },
  ],
};
