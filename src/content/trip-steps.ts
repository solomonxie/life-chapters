import type { Source, StepTemplate } from '../domain/types';

/** Shared by every visa plan: steps about the trip itself, not the visa. */

export const insuranceCheck = (): StepTemplate => ({
  id: 'insurance-check',
  title: 'Check travel medical insurance covers the whole trip',
  offsetDays: -21,
  durationDays: 3,
  dependsOn: [],
  documents: ['Insurance policy'],
  prepare: [
    'Cover dates from departure to the return flight, with a margin for delays',
    'Medical and emergency evacuation limits',
    'Whether pre-existing conditions are covered',
    "Policy number and the insurer's 24-hour assistance number, on paper too",
    'Whether a credit card or employer plan already covers travel abroad',
  ],
  howTo:
    "1. Public health cover from home usually pays little or nothing abroad; check what yours does.\n2. Hospital care for visitors is billed at full price in many countries, the US especially.\n3. If the return date moves, extend the policy to match.\n4. Where a visa sets a minimum cover, the visa steps in this plan say so.",
});

export interface BorderNotes {
  prepare?: string[];
  howTo?: string[];
}

export const borderPrep = (notes: BorderNotes = {}): StepTemplate => ({
  id: 'border-prep',
  title: 'Get ready for the border check on arrival',
  offsetDays: -5,
  durationDays: 3,
  dependsOn: [],
  documents: ['Passport', 'Visa or travel authorisation', 'Return or onward ticket'],
  prepare: [
    "Address where you'll stay, and your host's name and phone",
    'Proof of funds: bank card, a recent statement',
    "Papers for the trip's purpose: invitation, hotel booking or business letter",
    'Paper copies in the carry-on, not only on the phone',
    ...(notes.prepare ?? []),
  ],
  howTo: [
    'A visa or visa-free status lets you ask to enter; the border officer decides admission and how long you may stay.',
    'Expect questions on purpose, length of stay, where you stay and who pays; answers that match the visa application are the easiest to check.',
    'Bags can be inspected, and in some countries phones and laptops too.',
    "Declare food, plants, medicine and cash over the country's limit as the customs form asks.",
    ...(notes.howTo ?? []),
  ]
    .map((line, i) => `${i + 1}. ${line}`)
    .join('\n'),
});

export const US_BORDER: BorderNotes = {
  prepare: ['Phones and laptops you are comfortable having inspected'],
  howTo: [
    'US Customs and Border Protection (CBP) can inspect phones, laptops and other devices at the border, US citizens included; see its page on border searches of electronic devices.',
    'Cash and monetary instruments over USD 10,000 in total are reported on FinCEN Form 105.',
    'Visa forms ask for social media identifiers; keep what you give at the border consistent with the application.',
  ],
};

export const US_BORDER_SOURCES: Source[] = [
  { title: 'Know before you visit — U.S. Customs and Border Protection', url: 'https://www.cbp.gov/travel/international-visitors/know-before-you-visit' },
  { title: 'Border search of electronic devices — U.S. Customs and Border Protection', url: 'https://www.cbp.gov/travel/cbp-search-authority/border-search-electronic-devices' },
];

export const businessLetter = (offsetDays: number): StepTemplate => ({
  id: 'business-letter',
  title: 'Get a business invitation and an employer letter',
  offsetDays,
  durationDays: 21,
  purposes: ['business'],
  dependsOn: [],
  documents: ['Invitation letter from the company you visit', 'Employer letter'],
  prepare: [
    'Who you meet, where, and on which dates',
    'Who pays for travel and the stay',
    'Your role, salary and approved leave or travel dates',
  ],
  howTo:
    "1. A business visitor attends meetings, conferences or negotiations; paid work for a local company usually needs a work visa instead.\n2. Ask the host company for a letter naming you, the purpose, the dates and who covers costs.\n3. Ask your employer for a letter confirming your job, salary and the trip's purpose.\n4. Carry both on the flight too; the border officer may ask.",
});

export const i94Check = (after: string, offsetDays: number): StepTemplate => ({
  id: 'i94-check',
  title: 'Check the I-94 shows the departure',
  offsetDays,
  endOffsetDays: 7,
  durationDays: 1,
  dependsOn: [after],
  documents: ['I-94 record', 'Boarding passes'],
  prepare: ['Passport used to enter'],
  howTo:
    "1. Look up the travel history on the CBP I-94 site; the departure shows once the airline reports it.\n2. If it is missing, the CBP site explains how to send proof of departure, such as boarding passes and passport stamps.\n3. A missing departure can read as an overstay at the next visa application.",
});
