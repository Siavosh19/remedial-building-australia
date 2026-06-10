import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSupplierUser } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const products = await prisma.supplierProduct.findMany({
    where: { supplier_id: supplierId! },
    select: {
      id: true,
      product_name: true,
      promotion_tier: true,
      promotion_status: true,
      payment_status: true,
      monthly_fee: true,
      stripe_subscription_id: true,
      stripe_current_period_start: true,
      stripe_current_period_end: true,
      stripe_cancel_at_period_end: true,
      stripe_latest_invoice_status: true,
      promotion_start_date: true,
      promotion_end_date: true,
    },
    orderBy: { created_at: "desc" },
  });

  const supplier = await prisma.supplier.findUnique({
    where: { id: supplierId! },
    select: { stripe_customer_id: true, billing_email: true, current_plan: true },
  });

  return NextResponse.json({ products: JSON.parse(JSON.stringify(products)), supplier });
}
