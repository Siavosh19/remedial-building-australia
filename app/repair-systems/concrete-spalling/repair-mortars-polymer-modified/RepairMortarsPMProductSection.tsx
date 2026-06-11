"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { ProductReferenceCard } from "../../_components/ProductReferenceCard";

type FilterTag =
  | "General-use"
  | "High-build"
  | "Fine-cosmetic"
  | "Structural"
  | "EN-1504-3"
  | "Thixotropic"
  | "Fibre-reinforced"
  | "Rapid-set"
  | "Hand-applied"
  | "Trowel-grade"
  | "Pre-bagged";

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
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/cementitious-repairmortars.html",
    accentColor: "#be123c",
    name: "Sika MonoTop Series — MonoTop-352NFG / MonoTop-612N / MonoTop-412NFG",
    descriptionLine: "Range of polymer-modified structural repair mortars — MonoTop-352NFG (general use, R3, up to 75 mm), MonoTop-612N (high-build, R4, up to 100 mm), MonoTop-412NFG (structural R4, up to 50 mm) — available nationally including Bunnings. TODO: owner confirm — fine/cosmetic fairing coat is Sika MonoTop FC (0–3 mm, 15 kg), not MonoTop-412NFG — verify intended range with Sika Australia",
    productType: "Polymer-modified cementitious repair mortar range — EN 1504-3",
    filterTags: ["General-use", "High-build", "Fine-cosmetic", "Structural", "EN-1504-3", "Thixotropic", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "EN 1504-3 Class R3 (352NFG) / R4 (612N, 412NFG)", cls: "bg-rose-100 text-rose-800" },
      { label: "Three-product range", cls: "bg-slate-100 text-slate-700" },
      { label: "Bunnings availability", cls: "bg-green-50 text-green-700" },
      { label: "No bonding primer required (352NFG, 612N)", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-bagged — add water", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika's MonoTop range provides a complete polymer-modified repair mortar system for concrete spalling in Class 2 strata, carparks, and civil structures. MonoTop-352NFG is the standard structural repair mortar — EN 1504-3 Class R3 rated, polymer-modified, fibre-reinforced, with built-in corrosion inhibitor, applied in layers up to 75 mm on vertical and overhead surfaces — and does not require a bonding primer on a well-prepared and roughened substrate when manually applied (Sika AU TDS). For deep spall repairs up to 100 mm single-layer, MonoTop-612N (EN 1504-3 Class R4) is the high-build formula. MonoTop-412NFG is an EN 1504-3 Class R4 structural mortar applicable up to 50 mm — it is NOT a fine cosmetic mortar. For cosmetic fairing and off-form concrete repairs from 0–3 mm, Sika MonoTop FC is the correct product (15 kg bag). All products are pre-bagged dry-mix mixed with clean water only. Sika MonoTop-352NFG is available through Bunnings nationally. Confirm all application procedures and primer requirements from the current Sika Australia TDS — do not use Sika international TDS for Australian projects.",
    technicalProperties: [
      "MonoTop-352NFG — EN 1504-3 Class R3 — structural repair — applies up to 75 mm per layer — no bonding primer required on well-prepared substrate — contains corrosion inhibitor — 20 kg bags",
      "MonoTop-612N — EN 1504-3 Class R4 — high-build formula for deep spalls up to 100 mm single-layer — 20 kg bags",
      "MonoTop-412NFG — EN 1504-3 Class R4 structural repair mortar — applies up to 50 mm per layer — contains corrosion inhibitor — 20 kg bags — TODO: owner confirm — this is a structural mortar, not cosmetic; fine fairing coat is Sika MonoTop FC (0–3 mm, 15 kg bag)",
      "All products: pre-bagged, mixed with clean water only — no separate polymer additive required",
      "MonoTop-352NFG and MonoTop-612N: bonding primer generally not required on well-prepared, roughened, and pre-wet substrate — confirm from current Sika AU TDS",
      "Good adhesion to prepared concrete substrates — where a bonding primer is required, confirm compatible Sika product from the TDS",
      "MonoTop-352NFG widely available through Bunnings nationally — other grades through Sika trade supply",
    ],
    limitations: [
      "MonoTop-352NFG and MonoTop-612N do NOT require a bonding primer on a well-prepared, roughened substrate when manually applied — confirm from current Sika Australia TDS before specifying a primer unnecessarily",
      "Do not apply MonoTop-612N over active or moving cracks — the mortar is rigid once cured and will re-crack if substrate movement continues",
      "Maximum single-coat thickness: MonoTop-352NFG 75 mm, MonoTop-412NFG 50 mm, MonoTop-612N 100 mm — confirm from current TDS — exceeding thickness limits causes shrinkage cracking",
      "In temperatures below +5°C or above +35°C, adjust application procedures — confirm cold/hot weather requirements with Sika Australia",
      "TODO: owner confirm — MonoTop-412NFG is an EN 1504-3 R4 structural mortar per Sika AU TDS, not a fine/cosmetic mortar — if a fine fairing coat is required, specify Sika MonoTop FC (0–3 mm, 15 kg bag)",
      "Confirm current product names with Sika Australia — MonoTop range is subject to periodic formulation and naming revision",
      "Do not allow fresh mortar to dry too rapidly — protect from sun, wind, and rain for minimum 24 hours post-application",
    ],
    procurementSources: [
      { name: "Bunnings — MonoTop-352NFG nationally", url: "https://www.bunnings.com.au" },
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://ardexaustralia.com",
    tdsUrl: "https://ardexaustralia.com/products_category/concrete-repair/concrete-repair-mortars/",
    accentColor: "#0369a1",
    name: "Ardex BR Series — BR 340 / BR 345 / Feather Finish",
    descriptionLine: "Polymer-modified repair mortar range — BR 340 (structural, up to 80 mm, 20 kg), BR 345 (high resistivity structural, up to 80 mm, 20 kg), Ardex Feather Finish (fine/cosmetic — TODO: confirm on current AU catalogue) — through Ardex trade distribution",
    productType: "Polymer-modified cementitious repair mortar range — Ardex Australia",
    filterTags: ["General-use", "High-build", "Fine-cosmetic", "Structural", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "Three-product range", cls: "bg-sky-100 text-sky-800" },
      { label: "BR 340 (structural, up to 80 mm)", cls: "bg-slate-100 text-slate-700" },
      { label: "BR 345 (high resistivity, up to 80 mm)", cls: "bg-green-50 text-green-700" },
      { label: "TODO: confirm fine/cosmetic product", cls: "bg-amber-50 text-amber-700" },
      { label: "Ardex trade supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Ardex Australia's repair mortar range for concrete spalling provides three products covering the full range of spall repair applications. Ardex BR 340 is a MICROTEC Fibre-Reinforced, Polymer Modified, Structural Concrete Patching and Repair Mortar — high-build, applicable up to 80 mm on vertical, horizontal, and overhead surfaces, with active corrosion inhibitor, supplied in 20 kg bags. Ardex BR 345 is a High Resistivity variant of the same system — also up to 80 mm — for use in higher chloride-risk environments. For fine cosmetic profiling and surface blemish repair, TODO: owner confirm — Ardex Feather Finish availability and correct product name on the current Ardex Australia catalogue, as this product was not found by name on ardexaustralia.com during this audit. All Ardex repair mortars are pre-bagged and mixed with clean water. Ardex BR products are available through Ardex trade supply nationally. Confirm all primer requirements and application instructions from the current Ardex Australia TDS before specifying.",
    technicalProperties: [
      "BR 340 — MICROTEC Fibre-Reinforced, Polymer Modified Structural repair mortar — up to 80 mm on vertical, horizontal, and overhead surfaces — 20 kg bag",
      "BR 345 — High Resistivity (>15,000 Ω cm) Polymer-Modified Structural repair mortar — up to 80 mm — designed for higher chloride-risk environments — 20 kg bag",
      "TODO: owner confirm — Ardex Feather Finish product name and availability on current Ardex Australia catalogue — not found by that name on ardexaustralia.com during this audit",
      "All products: pre-bagged dry-mix, mixed with clean water only — no separate polymer admix",
      "TODO: owner confirm — correct primer/bonding agent for BR 340 and BR 345 — Ardex P 51 is a flooring primer (internal only per ardexaustralia.com), not a concrete repair bonding primer — confirm correct Ardex primer from Ardex Australia TDS",
      "Good adhesion to prepared, saturated-surface-dry concrete and masonry",
      "Available nationally through Ardex trade supply and selected building merchants",
    ],
    limitations: [
      "TODO: owner confirm — mandatory primer for BR 340 and BR 345 — Ardex P 51 is described as a flooring primer (internal only) on ardexaustralia.com, not a concrete repair bonding primer — confirm correct primer from Ardex Australia TDS before specifying",
      "Ardex BR 345 must be applied within the pot life after mixing — confirm pot life and batch mixing volumes from current Ardex TDS",
      "TODO: owner confirm — Ardex Feather Finish product name and whether it remains in the current Australian catalogue — if not, identify the correct Ardex fine cosmetic repair product",
      "Do not apply in direct sun, high wind, or rain — protect fresh mortar from rapid drying for at least 24 hours",
      "Confirm current Ardex product names and pack sizes with Ardex Australia — product range is subject to revision",
      "BR 340 and BR 345 at high builds (>50 mm) — confirm any additional requirements with Ardex Australia from current TDS",
    ],
    procurementSources: [
      { name: "Ardex Australia — trade supply nationally", url: "https://ardexaustralia.com" },
      { name: "Ardex Distributor Network — confirm local branch", url: "https://ardexaustralia.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products",
    accentColor: "#7c2d12",
    name: "Fosroc Renderoc Series — Renderoc HB / Renderoc FC (high-build: TODO confirm)",
    descriptionLine: "Polymer-modified repair mortar range — Renderoc HB (structural, hand-applied bulk), Renderoc FC (fine concrete, cosmetic) — distributed nationally by Parchem Construction Supplies. TODO: owner confirm — Renderoc LA product name not found in Fosroc global product list; Fosroc range includes Renderoc HB, HB2, HB25, HB40, HB60 variants — confirm current Australian high-build product name with Parchem",
    productType: "Polymer-modified cementitious repair mortar range — Fosroc / Parchem Australia",
    filterTags: ["General-use", "High-build", "Fine-cosmetic", "Structural", "EN-1504-3", "Fibre-reinforced", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "Renderoc HB (structural)", cls: "bg-orange-100 text-orange-900" },
      { label: "TODO: confirm high-build product name with Parchem AU", cls: "bg-slate-100 text-slate-700" },
      { label: "Renderoc FC (fine)", cls: "bg-green-50 text-green-700" },
      { label: "Parchem — national supply", cls: "bg-amber-50 text-amber-700" },
      { label: "DuluxGroup distribution", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Fosroc Renderoc range, distributed nationally through Parchem Construction Supplies (DuluxGroup), provides a structured polymer-modified repair mortar system for concrete spalling across all depth ranges. Renderoc HB (Hand-applied Bulk) is the standard structural repair mortar for general spalling applications — hand-applied, thixotropic, suitable for vertical and overhead surfaces in layers up to 50 mm. It requires Fosroc Nitobond EP (2-part epoxy bonding agent) on dense or smooth surfaces, or Fosroc Nitobond SBR slurry coat on porous concrete surfaces. For large-area or deep spall repairs, Renderoc LA (Large Area) is a high-build formula with steel fibre reinforcement available, designed for single-layer applications to greater depths with minimal formwork. For fine concrete cosmetic repair and profiling, Renderoc FC provides a fine-textured polymer mortar that matches the surface finish of smooth concrete surfaces. All Renderoc products are pre-bagged and mixed with clean water on site. Parchem maintains technical branches in most metropolitan centres and provides strong on-site technical support for large commercial and strata remediation projects. Confirm primer selection, EN 1504-3 class compliance, and maximum layer thickness from the current Fosroc/Parchem TDS before specifying.",
    technicalProperties: [
      "Renderoc HB — hand-applied structural repair mortar — TODO: owner confirm layer thickness — Fosroc global range shows variants up to HB60 — confirm which specific Renderoc HB variant is available through Parchem AU",
      "TODO: owner confirm — Renderoc LA not found in Fosroc global product listing — Fosroc range includes Renderoc HB, HB2, HB25, HB40, HB60 high-build variants — confirm current Australian high-build product name and layer thickness with Parchem",
      "Renderoc FC — fine concrete repair mortar — cosmetic patching, profiling, and honeycombing repair — featherable finish",
      "Nitobond SBR (slurry) or Nitobond EP (epoxy) primer required before structural mortar application — confirm primer selection from Parchem TDS",
      "Pre-bagged — mixed with clean water only — no polymer additive required",
      "Widely available through Parchem Construction Supplies (DuluxGroup) — strong national trade support network",
      "Renderoc range carries EN 1504-3 conformance for key products — confirm class (R3/R4) from Parchem TDS",
    ],
    limitations: [
      "Nitobond SBR or Nitobond EP primer is mandatory — confirm correct primer type for substrate (porous concrete vs. smooth/dense concrete) with Parchem before specifying",
      "Renderoc LA at high build depths requires control joints to be incorporated into the repair — failure to include movement joints is a common cause of re-cracking",
      "Renderoc FC is NOT a structural repair mortar — must only be used for cosmetic profiling over a sound structural repair",
      "Confirm current product names and EN 1504-3 class with Parchem — Fosroc range distributed by Parchem is subject to periodic revision",
      "Do not apply Renderoc products in temperatures below +5°C or above +35°C — confirm cold/hot weather procedures with Parchem",
      "TODO: owner confirm — Renderoc LA SFR (steel fibre reinforced) availability through Parchem for Australian projects — confirm with Parchem technical",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national distribution (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products",
    accentColor: "#1d4ed8",
    name: "Mapei Mapegrout Series — Mapegrout Thixotropic / Mapegrout SFR / Mapegrout Fine Fibre",
    descriptionLine: "Polymer-modified repair mortar range — Mapegrout Thixotropic (structural, 25 kg), Mapegrout SFR (steel fibre reinforced high-build, 25 kg), Mapegrout Fine Fibre (fine finish, 25 kg) — through Mapei trade and Bayset",
    productType: "Polymer-modified cementitious repair mortar range — Mapei Australia",
    filterTags: ["General-use", "High-build", "Fine-cosmetic", "Structural", "Fibre-reinforced", "Thixotropic", "Pre-bagged", "Hand-applied", "Trowel-grade"],
    techChips: [
      { label: "Mapegrout Thixotropic (structural)", cls: "bg-blue-100 text-blue-900" },
      { label: "Mapegrout SFR (high-build)", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapegrout Fine Fibre (finish)", cls: "bg-green-50 text-green-700" },
      { label: "Steel fibre reinforced option", cls: "bg-amber-50 text-amber-700" },
      { label: "Bayset — national supply", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mapei Australia's Mapegrout range provides a structured system of polymer-modified repair mortars covering structural, high-build, and fine cosmetic applications for concrete spalling repair. Mapegrout Thixotropic is the primary structural repair mortar — a thixotropic, polymer-modified cementitious mortar suitable for vertical and overhead application in layers up to 30–40 mm without sagging. It requires Mapei Planicrete AC (acrylic bonding agent) slurry coat or Mapei Eporip (epoxy bonding agent) on dense substrates before application. For deep spall repairs and large-area applications, Mapegrout SFR (Steel Fibre Reinforced) incorporates stainless steel fibres for improved tensile resistance and crack distribution, allowing single-layer application to greater depths and reducing the need for reinforcing mesh in repair zones below 50 mm depth. For fine cosmetic profiling and surface blemish repair, Mapegrout Fine Fibre is a polymer-modified fine-aggregate mortar reinforced with polypropylene fibres for improved crack resistance at thin sections. The Mapegrout range is available through Mapei Australia trade supply and Bayset nationally. Confirm primer selection, DFT, and EN 1504-3 compliance from the current Mapei Australia TDS before specifying — do not rely on Mapei European or international TDS for Australian product specifications.",
    technicalProperties: [
      "Mapegrout Thixotropic — structural repair mortar — 10–40 mm layer — thixotropic for vertical/overhead — polymer-modified pre-bagged",
      "Mapegrout SFR — steel fibre reinforced high-build repair mortar — greater depth repairs — fibre distribution reduces mesh requirement at <50 mm depth",
      "Mapegrout Fine Fibre — fine polypropylene fibre reinforced finish mortar — cosmetic profiling and thin-section repair",
      "Planicrete AC (acrylic slurry) or Eporip (epoxy) primer required before structural mortar application — confirm from Mapei TDS",
      "All products: pre-bagged dry-mix — mixed with clean water only — no separate polymer admix required",
      "Available through Mapei Australia trade supply and Bayset nationally",
      "Confirm EN 1504-3 class and compliance designation from current Mapei Australia TDS",
    ],
    limitations: [
      "Primer coat (Planicrete AC or Eporip) is mandatory before Mapegrout Thixotropic and SFR — do not apply directly to dry concrete",
      "Mapegrout Fine Fibre is NOT a structural repair mortar — do not use for structural spalling repair — cosmetic profiling only over a sound structural repair",
      "Mapegrout SFR at high build depths (>50 mm) — confirm reinforcing mesh or additional steel fibre requirement with Mapei Australia",
      "Do not apply in temperatures below +5°C or above +35°C — wet cure for minimum 7 days after application in hot or dry conditions",
      "Confirm current product names and pack sizes with Mapei Australia — Mapegrout range is subject to revision",
      "TODO: owner confirm — Mapegrout SFR and Mapegrout Fine Fibre — confirm current Australian catalogue names and availability with Mapei Australia technical",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national Mapei distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Fosroc Renderoc G",
    descriptionLine: "General-purpose polymer-modified cementitious repair mortar for concrete spalling repair — hand-applied trowel-grade — confirm current formulation, coverage, and system design with Parchem technical",
    productType: "General-purpose PM repair mortar — concrete spalling repair",
    filterTags: ["General-use", "Thixotropic", "Hand-applied", "Trowel-grade", "Pre-bagged"],
    techChips: [{ label: "General use", cls: "bg-blue-100 text-blue-700" }, { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" }, { label: "Trowel-grade", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Fosroc Renderoc G is a general-purpose polymer-modified cementitious repair mortar for concrete spalling repair on balconies, facades, car parks, and building structures. It is a pre-bagged, hand-applied trowel-grade mortar suitable for shallow to medium-depth spall reinstatement.\n\nRenderoc G is part of the Fosroc Renderoc concrete repair system, distributed in Australia through Parchem Construction Supplies. Confirm current product technical data sheet, maximum application thickness, coverage, rebar primer specification, and system design with Parchem technical before specifying. The Fosroc product range distributed by Parchem is subject to periodic revision — verify current product name and availability with Parchem.",
    technicalProperties: [
      "General-purpose polymer-modified cementitious repair mortar — suitable for shallow to medium-depth concrete spalling repair",
      "Pre-bagged trowel-grade mortar — hand-applied — part of the Fosroc Renderoc repair system",
      "Confirm maximum thickness, coverage, rebar primer, and system design from current Fosroc/Parchem Renderoc G TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Parchem technical before specifying",
      "Rebar anti-corrosion primer (Nitoprime Zincrich or equivalent) is typically required before mortar application — confirm with Parchem",
      "Not suitable for application over wet or contaminated concrete — substrate preparation to current Fosroc specification is mandatory",
      "Confirm current Fosroc product range revision status and Renderoc G availability with Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national distribution (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "General-use", label: "General use" },
  { id: "High-build", label: "High-build" },
  { id: "Fine-cosmetic", label: "Fine / cosmetic" },
  { id: "Structural", label: "Structural rated" },
  { id: "EN-1504-3", label: "EN 1504-3" },
  { id: "Thixotropic", label: "Thixotropic" },
  { id: "Fibre-reinforced", label: "Fibre-reinforced" },
  { id: "Rapid-set", label: "Rapid-set" },
  { id: "Hand-applied", label: "Hand-applied" },
  { id: "Pre-bagged", label: "Pre-bagged" },
];

const SYSTEM_COMPARISON = [
  {
    brand: "Sika",
    generalMortar: "Sika MonoTop-352NFG",
    highBuild: "Sika MonoTop-612N",
    fineMortar: "Sika MonoTop FC (0–3 mm fairing coat) — TODO: owner confirm MonoTop-412NFG is R4 structural, not cosmetic",
    en1504: "EN 1504-3 Class R3 (352NFG) / R4 (612N, 412NFG)",
    maxLayer: "75 mm (352NFG) / 100 mm (612N) / 50 mm (412NFG)",
    primer: "TODO: owner confirm — no bonding primer required on well-prepared substrate per Sika AU TDS for 352NFG and 612N",
    availability: "Bunnings + Sika trade",
    primaryUse: "Full range — strata, carparks, civil",
  },
  {
    brand: "Ardex",
    generalMortar: "Ardex BR 340",
    highBuild: "Ardex BR 345",
    fineMortar: "TODO: owner confirm — Ardex Feather Finish not confirmed on current ardexaustralia.com",
    en1504: "Confirm with Ardex Australia TDS",
    maxLayer: "80 mm (BR 340) / 80 mm (BR 345)",
    primer: "TODO: owner confirm — Ardex P 51 is a flooring primer per ardexaustralia.com — confirm correct primer for concrete repair from Ardex TDS",
    availability: "Ardex trade supply",
    primaryUse: "Structural spall repair — strata and commercial",
  },
  {
    brand: "Fosroc / Parchem",
    generalMortar: "Fosroc Renderoc HB",
    highBuild: "TODO: owner confirm — Renderoc LA not found in Fosroc global range — confirm high-build product name with Parchem AU",
    fineMortar: "Fosroc Renderoc FC",
    en1504: "EN 1504-3 — confirm class from Parchem TDS",
    maxLayer: "TODO: owner confirm layer thicknesses for AU products with Parchem",
    primer: "Nitobond SBR or Nitobond EP",
    availability: "Parchem (DuluxGroup) nationally",
    primaryUse: "Commercial, strata, carparks — strong technical support",
  },
  {
    brand: "Mapei",
    generalMortar: "Mapei Mapegrout Thixotropic",
    highBuild: "Mapei Mapegrout SFR",
    fineMortar: "Mapei Mapegrout Fine Fibre",
    en1504: "TODO: owner confirm — Mapei AU website is access-restricted — confirm EN 1504-3 class from Mapei Australia TDS",
    maxLayer: "TODO: owner confirm — Mapei AU website is access-restricted — confirm layer thickness for Mapegrout Thixotropic and SFR from Mapei Australia TDS",
    primer: "TODO: owner confirm — Planicrete AC or Eporip — confirm current Australian product names and primer selection from Mapei Australia TDS",
    availability: "Mapei trade + Bayset nationally",
    primaryUse: "Structural spall repair — strata and commercial",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full-depth spalling repair on concrete balcony soffits, columns, beams, and slab edges in Class 2 strata buildings where chloride-induced or carbonation-induced corrosion has caused concrete loss",
    "Large-area concrete spalling repair on carpark decks, vehicle ramps, and structural columns in commercial and mixed-use buildings",
    "Cosmetic profiling and void filling on exposed concrete facades, balcony soffits, and stair structures where honeycombing, surface pitting, or form-tie blow-outs require repair",
    "Reinstatement of concrete cover over repaired or replaced reinforcement bars after corrosion-induced spalling",
    "Surface preparation and profiling prior to protective coating application (anti-carbonation, elastomeric, or epoxy coating systems)",
    "Patch repair at concrete spalling on civil structures — bridges, retaining walls, car park frames, stormwater assets",
  ],
  selectionCriteria: [
    "Repair depth: use general-use mortar for depths up to 30–40 mm; high-build formula for 30–100 mm single-layer repairs; fine mortar for cosmetic profiling only",
    "Substrate: confirm primer type for substrate — epoxy bonding agent for smooth/dense concrete; SBR slurry coat for porous or prepared rough concrete",
    "EN 1504-3 compliance: structural repairs on Class 2 strata buildings should specify EN 1504-3 Class R3 or R4 product where the repair is load-bearing or cosmetically exposed",
    "Reinforcement exposure: where corroded rebar is exposed, clean, and primed with a zinc-rich or epoxy rebar primer before applying the repair mortar — do not encapsulate unprepared corroded rebar",
    "Vertical and overhead: confirm thixotropic consistency of the selected product — non-thixotropic mortars will sag on vertical surfaces at typical layer thicknesses",
    "Large area vs. patch repair: large-area repairs may require a high-build formula with steel fibre reinforcement to avoid shrinkage cracking — include control joints at maximum 1.5m centres in large-area applications",
    "Finishing: confirm whether the selected mortar produces a surface compatible with the specified coating system — some repair mortars require a compatible skim coat or coating primer before topcoat",
  ],
  limitations: [
    "Not suitable over active or moving cracks — polymer-modified mortars are rigid once cured and will re-crack under live structural movement",
    "Repair mortar alone does not address the cause of spalling — without treating the underlying corrosion (by cleaning rebar, applying corrosion inhibitor, and ensuring adequate concrete cover), spalling will recur within a few years",
    "Minimum cover requirement: reinstated concrete cover must meet AS 3600 minimum cover for the exposure classification — typically 40 mm for C2 exposure in residential strata",
    "Carbonation interface: on carbonated structures, apply an anti-carbonation or silane/siloxane protective coating system over the cured repair to prevent further carbonation advance",
    "Do not apply repair mortar over contaminated or chloride-saturated concrete without removing the chloride-affected layer — encapsulating active chloride contamination will cause recurring corrosion behind the repair",
    "Fresh repair mortar must be cured for minimum 7 days — polythene sheeting or curing compound application immediately after finishing is mandatory in exposed or hot/windy conditions",
  ],
  standardsNotes: [
    "AS 3600 — Concrete Structures — minimum cover requirements for exposure classification — repair mortar reinstatement must achieve minimum cover compliance",
    "EN 1504-3 — Products and Systems for Protection and Repair of Concrete Structures — repair mortars rated under EN 1504-3 Class R3 or R4 are appropriate for structural repair on Class 2 buildings",
    "AS 3735 — Concrete Structures for Retaining Liquids — relevant for carpark slabs with drainage or wet-area concrete repair",
    "ICRI Technical Guideline 310.2 — Surface Profile (CSP) requirements for concrete repair — minimum CSP 3–5 for polymer-modified repair mortars — confirm with manufacturer",
    "Australian standards and codes take precedence over EN designations — confirm with the project engineer that EN-rated products satisfy the applicable Australian project specification",
    "Manufacturer TDS — primer application, saturated-surface-dry substrate, mortar consistency, layer thickness, inter-coat timing, and curing protection are all critical hold points confirmed in the current TDS",
  ],
  suitableDefects: [
    "Concrete spalling — loss of concrete cover due to reinforcement corrosion, freeze-thaw, or mechanical damage — primary application for polymer-modified repair mortars",
    "Honeycombing — void formation during concrete placement — typically treated with fine or general-use repair mortar after cleaning and priming",
    "Slab edge and fascia beam deterioration — spalled or broken slab edges and balcony fascia beams where concrete cover has been lost and rebar is exposed",
    "Surface pitting and abrasion — carpark ramp surfaces, column bases, and industrial floor edges subject to mechanical wear or surface scaling",
    "Form-tie blow-outs and bug holes — cosmetic surface defects on exposed architectural concrete facades",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — must be fully chipped back to sound concrete beyond carbonation front — mechanically prepared to CSP 3–5 — saturated surface dry before mortar application",
    "Precast concrete — same preparation as in-situ — confirm primer requirement with manufacturer for high-density precast elements",
    "Masonry and rendered concrete — confirm product suitability for masonry substrates with the manufacturer — some repair mortars are formulated specifically for concrete substrates",
    "Exposed corroded reinforcement bars — clean to bright steel (St 2 minimum per ISO 8501-1) — apply corrosion inhibitor and zinc-rich or epoxy rebar primer before applying repair mortar",
    "Previously repaired concrete — confirm adhesion of existing repair to substrate before applying new mortar — delaminated or hollow-sounding patches must be removed",
  ],
};

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

export function RepairMortarsPMIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are polymer-modified repair mortars?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Polymer-modified cementitious repair mortars are the standard material for concrete spalling repair in Australian remedial building practice. They consist of a dry-mix blend of cement, aggregate, and pre-incorporated polymer (typically acrylic or SBR) that is mixed with clean water on site. The polymer component improves adhesion to prepared concrete, reduces shrinkage during curing, and provides better resistance to cracking compared to plain sand-cement mortar mixes.
        </p>
        {expanded && (
          <>
            <p>
              These mortars are classified under EN 1504-3 (Products and Systems for the Protection and Repair of Concrete Structures) — Class R3 is the minimum specification for structural repairs where the mortar reinstates concrete cover over reinforcement. The key product selection variables are: repair depth (general-use for up to 30–40 mm; high-build for 30–100 mm; fine mortar for cosmetic thin-section work), thixotropy (required for vertical and overhead surfaces), and primer compatibility.
            </p>
            <p>
              In Australian Class 2 strata practice, polymer-modified repair mortars are used in conjunction with substrate preparation (mechanical scarification to remove delaminated concrete, rust-affected cover, and carbonated material), corrosion treatment of exposed reinforcement (inhibitor + primer), and protective coating systems applied over the cured repair. The repair is only part of the system — without treating the underlying corrosion and protecting the repair surface against continued carbonation or chloride ingress, spalling will recur within a few years.
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

export function RepairMortarsPMProductSection() {
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
      {/* ── Technical Accordion ── */}
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

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 brands — polymer-modified structural repair mortar ranges — scroll to view all</p>
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
            {visibleProducts.length} brand{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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
              <ProductReferenceCard
                name={product.name}
                brand={product.fullLabel}
                brandUrl={product.brandUrl}
                tdsUrl={product.tdsUrl}
                accentColor={product.accentColor}
                descriptionLine={product.descriptionLine}
                techChips={product.techChips}
                productType={product.productType}
                systemDescription={product.systemDescription}
                technicalProperties={product.technicalProperties}
                limitations={product.limitations}
                procurementSources={product.procurementSources}
              />
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of polymer-modified repair mortar ranges. Confirm all product selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">General / structural mortar</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">High-build mortar</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fine / cosmetic mortar</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">EN 1504-3</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Max layer</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primer required</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Availability</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.generalMortar}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.highBuild}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fineMortar}</td>
                  <td className="px-4 py-3 text-slate-600">{row.en1504}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maxLayer}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primer}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.availability}</td>
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
