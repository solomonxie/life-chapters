import type { Playbook } from '../../domain/types';

export const schoolYearsCn: Playbook = {
  id: 'school-years-cn',
  title: 'School years · primary · China',
  summary:
    'Primary school enrollment, catchment allocation, private school lotteries, student status, school-entry vaccines and the move to middle school for a child in mainland China. Each city or district sets its own dates and papers.',
  region: 'China',
  country: 'CN',
  family: 'school-years',
  anchorKind: 'born',
  ages: { from: 5, to: 12 },
  conditions: [
    'Your child will attend primary school in mainland China',
    'From enrollment to the move to middle school',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: '中华人民共和国义务教育法 (Compulsory Education Law) — Ministry of Education',
      url: 'http://www.moe.gov.cn/jyb_sjzl/sjzl_zcfg/zcfg_jyfl/202110/t20211029_575949.html',
    },
    {
      title: '教育部办公厅关于进一步做好普通中小学招生入学工作的通知 (2022 enrollment notice) — Ministry of Education',
      url: 'http://www.moe.gov.cn/srcsite/A06/s3321/202204/t20220401_612689.html',
    },
    {
      title: '教育部办公厅关于开展中小学阳光招生专项行动（2026年）的通知 (2026 fair admissions notice) — Ministry of Education',
      url: 'http://www.moe.gov.cn/srcsite/A06/s3321/202604/t20260403_1432844.html',
    },
    {
      title: '关于进一步做好小学升入初中免试就近入学工作的实施意见 (primary-to-middle transition) — Ministry of Education',
      url: 'http://www.moe.gov.cn/srcsite/A06/s3321/201401/t20140126_163246.html',
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
      title: '关于国家免疫规划百白破疫苗和白破疫苗免疫程序调整相关工作的通知 (DTaP schedule change, 2025) — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/202412/content_6994724.htm',
    },
    {
      title: '0-6岁儿童健康管理服务指南 (child health check schedule) — Xinqiu District, Fuxin (example)',
      url: 'https://www.fxxq.gov.cn/xqq/file/2023-11-22/17006399364454028e4928a108a3435018bf60a0fbd7544.pdf',
    },
    {
      title: '北京市教育委员会关于2026年义务教育阶段入学工作的意见 (Beijing enrollment 2026) — Beijing Municipal Government (example)',
      url: 'https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/t20260417_4589381.html',
    },
    {
      title: '《北京市教育委员会关于2026年义务教育阶段入学工作的意见》政策解读 (Beijing policy explainer) — Beijing Municipal Government (example)',
      url: 'https://www.beijing.gov.cn/zhengce/zcjd/202604/t20260417_4589389.html',
    },
    {
      title: '市教委关于2026年上海市义务教育阶段学校招生入学工作的实施意见 (Shanghai enrollment 2026) — Shanghai Municipal Government (example)',
      url: 'https://www.shanghai.gov.cn/nw12344/20260326/6869dfccd29f4d88966a526eb4252b47.html',
    },
  ],
  steps: [
    {
      id: 'residence-permit',
      title: 'Check the rules for children without a local hukou (随迁子女) and get a residence permit (居住证)',
      offsetDays: 2070,
      durationDays: 90,
      ages: { from: 5, to: 5 },
      conditions: ['Only if your child\'s hukou (户口) is not in the city where you live'],
      dependsOn: [],
      documents: ['Residence permit (居住证)', 'Social insurance record (社保缴费记录)', 'Work contract or business licence', 'Rental contract or property certificate'],
      prepare: ['Your city\'s enrollment rules for children without a local hukou', 'Months of social insurance paid in this city'],
      howTo:
        '1. The Compulsory Education Law says children living where parents work or live, away from their hukou, get equal access to compulsory education there; each province sets the details.\n2. National policy uses the residence permit as the main basis, and the MOE\'s 2026 notice asks cities to cut extra papers, with some areas moving to residence-permit-only entry.\n3. A residence permit generally follows at least half a year of living in the city with a stable job, home or studies.\n4. Shanghai (example, 2026): the child holds a valid Shanghai residence permit or residence registration, and one parent holds a residence permit with 6 months of city social insurance within a year, or 3 years of registered flexible employment.\n5. Beijing (example, 2026): parents bring proof of work and home in Beijing, the whole family\'s household register and a Beijing residence permit to the local street office for an eligibility check.\n6. Some cities use points (积分) instead; start early, since social insurance months take time to build.',
    },
    {
      id: 'catchment',
      title: 'Find your catchment primary school (划片 / 学区)',
      offsetDays: 2130,
      durationDays: 30,
      ages: { from: 5, to: 5 },
      dependsOn: [],
      documents: [],
      prepare: ['Home address as on the property or rental papers', 'Your district education bureau\'s catchment map'],
      howTo:
        '1. Compulsory education is test-free and near home (免试就近入学): each public school has a catchment area (划片) set by the county or district education bureau.\n2. A single-school catchment (单校划片) maps an address to one school; a multi-school catchment (多校划片) covers several schools and places children among them.\n3. Beijing (example) mainly uses registration with both single- and multi-school catchments.\n4. Catchment maps, entry conditions and places are published by the district each spring; many districts give priority by hukou and home ownership or length of residence at the address.',
    },
    {
      id: 'documents',
      title: 'Gather enrollment papers',
      offsetDays: 2130,
      durationDays: 60,
      ages: { from: 5, to: 5 },
      dependsOn: [],
      documents: [
        'Household register (户口簿)',
        'Property certificate (房产证) or rental contract',
        'Parent ID cards',
        'Birth certificate (出生医学证明)',
      ],
      prepare: ['Residence permit (居住证) and social insurance record, if the hukou is elsewhere', 'Your district\'s document list'],
      howTo:
        '1. Each district publishes what it accepts; these are the usual papers.\n2. Local-hukou children usually use the household register plus the home\'s property certificate; renters follow district rules.\n3. Non-hukou children usually add the residence permit and parents\' social insurance or work papers.\n4. The MOE says only necessary papers may be asked for, and cities are sharing hukou, property and social insurance data to cut paperwork.',
    },
    {
      id: 'info-collection',
      title: 'Take part in enrollment information collection (入学信息采集)',
      offsetDays: 2192,
      durationDays: 30,
      ages: { from: 6, to: 6 },
      dependsOn: ['catchment', 'documents', 'residence-permit'],
      documents: ['Household register (户口簿)', 'Property certificate (房产证) or residence permit (居住证)'],
      prepare: ['Account on your city\'s compulsory-education enrollment platform'],
      howTo:
        '1. Children who turn 6 start primary school that September; the law allows a delay to 7 where conditions are lacking.\n2. Cities use a cut-off date, often 31 August: Beijing (2026) took children born by 31 Aug 2020; Shanghai (2026) took those born 1 Sept 2019 to 31 Aug 2020.\n3. Collection is usually in spring: in Shanghai (2026), 13–26 April through the kindergarten or the district; in Beijing, on the city enrollment platform, then the printed form goes to the school.\n4. The vaccination certificate is not a precondition for registration; schools ask for it after the start of term.\n5. The due date here is a planning estimate at age 6; set it to your district\'s window.',
    },
    {
      id: 'private-lottery',
      title: 'Apply to a private primary school and its lottery (民办摇号)',
      offsetDays: 2222,
      durationDays: 14,
      ages: { from: 6, to: 6 },
      conditions: ['Only if you want a private (民办) primary school'],
      dependsOn: ['info-collection'],
      documents: ['Enrollment information form from the collection step'],
      prepare: ['Private schools approved in your district or city', 'Their published fees'],
      howTo:
        '1. Private and public schools enroll at the same time (公民同招), and private schools take pupils mainly from their approving area.\n2. When applicants exceed places, a computer lottery (电脑随机录取) decides, under supervision.\n3. Shanghai (example, 2026): private primary sign-up 7–9 May, lottery 20–21 May, recorded and notarised.\n4. A child not placed by lottery falls back to the public catchment allocation.',
    },
    {
      id: 'school-place',
      title: 'Get the school place and register at the school (入学登记)',
      offsetDays: 2252,
      durationDays: 30,
      ages: { from: 6, to: 6 },
      dependsOn: ['info-collection', 'private-lottery'],
      documents: ['Enrollment information form', 'Household register (户口簿)', 'Property certificate (房产证) or residence permit (居住证)'],
      prepare: ['Notice from the district or school'],
      howTo:
        '1. The district assigns a public school by catchment (划片), or confirms the private place.\n2. Shanghai (example, 2026): public primary sign-up 7–11 May; results from 22 May by text and the enrollment platform.\n3. Schools may not select by tests, interviews, certificates or competition results.\n4. If the place is wrong or missing, call the district\'s enrollment hotline.',
    },
    {
      id: 'vaccines-6y',
      title: 'Get the 6-year vaccines',
      offsetDays: 2192,
      durationDays: 60,
      ages: { from: 6, to: 6 },
      dependsOn: [],
      documents: ['Vaccination certificate (预防接种证)'],
      prepare: ['Appointment at your vaccination clinic (接种单位)'],
      howTo:
        '1. At 6 (2026 national schedule): DTaP (百白破) dose 5, which since 1 January 2025 replaces the old DT (白破) dose, and meningococcal A and C polysaccharide vaccine dose 2.\n2. Children who had the inactivated Japanese encephalitis (乙脑) vaccine also get their 6-year dose.\n3. Book the free 6-year child health check (vision, teeth, blood test) at the same time.',
    },
    {
      id: 'vaccine-check',
      title: 'Hand in the vaccination certificate for the school-entry check (入学查验预防接种证)',
      offsetDays: 2372,
      durationDays: 30,
      ages: { from: 6, to: 7 },
      dependsOn: ['school-place', 'vaccines-6y'],
      documents: ['Vaccination certificate (预防接种证)'],
      prepare: ['Copy or photo of the certificate'],
      howTo:
        '1. Every primary school checks the certificate of each new, transferring or joining pupil.\n2. The check is done within 30 days of the start of term.\n3. If doses are missing, the clinic gives catch-up doses (补种) and notes them; the school checks again by the end of December.\n4. A lost certificate can be re-issued (补证) by the vaccination clinic.\n5. The due date here is a planning estimate, about a month after a September start.',
    },
    {
      id: 'student-status',
      title: 'Confirm the student status record (学籍)',
      offsetDays: 2402,
      durationDays: 30,
      ages: { from: 6, to: 7 },
      dependsOn: ['school-place'],
      documents: ['Household register (户口簿)'],
      prepare: ['Child\'s ID number as on the household register'],
      howTo:
        '1. The school registers each pupil in the national student status system (全国中小学生学籍信息管理系统).\n2. The rule is one pupil, one record, and the record follows the pupil (一人一籍、籍随人走) on transfer.\n3. Being registered at one school while attending another (人籍分离) is not allowed.\n4. Shanghai (example) links new pupils into its system by 31 August.\n5. Check the name, date of birth and ID number with the class teacher; the middle-school allocation uses this record.',
    },
    {
      id: 'yearly-september',
      title: 'Yearly September start: school notices and forms',
      offsetDays: 2707,
      durationDays: 30,
      ages: { from: 7, to: 11 },
      dependsOn: ['student-status'],
      documents: [],
      prepare: ['School notices for the new year', 'Updated contact details'],
      howTo:
        '1. Each September, read the school\'s start-of-year notices and update contact and health details.\n2. If you move and change schools (转学), the student status transfers with the pupil, and the new school checks the vaccination certificate again.\n3. The date here is set at age 7; repeat each September.',
    },
    {
      id: 'middle-school-rules',
      title: 'Check the middle-school allocation rules (小升初)',
      offsetDays: 4353,
      durationDays: 30,
      ages: { from: 11, to: 12 },
      dependsOn: ['student-status'],
      documents: [],
      prepare: ['District\'s middle-school catchments and plans', 'Whether to apply to return to the hukou district'],
      howTo:
        '1. Middle school is also test-free and near home: in a single-school catchment each middle school takes all pupils from its linked primary schools (对口直升).\n2. In a multi-school catchment, families list choices; oversubscribed schools place pupils by random allocation (随机派位).\n3. The allocation runs on the national student status record.\n4. Timing is usually spring of Grade 6; in Shanghai (example, 2026) Grade 5 pupils check their details in April, as primary there has 5 grades.\n5. Beijing (example): a pupil can apply to go to middle school in the hukou district or where the family actually lives, through the primary school.\n6. The due date here is a planning estimate, about age 12; set it to your district\'s notice.',
    },
    {
      id: 'private-middle-lottery',
      title: 'Apply to a private middle school and its lottery (民办摇号)',
      offsetDays: 4413,
      durationDays: 14,
      ages: { from: 12, to: 12 },
      conditions: ['Only if you want a private (民办) middle school'],
      dependsOn: ['middle-school-rules'],
      documents: ['Student status record details'],
      prepare: ['Private middle schools in your approving area', 'Their published fees'],
      howTo:
        '1. Private middle schools enroll at the same time as public ones, and use a computer lottery when oversubscribed.\n2. They may not test, interview or use certificates to select pupils.\n3. Shanghai (example, 2026): private middle school sign-up 12–14 May.',
    },
    {
      id: 'middle-school-allocation',
      title: 'Take part in catchment allocation to middle school (对口 / 派位)',
      offsetDays: 4443,
      durationDays: 30,
      ages: { from: 12, to: 12 },
      dependsOn: ['middle-school-rules', 'private-middle-lottery'],
      documents: [],
      prepare: ['Account on your city\'s enrollment platform', 'Ordered list of choices, if your area uses them'],
      howTo:
        '1. The district places pupils by linked primary (对口) or random allocation (派位) inside the catchment.\n2. Beijing (example) places pupils by listed choices and random allocation (志愿派位); a middle school with fewer applicants than places takes them directly.\n3. Results come from the district; a pupil with a private place does not enter this allocation.',
    },
  ],
};
