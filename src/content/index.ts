import type { Playbook } from '../domain/types';
import { citizenshipAu } from './playbooks/citizenship-au';
import { skilledMigrationAu } from './playbooks/skilled-migration-au';
import { startPrimarySchoolAu } from './playbooks/start-primary-school-au';

/** Shipped with the app. User-imported playbooks live in the plan instead. */
export const BUNDLED_PLAYBOOKS: Playbook[] = [
  skilledMigrationAu,
  citizenshipAu,
  startPrimarySchoolAu,
];
