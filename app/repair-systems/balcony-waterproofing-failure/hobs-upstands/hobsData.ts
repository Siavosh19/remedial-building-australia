// Balcony / rooftop HOBS & UPSTANDS. Structural kerbs that give the waterproofing
// its upstand/termination height. NOT membranes → no Class-2 membrane cert / warranty
// field. Multiple sizes per product → size/variant table lives in Advanced Technical
// Data; size range surfaced in Key properties. Unverifiable specs are marked
// "CONFIRM — <field>" (site convention), never invented numbers. This page intentionally
// keeps CONFIRM markers visible (no pruneEmptyFacts) per the build brief.
// appInfo columns drive the comparison table:
// Type · Forming method · Size range / sizes · Min height × width · Reinforcement ·
// Best use · Standard / eng. requirement · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = [
  "Type",
  "Forming method",
  "Size range / sizes",
  "Min height × width",
  "Reinforcement",
  "Best use (balcony / roof / planter)",
  "Standard / eng. requirement",
  "Notes",
];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const HOBS_CARDS: RefCard[] = [
  // 1 — FTI Group FastHob (precast, custom-made)
  {
    brand: "FTI Group",
    rangeName: "FastHob™ Precast Concrete Hob Frame",
    shortType: "Preformed precast concrete hob frame, custom-made to project measurements",
    filterTags: ["Precast concrete", "Custom sizes"],
    badges: [
      { label: "Precast concrete", tone: "navy" },
      { label: "Custom sizes", tone: "blue" },
    ],
    appInfo: kp([
      "Preformed precast concrete hob frame",
      "Factory-precast frame placed on the deck, then concrete poured — no stripping required",
      "Custom-made to exact project measurements (CONFIRM standard size range against current FTI data sheet)",
      "CONFIRM — minimum height × width against current FTI data sheet",
      "CONFIRM — reinforcement against current FTI data sheet",
      "Balcony / threshold water barriers between living and outdoor areas (apartments)",
      "Upstand height per AS 4654.2 / NCC; concrete per AS 3600 (confirm with FTI / engineer)",
      "Square & straight, no warping; minimal waste; FTI ph 1300 751 701",
    ]),
    bestFor: [
      "Factory-precast hob frame made square and straight to exact project measurements — a fast, low-waste alternative to building site formwork",
      "No stripping required: the frame stays in place and the slab / topping is poured to it",
    ],
    avoidWhere: [
      "Where verified standard dimensions are needed before procurement — sizes are custom and must be confirmed against the current FTI data sheet",
    ],
    warnings: [
      "CONFIRM the height range, width, reinforcement and concrete grade against the current FTI data sheet / engineer before specifying",
    ],
    advanced: {
      description:
        "FTI Group's FastHob™ is a preformed precast concrete hob frame, custom-made to project measurements to form the water barrier between living and outdoor areas on balconies. It installs without stripping and is made square and straight with no warping, reducing waste and labour. FTI publishes the product as custom-made and does not list standard dimensions online — confirm sizes, reinforcement and concrete grade against the current FTI data sheet (ph 1300 751 701).",
      designCriteria: "",
      techData: [
        { label: "Product", value: "FastHob™ preformed concrete hob frame", source: "FTI Group" },
        { label: "Heights", value: "CONFIRM — height range against current FTI data sheet", source: "FTI Group" },
        { label: "Widths", value: "CONFIRM — width range against current FTI data sheet", source: "FTI Group" },
        { label: "Lengths", value: "Custom — made to exact project measurements", source: "FTI Group" },
        { label: "Reinforcement", value: "CONFIRM — reinforcement against current FTI data sheet", source: "FTI Group" },
        { label: "Finish", value: "Square and straight, no warping", source: "FTI Group" },
        { label: "Installation", value: "Preformed frame placed, then concrete poured; no stripping required", source: "FTI Group" },
        { label: "Application", value: "Water barrier between living and outdoor areas (balconies / apartments)", source: "FTI Group" },
      ],
    },
  },

  // 2 — Masterform Cast-In Hob (Klipmaster), permanent steel form
  {
    brand: "Masterform",
    rangeName: "Cast-In Hob Formwork (Klipmaster)",
    shortType: "Permanent (lost) galvanised-steel hob formwork, cast monolithically with the slab",
    filterTags: ["Cast-in formwork", "Multiple sizes"],
    badges: [
      { label: "Cast-in formwork", tone: "navy" },
      { label: "Waterstop → AS 4654.2", tone: "blue" },
    ],
    appInfo: kp([
      "Permanent galvanised-steel hob formwork (lost form), cast monolithically with the slab",
      "Klipmaster legs / base plates set on the deck; slab concrete poured to form the hob in one pour",
      "Supplied 3 m long (cut to suit on site); radius / segmented to max 2.4 m; leg height customised to slab depth",
      "Leg / hob height customised to slab depth (CONFIRM min height × width against Masterform data)",
      "Monolithic with slab reinforcement, per engineer (CONFIRM)",
      "Balcony / podium hobs cast monolithically with the structural slab",
      "Waterstop Hob variant — Masterform states compliance with AS 4654.2; slab / concrete per engineer (AS 3600)",
      "G275 galv steel; variants: Cast-In, Post-Fix, Uneven, Radius/Segmented, Removable Skin, Waterstop, Precast; ends/corners/joiners available",
    ]),
    bestFor: [
      "Permanent steel formwork that casts the hob monolithically with the slab in a single pour — no separate hob pour and fewer cold joints",
      "Wide variant range (Waterstop, Uneven for falls, Radius, Post-Fix) and accessories (ends, corners, joiners, double rebates)",
    ],
    avoidWhere: [
      "Where a fully precast or in-situ masonry hob better suits the build sequence",
    ],
    warnings: [
      "CONFIRM the hob height / width, leg spacing and reinforcement against the current Masterform data and the engineer",
    ],
    advanced: {
      description:
        "Masterform's Cast-In Hob is a permanent (lost) G275 galvanised-steel formwork supported on proprietary Klipmaster legs with cast-in base plates, poured monolithically with the structural slab to form the hob in a single pour. Standard supply is 3 m long (cut to suit on site); radius / segmented hobs to a maximum 2.4 m; legs approximately 1.2–1.5 m apart with leg height customised to the slab depth (legs over ~300 mm typically need tie-wire stabilisation). Variants include Cast-In, Post-Fix, Uneven (for monolithic falls), Radius/Segmented, Removable Skin, Waterstop and Precast, with ends, corners, joiners and double rebates available. Masterform states the Waterstop Hob variant complies with AS 4654.2 — confirm against current Masterform data and the engineer.",
      designCriteria: "",
      techData: [
        { label: "Material", value: "G275 galvanised steel (permanent / lost form)", source: "Masterform" },
        { label: "Support", value: "Klipmaster hob legs with cast-in base plates; legs ~1.2–1.5 m apart, at corners", source: "Masterform" },
        { label: "Standard length", value: "3 m long — cut to suit on site", source: "Masterform" },
        { label: "Radius / segmented", value: "Max 2.4 m lengths (custom CAD profiles)", source: "Masterform" },
        { label: "Leg height", value: "Customised to slab depth; legs > ~300 mm need tie-wire stabilisation", source: "Masterform" },
        { label: "Post-Fix variant", value: "M8 × 100 mm concrete screws at each hob spacer (~500 mm crs.)", source: "Masterform" },
        { label: "Variants", value: "Cast-In · Post-Fix · Uneven (falls) · Radius/Segmented · Removable Skin · Waterstop · Precast", source: "Masterform" },
        { label: "Accessories", value: "Ends, corners, joiners, double rebates, radius double rebates", source: "Masterform" },
        { label: "Standard (Waterstop variant)", value: "Masterform states Waterstop Hob complies with AS 4654.2", source: "Masterform" },
        { label: "Lead time", value: "5–7 days post-approval", source: "Masterform" },
      ],
    },
  },

  // 3 — Site-fabricated in-situ formed concrete hob (lean)
  {
    brand: "Site-fabricated / engineer-designed",
    rangeName: "In-Situ Formed Concrete Hob",
    shortType: "Concrete hob formed in-situ on site to the engineer's drawing",
    filterTags: ["In-situ concrete", "Eng. design"],
    badges: [
      { label: "In-situ concrete", tone: "navy" },
      { label: "Eng. design", tone: "slate" },
    ],
    appInfo: kp([
      "In-situ formed concrete hob",
      "Formed on site to the engineer's drawing (timber / proprietary formwork, poured in place)",
      "Per engineer's detail",
      "Typical min 120 mm high × 150 mm wide (confirm to structural / waterproofing design)",
      "Per engineer (starter bars / dowels into the slab)",
      "Bespoke balcony / roof / planter hobs where a standard form does not suit",
      "Per engineer; upstand height per AS 4654.2 / NCC; concrete AS 3600",
      "System entry — all dimensions per the engineer's detail",
    ]),
    bestFor: [
      "Fully bespoke hob formed in-situ to the engineer's drawing — any geometry, dowelled to the slab",
    ],
    avoidWhere: [
      "Where a precast or cast-in form would be faster and more repeatable",
    ],
    warnings: [
      "Dimensions, reinforcement, dowelling and substrate prep are per the engineer's detail",
    ],
    advanced: {
      description:
        "An in-situ formed concrete hob is built on site to the engineer's drawing using timber or proprietary formwork and poured in place, with reinforcement and dowels / starter bars into the slab per the structural detail. A typical minimum upstand is around 120 mm high × 150 mm wide, but all dimensions, reinforcement and substrate preparation are per the engineer's and waterproofing design.",
      designCriteria: "",
      techData: [
        { label: "Forming", value: "Formed in-situ to the engineer's drawing; poured in place", source: "Site convention" },
        { label: "Typical min size", value: "~120 mm high × 150 mm wide (per design)", source: "Site convention" },
        { label: "Reinforcement / dowelling", value: "Per engineer (starter bars / dowels into slab)", source: "Engineer's detail" },
        { label: "Dimensions", value: "Per engineer's detail", source: "Engineer's detail" },
      ],
    },
  },

  // 4 — Composite masonry + core-filled concrete hob (lean)
  {
    brand: "Site-fabricated composite system",
    rangeName: "Masonry + Core-Filled Concrete Hob",
    shortType: "Hollow concrete block laid and core-filled with concrete to form the hob",
    filterTags: ["Masonry + core fill"],
    badges: [{ label: "Masonry + core fill", tone: "navy" }],
    appInfo: kp([
      "Composite masonry + core-filled concrete hob",
      "Hollow concrete blocks laid then core-filled with concrete (mixed & pumped, or bagged) — starter bars per engineer",
      "Per block size — e.g. 390 × 190 × 140 mm (CONFIRM block sizes used)",
      "Per block course / engineer (CONFIRM)",
      "Vertical starter bars + core fill, per engineer",
      "Roof / planter / balcony hobs and upstands built off the slab in masonry",
      "Masonry AS 3700; core-fill concrete AS 3600; upstand per AS 4654.2 (per engineer)",
      "Core fill = pumped concrete or bagged product; grout / core-fill & starter bars per engineer",
    ]),
    bestFor: [
      "Hobs / upstands built off the slab in hollow concrete block and core-filled — flexible heights by course, good for planters and roof upstands",
    ],
    avoidWhere: [
      "Where a monolithic cast-in or precast hob is preferred for a single-pour detail",
    ],
    warnings: [
      "CONFIRM block sizes, core-fill / grout spec and starter-bar requirements with the engineer",
    ],
    advanced: {
      description:
        "A composite masonry hob is built by laying hollow concrete blocks (e.g. 390 × 190 × 140 mm — confirm the block sizes used) off the slab and core-filling the cores with concrete that is either mixed and pumped or a bagged product, tied to the slab with vertical starter bars. Height is set by the block course. Block sizes, core-fill / grout specification and starter-bar requirements are per the engineer (masonry to AS 3700, core-fill concrete to AS 3600).",
      designCriteria: "",
      techData: [
        { label: "Block (typical)", value: "Hollow concrete block — e.g. 390 × 190 × 140 mm (CONFIRM sizes used)", source: "Site convention / AS 3700" },
        { label: "Other block widths", value: "190 / 140 / 110 mm available (CONFIRM with supplier)", source: "Site convention" },
        { label: "Core fill", value: "Pumped concrete or bagged product (per engineer)", source: "Engineer's detail" },
        { label: "Reinforcement", value: "Vertical starter bars into slab + core fill (per engineer)", source: "Engineer's detail" },
        { label: "Standards", value: "Masonry AS 3700; core-fill concrete AS 3600", source: "AS 3700 / AS 3600" },
      ],
    },
  },

  // 5 — Precast concrete lintel hob (roof-specific)
  {
    brand: "Precast concrete lintel",
    rangeName: "Precast Concrete Lintel Hob (roof)",
    shortType: "Standard precast concrete lintel used to form a hob / upstand on some roofs",
    filterTags: ["Precast lintel", "Roof-specific"],
    badges: [
      { label: "Precast lintel", tone: "navy" },
      { label: "Roof-specific", tone: "slate" },
    ],
    appInfo: kp([
      "Precast concrete lintel used as a hob / upstand",
      "Standard precast lintel bedded / fixed to form the upstand (subject to the roofing / structural system)",
      "Standard lintel sections — CONFIRM standard sizes / sources",
      "Per lintel section (CONFIRM standard sections)",
      "Factory-reinforced precast lintel (per manufacturer)",
      "Roof hobs / upstands where the system allows a lintel to form the kerb",
      "Per structural / waterproofing system; concrete AS 3600 (confirm)",
      "Only where the waterproofing / structural system permits a lintel hob; CONFIRM sizes / sources",
    ]),
    bestFor: [
      "Uses a standard precast concrete lintel to form a roof hob / upstand where the structural and waterproofing system allows — fast and off-the-shelf",
    ],
    avoidWhere: [
      "Balcony thresholds and planters where a purpose hob form is required",
      "Where the structural / waterproofing system does not sanction a lintel hob",
    ],
    warnings: [
      "Only where the waterproofing / structural system permits; CONFIRM standard lintel sizes and sources, and the bedding / fixing & seal detail",
    ],
    advanced: {
      description:
        "On some roofs, subject to the waterproofing and structural system, a standard precast concrete lintel can be used to form the hob / upstand. The lintel is bedded / fixed to the deck and the membrane is dressed over it. Standard lintel sections come in a range of sizes — confirm the standard sizes and sources, and that the structural / waterproofing system sanctions a lintel hob for the specific roof.",
      designCriteria: "",
      techData: [
        { label: "Form", value: "Standard precast concrete lintel forming the hob / upstand", source: "Site convention" },
        { label: "Sizes", value: "CONFIRM — standard lintel sizes / sources", source: "CONFIRM" },
        { label: "Reinforcement", value: "Factory-reinforced precast (per manufacturer)", source: "Manufacturer" },
        { label: "Use", value: "Roof hobs / upstands where the system permits", source: "Site convention" },
      ],
    },
  },
];
