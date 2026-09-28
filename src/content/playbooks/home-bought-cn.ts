import type { Playbook } from '../../domain/types';

export const homeBoughtCn: Playbook = {
  id: 'home-bought-cn',
  title: 'Buying a home · China',
  summary:
    'Paperwork plan for buying a home in mainland China, from purchase eligibility and the online-signed contract to the down payment, mortgage, deed tax, property registration, handover and moving in.',
  region: 'China',
  country: 'CN',
  family: 'home-bought',
  anchorKind: 'home-bought',
  ages: { from: 18 },
  conditions: [
    'You are buying a home in mainland China; the event date is the handover or registration date',
    'The steps are for a mainland resident; buyers from Hong Kong, Macao, Taiwan or abroad face other rules on eligibility and payment',
    'Purchase limits, loan terms and fees are set city by city; check the local housing and urban-rural development bureau (住建局)',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Interim Regulations on Real Estate Registration (不动产登记暂行条例) — gov.cn',
      url: 'https://www.gov.cn/zhengce/content/2014-12/22/content_9325.htm',
    },
    {
      title: 'Housing Provident Fund Regulations (住房公积金管理条例), as amended in 2026 — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/202608/content_7078478.htm',
    },
    {
      title: 'Interim Measures for Individual Income Tax Special Additional Deductions (国发〔2018〕41号) — State Taxation Administration',
      url: 'https://fgk.chinatax.gov.cn/zcfgk/c102440/c5209858/content.html',
    },
    {
      title: 'Household Registration Regulations of the PRC (户口登记条例)',
      url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1822',
    },
    {
      title: 'Tax policy library (契税 deed tax rules) — State Taxation Administration',
      url: 'https://fgk.chinatax.gov.cn/',
    },
    {
      title: 'Civil Code of the PRC (中华人民共和国民法典) — National People\'s Congress',
      url: 'http://www.npc.gov.cn/npc/c2/c30834/202006/t20200602_306457.html',
    },
  ],
  steps: [
    {
      id: 'eligibility',
      title: 'Check purchase eligibility in the city',
      offsetDays: -90,
      durationDays: 14,
      dependsOn: [],
      documents: ['Purchase eligibility confirmation (购房资格)'],
      prepare: [
        'Resident ID card and hukou book',
        'Marriage certificate, if married',
        'Social insurance or tax records in the city, if you have no local hukou',
      ],
      howTo:
        '1. Purchase eligibility (购房资格) is set by each city; many cities have relaxed or ended purchase limits (限购) since 2024, while some core districts of the largest cities still count homes per family and ask non-locals for months of local social insurance or tax.\n2. The check is usually done through the local housing bureau (住建局) portal or by the developer or agent.\n3. The family counted is usually you, your spouse and minor children.\n4. Check the current local rule; it changes often.',
    },
    {
      id: 'loan-plan',
      title: 'Plan the down payment and choose the loan type',
      offsetDays: -80,
      durationDays: 14,
      conditions: ['Only if you are borrowing to buy'],
      dependsOn: [],
      documents: ['Credit report (个人征信报告)', 'Housing provident fund account statement'],
      prepare: [
        'Bank statements and income proof',
        'Housing provident fund balance and contribution history',
        'Ask the local fund centre (公积金中心) about loan limits',
      ],
      howTo:
        '1. Loans are a commercial loan (商业贷款), a housing provident fund loan (公积金贷款) at a lower rate, or a combined loan (组合贷款).\n2. The minimum down payment (首付) is set nationally and locally, and differs for a first and second home; check the current ratio in your city.\n3. Provident fund loan limits depend on your balance, contribution years and the city cap.\n4. Not financial advice; the date here is only a prompt.',
    },
    {
      id: 'deposit',
      title: 'Sign the reservation and pay the earnest money',
      offsetDays: -60,
      durationDays: 3,
      dependsOn: ['eligibility'],
      documents: ['Reservation agreement (认购书) or intention agreement', 'Earnest money receipt (定金收据)'],
      prepare: ['Resident ID card', 'The unit or home details and price'],
      howTo:
        '1. A reservation agreement (认购书) with a developer, or an intention agreement through an agent for a resale home, holds the home before the formal contract.\n2. Earnest money (定金) is usually lost if the buyer backs out, and returned double if the seller does; read the terms.\n3. Check the developer\'s pre-sale permit (商品房预售许可证) or, for a resale home, the seller\'s property certificate and any mortgage on it.',
    },
    {
      id: 'contract',
      title: 'Sign the purchase contract online (网签)',
      offsetDays: -55,
      durationDays: 3,
      dependsOn: ['deposit'],
      documents: ['Online-signed purchase contract (网签合同)'],
      prepare: ['Resident ID cards for all buyers', 'Purchase eligibility confirmation', 'Names to go on the title'],
      howTo:
        '1. The purchase contract is signed and filed on the local housing bureau\'s online system (网签备案); this stops the same home being sold twice.\n2. New homes use the standard commodity housing sale contract; resale homes use the local resale contract.\n3. The contract sets the price, payment method, handover date and what happens if either side is late.\n4. Many cities hold the buyer\'s funds in a supervised account (资金监管) until registration.',
    },
    {
      id: 'down-payment',
      title: 'Pay the down payment (首付)',
      offsetDays: -50,
      durationDays: 3,
      dependsOn: ['contract'],
      documents: ['Down payment receipt'],
      prepare: ['Funds in your own bank account', 'Keep the transfer records'],
      howTo:
        '1. The down payment goes to the developer or into the supervised account named in the contract.\n2. Banks check the source of the down payment; borrowed money for it may not be accepted.\n3. Some cities allow provident fund withdrawals toward the down payment; ask the local fund centre.',
    },
    {
      id: 'maintenance-fund',
      title: 'Pay the special maintenance fund',
      offsetDays: -45,
      durationDays: 7,
      conditions: ['Only if you bought a new home, or the resale home has no fund yet'],
      dependsOn: ['contract'],
      documents: ['Maintenance fund receipt (维修基金缴存凭证)'],
      prepare: ['The floor area in the contract', 'Ask the local rate per square metre'],
      howTo:
        '1. The residential special maintenance fund (住宅专项维修资金) pays for major repairs to shared parts of the building, such as roofs, lifts and pipes.\n2. It is paid by the buyer of a new home, by area or as a share of the price; the rate is set locally.\n3. Proof of payment is usually needed before handover or registration.',
    },
    {
      id: 'loan',
      title: 'Apply for the mortgage',
      offsetDays: -15,
      durationDays: 30,
      conditions: ['Only if you are borrowing to buy'],
      dependsOn: ['down-payment', 'loan-plan'],
      documents: ['Loan contract (借款合同)', 'Mortgage contract (抵押合同)'],
      prepare: [
        'Resident ID cards and marriage certificate',
        'Income proof and bank statements',
        'The online-signed purchase contract and down payment receipt',
      ],
      howTo:
        '1. The bank, or the fund centre for a provident fund loan, reviews the application and signs the loan and mortgage contracts.\n2. Fund centres decide on a loan within 10 days of accepting the application under the 2026 amended regulations; banks set their own times.\n3. The loan is released after the mortgage is registered or a pre-registration (预告登记) is made.\n4. The 30 days is an estimate.',
    },
    {
      id: 'deed-tax',
      title: 'Pay the deed tax (契税)',
      offsetDays: -3,
      durationDays: 2,
      dependsOn: ['contract'],
      documents: ['Deed tax payment receipt (完税凭证)'],
      prepare: ['Purchase contract and invoice', 'Proof of how many homes the family owns', 'Check the current rates'],
      howTo:
        '1. The buyer pays deed tax (契税) before the property is registered; many cities handle it in the same hall as registration.\n2. From December 1, 2024, for a family\'s only home: 1% for 140 square metres or less, 1.5% above; for a second home: 1% for 140 square metres or less, 2% above. Beijing, Shanghai, Guangzhou and Shenzhen may follow these rates for second homes once they drop the ordinary-housing standard. Check the current rule.\n3. Without these reliefs the rate is set by each province within 3% to 5%.\n4. For a resale home the seller may also owe VAT and income tax; the contract says who pays.',
    },
    {
      id: 'registration',
      title: 'Register the property and collect the property certificate',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['deed-tax', 'maintenance-fund'],
      documents: ['Real estate title certificate (不动产权证书)'],
      prepare: [
        'Resident ID cards for all buyers',
        'Purchase contract, deed tax receipt and maintenance fund receipt',
        'Bank mortgage documents, if borrowing',
      ],
      howTo:
        '1. Property is registered at the local real estate registration centre (不动产登记中心); ownership passes on registration, not on payment.\n2. For a resale home, transfer registration (转移登记) and mortgage registration are often done the same day, and many cities offer it online.\n3. For a new home, the developer first registers the building; buyers\' certificates can follow months after handover. Move this date to match.\n4. The registration centre issues the real estate title certificate (不动产权证书); with a mortgage the bank may hold the mortgage certificate.',
    },
    {
      id: 'handover',
      title: 'Inspect the home and take the keys',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['down-payment'],
      documents: ['Handover confirmation (交房确认书)', 'Residential quality warranty and user manual (住宅质量保证书, 住宅使用说明书)'],
      prepare: [
        'Tools or an inspector for the handover check (验房)',
        'The contract\'s area and fittings list',
        'Meter readings for water, power and gas',
      ],
      howTo:
        '1. At handover (交房) the buyer inspects the home (验房): walls, windows, water, power, drainage and measured area against the contract.\n2. Defects are written on the handover form for the developer to fix; the developer\'s warranty periods are set in the residential quality warranty (住宅质量保证书).\n3. For a new home, the developer shows the completion acceptance filing (竣工验收备案) before handover.\n4. For a resale home, the seller settles utilities and property fees up to the handover date.',
    },
    {
      id: 'property-mgmt',
      title: 'Sign up with the property management company',
      offsetDays: 7,
      durationDays: 7,
      dependsOn: ['handover'],
      documents: ['Property service contract (物业服务合同)', 'Management rules (管理规约)'],
      prepare: ['Resident ID card', 'Ask the property fee rate and what it covers'],
      howTo:
        '1. The property management company (物业) runs shared areas, security and repairs; its fee is usually charged by floor area.\n2. For new homes, a preliminary property contract signed by the developer binds buyers until an owners\' committee (业主委员会) chooses otherwise.\n3. Register access cards, parking and renovation plans here.',
    },
    {
      id: 'utilities',
      title: 'Transfer water, power, gas and internet into your name',
      offsetDays: 14,
      durationDays: 14,
      dependsOn: ['handover'],
      documents: [],
      prepare: ['Real estate title certificate or purchase contract', 'Resident ID card', 'Account numbers and meter readings'],
      howTo:
        '1. Water, power and gas accounts are transferred (过户) at each supplier\'s office or online; many cities combine them with property registration (水电气联动过户).\n2. Settle the seller\'s balances first for a resale home.\n3. Internet and TV are signed up directly with a provider.',
    },
    {
      id: 'hpf-withdrawal',
      title: 'Withdraw the housing provident fund for the purchase',
      offsetDays: 30,
      durationDays: 14,
      conditions: ['Only if you or your spouse pay into a housing provident fund'],
      dependsOn: ['contract'],
      documents: ['Withdrawal approval'],
      prepare: ['Purchase contract, invoice or title certificate', 'Marriage certificate, for a spouse\'s withdrawal', 'Bank card in your name'],
      howTo:
        '1. The provident fund (住房公积金) can be withdrawn to buy or build a home, or to repay the loan on it.\n2. Fund centres decide on a withdrawal within 3 days of accepting the application under the 2026 amended regulations.\n3. Whether a spouse or parents can withdraw for the same home, and time limits after the purchase, are set by the local centre.\n4. Many centres offer the withdrawal in an app or online.',
    },
    {
      id: 'tax-deduction',
      title: 'Claim the housing loan interest deduction',
      offsetDays: 30,
      durationDays: 7,
      conditions: ['Only if the home is your first home bought with a loan'],
      dependsOn: ['loan'],
      documents: ['Loan contract'],
      prepare: ['The 个人所得税 app', 'Loan contract number and bank'],
      howTo:
        '1. Interest on a first-home loan can be claimed as a special additional deduction (住房贷款利息专项附加扣除), up to 1,000 yuan a month for up to 240 months.\n2. A couple agrees which one of them claims it; the choice cannot change within a tax year.\n3. Claim it in the 个人所得税 app through your employer or at the annual reconciliation.\n4. Housing rent and housing loan interest cannot both be claimed for the same months.',
    },
    {
      id: 'hukou',
      title: 'Move your hukou to the new home',
      offsetDays: 60,
      durationDays: 30,
      conditions: ['Only if you want your hukou at the new address'],
      dependsOn: ['registration'],
      documents: ['Real estate title certificate', 'Resident ID card', 'Hukou book'],
      prepare: ['Ask the local police station (派出所) about moving hukou by home purchase (购房落户)'],
      howTo:
        '1. Owning a home does not move your hukou; moving it is optional.\n2. Many cities now let owners move hukou by home purchase; some set limits on area, time lived there or social insurance.\n3. Apply at the police station for the new address, or online where offered; the 30 days is an estimate.\n4. Hukou can matter for school places; check the local school district rules.',
    },
  ],
};
