import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { RequestStatusBadge } from "@/components/client/badges";

export const dynamic = "force-dynamic";

export default async function MyQuoteRequestsPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const editMode = (await searchParams).mode === "edit";
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/client/quote-requests");

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
          <h1 className="text-2xl font-extrabold text-slate-900">{editMode ? "Edit quote requests" : "My quote requests"}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {editMode
              ? "Pick a request to update. Businesses you've already contacted will be notified of the changes."
              : "All your requests and how many businesses they reached."}
          </p>
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
        <ul className="space-y-3">
          {requests.map((r) => {
            const editable = r.status !== "closed";
            return (
              <li key={r.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-base font-bold text-slate-900">{r.work_category?.name ?? "Building works"}</h3>
                      <RequestStatusBadge status={r.status} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {r.suburb} {r.postcode} · {r._count.deliveries} sent · created{" "}
                      {new Date(r.created_at).toLocaleDateString("en-AU")}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/client/quote-requests/${r.id}`}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View
                    </Link>
                    {editable && (
                      <Link
                        href={`/client/quote-requests/${r.id}/edit`}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                          editMode
                            ? "bg-red-700 text-white hover:bg-red-800"
                            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        Edit
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
