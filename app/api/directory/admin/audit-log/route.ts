import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const entityType = url.searchParams.get("entity_type") ?? "";
  const actorId = url.searchParams.get("actor_id") ? Number(url.searchParams.get("actor_id")) : undefined;
  const limit = 50;

  const where: Record<string, unknown> = {};
  if (entityType) where.entity_type = entityType;
  if (actorId) where.actor_id = actorId;

  const [items, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return NextResponse.json({ items, total, totalPages: Math.ceil(total / limit), page });
}
