export interface ChecklistSubItem {
  id: string;
  label: string;
  hasQuantity?: boolean;
  quantityLabel?: string;
  isNote?: boolean; // if true, it's a text note field, not a checkbox
}

export interface ChecklistSection {
  title: string;
  items: ChecklistSubItem[];
}

export interface WorkItemChecklist {
  workItemId: string;
  sections: ChecklistSection[];
}

// ── 1. Balcony waterproofing — full membrane replacement ──────────────────────

const BAL_WP_FULL: WorkItemChecklist = {
  workItemId: "bal-wp-full",
  sections: [
    {
      title: "Demolition",
      items: [
        { id: "bwf-dem-tiles", label: "Remove all existing floor tiles and adhesive" },
        { id: "bwf-dem-skirting", label: "Remove skirting tiles and adhesive to upturn" },
        { id: "bwf-dem-screed", label: "Remove screed to structural slab" },
        { id: "bwf-dem-membrane", label: "Remove existing membrane (if present)" },
        { id: "bwf-dem-outlet", label: "Remove existing drainage outlet" },
        { id: "bwf-dem-hob", label: "Remove door threshold / hob as required" },
        { id: "bwf-dem-balustrade", label: "Remove balustrade to facilitate works" },
        { id: "bwf-dem-debris", label: "Remove and dispose of all demolition debris" },
      ],
    },
    {
      title: "Substrate & Structural",
      items: [
        { id: "bwf-sub-clean", label: "Mechanically prepare slab surface (grinding / scarifying)" },
        { id: "bwf-sub-spall", label: "Identify and mark all concrete spalling and delamination" },
        { id: "bwf-sub-spall-repair", label: "Repair concrete spalling — refer to spalling specification" },
        { id: "bwf-sub-cracks", label: "Chase and seal all shrinkage cracks in substrate" },
        { id: "bwf-sub-falls", label: "New screed to establish minimum 1:100 falls to outlet" },
        { id: "bwf-sub-primer", label: "Apply substrate primer as per membrane manufacturer requirements" },
      ],
    },
    {
      title: "Cavity Flashings",
      items: [
        { id: "bwf-cf-inspect", label: "Inspect cavity flashing condition at wall / slab junction" },
        { id: "bwf-cf-replace", label: "Replace cavity flashing — full length of balcony perimeter" },
        { id: "bwf-cf-weephole", label: "Reinstate weep holes at 600mm maximum centres" },
        { id: "bwf-cf-sealant", label: "Seal flashing to membrane at junction" },
      ],
    },
    {
      title: "Balcony Edge Detail",
      items: [
        { id: "bwf-edge-hob", label: "Form RC perimeter hob (minimum 75mm above FFL)" },
        { id: "bwf-edge-spitter", label: "Install stainless steel spitter pipes through perimeter" },
        { id: "bwf-edge-demtech", label: "Install Demtech or equivalent drip edge angle" },
        { id: "bwf-edge-sealant", label: "Apply polyurethane sealant to slab edge / soffit junction" },
      ],
    },
    {
      title: "Membrane System",
      items: [
        { id: "bwf-mem-type", label: "Torch-on modified bitumen membrane (two-coat system)" },
        { id: "bwf-mem-liquid", label: "Liquid-applied polyurethane membrane (alternative)", },
        { id: "bwf-mem-upturn", label: "Membrane upturn — minimum 150mm above FFL at all walls" },
        { id: "bwf-mem-cove", label: "Form cove at wall / floor junction prior to membrane" },
        { id: "bwf-mem-penetrations", label: "Seal all penetrations (downpipes, fixings) with membrane collar" },
        { id: "bwf-mem-flood-test", label: "Flood test membrane — 24 hours minimum, witnessed" },
        { id: "bwf-mem-cert", label: "Obtain membrane installation certificate / warranty" },
      ],
    },
    {
      title: "Tiling",
      items: [
        { id: "bwf-tile-board", label: "Install tile separation board / protection course over membrane" },
        { id: "bwf-tile-new", label: "Lay new floor tiles — non-slip rating R11 minimum", hasQuantity: true, quantityLabel: "m²" },
        { id: "bwf-tile-skirting", label: "Lay new skirting tiles to upturn", hasQuantity: true, quantityLabel: "lm" },
        { id: "bwf-tile-grout", label: "Grout all joints — colour to match / as selected" },
        { id: "bwf-tile-exp-joint", label: "Install expansion joints at maximum 3.6m centres and all junctions" },
        { id: "bwf-tile-seal", label: "Seal all perimeter joints with matching silicone" },
      ],
    },
    {
      title: "Balcony Doors",
      items: [
        { id: "bwf-door-protect", label: "Install temporary door protection during works" },
        { id: "bwf-door-hob", label: "Construct new door hob — minimum 50mm above FFL" },
        { id: "bwf-door-threshold", label: "Make good door threshold and frame junctions" },
        { id: "bwf-door-seal", label: "Reseal door frame to hob with polyurethane sealant" },
      ],
    },
    {
      title: "Balustrade",
      items: [
        { id: "bwf-bal-reinstate", label: "Reinstate existing balustrade following works" },
        { id: "bwf-bal-new", label: "Supply and install new balustrade (separate item if required)" },
        { id: "bwf-bal-seal", label: "Seal all balustrade post bases / fixings to waterproof membrane" },
        { id: "bwf-bal-height", label: "Confirm balustrade height compliance — 1100mm minimum" },
      ],
    },
    {
      title: "Finishes & Quantities",
      items: [
        { id: "bwf-qty-balconies", label: "Number of balconies", hasQuantity: true, quantityLabel: "no." },
        { id: "bwf-qty-area", label: "Total balcony waterproofing area", hasQuantity: true, quantityLabel: "m²" },
        { id: "bwf-qty-upturn", label: "Total upturn / skirting length", hasQuantity: true, quantityLabel: "lm" },
      ],
    },
  ],
};

