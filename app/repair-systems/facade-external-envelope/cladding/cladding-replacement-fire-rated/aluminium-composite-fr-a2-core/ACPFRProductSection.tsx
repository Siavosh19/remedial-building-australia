"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "A2-core"
  | "FR-core"
  | "Mineral-core"
  | "PVDF-finish"
  | "Powder-coat"
  | "FEVE-finish"
  | "NCC-2022"
  | "AS-5113"
  | "AS-1530"
  | "Coastal"
  | "4mm"
  | "3mm"
  | "High-rise"
  | "Australian-brand";

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
    fullLabel: "3A Composites — Alucobond",
    brandUrl: "https://www.alucobond.com/au",
    tdsUrl: "https://www.alucobond.com/au/products/alucobond-a2",
    accentColor: "#e2003a",
    name: "Alucobond A2 — Mineral Core ACP",
    descriptionLine: "4 mm ACP with A2 mineral composite core — EN 13501-1 A2-s1,d0 classified — the benchmark fire-rated ACP replacement panel for NCC 2022 Class 2–9 buildings in Australia — factory PVDF finish",
    productType: "A2 mineral core ACP — 4 mm — NCC 2022 compliant cladding replacement",
    filterTags: ["A2-core", "Mineral-core", "PVDF-finish", "NCC-2022", "AS-5113", "AS-1530", "Coastal", "4mm", "High-rise"],
    techChips: [
      { label: "A2-s1,d0", cls: "bg-red-100 text-red-800" },
      { label: "Mineral Core", cls: "bg-red-100 text-red-800" },
      { label: "NCC 2022", cls: "bg-orange-100 text-orange-800" },
      { label: "4 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "PVDF Finish", cls: "bg-blue-100 text-blue-800" },
      { label: "Coastal", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "Alucobond A2 is a 4 mm aluminium composite panel comprising two 0.5 mm aluminium skins bonded to a non-combustible mineral-filled core. Classified A2-s1,d0 to EN 13501-1 — equivalent to limited-combustible — it is one of the first A2-rated ACP products to reach the Australian market and remains a benchmark specification for NCC 2022 compliant cladding replacement on Class 2–9 buildings. Factory-finished with Alucobond's PVDF coating system providing 30-year finish warranty, Alucobond A2 satisfies the AS 5113 Group 1 requirement for external facades on buildings above 3 storeys when supported by current fire test documentation. Fabrication must be by a licensed Alucobond fabricator using CNC routing.",
    technicalProperties: [
      "Panel thickness: 4 mm nominal — 0.5 mm aluminium skins + A2 mineral composite core",
      "Fire classification: A2-s1,d0 (EN 13501-1) — limited combustible; satisfies AS 5113 Group 1 under current test reports",
      "Core: mineral composite — non-organic binder matrix, no PE content",
      "Finish: factory PVDF coating — Kynar 500 binder; 30-year finish warranty available",
      "PVDF colour retention: ΔE < 5 at 10 years Florida exposure — AAMA 2605 equivalent",
      "Panel weight: approximately 7.5 kg/m² (4 mm) — significantly lighter than solid aluminium",
      "Bend/fold capacity: CNC routed returns up to 90° without skin perforation when routed by licensed fabricator",
      "Available dimensions: standard sheet 3200 × 1500 mm; custom sizes to order",
    ],
    limitations: [
      "A2 classified — not fully non-combustible; fire engineer must confirm acceptability where NCC mandates non-combustible",
      "Current fire test report (ETA or NCC product statement) must match specific product batch and configuration — verify before specifying",
      "Fabrication by licensed Alucobond fabricator only — site cutting without routing causes skin delamination at bends",
      "Chrome pretreatment and PVDF system required for full warranty — powder-coat option sacrifices some UV performance",
      "Lead time for custom colours and non-standard sizes — project planning required; not available off the shelf",
      "AS 5113 test report must cover the specific panel attachment method and cavity configuration of the installation",
    ],
    procurementSources: [
      { name: "Alucobond Australia — Official", url: "https://www.alucobond.com/au" },
      { name: "Alucobond AU Distributor Network", url: "https://www.alucobond.com/au/contact" },
    ],
  },
  {
    fullLabel: "Fairview Architectural — Vitrabond",
    brandUrl: "https://www.fairviewarchitectural.com.au",
    tdsUrl: "https://www.fairviewarchitectural.com.au/vitrabond",
    accentColor: "#0369a1",
    name: "Vitrabond FR — Fire-Resistant Core ACP",
    descriptionLine: "Australian-manufactured FR-core ACP — Fairview Architectural's flagship cladding remediation panel — widely used in Australian strata cladding replacement projects — tested to AS 1530.3 and AS 5113",
    productType: "FR-core ACP — 4 mm — Australian manufactured — NCC 2022 compliant",
    filterTags: ["FR-core", "Mineral-core", "PVDF-finish", "Powder-coat", "NCC-2022", "AS-5113", "AS-1530", "Coastal", "4mm", "High-rise", "Australian-brand"],
    techChips: [
      { label: "FR Core", cls: "bg-blue-100 text-blue-800" },
      { label: "Australian Made", cls: "bg-blue-100 text-blue-800" },
      { label: "NCC 2022", cls: "bg-orange-100 text-orange-800" },
      { label: "AS 5113", cls: "bg-sky-100 text-sky-800" },
      { label: "PVDF / Powder", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "Vitrabond FR is manufactured by Fairview Architectural — an Australian company — and is one of the most widely specified ACP products in Australian cladding remediation projects following the NCC 2022 amendments. The FR-core product uses a modified mineral composite core that achieves Group 1 or Group 2 classification to AS 5113 (Australian fire facade test) — the relevant standard for NCC 2022 Section C compliance. Available with PVDF coating (Kynar 500 binder) or a range of powder-coat finishes. Fairview's Australian presence, established fabricator network, and comprehensive NCC compliance documentation make it the default choice for many Australian cladding replacement scopes. The Vitrabond A2 variant (mineral core) is also available where A2 classification to EN 13501-1 is specifically required.",
    technicalProperties: [
      "Panel thickness: 4 mm nominal — 0.5 mm aluminium skins + FR mineral composite core",
      "Fire classification: AS 5113 Group 1 (or Group 2 depending on configuration) — NCC 2022 Section C compliant",
      "AS 1530.3 tested — spread of flame and heat evolved results within NCC limits",
      "PVDF finish: Kynar 500 binder; AAMA 2604/2605 equivalent performance",
      "Powder-coat finish: superdurable polyester; AAMA 2604 minimum",
      "Panel weight: approximately 7.5 kg/m² (4 mm)",
      "Colour range: PVDF range (500+ colours) and powder-coat range; RAL colours available",
      "Australian stock held locally — reduced lead time vs imported products",
    ],
    limitations: [
      "FR-core is not A2 classified — where A2 (EN 13501-1) is specifically required, Vitrabond A2 variant must be specified instead",
      "Fire test report scope must be confirmed to cover the specific installation — panel configuration, fixings, cavity, substrate must match",
      "Fabrication by licensed Vitrabond fabricator required — CNC routing essential for corner returns",
      "Powder-coat finish has lower UV stability than PVDF — specify PVDF for coastal or high-UV exposure facades",
      "Panel test reports are configuration-specific — do not transfer test reports between different installation methods",
      "Some earlier Vitrabond batches (pre-NCC 2022) may have different test scope — confirm current report version",
      "TODO: owner confirm — Fairview has rebranded; Vitrabond not confirmed in current product range at fairviewarchitectural.com.au (current range shows Vitradual, Vitracore G2, Stryüm, Solara, Genesis) — verify current Vitrabond FR availability and product name before specifying",
    ],
    procurementSources: [
      { name: "Fairview Architectural — Vitrabond", url: "https://www.fairviewarchitectural.com.au/vitrabond" },
      { name: "Fairview Architectural AU", url: "https://www.fairviewarchitectural.com.au" },
    ],
  },
  {
    fullLabel: "Mitsubishi Chemical — Alpolic",
    brandUrl: "https://www.alpolic.com.au",
    tdsUrl: "https://www.alpolic.com.au/products/alpolic-a2",
    accentColor: "#7c3aed",
    name: "Alpolic FR/A2 — Mineral Core ACP",
    descriptionLine: "Mitsubishi Chemical's flagship A2 mineral core ACP — Alpolic FR/A2 provides A2 fire classification with optional Lumiflon FEVE coating for premium UV stability — widely used in Australian high-rise cladding replacement",
    productType: "A2 mineral core ACP — 4 mm — Lumiflon FEVE or PVDF coating options",
    filterTags: ["A2-core", "FR-core", "Mineral-core", "PVDF-finish", "FEVE-finish", "NCC-2022", "AS-5113", "AS-1530", "Coastal", "4mm", "3mm", "High-rise"],
    techChips: [
      { label: "A2 Mineral Core", cls: "bg-purple-100 text-purple-800" },
      { label: "Lumiflon FEVE", cls: "bg-purple-100 text-purple-800" },
      { label: "NCC 2022", cls: "bg-orange-100 text-orange-800" },
      { label: "AS 5113", cls: "bg-violet-100 text-violet-800" },
      { label: "4mm / 3mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "Alpolic is manufactured by Mitsubishi Chemical Infratec and is one of the two globally recognised benchmark A2-core ACP systems alongside Alucobond. The Australian Alpolic range includes FR (fire-retardant) and A2 (mineral core) variants, both tested to AS 5113 and AS 1530.3. Alpolic's point of difference is the availability of Lumiflon FEVE (fluoroethylene vinyl ether) coating — a fluoropolymer coating with even greater UV stability than PVDF, typically specified for extreme UV exposure or very long warranty requirements. The product is available in 3 mm and 4 mm thicknesses, making it suitable for a wider range of applications including lighter-weight secondary elements. Alpolic is distributed in Australia through Metalply and selected specialist facade material suppliers.",
    technicalProperties: [
      "Panel thickness: 3 mm and 4 mm nominal — 0.5 mm aluminium skins + A2 mineral composite core",
      "Fire classification: A2 mineral core variant — A2 (EN 13501-1) and AS 5113 Group 1",
      "FR-core variant: tested to AS 1530.3 and AS 5113 — Group 1 or 2 (confirm test report for configuration)",
      "Lumiflon FEVE coating: superior UV stability beyond PVDF — 25+ year colour retention in extreme exposure",
      "PVDF coating: Kynar 500 binder — AAMA 2604/2605 performance",
      "3 mm panel available — suitable for fascias, soffits, and secondary cladding elements",
      "Panel weight: 5.5 kg/m² (3 mm) / 7.5 kg/m² (4 mm) — lighter 3 mm reduces dead load",
      "Wide standard colour range with custom colour manufacturing available",
    ],
    limitations: [
      "Multiple product lines (PE-core, FR-core, A2-core) available in similar packaging — always verify core type on delivery documentation",
      "Lumiflon FEVE coating commands premium price over PVDF — specify only where the UV performance uplift is needed",
      "Distributor network smaller than Alucobond or Vitrabond in Australia — confirm local stock availability before specifying on time-critical projects",
      "Fire test report must be current and match the specific product configuration and installation method",
      "3 mm panel has lower rigidity — engineering review required for large panel spans or high-wind-load zones",
      "Fabrication by licensed Alpolic fabricator required — standard sheet metal tooling will damage the panel at corners",
    ],
    procurementSources: [
      { name: "Alpolic Australia — Official", url: "https://www.alpolic.com.au" },
      { name: "Metalply — Alpolic Distributor AU", url: "https://www.metalply.com.au" },
    ],
  },
  {
    fullLabel: "EuroBond International",
    brandUrl: "https://www.eurobond.com.au",
    accentColor: "#b45309",
    name: "EuroBond FR A2 — Mineral Core ACP",
    descriptionLine: "EuroBond FR A2 is a 4 mm mineral core ACP system available in Australia — independently fire-tested to AS 1530.3 and AS 5113 — competitive pricing with comprehensive NCC 2022 compliance documentation",
    productType: "FR/A2 mineral core ACP — 4 mm — NCC 2022 compliant cladding replacement",
    filterTags: ["A2-core", "FR-core", "Mineral-core", "PVDF-finish", "Powder-coat", "NCC-2022", "AS-5113", "AS-1530", "Coastal", "4mm"],
    techChips: [
      { label: "FR / A2 Core", cls: "bg-amber-100 text-amber-800" },
      { label: "NCC 2022", cls: "bg-orange-100 text-orange-800" },
      { label: "AS 5113", cls: "bg-amber-100 text-amber-800" },
      { label: "4 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "PVDF / Powder", cls: "bg-yellow-100 text-yellow-800" },
      { label: "Coastal", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "EuroBond FR A2 is manufactured and supplied into the Australian market by EuroBond International, offering a competitively priced alternative to the major European and Japanese ACP brands. The product range includes both FR-core (fire-retardant modified core) and A2 mineral core variants, independently tested to AS 1530.3 and AS 5113 for NCC 2022 compliance documentation. EuroBond holds current fire test reports for its Australian product configurations and maintains a network of approved fabricators. Both PVDF and powder-coat surface finishes are available across a standard colour range. The product is commonly specified on mid-tier Australian residential and mixed-use cladding remediation projects where cost is a key driver and A2-equivalent performance is required.",
    technicalProperties: [
      "Panel thickness: 4 mm nominal — 0.5 mm aluminium skins + mineral composite core",
      "FR-core variant: tested to AS 1530.3 and AS 5113 — Group 1 or 2 classification",
      "A2 mineral core variant: A2 classification (EN 13501-1) available — confirm with supplier",
      "PVDF finish: Kynar 500 binder — standard PVDF colour range",
      "Powder-coat finish: AAMA 2604 minimum performance in superdurable grade",
      "Panel weight: approximately 7.5 kg/m² (4 mm) — similar to other 4 mm ACP products",
      "Fire test reports: AS 1530.3 and AS 5113 — confirm test report covers your installation configuration",
      "Standard colour range with custom colours on minimum order",
    ],
    limitations: [
      "Less established brand recognition than Alucobond, Alpolic, or Vitrabond — some specifiers require major brand only",
      "Fire test report scope must be carefully reviewed — confirm it covers the specific panel configuration, fixings, and installation method",
      "Fabricator network smaller than major brands — confirm licensed fabricator availability in project location",
      "Lead time for custom colours may be extended — stock standard colours for time-critical remediation projects",
      "Confirm current NCC 2022 compliance documentation and that the test report has not expired or been superseded",
      "Do not substitute FR-core for A2-core without fire engineer confirmation of acceptability",
    ],
    procurementSources: [
      { name: "EuroBond International — AU", url: "https://www.eurobond.com.au" },
      { name: "EuroBond Products", url: "https://www.eurobond.com.au/products" },
    ],
  },
  {
    fullLabel: "Kingspan Architectural",
    brandUrl: "https://www.kingspan.com/au",
    accentColor: "#059669",
    name: "Kingspan Benchmark FR-Core ACP",
    descriptionLine: "Kingspan's FR-core 4 mm ACP — fire-retardant modified core tested to AS 1530.3 and AS 5113 — widely available in Australia through Kingspan's established supply chain — suitable where fire engineering confirms FR-core acceptability",
    productType: "FR-core ACP — 4 mm — AS 1530.3 and AS 5113 tested",
    filterTags: ["FR-core", "PVDF-finish", "Powder-coat", "NCC-2022", "AS-5113", "AS-1530", "Coastal", "4mm"],
    techChips: [
      { label: "FR Core", cls: "bg-emerald-100 text-emerald-800" },
      { label: "AS 5113", cls: "bg-emerald-100 text-emerald-800" },
      { label: "NCC 2022", cls: "bg-orange-100 text-orange-800" },
      { label: "4 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "PVDF / Powder", cls: "bg-green-100 text-green-800" },
      { label: "Coastal", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "Kingspan Benchmark FR-core is a 4 mm aluminium composite panel with a fire-retardant modified polyethylene core manufactured by Kingspan — an international facade systems company with a strong Australian presence. The FR-core product achieves a limited-combustible classification when tested to AS 1530.3 and carries AS 5113 test results applicable to NCC 2022 Section C compliance (subject to fire engineering confirmation). The product is commonly used in Australian cladding remediation projects where fire engineering has confirmed FR-core as an acceptable replacement under the specific building's fire safety strategy. Available in PVDF and powder-coat finishes across Kingspan's standard colour range, with an established Australian supply chain and fabricator network.",
    technicalProperties: [
      "Panel thickness: 4 mm nominal — 0.5 mm aluminium skins + FR-modified core",
      "Core: FR-modified — reduces combustibility vs PE core; not classified A2",
      "Fire classification: tested to AS 1530.3 and AS 5113 — Group 1 or 2 (installation-specific)",
      "Finish: PVDF (Kynar 500) and powder-coat superdurable options",
      "Panel weight: approximately 7.5 kg/m² — same as A2-core 4 mm panels",
      "Colour range: Kingspan standard powder-coat and PVDF range; RAL custom colours available",
      "Established AU supply chain — strong availability through Kingspan's Australian distribution network",
      "Installation: requires CNC-routed corners by licensed fabricator",
    ],
    limitations: [
      "FR-core — not A2 classified; fire engineering review mandatory before use on buildings requiring A2 or non-combustible",
      "Cannot replace failed PE-core cladding without fire engineer written confirmation that FR-core satisfies the NCC provision for the specific building",
      "AS 5113 test report scope is configuration-specific — confirm it covers your panel, attachment, cavity, and substrate",
      "Fire engineer documentation must be obtained and held in the project file — do not proceed without written engineering acceptance",
      "Powder-coat finish: lower UV and chalk resistance than PVDF — PVDF preferred for coastal and long-life applications",
      "Product test reports may differ between market regions — confirm report applies to the Australian product variant",
    ],
    procurementSources: [
      { name: "Kingspan Australia — Facades", url: "https://www.kingspan.com/au/en-au/products/facades" },
      { name: "Kingspan AU", url: "https://www.kingspan.com/au" },
    ],
  },
  {
    fullLabel: "Alucoil Australia",
    brandUrl: "https://www.alucoil.com",
    tdsUrl: "https://www.alucoil.com/en/products/larson-fr",
    accentColor: "#dc2626",
    name: "Alucoil Larson FR/A2 — Mineral Core ACP",
    descriptionLine: "Alucoil Larson FR/A2 — Spanish-manufactured ACP available in Australia — A2 mineral core variant (Larson A2) achieves EN 13501-1 A2 classification — suitable for NCC 2022 Class 2–9 cladding replacement with fire test documentation",
    productType: "FR/A2 mineral core ACP — 4 mm — EN 13501-1 A2 classified — Australian import",
    filterTags: ["A2-core", "FR-core", "Mineral-core", "PVDF-finish", "Powder-coat", "NCC-2022", "AS-5113", "AS-1530", "Coastal", "4mm"],
    techChips: [
      { label: "A2 Mineral Core", cls: "bg-red-100 text-red-800" },
      { label: "EN 13501-1", cls: "bg-red-100 text-red-800" },
      { label: "NCC 2022", cls: "bg-orange-100 text-orange-800" },
      { label: "4 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "PVDF Finish", cls: "bg-blue-100 text-blue-800" },
      { label: "Coastal", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "Alucoil Larson FR/A2 is manufactured by Alucoil (Spain) — a major European ACP manufacturer — and is imported into the Australian market through specialist facade material distributors. The Larson A2 variant uses a mineral composite core achieving A2-s1,d0 classification to EN 13501-1, comparable to Alucobond A2 and Alpolic A2. Australian import testing to AS 1530.3 and AS 5113 is required before the product can be specified for NCC 2022 compliance — confirm that current AU-applicable fire test reports are held by the local distributor. The PVDF-finished variant (Kynar 500 binder) provides long-term UV stability suited to Australian exposure conditions. Alucoil Larson is typically positioned as a cost-competitive alternative to the major European A2 brands while maintaining equivalent fire performance.",
    technicalProperties: [
      "Panel thickness: 4 mm nominal — 0.5 mm aluminium skins + A2 mineral composite core",
      "Fire classification: A2-s1,d0 (EN 13501-1) — Larson A2 variant; FR variant achieves limited-combustible",
      "Australian testing: AS 1530.3 and AS 5113 test reports required — confirm availability with AU distributor",
      "Finish: PVDF (Kynar 500) — AAMA 2604/2605 performance; powder-coat superdurable available",
      "Panel weight: approximately 7.5 kg/m² (4 mm) — equivalent to other 4 mm ACP products",
      "Colour range: standard PVDF range and custom colours — lead time for custom",
      "Core visibility in cross-section: mineral core appears grey-white — distinguishable from PE (clear white)",
      "European manufacturing quality control — consistent skin thickness and core density",
    ],
    limitations: [
      "Import product — longer lead time than Australian-stocked brands; supply chain risk on time-critical remediation projects",
      "Australian AS 5113 fire test report must be verified with local distributor — EN 13501-1 report alone does not satisfy NCC 2022 compliance",
      "Distributor network limited compared to Alucobond, Vitrabond, or Alpolic — confirm licensed fabricator availability in project location",
      "Local stock of standard colours may not be held — most orders fabricated from imported sheet to order",
      "Fire test report scope (covering AU installation configuration) must be current — confirm with distributor before specifying",
      "Brand familiarity lower in Australia than major established brands — may face resistance from some project stakeholders",
    ],
    procurementSources: [
      { name: "Alucoil — Larson FR/A2", url: "https://www.alucoil.com/en/products/larson-fr" },
      { name: "Alucoil Official", url: "https://www.alucoil.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "A2-core", label: "A2 core" },
  { id: "FR-core", label: "FR core" },
  { id: "Mineral-core", label: "Mineral core" },
  { id: "PVDF-finish", label: "PVDF finish" },
  { id: "Powder-coat", label: "Powder-coat" },
  { id: "FEVE-finish", label: "FEVE finish" },
  { id: "NCC-2022", label: "NCC 2022" },
  { id: "AS-5113", label: "AS 5113" },
  { id: "AS-1530", label: "AS 1530" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "4mm", label: "4 mm" },
  { id: "3mm", label: "3 mm" },
  { id: "High-rise", label: "High-rise" },
  { id: "Australian-brand", label: "Australian brand" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  core: string;
  fireClass: string;
  ncc2022: string;
  finish: string;
  coastal: string;
  primaryUse: string;
}[] = [
  { product: "Alucobond A2", brand: "3A Composites", core: "A2 mineral", fireClass: "A2-s1,d0", ncc2022: "Compliant", finish: "PVDF", coastal: "Yes", primaryUse: "High-rise cladding replacement" },
  { product: "Vitrabond FR", brand: "Fairview (AU)", core: "FR mineral", fireClass: "AS 5113 Gp1/2", ncc2022: "Compliant", finish: "PVDF / Powder", coastal: "Yes", primaryUse: "AU remediation — most common" },
  { product: "Alpolic FR/A2", brand: "Mitsubishi Chem.", core: "A2 / FR mineral", fireClass: "A2 / AS 5113", ncc2022: "Compliant", finish: "PVDF / FEVE", coastal: "Yes", primaryUse: "High-rise — UV premium spec" },
  { product: "EuroBond FR A2", brand: "EuroBond Intl.", core: "FR / A2 mineral", fireClass: "AS 5113 Gp1/2", ncc2022: "Compliant", finish: "PVDF / Powder", coastal: "Yes", primaryUse: "Mid-tier remediation" },
  { product: "Benchmark FR", brand: "Kingspan", core: "FR modified", fireClass: "AS 5113 (f/e req.)", ncc2022: "F/E required", finish: "PVDF / Powder", coastal: "Yes", primaryUse: "Where F/E accepts FR-core" },
  { product: "Larson FR/A2", brand: "Alucoil", core: "A2 / FR mineral", fireClass: "A2-s1,d0 (EN)", ncc2022: "Confirm AU test", finish: "PVDF / Powder", coastal: "Yes", primaryUse: "Cost-competitive A2 option" },
];

const TECH_INFO = {
  typicalApplications: [
    "NCC 2022 compliant replacement of combustible PE-core ACP on Class 2–9 buildings above 3 storeys",
    "Remediation of post-Lacrosse and post-Neo200 fire defect notices requiring cladding removal and replacement",
    "High-rise residential towers — curtain wall, spandrel panels, and sunshade replacement with A2 mineral core ACP",
    "Mixed-use commercial and residential podium facades where the original PE-core ACP has failed fire audits",
    "Secondary cladding elements — fascias, soffits, bulkheads — where ACP is appropriate and A2/FR compliance is required",
    "New-build specification where ACP is selected as the facade material and NCC 2022 fire compliance must be designed in",
  ],
  selectionCriteria: [
    "A2 mineral core vs FR-core: A2 mineral core (Alucobond A2, Alpolic A2, EuroBond A2, Alucoil Larson A2) preferred — achieves highest ACP fire classification; FR-core requires fire engineering acceptance",
    "PVDF vs powder-coat: PVDF (Kynar 500) specified for all coastal, high-UV and long-life applications; powder-coat acceptable for low-UV or sheltered locations; FEVE (Alpolic Lumiflon) for extreme UV/ultra-long-life specification",
    "Australian-made: Vitrabond FR (Fairview Architectural) is Australian-manufactured — shorter lead time, established AU fabricator network, and strong local compliance documentation",
    "Fire test report: confirm the product has current AS 5113 and AS 1530.3 test reports covering the specific installation configuration — panel, fixings, cavity, substrate — before specifying",
    "Fabricator network: specify only products with a licensed fabricator in the project's location — incorrect fabrication invalidates fire performance and warranty",
    "Budget: Alucobond A2 and Alpolic A2 at premium; Vitrabond FR and EuroBond mid-range; Kingspan Benchmark FR lowest cost",
  ],
  limitations: [
    "A2 mineral core ACP is not classified as non-combustible — fire engineer must confirm whether A2-core satisfies NCC provisions for the specific building",
    "Fire test reports are product-configuration-specific — a report for one fixing type and cavity depth does not apply to a different installation method",
    "PE-core ACP cannot be identified by appearance alone in the installed state — always review original product data sheets and test reports",
    "All ACP requires CNC routing by a licensed fabricator — site-cut corners cause skin perforation and panel delamination at return bends",
    "Colour consistency between batches — for large facade replacements, order all panels from a single batch to avoid visible variation",
    "ACP remediation requires removal of all failed cladding before replacement — patching or overcladding does not satisfy NCC fire compliance",
  ],
  standardsNotes: [
    "NCC 2022 Volume One Section C: external walls of Class 2–9 buildings above 3 storeys must be non-combustible or achieve AS 5113 Group 1/2 — fire engineer must confirm product compliance for the specific building",
    "AS 5113:2016 (Amd 1 2020): Australian standard for fire propagation test of external wall systems — the principal NCC compliance test for ACP remediation",
    "AS 1530.3: Australian early fire hazard test — spread of flame and heat evolved indices; used in conjunction with AS 5113 for NCC compliance",
    "EN 13501-1: European fire classification standard — A2-s1,d0 is the classification for A2 mineral core ACP; s1 = limited smoke, d0 = no flaming droplets",
    "ABCB (Australian Building Codes Board) Advisory: ACP with PE core does not comply with NCC 2022 for Class 2–9 buildings; A2/FR ACP must hold current AS 5113 Group 1 or 2 test report for the proposed installation",
    "AS 3715:2002: Australian standard for architectural aluminium coating — references PVDF and powder-coat performance grades for external facade applications",
  ],
  suitableDefects: [
    "Combustible PE-core ACP identified through fire audit or defect notice — primary cladding crisis remediation scenario",
    "Delaminated, chalked, or failed PVDF/powder-coat on existing ACP panels — where panel replacement is more cost-effective than recoating",
    "Structurally compromised ACP panels — impact damage, water ingress between skins, or subframe corrosion requiring full panel removal",
    "Non-compliant cladding identified in Section 166 defect notice under the Design and Building Practitioners Act 2020 (NSW) or equivalent State legislation",
    "Post-fire-investigation ACP removal orders issued by the local fire authority or building regulator",
    "ACP installation without fire test evidence — specification replacement required before building occupancy certification",
  ],
  typicalSubstrates: [
    "Aluminium top-hat subframe (extruded aluminium rail) fixed to concrete or masonry structure",
    "Aluminium Z-rail or hat-section subframe systems on steel or concrete framing",
    "Helping-hand bracket systems off concrete slab edges or spandrel beams",
    "Steel hot-dip galvanised subframe — stainless or galvanised fixings required",
    "Existing concrete or masonry facade — direct fix via aluminium angle or subframe",
    "Curtain wall aluminium framing — replacement cladding panels installed into existing grid where frame is retained",
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

export function ACPFRIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are aluminium composite panels with FR/A2 mineral core?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          ACP with A2 mineral core or FR-rated core is the primary replacement product for standard polyethylene-core ACP that fails NCC 2022 combustibility requirements. A2 mineral core panels achieve the highest fire classification for ACP systems and are the preferred specification for NCC 2022 compliant cladding replacement on Class 2–9 buildings in Australia.
        </p>
        {expanded && (
          <>
            <p>
              Australia's cladding crisis — following the Lacrosse fire (Melbourne 2014) and Neo200 fire (Melbourne 2019) — resulted in NCC 2022 requiring that external walls of Class 2–9 buildings above 3 storeys achieve a Group 1 or Group 2 result to AS 5113. Standard PE-core ACP fails this test. A2 mineral core ACP — where the PE core is replaced with a mineral composite that has negligible organic content — achieves the required AS 5113 group result when tested in the specific installation configuration.
            </p>
            <p>
              Critical to NCC 2022 compliance is the fire test report: the AS 5113 report must be for the specific product, tested in the specific installation configuration. A fire test report for one configuration does not transfer to a different installation. Every specifier and builder working on ACP remediation projects must obtain and verify the current fire test report for their specific installation before specification or installation proceeds.
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

export function ACPFRProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">6 products — 6 brands — FR/A2 mineral core ACP systems — scroll to view all</p>
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
              Side-by-side comparison of FR/A2 mineral core ACP systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Core type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fire class</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC 2022</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal rated</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.core}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fireClass}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.ncc2022}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
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
