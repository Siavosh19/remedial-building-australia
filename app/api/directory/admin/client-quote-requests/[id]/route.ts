import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";

type Params = { params: Promise<{ id: string }> };

// DELETE — remove a spam / bad request and its deliveries + files (cascade).
export async function DELETE(request: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const existing = await prisma.clientQuoteRequest.findUnique({ where: { id: requestId }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Request not found." }, { status: 404 });

  // Deliveries + files cascade via onDelete: Cascade on their FKs.
  await prisma.clientQuoteRequest.delete({ where: { id: requestId } });
  return NextResponse.json({ success: true });
}