// ── 2. Roof membrane replacement — full ──────────────────────────────────────

const ROOF_MEM_FULL: WorkItemChecklist = {
  workItemId: "roof-mem-full",
  sections: [
    {
      title: "Preparation",
      items: [
        { id: "rmf-prep-clear", label: "Remove all loose debris, plant matter and equipment from roof" },
        { id: "rmf-prep-aerials", label: "Identify and relocate aerials / communications equipment" },
        { id: "rmf-prep-anchors", label: "Mark existing anchor points for reinstatement" },
        { id: "rmf-prep-strip", label: "Strip existing membrane to structural slab" },
        { id: "rmf-prep-screed", label: "Assess existing screed — retain or remove as required" },
        { id: "rmf-prep-clean", label: "Mechanically clean substrate to remove all contamination" },
        { id: "rmf-prep-spall", label: "Identify and repair all concrete spalling on slab surface" },
      ],
    },
    {
      title: "Structural Perimeter Hob",
      items: [
        { id: "rmf-hob-new", label: "Construct new reinforced concrete perimeter hob (150mm minimum height)" },
        { id: "rmf-hob-makegood", label: "Make good and repair existing perimeter hob" },
        { id: "rmf-hob-capping", label: "Apply capping detail to hob — Colorbond or equivalent" },
        { id: "rmf-hob-falls", label: "Check and establish roof falls — minimum 1:80 to outlets" },
      ],
    },
    {
      title: "Membrane System",
      items: [
        { id: "rmf-mem-primer", label: "Apply primer coat to prepared substrate" },
        { id: "rmf-mem-first", label: "Apply first coat membrane — torch-on SBS modified bitumen" },
        { id: "rmf-mem-second", label: "Apply second coat membrane — torch-on SBS modified bitumen (cap sheet)" },
        { id: "rmf-mem-liquid", label: "Apply liquid-applied polyurethane membrane (alternative system)" },
        { id: "rmf-mem-upturns", label: "Membrane upturns — minimum 150mm to all walls and penetrations" },
        { id: "rmf-mem-penetrations", label: "Seal all penetrations with membrane collar / sleeve" },
        { id: "rmf-mem-flood-test", label: "Flood test completed and witnessed — 24 hours" },
        { id: "rmf-mem-cert", label: "Manufacturer warranty certificate obtained" },
      ],
    },
    {
      title: "Applied Coating (if applicable)",
      items: [
        { id: "rmf-coat-acrylic", label: "Apply protective acrylic roof coating over membrane" },
        { id: "rmf-coat-reflective", label: "Apply reflective coating to reduce heat gain" },
        { id: "rmf-coat-colour", label: "Colour to architect / consultant selection" },
      ],
    },
    {
      title: "Safety Anchors",
      items: [
        { id: "rmf-anchor-new", label: "Install new engineered roof anchor points" },
        { id: "rmf-anchor-reinstate", label: "Reinstate existing anchor points through new membrane" },
        { id: "rmf-anchor-cert", label: "Anchor point certification by engineer" },
        { id: "rmf-anchor-seal", label: "Seal anchor bases to membrane — warranted detail" },
      ],
    },
    {
      title: "Perimeter Encapsulation",
      items: [
        { id: "rmf-enc-formboard", label: "Encapsulate perimeter form board — if asbestos containing" },
        { id: "rmf-enc-cemintel", label: "Install Cemintel cladding to slab edge wrap" },
        { id: "rmf-enc-colorbond", label: "Install Colorbond capping to perimeter" },
        { id: "rmf-enc-sealant", label: "Seal all joints in perimeter encapsulation" },
      ],
    },
    {
      title: "Drainage",
      items: [
        { id: "rmf-drain-outlet", label: "Replace drainage outlets — new two-part flanged outlets" },
        { id: "rmf-drain-scupper", label: "Install overflow scuppers at perimeter hob" },
        { id: "rmf-drain-rwh", label: "Replace rainwater heads" },
        { id: "rmf-drain-dp", label: "Replace downpipes as required" },
      ],
    },
    {
      title: "Masonry Walls (plant room / parapet)",
      items: [
        { id: "rmf-wall-repoint", label: "Repoint brickwork to parapet / plant room walls" },
        { id: "rmf-wall-render", label: "Render repair to parapet walls" },
        { id: "rmf-wall-cap", label: "Replace parapet capping / flashing" },
        { id: "rmf-wall-paint", label: "Paint parapet walls — two coats acrylic" },
      ],
    },
    {
      title: "Entry Portico / Access Hatch",
      items: [
        { id: "rmf-hatch-seal", label: "Reseal roof access hatch frame to membrane" },
        { id: "rmf-hatch-replace", label: "Replace roof access hatch" },
        { id: "rmf-portico-wp", label: "Waterproof entry portico roof" },
      ],
    },
    {
      title: "Quantities",
      items: [
        { id: "rmf-qty-area", label: "Total roof membrane area", hasQuantity: true, quantityLabel: "m²" },
        { id: "rmf-qty-upturns", label: "Total upturn length", hasQuantity: true, quantityLabel: "lm" },
        { id: "rmf-qty-anchors", label: "Number of anchor points", hasQuantity: true, quantityLabel: "no." },
        { id: "rmf-qty-outlets", label: "Number of drainage outlets", hasQuantity: true, quantityLabel: "no." },
      ],
    },
  ],
};

