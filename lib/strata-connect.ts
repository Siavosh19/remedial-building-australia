// ─── Strata Connect: shared config + helpers ─────────────────────────────────
// Inbound work-order intake. A strata manager forwards a work order / scope of
// works to the address below; it is parsed, reviewed in admin, then converted
// into a ClientQuoteRequest via the existing matching pipeline.

// Public-facing intake address (advertised to strata managers). Overridable via
// env so we never hard-code an environment-specific value in more than one place.
export const STRATA_INTAKE_EMAIL =
  process.env.STRATA_INTAKE_EMAIL || "workorders@remedialbuildingaustralia.com.au";

// Private storage bucket holding every forwarded attachment (work orders, scope
// docs, site photos). Not public — the admin screen views files via signed URLs.
export const STRATA_INTAKE_BUCKET = "strata-intake";

// Intake statuses that still need an admin to act (the review queue).
export const OPEN_INTAKE_STATUSES = ["received", "extracting", "needs_review"] as const;
