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
    facebook_url: string | null;
    instagram_url: string | null;
    linkedin_url: string | null;
    description: string | null;
    tagline: string | null;
    services_offered: string | null;
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
  // Every tier builds a basic profile (categories, contact details, description).
  // Licence/insurance, logo and project photos are Silver+ (paid) features.
  const isClaimed = true;
  const isPaid = company.plan_type === "claimed" || company.plan_type === "featured";
  const photoLimit = isPaid ? 15 : 0;
  const location = company.locations[0];
  const secondaryIds = company.company_categories
    .filter((cc) => !cc.is_primary)
    .map((cc) => String(cc.category_id));

  const [form, setForm] = useState({
    companyName: company.name,
    phone: company.phone ?? "",
    website: company.website ?? "",
    businessEmail: company.email,
    facebook: company.facebook_url ?? "",
    instagram: company.instagram_url ?? "",
    linkedin: company.linkedin_url ?? "",
    description: company.description ?? "",
    tagline: company.tagline ?? "",
    servicesOffered: company.services_offered ?? "",
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
  const [photoDragOver, setPhotoDragOver] = useState(false);
  const [logoDragOver, setLogoDragOver] = useState(false);
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

  // Upload one or more dropped/selected photo files, respecting the plan limit.
  async function uploadPhotos(files: File[]) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) { setUploadError("Please drop image files only."); return; }
    const remaining = photoLimit - photos.length;
    if (remaining <= 0) { setUploadError(`You've reached your limit of ${photoLimit} photos.`); return; }
    if (images.length > remaining) setUploadError(`Only ${remaining} more photo${remaining === 1 ? "" : "s"} can be added — extras were skipped.`);
    for (const f of images.slice(0, remaining)) {
      await uploadFile(f, "photo");
    }
  }

  return (
    <div className="space-y-10">
      {/* Basic details */}
      <form id="company-edit-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-800">
            <span>Company name</span>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
              maxLength={50}
              required
            />
            <span className="mt-1 block text-xs font-normal text-slate-400">
              {form.companyName.length}/50 · keep it short so it fits one line on your listing
            </span>
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

        {/* Social links — shown as the Follow icons on your public profile */}
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-semibold text-slate-800">
            <span>Facebook</span>
            <input
              type="url"
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              placeholder="https://facebook.com/…"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            <span>Instagram</span>
            <input
              type="url"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              placeholder="https://instagram.com/…"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            <span>LinkedIn</span>
            <input
              type="url"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              placeholder="https://linkedin.com/…"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Tagline <span className="font-normal text-slate-400">(optional)</span></span>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            maxLength={45}
            placeholder="e.g. Registered Class 2 Builder"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
          <span className="mt-1 block text-xs font-normal text-slate-400">
            Appears next to your business name on your listing card and profile. Leave blank to hide it.
          </span>
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

        <label className="block text-sm font-semibold text-slate-800">
          <span>Services offered <span className="font-normal text-slate-400">(optional)</span></span>
          <textarea
            value={form.servicesOffered}
            onChange={(e) => setForm({ ...form, servicesOffered: e.target.value })}
            rows={3}
            maxLength={220}
            placeholder="e.g. Waterproofing, concrete repair, façade rectification, remedial coatings"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
          <span className="mt-1 block text-xs font-normal text-slate-400">
            A short list of what you offer — shown in the &ldquo;Services offered&rdquo; section of your public profile.
          </span>
        </label>

        {isPaid && (
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

      </form>

      {/* Media uploads — Silver/Gold (paid) only */}
      {!isPaid && (
        <div className="border-t border-slate-100 pt-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-base font-semibold text-amber-900">Logo &amp; project photos</h2>
            <p className="mt-1 text-sm text-amber-800">
              Add your business logo and up to 15 project photos with a Silver or Gold plan. Upgrade to showcase your work.
            </p>
            <a
              href="/directory/dashboard/subscription"
              className="mt-3 inline-block rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500"
            >
              View plans →
            </a>
          </div>
        </div>
      )}
      {isPaid && (
        <div className="border-t border-slate-100 pt-8 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Logo</h2>
            <p className="text-xs text-slate-500 mt-1">Upload or drag &amp; drop your business logo. Replaces the initials shown on your profile.</p>
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
                <div
                  onDragOver={(e) => { e.preventDefault(); setLogoDragOver(true); }}
                  onDragLeave={() => setLogoDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setLogoDragOver(false); const f = Array.from(e.dataTransfer.files).find((x) => x.type.startsWith("image/")); if (f) uploadFile(f, "logo"); else setUploadError("Please drop an image file."); }}
                  className={`h-16 w-16 rounded-xl border-2 border-dashed flex items-center justify-center text-center text-[10px] leading-tight transition ${logoDragOver ? "border-sky-400 bg-sky-50 text-sky-500" : "border-slate-300 text-slate-300"}`}
                >
                  Drop logo
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
            <p className="text-xs text-slate-500 mt-1">Up to {photoLimit} photos. {photos.length}/{photoLimit} used. Drag &amp; drop images below, or click + to browse.</p>
            {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
            <div
              onDragOver={(e) => { e.preventDefault(); if (photos.length < photoLimit) setPhotoDragOver(true); }}
              onDragLeave={() => setPhotoDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setPhotoDragOver(false); uploadPhotos(Array.from(e.dataTransfer.files)); }}
              className={`mt-4 rounded-2xl border-2 border-dashed p-4 transition ${photoDragOver ? "border-sky-400 bg-sky-50" : "border-slate-200"}`}
            >
              <div className="flex flex-wrap gap-3">
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
                    <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) uploadPhotos(Array.from(e.target.files)); e.target.value = ""; }} />
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
              {uploading && <p className="mt-3 text-xs font-medium text-sky-600">Uploading…</p>}
              {!photos.length && !uploading && (
                <p className="mt-3 text-xs text-slate-400">Drop your project images here.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Save bar — sticks to the bottom of the page, below logo & photos */}
      <div className="sticky bottom-0 -mx-1 mt-2 border-t border-slate-200 bg-white/95 px-1 py-4 backdrop-blur">
        <button
          type="submit"
          form="company-edit-form"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