// ── 3. Concrete spalling repair (shared template) ────────────────────────────

const SPALLING_REPAIR: WorkItemChecklist = {
  workItemId: "spalling-shared",
  sections: [
    {
      title: "Preparation — Standard",
      items: [
        { id: "sp-prep-identify", label: "Identify all areas of spalling, delamination and cracking by sounding" },
        { id: "sp-prep-saw", label: "Saw cut perimeter of repair area to minimum 10mm depth" },
        { id: "sp-prep-break", label: "Break out delaminated concrete to sound substrate" },
        { id: "sp-prep-expose", label: "Expose corroded reinforcement — minimum 25mm clearance behind bar" },
        { id: "sp-prep-clean-steel", label: "Clean reinforcement steel to Sa 2.5 standard (abrasive blast or mechanical)" },
        { id: "sp-prep-profile", label: "Prepare substrate to minimum CSP 5 profile" },
        { id: "sp-prep-dust", label: "Remove all dust and debris from repair cavity" },
      ],
    },
    {
      title: "Priming",
      items: [
        { id: "sp-prime-steel", label: "Apply steel reinforcement primer (zinc rich / two-part epoxy)" },
        { id: "sp-prime-substrate", label: "Apply bonding primer to concrete substrate" },
        { id: "sp-prime-wait", label: "Allow primer to become tacky before applying mortar" },
      ],
    },
    {
      title: "Repair Mortar",
      items: [
        { id: "sp-mortar-cem", label: "Apply cementitious repair mortar (polymer modified, chloride free)" },
        { id: "sp-mortar-epoxy", label: "Apply epoxy repair mortar (for thin section or structural repair)" },
        { id: "sp-mortar-layers", label: "Apply in layers not exceeding 25mm — cure between lifts" },
        { id: "sp-mortar-form", label: "Form and finish mortar flush with original profile" },
        { id: "sp-mortar-cure", label: "Moist cure for minimum 7 days" },
      ],
    },
    {
      title: "Rendering (if applicable)",
      items: [
        { id: "sp-render-skim", label: "Apply skim coat render to blend with surrounding surface" },
        { id: "sp-render-texture", label: "Match existing texture / finish" },
        { id: "sp-render-prime", label: "Prime render prior to painting" },
      ],
    },
    {
      title: "Measurement",
      items: [
        { id: "sp-qty-area", label: "Total repair area", hasQuantity: true, quantityLabel: "m²" },
        { id: "sp-qty-depth", label: "Typical repair depth", hasQuantity: true, quantityLabel: "mm" },
        { id: "sp-qty-locations", label: "Number of discrete repair locations", hasQuantity: true, quantityLabel: "no." },
      ],
    },
    {
      title: "Locations",
      items: [
        { id: "sp-loc-note", label: "Location description / notes", isNote: true },
      ],
    },
  ],
};

