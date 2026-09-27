import type { Playbook } from '../../domain/types';

export const marriageBc: Playbook = {
  id: 'marriage-bc',
  title: 'Getting married · British Columbia',
  summary:
    'Paperwork plan for a wedding in British Columbia, from booking an officiant and the marriage licence to the certificate, name updates, taxes and wills.',
  region: 'British Columbia, Canada',
  province: 'BC',
  family: 'marriage',
  anchorKind: 'married',
  ages: { from: 19 },
  conditions: [
    'You are marrying in British Columbia',
    'Both of you are 19 or older; at 16 to 18, written consent from parents or guardians is needed',
    'Neither of you is still married to someone else',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Marriage — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/marriage',
    },
    {
      title: 'Marriage licences — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/marriage/marriage-licences',
    },
    {
      title: 'Search for a marriage licence issuer — B.C. Ministry of Health',
      url: 'https://connect.health.gov.bc.ca/marriage-offices',
    },
    {
      title: 'Marriage commissioners — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/marriage/marriage-commissioners',
    },
    {
      title: 'Marriage Act, R.S.B.C. 1996, c. 282',
      url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96282_01',
    },
    {
      title: 'Marriage registration — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/marriage/marriage-registration',
    },
    {
      title: 'Marriage certificates — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/marriage/marriage-certificates',
    },
    {
      title: 'Change your name after marriage or divorce — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/legal-changes-of-name/change-your-name-after-marriage-or-divorce',
    },
    {
      title: 'Legal change of name application — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/legal-changes-of-name/legal-change-of-name-application',
    },
    {
      title: 'MSP: Changing or correcting a name — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/managing-your-msp-account/changing-your-name',
    },
    {
      title: 'BC Services Card: Change your personal information — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/your-card/change-personal-information',
    },
    {
      title: 'Change your name, address or gender — ICBC',
      url: 'https://icbc.com/driver-licensing/getting-licensed/Change-your-name-or-address',
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
      title: 'Wills, Estates and Succession Act, S.B.C. 2009, c. 13',
      url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/09013_01',
    },
    {
      title: 'Wills, Estates and Succession Act Questions and Answers — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/assets/gov/law-crime-and-justice/about-bc-justice-system/legislation-policy/wesa/qa.pdf',
    },
    {
      title: 'Incapacity planning — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/managing-your-health/incapacity-planning',
    },
    {
      title: 'Sponsor your spouse, partner or child — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children.html',
    },
    {
      title: 'Sponsor your spouse, partner or child: Who can apply — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children/eligibility.html',
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
        'For a religious ceremony, check the religious representative is registered in B.C.',
        'For a civil ceremony, search the provincial list of marriage commissioners',
      ],
      howTo:
        '1. In B.C. a marriage is performed by a religious representative registered with the Vital Statistics Agency, or by a marriage commissioner.\n2. Marriage commissioners offer non-religious ceremonies; the province has an online search to find one in your area.\n3. Commissioners charge a set fee plus travel costs; check the current fees on the marriage commissioners page.\n4. The 6 months here is an estimate; popular dates can go sooner.',
    },
    {
      id: 'licence',
      title: 'Buy the marriage licence',
      offsetDays: -14,
      durationDays: 1,
      validForDays: 90,
      dependsOn: [],
      documents: ['Marriage licence', 'Government-issued ID'],
      prepare: [
        'Primary ID for both of you, e.g. birth certificate, citizenship card or permanent resident card',
        'Proof the divorce order has taken effect, if either of you was married before',
        'Written consent from parents or guardians, if either of you is 16 to 18',
        'Check the current fee with the issuer',
      ],
      howTo:
        '1. Licences are sold by marriage licence issuers, many of them private businesses such as insurance agencies, plus some Service BC offices; use the provincial search to find one.\n2. Only one of you needs to go in person, with primary ID for both.\n3. The issuer prints the licence on the spot; there is no waiting period.\n4. The licence is valid for 3 months from the day it is issued, so buy it within 3 months before the wedding.\n5. If recently divorced, wait until the divorce order takes effect before buying.',
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
        '1. The Marriage Act calls for at least 2 witnesses at the ceremony, besides the officiant.\n2. After the ceremony the couple, both witnesses and the officiant sign the Marriage Licence and Registration of Marriage.',
    },
    {
      id: 'ceremony',
      title: 'Hold the ceremony and sign the licence',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['officiant', 'licence', 'witnesses'],
      documents: ['Marriage licence'],
      prepare: ['Bring the marriage licence', 'Witnesses present'],
      howTo:
        '1. You, your spouse, the two witnesses and the officiant sign the Marriage Licence and Registration of Marriage after the ceremony.\n2. A keepsake certificate from the officiant is not the legal, government-issued marriage certificate.',
    },
    {
      id: 'registration',
      title: 'Officiant sends the registration to Vital Statistics',
      offsetDays: 2,
      durationDays: 2,
      dependsOn: ['ceremony'],
      documents: [],
      prepare: ['Confirm with the officiant that it was sent'],
      howTo:
        '1. Within 48 hours of the wedding, the officiant submits the registration to the B.C. Vital Statistics Agency.\n2. A marriage certificate can only be issued once the registration is processed.',
    },
    {
      id: 'certificate',
      title: 'Receive the marriage certificate',
      offsetDays: 28,
      durationDays: 21,
      dependsOn: ['registration'],
      documents: ['Marriage certificate'],
      prepare: [
        'Check the mailing address you gave when buying the licence',
        'Decide whether you need extra copies',
      ],
      howTo:
        '1. One official certificate comes by mail about 3 weeks after the wedding, to the address given on the licence application; it is included in the licence fee.\n2. Either spouse can order more from Vital Statistics online, by mail or at Service BC once the marriage is registered.\n3. Standard orders print within 5 business days plus mail; courier orders print the next business day.\n4. The date here is an estimate; most name and record updates ask for this certificate.',
    },
    {
      id: 'surname',
      title: 'Decide which last name to use',
      offsetDays: 35,
      durationDays: 7,
      conditions: ['Only if either of you wants to use a new last name'],
      dependsOn: ['certificate'],
      documents: ['Marriage certificate'],
      prepare: ['The exact last name you will use, as shown on the marriage certificate'],
      howTo:
        '1. In B.C. either spouse can assume the other\'s last name, or both names joined with a hyphen or a space, without a legal change of name.\n2. Assuming a name does not change the name on your birth record.\n3. For another name, part of a name, or a change to first or middle names, apply for a legal change of name under the Name Act: 19 or older, living in B.C. at least 3 months, with a fingerprint-based criminal record check.\n4. A legal change of name takes about 24 weeks to process.',
    },
    {
      id: 'msp',
      title: 'Update your name with MSP',
      offsetDays: 70,
      durationDays: 30,
      conditions: ['Only if you changed your last name'],
      dependsOn: ['surname'],
      documents: ['Marriage certificate', 'BC Services Card'],
      prepare: ['Personal Health Number', 'Marriage certificate showing the new last name'],
      howTo:
        '1. Update MSP first, so the name matches when ICBC opens your file.\n2. Use the online MSP Account Change Request or call Health Insurance BC; there is no fee.\n3. If your spouse is already on your MSP account, no document may be needed; otherwise send the marriage certificate.\n4. Allow 21 business days; the 30 days here is an estimate. A confirmation letter comes by mail.',
    },
    {
      id: 'icbc',
      title: "Get a new BC Services Card and driver's licence or BCID",
      offsetDays: 100,
      durationDays: 14,
      conditions: ['Only if you changed your last name'],
      dependsOn: ['msp'],
      documents: ['Marriage certificate', 'BC Services Card', "Driver's licence"],
      prepare: [
        'MSP confirmation letter',
        'Primary and secondary ID',
        'Marriage certificate linking the old and new last names',
      ],
      howTo:
        '1. Once the MSP letter arrives, visit an ICBC driver licensing office to order the new card.\n2. Bring documents that link your last name at birth to the new one.\n3. A BC Services Card combined with a driver\'s licence is updated in one visit.\n4. The 14 days is an estimate, including mail time for the new card.',
    },
    {
      id: 'sin',
      title: 'Update the name on your SIN record',
      offsetDays: 60,
      durationDays: 7,
      conditions: ['Only if you changed your last name'],
      dependsOn: ['surname'],
      documents: ['Marriage certificate'],
      prepare: ['Social Insurance Number', 'Document linking the old and new names'],
      howTo:
        '1. Service Canada asks you to update your SIN record when your name changes.\n2. Update online or by mail; there is no fee.\n3. Online confirmation takes about 5 business days; by mail about 20 business days.',
    },
    {
      id: 'passport',
      title: 'Apply for a passport in the new name',
      offsetDays: 150,
      durationDays: 30,
      validForDays: 3652,
      conditions: ['Only if you changed your last name and hold a Canadian passport'],
      dependsOn: ['surname', 'icbc'],
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
      id: 'benefits',
      title: 'Check the Canada Child Benefit and credits',
      offsetDays: 60,
      durationDays: 30,
      conditions: ['Only if either of you has children or gets CRA benefits'],
      dependsOn: ['cra'],
      documents: ['Notice of redetermination'],
      prepare: ["Both spouses' tax returns filed"],
      howTo:
        '1. Benefit and credit payments, including the Canada Child Benefit, are based on adjusted family net income, which now includes your spouse.\n2. The CRA recalculates from the month after your marital status changed.\n3. Check the new amounts in CRA My Account; a drop is normal if family income rose.',
    },
    {
      id: 'estate',
      title: 'Review wills, incapacity documents and beneficiaries',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: ['ceremony'],
      documents: ['Will', 'Enduring power of attorney', 'Representation agreement'],
      prepare: [
        'Existing wills of both spouses',
        'Beneficiaries on RRSPs, TFSAs, pensions and life insurance',
        'Who should decide for you if you cannot',
      ],
      howTo:
        '1. Since March 31, 2014, marriage no longer revokes a will in B.C. under the Wills, Estates and Succession Act, so an old will stays in force until you change it.\n2. A will revoked by marriage before that date is not revived.\n3. If married spouses later separate in a way that gives rise to a family property interest, gifts to the spouse in a will are revoked as if the spouse died first.\n4. For finances, B.C. uses an enduring power of attorney; for health and personal care, a representation agreement. The standard provincial forms are optional.\n5. Not legal advice; see a lawyer if your affairs are complicated.',
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
