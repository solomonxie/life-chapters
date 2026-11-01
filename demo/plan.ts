/**
 * The demo data plan (Settings › Demo data): one family two years into a move from Xi'an to
 * Vancouver. Recent dates are relative to today so the plan never goes stale:
 * `{ years: -2, on: '09-14' }` is Sep 14 two years ago, `{ days: 560 }` is
 * 560 days from today.
 */
export type DemoDate = string | { years: number; on: string } | { days: number };

export interface DemoEvent {
  kind: string;
  label: string;
  date: DemoDate;
  precision: 'year' | 'month' | 'day';
  place?: string;
  location?: string;
  note?: string;
  /** Bundled playbook ids to start on this event. */
  plans?: string[];
  /** Spouse or child: gets a board of their own. */
  with?: string;
}

export interface DemoPersonPlan {
  person: string;
  /** Playbooks on that person's Born. */
  plans: string[];
}

export interface DemoDocument {
  id: string;
  name: string;
  /** Whose; absent means Me. */
  person?: string;
  issuedOn?: DemoDate;
  expiresOn?: DemoDate;
  number?: string;
  noExpiry?: boolean;
}

const XIAN = "Xi'an, Shaanxi, China";
const VANCOUVER = 'Vancouver, British Columbia, Canada';

export const DEMO_EVENTS: DemoEvent[] = [
  { kind: 'born', label: 'Born', location: XIAN, date: '1991-04-12', precision: 'day' },
  {
    kind: 'graduated',
    label: 'Graduated',
    place: 'BSc Computer Science',
    location: XIAN,
    date: '2013-07-01',
    precision: 'year',
    note: 'Rain all morning, sun for the photo. Nobody could find the gowns.',
  },
  {
    kind: 'first-job',
    label: 'First job',
    place: 'Junior developer',
    location: 'Shenzhen, Guangdong, China',
    date: '2013-09-02',
    precision: 'month',
    note: 'A desk by the window and a lead who answered every question twice without sighing.',
  },
  {
    kind: 'married',
    label: 'Married',
    with: 'Sam',
    location: XIAN,
    date: '2019-06-01',
    precision: 'day',
    note: 'Forty guests, one rainstorm, and my grandmother dancing to the end.',
  },
  {
    kind: 'visa-granted',
    label: 'Permit or visa granted',
    place: 'Open work permit',
    date: { years: -2, on: '07-30' },
    precision: 'day',
    plans: ['permit-ca'],
  },
  {
    kind: 'migrated',
    label: 'Relocated to a country',
    place: 'Canada',
    location: VANCOUVER,
    date: { years: -2, on: '09-14' },
    precision: 'day',
    note: 'Two suitcases and a borrowed car. The first night we slept on the floor of an empty flat.',
    plans: ['relocation-bc'],
  },
  {
    kind: 'child-born',
    label: 'Child born',
    with: 'Ava',
    location: VANCOUVER,
    date: { years: -1, on: '03-18' },
    precision: 'day',
    note: 'Born at 4:12 in the morning, eight minutes after the snow started.',
  },
  {
    kind: 'car-bought',
    label: 'Bought a car',
    place: 'Used Corolla',
    location: VANCOUVER,
    date: { years: -1, on: '06-20' },
    precision: 'day',
    plans: ['car-bought-bc'],
  },
  { kind: 'trip', label: 'Trip abroad', place: 'China', location: XIAN, date: { days: 95 }, precision: 'day' },
  {
    kind: 'visa-lodge',
    label: 'Apply for permanent residence',
    place: 'Express Entry',
    date: { days: 560 },
    precision: 'day',
    plans: ['skilled-migration-ca'],
  },
];

export const DEMO_PERSON_PLANS: DemoPersonPlan[] = [
  { person: 'Ava', plans: ['newborn-bc', 'early-years-bc', 'school-years-bc'] },
];

/** Steps marked done on a given day, matched by title; everything already due is done too. */
export const DEMO_DONE: Array<{ title: RegExp; on: DemoDate }> = [
  { title: /eligibility and the CRS/i, on: { days: -120 } },
  { title: /passport validity/i, on: { days: -90 } },
  { title: /absences|days spent outside/i, on: { years: -2, on: '10-01' } },
];

/** Documents ticked off on open steps, by step title. */
export const DEMO_GATHERED: RegExp[] = [/language test/i];

export const DEMO_DOCUMENTS: DemoDocument[] = [
  { id: 'passport', name: 'Passport', issuedOn: '2016-08-02', expiresOn: { days: 150 }, number: 'E12345678' },
  { id: 'work-permit', name: 'Work permit', issuedOn: { years: -2, on: '07-30' }, expiresOn: { days: 310 }, number: 'U100482913' },
  { id: 'drivers-licence', name: "Driver's licence", issuedOn: { years: -1, on: '05-02' }, expiresOn: { years: 4, on: '04-12' }, number: '7765201' },
  { id: 'bc-services-card', name: 'BC Services Card', issuedOn: { years: -2, on: '12-10' }, expiresOn: { years: 3, on: '04-12' } },
  { id: 'passport', name: 'Passport', person: 'Ava', issuedOn: { years: -1, on: '05-20' }, expiresOn: { years: 4, on: '05-20' }, number: 'AB408817' },
  { id: 'birth-certificate', name: 'Birth certificate', person: 'Ava', issuedOn: { years: -1, on: '04-02' }, noExpiry: true },
];
