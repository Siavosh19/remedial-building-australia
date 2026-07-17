"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { Check, X, Star, Clock, RefreshCw, ShieldCheck } from "lucide-react";

type TierPricing = { trial: number; monthly?: { key: string; cents: number }; yearly?: { key: string; cents: number } };

type Props = {
  planType: string;
  subStatus: string;
  billingCycle: string;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string | null;
  pricing: Record<string, TierPricing>;
  goldInfo?: { slotsLeft: number; cap: number; state: string; category: string } | null;
};

type Feature = { t: string; neg?: boolean };
type Plan = {
  key: string;
  tier: string;
  smallLabel: string;
  title: string;
  tagline: string;
  everything?: string;
  features: Feature[];
  cardStyle: CSSProperties;
  iconColor: string;
  badge?: string;
  badgeStyle: "navy" | "gold" | null;
  glow: boolean;
};

const SILVER_GRADIENT = "linear-gradient(135deg, #A8ADB4 0%, #F5F7F9 28%, #C7CCD2 50%, #FAFBFC 72%, #9197A0 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 28%, #D4AF37 50%, #FBF5B7 72%, #AA771C 100%)";

const PLANS: Plan[] = [
  {
    key: "basic",
    tier: "basic",
    smallLabel: "Free Listing",
    title: "Free",
    tagline: "Build your professional online presence.",
    features: [
      { t: "Public business profile" },
      { t: "Business description" },
      { t: "Phone, email & website" },
      { t: "Listed in directory search" },
      { t: "Does not receive quote requests", neg: true },
    ],
    cardStyle: { backgroundColor: "#F0FDF4", borderColor: "#86EFAC" },
    iconColor: "#16A34A",
    badgeStyle: null,
    glow: false,
  },
  {
    key: "claimed",
    tier: "claimed",
    smallLabel: "Silver",
    title: "Silver",
    tagline: "Receive project opportunities.",
    everything: "Everything in Free, plus",
    features: [
      { t: "Receive quote requests" },
      { t: "Request Quote button on your listing" },
      { t: "Rank above Free listings" },
      { t: "Logo upload" },
      { t: "Up to 15 project photos" },
      { t: "Licence & insurance (self-declared)" },
      { t: "Project portfolio" },
    ],
    cardStyle: { background: SILVER_GRADIENT, borderColor: "#8A9099", boxShadow: "0 10px 30px rgba(120,128,138,0.32)" },
    iconColor: "#0F2540",
    badgeStyle: null,
    glow: false,
  },
  {
    key: "featured",
    tier: "featured",
    smallLabel: "Gold",
    title: "Gold",
    tagline: "Maximum exposure.",
    everything: "Everything in Silver, plus",
    features: [
      { t: "Featured listing placement" },
      { t: "Gold Featured badge" },
      { t: "Be Featured in Your State" },
      { t: "Only 3 Featured businesses per category in your State" },
    ],
    cardStyle: { background: GOLD_GRADIENT, borderColor: "#AA771C", boxShadow: "0 12px 34px rgba(170,119,28,0.42)" },
    iconColor: "#8A6A14",
    badge: "Premium",
    badgeStyle: "gold",
    glow: true,
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    trialing: "bg-sky-100 text-sky-800",
    active: "bg-emerald-100 text-emerald-800",
    past_due: "bg-amber-100 text-amber-800",
    cancelled: "bg-red-100 text-red-700",
    expired: "bg-slate-100 text-slate-600",
    none: "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${map[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status === "trialing" ? "Free Trial" : status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
    </span>
  );
}

