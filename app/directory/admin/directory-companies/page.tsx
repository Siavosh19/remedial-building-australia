import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";
import DirectoryCompaniesClient from "./DirectoryCompaniesClient";

export const dynamic = "force-dynamic";

export default async function DirectoryCompaniesPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const companies = await prisma.company.findMany({
    orderBy: [{ plan_type: "desc" }, { created_at: "desc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      email: true,
      status: true,
      plan_type: true,
      listing_claim_status: true,
      is_featured: true,
      is_claimed: true,
      suspended: true,
      profile_views: true,
      phone_clicks: true,
      website_clicks: true,
      created_at: true,
      main_category: { select: { name: true } },
      locations: { take: 1, select: { suburb: true, state: true } },
      directory_subscription: {
        select: {
          subscription_status: true,
          plan_type: true,
          billing_cycle: true,
          trial_ends_at: true,
          current_period_end: true,
          cancel_at_period_end: true,
          stripe_customer_id: true,
          stripe_subscription_id: true,
        },
      },
      _count: { select: { quote_requests: true } },
    },
  });

  const serialised = companies.map((c) => ({
    ...c,
    created_at: c.created_at.toISOString(),
    directory_subscription: c.directory_subscription
      ? {
          ...c.directory_subscription,
          trial_ends_at: c.directory_subscription.trial_ends_at?.toISOString() ?? null,
          current_period_end: c.directory_subscription.current_period_end?.toISOString() ?? null,
        }
      : null,
  }));

  return <DirectoryCompaniesClient companies={serialised} />;
}
