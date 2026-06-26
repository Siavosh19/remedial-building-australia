"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { DataNote } from "@/app/repair-systems/_components/ProductPageShared";

type FilterTag =
  | "Silicone-primer"
  | "PU-primer"
  | "Universal"
  | "Porous-substrate"
  | "Non-porous"
  | "Metal"
  | "Glass"
  | "Concrete-masonry"
  | "Plastics-coatings"
  | "Solvent-based"
  | "Water-based";

type Product = {
  fullLabel: string;
  brandUrl: string;
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
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    accentColor: "#D2000F",
    name: "Sika Primer-215",
    descriptionLine: "Solvent-based polyurethane solution adhesion primer for Sikaflex adhesives and sealants on plastics and wood — GRP, epoxy resins, PVC, ABS, timber and concrete",
    productType: "Solvent-based PU solution primer — plastics, wood and concrete",
    filterTags: ["PU-primer", "Porous-substrate", "Concrete-masonry", "Plastics-coatings", "Solvent-based"],
    techChips: [
      { label: "Sika PU primer", cls: "bg-red-50 text-red-700" },
      { label: "Plastics, wood, concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "GRP, PVC, ABS, timber", cls: "bg-slate-100 text-slate-700" },
      { label: "Solvent-based", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Primer-215 is a solvent-based polyurethane solution primer specifically formulated for the treatment of bond faces prior to application of Sikaflex adhesives and sealants on plastics and wood substrates including GRP, epoxy resins, PVC, ABS, timber, and concrete. It is not limited to masonry/concrete — it is primarily a plastics and timber primer for Sikaflex PU sealant systems. It reacts with moisture to form a thin bonding layer. Applied by brush to the cleaned substrate, allowed to flash off (≥ 30 minutes at ≥15°C; ≥ 60 minutes below 15°C), then the Sikaflex sealant is applied within the open time window. Preliminary tests on original substrates under production conditions are recommended as plastic compatibility varies. Confirm compatible sealant products and application window from the current Sika AU TDS.",
    technicalProperties: [
      "Single-component solvent-based polyurethane solution primer — reacts with moisture to form bonding layer",
      "Suitable substrates: GRP, epoxy resins, PVC, ABS, timber and concrete",
      "Flash-off time ≥30 min at ≥15°C; ≥60 min below 15°C",
      "Transparent after cure — suitable for Sikaflex PU adhesive and sealant systems",
      "Preliminary tests on original substrates recommended — plastic compatibility varies",
    ],
    limitations: [
      "Confirm this is the correct primer for the specific Sikaflex product and substrate — cross-check from current Sika AU TDS",
      "Do not apply sealant if primer is still wet — flash-off must be complete",
      "Do not apply sealant if dust has contaminated primed surface — re-prime before proceeding",
      "Solvent-based — adequate ventilation required during application — PPE required",
      "Confirm primer and sealant compatibility from current Sika TDS before application",
    ],
    procurementSources: [
      { name: "Sika Australia — aus.sika.com", url: "https://aus.sika.com" },
      { name: "Sika trade distributors and building material suppliers nationwide", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    accentColor: "#D2000F",
    name: "Sika Primer-3 N",
    descriptionLine: "Solvent-based epoxy resin one-component adhesion primer for Sikaflex, SikaHyflex, SikaBond, SikaSeal and Sikasil products on porous substrates and metals — concrete, masonry, mortar and metal",
    productType: "Solvent-based epoxy resin primer — porous substrates and metal",
    filterTags: ["Silicone-primer", "PU-primer", "Porous-substrate", "Non-porous", "Metal", "Concrete-masonry", "Solvent-based"],
    techChips: [
      { label: "Sika epoxy resin primer", cls: "bg-red-50 text-red-700" },
      { label: "Porous substrates + metal", cls: "bg-slate-100 text-slate-700" },
      { label: "Concrete, masonry, mortar", cls: "bg-sky-50 text-sky-700" },
      { label: "Solvent-based", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Primer-3 N is a 1-component solvent-based epoxy resin compound primer for porous substrates and metal, designed for use with Sikaflex, SikaHyflex, SikaBond, SikaSeal and Sikasil products. It is not limited to non-porous or silicone-only applications — it is used on porous substrates (concrete, masonry, aerated concrete, cement renders, mortar, bricks) and on metal substrates. Flash-off time is ≥30 minutes (< 8 hours) for porous and metal substrates before sealant application. Application must follow the TDS for the specific Sika sealant being used, as the primer must be matched to the sealant system.",
    technicalProperties: [
      "1-component solvent-based epoxy resin compound primer for porous substrates and metal",
      "Suitable substrates: concrete, aerated concrete, cement renders, mortar, bricks and metal",
      "Designed for use with Sikaflex, SikaHyflex, SikaBond, SikaSeal and Sikasil product ranges",
      "Flash-off time ≥30 min (< 8 hours) — apply sealant within this window",
      "Single-component — no mixing required — brush application",
    ],
    limitations: [
      "Confirm this is the correct primer for the specific Sika sealant and substrate — always confirm from current Sika AU TDS",
      "Flash-off time must be followed precisely — sealant application window is critical",
      "Do not contaminate primed surface before sealant application — re-prime if contaminated",
      "Solvent-based — PPE and adequate ventilation required during application",
    ],
    procurementSources: [
      { name: "Sika Australia — aus.sika.com", url: "https://aus.sika.com" },
      { name: "Sika trade distributors nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Dow",
    brandUrl: "https://www.dow.com",
    accentColor: "#0066cc",
    name: "Dow Corning PR-1200",
    descriptionLine: "One-step adhesion primer for Dow silicone sealants on glass, metal and masonry substrates",
    productType: "Silicone primer",
    filterTags: ["Silicone-primer", "Non-porous", "Metal", "Glass", "Concrete-masonry", "Solvent-based"],
    techChips: [
      { label: "Dow silicone primer", cls: "bg-sky-100 text-sky-800" },
      { label: "Glass & metal", cls: "bg-slate-100 text-slate-700" },
      { label: "One-step", cls: "bg-amber-50 text-amber-700" },
      { label: "Structural glazing", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Dow Corning PR-1200 OS Primer is a one-component adhesion promoter for use with Dow Corning silicone sealants on glass, metal (anodised, powder-coated, stainless), painted surfaces, ceramic and concrete substrates. Widely used in structural glazing, curtain wall and facade remediation where Dow Corning 795 or other Dow structural silicone sealants are being used. Application must follow the Dow 795 or applicable sealant TDS — primer and sealant must be a matched system. Confirm current product name and formulation with Dow Australia.",
    technicalProperties: [
      "Single-component organosilane primer — suitable for glass, anodised aluminium, stainless steel, ceramic, concrete and masonry",
      "Transparent and non-staining after cure",
      "Works as adhesion promoter for structural glazing applications",
      "Typically requires 30–60 min flash before sealant application — confirm from TDS",
    ],
    limitations: [
      "Must be used with matched Dow silicone sealant — cross-brand use without compatibility testing is not recommended",
      "Not suitable for use with PU or polysulfide sealants",
      "Confirm current product name — Dow product range may have been updated since this reference was written",
      "PPE and ventilation required during application",
    ],
    procurementSources: [
      { name: "Dow Australia — dow.com", url: "https://www.dow.com" },
      { name: "Structural glazing and facade trade distributors", url: "https://www.dow.com" },
      { name: "Glazing sealant trade supply houses", url: "https://www.dow.com" },
    ],
  },
  {
    fullLabel: "Tremco",
    brandUrl: "https://www.tremcosealants.com/au",
    accentColor: "#005EB8",
    name: "Tremco Primer No. 12",
    descriptionLine: "Solvent-based adhesion primer for Tremco silicone and modified sealant systems on concrete, masonry, metal and glass substrates — clear and non-staining after cure",
    productType: "Solvent-based sealant primer — concrete, masonry, metal and glass",
    dataNote: "Owner to confirm — Tremco Primer No. 12 is not listed on the current Tremco Australia product page (tremco.com.au). The current AU Tremco primer range includes TREMprime Non-Porous Primer, Vulkem 171 / 191 QD Primer and TREMprime EP. Confirm the correct current AU product name for the specific sealant and substrate with Tremco Australia before specifying; the description here is based on general product-category knowledge and must be verified against the current Tremco Australia TDS.",
    filterTags: ["Silicone-primer", "PU-primer", "Universal", "Porous-substrate", "Non-porous", "Concrete-masonry", "Metal", "Solvent-based"],
    techChips: [
      { label: "TODO: confirm product name", cls: "bg-blue-100 text-blue-800" },
      { label: "Concrete & masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "Metal & glass", cls: "bg-slate-100 text-slate-700" },
      { label: "Silicone & modified", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — Tremco Primer No. 12 is not listed on the current Tremco Australia product page (tremco.com.au). The current Australian Tremco sealant primer product range includes TREMprime Non-Porous Primer (one-part primer for metal or plastic substrates for Tremco PU sealants), Vulkem 171 Primer and Vulkem 191 QD Primer (for Vulkem PU sealant systems), and TREMprime EP. Confirm the correct current AU Tremco primer for the specific sealant and substrate before specifying. The general description that follows is based on general product category knowledge and must be confirmed from the current Tremco Australia TDS.",
    technicalProperties: [
      "TODO: owner confirm — Primer No. 12 not found on current Tremco AU product list — verify with Tremco Australia",
      "Solvent-based adhesion primer — suitable for Tremco silicone and modified sealant systems",
      "Suitable for concrete, masonry, metal and glass substrates",
      "Provides improved adhesion on difficult substrates — clear and non-staining after cure",
    ],
    limitations: [
      "TODO: owner confirm — verify current AU product name before specifying",
      "Tremco system-specific — do not use with non-Tremco sealants without testing",
      "Solvent-based — PPE and adequate ventilation required",
      "Flash-off and sealant application window must be followed from TDS",
      "Contaminated primed surface must be re-primed before sealant application",
    ],
    procurementSources: [
      { name: "Tremco Australia — tremcosealants.com.au", url: "https://www.tremcosealants.com/au" },
      { name: "Facade and sealant trade distributors", url: "https://www.tremcosealants.com/au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silicone-primer", label: "Silicone-primer" },
  { id: "PU-primer", label: "PU-primer" },
  { id: "Universal", label: "Universal" },
  { id: "Concrete-masonry", label: "Concrete-masonry" },
  { id: "Metal", label: "Metal" },
  { id: "Glass", label: "Glass" },
  { id: "Non-porous", label: "Non-porous" },
];

const BRAND_EQUIV: {
  useCase: string;
  sika215: string;
  sika3n: string;
  dowPr1200: string;
  tremcoNo12: string;
}[] = [
  { useCase: "PU sealant on concrete/masonry", sika215: "✓ (confirm TDS)", sika3n: "✓ (confirm TDS)", dowPr1200: "—", tremcoNo12: "TODO: confirm" },
  { useCase: "Sika sealant on plastics/GRP/PVC", sika215: "✓", sika3n: "—", dowPr1200: "—", tremcoNo12: "TODO: confirm" },
  { useCase: "Structural glazing silicone", sika215: "—", sika3n: "Confirm per TDS", dowPr1200: "✓", tremcoNo12: "TODO: confirm" },
  { useCase: "General concrete/masonry", sika215: "✓ (concrete)", sika3n: "✓", dowPr1200: "✓", tremcoNo12: "TODO: confirm" },
  { useCase: "Metal/anodised aluminium", sika215: "—", sika3n: "✓", dowPr1200: "✓", tremcoNo12: "TODO: confirm" },
];

const SYSTEM_COMPARISON: {
  row: string;
  sika215: string;
  sika3n: string;
  dowPr1200: string;
  tremcoNo12: string;
}[] = [
  { row: "Chemistry", sika215: "Solvent-based PU solution", sika3n: "Solvent-based epoxy resin", dowPr1200: "Organosilane", tremcoNo12: "TODO: confirm AU product" },
  { row: "Target sealant", sika215: "Sikaflex PU adhesives/sealants", sika3n: "Sikaflex, SikaHyflex, Sikasil, SikaBond", dowPr1200: "Dow silicone", tremcoNo12: "TODO: confirm AU product" },
  { row: "Porous substrates", sika215: "Yes (concrete, timber, GRP)", sika3n: "Yes (concrete, masonry, mortar)", dowPr1200: "Yes", tremcoNo12: "TODO: confirm" },
  { row: "Non-porous substrates", sika215: "Yes (PVC, ABS, GRP)", sika3n: "Yes (metal)", dowPr1200: "Yes", tremcoNo12: "TODO: confirm" },
  { row: "Structural glazing", sika215: "No", sika3n: "Confirm per TDS", dowPr1200: "Yes", tremcoNo12: "TODO: confirm" },
  { row: "Flash-off time", sika215: "≥30 min (≥15°C); ≥60 min (<15°C)", sika3n: "≥30 min (<8 hours)", dowPr1200: "30–60 min", tremcoNo12: "TODO: confirm AU TDS" },
  { row: "Solvent/water", sika215: "Solvent", sika3n: "Solvent", dowPr1200: "Solvent", tremcoNo12: "TODO: confirm" },
];

const TECH_INFO = {
  whyPrimerMatters: [
    "Sealant adhesion failure is the primary cause of movement joint sealant failure in Australian Class 2 and commercial building remediation",
    "Without correct primer, many sealants will not chemically bond to the substrate — they may appear to stick initially but peel under movement or water",
    "Primers function by chemically modifying the substrate surface to create reactive sites that bond with the sealant polymer during cure",
    "Silane and organosilane primers form a molecular bridge between inorganic substrates (concrete, glass, metal) and organic sealant polymers",
    "Isocyanate-based PU primers react with moisture in porous substrates to create a bonding layer for polyurethane sealant systems",
  ],
  flashOffTime: [
    "Flash-off is the period after primer application during which the solvent evaporates and the primer activates — the sealant must not be applied until flash-off is complete",
    "Applying sealant too soon — while primer is still wet — traps solvent under the sealant, preventing adhesion and causing bubbling or blistering",
    "Applying sealant too late — after the primer open time has expired — results in a deactivated primer surface that cannot bond the sealant",
    "Flash-off time varies with temperature and humidity — hot dry conditions accelerate flash-off, cool humid conditions slow it",
    "Always confirm the exact flash-off and open time window from the current manufacturer TDS — do not estimate from memory or previous experience",
  ],
  systemSpecificPairing: [
    "Every sealant manufacturer specifies particular primers for particular sealants on particular substrates — this is not interchangeable",
    "Using a Sika primer with a Dow sealant, or a Dow primer with a Tremco sealant, is not supported — cross-brand use can result in no adhesion",
    "Even within one brand, different sealant chemistries require different primers — Sika PU sealants need Primer-215; Sika silicone sealants need Primer-3N",
    "System warranty from sealant manufacturers typically requires the full matched system — primer, backing rod, sealant — from the same brand family",
    "When in doubt, contact the sealant manufacturer technical team before application — they can confirm the correct primer for the exact sealant and substrate combination",
  ],
  surfacePreparation: [
    "Primer is not a substitute for proper substrate preparation — it is the final step after thorough cleaning, not a fix for dirty or contaminated surfaces",
    "Substrates must be clean, dry, sound and free from dust, oil, grease, release agents, laitance and existing sealant residue before primer application",
    "Porous substrates (concrete, masonry) must be within the manufacturer's moisture limits — saturated or damp substrates prevent primer penetration",
    "Non-porous substrates (glass, metal, aluminium) must be wiped clean with the solvent or cleaner specified in the TDS — not just water",
    "Re-prime any primed surface that has been contaminated — dust, rain, or foot traffic over a primed surface before sealant application requires re-priming",
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

export function SealantPrimersIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are sealant adhesion primers?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Sealant adhesion primers are chemical surface treatments applied to joint substrates immediately before sealant installation to promote adhesion between the sealant and substrate. They are not optional on most substrates — without the correct primer, sealants that appear bonded at installation will fail adhesively under movement, thermal cycling or water exposure. Primer selection is sealant-system-specific: the primer must be matched to the exact sealant chemistry (silicone, PU, polysulfide), the sealant brand, and the substrate type. A primer that works for one sealant system on one substrate will not necessarily work — and may actively interfere — with a different sealant on the same substrate.
        </p>
        <p>
          Different sealant chemistries fundamentally require different primer chemistries. Polyurethane sealants require isocyanate or reactive silane primers that penetrate porous substrates. Silicone sealants on non-porous or difficult substrates require organosilane primers. Cross-brand and cross-chemistry use of primers is not supported by manufacturers and is a known cause of accelerated sealant adhesion failure in Australian Class 2 and commercial building remediation.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Concrete bonding agents (e.g. SBR bonding agents, epoxy bonding agents) — used to bond concrete repair mortars to existing concrete — not for sealant substrate priming",
            "Waterproofing membrane primers — used under liquid-applied waterproofing membranes — different product for a different purpose — not sealant primers",
            "Paint primers — used under decorative coatings — not suitable for sealant substrates and may prevent sealant adhesion",
            "Sealant backing rod — polyethylene foam bond breaker — joint component, not a primer — used together with, not instead of, primer",
            "Sealant accelerators — products that speed sealant cure — different from adhesion primers — do not substitute one for the other",
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

export function SealantPrimersProductSection() {
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
              Why primer matters, flash-off time, system-specific pairing and surface preparation
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
            <div className="grid gap-6 md:grid-cols-2">
              <TechCard icon={<Layers size={15} />} title="Why primer matters" items={TECH_INFO.whyPrimerMatters} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Flash-off time" items={TECH_INFO.flashOffTime} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="System-specific pairing" items={TECH_INFO.systemSpecificPairing} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Surface preparation" items={TECH_INFO.surfacePreparation} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — sealant adhesion primers — scroll to view all</p>
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
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3 space-y-2">
                  {product.dataNote && <DataNote text={product.dataNote} />}
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
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents — by Use Case</h2>
            <p className="mt-1 text-sm text-slate-500">
              Primer selection by substrate and sealant type. Always confirm correct primer from current manufacturer TDS — primers are sealant-system-specific.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  Use case
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Sika Primer-215</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Sika Primer-3 N</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#0066cc" }}>Dow PR-1200</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#005EB8" }}>Tremco No. 12</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.useCase} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.useCase}
                  </td>
                  {[row.sika215, row.sika3n, row.dowPr1200, row.tremcoNo12].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? (
                        <span className="text-slate-300">—</span>
                      ) : (
                        <span className="font-bold text-green-600">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Technical comparison across the four listed primer products. Confirm all values from current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  Property
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Sika 215</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#D2000F" }}>Sika 3N</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#0066cc" }}>Dow PR-1200</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#005EB8" }}>Tremco No. 12</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.row} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.row}
                  </td>
                  {[row.sika215, row.sika3n, row.dowPr1200, row.tremcoNo12].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Critical callout — BELOW comparison table ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical — Primer is Sealant-System-Specific</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Always use the primer recommended by the sealant manufacturer for the exact sealant product and substrate combination — primer selection is not generic",
            "Using the wrong primer — or omitting primer — is the primary preventable cause of sealant adhesion failure on Australian Class 2 and commercial building remediation sites",
            "Cross-brand primer and sealant combinations are not supported — a Sika primer will not substitute for a Dow primer under a Dow sealant, and vice versa",
            "Flash-off and open time must be followed precisely — both too short and too long a wait before sealant application can result in adhesion failure",
            "Confirm all primer products from current manufacturer TDS — product names, formulations and recommendations are subject to change",
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
