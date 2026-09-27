import type { Playbook } from '../../domain/types';

export const bornToChineseParentCa: Playbook = {
  id: 'born-to-chinese-parent-ca',
  title: 'Born in Canada to a Chinese parent',
  summary:
    'Documents for a child born in Canada with at least one Chinese-citizen parent: the Canadian passport, the child\'s position under China\'s Nationality Law, the document for a first trip to China, and what each path involves at 18.',
  region: 'Canada',
  country: 'CA',
  family: 'dual-heritage',
  anchorKind: 'born',
  ages: { from: 0, to: 18 },
  conditions: [
    'For a child born in Canada',
    'At least one parent is a Chinese citizen',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Nationality Law of the People\'s Republic of China (National Immigration Administration)',
      url: 'https://en.nia.gov.cn/n147418/n147458/c155976/content.html',
    },
    {
      title: 'Consulate General in Toronto: passport and travel document application guide (申办护照旅行证须知)',
      url: 'https://toronto.china-consulate.gov.cn/lsfw/HQGR/40/202110/t20211030_10404519.htm',
    },
    {
      title: 'Chinese Embassy in Canada: passport and travel document application guide (申办须知)',
      url: 'http://ca.china-embassy.gov.cn/chn/lsyw/lszj/hzlxz00/202309/t20230916_11143961.htm',
    },
    {
      title: 'Consulate General in Toronto: passport and travel document FAQ',
      url: 'https://toronto.china-consulate.gov.cn/lsfw/HQGR/40/202407/t20240709_11451072.htm',
    },
    {
      title: 'Consulate General in Toronto: China visa application guide',
      url: 'https://toronto.china-consulate.gov.cn/lsfw/HQGR/50/202407/t20240709_11451151.htm',
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
      title: 'Chinese Embassy in Canada: FAQ on the unilateral visa-free policy',
      url: 'http://ca.china-embassy.gov.cn/chn/lsyw/lszj/qz00/202602/t20260217_11860808.htm',
    },
    {
      title: 'NIA: Instructions on Application for Naturalization as a Chinese National',
      url: 'https://en.nia.gov.cn/n147423/n147478/n147720/c158308/content.html',
    },
    {
      title: 'NIA: Instructions on Application for Renunciation of Chinese Nationality',
      url: 'https://en.nia.gov.cn/n147423/n147478/n147720/c158316/content.html',
    },
    {
      title: 'How to apply for a child passport in Canada',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/child-passport.html',
    },
    {
      title: 'Get proof of citizenship (citizenship certificate)',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/proof-citizenship.html',
    },
    {
      title: 'Apply for a citizenship certificate',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/proof-citizenship/apply.html',
    },
    {
      title: 'Give up (renounce) Canadian citizenship',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/renounce-canadian-citizenship.html',
    },
    {
      title: 'Renounce Canadian citizenship: who can apply',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/renounce-canadian-citizenship/eligibility.html',
    },
  ],
  steps: [
    {
      id: 'nationality-position',
      title: 'Ask the Chinese embassy or a consulate how China treats the child\'s nationality',
      offsetDays: 75,
      durationDays: 14,
      dependsOn: [],
      documents: ['Consulate\'s answer on the child\'s nationality position'],
      prepare: [
        'Birth certificate showing both parents',
        'Both parents\' passports held at the time of the birth',
        'Both parents\' Canadian status documents at the time of the birth (PR card, citizenship certificate, work or study permit)',
        'Any other countries\' residence documents the parents held then',
      ],
      ages: { from: 0, to: 0 },
      howTo:
        '1. China\'s Nationality Law (中华人民共和国国籍法), Article 5: a person born abroad with at least one Chinese-national parent has Chinese nationality; but if a Chinese-national parent has settled abroad (定居国外) and the child acquires a foreign nationality at birth, the child does not have Chinese nationality.\n2. A child born in Canada is a Canadian citizen at birth, so the question is whether the Chinese parent had settled abroad at the time of the birth.\n3. The consulates ask for both parents\' passports and their residence documents in the birth country at the time of the birth; the parents\' status then (for example Canadian permanent residence or citizenship, or a temporary permit) is what they review.\n4. China does not recognise dual nationality for Chinese nationals (Article 3).\n5. Confirm the child\'s status with the Chinese Embassy in Ottawa or the consulate for your area (Toronto, Vancouver, Calgary or Montreal); this plan does not decide it.',
    },
    {
      id: 'keep-records',
      title: 'Keep the family\'s status records from the time of the birth',
      offsetDays: 90,
      durationDays: 7,
      dependsOn: ['nationality-position'],
      documents: ['Copies of the parents\' status documents at the birth'],
      prepare: [
        'Copies of both parents\' passports valid at the birth',
        'Copies of both parents\' Canadian status documents valid at the birth',
        'Original birth certificate listing both parents',
        'Any written reply from the embassy or consulate',
      ],
      ages: { from: 0, to: 0 },
      howTo:
        '1. Chinese consulates ask for the passports and residence documents both parents held when the child was born, not the current ones.\n2. The same papers come up for a travel document, a visa application for a child with a Chinese parent, and any later nationality application.\n3. Parents\' documents get renewed or replaced over the years; keep copies of the ones valid on the birth date.',
    },
    {
      id: 'passport',
      title: 'Apply for the child\'s Canadian passport',
      offsetDays: 120,
      durationDays: 30,
      validForDays: 1826,
      dependsOn: [],
      documents: ['Canadian child passport', 'Birth certificate', 'Passport photos'],
      prepare: [
        'Long-form (parental) birth certificate from the province of birth',
        'Two identical passport photos',
        'Guarantor who has known you 2 years and knows the child',
      ],
      ages: { from: 0, to: 0 },
      howTo:
        '1. Wait for the provincial birth certificate; the long-form certificate from the province of birth, or a citizenship certificate, is accepted as proof of citizenship.\n2. Standard processing is 10 to 20 business days plus mail.\n3. A child passport is valid for up to 5 years and can\'t be renewed.\n4. The child passport is left unsigned; a parent\'s signature makes it invalid.\n5. The date here is a planning estimate; move it to 2 months before travel.',
    },
    {
      id: 'travel-document',
      title: 'Apply for a Chinese travel document (旅行证) for a first trip to China',
      offsetDays: 150,
      durationDays: 30,
      dependsOn: ['nationality-position'],
      documents: ['Chinese travel document (旅行证)'],
      prepare: [
        'China Consular (中国领事) app account',
        'Child\'s digital photo and two paper photos (33 x 48 mm)',
        'Both parents\' passports held at the birth',
        'Both parents\' residence documents at the birth',
        'Birth certificate showing both parents',
      ],
      ages: { from: 0, to: 17 },
      conditions: ['Only if the embassy or consulate treats the child as a Chinese national'],
      howTo:
        '1. The consulates issue a travel document to a child born in Canada with a de facto nationality conflict (事实上存在国籍冲突), applied for through the China Consular app while the child is in Canada.\n2. The consulates quote Article 5 of the Nationality Law on this page: the travel document is for a child the law treats as Chinese.\n3. The travel document and a Chinese visa in the Canadian passport are alternatives: a child applies for one or the other, depending on how the consulate treats the child.\n4. The Toronto consulate quotes about 4 business days and the Embassy about 10 business days from complete materials; the date here is a planning estimate, so move it to 2 months before travel.\n5. A child already holding a valid Chinese passport uses that instead.\n6. Confirm the child\'s status with the Chinese embassy or a consulate in Canada before applying.',
    },
    {
      id: 'china-visa',
      title: 'Apply for a Chinese visa in the Canadian passport for a first trip to China',
      offsetDays: 180,
      durationDays: 14,
      dependsOn: ['passport', 'nationality-position'],
      documents: ['Chinese visa'],
      prepare: [
        'Child\'s valid Canadian passport',
        'Invitation letter and the relative\'s Chinese ID copy, for a family visit (Q2) or family reunion (Q1)',
        'Birth certificate, as proof of the relationship',
        'Parents\' status documents at the birth',
      ],
      ages: { from: 0, to: 17 },
      conditions: ['Only if the embassy or consulate treats the child as a foreign national'],
      howTo:
        '1. Ordinary visas are applied for through a Chinese Visa Application Service Center in Canada, with online forms at visaforchina.cn; standard processing is about 4 business days.\n2. Q2 is for a short family visit of up to 180 days; Q1 is for family reunion residence of more than 180 days.\n3. For a Q1 visa for fosterage (寄养) of a child with a Chinese-citizen parent, the Toronto consulate lists proof that the Chinese parent had settled abroad at the birth; this ties back to Article 5 of the Nationality Law.\n4. A visa-free policy for Canadian ordinary passports, announced to run until 31 December 2026, covers visits of up to 30 days; check whether it is still in force and whether it applies to the child.\n5. Confirm the child\'s status with the Chinese embassy or a consulate in Canada before applying.\n6. The date here is a planning estimate; move it to 1 month before travel.',
    },
    {
      id: 'citizenship-certificate',
      title: 'Apply for a Canadian citizenship certificate as extra proof',
      offsetDays: 365,
      durationDays: 180,
      dependsOn: [],
      documents: ['Canadian citizenship certificate'],
      prepare: ['Birth certificate', 'Parent\'s ID', 'Check current IRCC processing times'],
      ages: { from: 0, to: 17 },
      conditions: ['Only if you want proof of Canadian citizenship besides the provincial birth certificate'],
      howTo:
        '1. A citizenship certificate is IRCC\'s proof of Canadian citizenship; for a child born in Canada, the provincial birth certificate is already accepted as proof for a passport.\n2. A parent at birth can apply for a child under 18.\n3. IRCC publishes current processing times; the 6 months here is a planning estimate.',
    },
    {
      id: 'choice-at-18',
      title: 'At 18: what each nationality path involves',
      offsetDays: 6575,
      durationDays: 1,
      dependsOn: [],
      documents: [],
      prepare: [
        'Canadian passport and birth certificate',
        'Any Chinese travel document or passport issued so far',
        'The parents\' status records from the birth',
      ],
      ages: { from: 18, to: 18 },
      howTo:
        '1. This is information only; which path, if any, is the person\'s own decision.\n2. China does not recognise dual nationality for Chinese nationals (Nationality Law, Article 3).\n3. Keeping Canadian citizenship only: a Chinese national who has settled abroad and acquired a foreign nationality of their own free will loses Chinese nationality automatically (Article 9); a Chinese national settled abroad can also apply to renounce it (Article 10), through a Chinese embassy or consulate abroad.\n4. Taking Chinese nationality: a foreign national with Chinese-national close relatives can apply to be naturalized (Article 7) and does not keep the foreign nationality once approved (Article 8); the application includes a written declaration giving up the foreign nationality.\n5. Giving up Canadian citizenship: IRCC accepts renunciation from someone at least 18 who is, or will become, a citizen of another country and does not live in Canada.\n6. Before 18, parents or other legal representatives can file nationality applications for a child (Article 14).\n7. Confirm the person\'s status with the Chinese embassy or a consulate in Canada.',
    },
  ],
};
