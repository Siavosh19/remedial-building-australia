-- One phone = one account (all account types). Enforces the app-level check in
-- /api/directory/signup and /api/client/signup at the database level.
--
-- Phone is stored in normalised AU national form (validateAuPhone), so this
-- index compares like-for-like. Postgres allows multiple NULLs in a UNIQUE
-- index, so accounts without a phone are unaffected.
--
-- NOTE: if the live `users` table already contains two rows sharing a non-null
-- phone, this statement will fail — de-duplicate those rows first, then re-run.
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
