import { addDays } from '../domain/dates';
import { actions, useStore } from '../state/store';

/**
 * A plausible plan for QA screenshots: a few dates, a partner and a child with
 * boards of their own, some steps done, one expiring document. Only ever loaded into the throwaway qa.db.
 */
export function seedSample() {
  const now = useStore.getState().now;
  const year = Number(now.slice(0, 4));
  actions.saveAnchor({ kind: 'born', label: 'Born', location: "Xi'an, Shaanxi, China", date: '1991-04-12', precision: 'day' });
  actions.saveAnchor({ kind: 'graduated', label: 'Graduated', place: 'BSc', date: '2013-07-01', precision: 'year', note: 'Rain all morning, sun for the photo. Nobody could find the gowns.' });
  actions.saveAnchor(
    { kind: 'migrated', label: 'Relocated to a country', place: 'Canada', location: 'Vancouver, British Columbia, Canada', date: `${year - 2}-09-14`, precision: 'day', note: 'Two suitcases and a borrowed car. The first night we slept on the floor of an empty flat.' },
    ['relocation-bc'],
  );
  actions.saveAnchor(
    { kind: 'visa-lodge', label: 'Apply for permanent residence', place: 'Express Entry', date: addDays(now, 560), precision: 'day' },
    ['skilled-migration-ca'],
  );
  actions.saveAnchor({ kind: 'married', label: 'Married', date: '2019-06-01', precision: 'day' }, [], 'Sam');
  actions.saveAnchor({ kind: 'child-born', label: 'Child born', date: `${year - 2}-03-18`, precision: 'day' }, [], 'Ava');
  const { plan } = useStore.getState();
  const ava = plan.people.find(p => p.name === 'Ava');
  const avaBorn = plan.anchors.find(a => a.personId === ava?.id && a.kind === 'born');
  if (avaBorn) {
    actions.attachTrack('early-years-bc', avaBorn.id);
    actions.attachTrack('school-years-bc', avaBorn.id);
  }

  const steps = useStore.getState().view.steps;
  const byTitle = (re: RegExp) => steps.find(s => re.test(s.title));
  const doneOn = (re: RegExp, on: string) => {
    const s = byTitle(re);
    if (s) actions.markDone(s.instanceId, on);
  };
  doneOn(/eligibility and the CRS/i, addDays(now, -120));
  doneOn(/passport validity/i, addDays(now, -90));
  doneOn(/absences|days spent outside/i, `${year - 2}-10-01`);

  const language = byTitle(/language test/i);
  if (language) {
    actions.toggleDocument(language.instanceId, language.template.documents[0]);
  }
  actions.saveDocument({ id: 'passport', name: 'Passport', issuedOn: '2016-08-02', expiresOn: addDays(now, 150), number: 'E12345678' });
  actions.dismissToast();
}
