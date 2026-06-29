import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentClientUser } from "@/lib/directory-auth";
import { RequestStatusBadge } from "@/components/client/badges";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  const user = await getCurrentClientUser();
  if (!user) redirect("/directory/login");

  const requests = await prisma.clientQuoteRequest.findMany({
    where: { client_user_id: user.id },
    orderBy: { created_at: "desc" },
    include: { work_category: { select: { name: true } }, _count: { select: { deliveries: true } } },
  });

  const counts = {
    total: requests.length,
    active: requests.filter((r) => ["submitted", "sent_to_businesses", "responses_received"].includes(r.status)).length,
    draft: requests.filter((r) => r.status === "draft").length,
    closed: requests.filter((r) => r.status === "closed").length,
  };
  const recent = requests.slice(0, 5);

  const stat = (label: string, value: number) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-3xl font-extrabold text-sky-950">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Welcome back{user.full_name ? `, ${user.full_name}` : ""}</h1>
          <p className="mt-1 text-sm text-slate-500">Request quotes for building works and track responses from listed businesses.</p>
        </div>
        <Link
          href="/client/quote-requests/new"
          className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          New quote request
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stat("Total requests", counts.total)}
        {stat("Active", counts.active)}
        {stat("Drafts", counts.draft)}
        {stat("Closed", counts.closed)}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent requests</h2>
          <Link href="/client/quote-requests" className="text-sm font-semibold text-sky-800 hover:text-sky-600">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <p className="text-sm text-slate-500">You haven't submitted any quote requests yet.</p>
            <Link
              href="/client/quote-requests/new"
              className="mt-4 inline-block rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Create your first request
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/client/quote-requests/${r.id}`}
                  className="flex items-center justify-between gap-4 py-3 transition hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{r.work_category?.name ?? "Building works"}</p>
                    <p className="truncate text-xs text-slate-500">
                      {r.suburb} {r.postcode} · Requested from {r._count.deliveries} {r._count.deliveries === 1 ? "business" : "businesses"}
                    </p>
                  </div>
                  <RequestStatusBadge status={r.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
