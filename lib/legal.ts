// Centralised legal / disclaimer wording for the strata–client quote-request
// platform. Reused by the signup flow, the request form, the public landing
// page, and both client + business notification emails so the language stays
// consistent and compliant everywhere.

// Bump this when the disclaimer text materially changes. Stored against each
// account (users.terms_version) and each request (terms_version) at acceptance.
export const TERMS_VERSION = "2026-06-26";

// The required liability / disclaimer statement. Must appear verbatim wherever
// the platform represents its role.
export const RBA_DISCLAIMER =
  "RBA is a directory and quote request platform. RBA does not recommend, endorse, " +
  "supervise, verify workmanship, or act as a builder, consultant, superintendent, " +
  "or project manager. Users must make their own enquiries before engaging any business.";

// Short form for tight UI spots (badges, email footers).
export const RBA_DISCLAIMER_SHORT =
  "RBA is a directory and quote request platform only. It does not recommend, endorse, " +
  "supervise or manage any business. Make your own enquiries before engaging anyone.";

// Directory disclaimer — businesses self-manage their profiles; licence/insurance
// is self-declared. Shown on the directory, pricing, business profiles, SEO pages.
export const DIRECTORY_DISCLAIMER =
  "Businesses manage their own profiles. Licence and insurance information is self-declared " +
  "unless otherwise stated. Clients should complete their own due diligence before engaging a contractor.";

// Approved terminology — use these when describing listings / businesses.
export const APPROVED_WORDING = [
  "listed business",
  "paid listing",
  "Premium",
  "Premium Plus",
  "quote request access",
  "promoted visibility",
  "matching businesses",
] as const;

// Wording that must never be used about any business on the platform.
export const AVOIDED_WORDING = [
  "recommended contractor",
  "approved contractor",
  "certified by RBA",
  "best contractor",
  "RBA verified quality",
] as const;
