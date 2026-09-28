import type { Playbook } from '../../domain/types';

export const homeSoldCn: Playbook = {
  id: 'home-sold-cn',
  title: 'Selling a home · China',
  summary:
    'Paperwork plan for selling a home in mainland China, from ownership papers and the mortgage to the online-signed contract, supervised funds, seller taxes, the title transfer, handover and a possible tax refund on buying again.',
  region: 'China',
  country: 'CN',
  family: 'home-sold',
  anchorKind: 'home-sold',
  ages: { from: 18 },
  conditions: [
    'You are selling a home in mainland China; the event date is the title transfer (过户) date',
    'The steps are for an individual seller of a residential home',
    'Taxes, fees and transfer procedures are set nationally and city by city; check the local housing bureau (住建局) and tax office',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Interim Regulations on Real Estate Registration (不动产登记暂行条例) — gov.cn',
      url: 'https://www.gov.cn/zhengce/content/2014-12/22/content_9325.htm',
    },
    {
      title: 'Tax policy library (individual income tax, VAT and 换购住房 refund rules) — State Taxation Administration',
      url: 'https://fgk.chinatax.gov.cn/',
    },
    {
      title: 'Interim Measures for Special Additional Deductions of Individual Income Tax (2018) — gov.cn',
      url: 'https://www.gov.cn/zhengce/content/2018-12/22/content_5351181.htm',
    },
    {
      title: 'Civil Code of the PRC (中华人民共和国民法典) — National People\'s Congress',
      url: 'http://www.npc.gov.cn/npc/c2/c30834/202006/t20200602_306457.html',
    },
    {
      title: 'Household Registration Regulations of the PRC (户口登记条例)',
      url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1822',
    },
  ],
  steps: [
    {
      id: 'ownership',
      title: 'Gather ownership papers and co-owner consent',
      offsetDays: -90,
      durationDays: 14,
      dependsOn: [],
      documents: ['Real estate title certificate (不动产权证书)', 'Original purchase contract and invoice', 'Deed tax receipt (契税完税凭证)'],
      prepare: ['Resident ID cards of all owners', 'Marriage certificate, if married', 'Co-owners\' and spouse\'s written consent'],
      howTo:
        '1. Every registered owner signs, or signs a notarised power of attorney (委托公证); under the Civil Code a spouse\'s share in marital property usually needs consent too.\n2. The original purchase invoice and deed tax receipt show the cost, which matters for income tax.\n3. If a child in the family uses the home\'s school place (学位), selling can affect it; check the local education bureau rule.',
    },
    {
      id: 'mortgage',
      title: 'Pay off the mortgage or arrange a transfer with it (带押过户)',
      offsetDays: -60,
      durationDays: 30,
      dependsOn: ['ownership'],
      documents: ['Loan settlement certificate (结清证明)', 'Mortgage cancellation registration (抵押注销登记), or the lender\'s 带押过户 agreement'],
      prepare: ['Loan contract', 'Funds for early repayment, or the buyer\'s loan approval'],
      conditions: ['Only if the home still has a mortgage'],
      howTo:
        '1. The usual route is to repay the loan early, get the settlement certificate and cancel the mortgage at the registration centre.\n2. Since 2023, transfer with the mortgage still on it (带押过户) has been promoted nationwide; the buyer\'s lender and yours coordinate so the title passes without paying off first. Availability depends on the city and banks; check current.\n3. Banks often ask for early repayment to be booked weeks ahead.',
    },
    {
      id: 'contract',
      title: 'Sign the online contract and set up supervised funds (网签, 资金监管)',
      offsetDays: -45,
      durationDays: 7,
      dependsOn: ['ownership'],
      documents: ['Online-signed sale contract (网签合同)', 'Funds supervision agreement (资金监管协议)'],
      prepare: ['Title certificate', 'Agreed price, payment schedule and handover date', 'Clauses on hukou move-out and school place'],
      howTo:
        '1. Second-hand sales are signed and filed in the city\'s online contract system (网签), usually through an agent or the housing bureau.\n2. Many cities route the buyer\'s payments through a supervised account (资金监管) released to the seller after the title transfer.\n3. The contract often sets a deadline and penalty for moving the hukou out.',
    },
    {
      id: 'taxes',
      title: 'File and pay the seller\'s taxes',
      offsetDays: -7,
      durationDays: 7,
      dependsOn: ['contract'],
      documents: ['Tax payment receipts or exemption record'],
      prepare: ['Original purchase invoice and deed tax receipt', 'Renovation and loan interest receipts, if counted as costs', 'Proof it is the family\'s only home, if claiming the exemption'],
      howTo:
        '1. Income tax: exempt if the home was held for 5 years or more and is the family\'s only home (满五唯一); otherwise 20% of the gain with costs proven, or a deemed rate on the price (核定征收, often 1% for ordinary homes) where the city allows.\n2. VAT: individuals selling a home held 2 years or more have been exempt; check current rules under the VAT Law in force from 2026.\n3. Individuals selling a home are currently exempt from land appreciation tax and stamp duty; check current.\n4. The buyer pays deed tax.\n5. Taxes are usually paid at the tax window in the registration hall before the transfer.',
    },
    {
      id: 'transfer',
      title: 'Complete the title transfer (过户)',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['mortgage', 'contract', 'taxes'],
      documents: ['New title certificate issued to the buyer'],
      prepare: ['Title certificate', 'Resident ID cards of all sellers and buyers', 'Online contract', 'Tax receipts'],
      howTo:
        '1. Buyer and seller apply together at the real estate registration centre (不动产登记中心); many cities combine registration and tax in one window.\n2. The title passes when the registration is entered.',
    },
    {
      id: 'funds',
      title: 'Receive the sale money',
      offsetDays: 7,
      durationDays: 3,
      dependsOn: ['transfer'],
      documents: ['Bank record of the released funds'],
      prepare: ['Seller\'s bank account named in the supervision agreement'],
      howTo:
        '1. Supervised funds and the buyer\'s loan are usually released within days of the transfer.\n2. Timing depends on the bank and the contract.',
    },
    {
      id: 'handover',
      title: 'Hand over the home and settle the bills',
      offsetDays: 14,
      durationDays: 1,
      dependsOn: ['transfer'],
      documents: ['Handover record (交房确认书) with meter readings'],
      prepare: ['Keys and access cards', 'Water, electricity, gas and heating accounts', 'Property management fee receipts'],
      howTo:
        '1. Water, electricity, gas, heating and property management fees are paid up to the handover date, and the accounts are moved to the buyer.\n2. The housing maintenance fund (维修基金) stays with the home.\n3. Both sides sign a handover record with meter readings.',
    },
    {
      id: 'hukou',
      title: 'Move the hukou out of the sold home (户口迁出)',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: ['transfer'],
      documents: ['Updated household register'],
      prepare: ['Hukou book', 'Resident ID cards', 'Address and proof for the new registration'],
      conditions: ['Only if anyone\'s hukou is registered at the sold home'],
      howTo:
        '1. The hukou is moved at the police station to a new home, a relative\'s household or a collective household (集体户).\n2. The sale contract usually sets the deadline.',
    },
    {
      id: 'deductions',
      title: 'Update mortgage or rent deductions in the tax app',
      offsetDays: 30,
      durationDays: 3,
      dependsOn: [],
      documents: ['Updated deduction declaration'],
      prepare: ['Individual income tax app', 'New rent contract, if renting'],
      conditions: ['Only if you claimed the mortgage interest deduction on this home, or now rent'],
      howTo:
        '1. The mortgage interest deduction (住房贷款利息) stops after the loan is repaid.\n2. The rent deduction (住房租金) can apply once renting in a city of work, but not in the same month as mortgage interest.',
    },
    {
      id: 'swap-refund',
      title: 'Claim the income tax refund on buying another home (换购住房退税)',
      offsetDays: 300,
      durationDays: 30,
      dependsOn: ['taxes'],
      documents: ['Refund application', 'New home\'s purchase contract and deed tax receipt'],
      prepare: ['Income tax receipt from this sale', 'Resident ID card'],
      conditions: ['Only if you paid income tax on this sale and buy a home in the same city within a year'],
      howTo:
        '1. A national policy refunds income tax paid on selling a home when a new home is bought in the same city within a year before or after the sale.\n2. The refund is the full tax paid if the new home costs at least as much as the sold one, otherwise in proportion.\n3. The policy has been extended before; check the current end date.\n4. It is applied for at the tax office or online.',
    },
  ],
};