// ── 4. Cavity flashing replacement ───────────────────────────────────────────

const CAVITY_FLASH: WorkItemChecklist = {
  workItemId: "cavity-flash-shared",
  sections: [
    {
      title: "Preparation",
      items: [
        { id: "cf-prep-remove-tiles", label: "Remove wall tiles / render adjacent to flashing" },
        { id: "cf-prep-remove-brick", label: "Remove brick course above flashing level" },
        { id: "cf-prep-clean", label: "Clean cavity of mortar droppings and debris" },
        { id: "cf-prep-identify", label: "Identify extent of failed / missing flashing" },
      ],
    },
    {
      title: "New Cavity Flashing",
      items: [
        { id: "cf-new-dpc", label: "Install new cavity flashing — minimum 2 layer DPC or stainless steel" },
        { id: "cf-new-slope", label: "Flash sloped to drain water to external face" },
        { id: "cf-new-endcaps", label: "Install end caps to all flashing sections" },
        { id: "cf-new-extend", label: "Extend flashing minimum 25mm beyond external face" },
        { id: "cf-new-weepholes", label: "Form weep holes at maximum 600mm centres" },
        { id: "cf-new-seal", label: "Seal flashing to membrane / waterproofing at wall junction" },
      ],
    },
    {
      title: "Reinstatement",
      items: [
        { id: "cf-re-brick", label: "Relay brickwork — cut bricks to match coursing" },
        { id: "cf-re-repoint", label: "Repoint all new brickwork joints" },
        { id: "cf-re-render", label: "Reinstate render where removed" },
        { id: "cf-re-paint", label: "Paint reinstated area to match existing" },
        { id: "cf-re-tiles", label: "Reinstate wall tiles where removed" },
      ],
    },
    {
      title: "Quantities",
      items: [
        { id: "cf-qty-length", label: "Total flashing length", hasQuantity: true, quantityLabel: "lm" },
        { id: "cf-qty-locations", label: "Number of locations", hasQuantity: true, quantityLabel: "no." },
      ],
    },
  ],
};

