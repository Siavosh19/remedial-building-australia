"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";

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
};

const PLANS = [
  {
    key: "basic",
    tier: "basic",
    label: "Free Listing",
    features: ["Public business profile", "Logo + up to 5 photos", "Licence & insurance (self-declared)", "Does not receive quote requests"],
    accent: "border-slate-200",
    cardStyle: { backgroundColor: "#F8FAFC" } as CSSProperties | undefined,
    textClass: "",
    badge: undefined as string | undefined,
  },
  {
    key: "claimed",
    tier: "claimed",
    label: "Silver",
    features: [
      "Everything in Free",
      "Receive quote requests",
      "Request Quote button on your listing",
      "Rank above Free listings",
      "Up to 15 project photos",
      "Project portfolio section",
    ],
    accent: "border-slate-300",
    cardStyle: { background: "linear-gradient(135deg, #A8ADB4 0%, #F5F7F9 28%, #C7CCD2 50%, #FAFBFC 72%, #9197A0 100%)", borderColor: "#8A9099", borderWidth: "2.5px", boxShadow: "0 10px 32px rgba(120,128,138,0.4)" },
    textClass: "text-slate-900 font-semibold",
    badge: undefined as string | undefined,
  },
  {
    key: "featured",
    tier: "featured",
    label: "Gold",
    features: [
      "Everything in Silver",
      "Featured listing placement",
      "Gold Featured badge",
      "Only 3 Featured per category in your State",
      "Be Featured in Your State",
    ],
    accent: "border-amber-400",
    cardStyle: { background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 28%, #D4AF37 50%, #FBF5B7 72%, #AA771C 100%)", borderColor: "#AA771C", borderWidth: "2.5px", boxShadow: "0 10px 32px rgba(170,119,28,0.45)" },
    textClass: "text-black font-semibold",
    badge: "★ Recommended",
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
      {status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
    </span>
  );
}

export default function SubscriptionClient({
  planType, subStatus, billingCycle, trialEndsAt, currentPeriodEnd, cancelAtPeriodEnd, stripeCustomerId, pricing,
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
        <h1 className="text-2xl font-semibold text-slate-950">Subscription</h1>
        <p className="mt-2 text-slate-600">Manage your directory plan and billing.</p>

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

      {/* Toggle billing */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setBilling("monthly")}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${billing === "monthly" ? "bg-sky-950 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setBilling("yearly")}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${billing === "yearly" ? "bg-sky-950 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
        >
          Yearly <span className="ml-1 text-xs text-emerald-600 font-bold">Save ~20%</span>
        </button>
      </div>

      {/* Plan cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrent = planType === plan.key && isActive;
          const tierPricing = plan.key !== "basic" ? pricing[plan.tier] : null;
          const priceInfo = tierPricing ? (billing === "monthly" ? tierPricing.monthly : tierPricing.yearly) : null;
          const trial = tierPricing?.trial ?? 0;
          const priceLabel = plan.key === "basic"
            ? "Free"
            : priceInfo
            ? `$${(priceInfo.cents / 100).toLocaleString("en-AU")}/${billing === "monthly" ? "month" : "year"}`
            : "—";

          return (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-3xl border-2 p-7 shadow-sm ${plan.cardStyle ? "" : "bg-white"} ${plan.accent} ${isCurrent ? "ring-2 ring-sky-400" : ""}`}
              style={plan.cardStyle}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-bold text-white shadow-md" style={{ backgroundColor: "#0F2540" }}>
                  {plan.badge}
                </div>
              )}
              <p className={`text-xs font-bold uppercase tracking-[0.22em] ${plan.textClass || "text-slate-500"}`}>{plan.label}</p>
              <p className={`mt-3 text-3xl font-bold ${plan.textClass || "text-slate-950"}`}>{priceLabel}</p>
              {plan.key !== "basic" && trial > 0 && (
                <p className="mt-1 text-xs text-emerald-700 font-semibold">{trial}-day free trial</p>
              )}

              <ul className="mt-5 space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${plan.textClass || "text-slate-600"}`}>
                    <span className="mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                {isCurrent ? (
                  <div className="rounded-xl bg-sky-50 px-4 py-2.5 text-center text-sm font-bold text-sky-800">
                    Current plan
                  </div>
                ) : plan.key === "basic" ? (
                  <div className="rounded-xl bg-slate-100 px-4 py-2.5 text-center text-sm font-semibold text-slate-500">
                    Default
                  </div>
                ) : priceInfo ? (
                  <button
                    type="button"
                    disabled={loading !== null}
                    onClick={() => { setError(null); setPendingPlan(priceInfo.key); }}
                    className="w-full rounded-xl bg-sky-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
                  >
                    {loading === priceInfo.key ? "Redirecting…" : trial > 0 ? "Start free trial →" : "Upgrade →"}
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

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-500 space-y-1">
        <p>Monthly plans can be cancelled anytime. Access continues until the end of the paid period.</p>
        <p>Yearly plans renew annually. Access remains active until the end of the paid yearly term if cancelled.</p>
        <p>No automatic refunds. No lead guarantee. No endorsement.</p>
      </div>

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
