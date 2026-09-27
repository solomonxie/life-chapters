import type { Playbook } from '../domain/types';
import { citizenshipCa } from './playbooks/citizenship-ca';
import { comingOfAgeBc } from './playbooks/coming-of-age-bc';
import { comingOfAgeOn } from './playbooks/coming-of-age-on';
import { earlyYearsBc } from './playbooks/early-years-bc';
import { earlyYearsOn } from './playbooks/early-years-on';
import { highSchoolBc } from './playbooks/high-school-bc';
import { highSchoolOn } from './playbooks/high-school-on';
import { marriageBc } from './playbooks/marriage-bc';
import { marriageOn } from './playbooks/marriage-on';
import { newbornBc } from './playbooks/newborn-bc';
import { newbornOn } from './playbooks/newborn-on';
import { pregnancyBc } from './playbooks/pregnancy-bc';
import { pregnancyOn } from './playbooks/pregnancy-on';
import { retirementBc } from './playbooks/retirement-bc';
import { retirementOn } from './playbooks/retirement-on';
import { schoolYearsBc } from './playbooks/school-years-bc';
import { schoolYearsOn } from './playbooks/school-years-on';
import { skilledMigrationCa } from './playbooks/skilled-migration-ca';

/** Shipped with the app. User-imported playbooks live in the plan instead. */
export const BUNDLED_PLAYBOOKS: Playbook[] = [
  skilledMigrationCa,
  citizenshipCa,
  marriageOn,
  marriageBc,
  pregnancyOn,
  pregnancyBc,
  newbornOn,
  newbornBc,
  earlyYearsOn,
  earlyYearsBc,
  schoolYearsOn,
  schoolYearsBc,
  highSchoolOn,
  highSchoolBc,
  comingOfAgeOn,
  comingOfAgeBc,
  retirementOn,
  retirementBc,
];
