import type { Playbook } from '../../domain/types';

export const marriageOn: Playbook = {
  id: 'marriage-on',
  title: 'Getting married · Ontario',
  summary:
    'Paperwork plan for a wedding in Ontario, from booking an officiant and the marriage licence to the certificate, name updates, taxes and wills.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'marriage',
  anchorKind: 'married',
  ages: { from: 18 },
  conditions: [
    'You are marrying in Ontario',
    'Both of you are 18 or older; at 16 or 17, written consent from both parents or a court order is needed',
    'Neither of you is still married to someone else',
  ],
  reviewedAt: '2026-09-26',
  version: 1,
  sources: [
    {
      title: 'Getting married — Ontario.ca',
      url: 'https://www.ontario.ca/page/getting-married',
    },
    {
      title: "Marriage Officiant's Guide to Performing Marriage Ceremonies in Ontario (ON00459E)",
      url: 'https://forms.mgcs.gov.on.ca/dataset/3046a19d-4b14-42ec-b35c-1398861bcf44/resource/99dd0f25-2b08-413a-b32b-548c2e9970b9/download/on00459e.pdf',
    },
    {
      title: 'Marriage Act, R.S.O. 1990, c. M.3',
      url: 'https://www.ontario.ca/laws/statute/90m03',
    },
    {
      title: 'Get a copy of an Ontario marriage certificate — Ontario.ca',
      url: 'https://www.ontario.ca/page/how-get-copy-ontario-marriage-certificate-online',
    },
    {
      title: 'Change your last name — Ontario.ca',
      url: 'https://www.ontario.ca/page/change-your-last-name',
    },
    {
      title: 'Change your name — Ontario.ca',
      url: 'https://www.ontario.ca/page/change-name',
    },
    {
      title: 'Update your Social Insurance Number record — Canada.ca',
      url: 'https://www.canada.ca/en/employment-social-development/services/sin/update.html',
    },
    {
      title: 'Changing the name on your passport — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/change-name.html',
    },
    {
      title: 'Change your marital status with the CRA — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/update-your-marital-status-canada-revenue-agency.html',
    },
    {
      title: 'Succession Law Reform Act, R.S.O. 1990, c. S.26',
      url: 'https://www.ontario.ca/laws/statute/90s26',
    },
    {
      title: 'Make a power of attorney — Ontario.ca',
      url: 'https://www.ontario.ca/page/make-power-attorney',
    },
    {
      title: 'Sponsor your spouse, partner or child — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children.html',
    },
    {
      title: 'Sponsor your spouse, partner or child: Who can apply — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children/eligibility.html',
    },
    {
      title: 'Death of a TFSA holder (successor holder) — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/death-a-tfsa-holder.html',
    },
  ],
  steps: [
    {
      id: 'officiant',
      title: 'Book an officiant and the ceremony',
      offsetDays: -180,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: [
        'Religious or civil ceremony',
        'Check the officiant is registered to marry in Ontario',
        'For a civil ceremony, ask the local city hall or town hall',
      ],
      howTo:
        '1. Only registered or civil marriage officiants can perform a marriage in Ontario.\n2. Registered officiants act for a religious body, or a band, First Nation, Métis or Inuit organization or community.\n3. Civil marriages are performed by municipal clerks or their delegates, judges, associate judges, justices of the peace and Members of Provincial Parliament.\n4. Ontario.ca lets you check whether an officiant is registered.\n5. The 6 months here is an estimate; popular dates and city hall slots can go sooner.',
    },
    {
      id: 'licence',
      title: 'Get the marriage licence',
      offsetDays: -14,
      durationDays: 7,
      validForDays: 90,
      dependsOn: [],
      documents: ['Marriage licence', 'Government-issued ID'],
      prepare: [
        'Both of you complete the application',
        'ID for each of you, e.g. birth certificate or passport',
        'Proof of divorce, if either of you was married before',
        'Check the current fee with the municipality',
      ],
      howTo:
        '1. Apply online through ServiceOntario (select municipalities) or on paper at a municipal office that issues licences.\n2. Each person completes the application and provides government-issued ID; at least one of you attends in person to swear it is true and to pick up the licence.\n3. The licence is valid for 3 months from the date it was issued, so the wedding must fall inside that window.\n4. A licence from another province is not valid in Ontario.\n5. A divorce outside Canada needs extra documents that can take up to 4 weeks to validate; start earlier.\n6. In limited cases, banns can replace a licence; ask the officiant.',
    },
    {
      id: 'witnesses',
      title: 'Confirm two witnesses',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Names of the two witnesses', 'Tell them to be there in person'],
      howTo:
        '1. The Marriage Act requires at least two witnesses at the ceremony.\n2. They must be physically present, understand what they are witnessing, and sign the licence and the register.\n3. With the couple and officiant that is at least five people.',
    },
    {
      id: 'ceremony',
      title: 'Hold the ceremony and sign the licence',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['officiant', 'licence', 'witnesses'],
      documents: ['Marriage licence', 'Record of solemnization'],
      prepare: ['Bring the marriage licence', 'Witnesses present', 'Ask the officiant for a record of solemnization'],
      howTo:
        '1. You, your spouse, the two witnesses and the officiant sign the licence immediately after the ceremony.\n2. The officiant must give a record of solemnization at the time of the marriage if either of you asks.',
    },
    {
      id: 'registration',
      title: 'Officiant sends the licence for registration',
      offsetDays: 2,
      durationDays: 2,
      dependsOn: ['ceremony'],
      documents: [],
      prepare: ['Confirm with the officiant that it was sent'],
      howTo:
        '1. The officiant must forward the signed licence to the Office of the Registrar General within two days after the ceremony.\n2. The marriage certificate can only be issued once the marriage is registered.',
    },
    {
      id: 'certificate',
      title: 'Order the marriage certificate',
      offsetDays: 80,
      durationDays: 77,
      dependsOn: ['registration'],
      documents: ['Marriage certificate'],
      prepare: [
        'Both full names and dates of birth',
        'Date and city or town of the marriage',
        'Pick marriage certificate or certified copy of the registration',
      ],
      howTo:
        '1. Either spouse can order online from ServiceOntario at any time after the ceremony.\n2. It can take up to 8 weeks after the marriage is registered to process.\n3. Regular online service then takes 15 business days plus mail; premium service is 5 business days by courier.\n4. The date here is an estimate; most name and record updates ask for this certificate.',
    },
    {
      id: 'surname',
      title: 'Decide whether to change your last name',
      offsetDays: 90,
      durationDays: 7,
      conditions: ['Only if either of you wants a new last name'],
      dependsOn: ['certificate'],
      documents: ['Marriage certificate'],
      prepare: ['The full last name as it appears on the marriage certificate'],
      howTo:
        '1. In Ontario you can assume your spouse\'s last name on government documents without a legal name change; it does not change your Ontario birth registration.\n2. Use the full last name as shown on the marriage certificate, including any hyphen.\n3. For only part of a hyphenated name, or another name, apply for a legal change of name: 16 or older and 12 months living in Ontario.\n4. Legal name changes can take up to 24 weeks.',
    },
    {
      id: 'ontario-id',
      title: 'Update the health card and driver\'s licence',
      offsetDays: 150,
      durationDays: 56,
      conditions: ['Only if you changed your last name'],
      dependsOn: ['surname'],
      documents: ['Marriage certificate', 'Health card', "Driver's licence"],
      prepare: ['Current photo health card', "Driver's licence or Ontario Photo Card"],
      howTo:
        '1. Assuming a spouse\'s last name on these cards is free at a ServiceOntario centre.\n2. Updated cards arrive by mail in 6 to 8 weeks.',
    },
    {
      id: 'sin',
      title: 'Update the name on your SIN record',
      offsetDays: 120,
      durationDays: 7,
      conditions: ['Only if you changed your last name'],
      dependsOn: ['surname'],
      documents: ['Marriage certificate'],
      prepare: ['Social Insurance Number', 'Document linking the old and new names'],
      howTo:
        '1. Service Canada asks you to update your SIN record when your legal name changes.\n2. Update online or by mail; there is no fee.\n3. Online confirmation takes about 5 business days; by mail about 20 business days.',
    },
    {
      id: 'passport',
      title: 'Apply for a passport in the new name',
      offsetDays: 180,
      durationDays: 30,
      validForDays: 3652,
      conditions: ['Only if you changed your last name and hold a Canadian passport'],
      dependsOn: ['surname', 'ontario-id'],
      documents: ['Canadian passport', 'Marriage certificate', 'Passport photo'],
      prepare: ['ID showing the new last name', 'Check the current fee and processing time'],
      howTo:
        '1. A new last name after marriage means applying for a new passport, not amending the old one.\n2. Include ID in the new name and the marriage certificate showing the previous and current last name.\n3. The 30 days is an estimate; check current processing times before booking travel.',
    },
    {
      id: 'cra',
      title: 'Tell the CRA you are married',
      offsetDays: 30,
      durationDays: 1,
      dependsOn: ['ceremony'],
      documents: [],
      prepare: ["Spouse's name", "Spouse's SIN", "Spouse's address, if different"],
      howTo:
        '1. The deadline is the end of the month after the month you married; e.g. married in March, tell the CRA by the end of April.\n2. Update in CRA My Account or by phone (processed straight away), or mail form RC65 (4 to 6 weeks).\n3. The date here is a safe estimate; move it to the real deadline.',
    },
    {
      id: 'workplace-benefits',
      title: 'Add your spouse to workplace health and dental benefits',
      offsetDays: 14,
      durationDays: 7,
      conditions: ['Only if either of you has health or dental benefits through work'],
      dependsOn: ['ceremony'],
      documents: ['Benefits enrolment change'],
      prepare: ["Spouse's date of birth", "Spouse's other coverage, if any", 'The plan booklet'],
      howTo:
        '1. Group plans usually treat marriage as a life event that lets you add a spouse outside the yearly enrolment period.\n2. The window is set by each plan and is often 31 days from the wedding; after it, late enrolment may need health evidence or wait for the next enrolment period.\n3. If both of you have plans, each plan\'s coordination of benefits rules decide which pays first.\n4. Update life insurance and pension beneficiaries in the same session.',
    },
    {
      id: 'benefits',
      title: 'Check the Canada Child Benefit and credits',
      offsetDays: 60,
      durationDays: 30,
      conditions: ['Only if either of you gets the Canada Child Benefit or other CRA benefits'],
      dependsOn: ['cra'],
      documents: ['Notice of redetermination'],
      prepare: ["Both spouses' tax returns filed"],
      howTo:
        '1. Benefit and credit payments, including the Canada Child Benefit, are based on adjusted family net income, which now includes your spouse.\n2. The CRA recalculates from the month after your marital status changed.\n3. Check the new amounts in CRA My Account; a drop is normal if family income rose.',
    },
    {
      id: 'estate',
      title: 'Review wills, powers of attorney and beneficiaries',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: ['ceremony'],
      documents: ['Will', 'Power of attorney for property', 'Power of attorney for personal care'],
      prepare: [
        'Existing wills of both spouses',
        'Beneficiaries on RRSPs, TFSAs, pensions and life insurance',
        'Successor holder on a TFSA or FHSA',
        'Who should decide for you if you cannot',
      ],
      howTo:
        '1. Since January 1, 2022, marriage no longer revokes an existing will in Ontario, so an old will stays in force until you change it.\n2. Without an attorney for property, a spouse cannot automatically step in on finances.\n3. You can make a power of attorney yourself for free or with a lawyer.\n4. On a TFSA, a spouse can be named successor holder, so the account carries on in their name; the FHSA has the same option, and RRSPs and RRIFs take a beneficiary. Designations are made with the financial institution; check the plan documents.\n5. Not legal advice; see a lawyer if your affairs are complicated.',
    },
    {
      id: 'sponsorship',
      title: 'Look into sponsoring your spouse',
      offsetDays: 150,
      durationDays: 60,
      conditions: ["Only if your spouse isn't a Canadian citizen or permanent resident"],
      dependsOn: ['certificate'],
      documents: ['Marriage certificate'],
      prepare: ['Proof of the relationship', 'Check the current IRCC guide and fees'],
      howTo:
        '1. The sponsor must be 18 or older, a Canadian citizen, permanent resident or registered under the Indian Act, and usually live in Canada.\n2. Your spouse applies for permanent residence and both applications go in together through the IRCC PR portal.\n3. Processing times vary; check IRCC for current times.',
    },
  ],
};
