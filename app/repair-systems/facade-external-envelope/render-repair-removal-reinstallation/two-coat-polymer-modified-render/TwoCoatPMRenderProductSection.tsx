"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Polymer-modified"
  | "Two-coat"
  | "Exterior"
  | "Interior"
  | "Masonry"
  | "Concrete"
  | "Pre-bagged"
  | "Hand-applied"
  | "Machine-applied"
  | "Lightweight"
  | "Fibre-reinforced"
  | "Coastal"
  | "Heritage"
  | "AS-3700"
  | "Thixotropic";

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
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/planitop-xs",
    accentColor: "#0369a1",
    name: "Mapei Planitop XS + Planitop Smooth & Repair",
    descriptionLine: "Two-coat system — Planitop XS (polymer-modified base/scratch coat) + Planitop Smooth & Repair (fine polymer-modified finish coat) — exterior and interior masonry and concrete facades",
    productType: "Two-coat polymer-modified cementitious render system",
    filterTags: ["Polymer-modified", "Two-coat", "Exterior", "Interior", "Masonry", "Concrete", "Pre-bagged", "Hand-applied", "AS-3700"],
    techChips: [
      { label: "Two-coat system", cls: "bg-sky-100 text-sky-800" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior and interior", cls: "bg-green-50 text-green-700" },
      { label: "Pre-bagged — just add water", cls: "bg-slate-100 text-slate-700" },
      { label: "Hand or machine apply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Mapei two-coat polymer-modified render system pairs Planitop XS as the base/scratch coat with Planitop Smooth & Repair as the fine finishing coat. Planitop XS is a polymer-modified, lightweight, cementitious repair mortar suitable for application as a scratch coat or base render on concrete, masonry, and block substrates in both interior and exterior environments. It has good adhesion to prepared substrates without the need for a separate bonding slurry in most applications — confirm primer requirement with Mapei Australia for specific substrates. The finish coat, Planitop Smooth & Repair, is a fine-textured polymer-modified mortar that provides a smooth working surface ready for coating or paint. The combined system is widely used for facade patch repair, render cracking remediation, and full-sheet re-render on Class 2 strata buildings. Both products are pre-bagged and mixed with clean water only on site — no separate polymer additive is required. Application is by steel trowel for scratch coat and stainless steel or plastic float for finish coat. A minimum of 24 hours between scratch coat and finish coat application should be allowed. Confirm current TDS, DFT requirements, and primer specification with Mapei Australia technical before specifying.",
    technicalProperties: [
      "Two-coat system — Planitop XS (base/scratch) + Planitop Smooth & Repair (finish) — both pre-bagged",
      "Polymer-modified cementitious binder — good adhesion to concrete, masonry, and block substrates",
      "Exterior and interior use — balcony soffits, facade walls, stair risers, masonry blockwork",
      "Application by steel trowel (scratch coat) or float (finish coat) — machine application possible with render pump (confirm with Mapei)",
      "Confirm minimum DFT, inter-coat timing, and primer requirements from current Mapei TDS before specifying",
      "Pre-bagged — mixed with clean water only — no separate polymer additive required",
      "Confirm AS 3700 masonry standard compliance and suitability for external exposed areas with Mapei Australia technical",
    ],
    limitations: [
      "Confirm primer requirement for each substrate type with Mapei Australia — Planitop XS has good inherent adhesion but substrate condition affects bonding performance",
      "Minimum inter-coat time between base and finish coats must be confirmed from current TDS — avoid applying finish over a still-green scratch coat",
      "Not suitable for structural crack repair where active cracking requires flexible bridging — use a crack-bridging coating system over the cured render instead",
      "Not a trafficable finish — must be coated with a compatible exterior coating, paint, or texture system",
      "Confirm current product names and formulations with Mapei Australia — product range subject to periodic revision",
      "Do not apply in temperatures below +5°C or above +35°C, or when rain is imminent within 24 hours of application",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset — national distribution", url: "https://www.bayset.com.au" },
      { name: "Pavers Plus", url: "https://www.paversplus.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote / Saint-Gobain Australia",
    brandUrl: "https://www.rockcote.com.au",
    accentColor: "#b45309",
    name: "Rockcote Primus Basecoat + Rockcote Finessa",
    descriptionLine: "Two-coat system — Rockcote Primus Basecoat (polymer-modified base/scratch coat) + Rockcote Finessa Fine Render (smooth finish coat) — exterior masonry, AAC, and concrete facade systems",
    productType: "Two-coat polymer-modified render system — exterior facade",
    filterTags: ["Polymer-modified", "Two-coat", "Exterior", "Masonry", "Concrete", "Pre-bagged", "Hand-applied", "Machine-applied", "Heritage"],
    techChips: [
      { label: "Two-coat", cls: "bg-amber-100 text-amber-800" },
      { label: "Primus + Finessa system", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior masonry", cls: "bg-green-50 text-green-700" },
      { label: "Machine or hand apply", cls: "bg-slate-100 text-slate-700" },
      { label: "Heritage / texture compatible", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Rockcote's standard exterior two-coat render system pairs the Primus Basecoat as the polymer-modified base/scratch coat with the Finessa Fine Render as the smooth finishing coat. Rockcote Primus Basecoat is a pre-blended polymer-modified cement render designed for machine or hand application as a full-thickness base coat over masonry, AAC, concrete, and render substrates. It provides good adhesion and a keyed surface for the finish coat. Rockcote Finessa is a fine-textured, smooth polymer-modified finish render that can be applied directly over the Primus Basecoat to produce a fine render surface ready for coating, painting, or texture finish application. The Rockcote system is widely used in Australian residential and strata remediation projects and is a well-established product range across the eastern seaboard trade supply market. Rockcote products are available through Saint-Gobain trade distribution nationally. The Finessa Fine Render can also be overcoated directly with Rockcote or Dulux Acratex texture coating systems. Confirm all TDS, application rates, inter-coat timing, and primer recommendations with Rockcote technical or Saint-Gobain Weber Australia before specifying.",
    technicalProperties: [
      "Primus Basecoat — polymer-modified pre-blended render base coat — machine or hand application — suitable over masonry, AAC, concrete, and existing render",
      "Finessa Fine Render — polymer-modified smooth fine finish coat — applied over Primus Basecoat by steel float or machine",
      "Exterior and facade system — designed for Australian exterior conditions including coastal and high-UV environments (confirm coastal rating with Rockcote)",
      "Compatible with Rockcote texture and coating systems as overcoat — also compatible with Dulux Acratex topcoat systems (confirm compatibility)",
      "Pre-bagged — mixed with clean water only on site",
      "Confirm minimum base coat thickness, DFT, inter-coat timing, and primer requirements from current Rockcote TDS",
      "Widely available nationally through Saint-Gobain Weber and Rockcote trade supply networks",
    ],
    limitations: [
      "Confirm current product names — Rockcote range has been consolidated with Saint-Gobain Weber Australia — some product names may have changed",
      "Not a structural repair mortar — substrate must be sound before applying render — use a structural repair system where spalling, delamination, or carbonation is present before applying render",
      "Confirm primer requirement for smooth or non-absorbent substrates (e.g. existing paint, polished concrete) — Primus Basecoat is not self-priming on all substrates",
      "Finessa Fine Render should not be applied at excessive thickness — confirm maximum single-coat thickness from TDS",
      "Do not apply in direct sun, high wind, or when rain is expected within 24 hours",
      "TODO: owner confirm — verify current Rockcote Primus Basecoat and Finessa Fine Render product availability and specification with Saint-Gobain Weber / Rockcote technical",
    ],
    procurementSources: [
      { name: "Rockcote / Saint-Gobain Weber — trade supply", url: "https://www.rockcote.com.au" },
      { name: "Saint-Gobain Weber Australia", url: "https://au.weber.saint-gobain.com" },
      { name: "National building materials trade suppliers — confirm local availability", url: "https://www.rockcote.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika SikaTop-122 Plus (Scratch) + SikaTop-144 Fine Mortar (Finish)",
    descriptionLine: "Two-coat system — SikaTop-122 Plus (polymer-modified scratch coat / bonding mortar) + SikaTop-144 (fine polymer-modified finish mortar) — exterior concrete and masonry facades — TODO: confirm SikaTop-144 AU availability",
    productType: "Two-coat polymer-modified cementitious render system — Sika Australia",
    filterTags: ["Polymer-modified", "Two-coat", "Exterior", "Interior", "Masonry", "Concrete", "Pre-bagged", "Thixotropic", "Hand-applied"],
    techChips: [
      { label: "Two-coat", cls: "bg-rose-100 text-rose-800" },
      { label: "SikaTop-122 Plus (scratch)", cls: "bg-slate-100 text-slate-700" },
      { label: "SikaTop-144 Fine (finish)", cls: "bg-green-50 text-green-700" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm AU availability", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Australia's two-coat polymer-modified render system pairs SikaTop-122 Plus as the polymer-modified scratch/base coat with SikaTop-144 Fine Mortar as the finishing coat. SikaTop-122 Plus is a two-component polymer-modified cementitious mortar used as a scratch coat, bonding layer, and base render for concrete and masonry substrates. It has a thixotropic consistency well suited to vertical facade surfaces without sagging. Applied at 3–10mm thickness per coat, it provides a keyed surface for a fine finishing render or direct tile bond application. SikaTop-144 Fine Mortar (confirm current Australian product name and availability with Sika Australia technical — this product designation may vary from the current Australian catalogue) is applied over the cured SikaTop-122 Plus base coat to provide a smooth, fine-textured finish ready for painting or texture coating. Note: Sika's render product range for Australian facade applications includes the SikaTop series for general repair render — confirm the current designation for the fine finishing render product with Sika Australia technical before specifying. Do not use product TDS data from Sika international catalogues for Australian projects — confirm from the current Sika Australia TDS.",
    technicalProperties: [
      "SikaTop-122 Plus — two-component polymer-modified cementitious base/scratch coat — thixotropic — suitable for vertical and overhead concrete and masonry surfaces",
      "Application thickness: 3–10mm per coat — multiple coats can be built up for thicker sections — confirm from current TDS",
      "SikaTop-144 Fine Mortar — polymer-modified fine finishing coat applied over cured SikaTop-122 Plus base coat",
      "Pre-bagged components — mixed with clean water (SikaTop-144) or with Sika polymer liquid (SikaTop-122 Plus — two-component) — confirm mixing instructions from TDS",
      "Exterior and interior use — concrete, masonry, and render substrates",
      "Confirm minimum DFT, inter-coat timing, primer requirements, and current Australian product names with Sika Australia technical",
      "Confirm AS 3700 compliance and coastal exposure suitability with Sika Australia before specifying",
    ],
    limitations: [
      "TODO: owner confirm — SikaTop-144 Fine Mortar product name and availability in Australian market — confirm current designation with Sika Australia technical before specifying",
      "SikaTop-122 Plus is a two-component product — must be mixed with the polymer liquid component, not water alone — confirm mixing ratio and pot life from current TDS",
      "Not a structural crack repair system — active cracks must be treated separately before applying render system",
      "Confirm primer requirements for smooth or low-absorption substrates with Sika Australia — SikaTop-122 Plus requires mechanically prepared or properly profiled substrates for good adhesion",
      "Do not use Sika international product TDS for Australian projects — confirm all specifications with Sika Australia",
      "Confirm current product range with Sika Australia — Sika product designations and formulations are subject to periodic revision",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply nationally", url: "https://aus.sika.com" },
      { name: "Sika direct — confirm branch locations", url: "https://aus.sika.com" },
      { name: "Building trade suppliers — confirm local Sika distributor", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.parchem.com.au/products/renderoc-classic",
    accentColor: "#7c2d12",
    name: "Fosroc Renderoc Classic + Renderoc FC",
    descriptionLine: "Two-coat system — Renderoc Classic (polymer-modified base/scratch render) + Renderoc FC (fine polymer-modified finish coat) — concrete and masonry facades — distributed nationally by Parchem Construction Supplies",
    productType: "Two-coat polymer-modified render system — Fosroc / Parchem Australia",
    filterTags: ["Polymer-modified", "Two-coat", "Exterior", "Interior", "Masonry", "Concrete", "Pre-bagged", "Hand-applied", "Fibre-reinforced"],
    techChips: [
      { label: "Two-coat system", cls: "bg-orange-100 text-orange-900" },
      { label: "Renderoc Classic (base)", cls: "bg-slate-100 text-slate-700" },
      { label: "Renderoc FC (finish)", cls: "bg-green-50 text-green-700" },
      { label: "Polymer-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Parchem — national supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Fosroc two-coat render system pairs Renderoc Classic as the polymer-modified base and scratch coat with Renderoc FC as the fine finish coat. Renderoc Classic is a pre-bagged, polymer-modified, dry-mix render mortar used for render patch repairs and base coat application on concrete and masonry facades. It has excellent adhesion to prepared concrete and masonry substrates and is formulated to accommodate normal facade thermal movement without cracking. Renderoc FC (Fine Concrete) is a fine-textured, polymer-modified, cementitious mortar used as the finish coat, providing a smooth surface texture ready for overcoating with an exterior paint or texture coating system. The Renderoc system is a well-established specification in Australian commercial and strata building remediation, particularly for concrete facade work. Both products are distributed nationally through Parchem Construction Supplies (DuluxGroup), which provides technical support in most metropolitan and regional centres. Confirm current TDS, primer requirements (Nitobond AR bonding slurry is typically used as a primer coat before Renderoc Classic on smooth concrete), and inter-coat timing with Parchem before specifying.",
    technicalProperties: [
      "Renderoc Classic — pre-bagged polymer-modified render mortar — scratch/base coat for concrete and masonry facade render systems",
      "Renderoc FC — fine polymer-modified cementitious finish coat — applied over cured Renderoc Classic base coat",
      "Excellent adhesion to prepared concrete and masonry substrates — Nitobond AR bonding primer/slurry used on smooth or low-absorption surfaces (confirm current specification with Parchem)",
      "Exterior and interior use — suitable for facades, columns, soffits, parapets, and masonry blockwork",
      "Pre-bagged — mixed with clean water only on site — no separate polymer additive required",
      "Nationally available through Parchem Construction Supplies (DuluxGroup) branches — technical support available nationally",
      "Confirm minimum DFT, maximum coat thickness, inter-coat timing, and primer specification from current Fosroc / Parchem TDS before specifying",
    ],
    limitations: [
      "Nitobond AR bonding slurry primer is typically required on smooth or dense concrete substrates before Renderoc Classic application — confirm current primer specification with Parchem before specifying",
      "Not a trafficable exposed system — must be overcoated with a compatible exterior coating or texture system",
      "Not suitable for application over active cracks — active cracks must be repaired and stabilised before applying render system",
      "Confirm current product names — Fosroc product range distributed by Parchem is subject to periodic revision — verify Renderoc FC availability for facade render applications with Parchem",
      "Do not apply in temperatures below +5°C or above +35°C, or when rain is imminent",
      "TODO: owner confirm — verify Renderoc FC suitability as facade finish coat (vs. structural concrete repair context) with Parchem Construction Supplies technical",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national distribution (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Dulux / Acratex",
    brandUrl: "https://www.acratex.com.au",
    accentColor: "#7c3aed",
    name: "Dulux Acratex RenderWall",
    descriptionLine: "Polymer-modified cementitious render for exterior masonry, concrete block, and brick surfaces — confirm current formulation, coat thicknesses, coverage, primer requirements, and system design with Dulux Acratex technical",
    productType: "Polymer-modified cementitious render — exterior masonry and concrete",
    filterTags: ["Polymer-modified", "Two-coat", "Exterior", "Masonry", "Concrete", "Pre-bagged", "Hand-applied"],
    techChips: [{ label: "Polymer-modified", cls: "bg-purple-100 text-purple-700" }, { label: "Exterior", cls: "bg-slate-100 text-slate-700" }, { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Dulux Acratex RenderWall is a polymer-modified cementitious render for exterior masonry, concrete block, and brick facade surfaces. It is used in two-coat render systems on remedial projects requiring full render removal and replacement or render re-coat over prepared substrates.\n\nRenderWall is part of the Dulux Acratex facade system range and is designed to work with compatible Acratex primers, base coats, and finish coats. Confirm current product technical data sheet, system design, coat thicknesses, coverage, and primer specification with Dulux Acratex technical before specifying.",
    technicalProperties: [
      "Polymer-modified cementitious render — suitable for exterior masonry, concrete block, and brick",
      "Designed for use within the Dulux Acratex facade system — confirm compatible primer and topcoat from current Acratex TDS",
      "Confirm coat thicknesses, coverage, and system design from current Dulux Acratex RenderWall TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Dulux Acratex technical before specifying",
      "Not suitable for application over substrates with active cracking or rising damp — address substrate defects before applying render",
      "Confirm compatibility with existing substrate treatments and subsequent topcoat systems with Dulux Acratex before specifying",
      "Do not apply in temperatures below +5°C or above +35°C, or when rain is imminent",
    ],
    procurementSources: [
      { name: "Dulux Acratex — contact for trade supply and technical support", url: "https://www.acratex.com.au" },
      { name: "Dulux trade stores — national distribution", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Rockcote",
    brandUrl: "https://www.rockcote.com.au",
    accentColor: "#0891b2",
    name: "Rockcote Quick Render",
    descriptionLine: "Fast-setting polymer-modified render for masonry and concrete block — confirms current formulation, set time, coat thicknesses, and system design with Rockcote technical",
    productType: "Fast-setting polymer-modified render — masonry and concrete block",
    filterTags: ["Polymer-modified", "Two-coat", "Exterior", "Masonry", "Concrete", "Pre-bagged", "Hand-applied"],
    techChips: [{ label: "Polymer-modified", cls: "bg-cyan-100 text-cyan-700" }, { label: "Fast-setting", cls: "bg-slate-100 text-slate-700" }, { label: "Pre-bagged", cls: "bg-slate-100 text-slate-700" }],
    systemDescription: "Rockcote Quick Render is a fast-setting polymer-modified cementitious render for masonry and concrete block facade surfaces. Fast-setting renders are useful in remedial projects where rapid return to service is required, or where cold temperatures or tight program schedules necessitate shorter overcoat times.\n\nRockcote Quick Render is part of the Rockcote render system range. Confirm current product technical data sheet, set time, working time, coat thicknesses, coverage, and compatible primer and topcoat specification with Rockcote technical before specifying.",
    technicalProperties: [
      "Fast-setting polymer-modified cementitious render — suitable for masonry and concrete block exterior surfaces",
      "Designed for use within the Rockcote facade system — confirm compatible primer and topcoat from current Rockcote TDS",
      "Confirm set time, working time, coat thicknesses, and system design from current Rockcote Quick Render TDS",
    ],
    limitations: [
      "Confirm current product formulation and system design with Rockcote technical before specifying",
      "Fast set time reduces working window — confirm workability window for site conditions before use",
      "Not suitable for application over substrates with active cracking or rising damp — address substrate defects before applying render",
      "Confirm current Australian product availability with Rockcote before specifying",
    ],
    procurementSources: [
      { name: "Rockcote — contact for trade supply and technical support", url: "https://www.rockcote.com.au" },
      { name: "Rockcote trade distributors — contact Rockcote for nearest", url: "https://www.rockcote.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Two-coat", label: "Two-coat system" },
  { id: "Exterior", label: "Exterior" },
  { id: "Interior", label: "Interior" },
  { id: "Masonry", label: "Masonry" },
  { id: "Concrete", label: "Concrete" },
  { id: "Pre-bagged", label: "Pre-bagged" },
  { id: "Hand-applied", label: "Hand-applied" },
  { id: "Machine-applied", label: "Machine-applied" },
  { id: "Lightweight", label: "Lightweight" },
  { id: "Fibre-reinforced", label: "Fibre-reinforced" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "Heritage", label: "Heritage compatible" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "Thixotropic", label: "Thixotropic" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  baseCoat: string;
  finishCoat: string;
  polymerType: string;
  minDFT: string;
  application: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "Planitop XS + Smooth & Repair",
    brand: "Mapei",
    baseCoat: "Planitop XS",
    finishCoat: "Planitop Smooth & Repair",
    polymerType: "Acrylic polymer dispersion",
    minDFT: "Confirm with Mapei TDS",
    application: "Trowel / float — machine possible (confirm)",
    coastal: "Confirm with Mapei",
    primaryUse: "Facade render repair and re-render — concrete and masonry",
  },
  {
    product: "Primus Basecoat + Finessa",
    brand: "Rockcote / Saint-Gobain",
    baseCoat: "Rockcote Primus Basecoat",
    finishCoat: "Rockcote Finessa Fine Render",
    polymerType: "Polymer-modified cement",
    minDFT: "Confirm with Rockcote TDS",
    application: "Trowel / machine render pump",
    coastal: "Confirm coastal rating with Rockcote",
    primaryUse: "Exterior facade render — masonry, AAC, concrete",
  },
  {
    product: "SikaTop-122 Plus + SikaTop-144",
    brand: "Sika",
    baseCoat: "SikaTop-122 Plus",
    finishCoat: "SikaTop-144 Fine (TODO: confirm AU name)",
    polymerType: "Polymer-modified — two-component (base)",
    minDFT: "3–10mm per coat — confirm from TDS",
    application: "Trowel — thixotropic",
    coastal: "Confirm with Sika AU",
    primaryUse: "Concrete and masonry facade render — exterior and interior",
  },
  {
    product: "Renderoc Classic + Renderoc FC",
    brand: "Fosroc / Parchem",
    baseCoat: "Fosroc Renderoc Classic",
    finishCoat: "Fosroc Renderoc FC",
    polymerType: "Polymer-modified — pre-bagged",
    minDFT: "Confirm with Parchem TDS",
    application: "Trowel / float",
    coastal: "Confirm with Parchem",
    primaryUse: "Concrete facade render repair and re-render — commercial and strata",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Full render removal and replacement on Class 2 strata concrete or masonry facades where the existing render has extensively cracked, delaminated, or failed",
    "Patch render repair at localised defect areas where isolated sections of render have failed — applying a scratch coat and finish coat to match the surrounding render profile",
    "Re-render over existing sound render that is friable, carbonated, or contaminated — after suitable preparation and priming",
    "Render reinstatement at concrete spalling repair locations where polymer-modified repair mortar has been applied and the surface is levelled and sealed",
    "New render application over masonry blockwork, brick, AAC, or textured concrete substrates",
  ],
  selectionCriteria: [
    "Base coat product: ensure the scratch/base coat has sufficient adhesion to the prepared substrate — confirm primer requirement (bonding slurry or adhesion primer) for smooth or low-absorption substrates",
    "Finish coat compatibility: ensure the finish coat is formulated for direct application over the selected base coat — confirm compatibility and recommended inter-coat timing",
    "Minimum DFT: confirm the minimum dry film thickness for each coat from the current TDS — single-coat application at insufficient thickness is a common failure cause",
    "Application method: hand trowel vs machine application — machine application requires a render pump and specialist operator — confirm product suitability for machine application",
    "Coastal and salt-exposed environments: confirm coastal suitability of the render system with the manufacturer — some polymer-modified systems are not rated for direct coastal exposure",
    "Finish texture: confirm whether the selected finish coat produces a smooth (fine float) surface or a textured surface — the subsequent coating or texture system must be compatible",
    "Thermal movement: two-coat polymer-modified renders will move slightly with thermal cycling — confirm that the finished render surface is overcoated with a compatible flexible coating or texture system to accommodate minor surface movement",
  ],
  limitations: [
    "Not suitable over active or moving cracks — polymer-modified render systems are rigid once cured and will crack if substrate movement continues",
    "Not suitable for application over loose, friable, or poorly adhered existing render — all poorly bonded render must be fully removed before applying new render system",
    "Not a waterproof system — polymer-modified render is a cementitious finish system, not a waterproofing membrane — where facade waterproofing is required, a separate waterproofing layer must be incorporated into the build-up",
    "Render stop, movement joints, and control joints must be incorporated at appropriate centres — maximum 4.5m centres and at all changes of substrate or direction — failure to include joints is a primary cause of render cracking",
    "Do not apply over surfaces treated with incompatible release agents, curing compounds, or contaminated with oil — substrate preparation is critical",
    "In hot or windy conditions, apply a fog mist to the cured base coat before applying the finish coat and protect the fresh render from rapid drying for at least 24 hours after application",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — the primary standard governing masonry and render work in Australia — confirm render specification compliance with AS 3700 for external masonry applications",
    "AS 3958.1 — Guide to the Installation of Ceramic Tiles — relevant where render is the substrate for tile adhesive in facade tile repair contexts",
    "NCC Volume One — Schedule 1 performance requirements for facade cladding and external weatherproofing in Class 2 buildings",
    "Manufacturer application guides — primer application, scratch coat, inter-coat timing, minimum DFT checks, curing protection, and control joint placement are all critical hold points",
    "CSIRO and NATSPEC — confirm applicable NATSPEC worksection (03 50 00 or similar) requirements for polymer-modified render systems in the project specification",
  ],
  suitableDefects: [
    "Render cracking and delamination — full or partial render removal and replacement where the render system has failed",
    "Salt attack and salt-contaminated render — after substrate treatment with crystalline or salt-retardant system, a salt-resistant or standard PM render is applied as part of the remediation build-up",
    "Concrete spalling repair — render applied over patched spalling areas to restore facade profile and provide a uniform coated surface",
    "Facade re-render after cladding removal, window replacement, or facade penetration closure works",
  ],
  typicalSubstrates: [
    "In-situ concrete — must be clean, sound, free of laitance and form release agent — mechanically prepared (scabbled, blasted, or high-pressure washed) to achieve a CSP 3–5 substrate profile",
    "Masonry (brick and block) — must be clean, sound, and free of efflorescence — mortar joints must be sound or raked and repointed before render application",
    "Autoclaved Aerated Concrete (AAC) — confirm specific primer requirement for AAC substrates with the render manufacturer — some products require a diluted acrylic primer on AAC before render application",
    "Fibre cement sheet — confirm product suitability and primer requirement with manufacturer before applying render to compressed FC sheet substrates",
    "Existing render (re-coat) — must be mechanically sound, well adhered, and free of efflorescence — hack and replace all delaminated or hollow sections before re-rendering",
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

export function TwoCoatPMRenderIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are two-coat polymer-modified render systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Two-coat polymer-modified render systems consist of a cement-based base/scratch coat and a finer finish coat, both incorporating polymer admixtures (acrylic, SBR, or vinyl-acetate polymer dispersions) to improve adhesion, flexibility, and durability compared to traditional sand-cement mixes. They are applied in sequence — a thicker scratch coat first to establish level and key, followed by a finer finish coat once the base coat has achieved initial set.
        </p>
        {expanded && (
          <>
            <p>
              The polymer modification improves adhesion to smooth or non-absorbent substrates, reduces early shrinkage cracking, and provides better resistance to moisture ingress compared to plain sand-cement render. However, polymer-modified render systems are rigid once cured — they are not crack-bridging systems and will crack if applied over active substrate movement. Control joints must be designed into the render system at maximum 4.5m centres and at all changes of substrate, direction, and material.
            </p>
            <p>
              For Australian strata and commercial facade remediation, the standard two-coat PM render system is the most common specification for render repair and replacement. Product selection should confirm the base coat adhesion to the specific substrate, primer requirements, inter-coat timing, minimum DFT, and the compatibility of the chosen finish coat with the planned overcoating system (exterior acrylic, elastomeric, or texture coating).
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

export function TwoCoatPMRenderProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">4 products — 4 brands — two-coat polymer-modified render systems — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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
              Side-by-side comparison of two-coat polymer-modified render systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Base coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish coat</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Polymer type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Min DFT</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal rated</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.baseCoat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finishCoat}</td>
                  <td className="px-4 py-3 text-slate-600">{row.polymerType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.minDFT}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
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
