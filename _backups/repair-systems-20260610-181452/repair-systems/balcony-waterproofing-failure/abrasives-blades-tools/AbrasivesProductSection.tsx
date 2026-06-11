"use client";

import { useState } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, Ruler,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, FileText, Wrench,
} from "lucide-react";

type FilterTag =
  | "Tile-removal"
  | "Membrane-removal"
  | "Surface-grinding"
  | "Scarifying"
  | "Diamond-cutting"
  | "Membrane-application"
  | "Moisture-testing"
  | "Film-thickness"
  | "Hand-tool"
  | "SDS-electric"
  | "Angle-grinder"
  | "Walk-behind-machine"
  | "Wet-cutting"
  | "Dust-extraction-required"
  | "CSP-profile";

type Product = {
  id: string;
  fullLabel: string;
  brandUrl?: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string[];
  technicalProperties: string[];
  limitations: string[];
  specifierNote: string;
  procurementSources: { name: string; url?: string }[];
};

type ProductSection = {
  id: string;
  heading: string;
  subHeading: string;
  products: Product[];
};

const T1: Product = {
  id: "T1",
  fullLabel: "Bosch / Milwaukee / Makita — SDS-Max accessories",
  accentColor: "#dc2626",
  name: "Tile Stripping Blade — SDS-Max Flat Scraper",
  descriptionLine: "25mm flat scraper blade for SDS-Max rotary hammer or demolition hammer — removes ceramic and porcelain tiles from concrete balcony substrates — standard format for controlled tile removal without full demolition hammer impact",
  productType: "SDS-Max flat scraper blade — tile removal — balcony demolition",
  filterTags: ["Tile-removal", "SDS-electric", "Dust-extraction-required"],
  techChips: [
    { label: "SDS-Max shank", cls: "bg-red-100 text-red-800" },
    { label: "25mm flat scraper", cls: "bg-slate-100 text-slate-700" },
    { label: "Rotary/demolition hammer", cls: "bg-slate-100 text-slate-700" },
    { label: "Ceramic / porcelain", cls: "bg-green-50 text-green-700" },
    { label: "Dust extraction required", cls: "bg-amber-50 text-amber-700" },
  ],
  systemDescription: [
    "The SDS-Max flat tile stripping blade is the standard tool for removing ceramic and porcelain tiles from concrete balcony substrates on remediation projects. The 25mm wide flat blade is inserted into a SDS-Max rotary hammer or demolition hammer set to chisel/hammer-only mode and used to progressively pry and impact-strip tiles from the adhesive bed. The flat profile minimises damage to the concrete substrate compared to a pointed chisel.",
    "On balcony remediation projects, the tile stripping blade removes the tile body from the adhesive bed. Adhesive residue remaining on the concrete after tile removal is then removed separately by SDS demolition chisel (T2) before concrete surface preparation (G1/G2/G3) begins.",
    "Protect all puddle flanges, drain bodies, and existing waterproofing penetrations from impact during tile stripping. Mask or block the drain aperture before commencing tile removal to prevent tile fragments and debris entering the drain pipe.",
  ],
  technicalProperties: [
    "SDS-Max shank — compatible with SDS-Max rotary hammer and demolition hammer",
    "25mm flat scraper profile — suited to tile stripping without deep substrate penetration",
    "Use in chisel / hammer-only mode — not rotation mode",
    "Suits ceramic, porcelain, and natural stone tiles on concrete substrates",
    "Available in multiple lengths from power tool accessory suppliers",
  ],
  limitations: [
    "Confirm SDS-Max compatibility — do not use in SDS-Plus tools — shanks are not interchangeable",
    "Protect puddle flanges and drain bodies from impact — mask the drain aperture before tile removal commences",
    "Do not use on substrates where the underlying waterproofing membrane must be preserved — scraper impact will damage liquid-applied membranes",
    "Heavy tile adhesive beds require SDS demolition chisel (T2) after tile removal to remove adhesive residue",
    "Silica dust: tile adhesive and grout chiselling generates respirable silica — use dust extraction or RPE",
  ],
  specifierNote: "Confirm SDS-Max compatibility with the tool on site before ordering. Mask drain aperture before commencing tile removal.",
  procurementSources: [
    { name: "Bosch — SDS-Max tile spade / scraper blades", url: "https://www.bosch.com.au" },
    { name: "Milwaukee — SDS-Max accessories", url: "https://au.milwaukeetool.com" },
    { name: "Makita — SDS-Max chisel accessories", url: "https://www.makita.com.au" },
    { name: "Total Tools", url: "https://www.totaltools.com.au" },
    { name: "Bunnings — power tool accessories", url: "https://www.bunnings.com.au" },
  ],
};

const T2: Product = {
  id: "T2",
  fullLabel: "Bosch / Milwaukee / Makita / Hilti — SDS-Max accessories",
  accentColor: "#b45309",
  name: "SDS-Max Demolition Chisel — Flat and Pointed",
  descriptionLine: "SDS-Max flat chisel (50mm) and pointed chisel for removing thick tile adhesive beds from balcony concrete substrates after tile removal — flat chisel preferred for adhesive bed removal to minimise substrate damage",
  productType: "SDS-Max demolition chisel — flat (50mm) and pointed — tile adhesive removal",
  filterTags: ["Tile-removal", "Membrane-removal", "SDS-electric", "Dust-extraction-required"],
  techChips: [
    { label: "SDS-Max shank", cls: "bg-amber-100 text-amber-800" },
    { label: "Flat 50mm chisel", cls: "bg-slate-100 text-slate-700" },
    { label: "Pointed chisel", cls: "bg-slate-100 text-slate-700" },
    { label: "Adhesive bed removal", cls: "bg-green-50 text-green-700" },
    { label: "Demolition hammer", cls: "bg-slate-100 text-slate-700" },
  ],
  systemDescription: [
    "SDS-Max demolition chisels are used in balcony waterproofing remediation to remove thick tile adhesive beds from the concrete substrate after tiles have been stripped. The 50mm flat chisel profile is preferred for adhesive bed removal — it sweeps under the adhesive mass with less substrate damage than a pointed chisel. Pointed chisels are used where adhesive has bonded tightly to the substrate and the flat chisel cannot break the bond.",
    "Both chisel types are used in a SDS-Max demolition hammer (hammer-only mode, no rotation). The chisel is held at a low angle to the surface and used to progressively shear the adhesive bed from the concrete. Care must be taken around puddle flanges, drain outlets, and the perimeter of the balcony where the concrete substrate may be closer to the structural slab.",
    "After adhesive removal by demolition chisel, residual adhesive at the surface must be ground flush by diamond cup wheel (G1) before waterproofing primer or membrane is applied — the demolition chisel leaves an irregular surface that is not acceptable as a membrane substrate without grinding.",
  ],
  technicalProperties: [
    "SDS-Max shank — compatible with SDS-Max demolition hammer — use in hammer-only mode",
    "Flat chisel: 50mm wide — preferred for adhesive bed removal — minimises substrate damage",
    "Pointed chisel: used for hard-bonded adhesive and for starting cuts in dense substrates",
    "Carbide or hardened steel tip — suited to concrete, sand-cement bed, tile adhesive",
    "Available from SDS-Max tool accessory suppliers",
  ],
  limitations: [
    "Confirm SDS-Max compatibility — not compatible with SDS-Plus tools",
    "Protect puddle flanges and drain bodies from direct chisel impact — mask drain aperture before commencing demolition",
    "Do not use pointed chisel on substrates where surface integrity must be preserved — creates craters requiring repair before membrane application",
    "Silica dust: chiselling of tile adhesive, sand-cement bed, and concrete generates respirable crystalline silica — mandatory dust extraction or RPE",
    "Post-demolition grinding (G1/G2) is required before membrane application — do not apply membrane to a rough, unground surface",
  ],
  specifierNote: "Use flat chisel for adhesive bed removal. Follow with diamond cup wheel grinding before applying primer or membrane.",
  procurementSources: [
    { name: "Bosch — SDS-Max chisels", url: "https://www.bosch.com.au" },
    { name: "Hilti — TE-YX SDS-Max chisels", url: "https://www.hilti.com.au" },
    { name: "Milwaukee — SDS-Max accessories", url: "https://au.milwaukeetool.com" },
    { name: "Total Tools", url: "https://www.totaltools.com.au" },
  ],
};

