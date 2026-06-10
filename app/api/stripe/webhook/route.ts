import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });

  const body = await request.text();
  const sig = request.headers.get("stripe-signature") ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error("[Stripe webhook] Invalid signature:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const session = event.data.object as unknown as { metadata?: Record<string, string>; customer?: string; subscription?: string };
        const productId = session.metadata?.product_id ? Number(session.metadata.product_id) : null;
        if (!productId) break;
        await prisma.supplierProduct.update({
          where: { id: productId },
          data: {
            payment_status: "paid",
            promotion_status: "active",
            stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
            stripe_subscription_id: typeof session.subscription === "string" ? session.subscription : null,
            promotion_start_date: new Date(),
          },
        });
        await createAuditLog({ entityType: "supplier_product", entityId: String(productId), action: "payment_status_changed", newValue: { payment_status: "paid", promotion_status: "active" } });
        break;
      }

      case "customer.subscription.updated": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub = event.data.object as unknown as { id: string; status: string; current_period_start: number; current_period_end: number; cancel_at_period_end: boolean; latest_invoice?: string | { payment_intent?: { status?: string } } };
        const product = await prisma.supplierProduct.findFirst({ where: { stripe_subscription_id: sub.id } });
        if (!product) break;
        await prisma.supplierProduct.update({
          where: { id: product.id },
          data: {
            stripe_current_period_start: new Date(sub.current_period_start * 1000),
            stripe_current_period_end: new Date(sub.current_period_end * 1000),
            stripe_cancel_at_period_end: sub.cancel_at_period_end,
            promotion_end_date: new Date(sub.current_period_end * 1000),
          },
        });
        break;
      }

      case "customer.subscription.deleted": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub = event.data.object as unknown as { id: string };
        const product = await prisma.supplierProduct.findFirst({ where: { stripe_subscription_id: sub.id } });
        if (!product) break;
        await prisma.supplierProduct.update({
          where: { id: product.id },
          data: { promotion_status: "expired", payment_status: "cancelled", promotion_tier: "basic" },
        });
        await createAuditLog({ entityType: "supplier_product", entityId: String(product.id), action: "promotion_tier_changed", previousValue: { promotion_tier: product.promotion_tier }, newValue: { promotion_tier: "basic", reason: "subscription_cancelled" }, supplierId: product.supplier_id, productId: product.id });
        break;
      }

      case "invoice.payment_succeeded": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const inv = event.data.object as unknown as { subscription?: string; paid: boolean };
        if (!inv.subscription) break;
        const product = await prisma.supplierProduct.findFirst({ where: { stripe_subscription_id: String(inv.subscription) } });
        if (!product) break;
        await prisma.supplierProduct.update({
          where: { id: product.id },
          data: { payment_status: "paid", promotion_status: "active", stripe_latest_invoice_status: "paid" },
        });
        break;
      }

      case "invoice.payment_failed": {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const inv = event.data.object as unknown as { subscription?: string };
        if (!inv.subscription) break;
        const product = await prisma.supplierProduct.findFirst({ where: { stripe_subscription_id: String(inv.subscription) } });
        if (!product) break;
        await prisma.supplierProduct.update({
          where: { id: product.id },
          data: { payment_status: "failed", stripe_latest_invoice_status: "failed" },
        });
        await createAuditLog({ entityType: "supplier_product", entityId: String(product.id), action: "payment_status_changed", newValue: { payment_status: "failed" }, supplierId: product.supplier_id, productId: product.id });
        break;
      }
    }
  } catch (err) {
    console.error("[Stripe webhook] Handler error:", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
