import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const url = new URL(request.url);
  const days = Number(url.searchParams.get("days") ?? 30);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const [
    totalEvents,
    byType,
    topProducts,
    promotionStats,
    supplierStats,
  ] = await Promise.all([
    prisma.productAnalyticsEvent.count({ where: { created_at: { gte: since } } }),

    prisma.productAnalyticsEvent.groupBy({
      by: ["event_type"],
      _count: { id: true },
      where: { created_at: { gte: since } },
      orderBy: { _count: { id: "desc" } },
    }),

    prisma.productAnalyticsEvent.groupBy({
      by: ["product_id"],
      _count: { id: true },
      where: { created_at: { gte: since }, product_id: { not: null } },
      orderBy: { _count: { id: "desc" } },
      take: 20,
    }),

    prisma.supplierProduct.aggregate({
      _count: {
        id: true,
      },
      where: { promotion_status: "active", payment_status: "paid" },
    }),

    prisma.supplier.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
  ]);

  // Enrich top products with names
  const productIds = topProducts.map(p => p.product_id).filter(Boolean) as number[];
  const productDetails = await prisma.supplierProduct.findMany({
    where: { id: { in: productIds } },
    select: { id: true, product_name: true, supplier: { select: { brand_name: true } } },
  });
  const productMap = Object.fromEntries(productDetails.map(p => [p.id, p]));

  return NextResponse.json({
    period_days: days,
    total_events: totalEvents,
    by_event_type: byType,
    top_products: topProducts.map(p => ({
      product_id: p.product_id,
      event_count: p._count.id,
      product: productMap[p.product_id!] ?? null,
    })),
    active_promotions: promotionStats._count.id,
    supplier_status_breakdown: supplierStats,
  });
}
