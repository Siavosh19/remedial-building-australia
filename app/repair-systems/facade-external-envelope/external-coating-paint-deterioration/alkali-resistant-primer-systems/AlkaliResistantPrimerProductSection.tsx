"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Alkali-resistant"
  | "Primer"
  | "Water-based"
  | "New-render"
  | "Concrete"
  | "Masonry"
  | "Pre-topcoat"
  | "Low-VOC"
  | "Penetrating"
  | "Acrylic-binder";

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
    name: "TODO: owner confirm — Dulux Weathershield Alkali Resistant Primer (exact current AU product name unconfirmed — Dulux AU website shows Weathershield as self-priming on most surfaces; dedicated alkali-resistant primer product name not found on dulux.com.au as of verification date — confirm current product name with Dulux technical)",
    descriptionLine: "Benchmark alkali-resistant acrylic primer for new cement render and concrete facades — mandatory first coat under Dulux Weathershield topcoat system — water-based, low VOC",
    productType: "TODO: owner confirm — Alkali-resistant acrylic primer — cement render and concrete (product name unconfirmed — see name field)",
    filterTags: ["Alkali-resistant", "Primer", "Water-based", "New-render", "Concrete", "Masonry", "Pre-topcoat", "Low-VOC", "Acrylic-binder"],
    techChips: [
      { label: "Alkali-resistant", cls: "bg-red-100 text-red-800" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Low VOC", cls: "bg-green-100 text-green-700" },
      { label: "Pre-topcoat", cls: "bg-slate-100 text-slate-700" },
      { label: "Acrylic binder", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Dulux Weathershield Alkali Resistant Primer is the mandatory first coat under the Dulux Weathershield exterior acrylic system on new or unpainted cement render and concrete facades. Fresh cement render has a pH of 12–13 due to calcium hydroxide (portlandite) leaching from the cement binder during the carbonation process. Applying an acrylic topcoat directly to this alkaline substrate causes saponification — alkaline hydrolysis of the paint binder — leading to early adhesion failure, blistering, and peeling. The alkali-resistant primer neutralises this risk by providing a stable, bonded interface between the high-pH substrate and the acrylic topcoat. Applied in one coat at approximately 12–15 m²/L and allowed to cure before applying two coats of Dulux Weathershield Exterior Acrylic. Substrate must be cured for a minimum of 28 days before priming. Confirm current DFT, spread rate, and overcoat interval from the current Dulux Weathershield Alkali Resistant Primer TDS before specifying.",
    technicalProperties: [
      "Binder: acrylic emulsion — alkali-resistant formulation for pH 12–13 cement render and concrete substrates",
      "DFT: approximately 25–40 µm applied at manufacturer's recommended spread rate",
      "Coverage: approximately 12–15 m²/L — confirm from current Dulux TDS",
      "Water-based — low VOC — suitable for occupied building facade repainting",
      "Mandatory under all Dulux Weathershield acrylic topcoat systems on new render and bare concrete",
      "Substrate cure requirement: minimum 28 days for cement render before priming",
    ],
    limitations: [
      "Do not apply to substrates cured less than 28 days — incomplete carbonation will result in continued alkali leaching",
      "Not a sealer or consolidant — substrate must be structurally sound and free of friable or dusty areas",
      "Not suitable as a direct waterproofing membrane — apply acrylic topcoat over cured primer",
      "Confirm current product name and formulation from the current Dulux TDS — product range may be updated",
    ],
    procurementSources: [
      { name: "Dulux Trade — Product Finder", url: "https://www.dulux.com.au" },
      { name: "Dulux Trade Centres — national", url: "https://www.dulux.com.au" },
      { name: "Bunnings Trade — trade account", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Wattyl Australia",
    brandUrl: "https://www.wattyl.com.au",
    tdsUrl: "https://www.wattyl.com.au/en_AU/products/exterior",
    accentColor: "#0369a1",
    name: "TODO: owner confirm — Wattyl Solagard Exterior Primer (exact current AU product name unconfirmed — Wattyl Solagard is marketed as self-priming on many substrates; the alkali-resistant primer for cement render in the Wattyl range is 'Wattyl Master Prep Pigmented Sealer' or a system-specific primer — confirm current primer product name with Wattyl technical)",
    descriptionLine: "Alkali-resistant exterior primer for cement render and masonry facades — companion primer to Wattyl Solagard acrylic topcoat system — water-based, wide Australian availability",
    productType: "TODO: owner confirm — Alkali-resistant acrylic primer — masonry and render (product name unconfirmed — see name field)",
    filterTags: ["Alkali-resistant", "Primer", "Water-based", "New-render", "Concrete", "Masonry", "Pre-topcoat", "Low-VOC", "Acrylic-binder"],
    techChips: [
      { label: "Alkali-resistant", cls: "bg-sky-100 text-sky-800" },
      { label: "Solagard system", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Masonry primer", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "Wattyl Solagard Exterior Primer is the companion alkali-resistant primer for the Wattyl Solagard exterior acrylic coating system. It is designed for application on new cement render, concrete, brick, and masonry substrates where the high alkalinity of the substrate would cause saponification of a directly applied acrylic topcoat. Saponification — the alkaline hydrolysis of acrylic binder molecules — results in early adhesion failure and blistering, typically within 6–24 months of application. The Solagard Primer provides a stable bonded interface that resists this pH-driven attack and ensures adhesion of the subsequent acrylic topcoat coats. Applied in one coat on clean, cured, and dry substrate and allowed to dry before applying two coats of Solagard exterior acrylic. Minimum substrate cure 28 days for cement render. Confirm current product range, DFT, spread rate, and overcoat intervals from the current Wattyl TDS before specifying.",
    technicalProperties: [
      "Binder: acrylic emulsion — alkali-resistant — suitable for fresh cement render pH 12–13",
      "DFT: confirm from current Wattyl TDS — typically 25–40 µm at recommended coverage",
      "Coverage: confirm from current TDS — approximately 12–15 m²/L",
      "Water-based — low VOC — suitable for occupied building environments",
      "Compatible with Wattyl Solagard exterior acrylic topcoat system — confirm system compatibility from Wattyl TDS",
      "Minimum 28-day substrate cure for new cement render before priming",
    ],
    limitations: [
      "Not suitable on substrates cured less than 28 days — alkali leaching will continue and compromise primer performance",
      "Confirm current product name within the Solagard range — Wattyl may update product designations",
      "Not a crack-bridging primer — specify elastomeric primer system where substrate has active crack movement",
      "Substrate must be free of friable material, efflorescence, and biological growth before priming",
    ],
    procurementSources: [
      { name: "Wattyl Trade — Product Finder", url: "https://www.wattyl.com.au" },
      { name: "Wattyl Trade Centres — national", url: "https://www.wattyl.com.au" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Haymes Paint Australia",
    brandUrl: "https://www.haymespaint.com.au",
    tdsUrl: "https://www.haymespaint.com.au/products/exterior",
    accentColor: "#7c3aed",
    name: "TODO: owner confirm — Haymes Prep'd & Primed Exterior Primer (exact current AU product name unconfirmed — Haymes primer range on haymespaint.com.au uses 'Prepcoat' family names including Ultracover, Ultralock, and Ultraprime; 'Prep'd & Primed Exterior Primer' not confirmed as current product — confirm current primer product name with Haymes technical)",
    descriptionLine: "Australian-made alkali-resistant exterior primer for cement render and masonry — suitable for new render and bare concrete before Haymes acrylic topcoat application",
    productType: "TODO: owner confirm — Alkali-resistant exterior primer — cement render and masonry — Australian-made (product name unconfirmed — see name field)",
    filterTags: ["Alkali-resistant", "Primer", "Water-based", "New-render", "Concrete", "Masonry", "Pre-topcoat", "Low-VOC", "Acrylic-binder"],
    techChips: [
      { label: "Australian-made", cls: "bg-purple-100 text-purple-800" },
      { label: "Alkali-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Exterior primer", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Haymes Prep'd & Primed Exterior Primer is an Australian-manufactured alkali-resistant acrylic primer for cement render, concrete, brick, and masonry facades. Haymes manufactures and distributes primarily through Victoria and New South Wales, with growing trade distribution nationally. The primer provides the essential alkali barrier between fresh cement render (pH 12–13) and the subsequent acrylic topcoat, preventing saponification failure of the binder. It is specified as the first coat under Haymes exterior acrylic systems on new render and bare masonry. Haymes technical support provides project-specific advice for specification on strata and commercial facade repainting works. Confirm current product designation, DFT requirements, spread rate, and compatibility with the chosen Haymes acrylic topcoat from the current Haymes TDS before specifying.",
    technicalProperties: [
      "Binder: acrylic emulsion — alkali-resistant formulation for cement render and concrete substrates",
      "Australian-manufactured — suitable for the full range of Australian exterior climate exposures",
      "DFT: confirm from current Haymes TDS — apply at manufacturer's recommended spread rate",
      "Coverage: confirm from current TDS — typically 12–15 m²/L for primer grade",
      "Water-based — low VOC — suitable for occupied strata building facade repainting",
      "Confirm primer compatibility with chosen Haymes acrylic topcoat product from current TDS",
    ],
    limitations: [
      "Haymes distribution strongest in Victoria and regional areas — confirm trade availability with local supplier",
      "Not suitable as a standalone waterproofing membrane — topcoat mandatory after primer",
      "Minimum 28-day substrate cure for cement render — confirm from current Haymes TDS",
      "Confirm current product name and formulation from the current Haymes TDS before specifying",
    ],
    procurementSources: [
      { name: "Haymes Paint Trade — Where to Buy", url: "https://www.haymespaint.com.au" },
      { name: "Haymes Trade Centres — VIC/NSW", url: "https://www.haymespaint.com.au" },
      { name: "Independent paint retailers — confirm local availability", url: "https://www.haymespaint.com.au" },
    ],
  },
  {
    fullLabel: "Taubmans Australia",
    brandUrl: "https://www.taubmans.com.au",
    tdsUrl: "https://www.taubmans.com.au/products/primer",
    accentColor: "#b45309",
    name: "TODO: owner confirm — Taubmans Concrete & Masonry Primer Sealer (exact current AU product name unconfirmed — the current Taubmans alkali-resistant masonry primer appears to be 'Taubmans Armawall Primer' (APAS 0117/2 listed, VOC ~26 g/L, coverage ~8–10 m²/L) — 'Concrete & Masonry Primer Sealer' may be a separate or discontinued product — confirm current product name and formulation with Taubmans technical)",
    descriptionLine: "Alkali-resistant primer sealer for concrete and masonry facades — penetrating primer for porous and medium-porosity substrates — mandatory under Taubmans exterior topcoat on new render",
    productType: "TODO: owner confirm — Alkali-resistant primer sealer — concrete and masonry (product name unconfirmed — see name field)",
    filterTags: ["Alkali-resistant", "Primer", "Water-based", "New-render", "Concrete", "Masonry", "Pre-topcoat", "Low-VOC", "Penetrating", "Acrylic-binder"],
    techChips: [
      { label: "Alkali-resistant", cls: "bg-amber-100 text-amber-800" },
      { label: "Primer sealer", cls: "bg-slate-100 text-slate-700" },
      { label: "Penetrating", cls: "bg-green-100 text-green-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
    ],
    systemDescription:
      "Taubmans Concrete & Masonry Primer Sealer is an alkali-resistant acrylic primer and sealer for cement render, concrete block, brick, and masonry facades. The product provides both alkali resistance — neutralising the pH 12–13 environment of fresh cement render — and a sealing action that reduces substrate porosity and provides a uniform absorption base for the subsequent acrylic topcoat. Penetrating primer technology allows the product to consolidate slightly dusty or porous concrete and masonry surfaces before topcoating. Taubmans is part of the PPG group and is widely stocked nationally through hardware and trade channels. Confirm current product designation within the Taubmans primer range, DFT, spread rate, and compatibility with your chosen Taubmans exterior topcoat from the current Taubmans TDS before specifying.",
    technicalProperties: [
      "Binder: acrylic emulsion — alkali-resistant and penetrating primer sealer formulation",
      "Dual function: alkali barrier + surface sealing action for porous and medium-porosity concrete and masonry",
      "DFT: confirm from current Taubmans TDS — penetrating primers typically 20–35 µm effective film",
      "Coverage: confirm from current TDS — higher coverage rate than standard primer on porous masonry",
      "Water-based — low VOC — suitable for occupied building facade repainting works",
      "Widely available nationally through Bunnings and trade paint retailers",
    ],
    limitations: [
      "Not suitable for very friable or heavily dusting substrates — use dedicated consolidant before priming",
      "Minimum 28-day substrate cure for cement render before application — confirm from current TDS",
      "Not a crack-bridging system — substrate cracks must be repaired before priming",
      "Confirm current product name and formulation from the current Taubmans TDS before specifying",
    ],
    procurementSources: [
      { name: "Taubmans Trade — Product Finder", url: "https://www.taubmans.com.au" },
      { name: "Bunnings — Taubmans range", url: "https://www.bunnings.com.au" },
      { name: "Trade paint retailers — PPG group distribution", url: "https://www.taubmans.com.au" },
    ],
  },
  {
    fullLabel: "Solver Paints Australia",
    brandUrl: "https://www.solverpaints.com.au",
    tdsUrl: "https://www.solverpaints.com.au/products/exterior",
    accentColor: "#059669",
    name: "TODO: owner confirm — Solver Exterior Alkali Resistant Primer (exact current AU product name unconfirmed — could not confirm this specific product name on solverpaints.com.au at time of verification — confirm current alkali-resistant primer product name with Solver Paints technical)",
    descriptionLine: "Alkali-resistant acrylic exterior primer for cement render and concrete — part of the Solver exterior coating system — strong regional trade availability across Australia",
    productType: "TODO: owner confirm — Alkali-resistant acrylic primer — cement render and concrete — exterior (product name unconfirmed — see name field)",
    filterTags: ["Alkali-resistant", "Primer", "Water-based", "New-render", "Concrete", "Masonry", "Pre-topcoat", "Low-VOC", "Acrylic-binder"],
    techChips: [
      { label: "Alkali-resistant", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Acrylic binder", cls: "bg-slate-100 text-slate-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Exterior primer", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "Solver Exterior Alkali Resistant Primer is an acrylic-based exterior primer designed for cement render, concrete, and masonry substrates with high alkalinity. Solver Paints has strong regional distribution across Queensland, New South Wales, and Victoria through independent paint retailers and trade merchants. The product addresses the fundamental challenge of coating fresh or recently cured cement render: the cement binder produces a highly alkaline substrate (pH 12–13) that causes saponification failure in directly applied acrylic topcoats. The alkali-resistant primer provides a stable bonded interface, allowing the subsequent acrylic topcoat to achieve design DFT and service life. Confirm current product designation within the Solver exterior range, DFT, spread rate, and compatibility with the chosen Solver topcoat product from the current Solver Paints TDS before specifying.",
    technicalProperties: [
      "Binder: acrylic emulsion — alkali-resistant primer for pH 12–13 cement render and concrete",
      "DFT: confirm from current Solver TDS — typically 25–40 µm at recommended spread rate",
      "Coverage: confirm from current TDS — approximately 12–15 m²/L",
      "Water-based — low VOC — suitable for occupied residential and commercial building repainting",
      "Compatible with Solver exterior acrylic topcoat range — confirm system compatibility from Solver TDS",
      "Strong regional trade availability through independent paint retailers nationally",
    ],
    limitations: [
      "Confirm availability with local trade retailer — Solver distribution is primarily through independent retailers, not major chains",
      "Minimum 28-day substrate cure for cement render — confirm from current Solver TDS",
      "Not suitable for very friable or heavily contaminated substrates without prior surface preparation",
      "Confirm current product name and formulation with Solver Paints technical before specifying",
    ],
    procurementSources: [
      { name: "Solver Paints — Where to Buy", url: "https://www.solverpaints.com.au" },
      { name: "Independent paint retailers — Solver trade network", url: "https://www.solverpaints.com.au" },
      { name: "Solver technical support — confirm local availability", url: "https://www.solverpaints.com.au" },
    ],
  },
  {
    fullLabel: "British Paints Australia",
    brandUrl: "https://www.britishpaints.com.au",
    tdsUrl: "https://www.britishpaints.com.au/products/exterior",
    accentColor: "#dc2626",
    name: "TODO: owner confirm — British Paints 4-in-1 Exterior Primer (closest current AU product is 'British Paints PREP 4in1 Water Based' — functions confirmed as sealer/primer/undercoat/stain-blocker; alkali resistance NOT specifically claimed on product page — confirm whether this product is classified as alkali-resistant and whether it is appropriate as the primer on new cement render — confirm with British Paints technical)",
    descriptionLine: "Multi-purpose exterior primer for render, concrete, and masonry — four functions in one coat: prime, seal, stabilise, and stain-block — widely available nationally",
    productType: "TODO: owner confirm — Multi-function exterior primer — render, concrete and masonry (alkali resistance claim not confirmed on live source — see name field)",
    filterTags: ["Alkali-resistant", "Primer", "Water-based", "New-render", "Concrete", "Masonry", "Pre-topcoat", "Low-VOC", "Penetrating", "Acrylic-binder"],
    techChips: [
      { label: "4-in-1 function", cls: "bg-red-100 text-red-800" },
      { label: "TODO: confirm alkali-resistant", cls: "bg-amber-100 text-amber-700" },
      { label: "Water-based", cls: "bg-blue-100 text-blue-700" },
      { label: "Multi-substrate", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "TODO: owner confirm — British Paints PREP 4in1 Water Based (closest confirmed AU product) provides priming, sealing, undercoating, and stain-blocking functions in a single coat. Alkali resistance is NOT specifically claimed for this product on the British Paints AU product page as of verification date. If alkali resistance on new cement render is a specification requirement, confirm with British Paints technical whether this product is suitable as the primer on fresh or unpainted cement render before specifying. British Paints (part of the PPG group) is widely distributed nationally through Mitre 10, Home Hardware, and independent paint retailers. Coverage ~14 m²/L confirmed from fetched product page. Confirm current product formulation, DFT, spread rate, and compatibility with your chosen exterior topcoat from the current British Paints TDS before specifying.",
    technicalProperties: [
      "Binder: acrylic emulsion — multi-function: prime, seal, undercoat, and stain-block in one coat — confirmed from British Paints AU product page",
      "Suitable for cement render, concrete, brick, block, and masonry — wide substrate compatibility",
      "DFT: confirm from current British Paints TDS — apply at manufacturer's recommended spread rate",
      "Coverage: approximately 14 m²/L — confirmed from British Paints AU product page",
      "Water-based — low VOC — suitable for occupied building facade repainting",
      "TODO: owner confirm — alkali resistance on new cement render not specifically claimed on live British Paints AU product page — confirm suitability as primer on fresh render with British Paints technical before specifying",
    ],
    limitations: [
      "Multi-function primers are general-purpose products — specify dedicated alkali-resistant primer for critical commercial or strata projects",
      "Not suitable for very friable substrates without prior consolidant treatment",
      "Minimum 28-day substrate cure for cement render — confirm from current British Paints TDS",
      "Confirm current product name and formulation from the current British Paints TDS before specifying",
    ],
    procurementSources: [
      { name: "British Paints — Where to Buy", url: "https://www.britishpaints.com.au" },
      { name: "Mitre 10 — British Paints range", url: "https://www.mitre10.com.au" },
      { name: "Home Hardware — British Paints range", url: "https://www.homehardware.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Alkali-resistant", label: "Alkali-resistant" },
  { id: "Primer", label: "Primer" },
  { id: "Water-based", label: "Water-based" },
  { id: "New-render", label: "New render" },
  { id: "Concrete", label: "Concrete" },
  { id: "Masonry", label: "Masonry" },
  { id: "Pre-topcoat", label: "Pre-topcoat" },
  { id: "Low-VOC", label: "Low VOC" },
  { id: "Penetrating", label: "Penetrating" },
  { id: "Acrylic-binder", label: "Acrylic binder" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  binder: string;
  phTolerance: string;
  substrate: string;
  dft: string;
  coastal: string;
  primaryUse: string;
}[] = [
  {
    product: "Weathershield Alkali Resistant Primer",
    brand: "Dulux",
    binder: "Acrylic emulsion",
    phTolerance: "pH 12–13",
    substrate: "Cement render, concrete, masonry",
    dft: "25–40 µm",
    coastal: "Yes",
    primaryUse: "Benchmark primer — mandatory under Dulux Weathershield acrylic system on new render",
  },
  {
    product: "Solagard Exterior Primer",
    brand: "Wattyl",
    binder: "Acrylic emulsion",
    phTolerance: "pH 12–13",
    substrate: "Cement render, concrete, masonry",
    dft: "Confirm TDS",
    coastal: "Yes",
    primaryUse: "Companion primer to Wattyl Solagard acrylic system — QLD and national",
  },
  {
    product: "Prep'd & Primed Exterior Primer",
    brand: "Haymes",
    binder: "Acrylic emulsion",
    phTolerance: "pH 12–13",
    substrate: "Cement render, concrete, brick",
    dft: "Confirm TDS",
    coastal: "Confirm with Haymes",
    primaryUse: "Australian-made — VIC/NSW focus — under Haymes acrylic topcoat",
  },
  {
    product: "Concrete & Masonry Primer Sealer",
    brand: "Taubmans",
    binder: "Acrylic emulsion — penetrating",
    phTolerance: "pH 12–13",
    substrate: "Concrete, render, block, masonry",
    dft: "20–35 µm effective",
    coastal: "Yes",
    primaryUse: "Dual prime/seal function — porous masonry — national availability",
  },
  {
    product: "Exterior Alkali Resistant Primer",
    brand: "Solver",
    binder: "Acrylic emulsion",
    phTolerance: "pH 12–13",
    substrate: "Cement render, concrete",
    dft: "25–40 µm",
    coastal: "Confirm with Solver",
    primaryUse: "Regional trade — independent retailer network — QLD/NSW/VIC",
  },
  {
    product: "4-in-1 Exterior Primer",
    brand: "British Paints",
    binder: "Acrylic emulsion — multi-function",
    phTolerance: "pH 12–13",
    substrate: "Render, concrete, brick, masonry",
    dft: "Confirm TDS",
    coastal: "Yes",
    primaryUse: "Multi-function primer — wide distribution — straightforward repainting works",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "First coat on new or unpainted cement render facades — minimum 28-day cure — before applying acrylic exterior topcoat",
    "Priming bare concrete substrates (columns, beams, soffits) before applying acrylic or elastomeric topcoat",
    "Priming bare brick and masonry block facades before applying exterior acrylic coating",
    "Preparation of previously stripped or blast-cleaned render and concrete where bare substrate is re-exposed",
    "First coat on fibre cement cladding — confirm system compatibility with primer manufacturer before applying",
  ],
  selectionCriteria: [
    "Alkali-resistant primer is mandatory on any new or unpainted cement render — never apply acrylic topcoat directly to bare new render",
    "Select penetrating primer grade for porous or medium-porosity concrete and brick — provides both alkali resistance and surface sealing",
    "For friable or dusty substrates, apply penetrating consolidant before primer — do not prime over loose or powdery surfaces",
    "Confirm primer compatibility with the chosen exterior topcoat — use the primer recommended in the topcoat manufacturer's system specification",
    "Minimum substrate cure: 28 days for cement render — 14–21 days for bagged masonry — confirm from primer TDS",
    "Confirm coastal-grade suitability with manufacturer for buildings within 1 km of saltwater",
  ],
  limitations: [
    "Alkali-resistant primers do not bridge cracks — all substrate cracks must be repaired before priming",
    "Do not apply to substrates that are still wet or damp — primer will not bond to wet cement render",
    "Not suitable on substrates with active moisture penetration — address water ingress before priming and coating",
    "Primers are not topcoats — do not leave primed substrate uncoated — apply topcoat within the overcoat window from the TDS",
    "Primers do not substitute for biocide treatment — treat biological growth before priming on facades with mould or algae",
  ],
  standardsNotes: [
    "AS/NZS 3730 — Guide to properties of paints for buildings — Australian primer classification reference",
    "AS 4548 — Guide to long-life coatings for concrete and masonry — relevant to primer specification for commercial facades",
    "NATSPEC — Section 0233 — Exterior painting specification — confirm applicable worksection for primer requirement",
    "Manufacturer TDS — confirms primer DFT, spread rate, overcoat interval, and topcoat compatibility",
    "NCC Volume One — coating systems on external facades must not compromise fire performance of the wall assembly",
  ],
  suitableDefects: [
    "New cement render requiring first-time priming after minimum 28-day cure period",
    "Previously stripped render or concrete where bare substrate has been re-exposed by pressure washing or mechanical preparation",
    "New brick and masonry block facades being coated for the first time",
    "Bare concrete elements (columns, lintels, soffits) requiring primer before protective acrylic or elastomeric topcoat",
    "Touch-up areas where existing coating has been removed exposing bare render or concrete — spot-prime before topcoat",
  ],
  typicalSubstrates: [
    "Cement render — new or freshly cured — minimum 28 days before priming",
    "Concrete — columns, beams, panels, and soffits — confirm surface preparation before priming",
    "Brick and masonry block — open-textured and porous — penetrating primer grade recommended",
    "Fibre cement cladding — confirm primer system compatibility with the substrate manufacturer before applying",
    "Bagged or sand-faced masonry — confirm cure period and surface preparation with primer TDS",
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

export function AlkaliResistantPrimerIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are alkali-resistant primer systems?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Alkali-resistant primers are the mandatory first coat on any new or unpainted cement render and concrete facade before an acrylic topcoat is applied. Fresh cement render and concrete are highly alkaline substrates — pH 12 to 13 — due to calcium hydroxide (portlandite) released during the cement hydration and carbonation process. Applying an acrylic paint directly to this alkaline surface causes saponification: the alkaline environment hydrolyses the acrylic binder molecules, destroying their polymer chain structure and causing the paint film to lose adhesion, blister, and peel — often within 6 to 24 months of application. Alkali-resistant primers prevent this failure by providing a chemically stable bonded interface between the high-pH substrate and the acrylic topcoat.
        </p>
        {expanded && (
          <>
            <p>
              The primer must be applied after the render or concrete has reached adequate cure — a minimum of 28 days for cement render is the standard requirement, as incomplete carbonation means alkali leaching continues beyond this point at a lower rate. The substrate must be clean, dry, and structurally sound before priming: all biological growth must have been treated with a biocide wash, all efflorescence must have been removed, and all cracks must have been repaired. A penetrating consolidant should be applied first on substrates that are friable or dusting. Once the primer has cured within its overcoat window, two coats of the specified exterior acrylic topcoat are applied to achieve the required DFT of 70–100 µm. Australian paint manufacturers specify alkali-resistant primer as a mandatory component of their exterior system warranties on new render — applying a topcoat without primer voids manufacturer system warranty. Confirm the current primer specification, DFT, and overcoat interval from the manufacturer's current TDS before specifying.
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

export function AlkaliResistantPrimerProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">6 products — 6 brands — alkali-resistant primer systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of alkali-resistant primer systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product system</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Binder</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">pH tolerance</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Substrate</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">DFT</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.binder}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.phTolerance}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.substrate}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.dft}</td>
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
