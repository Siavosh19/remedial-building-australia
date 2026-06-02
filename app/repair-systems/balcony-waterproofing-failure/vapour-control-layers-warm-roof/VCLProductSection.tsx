"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "VCL"
  | "Vapour-control"
  | "Polyethylene"
  | "Foil-faced"
  | "Warm-roof"
  | "Flat-roof"
  | "Balcony"
  | "Podium"
  | "Below-insulation"
  | "Taped-laps";

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
    fullLabel: "Kingspan Insulation",
    brandUrl: "https://www.kingspan.com/au",
    tdsUrl: "https://www.kingspan.com/au",
    accentColor: "#f97316",
    name: "Kingspan Nilvent",
    descriptionLine: "Highly vapour-open breather membrane for use in warm-roof and wall assemblies — not a vapour control layer",
    productType: "Vapour-open breather membrane",
    filterTags: ["VCL", "Warm-roof", "Flat-roof", "Balcony", "Podium"],
    techChips: [
      { label: "Vapour-open membrane", cls: "bg-sky-100 text-sky-800" },
      { label: "Breather membrane", cls: "bg-slate-100 text-slate-700" },
      { label: "Warm-roof / wall", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Kingspan Nilvent is a highly vapour-open breather membrane used in roof and wall assemblies where vapour must be allowed to escape from the assembly rather than be trapped. In warm-roof balcony and podium assemblies, Nilvent is used on the outside of the insulation (above the insulation in an inverted assembly, or as a breather layer in a warm deck assembly) to allow vapour diffusion outwards while maintaining wind resistance.\n\nIMPORTANT NOTE: Nilvent is a vapour-OPEN membrane, not a vapour CONTROL layer (VCL). In a warm-roof balcony assembly, a true VCL (high resistance to vapour) is installed BELOW the insulation to prevent warm moist internal air from reaching the cold insulation layer where it would condense. Nilvent does the opposite — it allows vapour to escape outwards.\n\n// TODO: Confirm correct position and function of Nilvent vs true VCL in the specific warm-roof balcony or podium assembly design. Consult Kingspan technical for the correct product for the intended function — if a VCL is required below insulation, Kingspan supplies separate VCL products.",
    technicalProperties: [
      "Highly vapour-open — allows vapour diffusion through the membrane — Sd value < 0.1 m (highly permeable)",
      "Wind-resistant — used as a breather and wind barrier layer in roof and wall assemblies",
      "Resistant to water penetration from outside — water-shedding but vapour-open",
      "// TODO: confirm current vapour resistance (Sd value) and water penetration resistance from current Kingspan TDS",
    ],
    limitations: [
      "NOT a vapour control layer — do not install below insulation in a warm-roof assembly as a VCL — this is the wrong product for that function",
      "Laps must be taped with compatible tape — confirm tape specification with Kingspan",
      "Confirm exact position and function in the specific warm-roof assembly with Kingspan technical before specifying",
      "Confirm current product specification with Kingspan Australia before specifying",
    ],
    procurementSources: [
      { name: "Kingspan Insulation Australia — trade supply — contact for current pricing", url: "https://www.kingspan.com/au" },
      { name: "Roofing and insulation trade suppliers nationally", url: "https://www.kingspan.com/au" },
    ],
  },
  {
    fullLabel: "Pro Clima / Rothoblaas",
    brandUrl: "https://www.proclima.com",
    tdsUrl: "https://www.proclima.com",
    accentColor: "#22c55e",
    name: "Pro Clima DB+",
    descriptionLine: "High-performance polyethylene vapour control layer — warm-roof balcony and flat-roof assemblies — taped lap system",
    productType: "Polyethylene vapour control layer",
    filterTags: ["VCL", "Vapour-control", "Polyethylene", "Warm-roof", "Flat-roof", "Balcony", "Podium", "Below-insulation", "Taped-laps"],
    techChips: [
      { label: "PE vapour control layer", cls: "bg-sky-100 text-sky-800" },
      { label: "Below-insulation", cls: "bg-slate-100 text-slate-700" },
      { label: "Taped laps", cls: "bg-green-50 text-green-700" },
      { label: "Warm-roof", cls: "bg-amber-50 text-amber-700" },
      { label: "AS/NZS 4200", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Pro Clima DB+ is a high-performance polyethylene vapour control layer membrane from Pro Clima (German brand with Australian presence through Rothoblaas / Pro Clima distribution network). In warm-roof balcony and flat-roof assemblies, DB+ is installed below the insulation layer to prevent warm, moist internal air from migrating into the insulation assembly where it would condense against the cold waterproofing membrane layer above.\n\nAll laps are taped with Pro Clima-compatible adhesive tape (TESCON VANA or equivalent) to ensure full continuity of the vapour barrier. The VCL must be installed on the warm side of the insulation — below the insulation in a warm-roof assembly. Penetrations, upstands and junctions must be sealed with Pro Clima system accessories.\n\n// TODO: Confirm current Pro Clima DB+ availability and distribution network in Australia — Pro Clima is a German brand; availability in Australia is through Rothoblaas and specialist building products distributors. Confirm current stock and pricing with local distributor.",
    technicalProperties: [
      "High vapour resistance — Sd value approximately 100 m (high resistance to vapour diffusion) — confirm current value from Pro Clima TDS",
      "Polyethylene film — robust and tear-resistant for installation use",
      "Installed below insulation in warm-roof assemblies — prevents interstitial condensation at insulation/membrane interface",
      "Taped lap system — Pro Clima TESCON VANA or compatible tape — confirms vapour continuity at all joints",
      "Compatible with Pro Clima Intello and Solitex system accessories for penetrations and upstands",
    ],
    limitations: [
      "Must be installed on the WARM side of the insulation — installation above insulation provides no benefit for interstitial condensation control",
      "Laps must be fully taped with compatible Pro Clima tape — any unsealed lap is a vapour pathway into the assembly",
      "Penetrations, pipe entries and upstands must be sealed with Pro Clima system accessories — not sealant alone",
      "// TODO: Confirm Australian distributor and current product availability — Pro Clima DB+ may be subject to lead times in Australia",
      "Confirm current product specification with Pro Clima / Rothoblaas Australia before specifying",
    ],
    procurementSources: [
      { name: "Pro Clima / Rothoblaas Australia — confirm current distributor and availability", url: "https://www.proclima.com" },
      { name: "Specialist building envelope and insulation suppliers — confirm stock", url: "https://www.proclima.com" },
    ],
  },
  {
    fullLabel: "Generic / various suppliers",
    brandUrl: "https://www.bunnings.com.au",
    accentColor: "#64748b",
    name: "Heavy-Duty Polyethylene Foil VCL",
    descriptionLine: "Generic polyethylene or foil-faced vapour control layer membrane — warm-roof balcony and podium assemblies",
    productType: "PE / foil-faced VCL",
    filterTags: ["VCL", "Vapour-control", "Polyethylene", "Foil-faced", "Warm-roof", "Flat-roof", "Balcony", "Podium", "Below-insulation", "Taped-laps"],
    techChips: [
      { label: "PE / foil VCL", cls: "bg-sky-100 text-sky-800" },
      { label: "Below-insulation", cls: "bg-slate-100 text-slate-700" },
      { label: "Generic / trade supply", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 4200", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Heavy-duty polyethylene (PE) sheeting and foil-faced PE laminate membranes are used as vapour control layers in warm-roof balcony and podium deck assemblies in Australian construction. These products are supplied by various manufacturers and building product distributors. A heavy-duty PE sheeting (minimum 0.2 mm, typically 0.3–0.5 mm) or foil-faced laminate with high vapour resistance is installed below the insulation layer.\n\nAS/NZS 4200.1 classifies flexible building membranes by vapour permeance — a true VCL must have a vapour resistance sufficiently high to prevent interstitial condensation in the specific assembly. Foil-faced laminates typically provide higher vapour resistance than plain PE sheeting. All laps must be taped with compatible aluminium foil tape or pressure-sensitive VCL tape. Penetrations must be sealed.\n\n// TODO: Confirm specific product selection with a building physicist or engineer performing a condensation analysis (Glaser method or dynamic simulation) for the specific warm-roof assembly — generic VCL selection without condensation analysis may not provide adequate protection in all Australian climate zones.",
    technicalProperties: [
      "Polyethylene or foil-faced laminate — high vapour resistance when laps are correctly sealed",
      "AS/NZS 4200.1 compliant for vapour membrane classification — confirm product class against assembly requirements",
      "Widely available through building products suppliers and hardware retailers",
      "Foil-faced laminates provide higher vapour resistance than plain PE — preferred for high-humidity or heated internal environments",
    ],
    limitations: [
      "Generic PE sheeting must be selected with adequate thickness and vapour resistance for the specific assembly — not all PE sheeting products provide sufficient vapour resistance",
      "Laps must be taped with compatible VCL tape — unsealed laps are vapour pathways into the assembly",
      "Penetrations must be sealed — pipe penetrations, fixings, and junction details must all be sealed with compatible accessories",
      "// TODO: Confirm specific product selection with condensation analysis for the assembly — generic VCL selection without analysis may be inadequate in some climate zones",
      "Confirm current product and compliance with the vapour resistance requirement for the specific assembly before specifying",
    ],
    procurementSources: [
      { name: "Bunnings — in-store nationally — confirm product specification", url: "https://www.bunnings.com.au" },
      { name: "Roofing and insulation trade suppliers nationally — confirm product specification", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "VCL", label: "VCL" },
  { id: "Vapour-control", label: "Vapour control" },
  { id: "Polyethylene", label: "Polyethylene" },
  { id: "Foil-faced", label: "Foil-faced" },
  { id: "Warm-roof", label: "Warm-roof" },
  { id: "Flat-roof", label: "Flat-roof" },
  { id: "Balcony", label: "Balcony" },
  { id: "Podium", label: "Podium" },
  { id: "Below-insulation", label: "Below insulation" },
  { id: "Taped-laps", label: "Taped laps" },
];

const BRAND_EQUIV: { system: string; kingspan: string; proclima: string; generic: string }[] = [
  { system: "VCL — below insulation — high vapour resistance", kingspan: "See note*", proclima: "DB+", generic: "Heavy-duty PE / foil laminate" },
  { system: "Vapour-open breather — above insulation", kingspan: "Nilvent", proclima: "Solitex range", generic: "Various breather membranes" },
];

const TECH_INFO = {
  typicalApplications: [
    "Warm-roof balcony assemblies — VCL installed below insulation layer to prevent interstitial condensation at the cold waterproofing membrane interface",
    "Warm-roof podium deck assemblies — same function as balcony assemblies — VCL below insulation on heated internal space below",
    "Flat roof assemblies over habitable space in Class 2 buildings where interstitial condensation analysis confirms VCL is required",
    "Renovation and refurbishment of existing flat roof and balcony assemblies where new insulation is being installed in a warm-roof configuration",
  ],
  selectionCriteria: [
    "A condensation analysis (Glaser method or dynamic simulation) should be performed for the specific assembly to confirm VCL specification is correct — consult a building physicist for complex assemblies",
    "The VCL must be on the WARM side (below) the insulation — installation above or within the insulation is incorrect for a warm-roof assembly",
    "Select foil-faced laminate for assemblies requiring very high vapour resistance — plain PE may not provide sufficient vapour resistance in high-humidity or cold climate applications",
    "Confirm tape and accessory compatibility with the VCL product supplier — unsealed laps negate the VCL function",
    "Confirm that all penetrations, upstands, and building fabric junctions are included in the VCL detail drawings before specifying",
  ],
  limitations: [
    "A VCL alone does not provide waterproofing — the waterproofing membrane in the balcony or flat roof assembly is a separate system installed above the insulation",
    "Unsealed laps and penetrations negate the VCL function — even a single unsealed penetration can allow significant vapour migration into the assembly",
    "VCL is not required in all warm-roof assemblies in all Australian climate zones — condensation analysis should confirm whether a VCL is required and what vapour resistance is needed",
    "Installation must be coordinated with the structural and waterproofing programme — VCL must be installed before insulation, and all trades must be aware of the VCL to avoid puncturing it",
  ],
  standardsNotes: [
    "AS/NZS 4200.1 — Pliable Building Membranes and Underlays — classification of vapour membranes by vapour permeance and water resistance",
    "AS/NZS 4200.2 — Installation Requirements for Pliable Building Membranes — installation requirements for VCL in roof and wall assemblies",
    "NCC Volume One — energy efficiency requirements for building fabric — may specify minimum insulation and vapour control requirements depending on climate zone",
    "ISO 13788 or equivalent condensation analysis method — should be used to confirm VCL specification for the specific assembly",
  ],
  suitableDefects: [
    "Interstitial condensation in warm-roof balcony and flat-roof assemblies — wet insulation, corrosion of fixings, deterioration of roof structure",
    "New warm-roof balcony or podium remediation where insulation is being installed and VCL is required as part of the assembly design",
    "Refurbishment of existing flat roof assemblies where no VCL was installed and condensation damage has occurred",
  ],
  typicalSubstrates: [
    "Concrete structural slab — VCL installed above concrete ceiling soffit (below insulation) in a warm-roof podium assembly",
    "Plasterboard or fibre cement soffit ceiling — VCL installed above ceiling in a warm-roof balcony or flat-roof assembly",
    "Structural steel and metal decking — VCL installed above soffit in commercial warm-roof applications",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VCLIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are vapour control layers — warm roof?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A vapour control layer (VCL) is a membrane installed in a roof or wall assembly to control the movement of water vapour by diffusion through the building fabric. In warm-roof balcony and podium deck assemblies — where the insulation is located above the structural slab and below the waterproofing membrane — the VCL is installed on the warm (interior) side of the insulation to prevent warm moist air from the occupied space below from diffusing upward into the insulation, where it would reach its dew point and condense against the cold waterproofing membrane.
        </p>
        <p>
          Without a correctly specified and installed VCL, interstitial condensation will occur within the insulation layer over time, progressively reducing thermal performance, causing wet insulation, and potentially leading to corrosion of structural fixings and deterioration of the assembly. In Australian Class 2 buildings, this issue is most significant in climate zones with significant heating loads (southern states) or in heavily air-conditioned buildings in any climate zone.
        </p>
        <p>
          A VCL is distinct from a breather or sarking membrane. A breather membrane has high vapour permeance and is installed on the outside of the insulation to allow vapour to escape outwards. A VCL has very low vapour permeance and is installed on the inside (warm side) to prevent vapour from entering the assembly. The two products perform opposite functions and must not be confused. Condensation analysis (Glaser method or dynamic hygrothermal simulation) should be performed by a building physicist to confirm VCL specification and position for the specific assembly.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse VCL with:</p>
          <ul className="space-y-1.5">
            {[
              "Breather / sarking membranes — vapour-open, installed on the outside of insulation to allow vapour to escape — the opposite function to a VCL",
              "Waterproofing membranes — liquid-applied or sheet waterproofing systems installed above the insulation in a warm-roof assembly",
              "Damp-proof membranes (DPM) — installed at ground level or below slab to prevent moisture from rising from the ground — different position and function",
              "Air barriers — installed to control air movement through the building fabric — may or may not also function as a VCL depending on the product",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function VCLProductSection() {
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

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — vapour control layer membranes for warm-roof assemblies — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
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

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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

        {/* Scrollable card row */}
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
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              VCL and breather membrane equivalents for warm-roof balcony and podium assemblies. * Kingspan Nilvent is a breather membrane — NOT a VCL. Confirm correct product with Kingspan for VCL function.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Function</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Kingspan</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Pro Clima</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Generic</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.kingspan, row.proclima, row.generic].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-red-900">Critical distinction — VCL vs breather membrane</h3>
        </div>
        <ul className="space-y-2">
          {[
            "A vapour control layer (VCL) is installed on the WARM SIDE (below) the insulation — it has high vapour resistance and prevents vapour from entering the assembly",
            "A breather membrane is installed on the COLD SIDE (above or outside) the insulation — it has low vapour resistance and allows vapour to escape outwards",
            "Installing a breather membrane in the VCL position (below insulation) will cause interstitial condensation — not prevent it",
            "Condensation analysis should be performed by a building physicist to confirm VCL specification and position for every warm-roof assembly — do not specify a VCL without analysis",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-red-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Installation requirements — VCL continuity</h3>
        </div>
        <ul className="space-y-2">
          {[
            "All laps in the VCL must be taped with compatible tape — any unsealed lap creates a vapour pathway into the assembly and negates the VCL function",
            "All penetrations (pipes, fixings, conduit) must be sealed with compatible accessories — penetrations are the most common source of VCL continuity failure",
            "The VCL must be protected from damage during construction — all trades working above the VCL (insulation installers, waterproofing applicators) must be made aware of its presence and importance",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
