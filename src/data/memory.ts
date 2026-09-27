import type { Stored } from './plan';
import type { Repository } from './repository';

/** For tests and for running screens without a device database. */
export function createMemoryRepository(seed: Stored | null = null): Repository {
  let state = seed;
  return {
    load: async () => state,
    save: async next => {
      state = next;
    },
  };
}
