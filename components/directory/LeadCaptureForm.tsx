"use client";

import { useState, useRef, useEffect } from "react";

type Category = { id: number; name: string };

interface Props {
  categories: Category[];
  companyName?: string;
  companySlug?: string;
  triggerLabel?: string;
  triggerClassName?: string;
}

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const URGENCY_OPTIONS = [
  { value: "emergency", label: "Emergency" },
  { value: "within_week", label: "Within a week" },
  { value: "within_month", label: "Within a month" },
  { value: "planning", label: "Planning ahead" },
];
const BUDGET_OPTIONS = [
  { value: "under_5k", label: "Under $5k" },
  { value: "5k_20k", label: "$5k – $20k" },
  { value: "20k_100k", label: "$20k – $100k" },
  { value: "100k_plus", label: "$100k+" },
];
const MIN_DESC = 50;

const FIELD_BASE =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200";

export default function LeadCaptureForm({
  categories,
  companyName,
  triggerLabel = "Request a Quote",
  triggerClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    suburb: "",
    postcode: "",
    state: "",
    categoryId: "",
    description: "",
    urgency: "",
    budgetRange: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.suburb.trim()) e.suburb = "Suburb is required.";
    if (!form.postcode.trim()) e.postcode = "Postcode is required.";
    if (!STATES.includes(form.state)) e.state = "Select a state.";
    if (!form.categoryId) e.categoryId = "Select a category.";
    if (form.description.trim().length < MIN_DESC)
      e.description = `Minimum ${MIN_DESC} characters (${form.description.trim().length} so far).`;
    if (!form.urgency) e.urgency = "Select urgency.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/directory/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          suburb: form.suburb.trim(),
          postcode: form.postcode.trim(),
          state: form.state,
          categoryId: Number(form.categoryId),
          description: form.description.trim(),
          urgency: form.urgency,
          budgetRange: form.budgetRange || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setOpen(false);
    setSuccess(false);
    setServerError("");
    setErrors({});
    setForm({ fullName: "", email: "", phone: "", suburb: "", postcode: "", state: "", categoryId: "", description: "", urgency: "", budgetRange: "" });
  }

  const defaultTriggerCls =
    "inline-flex items-center gap-2 rounded-full bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName ?? defaultTriggerCls}
      >
        {triggerLabel}
      </button>

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        className="m-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl backdrop:bg-slate-900/60"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Directory</p>
            <h2 className="mt-0.5 text-lg font-extrabold text-sky-950">
              {companyName ? `Request a Quote from ${companyName}` : "Submit an Enquiry"}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-8 py-6">
          {success ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
                ✓
              </div>
              <p className="text-lg font-semibold text-slate-900">Enquiry received</p>
              <p className="mt-2 text-sm text-slate-600">
                Thank you — a specialist will contact you directly.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 rounded-full bg-sky-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="Jane Smith"
                  className={FIELD_BASE}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="jane@example.com"
                  className={FIELD_BASE}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="04xx xxx xxx"
                  className={FIELD_BASE}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>

              {/* Suburb + postcode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Suburb <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.suburb}
                    onChange={(e) => set("suburb", e.target.value)}
                    placeholder="Surry Hills"
                    className={FIELD_BASE}
                  />
                  {errors.suburb && <p className="mt-1 text-xs text-red-600">{errors.suburb}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Postcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.postcode}
                    onChange={(e) => set("postcode", e.target.value)}
                    placeholder="2010"
                    className={FIELD_BASE}
                  />
                  {errors.postcode && <p className="mt-1 text-xs text-red-600">{errors.postcode}</p>}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                  className={FIELD_BASE}
                >
                  <option value="">Select state…</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Category of work needed <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.categoryId}
                  onChange={(e) => set("categoryId", e.target.value)}
                  className={FIELD_BASE}
                >
                  <option value="">Select category…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="mt-1 text-xs text-red-600">{errors.categoryId}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Description of work <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Describe the work you need done, the building type, and any relevant details…"
                  className={`${FIELD_BASE} resize-none`}
                />
                <p className={`mt-1 text-xs ${form.description.trim().length < MIN_DESC ? "text-slate-400" : "text-emerald-600"}`}>
                  {form.description.trim().length} / {MIN_DESC} characters minimum
                </p>
                {errors.description && <p className="mt-0.5 text-xs text-red-600">{errors.description}</p>}
              </div>

              {/* Urgency */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Urgency <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.urgency}
                  onChange={(e) => set("urgency", e.target.value)}
                  className={FIELD_BASE}
                >
                  <option value="">Select urgency…</option>
                  {URGENCY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.urgency && <p className="mt-1 text-xs text-red-600">{errors.urgency}</p>}
              </div>

              {/* Budget (optional) */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Budget range <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <select
                  value={form.budgetRange}
                  onChange={(e) => set("budgetRange", e.target.value)}
                  className={FIELD_BASE}
                >
                  <option value="">Prefer not to say</option>
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {serverError && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-sky-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Submit enquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
