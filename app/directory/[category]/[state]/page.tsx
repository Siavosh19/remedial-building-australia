import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LocationState } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/SiteHeader";
import { STATE_NAMES, STATE_CODES } from "@/lib/au-locations";
import { DIRECTORY_DISCLAIMER } from "@/lib/legal";

export const revalidate = 3600; // ISR — render on demand, cache for an hour

const SITE = "https://www.remedialbuildingaustralia.com.au";
type Props = { params: Promise<{ category: string; state: string }> };

const planOrder = (p: string) => (p === "featured" ? 0 : p === "claimed" ? 1 : 2);

async function getData(categorySlug: string, stateCode: string) {
  const state = stateCode.toUpperCase();
  if (!(STATE_CODES as readonly string[]).includes(state)) return null;
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    select: { id: true, name: true, slug: true },
  });
  if (!category) return null;

  const companies = await prisma.company.findMany({
    where: {
      status: "published",
      suspended: false,
      OR: [
        { main_category_id: category.id },
        { company_categories: { some: { is_approved: true, category_id: category.id } } },
      ],
      locations: { some: { state: state as LocationState } },
    },
    select: {
      id: true, slug: true, name: true, logo_url: true, plan_type: true, description: true,
      locations: { take: 1, select: { suburb: true, state: true } },
    },
    take: 60,
  });
  companies.sort((a, b) => planOrder(a.plan_type) - planOrder(b.plan_type) || a.name.localeCompare(b.name));

  return { category, state, stateName: STATE_NAMES[state] ?? state, companies };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, state } = await params;
  const data = await getData(category, state);
  if (!data) return { title: "Not found" };
  const title = `${data.category.name} in ${data.stateName} | Remedial Building Australia`;
  const description = `Find ${data.category.name.toLowerCase()} servicing ${data.stateName}. Compare ${data.companies.length}+ businesses, view profiles and request quotes directly.`;
  const url = `${SITE}/directory/${data.category.slug}/${state.toLowerCase()}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: "Remedial Building Australia" },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryStatePage({ params }: Props) {
  const { category, state } = await params;
  const data = await getData(category, state);
  if (!data) notFound();
  const { category: cat, stateName, companies } = data;
  const stateLower = state.toLowerCase();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Directory", item: `${SITE}/directory` },
      { "@type": "ListItem", position: 3, name: cat.name, item: `${SITE}/directory/${cat.slug}/${stateLower}` },
    ],
  };

  const faqs = [
    { q: `How do I find ${cat.name.toLowerCase()} in ${stateName}?`, a: `Browse the businesses listed below, open a company profile to view their details, and request quotes from the ones servicing your area.` },
    { q: `Are these businesses verified?`, a: `Businesses manage their own profiles and licence/insurance details are self-declared. Always complete your own due diligence before engaging a contractor.` },
    { q: `How much does it cost to request a quote?`, a: `Requesting quotes is free for clients. Create a client account, submit your project, and choose up to 5 businesses to contact you directly.` },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/">Home</Link> <span>/</span>
          <Link href="/directory">Directory</Link> <span>/</span>
          <span className="text-sky-950">{cat.name} — {stateName}</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-sky-950 md:text-4xl">{cat.name} in {stateName}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Compare {cat.name.toLowerCase()} servicing {stateName}. View detailed company profiles, see service areas, and
          request quotes directly from businesses that cover your location.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/directory?category=${cat.slug}`} className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800">
            Search the directory →
          </Link>
          <Link href="/request-quotes" className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
            Request quotes →
          </Link>
        </div>

        {/* Businesses */}
        <h2 className="mt-10 text-xl font-bold text-slate-900">{cat.name} businesses in {stateName} ({companies.length})</h2>
        {companies.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No businesses listed for this category in {stateName} yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {companies.map((c) => (
              <li key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sky-100 text-sm font-extrabold text-sky-800">
                    {c.logo_url ? <img src={c.logo_url} alt={`${c.name} logo`} className="h-full w-full object-cover" /> : c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                    <p className="text-xs text-slate-500">{[c.locations[0]?.suburb, c.locations[0]?.state].filter(Boolean).join(", ")}</p>
                    {c.description && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{c.description}</p>}
                  </div>
                  <Link href={`/directory/company/${c.slug}`} className="shrink-0 rounded-xl bg-sky-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-800">
                    View Profile →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* This category in other states */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">{cat.name} in other states</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATE_CODES.filter((s) => s !== state.toUpperCase()).map((s) => (
            <Link key={s} href={`/directory/${cat.slug}/${s.toLowerCase()}`} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-800">
              {cat.name} in {STATE_NAMES[s] ?? s}
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mt-10 text-xl font-bold text-slate-900">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="font-semibold text-slate-900">{f.q}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs leading-6 text-slate-400">{DIRECTORY_DISCLAIMER}</p>
      </div>
    </div>
  );
}
