import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";
import { dirTier } from "@/lib/directory-tier";
import { sendBusinessInterestedClientEmail } from "@/lib/directory-email";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

type ApplyResult = "recorded" | "already" | "closed" | "not_found";

// Records a business's interest in a lead and runs the side effects: advance the
// client's request, notify them (bell + push), and email them the business's
// contact card. Shared by the free "Interested" path and the paid purchase path
// (weekly allowance exhausted → bought a single lead / drew from the wallet).
//
// When `paidCents` is set the lead is stamped as purchased (outside the weekly
// allowance) so it doesn't count against next week's cap.
export async function applyLeadInterest(
  deliveryId: number,
  companyId: number,
  opts: { paidCents?: number } = {},
): Promise<ApplyResult> {
  const delivery = await prisma.quoteRequestDelivery.findFirst({
    where: { id: deliveryId, company_id: companyId },
    select: {
      id: true,
      interested_at: true,
      request: {
        select: {
          id: true,
          status: true,
          client_user_id: true,
          contact_name: true,
          contact_email: true,
          work_category: { select: { name: true } },
        },
      },
    },
  });
  if (!delivery) return "not_found";
  if (delivery.request.status === "closed") return "closed";
  if (delivery.interested_at) return "already"; // idempotent

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { id: true, name: true, plan_type: true, phone: true, email: true, website: true, slug: true },
  });
  if (!company) return "not_found";

  const now = new Date();
  await prisma.quoteRequestDelivery.update({
    where: { id: deliveryId },
    data: {
      interested_at: now,
      response_status: "interested",
      responded_at: now,
      ...(opts.paidCents != null ? { purchased_at: now, purchase_cents: opts.paidCents } : {}),
    },
  });
  // Mark opened if it wasn't (separate update so a real opened_at isn't lost).
  await prisma.quoteRequestDelivery.updateMany({
    where: { id: deliveryId, opened_at: null },
    data: { opened_at: now },
  });

  // Advance the client's request so their results view reflects engagement.
  await prisma.clientQuoteRequest.updateMany({
    where: { id: delivery.request.id, status: { in: ["submitted", "sent_to_businesses"] } },
    data: { status: "responses_received" },
  });

  const category = delivery.request.work_category?.name ?? "your request";
  await createNotification({
    userId: delivery.request.client_user_id,
    type: "lead",
    title: "A contractor is interested",
    body: `${company.name} is interested in ${category}. Request a quote to connect and exchange contact details.`,
    link: `/client/quote-requests/${delivery.request.id}`,
  });

  if (delivery.request.contact_email) {
    const t = dirTier(company.plan_type);
    sendBusinessInterestedClientEmail({
      to: delivery.request.contact_email,
      clientName: delivery.request.contact_name ?? "there",
      category,
      requestUrl: `${SITE_URL}/client/quote-requests/${delivery.request.id}`,
      business: {
        name: company.name,
        tier: t === "gold" ? "Gold" : t === "silver" ? "Silver" : null,
        phone: company.phone,
        email: company.email,
        website: company.website,
        profileUrl: company.slug ? `${SITE_URL}/directory/company/${company.slug}` : null,
      },
    }).catch((e) => console.error("[lead-interest] client email failed:", e));
  }

  return "recorded";
}
