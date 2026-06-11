"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Heat-welded"
  | "Self-adhered"
  | "Cold-applied"
  | "No-open-flame"
  | "Polypropylene-lined"
  | "Bituminous"
  | "Non-bituminous"
  | "Butyl-rubber"
  | "Under-tile"
  | "Multi-layer"
  | "Balcony-terrace"
  | "Podium-slab"
  | "Primer-required"
  | "AS-4654"
  | "AS-4858"
  | "AS-2904"
  | "Fabric-face"
  | "HDPE-face"
  | "Tile-direct";

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
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-1000/",
    accentColor: "#f97316",
    name: "ARDEX WPM 1000",
    descriptionLine: "Polypropylene-lined synthetic rubber sheet — cold-laid with WA 98 adhesive — heat-welded seams — under-tile and under-screed balcony and wet area use",
    productType: "Polypropylene-lined synthetic rubber — heat-welded sheet membrane",
    filterTags: ["Heat-welded", "Cold-applied", "No-open-flame", "Polypropylene-lined", "Under-tile", "Balcony-terrace", "Primer-required", "AS-4654", "AS-4858", "AS-2904", "Fabric-face", "Tile-direct"],
    techChips: [
      { label: "Heat-welded seams", cls: "bg-orange-100 text-orange-800" },
      { label: "Cold-laid", cls: "bg-slate-100 text-slate-700" },
      { label: "No open flame", cls: "bg-green-50 text-green-700" },
      { label: "Polypropylene-lined", cls: "bg-slate-100 text-slate-700" },
      { label: "Tile direct — 60 min", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX WPM 1000 (WeldTec) is ARDEX's heat-welded polypropylene-lined sheet membrane for under-tile and under-screed waterproofing on balconies, terraces, and wet areas. It is cold-laid — the sheet is unrolled, positioned, and adhered to the substrate using ARDEX WA 98 contact adhesive — but the laps and seams are heat-welded after installation using a Leister Triac S hot-air gun and pressure roller. There is no open flame at any point. This makes WPM 1000 suitable for occupied strata buildings where hot-works permits are difficult to obtain, and for locations near combustible materials or PVC services where torch-on application is not appropriate. The membrane is a synthetic rubber (butynol) sheet with polypropylene filaments welded onto both sides. The polypropylene facing provides a keyed surface that accepts ARDEX tile adhesives directly over the membrane after only 60 minutes — one of the fastest tile-over times of any sheet membrane system. Consistent 1.2mm thickness across the full roll — no variation due to application technique. The membrane must not be left exposed to UV longer than 30 days — it is a protected system requiring tiles, screed, or pavers above. ARDEX WA 98 contact adhesive is mandatory for full-bond installation. Laps are minimum 40mm side and end. All laps must be welded and probed for continuity — unwelded laps are the primary failure mode.",
    technicalProperties: [
      "Synthetic rubber (butynol) polypropylene-lined sheet — consistent 1.2mm nominal thickness — 1.4m × 20m rolls (35 kg per roll)",
      "Cold-laid with ARDEX WA 98 adhesive — laps heat-welded with Leister hot-air gun — no open flame at any stage",
      "Polypropylene filament facing both sides — accepts ARDEX tile adhesives directly over membrane — tile-over after 60 minutes",
      "Flood test can commence 60 minutes after installation completion",
      "Excellent flexibility and elongation — no fillet or bond breaker required at coves and corners",
      "Suitable substrates: concrete, fibre cement compressed sheet, plywood and timber (max 20% MC), wet-wall linings (VillaBoard, Aquachek, Scyon Secura)",
      "Complies with AS 4654, AS 4858, and AS 2904 — compatible with most ARDEX tile adhesive systems",
    ],
    limitations: [
      "Not to be left exposed to UV for more than 30 days — must be covered with tiles, screed, pavers, or decking — not an exposed surface membrane",
      "ARDEX WA 98 contact adhesive mandatory — do not apply WPM 1000 without the correct adhesive on applicable substrates",
      "Laps and seams must be heat-welded with a Leister hot-air gun and pressure-rolled — unwelded laps are the primary failure mode — all seams must be probed for continuity after welding",
      "Minimum 40mm lap on both side and end laps — all laps that will be tiled must be welded before adhesive is applied — you cannot weld glued laps",
      "Transition substrate gaps and cove/fillet details must be filled appropriately before membrane installation",
      "Confirm current product specification and compatible accessories with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "The Waterproofing Shop", url: "https://thewaterproofingshop.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-117/",
    accentColor: "#f97316",
    name: "ARDEX WPM 117",
    descriptionLine: "Self-adhesive SBS bituminous sheet — peel and stick — no open flame — base layer for multi-layer systems or standalone cold-applied waterproofing",
    productType: "SBS self-adhesive bituminous sheet — cold-applied peel and stick",
    filterTags: ["Self-adhered", "Cold-applied", "No-open-flame", "Bituminous", "Multi-layer", "Balcony-terrace", "Primer-required", "AS-4654"],
    techChips: [
      { label: "Self-adhered", cls: "bg-orange-100 text-orange-800" },
      { label: "Peel and stick", cls: "bg-slate-100 text-slate-700" },
      { label: "No open flame", cls: "bg-green-50 text-green-700" },
      { label: "SBS bituminous", cls: "bg-slate-100 text-slate-700" },
      { label: "Multi-layer base layer", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX WPM 117 (Shelterstick) is a self-adhesive bituminous sheet membrane that is cold-applied without any heat or flame. It is the only product in the ARDEX modified bitumen range that requires no torch or hot-air gun at any stage — the membrane is unrolled, aligned, and pressed into place after removing the silicone release film, using a pressure roller to ensure full contact at laps, corners, and edges. This makes WPM 117 appropriate wherever torch-on application must be avoided: on heat-sensitive substrates including timber, insulation panels, PVC, and existing painted surfaces, and in areas where open flame is prohibited. WPM 117 is a 2mm SBS-modified bituminous membrane — fibreglass reinforced — with a factory-applied SBS self-adhesive layer on the underside. Complies with AS 4654.1. Roll size 1m × 15m. WPM 117 serves two distinct roles: as a standalone cold-applied base layer for balcony and terrace waterproofing on heat-sensitive substrates, and as a self-adhesive underlay base sheet in multi-layer systems — the top surface can be activated by heat from a subsequently torched-on cap sheet such as WPM 185, allowing a torch-on cap to be applied over WPM 117 without the torch flame contacting the sensitive substrate below. Self-seals on contact if accidentally punctured by nails or fasteners during subsequent installation work.",
    technicalProperties: [
      "2mm SBS-modified bituminous membrane — fibreglass reinforced — factory SBS self-adhesive lower surface — complies with AS 4654.1",
      "Cold-applied peel-and-stick — no open flame or hot-air gun required at any stage",
      "Self-seals on contact if punctured by nails or fasteners during subsequent installation work",
      "Top surface can be activated by a subsequently applied torch-on cap sheet — allows use as a heat-sensitive base in multi-layer systems",
      "Highly resistant to acids, alkalis, and other pollutants",
      "Roll size: 1m × 15m — minimum side lap 100mm — minimum end lap 150mm — complies with AS 4654.1",
      "Suitable substrates: concrete, render, timber, insulation panels, PVC, existing painted or coated surfaces, existing bitumen membranes",
    ],
    limitations: [
      "Must be installed from lowest to highest point in direction of slope — incorrect direction creates water trapping at laps",
      "Primer mandatory on all substrates — allow primer to become tack-free before applying membrane — do not apply to wet or uncured substrates",
      "Not a UV-stable exposed membrane — must be covered with a cap sheet, tiles, screed, or protection layer — store rolls protected from sunlight",
      "Pressure roller mandatory at all laps, corners, connections, and edges — hand pressure alone is insufficient to achieve full bond at laps",
      "When used as a base layer below a torch-on cap sheet, the torch flame must not overheat the WPM 117 — careful flame management required",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Komerco", url: "https://komerco.com.au" },
    ],
  },
  {
    fullLabel: "Gripset Industries",
    brandUrl: "https://www.gripset.com",
    tdsUrl: "https://gripset.com/products/gripset-brw-pfn/",
    accentColor: "#f59e0b",
    name: "Gripset BRW-PFN",
    descriptionLine: "Self-adhesive butyl rubber sheet — polypropylene fabric face — cold-applied peel and stick — instant seal — tile direct — balconies and wet areas",
    productType: "Butyl rubber self-adhesive sheet — polypropylene fabric face — cold-applied",
    filterTags: ["Self-adhered", "Cold-applied", "No-open-flame", "Non-bituminous", "Butyl-rubber", "Under-tile", "Balcony-terrace", "Primer-required", "AS-4654", "AS-4858", "Fabric-face", "Tile-direct"],
    techChips: [
      { label: "Self-adhered", cls: "bg-amber-100 text-amber-800" },
      { label: "Butyl rubber", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-bituminous", cls: "bg-green-50 text-green-700" },
      { label: "Polypropylene fabric face", cls: "bg-slate-100 text-slate-700" },
      { label: "Tile direct — immediate", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Gripset BRW-PFN is a self-adhesive butyl rubber sheet membrane with a polypropylene fabric facing. It is cold-applied — peel the release film and press the membrane onto the primed substrate — with no heat, torch, or hot-air welding required at any stage. Unlike the bituminous self-adhesive membranes in this category (ARDEX WPM 117), BRW-PFN is a non-bituminous butyl rubber system, which means no bleeding or yellowing at terminations above ground or at wall interfaces, and no bitumen odour during or after installation. The polypropylene fabric face supports the direct application of tile adhesives, screeds, renders, and approved decorative finishes directly over the membrane with no waiting period for cure — making BRW-PFN well suited to programme-critical strata remediation projects where turnaround time between waterproofing completion and tiling commencement is a constraint. BRW-PFN is 1mm thick with greater than 60% elongation — Class II anti-fracture performance. It works as part of a hybrid system alongside Gripset liquid membranes: liquid membrane is applied at junctions, corners, drain surrounds, and penetrations, and the BRW-PFN sheet covers the field areas. Overlaps at minimum 50mm — pressed with a hand roller. Complies with AS 4858 and AS 4654.1.",
    technicalProperties: [
      "Self-adhesive butyl rubber — polypropylene fabric face — 1mm consistent thickness",
      "Non-bituminous — no bleeding, yellowing, or bitumen odour at terminations or wall interfaces",
      "Cold-applied peel-and-stick — no torch, heat gun, or flame at any stage — instant waterproof seal on contact",
      "No cure time before tiling or screed application — polypropylene fabric face accepts tile adhesives, screeds, and mortars directly",
      "Greater than 60% elongation — Class II anti-fracture performance — accommodates substrate movement and vibration",
      "Wide application temperature range: −30°C to 80°C — adhesion unaffected by cold or hot installation conditions",
      "Complies with AS 4858 and AS 4654.1 — suitable substrates: concrete, render, masonry, fibre cement, plywood",
    ],
    limitations: [
      "1mm thickness — thinner than modified bitumen sheet systems — confirm substrate is smooth, sound, and free from sharp edges before application",
      "Primer mandatory — confirm correct Gripset primer for the specific substrate with Gripset technical before application",
      "Minimum 50mm overlap on all laps — must be pressed firmly with a hand roller — insufficient lap pressure is the primary bond failure mode",
      "Not a UV-stable exposed membrane — must be covered with tiles, screed, pavers, or finish — do not leave exposed",
      "Liquid membrane detailing required at all junctions, corners, drain surrounds, coves, and penetrations — BRW-PFN is a field-area sheet membrane, not a detailing product",
      "Confirm current product specification with Gripset Industries before specifying",
    ],
    procurementSources: [
      { name: "Gripset Industries — trade supply", url: "https://www.gripset.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "The WaterStop Shop", url: "https://waterstop.com.au" },
    ],
  },
  {
    fullLabel: "Gripset Industries",
    brandUrl: "https://www.gripset.com",
    tdsUrl: "https://gripset.com/products/gripset-brw-hd/",
    accentColor: "#f59e0b",
    name: "Gripset BRW-HD",
    descriptionLine: "Self-adhesive butyl rubber sheet — HDPE film face — cold-applied — high puncture resistance — multi-layer and podium slab applications",
    productType: "Butyl rubber self-adhesive sheet — HDPE film face — cold-applied — heavy duty",
    filterTags: ["Self-adhered", "Cold-applied", "No-open-flame", "Non-bituminous", "Butyl-rubber", "Multi-layer", "Balcony-terrace", "Podium-slab", "Primer-required", "AS-4654", "AS-4858", "HDPE-face"],
    techChips: [
      { label: "Self-adhered", cls: "bg-amber-100 text-amber-800" },
      { label: "Butyl rubber", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-bituminous", cls: "bg-green-50 text-green-700" },
      { label: "HDPE film face", cls: "bg-slate-100 text-slate-700" },
      { label: "High puncture resistance", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Gripset BRW-HD is the heavy-duty version of the Gripset BRW self-adhesive butyl rubber range, distinguished from BRW-PFN by its HDPE (high-density polyethylene) film face rather than a polypropylene fabric face. The HDPE facing delivers significantly higher puncture resistance and impact resistance than the fabric-faced BRW-PFN, making BRW-HD the appropriate choice where the membrane will be subjected to construction traffic, aggregate or gravel contact, backfill loads, or use as the primary sheet in a multi-layer waterproofing system on podium slabs, subterranean walls, or heavily loaded balcony structures. Like BRW-PFN, it is a non-bituminous butyl rubber system — cold-applied, peel-and-stick, no torch or heat welding, instant waterproof seal. Suitable application temperature range is −30°C to 80°C. Because it is non-bituminous, there is no risk of bitumen bleed or yellowing at wall terminations. BRW-HD is designed for subterranean and multi-layer applications — it pairs with BRW-PFN in systems where the HD grade provides the waterproof and puncture-resistant primary layer and the PFN grade provides the fabric-faced tile-ready surface layer above. The HDPE face does not accept tile adhesives or renders directly — a BRW-PFN layer, screed, protection board, or decking system must be placed above BRW-HD before applying finishes.",
    technicalProperties: [
      "Self-adhesive butyl rubber — HDPE film face — cold-applied peel-and-stick — no torch or heat gun required",
      "Non-bituminous — no bitumen bleed, yellowing, or odour at terminations or above-ground interfaces",
      "HDPE face — high puncture and impact resistance — suited to construction traffic, gravel, aggregate, or backfill contact",
      "Instant waterproof seal on contact — no cure delay before subsequent layers are applied",
      "High bond adhesion on porous and non-porous substrates — retains adhesion across wide temperature range (−30°C to 80°C)",
      "Complies with AS 4858 and AS 4654.1 — excellent resistance to vibration, movement, and flexing",
      "Compatible with BRW-PFN as part of a two-layer Gripset BRW system for podium and high-load balcony applications",
    ],
    limitations: [
      "HDPE face does not accept tile adhesives or renders directly — a BRW-PFN layer, protection board, screed, or paver system must be placed above before finishes are applied",
      "Not a direct-to-tile membrane — do not specify as a substitute for BRW-PFN where tiles will be laid directly over the membrane",
      "Primer mandatory — confirm correct Gripset primer for the specific substrate before application",
      "Minimum 50mm overlap on all laps — pressed firmly with a hand roller — insufficient lap pressure is the primary bond failure mode",
      "Not a UV-stable exposed membrane — must be covered with a protection layer or finish system — do not leave exposed",
      "Liquid membrane detailing required at all junctions, drain surrounds, coves, and penetrations",
      "Confirm current product specification with Gripset Industries before specifying",
    ],
    procurementSources: [
      { name: "Gripset Industries — trade supply", url: "https://www.gripset.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "The WaterStop Shop", url: "https://waterstop.com.au" },
      { name: "Adheseal", url: "https://adheseal.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX WPM 116 Fibre-Backed Base Sheet",
    descriptionLine: "ARDEX fibre-backed cold-applied sheet membrane base sheet for balcony and podium waterproofing",
    productType: "Fibre-backed cold-applied sheet membrane base sheet",
    filterTags: ["Cold-applied", "Fabric-face", "Balcony-terrace", "Podium-slab", "Primer-required", "Multi-layer"],
    techChips: [
      { label: "Cold-applied sheet", cls: "bg-orange-100 text-orange-800" },
      { label: "Fibre-backed", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX system", cls: "bg-slate-100 text-slate-700" },
      { label: "Base sheet", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX WPM 116 is a fibre-backed cold-applied sheet membrane base sheet for use in ARDEX balcony and podium waterproofing systems. As the base sheet in a multi-layer ARDEX sheet membrane system, WPM 116 is bonded to the primed substrate using a compatible ARDEX adhesive or primer, with overlapping sheet laps sealed and pressed. Seams are sealed with ARDEX-compatible tape. The fibre-backing provides dimensional stability during installation. Confirm current product specification, primer, adhesive, and full system requirements with ARDEX Australia before specifying.",
    technicalProperties: [
      "Fibre-backed cold-applied sheet membrane base sheet — for ARDEX multi-layer sheet membrane systems",
      "Cold-applied — no heat welding or open flame required",
      "Fibre backing provides dimensional stability during installation",
      "For use in balcony, terrace and podium slab waterproofing as part of the ARDEX system",
    ],
    limitations: [
      "Primer mandatory — confirm correct ARDEX primer for the substrate with ARDEX technical",
      "Part of a multi-layer ARDEX system — confirm full system specification with ARDEX Australia before specifying",
      "Not suitable as a standalone exposed membrane — requires protection layer or finish system above",
      "Confirm current product name and specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX Butynol Sheet Applied Membrane",
    descriptionLine: "ARDEX butyl rubber cold-applied sheet membrane for balcony and podium waterproofing",
    productType: "Butyl rubber cold-applied sheet membrane",
    filterTags: ["Cold-applied", "Butyl-rubber", "Non-bituminous", "Balcony-terrace", "Podium-slab", "Primer-required"],
    techChips: [
      { label: "Butyl rubber sheet", cls: "bg-orange-100 text-orange-800" },
      { label: "Cold-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-bituminous", cls: "bg-green-50 text-green-700" },
      { label: "ARDEX system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "ARDEX Butynol is a butyl rubber cold-applied sheet membrane for balcony, terrace and podium slab waterproofing. Butyl rubber (IIR) provides excellent weather resistance, ozone resistance, and chemical resistance with good elongation and flexibility over a wide temperature range. Cold-applied — no open flame or heat welding required — suitable for occupied strata building remediation where hot-work restrictions apply. Apply to primed substrate and seal all laps and terminations with ARDEX-compatible tape or sealant. Confirm current product specification, primer, lap sealing method, and full system requirements with ARDEX Australia before specifying.",
    technicalProperties: [
      "Butyl rubber (IIR) sheet membrane — excellent weather, ozone and chemical resistance",
      "Cold-applied — no open flame or heat welding — suitable where hot-work restrictions apply",
      "Non-bituminous — no bitumen bleed or yellowing at terminations",
      "Good elongation and flexibility across a wide temperature range",
      "Primer mandatory — confirm ARDEX-compatible primer before application",
    ],
    limitations: [
      "Primer mandatory — confirm correct ARDEX primer for the substrate with ARDEX technical",
      "Not suitable for direct UV-exposed applications without a protection or finish system above — confirm exposure requirements with ARDEX",
      "Lap sealing mandatory — all sheet laps must be sealed with ARDEX-compatible tape or sealant",
      "Confirm current product name and system specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Heat-welded", label: "Heat-welded seams" },
  { id: "Self-adhered", label: "Self-adhered" },
  { id: "Cold-applied", label: "Cold-applied" },
  { id: "No-open-flame", label: "No open flame" },
  { id: "Tile-direct", label: "Tile direct" },
  { id: "Polypropylene-lined", label: "Polypropylene-lined" },
  { id: "Bituminous", label: "Bituminous" },
  { id: "Non-bituminous", label: "Non-bituminous" },
  { id: "Butyl-rubber", label: "Butyl rubber" },
  { id: "Fabric-face", label: "Fabric face" },
  { id: "HDPE-face", label: "HDPE face" },
  { id: "Under-tile", label: "Under-tile / screed" },
  { id: "Multi-layer", label: "Multi-layer system" },
  { id: "Balcony-terrace", label: "Balcony / terrace" },
  { id: "Podium-slab", label: "Podium slab" },
  { id: "Primer-required", label: "Primer required" },
  { id: "AS-4654", label: "AS 4654" },
  { id: "AS-4858", label: "AS 4858" },
  { id: "AS-2904", label: "AS 2904" },
];

const SYSTEM_COMPARISON: {
  systemType: string;
  product: string;
  brand: string;
  applicationMethod: string;
  seamMethod: string;
  faceSurface: string;
  tileDirect: string;
  uvStable: string;
  primaryUse: string;
}[] = [
  {
    systemType: "Polypropylene-lined synthetic rubber — heat-welded seams",
    product: "WPM 1000",
    brand: "ARDEX",
    applicationMethod: "Cold-laid + WA 98 adhesive",
    seamMethod: "Leister hot-air gun weld",
    faceSurface: "Polypropylene fleece both sides",
    tileDirect: "Yes — 60 min",
    uvStable: "No — protected only",
    primaryUse: "Under-tile / screed — balcony and wet area",
  },
  {
    systemType: "SBS self-adhesive bitumen — peel and stick",
    product: "WPM 117",
    brand: "ARDEX",
    applicationMethod: "Cold-applied peel and stick",
    seamMethod: "Pressure roller — no welding",
    faceSurface: "SBS modified — fibreglass reinforced",
    tileDirect: "No — cap sheet or cover required",
    uvStable: "No — protected only",
    primaryUse: "Base layer in multi-layer system / heat-sensitive substrates",
  },
  {
    systemType: "Butyl rubber self-adhesive — fabric face — peel and stick",
    product: "BRW-PFN",
    brand: "Gripset",
    applicationMethod: "Cold-applied peel and stick",
    seamMethod: "Pressure roller — no welding",
    faceSurface: "Polypropylene fabric",
    tileDirect: "Yes — immediate",
    uvStable: "No — protected only",
    primaryUse: "Under-tile / screed — bathrooms and balconies",
  },
  {
    systemType: "Butyl rubber self-adhesive — HDPE face — peel and stick",
    product: "BRW-HD",
    brand: "Gripset",
    applicationMethod: "Cold-applied peel and stick",
    seamMethod: "Pressure roller — no welding",
    faceSurface: "HDPE film",
    tileDirect: "No — cover layer required",
    uvStable: "No — protected only",
    primaryUse: "Multi-layer / podium / subterranean / high-load balconies",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Occupied strata building balcony remediation — where open flame is prohibited and hot-works permits cannot be obtained",
    "Timber-frame balcony waterproofing — where substrate combustibility or heat sensitivity rules out torch-on application",
    "Where consistent factory-thickness membrane is required — 1.2–2.0mm DFT without relying on operator application technique",
    "Programme-critical strata remediation — cold-applied self-adhered systems allow tiling or screeding within 60 minutes with no cure time",
    "Substrates containing heat-sensitive materials — PVC pipes, insulation boards, existing painted surfaces, timber",
    "Remedial overlay waterproofing over sound existing substrates where adhesion tests confirm suitability and cold-applied system is appropriate",
  ],
  selectionCriteria: [
    "Substrate type: concrete, fibre cement, plywood/timber, wet-wall linings — confirm each product's substrate suitability before specifying",
    "Primer: most systems require a compatible primer — type varies by substrate and product — do not skip primer without confirming with manufacturer TDS",
    "Application temperature: cold-applied adhesive systems have minimum temperature requirements — confirm with TDS before scheduling in cold weather",
    "Lap method: heat-welded laps (Leister gun) vs pressure-rolled laps (self-adhered) — different skill requirements and verification methods",
    "UV exposure: most products in this category are protected/covered systems — confirm UV tolerance during construction before topping is applied",
    "Finish system: under tile, under screed, under pavers, or under pedestal — confirm compatibility with adhesive or bedding material above the membrane",
  ],
  limitations: [
    "Heat-welded systems require a qualified Leister gun operator — poorly welded laps are the primary failure mode in WPM 1000 systems",
    "Cold-applied self-adhered systems require a clean, primed, dry substrate — moisture and contamination cause adhesion failure",
    "Most products in this category are not UV-stable — protect from UV during construction and do not leave exposed after installation",
    "Application temperature limits apply — most cold-applied adhesives perform poorly below 5°C — confirm before scheduling in cold weather",
    "Laps must be properly roller-pressed or heat-welded — hand pressure alone is insufficient — pressure roller is mandatory for self-adhered laps",
    "Not substitutes for liquid-applied polyurethane systems in exposed, trafficable, or high-movement balcony applications",
  ],
  standardsNotes: [
    "AS 4654 — Waterproofing of Wet Areas Within Residential Buildings — product compliance standard for wet areas including balconies",
    "AS 4858 — Wet Area Membranes — classification standard for waterproofing membranes used in internal and external wet areas",
    "AS 2904 — Damp-proof Courses and Flashings — relevant for some installation contexts, referenced by ARDEX WPM 1000",
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings",
    "Manufacturer installation guides and ITP hold points — primer inspection, membrane installation, lap weld probe, and flood test are critical quality hold points",
  ],
  suitableDefects: [
    "Balcony waterproofing failure — where existing membrane has failed and project conditions prohibit torch-on application",
    "Wet area waterproofing failure — bathrooms, laundries, and ensuites requiring under-tile or under-screed membrane replacement",
    "Timber-frame balcony waterproofing — where substrate combustibility or heat sensitivity rules out torch-on or liquid systems with prolonged cure",
    "Remedial overlay waterproofing — over sound existing substrates where adhesion testing confirms suitability and a cold-applied system is appropriate",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — must be primed with manufacturer-approved primer — surface must be dry, clean, and free of laitance",
    "Fibre cement sheet (compressed) — confirm primer type with manufacturer — substrate moisture content must be confirmed",
    "Plywood and timber — maximum moisture content as specified by manufacturer (typically 18–20%) — confirm with product TDS",
    "Wet-wall linings (VillaBoard, Aquachek, Scyon Secura) — for internal wet area applications — confirm fix, gap detailing, and primer requirements",
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

export function ColdAppliedIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are heat-welded and cold-applied self-adhered sheet membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          This category covers two related but distinct types of sheet-applied waterproofing membrane used in balcony, terrace, and wet area remediation:
        </p>
        {expanded && (
          <>
            <p>
              <strong className="font-bold text-sky-950">Heat-welded sheet membranes</strong> — factory-manufactured sheets that are cold-laid (unrolled without heat or flame) but have their laps and seams welded using a hot-air gun or heat-welding machine after installation. No open flame is required. Seams are mechanically fused rather than pressure-bonded. The result is a consistent-thickness membrane with factory-quality seam integrity across the field.
            </p>
            <p>
              <strong className="font-bold text-sky-950">Cold-applied self-adhered membranes</strong> — peel-and-stick sheet membranes with a factory-applied pressure-sensitive adhesive backing. No heat, torch, or hot-air gun is required at any stage of installation. The membrane bonds to the primed substrate on contact. Laps are pressure-bonded with a roller. Instant waterproof seal — no cure time before tiling or screed in most systems.
            </p>
            <p>
              Both types eliminate the open-flame fire risk of torch-on bitumen systems, making them suitable for occupied strata buildings, combustible substrates, timber-framed balconies, areas near insulation or PVC services, and any location where a hot-works permit cannot be obtained or where building management prohibits naked flame.
            </p>
            <p>
              Product selection must consider substrate type, primer compatibility, minimum application temperature, lap seam method, penetration detailing, UV exposure, whether the system is under-tile or exposed, and compatibility with the finish system above the membrane.
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

export function ColdAppliedProductSection() {
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
              Applications, selection criteria, limitations, standards, suitable defects and substrates
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
            <p className="mt-1 text-sm text-slate-500">4 products — 3 brands — heat-welded and cold-applied self-adhered sheet membranes — scroll to view all</p>
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
              Side-by-side comparison of heat-welded and cold-applied self-adhered sheet membrane systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">
                  System type
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Application method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Seam method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Face / surface</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tile direct</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">UV stable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold text-slate-800 max-w-[220px]">
                    {row.systemType}
                  </td>
                  <td className="px-4 py-3 font-semibold text-sky-950 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.applicationMethod}</td>
                  <td className="px-4 py-3 text-slate-600">{row.seamMethod}</td>
                  <td className="px-4 py-3 text-slate-600">{row.faceSurface}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.tileDirect.startsWith("Yes") ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                        <CheckCircle size={11} /> {row.tileDirect}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle size={11} /> {row.tileDirect}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                      <XCircle size={11} /> {row.uvStable}
                    </span>
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