const G1: Product = {
  id: "G1",
  fullLabel: "Norton Abrasives / Husqvarna / Tyrolit / Makita",
  accentColor: "#0d9488",
  name: "Diamond Cup Wheel — Double Row — 125mm",
  descriptionLine: "Double-row segmented diamond cup wheel — 125mm diameter — angle grinder mounting — for grinding concrete balcony substrates to ICRI CSP 3–4 profile after tile and adhesive removal — mandatory dust extraction shroud or wet grinding — silica dust compliance",
  productType: "Double row diamond cup wheel — 125mm — angle grinder — concrete surface preparation — CSP 3–4",
  filterTags: ["Surface-grinding", "Angle-grinder", "CSP-profile", "Dust-extraction-required"],
  techChips: [
    { label: "Double row diamonds", cls: "bg-teal-100 text-teal-800" },
    { label: "125mm / M14 thread", cls: "bg-slate-100 text-slate-700" },
    { label: "Angle grinder mount", cls: "bg-slate-100 text-slate-700" },
    { label: "CSP 3–4", cls: "bg-green-50 text-green-700" },
    { label: "Dust shroud required", cls: "bg-amber-50 text-amber-700" },
  ],
  systemDescription: [
    "The double-row diamond cup wheel is the standard concrete surface preparation tool for balcony remediation projects where angle grinder access is required. Mounted on a 125mm angle grinder (M14 spindle thread), the double row of embedded diamond segments grinds the concrete surface to remove laitance, surface contamination, residual adhesive, and achieve the ICRI CSP 3–4 surface profile required by most liquid-applied waterproofing membrane manufacturers.",
    "A dust extraction shroud connected to an M-class or H-class vacuum must be fitted when using the diamond cup wheel on site — dry grinding without extraction is a WHS regulatory breach (Safe Work Australia silica dust regulations). Alternatively, the cup wheel may be used with a water feed for wet grinding — wet grinding eliminates airborne dust but creates a slurry that must be contained and vacuumed correctly.",
    "After grinding, all grinding residue and dust must be removed by vacuum before primer application. The ground surface must be visually inspected for pinholes, low spots, and substrate defects before primer is applied.",
  ],
  technicalProperties: [
    "Double row segmented diamond cup wheel — M14 spindle thread — 125mm diameter",
    "Compatible with 125mm angle grinders — confirm spindle thread before ordering",
    "Achieves ICRI CSP 3–4 surface profile on standard concrete balcony substrates",
    "Used for: laitance removal, surface contamination, adhesive residue grinding, high spot removal",
    "Available in soft, medium, and hard bond grades — medium bond for standard concrete",
  ],
  limitations: [
    "Dust extraction shroud and M-class vacuum mandatory — dry grinding is a WHS regulatory breach",
    "Confirm angle grinder spindle thread (M14) before ordering",
    "Multiple passes or harder diamond bond may be required on very hard or dense concrete",
    "Does not suit corners, coved junctions, or areas within 20–30mm of the wall — use needle gun or hand prep for edges",
    "Confirm required CSP profile with the membrane manufacturer TDS before grinding",
  ],
  specifierNote: "Confirm required CSP profile with membrane TDS before grinding. Confirm dust shroud is fitted and connected to M-class vacuum before commencing.",
  procurementSources: [
    { name: "Norton Abrasives Australia", url: "https://www.nortonsandpaper.com.au" },
    { name: "Husqvarna Construction — diamond tools", url: "https://www.husqvarnaconstruction.com" },
    { name: "Tyrolit Australia", url: "https://www.tyrolit.com/en-AU" },
    { name: "Total Tools — diamond cup wheels", url: "https://www.totaltools.com.au" },
    { name: "Bunnings", url: "https://www.bunnings.com.au" },
  ],
};

const G2: Product = {
  id: "G2",
  fullLabel: "HTC / Husqvarna / Lavina — hire / contractor supply",
  accentColor: "#7c3aed",
  name: "Walk-Behind Floor Grinder — Single or Multi-Head Planetary",
  descriptionLine: "Single or multi-head planetary floor grinder — 250mm to 800mm working width — for large area balcony and podium deck concrete surface preparation to ICRI CSP 3–5 — dust extraction mandatory — typically hired or supplied by specialist concrete prep contractor",
  productType: "Walk-behind planetary floor grinder — large area concrete surface preparation — CSP 3–5",
  filterTags: ["Surface-grinding", "Walk-behind-machine", "CSP-profile", "Dust-extraction-required"],
  techChips: [
    { label: "Planetary head", cls: "bg-violet-100 text-violet-800" },
    { label: "250–800mm width", cls: "bg-slate-100 text-slate-700" },
    { label: "Diamond segments", cls: "bg-slate-100 text-slate-700" },
    { label: "CSP 3–5", cls: "bg-green-50 text-green-700" },
    { label: "HEPA vacuum required", cls: "bg-amber-50 text-amber-700" },
  ],
  systemDescription: [
    "Walk-behind floor grinders — single-head and multi-head planetary types — are used for efficient large area concrete surface preparation on balcony slab and podium deck remediation projects. The planetary head rotates satellite grinding heads across the full working width (typically 250mm for compact machines to 800mm+ for larger contractor units), achieving a uniform surface profile across the prepared area with fewer passes than angle grinder cup wheel grinding.",
    "Walk-behind floor grinders are typically hired or provided by specialist concrete surface preparation contractors on larger strata remediation projects. For small residential balconies (under approximately 12m²), angle grinder cup wheel grinding (G1) is typically sufficient. The machine must be connected to a HEPA vacuum — dust extraction is mandatory under Safe Work Australia silica dust regulations.",
    "Diamond segment selection (bond grade and grit) must be matched to the concrete hardness and the target CSP profile. Confirm the required CSP profile with the membrane manufacturer TDS and discuss diamond selection with the equipment hire supplier or concrete prep contractor before commencing.",
  ],
  technicalProperties: [
    "Planetary single or multi-head grinding configuration — produces flat, uniform surface profile",
    "Working widths: 250mm (compact hire) to 800mm+ (contractor unit) — confirm with hire supplier",
    "Diamond segments: bond grade and grit selected by concrete hardness and target CSP profile",
    "Dust extraction connection: HEPA (H-class) or M-class vacuum — mandatory",
    "Electric — single-phase (compact hire) or 3-phase (larger contractor units) — confirm power supply on site",
  ],
  limitations: [
    "Not suited to small balconies under approximately 12m² — angle grinder cup wheel (G1) is more practical",
    "Dust extraction mandatory — confirm the hire machine has a suitable extraction port",
    "Cannot prepare corners or areas within 100–150mm of walls — follow up with angle grinder edge grinding (G1)",
    "Confirm machine access — large floor grinders may not fit through narrow balcony doors or lifts",
    "Confirm power supply — 3-phase machines require a 3-phase power outlet on site",
  ],
  specifierNote: "Confirm machine size, access path, and power supply with hire supplier before mobilising. Follow up edge grinding with angle grinder cup wheel (G1).",
  procurementSources: [
    { name: "HTC Floor Systems — equipment hire", url: "https://www.htc-floorsystems.com" },
    { name: "Husqvarna Construction — equipment hire and contractor supply" },
    { name: "Lavina floor grinders — via local hire companies" },
    { name: "Kennards Hire — confirm availability", url: "https://www.kennards.com.au" },
    { name: "Coates Hire — confirm availability", url: "https://www.coates.com.au" },
  ],
};

