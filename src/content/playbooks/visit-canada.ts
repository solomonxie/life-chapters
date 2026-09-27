import type { Playbook } from '../../domain/types';

const IRCC = 'https://www.canada.ca/en/immigration-refugees-citizenship/services';

export const visitCanada: Playbook = {
  id: 'visit-canada',
  title: 'Visitors to Canada · visa, super visa, eTA',
  summary:
    'Paperwork plan for hosting relatives or friends from abroad, from checking whether they need a visa or eTA to the invitation letter, arrival, extensions and leaving on time.',
  region: 'Canada',
  country: 'CA',
  family: 'visit',
  anchorKind: 'visit',
  conditions: [
    'You live in Canada and are hosting someone coming from abroad',
    'They are visiting, not moving to Canada for work, study or permanent residence',
    'The date is the day they arrive in Canada',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    { title: 'Find out if you need a visa or eTA — Canada.ca', url: `${IRCC}/visit-canada/check-visa-eta.html` },
    { title: 'Entry requirements by country or territory — Canada.ca', url: `${IRCC}/visit-canada/entry-requirements-country.html` },
    { title: 'eTA for certain visa-required travellers — Canada.ca', url: `${IRCC}/visit-canada/eta/eligibility/eta-x.html` },
    { title: 'About the visitor visa — Canada.ca', url: `${IRCC}/visit-canada/about-visitor-visa.html` },
    { title: 'Apply for a visitor visa — Canada.ca', url: `${IRCC}/visit-canada/apply-visitor-visa.html` },
    { title: 'Letter of invitation — Canada.ca', url: `${IRCC}/visit-canada/letter-invitation.html` },
    { title: 'Parent and grandparent super visa — Canada.ca', url: `${IRCC}/visit-canada/parent-grandparent-super-visa/about.html` },
    { title: 'Super visa: Who can apply — Canada.ca', url: `${IRCC}/visit-canada/parent-grandparent-super-visa/eligibility.html` },
    { title: 'Super visa: Forms and documents — Canada.ca', url: `${IRCC}/visit-canada/parent-grandparent-super-visa/forms-documents.html` },
    {
      title: 'Super visa: Host financial support and minimum income — Canada.ca',
      url: `${IRCC}/visit-canada/parent-grandparent-super-visa/forms-documents/host-financial-support.html`,
    },
    { title: 'Super visa: Length of stay in Canada — Canada.ca', url: `${IRCC}/visit-canada/parent-grandparent-super-visa/length-stay-canada.html` },
    {
      title: 'Medical exam requirements for visitors — Canada.ca',
      url: `${IRCC}/application/medical-police/medical-exams/requirements-temporary-residents.html`,
    },
    { title: 'Biometrics — Canada.ca', url: `${IRCC}/biometrics.html` },
    { title: 'Biometrics: When to give them — Canada.ca', url: `${IRCC}/biometrics/when-to-give.html` },
    { title: 'Biometrics: Where to give them — Canada.ca', url: `${IRCC}/biometrics/where-to-give.html` },
    { title: 'Check processing times — Canada.ca', url: `${IRCC}/application/check-processing-times.html` },
    { title: 'Prepare for arrival as a visitor — Canada.ca', url: `${IRCC}/visit-canada/prepare-arrival.html` },
    { title: 'Travellers: Visiting Canada — Canada Border Services Agency', url: 'https://www.cbsa-asfc.gc.ca/travel-voyage/ivc-rnc-eng.html' },
    { title: 'Extend your stay in Canada as a visitor — Canada.ca', url: `${IRCC}/visit-canada/extend-stay.html` },
    { title: 'Visitor record: Who can apply — Canada.ca', url: `${IRCC}/visit-canada/extend-stay/eligibility.html` },
    {
      title: 'Study without a study permit — Canada.ca',
      url: `${IRCC}/study-canada/study-permit/eligibility/study-without-permit.html`,
    },
    {
      title: "Canada's health care system — Canada.ca",
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada/health-care/universal-system.html',
    },
  ],
  steps: [
    {
      id: 'entry-document',
      title: 'Check whether they need a visitor visa or an eTA',
      offsetDays: -200,
      durationDays: 7,
      dependsOn: [],
      documents: ['Passport'],
      prepare: [
        'The country that issued their passport',
        'Whether they held a Canadian visitor visa in the past 10 years or hold a valid US non-immigrant visa',
        'How long they plan to stay',
      ],
      howTo:
        "1. Answer IRCC's \"Find out if you need a visa or eTA\" questions for their passport; the answer decides the rest of this plan.\n2. Visa-exempt passports need an electronic travel authorization (eTA) to fly in; visa-required passports need a visitor visa, also called a temporary resident visa (TRV).\n3. China is on IRCC's list of visa-required countries, so a Chinese passport holder needs a visitor visa; China is not on the list of countries whose travellers can use an eTA instead.\n4. A visitor visa can be valid for up to 10 years, or until the passport or biometrics expire, whichever comes first; the officer decides single or multiple entry and the length.\n5. If a parent or grandparent wants to stay more than 6 months at a time, look at the super visa next.\n6. Not immigration advice; the IRCC pages are the reference.",
    },
    {
      id: 'super-visa',
      title: 'Decide on a super visa and check your income',
      offsetDays: -180,
      durationDays: 14,
      conditions: ['Only if a parent or grandparent wants to stay longer than 6 months at a time'],
      dependsOn: ['entry-document'],
      documents: ['Notice of assessment', 'Proof of Canadian citizenship or permanent residence'],
      prepare: [
        'Your family size, counted the way IRCC asks',
        'Your notice of assessment for either of the last 2 tax years',
        "A co-signer's income, if your spouse or partner is co-signing",
      ],
      howTo:
        '1. The super visa lets a parent or grandparent of a Canadian citizen or permanent resident stay for 5 years at a time, with multiple entries for up to 10 years.\n2. For 6 months or less, IRCC points to the regular visitor visa instead.\n3. You, the child or grandchild, meet the minimum necessary income for your family size, based on the low income cut-off (LICO); check the current table on the host financial support page.\n4. Family size counts you, your spouse or partner, your dependent children, the super visa applicants you invite, earlier super visa applicants still under your invitation, and anyone you sponsored whose undertaking is still in effect.\n5. A notice of assessment from the CRA is the main proof; a co-signer\'s income can be added.\n6. Your parent or grandparent also needs a signed invitation letter, private medical insurance and an immigration medical exam; the next steps cover those.',
    },
    {
      id: 'invitation',
      title: 'Write and sign the invitation letter',
      offsetDays: -150,
      durationDays: 14,
      dependsOn: ['entry-document'],
      documents: ['Letter of invitation', 'Proof of Canadian citizenship or permanent residence'],
      prepare: [
        "Their full name, date of birth, address and phone number, and your relationship",
        'Purpose of the trip, how long they plan to stay, where they will stay and how they will pay',
        'When they plan to leave Canada',
        'Your full name, date of birth, address and phone number in Canada, and job title',
        'Names and dates of birth of your spouse and dependants',
      ],
      howTo:
        '1. A visitor may need a letter of invitation from someone who lives in Canada; it helps but does not decide the application.\n2. IRCC suggests the letter covers the visitor: full name, date of birth, address and phone, your relationship, the purpose and length of the trip, where they will stay, how they will pay, and when they will leave.\n3. And you: full name, date of birth, address and phone in Canada, job title, whether you are a citizen or permanent resident with a copy of proof, and your family details.\n4. For a super visa, add a signed promise of financial support for the whole visit, proof of your income, and the list and number of people in your family size with each name and date of birth.\n5. Send them a signed scan to upload with the application.',
    },
    {
      id: 'short-course',
      title: 'Check whether a course during the visit needs a study permit',
      offsetDays: -150,
      durationDays: 14,
      conditions: ['Only if they plan to take a course or program while in Canada'],
      dependsOn: ['entry-document'],
      documents: ['Letter of acceptance'],
      prepare: ['Program length', 'Name of the school'],
      howTo:
        '1. IRCC says a study permit is not needed for a program that lasts 6 months or less.\n2. Studying without a permit means no work while studying.\n3. For a longer program, or to stay for school or work, see the "Relocating · work or study" plan instead of this one.',
    },
    {
      id: 'super-insurance',
      title: 'Buy the 1-year medical insurance for the super visa',
      offsetDays: -140,
      durationDays: 14,
      conditions: ['Only if they are applying for a super visa'],
      dependsOn: ['super-visa'],
      documents: ['Proof of private medical insurance'],
      prepare: [
        'A Canadian insurance company, or a company outside Canada approved by the minister',
        'Planned date of entry',
        'Paid in full, or in instalments with a deposit',
      ],
      howTo:
        '1. The super visa asks for proof of private health insurance valid for at least 1 year from the date of entry.\n2. It has to give at least $100,000 of emergency coverage.\n3. It comes from a Canadian insurance company or from a company outside Canada approved by the minister.\n4. It is paid in full, or in instalments with a deposit; IRCC does not accept quotes.\n5. Compare policies for pre-existing conditions and refunds if the visa is refused.',
    },
    {
      id: 'medical',
      title: 'Book the immigration medical exam',
      offsetDays: -140,
      durationDays: 21,
      validForDays: 365,
      conditions: [
        'Only if they are applying for a super visa, or staying over 6 months after living in certain countries',
      ],
      dependsOn: ['super-visa'],
      documents: ['Medical exam confirmation'],
      prepare: [
        'An approved panel physician near them, from the IRCC list',
        'Passport, medical records, list of current medications and vaccination records',
      ],
      howTo:
        '1. Super visa applicants take an immigration medical exam with a panel physician.\n2. Visitors staying more than 6 months also need one if they lived in or travelled to certain countries for 6 months or more in a row in the year before; 6 months or less usually needs none, except for jobs in health care, education or childcare.\n3. IRCC recommends an upfront exam before applying; the doctor sends results to IRCC.\n4. Results are valid for 12 months, so book close to the application.\n5. Keep the confirmation document to upload.',
    },
    {
      id: 'apply',
      title: 'Submit the visa application online',
      offsetDays: -120,
      durationDays: 7,
      dependsOn: ['entry-document', 'invitation', 'super-insurance', 'medical'],
      documents: ['Passport', 'Letter of invitation', 'Proof of financial support'],
      prepare: [
        'Passport valid at least 6 months past the travel date',
        'Bank statements with at least 6 months of history',
        'Previous passports and visas used to travel in the last 10 years',
        'Check the current application and biometrics fees',
      ],
      howTo:
        '1. The visitor applies through their IRCC account; after a short questionnaire it gives a personalized document checklist.\n2. IRCC suggests renewing the passport first if it expires within 6 months of the travel date.\n3. For an eTA instead, the online eTA form is short and usually quick; skip the biometrics step.\n4. Pay the biometrics fee with the application to avoid delays.',
    },
    {
      id: 'biometrics',
      title: 'Give fingerprints and photo at a visa application centre',
      offsetDays: -85,
      durationDays: 30,
      validForDays: 3652,
      conditions: ['Only if they need a visitor visa or super visa and are aged 14 to 79'],
      dependsOn: ['apply'],
      documents: ['Biometric instruction letter', 'Passport'],
      prepare: [
        'Book an appointment as soon as the biometric instruction letter (BIL) arrives',
        'Check whether biometrics given in the last 10 years are still on file',
      ],
      howTo:
        '1. After the fee is paid, IRCC sends a biometric instruction letter; the visitor has 30 days from getting it to give biometrics.\n2. Bring the letter and the passport to a visa application centre.\n3. Children under 14, people over 79, and eTA applicants are exempt.\n4. Temporary residence applicants give biometrics once every 10 years, and no visa is issued past 10 years from that date.',
    },
    {
      id: 'decision',
      title: 'Wait for the decision and send the passport for the visa',
      offsetDays: -30,
      durationDays: 50,
      dependsOn: ['biometrics'],
      documents: ['Visitor visa', 'Passport'],
      prepare: [
        'Check the IRCC processing time for their country',
        'Watch the IRCC account for requests',
      ],
      howTo:
        '1. Processing times vary by country and by how complete the application is; IRCC posts current estimates on its processing times page.\n2. The 50 days here is only a planning estimate; move this date to the posted time.\n3. If approved, the visa office asks for the passport so the visa can be printed in it.\n4. A super visa holder from a visa-exempt country gets a letter to show the border officer instead.',
    },
    {
      id: 'flights',
      title: 'Book flights once the visa is in the passport',
      offsetDays: -21,
      durationDays: 7,
      dependsOn: ['decision'],
      documents: ['Flight itinerary'],
      prepare: ['Check the visa dates and number of entries', 'Refundable fare if anything is still pending'],
      howTo:
        '1. Book after the visa or eTA is approved, so a refusal or delay does not cost the fare.\n2. Match the return date to the stay planned in the invitation letter.',
    },
    {
      id: 'travel-insurance',
      title: 'Buy travel medical insurance for the visit',
      offsetDays: -14,
      durationDays: 7,
      conditions: ['Only if they are not on a super visa'],
      dependsOn: ['decision'],
      documents: ['Travel insurance policy'],
      prepare: ['Trip dates', 'Pre-existing conditions to declare'],
      howTo:
        '1. Provincial public health insurance is for Canadian citizens and permanent residents, so visitors are generally not covered.\n2. Travel medical insurance for the whole stay is recommended, not asked for, on a regular visitor visa or eTA.\n3. Cover the full stay, including any planned extension.',
    },
    {
      id: 'arrival',
      title: 'Arrival: meet the border officer',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['flights', 'travel-insurance'],
      documents: ['Passport', 'Visitor visa', 'Letter of invitation', 'Proof of private medical insurance'],
      prepare: [
        'Your address and phone number for them to give the officer',
        'Return ticket and proof of funds in carry-on',
        'For a super visa, ask the officer to stamp the passport as proof of entry',
      ],
      howTo:
        "1. A Canada Border Services Agency (CBSA) officer checks identity, travel documents, health, funds, ties to home and plans to leave.\n2. Most visitors can stay up to 6 months; the officer may stamp the passport or issue a visitor record with the leave-by date.\n3. With no stamp, the stay ends 6 months after arrival, or when the passport or biometrics expire if sooner.\n4. A super visa holder can stay 5 years at a time; at a kiosk airport, ask for a passport stamp as proof of the entry date.\n5. Note the leave-by date; the rest of this plan uses it.",
    },
    {
      id: 'extend',
      title: 'Apply for a visitor record to extend the stay',
      offsetDays: 150,
      durationDays: 14,
      conditions: ['Only if they want to stay past the date the officer gave them'],
      dependsOn: ['arrival'],
      documents: ['Visitor record', 'Passport', 'Proof of financial support'],
      prepare: ['The leave-by date from the stamp or visitor record', 'Reason for staying longer', 'Proof of funds and insurance for the extra time'],
      howTo:
        '1. To stay longer as a visitor, apply online for a visitor record.\n2. IRCC asks for the application at least 30 days before the current status expires.\n3. The date here assumes a 6-month stay; move it to 30 days before the real leave-by date.\n4. Processing times vary; check the IRCC processing times page.',
    },
    {
      id: 'leave',
      title: 'Leave on time and keep the records',
      offsetDays: 180,
      durationDays: 1,
      dependsOn: ['arrival'],
      documents: ['Passport', 'Boarding pass'],
      prepare: [
        'Copies of the visa, passport stamps and visitor record',
        'Boarding passes and the invitation letter',
      ],
      howTo:
        '1. Leave by the date on the stamp or visitor record, or 6 months after arrival if there is neither.\n2. Keep the visa, stamps, boarding passes and invitation letter; the next application asks about travel in the last 10 years.\n3. A multiple-entry visa can be used again while it and the passport are valid.\n4. The 180 days here is an estimate; move it to the real leave-by date.',
    },
  ],
};
