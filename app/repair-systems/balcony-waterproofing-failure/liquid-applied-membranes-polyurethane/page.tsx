import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Liquid Applied Polyurethane Membranes — Balcony Waterproofing Repair — Class 2 Strata — Remedial Building Australia",
  description:
    "Technical product reference for liquid-applied polyurethane waterproofing membranes for balcony waterproofing failure in Australian Class 2 strata apartment buildings — brand comparisons, system selection and procurement sources for remedial building consultants and contractors.",
};

const SIBLING_TABS = [
  { label: "Liquid applied — PU", slug: "liquid-applied-membranes-polyurethane" },
  { label: "Liquid applied — acrylic", slug: "liquid-applied-membranes-acrylic" },
  { label: "Torch-on sheet", slug: "sheet-membranes-torch-on" },
  { label: "Cold-applied sheet", slug: "sheet-membranes-cold-applied" },
  { label: "Crystalline", slug: "cementitious-crystalline-waterproofing" },
  { label: "Primers", slug: "primers-bonding-agents" },
  { label: "Screed polymer", slug: "screed-systems-polymer-modified" },
  { label: "Screed SL", slug: "screed-systems-self-levelling" },
  { label: "Tapered insulation", slug: "tapered-insulation-board-systems" },
  { label: "Drainage puddle flanges", slug: "drainage-puddle-flanges-floor-wastes" },
  { label: "Drainage linear", slug: "drainage-linear-grates-channel-drains" },
  { label: "Penetration collars", slug: "penetration-collars" },
  { label: "Fire collars", slug: "fire-collars-intumescent" },
  { label: "Protection boards", slug: "protection-boards" },
  { label: "Reinforcing fabric", slug: "reinforcing-fabric-mesh" },
  { label: "Flood test", slug: "flood-test-equipment" },
  { label: "Tile adhesive", slug: "tile-adhesive-systems" },
  { label: "Tools", slug: "abrasives-blades-tools" },
];

