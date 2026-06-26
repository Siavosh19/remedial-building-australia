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
import { REBAR_PRIMER_CARDS } from "./rebarPrimersData";

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

export const PRODUCTS: Product[] = [
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
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Mapefer 1K",
    descriptionLine: "Single-component cementitious corrosion-inhibiting rebar primer — confirm current specification and Australian availability with Mapei technical before specifying",
    productType: "Single-component cementitious corrosion-inhibiting rebar primer",
    filterTags: ["MCI-corrosion-inhibitor", "Brush-applied", "St2-surface", "Carbonation", "Chloride"],
    techChips: [
      { label: "Single-component cementitious ", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Mapei Mapefer 1K is a Single-component cementitious corrosion-inhibiting rebar primer. Brush-applied anti-corrosion coating to exposed reinforcement before placing the repair mortar. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Mapei technical before specifying. TODO: verify specific performance figures from the current Mapei TDS.",
    technicalProperties: [
      "Single-component cementitious corrosion-inhibiting rebar primer",
      "Brush-applied anti-corrosion coating to exposed reinforcement before placing the repair mortar.",
      "Confirm key performance values (strength / coverage / application) from the current Mapei TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Mapei",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Mapei technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Mapei",
    ],
    procurementSources: [
      { name: "Mapei — Australian trade supply", url: "https://www.mapei.com/au" },
    ],
  }

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

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["application_target", "bare_rebar / concrete_surface", "bare_rebar → zinc-rich rebar primer; concrete_surface (cover intact) → MCI impregnation"],
    ["environment", "carbonation / chloride_coastal_marine", "chloride_coastal_marine → epoxy zinc-rich preferred; carbonation → single-part zinc-rich ok"],
    ["surface_prep", "St2 / Sa2", "gate against product minimum cleanliness requirement (ISO 8501-1)"],
    ["chemistry", "cementitious_zinc / single_part_zinc / epoxy_zinc / mci", "match environment + repair mortar system"],
    ["mortar_compatibility", "system_match / mismatch", "confirm compatible primer from repair mortar manufacturer"],
  ],
  json: {
    category: "rebar_primers_inhibitors",
    stage1_gates: {
      application_target: { allowed: ["bare_rebar", "concrete_surface"], rule: "bare_rebar=zinc-rich primer; concrete_surface=MCI impregnation" },
      environment: { allowed: ["carbonation", "chloride_coastal_marine"], rule: "chloride_marine=epoxy zinc-rich preferred; carbonation=single-part zinc-rich ok" },
      surface_prep: { allowed: ["St2", "Sa2"], rule: "match product minimum cleanliness (ISO 8501-1)" },
      chemistry: { allowed: ["cementitious_zinc", "single_part_zinc", "epoxy_zinc", "mci"], rule: "match environment + repair mortar system" },
      mortar_compatibility: { allowed: ["system_match", "mismatch"], rule: "confirm compatible primer from mortar manufacturer" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Sika FerroGard-903 Plus — Migrating Corrosion Inhibitor (Concrete Impregnation)": {
    rows: [
      ["application_target", "gate", "concrete_surface (NOT bare rebar)"],
      ["environment_max", "gate", "chloride/carbonation"],
      ["surface_prep_min", "gate", "n/a (concrete surface)"],
      ["coats", "gate", "unconfirmed"],
      ["chemistry", "tag", "mci"],
      ["coverage_kg_m2", "rank", "0.50"],
      ["pot_life_min", "rank", "null (n/a)"],
      ["pack_size", "meta", "20L pail / 205L drum"],
      ["compatible_system", "meta", "sika_repair_system"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sika_ferrogard_903_plus",
      gates: { application_target: "concrete_surface", environment_max: "chloride_carbonation", surface_prep_min: "n/a", coats: "unconfirmed" },
      tag: { chemistry: "mci" },
      rank: { coverage_kg_m2: 0.5, pot_life_min: null },
      meta: { pack_size: "20L pail / 205L drum", compatible_system: "sika_repair_system", alternative_product: "sika_ferrogard_710/720_reba (anodes for bare rebar)", data_status: "verified", selectable: true, source: "aus.sika.com FerroGard-903 Plus", confirmed_date: null },
    },
  },
  "Ardex BR 10 ZP — Single-Part Zinc-Rich Primer": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride/carbonation"],
      ["surface_prep_min", "gate", "St2"],
      ["coats", "gate", "2"],
      ["chemistry", "tag", "single_part_zinc"],
      ["coverage_kg_m2", "rank", "null (unconfirmed)"],
      ["pot_life_min", "rank", "null (single component)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "ardex_br_340_345"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "ardex_br_10_zp",
      gates: { application_target: "bare_rebar", environment_max: "chloride_carbonation", surface_prep_min: "St2", coats: "2" },
      tag: { chemistry: "single_part_zinc" },
      rank: { coverage_kg_m2: null, pot_life_min: null },
      meta: { pack_size: null, compatible_system: "ardex_br_340_345", alternative_product: null, data_status: "verified", selectable: true, source: "ardexaustralia.com Ardex BR 10 ZP — full application procedure to confirm", confirmed_date: null },
    },
  },
  "Fosroc Nitoprime Zincrich — Epoxy Zinc-Rich Rebar Primer": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride_marine"],
      ["surface_prep_min", "gate", "Sa2 preferred (St2 min)"],
      ["coats", "gate", "2"],
      ["chemistry", "tag", "epoxy_zinc"],
      ["coverage_kg_m2", "rank", "null (unconfirmed)"],
      ["pot_life_min", "rank", "30-60"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "fosroc_repair_system"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "fosroc_nitoprime_zincrich",
      gates: { application_target: "bare_rebar", environment_max: "chloride_marine", surface_prep_min: "Sa2_preferred_St2_min", coats: "2" },
      tag: { chemistry: "epoxy_zinc" },
      rank: { coverage_kg_m2: null, pot_life_min: "30-60" },
      meta: { pack_size: null, compatible_system: "fosroc_repair_system", alternative_product: null, data_status: "verified", selectable: true, source: "fosroc.com.au Nitoprime Zincrich", confirmed_date: null },
    },
  },
  "Parchem Zinc Primer — General Purpose Rebar Primer": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "carbonation (not aggressive marine)"],
      ["surface_prep_min", "gate", "St2"],
      ["coats", "gate", "2"],
      ["chemistry", "tag", "cementitious_zinc"],
      ["coverage_kg_m2", "rank", "null (unconfirmed)"],
      ["pot_life_min", "rank", "null (single component)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "cementitious_mortars"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "parchem_zinc_primer",
      gates: { application_target: "bare_rebar", environment_max: "carbonation", surface_prep_min: "St2", coats: "2" },
      tag: { chemistry: "cementitious_zinc" },
      rank: { coverage_kg_m2: null, pot_life_min: null },
      meta: { pack_size: null, compatible_system: "cementitious_mortars", alternative_product: "fosroc_nitoprime_zincrich (aggressive env)", data_status: "verified", selectable: true, source: "parchem.com.au Parchem Zinc Primer", confirmed_date: null },
    },
  },
  "Sika MonoTop-910 N": {
    rows: [
      ["application_target", "gate", "bare_rebar"],
      ["environment_max", "gate", "chloride/carbonation"],
      ["surface_prep_min", "gate", "St2"],
      ["coats", "gate", "unconfirmed"],
      ["chemistry", "tag", "cementitious_anticorrosion"],
      ["coverage_kg_m2", "rank", "null (unconfirmed)"],
      ["pot_life_min", "rank", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["compatible_system", "meta", "sika_monotop_system"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sika_monotop_910n",
      gates: { application_target: "bare_rebar", environment_max: "chloride_carbonation", surface_prep_min: "St2", coats: "unconfirmed" },
      tag: { chemistry: "cementitious_anticorrosion" },
      rank: { coverage_kg_m2: null, pot_life_min: null },
      meta: { pack_size: null, compatible_system: "sika_monotop_system", alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com Sika MonoTop-910 N — coverage/timing to confirm", confirmed_date: null },
    },
  },
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

const DESIGN_CRITERIA = "Type: active zinc-rich sacrificial (galvanic) vs epoxy barrier vs cementitious polymer-modified vs surface-applied migrating corrosion inhibitor (MCI); zinc content (% by wt, e.g. >80% in dry film) for sacrificial action; number of coats & DFT; recoat/overcoat window before mortar application; compatibility/bond with chosen repair mortar; chloride-contaminated vs carbonation-only environment suitability; incipient-anode (ring/halo) mitigation capability; pot life & application temp; single vs two-component; coverage per kg/m of bar; conformance to EN 1504-7 (reinforcement protection) concept.";

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

      <AutoProductReference products={PRODUCTS} cards={REBAR_PRIMER_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Rebar primers & inhibitors" />
    </>
  );
}
