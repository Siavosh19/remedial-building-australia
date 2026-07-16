import Link from "next/link";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { planLabel } from "@/lib/plans";
import { URGENCY_LABELS } from "@/lib/quote-options";
import { ResponseStatusBadge } from "@/components/client/badges";

export const dynamic = "force-dynamic";

const PAID = ["claimed", "featured"];

export default async function LeadRequestsPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const rawView = (await searchParams).view?.toLowerCase();
  const view: "new" | "viewed" | "all" = rawView === "new" ? "new" : rawView === "viewed" ? "viewed" : "all";

  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: {
      id: true,
      plan_type: true,
      quote_requests_enabled: true,
      directory_subscription: { select: { subscription_status: true } },
    },
  });
  if (!company) redirect("/directory/dashboard");

  const isActive = ["active", "trialing"].includes(company.directory_subscription?.subscription_status ?? "none");
  const canReceive = PAID.includes(company.plan_type) && company.quote_requests_enabled && isActive;

  if (!canReceive) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Matched Leads</h1>
          <p className="mt-1 text-sm text-slate-500">Quote requests from strata managers, owners corporations and property owners.</p>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h2 className="text-lg font-bold text-amber-900">Upgrade to receive lead requests</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-amber-800">
            Silver and Gold listings receive matching quote requests by email and here in your dashboard.
            Gold listings get higher ranking and stronger exposure in matching.
          </p>
          <Link
            href="/directory/dashboard/subscription"
            className="mt-5 inline-block rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            View plans
          </Link>
        </div>
      </div>
    );
  }

  const baseWhere: Prisma.QuoteRequestDeliveryWhereInput = {
    company_id: company.id,
    request: { status: { not: "draft" } },
  };
  const viewWhere: Prisma.QuoteRequestDeliveryWhereInput =
    view === "new"
      ? { ...baseWhere, opened_at: null }
      : view === "viewed"
        ? { ...baseWhere, opened_at: { not: null } }
        : baseWhere;

  const [deliveries, totalCount, newCount] = await Promise.all([
    prisma.quoteRequestDelivery.findMany({
      where: viewWhere,
      orderBy: { created_at: "desc" },
      take: 200,
      include: { request: { select: { suburb: true, postcode: true, urgency: true, status: true, work_category: { select: { name: true } } } } },
    }),
    prisma.quoteRequestDelivery.count({ where: baseWhere }),
    prisma.quoteRequestDelivery.count({ where: { ...baseWhere, opened_at: null } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {view === "new" ? "New Leads" : view === "viewed" ? "Viewed Leads" : "All Leads"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Quote requests from strata managers, owners corporations and property owners ·{" "}
          <span className="font-semibold">{planLabel(company.plan_type)}</span>
        </p>
      </div>

      {/* View tabs — mirror the three Leads nav items */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { key: "new", label: `New (${newCount})`, href: "/directory/dashboard/lead-requests?view=new" },
          { key: "all", label: `All (${totalCount})`, href: "/directory/dashboard/lead-requests" },
          { key: "viewed", label: `Viewed (${totalCount - newCount})`, href: "/directory/dashboard/lead-requests?view=viewed" },
        ].map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              view === t.key ? "bg-sky-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {deliveries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            {view === "new"
              ? "No new leads right now. New matching quote requests will appear here."
              : view === "viewed"
                ? "No viewed leads yet."
                : "No lead requests yet. Matching quote requests will appear here."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Work category</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 font-semibold">Urgency</th>
                <th className="px-5 py-3 font-semibold">Received</th>
                <th className="px-5 py-3 font-semibold">Your response</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveries.map((d) => {
                // A closed request needs no action, so it never gets the unread
                // highlight — it carries a Closed badge instead.
                const closed = d.request.status === "closed";
                return (
                <tr key={d.id} className={`transition hover:bg-slate-50 ${!d.opened_at && !closed ? "bg-sky-50/40" : ""}`}>
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {!d.opened_at && !closed && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sky-500 align-middle" />}
                    <span className={closed ? "text-slate-500" : undefined}>{d.request.work_category?.name ?? "Building works"}</span>
                    {closed && (
                      <span className="ml-2 inline-block rounded-full bg-slate-200 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        Closed
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{d.request.suburb} {d.request.postcode}</td>
                  <td className="px-5 py-4 text-slate-600">{URGENCY_LABELS[d.request.urgency] ?? d.request.urgency}</td>
                  <td className="px-5 py-4 text-slate-500">{new Date(d.created_at).toLocaleDateString("en-AU")}</td>
                  <td className="px-5 py-4"><ResponseStatusBadge status={d.response_status} /></td>
                  <td className="px-5 py-4 text-center">
                    <Link
                      href={`/directory/dashboard/lead-requests/${d.id}`}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-sky-950 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-800"
                    >
                      View request
                    </Link>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
