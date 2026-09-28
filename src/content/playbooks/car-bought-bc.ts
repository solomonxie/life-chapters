import type { Playbook } from '../../domain/types';

export const carBoughtBc: Playbook = {
  id: 'car-bought-bc',
  title: 'Buying a car · British Columbia',
  summary:
    'Paperwork plan for buying a car in British Columbia, from the history report and lien search to the transfer, PST and Autoplan insurance at a broker, and the recalls and renewals after.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'car-bought',
  anchorKind: 'car-bought',
  ages: { from: 16 },
  conditions: [
    'You are buying a car, new or used, to register and drive in British Columbia; the event date is the purchase or delivery date',
    'Steps marked for a private sale do not apply when buying from a licensed dealer',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Buy a used vehicle — ICBC',
      url: 'https://www.icbc.com/vehicle-registration/buy-vehicle/buy-a-used-vehicle',
    },
    {
      title: 'Steps to buying a used vehicle — ICBC',
      url: 'https://www.icbc.com/vehicle-registration/buy-vehicle/buy-a-used-vehicle/Steps-to-buying-a-used-vehicle',
    },
    {
      title: 'Vehicle history reports — ICBC',
      url: 'https://www.icbc.com/vehicle-registration/buy-vehicle/buy-a-used-vehicle/Vehicle-history-reports',
    },
    {
      title: 'PST on vehicles — ICBC',
      url: 'https://www.icbc.com/vehicle-registration/buy-vehicle/pst-vehicles',
    },
    {
      title: 'Import a vehicle into B.C. — ICBC',
      url: 'https://www.icbc.com/vehicle-registration/buy-vehicle/Importing-a-vehicle-into-B-C',
    },
    {
      title: 'Sell a used vehicle — ICBC',
      url: 'https://www.icbc.com/vehicle-registration/sell-vehicle/Selling-a-used-vehicle',
    },
    {
      title: 'Buy, renew, update, or estimate your insurance — ICBC',
      url: 'https://www.icbc.com/insurance/buy-renew-cancel',
    },
    {
      title: 'Personal Property Registry — BC Registries',
      url: 'https://www.bcregistry.gov.bc.ca/ppr',
    },
    {
      title: 'Vehicle Sales Authority of British Columbia',
      url: 'https://www.vsa.ca/',
    },
    {
      title: 'Defects and recalls — Transport Canada',
      url: 'https://tc.canada.ca/en/road-transportation/defects-recalls-vehicles-tires-child-car-seats',
    },
  ],
  steps: [
    {
      id: 'history',
      title: 'Get a vehicle history report and an inspection',
      offsetDays: -14,
      durationDays: 7,
      conditions: ['Only if the car is used'],
      dependsOn: [],
      documents: ['Vehicle history report', 'Mechanic\'s inspection report'],
      prepare: ['Vehicle Identification Number (VIN)', 'The seller\'s vehicle registration (APV250), to match the VIN and owner'],
      howTo:
        '1. ICBC sells a vehicle claims history report for B.C. vehicles; private reports also cover other provinces and the U.S.\n2. The report shows past claims, damage, and whether the car was ever branded rebuilt, salvage or flood-damaged; some flood-damaged vehicles cannot be licensed in B.C.\n3. A mechanic\'s pre-purchase inspection finds what the report cannot.\n4. Check that the name and VIN on the seller\'s registration match the seller and the car.',
    },
    {
      id: 'lien-search',
      title: 'Search for liens on the car',
      offsetDays: -7,
      durationDays: 1,
      conditions: ['Only if you are buying from a private seller'],
      dependsOn: ['history'],
      documents: ['Personal Property Registry search result'],
      prepare: ['VIN', 'A BC Registries account, or a card for the search fee'],
      howTo:
        '1. A lien is a debt registered against the car, such as an unpaid loan; it can stay with the car after the sale.\n2. A serial number search in the B.C. Personal Property Registry, by VIN, shows registered liens; some private history reports include it.\n3. If a lien shows, the seller pays it off and has it discharged before the money changes hands.\n4. Licensed dealers are regulated by the Vehicle Sales Authority and clear liens themselves.',
    },
    {
      id: 'import-inspection',
      title: 'Get an out-of-province inspection',
      offsetDays: -5,
      durationDays: 5,
      conditions: ['Only if the car was last registered outside B.C.'],
      dependsOn: [],
      documents: ['Out-of-province inspection report', 'The previous registration or title', 'For imports from the U.S.: customs Form 1 and the RIV inspection record'],
      prepare: ['Book a Designated Inspection Facility'],
      howTo:
        '1. A car coming from another province or country usually passes an inspection at a Designated Inspection Facility before it can be licensed in B.C.\n2. Cars imported from outside Canada also go through the federal Registrar of Imported Vehicles (RIV) process first.\n3. See ICBC\'s import page for what applies; the step here is only a prompt.',
    },
    {
      id: 'sign',
      title: 'Sign the Transfer/Tax Form and pay',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['lien-search'],
      documents: ['Transfer/Tax Form (APV9T)', 'Seller\'s signed vehicle registration (APV250)', 'Bill of sale', 'For a dealer sale: the purchase agreement'],
      prepare: ['Agreed price in writing', 'Payment by a traceable method'],
      howTo:
        '1. In a private sale, buyer and seller both fill in and sign the Transfer/Tax Form (APV9T) with original signatures; electronic signatures are not accepted.\n2. The seller also signs the original registration (APV250) over.\n3. Write the true price; PST is worked out on the price or the Canadian Black Book wholesale value, whichever is greater.\n4. A dealer prepares the paperwork, collects GST and PST, and often registers the car for you.',
    },
    {
      id: 'register-insure',
      title: 'Transfer, register and insure at an Autoplan broker',
      offsetDays: 3,
      durationDays: 2,
      dependsOn: ['sign'],
      documents: ['Vehicle registration and insurance (owner\'s certificate)', 'Licence plates', 'PST receipt'],
      prepare: [
        'Signed APV9T and APV250',
        'Driver\'s licence',
        'Odometer reading, and the previous car\'s odometer if you had one, for usage-based discounts',
        'Money for PST and the first insurance payment',
      ],
      howTo:
        '1. In B.C., registration, licence plates and Autoplan basic insurance are all done together at an Autoplan broker; driving the car on the road needs valid insurance first.\n2. New purchases are registered in the name of the licence holder within 10 days of purchase.\n3. PST on a private sale is paid here. At review: 12% up to $124,999.99, 15% from $125,000, 20% from $150,000; from a dealer 7% under $55,000, rising in steps. Zero-emission vehicles have different thresholds; check the current ICBC PST page.\n4. Some gifts between family members are PST-exempt; ask the broker.\n5. Plates from a car you just sold or traded can often be moved to the new one; the broker explains the conditions.\n6. Optional coverage (collision, comprehensive, higher liability) can come from ICBC or a private insurer.',
    },
    {
      id: 'old-car',
      title: 'Wrap up the car you sold or traded in',
      offsetDays: 7,
      durationDays: 7,
      conditions: ['Only if this car replaces one you sold or traded in'],
      dependsOn: [],
      documents: ['Your copy of the Transfer/Tax Form', 'Insurance cancellation or transfer receipt'],
      prepare: ['Plate number', 'Buyer\'s name and address'],
      howTo:
        '1. In B.C. plates stay with the owner, not the car; the seller removes them before the buyer drives away.\n2. The insurance is cancelled or moved to the new car at a broker; unused premium is usually refunded.\n3. Keep a copy of the signed transfer form and the date and time of sale.',
    },
    {
      id: 'recalls',
      title: 'Check for recalls and register with the manufacturer',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: ['register-insure'],
      documents: [],
      prepare: ['VIN', 'Your address'],
      howTo:
        '1. Transport Canada\'s recall database lists safety recalls by make, model and year.\n2. Registering with the manufacturer, or updating the owner on file, means recall notices reach you.\n3. Recall repairs are done by the brand\'s dealers at no charge.',
    },
    {
      id: 'renew',
      title: 'Renew the insurance and registration, every year',
      offsetDays: 365,
      durationDays: 30,
      dependsOn: ['register-insure'],
      documents: ['Renewed owner\'s certificate'],
      prepare: ['Current odometer reading', 'Any change in drivers or use'],
      howTo:
        '1. Autoplan insurance and the vehicle licence renew together each year, at a broker or online.\n2. ICBC sends a reminder before expiry; driving with expired insurance is an offence.\n3. It repeats every year; the date here is the first renewal.',
    },
  ],
};
