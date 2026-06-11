"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  planType: string;
  subStatus: string;
  billingCycle: string;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string | null;
};

const PLANS = [
  {
    key: "basic",
    label: "Basic Listing",
    price: "Free",
    features: ["Public directory listing", "Business name, category, location", "Phone, email and website"],
    cta: null,
    accent: "border-slate-200",
  },
  {
    key: "claimed",
    label: "Claimed Profile",
    monthly: { key: "claimed-monthly", price: "$29/month" },
    yearly: { key: "claimed-yearly", price: "$270/year" },
    features: [
      "60-day free trial",
      "Claim and manage your profile",
      "Logo upload",
      "Business description",
      "Up to 5 project photos",
      "Licence and insurance details",
      "Quote request button",
      "Profile dashboard",
    ],
    accent: "border-sky-300",
  },
  {
    key: "featured",
    label: "Featured Profile",
    monthly: { key: "featured-monthly", price: "$79/month" },
    yearly: { key: "featured-yearly", price: "$750/year" },
    features: [
      "60-day free trial",
      "Everything in Claimed Profile",
      "Featured badge",
      "Shown first in directory results",
      "Up to 10 project photos",
      "Higher visibility in search results",
    ],
    accent: "border-red-400",
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
  planType, subStatus, billingCycle, trialEndsAt, currentPeriodEnd, cancelAtPeriodEnd, stripeCustomerId,
}: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  async function subscribe(planKey: string) {
    setLoading(planKey);
    setError(null);
    const res = await fetch("/api/directory/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planKey }),
    });
    const data = await res.json();
    setLoading(null);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else if (data.mode === "manual_trial") {
      window.location.href = "/directory/dashboard/subscription?checkout=success";
    }
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
              {planType === "basic" ? "Basic Listing" : planType === "claimed" ? "Claimed Profile" : "Featured Profile"}
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
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-800">{error}</div>
      )}

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
          const priceInfo = plan.key !== "basic"
            ? (billing === "monthly" ? plan.monthly : plan.yearly)
            : null;

          return (
            <div
              key={plan.key}
              className={`rounded-3xl border-2 bg-white p-7 shadow-sm ${plan.accent} ${isCurrent ? "ring-2 ring-sky-400" : ""}`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{plan.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-950">
                {priceInfo ? priceInfo.price : "Free"}
              </p>
              {plan.key !== "basic" && (
                <p className="mt-1 text-xs text-emerald-700 font-semibold">60-day free trial</p>
              )}

              <ul className="mt-5 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 text-sky-600">✓</span> {f}
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
                    onClick={() => subscribe(priceInfo.key)}
                    className="w-full rounded-xl bg-sky-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:opacity-60"
                  >
                    {loading === priceInfo.key ? "Redirecting…" : `Start free trial →`}
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-500 space-y-1">
        <p>Monthly plans can be cancelled anytime. Access continues until the end of the paid period.</p>
        <p>Yearly plans renew annually. Access remains active until the end of the paid yearly term if cancelled.</p>
        <p>No automatic refunds. No lead guarantee. No endorsement.</p>
      </div>
    </div>
  );
}
