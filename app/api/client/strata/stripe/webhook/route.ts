import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { syncSubscription } from "@/lib/strata/billing";

export const dynamic = "force-dynamic";

/**
 * The strata module's own Stripe endpoint, deliberately separate from RBA's
 * existing webhook so directory and supplier billing are untouched by anything
 * here. Add it as a second endpoint in Stripe with its own signing secret.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_STRATA_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });

  const stripe = getStripe();
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("[strata-webhook] invalid signature:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as { subscription?: string | null; metadata?: Record<string, string> };
        if (!session.subscription || !session.metadata?.strata_user_id) break;
        const sub = await stripe.subscriptions.retrieve(String(session.subscription));
        // Checkout carries the account id; the subscription may not yet.
        const withOwner = {
          ...sub,
          metadata: { ...(sub.metadata ?? {}), strata_user_id: session.metadata.strata_user_id },
        };
        await syncSubscription(withOwner as never);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await syncSubscription(event.data.object as never);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as { subscription?: string | null };
        if (!invoice.subscription) break;
        const sub = await stripe.subscriptions.retrieve(String(invoice.subscription));
        const userId = Number(sub.metadata?.strata_user_id);
        if (Number.isFinite(userId) && userId > 0) {
          await prisma.strataSubscription.updateMany({
            where: { user_id: userId },
            data: { status: "past_due" },
          });
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    // Never fail the webhook on our own error — Stripe would retry forever.
    console.error(`[strata-webhook] handling ${event.type} failed:`, err);
  }

  return NextResponse.json({ received: true });
}
