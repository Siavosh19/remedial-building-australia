import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import Link from "next/link";

export default async function DashboardIndexPage() {
  const user = await getCurrentDirectoryUser();
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
    include: {
      lead_subscriptions: true,
      lead_deliveries: { orderBy: { delivered_at: "desc" }, take: 5 },
    },
  });

  const subscription = company?.lead_subscriptions[0];
  const recentLeads = company?.lead_deliveries ?? [];
  const leadsThisMonth = subscription?.leads_received_this_month ?? 0;

  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50 px-8 py-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sky-500">Dashboard</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950">
              Welcome back, {user?.full_name?.split(" ")[0] ?? "Owner"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {company?.name} · Listing is{" "}
              <span className={company?.status === "published" ? "text-blue-600" : "text-red-600"}>
                {company?.status ?? "unknown"}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/directory/company/${company?.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-slate-900"
            >
              View public listing ↗
            </a>
            <Link
              href="/directory/dashboard/profile"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
            >
              Edit profile
            </Link>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Profile status</p>
          <p className="mt-3 text-2xl font-bold text-slate-950 capitalize">
            {company?.profile_status?.replace(/_/g, " ") ?? "Basic"}
          </p>
          <div className="mt-4 h-1.5 rounded-full bg-slate-100">
            <div
              className="h-1.5 rounded-full bg-blue-600"
              style={{
                width: `${Math.min(100, (["basic","contact_verified","business_verified","licence_verified","practitioner_verified","claimed","featured"].indexOf(company?.profile_status ?? "basic") + 1) * 14.3)}%`
              }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">Complete your profile to increase visibility</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Leads this month</p>
          <p className="mt-3 text-2xl font-bold text-slate-950">{leadsThisMonth}</p>
          <p className="mt-4 text-xs text-slate-400">
            {subscription?.is_active
              ? `Plan: ${subscription.plan} · receiving leads`
              : "Activate a plan to receive leads"}
          </p>
          <Link href="/directory/dashboard/leads" className="mt-2 block text-xs font-semibold text-blue-600 hover:text-blue-700">
            View all leads →
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Subscription</p>
          <p className="mt-3 text-2xl font-bold capitalize text-slate-950">
            {subscription?.plan ?? "Free"}
          </p>
          <p className="mt-4 text-xs text-slate-400">
            {subscription?.is_active
              ? `Active · renews ${subscription.subscription_end ? new Date(subscription.subscription_end).toLocaleDateString() : "N/A"}`
              : "No active subscription"}
          </p>
          <Link href="/directory/dashboard/subscription" className="mt-2 block text-xs font-semibold text-red-700 hover:text-red-600">
            Manage plan →
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            href: "/directory/dashboard/profile",
            label: "Complete your profile",
            description: "Add description, services, licence details and contact info.",
            accent: "border-l-4 border-blue-600",
          },
          {
            href: "/directory/dashboard/leads",
            label: "Manage leads",
            description: "Accept or decline incoming quote requests from clients.",
            accent: "border-l-4 border-slate-950",
          },
          {
            href: "/directory/dashboard/subscription",
            label: "Upgrade plan",
            description: "Unlock lead delivery and priority placement in search results.",
            accent: "border-l-4 border-red-700",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md ${item.accent}`}
          >
            <p className="font-bold text-slate-950">{item.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
            <p className="mt-4 text-xs font-semibold text-blue-600">Get started →</p>
          </Link>
        ))}
      </div>

      {/* Recent lead activity */}
      {recentLeads.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <p className="font-bold text-slate-950">Recent lead activity</p>
            <Link href="/directory/dashboard/leads" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View all →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {recentLeads.map((d) => (
              <li key={d.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Lead #{d.lead_id}</p>
                  <p className="text-xs text-slate-400">{new Date(d.delivered_at).toLocaleDateString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                  d.response_status === "accepted"
                    ? "bg-blue-100 text-blue-700"
                    : d.response_status === "declined"
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {d.response_status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
