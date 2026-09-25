import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";

type Ctx = { params: Promise<{ id: string; periodId: string }> };

/** Move a period's due date, or record that its notices have been issued. */
export async function PATCH(req: Request, ctx: Ctx) {
  const { id, periodId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const period = await prisma.strataLevyPeriod.findFirst({
    where: { id: Number(periodId), scheme_id: access.scheme.id },
  });
  if (!period) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  let dueDate: Date | undefined;
  if (body.due_date !== undefined) {
    const parsed = new Date(String(body.due_date));
    if (Number.isNaN(parsed.getTime())) {
      return NextResponse.json({ error: "That date is not valid." }, { status: 400 });
    }
    dueDate = parsed;
  }

  await prisma.strataLevyPeriod.update({
    where: { id: period.id },
    data: {
      due_date: dueDate,
      // Issuing is recorded, not performed: the committee sends the notices
      // under its own identity, and this only notes that it happened.
      issued_at: body.issued === undefined ? undefined : body.issued ? new Date() : null,
    },
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_levy_period",
    entityId: String(period.id),
    action: body.issued !== undefined ? "notices_marked_issued" : "due_date_changed",
    previousValue: { due_date: period.due_date, issued_at: period.issued_at },
  });

  return NextResponse.json({ ok: true });
}
