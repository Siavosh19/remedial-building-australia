import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { CLIENT_TYPE_LABELS } from "@/lib/quote-options";
import SuspendUserButton from "@/components/admin/SuspendUserButton";

export const dynamic = "force-dynamic";

export default async function AdminClientUsersPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const users = await prisma.user.findMany({
    where: { role: "client_user" },
    orderBy: { created_at: "desc" },
    take: 500,
    include: {
      client_profile: true,
      _count: { select: { client_quote_requests: true } },
    },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Client Users</h1>
        <p className="mt-1 text-sm text-slate-500">{users.length} strata / client accounts</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Company</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Requests</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{u.full_name ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{u.email}</td>
                <td className="px-4 py-3 text-slate-600">
                  {u.client_profile ? CLIENT_TYPE_LABELS[u.client_profile.client_type] ?? u.client_profile.client_type : "—"}
                </td>
                <td className="px-4 py-3 text-slate-600">{u.client_profile?.company_name ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{u._count.client_quote_requests}</td>
                <td className="px-4 py-3">
                  {u.suspended ? (
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">Suspended</span>
                  ) : u.is_verified ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">Active</span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">Unverified</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <SuspendUserButton userId={u.id} suspended={u.suspended} />
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No client users yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
