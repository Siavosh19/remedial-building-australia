import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const since30 = new Date(Date.now() - 30 * 86400000);

  const [totalEvents, topProducts, byType, supplierStats] = await Promise.all([
    prisma.productAnalyticsEvent.count({ where: { created_at: { gte: since30 } } }),
    prisma.productAnalyticsEvent.groupBy({
      by: ["product_id"],
      where: { created_at: { gte: since30 } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    prisma.productAnalyticsEvent.groupBy({
      by: ["event_type"],
      where: { created_at: { gte: since30 } },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.supplier.findMany({
      where: { status: "active" },
      include: {
        _count: { select: { products: true } },
        products: {
          select: { promotion_tier: true, promotion_status: true },
        },
      },
      take: 10,
    }),
  ]);

  const productIds = topProducts.map(p => p.product_id).filter(Boolean) as number[];
  const productNames = productIds.length
    ? await prisma.supplierProduct.findMany({
        where: { id: { in: productIds } },
        select: { id: true, product_name: true, supplier: { select: { brand_name: true } } },
      })
    : [];

  const productMap = new Map(productNames.map(p => [p.id, p]));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Last 30 days — {totalEvents.toLocaleString()} total events</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-700 mb-4">Events by Type</h2>
          <div className="space-y-2">
            {byType.map(e => (
              <div key={e.event_type} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 font-mono">{e.event_type}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 rounded-full bg-indigo-200" style={{ width: `${Math.round((e._count.id / (totalEvents || 1)) * 120)}px` }} />
                  <span className="text-sm font-bold text-slate-900">{e._count.id.toLocaleString()}</span>
                </div>
              </div>
            ))}
            {!byType.length && <p className="text-sm text-slate-400">No events recorded</p>}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-700 mb-4">Top Products by Events</h2>
          <div className="space-y-2">
            {topProducts.map((p, i) => {
              const prod = p.product_id ? productMap.get(p.product_id) : null;
              return (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-700 font-medium">{prod?.product_name ?? `Product #${p.product_id}`}</div>
                    <div className="text-xs text-slate-400">{prod?.supplier.brand_name ?? "—"}</div>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{p._count.id.toLocaleString()}</span>
                </div>
              );
            })}
            {!topProducts.length && <p className="text-sm text-slate-400">No events recorded</p>}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700 mb-4">Supplier Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          {supplierStats.map(s => {
            const activeProducts = s.products.filter(p => p.promotion_status === "active");
            const premiumCount = s.products.filter(p => p.promotion_tier === "premium").length;
            return (
              <div key={s.id} className="rounded-lg border border-slate-200 p-3">
                <div className="font-semibold text-slate-900 text-sm">{s.brand_name}</div>
                <div className="text-xs text-slate-500 mt-1">{s._count.products} products · {activeProducts.length} active</div>
                {premiumCount > 0 && <div className="text-xs text-purple-600 mt-0.5">{premiumCount} premium</div>}
              </div>
            );
          })}
          {!supplierStats.length && <p className="text-sm text-slate-400 col-span-4">No suppliers</p>}
        </div>
      </div>
    </div>
  );
}
