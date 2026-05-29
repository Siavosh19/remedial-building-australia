import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export default async function DashboardSubscriptionPage() {
  const user = await getCurrentDirectoryUser();
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
    include: { lead_subscriptions: true },
  });

  const subscription = company?.lead_subscriptions[0];

  return (
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950">Subscription</h1>
        <p className="mt-3 text-slate-600">Manage your lead subscription and listing visibility.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-500">Current plan</p>
          <p className="mt-4 text-xl font-semibold text-slate-950">{subscription?.plan ?? "Free"}</p>
          <p className="mt-2 text-slate-600">{subscription?.is_active ? "Active and receiving leads." : "Inactive. Upgrade to start receiving leads."}</p>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-500">Next renewal</p>
          <p className="mt-4 text-xl font-semibold text-slate-950">{subscription?.subscription_end ? new Date(subscription.subscription_end).toLocaleDateString() : "Not set"}</p>
          <p className="mt-2 text-slate-600">{subscription?.is_active ? "Your subscription is configured." : "No active subscription found."}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Free", description: "Basic listing access.", price: "$0" },
          { title: "Growth", description: "Receive targeted leads.", price: "$199/mo" },
          { title: "Premium", description: "Priority placement and campaigns.", price: "$499/mo" },
        ].map((plan) => (
          <div key={plan.title} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{plan.title}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">{plan.price}</p>
            <p className="mt-3 text-slate-600">{plan.description}</p>
            <button disabled className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300">
              Coming soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
