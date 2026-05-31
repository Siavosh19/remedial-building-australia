import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DirectoryListing from "@/components/directory/DirectoryListing";
import LeadCaptureForm from "@/components/directory/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Remedial Building Industry Directory | Find Contractors & Consultants",
  description:
    "Search verified remedial building contractors, consultants and suppliers across Australia. Filter by location, category and verification status.",
};

export const revalidate = 60;

export default async function DirectoryPage() {
  let categories: { id: number; name: string; slug: string }[] = [];
  let parentCategories: { id: number; name: string }[] = [];
  let initialCompanies: Awaited<ReturnType<typeof fetchCompanies>> = [];

  try {
    [categories, parentCategories, initialCompanies] = await Promise.all([
      prisma.category.findMany({
        where: { is_active: true },
        orderBy: { display_order: "asc" },
        select: { id: true, name: true, slug: true, parent_id: true },
      }),
      prisma.category.findMany({
        where: { is_active: true, parent_id: null },
        orderBy: { display_order: "asc" },
        select: { id: true, name: true },
      }),
      fetchCompanies(),
    ]);
  } catch {
    // DB unavailable — render with empty state
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header */}
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
            <a href="/directory" className="whitespace-nowrap text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
            Industry Directory
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">
            Remedial Industry Directory
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-600">
            Australia&rsquo;s remedial building industry directory — contractors, consultants, waterproofers, engineers and specialist trades across all states.
          </p>
          <div className="mt-6">
            <LeadCaptureForm
              categories={parentCategories}
              triggerLabel="Submit a General Enquiry"
              triggerClassName="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-5 py-2.5 text-sm font-semibold text-sky-800 transition hover:bg-sky-100"
            />
          </div>
        </div>
      </div>

      {/* Listing (client component with search + filters) */}
      <main>
        <DirectoryListing categories={categories} initialCompanies={initialCompanies} />
      </main>

      {/* Footer */}
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

async function fetchCompanies() {
  return prisma.company.findMany({
    where: { status: "published" },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      phone: true,
      profile_status: true,
      confidence_score: true,
      is_featured: true,
      is_claimed: true,
      main_category: { select: { id: true, name: true, slug: true } },
      locations: {
        take: 1,
        select: { suburb: true, state: true, postcode: true },
      },
      licences: {
        where: { status: "verified" },
        take: 1,
        select: { status: true },
      },
    },
    orderBy: [
      { is_featured: "desc" },
      { confidence_score: "desc" },
      { is_claimed: "desc" },
    ],
    take: 100,
  });
}
