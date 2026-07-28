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
// picker looks the same across the site.
const SILVER_GRADIENT = "linear-gradient(135deg, #A8ADB4 0%, #F5F7F9 28%, #C7CCD2 50%, #FAFBFC 72%, #9197A0 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 28%, #D4AF37 50%, #FBF5B7 72%, #AA771C 100%)";
// Metallic gradients tuned for TEXT on white — darker stops so the title stays readable while still shining.
const GOLD_TEXT_GRADIENT = "linear-gradient(135deg, #A9791C 0%, #E6C15A 26%, #B0810E 50%, #F0D583 74%, #8A6A14 100%)";
const SILVER_TEXT_GRADIENT = "linear-gradient(135deg, #556070 0%, #A9B2BE 26%, #6B7683 50%, #C2CAD4 74%, #48505C 100%)";

// Brushed-metal + ribbon tokens for the "as shown live in the directory" preview
// snapshots (mirror the marketing guide / real directory cards).
const GOLD_BRUSH = "linear-gradient(135deg, #fbf3d9 0%, #f0d59f 18%, #fdf8e8 34%, #e6c977 50%, #faf1d6 66%, #edd696 82%, #fbf3d9 100%)";
const SILVER_BRUSH = "linear-gradient(135deg, #f4f6f8 0%, #dfe4ea 18%, #f7f9fb 34%, #cbd2db 50%, #eef1f4 66%, #d6dce3 82%, #f4f6f8 100%)";
const GOLD_RIBBON = "linear-gradient(135deg, #b8963e, #d4b44a, #c8922a)";
const SILVER_RIBBON = "linear-gradient(135deg, #64748b, #94a3b8, #475569)";
const NAVY = "#1e3a5f";

type PlanMeta = {
  key: PlanChoice;
  smallLabel: string;
  title: string;
  tagline: string;
  everything?: string;
  features: { t: string; neg?: boolean }[];
  cardStyle: CSSProperties;
  iconColor: string;
  titleColor: string;
  titleGradient?: string;
  badge?: string;
  glow?: boolean;
};

// Feature copy mirrors the /directory/pricing + subscription cards. Ordered
// Gold → Silver → Free (Gold on top) for the second page of the flow.
const PLAN_META: Record<PlanChoice, PlanMeta> = {
  gold: {
    key: "gold",
    smallLabel: "Gold",
    title: "Gold",
    tagline: "Maximum exposure and project opportunities",
    everything: "Everything in Silver, plus",
    features: [
      { t: "Receive quote requests" },
      { t: "Featured placement — above Silver & Free listings" },
      { t: "Gold Featured badge" },
      { t: "7 lead credits per month — 1 credit per lead you take" },
      { t: "Shown across your whole State — not distance-limited" },
      { t: "Only 3 Gold businesses per category in your State" },
    ],
    cardStyle: { background: GOLD_GRADIENT, borderColor: "#AA771C", boxShadow: "0 12px 34px rgba(170,119,28,0.42)" },
    iconColor: "#8A6A14",
    titleColor: "#B0810E",
    titleGradient: GOLD_TEXT_GRADIENT,
    badge: "Best exposure",
    glow: true,
  },
  silver: {
    key: "silver",
    smallLabel: "Silver",
    title: "Silver",
    tagline: "Receive project opportunities.",
    everything: "Everything in Free, plus",
    features: [
      { t: "Receive quote requests" },
      { t: "Request Quote button on your listing" },
      { t: "Rank above Free listings — within 75 km" },
      { t: "3 lead credits per month — 1 credit per lead you take" },
      { t: "Company logo + up to 15 project photos" },
      { t: "On-card description (up to 114 characters) + tagline" },
    ],
    cardStyle: { background: SILVER_GRADIENT, borderColor: "#8A9099", boxShadow: "0 10px 30px rgba(120,128,138,0.32)" },
    iconColor: "#0F2540",
    titleColor: "#6B7280",
    titleGradient: SILVER_TEXT_GRADIENT,
    badge: "Recommended",
  },
  free: {
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
      { t: "No on-card description", neg: true },
    ],
    cardStyle: { backgroundColor: "#FFFFFF", borderColor: "#000000", borderWidth: "1px" },
    iconColor: "#16A34A",
    titleColor: "#111827",
  },
};

