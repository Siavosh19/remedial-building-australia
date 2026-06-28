import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createAuthToken } from "@/lib/directory-auth";
import { sendClientVerificationEmail, sendAdminSignupNotification } from "@/lib/directory-email";
import { verifyTurnstile } from "@/lib/turnstile";
import { validateAuPhone } from "@/lib/phone-au";
import { TERMS_VERSION } from "@/lib/legal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CLIENT_TYPES = [
  "strata_manager",
  "owners_corp_rep",
  "building_manager",
  "property_owner",
  "consultant",
  "other",
] as const;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // ── Anti-bot: Cloudflare Turnstile (no-op until keys are configured) ──────────
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const human = await verifyTurnstile(body.turnstileToken, ip);
  if (!human) {
    return NextResponse.json({ error: "Anti-bot verification failed. Please reload the page and try again." }, { status: 400 });
  }

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phoneInput = String(body.phone ?? "").trim();
  const password = String(body.password ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");
  const company = String(body.company ?? "").trim();
  const clientType = String(body.clientType ?? "").trim();
  const termsAccepted = body.termsAccepted === true;

  if (!fullName) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  const phoneCheck = validateAuPhone(phoneInput);
  if (!phoneCheck.valid) return NextResponse.json({ error: phoneCheck.message }, { status: 400 });
  const phone = phoneCheck.national!;
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (password !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
  if (!CLIENT_TYPES.includes(clientType as (typeof CLIENT_TYPES)[number])) {
    return NextResponse.json({ error: "Please select the option that best describes you." }, { status: 400 });
  }
  if (!termsAccepted) {
    return NextResponse.json({ error: "You must accept the platform terms and disclaimer to continue." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email is already registered." }, { status: 400 });

  const password_hash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password_hash,
      full_name: fullName,
      phone,
      role: "client_user",
      account_type: "strata_client",
      is_verified: false,
      terms_accepted_at: new Date(),
      terms_version: TERMS_VERSION,
      client_profile: {
        create: {
          client_type: clientType as (typeof CLIENT_TYPES)[number],
          company_name: company || null,
        },
      },
    },
  });

  const verificationToken = createAuthToken(user.id, "email_verification");
  try {
    await sendClientVerificationEmail(fullName, email, verificationToken);
  } catch (err) {
    // Don't leave an unverified account behind (it would block re-signup with
    // "email already registered"). Roll back and surface the real failure.
    console.error(`[client signup] verification email to ${email} failed — rolling back user ${user.id}:`, err);
    await prisma.clientProfile.deleteMany({ where: { user_id: user.id } });
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {});
    return NextResponse.json(
      { error: "We couldn't send your verification email. Please double-check your email address and try again. If it keeps happening, contact info@remedialbuildingaustralia.com.au." },
      { status: 502 },
    );
  }
  sendAdminSignupNotification(fullName, email, "strata_client").catch(() => {});

  return NextResponse.json({
    success: true,
    message: "Verification email sent. Please check your inbox to verify your account, then sign in to submit a quote request.",
  });
}
