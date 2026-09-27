import type { Playbook } from '../../domain/types';

export const earlyYearsCa: Playbook = {
  id: 'early-years-ca',
  title: 'Early years · ages 1–4 · Ontario',
  summary:
    'Child care, family programs, health coverage and check-ups for a child from 1 to 4 in Ontario. Child care is run locally; details vary by municipality.',
  region: 'Ontario, Canada',
  anchorKind: 'born',
  ages: { from: 1, to: 4 },
  conditions: [
    'Your child is between 1 and 4',
    'You live in Ontario',
  ],
  reviewedAt: '2026-09-26',
  version: 1,
  sources: [
    {
      title: 'Find and pay for child care — Ontario.ca',
      url: 'https://www.ontario.ca/page/find-and-pay-child-care',
    },
    {
      title: 'Find child care near you — Ontario child care finder',
      url: 'https://www.earlyyears.edu.gov.on.ca/LCCWWeb/childcare/search.xhtml',
    },
    {
      title: 'TELCCS waitlist registration — City of Toronto (example)',
      url: 'https://www.toronto.ca/community-people/children-parenting/children-programs-activities/licensed-child-care/toronto-early-learning-and-child-care-services/registration/',
    },
    {
      title: 'Canada-Ontario early years and child care agreement — Ontario.ca',
      url: 'https://www.ontario.ca/page/canada-ontario-early-years-and-child-care-agreement',
    },
    {
      title: 'Child care subsidies — Ontario.ca',
      url: 'https://www.ontario.ca/page/child-care-subsidies',
    },
    {
      title: 'Child care fee subsidy — City of Toronto (example)',
      url: 'https://www.toronto.ca/community-people/employment-social-support/child-family-support/child-care-support/',
    },
    {
      title: 'Find an EarlyON child and family centre — Ontario.ca',
      url: 'https://www.ontario.ca/page/find-earlyon-child-and-family-centre',
    },
    {
      title: 'Ontario\'s routine immunization schedule — Ontario.ca',
      url: 'https://www.ontario.ca/page/ontarios-routine-immunization-schedule',
    },
    {
      title: 'Vaccines for children at school — Ontario.ca',
      url: 'https://www.ontario.ca/page/vaccines-children-school',
    },
    {
      title: 'Enhanced 18-month well-baby visit — Ontario.ca',
      url: 'https://www.ontario.ca/page/enhanced-18-month-well-baby-visit',
    },
    {
      title: 'Preschool speech and language program — Ontario.ca',
      url: 'https://www.ontario.ca/page/preschool-speech-and-language-program',
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
      title: 'Get dental care (Healthy Smiles Ontario) — Ontario.ca',
      url: 'https://www.ontario.ca/page/get-dental-care',
    },
    {
      title: 'What OHIP covers — Ontario.ca',
      url: 'https://www.ontario.ca/page/what-ohip-covers',
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
        '1. Search licensed centres and home child care with Ontario\'s child care finder.\n2. There is no single provincial waitlist; join each centre\'s own list, or your city\'s where it runs one (Toronto does for its own centres).\n3. Waits can be long; many families join during pregnancy, so join now if you haven\'t.\n4. Check a caregiver\'s safety record through the link on the Ontario child care page.',
    },
    {
      id: 'cwelcc',
      title: 'Confirm the centre charges CWELCC reduced fees',
      offsetDays: 396,
      durationDays: 7,
      ages: { from: 1, to: 4 },
      conditions: ['Only if you use a licensed centre or home child care agency enrolled in CWELCC'],
      dependsOn: ['childcare-waitlist'],
      documents: [],
      prepare: ['Ask each centre whether it is enrolled in CWELCC'],
      howTo:
        '1. Under the Canada-wide Early Learning and Child Care (CWELCC) system, enrolled licensees cut fees for children under 6.\n2. A child who turns 6 in a licensed preschool, kindergarten or family age group stays eligible until June 30.\n3. Parents don\'t apply; the reduction comes through an enrolled provider.\n4. The province sets a daily fee cap that changes over time; check the current cap on Ontario.ca.',
    },
    {
      id: 'subsidy',
      title: 'Apply for a child care fee subsidy',
      offsetDays: 380,
      durationDays: 60,
      ages: { from: 1, to: 4 },
      conditions: ['Only if you need help with fees; the amount depends on family income'],
      dependsOn: [],
      documents: ['Notice of assessment'],
      prepare: ['Adjusted family net income from your tax return', 'Your municipality\'s or DSSAB\'s subsidy office'],
      howTo:
        '1. Apply to your local municipal service manager (CMSM), District Social Services Administration Board (DSSAB) or First Nation, not the province.\n2. What you pay is set on a sliding scale from adjusted family net income on your tax return.\n3. Children under 13 qualify, or up to 18 with special needs.\n4. Some cities keep a subsidy waitlist (Toronto does); apply early.\n5. It can be used for licensed care, recreation programs, camps and school-board before- and after-school programs.',
    },
    {
      id: 'earlyon',
      title: 'Find an EarlyON centre and try a drop-in',
      offsetDays: 370,
      durationDays: 30,
      ages: { from: 1, to: 4 },
      dependsOn: [],
      documents: [],
      prepare: ['Nearest centres on the Ontario map', 'Weekly program schedule'],
      howTo:
        '1. EarlyON Child and Family Centres run free programs for children from birth to 6 and their parents or caregivers.\n2. Activities include reading, storytelling, sing-alongs and games, with advice from early childhood professionals.\n3. Many run in libraries, schools, parks and community centres.',
    },
    {
      id: 'dental',
      title: 'Sign up for children\'s dental coverage',
      offsetDays: 366,
      durationDays: 60,
      ages: { from: 1, to: 4 },
      conditions: ['Only if your child has no private dental insurance or your family income is low'],
      dependsOn: [],
      documents: ['Notice of assessment'],
      prepare: ['Child\'s date of birth', 'Child\'s SIN, if they have one', 'Any government dental coverage you already have'],
      howTo:
        '1. Canadian Dental Care Plan (CDCP): for families with no access to private dental insurance and adjusted family net income under the federal limit; tax returns must be filed.\n2. For CDCP, list the child as a dependant on your own application.\n3. Healthy Smiles Ontario (HSO): free for children 17 and under in low-income households; income limits are updated yearly.\n4. Children on Ontario Works or ODSP are enrolled in HSO automatically; others apply online or by mail, and a card arrives by post.',
    },
    {
      id: 'vaccines-1y',
      title: 'Get the 12- and 15-month vaccines',
      offsetDays: 366,
      durationDays: 100,
      ages: { from: 1, to: 1 },
      dependsOn: [],
      documents: ['Immunization record'],
      prepare: ['Health card', 'Yellow immunization card', 'Book with your doctor or nurse practitioner'],
      howTo:
        '1. At 12 months: pneumococcal conjugate, meningococcal conjugate and MMR.\n2. At 15 months: chickenpox (varicella).\n3. Keep the record; you will report it to public health before school.',
    },
    {
      id: 'well-baby-18m',
      title: 'Book the enhanced 18-month well-baby visit',
      offsetDays: 548,
      durationDays: 30,
      ages: { from: 1, to: 1 },
      dependsOn: ['vaccines-1y'],
      documents: ['Immunization record'],
      prepare: ['Looksee Checklist for 18 months', 'Questions about development, sleep or behaviour'],
      howTo:
        '1. Your doctor or nurse practitioner spends extra time on development and can refer you to local services.\n2. The 18-month vaccine is DTaP-IPV-Hib.\n3. Fill in the free Looksee Checklist beforehand and bring it.',
    },
    {
      id: 'speech',
      title: 'Check speech and language; self-refer if unsure',
      offsetDays: 731,
      durationDays: 30,
      ages: { from: 1, to: 4 },
      dependsOn: ['well-baby-18m'],
      documents: [],
      prepare: ['Looksee Checklist for your child\'s age', 'Notes on words and sentences your child uses'],
      howTo:
        '1. Compare your child with the Looksee Checklist or your local program\'s milestone sheet.\n2. If anything worries you, register with the local Preschool Speech and Language program; no doctor\'s referral is needed.\n3. The program serves children from birth until they start school, so don\'t wait for Kindergarten.\n4. Re-check at 3 and 4.',
    },
    {
      id: 'eye-exam',
      title: 'Book an OHIP-covered eye exam',
      offsetDays: 1096,
      durationDays: 30,
      ages: { from: 1, to: 4 },
      dependsOn: [],
      documents: ['Ontario health card'],
      prepare: ['Nearby optometrist', 'Any family history of eye problems'],
      howTo:
        '1. OHIP covers 1 major eye exam every 12 months, plus any minor assessments needed, for people 19 and under.\n2. Book with an optometrist and bring the child\'s health card.\n3. Book again every year.',
    },
    {
      id: 'vaccines-4y',
      title: 'Get the 4-year vaccines and report them to public health',
      offsetDays: 1461,
      durationDays: 60,
      ages: { from: 4, to: 4 },
      dependsOn: ['vaccines-1y'],
      documents: ['Immunization record'],
      prepare: ['Health card', 'Yellow immunization card', 'Local public health unit\'s ICON page'],
      howTo:
        '1. Ontario\'s schedule gives Tdap-IPV and MMRV at 4 years; the school vaccine page calls these the 4-to-6-year boosters.\n2. They are needed to attend school unless there is a valid exemption.\n3. Doctors don\'t report doses to public health; parents do, e.g. through Immunization Connect Ontario (ICON).',
    },
  ],
};
