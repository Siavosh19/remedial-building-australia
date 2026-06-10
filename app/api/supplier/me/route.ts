import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSupplierUser } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const supplier = await prisma.supplier.findUnique({
    where: { id: supplierId! },
    include: {
      products: {
        select: { id: true, product_name: true, promotion_tier: true, promotion_status: true, payment_status: true, status: true },
        orderBy: { created_at: "desc" },
      },
    },
  });

  if (!supplier) return NextResponse.json({ error: "Supplier not found" }, { status: 404 });

  return NextResponse.json({ supplier: JSON.parse(JSON.stringify(supplier)) });
}

export async function PATCH(request: NextRequest) {
  const { supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const allowed = ["contact_name", "contact_email", "contact_phone", "billing_email", "website", "description", "logo_url", "categories_served"];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) data[key] = body[key];
  }

  const supplier = await prisma.supplier.update({
    where: { id: supplierId! },
    data,
  });

  return NextResponse.json({ supplier: JSON.parse(JSON.stringify(supplier)) });
}
