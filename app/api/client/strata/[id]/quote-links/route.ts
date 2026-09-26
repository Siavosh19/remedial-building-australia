import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { logCorrespondence } from "@/lib/strata/registers";

/**
 * Record that a quote request belongs to this scheme.
 *
 * The request itself is created by the existing quote platform
 * (POST /api/client/quote-request) exactly as it is for any other client — this
 * only writes the association, so the request behaves identically whether it
 * came from a scheme or from the ordinary form. A request with no row here is
 * simply a request, as it always was.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const quoteRequestId = Number(body?.quote_request_id);
  if (!Number.isFinite(quoteRequestId)) {
    return NextResponse.json({ error: "Missing quote request." }, { status: 400 });
  }

  // Only the account that raised the request may link it.
  const request = await prisma.clientQuoteRequest.findFirst({
    where: { id: quoteRequestId, client_user_id: access.userId },
    select: { id: true },
  });
  if (!request) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const defectId = Number(body?.defect_id);
  const workOrderId = Number(body?.work_order_id);

  const [defect, workOrder] = await Promise.all([
    Number.isFinite(defectId) && defectId > 0
      ? prisma.strataDefect.findFirst({ where: { id: defectId, scheme_id: access.scheme.id }, select: { id: true } })
      : null,
    Number.isFinite(workOrderId) && workOrderId > 0
      ? prisma.strataWorkOrder.findFirst({ where: { id: workOrderId, scheme_id: access.scheme.id }, select: { id: true } })
      : null,
  ]);

  const link = await prisma.strataQuoteLink.upsert({
    where: { quote_request_id: request.id },
    create: {
      scheme_id: access.scheme.id,
      quote_request_id: request.id,
      defect_id: defect?.id ?? null,
      work_order_id: workOrder?.id ?? null,
    },
    update: { defect_id: defect?.id ?? null, work_order_id: workOrder?.id ?? null },
  });

  // A defect that is out to quote says so on the register.
  if (defect?.id) {
    await prisma.strataDefect.updateMany({
      where: { id: defect.id, status: "open" },
      data: { status: "awaiting_quote" },
    });
  }

  await logCorrespondence({
    schemeId: access.scheme.id,
    party: "Remedial Building Australia",
    subject: "Quote request raised",
    summary: "A request for quotes was raised and matched to verified businesses.",
    relatesTo: "Maintenance",
    reference: `Request #${request.id}`,
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_quote_link",
    entityId: String(link.id),
    action: "link",
    newValue: { scheme_id: access.scheme.id, quote_request_id: request.id, defect_id: defect?.id ?? null },
  });

  return NextResponse.json({ ok: true, id: link.id });
}
