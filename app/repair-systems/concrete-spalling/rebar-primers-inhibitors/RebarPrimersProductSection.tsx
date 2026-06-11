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
  | "Zinc-rich"
  | "Epoxy"
  | "MCI-corrosion-inhibitor"
  | "Brush-applied"
  | "St2-surface"
  | "Sa2-surface"
  | "Carbonation"
  | "Chloride"
  | "AS-3610";

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
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/corrosion-inhibitorssacrificialanodes/sika-ferrogard-903plus.html",
    accentColor: "#be123c",
    name: "Sika FerroGard-903 Plus — Migrating Corrosion Inhibitor (Concrete Impregnation)",
    descriptionLine: "Surface-applied migrating corrosion inhibitor (MCI) applied to the concrete surface — penetrates concrete to reach reinforcing steel and form a protective layer — NOT applied directly to bare rebar — applied by brush, roller, or spray. Sold in 20 L pail and 205 L drum",
    productType: "Surface-applied migrating corrosion inhibitor — brush/roller/spray to concrete surface — NOT a direct rebar primer",
    filterTags: ["MCI-corrosion-inhibitor", "Brush-applied", "St2-surface", "Carbonation", "Chloride"],
    techChips: [
      { label: "MCI — applied to concrete surface, not bare rebar", cls: "bg-rose-100 text-rose-800" },
      { label: "Penetrates concrete to reach steel", cls: "bg-green-50 text-green-700" },
      { label: "Migrates into concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "Carbonation and chloride environments", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika FerroGard-903 Plus is a surface-applied mixed corrosion inhibitor applied to the concrete surface (not directly to bare rebar) — it penetrates the concrete and forms a protective monomolecular layer on the surface of the reinforcing steel (Sika AU TDS). It is based on organic compounds. It is NOT applied as a direct rebar primer to cleaned exposed steel — it is applied by brush, roller, low pressure, or airless spray to the concrete surface and penetrates through the concrete to reach the steel. It is suitable for method 11.3 (applying inhibitor to the concrete) defined by EN 1504-9 for Principle 11 (anodic control). Corrosion protection is said to increase service life by up to 15 years as part of a complete Sika concrete repair and protection system. After the last coat, the surface becomes mat then undergoes low-pressure water cleaning; the day after application, pressure washing (~10 MPa) removes soluble salts. Application rate is approximately 0.50 kg/m² (~480 ml/m²). Sold in 20 L pail and 205 L drum. For direct rebar primer applications (applied to cleaned bare rebar), Sika AU offers Ferrogard zinc-based sacrificial anodes (FerroGard-710 Reba, FerroGard-720 Reba) — these are discrete zinc anodes fixed to rebar, not a brush-applied primer. TODO: owner confirm — if a brush-applied direct rebar primer is required for the Sika system, confirm the correct current Sika AU product name with Sika technical.",
    technicalProperties: [
      "Surface-applied MCI — applied to concrete surface by brush, roller, or spray — penetrates concrete to reach reinforcing steel",
      "Forms protective monomolecular layer on steel surface — organic compound chemistry",
      "Application rate: approximately 0.50 kg/m² (~480 ml/m²) — confirm from Sika AU TDS for project conditions",
      "Packaging: 20 L pail and 205 L drum — confirmed on aus.sika.com",
      "Suitable for EN 1504-9 Principle 11, method 11.3 (applying inhibitor to the concrete)",
      "NOT a direct rebar primer — applied to concrete surface, not to bare exposed rebar",
    ],
    limitations: [
      "NOT applied directly to bare rebar — this is a surface-applied concrete impregnation — the product reaches the steel by penetrating through the concrete matrix",
      "Not suitable where rebar is exposed and concrete cover has been fully removed — for bare rebar, specify a zinc-rich or epoxy zinc-rich rebar primer instead",
      "After last coat application, surface must reach mat condition, followed by low-pressure water cleaning; pressure washing (~10 MPa) required the next day — confirm full application procedure from Sika AU TDS",
      "The migration mechanism means the product is suited for structures where concrete cover is intact but corrosion risk is present — confirm suitability for specific repair scenario with Sika Australia",
    ],
    procurementSources: [
      { name: "Sika Australia — nationally via trade", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — nationally", url: "https://www.parchem.com.au" },
      { name: "Concrete repair trade suppliers nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-br-10-zp-2/",
    accentColor: "#0369a1",
    name: "Ardex BR 10 ZP — Single-Part Zinc-Rich Primer",
    descriptionLine: "Single-component zinc-rich rebar primer providing cathodic protection by sacrificial zinc — confirmed as single-part (not cementitious slurry) per ardexaustralia.com — provides excellent protective barrier to steel",
    productType: "Single-part zinc-rich rebar primer — brush applied — cathodic protection by sacrificial zinc",
    filterTags: ["Zinc-rich", "Brush-applied", "St2-surface", "Carbonation", "Chloride"],
    techChips: [
      { label: "Single-part zinc-rich — confirmed ardexaustralia.com", cls: "bg-sky-100 text-sky-800" },
      { label: "Cathodic protection — excellent protective barrier to steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Single component — ease of application", cls: "bg-green-50 text-green-700" },
      { label: "For use with Ardex concrete repair range", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex BR 10 ZP is a single-part, zinc-rich primer for steel reinforcement — confirmed as single-component on ardexaustralia.com (not a cementitious slurry as previously described). It provides an excellent protective barrier to steel by sacrificial zinc and is designed to be used with the ARDEX Concrete Repair range (BR 340, BR 345). The product is single component for ease of application. Apply by brush to rebar cleaned to minimum St 2 (ISO 8501-1). Apply two full coats and allow each coat to reach a touch-dry state before applying the next coat — do not apply repair mortar until the second coat is touch-dry. TODO: owner confirm — mixing requirements, coat thickness, and full application procedure from current Ardex Australia TDS — the ardexaustralia.com product page confirms it is single-component but does not display full application instructions in scraped content.",
    technicalProperties: [
      "Single-part zinc-rich primer — confirmed single-component on ardexaustralia.com",
      "Sacrificial zinc — cathodic protection — excellent protective barrier to steel",
      "Single component — ease of application — no mixing required",
      "Designed for use with ARDEX Concrete Repair range (BR 340, BR 345) — confirmed on ardexaustralia.com",
    ],
    limitations: [
      "Allow each coat to reach touch-dry before applying the next — and allow the second coat to reach touch-dry before placing repair mortar",
      "Do not apply to wet or damp rebar — moisture prevents adhesion",
      "TODO: owner confirm — full application procedure including number of coats, dry times, and coat thickness from current Ardex Australia TDS",
      "The zinc is slowly consumed over time — in highly aggressive chloride environments, the cathodic protection period may be limited — consult Ardex technical for service life estimates",
    ],
    procurementSources: [
      { name: "Ardex Australia — distributed nationally", url: "https://www.ardex.com.au" },
      { name: "Trade concrete repair suppliers nationally", url: "https://www.ardex.com.au" },
      { name: "Parchem and Ardex trade network nationally", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia (via Parchem)",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.fosroc.com.au/product/nitoprime-zincrich",
    accentColor: "#7c2d12",
    name: "Fosroc Nitoprime Zincrich — Epoxy Zinc-Rich Rebar Primer",
    descriptionLine: "Two-component epoxy zinc-rich primer for cleaned reinforcement — highest-durability barrier primer for aggressive chloride and marine environments — requires abrasive blast clean preferred",
    productType: "Two-component epoxy zinc-rich primer — barrier coating — high-durability rebar protection",
    filterTags: ["Zinc-rich", "Epoxy", "Brush-applied", "Sa2-surface", "Chloride"],
    techChips: [
      { label: "2-part epoxy zinc-rich", cls: "bg-orange-100 text-orange-900" },
      { label: "Blast clean preferred", cls: "bg-red-50 text-red-700" },
      { label: "Highest durability", cls: "bg-green-50 text-green-700" },
      { label: "Marine and coastal", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitoprime Zincrich is a two-component epoxy zinc-rich primer that provides the highest level of rebar protection among the products in this category — it forms a hard, impermeable epoxy barrier coating with sacrificial zinc that resists chloride and moisture ingress to the steel. It is the preferred rebar primer in highly aggressive marine and coastal environments and for structures where the engineer has specified a high-durability repair system. The two-component epoxy chemistry provides a cured film with much greater resistance to moisture and chloride diffusion than single-component cementitious primers. For best results, Nitoprime Zincrich should be applied to reinforcement that has been abrasive blast cleaned to minimum Sa 2 (ISO 8501-1) — however, in practice on remedial repair sites, it is often applied to rebar cleaned to St 2 or St 3 (power tool cleaning). Mix part A and part B in the correct ratio, apply by brush in two full coats, and allow each coat to cure before placing repair mortar. Pot life is typically 30–60 minutes at 23°C — mix only the quantity that can be applied within the pot life.",
    technicalProperties: [
      "Two-component epoxy zinc-rich — hard, impermeable cured film — resists chloride and moisture ingress",
      "Preferred application: Sa 2 blast-cleaned rebar — also applied on St 2 power-tool cleaned rebar in practice",
      "Two full coats by brush — mix A+B in correct ratio — pot life 30–60 minutes at 23°C",
      "Highest durability rebar primer — specified for marine, coastal, and aggressive chloride environments",
    ],
    limitations: [
      "Two-component epoxy — pot life of 30–60 minutes — mix only what can be applied within pot life — wasted mixed material is a cost on small repairs",
      "For maximum performance, abrasive blast clean to Sa 2 (ISO 8501-1) — on-site rebar cleaning typically achieves St 2 or St 3, which provides a lower but still acceptable substrate for the epoxy primer",
      "Cured epoxy film must be abraded or scoured before applying repair mortar — the cured epoxy surface may be too smooth for direct mortar bond — confirm from Fosroc TDS whether roughening or key primer is required",
      "More expensive than single-component cementitious zinc-rich primers — cost is justified in aggressive marine environments but may be excessive for internal carpark or building repairs",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — Fosroc nationally", url: "https://www.parchem.com.au" },
      { name: "Fosroc via Parchem — concrete repair trade supply", url: "https://www.parchem.com.au" },
      { name: "Trade concrete repair suppliers nationally", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#92400e",
    name: "Parchem Zinc Primer — General Purpose Rebar Primer",
    descriptionLine: "Single-component cementitious zinc-rich rebar primer — general purpose for standard spalling repairs not in aggressive marine or coastal environments",
    productType: "Single-component cementitious zinc-rich primer — general-purpose rebar primer",
    filterTags: ["Zinc-rich", "Brush-applied", "St2-surface", "Carbonation"],
    techChips: [
      { label: "Single-component", cls: "bg-amber-800 text-white" },
      { label: "Cementitious zinc-rich", cls: "bg-slate-100 text-slate-700" },
      { label: "Brush apply — 2 coats", cls: "bg-green-50 text-green-700" },
      { label: "General purpose", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Parchem zinc primer is a single-component cementitious zinc-rich rebar primer suitable for general-purpose rebar priming in concrete spalling repairs where the environment is not aggressively chloride-contaminated — internal carparks, building interior repairs, and sheltered balconies. The product is mixed with clean water to a slurry consistency and applied to reinforcement cleaned to minimum St 2 (ISO 8501-1) by brush in two full coats. After the second coat has reached touch-dry, the repair mortar is placed over the primed rebar. Available from Parchem Construction Supplies nationally. Single-component products are easier to handle and have no pot life limitations compared to two-component epoxy systems — this makes them practical for small repair crews and repairs with small areas of exposed rebar. For more aggressive environments, upgrade to Fosroc Nitoprime Zincrich (two-component epoxy zinc-rich) or Sika Ferrogard-903+ (migrating corrosion inhibitor).",
    technicalProperties: [
      "Single-component — mix with clean water to slurry consistency — no pot life limitation",
      "Cementitious zinc-rich — zinc particles provide cathodic protection — compatible with cementitious repair mortars",
      "Two-coat brush application to rebar cleaned to minimum St 2 (ISO 8501-1)",
      "Suitable for standard carbonation-induced spalling repairs in non-aggressive environments",
    ],
    limitations: [
      "Single-component cementitious zinc-rich primers are not suitable for highly aggressive marine, coastal, or continuously chloride-exposed environments — upgrade to two-component epoxy zinc-rich (Nitoprime Zincrich) for these conditions",
      "Do not apply to wet rebar — clean and dry rebar surface is required for primer adhesion",
      "Allow each coat to reach touch-dry before applying the next coat and before placing repair mortar — check from Parchem TDS for minimum dry time at ambient temperature",
      "Single-component products have shorter shelf life than two-component systems once opened — store sealed and use within the open container life stated on the product label",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — nationally", url: "https://www.parchem.com.au" },
      { name: "Trade concrete repair suppliers nationally", url: "https://www.parchem.com.au" },
      { name: "Parchem online and branch network nationally", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://www.sika.com.au",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/steel-reinforcmentprimers/sika-monotop-910n.html",
    accentColor: "#be123c",
    name: "Sika MonoTop-910 N",
    descriptionLine: "Cementitious rebar anti-corrosion primer and bonding agent for concrete spalling repair — brush-applied to cleaned and prepared reinforcement — confirm current formulation, coverage, and system design with Sika Australia technical",
    productType: "Cementitious rebar anti-corrosion primer — concrete spalling repair",
    filterTags: ["Zinc-rich", "Brush-applied", "St2-surface", "Carbonation", "Chloride", "AS-3610"],
    techChips: [{ label: "Cementitious", cls: "bg-red-100 text-red-700" }, { label: "Rebar primer", cls: "bg-slate-100 text-slate-700" }, { label: "Anti-corrosion", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Sika MonoTop-910 N is a cementitious anti-corrosion primer and bonding coat for cleaned reinforcement in concrete spalling repair applications. It is applied by brush to prepared and cleaned rebar prior to repair mortar application.\n\nSika MonoTop-910 N is part of the Sika MonoTop concrete repair system and is designed for use in conjunction with compatible Sika MonoTop repair mortars. The product contains an active corrosion-inhibiting component and acts simultaneously as a bonding bridge between the rebar and repair mortar.\n\nConfirm current product technical data sheet, coverage rate, application method, inter-coat timing, and compatible repair mortar system design with Sika Australia technical before specifying. Confirm AS 3735 and AS/NZS 2699 compliance requirements with Sika Australia for specific project certification requirements.",
    technicalProperties: [
      "Cementitious anti-corrosion primer for cleaned reinforcement — provides corrosion protection and bonding function in one product",
      "Part of the Sika MonoTop concrete repair system — confirm compatible repair mortar from current Sika MonoTop system documentation",
      "Confirm coverage rate, application method, and inter-coat timing from current Sika MonoTop-910 N TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Sika Australia technical before specifying",
      "Not suitable for application to wet or contaminated rebar — rebar must be cleaned to St 2 or better before primer application",
      "Must be used as part of the complete Sika MonoTop repair system — not compatible with all repair mortars — confirm system with Sika",
      "Apply repair mortar while MonoTop-910 N is still green (tacky) — do not allow primer to fully cure before applying repair mortar",
    ],
    procurementSources: [
      { name: "Sika Australia — national distribution", url: "https://www.sika.com.au" },
      { name: "Sika trade branches — contact Sika Australia for nearest", url: "https://www.sika.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Zinc-rich", label: "Zinc rich" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "MCI-corrosion-inhibitor", label: "MCI inhibitor" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "St2-surface", label: "St 2 surface" },
  { id: "Sa2-surface", label: "Sa 2 blast" },
  { id: "Carbonation", label: "Carbonation" },
  { id: "Chloride", label: "Chloride" },
  { id: "AS-3610", label: "AS 3610" },
];

const SYSTEM_COMPARISON = [
  {
    brand: "Sika",
    product: "FerroGard-903 Plus",
    type: "MCI — surface applied to concrete (not direct rebar primer)",
    appliedto: "Applied to concrete surface — penetrates to reach steel",
    minclean: "N/A — applied to concrete surface, not bare rebar",
    bestuse: "Chloride/carbonation — where cover is intact or partially present — NOT for bare rebar exposure",
  },
  {
    brand: "Ardex",
    product: "BR 10 ZP",
    type: "Single-part zinc-rich (not cementitious) — confirmed ardexaustralia.com",
    appliedto: "St 2 cleaned rebar",
    minclean: "St 2 (ISO 8501-1)",
    bestuse: "Standard spalling repairs — compatible with Ardex mortar systems",
  },
  {
    brand: "Fosroc / Parchem",
    product: "Nitoprime Zincrich",
    type: "2-part epoxy zinc-rich",
    appliedto: "Sa 2 preferred / St 2 min.",
    minclean: "Sa 2 preferred",
    bestuse: "Marine, coastal, aggressive chloride — highest barrier durability",
  },
  {
    brand: "Parchem",
    product: "Zinc Primer",
    type: "Cementitious zinc-rich",
    appliedto: "St 2 cleaned rebar",
    minclean: "St 2 (ISO 8501-1)",
    bestuse: "General purpose — internal carparks and sheltered repairs",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Priming corroded reinforcement in concrete spalling repair after cleaning to minimum St 2 (ISO 8501-1) with needle scaler or wire cup grinder",
    "Cathodic protection of exposed rebar in carpark column, beam soffit, and balcony slab repairs",
    "Rebar priming in marine and coastal structures where chloride-induced corrosion is ongoing — MCI or epoxy zinc-rich primers preferred",
    "Priming rebar in carbonation-induced spalling repairs in residential buildings and aged concrete structures",
    "Application to new mesh and tie rebar where freshly cut or site-bent bars have exposed unprotected steel",
    "Compatibility coat between existing corroded rebar and repair mortar in patch repair systems",
  ],
  selectionCriteria: [
    "Standard carpark and building interior — carbonation-induced repair: single-part zinc-rich primer (Ardex BR 10 ZP, Parchem Zinc Primer) — applies on St 2 cleaned rebar",
    "Chloride-contaminated — coastal or marine environment: two-component epoxy zinc-rich (Fosroc Nitoprime Zincrich) — the engineer or repair specification will nominate the required product",
    "Ongoing chloride source — where concrete cover is partially intact: Sika FerroGard-903 Plus — surface-applied MCI impregnation applied to the concrete surface, not directly to bare rebar — penetrates to reach steel and provides ongoing protection beyond the repair boundary",
    "Available site prep: if site conditions allow only St 2 (power tool clean), select a product rated for St 2 substrate — epoxy zinc-rich products perform better with Sa 2 (blast clean) substrate but may be applied on St 2 if the specification allows",
    "Budget: single-component cementitious zinc-rich is lowest cost — two-component epoxy zinc-rich is highest — MCI is intermediate",
    "Always confirm rebar primer selection from the repair mortar manufacturer's technical recommendations — primers must be compatible with the repair mortar system",
  ],
  limitations: [
    "Rebar primer is NOT a substitute for physical removal of chloride-contaminated concrete to beyond the corrosion front — if the contamination front is not removed, corrosion will continue at the boundary of the repair",
    "Do NOT apply rebar primer to rebar that has not been cleaned — applying primer over rust scale reduces adhesion and provides no cathodic protection value",
    "Allow primer coats to reach touch-dry before placing repair mortar — wet primer causes bond problems and can produce blistering under mortar",
    "Sika FerroGard-903 Plus is a surface-applied concrete impregnation, not a direct rebar primer — do not substitute it for a zinc-rich rebar primer on bare exposed rebar — confirm the correct product for the specific application with Sika Australia",
    "Epoxy zinc-rich primers (Nitoprime Zincrich) have a pot life of 30–60 minutes — do not mix more than can be applied within pot life — wasted epoxy is expensive waste on small repairs",
    "Rebar primer on the bond face of existing concrete (substrate face) will eliminate mortar bond — apply primer only to rebar, never to concrete bond surfaces",
  ],
  standardsNotes: [
    "ISO 8501-1 — Preparation of Steel Substrates Before Application of Paints and Related Products — defines St 2 (power tool clean) and Sa 2 (abrasive blast) cleanliness grades — always confirm required grade from repair specification",
    "AS/NZS 4020 — Testing of Products for Use in Contact with Drinking Water — relevant for rebar primers used in water-retaining structures",
    "EN 1504-7 — Products and Systems for the Protection and Repair of Concrete — Part 7: Reinforcement Corrosion Protection — the European standard that governs corrosion protection primers for reinforcement — referenced by many Australian specifiers",
    "Manufacturer TDS — the primary reference for compatible repair mortar, minimum substrate preparation, and application procedure — always read and follow the TDS before applying any rebar primer",
    "Repair specification — the engineer's specification is the binding document — it will nominate the primer type, minimum substrate cleanliness, and application method",
  ],
  suitableDefects: [
    "Concrete spalling due to reinforcement corrosion — primary application — rebar primer applied after chipping and rebar cleaning and before repair mortar placement",
    "Reinforcement corrosion in carpark structures — balcony soffits, columns, beam soffits",
    "Chloride-induced corrosion in coastal and marine structures",
    "Carbonation-induced corrosion in aged residential and commercial concrete",
    "Post-tensioned slab spalling — note: DO NOT apply MCI primers or other corrosion inhibitors to high-strength PT strands without written confirmation from the engineer and strand manufacturer",
  ],
  typicalSubstrates: [
    "Corroded mild steel reinforcement (N-grade, Y-grade deformed bar) — primary substrate — cleaned to minimum St 2 before primer application",
    "Freshly cut or bent reinforcement — apply primer to exposed steel within 4 hours of cutting or bending to prevent flash rust in coastal environments",
    "Existing concrete repair bond faces — DO NOT apply rebar primer to concrete bond surfaces — primer on bond surfaces eliminates mortar adhesion",
    "Tie wire and bar chairs in contact with rebar — apply primer to all freshly cut steel elements that will be encased in repair mortar",
  ],
};

export function RebarPrimersIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Rebar primers and corrosion inhibitors in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          After cleaning corroded reinforcement to minimum St 2 (ISO 8501-1), a rebar primer or corrosion inhibitor is applied to the cleaned steel before placing repair mortar. This step is one of the most critical in the repair sequence — without a primer, freshly cleaned steel will begin to re-corrode within hours in humid or coastal conditions, and the repair mortar alone will not provide sufficient long-term protection against the corrosion mechanism that caused the original spalling. Selecting the correct primer type depends on the environment, the corrosion mechanism, and the repair mortar system.
        </p>
        {expanded && (
          <>
            <p>
              For standard carbonation-induced spalling in sheltered or indoor environments, a single-part zinc-rich primer (Ardex BR 10 ZP, Parchem Zinc Primer) applied in two coats is sufficient. In chloride-contaminated structures — coastal buildings, marine structures, carpark decks exposed to deicing salts — a two-component epoxy zinc-rich primer (Fosroc Nitoprime Zincrich) provides a more durable barrier. Sika FerroGard-903 Plus is a surface-applied migrating corrosion inhibitor applied to the concrete surface (not directly to bare rebar) that penetrates through the concrete to reach the steel — it is suited for structures where concrete cover is intact but corrosion risk is present. Always confirm the primer selection from the repair mortar manufacturer's recommendations — compatibility between primer and mortar is essential.
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

export function RebarPrimersProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 rebar primers — MCI migrating inhibitor, cementitious zinc-rich, epoxy zinc-rich, and general purpose — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of rebar primers for concrete spalling repair. Selection depends on environment and repair mortar compatibility — confirm from manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Min. Clean</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Best Use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap font-medium">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.minclean}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.bestuse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
