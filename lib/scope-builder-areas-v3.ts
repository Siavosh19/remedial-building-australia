// Area-based data architecture for V3 scope builder wizard

export interface ConstructionTypeOption {
  id: string;
  label: string;
}

export interface DefectOption {
  id: string;
  label: string;
  probableCauses: string[];
  triggeredWorkItems: string[]; // work item IDs automatically suggested
}

export interface AreaGroup {
  id: string;
  label: string;
  description: string;
  constructionTypes: ConstructionTypeOption[];
  defects: DefectOption[];
}

export const AREA_GROUPS: AreaGroup[] = [
  // ── BALCONIES & TERRACES ──────────────────────────────────────────────────
  {
    id: "balconies",
    label: "Balconies & Terraces",
    description: "Balconies, terraces, courtyards and external floor areas",
    constructionTypes: [
      { id: "bal-ct-concrete-bare", label: "Concrete slab — exposed / bare finish" },
      { id: "bal-ct-tiled-direct", label: "Tiled — direct stick to slab or membrane" },
      { id: "bal-ct-tiled-screed", label: "Tiled — on sand/cement screed bed" },
      { id: "bal-ct-pebblecrete", label: "Pebblecrete / exposed aggregate finish" },
      { id: "bal-ct-timber", label: "Timber deck or composite deck" },
      { id: "bal-ct-epoxy", label: "Epoxy coated concrete" },
      { id: "bal-ct-pavers", label: "Pavers on pedestals or bedded" },
    ],
    defects: [
      {
        id: "bal-def-wp-failure",
        label: "Waterproofing failure / active water ingress to unit below",
        probableCauses: [
          "Failed waterproofing membrane — end of service life",
          "No waterproofing membrane installed",
          "Membrane bridging failure at wall/slab junction or door threshold",
          "Failed tile grout — water tracking through to membrane",
          "Membrane perforation at drainage outlet, penetrations or fixings",
        ],
        triggeredWorkItems: ["bal-wp-full", "bal-wp-local", "bal-tile-floor", "bal-screed-replace"],
      },
      {
        id: "bal-def-tile-delam",
        label: "Tile delamination — hollow sounding or lifting tiles",
        probableCauses: [
          "Waterproofing failure beneath tiles causing adhesive bond breakdown",
          "Failed adhesive — insufficient coverage or wrong product",
          "Screed failure beneath tile bed",
          "No expansion joints — thermal movement breaking adhesive bond",
        ],
        triggeredWorkItems: ["bal-tile-floor", "bal-tile-skirting", "bal-screed-replace", "bal-screed-retain", "bal-exp-joint"],
      },
      {
        id: "bal-def-tile-cracking",
        label: "Tile cracking",
        probableCauses: [
          "Structural movement in slab transmitted through tiles",
          "Absent or inadequate expansion joints",
          "Defective or under-fired tiles",
          "Substrate shrinkage cracks reflected through tile",
        ],
        triggeredWorkItems: ["bal-tile-floor", "bal-exp-joint"],
      },
      {
        id: "bal-def-spalling-soffit",
        label: "Concrete spalling — balcony soffit",
        probableCauses: [
          "Reinforcement corrosion — carbonation-induced (concrete pH reduction)",
          "Reinforcement corrosion — chloride-induced (coastal buildings)",
          "Insufficient concrete cover at time of construction",
          "Poor original concrete quality or compaction",
        ],
        triggeredWorkItems: ["bal-spall-soffit", "bal-anti-carbonation"],
      },
      {
        id: "bal-def-spalling-top",
        label: "Concrete spalling — slab top surface",
        probableCauses: [
          "Reinforcement corrosion from sustained moisture at slab top",
          "Delamination of shallow concrete cover",
        ],
        triggeredWorkItems: ["bal-spall-top"],
      },
      {
        id: "bal-def-spalling-spandrel",
        label: "Concrete spalling — spandrel beam",
        probableCauses: [
          "Reinforcement corrosion — carbonation or chloride-induced",
          "Exposed beam soffit to weather and moisture cycling",
        ],
        triggeredWorkItems: ["bal-spall-spandrel", "bal-anti-carbonation"],
      },
      {
        id: "bal-def-spalling-column",
        label: "Concrete spalling — column",
        probableCauses: [
          "Reinforcement corrosion at exposed column face",
          "Impact damage to column face",
        ],
        triggeredWorkItems: ["bal-spall-column"],
      },
      {
        id: "bal-def-falls",
        label: "Inadequate falls / ponding water on balcony",
        probableCauses: [
          "No designed fall gradient in original construction",
          "Screed settlement removing designed fall over time",
          "Tile overlay built up above outlet level",
          "Drainage outlet positioned too high or undersized",
        ],
        triggeredWorkItems: ["bal-falls", "bal-screed-replace", "bal-outlet-replace"],
      },
      {
        id: "bal-def-drainage",
        label: "Blocked / failed drainage outlet",
        probableCauses: [
          "Debris and leaf litter accumulation",
          "Root ingress blocking outlet pipe",
          "Deteriorated or corroded cast-in fitting",
          "Incorrect outlet type for waterproofing system",
        ],
        triggeredWorkItems: ["bal-outlet-replace"],
      },
      {
        id: "bal-def-overflow",
        label: "Missing / failed overflow provision",
        probableCauses: [
          "No overflow spitter, scupper or weir ever installed",
          "Overflow weir blocked or set at incorrect level",
          "NCC overflow requirements not met at time of construction",
        ],
        triggeredWorkItems: ["bal-spitters", "bal-penetration-plinths", "bal-perimeter-hob"],
      },
      {
        id: "bal-def-hob",
        label: "Failed / absent door threshold or hob",
        probableCauses: [
          "No hob constructed at balcony door threshold",
          "Hob height insufficient for minimum waterproofing upturn",
          "Hob cracked or damaged — waterproofing membrane compromised",
          "Door frame sitting at slab level with no viable upturn",
        ],
        triggeredWorkItems: ["bal-hob-new", "bal-hob-makegood"],
      },
      {
        id: "bal-def-balustrade",
        label: "Balustrade corrosion / structural deficiency",
        probableCauses: [
          "Steel post corrosion at core fill or base fixing plate",
          "Aluminium corrosion in coastal environment",
          "Impact damage",
          "Non-compliant height under NCC 2022 D2.16",
          "Post-fixed balustrade fixing failure into slab",
        ],
        triggeredWorkItems: ["bal-balustrade-replace", "bal-balustrade-reinstate"],
      },
      {
        id: "bal-def-sealants",
        label: "Failed perimeter or junction sealants",
        probableCauses: [
          "Age-related degradation — silicone hardening and cracking",
          "UV exposure causing embrittlement",
          "Joint movement exceeding sealant capacity",
          "Incorrect sealant product or no backing rod installed",
        ],
        triggeredWorkItems: ["fac-sealant-windows", "fac-sealant-joints"],
      },
      {
        id: "bal-def-cavity-flash",
        label: "Cavity flashing failure — adjacent brickwork at balcony level",
        probableCauses: [
          "No cavity flashing at base of outer brick leaf at balcony level",
          "Cavity flashing corroded or perforated",
          "Mortar bridging cavity and blocking weep holes",
        ],
        triggeredWorkItems: ["bal-cavity-flash"],
      },
    ],
  },

  // ── ROOF ──────────────────────────────────────────────────────────────────
  {
    id: "roof",
    label: "Roof",
    description: "Flat membrane roofs, pitched tiles, metal deck, box gutters",
    constructionTypes: [
      { id: "roof-ct-rc-membrane", label: "RC flat slab — waterproofing membrane (torch-on / liquid)" },
      { id: "roof-ct-metal-deck", label: "Metal deck — Colorbond / Zincalume" },
      { id: "roof-ct-kliplok", label: "Klip-Lok / standing seam metal roof" },
      { id: "roof-ct-terracotta-tiles", label: "Terracotta tiles" },
      { id: "roof-ct-concrete-tiles", label: "Concrete roof tiles" },
      { id: "roof-ct-fibrous-cement", label: "Fibrous cement sheeting" },
      { id: "roof-ct-box-gutter", label: "Box gutter system" },
      { id: "roof-ct-skillion", label: "Skillion / low-pitch roof" },
    ],
    defects: [
      {
        id: "roof-def-membrane-full",
        label: "Membrane failure — widespread / end of service life",
        probableCauses: [
          "Original torch-on membrane at or past 20–25 year service life",
          "UV degradation and embrittlement across full membrane area",
          "Widespread lap and seam failures",
          "Blistering from moisture trapped beneath membrane during installation",
        ],
        triggeredWorkItems: ["roof-mem-full", "roof-overflow-scupper"],
      },
      {
        id: "roof-def-membrane-local",
        label: "Membrane failure — localised",
        probableCauses: [
          "Membrane perforation at penetrations, fixings or plant equipment",
          "Lap joint separation at sheet ends",
          "Flashing separation at perimeter upstand or parapet",
          "Membrane bridging over crack in concrete substrate",
        ],
        triggeredWorkItems: ["roof-mem-local", "roof-vent-plinth"],
      },
      {
        id: "roof-def-ponding",
        label: "Ponding / inadequate falls",
        probableCauses: [
          "No designed fall gradient — flat concrete substrate",
          "Screed settlement removing designed fall",
          "Membrane overlay built up above outlet rim",
          "Insufficient number of drainage outlets for catchment area",
        ],
        triggeredWorkItems: ["roof-mem-full", "roof-overflow-scupper"],
      },
      {
        id: "roof-def-overflow",
        label: "Missing / inadequate overflow provision",
        probableCauses: [
          "No overflow scupper or weir at parapet level",
          "NCC 2022 Section 7 overflow requirements not met",
          "Overflow outlet blocked or positioned at incorrect level",
        ],
        triggeredWorkItems: ["roof-overflow-scupper"],
      },
      {
        id: "roof-def-flashing",
        label: "Failed flashing — penetrations, perimeter or parapet",
        probableCauses: [
          "Metal flashing corroded or laps separated",
          "Sealant at flashing junction failed",
          "Flashing displaced by thermal movement or wind",
          "No flashing installed at penetration — water entry direct",
        ],
        triggeredWorkItems: ["roof-colorbond-capping", "roof-flash-penetrations", "roof-flash-ridge"],
      },
      {
        id: "roof-def-box-gutter",
        label: "Box gutter failure / overflow into building",
        probableCauses: [
          "Gutter falls incorrect — ponding at low points causing overflow",
          "Box gutter capacity undersized for total roof catchment area",
          "No overflow provision — overflow entering building",
          "Box gutter joint failure or end cap failure",
          "Box gutter rusted through at low point",
        ],
        triggeredWorkItems: ["roof-gutter-replace", "roof-overflow-scupper", "roof-rwh-replace"],
      },
      {
        id: "roof-def-tiles",
        label: "Tile damage / displacement / failed ridge capping",
        probableCauses: [
          "Unrestrained ridge and hip tiles at end of mortar bedding life",
          "Impact or storm damage",
          "Failed mortar pointing at ridge and hip cappings",
          "Damaged sarking beneath tiles allowing water entry",
        ],
        triggeredWorkItems: ["roof-tile-full", "roof-tile-local", "roof-ridge-cap", "roof-sarking"],
      },
      {
        id: "roof-def-downpipes",
        label: "Downpipe / rainwater head failure",
        probableCauses: [
          "Corrosion of metal downpipes and rainwater heads",
          "PVC joint separation or UV degradation",
          "Insufficient capacity — undersized for catchment area",
          "Blockage causing overflow or surcharging",
        ],
        triggeredWorkItems: ["roof-rwh-replace", "roof-dp-replace-flat", "roof-dp-replace-pitched"],
      },
      {
        id: "roof-def-anchor",
        label: "Missing or non-compliant roof anchor points",
        probableCauses: [
          "No roof anchors installed — pre-dates WHS requirements",
          "Existing anchors not certified to AS/NZS 1891",
          "Anchor substrates compromised — membrane or substrate failure",
        ],
        triggeredWorkItems: ["roof-anchor"],
      },
    ],
  },

  // ── FACADE & EXTERNAL WALLS ───────────────────────────────────────────────
  {
    id: "facade",
    label: "Facade & External Walls",
    description: "External walls, masonry, cladding, windows and sealants",
    constructionTypes: [
      { id: "fac-ct-brick-cavity", label: "Brick cavity construction" },
      { id: "fac-ct-brick-veneer", label: "Brick veneer" },
      { id: "fac-ct-single-skin-rendered", label: "Rendered single skin masonry" },
      { id: "fac-ct-single-skin-painted", label: "Painted masonry (unrendered)" },
      { id: "fac-ct-core-filled-block", label: "Core-filled blockwork" },
      { id: "fac-ct-hollow-block", label: "Hollow blockwork (ungrouted)" },
      { id: "fac-ct-rc-wall", label: "Reinforced concrete wall (insitu)" },
      { id: "fac-ct-precast", label: "Precast concrete panels" },
      { id: "fac-ct-tilt-up", label: "Tilt-up concrete panels" },
      { id: "fac-ct-dincel", label: "Dincel / AFS permanent formwork" },
      { id: "fac-ct-fc-cladding", label: "Fibre cement cladding" },
      { id: "fac-ct-acm", label: "Aluminium composite panel (ACM / ACP)" },
      { id: "fac-ct-metal-cladding", label: "Metal cladding / profiled sheeting" },
      { id: "fac-ct-hebel-aac", label: "Hebel / autoclaved aerated concrete (AAC)" },
      { id: "fac-ct-lightweight-framed", label: "Lightweight framed (FC sheet external skin)" },
    ],
    defects: [
      {
        id: "fac-def-penetrating-damp",
        label: "Penetrating damp — water ingress through external wall",
        probableCauses: [
          "Failed or absent sealants at window and door perimeters",
          "Open or deteriorated mortar joints in masonry",
          "Cracked or delaminated external render",
          "Porous or highly absorbent masonry units",
          "Absent or failed cavity base flashing and DPC",
          "Wind-driven rain penetrating at cladding joints or laps",
        ],
        triggeredWorkItems: ["fac-repoint", "fac-render-repair", "fac-sealant-windows", "fac-sealant-joints", "fac-wp-render", "fac-cavity-flash"],
      },
      {
        id: "fac-def-efflorescence",
        label: "Efflorescence / salt deposits on facade",
        probableCauses: [
          "Moisture movement through masonry carrying soluble salts to surface",
          "Failed cavity flashing — water saturating cavity and masonry",
          "Rising damp from ground level",
          "Leaking balcony or roof drainage saturating the wall",
        ],
        triggeredWorkItems: ["fac-salt-treatment", "fac-repoint"],
      },
      {
        id: "fac-def-brick-cracking",
        label: "Brickwork cracking",
        probableCauses: [
          "Thermal and moisture movement at expansion joint locations",
          "Differential settlement",
          "Lintel deflection causing stepped cracking over opening",
          "No or inadequate expansion joints in brickwork",
          "Corrosion expansion of embedded steel lintels or arch bars",
        ],
        triggeredWorkItems: ["fac-brick-replace", "fac-repoint", "fac-archbar", "fac-sealant-joints"],
      },
      {
        id: "fac-def-render-cracking",
        label: "Render cracking",
        probableCauses: [
          "Differential movement between render and masonry substrate",
          "Render applied too thick in single coat",
          "Insufficient curing causing plastic shrinkage cracks",
          "Substrate cracking transmitted through render coat",
          "No expansion joints at required spacings",
        ],
        triggeredWorkItems: ["fac-render-repair", "fac-render-full"],
      },
      {
        id: "fac-def-render-delamination",
        label: "Render delamination / hollow sections",
        probableCauses: [
          "Poor inter-coat bond between scratch coat and finish coat",
          "Substrate contamination at time of render application",
          "Excessive render thickness in single application",
          "Moisture ingress undermining bond at substrate",
        ],
        triggeredWorkItems: ["fac-render-repair", "fac-render-full"],
      },
      {
        id: "fac-def-window-sealants",
        label: "Window perimeter sealant failure",
        probableCauses: [
          "Age-related degradation — silicone hardening and cracking",
          "UV exposure causing silicone embrittlement and loss of adhesion",
          "Movement at window frame exceeding sealant capacity",
          "Three-point bonding failure from absent backing rod",
          "Incorrect sealant product for joint configuration",
        ],
        triggeredWorkItems: ["fac-sealant-windows"],
      },
      {
        id: "fac-def-joint-sealants",
        label: "Control joint / movement joint sealant failure",
        probableCauses: [
          "Sealant at end of service life (typically 10–15 years)",
          "Joint width insufficient for movement occurring",
          "Substrate surface contamination at installation",
          "Incorrect sealant modulus — too hard for joint movement",
        ],
        triggeredWorkItems: ["fac-sealant-joints"],
      },
      {
        id: "fac-def-cladding",
        label: "Cladding failure / delamination",
        probableCauses: [
          "Fibre cement sheet debonding from substrate at fixing points",
          "ACM panel delamination from aluminium skin — fire compliance concern",
          "Sheet edge deterioration from sustained moisture ingress at joints",
          "Fixing corrosion failure releasing cladding sheets",
        ],
        triggeredWorkItems: ["fac-cladding-fc", "fac-cladding-panel"],
      },
      {
        id: "fac-def-spalling",
        label: "Concrete spalling — slab edges, beams and columns",
        probableCauses: [
          "Reinforcement corrosion — carbonation-induced",
          "Reinforcement corrosion — chloride-induced (coastal buildings)",
          "Insufficient concrete cover to reinforcement at time of construction",
        ],
        triggeredWorkItems: ["fac-spalling", "fac-anti-carbonation"],
      },
      {
        id: "fac-def-cavity-flash",
        label: "Cavity flashing absent or failed",
        probableCauses: [
          "Never installed — common pre-1990 construction",
          "Corroded metal flashing in original cavity",
          "Mortar bridging weep holes — blocking drainage from cavity",
          "DPC membrane perforated, bridged or displaced",
        ],
        triggeredWorkItems: ["fac-cavity-flash"],
      },
      {
        id: "fac-def-lintel",
        label: "Lintel / arch bar corrosion or failure",
        probableCauses: [
          "Unprotected steel lintel corroding and expanding — jack cracking above",
          "Lintel deflecting under sustained load",
          "End bearing loss from mortar deterioration",
        ],
        triggeredWorkItems: ["fac-archbar", "fac-brick-replace"],
      },
      {
        id: "fac-def-window-replace",
        label: "Failed windows — leaking frames, failed hardware",
        probableCauses: [
          "Failed or absent perimeter sealant",
          "Aluminium frame corrosion in coastal environment",
          "Failed door/window hardware — locking or drainage",
          "Non-compliant glass (safety glazing requirement)",
        ],
        triggeredWorkItems: ["fac-window-replace", "fac-sealant-windows"],
      },
    ],
  },

  // ── BASEMENT & BELOW GRADE ────────────────────────────────────────────────
  {
    id: "basement",
    label: "Basement & Below Grade",
    description: "Basement car parks, retaining walls, below-grade slabs and joints",
    constructionTypes: [
      { id: "bg-ct-rc-insitu", label: "RC insitu concrete walls and slab" },
      { id: "bg-ct-precast-wall", label: "Precast concrete wall panels" },
      { id: "bg-ct-block-wall", label: "Masonry block wall (basement)" },
      { id: "bg-ct-pt-slab", label: "Post-tensioned slab (podium / basement soffit)" },
      { id: "bg-ct-retaining", label: "Retaining walls" },
    ],
    defects: [
      {
        id: "bg-def-wall-ingress",
        label: "Water ingress through basement wall face",
        probableCauses: [
          "Failed or absent positive-side waterproofing membrane",
          "Cracks in concrete wall — structural or shrinkage",
          "Failed construction joint — absent or deteriorated waterstop",
          "Poor concrete quality — honeycombing or voids in wall",
        ],
        triggeredWorkItems: ["bg-wp-negative", "bg-crack-injection", "bg-spall-walls"],
      },
      {
        id: "bg-def-joint-ingress",
        label: "Water ingress at construction or expansion joints",
        probableCauses: [
          "Failed or absent waterstop in construction joint",
          "Waterstop displaced during concrete pour",
          "Injectable hose system not injected or blocked",
          "Differential structural movement opening joints over time",
        ],
        triggeredWorkItems: ["bg-exp-joint", "bg-crack-injection"],
      },
      {
        id: "bg-def-slab-cracks",
        label: "Water ingress at slab cracks",
        probableCauses: [
          "Structural or shrinkage cracking in basement slab",
          "Post-tensioned tendon corrosion or tendon failure",
          "Settlement cracking at column/slab intersections",
        ],
        triggeredWorkItems: ["bg-crack-injection"],
      },
      {
        id: "bg-def-hydrostatic",
        label: "Hydrostatic pressure seepage",
        probableCauses: [
          "Groundwater table above basement slab level",
          "Perched water table from nearby leaking services or drainage",
          "Failed subsoil drainage system — blocked agricultural drain",
        ],
        triggeredWorkItems: ["bg-wp-negative", "bg-drainage-channel", "bg-sump-pump"],
      },
      {
        id: "bg-def-spalling-soffit",
        label: "Concrete spalling — basement soffit",
        probableCauses: [
          "Reinforcement corrosion from sustained moisture exposure",
          "Carbonation of concrete cover in damp basement environment",
          "Chloride ingress from de-icing salts in car park",
        ],
        triggeredWorkItems: ["bg-spall-soffit"],
      },
      {
        id: "bg-def-spalling-walls",
        label: "Concrete spalling — basement walls",
        probableCauses: [
          "Reinforcement corrosion from sustained moisture at wall face",
          "Alkali-silica reaction (ASR) in older concrete",
        ],
        triggeredWorkItems: ["bg-spall-walls"],
      },
      {
        id: "bg-def-sump",
        label: "Failed sump pump or drainage system",
        probableCauses: [
          "Sump pump mechanical or electrical failure",
          "Inlet or outlet blocked by debris",
          "No sump pump installed where hydrostatic conditions require one",
        ],
        triggeredWorkItems: ["bg-sump-pump", "bg-drainage-channel"],
      },
    ],
  },

  // ── OTHER ELEMENTS ────────────────────────────────────────────────────────
  {
    id: "other",
    label: "Other Building Elements",
    description: "Planter boxes, common areas, eaves, canopies, painting",
    constructionTypes: [
      { id: "oth-ct-planter", label: "Garden / planter boxes (waterproofed)" },
      { id: "oth-ct-at-grade", label: "Common area car park / driveway (at grade)" },
      { id: "oth-ct-stairwell", label: "External stairwells / fire escape stairs" },
      { id: "oth-ct-canopy", label: "Entry canopy / portico" },
      { id: "oth-ct-eaves", label: "Eaves, fascia and gutter system" },
    ],
    defects: [
      {
        id: "oth-def-planter-wp",
        label: "Planter box waterproofing failure / water ingress below planter",
        probableCauses: [
          "Failed waterproofing membrane beneath soil and drainage layer",
          "Root ingress perforating membrane",
          "No or failed drainage layer — sustained hydrostatic load on membrane",
          "Blocked outlet — prolonged water saturation of membrane",
        ],
        triggeredWorkItems: ["planter-wp-full", "planter-wp-local", "planter-outlet", "bg-drainage-channel"],
      },
      {
        id: "oth-def-eaves",
        label: "Eaves lining failure / deterioration",
        probableCauses: [
          "Fibrous cement sheet deterioration and delamination",
          "Asbestos-containing eaves lining (pre-1988 construction)",
          "Impact damage, hole damage or loss of fixing",
        ],
        triggeredWorkItems: ["roof-eaves-replace", "site-asbestos-swms"],
      },
      {
        id: "oth-def-painting",
        label: "Paint / coating failure — general repainting required",
        probableCauses: [
          "End of coating service life — chalking, flaking, loss of adhesion",
          "Substrate cracking reflecting through coating",
          "Moisture entrapment under coating causing bubbling and peeling",
        ],
        triggeredWorkItems: ["paint-masonry", "paint-metal", "paint-eaves", "paint-slab-edges", "paint-waterblast"],
      },
      {
        id: "oth-def-drainage-ground",
        label: "Blocked or failed ground-level drainage",
        probableCauses: [
          "Drainage pits blocked by debris or root ingress",
          "Undersized stormwater system for current catchment",
          "Failed drainage connection to council drainage system",
        ],
        triggeredWorkItems: ["pl-stormwater", "pl-drainage-pit"],
      },
    ],
  },
];

