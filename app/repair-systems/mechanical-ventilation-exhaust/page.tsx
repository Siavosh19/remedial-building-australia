import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Mechanical, Ventilation & Exhaust — Repair Systems — Remedial Building Australia",
  description:
    "Technical repair system reference for mechanical, ventilation and exhaust defects in Australian Class 2 strata apartment buildings — mushroom vents, exhaust fans, subfloor ventilation and carpark ventilation.",
};

const SUBCATEGORIES = [
  {
    label: "Mushroom roof vents",
    slug: "mushroom-roof-vents",
    count: 2,
    description: "Aluminium and insulated mushroom roof vent systems for replacement of failed or missing roof space ventilation on Class 2 strata buildings.",
    live: true,
    href: "/repair-systems/mechanical-ventilation-exhaust/mushroom-roof-vents",
  },
  {
    label: "Mechanical exhaust fans",
    slug: "mechanical-exhaust-fans",
    count: 4,
    description: "In-line duct fans, ceiling-mounted exhaust fans, wall-mounted exhaust fans and acoustic attenuation duct systems for mechanical exhaust fan replacement and upgrade.",
    live: true,
    href: "/repair-systems/mechanical-ventilation-exhaust/mechanical-exhaust-fans",
  },
  {
    label: "Window-mounted exhaust fans",
    slug: "window-mounted-exhaust-fans",
    count: 1,
    description: "Window exhaust fan systems with attenuation screens for window-mounted exhaust fan replacement in Class 2 strata buildings.",
    live: true,
    href: "/repair-systems/mechanical-ventilation-exhaust/window-mounted-exhaust-fans",
  },
  {
    label: "Subfloor ventilation",
    slug: "subfloor-ventilation",
    count: 3,
    description: "Terracotta, aluminium and mechanical subfloor fan systems for subfloor ventilation improvement and mould control in Class 2 strata buildings.",
    live: true,
    href: "/repair-systems/mechanical-ventilation-exhaust/subfloor-ventilation",
  },
  {
    label: "Carpark ventilation",
    slug: "carpark-ventilation",
    count: 1,
    description: "Carpark fan and CO sensor systems for basement carpark ventilation compliance and upgrade on Class 2 strata buildings.",
    live: true,
    href: "/repair-systems/mechanical-ventilation-exhaust/carpark-ventilation",
  },
] as const;

export default function MechanicalVentilationExhaustPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
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
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <span className="text-sky-950">Mechanical, Ventilation &amp; Exhaust</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 07</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Mechanical, Ventilation &amp; Exhaust
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical repair system reference for mechanical, ventilation and exhaust defects in Australian Class 2 strata — select a defect subcategory to view product categories, system information and brand equivalents.
            </p>
          </div>
        </section>

        {/* ── Subcategory cards ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-start gap-3">
              <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
              <div>
                <h2 className="text-2xl font-extrabold text-sky-950">Defect Subcategories</h2>
                <p className="mt-1 text-sm text-slate-500">Select a mechanical, ventilation or exhaust defect type to browse product categories and brand comparisons.</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SUBCATEGORIES.map((sub) =>
                sub.live ? (
                  <a
                    key={sub.slug}
                    href={sub.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-0.5 w-8 rounded-full bg-red-700" />
                      <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                        <span className="h-1 w-1 rounded-full bg-green-500" />Live
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{sub.label}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{sub.description}</p>
                    <p className="mt-3 text-xs font-semibold text-slate-400">{sub.count} product categories</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                      View systems <ArrowRight size={12} />
                    </div>
                  </a>
                ) : (
                  <div key={sub.slug} className="rounded-2xl border border-slate-100 bg-white p-6 opacity-50">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-0.5 w-8 rounded-full bg-slate-300" />
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-400">
                        In development
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold leading-tight text-slate-600">{sub.label}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{sub.description}</p>
                    <p className="mt-3 text-xs font-semibold text-slate-300">{sub.count} product categories</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/repair-systems" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Repair Systems</a>
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
