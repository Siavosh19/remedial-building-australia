import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DirectoryListing from "@/components/directory/DirectoryListing";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Strata Building Services Directory | Find Contractors & Consultants",
  description:
    "Search strata building contractors, consultants, waterproofers and specialists across Australia. Filter by location, category and expertise.",
};

export const revalidate = 60;

export default async function DirectoryPage() {
  let categories: { id: number; name: string; slug: string; parent_id?: number | null; company_count: number }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initialCompanies: any[] = [];

  try {
    const [rawCats, rawCompanies] = await Promise.all([
      prisma.category.findMany({
        where: { is_active: true },
        orderBy: { display_order: "asc" },
        select: { id: true, name: true, slug: true, parent_id: true, _count: { select: { companies: true } } },
      }),
      prisma.company.findMany({
        where: { status: "published" },
        orderBy: [{ plan_type: "desc" }, { confidence_score: "desc" }],
        take: 24,
        select: {
          id: true, slug: true, name: true, description: true, phone: true,
          plan_type: true, profile_status: true, confidence_score: true,
          is_featured: true, is_claimed: true, logo_url: true,
          main_category: { select: { id: true, name: true, slug: true } },
          locations: { take: 1, select: { suburb: true, state: true, postcode: true, services_nationwide: true, services_statewide: true } },
          licences: { select: { status: true } },
          company_tags: { where: { is_approved: true }, select: { tag: { select: { name: true, tag_type: true } } } },
        },
      }),
    ]);
    categories = rawCats.map(c => ({ ...c, company_count: c._count.companies }));
    initialCompanies = rawCompanies.map(c => ({ ...c, plan_type: c.plan_type ?? undefined }));
  } catch {
    // DB unavailable — render with empty state
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      <SiteHeader />

      {/* Hero */}
      <div className="bg-sky-950">
        <div className="mx-auto max-w-7xl px-8 py-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">
            Strata Building Services Directory
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Strata Building Services Directory
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-sky-200">
            Australia&rsquo;s strata building services directory — contractors, consultants, waterproofers, engineers and specialist trades across all states.
          </p>

          {/* Stats bar */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-sm">
            <span>
              <span className="font-extrabold text-white">13,500+</span>{" "}
              <span className="text-sky-300">Businesses Listed</span>
            </span>
            <span className="text-white/20" aria-hidden>|</span>
            <span className="font-semibold text-sky-300">Australia Wide</span>
            <span className="text-white/20" aria-hidden>|</span>
            <span className="font-semibold text-sky-300">Australian Strata Building Directory</span>
          </div>
        </div>
      </div>

      {/* Listing */}
      <main>
        <DirectoryListing categories={categories} initialCompanies={initialCompanies} />
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
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
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

