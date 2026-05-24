import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Newsletter — Remedial Building Australia",
  description:
    "Subscribe to the fortnightly Remedial Building Australia update — industry news, compliance changes, product releases and technical references for building consultants and waterproofing contractors.",
};

const WHAT_YOU_GET = [
  {
    heading: "Industry News",
    body: "Building Commission NSW, DBP Act, strata defect cases and regulatory changes — summarised and relevant.",
  },
  {
    heading: "Repair System Updates",
    body: "New products, system approvals, material testing results and application guidance.",
  },
  {
    heading: "Compliance & Standards",
    body: "NCC updates, AS 3600 changes, waterproofing standards and exposure class guidance.",
  },
  {
    heading: "Defect Trends",
    body: "Emerging defect types, common failure patterns and remediation approaches across Class 2 buildings.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Technical Defect Database
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library"   className="whitespace-nowrap hover:text-red-700 transition">Defect Library</a>
            <a href="/repair-systems"   className="whitespace-nowrap hover:text-red-700 transition">Repair Systems</a>
            <a href="/industry-news"    className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 transition md:inline-flex"
          >
            Home
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-700">
              Newsletter
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Fortnightly Remedial<br className="hidden sm:block" /> Building Update
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500">
              Curated industry news, compliance updates and technical references for building
              consultants, waterproofing contractors and strata managers across Australia.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                <CheckCircle size={12} /> Free
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700">
                Fortnightly
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                No spam — unsubscribe anytime
              </span>
            </div>
          </div>
        </section>

        {/* ── What you get ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-5xl">
            <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
              What&apos;s included
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WHAT_YOU_GET.map((item) => (
                <div
                  key={item.heading}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 h-1.5 w-8 rounded-full bg-red-700" />
                  <h3 className="text-sm font-extrabold text-sky-950">{item.heading}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Subscribe form (section variant) ── */}
        <NewsletterSignup variant="section" />

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a
            href="/"
            className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-50 transition"
          >
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair
              systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about"   className="underline hover:text-sky-700">About</a>
            <a href="/terms"   className="underline hover:text-sky-700">Terms</a>
            <a href="/contact" className="underline hover:text-sky-700">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
