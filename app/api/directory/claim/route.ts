import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createAuthToken } from "@/lib/directory-auth";
import {
  sendDirectoryVerificationEmail,
  sendClaimRequestAdminEmail,
} from "@/lib/directory-email";
import { verifyAbn, abnNameMismatch } from "@/lib/abn";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digits = (s: string | null | undefined) => (s ?? "").replace(/\D/g, "");

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const slug = String(body.slug ?? "").trim();
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const abnInput = String(body.abn ?? "").trim();
  const password = String(body.password ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");
  const notes = body.notes ? String(body.notes).trim() : null;

  if (!slug) return NextResponse.json({ error: "Company not specified." }, { status: 400 });
  if (!fullName) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (password !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });

  // ── ABN is mandatory to claim a listing (ownership gate) ───────────────────────
  const abnCheck = await verifyAbn(abnInput);
  if (!abnCheck.validFormat) {
    return NextResponse.json({ error: "Please enter your 11-digit ABN to claim this listing." }, { status: 400 });
  }
  if (abnCheck.status === "cancelled") {
    return NextResponse.json({ error: "This ABN is recorded as cancelled with the ABR. Please use your active ABN." }, { status: 400 });
  }
  if (abnCheck.status === "not_found") {
    return NextResponse.json({ error: "We couldn't find this ABN in the Australian Business Register. Please check it and try again." }, { status: 400 });
  }

  const company = await prisma.company.findUnique({ where: { slug, status: "published" } });
  if (!company) return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  if (company.listing_claim_status === "claimed" || company.is_claimed) {
    return NextResponse.json({ error: "This listing has already been claimed." }, { status: 409 });
  }
  if (company.listing_claim_status === "claim_pending") {
    return NextResponse.json({ error: "A claim for this listing is already under review." }, { status: 409 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email already registered. Please log in instead." }, { status: 400 });

  // ── Ownership decision ─────────────────────────────────────────────────────────
  // Auto-claim when we can prove the claimant owns the business, via either:
  //   1. On-file ABN match — the entered ABN equals the ABN already on the listing
  //      (rare: almost no scraped listings carry an ABN), OR
  //   2. ABR name match — the entered ABN is Active on the Australian Business
  //      Register AND its registered entity/business name matches the listing name.
  //      This is what actually automates the common case (listing has no ABN on
  //      file). It only runs when ABR_GUID is configured; without it, verifyAbn
  //      returns source:"checksum" and this stays false → the claim is reviewed.
  // Anything else is held for admin review so a listing can't be taken over by
  // supplying an unrelated ABN.
  const listingAbn = digits(company.abn);
  const enteredAbn = digits(abnInput);
  const abnOnFileMatches = listingAbn.length === 11 && listingAbn === enteredAbn;

  const nameMismatch = abnNameMismatch(abnCheck.entityName, company.name);
  const abrNameMatches =
    listingAbn.length !== 11 &&        // nothing to match against on file
    abnCheck.source === "abr" &&       // live ABR lookup actually ran
    abnCheck.active === true &&
    !!abnCheck.entityName &&
    !nameMismatch;

  const autoClaim = abnOnFileMatches || abrNameMatches;

  const abnNote =
    (abnCheck.source === "abr"
      ? `ABN ${enteredAbn}: ${abnCheck.status.toUpperCase()}` +
        (abnCheck.entityName ? ` — registered as "${abnCheck.entityName}"` : "") +
        (nameMismatch ? " ⚠ registered name differs from listing name" : "")
      : `ABN ${enteredAbn}: format/checksum OK (live ABR check not configured)`) +
    (autoClaim
      ? abnOnFileMatches
        ? " — matches listing ABN → auto-claimed."
        : " — ABR name matches listing → auto-claimed."
      : listingAbn.length === 11
        ? ` — DOES NOT match listing ABN ${listingAbn} → held for review.`
        : " — could not auto-verify ownership → held for review.");

  const password_hash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password_hash,
      full_name: fullName,
      phone,
      role: "company_owner",
      is_verified: false,
    },
  });

  const verificationToken = createAuthToken(user.id, "email_verification");

  if (autoClaim) {
    // ── Instant claim — no admin approval needed ─────────────────────────────────
    await prisma.$transaction(async (tx) => {
      await tx.companyUser.create({
        data: {
          company_id: company.id,
          user_id: user.id,
          role: "owner",
          is_primary: true,
          invited_at: new Date(),
          accepted_at: new Date(),
        },
      });
      await tx.company.update({
        where: { id: company.id },
        data: {
          listing_claim_status: "claimed",
          is_claimed: true,
          claimed_at: new Date(),
          abn: enteredAbn,
          ...(abnCheck.active ? { profile_status: "business_verified" } : {}),
          // Claiming marks ownership only — it does NOT grant a Silver/Gold tier.
          // The listing stays on Free/basic until the owner subscribes via Stripe.
        },
      });
      await tx.claimRequest.create({
        data: {
          company_id: company.id,
          user_id: user.id,
          status: "claimed",
          claimant_name: fullName,
          claimant_email: email,
          claimant_phone: phone || null,
          notes: notes,
          admin_notes: `Auto-claimed: ${abnNote}`,
          reviewed_at: new Date(),
        },
      });
      // NOTE: no subscription/trial row is created on claim. A trial only ever
      // exists after the owner completes Stripe checkout (card on file) via
      // /api/directory/subscribe. Creating a "trialing" row here produced phantom
      // trials with no billing behind them.
    });

    sendDirectoryVerificationEmail(fullName, email, verificationToken).catch(() => {});
    return NextResponse.json({ success: true, autoClaimed: true });
  }

  // ── No match → create a pending claim for admin review (existing behaviour) ─────
  const claimRequest = await prisma.$transaction(async (tx) => {
    await tx.companyUser.create({
      data: {
        company_id: company.id,
        user_id: user.id,
        role: "owner",
        is_primary: true,
        accepted_at: new Date(),
      },
    });
    await tx.company.update({
      where: { id: company.id },
      data: { listing_claim_status: "claim_pending" },
    });
    return tx.claimRequest.create({
      data: {
        company_id: company.id,
        user_id: user.id,
        status: "claim_pending",
        claimant_name: fullName,
        claimant_email: email,
        claimant_phone: phone || null,
        notes: [notes, abnNote].filter(Boolean).join(" — "),
      },
    });
  });

  sendDirectoryVerificationEmail(fullName, email, verificationToken).catch(() => {});
  sendClaimRequestAdminEmail(fullName, email, company.name, company.slug, claimRequest.id).catch(() => {});

  return NextResponse.json({ success: true, autoClaimed: false });
}
