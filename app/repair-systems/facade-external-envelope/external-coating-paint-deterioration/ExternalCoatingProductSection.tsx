"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Primer"
  | "Alkali-resistant"
  | "Water-based"
  | "Render"
  | "Masonry"
  | "Pre-coat"
  | "Epoxy"
  | "Rust-inhibiting"
  | "2C"
  | "Steel"
  | "Metal"
  | "Consolidant"
  | "Penetrating"
  | "Concrete"
  | "Surface-prep"
  | "Acrylic"
  | "Exterior"
  | "2-coat"
  | "UV-stable"
  | "Elastomeric"
  | "Crack-bridging"
  | "Enamel"
  | "Timber"
  | "Topcoat"
  | "Silane"
  | "Water-repellent"
  | "Colourless"
  | "Vapour-permeable"
  | "Biocide"
  | "Mould"
  | "Algae";

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
    fullLabel: "Dulux Group Australia",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#ef4444",
    name: "Dulux Weathershield Alkali Resistant Primer",
    descriptionLine: "Water-based alkali-resistant primer for sealing new render, masonry and concrete before topcoat application",
    productType: "Alkali-resistant water-based primer",
    filterTags: ["Primer", "Alkali-resistant", "Water-based", "Render", "Masonry", "Pre-coat"],
    techChips: [
      { label: "Alkali-resistant primer", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Render / masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-coat sealer", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dulux Weathershield Alkali Resistant Primer is a water-based alkali-resistant primer specifically formulated to seal new render, masonry and concrete substrates before application of exterior topcoats. New render and masonry are alkaline — this high pH environment can cause saponification and premature failure of conventional paint systems applied directly without an alkali-resistant primer.\n\nApplied as the first coat in a complete Weathershield system, this primer penetrates and seals porous substrates, reducing suction and providing a stable base for topcoat adhesion. Confirm current application rates, drying times, and compatible topcoats with Dulux Australia before specifying. Confirm that the substrate has cured adequately (typically 28 days minimum for new render) before primer application.",
    technicalProperties: [
      "Alkali-resistant formulation — prevents saponification and topcoat failure on new render and masonry substrates",
      "Water-based — low VOC — suitable for occupied buildings and sensitive environments",
      "Penetrating action reduces substrate suction and promotes uniform topcoat adhesion",
      "Compatible with Dulux Weathershield exterior acrylic topcoat systems — confirm system compatibility with Dulux TDS",
      "Confirm application rate, dry film thickness and overcoating time with current Dulux Weathershield Alkali Resistant Primer TDS",
    ],
    limitations: [
      "Not a topcoat — must be overcoated with a compatible exterior topcoat — not suitable as a finished surface coating",
      "Substrate must be cured, dry and free of loose material, efflorescence and contamination before application",
      "New render should be cured for at least 28 days before primer application — confirm with Dulux technical for specific render systems",
      "Do not apply in wet or humid conditions or when rain is forecast within the drying window — confirm weather requirements with TDS",
      "Confirm current product specification and compliance with Dulux Group Australia before specifying",
    ],
    procurementSources: [
      { name: "Dulux trade centres nationally — contact for current pricing", url: "https://www.dulux.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Dulux trade online account", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#f97316",
    name: "Wattyl Killrust Epoxy Primer",
    descriptionLine: "Two-pack epoxy primer with rust-inhibiting pigments for priming bare and rusted steel elements on facades",
    productType: "Two-pack epoxy rust-inhibiting primer for steel",
    filterTags: ["Primer", "Epoxy", "Rust-inhibiting", "2C", "Steel", "Metal"],
    techChips: [
      { label: "Two-pack epoxy", cls: "bg-sky-100 text-sky-800" },
      { label: "Rust-inhibiting", cls: "bg-slate-100 text-slate-700" },
      { label: "Steel / metal", cls: "bg-slate-100 text-slate-700" },
      { label: "2C — mix on site", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Wattyl Killrust Epoxy Primer is a two-component epoxy primer containing rust-inhibiting pigments, designed for application to bare, cleaned or lightly rusted steel and metal surfaces on building facades. Used on structural steel elements, balustrades, lintels, window frames, tie rods and other metalwork incorporated into or attached to facade systems.\n\nThe two-pack epoxy chemistry provides excellent adhesion and corrosion resistance on properly prepared metal substrates. Mix ratio must be followed strictly — confirm pot life and recoating windows with current Wattyl TDS. Steel surface preparation to Sa 2.5 or St 3 is typically required — confirm with Wattyl technical. Overcoat with compatible Killrust or Wattyl enamel topcoat system.",
    technicalProperties: [
      "Two-component epoxy chemistry — excellent adhesion to prepared steel and metal substrates",
      "Rust-inhibiting pigments — provides active corrosion protection at the metal substrate interface",
      "High build — improves substrate profile coverage on roughened or pitted steel surfaces",
      "Compatible with Wattyl Killrust and Solagard topcoat systems — confirm compatibility with Wattyl TDS",
      "Confirm surface preparation standard, mix ratio, pot life and overcoat window with current Wattyl Killrust Epoxy Primer TDS",
    ],
    limitations: [
      "Two-component product — strict mix ratio required — pot life limited after mixing — do not apply past pot life",
      "Steel surface must be prepared to minimum Sa 2.5 (blast) or St 3 (hand tool) standard before application — adhesion depends on surface preparation",
      "Not suitable for application to masonry, render or concrete — this is a metal primer only",
      "Do not apply in wet or damp conditions — moisture contamination of steel surface causes premature corrosion under film",
      "Confirm current product specification and compliance with Wattyl before specifying",
    ],
    procurementSources: [
      { name: "Wattyl trade stores nationally — contact for current pricing", url: "https://www.wattyl.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#eab308",
    name: "Parchem Consolideck GL",
    descriptionLine: "Penetrating silicate consolidant for hardening friable and chalky concrete and masonry facades before repainting",
    productType: "Penetrating masonry and concrete consolidant",
    filterTags: ["Consolidant", "Penetrating", "Concrete", "Masonry", "Surface-prep"],
    techChips: [
      { label: "Silicate consolidant", cls: "bg-sky-100 text-sky-800" },
      { label: "Penetrating", cls: "bg-slate-100 text-slate-700" },
      { label: "Concrete / masonry", cls: "bg-slate-100 text-slate-700" },
      { label: "Surface prep", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parchem Consolideck GL is a penetrating lithium silicate consolidant used to harden friable, chalky and dusty concrete and masonry substrates prior to repainting or recoating. On many aged concrete and masonry facades, the surface layer has become weak, porous and poorly bonded — direct application of primer or topcoat to a friable substrate will result in delamination of the new coating system.\n\nConsolideck GL penetrates the substrate and reacts with free calcium hydroxide and silica to form calcium silicate hydrate, hardening and densifying the near-surface layer. This provides a sound substrate for primer application. Allow adequate penetration and reaction time before overcoating — confirm requirements with current Parchem TDS. Not a coating — colourless and vapour-permeable after application.",
    technicalProperties: [
      "Penetrating lithium silicate chemistry — reacts with substrate to form calcium silicate hydrate — hardens friable and chalky surfaces",
      "Colourless after application — does not change the visual appearance of the substrate",
      "Vapour-permeable — does not trap moisture in the substrate",
      "Suitable for concrete and masonry facades — improves surface strength before repainting",
      "Confirm application rate, drying time and suitability for specific substrate type with current Parchem Consolideck GL TDS",
    ],
    limitations: [
      "Not a coating or paint — must be overcoated with primer and topcoat — not a finished surface treatment",
      "Not suitable for all substrate types — confirm suitability for the specific concrete or masonry type with Parchem technical",
      "Substrate must be clean and free of previous coating, oils and contamination before application — penetration depends on open substrate pores",
      "Allow full reaction time before applying primer — premature overcoating can prevent adequate consolidation",
      "Confirm current product specification and compliance with Parchem Construction Products before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Products — trade supply — contact for current pricing", url: "https://www.parchem.com.au" },
      { name: "Parchem national branch network — confirm local availability", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Dulux Group Australia",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#22c55e",
    name: "Dulux Weathershield Exterior",
    descriptionLine: "Premium water-based exterior acrylic paint for masonry and render facades — 2-coat application for durability and UV resistance",
    productType: "Premium 2-coat exterior acrylic paint",
    filterTags: ["Acrylic", "Exterior", "2-coat", "Masonry", "Render", "UV-stable"],
    techChips: [
      { label: "Exterior acrylic", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "2-coat system", cls: "bg-slate-100 text-slate-700" },
      { label: "UV-stable", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 3715", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Dulux Weathershield Exterior is a premium water-based exterior acrylic paint formulated for masonry and render facades in Australian conditions. Applied in a 2-coat system over Dulux Weathershield Alkali Resistant Primer, it provides UV-stable colour and film durability suited to Australian exterior exposure conditions including UV, heat, moisture and thermal cycling.\n\nWeathershield Exterior is suitable for Class 2 strata facade repainting where the existing paint system is being fully removed and the substrate is sound render or masonry. Confirm colour selection, sheen level, application rates and system build from the current Dulux TDS and colour chart. Not suitable as a waterproofing or crack-bridging coating — specify Acratex Surfacekote where crack-bridging performance is required.",
    technicalProperties: [
      "Premium exterior acrylic — designed for Australian UV and weather exposure conditions",
      "Water-based — low VOC — suitable for occupied building environments",
      "UV-stable pigments — resists chalking and colour fade over extended exterior service life",
      "2-coat application over Weathershield Alkali Resistant Primer — confirm system requirements with Dulux TDS",
      "Confirm application rate, dry film thickness, sheen level and recoat times with current Dulux Weathershield Exterior TDS",
    ],
    limitations: [
      "Not a waterproofing membrane or crack-bridging coating — do not rely on Weathershield Exterior as a waterproofing system",
      "Crack-bridging performance is limited — specify Acratex Surfacekote for facades with active hairline cracking",
      "Substrate must be sound, clean and dry — loose, friable or contaminated substrates must be prepared before application",
      "Colour selection affects heat absorption and thermal performance on sun-exposed facades — confirm colour with client",
      "Confirm current product specification and compliance with Dulux Group Australia before specifying",
    ],
    procurementSources: [
      { name: "Dulux trade centres nationally — contact for current pricing", url: "https://www.dulux.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Dulux trade online account", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Dulux Group Australia",
    brandUrl: "https://www.acratex.com.au",
    accentColor: "#3b82f6",
    name: "Acratex Surfacekote",
    descriptionLine: "Thick-film elastomeric coating for crack-bridging on rendered masonry facades — bridges hairline cracks up to 0.5mm",
    productType: "Elastomeric crack-bridging exterior coating",
    filterTags: ["Elastomeric", "Crack-bridging", "Exterior", "Acrylic", "Render", "Masonry"],
    techChips: [
      { label: "Elastomeric coating", cls: "bg-sky-100 text-sky-800" },
      { label: "Crack-bridging", cls: "bg-slate-100 text-slate-700" },
      { label: "Thick film", cls: "bg-slate-100 text-slate-700" },
      { label: "Render / masonry", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Acratex Surfacekote is a thick-film elastomeric exterior coating from the Acratex range (a Dulux Group brand) designed specifically for crack-bridging on rendered masonry and concrete facades. The elastomeric film remains flexible after curing, accommodating thermal and structural movement and bridging hairline cracks up to approximately 0.5mm without fracturing.\n\nSurfacekote is specified on Class 2 strata facades where hairline render cracking is present and a standard acrylic topcoat would not provide adequate crack-bridging performance. Applied in multiple coats to achieve the required film thickness. Confirm required dry film thickness, number of coats, primer requirements and crack-bridging classification with current Acratex TDS. Not a structural waterproofing system — for active or moving cracks wider than 0.5mm, a remedial crack repair strategy must be completed before recoating.",
    technicalProperties: [
      "Elastomeric film — remains flexible after cure — accommodates thermal movement and bridges hairline cracks up to approximately 0.5mm",
      "Thick-film application — achieves higher dry film thickness than standard acrylic topcoats for superior weather barrier performance",
      "UV-stable acrylic — resists chalking and colour fade under Australian exterior exposure",
      "Suitable over prepared render and masonry — confirm primer requirements with Acratex TDS",
      "Confirm crack-bridging performance classification, required DFT and application system with current Acratex Surfacekote TDS",
    ],
    limitations: [
      "Not suitable for bridging structural cracks, active moving cracks or cracks wider than approximately 0.5mm — structural repair required before recoating",
      "Not a waterproofing membrane — do not rely on Surfacekote as a primary waterproofing system for balconies, roofs or podiums",
      "Substrate must be sound and well-bonded — delaminated or hollow render must be repaired before application",
      "Thick film application requires correct spray or roller technique to achieve specified DFT — confirm application method with Acratex technical",
      "Confirm current product specification and compliance with Dulux Group Australia / Acratex before specifying",
    ],
    procurementSources: [
      { name: "Acratex / Dulux trade centres nationally — contact for current pricing", url: "https://www.acratex.com.au" },
      { name: "Dulux trade online account", url: "https://www.dulux.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#8b5cf6",
    name: "Wattyl Solagard Metal",
    descriptionLine: "UV-stable exterior enamel topcoat for metal facades, balustrades, steel elements and non-ferrous metals",
    productType: "UV-resistant exterior enamel for metal surfaces",
    filterTags: ["Enamel", "UV-stable", "Metal", "Exterior", "Topcoat"],
    techChips: [
      { label: "UV-stable enamel", cls: "bg-sky-100 text-sky-800" },
      { label: "Exterior topcoat", cls: "bg-slate-100 text-slate-700" },
      { label: "Metal / steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Gloss finish", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Wattyl Solagard Metal is a UV-stable exterior enamel topcoat formulated for metal facades, balustrades, structural steel, lintels, handrails and non-ferrous metal elements on building exteriors. Part of the Wattyl Solagard system, it provides UV resistance, gloss retention and colour stability under Australian exterior exposure conditions.\n\nApplied over compatible Wattyl Killrust epoxy or other approved primer system — confirm primer compatibility with Wattyl TDS. Suitable for primed steel, aluminium, and other metal substrates forming part of facade systems on Class 2 strata buildings. Confirm required number of coats, dry film thickness and recoat windows with current Wattyl Solagard Metal TDS.",
    technicalProperties: [
      "UV-stable enamel — resists gloss loss and colour fade on metal surfaces under Australian exterior UV conditions",
      "Hard film — abrasion-resistant topcoat for metal elements in high-traffic or exposed locations",
      "Compatible with Wattyl Killrust epoxy primer system — confirm full system compatibility with Wattyl TDS",
      "Available in a range of colours — confirm current colour range and sheen levels with Wattyl trade",
      "Confirm application rate, dry film thickness, number of coats and recoat windows with current Wattyl Solagard Metal TDS",
    ],
    limitations: [
      "Not for use on masonry, render or concrete — this is a metal topcoat only — do not apply without a compatible metal primer",
      "Substrate must be primed with a compatible rust-inhibiting primer — do not apply directly to bare or rusted steel",
      "Confirm compatibility with the specific primer system used — not all primers are compatible with all enamel topcoats",
      "Do not apply in wet, humid or dusty conditions — surface contamination causes adhesion and film defects",
      "Confirm current product specification and compliance with Wattyl before specifying",
    ],
    procurementSources: [
      { name: "Wattyl trade stores nationally — contact for current pricing", url: "https://www.wattyl.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#ec4899",
    name: "Wattyl Solagard Timber",
    descriptionLine: "UV-stable exterior enamel for timber window frames, doors and facade joinery — resists chalking and UV degradation",
    productType: "UV-stable exterior enamel for timber",
    filterTags: ["Enamel", "UV-stable", "Timber", "Exterior", "Topcoat"],
    techChips: [
      { label: "UV-stable enamel", cls: "bg-sky-100 text-sky-800" },
      { label: "Exterior topcoat", cls: "bg-slate-100 text-slate-700" },
      { label: "Timber", cls: "bg-slate-100 text-slate-700" },
      { label: "Joinery", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Wattyl Solagard Timber is a UV-stable exterior enamel formulated for timber window frames, doors and facade joinery on building exteriors. Timber joinery on facades is highly exposed to UV, moisture cycling and thermal movement — a UV-stable enamel system provides superior colour retention, gloss retention and film integrity compared to standard interior or low-grade exterior enamels.\n\nApplied over a compatible timber primer and undercoat system — confirm primer and undercoat requirements with Wattyl TDS. Suitable for bare or repainted timber joinery forming part of facade and external envelope systems on Class 2 strata buildings. Confirm required number of coats, sheen level and recoat requirements with current Wattyl Solagard Timber TDS.",
    technicalProperties: [
      "UV-stable enamel formulation — resists chalking, yellowing and gloss loss on timber joinery under Australian exterior UV exposure",
      "Hard, durable film — suitable for timber in high-exposure locations including sun-exposed facades",
      "Compatible with Wattyl timber primer and undercoat system — confirm full system with Wattyl TDS",
      "Available in a range of colours — confirm current colour range with Wattyl trade",
      "Confirm application rate, number of coats and recoat window with current Wattyl Solagard Timber TDS",
    ],
    limitations: [
      "Not suitable for metal, masonry or render — this is a timber topcoat only",
      "Timber must be primed and undercoated with a compatible system — do not apply directly to bare timber without appropriate preparation",
      "Check existing paint system compatibility before overcoating — incompatible existing paint layers may require full removal",
      "Do not apply in wet or humid conditions or when rain is expected within the drying window",
      "Confirm current product specification and compliance with Wattyl before specifying",
    ],
    procurementSources: [
      { name: "Wattyl trade stores nationally — contact for current pricing", url: "https://www.wattyl.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#f59e0b",
    name: "Wattyl Silane 40",
    descriptionLine: "40% concentration silane penetrating water repellent for brick, masonry and concrete — colourless and vapour-permeable",
    productType: "40% silane masonry water repellent",
    filterTags: ["Silane", "Water-repellent", "Masonry", "Penetrating", "Colourless", "Vapour-permeable"],
    techChips: [
      { label: "40% silane", cls: "bg-sky-100 text-sky-800" },
      { label: "Penetrating", cls: "bg-slate-100 text-slate-700" },
      { label: "Colourless", cls: "bg-slate-100 text-slate-700" },
      { label: "Vapour-permeable", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Wattyl Silane 40 is a 40% concentration silane penetrating water repellent for brick, masonry, concrete and stone facades. Unlike paint or coating systems, Silane 40 penetrates into the substrate and chemically bonds with the pore surfaces to create a water-repellent lining within the substrate — it does not form a film on the surface and remains colourless and vapour-permeable after application.\n\nSilane water repellents are specified where the intent is to reduce water absorption into the facade substrate without altering its appearance or trapping moisture vapour. The 40% concentration provides good penetration depth for medium-density masonry and concrete. Confirm substrate suitability, application rate, wet-on-wet vs dry-on-dry application method and retreatment interval with current Wattyl Silane 40 TDS.",
    technicalProperties: [
      "40% silane concentration — penetrates into masonry and concrete substrate — chemically bonds to pore surfaces to form water-repellent lining",
      "Colourless after application — does not alter the visual appearance of the facade substrate",
      "Vapour-permeable — moisture vapour can escape from the substrate — does not trap moisture",
      "Does not form a surface film — cannot be painted over — confirm with Wattyl if overcoating is required",
      "Confirm application rate, method (wet-on-wet or dry-on-dry) and retreat interval with current Wattyl Silane 40 TDS",
    ],
    limitations: [
      "Not a paint or coating system — does not provide colour, UV protection or graffiti resistance — specify a paint topcoat where these properties are required",
      "Cannot be applied over existing paint or coating — substrate must be bare and clean for penetration",
      "Not suitable for substrates that are heavily contaminated with oils, efflorescence, or previous silicone treatments — prepare substrate thoroughly",
      "Service life is finite — silane water repellents require retreatment at intervals — confirm service life and retreatment requirements with Wattyl TDS",
      "Confirm current product specification and compliance with Wattyl before specifying",
    ],
    procurementSources: [
      { name: "Wattyl trade stores nationally — contact for current pricing", url: "https://www.wattyl.com.au" },
    ],
  },
  {
    fullLabel: "Parchem Construction Products",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#6366f1",
    name: "Parchem Biocide",
    descriptionLine: "Biocide wash for mould, algae and lichen removal from masonry and concrete facades prior to repainting",
    productType: "Biocide surface treatment for mould and algae",
    filterTags: ["Biocide", "Mould", "Algae", "Surface-prep", "Masonry", "Pre-coat"],
    techChips: [
      { label: "Biocide treatment", cls: "bg-sky-100 text-sky-800" },
      { label: "Mould / algae", cls: "bg-slate-100 text-slate-700" },
      { label: "Surface prep", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-paint wash", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Parchem Biocide is a biocide surface treatment formulated for the removal of mould, algae, lichen and other biological growth from masonry and concrete facades prior to repainting or recoating. Biological growth on facades — particularly on south-facing or shaded elevations — must be killed and removed before applying a new coating system. Painting over live biological growth leads to rapid re-colonisation and premature coating failure.\n\nApplied by spray or brush to the contaminated facade surface — allow appropriate dwell time for the biocide to kill the biological growth, then wash off before repainting. Confirm dwell time, dilution rate, personal protective equipment requirements and disposal of washings with current Parchem Biocide TDS. Confirm that the biocide treatment is compatible with the subsequent primer and topcoat system specified.",
    technicalProperties: [
      "Kills mould, algae, lichen and other biological growth on masonry and concrete facade surfaces",
      "Applied by spray or brush — penetrates biological growth layers to kill at the root",
      "Suitable for porous masonry and concrete substrates — confirm suitability for specific substrate with Parchem TDS",
      "Used as a surface preparation step before priming and topcoating — not a standalone coating",
      "Confirm dilution rate, dwell time, personal protective equipment and disposal requirements with current Parchem Biocide TDS",
    ],
    limitations: [
      "Not a paint, primer or coating — must be washed off after treatment — do not leave as a surface treatment in place of proper cleaning",
      "Biological growth will re-colonise if the underlying moisture source or shading conditions are not addressed",
      "Personal protective equipment required during application — confirm PPE requirements with TDS — biocide is a chemical hazard",
      "Washings from biocide application must be disposed of in accordance with local environmental regulations",
      "Confirm current product specification and compliance with Parchem Construction Products before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Products — trade supply — contact for current pricing", url: "https://www.parchem.com.au" },
      { name: "Parchem national branch network — confirm local availability", url: "https://www.parchem.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Primer", label: "Primer" },
  { id: "Alkali-resistant", label: "Alkali-resistant" },
  { id: "Water-based", label: "Water-based" },
  { id: "Render", label: "Render" },
  { id: "Masonry", label: "Masonry" },
  { id: "Pre-coat", label: "Pre-coat" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "Rust-inhibiting", label: "Rust-inhibiting" },
  { id: "2C", label: "2-component" },
  { id: "Steel", label: "Steel" },
  { id: "Metal", label: "Metal" },
  { id: "Consolidant", label: "Consolidant" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Concrete", label: "Concrete" },
  { id: "Surface-prep", label: "Surface prep" },
  { id: "Acrylic", label: "Acrylic" },
  { id: "Exterior", label: "Exterior" },
  { id: "2-coat", label: "2-coat" },
  { id: "UV-stable", label: "UV-stable" },
  { id: "Elastomeric", label: "Elastomeric" },
  { id: "Crack-bridging", label: "Crack-bridging" },
  { id: "Enamel", label: "Enamel" },
  { id: "Timber", label: "Timber" },
  { id: "Topcoat", label: "Topcoat" },
  { id: "Silane", label: "Silane" },
  { id: "Water-repellent", label: "Water-repellent" },
  { id: "Colourless", label: "Colourless" },
  { id: "Vapour-permeable", label: "Vapour-permeable" },
  { id: "Biocide", label: "Biocide" },
  { id: "Mould", label: "Mould" },
  { id: "Algae", label: "Algae" },
];

const BRAND_EQUIV: { system: string; dulux: string; wattyl: string; parchem: string }[] = [
  { system: "Alkali-resistant primer (water-based)", dulux: "Weathershield AR Primer", wattyl: "—", parchem: "—" },
  { system: "Rust-inhibiting epoxy primer (2C)", dulux: "—", wattyl: "Killrust Epoxy", parchem: "—" },
  { system: "Surface consolidant", dulux: "—", wattyl: "—", parchem: "Consolideck GL" },
  { system: "Exterior acrylic topcoat", dulux: "Weathershield Exterior", wattyl: "—", parchem: "—" },
  { system: "Elastomeric coating", dulux: "Acratex Surfacekote", wattyl: "—", parchem: "—" },
  { system: "UV enamel (metal)", dulux: "—", wattyl: "Solagard Metal", parchem: "—" },
  { system: "UV enamel (timber)", dulux: "—", wattyl: "Solagard Timber", parchem: "—" },
  { system: "Silane water repellent", dulux: "—", wattyl: "Silane 40", parchem: "—" },
  { system: "Biocide treatment", dulux: "—", wattyl: "—", parchem: "Biocide" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; type: string; coats: string; substrate: string; feature: string; primaryUse: string;
}[] = [
  {
    product: "Weathershield Alkali Resistant Primer",
    brand: "Dulux",
    type: "Water-based acrylic primer",
    coats: "1",
    substrate: "Render / masonry / concrete",
    feature: "Alkali-resistant — seals new render",
    primaryUse: "First coat on new or repainted render and masonry facades",
  },
  {
    product: "Killrust Epoxy Primer",
    brand: "Wattyl",
    type: "Two-pack epoxy primer",
    coats: "1–2",
    substrate: "Steel / metal",
    feature: "Rust-inhibiting — two-component",
    primaryUse: "Priming bare or rusted steel facade elements",
  },
  {
    product: "Consolideck GL",
    brand: "Parchem",
    type: "Penetrating silicate consolidant",
    coats: "1–2 (surface treatment)",
    substrate: "Concrete / masonry",
    feature: "Hardens friable substrate — colourless",
    primaryUse: "Surface preparation of chalky / friable concrete before repainting",
  },
  {
    product: "Weathershield Exterior",
    brand: "Dulux",
    type: "Exterior acrylic topcoat",
    coats: "2",
    substrate: "Render / masonry",
    feature: "UV-stable — premium 2-coat",
    primaryUse: "Standard exterior repaint on sound render and masonry facades",
  },
  {
    product: "Acratex Surfacekote",
    brand: "Acratex (Dulux)",
    type: "Elastomeric acrylic coating",
    coats: "2–3 (confirm DFT)",
    substrate: "Render / masonry",
    feature: "Crack-bridging up to 0.5mm",
    primaryUse: "Facades with hairline render cracking requiring elastomeric film",
  },
  {
    product: "Solagard Metal",
    brand: "Wattyl",
    type: "UV-stable exterior enamel",
    coats: "2",
    substrate: "Metal / steel",
    feature: "UV-resistant — gloss retention",
    primaryUse: "Topcoat for primed metal facades, balustrades and steel elements",
  },
  {
    product: "Solagard Timber",
    brand: "Wattyl",
    type: "UV-stable exterior enamel",
    coats: "2",
    substrate: "Timber joinery",
    feature: "UV-stable — anti-chalk",
    primaryUse: "Topcoat for timber window frames, doors and facade joinery",
  },
  {
    product: "Silane 40",
    brand: "Wattyl",
    type: "Penetrating silane water repellent",
    coats: "1–2 (wet-on-wet)",
    substrate: "Brick / masonry / concrete",
    feature: "Colourless — vapour-permeable — penetrating",
    primaryUse: "Reducing water absorption into masonry and concrete without altering appearance",
  },
  {
    product: "Parchem Biocide",
    brand: "Parchem",
    type: "Biocide surface wash",
    coats: "N/A (wash off)",
    substrate: "Masonry / concrete",
    feature: "Kills mould, algae, lichen",
    primaryUse: "Pre-paint biological growth removal on facade substrates",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repainting of render and masonry facades on Class 2 strata buildings after defect repair or periodic repainting",
    "Coating of steel and metal facade elements including balustrades, lintels, handrails and window frames",
    "Elastomeric overcoating of facades with hairline render cracking where crack-bridging performance is required",
    "Silane water repellent treatment of brick and masonry facades to reduce water absorption without altering appearance",
    "Surface preparation (consolidant and biocide treatment) prior to priming and recoating of deteriorated facades",
  ],
  selectionCriteria: [
    "Select alkali-resistant primer for all new render and masonry substrates — standard primers will fail on high-pH substrates",
    "Select elastomeric coating (Acratex Surfacekote) where hairline render cracking is present — standard acrylic will not bridge cracks",
    "Select silane water repellent where the intent is to reduce water absorption without altering facade appearance — silane cannot be painted over",
    "Confirm surface consolidant is applied to friable or chalky substrates before primer — do not prime directly over unsound surfaces",
    "Select biocide treatment where mould, algae or lichen is present — do not paint over live biological growth",
  ],
  limitations: [
    "Elastomeric coatings will not bridge active structural cracks or cracks wider than approximately 0.5mm — structural repair is required first",
    "Silane water repellents cannot be applied over existing paint or coating — substrate must be bare and clean",
    "Standard exterior acrylic is not a waterproofing system — do not rely on paint coatings as the primary waterproofing strategy",
    "All coating systems are dependent on surface preparation — failure to adequately prepare is the primary cause of new coating delamination",
    "Biological growth will re-colonise if the underlying moisture source or shading conditions are not addressed — biocide treatment is not permanent",
  ],
  standardsNotes: [
    "AS 3715 — Metal Finishing — Powder Coating for Architectural Applications of Aluminium and Aluminium Alloys — referenced for metal facade coating systems",
    "AS/NZS 3750 — Paints for Steel Structures — referenced for selection of coating systems for steel elements on facades",
    "NCC (National Construction Code) — confirm compliance with relevant provisions for fire, weatherproofing and energy efficiency for coating selections",
    "Manufacturer TDS — always confirm current product system data sheet requirements for substrate preparation, coats and DFT before specifying",
  ],
  suitableDefects: [
    "Chalking, peeling or delaminated exterior paint on render and masonry facades requiring repainting",
    "Rusting or corroding steel facade elements requiring priming and repainting",
    "Hairline render cracking on facades requiring elastomeric crack-bridging coating system",
    "Mould, algae or biological growth contamination on masonry facades prior to repainting",
    "Water absorption through brick or masonry facades without visible coating film failure",
  ],
  typicalSubstrates: [
    "Rendered masonry and concrete — the primary substrate for exterior acrylic and elastomeric coating systems",
    "Bare and primed steel — structural steel, lintels, balustrades and embedded metalwork on facades",
    "Aluminium and non-ferrous metal — window frames and facade cladding elements requiring enamel topcoat",
    "Timber joinery — window frames, doors and facade joinery requiring UV-stable enamel system",
    "Brick and masonry — for silane water repellent treatment and biocide preparation prior to recoating",
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
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
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

export function ExternalCoatingIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are external coating and paint systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          External coating and paint systems for facades consist of a layered sequence of products: surface preparation treatments (consolidants, biocides), primers (alkali-resistant or rust-inhibiting) and topcoats (exterior acrylic, elastomeric or enamel). Each layer performs a specific role — preparation treatments stabilise and clean the substrate, primers provide adhesion and alkali or corrosion resistance, and topcoats provide weathering resistance, UV stability, colour and in some cases crack-bridging performance.
        </p>
        <p>
          Selecting between a standard exterior acrylic and an elastomeric coating depends on the substrate condition and defect type. On sound render and masonry with no active cracking, a standard 2-coat acrylic system (such as Dulux Weathershield Exterior) provides adequate performance. Where hairline render cracking is present and an elastomeric film is required to bridge movement, a thick-film elastomeric coating (such as Acratex Surfacekote) is specified. Silane water repellents are an alternative to paint systems where reducing water absorption without altering appearance is the objective — silane penetrates the substrate and cannot be painted over.
        </p>
        <p>
          For metal and timber facade elements, enamel topcoat systems are specified rather than acrylic masonry paints. Metal elements require a rust-inhibiting primer (such as Wattyl Killrust Epoxy Primer) before the enamel topcoat. Surface preparation is the most critical step in any coating system — friable, chalky, contaminated or mould-affected substrates must be fully treated before primer application. Failure to prepare the substrate adequately is the primary cause of premature coating delamination on facades.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Waterproofing membranes — structural waterproofing systems (liquid-applied PU, torch-on sheet) — not paint systems and not interchangeable",
              "Internal paints — not UV or weather rated for exterior use — do not use internal paint on exterior facades",
              "Silicone joint sealants — flexible movement joint fillers — not coating systems",
              "Render systems — cementitious or polymer-modified render mortars — applied to build up the facade substrate, not to coat it",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ExternalCoatingProductSection() {
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
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
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
            <p className="mt-1 text-sm text-slate-500">9 products — 5 brands — exterior coating and paint systems — scroll to view all</p>
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

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
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

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of exterior coating products for facade remediation. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Coats</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.coats}</td>
                  <td className="px-4 py-3 text-slate-600">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.feature}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">Exterior coating system equivalents across brands active in Australian Class 2 strata facade remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Dulux</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>Wattyl</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#eab308" }}>Parchem</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.dulux, row.wattyl, row.parchem].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Surface preparation is critical</h3>
        </div>
        <ul className="space-y-2">
          {[
            "All coating systems depend on adequate surface preparation — friable, chalky, contaminated or poorly bonded existing paint must be removed before repainting. Do not apply primer or topcoat directly to an unsound substrate.",
            "Friable or chalky concrete and masonry must be treated with a penetrating consolidant (such as Parchem Consolideck GL) before primer application — primer applied to a friable surface will delaminate with the substrate.",
            "Mould, algae and biological growth must be killed and removed with a biocide treatment before repainting — painting over live biological growth causes rapid re-contamination and premature coating failure.",
            "Pressure wash the facade after biocide treatment and allow the substrate to dry thoroughly before primer application — wet substrates cause adhesion failure and blistering in the new coating system.",
            "Failure to adequately prepare the substrate is the primary cause of new coating delamination on facades — surface preparation is not optional and cannot be substituted by selecting a higher-performance topcoat.",
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
