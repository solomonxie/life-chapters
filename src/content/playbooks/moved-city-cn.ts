import type { Playbook } from '../../domain/types';

export const movedCityCn: Playbook = {
  id: 'moved-city-cn',
  title: 'Moving home · China',
  summary:
    'Paperwork plan for moving to a new home in a mainland Chinese city, within the same province or from another one: lease, residence registration and permit, hukou, social insurance, provident fund, school and driving. National rules; local offices set the details.',
  region: 'China',
  country: 'CN',
  family: 'moved-city',
  anchorKind: 'moved-city',
  conditions: [
    'For a Chinese citizen moving to a new home in a mainland Chinese city, from the same province or another one',
    'Some steps apply only to people whose hukou (户口) stays elsewhere, renters, employees, drivers or families with children',
    'The moving day is the anchor date; cities publish their own lists and deadlines',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Social Insurance Law of the PRC — State Taxation Administration law library',
      url: 'https://fgk.chinatax.gov.cn/zcfgk/c100009/c5192937/content.html',
    },
    {
      title: 'National Social Insurance Public Service Platform (国家社会保险公共服务平台)',
      url: 'https://si.12333.gov.cn/osptb/index.html',
    },
    {
      title: 'National Healthcare Security Administration',
      url: 'https://www.nhsa.gov.cn/',
    },
    {
      title: 'Housing Provident Fund Regulations (住房公积金管理条例), as amended in 2026 — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/202608/content_7078478.htm',
    },
    {
      title: 'Housing Provident Fund Regulations, consolidated text — Ministry of Justice regulations database',
      url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1822',
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
      title: '市教委关于2026年上海市义务教育阶段学校招生入学工作的实施意见 (Shanghai enrollment 2026) — Shanghai Municipal Government (example)',
      url: 'https://www.shanghai.gov.cn/nw12344/20260326/6869dfccd29f4d88966a526eb4252b47.html',
    },
  ],
  steps: [
    {
      id: 'lease',
      title: 'Sign the rental contract (租赁合同) or complete the purchase',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Rental contract (租赁合同)', 'Deposit receipt'],
      prepare: [
        'See the landlord\'s property certificate (房产证 or 不动产权证书) and ID',
        'If renting through an agent, check the agent\'s business licence',
        'Note the rent, deposit (押金), payment cycle and who pays utilities and property fees',
      ],
      howTo:
        '1. The contract is signed with the owner or someone the owner has authorized in writing.\n2. A contract that can be registered (备案) later, and landlord papers that match it, are what the residence registration, residence permit and school steps usually ask for.\n3. For a purchase, the property certificate in your name plays the same role.',
    },
    {
      id: 'utilities',
      title: 'Transfer the water, electricity and gas accounts (水电燃气过户)',
      offsetDays: -3,
      durationDays: 7,
      dependsOn: ['lease'],
      documents: ['Utility account numbers'],
      prepare: ['Meter readings on handover day', 'Account numbers from the landlord or seller', 'Pay any arrears before the handover'],
      howTo:
        '1. Electricity is usually handled through the State Grid app (网上国网) or the local grid company; water and gas through the city\'s providers.\n2. For a rental, the accounts often stay in the owner\'s name; the meter readings on handover day settle who pays what.\n3. Broadband is set up with the operator; the building may limit which ones.',
    },
    {
      id: 'residence-registration',
      title: 'Register the new address with the local police (居住登记)',
      offsetDays: 7,
      durationDays: 7,
      dependsOn: ['lease'],
      documents: ['Residence registration certificate (居住登记凭证)'],
      prepare: ['Resident ID card', 'Rental contract or property certificate', 'Proof of work or study, if the city asks'],
      howTo:
        '1. People living away from their hukou (户口) address register where they live at the local police station (派出所) or a community service point; many cities also take it online.\n2. The deadline and paperwork are set by each city; the week here is an estimate.\n3. The registration date is often what starts the 6-month count toward a residence permit.\n4. Some landlords or hotels register tenants themselves; ask whether that has been done.',
      conditions: ['Only if your hukou (户口) is not in the new city'],
    },
    {
      id: 'lease-filing',
      title: 'Register the rental contract (租赁合同备案)',
      offsetDays: 30,
      durationDays: 21,
      dependsOn: ['lease'],
      documents: ['Rental contract registration certificate (租赁备案证明)'],
      prepare: ['Signed rental contract', 'Landlord\'s property certificate and ID', 'Tenant\'s ID card'],
      howTo:
        '1. Rental contracts are registered (备案) with the local housing authority (住房和城乡建设部门), often online through the city\'s rental platform (网签备案).\n2. Landlords or agents usually file it; tenants can often file too.\n3. The registration certificate is often asked for by the residence permit, provident fund rent withdrawal and school applications.\n4. The deadline is set locally; the timing here is an estimate.',
      conditions: ['Only if you rent'],
    },
    {
      id: 'driving',
      title: 'Update the address with the traffic police (交管12123)',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ['交管12123 app sign-in', 'Driving licence number', 'Vehicle plate number, if you own a car'],
      howTo:
        '1. Under MPS Order 162, a driver whose phone number or address changes files it (备案) with the vehicle management office that issued the licence within 30 days.\n2. The 交管12123 app handles this online.\n3. A driver whose hukou moves out of the issuing area applies for a new licence (换证) at the new area\'s office; one living outside it can apply to the local office.\n4. A car\'s registration details are updated through the same app.',
      conditions: ['Only if you drive or own a vehicle'],
    },
    {
      id: 'bank-phone',
      title: 'Update the address with banks, the phone operator and the tax app',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['Bank apps', 'Phone operator app', 'Individual income tax app (个人所得税)', 'Insurance policies'],
      howTo:
        '1. Banks keep a current address for account records; most update it in their app.\n2. The phone number itself moves with you, but some operators handle bills or broadband by city.\n3. In the individual income tax app, the address and the employer (任职受雇信息) are updated so deductions such as rent go to the right place.',
    },
    {
      id: 'social-insurance',
      title: 'Transfer the pension insurance record (养老保险关系转移接续)',
      offsetDays: 45,
      durationDays: 45,
      dependsOn: [],
      documents: ['Transfer application', 'Participation certificate (参保缴费凭证)'],
      prepare: [
        'Social security card (社保卡)',
        'Check the new employer has enrolled you in the new city',
        'National Social Insurance Public Service Platform (国家社会保险公共服务平台) or the 掌上12333 app',
      ],
      howTo:
        '1. Under the Social Insurance Law, basic pension insurance follows the worker across regions and years paid are added together.\n2. After the new city\'s account is opened, the transfer is requested online through the national platform or the 掌上12333 app, or at the new city\'s social insurance office.\n3. The offices exchange the record between themselves; the 45 days is an estimate.\n4. Within the same province, many areas handle transfers inside one provincial system.',
      conditions: ['Only if you work in the new city and paid social insurance (社保) in another city'],
    },
    {
      id: 'medical-insurance',
      title: 'Transfer the medical insurance (医保关系转移接续)',
      offsetDays: 45,
      durationDays: 30,
      dependsOn: [],
      documents: ['Transfer application'],
      prepare: ['National medical insurance app (国家医保服务平台)', 'Social security card or ID card', 'Or a cross-region medical treatment filing (异地就医备案), if staying on the old city\'s plan'],
      howTo:
        '1. Basic medical insurance can be transferred between cities; the request is made online through the national medical insurance app or at the local medical insurance office.\n2. Years paid carry over; some cities add a short wait before new benefits start, so ask about any gap.\n3. For anyone keeping the old city\'s plan for a while, a cross-region treatment filing (异地就医备案) lets hospital bills in the new city settle directly.',
      conditions: ['Only if you had medical insurance (医保) in another city'],
    },
    {
      id: 'provident-fund',
      title: 'Transfer the housing provident fund (住房公积金转移接续)',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: [],
      documents: ['Transfer application'],
      prepare: ['Check the new employer has opened a fund account', 'Old fund centre and account number', 'The national housing provident fund mini-program, or the new city\'s fund centre'],
      howTo:
        '1. Under the Housing Provident Fund Regulations, an employee who changes employer has the account transferred.\n2. Between cities, the transfer is requested at the new city\'s fund centre or online through the national service, and the balance moves over.\n3. Some cities count months paid elsewhere toward their loan rules; ask the new centre.\n4. The 30 days is an estimate.',
      conditions: ['Only if you work in the new city and paid into a housing provident fund in another city'],
    },
    {
      id: 'school',
      title: 'Check the school enrolment rules for the new address',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: ['residence-registration'],
      documents: ['Residence permit (居住证) or property certificate (房产证)', 'Household register (户口簿)'],
      prepare: [
        'The district education bureau\'s enrolment notice (招生入学实施意见)',
        'Months of social insurance paid in this city',
        'Rental contract registration, if renting',
      ],
      howTo:
        '1. Children with a local hukou usually enrol by the household register and home address; children without one (随迁子女) usually by a residence permit, plus proof of work and home.\n2. Shanghai (example, 2026): the child holds a Shanghai residence permit or residence registration, and one parent a residence permit with 6 months of city social insurance within a year.\n3. Applications open once a year, usually in spring; check the dates early, since the residence permit takes half a year.\n4. The School years · primary · China plan has the enrolment steps.',
      conditions: ['Only if you have children of kindergarten or school age'],
    },
    {
      id: 'residence-permit',
      title: 'Apply for the residence permit (居住证)',
      offsetDays: 190,
      durationDays: 30,
      dependsOn: ['residence-registration'],
      documents: ['Residence permit (居住证)'],
      prepare: [
        'Resident ID card',
        'Proof of home: registered rental contract or property certificate',
        'Proof of a stable job, business or studies, such as a labour contract or social insurance record',
        'Photo, if the office asks',
      ],
      howTo:
        '1. A residence permit generally follows at least half a year of living in the city with a stable job, home or studies.\n2. It is applied for at the local police station or a service point the police appoint; many cities take it online.\n3. Holders get local public services such as compulsory education for children, employment services and some exit-entry and driving services.\n4. The permit is endorsed (签注) each year to stay valid.',
      conditions: ['Only if your hukou (户口) is not in the new city'],
    },
    {
      id: 'hukou',
      title: 'Check whether the hukou can move (户口迁移)',
      offsetDays: 200,
      durationDays: 60,
      dependsOn: [],
      documents: ['Household register (户口簿)', 'New resident ID card'],
      prepare: [
        'The new city\'s settlement (落户) conditions: home ownership, job and social insurance years, education or points',
        'Property certificate, labour contract or social insurance record',
        'Check what else changes with the hukou, such as school places and pension collection',
      ],
      howTo:
        '1. Most smaller cities have eased or removed limits on moving a hukou in; large cities use conditions such as years of social insurance or points (积分落户).\n2. Moving within the same city, a hukou can often follow a home the family owns.\n3. Many cities now handle the move-out and move-in in one place (跨省通办); ask the new police station.\n4. The ID card address follows the hukou, so a new ID card is applied for after the move.\n5. The timing here is an estimate.',
      conditions: ['Only if you want to move your hukou (户口) and meet the new city\'s conditions'],
    },
  ],
};
