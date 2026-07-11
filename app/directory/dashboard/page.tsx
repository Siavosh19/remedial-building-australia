import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  Circle,
  AlertCircle,
  Image as ImageIcon,
  FileText,
  MapPin,
  Shield,
  Camera,
  Send,
  Building2,
  Inbox,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

function listingStatusLabel(status: string | null) {
  switch (status) {
    case "published": return { label: "Live", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" };
    case "needs_review": return { label: "Under review", cls: "bg-amber-100 text-amber-700 border-amber-200" };
    case "suspended": return { label: "Suspended", cls: "bg-red-100 text-red-700 border-red-200" };
    default: return { label: "Draft", cls: "bg-slate-100 text-slate-600 border-slate-200" };
  }
}

function claimStatusLabel(status: string | null) {
  switch (status) {
    case "claimed": return { label: "Claimed", cls: "bg-indigo-100 text-indigo-700 border-indigo-200" };
    case "claim_pending": return { label: "Claim under review", cls: "bg-amber-100 text-amber-700 border-amber-200" };
    case "rejected": return { label: "Claim rejected", cls: "bg-red-100 text-red-700 border-red-200" };
    default: return { label: "Unclaimed", cls: "bg-slate-100 text-slate-500 border-slate-200" };
  }
}

function planLabel(planType: string) {
  if (planType === "featured") return "Gold";
  if (planType === "claimed") return "Silver";
  return "Free Listing";
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export default async function DashboardIndexPage() {
  const user = await getCurrentDirectoryUser();
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
    include: {
      directory_subscription: true,
      locations: { take: 1 },
      media: true,
    },
    // Also fetch fields needed for completion checklist
  });

  // Job-only accounts (no directory listing yet) get a create-listing prompt
  // instead of an empty business overview.
  if (!company) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-950 text-white">
            <Building2 size={26} />
          </div>
          <h1 className="text-2xl font-extrabold text-sky-950">
            Welcome{user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You don&apos;t have a business listing yet. Create one to appear in the directory and receive quote
            requests — or head to{" "}
            <Link href="/directory/dashboard/jobs" className="font-semibold text-sky-700 hover:text-red-700">Jobs</Link>{" "}
            to post a role.
          </p>
          <Link
            href="/directory/signup/company"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Create my listing
          </Link>
        </div>
      </div>
    );
  }

  // Refetch with extra fields for checklist
  const companyDetail = company
    ? await prisma.company.findUnique({
        where: { id: company.id },
        select: {
          description: true,
          phone: true,
          website: true,
          licence_number: true,
          logo_url: true,
        },
      })
    : null;

  const subscription = company?.directory_subscription;
  const plan = company?.plan_type ?? "basic";

  // Leads = matched quote-request deliveries to THIS business. RBA businesses
  // never quote on-platform — they receive a lead and contact the client directly.
  const [leadsReceived, newLeads, recentLeads] = await Promise.all([
    prisma.quoteRequestDelivery.count({
      where: { company_id: company.id, request: { status: { not: "draft" } } },
    }),
    prisma.quoteRequestDelivery.count({
      where: { company_id: company.id, opened_at: null, request: { status: { not: "draft" } } },
    }),
    prisma.quoteRequestDelivery.findMany({
      where: { company_id: company.id, request: { status: { not: "draft" } } },
      orderBy: { created_at: "desc" },
      take: 5,
      include: {
        request: { select: { suburb: true, postcode: true, work_category: { select: { name: true } } } },
      },
    }),
  ]);
  const isClaimed = plan !== "basic";
  const claimPending = company?.listing_claim_status === "claim_pending";

  const logoMedia = company?.media.find((m) => m.media_type === "logo");
  const photos = company?.media.filter((m) => m.media_type === "photo") ?? [];
  const hasLogo = !!(logoMedia || companyDetail?.logo_url);
  const hasDescription = !!(companyDetail?.description?.trim());
  const hasLocation = !!(company?.locations?.[0]?.postcode);
  const hasLicence = !!(companyDetail?.licence_number);
  const hasPhotos = photos.length > 0;
  const isLive = company?.status === "published";

  const checklist = [
    { label: "Add business logo", done: hasLogo, icon: ImageIcon, locked: !isClaimed },
    { label: "Add business description", done: hasDescription, icon: FileText, locked: false },
    { label: "Add service area", done: hasLocation, icon: MapPin, locked: false },
    { label: "Add licence details", done: hasLicence, icon: Shield, locked: !isClaimed },
    { label: "Add project photos", done: hasPhotos, icon: Camera, locked: !isClaimed },
    { label: "Listing live", done: isLive, icon: Send, locked: false },
  ];

  const completedCount = checklist.filter((c) => !c.locked && c.done).length;
  const totalCount = checklist.filter((c) => !c.locked).length;
  const completionPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const listingStatus = listingStatusLabel(company?.status ?? null);
  const claimStatus = claimStatusLabel(company?.listing_claim_status ?? null);

  const subStatus = (() => {
    if (!subscription) return null;
    if (subscription.subscription_status === "trialing") {
      const end = subscription.trial_ends_at ? new Date(subscription.trial_ends_at) : null;
      return end ? `Free trial · ends ${end.toLocaleDateString("en-AU")}` : "Free trial";
    }
    if (subscription.subscription_status === "active") {
      const end = subscription.current_period_end ? new Date(subscription.current_period_end) : null;
      return end ? `Active · renews ${end.toLocaleDateString("en-AU")}` : "Active";
    }
    return null;
  })();

  return (
    <div className="space-y-6">

      {/* ── Claim pending alert ─────────────────────────────────────────── */}
      {claimPending && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-bold text-amber-900">Claim under review</p>
            <p className="mt-0.5 text-xs text-amber-800">
              Your claim is being reviewed by our team. You will receive an email once approved. Profile editing is available after approval.
            </p>
          </div>
        </div>
      )}

      {/* ── Business profile status panel ──────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center">

          {/* Avatar */}
          <div className="shrink-0">
            {(logoMedia?.url || companyDetail?.logo_url) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoMedia?.url ?? companyDetail?.logo_url ?? ""}
                alt={company?.name ?? ""}
                className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-sky-950 text-lg font-extrabold text-white">
                {initials(company?.name ?? user?.full_name ?? "?")}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2">
              <h1 className="text-xl font-extrabold text-sky-950 leading-tight">
                {company?.name ?? "Your business"}
              </h1>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {/* Plan */}
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">
                {planLabel(plan)}
              </span>
              {/* Listing status */}
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${listingStatus.cls}`}>
                {listingStatus.label}
              </span>
              {/* Claim status — only show if not claimed */}
              {plan === "basic" && (
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${claimStatus.cls}`}>
                  {claimStatus.label}
                </span>
              )}
            </div>
            {subStatus && (
              <p className="mt-1.5 text-xs text-slate-500">{subStatus}</p>
            )}

            {/* Completion bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-500">Profile completion</span>
                <span className="text-xs font-bold text-sky-950">{completionPct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-sky-600 transition-all"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col md:items-stretch">
            <Link
              href="/directory/dashboard/profile"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
            >
              Complete profile
            </Link>
            <a
              href={`/directory/company/${company?.slug}`}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Preview listing ↗
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats grid — listing, leads, new leads, subscription ────────── */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">

        {/* Business Listing */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Building2 size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Business listing</span>
          </div>
          <p className="text-lg font-extrabold text-sky-950">{listingStatus.label}</p>
          <Link href="/directory/dashboard/profile" className="mt-2 block text-xs font-semibold text-blue-600 hover:text-blue-700">Edit profile →</Link>
        </div>

        {/* Leads Received */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Inbox size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Leads received</span>
          </div>
          <p className="text-2xl font-extrabold text-sky-950">{leadsReceived}</p>
          <Link href="/directory/dashboard/lead-requests" className="mt-2 block text-xs font-semibold text-blue-600 hover:text-blue-700">View all →</Link>
        </div>

        {/* New Leads */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Sparkles size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">New leads</span>
          </div>
          <p className="text-2xl font-extrabold text-sky-950">{newLeads}</p>
          {newLeads > 0 ? (
            <Link href="/directory/dashboard/lead-requests?view=new" className="mt-2 block text-xs font-semibold text-amber-600 hover:text-amber-700">Review now →</Link>
          ) : (
            <p className="mt-2 text-xs text-slate-400">None new</p>
          )}
        </div>

        {/* Subscription */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <CreditCard size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Subscription</span>
          </div>
          <p className="text-sm font-extrabold text-sky-950">{planLabel(plan)}</p>
          <p className="mt-1 text-xs text-slate-400 leading-4">
            {subStatus ?? (plan === "basic" ? "Free listing" : "Active")}
          </p>
          <Link href="/directory/dashboard/subscription" className="mt-2 block text-xs font-semibold text-blue-600 hover:text-blue-700">Manage →</Link>
        </div>
      </div>

      {/* ── Two-column: Checklist + Recent activity ─────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">

        {/* Profile completion checklist */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <p className="font-bold text-sky-950">Profile checklist</p>
            <p className="text-xs text-slate-400 mt-0.5">{completedCount} of {totalCount} complete</p>
          </div>
          <ul className="divide-y divide-slate-50 px-5">
            {checklist.map(({ label, done, icon: Icon, locked }) => (
              <li key={label} className="flex items-center gap-3 py-3">
                {done ? (
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                ) : locked ? (
                  <Circle size={16} className="shrink-0 text-slate-200" />
                ) : (
                  <Circle size={16} className="shrink-0 text-slate-300" />
                )}
                <Icon size={14} className={`shrink-0 ${done ? "text-emerald-400" : locked ? "text-slate-200" : "text-slate-400"}`} />
                <span className={`flex-1 text-sm ${done ? "text-slate-600 line-through decoration-slate-300" : locked ? "text-slate-300" : "text-slate-700 font-medium"}`}>
                  {label}
                </span>
                {locked && (
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-400">
                    Claimed
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-100 px-5 py-4">
            <Link
              href="/directory/dashboard/profile"
              className="inline-flex w-full items-center justify-center rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-800"
            >
              Complete profile
            </Link>
            {plan === "basic" && (
              <Link
                href="/directory/dashboard/subscription"
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Upgrade to unlock all features
              </Link>
            )}
          </div>
        </div>

        {/* Recent leads */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <p className="font-bold text-sky-950">Recent leads</p>
              {newLeads > 0 && (
                <p className="text-xs font-semibold text-amber-600 mt-0.5">{newLeads} new lead{newLeads > 1 ? "s" : ""} to review</p>
              )}
            </div>
            <Link href="/directory/dashboard/lead-requests" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View all →
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Inbox size={20} className="text-slate-400" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-500">No leads yet</p>
              <p className="mt-1 text-xs text-slate-400">
                Matching quote requests from strata managers and owners will appear here. Contact clients directly to win the work.
              </p>
              {plan === "basic" && (
                <Link
                  href="/directory/dashboard/subscription"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 transition"
                >
                  Upgrade to receive leads
                </Link>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {recentLeads.map((d) => (
                <li key={d.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <Inbox size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{d.request.work_category?.name ?? "Building works"}</p>
                    <p className="text-xs text-slate-400">
                      {d.request.suburb} {d.request.postcode} · {new Date(d.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  {!d.opened_at && (
                    <span className="shrink-0 rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-700">New</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Plan upgrade prompt (basic only) ───────────────────────────── */}
      {plan === "basic" && !claimPending && (
        <div className="overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50">
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <Building2 size={20} className="mt-0.5 shrink-0 text-indigo-600" />
              <div>
                <p className="font-bold text-indigo-900">Upgrade to Silver</p>
                <p className="mt-0.5 text-sm text-indigo-700">
                  Add your logo, photos, licence details, enable quote requests and get verified — from $29/month with a 60-day free trial.
                </p>
              </div>
            </div>
            <Link
              href="/directory/dashboard/subscription"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
            >
              Start free trial
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
