import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentClientUser } from "@/lib/directory-auth";
import { RequestStatusBadge } from "@/components/client/badges";

export const dynamic = "force-dynamic";

export default async function MyQuoteRequestsPage() {
  const user = await getCurrentClientUser();
  if (!user) redirect("/directory/login");

  const requests = await prisma.clientQuoteRequest.findMany({
    where: { client_user_id: user.id },
    orderBy: { created_at: "desc" },
    include: {
      work_category: { select: { name: true } },
      _count: { select: { deliveries: true, files: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My quote requests</h1>
          <p className="mt-1 text-sm text-slate-500">All your requests and how many businesses they reached.</p>
        </div>
        <Link
          href="/client/quote-requests/new"
          className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          New quote request
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">No quote requests yet.</p>
          <Link
            href="/client/quote-requests/new"
            className="mt-4 inline-block rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Create your first request
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Work category</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 font-semibold">Matches</th>
                <th className="px-5 py-3 font-semibold">Created</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((r) => (
                <tr key={r.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-900">{r.work_category?.name ?? "Building works"}</td>
                  <td className="px-5 py-4 text-slate-600">{r.suburb} {r.postcode}</td>
                  <td className="px-5 py-4 text-slate-600">{r._count.deliveries}</td>
                  <td className="px-5 py-4 text-slate-500">{new Date(r.created_at).toLocaleDateString("en-AU")}</td>
                  <td className="px-5 py-4"><RequestStatusBadge status={r.status} /></td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/client/quote-requests/${r.id}`} className="font-semibold text-sky-800 hover:text-sky-600">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
