import { formatAges } from '../src/domain/format';
import { spoken } from '../src/ui/spoken';

describe('formatAges', () => {
  it('reads an open, single and closed range', () => {
    expect(formatAges({ from: 16 })).toBe('age 16+');
    expect(formatAges({ from: 18, to: 18 })).toBe('age 18');
    expect(formatAges({ from: 4, to: 5 })).toBe('ages 4–5');
  });
});

describe('spoken', () => {
  it('drops decorative glyphs but keeps meaning', () => {
    expect(spoken('⚠ Act now, 3')).toBe('Act now, 3');
    expect(spoken('Passport, ✓ attached')).toBe('Passport, attached');
    expect(spoken('+ Add a date')).toBe('Add a date');
    expect(spoken('from "Born" · age 16+')).toBe('from "Born" · age 16 and over');
    expect(spoken('○ Turns 40 ›')).toBe('Turns 40');
  });
});
