import type { Playbook } from '../../domain/types';

export const familyDeathBc: Playbook = {
  id: 'family-death-bc',
  title: 'Death in the family · British Columbia',
  summary:
    'The paperwork after a death in British Columbia, from registering the death and ordering certificates to federal benefits, probate, final taxes and handing over the estate.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'family-death',
  anchorKind: 'family-death',
  conditions: [
    'A family member died, and they lived in British Columbia',
    'You are the executor, the next of kin, or helping the person who is',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'After a death — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/death/after-death',
    },
    {
      title: 'First steps after a death — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/death/after-death/first-steps',
    },
    {
      title: 'Who to notify after a death — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/death/after-death/who-to-notify',
    },
    {
      title: 'Death registration — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/death/death-registration',
    },
    {
      title: 'Death certificates — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/death/death-certificates',
    },
    {
      title: 'Wills registry — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/life-events/death/wills-registry',
    },
    {
      title: 'Probate forms — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-forms/probate-forms',
    },
    {
      title: 'Wills, Estates and Succession Act, S.B.C. 2009, c. 13',
      url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/09013_01',
    },
    {
      title: 'Land Title and Survey Authority of British Columbia',
      url: 'https://ltsa.ca/',
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
      title: 'Medical certification of death',
      offsetDays: 2,
      durationDays: 2,
      dependsOn: [],
      documents: [],
      prepare: ['Name of the doctor, nurse practitioner or coroner involved', 'Where the person died'],
      howTo:
        '1. A medical practitioner, nurse practitioner or coroner completes and signs the Medical Certification of Death within 48 hours and sends it to the funeral director.\n2. If the death was sudden, unexpected or unexplained, the BC Coroners Service may be involved first; the funeral director and coroner coordinate the timing.\n3. The family does not file this form themselves.',
    },
    {
      id: 'register',
      title: 'Choose a funeral home; it registers the death',
      offsetDays: 4,
      durationDays: 1,
      dependsOn: ['medical-cert'],
      documents: ['Disposition permit'],
      prepare: [
        "The deceased's full legal name, date and place of birth",
        'Parents\' names, marital status, usual address and occupation',
        'Social Insurance Number and Personal Health Number',
        'Any written wishes about burial or cremation, or a pre-paid funeral plan',
      ],
      howTo:
        '1. The funeral director gathers the personal details from an informant, usually the next of kin, and registers the death with the B.C. Vital Statistics Agency.\n2. Once registered, the funeral director issues the disposition permit for burial or cremation.\n3. When the death happens in B.C., Vital Statistics passes it on to Health Insurance BC (MSP), Elections BC, Service Canada and the CRA.\n4. If the death happened outside B.C., these offices are not told automatically; each one is contacted directly.',
    },
    {
      id: 'find-will',
      title: 'Look for the will and other papers',
      offsetDays: 10,
      durationDays: 7,
      dependsOn: [],
      documents: ['Will'],
      prepare: [
        'Home files, safety deposit box, lawyer or notary the person used',
        'Life insurance policies, pension and bank statements',
        'Recent tax returns and notices of assessment',
      ],
      howTo:
        '1. The original will is often with a lawyer or notary, or kept at home or in a safety deposit box.\n2. The will usually names the executor, who handles the rest of this plan; with no will, a close family member can apply to administer the estate.\n3. A list of accounts, debts, insurance and property now makes the probate and tax steps easier.',
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
        '1. Funeral homes often order certificates for the family; more can be ordered from the Vital Statistics Agency online, by mail or at Service BC once the death is registered.\n2. Banks, insurers, pension plans, ICBC and the Land Title Office each tend to ask for one; some accept a certified copy.\n3. The 7 days is an estimate; courier orders are faster.',
    },
    {
      id: 'federal',
      title: 'Confirm Service Canada and the CRA know',
      offsetDays: 21,
      durationDays: 3,
      dependsOn: ['register'],
      documents: ['Death certificate'],
      prepare: ["Deceased's SIN", 'Your own name and relationship', 'List of federal payments they received (CPP, OAS, CRA benefits)'],
      howTo:
        '1. For a death in B.C., Vital Statistics tells Service Canada and the CRA; a phone call confirms they have it.\n2. CPP and Old Age Security stop after the month of death; payments sent for later months are usually returned. Check with Service Canada.\n3. The CRA cancels or transfers benefit payments such as the Canada Child Benefit and the Canada Groceries and Essentials Benefit (CGEB).\n4. The executor can register as the legal representative with the CRA to deal with the tax file.',
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
        '1. If the deceased received the Canada Child Benefit for children now in your care, apply for it in your own name through CRA My Account or form RC66.\n2. A surviving spouse or partner reports the change in marital status to the CRA; family benefits are recalculated on the survivor\'s income.\n3. BC Family Benefit comes with the Canada Child Benefit, so no separate application.',
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
        '1. Banks freeze accounts in the deceased\'s sole name until the executor shows authority; joint accounts usually pass to the surviving owner.\n2. Life insurance and workplace benefits have their own claim forms; claims can start before probate.\n3. Contact BC Pension Corporation or the employer\'s plan about any survivor pension.\n4. Credit bureaus (Equifax, TransUnion) can mark the file as deceased to limit identity fraud.\n5. B.C. publishes an after-a-death checklist to track who has been told.',
    },
    {
      id: 'cancel-id',
      title: "Cancel passport, driver's licence and other ID",
      offsetDays: 60,
      durationDays: 14,
      dependsOn: ['certificates'],
      documents: ['Death certificate', 'Canadian passport', "Driver's licence"],
      prepare: ['The physical cards', 'Any firearms licence or permits'],
      howTo:
        '1. Health coverage (MSP) ends automatically for a death registered in B.C.\n2. Tell ICBC to cancel the driver\'s licence; a combined BC Services Card is cancelled with it.\n3. Return or report the Canadian passport to the Passport Program; IRCC also handles a PR card or citizenship record.\n4. The SIN record is updated by Service Canada once the death is reported.',
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
        '1. The death benefit is a one-time payment of up to $2,500 (up to $5,000 with the top-up in some cases, since January 2025). The executor applies within 60 days of the death; after that, whoever paid for the funeral, then the spouse or next of kin, can apply.\n2. The survivor\'s pension is a monthly payment for a legal spouse or common-law partner.\n3. The children\'s benefit is monthly for dependent children under 18, or 18 to 25 in full-time school.\n4. Apply online through My Service Canada Account or by mail; processing takes about 6 to 12 weeks.\n5. A surviving spouse aged 60 to 64 with low income may also qualify for the Old Age Security Allowance for the Survivor; check current rules.',
    },
    {
      id: 'home-transfer',
      title: 'Register the death on a jointly owned home',
      offsetDays: 75,
      durationDays: 30,
      conditions: ['Only if the deceased owned land or a home in joint tenancy with someone who survives them'],
      dependsOn: ['certificates'],
      documents: ['Death certificate', 'Property title'],
      prepare: ['Legal description or PID of the property', 'A lawyer or notary, if using one'],
      howTo:
        '1. Joint tenancy passes the property to the surviving owner outside the estate; it does not need probate.\n2. The survivor applies to the Land Title Office through the LTSA to remove the deceased\'s name, with a death certificate.\n3. Most people use a lawyer or notary, since filings are made electronically.\n4. A home held in the deceased\'s sole name, or as tenants in common, goes through the estate instead.',
    },
    {
      id: 'vehicle',
      title: 'Transfer or cancel the vehicle and insurance',
      offsetDays: 75,
      durationDays: 14,
      conditions: ['Only if the deceased owned a vehicle'],
      dependsOn: ['certificates'],
      documents: ['Death certificate', 'Vehicle registration', 'Will'],
      prepare: ['Who takes the vehicle', 'Autoplan broker details'],
      howTo:
        '1. Visit an Autoplan broker to transfer the vehicle to the survivor or beneficiary, or to cancel the insurance.\n2. The broker asks for the death certificate and proof of who is entitled to the vehicle, such as the will or a grant of probate.\n3. Check current ICBC rules on tax exemptions for transfers to family.',
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
      id: 'wills-search',
      title: 'Search the B.C. Wills Registry',
      offsetDays: 45,
      durationDays: 28,
      conditions: ['Only if the estate needs a grant of probate or administration'],
      dependsOn: ['certificates'],
      documents: ['Death certificate', 'Wills notice search'],
      prepare: ['Form VSA 532', 'Photocopy of the death certificate', 'Every name the deceased used', 'Check the current fee'],
      howTo:
        '1. The Vital Statistics Agency holds wills notices: where a will was kept and when it was signed, not the will itself.\n2. Apply by mail or in person at Service BC (not the Vancouver, Burnaby or Surrey offices); the fee is $20 plus $5 for each extra name. Check current.\n3. Standard orders take about 20 business days plus mail; courier is faster.\n4. The search result goes in with the probate application.',
    },
    {
      id: 'probate-notice',
      title: 'Send the probate notice to beneficiaries',
      offsetDays: 90,
      durationDays: 7,
      conditions: ['Only if the estate needs a grant of probate or administration'],
      dependsOn: ['find-will', 'wills-search'],
      documents: ['Will'],
      prepare: ['Names and addresses of everyone named in the will, and anyone who would inherit if there were no will'],
      howTo:
        '1. Banks and the Land Title Office usually ask for a grant when there is land, or larger accounts, in the deceased\'s sole name.\n2. The executor delivers a Notice of Proposed Application (Form P1) with a copy of the will to beneficiaries and intestate successors, and to others the probate rules list.\n3. The application cannot be filed until 21 days after the notice is delivered.',
    },
    {
      id: 'probate-apply',
      title: 'Apply to the Supreme Court for the grant',
      offsetDays: 180,
      durationDays: 60,
      conditions: ['Only if the estate needs a grant of probate or administration'],
      dependsOn: ['probate-notice'],
      documents: ['Will', 'Death certificate', 'Wills notice search', 'Grant of probate'],
      prepare: [
        'List of assets and debts at the date of death',
        'Affidavits, sworn before a lawyer, notary or commissioner',
        'Probate fee payment',
      ],
      howTo:
        '1. File the probate application forms with a B.C. Supreme Court registry, including the affidavit of assets and liabilities.\n2. Probate fees are paid at filing, based on the estate\'s B.C. assets: none up to $25,000, then $6 per $1,000 up to $50,000 and $14 per $1,000 above. Check the current fee schedule.\n3. The court issues the grant once the registry is satisfied; the 60 days here is an estimate and registries vary.',
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
        '1. The estate is a separate taxpayer from the day after death.\n2. The T3 return is due 90 days after the estate\'s tax year-end; the first year can end up to 1 year after the death.\n3. The date here is an estimate; set it from the year-end the executor chooses.',
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
        '1. A clearance certificate confirms that all taxes the deceased and the estate owe are paid.\n2. Send form TX19 once every return has been assessed.\n3. An executor who distributes without one can be personally liable for tax still owing.\n4. Processing takes several months; the 120 days is an estimate.',
    },
    {
      id: 'distribute',
      title: 'Distribute the estate and close it',
      offsetDays: 750,
      durationDays: 30,
      dependsOn: ['clearance'],
      documents: ['Will', 'Grant of probate'],
      prepare: ['Final accounts for the beneficiaries', 'Signed releases from beneficiaries'],
      howTo:
        '1. Under B.C. law, a spouse or child who feels left out can ask the court to vary a will within 180 days after the grant; executors usually wait at least 210 days after the grant before distributing, unless the beneficiaries consent or a court orders otherwise. Check current rules.\n2. The executor pays debts and taxes, gives beneficiaries an accounting, and hands out what remains.\n3. Close the estate bank account once everything is paid out.',
    },
  ],
};