// ── Helper: get all triggered work items for a set of selected defects ────────

export function getSuggestedWorkItems(selectedDefectIds: string[]): string[] {
  const suggested = new Set<string>();
  for (const area of AREA_GROUPS) {
    for (const defect of area.defects) {
      if (selectedDefectIds.includes(defect.id)) {
        defect.triggeredWorkItems.forEach((id) => suggested.add(id));
      }
    }
  }
  return Array.from(suggested);
}

// ── Access constraints ────────────────────────────────────────────────────────

export const ACCESS_CONSTRAINTS = [
  { id: "access-scaffold-full", label: "Scaffold — full face (all elevations)" },
  { id: "access-scaffold-tower", label: "Scaffold — access tower (one or two sides)" },
  { id: "access-rope", label: "Rope access" },
  { id: "access-ewp", label: "EWP / boom lift" },
  { id: "access-scissor", label: "Scissor lift (internal/level access)" },
  { id: "access-swing", label: "Swing stage / building maintenance unit" },
  { id: "access-ground", label: "Ground level / podium slab access only" },
  { id: "access-occupied", label: "Occupied building — restricted hours / resident coordination required" },
  { id: "access-traffic", label: "Traffic management plan required" },
  { id: "access-footpath", label: "Works over public footpath / council easement" },
] as const;

