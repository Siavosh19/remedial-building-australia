"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";

type FilterTag =
  | "AS-5216"
  | "Epoxy"
  | "Epoxy-acrylate"
  | "Vinylester"
  | "Starter-bar"
  | "Threaded-rod"
  | "Cracked-concrete"
  | "Edge-distance";

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
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#be123c",
    name: "Hilti HIT-RE 500 V3",
    descriptionLine: "TODO: owner confirm — Hilti AU site shows HIT-RE 500 V4 as current; V3 not listed — pure epoxy chemical anchor — AS 5216 for cracked and uncracked concrete — rebar and threaded rod — seismic and fire rated",
    productType: "Pure epoxy chemical anchor — AS 5216 compliant",
    filterTags: ["AS-5216", "Epoxy", "Starter-bar", "Threaded-rod", "Cracked-concrete", "Edge-distance"],
    techChips: [
      { label: "Pure epoxy — AS 5216", cls: "bg-rose-100 text-rose-800" },
      { label: "Cracked + uncracked concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "Seismic and fire rated", cls: "bg-amber-50 text-amber-700" },
      { label: "Hilti Australia — nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Hilti HIT-RE 500 V3 is a pure epoxy chemical anchoring adhesive approved to AS 5216 for rebar connections and threaded rod anchors in cracked and uncracked concrete. The high-strength epoxy formulation achieves rated loads significantly higher than vinylester or epoxy-acrylate alternatives, and the AS 5216 design approval with cracked concrete (C1) rating makes it suitable for use in dynamic and seismic load cases as specified by the structural engineer. Used in reinforcement corrosion repair for starter bar installation (N12, N16), structural connection anchors, and post-installed rebar in repair pours. Installed in cleaned, dry or SSD drilled holes using the Hilti-specified cleaning protocol (brush, blow, repeat). Hilti provides PROFIS Anchor design software for anchor design to AS 5216 at no charge. Available through Hilti Direct, Hilti stores, and Hilti trade partners nationally.",
    technicalProperties: [
      "Pure epoxy — high bond strength — AS 5216 design approval for cracked and uncracked concrete",
      "C1 cracked concrete rating — seismic and fire-rated versions available",
      "Design using PROFIS Anchor software — free from Hilti Australia",
      "Hilti Direct — nationally available",
    ],
    limitations: [
      "Hole must be cleaned using Hilti-specified protocol (brush × 3, blow × 3 repeat) — deviation from the cleaning protocol voids the design approval",
      "TODO: owner confirm — product may be superseded by HIT-RE 500 V4; gel time and cure time are temperature-dependent — confirm from current Hilti TDS for the site temperature on the day of installation",
      "Do not load the anchor until the full cure time has elapsed — loading before cure creates a risk of bond failure",
      "High-strength epoxy — cured cartridge is a hazardous waste — dispose per SDS requirements",
    ],
    procurementSources: [
      { name: "Hilti Australia — Hilti Direct, stores, and trade partners", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika AnchorFix-3+",
    descriptionLine: "TODO: owner confirm — AnchorFix-3+ not found on current Sika AU chemical anchoring page (current lineup is AnchorFix-1, AnchorFix-3001, AnchorFix-3030) — confirm product name and chemistry before specifying — epoxy acrylate chemical anchor — AS 5216 for cracked and uncracked concrete — starter bars, threaded rod, and rebar connections",
    productType: "Epoxy acrylate chemical anchor — AS 5216 compliant — TODO: owner confirm product name current",
    filterTags: ["AS-5216", "Epoxy-acrylate", "Starter-bar", "Threaded-rod", "Cracked-concrete"],
    techChips: [
      { label: "Epoxy acrylate — AS 5216", cls: "bg-sky-100 text-sky-800" },
      { label: "Cracked + uncracked concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika Australia nationally", cls: "bg-amber-50 text-amber-700" },
      { label: "Design using SikaAnchor software", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika AnchorFix-3+ is an epoxy acrylate chemical anchoring adhesive compliant with AS 5216 for installation of rebar and threaded rod anchors in cracked and uncracked concrete. The epoxy acrylate chemistry provides high bond strength and is suitable for use in both static and seismic load cases as designed to AS 5216. Used for starter bar installation, rebar post-installation in repair pours, and structural connection anchors in reinforcement corrosion repair. Install in holes cleaned using the Sika-specified protocol; confirm the cure time for the ambient temperature from the Sika AnchorFix-3+ TDS before loading. Available through Sika Australia distributors nationally. Sika provides AnchorFix anchor design software.",
    technicalProperties: [
      "Epoxy acrylate — AS 5216 design approval — cracked and uncracked concrete",
      "Suitable for rebar post-installation and threaded rod anchors",
      "Sika Australia — trade supply nationally",
      "AnchorFix anchor design software available from Sika",
    ],
    limitations: [
      "Hole cleaning protocol must be followed precisely — brush, blow, repeat as specified in the Sika TDS",
      "Cure time is temperature-dependent — do not load before full cure; confirm cure time from TDS for site temperature",
      "Epoxy acrylate has a stronger odour than pure epoxy — confirm site ventilation requirements from SDS",
      "Design must be carried out to AS 5216 by a structural engineer — do not specify load capacity from manufacturer marketing material",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Ramset / ITW Red Head",
    brandUrl: "https://www.ramset.com.au",
    accentColor: "#7c2d12",
    name: "Ramset Chemset Epoxy 500+",
    descriptionLine: "TODO: owner confirm — Chemset Epoxy 500+ not found on current Ramset AU site; current product appears to be ChemSet Reo 502 XTREM (600 mL, pure epoxy, dry/wet/flooded holes, AS 5216, seismic C1 and C2) — confirm product name and spec before specifying — epoxy chemical anchor — AS 5216 approved — rebar and threaded rod in concrete repair — Ramset national distribution",
    productType: "Epoxy chemical anchor — AS 5216 compliant — TODO: owner confirm product name current",
    filterTags: ["AS-5216", "Epoxy", "Starter-bar", "Threaded-rod", "Cracked-concrete"],
    techChips: [
      { label: "Epoxy — AS 5216", cls: "bg-red-100 text-red-900" },
      { label: "Cracked concrete rating", cls: "bg-slate-100 text-slate-700" },
      { label: "Ramset — national distribution", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm current TDS", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ramset Chemset Epoxy 500+ is an epoxy chemical anchor adhesive approved to AS 5216 for rebar and threaded rod installation in cracked and uncracked concrete. The Ramset (ITW Red Head / Ramset in Australia) brand has wide trade distribution nationally through hardware and fastener suppliers. Used in reinforcement corrosion repair for starter bar installation, structural connections, and anchor bolts in repair work. Follow the Ramset-specified hole cleaning protocol and cure time for the installation temperature. Confirm current AS 5216 approval scope from the current Ramset TDS — confirm which cracked concrete classes (C1, C2) are covered for the specific application. Design anchors to AS 5216 using the Ramset design data or an accepted anchor design software.",
    technicalProperties: [
      "Epoxy chemical anchor — AS 5216 design approval",
      "Cracked concrete rating — confirm specific C-class from current TDS",
      "Ramset — wide trade distribution nationally",
      "Compatible with N12 / N16 rebar and standard threaded rod",
    ],
    limitations: [
      "Confirm current AS 5216 approval scope and cracked concrete class from the current Ramset TDS — do not rely on historical data",
      "Hole cleaning and installation must follow the Ramset TDS protocol — deviation from the protocol voids the design approval",
      "Cure time is temperature dependent — confirm for site conditions before loading",
      "Do not over-mix or under-mix — initial mixed portion from the cartridge tip should be discarded until a uniform colour is achieved",
    ],
    procurementSources: [
      { name: "Ramset — national trade distribution", url: "https://www.ramset.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#16a34a",
    name: "Mapei Mapefox EW",
    descriptionLine: "TODO: owner confirm — Mapei AU site blocked (Cloudflare); could not verify product name, chemistry, or AS 5216 approval scope from live source — epoxy adhesive for anchoring rebar in concrete — for starter bars, threaded anchors, and structural rebar installation — Mapei Australia nationally",
    productType: "Epoxy anchoring adhesive for rebar and threaded rod — TODO: owner confirm AS 5216 approval scope",
    filterTags: ["AS-5216", "Epoxy", "Starter-bar", "Threaded-rod"],
    techChips: [
      { label: "Epoxy anchoring adhesive", cls: "bg-green-100 text-green-900" },
      { label: "Rebar and threaded rod", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm AS 5216 scope from TDS", cls: "bg-amber-100 text-amber-900" },
      { label: "Mapei Australia — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Mapefox EW is an epoxy adhesive used for anchoring reinforcing bars and threaded rods in concrete. Used in reinforcement corrosion repair for starter bar installation, rebar post-installation in repair pours, and structural anchor applications where an epoxy-based product is specified. Confirm the current AS 5216 design approval scope and cracked concrete class from the current Mapei Australia TDS before specifying — the Mapefox EW approval scope should be verified against the specific application requirements. Install in holes cleaned per the Mapei protocol; use Mapei's design data for anchor design or confirm the anchor design with the structural engineer. Available through Mapei Australia trade supply nationally.",
    technicalProperties: [
      "Epoxy anchoring adhesive — for rebar and threaded rod installation in concrete",
      "Used for starter bars and structural connections in repair works",
      "Confirm current AS 5216 approval scope from Mapei TDS",
      "Mapei Australia — national trade supply",
    ],
    limitations: [
      "Confirm current AS 5216 approval scope and cracked concrete class from the current Mapei TDS before specifying",
      "Hole cleaning and installation must be carried out per the Mapei TDS protocol",
      "Cure time is temperature-dependent — do not load before full cure",
      "Do not use Mapefox EW for applications requiring a seismic-rated anchor without confirming the seismic approval status from Mapei",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "AS-5216", label: "AS 5216 compliant" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "Epoxy-acrylate", label: "Epoxy acrylate" },
  { id: "Vinylester", label: "Vinylester" },
  { id: "Starter-bar", label: "Starter bar" },
  { id: "Threaded-rod", label: "Threaded rod" },
  { id: "Cracked-concrete", label: "Cracked concrete" },
  { id: "Edge-distance", label: "Edge distance" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Hilti HIT-RE 500 V3",
    compliance: "TODO: owner confirm — V4 now current on Hilti AU",
    cartridge: "Pure epoxy",
    notes: "Highest load capacity — PROFIS Anchor design software — confirm version",
  },
  {
    product: "Sika AnchorFix-3+",
    compliance: "TODO: owner confirm — product not found on current Sika AU site",
    cartridge: "TODO: owner confirm chemistry — epoxy acrylate unverified",
    notes: "Current Sika AU lineup: AnchorFix-1, AnchorFix-3001, AnchorFix-3030 — confirm correct product",
  },
  {
    product: "Ramset Chemset Epoxy 500+",
    compliance: "TODO: owner confirm — product not found on current Ramset AU site",
    cartridge: "Epoxy",
    notes: "Current Ramset product may be ChemSet Reo 502 XTREM (600 mL, wet/flooded holes) — confirm name",
  },
  {
    product: "Mapei Mapefox EW",
    compliance: "TODO: owner confirm — Mapei AU unverifiable (Cloudflare blocked)",
    cartridge: "Epoxy",
    notes: "Confirm approval scope from current Mapei TDS — live site inaccessible during audit",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Starter bar installation — N12 and N16 D500N rebar injected and grouted into drilled holes in existing concrete to form structural connections in repair pours",
    "Anchor bolt installation for mechanical equipment, handrail posts, facade brackets, and other structural attachments in repair or upgrade works",
    "Post-installed rebar in structural repair pours — connecting new concrete to existing concrete structure through epoxy-grouted rebar",
    "Reinforcement connection at new construction joints in repair works — where the engineer specifies post-installed rebar to reinstate structural continuity",
    "Edge repair of carpark slabs and balconies — starter bars installed at the edge before forming and pouring a new edge section",
    "CFRP laminate anchor pins — in CFRP strengthening systems, epoxy anchor adhesive is also used for end-zone anchor holes",
  ],
  selectionCriteria: [
    "Use an AS 5216-compliant product for all structural anchor applications — non-compliant products cannot be used in engineered connections",
    "For cracked concrete applications (beams, slabs, seismic zones), confirm the cracked concrete class (C1 or C2) is covered by the selected product's AS 5216 approval",
    "Use Hilti HIT-RE 500 (TODO: owner confirm current version — V4 now listed on Hilti AU) where the highest bond strength, seismic rating, or fire-rating is required — the most comprehensively approved product in the range",
    "For applications where ventilation is limited, check the product odour and VOC level — pure epoxy products (Hilti HIT-RE 500 series) have lower odour than epoxy acrylate products",
    "Confirm the design load requirements with the structural engineer and use the relevant anchor design software (PROFIS Anchor, SikaAnchor) to size the embedment depth and edge distance",
    "Consider gel time and working temperature — in cold conditions (below 10°C), gel time extends significantly; in hot conditions (above 35°C), gel time reduces sharply — confirm from TDS",
  ],
  limitations: [
    "Epoxy anchors must not be loaded before full cure at the specific installation temperature — failure to observe cure time is the most common cause of anchor bond failure",
    "Hole cleaning is critical — a single missed cleaning step (brush or blow) significantly reduces bond strength — follow the TDS protocol without deviation",
    "Do not install in wet holes — saturated or dripping water in the drilled hole prevents adhesive bond to the hole wall; dry the hole with compressed air before injection",
    "Do not use non-AS 5216-approved products for structural anchor applications — safety implications",
    "Inclined and horizontal installation overhead can cause the adhesive to run before cure — use a screen sleeve or confirm the product is rated for that installation orientation",
    "Chemical anchors are sensitive to temperature during cure — protect from rapid temperature change and UV exposure during the curing period",
  ],
  standardsNotes: [
    "AS 5216 — Design of post-installed fixings in concrete — the primary Australian standard for chemical and mechanical anchor design — sets approval and design requirements",
    "AS 5216 cracked concrete classes — C1 (dynamic loads, seismic) and C2 (quasi-static loads in cracked concrete) — confirm which class is required for the application from the engineer",
    "Hilti PROFIS Anchor — free design software for AS 5216 anchor design — preferred by most Australian structural engineers for Hilti product design",
    "AS 3600 — minimum edge distance and cover requirements for embedded anchors and post-installed rebar — the structural engineer's specification takes precedence",
    "SafeWork Australia SDS — epoxy and epoxy-acrylate chemical anchors contain hazardous materials — PPE (gloves, goggles) and controlled site disposal required",
  ],
  suitableDefects: [
    "Reinforcement corrosion repair requiring starter bar installation to connect a repair pour to the existing structure",
    "Edge spalling and section loss where the edge is rebuilt and new reinforcement needs to be connected to the existing slab or beam",
    "Structural upgrade works requiring post-installed rebar to reinstate structural continuity across a repair section",
    "CFRP strengthening installation requiring end-zone anchor bolts or pins",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — the primary substrate for chemical anchor installation in remedial repair",
    "Precast concrete — same installation requirements as in-situ; confirm minimum edge distances and cover from AS 5216 and the precast manufacturer",
    "Masonry — some chemical anchors are rated for masonry substrates; confirm from the AS 5216 approval document for the specific product and masonry type",
    "Do NOT install in hollow masonry or cores without a screen sleeve — adhesive will flow into the void and not form a bond",
  ],
};

export function EpoxyAnchoringAdhesivesIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Epoxy chemical anchor adhesives for structural rebar and anchor installation in concrete repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Epoxy chemical anchor adhesives are used to install post-drilled rebar (starter bars), threaded rods, and structural anchor bolts in existing concrete in reinforcement corrosion and structural repair works. They are the primary method for creating structural connections between new and existing concrete — for example, installing N12 or N16 starter bars to connect a repair pour to the existing slab or beam. All structural applications require anchors designed to AS 5216 by the structural engineer of record.
        </p>
        {expanded && (
          <>
            <p>
              The three main chemical anchor chemistries in Australian repair practice are pure epoxy (Hilti HIT-RE 500 — TODO: owner confirm current version; V4 now shown on Hilti AU), epoxy acrylate (Sika AnchorFix — TODO: owner confirm current product name; AnchorFix-3+ not found on current Sika AU site), and vinylester (various brands). Pure epoxy and epoxy acrylate systems carry AS 5216 design approval for cracked and uncracked concrete, including seismic applications. Installation protocol — hole cleaning in particular — is critical. Bond failure in chemical anchors is most commonly caused by inadequate hole cleaning, not installing in wet holes, or loading before full cure.
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

export function EpoxyAnchoringAdhesivesProductSection() {
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

  const visibleProducts = activeFilters.size === 0
    ? PRODUCTS
    : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
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
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
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

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — epoxy chemical anchor adhesives for structural rebar and rod installation — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
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

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Epoxy chemical anchor products for structural rebar and threaded rod. All anchors must be designed to AS 5216 by the structural engineer — confirm current approval status from manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Compliance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Chemistry</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.compliance}</td>
                  <td className="px-4 py-3 text-slate-600">{row.cartridge}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
