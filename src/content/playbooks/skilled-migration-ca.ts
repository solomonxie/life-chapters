import type { Playbook } from '../../domain/types';

export const skilledMigrationCa: Playbook = {
  id: 'skilled-migration-ca',
  title: 'Skilled migration · CA',
  summary:
    'Paperwork plan for permanent residence through Express Entry, from profile to landing.',
  region: 'Canada',
  country: 'CA',
  anchorKind: 'visa-lodge',
  ages: { from: 18 },
  conditions: [
    "You're applying for permanent residence through Express Entry",
    'You qualify for one of its programs: Canadian Experience Class, Federal Skilled Worker or Federal Skilled Trades',
    'A provincial nomination through an Express Entry stream is optional',
    'You plan to live outside Quebec',
  ],
  reviewedAt: '2026-09-27',
  version: 2,
  sources: [
    {
      title: 'Express Entry: Canadian Experience Class',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/canadian-experience-class.html',
    },
    {
      title: 'Express Entry: Federal Skilled Worker Program',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/federal-skilled-workers.html',
    },
    {
      title: 'Express Entry: Federal Skilled Trades Program',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/federal-skilled-trades.html',
    },
    {
      title: 'Express Entry: Language requirements',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-requirements.html',
    },
    {
      title: 'Comprehensive Ranking System criteria',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/criteria-comprehensive-ranking-system/grid.html',
    },
    {
      title: 'Provincial Nominee Program: How it works',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees/works.html',
    },
    {
      title: 'Express Entry: Category-based selection',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html',
    },
    {
      title: 'Express Entry: Submit your profile',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile.html',
    },
    {
      title: 'Express Entry: If you are not invited to apply',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/next-steps-not-invited.html',
    },
    {
      title: 'Express Entry: Language test results',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html',
    },
    {
      title: 'Express Entry: Educational credential assessment',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/education-assessed.html',
    },
    {
      title: 'Express Entry: Proof of funds',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/proof-funds.html',
    },
    {
      title: 'Express Entry: Apply for permanent residence',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/apply-permanent-residence.html',
    },
    {
      title: 'Express Entry: Police certificates',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/police-certificates.html',
    },
    {
      title: 'Police certificates: China — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how/china.html',
    },
    {
      title: 'Document authentication: notices and updates (Apostille Convention in Canada) — Global Affairs Canada',
      url: 'https://international.canada.ca/en/global-affairs/services/document-authentication/updates',
    },
    {
      title: 'Apostille Convention status table — HCCH',
      url: 'https://www.hcch.net/en/instruments/conventions/status-table/?cid=41',
    },
    {
      title: 'Express Entry: Medical exams',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/medical-exams.html',
    },
    {
      title: 'Medical exam requirements for permanent residents',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/medical-exams/requirements-permanent-residents.html',
    },
    {
      title: 'Express Entry: After you apply',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/after-apply-next-steps.html',
    },
    {
      title: 'Express Entry: If your application is approved',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/application-approved.html',
    },
  ],
  steps: [
    {
      id: 'eligibility',
      title: 'Check program eligibility and the CRS score',
      offsetDays: -420,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: [
        'Pick the likely program: Federal Skilled Worker, Skilled Trades, or Canadian Experience Class',
        'Estimate the Comprehensive Ranking System score',
        'List points you can evidence',
      ],
      howTo:
        '1. IRCC publishes who can apply for each Express Entry program and the CRS criteria.\n2. Profiles in the pool are ranked by CRS score.\n3. Job offer points were removed from the CRS as of March 25, 2025.\n4. The route steps below each apply to one program; the others can be marked "Not for me".',
    },
    {
      id: 'route-cec',
      title: 'Confirm the Canadian Experience Class route',
      offsetDays: -410,
      durationDays: 7,
      dependsOn: ['eligibility'],
      documents: [],
      prepare: [
        'Dates, hours and NOC code of each Canadian job',
        'Work permit covering that work',
        'Language level: CLB 7 for TEER 0 or 1 jobs, CLB 5 for TEER 2 or 3 jobs',
      ],
      conditions: ['Only if you have at least 1 year of skilled paid work in Canada in the last 3 years'],
      howTo:
        '1. The work is at least 1 year full time, or 1,560 hours in total, in the 3 years before applying, in TEER 0, 1, 2 or 3 occupations.\n2. It is paid work done in Canada while authorized under temporary resident status.\n3. Self-employment and work while studying full time do not count.\n4. There is no education requirement and no proof of funds; an ECA only adds CRS points for education from outside Canada.',
    },
    {
      id: 'route-fsw',
      title: 'Confirm the Federal Skilled Worker route',
      offsetDays: -410,
      durationDays: 7,
      dependsOn: ['eligibility'],
      documents: [],
      prepare: [
        'Dates, hours and NOC code of each job in the last 10 years',
        'Estimate the 67-point selection score',
        'Language level: CLB 7 in all 4 abilities',
      ],
      conditions: ['Only if you have 1 year of continuous skilled work, in or outside Canada, in the last 10 years'],
      howTo:
        '1. The work is 1 year of continuous paid work, or 1,560 hours in total, in one TEER 0, 1, 2 or 3 occupation in the last 10 years.\n2. The selection grid needs 67 points or more, separate from the CRS score.\n3. Education from outside Canada needs an ECA.\n4. Proof of funds is needed unless already authorized to work in Canada with a valid job offer.',
    },
    {
      id: 'route-fst',
      title: 'Confirm the Federal Skilled Trades route',
      offsetDays: -410,
      durationDays: 7,
      dependsOn: ['eligibility'],
      documents: ['Certificate of qualification or job offer'],
      prepare: [
        'Dates and hours of skilled trade work in the last 5 years',
        'A Canadian certificate of qualification, or a full-time job offer of at least 1 year',
        'Language level: CLB 5 speaking and listening, CLB 4 reading and writing',
      ],
      conditions: ['Only if you have 2 years of skilled trade work in the last 5 years'],
      howTo:
        '1. The work is at least 2 years full time, or 3,120 hours in total, in a skilled trade in the 5 years before applying.\n2. It needs a valid job offer or a certificate of qualification from a Canadian provincial, territorial or federal authority.\n3. There is no education requirement; an ECA only adds CRS points.\n4. Proof of funds is needed unless already authorized to work in Canada with a valid job offer.',
    },
    {
      id: 'passport',
      title: 'Check passport validity',
      offsetDays: -400,
      durationDays: 30,
      dependsOn: [],
      documents: ['Passport'],
      prepare: ['Check the expiry date', 'Renew if it expires during the likely processing period'],
      howTo:
        '1. Passport details are entered in the profile and again in the application.\n2. The COPR details are usually expected to match the passport.',
    },
    {
      id: 'language-test',
      title: 'Book and sit an approved language test',
      offsetDays: -330,
      durationDays: 60,
      validForDays: 730,
      dependsOn: ['eligibility'],
      documents: ['Language test result'],
      prepare: [
        'Pick an approved test: CELPIP-General, IELTS General Training, PTE Core, TEF Canada or TCF Canada',
        'Book a sitting',
        'Practice papers',
      ],
      howTo:
        '1. Results are accepted if less than 2 years old, both when the profile is completed and when the application is submitted.\n2. If results expire before an invitation, a retest is usually needed.\n3. IELTS One Skill Retake is not accepted for Express Entry.',
    },
    {
      id: 'eca',
      title: 'Get an Educational Credential Assessment',
      offsetDays: -300,
      durationDays: 120,
      validForDays: 1826,
      dependsOn: ['eligibility'],
      conditions: [
        'Only if you have education from outside Canada and apply as a Federal Skilled Worker, or want CRS points for it in another program',
      ],
      documents: ['Educational Credential Assessment', 'Degree certificates and transcripts'],
      prepare: [
        'Pick a designated organization, such as WES, ICAS, IQAS, CES or ICES',
        'Check whether a professional body assesses the occupation instead',
        'Check the current fee',
      ],
      howTo:
        '1. The assessment is done by an IRCC-designated organization, not by IRCC.\n2. An ECA counts if less than 5 years old when the profile is completed and when the application is submitted.\n3. Processing times vary by organization.',
    },
    {
      id: 'work-evidence',
      title: 'Collect employment reference letters',
      offsetDays: -300,
      durationDays: 60,
      dependsOn: ['eligibility'],
      documents: ['Employment references'],
      prepare: [
        'Reference letters on letterhead with duties, hours and dates',
        'Payslips or contracts as backup',
        'Translations for documents not in English or French',
      ],
      howTo:
        '1. Work experience details are entered in the profile and evidenced in the application.\n2. Claims are usually expected to match what the letters show.',
    },
    {
      id: 'proof-of-funds',
      title: 'Get proof-of-funds letters from the bank',
      offsetDays: -240,
      durationDays: 14,
      dependsOn: [],
      conditions: [
        'Only for the Federal Skilled Worker or Federal Skilled Trades routes, unless you are authorized to work in Canada and have a valid job offer',
      ],
      documents: ['Proof of funds'],
      prepare: [
        'Official letter on bank letterhead for each account',
        'Account numbers, opening dates, current and 6-month average balances',
        'Outstanding debts',
      ],
      howTo:
        '1. The Canadian Experience Class does not need proof of funds.\n2. Funds are usually expected to be available both at application and when the visa is issued.\n3. Borrowed money and equity in property are not counted.',
    },
    {
      id: 'profile',
      title: 'Submit the Express Entry profile',
      offsetDays: -230,
      durationDays: 7,
      validForDays: 365,
      dependsOn: ['passport', 'language-test', 'eca', 'work-evidence', 'proof-of-funds'],
      documents: ['Express Entry profile', 'Language test result', 'Educational Credential Assessment'],
      prepare: ['IRCC secure account login', 'Test and ECA reference numbers', 'Work and study history'],
      howTo:
        '1. The profile is completed in the IRCC secure account; a started profile is kept for 60 days before it has to be restarted.\n2. A profile not invited within 12 months expires automatically.\n3. The expiry date is shown in the account.',
    },
    {
      id: 'nomination',
      title: 'Get a provincial nomination through an Express Entry stream',
      offsetDays: -120,
      durationDays: 90,
      dependsOn: ['profile'],
      documents: ['Provincial nomination'],
      prepare: [
        "Check the province's Express Entry streams",
        'Express Entry profile details',
      ],
      conditions: ['Only if you apply to a province or territory for a nomination'],
      howTo:
        '1. A nomination accepted in the Express Entry profile adds 600 CRS points.\n2. The province runs its own application first; its steps are in the "Provincial nomination · British Columbia" and "Provincial nomination · Ontario" plans.\n3. The nomination is accepted in the Express Entry profile in the IRCC account.\n4. Dates here are rough placeholders.',
    },
    {
      id: 'invitation',
      title: 'Receive an invitation to apply (ITA)',
      offsetDays: -50,
      durationDays: 180,
      validForDays: 60,
      dependsOn: ['profile'],
      documents: ['Invitation to apply'],
      prepare: ['Watch the IRCC account', 'Note the 60-day window'],
      howTo:
        '1. Invitations are issued in rounds; timing is not predictable.\n2. Besides general and program rounds, IRCC holds category-based rounds for candidates in categories set by the Minister, such as French-language proficiency or certain occupations; the list changes over time.\n3. An invitation is valid for 60 days.\n4. If it lapses without an application or a decline, the profile is removed from the pool.\n5. Move this step\'s date to the real invitation date once it arrives.',
    },
    {
      id: 'identity-docs',
      title: 'Gather identity and civil documents',
      offsetDays: -40,
      durationDays: 30,
      dependsOn: ['passport'],
      documents: [
        'Passport',
        'Birth certificate',
        'Marriage or relationship evidence',
        'Digital photo',
      ],
      prepare: [
        'Documents for every family member included',
        'Certified translations where needed',
        'Colour scans',
      ],
      howTo:
        '1. The application lists the documents it expects once the form is filled in.\n2. Documents are usually uploaded as scans.',
    },
    {
      id: 'apostille',
      title: 'Check which Chinese documents need an apostille',
      offsetDays: -40,
      durationDays: 30,
      dependsOn: ['passport'],
      documents: ['Notarial certificates (公证书)', 'Apostille (附加证明书)'],
      prepare: [
        'List the Chinese birth, marriage, degree and other documents going to Canadian offices',
        'Check what each office asks for: IRCC, the credential assessor, a regulator',
        'Certified translations where needed',
      ],
      howTo:
        '1. China joined the Apostille Convention in November 2023 and it entered into force for Canada on January 11, 2024.\n2. Between the two, a Chinese public document that needs authenticating gets an apostille from China\'s foreign affairs authorities instead of consular legalisation at a Canadian mission.\n3. IRCC applications are usually uploaded as scans with translations; an apostille matters where a receiving office asks for authenticated documents, so check each office\'s list.',
      conditions: ['Only if some of your documents were issued in mainland China'],
    },
    {
      id: 'police',
      title: 'Order police certificates',
      offsetDays: -5,
      durationDays: 45,
      validForDays: 182,
      dependsOn: ['invitation'],
      documents: ['Police certificate'],
      prepare: [
        'List countries stayed in 6 months in a row or longer in the last 10 years, since age 18',
        'Look up each country\'s process',
        'Keep receipts and tracking numbers',
        'China: national ID card and household register (户口簿) for the Certificate of No Criminal Record (无犯罪记录证明)',
      ],
      howTo:
        '1. The certificate for the current country of residence counts if issued within 6 months before the application is submitted.\n2. Others count if issued after the last stay of 6 months or more there.\n3. Colour scans of the originals are uploaded.\n4. If one is late, a written explanation with proof of the request is usually attached instead.\n5. China: IRCC takes a Certificate of No Criminal Record (无犯罪记录证明), or a notification that one cannot be issued, covering from birth to the present, ideally with a QR code. In China it comes from the Public Security Bureau or police station where the hukou is registered or where you usually live, or through local government apps; from outside China, the hukou office explains how to apply online, by mail or in person.',
    },
    {
      id: 'medical',
      title: 'Get the upfront medical exam',
      offsetDays: -5,
      durationDays: 14,
      validForDays: 365,
      dependsOn: ['invitation'],
      documents: ['Medical exam confirmation'],
      prepare: ['Find a panel physician', 'Book one appointment only', 'Bring the passport'],
      howTo:
        '1. The exam is done by a panel physician, as close as possible to the application date.\n2. The physician gives an information sheet or IMM 1017B form to attach.\n3. Results are valid for 12 months; a new exam may be needed if landing comes later.',
    },
    {
      id: 'apply',
      title: 'Submit the permanent residence application (eAPR)',
      offsetDays: 0,
      durationDays: 3,
      dependsOn: [
        'invitation',
        'identity-docs',
        'apostille',
        'police',
        'medical',
        'language-test',
        'eca',
        'proof-of-funds',
      ],
      documents: [
        'Application receipt',
        'Passport',
        'Language test result',
        'Educational Credential Assessment',
        'Police certificate',
        'Medical exam confirmation',
      ],
      prepare: ['Check the current fees', 'Re-check claims against the profile'],
      howTo:
        '1. The application is submitted online within 60 days of the invitation.\n2. Processing fees and biometrics fees are paid at submission.',
    },
    {
      id: 'biometrics',
      title: 'Give biometrics',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: ['apply'],
      documents: ['Biometric instruction letter'],
      prepare: ['Book at a collection point', 'Bring the letter and passport'],
      howTo:
        '1. Applicants aged 14 to 79 usually give fingerprints and a photo.\n2. There are 30 days from the date on the letter to give them.',
    },
    {
      id: 'decision',
      title: 'Watch for the decision and pay the right of permanent residence fee',
      offsetDays: 180,
      durationDays: 120,
      dependsOn: ['biometrics'],
      documents: [],
      prepare: ['Check the IRCC account', 'Check the current fee'],
      howTo:
        '1. The decision covers eligibility, medical exam, police certificates and background checks.\n2. The right of permanent residence fee is paid before approval is finalized.\n3. Dates here are rough placeholders.',
    },
    {
      id: 'land',
      title: 'Land as a permanent resident (COPR)',
      offsetDays: 240,
      durationDays: 60,
      dependsOn: ['decision'],
      documents: ['Confirmation of Permanent Residence', 'Passport'],
      prepare: ['Check COPR details against the passport', 'Note the COPR expiry date'],
      howTo:
        '1. IRCC sends the COPR, and a permanent resident visa if the passport needs one.\n2. A COPR cannot be extended; travel to Canada happens before its expiry date.\n3. The COPR is shown to border services on arrival, or used for government services if already in Canada.\n4. Adding a "Became a permanent resident" date with the landing date starts the Citizenship · CA plan.',
    },
  ],
};
