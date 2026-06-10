import { prisma } from "@/lib/prisma";

interface AuditParams {
  actorId?: number | null;
  actorEmail?: string | null;
  actorRole?: string | null;
  entityType: string;
  entityId?: string | null;
  action: string;
  previousValue?: unknown;
  newValue?: unknown;
  supplierId?: number | null;
  productId?: number | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function createAuditLog(params: AuditParams) {
  try {
    await prisma.auditLog.create({
      data: {
        actor_id: params.actorId ?? null,
        actor_email: params.actorEmail ?? null,
        actor_role: params.actorRole ?? null,
        entity_type: params.entityType,
        entity_id: params.entityId ? String(params.entityId) : null,
        action: params.action,
        previous_value: params.previousValue ? (params.previousValue as object) : undefined,
        new_value: params.newValue ? (params.newValue as object) : undefined,
        supplier_id: params.supplierId ?? null,
        product_id: params.productId ?? null,
        ip_address: params.ipAddress ?? null,
        user_agent: params.userAgent ?? null,
      },
    });
  } catch {
    // Audit log failure must never break the main operation
  }
}

export function getIpAndAgent(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const ua = request.headers.get("user-agent") ?? null;
  return { ip, ua };
}
