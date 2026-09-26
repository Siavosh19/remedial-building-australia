import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { TERMS_VERSION } from "@/lib/strata/terms";
import { createAuditLog } from "@/lib/audit";

/**
 * Record acceptance of the current terms. Version, time, address and browser
 * are kept so the acceptance can be evidenced later — that is the whole point
 * of asking.
 */
export async function POST(req: Request) {
  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || null;

  await prisma.strataTermsAcceptance.upsert({
    where: { user_id_version: { user_id: user.id, version: TERMS_VERSION } },
    create: {
      user_id: user.id,
      version: TERMS_VERSION,
      ip,
      user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
    },
    update: {},
  });

  await createAuditLog({
    actorId: user.id,
    actorEmail: user.email,
    entityType: "strata_terms",
    entityId: TERMS_VERSION,
    action: "accept",
    newValue: { version: TERMS_VERSION, ip },
  });

  return NextResponse.json({ ok: true });
}
