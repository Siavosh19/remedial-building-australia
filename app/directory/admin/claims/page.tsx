import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";
import ClaimsAdminClient from "./ClaimsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminClaimsPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const claims = await prisma.claimRequest.findMany({
    orderBy: { created_at: "desc" },
    take: 300,
    include: {
      company: {
        select: { id: true, name: true, slug: true, status: true, plan_type: true, listing_claim_status: true },
      },
    },
  });

  const serialised = claims.map((c) => ({
    ...c,
    created_at: c.created_at.toISOString(),
    updated_at: c.updated_at.toISOString(),
    reviewed_at: c.reviewed_at?.toISOString() ?? null,
  }));

  return <ClaimsAdminClient claims={serialised} />;
}
