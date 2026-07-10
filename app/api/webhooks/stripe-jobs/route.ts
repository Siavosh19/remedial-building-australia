import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { activateJob } from "@/lib/jobs-publish";

export const runtime = "nodejs";

// Dedicated webhook for the jobs board (own signing secret). Fulfils one-time
// payments: marks the JobPayment paid and activates the job.
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_JOBS_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe-jobs] STRIPE_JOBS_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const stripe = getStripe();
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") ?? "";
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      metadata?: Record<string, string> | null;
      payment_intent?: string | null;
      payment_status?: string;
    };
    const meta = session.metadata ?? {};
    if (meta.product_line !== "jobs") return NextResponse.json({ received: true });
    if (session.payment_status && session.payment_status !== "paid") return NextResponse.json({ received: true });

    const jobId = Number(meta.job_id);
    const paymentId = Number(meta.payment_id);
    const isFeatured = meta.is_featured === "true";
    const isUpgrade = meta.is_upgrade === "true";
    const durationDays = Number(meta.duration_days) || 30;

    try {
      const payment = paymentId
        ? await prisma.jobPayment.findUnique({ where: { id: paymentId } })
        : null;

      // Idempotency: skip if already fulfilled.
      if (payment?.status === "paid") return NextResponse.json({ received: true });

      if (paymentId) {
        await prisma.jobPayment.update({
          where: { id: paymentId },
          data: { status: "paid", stripe_payment_intent: session.payment_intent ?? null },
        });
      }
      if (Number.isInteger(jobId)) {
        await activateJob(jobId, {
          durationDays,
          isFeatured,
          amountCents: payment?.amount_cents,
          keepExpiry: isUpgrade,
        });
      }
    } catch (err) {
      console.error("[stripe-jobs] fulfilment failed:", err);
      return NextResponse.json({ error: "Fulfilment error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
