import type { Stored } from './plan';

/**
 * Where the plan lives between launches. `save` gets the whole state; an
 * implementation writes only what changed.
 */
export interface Repository {
  load(): Promise<Stored | null>;
  save(state: Stored): Promise<void>;
}