// ── Compliance triggers ───────────────────────────────────────────────────────

export const COMPLIANCE_TRIGGERS = [
  {
    id: "comp-dbpa",
    label: "Design and Building Practitioners Act (DBPA NSW) — regulated design required",
    note: "Applies to structural, waterproofing and facade design in Class 2, 3 & 4 buildings in NSW.",
  },
  {
    id: "comp-hbcf",
    label: "HBCF home warranty insurance required",
    note: "Required for residential work over $20,000 in NSW.",
  },
  {
    id: "comp-portal",
    label: "NSW Building Portal submission required",
    note: "Residential building work over $20,000 in Class 2 buildings requires portal documentation.",
  },
  {
    id: "comp-asbestos",
    label: "Licensed asbestos removalist required",
    note: "Class A licensed removal for friable ACM. Class B for non-friable ACM over 10 m².",
  },
  {
    id: "comp-fire",
    label: "Fire safety alteration — fire engineer assessment required",
    note: "Any alterations affecting compartmentation, exit pathways or fire systems.",
  },
  {
    id: "comp-structural",
    label: "Structural engineer design and certification required",
    note: "Required for structural concrete repairs, new balustrade fixings and significant facade works.",
  },
  {
    id: "comp-balustrade",
    label: "Balustrade compliance — NCC 2022 height and loading requirements",
    note: "All new or replacement balustrades must comply with NCC 2022 D2.16.",
  },
  {
    id: "comp-wp-cert",
    label: "Waterproofing inspection certificate required",
    note: "AS 3740 and AS/NZS 4654 require inspection hold points and licensed sign-off.",
  },
  {
    id: "comp-heritage",
    label: "Heritage approval required",
    note: "Works to heritage-listed buildings or items require development consent before proceeding.",
  },
] as const;