const G3: Product = {
  id: "G3",
  fullLabel: "Edco / MK Diamond / various — hire",
  accentColor: "#0369a1",
  name: "Scarifying Machine — Walk-Behind or Handheld",
  descriptionLine: "Rotary drum scarifier for aggressive concrete surface removal — removes paint, thick coatings, contaminated concrete surface, and heavily bonded adhesive residue — achieves ICRI CSP 5–8 — used where diamond cup wheel grinding is insufficient — dust extraction mandatory",
  productType: "Rotary drum scarifier — heavy surface preparation — CSP 5–8 — hire or contractor supply",
  filterTags: ["Scarifying", "Walk-behind-machine", "CSP-profile", "Dust-extraction-required"],
  techChips: [
    { label: "Rotary drum scarifier", cls: "bg-blue-100 text-blue-800" },
    { label: "CSP 5–8", cls: "bg-slate-100 text-slate-700" },
    { label: "Paint / coating removal", cls: "bg-green-50 text-green-700" },
    { label: "Aggressive profile", cls: "bg-red-50 text-red-700" },
    { label: "Dust extraction required", cls: "bg-amber-50 text-amber-700" },
  ],
  systemDescription: [
    "Rotary drum scarifiers use rotating tungsten carbide or steel flail-type cutters to aggressively remove surface material from concrete. Scarifying creates an ICRI CSP 5–8 surface profile — significantly more aggressive than diamond cup wheel grinding (CSP 3–4). On balcony remediation projects, scarifying is used where the concrete surface is heavily contaminated with paint, sealer, or bond-breaker compounds that diamond grinding cannot fully remove, or where the membrane manufacturer TDS specifies a CSP 5+ profile.",
    "Walk-behind scarifiers are available from equipment hire companies for larger area preparation. Handheld scarifying attachments are available for small areas and corners. All scarifiers must be connected to dust extraction — dry scarifying is a WHS regulatory breach under Safe Work Australia silica dust regulations.",
    "The CSP 5–8 profile produced by scarifying is significantly more aggressive than the CSP 3–4 typically specified for liquid-applied waterproofing membranes. Confirm with the membrane manufacturer that the scarified profile is acceptable — some membrane systems require a smoothing or levelling coat over a CSP 5+ profile before membrane application.",
  ],
  technicalProperties: [
    "Rotary drum scarifier — tungsten carbide or steel flail cutters",
    "Achieves ICRI CSP 5–8 — aggressive surface removal for contaminated substrates",
    "Walk-behind (hire) or handheld angle grinder attachment formats",
    "Removes paint, sealers, bond-breakers, thick adhesive residues, and deteriorated concrete surface",
    "Dust extraction mandatory — M-class or H-class vacuum connection",
  ],
  limitations: [
    "Confirm required CSP profile with membrane manufacturer TDS before scarifying — CSP 5–8 may require a levelling coat before membrane application",
    "Protect puddle flanges and drain bodies from direct scarifier contact before commencing",
    "Dust extraction mandatory — silica dust WHS regulatory requirement",
    "Cannot achieve flat surface in tight corners or against walls — follow up with needle gun or hand grinding",
    "Confirm hire machine size and access before mobilising",
  ],
  specifierNote: "Confirm CSP profile with membrane TDS before scarifying — CSP 5–8 may require a levelling coat before membrane application. Protect puddle flanges and drain bodies.",
  procurementSources: [
    { name: "Edco surface preparation — scarifiers", url: "https://www.edco.com.au" },
    { name: "Kennards Hire — surface preparation equipment", url: "https://www.kennards.com.au" },
    { name: "Coates Hire — confirm scarifier availability", url: "https://www.coates.com.au" },
    { name: "Total Tools — handheld scarifying attachments", url: "https://www.totaltools.com.au" },
  ],
};

