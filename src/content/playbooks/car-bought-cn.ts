import type { Playbook } from '../../domain/types';

export const carBoughtCn: Playbook = {
  id: 'car-bought-cn',
  title: 'Buying a car · China',
  summary:
    'Paperwork plan for buying a private car in mainland China, from a plate quota and trade-in subsidy to purchase tax, insurance, registration, inspections and licence points.',
  region: 'China',
  country: 'CN',
  family: 'car-bought',
  anchorKind: 'car-bought',
  ages: { from: 18 },
  conditions: [
    'You are buying a private passenger car in mainland China; the event date is the purchase or delivery date',
    'Plate quotas, subsidies and fees are set city by city; check the local traffic police and commerce bureau',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Announcement on continuing and optimising the NEV vehicle purchase tax reduction (财政部 税务总局 工业和信息化部公告2023年第10号) — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/202306/content_6887734.htm',
    },
    {
      title: 'Tax policy library (车辆购置税法, 车船税法) — State Taxation Administration',
      url: 'https://fgk.chinatax.gov.cn/',
    },
    {
      title: 'Traffic Safety Integrated Service Platform (交管12123) — Ministry of Public Security',
      url: 'https://www.122.gov.cn/',
    },
    {
      title: 'Civil Code of the PRC (中华人民共和国民法典) — National People\'s Congress',
      url: 'http://www.npc.gov.cn/npc/c2/c30834/202006/t20200602_306457.html',
    },
  ],
  steps: [
    {
      id: 'quota',
      title: 'Get a plate quota in a quota city (摇号, 竞拍, 新能源指标)',
      offsetDays: -180,
      durationDays: 90,
      dependsOn: [],
      documents: ['Vehicle quota certificate (指标确认通知书)'],
      prepare: ['Resident ID card', 'Hukou, or residence permit and months of local social insurance or tax', 'Driving licence'],
      conditions: ['Only if you live in a city that limits new plates (e.g. Beijing, Shanghai, Guangzhou, Shenzhen, Hangzhou, Tianjin)'],
      howTo:
        '1. Some large cities limit plates: Beijing uses a lottery (摇号) with a separate new-energy queue, Shanghai auctions plates for fuel cars (竞拍), others mix lottery and auction.\n2. New-energy cars often get plates more easily, but rules change; check current.\n3. Applicants without local hukou usually show a residence permit and continuous local social insurance or tax.\n4. A quota is valid for a limited time; the time here is an estimate and a lottery can take years.',
    },
    {
      id: 'trade-in',
      title: 'Check the scrappage or trade-in subsidy (以旧换新)',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Scrappage certificate (报废机动车回收证明) or used-car sale invoice', 'Subsidy application'],
      prepare: ['Old car\'s registration certificate and ID card', 'New car invoice once bought'],
      conditions: ['Only if you are scrapping or selling an old car in your name'],
      howTo:
        '1. National and local trade-in programmes pay a subsidy for scrapping an old car or replacing it with a new one.\n2. Applications go through the national car trade-in platform (汽车以旧换新 platform, in the commerce ministry app) or the local one.\n3. The amounts, eligible cars and deadlines are set each year and budgets can run out; check current.',
    },
    {
      id: 'invoice',
      title: 'Collect the sales invoice and vehicle papers',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: [],
      documents: ['Unified motor vehicle sales invoice (机动车销售统一发票)', 'Certificate of conformity (合格证)', 'Warranty and manual'],
      prepare: ['Resident ID card', 'Purchase contract'],
      howTo:
        '1. The dealer issues the unified sales invoice in the buyer\'s name; it is used for purchase tax, registration and any subsidy.\n2. Check the VIN on the invoice, certificate and car match.',
    },
    {
      id: 'insurance',
      title: 'Buy compulsory traffic insurance and pay vehicle tax (交强险, 车船税)',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: [],
      documents: ['Compulsory traffic accident insurance policy (交强险)', 'Commercial insurance policy, if bought', 'Vehicle and vessel tax receipt (车船税)'],
      prepare: ['Resident ID card', 'Sales invoice', 'Certificate of conformity'],
      howTo:
        '1. Compulsory traffic accident liability insurance (交强险) is bought before the car is registered or driven.\n2. Commercial insurance (third-party, own damage) is optional and priced by the insurer.\n3. The insurer collects the yearly vehicle and vessel tax (车船税) with 交强险; new-energy cars are exempt or reduced.\n4. Both renew yearly.',
    },
    {
      id: 'purchase-tax',
      title: 'Pay vehicle purchase tax (车辆购置税)',
      offsetDays: 7,
      durationDays: 3,
      dependsOn: ['invoice'],
      documents: ['Purchase tax payment record'],
      prepare: ['Sales invoice', 'Certificate of conformity', 'Resident ID card'],
      howTo:
        '1. Purchase tax is 10% of the price excluding VAT, declared within 60 days of buying; dealers often file it for the buyer.\n2. New-energy cars bought in 2024–2025 were exempt up to 30,000 yuan per car; those bought in 2026–2027 pay half, with the reduction capped at 15,000 yuan per car.\n3. Only models on the government\'s eligible list qualify.\n4. The tax is paid before registration.',
    },
    {
      id: 'loan',
      title: 'Sign the car loan and register the mortgage on the car',
      offsetDays: 14,
      durationDays: 3,
      dependsOn: [],
      documents: ['Car loan contract', 'Mortgage registration on the vehicle (抵押登记)'],
      prepare: ['Resident ID card', 'Income proof', 'Credit report'],
      conditions: ['Only if you are borrowing to buy'],
      howTo:
        '1. The lender records a mortgage on the car at the vehicle office, usually at or right after registration.\n2. After the last payment, the lender gives the release papers and the mortgage is cancelled (解除抵押) at the vehicle office or through 12123.',
    },
    {
      id: 'registration',
      title: 'Register the car and get plates (上牌)',
      offsetDays: 14,
      durationDays: 3,
      dependsOn: ['invoice', 'insurance', 'purchase-tax'],
      documents: ['Motor vehicle registration certificate (机动车登记证书)', 'Vehicle licence (行驶证)', 'Number plates'],
      prepare: ['Resident ID card, or residence permit if not local', 'Sales invoice', 'Certificate of conformity', '交强险 policy', 'Purchase tax record', 'Plate quota, in a quota city'],
      howTo:
        '1. Registration is done at the vehicle management office (车管所) or a dealer service point; many cities allow choosing a number in the 交管12123 app.\n2. Most new cars skip a pre-registration inspection.\n3. Temporary plates (临时号牌) cover driving before registration, for a limited time.\n4. New-energy cars get green plates.',
    },
    {
      id: 'etc',
      title: 'Set up an ETC tag for tolls',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: ['registration'],
      documents: ['ETC device and account'],
      prepare: ['Vehicle licence', 'Resident ID card', 'Bank card'],
      conditions: ['Only if you use toll expressways'],
      howTo:
        '1. ETC (电子不停车收费) is issued by banks or the provincial expressway operator, often free.\n2. Toll discounts for ETC vary by province.',
    },
    {
      id: 'charger',
      title: 'Install a home charger (充电桩)',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Property management consent', 'Power company approval'],
      prepare: ['Parking space ownership or lease', 'Car purchase papers'],
      conditions: ['Only if the car is electric or plug-in hybrid and you have a fixed parking space'],
      howTo:
        '1. The property management company (物业) usually confirms the space and wiring; the local grid company handles the meter.\n2. Carmakers often include installation.\n3. The time taken is an estimate.',
    },
    {
      id: 'points',
      title: 'Check licence points at the end of the scoring cycle (记分周期)',
      offsetDays: 365,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['交管12123 app'],
      howTo:
        '1. Each driving licence has 12 points per 12-month cycle, counted from the licence\'s first issue date.\n2. Violations and fines show in the 交管12123 app; unpaid fines can block inspection.\n3. Reaching 12 points leads to study and a test.\n4. It repeats yearly.',
    },
    {
      id: 'inspection',
      title: 'Get the inspection sticker or book an inspection (年检)',
      offsetDays: 730,
      durationDays: 14,
      dependsOn: [],
      documents: ['Inspection mark (检验标志), electronic'],
      prepare: ['Vehicle licence', 'Current 交强险', 'All traffic fines settled'],
      howTo:
        '1. For a private car with up to 9 seats, the current pattern is: in-person inspection exempt in years 2, 4 and 8, with the mark applied for online in 12123; in-person inspection in years 6 and 10; then yearly after 10 years, and twice a year after 15 (check current).\n2. It can be done within 3 months before the due date.\n3. It repeats on that cycle.',
    },
  ],
};
