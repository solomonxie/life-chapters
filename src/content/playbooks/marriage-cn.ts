import type { Playbook } from '../../domain/types';

export const marriageCn: Playbook = {
  id: 'marriage-cn',
  title: 'Getting married · China',
  summary:
    'Paperwork plan for registering a marriage in mainland China, from the optional health check and booking to the certificate, marriage leave, hukou, insurance, tax and housing fund.',
  region: 'China',
  country: 'CN',
  family: 'marriage',
  anchorKind: 'married',
  ages: { from: 20 },
  conditions: [
    'You are registering the marriage in mainland China',
    'The man is 22 or older and the woman is 20 or older (Civil Code, Article 1047)',
    'Neither of you is married to someone else, and you are not close blood relatives',
    'The steps below are for two mainland residents; with a foreign, Hong Kong, Macao or Taiwan partner, other documents and offices apply',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Marriage Registration Regulations (婚姻登记条例), State Council Decree No. 804 — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/202504/content_7017752.htm',
    },
    {
      title: 'New Marriage Registration Regulations: no hukou book, nationwide registration from May 10, 2025 — Xinhui District Government',
      url: 'https://www.xinhui.gov.cn/zwgk/xhdt/bmdt/content/post_3282191.html',
    },
    {
      title: 'Marriage registration "全国通办" policy Q&A (Ministry of Civil Affairs officials) — Luohu District Civil Affairs Bureau, Shenzhen',
      url: 'https://www.szlh.gov.cn/lhmzj/gkmlpt/content/12/12728/post_12728907.html',
    },
    {
      title: 'Nationwide marriage registration: the reform, five months on — Guangdong Department of Civil Affairs',
      url: 'https://smzt.gd.gov.cn/mzzx/qgmz/content/post_4785593.html',
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
      title: 'Order of statutory succession (Civil Code, Article 1127) — Shenzhen Justice Bureau',
      url: 'https://sf.sz.gov.cn/ydmh/cjwt_152766/content/mpost_10569494.html',
    },
    {
      title: 'Reply on extending marriage leave (national 1980 notice, 1 to 3 days) — Wuhan Health Commission',
      url: 'https://wjw.wuhan.gov.cn/zwgk_28/fdzdgknr/qtzdgknr/jytabl_1/202408/t20240820_2443724.shtml',
    },
    {
      title: 'Shanxi Population and Family Planning Regulations, Article 25 — Shanxi Health Commission',
      url: 'https://wjw.shanxi.gov.cn/zfxxgk/fdzdgknr/flfg/dfxfg/202505/t20250509_9831056.shtml',
    },
    {
      title: 'Decision amending the Sichuan Population and Family Planning Regulations — Sichuan Provincial People\'s Congress',
      url: 'https://www.scspc.gov.cn/jyjd/202512/t20251203_49669.html',
    },
    {
      title: 'Reply on pre-marital health checks (voluntary since 2003, free in many provinces) — National Health Commission',
      url: 'https://www.nhc.gov.cn/wjw/jiany/202207/30117c0884534d5f94acbff23ac8c1e9.shtml',
    },
    {
      title: 'Employee medical insurance personal accounts can be used for close relatives — gov.cn',
      url: 'https://www.gov.cn/zhengce/202408/content_6965884.htm',
    },
    {
      title: 'Interim Measures for Individual Income Tax Special Additional Deductions (国发〔2018〕41号) — State Taxation Administration',
      url: 'https://fgk.chinatax.gov.cn/zcfgk/c102440/c5209858/content.html',
    },
    {
      title: 'State Council decision amending the Housing Provident Fund Regulations (住房公积金管理条例, State Council Order No. 844, effective September 20, 2026; check current) — gov.cn',
      url: 'https://www.gov.cn/zhengce/zhengceku/202608/content_7078478.htm',
    },
  ],
  steps: [
    {
      id: 'health-check',
      title: 'Consider the pre-marital health check',
      offsetDays: -45,
      durationDays: 7,
      conditions: ['Only if you choose to have it; it is voluntary'],
      dependsOn: [],
      documents: ['Pre-marital health check report'],
      prepare: [
        'ID card for both of you',
        'Ask the local maternal and child health centre whether the check is free where you live',
      ],
      howTo:
        '1. The pre-marital health check (婚前医学检查) has been voluntary since the 2003 registration rules; the registration office does not ask for the report.\n2. Many provinces offer it free, often at a centre next to or inside the registration office.\n3. Some provinces add marriage leave for it: e.g. Sichuan adds 5 days if the check is done before registration.\n4. The 45 days here is an estimate, to leave time for any follow-up.',
    },
    {
      id: 'leave',
      title: 'Plan marriage leave with your employer',
      offsetDays: -30,
      durationDays: 7,
      conditions: ['Only if either of you is employed'],
      dependsOn: [],
      documents: [],
      prepare: [
        'Your province\'s current marriage leave rule',
        'Your employer\'s leave policy',
        'Dates you want off, around the registration and any wedding',
      ],
      howTo:
        '1. The national rule is still a 1980 notice: 1 to 3 days of paid marriage leave (婚假), plus travel days if the two of you work in different places.\n2. Provinces set longer leave in their population and family planning regulations, and many have extended it. Examples: Shanxi 30 days; Sichuan 20 days, plus 5 with a pre-marital check, from late 2025.\n3. The leave follows the rule where you work; check your province\'s current text, as several changed in 2024 and 2025.\n4. Leave counts from registration, not the wedding party; agree the dates with your employer in writing.',
    },
    {
      id: 'booking',
      title: 'Book the registration appointment',
      offsetDays: -14,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: [
        'Pick any marriage registration office (婚姻登记处) in mainland China',
        'Both ID card numbers',
        'A first and second choice of date',
      ],
      howTo:
        '1. Since May 10, 2025, two mainland residents can register at any registration office in the country (全国通办), not just where one of you has hukou.\n2. Offices may offer online appointments (预约) and a certificate ceremony; many book through the local civil affairs app or mini-program.\n3. Popular dates fill early; the 14 days here is an estimate, so book sooner for a special date.',
    },
    {
      id: 'photos',
      title: 'Get joint photos for the certificate',
      offsetDays: -7,
      durationDays: 3,
      dependsOn: [],
      documents: ['Joint 2-inch photos'],
      prepare: ['Ask the office its photo size, background and number of copies'],
      howTo:
        '1. The certificate carries a joint photo of the two of you; offices usually ask for recent 2-inch half-length joint photos.\n2. Many offices have a photo booth on site; check before you go.\n3. The size and count are set by each office, not the regulations; treat these as typical, not fixed.',
    },
    {
      id: 'register',
      title: 'Register the marriage at the civil affairs office',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['booking', 'photos'],
      documents: ['Resident ID card', 'Marriage certificate'],
      prepare: [
        'Original ID card for each of you',
        'The joint photos',
        'Both of you there in person',
      ],
      howTo:
        '1. Both of you go in person and apply together for marriage registration (结婚登记).\n2. Each of you shows your resident ID card and signs a declaration that you have no spouse and are not direct blood relatives or collateral relatives within three generations.\n3. The hukou book (户口簿) is no longer needed since May 10, 2025.\n4. The office checks your identity and marital status online; if you meet the conditions, it registers you on the spot and issues the marriage certificate (结婚证) the same day, one for each of you.\n5. Registration is free of charge.',
    },
    {
      id: 'medical',
      title: 'Share medical insurance with your spouse',
      offsetDays: 30,
      durationDays: 14,
      conditions: ['Only if either of you has employee medical insurance'],
      dependsOn: ['register'],
      documents: ['Marriage certificate', 'Medical insurance card'],
      prepare: [
        'Check your spouse is enrolled in basic medical insurance',
        'The national medical insurance app, or your local one',
      ],
      howTo:
        '1. Employee medical insurance does not add a spouse as a dependant; each person is insured on their own.\n2. Through family sharing (家庭共济), the insured person\'s personal account can pay a spouse\'s resident medical insurance premiums and their eligible medical costs.\n3. The spouse must be enrolled in basic medical insurance themselves; set up the authorisation in the medical insurance app or at the local office.\n4. Sharing works within the same area and, in many provinces, across cities in the province; check your local rules.',
    },
    {
      id: 'tax',
      title: 'Update your income tax deductions',
      offsetDays: 30,
      durationDays: 7,
      conditions: ['Only if either of you claims housing loan interest, rent or major medical deductions'],
      dependsOn: ['register'],
      documents: [],
      prepare: [
        'The 个人所得税 app for both of you',
        'Loan contracts for any first homes bought before marriage',
      ],
      howTo:
        '1. Special additional deductions (专项附加扣除) are updated in the 个人所得税 app, through your employer or at the annual reconciliation (年度汇算).\n2. Housing loan interest: a couple may agree which one of you claims it. If each of you bought a first home with a loan before marriage, after marriage you choose one home at 100% claimed by its buyer, or each claims 50% for your own home.\n3. The choice cannot be changed within a tax year.\n4. Housing rent: if you mainly work in the same city, only one of you can claim it.\n5. Major medical costs can be claimed by the patient or their spouse.',
    },
    {
      id: 'hukou',
      title: 'Move your hukou to join your spouse',
      offsetDays: 60,
      durationDays: 30,
      conditions: ['Only if one of you wants to move hukou to the other\'s'],
      dependsOn: ['register'],
      documents: ['Marriage certificate', 'Resident ID card', 'Hukou book'],
      prepare: [
        'Ask the police station (派出所) where the hukou would go about its rules',
        'Hukou book of the household you are joining',
      ],
      howTo:
        '1. Marriage does not change your hukou; moving it to join a spouse (投靠配偶) is optional.\n2. The conditions are set by the city receiving the hukou and differ widely; some cities set extra conditions.\n3. Apply at the receiving police station or its online service; the 30 days is an estimate.',
    },
    {
      id: 'hpf',
      title: 'Plan the housing provident fund for a joint home',
      offsetDays: 90,
      durationDays: 30,
      conditions: ['Only if you plan to buy, build or repay a loan on a home together'],
      dependsOn: ['register'],
      documents: ['Marriage certificate', 'Purchase contract or loan contract'],
      prepare: [
        'Both provident fund account balances',
        'Ask the local housing provident fund centre (公积金中心) about spouse withdrawals and joint loans',
      ],
      howTo:
        '1. The national regulations let a contributor withdraw the fund (住房公积金) to buy, build or repair a home, repay a home loan, pay rent and more, and apply for a provident fund loan.\n2. Whether a spouse can withdraw for a home in the other\'s name, and how both balances count toward a joint loan, is set by each city\'s fund centre.\n3. Centres decide on a withdrawal within 3 days and a loan within 10 days of accepting the application (as amended from September 20, 2026; check current).\n4. Not financial advice; the date here is only a prompt.',
    },
    {
      id: 'estate',
      title: 'Learn how inheritance works for spouses',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: ['register'],
      documents: ['Will'],
      prepare: ['What each of you owns, and whether it is joint or separate property'],
      howTo:
        '1. Without a will, the Civil Code puts the spouse in the first order of heirs, together with children and parents (Article 1127).\n2. Property acquired during the marriage, such as wages and investment income, is generally joint property of the couple unless you agree otherwise.\n3. A will (遗嘱) can change who inherits; the Civil Code allows handwritten, witnessed, printed, audio or video, and notarised wills.\n4. For information only, not legal advice; see a lawyer or notary for your situation.',
    },
    {
      id: 'property-agreement',
      title: 'Consider a written property agreement (婚前 / 婚内财产约定)',
      offsetDays: -30,
      durationDays: 14,
      conditions: ['Only if you want to set your own property arrangement'],
      dependsOn: [],
      documents: ['Written property agreement'],
      prepare: ['List of each person\'s property and debts', 'A notary office (公证处), if you want it notarised'],
      howTo:
        '1. Under Article 1065 of the Civil Code, a couple can agree in writing that property is separate, joint or partly joint; without it, most property acquired during the marriage is joint.\n2. It can be signed before or during the marriage; notarising is optional but common.\n3. For information only, not legal advice.',
    },
  ],
};
