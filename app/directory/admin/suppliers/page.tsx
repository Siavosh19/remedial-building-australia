import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminSuppliersPage() {
  const [suppliers, total] = await Promise.all([
    prisma.supplier.findMany({
      orderBy: { created_at: "desc" },
      include: {
        products: { select: { id: true, promotion_tier: true, promotion_status: true, payment_status: true }, take: 10 },
        _count: { select: { products: true } },
      },
      take: 100,
    }),
    prisma.supplier.count(),
  ]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Suppliers</h1>
          <p className="text-sm text-slate-500 mt-1">{total} total</p>
        </div>
        <div className="flex gap-3">
          <a
            href="/api/directory/admin/export?type=suppliers"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Export CSV
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Brand</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Contact</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Plan</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Products</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Created</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700" />
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => {
              const activeProducts = s.products.filter(p => p.promotion_status === "active");
              return (
                <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{s.brand_name}</div>
                    <div className="text-xs text-slate-400">{s.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-600">{s.contact_name ?? "—"}</div>
                    <div className="text-xs text-slate-400">{s.contact_email ?? s.billing_email ?? "—"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      s.status === "active" ? "bg-green-100 text-green-700" :
                      s.status === "draft" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{s.current_plan ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="text-slate-900">{s._count.products} total</div>
                    {activeProducts.length > 0 && (
                      <div className="text-xs text-green-600">{activeProducts.length} active</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(s.created_at).toLocaleDateString("en-AU")}</td>
                  <td className="px-4 py-3">
                    <Link href={`/directory/admin/suppliers/${s.slug}`} className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold">
                      Manage →
                    </Link>
                  </td>
                </tr>
              );
            })}
            {!suppliers.length && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">No suppliers yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
