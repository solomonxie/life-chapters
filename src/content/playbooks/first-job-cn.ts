import type { Playbook } from '../../domain/types';

export const firstJobCn: Playbook = {
  id: 'first-job-cn',
  title: 'Starting a job · China',
  summary:
    'Paperwork plan for starting a job in mainland China, first or later: entry health check, the written labour contract and probation, social insurance, housing provident fund, income tax, personnel file and hukou. National rules; local offices set the details.',
  region: 'China',
  country: 'CN',
  family: 'first-job',
  anchorKind: 'first-job',
  ages: { from: 16 },
  conditions: [
    'You are starting a job as an employee in mainland China, your first or a new one',
    'Some steps apply only to a first job, to someone leaving another job, or to moving a personnel file or hukou',
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
      title: 'Regulations on the Management of Housing Provident Fund — gov.cn',
      url: 'https://www.gov.cn/gongbao/content/2019/content_5468861.htm',
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
      id: 'health-check',
      title: 'Do the pre-employment health check (入职体检)',
      offsetDays: -7,
      durationDays: 7,
      dependsOn: [],
      documents: ['Health check report'],
      prepare: ['Resident ID card', 'The hospital and item list the employer names', 'Fasting on the morning of the blood test'],
      conditions: ['Only if the employer asks for one'],
      howTo:
        '1. Many employers ask for a check at a named hospital before or just after the start date; some jobs, such as food handling, have their own health certificate rules.\n2. Under a 2010 notice from the human resources, education and health ministries, hepatitis B tests are not part of routine entry checks.\n3. The report usually goes to HR; keep a copy.',
    },
    {
      id: 'leaving-proof',
      title: 'Get the leaving certificate from the previous employer (离职证明)',
      offsetDays: -3,
      durationDays: 14,
      dependsOn: [],
      documents: ['Certificate of termination of the labour contract (解除或者终止劳动合同的证明)'],
      prepare: ['Handover done with the previous employer', 'Last payslip'],
      conditions: ['Only if you left another job'],
      howTo:
        '1. Under the Labour Contract Law, the previous employer issues a certificate when the contract ends, and moves the personnel file and social insurance within 15 days.\n2. New employers often ask for it to confirm there is no overlapping contract.',
    },
    {
      id: 'tax-app',
      title: 'Check the new employer on the individual income tax app (个人所得税)',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: [],
      documents: ['Individual income tax app account'],
      prepare: ['Resident ID card', 'Mobile number in your own name', 'Class I bank card for refunds'],
      howTo:
        '1. The employer withholds tax from pay each month and reports it under your ID.\n2. The app lists each employer that reports you (任职受雇信息); an unknown employer can be disputed there.\n3. For a first job, register with the ID card and face check.',
    },
    {
      id: 'deductions',
      title: 'Declare special additional deductions (专项附加扣除)',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: ['tax-app'],
      documents: ['Deduction declaration in the app'],
      prepare: ['Children\'s education or infant care details', 'Rent contract or mortgage details', 'Continuing education certificates', 'Parents\' details, for elderly support'],
      conditions: ['Only if a deduction applies to you'],
      howTo:
        '1. Deductions cover children\'s education, infant care under 3, continuing education, serious illness medical costs, mortgage interest or rent, and elderly support.\n2. In the app, choose whether the employer applies them each month or they are claimed in the annual reconciliation.\n3. With a new employer, the declaration is pointed at the new one.\n4. Declarations are confirmed again each year, usually in December.',
    },
    {
      id: 'contract',
      title: 'Sign the written labour contract (劳动合同) within one month',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Signed labour contract, your own copy'],
      prepare: ['Resident ID card', 'Agreed pay, job, place of work and hours', 'Contract term and probation'],
      howTo:
        '1. Under the Labour Contract Law, a written contract is signed within one month of the start date.\n2. If an employer goes more than a month without one, the law has it pay double wages each month, for up to a year.\n3. After a full year without a written contract, the law treats it as an open-ended contract.\n4. Each side keeps a signed copy.',
    },
    {
      id: 'probation',
      title: 'Check the probation period (试用期) against the contract length',
      offsetDays: 40,
      durationDays: 3,
      dependsOn: ['contract'],
      documents: [],
      prepare: ['Contract term', 'Probation length and pay in the contract'],
      howTo:
        '1. Under the Labour Contract Law: a contract of 3 months to under 1 year allows up to 1 month of probation; 1 to under 3 years, up to 2 months; 3 years or more, or open-ended, up to 6 months.\n2. Contracts under 3 months, or for a set task, have no probation.\n3. One employer can set probation only once for the same person, and it counts inside the contract term.\n4. Probation pay is at least 80% of the agreed wage or the lowest wage for the same job there, and not below the local minimum wage.',
    },
    {
      id: 'social-insurance',
      title: 'Check social insurance is registered (社会保险, five insurances)',
      offsetDays: 45,
      durationDays: 14,
      dependsOn: [],
      documents: ['Social insurance record', 'Social security card (社保卡)'],
      prepare: ['Resident ID card', 'Class I bank account', 'National social insurance public service platform or the local app'],
      howTo:
        '1. Under the Social Insurance Law, the employer applies for the employee\'s registration within 30 days of the start date.\n2. The five insurances are pension, medical (maternity is merged into it in most places), unemployment and work injury.\n3. Contribution months show in the electronic social security card or the local platform.\n4. For a first job, a social security card is issued if there is none yet.',
    },
    {
      id: 'provident-fund',
      title: 'Check the housing provident fund account (住房公积金)',
      offsetDays: 45,
      durationDays: 14,
      dependsOn: [],
      documents: ['Housing provident fund account'],
      prepare: ['Resident ID card', 'Labour contract'],
      howTo:
        '1. Under the provident fund regulations, the employer registers a new employee with the local fund centre within 30 days of hiring and opens or transfers the account.\n2. Employer and employee each pay a share of wages, at rates the city sets.\n3. The balance shows in the local fund centre app or the national provident fund app.',
    },
    {
      id: 'first-payslip',
      title: 'Check the first payslip',
      offsetDays: 45,
      durationDays: 3,
      dependsOn: ['contract'],
      documents: ['First payslip'],
      prepare: ['Agreed wage and probation pay'],
      howTo:
        '1. Deductions usually shown: pension, medical and unemployment insurance, housing provident fund, and withheld income tax.\n2. The income tax app shows the same withholding under the employer.\n3. The first month is sometimes partial or paid a month late.',
    },
    {
      id: 'insurance-transfer',
      title: 'Transfer social insurance and provident fund from another city',
      offsetDays: 90,
      durationDays: 45,
      dependsOn: ['social-insurance', 'provident-fund'],
      documents: ['Transfer confirmation'],
      prepare: ['Previous city\'s social insurance record', 'Previous provident fund account'],
      conditions: ['Only if your previous job was in another city'],
      howTo:
        '1. Basic pension and medical insurance can be transferred across provinces online through the national social insurance public service platform.\n2. Provident fund accounts can be transferred between cities through the national provident fund app.\n3. The time taken is an estimate.',
    },
    {
      id: 'personnel-file',
      title: 'Move your personnel file (档案) to the employer or a talent centre',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: ['contract'],
      documents: ['File receipt or transfer letter'],
      prepare: ['Where the file sits now: school, previous employer or talent centre', 'Labour contract', 'Resident ID card'],
      conditions: ['Only if you have a personnel file, e.g. after university or a state employer'],
      howTo:
        '1. State bodies and some large employers keep files themselves; most private employers do not, and files go to a public talent exchange centre (人才交流中心) or employment service centre.\n2. For a first job after graduating, the school sends the file as arranged with the graduate and the receiving office.\n3. Files move between offices, not through your hands; a sealed file opened by the holder may be refused.\n4. The file matters for professional titles, civil service and pension records.',
    },
    {
      id: 'hukou',
      title: 'Settle the hukou in the job\'s city (户口)',
      offsetDays: 120,
      durationDays: 60,
      dependsOn: ['contract'],
      documents: ['Updated household register (户口簿)'],
      prepare: ['Labour contract', 'Degree certificate', 'Social insurance record', 'Proof of residence'],
      conditions: ['Only if you want to move your hukou to the city of the job'],
      howTo:
        '1. Each city sets its own settlement rules, often by degree, age, job or months of social insurance paid.\n2. Many cities open settlement to new graduates within a set time after graduating.\n3. The local public security bureau or talent service centre handles it.\n4. The date and time taken are estimates.',
    },
    {
      id: 'probation-end',
      title: 'Mark the end of probation',
      offsetDays: 90,
      durationDays: 1,
      dependsOn: ['probation'],
      documents: [],
      prepare: ['Probation end date from the contract'],
      howTo:
        '1. Pay moves to the full agreed wage after probation.\n2. The date here assumes 3 months; move it to the contract\'s date.',
    },
    {
      id: 'reconciliation',
      title: 'Do the annual income tax reconciliation (汇算清缴)',
      offsetDays: 300,
      durationDays: 120,
      dependsOn: ['tax-app'],
      documents: ['Reconciliation result'],
      prepare: ['Income from all employers in the year', 'Special additional deductions', 'Class I bank card'],
      howTo:
        '1. The reconciliation for a tax year runs from March 1 to June 30 of the following year, in the app.\n2. It settles a refund or extra tax; changing jobs mid-year often leaves withholding off, since each employer counted only its own months.\n3. The tax authority sets who is required to file; early in the window the app may ask for a booking.\n4. This date assumes a mid-year start; move it to June 30 of the year after.',
    },
  ],
};
