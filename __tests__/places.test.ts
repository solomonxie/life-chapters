import { placeLabel, placeShort, searchPlaces } from '../src/domain/places';

const labels = (q: string) => searchPlaces(q).map(placeLabel);

describe('searchPlaces', () => {
  it('puts the biggest prefix match first', () => {
    expect(labels('toron')[0]).toBe('Toronto, Ontario, Canada');
  });

  it('finds a Chinese place by its Chinese name, and only Chinese places', () => {
    expect(labels('南昌')[0]).toMatch(/^Nanchang, Jiangxi/);
    expect(labels('多伦多')).toEqual([]);
  });

  it('names places in English', () => {
    expect(labels('montréal')[0]).toBe('Montreal, Quebec, Canada');
    expect(labels('sao paulo')[0]).toBe('Sao Paulo, Brazil');
    expect(labels('tokyo')[0]).toBe('Tokyo, Japan');
  });

  it('puts places in the country they live in first', () => {
    expect(labels('richmond')[0]).toBe('Richmond, Virginia, United States');
    expect(searchPlaces('richmond', 8, 'Canada').map(placeLabel)[0]).toBe('Richmond, British Columbia, Canada');
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
