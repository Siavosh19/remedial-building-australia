import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewsSubscribersPage() {
  const rows = await prisma.user.findMany({
    where: { account_type: "newsletter_subscriber" },
    orderBy: { created_at: "desc" },
    select: { id: true, full_name: true, email: true, created_at: true },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>
          <p className="text-sm text-slate-500 mt-1">{rows.length} total subscribers</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="px-4 py-3 text-slate-900">{r.full_name || "—"}</td>
                <td className="px-4 py-3 text-slate-600">{r.email}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{r.created_at.toLocaleDateString("en-AU")}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-400">No subscribers yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
