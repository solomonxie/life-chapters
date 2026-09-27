import type { Playbook } from '../../domain/types';

export const relocationCn: Playbook = {
  id: 'relocation-cn',
  title: 'Relocating to China · Canadian with Chinese family',
  summary:
    'Routes into China for a Canadian national with a Chinese-citizen parent, spouse or close relative, from the family-reunion visa to permanent residence or nationality, then the first months after arrival.',
  region: 'China',
  country: 'CN',
  family: 'relocation',
  anchorKind: 'migrated',
  ages: { from: 0 },
  conditions: [
    'Holds a foreign nationality, such as Canadian',
    'Has a Chinese-citizen parent, spouse or close relative',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Nationality Law of the People\'s Republic of China (National Immigration Administration)',
      url: 'https://en.nia.gov.cn/n147418/n147458/c155976/content.html',
    },
    {
      title: 'Exit and Entry Administration Law of the People\'s Republic of China',
      url: 'https://en.nia.gov.cn/n147418/n147458/c155978/content.html',
    },
    {
      title: 'Regulations on Administration of Entry and Exit of Foreigners',
      url: 'https://en.nia.gov.cn/n147418/n147458/c155970/content.html',
    },
    {
      title: 'NIA: Service Guide on Issuance of Residence Permit for Foreigners',
      url: 'https://en.nia.gov.cn/n147423/n147478/n147715/c158270/content.html',
    },
    {
      title: 'NIA: 外国人居留证件签发、延期、换发、补发服务指南',
      url: 'https://s.nia.gov.cn/mps/bszy/wgrcrj/sqwgrjlzj/201903/t20190313_1007.html',
    },
    {
      title: 'NIA: Guidelines for Approval of Foreign Nationals\' Eligibility for Permanent Residence',
      url: 'https://en.nia.gov.cn/n147423/n147478/n147715/c158291/content.html',
    },
    {
      title: 'NIA: 外国人永久居留资格审批服务指南',
      url: 'https://s.nia.gov.cn/mps/bszy/wgrcrj/yjjl/201903/t20190313_1008.html',
    },
    {
      title: 'NIA: Instructions on Application for Naturalization as a Chinese National',
      url: 'https://en.nia.gov.cn/n147423/n147478/n147720/c158308/content.html',
    },
    {
      title: 'NIA: Policy interpretation on nationwide online accommodation registration',
      url: 'https://en.nia.gov.cn/n147418/n147463/c237273/content.html',
    },
    {
      title: 'NIA: 外国人住宿登记 policy explanation',
      url: 'https://www.nia.gov.cn/n741440/n741577/c1806139/content.html',
    },
    {
      title: 'Chinese Embassy in Canada: visa application guide (申办须知)',
      url: 'http://ca.china-embassy.gov.cn/chn/lsyw/lszj/qz00/201908/t20190828_4889714.htm',
    },
    {
      title: 'Chinese Embassy in Canada: visa introduction and Q&A',
      url: 'http://ca.china-embassy.gov.cn/chn/lsyw/lszj/qz00/202406/t20240619_11438094.htm',
    },
    {
      title: 'Chinese Embassy in Canada: online Chinese visa application',
      url: 'http://ca.china-embassy.gov.cn/chn/lsyw/lszj/qz00/202509/t20250913_11707905.htm',
    },
    {
      title: 'Consulate General in Toronto: China visa application guide',
      url: 'https://toronto.china-consulate.gov.cn/lsfw/HQGR/50/202407/t20240709_11451151.htm',
    },
    {
      title: 'Consulate General in Toronto: passport and travel document application guide (申办护照旅行证须知)',
      url: 'https://toronto.china-consulate.gov.cn/lsfw/HQGR/40/202110/t20211030_10404519.htm',
    },
    {
      title: 'Consulate General in Toronto: passport and travel document FAQ',
      url: 'https://toronto.china-consulate.gov.cn/lsfw/HQGR/40/202407/t20240709_11451072.htm',
    },
    {
      title: 'Chinese Embassy in Canada: Guide to Payment Services in China',
      url: 'https://ca.china-embassy.gov.cn/eng/zytz_0/202607/t20260708_11977212.htm',
    },
    {
      title: 'Renounce Canadian citizenship: who can apply',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/renounce-canadian-citizenship/eligibility.html',
    },
  ],
  steps: [
    {
      id: 'confirm-route',
      title: 'Confirm the nationality position and pick the entry route',
      offsetDays: -180,
      durationDays: 30,
      dependsOn: [],
      documents: ['Consulate\'s answer on nationality status'],
      prepare: [
        'Canadian passport',
        'Birth certificate listing both parents',
        'Parents\' passports and status documents from the time of the birth',
        'The Chinese relative\'s ID and household register (户口簿) details',
      ],
      howTo:
        '1. For someone born in Canada to a Chinese parent, the plan "Born in Canada to a Chinese parent" covers the nationality background.\n2. Under Article 5 of the Nationality Law (中华人民共和国国籍法), a child born abroad to a Chinese-national parent has Chinese nationality, unless a Chinese-national parent had settled abroad (定居国外) and the child acquired a foreign nationality at birth.\n3. China does not recognise dual nationality for Chinese nationals (Article 3).\n4. The routes below each apply in one situation: A, family-reunion visa; B, permanent residence; C, naturalization; D, Chinese travel document and household registration. Mark the others "Not for me".\n5. Confirm the status with the Chinese embassy or a consulate in Canada; this plan does not decide it.',
    },
    {
      id: 'q1-documents',
      title: 'Route A: gather the Q1 family-reunion visa documents',
      offsetDays: -75,
      durationDays: 30,
      dependsOn: ['confirm-route'],
      documents: ['Invitation letter', 'Relative\'s Chinese ID copy', 'Proof of relationship'],
      prepare: [
        'Invitation letter from the Chinese-citizen relative living in China',
        'Copy of the relative\'s Chinese ID card',
        'Original proof of relationship: birth certificate, marriage certificate or notarial certificate',
        'Canadian passport valid for the stay',
      ],
      conditions: ['Only if entering on a Q1 family-reunion visa as a foreign national'],
      howTo:
        '1. The Q1 visa (团聚签证) is for family members of Chinese citizens, or of foreigners with Chinese permanent residence, who apply to reside in China for family reunion for more than 180 days.\n2. Family members include spouses, parents, parents-in-law, children, children\'s spouses, siblings, grandparents and grandchildren.\n3. The Embassy\'s list names an invitation letter from the relative living in China, the relative\'s Chinese ID copy, and original proof of the relationship; check the current list with the visa centre for anything else, such as household register (户口簿) pages.\n4. The date here is a planning estimate.',
    },
    {
      id: 'q1-visa',
      title: 'Route A: apply for the Q1 visa at a Chinese Visa Application Service Center',
      offsetDays: -45,
      durationDays: 14,
      dependsOn: ['q1-documents'],
      documents: ['Q1 visa'],
      prepare: ['Online visa form at visaforchina.cn', 'Visa photo', 'All Q1 documents'],
      conditions: ['Only if entering on a Q1 family-reunion visa as a foreign national'],
      howTo:
        '1. Ordinary visas are applied for through a Chinese Visa Application Service Center in Canada; forms are filled online at visaforchina.cn.\n2. Standard processing is about 4 business days from the day the paper documents are submitted.\n3. A Q1 visa is marked for a residence permit to be applied for within 30 days of entry.\n4. The date here is a planning estimate; allow time for appointments and mail.',
    },
    {
      id: 'pr-eligibility',
      title: 'Route B: check eligibility for Chinese permanent residence',
      offsetDays: -60,
      durationDays: 14,
      dependsOn: ['confirm-route'],
      documents: [],
      prepare: [
        'Proof of the family relationship',
        'The Chinese relative\'s ID',
        'Housing and income proof, for a spouse',
      ],
      conditions: ['Only if applying for Chinese permanent residence as a minor child or a spouse of a Chinese citizen'],
      howTo:
        '1. Chinese permanent residence (外国人永久居留) is approved by public security; the card is the Foreign Permanent Resident ID Card (外国人永久居留身份证).\n2. A minor child: under 18, unmarried and dependent on a parent who is a Chinese citizen (or a foreign permanent resident).\n3. A spouse: married to a Chinese citizen for at least 5 years, with at least 5 consecutive years of residence in China, at least 9 months each year, and a stable income and home.\n4. The application goes to the city public security bureau where the applicant lives long term in China, so it is made after entry; a parent can file for a child under 18.\n5. Confirm eligibility with the local exit-entry office.',
    },
    {
      id: 'naturalization',
      title: 'Route C: look into Chinese nationality (入籍)',
      offsetDays: -30,
      durationDays: 30,
      dependsOn: ['confirm-route'],
      documents: [],
      prepare: [
        'Canadian passport copy',
        'Proof of the Chinese-national close relative',
        'Reasons for the application',
      ],
      conditions: ['Only if considering naturalization as a Chinese national'],
      howTo:
        '1. A foreign national who has Chinese-national close relatives, has settled in China, or has other legitimate reasons can apply to be naturalized (Nationality Law, Article 7).\n2. A person naturalized as Chinese does not keep a foreign nationality (Article 8); the application includes a written declaration giving up the foreign nationality.\n3. The application goes to the city or county public security bureau in China, or to a Chinese embassy or consulate abroad; the Ministry of Public Security approves it. Parents can file for a child under 18 (Article 14).\n4. Canada accepts renunciation of Canadian citizenship from someone at least 18 who is, or will become, a citizen of another country and does not live in Canada.\n5. No processing time is published; confirm the process with the Chinese embassy or a consulate in Canada.',
    },
    {
      id: 'travel-document',
      title: 'Route D: get a Chinese travel document (旅行证) for the move',
      offsetDays: -45,
      durationDays: 30,
      dependsOn: ['confirm-route'],
      documents: ['Chinese travel document (旅行证)'],
      prepare: [
        'China Consular (中国领事) app account',
        'Photos',
        'Both parents\' passports and residence documents at the birth',
        'Birth certificate showing both parents',
      ],
      conditions: ['Only if the embassy or consulate treats the person as a Chinese national'],
      howTo:
        '1. Under Article 5 of the Nationality Law, a child born abroad to a Chinese-national parent who had not settled abroad at the birth has Chinese nationality; the consulates issue such a child a travel document.\n2. Apply through the China Consular app while in Canada; the consulates quote about 4 to 10 business days from complete materials.\n3. A person treated as Chinese enters China on the Chinese document, not on a visa.\n4. Confirm the status with the Chinese embassy or a consulate in Canada before applying.\n5. The date here is a planning estimate.',
    },
    {
      id: 'accommodation-registration',
      title: 'Register the address with the local police within 24 hours (住宿登记)',
      offsetDays: 1,
      durationDays: 1,
      dependsOn: [],
      documents: ['Accommodation registration form'],
      prepare: ['Passport with the entry stamp', 'Address and host\'s details', 'NIA 12367 app, for online registration'],
      conditions: ['Only if entering as a foreign national and staying outside a hotel'],
      howTo:
        '1. A foreign national staying outside a hotel is registered with the police station for the address within 24 hours of arriving, by the host or the person themselves.\n2. Hotels register their guests themselves.\n3. Online registration through the NIA government service platform, the NIA 12367 app or its mini programs has the same effect as registering in person.\n4. Registration is done again after moving address.',
    },
    {
      id: 'sim-card',
      title: 'Get a real-name mobile number with the passport',
      offsetDays: 3,
      durationDays: 1,
      dependsOn: [],
      documents: ['Mobile SIM card'],
      prepare: ['Passport', 'Local address'],
      howTo:
        '1. Mobile numbers in China are registered in the holder\'s real name; a foreign national shows the passport at a carrier\'s own shop.\n2. A local number makes bank, payment app and government app sign-ups simpler.\n3. Rules and accepted documents can differ by carrier; ask in the shop.',
    },
    {
      id: 'bank-account',
      title: 'Open a bank account with the passport',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: ['sim-card'],
      documents: ['Bank card'],
      prepare: ['Passport', 'Local mobile number', 'Local address'],
      howTo:
        '1. According to the Embassy\'s payment guide, a bank account can be opened with a passport or other valid ID at a bank branch, such as ICBC, ABC, Bank of China, CCB or Bank of Communications.\n2. Ask the branch what else it asks for; requirements differ between banks.\n3. The account can be linked to mobile payment apps.',
    },
    {
      id: 'residence-permit',
      title: 'Route A: convert the Q1 visa into a family-reunion residence permit',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: ['q1-visa', 'accommodation-registration'],
      documents: ['Family-reunion residence permit (团聚类居留许可)'],
      prepare: [
        'Passport with the Q1 visa',
        'Application form and photo',
        'Accommodation registration form',
        'Relative\'s ID and a letter explaining the family relationship',
        'Health certificate, if asking for a permit over 1 year',
      ],
      conditions: ['Only if entered on a Q1 family-reunion visa'],
      howTo:
        '1. A visa marked for a residence permit is converted by applying to the local public security exit-entry office within 30 days of entry.\n2. Applicants apply in person; a representative can file for someone under 16.\n3. A decision comes within the validity of the acceptance receipt, up to 15 working days.\n4. Family-reunion permits for people under 18 or 60 and over are issued for up to 3 years, not past the 18th birthday for a minor; for others, up to 2 years.\n5. Confirm the current rules with the local exit-entry office.',
    },
    {
      id: 'hukou',
      title: 'Route D: register in the family\'s household register (户口)',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: ['travel-document'],
      documents: ['Household register (户口簿) entry'],
      prepare: [
        'Chinese travel document with the entry record',
        'Birth certificate, with any translation or certification the police station asks for',
        'Parent\'s household register and ID card',
      ],
      conditions: ['Only if the person is treated as a Chinese national and will live in China'],
      howTo:
        '1. A Chinese national living in China is registered in a household register (户口) through the local public security police station.\n2. For a child born abroad, the police station for the parent\'s registered address says what it asks for; this varies by city.\n3. An expired travel document can\'t be renewed by the local police in China; for exit, they can issue a one-time exit-entry permit (出入境通行证).\n4. The date here is a planning estimate.',
    },
    {
      id: 'health-insurance',
      title: 'Arrange health insurance',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Health insurance policy'],
      prepare: ['Passport', 'Residence permit, once issued', 'Compare private medical plans'],
      conditions: ['Only if not covered through an employer in China'],
      howTo:
        '1. Foreign nationals who are not employed in China often arrange a private medical plan; whether a family member on a residence permit can join a local scheme varies by city.\n2. Ask the local social insurance office what applies in your city.\n3. The date here is a planning estimate.',
    },
    {
      id: 'social-insurance',
      title: 'Join social insurance through the employer',
      offsetDays: 60,
      durationDays: 14,
      dependsOn: [],
      documents: ['Social insurance number'],
      prepare: ['Work permit', 'Residence permit', 'Employment contract'],
      conditions: ['Only if employed in China'],
      howTo:
        '1. Foreign nationals employed in China are enrolled in the social insurance schemes through the employer.\n2. Ask the employer\'s HR team when enrolment happens.\n3. The date here is a planning estimate.',
    },
    {
      id: 'school-public',
      title: 'Apply to a local public school as a foreign student',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: [],
      documents: ['School admission letter'],
      prepare: ['Child\'s passport and residence permit', 'Previous school records', 'Proof of address', 'Immunization record'],
      ages: { from: 5, to: 17 },
      conditions: ['Only if a school-age child with foreign nationality is moving', 'Only if looking at public schools'],
      howTo:
        '1. Admission of foreign-national students to public primary and secondary schools follows the rules of the city and district education bureau; they vary by city.\n2. Ask the district education bureau which schools admit foreign students and what they ask for.\n3. A child treated as a Chinese national with a household registration enrols like other local children.\n4. The date here is a planning estimate.',
    },
    {
      id: 'school-international',
      title: 'Apply to an international school',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: [],
      documents: ['School admission letter'],
      prepare: ['Child\'s passport and residence permit', 'Previous school records', 'Immunization record'],
      ages: { from: 3, to: 17 },
      conditions: ['Only if a child with foreign nationality is moving', 'Only if looking at international schools'],
      howTo:
        '1. Schools for children of foreign nationals (外籍人员子女学校) admit holders of foreign passports\n2. Ask each school about deadlines and entry tests.\n3. The date here is a planning estimate.',
    },
    {
      id: 'pr-application',
      title: 'Route B: apply for permanent residence once eligible',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: ['pr-eligibility', 'accommodation-registration'],
      documents: ['Foreign Permanent Resident ID Card (外国人永久居留身份证)'],
      prepare: [
        'Application form and photos',
        'Passport and current residence permit',
        'Birth certificate or proof of parentage, for a minor child',
        'Chinese parent\'s ID copy, for a minor child',
        'Marriage certificate, spouse\'s ID, housing and income proof, for a spouse',
      ],
      conditions: ['Only if eligible for permanent residence as a minor child or a spouse of a Chinese citizen'],
      howTo:
        '1. Apply to the city public security bureau where you live long term in China; a parent can apply for a child under 18.\n2. A decision is made within 6 months of acceptance.\n3. A spouse becomes eligible only after 5 years of marriage and 5 consecutive years of residence in China, so move this date to when that is met.\n4. The date here is a planning estimate.',
    },
    {
      id: 'renew-residence-permit',
      title: 'Route A: renew the residence permit before it expires',
      offsetDays: 700,
      durationDays: 30,
      dependsOn: ['residence-permit'],
      documents: ['Renewed residence permit'],
      prepare: ['Passport and current residence permit', 'Current accommodation registration', 'Relative\'s ID and relationship proof'],
      conditions: ['Only if living in China on a residence permit'],
      howTo:
        '1. An extension is applied for at the local exit-entry office within 30 days before the permit expires.\n2. The date here is a planning estimate for a 2-year permit; move it to 30 days before the expiry date on your permit.',
    },
  ],
};
