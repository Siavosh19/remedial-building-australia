import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import SchemeTabs from "../../SchemeTabs";
import MembersClient from "./MembersClient";

export const dynamic = "force-dynamic";

export default async function SchemeMembersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, labels, canManage } = access;

  const [members, lots] = await Promise.all([
    prisma.strataMember.findMany({
      where: { scheme_id: scheme.id },
      orderBy: [{ status: "asc" }, { id: "asc" }],
      include: { lot: { select: { lot_number: true } } },
    }),
    prisma.strataLot.findMany({
      where: { scheme_id: scheme.id },
      orderBy: { id: "asc" },
      select: { id: true, lot_number: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/strata/${scheme.id}`} className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← {scheme.name}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">People</h1>
        <p className="mt-1 text-sm text-slate-500">
          Who can see and change this scheme. Owners get read-only access; the {labels.committee.toLowerCase()} can
          make changes.
        </p>
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <MembersClient
        schemeId={scheme.id}
        canManage={canManage}
        committeeLabel={labels.committee}
        lots={lots}
        members={members.map((m) => ({
          id: m.id,
          email: m.email,
          full_name: m.full_name,
          role: m.role,
          status: m.status,
          lot_number: m.lot?.lot_number ?? null,
          accepted_at: m.accepted_at ? m.accepted_at.toISOString() : null,
        }))}
      />
    </div>
  );
}
