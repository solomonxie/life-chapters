import type { Playbook } from '../../domain/types';

export const pregnancyCn: Playbook = {
  id: 'pregnancy-cn',
  title: 'Expecting a baby · China',
  summary:
    'Prenatal care, screening, maternity insurance, leave and birth paperwork plan for a pregnancy in mainland China, counted back from the due date.',
  region: 'China',
  country: 'CN',
  family: 'pregnancy',
  anchorKind: 'baby-due',
  conditions: [
    'For a pregnancy with a due date, in mainland China',
    'Leave and maternity insurance steps apply to employees covered by maternity insurance',
    'Provinces and cities add to or change the national rules',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'National Basic Public Health Service Standards (3rd ed.): Maternal health management (孕产妇健康管理服务规范)',
      url: 'https://www.fxxh.gov.cn/xhq/file/2023-12-12/17023606614974028e4928a108a34466018c5c9a3df919a4.pdf',
    },
    {
      title: 'Wuhan Health Commission: Preconception and prenatal care guideline 2018 (孕前和孕期保健指南)',
      url: 'https://wjw.wuhan.gov.cn/ztzl_28/fyjkkp/ycbj/202005/t20200518_1323121.shtml',
    },
    {
      title: 'NHC: Technical standard for cell-free fetal DNA prenatal screening (孕妇外周血胎儿游离DNA产前筛查与诊断技术规范)',
      url: 'https://www.nhc.gov.cn/ewebeditor/uploadfile/2016/11/20161111103703265.docx',
    },
    {
      title: 'State Council: Special Provisions on Labour Protection for Female Employees (女职工劳动保护特别规定)',
      url: 'http://www.gov.cn/zwgk/2012-05/07/content_2131567.htm',
    },
    {
      title: 'Beijing Population and Family Planning Regulations (北京市人口与计划生育条例)',
      url: 'http://www.beijing.gov.cn/zhengce/dfxfg/202111/t20211126_2546761.html',
    },
    {
      title: 'Hubei Health Commission: Newborn birth "one thing" service (新生儿出生一件事)',
      url: 'https://wjw.hubei.gov.cn/bsfw/xseyjs/',
    },
    {
      title: 'Hubei Birth Medical Certificate Management Measures (湖北省出生医学证明管理办法)',
      url: 'http://wjw.hubei.gov.cn/zfxxgk/zc/gfwj/202502/t20250227_5557053.shtml',
    },
    {
      title: 'Household Registration Regulations of the PRC (户口登记条例)',
      url: 'http://www.gd.gov.cn/zwgk/wjk/zcfgk/content/post_2531969.html',
    },
  ],
  steps: [
    {
      id: 'registration',
      title: 'Register the pregnancy and get the Maternal and Child Health Handbook (建档 / 母子健康手册)',
      offsetDays: -196,
      durationDays: 14,
      dependsOn: [],
      documents: ['Maternal and Child Health Handbook (母子健康手册)', 'ID card (身份证)'],
      prepare: [
        'First day of the last period, for the due date',
        'Health history and current medicines',
        'Your local community health service centre (社区卫生服务中心) or township health centre',
      ],
      howTo:
        '1. Under the national basic public health service, the community or township health centre where you live sets up the Maternal and Child Health Handbook before 13 weeks, together with the first prenatal check.\n2. The first check covers a health assessment, blood and urine tests, blood type, liver and kidney function and hepatitis B; many areas add syphilis, HIV and blood sugar.\n3. Provinces and cities run this differently, some fully online; a big city such as Beijing or Shanghai is an example where the local service may differ. Ask your health centre.\n4. This date (12 weeks) is a planning estimate.',
    },
    {
      id: 'first-check',
      title: 'First prenatal check (产检) and early ultrasound',
      offsetDays: -189,
      durationDays: 7,
      dependsOn: ['registration'],
      documents: ['Maternal and Child Health Handbook (母子健康手册)'],
      prepare: ['Fasting for blood tests, if asked', 'List of questions', 'Partner\'s and family health history'],
      howTo:
        '1. The national service asks for at least 5 prenatal checks: one before 13 weeks, one at 16 to 20 weeks, one at 21 to 24 weeks, one at 28 to 36 weeks and one at 37 to 40 weeks.\n2. The 2018 clinical guideline of the Chinese Medical Association suggests checks at 6 to 13+6, 14 to 19+6, 20 to 24, 25 to 28, 29 to 32, 33 to 36 and 37 to 41 weeks, 7 to 11 checks in all, more with risk factors.\n3. An ultrasound at 6 to 8 weeks confirms the pregnancy and the weeks.\n4. Hospitals set their own booking; this date is a planning estimate.',
    },
    {
      id: 'maternity-insurance',
      title: 'Check your maternity insurance (生育保险) contributions',
      offsetDays: -182,
      durationDays: 14,
      dependsOn: [],
      documents: ['Social security card (社会保障卡) or medical insurance e-voucher (医保电子凭证)'],
      prepare: ['Your contribution record from the local medical insurance app or office', 'Employer HR contact'],
      conditions: ['Only if you are an employee covered by maternity insurance'],
      howTo:
        '1. Maternity insurance pays birth medical costs and the maternity allowance (生育津贴) for insured employees.\n2. The city where you are insured sets how long you have to have contributed before the birth; check your record early so a gap can be fixed.\n3. Rules differ by province and city; ask the local medical insurance bureau (医疗保障局).\n4. This date is a planning estimate.',
    },
    {
      id: 'nt-scan',
      title: 'Early screening: NT scan (颈项透明层) at 11 to 13+6 weeks',
      offsetDays: -183,
      durationDays: 7,
      dependsOn: ['registration'],
      documents: ['Screening report'],
      prepare: ['Book the scan at a hospital that offers NT', 'Ask about early serum screening (10 to 13+6 weeks)'],
      conditions: ['Only if you choose early screening'],
      howTo:
        '1. The 2018 guideline lists the nuchal translucency (NT) ultrasound at 11 to 13+6 weeks, and early serum screening at 10 to 13+6 weeks, as optional items.\n2. Hospitals often book NT slots weeks ahead.\n3. The due date here is the end of the NT window; book before it.',
    },
    {
      id: 'delivery-hospital',
      title: 'Choose the delivery hospital (分娩医院) and set up your record there',
      offsetDays: -168,
      durationDays: 21,
      dependsOn: ['registration'],
      documents: ['Maternal and Child Health Handbook (母子健康手册)', 'Hospital record (医院建档)'],
      prepare: ['Distance from home', 'Level of the hospital and its neonatal care', 'Which checks it runs', 'Maternity insurance designated hospital (定点医院)'],
      howTo:
        '1. Many families have the later prenatal checks at the hospital where they will give birth.\n2. Check the hospital is a designated hospital for your maternity insurance, so birth costs can be settled directly.\n3. In a big city, for example Beijing or Shanghai, popular hospitals can fill up early; ask when they take new records.\n4. This date (16 weeks) is a planning estimate.',
    },
    {
      id: 'mid-screening',
      title: 'Second-trimester screening: serum screening (唐氏筛查) or NIPT (无创产前检测)',
      offsetDays: -140,
      durationDays: 14,
      dependsOn: ['first-check'],
      documents: ['Screening report'],
      prepare: ['Questions about serum screening, NIPT and diagnosis', 'Your age on the due date'],
      conditions: ['Only if you choose to screen; screening is optional'],
      howTo:
        '1. Second-trimester serum screening for Down syndrome and other chromosome conditions is done at 15 to 20 weeks, best at 16 to 18 weeks.\n2. NIPT screens for trisomy 21, 18 and 13 at 12 to 22+6 weeks, under the NHC technical standard.\n3. A high-risk or positive result leads to diagnosis at a prenatal diagnosis centre.\n4. The due date here is the end of the serum screening window (20 weeks).',
    },
    {
      id: 'leave-plan',
      title: 'Tell the employer and plan maternity leave (产假)',
      offsetDays: -150,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Planned last day of work', 'Your province\'s extra leave', 'How pay works during leave'],
      conditions: ['Only if you are an employee'],
      howTo:
        '1. The Special Provisions on Labour Protection for Female Employees give 98 days of maternity leave, of which up to 15 can be taken before the birth.\n2. A difficult birth adds 15 days; each extra baby in a multiple birth adds 15 days.\n3. Provinces add their own leave. Example: Beijing adds 60 days, 158 in total, and the employer may agree to 1 to 3 more months.\n4. When to tell the employer is your choice; this date is a planning estimate.',
    },
    {
      id: 'ogtt',
      title: 'Glucose tolerance test (OGTT) for gestational diabetes at 24 to 28 weeks',
      offsetDays: -84,
      durationDays: 14,
      dependsOn: ['first-check'],
      documents: [],
      prepare: ['Fast the night before', 'About 2 hours at the hospital'],
      howTo:
        '1. The 2018 guideline lists screening for gestational diabetes at 24 to 28 weeks as a standard check, usually a 75 g OGTT.\n2. The fetal anomaly ultrasound (胎儿系统超声筛查) comes just before, at 20 to 24 weeks.\n3. The due date here is the end of the window (28 weeks).',
    },
    {
      id: 'partner-leave',
      title: 'Partner: plan paternity leave (陪产假)',
      offsetDays: -60,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Your province\'s paternity leave', 'Planned dates around the due date'],
      conditions: ['Only if the partner is an employee'],
      howTo:
        '1. There is no national paternity leave; each province sets it.\n2. Example: Beijing gives the father 15 days, and more if the mother gives up some of her extra leave.\n3. Check your province\'s regulations and your employer\'s policy; this date is a planning estimate.',
    },
    {
      id: 'hospital-bag',
      title: 'Pack the hospital bag (待产包)',
      offsetDays: -35,
      durationDays: 7,
      dependsOn: [],
      documents: ['ID cards (身份证)', 'Maternal and Child Health Handbook (母子健康手册)', 'Social security card (社会保障卡)'],
      prepare: ['Clothes for you and the baby', 'Toiletries and maternity pads', 'Phone charger', 'Marriage certificate (结婚证) and household register (户口簿)'],
      howTo:
        '1. Pack the documents the hospital asks for at admission along with clothes and toiletries.\n2. Example from Hubei: the hospital checks the mother\'s ID card at admission and issues the birth medical certificate against it, so bring the original.\n3. Timing is a planning estimate; babies can arrive early.',
    },
    {
      id: 'name',
      title: 'Choose the baby\'s name',
      offsetDays: -30,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ['Surname', 'Given name in standard characters', 'Agreement from both parents'],
      howTo:
        '1. The name goes on the birth medical certificate (出生医学证明) and then the household register, so decide it before the hospital issues the certificate.\n2. Example rules from Hubei: characters come from the Table of General Standard Chinese Characters (通用规范汉字表), rare characters are not used, and the baby generally takes a parent\'s surname.\n3. Your province may have its own rules; ask the hospital.',
    },
    {
      id: 'late-checks',
      title: 'From 37 weeks: weekly checks and fetal monitoring (胎心监护)',
      offsetDays: -21,
      durationDays: 7,
      dependsOn: ['first-check'],
      documents: [],
      prepare: ['Signs of labour and when to go in', 'Route to the hospital'],
      howTo:
        '1. The 2018 guideline lists weekly non-stress tests (NST) and an ultrasound from 37 weeks.\n2. At 41 weeks the guideline suggests admission and induction.\n3. Follow your hospital\'s schedule; this date is a planning estimate.',
    },
    {
      id: 'birth-docs',
      title: 'Gather the documents needed after the birth',
      offsetDays: -21,
      durationDays: 7,
      dependsOn: ['name'],
      documents: ['ID cards (身份证)', 'Marriage certificate (结婚证)', 'Household register (户口簿)'],
      prepare: ['Both parents\' original ID cards', 'Which parent\'s household the baby will join', 'Bank card for insurance and subsidy payments'],
      howTo:
        '1. After the birth come the birth medical certificate (出生医学证明), household registration (户口登记) within one month, the vaccination certificate, medical insurance and the social security card.\n2. Many provinces run these together as the newborn birth "one thing" service (新生儿出生一件事), online or at one window.\n3. Example from Hubei: the mother applies for the birth medical certificate within 1 month with both parents\' ID cards and the marriage certificate.\n4. Check your province\'s list; this date is a planning estimate.',
    },
    {
      id: 'start-leave',
      title: 'Start maternity leave',
      offsetDays: -15,
      durationDays: 1,
      dependsOn: ['leave-plan'],
      documents: [],
      prepare: ['Hand over work', 'Confirm with HR how the maternity allowance will be paid'],
      conditions: ['Only if you are an employee'],
      howTo:
        '1. Up to 15 of the 98 national days can be taken before the birth.\n2. Fifteen days before the due date is a planning estimate; move it to your real last day.',
    },
    {
      id: 'allowance-claim',
      title: 'Claim the maternity allowance (生育津贴) and birth medical costs',
      offsetDays: 45,
      durationDays: 14,
      dependsOn: ['maternity-insurance', 'start-leave'],
      documents: ['Birth medical certificate (出生医学证明)', 'Hospital invoices and discharge record'],
      prepare: ['ID card or social security card', 'Itemised bill (费用清单)', 'Bank account for payment'],
      conditions: ['Only if you are covered by maternity insurance'],
      howTo:
        '1. For insured employees the maternity allowance is paid from the maternity insurance fund at the employer\'s average monthly wage for the previous year; without insurance the employer pays the pre-leave wage.\n2. Birth costs at a designated hospital are often settled directly; otherwise claim them with the invoices, itemised bill and discharge record.\n3. Depending on the city, the employer or you apply, and some provinces include it in the birth "one thing" service.\n4. Timing is a planning estimate.',
    },
  ],
};