// Stacked order on the "choose your plan" page: Gold top, Silver middle, Free end.
const PLAN_ORDER: PlanChoice[] = ["gold", "silver", "free"];

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

/* ── live-style listing snapshots (mirror the real directory cards) ─────── */
// A filled-red "Request Quote" button sits under "View Profile" on the paid
// snapshots — the same pair a Silver/Gold listing shows in the live directory.
function QuoteButtons({ outlined = false }: { outlined?: boolean }) {
  return (
    <div className="hidden shrink-0 flex-col gap-2 sm:flex">
      <span
        className={`whitespace-nowrap rounded-lg px-4 py-2 text-center text-xs font-bold ${
          outlined ? "border border-slate-300 bg-white text-slate-700" : "text-white"
        }`}
        style={outlined ? undefined : { background: NAVY }}
      >
        View Profile →
      </span>
      <span className="whitespace-nowrap rounded-lg bg-red-600 px-4 py-2 text-center text-xs font-bold text-white">
        Request Quote
      </span>
    </div>
  );
}

// Gold & Silver share the SAME premium layout — only the colour differs.
// Description is optional so it is not shown here; a single point of contact
// (phone/email) mirrors the free-listing requirement.
function PremiumSnapshot({ tier }: { tier: "gold" | "silver" }) {
  const gold = tier === "gold";
  return (
    <div className="rounded-2xl p-[3px] shadow-sm" style={{ background: gold ? GOLD_BRUSH : SILVER_BRUSH }}>
      <div className="relative rounded-xl bg-white px-5 pb-5 pt-7">
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white"
          style={{ background: gold ? GOLD_RIBBON : SILVER_RIBBON, boxShadow: gold ? "0 4px 14px rgba(184,150,62,0.45)" : "0 3px 10px rgba(71,85,105,0.35)" }}
        >
          {gold ? "⭐ Gold Featured" : "Silver — Available"}
        </span>
        <div className="flex items-start gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold ${gold ? "text-[#7a5c1e]" : "bg-slate-100 text-slate-500"}`}
            style={gold ? { background: "#fff6da" } : undefined}
          >
            YB
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-extrabold text-sky-950">
              Your Business Name <span className="font-semibold text-slate-400">| Remedial Builder</span>
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${gold ? "text-[#7a5c1e]" : "text-slate-600"}`} style={{ background: gold ? "#fff6da" : "#e2e8f0" }}>Waterproofing</span>
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-slate-600" style={{ background: "#f1f5f9" }}>&lt; 1 km away</span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-600">
              Trusted local specialists — quality workmanship, fully insured, servicing strata and commercial projects.
            </p>
            <p className="mt-1.5 text-xs text-slate-500">Your Suburb, State</p>
            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
              <span>📞 000 000 000</span>
              <span>✉ you@yourbusiness.com.au</span>
            </p>
          </div>
          <QuoteButtons outlined={!gold} />
        </div>
        {/* Mobile: buttons as a footer row — mirrors the live directory card on phones */}
        <div className="mt-3 flex items-center gap-2 sm:hidden">
          <span className="flex-1 rounded-lg bg-sky-950 px-3 py-2 text-center text-xs font-bold text-white">View Profile →</span>
          <span className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-center text-xs font-bold text-white">Request Quote</span>
        </div>
      </div>
    </div>
  );
}

function FreeSnapshot() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {["Business Name One", "Business Name Two"].map((name, i) => (
        <div key={name} className={`flex items-start justify-between gap-3 px-5 py-4 ${i === 0 ? "border-b-2 border-slate-300" : ""} bg-slate-50/60`}>
          <div className="min-w-0">
            <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">Access Equipment</span>
            <p className="mt-1.5 text-sm font-bold text-slate-700">
              {name} <span className="font-normal text-slate-400">(Your Suburb, State)</span>
            </p>
            <p className="mt-0.5 text-xs text-slate-500">00 0000 0000 · info@yourbusiness.com.au · yourbusiness.com.au</p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700">View Profile</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const SNAPSHOT: Record<PlanChoice, () => React.JSX.Element> = {
  gold: () => <PremiumSnapshot tier="gold" />,
  silver: () => <PremiumSnapshot tier="silver" />,
  free: FreeSnapshot,
};
const SNAPSHOT_CAPTION: Record<PlanChoice, string> = {
  gold: "Gold Featured placement as shown live on the directory.",
  silver: "Silver placement as shown live on the directory.",
  free: "Free listings as shown live on the directory.",
};

export default function CompanySetupFormV2({ categories, plans }: { categories: { id: number; name: string }[]; plans: SignupPlans }) {
  // Two-step flow: step 1 collects the business details, step 2 is the plan
  // picker (Gold / Silver / Free stacked, each with its own submit button).
  const [step, setStep] = useState<1 | 2>(1);
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

  // ── Input caps ──────────────────────────────────────────────────────────────
  // The plan isn't chosen until step 2, so the name field uses the larger paid cap
  // here; Free listings are clamped to the short name at render time on the card.
  const nameMax = NAME_MAX_PAID;
  const nameAtCap = form.companyName.length >= nameMax;
  const descCharCount = form.description.length;
  const descAtCap = descCharCount >= DESC_MAX_CHARS;

  // Validate the fields that every plan needs. Returns an error string (and sets
  // the status banner) or null when the details are good to go.
  function validateBase(): string | null {
    if (!form.mainCategoryId) return "Please select a primary category.";
    if (isOtherCategory && !otherCategory.trim()) return "Please specify your category.";
    if (abnIsBad) return abnResult?.message || "Please enter a valid, active ABN.";
    if (phoneCheck && !phoneCheck.valid) return phoneCheck.message;
    // Point of contact: a phone OR an email is required — not both.
    if (!form.phone.trim() && !form.businessEmail.trim()) {
      return "Add at least one point of contact — a phone number or an email address.";
    }
    if (postcodeMismatch) return `Postcode ${form.postcode} is in ${pcState}, not ${form.state}.`;
    return null;
  }

  // Step 1 → Step 2: validate the shared details, then reveal the plan picker.
  function goToPlans(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const err = validateBase();
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }
    setStatus(null);
    setStep(2);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitPlan(plan: PlanChoice) {
    const isPaid = plan !== "free";
    const err = validateBase();
    if (err) {
      // A base-field problem means the details on step 1 need fixing.
      setStatus({ type: "error", message: err });
      setStep(1);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Description is OPTIONAL for Silver/Gold — an empty one just leaves the card
    // without a description; never block submission on it.
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
        // Surfaced in the admin new-signup email (Free / Silver / Gold).
        selectedPlan: plan,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setLoading(false);
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
        message: plan === "gold"
          ? "Listing created — redirecting to secure checkout to activate Gold…"
          : "Listing created — redirecting to secure checkout to start your free trial…",
      });
      try {
        const subRes = await fetch("/api/directory/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: plan === "gold" ? "featured-monthly" : "claimed-monthly" }),
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
        // Subscribe failed (e.g. Gold full in this State) — the paid listing is
        // saved as a draft (not published) until checkout completes.
        // Free; send them to the dashboard with the reason.
        setLoading(false);
        setStatus({ type: "error", message: (subResult.error ?? "We couldn't start checkout.") + " Your listing is saved as a draft — complete payment from your dashboard to publish it." });
        window.setTimeout(() => { window.location.href = "/directory/dashboard/subscription"; }, 3500);
      } catch {
        setLoading(false);
        setStatus({ type: "error", message: "We couldn't reach checkout. Your listing is saved as a draft — complete payment from your dashboard to publish it." });
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

  const statusBanner = status ? (
    <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
      {status.message}
    </div>
  ) : null;

  // ── STEP 2 — choose your listing type (Gold → Silver → Free, stacked) ────────
  if (step === 2) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => { setStep(1); setStatus(null); }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-800 hover:text-sky-950"
        >
          ← Back to your details
        </button>

        <div className="text-center">
          <p className="text-xl font-extrabold text-slate-900">Choose your listing type</p>
          <p className="mx-auto mt-1 max-w-2xl text-sm text-slate-500">
            Free publishes instantly. Silver starts a free trial; Gold subscribes immediately. A card is required at checkout for paid plans — no charge on Silver until the trial ends.
          </p>
        </div>

        <div className="space-y-10">
          {PLAN_ORDER.map((key) => {
            const plan = PLAN_META[key];
            const price = priceFor(key);
            const priceMain = key === "free" ? "$0" : price ? fmtDollars(price.cents) : "—";
            const trial = price?.trial ?? 0;
            const Snapshot = SNAPSHOT[key];
            const disabled = loading || status?.type === "success" || abnIsBad || Boolean(postcodeMismatch);
            const cta =
              loading ? "Submitting…"
              : key === "gold" ? "Subscribe to Gold →"
              : key === "silver" ? "Start Silver trial →"
              : "Submit & publish free listing";
            return (
              <div key={key} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,37,64,0.12)]">
                {/* 1 ── Title + price on white, left-aligned, plan-coloured (Gold/Silver/black) ── */}
                <div>
                  {plan.badge && (
                    <span className="inline-block rounded-full bg-[#0F2540] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      ★ {plan.badge}
                    </span>
                  )}
                  <p className={`text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 ${plan.badge ? "mt-2" : ""}`}>{plan.smallLabel}</p>
                  <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3
                      className="text-3xl font-extrabold"
                      style={plan.titleGradient
                        ? { background: plan.titleGradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }
                        : { color: plan.titleColor }}
                    >
                      {plan.title} {priceMain}
                    </h3>
                    <span className="text-sm font-semibold text-slate-500">/month</span>
                    {trial > 0 && <span className="text-xs font-semibold text-emerald-700">· {trial}-day free trial</span>}
                  </div>
                </div>

                {/* 2 ── Live preview of how the listing appears in the directory ── */}
                <div>
                  <Snapshot />
                  <p className="mt-2 text-center text-xs text-slate-500">{SNAPSHOT_CAPTION[key]}</p>
                </div>

                {/* 3 ── Explanation (Gold: bold black with a star) ── */}
                <p className={key === "gold" ? "text-sm font-bold text-slate-900" : "text-sm font-medium text-slate-600"}>
                  {key === "gold" ? "★ " : ""}{plan.tagline}
                </p>

                {/* 4 ── Features — negatives shown in red ── */}
                <div>
                  {plan.everything && (
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{plan.everything}</p>
                  )}
                  <ul className="mt-2 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {plan.features.map((f) => (
                      <li key={f.t} className="flex items-start gap-2 text-sm leading-snug">
                        {f.neg ? (
                          <X size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-red-500" />
                        ) : (
                          <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0" style={{ color: plan.iconColor }} />
                        )}
                        <span className={f.neg ? "text-red-600" : "text-slate-700"}>{f.t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5 ── Subscribe button — centred, divided from the card above ── */}
                <div className="flex justify-center border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={() => submitPlan(key)}
                    disabled={disabled}
                    className="rba-cta-shine inline-flex items-center justify-center rounded-2xl bg-sky-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {statusBanner}

        <p className="text-center text-xs text-slate-500">
          You can upgrade, downgrade or cancel anytime from your dashboard — no lock-in contracts.
        </p>
      </div>
    );
  }

  // ── STEP 1 — your business details ───────────────────────────────────────────
  return (
    <form onSubmit={goToPlans} className="space-y-6">
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

      <label className="block text-sm font-semibold text-slate-800">
        <span>Short description <span className="font-normal text-slate-400">(Silver &amp; Gold listing card)</span></span>
        <textarea
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value.slice(0, DESC_MAX_CHARS) })}
          rows={3}
          maxLength={DESC_MAX_CHARS}
          className={`mt-2 w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm focus:outline-none ${descAtCap ? "border-rose-400 focus:border-rose-500" : "border-slate-300 focus:border-sky-600"}`}
        />
        <span className="mt-1 flex justify-between gap-3 text-xs font-normal">
          <span className={descAtCap ? "font-semibold text-rose-600" : "text-slate-400"}>
            {descAtCap ? `Max ${DESC_MAX_CHARS} characters` : `Optional — shown on your Silver/Gold listing card if you add one. Free listings don't display a description.`}
          </span>
          <span className={`shrink-0 tabular-nums ${descAtCap ? "font-semibold text-rose-600" : "text-slate-400"}`}>{descCharCount}/{DESC_MAX_CHARS}</span>
        </span>
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

      {statusBanner}

      {/* One step left — continue to the listing-type picker (Gold / Silver / Free). */}
      <div>
        <p className="text-center text-sm font-semibold text-slate-500">One step left — choose your listing type.</p>
        <button
          type="submit"
          disabled={loading || status?.type === "success" || abnIsBad || Boolean(postcodeMismatch)}
          className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Choose your listing type →
        </button>
      </div>
    </form>
  );
}
