"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "SBR-Latex" | "Acrylic-Primer" | "Pre-Mortar" | "Concrete" | "Masonry" | "Bonding-Agent" | "Slurry-Bond";

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
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au/products",
    accentColor: "#0369a1",
    name: "Ardex P 51 — Water-Based Acrylic Bonding Primer",
    descriptionLine: "Water-based acrylic adhesion primer for concrete and masonry substrates before PM repair mortar application — Ardex trade supply nationally",
    productType: "Acrylic bonding primer — pre-mortar application — concrete and masonry",
    filterTags: ["Acrylic-Primer", "Pre-Mortar", "Concrete", "Masonry", "Bonding-Agent"],
    techChips: [
      { label: "Acrylic primer", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Pre-mortar", cls: "bg-slate-100 text-slate-700" },
      { label: "Ardex system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex P 51 is a water-based acrylic bonding primer for concrete and masonry substrates, applied before Ardex BR 340 and other Ardex polymer-modified repair mortars in slab edge repair work. The primer functions as an adhesion bridge between the existing concrete substrate and the repair mortar, significantly increasing the bond strength compared to unprimed concrete. Application method: brush, roller, or spray onto the clean, prepared, and saturated-surface-dry concrete substrate. Allow the primer to dry to a tacky-but-not-dry state, then apply the repair mortar. The timing window for mortar application over the tacky primer is critical — if the primer dries completely before mortar placement, it must be re-primed. Do not allow primer to dry completely before applying mortar. Ardex P 51 is also used as a primer before Ardex floor levelling compounds in internal floor applications. Confirm current DFT, spread rate, and overcoat interval from the current Ardex Australia TDS before use.",
    technicalProperties: [
      "Water-based acrylic formulation — low VOC — suitable for occupied building environments",
      "Applied by brush, roller, or spray to clean, prepared concrete and masonry",
      "Apply to saturated-surface-dry substrate — do not apply to standing water or dry dusty concrete",
      "Mortar must be applied while primer is still tacky — re-prime if primer has dried completely",
      "Improves bond strength of repair mortar to substrate significantly",
      "Available through Ardex trade supply nationally",
    ],
    limitations: [
      "Do not allow primer to dry completely before applying repair mortar — timing is critical",
      "Not a substitute for mechanical substrate preparation — substrate must be clean, sound, and correctly profiled before priming",
      "Do not apply to contaminated, oily, or dusty surfaces — surface preparation is mandatory",
      "Confirm compatibility with chosen Ardex repair mortar from current Ardex Australia TDS",
      "Not suitable as a standalone waterproofing product",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply nationally", url: "https://www.ardex.com.au" },
      { name: "Ardex distributor network — confirm local branch", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-and-protection.html",
    accentColor: "#be123c",
    name: "Sika Latex SBR — SBR Bonding Agent and Admixture",
    descriptionLine: "Styrene-butadiene rubber (SBR) latex bonding agent and mortar admixture — applied as slurry bond coat or added to mortar mix — Sika Australia national distribution",
    productType: "SBR latex bonding agent and mortar polymer admixture — Sika Australia",
    filterTags: ["SBR-Latex", "Pre-Mortar", "Concrete", "Masonry", "Bonding-Agent", "Slurry-Bond"],
    techChips: [
      { label: "SBR latex", cls: "bg-rose-100 text-rose-800" },
      { label: "Bonding agent + admixture", cls: "bg-slate-100 text-slate-700" },
      { label: "Slurry bond coat", cls: "bg-green-50 text-green-700" },
      { label: "Sika — nationally available", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Latex SBR is a styrene-butadiene rubber latex bonding agent and mortar polymer admixture for concrete repair, slab edge repair, and substrate preparation work. It has two primary applications: (1) as a slurry bond coat — mixed with cement powder to form a cement-SBR paste that is scrubbed into the prepared concrete substrate as a bonding slurry before mortar application — and (2) as a polymer admixture added to the repair mortar mix water to improve adhesion, reduce shrinkage, and enhance flexibility. In slab edge repair, the slurry bond coat application is the most common use — scrub the SBR-cement slurry into the prepared, saturated-surface-dry concrete surface and apply the polymer-modified mortar into the wet slurry before it dries. Do not allow the slurry bond coat to dry before placing mortar — this is the most common application error and results in a weak bond plane. Sika Latex SBR is widely available through Bayset and Bunnings nationally. Confirm current mix ratios and application instructions from the current Sika Australia TDS.",
    technicalProperties: [
      "Dual use: slurry bond coat (SBR + cement paste) or polymer admixture to mortar mix water",
      "Slurry bond coat: scrub into prepared SSD concrete — apply mortar into wet slurry",
      "Improves adhesion, reduces shrinkage, increases flexibility of repair mortar when used as admixture",
      "Widely available through Bunnings, Bayset, and Sika trade channels nationally",
      "Compatible with Sika MonoTop repair mortars and general cementitious repair mortars",
      "5 L pack — confirm mix ratios and spread rate from current Sika Australia TDS",
    ],
    limitations: [
      "Slurry bond coat must NOT be allowed to dry before applying mortar — re-prime if dried",
      "Mix ratio for slurry bond coat and admixture application must be confirmed from current Sika TDS — incorrect ratios reduce effectiveness",
      "Not a structural adhesive — bond strength is a function of substrate preparation quality",
      "Do not add excess SBR to mortar mix — over-polymer addition can retard set and reduce compressive strength",
      "Confirm compatibility when used as admixture with proprietary repair mortar systems",
    ],
    procurementSources: [
      { name: "Bunnings — Sika Latex SBR nationally", url: "https://www.bunnings.com.au" },
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Australia",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products/fosroc",
    accentColor: "#15803d",
    name: "Fosroc Nitobond SBR — SBR Latex Bonding Agent",
    descriptionLine: "SBR latex bonding agent for concrete and masonry — used as slurry bond coat before repair mortar or as polymer admixture — Fosroc product distributed by Parchem nationally",
    productType: "SBR latex bonding agent — concrete repair — Fosroc / Parchem",
    filterTags: ["SBR-Latex", "Pre-Mortar", "Concrete", "Masonry", "Bonding-Agent", "Slurry-Bond"],
    techChips: [
      { label: "SBR latex", cls: "bg-green-100 text-green-800" },
      { label: "Slurry bond coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Mortar admixture", cls: "bg-blue-50 text-blue-700" },
      { label: "Parchem distribution", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitobond SBR is an SBR latex bonding agent for concrete and masonry repair, distributed in Australia by Parchem. It is used as a slurry bond coat before Fosroc Renderoc repair mortars and other cementitious repair mortars, and can also be used as a polymer admixture in site-batched repair mortars. For the slurry bond coat application in slab edge repair: mix Nitobond SBR with cement powder to form a workable paste, scrub the slurry firmly into the prepared and dampened concrete substrate, and immediately apply the repair mortar into the wet slurry. The slurry must remain wet when the mortar is applied — do not allow it to dry. As a mortar admixture, Nitobond SBR is added to the gauging water in the proportions specified in the current Fosroc TDS, replacing part of the mix water. Confirm current mix ratios, application rates, and system compatibility from the current Fosroc Nitobond SBR TDS available through Parchem before specifying.",
    technicalProperties: [
      "SBR latex — slurry bond coat or polymer admixture to repair mortar",
      "Slurry bond coat: cement + Nitobond SBR paste scrubbed into prepared SSD substrate",
      "Apply mortar into wet slurry before bond coat dries — critical timing requirement",
      "Improves adhesion and flexibility of repair mortar system",
      "Compatible with Fosroc Renderoc range — confirm compatibility with other mortar brands",
      "Distributed nationally through Parchem — confirm local availability",
    ],
    limitations: [
      "Slurry bond coat must remain wet when mortar is applied — do not allow to dry",
      "Confirm mix ratios from current Fosroc TDS — incorrect proportions reduce bond effectiveness",
      "Not compatible with all mortar systems — confirm with Parchem/Fosroc technical for third-party mortar combinations",
      "Substrate must be clean, mechanically prepared, and sound before priming",
      "Confirm current availability and product specifications with Parchem before ordering",
    ],
    procurementSources: [
      { name: "Parchem — national distribution of Fosroc products", url: "https://www.parchem.com.au" },
      { name: "Parchem trade branches — confirm local availability", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#78716c",
    name: "Tremco THC Bonding Agent — Acrylic Bonding Primer",
    descriptionLine: "Acrylic bonding primer for concrete and masonry — applied before Tremco repair mortars on slab edge and concrete patch repair — Tremco CPG Australia",
    productType: "Acrylic bonding primer — pre-mortar application — Tremco CPG Australia",
    filterTags: ["Acrylic-Primer", "Pre-Mortar", "Concrete", "Masonry", "Bonding-Agent"],
    techChips: [
      { label: "Acrylic bonding primer", cls: "bg-stone-100 text-stone-700" },
      { label: "Pre-mortar", cls: "bg-slate-100 text-slate-700" },
      { label: "Tremco CPG system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco THC Bonding Agent is an acrylic adhesion primer used as part of the Tremco CPG concrete repair system for slab edge and structural concrete patch repair. Applied to the prepared and saturated-surface-dry substrate before Tremco repair mortar application, it provides an adhesion bridge that improves the bond between the existing concrete and the applied repair mortar. The product is applied in a thin coat by brush or roller, allowed to reach a tacky state, and the repair mortar is then applied while the primer is still tacky. Do not allow the primer to dry completely before applying mortar. Tremco CPG provides a range of complementary products including corrosion inhibitor primers for exposed reinforcement and protective coatings for application over cured repairs. Confirm current product name, DFT, and overcoat window from the current Tremco CPG Australia TDS before specifying.",
    technicalProperties: [
      "Acrylic bonding primer — applied by brush or roller to prepared SSD concrete",
      "Apply mortar while primer is still tacky — critical timing requirement",
      "Part of Tremco CPG repair mortar system — confirm system compatibility",
      "Improves adhesion of Tremco repair mortars to existing concrete substrate",
    ],
    limitations: [
      "Do not allow primer to dry completely before applying repair mortar",
      "Confirm current product name and specifications with Tremco CPG Australia",
      "Not a standalone waterproofing product",
      "Substrate must be mechanically prepared and free of contamination before priming",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply", url: "https://www.tremcosealants.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "SBR-Latex", label: "SBR latex" },
  { tag: "Acrylic-Primer", label: "Acrylic primer" },
  { tag: "Pre-Mortar", label: "Pre-mortar" },
  { tag: "Concrete", label: "Concrete" },
  { tag: "Masonry", label: "Masonry" },
  { tag: "Bonding-Agent", label: "Bonding agent" },
  { tag: "Slurry-Bond", label: "Slurry bond coat" },
];

const TECH_INFO = {
  typicalApplications: [
    "Bonding primer before polymer-modified repair mortar on slab edge",
    "Slurry bond coat before cementitious repair mortar on concrete and masonry",
    "Polymer admixture for site-batched repair mortars to improve adhesion",
    "Primer before floor levelling and patching compounds",
    "Adhesion improver for concrete patch repairs on fascia beams and soffits",
  ],
  selectionCriteria: [
    "System compatibility — use the primer specified by the repair mortar manufacturer",
    "Application method — acrylic primers are brush/roller applied; SBR slurries require scrubbing action",
    "Substrate porosity — highly porous substrates may require a second primer coat",
    "Working temperature — confirm open time and pot life for ambient temperature on site",
    "Timing window — acrylic primers have a defined tacky window; SBR slurry must remain wet",
  ],
  limitations: [
    "Never apply repair mortar over a fully dried primer or dried SBR slurry bond coat — adhesion will be very poor",
    "Substrate must be mechanically prepared (CSP 3 minimum) before any primer or bonding agent is applied",
    "Do not apply to dusty, contaminated, or oily surfaces — contamination prevents adhesion",
    "Bonding agent is not a substitute for correct surface preparation — it enhances prepared surfaces, not replaces preparation",
    "Do not use general-purpose acrylic bonding agents from hardware trade as substitutes for manufacturer-specified systems",
  ],
  standardsNotes: [
    "EN 1504-3 — requires use of primer systems compatible with the repair mortar system",
    "ICRI 310.2 — surface preparation CSP profile must be achieved before bonding agent application",
    "AS 3600 — concrete cover and exposure class requirements govern repair system selection",
    "Manufacturer ITPs typically specify primer product by name — substitution requires technical approval",
  ],
  suitableDefects: [
    "Slab edge spalling requiring polymer-modified repair mortar",
    "Concrete patch repair on fascia beams and soffits",
    "Step nosing and stair tread edge repair over prepared concrete",
    "All concrete patch repairs where adhesion to existing substrate is required",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — slab edges, beams, and columns",
    "Precast concrete panel edges",
    "Concrete block and masonry (acrylic primers only — confirm SBR compatibility)",
    "Previously repaired concrete (confirm compatibility with existing repair material)",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Ardex P 51", brand: "Ardex", type: "Acrylic primer", method: "Brush/roller", timing: "Apply mortar while tacky" },
  { product: "Sika Latex SBR", brand: "Sika", type: "SBR latex", method: "Slurry or admixture", timing: "Apply mortar into wet slurry" },
  { product: "Fosroc Nitobond SBR", brand: "Fosroc/Parchem", type: "SBR latex", method: "Slurry or admixture", timing: "Apply mortar into wet slurry" },
  { product: "THC Bonding Agent", brand: "Tremco CPG", type: "Acrylic primer", method: "Brush/roller", timing: "Apply mortar while tacky" },
];

export function BondingAgentsSBRIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Why bonding agents are mandatory in slab edge repair</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">The adhesion mechanism, timing requirements, and the difference between SBR slurry and acrylic primer</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>A bonding agent or bonding primer is not optional in concrete slab edge repair — it is a mandatory part of the repair system. Without a bonding agent, the interface between the existing concrete substrate and the applied repair mortar is a dry-to-dry cement bond with very low tensile adhesion strength, typically 0.5–1.0 MPa or less. With a correctly applied acrylic primer or SBR slurry bond coat, adhesion increases to 1.5–2.5 MPa or higher — the difference between a repair that lasts 10+ years and one that spalls off within 12 months.</p>
          <p>There are two mechanisms: (1) acrylic primers are applied thinly to the prepared concrete, allowed to reach a tacky state, and repair mortar is applied into the tacky primer surface — the acrylic improves the wetting and keying of the mortar to the substrate; (2) SBR slurry bond coats are a cement-SBR latex paste scrubbed firmly into the prepared concrete surface and the repair mortar is placed immediately into the wet slurry. In both cases, the timing is critical — if the primer or slurry dries before the mortar is placed, the bond coat becomes a weak plane rather than an adhesion bridge and must be removed and reapplied.</p>
        </div>
      )}
    </div>
  );
}

export function BondingAgentsSBRProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: "none" }}>
          {filtered.map((p) => (
            <div key={p.name} className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: p.accentColor }}>
              <div className="border-b border-slate-100 px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{p.fullLabel}</span>
                  <div className="flex gap-1">
                    {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                    <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700">Brand</a>
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{p.productType}</p>
                <CollapsibleCardDetails text={p.descriptionLine} chips={p.techChips} />
              </div>
              <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                <CollapsibleDescription text={p.systemDescription} />
              </div>
              <div className="space-y-3 px-5 py-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
              </div>
              <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                <CollapsibleSources sources={p.procurementSources} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? "Hide detail" : "Show detail"} <ChevronDown size={14} className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
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
        <h3 className="mb-4 text-lg font-extrabold text-sky-950">System Comparison</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left font-bold text-slate-700 whitespace-nowrap sticky left-0 bg-slate-50 border-r border-slate-200">Product</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Brand</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Type</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Method</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Timing note</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.method}</td>
                  <td className="px-4 py-3 text-slate-600">{row.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
