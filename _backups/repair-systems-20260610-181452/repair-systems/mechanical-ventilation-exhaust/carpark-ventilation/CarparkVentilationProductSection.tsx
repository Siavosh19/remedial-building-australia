"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Carpark"
  | "Ventilation"
  | "Centrifugal"
  | "Fan"
  | "CO-sensor"
  | "Controller"
  | "Basement"
  | "NCC-compliant"
  | "Industrial";

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
    fullLabel: "Fantech",
    brandUrl: "https://www.fantech.com.au",
    accentColor: "#ef4444",
    name: "Fantech Carpark Ventilation Fan and CO Sensor System",
    descriptionLine: "High-volume centrifugal fan system with CO sensor and controller for basement carpark ventilation — demand-controlled operation triggers fan on CO level, complies with AS 1668.2",
    productType: "Centrifugal carpark ventilation fan with integrated CO sensor and controller",
    filterTags: ["Carpark", "Ventilation", "Centrifugal", "Fan", "CO-sensor", "Controller", "Basement", "NCC-compliant", "Industrial"],
    techChips: [
      { label: "Centrifugal fan", cls: "bg-sky-100 text-sky-800" },
      { label: "CO sensor", cls: "bg-slate-100 text-slate-700" },
      { label: "Demand-controlled", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 1668.2", cls: "bg-amber-50 text-amber-700" },
      { label: "NCC-compliant", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Fantech carpark ventilation systems consist of a high-volume centrifugal fan paired with a carbon monoxide (CO) sensor and a controller for demand-controlled operation in enclosed basement carparks. The CO sensor continuously monitors CO concentration; when CO levels rise to the trigger setpoint (typically 25 ppm), the controller activates the fan to exhaust contaminated air and draw in fresh air. The fan continues to run until CO drops to a safe level (typically below 10–15 ppm), then switches off or reduces to a low-speed duty cycle. This demand-controlled approach satisfies AS 1668.2 requirements while reducing energy consumption compared to continuous fan operation.\n\nSystem sizing — fan capacity, ductwork layout, supply and exhaust grille positions, CO sensor count and placement — must be designed by a mechanical engineer for each carpark. Commissioning, CO sensor setpoint calibration, and handover testing are required before the system is operational. Annual maintenance of CO sensors is mandatory as sensor electrochemical cells have a service life of typically 3–5 years and must be replaced on schedule to maintain compliance.",
    technicalProperties: [
      "Centrifugal fan — high static pressure capability — suited to ducted carpark ventilation systems with bends and long duct runs",
      "Integrated CO sensor monitors carbon monoxide concentration — fan activates at user-set trigger setpoint (typically 25 ppm per AS 1668.2)",
      "Demand-controlled operation — fan runs only when CO exceeds setpoint — reduces energy consumption versus continuous operation",
      "Controller provides on/off fan control with adjustable CO setpoints — confirm available setpoint range with Fantech before specifying",
      "Suitable for enclosed and semi-enclosed basement carparks in Class 2 strata apartment buildings — AS 1668.2 compliant system",
    ],
    limitations: [
      "System must be designed by a mechanical engineer — fan sizing, duct layout, CO sensor placement and setpoints are not generic — each carpark requires a site-specific design",
      "CO sensor electrochemical cells have a limited service life (typically 3–5 years) — sensors must be replaced on schedule — expired sensors will not detect CO reliably",
      "Installation and commissioning must be carried out by a licensed mechanical contractor — system must be tested and commissioned before handover",
      "Fantech product range and model numbers change — confirm current product availability, specifications, and compliance with Fantech before specifying",
      "Confirm current product specification and compliance with Fantech before specifying",
    ],
    procurementSources: [
      { name: "Fantech Australia — trade supply — contact for current pricing and product selection", url: "https://www.fantech.com.au" },
      { name: "Mechanical services trade suppliers — contact Fantech distributor network", url: "https://www.fantech.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Carpark", label: "Carpark" },
  { id: "Ventilation", label: "Ventilation" },
  { id: "Centrifugal", label: "Centrifugal" },
  { id: "Fan", label: "Fan" },
  { id: "CO-sensor", label: "CO sensor" },
  { id: "Controller", label: "Controller" },
  { id: "Basement", label: "Basement" },
  { id: "NCC-compliant", label: "NCC-compliant" },
  { id: "Industrial", label: "Industrial" },
];

const BRAND_EQUIV: { system: string; fantech: string }[] = [
  { system: "Carpark ventilation fan + CO sensor", fantech: "Carpark Ventilation System" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; type: string; control: string; trigger: string; standard: string; primaryUse: string;
}[] = [
  {
    product: "Fantech Carpark Ventilation Fan and CO Sensor System",
    brand: "Fantech",
    type: "Centrifugal",
    control: "CO sensor + controller",
    trigger: "CO level (typically 25 ppm)",
    standard: "AS 1668.2",
    primaryUse: "Enclosed basement carpark — demand-controlled mechanical ventilation",
  },
];

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

export function CarparkVentilationIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are carpark ventilation systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Carpark ventilation systems are mechanical ventilation systems installed in enclosed and semi-enclosed basement carparks to manage carbon monoxide (CO) accumulation from vehicle exhaust. AS 1668.2 — The Use of Mechanical Ventilation and Air-Conditioning in Buildings — mandates mechanical ventilation for enclosed carparks in Australia. Without adequate ventilation, CO concentrations from vehicle exhaust can reach dangerous levels during peak usage periods, creating a life-safety hazard for occupants and building users. In Class 2 strata apartment buildings, basement carparks are commonly identified as deficient or non-compliant during OC inspections and building audits, requiring remediation or system upgrade.
        </p>
        <p>
          Modern carpark ventilation systems typically operate on a demand-controlled basis using a carbon monoxide (CO) sensor. The sensor monitors CO concentration continuously; when CO rises to the trigger setpoint (typically 25 ppm per AS 1668.2), the controller activates the ventilation fan to exhaust contaminated air and introduce fresh air. The fan runs until CO drops to a safe level (typically below 10–15 ppm), then switches off. This approach reduces energy consumption significantly compared to continuous fan operation and is the current best practice for new and upgraded carpark ventilation installations. CO sensor setpoints must be confirmed and calibrated by a mechanical engineer at commissioning.
        </p>
        <p>
          Carpark ventilation system design, including fan sizing, ductwork layout, CO sensor count, placement and setpoints, must be carried out by a mechanical engineer for each specific carpark. System commissioning and handover testing are required before the system is placed into service, and must be performed by a licensed mechanical contractor. Annual inspection and maintenance of CO sensors is required throughout the system life — electrochemical CO sensor cells typically have a service life of 3–5 years and must be replaced on schedule to maintain reliable CO detection and NCC compliance.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Residential exhaust fans — bathroom and kitchen exhaust fans (NCC Part F4 / AS 1668.2 domestic) — not designed for carpark CO management",
              "Subfloor ventilation — domestic underfloor ventilation for moisture control — not a carpark ventilation system",
              "Fire stair pressurisation — smoke control system for fire egress — a separate system from carpark ventilation, with different standards and commissioning requirements",
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

export function CarparkVentilationProductSection() {
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
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={[
                "Enclosed basement carparks in Class 2 strata apartment buildings requiring AS 1668.2 compliance",
                "Existing carparks with continuous fan operation requiring upgrade to demand-controlled CO sensor systems",
                "New carpark construction requiring mechanical ventilation system design and installation",
                "Carparks with expired or non-functional CO sensors requiring sensor replacement and recommissioning",
                "Carpark ventilation systems identified as deficient in OC building audits and remediation scopes",
              ]} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={[
                "Fan type and capacity must be selected by a mechanical engineer based on carpark volume, air change rate requirements (AS 1668.2), and duct layout",
                "CO sensor count and placement must be engineered — one sensor per zone minimum, placed at vehicle exhaust height in traffic paths",
                "Confirm CO trigger and reset setpoints with mechanical engineer — AS 1668.2 typically requires fan activation at 25 ppm",
                "Demand-controlled systems are preferred for energy efficiency — confirm controller features with Fantech before specifying",
                "System must be commissioned by a licensed contractor with setpoint calibration confirmed by the mechanical engineer",
              ]} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={[
                "System sizing is site-specific — do not use generic fan sizing without engineering sign-off",
                "CO sensors have a limited service life — electrochemical cells must be replaced every 3–5 years",
                "Demand-controlled systems cannot compensate for inadequate supply air — supply and exhaust must both be engineered",
                "Fan noise and vibration must be considered in duct design for residential buildings — acoustic lining may be required",
                "System will not function as designed if CO sensor cells expire or are not calibrated — annual maintenance is mandatory",
              ]} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={[
                "AS 1668.2 — The Use of Mechanical Ventilation and Air-Conditioning in Buildings — carpark ventilation requirements",
                "NCC (National Construction Code) — Volume One — Part F4 — mechanical ventilation for Class 2–9 buildings",
                "AS/NZS 60079 — referenced for CO sensor equipment in hazardous atmosphere classification where applicable",
                "Commissioning must include CO injection test (or equivalent) to verify sensor response and fan activation at design setpoints",
              ]} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={[
                "Absent or non-functional carpark ventilation system in enclosed basement carpark — NCC non-compliance",
                "Continuous-run fan systems requiring upgrade to demand-controlled CO sensor operation for energy compliance",
                "Failed or expired CO sensors — fan not activating on CO rise — safety and compliance risk",
                "Inadequate air change rate — CO levels exceeding safe limits during peak usage — engineering upgrade required",
              ]} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates / Locations" items={[
                "Enclosed basement carparks — Class 2 strata apartment buildings — single and multi-level",
                "Semi-enclosed podium carparks requiring supplemental mechanical ventilation",
                "Commercial carparks within mixed-use Class 2 buildings requiring AS 1668.2 compliance",
                "Existing carparks with legacy continuous-run fan systems being upgraded to demand-controlled operation",
              ]} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">1 product — 1 brand — carpark ventilation systems</p>
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
            <p className="mt-1 text-sm text-slate-500">Technical comparison of carpark ventilation products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Control</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Trigger</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.control}</td>
                  <td className="px-4 py-3 text-slate-600">{row.trigger}</td>
                  <td className="px-4 py-3 text-slate-600">{row.standard}</td>
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
            <p className="mt-1 text-sm text-slate-500">Carpark ventilation system equivalents for Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Fantech</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  <td className="px-4 py-3 text-slate-600">{row.fantech === "—" ? <span className="text-slate-300">—</span> : row.fantech}</td>
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
          <h3 className="text-base font-extrabold text-amber-900">Engineering and compliance requirements</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Carpark ventilation must be designed by a mechanical engineer — system sizing, fan selection, CO sensor placement and setpoints all require engineering — do not size or specify without engineering sign-off",
            "CO sensor setpoints must comply with AS 1668.2 — typically fan activates at 25 ppm and runs until CO drops to a safe level — setpoints must be confirmed and calibrated at commissioning by the mechanical engineer",
            "System must be commissioned and tested by a licensed contractor before handover — commissioning includes verification of CO sensor response, fan activation, and air change rate under design conditions",
            "Annual inspection and maintenance of CO sensors is required — sensors have a service life of typically 3–5 years and must be replaced on schedule — expired sensors will not reliably detect CO and will not trigger fan operation",
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
