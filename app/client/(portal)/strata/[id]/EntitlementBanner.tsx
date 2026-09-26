import Link from "next/link";
import { formatAud, type Entitlement } from "@/lib/strata/entitlement";

/**
 * Says where the account stands, and only when that is worth saying. A scheme
 * comfortably inside the free allowance sees nothing.
 */
export default function EntitlementBanner({ entitlement }: { entitlement: Entitlement }) {
  const { state, reason, trialDaysLeft, monthlyCents, billableLots } = entitlement;

  if (state === "free") return null;
  if (state === "active") return null;
  // A long trial does not need a banner every day — start reminding at 45 days.
  if (state === "trialling" && (trialDaysLeft ?? 999) > 45) return null;

  const tone =
    state === "locked"
      ? "border-red-200 bg-red-50 text-red-900"
      : state === "grace"
        ? "border-amber-200 bg-amber-50 text-amber-900"
        : "border-sky-200 bg-sky-50 text-sky-950";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${tone}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold">{reason}</p>
          {billableLots > 0 && (
            <p className="mt-0.5 text-xs opacity-80">
              {billableLots} lots · {formatAud(monthlyCents)} a month, or {formatAud(entitlement.yearlyCents)} a
              year.
            </p>
          )}
        </div>
        <Link
          href="/client/strata/subscription"
          className="shrink-0 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
        >
          {state === "locked" ? "Subscribe" : "See the plan"}
        </Link>
      </div>
    </div>
  );
}
