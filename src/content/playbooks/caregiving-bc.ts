import type { Playbook } from '../../domain/types';

export const caregivingBc: Playbook = {
  id: 'caregiving-bc',
  title: 'Caring for a family member · British Columbia',
  summary:
    'Paperwork plan for caring for a seriously ill family member from British Columbia: the medical certificate, job-protected leave, EI caregiving benefits, legal authority, home and long-term care, and tax credits.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'caregiving',
  anchorKind: 'caregiving',
  ages: { from: 16 },
  conditions: [
    'You live in British Columbia and are caring for or supporting a family member, or someone like family, who is seriously ill, injured or near the end of life',
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
      title: 'Leaves of absence — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/time-off/leaves-of-absence',
    },
    {
      title: 'Incapacity planning — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/managing-your-health/incapacity-planning',
    },
    {
      title: 'Home and community care — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/accessing-health-care/home-community-care',
    },
    {
      title: 'Fair PharmaCare plan — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/who-we-cover/fair-pharmacare-plan',
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
        '1. A medical doctor or nurse practitioner certifies that the person is critically ill or injured, or needs end-of-life care (a significant risk of death within 26 weeks).\n2. The same certificate supports the EI claim and the leave from work.\n3. Service Canada has its own certificate forms; ask the doctor to use the one for the benefit you apply for.',
    },
    {
      id: 'leave',
      title: 'Arrange job-protected leave with your employer',
      offsetDays: 0,
      durationDays: 7,
      conditions: ['Only if you are an employee covered by the BC Employment Standards Act (not federally regulated work)'],
      dependsOn: [],
      documents: ['Leave request to employer'],
      prepare: ['Planned start date and length', 'Medical certificate, once you have it'],
      howTo:
        '1. Compassionate care leave: up to 27 weeks in a 52-week period, for a family member expected to die within 26 weeks.\n2. Critical illness or injury leave: up to 36 weeks for a child, or up to 16 weeks for a family member 19 or older.\n3. Family responsibility leave: up to 5 days each employment year for a child or immediate family member.\n4. These leaves are unpaid; EI benefits can replace part of the income.',
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
      title: 'Set up legal authority to act for them',
      offsetDays: 30,
      durationDays: 30,
      conditions: ['Only if the person may need someone to handle their money, health or personal care decisions'],
      dependsOn: [],
      documents: ['Enduring power of attorney', 'Representation agreement', 'Advance directive'],
      prepare: ["The person's wishes, while they can still give them", 'Who will act, and an alternate', 'Bank and account list'],
      howTo:
        '1. An enduring power of attorney covers financial and legal matters.\n2. A representation agreement covers health and personal care; a standard one (section 7) can be made even when capacity is reduced.\n3. An advance directive records the person\'s own health care instructions.\n4. The person makes these while capable; if they can no longer do so, a court committeeship or the Public Guardian and Trustee may be involved.\n5. Not legal advice; a lawyer or notary can help.',
    },
    {
      id: 'home-care',
      title: 'Ask the health authority for a home and community care assessment',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Care assessment and care plan'],
      prepare: ["The person's Personal Health Number", 'List of medications and diagnoses', 'What help is needed each day'],
      howTo:
        '1. Contact the home and community care office of the regional health authority; a doctor or hospital can also refer.\n2. A case manager assesses needs for home support, nursing, adult day programs, respite or assisted living.\n3. Long-term care is also arranged through the health authority; publicly funded care costs are based on income.',
    },
    {
      id: 'pharmacare',
      title: 'Check their Fair PharmaCare registration',
      offsetDays: 45,
      durationDays: 14,
      conditions: ['Only if the person lives in British Columbia and has MSP coverage'],
      dependsOn: [],
      documents: ['Fair PharmaCare confirmation'],
      prepare: ["The person's Personal Health Number", 'Their notice of assessment, for income'],
      howTo:
        '1. Fair PharmaCare helps with prescription costs based on family net income, not age.\n2. Registration is free and done online or by phone.\n3. Income is checked each year from the tax return, so their return needs filing.',
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
        '1. The Canada caregiver amount is for supporting a spouse, partner or dependant with a physical or mental impairment.\n2. A provincial caregiver amount, where it applies, is claimed on the BC428; check current.\n3. Medical expenses paid for a dependant can be claimed, subject to income limits.\n4. This date is an estimate; move it to the next April 30. It repeats every year while you give care.',
    },
  ],
};
