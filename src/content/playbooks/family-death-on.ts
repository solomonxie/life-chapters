import type { Playbook } from '../../domain/types';

export const familyDeathOn: Playbook = {
  id: 'family-death-on',
  title: 'Death in the family · Ontario',
  summary:
    'The paperwork after a death in Ontario, from registering the death and ordering certificates to federal benefits, the estate certificate, final taxes and handing over the estate.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'family-death',
  anchorKind: 'family-death',
  conditions: [
    'A family member died, and they lived in Ontario',
    'You are the estate trustee (executor), the next of kin, or helping the person who is',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'What to do when someone dies — Ontario.ca',
      url: 'https://www.ontario.ca/page/what-do-when-someone-dies',
    },
    {
      title: 'Get or replace an Ontario death certificate — Ontario.ca',
      url: 'https://www.ontario.ca/page/get-or-replace-an-ontario-death-certificate',
    },
    {
      title: 'Administering estates — Ontario.ca',
      url: 'https://www.ontario.ca/page/administering-estates',
    },
    {
      title: 'Apply for probate of an estate — Ontario.ca',
      url: 'https://www.ontario.ca/page/apply-probate-estate',
    },
    {
      title: 'Probate of a small estate — Ontario.ca',
      url: 'https://www.ontario.ca/page/probate-small-estate',
    },
    {
      title: 'Estate Administration Tax — Ontario.ca',
      url: 'https://www.ontario.ca/page/estate-administration-tax',
    },
    {
      title: 'Succession Law Reform Act, R.S.O. 1990, c. S.26',
      url: 'https://www.ontario.ca/laws/statute/90s26',
    },
    {
      title: 'Family Law Act, R.S.O. 1990, c. F.3',
      url: 'https://www.ontario.ca/laws/statute/90f03',
    },
    {
      title: 'What to do when someone dies — Canada.ca',
      url: 'https://www.canada.ca/en/services/death.html',
    },
    {
      title: 'Canada Pension Plan death benefit — Canada.ca',
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-death-benefit.html',
    },
    {
      title: "Canada Pension Plan survivor's pension — Canada.ca",
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-survivor-pension.html',
    },
    {
      title: "Canada Pension Plan children's benefit — Canada.ca",
      url: 'https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-childrens-benefit.html',
    },
    {
      title: 'What to do when someone has died (taxes) — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/life-events/what-when-someone-died.html',
    },
    {
      title: 'Filing and payment due dates for a deceased person — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/life-events/doing-taxes-someone-died/prepare-returns/filing-deadlines.html',
    },
    {
      title: 'RRSPs and RRIFs of a deceased person — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/life-events/doing-taxes-someone-died/prepare-returns/report-income/rrsp.html',
    },
    {
      title: 'Death of a TFSA holder — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/death-a-tfsa-holder.html',
    },
    {
      title: 'Clearance certificate — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/life-events/doing-taxes-someone-died/clearance-certificate.html',
    },
  ],
  steps: [
    {
      id: 'medical-cert',
      title: 'Medical Certificate of Death',
      offsetDays: 2,
      durationDays: 2,
      dependsOn: [],
      documents: [],
      prepare: ['Name of the doctor, nurse practitioner or coroner involved', 'Where the person died'],
      howTo:
        '1. A doctor, nurse practitioner or coroner completes the Medical Certificate of Death.\n2. If the death was sudden, unexpected or unexplained, the coroner may investigate first; the funeral director coordinates the timing.\n3. The family does not file this form themselves.',
    },
    {
      id: 'register',
      title: 'Choose a funeral home; it registers the death',
      offsetDays: 4,
      durationDays: 1,
      dependsOn: ['medical-cert'],
      documents: ['Burial permit'],
      prepare: [
        "The deceased's full legal name, date and place of birth",
        "Parents' names, marital status, usual address and occupation",
        'Social Insurance Number and Ontario health card number',
        'Any written wishes about burial or cremation, or a pre-paid funeral plan',
      ],
      howTo:
        '1. The funeral director and a family member complete the Statement of Death (Form 15).\n2. The funeral director submits it with the Medical Certificate of Death to the municipal clerk where the death happened; families can also register it themselves.\n3. The death is registered before a burial permit is issued.\n4. Ontario does not say that federal offices are told automatically, so the Service Canada and CRA step below covers them.',
    },
    {
      id: 'find-will',
      title: 'Look for the will and other papers',
      offsetDays: 10,
      durationDays: 7,
      dependsOn: [],
      documents: ['Will'],
      prepare: [
        'Home files, safety deposit box, the lawyer the person used',
        'Life insurance policies, pension and bank statements',
        'Recent tax returns and notices of assessment',
      ],
      howTo:
        '1. Ontario has no central wills registry. The original is often with a lawyer, at home, or in a safety deposit box.\n2. A will deposited with the court can be found through the estates office of the Superior Court of Justice where the deceased lived.\n3. The will usually names the estate trustee, who handles the rest of this plan; with no will, a close family member can apply to administer the estate.\n4. A list of accounts, debts, insurance and property now makes the probate and tax steps easier.',
    },
    {
      id: 'certificates',
      title: 'Order death certificates',
      offsetDays: 14,
      durationDays: 7,
      dependsOn: ['register'],
      documents: ['Death certificate'],
      prepare: ['How many originals banks, insurers and pension plans want', 'Check the current fee'],
      howTo:
        '1. Order from ServiceOntario online, by mail or in person once the death is registered; there is no limit on who can apply or how many copies.\n2. The funeral home also gives a proof-of-death statement that some organizations accept.\n3. The 7 days is an estimate; check current ServiceOntario processing times.',
    },
    {
      id: 'federal',
      title: 'Tell Service Canada and the CRA',
      offsetDays: 21,
      durationDays: 3,
      dependsOn: ['register'],
      documents: ['Death certificate'],
      prepare: ["Deceased's SIN", 'Your own name and relationship', 'List of federal payments they received (CPP, OAS, CRA benefits)'],
      howTo:
        '1. Call Service Canada and the CRA with the date of death; the funeral home may already have sent a notice, so the call confirms it.\n2. CPP and Old Age Security stop after the month of death; payments sent for later months are usually returned. Check with Service Canada.\n3. The CRA cancels or transfers benefit payments such as the Canada Child Benefit and the Canada Groceries and Essentials Benefit (CGEB).\n4. The estate trustee can register as the legal representative with the CRA to deal with the tax file.',
    },
    {
      id: 'benefits-transfer',
      title: 'Move child and family benefits to the survivor',
      offsetDays: 60,
      durationDays: 30,
      conditions: ['Only if the deceased received the Canada Child Benefit or had a spouse or partner'],
      dependsOn: ['federal'],
      documents: ['Death certificate'],
      prepare: ["Children's names and birth dates", "Surviving parent's SIN"],
      howTo:
        '1. If the deceased received the Canada Child Benefit for children now in your care, apply for it in your own name through CRA My Account or form RC66.\n2. A surviving spouse or partner reports the change in marital status to the CRA; family benefits are recalculated on the survivor\'s income.\n3. The Ontario Child Benefit comes with the Canada Child Benefit, so no separate application.',
    },
    {
      id: 'notify-others',
      title: 'Tell banks, insurers, employers and pension plans',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: ['certificates'],
      documents: ['Death certificate', 'Will'],
      prepare: [
        'Account and policy numbers',
        'Employer and workplace pension contacts',
        'Utilities, phone, subscriptions and credit cards',
      ],
      howTo:
        '1. Banks freeze accounts in the deceased\'s sole name until the estate trustee shows authority; joint accounts usually pass to the surviving owner.\n2. Life insurance and workplace benefits have their own claim forms; claims can start before probate.\n3. Contact the employer\'s pension plan about any survivor pension.\n4. If the deceased paid or received support through the Family Responsibility Office, tell FRO.\n5. Credit bureaus (Equifax, TransUnion) can mark the file as deceased to limit identity fraud.',
    },
    {
      id: 'cancel-id',
      title: "Cancel passport, driver's licence and other ID",
      offsetDays: 30,
      durationDays: 14,
      dependsOn: ['certificates'],
      documents: ['Death certificate', 'Canadian passport', "Driver's licence"],
      prepare: ['The physical cards', 'Any accessible parking permit'],
      howTo:
        '1. Return the driver\'s licence to ServiceOntario with the death certificate or another proof of death.\n2. Mail an accessible parking permit to ServiceOntario within 30 days of the death.\n3. Ask ServiceOntario to cancel the health card too; check current steps.\n4. Return or report the Canadian passport to the Passport Program; IRCC also handles a PR card or citizenship record.\n5. The SIN record is updated by Service Canada once the death is reported.',
    },
    {
      id: 'cpp-benefits',
      title: "Apply for CPP death, survivor's and children's benefits",
      offsetDays: 60,
      durationDays: 30,
      conditions: ['Only if the deceased paid into the Canada Pension Plan'],
      dependsOn: ['certificates'],
      documents: ['Death certificate'],
      prepare: [
        "Deceased's SIN and work history",
        "Survivor's and children's SINs and birth certificates",
        'Proof of marriage or common-law relationship',
      ],
      howTo:
        '1. The death benefit is a one-time payment of up to $2,500 (up to $5,000 with the top-up in some cases, since January 2025). The estate trustee applies within 60 days of the death; after that, whoever paid for the funeral, then the spouse or next of kin, can apply.\n2. The survivor\'s pension is a monthly payment for a legal spouse or common-law partner.\n3. The children\'s benefit is monthly for dependent children under 18, or 18 to 25 in full-time school.\n4. Apply online through My Service Canada Account or by mail; processing takes about 6 to 12 weeks.\n5. A surviving spouse aged 60 to 64 with low income may also qualify for the Old Age Security Allowance for the Survivor; check current rules.',
    },
    {
      id: 'home-transfer',
      title: 'Register the death on a jointly owned home',
      offsetDays: 75,
      durationDays: 30,
      conditions: ['Only if the deceased owned land or a home as joint tenants with someone who survives them'],
      dependsOn: ['certificates'],
      documents: ['Death certificate', 'Property title'],
      prepare: ['Property address and PIN', 'A real estate lawyer'],
      howTo:
        '1. Joint tenancy passes the property to the surviving owner outside the estate; it does not need an estate certificate.\n2. A survivorship application is registered in the Ontario land registry with proof of death to remove the deceased\'s name.\n3. Registration is electronic, so it is usually done by a lawyer.\n4. A home held in the deceased\'s sole name, or as tenants in common, goes through the estate instead.',
    },
    {
      id: 'vehicle',
      title: 'Transfer or cancel the vehicle and insurance',
      offsetDays: 75,
      durationDays: 14,
      conditions: ['Only if the deceased owned a vehicle'],
      dependsOn: ['certificates'],
      documents: ['Death certificate', 'Vehicle registration', 'Will'],
      prepare: ['Who takes the vehicle', "Deceased's insurer"],
      howTo:
        '1. At ServiceOntario, transfer the vehicle permit to the survivor or beneficiary, with the death certificate and proof of who is entitled, such as the will or the estate certificate.\n2. Tell the insurer; the policy is cancelled or moved to the new owner.\n3. Check current ServiceOntario rules on retail sales tax for transfers to family.',
    },
    {
      id: 'registered-accounts',
      title: 'Settle RRSPs, RRIFs and TFSAs',
      offsetDays: 120,
      durationDays: 30,
      conditions: ['Only if the deceased had registered accounts'],
      dependsOn: ['certificates'],
      documents: ['Death certificate'],
      prepare: ['Named beneficiaries or successor holders on each account', "Survivor's own RRSP or RRIF account details"],
      howTo:
        '1. A named beneficiary or successor holder deals with the financial institution directly, usually without probate.\n2. An RRSP or RRIF left to a spouse or common-law partner can roll into the survivor\'s own plan without tax at death; otherwise its value is generally income on the final return.\n3. A spouse named as TFSA successor holder takes over the account as their own.\n4. Other TFSA beneficiaries receive the value; some amounts can go into a survivor\'s TFSA within a set period. Check the current CRA rules.',
    },
    {
      id: 'probate-serve',
      title: 'Send the estate application to beneficiaries',
      offsetDays: 60,
      durationDays: 7,
      conditions: ['Only if the estate needs a Certificate of Appointment of Estate Trustee or a Small Estate Certificate'],
      dependsOn: ['find-will', 'certificates'],
      documents: ['Will'],
      prepare: ['Names and addresses of everyone entitled to a share of the estate'],
      howTo:
        '1. Banks and the land registry usually ask for a certificate when there is land, or larger accounts, in the deceased\'s sole name.\n2. Estates worth $150,000 or less can use the simpler Small Estate Certificate forms (Form 74.1A and others); larger estates apply for a Certificate of Appointment of Estate Trustee, with or without a will.\n3. Before filing, a copy of the application is sent to everyone entitled to a share; email or mail is accepted.\n4. A bond may be needed, for example when there is no will or the applicant lives outside Canada.',
    },
    {
      id: 'probate-apply',
      title: 'File with the Superior Court and pay Estate Administration Tax',
      offsetDays: 120,
      durationDays: 30,
      conditions: ['Only if the estate needs a Certificate of Appointment of Estate Trustee or a Small Estate Certificate'],
      dependsOn: ['probate-serve'],
      documents: ['Will', 'Death certificate', 'Certificate of Appointment of Estate Trustee'],
      prepare: [
        'Value of real and personal property in the estate',
        'Affidavits, sworn before a commissioner for taking affidavits',
        'Estate Administration Tax payment',
      ],
      howTo:
        '1. File at the Superior Court of Justice in the county or district where the deceased lived.\n2. Estate Administration Tax is paid at filing: none on estates of $50,000 or less, then $15 for every $1,000 or part of it above $50,000. Check current.\n3. Applications are typically processed within 15 business days; small estates in about 5; longer if something is missing.',
    },
    {
      id: 'estate-info-return',
      title: 'File the Estate Information Return',
      offsetDays: 300,
      durationDays: 30,
      conditions: ['Only if a certificate was issued'],
      dependsOn: ['probate-apply'],
      documents: ['Certificate of Appointment of Estate Trustee'],
      prepare: ['Values of each asset at the date of death'],
      howTo:
        '1. The estate trustee files the Estate Information Return with the Ministry of Finance within 180 calendar days after the certificate is issued.\n2. It is filed even when the estate owes no tax.\n3. The date here is an estimate; set it from the date on the certificate.',
    },
    {
      id: 'spouse-election',
      title: "Married spouse's 6-month election",
      offsetDays: 182,
      durationDays: 30,
      conditions: ['Only if the deceased was married and the spouse survives them'],
      dependsOn: [],
      documents: ['Will'],
      prepare: ['Values of both spouses\' property at the date of death', 'A family or estates lawyer, if using one'],
      howTo:
        '1. Under Ontario\'s Family Law Act, a surviving married spouse chooses between what the will (or the intestacy rules) gives them and an equalization of net family property.\n2. The election is filed with the Estate Registrar for Ontario within 6 months after the death; with no election filed, the spouse takes under the will or intestacy.\n3. Common-law partners do not have this election.\n4. The estate trustee generally waits for this period to pass before distributing.',
    },
    {
      id: 'final-return',
      title: 'File the final tax return',
      offsetDays: 214,
      durationDays: 30,
      dependsOn: ['federal'],
      documents: ['Notice of assessment'],
      prepare: [
        'Income slips from January 1 to the date of death',
        'Any tax returns from earlier years not yet filed',
        'Values of property and registered accounts at the date of death',
      ],
      howTo:
        '1. For a death from January 1 to October 31, the final return is due April 30 of the next year; from November 1 to December 31, 6 months after the death.\n2. If the deceased or their spouse ran a business, the filing date is June 15 (or 6 months after a death in late December), but any balance is still due by the regular date.\n3. Capital property and registered accounts are generally treated as sold at death, unless they pass to a spouse.\n4. The date here is an estimate; move it to the real deadline.',
    },
    {
      id: 'estate-return',
      title: "File the estate's trust return (T3)",
      offsetDays: 455,
      durationDays: 30,
      conditions: ['Only if the estate earns income, such as interest, rent or gains, after the death'],
      dependsOn: ['final-return'],
      documents: [],
      prepare: ['Estate bank statements', 'Income and distributions after the death'],
      howTo:
        '1. The estate is a separate taxpayer from the day after death.\n2. The T3 return is due 90 days after the estate\'s tax year-end; the first year can end up to 1 year after the death.\n3. The date here is an estimate; set it from the year-end the estate trustee chooses.',
    },
    {
      id: 'clearance',
      title: 'Ask the CRA for a clearance certificate',
      offsetDays: 600,
      durationDays: 120,
      dependsOn: ['final-return', 'estate-return'],
      documents: ['Notice of assessment'],
      prepare: ['Form TX19', 'Notices of assessment for every return filed', 'Draft plan for distributing the estate'],
      howTo:
        '1. A clearance certificate confirms that all taxes the deceased and the estate owe are paid.\n2. Send form TX19 once every return has been assessed.\n3. An estate trustee who distributes without one can be personally liable for tax still owing.\n4. Processing takes several months; the 120 days is an estimate.',
    },
    {
      id: 'distribute',
      title: 'Distribute the estate and close it',
      offsetDays: 750,
      durationDays: 30,
      dependsOn: ['clearance'],
      documents: ['Will', 'Certificate of Appointment of Estate Trustee'],
      prepare: ['Final accounts for the beneficiaries', 'Signed releases from beneficiaries'],
      howTo:
        '1. Dependants can claim support from an estate, generally within 6 months after the certificate is issued, and a married spouse has the 6-month election; estate trustees usually wait these out unless everyone consents or a court orders otherwise. Check current rules.\n2. The estate trustee pays debts and taxes, gives beneficiaries an accounting, and hands out what remains.\n3. Close the estate bank account once everything is paid out.',
    },
  ],
};
