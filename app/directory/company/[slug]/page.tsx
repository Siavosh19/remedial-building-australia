import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LeadCaptureForm from "@/components/directory/LeadCaptureForm";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

// ─── Data fetch ──────────────────────────────────────────────────────────────

async function getCompany(slug: string) {
  return prisma.company.findFirst({
    where: { slug, status: "published" },
    include: {
      main_category: true,
      locations: true,
      licences: true,
      company_categories: {
        where: { is_approved: true },
        include: { category: true },
      },
      company_tags: {
        where: { is_approved: true },
        include: { tag: true },
      },
    },
  });
}

type Company = NonNullable<Awaited<ReturnType<typeof getCompany>>>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_RANK: Record<string, number> = {
  basic: 0,
  contact_verified: 1,
  business_verified: 2,
  licence_verified: 3,
  practitioner_verified: 4,
  claimed: 5,
  featured: 6,
};

function contactVisible(company: Company) {
  return (STATUS_RANK[company.profile_status] ?? 0) >= 1;
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    basic: "Basic",
    contact_verified: "Contact Verified",
    business_verified: "Business Verified",
    licence_verified: "Licence Verified",
    practitioner_verified: "Practitioner Verified",
    claimed: "Claimed",
    featured: "Featured",
  };
  return map[status] ?? status;
}

function statusColour(status: string): string {
  if (status === "licence_verified" || status === "practitioner_verified")
    return "bg-emerald-100 text-emerald-800";
  if (status === "business_verified" || status === "contact_verified")
    return "bg-sky-100 text-sky-800";
  if (status === "featured") return "bg-amber-100 text-amber-800";
  if (status === "claimed") return "bg-indigo-100 text-indigo-800";
  return "bg-slate-100 text-slate-600";
}

function licenceStatusBadge(status: string) {
  if (status === "verified")
    return { label: "Verified ✓", cls: "bg-emerald-100 text-emerald-800" };
  if (status === "needs_review")
    return { label: "Pending Review", cls: "bg-amber-100 text-amber-800" };
  if (status === "expired")
    return { label: "Expired", cls: "bg-rose-100 text-rose-800" };
  return { label: "Unverified", cls: "bg-slate-100 text-slate-600" };
}

function formatDate(d: Date | null | undefined) {
  if (!d) return null;
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await prisma.company.findFirst({
    where: { slug, status: "published" },
    select: { name: true, description: true, main_category: { select: { name: true } } },
  });
  if (!company) return { title: "Company Not Found" };
  return {
    title: `${company.name} | Remedial Building Australia Directory`,
    description:
      company.description?.slice(0, 155) ??
      `${company.name} — ${company.main_category?.name ?? "remedial building"} contractor listed on Remedial Building Australia.`,
  };
}

