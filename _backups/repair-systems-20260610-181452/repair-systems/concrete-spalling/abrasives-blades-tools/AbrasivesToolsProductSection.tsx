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
  | "Diamond-blade"
  | "Cup-wheel"
  | "Demo-hammer"
  | "Needle-scaler"
  | "Electric"
  | "Pneumatic"
  | "Surface-prep"
  | "Rebar-cleaning"
  | "Dust-extraction";

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
    fullLabel: "Husqvarna / Hilti / Norton",
    brandUrl: "https://www.husqvarnaconstruction.com",
    accentColor: "#be123c",
    name: "Diamond Saw Blade — 115 mm / 230 mm Angle Grinder",
    descriptionLine: "Turbo-segment and continuous-rim diamond saw blades in 115 mm and 230 mm for saw cutting repair perimeters and slot cutting in concrete spalling repair",
    productType: "Continuous rim and turbo diamond saw blade — concrete and masonry cutting",
    filterTags: ["Diamond-blade", "Surface-prep"],
    techChips: [
      { label: "115 mm and 230 mm", cls: "bg-rose-100 text-rose-800" },
      { label: "Turbo for reinforced concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "Dry and wet cut options", cls: "bg-amber-50 text-amber-700" },
      { label: "22.23 mm bore", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Angle grinder diamond saw blades in 115 mm (4.5 inch) and 230 mm (9 inch) are the primary cutting tools for saw cutting repair perimeter outlines, cutting saw slots at spall boundaries, and cutting back existing concrete to square edges in concrete spalling repair. For spalling repair, a turbo-segment blade (serrated continuous rim) is preferred for cutting reinforced concrete — it provides faster cutting with a reasonable cut quality on aggregate-rich concrete. A continuous rim diamond blade provides a cleaner cut and is used where chip-free edges are required. Husqvarna, Hilti, and Norton manufacture blades rated for reinforced concrete at the 4.5 and 9 inch sizes. Confirm blade rating — blades for dry cutting and blades for wet cutting are different products — do not use a dry-cut blade wet or a wet-cut blade dry. Blade life varies significantly with aggregate hardness — hard quartzite or granite aggregate wears blades faster than softer limestone aggregate.",
    technicalProperties: [
      "115 mm (4.5\") and 230 mm (9\") — angle grinder mount — 22.23 mm bore",
      "Turbo segment — reinforced concrete and masonry — faster cut, moderate edge quality",
      "Continuous rim — cleaner edge — masonry block, sandstone, and chip-sensitive applications",
      "Husqvarna, Hilti, Norton — nationally available from tool and hire suppliers",
    ],
    limitations: [
      "Do not exceed the blade's maximum RPM — printed on the blade face — angle grinder speed must match",
      "Dry-cut blades must not be used wet and wet-cut blades must not be used dry — check blade rating before use",
      "Wear appropriate PPE — face shield, ear protection, and P2 dust mask when cutting concrete dry",
      "Do not grind with the flat face of a saw blade — saw blades are rated for cutting only, not side grinding",
    ],
    procurementSources: [
      { name: "Tool suppliers and hire companies nationally", url: "https://www.husqvarnaconstruction.com" },
      { name: "Bunnings Trade — nationally available", url: "https://www.bunnings.com.au/trade" },
      { name: "Hilti — direct and trade nationally", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "Husqvarna / Tyrolit / Metabo",
    brandUrl: "https://www.husqvarnaconstruction.com",
    accentColor: "#0369a1",
    name: "Concrete Grinding Wheel — 115/125 mm Diamond Cup Wheel",
    descriptionLine: "Single and double-row diamond cup wheels for angle grinders — concrete surface preparation to CSP 2–3 before repair mortar application",
    productType: "Diamond grinding cup wheel — surface preparation and concrete grinding",
    filterTags: ["Cup-wheel", "Surface-prep", "Dust-extraction", "Electric"],
    techChips: [
      { label: "115 mm / 125 mm", cls: "bg-sky-100 text-sky-800" },
      { label: "Achieves CSP 2–3", cls: "bg-slate-100 text-slate-700" },
      { label: "Double-row faster", cls: "bg-green-50 text-green-700" },
      { label: "Use with HEPA extraction", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Diamond cup grinding wheels in 115 mm and 125 mm sizes are used on angle grinders for concrete surface preparation before repair mortar application in spalling repair. The purpose of concrete grinding is to remove laitance, carbonated surface layer, coatings, and contamination from the repair substrate to achieve a clean, sound concrete surface that the repair mortar can bond to. A single-row or double-row diamond cup wheel is fitted to a 115 mm or 125 mm angle grinder and run over the prepared repair area before applying bonding agent and repair mortar. Double-row cup wheels (two offset rows of diamond segments) are faster and produce a more consistent surface profile than single-row. The grinding process produces fine concrete dust — a P2 dust mask and eye protection are essential. In enclosed spaces (carparks), connect the grinder to a HEPA vacuum for dust extraction. After grinding, blow off dust and vacuum before applying bonding agent.",
    technicalProperties: [
      "115 mm / 125 mm diamond cup wheel — single or double row segments",
      "Removes laitance, surface contamination, coatings — achieves concrete surface profile (CSP 2–3)",
      "Double-row cup wheel — faster cutting — more consistent profile",
      "Use with dust extraction — P2 mask and face shield required",
    ],
    limitations: [
      "Cup wheel grinding on vertical and overhead faces requires a right-angle grinder and careful technique — spinning cup wheel on a vertical surface can grab and kick",
      "Grinding produces fine silica-containing dust — P2 or P3 dust mask required — HEPA extraction in enclosed spaces",
      "Cup wheel does not remove deeply carbonated concrete below the surface — use chipping/scabbling for deeper preparation",
      "Confirm the surface cleanliness standard required by the repair mortar TDS — grinding alone may not achieve the required surface if heavy contamination is present",
    ],
    procurementSources: [
      { name: "Tool suppliers nationally", url: "https://www.husqvarnaconstruction.com" },
      { name: "Bunnings Trade — nationally available", url: "https://www.bunnings.com.au/trade" },
      { name: "Hire companies — nationally available", url: "https://www.coates.com.au" },
    ],
  },
  {
    fullLabel: "Bosch / Makita / Milwaukee",
    brandUrl: "https://www.bosch.com.au",
    accentColor: "#16a34a",
    name: "Electric Chipping Hammer / SDS+ Demolition Hammer",
    descriptionLine: "SDS+ and SDS-MAX electric demolition hammers for concrete breakout, spall removal, and exposing reinforcement in spalling repair",
    productType: "Corded electric SDS+ or SDS-MAX demolition hammer — concrete chipping and breakout",
    filterTags: ["Demo-hammer", "Surface-prep", "Electric"],
    techChips: [
      { label: "SDS+ (0–10 J) patch repair", cls: "bg-green-100 text-green-900" },
      { label: "SDS-MAX larger breakout", cls: "bg-slate-100 text-slate-700" },
      { label: "Chisel and pointed bits", cls: "bg-amber-50 text-amber-700" },
      { label: "Hire or purchase", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Electric SDS+ and SDS-MAX demolition hammers (chipping hammers) are the primary tools for chipping out delaminated, carbonated, or chloride-contaminated concrete in spalling repair. They are used to remove concrete beyond the saw cuts at the repair perimeter, expose reinforcement for cleaning, and undercut the repair edges to provide a positive bond key. SDS+ hammers (Bosch GSH 5-E class, Makita HM1202C class) in the 5–8 kg range are suitable for removing concrete in spalled patches up to 100–150 mm deep. SDS-MAX hammers in the 10–15 kg range are used for larger breakout areas and thick concrete sections. Use a chisel bit for general concrete breakout and a pointed bit for removing concrete immediately adjacent to reinforcement. Note: pneumatic (air) chipping hammers are also used on larger sites where a compressor is available — pneumatic hammers are lighter and less fatiguing for extended use than corded electric tools.",
    technicalProperties: [
      "SDS+ (0–10 J) — general spalling patch repair breakout — 5–8 kg weight range",
      "SDS-MAX (up to 25+ J) — larger breakout areas and thick concrete sections",
      "Chisel bit for flat surface breakout — pointed bit for concrete adjacent to rebar",
      "Available from all major tool hire companies and trade tool suppliers nationally",
    ],
    limitations: [
      "Do not use a heavy demolition hammer close to post-tensioned tendons — know the location of tendons before chipping, or use a hand chisel for concrete adjacent to tendons",
      "Vibration — limit continuous use per session — use vibration-reducing gloves — HAVS risk in extended use",
      "Electric extension leads must be RCD-protected for outdoor and wet location use",
      "Do not over-break — remove only the concrete specified in the repair scope — excess breakout increases repair volume and cost",
    ],
    procurementSources: [
      { name: "Tool hire companies nationally", url: "https://www.coates.com.au" },
      { name: "Trade tool suppliers — Bosch, Makita, Milwaukee", url: "https://www.bosch.com.au" },
      { name: "Bunnings Trade — nationally available", url: "https://www.bunnings.com.au/trade" },
    ],
  },
  {
    fullLabel: "Makita / Bosch / Flex",
    brandUrl: "https://www.makita.com.au",
    accentColor: "#7c3aed",
    name: "Needle Gun / Scaler — Electric or Pneumatic",
    descriptionLine: "Multi-needle scalers for cleaning corroded reinforcement to minimum St 2 (ISO 8501-1) before rebar primer application in spalling repair",
    productType: "Multi-needle scaler — rebar cleaning and rust removal",
    filterTags: ["Needle-scaler", "Rebar-cleaning", "Electric", "Pneumatic"],
    techChips: [
      { label: "Achieves St 2 (ISO 8501-1)", cls: "bg-purple-100 text-purple-900" },
      { label: "Electric and pneumatic", cls: "bg-slate-100 text-slate-700" },
      { label: "Prime rebar immediately", cls: "bg-amber-50 text-amber-700" },
      { label: "Makita 9045B electric", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Electric and pneumatic needle scalers (needle guns) are used in concrete spalling repair to clean corroded reinforcement to minimum St 2 (hand/power tool cleaning per ISO 8501-1) before applying rebar primer. A needle scaler operates by rapidly reciprocating a bundle of hardened steel needles against the rebar surface, removing rust scale, mill scale, and surface contaminants through impact action. Electric needle scalers (110–230V) are used on sites without compressed air supply. Pneumatic needle guns are used on larger sites with a compressor — they are lighter and more compact than electric models and are easier to manoeuvre in tight spaces around reinforcement. After needle scaling, wipe the rebar with a dry cloth and prime immediately — freshly cleaned steel begins to oxidise within a few hours in humid conditions. Makita 9045B electric needle scaler and the Bosch GSE 6-12 are commonly used in Australian remedial work.",
    technicalProperties: [
      "Multi-needle scaler — removes rust scale and contamination from rebar by impact",
      "Achieves St 2 cleanliness standard (ISO 8501-1) on corroded reinforcement",
      "Electric (110–230V) and pneumatic versions — both suitable for rebar cleaning",
      "Apply rebar primer immediately after cleaning — freshly cleaned steel re-oxidises quickly",
    ],
    limitations: [
      "Needle scaler achieves St 2 (hand/power tool clean) — does not achieve Sa 2 (abrasive blast) — for highest-durability repairs or 2-part epoxy zinc-rich primer, abrasive blasting may be specified — confirm required cleanliness standard from repair specification",
      "Needles wear with use — replace needle bundle when cleaning rate drops noticeably",
      "Vibration — use vibration-reducing gloves — HAVS risk in extended use",
      "Do not use on prestressing tendons or post-tensioning wires — needle impact can damage high-strength steel",
    ],
    procurementSources: [
      { name: "Tool hire companies nationally", url: "https://www.coates.com.au" },
      { name: "Makita Australia — trade tool suppliers", url: "https://www.makita.com.au" },
      { name: "Bosch Australia — trade and hardware suppliers", url: "https://www.bosch.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Diamond-blade", label: "Diamond blade" },
  { id: "Cup-wheel", label: "Cup wheel" },
  { id: "Demo-hammer", label: "Demo hammer" },
  { id: "Needle-scaler", label: "Needle scaler" },
  { id: "Electric", label: "Electric" },
  { id: "Pneumatic", label: "Pneumatic" },
  { id: "Surface-prep", label: "Surface prep" },
  { id: "Rebar-cleaning", label: "Rebar cleaning" },
  { id: "Dust-extraction", label: "Dust extraction" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Diamond Saw Blade 115/230 mm",
    use: "Saw cutting repair perimeter",
    type: "Diamond segment blade",
    standard: "RPM rated — dry/wet rated",
    notes: "Turbo for reinforced concrete — confirm dry/wet rating",
  },
  {
    product: "Diamond Cup Wheel 115/125 mm",
    use: "Substrate surface preparation",
    type: "Cup grinding wheel",
    standard: "Achieves CSP 2–3",
    notes: "Double-row faster — use dust extraction",
  },
  {
    product: "SDS+ / SDS-MAX Demo Hammer",
    use: "Concrete breakout and removal",
    type: "Electric chipping hammer",
    standard: "0–10 J (SDS+) / 25+ J (MAX)",
    notes: "Chisel bit general — pointed bit near rebar",
  },
  {
    product: "Needle Scaler / Needle Gun",
    use: "Rebar cleaning to St 2",
    type: "Electric / pneumatic scaler",
    standard: "ISO 8501-1 St 2",
    notes: "Prime rebar immediately after cleaning",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Saw cutting repair perimeter outlines to minimum 15 mm depth before concrete chipping — prevents feather edges at repair boundary",
    "Grinding concrete substrate to CSP 2–3 to remove laitance, coatings, and contamination before bonding agent and repair mortar application",
    "Chipping out delaminated, carbonated, or chloride-contaminated concrete using SDS+ or SDS-MAX demolition hammers",
    "Cleaning corroded reinforcement to St 2 (ISO 8501-1) with needle scaler or wire cup grinder before rebar primer application",
    "Surface preparation of carpark columns, balcony soffits, beam soffits, and slab edges in concrete spalling repair",
    "Post-repair surface dressing of fresh mortar with grinding wheel to achieve a smooth transition to adjacent concrete",
  ],
  selectionCriteria: [
    "Saw blade size: use 115 mm grinder for shallow saw cuts and slot work; 230 mm for deeper cuts at repair perimeters",
    "Cup wheel vs. scabbling: cup wheel achieves CSP 2–3 suitable for most repair mortars — for deeper contamination or larger areas, a scabbler or shot blaster may be required",
    "Chipping hammer size: SDS+ (5–8 kg) for patch repairs up to 150 mm depth; SDS-MAX (10–15 kg) for larger breakout areas and thick sections",
    "Needle scaler vs. angle grinder wire cup: both achieve St 2 — needle scaler is preferred for all-around rebar access; wire cup grinder is faster on accessible bar faces",
    "Electric vs. pneumatic: electric tools are standard for most site conditions; pneumatic tools are used on larger sites with a compressor — pneumatic needle guns are lighter and faster for extended rebar cleaning",
    "Dust management: in enclosed carparks and basements, connect all grinding and cutting tools to HEPA vacuum — dust extraction is mandatory for silica compliance",
  ],
  limitations: [
    "Post-tensioned structures: do NOT use demolition hammers near PT tendons without knowing their location — impact damage to high-strength wires and strands is irreparable",
    "Cup wheel grinding alone does not address deep carbonation or chloride penetration — concrete must be physically removed to beyond the contamination front",
    "Needle scaler achieves St 2 only — if the repair specification requires Sa 2 (abrasive blast cleanliness), needle scaling is not sufficient",
    "All concrete cutting, grinding, and chipping generates respirable crystalline silica (RCS) dust — P2 or P3 respirator required — comply with Occupational Exposure Standard for RCS (0.1 mg/m3 TWA)",
    "Do not use saw blade for grinding or side-loading — saw blades are rated for cutting only",
    "Vibrating tools (hammer drills, needle guns) carry HAVS (Hand-Arm Vibration Syndrome) risk — comply with WHS vibration management requirements for extended use",
  ],
  standardsNotes: [
    "ISO 8501-1 — Preparation of Steel Substrates Before Application of Paints — St 2 (hand/power tool cleaning) is the minimum for rebar priming; Sa 2 (abrasive blast) may be specified for high-durability or coastal repairs",
    "ICRI Technical Guideline 310.2 — Selecting and Specifying Concrete Surface Preparation — CSP 2–3 is the target for polymer-modified repair mortars",
    "WHS Regulations — control measures for silica dust required — HEPA extraction in enclosed spaces — P2/P3 respirator mandatory for concrete cutting and grinding",
    "SafeWork Australia — Hand-Arm Vibration exposure standard — trigger time limits for vibrating tools in extended use",
    "Manufacturers' blade and wheel ratings — maximum RPM must not be exceeded — dry/wet blade ratings must be matched to cutting method",
  ],
  suitableDefects: [
    "Concrete spalling — primary application — saw cutting, chipping, and surface preparation for full patch repair cycle",
    "Exposed corroded reinforcement — needle scaling and wire cup grinding to clean rebar to St 2 before primer",
    "Delaminated concrete covers — chipping out hollow-sounding patches identified by hammer tap survey",
    "Contaminated repair substrates — grinding to remove laitance, old coatings, or contamination before repair mortar",
    "Saw slots for sealant application at cracks — 115 mm blade for slot cutting before crack sealing or injection port installation",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — standard substrate for all surface preparation tools — confirm preparation standard from repair mortar TDS",
    "Precast concrete — same as in-situ — confirm minimum CSP required for high-density precast before specifying cup wheel grinding alone",
    "Masonry — diamond saw blade for cutting; SDS+ hammer for chipping — lighter impacts required to avoid undermining adjacent sound masonry",
    "Exposed corroded reinforcement — needle scaler or wire cup for rebar cleaning — do not use needle scaler on prestressed or post-tensioned tendons",
  ],
};

export function AbrasivesToolsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Abrasives, blades and tools in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Surface preparation is one of the most critical steps in concrete spalling repair — the long-term success of the repair depends on the quality of the prepared substrate. The standard preparation sequence for patch repair is: (1) saw cut the repair perimeter to a minimum 15 mm depth to prevent feather-edging and spalling at the repair boundary; (2) break out all unsound, delaminated, carbonated, and chloride-contaminated concrete using a demolition hammer working from the centre of the repair outward; (3) clean exposed reinforcement to minimum St 2 (ISO 8501-1) using a needle scaler or wire cup grinder; (4) blow off all dust and loose material; (5) grind or scabble the substrate surface to CSP 2–3 to ensure adequate mortar bond.
        </p>
        {expanded && (
          <>
            <p>
              The surface must be saturated surface-dry (SSD) — damp but not wet — before applying bonding agent and repair mortar. All surface preparation produces fine silica-containing respirable dust — appropriate respiratory protection (P2 or P3 respirator) and dust extraction are mandatory. In enclosed spaces such as carparks and basements, connect all grinding and cutting tools to a HEPA vacuum for silica dust compliance. Post-tensioned structures require special attention — know the location of tendons and high-strength wires before using any demolition hammer.
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

export function AbrasivesToolsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 product types — cutting, grinding, chipping, and rebar cleaning tools — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of surface preparation tools for concrete spalling repair. Confirm all product selections from current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Use</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Standard / Rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.use}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.standard}</td>
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
