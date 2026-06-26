// Applies scripts/enable-rls.sql to the database using the DIRECT_URL
// (table-owner postgres role) so RLS can be enabled and policies created.
//
// Usage: node scripts/enable-rls.mjs [--check]
//   --check  Only print current RLS status, make no changes.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadDirectUrl() {
  for (const file of [".env.local", ".env.production.local", ".env.prod"]) {
    try {
      const env = readFileSync(join(root, file), "utf8");
      const m = env.match(/^DIRECT_URL="?([^"\n]+)"?/m);
      if (m) return m[1];
    } catch {
      /* file missing — try next */
    }
  }
  if (process.env.DIRECT_URL) return process.env.DIRECT_URL;
  throw new Error("DIRECT_URL not found in env files or process env");
}

const checkOnly = process.argv.includes("--check");
const client = new pg.Client({
  connectionString: loadDirectUrl(),
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  const status = async () => {
    const { rows } = await client.query(`
      SELECT c.relname AS table,
             c.relrowsecurity AS rls,
             (SELECT count(*) FROM pg_policies p
                WHERE p.schemaname = 'public' AND p.tablename = c.relname) AS policies
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relkind = 'r'
      ORDER BY c.relrowsecurity, c.relname;
    `);
    for (const r of rows) {
      console.log(`  ${r.rls ? "RLS " : "OPEN"}  policies=${r.policies}  ${r.table}`);
    }
    console.log(
      `  → ${rows.length} tables, ${rows.filter((r) => !r.rls).length} without RLS`,
    );
  };

  console.log("Before:");
  await status();

  if (checkOnly) {
    console.log("\n--check: no changes made.");
  } else {
    // Find only the tables that still have RLS disabled. Skipping the ones that
    // already have it avoids taking a needless ACCESS EXCLUSIVE lock on busy
    // tables like `companies` (which is already RLS-enabled).
    const { rows: disabled } = await client.query(`
      SELECT c.relname AS table
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.relrowsecurity = false
      ORDER BY c.relname;
    `);

    // Enable RLS one table per transaction, with a short lock_timeout so a
    // momentarily-busy table fails fast and is retried rather than blocking.
    const enableOne = async (table) => {
      for (let attempt = 1; attempt <= 4; attempt++) {
        try {
          await client.query("BEGIN");
          await client.query("SET LOCAL lock_timeout = '5s'");
          await client.query("SET LOCAL statement_timeout = '15s'");
          await client.query(
            `ALTER TABLE public.${JSON.stringify(table).slice(1, -1)} ENABLE ROW LEVEL SECURITY`,
          );
          await client.query("COMMIT");
          console.log(`  enabled RLS: ${table}`);
          return;
        } catch (e) {
          await client.query("ROLLBACK").catch(() => {});
          if (attempt === 4) throw e;
          console.log(`  retry ${attempt} for ${table} (${e.code})`);
        }
      }
    };

    console.log(`\nEnabling RLS on ${disabled.length} tables...`);
    for (const { table } of disabled) await enableOne(table);

    // Narrow published-only read policies for the two tables the browser reads.
    console.log("\nCreating public read policies...");
    for (const t of ["industry_news", "rba_insights_articles"]) {
      await client.query(`DROP POLICY IF EXISTS anon_read_published ON public.${t}`);
      await client.query(
        `CREATE POLICY anon_read_published ON public.${t}
           FOR SELECT TO anon, authenticated USING (status = 'published')`,
      );
      console.log(`  policy anon_read_published on ${t}`);
    }

    console.log("\nAfter:");
    await status();
  }
} finally {
  await client.end();
}
