"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Siloxane"
  | "Silane-siloxane"
  | "Cream"
  | "Water-based"
  | "Solvent-based"
  | "Penetrating"
  | "Brick"
  | "Masonry"
  | "Render"
  | "Mortar-joint"
  | "Heritage"
  | "Colourless"
  | "External"
  | "1C";

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
    fullLabel: "Safeguard Europe / Alexander Watson Australia",
    brandUrl: "https://www.stormdry.com.au",
    accentColor: "#1e3a8a",
    name: "Stormdry Masonry Protection Cream",
    descriptionLine: "Silane/siloxane cream — penetrating water repellent for brick and masonry facades — widely specified in Australia for penetrating damp",
    productType: "Penetrating silane/siloxane cream",
    filterTags: ["Silane-siloxane", "Cream", "Penetrating", "Brick", "Masonry", "Mortar-joint", "Heritage", "Colourless", "External", "1C"],
    techChips: [
      { label: "Silane/siloxane cream", cls: "bg-sky-100 text-sky-800" },
      { label: "Cream consistency", cls: "bg-green-50 text-green-700" },
      { label: "Heritage compatible", cls: "bg-amber-50 text-amber-700" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Stormdry Masonry Protection Cream by Safeguard Europe (distributed in Australia by Alexander Watson, Mitchell ACT) is the leading silane/siloxane cream penetrating water repellent for brick masonry facades in Australia. The cream consistency is a key advantage over liquid silane products for brick and mortar joint applications — the cream stays in contact with the masonry surface during the dwell period, allowing the active silane/siloxane chemistry to penetrate into the brick, mortar joints and raked joints before the product fully penetrates or evaporates.\n\nStormdry is specifically formulated for brick masonry facades where penetrating damp is occurring through the fabric of the wall and through open or deteriorated mortar joints. The product has been widely used in the UK, Europe and Australia on brick veneer facades, solid brick walls and heritage masonry where a colourless, vapour-permeable water repellent treatment is required. It does not change the appearance of the masonry and leaves no visible surface film.\n\nIn Australian Class 2 strata remediation, Stormdry Masonry Protection Cream is specified on brick veneer facades with damp penetration behind the brick skin, particularly on south-facing and wind-driven rain exposed elevations. The cream is applied by brush and worked into the masonry surface, with excess removed from window frames and non-masonry elements. Confirm current product specification and application requirements with Wykamol Australia before specifying.",
    technicalProperties: [
      "Silane/siloxane blend — cream consistency — stays on the masonry surface during dwell period for maximum penetration into brick and mortar joints",
      "Penetrates brick and mortar joints — including raked, weathered and open mortar joints — providing water repellency across the full masonry face",
      "Colourless — no surface film — does not change the appearance of the masonry after treatment",
      "Vapour-permeable — the masonry remains breathable after treatment — moisture vapour can escape outward through the wall",
      "BBA Agrement certified — a recognised third-party approval providing documented evidence of product performance",
      "Compatible with soft historic brick, sandstone and calcium silicate masonry — confirm suitability with Alexander Watson (AU distributor) for specific heritage masonry types",
      "BBA Agrement certified (25-year durability certificate) — covers Stormdry Masonry Protection Cream and repointing additives",
      "Coverage: 5 L pack covers approximately 25 m²",
    ],
    limitations: [
      "Substrate must be dry before application — do not apply to wet or rain-wet masonry — damp penetrating through the wall during application will block product penetration",
      "Efflorescence, algae, moss and biological growth must be cleaned off before application — contamination blocks product penetration into the masonry pore structure",
      "Not suitable for masonry with active water ingress under hydrostatic pressure — cream sealer provides water repellency only, not waterproofing",
      "Discrete cracks, failed mortar joints and open bed joints must be repointed before application — the cream does not bridge cracks or fill open joints",
      "Re-application may be required over time depending on UV exposure, pollution and the specific masonry substrate — BBA certificate indicates 25-year effectiveness",
      "Confirm current product specification, application method and availability with Alexander Watson (AU distributor) before specifying",
    ],
    procurementSources: [
      { name: "Alexander Watson — Australian distributor — stormdry.com.au — 02 6181 2750", url: "https://www.stormdry.com.au" },
      { name: "Building remediation suppliers — confirm regional availability", url: "https://www.stormdry.com.au" },
    ],
  },
  {
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#1a5276",
    name: "Remmers Funcosil SNL",
    descriptionLine: "Solvent-based silane/siloxane penetrating impregnation for brick, render and masonry — Remmers Funcosil range — approximately 7% active ingredient by mass — ready-to-use (not a concentrate)",
    productType: "Penetrating silane/siloxane sealer — solvent-based",
    filterTags: ["Siloxane", "Silane-siloxane", "Solvent-based", "Penetrating", "Brick", "Masonry", "Render", "Mortar-joint", "Colourless", "External", "1C"],
    techChips: [
      { label: "Silane/siloxane blend", cls: "bg-sky-100 text-sky-800" },
      { label: "Solvent-based", cls: "bg-amber-50 text-amber-700" },
      { label: "TODO: confirm WTA reference from AU TDS", cls: "bg-red-50 text-red-700" },
      { label: "Render compatible", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Remmers Funcosil SNL is a SOLVENT-BASED silane/siloxane penetrating impregnation from the Remmers Funcosil range. The carrier is dearomatised hydrocarbons (not water), with approximately 7% active silane/siloxane ingredient by mass. The product is ready-to-use — it is not a concentrate and should not be diluted. It is applied by the flow-coat method (wet-on-wet application) to achieve adequate saturation of the substrate pore structure.\n\nFuncosil SNL penetrates brick, masonry, mineral render and concrete surfaces, reacting in place to create a hydrophobic lining within the substrate pore structure. The solvent carrier provides effective penetration into dense substrates. Being solvent-based, standard PPE and ventilation precautions apply — confirm current SDS requirements before specifying on occupied or enclosed sites.\n\nTODO: owner confirm — WTA Merkblatt reference for Funcosil SNL not confirmed from live AU source. Confirm coverage rate, application rate per substrate type and current system documentation with Remmers Australia before specifying. Source: remmers.com product page (solvent-based carrier confirmed; 7% active ingredient confirmed).",
    technicalProperties: [
      "Solvent-based silane/siloxane impregnation — carrier: dearomatised hydrocarbons — approximately 7% active ingredient by mass — source: remmers.com",
      "Ready-to-use — do NOT dilute — apply neat by flow-coat (wet-on-wet) method to ensure full substrate saturation",
      "Penetrates brick, masonry, mineral render and concrete surfaces — creates hydrophobic lining within substrate pore structure",
      "TODO: owner confirm — WTA Merkblatt reference (e.g. WTA 3-17 or equivalent) not confirmed from live AU source — verify with Remmers Australia",
      "Colourless — no surface film — substrate appearance unchanged after treatment",
      "Vapour-permeable — treated substrate continues to breathe — moisture vapour can escape outward",
      "Coverage rate: 0.2–1.5 L/m² depending on substrate porosity — confirm with Remmers Australia for specific substrate",
    ],
    limitations: [
      "Solvent-based — PPE and ventilation requirements apply — confirm current SDS before specifying on occupied or enclosed sites",
      "Substrate must be dry before application — do not apply to wet or rain-saturated masonry",
      "Biological growth and efflorescence must be cleaned and treated before application",
      "Not suitable for masonry with active water ingress under positive hydrostatic pressure",
      "Ready-to-use product — do not dilute — dilution will reduce active ingredient concentration and compromise penetration depth",
      "Confirm current product specification, system documentation and technical support with Remmers Australia before specifying",
    ],
    procurementSources: [
      { name: "Remmers Australia — trade supply — contact for current pricing", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#cc0000",
    name: "Sika Sikagard-680 S",
    descriptionLine: "TODO: owner confirm — Sikagard-680 S appears to be an acrylic/methacrylic resin surface protective COATING, NOT a penetrating silane/siloxane sealer — verify correct current Sika AU penetrating sealer product (e.g. Sikagard-700 S or Sikagard-850 SL) with Sika Australia technical before specifying",
    productType: "TODO: owner confirm — product type incorrect — see system description",
    filterTags: ["Silane-siloxane", "Solvent-based", "Penetrating", "Brick", "Masonry", "Render", "Colourless", "External", "1C"],
    techChips: [
      { label: "TODO: confirm product type — may not be a penetrating sealer", cls: "bg-red-50 text-red-700" },
      { label: "TODO: confirm with Sika AU technical", cls: "bg-amber-50 text-amber-700" },
      { label: "Sika brand", cls: "bg-red-50 text-red-700" },
      { label: "National distribution", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "TODO: owner confirm — CRITICAL PRODUCT TYPE ERROR: Research from live sources indicates that Sika Sikagard-680 S is a methacrylic/acrylic resin protective surface COATING for concrete, providing anti-carbonation and surface protection — it is NOT a penetrating silane/siloxane water repellent sealer. Including it on this penetrating sealer page appears to be incorrect.\n\nFrom search results: Sikagard-680 S is described as 'a one-component solvent-containing coating based on acrylic resin' and 'a methacrylic resin protective and anti-carbonation coating for concrete'. This is a surface coating product — it forms a film on the substrate surface and is classified under EN 1504-2 surface protection coatings, not penetrating hydrophobisation.\n\nACTION REQUIRED: Owner to confirm with Sika Australia technical the correct current product name for a Sika penetrating silane/siloxane water repellent sealer for brick and masonry facades. Likely candidates may include Sikagard-700 S (silane) or Sikagard-850 SL — but product names and availability must be confirmed with Sika AU before specifying. This card should either be replaced with the correct Sika penetrating sealer product, or removed from this page and replaced with a Sika anti-carbonation coating entry on the appropriate page.",
    technicalProperties: [
      "TODO: owner confirm — all technical properties below are unverified and may apply to an acrylic surface coating, not a penetrating silane/siloxane sealer",
      "TODO: confirm correct Sika AU penetrating sealer product name with Sika Australia technical",
      "TODO: confirm product classification (EN 1504-2 penetrating hydrophobisation vs surface protection coating)",
      "Sika national distribution — available through Sika trade channels across all Australian states",
      "TODO: confirm application method, coverage rate, substrate compatibility and limitations with Sika Australia for the correct penetrating sealer product",
    ],
    limitations: [
      "TODO: owner confirm — this product card appears to reference the wrong Sika product — Sikagard-680 S is a surface protective coating, not a penetrating sealer",
      "TODO: remove or replace this card with the correct Sika AU penetrating silane/siloxane sealer product after confirming with Sika Australia technical",
      "Confirm current product specification, classification, application rate and technical support with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Sika national distribution network — confirm regional availability", url: "https://aus.sika.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Siloxane", label: "Siloxane" },
  { id: "Silane-siloxane", label: "Silane/siloxane blend" },
  { id: "Cream", label: "Cream product" },
  { id: "Water-based", label: "Water-based" },
  { id: "Solvent-based", label: "Solvent-based" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Brick", label: "Brick" },
  { id: "Masonry", label: "Masonry" },
  { id: "Render", label: "Render" },
  { id: "Mortar-joint", label: "Mortar joints" },
  { id: "Heritage", label: "Heritage compatible" },
  { id: "Colourless", label: "Colourless" },
];

const BRAND_EQUIV: { system: string; safeguard: string; remmers: string; sika: string }[] = [
  { system: "Silane/siloxane cream — brick and mortar joint penetration", safeguard: "Stormdry Cream", remmers: "—", sika: "—" },
  { system: "Solvent-based silane/siloxane impregnation — brick, masonry and render", safeguard: "—", remmers: "Funcosil SNL", sika: "—" },
  { system: "TODO: confirm correct Sika AU penetrating sealer product — Sikagard-680 S is a surface coating", safeguard: "—", remmers: "—", sika: "TODO: confirm with Sika AU*" },
];

const TECH_INFO = {
  typicalApplications: [
    "Brick masonry facades with rain-driven penetrating damp — the primary application for siloxane and cream sealers in Australian Class 2 strata remediation",
    "External rendered masonry walls with penetrating damp where the render itself is sound but absorbing water through fine cracks and the porous render surface",
    "Heritage masonry facades — soft brick, sandstone, calcium silicate — where silane/siloxane cream is preferred over liquid silane for compatibility and penetration control",
    "Masonry walls with raked or open mortar joints where the joints are a primary pathway for rain-driven moisture ingress",
    "South-facing or wind-driven-rain exposed facades of Class 2 strata buildings with chronic penetrating damp complaints from ground-floor or lower-level apartments",
  ],
  selectionCriteria: [
    "Silane/siloxane cream is the best choice for brick masonry with open or raked mortar joints — the cream consistency provides better mortar joint penetration than liquid products",
    "Water-based siloxane (Remmers Funcosil SNL) is preferred on occupied sites where VOC and solvent odour are a concern — lower PPE requirements",
    "Solvent-based silane/siloxane (Sikagard-680 S) provides deeper penetration into concrete and dense masonry than water-based products",
    "For heritage or heritage-adjacent masonry, confirm compatibility of the specific product with the substrate with Alexander Watson (Stormdry AU distributor) or Remmers technical before specifying",
    "Confirm all other moisture pathways (cracking, failed mortar joints, window perimeter sealants, membrane failure) have been identified and addressed before applying penetrating sealer",
  ],
  limitations: [
    "Penetrating siloxane sealers treat moisture absorption through the intact masonry fabric — they do not waterproof cracks, failed joints or membrane penetrations",
    "Service life in aggressive coastal or pollution-affected environments may be shorter — confirm expected service life with manufacturer for the specific exposure",
    "Water-based siloxane products have lower penetration depth than solvent-based formulations in dense substrates — confirm suitability for dense concrete or engineering brick",
    "Re-treatment may be required after 5–15 years depending on exposure conditions, substrate type and product selection",
  ],
  standardsNotes: [
    "AS 4548 — Guide to Long-Life Coatings for Concrete and Masonry — Australian standard for concrete and masonry protection systems",
    "EN 1504-2 — European standard for surface protection products for concrete — referenced on European product data sheets",
    "WTA Merkblatt guidelines — WTA Institute guidelines for penetrating damp and facade water repellency — referenced on Remmers products",
    "BBA Agrement certification — British Board of Agrement — Stormdry Masonry Protection Cream holds BBA certification",
  ],
  suitableDefects: [
    "Penetrating damp through brick masonry facades — rain-driven moisture appearing as damp patches on internal walls corresponding to rain events",
    "Efflorescence and salt bloom on brick masonry facades driven by moisture cycling through the masonry fabric",
    "Damp mortar joints — mortar acting as the primary pathway for rain-driven moisture into cavity or solid brick walls",
    "Porous render absorbing rain — fine cracking and paint failure on external rendered facades caused by repeated wetting and drying cycles",
  ],
  typicalSubstrates: [
    "Fired clay brick — standard Australian red brick — the primary substrate for siloxane and cream sealer treatment in strata remediation",
    "Calcium silicate brick — confirm product suitability with manufacturer for this specific substrate type",
    "Sandstock and handmade brick — heritage brick — confirm product and application method with manufacturer for soft porous brick",
    "Mineral cement render — exterior render on masonry walls — confirm product compatibility and application rate for specific render type",
    "Sandstone — confirm silane/siloxane compatibility with specific sandstone type — some sandstones require specialist assessment",
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

export function SiloxaneSealerIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are penetrating siloxane sealer systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Penetrating siloxane sealers are water-repellent treatments for masonry, brick and render that penetrate into the surface pores and react in place to create a hydrophobic lining within the substrate. Unlike film-forming sealers and coatings, siloxane sealers do not form a visible surface layer — the masonry appearance is unchanged and the substrate remains vapour-permeable after treatment.
        </p>
        <p>
          Siloxane molecules are larger than silane molecules, which makes them better suited to brick and mortar joints with more open pore structures. Silane/siloxane blend products combine the deep penetration of silane with the broader substrate compatibility of siloxane. Cream formulations (such as Stormdry) are particularly effective on brick facades because the cream consistency maintains contact with the masonry surface — including mortar joints, raked joints and uneven surfaces — for long enough to allow the active chemistry to fully penetrate before the product dries.
        </p>
        <p>
          Siloxane sealers are a primary tool for treating penetrating damp through brick masonry facades in Australian Class 2 strata buildings. They are specified where rain-driven moisture is entering through the pore structure of the masonry and mortar joints — particularly on exposed elevations subject to wind-driven rain — and where a colourless, breathable treatment is needed that does not change the facade appearance.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Penetrating silane sealers — smaller molecule, deeper penetration, better for dense concrete — see the silane sealer page",
            "Film-forming masonry sealers — acrylic or polyurethane — form a visible surface film — not vapour-permeable — different product category",
            "Crystalline waterproofing (Xypex, Penetron, Vandex) — for concrete under hydrostatic pressure — not a water repellent sealer",
            "Brick surface sealers and enhancers — impart a sheen or colour enhancement — different purpose from penetrating water repellency",
            "Anti-carbonation coatings — surface barrier for concrete protection — different product and purpose",
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

export function SiloxaneSealerProductSection() {
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
            <p className="mt-0.5 text-xs text-slate-500">Applications, substrate selection, cream vs liquid, limitations and standards</p>
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — siloxane and silane/siloxane penetrating sealers for brick, masonry and render facades</p>
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
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
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
            <p className="mt-1 text-sm text-slate-500">Siloxane and silane/siloxane sealer equivalents by product form and substrate. * TODO: owner confirm — Sikagard-680 S is a surface protective coating, not a penetrating sealer — confirm correct Sika AU penetrating sealer product with Sika Australia before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1e3a8a" }}>Safeguard / Alexander Watson</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1a5276" }}>Remmers</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#cc0000" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.safeguard, row.remmers, row.sika].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Repoint deteriorated mortar joints before applying penetrating sealer — the sealer does not fill joints</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Open, raked, cracked or soft mortar joints are the most common pathway for rain-driven penetrating damp in brick masonry facades — penetrating sealer alone will not adequately treat a wall with deteriorated mortar joints",
            "Failed mortar joints must be raked out and repointed with compatible mortar before the siloxane sealer is applied — the sealer is then applied over the completed repointing once the mortar has cured",
            "Window and door perimeter sealants, flashing and sill junctions must also be checked and repaired before applying the sealer — these are common secondary moisture pathways",
            "After repointing and perimeter joint repair, allow sufficient time for mortar to cure and the wall surface to dry before applying the siloxane sealer — wet substrates prevent product penetration",
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
