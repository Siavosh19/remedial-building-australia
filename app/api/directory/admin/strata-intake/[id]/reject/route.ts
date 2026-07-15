import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// An admin rejects an intake (spam, out of scope, duplicate). Nothing is sent to
// any business. Records who/when and an optional note.
export async function POST(request: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const intakeId = Number(id);
  if (!Number.isInteger(intakeId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const intake = await prisma.strataIntake.findUnique({ where: { id: intakeId }, select: { id: true, status: true } });
  if (!intake) return NextResponse.json({ error: "Intake not found." }, { status: 404 });
  if (intake.status === "converted") return NextResponse.json({ error: "Already converted — cannot reject." }, { status: 409 });

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 1000) : null;

  await prisma.strataIntake.update({
    where: { id: intakeId },
    data: { status: "rejected", review_notes: notes, reviewed_by: admin.id, reviewed_at: new Date() },
  });

  return NextResponse.json({ success: true });
}
