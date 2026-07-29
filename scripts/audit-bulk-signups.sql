-- ============================================================================
--  Bulk-signup audit  —  "are these ~40 businesses real or bots?"
--  Read-only (except one CREATE OR REPLACE FUNCTION, which is harmless and can
--  be dropped afterwards with:  DROP FUNCTION is_valid_abn(text);).
--  Run each lettered section in the Supabase SQL editor. Times are UTC.
--
--  How to read a "real" signup vs a "bot/spam" signup:
--    REAL   -> email_verified_at is set, phone is a real AU mobile/landline,
--              ABN passes the checksum (abn_valid = true), website resolves,
--              details are internally consistent, often logs in (last_login_at).
--    SUSPECT-> email never verified, missing/invalid/duplicate ABN, duplicate or
--              sequential phones, throwaway email domains, gibberish names,
--              many identical fields across the batch, no login, no real activity.
-- ============================================================================


-- === A. THE BURST TIMELINE ==================================================
-- Confirms the shape Sia described: a spike over 2-3 nights, then near-zero.
-- Only counts companies that have a linked user account (i.e. real signups,
-- not the 7,234 scraped/seed listings).
SELECT date_trunc('hour', c.created_at) AS hour_utc,
       count(*)                          AS signups
FROM   companies c
JOIN   company_users cu ON cu.company_id = c.id
WHERE  c.created_at > now() - interval '7 days'
GROUP  BY 1
ORDER  BY 1;


-- === B. ABN CHECKSUM VALIDATOR (official ATO algorithm) =====================
-- A fabricated 11-digit ABN will almost always FAIL this. Real ABNs pass.
CREATE OR REPLACE FUNCTION is_valid_abn(raw text)
RETURNS boolean
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN length(regexp_replace(coalesce(raw,''), '\D', '', 'g')) <> 11 THEN false
    ELSE (
      SELECT (sum(
                (substr(d, g, 1)::int - CASE WHEN g = 1 THEN 1 ELSE 0 END)
                * (ARRAY[10,1,3,5,7,9,11,13,15,17,19])[g]
             ) % 89) = 0
      FROM  (SELECT regexp_replace(coalesce(raw,''), '\D', '', 'g') AS d) x
      CROSS JOIN generate_series(1, 11) g
    )
  END;
$$;
-- Quick sanity check: Australia Post (real) = true, made-up = false.
SELECT is_valid_abn('11000021658')  AS should_be_true,
       is_valid_abn('12345678901')  AS should_be_false;


-- === C. THE ROSTER (the ~40 businesses, with every red-flag column) =========
-- This is the master list to eyeball. Widen the interval if you need more.
SELECT c.created_at,
       c.name                                   AS company_name,
       u.full_name                              AS account_name,
       u.email                                  AS account_email,
       split_part(u.email, '@', 2)              AS email_domain,
       u.phone                                  AS account_phone,
       c.abn,
       is_valid_abn(c.abn)                      AS abn_valid,
       c.website,
       cat.name                                 AS category,
       loc.suburb, loc.state, loc.postcode,
       (u.email_verified_at IS NOT NULL)        AS email_verified,
       u.last_login_at,
       c.plan_type,
       c.status,
       c.is_claimed
FROM   companies c
JOIN   company_users cu ON cu.company_id = c.id
JOIN   users u          ON u.id = cu.user_id
LEFT   JOIN categories cat ON cat.id = c.main_category_id
LEFT   JOIN LATERAL (
         SELECT suburb, state, postcode
         FROM   locations l
         WHERE  l.company_id = c.id
         ORDER  BY id LIMIT 1
       ) loc ON true
WHERE  c.created_at > now() - interval '4 days'
ORDER  BY c.created_at DESC;


-- === D. DUPLICATE / PATTERN DETECTION (the strongest bot tells) =============
-- Bots reuse things. Any group with count > 1 here is worth a hard look.

-- D1. Same email domain used many times in the batch
SELECT split_part(u.email, '@', 2) AS email_domain, count(*) AS n
FROM   companies c
JOIN   company_users cu ON cu.company_id = c.id
JOIN   users u          ON u.id = cu.user_id
WHERE  c.created_at > now() - interval '4 days'
GROUP  BY 1 HAVING count(*) > 1
ORDER  BY n DESC;

-- D2. Duplicate ABNs across the batch (real distinct businesses never share one)
SELECT c.abn, count(*) AS n, array_agg(c.name) AS companies
FROM   companies c
JOIN   company_users cu ON cu.company_id = c.id
WHERE  c.created_at > now() - interval '4 days' AND c.abn IS NOT NULL
GROUP  BY c.abn HAVING count(*) > 1
ORDER  BY n DESC;

-- D3. Duplicate websites across the batch
SELECT lower(c.website) AS website, count(*) AS n, array_agg(c.name) AS companies
FROM   companies c
JOIN   company_users cu ON cu.company_id = c.id
WHERE  c.created_at > now() - interval '4 days' AND c.website IS NOT NULL AND c.website <> ''
GROUP  BY 1 HAVING count(*) > 1
ORDER  BY n DESC;


-- === E. "REAL vs SUSPECT" ONE-LINE SCORECARD ===============================
-- A blunt score: +1 for each healthy signal (verified email, valid ABN, logged
-- in). 3 = looks real; 0-1 = looks like a bot/junk signup. Sort worst first.
SELECT c.created_at,
       c.name,
       u.email,
       (u.email_verified_at IS NOT NULL) AS verified,
       is_valid_abn(c.abn)               AS abn_ok,
       (u.last_login_at IS NOT NULL)     AS logged_in,
       ( (u.email_verified_at IS NOT NULL)::int
       + coalesce(is_valid_abn(c.abn)::int, 0)
       + (u.last_login_at IS NOT NULL)::int ) AS realness_score
FROM   companies c
JOIN   company_users cu ON cu.company_id = c.id
JOIN   users u          ON u.id = cu.user_id
WHERE  c.created_at > now() - interval '4 days'
ORDER  BY realness_score ASC, c.created_at DESC;


-- === F. RESEND EMAIL LOAD FROM THIS BATCH ===================================
-- Each signup = 1 verification email; the verify-reminders cron then emails each
-- STILL-UNVERIFIED account up to 3 more times (~12h/48h/72h). Bots leave accounts
-- unverified, so a bot flood is exactly what inflates your Resend send volume.
SELECT count(*)                                                   AS accounts_in_window,
       count(*) FILTER (WHERE u.email_verified_at IS NULL)        AS still_unverified,
       count(*) FILTER (WHERE u.email_verified_at IS NULL)        AS reminder_targets,
       count(*)                                                   AS verification_emails_sent,
       count(*) FILTER (WHERE u.email_verified_at IS NULL) * 3    AS max_reminder_emails
FROM   companies c
JOIN   company_users cu ON cu.company_id = c.id
JOIN   users u          ON u.id = cu.user_id
WHERE  c.created_at > now() - interval '4 days';
