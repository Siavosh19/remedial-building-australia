"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Silane-cream"
  | "DPC-injection"
  | "Brick"
  | "Blockwork"
  | "Sandstone"
  | "Porous-masonry"
  | "High-porosity"
  | "Low-porosity"
  | "No-pressure"
  | "1C"
  | "BS-6576"
  | "WTA";

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
    fullLabel: "Safeguard Europe / Wykamol",
    brandUrl: "https://www.wykamol.com.au",
    tdsUrl: "https://www.wykamol.com.au",
    accentColor: "#1e3a8a",
    name: "Dryzone Damp-Proofing Cream",
    descriptionLine: "Silane-based cream chemical DPC injection — the market-leading rising damp treatment for Australian masonry",
    productType: "Silane cream DPC injection",
    filterTags: ["Silane-cream", "DPC-injection", "Brick", "Blockwork", "Sandstone", "Porous-masonry", "High-porosity", "No-pressure", "1C", "BS-6576"],
    techChips: [
      { label: "Silane cream", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "No pressure equipment", cls: "bg-green-50 text-green-700" },
      { label: "BS 6576", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dryzone Damp-Proofing Cream by Safeguard Europe (distributed through Wykamol Australia) is the most widely specified silane-based cream chemical DPC injection product in Australia and internationally. The product is injected into pre-drilled 12mm diameter horizontal holes spaced at approximately 100–120mm centres along a mortar bed joint 75–150mm above floor level. The silane chemistry releases an active n-butyltriethoxysilane compound that reacts with the alkalinity of the masonry, bonding to pore walls and creating a hydrophobic damp-proof barrier across the full depth of the wall.\n\nThe cream consistency keeps the product within the injection hole during curing — a key advantage over liquid siloxane injection products in walls with irregular pore structure, raked or open joints, or where holes cannot be pressure-sealed. No specialist pressure injection equipment is needed: the cream is applied with a standard 600ml or 800ml cartridge gun. This makes it practical for small-scale remediation works on strata and residential properties.\n\nA full DPC injection programme requires injection at the correct level, drilling at the correct spacing and depth, and mandatory follow-up with salt-resistant renovation plaster after the old plaster is stripped. Injection alone does not remediate the wall — old salt-contaminated plaster must be removed and replaced as part of the complete rising damp treatment sequence.",
    technicalProperties: [
      "Silane chemistry (n-butyltriethoxysilane) — reacts with masonry alkalinity — creates hydrophobic pore lining across full wall depth",
      "Cream consistency — stays in hole during cure — no pressure injection equipment required — standard sealant gun application",
      "Deep penetration into porous masonry substrates including brick, sandstock brick, calcium silicate and soft sandstone",
      "BS 6576 compliant — the British Standard for chemical DPC injection used as the reference standard in Australia",
      "No drilling through the wall — holes drilled to 75% of wall width at 100-120mm centres in the mortar joint",
      "800ml cartridges — single-person application — suitable for residential and strata remediation without specialist contractors",
    ],
    limitations: [
      "Not suitable for dense engineering brick, dense concrete or non-porous masonry — silane requires open pore structure to penetrate",
      "Replastering with salt-resistant renovation plaster is mandatory — DPC injection alone does not remove salt contamination in existing plaster",
      "Existing plaster must be stripped to 300mm above the visible salt tide mark before replastering — salt damage extends beyond visible staining",
      "Walls must be monitored and dried for 6–12 months after treatment before redecoration with non-breathable materials",
      "Injection at incorrect level, spacing or depth reduces efficacy — follow manufacturer drilling guide exactly",
      "Confirm current product specification, distributor and local availability with Wykamol Australia before specifying",
    ],
    procurementSources: [
      { name: "Wykamol Australia — trade supply — contact for current pricing", url: "https://www.wykamol.com.au" },
      { name: "Building remediation suppliers — confirm regional availability", url: "https://www.wykamol.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com",
    accentColor: "#cc0000",
    name: "Sika SikaMur InjectoCream-100",
    descriptionLine: "One-component silane cream DPC injection — Sika brand — for rising damp in masonry walls",
    productType: "Silane cream DPC injection",
    filterTags: ["Silane-cream", "DPC-injection", "Brick", "Blockwork", "Porous-masonry", "No-pressure", "1C"],
    techChips: [
      { label: "Silane cream", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "No pressure required", cls: "bg-green-50 text-green-700" },
      { label: "Sika brand", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Sika SikaMur InjectoCream-100 is Sika Australia's one-component silane cream chemical DPC injection product for the treatment of rising damp in masonry walls. The product is supplied in cartridges for application using a standard sealant gun, without requiring specialist pressure injection equipment. The silane chemistry penetrates into the pore structure of the masonry and creates a hydrophobic barrier across the wall cross-section when injected into pre-drilled holes at the mortar bed joint.\n\nSika's backing is a significant advantage for specifiers and building managers on larger strata remediation projects — Sika Australia provides national technical support, accredited applicators, and system documentation to support project warranty and building compliance requirements. The product is available through Sika's national distribution network.\n\nAs with all chemical DPC injection products, SikaMur InjectoCream-100 is one part of a complete rising damp remediation system. After injection, old salt-contaminated plaster must be stripped and replaced with salt-resistant renovation plaster. Confirm current product specification and application guide with Sika Australia before specifying.",
    technicalProperties: [
      "Silane cream chemistry — one-component — cures through contact with masonry alkalinity",
      "No pressure injection equipment required — 600ml cartridge gun application",
      "Part of Sika's complete rising damp treatment system — Sika technical support and national distribution network",
      "Penetrates into brick, blockwork and masonry pore structure to create hydrophobic barrier across wall cross-section",
      "Confirm current BS 6576 or equivalent compliance classification with Sika Australia technical before specifying",
    ],
    limitations: [
      "Not suitable for non-porous masonry or dense concrete substrates — silane penetration requires open pore structure",
      "Complete rising damp system: injection + plaster removal + salt-resistant renovation plaster — injection alone is insufficient",
      "Holes must be drilled at correct spacing, depth and level per Sika installation guide — incorrect drilling reduces efficacy",
      "Post-treatment drying period required before non-breathable redecoration — confirm drying requirements with Sika technical",
      "Confirm current product specification, classification and availability with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Sika national distribution network", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    tdsUrl: "https://www.remmers.com.au",
    accentColor: "#1a5276",
    name: "Remmers Kiesol C",
    descriptionLine: "Concentrated silane/siloxane cream DPC injection — WTA-referenced system — for injection into dense or low-porosity masonry",
    productType: "Silane/siloxane cream DPC injection",
    filterTags: ["Silane-cream", "DPC-injection", "Brick", "Blockwork", "Porous-masonry", "High-porosity", "Low-porosity", "1C", "WTA"],
    techChips: [
      { label: "Silane/siloxane cream", cls: "bg-sky-100 text-sky-800" },
      { label: "WTA-referenced system", cls: "bg-amber-50 text-amber-700" },
      { label: "Dense masonry compatible", cls: "bg-green-50 text-green-700" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Remmers Kiesol C is a concentrated silane/siloxane cream DPC injection product in Remmers' WTA-referenced rising damp treatment system. Remmers is a German manufacturer with a long track record in rising damp remediation and is well established in Australia through Remmers Australia. The Kiesol C cream product is part of the same chemistry family as Remmers Kiesol (liquid) — both are based on potassium methyl siliconate and siloxane chemistry that penetrates masonry and creates a hydrophobic barrier.\n\nKiesol C is particularly suited to lower-porosity masonry and denser masonry substrates where cream products may offer improved retention in the drilled hole compared to standard silane-only creams. Remmers recommends using Kiesol C within a complete WTA-referenced renovation system, which includes Remmers renovation plasters (SP series) as the follow-on replastering product — the same manufacturer supplying both injection and replastering products provides a coordinated system with consistent technical documentation.\n\nConfirm current product availability, system documentation and technical support with Remmers Australia before specifying on a project.",
    technicalProperties: [
      "Concentrated silane/siloxane chemistry — potassium methyl siliconate base — penetrates into masonry pore structure",
      "WTA-referenced system — Remmers DPC injection and renovation plaster products are designed to work together as a coordinated system",
      "Cream consistency — suitable for injection into dense and lower-porosity masonry substrates",
      "Part of complete Remmers rising damp system: Kiesol C injection + Remmers SP renovation plasters + breathable topcoat",
      "Remmers technical support available through Remmers Australia — national technical representative network",
    ],
    limitations: [
      "Injection alone is insufficient — follow with Remmers SP renovation plasters — old salt-contaminated plaster must be stripped and replaced",
      "Walls must dry after treatment — confirm drying period requirements with Remmers technical before redecoration",
      "Confirm product porosity requirements — not suitable for injection into non-porous or dense concrete substrates",
      "Remmers product range can be complex — confirm the correct Kiesol product (C cream vs liquid) with Remmers Australia for the specific substrate",
      "Confirm current product specification, WTA system documentation and local availability with Remmers Australia before specifying",
    ],
    procurementSources: [
      { name: "Remmers Australia — trade supply — contact for current pricing", url: "https://www.remmers.com.au" },
    ],
  },
  {
    fullLabel: "Westox",
    brandUrl: "https://www.westox.com.au",
    accentColor: "#64748b",
    name: "Westox 50 Low Odour",
    descriptionLine: "Low-odour silane DPC injection cream for rising damp treatment in brick and masonry — confirm current formulation, injection method, coverage, and system specifications with Westox technical",
    productType: "Low-odour silane cream — chemical DPC injection for masonry",
    filterTags: ["Silane-cream", "DPC-injection", "Brick", "Blockwork", "Porous-masonry", "No-pressure", "1C"],
    techChips: [{ label: "Low odour", cls: "bg-slate-100 text-slate-700" }, { label: "Silane cream", cls: "bg-slate-100 text-slate-700" }, { label: "DPC injection", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Westox 50 Low Odour is a low-odour silane DPC injection cream for chemical damp proof course installation in brick, blockwork, and masonry substrates subject to rising damp. Low-odour formulations are particularly suited to occupied buildings where conventional silane cream DPC products may cause odour complaints during application.\n\nThe Westox 50 Low Odour product is part of the Westox rising damp treatment range. Confirm current product technical data sheet, injection method, hole diameter, hole spacing, coverage, and full rising damp system design (injection + plaster + coating) with Westox technical before specifying. Do not rely on injection alone — salt-contaminated plaster must be stripped and replaced.",
    technicalProperties: [
      "Low-odour silane DPC injection cream — suitable for use in occupied buildings where odour is a consideration",
      "Suitable for injection into brick, blockwork, and porous masonry substrates",
      "Confirm injection method, hole diameter, spacing, coverage, and full system design from current Westox 50 Low Odour TDS",
    ],
    limitations: [
      "Confirm current product formulation and system specifications with Westox technical before specifying",
      "Chemical DPC injection alone is insufficient — old salt-contaminated plaster must be stripped and replaced with compatible renovation plaster",
      "Not suitable for injection into dense concrete or low-porosity substrates — confirm substrate suitability with Westox",
      "Confirm current Australian product availability with Westox before specifying",
    ],
    procurementSources: [{ name: "Westox — contact for trade supply", url: "https://www.westox.com.au" }],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Silane-cream", label: "Silane cream" },
  { id: "DPC-injection", label: "DPC injection" },
  { id: "Brick", label: "Brick" },
  { id: "Blockwork", label: "Blockwork" },
  { id: "Sandstone", label: "Sandstone" },
  { id: "Porous-masonry", label: "Porous masonry" },
  { id: "High-porosity", label: "High porosity" },
  { id: "Low-porosity", label: "Low / dense masonry" },
  { id: "No-pressure", label: "No pressure equipment" },
  { id: "1C", label: "One-component" },
  { id: "BS-6576", label: "BS 6576" },
  { id: "WTA", label: "WTA system" },
];

const BRAND_EQUIV: { system: string; safeguard: string; sika: string; remmers: string }[] = [
  { system: "Silane cream — standard porosity brick and blockwork", safeguard: "Dryzone", sika: "SikaMur InjectoCream-100", remmers: "Kiesol C" },
  { system: "Silane cream — lower / dense porosity masonry", safeguard: "Dryzone", sika: "SikaMur InjectoCream-100", remmers: "Kiesol C" },
];

const TECH_INFO = {
  typicalApplications: [
    "Rising damp treatment in external ground-floor masonry walls of Australian Class 2 strata buildings and residential properties",
    "Brick veneer and solid brick walls on buildings without an existing damp proof course",
    "Solid masonry walls where the original bitumen DPC has failed, delaminated or is absent",
    "Heritage masonry walls where physical DPC insertion is not appropriate or structurally intrusive",
    "Rising damp in sandstone, calcium silicate brick, clinker brick and other traditional masonry substrates",
  ],
  selectionCriteria: [
    "Confirm rising damp diagnosis before injection — visual salt staining alone does not confirm rising damp; rule out other water ingress sources first",
    "Confirm masonry porosity — silane cream injection requires sufficient pore structure for product penetration — dense engineering brick or concrete blocks may not be suitable",
    "Silane cream is preferred over liquid injection for walls with irregular pore structure, raked joints or where drill holes cannot be fully sealed",
    "Liquid siloxane injection (Remmers Kiesol or equivalent) may be preferred for very dense masonry where cream does not achieve full depth penetration — confirm with manufacturer",
    "The DPC injection level is critical — 75–150mm above floor level, in the mortar bed joint, is the standard — confirm with manufacturer and building pathologist",
    "Complete system: DPC injection + plaster removal + salt-resistant renovation plaster + breathable topcoat — not one product alone",
  ],
  limitations: [
    "Chemical DPC injection treats the symptom (capillary rise) but does not address external moisture source — if there is elevated external ground moisture, landscaping or drainage remediation may also be needed",
    "Rising damp salts (nitrates, chlorides, sulfates) remain in the wall fabric after injection — salt-resistant renovation plaster is mandatory to manage ongoing salt crystallisation during wall drying",
    "Walls may take 6–24 months to fully dry after DPC injection and replastering — confirm drying time expectations with the manufacturer and a building pathologist",
    "BS 6576 drilling specification (hole diameter, depth, spacing, level) must be followed exactly — deviations reduce efficacy",
    "Chemical DPC injection does not work retroactively to remove salt contamination already in the plaster — old plaster must be stripped before replastering",
  ],
  standardsNotes: [
    "BS 6576 — Code of Practice for Design and Installation of Damp-Proofing Using Remedial Chemical Treatments — the primary specification standard for chemical DPC injection used in Australia",
    "WTA 2-6-99 — the German WTA Institute standard for chemical injection DPC — referenced on Remmers products",
    "WTA 2-9-04 — WTA Institute standard for renovation plasters — the follow-on plastering system standard",
    "AS 3600 and NCC — Australian concrete and masonry standards do not specifically address chemical DPC injection — BS 6576 is the standard used",
    "CSIRO technical publications on rising damp treatment — confirm current CSIRO guidance with a building pathologist before specifying",
  ],
  suitableDefects: [
    "Rising damp — capillary movement of groundwater up through masonry wall from below floor level",
    "Failed or absent physical DPC — masonry with no existing damp proof course or failed original bitumen DPC",
    "Salt staining on lower internal walls — efflorescence, salt tide marks, spalling plaster — associated with rising damp",
    "Internal plaster failure at low level — plaster delamination, bubbling, loss of adhesion caused by rising moisture and salt crystallisation",
  ],
  typicalSubstrates: [
    "Solid fired clay brick — standard red brick — most common substrate for rising damp treatment in Australian strata buildings",
    "Sandstock brick — soft, porous traditional brickwork on heritage buildings — may require specialist assessment",
    "Calcium silicate brick — confirm porosity suitability with manufacturer before injection",
    "Concrete blockwork — confirm porosity — dense blocks may not permit adequate product penetration",
    "Sandstone masonry — natural stone walls — confirm porosity and mortar condition before specifying chemical injection",
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

export function SilaneCreamDPCIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are silane cream chemical DPC injection systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Chemical damp proof course (DPC) injection using silane-based cream is the most widely used method for treating rising damp in existing masonry walls in Australia. The process involves drilling horizontal holes at regular spacing into the mortar bed joint at low level, injecting silane cream product, and allowing the silane to cure and create a hydrophobic barrier across the full wall cross-section that blocks further capillary rise.
        </p>
        <p>
          Silane cream products use n-butyltriethoxysilane or similar silane chemistry that reacts with the alkalinity present in the masonry, bonding to pore walls and lining them with a water-repelling surface. The cream consistency is a key advantage over liquid siloxane products — cream stays within the drilled hole during the curing period, making it practical for walls where drill holes cannot be pressure-sealed and ensuring the product remains at the correct position within the wall cross-section.
        </p>
        <p>
          Chemical DPC injection is only one part of the complete rising damp remediation sequence. After injection, the old salt-contaminated plaster must be stripped, the masonry allowed to begin drying, and the wall replastered with salt-resistant renovation plaster (WTA system). Application of non-breathable materials before the wall has dried will trap moisture and cause plaster failure.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Do not confuse with:</p>
        <ul className="space-y-1.5">
          {[
            "Siloxane liquid DPC injection — lower viscosity liquid product — different application method — see the siloxane liquid page",
            "Crystalline waterproofing slurries (Xypex, Penetron, Vandex) — positive or negative side waterproofing against hydrostatic pressure — not a chemical DPC for rising damp",
            "Surface-applied water repellents (Stormdry, Siloxane facade cream) — surface treatment only — does not create a barrier within the wall cross-section",
            "Cavity wall or physical DPC systems — mechanical, not chemical",
            "Electro-osmotic or electronic damp proofing systems — fundamentally different operating principle — confirm evidence base before specifying",
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

export function SilaneCreamDPCProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — silane cream chemical DPC injection — for porous and medium-density masonry substrates</p>
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
            <p className="mt-1 text-sm text-slate-500">Silane cream DPC injection equivalents by substrate type. Confirm suitability for specific substrate porosity with manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1e3a8a" }}>Safeguard / Wykamol</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#cc0000" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1a5276" }}>Remmers</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.safeguard, row.sika, row.remmers].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning boxes — BELOW comparison table ── */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-700 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-red-900">DPC injection without replastering is incomplete treatment — plaster failure will recur</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Chemical DPC injection creates a barrier to further capillary rise but does not remove salt contamination already present in the existing plaster",
            "Old plaster must be stripped to a minimum 300mm above the visible salt tide mark — salt damage in the plaster extends well beyond what is visible",
            "After injection and plaster removal, the wall must be replastered with WTA-compliant salt-resistant renovation plaster — standard cement or gypsum plaster will fail in the presence of residual rising damp salts",
            "No non-breathable surface finish (ceramic tile, vinyl, non-breathable paint) should be applied until the wall has fully dried — confirm drying period with building pathologist before redecoration",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-red-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Confirm rising damp diagnosis before specifying injection — misdiagnosis is common</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Visual salt staining and wet plaster at low level can be caused by condensation, lateral moisture penetration, plumbing leaks or penetrating damp — not only rising damp",
            "A carbide moisture meter test or gravimetric moisture content test at multiple heights in the wall is needed to confirm a capillary moisture profile consistent with rising damp",
            "Chemical DPC injection applied to a wall with penetrating damp or a plumbing leak will not solve the problem — the correct moisture source must be identified first",
            "In some cases, rising damp may be driven by abnormally high external ground moisture levels — drainage remediation may be required alongside DPC injection",
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
