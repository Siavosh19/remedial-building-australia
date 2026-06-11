"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Silane"
  | "Siloxane"
  | "Penetrating"
  | "Water-repellent"
  | "Masonry"
  | "Concrete"
  | "Breathable"
  | "Colourless"
  | "Flood-coat"
  | "AS-3700";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#b45309",
    name: "Sika Protectosil BHN / CIT penetrating silane water repellent",
    descriptionLine: "Deep-penetrating silane/siloxane blend — chemically bonds in pore structure — reduces water absorption up to 95% — breathable — masonry and concrete facades",
    productType: "Penetrating silane/siloxane water repellent — flood coat — bare masonry and concrete",
    filterTags: ["Silane", "Siloxane", "Penetrating", "Water-repellent", "Masonry", "Concrete", "Breathable", "Colourless", "Flood-coat", "AS-3700"],
    techChips: [
      { label: "Silane/siloxane blend", cls: "bg-amber-100 text-amber-800" },
      { label: "Penetration 10–30 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Breathable", cls: "bg-green-100 text-green-700" },
      { label: "Flood coat essential", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Sika Protectosil BHN (broad-spectrum silane/siloxane blend) and CIT (isobutyltrimethoxysilane for porous substrates) are penetrating water repellents that chemically bond within the pore structure of masonry and concrete. They reduce water absorption by up to 95% while maintaining vapour permeability. Penetration depth 10–20 mm into dense masonry; up to 30 mm in porous brick. Chemically bonds to substrate — not a surface film; cannot peel. Colourless — no visible change to surface appearance. Application method: flood coat by brush, roller, or airless spray — brush-on as for paint is insufficient. Substrate must be dry — minimum 3 days no rain; substrate moisture below 4%. Reapplication every 10–15 years depending on exposure. Protectosil BHN is preferred for mixed masonry facades; CIT for very porous old brick.",
    technicalProperties: [
      "Penetration depth 10–30 mm depending on substrate porosity — porous brick 30 mm; dense brick 10–20 mm",
      "Water absorption reduction up to 95% per BS EN 13580 — laboratory tested on standard brick substrate",
      "Chemically bonds to substrate pore structure — cannot peel or blister as surface film products can",
      "Maintains vapour permeability (breathable) — allows moisture within masonry to escape outward",
      "Colourless — no visible change to surface appearance after treatment",
      "Reduces chloride ingress and carbonation rate in reinforced concrete facades",
    ],
    limitations: [
      "Supplementary protection only — does NOT seal cracks or repair structural defects; all defects must be repaired first",
      "Substrate must be dry — minimum 48–72 hours dry weather; substrate moisture below 4–6% by weight",
      "Ineffective on painted or coated surfaces — must penetrate bare masonry or concrete pore structure",
      "Requires re-application every 10–15 years depending on exposure and substrate porosity",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — national (Sika distributor)", url: "https://www.parchem.com.au" },
      { name: "Boral Building Products — masonry treatment range", url: "https://www.boral.com.au" },
      { name: "Rockcote / Parex — specialist masonry treatment supply", url: "https://www.rockcote.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapei Antipluviol S silane/siloxane water repellent",
    descriptionLine: "Water-based silane/siloxane emulsion — low VOC — breathable — for brick, natural stone, concrete and renders — suited to occupied buildings",
    productType: "Water-based penetrating silane/siloxane water repellent — low VOC — bare masonry and render",
    filterTags: ["Silane", "Siloxane", "Penetrating", "Water-repellent", "Masonry", "Concrete", "Breathable", "Colourless", "Flood-coat"],
    techChips: [
      { label: "Water-based", cls: "bg-sky-100 text-sky-800" },
      { label: "Low VOC", cls: "bg-green-100 text-green-700" },
      { label: "Breathable", cls: "bg-slate-100 text-slate-700" },
      { label: "Occupied buildings", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Mapei Antipluviol S is a water-based silane/siloxane emulsion water repellent for brick, natural stone, concrete, and renders. Water-based carrier reduces VOC and odour compared to solvent-based silanes — particularly suited to occupied strata buildings where solvent odour in common areas is a constraint. Penetration depth good on porous substrates; slightly reduced on dense substrates compared to solvent-borne silane. Coverage approximately 4–8 m² per litre depending on porosity — test area recommended to confirm rate. Touch dry 1–2 hours; full penetration 24–48 hours. Substrate must be dry — minimum 48 hours after rain. Application: brush, roller, or spray — wet-on-wet flood coat required. Water absorption reduction up to 90% on standard brick. Reapplication every 10–15 years.",
    technicalProperties: [
      "Water-based carrier — reduced VOC and solvent odour — preferred for occupied Class 2 strata buildings",
      "Compatible with all common masonry substrates including renders and natural stone",
      "Good penetration depth on porous substrates — same breathability characteristics as solvent-borne products",
      "Coverage 4–8 m² per litre — confirm rate on test area before ordering quantities",
      "Water absorption reduction up to 90% on standard brick substrate",
      "Environmentally preferred compared to solvent-borne products — lower VOC emissions during application",
    ],
    limitations: [
      "Slightly reduced penetration depth compared to solvent-borne silane on dense brick or concrete substrates",
      "Slower drying time than solvent-borne — site traffic must be managed for a longer period after application",
      "Not suitable for substrates with pre-existing silicone-based coatings — test for compatibility before full application",
      "Same dry-substrate requirements as solvent-borne — minimum 48 hours no rain before application",
    ],
    procurementSources: [
      { name: "Mapei Australia — national distributors", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies — national", url: "https://www.parchem.com.au" },
      { name: "TileMax / Tile Depot — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Ardex Australia — national masonry treatment supply", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Dulux / AkzoNobel",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#7c3aed",
    name: "Dulux Weathershield Masonry Water Repellent (silane blend)",
    descriptionLine: "Widely available silane/siloxane blend — solvent-borne — breathable — colourless — for standard residential brick and render applications",
    productType: "Penetrating silane/siloxane masonry water repellent — solvent-borne — external brick and render",
    filterTags: ["Silane", "Siloxane", "Penetrating", "Water-repellent", "Masonry", "Breathable", "Colourless", "Flood-coat"],
    techChips: [
      { label: "Widely available", cls: "bg-purple-100 text-purple-800" },
      { label: "Solvent-borne", cls: "bg-amber-100 text-amber-800" },
      { label: "Breathable", cls: "bg-green-100 text-green-700" },
      { label: "Residential grade", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Dulux Weathershield penetrating masonry water repellent — silane/siloxane blend in a solvent carrier. Widely available through Dulux trade stores and hardware nationally; suitable for residential strata applications where a well-known brand and standard contractor skill is preferred. Provides good water repellency on standard brick and render substrates. Appropriate for low- to medium-exposure applications. Coverage approximately 5–7 m² per litre on standard brick veneer. Breathable — maintains vapour permeability of the treated masonry. Colourless — no visible change to surface appearance. Solvent-borne: adequate ventilation and PPE required during application. Reapplication interval approximately 7–12 years — shorter than specialist silane grades. Confirm current formulation is a true penetrating silane (not a surface film silicone) by reviewing current TDS before specifying.",
    technicalProperties: [
      "Widely available through Dulux trade stores nationally — short supply chain and reduced lead time",
      "Good contractor familiarity — reduces application error risk on residential projects",
      "Standard brush and roller application — no specialist equipment required",
      "Breathable — vapour permeability maintained after treatment",
      "Colourless — no visible change to masonry appearance after treatment",
      "Coverage 5–7 m² per litre on standard brick veneer — economical for residential applications",
    ],
    limitations: [
      "Penetration depth and longevity may be less than specialist silane products on dense substrates",
      "Solvent-borne — adequate ventilation and PPE required during application in confined areas",
      "Not recommended for critical structural concrete protection — specify a confirmed silane (Protectosil or equivalent) for concrete corrosion protection applications",
      "Reapplication interval approximately 7–12 years — shorter than specialist silane grades — factor into maintenance programme",
    ],
    procurementSources: [
      { name: "Dulux Trade Stores — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade — national", url: "https://www.bunnings.com.au" },
      { name: "PBS Building Supplies — national", url: "https://www.pbsbuildingsupplies.com.au" },
      { name: "Confirm current formulation is penetrating silane — review TDS before ordering", url: "https://www.dulux.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silane", label: "Silane" },
  { id: "Siloxane", label: "Siloxane" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Water-repellent", label: "Water repellent" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Breathable", label: "Breathable" },
  { id: "Colourless", label: "Colourless" },
  { id: "Flood-coat", label: "Flood coat" },
  { id: "AS-3700", label: "AS 3700" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  carrier: string;
  penetration: string;
  breathable: string;
  voc: string;
  coverageLitre: string;
  reapplication: string;
  primaryUse: string;
}[] = [
  {
    product: "Sika Protectosil BHN/CIT",
    brand: "Sika Australia",
    carrier: "Solvent",
    penetration: "Deep — up to 30 mm",
    breathable: "Yes",
    voc: "High",
    coverageLitre: "3–6 m²/L",
    reapplication: "10–15 years",
    primaryUse: "Dense brick or concrete protection — specialist facade treatment",
  },
  {
    product: "Mapei Antipluviol S",
    brand: "Mapei Australia",
    carrier: "Water-based",
    penetration: "Good — porous substrates",
    breathable: "Yes",
    voc: "Low",
    coverageLitre: "4–8 m²/L",
    reapplication: "10–15 years",
    primaryUse: "Occupied buildings — low VOC constraint",
  },
  {
    product: "Dulux Weathershield WR",
    brand: "Dulux / AkzoNobel",
    carrier: "Solvent",
    penetration: "Standard",
    breathable: "Yes",
    voc: "Moderate",
    coverageLitre: "5–7 m²/L",
    reapplication: "7–12 years",
    primaryUse: "Standard residential — easy trade supply",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Water repellent treatment to masonry facades after structural repairs and repointing are complete",
    "Supplementary protection on exposed masonry parapets, piers and wind-driven rain faces",
    "Treatment of concrete masonry block and brick facades to reduce chloride ingress in coastal locations",
    "Heritage masonry water repellent treatment where breathability must be maintained",
    "Post-salt-attack remediation treatment to reduce future water and chloride ingress into repaired masonry",
  ],
  selectionCriteria: [
    "Silane treatment is supplementary — all structural defects, cracks, and failed joints must be repaired before treatment",
    "Substrate must be dry — minimum 48–72 hours no rain; substrate moisture below 4–6% by weight before application",
    "Confirm the product is a true penetrating silane — not a surface film silicone — by reviewing the TDS penetration depth claim",
    "Apply as a flood coat — surface must be saturated; brush-on as for paint is insufficient for adequate penetration",
    "For occupied buildings or confined areas, specify a water-based silane (Antipluviol S or equivalent) to reduce solvent odour",
    "For critical concrete protection (reinforcement corrosion), specify a specialist-grade silane with confirmed penetration depth data",
  ],
  limitations: [
    "Does not seal cracks — any crack wider than approximately 0.1 mm will allow water entry regardless of silane treatment",
    "Will not stop rising damp or below-ground moisture — silane is a facade water repellent only",
    "Ineffective on painted, coated, or contaminated surfaces — must penetrate bare masonry pore structure",
    "Do not apply in direct sunlight when surface temperature exceeds 30°C — carrier evaporates before penetration occurs",
    "Do not apply to frozen surfaces or when frost is forecast within 24 hours of application",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — references water repellent treatment as supplementary protection",
    "BS EN 13580 — Products and systems for protection and repair of concrete — test method for water absorption after impregnation",
    "CCAA Data Sheet — Water Repellent Treatments for Concrete — guidance on silane selection and application",
    "Manufacturer TDS — confirm penetration depth, substrate moisture limit, and coverage rate before specifying",
  ],
  suitableDefects: [
    "Porous or absorbent masonry facade where water ingress occurs through the pore structure (not through cracks or open joints)",
    "Wind-driven rain penetration on exposed elevations where masonry porosity is confirmed as the ingress mechanism",
    "Efflorescence caused by water cycling through porous masonry — treat after eliminating salts and repointing",
    "Post-remediation treatment to reduce recurrence of water-related deterioration after structural repairs are complete",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — bare, dry, unpainted surface required — flood coat application method",
    "Concrete masonry units (block) — unpainted face required — flood coat to saturation",
    "Concrete — bare, dry concrete — specialist grade silane (Protectosil) recommended for corrosion protection",
    "Render and textured masonry coatings — confirm product compatibility with the render type before specifying",
    "NOT suitable: painted or coated surfaces — the coating blocks silane penetration; strip coating before treatment",
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
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

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
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
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
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

export function SilaneRepellentIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are penetrating silane water repellents?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetrating silane water repellents are alkylalkoxysilane compounds that penetrate into the pore structure of masonry and concrete and polymerise in-situ to form a hydrophobic lining. Unlike surface coatings, they do not form a film on the surface — they chemically bond within the pore walls, cannot peel or blister, and maintain the vapour permeability of the substrate. They reduce liquid water absorption by up to 95% while remaining fully breathable.
        </p>
        {expanded && (
          <>
            <p>
              Silane water repellent is a supplementary treatment — it does not seal cracks, repair open mortar joints, or substitute for structural repairs. All defects must be repaired and the substrate must be fully cured and dry before silane treatment is applied. The fundamental application requirement is a flood coat: the surface must be saturated to allow the silane to penetrate under gravity and capillary action. Brush-on as for paint is insufficient.
            </p>
            <p>
              Product selection depends on substrate type and site constraints. Solvent-borne silanes (Sika Protectosil) provide the deepest penetration on dense substrates but have high VOC and solvent odour — a constraint in occupied strata buildings. Water-based silane emulsions (Mapei Antipluviol S) provide good penetration on porous substrates at lower VOC, and are the preferred option where residents are present. The treated surface should be acceptance-tested with a water drop test (RILEM tube) after 7 days cure — a drop placed on the treated surface should not penetrate within 60 minutes.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function SilaneRepellentProductSection() {
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
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

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
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
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
            <p className="mt-1 text-sm text-slate-500">3 product systems — penetrating silane water repellents — scroll to view all</p>
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
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
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
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
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
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of penetrating silane water repellent systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Carrier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Penetration</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Breathable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">VOC</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coverage</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Reapplication</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.carrier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.penetration}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.breathable}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.voc}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coverageLitre}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.reapplication}</td>
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
