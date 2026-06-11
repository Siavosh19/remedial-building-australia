import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import LeadsDashboardClient from "./LeadsDashboardClient";

export default async function DashboardLeadsPage() {
  const user = await getCurrentDirectoryUser();

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
    include: {
      lead_deliveries: {
        orderBy: { delivered_at: "desc" },
        include: {
          lead: { include: { category: true } },
        },
      },
      lead_subscriptions: true,
    },
  });

  const subscription = company?.lead_subscriptions[0];
  const isSubscribed = subscription?.is_active === true;

  const deliveries = (company?.lead_deliveries ?? []).map((d) => ({
    id: d.id,
    response_status: d.response_status,
    delivered_at: d.delivered_at.toISOString(),
    opened_at: d.opened_at?.toISOString() ?? null,
    lead: {
      category: d.lead.category?.name ?? null,
      suburb: d.lead.suburb ?? null,
      state: d.lead.state,
      urgency: d.lead.urgency,
      budget_range: d.lead.budget_range,
      submitted_by_name: d.lead.submitted_by_name,
      submitted_by_email: d.lead.submitted_by_email,
      submitted_by_phone: d.lead.submitted_by_phone ?? null,
    },
  }));

  return <LeadsDashboardClient isSubscribed={isSubscribed} deliveries={deliveries} />;
}
