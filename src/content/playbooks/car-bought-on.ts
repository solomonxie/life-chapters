import type { Playbook } from '../../domain/types';

export const carBoughtOn: Playbook = {
  id: 'car-bought-on',
  title: 'Buying a car · Ontario',
  summary:
    'Paperwork plan for buying a car in Ontario, from the Used Vehicle Information Package and safety certificate to insurance, registration and retail sales tax at ServiceOntario, and the recalls and renewals after.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'car-bought',
  anchorKind: 'car-bought',
  ages: { from: 16 },
  conditions: [
    'You are buying a car, new or used, to register and drive in Ontario; the event date is the purchase or delivery date',
    'Steps marked for a private sale do not apply when buying from a registered dealer',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Buy or sell a used vehicle in Ontario — Ontario.ca',
      url: 'https://www.ontario.ca/page/buy-or-sell-used-vehicle-ontario',
    },
    {
      title: 'Renew your licence plate sticker — Ontario.ca',
      url: 'https://www.ontario.ca/page/renew-licence-plate-sticker',
    },
    {
      title: 'Change your address on your driver\'s licence, vehicle permit and health card — Ontario.ca',
      url: 'https://www.ontario.ca/page/change-address-drivers-licence-vehicle-permit-and-health-card',
    },
    {
      title: 'Ontario Motor Vehicle Industry Council (OMVIC)',
      url: 'https://www.omvic.ca/',
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
      prepare: ['Vehicle Identification Number (VIN)', 'The seller\'s vehicle permit, to match the VIN and owner'],
      howTo:
        '1. A private history report shows accidents, past registrations and whether the car was branded rebuilt, salvage or irreparable.\n2. A mechanic\'s pre-purchase inspection finds what the report cannot.\n3. Check that the name and VIN on the seller\'s vehicle permit match the seller and the car.',
    },
    {
      id: 'uvip',
      title: 'Get the Used Vehicle Information Package from the seller',
      offsetDays: -7,
      durationDays: 3,
      conditions: ['Only if you are buying from a private seller'],
      dependsOn: ['history'],
      documents: ['Used Vehicle Information Package (UVIP)'],
      prepare: ['VIN', 'The seller\'s contact details'],
      howTo:
        '1. Under the Highway Traffic Act, a private seller in Ontario gives the buyer a Used Vehicle Information Package (UVIP); the seller buys it from ServiceOntario.\n2. It shows the registration history, any liens registered in Ontario, and the wholesale value used for tax.\n3. If a lien shows, the seller pays it off and gets a discharge letter before the money changes hands.\n4. The bill of sale on the back is filled in and signed by both.\n5. Registered dealers are regulated by OMVIC, disclose history and clear liens themselves.',
    },
    {
      id: 'safety',
      title: 'Get a Safety Standards Certificate',
      offsetDays: -4,
      durationDays: 3,
      validForDays: 36,
      conditions: ['Only if the car is used and needs a safety certificate to be plated'],
      dependsOn: ['uvip'],
      documents: ['Safety Standards Certificate'],
      prepare: ['Book a Motor Vehicle Inspection Station (Ontario DriveON sign)', 'Agree with the seller who pays for repairs'],
      howTo:
        '1. A used car needs a Safety Standards Certificate before plates go on it in the buyer\'s name; the seller or buyer can get one, as agreed.\n2. Only a licensed Motor Vehicle Inspection Station can issue it.\n3. It is valid for a short time after the inspection (36 days at review; check current).\n4. Ownership can be transferred without one, but the car is not plated for the road until it has one.',
    },
    {
      id: 'insurance',
      title: 'Arrange car insurance before driving',
      offsetDays: 0,
      durationDays: 3,
      dependsOn: [],
      documents: ['Insurance liability slip (pink slip)', 'Auto insurance policy'],
      prepare: ['VIN', 'Driver\'s licence for each driver', 'Driving and claims history'],
      howTo:
        '1. Ontario auto insurance comes from private insurers or brokers; it is mandatory before the car is driven on the road.\n2. The liability slip is shown at registration and carried in the car.\n3. Optional coverages such as collision and comprehensive are extra; compare quotes.',
    },
    {
      id: 'register',
      title: 'Register the car and pay retail sales tax at ServiceOntario',
      offsetDays: 6,
      durationDays: 3,
      dependsOn: ['insurance', 'safety'],
      documents: ['Vehicle permit in your name', 'Licence plates', 'Retail sales tax receipt'],
      prepare: [
        'UVIP with the signed bill of sale',
        'The vehicle portion of the seller\'s permit, signed',
        'Safety Standards Certificate',
        'Insurance liability slip',
        'Driver\'s licence',
        'Money for tax and fees',
      ],
      howTo:
        '1. A private buyer registers the transfer at ServiceOntario within 6 days of the purchase.\n2. Retail sales tax of 13% is paid at registration, not to the seller; it is worked out on the purchase price or the wholesale value, whichever is greater.\n3. Some gifts between close family members are tax-exempt with a sworn statement; ask ServiceOntario.\n4. Plates stay with the driver, not the car; use your own plates or get new ones.\n5. A dealer collects HST and usually registers the car for you.',
    },
    {
      id: 'old-car',
      title: 'Wrap up the car you sold or traded in',
      offsetDays: 7,
      durationDays: 7,
      conditions: ['Only if this car replaces one you sold or traded in'],
      dependsOn: [],
      documents: ['Plate portion of the vehicle permit', 'Insurance cancellation or transfer'],
      prepare: ['Plate number', 'Buyer\'s name and address'],
      howTo:
        '1. In Ontario the seller keeps the plates and the plate portion of the permit, and gives the buyer the vehicle portion and the UVIP.\n2. The insurance is cancelled or moved to the new car; ask the insurer about any refund.\n3. Plates not put on another car can be returned to ServiceOntario.',
    },
    {
      id: 'recalls',
      title: 'Check for recalls and register with the manufacturer',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: ['register'],
      documents: [],
      prepare: ['VIN', 'Your address'],
      howTo:
        '1. Transport Canada\'s recall database lists safety recalls by make, model and year.\n2. Registering with the manufacturer, or updating the owner on file, means recall notices reach you.\n3. Recall repairs are done by the brand\'s dealers at no charge.',
    },
    {
      id: 'renew',
      title: 'Renew the insurance and check the plate renewal, every year',
      offsetDays: 365,
      durationDays: 30,
      dependsOn: ['register'],
      documents: ['Renewed insurance policy and liability slip'],
      prepare: ['Any change in drivers, use or address'],
      howTo:
        '1. Insurance renews with the insurer each year; compare quotes before the renewal date.\n2. Plates on passenger cars renew automatically each year for free if insurance is valid and there are no unpaid fines or tolls; others renew manually.\n3. Address changes go to ServiceOntario within 6 days of moving.\n4. It repeats every year; the date here is the first renewal.',
    },
  ],
};
