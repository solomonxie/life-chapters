import type { Playbook } from '../../domain/types';

const BI = 'https://immigration.gov.ph';

export const visaPhCn: Playbook = {
  id: 'visa-ph-cn',
  title: 'Visiting the Philippines · Chinese passport',
  summary:
    'Paperwork plan for a short visit to the Philippines on a Chinese passport, from the eVisa or 9(a) temporary visitor visa to eTravel, arrival, extensions at the Bureau of Immigration and leaving on time.',
  region: 'Philippines',
  country: 'PH',
  family: 'visa-ph',
  citizen: 'CN',
  anchorKind: 'trip',
  ages: { from: 0 },
  conditions: [
    "You hold a passport of the People's Republic of China (mainland ordinary passport)",
    'You are visiting the Philippines for tourism or to see family or friends',
    'Not for work, study or long stays; those use other visas',
    'The date is the day you arrive in the Philippines',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    { title: 'Visa (Updated), including eVisa for Chinese nationals, 26 November 2025 — Philippine Consulate General in Shanghai', url: 'https://shanghaipcg.dfa.gov.ph/consular-services/visa' },
    { title: 'Philippine visa policy and 9(a) requirements — eVisaPH, Department of Foreign Affairs', url: 'https://evisa.gov.ph/page/policy' },
    { title: 'Philippine e-Visa FAQs — eVisaPH, Department of Foreign Affairs', url: 'https://evisa.gov.ph/frequently-ask-questions' },
    { title: 'Philippines visa application centre in China — VFS Global', url: 'https://visa.vfsglobal.com/chn/en/phl/' },
    { title: 'Philippine Embassy in Beijing — Department of Foreign Affairs', url: 'https://beijingpe.dfa.gov.ph/' },
    { title: 'eTravel — Philippine Travel Information System', url: 'https://etravel.gov.ph/' },
    { title: 'Temporary Visitor (9A) visa waiver and extensions beyond 59 days — Bureau of Immigration', url: `${BI}/visas/visa-waiver` },
    { title: 'Tourist visa extension online — Bureau of Immigration e-services', url: 'https://e-services.immigration.gov.ph/TouristVisaExtension' },
    { title: 'Waiver of Exclusion Ground — Bureau of Immigration e-services', url: `${BI}/waiver-for-exclusion-ground/` },
  ],
  steps: [
    {
      id: 'entry-check',
      title: 'Check whether you need a visa for the Philippines',
      offsetDays: -120,
      durationDays: 7,
      dependsOn: [],
      documents: ['Passport'],
      prepare: ['Passport valid 6 months beyond the day you leave the Philippines', 'Purpose of the trip and how long you plan to stay', 'Where you live now: mainland China or another country'],
      howTo:
        "1. China is not on the Philippines' list of countries allowed a 30-day visa-free stay under Executive Order No. 408, as posted by the consulate in Shanghai in November 2025, so a mainland Chinese passport holder generally needs a visa.\n2. Visa-free entry for Chinese nationals holding certain other countries' visas or residence has been offered and suspended at different times; check current with the embassy or consulate before relying on it.\n3. The passport has to be machine readable and valid at least 6 months beyond the intended stay.\n4. Not immigration advice; the DFA and Bureau of Immigration are the reference.",
    },
    {
      id: 'visa-route',
      title: 'Pick the route: eVisa, 9(a) sticker visa or tour group',
      offsetDays: -110,
      durationDays: 7,
      dependsOn: ['entry-check'],
      documents: [],
      prepare: [
        'Length of stay: more than 14 days, or a chance you will want to extend, points to a sticker visa',
        'Airport of arrival: the eVisa is only for Manila (NAIA) or Mactan-Cebu',
        'Whether you are joining a tour from an accredited Chinese travel agency',
      ],
      howTo:
        "1. Since November 1, 2025, Chinese nationals living in China can apply for a Philippine eVisa through VFS Global; it allows a stay of up to 14 days, cannot be extended or converted, and is for arrivals at NAIA or Mactan-Cebu airports.\n2. The 9(a) temporary visitor visa, subclass 9(a-2) tourism or leisure, covers visits to family, relatives or friends; in China it is a sticker visa filed at the Philippine visa application centre (VFS), in person or by mail.\n3. Tour groups go through Chinese travel agencies accredited with the embassy or consulate; the agency files the group visa.\n4. Other visa types, and visas you plan to convert in the Philippines, are handled by the consulate directly.",
    },
    {
      id: 'child-docs',
      title: "Gather a child's papers",
      offsetDays: -90,
      durationDays: 14,
      ages: { from: 0, to: 17 },
      conditions: ['Only if a child under 18 is travelling'],
      dependsOn: ['visa-route'],
      documents: ['Birth certificate', 'Passport'],
      prepare: [
        "Birth medical certificate (出生医学证明) or notarial certificate of kinship (亲属关系公证书), with an English translation",
        'Letter of permission from a parent or guardian, if the child is not travelling with one',
        'For a child under 15 travelling without a parent, a waiver of exclusion ground (WEG) from the Bureau of Immigration (check current)',
      ],
      howTo:
        "1. The DFA's 9(a) requirements add a letter of permission from a parent or guardian for minors not travelling with a parent or guardian.\n2. The Bureau of Immigration handles the waiver of exclusion ground for young foreign children arriving without a parent; check the current age limit and fee on its site.\n3. Each child has their own passport and application.",
    },
    {
      id: 'host-docs',
      title: 'Ask your host in the Philippines for an invitation letter',
      offsetDays: -80,
      durationDays: 21,
      conditions: ['Only if visiting family or friends, or a sponsor is paying for the trip'],
      dependsOn: ['visa-route'],
      documents: ['Letter of invitation', 'Proof of relationship'],
      prepare: [
        'Notarized invitation letter from the person in the Philippines, with a copy of their valid Philippine ID',
        "Sponsor's letter of support with proof of the sponsor's finances, if they are paying",
        'Proof of relationship, e.g. a notarial certificate of kinship or marriage certificate',
        "Host's address where you will stay",
      ],
      howTo:
        "1. The Shanghai consulate's 9(a) checklist asks for an original notarized invitation letter from a Philippine-based company or person, with the signer's valid Philippine ID.\n2. A sponsor who pays for the trip adds a letter of support with proof of their finances, which the DFA accepts as proof of financial capacity.\n3. Have the host send originals early; courier from the Philippines can take a week or more.",
    },
    {
      id: 'own-docs',
      title: 'Gather your own documents',
      offsetDays: -60,
      durationDays: 21,
      dependsOn: ['visa-route'],
      documents: ['Passport', 'Passport photo', 'Bank statements', 'Employment letter'],
      prepare: [
        'Visa application form (printed for a sticker visa; online for the eVisa)',
        'Passport original and copy, and Chinese ID card (居民身份证) original and copy',
        'Employment certificate (在职证明) or business licence copy, as ties to home',
        'Bank statements for the last 3 to 6 months, or property certificates',
        'Flight reservation in and out (not a paid ticket yet) and hotel booking',
      ],
      howTo:
        '1. The DFA minimum for tourism: flight reservation in and out, proof of financial capacity (bank statements for the last 6 months, employment certificate with pay, business income, or a sponsor), proof of ties to home (job, property), itinerary and lodging.\n2. The Shanghai consulate asks you not to buy the ticket until the visa is issued; a reservation is enough.\n3. Translate Chinese documents into English where the checklist asks.',
    },
    {
      id: 'apply-china',
      title: 'Apply in China: eVisa online or sticker visa at VFS',
      offsetDays: -35,
      durationDays: 14,
      conditions: ['Only if you live in mainland China'],
      dependsOn: ['own-docs', 'host-docs', 'child-docs'],
      documents: ['Passport', 'Visa application form'],
      prepare: [
        'Which Philippine post covers where you live: the Beijing embassy or a consulate (Shanghai covers Shanghai, Anhui, Hubei, Jiangsu and Zhejiang)',
        'An account on the VFS Global Philippines site for China',
        'Check the current visa and service fees',
      ],
      howTo:
        '1. eVisa: register on the VFS Global Philippines page for China, fill in the form, upload documents and pay; the fee is not refunded if refused, and an unpaid application lapses after 48 hours.\n2. The DFA says eVisas take about 7 to 12 working days for single entry and 15 to 21 for multiple entry; the officer can call you for an interview.\n3. Sticker 9(a) visa: submit at the Philippine visa application centre in person or by mail; the consulate can ask for a personal appearance and interview.\n4. Apply early enough to leave time for an interview; the 14 days here are an estimate.',
    },
    {
      id: 'apply-abroad',
      title: 'Apply from the country where you live',
      offsetDays: -35,
      durationDays: 14,
      conditions: ['Only if you live legally outside mainland China, e.g. in Canada'],
      dependsOn: ['own-docs', 'host-docs', 'child-docs'],
      documents: ['Passport', 'Residence permit', 'Visa application form'],
      prepare: [
        'Proof of legal residence (PR card, residence permit or long-term visa)',
        'The Philippine embassy or consulate covering your address',
        'Whether that post takes eVisa applications for Chinese nationals (check current)',
      ],
      howTo:
        "1. The eVisa system lets a foreign national apply through the Philippine post for their country of origin or legal residence; the China eVisa channel described by the consulates is for Chinese nationals living in China.\n2. Living elsewhere, apply to the Philippine embassy or consulate for where you live, with proof of legal residence there; check its page for Chinese applicants.\n3. If you may want to extend or convert your stay, ask for a regular sticker visa; the DFA says eVisas cannot be converted or extended.",
    },
    {
      id: 'decision',
      title: 'Get the visa and check its details',
      offsetDays: -14,
      durationDays: 14,
      dependsOn: ['apply-china', 'apply-abroad'],
      documents: ['Visa', 'Passport'],
      prepare: ['Name and passport number', 'Entries, validity and length of stay', 'Port of entry named on an eVisa'],
      howTo:
        '1. eVisas arrive by email and in your eVisa account; a sticker visa comes back in the passport.\n2. The eVisa is tied to that passport; if the passport is lost, a new eVisa application is needed.\n3. Book the flight once the visa is issued.',
    },
    {
      id: 'etravel',
      title: 'Register on eTravel within 72 hours before arrival',
      offsetDays: -3,
      durationDays: 3,
      dependsOn: ['decision'],
      documents: ['Passport', 'Flight itinerary'],
      prepare: ['Flight number and arrival date', 'Address in the Philippines', 'A phone to save the QR code'],
      howTo:
        '1. All inbound travellers fill in eTravel at etravel.gov.ph or in the eGovPH app; it is free.\n2. Register no earlier than 72 hours before arrival; airlines can ask for the QR code at boarding.\n3. Beware of paid look-alike sites.',
    },
    {
      id: 'arrival',
      title: 'Arrival: meet the immigration officer',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['etravel'],
      documents: ['Passport', 'Visa', 'Flight itinerary'],
      prepare: ['Return or onward ticket', 'Hotel booking or host address', 'eTravel QR code'],
      howTo:
        "1. The DFA notes a visa does not mean automatic admission; the Bureau of Immigration officer decides at the port of entry.\n2. eVisa holders arrive at NAIA or Mactan-Cebu only.\n3. Note the period of stay stamped in the passport; the rest of this plan uses it.",
    },
    {
      id: 'extend',
      title: 'Extend your stay with the Bureau of Immigration',
      offsetDays: 10,
      durationDays: 7,
      conditions: ['Only if you hold a sticker visa (not an eVisa) and want to stay past the date you were given'],
      dependsOn: ['arrival'],
      documents: ['Passport'],
      prepare: ['Application form (CGAF) from the BI website', 'Return ticket and proof of funds', 'Check the current fees'],
      howTo:
        "1. eVisas cannot be extended, so this is for sticker visa holders.\n2. Apply before your stay ends at the BI main office, an authorised immigration office, or online through the BI tourist visa extension e-service.\n3. Stays beyond 59 days bring extra charges, such as an ACR I-Card for tourists; the BI publishes the fee tables.\n4. Overstaying brings fines per month; extend before the stamped date.\n5. The date here is an estimate; move it to before your stamped date.",
    },
    {
      id: 'leave',
      title: 'Leave on time and keep the records',
      offsetDays: 14,
      durationDays: 1,
      dependsOn: ['arrival'],
      documents: ['Passport', 'Boarding pass'],
      prepare: ['The last day of your authorised stay', 'Copies of the visa and extension receipts'],
      howTo:
        '1. Leave by the last day stamped in the passport or given in an extension.\n2. Staying 6 months or more can bring an emigration clearance certificate at departure; check current with the BI.\n3. The 14 days here match the eVisa stay; move it to your real date.',
    },
  ],
};
