"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Stainless-steel"
  | "PVC"
  | "HDPE"
  | "Tile-insert"
  | "Slot-grate"
  | "Adjustable-height"
  | "Fixed-height"
  | "Residential-balcony"
  | "Podium-terrace"
  | "Class-A"
  | "Class-B"
  | "Torch-on-compatible"
  | "Liquid-applied-compatible"
  | "Architectural-finish";

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
    fullLabel: "Schlüter-Systems Australia",
    brandUrl: "https://www.schlueter.com.au",
    tdsUrl: "https://www.schlueter.com.au/products/drains/kerdi-line",
    accentColor: "#0369a1",
    name: "Schlüter KERDI-LINE",
    descriptionLine: "Adjustable-height stainless steel linear channel drain — tile insert or slot grate — Class A or B load — compatible with liquid-applied waterproofing systems — threshold and edge drainage for tiled balconies and terraces",
    productType: "Adjustable-height linear drain — tile insert and slot grate — liquid-applied compatible",
    filterTags: ["Stainless-steel", "Tile-insert", "Slot-grate", "Adjustable-height", "Residential-balcony", "Podium-terrace", "Class-A", "Class-B", "Liquid-applied-compatible", "Architectural-finish"],
    techChips: [
      { label: "Adjustable height", cls: "bg-green-100 text-green-800" },
      { label: "Stainless steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Tile insert or slot grate", cls: "bg-sky-50 text-sky-700" },
      { label: "Class A / Class B load", cls: "bg-slate-100 text-slate-700" },
      { label: "Liquid-applied compatible", cls: "bg-green-50 text-green-700" },
      { label: "Architectural finish", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Schlüter KERDI-LINE is a stainless steel linear channel drain system designed for threshold and edge drainage on tiled balconies, terraces, and external deck areas. The system features an adjustable-height channel body that allows the drain to be positioned at the correct finished floor level after the screed has been applied, eliminating the critical height-setting tolerances required with fixed-height linear drains. This is a significant advantage on balcony remediation projects where existing screed surfaces may be irregular.

The KERDI-LINE is available with a tile insert grate — allowing a cut tile to be placed in the drain cover for an architectural finish — or with stainless steel slot grates in various formats. The system is compatible with the Schlüter KERDI bonded waterproofing membrane, and with liquid-applied polyurethane and hybrid waterproofing systems where compatibility is confirmed with the membrane manufacturer. The channel body provides a continuous flange for membrane lapping at the drain perimeter.

KERDI-LINE is available in multiple lengths from 300mm to 1200mm and in standard and extended-height configurations. Confirm the correct length, height configuration, grate format, and load class with Schlüter Australia before specifying. For threshold drainage positions between internal and external areas, confirm the correct threshold transition detail with Schlüter technical before ordering.`,
    technicalProperties: [
      "Adjustable-height stainless steel channel body — height set after screed application",
      "Tile insert or stainless slot grate — tile insert grate allows cut tile for near-invisible finish",
      "Class A and Class B load rating available — confirm against expected loading before specifying",
      "Compatible with Schlüter KERDI fabric-reinforced waterproofing system",
      "Compatible with liquid-applied PU and hybrid waterproofing systems — confirm with membrane manufacturer",
      "Available in multiple lengths 300–1200mm — confirm length against drainage design",
      "Threshold and edge drainage positions — internal/external boundary and perimeter drain applications",
      "Grade 304 stainless steel — Grade 316 available for coastal and marine-exposed locations — confirm with Schlüter",
    ],
    limitations: [
      "Primary design integration is with Schlüter KERDI membrane — confirm compatibility with other liquid-applied systems before specifying",
      "Not confirmed for direct heat-bonding with torch-on modified bitumen sheet membranes — confirm detailing with Schlüter technical if torch-on system is being specified",
      "Adjustable height range must be confirmed against screed depth and tile build-up before ordering",
      "Tile insert grate requires accurate tile cutting — confirm tile insert dimensions match tile format before ordering",
      "Confirm current product range, lengths, grate options, and load classes with Schlüter Australia before specifying",
    ],
    procurementSources: [
      { name: "Schlüter-Systems Australia", url: "https://www.schlueter.com.au" },
      { name: "Confirm trade distributor with Schlüter Australia", url: "https://www.schlueter.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "ACO Building Drainage",
    brandUrl: "https://www.acoau.com.au",
    tdsUrl: "https://www.acoau.com.au/products/building-drainage",
    accentColor: "#16a34a",
    name: "ACO Stainless Linear Channel Drain",
    descriptionLine: "Stainless steel linear channel drain — slot and perforated grate formats — fixed and adjustable-height — Class A to Class C load — suitable for residential balcony, communal terrace, and podium applications — widely stocked in Australia",
    productType: "Stainless linear channel drain — Class A to C — residential and podium applications",
    filterTags: ["Stainless-steel", "Slot-grate", "Adjustable-height", "Fixed-height", "Residential-balcony", "Podium-terrace", "Class-A", "Class-B", "Liquid-applied-compatible", "Torch-on-compatible"],
    techChips: [
      { label: "Grade 304 / 316 stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Slot and perforated grates", cls: "bg-slate-100 text-slate-700" },
      { label: "Fixed and adjustable-height", cls: "bg-green-50 text-green-700" },
      { label: "Class A / B / C load", cls: "bg-slate-100 text-slate-700" },
      { label: "Membrane-compatible flange", cls: "bg-green-100 text-green-800" },
      { label: "Widely stocked in AU", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: `ACO Building Drainage manufactures a comprehensive range of stainless steel linear channel drains for residential, commercial, and industrial applications in Australia. For balcony and terrace waterproofing remediation, ACO stainless linear channel drains are specified where a continuous linear drainage element is required at the perimeter, threshold, or edge of a tiled external deck area.

The ACO stainless channel body is available in fixed-height and adjustable-height configurations, and in multiple lengths to suit standard balcony and terrace widths. The channel flange provides a continuous bonding surface for liquid-applied membrane systems — the membrane is lapped up onto the flange and bonded per the membrane manufacturer's requirements. For torch-on sheet systems, confirm heat-bonding compatibility with ACO technical before specifying.

ACO stainless channels are available in Grade 304 for standard inland applications, and Grade 316 for coastal and marine-exposed locations. Grade 316 is strongly recommended for external balconies within 5km of the coast or in marine-affected environments. ACO is one of the most widely stocked linear drain brands in Australia, and distributor support is available through plumbing merchants and specialist waterproofing suppliers.`,
    technicalProperties: [
      "Grade 304 or 316 stainless steel — confirm grade for exposure level and coastal proximity",
      "Fixed-height and adjustable-height configurations available — confirm against screed depth and tile build-up",
      "Multiple grate formats — slot, perforated, and tile insert — confirm format against architectural specification",
      "Class A (pedestrian), Class B (light vehicle), and Class C (medium vehicle) load ratings available — confirm against project loading",
      "Membrane-compatible flange — liquid-applied and torch-on (confirm) membrane systems",
      "Available in multiple lengths — confirm length range and joining method for drains exceeding single channel length",
      "Widely stocked through Australian plumbing merchants and waterproofing suppliers",
    ],
    limitations: [
      "Confirm heat-bonding compatibility with torch-on sheet membranes before specifying — not all ACO channel configurations are confirmed for torch-on bonding",
      "Fixed-height configurations require accurate screed depth and fall to be established before installation — confirm height against tile build-up",
      "Grade 304 not recommended for coastal or marine exposure — specify Grade 316 where chloride corrosion is a risk",
      "Confirm current product range, sizes, grate formats, and load ratings with ACO Australia before specifying",
      "Confirm membrane manufacturer's required overlap dimension onto channel flange before applying",
    ],
    procurementSources: [
      { name: "ACO Australia", url: "https://www.acoau.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Infinity Drain (confirm Australian distributor)",
    brandUrl: "https://www.infinitydrain.com",
    accentColor: "#7c3aed",
    name: "Infinity Drain Tile Insert Linear Drain",
    descriptionLine: "Architectural tile insert linear channel drain — stainless steel frame and channel body — adjustable-height — liquid-applied membrane compatible — high-specification residential balcony and terrace applications — confirm Australian availability",
    productType: "Architectural tile insert linear drain — high-specification residential and terrace",
    filterTags: ["Stainless-steel", "Tile-insert", "Adjustable-height", "Residential-balcony", "Podium-terrace", "Class-A", "Liquid-applied-compatible", "Architectural-finish"],
    techChips: [
      { label: "Tile insert — architectural finish", cls: "bg-purple-100 text-purple-800" },
      { label: "Adjustable height", cls: "bg-green-100 text-green-800" },
      { label: "Stainless steel", cls: "bg-slate-100 text-slate-700" },
      { label: "Liquid-applied compatible", cls: "bg-green-50 text-green-700" },
      { label: "High-specification residential", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm AU availability", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: `Infinity Drain manufactures high-specification architectural linear drain systems used in premium residential and hospitality applications. The tile insert linear drain allows a full-length cut tile to be placed in the drain cover along the entire drain length, creating a near-invisible continuous drainage line in the tiled floor — a premium architectural finish outcome increasingly specified on high-end apartment balcony and terrace remediation in Australian Class 2 strata buildings.

The Infinity Drain system features an adjustable-height stainless steel channel body with a continuous membrane flange. The channel is compatible with liquid-applied polyurethane and hybrid waterproofing systems where the membrane is lapped and bonded onto the drain flange per the manufacturer's requirements. The tile insert tray accepts a cut tile that extends the floor tile pattern continuously through the drain location.

Infinity Drain products are primarily distributed through specialist tile showrooms and high-specification bathroom and architectural drainage suppliers. Confirm current Australian availability and distributor with Infinity Drain before specifying. The tile insert length and tile format must be confirmed against the proposed tile layout before ordering — the drain length and tile module must be coordinated to achieve a full tile insert without exposed cuts or trim tiles.`,
    technicalProperties: [
      "Tile insert tray — full-length cut tile continues floor tile pattern through drain location",
      "Adjustable-height stainless steel channel body — height adjusted to suit screed depth and tile build-up",
      "Compatible with liquid-applied PU and hybrid waterproofing systems",
      "Grade 304 stainless steel construction — confirm Grade 316 availability for coastal applications",
      "Available in multiple lengths — confirm length range with Australian distributor",
      "Class A (pedestrian) load rating — suitable for residential balcony and terrace applications",
      "Premium architectural finish — suited to high-specification residential and hospitality applications",
    ],
    limitations: [
      "Not confirmed for torch-on modified bitumen sheet membrane applications — confirm detailing requirements with distributor if torch-on system is being specified",
      "Tile insert length must be coordinated with tile module — confirm tile format and insert dimensions before ordering",
      "Confirm current Australian availability, lead time, and distributor with Infinity Drain before specifying",
      "Premium price point — confirm against project budget before specifying",
      "Class A load rating — not suitable for vehicle loading or high-traffic podium applications — confirm load class against project requirements",
    ],
    procurementSources: [
      { name: "Infinity Drain — confirm Australian distributor via infinitydrain.com", url: "https://www.infinitydrain.com" },
      { name: "Specialist tile and architectural drainage suppliers — confirm current stocking", url: "https://www.infinitydrain.com" },
    ],
  },
  {
    fullLabel: "Geberit Australia",
    brandUrl: "https://www.geberit.com.au",
    tdsUrl: "https://www.geberit.com.au/products/drainage/shower-channels",
    accentColor: "#dc2626",
    name: "Geberit CleanLine Linear Drain",
    descriptionLine: "Stainless steel linear channel drain — slot grate — fixed-height — Class A pedestrian load — liquid-applied membrane compatible — available through Geberit Australian plumbing merchant network — standard residential balcony and terrace specification",
    productType: "Stainless linear drain — slot grate — residential balcony and terrace",
    filterTags: ["Stainless-steel", "Slot-grate", "Fixed-height", "Residential-balcony", "Class-A", "Liquid-applied-compatible"],
    techChips: [
      { label: "Grade 316L stainless", cls: "bg-slate-100 text-slate-700" },
      { label: "Slot grate", cls: "bg-slate-100 text-slate-700" },
      { label: "Fixed height", cls: "bg-amber-50 text-amber-700" },
      { label: "Class A — pedestrian", cls: "bg-slate-100 text-slate-700" },
      { label: "Liquid-applied compatible", cls: "bg-green-100 text-green-800" },
      { label: "Geberit AU distribution", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: `Geberit CleanLine is a stainless steel linear shower channel system available through the Geberit Australian plumbing merchant network. The CleanLine is primarily used in internal wet area applications but is also specified on external balcony and terrace remediation where liquid-applied waterproofing membranes are applied and a stainless slot grate drain is required at a threshold or perimeter position.

The CleanLine features a Grade 316L stainless steel channel body and a continuous slot grate cover in brushed stainless finish. The channel is a fixed-height drain — the screed depth must be established accurately before the drain is set, and the top of the drain must align with the finished tile surface after tile laying. The drain body provides a flange that the liquid-applied membrane laps onto and bonds at the drain perimeter.

The CleanLine is available through Geberit's Australian plumbing merchant network and is widely stocked. Confirm the selected CleanLine model is rated for external balcony exposure — not all Geberit CleanLine variants are approved for continuously wet external conditions. Confirm membrane compatibility with the membrane manufacturer before applying a liquid-applied system at the CleanLine flange.`,
    technicalProperties: [
      "Grade 316L stainless steel channel body and slot grate — suitable for wet external conditions",
      "Slot grate — brushed stainless finish — suitable for residential balcony and threshold drainage",
      "Fixed-height channel — screed depth must be accurately set before installation",
      "Class A pedestrian load rating — suitable for residential balcony and terrace applications",
      "Compatible with liquid-applied waterproofing systems — confirm compatibility and membrane overlap with manufacturer",
      "Available through Geberit Australian plumbing merchant network — confirm local stocking",
    ],
    limitations: [
      "Fixed height — screed depth and fall must be accurately established before drain installation — height errors cannot be corrected after screed placement",
      "Not all Geberit CleanLine variants are rated for external balcony exposure — confirm with Geberit Australia before specifying for continuously wet external conditions",
      "Not confirmed for torch-on sheet membrane applications — confirm with Geberit technical if torch-on system is being specified",
      "Class A load rating only — not suitable for vehicle or heavy pedestrian loading on communal podium applications",
      "Confirm current product range, sizing, and external suitability with Geberit Australia before specifying",
    ],
    procurementSources: [
      { name: "Geberit Australia", url: "https://www.geberit.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
      { name: "Tradelink", url: "https://www.tradelink.com.au" },
    ],
  },
  {
    fullLabel: "Various — confirm with supplier",
    brandUrl: "",
    accentColor: "#475569",
    name: "PVC Channel Drain — Standard",
    descriptionLine: "PVC channel drain body with PVC or stainless grate — fixed-height — low cost — suitable for liquid-applied membrane systems on residential balcony and threshold drainage — confirm product specification and AS compliance before specifying",
    productType: "PVC channel drain — liquid-applied compatible — standard residential specification",
    filterTags: ["PVC", "Slot-grate", "Fixed-height", "Residential-balcony", "Class-A", "Liquid-applied-compatible"],
    techChips: [
      { label: "PVC channel body", cls: "bg-slate-100 text-slate-700" },
      { label: "PVC or stainless grate", cls: "bg-slate-100 text-slate-700" },
      { label: "Fixed height", cls: "bg-amber-50 text-amber-700" },
      { label: "Class A — pedestrian", cls: "bg-slate-100 text-slate-700" },
      { label: "Liquid-applied compatible", cls: "bg-green-50 text-green-700" },
      { label: "Low cost specification", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: `PVC channel drains are the lower-cost linear drainage option for residential balcony and threshold applications where a liquid-applied waterproofing membrane system is being applied and a stainless steel architectural finish is not required. The PVC channel body is set into the screed at the low point or perimeter drainage position, and the liquid-applied membrane is lapped and bonded onto the PVC flange in the same manner as for a PVC puddle flange.

PVC channel drains are available from a range of manufacturers and suppliers, typically with a PVC body and either a PVC or stainless steel slot grate. The PVC body is compatible with liquid-applied polyurethane, hybrid, and cementitious waterproofing membranes — confirm chemical compatibility between the PVC body and the specific membrane product being applied.

PVC channel drains are not suitable for torch-on sheet membrane systems — torch-on heat-bonding cannot be performed to a PVC surface without risk of deformation or failure. For torch-on sheet systems, specify a stainless steel channel drain. PVC channel drains are typically a fixed-height product — confirm screed depth and drain height carefully before setting. Confirm AS/NZS 3500 compliance of the specific product with the supplier before specifying.`,
    technicalProperties: [
      "PVC channel body — compatible with liquid-applied PU, hybrid, and cementitious waterproofing membranes",
      "PVC or stainless grate — confirm grate format against architectural specification",
      "Fixed-height channel — accurate screed depth required before installation",
      "Class A pedestrian load rating — confirm load class with supplier before specifying",
      "Low cost linear drainage option — suitable for standard residential balcony and threshold applications",
      "Confirm AS/NZS 3500 compliance with supplier before specifying",
    ],
    limitations: [
      "Not suitable for torch-on modified bitumen sheet membrane systems — PVC cannot be heat-bonded — specify stainless channel for torch-on applications",
      "Fixed height only — screed depth and fall must be established accurately before drain installation",
      "Product quality varies significantly between manufacturers and brands — confirm specification and AS compliance with supplier",
      "Confirm chemical compatibility between PVC body and the specific liquid-applied membrane product before applying",
      "Class A pedestrian load only — not suitable for vehicle or high-traffic podium applications",
      "Confirm current product availability, sizing, and grate format with supplier before specifying",
    ],
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "Reece Plumbing", url: "https://www.reece.com.au" },
    ],
  },
  {
    fullLabel: "Various — confirm with supplier",
    brandUrl: "",
    accentColor: "#64748b",
    name: "HDPE Channel Drain — Podium and Heavy Duty",
    descriptionLine: "HDPE channel drain body with stainless or ductile iron grate — Class B to Class D load — suitable for podium slab, communal terrace, and heavy pedestrian traffic applications — confirm product specification and AS compliance before specifying",
    productType: "HDPE channel drain — Class B to D — podium and heavy-duty applications",
    filterTags: ["HDPE", "Slot-grate", "Fixed-height", "Podium-terrace", "Class-B", "Liquid-applied-compatible", "Torch-on-compatible"],
    techChips: [
      { label: "HDPE channel body", cls: "bg-slate-200 text-slate-800" },
      { label: "Class B / C / D load", cls: "bg-amber-100 text-amber-800" },
      { label: "Stainless or ductile iron grate", cls: "bg-slate-100 text-slate-700" },
      { label: "Podium / heavy duty", cls: "bg-slate-100 text-slate-700" },
      { label: "Sheet and liquid compatible", cls: "bg-green-50 text-green-700" },
      { label: "Confirm specification", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription: `HDPE channel drains are used on podium slabs, communal terraces, and commercial deck areas where Class B, C, or D load ratings are required and where the drain must accommodate higher drainage volumes than a standard residential balcony floor waste or PVC channel can provide. The HDPE channel body is resistant to the chemicals in most waterproofing membranes and can be used with both liquid-applied and some cold-applied sheet membrane systems.

HDPE channel drains on podium and large terrace applications are typically specified by the hydraulic engineer as part of the drainage design, and the drain body and grate load class must be confirmed against the expected pedestrian and vehicle loading before specifying. On communal podium areas of Class 2 strata buildings, pedestrian loading can be significant, and the incorrect load class drain can fail structurally under repeated loading.

Confirm with the supplier that the HDPE channel body is compatible with the specific waterproofing membrane system being applied. Confirm whether the product is approved for use with torch-on sheet membrane systems — HDPE bodies can typically be solvent-welded to cold-applied sheet membranes in some systems, but torch-on heat-bonding should not be applied directly to HDPE surfaces without specific product and system approval. Confirm AS/NZS 3500 compliance with the supplier.`,
    technicalProperties: [
      "HDPE channel body — resistant to most waterproofing membrane chemicals",
      "Class B (light vehicle), Class C (medium vehicle), or Class D (heavy vehicle) load ratings available — confirm against expected loading",
      "Stainless steel or ductile iron grate — confirm grate material against exposure and load requirement",
      "Compatible with liquid-applied and cold-applied sheet membrane systems — confirm for torch-on",
      "Suitable for podium slab, communal terrace, and heavy pedestrian traffic applications",
      "Available in extended lengths with joining couplers — suitable for continuous perimeter drainage runs",
      "Confirm AS/NZS 3500 compliance with supplier before specifying",
    ],
    limitations: [
      "Confirm torch-on sheet membrane compatibility with supplier — do not apply heat directly to HDPE body without specific product approval",
      "Product quality and specification varies between manufacturers — confirm AS compliance and load class certification with supplier",
      "Load class must be confirmed against the project drainage and structural design — do not substitute load class without engineering confirmation",
      "Specification should be driven by the hydraulic engineer's drainage design on podium and communal terrace applications",
      "Confirm current product availability, sizing, and grate options with supplier before specifying",
    ],
    procurementSources: [
      { name: "ACO Australia", url: "https://www.acoau.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Confirm with hydraulic engineer for project-specific specification", url: "https://www.acoau.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Stainless-steel", label: "Stainless steel" },
  { id: "PVC", label: "PVC" },
  { id: "HDPE", label: "HDPE" },
  { id: "Tile-insert", label: "Tile insert grate" },
  { id: "Slot-grate", label: "Slot grate" },
  { id: "Adjustable-height", label: "Adjustable height" },
  { id: "Fixed-height", label: "Fixed height" },
  { id: "Residential-balcony", label: "Residential balcony" },
  { id: "Podium-terrace", label: "Podium / terrace" },
  { id: "Class-A", label: "Class A load" },
  { id: "Class-B", label: "Class B load" },
  { id: "Torch-on-compatible", label: "Torch-on sheet compatible" },
  { id: "Liquid-applied-compatible", label: "Liquid-applied compatible" },
  { id: "Architectural-finish", label: "Architectural finish" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  bodyMaterial: string;
  membraneCompatibility: string;
  heightAdjustable: string;
  grateFormat: string;
  loadClass: string;
  keyRestriction: string;
}[] = [
  {
    product: "Schlüter KERDI-LINE",
    brand: "Schlüter-Systems",
    bodyMaterial: "Stainless 304 / 316",
    membraneCompatibility: "KERDI membrane, liquid-applied (confirm)",
    heightAdjustable: "Yes — adjustable after screed",
    grateFormat: "Tile insert or slot grate",
    loadClass: "Class A / Class B",
    keyRestriction: "Primary integration with KERDI system — confirm with other liquid-applied — not confirmed for torch-on",
  },
  {
    product: "ACO Stainless Linear",
    brand: "ACO Australia",
    bodyMaterial: "Stainless 304 / 316",
    membraneCompatibility: "Liquid-applied; torch-on (confirm)",
    heightAdjustable: "Yes (adjustable) and fixed models",
    grateFormat: "Slot, perforated, tile insert",
    loadClass: "Class A / B / C",
    keyRestriction: "Confirm torch-on heat-bonding compatibility — Grade 316 required for coastal",
  },
  {
    product: "Infinity Drain Tile Insert",
    brand: "Infinity Drain",
    bodyMaterial: "Stainless steel",
    membraneCompatibility: "Liquid-applied (confirm)",
    heightAdjustable: "Yes — adjustable",
    grateFormat: "Tile insert — full-length",
    loadClass: "Class A",
    keyRestriction: "Not confirmed for torch-on — tile insert must be coordinated with tile module — confirm AU availability",
  },
  {
    product: "Geberit CleanLine",
    brand: "Geberit Australia",
    bodyMaterial: "Stainless 316L",
    membraneCompatibility: "Liquid-applied (confirm external suitability)",
    heightAdjustable: "No — fixed height",
    grateFormat: "Slot grate — brushed stainless",
    loadClass: "Class A",
    keyRestriction: "Fixed height — confirm external balcony suitability with Geberit — not confirmed for torch-on",
  },
  {
    product: "PVC Channel Drain",
    brand: "Various",
    bodyMaterial: "PVC",
    membraneCompatibility: "Liquid-applied only",
    heightAdjustable: "No — fixed height",
    grateFormat: "PVC or stainless slot",
    loadClass: "Class A",
    keyRestriction: "Not suitable for torch-on sheet — cannot heat-bond to PVC — fixed height only",
  },
  {
    product: "HDPE Channel Drain",
    brand: "Various",
    bodyMaterial: "HDPE",
    membraneCompatibility: "Liquid-applied; cold-applied sheet (confirm torch-on)",
    heightAdjustable: "No — fixed height",
    grateFormat: "Stainless or ductile iron",
    loadClass: "Class B / C / D",
    keyRestriction: "Specification must be driven by hydraulic engineer on podium applications — confirm torch-on compatibility",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Threshold drainage between internal and external areas — KERDI-LINE and ACO stainless at door thresholds and bifold transitions",
    "Perimeter drainage — continuous linear drain at the perimeter wall of a balcony or terrace where falls drain to the edge rather than the centre",
    "Single-edge drainage on narrow balconies — linear drain at the outer edge replacing a central puddle flange where the balcony is too narrow for a falls-to-centre layout",
    "Communal podium terrace drainage — ACO or HDPE channel drain at perimeter or threshold positions on large outdoor common areas",
    "Architectural finish specification on high-end apartment balconies — tile insert linear drain for seamless tiled finish with no visible drain grate",
    "Heavy-duty podium slab drainage — HDPE channel drain rated Class B or above where vehicle or high-traffic loading is anticipated",
  ],
  whenToSpecify: [
    "The existing balcony drainage is via a central puddle flange but the falls cannot be re-established to a central point after membrane replacement",
    "The door threshold between internal and external areas requires continuous linear drainage to prevent water ingress at the transition",
    "The balcony width is insufficient to achieve 1:100 falls to a central point drain — a linear drain at the outer edge allows the entire slab to fall toward the perimeter",
    "An architectural tile-insert drain finish is specified in the building's remediation scope or by the strata design architect",
    "The podium slab has a perimeter drainage channel that requires replacement as part of the waterproofing remediation",
    "The hydraulic engineer's drainage design specifies linear drainage for the project",
  ],
  materialSelection: [
    "Stainless steel — Grade 304 for inland applications; Grade 316 or 316L for coastal locations and marine-exposed environments — standard specification for external balcony and terrace linear drains",
    "PVC — suitable for liquid-applied membrane systems only — compatible with PU, hybrid, and cementitious membranes — not suitable for torch-on sheet — lower cost than stainless but lower durability in external wet conditions",
    "HDPE — suitable for podium and heavy-duty applications where higher load ratings are required — chemical resistance to most membrane products — confirm torch-on compatibility before specifying",
    "Do not specify PVC or HDPE channel drains in torch-on modified bitumen sheet membrane systems without confirming heat-bonding compatibility with the supplier — heat applied during torch-on membrane installation can deform or compromise plastic channel bodies",
  ],
  installationSequence: [
    "1 — Remove existing tiles, adhesive, and membrane back to concrete substrate",
    "2 — Assess existing drainage configuration — confirm whether linear drain is appropriate or whether puddle flange should be retained and integrated",
    "3 — Establish drainage fall direction and determine linear drain position — outer perimeter, threshold, or wall-to-wall drainage line",
    "4 — Cut and prepare concrete substrate at drain position — confirm structural slab penetration requirements with engineer",
    "5 — Set linear drain channel at correct height and level — adjustable-height systems allow fine-tuning after screed; fixed-height systems require accurate screed depth",
    "6 — Apply polymer-modified screed to establish required drainage falls to linear drain channel",
    "7 — Apply primer to screed substrate including drain channel flange perimeter",
    "8 — Apply waterproofing membrane — lap onto channel flange per manufacturer's overlap requirement",
    "9 — Apply tile adhesive and fix tiles — confirm tile fall continues to drain channel",
    "10 — Install grate cover after tiling and grouting is complete",
  ],
  standards: [
    "AS/NZS 3500.3 — Stormwater drainage — governs design, sizing, and installation of drainage systems — confirm linear drain sizing against the hydraulic engineer's drainage design for the floor area being drained",
    "AS 3740:2021 — Waterproofing of domestic wet areas — minimum 1:100 drainage fall required to the drainage point — linear drains must be positioned correctly relative to the drainage fall",
    "AS 3996 — Access covers, grates, and frames — load class requirements for drain grates and covers — confirm load class of the specified grate against expected pedestrian and vehicle loading",
    "Confirm that the specified channel drain and grate comply with all relevant standards — and confirm drain sizing, load class, and membrane integration details with the relevant consultants",
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

export function LinearDrainIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are linear grates and channel drains — balcony waterproofing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Linear channel drains are continuous drainage elements that collect surface water along a line rather than at a single point, as a puddle flange or floor waste does. They are installed at the perimeter, threshold, or drainage line of a balcony, terrace, or podium slab, and provide a continuous drainage slot or grate along the full width or length of the drainage collection zone. In balcony and terrace waterproofing remediation, linear drains are specified where the geometry of the space does not suit a central puddle flange, where a threshold drainage detail is required between internal and external areas, or where an architectural tile-insert finish has been specified.
        </p>
        {expanded && (
          <>
            <p>
              Linear channel drains for balcony waterproofing remediation are available in stainless steel, PVC, and HDPE body materials, and in fixed-height and adjustable-height configurations. The drain body provides a continuous flange onto which the waterproofing membrane is lapped and bonded, creating a watertight junction between the membrane field and the drainage point. The grate is installed above the channel body and may be a slot grate, a perforated grate, or a tile insert tray that conceals the drain within the tiled floor finish.
            </p>
            <p>
              Load class selection is critical on communal terrace and podium applications — the grate and channel body must be rated for the expected pedestrian or vehicle loading under AS 3996. Membrane compatibility must be confirmed between the channel body material and the specific membrane product being applied — PVC and HDPE bodies are not compatible with torch-on heat-bonding, and not all liquid-applied membrane products will form a durable bond to all plastic channel body materials without a suitable primer or bonding agent.
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

export function LinearDrainProductSection() {
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
              Typical applications, when to specify, material selection, installation sequence, AS/NZS 3500 and AS 3740 requirements
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
              <TechCard icon={<CheckCircle size={15} />} title="When to Specify a Linear Drain" items={TECH_INFO.whenToSpecify} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Material Selection" items={TECH_INFO.materialSelection} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Correct Installation Sequence" items={TECH_INFO.installationSequence} style="bullet" />
              <TechCard icon={<BookOpen size={15} />} title="AS/NZS 3500, AS 3740 and AS 3996 Requirements" items={TECH_INFO.standards} style="bullet" />
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
            <p className="mt-1 text-sm text-slate-500">6 products — 4 brands — stainless steel, PVC, and HDPE linear channel drains — scroll to view all</p>
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
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
                      {product.brandUrl && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
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
                  <p className="whitespace-pre-line text-xs leading-6 text-slate-700">{product.systemDescription}</p>
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

      {/* ── System Comparison Table ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Linear drain and channel drain system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of linear drain types, materials, and membrane compatibility. Confirm all product selections against the current manufacturer TDS and membrane manufacturer before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Body material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Membrane compatibility</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Height adjustable</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Grate format</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Load class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.bodyMaterial}</td>
                  <td className="px-4 py-3 text-slate-600">{row.membraneCompatibility}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.heightAdjustable.startsWith("Yes") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-700">
                        <CheckCircle size={11} /> {row.heightAdjustable}
                      </span>
                    ) : row.heightAdjustable.startsWith("No") ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-500">
                        <XCircle size={11} /> {row.heightAdjustable}
                      </span>
                    ) : (
                      <span className="text-slate-500">{row.heightAdjustable}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.grateFormat}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.loadClass}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Do not confuse box — below comparison table ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse linear channel drains with:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Puddle flanges and floor wastes (point drains) — these are listed on the drainage puddle flanges and floor wastes page — linear drains collect water along a line, not at a single point — confirm which drainage type is appropriate for the project before specifying",
            "Podium outlets and scuppers — podium drainage outlets and overflow scuppers are large-format drainage components used on podium slabs and roofs to discharge stormwater into vertical downpipes or through the building perimeter — these are listed under the podium outlets and scuppers page",
            "Channel drains in pavements and car parks — civil-grade trench drains and heavy-duty polymer channel drains for external pavements and car park areas are different products to balcony and terrace linear drains — confirm load class and product specification against project application before specifying",
            "Shower niches and internal wet area drains — internal shower linear drains have different specification requirements to external balcony and terrace linear drains — confirm external suitability with the manufacturer before specifying any linear drain in an external waterproofing system",
            "Waterproofing membranes — linear drains are drainage components, not waterproofing products — a classified waterproofing membrane must always be applied above and lapped to the drain body flange",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Critical callout boxes ── */}
      <div className="space-y-4">
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">Membrane Compatibility at the Linear Drain Flange Is a Critical Detail</p>
          <p className="text-sm leading-7 text-amber-900">
            The linear drain channel body and its flange must be compatible with the waterproofing membrane system being applied. For liquid-applied polyurethane and hybrid membranes, the membrane is applied over the screed and lapped onto the channel flange per the membrane manufacturer's required overlap dimension — typically 50–75mm. For PVC and HDPE channel bodies, confirm that the membrane product bonds to the channel body material — not all liquid-applied membranes will form a durable bond to all plastic substrates. For stainless steel channel bodies with torch-on sheet membrane systems, confirm that the stainless flange is suitable for heat-bonding with the specific sheet membrane product before specifying.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-red-500 bg-red-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-red-800">Linear Drain Position and Height Are Pre-Membrane Decisions</p>
          <p className="text-sm leading-7 text-red-900">
            The position and finished height of the linear drain channel must be determined and set before the membrane is applied. The channel body is set at the correct height in the screed so that the membrane can be lapped onto the flange and the finished tile surface falls continuously toward the drain. Adjustable-height channel drains allow the drain body height to be set during screed application and fine-tuned before tile laying — a significant advantage over fixed-height drains in balcony remediation where existing substrate levels may be irregular. Once the membrane has been applied and tiles fixed, drain height errors cannot be corrected without full membrane strip-out.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 px-5 py-4">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-sky-800">Linear Drains Are Not Always the Right Specification — Confirm Against the Drainage Design</p>
          <p className="text-sm leading-7 text-sky-900">
            Linear channel drains are appropriate where threshold or perimeter drainage is specified, or where the balcony geometry does not allow falls to a central puddle flange. They are not inherently superior to puddle flanges for standard residential balcony applications — a correctly installed puddle flange with AS 3740 falls is the standard specification for most balconies. Linear drains introduce additional coordination requirements: the drain length must be selected relative to the balcony width, the tile module must be coordinated with the drain position and tile insert dimensions (where a tile insert grate is specified), and the screed falls must be established so the entire floor area drains toward the channel. Confirm the drainage strategy with the project waterproofing consultant or hydraulic engineer before specifying a linear drain over a puddle flange.
          </p>
        </div>
      </div>

      {/* ── Torch-on warning box ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Torch-on sheet membrane systems — confirm channel compatibility before specifying</h3>
        </div>
        <div className="space-y-3 text-sm leading-7 text-amber-900">
          <p>
            Where a torch-on modified bitumen sheet membrane system is being specified for a balcony, roof deck, or podium, the linear drain or channel drain body must be compatible with the heat required during torch-on application. PVC and standard HDPE channel bodies cannot be heat-bonded — applying a naked flame or torch in proximity to a PVC or HDPE drain body during torch-on application risks deformation of the drain body, failure of the membrane-to-drain junction, and a non-compliant waterproofing system.
          </p>
          <p>
            For torch-on sheet membrane systems, specify a stainless steel linear channel drain that has been confirmed by the manufacturer as suitable for heat-bonding. Confirm the specific bonding method — whether the sheet membrane base layer is heat-bonded directly to the stainless flange, or whether a separate collar or transition flashing is used — with both the drain manufacturer and the membrane manufacturer before installation begins.
          </p>
          <p className="font-bold">
            Do not assume that any stainless linear drain is automatically compatible with torch-on sheet membrane systems without specific manufacturer confirmation.
          </p>
        </div>
      </div>
    </>
  );
}
