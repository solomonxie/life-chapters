import type { Playbook } from '../../domain/types';

export const citizenshipCa: Playbook = {
  id: 'citizenship-ca',
  title: 'Citizenship · CA',
  summary:
    'Paperwork plan for citizenship by grant as an adult permanent resident, from the day of becoming a permanent resident to the oath.',
  region: 'Canada',
  country: 'CA',
  anchorKind: 'pr-landed',
  ages: { from: 18 },
  conditions: [
    'You became a permanent resident and are applying as an adult',
    '1,095 days physically in Canada in the 5 years before you apply; days there before permanent residence count as half, up to 365',
    'Taxes filed for 3 of those 5 years, if you had to file',
  ],
  reviewedAt: '2026-09-27',
  version: 2,
  sources: [
    {
      title: 'Canadian citizenship: Who can apply',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/eligibility.html',
    },
    {
      title: 'Apply for citizenship: Calculate your physical presence',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/adult-minor/how/physical-presence.html',
    },
    {
      title: 'Citizenship: Proof of language skills',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/eligibility/language-proof.html',
    },
    {
      title: 'Adult citizenship: Forms and documents',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/adult-minor/how/adult-forms-documents.html',
    },
    {
      title: 'Apply for citizenship: Adults',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/apply.html',
    },
    {
      title: 'Citizenship test',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html',
    },
    {
      title: 'Citizenship ceremony',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-ceremony.html',
    },
    {
      title: 'After the citizenship ceremony',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-ceremony/after.html',
    },
    {
      title: 'When to update your SIN record — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/update.html',
    },
    {
      title: 'Nationality Law of the People\'s Republic of China (National Immigration Administration)',
      url: 'https://en.nia.gov.cn/n147418/n147458/c155976/content.html',
    },
    {
      title: 'Apply for a new adult passport',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/new-adult-passport.html',
    },
  ],
  steps: [
    {
      id: 'travel-log',
      title: 'Start a log of days spent outside Canada',
      offsetDays: 7,
      durationDays: 7,
      dependsOn: [],
      documents: ['Travel history'],
      prepare: ['Departure and return dates', 'Keep boarding passes or passport stamps', 'Save the Confirmation of Permanent Residence'],
      howTo:
        '1. Days in Canada as a permanent resident count in full; days outside Canada do not count.\n2. IRCC offers an optional travel journal for trips outside Canada; it is not sent with the application.',
    },
    {
      id: 'presence-check',
      title: 'Work out the earliest date with the IRCC physical presence calculator',
      offsetDays: 700,
      durationDays: 14,
      dependsOn: ['travel-log'],
      documents: ['Physical presence calculation'],
      prepare: [
        'Date permanent residence began',
        'All absences in the 5 years',
        'Dates as a temporary resident or protected person before that',
      ],
      howTo:
        '1. The requirement is at least 1,095 days physically in Canada in the 5 years right before applying.\n2. Each day in Canada as a temporary resident or protected person in those 5 years, before becoming a permanent resident, counts as half a day, up to 365 days of credit.\n3. So with 730 or more such days, the earliest date can be up to a year sooner than 1,095 days after landing; with none, it is 1,095 days as a permanent resident.\n4. The calculator (in the IRCC online account, or the standalone one for paper applications) does the counting; move the application date to the date it shows.\n5. Absences change the result, so the calculation is run again at application time; an application without it is returned.',
    },
    {
      id: 'tax-check',
      title: 'Check tax returns are filed for 3 of the last 5 years',
      offsetDays: 1080,
      durationDays: 14,
      dependsOn: [],
      documents: ['Notice of assessment'],
      prepare: ['List the tax years filed', 'File any missing returns'],
      howTo:
        '1. Filing Canadian income taxes for at least 3 of the 5 years before applying is part of the requirement, if the applicant had to file.',
    },
    {
      id: 'language-proof',
      title: 'Gather language proof (ages 18 to 54)',
      offsetDays: 1080,
      durationDays: 30,
      dependsOn: [],
      documents: ['Language proof'],
      prepare: ['An approved test result, or', 'A diploma, transcript or certificate from study in English or French'],
      howTo:
        '1. Skip if under 18 or 55 and over.\n2. The level is CLB 4 or higher in speaking and listening, in English or French.',
    },
    {
      id: 'identity-docs',
      title: 'Gather passports, ID and photos',
      offsetDays: 1080,
      durationDays: 30,
      dependsOn: [],
      documents: ['Passport', 'Second piece of identification', 'Citizenship photos'],
      prepare: [
        'Colour copies of identity pages of every passport held during the 5 years',
        'Two pieces of personal identification',
        'Evidence of any name change',
        'Certified translations where needed',
      ],
      howTo:
        '1. The document checklist (CIT 0007) lists what the application includes.\n2. A police certificate may be needed for any country where 183 days or more in a row were spent in the 4 years before applying.',
    },
    {
      id: 'apply',
      title: 'Apply for citizenship online',
      offsetDays: 1110,
      durationDays: 3,
      dependsOn: ['tax-check', 'presence-check', 'language-proof', 'identity-docs'],
      documents: [
        'Citizenship application receipt',
        'Physical presence calculation',
        'Language proof',
        'Passport',
        'Citizenship photos',
      ],
      prepare: ['Check the current fees', 'IRCC account login'],
      howTo:
        '1. IRCC encourages online applications; paper is for specific cases.\n2. Fees include a processing fee and a right of citizenship fee.\n3. This date is an estimate: 1,095 days as a permanent resident plus a short buffer, with no absences and no credit for earlier time in Canada; move it to the date the calculator shows.\n4. The physical presence calculation is included with the application.',
    },
    {
      id: 'minors',
      title: 'Include children under 18 in the application',
      offsetDays: 1110,
      durationDays: 3,
      dependsOn: ['identity-docs'],
      documents: ['Minor citizenship application', 'Child\'s PR document', 'Child\'s passport', 'Citizenship photos'],
      prepare: ['Proof you are the parent or legal guardian', 'Each child\'s identity documents and photos'],
      howTo:
        '1. A parent or legal guardian applies for a child under 18; when a parent is a citizen or applying at the same time, the child can be added to the parent\'s application.\n2. A minor applying without a Canadian parent needs 1,095 days of physical presence, like an adult.\n3. The minor application form number (CIT 0003 for paper) and the fees are on the IRCC forms page; check current.\n4. Children do not take the test.',
      conditions: ['Only if you have children under 18 who are permanent residents'],
    },
    {
      id: 'aor',
      title: 'Watch for the acknowledgement of receipt',
      offsetDays: 1170,
      durationDays: 60,
      dependsOn: ['apply'],
      documents: ['Acknowledgement of receipt'],
      prepare: ['Check the IRCC account and email'],
      howTo:
        '1. An online application gets an email confirmation straight away.\n2. The acknowledgement of receipt follows once processing starts.\n3. Dates here are rough placeholders.',
    },
    {
      id: 'study',
      title: 'Study Discover Canada for the test',
      offsetDays: 1230,
      durationDays: 60,
      dependsOn: ['aor'],
      documents: [],
      prepare: ['Download Discover Canada', 'Practice questions on the IRCC site'],
      howTo:
        '1. Questions cover rights and responsibilities, history, geography and government, from the official study guide Discover Canada.\n2. Applicants aged 18 to 54 usually take the test.',
    },
    {
      id: 'test',
      title: 'Take the online citizenship test',
      offsetDays: 1260,
      durationDays: 1,
      dependsOn: ['study'],
      documents: ['Test invitation'],
      prepare: ['Invitation email', 'Quiet room and a working device'],
      howTo:
        '1. IRCC sends an invitation with the test window.\n2. The test is online: 20 questions in 45 minutes, and 15 correct answers pass.\n3. Move this date to the invitation date once known.',
    },
    {
      id: 'decision',
      title: 'Watch for the application decision',
      offsetDays: 1380,
      durationDays: 90,
      dependsOn: ['test'],
      documents: [],
      prepare: ['Check the IRCC account and email'],
      howTo:
        '1. An interview or hearing may follow, depending on the test result.\n2. Dates here are rough placeholders.',
    },
    {
      id: 'ceremony',
      title: 'Take the oath at the citizenship ceremony',
      offsetDays: 1440,
      durationDays: 30,
      dependsOn: ['decision'],
      documents: ['Citizenship certificate'],
      prepare: ['Ceremony invitation', 'Identification and PR card', 'Check whether it is virtual or in person'],
      howTo:
        '1. Adults approved for citizenship take the oath; citizenship takes effect once it is taken.\n2. The PR card is collected at the ceremony.\n3. An electronic certificate is usually in the IRCC portal within 5 business days of the signed oath form; paper certificates come at in-person ceremonies or by mail.',
    },
    {
      id: 'pr-card-sin',
      title: 'Hand in the PR card and update the SIN record',
      offsetDays: 1460,
      durationDays: 14,
      dependsOn: ['ceremony'],
      documents: ['Citizenship certificate'],
      prepare: ['PR card', 'Citizenship certificate', 'SIN'],
      howTo:
        '1. IRCC says the PR card is destroyed or collected at the ceremony; if it is still in hand, check IRCC\'s current instructions for it.\n2. The PR card is no longer a travel document once the oath is taken.\n3. Service Canada lists a change of immigration status as a reason to update the SIN record; the citizenship certificate is the proof.',
    },
    {
      id: 'china-nationality',
      title: 'Settle Chinese passport, hukou and visa after naturalising',
      offsetDays: 1470,
      durationDays: 30,
      dependsOn: ['ceremony'],
      documents: ['Citizenship certificate', 'Chinese passport', 'Household register (户口簿)'],
      prepare: ['Chinese passport and ID card', 'Family member who can visit the hukou police station', 'Plans for the next trip to China'],
      howTo:
        '1. China\'s Nationality Law (中华人民共和国国籍法), Article 9: a Chinese national settled abroad who takes a foreign nationality of their own free will loses Chinese nationality automatically; China does not recognise dual nationality (Article 3).\n2. The Chinese passport is no longer used to travel after the oath; trips to China then use the Canadian passport with a Chinese visa (签证), or a visa-free arrangement if one covers Canadian passports; check current.\n3. The hukou (户口) is cancelled (户口注销) at the local police station where it is registered; the local requirements and who can apply on your behalf vary, so check current.\n4. Bank accounts, property and pensions in China tied to the ID card number may need updating; ask each institution.',
      conditions: ['Only if you held Chinese nationality'],
    },
    {
      id: 'vote',
      title: 'Register to vote with Elections Canada',
      offsetDays: 1455,
      durationDays: 7,
      dependsOn: ['ceremony'],
      documents: [],
      prepare: ['Citizenship certificate details', 'Current address'],
      howTo:
        '1. Federal voter registration is with Elections Canada.\n2. Provincial and local elections have their own lists.',
    },
    {
      id: 'ca-passport',
      title: 'Apply for a Canadian passport',
      offsetDays: 1485,
      durationDays: 30,
      validForDays: 3652,
      dependsOn: ['ceremony'],
      documents: ['Canadian passport', 'Citizenship certificate', 'Passport photo'],
      prepare: ['Check the current fee', 'Guarantor and 2 references', 'Pick 5- or 10-year validity'],
      howTo:
        '1. The citizenship certificate comes first; it is not a travel document.\n2. Adult passports come with 5- or 10-year validity; this step assumes 10.',
    },
  ],
};
