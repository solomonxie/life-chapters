import type { Playbook } from '../../domain/types';

export const graduatedCn: Playbook = {
  id: 'graduated-cn',
  title: 'After graduation · China',
  summary:
    'Graduation (毕业) paperwork for a graduate of a university in mainland China: the employment agreement, destination registration, certificates and CHSI records, the personal file, household registration and student loan repayment. Dates count from the graduation date.',
  region: 'China',
  country: 'CN',
  family: 'graduated',
  anchorKind: 'graduated',
  ages: { from: 18 },
  conditions: [
    'For a graduate of a regular higher education institution (普通高校) in mainland China',
    'Archive, household registration and loan rules are set by the school, the province and the receiving city; check them locally',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Notice on further improving employment for college graduates and young people (国办发〔2022〕13号) — gov.cn',
      url: 'https://www.gov.cn/zhengce/content/2022-05/13/content_5690111.htm',
    },
    {
      title: 'National graduate destination registration system (全国高校毕业生毕业去向登记系统) — NCSS',
      url: 'https://dj.ncss.cn/',
    },
    {
      title: 'National university graduate employment service platform (国家大学生就业服务平台) — NCSS',
      url: 'https://www.ncss.cn',
    },
    {
      title: 'Higher education qualification check (学历查询) — CHSI',
      url: 'https://www.chsi.com.cn/xlcx/index.jsp',
    },
    {
      title: 'Student-origin credit student loan guide (Shenzhen example, 2025) — Shenzhen Education Bureau',
      url: 'https://szeb.sz.gov.cn/home/jyfw/fwxsjz/jyjz/fwxx/content/post_12216899.html',
    },
    {
      title: 'Student loan online service system (学生在线服务系统) — China Development Bank',
      url: 'https://www.csls.cdb.com.cn',
    },
    {
      title: 'National Social Insurance Public Service Platform (国家社会保险公共服务平台)',
      url: 'https://si.12333.gov.cn/osptb/index.html',
    },
    {
      title: 'Regulations on the Management of Housing Provident Fund — gov.cn',
      url: 'https://www.gov.cn/gongbao/content/2019/content_5468861.htm',
    },
  ],
  steps: [
    {
      id: 'employment-agreement',
      title: 'Sign the employment agreement (三方协议 / 就业协议书)',
      offsetDays: -90,
      durationDays: 30,
      dependsOn: [],
      documents: ['Signed employment agreement (就业协议书)'],
      prepare: [
        'Written offer from the employer',
        'Blank agreement from the school\'s career centre, or its online version',
        'Terms on archive and household registration handling, if the employer offers them',
      ],
      conditions: ['Only if you accepted a job offer before graduation'],
      howTo:
        '1. The agreement is signed by the student, the employer and the school; it records the job before the labour contract (劳动合同) is signed.\n2. Many schools now handle it online; the career centre explains the steps and how to cancel (解约) if plans change.\n3. The labour contract signed after starting work is the document that governs the job itself.\n4. Timing depends on the hiring season; this date is an estimate.',
    },
    {
      id: 'loan-confirm',
      title: 'Confirm the student loan before leaving school (毕业确认)',
      offsetDays: -30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Graduation confirmation in the student loan system'],
      prepare: [
        'Login for the loan system (e.g. China Development Bank\'s 学生在线服务系统)',
        'Current phone number and a contact person',
        'Bank card for repayments',
      ],
      conditions: ['Only if you have a national student loan (国家助学贷款)'],
      howTo:
        '1. Before leaving school, graduates with a national student loan confirm their graduation details and repayment plan in the lender\'s online system; the school\'s student aid office sets the deadline.\n2. Up-to-date contact details keep repayment notices from being missed.\n3. Interest is paid by the government while the student is in school.',
    },
    {
      id: 'destination-register',
      title: 'Register the graduation destination (毕业去向登记)',
      offsetDays: -20,
      durationDays: 20,
      dependsOn: [],
      documents: ['Destination registration record'],
      prepare: [
        'Employment agreement or labour contract, if employed',
        'Admission letter, if going on to further study',
        'Address for the personal file (档案) and household registration',
      ],
      howTo:
        '1. From 2023 the employment report certificate (就业报到证) is no longer issued, and the reissue and redirection (改派) procedures for it ended.\n2. Graduates instead register where they are going through the school, recorded in the national destination registration system (dj.ncss.cn).\n3. The diploma and the labour contract (or employment agreement) now serve for hiring, household registration and archive transfer.\n4. The school sets the deadline; this date is an estimate.',
    },
    {
      id: 'leaving-procedures',
      title: 'Complete leaving procedures (离校手续)',
      offsetDays: -10,
      durationDays: 14,
      dependsOn: [],
      documents: ['Leaving clearance form or online record'],
      prepare: [
        'Library books returned and fees paid',
        'Dormitory checked out',
        'Student card returned, if asked',
      ],
      howTo:
        '1. Schools run a clearance process before handing over certificates, often online.\n2. Unpaid fees can hold back the certificates.\n3. Dates are set by the school.',
    },
    {
      id: 'certificates',
      title: 'Collect the graduation and degree certificates (毕业证 / 学位证)',
      offsetDays: 0,
      durationDays: 7,
      dependsOn: ['leaving-procedures'],
      documents: ['Graduation certificate (毕业证书)', 'Degree certificate (学位证书)'],
      prepare: ['Resident ID card', 'Authorisation letter if someone collects them for you'],
      howTo:
        '1. The graduation certificate records the completed programme (学历); the degree certificate records the degree (学位), which has its own requirements.\n2. Lost originals are not reissued; the school can issue a certificate of proof (证明书) instead.\n3. Scan both and keep the originals safe.',
    },
    {
      id: 'party-transfer',
      title: 'Transfer Party membership records (党组织关系转接)',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Party organisation transfer confirmation'],
      prepare: ['Name of the receiving Party organisation', 'Contact at the school\'s Party branch'],
      conditions: ['Only if you are a Party member or probationary member'],
      howTo:
        '1. The school\'s Party branch transfers the membership records to the employer\'s organisation or the local one where you live, usually online.\n2. The branch sets the timing, usually around graduation; this date is an estimate.',
    },
    {
      id: 'chsi-check',
      title: 'Check the records on CHSI (学信网)',
      offsetDays: 60,
      durationDays: 14,
      dependsOn: ['certificates'],
      documents: ['Online verification report for the qualification (学历证书电子注册备案表)', 'Online verification report for the degree'],
      prepare: ['CHSI account (学信档案) linked to the resident ID card'],
      howTo:
        '1. CHSI (chsi.com.cn), run for the Ministry of Education, records the qualification once the school registers the certificate electronically.\n2. The online registration record and verification reports are downloaded from the 学信档案 account, in Chinese or with an English translation, and verified online for free while valid.\n3. Degree records can also be checked there.\n4. Employers and overseas credential checks often ask for these reports.\n5. Registration takes some weeks after graduation; this date is an estimate.',
    },
    {
      id: 'archive-transfer',
      title: 'Have the personal file transferred (档案转递)',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: ['destination-register'],
      documents: ['Archive transfer tracking number or receipt'],
      prepare: [
        'Receiving unit\'s name and address',
        'Receiving agency\'s acceptance terms, if any',
      ],
      howTo:
        '1. The school sends the personal file (档案) by confidential mail (机要) or another official channel; graduates do not usually carry it themselves.\n2. Under the 2022 State Council notice, it goes to the employer for Party and government organs, state-owned enterprises and public institutions, or directed-placement students; otherwise to the public employment and talent service agency (公共就业人才服务机构) where the graduate works or is registered.\n3. Graduates without a job often can leave it at the school for a period; the school sets the terms.\n4. This date is an estimate.',
    },
    {
      id: 'archive-confirm',
      title: 'Confirm the personal file arrived (报到)',
      offsetDays: 90,
      durationDays: 14,
      dependsOn: ['archive-transfer'],
      documents: ['Archive receipt confirmation'],
      prepare: ['Tracking number from the school', 'Resident ID card and graduation certificate'],
      howTo:
        '1. The receiving employer or talent service agency confirms receipt; many cities let you check online or through a government app.\n2. Without the old report certificate, registering with the agency (报到) uses the graduation certificate and the labour contract.\n3. A file that stays lost is hard to rebuild, so the check is worth doing early.',
    },
    {
      id: 'hukou',
      title: 'Move the collective household registration (集体户口迁出)',
      offsetDays: 90,
      durationDays: 45,
      dependsOn: ['certificates'],
      documents: ['Migration certificate (户口迁移证) or cross-province move record', 'New household registration record'],
      prepare: [
        'Graduation certificate',
        'Labour contract, if settling where you work',
        'Resident ID card',
        'Acceptance for settlement (准迁证) from the new place, if needed',
      ],
      conditions: ['Only if your household registration (户口) moved to the school\'s collective household'],
      howTo:
        '1. Students who moved their hukou to the school are on its collective household (集体户口) and move out after graduation.\n2. Graduates can settle where they work, or return to their home registration, using the graduation certificate and the labour contract or employment agreement.\n3. Many places let graduates without a job keep the hukou at the school for a limited time; the school and local police set the deadline.\n4. Cross-province moves can often be handled in one trip at the new place.\n5. This date is an estimate.',
    },
    {
      id: 'social-insurance',
      title: 'Start social insurance with the first employer (社保)',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: [],
      documents: ['Social insurance record showing contributions', 'Social security card (社保卡)'],
      prepare: ['Resident ID card', 'Bank card', 'Labour contract'],
      conditions: ['Only if you start a job with an employer'],
      howTo:
        '1. The employer registers new staff for social insurance (pension, medical, unemployment, work injury and maternity).\n2. Contributions can be checked on the national social insurance platform or a local app.\n3. The job plan covers the first-job steps in more detail.\n4. This date is an estimate based on a start soon after graduation.',
    },
    {
      id: 'housing-fund',
      title: 'Open the housing provident fund account (公积金)',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: [],
      documents: ['Housing provident fund account record'],
      prepare: ['Resident ID card', 'Labour contract'],
      conditions: ['Only if you start a job with an employer'],
      howTo:
        '1. Employers open or transfer a housing provident fund account (住房公积金) for new staff and pay contributions matched by the employee.\n2. The fund can later be used for buying a home or rent, under local rules.\n3. Contributions can be checked with the local housing fund centre.',
    },
    {
      id: 'loan-interest',
      title: 'Pay the first student loan interest',
      offsetDays: 170,
      durationDays: 14,
      dependsOn: ['loan-confirm'],
      documents: ['Repayment record'],
      prepare: ['Bank card or account linked for repayment', 'Amount due from the loan system'],
      conditions: ['Only if you have a national student loan (国家助学贷款)'],
      howTo:
        '1. After graduation the government stops paying the interest, and the graduate pays it.\n2. The grace period (还本宽限期) is up to 5 years, during which only interest is paid.\n3. The lender sets the repayment date each year; check it in the loan system, since this date is an estimate.\n4. Missed payments are reported to the credit reference system (征信).',
    },
    {
      id: 'loan-principal',
      title: 'Start repaying the student loan principal',
      offsetDays: 1825,
      durationDays: 30,
      dependsOn: ['loan-interest'],
      documents: ['Repayment plan'],
      prepare: ['Principal balance', 'Repayment schedule from the loan system'],
      conditions: ['Only if you have a national student loan (国家助学贷款)'],
      howTo:
        '1. Principal repayments begin after the grace period ends; early repayment is allowed.\n2. The loan term is the length of study plus 15 years, up to 22 years.\n3. The due date assumes the full 5-year grace period; set it to the date in the repayment plan.',
    },
  ],
};
