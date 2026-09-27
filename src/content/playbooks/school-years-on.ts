import type { Playbook } from '../../domain/types';

export const schoolYearsOn: Playbook = {
  id: 'school-years-on',
  title: 'School years · JK to Grade 8 · Ontario',
  summary:
    'Registration, records, assessments, school vaccines and the move to high school for a child at an Ontario public elementary school. Many dates are set by each school board.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'school-years',
  anchorKind: 'born',
  ages: { from: 3, to: 14 },
  conditions: [
    'Your child will attend a publicly funded school in Ontario',
    'From Junior Kindergarten to the end of Grade 8',
  ],
  reviewedAt: '2026-09-26',
  version: 1,
  sources: [
    {
      title: 'Kindergarten — Ontario.ca',
      url: 'https://www.ontario.ca/page/kindergarten',
    },
    {
      title: 'Kindergarten registration — Ottawa-Carleton District School Board (example)',
      url: 'https://www.ocdsb.ca/our-schools/registration/kindergarten',
    },
    {
      title: 'Registration opens for Kindergarten and French Immersion — York Region District School Board (example)',
      url: 'https://www2.yrdsb.ca/registration-opens-kindergarten-and-french-immersion-january-16',
    },
    {
      title: 'Early French Immersion (Kindergarten entry) — Toronto District School Board (example)',
      url: 'https://www.tdsb.on.ca/Elementary-School/School-Choices/French-Programs/Application-Process/Early-French-Immersion',
    },
    {
      title: 'Vaccines for children at school — Ontario.ca',
      url: 'https://www.ontario.ca/page/vaccines-children-school',
    },
    {
      title: 'Immunization of School Pupils Act — Ontario e-Laws',
      url: 'https://www.ontario.ca/laws/statute/90i01',
    },
    {
      title: 'Report student vaccination (ISPA) — Toronto Public Health (example)',
      url: 'https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/immunization/report-student-vaccination/',
    },
    {
      title: 'Ontario\'s routine immunization schedule — Ontario.ca',
      url: 'https://www.ontario.ca/page/ontarios-routine-immunization-schedule',
    },
    {
      title: 'School immunization program — Toronto Public Health (example)',
      url: 'https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/immunization/school-immunization-program/',
    },
    {
      title: 'Grade 3, Primary Division — EQAO',
      url: 'https://www.eqao.com/the-assessments/primary-division/',
    },
    {
      title: 'Grade 6, Junior Division — EQAO',
      url: 'https://www.eqao.com/the-assessments/junior-division/',
    },
    {
      title: 'Grade 8 to 9 transition (Beyond 8) — Toronto District School Board (example)',
      url: 'https://www.tdsb.on.ca/High-School/Going-to-High-School/Beyond-8',
    },
    {
      title: 'Secondary school courses and related procedures — Ontario.ca',
      url: 'https://www.ontario.ca/document/ontario-schools-kindergarten-grade-12-policy-and-program-requirements/secondary-school-courses-and-related-procedures',
    },
    {
      title: 'De-streaming — York Region District School Board (example)',
      url: 'https://www2.yrdsb.ca/schools-programs/de-streaming',
    },
  ],
  steps: [
    {
      id: 'school-locator',
      title: 'Find the designated school with the board\'s school locator',
      offsetDays: 1218,
      durationDays: 14,
      ages: { from: 3, to: 3 },
      dependsOn: [],
      documents: [],
      prepare: ['Home address', 'Public or Catholic board, English or French'],
      howTo:
        '1. Each school board runs its own locator by home address.\n2. Registration is with the board and school, not the province.',
    },
    {
      id: 'proof',
      title: 'Gather proof of age and address',
      offsetDays: 1240,
      durationDays: 30,
      ages: { from: 3, to: 3 },
      dependsOn: [],
      documents: ['Birth certificate', 'Proof of address'],
      prepare: [
        'Birth certificate or passport',
        'Lease, property tax bill or similar',
        'Plus a utility bill, bank statement or insurance policy',
      ],
      howTo:
        '1. Boards usually ask for one proof of age and two proofs of address (the Ottawa-Carleton board, for example).\n2. Each board publishes the documents it accepts; check its list.\n3. Families with temporary status are often asked to contact the board\'s admissions office first.',
    },
    {
      id: 'immunization',
      title: 'Report immunizations to the local public health unit',
      offsetDays: 1240,
      durationDays: 14,
      ages: { from: 3, to: 4 },
      dependsOn: [],
      documents: ['Immunization record'],
      prepare: ['Yellow immunization card or doctor\'s printout', 'Local public health unit\'s ICON page'],
      howTo:
        '1. Under the Immunization of School Pupils Act (ISPA), pupils need diphtheria, tetanus, polio, measles, mumps, rubella, meningococcal, whooping cough and chickenpox vaccines, or a valid exemption.\n2. Parents report doses to public health, e.g. through Immunization Connect Ontario (ICON); doctors don\'t do it for you.\n3. If records are missing, public health sends a notice and then a suspension order; a pupil can be suspended for up to 20 school days (Toronto Public Health).\n4. Medical and non-medical exemptions have their own forms and process.',
    },
    {
      id: 'kg-register',
      title: 'Register for Junior Kindergarten',
      offsetDays: 1278,
      durationDays: 30,
      ages: { from: 3, to: 3 },
      dependsOn: ['school-locator', 'proof', 'immunization'],
      documents: ['Registration form', 'Birth certificate', 'Proof of address'],
      prepare: ['Custody orders, if any', 'Status documents, if not a citizen or permanent resident'],
      howTo:
        '1. A child can start Junior Kindergarten in September of the year they turn 4, i.e. turning 4 by December 31.\n2. Registration usually opens in the winter before, often January (York Region, for example); the date here is an estimate at about age 3½.\n3. Kindergarten is a free 2-year program; school is compulsory from September of the year the child turns 6.',
    },
    {
      id: 'french-immersion',
      title: 'Check French Immersion entry points and apply',
      offsetDays: 1278,
      durationDays: 30,
      ages: { from: 3, to: 5 },
      conditions: ['Only if you want French Immersion'],
      dependsOn: ['school-locator'],
      documents: [],
      prepare: ['Board\'s French Immersion information session date', 'Ontario Education Number (OEN), once assigned'],
      howTo:
        '1. Entry grades and deadlines are set by each board, and a missed window can mean waiting for a later entry point.\n2. York Region: entry at Grade 1, with registration in January–February alongside Kindergarten registration.\n3. Toronto: apply online in November of the JK year for entry in Senior Kindergarten, the only Early French Immersion entry; Toronto also has a later Middle French Immersion entry.\n4. The date here is an estimate; set it to your board\'s window.',
    },
    {
      id: 'back-to-school',
      title: 'Every September: back-to-school admin',
      offsetDays: 1522,
      durationDays: 30,
      ages: { from: 4, to: 13 },
      dependsOn: ['kg-register'],
      documents: ['Emergency contact form', 'Health care plan'],
      prepare: [
        'Emergency contacts and phone numbers',
        'Allergy, asthma or medication forms',
        'Board consent forms',
        'Before- and after-school care and transport',
        'New vaccine doses reported to public health',
      ],
      howTo:
        '1. Repeat every September from JK to Grade 8; this step is dated at the start of JK.\n2. Boards send their own forms; return them in the first weeks.\n3. Report any new vaccine doses to public health so ISPA records stay current.',
    },
    {
      id: 'eqao-3',
      title: 'Grade 3 EQAO assessment',
      offsetDays: 3226,
      durationDays: 36,
      ages: { from: 8, to: 9 },
      dependsOn: ['kg-register'],
      documents: [],
      prepare: ['School\'s assessment dates', 'Avoid trips during the window'],
      howTo:
        '1. EQAO tests the reading, writing and math expected by the end of Grade 3.\n2. Schools pick dates within EQAO\'s spring window (May 4 – June 8 in 2027); the date here is an estimate at about age 8¾.\n3. Results don\'t count toward report card marks.\n4. The Individual Student Report comes home from school by the end of the following September.',
    },
    {
      id: 'eqao-6',
      title: 'Grade 6 EQAO assessment',
      offsetDays: 4322,
      durationDays: 36,
      ages: { from: 11, to: 12 },
      dependsOn: ['eqao-3'],
      documents: [],
      prepare: ['School\'s assessment dates', 'Avoid trips during the window'],
      howTo:
        '1. EQAO tests the reading, writing and math expected by the end of Grade 6.\n2. Schools pick dates within EQAO\'s spring window; the date here is an estimate at about age 11¾.\n3. Results don\'t count toward report card marks; the Individual Student Report comes home the following fall.',
    },
    {
      id: 'grade7-vaccines',
      title: 'Consent to the Grade 7 school vaccines',
      offsetDays: 4445,
      durationDays: 180,
      ages: { from: 11, to: 12 },
      dependsOn: [],
      documents: ['Signed consent form'],
      prepare: ['Immunization record', 'Health card number'],
      howTo:
        '1. Public health runs school clinics in Grade 7 for meningococcal conjugate (ACYW), hepatitis B and HPV.\n2. Meningococcal is required under ISPA; hepatitis B and HPV are recommended, not required.\n3. Return the consent form before the clinic; Toronto asks for it even if you decline.\n4. Hepatitis B and HPV can take more than one dose, months apart; the health unit sets the schedule.\n5. Missed doses stay free to catch up at public health or your doctor while still in school (Grades 7–12 in Toronto).\n6. Grade 7 starts in September of the year the child turns 12; the date here is an estimate.',
    },
    {
      id: 'hs-open-houses',
      title: 'Attend high school open houses',
      offsetDays: 4840,
      durationDays: 75,
      ages: { from: 12, to: 13 },
      dependsOn: [],
      documents: [],
      prepare: ['Designated high school from the board locator', 'Questions about programs and pathways'],
      howTo:
        '1. Open houses and information nights run from November to January in Toronto, for example.\n2. Grade 8 starts in September of the year the child turns 13; the date here is an estimate for November of Grade 8.',
    },
    {
      id: 'hs-specialized',
      title: 'Apply to specialized high school programs',
      offsetDays: 4870,
      durationDays: 21,
      ages: { from: 12, to: 13 },
      conditions: ['Only if you want a specialized program, e.g. arts, math, science or technology'],
      dependsOn: ['hs-open-houses'],
      documents: [],
      prepare: ['Each program\'s entry requirements', 'Portfolio, video or audition, if asked'],
      howTo:
        '1. Programs, entry rules and dates are board-specific.\n2. Toronto, for example, opens a 3-week online window in November of Grade 8.\n3. Some programs ask for more than a form; start early.',
    },
    {
      id: 'grade9-courses',
      title: 'Choose Grade 9 courses',
      offsetDays: 4961,
      durationDays: 21,
      ages: { from: 13, to: 14 },
      dependsOn: ['hs-open-houses'],
      documents: [],
      prepare: ['Talk with the Grade 8 teacher or guidance counsellor', 'Electives your child is interested in'],
      howTo:
        '1. Grade 9 course types are de-streamed, academic and open; core subjects are de-streamed, so there is no applied/academic choice for them.\n2. Course selection for students under 18 needs a parent\'s approval.\n3. Windows are board-specific; Toronto, for example, runs it online in February of Grade 8; the date here is an estimate.',
    },
  ],
};
