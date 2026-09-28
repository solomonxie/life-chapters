import type { Playbook } from '../../domain/types';

export const separatedBc: Playbook = {
  id: 'separated-bc',
  title: 'Separation and divorce · British Columbia',
  summary:
    'The paperwork after separating in British Columbia, counted from the date of separation: taxes and benefits, parenting and support, dividing property, wills, and divorce.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'separated',
  anchorKind: 'separated',
  conditions: [
    'You and your spouse or partner have separated, and you live in British Columbia',
    'Married, or unmarried and living in a marriage-like relationship',
    'General information about the process, not legal advice',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Family justice — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice',
    },
    {
      title: 'Separation and divorce — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/separation-divorce',
    },
    {
      title: 'Parenting apart — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/parenting-apart',
    },
    {
      title: 'Child support — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/child-support',
    },
    {
      title: 'Spousal support — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/spousal-support',
    },
    {
      title: 'Dealing with property and debt — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/dealing-with-property-and-debt',
    },
    {
      title: 'How do I get my divorce certificate? — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/divorce/family-justice/family-law/separation-divorce/how-do-i-get-my-divorce-certificate',
    },
    {
      title: 'Online Divorce Assistant — B.C. Ministry of Attorney General',
      url: 'https://justice.gov.bc.ca/divorce',
    },
    {
      title: 'BC Family Maintenance Agency',
      url: 'https://www.bcfma.ca/',
    },
    {
      title: 'Change your name after marriage or divorce — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/legal-changes-of-name/change-your-name-after-marriage-or-divorce',
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
      title: 'Find free family justice help',
      offsetDays: 7,
      durationDays: 14,
      dependsOn: [],
      documents: [],
      prepare: ['Nearest Family Justice Centre or Justice Access Centre', 'Whether you qualify for Legal Aid BC'],
      howTo:
        '1. Family Justice Centres and Justice Access Centres offer free in-person and virtual help: information on options, parenting, support and property, and mediation with family justice counsellors.\n2. Legal Aid BC publishes family law guides, and some people qualify for a legal aid lawyer.\n3. If anyone is at risk, the province has safety planning resources and protection orders through the courts.\n4. Many people also see a lawyer before signing anything.',
    },
    {
      id: 'records',
      title: 'Gather financial records around the separation date',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Notice of assessment'],
      prepare: [
        'Last 3 years of tax returns and notices of assessment',
        'Bank, investment, RRSP, TFSA and pension statements',
        'Mortgage, loan and credit card statements',
        'Proof of what each of you owned when the relationship began',
      ],
      howTo:
        '1. Support and property both rely on income and asset records, and financial disclosure is part of both agreements and court cases.\n2. Statements close to the separation date help show what existed then.\n3. The date of separation matters for time limits, taxes and the divorce, so keep a note of it and anything that shows it.',
    },
    {
      id: 'estate-docs',
      title: 'Review your will, beneficiaries and incapacity documents',
      offsetDays: 30,
      durationDays: 30,
      dependsOn: [],
      documents: ['Will', 'Enduring power of attorney', 'Representation agreement'],
      prepare: [
        'Beneficiaries on RRSPs, TFSAs, pensions and life insurance',
        'Who is named in your enduring power of attorney and representation agreement',
        "Who is covered on your workplace health plan",
      ],
      howTo:
        '1. Under B.C.\'s Wills, Estates and Succession Act, once spouses separate in the legal sense, gifts to the former spouse in a will, and their appointment as executor, are revoked as if they had died first.\n2. Beneficiary designations on registered plans and insurance are separate documents; each one is checked with the plan.\n3. An enduring power of attorney or representation agreement naming the other person stays in place until changed; check each one.\n4. Workplace plans have their own rules for how long a separated spouse stays covered.',
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
      prepare: [
        "Children's schedules: school, activities, care",
        'Parenting After Separation course certificate, if taken',
      ],
      howTo:
        '1. B.C. uses the terms guardianship, parenting arrangements (parental responsibilities and parenting time) and contact.\n2. Arrangements can be set out in a written agreement, worked out in mediation or with a family justice counsellor, or decided by the Provincial Court or Supreme Court.\n3. The free online Parenting After Separation course is offered by the province; some court registries expect it before a first appearance.\n4. Decisions are based only on the best interests of the child.',
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
        '1. Child support in B.C. follows the Federal Child Support Guidelines: a table amount based on the paying parent\'s income and the number of children, plus a share of special expenses.\n2. Shared or split parenting time changes the calculation.\n3. The B.C. Child Support Recalculation Service can update the amount each year from new income, without going back to court.',
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
        '1. Spousal support depends on each person\'s situation; there is no automatic right to it.\n2. The federal Spousal Support Advisory Guidelines give ranges that courts and lawyers commonly refer to.\n3. Under B.C.\'s Family Law Act, a claim is made within 2 years after a divorce order, or 2 years after separation for unmarried spouses. Check current.\n4. Spousal support paid periodically under a written agreement or order generally has tax effects for both people; child support does not.',
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
        '1. The Canada Child Benefit goes to the parent mainly responsible for the child\'s care.\n2. When the children live with each parent 40% to 60% of the time, each parent can get half.\n3. A parent not already receiving it applies through CRA My Account or form RC66.\n4. Payments are recalculated on your own income from the month after the status change; BC Family Benefit follows automatically.',
    },
    {
      id: 'property',
      title: 'Divide family property and debt',
      offsetDays: 210,
      durationDays: 60,
      dependsOn: ['records'],
      documents: ['Property title', 'Mortgage statement'],
      prepare: [
        'List of family property and debt, with values',
        'Property each of you brought in, inherited or received as a gift',
        'Pension statements for division',
      ],
      howTo:
        '1. Under B.C.\'s Family Law Act, married spouses and unmarried spouses who lived together in a marriage-like relationship for at least 2 years generally share family property and family debt equally.\n2. Property one person had before the relationship, gifts and inheritances are generally excluded, though growth in value during the relationship may be shared.\n3. Spouses can agree on a different split in writing.\n4. Workplace pensions can be divided under the Family Law Act; the plan administrator has its own forms.',
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
        '1. A written separation agreement records parenting, support and property terms.\n2. An agreement can be filed with the court so parenting or support terms can be enforced like an order.\n3. Terms that cannot be agreed can go to mediation, arbitration, or the Provincial Court (parenting and support) or Supreme Court (property and divorce).\n4. Many people get independent legal advice before signing.',
    },
    {
      id: 'support-enrol',
      title: 'Enrol support with the BC Family Maintenance Agency',
      offsetDays: 330,
      durationDays: 30,
      conditions: ['Only if child or spousal support is payable under an agreement or order'],
      dependsOn: ['agreement'],
      documents: ['Separation agreement', 'Parenting order or agreement'],
      prepare: ['Filed agreement or court order', 'Contact details for the other person'],
      howTo:
        '1. The BC Family Maintenance Agency (formerly FMEP) collects support and passes it on, and can enforce missed payments.\n2. Either the person paying or the person receiving can enrol a filed agreement or court order.\n3. Enrolment is voluntary; check current enrolment steps with the agency.',
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
        '1. Divorce comes under the federal Divorce Act; the usual ground is living apart for at least 1 year.\n2. In B.C. divorces go through the Supreme Court. A joint application can be prepared with the Online Divorce Assistant when both agree on everything.\n3. An uncontested divorce is usually decided on the paperwork alone, without a hearing (a desk order divorce).\n4. The court checks that reasonable arrangements are in place for child support before granting it.\n5. The divorce takes effect 31 days after the order.',
    },
    {
      id: 'divorce-cert',
      title: 'Get the divorce certificate',
      offsetDays: 500,
      durationDays: 30,
      conditions: ['Only if you were married and a divorce order was made'],
      dependsOn: ['divorce'],
      documents: ['Divorce certificate'],
      prepare: ['Court file number'],
      howTo:
        '1. Once the divorce takes effect, a certificate of divorce can be requested from the Supreme Court registry where the file is.\n2. Keep a copy; it is asked for when remarrying, changing a name back, and for CPP credit splitting.',
    },
    {
      id: 'name',
      title: 'Go back to a previous last name',
      offsetDays: 530,
      durationDays: 60,
      conditions: ['Only if you want to use a previous last name again'],
      dependsOn: [],
      documents: ['Divorce certificate', 'Birth certificate', 'BC Services Card', "Driver's licence"],
      prepare: ['Documents linking the previous and current last names'],
      howTo:
        '1. In B.C. a birth surname or a surname from an earlier marriage can be used again without a legal change of name.\n2. Start with MSP and the BC Services Card and driver\'s licence; updated provincial ID makes other changes easier.\n3. Then update the SIN record, passport, banks and employer; each has its own document list.',
    },
    {
      id: 'property-limit',
      title: 'Time limit for property and support claims',
      offsetDays: 730,
      durationDays: 30,
      conditions: ['Only if property, debt or spousal support is not yet settled'],
      dependsOn: [],
      documents: ['Separation agreement'],
      prepare: ['Date of separation', 'Date of any divorce order'],
      howTo:
        '1. Under B.C.\'s Family Law Act, unmarried spouses apply to divide property within 2 years of separating.\n2. Married spouses apply within 2 years after the divorce order.\n3. The date here is 2 years after separation; for married spouses, move it to 2 years after the divorce order. Check current.',
    },
  ],
};
