import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireWriteAdmin } from "@/lib/admin-auth";
import { createAuditLog, getIpAndAgent } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const status = url.searchParams.get("status") ?? "";
  const limit = 50;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;

  const [items, total] = await Promise.all([
    prisma.aIScopeUser.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { user: { select: { id: true, email: true, full_name: true, phone: true, created_at: true } } },
    }),
    prisma.aIScopeUser.count({ where }),
  ]);

  return NextResponse.json({ items, total, totalPages: Math.ceil(total / limit), page });
}

export async function PATCH(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const existing = await prisma.aIScopeUser.findUnique({ where: { id: body.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (body.status !== undefined) {
    data.status = body.status;
    if (body.status === "approved") { data.approved_at = new Date(); data.approved_by = user!.id; }
    if (body.status === "disabled") data.disabled_at = new Date();
  }
  if (body.plan_type !== undefined) data.plan_type = body.plan_type || null;
  if (body.notes !== undefined) data.notes = body.notes || null;
  if (body.trial_ends_at !== undefined) data.trial_ends_at = body.trial_ends_at ? new Date(body.trial_ends_at) : null;

  const updated = await prisma.aIScopeUser.update({ where: { id: body.id }, data });

  const { ip, ua } = getIpAndAgent(request);
  await createAuditLog({ actorId: user!.id, actorEmail: user!.email, actorRole: user!.role, entityType: "ai_scope_user", entityId: String(body.id), action: body.status === "approved" ? "ai_scope_user_approved" : body.status === "disabled" ? "ai_scope_user_disabled" : "ai_scope_user_updated", previousValue: { status: existing.status }, newValue: { status: updated.status }, ipAddress: ip, userAgent: ua });

  return NextResponse.json(updated);
}
