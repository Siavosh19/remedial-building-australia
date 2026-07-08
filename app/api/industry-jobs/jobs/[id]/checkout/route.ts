import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmployerFromRequest } from "@/lib/jobs-auth";
import { stripe } from "@/lib/stripe";
import { resolveJobPrice } from "@/lib/jobs-pricing";
import { activateJob } from "@/lib/jobs-publish";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// Start payment for a job (publish / renew / feature). On success the job is
// activated — immediately here if Stripe isn't configured, otherwise via webhook.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employer = await getEmployerFromRequest(request);
  if (!employer) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const jobId = Number(id);
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.employer_id !== employer.id) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const wantFeatured = body?.is_featured != null ? Boolean(body.is_featured) : job.is_featured;
  if (wantFeatured !== job.is_featured) {
    await prisma.job.update({ where: { id: job.id }, data: { is_featured: wantFeatured } });
  }

  const price = await resolveJobPrice(wantFeatured);
  if (!price) return NextResponse.json({ error: "Job pricing isn't set up yet. Please contact us." }, { status: 503 });

  const payment = await prisma.jobPayment.create({
    data: {
      job_id: job.id,
      employer_id: employer.id,
      plan_key: price.key,
      is_featured: wantFeatured,
      amount_cents: price.amount_cents,
      currency: price.currency,
      status: "pending",
    },
  });

  // ── Manual fallback: Stripe not configured / price not synced. Publish now so
  // the flow is fully reviewable without live keys. ──────────────────────────────
  if (!stripe || !price.stripe_price_id) {
    await prisma.jobPayment.update({ where: { id: payment.id }, data: { status: "paid" } });
    await prisma.job.update({ where: { id: job.id }, data: { status: "active" } });
    await activateJob(job.id, { durationDays: price.duration_days, isFeatured: wantFeatured, amountCents: price.amount_cents });
    return NextResponse.json({ published: true, mode: "manual", slug: job.slug });
  }

  await prisma.job.update({ where: { id: job.id }, data: { status: "pending_payment" } });

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: employer.email,
      // Card only — disables Stripe Link (no cross-site phone/card autofill).
      payment_method_types: ["card"],
      line_items: [{ price: price.stripe_price_id, quantity: 1 }],
      success_url: `${SITE_URL}/industry-jobs/employer?checkout=success`,
      cancel_url: `${SITE_URL}/industry-jobs/employer/jobs/${job.id}/edit?checkout=cancelled`,
      metadata: {
        product_line: "jobs",
        job_id: String(job.id),
        payment_id: String(payment.id),
        plan_key: price.key,
        is_featured: String(wantFeatured),
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
