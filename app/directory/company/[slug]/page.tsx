import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import QuoteRequestForm from "@/components/directory/QuoteRequestForm";
import TrackableContactButtons from "@/components/directory/TrackableContactButtons";
import SiteHeader from "@/components/SiteHeader";
import { buildProfileMetadata, type SeoCompany } from "@/lib/seo/business-profile";
import { profileJsonLd } from "@/lib/seo/schema";

// Real brand marks (lucide dropped its brand icons) — official colours + white glyph.
const FB_PATH = "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z";
const IG_PATH = "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.41-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z";
const LI_PATH = "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z";

function SocialLink({ url, path, bg }: { url: string | null | undefined; path: string; bg: string }) {
  const inner = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] text-white" aria-hidden>
      <path d={path} />
    </svg>
  );
  const cls = `flex h-10 w-10 items-center justify-center rounded-full ${bg}`;
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:opacity-90`}>
      {inner}
    </a>
  ) : (
    <span className={`${cls} opacity-40`}>{inner}</span>
  );
}
export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

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
      media: {
        orderBy: [{ media_type: "asc" }, { sort_order: "asc" }],
      },
    },
  });
}

type Company = NonNullable<Awaited<ReturnType<typeof getCompany>>>;

function formatDate(d: Date | null | undefined) {
  if (!d) return null;
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));
}

// Project a company row into the SeoCompany shape the SEO helper expects. Shared
// by generateMetadata and the sitemap so the indexing gate stays consistent.
function toSeoCompany(
  c: {
    slug: string; name: string; description: string | null; full_description: string | null;
    services_offered: string | null; logo_url: string | null; website: string | null; phone: string | null;
    licence_number: string | null; insurance_details: string | null; plan_type: string;
    main_category: { name: string | null; slug: string | null } | null;
    locations: SeoLocationRow[];
    _count?: { company_tags: number };
  },
): SeoCompany {
  return {
    slug: c.slug,
    name: c.name,
    description: c.description,
    full_description: c.full_description,
    services_offered: c.services_offered,
    logo_url: c.logo_url,
    website: c.website,
    phone: c.phone,
    licence_number: c.licence_number,
    insurance_details: c.insurance_details,
    plan_type: c.plan_type,
    main_category: c.main_category,
    locations: c.locations,
    approvedTagCount: c._count?.company_tags ?? 0,
  };
}

type SeoLocationRow = {
  suburb: string | null; state: string | null; postcode: string | null;
  services_nationwide: boolean; services_statewide: boolean;
  states_serviced: string[]; service_radius_km: number | null;
};

const SEO_SELECT = {
  slug: true, name: true, description: true, full_description: true, services_offered: true,
  logo_url: true, website: true, phone: true, licence_number: true, insurance_details: true,
  plan_type: true,
  main_category: { select: { name: true, slug: true } },
  locations: {
    take: 1,
    select: {
      suburb: true, state: true, postcode: true,
      services_nationwide: true, services_statewide: true, states_serviced: true, service_radius_km: true,
    },
  },
  _count: { select: { company_tags: { where: { is_approved: true } } } },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await prisma.company.findFirst({
    where: { slug, status: "published" },
    select: SEO_SELECT,
  });
  if (!company) return { title: "Company Not Found" };
  return buildProfileMetadata(toSeoCompany(company));
}

// Uniform section label — small accent bar + uppercase letter-spaced heading.
function SectionLabel({ label, tone = "red" }: { label: string; tone?: "red" | "slate" }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`h-3.5 w-1 rounded-full ${tone === "red" ? "bg-red-600" : "bg-slate-300"}`} />
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${tone === "red" ? "text-red-700" : "text-slate-400"}`}>{label}</p>
    </div>
  );
}

// The shared content-card shell — identical radius, border, shadow, background.
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <SectionLabel label={label} />
      <div className="mt-4">{children}</div>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/40 px-4 py-10 text-center text-sm text-slate-400">
      {children}
    </div>
  );
}

function ContactField({ label, value, href }: { label: string; value?: string | null; href?: string | null }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/40 px-4 py-3">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      {value ? (
        href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="mt-0.5 block truncate text-sm font-semibold text-sky-800 hover:text-sky-600"
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">{value}</p>
        )
      ) : (
        <p className="mt-0.5 text-sm text-slate-400">Not provided</p>
      )}
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

