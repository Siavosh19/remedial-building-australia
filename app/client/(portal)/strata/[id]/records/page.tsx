import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSchemeAccess } from "@/lib/strata/access";
import { REGISTERS, isRegisterKind, type RegisterKind } from "@/lib/strata/registers";
import { loadRefOptions, loadRegister } from "@/lib/strata/register-data";
import SchemeTabs from "../../SchemeTabs";
import StrataHelp from "../../StrataHelp";
import RegisterClient from "../RegisterClient";

export const dynamic = "force-dynamic";

const SECTIONS: RegisterKind[] = ["correspondence", "bylaws", "breaches", "applications", "claims", "keys"];

export default async function RecordsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ section?: string }>;
}) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;

  const requested = (await searchParams).section ?? "";
  const section: RegisterKind =
    isRegisterKind(requested) && SECTIONS.includes(requested) ? requested : "correspondence";

  const [rows, refOptions] = await Promise.all([loadRegister(scheme.id, section), loadRefOptions(scheme.id)]);
  const def = REGISTERS[section];

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Records</h1>
        <p className="mt-1 text-sm text-slate-500">
          The registers a committee is asked for when something goes wrong.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="records" />

      <nav className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
        {SECTIONS.map((s) => (
          <Link
            key={s}
            href={`/client/strata/${scheme.id}/records?section=${s}`}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              s === section ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {REGISTERS[s].plural}
          </Link>
        ))}
      </nav>

      <RegisterClient
        schemeId={scheme.id}
        kind={section}
        singular={def.singular}
        plural={def.plural}
        blurb={def.blurb}
        fields={def.fields}
        rows={rows}
        refOptions={refOptions}
        canManage={canManage}
      />
    </div>
  );
}
