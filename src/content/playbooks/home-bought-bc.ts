import type { Playbook } from '../../domain/types';

export const homeBoughtBc: Playbook = {
  id: 'home-bought-bc',
  title: 'Buying a home · British Columbia',
  summary:
    'Paperwork plan for buying a home in British Columbia, from mortgage pre-approval and the down payment to completion, property transfer tax, title registration, and the yearly grants and declarations after.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'home-bought',
  anchorKind: 'home-bought',
  ages: { from: 19 },
  conditions: [
    'You are buying a home in British Columbia to live in; the event date is the completion date',
    'You are a Canadian citizen or permanent resident, or fall under an exception to the federal ban on non-Canadians buying residential property in urban areas',
    'Foreign nationals buying in Metro Vancouver, the Fraser Valley, the Capital Region, Central Okanagan or Nanaimo also pay the 20% additional property transfer tax',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Buying a home — CMHC',
      url: 'https://www.cmhc-schl.gc.ca/consumers/home-buying',
    },
    {
      title: 'Home buyer rescission period — BC Financial Services Authority',
      url: 'https://www.bcfsa.ca/public-resources/real-estate/home-buyer-rescission-period',
    },
    {
      title: 'Property transfer tax — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax',
    },
    {
      title: "First time home buyers' program — Province of British Columbia",
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/exemptions/first-time-home-buyers',
    },
    {
      title: 'Newly built home exemption — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/exemptions/newly-built-home-exemption',
    },
    {
      title: 'Additional property transfer tax — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/additional-property-transfer-tax',
    },
    {
      title: 'Home owner grant — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/annual-property-tax/home-owner-grant',
    },
    {
      title: 'Apply for the home owner grant — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/property-taxes/annual-property-tax/home-owner-grant/apply',
    },
    {
      title: 'Speculation and vacancy tax — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/speculation-vacancy-tax',
    },
    {
      title: 'Empty Homes Tax — City of Vancouver',
      url: 'https://vancouver.ca/home-property-development/empty-homes-tax.aspx',
    },
    {
      title: 'Land Title and Survey Authority of British Columbia',
      url: 'https://ltsa.ca/',
    },
    {
      title: 'Withdrawals and transfers out of your FHSAs — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account/withdrawals-transfers-out-your-fhsas.html',
    },
    {
      title: "What is the Home Buyers' Plan — Canada.ca",
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html',
    },
    {
      title: "How to participate in the Home Buyers' Plan — Canada.ca",
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan/participate-home-buyers-plan.html',
    },
    {
      title: "Line 31270 – Home buyers' amount — Canada.ca",
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-31270-home-buyers-amount.html',
    },
    {
      title: 'Prohibition on the Purchase of Residential Property by Non-Canadians Regulations (SOR/2022-250) — Justice Laws',
      url: 'https://laws-lois.justice.gc.ca/eng/regulations/SOR-2022-250/FullText.html',
    },
    {
      title: 'Renewing your mortgage — Financial Consumer Agency of Canada',
      url: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/renew-mortgage.html',
    },
    {
      title: 'Appeals — BC Assessment',
      url: 'https://info.bcassessment.ca/Services-products/appeals',
    },
  ],
  steps: [
    {
      id: 'pre-approval',
      title: 'Get a mortgage pre-approval',
      offsetDays: -120,
      durationDays: 21,
      validForDays: 120,
      conditions: ['Only if you are borrowing to buy'],
      dependsOn: [],
      documents: ['Mortgage pre-approval letter'],
      prepare: [
        'Photo ID',
        'Recent pay stubs and an employment letter',
        'Notices of assessment for the last 2 years',
        'Bank and investment statements showing the down payment',
      ],
      howTo:
        '1. A lender or mortgage broker checks income, debts and credit and states how much it may lend and at what rate.\n2. Pre-approval is not a final approval; the lender still reviews the specific property once an offer is accepted.\n3. The rate hold usually lasts 90 to 120 days; check the letter.\n4. Federal rules set a minimum down payment by price, and mortgage insurance with less than 20% down; the stress test applies to most mortgages.',
    },
    {
      id: 'down-payment',
      title: 'Plan the down payment from savings, FHSA and RRSP',
      offsetDays: -110,
      durationDays: 14,
      conditions: ['Only if part of the down payment comes from an FHSA or RRSP'],
      dependsOn: [],
      documents: ['FHSA and RRSP statements'],
      prepare: [
        'Balances in each account',
        'Check the current Home Buyers\' Plan limit ($60,000 at review)',
        'Recent RRSP contributions, with dates',
      ],
      howTo:
        '1. A First Home Savings Account (FHSA) allows a tax-free qualifying withdrawal for a first home; it can be combined with the Home Buyers\' Plan (HBP) for the same home.\n2. The HBP lets each first-time buyer withdraw from their RRSPs without tax, then repay it over 15 years.\n3. RRSP contributions made within 90 days before an HBP withdrawal may not be deductible.\n4. Both need a written agreement to buy or build before the money comes out; the withdrawal itself is a later step.\n5. Not financial advice; the date here is only a prompt.',
    },
    {
      id: 'offer',
      title: 'Make an offer and sign the contract of purchase and sale',
      offsetDays: -75,
      durationDays: 7,
      dependsOn: ['pre-approval'],
      documents: ['Contract of purchase and sale'],
      prepare: [
        'Subjects to include, such as financing, inspection and strata documents',
        'Completion, possession and adjustment dates',
        'Deposit amount',
      ],
      howTo:
        '1. The offer is usually written on the standard contract of purchase and sale through a licensed realtor.\n2. Subjects (conditions) protect the buyer until they are removed; the contract lists a date for each.\n3. The completion date is when money and title change hands; possession is often a day later.\n4. Keep a signed copy; the lender, lawyer or notary and FHSA and RRSP issuers all ask for it.',
    },
    {
      id: 'rescission',
      title: 'Know the 3-business-day rescission period',
      offsetDays: -72,
      durationDays: 1,
      dependsOn: ['offer'],
      documents: [],
      prepare: ['The date and time the offer was accepted', 'The purchase price, to work out the fee'],
      howTo:
        '1. Since January 3, 2023, buyers of most residential property in B.C. can cancel an accepted contract within 3 business days, without giving a reason.\n2. Cancelling costs a fee of 0.25% of the purchase price, paid to the seller.\n3. Notice is given in writing to the seller within the period; the right cannot be waived.\n4. Some sales are excluded, such as property on leasehold land, sales by auction and sales under a court order; check the BCFSA page for the current list.',
    },
    {
      id: 'strata-docs',
      title: 'Review the strata documents',
      offsetDays: -68,
      durationDays: 5,
      conditions: ['Only if the home is a strata unit (condo or townhouse)'],
      dependsOn: ['offer'],
      documents: ['Information certificate (Form B)', 'Strata bylaws and rules', 'Minutes from the last 2 years', 'Depreciation report', 'Financial statements and budget'],
      prepare: ['Ask the seller or the strata manager for the documents'],
      howTo:
        '1. The information certificate (Form B) from the strata corporation shows strata fees, special levies, the contingency reserve fund, bylaw issues and any lawsuits.\n2. Minutes and the depreciation report show upcoming repairs and how they may be paid for.\n3. Rental and pet bylaws are in the bylaws; check them against your plans.\n4. The strata corporation can charge a capped fee for Form B.',
    },
    {
      id: 'subjects',
      title: 'Remove subjects and pay the deposit',
      offsetDays: -61,
      durationDays: 10,
      dependsOn: ['offer'],
      documents: ['Home inspection report', 'Subject removal form', 'Deposit receipt'],
      prepare: ['Book a licensed home inspector', 'The lender\'s appraisal and final mortgage approval'],
      howTo:
        '1. Before the subject removal date, the buyer checks each subject: financing approval, inspection, strata documents, insurance and any others.\n2. Home inspectors are licensed by Consumer Protection BC.\n3. Once subjects are removed in writing, the contract is firm.\n4. The deposit is often due within 24 hours of subject removal; the contract sets the timing.\n5. It is held in trust, usually by the seller\'s brokerage, and counts toward the down payment.',
    },
    {
      id: 'conveyancer',
      title: 'Hire a lawyer or notary, and arrange title insurance',
      offsetDays: -45,
      durationDays: 7,
      dependsOn: ['subjects'],
      documents: ['Retainer letter', 'Title insurance policy'],
      prepare: ['The contract of purchase and sale', 'Photo ID for each buyer', 'Lender contact'],
      howTo:
        '1. In B.C. a lawyer or notary public handles the conveyance: the title search, the property transfer tax return, the mortgage documents and the transfer.\n2. They order title insurance, which most lenders ask for, or confirm a survey.\n3. For strata units they also get a Form F certificate of payment from the strata corporation.\n4. Book early; they are busy near month-end.',
    },
    {
      id: 'mortgage',
      title: 'Finalize the mortgage',
      offsetDays: -30,
      durationDays: 14,
      conditions: ['Only if you are borrowing to buy'],
      dependsOn: ['subjects'],
      documents: ['Mortgage commitment', 'Mortgage documents'],
      prepare: ['Anything the lender still needs, such as an updated pay stub', 'Proof of down payment for the last 90 days'],
      howTo:
        '1. The lender sends mortgage instructions to the lawyer or notary.\n2. Mortgages are signed at the lawyer\'s or notary\'s office, usually in the week before completion.\n3. Mortgage default insurance (CMHC or a private insurer) is added when less than 20% is put down.',
    },
    {
      id: 'withdraw',
      title: 'Withdraw from the FHSA and RRSP',
      offsetDays: -21,
      durationDays: 14,
      conditions: ['Only if part of the down payment comes from an FHSA or RRSP'],
      dependsOn: ['subjects', 'down-payment'],
      documents: ['Form RC725 (FHSA)', 'Form T1036 (HBP)'],
      prepare: ['The signed contract of purchase and sale', 'Account details at each issuer'],
      howTo:
        '1. FHSA: fill in Form RC725 and give it to the FHSA issuer; the home is to be acquired before October 1 of the year after the withdrawal.\n2. HBP: fill in Form T1036 for each RRSP withdrawal; the home is to be bought or built before October 1 of the year after the withdrawal.\n3. Issuers can take several business days; allow for that before the money is due at the lawyer or notary.\n4. The plan is to live in the home as your principal residence within one year of buying it.',
    },
    {
      id: 'insurance',
      title: 'Arrange home insurance from the completion date',
      offsetDays: -10,
      durationDays: 7,
      dependsOn: ['mortgage'],
      documents: ['Proof of home insurance'],
      prepare: ['Property details', 'Lender name and mortgage number', 'For strata: the strata corporation\'s insurance summary and deductibles'],
      howTo:
        '1. Lenders ask for proof of insurance before they release mortgage funds.\n2. For strata units, the strata corporation insures the building; owners insure contents, improvements and the strata deductible.\n3. Coverage starts on the completion date.',
    },
    {
      id: 'ptt',
      title: 'File the property transfer tax return and claim exemptions',
      offsetDays: -3,
      durationDays: 7,
      dependsOn: ['conveyancer'],
      documents: ['Property transfer tax return'],
      prepare: [
        'Citizenship or permanent residence status for each buyer',
        'Proof of living in B.C. for a year, or 2 B.C. tax returns in the last 6 years',
        'Check the current exemption thresholds',
      ],
      howTo:
        '1. Property transfer tax is paid when title is registered. General rates: 1% on the first $200,000, 2% up to $2 million, 3% above, and a further 2% on residential property over $3 million.\n2. First time home buyers\' program: at review, a full exemption on the first $500,000 for homes worth up to $835,000, partial up to $860,000.\n3. Newly built home exemption: at review, a full exemption up to $1,100,000, partial up to $1,150,000.\n4. Both exemptions need citizenship or permanent residence, use as the principal residence, and moving in within 92 days and staying through the first year.\n5. Foreign nationals in the five listed regional districts add the 20% additional property transfer tax.\n6. The lawyer or notary files the return; a missed exemption can be claimed as a refund between the first anniversary and 18 months after registration.',
    },
    {
      id: 'completion',
      title: 'Complete the purchase and register title',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['ptt', 'insurance', 'withdraw', 'mortgage'],
      documents: ['State of title certificate', 'Statement of adjustments', 'Keys'],
      prepare: ['The balance of the down payment and closing costs, sent to the lawyer or notary', 'Photo ID'],
      howTo:
        '1. On completion day the lawyer or notary files the transfer and mortgage with the Land Title and Survey Authority (LTSA) and pays the seller.\n2. The statement of adjustments splits property tax and strata fees between buyer and seller by date.\n3. Keys are usually handed over on the possession date in the contract.\n4. Keep the reporting letter from the lawyer or notary; it lists what was registered.',
    },
    {
      id: 'address',
      title: 'Change your address',
      offsetDays: 14,
      durationDays: 14,
      dependsOn: ['completion'],
      documents: [],
      prepare: ['New address and move date', 'Account numbers for utilities, bank and insurers'],
      howTo:
        '1. Update the CRA in My Account, ICBC for the driver\'s licence and vehicle, and Health Insurance BC for MSP and the BC Services Card.\n2. Set up BC Hydro, FortisBC gas or other utilities, and city water and garbage where billed separately.\n3. Canada Post mail forwarding covers the gap.',
    },
    {
      id: 'new-home-rebates',
      title: 'Apply for GST new housing rebates',
      offsetDays: 30,
      durationDays: 30,
      conditions: ['Only if you bought a newly built or substantially renovated home'],
      dependsOn: ['completion'],
      documents: ['Agreement of purchase and sale', 'Statement of adjustments', 'GST rebate application'],
      prepare: ['Check whether the builder already credited the rebate on the statement of adjustments'],
      howTo:
        '1. The GST/HST new housing rebate returns part of the GST on new homes below a price limit; builders often credit it at closing and claim it themselves.\n2. The federal first-time home buyers\' GST rebate, for agreements from May 27, 2025, can refund up to $50,000 on new homes up to $1 million, phasing out to $1.5 million; check the current rules and dates on canada.ca.\n3. Apply through the builder or directly to the CRA; deadlines run from the completion date, typically 2 years.',
    },
    {
      id: 'home-owner-grant',
      title: 'Claim the home owner grant, every year',
      offsetDays: 60,
      durationDays: 30,
      conditions: ['Only if the home is your principal residence'],
      dependsOn: ['completion'],
      documents: ['Property tax notice'],
      prepare: ['Jurisdiction and roll number from the notice', 'Social Insurance Number', 'Check the current assessed value threshold'],
      howTo:
        '1. The home owner grant lowers the property tax on a principal residence; it is claimed every year, not renewed automatically.\n2. Property tax notices arrive in late spring; the grant is claimed online through the province, by phone or at Service BC, before the tax due date and no later than December 31.\n3. Above the assessed value threshold ($2,075,000 for 2026) the grant shrinks and then stops; seniors and some others get a higher grant.\n4. The date here is an estimate; move it to your first property tax notice.',
    },
    {
      id: 'empty-homes',
      title: 'Declare occupancy for Vancouver\'s Empty Homes Tax, every year',
      offsetDays: 120,
      durationDays: 30,
      conditions: ['Only if the home is in the City of Vancouver'],
      dependsOn: ['completion'],
      documents: ['Property tax notice'],
      prepare: ['Folio number and access code from the notice', 'Who lived in the home in the past year'],
      howTo:
        '1. Every residential owner in the City of Vancouver declares the property\'s status each year, even when living in it.\n2. The deadline is early in the year, usually early February; a late or missing declaration can make the home deemed empty and taxed.\n3. Check the current rate and dates on vancouver.ca.\n4. The date here is an estimate; move it to the next declaration window.',
    },
    {
      id: 'svt',
      title: 'Declare for the speculation and vacancy tax, every year',
      offsetDays: 150,
      durationDays: 30,
      conditions: ['Only if the home is in a speculation and vacancy tax area'],
      dependsOn: ['completion'],
      documents: ['Declaration letter'],
      prepare: ['Letter ID and declaration code from the letter', 'Social Insurance Number for each owner'],
      howTo:
        '1. Owners in the taxed areas of B.C. get a declaration letter each year and declare online or by phone by March 31, even with no change.\n2. Most owners living in their home as a principal residence are exempt, but only after declaring.\n3. Each owner on title declares separately.\n4. The date here is an estimate; move it to when the letter arrives.',
    },
    {
      id: 'property-tax',
      title: 'Pay the property tax by the city\'s due date, every year',
      offsetDays: 150,
      durationDays: 30,
      dependsOn: ['completion'],
      documents: ['Property tax notice'],
      prepare: ['Folio or roll number', 'Whether the lender collects property tax with the mortgage', 'Claim the home owner grant before paying'],
      howTo:
        '1. Each municipality sets its own due date; many B.C. cities set it in early July.\n2. A late payment adds a penalty set by the city; check the notice.\n3. Most cities offer monthly pre-authorized payments, and some owners can defer the tax through the province\'s property tax deferment program.\n4. This repeats every year; the date here is an estimate, so move it to the due date on the notice.',
    },
    {
      id: 'tax-return',
      title: 'Claim the home buyers\' amount and report withdrawals on your tax return',
      offsetDays: 200,
      durationDays: 30,
      dependsOn: ['completion'],
      documents: ['T4FHSA and T4RSP slips', 'Statement of adjustments'],
      prepare: ['Purchase date and address', 'Receipts for the lawyer or notary'],
      howTo:
        '1. The first-time home buyers\' amount (line 31270) is up to $10,000, a federal credit of up to $1,500; it is for buyers who did not live in a home they or a spouse owned in the year or the 4 years before.\n2. FHSA and HBP withdrawals are reported on the return for the year they happened.\n3. The principal residence exemption is designated when the home is later sold, on the return for that year.\n4. File for the year of the purchase by April 30 of the next year.',
    },
    {
      id: 'assessment',
      title: 'Check the assessment notice and appeal by January 31 if it looks wrong',
      offsetDays: 250,
      durationDays: 21,
      dependsOn: ['completion'],
      documents: ['BC Assessment notice'],
      prepare: ['Recent sales of similar homes nearby', 'Anything wrong in the property details'],
      howTo:
        '1. BC Assessment mails notices early in January, valuing the home as of July 1 the year before.\n2. Talk to BC Assessment first; a formal complaint to the Property Assessment Review Panel is filed by January 31 (moved to the next business day when it falls on a weekend).\n3. The assessed value sets the property tax share and the home owner grant threshold.\n4. This repeats every year; the date here is an estimate, so move it to when the notice arrives.',
    },
    {
      id: 'insurance-renewal',
      title: 'Review and renew home insurance, every year',
      offsetDays: 365,
      durationDays: 14,
      dependsOn: ['insurance'],
      documents: ['Home insurance renewal notice'],
      prepare: ['Changes to the home, renovations or valuables', 'Quotes from other insurers', 'For strata: the current strata deductible'],
      howTo:
        '1. Policies usually renew yearly; the insurer sends the renewal terms before the end date.\n2. Check the coverage amount, deductibles, and whether earthquake or water damage cover is included.\n3. The lender asks for proof of insurance to continue.\n4. This repeats every year.',
    },
    {
      id: 'hbp-repay',
      title: 'Start repaying the Home Buyers\' Plan',
      offsetDays: 730,
      durationDays: 30,
      conditions: ['Only if you withdrew from an RRSP under the Home Buyers\' Plan'],
      dependsOn: ['withdraw'],
      documents: ['Notice of assessment showing the HBP balance'],
      prepare: ['The amount due this year from My Account'],
      howTo:
        '1. Repayments usually start in the second year after the year of the withdrawal, and run over 15 years.\n2. Temporary relief has pushed the start to the fifth year for first withdrawals in certain years; check the current rule on canada.ca.\n3. A repayment is an RRSP contribution designated as an HBP repayment on Schedule 7; any amount not repaid is added to income for that year.\n4. The date here is an estimate; the notice of assessment shows the real schedule.',
    },
    {
      id: 'mortgage-renewal',
      title: 'Renew or switch the mortgage before the term ends',
      offsetDays: 1825,
      durationDays: 30,
      conditions: ['Only if you are borrowing to buy'],
      dependsOn: ['mortgage'],
      documents: ['Mortgage renewal statement'],
      prepare: ['The term end date on the mortgage', 'Quotes from other lenders or a broker', 'Current income documents, if switching'],
      howTo:
        '1. Move this date to about a month before the real term end; a 5-year term is assumed here.\n2. A federally regulated lender sends a renewal statement at least 21 days before the term ends; other lenders follow provincial rules.\n3. Since November 2024 a straight switch of the same balance and amortization to another lender at renewal generally skips the stress test; check current rules. Switching can bring legal, appraisal or discharge fees.\n4. Left alone, some lenders renew automatically into a term and rate they choose, so compare before the date.',
    },
  ],
};