// ── 5. Arch bar / lintel replacement ────────────────────────────────────────

const ARCHBAR: WorkItemChecklist = {
  workItemId: "fac-archbar",
  sections: [
    {
      title: "Preparation & Propping",
      items: [
        { id: "ab-prep-prop", label: "Install temporary propping to brickwork above opening" },
        { id: "ab-prep-check", label: "Check and document existing opening dimensions" },
        { id: "ab-prep-remove-brick", label: "Remove brickwork as required to access lintel" },
        { id: "ab-prep-remove-lintel", label: "Remove existing corroded arch bar / lintel" },
        { id: "ab-prep-clean", label: "Clean opening — remove rust staining and mortar debris" },
      ],
    },
    {
      title: "New Lintel",
      items: [
        { id: "ab-new-galv", label: "Supply and install new hot-dip galvanised steel arch bar" },
        { id: "ab-new-ss", label: "Supply and install new stainless steel arch bar (coastal / high corrosion)" },
        { id: "ab-new-rc", label: "Supply and install new reinforced concrete lintel" },
        { id: "ab-new-size", label: "Lintel size / specification", hasQuantity: true, quantityLabel: "mm" },
        { id: "ab-new-bearing", label: "Minimum 150mm bearing each end" },
        { id: "ab-new-dpc", label: "Install DPC over new lintel" },
        { id: "ab-new-weepholes", label: "Form weep holes above new lintel at 600mm centres" },
      ],
    },
    {
      title: "Reinstatement",
      items: [
        { id: "ab-re-brick", label: "Relay brickwork over new lintel — toothed into existing" },
        { id: "ab-re-repoint", label: "Repoint all new brickwork joints" },
        { id: "ab-re-prop-remove", label: "Remove temporary propping after mortar cure" },
        { id: "ab-re-render", label: "Make good render / finish" },
        { id: "ab-re-paint", label: "Paint to match existing" },
      ],
    },
    {
      title: "Quantities",
      items: [
        { id: "ab-qty-no", label: "Number of arch bars / lintels", hasQuantity: true, quantityLabel: "no." },
        { id: "ab-qty-length", label: "Total lintel length", hasQuantity: true, quantityLabel: "lm" },
      ],
    },
  ],
};

// ── 6. Painting — external surfaces ─────────────────────────────────────────

