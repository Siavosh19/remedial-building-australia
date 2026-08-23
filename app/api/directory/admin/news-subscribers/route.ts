import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireWriteAdmin } from "@/lib/admin-auth";
import { createAuditLog } from "@/lib/audit";

// Remove a newsletter subscriber. The list lives in newsletter_subscribers,
// which is not modelled in Prisma, so it is read and written with raw SQL —
// the same way the admin page and the export route read it.
export async function DELETE(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "An email address is required." }, { status: 400 });

  // Capture the row first so the audit log records what was removed.
  const existing = await prisma.$queryRaw<{ name: string | null; email: string; interest_category: string | null }[]>(
    Prisma.sql`SELECT name, email, interest_category FROM newsletter_subscribers WHERE lower(email) = ${email} LIMIT 1`,
  );
  if (!existing.length) {
    return NextResponse.json({ error: "That subscriber is no longer on the list." }, { status: 404 });
  }

  const removed = await prisma.$executeRaw(
    Prisma.sql`DELETE FROM newsletter_subscribers WHERE lower(email) = ${email}`,
  );

  await createAuditLog({
    entityType: "newsletter_subscriber",
    entityId: email,
    action: "deleted",
    previousValue: existing[0],
    actorId: user!.id,
    actorEmail: user!.email,
    actorRole: user!.role,
  }).catch(() => {});

  return NextResponse.json({ ok: true, removed });
}
