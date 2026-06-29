import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import QuoteRequestForm from "@/components/directory/QuoteRequestForm";
import TrackableContactButtons from "@/components/directory/TrackableContactButtons";

import SiteHeader from "@/components/SiteHeader";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await prisma.company.findFirst({
    where: { slug, status: "published" },
    select: { name: true, description: true, main_category: { select: { name: true } } },
  });
  if (!company) return { title: "Company Not Found" };
  return {
    title: `${company.name} | Strata Building Services Directory`,
    description:
      company.description?.slice(0, 155) ??
      `${company.name} — ${company.main_category?.name ?? "strata building services"} listed on the Strata Building Services Directory.`,
  };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">{label}</p>
      <div className="mt-4">{children}</div>
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
  const [company, parentCategories] = await Promise.all([
    getCompany(slug),
    prisma.category.findMany({
      where: { is_active: true },
      orderBy: { display_order: "asc" },
      select: { id: true, name: true },
    }),
  ]);
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
        take: 4,
      })
    : [];

  const isClaimed = company.plan_type === "claimed" || company.plan_type === "featured";
  const isFeatured = company.plan_type === "featured";
  const canShowContact = isClaimed;
  const location = company.locations[0];

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
    if (location.services_nationwide) serviceAreaParts.push("Australia-wide");
    else if (location.services_statewide) serviceAreaParts.push(`All of ${location.state}`);
    else if (location.states_serviced.length > 0) serviceAreaParts.push(location.states_serviced.join(", "));
    else if (location.service_radius_km) serviceAreaParts.push(`Within ${location.service_radius_km} km`);
  }

  const profileUrl = `https://www.remedialbuildingaustralia.com.au/directory/company/${slug}`;
  const logo = company.logo_url ?? company.media.find((m) => m.media_type === "logo")?.url ?? null;
  const photos = company.media.filter((m) => m.media_type === "photo");
  const abbr = company.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w: string) => w[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Header */}
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <a href="/" className="hover:text-sky-700 transition">Home</a>
            <span>/</span>
            <a href="/directory" className="hover:text-sky-700 transition">Strata Building Services Directory</a>
            <span>/</span>
            <span className="text-sky-950">{company.name}</span>
          </nav>
        </div>
      </div>

      {/* Profile header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* Logo */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-sky-100 overflow-hidden">
              {logo ? (
                <img src={logo} alt={`${company.name} logo`} className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-extrabold text-sky-800">{abbr || "?"}</span>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {company.main_category && (
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                    {company.main_category.name}
                  </span>
                )}
                {secondaryCategories.slice(0, 2).map((cc) => (
                  <span key={cc.id} className="rounded-full border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-700">
                    {cc.category.name}
                  </span>
                ))}
                {isFeatured && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">★ Gold</span>
                )}
                {isClaimed && !isFeatured && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-200">
                    Silver
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-sky-950 md:text-4xl">{company.name}</h1>

              {location && (
                <p className="mt-1.5 text-sm text-slate-500">
                  {[location.suburb, location.state].filter(Boolean).join(", ")}
                  {serviceAreaParts.length > 0 && <span className="ml-2 text-slate-400">· {serviceAreaParts.join(" · ")}</span>}
                </p>
              )}

              {company.description && (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{company.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content + sidebar */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

          {/* LEFT */}
          <div className="space-y-5">

            {/* Contact (claimed profiles only) */}
            {canShowContact && (company.phone || company.website || company.google_business_url) && (
              <Section label="Contact Details">
                <div className="space-y-4">
                  {company.phone && (
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 text-sm">☎</span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone</p>
                        <a href={`tel:${company.phone}`} className="mt-0.5 block font-semibold text-sky-800 hover:text-sky-600">
                          {company.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 text-sm">↗</span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Website</p>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="mt-0.5 block font-semibold text-sky-800 hover:text-sky-600">
                          {company.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  )}
                  {/* Email intentionally not shown — directory displays phone contact only. */}
                </div>
              </Section>
            )}

            {/* About */}
            {(company.description || company.year_established) && (
              <Section label="About This Business">
                {company.description && <p className="text-sm leading-7 text-slate-700">{company.description}</p>}
                {company.year_established && (
                  <div className="mt-5 inline-block rounded-xl bg-slate-50 px-5 py-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Established</p>
                    <p className="mt-1 text-lg font-bold text-sky-950">{company.year_established}</p>
                  </div>
                )}
              </Section>
            )}

            {/* Licence & Insurance details (claimed only, business-provided) */}
            {isClaimed && (company.licence_number || company.licence_type || company.insurance_details) && (
              <Section label="Licence & Insurance Details">
                <p className="mb-4 text-xs text-slate-400 italic">
                  These details are provided by the business and have not been independently checked by this platform.
                </p>
                <div className="space-y-3">
                  {company.licence_number && (
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Licence number</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{company.licence_number}</p>
                      {company.licence_type && <p className="text-xs text-slate-500">{company.licence_type}</p>}
                    </div>
                  )}
                  {company.insurance_details && (
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Insurance details provided</p>
                      <p className="mt-1 text-sm text-slate-700">{company.insurance_details}</p>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Project photos */}
            {photos.length > 0 && (
              <Section label="Project Photos">
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                  {photos.map((p) => (
                    <img key={p.id} src={p.url} alt={p.filename ?? "Project photo"} className="rounded-xl object-cover aspect-square w-full border border-slate-100" />
                  ))}
                </div>
              </Section>
            )}

            {/* Expertise */}
            {hasAnyTags && (
              <Section label="Expertise / Specialisations">
                <div className="space-y-5">
                  {tagsByType.service.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">Services</p>
                      <div className="flex flex-wrap gap-2">{tagsByType.service.map((ct) => <TagChip key={ct.id} label={ct.tag.name} colour="bg-sky-100 text-sky-800" />)}</div>
                    </div>
                  )}
                  {tagsByType.defect.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">Defect Types</p>
                      <div className="flex flex-wrap gap-2">{tagsByType.defect.map((ct) => <TagChip key={ct.id} label={ct.tag.name} colour="bg-rose-100 text-rose-800" />)}</div>
                    </div>
                  )}
                  {tagsByType.repair_system.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">Repair Systems</p>
                      <div className="flex flex-wrap gap-2">{tagsByType.repair_system.map((ct) => <TagChip key={ct.id} label={ct.tag.name} colour="bg-violet-100 text-violet-800" />)}</div>
                    </div>
                  )}
                  {tagsByType.capability.length > 0 && (
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">Capabilities</p>
                      <div className="flex flex-wrap gap-2">{tagsByType.capability.map((ct) => <TagChip key={ct.id} label={ct.tag.name} colour="bg-slate-200 text-slate-700" />)}</div>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Locations */}
            {location && (
              <Section label="Locations Serviced">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 px-5 py-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Based at</p>
                    <p className="mt-1 font-semibold text-sky-950">
                      {[location.suburb, location.city === location.suburb ? null : location.city, location.state, location.postcode].filter(Boolean).join(", ")}
                    </p>
                  </div>
                  {serviceAreaParts.length > 0 && (
                    <div className="rounded-xl bg-slate-50 px-5 py-3.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Coverage</p>
                      <p className="mt-1 font-semibold text-sky-950">{serviceAreaParts.join(" · ")}</p>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Existing licences from DB (if any, for legacy data) */}
            {isClaimed && company.licences.length > 0 && (
              <Section label="Registered Licences">
                <p className="mb-3 text-xs text-slate-400 italic">Licence records below were collected from public sources. Always verify directly with the issuing authority.</p>
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

            {/* Similar companies — hidden on paid (Featured/Business/Premium) profiles
                so a paying business isn't advertising competitors on its own page. */}
            {!isFeatured && similar.length > 0 && (
              <Section label="Similar Companies">
                <div className="space-y-3">
                  {similar.map((c) => {
                    const loc = c.locations[0];
                    return (
                      <a
                        key={c.id}
                        href={`/directory/company/${c.slug}`}
                        className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 transition hover:border-sky-200 hover:bg-sky-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sm font-extrabold text-sky-800">
                          {c.name.split(/\s+/).slice(0, 2).map((w: string) => w[0] ?? "").join("").toUpperCase() || "?"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-sky-950">{c.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {[loc?.suburb, loc?.state].filter(Boolean).join(", ") || c.main_category?.name}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          {c.plan_type === "featured" && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">Featured</span>
                          )}
                          {c.plan_type === "claimed" && (
                            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">Claimed</span>
                          )}
                        </div>
                      </a>
                    );
                  })}
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

            {/* Contact buttons — trackable */}
            {canShowContact && (company.phone || company.website) && (
              <TrackableContactButtons slug={company.slug} phone={company.phone ?? null} website={company.website ?? null} />
            )}

            {/* Profile status (no verified wording) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Profile</p>
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Listing type</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    isFeatured ? "bg-amber-100 text-amber-800" :
                    isClaimed  ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {isFeatured ? "Gold ★" : isClaimed ? "Silver" : "Free Listing"}
                  </span>
                </div>
                {isClaimed && company.licence_number && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Licence details</span>
                    <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700">Provided</span>
                  </div>
                )}
                {isClaimed && company.insurance_details && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Insurance details</span>
                    <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700">Provided</span>
                  </div>
                )}
              </div>

              {/* Claim CTA — only if not claimed */}
              {!isClaimed && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400">Is this your business?</p>
                  <a
                    href={`/directory/claim/${company.slug}`}
                    className="mt-2 block rounded-xl border border-slate-200 px-4 py-2 text-center text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Claim this profile →
                  </a>
                </div>
              )}
            </div>

            {/* Pricing link */}
            <a
              href="/directory/pricing"
              className="block rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              About profile plans →
            </a>

            {/* Share */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Share Profile</p>
              <p className="mt-3 break-all rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500">{profileUrl}</p>
            </div>

            <a href="/directory" className="block rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              ← All Listings
            </a>
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
          <a href="/" className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
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
            <div className="flex flex-col gap-2">
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/contact" className="hover:text-sky-700">Contact</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
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