const PAINTING: WorkItemChecklist = {
  workItemId: "painting-shared",
  sections: [
    {
      title: "Preparation",
      items: [
        { id: "paint-prep-clean", label: "High-pressure water blast all surfaces (minimum 3000 PSI)" },
        { id: "paint-prep-efflor", label: "Remove all efflorescence and salt deposits" },
        { id: "paint-prep-chalk", label: "Remove all chalking and loose paint by wire brush / scraper" },
        { id: "paint-prep-cracks", label: "Fill all cracks and holes — exterior filler / patching compound" },
        { id: "paint-prep-sealant", label: "Replace failed perimeter sealant before painting" },
        { id: "paint-prep-mask", label: "Mask all windows, glazing, hardware and adjacent surfaces" },
        { id: "paint-prep-sand", label: "Sand all previously painted metal surfaces" },
        { id: "paint-prep-rust", label: "Remove rust from metal — abrasive blast to Sa 2 minimum" },
      ],
    },
    {
      title: "Surfaces to Paint",
      items: [
        { id: "paint-surf-masonry", label: "External masonry walls", hasQuantity: true, quantityLabel: "m²" },
        { id: "paint-surf-slab-edge", label: "Slab edges and exposed beams", hasQuantity: true, quantityLabel: "m²" },
        { id: "paint-surf-bal-soffit", label: "Balcony soffits", hasQuantity: true, quantityLabel: "m²" },
        { id: "paint-surf-eaves", label: "Eaves lining", hasQuantity: true, quantityLabel: "m²" },
        { id: "paint-surf-fascia", label: "Fascias", hasQuantity: true, quantityLabel: "lm" },
        { id: "paint-surf-dp", label: "Downpipes (PVC)", hasQuantity: true, quantityLabel: "lm" },
        { id: "paint-surf-doors", label: "External doors and frames", hasQuantity: true, quantityLabel: "no." },
        { id: "paint-surf-metal", label: "Metal surfaces (previously painted)", hasQuantity: true, quantityLabel: "m²" },
        { id: "paint-surf-timber", label: "Timber surfaces", hasQuantity: true, quantityLabel: "m²" },
      ],
    },
    {
      title: "Paint Systems",
      items: [
        { id: "paint-sys-primer", label: "Apply alkali-resistant primer to all masonry surfaces" },
        { id: "paint-sys-undercoat", label: "Apply acrylic undercoat / sealer" },
        { id: "paint-sys-two-coat", label: "Apply two coats exterior acrylic — masonry" },
        { id: "paint-sys-three-coat", label: "Apply three-coat system — primer / undercoat / topcoat" },
        { id: "paint-sys-elastomeric", label: "Apply elastomeric coating — bridging fine cracks" },
        { id: "paint-sys-enamel", label: "Apply enamel finish to metal / timber" },
        { id: "paint-sys-rust-inhibit", label: "Apply rust inhibiting primer to all metal surfaces" },
        { id: "paint-sys-anti-carb", label: "Apply anti-carbonation coating (specialist product)" },
      ],
    },
    {
      title: "Colour Selection",
      items: [
        { id: "paint-col-match", label: "Match existing colours throughout" },
        { id: "paint-col-new", label: "New colour scheme — as per consultant / client selection" },
        { id: "paint-col-sample", label: "Provide painted sample panels for approval before full application" },
      ],
    },
  ],
};

// ── Mapping: work item ID → checklist ────────────────────────────────────────

const CHECKLISTS: WorkItemChecklist[] = [
  BAL_WP_FULL,
  ROOF_MEM_FULL,
  SPALLING_REPAIR,
  CAVITY_FLASH,
  ARCHBAR,
  PAINTING,
];

// IDs that map to the shared spalling template
const SPALLING_IDS = new Set([
  "bal-spall-soffit",
  "bal-spall-top",
  "bal-spall-spandrel",
  "bal-spall-column",
  "bg-spall-soffit",
  "bg-spall-walls",
  "fac-spalling",
]);

// IDs that map to the shared cavity flashing template
const CAVITY_FLASH_IDS = new Set([
  "bal-cavity-flash",
  "fac-cavity-flash",
]);

// IDs that map to the shared painting template
const PAINTING_IDS = new Set([
  "paint-masonry",
  "paint-metal",
  "paint-timber",
  "paint-eaves",
  "paint-slab-edges",
  "paint-bal-soffit",
  "paint-fascia",
  "paint-dp-pvc",
  "paint-doors",
  "paint-slab-edge-wp",
  "paint-waterblast",
]);

export function getChecklist(workItemId: string): WorkItemChecklist | null {
  if (workItemId === "bal-wp-full") return BAL_WP_FULL;
  if (workItemId === "roof-mem-full") return ROOF_MEM_FULL;
  if (workItemId === "fac-archbar") return ARCHBAR;
  if (SPALLING_IDS.has(workItemId)) return SPALLING_REPAIR;
  if (CAVITY_FLASH_IDS.has(workItemId)) return CAVITY_FLASH;
  if (PAINTING_IDS.has(workItemId)) return PAINTING;
  return null;
}

export { CHECKLISTS };
