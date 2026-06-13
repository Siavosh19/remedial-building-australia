const PERSONAL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.com.au",
  "outlook.com", "outlook.com.au",
  "live.com", "live.com.au",
  "yahoo.com", "yahoo.com.au",
  "icloud.com", "me.com", "mac.com",
  "bigpond.com", "bigpond.net.au",
  "optusnet.com.au", "tpg.com.au",
  "westnet.com.au", "iinet.net.au",
  "internode.on.net", "aapt.net.au",
  "msn.com", "aol.com",
  "protonmail.com", "proton.me",
]);

/** Returns true only for business-domain email addresses safe to display publicly. */
export function isBusinessEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const at = email.lastIndexOf("@");
  if (at === -1) return false;
  const domain = email.slice(at + 1).toLowerCase();
  return !PERSONAL_DOMAINS.has(domain);
}
