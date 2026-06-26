import { prisma } from "@/lib/prisma";
import PlansAdminClient from "./PlansAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPlansPage() {
  const plans = await prisma.plan.findMany({
    orderBy: [{ product_line: "asc" }, { display_order: "asc" }, { amount_cents: "asc" }],
  });
  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Plans &amp; Pricing</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage every billing plan across all product lines. Saving a plan creates its Stripe product &amp; price
          automatically — checkout reads from here, so you never need a developer to change pricing.
        </p>
      </div>
      <PlansAdminClient
        initialPlans={JSON.parse(JSON.stringify(plans))}
        stripeConfigured={stripeConfigured}
      />
    </div>
  );
}
