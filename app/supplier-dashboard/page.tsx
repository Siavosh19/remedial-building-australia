import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SupplierDashboardPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || user.role !== "supplier_user" || !user.supplier_id) redirect("/directory/login");

  const supplier = await prisma.supplier.findUnique({
    where: { id: user.supplier_id },
    include: {
      products: { orderBy: { created_at: "desc" } },
      _count: { select: { products: true, update_requests: true } },
    },
  });

  if (!supplier) redirect("/directory/login");

  const activeProducts = supplier.products.filter(p => p.promotion_status === "active" && p.payment_status === "paid");
  const pendingRequests = await prisma.supplierUpdateRequest.count({
    where: { supplier_id: supplier.id, status: "pending" },
  });

  const analytics30d = await prisma.productAnalyticsEvent.groupBy({
    by: ["event_type"],
    where: {
      product_id: { in: supplier.products.map(p => p.id) },
      created_at: { gte: new Date(Date.now() - 30 * 86400000) },
    },
    _count: { id: true },
  });

  const impressions = analytics30d.find(e => e.event_type === "product_impression")?._count.id ?? 0;
  const clicks = analytics30d.find(e => e.event_type === "product_click")?._count.id ?? 0;

  const statCards = [
    { label: "Total Products", value: supplier._count.products, href: "/supplier-dashboard/products", color: "slate" },
    { label: "Active Promotions", value: activeProducts.length, href: "/supplier-dashboard/promotions", color: "green" },
    { label: "Impressions (30d)", value: impressions.toLocaleString(), href: "/supplier-dashboard/analytics", color: "indigo" },
    { label: "Clicks (30d)", value: clicks.toLocaleString(), href: "/supplier-dashboard/analytics", color: "indigo" },
    { label: "Pending Requests", value: pendingRequests, href: "/supplier-dashboard/update-requests", color: pendingRequests > 0 ? "amber" : "slate" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Welcome, {supplier.brand_name}</h1>
        <p className="text-sm text-slate-500 mt-1">Your supplier portal overview</p>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        {statCards.map(card => (
          <Link key={card.label} href={card.href} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition group">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{card.label}</div>
            <div className={`text-3xl font-black mt-1 ${card.color === "green" ? "text-green-700" : card.color === "amber" ? "text-amber-600" : card.color === "indigo" ? "text-indigo-700" : "text-slate-900"}`}>
              {card.value}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-700">Your Products</h2>
            <Link href="/supplier-dashboard/products" className="text-xs text-indigo-600 hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {supplier.products.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                <div>
                  <div className="text-sm font-medium text-slate-800">{p.product_name}</div>
                  <div className="text-xs text-slate-400">{p.product_category ?? "—"}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  p.promotion_tier === "premium" ? "bg-purple-100 text-purple-700" :
                  p.promotion_tier === "promoted" ? "bg-blue-100 text-blue-700" :
                  "bg-slate-100 text-slate-600"
                }`}>{p.promotion_tier}</span>
              </div>
            ))}
            {!supplier.products.length && <p className="text-sm text-slate-400">No products yet. Contact us to add your products.</p>}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-700">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            <Link href="/supplier-dashboard/promotions" className="flex items-center gap-3 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 hover:bg-indigo-100 transition">
              <span className="text-indigo-600 font-bold text-sm">↑</span>
              <div>
                <div className="text-sm font-semibold text-indigo-800">Upgrade a Promotion</div>
                <div className="text-xs text-indigo-600">Boost your product visibility</div>
              </div>
            </Link>
            <Link href="/supplier-dashboard/update-requests" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition">
              <span className="text-slate-600 font-bold text-sm">✎</span>
              <div>
                <div className="text-sm font-semibold text-slate-700">Request a Profile Update</div>
                <div className="text-xs text-slate-500">Submit changes for admin review</div>
              </div>
            </Link>
            <Link href="/supplier-dashboard/billing" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition">
              <span className="text-slate-600 font-bold text-sm">$</span>
              <div>
                <div className="text-sm font-semibold text-slate-700">Manage Billing</div>
                <div className="text-xs text-slate-500">View invoices and subscriptions</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
