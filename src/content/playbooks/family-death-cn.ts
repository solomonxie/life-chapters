import type { Playbook } from '../../domain/types';

export const familyDeathCn: Playbook = {
  id: 'family-death-cn',
  title: 'Death in the family · China',
  summary:
    'The practical matters after a family member dies in mainland China, in the order they usually come: the death certificate, the funeral, cancelling the hukou, pension and insurance claims, the provident fund, bank accounts, property and vehicles. There is no rush for most of them; the dates are gentle reminders.',
  region: 'China',
  country: 'CN',
  family: 'family-death',
  anchorKind: 'family-death',
  conditions: [
    'A family member has died, and they lived or had their hukou in mainland China',
    'Many steps apply only to some estates: a pension, a home, a car, a work-related death',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Household Registration Regulations of the PRC (户口登记条例)',
      url: 'http://www.gd.gov.cn/zwgk/wjk/zcfgk/content/post_2531969.html',
    },
    {
      title: 'Social Insurance Law of the PRC — State Taxation Administration law library',
      url: 'https://fgk.chinatax.gov.cn/zcfgk/c100009/c5192937/content.html',
    },
    {
      title: 'Housing Provident Fund Regulations, consolidated text — Ministry of Justice regulations database',
      url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1822',
    },
    {
      title: 'Civil Code of the PRC (中华人民共和国民法典) — National People\'s Congress',
      url: 'http://www.npc.gov.cn/npc/c2/c30834/202006/t20200602_306457.html',
    },
    {
      title: 'Order of statutory succession (Civil Code, Article 1127) — Shenzhen Justice Bureau',
      url: 'https://sf.sz.gov.cn/ydmh/cjwt_152766/content/mpost_10569494.html',
    },
    {
      title: 'Ministry of Human Resources and Social Security',
      url: 'https://www.mohrss.gov.cn/',
    },
    {
      title: 'National Healthcare Security Administration',
      url: 'https://www.nhsa.gov.cn/',
    },
    {
      title: 'People\'s Bank of China',
      url: 'https://www.pbc.gov.cn/',
    },
    {
      title: 'Traffic management online service platform (交管12123)',
      url: 'https://www.122.gov.cn/',
    },
  ],
  steps: [
    {
      id: 'death-certificate',
      title: 'Get the medical certificate of death (死亡医学证明书)',
      offsetDays: 1,
      durationDays: 1,
      dependsOn: [],
      documents: ['Medical certificate of death (死亡医学证明书), several copies'],
      prepare: ['Their resident ID card', 'Their household register (户口簿)', 'Your own ID card'],
      howTo:
        '1. In a hospital, the hospital issues it.\n2. At home, the community health service centre or township hospital usually issues it after a doctor\'s check; the local police can also be called.\n3. Where the cause is not natural or not known, the police handle the case and issue their own proof of death.\n4. Copies are asked for by the funeral home, the police station, the social insurance office and banks; the hospital can say how many it issues.',
    },
    {
      id: 'funeral',
      title: 'Arrange the funeral and cremation',
      offsetDays: 7,
      durationDays: 5,
      dependsOn: ['death-certificate'],
      documents: ['Cremation certificate (火化证明)'],
      prepare: ['Medical certificate of death', 'Their ID card', 'Your own ID card'],
      howTo:
        '1. Contact the funeral home (殡仪馆), which collects the body in its own vehicle and sets the date.\n2. In areas where cremation is the rule, the funeral home issues a cremation certificate afterwards; it is needed for the hukou cancellation and pension claims.\n3. Many cities give a basic funeral fee waiver or subsidy for local hukou holders; ask the funeral home or civil affairs bureau.\n4. The timing here is only a placeholder; families set their own.',
    },
    {
      id: 'hukou',
      title: 'Cancel the hukou (户口注销)',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: ['death-certificate'],
      documents: ['Hukou cancellation record (注销户口证明)'],
      prepare: ['Medical certificate of death or police proof', 'Cremation certificate', 'Their household register', 'Their ID card', 'Your own ID card'],
      howTo:
        '1. Under the Household Registration Regulations, death is reported to the police station holding the hukou: in cities before burial, in rural areas within a month.\n2. The station cancels the hukou and takes back the ID card; ask for a cancellation record, which banks, the social insurance office and the property registry often ask for.\n3. Some places cancel it together with the death certificate or at the funeral home; check with the local station.',
    },
    {
      id: 'gather',
      title: 'Gather the will and a list of what they left',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Will, if any', 'List of accounts, property and debts'],
      prepare: [
        'Bank cards and passbooks',
        'Real estate certificates',
        'Insurance policies',
        'Vehicle papers',
        'Documents showing each heir\'s relationship: household register, marriage and birth certificates',
      ],
      howTo:
        '1. Under the Civil Code, a valid will comes first; without one, the first order of heirs is the spouse, children and parents, sharing equally in general.\n2. A will may be handwritten, typed, recorded or notarised, each with its own witnessing rules.\n3. Debts and taxes are paid from the estate, up to its value.\n4. The time taken is an estimate.',
    },
    {
      id: 'pension',
      title: 'Stop the pension and claim the survivors\' benefits (丧葬补助金, 抚恤金)',
      offsetDays: 45,
      durationDays: 30,
      dependsOn: ['hukou'],
      documents: ['Benefit approval'],
      prepare: ['Hukou cancellation record or death certificate', 'Cremation certificate', 'Their social security card', 'Proof of relationship', 'Claimant\'s bank card and ID card'],
      conditions: ['Only if they were in basic pension insurance, working or retired'],
      howTo:
        '1. Tell the local social insurance office; pension paid for months after the death is usually reclaimed.\n2. Under the Social Insurance Law, the family of an insured person who died of illness or a non-work cause can claim a funeral grant (丧葬补助金) and a survivors\' benefit (抚恤金) from the pension fund; amounts are set by the province.\n3. The balance of the pension personal account (个人账户) can be inherited and is claimed at the same time.\n4. Civil servants and public institution staff follow their own rules through the employer.\n5. Many places accept the claim online or through the social insurance app.',
    },
    {
      id: 'medical-account',
      title: 'Claim the medical insurance personal account balance',
      offsetDays: 45,
      durationDays: 30,
      dependsOn: ['hukou'],
      documents: ['Payout record'],
      prepare: ['Hukou cancellation record or death certificate', 'Proof of relationship', 'Claimant\'s bank card and ID card'],
      conditions: ['Only if they had employee medical insurance'],
      howTo:
        '1. The balance of an employee medical insurance personal account can be inherited.\n2. Apply to the local medical insurance office (医保经办机构); the documents asked for are set locally.',
    },
    {
      id: 'provident-fund',
      title: 'Withdraw their housing provident fund (住房公积金)',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: ['hukou'],
      documents: ['Withdrawal record'],
      prepare: ['Hukou cancellation record or death certificate', 'Proof of being an heir or legatee', 'Claimant\'s bank card and ID card'],
      conditions: ['Only if they had a provident fund account'],
      howTo:
        '1. Under the provident fund regulations, heirs or legatees can withdraw the balance when an account holder dies.\n2. The local fund centre sets the proof of heirship it accepts; where there are several heirs, it may ask for all of them or a notarised or agreed division.',
    },
    {
      id: 'insurance-claims',
      title: 'Claim life and accident insurance',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: ['death-certificate'],
      documents: ['Claim decision'],
      prepare: ['Policies', 'Death certificate', 'Hukou cancellation record', 'Beneficiary\'s ID card and bank card'],
      conditions: ['Only if they had life, accident or employer group insurance'],
      howTo:
        '1. The named beneficiary claims from the insurer; without one, the payout joins the estate.\n2. Under the Insurance Law, life insurance claims can be made within 5 years of knowing of the death; other insurance within 2 years.\n3. Employer group policies are claimed through the employer.',
    },
    {
      id: 'work-injury',
      title: 'Apply for work-related death benefits (工亡待遇)',
      offsetDays: 30,
      durationDays: 28,
      dependsOn: ['death-certificate'],
      documents: ['Work-injury recognition decision (工伤认定决定书)'],
      prepare: ['Death certificate', 'Labour contract or proof of employment', 'Account of what happened, witnesses'],
      conditions: ['Only if the death happened at or because of work'],
      howTo:
        '1. Under the Work-Related Injury Insurance Regulations, the employer applies for recognition within 30 days; if it does not, the family can apply within one year.\n2. Benefits include a funeral grant of 6 months of the local average monthly wage, a pension for dependants, and a one-off death grant of 20 times the previous year\'s national urban per capita disposable income.\n3. Without work-injury insurance, the employer pays these itself.\n4. Disputes go to labour arbitration or the courts.',
    },
    {
      id: 'bank',
      title: 'Close or transfer bank deposits',
      offsetDays: 90,
      durationDays: 60,
      dependsOn: ['hukou'],
      documents: ['Bank closing or transfer records'],
      prepare: ['Death certificate or hukou cancellation record', 'Proof of relationship', 'Will or heirs\' agreement', 'Each heir\'s ID card'],
      howTo:
        '1. Close relatives can ask banks whether the person held deposits, with proof of death and relationship, under simplified rules from the central bank.\n2. For small balances, banks have a simpler withdrawal process; the threshold is set by the regulators and banks, so check current.\n3. Larger balances usually need a notarised inheritance certificate, a court document, or all heirs present at the bank.\n4. Securities, funds and online payment balances each have their own process with the provider.',
    },
    {
      id: 'property',
      title: 'Register the inherited home (不动产继承登记)',
      offsetDays: 180,
      durationDays: 60,
      dependsOn: ['gather'],
      documents: ['New real estate certificate (不动产权证书)'],
      prepare: ['Real estate certificate', 'Death certificate or hukou cancellation record', 'Proof of relationships of all heirs', 'Will or heirs\' agreement', 'Each heir\'s ID card'],
      conditions: ['Only if they owned a home or land rights'],
      howTo:
        '1. Apply at the local real estate registration centre (不动产登记中心).\n2. Notarisation is no longer the only route: many centres accept the heirs applying together with proof of relationship, checked by the centre; a notarised document or court judgment also works.\n3. Under the Deed Tax Law, statutory heirs inheriting a home are exempt from deed tax.\n4. A mortgage on the home stays with it; talk to the lender.\n5. The time taken is an estimate.',
    },
    {
      id: 'vehicle',
      title: 'Transfer their vehicle and cancel the driving licence',
      offsetDays: 180,
      durationDays: 30,
      dependsOn: ['gather'],
      documents: ['New vehicle registration'],
      prepare: ['Vehicle registration certificate (机动车登记证书)', 'Driving permit (行驶证)', 'Death certificate', 'Proof of inheritance', 'Heir\'s ID card'],
      conditions: ['Only if they owned a car or held a driving licence'],
      howTo:
        '1. A car passes to an heir through a transfer at the vehicle management office (车管所), with proof of inheritance.\n2. A driving licence is cancelled on the holder\'s death; family can report it at the office or through 交管12123.\n3. Compulsory traffic insurance (交强险) moves with the car or is cancelled for a refund.',
    },
    {
      id: 'accounts',
      title: 'Close phone, utility and online accounts',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: ['hukou'],
      documents: [],
      prepare: ['Death certificate or hukou cancellation record', 'Your own ID card', 'List of subscriptions and accounts'],
      howTo:
        '1. Phone numbers, utilities, memberships and subscriptions can be closed or moved into another name.\n2. Online platforms such as WeChat and Alipay have their own processes for a deceased user\'s account and balance.\n3. Keeping the phone number active for a while can help with verification codes during other steps.',
    },
  ],
};
