import type { Playbook } from '../../domain/types';

const EMBASSY = 'https://ca.china-embassy.gov.cn/eng';
const NIA = 'https://en.nia.gov.cn/n147418';

export const travelCn: Playbook = {
  id: 'travel-cn',
  title: 'Travelling to China · visa and arrival',
  summary:
    'Paperwork plan for a trip to mainland China on a foreign passport, from visa-free entry or a visa to the arrival card, accommodation registration, payments and leaving on time.',
  region: 'China',
  country: 'CN',
  family: 'travel',
  anchorKind: 'trip',
  conditions: [
    'You are travelling to mainland China on a foreign passport, e.g. Canadian',
    'You are visiting, not moving to China for work or study',
    'The date is the day you leave for China',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Notice on Visa-free Policy for Canada and the UK — Chinese Embassy in Canada',
      url: `${EMBASSY}/lsyw/VisaforChina/202602/t20260216_11860601.htm`,
    },
    {
      title: 'FAQs on Visa-free Entry into China — Chinese Embassy in Canada',
      url: `${EMBASSY}/zytz_0/202602/t20260217_11860807.htm`,
    },
    {
      title: 'List of Countries Covered by Unilateral Visa Exemption Policies — National Immigration Administration',
      url: `${NIA}/n147463/c183390/content.html`,
    },
    {
      title: 'Visa-Free Transit Policies — National Immigration Administration',
      url: `${NIA}/n147463/c183412/content.html`,
    },
    {
      title: 'Visa Requirements and Procedures for Chinese Visa Application — Chinese Embassy in Canada',
      url: `${EMBASSY}/lsyw/VisaforChina/201908/t20190828_4665570.htm`,
    },
    {
      title: 'Notice on the Launch of China Online Visa Application System — Chinese Embassy in Canada',
      url: `${EMBASSY}/lsyw/VisaforChina/202509/t20250913_11707906.htm`,
    },
    {
      title: 'Notice on Fingerprints Collection Exemptions for Chinese Visa Applications — Chinese Embassy in Canada',
      url: `${EMBASSY}/lsyw/VisaforChina/202512/t20251218_11776086.htm`,
    },
    {
      title: 'Consular Jurisdiction and Contact Information — Chinese Embassy in Canada',
      url: `${EMBASSY}/lsyw/ConJurisConInfo/`,
    },
    {
      title: 'Ottawa Chinese Visa Application Service Center',
      url: 'https://www.visaforchina.cn/YOW3_EN/qianzhengyewu',
    },
    {
      title: 'Beware of Fraudulent Websites for Arrival Card Filling — National Immigration Administration',
      url: `${NIA}/n147463/c191530/content.html`,
    },
    {
      title: 'Online Arrival Card Filling — National Immigration Administration',
      url: 'https://s.nia.gov.cn/ArrivalCardFillingPC/',
    },
    {
      title: 'Policy Interpretation of the Nationwide Online Accommodation Registration for Foreigners — National Immigration Administration',
      url: `${NIA}/n147463/c237273/content.html`,
    },
    {
      title: 'Online channels for Accommodation Registration for Foreigners — National Immigration Administration',
      url: `${NIA}/n147463/c196956/content.html`,
    },
    {
      title: 'Exit and Entry Administration Law of the PRC — National Immigration Administration',
      url: `${NIA}/n147458/c155978/content.html`,
    },
    {
      title: 'Regulations on the Administration of Foreigners Entry and Exit — National Immigration Administration',
      url: `${NIA}/n147458/c155970/content.html`,
    },
    {
      title: 'Guide to Payment Services in China — Chinese Embassy in Canada',
      url: `${EMBASSY}/zytz_0/202607/t20260708_11977212.htm`,
    },
  ],
  steps: [
    {
      id: 'visa-free',
      title: 'Check whether you can enter visa-free',
      offsetDays: -90,
      durationDays: 3,
      dependsOn: [],
      documents: ['Passport'],
      prepare: [
        'Your passport country',
        'Purpose of the trip and number of days',
        'Onward ticket to a third country, for visa-free transit',
      ],
      howTo:
        "1. China's unilateral visa exemption (免签) covers ordinary Canadian passports from February 17, 2026 to December 31, 2026, for business, tourism, family or friends visits, exchange and transit.\n2. It allows up to 30 days per entry, counted from the day after arrival, through any port open to foreigners; multiple entries are allowed.\n3. For a trip after December 31, 2026, check the embassy or NIA list to see whether it was extended.\n4. The 240-hour visa-free transit (过境免签) covers Canada too: up to 10 days in the permitted areas, entering through one of 65 listed ports in 24 provinces, with a confirmed onward ticket to a third country or region.\n5. Neither covers work, study or news reporting; those need a visa.\n6. If visa-free fits your trip, mark the visa steps \"Not for me\". Not immigration advice; the embassy and NIA pages are the reference.",
    },
    {
      id: 'passport',
      title: 'Check passport validity and blank pages',
      offsetDays: -75,
      durationDays: 7,
      dependsOn: ['visa-free'],
      documents: ['Passport'],
      prepare: ['Expiry date', 'Number of blank visa pages'],
      howTo:
        '1. The embassy asks for a passport with at least 6 months of validity left and blank visa pages.\n2. If it falls short, renew it before applying for a visa or booking; renewals take weeks.',
    },
    {
      id: 'child-document',
      title: 'Check the travel document for a child with a Chinese parent',
      offsetDays: -60,
      durationDays: 30,
      conditions: ['Only for a child born in Canada to a Chinese-citizen parent'],
      dependsOn: ['visa-free'],
      documents: ['Birth certificate', 'Passport'],
      prepare: ["Parents' passports and status in Canada at the child's birth"],
      howTo:
        '1. Such a child may be treated as a Chinese citizen and travel on a Chinese travel document (旅行证, lǚxíngzhèng) rather than a visa on a Canadian passport.\n2. Which one applies depends on the parents\' status when the child was born.\n3. See the "Born in Canada to a Chinese parent" plan before choosing.',
    },
    {
      id: 'visa-type',
      title: 'Choose the visa type and gather the documents',
      offsetDays: -60,
      durationDays: 14,
      conditions: ['Only if you need a visa: the trip is longer, the purpose is not covered, or visa-free has ended'],
      dependsOn: ['visa-free', 'passport'],
      documents: ['Passport', 'Passport photo', 'Invitation letter', 'Flight itinerary'],
      prepare: [
        'L (tourism): round-trip booking and hotel reservations, or an invitation',
        "Q2 (visiting relatives who are Chinese citizens): the relative's invitation letter and a copy of their Chinese ID card",
        'M (business): an invitation from the trade partner or trade fair',
      ],
      howTo:
        "1. L is for tourism, Q2 for short visits to relatives who are Chinese citizens or foreigners with permanent residence in China (up to 180 days), M for business.\n2. A Q2 invitation letter gives your details, the visit (purpose, dates, places, relationship, who pays) and the inviter's details, with a copy of the inviter's Chinese ID card.\n3. For Q2, the embassy also lists proof of the family relationship: a birth or marriage certificate, or a kinship certificate from the public security bureau or a notary.\n4. Check whether your centre's checklist also asks for the relative's household register (户口本, hùkǒu běn).",
    },
    {
      id: 'visa-apply',
      title: 'Fill in the online form and book the visa centre',
      offsetDays: -45,
      durationDays: 7,
      conditions: ['Only if you need a visa'],
      dependsOn: ['visa-type'],
      documents: ['Visa application form'],
      prepare: [
        'Find the Chinese Visa Application Service Center for your consular district',
        'Scans of the documents to upload',
        'Check the current fee',
      ],
      howTo:
        '1. Since September 30, 2025, applicants in Canada fill in the form and upload documents on the China Online Visa Application system (COVA), then go to the Chinese Visa Application Service Center.\n2. Each centre serves a consular district; the embassy lists which one covers where you live.\n3. Print and sign the form and its confirmation page.',
    },
    {
      id: 'visa-collect',
      title: 'Submit, give fingerprints if asked, and collect the visa',
      offsetDays: -30,
      durationDays: 10,
      conditions: ['Only if you need a visa'],
      dependsOn: ['visa-apply'],
      documents: ['Chinese visa', 'Passport'],
      prepare: ['Original passport and printed form', 'Pickup receipt'],
      howTo:
        '1. From December 17, 2025 to December 31, 2026, short-term visa applicants staying 180 days or less are exempt from fingerprints; D, J1, Q1, S1, X1 and Z applicants still give them.\n2. The embassy lists regular processing as 3 working days, with express and rush for extra fees; the centre may take longer or ask for more documents or an interview.\n3. The 10 days here is a planning estimate that leaves room for mail and requests.',
    },
    {
      id: 'payments',
      title: 'Set up mobile payments with a foreign card',
      offsetDays: -14,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['A Visa, Mastercard or UnionPay card', 'Your phone number', 'Some cash as backup'],
      howTo:
        "1. Alipay and Weixin Pay (WeChat Pay) accept foreign phone numbers and let you add Visa, Mastercard, UnionPay, JCB, Diners Club and Discover cards.\n2. Set them up at home and make a small test payment.\n3. Foreign cards work where their logo is shown; UnionPay works at all merchant terminals on the mainland.\n4. The embassy's Guide to Payment Services in China walks through each option.",
    },
    {
      id: 'arrival-card',
      title: 'Fill in the arrival card online',
      offsetDays: -3,
      durationDays: 3,
      dependsOn: ['passport', 'visa-collect'],
      documents: ['Arrival card'],
      prepare: ['Passport and visa details', 'Flight number', 'Address of your first night'],
      howTo:
        '1. Since November 20, 2025, foreigners can submit the arrival card (入境卡, rùjìng kǎ) before travelling on the NIA website, the "NIA 12367" app, or WeChat and Alipay mini-programs.\n2. It is free; NIA warns of fake sites charging fees, so use only the official channels.\n3. Kiosks and paper cards are still available at the port.',
    },
    {
      id: 'entry',
      title: 'Enter China and note your stay limit',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['arrival-card', 'child-document'],
      documents: ['Passport', 'Chinese visa', 'Arrival card'],
      prepare: ['Onward or return ticket', 'Address and phone of where you stay', 'Invitation letter, if any'],
      howTo:
        "1. The border officer checks your passport, visa or visa-free eligibility, and arrival card.\n2. Visa-free days count from the day after arrival; on a visa, the stay is the duration printed on it.\n3. Write down the last day you can stay; the rest of this plan uses it.",
    },
    {
      id: 'registration',
      title: 'Register where you stay within 24 hours',
      offsetDays: 1,
      durationDays: 1,
      dependsOn: ['entry'],
      documents: ['Passport'],
      prepare: ["Your host's name and address", 'The "NIA 12367" app or mini-program'],
      howTo:
        '1. Accommodation registration (住宿登记, zhùsù dēngjì): hotels register guests for you.\n2. Staying with family or friends, you or your host register within 24 hours of arrival, online through the NIA website, the "NIA 12367" app, or WeChat and Alipay mini-programs, or in person at the local police station.\n3. Online registration counts the same as registering in person; missing it can bring a warning or a fine.\n4. Register again each time you move to a new home that is not a hotel.',
    },
    {
      id: 'sim',
      title: 'Get a local SIM card',
      offsetDays: 1,
      durationDays: 1,
      conditions: ['Only if you want a Chinese phone number'],
      dependsOn: ['entry'],
      documents: ['Passport'],
      prepare: ['Unlocked phone', 'Passport for real-name registration'],
      howTo:
        '1. Mobile numbers in China are registered in the user\'s real name, so carriers ask for your passport.\n2. Buy at a carrier store rather than a street stall.\n3. A local number makes app sign-ups and payments easier.',
    },
    {
      id: 'extend',
      title: 'Extend the stay at the exit-entry office',
      offsetDays: 20,
      durationDays: 7,
      conditions: ['Only if you need to stay longer than your visa or visa-free period'],
      dependsOn: ['entry'],
      documents: ['Passport', 'Stay permit'],
      prepare: ['Reason for staying longer', 'Accommodation registration record', 'Passport photo'],
      howTo:
        '1. Apply at the exit-entry administration of the local public security bureau (公安局出入境管理, gōng\'ānjú chūrùjìng guǎnlǐ) where you are staying.\n2. The Exit and Entry Administration Law asks for the application at least 7 days before the stay runs out, and the total extension cannot exceed the original stay.\n3. Visa-free travellers can also ask this office for a stay permit.\n4. The date here assumes a 30-day stay; move it to at least 7 days before your real last day.',
    },
    {
      id: 'residence',
      title: 'Change to a residence permit or a new purpose',
      offsetDays: 25,
      durationDays: 15,
      conditions: ['Only if you plan to live in China, e.g. family reunion with a Chinese spouse or parent'],
      dependsOn: ['entry'],
      documents: ['Residence permit', 'Passport'],
      prepare: ['Proof of the family relationship', 'Accommodation registration record'],
      howTo:
        '1. Holders of a Q1 (family reunion) or similar visa apply for a residence permit at the local exit-entry administration within 30 days of entry.\n2. The office decides within 15 days.\n3. A change of purpose can also be requested at that office after entry.\n4. For moving to China, see the "Relocating to China · Canadian with Chinese family" plan.',
    },
    {
      id: 'leave',
      title: 'Leave before the permitted stay ends',
      offsetDays: 29,
      durationDays: 1,
      dependsOn: ['entry'],
      documents: ['Passport', 'Boarding pass'],
      prepare: ['Your last permitted day', 'Keep the boarding pass and visa copies'],
      howTo:
        '1. Leave by the last day of your visa-free period, visa stay or extension.\n2. For 240-hour transit, leave for a third country within 10 days on the booked onward ticket.\n3. The date here assumes a 30-day visa-free stay; move it to your real last day.',
    },
  ],
};
