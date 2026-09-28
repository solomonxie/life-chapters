import type { Playbook } from '../domain/types';
import { bornToChineseParentCa } from './playbooks/born-to-chinese-parent-ca';
import { citizenshipCa } from './playbooks/citizenship-ca';
import { comingOfAgeBc } from './playbooks/coming-of-age-bc';
import { comingOfAgeCn } from './playbooks/coming-of-age-cn';
import { comingOfAgeOn } from './playbooks/coming-of-age-on';
import { earlyYearsBc } from './playbooks/early-years-bc';
import { earlyYearsCn } from './playbooks/early-years-cn';
import { earlyYearsOn } from './playbooks/early-years-on';
import { firstJobCa } from './playbooks/first-job-ca';
import { firstJobCn } from './playbooks/first-job-cn';
import { graduatedCa } from './playbooks/graduated-ca';
import { graduatedCn } from './playbooks/graduated-cn';
import { highSchoolBc } from './playbooks/high-school-bc';
import { highSchoolCn } from './playbooks/high-school-cn';
import { highSchoolOn } from './playbooks/high-school-on';
import { homeBoughtBc } from './playbooks/home-bought-bc';
import { homeBoughtCn } from './playbooks/home-bought-cn';
import { homeBoughtOn } from './playbooks/home-bought-on';
import { marriageBc } from './playbooks/marriage-bc';
import { marriageCn } from './playbooks/marriage-cn';
import { marriageOn } from './playbooks/marriage-on';
import { movedCityBc } from './playbooks/moved-city-bc';
import { movedCityCn } from './playbooks/moved-city-cn';
import { movedCityOn } from './playbooks/moved-city-on';
import { newbornBc } from './playbooks/newborn-bc';
import { newbornCn } from './playbooks/newborn-cn';
import { newbornOn } from './playbooks/newborn-on';
import { pnpBc } from './playbooks/pnp-bc';
import { pnpOn } from './playbooks/pnp-on';
import { pregnancyBc } from './playbooks/pregnancy-bc';
import { pregnancyCn } from './playbooks/pregnancy-cn';
import { pregnancyOn } from './playbooks/pregnancy-on';
import { relocationBc } from './playbooks/relocation-bc';
import { relocationCn } from './playbooks/relocation-cn';
import { relocationOn } from './playbooks/relocation-on';
import { retirementBc } from './playbooks/retirement-bc';
import { retirementCn } from './playbooks/retirement-cn';
import { retirementOn } from './playbooks/retirement-on';
import { schoolYearsBc } from './playbooks/school-years-bc';
import { schoolYearsCn } from './playbooks/school-years-cn';
import { schoolYearsOn } from './playbooks/school-years-on';
import { skilledMigrationCa } from './playbooks/skilled-migration-ca';
import { travelCn } from './playbooks/travel-cn';
import { visitCanada } from './playbooks/visit-canada';

/** Shipped with the app. User-imported playbooks live in the plan instead. */
export const BUNDLED_PLAYBOOKS: Playbook[] = [
  skilledMigrationCa,
  citizenshipCa,
  relocationBc,
  relocationCn,
  relocationOn,
  pnpBc,
  pnpOn,
  travelCn,
  bornToChineseParentCa,
  marriageBc,
  marriageCn,
  marriageOn,
  pregnancyBc,
  pregnancyCn,
  pregnancyOn,
  newbornBc,
  newbornCn,
  newbornOn,
  earlyYearsBc,
  earlyYearsCn,
  earlyYearsOn,
  schoolYearsBc,
  schoolYearsCn,
  schoolYearsOn,
  highSchoolBc,
  highSchoolCn,
  highSchoolOn,
  comingOfAgeBc,
  comingOfAgeCn,
  comingOfAgeOn,
  graduatedCa,
  graduatedCn,
  firstJobCa,
  firstJobCn,
  movedCityBc,
  movedCityCn,
  movedCityOn,
  homeBoughtBc,
  homeBoughtCn,
  homeBoughtOn,
  retirementBc,
  retirementCn,
  retirementOn,
  visitCanada,
];
