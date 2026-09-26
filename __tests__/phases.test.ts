import { currentPhase, derivePhases } from '../src/domain/phases';
import type { LifeEvent } from '../src/domain/types';

const events: LifeEvent[] = [
  { id: 'b', label: 'Born', date: '1991-04-12', source: 'anchor' },
  { id: 'm', label: 'Migrated', date: '2024-09-14', source: 'anchor' },
  { id: 'c', label: 'Citizenship eligible', date: '2029-09-14', source: 'derived' },
];

describe('phases', () => {
  it('folds events into contiguous intervals, last one open-ended', () => {
    const phases = derivePhases(events, '2026-09-26');
    expect(phases.map(p => [p.start, p.end])).toEqual([
      ['1991-04-12', '2024-09-14'],
      ['2024-09-14', '2029-09-14'],
      ['2029-09-14', null],
    ]);
  });

  it('marks exactly one phase current', () => {
    const phases = derivePhases(events, '2026-09-26');
    expect(phases.filter(p => p.isCurrent)).toHaveLength(1);
    expect(currentPhase(phases)?.label).toBe('Migrated');
  });

  it('sorts unordered input', () => {
    const phases = derivePhases([...events].reverse(), '2026-09-26');
    expect(phases[0].label).toBe('Born');
  });

  it('has no current phase when every event is ahead', () => {
    const phases = derivePhases(events, '1980-01-01');
    expect(currentPhase(phases)).toBeUndefined();
  });

  it('a phase boundary belongs to the later phase', () => {
    expect(currentPhase(derivePhases(events, '2024-09-14'))?.label).toBe(
      'Migrated',
    );
  });
});
