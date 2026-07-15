import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import {
  PROPERTY_TYPE_LABELS,
  URGENCY_LABELS,
  FILE_TYPE_OPTIONS,
  formatBudget,
} from "@/lib/quote-options";
import { RequestStatusBadge } from "@/components/client/badges";
import RequestActions from "@/components/client/RequestActions";
import InterestedBusinesses, { type InterestedBusiness } from "@/components/client/InterestedBusinesses";

export const dynamic = "force-dynamic";

const FILE_TYPE_LABELS = Object.fromEntries(FILE_TYPE_OPTIONS.map((o) => [o.id, o.label]));

export default async function QuoteRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/client/quote-requests");

  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId)) notFound();

  const r = await prisma.clientQuoteRequest.findFirst({
    where: { id: requestId, client_user_id: user.id },
    include: {
      work_category: { select: { name: true } },
      subcategory: { select: { name: true } },
      files: { orderBy: { created_at: "asc" } },
      deliveries: {
        orderBy: { rank_tier: "asc" },
        include: {
          company: {
            select: {
              id: true, name: true, slug: true, plan_type: true, phone: true, email: true, website: true,
              locations: { select: { suburb: true, state: true }, take: 1 },
            },
          },
        },
      },
    },
  });
  if (!r) notFound();

  // The client only ever sees businesses that actually expressed interest — never
  // the full list of businesses that were notified. Gold (featured) sorts to the
  // top; every card otherwise looks the same (no Silver/Free labels shown).
  const interested = r.deliveries
    .filter((d) => d.interested_at != null || d.response_status === "contacted" || d.response_status === "quoted")
    .map((d) => ({
      deliveryId: d.id,
      companyId: d.company.id,
      name: d.company.name,
      slug: d.company.slug,
      suburb: d.company.locations[0]?.suburb ?? null,
      state: d.company.locations[0]?.state ?? null,
      phone: d.company.phone,
      email: d.company.email,
      website: d.company.website,
      isFeatured: d.company.plan_type === "featured",
    }))
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));

  const field = (label: string, value: React.ReactNode) =>
    value ? (
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
        <dd className="mt-1 text-sm text-slate-800">{value}</dd>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      <Link href="/client/quote-requests" className="text-lg font-bold text-slate-900 hover:text-black">
        &larr; Back to my requests
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">{r.work_category?.name ?? "Building works"}</h1>
            <RequestStatusBadge status={r.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {r.suburb} {r.postcode} · created {new Date(r.created_at).toLocaleDateString("en-AU")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {r.status !== "closed" && (
            <Link
              href={`/client/quote-requests/${r.id}/edit`}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Edit request
            </Link>
          )}
          <RequestActions requestId={r.id} status={r.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Request details */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-base font-bold text-slate-900">Request details</h2>
          <dl className="grid gap-5 sm:grid-cols-2">
            {field("Work category", r.work_category?.name)}
            {field("Subcategory", r.subcategory?.name)}
            {field("Property type", PROPERTY_TYPE_LABELS[r.property_type])}
            {field("Urgency", URGENCY_LABELS[r.urgency])}
            {field("Building address", r.building_address)}
            {field("Suburb / postcode", `${r.suburb} ${r.postcode}`)}
            {field("Strata plan number", r.strata_plan_number)}
            {field("Budget", formatBudget(r.budget_range))}
            {field("Preferred inspection", r.preferred_inspection)}
            {field("Consultant scope available", r.consultant_scope_available ? "Yes" : "No")}
          </dl>
          <div className="mt-5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Description</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{r.description}</dd>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="mb-3 text-sm font-bold text-slate-900">Contact details shared with businesses</h3>
            <dl className="grid gap-5 sm:grid-cols-2">
              {field("Name", r.contact_name)}
              {field("Email", r.contact_email)}
              {field("Phone", r.contact_phone)}
              {field("Company", r.company_name)}
            </dl>
          </div>

          {r.files.length > 0 && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="mb-3 text-sm font-bold text-slate-900">Attached files</h3>
              <ul className="space-y-2">
                {r.files.map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-sm font-medium text-sky-800 hover:text-sky-600">
                      {f.filename ?? "File"}
                    </a>
                    <span className="text-xs font-semibold text-slate-400">{FILE_TYPE_LABELS[f.file_type] ?? f.file_type}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Matched businesses */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-base font-bold text-slate-900">Interested businesses</h2>
          <p className="mt-1 text-sm text-slate-500">
            {r.status === "draft"
              ? "This request is a draft. Submit it to send it to matching businesses in your area."
              : interested.length === 0
                ? "Your request has been submitted. We’ve notified matching businesses in your area — any that are interested will appear here and be in touch with you directly."
                : `${interested.length} ${interested.length === 1 ? "business is" : "businesses are"} interested and will contact you directly.`}
          </p>

          {interested.length > 0 && (
            <div className="mt-4">
              <InterestedBusinesses requestId={r.id} businesses={interested} />
            </div>
          )}

          <p className="mt-6 text-xs leading-6 text-slate-400">
            RBA is a directory and quote request platform. RBA does not recommend, endorse, supervise, verify
            workmanship, or act as a builder, consultant, superintendent, or project manager. Make your own enquiries
            before engaging any business.
          </p>
        </section>
      </div>
    </div>
  );
}
