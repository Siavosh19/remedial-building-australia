import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { interestOn, money, round2 } from "@/lib/strata/levies";
import PrintButton from "./PrintButton";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "long", year: "numeric" });

export default async function NoticesPage({ params }: { params: Promise<{ id: string; periodId: string }> }) {
  const { id, periodId } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, labels } = access;

  const period = await prisma.strataLevyPeriod.findFirst({
    where: { id: Number(periodId), scheme_id: scheme.id },
    include: {
      levies: {
        include: { lot: true, payments: { select: { amount: true } } },
        orderBy: { lot_id: "asc" },
      },
    },
  });
  if (!period) notFound();

  // Anything still owing from an earlier period, carried onto this notice.
  const earlier = await prisma.strataLevy.findMany({
    where: { scheme_id: scheme.id, period: { due_date: { lt: period.due_date } } },
    include: { payments: { select: { amount: true } }, period: { select: { due_date: true } } },
  });

  const broughtForward = new Map<number, number>();
  const priorInterest = new Map<number, number>();
  for (const l of earlier) {
    const owing = round2(l.fund_1_amount + l.fund_2_amount - l.payments.reduce((s, x) => s + x.amount, 0));
    if (owing <= 0.005) continue;
    broughtForward.set(l.lot_id, round2((broughtForward.get(l.lot_id) ?? 0) + owing));
    priorInterest.set(
      l.lot_id,
      round2(
        (priorInterest.get(l.lot_id) ?? 0) +
          interestOn({
            outstanding: owing,
            dueDate: l.period.due_date,
            graceDays: scheme.arrears_grace_days,
            annualRatePercent: scheme.arrears_interest_rate,
          }),
      ),
    );
  }

  const noticeDate = AU_DATE.format(new Date());
  const dueDate = AU_DATE.format(period.due_date);

  return (
    <div className="space-y-5">
      <div className="print:hidden">
        <Link
          href={`/client/strata/${scheme.id}/levies?period=${period.id}`}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700"
        >
          ← Levies
        </Link>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Notices · {period.label} {period.year_label}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              One notice per lot. Print them, or save as PDF and send them from the scheme&apos;s own email
              address — these go out from the {labels.committee.toLowerCase()}, not from this website.
            </p>
          </div>
          <PrintButton />
        </div>
      </div>

      <div className="space-y-5 print:space-y-0">
        {period.levies.map((levy) => {
          const thisPeriod = round2(levy.fund_1_amount + levy.fund_2_amount);
          const arrears = broughtForward.get(levy.lot_id) ?? 0;
          const interest = priorInterest.get(levy.lot_id) ?? 0;
          const total = round2(thisPeriod + arrears + interest);

          return (
            <article
              key={levy.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:break-after-page print:rounded-none print:border-0 print:shadow-none"
            >
              <header className="border-b-2 border-slate-900 pb-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Notice of contribution
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-900">{scheme.name}</h2>
                <p className="text-sm text-slate-600">
                  {scheme.plan_number ? `${scheme.plan_number} · ` : ""}
                  {[scheme.address, scheme.suburb, scheme.state, scheme.postcode].filter(Boolean).join(" ")}
                </p>
              </header>

              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">To</p>
                  <p className="mt-1 font-semibold text-slate-900">{levy.lot.owner_name ?? "The owner"}</p>
                  <p className="text-slate-600">
                    Lot {levy.lot.lot_number}
                    {levy.lot.description ? ` — ${levy.lot.description}` : ""}
                  </p>
                  {levy.lot.service_address && <p className="text-slate-600">{levy.lot.service_address}</p>}
                </div>
                <div className="sm:text-right">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Notice date</p>
                  <p className="mt-1 text-slate-900">{noticeDate}</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">Due</p>
                  <p className="text-slate-900">{dueDate}</p>
                </div>
              </div>

              <table className="mt-5 w-full text-sm">
                <tbody>
                  <tr className="border-t border-slate-200">
                    <td className="py-2 text-slate-700">{scheme.fund_1_name}</td>
                    <td className="py-2 text-right tabular-nums text-slate-900">{money(levy.fund_1_amount)}</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="py-2 text-slate-700">{scheme.fund_2_name}</td>
                    <td className="py-2 text-right tabular-nums text-slate-900">{money(levy.fund_2_amount)}</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="py-2 font-semibold text-slate-900">
                      {labels.levy} for this period
                    </td>
                    <td className="py-2 text-right font-semibold tabular-nums text-slate-900">{money(thisPeriod)}</td>
                  </tr>
                  {arrears > 0.005 && (
                    <tr className="border-t border-slate-200">
                      <td className="py-2 text-slate-700">Arrears brought forward</td>
                      <td className="py-2 text-right tabular-nums text-slate-900">{money(arrears)}</td>
                    </tr>
                  )}
                  {interest > 0.005 && (
                    <tr className="border-t border-slate-200">
                      <td className="py-2 text-slate-700">Interest on overdue contributions</td>
                      <td className="py-2 text-right tabular-nums text-slate-900">{money(interest)}</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-slate-900">
                    <td className="py-2.5 text-base font-extrabold text-slate-900">Total now payable</td>
                    <td className="py-2.5 text-right text-base font-extrabold tabular-nums text-slate-900">
                      {money(total)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">How to pay</p>
                <p className="mt-1 text-sm text-slate-700">
                  Payment reference —{" "}
                  <span className="font-mono text-base font-bold text-slate-900">
                    {levy.lot.payment_reference ?? "—"}
                  </span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Please quote this reference so your payment is matched to your lot.
                </p>
              </div>

              {scheme.arrears_interest_rate ? (
                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  This {labels.body.toLowerCase()} charges interest at {scheme.arrears_interest_rate}% per year on
                  contributions still unpaid
                  {scheme.arrears_grace_days ? ` more than ${scheme.arrears_grace_days} days` : ""} after the due
                  date.
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
