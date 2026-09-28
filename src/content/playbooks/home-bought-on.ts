import type { Playbook } from '../../domain/types';

export const homeBoughtOn: Playbook = {
  id: 'home-bought-on',
  title: 'Buying a home · Ontario',
  summary:
    'Paperwork plan for buying a home in Ontario, from mortgage pre-approval and the down payment to closing, land transfer tax, title registration, and the warranty, tax and declarations after.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'home-bought',
  anchorKind: 'home-bought',
  ages: { from: 18 },
  conditions: [
    'You are buying a home in Ontario to live in; the event date is the closing date',
    'You are a Canadian citizen or permanent resident, or fall under an exception to the federal ban on non-Canadians buying residential property in urban areas',
    'Foreign nationals pay Ontario\'s 25% Non-Resident Speculation Tax, and in Toronto a further 10% municipal tax',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Buying a home — CMHC',
      url: 'https://www.cmhc-schl.gc.ca/consumers/home-buying',
    },
    {
      title: 'Land transfer tax — Ontario.ca',
      url: 'https://www.ontario.ca/document/land-transfer-tax',
    },
    {
      title: 'Land transfer tax refunds for first-time homebuyers — Ontario.ca',
      url: 'https://www.ontario.ca/document/land-transfer-tax/land-transfer-tax-refunds-first-time-homebuyers',
    },
    {
      title: 'Non-Resident Speculation Tax — Ontario.ca',
      url: 'https://www.ontario.ca/document/non-resident-speculation-tax',
    },
    {
      title: 'Municipal Land Transfer Tax — City of Toronto',
      url: 'https://www.toronto.ca/services-payments/property-taxes-utilities/municipal-land-transfer-tax-mltt/',
    },
    {
      title: 'MLTT rebate opportunities — City of Toronto',
      url: 'https://www.toronto.ca/services-payments/property-taxes-utilities/municipal-land-transfer-tax-mltt/municipal-land-transfer-tax-mltt-rebate-opportunities/',
    },
    {
      title: 'Vacant Home Tax — City of Toronto',
      url: 'https://www.toronto.ca/services-payments/property-taxes-utilities/vacant-home-tax/',
    },
    {
      title: 'Homeowners — Tarion',
      url: 'https://www.tarion.com/homeowners',
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
      title: 'Request for Reconsideration — MPAC',
      url: 'https://www.mpac.ca/en/MakingChangesUpdates/DisagreeingYourAssessedValue/RfR',
    },
    {
      title: 'Province of Ontario benefit programs — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-ontario.html',
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
      title: 'Sign the agreement of purchase and sale',
      offsetDays: -75,
      durationDays: 7,
      dependsOn: ['pre-approval'],
      documents: ['Agreement of purchase and sale'],
      prepare: [
        'Conditions to include, such as financing, inspection and a condo status certificate',
        'Closing date',
        'Deposit amount',
      ],
      howTo:
        '1. Offers are usually written on the standard OREA agreement of purchase and sale through a registered realtor.\n2. Conditions protect the buyer until they are waived or fulfilled by the dates in the agreement.\n3. Resale homes have no cooling-off period once the agreement is firm.\n4. A new condo bought from a builder has a 10-day cooling-off period under the Condominium Act, counted from receiving the signed agreement or the disclosure statement, whichever is later.',
    },
    {
      id: 'status-certificate',
      title: 'Review the condo status certificate',
      offsetDays: -68,
      durationDays: 5,
      conditions: ['Only if the home is a resale condominium unit'],
      dependsOn: ['offer'],
      documents: ['Status certificate', 'Declaration, bylaws and rules', 'Budget and reserve fund study'],
      prepare: ['Ask the condo corporation or the seller for the certificate'],
      howTo:
        '1. The status certificate from the condo corporation shows common expenses, arrears, special assessments, the reserve fund and any lawsuits.\n2. The corporation has 10 days to deliver it, for a capped fee.\n3. A lawyer usually reviews it as a condition of the offer.',
    },
    {
      id: 'conditions',
      title: 'Waive conditions and pay the deposit',
      offsetDays: -61,
      durationDays: 10,
      dependsOn: ['offer'],
      documents: ['Home inspection report', 'Waiver or notice of fulfillment', 'Deposit receipt'],
      prepare: ['Book a home inspector', 'The lender\'s appraisal and final mortgage approval'],
      howTo:
        '1. Before each condition date, the buyer checks financing, inspection, the status certificate and any other conditions.\n2. Once conditions are waived in writing, the agreement is firm.\n3. The deposit is often due within 24 hours of acceptance; the agreement sets the timing. It is held in trust, usually by the listing brokerage.\n4. For new builds, deposits are paid on a schedule set by the builder.',
    },
    {
      id: 'lawyer',
      title: 'Hire a real estate lawyer and arrange title insurance',
      offsetDays: -45,
      durationDays: 7,
      dependsOn: ['conditions'],
      documents: ['Retainer letter', 'Title insurance policy'],
      prepare: ['The agreement of purchase and sale', 'Photo ID for each buyer', 'Lender contact'],
      howTo:
        '1. In Ontario a lawyer handles the closing: title search, requisitions, land transfer tax, the mortgage and registration.\n2. They order title insurance, which most lenders ask for, or confirm a survey.\n3. They also decide how co-owners hold title, as joint tenants or tenants in common; ask them what fits.',
    },
    {
      id: 'mortgage',
      title: 'Finalize the mortgage',
      offsetDays: -30,
      durationDays: 14,
      conditions: ['Only if you are borrowing to buy'],
      dependsOn: ['conditions'],
      documents: ['Mortgage commitment', 'Mortgage documents'],
      prepare: ['Anything the lender still needs, such as an updated pay stub', 'Proof of down payment for the last 90 days'],
      howTo:
        '1. The lender sends mortgage instructions to the lawyer.\n2. Mortgage documents are signed at the lawyer\'s office in the week before closing.\n3. Mortgage default insurance (CMHC or a private insurer) is added when less than 20% is put down.',
    },
    {
      id: 'withdraw',
      title: 'Withdraw from the FHSA and RRSP',
      offsetDays: -21,
      durationDays: 14,
      conditions: ['Only if part of the down payment comes from an FHSA or RRSP'],
      dependsOn: ['conditions', 'down-payment'],
      documents: ['Form RC725 (FHSA)', 'Form T1036 (HBP)'],
      prepare: ['The signed agreement of purchase and sale', 'Account details at each issuer'],
      howTo:
        '1. FHSA: fill in Form RC725 and give it to the FHSA issuer; the home is to be acquired before October 1 of the year after the withdrawal.\n2. HBP: fill in Form T1036 for each RRSP withdrawal; the home is to be bought or built before October 1 of the year after the withdrawal.\n3. Issuers can take several business days; allow for that before the money is due at the lawyer.\n4. The plan is to live in the home as your principal residence within one year of buying it.',
    },
    {
      id: 'insurance',
      title: 'Arrange home insurance from the closing date',
      offsetDays: -10,
      durationDays: 7,
      dependsOn: ['mortgage'],
      documents: ['Proof of home insurance'],
      prepare: ['Property details', 'Lender name and mortgage number', 'For condos: the corporation\'s insurance summary and deductibles'],
      howTo:
        '1. Lenders ask for proof of insurance before they release mortgage funds.\n2. For condos, the corporation insures the building; owners insure contents, improvements and their share of deductibles.\n3. Coverage starts on the closing date.',
    },
    {
      id: 'ltt',
      title: 'Pay land transfer tax and claim first-time buyer refunds',
      offsetDays: -3,
      durationDays: 7,
      dependsOn: ['lawyer'],
      documents: ['Land transfer tax affidavit', 'Statement of adjustments'],
      prepare: [
        'Citizenship or permanent residence status for each buyer',
        'Whether you or your spouse ever owned a home anywhere',
        'Check the current rates and refund limits',
      ],
      howTo:
        '1. Ontario land transfer tax is paid when the deed is registered, by graduated rates on the price.\n2. First-time buyers can get a refund of up to $4,000 at registration; the conditions include being 18 or older, never having owned a home anywhere, citizenship or permanent residence, and living in it within 9 months.\n3. In Toronto the Municipal Land Transfer Tax is added on top, with a first-time buyer rebate of up to $4,475; higher graduated rates apply to high-value homes from April 1, 2026.\n4. Foreign nationals add the 25% Non-Resident Speculation Tax across Ontario and, in Toronto, the 10% Municipal Non-Resident Speculation Tax.\n5. The lawyer usually claims the refunds on registration; a missed refund can be applied for within 18 months.',
    },
    {
      id: 'closing',
      title: 'Close and register the deed',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['ltt', 'insurance', 'withdraw', 'mortgage'],
      documents: ['Registered transfer (deed)', 'Statement of adjustments', 'Lawyer\'s reporting letter', 'Keys'],
      prepare: ['The balance of the down payment and closing costs, sent to the lawyer', 'Photo ID'],
      howTo:
        '1. On closing day the lawyer registers the transfer and mortgage electronically in the Ontario land registry and pays the seller.\n2. The statement of adjustments splits property tax, utilities and condo fees between buyer and seller by date.\n3. Keys are released once the funds and registration are done.\n4. Keep the reporting letter; it lists what was registered.',
    },
    {
      id: 'address',
      title: 'Change your address',
      offsetDays: 14,
      durationDays: 14,
      dependsOn: ['closing'],
      documents: [],
      prepare: ['New address and move date', 'Account numbers for utilities, bank and insurers'],
      howTo:
        '1. Update the CRA in My Account, ServiceOntario for the driver\'s licence, health card and vehicle.\n2. Set up hydro, gas, water and internet in your name from the closing date.\n3. Canada Post mail forwarding covers the gap.',
    },
    {
      id: 'tarion',
      title: 'Send the Tarion warranty forms',
      offsetDays: 25,
      durationDays: 5,
      conditions: ['Only if you bought a newly built home from a builder'],
      dependsOn: ['closing'],
      documents: ['Certificate of Completion and Possession', 'Tarion 30-Day Form'],
      prepare: ['A list of defects found since moving in', 'MyHome account on the Tarion website'],
      howTo:
        '1. New homes in Ontario carry a statutory warranty backed by Tarion: 1 year for workmanship and materials, 2 years for items such as water leaks and electrical, 7 years for major structural defects.\n2. The 30-Day Form is sent within the first 30 days of possession; a Year-End Form can be sent in the last 30 days of the first year.\n3. Submit through MyHome, and keep copies.',
    },
    {
      id: 'new-home-rebates',
      title: 'Apply for HST new housing rebates',
      offsetDays: 30,
      durationDays: 30,
      conditions: ['Only if you bought a newly built or substantially renovated home'],
      dependsOn: ['closing'],
      documents: ['Agreement of purchase and sale', 'Statement of adjustments', 'HST rebate application'],
      prepare: ['Check whether the builder already credited the rebates on the statement of adjustments'],
      howTo:
        '1. The federal and Ontario HST new housing rebates return part of the HST on a new home used as a principal residence; builders usually credit them at closing and claim them from the CRA.\n2. The federal first-time home buyers\' GST rebate, for agreements from May 27, 2025, can refund up to $50,000 on new homes up to $1 million, phasing out to $1.5 million; Ontario has announced matching relief on its portion. Check the current rules on canada.ca and ontario.ca.\n3. Apply through the builder or directly to the CRA; deadlines run from closing, typically 2 years.',
    },
    {
      id: 'property-tax',
      title: 'Set up property tax payments',
      offsetDays: 45,
      durationDays: 30,
      dependsOn: ['closing'],
      documents: ['Property tax bill', 'MPAC property assessment notice'],
      prepare: ['Roll number', 'Whether the lender collects property tax with the mortgage'],
      howTo:
        '1. The municipality bills property tax from the value set by MPAC; an interim bill early in the year and a final bill later are common.\n2. Tell the municipality of the new owner if the lawyer has not; the first bill may still be in the seller\'s name.\n3. Pre-authorized payment plans are offered by most municipalities.\n4. The Ontario Energy and Property Tax Credit is claimed on the income tax return for low- and moderate-income owners.',
    },
    {
      id: 'vacant-home',
      title: 'Declare occupancy for Toronto\'s Vacant Home Tax, every year',
      offsetDays: 120,
      durationDays: 30,
      conditions: ['Only if the home is in the City of Toronto'],
      dependsOn: ['closing'],
      documents: ['Property tax bill'],
      prepare: ['Assessment roll number and customer number from the bill', 'Who lived in the home in the past year'],
      howTo:
        '1. Every residential owner in Toronto declares the property\'s occupancy status each year, even when living in it.\n2. A missing declaration makes the home deemed vacant and taxed at 3% of its assessed value; false declarations can also bring a fine.\n3. The declaration window opens early in the year; check the current deadline on toronto.ca.\n4. The date here is an estimate; move it to the next declaration window.',
    },
    {
      id: 'tax-return',
      title: 'Claim the home buyers\' amount and report withdrawals on your tax return',
      offsetDays: 200,
      durationDays: 30,
      dependsOn: ['closing'],
      documents: ['T4FHSA and T4RSP slips', 'Statement of adjustments'],
      prepare: ['Purchase date and address', 'Lawyer\'s invoice'],
      howTo:
        '1. The first-time home buyers\' amount (line 31270) is up to $10,000, a federal credit of up to $1,500; it is for buyers who did not live in a home they or a spouse owned in the year or the 4 years before.\n2. FHSA and HBP withdrawals are reported on the return for the year they happened.\n3. The principal residence exemption is designated when the home is later sold, on the return for that year.\n4. File for the year of the purchase by April 30 of the next year.',
    },
    {
      id: 'assessment',
      title: 'Check the MPAC assessment notice and ask for reconsideration if it looks wrong',
      offsetDays: 250,
      durationDays: 21,
      dependsOn: ['closing'],
      documents: ['MPAC property assessment notice'],
      prepare: ['Recent sales of similar homes nearby', 'Anything wrong in the property details on AboutMyProperty'],
      howTo:
        '1. MPAC sends a property assessment notice when values are updated or the property changes, such as a new owner.\n2. A Request for Reconsideration is free and is filed by the deadline printed on the notice, often 120 days from the notice date; check the notice.\n3. After MPAC\'s answer, an appeal can go to the Assessment Review Board.\n4. The date here is an estimate; move it to when a notice arrives.',
    },
    {
      id: 'on-ben',
      title: 'Claim the property tax part of the Ontario Trillium Benefit',
      offsetDays: 365,
      durationDays: 30,
      conditions: ['Only if your income is low or moderate'],
      dependsOn: ['property-tax'],
      documents: ['Form ON-BEN', 'Property tax bills for the year'],
      prepare: ['Property tax paid on the principal residence for the year', 'Social Insurance Number'],
      howTo:
        '1. The Ontario Energy and Property Tax Credit counts property tax paid on a principal residence in Ontario.\n2. It is applied for on Form ON-BEN with the income tax return; the CRA pays it as part of the Ontario Trillium Benefit, usually monthly from July.\n3. Owners 65 or older may also get the Ontario Senior Homeowners\' Property Tax Grant on the same form.\n4. This repeats every year with the return; move the date to April 30.',
    },
    {
      id: 'insurance-renewal',
      title: 'Review and renew home insurance, every year',
      offsetDays: 365,
      durationDays: 14,
      dependsOn: ['insurance'],
      documents: ['Home insurance renewal notice'],
      prepare: ['Changes to the home, renovations or valuables', 'Quotes from other insurers', 'For condos: the condo corporation\'s deductible'],
      howTo:
        '1. Policies usually renew yearly; the insurer sends the renewal terms before the end date.\n2. Check the coverage amount, deductibles, and whether sewer backup or overland water cover is included.\n3. The lender asks for proof of insurance to continue.\n4. This repeats every year.',
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
