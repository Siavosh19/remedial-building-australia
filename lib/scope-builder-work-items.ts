export interface ConstructionTypeItem {
  id: string;
  label: string;
}

export interface ConstructionTypeGroup {
  id: string;
  label: string;
  items: ConstructionTypeItem[];
}

export const CONSTRUCTION_TYPE_GROUPS: ConstructionTypeGroup[] = [
  {
    id: "walls",
    label: "Walls & Facade",
    items: [
      { id: "brick-cavity", label: "Brick cavity construction" },
      { id: "brick-veneer", label: "Brick veneer" },
      { id: "rendered-masonry", label: "Rendered masonry (single skin)" },
      { id: "concrete-panel", label: "Concrete panel / precast" },
      { id: "aluminium-cladding", label: "Aluminium cladding / composite panel" },
      { id: "fibre-cement", label: "Fibre cement / Cemintel cladding" },
      { id: "painted-masonry", label: "Painted masonry / render" },
    ],
  },
  {
    id: "balconies",
    label: "Balconies & Terraces",
    items: [
      { id: "tiled-balconies", label: "Tiled balconies (direct stick)" },
      { id: "tiled-terraces", label: "Tiled terraces (on screed)" },
      { id: "pebblecrete-balconies", label: "Pebblecrete balconies" },
      { id: "timber-deck", label: "Timber deck balconies" },
      { id: "concrete-balconies", label: "Concrete balconies (no finish)" },
      { id: "glazed-balustrade", label: "Balconies with glazed balustrade" },
      { id: "steel-balustrade", label: "Balconies with steel / aluminium balustrade" },
      { id: "brick-parapet", label: "Balconies with brick parapet" },
    ],
  },
  {
    id: "roofs",
    label: "Roofs",
    items: [
      { id: "concrete-flat-membrane", label: "Concrete flat roof (membrane)" },
      { id: "concrete-flat-tiled", label: "Concrete flat roof (tiled)" },
      { id: "metal-deck", label: "Metal deck roof (Colorbond / Zincalume)" },
      { id: "terracotta-tiles", label: "Terracotta or concrete tiles" },
      { id: "fibre-cement-roof", label: "Fibrous cement roof sheeting" },
      { id: "skillion-roof", label: "Skillion / low-pitch roof" },
    ],
  },
  {
    id: "below-grade",
    label: "Below Grade / Basement",
    items: [
      { id: "basement-carpark", label: "Basement car park (below grade)" },
      { id: "podium-slab", label: "Podium slab (above grade car park)" },
      { id: "retaining-walls", label: "Retaining walls" },
    ],
  },
  {
    id: "other",
    label: "Other Elements",
    items: [
      { id: "eaves-lining", label: "Eaves lining (fibre cement)" },
      { id: "fascia-gutter", label: "Fascia and gutter system" },
      { id: "external-windows", label: "External windows and glazing" },
      { id: "entry-canopy", label: "Entry canopy / portico" },
      { id: "planter-boxes", label: "Garden / planter boxes (waterproofed)" },
      { id: "carpark-at-grade", label: "Common area car park (at grade)" },
    ],
  },
];

export interface WorkItem {
  id: string;
  label: string;
  group: string;
  triggerGroups: string[]; // construction type GROUP ids that trigger this
}

export interface WorkItemGroup {
  id: string;
  label: string;
  triggerGroups: string[];
  items: WorkItem[];
}

