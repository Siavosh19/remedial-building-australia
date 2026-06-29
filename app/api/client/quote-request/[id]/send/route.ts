import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientUserFromRequest } from "@/lib/directory-auth";
import { sendDirectQuoteRequestEmail } from "@/lib/directory-email";
import { URGENCY_LABELS, formatBudget } from "@/lib/quote-options";

type Params = { params: Promise<{ id: string }> };

const MAX_PER_REQUEST = 5;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// POST { companyId } — send this client's quote request to one chosen business.
export async function POST(request: NextRequest, { params }: Params) {
  const user = await getClientUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const body = await request.json().catch(() => null);
  const companyId = Number(body?.companyId);
  if (!Number.isInteger(companyId)) return NextResponse.json({ error: "Invalid business." }, { status: 400 });

  const quoteRequest = await prisma.clientQuoteRequest.findFirst({
    where: { id: requestId, client_user_id: user.id },
    include: { work_category: { select: { name: true } }, files: { select: { filename: true, url: true } } },
  });
  if (!quoteRequest) return NextResponse.json({ error: "Request not found." }, { status: 404 });
  if (quoteRequest.status === "closed") {
    return NextResponse.json({ error: "This request is closed." }, { status: 400 });
  }

  // Already sent to this business?
  const existing = await prisma.quoteRequestDelivery.findFirst({
    where: { request_id: requestId, company_id: companyId },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ error: "You have already requested a quote from this business." }, { status: 400 });
  }

  // Enforce the 5-business cap per enquiry.
  const sentCount = await prisma.quoteRequestDelivery.count({ where: { request_id: requestId } });
  if (sentCount >= MAX_PER_REQUEST) {
    return NextResponse.json({ error: `You have reached the maximum of ${MAX_PER_REQUEST} quote requests for this enquiry.` }, { status: 400 });
  }

  // The business must be Silver/Gold (claimed/featured), published and not suspended.
  const company = await prisma.company.findFirst({
    where: { id: companyId, status: "published", suspended: false, plan_type: { in: ["claimed", "featured"] } },
    select: { id: true, name: true, email: true },
  });
  if (!company) {
    return NextResponse.json({ error: "This business cannot receive quote requests." }, { status: 400 });
  }

  const delivery = await prisma.quoteRequestDelivery.create({
    data: { request_id: requestId, company_id: companyId, rank_tier: 0, email_status: "pending" },
  });

  // Email the business (best-effort; record per-delivery status).
  const catName = quoteRequest.work_category?.name ?? "Building works";
  if (company.email) {
    try {
      await sendDirectQuoteRequestEmail({
        to: company.email,
        businessName: company.name,
        clientName: quoteRequest.contact_name,
        clientEmail: quoteRequest.contact_email,
        clientPhone: quoteRequest.contact_phone,
        suburb: quoteRequest.suburb,
        postcode: quoteRequest.postcode,
        category: catName,
        description: quoteRequest.description,
        budget: formatBudget(quoteRequest.budget_range) || null,
        urgency: URGENCY_LABELS[quoteRequest.urgency] ?? quoteRequest.urgency,
        files: quoteRequest.files,
        dashboardUrl: `${SITE_URL}/directory/dashboard/lead-requests`,
      });
      await prisma.quoteRequestDelivery.update({ where: { id: delivery.id }, data: { email_status: "sent", email_sent_at: new Date() } });
    } catch (err) {
      console.error(`[quote send] business email to ${company.email} failed:`, err);
      await prisma.quoteRequestDelivery.update({
        where: { id: delivery.id },
        data: { email_status: "failed", email_error: String((err as Error)?.message ?? err).slice(0, 480) },
      });
    }
  } else {
    await prisma.quoteRequestDelivery.update({ where: { id: delivery.id }, data: { email_status: "failed", email_error: "No business email on file" } });
  }

  // Advance the request out of "submitted" once at least one has been sent.
  const newCount = sentCount + 1;
  await prisma.clientQuoteRequest.update({
    where: { id: requestId },
    data: {
      status: quoteRequest.status === "submitted" || quoteRequest.status === "draft" ? "sent_to_businesses" : quoteRequest.status,
      matched_count: newCount,
      submitted_at: quoteRequest.submitted_at ?? new Date(),
    },
  });

  return NextResponse.json({ success: true, sentCount: newCount, maxReached: newCount >= MAX_PER_REQUEST });
}
