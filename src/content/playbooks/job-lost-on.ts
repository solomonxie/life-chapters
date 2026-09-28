import type { Playbook } from '../../domain/types';

export const jobLostOn: Playbook = {
  id: 'job-lost-on',
  title: 'Job ended · Ontario',
  summary:
    'Paperwork plan for the weeks and months after a job ends in Ontario: final pay, EI, termination and severance pay, benefits, pension and next year’s taxes.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'job-lost',
  anchorKind: 'job-lost',
  conditions: [
    'Your job in Ontario ended: laid off, let go, or you quit',
    'For provincially regulated work; banks, airlines, telecoms and other federally regulated employers follow the Canada Labour Code instead',
    'This is a planning aid, not legal advice; the Ontario Ministry of Labour and Service Canada are the reference',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Your guide to the ESA: Termination of employment — Ontario.ca',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/termination-employment',
    },
    {
      title: 'Your guide to the ESA: Severance pay — Ontario.ca',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/severance-pay',
    },
    {
      title: 'Your guide to the ESA: Filing a claim — Ontario.ca',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/filing-claim',
    },
    {
      title: 'EI regular benefits: Apply — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit/apply.html',
    },
    {
      title: 'EI reporting — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/ei/ei-internet-reporting.html',
    },
    {
      title: 'Record of Employment guide — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/reports/roe-guide.html',
    },
    {
      title: 'Canadian Dental Care Plan: Do you qualify — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/dental/dental-care-plan/qualify.html',
    },
    {
      title: 'Learn about OHIP+ — Ontario.ca',
      url: 'https://www.ontario.ca/page/learn-about-ohip-plus',
    },
    {
      title: 'Get help with high prescription drug costs — Ontario.ca',
      url: 'https://www.ontario.ca/page/get-help-high-prescription-drug-costs',
    },
    {
      title: 'Work permit types — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/work-permit-types.html',
    },
  ],
  steps: [
    {
      id: 'final-pay',
      title: 'Check the final pay and vacation pay',
      offsetDays: 8,
      durationDays: 1,
      dependsOn: [],
      documents: ['Final pay stub'],
      prepare: ['Hours worked since the last pay', 'Vacation pay owing'],
      howTo:
        '1. Under the Ontario Employment Standards Act, termination pay is due 7 days after the job ends or on the next regular pay day, whichever is later; final wages follow the same timing.\n2. Final pay includes wages earned and any vacation pay owing.\n3. Keep the last pay stubs; they help with EI and any claim later.',
    },
    {
      id: 'ei-apply',
      title: 'Apply for EI regular benefits',
      offsetDays: 7,
      durationDays: 1,
      conditions: ['Only if you worked enough insurable hours; check current EI rules for your region'],
      dependsOn: [],
      documents: ['EI confirmation page'],
      prepare: ['Social Insurance Number', 'Last day of work and reason it ended', 'Employer names and dates for the past 52 weeks', 'Bank details for direct deposit'],
      howTo:
        '1. Apply online as soon as possible after the last day of work; applying more than 4 weeks later can mean losing benefits.\n2. There is no need to wait for the Record of Employment; Service Canada gets electronic ones from the employer.\n3. A new claim has a 1-week unpaid waiting period.\n4. Declare any severance, termination pay or vacation pay; Service Canada decides whether it changes when payments start.\n5. The online form takes about an hour; a partly filled form is saved for 72 hours.',
    },
    {
      id: 'roe',
      title: 'Check the Record of Employment',
      offsetDays: 14,
      durationDays: 3,
      dependsOn: [],
      documents: ['Record of Employment (ROE)'],
      prepare: ['My Service Canada Account sign-in'],
      howTo:
        '1. Electronic ROEs are usually due 5 calendar days after the end of the pay period with the last day worked; paper ones within 5 days of the interruption.\n2. View and print electronic ROEs in My Service Canada Account.\n3. Check the reason for separation, dates and insurable hours; ask the employer to amend errors, or tell Service Canada.',
    },
    {
      id: 'ei-reports',
      title: 'Send the first EI report, then every 2 weeks',
      offsetDays: 24,
      durationDays: 1,
      conditions: ['Only if you applied for EI'],
      dependsOn: ['ei-apply'],
      documents: ['EI access code letter'],
      prepare: ['4-digit access code from the benefit statement', 'Days and hours worked and earnings before deductions', 'Any training, travel or days not available for work'],
      howTo:
        '1. Service Canada mails a benefit statement with a 4-digit access code.\n2. A report is completed every 2 weeks to keep benefits coming.\n3. Report work and earnings for each week, even if paid later, and any other money received.\n4. This repeats every 2 weeks while on EI; the date here is an estimate for the first one.',
    },
    {
      id: 'notice-pay',
      title: 'Check termination pay and severance pay',
      offsetDays: 21,
      durationDays: 7,
      conditions: ['Only if the employer ended the job and you worked there at least 3 months'],
      dependsOn: [],
      documents: ['Termination letter', 'Employment contract'],
      prepare: ['Start date and last day', 'Any written notice received', "Whether the employer's payroll is $2.5 million or more"],
      howTo:
        '1. Ontario employers give written notice, termination pay instead, or a mix: 1 week under 1 year, 2 weeks for 1 to 3 years, then 1 more week per year, up to 8 weeks at 8 years.\n2. Benefit plan contributions continue through the statutory notice period.\n3. Severance pay is separate: after 5 or more years, where the employer has a payroll of $2.5 million or more or ended 50 or more jobs in 6 months because of a closure; 1 week per year of service, up to 26 weeks.\n4. Some cases are exempt, such as wilful misconduct or temporary layoff.\n5. A contract or the courts may give more than the Act; not legal advice.',
    },
    {
      id: 'benefits',
      title: 'Replace workplace health and dental cover',
      offsetDays: 28,
      durationDays: 7,
      conditions: ['Only if you had workplace health, drug or dental benefits'],
      dependsOn: [],
      documents: ['Benefits booklet', 'Conversion offer from the insurer'],
      prepare: ['Date the group cover ends, after any statutory notice period', 'Prescriptions and dental work planned'],
      howTo:
        '1. OHIP is not tied to the job; basic medical cover carries on.\n2. Many group plans let you convert life or health cover to an individual plan within a short window, often around 31 days; check the booklet or insurer.\n3. For drugs, OHIP+ covers people 24 and under with no private plan; from 25 the Trillium Drug Program helps with high drug costs.\n4. With no dental insurance and adjusted family net income under $90,000, the Canadian Dental Care Plan may apply; taxes have to be filed.\n5. A spouse’s plan may be able to add you.',
    },
    {
      id: 'permit',
      title: 'Check your status on an employer-specific permit',
      offsetDays: 30,
      durationDays: 30,
      conditions: ['Only if you hold an employer-specific (closed) work permit'],
      dependsOn: [],
      documents: ['Work permit'],
      prepare: ['Permit expiry date', 'Any new job offer and whether it needs an LMIA'],
      howTo:
        '1. A closed permit only allows work for the employer named on it; a new employer usually means a new permit or authorization before starting.\n2. Staying in Canada without work may mean changing to visitor status before the permit expires.\n3. Check current IRCC rules and processing times; not immigration advice.',
    },
    {
      id: 'job-search',
      title: 'Register for job search help',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: [],
      documents: ['Resume'],
      prepare: ['References', 'Recent training or certificates'],
      howTo:
        '1. Employment Ontario offers free job search help, training and, for some people, funding.\n2. Job Bank lists jobs across Canada and can send alerts.\n3. Keep a record of job searches; Service Canada may ask for it while on EI.',
    },
    {
      id: 'pension',
      title: 'Decide what to do with the pension and group RRSP',
      offsetDays: 60,
      durationDays: 30,
      conditions: ['Only if you were in a workplace pension plan or group RRSP'],
      dependsOn: [],
      documents: ['Termination statement of pension options', 'Group RRSP statement'],
      prepare: ['Deadline on the options statement', 'Details of an RRSP or LIRA to transfer to'],
      howTo:
        '1. The plan administrator sends a statement of options after the job ends.\n2. A vested pension can usually be left as a deferred pension, or its commuted value moved to a locked-in account (LIRA) or a new employer’s plan.\n3. A group RRSP can usually be moved to a personal RRSP without tax by direct transfer.\n4. Ontario-registered plans are overseen by the Financial Services Regulatory Authority of Ontario (FSRA).\n5. Not financial advice; the statement lists the deadline to choose.',
    },
    {
      id: 'complaint',
      title: 'File an employment standards claim if pay is missing',
      offsetDays: 600,
      durationDays: 14,
      conditions: ['Only if final pay, vacation pay, termination or severance pay was not paid'],
      dependsOn: ['final-pay', 'notice-pay'],
      documents: ['Pay stubs', 'Termination letter', 'Record of hours'],
      prepare: ['What is owed and for which dates', 'My Ontario account for the online claim'],
      howTo:
        '1. A claim is generally filed within 2 years of the alleged ESA violation.\n2. File online through the e-claim system or the claimant portal, or send the PDF form by fax or mail.\n3. The Employment Standards Information Centre answers questions: 1-800-531-5551.\n4. Filing sooner keeps records fresh; the date here leaves a margin before the 2-year limit.',
    },
    {
      id: 'tax',
      title: 'Report severance and EI on the next tax return',
      offsetDays: 300,
      durationDays: 30,
      dependsOn: [],
      documents: ['T4 slips', 'T4E slip for EI', 'Notice of assessment'],
      prepare: ['Any severance or damages paid', 'RRSP receipts'],
      howTo:
        '1. EI benefits are taxable and come on a T4E slip.\n2. Severance and payments for loss of employment are usually treated as a retiring allowance; part of it may be moved to an RRSP for years of service before 1996 (check current CRA rules).\n3. Lump sums have tax withheld at set rates, which may not match the tax owed.\n4. With high net income for the year, part of the EI may have to be repaid on the return.\n5. File by April 30; the date here is an estimate.',
    },
  ],
};