const C1: Product = {
  id: "C1",
  fullLabel: "Husqvarna / Norton / Makita / Dewalt — angle grinder blades",
  accentColor: "#64748b",
  name: "Diamond Segmented Saw Blade — 115mm / 125mm Angle Grinder",
  descriptionLine: "Segmented diamond saw blade for angle grinder — 115mm or 125mm — for cutting perimeter lines, control joints, screed, and tile on balcony surfaces — wet cutting only — dry diamond cutting is a WHS regulatory breach — silica dust compliance",
  productType: "Diamond segmented saw blade — 115mm / 125mm angle grinder — wet cutting required",
  filterTags: ["Diamond-cutting", "Angle-grinder", "Wet-cutting", "Dust-extraction-required"],
  techChips: [
    { label: "Segmented diamond rim", cls: "bg-slate-100 text-slate-700" },
    { label: "115mm or 125mm", cls: "bg-slate-100 text-slate-700" },
    { label: "Wet cutting only", cls: "bg-red-100 text-red-800" },
    { label: "Concrete / tile / screed", cls: "bg-green-50 text-green-700" },
    { label: "Angle grinder", cls: "bg-slate-100 text-slate-700" },
  ],
  systemDescription: [
    "Diamond segmented saw blades for angle grinders are used in balcony remediation for cutting perimeter relief cuts, isolating crack lines, cutting through tile and screed to expose the slab surface, and making cuts at junctions, upstands, and around penetrations. The segmented diamond rim cuts concrete, ceramic tile, porcelain tile, and sand-cement screed.",
    "Wet cutting is mandatory on site — dry diamond cutting of concrete, tile, and screed generates respirable crystalline silica dust at concentrations exceeding Safe Work Australia WES limits immediately. A water feed must be used during cutting. If wet cutting is not possible, a diamond blade with a dedicated shroud connected to an M-class vacuum must be used — confirm with the site WHS plan before proceeding.",
    "Use the blade at the rated RPM for the angle grinder — do not exceed the maximum RPM marked on the blade. Do not force the blade — let the diamond segments cut at their natural rate. A forced, slow cut overheats the segments and shortens blade life significantly.",
  ],
  technicalProperties: [
    "Diamond segmented rim — 22.23mm arbor — 115mm or 125mm diameter",
    "Maximum RPM: confirm on blade label — do not exceed rated speed",
    "Cuts concrete, ceramic tile, porcelain, and sand-cement screed",
    "Wet cutting: water feed applied to the blade during cutting reduces dust to near zero",
    "Segmented rim: suits harder materials; turbo rim suits ceramic and softer substrates — confirm with supplier",
  ],
  limitations: [
    "Wet cutting only on site — dry diamond cutting of concrete or tile is a WHS regulatory breach — silica dust",
    "Do not use beyond rated maximum RPM — blade failure is a serious safety hazard",
    "Must be fitted with a compatible cutting guard — not for use with standard grinding guards",
    "Protect puddle flanges and drain bodies from blade contact — mask adjacent areas before cutting",
    "Do not cut closer than minimum clearance to an existing liquid-applied membrane on the surrounding substrate",
  ],
  specifierNote: "Wet cutting only — confirm water feed method before commencing. Confirm blade RPM rating matches angle grinder speed.",
  procurementSources: [
    { name: "Husqvarna Construction — diamond saw blades", url: "https://www.husqvarnaconstruction.com" },
    { name: "Norton Abrasives — diamond blades", url: "https://www.nortonsandpaper.com.au" },
    { name: "Total Tools", url: "https://www.totaltools.com.au" },
    { name: "Bunnings", url: "https://www.bunnings.com.au" },
  ],
};

