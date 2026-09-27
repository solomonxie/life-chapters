import { BUNDLED_PLAYBOOKS } from '../src/content';
import { kindById } from '../src/domain/kinds';
import { validatePlaybook } from '../src/domain/playbook';
import { schedule } from '../src/domain/schedule';

describe.each(BUNDLED_PLAYBOOKS.map(p => [p.id, p] as const))('%s', (_, playbook) => {
  it('passes the same validation an imported file would', () => {
    expect(validatePlaybook(JSON.parse(JSON.stringify(playbook)))).toMatchObject({ ok: true });
  });

  it('hangs off a kind of date the anchor editor offers', () => {
    expect(kindById(playbook.anchorKind)).toBeDefined();
  });

  it('schedules without a step already at risk', () => {
    const track = { id: 't', playbookId: playbook.id, anchorEventDate: '2028-02-01' };
    expect(schedule(playbook, track, []).filter(s => s.atRisk)).toEqual([]);
  });

  it('never phrases a step as advice', () => {
    const text = JSON.stringify(playbook.steps);
    expect(text).not.toMatch(/\byou must\b|\brequired by law\b|\bguarantee(?!d Income Supplement)/i);
  });

  it('says who it is for, with an age range when it counts from a birth', () => {
    expect(playbook.conditions?.length).toBeGreaterThan(0);
    if (['born', 'child-born'].includes(playbook.anchorKind)) expect(playbook.ages).toBeDefined();
  });

  it('carries a review date and sources', () => {
    expect(playbook.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(playbook.sources?.length).toBeGreaterThan(0);
  });
});

describe('provinces', () => {
  const provincial = BUNDLED_PLAYBOOKS.filter(p => p.province);

  it('gives every provincial plan a family, one per province', () => {
    const keys = provincial.map(p => `${p.family}:${p.province}`);
    expect(provincial.every(p => p.family)).toBe(true);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('ships a British Columbia twin for every Ontario plan', () => {
    const families = (code: string) => provincial.filter(p => p.province === code).map(p => p.family).sort();
    expect(families('BC')).toEqual(families('ON'));
  });
});
