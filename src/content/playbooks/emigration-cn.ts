import type { Playbook } from '../../domain/types';

export const emigrationCn: Playbook = {
  id: 'emigration-cn',
  title: 'Leaving China · moving abroad',
  summary:
    'Paperwork plan on the China side of moving abroad to work, study or settle: notarised and apostilled documents, the police certificate, a driving record, property and a power of attorney, moving money, then the hukou, tax clearance, housing provident fund, pension and medical insurance once settled. Study-abroad steps are marked.',
  region: 'China',
  country: 'CN',
  family: 'emigration',
  leaving: true,
  anchorKind: 'migrated',
  ages: { from: 16 },
  conditions: [
    'You are a Chinese citizen living in mainland China and moving to another country',
    'Some steps apply only once you settle abroad or take another nationality, or only to students',
    'The destination\'s own immigration steps are in its plans; this is a planning aid, not immigration or legal advice',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'China Consular Service Network: apostille and consular legalisation (领事认证) — Ministry of Foreign Affairs',
      url: 'https://cs.mfa.gov.cn/',
    },
    {
      title: 'Nationality Law of the People\'s Republic of China (National Immigration Administration)',
      url: 'https://en.nia.gov.cn/n147418/n147458/c155976/content.html',
    },
    {
      title: 'Individual Income Tax Law of the PRC — State Taxation Administration law library',
      url: 'https://fgk.chinatax.gov.cn/',
    },
    {
      title: 'Regulations on the Management of Housing Provident Fund — gov.cn',
      url: 'https://www.gov.cn/gongbao/content/2019/content_5468861.htm',
    },
    {
      title: 'Housing Provident Fund Regulations, consolidated text (check current) — Ministry of Justice regulations database',
      url: 'https://xzfg.moj.gov.cn/front/law/detail?LawID=1822',
    },
    {
      title: 'Social Insurance Law of the PRC — State Taxation Administration law library',
      url: 'https://fgk.chinatax.gov.cn/zcfgk/c100009/c5192937/content.html',
    },
    {
      title: 'National Social Insurance Public Service Platform',
      url: 'https://si.12333.gov.cn/osptb/index.html',
    },
    {
      title: 'National Healthcare Security Administration',
      url: 'https://www.nhsa.gov.cn/',
    },
    {
      title: 'Motor Vehicle Driving Licence Application and Use Provisions (MPS Order 162) — gov.cn',
      url: 'https://www.gov.cn/gongbao/content/2022/content_5679696.htm',
    },
    {
      title: 'Notice on further facilitating personal current account foreign exchange business — State Administration of Foreign Exchange',
      url: 'https://www.safe.gov.cn/safe/2021/0402/18672.html',
    },
    {
      title: 'China Higher Education Student Information (学信网) — degree and transcript verification',
      url: 'https://www.chsi.com.cn/',
    },
    {
      title: 'Chinese Service Center for Scholarly Exchange: foreign degree recognition (学历认证)',
      url: 'https://www.cscse.edu.cn/',
    },
  ],
  steps: [
    {
      id: 'study-transcripts',
      title: 'Get certified transcripts and degree reports for study applications',
      offsetDays: -240,
      durationDays: 30,
      dependsOn: [],
      documents: ['Transcripts in Chinese and English', 'Degree and graduation certificates', 'Online verification report (学信网)'],
      prepare: ['School registrar contact', '学信网 account', 'List of the schools\' document rules'],
      conditions: ['Only if you are going abroad to study'],
      howTo:
        '1. Schools abroad usually want sealed transcripts from the school or a notarised copy with translation.\n2. 学信网 (CHSI) issues online verification reports for Chinese degrees and records that many schools and credential evaluators accept.\n3. Each school and country sets its own rules; check them before ordering.\n4. The 30 days is an estimate.',
    },
    {
      id: 'notarise',
      title: 'Notarise birth, marriage, degree and other records (公证)',
      offsetDays: -150,
      durationDays: 30,
      dependsOn: [],
      documents: ['Notarial certificates (公证书) with translations'],
      prepare: ['Resident ID card', 'Household register (户口簿)', 'Marriage certificate', 'Degree and graduation certificates', 'Children\'s birth medical certificates'],
      howTo:
        '1. A notary office (公证处) issues notarial certificates for birth, kinship, marriage, degrees, no criminal record and similar facts, usually with an English translation attached.\n2. The destination\'s immigration or school rules list which ones they want.\n3. People born before birth medical certificates were common get a birth notarisation based on the hukou record.\n4. The 30 days is an estimate.',
    },
    {
      id: 'police-certificate',
      title: 'Get the no-criminal-record certificate (无犯罪记录证明)',
      offsetDays: -150,
      durationDays: 21,
      dependsOn: [],
      documents: ['No-criminal-record certificate'],
      prepare: ['Resident ID card', 'Household register', 'Purpose, e.g. immigration'],
      howTo:
        '1. Issued by the public security police station where the hukou or residence is; many cities also take applications online.\n2. For use abroad it is usually notarised, then apostilled or legalised.\n3. Destinations often accept only recent certificates, e.g. within 6 months; check their rule before applying.\n4. Anyone who lived in other countries may need their certificates too.',
    },
    {
      id: 'apostille',
      title: 'Apostille or legalise the notarised documents (附加证明书 / 领事认证)',
      offsetDays: -105,
      durationDays: 21,
      dependsOn: ['notarise', 'police-certificate'],
      documents: ['Apostilles (附加证明书)', 'Or consular legalisation'],
      prepare: ['Notarial certificates', 'Whether the destination is a party to the Apostille Convention'],
      howTo:
        '1. China joined the Hague Apostille Convention with effect from November 7, 2023.\n2. For other party countries, the Ministry of Foreign Affairs or an authorised local foreign affairs office adds an apostille to the notarised document; no embassy legalisation follows.\n3. For countries outside the convention, documents go through consular legalisation: the foreign affairs office, then that country\'s embassy.\n4. Notary offices often arrange this; the 21 days is an estimate.',
    },
    {
      id: 'driving-record',
      title: 'Get a driving record for exchanging the licence abroad',
      offsetDays: -60,
      durationDays: 14,
      dependsOn: [],
      documents: ['Driving licence', 'Driving record or certificate from the vehicle management office', 'Notarised translation'],
      prepare: ['交管12123 app sign-in', 'Licence issue date and class'],
      conditions: ['Only if you drive and want to exchange or use your licence abroad'],
      howTo:
        '1. Many countries let a licence holder exchange or shorten tests using proof of years of driving.\n2. The vehicle management office or 交管12123 can give a record of the licence and driving history; ask which form the destination accepts.\n3. A notarised translation is often asked for.\n4. Keep the Chinese licence valid; it can be renewed through the app while abroad in many cases.',
    },
    {
      id: 'property',
      title: 'Decide to keep, rent out or sell property',
      offsetDays: -90,
      durationDays: 60,
      dependsOn: [],
      documents: ['Real estate ownership certificate (不动产权证书)'],
      prepare: ['Mortgage and provident fund loan balance', 'Who will manage it', 'Tax on a sale'],
      conditions: ['Only if you own a home or other property in China'],
      howTo:
        '1. Owners abroad can keep property; a sale or rental needs someone in China or a power of attorney.\n2. A sale follows the local online signing and transfer process; see the "Sold a home" plan if one exists for your region.\n3. Tax on a sale depends on years held and whether it is the only home; check current rules. Not financial advice.',
    },
    {
      id: 'power-of-attorney',
      title: 'Make a notarised power of attorney (委托公证)',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: ['property'],
      documents: ['Notarised power of attorney (委托书公证)'],
      prepare: ['Who will act for you, and their ID', 'Exactly which matters: property, bank, pension, hukou'],
      conditions: ['Only if someone in China will handle matters for you'],
      howTo:
        '1. Many offices accept an agent only with a notarised power of attorney naming specific matters.\n2. Before leaving, do it at a notary office in China; from abroad, a Chinese embassy or consulate, or a local notary plus apostille, can do it.\n3. Property transfers usually want a separate, specific authorisation.',
    },
    {
      id: 'money',
      title: 'Plan moving money abroad (购汇 and transfers)',
      offsetDays: -30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Bank records'],
      prepare: ['Resident ID card', 'Destination bank account', 'Proof of purpose, e.g. tuition invoices'],
      conditions: ['Only if you are taking savings with you'],
      howTo:
        '1. Individuals can buy foreign currency within a yearly convenience quota (年度便利化额度), currently US$50,000 a person; check current with the bank or SAFE.\n2. The quota is for current items such as study, travel and living costs; capital items like buying property abroad are not allowed under it.\n3. Tuition and living costs for study can be bought with proof beyond the quota in many banks; ask the bank.\n4. Not financial advice; the bank and SAFE rules are the reference.',
    },
    {
      id: 'study-file',
      title: 'Arrange the hukou and personnel file while studying (档案)',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: [],
      documents: ['File receipt from a talent centre or the school'],
      prepare: ['Where the file sits now', 'Whether you will come back after the studies'],
      conditions: ['Only if you are going abroad to study'],
      howTo:
        '1. Students abroad usually keep their hukou; it is not cancelled for study.\n2. A personnel file (档案) can stay with the school or go to a talent exchange centre, so it is ready for a job, civil service or settlement on return.\n3. Cities often have returnee (留学回国人员) settlement and job support that asks for the file and hukou records.',
    },
    {
      id: 'consular',
      title: 'Register with the Chinese embassy or consulate abroad',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['The 中国领事 app', 'Passport', 'Local address'],
      howTo:
        '1. The 中国领事 (China Consular) app has voluntary registration and handles passport renewals, notarisation and pension life certificates from abroad.\n2. Save the consulate for your area; it serves Chinese citizens there.',
    },
    {
      id: 'tax-clearance',
      title: 'Clear income tax before cancelling the hukou (税款清算)',
      offsetDays: 335,
      durationDays: 30,
      dependsOn: [],
      documents: ['Tax clearance record'],
      prepare: ['Income tax app', 'Income and property details'],
      conditions: ['Only if you settle abroad and cancel your hukou'],
      howTo:
        '1. The Individual Income Tax Law has people who cancel their Chinese hukou because they moved abroad settle their taxes before the cancellation.\n2. Ask the local tax office or use the app; the police may ask for proof when cancelling.\n3. The date is an estimate for once you settle abroad.',
    },
    {
      id: 'hukou',
      title: 'Cancel the hukou once settled abroad (户口注销)',
      offsetDays: 365,
      durationDays: 30,
      dependsOn: ['tax-clearance'],
      documents: ['Hukou cancellation certificate (注销户口证明)'],
      prepare: ['Household register', 'Resident ID card', 'Foreign permanent residence card or passport', 'Power of attorney, if someone else applies'],
      conditions: ['Only once you settle abroad for good or take another nationality'],
      howTo:
        '1. Under the Nationality Law, a Chinese citizen settled abroad who voluntarily takes another nationality loses Chinese nationality automatically (Article 9); Article 3 says China does not recognise dual nationality.\n2. The hukou and resident ID card of someone who has settled abroad or lost Chinese nationality are then cancelled at the police station.\n3. Do the provident fund, pension, medical insurance and bank steps first where they ask for a valid ID or hukou; some ask for the cancellation proof instead.\n4. The date is an estimate; move it to when you settle.',
    },
    {
      id: 'provident-fund',
      title: 'Withdraw the housing provident fund on settling abroad (出境定居提取)',
      offsetDays: 425,
      durationDays: 30,
      dependsOn: ['hukou'],
      documents: ['Withdrawal record'],
      prepare: ['Provident fund account', 'Proof of settling abroad, e.g. hukou cancellation or foreign residence', 'Any outstanding provident fund loan', 'Power of attorney, if an agent applies'],
      conditions: ['Only if you have a housing provident fund account and settle abroad'],
      howTo:
        '1. The provident fund regulations list settling abroad (出境定居) as a ground to withdraw the whole balance and close the account.\n2. Fund centres set the proof they accept; ask before applying.\n3. An outstanding provident fund loan is dealt with first.\n4. Check current rules with the fund centre, including any recent amendment to the regulations.',
    },
    {
      id: 'pension',
      title: 'Ask what happens to the pension record (养老保险)',
      offsetDays: 425,
      durationDays: 30,
      dependsOn: ['hukou'],
      documents: ['Social insurance contribution record'],
      prepare: ['Contribution years', 'Whether you keep Chinese nationality', 'Power of attorney, if an agent applies'],
      conditions: ['Only if you paid into the employee basic pension in China'],
      howTo:
        '1. A pension record normally stays in place after moving abroad, and can be claimed at retirement age with the minimum contribution years; pensions are paid abroad with a yearly life certificate.\n2. The rules on ending the record and paying out the personal account in one sum depend on settling abroad or giving up Chinese nationality; ask the local social insurance office for the current rule before deciding.\n3. China has social insurance agreements with some countries that can avoid double contributions for posted workers.\n4. Not financial advice.',
    },
    {
      id: 'medical',
      title: 'Settle medical insurance and the personal account (医保)',
      offsetDays: 425,
      durationDays: 30,
      dependsOn: ['hukou'],
      documents: ['Medical insurance record'],
      prepare: ['Medical insurance account balance', 'Family members who share the account'],
      conditions: ['Only if you have medical insurance in China'],
      howTo:
        '1. Basic medical insurance in China generally does not pay for care abroad.\n2. Ask the local medical insurance office what happens to the personal account balance on settling abroad, and whether it can be used by family members first.\n3. Stop the residents\' medical insurance renewal if no one in China uses it.',
    },
    {
      id: 'study-return',
      title: 'Get the foreign degree recognised on return (留服学历学位认证)',
      offsetDays: 1460,
      durationDays: 30,
      dependsOn: ['study-file'],
      documents: ['Foreign degree recognition certificate'],
      prepare: ['Degree certificate and transcripts', 'Passport with entry and exit records', 'CSCSE online account'],
      conditions: ['Only if you studied abroad and return to China'],
      howTo:
        '1. The Chinese Service Center for Scholarly Exchange (CSCSE) certifies foreign degrees online; employers, civil service exams and city settlement schemes often ask for it.\n2. Apply after the degree is awarded; check current documents and times on its site.\n3. The date assumes a 4-year course; move it to after graduation.',
    },
  ],
};
