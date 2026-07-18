import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SupplierMarketingPage() {
  const products = await prisma.supplierProduct.findMany({
    orderBy: [{ promotion_tier: "desc" }, { created_at: "desc" }],
    include: { supplier: { select: { brand_name: true, slug: true } } },
    take: 200,
  });

  const byTier = {
    premium: products.filter(p => p.promotion_tier === "premium"),
    promoted: products.filter(p => p.promotion_tier === "promoted"),
    basic: products.filter(p => p.promotion_tier === "basic"),
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Supplier Marketing</h1>
          <p className="text-sm text-slate-500 mt-1">Active promotions across all tiers</p>
        </div>
        <Link
          href="/api/directory/admin/export?type=supplier-products"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition"
        >
          Export CSV
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["premium", "promoted", "basic"] as const).map(tier => (
          <div key={tier} className={`rounded-xl border p-4 ${
            tier === "premium" ? "border-purple-200 bg-purple-50" :
            tier === "promoted" ? "border-blue-200 bg-blue-50" :
            "border-slate-200 bg-white"
          }`}>
            <div className="text-lg font-bold text-slate-900 capitalize">{tier}</div>
            <div className="text-3xl font-black mt-1">{byTier[tier].length}</div>
            <div className="text-xs text-slate-500 mt-1">
              {byTier[tier].filter(p => p.promotion_status === "active").length} active
            </div>
          </div>
        ))}
      </div>

      {(["premium", "promoted", "basic"] as const).map(tier => (
        byTier[tier].length > 0 && (
          <div key={tier} className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3 capitalize">{tier} tier</h2>
            <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Product</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Supplier</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Category</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Payment</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Fee/mo</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Ends</th>
                  </tr>
                </thead>
                <tbody>
                  {byTier[tier].map(p => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-slate-900">{p.product_name}</td>
                      <td className="px-4 py-2.5">
                        <Link href={`/directory/admin/suppliers/${p.supplier.slug}`} className="text-indigo-600 hover:underline text-xs">
                          {p.supplier.brand_name}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-500">{p.product_category ?? "—"}</td>
                      <td className="px-4 py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          p.promotion_status === "active" ? "bg-green-100 text-green-700" :
                          p.promotion_status === "pending" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }`}>{p.promotion_status}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`text-xs font-semibold ${p.payment_status === "paid" ? "text-green-600" : "text-amber-600"}`}>
                          {p.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-500">{p.monthly_fee ? `$${p.monthly_fee}` : "—"}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-400">
                        {p.promotion_end_date ? new Date(p.promotion_end_date).toLocaleDateString("en-AU") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ))}
    </div>
  );
}
