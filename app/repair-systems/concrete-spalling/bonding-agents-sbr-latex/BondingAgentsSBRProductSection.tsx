"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  AISelectionStage1, AISelectionStage2,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { BONDING_AGENT_CARDS } from "./bondingAgentsData";

type FilterTag =
  | "SBR-latex"
  | "Acrylic-primer"
  | "Epoxy-bond"
  | "Brush-applied"
  | "Roller-applied"
  | "Porous-concrete"
  | "Dense-concrete"
  | "Slurry-coat"
  | "Admixture";

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
  procurementSources: { name: string; url?: string }[];
};

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "LANKO 751 Lankolatex SBR",
    descriptionLine: "Flexible SBR latex additive used as bonding slurry coat and mortar admixture before polymer-modified repair mortars on porous concrete and masonry. Sika AU product name is LANKO 751 Lankolatex SBR — not 'Sika Latex SBR'",
    productType: "SBR latex bonding agent and mortar admixture",
    filterTags: ["SBR-latex", "Brush-applied", "Porous-concrete", "Slurry-coat", "Admixture"],
    techChips: [
      { label: "TODO: confirm mixing ratio from AU TDS", cls: "bg-rose-100 text-rose-800" },
      { label: "TODO: confirm admixture rate from AU TDS", cls: "bg-slate-100 text-slate-700" },
      { label: "5 L and 20 L containers", cls: "bg-amber-50 text-amber-700" },
      { label: "Apply while tacky", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "LANKO 751 Lankolatex SBR is the Sika Australia SBR latex product — a flexible SBR additive designed for use with Lanko, Davco and general mortar systems (Sika AU product page). It improves adhesive and compressive strength, water resistance, and flexibility, and can improve workability. Used as a bonding slurry coat and as a mortar admixture. As a bonding agent: dilute with cement to form a slurry, brush onto the prepared, saturated-surface-dry substrate, and apply the repair mortar while the slurry is still tacky. Available in 5 L and 20 L containers through Sika/Lanko/Davco trade supply. TODO: owner confirm — confirm exact mixing ratio (the 1:1 cement dilution and 10% admixture rate have not been verified from the AU TDS; the Sika AU product page does not display these ratios in the scraped content). Note: the product is not marketed as 'Sika Latex SBR' in Australia — use LANKO 751 Lankolatex SBR as the correct AU product name.",
    technicalProperties: [
      "LANKO 751 Lankolatex SBR — SBR latex — dual use: bonding slurry coat and mortar admixture",
      "TODO: owner confirm — bonding slurry dilution ratio (1:1 with cement not verified from Sika AU TDS) — confirm from current Sika/Lanko Australia TDS",
      "TODO: owner confirm — admixture rate (10% by weight of water not verified from Sika AU TDS) — confirm from current TDS",
      "Available in 5 L and 20 L containers — confirmed on aus.sika.com product page for LANKO 751 Lankolatex SBR",
    ],
    limitations: [
      "Apply repair mortar while bonding slurry is still fresh/tacky — do not allow to dry before applying mortar",
      "Confirm current dilution ratio and admixture rate from Sika Australia TDS — do not rely on international TDS",
      "Not a waterproofing product — do not use as a standalone primer in wet or submerged applications",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
      { name: "Bunnings Trade — nationally available", url: "https://www.bunnings.com.au/trade" },
      { name: "Bayset — nationally available", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/pdf/products/datasheets/waterproofing/ARDEX%20WPM%20405%20Datasheet.pdf",
    accentColor: "#0369a1",
    name: "Ardex WPM 405 (Sheltercrete Additive)",
    descriptionLine: "Concentrated SBR (styrene-butadiene rubber) polymer liquid — used as a cement-gauged bonding slurry coat before repair mortar and as a mortar/screed admixture. General-purpose SBR latex; confirm compatibility with the chosen repair mortar system. Not a rebar primer",
    productType: "SBR latex bonding agent and mortar admixture",
    filterTags: ["SBR-latex", "Brush-applied", "Porous-concrete", "Slurry-coat", "Admixture"],
    techChips: [
      { label: "SBR latex (Sheltercrete)", cls: "bg-rose-100 text-rose-800" },
      { label: "Bonding slurry + admixture", cls: "bg-slate-100 text-slate-700" },
      { label: "Mix with cement — apply while tacky", cls: "bg-slate-100 text-slate-700" },
      { label: "Also 2-coat temp. waterproof sealer", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex WPM 405 (Sheltercrete Additive) is a concentrated SBR (styrene-butadiene rubber) polymer liquid admixture used to improve the bond strength, flexibility, and water resistance of site-batched sand-cement mortars, screeds, and renders. In concrete spalling patch repair it has two roles: (1) as a bonding slurry coat — gauged with cement and water to a slurry, scrubbed firmly into the prepared, saturated-surface-dry concrete substrate, with the repair mortar placed into the slurry while it is still fresh and tacky; and (2) as a polymer admixture added to the gauging water of a site-batched cementitious repair mortar to improve adhesion and workability. It is the same SBR latex family as Fosroc Nitobond SBR and LANKO 751 Lankolatex SBR, so it is a like-for-like equivalent on this page.\n\nNote on positioning: Ardex markets WPM 405 as a general-purpose multipurpose SBR additive (and, as a 2-coat cement-gauged surface treatment at ~12 m² per litre per coat, a temporary waterproofing sealer) — it is not badged as Ardex's dedicated bonding primer for a specific proprietary repair mortar. Many modern proprietary EN 1504-3 repair mortars are designed to be applied without a separate bonding bridge (a scratch coat of the same mortar into an SSD substrate) — so a separate SBR slurry is system-dependent, not mandatory. Confirm the required bond coat from the chosen repair mortar's TDS, and confirm current dosage and dilution from the Ardex WPM 405 TDS before specifying.",
    technicalProperties: [
      "Ardex WPM 405 — concentrated SBR latex — dual use: cement-gauged bonding slurry coat and mortar/screed gauging-water admixture",
      "Bonding slurry: gauge with cement (and water) — scrub into prepared SSD substrate — place mortar while slurry is still fresh/tacky",
      "As admixture: added to gauging water of site-batched cementitious mortars to improve adhesion, flexibility, and water resistance",
      "Same SBR chemistry as Fosroc Nitobond SBR and LANKO 751 Lankolatex SBR — like-for-like equivalent bonding agent",
      "Confirm current dilution and dosage rates from the Ardex WPM 405 (Sheltercrete) TDS — do not rely on international data",
    ],
    limitations: [
      "Do not allow the SBR slurry coat to dry before placing the repair mortar — a dried slurry becomes a bond breaker, not a bonding agent",
      "System-dependent — not mandatory: many proprietary repair mortars require no separate bonding bridge (scratch coat into SSD substrate) — confirm the required bond coat from the mortar TDS",
      "Not a rebar primer — exposed reinforcement must first be treated with a corrosion-inhibiting / zinc-rich rebar primer (see Rebar primers & inhibitors)",
      "Not a standalone waterproofing product for structural repair — the 2-coat temporary sealer function is a weather-protection measure only; confirm with Ardex technical",
      "Apply to a saturated-surface-dry (not wet) substrate — surface water dilutes the slurry and reduces adhesion",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply nationally", url: "https://www.ardex.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitobond SBR",
    descriptionLine: "SBR latex bonding agent used as slurry coat before Fosroc Renderoc repair mortars on saturated-surface-dry prepared concrete; also available as mortar admixture",
    productType: "SBR latex bonding agent and mortar admixture",
    filterTags: ["SBR-latex", "Brush-applied", "Porous-concrete", "Slurry-coat", "Admixture"],
    techChips: [
      { label: "Mix with cement + water", cls: "bg-orange-100 text-orange-900" },
      { label: "Apply while still fresh", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc Nitobond EP for dense", cls: "bg-amber-50 text-amber-700" },
      { label: "Parchem — national", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fosroc Nitobond SBR is a styrene-butadiene rubber (SBR) bonding agent used before Fosroc Renderoc cementitious and polymer-modified repair mortars. It is applied as a bonding slurry (mixed with cement and water to a thin slurry consistency) brushed onto the prepared, saturated-surface-dry concrete substrate. The repair mortar must be applied while the slurry is still fresh — do not allow to dry. Nitobond SBR can also be added to site-batched cementitious mortars as a polymer admixture to improve adhesion and workability. Available through Parchem Construction Supplies (DuluxGroup) nationally.",
    technicalProperties: [
      "SBR latex bonding agent — dual use: slurry coat and mortar admixture",
      "Slurry coat: mix with cement and water — brush onto SSD substrate before mortar",
      "Also available: Fosroc Nitobond EP — 2-part epoxy bond coat for smooth/dense substrates",
      "Parchem (DuluxGroup) — national distribution with technical support",
    ],
    limitations: [
      "Apply repair mortar while Nitobond SBR slurry is still fresh — do not allow to dry",
      "Not suitable for submerged or continuously wet applications — confirm with Parchem TDS",
      "Confirm slurry mix ratio from current Fosroc/Parchem TDS before use",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Planicrete AC",
    descriptionLine: "Acrylic copolymer bonding agent mixed 1:2 with Portland cement as slurry coat before Mapei Mapegrout repair mortars on porous concrete and masonry substrates",
    productType: "Acrylic copolymer bonding agent and mortar admixture",
    filterTags: ["Acrylic-primer", "Brush-applied", "Porous-concrete", "Slurry-coat", "Admixture"],
    techChips: [
      { label: "1:2 ratio with cement", cls: "bg-blue-100 text-blue-900" },
      { label: "Brush while slurry tacky", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei Eporip for dense", cls: "bg-amber-50 text-amber-700" },
      { label: "Mapei trade + Bayset", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Planicrete AC is an acrylic copolymer bonding agent used before Mapei Mapegrout repair mortars on prepared concrete substrates. It is applied as a bonding slurry (mixed 1:2 with Portland cement) brushed onto the saturated-surface-dry substrate, with the repair mortar applied while the slurry is still tacky. For smooth or dense substrates, Mapei Eporip (2-part epoxy bonding agent) is specified instead. Planicrete AC can also be used as an admixture in site-batched repair mortars to improve adhesion and workability. Available through Mapei Australia trade supply and Bayset nationally.",
    technicalProperties: [
      "Acrylic copolymer bonding agent — slurry coat and mortar admixture",
      "Bonding slurry: 1:2 ratio with Portland cement — brush onto SSD substrate",
      "Mapei Eporip used for smooth/dense/low-absorption substrates",
      "Mapei trade supply + Bayset nationally",
    ],
    limitations: [
      "Apply mortar while bonding slurry is still tacky — do not allow to dry",
      "Confirm dilution ratio and admixture rate from current Mapei Australia TDS",
      "Not suitable for continuously wet or submerged applications without confirming with Mapei",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply nationally", url: "https://www.mapei.com/au" },
      { name: "Bayset — nationally available", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#7c2d12",
    name: "Fosroc Nitobond EP",
    descriptionLine: "Two-component epoxy bonding agent — confirm current specification and Australian availability with Fosroc technical before specifying",
    productType: "Two-component epoxy bonding agent",
    filterTags: ["Epoxy-bond", "Brush-applied", "Roller-applied", "Dense-concrete"],
    techChips: [
      { label: "Two-component epoxy bonding ag", cls: "bg-slate-100 text-slate-700" },
      { label: "Fosroc — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Fosroc Nitobond EP is a Two-component epoxy bonding agent. Two-component epoxy bonding bridge for old-to-new concrete where a high-strength structural bond is required. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Fosroc technical before specifying. TODO: verify specific performance figures from the current Fosroc TDS.",
    technicalProperties: [
      "Two-component epoxy bonding agent",
      "Two-component epoxy bonding bridge for old-to-new concrete where a high-strength structural bond is required.",
      "Confirm key performance values (strength / coverage / application) from the current Fosroc TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Fosroc",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Fosroc technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Fosroc",
    ],
    procurementSources: [
      { name: "Fosroc — Australian trade supply", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardexaustralia.com",
    tdsUrl: "https://ardexaustralia.com/product/ardex-brp-30-ep",
    accentColor: "#0369a1",
    name: "Ardex BRP 30 EP",
    descriptionLine: "Two-component epoxy resin bonding coat for concrete repair mortars — suitable on damp or wet substrates — also an epoxy mortar binder with added aggregate",
    productType: "Two-component epoxy bonding coat / epoxy mortar binder",
    filterTags: ["Epoxy-bond", "Brush-applied", "Roller-applied", "Dense-concrete"],
    techChips: [
      { label: "2-part epoxy bonding coat", cls: "bg-sky-100 text-sky-800" },
      { label: "Works on damp / wet substrates", cls: "bg-green-50 text-green-700" },
      { label: "Epoxy mortar binder (with aggregate)", cls: "bg-slate-100 text-slate-700" },
      { label: "Ardex AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex BRP 30 EP is a two-component (Part A resin + Part B hardener) epoxy used as a bonding coat for concrete repair mortars. Unlike most epoxy bond coats it can be used where the substrate is likely to remain damp or wet, which suits it to bridges, roads, wharves, loading docks, warehouses and factories. It also acts as an epoxy resin binder for epoxy mortar patching and overlay of interior surfaces by adding graded aggregate. The repair mortar is placed into the bonding coat within its open time per the Ardex system. Confirm mixing ratio, pot life, coverage, substrate preparation and overcoat window from the current Ardex Australia TDS before specifying. Source: ardexaustralia.com product page (ardex-brp-30-ep) and product SDS (Part A / Part B).",
    technicalProperties: [
      "Two-component epoxy (Part A resin + Part B hardener) — bonding coat for concrete repair mortars",
      "Suitable for use where the substrate is likely to remain damp or wet — unusual tolerance for an epoxy bond coat",
      "Also an epoxy resin binder for epoxy mortar patching/overlay with the addition of graded aggregate",
      "Used on bridges, roads, wharves, loading docks, warehouses and factories",
      "Ardex Australia — trade supply nationally — confirm pack sizes from TDS",
    ],
    limitations: [
      "Confirm mixing ratio, pot life, coverage and overcoat window from the current Ardex Australia TDS",
      "Place the repair mortar into the bonding coat within the open time — do not allow it to cure first",
      "For epoxy mortar use, confirm the correct aggregate type and grading with Ardex",
      "Confirm current product specification and compliance with Ardex Australia before specifying",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply nationally", url: "https://www.ardexaustralia.com" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika SikaBond SBR+",
    descriptionLine: "Waterproof SBR latex bonding agent and mortar admixture — gauges site-mixed repair mortars, screeds and bonding slurries; water- and frost-resistant, suited to exterior use",
    productType: "Waterproof SBR latex bonding agent and mortar admixture",
    filterTags: ["SBR-latex", "Brush-applied", "Roller-applied", "Porous-concrete", "Admixture", "Slurry-coat"],
    techChips: [
      { label: "SBR latex", cls: "bg-orange-100 text-orange-900" },
      { label: "Waterproof / frost-resistant", cls: "bg-slate-100 text-slate-700" },
      { label: "Admixture + bonding agent", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika AU trade supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika SikaBond SBR+ is a styrene-butadiene rubber (SBR) latex used as an admixture for mortars, screeds and renders, as a bonding agent for screeds and renders, and as a primer/sealer. Unlike PVA bonding aids it is not adversely affected by wet conditions, giving improved water, water-vapour and frost resistance, which suits exterior concrete repair. Confirm the current mix ratios, coverage and pack sizes against the current Sika Australia TDS before specifying.",
    technicalProperties: [
      "SBR latex admixture / bonding agent for site-mixed repair mortars, screeds, renders and bonding slurries",
      "Water-resistant (not affected in wet conditions) — improved water-vapour and frost resistance for exterior use",
      "Confirm mix ratios, coverage and pack sizes from the current Sika Australia TDS — N/A — sought",
    ],
    limitations: [
      "Confirm dosage/gauging ratio for the intended mortar or slurry from the current Sika Australia TDS",
      "Protect freshly bonded work from rapid drying per the TDS",
      "Confirm current pack sizes with Sika Australia technical before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
    ],
  }



];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "SBR-latex", label: "SBR latex" },
  { id: "Acrylic-primer", label: "Acrylic primer" },
  { id: "Epoxy-bond", label: "Epoxy bond coat" },
  { id: "Brush-applied", label: "Brush applied" },
  { id: "Roller-applied", label: "Roller applied" },
  { id: "Porous-concrete", label: "Porous concrete" },
  { id: "Dense-concrete", label: "Dense concrete" },
  { id: "Slurry-coat", label: "Slurry coat" },
  { id: "Admixture", label: "Admixture" },
];

const SYSTEM_COMPARISON = [
  { brand: "Sika", product: "LANKO 751 Lankolatex SBR", type: "SBR latex", use: "Bonding slurry + admixture", substrate: "Porous concrete and masonry", epoxy: "TODO: owner confirm — Sika Icosit EP Primer not found on aus.sika.com — confirm current Sika AU epoxy bond coat product name" },
  { brand: "Ardex", product: "Ardex WPM 405 (Sheltercrete)", type: "SBR latex", use: "Bonding slurry + admixture", substrate: "Porous/prepared concrete (SSD)", epoxy: "Ardex WPM 300 HydrEpoxy / confirm Ardex epoxy bond coat from AU TDS" },
  { brand: "Fosroc / Parchem", product: "Fosroc Nitobond SBR", type: "SBR latex", use: "Bonding slurry + admixture", substrate: "Porous/prepared concrete", epoxy: "Fosroc Nitobond EP" },
  { brand: "Mapei", product: "Mapei Planicrete AC", type: "Acrylic copolymer", use: "Bonding slurry + admixture", substrate: "Porous/prepared concrete", epoxy: "Mapei Eporip" },
];

const TECH_INFO = {
  typicalApplications: [
    "Applied as bonding slurry coat to prepared, saturated-surface-dry concrete before polymer-modified or cementitious repair mortar in concrete spalling patch repair",
    "Used as polymer admixture into site-batched cementitious repair mortars to improve adhesion, flexibility, and workability",
    "Applied before repair mortars on masonry and block substrates where concrete bonding agent is compatible",
    "Slurry coat on carpark column and beam soffit repairs before mortar, where adhesion to the existing substrate is critical",
    "Primer coat before cementitious floor screeds and toppings on prepared concrete substrates",
  ],
  selectionCriteria: [
    "SBR latex (Sika Latex, Nitobond SBR): suitable for porous concrete and masonry — dual use as slurry coat and admixture — most commonly specified",
    "Acrylic copolymer bonding agent (Mapei Planicrete AC): brush applied as a cement-gauged slurry — used with the matched proprietary repair mortar system",
    "For smooth, dense, or low-absorption concrete: specify epoxy bond coat (Ardex BE, Fosroc Nitobond EP, Mapei Eporip, Sika Icosit EP) instead of SBR or acrylic",
    "Confirm primer type with the repair mortar manufacturer — not all bonding agents are compatible with all repair mortars across brands",
    "In wet or humid conditions: SBR slurry coat degrades rapidly on a wet substrate — ensure SSD (not wet) before applying",
  ],
  limitations: [
    "Do NOT allow SBR slurry coat to dry before applying the repair mortar — a dried slurry coat becomes a bond breaker, not a bonding agent",
    "Not suitable for submerged or continuously wet applications without manufacturer confirmation",
    "SBR bonding agents are not waterproofing products — do not use as standalone waterproofing primer",
    "Do not apply to a wet (not SSD) substrate — excess water at the surface dilutes the bonding agent and reduces adhesion",
    "Check compatibility: do not assume Sika bonding agents are interchangeable with Ardex or Fosroc repair mortars — confirm compatible primer from the mortar manufacturer TDS",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — repair mortar adhesion requirements — bonding agent required before PM repair mortars on prepared concrete per AS 3600 clause",
    "Repair mortar manufacturer TDS — each manufacturer specifies the primer required for their system — confirm primer selection from the mortar TDS",
    "ICRI Guideline 310.2 — preparation standards for substrate before bonding agent — surface must be clean, sound, and free of contamination",
    "For structural repair: bonding agent selection and application is part of the engineered repair specification — confirm from the structural engineer or repair specification",
  ],
  suitableDefects: [
    "Concrete spalling — bonding agent is a required step in the patch repair sequence before repair mortar application",
    "Delaminated patches — prime the prepared substrate after chipping out before applying repair mortar",
    "Concrete shrinkage and carbonation surface defects — bonding agent required before cementitious topping or repair mortar",
    "Masonry spalling or deterioration — SBR bonding slurry on prepared masonry before cementitious render or repair",
  ],
  typicalSubstrates: [
    "Porous in-situ concrete — standard substrate for SBR and acrylic bonding agents — prepare to CSP 2–3, ensure SSD",
    "Masonry (concrete block, brick, rendered) — SBR or acrylic bonding agents suitable for porous masonry substrates",
    "Precast concrete — generally denser than in-situ — may require epoxy bond coat — confirm from mortar TDS",
    "Dense or smooth concrete — specify epoxy bond coat in place of SBR or acrylic for adequate adhesion",
  ],
};

// ── AI Selection Data (review mode) — see AI Selection Data rollout pack ──────
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["substrate_porosity", "porous / dense_smooth", "porous → this category; dense_smooth → requires_alternative (epoxy bond coat)"],
    ["substrate_type", "porous_concrete/masonry/steel", "concrete/masonry → ok; steel → requires_alternative (epoxy)"],
    ["wet_service", "dry / damp / submerged", "submerged → not_suitable for SBR/acrylic category"],
    ["location", "internal / external / both", "gate against product location capability"],
    ["bond_purpose", "mortar_bond / waterproofing", "waterproofing → different product, not this category"],
  ],
  json: {
    category: "bonding_agents_sbr",
    stage1_gates: {
      substrate_porosity: { allowed: ["porous", "dense_smooth"], rule: "porous=suitable; dense_smooth=requires_alternative" },
      substrate_type: { allowed: ["porous_concrete", "dense_concrete", "masonry", "steel"], rule: "concrete/masonry=suitable; steel=requires_alternative" },
      wet_service: { allowed: ["dry", "damp", "submerged"], rule: "submerged=not_suitable" },
      location: { allowed: ["internal", "external", "both"], rule: "match product location capability" },
      bond_purpose: { allowed: ["mortar_bond", "waterproofing"], rule: "waterproofing=not_suitable" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

// Keyed by product.name. Same fields/order/units across all four products.
export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Fosroc Nitobond SBR": {
    rows: [
      ["substrate_porous", "gate", "suitable"],
      ["substrate_dense_smooth", "gate", "requires_alternative"],
      ["substrate_steel", "gate", "requires_alternative"],
      ["location", "gate", "both"],
      ["wet_service_max", "gate", "damp"],
      ["role", "gate", "both"],
      ["application_method", "gate", "brush"],
      ["application_window", "gate", "must_be_tacky"],
      ["chemistry", "tag", "sbr_latex"],
      ["bond_strength_mpa", "rank", "null (unconfirmed)"],
      ["alternative_product", "meta", "fosroc_nitobond_ep"],
      ["compatible_system", "meta", "[renderoc]"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "fosroc_nitobond_sbr",
      gates: {
        substrate_porous: "suitable",
        substrate_dense_smooth: "requires_alternative",
        substrate_steel: "requires_alternative",
        location: "both",
        wet_service_max: "damp",
        role: "both",
        application_method: "brush",
        application_window: "must_be_tacky",
      },
      tag: { chemistry: "sbr_latex" },
      rank: { bond_strength_mpa: null },
      meta: {
        alternative_product: "fosroc_nitobond_ep",
        compatible_system: ["renderoc"],
        data_status: "verified",
        selectable: true,
        source: "Parchem/Fosroc Nitobond SBR product page",
        confirmed_date: null,
      },
    },
  },
  "Mapei Planicrete AC": {
    rows: [
      ["substrate_porous", "gate", "suitable"],
      ["substrate_dense_smooth", "gate", "requires_alternative"],
      ["substrate_steel", "gate", "requires_alternative"],
      ["location", "gate", "both"],
      ["wet_service_max", "gate", "damp"],
      ["role", "gate", "both"],
      ["application_method", "gate", "brush"],
      ["application_window", "gate", "must_be_tacky"],
      ["chemistry", "tag", "acrylic_copolymer"],
      ["bond_strength_mpa", "rank", "null (unconfirmed)"],
      ["alternative_product", "meta", "mapei_eporip"],
      ["compatible_system", "meta", "[mapegrout]"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "mapei_planicrete_ac",
      gates: {
        substrate_porous: "suitable",
        substrate_dense_smooth: "requires_alternative",
        substrate_steel: "requires_alternative",
        location: "both",
        wet_service_max: "damp",
        role: "both",
        application_method: "brush",
        application_window: "must_be_tacky",
      },
      tag: { chemistry: "acrylic_copolymer" },
      rank: { bond_strength_mpa: null },
      meta: {
        alternative_product: "mapei_eporip",
        compatible_system: ["mapegrout"],
        data_status: "verified",
        selectable: true,
        source: "Mapei Planicrete AC product page",
        confirmed_date: null,
      },
    },
  },
  "LANKO 751 Lankolatex SBR": {
    rows: [
      ["substrate_porous", "gate", "suitable"],
      ["substrate_dense_smooth", "gate", "requires_alternative"],
      ["substrate_steel", "gate", "requires_alternative"],
      ["location", "gate", "both"],
      ["wet_service_max", "gate", "damp"],
      ["role", "gate", "both"],
      ["application_method", "gate", "brush"],
      ["application_window", "gate", "must_be_tacky"],
      ["chemistry", "tag", "sbr_latex"],
      ["bond_strength_mpa", "rank", "null (unconfirmed)"],
      ["alternative_product", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "[lanko, davco]"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: {
      id: "lanko_751_lankolatex_sbr",
      gates: {
        substrate_porous: "suitable",
        substrate_dense_smooth: "requires_alternative",
        substrate_steel: "requires_alternative",
        location: "both",
        wet_service_max: "damp",
        role: "both",
        application_method: "brush",
        application_window: "must_be_tacky",
      },
      tag: { chemistry: "sbr_latex" },
      rank: { bond_strength_mpa: null },
      meta: {
        alternative_product: null,
        compatible_system: ["lanko", "davco"],
        data_status: "unconfirmed",
        selectable: false,
        source: "Sika AU page (dilution/admixture ratios not verified)",
        confirmed_date: null,
      },
    },
  },
  "Ardex WPM 405 (Sheltercrete Additive)": {
    rows: [
      ["substrate_porous", "gate", "suitable"],
      ["substrate_dense_smooth", "gate", "requires_alternative"],
      ["substrate_steel", "gate", "requires_alternative"],
      ["location", "gate", "both"],
      ["wet_service_max", "gate", "damp"],
      ["role", "gate", "both"],
      ["application_method", "gate", "brush"],
      ["application_window", "gate", "must_be_tacky"],
      ["chemistry", "tag", "sbr_latex"],
      ["bond_strength_mpa", "rank", "null (unconfirmed)"],
      ["alternative_product", "meta", "ardex_wpm_300_hydrepoxy (confirm)"],
      ["compatible_system", "meta", "[site_batched_cementitious]"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "ardex_wpm_405",
      gates: {
        substrate_porous: "suitable",
        substrate_dense_smooth: "requires_alternative",
        substrate_steel: "requires_alternative",
        location: "both",
        wet_service_max: "damp",
        role: "both",
        application_method: "brush",
        application_window: "must_be_tacky",
      },
      tag: { chemistry: "sbr_latex" },
      rank: { bond_strength_mpa: null },
      meta: {
        alternative_product: "ardex_wpm_300_hydrepoxy",
        compatible_system: ["site_batched_cementitious"],
        data_status: "verified",
        selectable: true,
        source: "ardexaustralia.com Ardex WPM 405 product page + datasheet (SBR multipurpose additive / Sheltercrete)",
        confirmed_date: null,
      },
    },
  },
};

export function BondingAgentsSBRIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are bonding agents and SBR latex used for?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          A bonding agent or primer is applied to the prepared, saturated-surface-dry concrete substrate immediately before the repair mortar is placed. Without a bonding agent, the repair mortar may fail to achieve adequate adhesion to the substrate — producing a hollow-sounding patch that detaches over time. SBR (styrene-butadiene rubber) latex is the most common type — mixed with cement and water to form a slurry and brushed onto the substrate. Acrylic primers are applied by brush or roller and allowed to become tacky before mortar placement.
        </p>
        {expanded && (
          <>
            <p>
              Epoxy bond coats (2-part) are specified for smooth, dense, or low-absorption substrates where SBR slurry coat may not achieve adequate adhesion. The critical rule for SBR bonding agent is timing: the repair mortar must be applied while the slurry coat is still fresh and tacky — if the slurry dries before mortar is applied, it becomes a bond breaker rather than a bonding agent. Each repair mortar manufacturer specifies which primer is required for their system — confirm the compatible primer from the mortar TDS before applying a different brand&apos;s bonding agent.
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

const DESIGN_CRITERIA = "Chemistry \u2014 SBR (styrene-butadiene) latex vs acrylic copolymer (SBR = better water/abrasion resistance; acrylic = better UV/non-yellowing); re-emulsifiable vs water-resistant (non-redispersible) cured film \u2014 critical for wet/external/immersed use where re-emulsifiable products fail; intended use \u2014 bonding bridge/slurry coat vs cement-mortar gauging admixture; total solids content (%); dilution ratio & coverage (m\u00b2/L); open/tack time window before mortar must be applied (wet-on-wet vs dry-film bonding); bond/pull-off strength improvement to substrate (MPa, AS 1012.10 / EN 1542); effect on flexural/tensile strength, drying shrinkage & permeability of the modified mortar; admixture compatibility per AS 1478.1; minimum application & curing temperature; substrate prep & saturated-surface-dry (SSD) condition";

export function BondingAgentsSBRProductSection() {
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

      <AutoProductReference products={PRODUCTS} cards={BONDING_AGENT_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Bonding agents & SBR latex" />
    </>
  );
}
