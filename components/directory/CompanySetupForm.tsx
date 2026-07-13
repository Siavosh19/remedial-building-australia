"use client";

import { useState, useEffect } from "react";
import CategorySearch from "@/components/directory/CategorySearch";
import SuburbAutocomplete from "@/components/directory/SuburbAutocomplete";
import { postcodeToState } from "@/lib/au-locations";
import { validateAuPhone } from "@/lib/phone-au";

const OTHER_CATEGORY_ID = -1;

type AbnResult = {
  validFormat: boolean;
  active: boolean | null;
  entityName: string | null;
  state: string | null;
  postcode: string | null;
  status: "active" | "cancelled" | "invalid" | "not_found" | "unknown";
  source: "abr" | "checksum";
  message: string;
};

export default function CompanySetupForm({ categories }: { categories: { id: number; name: string }[] }) {
  const [form, setForm] = useState({
    companyName: "",
    abn: "",
    mainCategoryId: "",
    state: "NSW",
    suburb: "",
    postcode: "",
    phone: "",
    website: "",
    businessEmail: "",
    description: "",
    fullDescription: "",
    tagline: "",
    serviceAreaType: "radius",
    serviceRadiusKm: 50,
  });
  const [otherCategory, setOtherCategory] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);
  const [suburbVerified, setSuburbVerified] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const categoryOptions = [...categories, { id: OTHER_CATEGORY_ID, name: "Other (my category isn't listed)" }];
  const isOtherCategory = form.mainCategoryId === String(OTHER_CATEGORY_ID);

  // ── Live ABN verification (green/red) ──────────────────────────────────────────
  const [abnChecking, setAbnChecking] = useState(false);
  const [abnResult, setAbnResult] = useState<AbnResult | null>(null);

  // Format an ABN as the standard "XX XXX XXX XXX" while the user types, so it can
  // be entered/read with spaces. Validation & storage still use the 11 digits.
  function formatAbn(v: string): string {
    const d = v.replace(/\D/g, "").slice(0, 11);
    return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 8), d.slice(8, 11)].filter(Boolean).join(" ");
  }

  useEffect(() => {
    const abn = form.abn.replace(/\D/g, "");
    if (abn.length !== 11) {
      setAbnResult(null);
      setAbnChecking(false);
      return;
    }
    let cancelled = false;
    setAbnChecking(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/directory/abn-verify?abn=${abn}`);
        const data = await res.json();
        if (!cancelled) setAbnResult(res.ok ? data : null);
      } catch {
        if (!cancelled) setAbnResult(null);
      } finally {
        if (!cancelled) setAbnChecking(false);
      }
    }, 500);
    return () => { cancelled = true; clearTimeout(t); };
  }, [form.abn]);

  // Derived client-side hints (instant, no network)
  const pcState = form.postcode.length === 4 ? postcodeToState(form.postcode) : undefined;
  const postcodeMismatch = pcState && pcState !== form.state;
  const phoneCheck = form.phone ? validateAuPhone(form.phone) : null;

  // The ABN is "bad" (block) only when we positively know it's cancelled/not found
  // or fails the checksum. Unknown (no live key / lookup down) is allowed.
  const abnIsBad =
    abnResult != null &&
    (abnResult.status === "invalid" || abnResult.status === "cancelled" || abnResult.status === "not_found");
  const abnVerified = abnResult?.status === "active";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.mainCategoryId) {
      setStatus({ type: "error", message: "Please select a primary category." });
      return;
    }
    if (isOtherCategory && !otherCategory.trim()) {
      setStatus({ type: "error", message: "Please specify your category." });
      return;
    }
    if (abnIsBad) {
      setStatus({ type: "error", message: abnResult?.message || "Please enter a valid, active ABN." });
      return;
    }
    if (phoneCheck && !phoneCheck.valid) {
      setStatus({ type: "error", message: phoneCheck.message });
      return;
    }
    if (postcodeMismatch) {
      setStatus({ type: "error", message: `Postcode ${form.postcode} is in ${pcState}, not ${form.state}.` });
      return;
    }
    setStatus(null);
    setLoading(true);

    // Accept a bare domain (e.g. "www.walsos.com.au") and normalise to a full URL
    // so the stored value works as a link on the public profile.
    const rawSite = form.website.trim();
    const website = rawSite && !/^https?:\/\//i.test(rawSite) ? `https://${rawSite}` : rawSite;

    const response = await fetch("/api/directory/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        website,
        mainCategoryId: Number(form.mainCategoryId),
        otherCategory: isOtherCategory ? otherCategory.trim() : "",
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: "error", message: result.error ?? "Unable to submit company details." });
      return;
    }

    // Opt the business into the Weekly Remedial Building Update (best-effort —
    // never block a successful signup if the newsletter call fails or is a dup).
    if (newsletterOptIn && form.businessEmail.trim()) {
      try {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.companyName.trim() || "Directory member",
            email: form.businessEmail.trim(),
            interest: "All Topics",
          }),
        });
      } catch { /* ignore — newsletter is optional */ }
    }

    setStatus({
      type: "success",
      message: result.autoApproved
        ? "Your ABN is confirmed — your listing is now live in the directory! Redirecting…"
        : "Your listing has been submitted for review. We will notify you when it goes live. Redirecting…",
    });
    window.setTimeout(() => { window.location.href = "/directory/dashboard"; }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Company name</span>
          <input
            type="text"
            value={form.companyName}
            onChange={(event) => setForm({ ...form, companyName: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            maxLength={50}
            required
          />
          <span className="mt-1 block text-xs font-normal text-slate-400">
            {form.companyName.length}/50 · keep it short so it fits one line on your listing
          </span>
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>ABN</span>
          <div className="relative">
            <input
              type="text"
              value={form.abn}
              onChange={(event) => setForm({ ...form, abn: formatAbn(event.target.value) })}
              className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 pr-10 text-sm focus:outline-none ${
                abnIsBad
                  ? "border-rose-400 focus:border-rose-500"
                  : abnVerified
                  ? "border-emerald-400 focus:border-emerald-500"
                  : "border-slate-300 focus:border-sky-600"
              }`}
              required
              maxLength={14}
              placeholder="e.g. 78 138 462 763"
            />
            {form.abn.replace(/\D/g, "").length === 11 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base">
                {abnChecking ? "⏳" : abnIsBad ? "❌" : abnVerified ? "✅" : ""}
              </span>
            )}
          </div>
          {/* ABN status line */}
          {form.abn.replace(/\D/g, "").length === 11 && !abnChecking && abnResult && (
            <p className={`mt-1.5 text-xs font-medium ${abnIsBad ? "text-rose-600" : abnVerified ? "text-emerald-600" : "text-slate-500"}`}>
              {abnIsBad
                ? abnResult.status === "not_found"
                  ? "This ABN does not exist in the Australian Business Register."
                  : abnResult.status === "cancelled"
                  ? "This ABN is recorded as cancelled with the ABR."
                  : "Enter a valid 11-digit ABN."
                : abnVerified
                ? `ABN verified${abnResult.entityName ? ` — ${abnResult.entityName}` : ""}`
                : "We'll verify this ABN with the ABR when you submit."}
            </p>
          )}
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="block text-sm font-semibold text-slate-800">
          <span>Primary category</span>
          <CategorySearch
            categories={categoryOptions}
            value={form.mainCategoryId}
            onChange={(id) => setForm({ ...form, mainCategoryId: id })}
          />
          {isOtherCategory && (
            <input
              type="text"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              placeholder="Specify your trade / service"
              className="mt-2 w-full rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
              required
            />
          )}
        </div>

        <label className="block text-sm font-semibold text-slate-800">
          <span>State</span>
          <select
            value={form.state}
            onChange={(event) => setForm({ ...form, state: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
            required
          >
            {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="block text-sm font-semibold text-slate-800">
          <span>Suburb</span>
          <SuburbAutocomplete
            value={form.suburb}
            verified={suburbVerified}
            onType={(suburb) => { setForm((f) => ({ ...f, suburb })); setSuburbVerified(false); }}
            onSelect={(s) => {
              setForm((f) => ({ ...f, suburb: s.suburb, postcode: s.postcode, state: s.state }));
              setSuburbVerified(true);
            }}
          />
        </div>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Postcode</span>
          <input
            type="text"
            inputMode="numeric"
            value={form.postcode}
            onChange={(event) => setForm({ ...form, postcode: event.target.value.replace(/\D/g, "").slice(0, 4) })}
            className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm focus:outline-none ${
              postcodeMismatch ? "border-rose-400 focus:border-rose-500" : "border-slate-300 focus:border-sky-600"
            }`}
            required
          />
          {postcodeMismatch && (
            <p className="mt-1.5 text-xs font-medium text-rose-600">
              Postcode {form.postcode} is in {pcState}, not {form.state}.
            </p>
          )}
        </label>
      </div>

      {/* Service area — where the business operates */}
      <div className="block text-sm font-semibold text-slate-800">
        <span>Service area</span>
        <p className="mt-1 text-xs font-normal text-slate-500">
          Where do you service? You&rsquo;ll appear in searches and quote requests for these areas.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { id: "radius", label: "Within a radius" },
            { id: "state", label: "Entire State / Territory" },
            { id: "nationwide", label: "Australia-wide" },
          ].map((o) => (
            <button
              type="button"
              key={o.id}
              onClick={() => setForm({ ...form, serviceAreaType: o.id })}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                form.serviceAreaType === o.id
                  ? "border-sky-600 bg-sky-50 text-sky-900"
                  : "border-slate-300 bg-slate-50 text-slate-700 hover:border-sky-400"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        {form.serviceAreaType === "radius" && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-normal text-slate-600">Radius from your business address</span>
              <span className="font-bold text-sky-900">{form.serviceRadiusKm} km</span>
            </div>
            <input
              type="range"
              min={10}
              max={250}
              step={10}
              value={form.serviceRadiusKm}
              onChange={(e) => setForm({ ...form, serviceRadiusKm: Number(e.target.value) })}
              className="mt-2 w-full accent-sky-700"
            />
            <div className="flex justify-between text-[11px] font-normal text-slate-400">
              <span>10 km</span>
              <span>250 km</span>
            </div>
          </div>
        )}
        {form.serviceAreaType === "state" && (
          <p className="mt-3 text-xs font-normal text-slate-500">You&rsquo;ll appear for searches anywhere in {form.state}.</p>
        )}
        {form.serviceAreaType === "nationwide" && (
          <p className="mt-3 text-xs font-normal text-slate-500">You&rsquo;ll appear for searches anywhere in Australia.</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Phone number</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder="02 9876 5432 or 0412 345 678"
            className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm focus:outline-none ${
              phoneCheck && !phoneCheck.valid ? "border-rose-400 focus:border-rose-500" : "border-slate-300 focus:border-sky-600"
            }`}
            required
          />
          {phoneCheck && !phoneCheck.valid && (
            <p className="mt-1.5 text-xs font-medium text-rose-600">{phoneCheck.message}</p>
          )}
          {phoneCheck?.valid && (
            <p className="mt-1.5 text-xs font-medium text-emerald-600">Valid Australian {phoneCheck.type} number ✓</p>
          )}
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          <span>Website</span>
          <input
            type="text"
            inputMode="url"
            value={form.website}
            onChange={(event) => setForm({ ...form, website: event.target.value })}
            placeholder="www.yourbusiness.com.au"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          />
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Business email</span>
        <input
          type="email"
          value={form.businessEmail}
          onChange={(event) => setForm({ ...form, businessEmail: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          required
        />
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Tagline <span className="font-normal text-slate-400">(optional)</span></span>
        <input
          type="text"
          value={form.tagline}
          onChange={(event) => setForm({ ...form, tagline: event.target.value })}
          maxLength={45}
          placeholder="e.g. Registered Class 2 Builder"
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
        />
        <span className="mt-1 block text-xs font-normal text-slate-400">Appears next to your business name on your listing card and profile.</span>
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Short description <span className="font-normal text-slate-400">(listing card)</span></span>
        <textarea
          value={form.description}
          onChange={(event) => { const w = event.target.value.trim().split(/\s+/).filter(Boolean); setForm({ ...form, description: w.length <= 24 ? event.target.value : w.slice(0, 24).join(" ") }); }}
          rows={3}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
          required
        />
        <span className="mt-1 block text-xs font-normal text-slate-400">A brief summary shown on your directory listing card — max 24 words.</span>
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Full description <span className="font-normal text-slate-400">(profile page — optional)</span></span>
        <textarea
          value={form.fullDescription}
          onChange={(event) => setForm({ ...form, fullDescription: event.target.value })}
          rows={7}
          maxLength={7000}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
        />
        <span className="mt-1 block text-xs font-normal text-slate-400">The full write-up shown on your public profile page — up to ~1000 words. If left blank, your short description is used.</span>
      </label>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <input
          type="checkbox"
          checked={newsletterOptIn}
          onChange={(event) => setNewsletterOptIn(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-700 focus:ring-sky-600"
        />
        <span className="text-sm text-slate-700">
          <span className="font-semibold text-slate-800">Send me weekly updates</span> — receive the free Weekly Remedial Building Update (industry news, compliance and technical references) to your business email. Unsubscribe anytime.
        </span>
      </label>

      {status ? (
        <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {status.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || status?.type === "success" || abnIsBad || Boolean(postcodeMismatch)}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Submit & publish listing"}
      </button>
    </form>
  );
}