// ─── Section card wrapper ─────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">{label}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function TagChip({ label, colour = "bg-sky-100 text-sky-800" }: { label: string; colour?: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colour}`}>
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CompanyProfilePage({ params }: Props) {
  const { slug } = await params;
  const [company, parentCategories] = await Promise.all([
    getCompany(slug),
    prisma.category.findMany({
      where: { is_active: true, parent_id: null },
      orderBy: { display_order: "asc" },
      select: { id: true, name: true },
    }),
  ]);
  if (!company) notFound();

  const canShowContact = contactVisible(company);
  const location = company.locations[0];
  const hasLicenceVerified = company.licences.some((l) => l.status === "verified");

  const tagsByType = {
    service: company.company_tags.filter((t) => t.tag.tag_type === "service"),
    defect: company.company_tags.filter((t) => t.tag.tag_type === "defect"),
    repair_system: company.company_tags.filter((t) => t.tag.tag_type === "repair_system"),
    capability: company.company_tags.filter((t) => t.tag.tag_type === "capability"),
  };
  const hasAnyTags = Object.values(tagsByType).some((arr) => arr.length > 0);

  const secondaryCategories = company.company_categories.filter(
    (cc) => cc.category_id !== company.main_category_id
  );

  const serviceAreaParts: string[] = [];
  if (location) {
    if (location.services_nationwide) {
      serviceAreaParts.push("Australia-wide");
    } else if (location.services_statewide) {
      serviceAreaParts.push(`All of ${location.state}`);
    } else if (location.states_serviced.length > 0) {
      serviceAreaParts.push(location.states_serviced.join(", "));
    } else if (location.service_radius_km) {
      serviceAreaParts.push(`Within ${location.service_radius_km} km`);
    }
  }

  const profileUrl = `https://www.remedialbuildingaustralia.com.au/directory/company/${slug}`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* ── Site header ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap transition hover:text-red-700">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>
          <a
            href="/directory/login"
            className="hidden shrink-0 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:inline-flex"
          >
            Business Login
          </a>
        </div>
      </header>

      {/* ── Back nav ──────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-4">
          <a
            href="/directory"
            className="text-sm font-semibold text-sky-800 transition hover:text-red-700"
          >
            ← Back to Directory
          </a>
        </div>
      </div>

      {/* ── Company header banner ─────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-12">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            {company.is_featured && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                ★ Featured
              </span>
            )}
            {company.main_category && (
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                {company.main_category.name}
              </span>
            )}
            {secondaryCategories.slice(0, 2).map((cc) => (
              <span
                key={cc.id}
                className="rounded-full border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-700"
              >
                {cc.category.name}
              </span>
            ))}
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColour(company.profile_status)}`}>
              {statusLabel(company.profile_status)}
            </span>
            {hasLicenceVerified && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                Licence Verified ✓
              </span>
            )}
          </div>

          {/* Company name */}
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-sky-950 md:text-5xl">
            {company.name}
          </h1>

          {/* Location + claimed */}
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {location && (
              <span className="text-base text-slate-500">
                {[location.suburb, location.state].filter(Boolean).join(", ")}
              </span>
            )}
            {company.is_claimed ? (
              <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-200">
                <span className="text-indigo-500">✓</span> Claimed Profile
              </span>
            ) : (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                Unclaimed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content + sidebar ────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* ── LEFT: sections ──────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Contact Details */}
            {(canShowContact && (company.phone || company.website || company.google_business_url)) ||
             (company.is_claimed && company.email) ? (
              <Section label="Contact Details">
                <div className="space-y-4">
                  {canShowContact && company.phone && (
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 text-sm">
                        ☎
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</p>
                        <a
                          href={`tel:${company.phone}`}
                          className="mt-0.5 block font-semibold text-sky-800 hover:text-sky-600"
                        >
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {canShowContact && company.website && (
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 text-sm">
                        ↗
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Website</p>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block font-semibold text-sky-800 hover:text-sky-600"
                        >
                          {company.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  )}
                  {company.is_claimed && company.email && (
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 text-sm">
                        @
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</p>
                        <a
                          href={`mailto:${company.email}`}
                          className="mt-0.5 block font-semibold text-sky-800 hover:text-sky-600"
                        >
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {company.google_business_url && (
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 text-sm">
                        ◎
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Google Business</p>
                        <a
                          href={company.google_business_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block font-semibold text-sky-800 hover:text-sky-600"
                        >
                          View on Google →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            ) : null}

            {/* About */}
            {(company.description || company.year_established || serviceAreaParts.length > 0) && (
              <Section label="About This Business">
                {company.description && (
                  <p className="text-base leading-7 text-slate-700">{company.description}</p>
                )}
                {(company.year_established || serviceAreaParts.length > 0) && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {company.year_established && (
                      <div className="rounded-2xl bg-slate-50 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Established</p>
                        <p className="mt-1 text-lg font-bold text-sky-950">{company.year_established}</p>
                      </div>
                    )}
                    {serviceAreaParts.length > 0 && (
                      <div className="rounded-2xl bg-slate-50 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Service Area</p>
                        <p className="mt-1 font-semibold text-sky-950">{serviceAreaParts.join(" · ")}</p>
                      </div>
                    )}
                    {location?.service_radius_km && !location.services_statewide && !location.services_nationwide && (
                      <div className="rounded-2xl bg-slate-50 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Radius</p>
                        <p className="mt-1 font-semibold text-sky-950">{location.service_radius_km} km</p>
                      </div>
                    )}
                  </div>
                )}
              </Section>
            )}

            {/* Specialisations */}
            {hasAnyTags && (
              <Section label="Specialisations">
                <div className="space-y-6">
                  {tagsByType.service.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Services
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tagsByType.service.map((ct) => (
                          <TagChip key={ct.id} label={ct.tag.name} colour="bg-sky-100 text-sky-800" />
                        ))}
                      </div>
                    </div>
                  )}
                  {tagsByType.defect.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Defect Types
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tagsByType.defect.map((ct) => (
                          <TagChip key={ct.id} label={ct.tag.name} colour="bg-rose-100 text-rose-800" />
                        ))}
                      </div>
                    </div>
                  )}
                  {tagsByType.repair_system.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Repair Systems
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tagsByType.repair_system.map((ct) => (
                          <TagChip key={ct.id} label={ct.tag.name} colour="bg-violet-100 text-violet-800" />
                        ))}
                      </div>
                    </div>
                  )}
                  {tagsByType.capability.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Capabilities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tagsByType.capability.map((ct) => (
                          <TagChip key={ct.id} label={ct.tag.name} colour="bg-slate-200 text-slate-700" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Licences */}
            {company.licences.length > 0 && (
              <Section label="Licences">
                <div className="space-y-4">
                  {company.licences.map((licence) => {
                    const badge = licenceStatusBadge(licence.status);
                    return (
                      <div
                        key={licence.id}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-sky-950">
                              {licence.licence_number}
                            </p>
                            {licence.licence_class && (
                              <p className="mt-0.5 text-sm text-slate-600">{licence.licence_class}</p>
                            )}
                          </div>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${badge.cls}`}>
                            {badge.label}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                          {licence.licence_authority && (
                            <span>
                              <span className="font-semibold text-slate-600">Authority: </span>
                              {licence.licence_authority}
                            </span>
                          )}
                          {licence.licence_state && (
                            <span>
                              <span className="font-semibold text-slate-600">State: </span>
                              {licence.licence_state}
                            </span>
                          )}
                          {licence.verification_date && (
                            <span>
                              <span className="font-semibold text-slate-600">Verified: </span>
                              {formatDate(licence.verification_date)}
                            </span>
                          )}
                          {licence.last_checked_date && (
                            <span>
                              <span className="font-semibold text-slate-600">Last checked: </span>
                              {formatDate(licence.last_checked_date)}
                            </span>
                          )}
                          {licence.verification_source_url && (
                            <a
                              href={licence.verification_source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-sky-700 hover:text-sky-500"
                            >
                              Verify licence →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Categories */}
            {(company.main_category || secondaryCategories.length > 0) && (
              <Section label="Categories">
                <div className="flex flex-wrap gap-2">
                  {company.main_category && (
                    <span className="flex items-center gap-1.5 rounded-full bg-sky-950 px-4 py-1.5 text-sm font-semibold text-white">
                      <span className="text-sky-400 text-xs">●</span>
                      {company.main_category.name}
                    </span>
                  )}
                  {secondaryCategories.map((cc) => (
                    <span
                      key={cc.id}
                      className="rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-semibold text-sky-800"
                    >
                      {cc.category.name}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Location */}
            {location && (
              <Section label="Location">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Address</p>
                    <p className="mt-1.5 font-semibold text-sky-950">
                      {[location.suburb, location.city, location.state, location.postcode]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                  {serviceAreaParts.length > 0 && (
                    <div className="rounded-2xl bg-slate-50 px-5 py-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Coverage</p>
                      <p className="mt-1.5 font-semibold text-sky-950">
                        {serviceAreaParts.join(" · ")}
                      </p>
                    </div>
                  )}
                  {location.states_serviced.length > 0 && (
                    <div className="sm:col-span-2 rounded-2xl bg-slate-50 px-5 py-4">
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                        States Serviced
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {location.states_serviced.map((s) => (
                          <span
                            key={s}
                            className="rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Claim prompt (main) — only on mobile or when unclaimed */}
            {!company.is_claimed && (
              <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
                <p className="text-lg font-bold text-sky-950">Is this your business?</p>
                <p className="mt-2 text-sm text-slate-600">
                  Claim this profile to manage your listing, update your details, and respond to leads.
                </p>
                <a
                  href={`/directory/claim/${company.slug}`}
                  className="mt-6 inline-flex rounded-xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                >
                  Claim this profile →
                </a>
              </div>
            )}
          </div>

          {/* ── RIGHT: sidebar ──────────────────────────────────────────── */}
          <aside className="space-y-5">

            {/* Contact buttons */}
            {canShowContact && (company.phone || company.website) && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                  Get in Touch
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {company.phone && (
                    <a
                      href={`tel:${company.phone}`}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-sky-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                    >
                      <span>☎</span> Call {company.phone}
                    </a>
                  )}
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <span>↗</span> Visit Website
                    </a>
                  )}
                  {company.is_claimed && company.email && (
                    <a
                      href={`mailto:${company.email}`}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <span>@</span> Send Email
                    </a>
                  )}
                  {company.google_business_url && (
                    <a
                      href={company.google_business_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <span>◎</span> Google Business
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Request a Quote */}
            <div className="rounded-3xl border border-sky-100 bg-sky-950 p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                Get a Quote
              </p>
              <p className="mt-2 text-sm leading-6 text-sky-200">
                Send an enquiry directly to {company.name} and they will contact you.
              </p>
              <div className="mt-4">
                <LeadCaptureForm
                  categories={parentCategories}
                  companyName={company.name}
                  companySlug={company.slug}
                  triggerLabel="Request a Quote"
                  triggerClassName="w-full flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-sky-950 transition hover:bg-sky-50"
                />
              </div>
            </div>

            {/* Profile status */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                Profile Status
              </p>
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Verification</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColour(company.profile_status)}`}>
                    {statusLabel(company.profile_status)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Profile</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${company.is_claimed ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-500"}`}>
                    {company.is_claimed ? "Claimed ✓" : "Unclaimed"}
                  </span>
                </div>
                {hasLicenceVerified && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Licence</span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      Verified ✓
                    </span>
                  </div>
                )}
                {company.is_featured && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Listing</span>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      Featured ★
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Share profile */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                Share Profile
              </p>
              <p className="mt-3 break-all rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
                {profileUrl}
              </p>
              <a
                href={profileUrl}
                className="mt-3 block text-center text-xs font-semibold text-sky-700 hover:text-sky-500"
              >
                Copy link from address bar
              </a>
            </div>

            {/* Claim prompt (sidebar) */}
            {!company.is_claimed && (
              <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-6">
                <p className="text-sm font-bold text-sky-950">Is this your business?</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Claim this profile to manage your listing and receive leads.
                </p>
                <a
                  href={`/directory/claim/${company.slug}`}
                  className="mt-4 block rounded-xl bg-sky-950 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-800"
                >
                  Claim this profile →
                </a>
              </div>
            )}

            {/* Back to directory */}
            <a
              href="/directory"
              className="block rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              ← All Listings
            </a>
          </aside>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">Industry News</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
