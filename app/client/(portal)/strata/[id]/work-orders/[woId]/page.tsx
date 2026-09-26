import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import SchemeTabs from "../../../SchemeTabs";
import WorkOrderDetail, { type Responder } from "./WorkOrderDetail";

export const dynamic = "force-dynamic";

/** yyyy-mm-dd for a date input, or "" when unset. */
function forInput(value: Date | null) {
  return value ? value.toISOString().slice(0, 10) : "";
}

export default async function WorkOrderPage({ params }: { params: Promise<{ id: string; woId: string }> }) {
  const { id, woId } = await params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) notFound();

  const { scheme, canManage } = access;

  const order = await prisma.strataWorkOrder.findFirst({
    where: { id: Number(woId), scheme_id: scheme.id },
    include: { defect: { select: { id: true, reference: true, description: true } } },
  });
  if (!order) notFound();

  // A work order sees the quote request raised for it, or for the defect it
  // came from — whichever exists.
  const link = await prisma.strataQuoteLink.findFirst({
    where: {
      scheme_id: scheme.id,
      OR: [{ work_order_id: order.id }, order.defect_id ? { defect_id: order.defect_id } : { id: -1 }],
    },
    select: { quote_request_id: true },
  });

  const [contractors, deliveries, logged] = await Promise.all([
    prisma.strataContractor.findMany({
      where: { scheme_id: scheme.id, active: true },
      orderBy: { business_name: "asc" },
      select: { id: true, business_name: true, trade: true },
    }),
    link
      ? prisma.quoteRequestDelivery.findMany({
          where: { request_id: link.quote_request_id },
          orderBy: [{ response_status: "asc" }, { id: "asc" }],
          include: { company: { select: { id: true, name: true, slug: true, phone: true, email: true } } },
        })
      : [],
    prisma.strataContractor.findMany({
      where: { scheme_id: scheme.id, company_id: { not: null } },
      select: { company_id: true },
    }),
  ]);

  const inLog = new Set(logged.map((c) => c.company_id));

  const responders: Responder[] = deliveries.map((d) => ({
    companyId: d.company.id,
    name: d.company.name,
    slug: d.company.slug,
    phone: d.company.phone,
    email: d.company.email,
    responseStatus: d.response_status,
    quoteDocUrl: d.quote_doc_url,
    alreadyInLog: inLog.has(d.company.id),
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/client/strata/${scheme.id}/work-orders`}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700"
        >
          ← Work orders
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
          <span className="font-mono text-base text-slate-400">{order.reference}</span> {order.title}
        </h1>
        {order.defect && (
          <p className="mt-1 text-sm text-slate-500">
            Arising from {order.defect.reference} — {order.defect.description}
          </p>
        )}
      </div>

      <SchemeTabs schemeId={scheme.id} />

      <WorkOrderDetail
        schemeId={scheme.id}
        canManage={canManage}
        quoteRequestId={link?.quote_request_id ?? null}
        responders={responders}
        contractors={contractors}
        order={{
          id: order.id,
          reference: order.reference,
          title: order.title,
          scope: order.scope,
          location: order.location,
          status: order.status,
          contractorId: order.contractor_id,
          agreedPrice: order.agreed_price,
          issuedOn: forInput(order.issued_on),
          startOn: forInput(order.start_on),
          completedOn: forInput(order.completed_on),
          warrantyUntil: forInput(order.warranty_until),
          defectsLiabilityUntil: forInput(order.defects_liability_until),
          invoiceReference: order.invoice_reference,
          notes: order.notes,
        }}
      />
    </div>
  );
}
