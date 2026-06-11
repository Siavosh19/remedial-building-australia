"use client";

import { useState, useRef } from "react";
import CategorySearch from "@/components/directory/CategorySearch";
import SecondaryCategories from "@/components/directory/SecondaryCategories";

type Category = { id: number; name: string };

type CompanyMedia = {
  id: number;
  media_type: string;
  url: string;
  filename: string | null;
};

type Props = {
  company: {
    name: string;
    phone: string | null;
    website: string | null;
    email: string;
    description: string | null;
    main_category_id: number | null;
    plan_type: string;
    licence_number: string | null;
    licence_type: string | null;
    insurance_details: string | null;
    year_established: number | null;
    logo_url: string | null;
    locations: { suburb: string | null; postcode: string; state: string }[];
    company_categories: { category_id: number; is_primary: boolean }[];
    media: CompanyMedia[];
  };
  categories: Category[];
};

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

export default function CompanyEditForm({ company, categories }: Props) {
  const isClaimed = company.plan_type !== "basic";
  const photoLimit = company.plan_type === "featured" ? 10 : 5;
  const location = company.locations[0];
  const secondaryIds = company.company_categories
    .filter((cc) => !cc.is_primary)
    .map((cc) => String(cc.category_id));

  const [form, setForm] = useState({
    companyName: company.name,
    phone: company.phone ?? "",
    website: company.website ?? "",
    businessEmail: company.email,
    description: company.description ?? "",
    mainCategoryId: String(company.main_category_id ?? ""),
    suburb: location?.suburb ?? "",
    postcode: location?.postcode ?? "",
    state: location?.state ?? "NSW",
    licenceNumber: company.licence_number ?? "",
    licenceType: company.licence_type ?? "",
    insuranceDetails: company.insurance_details ?? "",
    yearEstablished: company.year_established ? String(company.year_established) : "",
    secondaryCategoryIds: secondaryIds,
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Media state
  const [media, setMedia] = useState<CompanyMedia[]>(company.media);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const photos = media.filter((m) => m.media_type === "photo");
  const logo = media.find((m) => m.media_type === "logo");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const response = await fetch("/api/directory/company", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        mainCategoryId: Number(form.mainCategoryId),
        yearEstablished: form.yearEstablished ? Number(form.yearEstablished) : undefined,
        secondaryCategoryIds: form.secondaryCategoryIds.map(Number),
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to update company details." });
      return;
    }
    setStatus({ type: "success", message: "Profile updated." });
  }

  async function uploadFile(file: File, mediaType: "logo" | "photo") {
    setUploading(true);
    setUploadError(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("mediaType", mediaType);
    const res = await fetch("/api/directory/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setUploadError(data.error ?? "Upload failed.");
      return;
    }
    setMedia((prev) => [...prev.filter((m) => mediaType === "photo" || m.media_type !== "logo"), data.media]);
  }

  async function deleteMedia(id: number) {
    await fetch(`/api/directory/company/media/${id}`, { method: "DELETE" });
    setMedia((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="space-y-10">
      {/* Basic details */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-800">
            <span>Company name</span>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              required
            />
          </label>

          <div className="block text-sm font-semibold text-slate-800">
            <span>Primary category</span>
            <CategorySearch
              categories={categories}
              value={form.mainCategoryId}
              onChange={(id) => setForm({ ...form, mainCategoryId: id })}
            />
          </div>
        </div>

        {isClaimed && (
          <div className="block text-sm font-semibold text-slate-800">
            <span>Secondary categories</span>
            <SecondaryCategories
              categories={categories}
              selectedIds={form.secondaryCategoryIds}
              excludeId={form.mainCategoryId}
              onChange={(ids) => setForm((f) => ({ ...f, secondaryCategoryIds: ids }))}
            />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-800">
            <span>Phone</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              required
            />
          </label>

          <label className="block text-sm font-semibold text-slate-800">
            <span>Business email</span>
            <input
              type="email"
              value={form.businessEmail}
              onChange={(e) => setForm({ ...form, businessEmail: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              required
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <label className="block text-sm font-semibold text-slate-800">
            <span>Suburb</span>
            <input
              type="text"
              value={form.suburb}
              onChange={(e) => setForm({ ...form, suburb: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            <span>Postcode</span>
            <input
              type="text"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            <span>State</span>
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            >
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Website</span>
          <input
            type="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="https://"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Business description</span>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={5}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>

        {isClaimed && (
          <>
            <div className="border-t border-slate-100 pt-6">
              <p className="text-base font-semibold text-slate-800 mb-4">Licence & Insurance Details</p>
              <p className="text-xs text-slate-500 mb-4">
                These details are provided by you and displayed on your public profile. They are not independently checked or endorsed by this platform.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-800">
                  <span>Licence number</span>
                  <input
                    type="text"
                    value={form.licenceNumber}
                    onChange={(e) => setForm({ ...form, licenceNumber: e.target.value })}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                    placeholder="e.g. NSW BL 12345"
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-800">
                  <span>Licence type</span>
                  <input
                    type="text"
                    value={form.licenceType}
                    onChange={(e) => setForm({ ...form, licenceType: e.target.value })}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                    placeholder="e.g. Builder Unrestricted"
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm font-semibold text-slate-800">
                <span>Insurance details</span>
                <textarea
                  value={form.insuranceDetails}
                  onChange={(e) => setForm({ ...form, insuranceDetails: e.target.value })}
                  rows={2}
                  placeholder="e.g. Public liability $20M, Professional indemnity $5M"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-slate-800">
              <span>Year established</span>
              <input
                type="number"
                value={form.yearEstablished}
                onChange={(e) => setForm({ ...form, yearEstablished: e.target.value })}
                min={1900}
                max={new Date().getFullYear()}
                placeholder="e.g. 2005"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              />
            </label>
          </>
        )}

        {status ? (
          <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
            {status.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-2xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
      </form>

      {/* Media uploads — Claimed/Featured only */}
      {isClaimed && (
        <div className="border-t border-slate-100 pt-8 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Logo</h2>
            <p className="text-xs text-slate-500 mt-1">Upload your business logo. Replaces the initials shown on your profile.</p>
            <div className="mt-4 flex items-start gap-4">
              {logo ? (
                <div className="relative">
                  <img src={logo.url} alt="Logo" className="h-16 w-16 rounded-xl object-cover border border-slate-200" />
                  <button
                    type="button"
                    onClick={() => deleteMedia(logo.id)}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs hover:bg-red-500"
                  >×</button>
                </div>
              ) : (
                <div className="h-16 w-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-300 text-sm">
                  Logo
                </div>
              )}
              <div>
                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, "logo"); }} />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => logoInputRef.current?.click()}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  {uploading ? "Uploading…" : "Upload logo"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-800">Project photos</h2>
            <p className="text-xs text-slate-500 mt-1">Up to {photoLimit} photos. {photos.length}/{photoLimit} used.</p>
            {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
            <div className="mt-4 flex flex-wrap gap-3">
              {photos.map((p) => (
                <div key={p.id} className="relative">
                  <img src={p.url} alt={p.filename ?? "Photo"} className="h-20 w-20 rounded-xl object-cover border border-slate-200" />
                  <button
                    type="button"
                    onClick={() => deleteMedia(p.id)}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs hover:bg-red-500"
                  >×</button>
                </div>
              ))}
              {photos.length < photoLimit && (
                <>
                  <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, "photo"); }} />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => photoInputRef.current?.click()}
                    className="h-20 w-20 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-2xl hover:border-sky-400 hover:text-sky-500 disabled:opacity-60"
                  >
                    +
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
