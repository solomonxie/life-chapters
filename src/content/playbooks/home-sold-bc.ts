import type { Playbook } from '../../domain/types';

export const homeSoldBc: Playbook = {
  id: 'home-sold-bc',
  title: 'Selling a home · British Columbia',
  summary:
    'Paperwork plan for selling a home in British Columbia, from listing and the mortgage payout to completion, the home flipping tax, non-resident clearance and the principal residence designation on the tax return.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'home-sold',
  anchorKind: 'home-sold',
  ages: { from: 19 },
  conditions: [
    'You are selling a home in British Columbia; the event date is the completion date',
    'Some steps apply only if the home was owned for a short time, was not your principal residence, or you are not a resident of Canada',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'BC home flipping tax — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/bc-home-flipping-tax',
    },
    {
      title: 'BC home flipping tax exemptions — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/bc-home-flipping-tax/exemptions',
    },
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
      title: 'Home buyer rescission period — BC Financial Services Authority',
      url: 'https://www.bcfsa.ca/public-resources/real-estate/home-buyer-rescission-period',
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
  ],
  steps: [
    {
      id: 'list',
      title: 'List the home and prepare the seller\'s documents',
      offsetDays: -120,
      durationDays: 21,
      dependsOn: [],
      documents: ['Listing agreement', 'Property disclosure statement', 'Recent property tax notice and assessment'],
      prepare: [
        'Purchase date and price, and records of improvements',
        'Utility bills',
        'For strata: bylaws, minutes and the depreciation report, and a Form B from the strata corporation',
      ],
      howTo:
        '1. Most sellers list with a real estate brokerage licensed by the BC Financial Services Authority; the listing agreement sets commission and term. Commission is subject to GST.\n2. A property disclosure statement describes what the seller knows about the home; it is common but not mandatory in B.C.\n3. Strata sellers are often asked for an information certificate (Form B) and recent strata documents.\n4. Keep the original purchase papers and improvement receipts; they set the cost base if tax applies.',
    },
    {
      id: 'mortgage-payout',
      title: 'Ask the lender for the payout amount and any prepayment penalty',
      offsetDays: -75,
      durationDays: 14,
      conditions: ['Only if there is a mortgage or line of credit secured on the home'],
      dependsOn: [],
      documents: ['Mortgage payout statement'],
      prepare: ['Mortgage number', 'Expected completion date', 'Whether you will port the mortgage to a new home'],
      howTo:
        '1. Paying off a mortgage before the term ends can trigger a prepayment penalty: often 3 months\' interest on a variable rate, or the greater of that and an interest rate differential on a fixed rate. The contract sets the method.\n2. Porting the mortgage to a new home, or having the buyer assume it, can avoid the penalty where the lender allows it.\n3. Lenders also charge a discharge fee.\n4. The payout statement is ordered for the completion date; the lawyer or notary usually requests it.',
    },
    {
      id: 'accept-offer',
      title: 'Accept an offer and follow the subject dates',
      offsetDays: -60,
      durationDays: 14,
      dependsOn: ['list'],
      documents: ['Contract of purchase and sale', 'Subject removal notice'],
      prepare: ['Completion, possession and adjustment dates', 'Deposit amount'],
      howTo:
        '1. The contract of purchase and sale sets the price, subjects, and completion and possession dates.\n2. Buyers of most residential property in B.C. can cancel within 3 business days of acceptance; they pay the seller 0.25% of the price if they do.\n3. The sale is firm once the buyer removes subjects in writing; the deposit is then held in trust.\n4. Keep a signed copy; the lawyer or notary, lender and tax filings all use it.',
    },
    {
      id: 'conveyancer',
      title: 'Hire a lawyer or notary for the sale',
      offsetDays: -45,
      durationDays: 7,
      dependsOn: ['accept-offer'],
      documents: ['Retainer letter', 'Transfer documents'],
      prepare: ['The signed contract', 'Photo ID for each owner on title', 'Mortgage details', 'Keys and access codes'],
      howTo:
        '1. In B.C. a lawyer or notary public prepares the transfer and the seller\'s statement of adjustments, and pays out the mortgage from the sale money.\n2. Sellers sign the transfer and a residency declaration in the days before completion.\n3. The mortgage discharge is registered at the Land Title and Survey Authority (LTSA) after payout.\n4. For strata units, a Form F certificate of payment shows strata fees are paid up.',
    },
    {
      id: 'completion',
      title: 'Complete the sale',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['conveyancer'],
      documents: ['Seller\'s statement of adjustments', 'Lawyer\'s or notary\'s reporting letter', 'Proof of mortgage discharge'],
      prepare: ['All keys, fobs and remotes for the buyer', 'Final meter readings'],
      howTo:
        '1. On completion day the buyer\'s lawyer or notary registers the transfer at the LTSA and the sale money is released.\n2. The statement of adjustments splits property tax and strata fees between seller and buyer by date.\n3. Keys are handed over on the possession date in the contract.\n4. Keep the reporting letter and statement; they record the sale price and date for tax.',
    },
    {
      id: 'non-resident',
      title: 'Notify the CRA and ask for a clearance certificate',
      offsetDays: 10,
      durationDays: 10,
      conditions: ['Only if you are not a resident of Canada for tax purposes'],
      dependsOn: ['completion'],
      documents: ['Form T2062', 'Certificate of compliance (T2068)'],
      prepare: ['The contract and statement of adjustments', 'Original purchase price and improvements'],
      howTo:
        '1. A non-resident seller notifies the CRA on Form T2062 within 10 days after the sale; the CRA then issues a certificate of compliance once tax is paid or secured.\n2. Until the certificate arrives, the buyer\'s lawyer usually holds back 25% of the price (50% on certain property).\n3. Late notice carries a penalty of $25 a day, minimum $100, maximum $2,500.\n4. It is usually started before completion so the holdback is released sooner.',
    },
    {
      id: 'close-accounts',
      title: 'Cancel insurance and utilities and change your address',
      offsetDays: 14,
      durationDays: 14,
      dependsOn: ['completion'],
      documents: [],
      prepare: ['Completion date', 'New address', 'Account numbers for BC Hydro, FortisBC, internet and insurer'],
      howTo:
        '1. Home insurance is cancelled from the day after completion, not before.\n2. BC Hydro, FortisBC and other utilities close on the possession date with final readings.\n3. Update the CRA in My Account, ICBC, and Health Insurance BC; the B.C. address change service updates several at once.\n4. Canada Post mail forwarding covers the gap.',
    },
    {
      id: 'flipping-tax',
      title: 'File the BC home flipping tax return',
      offsetDays: 90,
      durationDays: 30,
      conditions: ['Only if you owned the home for less than 730 days'],
      dependsOn: ['completion'],
      documents: ['BC home flipping tax return', 'Contract of purchase and sale for both the purchase and the sale'],
      prepare: ['Days of ownership', 'Profit after costs', 'Proof of any life circumstance for an exemption'],
      howTo:
        '1. From January 1, 2025, B.C. taxes the profit from selling a home owned for less than 730 days: 20% for up to 365 days, reducing to zero at 730.\n2. A principal residence deduction of up to $20,000 applies if you owned it at least 365 days and lived in it.\n3. Exemptions for life circumstances such as death, separation, illness, job loss or relocation still need a return to claim them.\n4. The return is filed online through eTaxBC within 90 days after the sale.',
    },
    {
      id: 'declarations',
      title: 'Check the last speculation and vacancy tax and Empty Homes declarations',
      offsetDays: 120,
      durationDays: 30,
      conditions: ['Only if the home was in a speculation and vacancy tax area or the City of Vancouver'],
      dependsOn: ['completion'],
      documents: ['Any declaration letter still received'],
      prepare: ['Completion date', 'Who lived in the home during the year'],
      howTo:
        '1. The speculation and vacancy tax and Vancouver\'s Empty Homes Tax are declared once a year by owners; a letter can still arrive for a year you owned part of.\n2. Declare if a letter arrives, even after selling, so no tax is charged by default.\n3. The home owner grant is claimed each year only for a home you still own.\n4. Check current rules on each page; the date here is an estimate.',
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
        '1. The sale of a principal residence is reported on Schedule 3, and the designation on Form T2091(IND), on the return for the year of the sale.\n2. A late designation may be accepted, but a penalty can apply.\n3. Under the federal flipping rule, a home held less than 365 days is taxed as business income with no principal residence exemption, unless a life event such as death, separation, a new job or illness applies.\n4. Years it was not your principal residence, such as a rental or second home, can leave a taxable capital gain.\n5. File by April 30 of the year after the sale (June 15 if self-employed, with any balance still due April 30).',
    },
  ],
};
