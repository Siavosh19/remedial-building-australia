import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UpdateRequestsPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const [supplierRequests, productRequests] = await Promise.all([
    prisma.supplierUpdateRequest.findMany({
      orderBy: { created_at: "desc" },
      include: { supplier: { select: { brand_name: true, slug: true } } },
    }),
    prisma.productUpdateRequest.findMany({
      orderBy: { created_at: "desc" },
      include: { product: { select: { product_name: true, supplier: { select: { brand_name: true } } } } },
    }),
  ]);

  function statusBadge(status: string) {
    const cls =
      status === "pending" ? "bg-amber-100 text-amber-800" :
      status === "approved" ? "bg-emerald-100 text-emerald-800" :
      "bg-rose-100 text-rose-800";
    return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{status}</span>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Update Requests</h1>
        <p className="text-sm text-slate-500 mt-1">
          {supplierRequests.length} supplier · {productRequests.length} product
        </p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-3">Supplier Update Requests</h2>
        <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Fields changed</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {supplierRequests.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <a href={`/directory/admin/suppliers/${r.supplier.slug}`} className="hover:underline text-sky-700">
                      {r.supplier.brand_name}
                    </a>
                  </td>
                  <td className="px-4 py-3">{statusBadge(r.status)}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs max-w-xs truncate">
                    {Object.keys(r.field_changes as object).join(", ")}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">
                    {r.created_at.toLocaleDateString("en-AU")}
                  </td>
                </tr>
              ))}
              {!supplierRequests.length && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-400">No supplier update requests</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-3">Product Update Requests</h2>
        <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Fields changed</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {productRequests.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-900">{r.product.product_name}</td>
                  <td className="px-4 py-3 text-slate-500">{r.product.supplier.brand_name}</td>
                  <td className="px-4 py-3">{statusBadge(r.status)}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs max-w-xs truncate">
                    {Object.keys(r.field_changes as object).join(", ")}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">
                    {r.created_at.toLocaleDateString("en-AU")}
                  </td>
                </tr>
              ))}
              {!productRequests.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">No product update requests</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
