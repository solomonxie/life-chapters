import type { Playbook } from '../../domain/types';

export const homeSoldOn: Playbook = {
  id: 'home-sold-on',
  title: 'Selling a home · Ontario',
  summary:
    'Paperwork plan for selling a home in Ontario, from listing and the mortgage payout to closing, non-resident clearance, the last vacant home declaration and the principal residence designation on the tax return.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'home-sold',
  anchorKind: 'home-sold',
  ages: { from: 18 },
  conditions: [
    'You are selling a home in Ontario; the event date is the closing date',
    'Some steps apply only if the home was owned for a short time, was not your principal residence, or you are not a resident of Canada',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Principal residence and other real estate — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/personal-income/line-12700-capital-gains/principal-residence-other-real-estate.html',
    },
    {
      title: 'Form T2091(IND), Designation of a Property as a Principal Residence — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t2091ind.html',
    },
    {
      title: 'Residential property flipping rule — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/federal-government-budgets/residential-property-flipping-rule.html',
    },
    {
      title: 'Disposing of or acquiring certain Canadian property — Canada.ca',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/information-been-moved/disposing-acquiring-certain-canadian-property.html',
    },
    {
      title: 'Breaking your mortgage contract — Financial Consumer Agency of Canada',
      url: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/break-mortgage-contract.html',
    },
    {
      title: 'Mortgage fees: prepayment penalties — Financial Consumer Agency of Canada',
      url: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/reduce-prepayment-penalties.html',
    },
    {
      title: 'Vacant Home Tax — City of Toronto',
      url: 'https://www.toronto.ca/services-payments/property-taxes-utilities/vacant-home-tax/',
    },
    {
      title: 'Change your address on your driver\'s licence, vehicle permit and health card — Ontario.ca',
      url: 'https://www.ontario.ca/page/change-address-drivers-licence-vehicle-permit-and-health-card',
    },
  ],
  steps: [
    {
      id: 'list',
      title: 'List the home and prepare the seller\'s documents',
      offsetDays: -120,
      durationDays: 21,
      dependsOn: [],
      documents: ['Listing agreement', 'Recent property tax bill and MPAC assessment'],
      prepare: [
        'Purchase date and price, and records of improvements',
        'Utility bills',
        'For condos: ask the condo corporation about a status certificate for buyers',
      ],
      howTo:
        '1. Most sellers list with a brokerage registered with the Real Estate Council of Ontario (RECO); the listing agreement sets commission and term. Commission is subject to HST.\n2. Condo buyers usually make the offer conditional on the status certificate; the corporation has 10 days to deliver it, for a capped fee.\n3. Keep the original purchase papers and improvement receipts; they set the cost base if tax applies.',
    },
    {
      id: 'mortgage-payout',
      title: 'Ask the lender for the payout amount and any prepayment penalty',
      offsetDays: -75,
      durationDays: 14,
      conditions: ['Only if there is a mortgage or line of credit secured on the home'],
      dependsOn: [],
      documents: ['Mortgage payout statement'],
      prepare: ['Mortgage number', 'Expected closing date', 'Whether you will port the mortgage to a new home'],
      howTo:
        '1. Paying off a mortgage before the term ends can trigger a prepayment penalty: often 3 months\' interest on a variable rate, or the greater of that and an interest rate differential on a fixed rate. The contract sets the method.\n2. Porting the mortgage to a new home, or having the buyer assume it, can avoid the penalty where the lender allows it.\n3. Lenders also charge a discharge fee.\n4. The payout statement is ordered for the closing date; the lawyer usually requests it.',
    },
    {
      id: 'accept-offer',
      title: 'Accept an offer and follow the condition dates',
      offsetDays: -60,
      durationDays: 14,
      dependsOn: ['list'],
      documents: ['Agreement of purchase and sale', 'Waiver or notice of fulfillment of conditions'],
      prepare: ['Closing date', 'Deposit amount', 'Chattels and fixtures included'],
      howTo:
        '1. The agreement of purchase and sale sets the price, conditions and closing date.\n2. Resale homes in Ontario have no general cooling-off period; the agreement is firm once the buyer waives or fulfils the conditions in writing.\n3. The deposit is held in trust, usually by the listing brokerage.\n4. Keep a signed copy; the lawyer, lender and tax filings all use it.',
    },
    {
      id: 'lawyer',
      title: 'Hire a real estate lawyer for the sale',
      offsetDays: -45,
      durationDays: 7,
      dependsOn: ['accept-offer'],
      documents: ['Retainer letter', 'Transfer documents'],
      prepare: ['The signed agreement', 'Photo ID for each owner on title', 'Mortgage details', 'Keys and access codes'],
      howTo:
        '1. In Ontario a lawyer answers the buyer\'s requisitions, prepares the seller\'s statement of adjustments, and pays out the mortgage from the sale money.\n2. Sellers sign closing documents, including a declaration of residency and possession, in the days before closing.\n3. The transfer and mortgage discharge are registered electronically in the land registry system.',
    },
    {
      id: 'completion',
      title: 'Close the sale',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['lawyer'],
      documents: ['Seller\'s statement of adjustments', 'Lawyer\'s reporting letter', 'Proof of mortgage discharge'],
      prepare: ['All keys, fobs and remotes for the buyer', 'Final meter readings'],
      howTo:
        '1. On closing day the lawyers exchange documents and money, and the transfer is registered.\n2. The statement of adjustments splits property tax and condo fees between seller and buyer by date.\n3. Keys are released to the buyer\'s lawyer or agent once the deal closes.\n4. Keep the reporting letter and statement; they record the sale price and date for tax.',
    },
    {
      id: 'non-resident',
      title: 'Notify the CRA and ask for a clearance certificate',
      offsetDays: 10,
      durationDays: 10,
      conditions: ['Only if you are not a resident of Canada for tax purposes'],
      dependsOn: ['completion'],
      documents: ['Form T2062', 'Certificate of compliance (T2068)'],
      prepare: ['The agreement and statement of adjustments', 'Original purchase price and improvements'],
      howTo:
        '1. A non-resident seller notifies the CRA on Form T2062 within 10 days after the sale; the CRA then issues a certificate of compliance once tax is paid or secured.\n2. Until the certificate arrives, the buyer\'s lawyer usually holds back 25% of the price (50% on certain property).\n3. Late notice carries a penalty of $25 a day, minimum $100, maximum $2,500.\n4. It is usually started before closing so the holdback is released sooner.',
    },
    {
      id: 'close-accounts',
      title: 'Cancel insurance and utilities and change your address',
      offsetDays: 14,
      durationDays: 14,
      dependsOn: ['completion'],
      documents: [],
      prepare: ['Closing date', 'New address', 'Account numbers for hydro, gas, water, internet and insurer'],
      howTo:
        '1. Home insurance is cancelled from the day after closing, not before.\n2. Hydro, gas and water accounts close on the closing date with final readings; rental water heaters are transferred to the buyer.\n3. Update the CRA in My Account, and ServiceOntario for the driver\'s licence, vehicle permit and health card within 6 days of moving.\n4. Canada Post mail forwarding covers the gap.',
    },
    {
      id: 'vacant-home',
      title: 'Make the last Vacant Home Tax declaration',
      offsetDays: 120,
      durationDays: 30,
      conditions: ['Only if the home was in Toronto or another city with a vacant home tax'],
      dependsOn: ['completion'],
      documents: ['Declaration confirmation'],
      prepare: ['Assessment roll number', 'Who lived in the home during the year'],
      howTo:
        '1. Toronto owners declare each property\'s occupancy status every year; a missing declaration can make the home deemed vacant and taxed.\n2. A declaration can still be due for a year you owned the home, even after selling; check the city\'s page for who declares after a sale.\n3. Ottawa and some other cities run similar taxes; check current rules.\n4. The date here is an estimate; move it to the next declaration window.',
    },
    {
      id: 'tax-return',
      title: 'Report the sale and designate the principal residence on your tax return',
      offsetDays: 200,
      durationDays: 30,
      dependsOn: ['completion'],
      documents: ['Schedule 3', 'Form T2091(IND)', 'Statement of adjustments for the purchase and the sale'],
      prepare: ['Years you owned and lived in the home', 'Purchase price, sale price and selling costs', 'Any other property you own that could also be designated'],
      howTo:
        '1. The sale of a principal residence is reported on Schedule 3, and the designation on Form T2091(IND), on the return for the year of the sale.\n2. A late designation may be accepted, but a penalty can apply.\n3. Under the federal flipping rule, a home held less than 365 days is taxed as business income with no principal residence exemption, unless a life event such as death, separation, a new job or illness applies. Ontario has no separate provincial flipping tax at review.\n4. Years it was not your principal residence, such as a rental or second home, can leave a taxable capital gain.\n5. Property tax paid for the part of the year you owned it can count toward the Ontario Energy and Property Tax Credit through ON-BEN.\n6. File by April 30 of the year after the sale (June 15 if self-employed, with any balance still due April 30).',
    },
  ],
};
