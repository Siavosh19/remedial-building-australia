import { prisma } from "@/lib/prisma";
import { matchBusinessesForRequest } from "@/lib/quote-matching";
import { notifyCompanyOwners } from "@/lib/notifications";
import { sendDirectQuoteRequestEmail, sendClientLeadAdminEmail } from "@/lib/directory-email";
import { URGENCY_LABELS, formatBudget } from "@/lib/quote-options";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// Broadcast a submitted request to EVERY matching Silver/Gold business in its
// category. Businesses can review all matching leads; the scarcity sits at the
// interest step instead — a business may only express interest in a limited
// number of leads per week (WEEKLY_INTEREST_CAP, enforced in the interested
// route). This replaces the old "client hand-picks 5" flow. Reusable by both
// intake streams:
//   • Portal (manual): called immediately on submit — no approval.
//   • Strata Connect (AI): called AFTER an admin approves the extracted request.
export async function broadcastRequest(requestId: number): Promise<{ matched: number; delivered: number }> {
  const req = await prisma.clientQuoteRequest.findUnique({
    where: { id: requestId },
    include: { work_category: { select: { name: true } }, files: { select: { filename: true, url: true } } },
  });
  if (!req || req.status === "closed") return { matched: 0, delivered: 0 };

  const matches = await matchBusinessesForRequest({
    work_category_id: req.work_category_id,
    work_subcategory_id: req.work_subcategory_id,
    suburb: req.suburb,
    postcode: req.postcode,
    state: req.state,
    latitude: req.latitude,
    longitude: req.longitude,
  });

  const catName = req.work_category?.name ?? "Building works";

  if (matches.length === 0) {
    await prisma.clientQuoteRequest.update({
      where: { id: requestId },
      data: { status: "sent_to_businesses", submitted_at: req.submitted_at ?? new Date() },
    });
    return { matched: 0, delivered: 0 };
  }

  const ids = matches.map((m) => m.company_id);

  // Company details for the matched set (re-check the paid gate).
  const companies = await prisma.company.findMany({
    where: { id: { in: ids }, status: "published", suspended: false, plan_type: { in: ["claimed", "featured"] } },
    select: { id: true, name: true, email: true, plan_type: true },
  });
  const compById = new Map(companies.map((c) => [c.id, c]));

  // Dedupe against any deliveries already created for this request so a re-run
  // never double-sends — this is what keeps submit fast (the old flow hung on a
  // self-fetch).
  const alreadySent = new Set(
    (await prisma.quoteRequestDelivery.findMany({ where: { request_id: requestId }, select: { company_id: true } })).map((d) => d.company_id),
  );

  const emailJobs: Promise<unknown>[] = [];
  let delivered = 0;

  for (const m of matches) {
    const company = compById.get(m.company_id);
    if (!company || alreadySent.has(company.id)) continue;

    const delivery = await prisma.quoteRequestDelivery.create({
      data: { request_id: requestId, company_id: company.id, rank_tier: m.rank_tier, email_status: "pending" },
    });
    delivered++;

    // Bell + push (best-effort inside notifyCompanyOwners).
    await notifyCompanyOwners(company.id, {
      type: "lead",
      title: "New lead received",
      body: `${catName} · ${req.suburb} ${req.postcode}`,
      link: "/directory/dashboard/lead-requests?view=new",
    });

    // Email in parallel (awaited together below) so a big fan-out stays quick.
    if (company.email) {
      emailJobs.push(
        sendDirectQuoteRequestEmail({
          to: company.email,
          businessName: company.name,
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
        })
          .then(() => prisma.quoteRequestDelivery.update({ where: { id: delivery.id }, data: { email_status: "sent", email_sent_at: new Date() } }))
          .catch((err) => prisma.quoteRequestDelivery.update({ where: { id: delivery.id }, data: { email_status: "failed", email_error: String((err as Error)?.message ?? err).slice(0, 480) } })),
      );
    } else {
      emailJobs.push(
        prisma.quoteRequestDelivery.update({ where: { id: delivery.id }, data: { email_status: "failed", email_error: "No business email on file" } }),
      );
    }
  }

  await Promise.allSettled(emailJobs);

  // Notify the site owner once per request.
  if (delivered > 0) {
    sendClientLeadAdminEmail({
      clientName: req.contact_name,
      clientEmail: req.contact_email,
      clientPhone: req.contact_phone,
      category: catName,
      suburb: req.suburb,
      postcode: req.postcode,
      businessName: `${delivered} matching business${delivered === 1 ? "" : "es"}`,
    }).catch(() => {});
  }

  await prisma.clientQuoteRequest.update({
    where: { id: requestId },
    data: { status: "sent_to_businesses", matched_count: delivered, submitted_at: req.submitted_at ?? new Date() },
  });

  return { matched: matches.length, delivered };
}
