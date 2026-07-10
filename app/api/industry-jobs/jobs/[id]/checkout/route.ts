import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { stripe } from "@/lib/stripe";
import { resolveJobPrice, getJobPricingByKey } from "@/lib/jobs-pricing";
import { activateJob } from "@/lib/jobs-publish";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// Start payment for a job (publish / renew / feature). On success the job is
// activated — immediately here if Stripe isn't configured, otherwise via webhook.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const jobId = Number(id);
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.user_id !== user.id) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const wantFeatured = body?.is_featured != null ? Boolean(body.is_featured) : job.is_featured;
  if (wantFeatured !== job.is_featured) {
    await prisma.job.update({ where: { id: job.id }, data: { is_featured: wantFeatured } });
  }

  const price = await resolveJobPrice(wantFeatured);
  if (!price) return NextResponse.json({ error: "Job pricing isn't set up yet. Please contact us." }, { status: 503 });

  // Upgrade = an already-live Standard listing switching to Featured. The employer
  // has already paid the Standard fee, so we only charge the price DIFFERENCE and
  // keep the listing live (don't reset status or the 30-day clock).
  const isUpgrade = wantFeatured && !job.is_featured && job.status === "active";
  let chargeCents = price.amount_cents;
  if (isUpgrade) {
    const standard = await getJobPricingByKey("standard");
    chargeCents = Math.max(0, price.amount_cents - (standard?.amount_cents ?? 0));
  }

  const payment = await prisma.jobPayment.create({
    data: {
      job_id: job.id,
      user_id: user.id,
      plan_key: isUpgrade ? "featured_upgrade" : price.key,
      is_featured: wantFeatured,
      amount_cents: chargeCents,
      currency: price.currency,
      status: "pending",
    },
  });

  // ── Manual/free path: Stripe not configured, a fresh listing whose price isn't
  // synced, or an upgrade with no price difference. Publish/flip now. ─────────────
  if (!stripe || chargeCents <= 0 || (!isUpgrade && !price.stripe_price_id)) {
    await prisma.jobPayment.update({ where: { id: payment.id }, data: { status: "paid" } });
    await activateJob(job.id, {
      durationDays: price.duration_days,
      isFeatured: wantFeatured,
      amountCents: chargeCents,
      keepExpiry: isUpgrade,
    });
    return NextResponse.json({ published: true, mode: "manual", slug: job.slug });
  }

  // Fresh listing awaits payment before going live; an upgrade stays live meanwhile.
  if (!isUpgrade) {
    await prisma.job.update({ where: { id: job.id }, data: { status: "pending_payment" } });
  }

  // Fresh listing bills the full synced price; an upgrade bills the difference via
  // an inline one-off amount (no pre-made Stripe price for the delta).
  const lineItems = isUpgrade
    ? [
        {
          price_data: {
            currency: (price.currency || "aud").toLowerCase(),
            unit_amount: chargeCents,
            product_data: { name: `Upgrade to Featured — ${job.title}` },
          },
          quantity: 1,
        },
      ]
    : [{ price: price.stripe_price_id as string, quantity: 1 }];

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      // Card only — disables Stripe Link (no cross-site phone/card autofill).
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${SITE_URL}/directory/dashboard/jobs?checkout=success`,
      cancel_url: `${SITE_URL}/directory/dashboard/jobs/${job.id}/edit?checkout=cancelled`,
      metadata: {
        product_line: "jobs",
        job_id: String(job.id),
        payment_id: String(payment.id),
        plan_key: isUpgrade ? "featured_upgrade" : price.key,
        is_featured: String(wantFeatured),
        is_upgrade: String(isUpgrade),
        duration_days: String(price.duration_days),
      },
      payment_intent_data: {
        metadata: { product_line: "jobs", job_id: String(job.id), payment_id: String(payment.id) },
      },
    });
  } catch (err) {
    console.error("[industry-jobs/checkout] session failed:", err);
    await prisma.jobPayment.update({ where: { id: payment.id }, data: { status: "failed" } });
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
  }

  await prisma.jobPayment.update({ where: { id: payment.id }, data: { stripe_session_id: session.id } });
  return NextResponse.json({ checkoutUrl: session.url });
}
