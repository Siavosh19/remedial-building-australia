import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSupplierUser } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { supplierId, error } = await requireSupplierUser(request);
  if (error) return error;

  const url = new URL(request.url);
  const days = Math.min(Number(url.searchParams.get("days") ?? "30"), 90);
  const since = new Date(Date.now() - days * 86400000);

  const products = await prisma.supplierProduct.findMany({
    where: { supplier_id: supplierId! },
    select: { id: true, product_name: true },
  });
  const productIds = products.map(p => p.id);

  if (!productIds.length) return NextResponse.json({ summary: [], totals: {} });

  const events = await prisma.productAnalyticsEvent.groupBy({
    by: ["product_id", "event_type"],
    where: { product_id: { in: productIds }, created_at: { gte: since } },
    _count: { id: true },
  });

  const summary = products.map(p => {
    const pEvents = events.filter(e => e.product_id === p.id);
    return {
      product_id: p.id,
      product_name: p.product_name,
      impressions: pEvents.find(e => e.event_type === "product_impression")?._count.id ?? 0,
      clicks: pEvents.find(e => e.event_type === "product_click")?._count.id ?? 0,
      tds_clicks: pEvents.find(e => e.event_type === "tds_click")?._count.id ?? 0,
      website_clicks: pEvents.find(e => e.event_type === "website_click")?._count.id ?? 0,
    };
  });

  const totals = {
    impressions: summary.reduce((a, b) => a + b.impressions, 0),
    clicks: summary.reduce((a, b) => a + b.clicks, 0),
    tds_clicks: summary.reduce((a, b) => a + b.tds_clicks, 0),
    website_clicks: summary.reduce((a, b) => a + b.website_clicks, 0),
  };

  return NextResponse.json({ summary, totals, days });
}
