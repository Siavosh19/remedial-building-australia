import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSupplierUser } from "@/lib/admin-auth";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const [supplierReqs, productReqs] = await Promise.all([
    prisma.supplierUpdateRequest.findMany({
      where: { supplier_id: supplierId! },
      orderBy: { created_at: "desc" },
      take: 50,
    }),
    prisma.productUpdateRequest.findMany({
      where: { product: { supplier_id: supplierId! } },
      orderBy: { created_at: "desc" },
      include: { product: { select: { product_name: true } } },
      take: 50,
    }),
  ]);

  return NextResponse.json({
    supplier_requests: JSON.parse(JSON.stringify(supplierReqs)),
    product_requests: JSON.parse(JSON.stringify(productReqs)),
  });
}

export async function POST(request: NextRequest) {
  const { user, supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.type || !body?.field_changes) {
    return NextResponse.json({ error: "type and field_changes required" }, { status: 400 });
  }

  if (body.type === "supplier") {
    const req = await prisma.supplierUpdateRequest.create({
      data: {
        supplier_id: supplierId!,
        requested_by: user!.id,
        field_changes: body.field_changes,
      },
    });
    await createAuditLog({ entityType: "supplier", entityId: String(supplierId), action: "update_request_submitted", newValue: { request_id: req.id }, supplierId: supplierId! });
    return NextResponse.json({ request: JSON.parse(JSON.stringify(req)) });
  }

  if (body.type === "product") {
    if (!body.product_id) return NextResponse.json({ error: "product_id required for product updates" }, { status: 400 });

    const product = await prisma.supplierProduct.findFirst({ where: { id: Number(body.product_id), supplier_id: supplierId! } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const req = await prisma.productUpdateRequest.create({
      data: {
        product_id: product.id,
        requested_by: user!.id,
        field_changes: body.field_changes,
      },
    });
    await createAuditLog({ entityType: "supplier_product", entityId: String(product.id), action: "update_request_submitted", newValue: { request_id: req.id }, supplierId: supplierId!, productId: product.id });
    return NextResponse.json({ request: JSON.parse(JSON.stringify(req)) });
  }

  return NextResponse.json({ error: "type must be supplier or product" }, { status: 400 });
}
