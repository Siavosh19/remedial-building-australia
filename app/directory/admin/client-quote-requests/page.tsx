import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { REQUEST_STATUS_LABELS } from "@/lib/quote-options";

export const dynamic = "force-dynamic";

const STATUS_CLS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  submitted: "bg-sky-100 text-sky-800",
  sent_to_businesses: "bg-blue-100 text-blue-800",
  responses_received: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-200 text-slate-500",
};

export default async function AdminClientQuoteRequestsPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const requests = await prisma.clientQuoteRequest.findMany({
    orderBy: { created_at: "desc" },
    take: 500,
    include: {
      work_category: { select: { name: true } },
      client: { select: { email: true, full_name: true } },
      _count: { select: { deliveries: true, files: true } },
    },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Client Quote Requests</h1>
        <p className="mt-1 text-sm text-slate-500">{requests.length} total · broadcast requests from strata / client users</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="px-4 py-3 font-semibold text-slate-700">Client</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Location</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Matches</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{r.contact_name}</div>
                  <div className="text-xs text-slate-400">{r.client?.email ?? r.contact_email}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">{r.work_category?.name ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{r.suburb} {r.postcode}</td>
                <td className="px-4 py-3 text-slate-600">{r._count.deliveries}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_CLS[r.status] ?? "bg-slate-100 text-slate-600"}`}>
                    {REQUEST_STATUS_LABELS[r.status] ?? r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString("en-AU")}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/directory/admin/client-quote-requests/${r.id}`} className="text-sm font-semibold text-sky-700 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!requests.length && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No client quote requests yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
