import type { Playbook } from '../../domain/types';

export const parent60Cn: Playbook = {
  id: 'parent-60-cn',
  title: 'A parent turns 60 · China',
  summary:
    'Paperwork plan for when a parent turns 60 in mainland China: the elderly support tax deduction, carer leave, medical insurance sharing, senior benefits, a parent moving in, and planning ahead with a chosen guardian.',
  region: 'China',
  country: 'CN',
  family: 'parent-60',
  anchorKind: 'parent-60',
  conditions: [
    'A parent of yours turns 60; the event date is their 60th birthday',
    'The steps are for an adult child who lives or pays tax in mainland China',
    'Carer leave, senior benefits and hukou rules are set by each province or city; check the local rule',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Interim Measures for Special Additional Deductions of Individual Income Tax (2018) — gov.cn',
      url: 'https://www.gov.cn/zhengce/content/2018-12/22/content_5351181.htm',
    },
    {
      title: 'Tax policy library (special additional deduction amounts, current) — State Taxation Administration',
      url: 'https://fgk.chinatax.gov.cn/',
    },
    {
      title: 'Civil Code of the PRC (中华人民共和国民法典) — National People\'s Congress',
      url: 'http://www.npc.gov.cn/npc/c2/c30834/202006/t20200602_306457.html',
    },
    {
      title: 'National Healthcare Security Administration',
      url: 'https://www.nhsa.gov.cn/',
    },
    {
      title: 'Household Registration Regulations of the PRC (户口登记条例)',
      url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1822',
    },
    {
      title: 'National Social Insurance Public Service Platform',
      url: 'https://si.12333.gov.cn/osptb/index.html',
    },
  ],
  steps: [
    {
      id: 'elderly-deduction',
      title: 'Declare the elderly support deduction (赡养老人专项附加扣除)',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Deduction declaration in the individual income tax app', 'Written split agreement, if shared with siblings'],
      prepare: ['Parent\'s name and ID number', 'Siblings\' names and ID numbers, if any', 'How the amount is split between siblings'],
      conditions: ['Only if you pay individual income tax in China'],
      howTo:
        '1. The deduction starts from the month a parent turns 60; it is counted per taxpayer, not per parent.\n2. An only child deducts the full amount, 3,000 yuan a month since 2023 (check current).\n3. Siblings share the same total, split equally, by agreement or as the parent designates; each sibling deducts at most 1,500 yuan a month. An agreed or designated split is put in writing.\n4. It is declared in the individual income tax app (个人所得税 app), either through the employer each month or in the annual reconciliation (年度汇算).\n5. Declarations are confirmed again each December for the next year.',
    },
    {
      id: 'carer-leave',
      title: 'Check the only-child carer leave in your province (独生子女护理假)',
      offsetDays: 30,
      durationDays: 3,
      dependsOn: [],
      documents: ['Provincial rule on carer leave'],
      prepare: ['Proof of being an only child (e.g. 独生子女证 or household register)', 'Employer\'s leave policy'],
      conditions: ['Only if you are an only child and employed'],
      howTo:
        '1. Many provinces give paid carer leave (护理假) to an only child when a parent aged 60 or over is in hospital.\n2. The number of days, and whether it applies to non-only children, differs by province; check the current provincial regulation on the elderly.\n3. Hospital admission papers are usually shown to the employer.',
    },
    {
      id: 'pension-check',
      title: 'Check the parent\'s retirement date and pension status',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Parent\'s social insurance record'],
      prepare: ['Parent\'s ID card', 'Parent\'s social security card or the 12333 app'],
      conditions: ['Only if the parent\'s own retirement plan doesn\'t already cover this'],
      howTo:
        '1. Under the reform from 2025, the statutory retirement age rises gradually; a man turning 60 may retire a few months later than 60.\n2. The national social insurance platform or the 12333 app shows the retirement date and contribution years.\n3. A parent already drawing a pension usually confirms eligibility (领取资格认证) once a year, often by face check in an app.',
    },
    {
      id: 'medical-sharing',
      title: 'Set up medical insurance family sharing (医保家庭共济)',
      offsetDays: 60,
      durationDays: 7,
      dependsOn: [],
      documents: ['Family sharing binding in the national medical insurance app'],
      prepare: ['Your medical insurance account', 'Parent\'s ID card and insurance details'],
      conditions: ['Only if you have employee medical insurance (职工医保)'],
      howTo:
        '1. The personal account of employee medical insurance can pay close relatives\' resident medical insurance contributions and their medical costs.\n2. Binding is done in the national medical insurance app (国家医保服务平台) or the local app.\n3. Sharing across provinces is being rolled out; check current local support.',
    },
    {
      id: 'senior-benefits',
      title: 'Check local senior benefits (老年人优待)',
      offsetDays: 60,
      durationDays: 7,
      dependsOn: [],
      documents: ['Senior card or benefit card, if the city issues one (老年人优待证)'],
      prepare: ['Parent\'s ID card', 'Photo'],
      howTo:
        '1. Cities give people over 60 or 65 free or cheaper public transport, park and museum entry and priority services.\n2. Some benefits work with the ID card alone; others need a local card.\n3. The age and what is covered are set locally; check with the street or community office (街道/社区).',
    },
    {
      id: 'moving-in-medical',
      title: 'Register the parent\'s medical care in your city (异地就医备案)',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Cross-region medical registration'],
      prepare: ['Parent\'s ID card', 'Parent\'s insurance city and type', 'Your address in the new city'],
      conditions: ['Only if the parent is moving in with you in another city or province'],
      howTo:
        '1. Registering for medical care away from the insured city (异地就医备案) lets hospital bills be settled directly where the parent lives.\n2. It is done online in the national medical insurance app, often by selecting "long-term residence" or "living with family".\n3. Reimbursement rates can differ from the home city.',
    },
    {
      id: 'moving-in-insurance',
      title: 'Decide where the parent keeps resident medical insurance',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: [],
      documents: ['Resident medical insurance enrolment (城乡居民医保)'],
      prepare: ['Parent\'s ID card', 'Hukou book or residence permit'],
      conditions: ['Only if the parent is moving in with you and has resident, not employee, insurance'],
      howTo:
        '1. Resident medical insurance is usually paid yearly where the hukou is; some cities let holders of a residence permit enrol locally.\n2. Payment usually opens in the autumn for the next year; a gap can bring a waiting period.\n3. Check the current local rule before stopping insurance in the home city.',
    },
    {
      id: 'hukou-transfer',
      title: 'Move the parent\'s hukou to your city (投靠子女落户)',
      offsetDays: 180,
      durationDays: 60,
      dependsOn: [],
      documents: ['Updated household register (户口簿)'],
      prepare: ['Your hukou book and ID card', 'Parent\'s hukou book and ID card', 'Proof of relationship', 'Proof of your home or residence'],
      conditions: ['Only if the parent wants to move their hukou to live with you'],
      howTo:
        '1. Many cities let parents move their hukou to join a child (投靠子女), often from a set age and with conditions on the child\'s hukou, home and years in the city.\n2. The local public security bureau or police station handles it.\n3. Moving the hukou can change the parent\'s resident insurance, land rights in the home village and local benefits; check before applying.\n4. The date and time taken are estimates.',
    },
    {
      id: 'guardian',
      title: 'Set up a chosen guardian or a will, if wanted (意定监护, 遗嘱)',
      offsetDays: 180,
      durationDays: 30,
      dependsOn: [],
      documents: ['Written guardianship agreement, often notarised', 'Will, if made'],
      prepare: ['Parent\'s ID card', 'Chosen guardian\'s ID card', 'List of property and accounts'],
      conditions: ['Only if the parent wants to plan ahead'],
      howTo:
        '1. Under the Civil Code, an adult with full capacity can choose in writing, with the person\'s agreement, who becomes their guardian if they later lose capacity (意定监护).\n2. A notary office (公证处) can notarise the agreement and a will; notarisation is common but a will has other valid forms under the Civil Code.\n3. The parent decides; this step is only a prompt.',
    },
    {
      id: 'health-check',
      title: 'Book the free yearly health check at 65',
      offsetDays: 1826,
      durationDays: 14,
      dependsOn: [],
      documents: ['Health check record'],
      prepare: ['Parent\'s ID card', 'Nearest community health centre (社区卫生服务中心)'],
      howTo:
        '1. Under the national basic public health services, people 65 and over can get a free health check once a year at the community health centre or township clinic.\n2. It is usually registered where the parent lives; check what the local centre needs.\n3. It repeats yearly.',
    },
  ],
};
