<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Working on the RBA website — setup, build, deploy, and rules

Read this whole section before changing anything. `CLAUDE.md` imports this file, so
it loads automatically at the start of every session — no one has to point you here.

## The project
Next.js 16 (App Router) + Prisma + Supabase (Postgres) + Tailwind. An Australian
strata/remedial building **directory** + defect library + repair systems + industry
news + AI tools. Live: https://www.remedialbuildingaustralia.com.au
Code lives on **mac2** at `~/Developer/remedial-building-australia` → GitHub
`Siavosh19/remedial-building-australia` (PUBLIC) → **Vercel auto-deploys `main`**.

## Build locally (ALWAYS verify before pushing — owner's rule)
- Node is at `/usr/local/bin`; a non-interactive `ssh mac2 '...'` doesn't have it on
  PATH — prefix every build/git command with `export PATH=/usr/local/bin:$PATH`
  (and `export LC_ALL=C` to silence perl/locale warnings).
- Run `npx prisma generate` first **only if** you changed `prisma/schema.prisma`.
- Build: `NODE_OPTIONS="--max-old-space-size=6144" npx next build`
  (the heap bump is REQUIRED — the 8 GB machine OOMs at the default). One build at a
  time (they fight over `.next/lock`).
- ⚠️ A full local build NEVER reaches `EXIT=0`. It always fails at the very end
  prerendering `/industry-news` with `DATABASE_URL resolved to an empty string`
  (an empty `DATABASE_URL` in `.env.production.local` shadows the real one in
  `.env.local`; Vercel has the real one). **"Green locally" = it compiled, PASSED
  the TypeScript step, and reached static page generation, and the ONLY error is
  that `/industry-news` one.** Grep the log for `Type error` / `Failed to compile`;
  if there are none, it's good to ship.

## Deploy
- `git add -A && git commit -m "..."` → `git pull --rebase origin main` (if push is
  rejected) → `git push origin main` → Vercel builds & deploys automatically.
- End commit messages with the owner's `Co-Authored-By:` line.
- Verify (public repo, no auth needed):
  `curl -s "https://api.github.com/repos/Siavosh19/remedial-building-australia/commits/<sha>/status"`
  → the `"state"` field goes `pending` → `success` (or `failure`). Builds take ~5–7 min.
- The owner has pre-approved auto-push ONCE the local build is green.

## Database (Supabase Postgres)
- You have **no direct DB access**. The **owner runs SQL himself** in the Supabase SQL
  editor — so give him exact, safe SQL: read-only diagnostics, `ALTER TABLE ... ADD
  COLUMN IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, or targeted `UPDATE ... WHERE ...`.
- A schema change = **two parts**: (1) edit `prisma/schema.prisma` so `prisma generate`
  makes the right client, AND (2) give the owner the matching SQL. There are **no
  prisma migration files** for these — columns/indexes are added as raw SQL and the
  schema is kept in sync. **Deploy code that uses a new column ONLY after the owner
  confirms the column exists**, or the live site 500s.
- Tier model (important): a company's visual tier comes from `company.plan_type` via
  `lib/directory-tier.ts` → `dirTier()`: **basic = Free, claimed = Silver** (claiming a
  listing starts a Silver trial), **featured = Gold**.

## Email (Resend)
- Sent via Resend (`lib/directory-email.ts`) FROM `info@remedialbuildingaustralia.com.au`
  (`RESEND_API_KEY` on Vercel). Domain verified in Resend (SPF via `send.` subdomain,
  DKIM `resend._domainkey`, and DMARC `_dmarc` `p=none`).
- Admin notifications (new signup/listing/quote/claim) all go to `info@…` (hardcoded).
- Proton Mail can DEFER new-domain mail ("Delivery Delayed") on reputation — not a bug;
  Gmail/Outlook/business email deliver fine.

## DNS (VentraIP)
- Nameservers `ns1/2/3.nameserver.net.au`. The **owner edits DNS** in VentraIP
  VIPControl → Manage DNS. You **cannot** edit DNS (web panel, no API); you **can**
  verify records with `dig` (e.g. `dig +short TXT _dmarc.remedialbuildingaustralia.com.au @8.8.8.8`).

## What an agent here CAN / CANNOT do
- CAN: ssh to mac2, read/edit code, build, `git push` (→ Vercel), `dig` DNS, write SQL
  for the owner to run, read the repo.
- CANNOT: touch the DB directly, edit DNS, log into any web dashboard
  (Vercel / Resend / VentraIP / Supabase UI / GitHub UI), send/receive email, or run a
  browser. For any of those, give the owner exact click-by-click steps or exact SQL.

## Rules for every agent (follow the same structure)
1. **Build green locally before pushing.**
2. **Record your work in clear, descriptive git commits** — `git log` IS the project
   diary; no separate hand-written log is needed.
3. **Keep the Open Tasks list below current** — remove what you finished, add new items.

## Open tasks (keep current)
- [ ] **Phone:** set the "Sydney Remedial Builders" listing phone to `1300 849 584`.
      Deferred by owner — needs the exact company id first (several similar Sydney
      names exist), then owner runs `UPDATE companies SET phone='1300849584' WHERE id=<id>;`.
- [ ] **Proton email:** retest deliverability to proton.me (DMARC now set; Proton may
      still defer new-domain mail — consider domain warmup). System is otherwise fine.
- [ ] **(Nice-to-have)** "Services offered" field is editor-only; add it to the signup
      form for full parity if the owner wants it.
