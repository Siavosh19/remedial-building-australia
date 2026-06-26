import { prisma } from "@/lib/prisma";
import { matchBusinessesForRequest } from "@/lib/quote-matching";
import {
  sendQuoteRequestBroadcastBusinessEmail,
  sendClientQuoteConfirmationEmail,
} from "@/lib/directory-email";
import { URGENCY_LABELS } from "@/lib/quote-options";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// Run matching for a submitted request: fan out QuoteRequestDelivery rows,
// notify each matched paid business, confirm to the client, and advance status.
// Idempotent on deliveries (skipDuplicates) so a re-run won't double-send rows.
export async function processQuoteRequestSubmission(requestId: number) {
  const request = await prisma.clientQuoteRequest.findUnique({
    where: { id: requestId },
    include: { work_category: true },
  });
  if (!request) throw new Error("Request not found");

  const matches = await matchBusinessesForRequest({
    work_category_id: request.work_category_id,
    work_subcategory_id: request.work_subcategory_id,
    suburb: request.suburb,
    postcode: request.postcode,
    state: request.state,
    latitude: request.latitude,
    longitude: request.longitude,
  });

  if (matches.length > 0) {
    await prisma.quoteRequestDelivery.createMany({
      data: matches.map((m) => ({
        request_id: requestId,
        company_id: m.company_id,
        rank_tier: m.rank_tier,
      })),
      skipDuplicates: true,
    });
  }

  await prisma.clientQuoteRequest.update({
    where: { id: requestId },
    data: {
      status: "sent_to_businesses",
      matched_count: matches.length,
      submitted_at: request.submitted_at ?? new Date(),
    },
  });

  const catName = request.work_category?.name ?? "Building works";
  const urgencyLabel = URGENCY_LABELS[request.urgency] ?? request.urgency;
  const businessDashUrl = `${SITE_URL}/directory/dashboard`;

  // Notify matched businesses (best-effort; record per-delivery email status).
  if (matches.length > 0) {
    const companies = await prisma.company.findMany({
      where: { id: { in: matches.map((m) => m.company_id) } },
      select: { id: true, name: true, email: true },
    });
    for (const c of companies) {
      if (!c.email) {
        await prisma.quoteRequestDelivery.updateMany({
          where: { request_id: requestId, company_id: c.id },
          data: { email_status: "failed", email_error: "No business email on file" },
        });
        continue;
      }
      try {
        await sendQuoteRequestBroadcastBusinessEmail({
          to: c.email,
          businessName: c.name,
          suburb: request.suburb,
          category: catName,
          description: request.description,
          urgency: urgencyLabel,
          dashboardUrl: businessDashUrl,
        });
        await prisma.quoteRequestDelivery.updateMany({
          where: { request_id: requestId, company_id: c.id },
          data: { email_status: "sent", email_sent_at: new Date() },
        });
      } catch (err) {
        console.error(`[quote-submit] business email to ${c.email} failed:`, err);
        await prisma.quoteRequestDelivery.updateMany({
          where: { request_id: requestId, company_id: c.id },
          data: { email_status: "failed", email_error: String((err as Error)?.message ?? err).slice(0, 480) },
        });
      }
    }
  }

  // Confirm to the client (best-effort — never fail the submission on this).
  try {
    await sendClientQuoteConfirmationEmail({
      to: request.contact_email,
      name: request.contact_name,
      category: catName,
      suburb: request.suburb,
      matchedCount: matches.length,
      dashboardUrl: `${SITE_URL}/client/quote-requests/${requestId}`,
    });
  } catch (err) {
    console.error(`[quote-submit] client confirmation to ${request.contact_email} failed:`, err);
  }

  return { matchedCount: matches.length };
}
