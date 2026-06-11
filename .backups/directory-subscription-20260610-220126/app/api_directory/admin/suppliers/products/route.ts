import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireWriteAdmin } from "@/lib/admin-auth";
import { createAuditLog, getIpAndAgent } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const url = new URL(request.url);
  const supplierId = url.searchParams.get("supplier_id") ? Number(url.searchParams.get("supplier_id")) : undefined;
  const status = url.searchParams.get("status") ?? "";
  const promotion = url.searchParams.get("promotion") ?? "";
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = 50;

  const where: Record<string, unknown> = {};
  if (supplierId) where.supplier_id = supplierId;
  if (status) where.status = status;
  if (promotion) where.promotion_status = promotion;

  const [items, total] = await Promise.all([
    prisma.supplierProduct.findMany({
      where,
      orderBy: [{ promotion_tier: "desc" }, { created_at: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
      include: { supplier: { select: { id: true, brand_name: true, slug: true, status: true } } },
    }),
    prisma.supplierProduct.count({ where }),
  ]);

  return NextResponse.json({ items, total, totalPages: Math.ceil(total / limit), page });
}

export async function POST(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.supplier_id || !body?.product_name) return NextResponse.json({ error: "supplier_id and product_name required" }, { status: 400 });

  // Duplicate check
  const dupe = await prisma.supplierProduct.findFirst({
    where: { supplier_id: body.supplier_id, product_name: { equals: body.product_name, mode: "insensitive" } },
  });
  if (dupe) return NextResponse.json({ error: "A product with this name already exists for this supplier", duplicate_id: dupe.id }, { status: 409 });

  const slug = `${body.supplier_id}-${body.product_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}-${Date.now().toString(36)}`;

  const product = await prisma.supplierProduct.create({
    data: {
      supplier_id: body.supplier_id,
      slug,
      product_name: body.product_name,
      product_category: body.product_category || null,
      repair_system_pages: body.repair_system_pages ?? [],
      application_tags: body.application_tags ?? [],
      substrate_tags: body.substrate_tags ?? [],
      tds_url: body.tds_url || null,
      sds_url: body.sds_url || null,
      product_url: body.product_url || null,
      status: body.status ?? "draft",
      admin_notes: body.admin_notes || null,
    },
  });

  const { ip, ua } = getIpAndAgent(request);
  await createAuditLog({ actorId: user!.id, actorEmail: user!.email, actorRole: user!.role, entityType: "supplier_product", entityId: String(product.id), action: "product_created", newValue: { product_name: product.product_name }, supplierId: body.supplier_id, productId: product.id, ipAddress: ip, userAgent: ua });

  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const existing = await prisma.supplierProduct.findUnique({ where: { id: body.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: Record<string, unknown> = {};
  const strFields = ["product_name","product_category","tds_url","sds_url","product_url","status","promotion_tier","promotion_status","payment_status","admin_notes","supplier_notes","stripe_subscription_id","stripe_price_id","stripe_customer_id","stripe_latest_invoice_status"];
  const boolFields = ["show_between_product_cards","show_recommended_badge","promote_on_repair_system_page","promote_in_system_selector","promote_in_ai_scope_writer","category_sponsor","stripe_cancel_at_period_end"];
  const arrFields = ["repair_system_pages","application_tags","substrate_tags"];
  const dateFields = ["promotion_start_date","promotion_end_date","renewal_date","last_checked_at","stripe_current_period_start","stripe_current_period_end"];

  for (const f of strFields) if (body[f] !== undefined) data[f] = body[f] || null;
  for (const f of boolFields) if (body[f] !== undefined) data[f] = Boolean(body[f]);
  for (const f of arrFields) if (body[f] !== undefined) data[f] = body[f];
  for (const f of dateFields) if (body[f] !== undefined) data[f] = body[f] ? new Date(body[f]) : null;
  if (body.priority_order !== undefined) data.priority_order = Number(body.priority_order);
  if (body.monthly_fee !== undefined) data.monthly_fee = body.monthly_fee ? Number(body.monthly_fee) : null;

  data.last_updated_at = new Date();

  const updated = await prisma.supplierProduct.update({ where: { id: body.id }, data });

  const { ip, ua } = getIpAndAgent(request);
  const action = body.status === "hidden" ? "product_hidden" : body.tds_url !== existing.tds_url ? "tds_link_changed" : "product_edited";
  await createAuditLog({ actorId: user!.id, actorEmail: user!.email, actorRole: user!.role, entityType: "supplier_product", entityId: String(body.id), action, previousValue: existing, newValue: updated, supplierId: existing.supplier_id, productId: body.id, ipAddress: ip, userAgent: ua });

  return NextResponse.json(updated);
}
