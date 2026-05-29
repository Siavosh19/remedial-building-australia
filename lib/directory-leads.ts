import { prisma } from "@/lib/prisma";
import { sendLeadNotificationEmail } from "@/lib/directory-email";
import type { LocationState } from "@prisma/client";

export async function matchAndDeliverLead(leadId: number): Promise<void> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { category: true },
  });
  if (!lead || !lead.category_id) return;

  // Find all active lead subscriptions that include this category
  const subscriptions = await prisma.leadSubscription.findMany({
    where: {
      is_active: true,
      categories_subscribed: { has: lead.category_id },
    },
    include: {
      company: {
        include: {
          locations: true,
        },
      },
    },
  });

  // Filter by location eligibility and monthly cap
  const eligible = subscriptions.filter((sub) => {
    if (sub.company.status !== "published") return false;

    const monthlyLimit = sub.max_leads_per_month;
    const received = sub.leads_received_this_month ?? 0;
    if (monthlyLimit !== null && monthlyLimit !== undefined && received >= monthlyLimit) return false;

    // Check location overlap
    const locations = sub.company.locations;
    if (!locations.length) return false;

    return locations.some((loc) => {
      if (loc.services_nationwide) return true;
      if (loc.state === lead.state) return true;
      if (loc.states_serviced.includes(lead.state as LocationState)) return true;
      if (loc.services_statewide && loc.state === lead.state) return true;
      // Radius check: approximate — include if service_radius_km is set and postcodes could overlap
      // (Full geo radius check requires lat/lng on both sides; fall back to state match for now)
      if (loc.service_radius_km && loc.state === lead.state) return true;
      return false;
    });
  });

  // Sort: featured DESC, confidence_score DESC
  eligible.sort((a, b) => {
    const featuredDiff =
      (b.company.is_featured ? 1 : 0) - (a.company.is_featured ? 1 : 0);
    if (featuredDiff !== 0) return featuredDiff;
    return b.company.confidence_score - a.company.confidence_score;
  });

  const selected = eligible.slice(0, 3);

  for (const sub of selected) {
    await prisma.leadDelivery.create({
      data: {
        lead_id: leadId,
        company_id: sub.company_id,
        delivered_at: new Date(),
        response_status: "pending",
      },
    });

    await prisma.leadSubscription.update({
      where: { id: sub.id },
      data: {
        leads_received_this_month: { increment: 1 },
      },
    });

    // Send email notification — no contact details
    if (lead.suburb && lead.category) {
      await sendLeadNotificationEmail(
        sub.company.email,
        lead.category.name,
        lead.suburb,
        lead.state,
        lead.urgency,
        lead.budget_range,
        lead.description ?? "",
      ).catch(() => {});
    }
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: selected.length > 0 ? "sent" : "new" },
  });
}
