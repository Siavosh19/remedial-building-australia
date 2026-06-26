import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { planLabel } from "@/lib/plans";
import { URGENCY_LABELS } from "@/lib/quote-options";
import { ResponseStatusBadge } from "@/components/client/badges";

export const dynamic = "force-dynamic";

const PAID = ["claimed", "featured"];

export default async function LeadRequestsPage() {
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
          <h1 className="text-2xl font-bold text-slate-900">Lead Requests</h1>
          <p className="mt-1 text-sm text-slate-500">Quote requests from strata managers, owners corporations and property owners.</p>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h2 className="text-lg font-bold text-amber-900">Upgrade to receive lead requests</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-amber-800">
            Premium and Premium Plus listings receive matching quote requests by email and here in your dashboard.
            Premium Plus listings get higher ranking and stronger exposure in matching.
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

  const deliveries = await prisma.quoteRequestDelivery.findMany({
    where: { company_id: company.id, request: { status: { not: "draft" } } },
    orderBy: { created_at: "desc" },
    take: 200,
    include: { request: { select: { suburb: true, postcode: true, urgency: true, work_category: { select: { name: true } } } } },
  });

  const newCount = deliveries.filter((d) => !d.opened_at).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lead Requests</h1>
          <p className="mt-1 text-sm text-slate-500">
            {deliveries.length} received{newCount > 0 ? ` · ${newCount} new` : ""} ·{" "}
            <span className="font-semibold">{planLabel(company.plan_type)}</span>
          </p>
        </div>
      </div>

      {deliveries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">No lead requests yet. Matching quote requests will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
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
              {deliveries.map((d) => (
                <tr key={d.id} className={`transition hover:bg-slate-50 ${!d.opened_at ? "bg-sky-50/40" : ""}`}>
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {!d.opened_at && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-sky-500 align-middle" />}
                    {d.request.work_category?.name ?? "Building works"}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{d.request.suburb} {d.request.postcode}</td>
                  <td className="px-5 py-4 text-slate-600">{URGENCY_LABELS[d.request.urgency] ?? d.request.urgency}</td>
                  <td className="px-5 py-4 text-slate-500">{new Date(d.created_at).toLocaleDateString("en-AU")}</td>
                  <td className="px-5 py-4"><ResponseStatusBadge status={d.response_status} /></td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/directory/dashboard/lead-requests/${d.id}`} className="font-semibold text-sky-800 hover:text-sky-600">
                      Open
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
