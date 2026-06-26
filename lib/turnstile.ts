// Cloudflare Turnstile — free, privacy-friendly, invisible anti-bot challenge.
// Server-side token verification. Env-gated so the site keeps working before the
// keys are added:
//   - No TURNSTILE_SECRET_KEY  → verifyTurnstile() returns true (does not block).
//   - Key present              → a valid token is required.
//
// Get free keys at: https://dash.cloudflare.com/?to=/:account/turnstile
//   TURNSTILE_SECRET_KEY            (server, this file)
//   NEXT_PUBLIC_TURNSTILE_SITE_KEY  (client widget)

export const turnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured → don't block signups
  if (!token) return false;

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (ip) body.set("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(6000),
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch {
    return false;
  }
}
