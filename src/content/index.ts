import type { Playbook } from '../domain/types';
import { adultAdminBc } from './playbooks/adult-admin-bc';
import { adultAdminCn } from './playbooks/adult-admin-cn';
import { adultAdminOn } from './playbooks/adult-admin-on';
import { bornToChineseParentCa } from './playbooks/born-to-chinese-parent-ca';
import { businessStartedBc } from './playbooks/business-started-bc';
import { businessStartedCn } from './playbooks/business-started-cn';
import { businessStartedOn } from './playbooks/business-started-on';
import { carBoughtBc } from './playbooks/car-bought-bc';
import { carBoughtCn } from './playbooks/car-bought-cn';
import { carBoughtOn } from './playbooks/car-bought-on';
import { caregivingBc } from './playbooks/caregiving-bc';
import { caregivingOn } from './playbooks/caregiving-on';
import { citizenshipCa } from './playbooks/citizenship-ca';
import { cohabitingBc } from './playbooks/cohabiting-bc';
import { cohabitingOn } from './playbooks/cohabiting-on';
import { comingOfAgeBc } from './playbooks/coming-of-age-bc';
import { comingOfAgeCn } from './playbooks/coming-of-age-cn';
import { comingOfAgeOn } from './playbooks/coming-of-age-on';
import { earlyYearsBc } from './playbooks/early-years-bc';
import { earlyYearsCn } from './playbooks/early-years-cn';
import { earlyYearsOn } from './playbooks/early-years-on';
import { emigrationCn } from './playbooks/emigration-cn';
import { familyDeathBc } from './playbooks/family-death-bc';
import { familyDeathCn } from './playbooks/family-death-cn';
import { familyDeathOn } from './playbooks/family-death-on';
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
import { homeSoldBc } from './playbooks/home-sold-bc';
import { homeSoldCn } from './playbooks/home-sold-cn';
import { homeSoldOn } from './playbooks/home-sold-on';
import { jobLostBc } from './playbooks/job-lost-bc';
import { jobLostCn } from './playbooks/job-lost-cn';
import { jobLostOn } from './playbooks/job-lost-on';
import { leavingCanadaCa } from './playbooks/leaving-canada-ca';
import { marriageBc } from './playbooks/marriage-bc';
import { marriageCn } from './playbooks/marriage-cn';
import { marriageOn } from './playbooks/marriage-on';
import { movedCityBc } from './playbooks/moved-city-bc';
import { movedCityCn } from './playbooks/moved-city-cn';
import { movedCityOn } from './playbooks/moved-city-on';
import { newbornBc } from './playbooks/newborn-bc';
import { newbornCn } from './playbooks/newborn-cn';
import { newbornOn } from './playbooks/newborn-on';
import { outboundTripCn } from './playbooks/outbound-trip-cn';
import { parent60Cn } from './playbooks/parent-60-cn';
import { permitCa } from './playbooks/permit-ca';
import { pnpBc } from './playbooks/pnp-bc';
import { pnpOn } from './playbooks/pnp-on';
import { prCa } from './playbooks/pr-ca';
import { pregnancyBc } from './playbooks/pregnancy-bc';
import { pregnancyCn } from './playbooks/pregnancy-cn';
import { pregnancyOn } from './playbooks/pregnancy-on';
import { relocationBc } from './playbooks/relocation-bc';
import { relocationCn } from './playbooks/relocation-cn';
import { relocationOn } from './playbooks/relocation-on';
import { retireCa } from './playbooks/retire-ca';
import { retirementBc } from './playbooks/retirement-bc';
import { retirementCn } from './playbooks/retirement-cn';
import { retirementOn } from './playbooks/retirement-on';
import { schoolYearsBc } from './playbooks/school-years-bc';
import { schoolYearsCn } from './playbooks/school-years-cn';
import { schoolYearsOn } from './playbooks/school-years-on';
import { separatedBc } from './playbooks/separated-bc';
import { separatedCn } from './playbooks/separated-cn';
import { separatedOn } from './playbooks/separated-on';
import { skilledMigrationCa } from './playbooks/skilled-migration-ca';
import { travelCa } from './playbooks/travel-ca';
import { travelCn } from './playbooks/travel-cn';
import { visaCaCn } from './playbooks/visa-ca-cn';
import { visaCaPh } from './playbooks/visa-ca-ph';
import { visaCnPh } from './playbooks/visa-cn-ph';
import { visaGbCn } from './playbooks/visa-gb-cn';
import { visaGbPh } from './playbooks/visa-gb-ph';
import { visaJpCn } from './playbooks/visa-jp-cn';
import { visaJpPh } from './playbooks/visa-jp-ph';
import { visaPhCn } from './playbooks/visa-ph-cn';
import { visaSchengenCn } from './playbooks/visa-schengen-cn';
import { visaSchengenPh } from './playbooks/visa-schengen-ph';
import { visaUsCn } from './playbooks/visa-us-cn';
import { visaUsPh } from './playbooks/visa-us-ph';
import { visitCanada } from './playbooks/visit-canada';

/** Shipped with the app. User-imported playbooks live in the plan instead. */
export const BUNDLED_PLAYBOOKS: Playbook[] = [
  skilledMigrationCa,
  permitCa,
  prCa,
  citizenshipCa,
  relocationBc,
  relocationCn,
  relocationOn,
  pnpBc,
  pnpOn,
  leavingCanadaCa,
  emigrationCn,
  visaCaCn,
  visaCaPh,
  visaUsCn,
  visaUsPh,
  visaCnPh,
  visaPhCn,
  visaJpCn,
  visaJpPh,
  visaGbCn,
  visaGbPh,
  visaSchengenCn,
  visaSchengenPh,
  travelCa,
  travelCn,
  outboundTripCn,
  bornToChineseParentCa,
  adultAdminBc,
  adultAdminCn,
  adultAdminOn,
  marriageBc,
  marriageCn,
  marriageOn,
  cohabitingBc,
  cohabitingOn,
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
  jobLostBc,
  jobLostCn,
  jobLostOn,
  businessStartedBc,
  businessStartedCn,
  businessStartedOn,
  movedCityBc,
  movedCityCn,
  movedCityOn,
  homeBoughtBc,
  homeBoughtCn,
  homeBoughtOn,
  homeSoldBc,
  homeSoldCn,
  homeSoldOn,
  carBoughtBc,
  carBoughtCn,
  carBoughtOn,
  separatedBc,
  separatedCn,
  separatedOn,
  caregivingBc,
  caregivingOn,
  parent60Cn,
  familyDeathBc,
  familyDeathCn,
  familyDeathOn,
  retireCa,
  retirementBc,
  retirementCn,
  retirementOn,
  visitCanada,
];
