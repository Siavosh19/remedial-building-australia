import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireWriteAdmin } from "@/lib/admin-auth";
import { syncJobPricingToStripe } from "@/lib/jobs-pricing";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const pricing = await prisma.jobPricing.findMany({ orderBy: [{ display_order: "asc" }, { amount_cents: "asc" }] });
  return NextResponse.json({ pricing, stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY) });
}

function slugKey(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function POST(request: NextRequest) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const name = String(body.name ?? "").trim();
  const key = (body.key ? String(body.key) : slugKey(name)).trim();
  const amount = Number(body.amount_cents);
  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!key) return NextResponse.json({ error: "Key is required." }, { status: 400 });
  if (!Number.isInteger(amount) || amount < 0) return NextResponse.json({ error: "Amount must be whole cents." }, { status: 400 });

  const exists = await prisma.jobPricing.findUnique({ where: { key } });
  if (exists) return NextResponse.json({ error: `A pricing item with key "${key}" already exists.` }, { status: 409 });

  const stripeIds = await syncJobPricingToStripe({
    name, description: body.description ? String(body.description) : null,
    amount_cents: amount, currency: body.currency ? String(body.currency).toLowerCase() : "aud",
    key, stripe_product_id: null,
  });

  const row = await prisma.jobPricing.create({
    data: {
      key, name,
      description: body.description ? String(body.description) : null,
      kind: body.kind === "addon" ? "addon" : "listing",
      amount_cents: amount,
      currency: body.currency ? String(body.currency).toLowerCase() : "aud",
      duration_days: Number.isFinite(Number(body.duration_days)) ? Number(body.duration_days) : 30,
      features: Array.isArray(body.features) ? body.features.map(String).filter(Boolean) : [],
      is_active: body.is_active !== false,
      display_order: Number.isFinite(Number(body.display_order)) ? Number(body.display_order) : 0,
      stripe_product_id: stripeIds.stripe_product_id,
      stripe_price_id: stripeIds.stripe_price_id,
    },
  });
  return NextResponse.json({ pricing: row, synced: Boolean(stripeIds.stripe_price_id) });
}
