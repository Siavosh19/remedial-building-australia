"use client";

import { useState, useEffect, type CSSProperties } from "react";
import { Check, X } from "lucide-react";
import CategorySearch from "@/components/directory/CategorySearch";
import SuburbAutocomplete from "@/components/directory/SuburbAutocomplete";
import { postcodeToState } from "@/lib/au-locations";
import { validateAuPhone } from "@/lib/phone-au";
import { NAME_MAX_FREE, NAME_MAX_PAID, DESC_MAX_CHARS } from "@/lib/directory-tier";

const OTHER_CATEGORY_ID = -1;

// Plan the signer-upper is choosing. "free" publishes immediately; "silver" /
// "gold" create the listing then hand off to Stripe checkout (card required)
// before the trial starts. Keys map to the subscribe route's plan keys.
type PlanChoice = "free" | "silver" | "gold";
type PlanPricing = { cents: number; trial: number; compareAt?: number | null; promo?: string | null };
export type SignupPlans = { silver: PlanPricing; gold: PlanPricing };

const fmtDollars = (cents: number) => {
  const d = cents / 100;
  return Number.isInteger(d) ? `$${d.toLocaleString("en-AU")}` : `$${d.toFixed(2)}`;
};

// Plan-card design tokens — mirror the subscription/marketing cards so the plan
// picker looks the same across the site. Free is intentionally white with a
// black border; Silver/Gold use the brushed-metal gradients.
const SILVER_GRADIENT = "linear-gradient(135deg, #A8ADB4 0%, #F5F7F9 28%, #C7CCD2 50%, #FAFBFC 72%, #9197A0 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 28%, #D4AF37 50%, #FBF5B7 72%, #AA771C 100%)";

type PlanMeta = {
  key: PlanChoice;
  smallLabel: string;
  title: string;
  tagline: string;
  everything?: string;
  features: { t: string; neg?: boolean }[];
  cardStyle: CSSProperties;
  iconColor: string;
  badge?: string;
  glow?: boolean;
};

// Feature copy mirrors the /directory/pricing + subscription cards.
const PLAN_META: PlanMeta[] = [
  {
    key: "free",
    smallLabel: "Free Listing",
    title: "Free",
    tagline: "Build your professional online presence.",
    features: [
      { t: "Public business profile" },
      { t: "Business description" },
      { t: "Phone, email and website" },
      { t: "Listed in directory search" },
      { t: "Does not receive quote requests", neg: true },
    ],
    cardStyle: { backgroundColor: "#FFFFFF", borderColor: "#000000", borderWidth: "1px" },
    iconColor: "#16A34A",
  },
  {
    key: "silver",
    smallLabel: "Silver",
    title: "Silver",
    tagline: "Receive project opportunities.",
    everything: "Everything in Free, plus",
    features: [
      { t: "Receive quote requests" },
      { t: "Request Quote button on your listing" },
      { t: "Rank above Free listings — within 50 km" },
      { t: "3 lead credits per week" },
      { t: "Company logo + up to 15 project photos" },
      { t: "On-card description (up to 114 characters) + tagline" },
    ],
    cardStyle: { background: SILVER_GRADIENT, borderColor: "#8A9099", boxShadow: "0 10px 30px rgba(120,128,138,0.32)" },
    iconColor: "#0F2540",
  },
  {
    key: "gold",
    smallLabel: "Gold",
    title: "Gold",
    tagline: "Maximum exposure.",
    everything: "Everything in Silver, plus",
    features: [
      { t: "Featured placement — above Silver & Free listings" },
      { t: "Gold Featured badge" },
      { t: "7 lead credits per week" },
      { t: "Shown across your whole State — not distance-limited" },
      { t: "Only 3 Gold businesses per category in your State" },
    ],
    cardStyle: { background: GOLD_GRADIENT, borderColor: "#AA771C", boxShadow: "0 12px 34px rgba(170,119,28,0.42)" },
    iconColor: "#8A6A14",
    badge: "Recommended",
    glow: true,
  },
];

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

