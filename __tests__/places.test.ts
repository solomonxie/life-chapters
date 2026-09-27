import { placeLabel, placeShort, searchPlaces } from '../src/domain/places';

const labels = (q: string) => searchPlaces(q).map(placeLabel);

describe('searchPlaces', () => {
  it('puts the biggest prefix match first', () => {
    expect(labels('toron')[0]).toBe('Toronto, Ontario, Canada');
  });

  it('finds a place by its Chinese name', () => {
    expect(labels('南昌')[0]).toMatch(/^Nanchang, Jiangxi/);
    expect(labels('多伦多')[0]).toBe('Toronto, Ontario, Canada');
  });

  it('ignores accents', () => {
    expect(labels('montreal')[0]).toMatch(/^Montréal, Quebec, Canada/);
  });

  it('narrows by region or country after a comma', () => {
    expect(labels('london, ontario')[0]).toBe('London, Ontario, Canada');
    expect(labels('london')[0]).toMatch(/United Kingdom/);
  });

  it('has small Canadian towns', () => {
    expect(labels('canmore')[0]).toMatch(/^Canmore, Alberta/);
  });

  it('returns nothing for an empty query', () => {
    expect(searchPlaces('  ')).toEqual([]);
  });
});

it('shortens a label to the town', () => {
  expect(placeShort('Toronto, Ontario, Canada')).toBe('Toronto');
});
