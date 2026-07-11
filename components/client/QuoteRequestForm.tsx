"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { PROPERTY_TYPE_OPTIONS, URGENCY_OPTIONS, FILE_TYPE_OPTIONS, formatMoneyInput } from "@/lib/quote-options";
import { RBA_DISCLAIMER } from "@/lib/legal";
import CategoryTreeSelect, { type TreeCat } from "@/components/directory/CategoryTreeSelect";

type Category = TreeCat;
type Defaults = { contactName: string; contactEmail: string; contactPhone: string; companyName: string };
type PickedFile = { file: File; fileType: string };
type InitialValues = {
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  companyName?: string;
  buildingAddress?: string;
  suburb?: string;
  postcode?: string;
  strataPlanNumber?: string;
  propertyType?: string;
  workCategoryId?: string;
  description?: string;
  urgency?: string;
  preferredInspection?: string;
  consultantScopeAvailable?: boolean;
  budgetRange?: string;
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-sky-600 focus:outline-none";
const labelClass = "block space-y-1.5 text-sm font-semibold text-slate-800";

// Defined at module scope (NOT inside the component) so its identity is stable
// across re-renders — otherwise every keystroke would remount the section and
// the inputs would lose focus.
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-5 text-base font-bold text-slate-900">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export default function QuoteRequestForm({
  categories,
  defaults,
  mode = "create",
  requestId,
  initial,
}: {
  categories: Category[];
  defaults: Defaults;
  mode?: "create" | "edit";
  requestId?: number;
  initial?: InitialValues;
}) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const [form, setForm] = useState({
    contactName: initial?.contactName ?? defaults.contactName,
    contactEmail: initial?.contactEmail ?? defaults.contactEmail,
    contactPhone: initial?.contactPhone ?? defaults.contactPhone,
    companyName: initial?.companyName ?? defaults.companyName,
    buildingAddress: initial?.buildingAddress ?? "",
    suburb: initial?.suburb ?? "",
    postcode: initial?.postcode ?? "",
    strataPlanNumber: initial?.strataPlanNumber ?? "",
    propertyType: initial?.propertyType ?? "",
    workCategoryId: initial?.workCategoryId ?? "",
    description: initial?.description ?? "",
    urgency: initial?.urgency ?? "",
    preferredInspection: initial?.preferredInspection ?? "",
    consultantScopeAvailable: initial?.consultantScopeAvailable ?? false,
    budgetRange: initial?.budgetRange ?? "",
  });
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(isEdit);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<null | "draft" | "submit" | "save">(null);

  const set = (key: keyof typeof form, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  function addFiles(selected: FileList | null) {
    if (!selected) return;
    const next = Array.from(selected).map((file) => ({ file, fileType: "document" }));
    setFiles((prev) => [...prev, ...next]);
  }
  function setFileType(index: number, fileType: string) {
    setFiles((prev) => prev.map((p, i) => (i === index ? { ...p, fileType } : p)));
  }
  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadFiles(requestId: number) {
    for (const { file, fileType } of files) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("requestId", String(requestId));
      fd.append("fileType", fileType);
      const res = await fetch("/api/client/quote-request/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const r = await res.json().catch(() => ({}));
        throw new Error(r.error ?? `Upload failed for ${file.name}.`);
      }
    }
  }

  async function handle(action: "draft" | "submit" | "save") {
    setError(null);
    if (!form.workCategoryId) {
      setError("Please choose a work category.");
      return;
    }
    if (action === "submit" && !termsAccepted) {
      setError("You must accept the platform terms and disclaimer to submit.");
      return;
    }

    // Edit mode: PATCH the existing request (the API notifies any businesses it
    // was already sent to) and return to the request detail page.
    if (action === "save" && requestId) {
      setBusy("save");
      try {
        const res = await fetch(`/api/client/quote-request/${requestId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const r = await res.json();
        if (!res.ok) throw new Error(r.error ?? "Could not save your changes.");
        if (files.length > 0) await uploadFiles(requestId);
        router.push(`/client/quote-requests/${requestId}`);
      } catch (err) {
        setError((err as Error).message);
        setBusy(null);
      }
      return;
    }

    setBusy(action);
    try {
      const createRes = await fetch("/api/client/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const created = await createRes.json();
      if (!createRes.ok) throw new Error(created.error ?? "Could not save your request.");
      const requestId: number = created.id;

      if (files.length > 0) await uploadFiles(requestId);

      if (action === "submit") {
        const submitRes = await fetch(`/api/client/quote-request/${requestId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "submit", termsAccepted: true }),
        });
        const submitted = await submitRes.json();
        if (!submitRes.ok) throw new Error(submitted.error ?? "Could not submit your request.");
      }

      router.push(
        action === "submit"
          ? `/client/quote-requests/${requestId}/results`
          : `/client/quote-requests/${requestId}`,
      );
    } catch (err) {
      setError((err as Error).message);
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{isEdit ? "Edit quote request" : "New quote request"}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {isEdit
            ? "Update the details below. Any businesses you've already sent this request to will be notified of the changes."
            : "Describe the works required. We match your request to listed businesses by category and location and notify them — they then contact you directly."}
        </p>
      </div>

      <Section title="Your contact details">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            <span>Contact name</span>
            <input className={inputClass} value={form.contactName} onChange={(e) => set("contactName", e.target.value)} required />
          </label>
          <label className={labelClass}>
            <span>Email</span>
            <input type="email" className={inputClass} value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} required />
          </label>
          <label className={labelClass}>
            <span>Phone</span>
            <input type="tel" className={inputClass} value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
          </label>
          <label className={labelClass}>
            <span>Company / strata management company <span className="font-normal text-slate-400">(optional)</span></span>
            <input className={inputClass} value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
          </label>
        </div>
      </Section>

      <Section title="Property & location">
        <label className={labelClass}>
          <span>Building address</span>
          <input className={inputClass} value={form.buildingAddress} onChange={(e) => set("buildingAddress", e.target.value)} required />
        </label>
        <div className="grid gap-5 sm:grid-cols-3">
          <label className={`${labelClass} sm:col-span-2`}>
            <span>Suburb</span>
            <input className={inputClass} value={form.suburb} onChange={(e) => set("suburb", e.target.value)} required />
          </label>
          <label className={labelClass}>
            <span>Postcode</span>
            <input className={inputClass} value={form.postcode} onChange={(e) => set("postcode", e.target.value)} inputMode="numeric" maxLength={4} required />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            <span>Strata plan number <span className="font-normal text-slate-400">(optional)</span></span>
            <input className={inputClass} value={form.strataPlanNumber} onChange={(e) => set("strataPlanNumber", e.target.value)} placeholder="e.g. SP12345" />
          </label>
          <label className={labelClass}>
            <span>Property type</span>
            <select className={inputClass} value={form.propertyType} onChange={(e) => set("propertyType", e.target.value)} required>
              <option value="">Select…</option>
              {PROPERTY_TYPE_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>
      </Section>

      <Section title="Works required">
        {/* Grouped, searchable work-category browse — same as the directory */}
        <div className={labelClass}>
          <span>Work category</span>
          <CategoryTreeSelect
            categories={categories}
            selectedId={form.workCategoryId ? Number(form.workCategoryId) : null}
            onSelect={(cat) => set("workCategoryId", cat ? String(cat.id) : "")}
            requireLeaf
            placeholder="Browse or search a work category…"
            buttonClassName="flex w-full items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-normal text-slate-700 focus:border-sky-600 focus:outline-none"
            panelClassName="w-full"
          />
          {!form.workCategoryId && <span className="block text-xs font-medium text-slate-400">Browse the groups or type to search, then pick a specific category.</span>}
        </div>

        <label className={labelClass}>
          <span>Description of issue / required works</span>
          <textarea
            className={`${inputClass} min-h-32`}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={6}
            required
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            <span>Urgency</span>
            <select className={inputClass} value={form.urgency} onChange={(e) => set("urgency", e.target.value)} required>
              <option value="">Select…</option>
              {URGENCY_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            <span>Budget <span className="font-normal text-slate-400">(optional)</span></span>
            <input
              className={inputClass}
              value={form.budgetRange}
              onChange={(e) => set("budgetRange", formatMoneyInput(e.target.value))}
              inputMode="numeric"
              placeholder="e.g. $50,000"
            />
          </label>
        </div>
        <label className={labelClass}>
          <span>Preferred inspection dates / times <span className="font-normal text-slate-400">(optional)</span></span>
          <input className={inputClass} value={form.preferredInspection} onChange={(e) => set("preferredInspection", e.target.value)} placeholder="e.g. Weekday mornings, w/c 6 July" />
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.consultantScopeAvailable}
            onChange={(e) => set("consultantScopeAvailable", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-sky-950"
          />
          A consultant scope of works is available for this job
        </label>
      </Section>

      <Section title="Documents, photos, reports & drawings">
        <p className="text-sm text-slate-500">Attach anything that helps businesses quote accurately (optional). Up to 25&nbsp;MB per file.</p>
        <label className="inline-block cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-400">
          Choose files
          <input type="file" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
        </label>
        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                <span className="min-w-0 flex-1 truncate text-sm text-slate-700">{f.file.name}</span>
                <select
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                  value={f.fileType}
                  onChange={(e) => setFileType(i, e.target.value)}
                >
                  {FILE_TYPE_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeFile(i)} className="text-xs font-semibold text-rose-600 hover:text-rose-700">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {!isEdit && (
        <Section title="Terms & disclaimer">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-sky-950"
            />
            <span>I accept the platform terms and disclaimer. {RBA_DISCLAIMER}</span>
          </label>
        </Section>
      )}

      {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>}

      <div className="flex flex-wrap gap-3">
        {isEdit ? (
          <button
            type="button"
            onClick={() => handle("save")}
            disabled={busy !== null}
            className="rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy === "save" ? "Saving…" : "Save changes"}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => handle("submit")}
              disabled={busy !== null}
              className="rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy === "submit" ? "Finding businesses…" : "Explore available businesses"}
            </button>
            <button
              type="button"
              onClick={() => handle("draft")}
              disabled={busy !== null}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy === "draft" ? "Saving…" : "Save as draft"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
