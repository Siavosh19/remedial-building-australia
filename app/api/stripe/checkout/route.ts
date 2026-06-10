import { NextRequest, NextResponse } from "next/server";
import { getStripe, STRIPE_PRICES } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { requireSupplierUser } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { user, supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.product_id || !body?.tier) return NextResponse.json({ error: "product_id and tier required" }, { status: 400 });

  const product = await prisma.supplierProduct.findFirst({
    where: { id: Number(body.product_id), supplier_id: supplierId! },
    include: { supplier: true },
  });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const priceId = STRIPE_PRICES[body.tier as keyof typeof STRIPE_PRICES];
  if (!priceId) return NextResponse.json({ error: `No Stripe price configured for tier: ${body.tier}` }, { status: 400 });

  const stripe = getStripe();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://remedialbuildingaustralia.com.au";

  // Get or create Stripe customer
  let customerId = product.supplier.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: product.supplier.billing_email ?? product.supplier.contact_email ?? user!.email,
      name: product.supplier.brand_name,
      metadata: { supplier_id: String(supplierId) },
    });
    customerId = customer.id;
    await prisma.supplier.update({ where: { id: supplierId! }, data: { stripe_customer_id: customerId } });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/supplier-dashboard/billing?success=1`,
    cancel_url: `${siteUrl}/supplier-dashboard/billing?cancelled=1`,
    metadata: { product_id: String(product.id), supplier_id: String(supplierId), tier: body.tier },
    subscription_data: { metadata: { product_id: String(product.id), supplier_id: String(supplierId) } },
  });

  return NextResponse.json({ url: session.url });
}
