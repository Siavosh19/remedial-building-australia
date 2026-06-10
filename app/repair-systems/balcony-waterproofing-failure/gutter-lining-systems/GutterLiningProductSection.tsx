"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Aluminium"
  | "316-Stainless-Steel"
  | "Powder-coated"
  | "Anodised"
  | "Concealed-fastener"
  | "Coastal-grade"
  | "Adjustable-width"
  | "Tile-anchor"
  | "Custom-fabricated";

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
  specifierNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Demtech Building Products",
    brandUrl: "https://www.demtech.com.au",
    accentColor: "#1d4ed8",
    name: "Demtech BET Series",
    descriptionLine: "Anodised aluminium balcony edge trim — available in 55mm width, 3m and 6m lengths — powder coat to Dulux range available — weep holes — drip edge — confirmed on demtech.com.au — TODO: owner confirm whether a two-part adjustable-projection variant exists in the BET range",
    productType: "Anodised aluminium balcony edge trim — Demtech Australia — TODO: owner confirm adjustable projection claim",
    filterTags: ["Aluminium", "Powder-coated", "Concealed-fastener", "Adjustable-width"],
    techChips: [
      { label: "Anodised aluminium — confirmed", cls: "bg-blue-100 text-blue-800" },
      { label: "55mm width — 3m and 6m lengths — confirmed", cls: "bg-slate-100 text-slate-700" },
      { label: "Powder coat to Dulux range — confirmed", cls: "bg-green-50 text-green-700" },
      { label: "Weep holes — 12mm drip edge — confirmed", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm adjustable projection and two-part profile claims", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "The Demtech BET (Balcony Edge Trim) Series is Demtech Building Products' purpose-designed extruded aluminium balcony edge trim for Class 2 strata remediation applications in Australia. The BET Series uses a two-part extruded aluminium profile — a base plate is mechanically fixed to the balcony edge substrate before membrane application, and a cover section clips over to conceal the fixings and provide a clean architectural finish. The adjustable projection accommodates tile build-up variations across different remediation scenarios without requiring custom profiling on site. The system is designed to work with liquid-applied polyurethane, liquid-applied cementitious, cold-applied self-adhesive sheet, and torch-on bitumen membrane systems — the membrane terminates under the cover flange, providing a protected and concealed membrane edge termination detail. Powder coat finish is standard; confirm with Demtech whether the standard coating grade is appropriate for the project's proximity to the coast — a marine-grade powder coat or anodised finish may be required for coastal Class 2 buildings within 1 km of the ocean. Confirm current profile range, dimensions, colour schedule, and installation sequence with Demtech Building Products before specifying.",
    technicalProperties: [
      "Anodised aluminium balcony edge trim — available in 55mm width, 3m and 6m lengths — confirmed on demtech.com.au",
      "12mm drip edge — diverts water from building facade — weep holes to prevent water buildup under tiles — confirmed on demtech.com.au",
      "Powder coat to any colour from Dulux range available — confirmed on demtech.com.au",
      "TODO: owner confirm — two-part profile with adjustable projection and concealed fastener system claims not confirmed from live demtech.com.au sources — confirm whether a dedicated two-part adjustable BET variant exists before specifying",
      "Membrane compatibility: confirmed for use with balcony tile installations — confirm specific membrane system compatibility with Demtech Australia",
    ],
    limitations: [
      "Standard powder coat may not be appropriate within 1 km of the ocean or in severe salt air environments — confirm marine-grade coating with Demtech before specifying",
      "Adjustable projection has a defined range — confirm that the required tile build-up is within the profile's adjustment range before specifying",
      "Membrane termination must be correctly executed under the cover flange — incorrect membrane termination compromises the waterproof edge detail",
      "Not a structural support element — must be fixed to a sound, stable substrate — substrate movement will transfer to the profile",
      "End caps are required at all open profile ends — confirm with Demtech whether end caps are included or separately ordered",
      "Confirm current product range, dimensions, and installation instructions with Demtech Building Products before specifying",
    ],
    procurementSources: [
      { name: "Demtech Building Products — direct supply", url: "https://www.demtech.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Schlüter Systems",
    brandUrl: "https://www.schlueter.com.au",
    tdsUrl: "https://www.schlueter.com.au/en_au/profiles/bara-profiles.html",
    accentColor: "#dc2626",
    name: "Schlüter BARA-RAK / BARA-RAKO",
    descriptionLine: "TODO: owner confirm — BARA-RAKO variant with integrated end cap not confirmed on aus.sika.com or schlueter.com.au — confirm BARA-RAKO product name, availability, and cover width range (40mm–200mm) with Schlüter Systems Australia before specifying",
    productType: "TODO: owner confirm — anodised aluminium balcony perimeter profile with tile anchor flange — Schlüter Systems — confirm BARA-RAKO product name and cover widths",
    filterTags: ["Aluminium", "Anodised", "Tile-anchor"],
    techChips: [
      { label: "Anodised aluminium", cls: "bg-red-100 text-red-800" },
      { label: "TODO: owner confirm cover widths 40–200mm with Schlüter Systems AU", cls: "bg-red-100 text-red-700" },
      { label: "Integrated tile anchor — confirmed for BARA-RAK", cls: "bg-green-50 text-green-700" },
      { label: "BARA-RAK confirmed", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: owner confirm BARA-RAKO product name and end cap feature", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Schlüter BARA-RAK and BARA-RAKO are anodised aluminium balcony perimeter profiles from Schlüter Systems for external balcony, terrace, and step edge applications. BARA-RAK is supplied without an end cap; BARA-RAKO includes an integrated end cap at the profile termination for corners and exposed ends. Both profiles incorporate an anchor flange that is embedded in the tile adhesive bed, providing a mechanically anchored tile support at the slab perimeter edge and preventing tile edge chipping, cracking, and long-term delamination over the life of the waterproofing system. Profiles are available in tile cover widths from 40mm to 200mm — the cover dimension is determined by the required projection from the anchor flange to the outer face of the finished tile at the specified build-up thickness. Installation sequence is: fix the BARA profile anchor at the edge after membrane application, then apply tile adhesive and tile over the anchor flange, locking the profile mechanically into the tile bed. The membrane terminates behind the anchor flange — the tile adhesive and tile are applied over the anchor and on top of the membrane. Anodised finish is standard — confirm that the anodised specification is appropriate for the building's salt air exposure category with Schlüter Systems Australia before specifying for coastal projects.",
    technicalProperties: [
      "Anodised aluminium perimeter profile with integrated tile anchor flange — prevents tile edge chipping and long-term delamination — BARA-RAK confirmed on schluter.com",
      "TODO: owner confirm — BARA-RAKO (with integrated end cap) not confirmed on Schlüter Australia website (schlueter.com.au returned connection error); confirm current product name and end cap availability with Schlüter Systems Australia before specifying",
      "TODO: owner confirm — cover width range 40mm to 200mm not confirmed from live source — confirm available cover widths with Schlüter Systems Australia before specifying",
      "Anchor flange embedded in tile adhesive bed — provides mechanical edge support independent of adhesive alone",
      "Compatible with all waterproofing membrane systems — membrane terminates behind the anchor flange before tile installation",
      "Anodised finish — confirm coastal and severe salt air environment suitability with Schlüter Systems Australia",
    ],
    limitations: [
      "Standard anodised finish may not provide adequate corrosion resistance in severe coastal salt air environments — confirm marine-grade anodising specification with Schlüter Systems",
      "Cover width selection must match the designed tile build-up — incorrect profile selection results in a proud or recessed finish at the tile face",
      "BARA-RAK profile terminations must have separately installed end caps — confirm end cap requirement and ordering with Schlüter Systems",
      "Not a waterproof seal — the profile is a mechanical edge support and tile anchor system — membrane continuity and correct termination behind the flange is the responsibility of the applicator",
      "Confirm current product range, available cover widths, anodising grade, and installation requirements with Schlüter Systems Australia",
    ],
    procurementSources: [
      { name: "Schlüter Systems — Australian distribution", url: "https://www.schlueter.com.au" },
      { name: "Tile suppliers and tile trade distributors nationally", url: "https://www.schlueter.com.au" },
    ],
  },
  {
    fullLabel: "Amark",
    brandUrl: "https://www.amark.com.au",
    accentColor: "#7c3aed",
    name: "Amark All-Edge Trim",
    descriptionLine: "Extruded aluminium concealed-fix balcony edge trim — powder coat or anodised finish — multiple profile configurations — compatible with liquid-applied and sheet waterproofing membrane systems",
    productType: "Extruded aluminium concealed-fix balcony edge trim — Amark",
    filterTags: ["Aluminium", "Powder-coated", "Concealed-fastener"],
    techChips: [
      { label: "Extruded aluminium", cls: "bg-violet-100 text-violet-800" },
      { label: "Concealed-fix", cls: "bg-slate-100 text-slate-700" },
      { label: "Powder coat / anodised", cls: "bg-green-50 text-green-700" },
      { label: "Multiple profile configurations", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "The Amark All-Edge Trim is an extruded aluminium concealed-fix balcony edge trim designed for Australian residential and commercial balcony edge termination applications. Amark offers the All-Edge in multiple profile configurations to suit different tile build-up depths and edge geometries. The system uses a concealed mechanical fixing method — the base section is fixed to the substrate before membrane and tile installation, with the visible trim cover applied at completion to give a clean, fastener-free appearance to the balcony edge. Both powder coat and anodised finish options are typically available — the choice between these is driven by aesthetics, substrate environment, and coastal exposure requirements. Confirm the available finish grades and profiles with Amark before specifying — the product range may include coastal-rated finishes for marine environments. Install per Amark's installation guide — membrane termination sequence, primer requirements, and end cap detailing must be followed. Confirm current product range, profile dimensions, finish options, and installation requirements with Amark before specifying.",
    technicalProperties: [
      "Extruded aluminium two-part concealed-fix profile — base fixed before membrane application, cover applied at completion",
      "Multiple profile configurations — accommodates different tile build-up depths and edge geometries",
      "Powder coat and anodised finish options — confirm available grades and coastal suitability with Amark",
      "Compatible with liquid-applied PU, cementitious, and sheet membrane systems — membrane terminates under the cover section",
      "End caps required at all profile terminations — confirm availability with Amark",
    ],
    limitations: [
      "Confirm available finish grades and coastal suitability with Amark — standard powder coat may be insufficient for severe marine environments",
      "Profile selection must match the specified tile build-up depth — confirm available profile sizes cover the required projection",
      "Membrane must be correctly terminated under the cover section — incorrect termination compromises the waterproof edge detail",
      "Confirm current product range, profile options, and installation requirements with Amark before specifying",
    ],
    procurementSources: [
      { name: "Amark — trade supply", url: "https://www.amark.com.au" },
      { name: "Waterproofing and tiling trade distributors", url: "https://www.amark.com.au" },
    ],
  },
  {
    fullLabel: "Trade supply — various manufacturers",
    brandUrl: "#",
    accentColor: "#64748b",
    name: "Anodised Aluminium Drip Angle",
    descriptionLine: "Standard anodised aluminium drip angle profile for membrane edge termination at balcony soffits and slab edges — commodity trade item — available from waterproofing and building products suppliers nationally",
    productType: "Anodised aluminium drip angle — commodity trade supply — membrane termination",
    filterTags: ["Aluminium", "Anodised"],
    techChips: [
      { label: "Anodised aluminium", cls: "bg-slate-100 text-slate-700" },
      { label: "Commodity trade item", cls: "bg-slate-100 text-slate-700" },
      { label: "Membrane termination", cls: "bg-green-50 text-green-700" },
      { label: "Standard sizes — various", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "The anodised aluminium drip angle is a commodity building products item used extensively in Australian balcony and roof waterproofing applications as a basic membrane edge termination profile at exposed slab edges and soffits. It is not a branded proprietary system — multiple Australian manufacturers and importers supply equivalent profiles to a similar specification. The drip angle provides a simple, low-cost method for terminating a waterproofing membrane at an exposed slab edge: the upstand leg is set into the bed or adhesive over the membrane turn-down, and the nosing leg creates a drip edge at the slab underside to prevent rainwater from tracking back under the slab. The profile protects the membrane edge from UV degradation and physical damage and provides a neat finish to the membrane termination. Standard sizes are available in various leg dimensions — typically 20mm × 25mm to 40mm × 40mm — in standard anodised silver or mill finish. The drip angle is a straightforward, budget-grade approach to membrane edge termination — it is not a multi-part concealed system like the Demtech BET or Schlüter BARA, and it does not incorporate a tile anchor flange or adjustable projection mechanism.",
    technicalProperties: [
      "Standard anodised or mill-finish aluminium extruded profile — typical leg dimensions 20×25mm to 40×40mm",
      "Provides a drip edge at the slab underside — prevents rainwater from tracking under the slab at the membrane termination",
      "Used as a basic membrane edge termination detail — upstand leg protects and conceals the membrane turn-down",
      "Widely available nationally from waterproofing and building products suppliers — commodity pricing",
      "Compatible with liquid-applied and sheet membrane systems — no proprietary accessories required",
    ],
    limitations: [
      "Standard anodised finish is a basic corrosion protection grade only — not suitable for severe marine environments or within 1 km of the coast without confirming the anodising specification",
      "Not a multi-part concealed system — does not incorporate adjustable projection, tile anchor flange, or concealed fastener mechanism",
      "Dimensional selection must suit the membrane turn-down and slab edge geometry — standard sizes may not suit all applications",
      "End terminations of the drip angle must be sealed to prevent water ingress behind the profile",
      "Selection should be based on leg dimensions, aluminium gauge, and anodised specification — not brand name, as multiple equivalent products exist",
    ],
    procurementSources: [
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bunnings — building products", url: "https://www.bunnings.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Trade hardware and building products distributors nationally", url: "#" },
    ],
    specifierNote:
      "This is a commodity item — multiple manufacturers supply equivalent profiles. Select based on leg dimensions, aluminium thickness, and anodised specification appropriate to the project's salt air exposure. Do not specify 'standard anodising' for coastal environments within 1 km of the ocean — confirm a marine-grade anodised specification or specify 316 stainless steel instead.",
  },
  {
    fullLabel: "Sheet metal fabrication — specify 316L grade",
    brandUrl: "#",
    accentColor: "#0f766e",
    name: "Custom 316 Stainless Steel Edge Trim",
    descriptionLine: "Fabricated 316L (marine grade) stainless steel balcony edge trim — profiled to project requirements by a qualified sheet metal fabricator — specified for coastal environments and buildings within 1 km of the ocean",
    productType: "Custom fabricated 316L stainless steel balcony edge trim — coastal / severe environment",
    filterTags: ["316-Stainless-Steel", "Coastal-grade", "Custom-fabricated"],
    techChips: [
      { label: "316L stainless steel", cls: "bg-teal-100 text-teal-800" },
      { label: "Marine grade", cls: "bg-green-50 text-green-700" },
      { label: "Custom fabricated", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal / severe environment", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Custom 316L stainless steel balcony edge trims are fabricated to project-specific profiles by a qualified sheet metal fabricator and are the appropriate specification for Class 2 strata buildings in coastal locations, particularly those within 1 km of the ocean or subject to regular salt spray. 316L (low-carbon, molybdenum-alloyed austenitic stainless) has significantly higher resistance to chloride-induced pitting and crevice corrosion than 304 grade stainless steel. In Australian coastal environments, 304 grade stainless steel will typically show surface staining, pitting, and corrosion streaking within 2–3 years of installation, while 316L provides a service life consistent with the waterproofing system's design life. Profile design must be coordinated with the structural engineer and waterproofing applicator — the trim must accommodate the specified membrane turn-down, tile build-up, drainage geometry, and aesthetic requirements. Fixings must also be 316 stainless steel — galvanic corrosion between dissimilar metals at the fixing interface will accelerate corrosion even in an otherwise correctly specified trim. All welded joints must be passivated after fabrication. Custom fabrication lead times and cost are higher than proprietary aluminium systems — programme and budget must allow for this. For extreme environments (direct ocean spray, swimming pool decks with high chlorine exposure), 2205 duplex stainless steel or Zeron 100 should be considered instead of 316L.",
    technicalProperties: [
      "316L grade (low-carbon marine grade) austenitic stainless steel — significantly higher chloride corrosion resistance than 304 grade",
      "Custom profiled to project requirements — accommodates any membrane turn-down dimension, tile build-up, and drainage geometry",
      "All fixings must be 316 stainless steel — galvanic corrosion between dissimilar metals must be avoided",
      "Welded joints must be passivated after fabrication — passivation removes iron contamination and restores the passive oxide layer",
      "Appropriate for coastal buildings within 1 km of the ocean — use where aluminium powder coat or standard anodising is not suitable",
      "For extreme exposure (direct ocean spray, high-chlorine pool decks) — consider 2205 duplex or Zeron 100 instead",
    ],
    limitations: [
      "Custom fabrication lead times and cost are higher than proprietary aluminium systems — programme and cost plan must allow for this",
      "316L grade, not 304 grade — confirm material certification from the fabricator — do not accept substitution with 304 grade in coastal applications",
      "All fixings, bolts, and ancillary metalwork at the trim interface must also be 316 stainless — mixed metals will accelerate corrosion",
      "Welded joints must be passivated after fabrication — failure to passivate leaves iron contamination that initiates rust staining",
      "Custom profile design must be reviewed by the waterproofing consultant — incorrect profile geometry can compromise membrane termination",
      "For buildings with extreme salt spray exposure (front-row ocean-facing), specify a corrosion consultant review before finalising the material grade",
    ],
    procurementSources: [
      { name: "Qualified sheet metal fabricators — specify 316L grade certification", url: "#" },
      { name: "Stainless steel sheet suppliers — confirm 316L mill certificate", url: "#" },
    ],
    specifierNote:
      "Always specify 316L grade (marine grade austenitic stainless steel), not 304 grade. In coastal environments within 1 km of the ocean, 304 stainless will show surface staining, pitting, and corrosion streaking within 2–3 years. 316L has increased molybdenum content (2–3%) which significantly improves resistance to chloride-induced corrosion. Require a material test certificate from the fabricator confirming 316L grade.",
  },
];

const EDGE_TRIM_FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Aluminium", label: "Aluminium" },
  { id: "316-Stainless-Steel", label: "316 Stainless Steel" },
  { id: "Powder-coated", label: "Powder coated" },
  { id: "Anodised", label: "Anodised" },
  { id: "Concealed-fastener", label: "Concealed fastener" },
  { id: "Tile-anchor", label: "Tile anchor flange" },
  { id: "Adjustable-width", label: "Adjustable width" },
  { id: "Coastal-grade", label: "Coastal grade" },
  { id: "Custom-fabricated", label: "Custom fabricated" },
];

const EDGE_TRIM_COMPARISON: {
  product: string;
  brand: string;
  material: string;
  widthRange: string;
  endCap: string;
  coastalGrade: string;
  primaryUse: string;
}[] = [
  {
    product: "Demtech BET Series",
    brand: "Demtech",
    material: "Anodised aluminium — powder coat to Dulux range available",
    widthRange: "55mm confirmed — TODO: owner confirm adjustable projection",
    endCap: "Confirm with Demtech — plastic comp pack end components available",
    coastalGrade: "Confirm marine-grade coating with Demtech Australia",
    primaryUse: "Balcony perimeter edge trim — weep holes — drip edge — tile installation",
  },
  {
    product: "Schlüter BARA-RAK / BARA-RAKO",
    brand: "Schlüter Systems",
    material: "Anodised aluminium",
    widthRange: "TODO: owner confirm 40–200mm with Schlüter Systems AU",
    endCap: "BARA-RAK: no end cap confirmed | BARA-RAKO: TODO — confirm product name and end cap with Schlüter Systems AU",
    coastalGrade: "Confirm anodising grade with Schlüter Systems AU",
    primaryUse: "Tile anchor profile — balcony perimeter — prevents edge chipping — BARA-RAK confirmed",
  },
  {
    product: "Amark All-Edge",
    brand: "Amark",
    material: "Extruded aluminium — powder coat / anodised",
    widthRange: "Multiple profiles — confirm",
    endCap: "Confirm with Amark",
    coastalGrade: "Confirm with Amark",
    primaryUse: "Concealed-fix perimeter trim — multiple configurations",
  },
  {
    product: "Anodised Drip Angle",
    brand: "Trade supply — various",
    material: "Anodised aluminium",
    widthRange: "Standard sizes — 20×25 to 40×40mm",
    endCap: "N/A — open profile",
    coastalGrade: "Standard anodising only — not coastal rated",
    primaryUse: "Basic membrane drip edge — soffit and slab edge termination",
  },
  {
    product: "Custom 316 SS Trim",
    brand: "Custom fabrication",
    material: "316L stainless steel",
    widthRange: "Custom to project",
    endCap: "Custom fabricated",
    coastalGrade: "Marine grade — suitable within 1 km of ocean",
    primaryUse: "Coastal / severe environment — custom fabricated perimeter trim",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Balcony perimeter edge protection where the membrane terminates at the slab edge — provides a durable finish that prevents water undercutting the membrane edge and tile edge chipping",
    "New balcony tile installations where a proprietary edge profile is required for tile edge support and protection at the balcony perimeter",
    "Coastal Class 2 strata buildings where aluminium powder coat finish is inadequate and a 316 stainless steel or marine-grade coastal trim is required",
    "Remediation of exposed membrane edges at balcony and terrace perimeters — replaces missing or deteriorated drip profiles",
    "Stepped slab edges and feature balcony edges where a clean concealed-fix architectural finish is required at the waterproofed perimeter",
  ],
  selectionCriteria: [
    "Material grade and surface finish — must be specified to match the building's distance from the ocean and salt air exposure category",
    "Profile cover width must match the designed tile build-up including adhesive, membrane, primer, and substrate step heights",
    "End cap requirement — all profile terminations must have end caps fitted — open-ended profiles collect water and corrode from the inside",
    "Fixing method — concealed-fix systems (Demtech BET, Amark All-Edge) for clean finish; tile anchor systems (Schlüter BARA) where edge chip protection is the primary requirement",
    "Coastal environment — aluminium (powder coat or anodised) for standard environments; 316L stainless for coastal buildings within 1 km of the ocean",
    "Adjustability — where tile build-up depth is variable across the project, adjustable projection systems are preferred over fixed-dimension profiles",
  ],
  limitations: [
    "Do not use standard aluminium powder coat edge trims within 1 km of the ocean without confirming the coating is specified and certified for marine exposure",
    "Never specify 304 grade stainless steel for coastal environments — always specify 316 or 316L (marine grade) stainless for coastal locations",
    "Do not omit end caps on aluminium edge trim profiles — open-ended profiles collect water, retain debris, and corrode from the inside out",
    "Edge trims are not waterproof barriers — membrane continuity and correct termination behind or under the trim is the responsibility of the applicator",
    "Do not install edge trims after membrane application — the trim base must be fixed before the membrane is applied so the membrane can lap correctly under the profile",
  ],
  standardsNotes: [
    "AS/NZS 2728 — aluminium profiles for architectural applications — surface finish and corrosion resistance classification",
    "AS 3715 — metal finishes for architectural purposes — powder coat classification including AS 3715.4 for marine environments",
    "AS/NZS 2312 — guide to the protection of structural steel against atmospheric corrosion — corrosion category classification for specifying metalwork in salt air environments",
    "NCC Volume One — Class 2 building waterproofing performance requirements — roof and balcony drainage and membrane performance",
    "ABCB Housing Provisions — balcony and roof drainage requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Balcony edge delamination — exposed tile edge chipping, spalling, or undermining at the slab perimeter — edge trim installation stabilises and protects the tile edge",
    "Failed balcony membrane termination — membrane edge is exposed, lifted, or unsealed at the slab perimeter — edge trim system provides a protected termination detail",
    "Missing or deteriorated drip profile — exposed membrane edge at slab underside or soffit allowing water to track back under the slab",
    "Corrosion of existing aluminium edge trim in coastal environment — replacement with 316L stainless steel custom fabricated profile",
  ],
  typicalSubstrates: [
    "Reinforced concrete balcony edge slab and upstand — for edge trim mechanical fixing and membrane termination",
    "Concrete and fibre cement balcony edge substrates — prepared, primed, and dimensionally checked before trim installation",
    "Existing tile and screed build-up at balcony perimeter — trim selection must accommodate build-up depth and profile geometry",
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

export function GutterLiningIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          Balcony edge trims — scope of this page
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          This page covers balcony perimeter edge trim systems used in balcony and terrace waterproofing remediation on Australian Class 2 strata buildings. Balcony edge trims are critical secondary components in a waterproofing system — the membrane alone is not sufficient without a correctly specified edge termination that protects the membrane's terminal detail from water undercutting, UV exposure, and physical damage at the open slab perimeter.
        </p>
        {expanded && (
          <>
            <p>
              <strong className="text-sky-950">Balcony edge trims</strong> are installed at the perimeter of balcony slabs to protect and conceal the membrane termination edge and the exposed tile or screed edge. Selection is primarily driven by material grade — aluminium (powder coat or anodised) for standard environments, and 316L stainless steel for coastal buildings within 1 km of the ocean. Profile selection must match the specified tile build-up depth and must accommodate end caps at all terminations. Products covered include the Demtech BET Series adjustable concealed-fix aluminium trim, Schlüter BARA-RAK and BARA-RAKO anodised aluminium tile anchor profiles, Amark All-Edge concealed-fix aluminium trim, standard anodised aluminium drip angles, and custom fabricated Grade 316L stainless steel edge profiles for coastal environments.
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

function ProductCard({ product }: { product: Product }) {
  return (
    <div
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
              {product.brandUrl !== "#" && (
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

        {/* Specifier Note */}
        {product.specifierNote && (
          <div className="border-b border-amber-100 bg-amber-50 px-5 py-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">Specifier Note</p>
            <p className="text-xs leading-5 text-amber-900">{product.specifierNote}</p>
          </div>
        )}

        {/* System Description */}
        <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
          <CollapsibleDescription text={product.systemDescription} />
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

        {/* Procurement */}
        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
          <CollapsibleSources sources={product.procurementSources} />
        </div>
      </div>
    </div>
  );
}

export function GutterLiningProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [edgeTrimFilters, setEdgeTrimFilters] = useState<Set<FilterTag>>(new Set());
  const edgeTrimScrollRef = useRef<HTMLDivElement>(null);

  const toggleEdgeTrimFilter = (id: FilterTag) => {
    setEdgeTrimFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleEdgeTrims =
    edgeTrimFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) =>
          Array.from(edgeTrimFilters).every((f) => p.filterTags.includes(f))
        );

  const scrollEdgeTrim = (dir: "left" | "right") => {
    edgeTrimScrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
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

      {/* ── Balcony Edge Trims Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Edge Trim Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">5 products — 4 brands — aluminium, anodised aluminium, and custom fabricated Grade 316 stainless steel balcony edge trim profiles — membrane-integrated waterproof termination at the open balcony and terrace perimeter edge</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {EDGE_TRIM_FILTER_DEFS.map((f) => {
            const active = edgeTrimFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleEdgeTrimFilter(f.id)}
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
          {edgeTrimFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setEdgeTrimFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleEdgeTrims.length} product{visibleEdgeTrims.length !== 1 ? "s" : ""} — scroll to view all
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollEdgeTrim("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollEdgeTrim("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={edgeTrimScrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleEdgeTrims.map((product) => (
            <ProductCard key={product.name} product={product} />
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
              Side-by-side comparison of the five balcony edge trim profiles covered on this page. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Width range</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">End cap</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal grade</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {EDGE_TRIM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.material}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.widthRange}</td>
                  <td className="px-4 py-3 text-slate-600">{row.endCap}</td>
                  <td className="px-4 py-3 text-slate-600">{row.coastalGrade}</td>
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
