import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import SchemeTabs from "../../SchemeTabs";
import LotsClient from "./LotsClient";
import StrataHelp from "../../StrataHelp";

export const dynamic = "force-dynamic";

export default async function StrataRollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, labels, canManage } = access;

  const lots = await prisma.strataLot.findMany({
    where: { scheme_id: scheme.id },
    orderBy: { id: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Strata roll</h1>
        <p className="mt-1 text-sm text-slate-500">
          Every lot, who owns it, where notices are served, and the figure contributions are apportioned on.
          {labels.separateBases
            ? ` In ${scheme.state}, ${labels.levyBasis.toLowerCase()} and ${labels.ownershipBasis.toLowerCase()} are two different numbers — both are recorded.`
            : ""}
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <StrataHelp topic="roll" />

      <LotsClient
        schemeId={scheme.id}
        canManage={canManage}
        labels={{
          levyBasis: labels.levyBasis,
          ownershipBasis: labels.ownershipBasis,
          separateBases: labels.separateBases,
        }}
        lots={lots.map((l) => ({
          id: l.id,
          lot_number: l.lot_number,
          description: l.description,
          owner_name: l.owner_name,
          owner_email: l.owner_email,
          owner_phone: l.owner_phone,
          occupancy: l.occupancy,
          levy_basis: l.levy_basis,
          ownership_basis: l.ownership_basis,
          service_address: l.service_address,
          mortgagee: l.mortgagee,
          tenancy_notice: l.tenancy_notice,
          managing_agent: l.managing_agent,
          emergency_contact: l.emergency_contact,
          payment_reference: l.payment_reference,
          notices_by_email: l.notices_by_email,
          notes: l.notes,
        }))}
      />
    </div>
  );
}
