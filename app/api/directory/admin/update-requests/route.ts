import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWriteAdmin } from "@/lib/admin-auth";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;

  const url = new URL(request.url);
  const type = url.searchParams.get("type"); // "supplier" | "product"
  const status = url.searchParams.get("status");
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const take = 50;
  const skip = (page - 1) * take;

  const statusFilter = status ? { status: status as never } : {};

  const [supplierReqs, productReqs] = await Promise.all([
    type !== "product"
      ? prisma.supplierUpdateRequest.findMany({
          where: statusFilter,
          include: { supplier: { select: { brand_name: true, slug: true } } },
          orderBy: { created_at: "desc" },
          skip,
          take,
        })
      : [],
    type !== "supplier"
      ? prisma.productUpdateRequest.findMany({
          where: statusFilter,
          include: {
            product: { select: { product_name: true } },
          },
          orderBy: { created_at: "desc" },
          skip,
          take,
        })
      : [],
  ]);

  return NextResponse.json({
    supplier_requests: JSON.parse(JSON.stringify(supplierReqs)),
    product_requests: JSON.parse(JSON.stringify(productReqs)),
  });
}

export async function PATCH(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.id || !body?.type || !body?.status) {
    return NextResponse.json({ error: "id, type, and status required" }, { status: 400 });
  }

  const validStatuses = ["pending", "approved", "rejected", "needs_info", "cancelled"];
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (body.type === "supplier") {
    const req = await prisma.supplierUpdateRequest.update({
      where: { id: body.id },
      data: { status: body.status, admin_notes: body.admin_notes ?? undefined, reviewed_by: user!.id, reviewed_at: new Date() },
    });
    if (body.status === "approved" && body.apply_changes) {
      await prisma.supplier.update({ where: { id: req.supplier_id }, data: req.field_changes as never });
    }
    await createAuditLog({ entityType: "supplier", entityId: String(req.supplier_id), action: "update_request_reviewed", newValue: { status: body.status, request_id: req.id }, actorId: user!.id });
    return NextResponse.json({ request: JSON.parse(JSON.stringify(req)) });
  }

  if (body.type === "product") {
    const req = await prisma.productUpdateRequest.update({
      where: { id: body.id },
      data: { status: body.status, admin_notes: body.admin_notes ?? undefined, reviewed_by: user!.id, reviewed_at: new Date() },
    });
    if (body.status === "approved" && body.apply_changes) {
      await prisma.supplierProduct.update({ where: { id: req.product_id }, data: req.field_changes as never });
    }
    await createAuditLog({ entityType: "supplier_product", entityId: String(req.product_id), action: "update_request_reviewed", newValue: { status: body.status, request_id: req.id }, actorId: user!.id, productId: req.product_id });
    return NextResponse.json({ request: JSON.parse(JSON.stringify(req)) });
  }

  return NextResponse.json({ error: "type must be supplier or product" }, { status: 400 });
}