export default function CompanySetupForm({ categories, plans }: { categories: { id: number; name: string }[]; plans: SignupPlans }) {
  const [selectedPlan, setSelectedPlan] = useState<PlanChoice>("free");
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

  // ── Tier-dependent input caps ──────────────────────────────────────────────
  // Free listings show a short name only and no description; Silver/Gold show a
  // fuller name + a capped description. Caps are enforced live (can't type past
  // them) and match what the listing card renders, so nothing gets clipped.
  const isPaid = selectedPlan !== "free";
  const nameMax = isPaid ? NAME_MAX_PAID : NAME_MAX_FREE;
  const nameAtCap = form.companyName.length >= nameMax;
  const descCharCount = form.description.length;
  const descAtCap = descCharCount >= DESC_MAX_CHARS;

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
    // Point of contact: a phone OR an email is required — not both.
    if (!form.phone.trim() && !form.businessEmail.trim()) {
      setStatus({ type: "error", message: "Add at least one point of contact — a phone number or an email address." });
      return;
    }
    if (postcodeMismatch) {
      setStatus({ type: "error", message: `Postcode ${form.postcode} is in ${pcState}, not ${form.state}.` });
      return;
    }
    if (isPaid && !form.description.trim()) {
      setStatus({ type: "error", message: "A short description is required for Silver and Gold listings." });
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
        // Free listings carry no description (their card never shows one).
        description: isPaid ? form.description : "",
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

    // Paid plan → create the listing (done above) then hand off to Stripe
    // checkout, where a card is collected before the free trial starts. If the
    // buyer abandons checkout, the listing simply stays Free/claimed.
    if (isPaid) {
      setStatus({
        type: "success",
        message: selectedPlan === "gold"
          ? "Listing created — redirecting to secure checkout to activate Gold…"
          : "Listing created — redirecting to secure checkout to start your free trial…",
      });
      try {
        const subRes = await fetch("/api/directory/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: selectedPlan === "gold" ? "featured-monthly" : "claimed-monthly" }),
        });
        const subResult = await subRes.json().catch(() => ({}));
        if (subRes.ok && subResult.checkoutUrl) {
          window.location.href = subResult.checkoutUrl;
          return;
        }
        if (subRes.ok && (subResult.success || subResult.mode)) {
          // Manual trial granted (Stripe not configured for this plan yet).
          window.location.href = "/directory/dashboard/subscription";
          return;
        }
        // Subscribe failed (e.g. Gold full in this State) — listing is live as
        // Free; send them to the dashboard with the reason.
        setStatus({ type: "error", message: (subResult.error ?? "We couldn't start checkout.") + " Your listing is live as a Free listing — you can upgrade anytime from your dashboard." });
        window.setTimeout(() => { window.location.href = "/directory/dashboard/subscription"; }, 3500);
      } catch {
        setStatus({ type: "error", message: "We couldn't reach checkout. Your listing is live as Free — upgrade anytime from your dashboard." });
        window.setTimeout(() => { window.location.href = "/directory/dashboard/subscription"; }, 3500);
      }
      return;
    }

    setStatus({
      type: "success",
      message: result.autoApproved
        ? "Your ABN is confirmed — your listing is now live in the directory! Redirecting…"
        : "Your listing has been submitted for review. We will notify you when it goes live. Redirecting…",
    });
    window.setTimeout(() => { window.location.href = "/directory/dashboard"; }, 2000);
  }

  const priceFor = (key: PlanChoice): PlanPricing | null =>
    key === "silver" ? plans.silver : key === "gold" ? plans.gold : null;

  // The plan-picker card grid — rendered lower down the form (just above the
  // description/submit area) so people fill in their business details first.
  const planPicker = (
    <div>
      <p className="text-base font-bold text-slate-900">Choose your plan</p>
      <p className="mt-0.5 text-xs text-slate-500">
        Free publishes instantly. Silver starts a free trial; Gold subscribes immediately. A card is required at checkout for paid plans — no charge on Silver until the trial ends.
      </p>
      <div className="mt-4 grid items-stretch gap-5 md:grid-cols-3" role="radiogroup" aria-label="Choose your plan">
        {PLAN_META.map((plan) => {
          const active = selectedPlan === plan.key;
          const price = priceFor(plan.key);
          const priceMain = plan.key === "free" ? "$0" : price ? fmtDollars(price.cents) : "—";
          const trial = price?.trial ?? 0;
          return (
            <button
              key={plan.key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelectedPlan(plan.key)}
              className={`group relative flex flex-col rounded-3xl border-2 p-6 text-left transition-all duration-300 ease-out hover:-translate-y-1 ${plan.glow ? "rba-plan-gold" : "shadow-sm hover:shadow-xl"} ${active ? "ring-2 ring-sky-600 ring-offset-2" : ""}`}
              style={plan.cardStyle}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider shadow-md"
                  style={{ background: "linear-gradient(135deg, #E6C25A, #C99A2E)", color: "#0A2540" }}
                >
                  ★ {plan.badge}
                </div>
              )}
              {/* Header block — fixed min-height so dividers/checklists align across cards */}
              <div className="flex min-h-[150px] flex-col">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{plan.smallLabel}</p>
                <h3 className="mt-1 text-2xl font-extrabold text-[#0F2540]">{plan.title}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold leading-none text-[#0F2540]">{priceMain}</span>
                  <span className="text-sm font-semibold text-slate-500">/month</span>
                </div>
                {trial > 0 && <p className="mt-1 text-xs font-semibold text-emerald-700">{trial}-day free trial</p>}
                <p className="mt-2 text-sm font-medium text-slate-600">{plan.tagline}</p>
                {plan.everything && (
                  <p className="mt-auto pt-3 text-[11px] font-bold uppercase tracking-wide text-slate-500">{plan.everything}</p>
                )}
              </div>
              <div className="border-t border-slate-300/70" />
              <ul className="mt-4 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f.t} className="flex items-start gap-2 text-sm leading-snug">
                    {f.neg ? (
                      <X size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-slate-400" />
                    ) : (
                      <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0" style={{ color: plan.iconColor }} />
                    )}
                    <span className={f.neg ? "text-slate-400" : "text-slate-700"}>{f.t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <span
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    active ? "bg-[#0F2540] text-white shadow-md" : "border-2 border-[#0F2540]/25 bg-white/70 text-[#0F2540]"
                  }`}
                >
                  <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full border-2 ${active ? "border-white bg-white/20" : "border-[#0F2540]/40"}`}>
                    {active && <Check size={11} strokeWidth={4} className="text-white" />}
                  </span>
                  {active ? "Selected" : "Select this plan"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Company name</span>
          <input
            type="text"
            value={form.companyName}
            onChange={(event) => setForm({ ...form, companyName: event.target.value.slice(0, nameMax) })}
            className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm focus:outline-none ${nameAtCap ? "border-rose-400 focus:border-rose-500" : "border-slate-300 focus:border-sky-600"}`}
            maxLength={nameMax}
            required
          />
          <span className="mt-1 flex justify-between gap-3 text-xs font-normal">
            <span className={nameAtCap ? "font-semibold text-rose-600" : "text-slate-400"}>
              {nameAtCap ? `Max ${nameMax} characters` : "Keep it short so it fits one line on your listing"}
            </span>
            <span className={`shrink-0 tabular-nums ${nameAtCap ? "font-semibold text-rose-600" : "text-slate-400"}`}>{form.companyName.length}/{nameMax}</span>
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

      {/* Public point of contact — a phone OR an email is enough (not both). Some
          businesses prefer not to publish a phone. This is SEPARATE from the phone
          on your account, which is always required. */}
      <p className="text-xs font-normal text-slate-500">
        Point of contact — provide a phone number <span className="font-semibold">or</span> an email address (you don&rsquo;t have to publish both). This is separate from the phone on your account.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          <span>Phone number <span className="font-normal text-slate-400">(or email)</span></span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder="02 9876 5432 or 0412 345 678"
            className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm focus:outline-none ${
              phoneCheck && !phoneCheck.valid ? "border-rose-400 focus:border-rose-500" : "border-slate-300 focus:border-sky-600"
            }`}
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
        <span>Business email <span className="font-normal text-slate-400">(or phone)</span></span>
        <input
          type="email"
          value={form.businessEmail}
          onChange={(event) => setForm({ ...form, businessEmail: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
        />
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        <span>Tagline <span className="font-normal text-slate-400">(optional)</span></span>
        <input
          type="text"
          value={form.tagline}
          onChange={(event) => setForm({ ...form, tagline: event.target.value })}
          maxLength={35}
          placeholder="e.g. Registered Class 2 Builder"
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none"
        />
        <span className="mt-1 flex justify-between gap-3 text-xs font-normal text-slate-400">
          <span>Appears next to your business name on your listing card.</span>
          <span className={`shrink-0 tabular-nums ${form.tagline.length >= 35 ? "font-semibold text-amber-600" : ""}`}>{form.tagline.length}/35</span>
        </span>
      </label>

      {/* Plan picker moved here — after business details, before description + submit */}
      {planPicker}

      {isPaid ? (
        <label className="block text-sm font-semibold text-slate-800">
          <span>Short description <span className="font-normal text-slate-400">(listing card)</span></span>
          <textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value.slice(0, DESC_MAX_CHARS) })}
            rows={3}
            maxLength={DESC_MAX_CHARS}
            className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm focus:outline-none ${descAtCap ? "border-rose-400 focus:border-rose-500" : "border-slate-300 focus:border-sky-600"}`}
            required
          />
          <span className="mt-1 flex justify-between gap-3 text-xs font-normal">
            <span className={descAtCap ? "font-semibold text-rose-600" : "text-slate-400"}>
              {descAtCap ? `Max ${DESC_MAX_CHARS} characters` : `A brief summary shown on your Silver/Gold listing card — max ${DESC_MAX_CHARS} characters.`}
            </span>
            <span className={`shrink-0 tabular-nums ${descAtCap ? "font-semibold text-rose-600" : "text-slate-400"}`}>{descCharCount}/{DESC_MAX_CHARS}</span>
          </span>
        </label>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
          Free listings show your business name and contact details only — no description. Choose <span className="font-semibold text-slate-700">Silver</span> or <span className="font-semibold text-slate-700">Gold</span> above to add an on-card description (up to {DESC_MAX_CHARS} characters), a logo and photos.
        </div>
      )}

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
        {loading
          ? "Submitting…"
          : isPaid
          ? selectedPlan === "gold"
            ? "Continue to secure checkout — subscribe to Gold →"
            : "Continue to secure checkout — start Silver trial →"
          : "Submit & publish free listing"}
      </button>
    </form>
  );
}
