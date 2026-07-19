import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import StrataConnectSlides from "@/components/about/StrataConnectSlides";

export const metadata: Metadata = {
  title: "About | Strata & Remedial Building Platform — Remedial Building Australia",
  description:
    "Remedial Building Australia is a strata and remedial building platform connecting owners corporations, strata managers, contractors, consultants and engineers — with a business directory, Strata Connect quote requests, a defect library, repair systems and expert remedial advice.",
};

const coverageCards = [
  {
    title: "Business Directory",
    description:
      "Australia-wide directory of remedial contractors, consultants, waterproofers, engineers and specialist trades — searchable by category and state.",
    href: "/directory",
  },
  {
    title: "Request Quotes",
    description:
      "Broadcast a strata or building repair job and receive competitive quotes from matched, verified specialists near the project.",
    href: "/directory/login",
  },
  {
    title: "Defect Library",
    description:
      "Structured guidance for common Class 2 building defects, organised by category, cause, risk and repair pathway.",
    href: "/defect-library",
  },
  {
    title: "Repair Systems",
    description:
      "Waterproofing, concrete repair, crack injection, coatings, sealants and corrosion protection systems compared and explained.",
    href: "/repair-systems",
  },
  {
    title: "AI Scope Builder",
    description:
      "AI-assisted remedial scope writing — select defects, repair systems and materials, then generate a consultant, builder, strata or tender scope of works.",
    href: "/ai-scope-builder",
  },
  {
    title: "Expert Remedial Advice",
    description:
      "Scope, Quote & Tender Review, Remedial Budget Estimates, Building Repair Strategy Advice and Capital Works Forecasts for strata repair decisions.",
    href: "/expert-remedial-advice",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteHeader />

      <main>
        {/* 1. Compact intro card — sized to sit on one phone screen */}
        <section className="bg-sky-950 px-5 py-10 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-400">
              Strata &amp; Remedial Building Platform
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Remedial Building Australia
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-sky-200 sm:text-lg sm:leading-8">
              A strata and remedial building platform connecting owners corporations,
              strata managers, building managers, contractors, consultants, engineers
              and suppliers across Australia — with a business directory, job board,
              Strata Connect quote requests, industry news and technical resources.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/directory"
                className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Browse the directory
              </Link>
              <Link
                href="/directory/login"
                className="rounded-lg border border-sky-700 bg-sky-900/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-900"
              >
                Request quotes
              </Link>
            </div>
          </div>
        </section>

        <div className="h-1 w-full bg-red-700" />

        {/* 2. Strata Connect — swipeable "slides" explaining how it works (SEO) */}
        <section className="bg-white px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">
              Strata Connect
            </p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
              Turn a strata work order into competitive quotes
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Strata Connect lets owners corporations and strata managers hand a repair
              straight to the right specialists. Forward a work order or scope of works and
              it becomes a quote request matched to verified remedial contractors,
              consultants and engineers — for waterproofing, concrete repair, façades,
              roofing, structural repairs, drainage, basements and building defects.
            </p>

            {/* Auto-crossfading feature slides (half image / half text) */}
            <StrataConnectSlides />

            <div className="mt-8">
              <Link
                href="/request-quotes"
                className="inline-flex rounded-lg bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-900"
              >
                Learn how to request quotes →
              </Link>
            </div>
          </div>
        </section>

        {/* 3. What the platform covers */}
        <section className="bg-slate-100 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">
              Platform Sections
            </p>
            <h2 className="mt-4 text-2xl font-extrabold text-sky-950 sm:text-3xl md:text-4xl">
              Everything in one place
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {coverageCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:border-sky-300 hover:shadow-md"
                >
                  <div className="mb-5 h-0.5 w-8 rounded-full bg-red-700" />
                  <h3 className="text-lg font-bold text-sky-950">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                    {card.description}
                  </p>
                  <div className="mt-6 text-sm font-bold text-sky-700 group-hover:text-red-700">
                    Open →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Disclaimer */}
        <section className="bg-white px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-300 bg-slate-50 px-7 py-8 sm:px-10 sm:py-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                Important Notice
              </p>
              <h2 className="mt-4 text-xl font-bold text-sky-950 sm:text-2xl">
                Information platform only
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                This website is an information platform only. It does not replace
                project-specific advice from qualified engineers, consultants, certifiers,
                waterproofing specialists, or licensed builders. Each project must be
                independently assessed based on its own site conditions, design
                requirements, compliance obligations, and applicable Australian Standards.
              </p>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <Link
                  href="/terms"
                  className="text-sm font-semibold text-sky-700 hover:text-red-700"
                >
                  Read full Terms &amp; Conditions →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer — standard site links */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">
              Remedial Building Australia
            </div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              Australia&rsquo;s strata and remedial building platform — directory, Strata
              Connect quote requests, defect library, repair systems and expert remedial
              advice.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/about" className="hover:text-sky-700">About</Link>
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
