import type { Playbook } from '../../domain/types';

export const movedCityBc: Playbook = {
  id: 'moved-city-bc',
  title: 'Moving home · British Columbia',
  summary:
    'Paperwork plan for moving to a new home in a British Columbia city, from within B.C. or from another province: lease, mail, utilities, ICBC, MSP, voting, tax and settling in.',
  region: 'British Columbia, Canada',
  country: 'CA',
  province: 'BC',
  family: 'moved-city',
  anchorKind: 'moved-city',
  conditions: [
    'You are moving to a new home in a British Columbia city, from elsewhere in B.C. or from another province',
    'Some steps apply only to people new to B.C., drivers, renters or families with children',
    'The moving day is the anchor date; steps before it are counted back from it',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Moving to B.C. — ICBC',
      url: 'https://www.icbc.com/driver-licensing/moving-bc',
    },
    {
      title: 'Moving from within Canada — ICBC',
      url: 'https://www.icbc.com/driver-licensing/moving-bc/Moving-from-within-canada',
    },
    {
      title: 'Moving to B.C. (insurance and registration) — ICBC',
      url: 'https://www.icbc.com/insurance/moving-travelling/moving-BC',
    },
    {
      title: 'Address Change BC — Province of British Columbia',
      url: 'https://www.addresschange.gov.bc.ca/',
    },
    {
      title: 'Change your personal information on a BC Services Card — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card/your-card/change-personal-information',
    },
    {
      title: 'MSP: How to enrol — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/how-to-enrol',
    },
    {
      title: 'Health Connect Registry — HealthLink BC',
      url: 'https://www.healthlinkbc.ca/health-connect-registry',
    },
    {
      title: 'Start a new tenancy — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/starting-a-tenancy',
    },
    {
      title: 'Tenancy deposits and fees — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/starting-a-tenancy/deposits-fees',
    },
    {
      title: 'Move-in condition inspection — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/starting-a-tenancy/move-in-condition-inspection',
    },
    {
      title: 'Ending a tenancy: tenant notice — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/ending-a-tenancy/tenant-notice',
    },
    {
      title: 'Returning deposits — Province of British Columbia',
      url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/ending-a-tenancy/returning-deposits',
    },
    {
      title: "B.C. renter's tax credit — Province of British Columbia",
      url: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/personal/credits/renters-tax-credit',
    },
    {
      title: 'Change your address — Canada Revenue Agency',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/change-your-address.html',
    },
    {
      title: 'Mail Forwarding — Canada Post',
      url: 'https://www.canadapost-postescanada.ca/cpc/en/personal/receiving/manage-mail/mail-forwarding.page',
    },
    {
      title: 'Elections BC',
      url: 'https://elections.bc.ca/',
    },
    {
      title: 'Register to vote — Elections Canada',
      url: 'https://www.elections.ca/content2.aspx?section=reg&document=index&lang=e',
    },
  ],
  steps: [
    {
      id: 'notice-old',
      title: 'Give notice at the old rental and plan the move-out inspection',
      offsetDays: -45,
      durationDays: 7,
      dependsOn: [],
      documents: ['Written notice to end the tenancy', 'Move-out condition inspection report'],
      prepare: [
        'Check the tenancy agreement: month-to-month or fixed term',
        'Written notice, delivered so the landlord gets it in time',
        'Forwarding address in writing for the deposit',
      ],
      howTo:
        "1. On a month-to-month tenancy, the landlord receives the tenant's written notice at least one full rental month before it takes effect, not just 30 days.\n2. The landlord offers times for a move-out condition inspection; a tenant who skips it can lose the right to the damage or pet deposit back.\n3. After getting the forwarding address in writing, the landlord has 15 days to return the deposits with interest or apply to keep them; if not, the tenant can ask the Residential Tenancy Branch for double.",
      conditions: ['Only if you rented the old home in B.C.'],
    },
    {
      id: 'lease',
      title: 'Sign the tenancy agreement or complete the purchase',
      offsetDays: -30,
      durationDays: 21,
      dependsOn: [],
      documents: ['Tenancy agreement', 'Deposit receipt'],
      prepare: [
        'View the unit in person or by live video before paying anything',
        'Check the landlord owns or manages the unit',
        'Note the move-in date, rent, what is included and the deposit amounts',
      ],
      howTo:
        '1. Landlords in B.C. prepare a written tenancy agreement for every tenancy; the Residential Tenancy Branch has a standard form.\n2. The security deposit is at most half of one month\'s rent, charged at the start of the tenancy; a pet damage deposit has the same limit.\n3. A landlord keeps a deposit only with the tenant\'s written agreement or an order from the Residential Tenancy Branch.\n4. For a purchase, the lawyer or notary handles the transfer; the timing here is an estimate.',
    },
    {
      id: 'school',
      title: 'Register the children at the new catchment school',
      offsetDays: -14,
      durationDays: 14,
      dependsOn: ['lease'],
      documents: ['School registration form', 'Proof of address'],
      prepare: [
        'Find the catchment school for the new address on the school district website',
        'Child\'s birth certificate or other proof of age',
        'Latest report card',
        'Proof of B.C. residency, if new to B.C.',
      ],
      howTo:
        '1. B.C. school districts assign schools by catchment area, based on the home address.\n2. Registration is done with the school or the district office; each district sets its own list of papers.\n3. A place at a school outside the catchment depends on space; ask the district.',
      conditions: ['Only if you have school-age children'],
    },
    {
      id: 'mail-forward',
      title: 'Order mail forwarding from Canada Post',
      offsetDays: -14,
      durationDays: 5,
      dependsOn: [],
      documents: ['Mail Forwarding confirmation'],
      prepare: ['Government-issued photo ID', 'Canada Post account, if ordering online', 'Old and new addresses'],
      howTo:
        '1. For a move, forwarding comes in 4-month and 12-month terms, with a fee.\n2. Ordered online, it starts 5 days after purchase; at a post office, 3 days after.\n3. Forwarding gives time to update the bank, employer, insurers and subscriptions.',
    },
    {
      id: 'utilities',
      title: 'Set up electricity, gas and internet',
      offsetDays: -7,
      durationDays: 7,
      dependsOn: ['lease'],
      documents: ['Utility account numbers'],
      prepare: [
        'Check which utilities the lease includes',
        'BC Hydro for electricity in most of B.C.',
        'FortisBC for natural gas, and for electricity in parts of the southern interior',
        'Close or move the accounts at the old home',
      ],
      howTo:
        '1. Start dates are set online or by phone with each provider.\n2. Internet installs can take a week or more to book.\n3. A final meter reading at the old home closes that account.',
    },
    {
      id: 'insurance',
      title: 'Start tenant or home insurance at the new address',
      offsetDays: -3,
      durationDays: 3,
      dependsOn: ['lease'],
      documents: ['Insurance policy'],
      prepare: ['Start date on moving day', 'Contents list or photos', 'Check whether the lease asks for tenant insurance'],
      howTo:
        '1. Tenant insurance covers belongings and liability; the building\'s own policy usually does not.\n2. The tenancy law does not set it, but a tenancy agreement can ask for it.\n3. Moving an existing policy is usually a call to the insurer.',
    },
    {
      id: 'inspection',
      title: 'Do the move-in condition inspection with the landlord',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['lease'],
      documents: ['Condition inspection report'],
      prepare: ['Photos of every room with dates', 'A copy of the RTB-27 form or the landlord\'s own'],
      howTo:
        '1. The landlord books the inspection and offers at least 2 times for it.\n2. Landlord and tenant walk through together and sign the report; the landlord gives the tenant a copy within 7 days.\n3. A landlord who skips the inspection loses the right to claim against the security or pet deposit for damage.',
      conditions: ['Only if you rent'],
    },
    {
      id: 'icbc-address',
      title: 'Update the address on the licence, BC Services Card and vehicle at ICBC',
      offsetDays: 10,
      durationDays: 10,
      dependsOn: [],
      documents: ['Address sticker for the card'],
      prepare: ['Driver\'s licence or BC Services Card number', 'Vehicle registration, if you own a car', 'New postal code'],
      howTo:
        '1. ICBC asks drivers to report a new home address within 10 days of moving.\n2. Address Change BC updates the BC Services Card and the B.C. driver\'s licence online, and can notify several other B.C. government services at once; the service lists which ones.\n3. A photo card gets an address sticker by mail.\n4. The vehicle registration and insurance address is updated too, at an Autoplan broker or ICBC; the premium can change with the new area.',
      conditions: ['Only if you moved within B.C.'],
    },
    {
      id: 'msp',
      title: 'Apply for MSP and keep the old province\'s coverage for the wait',
      offsetDays: 7,
      durationDays: 7,
      dependsOn: [],
      documents: ['MSP application', 'Health card from the old province'],
      prepare: ['Apply soon after arriving', 'Note the date coverage will start', 'Tell the old province\'s health plan the moving date'],
      howTo:
        '1. New B.C. residents wait the rest of the arrival month plus 2 months before MSP coverage starts.\n2. The province says to keep coverage from the former province\'s plan during the wait.\n3. Each family member\'s wait starts on the day they arrive in B.C.\n4. Enrolment gives a Personal Health Number, used for the BC Services Card and the Health Connect Registry.',
      conditions: ['Only if you moved to B.C. from another province'],
    },
    {
      id: 'cra',
      title: 'Change the address with the Canada Revenue Agency',
      offsetDays: 14,
      durationDays: 3,
      dependsOn: [],
      documents: [],
      prepare: ['CRA My Account sign-in', 'Or form RC325 by mail'],
      howTo:
        '1. A change in CRA My Account takes effect right away; by phone it is also immediate, by mail 4 to 6 weeks.\n2. The CRA does not pass the new address to other departments, so each one is told separately.\n3. Benefit payments depend on current details, so updating before tax season avoids gaps.\n4. The province lived in on December 31 is the one used for that year\'s provincial tax.',
    },
    {
      id: 'elections',
      title: 'Update the voter registration with Elections BC and Elections Canada',
      offsetDays: 21,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['Driver\'s licence or other ID', 'New address', 'Ticking the Elections Canada box on the tax return also shares the address with them'],
      howTo:
        '1. Elections BC and Elections Canada keep separate lists; each has an online registration service.\n2. Being registered at the current address avoids extra steps at the polls.',
      ages: { from: 18 },
      conditions: ['Only if you are a Canadian citizen'],
    },
    {
      id: 'vehicle',
      title: 'Register and insure the vehicle in B.C.',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['B.C. vehicle registration', 'Autoplan insurance'],
      prepare: [
        'Old province\'s registration',
        'Proof of driving experience, such as a driver\'s abstract',
        'Ask ICBC or an Autoplan broker whether an inspection is needed first',
      ],
      howTo:
        '1. ICBC gives new residents 30 days after arriving to register, license and insure a vehicle; commercial vehicles are immediate.\n2. Proof of insurance from the old province is no longer asked for, but driving experience is.\n3. Vehicles from outside B.C. may need an inspection before registration; ICBC or the broker confirms.',
      conditions: ['Only if you moved to B.C. from another province', 'Only if you own a vehicle'],
    },
    {
      id: 'doctor',
      title: 'Join the Health Connect Registry for a family doctor',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: ['msp', 'icbc-address'],
      documents: [],
      prepare: ['Personal Health Number', 'New address, email and phone'],
      howTo:
        '1. The registry is how B.C. matches people with a family doctor or nurse practitioner.\n2. Registering online takes a few minutes, or call 8-1-1.\n3. People already on the registry update the address, since matching is by community.\n4. The local team makes contact when a provider becomes available; waits vary.',
    },
    {
      id: 'library',
      title: 'Get a card at the local library',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: [],
      documents: ['Library card'],
      prepare: ['Photo ID', 'Proof of the new address, such as a utility bill or the lease'],
      howTo:
        '1. Public library cards are free for residents of the library\'s area.\n2. Cards from the old area often still work, but the home library changes with the address.',
    },
    {
      id: 'licence',
      title: 'Exchange the driver\'s licence at ICBC',
      offsetDays: 90,
      durationDays: 30,
      dependsOn: [],
      documents: ['B.C. driver\'s licence', 'Licence from the old province', 'Driver\'s abstract'],
      prepare: ['Book an appointment at a driver licensing office', 'Accepted ID', 'Licence fee'],
      howTo:
        '1. New residents have 90 days to switch to a B.C. licence and can drive on the valid old one meanwhile.\n2. An original driver\'s abstract lets ICBC recognize up to 15 years of driving experience.\n3. The old licence is surrendered; B.C. allows one licence per person.\n4. The licence and BC Services Card can be combined at the same visit.',
      conditions: ['Only if you moved to B.C. from another province', 'Only if you drive'],
    },
    {
      id: 'bc-services-card',
      title: 'Get the BC Services Card',
      offsetDays: 100,
      durationDays: 14,
      dependsOn: ['msp'],
      documents: ['BC Services Card'],
      prepare: ['Two pieces of ID', 'Enrol in MSP first', 'Combine it with the licence exchange if possible'],
      howTo:
        '1. After enrolling in MSP, the photo card is made at an ICBC driver licensing office.\n2. The card itself has no fee.\n3. It shows the Personal Health Number and can be set up in the BC Services Card app for online government services.',
      conditions: ['Only if you moved to B.C. from another province'],
    },
    {
      id: 'renter-credit',
      title: "Claim the B.C. renter's tax credit on next year's return",
      offsetDays: 240,
      durationDays: 30,
      dependsOn: ['lease'],
      documents: ['Form BC479', 'Rent receipts or tenancy agreements'],
      prepare: ['Addresses and landlord details for each rental in the year', 'Total rent paid and months rented'],
      howTo:
        "1. The credit is up to $400 a year for low- and moderate-income renters; it phases out above an income threshold that changes each year.\n2. It counts renters who lived in eligible B.C. rental units for at least 6 one-month periods in the year and were B.C. residents on December 31; rent at the old and new B.C. addresses both count.\n3. It is claimed on form BC479 with the return, due April 30; move this step to that date. It repeats each year.",
      conditions: ['Only if you rent', 'Only if you live in B.C. on December 31'],
    },
  ],
};
