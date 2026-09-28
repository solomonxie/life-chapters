import type { Playbook } from '../../domain/types';

export const graduatedCa: Playbook = {
  id: 'graduated-ca',
  title: 'After graduation · Canada',
  summary:
    'Paperwork around finishing college or university in Canada: graduation and transcripts, student loan repayment, health coverage, tax credits, and the Post-Graduation Work Permit for international graduates. Dates count from convocation.',
  region: 'Canada',
  country: 'CA',
  family: 'graduated',
  anchorKind: 'graduated',
  ages: { from: 18 },
  conditions: [
    'You are finishing a program at a Canadian college, polytechnic or university',
    'Loan, RESP and permit steps apply only to those who have them',
    'This is a planning aid, not financial or immigration advice; the government pages and your school are the reference',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Repaying your student loan — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans/repay.html',
    },
    {
      title: 'Start repaying your student loan — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans/repay/start.html',
    },
    {
      title: 'Repayment Assistance Plan — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans/repay/assistance/rap.html',
    },
    {
      title: 'National Student Loans Service Centre (NSLSC)',
      url: 'https://www.csnpe-nslsc.canada.ca/en/home',
    },
    {
      title: 'StudentAid BC',
      url: 'https://studentaidbc.ca/apply/how-to-apply',
    },
    {
      title: 'OSAP: Ontario Student Assistance Program — ontario.ca',
      url: 'https://www.ontario.ca/page/osap-ontario-student-assistance-program',
    },
    {
      title: 'Line 32300: Your tuition, education, and textbook amounts — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-32300-your-tuition-education-textbook-amounts.html',
    },
    {
      title: 'P105: Students and income tax — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/p105/p105-students-income-tax.html',
    },
    {
      title: 'Using an RESP — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/student-financial-aid/education-savings/resp/use.html',
    },
    {
      title: 'Post-graduation work permit: Who can apply — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/eligibility.html',
    },
    {
      title: 'Post-graduation work permit: How to apply — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation/apply.html',
    },
    {
      title: 'Social Insurance Number for temporary residents — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/temporary-residents.html',
    },
    {
      title: 'Update your SIN record — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/update.html',
    },
    {
      title: 'MSP: How to enrol — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/how-to-enrol',
    },
    {
      title: 'Apply for OHIP and get a health card — ontario.ca',
      url: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
    },
    {
      title: 'Express Entry: Canadian Experience Class — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/canadian-experience-class.html',
    },
  ],
  steps: [
    {
      id: 'apply-graduate',
      title: 'Apply to graduate',
      offsetDays: -120,
      durationDays: 14,
      dependsOn: [],
      documents: ['Graduation application confirmation'],
      prepare: [
        'Degree audit or program check from the registrar',
        'Name exactly as it should appear on the parchment',
        'Mailing address for the parchment',
        'Outstanding fees or library fines cleared',
      ],
      howTo:
        '1. Most schools ask students to apply to graduate through the student portal, a few months before convocation.\n2. The registrar checks the program requirements; holds for unpaid fees can block the parchment and transcripts.\n3. Deadlines are set by each school; this date is an estimate.',
    },
    {
      id: 'language-test',
      title: 'Take a language test for the PGWP',
      offsetDays: -60,
      durationDays: 60,
      dependsOn: [],
      documents: ['Language test results (IELTS, CELPIP, TEF, TCF or PTE Core)'],
      prepare: ['Book a test date with an approved test provider', 'Passport for test day'],
      conditions: ['Only if you studied on a study permit and plan to apply for a PGWP'],
      howTo:
        '1. PGWP applications include results from an approved language test.\n2. IRCC lists the levels: CLB or NCLC 7 in all four skills for a university degree, CLB or NCLC 5 for a college or other program.\n3. Results are valid for 2 years from the test date and must be valid when the application is submitted.\n4. Check the current rules on the PGWP eligibility page.',
    },
    {
      id: 'permit-status',
      title: 'Check the study permit expiry and status after studies',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Study permit'],
      prepare: ['Study permit expiry date', 'Expected date final marks are released'],
      conditions: ['Only if you studied on a study permit'],
      howTo:
        '1. A study permit usually stops being valid 90 days after the program is completed, or on its expiry date if that comes first.\n2. Applying for a PGWP while the study permit is still valid keeps the right to stay under maintained status until IRCC decides.\n3. If the study permit expires first, a visitor record or leaving Canada are the options IRCC lists.',
    },
    {
      id: 'completion-letter',
      title: 'Get the completion letter and final transcript',
      offsetDays: -10,
      durationDays: 14,
      dependsOn: ['apply-graduate'],
      documents: ['Official letter of program completion', 'Official final transcript'],
      prepare: ['Final marks posted', 'Transcript request through the registrar'],
      howTo:
        '1. Once final marks are in, the registrar issues an official completion letter and a final transcript showing the credential was granted.\n2. The date on the completion confirmation starts the 180-day PGWP window.\n3. Employers and other schools often ask for official transcripts sent directly by the registrar.\n4. Release dates depend on the school; this date is an estimate.',
    },
    {
      id: 'convocation',
      title: 'Receive the degree parchment',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['apply-graduate'],
      documents: ['Degree, diploma or certificate parchment'],
      prepare: ['Convocation registration or gown booking', 'Mailing address if the parchment is mailed'],
      howTo:
        '1. The parchment is handed out at convocation or mailed afterwards.\n2. Keep it flat and safe; replacements are slow and cost a fee.\n3. Certified copies are often used instead of the original for applications.',
    },
    {
      id: 'transcripts',
      title: 'Order official transcripts and copies',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: ['completion-letter'],
      documents: ['Official transcripts', 'Certified copy of the parchment'],
      prepare: ['List of employers, schools or licensing bodies that ask for them', 'Transcript fee'],
      howTo:
        '1. Registrars send official transcripts on paper or electronically, often straight to the recipient.\n2. Professional licensing bodies and graduate schools usually ask for transcripts sent directly by the school.\n3. A few spare sealed copies can save time later.',
    },
    {
      id: 'nslsc',
      title: 'Confirm the student loan account at the NSLSC',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['NSLSC account', 'Provincial loan account, if separate'],
      prepare: [
        'Last day of studies as the school reported it',
        'Current mailing address, email and phone',
        'Bank details for pre-authorized debit',
      ],
      conditions: ['Only if you have Canada Student Loans or provincial student loans'],
      howTo:
        '1. Loans enter a 6-month non-repayment period after the final term ends or studies drop to part-time.\n2. In B.C., Ontario and most provinces, the federal and provincial parts are managed together at the NSLSC; Alberta, Nova Scotia and P.E.I. loans are repaid separately, and Quebec, Nunavut and the Northwest Territories are handled by the province or territory.\n3. The federal part has been interest-free since April 2023; a provincial part may still build interest, so check the terms in the account.\n4. A repayment schedule arrives within the 6 months.',
    },
    {
      id: 'health-coverage',
      title: 'Replace the student health and dental plan',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: [],
      documents: ['Provincial health card', 'Proof of other coverage'],
      prepare: [
        'End date of the student plan coverage',
        'Employer benefits start date, if any',
        'Provincial health insurance status (MSP in B.C., OHIP in Ontario)',
      ],
      howTo:
        '1. Student health and dental plans usually run to the end of the term or policy year the fee was paid for; the school\'s plan office has the exact end date.\n2. Some student plans offer a short graduate extension or a conversion plan without medical questions, applied for within a set time.\n3. Provincial coverage (MSP, OHIP and others) covers doctor and hospital care, not usually dental or most drugs.\n4. International graduates: eligibility for provincial coverage on a work permit differs by province; check with the province.\n5. The date is an estimate for a spring convocation.',
    },
    {
      id: 'eap',
      title: 'Take any last RESP education payments',
      offsetDays: 150,
      durationDays: 30,
      dependsOn: [],
      documents: ['Proof of enrolment for the last term', 'RESP statement'],
      prepare: ['Contact at the RESP provider', 'Remaining grant and income balance'],
      conditions: ['Only if you are the beneficiary of an RESP with money left in it'],
      howTo:
        '1. Educational assistance payments (EAPs) can still be paid for up to 6 months after enrolment in a qualifying program ends.\n2. EAPs are taxable income for the student, who often pays little or no tax on them.\n3. After that window, the grant portion goes back to the government and the options change; the RESP provider explains them.\n4. The due date counts roughly from the last day of studies; move it to match.',
    },
    {
      id: 'pgwp',
      title: 'Apply for a Post-Graduation Work Permit (PGWP)',
      offsetDays: 150,
      durationDays: 60,
      dependsOn: ['completion-letter', 'permit-status', 'language-test'],
      documents: ['PGWP approval (work permit)'],
      prepare: [
        'Official completion letter and final transcript',
        'Language test results',
        'Passport and study permit',
        'Digital photo and fee',
      ],
      conditions: ['Only if you studied on a study permit at an eligible institution'],
      howTo:
        '1. The PGWP is applied for online within 180 days of the confirmation that the program was completed.\n2. The study permit has to have been valid at some point in those 180 days.\n3. Applying while the study permit is still valid gives maintained status, and graduates who met the off-campus work conditions can work full-time while waiting.\n4. Field-of-study requirements apply to some college programs for students who applied for their study permit on or after 1 November 2024.\n5. The due date is an estimate; count 180 days from the date on the completion letter.',
    },
    {
      id: 'repayment-start',
      title: 'Make the first student loan payment',
      offsetDays: 180,
      durationDays: 14,
      dependsOn: ['nslsc'],
      documents: ['Repayment schedule'],
      prepare: ['Pre-authorized debit set up', 'Monthly budget for the payment'],
      conditions: ['Only if you have Canada Student Loans or provincial student loans'],
      howTo:
        '1. Payments start in the 7th month after studies end, on the date in the repayment schedule.\n2. Payments can be made through the NSLSC account; loans repaid to a province separately follow that province\'s schedule.\n3. The due date is an estimate; set it to the date in the schedule.',
    },
    {
      id: 'rap',
      title: 'Apply for the Repayment Assistance Plan (RAP)',
      offsetDays: 210,
      durationDays: 30,
      dependsOn: ['nslsc'],
      documents: ['RAP approval'],
      prepare: ['Gross family income', 'Family size', 'Monthly loan payment'],
      conditions: ['Only if the monthly student loan payment is hard to afford'],
      howTo:
        '1. RAP sets an affordable payment based on family income and size; below set income levels the payment can be zero for 6 months.\n2. The loan has to be in repayment and the borrower living in Canada.\n3. RAP is applied for online through the NSLSC or on paper, and renewed every 6 months.\n4. Provincial loans managed separately have their own repayment help.',
    },
    {
      id: 'tax-return',
      title: 'Claim tuition amounts on the tax return',
      offsetDays: 300,
      durationDays: 30,
      dependsOn: [],
      documents: ['T2202 Tuition and Enrolment Certificate', 'Filed tax return with Schedule 11'],
      prepare: [
        'T2202 from the school\'s student portal (issued by the end of February)',
        'Unused tuition amounts from the last notice of assessment',
        'Student loan interest paid in the year, if any',
      ],
      howTo:
        '1. Tuition fees on the T2202 are claimed on Schedule 11.\n2. Unused tuition amounts carry forward with no time limit and are used once there is tax to reduce; the notice of assessment shows the balance.\n3. Up to $5,000 of the current year\'s federal amount can be transferred to a parent, grandparent or spouse instead.\n4. Interest paid on government student loans can be claimed on line 31900 or carried forward up to 5 years.\n5. Provinces set their own tuition credits; some, such as Ontario, ended new provincial tuition credits but still let earlier amounts carry forward.\n6. The return is due by 30 April; this date is an estimate for a spring convocation.',
    },
    {
      id: 'sin-update',
      title: 'Update the SIN record with the new permit',
      offsetDays: 240,
      durationDays: 14,
      dependsOn: ['pgwp'],
      documents: ['Updated SIN confirmation'],
      prepare: ['New work permit', 'Passport'],
      conditions: ['Only if you have a SIN starting with 9 and received a PGWP'],
      howTo:
        '1. A SIN starting with 9 expires on the same date as the permit it was issued with.\n2. After a new permit is issued, the SIN record is updated online, by mail or at a Service Canada office.\n3. Employers ask for the updated expiry date.',
    },
    {
      id: 'cec',
      title: 'Check the timing for the Canadian Experience Class',
      offsetDays: 600,
      durationDays: 30,
      dependsOn: ['pgwp'],
      documents: ['Record of skilled work hours in Canada'],
      prepare: ['Job titles and TEER categories', 'Start date of full-time skilled work', 'PGWP expiry date'],
      conditions: ['Only if you hold a PGWP and plan to apply for permanent residence'],
      howTo:
        '1. The Canadian Experience Class counts at least 1 year, or 1,560 hours, of skilled paid work in Canada (TEER 0 to 3) in the 3 years before applying.\n2. Work done while a full-time student, including co-op terms, does not count.\n3. A PGWP cannot be extended, so its expiry date sets the time available.\n4. The Express Entry steps are in the Skilled migration · CA plan.',
    },
  ],
};