export const WORK_ITEM_GROUPS: WorkItemGroup[] = [
  {
    id: "balcony-terrace",
    label: "Balcony & Terrace Works",
    triggerGroups: ["balconies"],
    items: [
      { id: "bal-wp-full", label: "Balcony waterproofing — full membrane replacement", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-wp-local", label: "Balcony waterproofing — localised repair", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-tile-floor", label: "Tile removal and replacement (balcony floor)", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-tile-skirting", label: "Tile removal and replacement (skirting / upturn)", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-screed-replace", label: "Screed removal and replacement", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-screed-retain", label: "Screed retention and preparation (existing falls)", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-falls", label: "Grading — new falls to outlet", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-spall-soffit", label: "Concrete spalling repair — balcony slab soffit", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-spall-top", label: "Concrete spalling repair — balcony slab top surface", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-spall-spandrel", label: "Concrete spalling repair — spandrel beam", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-spall-column", label: "Concrete spalling repair — column", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-cavity-flash", label: "Cavity flashing replacement — adjacent brickwork", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-door-replace", label: "Balcony door replacement", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-hob-new", label: "Door hob construction — new RC hob", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-hob-makegood", label: "Door hob — make good existing", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-balustrade-replace", label: "Balustrade removal and replacement (full)", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-balustrade-reinstate", label: "Balustrade removal and reinstatement", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-privacy-screen", label: "Privacy screen installation", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-parapet-replace", label: "Brick parapet removal and replacement", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-divwall-replace", label: "Brick dividing wall removal and replacement", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-perimeter-hob", label: "Concrete perimeter hob — new", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-spitters", label: "Stainless steel spitter pipes", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-demtech", label: "Demtech drip edge installation", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-exp-joint", label: "Expansion joint installation", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-penetration-plinths", label: "Penetration plinths (downpipes)", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-outlet-replace", label: "Drainage outlet replacement", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-door-protect", label: "Temporary door protection during works", group: "balcony-terrace", triggerGroups: ["balconies"] },
      { id: "bal-anti-carbonation", label: "Anti-carbonation coating — balcony soffit and spandrel", group: "balcony-terrace", triggerGroups: ["balconies"] },
    ],
  },
  {
    id: "roof-flat",
    label: "Roof Works (Flat / Membrane)",
    triggerGroups: ["roofs"],
    items: [
      { id: "roof-mem-full", label: "Roof membrane replacement — full", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-mem-overlay", label: "Roof membrane replacement — over existing (torch-on overlay)", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-mem-local", label: "Roof membrane — localised repair", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-perimeter-hob", label: "Perimeter hob construction", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-overflow-scupper", label: "Overflow scupper installation", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-anchor", label: "Roof anchor point installation", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-vent-plinth", label: "Vent pipe plinth construction", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-aerial", label: "Aerial relocation", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-coating", label: "Roof coating application", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-asbestos-enc", label: "Asbestos encapsulation — perimeter form board", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-cemintel", label: "Cemintel cladding — slab edge wrap", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-colorbond-capping", label: "Colorbond capping — perimeter", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-rwh-replace", label: "Rainwater head replacement", group: "roof-flat", triggerGroups: ["roofs"] },
      { id: "roof-dp-replace-flat", label: "Downpipe replacement", group: "roof-flat", triggerGroups: ["roofs"] },
    ],
  },
  {
    id: "roof-pitched",
    label: "Roof Works (Pitched / Tiled)",
    triggerGroups: ["roofs"],
    items: [
      { id: "roof-tile-full", label: "Roof tile replacement — full", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-tile-local", label: "Roof tile replacement — localised", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-ridge-cap", label: "Ridge capping replacement", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-sarking", label: "Sarking replacement", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-valley", label: "Valley replacement", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-flash-ridge", label: "Flashing replacement — ridge / hip", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-flash-penetrations", label: "Flashing replacement — penetrations", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-gutter-replace", label: "Gutter replacement", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-fascia-replace", label: "Fascia replacement", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-dp-replace-pitched", label: "Downpipe replacement", group: "roof-pitched", triggerGroups: ["roofs"] },
      { id: "roof-eaves-replace", label: "Eaves lining replacement", group: "roof-pitched", triggerGroups: ["roofs"] },
    ],
  },
  {
    id: "facade-masonry",
    label: "Facade & Masonry Works",
    triggerGroups: ["walls"],
    items: [
      { id: "fac-repoint", label: "Repointing — brickwork mortar joints", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-brick-replace", label: "Brick replacement — localised", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-archbar", label: "Arch bar / lintel replacement", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-cavity-flash", label: "Cavity flashing installation — new", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-render-repair", label: "Render repair — localised", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-render-full", label: "Render removal and replacement — full", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-wp-render", label: "Waterproof render / coating — single skin masonry", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-sealant-joints", label: "Sealant replacement — facade joints", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-sealant-windows", label: "Sealant replacement — window perimeters", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-window-replace", label: "Window replacement", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-cladding-fc", label: "External cladding replacement — fibre cement", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-cladding-panel", label: "External cladding replacement — composite panel", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-spalling", label: "Spalling repair — concrete columns / beams / slab edges", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-anti-carbonation", label: "Anti-carbonation coating", group: "facade-masonry", triggerGroups: ["walls"] },
      { id: "fac-salt-treatment", label: "Salt removal and treatment", group: "facade-masonry", triggerGroups: ["walls"] },
    ],
  },
  {
    id: "painting",
    label: "Painting & Coatings",
    triggerGroups: ["walls", "other"],
    items: [
      { id: "paint-masonry", label: "Painting — external acrylic masonry surfaces", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-metal", label: "Painting — metal surfaces (previously painted)", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-timber", label: "Painting — timber surfaces", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-eaves", label: "Painting — eaves lining", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-slab-edges", label: "Painting — slab edges and beams", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-bal-soffit", label: "Painting — balcony soffits", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-fascia", label: "Painting — fascias", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-dp-pvc", label: "Painting — downpipes (PVC)", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-doors", label: "Painting — external doors and frames", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-slab-edge-wp", label: "Protective coating — slab edges (waterproof membrane)", group: "painting", triggerGroups: ["walls", "other"] },
      { id: "paint-waterblast", label: "Water blasting — preparation only", group: "painting", triggerGroups: ["walls", "other"] },
    ],
  },
  {
    id: "below-grade",
    label: "Below Grade / Basement",
    triggerGroups: ["below-grade"],
    items: [
      { id: "bg-wp-negative", label: "Basement waterproofing — negative side injection", group: "below-grade", triggerGroups: ["below-grade"] },
      { id: "bg-wp-positive", label: "Basement waterproofing — positive side membrane", group: "below-grade", triggerGroups: ["below-grade"] },
      { id: "bg-crack-injection", label: "Crack injection — basement walls", group: "below-grade", triggerGroups: ["below-grade"] },
      { id: "bg-drainage-channel", label: "Drainage channel installation", group: "below-grade", triggerGroups: ["below-grade"] },
      { id: "bg-sump-pump", label: "Sump pump installation or replacement", group: "below-grade", triggerGroups: ["below-grade"] },
      { id: "bg-exp-joint", label: "Expansion joint replacement — basement", group: "below-grade", triggerGroups: ["below-grade"] },
      { id: "bg-spall-soffit", label: "Concrete spalling — basement soffit", group: "below-grade", triggerGroups: ["below-grade"] },
      { id: "bg-spall-walls", label: "Concrete spalling — basement walls", group: "below-grade", triggerGroups: ["below-grade"] },
      { id: "bg-coating-floor", label: "Protective coating — basement floor", group: "below-grade", triggerGroups: ["below-grade"] },
    ],
  },
  {
    id: "plumbing-drainage",
    label: "Plumbing & Drainage",
    triggerGroups: ["roofs", "balconies"],
    items: [
      { id: "pl-dp-full", label: "Downpipe replacement — full", group: "plumbing-drainage", triggerGroups: ["roofs", "balconies"] },
      { id: "pl-dp-local", label: "Downpipe replacement — localised", group: "plumbing-drainage", triggerGroups: ["roofs", "balconies"] },
      { id: "pl-gutter-full", label: "Gutter replacement — full", group: "plumbing-drainage", triggerGroups: ["roofs", "balconies"] },
      { id: "pl-stormwater", label: "Stormwater connection", group: "plumbing-drainage", triggerGroups: ["roofs", "balconies"] },
      { id: "pl-fire-collar", label: "Fire collar installation", group: "plumbing-drainage", triggerGroups: ["roofs", "balconies"] },
      { id: "pl-drainage-pit", label: "Drainage pit cleaning / replacement", group: "plumbing-drainage", triggerGroups: ["roofs", "balconies"] },
      { id: "pl-sewer-makegood", label: "Sewer connection make-good", group: "plumbing-drainage", triggerGroups: ["roofs", "balconies"] },
    ],
  },
  {
    id: "other-structures",
    label: "Other Structures",
    triggerGroups: ["other"],
    items: [
      { id: "planter-wp-full", label: "Planter box waterproofing — full membrane replacement", group: "other-structures", triggerGroups: ["other"] },
      { id: "planter-wp-local", label: "Planter box waterproofing — localised repair", group: "other-structures", triggerGroups: ["other"] },
      { id: "planter-outlet", label: "Planter box drainage outlet replacement", group: "other-structures", triggerGroups: ["other"] },
      { id: "planter-lining", label: "Planter box waterproof liner installation", group: "other-structures", triggerGroups: ["other"] },
    ],
  },
  {
    id: "site-prelims",
    label: "Site & Preliminaries",
    triggerGroups: ["*"], // always show
    items: [
      { id: "site-scaffold-full", label: "Scaffold — full face", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-scaffold-tower", label: "Scaffold — access tower (one or two sides)", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-rope-access", label: "Rope access", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-ewp", label: "EWP / scissor lift access", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-hoarding", label: "Hoarding and barricading", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-dilapidation", label: "Dilapidation report", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-traffic", label: "Traffic management", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-asbestos-swms", label: "Asbestos management plan / SWMS", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-regulated-design", label: "Regulated design (Design and Building Practitioners Act)", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-demolition", label: "Demolition and debris removal", group: "site-prelims", triggerGroups: ["*"] },
      { id: "site-establishment", label: "Site establishment and demobilisation", group: "site-prelims", triggerGroups: ["*"] },
    ],
  },
];

// Helper: get all work item groups visible for a given set of selected construction types
export function getVisibleWorkItemGroups(selectedConstructionTypes: string[]): WorkItemGroup[] {
  const selectedGroups = new Set<string>();
  for (const ctg of CONSTRUCTION_TYPE_GROUPS) {
    if (ctg.items.some((item) => selectedConstructionTypes.includes(item.id))) {
      selectedGroups.add(ctg.id);
    }
  }

  return WORK_ITEM_GROUPS.filter((wg) => {
    if (wg.triggerGroups.includes("*")) return true;
    return wg.triggerGroups.some((tg) => selectedGroups.has(tg));
  });
}

export const PRELIMINARY_CLAUSES: { id: string; label: string }[] = [
  { id: "prelim-site-establishment", label: "Site establishment and access" },
  { id: "prelim-protection", label: "Protection of property" },
  { id: "prelim-dilapidation", label: "Dilapidation report requirement" },
  { id: "prelim-scaffold", label: "Scaffolding and access equipment" },
  { id: "prelim-insurance", label: "Insurance requirements" },
  { id: "prelim-licence", label: "Builder's licence requirements" },
  { id: "prelim-hbcf", label: "HBCF insurance" },
  { id: "prelim-deposit", label: "Deposit and progress payment terms (5% deposit, 90/10 retention)" },
  { id: "prelim-pc", label: "Practical completion and retention release (13 weeks)" },
  { id: "prelim-variations", label: "Variations — written approval required" },
  { id: "prelim-whs", label: "WHS requirements" },
  { id: "prelim-dbp", label: "Design and Building Practitioners Act compliance" },
  { id: "prelim-portal", label: "NSW Building Portal submission" },
  { id: "prelim-ncc", label: "NCC / Australian Standards compliance" },
  { id: "prelim-fixed-price", label: "Fixed price / no rise-fall condition" },
  { id: "prelim-tender-validity", label: "Tender validity period" },
];
