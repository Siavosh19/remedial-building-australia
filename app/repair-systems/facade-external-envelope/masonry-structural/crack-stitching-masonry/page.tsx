import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Crack Stitching — Masonry — Masonry & Structural — Remedial Building Australia",
  description:
    "Technical repair system reference for masonry crack stitching in Australian Class 2 strata — helical bed-joint reinforcement bars and stainless rod epoxy grouted systems for stabilising cracks in brick veneer and cavity masonry facades.",
};

const BASE = "/repair-systems/facade-external-envelope/masonry-structural/crack-stitching-masonry";
const HUB = "/repair-systems/facade-external-envelope/masonry-structural";
const PARENT = "/repair-systems/facade-external-envelope";

const GROUPS = [
  {
    heading: "Crack Stitching Systems",
    items: [
      {
        label: "Helical bed-joint reinforcement bars (crack stitching)",
        slug: "helical-bed-joint-reinforcement-bars",
        count: 3,
        description: "Stainless helical reinforcement bars grouted into cut bed joints to stitch and stabilise cracks in brick veneer and cavity masonry — Helifix, Ancon and Thor Helical systems.",
      },
      {
        label: "Stainless rod epoxy grouted systems",
        slug: "stainless-rod-epoxy-grouted-systems",
        count: 3,
        description: "Stainless steel rod systems grouted with epoxy into drilled holes for deep stitching of structural masonry cracks — higher shear capacity than helical bar systems.",
      },
    ],
  },
] as const;

export default function CrackStitchingMasonryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Technical Remedial Building Platform</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a><span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a><span>/</span>
              <a href={PARENT} className="hover:text-sky-700 transition">Facade &amp; External Envelope</a><span>/</span>
              <a href={HUB} className="hover:text-sky-700 transition">Masonry &amp; Structural</a><span>/</span>
              <span className="text-sky-950">Crack Stitching — Masonry</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 03 — Facade &amp; External Envelope</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Crack stitching — masonry
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for masonry crack stitching systems on Australian Class 2 strata buildings — select a system type to view helical bar and stainless rod epoxy grouted systems for stabilising structural cracks in brick veneer and cavity masonry facades.
            </p>
          </div>
        </section>

        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-12">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <div className="mb-6 flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">{group.heading}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <a
                      key={item.slug}
                      href={`${BASE}/${item.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="h-0.5 w-8 rounded-full bg-red-700" />
                        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                          <span className="h-1 w-1 rounded-full bg-green-500" />Live
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{item.label}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
                      <p className="mt-3 text-xs font-semibold text-slate-400">{item.count} product systems</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                        View systems <ArrowRight size={12} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href={HUB} className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm transition hover:bg-slate-200">← Masonry &amp; Structural</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
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