export default function SubscriptionClient({
  planType, subStatus, billingCycle, trialEndsAt, currentPeriodEnd, cancelAtPeriodEnd, stripeCustomerId, pricing, goldInfo,
}: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);

  async function subscribe(planKey: string) {
    setLoading(planKey);
    setError(null);
    try {
      const res = await fetch("/api/directory/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error ?? "Something went wrong. Please try again."); return; }
      if (data.checkoutUrl) { window.location.href = data.checkoutUrl; return; }
      if (data.mode === "updated" || data.mode === "manual_trial") {
        window.location.href = "/directory/dashboard/subscription?checkout=success";
        return;
      }
      setError("Unexpected response — please try again.");
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(null);
    }
  }

  async function cancelSub(resume: boolean) {
    setCancelLoading(true);
    setError(null);
    const res = await fetch("/api/directory/cancel-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume }),
    });
    const data = await res.json();
    setCancelLoading(false);
    if (!res.ok) { setError(data.error ?? "Could not update your subscription."); return; }
    window.location.reload();
  }

  const isActive = subStatus === "active" || subStatus === "trialing";

  return (
    <div className="space-y-8">
      {/* Current status */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Subscription</h1>
            <p className="mt-2 text-slate-600">Manage your directory plan and billing.</p>
          </div>
          <Link
            href="/advertise/marketing-guide"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-800 shadow-sm transition hover:bg-sky-50"
          >
            📘 Marketing Guide Breakdown →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Current plan</p>
            <p className="mt-3 text-xl font-bold capitalize text-slate-950">
              {planType === "basic" ? "Free Listing" : planType === "claimed" ? "Silver" : "Gold"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Status</p>
            <div className="mt-3">
              <StatusBadge status={subStatus} />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {subStatus === "trialing" ? "Trial ends" : "Renews"}
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {subStatus === "trialing" && trialEndsAt
                ? new Date(trialEndsAt).toLocaleDateString("en-AU")
                : currentPeriodEnd
                ? new Date(currentPeriodEnd).toLocaleDateString("en-AU")
                : "—"}
            </p>
            {cancelAtPeriodEnd && (
              <p className="mt-1 text-xs text-red-600">Cancels at period end</p>
            )}
          </div>
        </div>

        {isActive && planType !== "basic" && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            {cancelAtPeriodEnd ? (
              <button
                type="button"
                onClick={() => cancelSub(true)}
                disabled={cancelLoading}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60"
              >
                {cancelLoading ? "Working…" : "Resume subscription"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => cancelSub(false)}
                disabled={cancelLoading}
                className="rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                {cancelLoading ? "Working…" : "Cancel subscription"}
              </button>
            )}
            <p className="mt-2 text-xs text-slate-400">
              {cancelAtPeriodEnd ? "Your plan will keep renewing — nothing further to do." : "You'll keep your features until the end of the paid period, then revert to free Basic."}
            </p>
          </div>
        )}
      </div>

      {/* ═══════════════ SUBSCRIPTION PLANS SECTION (redesigned) ═══════════════ */}

      {/* Section heading */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-700">Choose your plan</p>
        <h2 className="mt-2 text-2xl font-extrabold text-[#0F2540] sm:text-3xl">Grow your business in the directory</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
          Free builds your profile. Silver receives quote requests. Gold makes you one of only three Featured businesses in your category in your State.
        </p>
      </div>

      {/* Toggle billing */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setBilling("monthly")}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${billing === "monthly" ? "bg-sky-950 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
        >
          Monthly
        </button>
        {/* ANNUAL DISMANTLED (2026-07-15) — monthly only for now. Restore this
            button to bring yearly billing back.
        <button
          type="button"
          onClick={() => setBilling("yearly")}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${billing === "yearly" ? "bg-sky-950 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
        >
          Yearly
        </button>
        */}
      </div>

      {/* Gold availability — premium navy/gold notification card */}
      {goldInfo && (
        <div className="overflow-hidden rounded-3xl border shadow-sm" style={{ background: "linear-gradient(135deg, #0A2540 0%, #123257 100%)", borderColor: "#C9A24A" }}>
          <div className="flex items-center gap-4 px-6 py-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow" style={{ background: "linear-gradient(135deg, #E6C25A, #C99A2E)" }}>
              <Star size={22} strokeWidth={2} className="text-[#0A2540]" fill="#0A2540" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#E6C25A" }}>Gold Featured Availability</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">
                {goldInfo.slotsLeft > 0 ? (
                  <>
                    <span className="font-bold text-white">{goldInfo.slotsLeft} of {goldInfo.cap} Featured positions available</span> in {goldInfo.state} for {goldInfo.category}.
                  </>
                ) : (
                  <>
                    <span className="font-bold text-white">All {goldInfo.cap} Featured positions are taken</span> in {goldInfo.state} for {goldInfo.category}. Silver still receives quote requests.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Plan cards */}
      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrent = planType === plan.key && isActive;
          const tierPricing = plan.key !== "basic" ? pricing[plan.tier] : null;
          const priceInfo = tierPricing ? (billing === "monthly" ? tierPricing.monthly : tierPricing.yearly) : null;
          const trial = tierPricing?.trial ?? 0;
          const priceMain = plan.key === "basic" ? "$0" : priceInfo ? `$${(priceInfo.cents / 100).toLocaleString("en-AU")}` : "—";
          const priceSuffix = plan.key === "basic" ? "/month" : priceInfo ? (billing === "monthly" ? "/month" : "/year") : "";
          const isGold = plan.key === "featured";

          return (
            <div
              key={plan.key}
              className={`group relative flex flex-col rounded-3xl border-2 p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 ${plan.glow ? "rba-plan-gold" : "shadow-sm hover:shadow-xl"} ${isCurrent ? "ring-2 ring-sky-500 ring-offset-2" : ""}`}
              style={plan.cardStyle}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider shadow-md"
                  style={
                    plan.badgeStyle === "gold"
                      ? { background: "linear-gradient(135deg, #E6C25A, #C99A2E)", color: "#0A2540" }
                      : { backgroundColor: "#0F2540", color: "#fff" }
                  }
                >
                  {plan.badgeStyle === "gold" ? "★ " : "★ "}{plan.badge}
                </div>
              )}

              {/* Header block — fixed min-height so the divider + checklist line up across all three cards regardless of intro length */}
              <div className="flex min-h-[216px] flex-col">
                {/* Label + title */}
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{plan.smallLabel}</p>
                <h3 className="mt-1.5 text-2xl font-extrabold text-[#0F2540]">{plan.title}</h3>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold leading-none text-[#0F2540]">{priceMain}</span>
                  {priceSuffix && <span className="text-sm font-semibold text-slate-500">{priceSuffix}</span>}
                </div>
                {plan.key !== "basic" && (
                  <>
                    {trial > 0 && <p className="mt-1.5 text-xs font-semibold text-emerald-700">{trial}-day free trial</p>}
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-500">Then renews automatically unless cancelled · cancel anytime</p>
                  </>
                )}

                {/* Supporting sentence */}
                <p className="mt-3 text-sm font-medium text-slate-600">{plan.tagline}</p>

                {/* "Everything in X, plus" — pinned to the bottom of the header block */}
                {plan.everything && (
                  <p className="mt-auto pt-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">{plan.everything}</p>
                )}
              </div>

              {/* Divider above the checklist — single consistent neutral grey on every card */}
              <div className="border-t border-slate-300" />

              {/* Feature checklist — starts at the same vertical position on every card */}
              <ul className="mt-5 flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f.t} className="flex items-start gap-2.5 text-sm leading-snug">
                    {f.neg ? (
                      <X size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-slate-400" />
                    ) : (
                      <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0" style={{ color: plan.iconColor }} />
                    )}
                    <span className={f.neg ? "text-slate-400" : "text-slate-700"}>{f.t}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="mt-8">
                {isCurrent ? (
                  <div className="rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-400">
                    Current Plan
                  </div>
                ) : plan.key === "basic" ? (
                  <div className="rounded-xl bg-[#16A34A] px-4 py-3 text-center text-sm font-bold text-white shadow-sm">
                    Free
                  </div>
                ) : priceInfo ? (
                  <button
                    type="button"
                    disabled={loading !== null}
                    onClick={() => { setError(null); setPendingPlan(priceInfo.key); }}
                    className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                      isGold ? "text-[#0A2540] hover:brightness-105" : "bg-[#0F2540] text-white shadow-md hover:bg-[#16365f] hover:shadow-lg"
                    }`}
                    style={isGold ? { background: "linear-gradient(135deg, #E6C25A 0%, #D4AF37 50%, #C99A2E 100%)", boxShadow: "0 8px 22px rgba(170,119,28,0.45)" } : undefined}
                  >
                    {loading === priceInfo.key ? "Redirecting…" : trial > 0 ? `Start ${trial}-day trial →` : `Upgrade to ${plan.title} →`}
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">{error}</div>
      )}

      {/* Bottom info — single reassurance box with stacked rows separated by thin dividers */}
      <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {[
          { icon: Clock, title: "Cancel Anytime", desc: "Renews automatically unless cancelled — cancel anytime. Your features stay active until the end of the paid period." },
          { icon: RefreshCw, title: "Flexible Plans", desc: "Upgrade or downgrade anytime." },
          { icon: ShieldCheck, title: "No Risk", desc: "No lock-in — cancel anytime. No lead guarantee. No endorsement." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
              <Icon size={20} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#0F2540]">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle gold-card glow (no excessive animation) */}
      <style>{`
        .rba-plan-gold {
          box-shadow: 0 12px 34px rgba(170,119,28,0.42);
          transition: transform 300ms ease, box-shadow 300ms ease;
        }
        .rba-plan-gold:hover {
          box-shadow: 0 20px 50px rgba(170,119,28,0.55), 0 0 0 1px rgba(230,194,90,0.45);
        }
      `}</style>

      {/* Terms & Conditions modal — shown before checkout / upgrade */}
      {pendingPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setPendingPlan(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-slate-950">Before you subscribe</h3>
            <p className="mt-2 text-sm text-slate-600">
              Please confirm you have read and agree to our Terms &amp; Conditions, including:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-sky-700">•</span> A recurring subscription billed in advance until you cancel.</li>
              <li className="flex gap-2"><span className="text-sky-700">•</span> Cancel anytime — features stay active until the end of the paid period, then revert to free Basic.</li>
              <li className="flex gap-2"><span className="text-sky-700">•</span> Gold Featured fills up to 3 spots per category in your State, in subscription order — no #1 or sole placement is guaranteed.</li>
              <li className="flex gap-2"><span className="text-sky-700">•</span> No guarantee of leads, enquiries or results. Fees are generally non-refundable.</li>
            </ul>
            <a href="/terms" target="_blank" className="mt-4 inline-block text-sm font-semibold text-sky-700 underline">
              Read the full Terms &amp; Conditions →
            </a>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingPlan(null)}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading !== null}
                onClick={() => { const p = pendingPlan; setPendingPlan(null); subscribe(p); }}
                className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
              >
                I Agree &amp; Continue →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