const A1: Product = {
  id: "A1",
  fullLabel: "Prodec / Monarch / Nour / painting trade supply",
  accentColor: "#0ea5e9",
  name: "Short Nap Woven Roller Cover — 6mm / 10mm Nap",
  descriptionLine: "6mm or 10mm nap woven polyester roller cover — 230mm standard width — for applying liquid-applied PU, acrylic, and cementitious waterproofing membranes — confirm nap length and roller frame diameter with membrane manufacturer TDS before applying",
  productType: "Short nap woven roller cover — 6mm / 10mm — liquid-applied waterproofing membrane application",
  filterTags: ["Membrane-application", "Hand-tool"],
  techChips: [
    { label: "6mm or 10mm nap", cls: "bg-sky-100 text-sky-800" },
    { label: "230mm standard width", cls: "bg-slate-100 text-slate-700" },
    { label: "Woven polyester", cls: "bg-green-50 text-green-700" },
    { label: "PU / acrylic / cementitious", cls: "bg-slate-100 text-slate-700" },
    { label: "Replace between coats", cls: "bg-amber-50 text-amber-700" },
  ],
  systemDescription: [
    "Short nap woven roller covers (6mm or 10mm nap) are the standard tool for applying liquid-applied waterproofing membranes — PU, PU-hybrid, acrylic, and cementitious — on balcony and terrace surfaces. The short nap deposits the membrane at a controlled film thickness, reduces air entrapment in the wet membrane, and allows the applicator to maintain a wet edge across the balcony surface.",
    "Confirm the nap length and roller frame specification with the membrane manufacturer TDS before commencing — some PU membranes specify a specific nap length to achieve the correct wet film thickness per coat. A 10mm nap is typically used for thicker-bodied cementitious membranes; a 6mm nap is typically used for lower-viscosity PU and acrylic membranes — but always confirm with the membrane TDS.",
    "Replace roller covers between coats — a roller cover saturated with the first coat will deposit inconsistent film thickness on the second coat and can re-dissolve or lift the partially cured first coat. Dispose of used covers correctly — do not clean in solvent and reuse between coats of solvent-sensitive membrane systems.",
  ],
  technicalProperties: [
    "Short nap woven polyester — 6mm nap (lower viscosity PU/acrylic) or 10mm nap (cementitious/higher viscosity)",
    "230mm standard width — compatible with standard 230mm roller frames",
    "Suited to liquid-applied PU, PU-hybrid, acrylic, and cementitious waterproofing membranes",
    "Replace between coats — do not reuse a saturated roller cover on the next coat",
    "Widely available from painting trade and waterproofing trade suppliers",
  ],
  limitations: [
    "Confirm nap length with membrane TDS — incorrect nap produces incorrect film thickness",
    "Do not apply membranes with a fluffy or long-nap roller — excess nap creates air bubbles in the wet membrane",
    "Replace between coats — do not reuse a cover saturated with the first coat on the second coat",
    "For puddle flanges, penetrations, and corners, use a small 100mm roller or brush as specified in the membrane detail drawings",
    "Confirm roller frame diameter matches the cover",
  ],
  specifierNote: "Confirm nap length and roller frame specification with the membrane TDS before commencing application.",
  procurementSources: [
    { name: "Painting trade suppliers — Dulux Trade, Haymes Trade, painting wholesalers" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    { name: "Bldcare", url: "https://www.bldcare.com.au" },
    { name: "Bunnings — painting accessories", url: "https://www.bunnings.com.au" },
  ],
};

const A2: Product = {
  id: "A2",
  fullLabel: "Ox Tools / Marshalltown / Vitrex — tiling and waterproofing tools",
  accentColor: "#64748b",
  name: "Notched Trowel — V-Notch Stainless Steel",
  descriptionLine: "V-notch or square-notch stainless steel trowel for applying cementitious and heavy-bodied liquid waterproofing membranes — 3mm V-notch standard for most cementitious membranes — confirm notch profile and size with membrane manufacturer TDS before applying",
  productType: "Notched trowel — V-notch or square-notch stainless steel — cementitious membrane application",
  filterTags: ["Membrane-application", "Hand-tool"],
  techChips: [
    { label: "V-notch stainless steel", cls: "bg-slate-100 text-slate-700" },
    { label: "3mm standard notch", cls: "bg-slate-100 text-slate-700" },
    { label: "Cementitious membrane", cls: "bg-green-50 text-green-700" },
    { label: "Confirm notch with TDS", cls: "bg-amber-50 text-amber-700" },
    { label: "Hand-applied", cls: "bg-slate-100 text-slate-700" },
  ],
  systemDescription: [
    "Notched trowels are used to apply cementitious and heavy-bodied waterproofing membranes to concrete balcony substrates where the membrane must be applied at a controlled film thickness using a combing action. The notch profile (V-notch or square-notch) and notch depth determine the wet film thickness of the material applied. For most cementitious flexible waterproofing membranes, a 3mm V-notch trowel is specified — confirm with the membrane manufacturer TDS.",
    "Application technique: load the membrane onto the substrate with the flat side of the trowel, then comb using the notched edge to create a uniform ribbed profile. The ribs collapse as the membrane self-levels and cures. The notch depth must match the TDS specification — too deep a notch deposits excess material; too shallow underdeposits and the dried film thickness falls below the membrane requirement.",
    "Stainless steel trowels are preferred — standard carbon steel trowels will rust if left in contact with cementitious membranes and water. Clean the trowel immediately after use — cementitious membranes set quickly and are difficult to remove once hardened.",
  ],
  technicalProperties: [
    "Stainless steel blade — V-notch or square-notch format",
    "Standard notch for most cementitious membranes: 3mm V-notch — confirm with membrane TDS",
    "Available notch sizes: 3mm, 4mm, 5mm, 6mm — confirm correct size before applying",
    "For use with: Mapelastic Smart, Mapelastic AquaDefense, ARDEX WPM 300 series, Parchem Fastflex, and similar — always confirm with membrane TDS",
    "Clean immediately after use — cementitious membranes harden on tools quickly",
  ],
  limitations: [
    "Confirm notch profile and size with membrane TDS — incorrect notch produces incorrect film thickness and can result in membrane failure",
    "Do not use standard carbon steel trowel — stainless steel preferred to prevent rust contamination",
    "Steep vertical or overhead surfaces may require roller application instead of notched trowel",
    "Clean trowel immediately after use — set cementitious material is difficult to remove",
  ],
  specifierNote: "Confirm notch profile and size with membrane TDS before commencing application.",
  procurementSources: [
    { name: "Ox Tools — stainless steel trowels", url: "https://www.oxtools.com" },
    { name: "Marshalltown — trowels and flooring tools", url: "https://www.marshalltown.com" },
    { name: "Bunnings — tiling tools", url: "https://www.bunnings.com.au" },
    { name: "Total Tools", url: "https://www.totaltools.com.au" },
  ],
};

const A3: Product = {
  id: "A3",
  fullLabel: "Various — waterproofing and painting tool suppliers",
  accentColor: "#94a3b8",
  name: "Flat Rubber Squeegee — 300mm to 600mm",
  descriptionLine: "Flat rubber squeegee for spreading thin and self-levelling liquid-applied waterproofing membranes to uniform wet film thickness on large flat balcony areas — used in combination with roller for full area coverage — confirm membrane TDS for squeegee method suitability before applying",
  productType: "Flat rubber squeegee — 300–600mm blade — liquid waterproofing application accessory",
  filterTags: ["Membrane-application", "Hand-tool"],
  techChips: [
    { label: "Rubber blade edge", cls: "bg-slate-100 text-slate-700" },
    { label: "300–600mm width", cls: "bg-slate-100 text-slate-700" },
    { label: "Self-levelling liquid membrane", cls: "bg-green-50 text-green-700" },
    { label: "Use with roller", cls: "bg-slate-100 text-slate-700" },
    { label: "Confirm TDS suitability", cls: "bg-amber-50 text-amber-700" },
  ],
  systemDescription: [
    "A flat rubber squeegee is used to spread thin, self-levelling, and lower-viscosity liquid-applied waterproofing membranes to a uniform wet film thickness on large, flat balcony surfaces before rolling. The squeegee broadly distributes the poured or tipped membrane across the surface, allowing the roller to then apply a uniform coat at the correct film thickness. On smaller balconies, the squeegee step may be omitted and the membrane applied directly by roller only.",
    "The squeegee method is most effective for membranes that are sufficiently fluid to self-level after spreading — very thick or high-viscosity membranes such as cementitious flexible membranes applied by notched trowel (A2) are not suitable for squeegee spreading. Confirm the membrane TDS and application method recommendations before selecting the squeegee as an application tool.",
    "Blade widths from 300mm to 600mm are available — wider blades cover larger areas more quickly but require more physical effort to pull evenly. A 300–400mm blade is practical for most residential balcony sizes. The squeegee must be pulled at a consistent angle and speed — inconsistent pull rate creates uneven film thickness.",
  ],
  technicalProperties: [
    "Flat rubber or polyurethane edge blade — 300mm to 600mm working width",
    "Used for spreading and distributing thin to medium viscosity liquid membranes",
    "Works in conjunction with short nap roller (A1) for full coverage",
    "Available with or without extension handle — extension handle improves reach on larger balconies",
    "Easy clean — rinse immediately after use before membrane cures on the blade",
  ],
  limitations: [
    "Not suitable for thick or high-viscosity membranes — notched trowel (A2) required for cementitious and heavy-bodied membranes",
    "Confirm membrane TDS for squeegee method suitability before using — some PU membrane specifications require roller-only application",
    "Squeegee alone does not achieve the specified wet film thickness — follow with roller to complete the coat",
    "Cannot be used in corners or around penetrations — roller and brush required for detail areas",
    "Replace blade if worn, cracked, or permanently deformed — a damaged blade edge creates streak marks in the wet membrane",
  ],
  specifierNote: "Confirm membrane TDS for squeegee suitability. Follow squeegee spreading with roller application to complete the coat.",
  procurementSources: [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    { name: "Painting trade suppliers — squeegees and applicators" },
    { name: "Bunnings — painting and flooring tools", url: "https://www.bunnings.com.au" },
  ],
};

const M1: Product = {
  id: "M1",
  fullLabel: "Tramex / Protimeter / Delmhorst — moisture testing instruments",
  accentColor: "#0d9488",
  name: "Concrete Moisture Meter — Capacitance or Pin Type",
  descriptionLine: "Electronic moisture meter for measuring concrete substrate moisture content before waterproofing primer and membrane application — capacitance (pinless) or pin-type electrode formats — confirm maximum allowable moisture threshold with membrane manufacturer TDS before applying primer",
  productType: "Concrete moisture meter — capacitance or pin type — substrate QA — membrane application prerequisite",
  filterTags: ["Moisture-testing", "Hand-tool"],
  techChips: [
    { label: "Tramex / Protimeter", cls: "bg-teal-100 text-teal-800" },
    { label: "Capacitance or pin type", cls: "bg-slate-100 text-slate-700" },
    { label: "Pre-membrane testing", cls: "bg-green-50 text-green-700" },
    { label: "Confirm TDS threshold", cls: "bg-amber-50 text-amber-700" },
    { label: "Battery powered", cls: "bg-slate-100 text-slate-700" },
  ],
  systemDescription: [
    "Concrete moisture meters measure the electrical conductance or capacitance of the concrete surface to estimate moisture content. Two principal formats are used in Australian waterproofing practice: capacitance (pinless) meters, which measure moisture in the upper 20–30mm of the concrete without penetrating the surface; and pin-type (resistance) meters, which insert electrode pins into the surface for a direct conductance reading.",
    "Moisture testing is a mandatory pre-membrane application step on all balcony waterproofing remediation projects. Liquid-applied waterproofing membranes require the concrete substrate to be below a specific moisture content threshold before primer or membrane application. Applying membrane to a substrate with elevated moisture content causes adhesion failure, blister formation, and delamination. Confirm the maximum allowable moisture threshold with the membrane TDS — typical limits range from 4–6% moisture content, but vary by product.",
    "Test at minimum 3 locations per 10m² of balcony area — test in the centre and at least two locations near the drain, wall junctions, and any areas that appear darker or damp. Record all test readings, test locations, and instrument details as part of the project QA record.",
  ],
  technicalProperties: [
    "Capacitance (pinless) type — measures moisture in upper 20–30mm without surface penetration — suitable for QA screening",
    "Pin type (resistance) — electrode pins inserted into the concrete surface — provides point reading",
    "Battery-powered — portable — suited to balcony site use",
    "Tramex CME5/CMEX2 and Protimeter BLD5800 are widely used formats in Australian practice",
    "Calibrate or verify against known reference before use — confirm battery status before testing",
  ],
  limitations: [
    "Confirm maximum allowable moisture threshold with membrane TDS — do not use a generic threshold across different membrane systems",
    "Capacitance meters read relative moisture — surface contamination, laitance, and carbonation can affect readings",
    "Retest after any rain within 48 hours of testing — surface moisture from recent rain may read as high substrate moisture",
    "Record instrument model, calibration reference, test locations, and readings in the QA record",
    "Rising damp from within the slab requires investigation — repeated elevated readings after surface drying indicate a source below",
  ],
  specifierNote: "Confirm maximum moisture threshold with membrane TDS. Record test readings, locations, and instrument details in the QA record.",
  procurementSources: [
    { name: "Tramex — CME5, CMEX2 moisture meters", url: "https://www.tramex.com" },
    { name: "Protimeter — BLD5800 series", url: "https://www.protimeter.com" },
    { name: "Delmhorst — moisture meters", url: "https://www.delmhorst.com" },
    { name: "RS Components Australia", url: "https://au.rs-online.com" },
    { name: "Bunnings — confirm range", url: "https://www.bunnings.com.au" },
  ],
};

const M2: Product = {
  id: "M2",
  fullLabel: "Elcometer / Byk-Gardner / general trade supply",
  accentColor: "#f59e0b",
  name: "Wet Film Thickness (WFT) Comb Gauge",
  descriptionLine: "Wet film thickness comb gauge for verifying correct waterproofing membrane application rate during liquid membrane application — reads wet film thickness in microns (μm) — minimum 3 readings per coat per area — disposable or reusable stainless steel formats",
  productType: "Wet film thickness gauge — WFT comb — liquid membrane QA — per-coat verification",
  filterTags: ["Film-thickness", "Hand-tool"],
  techChips: [
    { label: "WFT comb gauge", cls: "bg-amber-100 text-amber-800" },
    { label: "Reads in μm", cls: "bg-slate-100 text-slate-700" },
    { label: "Per-coat verification", cls: "bg-green-50 text-green-700" },
    { label: "Disposable or stainless", cls: "bg-slate-100 text-slate-700" },
    { label: "Min 3 readings/coat", cls: "bg-amber-50 text-amber-700" },
  ],
  systemDescription: [
    "A wet film thickness (WFT) comb gauge is a simple, non-destructive instrument used to verify that liquid-applied waterproofing membrane is being applied at the correct wet film thickness during application. The comb is pressed into the wet membrane film immediately after application — the teeth are graduated in micron (μm) increments. The lowest tooth that picks up wet membrane indicates the wet film thickness at that point.",
    "The WFT reading must be converted to a dry film thickness (DFT) using the volume solids content of the membrane (from the TDS) to confirm that the dried coat will meet the minimum DFT requirement. Liquid-applied PU and acrylic membranes typically target a total DFT of 1.0–1.5mm over multiple coats — confirm the per-coat WFT target with the membrane TDS and calculate the correct WFT range before commencing application.",
    "Take a minimum of 3 WFT readings per coat per 10m² of balcony area — take readings in the centre and at least one reading near each junction, corner, and penetration. Record all readings as part of the project QA record. If any reading falls below the minimum WFT, apply additional membrane to that area immediately while the coat is still wet.",
  ],
  technicalProperties: [
    "WFT comb gauge — graduated teeth in micron (μm) increments — typically 25μm to 2000μm range",
    "Pressed into wet membrane film immediately after application — reads lowest tooth with wet material",
    "Disposable plastic format (single-use per coat) or reusable stainless steel format (clean after each use)",
    "Lightweight and portable — standard QA instrument for liquid membrane application",
    "Elcometer 112 and Byk-Gardner comb gauges are widely used formats in Australian practice",
  ],
  limitations: [
    "Confirm per-coat WFT target with membrane TDS before commencing — WFT target varies by membrane system",
    "WFT must be read immediately after application — allow more than 2–3 minutes and the membrane begins to skin, producing false low readings",
    "WFT reading must be converted to DFT using volume solids content — WFT alone is not the compliance figure",
    "Replace disposable gauges between coats — a gauge contaminated with coat 1 will not give an accurate reading on coat 2",
    "Do not take WFT readings on heavily textured surfaces — surface profile variation affects the reading",
  ],
  specifierNote: "Confirm per-coat WFT target with membrane TDS. Minimum 3 readings per coat per 10m² — record in QA record.",
  procurementSources: [
    { name: "Elcometer — film thickness gauges", url: "https://www.elcometer.com" },
    { name: "Byk-Gardner — WFT comb gauges" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    { name: "RS Components Australia", url: "https://au.rs-online.com" },
    { name: "Paint and coatings equipment suppliers" },
  ],
};

const PRODUCT_SECTIONS: ProductSection[] = [
  {
    id: "removal",
    heading: "Section 1 — Tile and membrane removal",
    subHeading: "SDS-Max tools for controlled tile and adhesive removal from concrete balcony substrates",
    products: [T1, T2],
  },
  {
    id: "grinding",
    heading: "Section 2 — Concrete surface preparation — grinding / scarifying",
    subHeading: "Diamond cup wheels, walk-behind grinders, and scarifiers for achieving the required ICRI CSP surface profile",
    products: [G1, G2, G3],
  },
  {
    id: "cutting",
    heading: "Section 3 — Cutting — diamond saw blades",
    subHeading: "Diamond saw blades for perimeter cuts, control joints, and screed cutting — wet cutting only",
    products: [C1],
  },
  {
    id: "application",
    heading: "Section 4 — Membrane application tools",
    subHeading: "Rollers, notched trowels, and squeegees for applying liquid-applied waterproofing membranes",
    products: [A1, A2, A3],
  },
  {
    id: "measurement",
    heading: "Section 5 — Measurement and inspection",
    subHeading: "Moisture meters and WFT gauges for substrate QA and membrane application verification",
    products: [M1, M2],
  },
];

const ALL_PRODUCTS = PRODUCT_SECTIONS.flatMap((s) => s.products);

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Tile-removal", label: "Tile removal" },
  { id: "Membrane-removal", label: "Membrane/adhesive removal" },
  { id: "Surface-grinding", label: "Surface grinding" },
  { id: "Scarifying", label: "Scarifying" },
  { id: "Diamond-cutting", label: "Diamond cutting" },
  { id: "Membrane-application", label: "Membrane application" },
  { id: "Moisture-testing", label: "Moisture testing" },
  { id: "Film-thickness", label: "Film thickness" },
  { id: "Hand-tool", label: "Hand tool" },
  { id: "SDS-electric", label: "SDS-Max electric" },
  { id: "Angle-grinder", label: "Angle grinder" },
  { id: "Walk-behind-machine", label: "Walk-behind machine" },
  { id: "Wet-cutting", label: "Wet cutting" },
  { id: "Dust-extraction-required", label: "Dust extraction required" },
  { id: "CSP-profile", label: "CSP surface profile" },
];

type ComparisonRow = {
  product: string;
  category: string;
  task: string;
  powerSource: string;
  keySpec: string;
  keyRestriction: string;
};

const COMPARISON: ComparisonRow[] = [
  {
    product: "Tile Stripping Blade — SDS-Max",
    category: "Tile removal",
    task: "Remove ceramic / porcelain tiles from concrete",
    powerSource: "SDS-Max rotary / demolition hammer",
    keySpec: "25mm flat scraper — SDS-Max shank",
    keyRestriction: "Mask drain aperture — protect puddle flange from impact",
  },
  {
    product: "SDS-Max Demolition Chisel",
    category: "Tile / adhesive removal",
    task: "Remove thick tile adhesive beds after tile stripping",
    powerSource: "SDS-Max demolition hammer",
    keySpec: "50mm flat chisel (adhesive) / pointed (hard bond)",
    keyRestriction: "Protect puddle flanges — follow with diamond cup wheel grinding",
  },
  {
    product: "Diamond Cup Wheel — 125mm",
    category: "Surface preparation",
    task: "Grind concrete to ICRI CSP 3–4",
    powerSource: "Angle grinder 125mm",
    keySpec: "Double row segmented — M14 thread — 125mm",
    keyRestriction: "Dust shroud + M-class vacuum mandatory — dry grinding is WHS breach",
  },
  {
    product: "Walk-Behind Floor Grinder",
    category: "Surface preparation",
    task: "Large area concrete grinding to CSP 3–5",
    powerSource: "Electric — single or 3-phase hire",
    keySpec: "Planetary head — 250–800mm width",
    keyRestriction: "Dust extraction mandatory — confirm machine access and power supply",
  },
  {
    product: "Scarifying Machine",
    category: "Surface preparation",
    task: "Heavy contamination / coating removal CSP 5–8",
    powerSource: "Electric — hire",
    keySpec: "Rotary drum tungsten carbide cutters",
    keyRestriction: "Confirm CSP with membrane TDS — may require levelling coat before membrane",
  },
  {
    product: "Diamond Segmented Saw Blade",
    category: "Cutting",
    task: "Perimeter cuts / control joints / screed / tile",
    powerSource: "Angle grinder 115 / 125mm",
    keySpec: "Segmented diamond — 22.23mm arbor",
    keyRestriction: "Wet cutting only — dry diamond cutting is WHS regulatory breach",
  },
  {
    product: "Short Nap Roller Cover",
    category: "Membrane application",
    task: "Apply PU / acrylic / cementitious membranes",
    powerSource: "Hand tool — roller frame",
    keySpec: "6mm or 10mm nap — 230mm width",
    keyRestriction: "Replace between coats — confirm nap with membrane TDS",
  },
  {
    product: "Notched Trowel — V-Notch",
    category: "Membrane application",
    task: "Apply cementitious and heavy-bodied membranes",
    powerSource: "Hand tool",
    keySpec: "3mm V-notch stainless steel",
    keyRestriction: "Confirm notch size with membrane TDS — incorrect notch = incorrect film thickness",
  },
  {
    product: "Flat Rubber Squeegee",
    category: "Membrane application",
    task: "Spread thin liquid membranes to uniform film",
    powerSource: "Hand tool",
    keySpec: "300–600mm rubber blade",
    keyRestriction: "Follow with roller — not suitable for viscous membranes",
  },
  {
    product: "Concrete Moisture Meter",
    category: "Measurement",
    task: "Substrate moisture before membrane application",
    powerSource: "Battery — hand tool",
    keySpec: "Capacitance or pin type — Tramex / Protimeter",
    keyRestriction: "Min 3 locations per 10m² — confirm threshold with membrane TDS",
  },
  {
    product: "WFT Comb Gauge",
    category: "Measurement",
    task: "Verify wet film thickness during application",
    powerSource: "Hand tool — no power",
    keySpec: "Comb gauge — reads in μm",
    keyRestriction: "Min 3 readings per coat — replace disposable gauge between coats",
  },
];

const TECH_INFO = {
  icriCsp: [
    "ICRI CSP 1–9 describes the concrete surface profile range from very smooth (CSP 1) to extremely coarse (CSP 9)",
    "CSP 1–2: polished or lightly brushed — too smooth for liquid-applied waterproofing membranes — mechanical preparation required before primer",
    "CSP 3–4: light to moderate grinding by diamond cup wheel or floor grinder — most common requirement for liquid-applied PU, acrylic, and cementitious membranes",
    "CSP 5–6: aggressive scarifying or scabbling — required for heavily contaminated substrates or thick coating removal",
    "CSP 7–9: very aggressive profiles from heavy milling or shot blasting — not typically required for balcony liquid-applied waterproofing",
    "Confirm required CSP profile with the membrane manufacturer TDS before commencing surface preparation — do not assume CSP 3–4 applies to all systems",
  ],
  prepSequence: [
    "1. Remove all tiles — use SDS-Max tile stripping blade (T1) — protect puddle flanges from impact — mask drain aperture",
    "2. Remove tile adhesive beds — use SDS-Max demolition chisel (T2) — flat chisel preferred — protect puddle flanges",
    "3. Mark all cracks, voids, delaminations, and substrate defects for repair",
    "4. Repair all substrate defects with approved repair mortar — confirm curing time with mortar TDS before grinding",
    "5. Grind all high spots and adhesive residue flush with diamond cup wheel (G1) — dust extraction mandatory",
    "6. Grind full surface to required CSP profile — cup wheel (G1) for small areas / walk-behind grinder (G2) for large areas",
    "7. Remove all grinding dust and residue by vacuum — do not blow dust into drain pipes",
    "8. Test concrete moisture — minimum 3 locations per 10m² — confirm below membrane TDS threshold using moisture meter (M1)",
    "9. Document: date, surface prep method, CSP achieved, moisture readings, inspector — QA record before proceeding to primer",
  ],
  silicaDust: [
    "Crystalline silica is a Group 1 occupational carcinogen (IARC) — Safe Work Australia WHS Regulations enforce mandatory controls",
    "Dry cutting, dry grinding, and dry scarifying of concrete, ceramic tile, porcelain tile, or tile adhesive on site is prohibited — Safe Work Australia Model WHS Regulations and Code of Practice: Crystalline Silica",
    "Grinding controls: angle grinder dust extraction shroud + M-class vacuum, or wet grinding with water feed",
    "Cutting controls: water feed (wet cutting) or diamond blade dust extraction shroud + M-class vacuum",
    "RPE: minimum P2 half-face respirator where dust is present — P3 or PAPR where engineering controls are not fully effective",
    "All workers in the dust zone must be protected — not just the tool operator",
    "A Safe Work Method Statement (SWMS) must address silica dust controls before any grinding, cutting, or demolition commences",
  ],
  concreteMoisture: [
    "Liquid-applied waterproofing membranes require the substrate below the moisture threshold in the TDS — typically 4–6% by mass or a specific %RH — confirm with TDS",
    "Elevated substrate moisture causes: primer delamination, membrane blistering, adhesion failure, and accelerated membrane deterioration",
    "Testing: capacitance moisture meter (M1) for screening — minimum 3 locations per 10m²",
    "After rain: allow minimum 24–48 hours before testing — retest if substrate was wet within 48 hours of applying primer",
    "Rising damp from within the slab: repeated elevated readings after surface drying indicate a subslab moisture source — investigate before applying membrane",
    "Do not apply primer or membrane to any location where the reading is above the TDS threshold — allow to dry and retest",
  ],
  toolSelection: [
    "New concrete (smooth / CSP 1–2): diamond cup wheel grinding (G1) to CSP 3–4 — no tile removal required",
    "Old concrete with intact tiles: tile stripping blade (T1) then demolition chisel (T2) for adhesive, then cup wheel grinding (G1)",
    "Old concrete with screed: confirm screed soundness by hammer test — if sound, grind to CSP 3–4 (G1/G2); if delaminated, scarify (G3) or remove",
    "Heavily contaminated surface (oil, paint, sealer, bond-breaker): scarify (G3) — confirm CSP with membrane TDS",
    "Small areas and edge zones: angle grinder cup wheel (G1); large flat areas: walk-behind grinder (G2)",
    "Perimeter and joint cuts: diamond saw blade (C1) — wet cutting only",
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

export function AbrasivesIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          Abrasives, blades and tools — balcony waterproofing remediation
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Balcony waterproofing remediation on Class 2 strata apartment buildings requires a controlled sequence of surface preparation, membrane application, and quality assurance — each step requiring specific tools that are suited to the substrate condition, membrane system, and site WHS requirements. The tool categories covered on this page span the full remediation sequence: tile and membrane removal by SDS-Max demolition tools, concrete surface preparation by diamond grinding and scarifying, perimeter and joint cutting by diamond saw blades, liquid membrane application by roller, notched trowel, and squeegee, and substrate quality assurance by concrete moisture meter and wet film thickness gauge.
        </p>
        {expanded && (
          <>
            <p>
              Surface preparation is the step most frequently responsible for premature waterproofing membrane failure in Australian strata remediation practice. Liquid-applied PU, acrylic, and cementitious membranes require the concrete substrate to be mechanically prepared to the ICRI CSP profile specified by the membrane manufacturer — typically CSP 3–4 — before primer application. Preparation methods vary based on the substrate condition: new or previously uncoated concrete requires diamond cup wheel grinding; old concrete with tile adhesive residue requires demolition chisel removal followed by grinding; heavily contaminated or painted substrates may require scarifying. Moisture testing before primer application is not optional — it is a mandatory step on every compliant balcony waterproofing scope.
            </p>
            <p>
              All grinding, scarifying, and cutting of concrete, ceramic tile, porcelain tile, and tile adhesive on Australian construction sites is subject to Safe Work Australia silica dust regulations — dry grinding or dry cutting on site is a WHS regulatory breach. Every tool listed in the surface preparation and cutting sections of this page requires either wet cutting (water feed) or a dust extraction shroud connected to an M-class or H-class vacuum. Compliance is not discretionary — confirm the site WHS controls and Safe Work Method Statement (SWMS) before commencing any surface preparation work.
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
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
      </div>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
        {product.techChips.map((chip) => (
          <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
            {chip.label}
          </span>
        ))}
      </div>

      {/* System description */}
      <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
        <CollapsibleDescription text={product.systemDescription.join('\n\n')} />
      </div>

      {/* Properties & Limitations */}
      <div className="space-y-3 px-5 py-4">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
          <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
        </div>
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
          <CollapsibleList items={product.limitations} icon="x" limit={3} />
        </div>
        {product.specifierNote && (
          <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Specifier note</p>
            <p className="mt-0.5 text-xs italic text-sky-800">{product.specifierNote}</p>
          </div>
        )}
      </div>

        {/* Procurement */}
        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
          <CollapsibleSources sources={product.procurementSources} />
        </div>
    </div>
  );
}

export function AbrasivesProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredProducts =
    activeFilters.size === 0
      ? null
      : ALL_PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

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
              ICRI CSP scale, surface preparation sequence, silica dust WHS requirements, concrete moisture, tool selection by substrate
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Ruler size={15} />} title="ICRI CSP Concrete Surface Profile Scale" items={TECH_INFO.icriCsp} style="bullet" />
              <TechCard icon={<Layers size={15} />} title="Surface Preparation Sequence — Balcony Remediation" items={TECH_INFO.prepSequence} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Silica Dust — WHS Regulatory Requirements" items={TECH_INFO.silicaDust} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Concrete Moisture — Testing and Thresholds" items={TECH_INFO.concreteMoisture} style="bullet" />
              <TechCard icon={<Wrench size={15} />} title="Tool Selection by Substrate Condition" items={TECH_INFO.toolSelection} style="check" />
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
              11 products across 5 tool categories — tile removal, concrete surface preparation, cutting, membrane application, and measurement — balcony waterproofing remediation
            </p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
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

        {/* ── Filtered flat list ── */}
        {filteredProducts !== null ? (
          <div>
            <p className="mb-4 text-xs font-semibold text-slate-400">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} match{filteredProducts.length === 1 ? "es" : ""} active filters
            </p>
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center text-sm text-slate-400">
                No products match the selected filters. <button onClick={() => setActiveFilters(new Set())} className="ml-1 underline hover:text-slate-600">Clear filters</button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Sectioned view (no filters active) ── */
          <div className="space-y-10">
            {PRODUCT_SECTIONS.map((section) => (
              <div key={section.id}>
                {/* Section divider */}
                <div className="mb-5 flex items-center gap-4">
                  <div className="h-5 w-1 shrink-0 rounded-full bg-red-700" />
                  <div className="flex-1">
                    <h3 className="text-base font-extrabold text-sky-950">{section.heading}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{section.subHeading}</p>
                  </div>
                  <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                    {section.products.length} product{section.products.length !== 1 ? "s" : ""}
                  </div>
                </div>
                {/* Card row */}
                <div
                  className="flex gap-5 overflow-x-auto pb-2 scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
                >
                  {section.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex-none"
                      style={{
                        width: section.products.length === 1
                          ? "min(100%, 520px)"
                          : section.products.length === 2
                          ? "calc(50% - 10px)"
                          : "calc(33.333% - 14px)",
                        minWidth: "290px",
                      }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Comparison Table ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Abrasives, blades and tools comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of all 11 products across 5 tool categories. Confirm all product selections against current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Category</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Task</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Power source</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key specification</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.category}</td>
                  <td className="px-4 py-3 text-slate-600">{row.task}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.powerSource}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keySpec}</td>
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
