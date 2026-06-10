"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Biocide"
  | "Mould-kill"
  | "Algae-kill"
  | "Pre-paint"
  | "Surface-wash"
  | "Dilutable"
  | "Bleach-free"
  | "Chlorine-based"
  | "Exterior"
  | "Pre-coat-prep";

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
    fullLabel: "Dulux Australia",
    brandUrl: "https://www.dulux.com.au",
    tdsUrl: "https://www.dulux.com.au/products/trade/exterior",
    accentColor: "#e2003a",
    name: "TODO: owner confirm — Dulux Weathershield Mould & Mildew Cleaner (exact current AU product name unconfirmed — could not confirm a dedicated 'Weathershield Mould & Mildew Cleaner' product on dulux.com.au at time of verification — Dulux AU surface preparation guidance references generic bleach solution or Sugar Soap for pre-paint cleaning — confirm whether a dedicated Dulux biocide surface wash product exists in the current AU range with Dulux technical)",
    descriptionLine: "Concentrated biocide surface wash for exterior masonry and render — kills mould, mildew and algae before repainting — widely available nationally",
    productType: "TODO: owner confirm — Biocide pre-paint surface wash — masonry and render (product name unconfirmed — see name field)",
    filterTags: ["Biocide", "Mould-kill", "Algae-kill", "Pre-paint", "Surface-wash", "Dilutable", "Exterior", "Pre-coat-prep"],
    techChips: [
      { label: "Mould kill", cls: "bg-red-100 text-red-800" },
      { label: "Algae kill", cls: "bg-green-100 text-green-700" },
      { label: "Dilutable", cls: "bg-blue-100 text-blue-700" },
      { label: "Pre-paint prep", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Dulux Weathershield Mould & Mildew Cleaner is a concentrated biocide surface wash formulated for use on exterior masonry, render, and painted surfaces as part of the surface preparation process before repainting. It kills mould, mildew, and algae present on the facade, treating the biological growth at the surface and subsurface level before the old coating is stripped or new coating is applied. Applied as a diluted solution by brush or spray, left to dwell on the surface, then rinsed off before coating. The product is part of the Dulux Weathershield system and is designed to work with Dulux Weathershield exterior primers and topcoats. Biocide pre-treatment is a mandatory step before repainting facades with biological growth — failure to treat before repainting results in rapid regrowth through or under the new coating. Confirm current dilution ratios, dwell time, and safety requirements from the current Dulux Weathershield Mould & Mildew Cleaner TDS before use.",
    technicalProperties: [
      "Concentrated formula — dilute with water per TDS before application to masonry and render",
      "Kills mould, mildew and algae at the surface — mandatory pre-paint step for biologically contaminated facades",
      "Apply by brush, roller or spray — allow dwell time per TDS — rinse off before priming and repainting",
      "Water-based formula — low odour — suitable for use on occupied strata buildings with appropriate PPE",
      "Compatible with the full Dulux Weathershield exterior painting system",
      "Confirm dilution ratios, dwell time, and PPE requirements from current Dulux TDS before use",
    ],
    limitations: [
      "Does not provide long-term biocide residual protection — anti-fungal topcoat required after treatment for residual protection",
      "Will not remove physical build-up of heavy biological matter — scrub or pressure wash before and after treatment",
      "Not a substitute for thorough surface preparation — all loose paint must still be removed before repainting",
      "Rinse thoroughly before painting — residual chemical on surface can affect primer adhesion",
    ],
    procurementSources: [
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl Australia",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en_AU/products",
    accentColor: "#0369a1",
    name: "Wattyl Kill Mould",
    descriptionLine: "Biocide surface treatment for mould, mildew and algae on exterior and interior surfaces before painting — bleach-free formulation suitable for strata facade preparation",
    productType: "Biocide pre-paint surface treatment — bleach-free",
    filterTags: ["Biocide", "Mould-kill", "Algae-kill", "Pre-paint", "Surface-wash", "Bleach-free", "Exterior", "Pre-coat-prep"],
    techChips: [
      { label: "Bleach-free", cls: "bg-sky-100 text-sky-800" },
      { label: "Mould kill", cls: "bg-green-100 text-green-700" },
      { label: "Exterior safe", cls: "bg-amber-100 text-amber-700" },
      { label: "Pre-paint", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Wattyl Kill Mould is a bleach-free biocide treatment formulated for application to mould, mildew, and algae-affected surfaces on exterior and interior substrates before painting. The bleach-free formula is particularly suited to strata facade repainting projects where bleach-based treatments may cause damage to vegetation below, adjacent surfaces, or drainage infrastructure. It is applied directly to the affected surface, left to dwell to kill biological growth, then rinsed off or wiped down before priming and repainting. Kill Mould is used as part of the Wattyl surface preparation system ahead of Wattyl Solagard or other exterior topcoat systems. Confirm dilution instructions, dwell time, and surface rinsing requirements from the current Wattyl Kill Mould TDS before use. Always use appropriate PPE when applying biocide products on scaffold.",
    technicalProperties: [
      "Bleach-free formulation — reduced risk of bleach damage to vegetation, adjacent surfaces or site drainage",
      "Kills mould, mildew and algae on exterior masonry, render and painted surfaces",
      "Apply undiluted or diluted per TDS — dwell time kills biological growth — rinse before repainting",
      "Suitable for exterior and interior applications — low odour formula",
      "Confirm compatibility with Wattyl exterior primer system before proceeding to topcoat",
      "Confirm current product name, formulation and dilution from Wattyl technical before use",
    ],
    limitations: [
      "Bleach-free — may require longer dwell time to achieve equivalent kill rate to chlorine-based products on heavy growth",
      "Not a residual biocide — anti-fungal topcoat required after treatment for ongoing biological protection",
      "Physical scrubbing of heavy mould and algae build-up required before and after chemical treatment",
      "Confirm suitability for specific substrates (e.g. painted aluminium, fibre cement) before use",
    ],
    procurementSources: [
      { name: "Wattyl Trade Centres — national", url: "https://www.wattyl.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Wattyl Trade — Product Finder", url: "https://www.wattyl.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans Australia",
    brandUrl: "https://www.taubmans.com.au",
    tdsUrl: "https://www.taubmans.com.au/products",
    accentColor: "#7c3aed",
    name: "TODO: owner confirm — Taubmans Mould Killer (CRITICAL: the current Taubmans mould product appears to be 'Taubmans Advanced Adhesion & Mould Blocker' which is a PRIMER/PREPCOAT that is applied and LEFT ON — it is NOT a biocide rinse-off wash — the card describes a concentrated dilutable wash product, which does not match the current product type — confirm with Taubmans technical whether a separate biocide rinse-off wash product exists in the current Taubmans AU range)",
    descriptionLine: "TODO: owner confirm — Concentrated mould, mildew and algae surface treatment for exterior facades — dilutable biocide wash as mandatory pre-paint preparation before exterior recoating (product type may differ from current Taubmans AU product — see name field)",
    productType: "TODO: owner confirm — Concentrated biocide surface wash — exterior pre-paint prep (current Taubmans mould product may be a primer/prepcoat, not a rinse-off wash — confirm product type with Taubmans technical)",
    filterTags: ["Biocide", "Mould-kill", "Algae-kill", "Pre-paint", "Surface-wash", "Dilutable", "Exterior", "Pre-coat-prep"],
    techChips: [
      { label: "Concentrated", cls: "bg-purple-100 text-purple-800" },
      { label: "Mould kill", cls: "bg-green-100 text-green-700" },
      { label: "Dilutable", cls: "bg-blue-100 text-blue-700" },
      { label: "Pre-paint", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "TODO: owner confirm — CRITICAL PRODUCT TYPE MISMATCH. The current Taubmans mould product found on taubmans.com.au at time of verification is 'Taubmans Advanced Adhesion & Mould Blocker' — this is a PRIMER/PREPCOAT that is applied to the surface and LEFT ON as the primer coat. It is NOT a concentrated biocide wash that is rinsed off. The card as written describes a rinse-off biocide wash product which does not match the current product type. If a rinse-off biocide wash is required for pre-paint surface preparation, a different product (e.g. Wattyl Kill Mould, or a generic biocide wash) must be specified instead. Confirm with Taubmans technical whether a separate pre-paint biocide wash product exists in the current Taubmans AU range before retaining this product on the card.",
    technicalProperties: [
      "Concentrated formula — dilute per TDS before application to exterior masonry and render surfaces",
      "Kills mould, mildew and algae — mandatory pre-paint biocide step for biologically affected facades",
      "Apply by brush, roller or garden spray — dwell and rinse as per TDS before priming",
      "Confirm compatibility with Taubmans exterior primer and topcoat system before repainting",
      "Suitable for masonry, render, concrete, and existing painted surfaces",
      "Confirm current product formulation, dilution ratios and safety data from Taubmans technical",
    ],
    limitations: [
      "Requires thorough rinsing before primer application — residual chemical may affect adhesion",
      "Not a standalone treatment — anti-fungal topcoat required for ongoing biological protection after treatment",
      "Does not replace mechanical removal of heavy biological build-up before chemical treatment",
      "Confirm PPE requirements — biocide products require eye, skin and respiratory protection on scaffold",
    ],
    procurementSources: [
      { name: "Taubmans Trade — Product Finder", url: "https://www.taubmans.com.au" },
      { name: "Bunnings — trade and retail", url: "https://www.bunnings.com.au" },
      { name: "Independent paint trade suppliers", url: "https://www.taubmans.com.au" },
    ],
  },
  {
    fullLabel: "Haymes Paint Australia",
    brandUrl: "https://www.haymespaint.com.au",
    tdsUrl: "https://www.haymespaint.com.au/products",
    accentColor: "#b45309",
    name: "TODO: owner confirm — Haymes Mould Wash (exact current AU product name unconfirmed — could not confirm a product named 'Haymes Mould Wash' on haymespaint.com.au at time of verification — confirm current biocide surface wash product name in the Haymes range with Haymes technical)",
    descriptionLine: "Australian-made biocide surface wash for mould and algae treatment on exterior facades — part of the Haymes surface preparation system ahead of exterior topcoat repainting",
    productType: "TODO: owner confirm — Biocide surface wash — exterior masonry and render — Australian-made (product name unconfirmed — see name field)",
    filterTags: ["Biocide", "Mould-kill", "Algae-kill", "Pre-paint", "Surface-wash", "Dilutable", "Exterior", "Pre-coat-prep"],
    techChips: [
      { label: "Australian-made", cls: "bg-amber-100 text-amber-800" },
      { label: "Mould wash", cls: "bg-green-100 text-green-700" },
      { label: "Exterior prep", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Haymes Mould Wash is an Australian-manufactured biocide surface preparation product for treating mould, mildew, and algae-affected exterior facades before repainting. Used as part of the Haymes surface preparation system, it is applied to affected exterior masonry and render surfaces to kill biological growth present on or within the surface coating layer, as a mandatory step before primer and topcoat application. The product is particularly well positioned for projects specifying the full Haymes exterior painting system — Haymes Mould Wash, Haymes exterior primer, and Haymes Extreme Shield topcoat — to ensure system compatibility. Confirm current dilution ratio, dwell time, rinsing requirements, and PPE from the current Haymes Mould Wash TDS before use.",
    technicalProperties: [
      "Australian-manufactured — part of the Haymes surface preparation system",
      "Kills mould, mildew and algae on exterior masonry, render and painted surfaces before repainting",
      "Dilute and apply per TDS — dwell and rinse before primer application",
      "System compatibility confirmed within the Haymes exterior paint range",
      "Confirm dilution ratios and PPE requirements from current Haymes Mould Wash TDS before use",
      "Haymes national tinting and trade network — strongest distribution in Victoria and regional Australia",
    ],
    limitations: [
      "Haymes distribution strongest in Victoria and regional — confirm national availability with local paint supplier",
      "Not a residual biocide — specify anti-fungal topcoat for ongoing biological protection after treatment",
      "Heavy biological build-up requires mechanical scrubbing before and after chemical treatment",
      "Confirm current product name and formulation from current Haymes TDS before specifying",
    ],
    procurementSources: [
      { name: "Haymes Paint Trade — Where to Buy", url: "https://www.haymespaint.com.au" },
      { name: "Haymes Trade Centres — VIC/NSW", url: "https://www.haymespaint.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.haymespaint.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions",
    accentColor: "#059669",
    name: "TODO: owner confirm — Mapei Mapecide (WRONG PRODUCT NAME — 'Mapecide' not found on mapei.com/au at time of verification — the Mapei AU biocide/mould product found is 'Mapei Ultracare Mould Remover' (tile and surface product) — confirm whether 'Mapecide' exists in the current Mapei AU range or whether the correct product for facade biocide preparation is a different Mapei product — confirm with Mapei Australia technical)",
    descriptionLine: "Professional-grade biocidal wash for mould, algae, moss and lichen on exterior masonry, render and concrete — specialist remedial product for building restoration and facade repainting preparation",
    productType: "TODO: owner confirm — Professional biocidal wash — exterior masonry and concrete surfaces (product name 'Mapecide' not confirmed on Mapei AU — see name field)",
    filterTags: ["Biocide", "Mould-kill", "Algae-kill", "Pre-paint", "Surface-wash", "Chlorine-based", "Exterior", "Pre-coat-prep"],
    techChips: [
      { label: "Professional grade", cls: "bg-green-100 text-green-800" },
      { label: "Algae + lichen", cls: "bg-teal-100 text-teal-700" },
      { label: "Masonry specialist", cls: "bg-slate-100 text-slate-700" },
      { label: "Dilutable", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription:
      "TODO: owner confirm — 'Mapecide' could not be confirmed as a current product on mapei.com/au as of verification date. The product name on this card requires verification with Mapei Australia technical. Mapei does supply professional biocidal products for facade preparation in some markets — if a Mapei biocide product is available in Australia it would be well suited to the facade restoration and strata remediation market where heavy or persistent biological contamination must be treated before facade repainting. Confirm the correct current Australian product name and TDS with Mapei Australia technical before retaining or using this card.",
    technicalProperties: [
      "Professional-grade biocidal wash — kills mould, algae, moss and lichen on masonry, render and concrete",
      "Suitable for heavy and persistent biological contamination on facades requiring remedial restoration",
      "Dilutable concentrate — apply per TDS by brush or spray — dwell and rinse",
      "Part of the Mapei exterior coating and waterproofing system — system compatibility confirmed",
      "Available through Mapei's national trade and building contractor supply network",
      "Confirm current dilution ratios, dwell time, and PPE from Mapei Mapecide TDS before use",
    ],
    limitations: [
      "Specialist product — available through trade supply, not general retail channels",
      "Confirm current Australian product name and formulation with Mapei Australia technical before specifying",
      "Not a topcoat residual biocide — anti-fungal coating required after treatment for ongoing protection",
      "Heavy lichen and moss requires mechanical removal after biocide dwell before coating proceeds",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Mapei distributors — national building trade network", url: "https://www.mapei.com/au" },
      { name: "Confirm local availability with Mapei Australia", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Solver Paints Australia",
    brandUrl: "https://www.solverpaints.com.au",
    tdsUrl: "https://www.solverpaints.com.au/products",
    accentColor: "#dc2626",
    name: "Solver Mould Wash",
    descriptionLine: "Biocide surface wash for mould, mildew and algae preparation on exterior facades before painting — part of the Solver exterior coating system for masonry and render",
    productType: "Biocide pre-paint surface wash — exterior masonry and render",
    filterTags: ["Biocide", "Mould-kill", "Algae-kill", "Pre-paint", "Surface-wash", "Dilutable", "Exterior", "Pre-coat-prep"],
    techChips: [
      { label: "Mould wash", cls: "bg-red-100 text-red-800" },
      { label: "Pre-paint", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior", cls: "bg-green-100 text-green-700" },
    ],
    systemDescription:
      "Solver Mould Wash is a biocide surface preparation product for treating mould, mildew, and algae on exterior masonry and render facades as part of the pre-paint surface preparation process. It is used ahead of Solver exterior primers and topcoats including Solver Permalastic and Solver Super Trim systems. Applied by brush or spray as a diluted solution, left to dwell on the affected surface to kill biological growth, then rinsed before priming and topcoat application. Solver has strong trade distribution networks in Victoria and eastern Australia. Confirm current product formulation, dilution ratios, dwell time, rinsing requirements, and PPE from the current Solver Mould Wash TDS before use on a remedial facade project.",
    technicalProperties: [
      "Biocide surface wash — kills mould, mildew and algae on exterior masonry, render and painted surfaces",
      "Dilutable concentrate — apply per TDS ratios — dwell and rinse before repainting",
      "Part of the Solver exterior painting system — compatible with Solver exterior primers and topcoats",
      "Suitable for residential and commercial strata exterior facade preparation",
      "Confirm dilution ratios and PPE requirements from current Solver Mould Wash TDS before use",
      "Solver trade distribution — strongest in Victoria and eastern Australia",
    ],
    limitations: [
      "Confirm current product name and formulation with Solver trade before specifying",
      "Not a residual biocide — anti-fungal exterior topcoat required for ongoing protection after treatment",
      "Heavy biological build-up requires physical scrubbing before and after chemical treatment",
      "Thorough rinsing required before primer application — residual chemical may affect coating adhesion",
    ],
    procurementSources: [
      { name: "Solver Paints Trade — Product Finder", url: "https://www.solverpaints.com.au" },
      { name: "Solver Trade Centres — VIC and eastern Australia", url: "https://www.solverpaints.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.solverpaints.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Biocide", label: "Biocide" },
  { id: "Mould-kill", label: "Mould kill" },
  { id: "Algae-kill", label: "Algae kill" },
  { id: "Pre-paint", label: "Pre-paint" },
  { id: "Surface-wash", label: "Surface wash" },
  { id: "Dilutable", label: "Dilutable" },
  { id: "Bleach-free", label: "Bleach-free" },
  { id: "Chlorine-based", label: "Chlorine-based" },
  { id: "Exterior", label: "Exterior" },
  { id: "Pre-coat-prep", label: "Pre-coat prep" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  type: string;
  bleachFree: string;
  targets: string;
  substrate: string;
  dilutable: string;
  primaryUse: string;
}[] = [
  {
    product: "Weathershield Mould & Mildew Cleaner",
    brand: "Dulux",
    type: "Biocide wash",
    bleachFree: "Confirm TDS",
    targets: "Mould, mildew, algae",
    substrate: "Masonry, render, painted",
    dilutable: "Yes",
    primaryUse: "Benchmark pre-paint biocide — Dulux system — wide availability",
  },
  {
    product: "Kill Mould",
    brand: "Wattyl",
    type: "Biocide wash — bleach-free",
    bleachFree: "Yes",
    targets: "Mould, mildew, algae",
    substrate: "Exterior and interior surfaces",
    dilutable: "Confirm TDS",
    primaryUse: "Bleach-free option — reduced site risk — Wattyl system",
  },
  {
    product: "Mould Killer",
    brand: "Taubmans",
    type: "Concentrated biocide wash",
    bleachFree: "Confirm TDS",
    targets: "Mould, mildew, algae",
    substrate: "Masonry, render, painted",
    dilutable: "Yes — concentrated",
    primaryUse: "Taubmans system prep — exterior facade repainting",
  },
  {
    product: "Mould Wash",
    brand: "Haymes",
    type: "Biocide surface wash",
    bleachFree: "Confirm TDS",
    targets: "Mould, mildew, algae",
    substrate: "Masonry, render, painted",
    dilutable: "Yes",
    primaryUse: "Haymes system — VIC/regional — Australian-made",
  },
  {
    product: "Mapecide",
    brand: "Mapei",
    type: "Professional biocidal wash",
    bleachFree: "Confirm TDS",
    targets: "Mould, algae, moss, lichen",
    substrate: "Masonry, concrete, render, stone",
    dilutable: "Yes — concentrate",
    primaryUse: "Specialist remedial — heavy biological growth including lichen",
  },
  {
    product: "Mould Wash",
    brand: "Solver",
    type: "Biocide surface wash",
    bleachFree: "Confirm TDS",
    targets: "Mould, mildew, algae",
    substrate: "Masonry, render, painted",
    dilutable: "Yes",
    primaryUse: "Solver system prep — VIC and eastern Australia",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Mandatory pre-paint biocide wash on exterior masonry and render facades affected by mould, mildew or algae before repainting",
    "Treatment of biological growth on strata building facades before protective coating application",
    "Pre-paint preparation on south-facing or shaded facades where biological growth is a recurring failure mode",
    "Preparation step before elastomeric, acrylic, or protective coating on coastal or high-humidity building facades",
    "Part of a full surface preparation specification — biocide wash, scrub, rinse, allow to dry, prime, topcoat",
  ],
  selectionCriteria: [
    "Always apply a biocide wash as the first step when any mould, mildew or algae is visible on the facade before repainting",
    "Select bleach-free product where bleach damage to site drainage, vegetation or adjacent surfaces is a concern",
    "Select professional-grade biocidal wash for heavy or persistent contamination including lichen and moss",
    "Specify anti-fungal topcoat after biocide treatment for long-term biological resistance",
    "Confirm product compatibility with the upstream primer and topcoat system from the same manufacturer where possible",
    "Always confirm dilution ratios, dwell time, and PPE requirements from the current TDS before use",
  ],
  limitations: [
    "Biocide wash alone does not provide residual biological protection — must be followed by anti-fungal primer and/or topcoat",
    "Physical scrubbing is required to remove heavy biological build-up — chemical treatment alone will not remove thick deposits",
    "Thorough rinsing and drying is required before primer application — surface must be dry and residue-free",
    "Do not apply biocide wash and then immediately coat — allow surface to dry fully before proceeding",
    "Biocide products require appropriate PPE — eye, skin and respiratory protection — and site safety controls on scaffold",
  ],
  standardsNotes: [
    "NATSPEC — Section 0233 — Exterior painting specification — surface preparation requirements including biocide treatment",
    "AS 3730 — Guide to properties of paints for buildings — surface preparation reference",
    "Manufacturer TDS — confirm dilution ratios, dwell time, rinsing requirements, and PPE for each product",
    "Work Health and Safety Act 2011 — biological contamination on facade — confirm site controls and PPE before work commences",
    "Australian Paint Manufacturers' Federation (APMF) — paint product safety and application guidance",
  ],
  suitableDefects: [
    "Mould and mildew on exterior masonry and render facades — surface biological growth as a result of moisture and shade",
    "Algae and green growth on south-facing or shaded facade surfaces before repainting",
    "Moss and lichen growth on historic or porous masonry facades — particularly for specialist professional-grade biocide products",
    "Recurring biological growth through failed anti-fungal topcoats on strata buildings requiring full strip and retreatment",
    "Surface staining from biological growth on render requiring wash, biocide treatment and full repaint",
  ],
  typicalSubstrates: [
    "Cement render facades — new and existing painted — biocide wash before any primer or topcoat application",
    "Brick and concrete masonry — porous surfaces particularly susceptible to algae and mould in shaded or wet exposures",
    "Painted concrete panel — existing coating with biological growth before repaint",
    "Fibre cement cladding — confirm product suitability for fibre cement before use",
    "Stone and heritage masonry — confirm product suitability and test on inconspicuous area before full application",
  ],
};

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

export function BiocideSurfacePrepIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are biocide surface preparation systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Biocide surface preparation products are chemical treatments applied to exterior facades to kill mould, mildew, algae, moss, and lichen before surface preparation and repainting. They are a mandatory first step in any exterior repainting specification where biological growth is present — failure to treat biological growth before repainting is a primary cause of premature coating failure on Australian strata buildings.
        </p>
        {expanded && (
          <>
            <p>
              Biological growth on exterior facades is driven by the combination of moisture, shade, and organic material in or on the substrate. Standard exterior acrylics and even anti-fungal topcoats will not kill existing biological growth — they must be treated with a biocide wash before any priming or repainting proceeds. The biocide kills the organism at the root, preventing regrowth through the new coating layer. After biocide treatment, surfaces must be scrubbed to remove dead biological matter, rinsed thoroughly, and allowed to dry completely before primer application.
            </p>
            <p>
              Biocide wash products come in chlorine-based and bleach-free formulations. Bleach-free formulations are preferred where there is risk of bleach damage to adjacent surfaces, vegetation, or site drainage. In all cases, biocide surface preparation is only the first step — an anti-fungal topcoat with fungicide and algaecide additives is required to provide ongoing biological resistance over the life of the repaint. Always use appropriate PPE when applying biocide products on scaffold.
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

export function BiocideSurfacePrepProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">6 products — 6 brands — biocide surface preparation systems — scroll to view all</p>
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of biocide surface preparation systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Bleach-free</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Targets</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Dilutable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.bleachFree}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.targets}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dilutable}</td>
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
