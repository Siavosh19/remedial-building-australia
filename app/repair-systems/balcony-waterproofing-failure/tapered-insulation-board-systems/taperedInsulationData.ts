// Tapered / falls insulation boards for warm-roof podium/roof build-ups. Commodity → no Class-2/warranty. Lighter treatment.
// appInfo: Type · Material · Format / falls · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Format / falls", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const TAPERED_INSULATION_CARDS: RefCard[] = [
  {
    brand: "Kingspan Insulation Australia",
    rangeName: "Kingspan Thermataper TT46 / TT47",
    shortType: "PIR foil-faced tapered roof insulation",
    badges: [{ label: "PIR tapered", tone: "amber" }],
    bestFor: [
      "Creating drainage falls within the insulation layer of a warm-roof podium/roof build-up without a falls screed",
      "Mechanically fixed single-ply (PVC/FPO/TPO) warm-roof assemblies (TT46)",
    ],
    avoidWhere: [
      "Inverted (protected-membrane) roofs — this is a below-membrane warm-roof board",
    ],
    appInfo: kp([
      "PIR tapered insulation board",
      "PIR rigid foam — composite foil facing both sides",
      "Bespoke project layout; 1:60 / 1:80 fall systems; TT47 flat companion board",
      "Warm roof — below the membrane — falls creation",
      "Bespoke tapered layout design service; boards labelled for site placement",
    ]),
    warnings: [
      "Layout is project-specific and cannot be re-cut on site to a different plan — confirm lead times before committing to programme",
      "Confirm current Australian stock, fall design service scope and VCL requirement with Kingspan Australia",
    ],
    advanced: {
      description:
        "Kingspan Thermataper TT46/TT47 are PIR tapered insulation boards with composite foil facings, part of Kingspan's Therma Tapered Roofing range and listed on kingspan.com/au. TT46 is designed for mechanically fixed single-ply (PVC/FPO/TPO) warm roofs in 1:60 and 1:80 fall systems; TT47 is the constant-thickness companion board. Kingspan provides a project-specific tapered layout design service with boards labelled for placement.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "PIR rigid foam — composite foil facing both sides", source: "Kingspan Australia" },
        { label: "Lambda", value: "0.022 W/mK", source: "Kingspan Australia" },
        { label: "Fall systems", value: "1:60 and 1:80 (TT46)", source: "Kingspan Australia" },
        { label: "Position", value: "Warm roof — below the waterproofing membrane", source: "Kingspan Australia" },
      ],
    },
  },
  {
    brand: "Recticel (Gradient) — WPD Group",
    rangeName: "Recticel Eurothane Silver A",
    shortType: "PIR foil-faced tapered insulation board",
    badges: [{ label: "PIR tapered", tone: "amber" }],
    bestFor: [
      "Bespoke tapered falls layouts on warm flat roofs and podium slabs",
      "Use under mechanically fixed single-ply or bituminous waterproofing systems",
    ],
    avoidWhere: [
      "Inverted roof (above-membrane) positions — PIR absorbs moisture in permanently wet conditions",
    ],
    appInfo: kp([
      "PIR tapered insulation board",
      "PIR rigid foam — foil-faced both sides (gas-diffusion-tight)",
      "Bespoke project-specific tapered layout (Gradient design); boards labelled for position",
      "Warm roof — below the membrane — falls creation",
      "Available in Australia through WPD Group (Waterproofing Direct)",
    ]),
    warnings: [
      "Confirm the facing type required for the specific membrane above before ordering",
      "Confirm stock, minimum order, tapered-layout lead time and pricing with WPD Group",
    ],
    advanced: {
      description:
        "Recticel Eurothane Silver A is a PIR rigid foam tapered insulation board with multi-layer foil facing on both faces, used in warm flat roof assemblies to provide thermal insulation and create drainage falls without a concrete screed. Recticel's tapered division (Gradient) designs a bespoke layout plan per roof or podium showing board positions, thicknesses, ridges and valleys. In Australia it is available through WPD Group.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "PIR rigid foam — foil-faced both sides", source: "Recticel" },
        { label: "Layout", value: "Project-specific Gradient tapered design", source: "Recticel" },
        { label: "Compatibility", value: "Mechanically fixed single-ply and bituminous systems", source: "Recticel" },
        { label: "AU supply", value: "WPD Group (Waterproofing Direct)", source: "WPD Group" },
      ],
    },
  },
  {
    brand: "Fatra Australia",
    rangeName: "Fatra PIR Tapered Insulation System",
    shortType: "PIR tapered system within complete Fatra warm roof",
    badges: [{ label: "PIR tapered", tone: "amber" }],
    bestFor: [
      "Complete warm-roof systems where the tapered PIR, VCL and Fatrafol PVC membrane are supplied together",
      "Fully adhered (non-penetrative) or mechanically fixed warm-roof build-ups",
    ],
    avoidWhere: [
      "Use as a standalone board with a third-party membrane — it is supplied as part of the Fatra system",
    ],
    appInfo: kp([
      "PIR tapered insulation system (complete warm roof)",
      "PIR rigid foam — manufactured to project layout",
      "Project-specific tapered layout; fully adhered or mechanically fixed configurations",
      "Warm roof — below the Fatrafol PVC membrane — falls creation",
      "Supplied with FatraVap/Fatrapar VCL and Fatrafol membrane as a system",
    ]),
    warnings: [
      "PIR board is not supplied standalone for use with other membrane systems",
      "Confirm system configuration, VCL and current supply with Fatra Australia",
    ],
    advanced: {
      description:
        "Fatra Australia designs and manufactures project-specific PIR tapered insulation as part of its complete warm roof system — incorporating the tapered PIR board, a FatraVap or Fatrapar vapour control layer, and the Fatrafol PVC membrane above. It is offered in fully adhered (FatraVap + Fatrabond PU adhesives + Fatrafol 807v) and mechanically fixed (Fatrapar + Fatra Pad System + Fatrafol 810v) configurations, both non-penetrative through the membrane field.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "PIR rigid foam — project-specific layout", source: "Fatra Australia" },
        { label: "Fully adhered", value: "FatraVap VCL + Fatrabond PU + Fatrafol 807v PVC", source: "Fatra Australia" },
        { label: "Mechanically fixed", value: "Fatrapar VCL + Fatra Pad System + Fatrafol 810v PVC", source: "Fatra Australia" },
      ],
    },
  },
  {
    brand: "Enduroflex Australia",
    rangeName: "Enduroflex Tapered Insulation Service",
    shortType: "Warm-roof tapered insulation design & install service (NSW)",
    badges: [{ label: "Service", tone: "slate" }],
    bestFor: [
      "Warm-roof tapered insulation design and installation as a package, with condensation risk analysis",
      "Podium/roof-deck falls creation on NSW remediation projects",
    ],
    avoidWhere: [
      "Standalone board supply — this is a design-and-install service, not a product",
    ],
    appInfo: kp([
      "Warm roof tapered insulation service",
      "PIR tapered insulation (within Enduroflex warm-roof package)",
      "Project-specific design; condensation risk analysis included",
      "Warm roof — falls creation on roof decks and podium slabs",
      "NSW focus; supplies DuO membrane for exposed deck/podium/balcony",
    ]),
    warnings: [
      "Service-based — designs and installs as a package rather than supplying board only",
      "Confirm product range, membrane compatibility and availability outside NSW before specifying",
    ],
    advanced: {
      description:
        "Enduroflex provides warm-roof tapered insulation design and installation in New South Wales, with condensation risk analysis offered alongside the tapered insulation specification. Enduroflex supplies the DuO waterproofing membrane (BRANZ appraised) for exposed roof deck, podium and balcony applications and offers tapered insulation as part of a complete warm-roof package. Confirm current range and geographic reach before specifying outside NSW.",
      designCriteria: "",
      techData: [
        { label: "Format", value: "Design & install service (warm roof package)", source: "Enduroflex" },
        { label: "Includes", value: "Condensation risk analysis", source: "Enduroflex" },
        { label: "Region", value: "New South Wales (confirm wider availability)", source: "Enduroflex" },
      ],
    },
  },
  {
    brand: "Generic (XPS)",
    rangeName: "XPS Extruded Polystyrene Board",
    shortType: "Closed-cell moisture-resistant rigid insulation",
    badges: [{ label: "XPS", tone: "slate" }],
    bestFor: [
      "Inverted (protected-membrane) roofs where the insulation sits above the membrane in wet conditions",
      "Podium/warm-roof build-ups where moisture resistance in the insulation layer is a priority",
    ],
    avoidWhere: [
      "Where high thermal performance per thickness is needed — XPS needs more thickness than PIR for the same R-value",
    ],
    appInfo: kp([
      "XPS rigid insulation board",
      "Extruded polystyrene — closed-cell, moisture-resistant",
      "Flat boards standard; tapered XPS from specialist suppliers (confirm)",
      "Inverted roof above membrane; also warm-roof / podium where moisture resistance needed",
      "Multiple compressive-strength grades; confirm grade against loading above",
    ]),
    warnings: [
      "Tapered XPS for falls is less commonly stocked in Australia than tapered PIR — confirm availability",
      "Confirm grade, compressive strength and pricing with the local supplier before specifying",
    ],
    advanced: {
      description:
        "Extruded polystyrene (XPS) is the standard insulation for inverted (protected-membrane) roofs where the board sits above the waterproofing membrane and is permanently exposed to draining water; its closed-cell structure gives low moisture absorption. In an inverted roof it is laid loose above the cured membrane and held by the ballast/pavers above. It is also used in warm-roof and podium build-ups where moisture resistance matters and as protection board.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Extruded polystyrene — closed-cell rigid foam", source: "Generic" },
        { label: "Lambda", value: "approx 0.033–0.038 W/mK", source: "Generic" },
        { label: "Position", value: "Inverted roof above membrane; also warm-roof / protection", source: "Generic" },
      ],
    },
  },
  {
    brand: "Generic (mineral wool)",
    rangeName: "Mineral Wool Flat Roof Board",
    shortType: "Non-combustible rigid insulation board",
    badges: [{ label: "Mineral wool", tone: "slate" }],
    bestFor: [
      "Roof/podium build-ups where the NCC, fire engineer or certifier specifies non-combustible insulation",
      "Warm-roof assemblies under single-ply PVC/FPO or compatible torch-on membranes",
    ],
    avoidWhere: [
      "Where high thermal performance per thickness is needed — mineral wool needs more thickness than PIR",
    ],
    appInfo: kp([
      "Mineral wool (stone wool) rigid roof board",
      "Non-combustible stone wool",
      "Flat boards; tapered formats from specialist suppliers (confirm AU availability)",
      "Warm roof — above VCL, below the membrane",
      "Lower thermal performance than PIR — thicker board for same R-value",
    ]),
    warnings: [
      "Tapered mineral wool is less commonly available in Australia than tapered PIR — confirm before specifying",
      "Confirm Australian product availability with the local supplier (e.g. Rockwool, Knauf, Sika Sikatherm)",
    ],
    advanced: {
      description:
        "Mineral wool (stone wool) rigid boards are non-combustible and are the preferred or required insulation where the NCC, fire engineer or certifier specifies non-combustible construction in the roof build-up. They are used in warm-roof assemblies above the VCL and below the membrane, compatible with single-ply PVC/FPO (mechanically fixed) and compatible torch-on systems. Thermal performance is lower than PIR, so thicker board is needed for a given R-value.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "Non-combustible stone wool rigid board", source: "Generic" },
        { label: "Lambda", value: "approx 0.033–0.036 W/mK", source: "Generic" },
        { label: "Position", value: "Warm roof — above VCL, below membrane", source: "Generic" },
      ],
    },
  },
  {
    brand: "Bauder",
    rangeName: "Bauder Tapered Insulation (BauderPIR FA TE)",
    shortType: "PIR tapered insulation within Bauder warm-roof systems",
    badges: [{ label: "PIR tapered", tone: "amber" }],
    bestFor: [
      "Bespoke tapered falls within Bauder bituminous or single-ply warm-roof systems",
      "Podium and flat-roof decks needing falls created in the insulation layer",
    ],
    avoidWhere: [
      "Inverted (above-membrane) roofs — this is a below-membrane warm-roof board",
    ],
    appInfo: kp([
      "PIR tapered insulation board",
      "PIR rigid foam (foil/mineral-faced facings depending on system)",
      "Bespoke project tapered design; boards labelled for placement",
      "Warm roof — below the membrane — falls creation",
      "Part of Bauder complete warm-roof system; confirm AU supply",
    ]),
    warnings: [
      "Supplied within the Bauder system — confirm membrane and facing compatibility before ordering",
      "Confirm current Australian distribution, layout design service and lead times with Bauder",
    ],
    advanced: {
      description:
        "Bauder offers PIR tapered insulation as part of its complete warm-roof systems, with a project-specific tapered design service to create drainage falls in the insulation layer beneath bituminous or single-ply membranes. Confirm the facing type, membrane compatibility and current Australian distribution with Bauder before specifying.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "PIR rigid foam — system-specific facings", source: "Bauder" },
        { label: "Layout", value: "Project-specific tapered design service", source: "Bauder" },
        { label: "Position", value: "Warm roof — below the membrane", source: "Bauder" },
      ],
    },
  },
];
