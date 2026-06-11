"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Silicate-paint"
  | "Mineral-paint"
  | "Masonry-paint"
  | "Breathable"
  | "Rising-damp"
  | "External"
  | "Internal"
  | "Heritage"
  | "Algae-resistant"
  | "Through-coloured"
  | "Water-based"
  | "UV-stable";

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
    fullLabel: "Keim Australia",
    brandUrl: "https://www.keim.com.au",
    tdsUrl: "https://www.keim.com.au",
    accentColor: "#2d6a4f",
    name: "Keim Granital",
    descriptionLine: "Mineral silicate paint — exceptionally breathable — petrification bond to masonry — the reference standard for breathable paint on rising damp walls",
    productType: "Mineral silicate paint",
    filterTags: ["Silicate-paint", "Mineral-paint", "Breathable", "Rising-damp", "External", "Heritage", "Algae-resistant", "UV-stable"],
    techChips: [
      { label: "Mineral silicate paint", cls: "bg-sky-100 text-sky-800" },
      { label: "Exceptionally breathable", cls: "bg-green-50 text-green-700" },
      { label: "Heritage compatible", cls: "bg-amber-50 text-amber-700" },
      { label: "Chemical bond to masonry", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Keim Granital is the flagship product in Keim's mineral silicate paint range and is the reference standard for breathable masonry paint on rising damp walls worldwide. The product uses a potassium silicate binder that undergoes a petrification reaction — a chemical bond with silica-containing masonry substrates. This chemical bond is fundamentally different from film-forming acrylic or vinyl paints: Granital does not sit as a film on the surface of the masonry but instead becomes part of the masonry substrate itself.\n\nThe result is exceptional vapour permeability — among the highest of any paint system. Rising damp walls drying after DPC injection and renovation plastering need to breathe through the finished surface coating. Keim Granital allows this vapour escape while providing durable colour, UV stability and excellent resistance to algae, mould and biological growth without biocide additives — the high alkalinity of the silicate system is inherently hostile to biological growth.\n\nFor rising damp remediation, Keim Granital is typically specified as the final topcoat over Keim silicate render or mineral render systems. It can also be applied as a flat wash colour over cement render where the substrate has been prepared correctly. Confirm substrate compatibility (must be mineral — masonry, cement render, mineral render — not acrylic paint) and application requirements with Keim Australia before specifying.",
    technicalProperties: [
      "Potassium silicate binder — petrification reaction — chemical bond to mineral masonry substrates — cannot peel or form a film",
      "Exceptional vapour permeability — the highest breathability classification available for a topcoat paint system",
      "Inherently resistant to algae, mould and biological growth — no biocides required — alkaline chemistry hostile to biological colonisation",
      "UV-stable mineral pigments — colour does not bleach or fade over time — colour stable for decades",
      "Non-combustible — A2 fire classification — appropriate for external facade applications with fire performance requirements",
      "Extremely long service life — silicate paints are among the most durable facade coatings available — many European examples surviving 50+ years without failure",
    ],
    limitations: [
      "Only bonds to mineral (silica-containing) substrates — not compatible with acrylic paints, vinyl paints, polymer-modified renders or any non-mineral coating",
      "Existing acrylic or vinyl coatings must be completely removed before Keim Granital can be applied",
      "Colour range is limited to mineral earth tones — synthetic bright colours cannot be achieved in silicate paint systems",
      "Application requires clean, dry, sound mineral substrate — contaminated or damp substrates must be prepared before application",
      "Higher initial cost than acrylic masonry paints — life-cycle advantage is significant given durability but short-term budget pressure may be a factor",
      "Confirm current product specification, substrate compatibility and applicator availability with Keim Australia before specifying",
    ],
    procurementSources: [
      { name: "Keim Australia — trade supply — contact for current pricing and applicator referral", url: "https://www.keim.com.au" },
    ],
  },
  {
    fullLabel: "Dulux Australia",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au",
    accentColor: "#c8102e",
    name: "Dulux Weathershield Breathable Masonry Paint",
    descriptionLine: "Water-based breathable masonry paint — exterior use — for masonry surfaces requiring improved moisture vapour permeability",
    productType: "Breathable masonry paint",
    filterTags: ["Masonry-paint", "Breathable", "Rising-damp", "External", "Water-based"],
    techChips: [
      { label: "Breathable masonry paint", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Dulux brand", cls: "bg-red-50 text-red-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Dulux Weathershield Breathable Masonry Paint is Dulux's water-based exterior masonry paint with improved vapour permeability compared to standard acrylic masonry paints. Dulux Australia is the dominant paint brand in Australia with national distribution and wide contractor familiarity, making Weathershield products straightforward to specify and procure on strata and residential remediation projects.\n\nFor rising damp applications where a silicate paint is not feasible (substrate not mineral, heritage character not a requirement, or budget does not allow for Keim specification), a breathable masonry paint such as Dulux Weathershield Breathable provides improved performance over standard acrylic paints. The product allows some vapour transmission through the paint film, reducing moisture trapping compared to non-breathable acrylic paints.\n\nHowever, the vapour permeability of a water-based breathable masonry paint is materially lower than a mineral silicate paint. For walls in the active drying phase after recent DPC injection, a silicate paint or mineral render system is technically preferable. Dulux Weathershield Breathable is a more appropriate choice for walls that have completed their primary drying phase and need a low-maintenance, widely available breathable finish that provides good protection against rain penetration.\n\nConfirm the current product designation, vapour permeability classification and application requirements with Dulux Technical before specifying on a rising damp remediation project.",
    technicalProperties: [
      "Improved vapour permeability compared to standard acrylic masonry paints — allows some moisture vapour transmission through the paint film",
      "Dulux national distribution — available from Dulux trade outlets across all Australian states — familiar to all painting contractors",
      "Water-based formula — low VOC — suitable for occupied strata buildings where solvent odour is a concern",
      "Good rain penetration resistance — protects masonry from driving rain while allowing interior moisture to escape",
      "Wide colour range — full Dulux colour range available — advantage over mineral paint systems with limited palette",
    ],
    limitations: [
      "Vapour permeability is significantly lower than mineral silicate paint (Keim Granital) — not recommended for walls in the active drying phase after recent DPC injection",
      "Film-forming paint — does not chemically bond to masonry — will peel on surfaces with persistent moisture or active salt crystallisation",
      "Not appropriate where heritage character requires a mineral finish — acrylic paint appearance differs from mineral wash",
      "Must be applied to clean, dry, sound masonry — active rising damp or wet substrate will cause paint failure regardless of breathability rating",
      "Confirm product vapour permeability classification (Sd value or equivalent) with Dulux Technical for the specific application before specifying",
      "Confirm current product name, specification and availability with Dulux Australia before specifying",
    ],
    procurementSources: [
      { name: "Dulux Australia — trade supply — contact for current pricing", url: "https://www.dulux.com.au" },
      { name: "Dulux trade outlets — national network", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Tikkurila Australia",
    brandUrl: "https://www.tikkurila.com.au",
    tdsUrl: "https://www.tikkurila.com.au",
    accentColor: "#003580",
    name: "Tikkurila Silora / Mineral Masonry Paint",
    descriptionLine: "Mineral-based breathable masonry paint — for external masonry — breathable topcoat for rising damp remediation and renovation",
    productType: "Mineral breathable masonry paint",
    filterTags: ["Mineral-paint", "Masonry-paint", "Breathable", "Rising-damp", "External", "Water-based"],
    techChips: [
      { label: "Mineral masonry paint", cls: "bg-sky-100 text-sky-800" },
      { label: "Breathable", cls: "bg-green-50 text-green-700" },
      { label: "Tikkurila brand", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tikkurila is a Finnish paint manufacturer known for high-performance exterior coatings and has a presence in Australia through Tikkurila Australia. Their mineral masonry paint range (including products such as Silora or equivalent designation) provides breathable exterior masonry paint options with mineral or silicate content for improved vapour permeability compared to standard acrylic systems.\n\nFor rising damp remediation, Tikkurila's mineral masonry paint products may provide an intermediate option between standard acrylic paint and full silicate paint systems (Keim). The mineral content in the binder increases vapour permeability compared to a pure acrylic formulation while maintaining a wide colour range and application properties familiar to painting contractors.\n\nTikkurila is a less familiar brand name to Australian building managers and strata contractors than Dulux or Keim, which can create procurement and warranty support challenges. Confirm the current Australian product range, breathability classification and local distribution with Tikkurila Australia before specifying. Note that product naming and range availability in Australia may differ from Tikkurila's European product range.",
    technicalProperties: [
      "Mineral or silicate-modified binder — improved vapour permeability compared to standard acrylic masonry paint",
      "Suitable for exterior masonry walls — provides durable colour protection with enhanced breathability",
      "Water-based formula — low odour — suitable for use in occupied strata buildings",
      "Tikkurila's European heritage in mineral and silicate coatings provides a higher level of technical documentation than many competing products",
    ],
    limitations: [
      "Brand is less familiar to Australian painting contractors than Dulux — may require contractor education on application methods",
      "Confirm Australian product range with Tikkurila Australia — European product names may differ from Australian market range",
      "Vapour permeability is likely lower than mineral silicate paint (Keim Granital) — confirm Sd value with Tikkurila technical for rising damp applications",
      "Confirm local distribution and current availability before specifying on a project",
      "Confirm current product name, specification and breathability classification with Tikkurila Australia before specifying",
    ],
    procurementSources: [
      { name: "Tikkurila Australia — trade supply — contact for current pricing", url: "https://www.tikkurila.com.au" },
      { name: "Confirm regional distributor availability with Tikkurila Australia", url: "https://www.tikkurila.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silicate-paint", label: "Silicate paint" },
  { id: "Mineral-paint", label: "Mineral paint" },
  { id: "Masonry-paint", label: "Masonry paint" },
  { id: "Breathable", label: "Breathable" },
  { id: "Rising-damp", label: "Rising damp" },
  { id: "External", label: "External" },
  { id: "Internal", label: "Internal" },
  { id: "Heritage", label: "Heritage compatible" },
  { id: "Algae-resistant", label: "Algae resistant" },
  { id: "UV-stable", label: "UV stable" },
  { id: "Water-based", label: "Water-based" },
];

const BRAND_EQUIV: { system: string; keim: string; dulux: string; tikkurila: string }[] = [
  { system: "Mineral silicate paint — maximum breathability — heritage", keim: "Granital", dulux: "—", tikkurila: "—" },
  { system: "Breathable masonry paint — water-based — wide colour range", keim: "—", dulux: "Weathershield Breathable", tikkurila: "—" },
  { system: "Mineral-modified breathable masonry paint", keim: "—", dulux: "—", tikkurila: "Silora / mineral range*" },
];

const TECH_INFO = {
  typicalApplications: [
    "External topcoat on masonry walls following completion of rising damp treatment — DPC injection + WTA renovation plaster + breathable render — final decorative and protective coating",
    "Breathable topcoat on heritage masonry facades where breathability is required to prevent moisture trapping",
    "Replacement of existing acrylic paint on external masonry walls affected by rising damp — stripping impermeable coating and replacing with breathable paint",
    "Internal masonry wall topcoat on rising damp walls that have completed their primary drying phase after WTA renovation plastering",
  ],
  selectionCriteria: [
    "For heritage masonry or walls where maximum breathability is required, Keim Granital (mineral silicate paint) is the technically superior choice",
    "For walls that have completed primary drying and need a widely available, easily specified breathable topcoat, Dulux Weathershield Breathable is appropriate",
    "Do not apply any paint — including breathable paint — to walls that still have active rising damp or are in the early phase of drying after DPC injection — wait for the WTA renovation plaster system to complete its salt management function first",
    "Confirm the vapour permeability (Sd value or equivalent) of the selected product is appropriate for the stage of drying — a lower Sd value (more breathable) is always preferable on rising damp walls",
    "Breathable paint must not be applied over acrylic-contaminated substrates without stripping — the existing acrylic film will prevent the new breathable paint from delivering its breathability benefit",
  ],
  limitations: [
    "Breathable paint is the final step in rising damp treatment — it does not treat rising damp itself — DPC injection + renovation plaster must have been completed first",
    "Breathable paint does not prevent rising damp — it only allows vapour to escape through the topcoat during the drying-out period",
    "Even the most breathable paint has some vapour resistance — walls require 6–24 months to dry fully after treatment — redecoration too early will trap residual moisture",
    "Non-mineral breathable paints have higher vapour resistance than mineral silicate paints — confirm suitability for the specific application stage with the manufacturer",
  ],
  standardsNotes: [
    "EN 1062-1 — Classification of coating materials for exterior masonry — includes vapour permeability classification categories (Class I, II, III) — confirm classification of selected product",
    "ISO 7783 — Water vapour transmission rate classification for coatings — Sd value (equivalent air layer thickness) — lower Sd value = more breathable",
    "AS/NZS 2311 — Guide to the Painting of Buildings — Australian painting and coating reference standard",
    "WTA 2-9-04 — renovation plaster standard — indirectly governs topcoat requirements through the system vapour permeability requirements during drying",
  ],
  suitableDefects: [
    "Failed acrylic paint on external masonry — blistering, peeling, salt bloom under paint film — caused by moisture trapping under impermeable topcoat on rising damp walls",
    "Salt efflorescence through paint on lower internal or external walls — symptom of salt crystallisation beneath non-breathable paint on rising damp walls",
    "Final decoration of rising damp remediation works — after DPC injection + renovation plaster + render system has been completed and the wall is in later-stage drying",
  ],
  typicalSubstrates: [
    "Mineral render (Parex Monorex, Remmers render) — external face — suitable for silicate or mineral paint topcoat",
    "WTA renovation plaster (Remmers SP) — internal face — confirm breathable paint compatibility with manufacturer",
    "Masonry (brick, blockwork, sandstone) — direct application — confirm surface preparation with manufacturer",
    "Cement render — confirm compatibility — cement render is mineral substrate compatible with silicate paint",
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
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
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
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
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

export function BreathablePaintIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are breathable paint systems for rising damp remediation?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Breathable paint systems are the final topcoat applied to masonry walls after rising damp remediation. Their role is to provide colour, surface protection and weather resistance while remaining vapour-permeable — allowing the wall to continue releasing moisture during the drying-out period without trapping it beneath an impermeable film.
        </p>
        <p>
          Standard acrylic and vinyl masonry paints have low vapour permeability (high Sd values) and are not appropriate for use on walls in the active drying phase after DPC injection and renovation plastering. Applying a non-breathable topcoat traps residual moisture within the wall, accelerates salt crystallisation at the paint-render interface, and typically causes paint failure within 12–24 months through blistering, peeling and efflorescence.
        </p>
        <p>
          Mineral silicate paint (Keim Granital) is the most breathable topcoat available — it chemically bonds to mineral masonry substrates rather than forming a film, giving it unlimited vapour transmission. Breathable masonry paints (Dulux Weathershield Breathable and equivalents) are a more accessible alternative where silicate paint is not appropriate or not feasible, providing improved breathability over standard acrylic paints without the substrate restrictions of silicate systems.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Standard acrylic masonry paint — not breathable — not suitable over rising damp walls or walls in the drying-out phase",
            "Breathable renders (Parex Monorex, Keim silicate render) — a render system — not a paint — see the breathable render page",
            "WTA renovation plasters (Remmers SP) — internal salt-resistant replastering system — different role — see the salt-resistant plaster page",
            "Waterproof masonry paint — specifically formulated to prevent water ingress — typically low vapour permeability — not appropriate for rising damp walls",
            "Crystalline waterproofing slurries — active waterproofing products — not a decorative paint system",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
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

export function BreathablePaintProductSection() {
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
        <button type="button" onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, breathability classifications, selection criteria, standards and substrate notes</p>
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — mineral silicate paint and breathable masonry paints for rising damp remediation topcoats</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
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
            <p className="mt-1 text-sm text-slate-500">Breathable paint equivalents by paint type. * Confirm vapour permeability classification (Sd value) with manufacturer for the specific application stage.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#2d6a4f" }}>Keim</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#c8102e" }}>Dulux</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#003580" }}>Tikkurila</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.keim, row.dulux, row.tikkurila].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning box — BELOW comparison table ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Do not apply standard acrylic masonry paint to rising damp walls — even during the final decoration phase</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Standard acrylic masonry paint has low vapour permeability — it forms a film over the masonry surface that traps residual moisture within the wall",
            "Rising damp walls continue to dry for 6–24 months after DPC injection and renovation plastering — applying impermeable topcoat prematurely causes moisture to accumulate beneath the paint film",
            "Blistering, peeling and salt efflorescence through standard acrylic paint on rising damp walls is the most common failure mode in poorly specified rising damp remediation",
            "Only breathable topcoats (Keim Granital, Dulux Weathershield Breathable or equivalent) should be applied to rising damp walls — confirm the vapour permeability classification of the selected product before specifying",
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
