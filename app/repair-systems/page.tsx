import { ArrowRight, Building2, Droplets, Home, Layers, Paintbrush, Wind, Wrench } from "lucide-react";

export const metadata = {
  title: "Repair Systems — Remedial Building Australia",
  description:
    "Technical repair system reference for waterproofing, concrete repair, coatings, sealants, façade, roofing, balcony, internal and drainage systems — structured for Australian remedial building practice.",
};

const SYSTEMS = [
  {
    num: "01",
    slug: "waterproofing-water-ingress",
    label: "Waterproofing Systems",
    description:
      "Membrane systems, liquid-applied waterproofing, sheet membranes, balcony and wet area waterproofing products for Australian Class 2 remediation.",
    icon: Droplets,
    live: true,
  },
  {
    num: "02",
    slug: "concrete-structural-defects",
    label: "Concrete & Structural Defect Repair Systems",
    description:
      "Polymer-modified and cementitious repair mortars, epoxy systems, bonding agents, corrosion inhibitors, crack injection and curing compounds.",
    icon: Layers,
    live: true,
  },
  {
    num: "03",
    slug: "facade-external-envelope",
    label: "Facade & External Envelope",
    description:
      "Render repair, brickwork, crack stitching, cladding, failed sealants, facade cracking, window and door perimeter failure, and external coating systems.",
    icon: Building2,
    live: true,
  },
  {
    num: "04",
    slug: "roofing-defects",
    label: "Roofing Defects",
    description:
      "Roof tile replacement, ridge rebed, valley flashings, box gutters, flat roof falls, overflow systems, skylights and gutter replacement for Class 2 strata.",
    icon: Home,
    live: true,
  },
  {
    num: "05",
    slug: "internal-defects-finishes",
    label: "Internal Defects & Finishes",
    description:
      "Ceiling water damage, internal cracking, mould and moisture remediation, and internal paint failure repair systems for Class 2 strata apartments.",
    icon: Paintbrush,
    live: true,
  },
  {
    num: "06",
    slug: "services-drainage",
    label: "Services & Drainage",
    description:
      "Downpipe replacement (PVC, Colorbond, copper) and pipe penetration flashing collar systems for services and drainage defects on Class 2 strata buildings.",
    icon: Wrench,
    live: true,
  },
  {
    num: "07",
    slug: "mechanical-ventilation-exhaust",
    label: "Mechanical, Ventilation & Exhaust",
    description:
      "Mushroom roof vents, mechanical and window exhaust fans, subfloor ventilation and carpark ventilation systems for Class 2 strata buildings.",
    icon: Wind,
    live: true,
  },
] as const;

export default function RepairSystemsHubPage() {
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
                        <a href="/"                className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems"  className="whitespace-nowrap text-sky-950 underline underline-offset-4 decoration-red-700">Repair Systems</a>
            <a href="/industry-news"   className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <span className="text-sky-950">Repair Systems</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems</p>
            <h1 className="mt-3 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-6xl">
              Remedial repair systems reference
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Technical product reference across all major remedial building system categories —
              structured for Australian Class 2 buildings, strata remediation and commercial repair works.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 border border-green-200">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                7 systems live
              </span>
            </div>
          </div>
        </section>

        {/* ── System grid ── */}
        <section className="px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SYSTEMS.map((sys) => {
                const Icon = sys.icon;
                return sys.live ? (
                  <a
                    key={sys.slug}
                    href={`/repair-systems/${sys.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-sky-300 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-950 text-white">
                        <Icon size={20} />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700 border border-green-200">
                        <span className="h-1 w-1 rounded-full bg-green-500" />Live
                      </span>
                    </div>
                    <p className="mb-1.5 text-xs font-bold text-slate-400 tracking-widest">{sys.num}</p>
                    <h2 className="text-base font-extrabold leading-snug text-sky-950 transition group-hover:text-sky-700">
                      {sys.label}
                    </h2>
                    <p className="mt-2.5 text-sm leading-6 text-slate-500">{sys.description}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition group-hover:text-red-700">
                      Browse products <ArrowRight size={12} />
                    </div>
                  </a>
                ) : (
                  <div
                    key={sys.slug}
                    className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 opacity-60"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200 text-slate-400">
                        <Icon size={20} />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-400 border border-slate-200">
                        In development
                      </span>
                    </div>
                    <p className="mb-1.5 text-xs font-bold text-slate-300 tracking-widest">{sys.num}</p>
                    <h2 className="text-base font-extrabold leading-snug text-slate-600">{sys.label}</h2>
                    <p className="mt-2.5 text-sm leading-6 text-slate-400">{sys.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Home</a>
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
