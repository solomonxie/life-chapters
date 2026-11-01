import {
  DEMO_DOCUMENTS,
  DEMO_DONE,
  DEMO_EVENTS,
  DEMO_GATHERED,
  DEMO_PERSON_PLANS,
  type DemoDate,
} from '../../demo/plan';
import { addDays } from '../domain/dates';
import type { CivilDate } from '../domain/types';
import { ME } from '../domain/people';
import { actions, useStore } from '../state/store';

export const demoDate = (d: DemoDate, now: CivilDate): CivilDate => {
  if (typeof d === 'string') return d;
  if ('days' in d) return addDays(now, d.days);
  return `${Number(now.slice(0, 4)) + d.years}-${d.on}`;
};

/**
 * Loads `demo/plan.ts` into whatever store is open — the demo store or the
 * throwaway qa.db, never the real plan.
 */
export function seedSample() {
  const now = useStore.getState().now;
  const at = (d: DemoDate) => demoDate(d, now);

  for (const e of DEMO_EVENTS) {
    const { date, plans = [], with: withName, ...rest } = e;
    actions.saveAnchor({ ...rest, date: at(date), personId: ME }, plans, withName);
  }

  for (const { person, plans } of DEMO_PERSON_PLANS) {
    const { plan } = useStore.getState();
    const id = plan.people.find(p => p.name === person)?.id;
    const born = plan.anchors.find(a => a.personId === id && a.kind === 'born');
    if (born) plans.forEach(pb => actions.attachTrack(pb, born.id));
  }

  for (const s of useStore.getState().view.steps.filter(x => x.dueBy < now && x.status === 'pending')) {
    actions.markDone(s.instanceId, s.dueBy);
  }

  const steps = useStore.getState().view.steps;
  for (const { title, on } of DEMO_DONE) {
    const s = steps.find(x => title.test(x.title) && x.status === 'pending');
    if (s) actions.markDone(s.instanceId, at(on));
  }
  for (const title of DEMO_GATHERED) {
    const s = steps.find(x => title.test(x.title));
    if (s?.template.documents[0]) actions.toggleDocument(s.instanceId, s.template.documents[0]);
  }

  for (const { person, issuedOn, expiresOn, ...doc } of DEMO_DOCUMENTS) {
    const owner = person ? useStore.getState().plan.people.find(p => p.name === person)?.id : ME;
    if (!owner) continue;
    if (useStore.getState().mine.person.id !== owner) actions.switchPerson(owner);
    actions.saveDocument({
      ...doc,
      issuedOn: issuedOn && at(issuedOn),
      expiresOn: expiresOn && at(expiresOn),
    });
  }
  actions.switchPerson(ME);
  actions.dismissToast();
}
