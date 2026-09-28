import type { Playbook } from '../../domain/types';

export const separatedOn: Playbook = {
  id: 'separated-on',
  title: 'Separation and divorce · Ontario',
  summary:
    'The paperwork after separating in Ontario, counted from the date of separation: taxes and benefits, parenting and support, dividing property, wills, and divorce.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'separated',
  anchorKind: 'separated',
  conditions: [
    'You and your spouse or partner have separated, and you live in Ontario',
    'Married, or unmarried and living together',
    'General information about the process, not legal advice',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Family Law Information Centres — Ontario.ca',
      url: 'https://www.ontario.ca/page/family-law-information-centres',
    },
    {
      title: 'Family mediation — Ontario.ca',
      url: 'https://www.ontario.ca/page/family-mediation',
    },
    {
      title: 'Spousal support — Ontario.ca',
      url: 'https://www.ontario.ca/page/spousal-support',
    },
    {
      title: 'Paying and receiving child and spousal support (Family Responsibility Office) — Ontario.ca',
      url: 'https://www.ontario.ca/page/paying-and-receiving-child-and-spousal-support',
    },
    {
      title: 'File family court documents online — Ontario.ca',
      url: 'https://www.ontario.ca/page/file-family-court-documents-online',
    },
    {
      title: 'Change your last name — Ontario.ca',
      url: 'https://www.ontario.ca/page/change-your-last-name',
    },
    {
      title: 'Family Law Act, R.S.O. 1990, c. F.3',
      url: 'https://www.ontario.ca/laws/statute/90f03',
    },
    {
      title: "Children's Law Reform Act, R.S.O. 1990, c. C.12",
      url: 'https://www.ontario.ca/laws/statute/90c12',
    },
    {
      title: 'Succession Law Reform Act, R.S.O. 1990, c. S.26',
      url: 'https://www.ontario.ca/laws/statute/90s26',
    },
    {
      title: 'Divorce and separation — Department of Justice Canada',
      url: 'https://www.justice.gc.ca/eng/fl-df/divorce/index.html',
    },
    {
      title: 'Federal Child Support Guidelines — Department of Justice Canada',
      url: 'https://www.justice.gc.ca/eng/fl-df/child-enfant/fcsg-lfpae/index.html',
    },
    {
      title: 'Spousal Support Advisory Guidelines — Department of Justice Canada',
      url: 'https://www.justice.gc.ca/eng/fl-df/spousal-epoux/ssag-ldfpae.html',
    },
    {
      title: 'Change your marital status with the CRA — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/update-your-marital-status-canada-revenue-agency.html',
    },
    {
      title: 'Recommended consent letter for children travelling abroad — Travel.gc.ca',
      url: 'https://travel.gc.ca/travelling/children/consent-letter',
    },
  ],
  steps: [
    {
      id: 'help',
      title: 'Find free family law help',
      offsetDays: 7,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Nearest family court and its Family Law Information Centre', 'Whether you qualify for Legal Aid Ontario'],
      howTo:
        '1. Family Law Information Centres at family courts offer free information on separation and divorce, referrals, and Legal Aid Ontario duty counsel who explain the law that applies.\n2. Government-funded family mediation is offered at family courts, with fees based on income.\n3. If anyone is at risk, restraining orders are available through the courts, along with victim support services.\n4. Many people also see a lawyer before signing anything.',
    },
    {
      id: 'records',
      title: 'Gather financial records as of the separation date',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Notice of assessment'],
      prepare: [
        'Last 3 years of tax returns and notices of assessment',
        'Bank, investment, RRSP, TFSA and pension statements on the separation date',
        'Mortgage, loan and credit card statements',
        'Values of what each of you owned on the date of marriage',
      ],
      howTo:
        '1. Support and property both rely on income and asset records, and financial disclosure is part of both agreements and court cases.\n2. For married spouses, the separation date is usually the valuation date for dividing property, so statements from that date matter.\n3. The date of separation also affects time limits, taxes and the divorce, so keep a note of it and anything that shows it.',
    },
    {
      id: 'estate-docs',
      title: 'Review your will, beneficiaries and powers of attorney',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Will', 'Power of attorney'],
      prepare: [
        'Beneficiaries on RRSPs, TFSAs, pensions and life insurance',
        'Who is named in your powers of attorney for property and personal care',
        'Who is covered on your workplace health plan',
      ],
      howTo:
        '1. Since January 1, 2022, under Ontario\'s Succession Law Reform Act, a separated married spouse is treated as having died first for gifts and appointments in a will, once the spouses have lived apart for 3 years, or have a separation agreement, court order or family arbitration award settling their rights.\n2. Beneficiary designations on registered plans and insurance are separate documents; each one is checked with the plan.\n3. Powers of attorney naming the other person stay in place until changed; check each one.\n4. Workplace plans have their own rules for how long a separated spouse stays covered.',
    },
    {
      id: 'travel-consent',
      title: 'Consent letters for children travelling',
      offsetDays: 60,
      durationDays: 7,
      conditions: ['Only if you have children who may travel with one parent'],
      dependsOn: [],
      documents: ['Canadian passport', 'Parenting order or agreement'],
      prepare: ["Other parent's contact details", 'Trip dates and destination'],
      howTo:
        '1. Canada recommends a consent letter signed by the other parent for a child travelling abroad without them; border officers may ask for it.\n2. A parenting order or agreement may already say how travel and passports are handled.\n3. A child\'s passport application asks about custody and parenting documents.',
    },
    {
      id: 'parenting',
      title: 'Work out parenting arrangements',
      offsetDays: 90,
      durationDays: 60,
      conditions: ['Only if you have children together'],
      dependsOn: [],
      documents: ['Parenting order or agreement'],
      prepare: ["Children's schedules: school, activities, care", 'A draft parenting plan'],
      howTo:
        '1. Ontario uses the terms decision-making responsibility, parenting time and contact.\n2. Arrangements can be set out in a written parenting plan or separation agreement, worked out in mediation, or decided by the Ontario Court of Justice or the Superior Court of Justice.\n3. In a court case about parenting or support, both people usually attend the Mandatory Information Program early on; check current rules.\n4. Decisions are based only on the best interests of the child.',
    },
    {
      id: 'child-support',
      title: 'Work out child support',
      offsetDays: 90,
      durationDays: 30,
      conditions: ['Only if you have children together'],
      dependsOn: ['records'],
      documents: ['Notice of assessment'],
      prepare: ["Both parents' income for the last year", 'Costs of child care, health, school and activities'],
      howTo:
        '1. Child support in Ontario follows the child support guidelines, which use the federal tables: a table amount based on the paying parent\'s income and the number of children, plus a share of special expenses.\n2. Shared or split parenting time changes the calculation.\n3. Parents exchange income information each year so the amount can be updated.',
    },
    {
      id: 'spousal-support',
      title: 'Look at spousal support',
      offsetDays: 120,
      durationDays: 30,
      conditions: ['Only if either of you may ask for spousal support'],
      dependsOn: ['records'],
      documents: ['Notice of assessment'],
      prepare: ["Both spouses' incomes", 'Length of the relationship and of living together'],
      howTo:
        '1. Spousal support depends on each person\'s situation; there is no automatic right to it.\n2. Under Ontario\'s Family Law Act, unmarried partners can claim if they lived together for at least 3 years, or had a child together in a relationship of some permanence.\n3. The federal Spousal Support Advisory Guidelines give ranges that courts and lawyers commonly refer to.\n4. Time limits can apply, especially for unmarried partners; check current.\n5. Spousal support paid periodically under a written agreement or order generally has tax effects for both people; child support does not.',
    },
    {
      id: 'cra',
      title: 'Tell the CRA you are separated',
      offsetDays: 120,
      durationDays: 1,
      dependsOn: [],
      documents: [],
      prepare: ['Date you started living apart', 'Your SIN'],
      howTo:
        '1. The CRA treats you as separated once you have lived apart for more than 90 days because of the breakdown of the relationship; the change dates back to the first day apart.\n2. Tell the CRA by the end of the month after the month your status changed.\n3. Update in CRA My Account or by phone (processed straight away), or mail form RC65 (4 to 6 weeks).\n4. The date here is an estimate; move it to the real deadline.',
    },
    {
      id: 'ccb',
      title: 'Set up the Canada Child Benefit for the new arrangement',
      offsetDays: 180,
      durationDays: 60,
      conditions: ['Only if you have children under 18'],
      dependsOn: ['cra'],
      documents: [],
      prepare: ['Which parent the children mainly live with', 'Parenting schedule, if time is shared'],
      howTo:
        '1. The Canada Child Benefit goes to the parent mainly responsible for the child\'s care.\n2. When the children live with each parent 40% to 60% of the time, each parent can get half.\n3. A parent not already receiving it applies through CRA My Account or form RC66.\n4. Payments are recalculated on your own income from the month after the status change; the Ontario Child Benefit follows automatically.',
    },
    {
      id: 'property',
      title: 'Divide property and debt',
      offsetDays: 210,
      durationDays: 60,
      dependsOn: ['records'],
      documents: ['Property title', 'Mortgage statement'],
      prepare: [
        "Each spouse's property and debts on the separation date and on the marriage date",
        'Gifts and inheritances received during the marriage',
        'Pension statements for division',
      ],
      howTo:
        '1. Married spouses in Ontario share the growth in wealth during the marriage through an equalization of net family property: the spouse with the higher net family property generally pays the other half the difference.\n2. The matrimonial home has special rules: both spouses have an equal right to live in it whatever the title says, and neither can sell or mortgage it without the other\'s consent.\n3. Unmarried partners have no automatic property division under the Family Law Act; property generally stays with the owner unless a court finds otherwise.\n4. Spouses can agree on a different split in a written domestic contract.\n5. Workplace pensions have a family law value that the plan administrator calculates on request.',
    },
    {
      id: 'agreement',
      title: 'Put the arrangements in writing',
      offsetDays: 300,
      durationDays: 60,
      dependsOn: ['parenting', 'child-support', 'spousal-support', 'property'],
      documents: ['Separation agreement'],
      prepare: ['Drafts of what was agreed', 'Financial disclosure from both sides'],
      howTo:
        '1. A separation agreement is a domestic contract under Ontario\'s Family Law Act; it is in writing, signed by both people and witnessed.\n2. Support terms in an agreement can be filed with the court so they can be enforced like an order.\n3. Terms that cannot be agreed can go to mediation, arbitration or family court.\n4. Many people get independent legal advice before signing.',
    },
    {
      id: 'support-enrol',
      title: 'Register support with the Family Responsibility Office',
      offsetDays: 330,
      durationDays: 30,
      conditions: ['Only if child or spousal support is payable under an agreement or order'],
      dependsOn: ['agreement'],
      documents: ['Separation agreement', 'Parenting order or agreement'],
      prepare: ['Court order, or agreement filed with the court', 'Contact details for the other person'],
      howTo:
        '1. The Family Responsibility Office (FRO) collects support and passes it on, and can enforce missed payments.\n2. Support orders made by an Ontario court generally go to FRO automatically; an agreement is first filed with the court and then registered.\n3. Once registered, the first payment usually reaches the recipient within 30 to 60 days.\n4. Both people can jointly choose to withdraw from FRO in some cases; check current.',
    },
    {
      id: 'cpp-split',
      title: 'Apply to split CPP credits',
      offsetDays: 400,
      durationDays: 60,
      conditions: ['Only if either of you paid into the Canada Pension Plan during the relationship'],
      dependsOn: [],
      documents: ['Marriage certificate', 'Divorce certificate'],
      prepare: ['Both SINs', 'Dates you lived together and separated'],
      howTo:
        '1. CPP pension credits earned while living together can be divided equally between the two of you (a credit split).\n2. Divorced spouses can apply after the divorce; married spouses after living apart for at least 12 months; common-law partners after 12 months apart, with a time limit to apply.\n3. Apply to Service Canada; check the current form and time limits.',
    },
    {
      id: 'divorce',
      title: 'Apply for a divorce',
      offsetDays: 425,
      durationDays: 60,
      conditions: ['Only if you were married and want a divorce'],
      dependsOn: [],
      documents: ['Marriage certificate'],
      prepare: [
        'Original marriage certificate or registration of marriage',
        'Parenting and support arrangements for any children',
        'Check the current court filing fees',
      ],
      howTo:
        '1. Divorce comes under the federal Divorce Act; the usual ground is living apart for at least 1 year.\n2. In Ontario divorces go through the Superior Court of Justice, including its Family Court Branch.\n3. A simple divorce (one spouse applies) or a joint divorce (both apply together) can be filed online.\n4. The court checks that reasonable arrangements are in place for child support before granting it.\n5. The divorce takes effect 31 days after the order.',
    },
    {
      id: 'divorce-cert',
      title: 'Get the certificate of divorce',
      offsetDays: 500,
      durationDays: 30,
      conditions: ['Only if you were married and a divorce order was made'],
      dependsOn: ['divorce'],
      documents: ['Divorce certificate'],
      prepare: ['Court file number'],
      howTo:
        '1. Once the divorce takes effect, a certificate of divorce can be requested from the court office where the file is.\n2. Keep a copy; it is asked for when remarrying, changing a name back, and for CPP credit splitting.',
    },
    {
      id: 'name',
      title: 'Go back to a previous last name',
      offsetDays: 530,
      durationDays: 60,
      conditions: ['Only if you want to use a previous last name again'],
      dependsOn: [],
      documents: ['Divorce certificate', 'Birth certificate', 'Ontario health card', "Driver's licence"],
      prepare: ['Documents linking the previous and current last names', 'Check the current fee'],
      howTo:
        '1. If the married name was legally changed through the old Election to Change Surname service, the Election to Resume Former Surname (Form 2) goes to the ServiceOntario Office of the Registrar General; the fee is $25 and processing takes 6 to 8 weeks. Check current.\n2. If the married name was only used, not legally changed, ask each office which documents it accepts to go back.\n3. Update the health card and driver\'s licence at ServiceOntario, then the SIN record, passport, banks and employer.',
    },
    {
      id: 'property-limit',
      title: 'Time limit for property claims',
      offsetDays: 2190,
      durationDays: 30,
      conditions: ['Only if you were married and property is not yet settled'],
      dependsOn: [],
      documents: ['Separation agreement'],
      prepare: ['Date of separation', 'Date of any divorce'],
      howTo:
        '1. Under Ontario\'s Family Law Act, a married spouse applies for an equalization of net family property by the earliest of 2 years after the divorce and 6 years after separation.\n2. The date here is 6 years after separation; if a divorce came earlier, move it to 2 years after the divorce. Check current.',
    },
  ],
};
