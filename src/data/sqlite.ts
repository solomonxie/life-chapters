import { open, type DB } from '@op-engineering/op-sqlite';
import { EMPTY_PLAN, DEFAULT_SETTINGS, type Stored } from './plan';
import type { Repository } from './repository';

const TABLES = ['anchors', 'playbooks', 'tracks', 'instances', 'documents'] as const;
type Table = (typeof TABLES)[number];

/** Each migration runs once, in order, recorded in `migrations`. */
const MIGRATIONS: string[][] = [
  [
    ...TABLES.map(t => `CREATE TABLE IF NOT EXISTS ${t} (id TEXT PRIMARY KEY, json TEXT NOT NULL)`),
    'CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, json TEXT NOT NULL)',
  ],
];

async function migrate(db: DB) {
  await db.execute(
    'CREATE TABLE IF NOT EXISTS migrations (version INTEGER PRIMARY KEY, applied_on TEXT NOT NULL)',
  );
  const { rows } = await db.execute('SELECT MAX(version) AS v FROM migrations');
  const current = Number(rows[0]?.v ?? 0);
  for (let v = current + 1; v <= MIGRATIONS.length; v++) {
    await db.transaction(async tx => {
      for (const sql of MIGRATIONS[v - 1]) await tx.execute(sql);
      await tx.execute('INSERT INTO migrations (version, applied_on) VALUES (?, ?)', [
        v,
        new Date().toISOString(),
      ]);
    });
  }
}

/** One row per entity, JSON body. The plan is small; the diff keeps writes smaller. */
export function createSqliteRepository(name = 'life-planner.db'): Repository {
  let db: DB | null = null;
  let ready: Promise<DB> | null = null;
  const written = new Map<string, string>();

  const conn = () => {
    ready ??= (async () => {
      db = open({ name });
      await migrate(db);
      return db;
    })();
    return ready;
  };

  return {
    async load() {
      const d = await conn();
      const out: Stored = {
        ...structuredCloneSafe(EMPTY_PLAN),
        settings: DEFAULT_SETTINGS,
        moves: {},
      };
      let any = false;
      for (const t of TABLES) {
        const { rows } = await d.execute(`SELECT id, json FROM ${t}`);
        (out[t] as unknown[]) = rows.map(r => {
          written.set(`${t}:${r.id}`, String(r.json));
          return JSON.parse(String(r.json));
        });
        any ||= rows.length > 0;
      }
      const { rows } = await d.execute('SELECT key, json FROM meta');
      for (const r of rows) {
        written.set(`meta:${r.key}`, String(r.json));
        if (r.key === 'settings') {
          out.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(String(r.json)) };
        }
        if (r.key === 'moves') out.moves = JSON.parse(String(r.json));
        any = true;
      }
      return any ? out : null;
    },

    async save(state) {
      const d = await conn();
      const next = new Map<string, string>();
      for (const t of TABLES) {
        for (const row of state[t] as Array<{ id: string }>) {
          next.set(`${t}:${row.id}`, JSON.stringify(row));
        }
      }
      next.set('meta:settings', JSON.stringify(state.settings));
      next.set('meta:moves', JSON.stringify(state.moves));

      const upserts = [...next].filter(([k, v]) => written.get(k) !== v);
      const deletes = [...written.keys()].filter(k => !next.has(k));
      if (upserts.length === 0 && deletes.length === 0) return;

      await d.transaction(async tx => {
        for (const [key, json] of upserts) {
          const [table, id] = split(key);
          const col = table === 'meta' ? 'key' : 'id';
          await tx.execute(
            `INSERT OR REPLACE INTO ${table} (${col}, json) VALUES (?, ?)`,
            [id, json],
          );
        }
        for (const key of deletes) {
          const [table, id] = split(key);
          const col = table === 'meta' ? 'key' : 'id';
          await tx.execute(`DELETE FROM ${table} WHERE ${col} = ?`, [id]);
        }
      });
      for (const [k, v] of upserts) written.set(k, v);
      for (const k of deletes) written.delete(k);
    },
  };
}

const split = (key: string): [Table | 'meta', string] => {
  const i = key.indexOf(':');
  return [key.slice(0, i) as Table | 'meta', key.slice(i + 1)];
};

const structuredCloneSafe = <T>(v: T): T => JSON.parse(JSON.stringify(v));
