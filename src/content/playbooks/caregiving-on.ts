import type { Playbook } from '../../domain/types';

export const caregivingOn: Playbook = {
  id: 'caregiving-on',
  title: 'Caring for a family member · Ontario',
  summary:
    'Paperwork plan for caring for a seriously ill family member from Ontario: the medical certificate, job-protected leave, EI caregiving benefits, powers of attorney, home and long-term care, and tax credits.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'caregiving',
  anchorKind: 'caregiving',
  ages: { from: 16 },
  conditions: [
    'You live in Ontario and are caring for or supporting a family member, or someone like family, who is seriously ill, injured or near the end of life',
    'The event date is when the care starts or you stop working to give it',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'EI caregiving benefits — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/ei/caregiving.html',
    },
    {
      title: 'Family caregiver leave — Your guide to the Employment Standards Act, Ontario.ca',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/family-caregiver-leave',
    },
    {
      title: 'Family medical leave — Your guide to the Employment Standards Act, Ontario.ca',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/family-medical-leave',
    },
    {
      title: 'Critical illness leave — Your guide to the Employment Standards Act, Ontario.ca',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/critical-illness-leave',
    },
    {
      title: 'Make a power of attorney — Ontario.ca',
      url: 'https://www.ontario.ca/page/make-power-attorney',
    },
    {
      title: 'Ontario Health atHome',
      url: 'https://ontariohealthathome.ca/',
    },
    {
      title: 'Get coverage for prescription drugs — Ontario.ca',
      url: 'https://www.ontario.ca/page/get-coverage-prescription-drugs',
    },
    {
      title: 'Disability tax credit — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/segments/tax-credits-deductions-persons-disabilities/disability-tax-credit.html',
    },
    {
      title: 'Canada caregiver credit — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/canada-caregiver-amount.html',
    },
    {
      title: 'Lines 33099 and 33199 – Eligible medical expenses — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/lines-33099-33199-eligible-medical-expenses-you-claim-on-your-tax-return.html',
    },
  ],
  steps: [
    {
      id: 'medical-certificate',
      title: 'Get a medical certificate for the person you care for',
      offsetDays: 0,
      durationDays: 7,
      dependsOn: [],
      documents: ['Medical certificate for EI caregiving benefits'],
      prepare: ["The person's written consent to share medical information", 'Name of their doctor or nurse practitioner'],
      howTo:
        '1. A medical doctor or nurse practitioner certifies that the person is critically ill or injured, or needs end-of-life care (a significant risk of death within 26 weeks).\n2. The same certificate supports the EI claim and the leave from work; for Ontario leaves it can come later, after the leave starts.\n3. Service Canada has its own certificate forms; ask the doctor to use the one for the benefit you apply for.',
    },
    {
      id: 'leave',
      title: 'Arrange job-protected leave with your employer',
      offsetDays: 0,
      durationDays: 7,
      conditions: ['Only if you are an employee covered by the Ontario Employment Standards Act (not federally regulated work)'],
      dependsOn: [],
      documents: ['Leave request to employer'],
      prepare: ['Planned start date and length', 'Medical certificate, once you have it'],
      howTo:
        '1. Family medical leave: up to 28 weeks in a 52-week period, for a family member with a significant risk of death within 26 weeks.\n2. Critical illness leave: up to 37 weeks for a minor child, or up to 17 weeks for an adult family member.\n3. Family caregiver leave: up to 8 weeks each calendar year per family member with a serious medical condition.\n4. These leaves are unpaid; EI benefits can replace part of the income.',
    },
    {
      id: 'ei',
      title: 'Apply for EI caregiving benefits',
      offsetDays: 21,
      durationDays: 14,
      conditions: ['Only if you stopped or cut back work and have enough insured hours, or opted in as self-employed'],
      dependsOn: ['medical-certificate'],
      documents: ['Record of Employment', 'EI benefit statement'],
      prepare: ['Social Insurance Number', 'Last day of work', 'Bank details for direct deposit', 'Details of the person cared for'],
      howTo:
        '1. Compassionate care benefits: up to 26 weeks. Family caregiver benefit for adults: up to 15 weeks. Family caregiver benefit for children: up to 35 weeks.\n2. Apply online as soon as you stop working; waiting more than 4 weeks after the last day of work can cost benefits.\n3. Eligibility usually needs 600 insured hours in the last 52 weeks; check current.\n4. Several family members can share the weeks, at the same time or one after another.',
    },
    {
      id: 'authority',
      title: 'Set up powers of attorney to act for them',
      offsetDays: 30,
      durationDays: 30,
      conditions: ['Only if the person may need someone to handle their money, health or personal care decisions'],
      dependsOn: [],
      documents: ['Continuing power of attorney for property', 'Power of attorney for personal care'],
      prepare: ["The person's wishes, while they can still give them", 'Who will act, and an alternate', 'Bank and account list'],
      howTo:
        '1. A continuing power of attorney for property covers money and property, and keeps working if the person loses capacity.\n2. A power of attorney for personal care covers health care, housing and other personal decisions.\n3. Free kits are available from the Office of the Public Guardian and Trustee; two witnesses sign.\n4. If the person can no longer make one, a guardianship application or the Public Guardian and Trustee may be involved.\n5. Not legal advice; a lawyer can help.',
    },
    {
      id: 'home-care',
      title: 'Ask Ontario Health atHome for a care assessment',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Care assessment and care plan'],
      prepare: ["The person's health card number", 'List of medications and diagnoses', 'What help is needed each day'],
      howTo:
        '1. Contact Ontario Health atHome (formerly Home and Community Care Support Services); a doctor or hospital can also refer.\n2. A care coordinator assesses needs for home care, nursing, personal support, respite or community programs.\n3. Applications for long-term care homes also go through Ontario Health atHome; the resident pays a co-payment for accommodation.',
    },
    {
      id: 'drug-coverage',
      title: 'Check their prescription drug coverage',
      offsetDays: 45,
      durationDays: 14,
      conditions: ['Only if the person lives in Ontario and has OHIP coverage'],
      dependsOn: [],
      documents: ['Trillium Drug Program approval, if applied'],
      prepare: ["The person's health card number", 'Their notice of assessment, for income', 'Yearly drug costs'],
      howTo:
        '1. From 65, the Ontario Drug Benefit covers most listed drugs automatically.\n2. Under 65, OHIP+ covers people 24 and under without a private plan; others with high drug costs can apply to the Trillium Drug Program, based on household income.\n3. Trillium runs on a benefit year from August 1; it is renewed each year.',
    },
    {
      id: 'dtc',
      title: 'Apply for the disability tax credit for them',
      offsetDays: 60,
      durationDays: 60,
      conditions: ['Only if the person has a severe and prolonged impairment'],
      dependsOn: [],
      documents: ['Form T2201', 'CRA DTC decision letter'],
      prepare: ["The person's SIN", 'Name of the medical practitioner who will certify'],
      howTo:
        '1. Part A of form T2201 is filled in by the person or their representative; Part B by a medical practitioner (can be submitted digitally).\n2. If approved, an unused disability amount can be transferred to a supporting relative.\n3. The DTC also opens the Registered Disability Savings Plan and the Child Disability Benefit.',
    },
    {
      id: 'tax-credits',
      title: 'Claim caregiver and medical expense credits on your return',
      offsetDays: 365,
      durationDays: 30,
      dependsOn: [],
      documents: ['Receipts for medical expenses', 'Notice of assessment'],
      prepare: ["The person's net income", 'Medical, attendant and equipment receipts', 'DTC approval, if any'],
      howTo:
        '1. The Canada caregiver amount is for supporting a spouse, partner or dependant with a physical or mental impairment.\n2. A provincial caregiver amount, where it applies, is claimed on the ON428; check current.\n3. Medical expenses paid for a dependant can be claimed, subject to income limits.\n4. This date is an estimate; move it to the next April 30. It repeats every year while you give care.',
    },
  ],
};
