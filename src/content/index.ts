import type { Playbook } from '../domain/types';
import { citizenshipCa } from './playbooks/citizenship-ca';
import { comingOfAgeCa } from './playbooks/coming-of-age-ca';
import { earlyYearsCa } from './playbooks/early-years-ca';
import { highSchoolOn } from './playbooks/high-school-on';
import { marriageOn } from './playbooks/marriage-on';
import { newbornCa } from './playbooks/newborn-ca';
import { pregnancyCa } from './playbooks/pregnancy-ca';
import { retirementCa } from './playbooks/retirement-ca';
import { schoolYearsOn } from './playbooks/school-years-on';
import { skilledMigrationCa } from './playbooks/skilled-migration-ca';

/** Shipped with the app. User-imported playbooks live in the plan instead. */
export const BUNDLED_PLAYBOOKS: Playbook[] = [
  skilledMigrationCa,
  citizenshipCa,
  marriageOn,
  pregnancyCa,
  newbornCa,
  earlyYearsCa,
  schoolYearsOn,
  highSchoolOn,
  comingOfAgeCa,
  retirementCa,
];
