import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { sendDirectQuoteRequestEmail } from "@/lib/directory-email";
import { notifyCompanyOwners } from "@/lib/notifications";
import { URGENCY_LABELS, formatBudget } from "@/lib/quote-options";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// The client picks an interested business and formally requests a quote. The
// business is emailed the full request + the client's contact details (a direct
// hookup) and gets a bell + push. The business already has the client's contacts
// on their card too. No messaging — they contact each other directly.
export async function POST(request: NextRequest, { params }: Params) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const body = await request.json().catch(() => null);
  const companyId = Number(body?.companyId);
  if (!Number.isInteger(companyId)) return NextResponse.json({ error: "Invalid business." }, { status: 400 });

  const req = await prisma.clientQuoteRequest.findFirst({
    where: { id: requestId, client_user_id: user.id },
    include: { work_category: { select: { name: true } }, files: { select: { filename: true, url: true } } },
  });
  if (!req) return NextResponse.json({ error: "Request not found." }, { status: 404 });

  // The business must have a delivery for this request and have expressed interest.
  const delivery = await prisma.quoteRequestDelivery.findFirst({
    where: { request_id: requestId, company_id: companyId },
    include: { company: { select: { id: true, name: true, email: true } } },
  });
  if (!delivery) return NextResponse.json({ error: "Business not available for this request." }, { status: 404 });

  const catName = req.work_category?.name ?? "Building works";

  await notifyCompanyOwners(companyId, {
    type: "lead",
    title: "Client requested a quote from you",
    body: `${catName} · ${req.suburb} ${req.postcode} — the client has selected you. Contact them to quote.`,
    link: "/directory/dashboard/lead-requests",
  });

  if (delivery.company.email) {
    sendDirectQuoteRequestEmail({
      to: delivery.company.email,
      businessName: delivery.company.name,
      clientName: req.contact_name,
      clientEmail: req.contact_email,
      clientPhone: req.contact_phone,
      suburb: req.suburb,
      postcode: req.postcode,
      category: catName,
      description: req.description,
      budget: formatBudget(req.budget_range) || null,
      urgency: URGENCY_LABELS[req.urgency] ?? req.urgency,
      files: req.files,
      dashboardUrl: `${SITE_URL}/directory/dashboard/lead-requests`,
    }).catch((e) => console.error("[request-quote] business email failed:", e));
  }

  return NextResponse.json({ success: true });
}
