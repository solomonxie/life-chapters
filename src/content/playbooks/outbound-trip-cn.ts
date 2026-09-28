import type { Playbook } from '../../domain/types';

export const outboundTripCn: Playbook = {
  id: 'outbound-trip-cn',
  title: 'Travelling abroad from China',
  summary:
    'Paperwork plan for a mainland resident going abroad or to Hong Kong, Macao or Taiwan: passport or travel permit and endorsement, the destination\'s visa, foreign currency, insurance, leaving and coming back through customs.',
  region: 'China',
  country: 'CN',
  family: 'outbound-trip',
  leaving: true,
  anchorKind: 'trip',
  conditions: [
    'You live in mainland China and hold a Chinese passport or travel permit',
    'You are travelling for a visit, holiday or business, not moving abroad',
    'The date is the day you leave',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'National Immigration Administration',
      url: 'https://www.nia.gov.cn/',
    },
    {
      title: 'National Immigration Administration: Photo guide for exit-entry documents (出入境证件相片照相指引)',
      url: 'http://www.nia.gov.cn/n741445/n741619/n894511/c896346/content.html',
    },
    {
      title: 'Exit and Entry Administration Law of the PRC — National Immigration Administration',
      url: 'https://en.nia.gov.cn/n147418/n147458/c155978/content.html',
    },
    {
      title: 'China Consular Service Network (中国领事服务网) — Ministry of Foreign Affairs',
      url: 'https://cs.mfa.gov.cn/',
    },
    {
      title: 'Notice on further facilitating personal current account foreign exchange business — State Administration of Foreign Exchange',
      url: 'https://www.safe.gov.cn/safe/2021/0402/18672.html',
    },
    {
      title: 'State Administration of Foreign Exchange',
      url: 'https://www.safe.gov.cn/',
    },
    {
      title: 'General Administration of Customs',
      url: 'http://www.customs.gov.cn/',
    },
  ],
  steps: [
    {
      id: 'passport',
      title: 'Check or apply for the passport (普通护照)',
      offsetDays: -90,
      durationDays: 14,
      dependsOn: [],
      documents: ['Passport'],
      prepare: ['Resident ID card', 'Photo meeting the exit-entry photo rules, or taken at the office', 'Old passport, if any'],
      conditions: ['Only if you are going to a foreign country'],
      howTo:
        '1. Mainland residents can apply for an ordinary passport at any exit-entry administration office in the country, or book through the NIA 12367 app.\n2. Many countries ask for at least 6 months of validity left at entry and blank visa pages.\n3. Some groups, such as certain public employees, go through their employer first.\n4. The 14 days is an estimate; check current processing times locally.',
    },
    {
      id: 'visa',
      title: 'Get the destination\'s visa or confirm visa-free entry',
      offsetDays: -45,
      durationDays: 30,
      dependsOn: ['passport'],
      documents: ['Visa or entry authorisation'],
      prepare: ['Passport', 'Bookings and itinerary', 'Bank statements, employment letter or invitation, as the destination asks'],
      conditions: ['Only if you are going to a foreign country'],
      howTo:
        '1. Entry rules are set by the destination, not China; its embassy or official visa site is the reference.\n2. The China Consular Service Network lists which countries let Chinese passport holders in visa-free or with a visa on arrival.\n3. Some countries want an online authorisation before travel even without a visa.\n4. Processing times vary widely; the 30 days is an estimate.',
    },
    {
      id: 'hk-macao',
      title: 'Get the Hong Kong and Macao permit and endorsement (港澳通行证 / 签注)',
      offsetDays: -30,
      durationDays: 10,
      dependsOn: [],
      documents: ['Exit-Entry Permit for Travelling to and from Hong Kong and Macao (往来港澳通行证)', 'Endorsement (签注)'],
      prepare: ['Resident ID card', 'Photo meeting the exit-entry photo rules'],
      conditions: ['Only if you are going to Hong Kong or Macao'],
      howTo:
        '1. Mainland residents travel to Hong Kong and Macao on the permit, not a passport; each trip type needs an endorsement (签注), such as tourism, business or family visit.\n2. The permit for adults is valid for 10 years; endorsements are valid for a set time and number of trips.\n3. Endorsements can often be added again at self-service machines in exit-entry offices.\n4. Check current endorsement types for your hukou city.',
    },
    {
      id: 'taiwan',
      title: 'Get the Taiwan permit and endorsement (往来台湾通行证 / 签注)',
      offsetDays: -45,
      durationDays: 14,
      dependsOn: [],
      documents: ['Travel Permit to and from Taiwan (往来台湾通行证)', 'Endorsement (签注)'],
      prepare: ['Resident ID card', 'Photo meeting the exit-entry photo rules', 'Purpose of the trip and supporting papers'],
      conditions: ['Only if you are going to Taiwan'],
      howTo:
        '1. Mainland residents travel to Taiwan on this permit with an endorsement for the trip type.\n2. An entry permit from the Taiwan side is also needed.\n3. Which trip types are open changes over time; check current rules with the exit-entry office before booking.',
    },
    {
      id: 'insurance',
      title: 'Buy travel insurance',
      offsetDays: -21,
      durationDays: 3,
      dependsOn: [],
      documents: ['Travel insurance policy'],
      prepare: ['Travel dates and countries', 'Medical cover amount the visa asks for, if any'],
      howTo:
        '1. Basic medical insurance in China generally does not pay for treatment abroad.\n2. Some visas, such as Schengen visas, ask for proof of travel medical insurance with a minimum cover.\n3. Check what it pays for medical care, evacuation, delays and lost baggage. Not financial advice.',
    },
    {
      id: 'money',
      title: 'Arrange foreign currency and cards (购汇)',
      offsetDays: -14,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['Resident ID card', 'Bank card that works abroad, e.g. UnionPay or Visa or Mastercard', 'Some cash in the local currency'],
      howTo:
        '1. Individuals can buy foreign currency at banks within a yearly convenience quota (年度便利化额度), currently US$50,000 a person; check current with the bank or SAFE.\n2. The quota is for current items such as travel and study; it does not cover things like buying property or securities abroad.\n3. Tell the bank about the trip so cards are not blocked, and check fees for spending abroad.\n4. Carrying cash out above set limits needs a customs declaration; check current limits.',
    },
    {
      id: 'register',
      title: 'Save consular contacts and register the trip',
      offsetDays: -3,
      durationDays: 1,
      dependsOn: [],
      documents: [],
      prepare: ['The 中国领事 app', 'Embassy or consulate contacts at the destination', 'Global consular protection hotline number'],
      conditions: ['Optional'],
      howTo:
        '1. The 中国领事 (China Consular) app has voluntary registration of Chinese citizens abroad and travel alerts for each country.\n2. The embassy or consulate at the destination helps with lost passports and emergencies.\n3. Check the app for current travel reminders before leaving.',
    },
    {
      id: 'exit',
      title: 'Leave through the border check',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['passport', 'visa', 'hk-macao', 'taiwan'],
      documents: ['Passport or travel permit', 'Visa or endorsement', 'Boarding pass'],
      prepare: ['Return or onward ticket', 'Customs declaration, if carrying cash or goods above the limits'],
      howTo:
        '1. Adults with a passport or permit and a recorded fingerprint can usually use the self-service e-channels (自助通道).\n2. The border officer or e-channel checks the document and, for Hong Kong, Macao and Taiwan, the endorsement.\n3. Keep the boarding pass until you are back.',
    },
    {
      id: 'return',
      title: 'Come back through customs with goods bought abroad',
      offsetDays: 7,
      durationDays: 1,
      dependsOn: ['exit'],
      documents: ['Passport or travel permit', 'Receipts for goods bought abroad'],
      prepare: ['List and value of goods bought abroad', 'Cash carried, if large'],
      howTo:
        '1. Residents coming back have a duty-free allowance for personal goods bought abroad, plus a separate one for arrival duty-free shops; check current figures with customs.\n2. Goods above the allowance, or cash above the set limit, go through the red declaration channel; otherwise the green channel.\n3. Some items, such as certain foods, plants and meat, are restricted.\n4. The date assumes a one-week trip; move it to your return day.',
    },
  ],
};
