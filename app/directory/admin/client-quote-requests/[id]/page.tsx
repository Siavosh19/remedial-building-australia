import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { planLabel } from "@/lib/plans";
import {
  PROPERTY_TYPE_LABELS,
  URGENCY_LABELS,
  REQUEST_STATUS_LABELS,
  RESPONSE_STATUS_LABELS,
  FILE_TYPE_OPTIONS,
} from "@/lib/quote-options";
import DeleteRequestButton from "@/components/admin/DeleteRequestButton";

export const dynamic = "force-dynamic";

const FILE_TYPE_LABELS = Object.fromEntries(FILE_TYPE_OPTIONS.map((o) => [o.id, o.label]));
const EMAIL_CLS: Record<string, string> = {
  sent: "bg-emerald-100 text-emerald-800",
  pending: "bg-slate-100 text-slate-600",
  failed: "bg-rose-100 text-rose-700",
};

export default async function AdminClientQuoteRequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId)) notFound();

  const r = await prisma.clientQuoteRequest.findUnique({
    where: { id: requestId },
    include: {
      work_category: { select: { name: true } },
      subcategory: { select: { name: true } },
      client: { select: { email: true, full_name: true, phone: true } },
      files: { orderBy: { created_at: "asc" } },
      deliveries: {
        orderBy: { rank_tier: "asc" },
        include: { company: { select: { name: true, slug: true, plan_type: true } } },
      },
    },
  });
  if (!r) notFound();

  const field = (label: string, value: React.ReactNode) =>
    value ? (
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
        <dd className="mt-1 text-sm text-slate-800">{value}</dd>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/directory/admin/client-quote-requests" className="text-sm text-slate-500 hover:text-slate-800">
          &larr; All client quote requests
        </Link>
        <DeleteRequestButton requestId={r.id} />
      </div>

      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">{r.work_category?.name ?? "Building works"}</h1>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
            {REQUEST_STATUS_LABELS[r.status] ?? r.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          {r.suburb} {r.postcode} · created {new Date(r.created_at).toLocaleString("en-AU")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-slate-900">Request</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {field("Property type", PROPERTY_TYPE_LABELS[r.property_type])}
            {field("Urgency", URGENCY_LABELS[r.urgency])}
            {field("Building address", r.building_address)}
            {field("Strata plan", r.strata_plan_number)}
            {field("Budget", r.budget_range)}
            {field("Preferred inspection", r.preferred_inspection)}
            {field("Consultant scope", r.consultant_scope_available ? "Yes" : "No")}
            {field("Subcategory", r.subcategory?.name)}
          </dl>
          <div className="mt-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Description</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{r.description}</dd>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-slate-900">Client</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {field("Contact name", r.contact_name)}
            {field("Contact email", r.contact_email)}
            {field("Contact phone", r.contact_phone)}
            {field("Company", r.company_name)}
            {field("Account email", r.client?.email)}
            {field("Terms accepted", r.terms_accepted ? `Yes (${r.terms_version ?? "—"})` : "No")}
          </dl>

          {r.files.length > 0 && (
            <div className="mt-5 border-t border-slate-100 pt-4">
              <h3 className="mb-2 text-sm font-bold text-slate-900">Files</h3>
              <ul className="space-y-2">
                {r.files.map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-sm font-medium text-sky-700 hover:underline">
                      {f.filename ?? "File"}
                    </a>
                    <span className="text-xs text-slate-400">
                      {f.uploaded_by === "business" ? "Business quote" : FILE_TYPE_LABELS[f.file_type] ?? f.file_type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">Businesses notified ({r.deliveries.length})</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="px-6 py-3 font-semibold text-slate-700">Business</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Plan</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Email status</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Response</th>
            </tr>
          </thead>
          <tbody>
            {r.deliveries.map((d) => (
              <tr key={d.id} className="border-b border-slate-100">
                <td className="px-6 py-3">
                  <a href={`/directory/company/${d.company.slug}`} target="_blank" className="font-medium text-slate-900 hover:text-sky-700">
                    {d.company.name}
                  </a>
                </td>
                <td className="px-6 py-3 text-slate-600">{planLabel(d.company.plan_type)}</td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${EMAIL_CLS[d.email_status] ?? "bg-slate-100 text-slate-600"}`}>
                    {d.email_status}
                  </span>
                  {d.email_error && <span className="ml-2 text-xs text-rose-500">{d.email_error}</span>}
                </td>
                <td className="px-6 py-3 text-slate-600">{RESPONSE_STATUS_LABELS[d.response_status] ?? d.response_status}</td>
              </tr>
            ))}
            {!r.deliveries.length && (
              <tr><td colSpan={4} className="px-6 py-6 text-center text-slate-400">No businesses matched this request.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
