import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Remedial Building Australia",
  description:
    "Remedial Building Australia is a structured technical knowledge platform for Australian remedial building, focused on defects, repair systems, materials, and practical scope development.",
};

const coverageCards = [
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
    title: "Materials & Products",
    description:
      "Technical product references covering applications, compatible substrates, coverage rates and linked defect types.",
    href: "/materials-products",
  },
  {
    title: "AI Scope Builder",
    description:
      "Future AI-assisted tool for draft remedial scope writing, built on a structured defect and repair system database.",
    href: "/ai-scope-builder",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Defect Database
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library" className="whitespace-nowrap hover:text-red-700">Defect Library</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          </nav>

          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex"
          >
            Home
          </a>
        </div>
      </header>

      <main>

        {/* 1. Hero */}
        <section className="bg-sky-950 px-8 py-20">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
              About Remedial Building Australia
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-sky-300">
              A structured technical knowledge platform for Australian remedial building, focused on defects, repair systems, materials, and practical scope development.
            </p>
          </div>
        </section>

        {/* Thin red accent bar */}
        <div className="h-1 w-full bg-red-700" />

        {/* 2. Mission */}
        <section className="bg-white px-8 py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">
              Our Purpose
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-sky-950 md:text-4xl">
              Organising remedial construction knowledge
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-9 text-slate-600">
              <p>
                Remedial Building Australia is being developed to organise remedial construction knowledge into a clear, searchable format for builders, consultants, strata managers, engineers, and industry professionals.
              </p>
              <p>
                The platform covers common building defects, repair methodologies, waterproofing failures, concrete deterioration, façade issues, material systems, and practical scope development for Class 2 and existing buildings across Australia.
              </p>
            </div>
          </div>
        </section>

        {/* 3. What we cover */}
        <section className="bg-slate-100 px-8 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">
              Platform Sections
            </p>
            <h2 className="mt-5 text-3xl font-extrabold text-sky-950 md:text-4xl">
              What we cover
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coverageCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:border-sky-300 hover:shadow-md"
                >
                  <div className="mb-5 h-0.5 w-8 rounded-full bg-red-700" />
                  <h3 className="text-lg font-bold text-sky-950">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                    {card.description}
                  </p>
                  <div className="mt-6 text-sm font-bold text-sky-700 group-hover:text-red-700">
                    Open →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Why it matters */}
        <section className="bg-white px-8 py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">
              Why It Matters
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-sky-950 md:text-4xl">
              Remedial information is often scattered
            </h2>
            <p className="mt-8 text-lg leading-9 text-slate-600">
              Remedial building information is often spread across inspection reports, consultant scopes, specifications, product data sheets, standards, and years of project experience. This platform aims to bring that information together into a more practical and accessible format, making it easier to understand defects, compare repair options, and prepare more informed project documentation.
            </p>
          </div>
        </section>

        {/* 5. Disclaimer */}
        <section className="bg-slate-100 px-8 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-300 bg-white px-10 py-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                Important Notice
              </p>
              <h2 className="mt-4 text-2xl font-bold text-sky-950">
                Information platform only
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                This website is an information platform only. It does not replace project-specific advice from qualified engineers, consultants, certifiers, waterproofing specialists, or licensed builders. Each project must be independently assessed based on its own site conditions, design requirements, compliance obligations, and applicable Australian Standards.
              </p>
              <div className="mt-8 border-t border-slate-200 pt-6">
                <a
                  href="/terms"
                  className="text-sm font-semibold text-sky-700 hover:text-red-700"
                >
                  Read full Terms &amp; Conditions →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Final CTA */}
        <section className="bg-sky-950 px-8 py-28 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white">
              Get Started
            </p>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Built for the Australian remedial building industry
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-sky-300">
              The platform continues to grow with new defect articles, repair system summaries, material references, and future AI-assisted scope writing tools.
            </p>
          </div>
        </section>

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
            <div className="text-lg font-extrabold text-sky-950">
              Remedial Building Australia
            </div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
