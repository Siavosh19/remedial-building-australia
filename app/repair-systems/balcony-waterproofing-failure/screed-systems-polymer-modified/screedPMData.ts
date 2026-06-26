// ──────────────────────────────────────────────────────────────────────────────
// Polymer-modified screed systems — hand-authored cards. Falls/bedding screeds and
// the polymer modifiers/admixtures that make them. System components (not membranes)
// → no Class-2 / warranty field. Values from the AU manufacturer page/TDS; empty
// facts pruned. appInfo columns: Type · Set/dry · Thickness · Use · Trafficable/overlay · Notes.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Set / dry speed", "Thickness", "Use", "Trafficable / overlay", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SCREED_PM_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX A 38",
    shortType: "Rapid-set cement screed (premixed)",
    badges: [{ label: "Rapid-set screed", tone: "navy" }],
    appInfo: kp([
      "Rapid-set premixed cement screed",
      "Walkable 8 h; tile same day (8 h)",
      "Bonded ≥15 mm; unbonded ≥35 mm (pref 40)",
      "Bonded / unbonded / heated screeds — falls & bedding",
      "Tiles 8 h; Terrazzo/smoothing 24 h; resilient/parquet 2 d",
      "",
    ]),
    bestFor: [
      "Rapid-set screed — walk on and tile the same day (8 h)",
      "Bonded, unbonded (over slip-sheet/insulation) and heated screeds",
    ],
    avoidWhere: [
      "Below the minimum thickness (bonded 15 mm / unbonded 35 mm)",
      "As a self-smoothing finish — use a self-levelling compound",
    ],
    warnings: [
      "Observe the minimum thicknesses for bonded vs unbonded",
      "Confirm overlay times for the chosen finish against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX A 38 is a rapid-set premixed cement screed for bonded, unbonded (slip-sheet/insulation) and heated screeds — falls and bedding for tiles, natural stone, Terrazzo, resilient and parquet finishes. Walkable and tileable from 8 h; bonded ≥15 mm, unbonded ≥35 mm (preferably 40 mm).",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Rapid-set premixed cement screed", source: "ardexaustralia.com A 38" },
        { label: "Thickness", value: "Bonded ≥15 mm; unbonded ≥35 mm (pref 40)", source: "ardexaustralia.com A 38" },
        { label: "Overlay", value: "Tiles 8 h; Terrazzo/smoothing 24 h; resilient/parquet 2 d", source: "ardexaustralia.com A 38" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX A 48",
    shortType: "Rapid-set cement screed preparation (premixed)",
    badges: [{ label: "Rapid-set screed", tone: "navy" }],
    appInfo: kp([
      "Rapid-set premixed cement screed",
      "Walkable 4 h; tiles/stone 4 h; membranes 24 h",
      "Bonded ≥15 mm; unbonded ≥35 mm (pref 40)",
      "Bonded / unbonded screed — falls & floor prep",
      "Tiles/stone 4 h; membranes 24 h; resilient 2 d",
      "Dimensionally stable, shrinkage-free; ~1 m² / 10 mm / 20 kg",
    ]),
    bestFor: [
      "Faster than A 38 — walk on and lay tiles/stone at 4 h, membrane at 24 h",
      "Dimensionally stable, tension- and shrinkage-free premixed screed",
    ],
    avoidWhere: [
      "Below the minimum thickness (bonded 15 mm / unbonded 35 mm)",
      "As a self-smoothing finish — use a self-levelling compound",
    ],
    warnings: [
      "Observe the minimum thicknesses for bonded vs unbonded",
      "Confirm the overlay window for membranes/finishes against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX A 48 is a rapid-set premixed cement screed for bonded and unbonded falls/bedding beneath tiles, stone, membranes, resilient flooring and parquet. Walkable and ready for tiles/stone at 4 h, membranes at 24 h, resilient at 2 days; bonded ≥15 mm, unbonded ≥35 mm. Dimensionally stable and shrinkage-free; ~1 m² per 10 mm per 20 kg bag.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Rapid-set premixed cement screed", source: "ardexaustralia.com A 48" },
        { label: "Overlay", value: "Tiles/stone 4 h; membranes 24 h; resilient 2 d", source: "ardexaustralia.com A 48" },
        { label: "Coverage", value: "~1 m² / 10 mm / 20 kg", source: "ardexaustralia.com A 48" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapecem Pronto",
    shortType: "Pre-blended rapid-set/dry screed mortar (controlled-shrinkage)",
    badges: [{ label: "Rapid-dry screed", tone: "navy" }, { label: "Just add water", tone: "blue" }],
    appInfo: kp([
      "Pre-blended ready-to-use screed mortar (controlled-shrinkage)",
      "Quick-set & dry — dry in 24 h; foot traffic 2–3 h",
      "",
      "Falls & bedding screed — tiles, stone, resilient, wood",
      "Tiles/stone 3 h; resilient/wood 24 h",
      "Residual humidity <2% @24 h; 20 kg/m² per cm; just add water",
    ]),
    bestFor: [
      "Just-add-water rapid screed — dries in 24 h with residual humidity <2%, so resilient and wood go down fast",
      "Controlled shrinkage; light foot traffic 2–3 h, tiles at 3 h",
    ],
    avoidWhere: [
      "Where a normal-set, longer-working screed is needed (use Topcem Pronto AU)",
    ],
    warnings: [
      "Workability is only 20–30 min — plan batch sizes and placement",
      "Confirm minimum/maximum thickness and water ratio against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Mapecem Pronto is a pre-blended, ready-to-use, quick-setting and quick-drying (24 h), controlled-shrinkage screed mortar — just add water (≈1.5–1.7 L per 20 kg). Light foot traffic 2–3 h; ceramic/stone at 3 h; resilient/wood at 24 h (residual humidity <2%). Consumption 20 kg/m² per cm of thickness; workability 20–30 min.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Pre-blended controlled-shrinkage screed mortar", source: "mapei.com/au Mapecem Pronto" },
        { label: "Dry", value: "24 h; residual humidity <2% @24 h", source: "mapei.com/au Mapecem Pronto" },
        { label: "Overlay", value: "Tiles/stone 3 h; resilient/wood 24 h", source: "mapei.com/au Mapecem Pronto" },
        { label: "Consumption", value: "20 kg/m² per cm", source: "mapei.com/au Mapecem Pronto" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Topcem Pronto AU",
    shortType: "Normal-set, quick-dry screed binder (controlled-shrinkage)",
    badges: [{ label: "Quick-dry screed", tone: "navy" }, { label: "Just add water", tone: "blue" }],
    appInfo: kp([
      "Normal-set, quick-dry hydraulic screed binder (controlled-shrinkage)",
      "Normal-set; dry in 4 days; trafficable 12 h",
      "",
      "Falls & bedding screed — tiles, stone, resilient, wood",
      "Tiles 24 h; stone 2 d; resilient/wood 4 d",
      "Just add water — no on-site sand/cement batching",
    ]),
    bestFor: [
      "Normal-set, quick-drying (4 days) screed binder — longer working time than Mapecem, dry in 4 days for parquet/resilient",
      "Just add water — consistent quality, no site batching of sand and cement",
    ],
    avoidWhere: [
      "Where a same-day rapid tile-over is needed (use Mapecem Pronto)",
    ],
    warnings: [
      "Confirm minimum/maximum thickness and water ratio against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Topcem Pronto AU is a normal-setting, quick-drying (4 days), controlled-shrinkage hydraulic binder for screeds that only requires the addition of water — eliminating on-site sand/cement batching. Trafficable in 12 h; ceramic tiles at 24 h, natural stone at 2 days, resilient/wood at 4 days.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Normal-set quick-dry screed binder (controlled-shrinkage)", source: "mapei.com/au Topcem Pronto AU" },
        { label: "Dry / traffic", value: "Dry 4 days; trafficable 12 h", source: "mapei.com/au Topcem Pronto AU" },
        { label: "Overlay", value: "Tiles 24 h; stone 2 d; resilient/wood 4 d", source: "mapei.com/au Topcem Pronto AU" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Cemtop Screed",
    shortType: "Cementitious screed — corrects falls before membranes",
    badges: [{ label: "Cementitious screed", tone: "navy" }],
    appInfo: kp([
      "Cementitious screed",
      "",
      "3–40 mm",
      "Correct falls before waterproofing membranes & floor finishes",
      "",
      "Apply 5–30 °C; not in hot windy conditions; 20 kg bags",
    ]),
    bestFor: [
      "Corrects falls (3–40 mm) on a wide range of substrates before waterproofing membranes and floor finishes",
      "Strong, durable cementitious screed",
    ],
    avoidWhere: [
      "Below 3 mm or above 40 mm in one application",
      "Application below 5 °C, above 30 °C, or in hot windy conditions",
    ],
    warnings: [
      "Observe the 3–40 mm thickness range and the temperature limits",
      "Confirm primer/bond coat and overlay against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Cemtop Screed is a strong, durable cementitious screed applied 3–40 mm to a wide variety of substrates to correct falls in concrete prior to the application of waterproofing membranes and floor finishes. Apply between 5 °C and 30 °C (not in hot windy conditions); 20 kg bags (Parchem/DuluxGroup).",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious screed", source: "fosroc.com.au Cemtop Screed" },
        { label: "Thickness", value: "3–40 mm", source: "fosroc.com.au Cemtop Screed" },
        { label: "Use", value: "Correct falls before membranes & finishes", source: "fosroc.com.au Cemtop Screed" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX Abacrete",
    shortType: "Acrylic bonding agent / liquid polymer additive (screed modifier)",
    badges: [{ label: "Acrylic modifier", tone: "navy" }],
    appInfo: kp([
      "Acrylic bonding agent / liquid polymer additive",
      "",
      "",
      "Gauge into sand:cement screeds, renders & adhesives — bond, strength, water resistance",
      "",
      "Slurry coat ~100 m² / 20 L; screed ~9 m² / 20 L",
    ]),
    bestFor: [
      "Acrylic modifier — improves shear/tensile bond, water resistance and thermal-movement tolerance of sand:cement screeds, renders and adhesives",
      "Used as a bond slurry and as a gauging additive (this is what makes a 'polymer-modified' screed)",
    ],
    avoidWhere: [
      "As a standalone screed or membrane — it is an additive / bonding agent",
    ],
    warnings: [
      "It is a polymer additive, not a screed — confirm the gauging mix and bond-slurry method against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX Abacrete is an acrylic bonding agent / liquid polymer additive that improves the shear and tensile bond strength, water resistance and thermal-movement tolerance of sand:cement screeds, renders and cement-based adhesives — used as a bond slurry and as a gauging additive to produce polymer-modified screeds. Slurry coat ~100 m²/20 L; screed ~9 m²/20 L.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Acrylic bonding agent / liquid polymer additive", source: "ardexaustralia.com Abacrete" },
        { label: "Coverage", value: "Slurry ~100 m²/20 L; screed ~9 m²/20 L", source: "ardexaustralia.com Abacrete" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 405",
    shortType: "SBR concentrated liquid polymer additive (screed modifier / bond slurry)",
    badges: [{ label: "SBR modifier", tone: "navy" }],
    appInfo: kp([
      "SBR concentrated liquid polymer additive",
      "",
      "",
      "Gauge into mortars/screeds — bond, flexibility, workability; bond slurry; temporary waterproofing with cement",
      "",
      "Reduces the water:cement ratio for stronger screeds",
    ]),
    bestFor: [
      "SBR modifier — boosts bond strength, flexibility and workability of mortars and screeds and reduces the water:cement ratio",
      "Doubles as a bond slurry and a temporary waterproofing gauge (another 'polymer-modified' screed modifier)",
    ],
    avoidWhere: [
      "As a standalone waterproof membrane or screed — it is an additive",
    ],
    warnings: [
      "It is a polymer additive, not a screed/membrane — confirm dosage and method against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 405 is an SBR, multipurpose, concentrated liquid polymer additive that improves the bond strength, flexibility and workability of mortars and screeds and reduces the water:cement ratio for stronger screeds. Also used as a preparatory bond slurry and (mixed with cement) as a temporary waterproofing — it does not create falls or independently waterproof.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "SBR concentrated liquid polymer additive", source: "ardexaustralia.com WPM 405" },
        { label: "Function", value: "Bond/strength/workability modifier; bond slurry", source: "ardexaustralia.com WPM 405" },
      ],
    },
  },
];
