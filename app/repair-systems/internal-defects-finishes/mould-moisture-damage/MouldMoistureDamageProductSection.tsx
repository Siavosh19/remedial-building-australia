"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Biocide"
  | "Mould-treatment"
  | "Wash"
  | "Anti-mould"
  | "Primer"
  | "Paint"
  | "Mould-resistant"
  | "Water-based"
  | "Interior"
  | "Ceiling"
  | "Wall";

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
    fullLabel: "Selleys",
    brandUrl: "https://www.selleys.com.au",
    accentColor: "#ef4444",
    name: "Selleys Sugar Soap Mould Killer",
    descriptionLine:
      "Concentrated biocide wash for mould, mildew and algae removal from internal walls and ceilings before repainting — kills spores and prepares surface for paint",
    productType: "Concentrated biocide cleaning solution for mould removal",
    filterTags: ["Biocide", "Mould-treatment", "Wash", "Anti-mould", "Interior"],
    techChips: [
      { label: "Biocide wash", cls: "bg-sky-100 text-sky-800" },
      { label: "Concentrated solution", cls: "bg-slate-100 text-slate-700" },
      { label: "Mould & mildew kill", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-paint preparation", cls: "bg-amber-50 text-amber-700" },
      { label: "Interior", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Selleys Sugar Soap Mould Killer is a concentrated biocide cleaning solution for removing mould, mildew and algae from internal walls and ceilings prior to repainting. Applied by dilution with water per the label rate, then washed onto affected surfaces, allowed to dwell and rinsed. Kills active mould spores and breaks down the mould colony at the surface, preparing the substrate for primer and topcoat application.\n\nThe source of moisture causing mould growth must be identified and rectified before applying any biocide treatment — surface washing does not address underlying water ingress, condensation or plumbing leaks. Confirm current dilution rate and dwell time with the current Selleys product label before use.",
    technicalProperties: [
      "Concentrated biocide — dilute per label rate — cost-effective treatment for affected areas",
      "Kills mould, mildew and algae spores at the surface — prepares substrate for repainting",
      "Water-based formulation — suitable for internal use with adequate ventilation",
      "Widely available through Bunnings and trade paint suppliers nationally",
      "Compatible with standard interior paint preparation sequence — wash, dry, prime, topcoat",
    ],
    limitations: [
      "Surface treatment only — does not address the source of moisture — moisture source must be rectified before treatment",
      "Deeply penetrated mould in plasterboard (greater than 3mm) requires full plasterboard replacement — surface washing is not sufficient",
      "PPE required — respiratory protection, gloves and eye protection mandatory during application",
      "Confirm dilution rate and dwell time against the current Selleys product label — formulation may change",
      "Not a substitute for professional mould remediation assessment for large or widespread mould infestations",
    ],
    procurementSources: [
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Selleys Australia — trade supply", url: "https://www.selleys.com.au" },
      { name: "Dulux trade stores — nationally", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Dulux",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#3b82f6",
    name: "Dulux Weathershield Mould & Mildew Resistant Paint",
    descriptionLine:
      "Premium interior water-based paint with built-in active mould inhibitor for ceilings and walls in high-humidity and mould-prone environments",
    productType: "Premium interior paint with active mould inhibitor",
    filterTags: ["Paint", "Mould-resistant", "Water-based", "Interior", "Ceiling", "Wall"],
    techChips: [
      { label: "Mould-resistant paint", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Active inhibitor", cls: "bg-green-50 text-green-700" },
      { label: "Interior — ceiling & wall", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 1580", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dulux Weathershield Mould & Mildew Resistant Paint is a premium water-based interior paint formulated with a built-in active mould inhibitor. Designed for application to ceilings and walls in high-humidity environments including bathrooms, laundries and mould-prone internal areas in Class 2 strata apartment buildings. The active inhibitor suppresses mould re-growth on the painted film surface after remediation.\n\nApply over a suitable mould-resistant or alkali-resistant primer following biocide washing and surface preparation. The active inhibitor in the paint film does not compensate for ongoing moisture — the source of moisture must be rectified before repainting. Confirm current product name and formulation with Dulux Australia as product names are subject to periodic revision.",
    technicalProperties: [
      "Built-in active mould inhibitor — suppresses mould re-growth on the paint film in high-humidity environments",
      "Water-based formulation — low VOC — suitable for internal use with standard ventilation",
      "Premium interior paint — washable, durable film — suitable for ceilings and walls",
      "Available in a wide colour range through the Dulux colour system",
      "Compatible with standard Dulux primer systems — confirm primer selection with Dulux technical for substrate type",
    ],
    limitations: [
      "Active inhibitor in the paint film does not address the source of moisture — water ingress or condensation must be resolved before repainting",
      "Not suitable as a standalone waterproofing system — mould-resistant paint is a surface coating only",
      "Mould resistance of the film will reduce over time — regular cleaning and maintenance required in high-humidity areas",
      "Apply over a compatible primer — do not apply directly to bare plasterboard or contaminated surfaces without priming",
      "Confirm current product specification and compliance with Dulux Australia before specifying",
    ],
    procurementSources: [
      { name: "Dulux trade stores — nationally", url: "https://www.dulux.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — in-store nationally", url: "https://www.mitre10.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Biocide", label: "Biocide" },
  { id: "Mould-treatment", label: "Mould-treatment" },
  { id: "Wash", label: "Wash" },
  { id: "Anti-mould", label: "Anti-mould" },
  { id: "Primer", label: "Primer" },
  { id: "Paint", label: "Paint" },
  { id: "Mould-resistant", label: "Mould-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Interior", label: "Interior" },
  { id: "Ceiling", label: "Ceiling" },
  { id: "Wall", label: "Wall" },
];

const BRAND_EQUIV: { system: string; selleys: string; dulux: string }[] = [
  { system: "Biocide wash (mould removal)", selleys: "Sugar Soap Mould Killer", dulux: "—" },
  { system: "Mould-resistant interior paint", selleys: "—", dulux: "Mould & Mildew Resistant" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  mouldKill: string;
  paintable: string;
  substrate: string;
  primaryUse: string;
}[] = [
  {
    product: "Selleys Sugar Soap Mould Killer",
    brand: "Selleys",
    type: "Biocide wash",
    mouldKill: "Yes — kills active spores",
    paintable: "N/A — preparation product",
    substrate: "Plasterboard, paint, masonry",
    primaryUse: "Pre-paint biocide wash — mould removal from walls and ceilings",
  },
  {
    product: "Dulux Mould & Mildew Resistant",
    brand: "Dulux",
    type: "Interior paint",
    mouldKill: "Inhibits re-growth on film",
    paintable: "Yes — is the topcoat",
    substrate: "Primed plasterboard, masonry",
    primaryUse: "Mould-resistant topcoat for high-humidity internal areas",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Mould remediation to internal walls and ceilings in Class 2 strata apartment bathrooms and laundries",
    "Repainting following mould removal in kitchens, bathrooms and high-humidity corridors",
    "Treatment of surface mould caused by condensation on cold surfaces in poorly ventilated apartments",
    "Post-leak remediation repainting following plumbing repairs and drying of internal surfaces",
    "Preventative mould-resistant repainting in common areas or apartments with history of mould issues",
  ],
  selectionCriteria: [
    "Always identify and rectify the source of moisture before applying biocide or mould-resistant paint",
    "Use biocide wash as the first step — treat active mould before priming or painting",
    "Select mould-resistant paint for high-humidity areas — do not substitute standard interior paint where mould resistance is required",
    "Confirm plasterboard is not deeply penetrated by mould before surface treatment — check for soft or discoloured board behind surface mould",
    "Engage a mould remediation specialist for widespread or recurring mould in multiple apartments",
  ],
  limitations: [
    "Surface treatment does not address underlying moisture — mould will recur if the source is not rectified",
    "Plasterboard penetrated more than 3mm by mould requires replacement — surface washing alone is not sufficient",
    "Active inhibitor in mould-resistant paint reduces over time — not a permanent solution without moisture control",
    "PPE is mandatory during biocide washing — respiratory protection, gloves and eye protection required",
    "Mould-resistant paint is not a waterproofing membrane — do not use in lieu of waterproofing in wet areas",
  ],
  standardsNotes: [
    "AS/NZS 1580 — Methods of Test for Paints and Related Materials — referenced for interior paint performance assessment",
    "BCA/NCC — building code requirements for ventilation in wet areas — inadequate ventilation is a primary cause of condensation mould",
    "Manufacturer TDS to be confirmed for current product dilution rates, primer compatibility and application conditions",
    "Mould remediation standards — refer to specialist mould remediation guidance for large infestations in strata buildings",
  ],
  suitableDefects: [
    "Surface mould on internal walls and ceilings caused by condensation, water ingress or inadequate ventilation",
    "Mould growth following plumbing leaks or ceiling water damage in Class 2 strata apartments",
    "Recurring mould in bathrooms, laundries and kitchens in apartments with poor ventilation",
    "Black or green mould staining on painted plasterboard in common areas or occupied apartments",
  ],
  typicalSubstrates: [
    "Painted plasterboard — most common internal substrate in Class 2 strata apartments",
    "Unpainted or bare plasterboard — must be primed before topcoat application",
    "Masonry walls — confirm primer compatibility with substrate before applying mould-resistant paint",
    "Existing paint film — confirm adhesion and condition before over-coating",
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

export function MouldMoistureDamageIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are mould and moisture damage treatment systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Mould in Class 2 strata apartment buildings forms when moisture accumulates on internal surfaces — caused by condensation on cold external walls and ceilings, water ingress from above or adjacent units, or inadequate ventilation in bathrooms, laundries and kitchens. Before any biocide treatment or repainting is carried out, the source of moisture must be identified and rectified. Surface treatment of mould without resolving the underlying moisture cause will result in recurrence.
        </p>
        <p>
          The standard remediation sequence for mould-affected internal surfaces is: apply biocide wash to kill active mould spores and break down the mould colony at the surface, allow the surface to dry thoroughly, apply a suitable primer, then apply a mould-resistant topcoat. Skipping the biocide wash step and painting directly over mould contamination is a common defect in mould remediation works — the mould colony must be killed and removed before any paint system is applied.
        </p>
        <p>
          Mould-resistant interior paints contain an active inhibitor in the paint film that suppresses mould re-growth on the surface in high-humidity environments. These paints are appropriate for bathrooms, laundries, kitchens and other mould-prone areas, and are significantly more effective than standard interior paints in high-humidity conditions. However, the active inhibitor reduces over time and is not a substitute for resolving the moisture source — standard paint in a continuously damp environment will always fail regardless of mould-resistant additives.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Mould-resistant grout — tile grout system for joints between tiles, not a paint or surface coating for walls and ceilings",
              "Waterproofing membranes — membrane systems to prevent water ingress, not a mould treatment or surface paint",
              "Exterior facade biocide — exterior cleaning and biocide products formulated for facade use, not internal walls and ceilings",
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

export function MouldMoistureDamageProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — mould and moisture damage treatment systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of mould and moisture damage treatment products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Mould kill</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Paintable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.mouldKill}</td>
                  <td className="px-4 py-3 text-slate-600">{row.paintable}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrate}</td>
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
            <p className="mt-1 text-sm text-slate-500">Mould treatment product equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Selleys</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Dulux</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.selleys, row.dulux].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Source identification is mandatory before treatment</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Mould recurs if the moisture source is not rectified — water ingress, condensation or plumbing leak must be resolved first",
            "Widespread mould on plasterboard (penetrated more than 3mm) requires full plasterboard replacement — surface washing alone is not sufficient for deeply contaminated board",
            "PPE required during mould washing — respiratory protection, gloves and eye protection for any remediation involving significant mould growth",
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
