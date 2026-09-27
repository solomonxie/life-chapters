import type { Playbook } from '../../domain/types';

export const pnpOn: Playbook = {
  id: 'pnp-on',
  title: 'Provincial nomination · Ontario',
  summary:
    'Paperwork plan for permanent residence through the Ontario Immigrant Nominee Program, from the job offer and Expression of Interest to the nomination and the IRCC application.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'pnp',
  anchorKind: 'visa-lodge',
  ages: { from: 18 },
  conditions: [
    "You're applying for permanent residence through the Ontario Immigrant Nominee Program (OINP)",
    'You have a full-time, permanent job offer from an Ontario employer, or you are a self-employed physician in Ontario',
    'You plan to live and work in Ontario after becoming a permanent resident',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Ontario Immigrant Nominee Program (OINP) — Ontario.ca',
      url: 'https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp',
    },
    {
      title: 'Ontario Workforce Priority stream — Ontario.ca',
      url: 'https://www.ontario.ca/page/ontario-workforce-priority-stream',
    },
    {
      title: '2026 Ontario Immigrant Nominee Program updates — Ontario.ca',
      url: 'https://www.ontario.ca/page/2026-ontario-immigrant-nominee-program-updates',
    },
    {
      title: 'OINP closed streams — Ontario.ca',
      url: 'https://www.ontario.ca/page/ontario-immigrant-nominee-program-streams',
    },
    {
      title: 'How the Provincial Nominee Program works — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees/works.html',
    },
    {
      title: 'Provincial nominees: Express Entry — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees/express-entry.html',
    },
    {
      title: 'Provincial nominees: Non-Express Entry — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees/non-express-entry.html',
    },
    {
      title: 'Express Entry: Submit your profile — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile.html',
    },
    {
      title: 'Express Entry: Language test results — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html',
    },
    {
      title: 'Express Entry: Educational credential assessment — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/education-assessed.html',
    },
    {
      title: 'Express Entry: Police certificates — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/police-certificates.html',
    },
    {
      title: 'Medical exam requirements for permanent residents — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/medical-exams/requirements-permanent-residents.html',
    },
    {
      title: 'Check processing times — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html',
    },
  ],
  steps: [
    {
      id: 'eligibility',
      title: 'Check Ontario Workforce Priority eligibility',
      offsetDays: -300,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: [
        'The job offer\'s NOC code and TEER level',
        'Months of full-time paid work in that job',
        'Language level and highest education',
        'Whether the wage meets the level for the job location',
      ],
      howTo:
        '1. Since June 26, 2026 the OINP runs one stream, Ontario Workforce Priority; the Employer Job Offer, Master\'s and PhD Graduate, and Express Entry (Human Capital Priorities, French-Speaking Skilled Worker, Skilled Trades) streams are closed.\n2. It has pathways for TEER 0 to 3 jobs, TEER 4 and 5 jobs, and self-employed physicians (no job offer).\n3. TEER 0 to 3: usually 6 months of consecutive full-time work in the offered job within the last 12 months, 3 months for recent Ontario graduates, or 2 years cumulative experience.\n4. TEER 4 and 5: at least 9 months of cumulative full-time work within 2 years.\n5. Legal status in Canada is needed if you are here.\n6. Not immigration advice; the OINP pages decide eligibility, and more changes were announced.',
    },
    {
      id: 'language',
      title: 'Take an approved language test',
      offsetDays: -240,
      durationDays: 60,
      validForDays: 730,
      conditions: ["Not needed if you're a recent Ontario graduate and won't use the Express Entry option"],
      dependsOn: ['eligibility'],
      documents: ['Language test result'],
      prepare: ['Pick an approved test', 'Book a sitting'],
      howTo:
        '1. Minimums in all four abilities: CLB 6 for TEER 0 to 3 jobs, CLB 5 for skilled trades, CLB 4 for TEER 4 and 5.\n2. Higher levels, and a second official language at CLB 6, raise the EOI score.\n3. Express Entry counts results less than 2 years old.',
    },
    {
      id: 'eca',
      title: 'Get an Educational Credential Assessment',
      offsetDays: -180,
      durationDays: 120,
      validForDays: 1826,
      conditions: ['Only if your qualifying education is from outside Canada'],
      dependsOn: ['eligibility'],
      documents: ['Educational Credential Assessment', 'Degree certificates and transcripts'],
      prepare: ['Pick an IRCC-designated organization', 'Check the current fee'],
      howTo:
        '1. Credentials from outside Canada need an ECA report less than 5 years old.\n2. TEER 0 to 3 non-trades jobs ask for a postsecondary credential of at least 1 year; trades and TEER 4 and 5 ask for secondary school.\n3. Processing time varies by organization; the 120 days is an estimate.',
    },
    {
      id: 'job-offer',
      title: 'Get the full-time, permanent job offer',
      offsetDays: -210,
      durationDays: 30,
      conditions: ['Only for the job offer pathways, not self-employed physicians'],
      dependsOn: ['eligibility'],
      documents: ['Job offer letter'],
      prepare: ['Full-time, permanent, in Ontario', 'Wage at or above the level for the location'],
      howTo:
        '1. The employer has been in business for at least 3 years, has premises in Ontario and meets revenue and staffing minimums for its location.\n2. If you are outside Canada, the employer shows it tried to recruit Canadians or permanent residents first.',
    },
    {
      id: 'employer-form',
      title: 'Employer submits the job offer in the Employer Portal',
      offsetDays: -180,
      durationDays: 21,
      validForDays: 30,
      conditions: ['Only for the job offer pathways, not self-employed physicians'],
      dependsOn: ['job-offer'],
      documents: ['Job offer ID'],
      prepare: ['Ask the employer to register in the OINP Employer Portal', 'Get the job offer ID'],
      howTo:
        '1. The employer registers and submits the job offer, then gives you a job offer ID.\n2. The EOI is registered within 30 calendar days of that submission.',
    },
    {
      id: 'ee-profile',
      title: 'Keep a valid Express Entry profile',
      offsetDays: -160,
      durationDays: 14,
      validForDays: 365,
      conditions: ['Only if your job is TEER 0 to 3 and you choose the Express Entry option'],
      dependsOn: ['language', 'eca'],
      documents: ['Express Entry profile'],
      prepare: ['IRCC secure account', 'Check you meet a federal Express Entry program'],
      howTo:
        '1. The Express Entry option is open to TEER 0 to 3 jobs only.\n2. You meet the minimum criteria of a federal Express Entry program and keep the profile valid.\n3. A profile expires after 12 months; see the "Skilled migration · CA" plan.',
    },
    {
      id: 'eoi',
      title: 'Register the Expression of Interest',
      offsetDays: -160,
      durationDays: 7,
      dependsOn: ['employer-form', 'language', 'eca'],
      documents: ['EOI confirmation'],
      prepare: ['Job offer ID', 'Language results and ECA', 'Work and earnings history'],
      howTo:
        '1. Register in the OINP e-filing portal; physicians contact the OINP to register.\n2. The score adds up: job and wage (up to 61), education (up to 20), language (up to 25), and region (up to 15; Toronto 0, Northern Ontario 15).\n3. A valid work permit adds 10 points, a study permit 5.\n4. Invitations go to the highest scores; there is no set wait.',
    },
    {
      id: 'documents',
      title: 'Gather the documents on the OINP checklist',
      offsetDays: -130,
      durationDays: 30,
      dependsOn: ['eligibility'],
      documents: ['Passport', 'Work or study permit', 'Employment references', 'Pay stubs'],
      prepare: ['Download the checklist for your pathway', 'Translations for documents not in English or French', 'Colour scans'],
      howTo:
        '1. The window after an invitation is short, so collect documents before it arrives.\n2. The checklist is on the stream page.',
    },
    {
      id: 'invitation',
      title: 'Receive an invitation to apply',
      offsetDays: -120,
      durationDays: 30,
      validForDays: 17,
      dependsOn: ['eoi'],
      documents: ['Invitation to apply'],
      prepare: ['Watch the e-filing account', 'Tell the employer the same day'],
      howTo:
        '1. Draw timing isn\'t predictable; the 30 days is an estimate.\n2. Move this step to the real invitation date.',
    },
    {
      id: 'apply-oinp',
      title: 'Submit the OINP application within 17 days',
      offsetDays: -105,
      durationDays: 14,
      dependsOn: ['invitation', 'documents'],
      documents: ['OINP application receipt'],
      prepare: ['Employer submits its part first', 'Check the current fee'],
      howTo:
        '1. The employer submits its application within 14 calendar days of the invitation.\n2. You submit yours within 17 calendar days, and only after the employer has.\n3. Physicians have 17 calendar days.',
    },
    {
      id: 'decision',
      title: 'Watch for the nomination decision',
      offsetDays: -30,
      durationDays: 60,
      validForDays: 182,
      dependsOn: ['apply-oinp'],
      documents: ['Nomination certificate'],
      prepare: ['Check the e-filing account', 'Answer any request quickly'],
      howTo:
        '1. The OINP doesn\'t publish a fixed processing time; the 60 days is an estimate.\n2. After nomination, apply to IRCC within 6 months.\n3. The nomination stays valid until IRCC approves or refuses the permanent residence application.',
    },
    {
      id: 'ee-accept',
      title: 'Accept the nomination in the Express Entry profile (+600 CRS)',
      offsetDays: -20,
      durationDays: 7,
      conditions: ['Only if you chose the Express Entry option'],
      dependsOn: ['decision', 'ee-profile'],
      documents: [],
      prepare: ['Log in to the IRCC account'],
      howTo:
        '1. The OINP enters the nomination in the Express Entry system.\n2. There are 30 calendar days to accept or refuse it.\n3. Accepting adds 600 points, which usually leads to an invitation in a later round.',
    },
    {
      id: 'ee-ita',
      title: 'Receive the Express Entry invitation',
      offsetDays: -10,
      durationDays: 10,
      validForDays: 60,
      conditions: ['Only if you chose the Express Entry option'],
      dependsOn: ['ee-accept'],
      documents: ['Invitation to apply'],
      prepare: ['Watch the IRCC account'],
      howTo:
        '1. After the invitation there are 60 days to submit the application to IRCC.\n2. Timing is an estimate; move this step to the real date.',
    },
    {
      id: 'police-medical',
      title: 'Order police certificates and the medical exam',
      offsetDays: -5,
      durationDays: 45,
      validForDays: 182,
      dependsOn: ['apply-oinp'],
      documents: ['Police certificate', 'Medical exam confirmation'],
      prepare: ['List countries lived in 6 months or more since 18', 'Find a panel physician'],
      howTo:
        '1. IRCC asks for these with the permanent residence application.\n2. Police certificates take different times by country; the 45 days is an estimate.',
    },
    {
      id: 'apply-ircc',
      title: 'Apply to IRCC for permanent residence',
      offsetDays: 0,
      durationDays: 3,
      dependsOn: ['decision', 'ee-ita', 'police-medical'],
      documents: ['Nomination certificate', 'Application receipt', 'Passport'],
      prepare: ['Check the current fees', 'Re-check details against the OINP application'],
      howTo:
        '1. Express Entry option: submit the eAPR within 60 days of the invitation.\n2. Base route: apply through the IRCC Permanent Residence Portal within 6 months of nomination.\n3. IRCC makes the final decision; processing times are estimates on the IRCC page.',
    },
    {
      id: 'follow-up',
      title: 'Keep the nomination conditions and watch for the IRCC decision',
      offsetDays: 180,
      durationDays: 120,
      dependsOn: ['apply-ircc'],
      documents: [],
      prepare: ['Keep living and working in Ontario as the nomination describes', 'Answer OINP follow-ups'],
      howTo:
        '1. The OINP follows up with nominees to confirm the nomination conditions are met.\n2. Dates here are rough placeholders.',
    },
  ],
};
