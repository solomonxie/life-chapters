import { addDays } from '../domain/dates';
import { actions, useStore } from '../state/store';

/**
 * A plausible plan for QA screenshots: a few anchors, three tracks, some steps
 * done, one expiring document. Only ever loaded into the throwaway qa.db.
 */
export function seedSample() {
  const now = useStore.getState().now;
  const year = Number(now.slice(0, 4));
  actions.saveAnchor({ kind: 'born', label: 'Born', place: "Xi'an", date: '1991-04-12', precision: 'day' });
  actions.saveAnchor({ kind: 'graduated', label: 'Graduated', place: 'BSc', date: '2013-07-01', precision: 'year' });
  const migrated = actions.saveAnchor(
    { kind: 'migrated', label: 'Migrated to a country', place: 'Australia', date: `${year - 2}-09-14`, precision: 'day' },
    ['citizenship-au'],
  );
  actions.saveAnchor(
    { kind: 'visa-lodge', label: 'Lodge a visa application', place: 'Subclass 189', date: addDays(now, 560), precision: 'day' },
    ['skilled-migration-au'],
  );
  actions.saveAnchor(
    { kind: 'school-start', label: 'Starts primary school', place: 'Ava', date: `${year + 2}-02-01`, precision: 'day' },
    ['start-primary-school-au'],
  );

  const steps = useStore.getState().view.steps;
  const byTitle = (re: RegExp) => steps.find(s => re.test(s.title));
  const doneOn = (re: RegExp, on: string) => {
    const s = byTitle(re);
    if (s) actions.markDone(s.instanceId, on);
  };
  doneOn(/occupation list/i, addDays(now, -120));
  doneOn(/passport validity/i, addDays(now, -90));
  doneOn(/absences|days spent outside/i, `${year - 2}-10-01`);
  doneOn(/Record the permanent residence/i, `${year - 1}-03-01`);

  const english = byTitle(/English test/i);
  if (english) {
    actions.toggleDocument(english.instanceId, english.template.documents[0]);
  }
  actions.saveDocument({ id: 'passport', name: 'Passport', issuedOn: '2016-08-02', expiresOn: addDays(now, 150), number: 'E12345678' });
  const story = (date: string, precision: 'day' | 'month' | 'year', title: string, body: string, anchorId?: string) =>
    actions.saveEntry({ date, precision, title, body, anchorId });
  story('2003-07-01', 'month', 'The summer of the bicycle', 'Rode to the city wall every evening that July. Dad fixed the chain twice.');
  story('2013-07-01', 'year', 'Graduation', 'Rain all morning, sun for the photo. Nobody could find the gowns.');
  story(`${year - 2}-09-14`, 'day', 'Landing day', 'Two suitcases and a borrowed car. The first night we slept on the floor of an empty flat.', migrated);
  story(`${year}-07-20`, 'day', 'First winter', 'Nobody warned us the houses have no heating.');
  actions.dismissToast();
}
