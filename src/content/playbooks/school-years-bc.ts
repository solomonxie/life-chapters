import type { Playbook } from '../../domain/types';

export const schoolYearsBc: Playbook = {
  id: 'school-years-bc',
  title: 'School years · K to Grade 7 · British Columbia',
  summary:
    'Registration, records, assessments, school vaccines and the move to secondary for a child at a British Columbia public elementary school. Many dates are set by each school district.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'school-years',
  anchorKind: 'born',
  ages: { from: 4, to: 13 },
  conditions: [
    'Your child will attend a public school in British Columbia',
    'From Kindergarten to the end of Grade 7',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'British Columbia Training and Education Savings Grant',
      url: 'https://www2.gov.bc.ca/gov/content/education-training/k-12/support/scholarships/bc-training-and-education-savings-grant',
    },
    {
      title: 'Full day Kindergarten — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/education-training/k-12/support/full-day-kindergarten',
    },
    {
      title: 'School Act, Part 2 (students and parents) — BC Laws',
      url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96412_02',
    },
    {
      title: 'Priority Kindergarten registration — Vancouver School Board (example)',
      url: 'https://www.vsb.bc.ca/priority-kindergarten-registration',
    },
    {
      title: 'Kindergarten registration FAQs — Vancouver School Board (example)',
      url: 'https://www.vsb.bc.ca/kindergarten-registration-faqs',
    },
    {
      title: 'Kindergarten District Choice Programs — Vancouver School Board (example)',
      url: 'https://www.vsb.bc.ca/kindergarten-district-choice-programs',
    },
    {
      title: 'French Immersion — Burnaby Schools (example)',
      url: 'https://burnabyschools.ca/french-immersion/',
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
      title: 'Immunization schedules for children — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/health-library/immunizations/schedules/children',
    },
    {
      title: 'Grade 6 immunizations in B.C. (HealthLinkBC File #50f)',
      url: 'https://www.healthlinkbc.ca/healthlinkbc-files/grade-6-immunizations-bc',
    },
    {
      title: 'Grade 9 immunizations in B.C. — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/healthlinkbc-files/grade-9-immunizations-bc',
    },
    {
      title: 'Foundation Skills Assessment (FSA) — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/program-management/assessment/foundation-skills-assessment',
    },
    {
      title: 'Mini School Programs — Vancouver School Board (example)',
      url: 'https://www.vsb.bc.ca/mini-school-programs',
    },
    {
      title: 'Middle School Program — Coquitlam School District 43 (example)',
      url: 'https://www.sd43.bc.ca/Programs/middleschools/Pages/default.aspx',
    },
  ],
  steps: [
    {
      id: 'bctesg',
      title: 'Apply for the BC Training and Education Savings Grant',
      offsetDays: 2192,
      durationDays: 30,
      dependsOn: [],
      documents: ['BCTESG application'],
      prepare: ['RESP with a participating provider', 'Child\'s SIN', 'Parent or guardian\'s SIN'],
      ages: { from: 6, to: 8 },
      conditions: [
        'Only if the child has an RESP (the newborn plan opens one)','Only if the child and the applying parent or guardian live in BC when applying'],
      howTo:
        '1. Apply through the RESP provider between the child\'s 6th birthday and the day before they turn 9.\n2. No contribution to the RESP is needed.\n3. Not every provider takes part; check the list of participating promoters.\n4. The due date is the 6th birthday, the start of the window.',
    },
    {
      id: 'school-locator',
      title: 'Find the catchment school with the district\'s school locator',
      offsetDays: 1583,
      durationDays: 14,
      ages: { from: 4, to: 4 },
      dependsOn: [],
      documents: [],
      prepare: ['Home address', 'Your school district\'s locator'],
      howTo:
        '1. Each school district runs its own locator by home address.\n2. Registration is with the district and catchment school, not the province.\n3. A school outside your catchment is a separate cross-boundary request; in Vancouver it runs in February, after catchment registration.',
    },
    {
      id: 'proof',
      title: 'Gather proof of age, identity and address',
      offsetDays: 1583,
      durationDays: 30,
      ages: { from: 4, to: 4 },
      dependsOn: [],
      documents: ['Birth certificate', 'Proof of address', 'Parent ID'],
      prepare: [
        'Child\'s birth certificate or immigration or citizenship documents',
        'Property tax statement, purchase agreement or rental agreement',
        'Plus a recent bill showing your name and address',
      ],
      howTo:
        '1. Vancouver, for example, asks for proof of address, the child\'s original birth certificate or immigration documents, the parent\'s ID and immunization records if available.\n2. Each district publishes the documents it accepts; some schools ask for more proof of address.\n3. In Vancouver, children born outside Canada register through the Newcomer Welcome Centre instead.',
    },
    {
      id: 'immunization',
      title: 'Check the immunization record is on file with public health',
      offsetDays: 1600,
      durationDays: 14,
      ages: { from: 4, to: 5 },
      dependsOn: [],
      documents: ['Immunization record'],
      prepare: ['Photo of the official record', 'Child\'s Personal Health Number', 'Health Gateway account'],
      howTo:
        '1. Under the Vaccination Status Reporting Regulation, public health collects immunization records for students from Kindergarten to Grade 12.\n2. The regulation asks for the record; it doesn\'t make vaccination a condition of attending school.\n3. Without a record on file, the child is noted as unimmunized and public health may follow up.\n4. During an outbreak of a vaccine-preventable disease, an unimmunized child may be asked to stay home, possibly for several weeks.\n5. Upload the record on the Provincial Immunization Registry page, or bring it to a public health unit or clinic; online updates take about 10 to 14 days.',
    },
    {
      id: 'kg-register',
      title: 'Register for Kindergarten',
      offsetDays: 1644,
      durationDays: 30,
      ages: { from: 4, to: 4 },
      dependsOn: ['school-locator', 'proof', 'immunization'],
      documents: ['Registration form', 'Birth certificate', 'Proof of address', 'Parent ID'],
      prepare: ['Custody orders, if any', 'Status documents, if not a citizen or permanent resident'],
      howTo:
        '1. A child who turns 5 by December 31 can start Kindergarten that September; it is full day and there is no Junior Kindergarten.\n2. Registration usually begins in January or February for September; Vancouver\'s priority window runs November 1 to January 31, with an online form and then an appointment at the catchment school.\n3. The date here is an estimate at about age 4½; set it to your district\'s window.\n4. Parents may defer Kindergarten by a year; the child is registered for school or homeschooling by the year they turn 6.',
    },
    {
      id: 'french-immersion',
      title: 'Apply for Early French Immersion',
      offsetDays: 1674,
      durationDays: 30,
      ages: { from: 4, to: 5 },
      conditions: ['Only if you want French Immersion'],
      dependsOn: ['kg-register'],
      documents: [],
      prepare: ['District\'s French Immersion information session date', 'Up to 3 school choices, ranked'],
      howTo:
        '1. Most districts ask you to register at the English catchment school first, then apply to French Immersion separately.\n2. Places are often decided by lottery, not first come, first served.\n3. Vancouver: online Kindergarten choice window in January (January 6 to February 3, 2026), up to 3 schools, random computer draw.\n4. Burnaby: applications during February all get equal priority; the lottery is in early March, and Late French Immersion starts in Grade 6.\n5. The date here is an estimate; set it to your district\'s window.',
    },
    {
      id: 'back-to-school',
      title: 'Every September: back-to-school admin',
      offsetDays: 1887,
      durationDays: 30,
      ages: { from: 5, to: 13 },
      dependsOn: ['kg-register'],
      documents: ['Emergency contact form', 'Health care plan'],
      prepare: [
        'Emergency contacts and phone numbers',
        'Allergy, asthma or medication forms',
        'District consent forms',
        'Before- and after-school care and transport',
        'New vaccine doses added to the immunization registry',
      ],
      howTo:
        '1. Repeat every September from Kindergarten to Grade 7; this step is dated at the start of Kindergarten, about age 5.\n2. Districts send their own forms; return them in the first weeks.\n3. Keep the immunization record in the provincial registry current after new doses.',
    },
    {
      id: 'fsa-4',
      title: 'Grade 4 Foundation Skills Assessment',
      offsetDays: 3397,
      durationDays: 40,
      ages: { from: 8, to: 9 },
      dependsOn: ['kg-register'],
      documents: [],
      prepare: ['School\'s assessment dates', 'Avoid trips during the window'],
      howTo:
        '1. The FSA checks reading, writing and numeracy for all BC students in Grades 4 and 7.\n2. It runs in the fall, in parts spread over days or weeks, none longer than an hour; the 2026 window is September 28 to November 6.\n3. Grade 4 starts in September of the year the child turns 9; the date here is an estimate at about age 9¼.\n4. The school shares the student report and writing booklet with parents once scoring is done.',
    },
    {
      id: 'grade6-vaccines',
      title: 'Talk through the Grade 6 school vaccine',
      offsetDays: 4200,
      durationDays: 180,
      ages: { from: 11, to: 12 },
      dependsOn: [],
      documents: ['Consent form'],
      prepare: ['Immunization record', 'Personal Health Number'],
      howTo:
        '1. Public health offers HPV vaccine to all Grade 6 students at school, as one dose.\n2. Hepatitis B is not a routine Grade 6 vaccine in BC; students missing earlier childhood doses may be offered catch-up.\n3. Under BC\'s mature minor rule, a child under 19 who understands the benefits and risks can consent or refuse; parents and children are encouraged to discuss it.\n4. Grade 6 starts in September of the year the child turns 11; the date here is an estimate.\n5. In Grade 9, school clinics offer meningococcal quadrivalent and Tdap vaccines.',
    },
    {
      id: 'fsa-7',
      title: 'Grade 7 Foundation Skills Assessment',
      offsetDays: 4493,
      durationDays: 40,
      ages: { from: 11, to: 12 },
      dependsOn: ['fsa-4'],
      documents: [],
      prepare: ['School\'s assessment dates', 'Avoid trips during the window'],
      howTo:
        '1. The same reading, writing and numeracy assessment as Grade 4, in the fall of Grade 7.\n2. Grade 7 starts in September of the year the child turns 12; the date here is an estimate at about age 12¼.\n3. The student report and writing booklet come home once scoring is done.',
    },
    {
      id: 'secondary-choice',
      title: 'Apply to secondary specialty programs',
      offsetDays: 4540,
      durationDays: 30,
      ages: { from: 11, to: 12 },
      conditions: ['Only if you want a specialty or choice program, e.g. a mini school, arts or sports academy'],
      dependsOn: [],
      documents: [],
      prepare: ['Each program\'s entry requirements', 'Portfolio, test or interview, if asked'],
      howTo:
        '1. Programs, entry rules and dates are district-specific.\n2. Vancouver mini schools start in Grade 8; apply in Grade 7 through the District Registry (November 16 to December 17, 2026) and to each program separately.\n3. Each program sets its own requirements; start early.\n4. The date here is an estimate for late fall of Grade 7.',
    },
    {
      id: 'secondary-transition',
      title: 'Get ready for the move to secondary school',
      offsetDays: 4603,
      durationDays: 30,
      ages: { from: 12, to: 13 },
      dependsOn: [],
      documents: [],
      prepare: ['Catchment secondary from the district locator', 'Talk with the Grade 7 teacher or counsellor', 'Electives your child is interested in'],
      howTo:
        '1. Elementary is usually Kindergarten to Grade 7, with secondary from Grade 8.\n2. Some districts run middle schools instead; Coquitlam, for example, has Grades 6 to 8, so the move comes at Grade 6 and again at Grade 9.\n3. Transition events and course selection are district- and school-specific; ask the elementary school.\n4. The date here is an estimate for the winter of Grade 7.',
    },
  ],
};
