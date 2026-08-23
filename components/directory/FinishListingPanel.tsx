"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";

// Shown on the dashboard when a signup chose Silver/Gold but never completed
// Stripe checkout. The listing row exists (nothing they typed is lost) but sits
// as a draft, invisible in directory search, until the plan is settled — this
// panel is the only way back into that decision.
type PaidPlan = "silver" | "gold";

const PLAN_LABEL: Record<PaidPlan, string> = { silver: "Silver", gold: "Gold" };
const SUBSCRIBE_KEY: Record<PaidPlan, string> = {
  silver: "claimed-monthly",
  gold: "featured-monthly",
};
// Coming back out of Stripe must land here, on this panel — never the public
// pricing page, which is where an abandoned checkout used to strand people.
const CANCEL_PATH = "/directory/dashboard?checkout=cancelled";

export default function FinishListingPanel({
  pendingPlan,
  isDraft,
  companyName,
}: {
  pendingPlan: PaidPlan;
  isDraft: boolean;
  companyName: string;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function goToCheckout(plan: PaidPlan) {
    setError(null);
    setBusy(plan);
    try {
      const res = await fetch("/api/directory/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: SUBSCRIBE_KEY[plan], cancelPath: CANCEL_PATH }),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      if (res.ok && (result.success || result.mode)) {
        window.location.href = "/directory/dashboard/subscription";
        return;
      }
      setError(result.error ?? "We couldn't start checkout. Please try again.");
    } catch {
      setError("We couldn't reach checkout. Please try again.");
    }
    setBusy(null);
  }

  async function publishFree() {
    setError(null);
    setBusy("free");
    try {
      const res = await fetch("/api/directory/company/finish-signup", { method: "POST" });
      const result = await res.json().catch(() => ({}));
      if (res.ok) {
        window.location.reload();
        return;
      }
      setError(result.error ?? "We couldn't publish your listing. Please try again.");
    } catch {
      setError("We couldn't publish your listing. Please try again.");
    }
    setBusy(null);
  }

  const other: PaidPlan = pendingPlan === "gold" ? "silver" : "gold";
  const disabled = busy !== null;

  return (
    <div className="overflow-hidden rounded-xl border border-amber-300 bg-amber-50 shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
          <div className="min-w-0">
            <p className="text-base font-extrabold text-amber-900">Finish setting up your listing</p>
            <p className="mt-1 text-sm leading-6 text-amber-900/80">
              Everything you entered for <span className="font-semibold">{companyName}</span> is saved.
              You chose {PLAN_LABEL[pendingPlan]} but didn&apos;t complete checkout, so no payment was
              taken{isDraft ? " and your listing isn't showing in the directory yet" : ""}. Pick up where
              you left off, or publish free — you can upgrade any time.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => goToCheckout(pendingPlan)}
            disabled={disabled}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {busy === pendingPlan ? <Loader2 size={16} className="animate-spin" /> : null}
            Continue with {PLAN_LABEL[pendingPlan]}
            {busy === pendingPlan ? null : <ArrowRight size={16} />}
          </button>
          <button
            type="button"
            onClick={() => goToCheckout(other)}
            disabled={disabled}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400 bg-white px-4 py-2.5 text-sm font-semibold text-amber-900 transition hover:bg-amber-100 disabled:opacity-60"
          >
            {busy === other ? <Loader2 size={16} className="animate-spin" /> : null}
            Switch to {PLAN_LABEL[other]}
          </button>
          <button
            type="button"
            onClick={publishFree}
            disabled={disabled}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            {busy === "free" ? <Loader2 size={16} className="animate-spin" /> : null}
            {isDraft ? "Publish as a Free listing" : "Stay on the Free listing"}
          </button>
        </div>

        <p className="text-xs text-amber-900/70">
          Need to change your business details first?{" "}
          <a href="/directory/dashboard/profile" className="font-semibold underline">
            Edit your profile
          </a>
          .
        </p>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
