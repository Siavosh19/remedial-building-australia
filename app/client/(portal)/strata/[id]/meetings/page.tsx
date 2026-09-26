import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { REGISTERS } from "@/lib/strata/registers";
import { loadRefOptions, loadRegister } from "@/lib/strata/register-data";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import RegisterClient from "../RegisterClient";

export const dynamic = "force-dynamic";

const AU_DATE = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

export default async function MeetingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, labels, canManage } = access;
  const now = new Date();

  const [meetings, motions, refOptions, overdue] = await Promise.all([
    loadRegister(scheme.id, "meetings"),
    loadRegister(scheme.id, "motions"),
    loadRefOptions(scheme.id),
    prisma.strataMotion.findMany({
      where: { scheme_id: scheme.id, done: false, due_on: { lt: now } },
      orderBy: { due_on: "asc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Meetings</h1>
        <p className="mt-1 text-sm text-slate-500">
          What the {labels.body.toLowerCase()} decided, and what is still outstanding from it.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="meetings" />

      {overdue.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
          <h2 className="text-sm font-bold text-amber-900">
            {overdue.length} action{overdue.length === 1 ? "" : "s"} past due
          </h2>
          <ul className="mt-2 space-y-1">
            {overdue.map((m) => (
              <li key={m.id} className="text-sm text-amber-900">
                {m.action || m.motion}
                {m.responsible ? ` — ${m.responsible}` : ""}
                {m.due_on ? ` · due ${AU_DATE.format(m.due_on)}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      <RegisterClient
        schemeId={scheme.id}
        kind="meetings"
        singular={REGISTERS.meetings.singular}
        plural={REGISTERS.meetings.plural}
        blurb={REGISTERS.meetings.blurb}
        fields={REGISTERS.meetings.fields}
        rows={meetings}
        refOptions={refOptions}
        canManage={canManage}
      />

      <RegisterClient
        schemeId={scheme.id}
        kind="motions"
        singular={REGISTERS.motions.singular}
        plural={REGISTERS.motions.plural}
        blurb={REGISTERS.motions.blurb}
        fields={REGISTERS.motions.fields}
        rows={motions}
        refOptions={refOptions}
        canManage={canManage}
      />
    </div>
  );
}
