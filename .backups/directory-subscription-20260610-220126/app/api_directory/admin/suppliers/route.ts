import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireWriteAdmin } from "@/lib/admin-auth";
import { createAuditLog, getIpAndAgent } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { user, error } = await requireAdmin(request);
  if (error) return error;

  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const search = url.searchParams.get("search") ?? "";
  const status = url.searchParams.get("status") ?? "";
  const limit = 50;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { brand_name: { contains: search, mode: "insensitive" } },
      { contact_email: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status) where.status = status;

  const [items, total] = await Promise.all([
    prisma.supplier.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
      include: {
        _count: { select: { products: true } },
        users: { select: { id: true, email: true, full_name: true } },
      },
    }),
    prisma.supplier.count({ where }),
  ]);

  return NextResponse.json({ items, total, totalPages: Math.ceil(total / limit), page });
}

export async function POST(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.brand_name) return NextResponse.json({ error: "brand_name is required" }, { status: 400 });

  const slug = body.slug || body.brand_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36);

  const existing = await prisma.supplier.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });

  const supplier = await prisma.supplier.create({
    data: {
      slug,
      brand_name: body.brand_name,
      logo_url: body.logo_url || null,
      website: body.website || null,
      australian_website: body.australian_website || null,
      contact_name: body.contact_name || null,
      contact_email: body.contact_email || null,
      contact_phone: body.contact_phone || null,
      billing_email: body.billing_email || null,
      status: body.status ?? "draft",
      admin_notes: body.admin_notes || null,
    },
  });

  const { ip, ua } = getIpAndAgent(request);
  await createAuditLog({ actorId: user!.id, actorEmail: user!.email, actorRole: user!.role, entityType: "supplier", entityId: String(supplier.id), action: "supplier_created", newValue: { id: supplier.id, brand_name: supplier.brand_name }, ipAddress: ip, userAgent: ua });

  return NextResponse.json(supplier, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const existing = await prisma.supplier.findUnique({ where: { id: body.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: Record<string, unknown> = {};
  for (const f of ["brand_name","slug","logo_url","website","australian_website","contact_name","contact_email","contact_phone","billing_email","status","admin_notes","supplier_notes","current_plan","payment_status"]) {
    if (body[f] !== undefined) data[f] = body[f] || null;
  }

  const updated = await prisma.supplier.update({ where: { id: body.id }, data });

  const { ip, ua } = getIpAndAgent(request);
  await createAuditLog({ actorId: user!.id, actorEmail: user!.email, actorRole: user!.role, entityType: "supplier", entityId: String(body.id), action: "supplier_updated", previousValue: existing, newValue: updated, supplierId: body.id, ipAddress: ip, userAgent: ua });

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const existing = await prisma.supplier.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.supplier.delete({ where: { id } });

  const { ip, ua } = getIpAndAgent(request);
  await createAuditLog({ actorId: user!.id, actorEmail: user!.email, actorRole: user!.role, entityType: "supplier", entityId: String(id), action: "supplier_deleted", previousValue: { brand_name: existing.brand_name }, ipAddress: ip, userAgent: ua });

  return NextResponse.json({ success: true });
}
