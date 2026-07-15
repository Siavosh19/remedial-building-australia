import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { PROPERTY_TYPE_LABELS, URGENCY_LABELS, FILE_TYPE_OPTIONS, formatBudget } from "@/lib/quote-options";
import { ResponseStatusBadge } from "@/components/client/badges";
import LeadFlowActions from "@/components/directory/LeadFlowActions";

export const dynamic = "force-dynamic";

const FILE_TYPE_LABELS = Object.fromEntries(FILE_TYPE_OPTIONS.map((o) => [o.id, o.label]));

export default async function LeadRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");

  const { id } = await params;
  const deliveryId = Number(id);
  if (!Number.isInteger(deliveryId)) notFound();

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true },
  });
  if (!company) redirect("/directory/dashboard");

  const delivery = await prisma.quoteRequestDelivery.findFirst({
    where: { id: deliveryId, company_id: company.id },
    include: {
      request: {
        include: {
          work_category: { select: { name: true } },
          subcategory: { select: { name: true } },
          files: { orderBy: { created_at: "asc" } },
        },
      },
    },
  });
  if (!delivery) notFound();

  // Mark as opened on first view.
  if (!delivery.opened_at) {
    await prisma.quoteRequestDelivery.update({ where: { id: delivery.id }, data: { opened_at: new Date() } });
  }

  const r = delivery.request;
  const clientRequested = Boolean(delivery.client_requested_at);
  const field = (label: string, value: React.ReactNode) =>
    value ? (
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
        <dd className="mt-1 text-sm text-slate-800">{value}</dd>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      <Link href="/directory/dashboard/lead-requests" className="text-lg font-bold text-slate-900 hover:text-black">
        &larr; Back to lead requests
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{r.work_category?.name ?? "Building works"}</h1>
          <p className="mt-1 text-sm text-slate-500">{r.suburb} {r.postcode} · received {new Date(delivery.created_at).toLocaleDateString("en-AU")}</p>
        </div>
        <ResponseStatusBadge status={delivery.response_status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
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

          {r.files.length > 0 && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="mb-3 text-sm font-bold text-slate-900">Attached files</h3>
              <ul className="space-y-2">
                {r.files.map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-sm font-medium text-sky-800 hover:text-sky-600">
                      {f.filename ?? "File"}
                    </a>
                    <span className="text-xs font-semibold text-slate-400">
                      {f.uploaded_by === "business" ? "Your quote" : FILE_TYPE_LABELS[f.file_type] ?? f.file_type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <div className="space-y-6">
          {/* Client contact is exchanged only after the client proceeds with this
              business. Until then it stays hidden. */}
          {clientRequested ? (
            <section className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-base font-bold text-slate-900">Client contact</h2>
              <p className="mt-1 text-xs text-emerald-700">The client has proceeded — contact them directly to quote.</p>
              <dl className="mt-4 space-y-4">
                {field("Name", r.contact_name)}
                {field("Email", <a href={`mailto:${r.contact_email}`} className="text-sky-800 hover:text-sky-600">{r.contact_email}</a>)}
                {field("Phone", r.contact_phone ? <a href={`tel:${r.contact_phone}`} className="text-sky-800 hover:text-sky-600">{r.contact_phone}</a> : null)}
                {field("Company", r.company_name)}
              </dl>
            </section>
          ) : (
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
              <h2 className="text-base font-bold text-slate-900">Client contact</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Contact details are shared once the client proceeds with your business. Express interest below to be
                put forward to the client.
              </p>
            </section>
          )}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <LeadFlowActions
              deliveryId={delivery.id}
              responseStatus={delivery.response_status}
              interested={Boolean(delivery.interested_at)}
              clientRequested={clientRequested}
            />
          </section>
        </div>
      </div>

      <p className="text-xs leading-6 text-slate-400">
        RBA is a directory and quote request platform. RBA does not recommend, endorse, supervise, verify workmanship,
        or act as a builder, consultant, superintendent, or project manager.
      </p>
    </div>
  );
}
