import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { listSchemesForUser, listPendingInvites } from "@/lib/strata/access";
import { labelsFor } from "@/lib/strata/jurisdictions";

export const dynamic = "force-dynamic";

export default async function StrataSchemesPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/client/strata");

  const [schemes, invites] = await Promise.all([
    listSchemesForUser(user.id),
    listPendingInvites(user.email),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Strata management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Run your own scheme — the roll, the levies, the defects — and get quotes from verified trades when
            work is needed. Free for every scheme.
          </p>
        </div>
        <Link
          href="/client/strata/new"
          className="rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          Add a scheme
        </Link>
      </div>

      {invites.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
          <h2 className="text-sm font-bold text-amber-900">Invitations waiting for you</h2>
          <ul className="mt-3 space-y-2">
            {invites.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <span className="text-amber-900">
                  <strong>{i.scheme.name}</strong>
                  {i.scheme.plan_number ? ` · ${i.scheme.plan_number}` : ""} — invited as {i.role}
                </span>
                {i.invite_token && (
                  <Link
                    href={`/client/strata/invite/${i.invite_token}`}
                    className="rounded-lg bg-amber-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-800"
                  >
                    Review invitation
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {schemes.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">No schemes yet.</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-400">
            Works for any Australian scheme — your committee sets its own rules, and the wording follows the
            state you choose.
          </p>
          <Link
            href="/client/strata/new"
            className="mt-4 inline-block rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Set up your first scheme
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {schemes.map((s) => {
            const labels = labelsFor(s.state);
            return (
              <li key={s.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-slate-900">{s.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {s.plan_number ? `${s.plan_number} · ` : ""}
                      {s.state} · {labels.body} · {s._count.lots} lots · {s._count.members} members
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/client/strata/${s.id}/lots`}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Roll
                    </Link>
                    <Link
                      href={`/client/strata/${s.id}`}
                      className="rounded-lg bg-sky-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-800"
                    >
                      Open
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
