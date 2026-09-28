import type { Playbook } from '../../domain/types';

export const movedCityOn: Playbook = {
  id: 'moved-city-on',
  title: 'Moving home · Ontario',
  summary:
    'Paperwork plan for moving to a new home in an Ontario city, from within Ontario or from another province: lease, mail, utilities, ServiceOntario, OHIP, voting, tax and settling in.',
  region: 'Ontario, Canada',
  country: 'CA',
  province: 'ON',
  family: 'moved-city',
  anchorKind: 'moved-city',
  conditions: [
    'You are moving to a new home in an Ontario city, from elsewhere in Ontario or from another province',
    'Some steps apply only to people new to Ontario, drivers, renters or families with children',
    'The moving day is the anchor date; steps before it are counted back from it',
  ],
  reviewedAt: '2026-09-27',
  version: 1,
  sources: [
    {
      title: 'Change your address on your driver\'s licence, vehicle permit and health card — Ontario.ca',
      url: 'https://www.ontario.ca/page/change-address-drivers-licence-vehicle-permit-and-health-card',
    },
    {
      title: 'Apply for OHIP and get a health card — Ontario.ca',
      url: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
    },
    {
      title: 'Exchange an out-of-province driver\'s licence — Ontario.ca',
      url: 'https://www.ontario.ca/page/exchange-out-province-drivers-licence',
    },
    {
      title: 'Renting in Ontario: your rights — Ontario.ca',
      url: 'https://www.ontario.ca/page/renting-ontario-your-rights',
    },
    {
      title: 'Guide to Ontario\'s standard lease — Ontario.ca',
      url: 'https://www.ontario.ca/page/guide-ontarios-standard-lease',
    },
    {
      title: 'A Guide to the Residential Tenancies Act — Landlord and Tenant Board',
      url: 'https://tribunalsontario.ca/documents/ltb/Brochures/Guide%20to%20RTA%20(English).html',
    },
    {
      title: 'Landlord and Tenant Board — Tribunals Ontario',
      url: 'https://tribunalsontario.ca/ltb/',
    },
    {
      title: 'Find a family doctor or nurse practitioner — Ontario.ca',
      url: 'https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner',
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
      title: 'Elections Ontario',
      url: 'https://www.elections.on.ca/',
    },
    {
      title: 'Register to vote — Elections Canada',
      url: 'https://www.elections.ca/content2.aspx?section=reg&document=index&lang=e',
    },
  ],
  steps: [
    {
      id: 'lease',
      title: 'Sign the standard lease or complete the purchase',
      offsetDays: -30,
      durationDays: 21,
      dependsOn: [],
      documents: ['Standard lease', 'Rent deposit receipt'],
      prepare: [
        'View the unit in person or by live video before paying anything',
        'Check the landlord owns or manages the unit',
        'Note the move-in date, rent, what is included and the deposit amount',
      ],
      howTo:
        '1. Most private residential tenancies that began on or after April 30, 2018 use Ontario\'s standard lease form.\n2. If a landlord doesn\'t provide it after a written request, the tenant can withhold one month\'s rent; the landlord has 21 days to comply.\n3. A rent deposit can be at most one month\'s rent (or one week\'s, if paid weekly) and only goes toward the last rental period; the landlord pays interest on it each year at the rent increase guideline rate.\n4. Disputes go to the Landlord and Tenant Board.\n5. For a purchase, the lawyer handles the transfer; the timing here is an estimate.',
    },
    {
      id: 'school',
      title: 'Register the children at the new school',
      offsetDays: -14,
      durationDays: 14,
      dependsOn: ['lease'],
      documents: ['School registration form', 'Proof of address'],
      prepare: [
        'Find the school for the new address with the school board\'s locator',
        'Child\'s birth certificate or other proof of age',
        'Latest report card and immunization record',
        'Choose between the public and Catholic boards, English or French, if eligible',
      ],
      howTo:
        '1. Ontario school boards assign schools by home address.\n2. Registration is done with the school or the board; each board sets its own list of papers.\n3. Public health units ask for the child\'s immunization record.',
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
      title: 'Set up electricity, gas, water and internet',
      offsetDays: -7,
      durationDays: 7,
      dependsOn: ['lease'],
      documents: ['Utility account numbers'],
      prepare: [
        'Check which utilities the lease includes',
        'The local electricity utility, or Hydro One in many rural areas',
        'Enbridge Gas for natural gas in most of Ontario',
        'Close or move the accounts at the old home',
      ],
      howTo:
        '1. Start dates are set online or by phone with each provider.\n2. Water is billed by the municipality or through the landlord.\n3. Internet installs can take a week or more to book.',
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
        '1. Tenant insurance covers belongings and liability; the building\'s own policy usually does not.\n2. The standard lease has a section where the landlord can ask for proof of tenant insurance.\n3. Moving an existing policy is usually a call to the insurer.',
    },
    {
      id: 'move-in-record',
      title: 'Record the unit\'s condition on moving day',
      offsetDays: 0,
      durationDays: 1,
      dependsOn: ['lease'],
      documents: ['Dated photos of the unit'],
      prepare: ['Photos or video of every room', 'A list of existing damage, sent to the landlord by email'],
      howTo:
        '1. Ontario has no set move-in inspection form.\n2. A dated record sent to the landlord helps if a question about damage comes up at the Landlord and Tenant Board later.',
      conditions: ['Only if you rent'],
    },
    {
      id: 'serviceontario-address',
      title: 'Update the address for the licence, vehicle permit and health card',
      offsetDays: 6,
      durationDays: 6,
      dependsOn: [],
      documents: ['Updated driver\'s licence'],
      prepare: ['ServiceOntario account', 'Driver\'s licence number and issue date', 'Health card number and version code'],
      howTo:
        '1. Ontario gives 6 days after moving to update the driver\'s licence and the vehicle permit, and 30 days for the health card.\n2. All three are free and can be done online through a ServiceOntario account or in person.\n3. A new licence arrives by mail in 4 to 6 weeks; no new health card is issued, only the record.\n4. Check with ServiceOntario how the updated vehicle permit is delivered.',
      conditions: ['Only if you moved within Ontario'],
    },
    {
      id: 'ohip',
      title: 'Apply for OHIP at ServiceOntario',
      offsetDays: 7,
      durationDays: 7,
      dependsOn: [],
      documents: ['OHIP registration form', 'Ontario health card'],
      prepare: [
        'Three separate original documents: citizenship or immigration status, Ontario residency, identity',
        'Book a ServiceOntario visit',
        'Tell the old province\'s health plan the moving date and ask when its coverage ends',
      ],
      howTo:
        '1. Ontario removed the 3-month OHIP waiting period in 2020; eligible people are covered once eligibility is accepted.\n2. The application is made in person with original documents.\n3. Eligibility includes making Ontario the primary home and being physically present 153 days in any 12-month period.\n4. Check the end date of the old province\'s plan so there is no gap.',
      conditions: ['Only if you moved to Ontario from another province'],
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
      title: 'Update the voter registration with Elections Ontario and Elections Canada',
      offsetDays: 21,
      durationDays: 7,
      dependsOn: [],
      documents: [],
      prepare: ['Driver\'s licence or other ID', 'New address', 'Ticking the Elections Canada box on the tax return also shares the address with them'],
      howTo:
        '1. Elections Ontario and Elections Canada keep separate lists; each has an online registration service.\n2. Being registered at the current address avoids extra steps at the polls.',
      ages: { from: 18 },
      conditions: ['Only if you are a Canadian citizen'],
    },
    {
      id: 'vehicle',
      title: 'Register the vehicle in Ontario',
      offsetDays: 30,
      durationDays: 14,
      dependsOn: [],
      documents: ['Ontario vehicle permit and plates', 'Ontario auto insurance'],
      prepare: [
        'Old province\'s registration',
        'Safety Standards Certificate from an Ontario inspection station',
        'Proof of Ontario insurance',
      ],
      howTo:
        '1. Vehicles brought from another province are registered at ServiceOntario.\n2. A Safety Standards Certificate is usually asked for first.\n3. The 30 days here is an estimate; check the current deadline with ServiceOntario.',
      conditions: ['Only if you moved to Ontario from another province', 'Only if you own a vehicle'],
    },
    {
      id: 'doctor',
      title: 'Register with Health Care Connect for a family doctor',
      offsetDays: 30,
      durationDays: 7,
      dependsOn: ['ohip', 'serviceontario-address'],
      documents: [],
      prepare: ['Ontario health card', 'New address, email and phone'],
      howTo:
        '1. Health Care Connect refers people without a family doctor or nurse practitioner to one accepting patients.\n2. Register online or by calling 8-1-1 with a valid health card.\n3. The mailing address given has to match the health card record, so the health card address is updated first.\n4. Waits vary by area.',
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
      title: 'Exchange the driver\'s licence',
      offsetDays: 60,
      durationDays: 30,
      dependsOn: [],
      documents: ['Ontario driver\'s licence', 'Licence from the old province'],
      prepare: [
        'Visit a DriveTest centre',
        'Original accepted identity documents with legal name and date of birth',
        'Proof of driving experience, if the licence doesn\'t show it',
        'Licence fee',
      ],
      howTo:
        '1. New residents have 60 days to exchange a valid licence from another province for an Ontario licence.\n2. Licences from other Canadian provinces can be exchanged; a vision, knowledge or road test may apply depending on the class and driving history.\n3. Since May 11, 2026, applicants declare that Ontario is their primary residence.',
      conditions: ['Only if you moved to Ontario from another province', 'Only if you drive'],
    },
  ],
};