const DISCLAIMER =
  "Directory listings are provided for information only. Remedial Building Australia does not endorse, certify, verify, warrant, or guarantee any listed business. Users should make their own enquiries and check licences, insurance, experience, references, and suitability before engaging any provider.";

export default async function CompanyProfilePage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) notFound();

  // Track profile view
  prisma.company.update({
    where: { id: company.id },
    data: { profile_views: { increment: 1 } },
  }).catch(() => {});

  const similar = company.main_category_id
    ? await prisma.company.findMany({
        where: { status: "published", main_category_id: company.main_category_id, id: { not: company.id } },
        select: {
          id: true, slug: true, name: true, plan_type: true, is_claimed: true, is_featured: true,
          main_category: { select: { name: true } },
          locations: { take: 1, select: { suburb: true, state: true } },
        },
        orderBy: [{ plan_type: "desc" }, { confidence_score: "desc" }],
        take: 6,
      })
    : [];

  const isClaimed = company.plan_type === "claimed" || company.plan_type === "featured";
  const isFeatured = company.plan_type === "featured";
  const canShowContact = isClaimed;
  const location = company.locations[0];

  // ── Structured data (LocalBusiness + Organization + BreadcrumbList) ──────────
  // Contact fields are only emitted when they're actually rendered (canShowContact),
  // so the structured data mirrors the visible page.
  const seoCompany: SeoCompany = {
    slug: company.slug,
    name: company.name,
    description: company.description,
    full_description: company.full_description,
    website: company.website,
    phone: company.phone,
    logo_url: isClaimed ? company.logo_url : null,
    main_category: company.main_category ? { name: company.main_category.name, slug: company.main_category.slug } : null,
    locations: company.locations,
  };
  const jsonLd = profileJsonLd(seoCompany, { showContact: canShowContact });

  const tagsByType = {
    service: company.company_tags.filter((t) => t.tag.tag_type === "service"),
    defect: company.company_tags.filter((t) => t.tag.tag_type === "defect"),
    repair_system: company.company_tags.filter((t) => t.tag.tag_type === "repair_system"),
    capability: company.company_tags.filter((t) => t.tag.tag_type === "capability"),
  };
  const hasExtraExpertise =
    tagsByType.defect.length > 0 || tagsByType.repair_system.length > 0 || tagsByType.capability.length > 0;

  const serviceAreaParts: string[] = [];
  if (location) {
    if (location.services_nationwide) serviceAreaParts.push("Australia-wide");
    else if (location.services_statewide) serviceAreaParts.push(`All of ${location.state}`);
    else if (location.states_serviced.length > 0) serviceAreaParts.push(location.states_serviced.join(", "));
    else if (location.service_radius_km) serviceAreaParts.push(`Within ${location.service_radius_km} km`);
  }

  const profileUrl = `https://www.remedialbuildingaustralia.com.au/directory/company/${slug}`;
  // Logo and project photos are Silver+ features — never shown on a Free (basic) profile.
  const logo = isClaimed ? (company.logo_url ?? company.media.find((m) => m.media_type === "logo")?.url ?? null) : null;
  const photos = isClaimed ? company.media.filter((m) => m.media_type === "photo") : [];
  const abbr = company.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w: string) => w[0] ?? "")
    .join("")
    .toUpperCase();

  // Location strings — suburb, state (+ postcode where required). Falls back to
  // state alone when the suburb isn't known.
  const locLabel = [location?.suburb, location?.state].filter(Boolean).join(", ");
  const basedAt = location ? [location.suburb, location.state, location.postcode].filter(Boolean).join(", ") : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Header */}
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-sky-700 transition">Home</Link>
            <span>/</span>
            <Link href="/directory" className="hover:text-sky-700 transition">Strata Building Services Directory</Link>
            <span>/</span>
            <span className="text-sky-950">{company.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content + sidebar — hero and every card share the same container edges */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Hero card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-5 py-6 shadow-sm sm:px-10 sm:py-8">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-sky-500 to-indigo-400" aria-hidden />
          {/* Category pill(s) — flush left on phones; aligned with the name on desktop */}
          <div className="mb-2 flex flex-wrap items-center gap-2 sm:pl-[84px]">
            {company.main_category && (
              <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700">
                {company.main_category.name}
              </span>
            )}
          </div>

          {/* Logo top-aligned with the name on phones; vertically centred on desktop */}
          <div className="flex flex-wrap items-start gap-4 sm:items-center sm:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700">
              {logo ? (
                <img src={logo} alt={`${company.name} logo`} className="h-full w-full object-cover" />
              ) : (
                <span>{abbr || "?"}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-serif text-3xl font-semibold leading-tight text-sky-950 md:text-4xl">
                {company.name}
                {locLabel && (
                  <span className="ml-2 font-sans text-lg font-medium text-slate-400">({locLabel})</span>
                )}
              </h1>
              {company.tagline && (
                <p className="mt-1 font-sans text-base font-medium text-slate-500">{company.tagline}</p>
              )}
            </div>

            {/* Claim CTA — desktop: inline far right of the header (unclaimed only) */}
            {!isClaimed && (
              <Link
                href={`/directory/claim/${company.slug}`}
                className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-xl border-2 border-red-700 bg-red-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 hover:border-red-800 sm:inline-flex"
              >
                Claim this profile →
              </Link>
            )}
          </div>

          {/* Claim CTA — phone: own line, bottom-right of the card (unclaimed only) */}
          {!isClaimed && (
            <div className="mt-5 flex justify-end sm:hidden">
              <Link
                href={`/directory/claim/${company.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-red-700 bg-red-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 hover:border-red-800"
              >
                Claim this profile →
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* LEFT — standard content cards, always shown with empty states */}
          <div className="space-y-5">

            {/* Contact Details — kept at the top so visitors see phone / email /
                website first (same details shown on the directory search card) */}
            <Section label="Contact Details">
              <div className="grid gap-3 sm:grid-cols-2">
                <ContactField
                  label="Phone"
                  value={company.phone}
                  href={company.phone ? `tel:${company.phone}` : null}
                />
                <ContactField
                  label="Email"
                  value={company.email || null}
                  href={company.email ? `mailto:${company.email}` : null}
                />
                <ContactField
                  label="Website"
                  value={company.website ? company.website.replace(/^https?:\/\//, "") : null}
                  href={company.website ?? null}
                />
                <ContactField label="ABN" value={company.abn ?? null} />
              </div>
            </Section>

            {/* About This Company */}
            <Section label="About This Company">
              {(company.full_description || company.description) ? (
                <p className="whitespace-pre-line text-base leading-8 text-slate-700 md:text-lg">{company.full_description || company.description}</p>
              ) : (
                <EmptyState>No description added yet.</EmptyState>
              )}
              {company.year_established && (
                <div className="mt-5 inline-block rounded-xl bg-slate-50 px-5 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Established</p>
                  <p className="mt-1 text-lg font-bold text-sky-950">{company.year_established}</p>
                </div>
              )}
            </Section>

            {/* Photos */}
            <Section label="Photos">
              {photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {photos.map((p) => (
                    <img key={p.id} src={p.url} alt={p.filename ?? "Project photo"} className="aspect-square w-full rounded-xl border border-slate-100 object-cover" />
                  ))}
                </div>
              ) : (
                <EmptyState>No photos added yet.</EmptyState>
              )}
            </Section>

            {/* Services Offered — business-typed text takes priority, else tags */}
            <Section label="Services Offered">
              {company.services_offered ? (
                <p className="whitespace-pre-line text-base leading-8 text-slate-700">{company.services_offered}</p>
              ) : tagsByType.service.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tagsByType.service.map((ct) => <TagChip key={ct.id} label={ct.tag.name} colour="bg-sky-100 text-sky-800" />)}
                </div>
              ) : (
                <EmptyState>No services listed yet.</EmptyState>
              )}
            </Section>

            {/* Additional expertise (claimed profiles with defect / repair / capability tags) */}
            {hasExtraExpertise && (
              <Section label="Expertise / Specialisations">
                <div className="space-y-5">
                  {tagsByType.defect.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Defect Types</p>
                      <div className="flex flex-wrap gap-2">{tagsByType.defect.map((ct) => <TagChip key={ct.id} label={ct.tag.name} colour="bg-rose-100 text-rose-800" />)}</div>
                    </div>
                  )}
                  {tagsByType.repair_system.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Repair Systems</p>
                      <div className="flex flex-wrap gap-2">{tagsByType.repair_system.map((ct) => <TagChip key={ct.id} label={ct.tag.name} colour="bg-violet-100 text-violet-800" />)}</div>
                    </div>
                  )}
                  {tagsByType.capability.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Capabilities</p>
                      <div className="flex flex-wrap gap-2">{tagsByType.capability.map((ct) => <TagChip key={ct.id} label={ct.tag.name} colour="bg-slate-200 text-slate-700" />)}</div>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Licence & Insurance (claimed, business-provided) */}
            {isClaimed && (company.licence_number || company.licence_type || company.insurance_details) && (
              <Section label="Licence & Insurance Details">
                <p className="mb-4 text-xs italic text-slate-400">
                  These details are provided by the business and have not been independently checked by this platform.
                </p>
                <div className="space-y-3">
                  {company.licence_number && (
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Licence number</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{company.licence_number}</p>
                      {company.licence_type && <p className="text-xs text-slate-500">{company.licence_type}</p>}
                    </div>
                  )}
                  {company.insurance_details && (
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Insurance details provided</p>
                      <p className="mt-1 text-sm text-slate-700">{company.insurance_details}</p>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Registered licences (legacy public-source records, claimed) */}
            {isClaimed && company.licences.length > 0 && (
              <Section label="Registered Licences">
                <p className="mb-3 text-xs italic text-slate-400">Licence records below were collected from public sources. Always verify directly with the issuing authority.</p>
                <div className="space-y-3">
                  {company.licences.map((licence) => (
                    <div key={licence.id} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-sky-950">{licence.licence_number}</p>
                          {licence.licence_class && <p className="mt-0.5 text-sm text-slate-600">{licence.licence_class}</p>}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                        {licence.licence_authority && <span><span className="font-semibold text-slate-600">Authority: </span>{licence.licence_authority}</span>}
                        {licence.licence_state && <span><span className="font-semibold text-slate-600">State: </span>{licence.licence_state}</span>}
                        {licence.verification_date && <span><span className="font-semibold text-slate-600">Date checked: </span>{formatDate(licence.verification_date)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* RIGHT sidebar */}
          <aside className="space-y-4">

            {/* Quote request — claimed/featured only */}
            {isClaimed && company.quote_requests_enabled && (
              <div className="rounded-2xl border border-sky-100 bg-sky-950 p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Request a Quote</p>
                <p className="mt-2 text-sm leading-6 text-sky-200">
                  Send an enquiry directly to {company.name}.
                </p>
                <div className="mt-4">
                  <QuoteRequestForm companySlug={company.slug} companyName={company.name} />
                </div>
              </div>
            )}

            {/* Contact buttons — trackable (claimed) */}
            {canShowContact && (company.phone || company.website) && (
              <TrackableContactButtons slug={company.slug} phone={company.phone ?? null} website={company.website ?? null} />
            )}

            {/* Profile */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionLabel label="Profile" />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-600">Listing type</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  isFeatured ? "bg-amber-100 text-amber-800" : isClaimed ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
                }`}>
                  {isFeatured ? "Gold ★" : isClaimed ? "Silver" : "Basic"}
                </span>
              </div>
            </div>

            {/* Follow — real brand marks, centred */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionLabel label="Follow" />
              <div className="mt-4 flex justify-center gap-4">
                <SocialLink url={company.facebook_url} path={FB_PATH} bg="bg-[#1877F2]" />
                <SocialLink url={company.instagram_url} path={IG_PATH} bg="bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]" />
                <SocialLink url={company.linkedin_url} path={LI_PATH} bg="bg-[#0A66C2]" />
              </div>
            </div>

            {/* Share */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionLabel label="Share Profile" />
              <p className="mt-3 break-all rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500">{profileUrl}</p>
            </div>

            {/* Related businesses — vertical, no scroll bar. Hidden on Gold profiles so
                a paying business isn't advertising competitors on its own page. */}
            {!isFeatured && similar.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionLabel label="Related Businesses" tone="slate" />
                <div className="mt-4 space-y-2.5">
                  {similar.map((c) => {
                    const loc = c.locations[0];
                    const ab = c.name.split(/\s+/).slice(0, 2).map((w: string) => w[0] ?? "").join("").toUpperCase() || "?";
                    return (
                      <Link
                        key={c.id}
                        href={`/directory/company/${c.slug}`}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-sky-200 hover:bg-sky-50"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-xs font-extrabold text-sky-800">{ab}</div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-sky-950">{c.name}</p>
                          <p className="truncate text-xs text-slate-500">
                            {[loc?.suburb, loc?.state].filter(Boolean).join(", ") || c.main_category?.name}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All listings */}
            <Link
              href="/directory"
              className="block rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              ← All Listings
            </Link>
          </aside>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-xs text-amber-900">
          {DISCLAIMER}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/" className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            ← Home
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
