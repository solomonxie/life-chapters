import type { Playbook } from '../../domain/types';

export const relocationBc: Playbook = {
  id: 'relocation-bc',
  title: 'Relocating · work or study · British Columbia',
  summary:
    'Paperwork plan for moving to British Columbia on a study or work permit, from the permit and arrival to settling in and the first checks toward permanent residence.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'relocation',
  anchorKind: 'migrated',
  ages: { from: 18 },
  conditions: [
    'You are moving to British Columbia to work or study, without permanent residence',
    'You come on a study permit, an employer-specific work permit, or an open work permit such as International Experience Canada',
    'This is a planning aid, not immigration advice; IRCC and the BC PNP pages are the reference',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Study permit: Get the right documents — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html',
    },
    {
      title: 'Study permit: Prepare for arrival — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare-arrival.html',
    },
    {
      title: 'Work off campus as an international student — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html',
    },
    {
      title: 'Extend your study permit — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/extend-study-permit.html',
    },
    {
      title: 'Work permit types — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/work-permit-types.html',
    },
    {
      title: 'Extend or change the conditions on your work permit — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/extend.html',
    },
    {
      title: 'International Experience Canada — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html',
    },
    {
      title: 'About International Experience Canada — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec/about.html',
    },
    {
      title: 'Entry requirements by country or territory — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/entry-requirements-country.html',
    },
    {
      title: 'Biometrics — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/campaigns/biometrics.html',
    },
    {
      title: 'When to give your biometrics — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/biometrics/when-to-give.html',
    },
    {
      title: 'Check processing times — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html',
    },
    {
      title: 'Social Insurance Number: Eligibility — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/eligibility.html',
    },
    {
      title: 'Social Insurance Number: Apply — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/apply.html',
    },
    {
      title: 'Newcomers to Canada (immigrants) — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/newcomers-canada-immigrants.html',
    },
    {
      title: 'GST/HST credit — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/goods-services-tax-harmonized-sales-tax-gst-hst-credit.html',
    },
    {
      title: 'B.C. climate action tax credit — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/personal/credits/climate-action',
    },
    {
      title: 'MSP: How to enrol — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/how-to-enrol',
    },
    {
      title: 'Eligibility for MSP — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/are-you-eligible',
    },
    {
      title: 'Health fee for international students — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/accessing-health-care/health-fee-international-students',
    },
    {
      title: 'Get a BC Services Card — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/your-card/get-a-card',
    },
    {
      title: 'Health Connect Registry — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/health-connect-registry',
    },
    {
      title: 'Start a new tenancy — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/starting-a-tenancy',
    },
    {
      title: 'Tenancy deposits and fees — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/starting-a-tenancy/deposits-fees',
    },
    {
      title: 'Moving from outside Canada — ICBC',
      url: 'https://icbc.com/driver-licensing/moving-bc/moving-from-another-country',
    },
    {
      title: 'Canadian Experience Class — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/canadian-experience-class.html',
    },
    {
      title: 'Immigrate to B.C. as a worker — WelcomeBC',
      url: 'https://www.welcomebc.ca/immigrate-to-b-c/for-workers',
    },
  ],
  steps: [
    {
      id: 'route',
      title: 'Pick the permit route',
      offsetDays: -300,
      durationDays: 30,
      dependsOn: [],
      documents: ['Passport'],
      prepare: [
        'Study permit: a program at a designated learning institution (DLI) in B.C.',
        'Employer-specific work permit: a job offer, with or without an LMIA',
        'Open work permit: only in certain situations, such as the IEC Working Holiday category',
        'Check the passport stays valid for the whole stay',
      ],
      howTo:
        '1. IRCC lists the permit types: an employer-specific work permit needs a job offer, and the employer may need a labour market impact assessment (LMIA).\n2. An open work permit needs no job offer, but is only available in certain situations.\n3. A study permit needs a letter of acceptance from a DLI.\n4. The 10 months before arrival here is a planning estimate; check current IRCC processing times.',
    },
    {
      id: 'proof-of-funds',
      title: 'Get proof of funds',
      offsetDays: -170,
      durationDays: 14,
      dependsOn: ['route'],
      documents: ['Proof of funds'],
      prepare: [
        'Bank letters or statements in your name',
        'Check the current amount IRCC lists for your permit type',
        'Translations for documents not in English or French',
      ],
      howTo:
        '1. Study permit applications include proof of financial support; IRCC updates the amount, so check it on the study permit documents page.\n2. Proof of funds is also carried at the port of entry.\n3. Keep copies with the other travel documents.',
    },
    {
      id: 'study-loa-pal',
      title: 'Get the letter of acceptance and the Provincial Attestation Letter',
      offsetDays: -210,
      durationDays: 60,
      dependsOn: ['route'],
      documents: ['Letter of acceptance', 'Provincial Attestation Letter (PAL)'],
      prepare: [
        'Accept the offer from the DLI',
        'Pay the tuition deposit the school asks for',
        'Ask the school for the PAL',
      ],
      howTo:
        '1. A letter of acceptance from a DLI is always needed for a study permit.\n2. A provincial attestation letter (PAL) is needed in most cases; the school issues it, usually after the offer is accepted and tuition is paid in part or in full.\n3. Check the IRCC documents page for whether a PAL still applies to your program.',
      conditions: ['Only if you came on a study permit'],
    },
    {
      id: 'job-offer',
      title: 'Line up the job offer and the employer paperwork',
      offsetDays: -210,
      durationDays: 60,
      dependsOn: ['route'],
      documents: ['Job offer letter', 'LMIA or offer of employment details from the employer'],
      prepare: [
        'Signed job offer with duties, wage and location',
        'Ask the employer whether the job needs an LMIA or is LMIA-exempt',
        'Get the reference numbers the application asks for',
      ],
      howTo:
        '1. An employer-specific work permit ties you to one employer and one job.\n2. The employer may need an LMIA first; some jobs are exempt.\n3. LMIA timing depends on the employer and Employment and Social Development Canada, so the 2 months here is an estimate.',
      conditions: ['Only with a job offer', 'Only if you have an LMIA-based or LMIA-exempt employer-specific work permit'],
    },
    {
      id: 'iec',
      title: 'Get an IEC invitation and accept it',
      offsetDays: -200,
      durationDays: 60,
      dependsOn: ['route'],
      documents: ['IEC profile', 'Invitation to apply'],
      prepare: [
        'Check your country has an IEC arrangement and the age limit (18 to 35, or 18 to 30 in some countries)',
        'Create the IEC profile and enter the pool',
        'Watch the IRCC account for an invitation',
      ],
      howTo:
        '1. Working Holiday gives an open work permit; Young Professionals and International Co-op give an employer-specific one.\n2. After an invitation there are 10 days to accept or decline it, then 20 days to submit the work permit application.\n3. Invitations come in rounds, so the timing here is an estimate.',
      conditions: ['Only if you came on IEC / Working Holiday'],
    },
    {
      id: 'apply-study',
      title: 'Apply for the study permit',
      offsetDays: -150,
      durationDays: 14,
      dependsOn: ['study-loa-pal', 'proof-of-funds'],
      documents: ['Study permit application', 'Letter of acceptance', 'Provincial Attestation Letter (PAL)', 'Proof of funds'],
      prepare: ['IRCC secure account', 'Check the current fee', 'Colour scans of every document'],
      howTo:
        '1. The application is made online with the letter of acceptance, the PAL and proof of financial support.\n2. The permit itself is issued at the port of entry after approval.',
      conditions: ['Only if you came on a study permit'],
    },
    {
      id: 'apply-work',
      title: 'Apply for the employer-specific work permit',
      offsetDays: -150,
      durationDays: 14,
      dependsOn: ['job-offer', 'proof-of-funds'],
      documents: ['Work permit application', 'Job offer letter'],
      prepare: ['IRCC secure account', 'Check the current fee', 'Colour scans of every document'],
      howTo:
        '1. The application is made online with the employer details and the LMIA or offer of employment information.\n2. The permit itself is issued at the port of entry after approval.',
      conditions: ['Only with a job offer', 'Only if you have an LMIA-based or LMIA-exempt employer-specific work permit'],
    },
    {
      id: 'apply-open',
      title: 'Apply for the open work permit',
      offsetDays: -150,
      durationDays: 14,
      dependsOn: ['iec', 'proof-of-funds'],
      documents: ['Work permit application'],
      prepare: ['IRCC secure account', 'Check the current fee', 'Note the 20-day deadline after accepting an IEC invitation'],
      howTo:
        '1. For IEC, the application is submitted within 20 days of accepting the invitation.\n2. The permit itself is issued at the port of entry after approval.',
      conditions: ['Only if you came on IEC / Working Holiday'],
    },
    {
      id: 'biometrics',
      title: 'Give biometrics',
      offsetDays: -120,
      durationDays: 30,
      validForDays: 3652,
      dependsOn: ['apply-study', 'apply-work', 'apply-open'],
      documents: ['Biometric instruction letter'],
      prepare: ['Book at a collection point', 'Bring the letter and passport'],
      howTo:
        '1. Study and work permit applicants usually give fingerprints and a photo, unless exempt.\n2. Temporary residence applicants give biometrics once every 10 years, so earlier biometrics may still count.\n3. The instruction letter arrives after the application is submitted.',
    },
    {
      id: 'approval',
      title: 'Receive the approval and the port of entry letter',
      offsetDays: -45,
      durationDays: 75,
      dependsOn: ['biometrics'],
      documents: ['Port of entry letter of introduction'],
      prepare: ['Watch the IRCC account', 'Check the letter details against the passport'],
      howTo:
        '1. Processing times on the IRCC site are estimates and are updated weekly for temporary residence; they are not a maximum.\n2. The 11 weeks here is a placeholder; move this date once the approval arrives.\n3. The letter of introduction is shown at the border to get the permit.',
    },
    {
      id: 'visa',
      title: 'Check the visitor visa in the passport',
      offsetDays: -30,
      durationDays: 7,
      dependsOn: ['approval'],
      documents: ['Visitor visa (TRV)', 'Passport'],
      prepare: ['Check the visa dates and entries', 'Travel with the same passport'],
      howTo:
        '1. When a permit application is approved, IRCC issues the visitor visa automatically if your passport needs one.\n2. The passport is sent for the visa counterfoil; check it is back before travel.',
      conditions: ['Only if your passport needs a visitor visa (TRV)'],
    },
    {
      id: 'eta',
      title: 'Check the eTA is linked to the passport',
      offsetDays: -30,
      durationDays: 7,
      dependsOn: ['approval'],
      documents: ['eTA', 'Passport'],
      prepare: ['Check the approval letter mentions the eTA', 'Fly with the same passport used in the application'],
      howTo:
        '1. When a permit application is approved, IRCC issues the eTA automatically if your passport needs one.\n2. The eTA is linked electronically to the passport.',
      conditions: ['Only if your passport is visa-exempt and needs an eTA'],
    },
    {
      id: 'insurance',
      title: 'Buy private medical insurance for the MSP wait',
      offsetDays: -14,
      durationDays: 7,
      dependsOn: ['approval'],
      documents: ['Private health insurance policy'],
      prepare: ['Cover from the arrival date', 'Cover at least the rest of the arrival month plus 2 months', 'Check if the school or employer offers a plan'],
      howTo:
        '1. MSP coverage for new residents starts after the rest of the arrival month plus 2 months.\n2. The province suggests private health insurance for that wait.',
    },
    {
      id: 'temp-housing',
      title: 'Book temporary housing for the first weeks',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: ['approval'],
      documents: ['Booking confirmation'],
      prepare: ['2 to 4 weeks near work or school', 'An address for the SIN, bank and MSP forms'],
      howTo:
        '1. A short stay gives time to view rentals in person before signing.\n2. The length here is an estimate.',
    },
    {
      id: 'port-of-entry',
      title: 'Get the permit from the officer at the port of entry',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['approval', 'visa', 'eta', 'proof-of-funds', 'insurance', 'temp-housing'],
      documents: ['Study or work permit', 'Passport', 'Port of entry letter of introduction'],
      prepare: [
        'Carry the letter of introduction, the letter of acceptance or job offer, and proof of funds in hand luggage',
        'Check the name, dates, conditions and expiry on the permit before leaving the counter',
        'Check a study permit says it allows off-campus work, if that applies',
      ],
      howTo:
        '1. A border services officer checks the documents and issues the permit.\n2. Errors are easiest to fix on the spot.\n3. A study permit that allows off-campus work carries a condition line that lets you apply for a SIN; without it, an amendment can be requested.',
    },
    {
      id: 'phone',
      title: 'Get a Canadian SIM and phone plan',
      offsetDays: 3,
      durationDays: 3,
      dependsOn: ['port-of-entry'],
      documents: [],
      prepare: ['Unlocked phone', 'Passport and permit as ID', 'Compare prepaid and monthly plans'],
      howTo:
        '1. A local number is asked for by banks, landlords and government forms.\n2. Prepaid plans usually need no credit history.',
    },
    {
      id: 'sin',
      title: 'Apply for a Social Insurance Number',
      offsetDays: 7,
      durationDays: 7,
      dependsOn: ['port-of-entry'],
      documents: ['Social Insurance Number', 'Study or work permit', 'Passport'],
      prepare: ['Apply online, in person at Service Canada, or by mail', 'Bring the original permit'],
      howTo:
        '1. A work permit, or a study permit that says you may work, is the primary document.\n2. There is no fee.\n3. A temporary resident\'s SIN starts with 9 and expires with the immigration document; update it when the permit is extended.',
    },
    {
      id: 'msp',
      title: 'Apply for MSP',
      offsetDays: 7,
      durationDays: 7,
      dependsOn: ['port-of-entry'],
      documents: ['MSP application', 'Study or work permit'],
      prepare: ['Apply as soon as you arrive', 'Check the permit is valid for 6 months or more', 'Note the date coverage will start'],
      howTo:
        '1. Study and work permit holders with a permit valid 6 months or more may be deemed residents for MSP.\n2. Coverage starts after the rest of the arrival month plus 2 months.\n3. International students may be charged the international student health fee; check the MSP pages.',
    },
    {
      id: 'bank',
      title: 'Open a bank account',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: ['port-of-entry'],
      documents: ['Bank account details'],
      prepare: ['Passport and permit', 'Proof of address', 'Compare newcomer packages from several banks'],
      howTo:
        '1. Many banks offer newcomer accounts; compare fees and credit card terms.\n2. Account details are needed for payroll and for CRA direct deposit.',
    },
    {
      id: 'rent',
      title: 'Rent a home',
      offsetDays: 45,
      durationDays: 28,
      dependsOn: ['temp-housing', 'bank'],
      documents: ['Tenancy agreement', 'Condition inspection report', 'Deposit receipt'],
      prepare: [
        'View the unit in person or by live video before paying anything',
        'Check the landlord owns or manages the unit',
        'Walk through the move-in inspection with the landlord and sign the report',
      ],
      howTo:
        '1. Landlords in B.C. prepare a written tenancy agreement for every tenancy; the Residential Tenancy Branch has a standard form.\n2. The security deposit is at most half of one month\'s rent, and the pet damage deposit the same.\n3. The move-in condition inspection decides who pays for damage later.\n4. Paying before seeing a unit or signing is a common pattern in rental scams.',
    },
    {
      id: 'bc-services-card',
      title: 'Get the BC Services Card photo at ICBC',
      offsetDays: 60,
      durationDays: 14,
      dependsOn: ['msp'],
      documents: ['BC Services Card'],
      prepare: ['Two pieces of ID', 'Enrol in MSP first', 'Combine it with the driver\'s licence if exchanging one'],
      howTo:
        '1. After enrolling in MSP, the photo card is made at an ICBC driver licensing office.\n2. The card itself has no fee.\n3. The card shows the Personal Health Number.',
    },
    {
      id: 'benefits',
      title: 'Apply for newcomer benefit payments',
      offsetDays: 60,
      durationDays: 14,
      dependsOn: ['sin'],
      documents: ['RC151 or RC66 form'],
      prepare: ['SIN', 'Arrival date and world income for the year', 'Children\'s details, if any'],
      howTo:
        '1. Newcomers can apply for benefits without first filing a return.\n2. Form RC151 covers the Canada Groceries and Essentials Benefit, which replaced the GST/HST credit in July 2026.\n3. Families with children under 19 use form RC66, which also covers the BC family benefit.\n4. The B.C. climate action tax credit ended with the April 2025 payment.',
      conditions: ['Only if you are a resident of Canada for tax purposes'],
    },
    {
      id: 'doctor',
      title: 'Join the Health Connect Registry for a family doctor',
      offsetDays: 80,
      durationDays: 7,
      dependsOn: ['bc-services-card'],
      documents: [],
      prepare: ['Personal Health Number', 'Home address, email and phone'],
      howTo:
        '1. The registry is how B.C. matches people with a family doctor or nurse practitioner.\n2. Registering online takes a few minutes, or call 8-1-1.\n3. The local team makes contact when a provider becomes available; waits vary.',
    },
    {
      id: 'licence',
      title: 'Exchange the driver\'s licence at ICBC',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: ['port-of-entry'],
      documents: ['B.C. driver\'s licence', 'Foreign driver\'s licence', 'Proof of driving experience'],
      prepare: [
        'Check whether your licence is on ICBC\'s licence exchange list',
        'Book an ICBC-approved translation if needed',
        'Book the knowledge and road tests early if it is not on the list',
      ],
      howTo:
        '1. New residents can drive on a valid licence for up to 90 days, then switch to a B.C. licence.\n2. Licences from exchange jurisdictions switch without tests; others take a knowledge test and a road test.\n3. Full-time students at a designated institution can keep driving on their own valid licence.\n4. The foreign licence is surrendered.',
      conditions: ['Only if you drive and hold a licence from outside Canada'],
    },
    {
      id: 'extend',
      title: 'Apply to extend the permit before it expires',
      offsetDays: 335,
      durationDays: 30,
      dependsOn: ['port-of-entry'],
      documents: ['Extension application'],
      prepare: ['Note the permit expiry date', 'Check current in-Canada processing times', 'Keep a copy of the submission receipt'],
      howTo:
        '1. Move this step to about 30 days before the real expiry date; IRCC suggests applying at least 30 days before a work permit expires.\n2. Applying before expiry and staying in Canada keeps you on maintained status while IRCC decides.\n3. Update the SIN and MSP once the new permit arrives.',
    },
    {
      id: 'tax-return',
      title: 'File the first Canadian tax return',
      offsetDays: 365,
      durationDays: 30,
      dependsOn: ['sin'],
      documents: ['Tax return', 'T4 or T4A slips'],
      prepare: ['Arrival date', 'World income before arrival', 'Tuition slips, if studying'],
      howTo:
        '1. The return is usually due by April 30 of the year after arrival; move this date to that deadline.\n2. Filing keeps benefit payments going.',
      conditions: ['Only if you are a resident of Canada for tax purposes'],
    },
    {
      id: 'check-pnp',
      title: 'Check eligibility for the BC PNP',
      offsetDays: 380,
      durationDays: 14,
      dependsOn: ['port-of-entry'],
      documents: [],
      prepare: ['Job offer details', 'Language test plans', 'See the Provincial nomination · British Columbia plan'],
      howTo:
        '1. BC PNP Skills Immigration streams need a full-time job offer from an eligible B.C. employer.\n2. The steps are in the Provincial nomination · British Columbia plan.',
      conditions: ['Only with a job offer'],
    },
    {
      id: 'check-cec',
      title: 'Check eligibility for the Canadian Experience Class',
      offsetDays: 395,
      durationDays: 14,
      dependsOn: ['port-of-entry'],
      documents: [],
      prepare: ['Count paid skilled hours in Canada', 'Plan a language test', 'See the Skilled migration · CA plan'],
      howTo:
        '1. The Canadian Experience Class counts at least 1 year, or 1,560 hours, of skilled paid work in Canada (TEER 0 to 3) in the 3 years before applying.\n2. Work done while a full-time student, co-op terms and self-employment usually do not count.\n3. The Express Entry steps are in the Skilled migration · CA plan.',
      conditions: ['Only after 12 months of skilled Canadian work'],
    },
  ],
};
