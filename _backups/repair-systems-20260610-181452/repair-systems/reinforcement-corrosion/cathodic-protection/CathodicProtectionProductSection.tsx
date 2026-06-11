"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";

type FilterTag =
  | "Galvanic-discrete"
  | "Galvanic-mesh"
  | "ICCP"
  | "Chloride"
  | "Marine"
  | "Carpark"
  | "No-power"
  | "Impressed-current";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Vector Corrosion Technologies / Local Distributor",
    brandUrl: "https://www.vectorcorrosion.com",
    accentColor: "#0369a1",
    name: "Galvashield XP Discrete Anode",
    descriptionLine: "TODO: owner confirm — vectorcorrosion.com returned TLS certificate error during audit; could not verify product name, specifications, or current AU distributor from live source — embedded discrete zinc galvanic anode — installed in drilled pockets adjacent to repaired rebar in patch repairs — no external power required",
    productType: "Discrete embedded zinc galvanic anode — TODO: owner confirm from Vector Corrosion current AU distributor",
    filterTags: ["Galvanic-discrete", "Chloride", "Marine", "Carpark", "No-power"],
    techChips: [
      { label: "Discrete zinc galvanic anode", cls: "bg-sky-100 text-sky-800" },
      { label: "No external power required", cls: "bg-slate-100 text-slate-700" },
      { label: "Installed at patch repair perimeter", cls: "bg-amber-50 text-amber-700" },
      { label: "Vector Corrosion — via distributor", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Galvashield XP is a discrete embedded zinc galvanic anode used in patch repair of reinforced concrete structures affected by chloride-induced corrosion. The anode is installed in drilled pockets in the concrete adjacent to the cleaned rebar at the perimeter of each patch repair — this is specifically intended to address the 'incipient anode' or 'halo effect', where the undisturbed concrete immediately surrounding a patch repair has elevated corrosion risk due to galvanic coupling between the repaired zone and the adjacent contaminated concrete. The zinc anode corrodes sacrificially, providing cathodic protection to the surrounding rebar. Requires no external power supply — entirely galvanic action driven by the electrochemical potential difference between zinc and steel in the concrete electrolyte. Install at the density and spacing specified by the corrosion engineer. Available through Vector Corrosion Technologies Australian distributors — confirm current distributor and supply before specifying.",
    technicalProperties: [
      "Discrete zinc galvanic anode — installed in drilled pockets at patch repair perimeter",
      "No external power required — galvanic (sacrificial) action",
      "Addresses the incipient anode / halo effect at patch repair edges",
      "Available through Vector Corrosion Technologies Australian distributors",
    ],
    limitations: [
      "Galvanic current output is limited — not suitable for heavily contaminated structures where high protective current density is required; ICCP may be needed",
      "Effectiveness depends on concrete resistivity — high-resistivity (dry) concrete reduces galvanic current output; confirm suitability with a corrosion engineer",
      "Installation requires drilling pockets and connecting to the existing rebar — specialist corrosion contractor preferred",
      "Confirm current Australian distributor for Galvashield XP before specifying — availability can vary by state",
    ],
    procurementSources: [
      { name: "Vector Corrosion Technologies — Australian distributors (confirm)", url: "https://www.vectorcorrosion.com" },
    ],
  },
  {
    fullLabel: "Specialist Corrosion Contractor",
    brandUrl: "https://www.corrpro.com.au",
    accentColor: "#7c3aed",
    name: "Impressed Current Cathodic Protection (ICCP) System",
    descriptionLine: "TODO: owner confirm — corrpro.com.au returned connection refused during audit; could not verify CorrPro AU current services or contact details from live source — engineered impressed current cathodic protection system — external power supply drives protective current through embedded anode mesh or ribbon — specialist design and installation",
    productType: "Impressed current cathodic protection (ICCP) system — TODO: owner confirm CorrPro AU current",
    filterTags: ["ICCP", "Chloride", "Marine", "Carpark", "Impressed-current"],
    techChips: [
      { label: "Impressed current system", cls: "bg-violet-100 text-violet-800" },
      { label: "External power supply required", cls: "bg-amber-100 text-amber-900" },
      { label: "Specialist engineering design", cls: "bg-slate-100 text-slate-700" },
      { label: "Ongoing monitoring required", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Impressed current cathodic protection (ICCP) systems apply a controlled DC current from an external power supply through an anode system installed on or within the concrete structure, driving the reinforcement cathodic and suppressing the anodic corrosion reaction at the steel surface. ICCP is the most powerful and controllable form of cathodic protection for reinforced concrete — capable of protecting large areas with high chloride contamination where galvanic systems are insufficient. The anode system may be titanium mesh, ribbon, or conductive coating embedded in a repair overlay, or installed on the concrete surface. ICCP systems require specialist corrosion engineering design, third-party commissioning, and ongoing monitoring and maintenance — they are not a standard trade product but a complete engineered system. Designers and specifiers should engage a NACE/AMPP-accredited corrosion engineer for ICCP system design. CorrPro Australia is one of several specialist ICCP contractors operating in Australia.",
    technicalProperties: [
      "Impressed current — DC power supply drives protective current through the structure",
      "Can protect large areas and heavily chloride-contaminated structures",
      "Requires specialist engineering design, commissioning, and ongoing monitoring",
      "Multiple anode types — titanium mesh, ribbon, conductive coating overlay",
    ],
    limitations: [
      "Requires a permanent external power supply — loss of power means loss of protection",
      "Requires specialist engineering design by a qualified corrosion engineer — not a trade-supply product",
      "Requires ongoing monitoring and maintenance under a corrosion engineer's program — budget accordingly",
      "Overprotection risk (hydrogen embrittlement in high-strength or prestressed steel) if current output is not controlled — critical to have a qualified design and commissioning team",
    ],
    procurementSources: [
      { name: "CorrPro Australia — ICCP specialist (one of several)", url: "https://www.corrpro.com.au" },
    ],
  },
  {
    fullLabel: "Vector Corrosion Technologies / Sika / Local Distributor",
    brandUrl: "https://www.vectorcorrosion.com",
    accentColor: "#16a34a",
    name: "Galvanic Mesh Anode System",
    descriptionLine: "Zinc or aluminium galvanic mesh anode embedded in repair overlay or bonded to concrete surface — large-area galvanic protection without external power",
    productType: "Embedded galvanic mesh anode system",
    filterTags: ["Galvanic-mesh", "Chloride", "Marine", "No-power"],
    techChips: [
      { label: "Galvanic mesh anode", cls: "bg-green-100 text-green-900" },
      { label: "Embedded in repair overlay", cls: "bg-slate-100 text-slate-700" },
      { label: "No external power required", cls: "bg-amber-50 text-amber-700" },
      { label: "Large-area application", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Galvanic mesh anode systems use expanded zinc or aluminium mesh embedded in a repair overlay or bonded to the concrete surface to provide large-area galvanic cathodic protection without an external power supply. The mesh is installed over the prepared concrete surface, connected to the reinforcing steel, and then overlaid with a cementitious or polymer-modified repair mortar. The galvanic action of the zinc or aluminium mesh in contact with the concrete electrolyte drives a protective current to the reinforcement below. Used on large soffit areas, seawalls, jetty decks, and carpark slabs where discrete anodes are insufficient and ICCP is not feasible. Products include Sika Ferrogard-embedded mesh systems, Vector Corrosion Technologies galvanic mesh, and similar products. Confirm current product availability, installation requirements, and expected service life from the supplier or a corrosion engineer before specifying.",
    technicalProperties: [
      "Expanded zinc or aluminium mesh — embedded in repair overlay or bonded to surface",
      "No external power required — galvanic action",
      "Suitable for large-area soffits, seawalls, jetty decks, carpark slabs",
      "Connected to existing rebar — protective current flows through the concrete electrolyte",
    ],
    limitations: [
      "Protective current output is limited — check with corrosion engineer that the expected current density is sufficient for the chloride contamination level",
      "Requires a competent cementitious or polymer-modified overlay over the mesh — overlay quality is critical to system performance",
      "Service life is finite — zinc anodes consumed over time; design service life should be confirmed from the corrosion engineer's report",
      "Confirm specific mesh product and installation protocol from the supplier — multiple systems available (Vector, Sika, others) with different design life and performance data",
    ],
    procurementSources: [
      { name: "Vector Corrosion Technologies — Australian distributors", url: "https://www.vectorcorrosion.com" },
      { name: "Sika Australia — mesh anode systems", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Galvanic-discrete", label: "Galvanic discrete" },
  { id: "Galvanic-mesh", label: "Galvanic mesh" },
  { id: "ICCP", label: "ICCP" },
  { id: "Chloride", label: "Chloride" },
  { id: "Marine", label: "Marine" },
  { id: "Carpark", label: "Carpark" },
  { id: "No-power", label: "No power required" },
  { id: "Impressed-current", label: "Impressed current" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Galvashield XP Discrete Anode",
    type: "Galvanic discrete",
    power: "None required",
    use: "Patch repair perimeter — halo effect",
    notes: "Simple installation — drilled pocket at repair edge",
  },
  {
    product: "ICCP System",
    type: "Impressed current",
    power: "External DC supply",
    use: "Large area, high chloride contamination",
    notes: "Specialist engineering design and ongoing monitoring required",
  },
  {
    product: "Galvanic Mesh Anode",
    type: "Galvanic mesh",
    power: "None required",
    use: "Large-area overlay — soffits, seawalls, carparks",
    notes: "Embedded in repair overlay — finite service life",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Galvashield XP discrete anodes installed at the perimeter of patch repairs on chloride-affected carparks, balconies, and marine structures — addressing the incipient anode/halo effect",
    "ICCP systems on large chloride-contaminated structures such as multi-storey carparks, wharves, jetties, and bridges where galvanic systems cannot provide sufficient protective current",
    "Galvanic mesh anode systems embedded in repair overlays on seawalls, jetty decks, and carpark slab soffits as a large-area protection strategy",
    "Post-repair cathodic protection where chloride levels in the residual concrete outside the repair zone are above the corrosion threshold",
    "New construction with elevated chloride risk — galvanic or impressed current systems designed into new parking structures or marine infrastructure",
    "Protective treatment combined with MCI surface treatment — where cathodic protection is the primary method and MCI provides supplementary protection",
  ],
  selectionCriteria: [
    "Use discrete galvanic anodes (Galvashield XP) for patch repair applications where the primary concern is the incipient anode effect at the repair boundary — straightforward installation, no ongoing power required",
    "Use ICCP systems where the chloride level in residual concrete is very high, the area is large, or where high protective current density is required to suppress active corrosion in heavily contaminated structures",
    "Use galvanic mesh anode systems for large-area overlay applications on soffits, seawalls, and carpark decks where discrete anodes cannot cover the area efficiently",
    "Engage a NACE/AMPP-accredited corrosion engineer for any cathodic protection design — system design, current density requirements, and monitoring protocols must be engineered for the specific structure",
    "Consider concrete resistivity — low-resistivity (wet) concrete supports galvanic systems better; high-resistivity (dry) concrete may require ICCP to deliver adequate protective current",
    "Confirm service life requirements — ICCP can be adjusted and maintained indefinitely; galvanic systems have a finite service life determined by the anode mass and current output",
  ],
  limitations: [
    "Cathodic protection is not a repair — it does not restore lost concrete section, reinstate bond, or repair spalled areas; physical repair must accompany or precede cathodic protection",
    "All cathodic protection systems require a qualified corrosion engineer for design and commissioning — do not specify or install without specialist involvement",
    "Overprotection of prestressed or post-tensioned steel is a critical risk — hydrogen embrittlement can cause catastrophic failure — never apply cathodic protection to prestressed steel without specialist engineering review",
    "ICCP systems require ongoing maintenance and periodic current adjustment — if the maintenance budget or access for monitoring cannot be sustained, galvanic systems may be more appropriate",
    "Galvanic anodes have a finite service life — the design service life must be confirmed from the corrosion engineer's report and factored into the long-term maintenance plan",
    "Cathodic protection does not chloride-extract the existing concrete — chloride levels in residual concrete remain; continued corrosion management is required over the structure's remaining life",
  ],
  standardsNotes: [
    "AS 2832.5 — Cathodic protection of metals — internal surfaces — referenced for general cathodic protection principles",
    "AS/NZS 2832.1 — Cathodic protection of metals — pipes — for general CP design context",
    "EN 12696 — Cathodic protection of steel in concrete — the primary standard for cathodic protection of reinforced concrete in Europe; widely referenced by Australian corrosion engineers",
    "NACE SP0290 / AMPP SP0290 — corrosion control of reinforcing steel in atmospherically exposed concrete structures — design and application guidance",
    "AS 3600 — structural requirements for any overlay or repair mortar used as part of a cathodic protection system installation",
  ],
  suitableDefects: [
    "Chloride-induced reinforcement corrosion — the primary indication for cathodic protection in reinforced concrete",
    "Structures with residual chloride contamination above the corrosion threshold in the concrete surrounding active patch repairs — where the incipient anode effect is a concern",
    "Large-area chloride contamination on carpark slabs, seawalls, wharves, and jetties — where physical repair of all contaminated concrete is not feasible",
    "Post-repair protection where the cost of removing all chloride-contaminated concrete would be prohibitive",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — carpark decks and soffits, balconies, building facades, seawalls, wharves, jetties, bridges",
    "Precast concrete with embedded reinforcement — piles, beams, panels in marine or coastal environments",
    "Concrete structures with residual chloride contamination above the corrosion threshold (typically 0.4% Cl⁻ by mass of cement)",
    "Do NOT apply to prestressed or post-tensioned concrete without specialist corrosion engineering review — hydrogen embrittlement risk",
  ],
};

export function CathodicProtectionIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Cathodic protection systems for reinforced concrete structures</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cathodic protection (CP) is an electrochemical technique that suppresses the anodic oxidation of steel reinforcement by driving a protective current to the rebar surface. It is used where chloride contamination levels in the residual concrete are above the corrosion threshold and physical removal of all contaminated concrete is not feasible or economical. CP does not remove chloride or restore lost section — it arrests ongoing corrosion by keeping the steel in a cathodic (protected) electrochemical state.
        </p>
        {expanded && (
          <>
            <p>
              Two main CP approaches are used in Australian reinforced concrete: galvanic (sacrificial anode) systems, where zinc or aluminium anodes corrode preferentially to drive a protective current without external power; and impressed current cathodic protection (ICCP), where an external DC power supply drives the protective current through an embedded or surface-mounted anode system. Galvanic discrete anodes (Galvashield XP) are widely used in patch repair to address the incipient anode (halo) effect. ICCP is used for large-area, heavily contaminated structures. All CP system design must be carried out by a qualified corrosion engineer — do not specify or install without specialist involvement.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function CathodicProtectionProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts = activeFilters.size === 0
    ? PRODUCTS
    : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 cathodic protection system types — galvanic and impressed current — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Cathodic protection system types for reinforced concrete. All systems require corrosion engineering design — confirm from a qualified specialist before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Power required</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Best use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.power}</td>
                  <td className="px-4 py-3 text-slate-600">{row.use}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
