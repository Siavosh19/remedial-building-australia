import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Directory Pricing | Remedial Building Australia",
  description: "List your business on the Remedial Building Australia directory. Free Listing is always free, Silver receives quote requests, and Gold is featured in your State.",
};

// Prices come from the admin-managed `plans` table so changes in the admin
// Plans & Pricing screen flow straight through to this page.
export const dynamic = "force-dynamic";

const DISCLAIMER =
  "Businesses manage their own profiles. Licence and insurance information is self-declared unless otherwise stated. Clients should complete their own due diligence before engaging a contractor.";

const fmtDollars = (cents: number) => {
  const d = cents / 100;
  return Number.isInteger(d) ? `$${d.toLocaleString("en-AU")}` : `$${d.toFixed(2)}`;
};

type Slot = { cents: number; trial: number; compareAt?: number | null; promo?: string | null };
type TierPricing = { monthly?: Slot; yearly?: Slot };

export default async function PricingPage() {
  // Defaults mirror the founding offer so the page renders correctly even before
  // plans load from the DB.
  const fallback: Record<string, TierPricing> = {
    claimed:  { monthly: { cents: 2900, trial: 60, compareAt: 4900, promo: "Limited time" }, yearly: { cents: 29000, trial: 60, compareAt: 49000, promo: "Limited time" } },
    featured: { monthly: { cents: 4900, trial: 60, compareAt: 9900, promo: "Limited time" }, yearly: { cents: 49000, trial: 60, compareAt: 99000, promo: "Limited time" } },
  };
  let pricing = fallback;
  try {
    const plans = await prisma.plan.findMany({
      where: { product_line: "directory", is_active: true, is_public: true },
    });
    if (plans.length) {
      const map: Record<string, TierPricing> = {};
      for (const p of plans) {
        const slot = p.billing_interval === "year" ? "yearly" : p.billing_interval === "month" ? "monthly" : null;
        if (!slot) continue;
        (map[p.tier] ??= {})[slot] = { cents: p.amount_cents, trial: p.trial_days, compareAt: p.compare_at_cents, promo: p.promo_label };
      }
      if (map.claimed || map.featured) pricing = { ...fallback, ...map };
    }
  } catch { /* fall back to defaults */ }

  const claimed = pricing.claimed ?? fallback.claimed;
  const featured = pricing.featured ?? fallback.featured;
  const savings = (t: TierPricing) =>
    t.monthly && t.yearly ? Math.round((1 - t.yearly.cents / (t.monthly.cents * 12)) * 100) : 0;
  const claimedTrial = claimed.monthly?.trial ?? claimed.yearly?.trial ?? 0;
  const featuredTrial = featured.monthly?.trial ?? featured.yearly?.trial ?? 0;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Header */}
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-6 py-16">

        {/* Hero */}
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700 mb-3">Directory Plans</p>
          <h1 className="text-4xl font-extrabold text-sky-950 md:text-5xl">List your business</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-slate-600">
            Get your business in front of strata managers, owners corporations, building managers and consultants across
            Australia. Free Listing is always free — build a full profile. Upgrade to Silver to receive quote requests,
            or Gold to be featured in your State. No lock-in contracts.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* Basic */}
          <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-8 shadow-sm flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Free Listing</p>
            <p className="mt-4 text-4xl font-extrabold text-slate-950">Free</p>
            <p className="mt-1 text-sm text-slate-400">Always free</p>
            <ul className="mt-6 space-y-3 flex-1">
              {[
                "Public business profile in directory search",
                "Company logo upload",
                "Up to 5 project photos",
                "Business description",
                "Phone, email and website",
                "Business categories & service areas",
                "Licence details (self-declared)",
                "Insurance details (self-declared)",
                "View Profile button",
                "Does not receive quote requests",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 text-slate-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/directory/signup"
              className="mt-8 block rounded-2xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Create free listing
            </a>
          </div>

          {/* Claimed */}
          <div className="relative rounded-3xl border-2 p-8 shadow-md flex flex-col" style={{ background: "linear-gradient(135deg, #A8ADB4 0%, #F5F7F9 28%, #C7CCD2 50%, #FAFBFC 72%, #9197A0 100%)", borderColor: "#8A9099", borderWidth: "2.5px", boxShadow: "0 12px 36px rgba(120,128,138,0.4)" }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white" style={{ backgroundColor: "#0F2540" }}>
              Popular
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-900">Silver</p>
            <div className="mt-4 flex flex-col gap-1">
              {claimed.monthly?.compareAt ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-slate-500 line-through">{fmtDollars(claimed.monthly.compareAt)}</span>
                  <span className="text-4xl font-extrabold text-slate-950">{fmtDollars(claimed.monthly.cents)}<span className="text-lg font-semibold">/month</span></span>
                </div>
              ) : (
                <p className="text-4xl font-extrabold text-slate-950">{fmtDollars(claimed.monthly?.cents ?? 0)}<span className="text-lg font-semibold">/month</span></p>
              )}
              {claimed.monthly?.promo && (
                <span className="self-start rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">{claimed.monthly.promo}</span>
              )}
              {claimed.yearly && (
                <p className="text-sm text-slate-800">or {claimed.yearly.compareAt ? <span className="text-slate-500 line-through">{fmtDollars(claimed.yearly.compareAt)}</span> : null} {fmtDollars(claimed.yearly.cents)}/year {savings(claimed) > 0 && <span className="font-semibold text-slate-900">Save ~{savings(claimed)}%</span>}</p>
              )}
            </div>
            {claimedTrial > 0 && <p className="mt-2 text-sm font-semibold text-slate-900">{claimedTrial}-day free trial</p>}
            <ul className="mt-6 space-y-3 flex-1">
              {[
                ...(claimedTrial > 0 ? [`${claimedTrial}-day free trial — no charge until trial ends`] : []),
                "Everything in Free",
                "Receive quote requests",
                "Request Quote button on your listing",
                "Rank above Free listings",
                "Up to 15 project photos",
                "Project portfolio section",
                "Profile dashboard access",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-medium text-slate-900">
                  <span className="mt-0.5 text-slate-900">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/directory/signup"
              className="mt-8 block rounded-2xl py-3 text-center text-sm font-bold text-white transition hover:brightness-110"
              style={{ backgroundColor: "#0F2540" }}
            >
              Get Silver →
            </a>
          </div>

          {/* Featured */}
          <div className="relative rounded-3xl border-2 p-8 shadow-sm flex flex-col" style={{ background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 28%, #D4AF37 50%, #FBF5B7 72%, #AA771C 100%)", borderColor: "#AA771C", borderWidth: "2.5px", boxShadow: "0 12px 36px rgba(170,119,28,0.45)" }}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-bold text-white shadow-md" style={{ backgroundColor: "#0F2540" }}>★ Recommended</div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-black">Gold</p>
            <div className="mt-4 flex flex-col gap-1">
              {featured.monthly?.compareAt ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-slate-600 line-through">{fmtDollars(featured.monthly.compareAt)}</span>
                  <span className="text-4xl font-extrabold text-black">{fmtDollars(featured.monthly.cents)}<span className="text-lg font-semibold">/month</span></span>
                </div>
              ) : (
                <p className="text-4xl font-extrabold text-black">{fmtDollars(featured.monthly?.cents ?? 0)}<span className="text-lg font-semibold">/month</span></p>
              )}
              {featured.monthly?.promo && (
                <span className="self-start rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">{featured.monthly.promo}</span>
              )}
              {featured.yearly && (
                <p className="text-sm text-slate-700">or {featured.yearly.compareAt ? <span className="text-slate-600 line-through">{fmtDollars(featured.yearly.compareAt)}</span> : null} {fmtDollars(featured.yearly.cents)}/year {savings(featured) > 0 && <span className="font-semibold" style={{ color: "#A67C2B" }}>Save ~{savings(featured)}%</span>}</p>
              )}
            </div>
            {featuredTrial > 0 && <p className="mt-2 text-sm font-semibold text-emerald-700">{featuredTrial}-day free trial</p>}
            <ul className="mt-6 space-y-3 flex-1">
              {[
                ...(featuredTrial > 0 ? [`${featuredTrial}-day free trial — no charge until trial ends`] : []),
                "Everything in Silver",
                "Featured listing placement",
                "Displayed above Silver & Free listings",
                "Highlighted listing card + Gold Featured badge",
                "Only 3 Featured businesses per category in your State",
                "Be Featured in Your State",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm font-medium text-black">
                  <span className="mt-0.5 text-black">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/directory/signup"
              className="mt-8 block rounded-2xl py-3 text-center text-sm font-bold text-white transition hover:brightness-110"
              style={{ backgroundColor: "#0F2540" }}
            >
              Get Gold →
            </a>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-8 py-6 space-y-2 text-sm text-slate-500">
          <p>Monthly plans can be cancelled anytime. Access continues until the end of the paid billing period.</p>
          <p>Yearly plans renew annually unless cancelled before the renewal date. Access remains active until the end of the paid yearly term.</p>
          <p>No automatic refunds. No lead delivery guarantee. No results guarantee.</p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-900">
          <p className="font-semibold mb-1">Directory disclaimer</p>
          <p>{DISCLAIMER}</p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/directory" className="text-sm font-semibold text-sky-700 hover:text-sky-900">
            ← Browse the directory
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-sky-200 bg-white">
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
