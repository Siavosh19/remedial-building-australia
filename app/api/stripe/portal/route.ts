import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { requireSupplierUser } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const supplier = await prisma.supplier.findUnique({ where: { id: supplierId! } });
  if (!supplier?.stripe_customer_id) return NextResponse.json({ error: "No Stripe customer found. Complete a payment first." }, { status: 400 });

  const stripe = getStripe();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://remedialbuildingaustralia.com.au";

  const session = await stripe.billingPortal.sessions.create({
    customer: supplier.stripe_customer_id,
    return_url: `${siteUrl}/supplier-dashboard/billing`,
  });

  return NextResponse.json({ url: session.url });
}
