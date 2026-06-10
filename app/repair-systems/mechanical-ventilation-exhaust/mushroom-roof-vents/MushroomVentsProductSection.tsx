"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Roof-vent"
  | "Mushroom-vent"
  | "Aluminium"
  | "Insulated"
  | "Polypropylene"
  | "Bird-mesh"
  | "Passive"
  | "Tiled-roof"
  | "Metal-roof";

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
    fullLabel: "Ventilate Australia",
    brandUrl: "https://www.ventilate.com.au",
    accentColor: "#ef4444",
    name: "Ventilate Aluminium Mushroom Roof Vent",
    descriptionLine:
      "Pressed aluminium mushroom roof vent for passive roof space ventilation — bird mesh protected, suitable for tiled and corrugated metal roofs",
    productType: "Pressed aluminium mushroom roof vent — passive ventilation",
    filterTags: ["Roof-vent", "Mushroom-vent", "Aluminium", "Passive", "Bird-mesh", "Tiled-roof", "Metal-roof"],
    techChips: [
      { label: "Pressed aluminium", cls: "bg-sky-100 text-sky-800" },
      { label: "Passive ventilation", cls: "bg-slate-100 text-slate-700" },
      { label: "Bird mesh", cls: "bg-slate-100 text-slate-700" },
      { label: "Tiled / metal roof", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC Section J", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Ventilate Aluminium Mushroom Roof Vent is a pressed aluminium passive roof space ventilator designed for installation through tiled and corrugated metal roof surfaces. The domed mushroom profile sheds rain water and prevents entry of birds, vermin and debris via an integrated bird mesh screen beneath the cap. Suitable for new and remedial installation on Class 2 strata apartment building roofs where existing vents have failed, cracked, or were never installed.\n\nAluminium construction provides long service life in Australian conditions with no UV degradation. The vent is installed through a core-drilled or cut opening in the roof structure with a purpose-designed or EPDM collar flashing. Confirm free area rating of the selected unit against NCC Section J.3 requirements for the roof space volume being served.",
    technicalProperties: [
      "Pressed aluminium cap and body — corrosion resistant — long service life in coastal and inland Australian conditions",
      "Integrated bird and insect mesh screen beneath cap — prevents entry of birds, bats, possums and vermin into roof space",
      "Passive ventilation — no electrical connection required — zero operating cost after installation",
      "Suitable for installation on tiled roofs (clay, concrete) and corrugated metal roofing (Colorbond, Zincalume) with appropriate collar",
      "Available in multiple Colorbond colour options — confirm current colour range and free area rating with Ventilate Australia",
    ],
    limitations: [
      "Uninsulated aluminium cap — not recommended in climate zones 1–3 where solar-heated cap may increase heat gain into roof space",
      "Passive only — no ability to increase ventilation rate in high humidity or high heat conditions beyond ambient wind pressure",
      "Collar flashing must be correctly installed and sealed to tile or metal profile — improper installation risks water ingress at penetration",
      "Free area of single vent may be insufficient for larger roof spaces — multiple vents required, placement confirmed by mechanical engineer",
      "Confirm current product specification and compliance with Ventilate Australia before specifying",
    ],
    procurementSources: [
      { name: "Ventilate Australia — trade supply — contact for current pricing and availability", url: "https://www.ventilate.com.au" },
      { name: "Roofing trade suppliers nationally — confirm stock", url: "https://www.ventilate.com.au" },
    ],
  },
  {
    fullLabel: "Manrose",
    brandUrl: "https://www.manrose.com.au",
    accentColor: "#3b82f6",
    name: "Manrose Insulated Mushroom Roof Vent",
    descriptionLine:
      "Insulated polypropylene mushroom roof vent with built-in insulation baffle — reduces summer heat gain and winter heat loss through vent opening",
    productType: "Insulated polypropylene mushroom roof vent — energy-efficient",
    filterTags: ["Roof-vent", "Mushroom-vent", "Insulated", "Polypropylene", "Passive", "Tiled-roof"],
    techChips: [
      { label: "Insulated polypropylene", cls: "bg-sky-100 text-sky-800" },
      { label: "Passive ventilation", cls: "bg-slate-100 text-slate-700" },
      { label: "Insulation baffle", cls: "bg-green-50 text-green-700" },
      { label: "Tiled roof", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC Section J", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Manrose Insulated Mushroom Roof Vent is a UV-stabilised polypropylene passive roof space ventilator with an integrated insulation baffle that reduces thermal exchange through the vent opening. The insulation baffle is particularly important in climate zones 1–3 (tropical and subtropical) where uninsulated vents allow solar-heated air to enter the roof space, and in cool climate zones 6–7 where heat loss through uninsulated vents increases heating energy load. Required for NCC Section J compliance in many climate zone and building combinations.\n\nPolypropylene construction is UV-stabilised for long life in Australian sun exposure. Installation requires a purpose-designed flashing collar suited to the roof tile profile. Confirm free area rating, insulation R-value, and compliance pathway for the specific NCC climate zone before specifying.",
    technicalProperties: [
      "Insulated polypropylene body — built-in insulation baffle reduces solar heat gain in summer and heat loss in winter — NCC Section J benefit",
      "UV-stabilised polypropylene construction — rated for Australian UV exposure — long service life without cracking or chalking",
      "Passive ventilation — no electrical connection required — insulation baffle does not reduce free area below NCC minimum requirements",
      "Integrated bird and insect mesh — prevents entry of birds, bats, possums and vermin into roof space",
      "Required in many climate zone and building type combinations for NCC Section J.3 roof space ventilation compliance — confirm with mechanical engineer",
    ],
    limitations: [
      "Polypropylene — confirm suitability for corrugated metal roof profiles — primarily designed for tiled roof installation with manufacturer collar",
      "Insulation baffle reduces thermal exchange but does not eliminate it — not a substitute for sarking or roof insulation where required",
      "Passive only — ventilation rate limited by wind pressure and vent free area — not suitable where mechanical exhaust is required",
      "Collar flashing must be compatible with tile profile and correctly bedded and sealed — improper installation risks water ingress",
      "Confirm current product specification and compliance with Manrose before specifying",
    ],
    procurementSources: [
      { name: "Manrose — trade supply — contact Australian distributor for current pricing", url: "https://www.manrose.com.au" },
      { name: "Electrical and ventilation trade suppliers nationally — confirm stock and availability", url: "https://www.manrose.com.au" },
      { name: "Roofing trade suppliers — confirm current stocking in your state", url: "https://www.manrose.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Roof-vent", label: "Roof-vent" },
  { id: "Mushroom-vent", label: "Mushroom-vent" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Insulated", label: "Insulated" },
  { id: "Polypropylene", label: "Polypropylene" },
  { id: "Bird-mesh", label: "Bird-mesh" },
  { id: "Passive", label: "Passive" },
  { id: "Tiled-roof", label: "Tiled-roof" },
  { id: "Metal-roof", label: "Metal-roof" },
];

const BRAND_EQUIV: { system: string; ventilate: string; manrose: string }[] = [
  {
    system: "Aluminium mushroom vent (uninsulated)",
    ventilate: "Aluminium Mushroom Vent",
    manrose: "—",
  },
  {
    system: "Insulated mushroom vent (PP)",
    ventilate: "—",
    manrose: "Insulated Mushroom Vent",
  },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  insulated: string;
  birdMesh: string;
  roofType: string;
  primaryUse: string;
}[] = [
  {
    product: "Ventilate Aluminium Mushroom Roof Vent",
    brand: "Ventilate Australia",
    material: "Pressed aluminium",
    insulated: "No — uninsulated",
    birdMesh: "Yes — integrated",
    roofType: "Tiled / corrugated metal",
    primaryUse: "Passive roof space ventilation — tiled and metal roofs — all climate zones except tropical",
  },
  {
    product: "Manrose Insulated Mushroom Roof Vent",
    brand: "Manrose",
    material: "UV-stabilised polypropylene",
    insulated: "Yes — insulation baffle",
    birdMesh: "Yes — integrated",
    roofType: "Tiled roof",
    primaryUse: "Passive roof space ventilation — NCC Section J climate zone compliance — insulated requirement",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Replacement of failed, cracked or missing mushroom roof vents on Class 2 strata apartment building tiled and metal roofs",
    "Remedial installation of roof space ventilation where original construction omitted vents — NCC Section J compliance pathway",
    "Replacement of UV-degraded or bird-damaged polypropylene or fibreglass mushroom vent bodies",
    "Upgrade from uninsulated to insulated mushroom vent where NCC Section J climate zone requirements demand insulated vent",
    "Installation as part of a roof remediation scope including re-tiling, re-sheeting or roof restoration",
  ],
  selectionCriteria: [
    "Select insulated mushroom vent (Manrose) where NCC climate zone 1–3 or 6–7 requirements mandate insulated roof vents for Section J compliance",
    "Select aluminium vent (Ventilate) for corrugated metal roof profiles where polypropylene collar may not suit roof profile",
    "Confirm free area of each vent unit against NCC Section J.3 minimum ventilation rate for the roof space volume — may require multiple vents",
    "Confirm colour match to existing or new roofing material — Colorbond colour options available from Ventilate Australia",
    "Confirm collar flashing type suits the specific tile or metal roof profile before ordering — collar type is critical for waterproofing at the penetration",
  ],
  limitations: [
    "Passive mushroom vents ventilate by wind pressure and thermal convection only — inadequate in still-air conditions without mechanical supplement",
    "Uninsulated aluminium vents are not compliant in NCC climate zones where insulated roof vents are required for Section J",
    "Incorrect collar flashing installation is the primary cause of water ingress at roof vent penetrations — use manufacturer collar or suitable EPDM collar",
    "Bird mesh requires periodic inspection and cleaning to maintain free area — mesh blockage reduces ventilation below NCC minimum",
    "Roof tile removal and correct re-bedding and pointing around collar is required for tiled roofs — impacts scope and cost of installation",
  ],
  standardsNotes: [
    "NCC Section J.3 — Roof space ventilation — sets minimum free area requirements for roof space ventilation in Class 2 buildings",
    "NCC Section J.5 — Building sealing — vent installation must not create uncontrolled air infiltration paths through ceiling plane",
    "AS/NZS 4600 — Cold-formed steel structures — applicable where vent installation penetrates metal roof sheeting",
    "Confirm the specific NCC climate zone for the building and apply the relevant Section J ventilation requirements before selecting product",
  ],
  suitableDefects: [
    "Failed, cracked or UV-degraded existing mushroom roof vent bodies requiring replacement",
    "Missing roof space ventilation from original construction — NCC non-compliance requiring remedial vent installation",
    "Bird or vermin entry through damaged or missing vent mesh — mesh replacement or vent replacement",
    "Water ingress at roof vent penetration due to failed collar flashing — vent and collar replacement",
    "Excessive heat build-up in roof space due to insufficient or non-insulated passive ventilation",
  ],
  typicalSubstrates: [
    "Clay and concrete tiled roofs — vent installed through tile removal and collar bedded into tile mortar",
    "Corrugated steel (Colorbond / Zincalume) roofing — aluminium vent with purpose metal roof collar",
    "Fibreglass and translucent roof sheeting — confirm suitability with Ventilate or Manrose before specifying",
    "Timber rafter and batten roof structures — verify structural clearance for vent collar installation before cutting",
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

export function MushroomVentsIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are mushroom roof vent systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Mushroom roof vents are passive ventilators installed through the roof surface to allow hot, moist air to escape from the roof space. In Class 2 strata apartment buildings, roof space ventilation failures are common — existing mushroom vents crack and degrade from UV exposure, are damaged by birds or vermin gaining access through failed mesh, or were simply never installed at original construction, leaving the building non-compliant with ventilation requirements from day one. Failed vents are typically identified during roof inspection as cracked or missing vent bodies, broken mesh, or evidence of water ingress at the collar flashing.
        </p>
        <p>
          Passive mushroom vents operate without electrical power — they rely on wind pressure and thermal stack effect to draw warm air out of the roof space. This reduces heat build-up in the roof space during summer, which lowers ceiling surface temperatures and reduces cooling loads for apartments below. Roof space ventilation also reduces moisture accumulation from bathroom and laundry exhausts discharged into the roof space — a common NCC non-compliance — slowing timber decay and reducing the risk of condensation on roof structure members.
        </p>
        <p>
          The choice between insulated and uninsulated mushroom vents is driven by NCC Section J climate zone requirements. In climate zones 1–3 (tropical and subtropical Queensland, Northern Territory, and northern Western Australia), uninsulated aluminium vents allow solar-heated air to re-enter the roof space through the vent cap — the opposite of the intended effect in summer. Insulated mushroom vents include a thermal baffle that reduces this solar heat gain pathway. In climate zones 6–7 (cool temperate), insulated vents also reduce winter heat loss through the vent opening. Confirm the specific climate zone and Section J requirements for the building with a mechanical engineer before specifying.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Whirlybirds / turbine vents — rotating ventilators driven by wind — different product, different installation, different free area calculation",
              "Exhaust fans — mechanical powered exhaust devices requiring electrical connection — not passive roof vents",
              "Skylight domes — glazed or polycarbonate roof penetrations providing daylighting, not ventilation",
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

export function MushroomVentsProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — mushroom roof vent systems — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
                {/* Card header */}
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

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of mushroom roof vent products for passive roof space ventilation. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Insulated</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Bird mesh</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Roof type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${row.insulated.startsWith("Yes") ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                      {row.insulated}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.birdMesh}</td>
                  <td className="px-4 py-3 text-slate-600">{row.roofType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
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
            <p className="mt-1 text-sm text-slate-500">Mushroom roof vent equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Ventilate Australia</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Manrose</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.ventilate, row.manrose].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Vent placement and NCC compliance</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Roof vent free area must comply with NCC Section J.3 requirements for roof space ventilation — confirm the number and size of vents required for the roof space volume with a mechanical engineer",
            "Vent installation on tiled roofs requires tile removal and correct flashing around the collar — use the manufacturer-supplied collar or a suitable EPDM collar bedded and sealed to the tile profile",
            "Insulated vents are required in climate zones 1–3 (tropical and subtropical) where uninsulated vents allow solar heat gain into the roof space — confirm climate zone and Section J requirements before specifying",
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
