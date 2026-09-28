import type { Playbook } from '../../domain/types';

export const cohabitingOn: Playbook = {
  id: 'cohabiting-on',
  title: 'Moving in together · Ontario',
  summary:
    'Paperwork plan for an unmarried couple moving in together in Ontario: addresses, a cohabitation agreement, benefits and beneficiaries, wills, the 1- and 3-year marks for tax and family law, and sponsorship.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'cohabiting',
  anchorKind: 'cohabiting',
  ages: { from: 18 },
  conditions: [
    'You and your partner live together in Ontario in a relationship like a marriage, without being married',
    'The event date is the day you started living together',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Update your marital status with the CRA — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/update-your-marital-status-canada-revenue-agency.html',
    },
    {
      title: 'Marital status — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-address-information/marital-status.html',
    },
    {
      title: 'Family Law Act, R.S.O. 1990, c. F.3',
      url: 'https://www.ontario.ca/laws/statute/90f03',
    },
    {
      title: 'Succession Law Reform Act, R.S.O. 1990, c. S.26',
      url: 'https://www.ontario.ca/laws/statute/90s26',
    },
    {
      title: "Change your address on your driver's licence, vehicle permit and health card — Ontario.ca",
      url: 'https://www.ontario.ca/page/change-address-drivers-licence-vehicle-permit-and-health-card',
    },
    {
      title: 'Make a power of attorney — Ontario.ca',
      url: 'https://www.ontario.ca/page/make-power-attorney',
    },
    {
      title: 'Sponsor your spouse, partner or children — Canada.ca',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children.html',
    },
  ],
  steps: [
    {
      id: 'tenancy',
      title: 'Sort out the lease or title for the shared home',
      offsetDays: -30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Lease or title'],
      prepare: ['Current lease', "Landlord's contact details"],
      howTo:
        '1. Renting: check the lease on occupants; adding the partner as a co-tenant on the lease gives them their own rights, while an occupant has fewer.\n2. Owned by one partner: the other has no title unless it is added, and unmarried partners have no automatic share on separation.\n3. Keep copies; a joint lease is also proof of living together.',
    },
    {
      id: 'address',
      title: 'Update your address',
      offsetDays: 0,
      durationDays: 6,
      conditions: ['Only if you moved'],
      dependsOn: [],
      documents: ["Driver's licence", 'Health card'],
      prepare: ['New address', 'Mail forwarding, if needed'],
      howTo:
        '1. A new address for an Ontario driver\'s licence and vehicle permit goes to ServiceOntario within 6 days; one online change also covers the health card.\n2. Update the CRA, banks and employers.\n3. Canada Post mail forwarding covers the gap.',
    },
    {
      id: 'agreement',
      title: 'Consider a cohabitation agreement',
      offsetDays: 30,
      durationDays: 60,
      dependsOn: [],
      documents: ['Cohabitation agreement'],
      prepare: ['List of what each partner owns and owes now', 'Plans for the home, money and children'],
      howTo:
        '1. The Ontario Family Law Act lets unmarried partners make a written cohabitation agreement on property, support and other matters; it becomes a marriage contract if you marry.\n2. It is in writing, signed by both and witnessed; each partner getting independent legal advice makes it harder to set aside.\n3. Without one, unmarried partners have no equalization of property on separation.\n4. Not legal advice; a family lawyer can help.',
    },
    {
      id: 'benefits',
      title: 'Add your partner to workplace benefits',
      offsetDays: 30,
      durationDays: 14,
      conditions: ['Only if either of you has a workplace health, dental or life insurance plan'],
      dependsOn: [],
      documents: ['Benefits enrolment change form'],
      prepare: ["Partner's date of birth", 'Proof of living together, if the plan asks'],
      howTo:
        '1. Plans set their own rules for when a common-law partner counts; some from the day you move in, others after 12 months.\n2. Changes are often only accepted within a set window (commonly 31 days) of a life event; check the plan booklet.\n3. If both have plans, coordinating them can cover more.',
    },
    {
      id: 'beneficiaries',
      title: 'Update beneficiaries on accounts and insurance',
      offsetDays: 60,
      durationDays: 14,
      dependsOn: [],
      documents: ['Beneficiary designation forms'],
      prepare: ['RRSP, TFSA, FHSA, pension and life insurance account list'],
      howTo:
        '1. In Ontario beneficiaries can be named directly on RRSPs, TFSAs, FHSAs and life insurance.\n2. A spouse or common-law partner can be named successor holder on a TFSA or FHSA, keeping it tax-free.\n3. Designations made before you moved in stay in force until changed.',
    },
    {
      id: 'wills',
      title: 'Make or update wills and powers of attorney',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: [],
      documents: ['Will', 'Continuing power of attorney for property', 'Power of attorney for personal care'],
      prepare: ['Existing wills', 'Who should decide for you if you cannot'],
      howTo:
        '1. In Ontario a common-law partner inherits nothing when someone dies without a will, however long you lived together; a court claim for dependant support is the only route.\n2. A will is the way to leave a partner the home or other property.\n3. Powers of attorney for property and personal care let a partner act on money and health decisions; free kits are on Ontario.ca.\n4. Not legal advice; a lawyer can help.',
    },
    {
      id: 'cra',
      title: 'Tell the CRA you are common-law',
      offsetDays: 365,
      durationDays: 30,
      dependsOn: [],
      documents: [],
      prepare: ["Partner's name and SIN", 'Date you started living together'],
      howTo:
        '1. For tax, a partner becomes common-law after 12 continuous months living together, or sooner if you have a child together.\n2. Report the change by the end of the month after the month it happened, in CRA My Account, by phone, or on form RC65.\n3. The Canada Child Benefit, the Canada Groceries and Essentials Benefit and the Ontario Trillium Benefit are recalculated on family net income; both partners file a return each year to keep them.',
    },
    {
      id: 'sponsorship',
      title: 'Look into sponsoring your partner',
      offsetDays: 365,
      durationDays: 60,
      conditions: ["Only if your partner isn't a Canadian citizen or permanent resident"],
      dependsOn: [],
      documents: ['Proof of 12 months living together'],
      prepare: ['Joint lease or title, shared bills, same address on ID', 'Check the current IRCC guide and fees'],
      howTo:
        '1. IRCC treats a partner as common-law after 12 continuous months living together.\n2. The sponsor is 18 or older, a Canadian citizen, permanent resident or registered under the Indian Act.\n3. Both applications go in together through the IRCC PR portal; check current processing times.',
    },
    {
      id: 'three-years',
      title: 'Know what changes at 3 years together',
      offsetDays: 1096,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['Cohabitation agreement, if any'],
      howTo:
        '1. Under the Ontario Family Law Act, partners who have lived together for at least 3 years can claim spousal support; with a child together, a relationship of some permanence is enough.\n2. Property is not divided by equalization for unmarried partners at any length; claims go through trust law in court.\n3. Not legal advice; the dates here are prompts.',
    },
  ],
};
