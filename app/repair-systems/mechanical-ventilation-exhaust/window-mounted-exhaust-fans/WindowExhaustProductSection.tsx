"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Window-fan"
  | "Window-mounted"
  | "Axial"
  | "Exhaust-fan"
  | "150mm"
  | "Square-frame"
  | "Backdraft-shutter";

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
    fullLabel: "Manrose",
    brandUrl: "https://www.manrose.com.au",
    accentColor: "#ef4444",
    name: "Manrose WF150 Window Exhaust Fan",
    descriptionLine: "150mm square-frame window-mounted axial exhaust fan for direct window glass installation — requires circular hole cut in glass, integral backdraft shutter, suitable for bathrooms and toilets",
    productType: "150mm square window-mounted axial exhaust fan",
    filterTags: ["Window-fan", "Window-mounted", "Axial", "Exhaust-fan", "150mm", "Square-frame", "Backdraft-shutter"],
    techChips: [
      { label: "Window-mounted axial fan", cls: "bg-sky-100 text-sky-800" },
      { label: "150mm diameter", cls: "bg-slate-100 text-slate-700" },
      { label: "Square frame", cls: "bg-slate-100 text-slate-700" },
      { label: "Backdraft shutter", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1668.2", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Manrose WF150 is a 150mm square-frame axial exhaust fan designed for direct installation into window glass. The fan discharges exhaust air directly through the glass pane to the exterior, making it suitable for bathrooms and toilets in buildings where ceiling void access or wall cavities for ductwork are unavailable. Installation requires a circular 150mm hole to be cut in the window glass by a qualified glazier prior to fan installation. The integral backdraft shutter closes automatically when the fan is not running, preventing cold air and insects from entering through the glass opening.\n\nWindow-mounted exhaust fans provide a simple direct-exhaust solution where no ductwork infrastructure exists. Airflow performance is limited compared to inline ducted systems and is subject to the resistance of the backdraft shutter and external wind conditions. Fan selection must be confirmed against room volume and the minimum airflow requirements of AS 1668.2 for the specific wet area application.",
    technicalProperties: [
      "150mm axial impeller — direct window glass installation — no ductwork required",
      "Square external frame suits standard window rebates — circular 150mm glass hole required — glazier preparation mandatory before installation",
      "Integral backdraft shutter — closes automatically when fan stops — prevents reverse airflow, cold draughts and insect entry",
      "Suitable for bathrooms, toilets and small utility rooms with direct exterior window glass",
      "Confirm current airflow (m³/hr) rating, noise level (dBA) and electrical specification against the current Manrose WF150 technical data sheet",
    ],
    limitations: [
      "Requires circular hole drilled in existing window glass — this is a specialist glazier operation, not a general trade task",
      "Toughened (tempered) safety glass cannot be cut or drilled after manufacture — if existing glass is toughened, the entire window pane must be replaced with pre-drilled annealed or laminated glass",
      "Not suitable for rooms requiring high airflow rates — window fans have lower performance than inline ducted systems — confirm adequacy against AS 1668.2 for room volume",
      "External wind pressure can reduce effective airflow — exposed elevations may require windproof fan design — confirm with Manrose technical",
      "Confirm current product specification and compliance with Manrose before specifying",
    ],
    procurementSources: [
      { name: "Manrose Australia — trade supply — contact for current pricing", url: "https://www.manrose.com.au" },
      { name: "Electrical trade suppliers nationally — confirm current stock", url: "https://www.manrose.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Window-fan", label: "Window-fan" },
  { id: "Window-mounted", label: "Window-mounted" },
  { id: "Axial", label: "Axial" },
  { id: "Exhaust-fan", label: "Exhaust-fan" },
  { id: "150mm", label: "150mm" },
  { id: "Square-frame", label: "Square-frame" },
  { id: "Backdraft-shutter", label: "Backdraft-shutter" },
];

const BRAND_EQUIV: { system: string; manrose: string }[] = [
  { system: "Window-mounted exhaust fan (150mm)", manrose: "WF150 Window Fan" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  diameterMm: string;
  mounting: string;
  glassHoleRequired: string;
  primaryUse: string;
}[] = [
  {
    product: "WF150 Window Fan",
    brand: "Manrose",
    type: "Axial",
    diameterMm: "150",
    mounting: "Window glass",
    glassHoleRequired: "Yes — 150mm circular",
    primaryUse: "Bathroom / toilet direct window exhaust",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Bathroom exhaust in apartments where no ceiling void access exists for ductwork",
    "Toilet exhaust through window glass in strata units without wall cavity access",
    "Replacement of failed or obsolete window exhaust fans in existing glass apertures",
    "Direct glass exhaust in small utility rooms adjacent to an exterior window",
    "Class 2 strata buildings where ducted inline fan systems cannot be practically installed",
  ],
  selectionCriteria: [
    "Confirm window glass type before specifying — annealed and laminated glass can be drilled; toughened glass cannot",
    "Confirm fan airflow (m³/hr) meets AS 1668.2 minimum exhaust rates for the specific room volume and use",
    "Select fan diameter matched to the existing or proposed glass aperture — 150mm is the standard for bathrooms and toilets",
    "Confirm frame dimensions suit the window rebate and glass thickness — Manrose WF150 suits standard glass thicknesses",
    "Confirm electrical supply and switching requirements with a licensed electrician before specifying",
  ],
  limitations: [
    "Window glass must be drilled before installation — this is a specialist glazier task, not a standard trade operation",
    "Toughened glass cannot be cut after manufacture — replacement of the glass pane required if existing glass is toughened",
    "Airflow capacity lower than inline ducted fan systems — confirm adequacy for room volume per AS 1668.2",
    "Fan performance affected by external wind pressure on exposed elevations — confirm suitability with manufacturer",
    "Not suitable as a replacement for ducted mechanical exhaust systems in high airflow demand applications",
  ],
  standardsNotes: [
    "AS 1668.2 — The Use of Ventilation and Air Conditioning in Buildings — Ventilation Design for Indoor Air Contaminant Control — minimum exhaust airflow rates for wet areas",
    "NCC Section J / Part F6 — mechanical ventilation requirements for wet areas in Class 2 buildings",
    "AS/NZS 3000 — Wiring Rules — electrical installation requirements for exhaust fan circuits",
    "Glazing work must comply with the relevant Australian glazing standard — confirm with glazier and building surveyor",
  ],
  suitableDefects: [
    "Failed or seized window exhaust fan requiring like-for-like replacement through existing glass aperture",
    "Inadequate natural ventilation in bathrooms or toilets requiring powered exhaust fan installation",
    "Mould growth in bathrooms due to inadequate mechanical exhaust — window fan installation as remedial measure",
    "Obsolete or non-compliant exhaust fan requiring replacement with AS 1668.2 compliant unit",
  ],
  typicalSubstrates: [
    "Annealed window glass — can be drilled by a qualified glazier with appropriate core drill bit",
    "Laminated safety glass — can be drilled by a qualified glazier — confirm glass interlayer type",
    "Toughened (tempered) glass — cannot be drilled — full pane replacement required with pre-drilled glass",
    "Window frame — fan frame fixed to glass aperture — frame contact confirmed against Manrose installation instructions",
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

export function WindowExhaustIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are window-mounted exhaust fan systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Window-mounted exhaust fans are axial fans installed directly into window glass to provide powered mechanical exhaust from bathrooms and toilets in buildings where no ceiling void access or wall cavities for ductwork are available. The fan is fitted through a circular hole cut in the window pane and discharges exhaust air directly to the exterior without any ductwork. This makes them a practical option in Class 2 strata apartments where the existing building construction does not permit ducted inline fan installation.
        </p>
        <p>
          Installation requires a qualified glazier to drill or core-cut a circular aperture in the window glass before the fan is fitted. The fan frame is fixed into this aperture and secured against the glass. An integral backdraft shutter closes automatically when the fan is not operating, preventing cold air, wind and insects from entering through the glass opening. The window frame and glass thickness must be confirmed as compatible with the selected fan model before specifying.
        </p>
        <p>
          Window exhaust fans provide lower airflow performance than inline ducted fan systems. They are limited to bathrooms and toilets in rooms immediately adjacent to an exterior window and are not suitable where high exhaust rates are required. Airflow adequacy must be confirmed against AS 1668.2 minimum exhaust requirements for the specific room volume and use. Where a room does not have direct exterior window access, or where airflow requirements cannot be met, an inline ducted system must be considered instead.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Louvre windows — natural ventilation only — not powered exhaust — do not satisfy AS 1668.2 mechanical exhaust requirements",
              "Wall exhaust fans — mounted through masonry or framed wall, not through window glass — different installation process and substrate",
              "Inline duct fans — ceiling or duct-mounted, not window glass installation — suited to rooms without direct exterior window access",
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

export function WindowExhaustProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">1 product — 1 brand — window-mounted exhaust fan systems</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view
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
            <p className="mt-1 text-sm text-slate-500">Technical comparison of window-mounted exhaust fan products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Diameter (mm)</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Mounting</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Glass hole required</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.diameterMm}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mounting}</td>
                  <td className="px-4 py-3 text-slate-600">{row.glassHoleRequired}</td>
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
            <p className="mt-1 text-sm text-slate-500">Window exhaust fan equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Manrose</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  <td className="px-4 py-3 text-slate-600">{row.manrose === "—" ? <span className="text-slate-300">—</span> : row.manrose}</td>
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
          <h3 className="text-base font-extrabold text-amber-900">Glass drilling and airflow compliance</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Window glass must be drilled by a glazier before fan installation — drilling existing glass is a specialist operation, not a trade task",
            "Toughened safety glass cannot be cut or drilled after manufacture — window must be replaced with pre-drilled glass if toughened",
            "Airflow from window exhaust must comply with AS 1668.2 — confirm adequacy with mechanical engineer for the specific room volume",
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
