import type { Playbook } from '../../domain/types';

export const relocationOn: Playbook = {
  id: 'relocation-on',
  title: 'Relocating · work or study · Ontario',
  summary:
    'Paperwork plan for moving to Ontario on a work or study permit, from the permit and the port of entry to SIN, renting, OHIP, a licence, taxes and the routes toward PR.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'relocation',
  anchorKind: 'migrated',
  ages: { from: 18 },
  conditions: [
    "You're moving to Ontario on a temporary work or study permit",
    "You aren't a Canadian citizen or permanent resident yet",
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Work permit types — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/work-permit-types.html',
    },
    {
      title: 'International Experience Canada: About — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec/about.html',
    },
    {
      title: 'Study permit: Get the documents — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents.html',
    },
    {
      title: 'Provincial attestation letter (PAL/TAL) — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter.html',
    },
    {
      title: 'Study permit: Proof of financial support — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html',
    },
    {
      title: 'Study permit: After you apply — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/after-apply-next-steps.html',
    },
    {
      title: 'When to give your biometrics — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/biometrics/when-to-give.html',
    },
    {
      title: 'Biometrics — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/campaigns/biometrics.html',
    },
    {
      title: 'Check processing times — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html',
    },
    {
      title: 'About the eTA — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/about.html',
    },
    {
      title: 'Work permit at a port of entry — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit-poe.html',
    },
    {
      title: 'SIN: Temporary residents — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/temporary-residents.html',
    },
    {
      title: 'SIN: Eligibility — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/eligibility.html',
    },
    {
      title: 'Opening a bank account — Financial Consumer Agency of Canada',
      url: 'https://www.canada.ca/en/financial-consumer-agency/services/banking/opening-bank-account.html',
    },
    {
      title: 'Renting in Ontario: Your rights — Ontario.ca',
      url: 'https://www.ontario.ca/page/renting-ontario-your-rights',
    },
    {
      title: "Guide to Ontario's standard lease — Ontario.ca",
      url: 'https://www.ontario.ca/page/guide-ontarios-standard-lease',
    },
    {
      title: 'A Guide to the Residential Tenancies Act — Landlord and Tenant Board',
      url: 'https://tribunalsontario.ca/documents/ltb/Brochures/Guide%20to%20RTA%20(English).html',
    },
    {
      title: 'Apply for OHIP and get a health card — Ontario.ca',
      url: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
    },
    {
      title: 'University Health Insurance Plan (UHIP)',
      url: 'https://www.uhip.ca/',
    },
    {
      title: "Exchange an out-of-province driver's licence — Ontario.ca",
      url: 'https://www.ontario.ca/page/exchange-out-province-drivers-licence',
    },
    {
      title: 'Find a family doctor or nurse practitioner — Ontario.ca',
      url: 'https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner',
    },
    {
      title: 'Newcomers to Canada (immigrants) — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/newcomers-canada-immigrants.html',
    },
    {
      title: 'Extend your work permit — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/extend.html',
    },
    {
      title: 'Extend your work permit: After you apply — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/extend/after-apply.html',
    },
    {
      title: 'Express Entry: Canadian Experience Class — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/canadian-experience-class.html',
    },
    {
      title: 'Ontario Immigrant Nominee Program (OINP) — Ontario.ca',
      url: 'https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp',
    },
    {
      title: 'Ontario Workforce Priority stream — Ontario.ca',
      url: 'https://www.ontario.ca/page/ontario-workforce-priority-stream',
    },
  ],
  steps: [
    {
      id: 'route',
      title: 'Pick the permit route',
      offsetDays: -300,
      durationDays: 14,
      dependsOn: [],
      documents: ['Passport'],
      prepare: [
        'Study, employer-specific work or open work permit',
        'Check the passport stays valid for the whole stay',
        'Use the IRCC "find out if you need a permit" tool',
      ],
      howTo:
        '1. A study permit needs a letter of acceptance from a designated learning institution (DLI).\n2. An employer-specific work permit needs a job offer; the employer may need a labour market impact assessment (LMIA).\n3. An open work permit needs no job offer and lets you work for most compliant employers, but only certain situations qualify, e.g. International Experience Canada (IEC) Working Holiday.\n4. Not immigration advice; the IRCC pages decide which route fits.',
    },
    {
      id: 'acceptance',
      title: 'Get the letter of acceptance and the PAL',
      offsetDays: -220,
      durationDays: 60,
      conditions: ['Only if you are coming to study'],
      dependsOn: ['route'],
      documents: ['Letter of acceptance', 'Provincial attestation letter (PAL)'],
      prepare: [
        'Apply to a designated learning institution (DLI)',
        'Accept the offer and pay the tuition deposit the school asks for',
        'Ask the school for the PAL',
      ],
      howTo:
        '1. The school issues the letter of acceptance; it is uploaded with the study permit application.\n2. Most applicants also need a provincial attestation letter (PAL) from the school; it usually comes after you accept the offer and pay some or all of the tuition.\n3. A PAL is linked to the school and in most cases is used in the year it was issued.\n4. As of 2026, IRCC lists exemptions, including primary and secondary school and master\'s or doctoral programs at public institutions; check the PAL page before applying.',
    },
    {
      id: 'job-offer',
      title: 'Get the job offer and the LMIA or offer number',
      offsetDays: -220,
      durationDays: 60,
      conditions: ['Only if you are coming on an employer-specific work permit'],
      dependsOn: ['route'],
      documents: ['Job offer letter', 'LMIA or offer of employment number'],
      prepare: [
        'Signed job offer with duties, wage and dates',
        'Ask the employer whether the job needs an LMIA or is LMIA-exempt',
      ],
      howTo:
        '1. An employer-specific permit names the employer, and often the job and location.\n2. Either the employer gets an LMIA from Employment and Social Development Canada, or, for an LMIA-exempt job, submits the offer through the IRCC Employer Portal and gives you an offer of employment number.\n3. The 60 days is an estimate; LMIA times vary by stream.',
    },
    {
      id: 'iec',
      title: 'Enter the IEC pool and wait for an invitation',
      offsetDays: -220,
      durationDays: 60,
      conditions: ['Only if you are coming through International Experience Canada (IEC)'],
      dependsOn: ['route'],
      documents: ['Invitation to apply'],
      prepare: [
        'Check your country has an IEC agreement and your age fits (18 to 35, or 18 to 30 for some countries)',
        'Pick the pools: Working Holiday, Young Professionals or International Co-op',
      ],
      howTo:
        '1. Submit an IEC profile and choose the pools.\n2. Working Holiday leads to an open work permit; Young Professionals and International Co-op lead to employer-specific permits.\n3. Invitations come in rounds; the 60 days here is an estimate.\n4. After an invitation there are 10 days to start the application.',
    },
    {
      id: 'funds',
      title: 'Gather proof of funds',
      offsetDays: -200,
      durationDays: 14,
      dependsOn: ['route'],
      documents: ['Proof of funds'],
      prepare: [
        'Bank statements for the last 6 months',
        'Tuition receipts, education loan or scholarship letters, if studying',
        'Check the current amount on the IRCC page for your route',
      ],
      howTo:
        '1. For a study permit, show enough for the first year: tuition, living costs for you and any family, and travel to and from Canada.\n2. For longer programs, explain how the rest of the studies will be paid for.\n3. IRCC updates the living-cost amounts each year; use the figure in force on the day you apply.\n4. Work permit routes, including IEC, can ask for funds too; check the route\'s own page.',
    },
    {
      id: 'apply-study',
      title: 'Apply for the study permit',
      offsetDays: -180,
      durationDays: 14,
      conditions: ['Only if you are coming to study'],
      dependsOn: ['acceptance', 'funds'],
      documents: ['Passport', 'Letter of acceptance', 'Provincial attestation letter (PAL)', 'Proof of funds'],
      prepare: ['IRCC secure account', 'Digital photo', 'Check the current fee and processing time'],
      howTo:
        '1. Apply online in the IRCC account and upload the letter of acceptance, the PAL and proof of funds.\n2. Travel later on the passport used for the application.\n3. Processing times are estimates that IRCC updates weekly; check them before picking this date.',
    },
    {
      id: 'apply-work',
      title: 'Apply for the employer-specific work permit',
      offsetDays: -180,
      durationDays: 14,
      conditions: ['Only if you are coming on an employer-specific work permit'],
      dependsOn: ['job-offer', 'funds'],
      documents: ['Passport', 'Job offer letter', 'LMIA or offer of employment number'],
      prepare: ['IRCC secure account', 'Proof of qualifications for the job', 'Check the current fee and processing time'],
      howTo:
        '1. Apply online with the LMIA copy or the offer of employment number.\n2. Most people apply before travelling; only some can apply at a port of entry.\n3. Processing times are estimates that IRCC updates weekly.',
    },
    {
      id: 'apply-open',
      title: 'Apply for the open work permit',
      offsetDays: -180,
      durationDays: 14,
      conditions: ['Only if you qualify for an open work permit, e.g. IEC Working Holiday'],
      dependsOn: ['iec', 'funds'],
      documents: ['Passport', 'Invitation to apply'],
      prepare: ['IRCC secure account', 'Police certificates and medical exam, if the route asks', 'Check the current fee'],
      howTo:
        '1. For IEC, once the application is started there are 20 days to complete it, submit it and pay the fee.\n2. Other open work permits (e.g. for some spouses) have their own IRCC eligibility pages.\n3. Processing times are estimates that IRCC updates weekly.',
    },
    {
      id: 'biometrics',
      title: 'Give biometrics',
      offsetDays: -150,
      durationDays: 30,
      validForDays: 3652,
      dependsOn: ['apply-study', 'apply-work', 'apply-open'],
      documents: ['Biometric instruction letter'],
      prepare: ['Book a collection point as soon as the letter arrives', 'Bring the letter and passport'],
      howTo:
        '1. Most applicants give fingerprints and a photo; children under 14 and people over 79 are exempt.\n2. Temporary residence applicants give them once every 10 years; a permit can\'t run more than 10 years past that date.\n3. Skip this step if your earlier biometrics are still valid.',
    },
    {
      id: 'approval',
      title: 'Receive the approval and port of entry letter',
      offsetDays: -30,
      durationDays: 120,
      dependsOn: ['biometrics'],
      documents: ['Port of entry letter of introduction'],
      prepare: ['Watch the IRCC account', 'Print the letter'],
      howTo:
        '1. On approval IRCC sends a port of entry letter of introduction; it is not the permit itself.\n2. The 120 days is an estimate; move this step to the real date.',
    },
    {
      id: 'travel-doc',
      title: 'Check the visitor visa or eTA',
      offsetDays: -25,
      durationDays: 3,
      conditions: ["Only if you aren't a US citizen"],
      dependsOn: ['approval'],
      documents: ['Visitor visa (TRV) or eTA'],
      prepare: ['Check which one your passport needs', 'Check the visa is in the passport you will travel on'],
      howTo:
        '1. With an approved work or study permit IRCC issues the visitor visa (TRV) or eTA automatically; there is no separate application.\n2. A visa-required passport gets a visitor visa in the passport; a visa-exempt passport gets an eTA for flying in.\n3. An eTA is valid for up to 5 years or until the passport expires, whichever comes first.',
    },
    {
      id: 'insurance',
      title: 'Arrange health insurance until OHIP or a school plan starts',
      offsetDays: -14,
      durationDays: 7,
      dependsOn: ['approval'],
      documents: ['Health insurance policy'],
      prepare: [
        'Cover from the arrival date',
        'For university students, check the UHIP enrolment',
        'For college students, ask the school which plan it uses',
      ],
      howTo:
        '1. Ontario has no OHIP waiting period any more; eligible people are covered as soon as they qualify.\n2. Work permit holders qualify if working full-time in Ontario for an Ontario employer for at least 6 months; the card still has to be applied for in person, so private cover bridges the gap.\n3. Study permit holders are not listed as OHIP-eligible; Ontario universities enrol international students in UHIP, a compulsory plan.\n4. Private cover is usually needed for anyone not eligible for either.',
    },
    {
      id: 'housing',
      title: 'Book temporary housing',
      offsetDays: -14,
      durationDays: 30,
      dependsOn: [],
      documents: ['Booking confirmation'],
      prepare: ['2 to 4 weeks near work or school', 'An address to give the border officer'],
      howTo:
        '1. A short stay gives time to view places in person before signing a lease.\n2. The length here is an estimate; rental markets vary across Ontario.',
    },
    {
      id: 'poe',
      title: 'Get the permit at the port of entry and check it',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['approval', 'travel-doc', 'insurance'],
      documents: ['Work or study permit', 'Passport', 'Port of entry letter of introduction'],
      prepare: [
        'Carry the letter, passport, proof of funds and the letters behind the application',
        'Read the permit before leaving the counter',
      ],
      howTo:
        '1. Show the port of entry letter to the border services officer, who issues the permit.\n2. Before leaving, check the name, the conditions (employer, school, work rights) and the expiry date.\n3. Point out any mistake to the officer before leaving.\n4. Note the expiry date; the extension step counts back from it.',
    },
    {
      id: 'sin',
      title: 'Get a Social Insurance Number',
      offsetDays: 7,
      durationDays: 5,
      dependsOn: ['poe'],
      documents: ['Social Insurance Number', 'Work or study permit', 'Passport'],
      prepare: ['Permit that allows work', 'One more ID, e.g. the passport'],
      howTo:
        '1. Apply online (fastest), by mail or in person at a Service Canada office.\n2. Online confirmation takes about 5 business days; by mail about 20.\n3. A temporary resident\'s SIN starts with 9 and expires with the immigration document.\n4. Work can start as soon as you have applied.',
    },
    {
      id: 'phone',
      title: 'Get a SIM or phone plan',
      offsetDays: 3,
      durationDays: 2,
      dependsOn: ['poe'],
      documents: [],
      prepare: ['Unlocked phone', 'Compare prepaid and monthly plans'],
      howTo:
        '1. A local number is asked for by banks, landlords and employers.\n2. Prepaid avoids a credit check while you have no Canadian credit history.',
    },
    {
      id: 'bank',
      title: 'Open a bank account',
      offsetDays: 10,
      durationDays: 3,
      dependsOn: ['poe'],
      documents: ['Passport', 'Work or study permit'],
      prepare: ['Two IDs, or one ID and someone the bank trusts to vouch for you', 'An address, even a temporary one'],
      howTo:
        '1. You can open an account without a job or money to deposit.\n2. Banks accept two documents from reliable sources, one with your name and address and one with your name and date of birth.\n3. Many banks run newcomer packages; compare the fees.',
    },
    {
      id: 'rent',
      title: "Rent a home on Ontario's standard lease",
      offsetDays: 45,
      durationDays: 30,
      dependsOn: ['bank'],
      documents: ['Standard lease'],
      prepare: [
        'View the place in person or by live video before paying',
        'Check the landlord owns or manages it',
        'Never wire a deposit to hold a place you haven\'t seen',
      ],
      howTo:
        '1. Most private landlords use Ontario\'s standard lease for new leases; ask in writing if you don\'t get it, and the landlord has 21 days to provide it.\n2. The only rent deposit allowed is for the last month\'s rent, no more than one month; a refundable key deposit is also allowed.\n3. Pet or damage deposits aren\'t allowed; the landlord pays interest on the rent deposit each year.\n4. The Landlord and Tenant Board settles disputes; overpaid deposits can be claimed back there.\n5. Scams often ask for money before a viewing or push you to sign quickly.',
    },
    {
      id: 'ohip',
      title: 'Apply for OHIP at ServiceOntario',
      offsetDays: 30,
      durationDays: 7,
      conditions: ['Only if you work full-time for an Ontario employer on a permit of at least 6 months, or are the spouse or dependent of someone who does'],
      dependsOn: ['poe', 'bank'],
      documents: ['Health card', 'Work permit', 'Passport', 'Proof of Ontario address'],
      prepare: [
        'Three original documents: immigration status, Ontario residency and identity',
        'Registration for Ontario Health Insurance Coverage form',
        'Book a ServiceOntario visit',
      ],
      howTo:
        '1. Apply in person at ServiceOntario with the form and three separate original documents.\n2. There is no waiting period; coverage starts once eligibility is accepted.\n3. Study permit holders aren\'t listed as eligible; use UHIP or the school plan instead.',
    },
    {
      id: 'licence',
      title: "Exchange the driver's licence at DriveTest",
      offsetDays: 60,
      durationDays: 21,
      conditions: ["Only if you hold a driver's licence from outside Ontario and want to drive"],
      dependsOn: ['poe'],
      documents: ["Foreign driver's licence", "Ontario driver's licence", 'Passport'],
      prepare: [
        'Original valid licence',
        'Proof of driving experience in English or French',
        'Book a DriveTest visit',
      ],
      howTo:
        '1. A valid licence from elsewhere can be used for 60 days after moving to Ontario.\n2. Ontario exchanges licences from other provinces, US states and some countries, including Australia, France, Germany, Great Britain, Ireland, Japan, South Korea, New Zealand, Switzerland and Taiwan; check the full list.\n3. Other countries: an official authentication letter from the issuing agency can credit up to one year of experience toward graduated licensing.\n4. Expect a vision test and a knowledge test.',
    },
    {
      id: 'doctor',
      title: 'Find a family doctor through Health Care Connect',
      offsetDays: 60,
      durationDays: 14,
      conditions: ['Only once you have an Ontario health card'],
      dependsOn: ['ohip'],
      documents: ['Health card'],
      prepare: ['Health card number', 'Register online or call 811'],
      howTo:
        '1. Register yourself and your family online or through 811.\n2. A Care Connector searches for a clinician and a referral letter comes by mail.\n3. A match can take a long time; walk-in clinics fill the gap.',
    },
    {
      id: 'benefits',
      title: 'Apply for newcomer benefits with the CRA',
      offsetDays: 30,
      durationDays: 14,
      conditions: ['Only if you are resident in Canada for tax and have a low or modest income or children'],
      dependsOn: ['sin'],
      documents: [],
      prepare: ['SIN', 'Income from the year before arrival', 'Form RC66 if you have children'],
      howTo:
        '1. Newcomers can apply for benefit payments as soon as they arrive, before the first tax return.\n2. The Canada Groceries and Essentials Benefit (formerly the GST/HST credit) has a web form; with children under 19 use RC151, and for the Canada Child Benefit RC66.\n3. Eligibility depends on being a Canadian resident for tax purposes; check the CRA newcomers page.',
    },
    {
      id: 'tax-return',
      title: 'File the first tax return',
      offsetDays: 240,
      durationDays: 30,
      dependsOn: ['sin'],
      documents: ['Tax slips', 'Notice of assessment'],
      prepare: ['T4 or T4A slips', 'Tuition slip (T2202), if studying', 'Rent receipts'],
      howTo:
        '1. The return is usually due April 30 of the year after arrival; move this step to that date.\n2. Filing opens ongoing benefits, including the Ontario Trillium Benefit.\n3. The date here is an estimate.',
    },
    {
      id: 'extend',
      title: 'Extend the permit before it expires',
      offsetDays: 330,
      durationDays: 30,
      conditions: ['Only if you plan to stay past the permit expiry date'],
      dependsOn: ['poe'],
      documents: ['Work or study permit'],
      prepare: ['The permit expiry date', 'New job offer, LMIA or school letter, if the route needs one'],
      howTo:
        '1. IRCC suggests applying at least 30 days before the permit expires; move this step to that date.\n2. If you apply before it expires, you can keep working under the same conditions until a decision; IRCC calls this maintained status.\n3. Check the IRCC page before travelling while waiting.',
    },
    {
      id: 'oinp',
      title: 'Check the Ontario Immigrant Nominee Program',
      offsetDays: 210,
      durationDays: 30,
      conditions: ['Only if you hold a full-time, permanent job offer from an Ontario employer'],
      dependsOn: ['poe'],
      documents: [],
      prepare: ['Job offer and its TEER level', 'Months worked in that job', 'Language test plans'],
      howTo:
        '1. Since June 2026 the OINP runs one main stream, Ontario Workforce Priority; the older streams are closed.\n2. For TEER 0 to 3 jobs, it asks for 6 months of full-time work in the offered job within the last 12 months, among other criteria.\n3. See the "Provincial nomination · Ontario" plan for the steps.\n4. Not immigration advice; the OINP pages decide eligibility.',
    },
    {
      id: 'cec',
      title: 'Check Express Entry after 12 months of skilled Canadian work',
      offsetDays: 395,
      durationDays: 30,
      conditions: ['Only if you work in a TEER 0, 1, 2 or 3 job in Canada'],
      dependsOn: ['poe'],
      documents: [],
      prepare: ['Count paid hours worked in Canada', 'Plan an approved language test'],
      howTo:
        '1. The Canadian Experience Class counts 1 year (1,560 hours) of paid skilled work in Canada in the 3 years before applying.\n2. Work done while studying full-time, including co-op terms, doesn\'t count.\n3. See the "Skilled migration · CA" plan for the Express Entry steps.\n4. Not immigration advice; check the IRCC pages.',
    },
  ],
};
