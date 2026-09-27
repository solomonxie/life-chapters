import type { Playbook } from '../../domain/types';

export const pregnancyBc: Playbook = {
  id: 'pregnancy-bc',
  title: 'Expecting a baby · British Columbia',
  summary:
    'Care, leave, benefits and preparation plan for a pregnancy in British Columbia, counted back from the due date.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'pregnancy',
  anchorKind: 'baby-due',
  conditions: [
    'For a pregnancy with a due date, living in British Columbia',
    'Leave steps apply to employees covered by the BC Employment Standards Act',
    'EI steps apply to people who pay into Employment Insurance',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Coverage wait period for the Medical Services Plan (MSP)',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/how-to-enrol/coverage-wait-period',
    },
    {
      title: 'HealthLink BC: Midwives',
      url: 'https://www.healthlinkbc.ca/find-care/midwives',
    },
    {
      title: 'Midwives Association of BC: Frequently asked questions',
      url: 'https://www.bcmidwives.com/faq.html',
    },
    {
      title: 'HealthLink BC: Health Connect Registry',
      url: 'https://www.healthlinkbc.ca/find-care/health-connect-registry',
    },
    {
      title: 'HealthLink BC: Healthy start, public health services',
      url: 'https://www.healthlinkbc.ca/living-well/family-planning-pregnancy-and-childbirth/pregnancy/health-care-providers-during-4',
    },
    {
      title: "HealthLink BC: Baby's Best Chance handbook",
      url: 'https://www.healthlinkbc.ca/living-well/parenting/parenting-babies-0-12-months/babys-best-chance-parents-handbook-pregnancy-and',
    },
    {
      title: 'Perinatal Services BC: Pregnancy & Parent Learning Centre',
      url: 'https://learningcentre.perinatalservicesbc.ca/',
    },
    {
      title: 'Perinatal Services BC: Prenatal genetic screening',
      url: 'https://www.perinatalservicesbc.ca/our-services/screening-programs/prenatal-genetic-screening',
    },
    {
      title: 'Perinatal Services BC: Prenatal genetic screening decision aid',
      url: 'https://www.perinatalservicesbc.ca/Documents/Screening/Prenatal-Families/ScreeningDecisionAid.pdf',
    },
    {
      title: 'BC Women\'s Hospital: Pre-registration to give birth at BC Women\'s',
      url: 'https://www.bcwomens.ca/health-professionals/refer-a-patient/pre-registration-to-give-birth-at-bc-womens',
    },
    {
      title: 'BC Employment Standards: Leaves of absence',
      url: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/time-off/leaves-of-absence',
    },
    {
      title: 'BC Employment Standards: Maternity leave, Act Part 6, Section 50',
      url: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/forms-resources/igm/esa-part-6-section-50',
    },
    {
      title: 'BC Employment Standards: Parental leave, Act Part 6, Section 51',
      url: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/forms-resources/igm/esa-part-6-section-51',
    },
    {
      title: 'EI maternity and parental benefits: What these benefits offer',
      url: 'https://www.canada.ca/en/services/benefits/ei/ei-maternity-parental.html',
    },
    {
      title: 'EI maternity and parental benefits: Eligibility',
      url: 'https://www.canada.ca/en/services/benefits/ei/ei-maternity-parental/eligibility.html',
    },
    {
      title: 'EI maternity and parental benefits: Apply',
      url: 'https://www.canada.ca/en/services/benefits/ei/ei-maternity-parental/apply.html',
    },
    {
      title: 'Your Guide to a Healthy Pregnancy',
      url: 'https://www.canada.ca/en/public-health/services/health-promotion/healthy-pregnancy/healthy-pregnancy-guide.html',
    },
    {
      title: 'Transport Canada: Choosing a child car seat or booster seat',
      url: 'https://tc.canada.ca/en/road-transportation/child-car-seat-safety/choosing-child-car-seat-booster-seat',
    },
    {
      title: 'Transport Canada: Expiry dates on child car seats and booster seats',
      url: 'https://tc.canada.ca/en/road-transportation/defects-recalls-vehicles-tires-child-car-seats/expiry-dates-child-car-seats-booster-seats',
    },
    {
      title: 'Birth registration (British Columbia)',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/birth-adoption/births/birth-registration',
    },
    {
      title: 'BC online birth registration: FAQ',
      url: 'https://ebr.vs.gov.bc.ca/ebr/OnLineHelp/faq.html',
    },
    {
      title: 'Family Law Act (BC), Part 4: Care of and time with children',
      url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_04',
    },
  ],
  steps: [
    {
      id: 'msp-check',
      title: 'Check your MSP coverage is active',
      offsetDays: -245,
      durationDays: 7,
      dependsOn: [],
      documents: ['BC Services Card'],
      prepare: ['Date you arrived in BC, if new', 'Personal Health Number'],
      conditions: ['Only if you are new to BC or unsure your MSP coverage is active'],
      howTo:
        '1. New and returning BC residents wait the rest of the month they arrive plus two months before MSP coverage starts; apply as soon as you arrive.\n2. Midwifery care and prenatal genetic screening are free with MSP coverage.\n3. This date is a planning estimate.',
    },
    {
      id: 'prenatal-care',
      title: 'Book prenatal care with a family doctor, OB or midwife',
      offsetDays: -238,
      durationDays: 14,
      dependsOn: [],
      documents: ['BC Services Card'],
      prepare: [
        'First day of the last period, for the due date',
        'List of medications and health history',
        'Choose a midwife, family doctor or obstetrician',
      ],
      howTo:
        '1. Midwifery care is covered by MSP for BC residents and needs no referral; contact a midwife as soon as you know you are pregnant, as spaces can be limited.\n2. Midwives are the primary care provider through pregnancy, birth and about 6 weeks after.\n3. Without a family doctor or nurse practitioner, join the Health Connect Registry online or by calling 8-1-1.\n4. Register the pregnancy with your local health authority to connect with public health nurses, and ask for the Baby\'s Best Chance handbook.\n5. This date (about 8 weeks pregnant) is a planning estimate.',
    },
    {
      id: 'prenatal-screening',
      title: 'Decide on prenatal genetic screening with your provider',
      offsetDays: -183,
      durationDays: 14,
      dependsOn: ['prenatal-care'],
      documents: [],
      prepare: ['Questions about SIPS, IPS, Quad and NIPT', 'Lab requisition from your provider if you choose to screen'],
      conditions: ['Only if you choose to screen; screening is optional'],
      howTo:
        '1. Perinatal Services BC offers screening free to pregnant people with MSP coverage.\n2. SIPS is two blood tests: the first from 9 weeks to the end of the 13th week, the second from 14 weeks to the end of the 20th week. IPS adds a nuchal translucency ultrasound.\n3. Quad is one blood test from 14 weeks to the end of the 20th week, for those who start prenatal care later.\n4. NIPT can be done after 10 weeks; MSP covers it only in certain situations.\n5. This due date is the end of the first SIPS window; talk to your provider before it.',
    },
    {
      id: 'plan-leave',
      title: 'Tell the employer and plan the leave dates',
      offsetDays: -150,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Planned last day of work', 'Maternity and parental leave lengths', 'Employer top-up policy'],
      conditions: ['Only if you are an employee covered by BC employment standards'],
      howTo:
        '1. BC maternity (pregnancy) leave is up to 17 consecutive weeks, unpaid, with no minimum length of employment.\n2. It can start no earlier than 13 weeks before the expected birth date and no later than the birth, and lasts at least 6 weeks after the birth.\n3. Parental leave for the birth parent is up to 61 weeks and starts right after maternity leave unless the employer agrees otherwise; about 78 weeks in total.\n4. When to tell the employer is your choice; this date is a planning estimate.',
    },
    {
      id: 'will',
      title: 'Update your will and name a guardian for the child',
      offsetDays: -90,
      durationDays: 30,
      dependsOn: [],
      documents: ['Will'],
      prepare: ['Who would care for the child', 'Who would manage money for the child', 'Executor'],
      howTo:
        '1. Under the BC Family Law Act, a guardian can appoint, in a will, a person to become the child\'s guardian on their death.\n2. Review beneficiaries on insurance and registered accounts at the same time.\n3. Timing is a planning estimate.',
    },
    {
      id: 'ei-option',
      title: 'Choose standard or extended EI parental benefits',
      offsetDays: -60,
      durationDays: 14,
      dependsOn: ['plan-leave'],
      documents: [],
      prepare: ['Leave length each parent wants', 'How the weeks will be shared'],
      conditions: ['Only if you\'re eligible for EI (600 insured hours)'],
      howTo:
        '1. Maternity benefits: up to 15 weeks for the person who gave birth.\n2. Standard parental: up to 40 weeks shared, at most 35 per parent, at 55% of earnings up to a cap, taken within 52 weeks of the birth.\n3. Extended parental: up to 69 weeks shared, at most 61 per parent, at 33% of earnings up to a cap, taken within 78 weeks.\n4. Sharing parents pick the same option, and it can\'t be changed once payments start.',
    },
    {
      id: 'classes',
      title: 'Take prenatal classes',
      offsetDays: -60,
      durationDays: 60,
      dependsOn: ['prenatal-care'],
      documents: [],
      prepare: ['Ask your provider or public health nurse which classes run locally', 'Online or in person'],
      howTo:
        '1. Providers and public health nurses can point to prenatal classes and pregnancy programs in your community.\n2. Perinatal Services BC runs a free online Pregnancy & Parent Learning Centre.\n3. Timing in the second and third trimester is a planning estimate.',
    },
    {
      id: 'birth-place',
      title: 'Confirm where you\'ll give birth and the hospital pre-registration',
      offsetDays: -56,
      durationDays: 14,
      dependsOn: ['prenatal-care'],
      documents: ['BC Services Card'],
      prepare: ['Hospital or home birth', 'Which hospital your provider attends', 'Hospital parking and entrance'],
      howTo:
        '1. Midwives attend births in hospital or out of hospital, such as at home.\n2. For a hospital birth, your doctor or midwife usually pre-registers you; BC Women\'s Hospital, for example, asks for this before 32 weeks.\n3. This date (32 weeks) is a planning estimate; ask your provider what your hospital needs.',
    },
    {
      id: 'car-seat',
      title: 'Buy a rear-facing infant car seat with the National Safety Mark',
      offsetDays: -42,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Check it fits your vehicle', 'Check the expiry date label', 'Avoid second-hand seats'],
      howTo:
        '1. The National Safety Mark shows a seat meets Canadian safety standards.\n2. Infants ride rear-facing until they reach the seat\'s weight or height limit.\n3. If a seat is second-hand: it has the mark, was never in a collision, has no recalls, and all parts work.\n4. The expiry date is on a label on the seat or in the manual.',
    },
    {
      id: 'leave-notice',
      title: 'Give written notice of maternity leave',
      offsetDays: -42,
      durationDays: 3,
      dependsOn: ['plan-leave'],
      documents: ['Leave request'],
      prepare: ['Leave start date', 'Planned parental leave dates', 'Medical or nurse practitioner certificate if the employer asks'],
      conditions: ['Only if you are an employee covered by BC employment standards'],
      howTo:
        '1. The Employment Standards Act asks for a written request at least 4 weeks before the leave starts; the employer may ask for a medical or nurse practitioner certificate.\n2. The due date here is 4 weeks before a leave assumed to start 2 weeks before the due date; move it with the real leave date.',
    },
    {
      id: 'hospital-bag',
      title: 'Pack the hospital bag',
      offsetDays: -35,
      durationDays: 7,
      dependsOn: [],
      documents: ['BC Services Card'],
      prepare: ['Clothes for you and the baby', 'Toiletries', 'Phone charger', 'Birth preferences', 'Contacts for support and childcare'],
      conditions: ['Only if planning a hospital birth'],
      howTo:
        '1. Think about what you will need for a hospital birth and pack the bag.\n2. Timing is a planning estimate; babies can arrive early.',
    },
    {
      id: 'name',
      title: 'Choose the baby\'s name',
      offsetDays: -30,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ['Given, middle and surname', 'Agreement from all parents'],
      howTo:
        '1. A birth in BC is registered with the Vital Statistics Agency within 30 days of the birth.\n2. The child needs a given name and a surname; the surname can be either parent\'s, a combination, or different, but no more than two surnames combined.\n3. Each parent listed certifies the online registration and is present when it is completed.',
    },
    {
      id: 'partner-leave',
      title: 'Other parent: give notice of parental leave',
      offsetDays: -28,
      durationDays: 3,
      dependsOn: ['ei-option'],
      documents: ['Leave request'],
      prepare: ['Leave start and end dates', 'Weeks of EI parental benefits to claim'],
      conditions: ['Only if the other parent is an employee planning parental leave'],
      howTo:
        '1. A parent who did not take maternity leave gets up to 62 consecutive weeks of parental leave.\n2. It can start any time within 78 weeks of the birth.\n3. A written request is given at least 4 weeks before the leave starts; this date assumes leave from the birth, so move it with the real start.',
    },
    {
      id: 'car-seat-install',
      title: 'Install the car seat and register it for recalls',
      offsetDays: -28,
      durationDays: 7,
      dependsOn: ['car-seat'],
      documents: ['Car seat registration'],
      prepare: ['Vehicle manual', 'Car seat manual', 'Registration card or online form'],
      howTo:
        '1. Install following both manuals.\n2. Register with the manufacturer by card or online, so they can contact you about recalls.',
    },
    {
      id: 'start-leave',
      title: 'Start maternity leave',
      offsetDays: -14,
      durationDays: 1,
      dependsOn: ['leave-notice'],
      documents: ['Record of Employment'],
      prepare: ['Hand over work', 'Confirm the employer will issue the Record of Employment'],
      conditions: ['Only if you are an employee covered by BC employment standards'],
      howTo:
        '1. BC maternity leave can start as early as 13 weeks before the due date; EI maternity benefits as early as 12 weeks before.\n2. Two weeks before the due date is a planning estimate; move it to your real last day.',
    },
    {
      id: 'ei-apply',
      title: 'Apply for EI maternity and parental benefits',
      offsetDays: -7,
      durationDays: 7,
      dependsOn: ['start-leave', 'ei-option'],
      documents: ['Record of Employment', 'EI application confirmation'],
      prepare: ['Social Insurance Number', 'Banking details for direct deposit', 'Standard or extended choice'],
      conditions: [
        'Only if you\'re eligible for EI (600 insured hours in the 52 weeks before the claim)',
        'Only if your weekly earnings drop by more than 40%',
      ],
      howTo:
        '1. Apply online as soon as possible after you stop working; applying more than 4 weeks after the last day of work may lose benefits.\n2. Don\'t wait for the Record of Employment; documents can follow.\n3. A sharing parent submits their own application.',
    },
  ],
};
