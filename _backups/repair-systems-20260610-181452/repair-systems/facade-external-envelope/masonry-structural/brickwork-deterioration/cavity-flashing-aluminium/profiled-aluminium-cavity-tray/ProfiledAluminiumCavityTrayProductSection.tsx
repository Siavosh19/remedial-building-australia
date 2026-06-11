"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Keystone"
  | "Extrude-a-Trim"
  | "Capral"
  | "Lintel-seated"
  | "Custom-extrusion"
  | "Standard-sections"
  | "Integral-weep"
  | "Non-standard-cavity"
  | "Ex-stock"
  | "AS-3700"
  | "National";

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
    fullLabel: "Keystone Lintels",
    brandUrl: "https://www.keystonelintels.com.au",
    accentColor: "#0369a1",
    name: "Keystone Aluminium Cavity Tray Profile",
    descriptionLine: "Extruded aluminium cavity tray profiles designed to sit directly on Keystone steel lintels — integral upstand, drip edge, and weep slot geometry — standard 50mm and 75mm cavity widths",
    productType: "Extruded aluminium cavity tray — lintel-seated profile",
    filterTags: ["Keystone", "Lintel-seated", "Integral-weep", "AS-3700", "National"],
    techChips: [
      { label: "6063-T5 alloy", cls: "bg-sky-100 text-sky-800" },
      { label: "50mm / 75mm standard", cls: "bg-slate-100 text-slate-700" },
      { label: "Integral weep slots 450mm", cls: "bg-slate-100 text-slate-700" },
      { label: "1.6mm wall", cls: "bg-green-50 text-green-700" },
      { label: "3.0m lengths", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Keystone's cavity tray profile is designed to coordinate with Keystone duplex-coated and galvanised steel lintels — the tray seats on the lintel top flange and provides an integral upstand, weep slots at 450mm centres, and a formed drip edge. Eliminates the need to site-fabricate weep formers from flat strip, ensuring consistent drainage geometry and reducing site installation error. Available in mill finish and powder coat finish. Suitable for standard 50mm and 75mm cavity masonry at residential and Class 2 strata building remediation. Confirm current profile dimensions, powder coat availability, and pricing with Keystone Lintels before specifying.",
    technicalProperties: [
      "Alloy: 6063-T5 extruded aluminium",
      "Wall thickness: 1.6mm",
      "Standard cavity widths: 50mm and 75mm — non-standard requires custom extrusion",
      "Weep slots: integral at 450mm centres — no site weep former fabrication required",
      "Upstand height: 75mm",
      "Drip edge: formed integral with profile",
      "Finish: mill finish standard — powder coat available on request",
      "Length: 3.0m standard",
    ],
    limitations: [
      "Profile dimensions matched to Keystone lintel top flange — may require adaptation for other lintel brands",
      "Non-standard cavity widths require custom extrusion — confirm with Keystone before ordering",
      "Powder coat option has longer lead time — confirm with Keystone before scheduling installation",
    ],
    procurementSources: [
      { name: "Keystone Lintels — national branches", url: "https://www.keystonelintels.com.au" },
      { name: "Masonry product distributors nationally — confirm local Keystone availability", url: "https://www.keystonelintels.com.au" },
    ],
  },
  {
    fullLabel: "Extrude-a-Trim",
    brandUrl: "https://www.extrudeatrim.com.au",
    accentColor: "#b45309",
    name: "Extrude-a-Trim Custom Aluminium Cavity Tray",
    descriptionLine: "Custom extruded aluminium cavity tray profiles for standard and non-standard cavity widths — manufactured to specification with integral upstand and drainage outlet geometry",
    productType: "Custom extruded aluminium cavity tray — made to specification",
    filterTags: ["Extrude-a-Trim", "Custom-extrusion", "Non-standard-cavity", "Integral-weep", "AS-3700"],
    techChips: [
      { label: "6063-T5 alloy", cls: "bg-amber-100 text-amber-800" },
      { label: "Custom cavity widths", cls: "bg-slate-100 text-slate-700" },
      { label: "Integral drainage", cls: "bg-slate-100 text-slate-700" },
      { label: "Made to specification", cls: "bg-green-50 text-green-700" },
      { label: "2–4 week lead time", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Extrude-a-Trim specialises in custom aluminium extrusions for building applications including cavity flashings. Cavity tray profiles can be manufactured to specific cavity widths, upstand heights, and drainage outlet configurations. Suited to remedial projects with non-standard or variable cavity dimensions where purpose-designed geometry is required. Minimum order quantities apply — confirm at enquiry. Dimensional confirmation from site survey is required before ordering. Lead time typically 2–4 weeks from drawing approval.",
    technicalProperties: [
      "Alloy: 6063-T5 extruded aluminium",
      "Wall thickness: as specified — 1.2–2.0mm standard range",
      "Cavity widths: custom — any width to specification — no standard limits",
      "Weep outlets: specified at design — confirm spacing and geometry with project engineer",
      "Upstand height: specified at design — confirm minimum height per AS 3700 with engineer",
      "Finish: mill finish, anodised, or powder coat available",
      "Lead time: 2–4 weeks for custom extrusion — minimum order quantities apply",
      "Supply form: made to order — site survey and dimensional confirmation required",
    ],
    limitations: [
      "Custom extrusion — minimum order quantities and lead time apply — not suitable for urgent or small-quantity projects without pre-planning",
      "Profile design requires dimensional confirmation from site survey before ordering",
      "Higher unit cost than standard profiles — justified where non-standard cavity widths rule out catalogue products",
    ],
    procurementSources: [
      { name: "Extrude-a-Trim — direct enquiry for custom cavity tray extrusions", url: "https://www.extrudeatrim.com.au" },
    ],
  },
  {
    fullLabel: "Capral Aluminium",
    brandUrl: "https://www.capral.com.au",
    accentColor: "#7c3aed",
    name: "Capral Standard Extrusion Profiles (Adapted for Cavity Tray)",
    descriptionLine: "Standard extruded aluminium profiles from Capral's library — angle, Z-section, and channel profiles adaptable for cavity tray use — ex-stock nationally",
    productType: "Standard extruded aluminium sections — adapted for cavity tray",
    filterTags: ["Capral", "Standard-sections", "Ex-stock", "AS-3700", "National"],
    techChips: [
      { label: "6063-T5 / 6061-T6", cls: "bg-violet-100 text-violet-800" },
      { label: "Standard sections", cls: "bg-slate-100 text-slate-700" },
      { label: "National ex-stock", cls: "bg-slate-100 text-slate-700" },
      { label: "Cut to length", cls: "bg-green-50 text-green-700" },
      { label: "Engineer input required", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Capral's standard extrusion library includes angle, Z-section, and channel profiles that are frequently adapted for cavity tray applications on remedial projects where custom extrusion lead time is not acceptable. Profile selection requires design input from the project engineer or remedial practitioner to ensure adequate upstand height, weep drainage, and lap geometry. Weep slots must be site-formed or drilled — no integral weep geometry in standard sections. Ex-stock nationally from Capral branches — most economical option where urgent supply is required.",
    technicalProperties: [
      "Alloy: 6063-T5 / 6061-T6 standard extrusion alloys",
      "Thickness: varies by section — confirm wall thickness with Capral for selected profile",
      "Standard sections: angle, Z-section, channel, flat — adapted for cavity tray by project engineer",
      "Lengths: 3.0m and 6.0m standard — cut to length available at branches",
      "Finish: mill finish standard — powder coat available on request (lead time applies)",
      "Distribution: national — Capral branches ex-stock for standard sections",
      "Lead time: ex-stock for standard sections — powder coat and custom profiles on request",
      "Weep drainage: site-formed or drilled — no integral weep geometry in standard sections",
    ],
    limitations: [
      "Standard sections are not purpose-designed for cavity tray use — require engineer design input to confirm suitability for each application",
      "Weep slots and drainage geometry must be formed or drilled on site — adds labour cost and risk of inconsistent spacing",
      "No purpose-designed cavity tray product — adaptation must be verified by project engineer before installation",
    ],
    procurementSources: [
      { name: "Capral Aluminium branches — national ex-stock supply of standard sections", url: "https://www.capral.com.au" },
      { name: "Aluminium distributors — confirm standard section availability locally", url: "https://www.capral.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Keystone", label: "Keystone" },
  { id: "Extrude-a-Trim", label: "Extrude-a-Trim" },
  { id: "Capral", label: "Capral" },
  { id: "Lintel-seated", label: "Lintel-seated" },
  { id: "Custom-extrusion", label: "Custom extrusion" },
  { id: "Standard-sections", label: "Standard sections" },
  { id: "Integral-weep", label: "Integral weep" },
  { id: "Non-standard-cavity", label: "Non-standard cavity" },
  { id: "Ex-stock", label: "Ex-stock" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "National", label: "National supply" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  alloy: string;
  cavityWidths: string;
  weepGeometry: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Keystone Lintels",
    product: "Keystone Cavity Tray",
    alloy: "6063-T5",
    cavityWidths: "50mm, 75mm standard",
    weepGeometry: "Integral slots at 450mm",
    distribution: "National — Keystone branches",
    keyFeature: "Designed for Keystone lintel system",
    primaryUse: "Over Keystone lintels — new and remedial masonry",
  },
  {
    supplier: "Extrude-a-Trim",
    product: "Custom Cavity Tray",
    alloy: "6063-T5",
    cavityWidths: "Any — custom extrusion",
    weepGeometry: "Specified at design",
    distribution: "Direct — made to order",
    keyFeature: "Non-standard cavity widths to specification",
    primaryUse: "Non-standard or complex cavity geometries",
  },
  {
    supplier: "Capral",
    product: "Standard Sections (adapted)",
    alloy: "6063-T5 / 6061-T6",
    cavityWidths: "Design-dependent",
    weepGeometry: "Site-formed / drilled",
    distribution: "National — Capral ex-stock",
    keyFeature: "Immediate availability — ex-stock",
    primaryUse: "Urgent remedial — engineer adaptation required",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Cavity tray installation at base of cavity, over lintels, and at parapet level where a rigid pre-formed profile replaces flat strip flashing",
    "Over steel lintels at masonry openings where integral weep slots eliminate need for site-formed weep formers",
    "Window sill junctions and spandrel panels where formed upstand height must coordinate with cavity dimensions",
    "Remedial flashing replacement at locations where flat strip flashing was incorrectly installed or lacked adequate weep provision",
  ],
  selectionCriteria: [
    "Select profile to suit cavity width — confirm standard 50mm or 75mm profile, or order custom extrusion for non-standard widths",
    "Confirm integral weep slot spacing at maximum 600mm centres per AS 3700 — purpose-designed profiles reduce site fabrication error",
    "Confirm compatibility with lintel top flange profile before ordering — Keystone profiles are designed for Keystone lintels",
    "Engineer sign-off required for structural applications — anodised or powder coat finish required for exposed elements",
  ],
  limitations: [
    "Factory profiles are manufactured to standard cavity widths — non-standard dimensions require custom extrusion or site adaptation",
    "Profiles cannot be easily raked or stepped on site to the same degree as flat strip flashing",
    "Cost premium over plain flat strip — justified by installation consistency and reduced site fabrication error",
    "Lead time applies to custom extrusion and powder coat finishes — plan procurement well in advance",
  ],
  standardsNotes: [
    "AS 3700 Masonry Structures — flashing installation, lap, and weep former requirements — maximum 600mm centres",
    "AS/NZS 1734 — aluminium alloys — extruded profile alloy typically 6063-T5",
    "Confirm engineer specification for lintel-seated cavity tray profiles in all structural masonry applications",
  ],
  suitableDefects: [
    "Absent or failed cavity flashing at lintel zone, base of cavity, and parapet where flat strip was incorrectly installed or lacked adequate weep provision",
    "Corroded or blocked weep formers at masonry openings — replaced with purpose-designed integral weep tray profile",
    "Moisture ingress at masonry openings identified by efflorescence, staining, or damp penetration at lintel level",
  ],
  typicalSubstrates: [
    "Clay brick masonry cavity walls — most common application for profiled cavity tray in Class 2 strata buildings",
    "Calcium silicate brick and concrete masonry — confirm tray profile suits blockwork course and lintel geometry",
    "Standard cavity widths 50–75mm — confirm non-standard widths with supplier before ordering",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
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
              {src.url && src.url !== "#" ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
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
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
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

export function ProfiledAluminiumCavityTrayIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are profiled aluminium cavity tray systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Profiled aluminium cavity tray systems are factory-formed extruded aluminium profiles used at base of cavity, over lintels, at parapet level, and at window sill junctions — replacing flat strip flashing with a rigid, purpose-designed profile incorporating integral upstand, drip edge, and weep drainage geometry.
        </p>
        {expanded && (
          <>
            <p>
              Unlike flat strip flashing which must be site-formed with brake press or folder to achieve correct drip edge, upstand height, and weep former geometry, profiled cavity tray profiles deliver consistent cross-section geometry on every length. This reduces site fabrication error and sealant dependence — common failure causes in flat strip installations. Weep slots at 450mm or 600mm centres are formed integral with the profile, eliminating the need for separate site-formed weep formers.
            </p>
            <p>
              For Australian Class 2 strata building remediation, profiled cavity tray systems are increasingly specified over flat strip flashing at lintel and parapet locations where installation quality consistency is critical. Keystone Lintels supplies a purpose-designed profile for use with their lintel range; Extrude-a-Trim offers custom extrusions for non-standard cavity widths; Capral standard sections can be adapted where urgent ex-stock supply is required.
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

export function ProfiledAluminiumCavityTrayProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 suppliers — profiled aluminium cavity tray systems — scroll to view all</p>
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

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of profiled aluminium cavity tray systems. Confirm all product selections with current supplier TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Alloy</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cavity widths</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Weep geometry</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.alloy}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cavityWidths}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.weepGeometry}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyFeature}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
