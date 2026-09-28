import { createMemoryRepository } from '../src/data/memory';
import { EMPTY_PLAN } from '../src/data/plan';
import { ME } from '../src/domain/people';
import { actions, useStore } from '../src/state/store';

const state = () => useStore.getState();
const ava = () => state().plan.people.find(p => p.name === 'Ava')!;

beforeAll(async () => {
  await actions.load(createMemoryRepository());
  actions.replacePlan(EMPTY_PLAN);
});

describe('people', () => {
  it('a child event links the child and gives her a Born date on her own board', () => {
    actions.saveAnchor({ kind: 'child-born', label: 'Child born', date: '2025-03-18', precision: 'day' }, [], 'Ava');
    const mine = state().mine;
    expect(mine.person.id).toBe(ME);
    expect(mine.anchors.map(a => a.place)).toEqual(['Ava']);

    actions.switchPerson(ava().id);
    const hers = state().mine;
    expect(hers.anchors).toMatchObject([{ kind: 'born', label: 'Born', date: '2025-03-18', withPersonId: ME }]);
  });

  it('keeps each board to its own plans', () => {
    actions.attachTrack('newborn-on', state().mine.anchors[0].id);
    expect(state().mine.tracks).toHaveLength(1);
    actions.switchPerson(ME);
    expect(state().mine.tracks).toHaveLength(0);
    expect(state().plan.tracks).toHaveLength(1);
  });

  it('moving the date on one board moves it, and her plan, on the other', () => {
    const mine = state().mine.anchors[0];
    actions.saveAnchor({ ...mine, date: '2025-04-01' });
    actions.switchPerson(ava().id);
    expect(state().mine.anchors[0].date).toBe('2025-04-01');
    expect(state().mine.tracks[0].anchorEventDate).toBe('2025-04-01');
  });

  it('matches an existing person by name instead of creating a second', () => {
    actions.switchPerson(ME);
    actions.saveAnchor({ kind: 'married', label: 'Married', date: '2019-06-01', precision: 'day' }, [], 'Sam');
    actions.saveAnchor({ kind: 'married', label: 'Married', date: '2019-06-01', precision: 'day' }, [], 'sam');
    expect(state().plan.people.filter(p => p.name === 'Sam')).toHaveLength(1);
  });

  it('a place set on a wedding shows on both boards', () => {
    const wedding = state().mine.anchors.find(a => a.kind === 'married')!;
    actions.saveAnchor({ ...wedding, location: 'Toronto, Ontario, Canada' });
    const copies = state().plan.anchors.filter(a => a.linkId === wedding.linkId);
    expect(copies.map(a => a.location)).toEqual(['Toronto, Ontario, Canada', 'Toronto, Ontario, Canada']);
  });

  it('renaming a person renames the event that names them', () => {
    actions.renamePerson(ava().id, 'Ava Li');
    expect(state().mine.anchors.find(a => a.kind === 'child-born')?.place).toBe('Ava Li');
    actions.renamePerson(state().plan.people.find(p => p.name === 'Ava Li')!.id, 'Ava');
  });

  it('keeps documents apart per person', () => {
    actions.saveDocument({ id: 'passport', name: 'Passport', expiresOn: '2030-01-01' });
    actions.switchPerson(ava().id);
    actions.saveDocument({ id: 'passport', name: 'Passport', expiresOn: '2027-05-05' });
    expect(state().mine.documents).toMatchObject([{ expiresOn: '2027-05-05' }]);
    actions.switchPerson(ME);
    expect(state().mine.documents).toMatchObject([{ expiresOn: '2030-01-01' }]);
  });

  it('deleting a linked event deletes both copies but keeps the person', () => {
    const born = state().mine.anchors.find(a => a.kind === 'child-born')!;
    actions.deleteAnchor(born.id);
    expect(state().plan.anchors.some(a => a.linkId === born.linkId)).toBe(false);
    expect(state().plan.tracks).toHaveLength(0);
    expect(ava()).toBeDefined();
  });

  it('removing a person leaves the other side unlinked, and shows me', () => {
    const sam = state().plan.people.find(p => p.name === 'Sam')!;
    actions.switchPerson(sam.id);
    actions.removePerson(sam.id);
    expect(state().mine.person.id).toBe(ME);
    const wedding = state().mine.anchors.find(a => a.kind === 'married')!;
    expect(wedding.withPersonId).toBeUndefined();
    expect(wedding.place).toBe('Sam');
  });
});

describe('parents', () => {
  beforeAll(() => {
    actions.replacePlan(EMPTY_PLAN);
    actions.switchPerson(ME);
  });

  it('a parent link ties their "child born" to my Born, creating it if needed', () => {
    const momId = actions.linkPerson('Mom', 'parent', '1988-08-06', 'day')!;
    const born = state().mine.anchors.find(a => a.kind === 'born')!;
    expect(born.date).toBe('1988-08-06');
    const hers = state().plan.anchors.find(a => a.personId === momId)!;
    expect(hers).toMatchObject({ kind: 'child-born', date: '1988-08-06', linkId: born.linkId, withPersonId: ME });
  });

  it('two parents share one birth; moving it moves every copy', () => {
    actions.linkPerson('Dad', 'parent', '2000-01-01', 'day');
    const born = state().mine.anchors.find(a => a.kind === 'born')!;
    const copies = () => state().plan.anchors.filter(a => a.linkId === born.linkId);
    expect(copies()).toHaveLength(3);
    actions.saveAnchor({ ...born, date: '1988-08-07' });
    expect(copies().every(a => a.date === '1988-08-07')).toBe(true);
  });

  it("names the child on the parent's board by the child's current name", () => {
    actions.renamePerson(ME, 'Solomon');
    const mom = state().plan.people.find(p => p.name === 'Mom')!;
    actions.switchPerson(mom.id);
    expect(state().mine.anchors[0].place).toBe('Solomon');
    actions.switchPerson(ME);
  });
});

describe('the person menu', () => {
  const { menuPeople } = require('../src/domain/people') as typeof import('../src/domain/people');
  const people = [{ id: ME, name: 'Me' }, { id: 'c', name: 'Christine' }, { id: 'a', name: 'Ava' }];
  const wedding = { id: 'w', kind: 'married', label: 'Married', date: '2022-06-22', precision: 'day' as const, personId: 'c', linkId: 'l' };
  const job = { id: 'j', kind: 'first-job', label: 'First job', date: '2010-01-01', precision: 'day' as const, personId: 'a' };

  it('lists only people with an event of their own, plus whoever is showing', () => {
    expect(menuPeople(people, [wedding, job], ME).map(p => p.name)).toEqual(['Me', 'Ava']);
    expect(menuPeople(people, [wedding, job], 'c').map(p => p.name)).toEqual(['Me', 'Christine', 'Ava']);
  });
});

describe('a replaced plan', () => {
  it('goes back to Me when the person on screen is not in it', () => {
    const { actions: a, useStore: st } = require('../src/state/store') as typeof import('../src/state/store');
    const { EMPTY_PLAN: empty } = require('../src/data/plan') as typeof import('../src/data/plan');
    a.saveAnchor({ kind: 'child-born', label: 'Child born', date: '2025-03-18', precision: 'day' }, [], 'Zoe');
    a.switchPerson(st.getState().plan.people.find(p => p.name === 'Zoe')!.id);
    a.replacePlan(empty);
    a.saveAnchor({ kind: 'born', label: 'Born', date: '1990-01-01', precision: 'day' });
    expect(st.getState().mine.person.id).toBe(ME);
    expect(st.getState().mine.anchors).toHaveLength(1);
  });
});
