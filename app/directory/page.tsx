import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DirectoryListing from "@/components/directory/DirectoryListing";
import DirectoryPromoBanner from "@/components/directory/DirectoryPromoBanner";

import SiteHeader from "@/components/SiteHeader";
export const metadata: Metadata = {
  title: "AI-Powered Construction & Building Directory Australia | Find the Right Trade",
  description:
    "Australia's AI-powered directory for construction and building businesses. Describe your job in plain English — our AI finds the right trade and the builders, contractors, engineers, consultants and suppliers servicing your area, then request quotes directly.",
  alternates: { canonical: "/directory" },
  openGraph: {
    title: "AI-Powered Construction & Building Directory Australia",
    description:
      "Describe your building job in plain English and our AI matches you to the right contractors, engineers, consultants and suppliers across Australia.",
    url: "/directory",
    type: "website",
  },
};

export const revalidate = 60;

export default async function DirectoryPage() {
  // The directory shows NO listings until the visitor searches or filters.
  // We only need the category list for the filter UI here; businesses are fetched
  // on demand by the client via /api/directory/search once a search is performed.
  let categories: { id: number; name: string; slug: string }[] = [];

  try {
    categories = await prisma.category.findMany({
      where: { is_active: true },
      orderBy: { display_order: "asc" },
      select: { id: true, name: true, slug: true, parent_id: true },
    });
  } catch {
    // DB unavailable — render with empty state
  }

  // Real, exact published-business count for the stats bar.
  let publishedCount = 0;
  try { publishedCount = await prisma.company.count({ where: { status: "published" } }); } catch { /* ignore */ }
  const listedLabel = publishedCount > 0 ? publishedCount.toLocaleString("en-AU") : "12,900+";

  const SITE_URL = "https://www.remedialbuildingaustralia.com.au";
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/directory#webpage`,
    name: "AI-Powered Construction & Building Directory Australia",
    description:
      "Australia's AI-powered directory for construction and building businesses. Describe your job in plain English and the AI matches you to the right builders, contractors, engineers, consultants and suppliers servicing your area.",
    url: `${SITE_URL}/directory`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/directory?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />

      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
            AI-Powered Directory &amp; Quote Request Platform
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-sky-950 md:text-5xl">
            Australia&rsquo;s AI-Powered Building &amp; Construction Directory
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Don&rsquo;t know the trade name? Just describe the job and our AI finds the right people. Search builders,
            contractors, engineers, consultants, suppliers and specialist contractors across Australia, compare
            profiles, and request quotes directly from businesses servicing your area.
          </p>

          {/* Stats bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-slate-100 pt-5 text-center text-sm">
            <span>
              <span className="font-extrabold text-sky-950">{listedLabel}</span>{" "}
              <span className="text-slate-500">Businesses Listed</span>
            </span>
            <span className="text-slate-200" aria-hidden>|</span>
            <span className="font-semibold text-slate-500">Australia Wide</span>
            <span className="text-slate-200" aria-hidden>|</span>
            <span className="font-semibold text-slate-500">Australian Strata Building Directory</span>
          </div>
        </div>
      </div>

      {/* Animated self-promotion banner — encourages businesses to list */}
      <div className="pb-12">
        <DirectoryPromoBanner listedLabel={listedLabel} />
      </div>

      {/* Listing */}
      <main>
        <DirectoryListing categories={categories} />
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
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
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs leading-6 text-slate-400">
          <p className="mb-2">
            Businesses manage their own profiles. Licence and insurance information is self-declared unless otherwise
            stated. Clients should complete their own due diligence before engaging a contractor.
          </p>
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
