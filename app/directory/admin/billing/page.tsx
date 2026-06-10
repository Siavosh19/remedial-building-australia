import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminBillingPage() {
  const [products, totalRevenue] = await Promise.all([
    prisma.supplierProduct.findMany({
      where: { payment_status: "paid", promotion_status: "active" },
      include: { supplier: { select: { brand_name: true, slug: true } } },
      orderBy: { promotion_tier: "desc" },
    }),
    prisma.supplierProduct.aggregate({
      where: { payment_status: "paid", promotion_status: "active" },
      _sum: { monthly_fee: true },
    }),
  ]);

  const overdue = await prisma.supplierProduct.findMany({
    where: { payment_status: { in: ["overdue", "failed"] } },
    include: { supplier: { select: { brand_name: true, slug: true, contact_email: true } } },
  });

  const mrr = Number(totalRevenue._sum.monthly_fee ?? 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Billing</h1>
        <p className="text-sm text-slate-500 mt-1">Subscription revenue overview</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm">
          <div className="text-xs font-semibold text-green-700 uppercase tracking-wide">Monthly Revenue</div>
          <div className="text-3xl font-black text-green-900 mt-1">${mrr.toFixed(0)}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active Subscriptions</div>
          <div className="text-3xl font-black text-slate-900 mt-1">{products.length}</div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
          <div className="text-xs font-semibold text-red-700 uppercase tracking-wide">Overdue / Failed</div>
          <div className="text-3xl font-black text-red-900 mt-1">{overdue.length}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">ARR (est.)</div>
          <div className="text-3xl font-black text-slate-900 mt-1">${(mrr * 12).toFixed(0)}</div>
        </div>
      </div>

      {overdue.length > 0 && (
        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="text-sm font-bold text-red-800 mb-3">Overdue / Failed Payments</h2>
          <div className="space-y-2">
            {overdue.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-lg bg-white border border-red-100 px-4 py-2.5">
                <div>
                  <div className="font-medium text-slate-900">{p.product_name}</div>
                  <div className="text-xs text-slate-500">{p.supplier.brand_name} · {p.supplier.contact_email ?? "no email"}</div>
                </div>
                <div className="text-right">
                  <span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700">{p.payment_status}</span>
                  {p.monthly_fee && <div className="text-xs text-slate-500 mt-0.5">${Number(p.monthly_fee)}/mo</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-700">Active Subscriptions</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Product</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Supplier</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Tier</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Fee/mo</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Renews</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Cancels</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{p.product_name}</td>
                <td className="px-4 py-3">
                  <a href={`/directory/admin/suppliers/${p.supplier.slug}`} className="text-indigo-600 hover:underline text-sm">{p.supplier.brand_name}</a>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    p.promotion_tier === "premium" ? "bg-purple-100 text-purple-700" :
                    p.promotion_tier === "promoted" ? "bg-blue-100 text-blue-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>{p.promotion_tier}</span>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">{p.monthly_fee ? `$${Number(p.monthly_fee)}` : "—"}</td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  {p.stripe_current_period_end ? new Date(p.stripe_current_period_end).toLocaleDateString("en-AU") : "—"}
                </td>
                <td className="px-4 py-3 text-xs">
                  {p.stripe_cancel_at_period_end ? (
                    <span className="text-amber-600 font-semibold">At period end</span>
                  ) : (
                    <span className="text-green-600">Renewing</span>
                  )}
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No active subscriptions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
