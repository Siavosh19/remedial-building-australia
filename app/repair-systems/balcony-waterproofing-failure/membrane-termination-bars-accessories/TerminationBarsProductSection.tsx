"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Termination-bar"
  | "Aluminium"
  | "Stainless-steel"
  | "Mechanical-fix"
  | "Upstand"
  | "Wall-termination"
  | "External"
  | "Internal"
  | "Liquid-applied"
  | "Sheet-membrane";

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
    fullLabel: "Schluter Systems",
    brandUrl: "https://www.schluter.com.au",
    tdsUrl: "https://www.schluter.com.au",
    accentColor: "#f59e0b",
    name: "Schluter BARA-RK",
    descriptionLine: "Aluminium membrane termination bar — mechanically anchors liquid-applied membrane at upstand and wall terminations",
    productType: "Aluminium termination bar",
    filterTags: ["Termination-bar", "Aluminium", "Mechanical-fix", "Upstand", "Wall-termination", "External", "Internal", "Liquid-applied"],
    techChips: [
      { label: "Aluminium termination bar", cls: "bg-sky-100 text-sky-800" },
      { label: "Mechanical fix", cls: "bg-slate-100 text-slate-700" },
      { label: "Upstand / wall termination", cls: "bg-slate-100 text-slate-700" },
      { label: "Liquid-applied membrane", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Schluter BARA-RK is an aluminium termination bar profile designed to mechanically anchor the top edge of liquid-applied waterproofing membranes at upstand and wall terminations on balconies and wet areas. The bar is fixed to the wall substrate using screws and plugs at regular centres, and the membrane is turned up and lapped behind the bar. The profile edge is then sealed with compatible sealant to prevent water entry behind the termination.\n\nUsed in Class 2 strata balcony and wet area remediation at the point where the waterproofing membrane terminates at a vertical surface — providing a neat mechanical anchor that eliminates reliance on adhesion alone at this vulnerable edge. Confirm compatibility with the specific membrane system being used with Schluter before specifying.",
    technicalProperties: [
      "Aluminium profile — corrosion-resistant — suitable for external and internal wet area use",
      "Mechanical fix at regular centres — membrane termination edge is not relying on adhesion to vertical substrate alone",
      // TODO: confirm exact fixing centres and screw specification from current Schluter BARA-RK TDS
      "Profile designed to receive membrane behind the flange — membrane laps under and is trapped by the bar",
      "Schluter system component — compatible with Schluter KERDI, DITRA and liquid-applied systems — confirm specific system compatibility",
    ],
    limitations: [
      "Profile must be fixed level and true — misalignment affects membrane turn-up installation and sealant joint quality",
      "Sealant at top edge of bar is a maintenance joint — will require periodic inspection and re-sealing over the building life",
      "Confirm fixing substrate is suitable — hollow masonry or substrate without adequate embedment will not hold fixing under thermal cycling",
      "Confirm current product specification and compatibility with the membrane system in use with Schluter before specifying",
    ],
    procurementSources: [
      { name: "Schluter Systems Australia — trade supply — contact for current pricing", url: "https://www.schluter.com.au" },
      { name: "Tile suppliers and waterproofing specialists nationally — confirm availability", url: "https://www.schluter.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX Membrane Termination Profile",
    descriptionLine: "Aluminium membrane termination bar for use with ARDEX waterproofing systems at upstand and wall terminations",
    productType: "Aluminium termination bar",
    filterTags: ["Termination-bar", "Aluminium", "Mechanical-fix", "Upstand", "Wall-termination", "External", "Internal", "Liquid-applied"],
    techChips: [
      { label: "Aluminium termination bar", cls: "bg-sky-100 text-sky-800" },
      { label: "Mechanical fix", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX system compatible", cls: "bg-amber-50 text-amber-700" },
      { label: "Liquid-applied membrane", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX supplies aluminium membrane termination profiles as accessories for use with their waterproofing membrane systems (WPM range). These profiles provide a mechanical termination point for liquid-applied membranes at upstands and wall junctions, replacing adhesive-only edge termination. Fixed to the substrate at regular centres, the membrane is lapped behind the flange, and the exposed top edge is sealed with compatible sealant.\n\n// TODO: Confirm the current exact ARDEX product name and part number for their membrane termination bar accessory — ARDEX accessory product naming may vary. Contact ARDEX Australia technical for current product specification.",
    technicalProperties: [
      "Aluminium profile — corrosion-resistant — suitable for external balcony and internal wet area use",
      "Designed for use with ARDEX waterproofing membrane systems — confirm system compatibility with ARDEX technical",
      "Mechanical fix at regular centres — reduces reliance on adhesion alone at membrane edge termination",
      "Provides neat and inspectable membrane termination for Class 2 strata balcony and wet area remediation",
    ],
    limitations: [
      "// TODO: confirm product is available as a standard ARDEX accessory — consult ARDEX Australia for current product availability and specification",
      "Sealant joint at top edge of profile requires maintenance — periodic inspection and re-sealing over building life",
      "Profile must be installed plumb and level — misalignment will affect membrane installation and sealant quality",
      "Confirm current product specification and availability with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au",
    accentColor: "#0ea5e9",
    name: "Mapei Termination Bar Profile",
    descriptionLine: "Aluminium membrane termination profile for Mapei waterproofing systems at upstand and wall junctions",
    productType: "Aluminium termination bar",
    filterTags: ["Termination-bar", "Aluminium", "Mechanical-fix", "Upstand", "Wall-termination", "External", "Internal", "Liquid-applied"],
    techChips: [
      { label: "Aluminium termination bar", cls: "bg-sky-100 text-sky-800" },
      { label: "Mechanical fix", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei system compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei supplies aluminium membrane termination profiles as part of their complete waterproofing system for use with Mapelastic, Mapegum WPS and related liquid-applied waterproofing membranes. The profile mechanically anchors the membrane at upstand and wall terminations, providing a durable and inspectable edge detail for balcony and wet area applications.\n\n// TODO: Confirm the exact current Mapei product name and part number for their membrane termination profile range in Australia — the Mapei accessory product range may use different designations from the European catalogue. Contact Mapei Australia technical for current product specification.",
    technicalProperties: [
      "Aluminium profile — suitable for external and internal wet area and balcony applications",
      "Mechanical fix at regular centres — compatible with Mapei liquid-applied waterproofing membrane systems",
      "Provides defined edge termination at upstands and wall junctions in balcony and wet area waterproofing",
    ],
    limitations: [
      "// TODO: confirm current Mapei Australia product designation and availability for membrane termination profiles",
      "Sealant joint at profile top edge requires periodic maintenance inspection and re-sealing",
      "Profile alignment critical — must be level and plumb for correct membrane installation",
      "Confirm current product specification and compatibility with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply — contact for current pricing", url: "https://www.mapei.com/au" },
      { name: "Tile and waterproofing trade suppliers nationally — confirm availability", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX STB / STA Self-Adhesive Butynol Tape",
    descriptionLine: "ARDEX self-adhesive butyl rubber tape for membrane terminations, sealing and detailing at junctions",
    productType: "Self-adhesive butyl rubber sealing tape — membrane terminations and detailing",
    filterTags: ["Wall-termination", "Upstand", "Liquid-applied", "Sheet-membrane", "External", "Internal"],
    techChips: [
      { label: "Self-adhesive butyl tape", cls: "bg-orange-100 text-orange-800" },
      { label: "Membrane termination", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX Butynol system", cls: "bg-slate-100 text-slate-700" },
      { label: "Cold-applied — no flame", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "ARDEX STB / STA are self-adhesive butyl rubber tapes for use in ARDEX Butynol sheet membrane systems — providing sealing at membrane terminations, laps, upstands, penetrations and junctions. Self-adhesive butyl rubber provides immediate adhesion on contact without the need for heat, open flame, or separate adhesive. STB and STA designations refer to different tape formats within the ARDEX Butynol accessory range — confirm the appropriate tape format, width, and thickness for the specific application detail with ARDEX Australia. Apply to primed or cleaned substrates and press firmly with a roller for full contact adhesion.",
    technicalProperties: [
      "Self-adhesive butyl rubber tape — for membrane termination sealing and detailing",
      "Cold-applied — no heat, flame or separate adhesive required",
      "For use with ARDEX Butynol sheet membrane systems — sealing laps, upstands, penetrations and junctions",
      "Immediate adhesion on contact — press firmly with a roller for full contact",
    ],
    limitations: [
      "Confirm correct tape format (STB or STA), width and thickness for the specific application with ARDEX Australia",
      "Apply to primed or clean substrates — contamination reduces adhesion",
      "Part of the ARDEX Butynol system — confirm compatibility with the specific ARDEX membrane system being used",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Termination-bar", label: "Termination bar" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Stainless-steel", label: "Stainless steel" },
  { id: "Mechanical-fix", label: "Mechanical fix" },
  { id: "Upstand", label: "Upstand" },
  { id: "Wall-termination", label: "Wall termination" },
  { id: "External", label: "External" },
  { id: "Internal", label: "Internal" },
  { id: "Liquid-applied", label: "Liquid-applied" },
  { id: "Sheet-membrane", label: "Sheet membrane" },
];

const BRAND_EQUIV: { system: string; schluter: string; ardex: string; mapei: string }[] = [
  { system: "Aluminium termination bar — liquid-applied membrane", schluter: "BARA-RK", ardex: "Termination Profile*", mapei: "Termination Profile*" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; material: string; membraneSystem: string; fixingMethod: string; sealantAtTop: string; notes: string;
}[] = [
  {
    product: "Schluter BARA-RK",
    brand: "Schluter",
    material: "Aluminium",
    membraneSystem: "Schluter + compatible liquid-applied membranes",
    fixingMethod: "Screw & plug — regular centres",
    sealantAtTop: "Yes — maintenance joint",
    notes: "Schluter system component — confirm compatibility with specific membrane",
  },
  {
    product: "ARDEX Termination Profile",
    brand: "ARDEX",
    material: "Aluminium",
    membraneSystem: "ARDEX WPM waterproofing systems",
    fixingMethod: "Screw & plug — regular centres",
    sealantAtTop: "Yes — maintenance joint",
    notes: "Confirm exact ARDEX AU product designation with ARDEX technical",
  },
  {
    product: "Mapei Termination Profile",
    brand: "Mapei",
    material: "Aluminium",
    membraneSystem: "Mapelastic / Mapegum WPS systems",
    fixingMethod: "Screw & plug — regular centres",
    sealantAtTop: "Yes — maintenance joint",
    notes: "Confirm exact Mapei AU product designation with Mapei technical",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Top-edge termination of liquid-applied polyurethane and hybrid membranes at upstand walls on balconies",
    "Wall termination of liquid-applied membranes at parapet walls, door thresholds and window sill upstands",
    "Termination of membrane turn-ups at any vertical surface where adhesion-only edge termination is not appropriate",
    "Used in Class 2 strata balcony remediation where the membrane must terminate at a vertical wall surface and the edge must be mechanically secured",
  ],
  selectionCriteria: [
    "Select aluminium termination bar for standard external balcony and wet area environments — corrosion-resistant and readily available",
    "Select stainless steel profiles for highly corrosive marine or industrial environments where aluminium is not suitable",
    "Confirm bar profile height against the required membrane turn-up height — minimum turn-up per AS 4654.2 and manufacturer TDS",
    "Confirm fixing centres and screw type against substrate — hollow masonry requires different fixing specification to solid concrete",
    "Sealant at top edge of bar must be compatible with both the bar material and the membrane system",
  ],
  limitations: [
    "Termination bar alone does not waterproof the joint — sealant at the top edge of the bar is a maintenance joint and will degrade over time",
    "If the bar is incorrectly fixed — not level, not at correct height, or insufficiently fixed — the membrane turn-up and sealant joint will be compromised",
    "Membrane must be correctly lapped behind the bar flange — insufficient overlap will allow water ingress behind the termination",
    "AS 4654.2 requires minimum 50mm membrane turn-up height measured from the finished floor level at all upstands — confirm this with the specific membrane system specification",
  ],
  standardsNotes: [
    "AS 4654.2 — Waterproofing of Wet Areas Within Residential Buildings — minimum 50mm upstand height requirement for membrane termination at vertical surfaces",
    "AS 3740 — Waterproofing of Domestic Wet Areas — upstand and membrane termination requirements at walls and junctions",
    "AS 4858 — Wet Area Membranes — product compliance standard referenced in conjunction with accessory requirements",
  ],
  suitableDefects: [
    "Failed or delaminated membrane termination at upstand walls on balconies — membrane lifting from wall at top edge",
    "Water ingress behind membrane at wall termination — inadequate edge sealing",
    "New waterproofing installation requiring mechanical termination detail at upstands and vertical surfaces",
  ],
  typicalSubstrates: [
    "Concrete — in-situ and precast upstand walls on balconies",
    "Masonry — brick or blockwork upstand walls",
    "Rendered substrates — confirmed adhesion of render before fixing termination bar",
    "Fibre cement sheet upstands — confirm substrate thickness and fixing specification before use",
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

export function TerminationBarsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are membrane termination bars and accessories?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Membrane termination bars are aluminium or stainless-steel extruded profiles that mechanically anchor the top edge of a liquid-applied or sheet membrane at wall upstands, parapets, door thresholds and other vertical termination points on balconies and wet areas. Without mechanical termination, the membrane edge is secured only by adhesion to the vertical substrate — a detail that is vulnerable to thermal cycling, membrane creep, impact damage, and long-term adhesion degradation.
        </p>
        <p>
          A termination bar is fixed to the substrate at regular centres using screws and plugs. The membrane is then turned up the wall and lapped behind the flange of the bar. The exposed top edge of the bar is sealed with a compatible sealant to prevent water ingress. This detail creates a defined, mechanically secured edge that can be inspected, maintained, and re-sealed over the building life.
        </p>
        <p>
          AS 4654.2 requires a minimum 50 mm membrane turn-up height at all upstands and vertical surfaces, measured from the finished floor level. The termination bar must be positioned to allow for this minimum height while also providing a neat and weather-resistant termination detail. Always confirm minimum turn-up height requirements against the specific membrane system TDS and the applicable Australian Standard.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse termination bars with:</p>
          <ul className="space-y-1.5">
            {[
              "Schluter DILEX or KSBT profiles — expansion joint cover systems, not membrane termination accessories",
              "Tile edge trims — decorative and tile-edge protection profiles, not membrane anchors",
              "Sealant alone at top of membrane — sealant is a maintenance joint; mechanical termination bar provides the primary anchor",
              "Embedded reinforcing fabric — fabric is embedded within the membrane body at junctions, not a termination accessory",
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

export function TerminationBarsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — aluminium membrane termination profiles — scroll to view all</p>
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of membrane termination bar profiles. * Confirm exact product designation and specification with manufacturer.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Membrane system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Fixing method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Sealant at top edge</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.membraneSystem}</td>
                  <td className="px-4 py-3 text-slate-600">{row.fixingMethod}</td>
                  <td className="px-4 py-3 text-slate-600">{row.sealantAtTop}</td>
                  <td className="px-4 py-3 italic text-slate-500">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              Membrane termination bar equivalents across brands active in Australian Class 2 strata remediation. * Confirm exact product designation with manufacturer.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f59e0b" }}>Schluter</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>ARDEX</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#0ea5e9" }}>Mapei</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.schluter, row.ardex, row.mapei].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical detail requirements — membrane termination</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Minimum 50 mm membrane turn-up height at all upstands — measured from finished floor level — per AS 4654.2. Confirm with the specific membrane TDS.",
            "The sealant bead at the top edge of the termination bar is a maintenance joint — it will require periodic inspection and re-sealing over the building life and must be included in the building maintenance schedule",
            "Membrane must be fully lapped behind the bar flange before the bar is fixed — do not fix bar first then attempt to insert membrane behind the flange",
            "The termination bar does not replace the requirement for correct membrane turn-up installation, correct priming of the vertical substrate, and compatible sealant selection",
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
