import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { PROPERTY_TYPE_OPTIONS, URGENCY_OPTIONS } from "@/lib/quote-options";
import StrataIntakeReview from "@/components/admin/StrataIntakeReview";
import DeleteStrataIntakeButton from "@/components/admin/DeleteStrataIntakeButton";

export const dynamic = "force-dynamic";

export default async function AdminStrataIntakeDetail({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const { id } = await params;
  const intakeId = Number(id);
  if (!Number.isInteger(intakeId)) notFound();

  const intake = await prisma.strataIntake.findUnique({
    where: { id: intakeId },
    include: { files: { orderBy: { created_at: "asc" } } },
  });
  if (!intake) notFound();

  // Parent categories for the picker — dedupe by name (some parents are
  // duplicated) so the list is clean; the first id for a name is fine, the
  // convert step resolves by id.
  const parents = await prisma.category.findMany({
    where: { is_active: true, parent_id: null },
    select: { id: true, name: true },
    orderBy: [{ name: "asc" }],
  });
  const seen = new Set<string>();
  const categories = parents.filter((c) => {
    const key = c.name.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  // Ensure the currently-matched category is selectable even if it's a duplicate.
  if (intake.matched_category_id && !categories.some((c) => c.id === intake.matched_category_id)) {
    const cur = parents.find((c) => c.id === intake.matched_category_id);
    if (cur) categories.push(cur);
  }

  const units = Array.isArray(intake.extracted_units) ? (intake.extracted_units as { unit?: string; description?: string }[]) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/directory/admin/strata-intakes" className="text-lg font-bold text-slate-900 hover:text-black">
          &larr; All work orders
        </Link>
        <DeleteStrataIntakeButton intakeId={intake.id} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">{intake.subject || "(no subject)"}</h1>
        <p className="mt-1 text-sm text-slate-500">
          From <span className="font-medium text-slate-700">{intake.from_name || intake.from_email}</span>
          {intake.from_name && <span className="text-slate-400"> ({intake.from_email})</span>}
          {" · "}received {new Date(intake.received_at).toLocaleString("en-AU")}
        </p>
        {intake.status === "converted" && intake.quote_request_id && (
          <Link href={`/directory/admin/client-quote-requests/${intake.quote_request_id}`} className="mt-2 inline-block text-sm font-semibold text-sky-700 hover:underline">
            View the resulting quote request →
          </Link>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ── Review / edit form ── */}
        <StrataIntakeReview
          intake={{
            id: intake.id,
            status: intake.status,
            buildingAddress: intake.building_address ?? "",
            suburb: intake.suburb ?? "",
            postcode: intake.postcode ?? "",
            state: intake.state ?? "",
            strataPlanNumber: intake.strata_plan_number ?? "",
            orderNumber: intake.order_number ?? "",
            jobDescription: intake.job_description ?? "",
            contactName: intake.contact_name ?? "",
            contactPhone: intake.contact_phone ?? "",
            workCategoryId: intake.matched_category_id,
            reviewNotes: intake.review_notes ?? "",
            matchConfidence: intake.match_confidence,
            extractionError: intake.extraction_error,
          }}
          categories={categories}
          propertyTypes={PROPERTY_TYPE_OPTIONS.map((o) => ({ id: o.id, label: o.label }))}
          urgencies={URGENCY_OPTIONS.map((o) => ({ id: o.id, label: o.label }))}
        />

        {/* ── Original email + attachments ── */}
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-slate-900">Original email</h2>
            {intake.body_text ? (
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm text-slate-700">{intake.body_text}</pre>
            ) : intake.body_html ? (
              <div className="max-h-[420px] overflow-auto rounded-lg border border-slate-200 p-4 text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: intake.body_html }} />
            ) : (
              <p className="text-sm text-slate-400">(no email body)</p>
            )}
          </section>

          {intake.files.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-base font-bold text-slate-900">Attachments ({intake.files.length})</h2>
              <ul className="space-y-2">
                {intake.files.map((file) => (
                  <li key={file.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    {file.url ? (
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-sm font-medium text-sky-700 hover:underline">
                        {file.filename}
                      </a>
                    ) : (
                      <span className="min-w-0 flex-1 truncate text-sm text-slate-500" title="This attachment could not be stored">
                        {file.filename} <span className="text-rose-500">(not stored)</span>
                      </span>
                    )}
                    <span className="shrink-0 text-xs text-slate-400">{file.is_pdf ? "PDF" : file.content_type ?? "file"}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {units.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-base font-bold text-slate-900">Affected units (AI)</h2>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {units.map((u, idx) => (
                  <li key={idx}>• <span className="font-medium">{u.unit}</span>{u.description ? ` — ${u.description}` : ""}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
