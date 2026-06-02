"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Adjustable-pedestal"
  | "Slope-correction"
  | "Wind-uplift-retention"
  | "Anti-noise"
  | "Sound-reduction"
  | "Budget"
  | "Australian-manufacturer"
  | "Buzon"
  | "Elmich"
  | "Keksia"
  | "Maximus"
  | "Moonbay"
  | "TradieCart"
  | "Pasco"
  | "Roof-garden"
  | "Pool-surrounds"
  | "Balcony"
  | "Podium"
  | "Rooftop"
  | "Residential"
  | "Commercial"
  | "Porcelain-pavers"
  | "Stone-pavers"
  | "Timber-decking"
  | "Large-format"
  | "Flat-substrate"
  | "High-load"
  | "Recycled-polypropylene"
  | "Spacer-tabs"
  | "Self-levelling-head"
  | "Low-profile"
  | "Warranty";

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
  specifierNote: string;
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Buzon (Belgium) / Pasco Construction Solutions",
    brandUrl: "https://pasco.net.au",
    tdsUrl: "https://pasco.net.au/pages/buzon",
    accentColor: "#b45309",
    name: "Buzon DPH Series",
    descriptionLine: "Buzon DPH series adjustable height pedestal — 25mm to over 1000mm with couplers — built-in slope corrector 0–5% — load capacity up to 1,000kg — 80% recycled polypropylene — exclusive Australian distribution through Pasco Construction Solutions",
    productType: "Adjustable height pedestal — DPH series — 25mm to 1070mm+ — slope corrector built-in",
    filterTags: ["Adjustable-pedestal", "Slope-correction", "Wind-uplift-retention", "High-load", "Recycled-polypropylene", "Spacer-tabs", "Buzon", "Pasco", "Podium", "Rooftop", "Balcony", "Stone-pavers", "Porcelain-pavers", "Timber-decking", "Commercial"],
    techChips: [
      { label: "DPH: 25mm to 1070mm+", cls: "bg-amber-100 text-amber-800" },
      { label: "Built-in slope corrector 0–5%", cls: "bg-slate-100 text-slate-700" },
      { label: "Up to 1,000kg load", cls: "bg-green-50 text-green-700" },
      { label: "80% recycled polypropylene", cls: "bg-slate-100 text-slate-700" },
      { label: "Exclusive via Pasco Australia", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Buzon is a Belgian-manufactured adjustable height pedestal system distributed exclusively in Australia by Pasco Construction Solutions. The DPH series is Buzon's primary range for podium, roof deck, and balcony paving applications — covering heights from 25mm (DPH-02) to over 1000mm using couplers between the head and base. The PB series covers the lowest height range from 12mm. Each DPH pedestal incorporates a built-in patented slope-correcting head (PH5 Slope Corrector) that compensates for substrate falls of 0–5%, maintaining a level finished paver surface over a drainage-graded membrane or slab below.\n\nLoad capacity up to 1,000kg per pedestal. Manufactured from 5mm thick 80% recycled polypropylene — UV stable, chemical resistant, and suitable for temperatures from −30°C to +80°C. Inbuilt safety locking mechanism prevents the pedestal from unscrewing under load. Millimetric height adjustment allows precise levelling of individual pavers during installation. Interchangeable spacer tabs in 2mm, 3mm, 4.5mm, 6mm, 8mm, and 10mm widths set the paver joint width.\n\nCompatible with stone pavers, porcelain pavers, precast concrete pavers, timber decking, and steel grating. Mechanical fixing accessories available for wind uplift retention on exposed roof deck and coastal locations. Used across residential, commercial, and government projects in Australia. Pasco Construction Solutions is the exclusive Australian distributor — confirm product availability, height range required, and lead times with Pasco before specifying.",
    technicalProperties: [
      "DPH series: 25–36mm (DPH-02) to 355–515mm (DPH-8) + couplers for over 1000mm — PB series from 12mm",
      "Built-in PH5 slope corrector — compensates substrate falls 0–5%",
      "Load capacity up to 1,000kg per pedestal",
      "80% recycled polypropylene — 5mm wall thickness — UV stable — chemical resistant",
      "Temperature range: −30°C to +80°C",
      "Interchangeable spacer tabs: 2mm, 3mm, 4.5mm, 6mm, 8mm, 10mm",
      "Inbuilt safety locking mechanism — millimetric height adjustment",
      "Mechanical fixing accessories for wind uplift retention — separate specification",
      "Compatible with: stone pavers, porcelain, precast concrete, timber decking, steel grating",
    ],
    limitations: [
      "Exclusive Australian distributor — Pasco Construction Solutions only — confirm current stock, height range, and lead times with Pasco before specifying",
      "Slope corrector compensates up to 5% — for substrate falls exceeding 5%, additional slope correction accessories are available — confirm with Pasco",
      "Wind uplift accessories must be specified separately for exposed locations — standard pedestals rely on paver dead weight only",
      "Confirm pedestal base compatibility with membrane surface — protection board may be required on soft liquid-applied membranes",
      "No current Australian Standard for pedestal paving — apply manufacturer guidance and engineering judgement for load and span design",
    ],
    specifierNote: "Confirm height range, slope corrector requirement, wind uplift accessories, and current stock with Pasco Construction Solutions before specifying.",
    procurementSources: [
      { name: "Pasco Construction Solutions — exclusive Australian distributor for Buzon", url: "https://pasco.net.au" },
    ],
  },
  {
    fullLabel: "Elmich Australia",
    brandUrl: "https://elmich.com.au",
    tdsUrl: "https://elmich.com.au/products/versipave-2/",
    accentColor: "#0d9488",
    name: "Elmich VersiPave GP",
    descriptionLine: "VersiPave GP polypropylene adjustable paver support — 24–34mm base height with proprietary extenders — integrated snap-on chocks — for roof gardens, roof terraces, plaza decks, balconies, and pool surrounds — 25-year product warranty — confirmed Australian supply",
    productType: "Adjustable paver support — VersiPave GP — 24–34mm base + extenders — 25-year warranty",
    filterTags: ["Adjustable-pedestal", "Wind-uplift-retention", "Sound-reduction", "Elmich", "Roof-garden", "Pool-surrounds", "Balcony", "Podium", "Rooftop", "Porcelain-pavers", "Stone-pavers", "Warranty", "Commercial", "Residential"],
    techChips: [
      { label: "24–34mm base + extenders", cls: "bg-teal-100 text-teal-800" },
      { label: "Sound reduction — air cavity", cls: "bg-slate-100 text-slate-700" },
      { label: "25-year product warranty", cls: "bg-green-50 text-green-700" },
      { label: "Versijack CP wind retention", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirmed Australian supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Elmich VersiPave is a polypropylene adjustable paver support system manufactured for roof garden, roof terrace, plaza deck, balcony, and pool surround applications. The VersiPave GP incorporates integrated snap-on chocks adjustable in height from 24mm to 34mm in the base unit, with proprietary extenders used to increase height as required for deeper build-up applications. Elmich offers a 25-year product warranty on VersiPave — an established warranty in the Australian market.\n\nVersiPave GP reduces sound transmission, increases heat insulation through the air cavity below the paver, and allows unsightly services and the waterproofing membrane to be concealed within the cavity under the elevated platform while remaining accessible by lifting individual pavers. Compatible with granite, marble, precast concrete, and porcelain pavers where a well-drained, level surface is required.\n\nNote that Elmich advises that the product warranty for VersiPave is voided where pavers are supported beyond 35mm without the use of proprietary Elmich extenders — do not substitute third-party extensions. Elmich also offers the Versijack CP Retainer Pedestal system for wind-exposed applications — a wind uplift retention system incorporating a base plate clipped onto a standard Elmich pedestal with paver corner plates and a retaining cross, adhesive-fixed to the paver corners. Specify separately for exposed roof deck and coastal locations.",
    technicalProperties: [
      "VersiPave GP: 24–34mm base height — integrated snap-on chocks",
      "Proprietary extenders for increased heights — confirm full range with Elmich",
      "Polypropylene construction — UV stable",
      "Sound reduction through air cavity — heat insulation benefit",
      "Membrane and services concealed below — accessible by lifting pavers",
      "Compatible with granite, marble, precast concrete, porcelain pavers",
      "25-year product warranty",
      "Versijack CP Retainer system available for wind uplift retention — separate specification",
    ],
    limitations: [
      "Warranty voided if pavers supported beyond 35mm without proprietary Elmich extenders — do not use third-party extensions",
      "Confirm full height range achievable with extenders and current product availability with Elmich Australia before specifying",
      "Wind uplift retention (Versijack CP) must be specified separately for exposed locations — standard VersiPave relies on paver dead weight",
      "Confirm slope correction availability — not built-in on GP base unit — confirm with Elmich",
      "Confirm membrane protection requirement with membrane manufacturer before placing pedestals on cured membrane surface",
    ],
    specifierNote: "Confirm height range with extenders, slope correction availability, and wind uplift retention (Versijack CP) specification with Elmich Australia before specifying.",
    procurementSources: [
      { name: "Elmich Australia — direct supply", url: "https://elmich.com.au" },
      { name: "KHD Landscape Solutions — Australian distributor", url: "https://khdlandscapesolutions.com.au" },
    ],
  },
  {
    fullLabel: "Keksia / Eterno Ivica — TradieCart / keksia.com.au",
    brandUrl: "https://keksia.com.au",
    tdsUrl: "https://keksia.com.au/products/pedestals",
    accentColor: "#0369a1",
    name: "Keksia NM / PR / Star.T Series",
    descriptionLine: "Keksia NM and PR series adjustable pedestal systems — PR series self-levelling head accommodates slopes up to 5% — bi-material anti-noise head reduces sound impact up to 25dB — Star.T series from 10mm minimum height — available through TradieCart and keksia.com.au — 70 years Italian engineering (Eterno Ivica)",
    productType: "Adjustable pedestal — NM / PR / Star.T — self-levelling — anti-noise bi-material head",
    filterTags: ["Adjustable-pedestal", "Slope-correction", "Wind-uplift-retention", "Anti-noise", "Sound-reduction", "Self-levelling-head", "Low-profile", "Keksia", "TradieCart", "Balcony", "Podium", "Rooftop", "Porcelain-pavers", "Stone-pavers", "Timber-decking", "Residential", "Commercial"],
    techChips: [
      { label: "PR: self-levelling 0–5%", cls: "bg-sky-100 text-sky-800" },
      { label: "Anti-noise — up to 25dB", cls: "bg-slate-100 text-slate-700" },
      { label: "Star.T from 10mm", cls: "bg-green-50 text-green-700" },
      { label: "Windproof T/L-clip heads", cls: "bg-slate-100 text-slate-700" },
      { label: "Via TradieCart / keksia.com.au", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Keksia is the Australian retail brand for Eterno Ivica, an Italian pedestal manufacturer with 70 years of engineering history. The Keksia range covers three primary series: NM series (standard fixed substrate for flat surfaces), PR series (self-levelling head for slopes up to 5%), and Star.T (ultra-low 10mm minimum height for renovation projects with minimal clearance). All Keksia pedestals feature the patented bi-material anti-noise head — claimed to reduce sound impact level by up to 25dB — the head incorporates two materials of different density that absorb foot traffic impact and reduce noise transmission to the structure below. This is a differentiating feature relevant on podium slabs above occupied apartments where paver foot traffic noise is a resident amenity concern.\n\nTradieCart (Melbourne-based, online delivery) stocks the full Keksia range and provides detailed height range guidance for each series. The PR series self-levelling head is particularly suited to podium and roof deck applications where the membrane surface has a drainage fall built in — the pedestal head swivels to maintain a level paver surface over the sloping substrate without adjustment.\n\nKeksia also offers windproof heads with T-clips and L-clips for wind-exposed rooftop and coastal applications, and Wood Deck and Al Joist head options for timber and composite decking applications over pedestals.",
    technicalProperties: [
      "NM series: flat substrate — multiple height ranges from NM0 (15–25mm) through NM5 (175–270mm) and beyond",
      "PR series: self-levelling head — accommodates substrate slopes up to 5% — suitable for drainage-graded membranes",
      "Star.T: ultra-low profile from 10mm minimum height — renovation and minimal clearance applications",
      "Bi-material anti-noise head — claimed sound reduction up to 25dB — relevant for podium above occupied apartments",
      "Windproof heads with T-clips and L-clips for exposed locations — separate specification",
      "Wood Deck and Al Joist head options for timber and composite decking",
      "Compatible with stone pavers, porcelain, marble, granite, precast concrete, timber and composite decking",
      "Available through TradieCart (Melbourne) and keksia.com.au — confirm current stock and lead times",
    ],
    limitations: [
      "PR series slope correction up to 5% — for substrate falls exceeding 5%, engineering review required",
      "Confirm the specific series (NM, PR, or Star.T) and height range against the project requirements before ordering",
      "Sound reduction claim (25dB) is manufacturer-stated — confirm applicability to the specific installation with Keksia / TradieCart",
      "Wind uplift retention (windproof heads with T-clips and L-clips) must be separately specified for exposed locations",
      "Confirm current product availability, height ranges, and pricing with TradieCart or keksia.com.au before specifying",
    ],
    specifierNote: "Confirm series (NM/PR/Star.T), height range, slope correction requirement, anti-noise specification, and wind uplift accessories with TradieCart or Keksia before specifying.",
    procurementSources: [
      { name: "TradieCart — full Keksia range — Melbourne same-day delivery available", url: "https://www.tradiecart.com.au" },
      { name: "Keksia Australia — direct enquiry", url: "https://keksia.com.au" },
    ],
  },
  {
    fullLabel: "Maximus Pedestal Systems (Australia)",
    brandUrl: "https://maximuspedestalsystems.com/",
    tdsUrl: "https://maximuspedestalsystems.com/",
    accentColor: "#16a34a",
    name: "Maximus Pedestal Systems",
    descriptionLine: "Australian-manufactured adjustable height pedestal system — residential and commercial podium, roof terrace, and balcony applications — large-format tile and paver support — Melbourne-based with national supply — confirm current product range and height specifications with Maximus before specifying",
    productType: "Australian-manufactured adjustable height pedestal — residential and commercial",
    filterTags: ["Adjustable-pedestal", "Australian-manufacturer", "Maximus", "Podium", "Rooftop", "Balcony", "Porcelain-pavers", "Stone-pavers", "Large-format", "Residential", "Commercial", "Wind-uplift-retention"],
    techChips: [
      { label: "Australian manufacturer", cls: "bg-green-100 text-green-800" },
      { label: "Residential and commercial", cls: "bg-slate-100 text-slate-700" },
      { label: "Large-format tile support", cls: "bg-green-50 text-green-700" },
      { label: "Melbourne — national supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm range with Maximus", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Maximus Pedestal Systems is an Australian-based manufacturer and supplier of adjustable height pedestal systems for residential and commercial paving applications on balconies, terraces, podium slabs, and rooftop decks. As an Australian manufacturer, Maximus offers local technical support and advice, accessible for project-specific queries before specifying.\n\nMaximus systems are confirmed for large-format tile and paver applications, including porcelain on elevated terrace and rooftop applications. The company operates from Melbourne and supplies nationally. Confirm the current product range, available height ranges, load capacity specifications, slope correction options, and wind uplift retention accessories with Maximus directly before specifying — as an Australian manufacturer, product specifications may be updated more frequently than European brands.",
    technicalProperties: [
      "Australian-manufactured adjustable height pedestal system",
      "Suitable for residential and commercial podium, rooftop, and balcony applications",
      "Compatible with large-format porcelain tiles, stone pavers, and precast concrete pavers",
      "Height adjustable — confirm current height range with Maximus",
      "Wind resistant design — confirm wind uplift retention specification for exposed locations",
      "Melbourne-based — national supply",
    ],
    limitations: [
      "Confirm current product range, height specifications, load capacity, and slope correction options with Maximus before specifying — product range may differ from European brands",
      "Confirm availability outside Melbourne for regional projects",
      "Confirm wind uplift retention accessories for exposed rooftop and coastal locations",
      "Confirm membrane protection requirement for the specific membrane system before placing pedestals",
      "Confirm current pricing and lead times with Maximus directly before specifying",
    ],
    specifierNote: "Confirm full product specifications, height range, slope correction, and Australian availability with Maximus Pedestal Systems before specifying.",
    procurementSources: [
      { name: "Maximus Pedestal Systems — direct enquiry", url: "https://maximuspedestalsystems.com/" },
    ],
  },
  {
    fullLabel: "Moonbay — via TradieCart",
    brandUrl: "https://www.tradiecart.com.au",
    tdsUrl: "https://www.tradiecart.com.au/flooring-solutions/pedestals-and-raised-floor-systems/",
    accentColor: "#475569",
    name: "Moonbay POD Series",
    descriptionLine: "Moonbay POD series — budget adjustable height pedestal for residential balcony and terrace paving on flat or near-flat substrates — cost-effective specification for standard residential applications without complex slope correction or wind uplift requirements — available through TradieCart",
    productType: "Budget adjustable pedestal — POD series — residential flat substrate — no slope correction",
    filterTags: ["Adjustable-pedestal", "Budget", "Flat-substrate", "Moonbay", "TradieCart", "Residential", "Balcony", "Porcelain-pavers", "Stone-pavers"],
    techChips: [
      { label: "Budget — residential", cls: "bg-slate-100 text-slate-700" },
      { label: "Flat substrate only", cls: "bg-slate-100 text-slate-700" },
      { label: "No slope correction", cls: "bg-red-50 text-red-700" },
      { label: "POD series", cls: "bg-slate-100 text-slate-700" },
      { label: "Via TradieCart", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Moonbay POD series is a budget-category adjustable height pedestal suitable for standard residential balcony and terrace paving applications on flat or near-flat substrates where slope correction and wind uplift retention are not required. Available through TradieCart, the POD series provides a reliable and cost-effective alternative to premium European brands for projects where the paver, substrate, and exposure conditions are within the standard residential parameters.\n\nTradieCart recommends Moonbay POD for budget-conscious residential projects on flat surfaces, while recommending the Keksia NM or PR series where slope correction, anti-noise performance, or wind uplift retention are specified. Confirm the project requirements against the POD series specifications before substituting for a premium specification — the POD series is not appropriate for exposed rooftop, commercial podium, or high-wind coastal applications without specific confirmation from TradieCart.",
    technicalProperties: [
      "Budget adjustable height pedestal — flat substrate residential applications",
      "POD series — confirm current height range and specifications with TradieCart",
      "Suitable for standard residential balcony and terrace paving",
      "No built-in slope correction — flat substrate only",
      "Compatible with standard residential paver formats and weights — confirm load capacity with TradieCart",
    ],
    limitations: [
      "Not recommended for sloped substrates — no slope correction feature",
      "Not recommended for exposed rooftop or high-wind coastal applications without specific wind uplift retention specification",
      "Not recommended for commercial podium applications or heavy paver formats without load capacity confirmation",
      "Budget specification — confirm load capacity, UV stability, and warranty terms with TradieCart before specifying",
      "Confirm current product specifications and availability with TradieCart before specifying",
    ],
    specifierNote: "Confirm project requirements are within the standard residential parameters of the Moonbay POD series before substituting for a premium specification.",
    procurementSources: [
      { name: "TradieCart — direct supply — Melbourne same-day delivery available", url: "https://www.tradiecart.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Adjustable-pedestal", label: "Adjustable pedestal" },
  { id: "Slope-correction", label: "Slope correction" },
  { id: "Self-levelling-head", label: "Self-levelling head" },
  { id: "Wind-uplift-retention", label: "Wind uplift retention" },
  { id: "Anti-noise", label: "Anti-noise" },
  { id: "Sound-reduction", label: "Sound reduction" },
  { id: "High-load", label: "High load capacity" },
  { id: "Recycled-polypropylene", label: "Recycled polypropylene" },
  { id: "Spacer-tabs", label: "Spacer tabs" },
  { id: "Low-profile", label: "Low profile / Star.T" },
  { id: "Australian-manufacturer", label: "Australian manufacturer" },
  { id: "Budget", label: "Budget specification" },
  { id: "Flat-substrate", label: "Flat substrate only" },
  { id: "Warranty", label: "Product warranty" },
  { id: "Large-format", label: "Large-format tile" },
  { id: "Podium", label: "Podium slab" },
  { id: "Rooftop", label: "Rooftop / roof deck" },
  { id: "Balcony", label: "Balcony / terrace" },
  { id: "Roof-garden", label: "Roof garden" },
  { id: "Pool-surrounds", label: "Pool surrounds" },
  { id: "Commercial", label: "Commercial" },
  { id: "Residential", label: "Residential" },
  { id: "Porcelain-pavers", label: "Porcelain pavers" },
  { id: "Stone-pavers", label: "Stone pavers" },
  { id: "Timber-decking", label: "Timber decking" },
  { id: "Buzon", label: "Buzon" },
  { id: "Pasco", label: "Pasco" },
  { id: "Elmich", label: "Elmich" },
  { id: "Keksia", label: "Keksia" },
  { id: "Maximus", label: "Maximus" },
  { id: "TradieCart", label: "TradieCart" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  heightRange: string;
  slopeCorrection: string;
  loadCapacity: string;
  windUplift: string;
  antiNoise: string;
  keyApplication: string;
  keyRestriction: string;
}[] = [
  {
    product: "Buzon DPH Series",
    brand: "Pasco Construction Solutions",
    heightRange: "12mm (PB) to 1070mm+ (DPH with couplers)",
    slopeCorrection: "Yes — built-in PH5 slope corrector 0–5%",
    loadCapacity: "Up to 1,000kg per pedestal",
    windUplift: "Mechanical fixing accessories — specify separately",
    antiNoise: "No specific claim",
    keyApplication: "Podium, roof deck, balcony — pavers, timber, steel grating",
    keyRestriction: "Exclusive Pasco supply — confirm height range and stock — wind uplift accessories separate",
  },
  {
    product: "Elmich VersiPave GP",
    brand: "Elmich Australia",
    heightRange: "24–34mm base + proprietary extenders — confirm full range",
    slopeCorrection: "Confirm with Elmich — not built-in on GP base",
    loadCapacity: "Confirm with Elmich",
    windUplift: "Versijack CP Retainer — separate specification",
    antiNoise: "Sound reduction via air cavity",
    keyApplication: "Roof gardens, terraces, balconies, pool surrounds, plaza decks",
    keyRestriction: "Warranty voided beyond 35mm without proprietary extenders — Versijack CP wind retention separate",
  },
  {
    product: "Keksia NM / PR / Star.T",
    brand: "TradieCart / keksia.com.au",
    heightRange: "NM0: 15–25mm — NM5: 175–270mm — Star.T from 10mm",
    slopeCorrection: "PR series: self-levelling head 0–5% — NM: no slope correction",
    loadCapacity: "Confirm with Keksia",
    windUplift: "Windproof heads with T-clips and L-clips — separate specification",
    antiNoise: "Yes — bi-material head — up to 25dB reduction (manufacturer-stated)",
    keyApplication: "Balcony, terrace, podium — pavers, timber, composite decking",
    keyRestriction: "Confirm series (NM/PR/Star.T) and height range — wind uplift heads separate — 25dB manufacturer-stated",
  },
  {
    product: "Maximus Pedestal Systems",
    brand: "Maximus (Australian)",
    heightRange: "Confirm with Maximus",
    slopeCorrection: "Confirm with Maximus",
    loadCapacity: "Confirm with Maximus",
    windUplift: "Confirm with Maximus",
    antiNoise: "Confirm with Maximus",
    keyApplication: "Residential and commercial — podium, rooftop, balcony — large format tile and paver",
    keyRestriction: "Australian manufacturer — confirm full specifications directly with Maximus before specifying",
  },
  {
    product: "Moonbay POD Series",
    brand: "TradieCart",
    heightRange: "Confirm with TradieCart",
    slopeCorrection: "No — flat substrate only",
    loadCapacity: "Confirm with TradieCart",
    windUplift: "Not recommended without separate retention specification",
    antiNoise: "No",
    keyApplication: "Standard residential balcony and terrace — flat substrate — budget specification",
    keyRestriction: "Budget category — not for sloped substrates, exposed rooftops, or commercial podium without specific confirmation",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Podium slabs and roof decks where a finished paver level must be set at a fixed height above a new waterproofing membrane — pedestals set the paver level independently of the membrane surface",
    "Balconies and terraces where the finished paver level must match a doorway threshold level regardless of the membrane or protection board surface below",
    "Applications where membrane accessibility must be maintained after paving — pavers can be lifted off pedestals without breaking out adhesive or mortar",
    "Roof garden and green roof build-ups where pavers or decking are elevated above a drainage cell or insulation layer above the membrane",
    "Pool surrounds and plaza decks where a drained, level surface is required over a waterproofed structural slab",
    "Renovation projects where additional height clearance must be created over an existing slab surface — Star.T series from 10mm for minimal clearance applications",
  ],
  selectionCriteria: [
    "Height range: calculate required pedestal height as (finished paver level) minus (membrane surface level) minus (paver thickness) — allow for protection board or insulation if present",
    "Slope correction: confirm whether the membrane surface has a drainage fall built in — if yes, specify a pedestal with a built-in slope-correcting head (Buzon DPH, Keksia PR series) to maintain level finished paving over the sloping membrane",
    "Load capacity: confirm that the pedestal load capacity is adequate for the paver format, weight, and expected foot traffic loading — heavy precast concrete pavers impose higher loads than thin porcelain",
    "Wind uplift: confirm with the building engineer whether wind uplift retention is required for the specific location and exposure category — specify windproof accessories or retention systems where required",
    "Paver format and spacer tabs: confirm pedestal head size and spacer tab width are compatible with the paver dimensions and required joint width — minimum 2mm joint for drainage",
    "Anti-noise: on podium slabs above occupied apartments, consider pedestals with bi-material anti-noise heads (Keksia) to reduce foot traffic noise transmission to the spaces below",
  ],
  heightRange: [
    "The required pedestal height is calculated from the difference between the finished paver level and the membrane (or protection board) surface level, minus the paver thickness",
    "Most systems are available in overlapping height ranges — Buzon DPH series: DPH-02 (25–36mm) through DPH-8 (355–515mm) plus couplers for over 1000mm; Keksia NM/PR series: NM0 (15–25mm) through NM5 (175–270mm)",
    "Low-profile applications (10–24mm): Keksia Star.T from 10mm — Moonbay POD for flat substrate budget applications — Elmich VersiPave GP from 24mm",
    "Deep build-up applications: Buzon DPH with couplers achieves over 1000mm — suitable for podiums with deep insulation, drainage cell, and service voids below the paver level",
    "Spacer tabs control paver joint width — 2mm minimum for drainage — wider joints allow greater drainage capacity across the paved surface to the membrane outlets below",
    "Slope corrector compensates substrate falls up to 5% on Buzon DPH and Keksia PR series — for substrate falls exceeding 5%, consult the manufacturer before specifying",
  ],
  windUpliftLoad: [
    "Standard pedestals support pavers by gravity only — the paver weight holds the system in place — this is adequate for sheltered residential balconies within normal wind exposure categories",
    "Wind uplift accessories are mandatory for exposed rooftop, elevated terrace, and coastal locations — wind pressure under the paved surface can exceed the paver dead weight and lift or displace pavers",
    "Buzon: mechanical fixing accessories — clips and retention brackets available through Pasco — specify separately",
    "Elmich: Versijack CP Retainer Pedestal system — base plate clipped to pedestal with corner plates and retaining cross adhesive-fixed to paver corners — separate specification",
    "Keksia: windproof heads with T-clips and L-clips — specify the correct windproof head variant when ordering",
    "Confirm wind uplift retention requirement with the building engineer for the specific location, floor level, and wind exposure category before specifying standard gravity-retained pedestals",
  ],
  membraneAccess: [
    "Pedestal paving allows the waterproofing membrane below to remain accessible — individual pavers can be lifted off pedestals without tools, breaking out, or adhesive removal",
    "This is a significant advantage over adhesive-bedded tile on podium slabs and roof decks where the membrane may need to be inspected, flood-tested, or repaired under warranty",
    "Confirm whether membrane accessibility is a priority with the building owner and strata manager before specifying either pedestal or adhesive-bedded paving",
    "Pedestals are placed on the membrane surface or on a protection board above the membrane — confirm with the membrane manufacturer whether a protection board is required before placing pedestals directly on the cured membrane",
    "Soft liquid-applied PU and hybrid membranes may require a protection board or membrane mat between the membrane surface and the pedestal bases to prevent indentation under point loading",
    "Refer to the Protection Boards page for compatible protection board options for use under pedestal bases",
  ],
  limitations: [
    "Standard pedestals rely on paver dead weight — wind uplift accessories are mandatory for exposed rooftop and coastal locations — do not specify standard pedestals on exposed locations without engineering confirmation",
    "There is currently no Australian Standard governing pedestal-mounted paving systems — AS/NZS 4452 applies to solid-base installations only — apply manufacturer guidance and engineering judgement for load and span design",
    "Do not place pedestals directly on soft liquid-applied membranes without confirming protection board requirements with the membrane manufacturer",
    "Excessively tight paver joints (less than 2mm) can restrict drainage through the paved surface to the membrane below — confirm minimum joint width for drainage",
    "Porcelain pavers — thinner and more brittle than precast concrete — may require additional mid-span support points on large formats to prevent cracking — confirm with pedestal and paver manufacturers",
    "Budget pedestal systems (Moonbay POD) are not appropriate for sloped substrates, commercial podium applications, or exposed rooftop locations without specific confirmation",
  ],
};

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

export function PedestalProductSection() {
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
              Height range selection, slope correction, load capacity, paver thickness and format, wind uplift, membrane protection, spacer tabs, no current Australian standard
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
              <TechCard icon={<SquareStack size={15} />} title="Height Range & Slope Correction" items={TECH_INFO.heightRange} style="bullet" />
              <TechCard icon={<BookOpen size={15} />} title="Wind Uplift & Load Capacity" items={TECH_INFO.windUpliftLoad} style="check" />
              <TechCard icon={<FileText size={15} />} title="Membrane Protection & Accessibility" items={TECH_INFO.membraneAccess} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
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
            <p className="mt-1 text-sm text-slate-500">
              5 products — 4 brands — adjustable height polypropylene pedestal systems for paver and tile support on podium slabs, roof decks, and balconies — 12mm to 1070mm height range — slope correction, wind uplift, and membrane protection options
            </p>
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
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
                </div>

                {/* Tech spec chips */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
                  {product.techChips.map((chip) => (
                    <span
                      key={chip.label}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <div className="space-y-3">
                    {product.systemDescription.split("\n\n").map((para, i) => (
                      <p key={i} className="text-xs leading-6 text-slate-700">{para}</p>
                    ))}
                  </div>
                </div>

                {/* Technical Properties & Limitations */}
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <ul className="space-y-1.5">
                      {product.technicalProperties.map((prop, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
                          {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <ul className="space-y-1.5">
                      {product.limitations.map((lim, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                          <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
                          {lim}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Specifier Note</p>
                    <p className="text-xs leading-5 text-amber-900">{product.specifierNote}</p>
                  </div>
                </div>

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
                  <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
                  <div className="space-y-2">
                    {product.procurementSources.map((src) => (
                      <div
                        key={src.name}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
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
                          <span className="font-semibold text-slate-700">{src.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] italic text-slate-400">
                    Confirm suitability with the current manufacturer TDS before specifying or applying.
                  </p>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Adjustable height pedestal system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of pedestal systems. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Height range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Slope correction</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Load capacity</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Wind uplift</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Anti-noise</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.heightRange}</td>
                  <td className="px-4 py-3 text-slate-600">{row.slopeCorrection}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.loadCapacity}</td>
                  <td className="px-4 py-3 text-slate-600">{row.windUplift}</td>
                  <td className="px-4 py-3 text-slate-600">{row.antiNoise}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyApplication}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
