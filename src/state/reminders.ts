import { create } from 'zustand';
import type { Permission } from '../platform';
import type { CivilDate } from '../domain/types';

/** What iOS currently holds for us; written by the sync service. */
export interface ReminderState {
  permission: Permission;
  queued: number;
  wanted: number;
  through: CivilDate | null;
  calendarDenied: boolean;
}

export const useReminders = create<ReminderState>(() => ({
  permission: 'undetermined',
  queued: 0,
  wanted: 0,
  through: null,
  calendarDenied: false,
}));
