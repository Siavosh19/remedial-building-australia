import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DirectorySignupsPage() {
  const companies = await prisma.company.findMany({
    where: { users: { some: {} } },
    orderBy: { created_at: "desc" },
    include: {
      main_category: { select: { name: true } },
      locations: { take: 1 },
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Directory Signups</h1>
          <p className="text-sm text-slate-500 mt-1">{companies.length} {companies.length === 1 ? "signup" : "signups"}</p>
        </div>
        <a
          href="/api/directory/admin/export?type=directory"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition"
        >
          Export CSV
        </a>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Company</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Location</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Claimed</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Joined</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.email ?? "—"}</div>
                </td>
                <td className="px-4 py-3 text-slate-500">{c.main_category?.name ?? "—"}</td>
                <td className="px-4 py-3 text-slate-500">{c.locations[0] ? `${c.locations[0].suburb}, ${c.locations[0].state}` : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${c.is_claimed ? "text-green-600" : "text-slate-400"}`}>
                    {c.is_claimed ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString("en-AU")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
