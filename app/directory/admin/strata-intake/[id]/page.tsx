import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { STRATA_INTAKE_BUCKET } from "@/lib/strata-connect";
import StrataIntakeActions from "@/components/directory/StrataIntakeActions";

export const dynamic = "force-dynamic";

function fmtBytes(n: number | null): string {
  if (!n) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminStrataIntakeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const { id } = await params;
  const intakeId = Number(id);
  if (!Number.isInteger(intakeId)) notFound();

  const intake = await prisma.strataIntake.findUnique({
    where: { id: intakeId },
    include: { files: { orderBy: { id: "asc" } } },
  });
  if (!intake) notFound();

  // Parent categories for the approve form's picker.
  const categories = await prisma.category.findMany({
    where: { is_active: true, parent_id: null },
    select: { id: true, name: true },
    orderBy: [{ display_order: "asc" }, { name: "asc" }],
  });

  const locked = intake.status === "converted" || intake.status === "rejected";
  const lockedReason =
    intake.status === "converted"
      ? `Converted to quote request #${intake.quote_request_id} and broadcast to businesses.`
      : intake.status === "rejected"
        ? "This work order was rejected — nothing was sent."
        : null;

  // Sign each stored attachment so the admin can open it (private bucket).
  const canSign = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const signed = await Promise.all(
    intake.files.map(async (f) => {
      if (!f.url || !canSign) return { ...f, link: null as string | null };
      const { data } = await supabaseAdmin.storage.from(STRATA_INTAKE_BUCKET).createSignedUrl(f.url, 3600);
      return { ...f, link: data?.signedUrl ?? null };
    }),
  );

  const extracted: Array<[string, string | null | undefined]> = [
    ["Property address", intake.building_address],
    ["Suburb", intake.suburb],
    ["Postcode", intake.postcode],
    ["State", intake.state],
    ["Strata plan", intake.strata_plan_number],
    ["Order no.", intake.order_number],
    ["Matched category", intake.matched_category_name],
    ["Confidence", intake.match_confidence],
  ];
  const hasExtraction = extracted.some(([, v]) => v);

  return (
    <div className="max-w-4xl">
      <Link href="/directory/admin/strata-intake" className="text-sm text-sky-700 hover:underline">
        ← Back to work orders
      </Link>

      <div className="mt-3 mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{intake.subject ?? "(no subject)"}</h1>
          <p className="mt-1 text-sm text-slate-500">
            From <span className="font-medium text-slate-700">{intake.from_name ?? intake.from_email}</span>
            {intake.from_name && <span className="text-slate-400"> · {intake.from_email}</span>} ·{" "}
            {new Date(intake.received_at).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{intake.status}</span>
      </div>

      {/* ── Extracted fields (populated in Stage 2) ─────────────────────────── */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Extracted details</h2>
        {hasExtraction ? (
          <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {extracted.map(([label, value]) =>
              value ? (
                <div key={label} className="flex justify-between gap-4 border-b border-slate-50 py-1">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="text-right font-medium text-slate-800">{value}</dd>
                </div>
              ) : null,
            )}
          </dl>
        ) : (
          <p className="text-sm text-slate-400">
            AI extraction not run yet — the address, category and unit breakdown will appear here (Stage 2).
          </p>
        )}
        {intake.job_description && (
          <div className="mt-4">
            <dt className="mb-1 text-slate-500">Job description</dt>
            <dd className="whitespace-pre-wrap text-sm text-slate-800">{intake.job_description}</dd>
          </div>
        )}
      </section>

      {/* ── Attachments (all of them) ───────────────────────────────────────── */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
          Attachments ({signed.length})
        </h2>
        {signed.length === 0 ? (
          <p className="text-sm text-slate-400">No attachments — the work order may be in the email body below.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {signed.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-4 py-2.5">
                <div className="min-w-0">
                  <div className="truncate font-medium text-slate-800">{f.filename}</div>
                  <div className="text-xs text-slate-400">
                    {f.content_type ?? "file"}
                    {f.size_bytes ? ` · ${fmtBytes(f.size_bytes)}` : ""}
                  </div>
                </div>
                {f.link ? (
                  <a href={f.link} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Open
                  </a>
                ) : (
                  <span className="shrink-0 text-xs text-slate-400">unavailable</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── Raw email body ──────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Email body</h2>
        {intake.body_text ? (
          <pre className="whitespace-pre-wrap break-words font-sans text-sm text-slate-700">{intake.body_text}</pre>
        ) : intake.body_html ? (
          <div className="prose prose-sm max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: intake.body_html }} />
        ) : (
          <p className="text-sm text-slate-400">No body content.</p>
        )}
      </section>

      {/* ── Stage 3: review, correct, approve → broadcast (or reject) ────────── */}
      <div className="mt-6">
        <StrataIntakeActions
          intakeId={intake.id}
          categories={categories}
          locked={locked}
          lockedReason={lockedReason}
          initial={{
            buildingAddress: intake.building_address ?? "",
            suburb: intake.suburb ?? "",
            postcode: intake.postcode ?? "",
            strataPlanNumber: intake.strata_plan_number ?? "",
            description: intake.job_description ?? intake.subject ?? "",
            contactName: intake.from_name ?? "",
            contactEmail: intake.from_email ?? "",
            contactPhone: "",
            propertyType: "residential_strata",
            urgency: "within_month",
            workCategoryId: intake.matched_category_id ? String(intake.matched_category_id) : "",
          }}
        />
      </div>
    </div>
  );
}
