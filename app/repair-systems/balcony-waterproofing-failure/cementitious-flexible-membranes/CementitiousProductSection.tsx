"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Two-component"
  | "Microfibre-reinforced"
  | "High-flexibility"
  | "Thixotropic"
  | "Acrylic-modified"
  | "Class-III"
  | "Class-II"
  | "Under-tile"
  | "Internal-external"
  | "Balcony-terrace"
  | "Pools-tanks"
  | "Basements"
  | "Retaining-walls"
  | "Damp-substrate"
  | "UV-resistant"
  | "Potable-water"
  | "Positive-negative-pressure"
  | "AS-4858"
  | "AS-4654"
  | "One-component";

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
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-002/",
    accentColor: "#f97316",
    name: "ARDEX WPM 002",
    descriptionLine: "Two-component microfibre-reinforced cementitious membrane — under-tile, screed, and paver systems — internal and external — no separate reinforcement mat at field areas",
    productType: "Two-component cementitious flexible membrane — Class III AS 4858",
    filterTags: ["Two-component", "Microfibre-reinforced", "Class-III", "Under-tile", "Internal-external", "Balcony-terrace", "AS-4858", "AS-4654"],
    techChips: [
      { label: "Two-component", cls: "bg-orange-100 text-orange-800" },
      { label: "Microfibre reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Class III — AS 4858", cls: "bg-green-50 text-green-700" },
      { label: "AS 4654 external", cls: "bg-slate-100 text-slate-700" },
      { label: "Tile direct — 16–24 hrs", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX WPM 002 is ARDEX Australia's primary two-component cementitious flexible waterproofing membrane for under-tile balcony, terrace, and wet area applications. It is a modified cementitious system — not a polyurethane — and is formulated specifically for direct compatibility with ARDEX polymer-modified tile adhesive systems without requiring a bond breaker or intermediate layer. The product has been uniquely formulated with synthetic microfibres integrated into the mix, which increases tensile strength and eliminates the need for a separate reinforcing mat in field areas. At corners, coves, drain surrounds, and penetrations, ARDEX still recommends reinforcing tape or fabric embedded in the first coat — confirm current detailing requirements with ARDEX technical. Apply in two coats to achieve the specified minimum DFT of 1.2mm on floors and 1.0mm on walls. Tile over is typically 16–24 hours at 23°C/50% RH — in non-critical areas as little as 4 hours under optimal conditions. WPM 002 complies with AS 4858 as a Class III wet area membrane (confirmed by CSIRO Report 3879) and with AS 4654 for external above-ground applications. Note: ARDEX WPM 002 is the Australian product — do not use US ARDEX 8+9 TDS data for Australian projects.",
    technicalProperties: [
      "Two-component modified cementitious membrane — powder + liquid components mixed on site",
      "Synthetic microfibre reinforcement integral to the mix — no separate reinforcing mat required at field areas",
      "Class III per AS 4858 — confirmed by CSIRO Report 3879",
      "AS 4654 compliant for external above-ground applications — low VOC — solvent free — will not re-emulsify once cured",
      "Minimum DFT: 1.2mm floors (two coats), 1.0mm walls (two coats) — tile-over 16–24 hours at 23°C, as little as 4 hours non-critical",
      "Suitable substrates: concrete (28 days minimum cure), masonry, render, fibre cement compressed sheet, plywood, wet-wall linings",
      "Compatible with ARDEX polymer-modified tile adhesive systems — also suitable under polymer-modified screed and paver/decking systems",
    ],
    limitations: [
      "Not a polyurethane membrane — do not substitute for a PU Class III system where high elongation or active crack bridging is required",
      "Reinforcing tape or fabric still required at all coves, junctions, drain surrounds, and penetrations — microfibre integral reinforcement does not eliminate junction detailing requirements",
      "Minimum two coats required to achieve specified DFT — single coat is not sufficient",
      "Not suitable for direct trafficable exposure — must be covered with tiles, screed, or pavers",
      "Do not apply to wet or standing-water substrates — substrate must be sound, clean, and damp-dry before application",
      "Confirm current product specification with ARDEX Australia before specifying — do not use US ARDEX 8+9 TDS for Australian projects",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Tile Warehouse", url: "https://tilewarehouse.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapelastic-smart",
    accentColor: "#0369a1",
    name: "Mapei Mapelastic Smart",
    descriptionLine: "Two-component high-flexibility cementitious mortar — crack-bridging greater than 2mm — Class II — balconies, terraces, bathrooms, and pools — UV resistant",
    productType: "Two-component cementitious flexible membrane — Class II — crack-bridging >2mm",
    filterTags: ["Two-component", "High-flexibility", "Class-II", "Under-tile", "Balcony-terrace", "Pools-tanks", "UV-resistant", "Potable-water", "AS-4858"],
    techChips: [
      { label: "Two-component", cls: "bg-sky-100 text-sky-800" },
      { label: "High flexibility", cls: "bg-slate-100 text-slate-700" },
      { label: "Class II — AS/NZS 4858", cls: "bg-green-50 text-green-700" },
      { label: "Crack-bridging >2mm", cls: "bg-slate-100 text-slate-700" },
      { label: "UV resistant", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapelastic Smart is Mapei Australia's primary high-flexibility two-component cementitious waterproofing membrane for balconies, terraces, bathrooms, showers, and swimming pools. At 2mm thickness, it achieves a crack-bridging capacity greater than 2mm, which distinguishes it from lower-elongation cementitious membranes and makes it appropriate for use on substrates with minor movement. The product is classified as Class II per AS/NZS 4858 with 170% elongation at failure — it is not Class III. For projects requiring Class III elongation performance, a polyurethane or hybrid membrane must be specified instead. However, for standard balcony under-tile waterproofing on concrete substrates, Class II cementitious performance with more than 2mm crack bridging covers the majority of remediation scenarios on stable Class 2 strata buildings. Apply by brush, roller, trowel, or spray at a minimum 2mm thickness. Reinforcing fabric — Mapetex Sel (non-woven polypropylene) or Mapenet 150 (fibreglass mesh) — must be embedded in the first coat at all coves, corners, junctions, drain surrounds, and penetrations. UV resistant — suitable for temporary UV exposure during construction before tiling. Approved for potable water contact (AS/NZS 4020:2018). Can be applied over existing tiles that are clean and well bonded.",
    technicalProperties: [
      "Two-component high-flexibility cementitious mortar — brush, roller, trowel, or spray-rendering machine application",
      "Crack-bridging capacity greater than 2mm at 2mm DFT — Class II per AS/NZS 4858 — 170% elongation at failure",
      "UV resistant — suitable for temporary exposure before tiling — approved for potable water contact (AS/NZS 4020:2018)",
      "CE certified — EN 1504-2 and EN 14891 — can be applied over existing tiles (clean and well bonded)",
      "Pot life: 60 minutes after mixing at +20°C — waiting time between coats: 4–5 hours — tile-over: minimum 5 days after final coat",
      "Application temperature range: +5°C to +35°C — consumption approximately 1.6 kg/m² per mm by roller or brush",
      "Reinforcement: Mapetex Sel or Mapenet 150 at all junctions — mandatory — not optional",
    ],
    limitations: [
      "Class II only — not Class III — do not substitute for a PU Class III membrane where Class III elongation is specified or required",
      "Tile-over time is 5 days minimum — programme must account for this — not suitable where a fast tile-over programme is required",
      "Reinforcing fabric mandatory at all coves, corners, junctions, and drain surrounds — Mapetex Sel or Mapenet 150 must be embedded in first coat",
      "Pot life 60 minutes — plan batch sizes carefully to avoid waste — particularly important in hot weather",
      "Do not apply in temperatures below +5°C or above +35°C — protect from rain and water spillage for 24 hours after laying",
      "Confirm current product specification with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Pavers Plus", url: "https://www.paversplus.com.au" },
      { name: "Online Tilers Store", url: "https://onlinetilersstore.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/mapelastic-foundation",
    accentColor: "#0369a1",
    name: "Mapei Mapelastic Foundation",
    descriptionLine: "Two-component flexible cementitious mortar — positive and negative hydraulic pressure — thixotropic — concrete and masonry structures, pools, tanks, retaining walls, and below-grade",
    productType: "Two-component cementitious flexible membrane — thixotropic — positive and negative pressure",
    filterTags: ["Two-component", "Thixotropic", "Basements", "Retaining-walls", "Pools-tanks", "Damp-substrate", "Positive-negative-pressure"],
    techChips: [
      { label: "Two-component", cls: "bg-sky-100 text-sky-800" },
      { label: "Thixotropic", cls: "bg-slate-100 text-slate-700" },
      { label: "Positive and negative pressure", cls: "bg-green-50 text-green-700" },
      { label: "Below-grade / retaining walls", cls: "bg-slate-100 text-slate-700" },
      { label: "EMICODE EC1R Plus", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mapei Mapelastic Foundation is Mapei's two-component flexible cementitious waterproofing mortar for concrete and masonry structures subject to both positive and negative hydraulic pressure. Unlike Mapelastic Smart — which is positioned primarily for above-ground balcony and wet area waterproofing — Mapelastic Foundation is formulated with a thixotropic consistency suited to below-grade structures, retaining walls, swimming pools, water tanks, basement walls, and hydraulic structures. Its thixotropic consistency makes it well suited to vertical and overhead concrete surfaces where a fluid-consistency product would sag or run. Minimum applicable thickness is 2mm applied in two coats. The mixing ratio is 2.2 parts powder to 1 part liquid. Pot life is approximately 1 hour at +20°C. Applied by roller or spray. On balcony and terrace applications, Mapelastic Foundation is most relevant where the balcony structure is subject to significant moisture loading from below or where a negative-pressure waterproofing system is required — for example, where water ingress through the slab is coming from above and the membrane must resist hydrostatic lift from beneath. For standard positive-side under-tile balcony waterproofing on a dry concrete substrate, Mapelastic Smart is the more appropriate Mapei product. Classified to EN 1504-2 and EN 14891 — EMICODE EC1R Plus certified.",
    technicalProperties: [
      "Two-component flexible cementitious mortar — thixotropic consistency — suitable for vertical and overhead surfaces without sagging",
      "Designed for positive and negative hydraulic pressure applications — concrete and masonry under hydraulic loading",
      "Minimum 2mm DFT applied in two coats — mixing ratio: 2.2 parts powder (comp. A) : 1 part liquid (comp. B)",
      "Pot life: approximately 1 hour at +20°C — application temperature: +5°C to +40°C",
      "Applied by roller or spray — consumption by roller: 1.65 kg/m² per mm — by spray: 2.2 kg/m² per mm",
      "Classified to EN 1504-2 (coating C, principles PI, MC, IR) and EN 14891 — EMICODE EC1R Plus — very low VOC emission",
      "Suitable substrates: concrete and masonry under positive or negative hydraulic pressure — confirm AS compliance with Mapei Australia",
    ],
    limitations: [
      "Not the primary Mapei product for standard above-ground balcony under-tile waterproofing — for standard balcony and wet area use, specify Mapelastic Smart instead",
      "Confirm AS 4858 and AS 4654 compliance status for Australian balcony applications with Mapei Australia technical — the product is classified to EN standards, not confirmed AS-classified in publicly available Australian TDS",
      "Pot life 1 hour — plan batch sizes to avoid waste",
      "Not a direct substitute for Mapelastic Smart — different consistency, mixing ratio, and primary application scope",
      "Confirm reinforcing fabric requirements and AS compliance status with Mapei Australia technical before specifying for balcony use",
      "Confirm current product specification with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Mosaic Co", url: "https://www.mosaicco.com.au" },
      { name: "Applied Building Products Australia", url: "https://www.appliedbuildingproducts.com.au" },
    ],
  },
  {
    fullLabel: "Davco / Laticrete Australia",
    brandUrl: "https://davco.com.au",
    tdsUrl: "https://davco.com.au",
    accentColor: "#16a34a",
    name: "Davco K11 Flex",
    descriptionLine: "Two-part acrylic-modified cementitious waterproofing system — bonds to damp substrates — under-tile balcony, terrace, basement, and wet area use — nationally stocked",
    productType: "Two-part acrylic-modified cementitious waterproofing system",
    filterTags: ["Two-component", "Acrylic-modified", "Damp-substrate", "Under-tile", "Internal-external", "Balcony-terrace", "Basements", "Positive-negative-pressure"],
    techChips: [
      { label: "Two-part", cls: "bg-green-100 text-green-800" },
      { label: "Acrylic-modified", cls: "bg-slate-100 text-slate-700" },
      { label: "Damp substrate OK", cls: "bg-green-50 text-green-700" },
      { label: "Internal and external", cls: "bg-slate-100 text-slate-700" },
      { label: "Nationally stocked", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Davco K11 Flex is a two-part acrylic-modified cementitious waterproofing system from Davco (Laticrete Australia) — one of the most widely distributed cementitious membrane systems in Australian trade supply, available nationally through Bunnings and trade distributors. It is a practical choice for standard under-tile balcony and wet area waterproofing, particularly in conditions where the substrate surface cannot be fully dried before application. K11 Flex is specifically formulated to be applied to dampened or pre-wetted surfaces — a practical advantage on balcony remediation projects in humid conditions or where the concrete substrate retains residual moisture. The two components react chemically after mixing to form a hard, elastic film that bonds tenaciously to most concrete and masonry substrates. Tiles, renders, and screeds can be fixed directly over the cured membrane using Davco tile adhesives. K11 Flex is suited to internal wet areas, external balconies and terraces under tiles, and basement walls in both positive and negative water pressure conditions. In external areas, application is compatible with variable weather conditions — a practical advantage for exposed strata balcony work. Confirm the current product TDS and AS compliance status directly with Davco / Laticrete Australia before specifying.",
    technicalProperties: [
      "Two-part acrylic-modified cementitious system — powder + liquid components mixed on site",
      "Designed for application to dampened or pre-wetted surfaces — substrate does not need to be fully dried before application",
      "Hard elastic film after cure — bonds tenaciously to concrete and masonry substrates",
      "Suitable for positive and negative water pressure applications — basements, retaining walls, and above-ground wet areas",
      "Direct compatibility with Davco tile adhesive systems after cure — tiles, renders, and screed can be fixed directly over cured membrane",
      "Internal and external use — balconies, terraces, bathrooms, basements",
      "Widely available nationally — Bunnings in-store and through trade distributors",
    ],
    limitations: [
      "Confirm current AS 4858 class rating (Class II or III) and AS 4654 compliance with Davco / Laticrete Australia — confirm from current TDS, not from third-party sources",
      "Reinforcing fabric requirement at junctions and coves must be confirmed with Davco technical — do not assume the mix alone is sufficient at movement-critical details",
      "Not a polyurethane membrane — do not substitute where Class III elongation or active crack bridging is required",
      "Not a trafficable exposed membrane — must be covered with tiles, screed, or pavers",
      "Confirm tile adhesive compatibility — use Davco-approved adhesive systems over the cured membrane",
      "Confirm current product name, formulation, and specification with Davco / Laticrete Australia before specifying — product range subject to periodic revision",
    ],
    procurementSources: [
      { name: "Davco / Laticrete Australia — trade supply", url: "https://davco.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.fosroc.com.au/product/nitoproof-410",
    accentColor: "#7c2d12",
    name: "Fosroc Nitoproof 410",
    descriptionLine: "Two-component fast-drying cementitious flexible waterproofing membrane — Class III AS 4858 wet areas — under-tile balcony, terrace, and podium — trafficable when overcoated with Nitoproof Top Coat UV",
    productType: "Two-component cementitious flexible membrane — Class III (wet areas) — AS 4858",
    filterTags: ["Two-component", "Class-III", "Under-tile", "Internal-external", "Balcony-terrace", "AS-4858"],
    techChips: [
      { label: "Two-component", cls: "bg-orange-100 text-orange-900" },
      { label: "Class III — AS 4858", cls: "bg-green-50 text-green-700" },
      { label: "Fast drying", cls: "bg-slate-100 text-slate-700" },
      { label: "Under-tile / screed", cls: "bg-slate-100 text-slate-700" },
      { label: "Trafficable with Top Coat UV", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitoproof 410 (formerly marketed as Emer-Proof Aqua Barrier Quick Dry) is a two-component, polymer-modified, cementitious flexible waterproofing membrane distributed in Australia through Parchem Construction Supplies (DuluxGroup). It is classified as a Class III membrane for wet areas under AS 4858 and is designed for under-tile waterproofing of balconies, terraces, podium slabs, and internal wet areas. A key feature is its fast-drying formulation, which reduces waiting time between coat applications and before tile adhesive can be applied — confirm current tile-over time with the active TDS from Parchem or the Fosroc Australia website before programming the works. When overcoated with the companion Nitoproof Top Coat UV product, Nitoproof 410 can be specified as a trafficable exposed membrane system for light foot traffic — this is an important product feature for podium and terrace applications where exposed trafficable waterproofing is required. Apply by brush or roller. Reinforcing tape or fabric is required at all coves, junctions, drain surrounds, and penetrations — confirm detailing requirements with Fosroc / Parchem technical. Distributed primarily through Parchem Construction Supplies branches nationally.",
    technicalProperties: [
      "Two-component polymer-modified cementitious membrane — powder + liquid components mixed on site",
      "Class III classification for wet areas per AS 4858 — confirm against current TDS and Parchem technical for project specification",
      "Fast-drying formulation — reduced waiting time between coats and before tile application — confirm current tile-over time with TDS",
      "Trafficable when overcoated with Fosroc Nitoproof Top Coat UV — provides exposed trafficable waterproofing for balconies and podiums",
      "Suitable for under-tile balcony, terrace, and podium slab waterproofing — internal and external applications",
      "Apply by brush or roller — reinforcing tape or fabric required at all junctions, coves, drain surrounds, and penetrations",
      "Distributed nationally through Parchem Construction Supplies (DuluxGroup) branches",
    ],
    limitations: [
      "Confirm current AS 4858 class rating, elongation, and DFT requirements from the current Fosroc / Parchem TDS — product was formerly marketed as Emer-Proof Aqua Barrier Quick Dry — confirm current product name before ordering",
      "Reinforcing tape or fabric required at all movement-critical details — do not apply as a single-layer system at junctions without embedded reinforcement",
      "Not a polyurethane membrane — do not substitute for a PU Class III membrane where high elongation or active crack bridging is required",
      "Substrate must be sound, clean, and dry — not suitable for application to wet or standing-water substrates",
      "Trafficable exposed system requires Nitoproof Top Coat UV overcoat — do not leave membrane uncoated in exposed trafficable applications",
      "Confirm current product specification and availability with Parchem Construction Supplies before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — trade supply", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/waterproofing/liquid-applied-membranes/mortars-coatings/sikalastic-1k.html",
    accentColor: "#be123c",
    name: "Sika Sikalastic-1K",
    descriptionLine: "One-component fibre-reinforced cementitious waterproofing mortar — crack-bridging — pools, tanks, basins, and external above-ground concrete — AS 4654.1 compliant — water-activated, no polymer liquid component",
    productType: "One-component cementitious waterproofing mortar — AS 4654.1 — EN 14891",
    filterTags: ["One-component", "Under-tile", "Pools-tanks", "Balcony-terrace", "UV-resistant", "Potable-water", "AS-4654"],
    techChips: [
      { label: "One-component", cls: "bg-rose-100 text-rose-800" },
      { label: "Fibre reinforced — integral", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654.1 compliant", cls: "bg-green-50 text-green-700" },
      { label: "Crack-bridging", cls: "bg-slate-100 text-slate-700" },
      { label: "Pools / tanks / basins", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Sikalastic-1K is a one-component, fibre-reinforced cementitious waterproofing mortar from Sika Australia. It is important to clearly distinguish this product from two-component cementitious membranes listed on this page — Sikalastic-1K is activated by adding water only, with no polymer liquid component mixed in the field. It is not a two-component polymer dispersion system. Sikalastic-1K is formulated for concrete protection and waterproofing of pools, tanks, basins, retaining walls, and external above-ground concrete structures. It complies with AS 4654.1 for external above-ground waterproofing and is classified to EN 14891. Integral fibre reinforcement provides crack-bridging capability — confirm the crack-bridging rating and elongation performance from the current Sika Australia TDS before specifying for balcony or terrace applications where movement is expected. The product is also used as a cementitious protective coating for concrete structures subject to water immersion. Note: Sika Davco K11 Flex (also listed on this page) is Sika / Davco's two-component cementitious membrane system commonly used for under-tile balcony waterproofing. Sikalastic-1K is a different and separate product line with a different primary application scope. Do not substitute one for the other without confirming performance requirements with Sika Australia technical.",
    technicalProperties: [
      "One-component cementitious waterproofing mortar — activated by adding water only — no polymer liquid component required",
      "Integral fibre reinforcement — provides crack-bridging capability — confirm crack-bridging rating and elongation from current TDS",
      "AS 4654.1 compliant for external above-ground waterproofing — EN 14891 classified",
      "Suitable for pools, tanks, basins, retaining walls, and external concrete surfaces subject to water immersion",
      "Applied by brush, roller, or spray — confirm application method, number of coats, and minimum DFT from current TDS",
      "Confirm potable water approval and AS/NZS 4020 compliance status with Sika Australia for drinking water contact applications",
      "Confirm AS 4858 wet area classification status with Sika Australia before specifying for balcony under-tile applications",
    ],
    limitations: [
      "This is a ONE-COMPONENT system — activated by water only — it is not a two-component polymer-modified membrane and must not be treated as equivalent to ARDEX WPM 002, Mapelastic Smart, or K11 Flex",
      "Confirm AS 4858 wet area class rating with Sika Australia — the product is classified to EN 14891 and AS 4654.1 but confirm AS 4858 status before specifying for under-tile wet area applications",
      "Not a direct substitute for Sika Davco K11 Flex — different product category, different mixing method, different primary application scope",
      "Confirm crack-bridging rating and elongation from current TDS before specifying for substrates with expected movement",
      "Confirm tile-over time and tile adhesive compatibility with Sika Australia before specifying for under-tile use",
      "Confirm current product name, formulation, and TDS with Sika Australia before specifying — Sika product ranges are subject to periodic revision",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Two-component", label: "Two-component" },
  { id: "Microfibre-reinforced", label: "Microfibre reinforced" },
  { id: "High-flexibility", label: "High flexibility" },
  { id: "Thixotropic", label: "Thixotropic" },
  { id: "Acrylic-modified", label: "Acrylic-modified" },
  { id: "Class-III", label: "Class III (AS 4858)" },
  { id: "Class-II", label: "Class II (AS 4858)" },
  { id: "Under-tile", label: "Under-tile / screed" },
  { id: "Balcony-terrace", label: "Balcony / terrace" },
  { id: "Internal-external", label: "Internal and external" },
  { id: "Pools-tanks", label: "Pools / tanks" },
  { id: "Basements", label: "Basements / below-grade" },
  { id: "Retaining-walls", label: "Retaining walls" },
  { id: "Damp-substrate", label: "Damp substrate OK" },
  { id: "UV-resistant", label: "UV resistant" },
  { id: "Potable-water", label: "Potable water approved" },
  { id: "Positive-negative-pressure", label: "Positive/negative pressure" },
  { id: "AS-4858", label: "AS 4858" },
  { id: "AS-4654", label: "AS 4654" },
  { id: "One-component", label: "One-component" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  asClass: string;
  elongation: string;
  crackBridging: string;
  reinforcement: string;
  tileOver: string;
  dampSubstrate: string;
  primaryUse: string;
}[] = [
  {
    product: "WPM 002",
    brand: "ARDEX",
    asClass: "Class III (AS 4858)",
    elongation: "Confirm with TDS",
    crackBridging: "Microfibre integral — confirm at junctions",
    reinforcement: "Tape/fabric at junctions — no mat at field",
    tileOver: "16–24 hrs (4 hrs non-critical)",
    dampSubstrate: "No — damp-dry only",
    primaryUse: "Under-tile balcony, terrace, wet area — internal and external",
  },
  {
    product: "Mapelastic Smart",
    brand: "Mapei",
    asClass: "Class II (AS/NZS 4858)",
    elongation: "170%",
    crackBridging: ">2mm at 2mm DFT",
    reinforcement: "Mapetex Sel or Mapenet 150 at all junctions",
    tileOver: "5 days minimum",
    dampSubstrate: "No — sound dry surface",
    primaryUse: "Under-tile balcony, terrace, bathroom, pool",
  },
  {
    product: "Mapelastic Foundation",
    brand: "Mapei",
    asClass: "Confirm AS status with Mapei",
    elongation: "Confirm with TDS",
    crackBridging: "Confirm with TDS",
    reinforcement: "Confirm with TDS",
    tileOver: "Confirm with TDS",
    dampSubstrate: "Yes — formulated for damp concrete",
    primaryUse: "Positive/negative pressure — retaining walls, pools, below-grade",
  },
  {
    product: "K11 Flex",
    brand: "Davco / Laticrete",
    asClass: "Confirm with TDS",
    elongation: "Confirm with TDS",
    crackBridging: "Confirm with TDS",
    reinforcement: "Confirm at junctions with Davco",
    tileOver: "Confirm with TDS",
    dampSubstrate: "Yes — designed for dampened substrates",
    primaryUse: "Under-tile balcony, terrace, wet area, basement — internal and external",
  },
  {
    product: "Nitoproof 410",
    brand: "Fosroc / Parchem",
    asClass: "Class III (wet areas)",
    elongation: "Confirm with TDS",
    crackBridging: "Confirm with TDS",
    reinforcement: "Confirm with Parchem",
    tileOver: "Fast drying — confirm with TDS",
    dampSubstrate: "No — sound dry substrate",
    primaryUse: "Under-tile balcony, terrace, podium — exposed trafficable with Nitoproof Top Coat UV overcoat",
  },
  {
    product: "Sikalastic-1K",
    brand: "Sika",
    asClass: "Confirm AS 4858 with Sika",
    elongation: "Confirm with TDS",
    crackBridging: "Crack-bridging — confirm rating",
    reinforcement: "Integral fibre reinforcement",
    tileOver: "Confirm with TDS",
    dampSubstrate: "No — confirm with Sika",
    primaryUse: "Concrete protection and waterproofing — tanks, basins, external above-ground concrete — not a two-component system",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Standard under-tile waterproofing on stable concrete balcony and terrace substrates where substrate movement is limited and no active cracks are present",
    "Internal wet areas (bathrooms, showers, laundries) where direct compatibility with cement-based tile adhesives is required without a bond breaker",
    "Substrates that are damp or cannot be fully dried before application — some cementitious systems can be applied to damp (not wet) substrates",
    "Projects where compatibility with cementitious screeds, renders, and tile adhesive systems without an intermediate bond breaker is important",
    "Commercial and strata applications where a familiar, widely specified system with national trade supply is required",
  ],
  selectionCriteria: [
    "AS 4858 class rating: Class II or Class III — confirm before specifying — do not assume all cementitious membranes are Class III",
    "AS 4654.1 compliance for external above-ground use — confirm with TDS for each product",
    "Elongation at break — expressed as a percentage — confirm against project specification and substrate movement expectations",
    "Reinforcement requirement — some systems require fibreglass mesh or non-woven fabric at all coves, junctions, drain surrounds, and penetrations",
    "Primer requirement — some systems require a primer on porous or absorbent substrates — others can be applied to dampened substrates",
    "Minimum DFT — typically 1.0–2.0mm — verify minimum two-coat application achieves specified DFT before tile or screed is applied",
    "Tile-over time — ranges from 16 hours to 5 days depending on product — confirm against programme requirements before specifying",
    "Pot life after mixing — typically 30–60 minutes — plan batch sizes to avoid waste in hot weather",
  ],
  limitations: [
    "Where significant substrate movement, active cracking, or high elongation is required — specify a polyurethane Class III membrane instead",
    "Where the membrane will be left exposed to UV, foot traffic, or weather without a tile or screed covering — cementitious membranes are protected systems",
    "Where the project specification or engineer requires a specific AS 4858 Class III elongation performance that exceeds the product's confirmed rating",
    "Where the substrate is not sound, stable concrete or masonry — unsound substrates must be repaired before membrane application",
    "Do not substitute a cementitious membrane for a polyurethane system without confirming that the AS 4858 class rating meets the project requirement",
    "Cementitious membranes generally have lower elongation than pure polyurethane systems and are not appropriate where active crack bridging is the primary design requirement",
  ],
  standardsNotes: [
    "AS 4858 — Wet Area Membranes — product classification standard — confirm Class II or Class III for each product before specifying",
    "AS 4654.1 — Waterproofing Membranes for External Above-Ground Use — confirm compliance for balcony and terrace applications",
    "AS/NZS 4020 — Testing of Products for Use in Contact with Drinking Water — relevant for pool and potable water applications",
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings — membrane class must meet project specification",
    "Manufacturer installation guides and ITP hold points — primer application, first coat, reinforcing tape embedding, second coat, and flood test are all critical hold points",
  ],
  suitableDefects: [
    "Balcony waterproofing failure — standard under-tile remediation on stable concrete substrates where substrate movement is not the primary concern",
    "Wet area waterproofing failure — bathrooms, showers, laundries — internal under-tile membrane replacement in Class 2 strata buildings",
    "Below-grade moisture intrusion — basement and retaining wall applications where positive or negative pressure cementitious systems are appropriate",
    "Pool and tank waterproofing — where a cementitious system approved for potable water contact is required",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — minimum 28 days cure — must be sound, clean, and free of laitance, oils, and release agents",
    "Masonry — concrete block and brick — must be sound, stable, and free from efflorescence and loose material",
    "Render — existing render coats must be sound, well adhered, and free from cracks before membrane application",
    "Fibre cement compressed sheet — confirm primer requirement and substrate moisture content with manufacturer before application",
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
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
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

export function CementitiousIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are cementitious flexible waterproofing membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Cementitious flexible waterproofing membranes are two-component, polymer-modified, cement-based systems applied by brush, roller, or trowel to form a flexible, bonded waterproof layer. They consist of a powder component (cement-based) and a liquid component (acrylic or polymer dispersion) that are mixed on site immediately before application. Once cured, the membrane forms a hard, flexible, cement-bonded film that is directly compatible with cementitious tile adhesives, screed, and grout systems without requiring a bond breaker or primer in most applications.
        </p>
        {expanded && (
          <>
            <p>
              This category is distinct from polyurethane and hybrid liquid membranes. Cementitious flexible membranes are cement-based — not polyurethane. They generally have lower elongation than pure polyurethane systems and are not appropriate as a substitute for a polyurethane or AS 4858 Class III membrane where high elongation, active crack bridging, or significant substrate movement is the primary concern. However, for standard under-tile balcony waterproofing on stable concrete substrates, two-part cementitious systems are a well-established and widely used specification in Australian Class 2 strata remediation.
            </p>
            <p>
              Product selection must consider the AS 4858 class rating, elongation performance, whether reinforcing fabric or mesh is required at junctions, primer requirements, minimum DFT, tile-over time, compatibility with the tile adhesive system above, and whether the membrane is confirmed for external above-ground use under AS 4654 in addition to AS 4858.
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

export function CementitiousProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">6 products — 5 brands — two-component cementitious flexible membranes only — scroll to view all</p>
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
                    {product.techChips.filter((c) => c.label.toLowerCase().includes("warranty")).map((chip) => (
                      <span key={chip.label} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips.filter((c) => !c.label.toLowerCase().includes("warranty"))}
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
              Side-by-side comparison of two-component cementitious flexible membrane systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AS class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Elongation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Crack-bridging</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Reinforcement mat required</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tile-over time</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Damp substrate OK</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.asClass}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.elongation}</td>
                  <td className="px-4 py-3 text-slate-600">{row.crackBridging}</td>
                  <td className="px-4 py-3 text-slate-600">{row.reinforcement}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.tileOver}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.dampSubstrate.startsWith("Yes") ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                        <CheckCircle size={11} /> {row.dampSubstrate}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle size={11} /> {row.dampSubstrate}
                      </span>
                    )}
                  </td>
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
