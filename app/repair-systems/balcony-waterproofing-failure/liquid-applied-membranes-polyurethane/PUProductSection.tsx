"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Pure-PU" | "PU-hybrid" | "Hybrid-liquid"
  | "Undertile" | "Under-screed" | "Protected-finish"
  | "Balcony-terrace" | "Pedestal-paver" | "Trafficable"
  | "UV-stable" | "Requires-topcoat"
  | "AS-4654" | "AS-4858" | "Class-III"
  | "1C" | "2C" | "Water-based" | "Solvent-based";

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
    accentColor: "#f97316",
    name: "ARDEX WPM 157",
    descriptionLine: "One-component water-based polyurethane waterproofing membrane — balcony and wet area use",
    productType: "Pure polyurethane",
    filterTags: ["Pure-PU", "Undertile", "Under-screed", "Balcony-terrace", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "Pure polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Undertile / under screed", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX WPM 157 is ARDEX's primary single-component water-based polyurethane waterproofing membrane for balcony and wet area use in Class 2 strata remediation. Apply by roller or brush in two coats to primed concrete substrate. Embed ARDEX fibreglass reinforcing tape at all corners, junctions, drain surrounds and penetrations before second coat. Flood test minimum 24 hours before tiling or screed. Suitable for use under tiles, screeds and protected balcony finishes.",
    technicalProperties: [
      "Pure polyurethane chemistry — higher elongation and crack-bridging than PU-hybrid or cementitious alternatives",
      "AS 4858 compliant — meets Australian wet area membrane standard for Class 2 balcony waterproofing",
      "Water-based — low VOC — suitable for enclosed or poorly ventilated balcony spaces",
      "One-component — no mixing required on site — eliminates batching error",
      "Suitable for use under tiles, polymer-modified screed and pedestal paver systems",
    ],
    limitations: [
      "Primer mandatory on all substrates — confirm primer selection with ARDEX technical before application",
      "Two-coat minimum to achieve required dry film thickness per AS 4858 — single coat insufficient",
      "Not suitable for direct trafficable exposure without a protection layer",
      "Confirm tile adhesive compatibility with ARDEX before applying adhesive directly to cured membrane",
      "Confirm current product name and specification with ARDEX Australia — product range subject to periodic revision",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX WPM 155 Rapid Plus",
    descriptionLine: "One-component rapid-setting polyurethane waterproofing membrane — programme-critical applications",
    productType: "Pure polyurethane",
    filterTags: ["Pure-PU", "Undertile", "Under-screed", "Balcony-terrace", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "Pure polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Rapid set", cls: "bg-green-50 text-green-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Undertile / under screed", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX WPM 155 Rapid Plus is a rapid-setting one-component polyurethane membrane developed for programme-critical balcony waterproofing projects on occupied strata buildings. Significantly faster recoat and through-cure times than standard WPM 157 — reducing the gap between membrane application and tile or screed commencement. Same application method: roller or brush, two coats, with reinforcing tape at all junctions. Primer required. Flood test before tiling.",
    technicalProperties: [
      "Rapid set — significantly reduced recoat and through-cure time — major programme advantage on occupied strata",
      "Pure polyurethane chemistry — maintains good elongation and crack-bridging performance at full cure",
      "AS 4858 compliant for wet area and balcony membrane applications",
      "One-component — no mixing — eliminates site batching error",
      "Suitable for use under tiles, screeds and pedestal paver systems",
    ],
    limitations: [
      "Primer mandatory — confirm ARDEX primer selection with technical representative",
      "Rapid set reduces working time — plan application sequence carefully on large areas",
      "Two-coat minimum — fast set does not compensate for insufficient film thickness",
      "Confirm tile adhesive compatibility with ARDEX before tiling",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#f97316",
    name: "ARDEX WPM 130 Builders Express",
    descriptionLine: "Single-component polyurethane-acrylic hybrid membrane — domestic and light commercial balcony use",
    productType: "Polyurethane-acrylic hybrid",
    filterTags: ["PU-hybrid", "Undertile", "Balcony-terrace", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "PU-acrylic hybrid", cls: "bg-violet-100 text-violet-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Undertile", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX WPM 130 Builders Express is a single-component polyurethane-acrylic hybrid waterproofing membrane for domestic and light commercial balcony and wet area use. Product type is PU-acrylic hybrid — do not specify as a substitute for pure polyurethane where high elongation or active crack bridging is required. Suitable for protected balcony finishes under tiles or screed. Apply by roller or brush in two coats with ARDEX primer and reinforcing tape at all junctions.",
    technicalProperties: [
      "PU-acrylic hybrid — easier to apply than solvent-based PU — suited to domestic and light commercial use",
      "AS 4858 compliant for wet area and balcony waterproofing",
      "One-component — no mixing on site",
      "Water-based — low VOC",
      "Suitable under tiles and screed in standard balcony remediation",
    ],
    limitations: [
      "PU-acrylic hybrid — lower elongation than pure polyurethane — not suitable where significant substrate movement or active cracking is anticipated",
      "Do not substitute for pure PU where Class III or high-elongation specification is required",
      "Primer and reinforcing tape mandatory at all junctions — same installation requirements as higher-grade systems",
      "Confirm current product specification and classification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply — contact for current pricing", url: "https://www.ardex.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#ef4444",
    name: "Sika Sikalastic-487",
    descriptionLine: "One-component solvent-based polyurethane waterproofing membrane — Class III AS 4858 — under screed and under tile — 15 L pail",
    productType: "Pure polyurethane — solvent-based — Class III",
    filterTags: ["Pure-PU", "Undertile", "Under-screed", "Balcony-terrace", "1C", "Solvent-based", "AS-4858"],
    techChips: [
      { label: "Pure polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Solvent-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Class III — AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Balcony / terrace", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Sikalastic-487 is a one-component solvent-based moisture-curing elastomeric polyurethane waterproofing membrane for Australian Class 2 strata balcony remediation. It is solvent-based — not water-based — and carries Class III classification per AS/NZ 4858 with greater than 300% elongation. Pack size is 15 L. Apply by roller in two coats (minimum 680 microns WFT per coat to achieve 1.2mm DFT) with Sika-approved primer. Suitable for use under tile, screed and pedestal paver systems. Not suitable for direct UV exposure — protected system only. Flood test minimum 24 hours. Because this product is solvent-based, adequate ventilation is mandatory during application. Confirm current product specification with Sika technical.",
    technicalProperties: [
      "Pure polyurethane — Class III per AS/NZ 4858 — greater than 300% elongation — excellent crack-bridging capability",
      "Solvent-based — moisture-curing — low VOC formulation — complies with Green Star VOC requirements",
      "One-component — no mixing — reduces site batching error — 15 L pack",
      "Two coats at minimum 680 microns WFT per coat to achieve 1.2mm DFT — light foot traffic and screed after 24 hours",
      "Compatible with Sika tile adhesive systems after full cure — confirm with Sika technical",
    ],
    limitations: [
      "Solvent-based — adequate ventilation mandatory during and after application — not suitable for enclosed spaces without forced air extraction",
      "Sika-approved primer mandatory on all substrates — confirm primer selection with Sika technical",
      "Two-coat minimum at specified wet film thickness — single coat insufficient",
      "Not suitable for directly trafficable or UV-exposed surface — protected system (under screed, tile, or pavers) only",
      "Confirm tile adhesive compatibility before specifying — not all adhesive systems are compatible",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#ef4444",
    name: "SikaTile-110 Secure Proof",
    descriptionLine: "One-component water-based polyurethane Class III undertile waterproofing membrane — fibre reinforced — internal and external — 15 L pail",
    productType: "Pure polyurethane — water-based — Class III",
    filterTags: ["Pure-PU", "Undertile", "Balcony-terrace", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "Pure polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Class III — AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Undertile — 15 L pail", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "SikaTile-110 Secure Proof is a premium performance, flexible, Class III, ready-to-use, fibre-reinforced, water-based polyurethane waterproofing membrane designed for internal and external areas including wet areas, balconies, and terraces. It is NOT a PU-acrylic hybrid — it is water-based polyurethane, compliant with AS/NZS 4654:2012 and AS 4858:2004 as a Class III membrane with high elongation of up to 500%. Apply by medium nap roller in a minimum of 2 coats to achieve 1.0mm DFT for under-tile use. A 15 L pail covers approximately 10m². The product includes integrated fibre reinforcement — confirm detailing requirements at corners and junctions with Sika technical. Suitable for Class 2 balcony remediation under tile finish.",
    technicalProperties: [
      "Water-based polyurethane — Class III per AS 4858:2004 and AS/NZS 4654:2012 — high elongation up to 500%",
      "Fibre-reinforced — integrated reinforcement — improved crack-bridging and tensile strength",
      "One-component — no mixing required — water-based — low VOC — suitable for occupied strata environments",
      "Minimum 1.0mm DFT in 2 coats for under-tile use — 15 L pail covers approximately 10m²",
      "Suitable for internal and external applications including balconies, terraces, showers, and wet areas",
    ],
    limitations: [
      "Confirm reinforcing and primer requirements at corners, coves, and junctions with Sika technical before application",
      "Two-coat minimum to achieve specified DFT — single coat is insufficient",
      "Not suitable for direct trafficable or UV-exposed surfaces — protected system only",
      "Confirm current product name, specification and compliance with Sika Australia before specifying — product names subject to change",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Davco / Laticrete Australia",
    brandUrl: "https://davco.com.au",
    accentColor: "#0ea5e9",
    name: "Davco K10 Plus",
    descriptionLine: "Single-component water-based polyurethane Class III waterproofing membrane — greater than 500% elongation — wet area and balcony — available in green or grey",
    productType: "Pure polyurethane — water-based — Class III",
    filterTags: ["Pure-PU", "Undertile", "Balcony-terrace", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "Pure polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Class III — AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Undertile — green or grey", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Davco K10 Plus (Sika / Davco) is a premixed, ready-to-use, single-component water-based polyurethane Class III waterproofing membrane. It is NOT a hybrid liquid membrane — it is a pure water-based polyurethane compliant with AS/NZ 4858:2004 as a Class III membrane with greater than 500% elongation. Widely distributed nationally through Davco/Laticrete/Sika trade network and Bunnings. Apply in a minimum of 2 coats to achieve 1mm DFT. A 20 L pail covers approximately 13.3m² in 2 coats; 4 L pail covers approximately 2.75m². Suitable for use under tiles and screeds on balconies, terraces, roofs, and wet areas — internal and external. Available in Green or Grey. Flood test before tiling.",
    technicalProperties: [
      "Water-based polyurethane — Class III per AS/NZ 4858:2004 — greater than 500% elongation — highly flexible",
      "One-component — no site mixing required — premixed ready to use",
      "Water-based — non-toxic — suitable for occupied strata with ventilation limitations",
      "Widely stocked nationally — Bunnings in-store, Davco/Sika trade network, and online suppliers",
      "Suitable for ceramic and porcelain tile systems after full cure — internal and external balcony and wet area use",
    ],
    limitations: [
      "Confirm primer requirements with Davco / Sika technical — primer may be required on some substrates",
      "Two-coat minimum to achieve 1mm DFT — single coat is insufficient",
      "Not suitable for direct trafficable or UV-exposed surfaces without a protective finish — confirm exposure conditions before specifying",
      "Confirm current product specification and classification with Davco Australia — Davco K10 Plus is now within the Sika portfolio",
    ],
    procurementSources: [
      { name: "Davco / Laticrete Australia — trade supply", url: "https://davco.com.au" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/en-au",
    accentColor: "#8b5cf6",
    name: "Bostik Dampfix PU",
    descriptionLine: "Single-component polyurethane waterproofing membrane — balcony and wet area use",
    productType: "Pure polyurethane",
    filterTags: ["Pure-PU", "Undertile", "Under-screed", "Balcony-terrace", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "Pure polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Undertile / under screed", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bostik Dampfix PU is a single-component polyurethane waterproofing membrane for balcony and wet area waterproofing in Class 2 strata buildings. Apply by brush in two coats. Embed reinforcing fabric at all corners, drain surrounds and penetrations before second coat. Suitable for use under tiles and screeds. Flood test before tiling. Part of the Bostik Dampfix waterproofing system — confirm compatible primer and accessories with Bostik technical.",
    technicalProperties: [
      "Pure polyurethane — good elongation and flexibility — suitable for substrates with thermal movement",
      "AS 4858 compliant for balcony and wet area waterproofing",
      "One-component — no mixing required",
      "Water-based — low VOC",
      "Suitable under tile and screed protection systems",
    ],
    limitations: [
      "Primer mandatory — confirm Bostik-compatible primer selection before application",
      "Two-coat minimum to achieve required dry film thickness",
      "Not suitable for direct trafficable exposure without protection layer",
      "Bostik distribution network may be smaller in some regions — confirm local availability",
      "Confirm current product specification with Bostik Australia before specifying",
    ],
    procurementSources: [
      { name: "Bostik Australia — trade supply — contact for current pricing", url: "https://www.bostik.com/en-au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/en-au",
    accentColor: "#8b5cf6",
    name: "Bostik Dampfix Platinum",
    descriptionLine: "High-performance polyurethane-hybrid waterproofing membrane — commercial and strata balcony use",
    productType: "Polyurethane-acrylic hybrid",
    filterTags: ["PU-hybrid", "Undertile", "Under-screed", "Balcony-terrace", "Pedestal-paver", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "PU hybrid", cls: "bg-violet-100 text-violet-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Pedestal paver compatible", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Bostik Dampfix Platinum is a high-performance polyurethane-hybrid membrane positioned above Dampfix PU in the Bostik range — suitable for commercial and strata balcony waterproofing where enhanced elongation and chemical resistance are required. Suitable under tiles, screeds and pedestal paver systems. Apply by brush in two coats with Bostik primer. Embed reinforcing tape at all junctions. Flood test before tiling.",
    technicalProperties: [
      "PU-hybrid — enhanced performance over standard hybrid products — confirm elongation rating with Bostik technical",
      "AS 4858 compliant for commercial and residential balcony waterproofing",
      "One-component — suitable for use on Class 2 strata balcony remediation",
      "Compatible with pedestal paver systems after full cure — confirm with Bostik technical",
      "Water-based — low VOC",
    ],
    limitations: [
      "PU-hybrid — confirm elongation and crack-bridging performance against project specification before selecting",
      "Primer and reinforcing tape mandatory — same requirements as standard Dampfix PU",
      "Confirm tile adhesive and screed compatibility with Bostik technical",
      "Confirm current product specification with Bostik Australia before specifying",
    ],
    procurementSources: [
      { name: "Bostik Australia — trade supply — contact for current pricing", url: "https://www.bostik.com/en-au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#22c55e",
    name: "Tremco Vulkem 350R",
    descriptionLine: "One-component polyurethane waterproofing membrane — remediation grade balcony and deck use",
    productType: "Pure polyurethane",
    filterTags: ["Pure-PU", "Undertile", "Under-screed", "Balcony-terrace", "1C", "Solvent-based", "AS-4858"],
    techChips: [
      { label: "Pure polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Solvent-based", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Remediation grade", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Tremco Vulkem 350R is a one-component solvent-based polyurethane membrane positioned as a remediation-grade system for balcony and external deck waterproofing. Part of the Tremco CPG waterproofing system — warranted when used with compatible Tremco primer and system components throughout. Apply by roller or brush in two coats with Tremco primer. Embed reinforcing fabric at all junctions. Flood test before tiling.",
    technicalProperties: [
      "Pure polyurethane — good elongation for balcony substrates with thermal movement",
      "AS 4858 compliant when applied at specified wet film thickness",
      "One-component — no site mixing required",
      "Part of a complete Tremco CPG system — primer and membrane from same manufacturer",
      "Remediation grade — suited to overlay on prepared existing substrates",
    ],
    limitations: [
      "Solvent-based — adequate ventilation required during application — risk in enclosed spaces without forced air extraction",
      "System warranty requires use of Tremco-compatible primer and system components throughout — do not substitute",
      "Tremco distribution network is smaller than ARDEX or Sika — confirm local availability before specifying",
      "Confirm current product name, specification and AS compliance status with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing", url: "https://www.tremcosealants.com.au" },
    ],
  },
  {
    fullLabel: "Gripset Industries",
    brandUrl: "https://www.gripset.com",
    accentColor: "#f59e0b",
    name: "Gripset P39",
    descriptionLine: "Single-component hybrid polyurethane waterproofing membrane — Australian manufactured — under tile and exposed light trafficable UV-stable use — balcony and terrace",
    productType: "Polyurethane hybrid — solvent-free — Class III",
    filterTags: ["PU-hybrid", "Undertile", "Under-screed", "Balcony-terrace", "Pedestal-paver", "Trafficable", "UV-stable", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "PU hybrid", cls: "bg-violet-100 text-violet-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Solvent-free", cls: "bg-slate-100 text-slate-700" },
      { label: "Class III — AS 4858", cls: "bg-amber-50 text-amber-700" },
      { label: "Australian made — UV stable", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Gripset P39 is an Australian-manufactured single-component hybrid polyurethane membrane by Gripset Industries. It is a polyurethane hybrid — not pure polyurethane — developed using advanced hybrid polyurethane technology with fibre enhancement. P39 is Class III per AS 4858 and AS 4654.1 with greater than 300% elongation. Importantly, it can be used both as an under-tile membrane AND as an exposed, lightly trafficable UV-stable membrane for external applications — an advantage over systems restricted to covered applications only. Solvent-free, non-hazardous. Available in 15 L pails. Apply by roller or brush. Primer required — confirm Gripset-compatible primer selection. Flood test before tiling.",
    technicalProperties: [
      "Hybrid polyurethane — Class III per AS 4858 and AS 4654.1 — greater than 300% elongation — fibre enhanced",
      "Can be used as exposed, lightly trafficable UV-stable membrane OR under-tile/screed protected system",
      "Outstanding weather and UV-resistant properties — suitable for exposed external balcony and roof applications",
      "Australian manufactured — solvent-free, non-hazardous — Gripset Industries technical support",
      "One-component — no site mixing required — 15 L pack",
    ],
    limitations: [
      "Polyurethane hybrid — not pure PU — confirm elongation and performance requirements against project specification before selecting",
      "Primer mandatory — confirm Gripset-compatible primer selection before application",
      "Light foot traffic only in exposed applications — confirm load requirements with Gripset before specifying for heavier use",
      "Confirm current product specification and availability through Gripset Industries directly",
    ],
    procurementSources: [
      { name: "Gripset Industries — trade supply — contact for current pricing", url: "https://www.gripset.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Sikalastic WPU",
    descriptionLine: "One-component polyurethane waterproofing membrane for wet area and balcony use",
    productType: "One-component polyurethane membrane",
    filterTags: ["Pure-PU", "Undertile", "Balcony-terrace", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "One-component PU", cls: "bg-sky-100 text-sky-800" },
      { label: "Water-based", cls: "bg-slate-100 text-slate-700" },
      { label: "Balcony / wet area", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika Sikalastic WPU is a one-component polyurethane waterproofing membrane for wet area and balcony applications in residential and commercial construction. It is designed for use under tiles, screeds and protected balcony finishes. Apply by roller or brush in two coats over Sika-approved primer. Embed reinforcing tape at all corners, junctions and drain surrounds before applying the second coat. Flood test before tiling. Confirm current product name, specification, and system components with Sika Australia — Sika product names and formulations are subject to periodic revision.",
    technicalProperties: [
      "One-component polyurethane — no mixing required on site",
      "Water-based formulation — suitable for occupied building environments with standard ventilation",
      "Suitable for use under tiles, screeds, and protected balcony finishes",
      "AS 4858 compliant — confirm current compliance status with Sika Australia",
      "Apply by roller or brush — two-coat system over Sika-approved primer",
    ],
    limitations: [
      "Primer mandatory — confirm Sika-compatible primer with Sika Australia technical before application",
      "Two-coat minimum to achieve required DFT — single coat is insufficient",
      "Not suitable for direct trafficable or UV-exposed surfaces without a protection layer",
      "Confirm current product name and system specification with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia (via Parchem)",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Fosroc Nitoproof 750",
    descriptionLine: "Fosroc polyurethane membrane for waterproofing applications",
    productType: "Polyurethane waterproofing membrane",
    filterTags: ["Pure-PU", "Undertile", "Under-screed", "Balcony-terrace", "1C", "Water-based", "AS-4858"],
    techChips: [
      { label: "Polyurethane", cls: "bg-sky-100 text-sky-800" },
      { label: "Fosroc / Parchem", cls: "bg-slate-100 text-slate-700" },
      { label: "Undertile / under screed", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitoproof 750 is a Fosroc polyurethane membrane for waterproofing applications in balcony, terrace and wet area remediation. As a Fosroc product distributed nationally through Parchem Construction Supplies, it is part of the Fosroc concrete repair and waterproofing system range. Apply by roller or brush in two coats over a Fosroc-compatible primer. Embed reinforcing fabric at all junctions and penetrations before the second coat. Flood test before tiling. Confirm current product name, specification, and system requirements with Fosroc Australia / Parchem before specifying.",
    technicalProperties: [
      "Polyurethane chemistry — good elongation and flexibility for balcony waterproofing",
      "For use under tile, screed, and protected balcony finish systems",
      "Part of the Fosroc waterproofing system — confirm compatible primer and accessories from Parchem",
      "AS 4858 compliant — confirm current compliance with Fosroc / Parchem technical",
    ],
    limitations: [
      "Primer mandatory — confirm Fosroc-compatible primer selection with Parchem before application",
      "Two-coat minimum required — single coat is insufficient",
      "Not suitable for direct trafficable or UV-exposed applications without a protection layer",
      "Confirm current product name and system requirements with Fosroc Australia / Parchem before specifying",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — Fosroc nationally", url: "https://www.parchem.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc Australia (via Parchem)",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Fosroc Nitoproof 810",
    descriptionLine: "Fosroc polyurethane membrane system for waterproofing",
    productType: "Polyurethane waterproofing membrane system",
    filterTags: ["Pure-PU", "Undertile", "Under-screed", "Balcony-terrace", "AS-4858"],
    techChips: [
      { label: "Polyurethane system", cls: "bg-sky-100 text-sky-800" },
      { label: "Fosroc / Parchem", cls: "bg-slate-100 text-slate-700" },
      { label: "Undertile / under screed", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4858", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitoproof 810 is a Fosroc polyurethane membrane system for waterproofing on balconies, terraces and external areas. Distributed nationally in Australia through Parchem Construction Supplies. Apply by roller or brush in two coats over Fosroc-compatible primer. Embed reinforcing fabric at all junctions, corners and penetrations prior to the second coat. Flood test before any screed or tile commencement. Confirm current product name, system specification and application requirements with Fosroc Australia / Parchem before specifying.",
    technicalProperties: [
      "Polyurethane membrane system — for balcony, terrace and external area waterproofing",
      "Suitable for use under tiles, screeds and protected balcony finishes",
      "Part of the Fosroc waterproofing system range — available through Parchem nationally",
      "Confirm compatibility with tile adhesive and screed system with Parchem before specifying",
    ],
    limitations: [
      "Primer mandatory — confirm Fosroc-compatible primer selection with Parchem / Fosroc Australia",
      "Two-coat minimum — single coat is insufficient to achieve required DFT",
      "Confirm current product name, specification and system requirements with Fosroc / Parchem before specifying",
      "Not suitable for direct trafficable or UV-exposed applications without a protection layer",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — Fosroc nationally", url: "https://www.parchem.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Pure-PU", label: "Pure PU" },
  { id: "PU-hybrid", label: "PU hybrid" },
  { id: "Hybrid-liquid", label: "Hybrid liquid" },
  { id: "Undertile", label: "Undertile" },
  { id: "Under-screed", label: "Under screed" },
  { id: "Protected-finish", label: "Protected finish" },
  { id: "Balcony-terrace", label: "Balcony / terrace" },
  { id: "Pedestal-paver", label: "Pedestal paver compatible" },
  { id: "Trafficable", label: "Trafficable / exposed" },
  { id: "UV-stable", label: "UV stable" },
  { id: "Requires-topcoat", label: "Requires topcoat" },
  { id: "AS-4654", label: "AS 4654" },
  { id: "AS-4858", label: "AS 4858" },
  { id: "Class-III", label: "Class III" },
  { id: "1C", label: "One-component" },
  { id: "Water-based", label: "Water-based" },
  { id: "Solvent-based", label: "Solvent-based" },
];

const BRAND_EQUIV: { system: string; ardex: string; sika: string; davco: string; bostik: string; tremco: string; gripset: string }[] = [
  { system: "Pure PU — 1C water-based — standard", ardex: "WPM 157", sika: "—", davco: "K10 Plus", bostik: "Dampfix PU", tremco: "—", gripset: "—" },
  { system: "Pure PU — 1C water-based — rapid set", ardex: "WPM 155 Rapid Plus", sika: "SikaTile-110 Secure Proof*", davco: "—", bostik: "—", tremco: "—", gripset: "—" },
  { system: "Pure PU — 1C solvent-based — remediation", ardex: "—", sika: "Sikalastic-487†", davco: "—", bostik: "—", tremco: "Vulkem 350R", gripset: "—" },
  { system: "PU-hybrid — water-based — undertile / exposed", ardex: "WPM 130 Builders Express", sika: "—", davco: "—", bostik: "Dampfix Platinum", tremco: "—", gripset: "P39" },
];

const TECH_INFO = {
  typicalApplications: [
    "Balcony waterproofing remediation — concrete balconies on Class 2 strata apartment buildings",
    "External terrace and deck waterproofing — under tile, screed, paver or pedestal paver systems",
    "Protected balcony finishes — tiled decks, artificial grass, pedestal systems with screed protection",
    "Remediation over failed existing membrane where substrate condition allows overlay",
    "Wet area waterproofing — bathrooms and laundries (specify water-based in enclosed spaces)",
  ],
  selectionCriteria: [
    "Confirm whether system is pure polyurethane or PU-acrylic hybrid — different elongation and crack-bridging characteristics",
    "Specify pure PU for substrates with significant thermal movement or where active crack bridging is required",
    "Specify water-based system for enclosed or poorly ventilated balcony and internal wet area applications",
    "Confirm primer compatibility — incorrect or missing primer is the primary cause of membrane delamination on balcony projects",
    "Confirm tile adhesive and screed system compatibility after membrane cure — not all systems are compatible",
    "Specify Class III membrane for external balconies exposed to weather in Class 2 buildings — confirm compliance with manufacturer",
  ],
  limitations: [
    "Primer mandatory on all substrates — membrane delamination is the primary failure mode on balcony waterproofing projects",
    "Two-coat minimum to achieve required dry film thickness per AS 4858 — single coat is insufficient",
    "Not directly trafficable without screed, tile or approved protection board — confirm finish type before specifying",
    "Substrate moisture content must be within manufacturer limits at time of membrane application",
    "Flood test to AS 3740 or AS 4858 mandatory before any screed or tile commencement — minimum 24 hours",
    "PU-hybrid products have lower elongation than pure PU — confirm suitability against substrate movement expectations",
  ],
  standardsNotes: [
    "AS 4858 — Wet Area Membranes — primary product compliance standard for liquid-applied balcony membranes in Australia",
    "AS 4654 — Waterproofing of Wet Areas Within Residential Buildings — referenced on some Class 2 project specifications",
    "AS 3740 — Waterproofing of Domestic Wet Areas — flood test requirements and minimum DFT for wet areas and balconies",
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings",
    "Class III membrane classification typically required for external balconies exposed to weather in Class 2 buildings",
  ],
  suitableDefects: [
    "Balcony waterproofing failure — membrane delamination, cracking, blistering, failure at corners, junctions and drains",
    "Failed existing membrane overlay where substrate condition and adhesion allow for direct overlay application",
    "New waterproofing installation in balcony and terrace remediation works in Class 2 strata buildings",
    "Wet area waterproofing failure — bathroom, laundry and ensuite floor remediation",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — primed per manufacturer requirements",
    "Precast concrete panels — confirm surface condition and primer requirements",
    "Screeded concrete — confirm cure, moisture content and surface hardness before membrane application",
    "Previously waterproofed substrates — confirm adhesion, compatibility and overlay suitability with manufacturer",
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

export function PUIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are liquid-applied polyurethane and hybrid balcony membranes?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          This category covers liquid-applied polyurethane and hybrid waterproofing membranes used in balcony and terrace waterproofing remediation. These systems are typically used below tiles, screeds, pavers, pedestal systems, artificial grass finishes, or protected balcony finishes. Product selection must consider substrate preparation, primer compatibility, reinforcement at corners and junctions, wet film/dry film thickness, curing time, flood testing, UV exposure, tile adhesive compatibility, and whether the system is designed for exposed trafficable use or protected use only.
        </p>
      </div>
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

export function PUProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">10 products — 6 brands — PU and PU-hybrid membranes only — scroll to view all</p>
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

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              PU and PU-hybrid membrane equivalents across brands active in Australian Class 2 strata remediation. * Confirm product chemistry with manufacturer.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>ARDEX</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#0ea5e9" }}>Davco</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#8b5cf6" }}>Bostik</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Tremco</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f59e0b" }}>Gripset</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.system}
                  </td>
                  {[row.ardex, row.sika, row.davco, row.bostik, row.tremco, row.gripset].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? <span className="text-slate-300">—</span> : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
