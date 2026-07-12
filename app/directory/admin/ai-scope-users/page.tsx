import { prisma } from "@/lib/prisma";
import AIScopeActions from "./AIScopeActions";

export const dynamic = "force-dynamic";

export default async function AIScopeUsersPage() {
  const [users, total] = await Promise.all([
    prisma.aIScopeUser.findMany({
      orderBy: { created_at: "desc" },
      include: { user: { select: { email: true, full_name: true } } },
      take: 100,
    }),
    prisma.aIScopeUser.count(),
  ]);

  const statusCounts = {
    pending: users.filter(u => u.status === "pending").length,
    approved: users.filter(u => u.status === "approved").length,
    active: users.filter(u => u.status === "active").length,
    trial: users.filter(u => u.status === "trial").length,
    cancelled: users.filter(u => u.status === "cancelled" || u.status === "disabled").length,
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Scope Users</h1>
          <p className="text-sm text-slate-500 mt-1">{total} total applications</p>
        </div>
        <a
          href="/api/directory/admin/export?type=ai-scope-users"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition"
        >
          Export CSV
        </a>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl font-black text-slate-900">{count}</div>
            <div className="text-xs text-slate-500 capitalize mt-1">{status}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">User</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Company</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Plan</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Scopes</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Applied</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{u.user.full_name ?? "—"}</div>
                  <div className="text-xs text-slate-400">{u.user.email}</div>
                </td>
                <td className="px-4 py-3 text-slate-600 text-sm">{u.company ?? "—"}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{u.job_role ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    u.status === "active" ? "bg-green-100 text-green-700" :
                    u.status === "pending" ? "bg-amber-100 text-amber-700" :
                    u.status === "trial" ? "bg-blue-100 text-blue-700" :
                    u.status === "approved" ? "bg-indigo-100 text-indigo-700" :
                    "bg-red-100 text-red-700"
                  }`}>{u.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{u.plan_type ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{u.scopes_created}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{new Date(u.created_at).toLocaleDateString("en-AU")}</td>
                <td className="px-4 py-3">
                  <AIScopeActions userId={u.id} status={u.status} />
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-400">No applications yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

