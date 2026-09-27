import { isStale, validatePlaybook } from '../src/domain/playbook';

const valid = {
  id: 'p',
  title: 'P',
  anchorKind: 'migrated',
  reviewedAt: '2026-01-01',
  steps: [
    { id: 'a', title: 'Book test', offsetDays: -10, durationDays: 5, dependsOn: [] },
    { id: 'b', title: 'Lodge EOI', offsetDays: 0, durationDays: 1, dependsOn: ['a'] },
  ],
};

const withSteps = (steps: unknown[]) => ({ ...valid, steps });

describe('playbook import', () => {
  it('accepts a well-formed file and fills in empty lists', () => {
    const r = validatePlaybook(valid);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.playbook.steps[0].documents).toEqual([]);
  });

  it('names both steps of a cycle by title', () => {
    const r = validatePlaybook(
      withSteps([
        { id: 'a', title: 'Book test', offsetDays: 0, durationDays: 1, dependsOn: ['b'] },
        { id: 'b', title: 'Lodge EOI', offsetDays: 0, durationDays: 1, dependsOn: ['a'] },
      ]),
    );
    expect(r).toEqual({
      ok: false,
      error: 'Step "Book test" depends on "Lodge EOI", which depends back on it.',
    });
  });

  it('names a dangling dependency', () => {
    const r = validatePlaybook(
      withSteps([{ id: 'a', title: 'Lodge', offsetDays: 0, durationDays: 1, dependsOn: ['ghost'] }]),
    );
    expect(r.ok || r.error).toContain('"ghost"');
  });

  it.each([
    [{ ...valid, reviewedAt: undefined }, 'review date'],
    [{ ...valid, anchorKind: '' }, 'anchorKind'],
    [withSteps([]), 'no steps'],
    [withSteps([{ id: 'a', title: 'A', offsetDays: 1.5, durationDays: 1 }]), 'offset'],
    [withSteps([{ id: 'a', title: 'A', offsetDays: 0, durationDays: -1 }]), 'duration'],
    [withSteps([{ id: 'a', title: 'A', offsetDays: 0, durationDays: 1, validForDays: 0 }]), 'validity'],
    [withSteps([{ id: 'a', title: 'A', offsetDays: 0, durationDays: 1 }, { id: 'a', title: 'B', offsetDays: 0, durationDays: 1 }]), 'share the id'],
    ['nope', 'not a playbook'],
  ])('rejects %#', (input, message) => {
    const r = validatePlaybook(input);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain(message);
  });

  it('labels a playbook stale after two years, never before', () => {
    const r = validatePlaybook(valid);
    if (!r.ok) throw new Error();
    expect(isStale(r.playbook, '2027-12-31')).toBe(false);
    expect(isStale(r.playbook, '2028-01-02')).toBe(true);
  });
});
