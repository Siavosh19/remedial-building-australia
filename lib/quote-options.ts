// Shared option lists + human labels for the client quote-request platform.
// Used by the request form, the API validation, and the dashboards so the
// wording stays identical everywhere.

export const CLIENT_TYPE_OPTIONS = [
  { id: "strata_manager", label: "Strata manager" },
  { id: "owners_corp_rep", label: "Owners corporation representative" },
  { id: "building_manager", label: "Building manager" },
  { id: "property_owner", label: "Property owner" },
  { id: "consultant", label: "Consultant acting for owner / strata" },
  { id: "other", label: "Other client" },
] as const;

export const PROPERTY_TYPE_OPTIONS = [
  { id: "residential_strata", label: "Residential strata" },
  { id: "commercial_strata", label: "Commercial strata" },
  { id: "mixed_use", label: "Mixed-use building" },
  { id: "residential_house", label: "Residential house" },
  { id: "commercial_building", label: "Commercial building" },
  { id: "other", label: "Other" },
] as const;

export const URGENCY_OPTIONS = [
  { id: "emergency", label: "Emergency / make-safe" },
  { id: "within_week", label: "Within a week" },
  { id: "within_month", label: "Within a month" },
  { id: "planning", label: "Planning / budgeting stage" },
] as const;

export const REQUEST_STATUS_OPTIONS = [
  { id: "draft", label: "Draft" },
  { id: "submitted", label: "Submitted" },
  { id: "sent_to_businesses", label: "Sent to businesses" },
  { id: "responses_received", label: "Responses received" },
  { id: "closed", label: "Closed" },
] as const;

// A business lead moves: New → Interested (business taps interest) → [client
// proceeds → contacts exchanged] → the business logs the outcome (Quoted / Won /
// Didn't proceed). "declined" = the business tapped "Not interested".
export const RESPONSE_STATUS_OPTIONS = [
  { id: "pending", label: "New" },
  { id: "interested", label: "Interested" },
  { id: "quoted", label: "Quoted" },
  { id: "won", label: "Won" },
  { id: "not_proceeded", label: "Didn't proceed" },
  { id: "declined", label: "Not interested" },
] as const;

// Post-connection outcome the business logs once the client has proceeded and
// contact details are exchanged. Feedback only — it does not affect the client.
export const LEAD_OUTCOME_OPTIONS = [
  { id: "quoted", label: "Quoted" },
  { id: "won", label: "Won" },
  { id: "not_proceeded", label: "Didn't proceed" },
] as const;
export const LEAD_OUTCOME_IDS = LEAD_OUTCOME_OPTIONS.map((o) => o.id);

// Weekly interest-click allowance by visual tier (see lib/directory-tier dirTier).
// A business may express interest in at most this many leads per calendar week
// (Mon–Sun). Beyond it they must wait for the week to roll over (or buy extra
// later). Free listings never receive leads, so 0.
export const WEEKLY_INTEREST_CAP: Record<string, number> = { gold: 7, silver: 3, free: 0 };

function toMap(options: readonly { id: string; label: string }[]) {
  return Object.fromEntries(options.map((o) => [o.id, o.label])) as Record<string, string>;
}

export const CLIENT_TYPE_LABELS = toMap(CLIENT_TYPE_OPTIONS);
export const PROPERTY_TYPE_LABELS = toMap(PROPERTY_TYPE_OPTIONS);
export const URGENCY_LABELS = toMap(URGENCY_OPTIONS);
export const REQUEST_STATUS_LABELS = toMap(REQUEST_STATUS_OPTIONS);
// Keep "contacted"/"not_suitable" resolvable for any pre-existing rows.
export const RESPONSE_STATUS_LABELS: Record<string, string> = { ...toMap(RESPONSE_STATUS_OPTIONS), contacted: "Contacted", not_suitable: "Not suitable" };

export const PROPERTY_TYPE_IDS = PROPERTY_TYPE_OPTIONS.map((o) => o.id);
export const URGENCY_IDS = URGENCY_OPTIONS.map((o) => o.id);

// ─── Response-window policy ───────────────────────────────────────────────────
// How long a business has to respond to a quote request before it auto-expires
// (marked "not interested") and the lead passes to the next reserve business.
// Tied to the client's chosen urgency. Surfaced to the client at request time,
// in the business notification email + lead page, and in the Terms & Conditions.
export const RESPONSE_WINDOW_HOURS: Record<string, number> = {
  emergency: 24,     // Emergency / make-safe
  within_week: 48,   // Urgent
  within_month: 72,  // Standard
  planning: 72,      // Planning / budgeting
};
export const DEFAULT_RESPONSE_WINDOW_HOURS = 72;

export function responseWindowHours(urgency: string | null | undefined): number {
  return (urgency && RESPONSE_WINDOW_HOURS[urgency]) || DEFAULT_RESPONSE_WINDOW_HOURS;
}

// Client-facing sentence describing the window for the chosen urgency.
export function responseWindowNote(urgency: string | null | undefined): string {
  const h = responseWindowHours(urgency);
  return `Businesses have ${h} hours to respond to this request. If a business does not respond in time it is automatically removed and your request passes to the next available business you selected.`;
}

export const FILE_TYPE_OPTIONS = [
  { id: "photo", label: "Photo" },
  { id: "report", label: "Report" },
  { id: "drawing", label: "Drawing" },
  { id: "document", label: "Document" },
] as const;
export const FILE_TYPE_IDS = FILE_TYPE_OPTIONS.map((o) => o.id);

// Money helpers for the budget field.
// formatMoneyInput: live-format digits as the user types → "$10,000".
export function formatMoneyInput(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  return `$${Number(digits).toLocaleString("en-AU")}`;
}

// formatBudget: normalise a stored budget for display. Plain numbers (incl.
// commas) become "$10,000"; ranges / already-formatted text are shown as-is.
export function formatBudget(value: string | null | undefined): string {
  if (!value) return "";
  const v = value.trim();
  if (/^\d[\d,]*$/.test(v)) {
    const n = Number(v.replace(/,/g, ""));
    if (Number.isFinite(n)) return `$${n.toLocaleString("en-AU")}`;
  }
  return v;
}
