"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "SBS"
  | "APP"
  | "Base-sheet"
  | "Cap-sheet"
  | "Torch-applied"
  | "Two-layer"
  | "Single-layer"
  | "Polyester-reinforced"
  | "Fibreglass-reinforced"
  | "Mineral-faced"
  | "Exposed"
  | "Protected-finish"
  | "UV-stable"
  | "Balcony-terrace"
  | "Roof-deck"
  | "Podium"
  | "AS-4858"
  | "AS-4654"
  | "Licensed-applicator";

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
    fullLabel: "Soprema Australia",
    brandUrl: "https://www.soprema.com.au",
    tdsUrl: "https://www.soprema.com.au",
    accentColor: "#1e40af",
    name: "Soprema Sopralene Flam 180 AR",
    descriptionLine: "SBS elastomeric modified bitumen — polyester-reinforced torch-on base sheet",
    productType: "SBS modified bitumen — torch-on base sheet",
    filterTags: ["SBS", "Base-sheet", "Torch-applied", "Two-layer", "Polyester-reinforced", "Balcony-terrace", "Roof-deck", "Podium", "Protected-finish", "AS-4858", "Licensed-applicator"],
    techChips: [
      { label: "SBS elastomeric", cls: "bg-blue-100 text-blue-800" },
      { label: "Torch-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Base / underlay sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Polyester reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Anti-root", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Sopralene Flam 180 AR is Soprema's SBS (styrene-butadiene-styrene) elastomeric modified bitumen torch-on base sheet, polyester-reinforced, with anti-root properties for balcony, terrace, and podium applications. It is the base/underlay layer in a two-layer torch-on system — not a finished surface on its own. Applied by gas torch to a correctly primed and prepared concrete substrate, the sheet is fully bonded at laps with minimum 100 mm side and 150 mm end lap seals. A Soprema-approved cap sheet (Sopralene Flam 250 or equivalent) is applied over the base sheet to complete the two-layer system. Lap seam integrity and corner detailing are the primary quality hold points in torch-on application.",
    technicalProperties: [
      "SBS elastomeric modifier — higher elongation and cold weather flexibility than APP-modified systems",
      "Polyester reinforcement — good dimensional stability and tear resistance under torch application",
      "Anti-root formulation — suitable for podium, planter box, and balcony applications where root resistance is specified",
      "Factory-manufactured sheet — consistent thickness and composition across the entire roll",
      "Suitable for two-layer torch-on systems on concrete balconies, terraces, and podium slabs",
    ],
    limitations: [
      "Base sheet only — must be overlaid with a compatible cap sheet — do not leave as the exposed surface",
      "Requires licensed gas torch applicator — torch-on application is not suitable for unlicensed or inexperienced operators",
      "Fire watch required during and after torch application on occupied buildings — confirm fire management requirements with the principal",
      "Primer mandatory on all concrete substrates — confirm Soprema-compatible primer with technical representative",
      "Lap seam quality is the primary failure mode — all laps must be correctly heated, bonded, and inspected during application",
    ],
    procurementSources: [
      { name: "Soprema Australia — trade supply — contact for current pricing", url: "https://www.soprema.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Soprema Australia",
    brandUrl: "https://www.soprema.com.au",
    tdsUrl: "https://www.soprema.com.au",
    accentColor: "#1e40af",
    name: "Soprema Sopralene Flam 250 S",
    descriptionLine: "SBS elastomeric modified bitumen — mineral slate-faced torch-on cap sheet",
    productType: "SBS modified bitumen — torch-on cap / finish sheet",
    filterTags: ["SBS", "Cap-sheet", "Torch-applied", "Two-layer", "Polyester-reinforced", "Mineral-faced", "Exposed", "UV-stable", "Balcony-terrace", "Roof-deck", "Podium", "AS-4858", "Licensed-applicator"],
    techChips: [
      { label: "SBS elastomeric", cls: "bg-blue-100 text-blue-800" },
      { label: "Torch-applied cap sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Mineral slate surfaced", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
      { label: "Exposed finish", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sopralene Flam 250 S is Soprema's SBS elastomeric modified bitumen cap sheet — the finish layer in a two-layer torch-on waterproofing system. The 'S' designation refers to the mineral slate granule surfacing bonded to the top surface, which provides UV resistance, foot traffic protection, and a finished appearance without requiring a tile or screed overlay. Applied by torch over the cured Sopralene Flam 180 AR base sheet. The cap sheet provides the weatherproof, UV-stable, exposed finish in balcony and roof deck applications where tiles or screed are not required. Slate surfacing is available in a limited colour range — confirm with Soprema technical.",
    technicalProperties: [
      "SBS elastomeric modifier — maintains flexibility at low temperatures — suitable for exposed external balcony and roof applications",
      "Mineral slate granule surfacing — UV-stable exposed finish — eliminates need for protective topping in many applications",
      "Factory-manufactured to consistent thickness — typically 4 mm nominal for cap sheet applications",
      "Torch-applied to base sheet — creates a fully bonded two-layer waterproofing system",
      "Suitable as an exposed finish on balconies, terraces, and roof decks where foot traffic is light to moderate",
    ],
    limitations: [
      "Requires correct base sheet below — do not torch Sopralene Flam 250 S directly to bare concrete without a base sheet in a two-layer specification",
      "Requires licensed gas torch applicator — fire watch and fire management plan required on occupied strata buildings",
      "Foot traffic limited to light pedestrian use unless confirmed otherwise with Soprema technical — not for vehicular traffic",
      "Slate surfacing colour selection is limited — confirm colour range with Soprema Australia before specifying",
      "Confirm current product name and specification with Soprema Australia — product range subject to periodic revision",
    ],
    procurementSources: [
      { name: "Soprema Australia — trade supply — contact for current pricing", url: "https://www.soprema.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "IKO Australia",
    brandUrl: "https://www.iko.com",
    tdsUrl: "https://www.iko.com",
    accentColor: "#dc2626",
    name: "IKO Armourbase Pro",
    descriptionLine: "SBS modified bitumen — polyester-reinforced torch-on base sheet for commercial and residential waterproofing",
    productType: "SBS modified bitumen — torch-on base sheet",
    filterTags: ["SBS", "Base-sheet", "Torch-applied", "Two-layer", "Polyester-reinforced", "Balcony-terrace", "Roof-deck", "Protected-finish", "AS-4858", "Licensed-applicator"],
    techChips: [
      { label: "SBS modified bitumen", cls: "bg-red-100 text-red-800" },
      { label: "Torch-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Base / underlay sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Polyester reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Commercial grade", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "IKO Armourbase Pro is a polyester-reinforced SBS modified bitumen torch-on base sheet for use as the underlay layer in two-layer modified bitumen waterproofing systems on balconies, terraces, podiums, and flat roofs. IKO (International Kerrobit Oilcorp) is a global modified bitumen manufacturer with Australian distribution. Applied by gas torch to primed concrete or metal deck substrates. All laps are torch-bonded minimum 100 mm side and 150 mm end laps. An IKO Armour Cap or equivalent cap sheet must be applied over Armourbase Pro to complete the waterproofing system.",
    technicalProperties: [
      "SBS modified bitumen — elastomeric flexibility — performs well in the thermal cycling conditions typical of Australian external balconies",
      "Polyester reinforcement — good elongation and resistance to tearing during torch application",
      "Commercial and residential grade — suitable for strata balcony, podium slab, and flat roof applications",
      "Factory-manufactured sheet product — consistent bitumen coverage and carrier reinforcement throughout the roll",
      "Available through established IKO Australian distribution network — confirm local distributor with IKO",
    ],
    limitations: [
      "Base sheet only — IKO Armour Cap or a compatible cap sheet is required to complete the system",
      "Licensed gas torch applicator required — not suitable for general building contractors without torch-on waterproofing training and licensing",
      "Fire watch mandatory during application on occupied strata buildings — confirm fire management requirements with building management before commencing",
      "Primer required on all concrete substrates — confirm IKO-compatible primer with distributor before application",
      "Confirm current product name, availability, and AS compliance status with IKO Australian distributor before specifying",
    ],
    procurementSources: [
      { name: "IKO Australia — via trade distributors — confirm local distributor with IKO", url: "https://www.iko.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "IKO Australia",
    brandUrl: "https://www.iko.com",
    tdsUrl: "https://www.iko.com",
    accentColor: "#dc2626",
    name: "IKO Armour Cap",
    descriptionLine: "Modified bitumen torch-on cap sheet — mineral-surfaced exposed finish for balcony and roof applications",
    productType: "Modified bitumen — torch-on cap / finish sheet",
    filterTags: ["SBS", "APP", "Cap-sheet", "Torch-applied", "Two-layer", "Mineral-faced", "Exposed", "UV-stable", "Balcony-terrace", "Roof-deck", "AS-4858", "Licensed-applicator"],
    techChips: [
      { label: "Modified bitumen", cls: "bg-red-100 text-red-800" },
      { label: "Torch-applied cap sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Mineral surfaced", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
      { label: "Exposed or protected", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "IKO Armour Cap is a modified bitumen torch-on cap / finishing sheet with mineral granule surfacing applied over the IKO Armourbase Pro base sheet to complete a two-layer system. The mineral granule surface provides UV stability, a finished appearance, and resistance to light foot traffic without requiring a separate tile or screed overlay. Applied by torch on top of the base sheet with laps bonded using the torch. Suitable for exposed balcony, terrace, and flat roof applications. Confirm whether SBS or APP formulation is specified — both may be available — as this affects cold weather performance and UV resistance characteristics.",
    technicalProperties: [
      "Mineral granule surfacing — UV-stable exposed finish without the need for a tile, screed, or coating overlay on many projects",
      "Torch-bonded to base sheet — creates a fully integrated two-layer modified bitumen waterproofing system",
      "Suitable for exposed balcony, terrace, and flat roof applications with light to moderate pedestrian foot traffic",
      "Available in limited mineral granule colours — slate grey and terracotta commonly stocked",
      "Complement to IKO Armourbase Pro — both products are from the same IKO system for warranty and compatibility assurance",
    ],
    limitations: [
      "Requires IKO Armourbase Pro base sheet below — not intended to be applied directly to unprimed concrete without a base layer in a two-layer system",
      "Licensed gas torch applicator required — fire watch required on occupied strata buildings",
      "Confirm SBS vs APP formulation against project specification — APP is less flexible at low temperatures but more resistant to UV in some formulations",
      "Foot traffic must be confirmed as light pedestrian only — confirm load rating with IKO if heavier use is expected",
      "Confirm current product availability and specification with IKO Australian distributor before specifying",
    ],
    procurementSources: [
      { name: "IKO Australia — via trade distributors — confirm local distributor with IKO", url: "https://www.iko.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Nuralite Waterproofing",
    brandUrl: "https://www.nuralite.co.nz",
    tdsUrl: "https://www.nuralite.co.nz",
    accentColor: "#16a34a",
    name: "Nuralite NP250",
    descriptionLine: "SBS modified bitumen torch-on membrane — residential and light commercial balcony and roof waterproofing",
    productType: "SBS modified bitumen — torch-on membrane",
    filterTags: ["SBS", "Torch-applied", "Polyester-reinforced", "Balcony-terrace", "Roof-deck", "Protected-finish", "Exposed", "AS-4858", "Licensed-applicator"],
    techChips: [
      { label: "SBS modified bitumen", cls: "bg-green-100 text-green-800" },
      { label: "Torch-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Polyester reinforced", cls: "bg-slate-100 text-slate-700" },
      { label: "Residential / light commercial", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm with Nuralite TDS", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Nuralite NP250 is understood to be an SBS modified bitumen polyester-reinforced torch-on waterproofing membrane in the Nuralite range, suitable for residential and light commercial balcony and flat roof waterproofing. Nuralite is a New Zealand-based waterproofing manufacturer with established distribution in Australia. Their modified bitumen membranes are used in residential strata and stand-alone dwelling applications. The NP250 designation refers to the nominal 250 g/m² polyester reinforcement. Confirm the current product name, specification, and whether a single-layer or two-layer system is required for your project with Nuralite's Australian representative before specifying.",
    technicalProperties: [
      "SBS modified bitumen — elastomeric flexibility for thermal movement on residential balcony and roof substrates",
      "Polyester reinforcement — dimensional stability and good resistance to tear propagation",
      "Suitable for residential and light commercial balcony, deck, and flat roof waterproofing applications",
      "Available through Nuralite Australian distribution — confirm local representative or distributor",
      "Established product in New Zealand and Australian residential waterproofing practice",
    ],
    limitations: [
      "Product name and exact specification must be confirmed with the current Nuralite NP250 TDS — do not specify from this reference alone",
      "Confirm whether a single-layer or two-layer system is required for the project specification — Nuralite may require a base layer below NP250 in some applications",
      "Licensed gas torch applicator required — fire management plan required on occupied buildings",
      "Nuralite distribution in Australia may be limited in some regions — confirm local distributor before specifying on any project",
      "Confirm AS 4858 compliance and classification with Nuralite representative before specifying on Class 2 strata buildings",
    ],
    procurementSources: [
      { name: "Nuralite — confirm Australian distributor via nuralite.co.nz", url: "https://www.nuralite.co.nz" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Polyglass / Mapei Group",
    brandUrl: "https://www.polyglass.it",
    tdsUrl: "https://www.polyglass.it",
    accentColor: "#7c3aed",
    name: "Polyglass Polybest",
    descriptionLine: "SBS/APP modified bitumen torch-on membrane — via Parchem and building trade distribution in Australia",
    productType: "Modified bitumen — torch-on membrane — confirm product type with distributor",
    filterTags: ["SBS", "APP", "Torch-applied", "Polyester-reinforced", "Balcony-terrace", "Roof-deck", "AS-4858", "Licensed-applicator"],
    techChips: [
      { label: "Modified bitumen", cls: "bg-violet-100 text-violet-800" },
      { label: "SBS or APP — confirm", cls: "bg-slate-100 text-slate-700" },
      { label: "Torch-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei Group", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm with distributor TDS", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Polyglass is a modified bitumen membrane manufacturer within the Mapei Group, with products distributed in Australia through Parchem and building trade suppliers. Their Polybest range covers SBS and APP modified bitumen torch-on membranes for flat roof, balcony, and deck waterproofing. As with other modified bitumen systems, torch-on application requires a licensed gas torch applicator, primer on all substrates, correctly bonded lap seams, and proper penetration detailing. The specific product formulation (SBS vs APP), reinforcement carrier, and finish type must be confirmed against the current Polyglass TDS and Australian distributor stocking list before specifying.",
    technicalProperties: [
      "Mapei Group product — established manufacturer with quality control and technical documentation available",
      "Modified bitumen chemistry — SBS or APP formulation depending on specific product — confirm before specifying",
      "Polyester or fibreglass reinforcement depending on product variant — confirm with distributor",
      "Distributed via Parchem and other building trade channels in Australia — confirm current local availability",
      "Suitable for balcony, deck, terrace, and flat roof waterproofing applications where torch-on systems are appropriate",
    ],
    limitations: [
      "Product name, formulation (SBS or APP), reinforcement type, and exact specification must be confirmed against the current Polyglass TDS — do not specify from this reference alone",
      "Confirm Australian availability with Parchem or local Polyglass distributor before including in a project specification",
      "Licensed gas torch applicator required — fire watch and fire management plan required on occupied strata buildings",
      "Confirm AS 4858 compliance and classification with Parchem or Polyglass technical before specifying",
      "Confirm whether a single-layer or two-layer system is required for the project — base and cap sheet requirements vary by product",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — confirm Polyglass stocking and current product list", url: "https://www.parchem.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-150/",
    accentColor: "#f97316",
    name: "ARDEX WPM 150",
    descriptionLine: "APP modified bitumen — 3.0 mm polyester + fibreglass reinforced torch-on base / underlay sheet",
    productType: "APP modified bitumen — torch-on base / underlay sheet",
    filterTags: ["APP", "Base-sheet", "Torch-applied", "Two-layer", "Polyester-reinforced", "Fibreglass-reinforced", "Balcony-terrace", "Roof-deck", "Protected-finish", "AS-4858", "Licensed-applicator"],
    techChips: [
      { label: "APP plastomeric", cls: "bg-orange-100 text-orange-800" },
      { label: "Torch-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Base / underlay sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Polyester + fibreglass", cls: "bg-slate-100 text-slate-700" },
      { label: "3.0 mm — 35 kg/roll", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX WPM 150 (Shelterbit 3/160) is a 3.0 mm nominal thickness APP (Atactic Polypropylene) modified bitumen torch-on base sheet, reinforced with a combined polyester and fibreglass carrier. It is the base/underlay layer in ARDEX's two-layer APP torch-on system — applied first to the primed concrete substrate, with WPM 185 mineral cap sheet torched over the top to complete the system. WPM 150 is a sandwich membrane and must be protected from UV radiation — it cannot be left as an exposed surface. The polythene film on the underside acts as a temperature indicator during torch application — when the film melts, the compound is at the correct bonding temperature. Suitable for balconies, terraces, and roofs in single-layer or multi-layer systems. Installer must be licensed and experienced in torch-on application.",
    technicalProperties: [
      "APP modified compound — good UV and heat resistance once capped with mineral sheet",
      "Combined polyester and fibreglass reinforcement (150 g/m²) — high mechanical characteristics and puncture resistance",
      "Cold flexibility to −5°C — heat stability to 110°C",
      "3.0 mm nominal thickness — 35 kg per roll — 1 m × 10 m rolls — top surface: sand — bottom: polythene torch film",
      "Heat-welded laps provide a homogenous joint — suitable for horizontal and vertical applications on balconies, terraces, and roofs",
    ],
    limitations: [
      "Sandwich membrane — must be protected from UV radiation — do not leave as an exposed finished surface",
      "WPM 185 mineral cap sheet required over WPM 150 to complete a UV-stable two-layer system",
      "ARDEX WPM 240 primer mandatory on all concrete substrates before application of base sheet",
      "Licensed gas torch applicator required — fire watch and hot works permit required on occupied strata buildings",
      "Do not use open flame near combustible materials, gas lines, or penetrations without fire protection measures",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wpm-185/",
    accentColor: "#f97316",
    name: "ARDEX WPM 185",
    descriptionLine: "APP modified bitumen — 4.0 mm mineral slate-faced torch-on cap / finish sheet",
    productType: "APP modified bitumen — torch-on mineral cap / finish sheet",
    filterTags: ["APP", "Cap-sheet", "Torch-applied", "Two-layer", "Polyester-reinforced", "Fibreglass-reinforced", "Mineral-faced", "Exposed", "UV-stable", "Balcony-terrace", "Roof-deck", "AS-4858", "Licensed-applicator"],
    techChips: [
      { label: "APP plastomeric", cls: "bg-orange-100 text-orange-800" },
      { label: "Torch-applied cap sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Mineral slate surfaced", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
      { label: "4.0 mm — 4.5 kg/m²", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "ARDEX WPM 185 (Shelterbit Mineral Membrane) is ARDEX's APP modified bitumen mineral-faced cap sheet — the exposed finish layer in a two-layer ARDEX torch-on system. At 4.5 kg/m² and 4.0 mm nominal thickness, it is heavier and thicker than the WPM 150 base sheet it covers. The slate mineral granule topping provides UV stability, weather resistance, and light maintenance foot traffic capability, making WPM 185 the exposed surface where tiles or screed are not required. Available in slate grey and white mineral finishes. WPM 185 is torch-bonded directly over the cured WPM 150 base sheet — WPM 240 primer is not required between the two ARDEX layers, but the base layer must be clean, sound, and dry before the cap sheet is applied. Together, WPM 150 and WPM 185 form ARDEX's complete two-layer APP torch-on system for balconies, terraces, and roofs.",
    technicalProperties: [
      "APP modified compound — UV and heat resistant mineral cap sheet",
      "Combined polyester and fibreglass reinforcement — positive vapour barrier",
      "Slate mineral granule topping — UV stable — exposed finish without requiring tile or screed overlay",
      "Available in slate grey and white mineral finishes",
      "4.5 kg/m² weight — 4.0 mm nominal thickness — 1 m × 8 m rolls — cold flexibility to −5°C",
      "Torch-bonded laps at minimum 100 mm side, 150 mm end — allows light maintenance foot traffic on exposed surfaces",
    ],
    limitations: [
      "Light maintenance foot traffic only — not a heavy pedestrian trafficable finish — confirm traffic loads with ARDEX technical before specifying",
      "Must be applied over a compatible base sheet (WPM 150) — do not apply WPM 185 directly to bare unprimed concrete without a base layer in a two-layer specification",
      "Licensed gas torch applicator required — fire watch and hot works permit required on occupied strata buildings",
      "Do not use open flame near combustible materials or penetrations without fire protection measures",
      "Confirm colour availability with ARDEX Australia — slate grey and white mineral are standard but confirm before specifying",
      "Confirm current product specification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremco.com.au",
    tdsUrl: "https://www.tremco.com.au/products/tremproof-torch-3000",
    accentColor: "#0891b2",
    name: "TREMproof Torch 3000",
    descriptionLine: "APP modified bitumen — 3 mm polyester-reinforced torch-on base sheet — AS 4654.1 tested",
    productType: "APP modified bitumen — torch-on base sheet",
    filterTags: ["APP", "Base-sheet", "Torch-applied", "Two-layer", "Polyester-reinforced", "Balcony-terrace", "Roof-deck", "Podium", "Protected-finish", "AS-4654", "Licensed-applicator"],
    techChips: [
      { label: "APP plastomeric", cls: "bg-cyan-100 text-cyan-800" },
      { label: "Torch-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Base / underlay sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Polyester 180 g/m²", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 4654 tested", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "TREMproof Torch 3000 is a 3 mm thick APP modified bituminous torch-applied base sheet — the underlay layer in Tremco's two-layer torch-on system (Torch 3000 base + Torch 4000M mineral cap). Reinforced with a 180 g/m² non-woven polyester mat impregnated and coated with APP polymer modified bitumen. Used for waterproofing balconies, terraces, podium slabs, plaza decks, retaining walls, planter boxes, and roofs in single-layer or multi-layer applications. TREMproof Torch 3000 must not be used as an exposed membrane — it requires a mineral-faced cap sheet or protection layer over the top. Primer is the Tremco Torch Bitumen Primer (solvent based) applied at 6–8 m²/L, allowed to become tack-free before membrane application. Tested to AS 4654.1. Tremco CPG also supplies the liquid polyurethane membrane Vulkem 350R referenced elsewhere on this site.",
    technicalProperties: [
      "APP modified bitumen — higher softening point than SBS — suited to hot climate and high UV environments when capped",
      "180 g/m² non-woven polyester reinforcement — high strength and puncture resistance",
      "3 mm nominal thickness — 1 m × 10 m rolls — top surface: silica sand — bottom: perforated polypropylene torch film",
      "Low filler quantity — assists melting of bitumen for ease of torch installation and consistent bonding",
      "Consistent 1 m wide roll — accurate material quoting and uniform installation",
      "Tested to AS 4654.1 — confirmed for external above-ground use in single-layer or multi-layer systems",
    ],
    limitations: [
      "Not to be used as an exposed membrane — must be covered with TREMproof Torch 4000M cap sheet or a protection layer",
      "Not recommended for installation over existing membranes or on damp surfaces",
      "Not for use in potable water areas",
      "Tremco Torch Bitumen Primer (solvent based) mandatory on all substrates before application — applied at 6–8 m²/L",
      "Licensed gas torch applicator required — fire watch required on occupied strata buildings",
      "Confirm current product specification with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply", url: "https://www.tremco.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "The Waterproof Supplier", url: "https://thewaterproofingsupplier.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/dam/dms/au01/l/sikashield-p24-peargo3mm.pdf",
    accentColor: "#be123c",
    name: "SikaShield P24 PE Argo 3 mm",
    descriptionLine: "APP modified bitumen — 3 mm polyester + glass fibre torch-on base sheet — formerly Index Argo 3mm",
    productType: "APP modified bitumen — torch-on base sheet",
    filterTags: ["APP", "Base-sheet", "Torch-applied", "Two-layer", "Polyester-reinforced", "Fibreglass-reinforced", "Balcony-terrace", "Roof-deck", "Podium", "Protected-finish", "AS-4654", "Licensed-applicator"],
    techChips: [
      { label: "APP plastomeric", cls: "bg-rose-100 text-rose-800" },
      { label: "Torch-applied", cls: "bg-slate-100 text-slate-700" },
      { label: "Base / underlay sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Polyester + glass fibre", cls: "bg-slate-100 text-slate-700" },
      { label: "Formerly Index Argo 3mm", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "SikaShield P24 PE Argo 3 mm (formerly Index Argo 3 mm) is Sika's 3 mm APP modified bituminous torch-on base sheet — the underlay layer in a two-layer SikaShield system, paired with the SikaShield P44 MG Fidia cap sheet. Reinforced with a non-woven polyester fabric dimensionally stabilised with glass fibre and flexible at 0°C. The sand-coated top surface ensures adhesion bond to the overlying cap sheet and fast welding of joints. The underside burn-off film acts as the torching indicator. Used as a base sheet for balconies, terraces, flat roofs, wet areas, basements, horizontal concrete slabs, decks, and podiums. Not suitable for surfaces permanently exposed to UV radiation — requires a mineral-surfaced cap sheet or protection layer above. CE marked to EN 13707 and EN 13969. Sika also supplies the liquid polyurethane membranes Sikalastic-487 and SikaTile-110 Secure Proof referenced elsewhere on this site.",
    technicalProperties: [
      "APP modified bitumen — plastomeric modifier — good heat and UV resistance when used in a capped two-layer system",
      "Non-woven polyester fabric reinforcement stabilised with glass fibre — good dimensional stability and puncture resistance",
      "Flexible at 0°C — 3 mm thickness — sand top surface — burn-off polypropylene film underside",
      "Sand top surface ensures good adhesion bond for the overlying cap sheet layer",
      "CE marked to EN 13707 and EN 13969 — suitable for balconies, terraces, concrete slabs, and podiums",
    ],
    limitations: [
      "Not suitable for surfaces permanently exposed to UV radiation — must be covered with SikaShield P44 MG Fidia cap sheet or equivalent mineral-faced cap sheet",
      "Primer required on all substrates — confirm Sika-compatible primer with Sika technical before application",
      "Side lap minimum 100 mm, end lap minimum 150 mm — bead of melted bitumen must be visible along full lap length",
      "Licensed gas torch applicator required — fire watch required on occupied strata buildings",
      "Overheating will damage the polyester reinforcement — keep the torch moving at all times during application",
      "Confirm current product specification with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/dam/dms/au01/g/sikashield-p44-mgfidia45kgm.pdf",
    accentColor: "#be123c",
    name: "SikaShield P44 MG Fidia 4.5 kg/m²",
    descriptionLine: "APP modified bitumen — 4.5 kg/m² mineral granule-faced torch-on cap sheet — formerly Index Fidia Mineral — AS 4654.1",
    productType: "APP modified bitumen — torch-on mineral cap / finish sheet",
    filterTags: ["APP", "Cap-sheet", "Torch-applied", "Two-layer", "Polyester-reinforced", "Fibreglass-reinforced", "Mineral-faced", "Exposed", "UV-stable", "Balcony-terrace", "Roof-deck", "AS-4654", "Licensed-applicator"],
    techChips: [
      { label: "APP plastomeric", cls: "bg-rose-100 text-rose-800" },
      { label: "Torch-applied cap sheet", cls: "bg-slate-100 text-slate-700" },
      { label: "Mineral granule surfaced", cls: "bg-slate-100 text-slate-700" },
      { label: "UV stable", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 4654.1 compliant", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "SikaShield P44 MG Fidia 4.5 kg/m² (formerly Index Fidia Mineral) is Sika's APP modified bituminous mineral granule-faced cap sheet — the exposed UV-stable finish layer in a two-layer SikaShield torch-on system. At 4.5 kg/m², it is heavier than the P24 PE Argo 3 mm base sheet it covers, providing a more robust exposed surface. The mineral granule top surface allows permanent exposure to UV radiation — it is specifically designed to function as the exposed weatherproof finish on balconies, terraces, and flat roofs without requiring a tile or screed overlay. Reinforced with a non-woven polyester fabric dimensionally stabilised with glass fibre and flexible at −10°C. Suitable for flat or sloping roofs with up to 15% gradient. Complies with AS 4654.1-2012 — test certificate available from Sika upon request.",
    technicalProperties: [
      "APP modified bitumen — mineral granule surfacing rated for permanent UV exposure",
      "Non-woven polyester fabric reinforcement stabilised with glass fibre — flexible at −10°C",
      "4.5 kg/m² weight — mineral granule top surface — burn-off film underside",
      "UV-stable exposed finish — no tile or screed overlay required for standard balcony and terrace applications",
      "Complies with AS 4654.1-2012 — CE marked to EN 13707 — suitable for flat or sloping roofs up to 15% gradient",
    ],
    limitations: [
      "Exposed cap sheet only — must be applied over SikaShield P24 PE Argo or compatible base sheet — do not apply directly to unprimed concrete without a base layer",
      "Light foot traffic only — not a heavy pedestrian trafficable finish — confirm traffic requirements with Sika technical for heavier use",
      "Side lap minimum 100 mm, end lap minimum 150 mm — bead of melted bitumen must be visible along full lap length",
      "Licensed gas torch applicator required — fire watch required on occupied strata buildings",
      "Overheating will melt the polyester reinforcement — keep the torch moving continuously during application",
      "Confirm current product specification and AS 4654.1 compliance status with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "SBS", label: "SBS elastomeric" },
  { id: "APP", label: "APP plastomeric" },
  { id: "Base-sheet", label: "Base / underlay sheet" },
  { id: "Cap-sheet", label: "Cap / finish sheet" },
  { id: "Torch-applied", label: "Torch-applied" },
  { id: "Two-layer", label: "Two-layer system" },
  { id: "Single-layer", label: "Single-layer" },
  { id: "Polyester-reinforced", label: "Polyester reinforced" },
  { id: "Fibreglass-reinforced", label: "Fibreglass reinforced" },
  { id: "Mineral-faced", label: "Mineral faced" },
  { id: "Exposed", label: "Exposed finish" },
  { id: "Protected-finish", label: "Protected (under tiles)" },
  { id: "UV-stable", label: "UV stable" },
  { id: "Balcony-terrace", label: "Balcony / terrace" },
  { id: "Roof-deck", label: "Roof / deck" },
  { id: "Podium", label: "Podium slab" },
  { id: "AS-4858", label: "AS 4858" },
  { id: "AS-4654", label: "AS 4654" },
  { id: "Licensed-applicator", label: "Licensed applicator required" },
];

const BRAND_EQUIV: {
  system: string;
  soprema: string;
  iko: string;
  nuralite: string;
  polyglass: string;
  ardex: string;
  sika: string;
  tremco: string;
  note?: string;
}[] = [
  {
    system: "SBS torch-on — base / underlay sheet",
    soprema: "Sopralene Flam 180 AR",
    iko: "Armourbase Pro",
    nuralite: "NP series (confirm)",
    polyglass: "Polybest base (confirm)",
    ardex: "—",
    sika: "—",
    tremco: "—",
    note: "Base sheet only — cap sheet required over",
  },
  {
    system: "SBS torch-on — cap / finish sheet — mineral faced",
    soprema: "Sopralene Flam 250 S",
    iko: "Armour Cap",
    nuralite: "Confirm with Nuralite",
    polyglass: "Polybest cap (confirm)",
    ardex: "—",
    sika: "—",
    tremco: "—",
    note: "UV-stable exposed finish",
  },
  {
    system: "SBS two-layer system — base + cap",
    soprema: "Flam 180 + Flam 250",
    iko: "Armourbase Pro + Armour Cap",
    nuralite: "Confirm with Nuralite",
    polyglass: "Confirm with Parchem",
    ardex: "—",
    sika: "—",
    tremco: "—",
    note: "Typical strata balcony specification",
  },
  {
    system: "APP torch-on — base / underlay sheet",
    soprema: "—",
    iko: "—",
    nuralite: "—",
    polyglass: "—",
    ardex: "WPM 150",
    sika: "P24 PE Argo 3mm",
    tremco: "Torch 3000",
    note: "APP plastomeric — must be covered with mineral cap sheet",
  },
  {
    system: "APP torch-on — cap / finish sheet — mineral faced",
    soprema: "—",
    iko: "—",
    nuralite: "—",
    polyglass: "—",
    ardex: "WPM 185",
    sika: "P44 MG Fidia 4.5kg",
    tremco: "Torch 4000M (confirm)",
    note: "APP UV-stable exposed finish — light traffic only",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Balcony and terrace waterproofing remediation — two-layer torch-on system over prepared concrete",
    "Flat and low-slope roof waterproofing — commercial and residential strata buildings",
    "Podium slab waterproofing — below landscaping, pavers, or planting",
    "Exposed pedestrian balcony and terrace finish — mineral-faced cap sheet without tile or screed overlay",
    "Protected balcony finish — two-layer torch-on system under tiles, screeds, or pavers",
    "Planter box and garden bed waterproofing where anti-root specification is required",
  ],
  selectionCriteria: [
    "Confirm SBS vs APP formulation — SBS provides better cold-weather flexibility; APP provides better UV resistance in some formulations",
    "Confirm two-layer system (base + cap) vs single-layer — most strata balcony remediation specifications require two layers",
    "Confirm mineral-faced cap sheet vs smooth cap sheet — mineral facing is required for exposed applications",
    "Confirm slope and drainage — torch-on sheet membranes require adequate falls for drainage — minimum slope confirmed per project",
    "Licensed gas torch applicator is mandatory — confirm applicator certification before appointment",
    "Primer compatibility must be confirmed with the membrane manufacturer — incorrect primer is a primary cause of delamination",
    "Lap seam dimensions and bonding quality are critical — all laps must be torch-bonded and inspected during application",
  ],
  limitations: [
    "Licensed gas torch applicator required — torch-on application is not suitable for unlicensed or untrained operators",
    "Fire watch mandatory during and after torch application on occupied strata buildings — fire management plan required",
    "Not suitable for application adjacent to flammable materials, gas lines, or combustible substrates without specific fire protection measures",
    "Torch-on membranes require a flat, primed, and structurally sound substrate — surface defects must be repaired before application",
    "Lap seam failure is the primary failure mode — poorly bonded laps, insufficient lap width, or incorrect heating technique are the most common causes of torch-on system failure",
    "Two-layer torch-on systems are heavier than liquid-applied membranes — confirm the structural capacity of the balcony substrate before specifying",
    "Not all torch-on membranes are root-resistant — confirm anti-root specification where planting or garden beds are above the membrane",
  ],
  standardsNotes: [
    "AS 4858 — Wet Area Membranes — product compliance standard for waterproofing membranes in balcony and wet area applications",
    "AS 4654 — Waterproofing of Wet Areas Within Residential Buildings — referenced on some Class 2 project specifications",
    "NCC Volume One — performance requirements for waterproofing in Class 2 buildings",
    "AS/NZS 4200 — Pliable Building Membranes — referenced in some sheet membrane specifications",
    "Manufacturer installation guides and ITP hold points — primer inspection, first layer inspection, second layer lap seam inspection, and flood test are all critical hold points",
  ],
  suitableDefects: [
    "Balcony waterproofing failure — where existing membrane has failed and a robust two-layer factory-manufactured system is required",
    "Flat roof waterproofing failure — torch-on systems are the dominant specification for commercial-grade flat roof remediation",
    "Podium slab waterproofing failure — two-layer systems with anti-root cap sheet are appropriate where landscaping is above the membrane",
    "Exposed deck waterproofing — mineral-faced cap sheets provide a finished, UV-stable surface without a tile or screed overlay",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — primed with a manufacturer-approved bituminous primer — surface must be dry and free of laitance",
    "Precast concrete — confirm primer and surface condition before application",
    "Metal deck — fibreglass or polyester reinforced base sheet required — confirm primer and application requirements with manufacturer",
    "Previously waterproofed concrete — adhesion test required — confirm overlay compatibility with manufacturer before application",
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

export function TorchOnProductSection() {
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
            <p className="mt-1 text-sm text-slate-500">11 products — 6 brands — SBS and APP modified bitumen torch-on membranes — scroll to view all</p>
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
                  <p className="text-xs leading-6 text-slate-700">{product.systemDescription}</p>
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
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                        >
                          {src.name}
                          <ExternalLink size={9} className="text-slate-300" />
                        </a>
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


      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of torch-on modified bitumen systems by brand. Confirm all product selections against the current manufacturer TDS and confirm licensing and fire management requirements before specifying.
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
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#1e40af" }}>Soprema</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#dc2626" }}>IKO</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#16a34a" }}>Nuralite</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#7c3aed" }}>Polyglass</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f97316" }}>ARDEX</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#be123c" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#0891b2" }}>Tremco</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-500">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">
                    {row.system}
                  </td>
                  {[row.soprema, row.iko, row.nuralite, row.polyglass, row.ardex, row.sika, row.tremco].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">
                      {val === "—" ? <span className="text-slate-300">—</span> : val}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-slate-400 text-[11px] italic">{row.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
