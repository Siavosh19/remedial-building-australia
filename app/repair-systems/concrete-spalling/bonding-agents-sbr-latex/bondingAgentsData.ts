// ──────────────────────────────────────────────────────────────────────────────
// Bonding Agents & SBR Latex — hand-authored selection cards (concrete spalling).
// Schema-first per the agreed category field set. Values from the CURRENT
// AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated on the cited AU source.
// Shelf life and pot life dropped as shared columns (pot life only on the epoxy).
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Chemistry", "Role", "Water resistance", "Wet-on-wet window", "Structural bond", "Exterior / wet", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const BONDING_AGENT_CARDS: RefCard[] = [
  {
    brand: "Sika Australia (Davco / Lanko)",
    rangeName: "Lanko 751 Lankolatex SBR",
    shortType: "SBR latex bonding agent + mortar admixture",
    badges: [],
    appInfo: kp(["SBR latex", "Bond coat + admixture", "Water-resistant", "Apply mortar while tacky", "N/A — non-structural", "Suitable (water-resistant)", "CONFIRM (Sika/Davco AU TDS)"]),
    bestFor: [
      "Bonds and gauges in one — neat 1:1 with cement makes a brush slurry bond coat",
      "Improves adhesion, flexibility, water-resistance and strength of mortars, screeds and renders",
    ],
    avoidWhere: [
      "Not a structural bond bridge — for high-strength old-to-new bonding use an epoxy (Nitobond EP)",
      "Do not let the slurry bond coat dry before placing the mortar",
    ],
    warnings: [
      "Non-structural — confirm the duty is within an SBR latex's capability",
      "Confirm dilution / dosage and pack size against the current Sika (Davco/Lanko) AU TDS",
    ],
    advanced: {
      description:
        "Lanko 751 Lankolatex SBR is a flexible SBR latex additive (Sika/Davco) for Lanko, Davco and general mortar systems — improving adhesion, compressive strength, water-resistance and flexibility. As a bonding agent it is mixed 1:1 with Portland cement as a brush slurry bond coat; it is also a mortar/screed admixture. CONFIRM dosage and pack size against the current Sika AU TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "SBR latex", source: "aus.sika.com TDS (Lanko 751)" },
        { label: "Role", value: "Bonding agent (1:1 cement slurry) + mortar admixture", source: "aus.sika.com TDS" },
        { label: "Water resistance", value: "Water-resistant", source: "aus.sika.com TDS" },
        { label: "Structural bond", value: "N/A — non-structural", source: "aus.sika.com TDS" },
        { label: "Bonding mix", value: "1 part Lanko 751 : 1 part Portland cement (slurry)", source: "aus.sika.com TDS" },
        { label: "Application", value: "Brush slurry coat; or admix", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "CONFIRM (Sika/Davco AU TDS)", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex WPM 405 (Sheltercrete Additive)",
    shortType: "Multipurpose SBR polymer additive — bond bridge, slurry coat, admix",
    badges: [],
    appInfo: kp(["SBR latex", "Bond bridge + slurry + admixture", "Water-resistant", "Apply mortar while tacky", "N/A — non-structural", "Suitable (water-resistant)", "20 L"]),
    bestFor: [
      "Three jobs in one — bonding bridge (new-to-old), slurry coat under renders/toppings, and a sand/cement admix",
      "Water-resistant — mixed with cement it can act as a temporary waterproofing sealer",
    ],
    avoidWhere: [
      "Not a structural bond bridge — use an epoxy for high-strength old-to-new bonding",
      "Do not let the slurry coat dry before placing the mortar/render",
    ],
    warnings: [
      "Non-structural",
      "Confirm dosage and application detail against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "Ardex WPM 405 (Sheltercrete Additive) is an SBR multipurpose concentrated liquid polymer additive that improves bond strength, flexibility and workability of sand/cement mortars and screeds. It is used as a bonding bridge for new-to-old concrete, a slurry coat under renders/toppings, and a sand/cement admix; being water-resistant it can serve as a temporary waterproofing sealer when mixed with cement.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "SBR latex", source: "ardexaustralia.com TDS" },
        { label: "Role", value: "Bond bridge + slurry coat + admixture", source: "ardexaustralia.com TDS" },
        { label: "Water resistance", value: "Water-resistant (temp waterproofing sealer with cement)", source: "ardexaustralia.com TDS" },
        { label: "Structural bond", value: "N/A — non-structural", source: "ardexaustralia.com TDS" },
        { label: "Application", value: "Brush bond bridge / slurry; or admix", source: "ardexaustralia.com TDS" },
        { label: "Pack size", value: "20 L", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitobond SBR",
    shortType: "Water-resistant SBR polymer additive + bonding aid",
    badges: [],
    appInfo: kp(["SBR latex", "Bond coat + admixture", "Water-resistant", "Apply mortar while tacky", "N/A — non-structural", "Suitable (water-resistant)", "CONFIRM (Parchem AU TDS)"]),
    bestFor: [
      "Improves bond, tensile and flexural strength of repair mortars, screeds and cementitious slurries — suits thin applications",
      "Bonds to concrete, masonry, stonework, plaster and blockwork",
    ],
    avoidWhere: [
      "Not a structural bond bridge — use Nitobond EP for high-strength old-to-new bonding",
      "Do not let the slurry coat dry before placing the mortar",
    ],
    warnings: [
      "Non-structural",
      "Confirm dosage and pack size against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitobond SBR is a water-resistant SBR polymer additive that improves the strength and adhesion of concrete repair mortars, cementitious floor toppings and screeds, waterproof renders and cementitious slurries, giving improved tensile and flexural properties that allow thin applications. CONFIRM dosage and pack size against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "SBR latex", source: "fosroc.com.au TDS" },
        { label: "Role", value: "Bonding aid + mortar/screed/slurry admixture", source: "fosroc.com.au TDS" },
        { label: "Water resistance", value: "Water-resistant", source: "fosroc.com.au TDS" },
        { label: "Structural bond", value: "N/A — non-structural", source: "fosroc.com.au TDS" },
        { label: "Substrates", value: "Concrete, masonry, stone, plaster, blockwork", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "CONFIRM (Parchem AU TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Planicrete AC",
    shortType: "Acrylic latex admixture (not a standalone bonding agent)",
    badges: [],
    appInfo: kp(["Acrylic copolymer latex", "Admixture / slurry-gauge only", "Water-resistant", "Apply mortar while slurry tacky", "N/A — non-structural", "CONFIRM (Mapei AU TDS)", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Concentrated acrylic latex that boosts the strength, adhesion and flexibility of cementitious repair mortars, plasters, stuccos and toppings",
    ],
    avoidWhere: [
      "Not a standalone bonding agent — it must be gauged with Portland cement and sand to make a slurry bond coat",
      "Confirm exterior / permanently-wet suitability on the current AU TDS",
    ],
    warnings: [
      "Do not brush it on neat as a bond coat — admixture / slurry use only (per the TDS)",
      "Confirm dosage and pack size against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Planicrete AC is a one-component concentrated liquid acrylic latex admixture that enhances cementitious repair mortars, plasters, stuccos and toppings. The TDS states it should NOT be used by itself as a bonding agent — it must be mixed with Portland cement and sand (or designated Mapei products) to form a slurry bond coat. CONFIRM dosage, exterior suitability and pack size against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Acrylic copolymer latex", source: "mapei.com/au TDS" },
        { label: "Role", value: "Admixture / slurry-gauge only (not standalone bond coat)", source: "mapei.com/au TDS" },
        { label: "Water resistance", value: "Water-resistant (acrylic)", source: "mapei.com/au TDS" },
        { label: "Structural bond", value: "N/A — non-structural", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitobond EP",
    shortType: "Two-component structural epoxy bonding agent (old-to-new)",
    badges: [],
    appInfo: kp(["2-part epoxy (solvent-free)", "Structural bond bridge", "Waterproof", "Overlay 12 h @35 °C / 5 h @45 °C", "Structural — MPa CONFIRM", "Yes — internal & external", "CONFIRM (Parchem AU TDS)"]),
    bestFor: [
      "The only structural bond bridge in this group — high-strength bonding of fresh cementitious materials to existing concrete",
      "Solvent-free and waterproof — suitable internally and externally",
      "Long overlay window for placing fresh concrete (12 h @35 °C / 5 h @45 °C)",
    ],
    avoidWhere: [
      "Not a cementitious admixture — it is an epoxy bond bridge, not gauged into mortar",
      "Place the fresh concrete / mortar within the stated overlay window",
    ],
    warnings: [
      "Two-part epoxy — mix complete pre-weighed units and observe pot life and the overlay window",
      "Confirm VOC / ventilation suitability for occupied or enclosed spaces against the TDS",
      "Bond strength (MPa) and pot life: CONFIRM against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitobond EP is a two-component, solvent-free epoxy bonding agent for bonding fresh wet cementitious materials to existing cementitious surfaces, internally and externally. Supplied in pre-weighed units; overlay time 12 h @35 °C / 5 h @45 °C; shelf life 12 months. CONFIRM bond strength, pot life and pack size against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "2-component solvent-free epoxy", source: "fosroc.com.au TDS (Sep 2023)" },
        { label: "Role", value: "Structural bond bridge (old-to-new concrete)", source: "fosroc.com.au TDS (Sep 2023)" },
        { label: "Water resistance", value: "Waterproof", source: "fosroc.com.au TDS (Sep 2023)" },
        { label: "Overlay window", value: "12 h @35 °C / 5 h @45 °C", source: "fosroc.com.au TDS (Sep 2023)" },
        { label: "Structural bond", value: "High-strength — MPa CONFIRM", source: "fosroc.com.au TDS (Sep 2023)" },
        { label: "Pot life", value: "CONFIRM (Parchem AU TDS)", source: "fosroc.com.au TDS (Sep 2023)" },
        { label: "Pack size", value: "CONFIRM (Parchem AU TDS)", source: "fosroc.com.au TDS (Sep 2023)" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika SikaBond SBR+",
    shortType: "Waterproof SBR latex — bonding agent, primer and admixture",
    badges: [],
    appInfo: kp(["SBR latex (waterproof)", "Bond coat + primer + admixture", "Waterproof", "Apply mortar while tacky", "N/A — non-structural", "Yes — frost / salt resistant", "5 L / 25 L"]),
    bestFor: [
      "Waterproof SBR — high resistance to salt and chemical permeation plus improved frost resistance for exterior use",
      "Triple-use: mortar/screed/render admixture, primer/sealer, and bonding agent",
      "Enhances adhesion to dense concrete, steel and tiles",
    ],
    avoidWhere: [
      "Not a structural bond bridge — use an epoxy for high-strength old-to-new bonding",
      "Do not let the bond coat dry before placing the mortar",
    ],
    warnings: [
      "Non-structural",
      "AU TDS not located — confirm Australian specification and dosage with Sika Australia (GB TDS available)",
    ],
    advanced: {
      description:
        "Sika SikaBond SBR+ is a waterproof SBR latex used as a mortar/screed/render admixture, a primer/sealer (incl. tiling), and a bonding agent. It gives high resistance to salt and chemical permeation and improved frost resistance, and enhances adhesion to dense concrete, steel and tiles. Available in 5 L and 25 L. AU TDS not located online — CONFIRM Australian specification with Sika Australia (a GB TDS is available).",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "SBR latex (waterproof)", source: "amazon.com.au listing; GB TDS — AU TDS CONFIRM" },
        { label: "Role", value: "Bonding agent + primer/sealer + admixture", source: "GB TDS — AU TDS CONFIRM" },
        { label: "Water resistance", value: "Waterproof; salt/chemical/frost resistant", source: "GB TDS — AU TDS CONFIRM" },
        { label: "Structural bond", value: "N/A — non-structural", source: "GB TDS — AU TDS CONFIRM" },
        { label: "Substrates", value: "Dense concrete, steel, tiles", source: "GB TDS — AU TDS CONFIRM" },
        { label: "Pack size", value: "5 L / 25 L", source: "amazon.com.au listing" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex WR Prime",
    shortType: "Polymer substrate primer + cement-mix additive",
    badges: [{ label: "Polymer primer", tone: "navy" }, { label: "+ Admixture", tone: "blue" }, { label: "Dense-substrate prime", tone: "amber" }],
    appInfo: kp([
      "Polymer primer & additive",
      "Substrate primer (1:5) + render/mortar admixture",
      "CONFIRM (Ardex AU TDS)",
      "Prime & allow to dry — ~30 min (dense) / 2–3 h (1:5)",
      "N/A — non-structural",
      "Render priming — CONFIRM exterior/wet (Ardex TDS)",
      "CONFIRM (Ardex AU TDS)",
    ]),
    bestFor: [
      "Dual-use — primes dense / low-absorption substrates for render and repair mortar, and gauges into mixes to lift bond strength, flexibility and working time",
      "The correct ARDEX substrate primer for ARDEX BR 340 / BR 345 repair mortars and the WR render range — use instead of ARDEX P 51 (a flooring primer)",
    ],
    avoidWhere: [
      "As the rebar primer — prime the steel with ARDEX BR 10 ZP; WR Prime is for the substrate",
      "On contaminated substrates — the surface must be clean, firm and free of dust, oil, grease, curing compounds and release agents before priming",
    ],
    warnings: [
      "Dilute 1:5 with water for priming and allow to dry (≈30 min on dense concrete; 2–3 h diluted) before applying render / mortar",
      "Confirm pack size, exact dilution per use (primer vs admixture) and dry times from the current ARDEX WR Prime TDS",
    ],
    advanced: {
      description:
        "ARDEX WR Prime is a performance-enhancing polymer primer and additive for renders and cement-based products. As a primer it is diluted 1:5 with water to prime dense / low-absorption substrates (allow to dry ≈30 min on dense concrete; 2–3 h when diluted) before render or repair mortar — it is the ARDEX substrate primer/bond coat referenced for ARDEX BR 340 / BR 345 repair mortars and the WR render range (used instead of ARDEX P 51, a flooring primer). As an admixture gauged into cement renders, adhesives, screeds and grouts it significantly enhances bond strength and increases flexibility and working time. The substrate must be clean, firm and free of dust, oil, grease, curing compounds and release agents. CONFIRM pack size and per-use dilution / dry times against the current ARDEX WR Prime TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Performance-enhancing polymer primer & additive", source: "ardexaustralia.com WR Prime" },
        { label: "Role", value: "Substrate primer (1:5 dilute) + render/mortar/screed/grout admixture", source: "ardexaustralia.com WR Prime" },
        { label: "Priming — dense concrete", value: "Prime, allow to dry ~30 min before render", source: "ardexaustralia.com WR Prime" },
        { label: "Priming — diluted", value: "Dilute 1:5 with water; allow to dry 2–3 h", source: "ardexaustralia.com WR Prime" },
        { label: "As admixture", value: "Enhances bond strength, flexibility and working time", source: "ardexaustralia.com WR Prime" },
        { label: "Substrate prep", value: "Clean, firm, free of dust/oil/grease/curing compounds/release agents", source: "ardexaustralia.com WR Prime" },
        { label: "Use with", value: "ARDEX BR 340 / BR 345 repair mortars; WR-range renders (not ARDEX P 51)", source: "ardexaustralia.com / page" },
        { label: "Structural bond", value: "N/A — non-structural", source: "ardexaustralia.com WR Prime" },
        { label: "Pack size", value: "CONFIRM — not stated on cited source" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex BRP 30 EP",
    shortType: "2-part epoxy bonding coat — damp-tolerant; epoxy-mortar binder",
    badges: [{ label: "2-part epoxy", tone: "navy" }, { label: "Damp/wet substrate", tone: "blue" }, { label: "Structural bond", tone: "amber" }],
    appInfo: kp([
      "2-part epoxy (resin + hardener)",
      "Bonding coat for repair mortars + epoxy-mortar binder (with aggregate)",
      "Suitable on damp / wet substrates",
      "Place mortar within open time — do not let cure",
      "Yes — high-strength epoxy bond",
      "Suitable — bridges, roads, wharves, loading docks",
      "CONFIRM (Ardex AU TDS)",
    ]),
    bestFor: [
      "Epoxy bond coat that works where the substrate stays damp or wet — bridges, roads, wharves, loading docks, warehouses and factories",
      "Doubles as an epoxy-mortar binder for patching / overlay with graded aggregate",
    ],
    avoidWhere: [
      "Where a dry, porous, SSD substrate suits a cheaper SBR slurry — an epoxy bond coat is overspecified",
      "Letting the bonding coat cure before placing the mortar — place within the open time",
    ],
    warnings: [
      "Confirm mixing ratio, pot life, coverage and overcoat window from the current Ardex Australia TDS",
      "For epoxy-mortar use, confirm the correct aggregate type and grading with Ardex",
    ],
    advanced: {
      description:
        "Ardex BRP 30 EP is a two-component (Part A resin + Part B hardener) epoxy used as a bonding coat for concrete repair mortars. Unlike most epoxy bond coats it can be used where the substrate is likely to remain damp or wet, which suits it to bridges, roads, wharves, loading docks, warehouses and factories. It also acts as an epoxy resin binder for epoxy mortar patching and overlay of interior surfaces by adding graded aggregate. The repair mortar is placed into the bonding coat within its open time. CONFIRM mixing ratio, pot life, coverage, substrate preparation and overcoat window from the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "2-part epoxy (Part A resin + Part B hardener)", source: "ardexaustralia.com BRP 30 EP" },
        { label: "Role", value: "Bonding coat for concrete repair mortars; epoxy-mortar binder (with aggregate)", source: "ardexaustralia.com BRP 30 EP" },
        { label: "Damp / wet tolerance", value: "Suitable where the substrate remains damp or wet", source: "ardexaustralia.com BRP 30 EP" },
        { label: "Structural bond", value: "High-strength epoxy bond", source: "ardexaustralia.com BRP 30 EP" },
        { label: "Applications", value: "Bridges, roads, wharves, loading docks, warehouses, factories", source: "ardexaustralia.com BRP 30 EP" },
        { label: "Wet-on-wet", value: "Place mortar within the open time — do not let it cure", source: "ardexaustralia.com BRP 30 EP" },
        { label: "Pack size", value: "CONFIRM (Ardex AU TDS)" },
      ],
    },
  },
];
