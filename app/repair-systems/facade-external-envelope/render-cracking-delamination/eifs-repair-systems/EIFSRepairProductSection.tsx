"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "EIFS" | "EPS-insulation" | "AR-mesh" | "Base-coat"
  | "Facade-repair" | "Lightweight" | "NCC-C1" | "Polymer-modified";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string;
  filterTags: FilterTag[]; techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[];
  limitations: string[]; procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products-catalogue",
    accentColor: "#0055A5",
    name: "Mapei Silexcolor Coat / Mapetherm System",
    descriptionLine: "EIFS base coat and finish coat system — AR glass mesh reinforcement — EPS board substrate — facade insulation and render system repair",
    productType: "EIFS base coat and finish system",
    filterTags: ["EIFS", "EPS-insulation", "AR-mesh", "Base-coat", "Facade-repair", "Polymer-modified", "NCC-C1"],
    techChips: [
      { label: "EIFS system", cls: "bg-sky-100 text-sky-800" },
      { label: "AR mesh reinforcement", cls: "bg-slate-100 text-slate-700" },
      { label: "EPS substrate", cls: "bg-green-50 text-green-700" },
      { label: "Polymer-modified base coat", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei's EIFS repair system for facade remediation uses Silexcolor Coat as the polymer-modified base coat applied over the EPS insulation board, with AR glass mesh embedded into the fresh base coat to provide tensile reinforcement across the render face. The mesh distributes stress across the render area and prevents discrete crack formation at joints, corners, and around openings.\n\nFor EIFS repair on Class 2 strata buildings, the system is specified where the base coat or finish render layer has cracked, debonded, or the AR mesh has corroded (due to moisture ingress causing mesh deterioration). The repair requires careful removal of the failed render layer without damaging the EPS substrate, application of a new base coat with fresh AR mesh, and a compatible finish coat to match the existing facade texture.\n\nNCC 2022 Spec C1.1 requires EIFS systems used as part of a fire-resistance construction to comply with system-level testing — confirm fire performance compliance with Mapei Australia before specifying on NCC-regulated walls.",
    technicalProperties: [
      "Polymer-modified base coat with embedded 160g/m² AR glass mesh — primary tensile reinforcement layer",
      "AR mesh resists alkali attack in cementitious base coat — long-term durability",
      "Silexcolor finish coat provides vapour-permeable, weather-resistant decorative finish",
      "Suitable for EPS, mineral wool, and glass wool insulation board substrates",
      "Compatible with Mapei adhesive mortars for EPS board bonding",
      "Fire performance: confirm system compliance with NCC Spec C1.1 with Mapei Australia",
    ],
    limitations: [
      "EIFS repair must match existing system — mixing base coats and mesh from different manufacturers may not achieve the same performance",
      "EPS substrate must be structurally sound before repair — delaminated or damaged EPS must be replaced",
      "AR mesh overlap at joints must meet minimum 100mm — do not skimp on mesh laps",
      "Impact resistance of repaired EIFS is lower than in-situ cast concrete — protect from physical damage at ground level",
      "NCC fire compliance is system-specific — confirm with Mapei Australia before specifying on fire-resistance rated walls",
    ],
    procurementSources: [
      { name: "Mapei Australia — contact for current pricing and trade supply", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sto Australia",
    brandUrl: "https://www.sto.com/au",
    tdsUrl: "https://www.sto.com/au/products",
    accentColor: "#E2001A",
    name: "Sto Armat Classic / StoSilco Colour",
    descriptionLine: "EIFS base coat, mesh reinforcement, and silicone resin finish coat — Sto system — commercial and strata facade repair",
    productType: "EIFS base coat, mesh and finish system",
    filterTags: ["EIFS", "EPS-insulation", "AR-mesh", "Base-coat", "Facade-repair", "NCC-C1"],
    techChips: [
      { label: "Sto EIFS system", cls: "bg-sky-100 text-sky-800" },
      { label: "Silicone resin finish", cls: "bg-slate-100 text-slate-700" },
      { label: "AR mesh embedded", cls: "bg-green-50 text-green-700" },
      { label: "NCC C1.1 tested", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sto is a specialist EIFS manufacturer with a full system range including Sto Armat Classic (base coat mortar), Sto mesh (AR glass mesh), and StoSilco Colour (silicone resin finish coat). The silicone resin finish coat provides superior water repellency and colour retention compared to standard acrylic finishes, with high vapour permeability allowing moisture movement through the render system — important for EIFS facades where moisture management is critical to prevent internal condensation and EPS degradation.\n\nIn Australian Class 2 strata EIFS remediation, Sto system products are preferred by EIFS specialist contractors who work within the Sto supply ecosystem and hold Sto applicator approval. The full-system approach ensures consistent base coat, mesh, and finish compatibility, and Sto provides system-level fire testing documentation to support NCC compliance claims.\n\nConfirm current Australian product names, fire compliance documentation, and applicator approval requirements with Sto Australia before specifying.",
    technicalProperties: [
      "Full EIFS system — base coat, mesh, and finish coat from single manufacturer — system compatibility assured",
      "StoSilco Colour: silicone resin finish — high water repellency — high vapour permeability",
      "NCC Spec C1.1 fire testing available — system-level fire performance documented by Sto",
      "Sto Armat Classic: polymer-modified base coat — suitable for EPS, mineral wool, and glass wool boards",
      "Full-colour and texture range available in StoSilco finish system",
      "Sto applicator approval program — quality-assured application by registered contractors",
    ],
    limitations: [
      "Sto system must be applied by Sto-approved applicators to access warranty — confirm applicator status before engaging",
      "System repair must use Sto products throughout — do not substitute third-party products in a Sto EIFS repair",
      "Fire compliance is system-specific — confirm current NCC C1.1 compliance status with Sto Australia",
      "Silicone resin finishes are not field-tintable to all colours without checking Sto colour range",
      "Confirm current Australian product names with Sto Australia — range may differ from other markets",
    ],
    procurementSources: [
      { name: "Sto Australia — contact for current pricing and trade supply", url: "https://www.sto.com/au" },
      { name: "Sto-approved EIFS applicators (contact Sto Australia for list)", url: "https://www.sto.com/au" },
    ],
  },
  {
    fullLabel: "Dulux / Acratex (Australia)",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/trade",
    accentColor: "#E3051B",
    name: "Dulux Acratex Render Systems",
    descriptionLine: "Polymer-modified render and texture coating system — EIFS-compatible base coat and finish coat — concrete and masonry facade repair",
    productType: "Polymer-modified render and texture coat",
    filterTags: ["EIFS", "AR-mesh", "Base-coat", "Facade-repair", "Polymer-modified"],
    techChips: [
      { label: "Acratex system", cls: "bg-sky-100 text-sky-800" },
      { label: "Render + texture coat", cls: "bg-slate-100 text-slate-700" },
      { label: "Widely available", cls: "bg-green-50 text-green-700" },
      { label: "Dulux supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dulux Acratex provides a polymer-modified render and texture coating system used widely in Australian strata facade repair. While not a full EIFS system in the traditional sense, Acratex render systems are used in EIFS repair contexts where the base coat layer is replaced with an Acratex polymer-modified render coat, AR mesh is embedded, and the Acratex texture finish coat is applied over the top.\n\nIn Australian strata remediation, Dulux Acratex products are specified by painting and remedial contractors who work within the Dulux supply chain. The Acratex range provides a familiar, readily available alternative to specialist EIFS manufacturer products for render repair on non-fire-resistance-rated EIFS facades. For NCC fire-resistance-rated facades, only systems with documented system-level fire testing should be used — confirm with Dulux Technical.\n\nConfirm current Acratex product names, EIFS suitability, and any fire compliance requirements with Dulux Trade Technical before specifying.",
    technicalProperties: [
      "Widely available through Dulux trade stores — reliable supply chain across Australia",
      "Polymer-modified render base coat compatible with AR glass mesh embedding",
      "Acratex texture finish coat provides variety of textures and colours for facade repair matching",
      "Full technical support from Dulux Trade Technical team for specification and application guidance",
      "Suitable for EIFS repair on non-fire-resistance-rated facades",
      "Compatible with Dulux primer and topcoat systems for complete facade specification",
    ],
    limitations: [
      "Not a traditional EIFS manufacturer system — not all Acratex products have EIFS system-level fire testing",
      "For NCC fire-resistance-rated facades: confirm fire compliance with Dulux Technical before specifying Acratex as the repair system",
      "Texture matching to existing EIFS finish may be difficult — test patch before committing to full facade application",
      "Confirm current product names with Dulux Trade — Acratex range product names may change",
    ],
    procurementSources: [
      { name: "Dulux Trade stores — nationwide supply", url: "https://www.dulux.com.au" },
      { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "EIFS", label: "EIFS" },
  { id: "EPS-insulation", label: "EPS insulation" },
  { id: "AR-mesh", label: "AR mesh" },
  { id: "Base-coat", label: "Base coat" },
  { id: "Facade-repair", label: "Facade repair" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "NCC-C1", label: "NCC C1.1" },
  { id: "Polymer-modified", label: "Polymer-modified" },
];

const COMPARISON_ROWS: {
  product: string; brand: string; meshIncluded: string;
  fireCompliance: string; applicatorApproval: string; keyFeature: string;
}[] = [
  { product: "Silexcolor / Mapetherm", brand: "Mapei", meshIncluded: "AR mesh (separate)", fireCompliance: "Confirm with Mapei AU", applicatorApproval: "No", keyFeature: "Full Mapei repair system integration" },
  { product: "Armat Classic / StoSilco", brand: "Sto", meshIncluded: "Sto AR mesh", fireCompliance: "NCC C1.1 documented", applicatorApproval: "Yes — Sto approved", keyFeature: "Silicone resin finish — highest durability" },
  { product: "Acratex Render Systems", brand: "Dulux", meshIncluded: "AR mesh (third party)", fireCompliance: "Confirm with Dulux Technical", applicatorApproval: "No", keyFeature: "Widely available — familiar to painting contractors" },
];

const TECH_INFO = {
  typicalApplications: [
    "EIFS base coat delamination — remove failed render, reapply base coat with fresh AR mesh over sound EPS",
    "Cracked EIFS render — cut out cracked area, reinstall mesh with adequate overlaps, apply fresh base and finish coat",
    "Water infiltration through EIFS — identify entry point, seal EPS joints, reinstall render system",
    "EPS damage repair — replace damaged EPS section, bond replacement board, re-render with fresh system",
    "EIFS corner bead damage — reinstall corner reinforcement, apply fresh base coat and finish",
  ],
  selectionCriteria: [
    "Mapei Silexcolor/Mapetherm: preferred where Mapei supply chain is established and fire compliance is to be confirmed separately",
    "Sto Armat/StoSilco: for projects requiring documented NCC C1.1 fire compliance — applicator approval required",
    "Dulux Acratex: for non-fire-rated EIFS repair where Dulux supply chain is preferred and painting contractor is performing repair",
    "All systems: match existing texture and colour — take sample of existing finish to supplier for colour and texture matching",
    "Fire-rated facades: only use systems with documented NCC Spec C1.1 fire compliance",
  ],
  limitations: [
    "EIFS repair must match the existing system — mixing systems from different manufacturers may not meet fire or performance requirements",
    "AR mesh must lap by minimum 100mm at all joints — insufficient lap is a primary cause of crack re-occurrence",
    "EIFS is impact-sensitive at ground floor level — protect repaired areas from physical damage",
    "Water infiltration damage to EPS must be fully assessed before rendering — wet or degraded EPS must be replaced",
    "Fire compliance is system-specific — do not assume that a product used in an EIFS context complies with NCC without specific testing documentation",
  ],
  standardsNotes: [
    "NCC 2022 Volume One Spec C1.1 — External walls required to have FRL — EIFS must comply with system fire testing",
    "AS 3700 — Masonry Structures — where EIFS is over a masonry substrate",
    "EIFS industry guidelines — Australian Insulated Render Association (AIRA) — application quality and system requirements",
    "Manufacturer TDS — governs mesh weight, overlap requirements, base coat thickness, and finish coat compatibility",
  ],
  suitableDefects: [
    "EIFS base coat cracking — map cracking, shrinkage, or impact cracks in the render layer over EPS",
    "EIFS render delamination — loss of bond between base coat and EPS board",
    "Failed AR mesh — corroded or mechanically damaged mesh within the base coat — requires full render replacement in affected area",
    "EPS damage — physical damage or moisture-degraded EPS requiring replacement and re-rendering",
  ],
  typicalSubstrates: [
    "EPS (expanded polystyrene) insulation board — primary substrate for EIFS systems",
    "Mineral wool insulation board — used in fire-resistance-rated EIFS wall systems",
    "Concrete or masonry substrate behind EPS — substrate for EPS bonding layer",
    "Steel or timber frame substrate — EIFS applied over sheathing board on framed wall systems",
  ],
};

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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
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
          {chips.length > 0 && (<div className="mt-2 flex flex-wrap gap-1.5">{chips.map((chip) => (<span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>))}</div>)}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
    </div>
  );
}

export function EIFSRepairIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are EIFS repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>EIFS (Exterior Insulation and Finish Systems) are composite cladding systems comprising an EPS (expanded polystyrene) or mineral wool insulation board bonded to the structural substrate, with a polymer-modified cementitious base coat embedded with AR glass mesh applied over the board, and a decorative finish coat as the outermost layer. EIFS repair involves replacing the failed render layer — base coat and/or finish coat — while maintaining or replacing the insulation board substrate as required.</p>
        {expanded && (
          <>
            <p>EIFS repair is fundamentally different from standard render repair because the substrate is EPS, which cannot tolerate water, solvent-based materials, or abrasive preparation methods that would be standard on concrete or masonry. The polymer-modified base coat must be specifically formulated for EPS compatibility, and the AR glass mesh must be embedded with the correct overlap and in the wet base coat to achieve the tensile reinforcement function that prevents render cracking.</p>
            <p>In Australian Class 2 strata buildings constructed from 1990s to present, EIFS facades are common on medium and high-rise buildings where lightweight external wall cladding was preferred over in-situ render. NCC 2022 Specification C1.1 places fire performance obligations on EIFS systems used as external wall cladding — specifiers must confirm that the repair system maintains the fire performance of the original approved system, particularly on buildings classified as needing an FRL for the external wall assembly.</p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
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

export function EIFSRepairProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => { setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, product selection, EIFS repair method, limitations, standards and substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Product Selection" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Critical Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Compliance" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — Mapei / Sto / Dulux Acratex</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (<button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{f.label}</button>);
          })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5"><p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p></div>
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

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">EIFS repair system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">For NCC fire-rated facades confirm system-level fire compliance before specifying. Match existing texture and colour — test patch first.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Mesh included</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fire compliance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Applicator approval</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.product}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: row.brand === "Mapei" ? "#0055A5" : row.brand === "Sto" ? "#E2001A" : "#E3051B" }}>{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.meshIncluded}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fireCompliance}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.applicatorApproval}</td>
                  <td className="px-4 py-3 text-slate-500">{row.keyFeature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
