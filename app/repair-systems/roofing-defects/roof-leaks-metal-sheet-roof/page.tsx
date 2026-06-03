import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Roof Leaks — Metal Sheet Roof — Roofing Defects — Remedial Building Australia",
  description:
    "Technical product reference for metal sheet roof leak repair on Australian Class 2 strata buildings — Colorbond corrugated, Trimdek, Klip-Lok, Zincalume and zinc sheet replacement, ridge and barge cappings, anti-con blanket, roofing screws and sheet lap sealant systems.",
};

const DEFECT_SLUG = "roof-leaks-metal-sheet-roof";

const GROUPS = [
  {
    heading: "Metal Sheet Replacement",
    items: [
      {
        label: "Metal sheet replacement — Colorbond corrugated",
        slug: "metal-sheet-replacement-colorbond-corrugated",
        count: 3,
        description: "Lysaght, Stramit and BlueScope Colorbond corrugated (Custom Orb) metal sheet replacement systems for pitched and low-pitched metal roofs.",
        live: true,
      },
      {
        label: "Metal sheet replacement — Trimdek",
        slug: "metal-sheet-replacement-trimdek",
        count: 3,
        description: "Lysaght Trimdek and equivalent high-rib trapezoidal sheet replacement systems for commercial and residential metal roofs.",
        live: false,
      },
      {
        label: "Metal sheet replacement — Klip-Lok",
        slug: "metal-sheet-replacement-klip-lok",
        count: 3,
        description: "Lysaght Klip-Lok 700 and equivalent concealed-fix standing seam sheet replacement systems for low-pitched metal roofs.",
        live: false,
      },
      {
        label: "Metal sheet replacement — Zincalume",
        slug: "metal-sheet-replacement-zincalume",
        count: 2,
        description: "BlueScope Zincalume corrugated and trapezoidal sheet replacement for roofs requiring unpainted zinc-aluminium alloy coating.",
        live: false,
      },
      {
        label: "Metal sheet replacement — zinc (natural)",
        slug: "metal-sheet-replacement-zinc",
        count: 2,
        description: "VM Zinc and Rheinzink natural zinc sheet replacement systems for heritage, premium and architectural metal roof applications.",
        live: false,
      },
    ],
  },
  {
    heading: "Cappings & Accessories",
    items: [
      {
        label: "Ridge and barge cappings — metal",
        slug: "ridge-barge-cappings-metal",
        count: 3,
        description: "Lysaght, Stramit and Stratco Colorbond and Zincalume ridge and barge capping systems for metal sheet roofs.",
        live: false,
      },
      {
        label: "Anti-con blanket under metal sheet",
        slug: "anti-con-blanket-metal-sheet",
        count: 3,
        description: "Bradford Anticon, Fletcher Insulations and equivalent anti-condensation blanket systems installed directly under metal roof sheet.",
        live: false,
      },
      {
        label: "Roofing screws and sealing washers",
        slug: "roofing-screws-sealing-washers",
        count: 3,
        description: "Class 3 and Class 4 coated hex-head self-drilling roofing screws with EPDM or neoprene sealing washers for metal sheet roof fixing.",
        live: false,
      },
      {
        label: "Sheet lap and seam sealants",
        slug: "sheet-lap-seam-sealants",
        count: 3,
        description: "Butyl tape, polyurethane and silicone sealant systems for sheet lap joints, end laps and ridge capping sealing on metal roofs.",
        live: false,
      },
    ],
  },
] as const;

const LINKED_SYSTEMS = [
  { label: "Step/counter-flashing — Colorbond", href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/step-counter-flashing-colorbond" },
  { label: "Step/counter-flashing — aluminium", href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/step-counter-flashing-aluminium" },
  { label: "Step/counter-flashing — lead", href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/step-counter-flashing-lead" },
  { label: "Penetration flashing collars", href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/penetration-flashing-collar" },
  { label: "Penetration plinth systems", href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/penetration-plinth-systems" },
  { label: "Sarking — PIR under-tile", href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/sarking-pir-under-tile" },
  { label: "Sarking — mineral wool", href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof/sarking-mineral-wool" },
] as const;

export default function RoofLeaksMetalSheetPage() {
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <a href="/" className="hover:text-sky-700 transition">Home</a>
              <span>/</span>
              <a href="/repair-systems" className="hover:text-sky-700 transition">Repair Systems</a>
              <span>/</span>
              <a href="/repair-systems/roofing-defects" className="hover:text-sky-700 transition">Roofing Defects</a>
              <span>/</span>
              <span className="text-sky-950">Roof Leaks — Metal Sheet Roof</span>
            </nav>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 04 — Roofing Defects</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
              Roof leaks — metal sheet roof repair systems
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Technical product reference for metal sheet roof leak repair on Australian Class 2 strata and residential buildings — select a product type to browse sheet replacement systems, cappings, accessories and associated waterproofing products.
            </p>
          </div>
        </section>

        {/* ── Product type card groups ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-12">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <div className="mb-6 flex items-start gap-3">
                  <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-red-700">{group.heading}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) =>
                    item.live ? (
                      <a
                        key={item.slug}
                        href={`/repair-systems/roofing-defects/${DEFECT_SLUG}/${item.slug}`}
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
                    ) : (
                      <div key={item.slug} className="rounded-2xl border border-slate-100 bg-white p-6 opacity-50">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="h-0.5 w-8 rounded-full bg-slate-300" />
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-400">
                            In development
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold leading-tight text-slate-600">{item.label}</h3>
                        <p className="mt-2 text-xs leading-5 text-slate-400">{item.description}</p>
                        <p className="mt-3 text-xs font-semibold text-slate-300">{item.count} product systems</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}

            {/* ── Linked systems (shared with pitched tiled roof) ── */}
            <div>
              <div className="mb-6 flex items-start gap-3">
                <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-slate-400" />
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Related Systems — Flashings & Sarking</h2>
                  <p className="mt-1 text-xs text-slate-400">These product pages are shared with the pitched tiled roof defect section — the same products apply to metal sheet roofs.</p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {LINKED_SYSTEMS.map((sys) => (
                  <a
                    key={sys.href}
                    href={sys.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="h-0.5 w-8 rounded-full bg-slate-400" />
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold text-slate-500">
                        Shared page
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold leading-tight text-sky-950 transition group-hover:text-sky-700">{sys.label}</h3>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-slate-500 transition group-hover:text-sky-700">
                      View systems <ArrowRight size={12} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/repair-systems/roofing-defects" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Roofing Defects</a>
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
