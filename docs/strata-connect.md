# Strata Connect — inbound work-order intake

A strata / building manager forwards a work order (or scope of works) by email to
**workorders@remedialbuildingaustralia.com.au**. The email is received by a webhook,
AI-extracted into structured fields, and lands in the admin review queue at
**/directory/admin/strata-intakes**. An admin checks/edits the details and clicks
**Approve** — which turns it into a normal client quote request and broadcasts it to
every matching Silver/Gold business in the category (the same pipeline the manual
portal uses).

```
forwarded email → SendGrid Inbound Parse → POST /api/strata/inbound
   → StrataIntake (received) → AI extract (needs_review) → admin Approve
   → ClientQuoteRequest (submitted) → broadcastRequest() → businesses
```

## Code map
- `app/api/strata/inbound/route.ts` — SendGrid Inbound Parse webhook (secret-gated).
- `lib/strata-extract.ts` — Claude extraction (address, plan #, job description, units, category).
- `lib/strata-storage.ts` — attachments → Supabase `strata-intake-media` bucket (public, auto-created).
- `lib/strata-convert.ts` — approve → find/create client user → ClientQuoteRequest → broadcast.
- `app/api/directory/admin/strata-intakes/[id]/route.ts` — save edits / approve / reject / delete.
- `app/directory/admin/strata-intakes/**` — the admin review queue + detail UI.

## One-time setup (owner — needs a dashboard + DNS, which agents can't do)

### 1. Vercel env vars (Project → Settings → Environment Variables, Production)
- `STRATA_INBOUND_SECRET` — a long random string you invent (e.g. `openssl rand -hex 24`).
  The webhook rejects everything until this is set. Keep it secret; it lives only in
  the SendGrid POST URL.
- `SUPABASE_SERVICE_ROLE_KEY` — already set (used by the jobs board). Needed to store
  attachments. If missing, intakes still arrive but attachments won't be saved.
- `ANTHROPIC_API_KEY` — already set. Needed for AI extraction. If missing, intakes
  arrive as `needs_review` with empty fields for manual entry.

Redeploy after adding the secret so the running functions pick it up.

### 2. SendGrid — Inbound Parse
1. Create a free SendGrid account and verify it.
2. Settings → **Inbound Parse** → **Add Host & URL**.
   - **Receiving domain:** `parse.remedialbuildingaustralia.com.au`
     (a subdomain, so it never touches mail for the main domain / info@).
   - **Destination URL:**
     `https://www.remedialbuildingaustralia.com.au/api/strata/inbound?key=YOUR_STRATA_INBOUND_SECRET`
   - Tick **POST the raw, full MIME message** = OFF (we want the parsed fields), and
     tick **Check incoming emails for spam** if you like.

### 3. DNS — VentraIP (VIPControl → Manage DNS)
Add an **MX** record so mail for the parse subdomain goes to SendGrid:
```
Type: MX   Host: parse   Value: mx.sendgrid.net   Priority: 10   TTL: 3600
```
(Verify later from mac2: `dig +short MX parse.remedialbuildingaustralia.com.au @8.8.8.8`
→ should return `mx.sendgrid.net`.)

### 4. Make workorders@ forward to the parse subdomain
Managers email `workorders@remedialbuildingaustralia.com.au`. Point that address at the
parse mailbox so SendGrid receives it. Either:
- **Forward** `workorders@remedialbuildingaustralia.com.au` → `workorders@parse.remedialbuildingaustralia.com.au`
  in whatever hosts the main domain's mailboxes, **or**
- publish `workorders@parse.…` directly as the public address if you'd rather skip the
  forward (SendGrid Inbound Parse accepts any local-part at the parse domain).

### 5. Test
Send an email with a PDF work order to `workorders@…`. Within a minute it should appear
at **/directory/admin/strata-intakes** as *Needs review*, and you'll get a notification
at info@. Approve it and confirm a client quote request is created and broadcast.

## Database (owner runs this SQL once in the Supabase SQL editor)
See `docs/strata-connect.sql`. It creates the `StrataIntakeStatus` enum and the
`strata_intakes` + `strata_intake_files` tables (additive; `LocationState` already exists).
Deploy the code only after the tables exist, or the admin page will 500.

## Notes / future enhancements
- **PDF text isn't parsed yet.** Extraction reads the email subject + body + attachment
  filenames. If a work order's detail lives only inside a PDF, the AI may leave fields
  blank — the admin fills them in before approving (the review step is the safety net).
  Adding a PDF-to-text pass before extraction would raise auto-fill quality.
- Approving provisions a verified `client_user` for the sender (random password) so the
  quote request has an owner; they can use "forgot password" to log in and track it.
