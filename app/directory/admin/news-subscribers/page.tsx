import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Subscriber = { name: string; email: string; interest_category: string; subscribed_at: Date };

export default async function NewsSubscribersPage() {
  const rows = await prisma.$queryRaw<Subscriber[]>`
    SELECT name, email, interest_category, subscribed_at
    FROM newsletter_subscribers
    ORDER BY subscribed_at DESC
  `;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>
          <p className="text-sm text-slate-500 mt-1">{rows.length} total subscribers</p>
        </div>
        <a
          href="/api/directory/admin/export?type=newsletter"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition"
        >
          Export CSV
        </a>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="px-4 py-3 text-slate-900">{r.name || "—"}</td>
                <td className="px-4 py-3 text-slate-600">{r.email}</td>
                <td className="px-4 py-3 text-slate-500">{r.interest_category || "—"}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{new Date(r.subscribed_at).toLocaleDateString("en-AU")}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">No subscribers yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
