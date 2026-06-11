"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag =
  | "AS-5216"
  | "Epoxy"
  | "Epoxy-Acrylate"
  | "Dry-Hole"
  | "Damp-Hole"
  | "Wet-Hole"
  | "Crack-Stitching"
  | "Rebar-Dowelling";

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
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#be123c",
    name: "Hilti HIT-RE 500 V3 — Epoxy Adhesive for Structural Stitching and Dowels",
    descriptionLine: "TODO: owner confirm — Hilti AU site shows HIT-RE 500 V4 as current; V3 not listed — 2-part injectable epoxy — AS 5216 compliant — crack stitching bars N12/N16 — 500 mL cartridge — 3-stage cleaning mandatory",
    productType: "2-part injectable epoxy anchoring adhesive — AS 5216 — Hilti Australia — TODO: owner confirm V3 vs V4",
    filterTags: ["AS-5216", "Epoxy", "Dry-Hole", "Crack-Stitching", "Rebar-Dowelling"],
    techChips: [
      { label: "AS 5216 compliant", cls: "bg-red-100 text-red-800" },
      { label: "500 mL cartridge", cls: "bg-slate-100 text-slate-700" },
      { label: "3-stage cleaning mandatory", cls: "bg-amber-50 text-amber-700" },
      { label: "Engineer design required", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Hilti HIT-RE 500 V3 is the industry-standard chemical anchor adhesive for structural crack stitching in Australian remedial building practice. Crack stitching installs steel bars or threaded rods drilled perpendicular to the crack plane at regular intervals (typically 300–600 mm, at 45 degrees to the crack) to provide mechanical resistance to crack widening. Each bar is installed into a drilled hole (typically 16–20 mm diameter for N12 or N16 bar), cleaned by the mandatory 3-stage protocol (blow-brush-blow), then injected with HIT-RE 500 V3 by Hilti injection gun before the bar is pushed to full embedment. AS 5216 compliant. Stitching alone does not restore in-plane stiffness — it resists crack widening mechanically; for stiffness reinstatement, combine with epoxy crack injection. Structural engineer design is required for every crack stitching installation — bar spacing, angle, diameter, and embedment depth must be designed, not estimated. Temperature-dependent cure time — confirm minimum load-bearing cure time from Hilti TDS before loading stitched bars. Available nationally through Hilti Australia direct supply.",
    technicalProperties: [
      "AS 5216 compliant — structural stitching bars and rebar dowels in cracked and uncracked concrete",
      "500 mL cartridge — Hilti injection gun — static mixing nozzle required",
      "3-stage hole cleaning protocol (blow-brush-blow) is mandatory — uncleaned holes have no reliable anchor capacity",
      "N12/N16 rebar typical for crack stitching — 16–20 mm drill hole depending on bar size",
      "Hilti Australia — direct supply nationally through Hilti stores and online",
    ],
    limitations: [
      "3-stage hole cleaning (blow-brush-blow) is mandatory for every hole — skipping this step is the most common cause of anchoring adhesive failure in the field",
      "Bar spacing, embedment depth, angle, and diameter must be designed by structural engineer per AS 5216 — never estimate or use rule-of-thumb spacing",
      "Do not load bars before full cure — cure time is temperature-dependent — confirm minimum cure time from Hilti TDS for the installation temperature on the day",
      "In post-tensioned structures: confirm all PT tendon positions by GPR scan before drilling stitch holes — drilling at 45 degrees to cracks will intersect PT tendons at cover depth if not confirmed",
    ],
    procurementSources: [
      { name: "Hilti Australia — direct supply nationally", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika AnchorFix-3+ — Epoxy Acrylate for Structural Stitch Bars and Dowels",
    descriptionLine: "TODO: owner confirm — AnchorFix-3+ not found on current Sika AU chemical anchoring page (current lineup is AnchorFix-1, AnchorFix-3001, AnchorFix-3030); chemistry described as 'epoxy acrylate' is also unconfirmed for current product — 2-part epoxy acrylate — crack stitching and rebar dowelling — dry and damp holes — 330 mL cartridge — 0°C to 40°C installation range",
    productType: "2-part epoxy acrylate injectable adhesive — structural crack stitching — TODO: owner confirm product name and chemistry current on Sika AU",
    filterTags: ["Epoxy-Acrylate", "Dry-Hole", "Damp-Hole", "Crack-Stitching", "Rebar-Dowelling"],
    techChips: [
      { label: "Epoxy acrylate chemistry", cls: "bg-sky-100 text-sky-800" },
      { label: "330 mL cartridge", cls: "bg-slate-100 text-slate-700" },
      { label: "Dry and damp holes", cls: "bg-green-50 text-green-700" },
      { label: "0°C to 40°C range", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika AnchorFix-3+ is used for the same crack stitching and structural dowelling applications as Hilti HIT-RE 500 V3 — installing steel bars or threaded rods perpendicular to crack planes to mechanically resist crack widening. AnchorFix-3+ is supplied in 330 mL cartridges for standard dispenser guns, making it suitable for smaller-volume crack stitching scopes where a 500 mL Hilti cartridge is more than required. Suitable for dry and damp (not water-filled) holes. Wide installation temperature range of 0°C to 40°C makes it practical in both cold winter conditions and hot summer applications. Crack stitching bar layout — spacing, angle, embedment depth, and bar size — must be confirmed by a structural engineer regardless of adhesive selection. Available nationally through Sika Australia trade supply. Confirm current product name, anchor capacity tables, and hole cleaning protocol from the current Sika Australia TDS before specifying.",
    technicalProperties: [
      "Epoxy acrylate — 330 mL cartridge — standard dispenser gun with static mixing nozzle",
      "Suitable for dry and damp holes — wider substrate moisture tolerance than pure epoxy",
      "0°C to 40°C installation temperature range",
      "Structural crack stitching and rebar dowelling applications",
      "Sika Australia — national trade supply",
    ],
    limitations: [
      "Do not use in water-filled holes — not rated for fully wet installation without specific product variant",
      "Structural engineer design required for every crack stitching installation — bar spacing, embedment depth, angle — per AS 5216",
      "Hole cleaning (blow-brush-blow) is still required — do not skip even though product tolerates damp holes",
      "Do not load bars before minimum cure time — confirm cure schedule from Sika TDS for the installation temperature",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Ramset Australia",
    brandUrl: "https://www.ramset.com.au",
    accentColor: "#78716c",
    name: "Ramset Chemset Epoxy 500+ — Crack Stitching and Structural Dowelling",
    descriptionLine: "TODO: owner confirm — Chemset Epoxy 500+ URL returns 404 on current Ramset AU site; current product appears to be ChemSet Reo 502 XTREM (600 mL cartridge — not 380/585 mL as stated; rated for dry/wet/flooded holes; AS 5216; seismic C1 and C2) — confirm product name, cartridge size, and wet-hole capability before specifying",
    productType: "2-part epoxy anchoring adhesive — AS 5216 — TODO: owner confirm current Ramset product name — Ramset Australia",
    filterTags: ["AS-5216", "Epoxy", "Dry-Hole", "Damp-Hole", "Crack-Stitching", "Rebar-Dowelling"],
    techChips: [
      { label: "AS 5216 compliant", cls: "bg-stone-100 text-stone-700" },
      { label: "380/585 mL cartridges", cls: "bg-slate-100 text-slate-700" },
      { label: "Broad hardware availability", cls: "bg-green-50 text-green-700" },
      { label: "Dry and damp concrete", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ramset Chemset Epoxy 500+ is an AS 5216 compliant 2-component epoxy anchoring adhesive widely used for crack stitching bars in residential and commercial concrete crack repair in Australia. Available in 380 mL (standard) and 585 mL cartridges, compatible with Ramset standard dispenser guns (RSG380, RSG500). Suitable for dry and damp (not water-filled) concrete. Its broad availability at trade hardware stores nationally makes it practical for on-site use where Hilti direct supply is not established — it can be procured from most Bunnings Trade and independent trade hardware stores without specialist order. The same structural engineer design requirement for crack stitching bar layout applies regardless of which adhesive is selected. An initial waste shot (5–10 cm of material) must be dispensed before injecting into the first hole to purge unmixed material from the nozzle end. Confirm hole diameter, cleaning protocol, and cure time from the current Ramset TDS before specifying.",
    technicalProperties: [
      "AS 5216 compliant — 2-part epoxy — 380/585 mL cartridges — Ramset dispenser guns",
      "Broad availability at trade hardware nationally including Bunnings Trade",
      "Dry and damp concrete — not water-filled holes",
      "Crack stitching bars and rebar dowelling applications",
    ],
    limitations: [
      "Broad hardware availability does not replace structural engineer design — anchor capacity is load and geometry dependent — AS 5216 design required",
      "Confirm hole diameter, depth, and cleaning protocol from Ramset TDS for each bar size — do not extrapolate between bar sizes",
      "Do not mix partial cartridges — mixing ratio must be consistent — always dispense initial waste shot before injecting hole",
      "Load bar before gel time — confirm gel time from TDS for ambient temperature — gel time shortens significantly above 25°C",
    ],
    procurementSources: [
      { name: "Ramset Australia — trade hardware and distributor nationally", url: "https://www.ramset.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#dc2626",
    name: "Mapei Mapefox EW — Epoxy Adhesive for Crack Stitching in Wet Conditions",
    descriptionLine: "TODO: owner confirm — Mapei AU site blocked (Cloudflare); could not verify product name, EW wet-hole rating, or availability from live source — 2-part epoxy — EW variant rated for damp and wet holes — crack stitching in basements and retaining walls — dispenser gun with static mixing nozzle",
    productType: "2-part epoxy anchoring adhesive — damp / wet hole variant — TODO: owner confirm from current Mapei AU TDS — Mapei Australia",
    filterTags: ["Epoxy", "Damp-Hole", "Wet-Hole", "Crack-Stitching", "Rebar-Dowelling"],
    techChips: [
      { label: "EW — wet-hole rated", cls: "bg-red-100 text-red-800" },
      { label: "Damp and wet holes", cls: "bg-slate-100 text-slate-700" },
      { label: "Basements and retaining walls", cls: "bg-green-50 text-green-700" },
      { label: "Standard dispenser gun", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapefox EW is a 2-part injectable epoxy anchoring adhesive for crack stitching and structural dowelling where the concrete cannot be fully dried before bar installation — the EW designation indicates it is rated for damp and water-present holes. This is a specific advantage for crack stitching in wet basements, retaining walls, and below-grade structures where even mechanical drying cannot eliminate all moisture from the drilled holes. Injected through a standard dispenser gun with static mixing nozzle. Mapei Mapefox EW is available nationally through Mapei Australia trade supply. The structural engineer must still design the crack stitching bar layout — Mapefox EW changes the installation substrate condition (wet vs dry), but the structural requirements for bar spacing, embedment depth, angle, and size are unchanged. Confirm that the static mixing nozzle length reaches the bottom of each hole — short nozzles do not reach deep holes and the hole will be incompletely filled. Insert the bar slowly and rotate slightly to avoid air entrapment.",
    technicalProperties: [
      "2-part epoxy — EW variant — rated for damp and wet hole conditions",
      "Crack stitching and dowelling in wet basements, retaining walls, below-grade structures",
      "Standard dispenser gun with static mixing nozzle — confirm nozzle length matches hole depth",
      "Mapei Australia — national trade supply",
    ],
    limitations: [
      "Even wet-hole rated adhesives have reduced capacity in water-saturated or actively flowing holes — confirm specific conditions with Mapei technical before specifying",
      "Structural engineer design still required for all crack stitching — wet-hole rating changes installation conditions, not structural design requirements",
      "Mixing nozzle must reach the bottom of the hole — a short nozzle produces an incompletely filled hole",
      "Insert bar slowly and rotate slightly — rapid insertion traps air at the bar tip and produces a void in the adhesive",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "AS-5216", label: "AS 5216" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "Epoxy-Acrylate", label: "Epoxy acrylate" },
  { id: "Dry-Hole", label: "Dry hole" },
  { id: "Damp-Hole", label: "Damp hole" },
  { id: "Wet-Hole", label: "Wet hole" },
  { id: "Crack-Stitching", label: "Crack stitching" },
  { id: "Rebar-Dowelling", label: "Rebar dowelling" },
];

const SYSTEM_COMPARISON = [
  { product: "Hilti HIT-RE 500 V3", standard: "AS 5216 — TODO: owner confirm V3 vs V4 current", holeCondition: "Dry", cartridge: "500 mL", availability: "Hilti direct / trade" },
  { product: "Sika AnchorFix-3+", standard: "TODO: owner confirm — product not found on current Sika AU", holeCondition: "Dry / damp", cartridge: "TODO: owner confirm — 330 mL unverified; current AnchorFix-3001 is 250 mL", availability: "Sika trade supply — confirm current product" },
  { product: "Ramset Chemset Epoxy 500+", standard: "TODO: owner confirm — product not found on current Ramset AU", holeCondition: "Dry / damp", cartridge: "TODO: owner confirm — 380/585 mL stated; current Reo 502 XTREM is 600 mL", availability: "Trade hardware — confirm current product name" },
  { product: "Mapei Mapefox EW", standard: "TODO: owner confirm — Mapei AU unverifiable (Cloudflare)", holeCondition: "Damp / wet", cartridge: "Standard dispenser", availability: "TODO: owner confirm — Mapei trade supply unverifiable" },
];

const TECH_INFO = {
  typicalApplications: [
    "Crack stitching — installing N12 or N16 steel bars at 45 degrees across crack planes in walls, beams, and slabs to mechanically resist crack widening",
    "Structural dowelling — connecting cracked elements to new sections or supplementary frames with chemically anchored bars",
    "Bar installation in wet or below-grade structures where hole drying is not possible — Mapefox EW for wet hole conditions",
    "Combining crack stitching with epoxy crack injection — stitching resists crack widening while injection restores in-plane stiffness",
  ],
  selectionCriteria: [
    "Dry holes and AS 5216 compliance required → Hilti HIT-RE 500 (TODO: owner confirm current version — V4 now on Hilti AU) or Ramset (TODO: owner confirm current product name — Chemset Epoxy 500+ may be superseded by Reo 502 XTREM)",
    "Damp holes, smaller cartridge quantity → Sika AnchorFix (TODO: owner confirm current product name — AnchorFix-3+ not found on current Sika AU; AnchorFix-3001 is 250 mL) or Ramset (TODO: owner confirm current product)",
    "Wet below-grade holes that cannot be dried → Mapei Mapefox EW",
    "Broad trade hardware availability needed → Ramset Chemset Epoxy 500+",
    "Structural engineer must design bar layout for every crack stitching scope — product selection does not substitute for design",
    "PT slab or beam: GPR scan required before drilling — drill paths at 45 degrees intercept PT tendons at cover depth if not confirmed",
  ],
  limitations: [
    "Crack stitching alone does not restore in-plane stiffness across the crack — for stiffness reinstatement, combine with epoxy crack injection",
    "3-stage hole cleaning (blow-brush-blow) is mandatory for all products — this is the single most commonly skipped step and the most common cause of failure",
    "Do not load stitched bars before full adhesive cure — cure time is temperature-dependent and shortens significantly above 25°C",
    "Crack stitching in PT structures requires GPR tendon survey and structural engineer clearance before drilling",
  ],
  standardsNotes: [
    "AS 5216 — Design of Fastenings in Concrete — structural engineer must design crack stitching to this standard",
    "AS 3600 — Concrete Structures — crack stitching is a supplementary structural intervention — confirm its effect on element capacity with the structural engineer",
    "Post-tensioned structures: confirm all PT tendon positions before drilling — see structural drawings and AS 3600 clauses on PT maintenance",
    "HILTI PROFIS Anchor — free design software for anchoring adhesive design to AS 5216 — other brands have equivalent tools",
  ],
  suitableDefects: [
    "Wide structural cracks in concrete walls, columns, and beams where epoxy injection alone cannot restore adequate stiffness",
    "Re-entrant corner cracks in slabs and walls — corner cracks typically require stitching in two directions",
    "Crack stitching in wet below-grade elements — use wet-hole rated adhesive",
    "Supplementary mechanical resistance across dormant structural cracks while waiting for epoxy injection to cure",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — drilled holes must be cleaned by blow-brush-blow before adhesive injection",
    "Precast concrete panels — confirm bar embedment depth and hole diameter with manufacturer",
    "Basement walls and retaining walls — wet and damp conditions common — select EW variant where holes cannot be dried",
    "Post-tensioned slabs and beams — GPR tendon survey and structural engineer clearance before any drilling",
  ],
};

export function EpoxyAnchoringAdhesivesCCIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Crack stitching — when and how it works</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Structural crack stitching installs steel bars at 45 degrees across the crack plane, anchored with chemical adhesive on each side. Under tension, the bars resist crack widening mechanically. Stitching is used where cracks are too wide or too numerous for epoxy injection alone, or where ongoing movement makes rigid epoxy injection inappropriate.
        </p>
        {expanded && (
          <>
            <p>
              Typical crack stitching applications: wide flexural cracks in walls and beams, through-depth cracks in columns, re-entrant corner cracks in slabs. Bar spacing, embedment depth, angle, and bar size must be designed by a structural engineer per AS 5216 — there are no reliable rule-of-thumb values for stitching layout. Stitching alone does not restore in-plane stiffness — combine with epoxy injection or accept the crack as a flexural hinge.
            </p>
            <p>
              3-stage hole cleaning (blow-brush-blow) is the most consistently skipped step in chemical anchor installation and the most consistent cause of anchor failure in the field. Every adhesive TDS mandates it. In post-tensioned structures, bar installation requires GPR tendon survey first — stitch bars drilled at 45 degrees to cracks will intersect PT tendons at cover depth in most common PT slab layouts if tendon positions are not confirmed.
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

export function EpoxyAnchoringAdhesivesCCProductSection() {
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
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
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
            <p className="mt-1 text-sm text-slate-500">4 products — epoxy anchoring adhesives for crack stitching — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of epoxy anchoring adhesives for crack stitching. Confirm all product selections from current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Hole condition</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cartridge size</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Availability</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.standard}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.holeCondition}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cartridge}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
