"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { DataNote } from "@/app/repair-systems/_components/ProductPageShared";

type FilterTag =
  | "Primer"
  | "Alkali-resistant"
  | "Water-based"
  | "Interior"
  | "Masonry"
  | "Plasterboard"
  | "Paint"
  | "Acrylic"
  | "Low-sheen"
  | "Topcoat";

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
  dataNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Dulux",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#ef4444",
    name: "Dulux Alkali-Resistant Primer",
    descriptionLine:
      "Water-based alkali-resistant primer that seals new masonry, concrete, plasterboard and render before interior topcoats — prevents alkali bleed-through",
    productType: "Alkali-resistant primer for new and repaint applications",
    dataNote: "Owner to confirm — the previously listed name 'Dulux Acra-Prep Alkali Resistant Primer' could not be confirmed as a current Dulux Australia interior primer product. The current equivalent may be Dulux 1Step Prep or Dulux Professional Acrylic Primer. Confirm the correct current product name, coverage rate and recoat times with Dulux Australia before publishing.",
    filterTags: ["Primer", "Alkali-resistant", "Water-based", "Interior", "Masonry", "Plasterboard"],
    techChips: [
      { label: "Alkali-resistant primer", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Interior", cls: "bg-slate-100 text-slate-700" },
      { label: "Masonry / plasterboard", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 1580", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — product name 'Dulux Acra-Prep Alkali Resistant Primer' could not be confirmed as a current Dulux Australia product on the au.dulux.com website. A water-based alkali-resistant primer formulated to seal new masonry, concrete, plasterboard and render surfaces before the application of interior topcoats. The alkali-resistant formulation prevents alkali salts present in new cement-based substrates from bleeding through and discolouring or lifting the topcoat. Applied by brush, roller or spray as a single coat to bare or sanded substrate before full topcoat application.\n\nConfirm current product designation and coverage rate with Dulux technical before specifying — the correct current Australian product name must be verified.",
    technicalProperties: [
      "Water-based alkali-resistant formulation — prevents alkali bleed-through on new cement-based and masonry substrates",
      "Suitable for new plasterboard, plaster, render and masonry — broad substrate coverage for internal remediation",
      "Promotes adhesion of subsequent water-based topcoat systems on porous or variable-porosity substrates",
      "Low-odour water-based formula — suitable for occupied or semi-occupied strata apartment buildings",
      "Applied by brush, roller or spray — single coat application prior to topcoat",
    ],
    limitations: [
      "Primer coat only — must be overcoated with compatible Dulux interior topcoat — not a standalone finish coat",
      "Not designed for exterior use or exposure to weathering — confirm product suitability for specific internal conditions",
      "Not a stain-blocking primer — use a dedicated stain-blocking product over water stains, smoke or tannin bleed",
      "Confirm current product specification, coverage and recoat times against the current Dulux TDS before applying",
      "Do not apply to damp or contaminated substrates — surface must be dry and sound before priming",
    ],
    procurementSources: [
      { name: "Dulux trade centres — nationally", url: "https://www.dulux.com.au" },
      { name: "Bunnings — in-store and online nationally", url: "https://www.bunnings.com.au" },
      { name: "Paintrite — trade paint supplier", url: "https://www.paintrite.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans",
    brandUrl: "https://www.taubmans.com.au",
    accentColor: "#3b82f6",
    name: "Taubmans Interior Ceiling Paint",
    descriptionLine:
      "Premium water-based acrylic interior paint for ceilings and walls in strata apartments — low-sheen, mould-resistant finish",
    productType: "Premium low-sheen interior ceiling and wall acrylic",
    dataNote: "Owner to confirm — the previously listed name 'Taubmans 3 in 1 Interior Ceiling Paint' appears to confuse the Taubmans 3 in 1 Prep product (a primer/sealer/undercoat) with a ceiling topcoat. Confirm the correct Taubmans interior ceiling paint product name, specification and whether a separate primer is required with Taubmans Australia before publishing.",
    filterTags: ["Paint", "Acrylic", "Water-based", "Interior", "Low-sheen", "Topcoat"],
    techChips: [
      { label: "Acrylic topcoat", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Low-sheen", cls: "bg-slate-100 text-slate-700" },
      { label: "Interior / ceiling", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 1580", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — the name 'Taubmans 3 in 1 Interior Ceiling Paint' appears to confuse the Taubmans 3 in 1 Prep product (a primer/sealer/undercoat) with a separate interior ceiling paint topcoat. Confirm the correct Taubmans interior ceiling paint product name with Taubmans Australia. A premium water-based acrylic interior paint formulated for ceilings and walls in strata apartments where mould resistance, low-sheen finish and ease of application are priorities.\n\nConfirm current product specification and whether a separate primer is required for the specific substrate condition before applying.",
    technicalProperties: [
      "Premium water-based acrylic formulation — low-sheen interior finish — suitable for ceilings and walls in strata apartments",
      "Stain-covering properties — hides minor surface marks and discolouration on well-prepared, primed surfaces",
      "Mould-resistant formulation — suitable for bathrooms, laundries and kitchens within Class 2 strata apartments",
      "Low-VOC water-based formula — low odour during application — suitable for occupied or semi-occupied buildings",
      "Applied by roller or brush — minimum two coats recommended for full opacity and colour consistency",
    ],
    limitations: [
      "3-in-1 coverage claim applies to repainting over sound, well-prepared existing paint — bare or new substrate requires separate alkali-resistant primer",
      "Not a substitute for mould treatment — biocide wash must be completed and surface must be dry before repainting over mould-affected areas",
      "Stain coverage does not extend to heavy water stains, rust bleed or tannin staining — use a dedicated stain-blocking primer first",
      "Confirm current product specification, sheen level range and recoat times against current Taubmans TDS before applying",
      "Do not apply to damp or contaminated substrates — adhesion failure will result if substrate is not sound and dry",
    ],
    procurementSources: [
      { name: "Taubmans trade centres — nationally", url: "https://www.taubmans.com.au" },
      { name: "Bunnings — in-store and online nationally", url: "https://www.bunnings.com.au" },
      { name: "Paintrite — trade paint supplier", url: "https://www.paintrite.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Primer", label: "Primer" },
  { id: "Alkali-resistant", label: "Alkali-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Interior", label: "Interior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Plasterboard", label: "Plasterboard" },
  { id: "Paint", label: "Paint" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "Low-sheen", label: "Low-sheen" },
  { id: "Topcoat", label: "Topcoat" },
];

const BRAND_EQUIV: { system: string; dulux: string; taubmans: string }[] = [
  { system: "Alkali-resistant primer", dulux: "TODO: confirm current product name", taubmans: "—" },
  { system: "Interior acrylic topcoat", dulux: "—", taubmans: "TODO: confirm current product name" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  coats: string;
  substrate: string;
  overcoatable: string;
  primaryUse: string;
}[] = [
  {
    product: "TODO: confirm — Dulux alkali-resistant interior primer",
    brand: "Dulux",
    type: "Alkali-resistant primer",
    coats: "1 coat",
    substrate: "Masonry, plasterboard, render",
    overcoatable: "Yes — with compatible acrylic topcoat",
    primaryUse: "Prime bare / new substrate before interior topcoat",
  },
  {
    product: "TODO: confirm — Taubmans interior ceiling topcoat",
    brand: "Taubmans",
    type: "Water-based acrylic topcoat",
    coats: "Min. 2 coats",
    substrate: "Interior ceilings and walls",
    overcoatable: "Yes — further topcoat coats",
    primaryUse: "Interior ceiling and wall finish coat — mould-resistant",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repainting of interior ceilings and walls in Class 2 strata apartments following water damage remediation",
    "Priming and repainting of new or patched plasterboard following internal defect repair",
    "Repainting of render and masonry internal surfaces affected by alkali attack or chalking",
    "Cosmetic repainting of interior surfaces following mould treatment and substrate preparation",
    "Repainting of bathroom, laundry and kitchen ceilings where mould-resistant topcoat is required",
  ],
  selectionCriteria: [
    "Apply alkali-resistant primer to all bare plasterboard, plaster, render and masonry before topcoat — primer is not optional on new substrate",
    "Select mould-resistant topcoat formulation for bathrooms, laundries and kitchens — standard interior paints are not adequate for continuously damp internal areas",
    "Match sheen level to existing surfaces and client requirements — low-sheen is standard for ceilings, semi-gloss for trim",
    "Confirm substrate is sound before priming — loose, flaking or chalky existing paint must be removed before repainting system will perform",
    "Confirm colour and sheen level with strata manager or client before applying — colour selection must be approved before work commences",
  ],
  limitations: [
    "Paint systems do not resolve the underlying defect — water ingress, alkali attack or substrate failure must be repaired at source before repainting",
    "Mould-resistant paint is not a substitute for biocide mould treatment — mould must be treated and killed before repainting",
    "Stain-blocking primer required over water stains, smoke, rust or tannin bleed — standard alkali-resistant primer will not seal heavy stains",
    "One-coat coverage claims are valid only on well-prepared, primed, non-porous surfaces — always allow for two topcoats on remediated substrates",
    "Occupied buildings require low-VOC water-based products and adequate ventilation during application — confirm with strata manager before work commences",
  ],
  standardsNotes: [
    "AS/NZS 1580 — Methods of Test for Paints and Related Materials — referenced for product conformance testing",
    "AS 3958.1 — Ceramic Tiles — Guide to the Installation of Ceramic Tiles — relevant where tiled surfaces adjoin painted surfaces",
    "BCA/NCC — National Construction Code — interior surface durability and fire-rating requirements may apply to strata common areas",
    "NATSPEC — Paint and Protective Coatings — specifier guidance for interior repainting in strata buildings",
  ],
  suitableDefects: [
    "Interior paint peeling, chalking or blistering due to alkali attack from new plasterboard or masonry",
    "Interior paint adhesion failure on contaminated or glossy existing paint surfaces",
    "Interior ceiling discolouration or mould-related paint failure following water leak remediation",
    "Chalky or powdery interior paint surfaces requiring preparation and repainting",
  ],
  typicalSubstrates: [
    "New or patched plasterboard — must be primed with alkali-resistant primer before topcoat",
    "Render and masonry interior walls — prime before topcoat on all new or repaired areas",
    "Existing interior acrylic paint — wash and key before repainting — confirm adhesion on glossy surfaces",
    "Interior concrete ceilings in carparks and common areas — confirm suitable primer for concrete substrate",
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

export function PaintFailureInternalIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are internal paint repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Internal paint failure in Class 2 strata apartment buildings is commonly caused by alkali attack on new plasterboard or masonry, moisture vapour migrating through the substrate, contaminated or chalky existing paint that has lost adhesion, and inadequate surface preparation before repainting. Alkali present in new cement-based substrates will bleed through applied topcoats and cause saponification — a soapy breakdown of the paint film — leading to peeling, discolouration and premature failure. All paint failures must be traced to their root cause before repainting is attempted.
        </p>
        <p>
          Alkali-resistant primer is the essential first coat on all new or repaired plasterboard, render and masonry substrates before interior topcoat application. The primer seals the substrate, prevents alkali bleed-through, and promotes adhesion of the topcoat on porous or variable-porosity surfaces. On contaminated or glossy existing paint, the surface must be washed, sanded or keyed to promote adhesion before priming — priming alone will not overcome a fundamentally contaminated or failing substrate.
        </p>
        <p>
          Interior topcoat selection for ceilings and walls depends on the sheen level, hiding power and mould resistance required for the specific internal environment. Low-sheen finish is standard for ceilings and living areas. Semi-gloss is standard for bathroom and kitchen walls and trims. Mould-resistant formulations must be specified for bathrooms, laundries and kitchens. A minimum of two topcoat coats is required on all remediated and re-primed surfaces for full colour consistency and film build — one-coat coverage claims are valid only on well-prepared, sealed, primed surfaces.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Exterior coating systems — exterior-rated products are formulated for UV and weather exposure and are not designed for interior application",
              "Mould treatment — biocide wash is required before repainting on mould-affected surfaces — mould-resistant paint does not replace biocide treatment",
              "Water stain sealing — stain-blocking primer is required over water-stained surfaces before topcoat — standard alkali-resistant primer will not seal heavy water stains",
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

export function PaintFailureInternalProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">2 products — 2 brands — internal paint repair systems — scroll to view all</p>
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
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3 space-y-2">
                  {product.dataNote && <DataNote text={product.dataNote} />}
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of internal paint repair products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Coats</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Overcoatable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.coats}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.overcoatable}</td>
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
            <p className="mt-1 text-sm text-slate-500">Internal paint repair system equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Dulux</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Taubmans</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.dulux, row.taubmans].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Surface preparation determines paint longevity</h3>
        </div>
        <ul className="space-y-2">
          {[
            "All chalky, flaking or contaminated existing paint must be removed before repainting — new paint will not adhere to a failing substrate",
            "Prime all bare plasterboard edges and new plaster with alkali-resistant primer before applying topcoat",
            "Apply minimum two coats of topcoat for full coverage and colour consistency — one-coat coverage claims are valid only on well-prepared, primed surfaces",
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
