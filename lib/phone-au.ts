// Australian phone-number validation (format + type). No external dependency.
// Accepts the common ways Australians type a number and normalises to a single
// canonical form, while rejecting junk/bot input. True verification that the
// person controls the number requires SMS OTP (a future add-on) — this is the
// free first line of defence.

export type AuPhoneType = "mobile" | "landline" | "tollfree" | null;

export type AuPhone = {
  valid: boolean;
  e164: string | null; // +61… (mobile/landline only)
  national: string | null; // 0… canonical national form
  type: AuPhoneType;
  message: string;
};

function ok(national: string, type: Exclude<AuPhoneType, null>): AuPhone {
  const e164 = type === "tollfree" ? null : "+61" + national.slice(1);
  return { valid: true, e164, national, type, message: "" };
}
function fail(message: string): AuPhone {
  return { valid: false, e164: null, national: null, type: null, message };
}

export function validateAuPhone(input: string): AuPhone {
  let d = (input || "").replace(/[\s()\-.]/g, "");

  // International prefixes → national 0… form
  if (d.startsWith("+61")) d = "0" + d.slice(3);
  else if (d.startsWith("0061")) d = "0" + d.slice(4);
  else if (/^61\d{9}$/.test(d)) d = "0" + d.slice(2);

  if (!d) return fail("Phone number is required.");
  if (!/^\d+$/.test(d)) return fail("Phone number contains invalid characters.");

  // Mobile: 04xx xxx xxx
  if (/^04\d{8}$/.test(d)) return ok(d, "mobile");
  // Landline: 0[2 3 7 8] xxxx xxxx
  if (/^0[2378]\d{8}$/.test(d)) return ok(d, "landline");
  // 1300 / 1800: 10 digits
  if (/^1(?:300|800)\d{6}$/.test(d)) return { valid: true, e164: null, national: d, type: "tollfree", message: "" };
  // 13xxxx: 6-digit short number
  if (/^13\d{4}$/.test(d)) return { valid: true, e164: null, national: d, type: "tollfree", message: "" };

  return fail("Enter a valid Australian phone number, e.g. 02 9876 5432 or 0412 345 678.");
}
