import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { createAuditLog } from "@/lib/audit";
import { labelsFor, STATE_OPTIONS } from "@/lib/strata/jurisdictions";
import type { LocationState, PropertyType } from "@prisma/client";

const PROPERTY_TYPES = [
  "residential_strata",
  "commercial_strata",
  "mixed_use",
  "residential_house",
  "commercial_building",
  "other",
] as const;

export async function POST(req: Request) {
  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const name = String(body.name ?? "").trim();
  const state = String(body.state ?? "").trim() as LocationState;
  if (!name) return NextResponse.json({ error: "Give the scheme a name." }, { status: 400 });
  if (!STATE_OPTIONS.includes(state)) {
    return NextResponse.json({ error: "Choose the state or territory the scheme is in." }, { status: 400 });
  }

  const propertyType = PROPERTY_TYPES.includes(body.property_type)
    ? (body.property_type as PropertyType)
    : ("residential_strata" as PropertyType);

  const labels = labelsFor(state);

  const scheme = await prisma.$transaction(async (tx) => {
    const created = await tx.strataScheme.create({
      data: {
        owner_user_id: user.id,
        name,
        state,
        plan_number: String(body.plan_number ?? "").trim() || null,
        address: String(body.address ?? "").trim() || null,
        suburb: String(body.suburb ?? "").trim() || null,
        postcode: String(body.postcode ?? "").trim() || null,
        property_type: propertyType,
        // Seeded from the jurisdiction pack, renameable at any time. Nothing in
        // the code depends on what these are called.
        fund_1_name: labels.fund1,
        fund_2_name: labels.fund2,
      },
    });

    // The creator is an active member from the outset — no invitation to accept.
    await tx.strataMember.create({
      data: {
        scheme_id: created.id,
        user_id: user.id,
        email: user.email.toLowerCase(),
        full_name: user.full_name,
        role: "chair",
        status: "active",
        accepted_at: new Date(),
      },
    });

    return created;
  });

  await createAuditLog({
    actorId: user.id,
    actorEmail: user.email,
    actorRole: user.role,
    entityType: "strata_scheme",
    entityId: String(scheme.id),
    action: "create",
    newValue: { name: scheme.name, state: scheme.state },
  });

  return NextResponse.json({ ok: true, id: scheme.id });
}
