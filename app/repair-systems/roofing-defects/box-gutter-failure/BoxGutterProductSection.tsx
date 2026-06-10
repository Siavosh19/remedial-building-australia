"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Steel"
  | "Colorbond"
  | "Gutter-lining"
  | "Box-gutter"
  | "Aluminium"
  | "Copper"
  | "Leaf-guard"
  | "Mesh"
  | "Strainer"
  | "Overflow";

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
    fullLabel: "BlueScope Steel",
    brandUrl: "https://www.bluescopesteel.com.au",
    tdsUrl: "https://www.bluescopesteel.com.au",
    accentColor: "#ef4444",
    name: "BlueScope Colorbond Box Gutter Liner",
    descriptionLine: "Pre-formed ZINCALUME/Colorbond steel section for box gutter lining — supplied in standard box gutter profiles or fabricated to order",
    productType: "Colorbond steel box gutter lining",
    filterTags: ["Steel", "Colorbond", "Gutter-lining", "Box-gutter"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-sky-100 text-sky-800" },
      { label: "ZINCALUME substrate", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-formed profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Box gutter lining", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "BlueScope Colorbond box gutter liners are manufactured from ZINCALUME or Colorbond steel and are used for relining failed or corroded box gutters in strata apartment buildings. Supplied in standard box gutter profiles or fabricated to order to match existing gutter geometry. The steel liner is laid into the existing box gutter structure, with joints continuously welded by a licensed plumber or roofing contractor. Available in the standard Colorbond colour range to match existing roof sheeting.\n\nHydraulic sizing must be confirmed before lining — the cross-section of the new liner must satisfy design rainfall intensity per AS/NZS 3500.3. Overflow scuppers must be maintained or provided at the correct height. Do not install Colorbond liners over existing corroded or delaminating steel without removing all loose material and treating the substrate.",
    technicalProperties: [
      "ZINCALUME base steel with Colorbond paint system — good corrosion resistance for typical Australian roofing environments",
      "Pre-formed to standard box gutter profiles — can be fabricated to order for non-standard gutter geometry",
      "Continuously welded joints provide watertight lining without exposed lap fixings",
      "Available in standard Colorbond colour range — suited to matching existing roof finish",
      "Compatible with standard plumbing and roofing installation practices — widely used in Class 2 strata building remediation",
    ],
    limitations: [
      "Not suitable for highly aggressive coastal environments without confirming appropriate grade with BlueScope — standard Colorbond has limits in marine exposure",
      "Hydraulic capacity of the liner must be confirmed against design rainfall intensity before specifying — do not reduce existing gutter cross-section without hydraulic assessment",
      "Continuously welded joints required — exposed lap joints with fixings are not acceptable for strata box gutters",
      "Liner must be installed to correct fall — confirm existing falls before lining; relining does not correct inadequate falls",
      "Confirm current product specification and compliance with BlueScope Steel before specifying",
    ],
    procurementSources: [
      { name: "BlueScope Steel — trade supply via roofing distributors — contact for current pricing", url: "https://www.bluescopesteel.com.au" },
      { name: "Metal roofing and cladding distributors nationally — confirm current stock", url: "https://www.bluescopesteel.com.au" },
    ],
  },
  {
    fullLabel: "Capral Aluminium",
    brandUrl: "https://www.capral.com.au",
    tdsUrl: "https://www.capral.com.au",
    accentColor: "#3b82f6",
    name: "Capral Aluminium Box Gutter Extrusion",
    descriptionLine: "Extruded aluminium box gutter section for box gutter lining — corrosion-resistant, suitable for aggressive coastal environments",
    productType: "Mill-finish aluminium box gutter section",
    filterTags: ["Aluminium", "Gutter-lining", "Box-gutter"],
    techChips: [
      { label: "Extruded aluminium", cls: "bg-sky-100 text-sky-800" },
      { label: "Corrosion-resistant", cls: "bg-green-50 text-green-700" },
      { label: "Box gutter lining", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal suitable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Capral aluminium box gutter extrusions are used for relining box gutters where corrosion resistance in aggressive environments — particularly coastal locations — is required. Extruded aluminium sections are fabricated to match the existing box gutter profile and are installed into the existing gutter structure. Joints are continuously welded using TIG welding by a qualified fabricator. Mill-finish aluminium is not coated; anodised or powder-coated finishes are available for aesthetic or specific durability requirements.\n\nAluminium is not galvanically compatible with steel — maintain isolation between aluminium liners and any steel fixings, structure or flashings using appropriate isolation tape or gasket. Confirm compatibility of existing roof structure materials before specifying aluminium lining. Hydraulic sizing must be confirmed before lining as for all box gutter relining work.",
    technicalProperties: [
      "Extruded aluminium — excellent corrosion resistance — suitable for coastal and aggressive atmospheric environments",
      "Fabricated to order to match existing box gutter geometry — not limited to standard profiles",
      "TIG-welded joints provide fully watertight, continuous lining without exposed mechanical fixings",
      "Lightweight material — less dead load on roof structure compared with steel liners",
      "Anodised or powder-coated finishes available for specific aesthetic or durability requirements — confirm with Capral",
    ],
    limitations: [
      "Galvanic isolation from steel required — aluminium must be isolated from steel structure, fixings and flashings using isolation tape or compatible sealant",
      "TIG welding requires qualified fabrication — not field-welded by general roofing contractors without appropriate equipment",
      "Hydraulic capacity of the liner must be confirmed against design rainfall intensity before specifying",
      "Mill-finish aluminium will oxidise on exposed surfaces — confirm finish requirements with client and confirm with Capral",
      "Confirm current product specification and compliance with Capral Aluminium before specifying",
    ],
    procurementSources: [
      { name: "Capral Aluminium — trade supply nationally — contact for current pricing", url: "https://www.capral.com.au" },
      { name: "Aluminium fabricators and roofing contractors — fabricated sections to order", url: "https://www.capral.com.au" },
    ],
  },
  {
    fullLabel: "Leaf Stopper",
    brandUrl: "https://www.leafstopper.com.au",
    tdsUrl: "https://www.leafstopper.com.au",
    accentColor: "#22c55e",
    name: "Leaf Stopper Stainless Mesh Leaf Guard",
    descriptionLine: "Woven stainless steel mesh leaf guard system installed over box gutters — prevents leaf accumulation and reduces maintenance frequency",
    productType: "Stainless steel mesh leaf guard for gutters",
    filterTags: ["Leaf-guard", "Mesh", "Steel", "Strainer"],
    techChips: [
      { label: "Stainless steel mesh", cls: "bg-sky-100 text-sky-800" },
      { label: "Leaf guard", cls: "bg-green-50 text-green-700" },
      { label: "Box gutter protection", cls: "bg-slate-100 text-slate-700" },
      { label: "Low maintenance", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Leaf Stopper stainless mesh leaf guard systems are installed over box gutters to prevent leaf and debris accumulation that contributes to gutter blockage, overflow, and corrosion-accelerating sediment build-up. The woven stainless steel mesh is fixed to the gutter and roof sheeting perimeter, allowing water to pass through while deflecting leaves and coarse debris. Reduces the frequency of gutter cleaning maintenance in strata buildings — a significant OHS and cost benefit in multi-level buildings.\n\nLeaf guard systems do not eliminate gutter maintenance entirely — fine debris and dust accumulation will still require periodic clearing. Leaf guard must not be installed in a way that seals overflow relief weirs or scuppers. Confirm compatibility of leaf guard system with existing gutter profile and fixing details before specifying. A leaf guard is a maintenance reduction product, not a hydraulic design solution — it does not increase gutter capacity.",
    technicalProperties: [
      "Woven stainless steel mesh — durable, corrosion-resistant, suitable for all Australian climate zones",
      "Installed over existing box gutter without requiring gutter replacement — compatible with steel and aluminium box gutters",
      "Reduces leaf and coarse debris accumulation — reduces gutter cleaning frequency and associated OHS risk in multi-level strata buildings",
      "Self-cleaning mesh profile on sloped roof sections — rain action clears surface debris from mesh",
      "Fixed to gutter and roof sheeting perimeter — profile maintains mesh position under wind load",
    ],
    limitations: [
      "Does not eliminate gutter maintenance — fine dust, sediment and some debris will still accumulate and require periodic clearing",
      "Must not obstruct overflow relief weirs, scuppers or downpipe inlets — confirm installation detail preserves all overflow provisions",
      "Not a substitute for hydraulic sizing — leaf guard does not increase gutter cross-section capacity",
      "Confirm compatibility with existing gutter profile geometry and fixing substrate before specifying",
      "Confirm current product specification and compliance with Leaf Stopper before specifying",
    ],
    procurementSources: [
      { name: "Leaf Stopper — trade supply and licensed installer network — contact for current pricing", url: "https://www.leafstopper.com.au" },
      { name: "Roofing and guttering contractors nationally — confirm current product availability", url: "https://www.leafstopper.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Steel", label: "Steel" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Gutter-lining", label: "Gutter-lining" },
  { id: "Box-gutter", label: "Box-gutter" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Copper", label: "Copper" },
  { id: "Leaf-guard", label: "Leaf-guard" },
  { id: "Mesh", label: "Mesh" },
  { id: "Strainer", label: "Strainer" },
  { id: "Overflow", label: "Overflow" },
];

const BRAND_EQUIV: { system: string; bluescope: string; capral: string; leafstopper: string }[] = [
  { system: "Box gutter lining (steel)", bluescope: "Colorbond Liner", capral: "—", leafstopper: "—" },
  { system: "Box gutter lining (aluminium)", bluescope: "—", capral: "Box Gutter Extrusion", leafstopper: "—" },
  { system: "Leaf guard (mesh)", bluescope: "—", capral: "—", leafstopper: "Stainless Mesh" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; material: string; finish: string; gaugemm: string; corrosionResist: string; primaryUse: string;
}[] = [
  {
    product: "Colorbond Box Gutter Liner",
    brand: "BlueScope",
    material: "ZINCALUME / Colorbond steel",
    finish: "Colorbond paint system",
    gaugemm: "Confirm with BlueScope",
    corrosionResist: "Good — standard environments",
    primaryUse: "Box gutter relining — steel lining",
  },
  {
    product: "Aluminium Box Gutter Extrusion",
    brand: "Capral",
    material: "Extruded aluminium",
    finish: "Mill-finish / anodised / powder-coat",
    gaugemm: "Confirm with Capral",
    corrosionResist: "Excellent — coastal environments",
    primaryUse: "Box gutter relining — aluminium lining",
  },
  {
    product: "Stainless Mesh Leaf Guard",
    brand: "Leaf Stopper",
    material: "Woven stainless steel mesh",
    finish: "Mill stainless",
    gaugemm: "Mesh — confirm with Leaf Stopper",
    corrosionResist: "Excellent — stainless steel",
    primaryUse: "Leaf and debris protection — over existing gutter",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Relining corroded or joint-failed box gutters in Class 2 strata apartment buildings",
    "Installation of new steel or aluminium box gutter liner sections where existing gutter has failed",
    "Leaf guard installation over box gutters to reduce maintenance frequency and OHS risk",
    "Box gutter overflow scupper installation or reinstatement where overflow relief is absent",
    "Box gutter fall correction prior to relining — levelling mortar or substrate build-up before lining",
  ],
  selectionCriteria: [
    "Select Colorbond steel liner for standard inland environments — confirm grade with BlueScope for exposure category",
    "Select aluminium liner for coastal or aggressive atmospheric environments — confirm galvanic isolation requirements",
    "Confirm hydraulic capacity of proposed liner cross-section against design rainfall intensity (AS/NZS 3500.3) before specifying",
    "Leaf guard — select where leaf accumulation is a recurring maintenance problem — confirm compatibility with existing gutter profile",
    "All box gutter relining must confirm existing falls are adequate — relining does not correct inadequate falls",
  ],
  limitations: [
    "Box gutter relining does not increase hydraulic capacity unless new liner cross-section is larger than the existing gutter",
    "Galvanic corrosion risk when aluminium liners are in contact with steel structure or fixings — isolation required",
    "Leaf guards reduce but do not eliminate gutter maintenance — fine sediment accumulation will still occur",
    "Overflow relief must be maintained or provided — do not seal existing overflow weirs when relining",
    "All joints in steel or aluminium liners must be continuously welded — exposed mechanical lap joints are not acceptable",
  ],
  standardsNotes: [
    "AS/NZS 3500.3 — Plumbing and Drainage — Stormwater Drainage — hydraulic sizing for box gutters and downpipes",
    "AS/NZS 2179 — Rainwater Goods — specifies dimensions and performance requirements for roof drainage products",
    "AS 1562 — Design and Installation of Sheet Roof and Wall Cladding — applicable to Colorbond roofing and gutter installation",
    "NCC / BCA — Building Code of Australia — stormwater drainage requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Corroded or perforated box gutter steel where through-corrosion has caused leakage",
    "Failed soldered, riveted or lap joints in existing box gutter — joint separation allowing water leakage",
    "Box gutters undersized for peak rainfall — inadequate overflow relief causing overflow to building interior",
    "Leaf and debris accumulation causing gutter blockage and overflow in strata apartment buildings",
  ],
  typicalSubstrates: [
    "Existing steel box gutter — prepared and treated before relining with new steel or aluminium liner",
    "Concrete or masonry box gutter structure — supporting steel or aluminium liner on mortar bed or brackets",
    "Timber fascia and roof framing — supporting gutter liner fixing brackets and overflow scupper framing",
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

export function BoxGutterIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are box gutter lining systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Box gutters are internal roof drainage channels formed within the building envelope — typically at the valley between two roof planes or at parapet walls in flat-roofed Class 2 strata apartment buildings. Unlike external fascia gutters, box gutters are structural elements that collect and channel large volumes of rainwater. They fail through corrosion of the steel lining, sediment build-up that accelerates corrosion and blocks outlets, joint failure at soldered or riveted laps, and undersizing for peak rainfall intensity. Box gutter overflow is a leading cause of internal water damage in strata apartment buildings and must be managed through both hydraulic design and appropriate lining materials.
        </p>
        <p>
          Relining a failed box gutter involves installing a new steel or aluminium liner within the existing gutter structure. The liner material is selected based on the exposure environment — Colorbond steel is widely used in standard inland environments, while extruded aluminium is preferred in coastal or aggressive atmospheric conditions. Before relining, existing falls must be confirmed as adequate — relining does not correct poor falls, and the new liner must be installed to the hydraulically designed gradient. All joints in the new liner must be continuously welded, not lapped and mechanically fixed — welded joints provide watertight continuity critical for box gutter service life in strata buildings. Overflow relief scuppers must be maintained at the correct height and must not be sealed when relining.
        </p>
        <p>
          Leaf guards are a complementary maintenance reduction system installed over box gutters to prevent leaf and coarse debris accumulation. Woven stainless steel mesh is the preferred material — it is durable, corrosion-resistant, and allows rainwater to pass through while deflecting leaves. Leaf guard systems reduce the frequency of gutter cleaning, which is a significant OHS and access cost for multi-storey strata buildings. Leaf guards do not increase gutter hydraulic capacity and do not eliminate maintenance — fine sediment will still accumulate over time.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Fascia gutters — external gutters fixed to eaves fascia boards, not internal box gutters — different hydraulic sizing, profiles and installation methods",
              "Waterproofing membranes — liquid or sheet membrane applied to internal surfaces, not metal lining sections — membranes are not a substitute for metal lining in box gutters",
              "Valley irons — roof valley drainage elements that direct water from the roof plane to the gutter — not a gutter lining product",
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

export function BoxGutterProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — box gutter lining and protection systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of box gutter lining and protection systems. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Gauge / mm</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Corrosion resistance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600">{row.gaugemm}</td>
                  <td className="px-4 py-3 text-slate-600">{row.corrosionResist}</td>
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
            <p className="mt-1 text-sm text-slate-500">Box gutter lining system equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>BlueScope</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Capral</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Leaf Stopper</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.bluescope, row.capral, row.leafstopper].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Hydraulic sizing before lining</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Box gutter cross-section must be confirmed against design rainfall intensity (AS/NZS 3500.3) before lining — do not proceed with relining until hydraulic adequacy of the proposed liner profile is confirmed by a hydraulic engineer or licensed plumber",
            "Overflow relief must be provided — do not seal existing overflow weirs when relining — overflow scuppers must be maintained at the correct height and clear opening to function in a blockage event",
            "All joints must be continuously welded or sealed — lap joints with exposed fixings are not acceptable for Class 2 strata box gutters — mechanical lap joints are a primary cause of re-failure",
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