// ── Recommended investigations ────────────────────────────────────────────────

export const INVESTIGATIONS = [
  {
    id: "inv-carb",
    label: "Concrete carbonation depth testing",
    purpose: "Determines depth of carbonation front and proximity to reinforcement level",
  },
  {
    id: "inv-chloride",
    label: "Concrete chloride permeability / half-cell potential testing",
    purpose: "Assesses chloride-induced corrosion risk, particularly in coastal buildings",
  },
  {
    id: "inv-pulloff",
    label: "Pull-off adhesion testing",
    purpose: "Verifies adequacy of render, tile adhesive, or coating bond strength",
  },
  {
    id: "inv-moisture",
    label: "Moisture meter survey — walls and substrates",
    purpose: "Maps moisture content in masonry walls, slabs and substrates to locate ingress paths",
  },
  {
    id: "inv-structural",
    label: "Structural engineering assessment",
    purpose: "Required before specifying structural concrete repairs, balustrade replacement, or facade investigations",
  },
  {
    id: "inv-geotech",
    label: "Geotechnical investigation — groundwater level assessment",
    purpose: "Needed where basement hydrostatic pressure is suspected as the water source",
  },
  {
    id: "inv-expose",
    label: "Waterproofing expose and investigate — open substrate",
    purpose: "Physical exposure of membrane layer to determine condition and water entry path",
  },
  {
    id: "inv-telltale",
    label: "Crack monitoring — tell-tales or demec points",
    purpose: "Determines whether cracks are active or dormant before specifying repair method",
  },
  {
    id: "inv-asbestos",
    label: "Asbestos material identification report (MIR)",
    purpose: "Required before demolition or disturbance of any materials suspected to contain asbestos",
  },
  {
    id: "inv-infrared",
    label: "Infrared thermography — tile and render delamination mapping",
    purpose: "Non-destructive mapping of hollow sections over large areas — reduces need for full remove-and-replace",
  },
  {
    id: "inv-cctv",
    label: "CCTV / endoscope inspection — drainage and downpipes",
    purpose: "Remote inspection of concealed drainage lines for blockages, root ingress or joint failures",
  },
  {
    id: "inv-watertightness",
    label: "Watertightness flood testing — balconies and roofs",
    purpose: "Verifies waterproofing performance before tiling. Required by AS 3740 at 25 mm depth for 24 hours.",
  },
] as const;

export type AccessConstraintId = typeof ACCESS_CONSTRAINTS[number]["id"];
export type ComplianceTriggerId = typeof COMPLIANCE_TRIGGERS[number]["id"];
export type InvestigationId = typeof INVESTIGATIONS[number]["id"];
