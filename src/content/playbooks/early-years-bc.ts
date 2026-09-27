import type { Playbook } from '../../domain/types';

export const earlyYearsBc: Playbook = {
  id: 'early-years-bc',
  title: 'Early years · ages 1–4 · British Columbia',
  summary:
    'Child care, fee help, early learning drop-ins, health coverage and vaccines for a child from 1 to 4 in British Columbia. Child care waitlists are kept by each provider.',
  region: 'British Columbia, Canada',
  province: 'BC',
  family: 'early-years',
  anchorKind: 'born',
  ages: { from: 1, to: 4 },
  conditions: [
    'Your child is between 1 and 4',
    'You live in British Columbia',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Child care information for families — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/family-social-supports/caring-for-young-children/family-information',
    },
    {
      title: 'Child care map — Province of British Columbia',
      url: 'https://maps.gov.bc.ca/ess/hm/ccf/',
    },
    {
      title: '$10 a Day ChildCareBC Centres — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/family-social-supports/caring-for-young-children/childcarebc-programs/10-a-day-childcarebc-centres',
    },
    {
      title: '$10 a Day ChildCareBC: FAQ for families — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/family-social-supports/caring-for-young-children/childcarebc-programs/10-a-day-childcarebc-centres/faq-families',
    },
    {
      title: 'Child Care Fee Reduction Initiative: information for families — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/family-social-supports/caring-for-young-children/childcarebc-programs/child-care-fee-reduction-initiative-provider-opt-in-status/information-for-families',
    },
    {
      title: 'Affordable Child Care Benefit — Province of British Columbia',
      url: 'https://gov.bc.ca/affordablechildcarebenefit',
    },
    {
      title: 'Affordable Child Care Benefit: eligibility — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/family-social-supports/caring-for-young-children/childcarebc-programs/child-care-benefit/information-for-families/eligibility-estimate-funding',
    },
    {
      title: 'Affordable Child Care Benefit: apply for funding — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/family-social-supports/caring-for-young-children/childcarebc-programs/child-care-benefit/information-for-families/apply-funding',
    },
    {
      title: 'StrongStart BC — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/education-training/early-learning/support/programs/strongstart-bc',
    },
    {
      title: 'Basic dental, eyeglasses and hearing care (Healthy Kids) — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/managing-your-health/family/child-teen-health/dental-eyeglasses',
    },
    {
      title: 'MSP supplementary benefits — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/benefits/services-covered-by-msp/supplementary-benefits',
    },
    {
      title: 'Canadian Dental Care Plan: Who qualifies — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/dental/dental-care-plan/qualify.html',
    },
    {
      title: 'Canadian Dental Care Plan: How to apply — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/dental/dental-care-plan/apply.html',
    },
    {
      title: 'Immunization schedules for children — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/health-library/immunizations/schedules/children',
    },
    {
      title: 'Where to get immunized — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/health-library/immunizations/schedules/where-get-immunized',
    },
    {
      title: 'Vaccination Status Reporting Regulation — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/health-library/immunizations/children/vaccination-status-reporting-regulation',
    },
    {
      title: 'Submit or update your immunization records — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/managing-your-health/immunizations/update-records',
    },
    {
      title: 'Speech development, preschool — Fraser Health (example)',
      url: 'https://www.fraserhealth.ca/Service-Directory/Services/child-and-youth-services/speech-development-preschool',
    },
    {
      title: 'Speech and language therapy, children — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/find-care/find-health-services/program/speech-and-language-therapy-children',
    },
    {
      title: 'Medical benefits covered by MSP — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/benefits/services-covered-by-msp/medical-benefits',
    },
  ],
  steps: [
    {
      id: 'childcare-waitlist',
      title: 'Join licensed child care waitlists',
      offsetDays: 366,
      durationDays: 30,
      ages: { from: 1, to: 1 },
      dependsOn: [],
      documents: [],
      prepare: ['Start date you need', 'Days and hours needed', 'Shortlist of centres near home or work'],
      howTo:
        '1. Search licensed facilities on the province\'s child care map by city, distance, program type and hours.\n2. There is no provincial waitlist; each operator keeps and manages its own, so contact each one.\n3. If nobody has space, your local Child Care Resource and Referral Centre or the Child Care Service Centre (1-888-338-6622) can help.\n4. Facilities are licensed and inspected by the local health authority; inspection reports are on its website.',
    },
    {
      id: 'ten-a-day',
      title: 'Ask about $10 a Day ChildCareBC centres',
      offsetDays: 396,
      durationDays: 7,
      ages: { from: 1, to: 4 },
      conditions: ['Only if a $10 a Day ChildCareBC centre near you has, or may have, space'],
      dependsOn: ['childcare-waitlist'],
      documents: [],
      prepare: ['Province\'s list of $10 a Day centres by school region'],
      howTo:
        '1. $10 a Day ChildCareBC centres charge a capped low fee for full-time care.\n2. Parents don\'t apply to the province; contact each centre about its space and waitlist.\n3. Access depends on each centre\'s licensed capacity and waitlist; there is no priority list.\n4. If your current centre joins the program, your space converts without re-enrolling.',
    },
    {
      id: 'fee-reduction',
      title: 'Confirm the centre passes on the Child Care Fee Reduction',
      offsetDays: 396,
      durationDays: 7,
      ages: { from: 1, to: 4 },
      conditions: ['Only if you use licensed child care'],
      dependsOn: ['childcare-waitlist'],
      documents: [],
      prepare: ['Ask the provider whether it takes part in the Child Care Fee Reduction Initiative (CCFRI)'],
      howTo:
        '1. Participating licensed providers cut monthly fees for children 12 and under; it is not income-tested.\n2. Parents don\'t apply; the reduction shows as a lower monthly fee.\n3. Part-time care gets a pro-rated reduction.\n4. Check participants on the child care map or the fee reduction estimator; a provider still applying won\'t show, so ask it directly.',
    },
    {
      id: 'accb',
      title: 'Apply for the Affordable Child Care Benefit',
      offsetDays: 426,
      durationDays: 30,
      ages: { from: 1, to: 4 },
      conditions: [
        'Only if your family income is under the province\'s limit, or higher with large deductions',
        'Only if you work, study, look for work or have another qualifying reason for care',
      ],
      dependsOn: ['childcare-waitlist'],
      documents: ['Child Care Arrangement form (CF2798)', 'Notice of assessment'],
      prepare: ['My Family Services account', 'Provider\'s details', 'Reason you need care'],
      howTo:
        '1. A monthly benefit toward child care fees; income, family size and type of care set the amount.\n2. A parent is a BC resident and a citizen, permanent resident, Convention refugee or protected person.\n3. Parental leave is not a qualifying reason.\n4. New applicants fill in the Child Care Arrangement form with the provider and send it with the application.\n5. Apply through My Family Services, or by mail or fax with form CF2900, before the end of the month care starts.\n6. Renew every year, or sooner if your reason for care changes.',
    },
    {
      id: 'strongstart',
      title: 'Find a StrongStart BC centre and try a drop-in',
      offsetDays: 370,
      durationDays: 30,
      ages: { from: 1, to: 4 },
      dependsOn: [],
      documents: ['Birth certificate'],
      prepare: ['Nearest programs on the StrongStart BC map', 'Hours from the school or school district'],
      howTo:
        '1. StrongStart BC runs free, play-based early learning drop-ins for children 0 to 5 with a parent or caregiver.\n2. Most are in schools and run during the school year.\n3. On the first visit you fill in a registration form and show the child\'s ID, e.g. birth certificate or passport.\n4. Registering gives the child a Personal Education Number (PEN), the start of their BC school record.',
    },
    {
      id: 'dental',
      title: 'Sign up for children\'s dental and vision coverage',
      offsetDays: 366,
      durationDays: 60,
      ages: { from: 1, to: 4 },
      conditions: ['Only if your child has no private dental insurance or your family income is low'],
      dependsOn: [],
      documents: ['Notice of assessment', 'BC Services Card'],
      prepare: ['Child\'s Personal Health Number', 'Social Insurance Numbers', 'Any government dental coverage you already have'],
      howTo:
        '1. BC Healthy Kids: basic dental, prescription glasses and hearing help for children under 19 in families eligible for MSP supplementary benefits, which have an income limit.\n2. Apply for supplementary benefits with Health Insurance BC (HIBC); it asks for 12 months in Canada as a citizen or permanent resident.\n3. File taxes every year so HIBC can reassess; show the child\'s BC Services Card at the dentist or optometrist and confirm coverage first.\n4. Canadian Dental Care Plan (CDCP): for families with no private dental coverage and adjusted family net income under the federal limit, with tax returns filed.\n5. For CDCP, list the child as a dependant on your own application.',
    },
    {
      id: 'vaccines-12m',
      title: 'Get the 12-month vaccines',
      offsetDays: 366,
      durationDays: 60,
      ages: { from: 1, to: 1 },
      dependsOn: [],
      documents: ['Immunization record'],
      prepare: ['BC Services Card', 'Book with public health, your doctor or nurse practitioner'],
      howTo:
        '1. At 12 months: pneumococcal conjugate, meningococcal C conjugate, MMR and chickenpox (varicella).\n2. Routine vaccines are free.\n3. Keep the record; school will ask for it.',
    },
    {
      id: 'vaccines-18m',
      title: 'Get the 18-month vaccines',
      offsetDays: 548,
      durationDays: 30,
      ages: { from: 1, to: 1 },
      dependsOn: ['vaccines-12m'],
      documents: ['Immunization record'],
      prepare: ['BC Services Card', 'Book with public health, your doctor or nurse practitioner'],
      howTo:
        '1. At 18 months: DTaP-IPV-Hib (diphtheria, tetanus, whooping cough, polio, Hib).\n2. Indigenous children are also offered hepatitis A.\n3. Update the record after each visit.',
    },
    {
      id: 'speech',
      title: 'Check speech and language; self-refer if unsure',
      offsetDays: 731,
      durationDays: 30,
      ages: { from: 1, to: 4 },
      dependsOn: [],
      documents: [],
      prepare: ['Notes on words and sentences your child uses', 'Local public health unit\'s phone number'],
      howTo:
        '1. Public health speech-language services see preschool children with speech or language delays.\n2. Parents can self-refer; no doctor\'s referral is needed (Fraser Health and Island Health, for example).\n3. In Fraser Health, call your local health unit, which refers you to the nearest preschool speech service; it serves ages 5 and under.\n4. Don\'t wait for Kindergarten; re-check at 3 and 4.',
    },
    {
      id: 'eye-exam',
      title: 'Book an MSP-covered eye exam',
      offsetDays: 1096,
      durationDays: 30,
      ages: { from: 1, to: 4 },
      dependsOn: [],
      documents: ['BC Services Card'],
      prepare: ['Nearby optometrist', 'Any family history of eye problems'],
      howTo:
        '1. MSP covers an annual eye exam for children 0 to 18.\n2. Book with an optometrist and bring the child\'s BC Services Card.\n3. Healthy Kids covers prescription glasses once a year for eligible families.\n4. The date here is an estimate at age 3; book again every year.',
    },
    {
      id: 'vaccines-4y',
      title: 'Get the 4-to-6-year school-entry boosters',
      offsetDays: 1461,
      durationDays: 60,
      ages: { from: 4, to: 4 },
      dependsOn: ['vaccines-18m'],
      documents: ['Immunization record'],
      prepare: ['BC Services Card', 'Book with public health, your doctor, nurse practitioner or a pharmacist'],
      howTo:
        '1. At 4 to 6 years: Tdap-IPV and MMRV.\n2. Pharmacists can give routine vaccines from age 4; in some areas nurses run Kindergarten clinics at school.\n3. A child who had lab-confirmed chickenpox after age 1 gets MMR instead of MMRV.\n4. The date here is set at age 4; many families book before Kindergarten starts.',
    },
    {
      id: 'kg-immunization-record',
      title: 'Make sure the immunization record is in the provincial registry',
      offsetDays: 1521,
      durationDays: 14,
      ages: { from: 4, to: 4 },
      dependsOn: ['vaccines-4y'],
      documents: ['Immunization record'],
      prepare: ['Photo of the official record', 'Child\'s Personal Health Number', 'Health Gateway account'],
      howTo:
        '1. Under the Vaccination Status Reporting Regulation, public health collects immunization records for students from Kindergarten to Grade 12.\n2. Check the record in Health Gateway; if doses are missing, upload the record on the Provincial Immunization Registry page, or bring it to a public health unit or clinic.\n3. Online updates take about 10 to 14 days.\n4. A child with no record on file is noted as unimmunized and may be asked to stay home during an outbreak.',
    },
  ],
};
