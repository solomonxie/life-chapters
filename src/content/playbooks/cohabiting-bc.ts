import type { Playbook } from '../../domain/types';

export const cohabitingBc: Playbook = {
  id: 'cohabiting-bc',
  title: 'Moving in together · British Columbia',
  summary:
    'Paperwork plan for an unmarried couple moving in together in British Columbia: addresses, a cohabitation agreement, benefits and beneficiaries, wills, the 1- and 2-year marks for tax and family law, and sponsorship.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'cohabiting',
  anchorKind: 'cohabiting',
  ages: { from: 19 },
  conditions: [
    'You and your partner live together in British Columbia in a relationship like a marriage, without being married',
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
      title: 'Family Law Act, S.B.C. 2011, c. 25',
      url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/11025_01',
    },
    {
      title: 'Wills, Estates and Succession Act, S.B.C. 2009, c. 13',
      url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/09013_01',
    },
    {
      title: 'Change your name or address — ICBC',
      url: 'https://icbc.com/driver-licensing/getting-licensed/Change-your-name-or-address',
    },
    {
      title: 'Incapacity planning — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/managing-your-health/incapacity-planning',
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
      documents: ['Tenancy agreement or title'],
      prepare: ['Current tenancy agreement', "Landlord's contact details"],
      howTo:
        '1. Renting: check whether the tenancy agreement limits occupants; adding the partner as a co-tenant gives them their own rights, while an occupant has fewer.\n2. Owned by one partner: the other has no title unless it is added; family law may still give a share later.\n3. Keep copies; a joint lease is also proof of living together.',
    },
    {
      id: 'address',
      title: 'Update your address',
      offsetDays: 0,
      durationDays: 10,
      conditions: ['Only if you moved'],
      dependsOn: [],
      documents: ["Driver's licence", 'BC Services Card'],
      prepare: ['New address', 'Mail forwarding, if needed'],
      howTo:
        '1. A new address for a BC driver\'s licence goes to ICBC within 10 days.\n2. Update MSP and the BC Services Card, the CRA, banks and employers.\n3. Canada Post mail forwarding covers the gap.',
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
        '1. A written agreement can set out how property, debts and support are handled if you separate, instead of the Family Law Act defaults.\n2. It is signed by both and witnessed; each partner getting independent legal advice makes it harder to set aside.\n3. It can be updated, or becomes a marriage agreement if you later marry.\n4. Not legal advice; a family lawyer can help.',
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
        '1. In British Columbia beneficiaries can be named directly on RRSPs, TFSAs, FHSAs and life insurance.\n2. A spouse or common-law partner can be named successor holder on a TFSA or FHSA, keeping it tax-free.\n3. Designations made before you moved in stay in force until changed.',
    },
    {
      id: 'wills',
      title: 'Make or update wills and incapacity documents',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: [],
      documents: ['Will', 'Enduring power of attorney', 'Representation agreement'],
      prepare: ['Existing wills', 'Who should decide for you if you cannot'],
      howTo:
        '1. Under WESA, a partner counts as a spouse after living in a marriage-like relationship for at least 2 years; before that, a partner inherits nothing without a will.\n2. A will can be registered with the BC Wills Registry through Vital Statistics.\n3. An enduring power of attorney and a representation agreement let a partner act on money and health decisions.\n4. Not legal advice; a lawyer or notary can help.',
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
        '1. For tax, a partner becomes common-law after 12 continuous months living together, or sooner if you have a child together.\n2. Report the change by the end of the month after the month it happened, in CRA My Account, by phone, or on form RC65.\n3. The Canada Child Benefit and the Canada Groceries and Essentials Benefit are recalculated on family net income from the next month; both partners file a return each year to keep them.',
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
      id: 'two-years',
      title: 'Know what changes at 2 years together',
      offsetDays: 730,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['Cohabitation agreement, if any'],
      howTo:
        '1. Under the BC Family Law Act, partners in a marriage-like relationship for 2 years are spouses: family property and debt are shared equally on separation, and spousal support can be claimed.\n2. With a child together, spousal support can be claimed sooner.\n3. Claims for property division are made within 2 years of separating.\n4. Not legal advice; the dates here are prompts.',
    },
  ],
};