type Tag = { label: string; color?: string };
type ProcurementSource = { name: string; url: string };
type Product = {
  brand: string;
  brandUrl: string;
  tdsUrl?: string;
  name: string;
  descriptionLine: string;
  tags: Tag[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: ProcurementSource[];
};

const PRODUCTS: Product[] = [
  {
    brand: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/building-finishing/waterproofing/liquid-membranes/sika-topseal-107.html",
    name: "Sika Topseal-107",
    descriptionLine: "One-component polyurethane waterproofing membrane — 15 kg pail",
    tags: [
      { label: "One-component" },
      { label: "Solvent-based" },
      { label: "AS 3740", color: "blue" },
      { label: "Balcony" },
      { label: "Trafficable over tiles" },
    ],
    systemDescription: "One-component moisture-curing polyurethane membrane — the most widely specified balcony waterproofing product in Australian Class 2 strata remediation. Apply by roller in two coats minimum with Sika primer. Embed Sika Reemat Premium reinforcing fabric at all angles, coves, drain junctions and penetrations before second coat. Cure time 4–6 hours between coats at 23°C. Flood test minimum 24 hours after final coat before laying screed or tiles.",
    technicalProperties: [
      "AS 3740 compliant — suitable for wet areas and balconies in Class 2 buildings",
      "Elongation at break greater than 200% — accommodates thermal movement and minor crack bridging",
      "One-component — no mixing required — significantly reduces on-site batching error",
      "Pedestrian trafficable after tile or screed protection layer is installed — not directly trafficable without protection",
      "Nationally stocked through Sika distributors and Waterproofing Direct",
    ],
    limitations: [
      "Solvent-based — adequate ventilation required during application — not suitable for enclosed spaces without forced air extraction",
      "Minimum substrate and ambient temperature 10°C — application below this risks film defects and adhesion failure",
      "Sika-approved primer coat mandatory on all substrates — confirm primer selection with Sika technical before application",
      "Two-coat minimum at specified wet film thickness — single coat does not meet AS 3740 dry film thickness requirements",
      "Not suitable for direct-to-waterproofing tiling without a screed or protection board intermediate layer",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    brand: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    name: "Sika Topseal-107W",
    descriptionLine: "One-component water-based polyurethane waterproofing membrane — 15 kg pail",
    tags: [
      { label: "One-component" },
      { label: "Water-based" },
      { label: "Low VOC", color: "green" },
      { label: "AS 3740", color: "blue" },
      { label: "Balcony" },
      { label: "Internal wet area" },
    ],
    systemDescription: "Water-based variant of Sika Topseal-107 for enclosed or poorly ventilated spaces where solvent-based systems are prohibited by OH&S requirements or building management. Same reinforcing and application requirements as the solvent-based version. Specify for internal wet areas, bathrooms and laundries where ventilation is restricted. Not preferred on open balconies where the solvent-based system gives faster cure and better early water resistance.",
    technicalProperties: [
      "Water-based — very low VOC — suitable for enclosed internal wet areas without forced mechanical ventilation",
      "AS 3740 compliant for balcony and wet area waterproofing in Class 2 buildings",
      "One-component — no mixing — eliminates batching error on site",
      "Compatible with standard tile adhesive systems after full cure",
    ],
    limitations: [
      "Slower cure than solvent-based variant — minimum 6–8 hours between coats at 23°C — significantly longer in cool or humid conditions",
      "More sensitive to rain and condensation during early cure — protect from water contact minimum 4 hours after application",
      "Not the preferred system on external balconies in coastal or wet environments where early water resistance matters",
      "Generally lower chemical resistance than solvent-based equivalent",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
    ],
  },
  {
    brand: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products/ardex-8-9/",
    name: "Ardex 8+9",
    descriptionLine: "Two-component rapid-setting flexible waterproofing compound — 12.5 kg kit",
    tags: [
      { label: "Two-component" },
      { label: "Cementitious-flexible" },
      { label: "AS 3740", color: "blue" },
      { label: "Balcony" },
      { label: "Internal wet area" },
      { label: "Fast cure", color: "green" },
    ],
    systemDescription: "Two-component cementitious-flexible compound — the most widely specified waterproofing system in Australian Class 2 strata and renovation work due to its very fast set time. Tiling possible within 60–90 minutes of application under normal conditions — a significant programme advantage on occupied strata buildings. Apply by brush in two coats. Embed Ardex fibreglass mesh tape at all junctions, angles and drain surrounds before second coat. Flood test before tiling. Note — this is a cementitious-flexible hybrid, not a pure polyurethane — included here as the most direct functional equivalent in Australian practice for the same balcony waterproofing applications.",
    technicalProperties: [
      "Very fast set — tiling typically possible within 60–90 minutes — major programme advantage in occupied strata",
      "AS 3740 compliant for wet areas and balconies in Class 2 buildings",
      "Pre-bagged two-component system — consistent mixing ratio reduces batching error",
      "Direct bond to concrete without additional primer on most substrates — confirm with Ardex technical for contaminated or previously waterproofed substrates",
      "Widely stocked at Bunnings nationally — immediate procurement advantage on site",
    ],
    limitations: [
      "Two-component — strict mixing ratio required — incorrect ratio reduces performance and waterproofing integrity",
      "Cementitious base — lower elongation than pure polyurethane — not suitable where significant structural movement or active crack bridging is required",
      "Confirm specification-grade compliance with Ardex technical for Class 2 strata — not the domestic-grade product available at Bunnings",
      "Not suitable where high chemical exposure or aggressive cleaning regimes are specified above the membrane",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    brand: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    name: "Ardex 7+8",
    descriptionLine: "Two-component flexible waterproofing slurry — 12 kg kit",
    tags: [
      { label: "Two-component" },
      { label: "Flexible cementitious" },
      { label: "AS 3740", color: "blue" },
      { label: "Balcony" },
      { label: "External" },
      { label: "Long open time" },
    ],
    systemDescription: "Two-component cementitious flexible slurry for external balcony and wet area waterproofing. Similar application to Ardex 8+9 but with a longer open time suited to larger balcony areas where the fast set of 8+9 would be a disadvantage. Apply by brush in two coats with Ardex fibreglass mesh tape at all junctions. Flood test before tiling.",
    technicalProperties: [
      "Longer open time than Ardex 8+9 — suited to large balcony areas and complex geometry",
      "AS 3740 compliant for balconies and wet areas in Class 2 buildings",
      "Two-component system — consistent mixing required",
      "Good chemical resistance for an external cementitious system",
    ],
    limitations: [
      "Longer cure time than Ardex 8+9 — less programme advantage in tight schedules on occupied strata",
      "Two-component mixing required on site",
      "Lower elongation than pure polyurethane systems — not suitable where active cracking or significant thermal movement is anticipated",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    brand: "Fosroc Australia",
    brandUrl: "https://www.fosroc.com/en-au",
    tdsUrl: "https://www.fosroc.com/en-au",
    name: "Fosroc Nitoseal WP10",
    descriptionLine: "One-component polyurethane waterproofing membrane — 20 kg pail",
    tags: [
      { label: "One-component" },
      { label: "Solvent-based" },
      { label: "AS 4858", color: "blue" },
      { label: "Balcony" },
      { label: "External" },
    ],
    systemDescription: "One-component solvent-based polyurethane membrane from Fosroc. Apply by roller in two coats with Fosroc primer. Embed reinforcing fabric at all junctions and penetrations. Suitable for balcony and external deck waterproofing. Flood test before tiling.",
    technicalProperties: [
      "AS 4858 compliant for wet area membrane applications",
      "One-component — no mixing required",
      "Good elongation — suitable for substrates with minor thermal movement",
      "Compatible with standard tile adhesive systems after full cure",
    ],
    limitations: [
      "Solvent-based — ventilation required during application",
      "Fosroc distribution network smaller than Sika or Ardex nationally — confirm local availability before specifying",
      "Confirm current product name and specification with Fosroc Australia before specifying — product range subject to change",
    ],
    procurementSources: [
      { name: "Fosroc Australia — trade supply — contact for current pricing", url: "https://www.fosroc.com/en-au" },
      { name: "Komerco", url: "https://komerco.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    brand: "Parchem / Mapei",
    brandUrl: "https://www.parchem.com.au",
    name: "Mapei Mapelastic Foundation",
    descriptionLine: "Two-component flexible cementitious waterproofing slurry — 35 kg kit",
    tags: [
      { label: "Two-component" },
      { label: "Flexible cementitious" },
      { label: "AS 3740", color: "blue" },
      { label: "Balcony" },
      { label: "External" },
      { label: "Below-ground" },
    ],
    systemDescription: "Two-component flexible cementitious slurry for balcony, podium and below-ground waterproofing. Mix components A liquid acrylic and B cement powder on site. Apply by brush in two coats with Mapei reinforcing fabric at junctions. Used across Australia and internationally as a direct functional equivalent to Ardex 8+9 and Ardex 7+8. Suitable for both external balcony remediation and buried structure waterproofing.",
    technicalProperties: [
      "AS 3740 compliant for balcony and wet area waterproofing in Class 2 buildings",
      "Good resistance to hydrostatic pressure — suitable for below-ground and podium applications as well as balconies",
      "Two-component system — consistent mixing required",
      "Compatible with Mapei tile adhesive system",
    ],
    limitations: [
      "Lower elongation than polyurethane systems — not suitable where significant structural movement or active cracking is anticipated",
      "Two-component mixing on site required",
      "Confirm current Australian supply and product specification through Parchem Construction Supplies",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — trade supply — contact for current pricing", url: "https://www.parchem.com.au" },
    ],
  },
  {
    brand: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    name: "Tremco Vulkem 350",
    descriptionLine: "One-component polyurethane waterproofing membrane — 15 kg pail",
    tags: [
      { label: "One-component" },
      { label: "Solvent-based" },
      { label: "AS 3740", color: "blue" },
      { label: "Balcony" },
      { label: "External" },
    ],
    systemDescription: "One-component solvent-based polyurethane membrane from Tremco CPG. Apply by roller or brush in two coats with Tremco primer. Embed reinforcing fabric at all junctions. Flood test before tiling. Part of the Tremco CPG waterproofing system — warranted when used with compatible Tremco primer and system components throughout.",
    technicalProperties: [
      "One-component — no mixing required — reduces on-site batching error",
      "Good elongation suited to balcony waterproofing applications with thermal movement",
      "AS 3740 compliant when applied at specified wet film thickness",
      "Part of a complete Tremco CPG system — primer and membrane from same manufacturer",
    ],
    limitations: [
      "Tremco distribution network is smaller than Sika, Ardex or Fosroc in Australia — confirm local availability with Tremco CPG before specifying",
      "Solvent-based — ventilation required during application",
      "Confirm current product name, specification and AS 3740 compliance status with Tremco CPG Australia before specifying",
      "System warranty requires use of Tremco-compatible primer and system components throughout",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    brand: "Protecto",
    brandUrl: "https://www.protecto.com.au",
    name: "Protecto Balcony Guard",
    descriptionLine: "Two-component polyurethane waterproofing system — 14 kg kit",
    tags: [
      { label: "Two-component" },
      { label: "Polyurethane" },
      { label: "AS 3740", color: "blue" },
      { label: "Balcony" },
      { label: "Coastal" },
      { label: "Fast cure", color: "green" },
    ],
    systemDescription: "Two-component polyurethane waterproofing system from Protecto — an Australian-focused waterproofing supplier with strong Class 2 strata presence. Two-component formulation gives faster full cure than one-component moisture-curing alternatives — particularly useful in humid coastal environments where moisture-curing systems cure slowly. Apply by roller with included primer. Flood test before tiling.",
    technicalProperties: [
      "Faster full cure than one-component moisture-curing systems — particularly advantageous in humid coastal conditions",
      "AS 3740 compliant for balcony waterproofing in Class 2 buildings",
      "Good elongation — crack bridging suited to Class 2 balcony remediation",
      "Australian-focused supply and technical support",
    ],
    limitations: [
      "Two-component — mixing ratio must be strictly observed on site",
      "Distribution primarily through Protecto and specialist waterproofing suppliers — not as broadly stocked as Sika or Ardex",
      "Confirm current pricing and product availability through Protecto directly",
    ],
    procurementSources: [
      { name: "Protecto — trade supply — contact for current pricing", url: "https://www.protecto.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const BRAND_EQUIV = [
  { system: "One-component PU membrane — solvent-based", ardex: "—", sika: "Sika Topseal-107", fosroc: "Fosroc Nitoseal WP10", parchem: "—", tremco: "Tremco Vulkem 350", protecto: "—" },
  { system: "One-component PU membrane — water-based low VOC", ardex: "—", sika: "Sika Topseal-107W", fosroc: "—", parchem: "—", tremco: "—", protecto: "—" },
  { system: "Two-component flexible cementitious — fast set", ardex: "Ardex 8+9", sika: "—", fosroc: "—", parchem: "Mapei Mapelastic Foundation", tremco: "—", protecto: "—" },
  { system: "Two-component flexible cementitious — standard", ardex: "Ardex 7+8", sika: "—", fosroc: "—", parchem: "Mapei Mapelastic Foundation", tremco: "—", protecto: "—" },
  { system: "Two-component polyurethane — fast cure", ardex: "—", sika: "—", fosroc: "—", parchem: "—", tremco: "—", protecto: "Protecto Balcony Guard" },
];

const TAG_COLOR: Record<string, string> = {
  blue: "bg-sky-100 text-sky-800",
  green: "bg-emerald-100 text-emerald-800",
  default: "bg-slate-100 text-slate-700",
};

export default function LiquidAppliedPUPage() {
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
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
            <a href="/directory/login" className="whitespace-nowrap hover:text-red-700 transition">Login</a>
            <a href="/directory/login" className="whitespace-nowrap hover:text-red-700 transition">Login</a>
          </nav>
          <a href="/newsletter" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Subscribe</a>
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
              <a href="/repair-systems/waterproofing-water-ingress" className="hover:text-sky-700 transition">Waterproofing Systems</a>
              <span>/</span>
              <a href="/repair-systems/balcony-waterproofing-failure" className="hover:text-sky-700 transition">Balcony waterproofing failure</a>
              <span>/</span>
              <span className="text-sky-950">Liquid applied membranes — polyurethane</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Repair Systems — 01</p>
                <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-5xl">
                  Liquid applied polyurethane membranes — balcony waterproofing repair
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Technical reference for liquid-applied polyurethane waterproofing membranes — balcony waterproofing failure in Australian remedial building practice. Covers system selection, product comparisons, and brand equivalents.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {[
                  { label: "Products listed", value: "8" },
                  { label: "Brands available", value: "5" },
                  { label: "Pack size", value: "15 kg pail" },
                  { label: "Unit", value: "pail" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-100 bg-white p-3 text-center">
                    <div className="text-lg font-extrabold leading-tight text-sky-950">{s.value}</div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Sibling tabs ── */}
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end gap-0 overflow-x-auto">
              {SIBLING_TABS.map((tab) => {
                const active = tab.slug === "liquid-applied-membranes-polyurethane";
                return (
                  <a
                    key={tab.slug}
                    href={`/repair-systems/balcony-waterproofing-failure/${tab.slug}`}
                    className={`relative shrink-0 border-b-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition ${
                      active ? "border-red-700 text-sky-950" : "border-transparent text-slate-500 hover:text-sky-900"
                    }`}
                  >
                    {tab.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <section className="px-8 py-14">
          <div className="mx-auto max-w-7xl space-y-10">

            {/* What is it */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
                  <BookOpen size={15} />
                </div>
                <h3 className="text-base font-extrabold text-sky-950">What is liquid-applied polyurethane waterproofing?</h3>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                Liquid-applied polyurethane membranes are the most widely specified waterproofing system for balcony remediation on Class 2 apartment buildings in Australia. Applied by roller or brush directly to prepared and primed concrete substrate, they cure to form a seamless, flexible membrane that accommodates thermal movement and minor substrate cracking without loss of integrity. Polyurethane systems are available as one-component moisture-curing or two-component systems, solvent-based or water-based, and are typically applied in two coats to achieve a minimum 1.0–1.5 mm dry film thickness compliant with AS 3740. A bond coat primer is mandatory on all substrates — application without primer is the single most common cause of premature delamination on balcony remediation projects. The correct installation sequence is: substrate preparation — primer — membrane to angles and junctions — reinforcing fabric embedded at all corners, coves and penetrations — full first coat — full second coat — flood test minimum 24 hours before any tiles or screed are placed. Flood testing to AS 3740 is non-negotiable before proceeding with protection and tiling.
              </p>
            </div>

            {/* Technical Accordion */}
            <details className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between px-7 py-5 text-base font-extrabold text-sky-950 [&::-webkit-details-marker]:hidden">
                System Technical Reference
                <ChevronDown size={18} className="shrink-0 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <div className="grid gap-6 border-t border-slate-100 px-7 py-6 sm:grid-cols-2">
                {[
                  {
                    title: "Typical applications",
                    items: [
                      "Balcony waterproofing remediation — Class 2 strata apartment buildings",
                      "Wet area waterproofing — bathrooms, laundries and ensuites",
                      "External deck waterproofing — podium and terrace areas",
                      "Trafficable deck waterproofing with tile or screed protection",
                    ],
                  },
                  {
                    title: "Selection criteria",
                    items: [
                      "Specify solvent-based PU where maximum elongation and early water resistance are required",
                      "Specify water-based PU for enclosed or poorly ventilated internal wet areas",
                      "Specify two-component systems in high-humidity coastal environments where moisture-curing is unreliable",
                      "Primer selection must be confirmed with manufacturer — do not substitute",
                    ],
                  },
                  {
                    title: "Limitations",
                    items: [
                      "Primer is mandatory on all substrates — single most common failure cause is missing primer",
                      "Minimum application temperature typically 10°C — confirm with manufacturer",
                      "Solvent-based systems require adequate ventilation during application",
                      "Two-coat minimum to achieve AS 3740 dry film thickness — single coat insufficient",
                      "Not directly trafficable without screed or tile protection layer",
                    ],
                  },
                  {
                    title: "Standards compliance",
                    items: [
                      "AS 3740 — Waterproofing of Domestic Wet Areas — minimum standard for Class 2 balconies",
                      "AS 4858 — Wet Area Membranes — product compliance standard",
                      "NCC performance requirements applicable to the building classification",
                      "Flood test to AS 3740 mandatory before tiling or screed placement",
                    ],
                  },
                  {
                    title: "Suitable substrates",
                    items: [
                      "In-situ reinforced concrete — primed per manufacturer requirements",
                      "Precast concrete panels",
                      "Screeded concrete — confirm cure and moisture content before applying membrane",
                      "Previously waterproofed substrates — confirm compatibility with manufacturer",
                    ],
                  },
                ].map((section) => (
                  <div key={section.title}>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-red-700">{section.title}</p>
                    <ul className="space-y-1.5">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>

            {/* Filter chips */}
            <div>
              <div className="mb-4 flex items-start gap-3">
                <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                <div>
                  <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
                  <p className="mt-1 text-sm text-slate-500">8 products — 5 brands — scroll to view all</p>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {[
                  { group: "Brands", chips: ["Sika", "Ardex", "Fosroc", "Parchem", "Tremco", "Protecto"] },
                  { group: "Standards", chips: ["AS 3740", "AS 4858"] },
                  { group: "Types", chips: ["One-component", "Two-component", "Water-based", "Solvent-based", "Trafficable over tiles", "Internal wet area"] },
                ].map(({ group, chips }) => (
                  <div key={group} className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{group}:</span>
                    {chips.map((chip) => (
                      <span key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">{chip}</span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Product cards */}
              <div className="space-y-6">
                {PRODUCTS.map((product) => (
                  <div key={product.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-red-700">{product.brand}</p>
                        <h3 className="mt-1 text-lg font-extrabold text-sky-950">{product.name}</h3>
                        <p className="mt-0.5 text-sm text-slate-500">{product.descriptionLine}</p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 text-right">
                        {product.tdsUrl && (
                          <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-sky-700 hover:text-sky-500 underline underline-offset-2">
                            TDS ↗
                          </a>
                        )}
                        <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-500 hover:text-slate-700 underline underline-offset-2">
                          Brand site ↗
                        </a>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 border-b border-slate-100 px-6 py-3">
                      {product.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className={`rounded-full px-3 py-0.5 text-xs font-semibold ${TAG_COLOR[tag.color ?? "default"]}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>

                    {/* Body */}
                    <div className="grid gap-6 px-6 py-6 md:grid-cols-[1fr_1fr_1fr]">
                      {/* System description */}
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">System Description</p>
                        <p className="text-xs leading-6 text-slate-600">{product.systemDescription}</p>
                      </div>

                      {/* Technical properties + Limitations */}
                      <div className="space-y-5">
                        <div>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">Technical Properties</p>
                          <ul className="space-y-1.5">
                            {product.technicalProperties.map((prop) => (
                              <li key={prop} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-500" />
                                {prop}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-amber-700">Limitations</p>
                          <ul className="space-y-1.5">
                            {product.limitations.map((lim) => (
                              <li key={lim} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                                {lim}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Procurement */}
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Procurement Sources</p>
                        <ul className="space-y-2">
                          {product.procurementSources.map((src) => (
                            <li key={src.url}>
                              <a
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 text-xs leading-5 text-sky-700 hover:text-sky-500"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                                {src.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Equivalents Table */}
            <div>
              <div className="mb-6 flex items-start gap-3">
                <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
                <div>
                  <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
                  <p className="mt-1 text-sm text-slate-500">Side-by-side view of equivalent products across all major brands.</p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System</th>
                      <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Ardex</th>
                      <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Sika</th>
                      <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Fosroc</th>
                      <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Parchem / Mapei</th>
                      <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Tremco</th>
                      <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Protecto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BRAND_EQUIV.map((row, i) => (
                      <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                        {[row.ardex, row.sika, row.fosroc, row.parchem, row.tremco, row.protecto].map((val, j) => (
                          <td key={j} className="px-4 py-3 text-slate-600">
                            {val === "—" ? <span className="text-slate-300">—</span> : val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="border-t border-slate-200 bg-slate-50 px-8 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Disclaimer</p>
              <p className="text-xs leading-6 text-amber-900">
                Information is general only. Product selection must be confirmed against project requirements, substrate condition, exposure class, manufacturer technical data sheets, NCC requirements, Australian Standards including AS 3740 and AS 4858, and consultant or waterproofing engineer specifications. Do not rely on this reference as a substitute for professional engineering or waterproofing consultant advice.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/defect-library/waterproofing-water-ingress/balcony-waterproofing-failure",
                  label: "Defect Library — Balcony Waterproofing Failure",
                  title: "Identify defect types, causes and repair pathways before selecting a system",
                  desc: "",
                },
                {
                  href: "/repair-systems/waterproofing-water-ingress",
                  label: "Back to Waterproofing Systems",
                  title: "Browse all waterproofing defect subcategories",
                  desc: "",
                },
                {
                  href: "/repair-systems/balcony-waterproofing-failure",
                  label: "Back to Balcony Waterproofing Failure",
                  title: "Browse all product categories for this defect",
                  desc: "",
                },
                {
                  href: "/ai-scope-builder/new",
                  label: "AI Scope Builder",
                  title: "Generate a Scope of Works",
                  title2: "Use the AI Scope Builder to assemble a remedial scope",
                  desc: "",
                },
              ].map((card) => (
                <a key={card.href} href={card.href} className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 hover:shadow-md">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">{card.label}</div>
                  <h4 className="text-sm font-extrabold leading-snug text-sky-950">{card.title}</h4>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-sky-700 group-hover:text-red-700 transition">
                    Open <ArrowRight size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/repair-systems/balcony-waterproofing-failure" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Balcony Waterproofing Failure</a>
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
