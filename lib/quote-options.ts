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

export const RESPONSE_STATUS_OPTIONS = [
  { id: "pending", label: "Awaiting response" },
  { id: "contacted", label: "Contacted" },
  { id: "quoted", label: "Quoted" },
  { id: "declined", label: "Declined" },
  { id: "not_suitable", label: "Not suitable" },
] as const;

function toMap(options: readonly { id: string; label: string }[]) {
  return Object.fromEntries(options.map((o) => [o.id, o.label])) as Record<string, string>;
}

export const CLIENT_TYPE_LABELS = toMap(CLIENT_TYPE_OPTIONS);
export const PROPERTY_TYPE_LABELS = toMap(PROPERTY_TYPE_OPTIONS);
export const URGENCY_LABELS = toMap(URGENCY_OPTIONS);
export const REQUEST_STATUS_LABELS = toMap(REQUEST_STATUS_OPTIONS);
export const RESPONSE_STATUS_LABELS = toMap(RESPONSE_STATUS_OPTIONS);

export const PROPERTY_TYPE_IDS = PROPERTY_TYPE_OPTIONS.map((o) => o.id);
export const URGENCY_IDS = URGENCY_OPTIONS.map((o) => o.id);

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
