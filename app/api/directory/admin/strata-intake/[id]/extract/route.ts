import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { extractIntake } from "@/lib/strata-connect";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Params = { params: Promise<{ id: string }> };

// Manually (re-)run Stage 2 AI extraction on an intake from the admin screen.
export async function POST(request: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const intakeId = Number(id);
  if (!Number.isInteger(intakeId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  await extractIntake(intakeId);

  const intake = await prisma.strataIntake.findUnique({
    where: { id: intakeId },
    select: { status: true, extraction_error: true },
  });
  return NextResponse.json({ success: true, status: intake?.status, error: intake?.extraction_error ?? null });
}
