"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Tile"
  | "Concrete"
  | "Terracotta"
  | "Replacement"
  | "Ridge"
  | "Hip"
  | "Mortar"
  | "Rebed"
  | "Polymer-modified"
  | "Valley"
  | "Colorbond"
  | "Flashing"
  | "Steel"
  | "Penetration"
  | "Collar"
  | "EPDM"
  | "Sarking"
  | "Reflective-foil"
  | "Underlay"
  | "Sealant"
  | "PU"
  | "1C"
  | "Exterior";

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
    fullLabel: "Monier",
    brandUrl: "https://www.monier.com.au",
    tdsUrl: "https://www.monier.com.au",
    accentColor: "#ef4444",
    name: "Monier Marseille Concrete Roof Tile",
    descriptionLine: "Concrete interlocking roof tile for direct replacement of broken or missing tiles on pitched tiled roofs",
    productType: "Interlocking concrete roof tile — replacement",
    filterTags: ["Tile", "Concrete", "Replacement"],
    techChips: [
      { label: "Concrete tile", cls: "bg-sky-100 text-sky-800" },
      { label: "Interlocking", cls: "bg-slate-100 text-slate-700" },
      { label: "Direct replacement", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Monier Marseille is a widely-used concrete interlocking roof tile profile found on a high proportion of Australian Class 2 strata apartment buildings built between 1970 and 2010. When tiles are broken, dislodged or missing, direct replacement with matching profile and colour is the preferred repair approach — maintaining weathertightness without disturbing the broader roof assembly.\n\nProfile match is critical before ordering — Monier tiles are available in a range of colours and finishes and must be confirmed against the existing tile. Confirm availability of matching batch with Monier prior to specification. Tiles are supplied through Monier trade accounts and selected roofing distributors.",
    technicalProperties: [
      "Concrete interlocking profile — Marseille is one of the most common profiles on Class 2 strata roofs in Australia — wide replacement availability",
      "Manufactured to AS 2049 — Roof Tiles — for dimensional tolerance, strength and water absorption",
      "Interlocking side and head lap — self-draining — suitable for minimum pitch per Monier installation guide",
      "Available in a range of factory-applied colours and finishes — colour match must be confirmed against existing tiles before ordering",
      "Nailable or hook-fix installation depending on pitch and wind region — confirm fixing method per Monier TDS and AS 2050",
    ],
    limitations: [
      "Colour and finish fading over time means new tiles may be conspicuous against weathered existing tiles — advise client before proceeding",
      "Profile variants within the Marseille range — confirm exact profile match against existing tiles before ordering",
      "Minimum roof pitch requirements apply — confirm pitch compliance per Monier installation data",
      "Replacement of isolated tiles requires temporary weatherproofing during repair if weather is forecast",
      "Confirm current product specification and compliance with Monier before specifying",
    ],
    procurementSources: [
      { name: "Monier — trade accounts and roofing distributors nationally", url: "https://www.monier.com.au" },
      { name: "Roofing distributors — confirm profile and colour availability", url: "https://www.monier.com.au" },
    ],
  },
  {
    fullLabel: "Baumit",
    brandUrl: "https://www.baumit.com.au",
    tdsUrl: "https://www.baumit.com.au",
    accentColor: "#f97316",
    name: "Baumit UniRepair Rebed Mortar",
    descriptionLine: "Polymer-modified cementitious mortar for rebedding ridge and hip tiles on pitched tiled roofs — replaces traditional sand/cement mix",
    productType: "Polymer-modified rebed mortar for ridge and hip tiles",
    filterTags: ["Mortar", "Rebed", "Ridge", "Hip", "Polymer-modified"],
    techChips: [
      { label: "Polymer-modified mortar", cls: "bg-sky-100 text-sky-800" },
      { label: "Ridge / hip rebed", cls: "bg-slate-100 text-slate-700" },
      { label: "Cementitious", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Baumit UniRepair is a polymer-modified cementitious repair mortar suitable for rebedding ridge and hip tiles on pitched tiled roofs. Unlike traditional sand/cement mortar mixes, polymer-modified products provide improved adhesion, flexibility and durability — reducing the risk of premature cracking and debonding that commonly leads to ridge tile displacement and water ingress.\n\nRidge and hip tile mortar failure is one of the most common causes of pitched tiled roof leaks on Class 2 strata buildings — cracked, hollow or missing mortar beds allow water to track behind the ridge tiles into the roof space. Full ridge rebed is recommended when mortar is cracked across multiple tiles — spot repointing of isolated joints rarely achieves long-term durability. Confirm product suitability and mixing instructions with Baumit TDS.",
    technicalProperties: [
      "Polymer-modified formulation — improved adhesion and flexibility compared to traditional sand/cement mix — better resistance to thermal cycling and building movement",
      "Suitable for exterior roof mortar bedding applications including ridge and hip tile rebedding on pitched tiled roofs",
      "Cement-based — compatible with concrete and clay tile substrates — does not require specialist equipment",
      "Ready to mix with water on site — reduces waste and variation compared to site-batched sand/cement mixes",
      "Finish with compatible pointing sealant (polyurethane or mortar pointing compound) to seal the exposed mortar joint face",
    ],
    limitations: [
      "Not a structural repair mortar — confirm suitability for bedding loads with Baumit technical if tile weight is a concern",
      "Must be applied in dry conditions — do not apply in rain or on wet substrates — protect fresh mortar from rain for minimum 24 hours",
      "Full ridge rebed requires systematic removal of existing ridge tiles, mortar and any sarking debris before rebed — partial spot repair is a temporary measure only",
      "Colour match of rebed mortar to existing mortar should be considered and agreed with the client before application",
      "Confirm current product specification and compliance with Baumit before specifying",
    ],
    procurementSources: [
      { name: "Baumit Australia — trade supply — contact for current pricing", url: "https://www.baumit.com.au" },
      { name: "Roofing and masonry supply distributors nationally — confirm availability", url: "https://www.baumit.com.au" },
    ],
  },
  {
    fullLabel: "Lysaght",
    brandUrl: "https://www.lysaght.com",
    tdsUrl: "https://www.lysaght.com",
    accentColor: "#eab308",
    name: "Lysaght Trimdek Valley Iron",
    descriptionLine: "Pre-formed Colorbond steel valley iron for pitched tiled roofs — directs rainwater from internal valleys to gutters",
    productType: "Colorbond steel valley iron for tiled roof drainage",
    filterTags: ["Valley", "Colorbond", "Steel", "Flashing"],
    techChips: [
      { label: "Colorbond steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Valley iron", cls: "bg-slate-100 text-slate-700" },
      { label: "Tiled roof", cls: "bg-slate-100 text-slate-700" },
      { label: "Pre-formed", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Lysaght Trimdek valley iron is a pre-formed Colorbond steel valley lining used in pitched tiled roofs to collect and direct rainwater from internal roof valleys to eave gutters. Valley irons are located at the internal junction of two roof planes and are a common source of roof leaks on Class 2 strata buildings when they corrode, buckle, or become blocked with debris and tile mortar.\n\nValley iron replacement requires removal of tiles on both sides of the valley, removal and disposal of the existing valley iron, installation of new Colorbond valley iron with appropriate lap joints and sealed edges, and reinstatement of tiles. Confirm Colorbond colour match to existing roof sheet if visible from street level. Valley iron width and profile must suit the tile profile and roof pitch.",
    technicalProperties: [
      "Colorbond steel — pre-painted Zincalume substrate — long-term corrosion resistance in Australian roof conditions",
      "Pre-formed valley profile — directs high-volume rainwater from internal roof valley to eave gutter",
      "Available in standard Colorbond colour range — confirm matching colour for visible roof installations",
      "Compatible with concrete and terracotta tile profiles on pitched roofs — confirm valley width suits tile profile",
      "Manufactured to BlueScope steel standards — confirm current specification with Lysaght",
    ],
    limitations: [
      "Colorbond colour match must be confirmed against the existing roof sheets and gutters if visible from ground level — colour fading may make matching difficult on older roofs",
      "Valley iron must be adequately lapped at joints — minimum lap per Lysaght installation guide — sealant to lap joints is generally required",
      "Debris accumulation in valleys (leaves, mortar fragments, tile pieces) causes ponding and overflow — advise client on maintenance cleaning requirements",
      "Installation requires removal of tiles on both sides of valley — temporary weatherproofing required if installation cannot be completed in one day",
      "Confirm current product specification and compliance with Lysaght before specifying",
    ],
    procurementSources: [
      { name: "Lysaght / BlueScope Distribution — roofing distributors nationally", url: "https://www.lysaght.com" },
      { name: "Steel and roofing supply distributors — confirm Colorbond colour and stock", url: "https://www.lysaght.com" },
    ],
  },
  {
    fullLabel: "Deks",
    brandUrl: "https://www.deks.com.au",
    tdsUrl: "https://www.deks.com.au",
    accentColor: "#22c55e",
    name: "Deks D-1 Multi Pipe Flashing",
    descriptionLine: "EPDM rubber self-sealing pipe flashing collar for roof penetrations — suits pipe diameters 0–115mm on pitched tiled and metal roofs",
    productType: "EPDM self-sealing pipe penetration flashing collar",
    filterTags: ["Penetration", "Collar", "EPDM", "Flashing"],
    techChips: [
      { label: "EPDM rubber", cls: "bg-sky-100 text-sky-800" },
      { label: "Self-sealing collar", cls: "bg-slate-100 text-slate-700" },
      { label: "Pipe penetration", cls: "bg-slate-100 text-slate-700" },
      { label: "Pitched roof", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Deks D-1 Multi Pipe Flashing is an EPDM rubber pipe flashing collar designed for sealing pipe penetrations through pitched tiled and corrugated metal roofs. The self-sealing EPDM cone is trimmed on site to the pipe diameter (0–115mm) and compressed around the pipe to form a weathertight seal. The base plate is dressed over and under tiles and sealed at its perimeter to prevent water ingress around the penetration.\n\nPipe penetration flashing failure is a common cause of roof leaks on Class 2 strata buildings — particularly around plumbing vents, exhaust fans and mechanical services that penetrate the roof plane. EPDM collars are preferred over traditional lead collars on new work and remediation, as EPDM does not require lead handling procedures and provides similar UV and weather resistance.",
    technicalProperties: [
      "EPDM rubber cone — trimmed on site to suit pipe diameter 0–115mm — single product suits a range of pipe sizes",
      "Self-sealing compression fit around pipe — no adhesive required at pipe-to-collar interface",
      "UV-resistant EPDM — suitable for long-term outdoor exposure in Australian climate conditions",
      "Suitable for pitched tiled roofs — base plate designed to dress over and under tiles with Colorbond or zincalume base plate option",
      "No lead — eliminates lead-handling requirements on site and disposal requirements at end of life",
    ],
    limitations: [
      "Not suitable for pipes exceeding 115mm diameter without using a larger Deks product — confirm pipe diameter before ordering",
      "Base plate perimeter must be sealed with compatible roof sealant — EPDM collar alone does not waterproof the base plate tile interface",
      "Pipe must be round — Deks D-1 is not suitable for square or rectangular penetrations",
      "Confirm compatibility of EPDM with any pipe material or chemical exposure present — not all EPDM products are chemically resistant",
      "Confirm current product specification and compliance with Deks before specifying",
    ],
    procurementSources: [
      { name: "Deks Industries — roofing and plumbing distributors nationally", url: "https://www.deks.com.au" },
      { name: "Reece Plumbing — plumbing and drainage supply nationally", url: "https://www.reece.com.au" },
      { name: "Roofing supply distributors — confirm stock", url: "https://www.deks.com.au" },
    ],
  },
  {
    fullLabel: "Bradford",
    brandUrl: "https://www.bradfordinsulation.com.au",
    tdsUrl: "https://www.bradfordinsulation.com.au",
    accentColor: "#3b82f6",
    name: "Bradford Anticon Sarking",
    descriptionLine: "Reflective foil sarking/underlay installed beneath roof tiles — provides thermal insulation, condensation control and secondary weather resistance",
    productType: "Reflective foil sarking for tiled pitched roofs",
    filterTags: ["Sarking", "Reflective-foil", "Underlay"],
    techChips: [
      { label: "Reflective foil sarking", cls: "bg-sky-100 text-sky-800" },
      { label: "Thermal insulation", cls: "bg-slate-100 text-slate-700" },
      { label: "Condensation control", cls: "bg-slate-100 text-slate-700" },
      { label: "Secondary weather resistance", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Bradford Anticon is a reflective foil sarking/underlay installed immediately beneath roof tiles on battens, providing a secondary line of weather defence, reflective thermal insulation, and condensation control. Sarking is typically installed as part of full or partial tile strip-and-relay operations — it is not generally replaceable without removing tiles.\n\nOn Class 2 strata buildings, degraded or absent sarking is a contributing factor in roof space condensation, heat load, and water ingress through tile laps during severe weather events. When undertaking major ridge rebed, valley replacement or tile relay, the condition of existing sarking should be inspected and replacement recommended if perforated, degraded or absent. Bradford Anticon is one of the most widely specified sarking products in the Australian market.",
    technicalProperties: [
      "Reflective foil construction — reduces radiant heat transfer through roof — contributes to building thermal performance",
      "Provides secondary weather resistance beneath tile layer — reduces wind-driven rain ingress through tile laps during severe weather",
      "Condensation management — reduces risk of condensation formation on the underside of the roof structure in cold conditions",
      "Suitable for installation on pitched tiled roofs on timber battens — conforms to the general requirements of AS 4200.1 and AS 4200.2",
      "Available in a range of grades for different pitch and exposure conditions — confirm appropriate grade with Bradford TDS",
    ],
    limitations: [
      "Sarking is not a primary waterproofing membrane — it provides secondary weather resistance only — tile installation must comply with minimum pitch and installation requirements",
      "Replacement of sarking requires removal of tiles — cannot be replaced without a tile strip operation — factor into project scope and cost",
      "Perforated sarking has significantly reduced performance — any holes or tears must be lapped and taped",
      "Sarking must be installed with the reflective face in the correct orientation — confirm orientation per Bradford TDS",
      "Confirm current product specification and compliance with Bradford before specifying",
    ],
    procurementSources: [
      { name: "Bradford Insulation — trade supply — roofing and insulation distributors nationally", url: "https://www.bradfordinsulation.com.au" },
      { name: "Roofing distributors and building supply merchants nationally", url: "https://www.bradfordinsulation.com.au" },
    ],
  },
  {
    fullLabel: "Sika",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/sealing-bonding/joint-sealants/sikaflex-11-fc-plus.html",
    accentColor: "#8b5cf6",
    name: "Sikaflex-11 FC+",
    descriptionLine: "1-part polyurethane sealant for sealing ridge tile joints, flashing-to-tile transitions and roof penetration perimeters",
    productType: "1-part moisture-curing PU sealant for roofing joints",
    filterTags: ["Sealant", "PU", "1C", "Exterior", "Ridge", "Flashing"],
    techChips: [
      { label: "Polyurethane sealant", cls: "bg-sky-100 text-sky-800" },
      { label: "One-component", cls: "bg-slate-100 text-slate-700" },
      { label: "Moisture-cure", cls: "bg-slate-100 text-slate-700" },
      { label: "Exterior / roofing", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikaflex-11 FC+ is a one-component moisture-curing polyurethane sealant used in roofing applications for sealing ridge tile joints after mortar rebedding, sealing flashing-to-tile transitions, and sealing the perimeter of pipe flashing collars and penetration base plates. Applied by gun from cartridge — toolable after application to form a concave or flat joint profile.\n\nIn pitched tiled roof remediation, PU sealant is typically applied as a secondary seal over and around mortar-bedded ridge tiles, and at all metal flashing edges where sheet metal meets tile or masonry surfaces. It is not a substitute for correct mortar bedding of ridge tiles, but provides additional weather resistance at exposed joints. Confirm colour selection with client before application — available in multiple standard colours.",
    technicalProperties: [
      "1-component moisture-curing polyurethane — no site mixing required — consistent application quality",
      "Good elongation and movement accommodation — suitable for joints subject to thermal movement in exterior roof conditions",
      "Paintable after full cure with compatible exterior paint systems — confirm with Sika technical",
      "UV-resistant formulation suitable for exterior and roofing applications in Australian climate conditions",
      "Gun-applied from standard cartridge — toolable to concave or flat joint profile after application",
    ],
    limitations: [
      "Not a primary waterproofing membrane — used as a joint sealant and secondary seal around flashings and penetrations",
      "Must be applied to clean, dry surfaces — wet or contaminated joint faces will cause adhesion failure",
      "Do not apply in rain — protect fresh sealant from rain for minimum cure period per Sika TDS",
      "Primer may be required on porous or non-standard substrates — confirm with Sika TDS before application",
      "Confirm current product specification and compliance with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Bunnings — in-store nationally", url: "https://www.bunnings.com.au" },
      { name: "Roofing and waterproofing supply distributors nationally", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Monier",
    brandUrl: "https://www.monier.com.au",
    tdsUrl: "https://www.monier.com.au",
    accentColor: "#ec4899",
    name: "Monier Vibrant Single Roman Tile",
    descriptionLine: "Concrete interlocking single-roman profile roof tile — alternative profile for buildings where Marseille match is not available",
    productType: "Interlocking concrete roof tile — alternative profile",
    filterTags: ["Tile", "Concrete", "Replacement"],
    techChips: [
      { label: "Concrete tile", cls: "bg-sky-100 text-sky-800" },
      { label: "Single Roman profile", cls: "bg-slate-100 text-slate-700" },
      { label: "Direct replacement", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The Monier Vibrant Single Roman is a concrete interlocking roof tile with a single-roman profile, offered as an alternative to the Marseille profile for buildings where exact Marseille match is not achievable. Used where small areas of broken or missing tiles require replacement and an acceptable profile match can be agreed with the client.\n\nProfile matching remains critical — advise the client clearly if an exact profile match is not achievable and confirm in writing before proceeding with replacement. On strata buildings, a conspicuous tile mismatch may be visible to multiple lot owners and can lead to disputes. Confirm availability in the required colour and finish through Monier trade accounts before specifying.",
    technicalProperties: [
      "Single Roman concrete interlocking profile — widely available through Monier trade supply in Australia",
      "Manufactured to AS 2049 — Roof Tiles — for dimensional tolerance, strength and water absorption",
      "Available in a range of factory-applied colours and finishes — confirm match against existing tiles before ordering",
      "Interlocking side and head lap — self-draining — suitable for minimum pitch per Monier installation data",
      "Compatible nailing and hook-fix installation methods — confirm fixing method per Monier TDS and AS 2050",
    ],
    limitations: [
      "Profile is different from Marseille — confirm client acceptance of profile difference before ordering — document agreement in writing",
      "Colour and finish fading over time means new tiles will be conspicuous against weathered existing tiles",
      "Not a direct profile replacement for Marseille — only used where Marseille is not available and client accepts the difference",
      "Minimum roof pitch requirements apply — confirm compliance per Monier installation data",
      "Confirm current product specification and compliance with Monier before specifying",
    ],
    procurementSources: [
      { name: "Monier — trade accounts and roofing distributors nationally", url: "https://www.monier.com.au" },
    ],
  },
  {
    fullLabel: "Boral",
    brandUrl: "https://www.boral.com.au",
    tdsUrl: "https://www.boral.com.au",
    accentColor: "#6366f1",
    name: "Boral Terracotta Roof Tile",
    descriptionLine: "Terracotta clay interlocking roof tile for replacement of broken or missing tiles on buildings with original terracotta roof — confirm profile match before ordering",
    productType: "Terracotta clay interlocking roof tile — replacement",
    filterTags: ["Tile", "Terracotta", "Replacement"],
    techChips: [
      { label: "Terracotta clay", cls: "bg-sky-100 text-sky-800" },
      { label: "Interlocking", cls: "bg-slate-100 text-slate-700" },
      { label: "Direct replacement", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 2049", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Boral terracotta clay roof tiles are fired clay interlocking roof tiles used as replacement tiles on buildings with original terracotta roofs. Terracotta tiles are typically found on older Class 2 strata buildings and heritage-listed properties built prior to the widespread adoption of concrete tiles in Australia. Replacement tiles must match the original profile, colour and texture as closely as possible.\n\nProfile availability is a significant constraint in terracotta tile replacement — not all historical profiles remain in production. Boral maintains a range of terracotta tile profiles through their Australian manufacturing and distribution network, but availability of specific profiles and colours must be confirmed before specifying. For heritage-listed buildings, terracotta tile sourcing may require specialist suppliers and matching approval from the heritage authority.",
    technicalProperties: [
      "Fired terracotta clay — naturally weathering profile — does not require painting or coating",
      "Manufactured to AS 2049 — Roof Tiles — for dimensional tolerance, strength and water absorption",
      "Natural terracotta colour range — no factory-applied paint finish — colour matching relies on clay body match",
      "Interlocking profile — self-draining — suitable for minimum pitch per Boral installation data",
      "Suitable for use on heritage buildings where original terracotta tile profiles are specified — confirm heritage approval requirements with client",
    ],
    limitations: [
      "Profile and colour match is the critical constraint — confirm exact profile match before ordering — document match confirmation in writing with client",
      "Availability of specific historical terracotta profiles is limited — some profiles may no longer be in production — sourcing may require specialist heritage tile suppliers",
      "Terracotta tiles are heavier than concrete tiles — confirm roof structure can support the load before replacing concrete tiles with terracotta",
      "Heritage buildings may require heritage authority approval before tile replacement — confirm heritage status of building before specifying",
      "Confirm current product specification and compliance with Boral before specifying",
    ],
    procurementSources: [
      { name: "Boral Roofing — trade accounts and roofing distributors nationally", url: "https://www.boral.com.au" },
      { name: "Heritage tile specialists — for older or discontinued profiles", url: "https://www.boral.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Tile", label: "Tile" },
  { id: "Concrete", label: "Concrete" },
  { id: "Terracotta", label: "Terracotta" },
  { id: "Replacement", label: "Replacement" },
  { id: "Ridge", label: "Ridge" },
  { id: "Hip", label: "Hip" },
  { id: "Mortar", label: "Mortar" },
  { id: "Rebed", label: "Rebed" },
  { id: "Polymer-modified", label: "Polymer-modified" },
  { id: "Valley", label: "Valley" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Flashing", label: "Flashing" },
  { id: "Steel", label: "Steel" },
  { id: "Penetration", label: "Penetration" },
  { id: "Collar", label: "Collar" },
  { id: "EPDM", label: "EPDM" },
  { id: "Sarking", label: "Sarking" },
  { id: "Reflective-foil", label: "Reflective-foil" },
  { id: "Underlay", label: "Underlay" },
  { id: "Sealant", label: "Sealant" },
  { id: "PU", label: "PU" },
  { id: "1C", label: "One-component" },
  { id: "Exterior", label: "Exterior" },
];

const BRAND_EQUIV: { system: string; monier: string; boral: string; lysaght: string; deks: string; bradford: string; sika: string }[] = [
  { system: "Concrete interlocking tile", monier: "Marseille / Vibrant", boral: "—", lysaght: "—", deks: "—", bradford: "—", sika: "—" },
  { system: "Terracotta interlocking tile", monier: "—", boral: "Terracotta Range", lysaght: "—", deks: "—", bradford: "—", sika: "—" },
  { system: "Valley iron (Colorbond)", monier: "—", boral: "—", lysaght: "Trimdek", deks: "—", bradford: "—", sika: "—" },
  { system: "Pipe penetration collar", monier: "—", boral: "—", lysaght: "—", deks: "D-1 Multi", bradford: "—", sika: "—" },
  { system: "Sarking / underlay", monier: "—", boral: "—", lysaght: "—", deks: "—", bradford: "Anticon", sika: "—" },
  { system: "PU sealant", monier: "—", boral: "—", lysaght: "—", deks: "—", bradford: "—", sika: "Sikaflex-11 FC+" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; type: string; material: string; application: string; standard: string; primaryUse: string;
}[] = [
  {
    product: "Monier Marseille Concrete Tile",
    brand: "Monier",
    type: "Concrete interlocking tile",
    material: "Concrete",
    application: "Direct replacement",
    standard: "AS 2049",
    primaryUse: "Replacement of broken or missing concrete roof tiles",
  },
  {
    product: "Baumit UniRepair Rebed Mortar",
    brand: "Baumit",
    type: "Polymer-modified mortar",
    material: "Cementitious",
    application: "Ridge / hip rebed",
    standard: "—",
    primaryUse: "Rebedding ridge and hip tiles on pitched tiled roofs",
  },
  {
    product: "Lysaght Trimdek Valley Iron",
    brand: "Lysaght",
    type: "Valley iron",
    material: "Colorbond steel",
    application: "Valley replacement",
    standard: "BlueScope standard",
    primaryUse: "Internal valley lining — direct water to eave gutter",
  },
  {
    product: "Deks D-1 Multi Pipe Flashing",
    brand: "Deks",
    type: "Penetration collar",
    material: "EPDM rubber",
    application: "Pipe penetration",
    standard: "—",
    primaryUse: "Sealing pipe penetrations through pitched tiled and metal roofs",
  },
  {
    product: "Bradford Anticon Sarking",
    brand: "Bradford",
    type: "Reflective foil sarking",
    material: "Foil laminate",
    application: "Underlay / sarking",
    standard: "AS 4200.1 / AS 4200.2",
    primaryUse: "Secondary weather resistance and thermal insulation beneath tiles",
  },
  {
    product: "Sikaflex-11 FC+",
    brand: "Sika",
    type: "PU sealant",
    material: "Polyurethane",
    application: "Joint sealing",
    standard: "—",
    primaryUse: "Ridge joints, flashing-to-tile transitions, penetration perimeters",
  },
  {
    product: "Monier Vibrant Single Roman Tile",
    brand: "Monier",
    type: "Concrete interlocking tile",
    material: "Concrete",
    application: "Alternative profile replacement",
    standard: "AS 2049",
    primaryUse: "Replacement where Marseille profile is not available",
  },
  {
    product: "Boral Terracotta Roof Tile",
    brand: "Boral",
    type: "Terracotta clay tile",
    material: "Fired clay",
    application: "Direct replacement",
    standard: "AS 2049",
    primaryUse: "Replacement of broken or missing terracotta tiles",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Direct replacement of broken, cracked or missing concrete or terracotta roof tiles on pitched tiled roofs on Class 2 strata buildings",
    "Full or partial ridge and hip tile rebed using polymer-modified mortar — removal of cracked or debonded sand/cement mortar beds",
    "Valley iron replacement — removal and replacement of corroded, buckled or blocked Colorbond valley irons",
    "Pipe penetration collar replacement — removing failed lead or EPDM collars around vent pipes and exhaust fan penetrations",
    "Sarking replacement as part of tile strip-and-relay operations following storm damage or major ridge rebed works",
  ],
  selectionCriteria: [
    "Confirm tile profile and colour match before ordering — partial replacement with mismatched tiles is conspicuous and may be unacceptable on strata buildings",
    "Select polymer-modified rebed mortar over traditional sand/cement mix for ridge and hip rebed — improved adhesion and durability",
    "Confirm valley iron profile suits the tile profile and roof pitch before ordering pre-formed valley iron",
    "Select EPDM pipe collar where lead-free installation is preferred — confirm pipe diameter suits product range",
    "Inspect sarking condition before commencing ridge rebed — replace sarking if perforated or degraded during any tile strip operation",
  ],
  limitations: [
    "Tile matching across colour, profile and finish is the most significant limitation in pitched tiled roof repair — colour fading of existing tiles makes exact matching difficult",
    "Full ridge rebed is labour-intensive — access and fall protection requirements must be addressed before work commences",
    "Valley iron replacement requires removal of tiles on both sides of the valley — weather window planning is essential",
    "Sarking cannot be replaced without removing tiles — sarking replacement must be scoped as part of a larger tile strip operation",
    "Terracotta tile profiles from discontinued production lines may only be available from specialist heritage tile suppliers at premium cost",
  ],
  standardsNotes: [
    "AS 2049 — Roof Tiles — covers concrete and clay roof tile requirements including dimensional tolerances, strength and water absorption",
    "AS 2050 — Installation of Roof Tiles — covers fixing, lap and pitch requirements for concrete and terracotta roof tiles",
    "AS 4200.1 / AS 4200.2 — Pliable Building Membranes — covers sarking requirements including vapour permeability, strength and installation",
    "WHS Regulation 2017 Part 4.5 — Work on roofs — requires edge protection and fall protection before any roof access",
  ],
  suitableDefects: [
    "Broken, cracked or missing concrete or terracotta roof tiles causing direct water ingress or vulnerable to wind uplift",
    "Failed or cracked ridge and hip tile mortar beds — cracked, hollow or missing mortar allowing water ingress behind ridge tiles",
    "Corroded, buckled or blocked valley irons causing valley overflow and water ingress into the roof space",
    "Failed pipe penetration flashings — corroded lead or split EPDM collars around vent pipes and exhaust fan penetrations",
    "Degraded or perforated sarking providing inadequate secondary weather resistance beneath tiles",
  ],
  typicalSubstrates: [
    "Concrete and terracotta interlocking roof tiles — pitched roof replacement and repair",
    "Timber battens and rafters — sarking installation substrate",
    "Concrete or clay tile surfaces — Sikaflex-11 FC+ joint sealing at ridge and flashing interfaces",
    "Colorbond and zincalume metal substrates — valley iron and flashing interfaces",
    "Pipes and roof penetrations — EPDM collar installation substrate",
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

export function RoofLeaksIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are pitched tiled roof repair systems?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Pitched tiled roofs on Australian Class 2 strata apartment buildings fail for a range of interrelated reasons: individual tiles break or become dislodged by storm events, wind or foot traffic; ridge and hip mortar beds crack and debond through thermal cycling and shrinkage, allowing tiles to lift and water to track beneath them; valley irons corrode, buckle or become blocked by debris causing overflow into the roof space; sarking degrades or is punctured, eliminating the secondary weather barrier beneath the tiles; and pipe penetration flashings split or corrode, admitting water directly around plumbing vents and exhaust fans.
        </p>
        <p>
          Effective pitched tiled roof remediation requires a layered repair approach addressing all failure modes present, not just the most obvious leak point. Tile replacement addresses direct ingress through broken or missing tiles. Ridge and hip rebed using polymer-modified mortar restores the primary weather seal at roof apex joints. Valley iron renewal eliminates blocked or corroded valleys as a source of overflow. Sarking replacement (as part of a tile strip operation) restores the secondary weather barrier. Penetration collar replacement seals vent and exhaust penetrations. Sealant is applied as a secondary seal at flashing and joint interfaces.
        </p>
        <p>
          Material selection for Australian Class 2 buildings requires consideration of tile profile and colour match (concrete vs terracotta, profile variants within each range), Colorbond colour match for valley irons and flashings, EPDM vs lead for penetration collars (EPDM is preferred on new work as it eliminates lead-handling requirements), and sarking grade appropriate to the roof pitch and exposure. Heritage-listed buildings require additional approvals before tile replacement and may require sourcing tiles from specialist suppliers.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse with:</p>
          <ul className="space-y-1.5">
            {[
              "Flat roof waterproofing membranes — sheet membranes and liquid membranes for flat or low-pitch roofs, not tiled roof repair",
              "Box gutter lining — internal box gutter lining systems, not valley iron for tiled roofs",
              "Render and masonry repair — facade repair systems, not roofing",
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

export function RoofLeaksProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">8 products — 6 brands — pitched tiled roof repair systems — scroll to view all</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side technical comparison of pitched tiled roof repair products. Confirm current product specifications with manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Application</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600">{row.application}</td>
                  <td className="px-4 py-3 text-slate-600">{row.standard}</td>
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
            <p className="mt-1 text-sm text-slate-500">Pitched tiled roof repair product equivalents across brands active in Australian Class 2 strata remediation.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Monier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#6366f1" }}>Boral</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#eab308" }}>Lysaght</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Deks</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#3b82f6" }}>Bradford</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#8b5cf6" }}>Sika</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.monier, row.boral, row.lysaght, row.deks, row.bradford, row.sika].map((val, j) => (
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
          <h3 className="text-base font-extrabold text-amber-900">Tile matching and fall protection are critical</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Profile, colour and finish match must be confirmed before tile order — partial replacement with mismatched tiles is conspicuous and may be unacceptable to strata lot owners and the owners corporation",
            "WHS Regulation 2017 Part 4.5 requires edge protection and fall protection before any roof access — do not commence roof work without compliant fall protection in place",
            "Full ridge rebed is recommended when mortar is cracked across multiple tiles — spot repointing of isolated joints rarely achieves long-term durability and may mask underlying mortar failure",
            "Check sarking condition under tiles before rebedding ridge or hip tiles — if sarking is perforated or degraded, replace it as part of the current tile strip operation rather than scheduling a separate roof access event",
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
