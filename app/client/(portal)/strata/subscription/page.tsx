import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { entitlementForOwner, formatAud } from "@/lib/strata/entitlement";
import SubscriptionClient from "./SubscriptionClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "long", year: "numeric" });

const STATE_LABEL: Record<string, string> = {
  free: "Free",
  trialling: "Free trial",
  active: "Subscribed",
  grace: "Action needed",
  locked: "Read-only",
};

export default async function SubscriptionPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/client/strata/subscription");

  const [entitlement, subscription, schemes] = await Promise.all([
    entitlementForOwner(user.id),
    prisma.strataSubscription.findUnique({ where: { user_id: user.id } }),
    prisma.strataScheme.findMany({
      where: { owner_user_id: user.id },
      select: { id: true, name: true, _count: { select: { lots: true } } },
      orderBy: { id: "asc" },
    }),
  ]);

  const s = entitlement.settings;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/client/strata" className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← Strata management
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Your plan</h1>
        <p className="mt-1 text-sm text-slate-500">
          One strata plan with {s.freeLotLimit} lots or fewer is free, always. Everything beyond that is{" "}
          {formatAud(s.centsPerLotMonthly)} per lot per month.
        </p>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {STATE_LABEL[entitlement.state] ?? entitlement.state}
            </p>
            <p className="mt-1 text-sm text-slate-600">{entitlement.reason}</p>
          </div>
          {entitlement.billableLots > 0 && (
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Your price</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">
                {formatAud(entitlement.monthlyCents)}
                <span className="text-sm font-semibold text-slate-400">/month</span>
              </p>
              <p className="text-xs text-slate-500">or {formatAud(entitlement.yearlyCents)} a year</p>
            </div>
          )}
        </div>

        <dl className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Strata plans</dt>
            <dd className="mt-0.5 font-semibold text-slate-900">{entitlement.schemes}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lots</dt>
            <dd className="mt-0.5 font-semibold text-slate-900">{entitlement.lots}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Charged for</dt>
            <dd className="mt-0.5 font-semibold text-slate-900">
              {entitlement.billableLots === 0 ? "Nothing" : `${entitlement.billableLots} lots`}
            </dd>
          </div>
        </dl>

        {entitlement.trialEndsAt && entitlement.state === "trialling" && (
          <p className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-900">
            Your free trial runs to {AU_DATE.format(entitlement.trialEndsAt)} — no card needed until then.
          </p>
        )}
        {entitlement.currentPeriodEnd && entitlement.state === "active" && (
          <p className="mt-4 text-xs text-slate-500">
            {subscription?.cancel_at_period_end ? "Ends" : "Renews"}{" "}
            {AU_DATE.format(entitlement.currentPeriodEnd)}
            {entitlement.interval ? ` · billed ${entitlement.interval}` : ""}
          </p>
        )}
      </section>

      <SubscriptionClient
        canSubscribe={entitlement.billableLots > 0 && entitlement.state !== "active"}
        hasSubscription={Boolean(subscription?.stripe_customer_id)}
        monthly={`${formatAud(entitlement.monthlyCents)} / month`}
        yearly={`${formatAud(entitlement.yearlyCents)} / year`}
      />

      {schemes.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">What you are managing</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {schemes.map((scheme) => (
              <li key={scheme.id} className="flex items-center justify-between py-2.5 text-sm">
                <Link href={`/client/strata/${scheme.id}`} className="font-medium text-slate-800 hover:underline">
                  {scheme.name}
                </Link>
                <span className="text-slate-500">{scheme._count.lots} lots</span>
              </li>
            ))}
          </ul>
          {entitlement.withinFreeAllowance && (
            <p className="mt-3 text-xs text-slate-500">
              Inside the free allowance. Adding a second strata plan, or a {s.freeLotLimit + 1}th lot, makes the
              account payable.
            </p>
          )}
        </section>
      )}

      <p className="text-xs leading-relaxed text-slate-400">
        Prices are in Australian dollars. Your records are never deleted because of payment — an unpaid account
        becomes read-only and can still be read and exported.
      </p>
    </div>
  );
}
