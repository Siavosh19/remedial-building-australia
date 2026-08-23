-- Unfinished Silver/Gold signups: remember which paid plan was chosen so the
-- dashboard can offer "continue to checkout" or "publish as a Free listing"
-- instead of stranding a draft listing with no plan. NULL = nothing pending.
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "pending_plan" TEXT;
