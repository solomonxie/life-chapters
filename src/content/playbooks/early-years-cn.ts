import type { Playbook } from '../../domain/types';

export const earlyYearsCn: Playbook = {
  id: 'early-years-cn',
  title: 'Early years · ages 1–5 · China',
  summary:
    'Childcare, kindergarten places, the free final kindergarten year, routine vaccines and free child health checks for a child from 1 to 5 in mainland China. Each city or district sets its own kindergarten dates and papers.',
  region: 'China',
  country: 'CN',
  family: 'early-years',
  anchorKind: 'born',
  ages: { from: 1, to: 5 },
  conditions: [
    'Your child is between 1 and 5',
    'You live in mainland China',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: '托育机构登记和备案办法（试行） (childcare registration and filing) — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/2020-01/06/content_5466960.htm',
    },
    {
      title: '国家托育机构备案信息系统 (national childcare filing system)',
      url: 'https://ty.padis.net.cn/',
    },
    {
      title: '中华人民共和国学前教育法 (Preschool Education Law) — gov.cn',
      url: 'https://www.gov.cn/yaowen/liebiao/202411/content_6985752.htm',
    },
    {
      title: '国务院办公厅关于逐步推行免费学前教育的意见 (free preschool education) — gov.cn',
      url: 'https://www.gov.cn/zhengce/content/202508/content_7035305.htm',
    },
    {
      title: '关于免费学前教育，六问六答 (free preschool Q&A) — gov.cn',
      url: 'https://www.gov.cn/zhengce/202508/content_7035522.htm',
    },
    {
      title: '儿童入托、入学预防接种证查验办法 (vaccination certificate check) — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/2021-02/09/content_5586296.htm',
    },
    {
      title: '国家免疫规划疫苗儿童免疫程序及说明（2026年版） (national immunization schedule) — National Disease Control and Prevention Administration',
      url: 'https://www.ndcpa.gov.cn/jbkzzx/c100014/common/content/content_2073005020766703616.html',
    },
    {
      title: '新版国家免疫规划疫苗儿童免疫程序及说明印发 (2026 schedule released) — gov.cn',
      url: 'https://www.gov.cn/lianbo/202607/content_7074538.htm',
    },
    {
      title: '关于国家免疫规划百白破疫苗和白破疫苗免疫程序调整相关工作的通知 (DTaP schedule change, 2025) — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/202412/content_6994724.htm',
    },
    {
      title: '国家基本公共卫生服务规范（第三版） (basic public health services, incl. 0–6 child health) — National Health Commission',
      url: 'https://www.nhc.gov.cn/ewebeditor/uploadfile/2017/04/20170417104506514.pdf',
    },
    {
      title: '0-6岁儿童健康管理服务指南 (child health check schedule) — Xinqiu District, Fuxin (example)',
      url: 'https://www.fxxq.gov.cn/xqq/file/2023-11-22/17006399364454028e4928a108a3435018bf60a0fbd7544.pdf',
    },
    {
      title: '北京各区发布幼儿园招生工作公告 (Beijing kindergarten admissions 2026) — Beijing Municipal Government (example)',
      url: 'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202606/t20260604_4685525.html',
    },
    {
      title: '关于做好2026年上海市学前教育阶段适龄幼儿入园工作的通知 (Shanghai kindergarten admissions 2026) — Shanghai Municipal Government (example)',
      url: 'https://www.shanghai.gov.cn/nw12344/20260409/2f73c443fd6b409c9ecc48b6d9cf04cc.html',
    },
  ],
  steps: [
    {
      id: 'childcare-check',
      title: 'Check a childcare provider is filed (托育机构备案)',
      offsetDays: 365,
      durationDays: 30,
      ages: { from: 1, to: 2 },
      conditions: ['Only if you plan to use childcare before age 3'],
      dependsOn: [],
      documents: [],
      prepare: ['Shortlist of providers near home or work', 'Days and hours needed', 'Start date you need'],
      howTo:
        '1. Childcare for children under 3 is run by childcare providers (托育机构), and some kindergartens also run toddler classes.\n2. A provider first registers as a public institution, a social-service organisation (with civil affairs) or a business (with market regulation), depending on its type.\n3. It then files (备案) with the county-level health commission (卫生健康部门), which checks it against the national standards.\n4. Filing is done in the national childcare filing system; health departments publish provider details for the public to check.\n5. Ask the provider for its filing receipt (备案回执), or check your district health commission\'s published list.',
    },
    {
      id: 'vaccines-18m',
      title: 'Get the 18-month vaccines',
      offsetDays: 548,
      durationDays: 30,
      ages: { from: 1, to: 1 },
      dependsOn: [],
      documents: ['Vaccination certificate (预防接种证)'],
      prepare: ['Appointment at your vaccination clinic (接种单位), usually the community health centre (社区卫生服务中心)'],
      howTo:
        '1. Under the national immunization programme (国家免疫规划, 2026 schedule), 18 months brings: DTaP (百白破) dose 4, MMR (麻腮风) dose 2, and hepatitis A (甲肝) — the single live dose, or dose 1 of the inactivated vaccine.\n2. National programme vaccines are free.\n3. Keep the vaccination certificate safe; kindergarten and school will check it.',
    },
    {
      id: 'health-18m',
      title: 'Book the 18-month child health check',
      offsetDays: 548,
      durationDays: 30,
      ages: { from: 1, to: 1 },
      dependsOn: [],
      documents: ['Child health record (儿童保健手册)'],
      prepare: ['Community health centre or township health centre (乡镇卫生院)'],
      howTo:
        '1. Free child health checks (0–6岁儿童健康管理) under the national basic public health services run at 18, 24, 30 and 36 months, then once a year at 4, 5 and 6.\n2. At 18 months: growth, development and teeth, plus a blood test.\n3. Checks are meant to line up with vaccine visits, so ask to do both on the same day.',
    },
    {
      id: 'vaccines-2y',
      title: 'Get the 2-year vaccines',
      offsetDays: 730,
      durationDays: 30,
      ages: { from: 2, to: 2 },
      dependsOn: ['vaccines-18m'],
      documents: ['Vaccination certificate (预防接种证)'],
      prepare: ['Appointment at your vaccination clinic'],
      howTo:
        '1. At 2 years: Japanese encephalitis (乙脑) — dose 2 of the live vaccine, or the 2-year dose of the inactivated vaccine.\n2. If your child had the inactivated hepatitis A vaccine at 18 months, dose 2 is due now.\n3. The clinic knows which products your child had; check the certificate after each visit.',
    },
    {
      id: 'health-2y',
      title: 'Book the 2-year and 30-month child health checks',
      offsetDays: 730,
      durationDays: 30,
      ages: { from: 2, to: 2 },
      dependsOn: ['health-18m'],
      documents: ['Child health record (儿童保健手册)'],
      prepare: ['Community health centre'],
      howTo:
        '1. At 24 months: growth, development, teeth and a hearing screen.\n2. Another free check is due at 30 months, with a blood test.\n3. Ask about speech or development worries at either visit.',
    },
    {
      id: 'kg-choose',
      title: 'Shortlist kindergartens: public or affordable private (公办 / 普惠性民办幼儿园)',
      offsetDays: 1035,
      durationDays: 30,
      ages: { from: 2, to: 3 },
      dependsOn: [],
      documents: [],
      prepare: ['Kindergartens near home', 'Your district education bureau\'s admissions notice', 'Open-day dates'],
      howTo:
        '1. Kindergarten (幼儿园) is for children from 3 until primary school, under the Preschool Education Law (学前教育法, in force since 1 June 2025).\n2. Public kindergartens (公办) and affordable private ones (普惠性民办, with government-set fees) are the lower-cost options; other private kindergartens set their own fees.\n3. The law asks local governments to help children attend near where parents live or work; admission is test-free.\n4. Each city or district sets the rules: in Fengtai, Beijing (example, 2026) families list 2 to 5 kindergartens of at least 2 types on the city platform; Shanghai (example) holds kindergarten open days in April.',
    },
    {
      id: 'kg-documents',
      title: 'Gather kindergarten registration papers',
      offsetDays: 1035,
      durationDays: 30,
      ages: { from: 2, to: 3 },
      dependsOn: [],
      documents: [
        'Household register (户口簿)',
        'Birth certificate (出生医学证明)',
        'Vaccination certificate (预防接种证)',
        'Property certificate (房产证) or rental and residence papers',
        'Parent ID cards',
      ],
      prepare: ['Residence permit (居住证) or residence registration, if the hukou is elsewhere', 'Your district\'s document list'],
      howTo:
        '1. Districts publish their own lists; these papers are the usual ones.\n2. Children with a local hukou usually use the household register and home address.\n3. Children without a local hukou usually need a local residence permit; Shanghai (example) accepts a Shanghai residence permit (居住证) or residence registration certificate (居住登记凭证) for the child and guardian.\n4. Check how your district orders admissions before choosing kindergartens.',
    },
    {
      id: 'vaccines-3y',
      title: 'Get the 3-year vaccine',
      offsetDays: 1095,
      durationDays: 30,
      ages: { from: 3, to: 3 },
      dependsOn: ['vaccines-2y'],
      documents: ['Vaccination certificate (预防接种证)'],
      prepare: ['Appointment at your vaccination clinic'],
      howTo:
        '1. At 3 years: meningococcal A and C polysaccharide vaccine (A群C群流脑多糖疫苗), dose 1.\n2. Do this before kindergarten starts, so the certificate is complete for the entry check.',
    },
    {
      id: 'health-3y',
      title: 'Book the 3-year child health check',
      offsetDays: 1095,
      durationDays: 30,
      ages: { from: 3, to: 3 },
      dependsOn: ['health-2y'],
      documents: ['Child health record (儿童保健手册)'],
      prepare: ['Community health centre'],
      howTo:
        '1. At 36 months: growth, development, teeth and a hearing screen.\n2. From 3 to 6 the free check is yearly; children in kindergarten may have it there.',
    },
    {
      id: 'kg-register',
      title: 'Register for kindergarten (幼儿园报名)',
      offsetDays: 1095,
      durationDays: 30,
      ages: { from: 3, to: 3 },
      dependsOn: ['kg-choose', 'kg-documents'],
      documents: ['Household register (户口簿)', 'Birth certificate (出生医学证明)', 'Vaccination certificate (预防接种证)', 'Proof of address'],
      prepare: ['Account on your city\'s kindergarten admissions platform'],
      howTo:
        '1. Children usually start in the September after they turn 3, with a cut-off such as 31 August; the city sets it.\n2. Registration is usually in spring or early summer before the September start.\n3. Shanghai (example, 2026): children born 1 Sept 2022 to 31 Aug 2023; online sign-up 22–29 April, registration and document checks 7–29 May, offers by 1 July.\n4. Beijing (example, 2026): district portals on the admissions platform opened from 1 June, mostly with sign-up in June and document checks in July.\n5. The law allows a health check at entry but no test or interview.\n6. The due date here is a planning estimate at age 3; set it to your district\'s window.',
    },
    {
      id: 'kg-vaccine-check',
      title: 'Hand in the vaccination certificate for the entry check (入托入学查验预防接种证)',
      offsetDays: 1275,
      durationDays: 30,
      ages: { from: 3, to: 4 },
      dependsOn: ['kg-register', 'vaccines-3y'],
      documents: ['Vaccination certificate (预防接种证)'],
      prepare: ['Copy or photo of the certificate', 'Vaccination clinic\'s contact'],
      howTo:
        '1. Under the national check rules (2021), every childcare provider, kindergarten and primary school checks the certificate of each new or transferring child.\n2. The kindergarten asks for it at registration and finishes the check within 30 days of the start of term.\n3. If doses are missing, the clinic gives catch-up doses (补种) and notes them on the certificate; the kindergarten checks again by the end of December.\n4. A lost certificate can be re-issued (补证) by the vaccination clinic.\n5. The due date here is a planning estimate, about a month after a September start.',
    },
    {
      id: 'vaccines-4y',
      title: 'Get the 4-year polio vaccine',
      offsetDays: 1461,
      durationDays: 30,
      ages: { from: 4, to: 4 },
      dependsOn: ['vaccines-3y'],
      documents: ['Vaccination certificate (预防接种证)'],
      prepare: ['Appointment at your vaccination clinic'],
      howTo:
        '1. At 4 years: oral polio vaccine (bOPV, 脊灰), dose 4.\n2. The national schedule has no routine dose at 5; the next visit is at 6, in the school-years plan.',
    },
    {
      id: 'health-4y',
      title: 'Book the 4-year child health check',
      offsetDays: 1461,
      durationDays: 30,
      ages: { from: 4, to: 4 },
      dependsOn: ['health-3y'],
      documents: ['Child health record (儿童保健手册)'],
      prepare: ['Community health centre, or ask whether the kindergarten hosts it'],
      howTo:
        '1. At 4: growth, development, teeth, a vision screen and a blood test.\n2. Children in kindergarten may be checked there; ask the kindergarten\'s health staff.',
    },
    {
      id: 'health-5y',
      title: 'Book the 5-year child health check',
      offsetDays: 1826,
      durationDays: 30,
      ages: { from: 5, to: 5 },
      dependsOn: ['health-4y'],
      documents: ['Child health record (儿童保健手册)'],
      prepare: ['Community health centre, or ask whether the kindergarten hosts it'],
      howTo:
        '1. At 5: growth, development, teeth, a vision screen and a blood test.\n2. The last free yearly check is at 6.',
    },
    {
      id: 'free-final-year',
      title: 'Check the free final kindergarten year (免费学前教育)',
      offsetDays: 2040,
      durationDays: 30,
      ages: { from: 5, to: 5 },
      conditions: ['Only if your child is in the final kindergarten year (大班) at a public or approved private kindergarten'],
      dependsOn: ['kg-register'],
      documents: [],
      prepare: ['This term\'s fee notice from the kindergarten'],
      howTo:
        '1. From autumn term 2025, childcare and education fees (保育教育费) for the final year before primary school (学前一年, the 大班) are waived at public kindergartens.\n2. At private kindergartens approved by the education department, fees are cut by the same amount as at a similar local public kindergarten; the private kindergarten may still charge the difference.\n3. Meals, boarding and other charges (伙食费、住宿费、杂费) are not covered.\n4. The kindergarten and the education system handle it; there is no family application in the national rules.\n5. Tibet, Xinjiang and some other areas keep their own existing free-preschool policies.\n6. The due date here is a planning estimate at the start of the final year; check the fee notice then.',
    },
  ],
};
