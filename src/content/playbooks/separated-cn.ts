import type { Playbook } from '../../domain/types';

export const separatedCn: Playbook = {
  id: 'separated-cn',
  title: 'Divorce · China',
  summary:
    'Paperwork plan for a divorce in mainland China, counted from the day the joint application is made at a marriage registration office: the agreement, the 30-day cooling-off period, the divorce certificate, and then hukou, property, children, tax, insurance and beneficiaries. A court route is noted for when there is no agreement.',
  region: 'China',
  country: 'CN',
  family: 'separated',
  anchorKind: 'separated',
  ages: { from: 20 },
  conditions: [
    'You are ending a marriage registered in mainland China, and both of you are mainland residents',
    'The dates assume a divorce by registration (协议离婚) with the application made on the plan date; a court divorce follows its own timetable',
    'With a foreign, Hong Kong, Macao or Taiwan spouse, other offices and documents apply',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Marriage Registration Regulations (婚姻登记条例), State Council Decree No. 804 — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/202504/content_7017752.htm',
    },
    {
      title: 'Marriage registration "全国通办" policy Q&A (Ministry of Civil Affairs officials) — Luohu District Civil Affairs Bureau, Shenzhen',
      url: 'https://www.szlh.gov.cn/lhmzj/gkmlpt/content/12/12728/post_12728907.html',
    },
    {
      title: 'Civil Code of the PRC (中华人民共和国民法典) — National People\'s Congress',
      url: 'http://www.npc.gov.cn/npc/c2/c30834/202006/t20200602_306457.html',
    },
    {
      title: 'Civil Code, Book Five: Marriage and Family — Suixi County Government',
      url: 'http://www.suixi.gov.cn/zjsxmzj/gkmlpt/content/1/1977/post_1977586.html',
    },
    {
      title: 'Household Registration Regulations of the PRC (户口登记条例)',
      url: 'http://www.gd.gov.cn/zwgk/wjk/zcfgk/content/post_2531969.html',
    },
    {
      title: 'Interim Measures for Individual Income Tax Special Additional Deductions (国发〔2018〕41号) — State Taxation Administration',
      url: 'https://fgk.chinatax.gov.cn/zcfgk/c102440/c5209858/content.html',
    },
    {
      title: 'Employee medical insurance personal accounts can be used for close relatives — gov.cn',
      url: 'https://www.gov.cn/zhengce/202408/content_6965884.htm',
    },
    {
      title: 'State Taxation Administration',
      url: 'https://www.chinatax.gov.cn/',
    },
  ],
  steps: [
    {
      id: 'agreement',
      title: 'Draw up the divorce agreement (离婚协议书)',
      offsetDays: -30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Divorce agreement signed by both, several copies'],
      prepare: [
        'List of joint property, savings, vehicles and debts',
        'Home deeds and mortgage details',
        'Arrangements for any children: who they live with, support, visits',
      ],
      howTo:
        '1. Divorce by registration needs both to agree to divorce and on the children, property and debts; the agreement sets these out.\n2. The registry checks that it covers children and property; many offices have a template.\n3. Under the Civil Code, a child under 2 generally lives with the mother; for a child of 8 or older, the child\'s own wishes are respected.\n4. Some people have the agreement reviewed by a lawyer or a legal aid centre; the time here is an estimate.',
    },
    {
      id: 'documents',
      title: 'Gather the documents for the registry',
      offsetDays: -7,
      durationDays: 7,
      dependsOn: [],
      documents: ['Resident ID cards, both', 'Marriage certificates (结婚证), both copies'],
      prepare: ['Ask the office about photos, copies and booking'],
      howTo:
        '1. Under the 2025 Marriage Registration Regulations, each side brings a resident ID card and the marriage certificate, plus the signed agreement.\n2. A lost marriage certificate can be reissued first (补领) at a registry.\n3. Offices usually take bookings through the local civil affairs app or mini-program.',
    },
    {
      id: 'apply',
      title: 'Apply together at the marriage registration office',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['agreement', 'documents'],
      documents: ['Application receipt (离婚登记申请受理回执单)'],
      prepare: ['Both of you in person', 'ID cards, marriage certificates and the agreement'],
      howTo:
        '1. Both apply in person at a county-level marriage registration office (婚姻登记处).\n2. Since May 10, 2025, two mainland residents can apply at any registry in the country (全国通办); the certificate is then collected at the same office that took the application.\n3. The office gives a receipt with the date; the cooling-off period counts from it.',
    },
    {
      id: 'cooling-off',
      title: 'Cooling-off period ends (离婚冷静期)',
      offsetDays: 30,
      durationDays: 0,
      dependsOn: ['apply'],
      documents: [],
      prepare: ['Date on the application receipt'],
      howTo:
        '1. Under Civil Code Article 1077, within 30 days of the registry receiving the application, either side can withdraw it.\n2. Withdrawing is done at the same office.\n3. Nothing else is filed in this period.',
    },
    {
      id: 'certificate',
      title: 'Return together for the divorce certificate (离婚证)',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: ['cooling-off'],
      documents: ['Divorce certificate, one each'],
      prepare: ['Both of you in person', 'ID cards, marriage certificates, the agreement and the receipt'],
      howTo:
        '1. Within 30 days after the cooling-off period ends, both return in person to the same office.\n2. If neither goes back within that window, the application is treated as withdrawn and the process starts again.\n3. The office checks the agreement and issues the certificates on the spot; the marriage ends on that date.\n4. The certificate and agreement are needed for most of the steps below.',
    },
    {
      id: 'court',
      title: 'Court divorce (诉讼离婚), if there is no agreement',
      offsetDays: 0,
      durationDays: 0,
      dependsOn: [],
      documents: ['Divorce complaint (起诉状)', 'Effective judgment or mediation document'],
      prepare: ['Marriage certificate', 'Evidence on property, children and grounds', 'Resident ID card'],
      conditions: ['Only if one side does not agree to divorce, or on the terms'],
      howTo:
        '1. The suit is filed at the basic people\'s court, usually where the defendant lives; the court tries mediation first.\n2. Under Civil Code Article 1079, divorce is granted where mutual affection has broken down, e.g. after two years living apart, domestic violence or bigamy; if a divorce is refused and the couple live apart for another year after the judgment, a later suit is granted.\n3. The cooling-off period does not apply to court divorces.\n4. The divorce takes effect when the judgment or mediation document becomes effective; it takes the place of the registry steps above.\n5. Ordinary procedure is set at about 6 months and the simplified procedure 3 months; these are estimates.',
    },
    {
      id: 'hukou',
      title: 'Update the hukou: marital status, splitting or moving it (分户/迁户)',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: ['certificate'],
      documents: ['Updated household register (户口簿)'],
      prepare: ['Divorce certificate', 'Household register', 'Resident ID card', 'Proof of a new home, if moving'],
      conditions: ['Only if the two of you share a household register, or you want to update your marital status there'],
      howTo:
        '1. Marital status on the household register is updated at the local police station.\n2. Someone registered in the other spouse\'s household can move out or set up a separate household (分户); the conditions are local.\n3. Moving the hukou elsewhere follows the receiving city\'s rules.\n4. The time taken is an estimate.',
    },
    {
      id: 'children',
      title: 'Set up child support and custody arrangements',
      offsetDays: 90,
      durationDays: 7,
      dependsOn: ['certificate'],
      documents: ['Agreement or judgment terms on the children'],
      prepare: ['Payment method and dates for support', 'Visit schedule'],
      conditions: ['Only if you have children under 18 or not yet self-supporting'],
      howTo:
        '1. Under the Civil Code, both parents keep their rights and duties toward the children after divorce.\n2. The parent the child does not live with pays support as agreed or ordered; either side can later ask the court to change it.\n3. The parent not living with the child has a right to visit.\n4. A bank transfer with a note keeps a record of each payment.',
    },
    {
      id: 'tax-deductions',
      title: 'Reassign tax deductions for the children (子女教育)',
      offsetDays: 90,
      durationDays: 7,
      dependsOn: ['certificate'],
      documents: ['Updated deduction declaration in the individual income tax app'],
      prepare: ['Children\'s ID numbers', 'Which parent claims, and the share'],
      conditions: ['Only if either of you claims deductions for children or a home loan'],
      howTo:
        '1. The children\'s education and infant care deductions are claimed 100% by one parent or 50% by each.\n2. Mortgage interest and rent deductions also follow who holds the loan or lease after the divorce.\n3. Changes are made in the individual income tax app and confirmed each December for the next year.',
    },
    {
      id: 'medical-sharing',
      title: 'Unlink medical insurance family sharing (医保共济)',
      offsetDays: 90,
      durationDays: 7,
      dependsOn: ['certificate'],
      documents: [],
      prepare: ['Medical insurance app or local medical insurance office'],
      conditions: ['Only if one of you shared an employee medical insurance personal account with the other'],
      howTo:
        '1. Employee medical insurance personal accounts can be shared with close relatives (家庭共济), linked through the medical insurance app.\n2. A former spouse is no longer a close relative; the link is removed in the same app.',
    },
    {
      id: 'property',
      title: 'Transfer the home and other registered property',
      offsetDays: 120,
      durationDays: 30,
      dependsOn: ['certificate'],
      documents: ['New real estate certificate (不动产权证书)', 'Vehicle registration, if a car moves'],
      prepare: ['Divorce certificate', 'Divorce agreement or effective judgment', 'Current real estate certificate', 'ID cards'],
      conditions: ['Only if a home, car or other registered property changes hands'],
      howTo:
        '1. Real estate is re-registered at the local real estate registration centre (不动产登记中心), using the certificate and the agreement or judgment.\n2. Under a 2021 Ministry of Finance and State Taxation Administration announcement, a change in home ownership from splitting joint property on divorce is exempt from deed tax.\n3. Vehicles are transferred at the vehicle management office (车管所).\n4. The time taken is an estimate.',
    },
    {
      id: 'mortgage',
      title: 'Change the mortgage or provident fund loan',
      offsetDays: 120,
      durationDays: 60,
      dependsOn: ['certificate'],
      documents: ['Lender\'s written consent or new loan contract'],
      prepare: ['Loan contract', 'Divorce agreement', 'Income proof of the person keeping the loan'],
      conditions: ['Only if there is a bank mortgage or housing provident fund loan on a shared home'],
      howTo:
        '1. The divorce agreement does not change the loan contract; the lender decides whether to remove a borrower or change the loan.\n2. Provident fund loans are handled by the local fund centre, bank loans by the bank.\n3. The time taken is an estimate.',
    },
    {
      id: 'beneficiaries',
      title: 'Update the will, beneficiaries and emergency contacts',
      offsetDays: 120,
      durationDays: 14,
      dependsOn: ['certificate'],
      documents: ['Updated will or insurance beneficiary forms'],
      prepare: ['Life insurance policies', 'Existing will', 'Bank and securities accounts'],
      howTo:
        '1. After divorce, a former spouse is no longer a statutory heir under the Civil Code.\n2. A named beneficiary on an insurance policy stays until changed with the insurer.\n3. Employers, schools and banks may hold a former spouse as an emergency contact.',
    },
  ],
};
