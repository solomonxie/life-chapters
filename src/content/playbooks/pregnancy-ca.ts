import type { Playbook } from '../../domain/types';

export const pregnancyCa: Playbook = {
  id: 'pregnancy-ca',
  title: 'Expecting a baby · CA',
  summary:
    'Care, leave, benefits and preparation plan for a pregnancy in Ontario, counted back from the due date.',
  region: 'Ontario, Canada',
  anchorKind: 'baby-due',
  conditions: [
    'For a pregnancy with a due date, living in Ontario',
    'Leave steps apply to employees covered by the Ontario Employment Standards Act',
    'EI steps apply to people who pay into Employment Insurance',
  ],
  reviewedAt: '2026-09-26',
  version: 1,
  sources: [
    {
      title: 'Midwifery in Ontario',
      url: 'https://www.ontario.ca/page/midwifery-ontario',
    },
    {
      title: 'Find a family doctor or nurse practitioner (Health Care Connect)',
      url: 'https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner',
    },
    {
      title: 'Healthy Babies Healthy Children program',
      url: 'https://www.ontario.ca/page/healthy-babies-healthy-children-program',
    },
    {
      title: 'Prenatal Screening Ontario: Enhanced First Trimester Screening (eFTS)',
      url: 'https://www.prenatalscreeningontario.ca/types-of-screening/chromosome-screening/enhanced-first-trimester-screening-efts/',
    },
    {
      title: 'Your guide to the Employment Standards Act: Pregnancy and parental leave',
      url: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/pregnancy-and-parental-leave',
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
      title: 'Register the birth of a new baby (Ontario)',
      url: 'https://www.ontario.ca/page/register-birth-new-baby',
    },
    {
      title: 'Estate planning and wills (Ontario)',
      url: 'https://www.ontario.ca/page/estate-planning-and-wills',
    },
  ],
  steps: [
    {
      id: 'prenatal-care',
      title: 'Book prenatal care with a family doctor, OB or midwife',
      offsetDays: -238,
      durationDays: 14,
      dependsOn: [],
      documents: ['Ontario health card'],
      prepare: [
        'First day of the last period, for the due date',
        'List of medications and health history',
        'Choose a midwife, family doctor or obstetrician',
      ],
      howTo:
        '1. Midwifery care is free to Ontario residents and needs no referral; call a midwife as early in pregnancy as possible, as spaces fill.\n2. Midwives are the primary care provider through pregnancy, birth and 6 weeks after.\n3. Without a family doctor or nurse practitioner, register with Health Care Connect by phone.\n4. Ask about the free Healthy Babies Healthy Children program.\n5. This date (about 8 weeks pregnant) is a planning estimate.',
    },
    {
      id: 'prenatal-screening',
      title: 'Decide on prenatal screening with your provider',
      offsetDays: -187,
      durationDays: 14,
      dependsOn: ['prenatal-care'],
      documents: [],
      prepare: ['Questions about eFTS and NIPT', 'Book the ultrasound and blood test if chosen'],
      conditions: ['Only if you choose to screen; screening is optional'],
      howTo:
        '1. Enhanced First Trimester Screening (eFTS) is done between 11 weeks 2 days and 13 weeks 3 days of pregnancy: an ultrasound, then a blood test.\n2. NIPT can be done after 9 or 10 weeks, depending on the lab; it is publicly funded only in certain situations.\n3. This due date is the end of the eFTS window; talk to your provider before it.',
    },
    {
      id: 'plan-leave',
      title: 'Tell the employer and plan the leave dates',
      offsetDays: -150,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Planned last day of work', 'Pregnancy and parental leave lengths', 'Employer top-up policy'],
      conditions: ['Only if you are an employee covered by Ontario employment standards'],
      howTo:
        '1. Pregnancy leave needs at least 13 weeks of employment before the due date.\n2. Pregnancy leave is up to 17 weeks, unpaid, and can start as early as 17 weeks before the due date.\n3. Parental leave is up to 61 weeks after pregnancy leave, or up to 63 weeks for other parents, and must start within 78 weeks of the birth.\n4. When to tell the employer is your choice; this date is a planning estimate.',
    },
    {
      id: 'will',
      title: 'Update your will and name a guardian for the child',
      offsetDays: -90,
      durationDays: 30,
      dependsOn: [],
      documents: ['Will'],
      prepare: ['Who would care for the child', 'Who would manage money for the child', 'Estate trustee'],
      howTo:
        '1. In Ontario, a will can appoint one or more people to have decision-making responsibility (custody) for children who are not yet adults.\n2. Review beneficiaries on insurance and registered accounts at the same time.\n3. Timing is a planning estimate.',
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
        '1. Maternity benefits: up to 15 weeks for the person who gave birth.\n2. Standard parental: up to 40 weeks shared, at most 35 per parent, at 55% of earnings up to a cap, taken within 52 weeks of the birth.\n3. Extended parental: up to 69 weeks shared, at most 61 per parent, at 33% of earnings up to a cap, taken within 78 weeks.\n4. Sharing parents must pick the same option, and it can\'t be changed once payments start.',
    },
    {
      id: 'classes',
      title: 'Take prenatal classes',
      offsetDays: -60,
      durationDays: 60,
      dependsOn: ['prenatal-care'],
      documents: [],
      prepare: ['Ask your provider or public health unit which classes run locally', 'Online or in person'],
      howTo:
        '1. Local public health units, which run Healthy Babies Healthy Children, offer prenatal education.\n2. Timing in the second and third trimester is a planning estimate.',
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
      id: 'hospital-bag',
      title: 'Pack the hospital bag',
      offsetDays: -35,
      durationDays: 7,
      dependsOn: [],
      documents: ['Ontario health card'],
      prepare: ['Clothes for you and the baby', 'Toiletries', 'Phone charger', 'Birth preferences', 'Contacts for support and childcare'],
      conditions: ['Only if planning a hospital or birth centre birth'],
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
      prepare: ['First and middle names', 'Surname', 'Agreement from all parents'],
      howTo:
        '1. The birth is registered online within 30 days of the birth.\n2. A surname different from the parents\', or a single name for cultural reasons, can be registered online; all parents must be present to agree.',
    },
    {
      id: 'leave-notice',
      title: 'Give written notice of pregnancy leave',
      offsetDays: -28,
      durationDays: 3,
      dependsOn: ['plan-leave'],
      documents: ['Leave notice'],
      prepare: ['Leave start date', 'Planned parental leave dates'],
      conditions: ['Only if you are an employee covered by Ontario employment standards'],
      howTo:
        '1. The Employment Standards Act requires at least 2 weeks\' written notice before pregnancy leave starts.\n2. The due date here is 2 weeks before a leave assumed to start 2 weeks before the due date; move it with the real leave date.',
    },
    {
      id: 'partner-leave',
      title: 'Other parent: give notice of parental leave',
      offsetDays: -28,
      durationDays: 3,
      dependsOn: ['ei-option'],
      documents: ['Leave notice'],
      prepare: ['Leave start and end dates', 'Weeks of EI parental benefits to claim'],
      conditions: ['Only if the other parent is an employee planning parental leave'],
      howTo:
        '1. Parents who did not take pregnancy leave get up to 63 weeks of parental leave.\n2. Parental leave must start within 78 weeks of the birth.\n3. Check the Employment Standards guide for the written notice rules; this date is a planning estimate.',
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
      title: 'Start pregnancy leave',
      offsetDays: -14,
      durationDays: 1,
      dependsOn: ['leave-notice'],
      documents: ['Record of Employment'],
      prepare: ['Hand over work', 'Confirm the employer will issue the Record of Employment'],
      conditions: ['Only if you are an employee covered by Ontario employment standards'],
      howTo:
        '1. Pregnancy leave can start as early as 17 weeks before the due date; EI maternity benefits as early as 12 weeks before.\n2. Two weeks before the due date is a planning estimate; move it to your real last day.',
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
