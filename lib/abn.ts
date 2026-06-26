// ABN (Australian Business Number) validation + live verification.
//
// Two layers, both free:
//   1. CHECKSUM — the official 11-digit ABN weighting algorithm. Runs offline,
//      instantly rejects typos and made-up numbers.
//   2. LIVE LOOKUP — the Australian Business Register (ABR) ABN Lookup web
//      service. Confirms the ABN is real + Active and returns the registered
//      entity name / state / GST status. Needs a free ABR GUID in env
//      (ABR_GUID). Without it we still return the checksum result, so the
//      feature degrades gracefully until the key is added.
//
// Register for a free GUID at: https://abr.business.gov.au/Tools/WebServices

const WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

/** Official ABN checksum (modulus 89). True = structurally a valid ABN. */
export function isValidAbnChecksum(abnRaw: string): boolean {
  const abn = (abnRaw || "").replace(/\s/g, "");
  if (!/^\d{11}$/.test(abn)) return false;
  const digits = abn.split("").map(Number);
  digits[0] -= 1;
  const sum = digits.reduce((acc, d, i) => acc + d * WEIGHTS[i], 0);
  return sum % 89 === 0;
}

export type AbnStatus = "active" | "cancelled" | "invalid" | "not_found" | "unknown";

export type AbnVerification = {
  abn: string;
  validFormat: boolean; // 11 digits + passes checksum
  active: boolean | null; // null = live status couldn't be determined
  entityName: string | null;
  entityType: string | null;
  gstRegistered: boolean | null;
  state: string | null;
  postcode: string | null;
  status: AbnStatus;
  source: "abr" | "checksum"; // where the result came from
  message: string; // human-readable note (empty when all good)
};

export const abrConfigured = () => Boolean(process.env.ABR_GUID);

/**
 * Validate + (if configured) look up an ABN against the ABR.
 * Never throws — on any network/parse error it falls back to the checksum result.
 */
export async function verifyAbn(abnRaw: string): Promise<AbnVerification> {
  const abn = (abnRaw || "").replace(/\D/g, "");
  const validFormat = isValidAbnChecksum(abn);

  const base: AbnVerification = {
    abn,
    validFormat,
    active: null,
    entityName: null,
    entityType: null,
    gstRegistered: null,
    state: null,
    postcode: null,
    status: validFormat ? "unknown" : "invalid",
    source: "checksum",
    message: validFormat ? "" : "That is not a valid 11-digit ABN.",
  };

  if (!validFormat) return base;

  const guid = process.env.ABR_GUID;
  if (!guid) return base; // checksum-only until the GUID is configured

  try {
    const url = `https://abr.business.gov.au/json/AbnDetails.aspx?abn=${abn}&callback=cb&guid=${encodeURIComponent(guid)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const text = await res.text();
    // ABR returns JSONP: cb({...}). Strip the callback wrapper before parsing.
    const json = JSON.parse(text.replace(/^[^(]*\(/, "").replace(/\)\s*;?\s*$/, ""));

    // ABR sets `Message` (and an empty AbnStatus) when the ABN isn't found.
    if (json.Message && !json.AbnStatus) {
      return { ...base, source: "abr", status: "not_found", message: String(json.Message) };
    }

    const active = json.AbnStatus === "Active";
    return {
      ...base,
      source: "abr",
      active,
      entityName: json.EntityName || null,
      entityType: json.EntityTypeName || null,
      gstRegistered: Boolean(json.Gst),
      state: json.AddressState || null,
      postcode: json.AddressPostcode || null,
      status: active ? "active" : "cancelled",
      message: active ? "" : "This ABN is recorded as cancelled with the ABR.",
    };
  } catch {
    // Network/parse failure — keep the (valid) checksum result, status unknown.
    return base;
  }
}

const norm = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

/** True when the registered entity name clearly differs from the typed name. */
export function abnNameMismatch(entityName: string | null, typedName: string): boolean {
  if (!entityName) return false;
  const a = norm(entityName);
  const b = norm(typedName);
  if (!a || !b) return false;
  return !(a.includes(b) || b.includes(a));
}
