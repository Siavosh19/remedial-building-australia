import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSupplierUser } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const products = await prisma.supplierProduct.findMany({
    where: { supplier_id: supplierId! },
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json({ products: JSON.parse(JSON.stringify(products)) });
}
