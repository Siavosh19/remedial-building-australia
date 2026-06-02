export type ProductEntry = {
  name: string;
  brand: string;
  categorySlug: string;
  categoryLabel: string;
  keywords: string[];
};

export const PRODUCT_INDEX: ProductEntry[] = [
  // ── Liquid applied membranes — polyurethane & hybrid ──────────────────────
  { name: "ARDEX WPM 157", brand: "ARDEX", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pure-pu", "undertile", "under-screed", "water-based", "as-4858"] },
  { name: "ARDEX WPM 155 Rapid Plus", brand: "ARDEX", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pure-pu", "rapid", "undertile", "water-based", "as-4858"] },
  { name: "ARDEX WPM 130 Builders Express", brand: "ARDEX", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pu-hybrid", "undertile", "water-based", "as-4858"] },
  { name: "Sika Sikalastic-487", brand: "Sika", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pure-pu", "undertile", "under-screed", "water-based", "as-4858"] },
  { name: "SikaTile-110 Secure Proof", brand: "Sika", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pu-hybrid", "undertile", "water-based"] },
  { name: "Davco K10 Plus", brand: "Davco / Laticrete", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["hybrid", "undertile", "water-based", "as-4858"] },
  { name: "Bostik Dampfix PU", brand: "Bostik", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pure-pu", "undertile", "under-screed", "water-based", "as-4858"] },
  { name: "Bostik Dampfix Platinum", brand: "Bostik", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pu-hybrid", "undertile", "pedestal", "water-based", "as-4858"] },
  { name: "Tremco Vulkem 350R", brand: "Tremco", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pure-pu", "undertile", "solvent-based", "as-4858"] },
  { name: "Gripset P39", brand: "Gripset", categorySlug: "liquid-applied-membranes-polyurethane", categoryLabel: "Liquid applied membranes — PU & hybrid", keywords: ["pure-pu", "undertile", "under-screed", "pedestal", "water-based", "as-4858"] },

  // ── Liquid applied membranes — acrylic ────────────────────────────────────
  { name: "ARDEX WPM 909", brand: "ARDEX", categorySlug: "liquid-applied-membranes-acrylic", categoryLabel: "Liquid applied membranes — acrylic", keywords: ["acrylic", "exposed", "trafficable", "uv-stable", "water-based"] },
  { name: "ARDEX WPM 310", brand: "ARDEX", categorySlug: "liquid-applied-membranes-acrylic", categoryLabel: "Liquid applied membranes — acrylic", keywords: ["acrylic", "exposed", "uv-stable", "facade", "roof-deck", "water-based"] },
  { name: "Crommelin Wetite", brand: "Crommelin", categorySlug: "liquid-applied-membranes-acrylic", categoryLabel: "Liquid applied membranes — acrylic", keywords: ["sbr", "undertile", "wet-area", "covered", "as-3740"] },
  { name: "Crommelin Wetite Rapid", brand: "Crommelin", categorySlug: "liquid-applied-membranes-acrylic", categoryLabel: "Liquid applied membranes — acrylic", keywords: ["sbr", "rapid-dry", "undertile", "wet-area"] },
  { name: "Gripset 38FC", brand: "Gripset", categorySlug: "liquid-applied-membranes-acrylic", categoryLabel: "Liquid applied membranes — acrylic", keywords: ["sbr", "fibre-reinforced", "rapid-dry", "undertile", "under-screed", "roof-deck"] },
  { name: "Gripset RD", brand: "Gripset", categorySlug: "liquid-applied-membranes-acrylic", categoryLabel: "Liquid applied membranes — acrylic", keywords: ["acrylic", "exposed", "uv-stable", "facade", "roof-deck"] },

  // ── Sheet membranes — torch-on bitumen modified ────────────────────────────
  { name: "Soprema Sopralene Flam 180 AR", brand: "Soprema", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["sbs", "base-sheet", "torch", "polyester-reinforced", "roof-deck", "podium", "as-4858"] },
  { name: "Soprema Sopralene Flam 250 S", brand: "Soprema", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["sbs", "cap-sheet", "torch", "mineral-faced", "exposed", "uv-stable", "roof-deck", "as-4858"] },
  { name: "IKO Armourbase Pro", brand: "IKO", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["sbs", "base-sheet", "torch", "polyester-reinforced", "roof-deck", "as-4858"] },
  { name: "IKO Armour Cap", brand: "IKO", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["sbs", "app", "cap-sheet", "torch", "mineral-faced", "exposed", "uv-stable", "roof-deck", "as-4858"] },
  { name: "Nuralite NP250", brand: "Nuralite", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["sbs", "torch", "polyester-reinforced", "roof-deck", "as-4858"] },
  { name: "Polyglass Polybest", brand: "Polyglass", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["sbs", "app", "torch", "polyester-reinforced", "roof-deck", "as-4858"] },
  { name: "ARDEX WPM 150", brand: "ARDEX", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["app", "base-sheet", "torch", "polyester", "fibreglass", "roof-deck", "as-4858"] },
  { name: "ARDEX WPM 185", brand: "ARDEX", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["app", "cap-sheet", "torch", "mineral-faced", "exposed", "uv-stable", "roof-deck", "as-4858"] },
  { name: "TREMproof Torch 3000", brand: "Tremco", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["app", "base-sheet", "torch", "polyester-reinforced", "podium", "as-4654"] },
  { name: "SikaShield P24 PE Argo 3mm", brand: "Sika", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["app", "base-sheet", "torch", "polyester", "fibreglass", "podium", "as-4654"] },
  { name: "SikaShield P44 MG Fidia 4.5kg", brand: "Sika", categorySlug: "sheet-membranes-torch-on", categoryLabel: "Sheet membranes — torch-on bitumen modified", keywords: ["app", "cap-sheet", "torch", "mineral-faced", "exposed", "uv-stable", "roof-deck", "as-4654"] },

  // ── Sheet membranes — cold-applied self-adhered ────────────────────────────
  { name: "ARDEX WPM 1000", brand: "ARDEX", categorySlug: "sheet-membranes-cold-applied", categoryLabel: "Sheet membranes — cold-applied self-adhered", keywords: ["cold-applied", "no-flame", "polypropylene", "undertile", "as-4654", "as-4858", "as-2904"] },
  { name: "ARDEX WPM 117", brand: "ARDEX", categorySlug: "sheet-membranes-cold-applied", categoryLabel: "Sheet membranes — cold-applied self-adhered", keywords: ["self-adhered", "cold-applied", "no-flame", "bituminous", "multi-layer", "as-4654"] },
  { name: "Gripset BRW-PFN", brand: "Gripset", categorySlug: "sheet-membranes-cold-applied", categoryLabel: "Sheet membranes — cold-applied self-adhered", keywords: ["self-adhered", "cold-applied", "no-flame", "butyl-rubber", "undertile", "as-4654", "as-4858"] },
  { name: "Gripset BRW-HD", brand: "Gripset", categorySlug: "sheet-membranes-cold-applied", categoryLabel: "Sheet membranes — cold-applied self-adhered", keywords: ["self-adhered", "cold-applied", "no-flame", "butyl-rubber", "hdpe", "podium", "as-4654", "as-4858"] },

  // ── Cementitious flexible membranes ───────────────────────────────────────
  { name: "ARDEX WPM 002", brand: "ARDEX", categorySlug: "cementitious-flexible-membranes", categoryLabel: "Cementitious flexible membranes", keywords: ["two-component", "microfibre", "class-iii", "undertile", "as-4858", "as-4654"] },
  { name: "Mapei Mapelastic Smart", brand: "Mapei", categorySlug: "cementitious-flexible-membranes", categoryLabel: "Cementitious flexible membranes", keywords: ["two-component", "high-flexibility", "class-ii", "undertile", "pools", "uv-resistant", "potable", "as-4858"] },
  { name: "Mapei Mapelastic Foundation", brand: "Mapei", categorySlug: "cementitious-flexible-membranes", categoryLabel: "Cementitious flexible membranes", keywords: ["two-component", "thixotropic", "basements", "retaining-walls", "pools", "damp-substrate"] },
  { name: "Davco K11 Flex", brand: "Davco / Laticrete", categorySlug: "cementitious-flexible-membranes", categoryLabel: "Cementitious flexible membranes", keywords: ["two-component", "acrylic-modified", "damp-substrate", "undertile", "basements", "positive-negative-pressure"] },
  { name: "Fosroc Nitoproof 410", brand: "Fosroc / Parchem", categorySlug: "cementitious-flexible-membranes", categoryLabel: "Cementitious flexible membranes", keywords: ["two-component", "class-iii", "undertile", "as-4858"] },
  { name: "Sika Sikalastic-1K", brand: "Sika", categorySlug: "cementitious-flexible-membranes", categoryLabel: "Cementitious flexible membranes", keywords: ["one-component", "undertile", "pools", "uv-resistant", "potable", "as-4654"] },

  // ── HDPE sheet membrane systems ───────────────────────────────────────────
  { name: "Wolfin IB — Loose-Laid PVC Sheet", brand: "Projex Group", categorySlug: "hdpe-sheet-membrane-systems", categoryLabel: "HDPE sheet membrane systems", keywords: ["pvc-sheet", "loose-laid", "ballasted", "hot-air-welded", "roof-deck", "podium", "green-roof", "root-resistant", "as-4654"] },
  { name: "Wolfin GWSK — Self-Adhesive Bonded PVC Sheet", brand: "Projex Group", categorySlug: "hdpe-sheet-membrane-systems", categoryLabel: "HDPE sheet membrane systems", keywords: ["pvc-sheet", "bonded", "self-adhesive", "hot-air-welded", "roof-deck", "podium", "root-resistant", "as-4654"] },
  { name: "Cosmofin FG / FG LL — Reinforced PVC Single-Ply", brand: "Projex Group", categorySlug: "hdpe-sheet-membrane-systems", categoryLabel: "HDPE sheet membrane systems", keywords: ["pvc-sheet", "bonded", "loose-laid", "hot-air-welded", "roof-deck", "podium", "under-tile", "as-4654", "as-4858"] },
  { name: "Sika Sarnafil G 410 — PVC Single-Ply Sheet", brand: "Sika", categorySlug: "hdpe-sheet-membrane-systems", categoryLabel: "HDPE sheet membrane systems", keywords: ["pvc-sheet", "loose-laid", "ballasted", "bonded", "mechanically-fixed", "roof-deck", "podium", "green-roof", "root-resistant", "as-4654"] },
  { name: "Tremco Paraseal LG — HDPE-Bentonite Sheet", brand: "Tremco", categorySlug: "hdpe-sheet-membrane-systems", categoryLabel: "HDPE sheet membrane systems", keywords: ["hdpe-bentonite", "below-grade"] },

  // ── Hot melt rubberised asphalt systems ───────────────────────────────────
  { name: "Henry 790-11 Hot Rubberised Asphalt", brand: "Henry Company", categorySlug: "hot-melt-rubberised-asphalt-systems", categoryLabel: "Hot melt rubberised asphalt systems", keywords: ["hot-fluid-applied", "rubberised-asphalt", "fully-bonded", "podium", "plaza-deck", "roof-deck", "inverted-roof", "below-grade"] },
  { name: "Soprema Colphene H", brand: "Soprema", categorySlug: "hot-melt-rubberised-asphalt-systems", categoryLabel: "Hot melt rubberised asphalt systems", keywords: ["hot-fluid-applied", "rubberised-asphalt", "fully-bonded", "podium", "roof-deck", "inverted-roof", "green-roof", "planter"] },
  { name: "SikaShield Hot Melt 50/70", brand: "Sika", categorySlug: "hot-melt-rubberised-asphalt-systems", categoryLabel: "Hot melt rubberised asphalt systems", keywords: ["hot-melt-bitumen", "fully-bonded", "inverted-roof", "podium", "roof-deck", "bba-certified"] },
  { name: "Mastic Asphalt — Traditional Hot-Applied", brand: "Various specialist contractors", categorySlug: "hot-melt-rubberised-asphalt-systems", categoryLabel: "Hot melt rubberised asphalt systems", keywords: ["mastic-asphalt", "traditional", "fully-bonded", "podium", "roof-deck", "inverted-roof"] },

  // ── Primers and bonding agents ────────────────────────────────────────────
  { name: "ARDEX WPM 265", brand: "ARDEX", categorySlug: "primers-bonding-agents", categoryLabel: "Primers and bonding agents", keywords: ["water-based", "acrylic-primer", "porous-substrates", "low-voc", "colour-indicator"] },
  { name: "ARDEX WPM 300 (HydrEpoxy)", brand: "ARDEX", categorySlug: "primers-bonding-agents", categoryLabel: "Primers and bonding agents", keywords: ["two-component", "epoxy-primer", "moisture-barrier", "damp-concrete", "potable-water"] },
  { name: "ARDEX WPM 240", brand: "ARDEX", categorySlug: "primers-bonding-agents", categoryLabel: "Primers and bonding agents", keywords: ["solvent-based", "bitumen-primer", "torch-on", "sheet-membrane", "flammable"] },
  { name: "SikaTile-010 Secure Prime", brand: "Sika", categorySlug: "primers-bonding-agents", categoryLabel: "Primers and bonding agents", keywords: ["water-based", "acrylic-primer", "porous-substrates", "pools-submerged"] },
  { name: "Tremco Torch Bitumen Primer", brand: "Tremco", categorySlug: "primers-bonding-agents", categoryLabel: "Primers and bonding agents", keywords: ["solvent-based", "bitumen-primer", "torch-on", "sheet-membrane", "flammable"] },
  { name: "Fosroc Nitobond SBR", brand: "Fosroc / Parchem", categorySlug: "primers-bonding-agents", categoryLabel: "Primers and bonding agents", keywords: ["sbr-admixture", "bonding-agent", "water-based", "repair-mortar", "pools-submerged"] },
  { name: "Gripset 11Y", brand: "Gripset", categorySlug: "primers-bonding-agents", categoryLabel: "Primers and bonding agents", keywords: ["sbr-admixture", "bonding-agent", "water-based", "repair-mortar"] },
  { name: "Fosroc Nitobond EP", brand: "Fosroc / Parchem", categorySlug: "primers-bonding-agents", categoryLabel: "Primers and bonding agents", keywords: ["two-component", "epoxy-primer", "bonding-agent", "damp-concrete", "repair-mortar"] },

  // ── Reinforcing fabric and mesh ────────────────────────────────────────────
  { name: "ARDEX Deckweb", brand: "ARDEX", categorySlug: "reinforcing-fabric-mesh", categoryLabel: "Reinforcing fabric and mesh", keywords: ["woven-polyester", "junction-reinforcement", "corners", "wall-to-floor", "liquid-applied"] },
  { name: "Mapei Mapenet 150", brand: "Mapei", categorySlug: "reinforcing-fabric-mesh", categoryLabel: "Reinforcing fabric and mesh", keywords: ["fibreglass-mesh", "alkali-resistant", "junction-reinforcement", "cementitious-membrane"] },
  { name: "Mapei Mapetex Sel", brand: "Mapei", categorySlug: "reinforcing-fabric-mesh", categoryLabel: "Reinforcing fabric and mesh", keywords: ["non-woven-polyester", "junction-reinforcement", "mapelastic", "corners", "wall-to-floor"] },
  { name: "ARDEX Deckweb — Self-Adhesive Bandage Tape", brand: "ARDEX", categorySlug: "reinforcing-fabric-mesh", categoryLabel: "Reinforcing fabric and mesh", keywords: ["self-adhesive", "bandage-tape", "woven-polyester", "corners", "fast-application"] },
  { name: "Mapei Mapeband — Fabric Corner and Junction Tape", brand: "Mapei", categorySlug: "reinforcing-fabric-mesh", categoryLabel: "Reinforcing fabric and mesh", keywords: ["polyester-bandage", "junction-tape", "self-adhesive", "corner-detail", "drain-flashing"] },

  // ── Abrasives, blades and tools ───────────────────────────────────────────
  { name: "Tile Stripping Blade — SDS-Max Flat Scraper", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["tile-removal", "sds-electric", "dust-extraction"] },
  { name: "SDS-Max Demolition Chisel — Flat and Pointed", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["tile-removal", "membrane-removal", "sds-electric", "dust-extraction"] },
  { name: "Diamond Cup Wheel — Double Row 125mm", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["surface-grinding", "angle-grinder", "csp-profile", "dust-extraction"] },
  { name: "Walk-Behind Floor Grinder — Planetary", brand: "Husqvarna / Lavina", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["surface-grinding", "walk-behind", "csp-profile", "dust-extraction"] },
  { name: "Scarifying Machine — Walk-Behind or Handheld", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["scarifying", "walk-behind", "csp-profile", "dust-extraction"] },
  { name: "Diamond Segmented Saw Blade — 115/125mm", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["diamond-cutting", "angle-grinder", "wet-cutting", "dust-extraction"] },
  { name: "Short Nap Woven Roller Cover — 6/10mm", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["membrane-application", "roller", "hand-tool"] },
  { name: "Notched Trowel — V-Notch Stainless Steel", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["membrane-application", "hand-tool"] },
  { name: "Flat Rubber Squeegee — 300–600mm", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["membrane-application", "hand-tool"] },
  { name: "Concrete Moisture Meter — Capacitance or Pin Type", brand: "Various", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["moisture-testing", "hand-tool"] },
  { name: "Wet Film Thickness (WFT) Comb Gauge", brand: "Byk-Gardner", categorySlug: "abrasives-blades-tools", categoryLabel: "Abrasives, blades and tools", keywords: ["film-thickness", "hand-tool", "wft"] },

  // ── Screed systems — polymer-modified ─────────────────────────────────────
  { name: "ARDEX A 38", brand: "ARDEX", categorySlug: "screed-systems-polymer-modified", categoryLabel: "Screed systems — polymer-modified", keywords: ["rapid-set", "site-batched", "bonded", "unbonded", "falls-correction", "large-area"] },
  { name: "ARDEX A 48", brand: "ARDEX", categorySlug: "screed-systems-polymer-modified", categoryLabel: "Screed systems — polymer-modified", keywords: ["rapid-set", "pre-mixed", "bonded", "unbonded", "falls-correction", "domestic"] },
  { name: "Mapei Mapecem Pronto", brand: "Mapei", categorySlug: "screed-systems-polymer-modified", categoryLabel: "Screed systems — polymer-modified", keywords: ["pre-blended", "bonded", "unbonded", "falls-correction", "fast-tile", "large-area"] },
  { name: "Mapei Topcem Pronto AU", brand: "Mapei", categorySlug: "screed-systems-polymer-modified", categoryLabel: "Screed systems — polymer-modified", keywords: ["pre-blended", "bonded", "unbonded", "falls-correction", "large-area"] },
  { name: "Fosroc Cemtop Screed", brand: "Fosroc / Parchem", categorySlug: "screed-systems-polymer-modified", categoryLabel: "Screed systems — polymer-modified", keywords: ["single-component", "bonded", "falls-correction", "localised"] },
  { name: "ARDEX Abacrete", brand: "ARDEX", categorySlug: "screed-systems-polymer-modified", categoryLabel: "Screed systems — polymer-modified", keywords: ["ardex", "screed", "repair"] },
  { name: "ARDEX WPM 405", brand: "ARDEX", categorySlug: "screed-systems-polymer-modified", categoryLabel: "Screed systems — polymer-modified", keywords: ["ardex", "screed", "waterproof"] },

  // ── Screed systems — self-levelling ───────────────────────────────────────
  { name: "ARDEX K 301", brand: "ARDEX", categorySlug: "screed-systems-self-levelling", categoryLabel: "Screed systems — self-levelling", keywords: ["self-levelling", "rapid-set", "smoothing", "floor-levelling"] },
  { name: "ARDEX LQ 92", brand: "ARDEX", categorySlug: "screed-systems-self-levelling", categoryLabel: "Screed systems — self-levelling", keywords: ["self-levelling", "liquid-screed", "large-area", "floor-levelling"] },
  { name: "ARDEX K 15 Microtec", brand: "ARDEX", categorySlug: "screed-systems-self-levelling", categoryLabel: "Screed systems — self-levelling", keywords: ["self-levelling", "microtec", "rapid-set", "smoothing"] },
  { name: "Mapei Ultraplan Eco", brand: "Mapei", categorySlug: "screed-systems-self-levelling", categoryLabel: "Screed systems — self-levelling", keywords: ["self-levelling", "eco", "floor-levelling", "large-area"] },

  // ── Tile adhesive systems ─────────────────────────────────────────────────
  { name: "ARDEX X 77 Microtec", brand: "ARDEX", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["polymer-modified", "class-2", "deformable", "large-format", "over-membrane"] },
  { name: "ARDEX X 78 Microtec", brand: "ARDEX", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["polymer-modified", "rapid-set", "class-2", "deformable", "large-format"] },
  { name: "Mapei Ultraflex 2", brand: "Mapei", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["polymer-modified", "class-2", "deformable", "large-format", "over-membrane"] },
  { name: "Mapei Keraflex Maxi S1", brand: "Mapei", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["polymer-modified", "anti-slump", "s1", "deformable", "large-format"] },
  { name: "Bostik UltraSet SuperFlex", brand: "Bostik", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["polymer-modified", "class-2", "deformable", "large-format"] },
  { name: "ARDEX WA Epoxy Tile Adhesive and Grout", brand: "ARDEX", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["two-part", "epoxy", "adhesive", "grout", "large-format", "pools"] },
  { name: "Mapei Kerapoxy CQ", brand: "Mapei", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["two-part", "epoxy", "adhesive", "grout", "chemical-resistance"] },
  { name: "Mapei Kerapoxy Design", brand: "Mapei", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["two-part", "epoxy", "adhesive", "grout", "decorative", "stain-resistance"] },
  { name: "ARDEX Flex Joint (FJ)", brand: "ARDEX", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["flexible", "sanded", "cement-grout", "grout"] },
  { name: "Mapei Ultracolor Plus FA", brand: "Mapei", categorySlug: "tile-adhesive-systems", categoryLabel: "Tile adhesive systems", keywords: ["fast-setting", "sanded", "cement-grout", "dropeffect", "stain-resistance"] },

  // ── Drainage — puddle flanges and floor wastes ────────────────────────────
  { name: "Hydraloc PVC Puddle Flange", brand: "Hydraloc / Various", categorySlug: "drainage-puddle-flanges-floor-wastes", categoryLabel: "Drainage — puddle flanges and floor wastes", keywords: ["pvc", "fixed-height", "liquid-applied", "standard-balcony"] },
  { name: "Stainless Steel Square Puddle Flange — Tile Insert", brand: "Various", categorySlug: "drainage-puddle-flanges-floor-wastes", categoryLabel: "Drainage — puddle flanges and floor wastes", keywords: ["stainless", "fixed-height", "torch-on", "liquid-applied", "tile-insert"] },
  { name: "Schlüter KERDI-DRAIN", brand: "Schlüter-Systems", categorySlug: "drainage-puddle-flanges-floor-wastes", categoryLabel: "Drainage — puddle flanges and floor wastes", keywords: ["stainless", "adjustable-height", "liquid-applied", "tile-insert"] },
  { name: "Alwitra Evalon Drain / Turbo Drain", brand: "Alwitra", categorySlug: "drainage-puddle-flanges-floor-wastes", categoryLabel: "Drainage — puddle flanges and floor wastes", keywords: ["pvc-stainless", "adjustable-height", "torch-on", "podium", "roof-deck"] },
  { name: "Sump Outlet — Raised Deck and Podium Slab", brand: "Various", categorySlug: "drainage-puddle-flanges-floor-wastes", categoryLabel: "Drainage — puddle flanges and floor wastes", keywords: ["stainless", "podium", "roof-deck", "sump-type"] },

  // ── Drainage — linear grates and channel drains ───────────────────────────
  { name: "Schlüter KERDI-LINE", brand: "Schlüter-Systems", categorySlug: "drainage-linear-grates-channel-drains", categoryLabel: "Drainage — linear grates and channel drains", keywords: ["stainless-steel", "tile-insert", "slot-grate", "adjustable", "class-a", "class-b", "liquid-applied"] },
  { name: "ACO Stainless Linear Channel Drain", brand: "ACO Australia", categorySlug: "drainage-linear-grates-channel-drains", categoryLabel: "Drainage — linear grates and channel drains", keywords: ["stainless-steel", "slot-grate", "adjustable", "fixed", "class-a", "class-b", "liquid-applied", "torch-on"] },
  { name: "Infinity Drain Tile Insert Linear Drain", brand: "Infinity Drain", categorySlug: "drainage-linear-grates-channel-drains", categoryLabel: "Drainage — linear grates and channel drains", keywords: ["stainless-steel", "tile-insert", "adjustable", "class-a", "liquid-applied"] },
  { name: "Geberit CleanLine Linear Drain", brand: "Geberit", categorySlug: "drainage-linear-grates-channel-drains", categoryLabel: "Drainage — linear grates and channel drains", keywords: ["stainless-steel", "slot-grate", "fixed", "class-a", "liquid-applied"] },
  { name: "PVC Channel Drain — Standard", brand: "Various", categorySlug: "drainage-linear-grates-channel-drains", categoryLabel: "Drainage — linear grates and channel drains", keywords: ["pvc", "slot-grate", "fixed", "class-a", "liquid-applied"] },
  { name: "HDPE Channel Drain — Podium and Heavy Duty", brand: "Various", categorySlug: "drainage-linear-grates-channel-drains", categoryLabel: "Drainage — linear grates and channel drains", keywords: ["hdpe", "slot-grate", "fixed", "podium", "class-b", "liquid-applied", "torch-on"] },

  // ── Penetration collars ───────────────────────────────────────────────────
  { name: "ARDEX Pre-formed PVC Pipe Collar", brand: "ARDEX", categorySlug: "penetration-collars", categoryLabel: "Penetration collars — pre-formed and site-formed", keywords: ["pre-formed", "pvc", "liquid-applied", "standard-diameter"] },
  { name: "Mapei Pre-formed Pipe Collar", brand: "Mapei", categorySlug: "penetration-collars", categoryLabel: "Penetration collars — pre-formed and site-formed", keywords: ["pre-formed", "pvc", "liquid-applied", "standard-diameter"] },
  { name: "Stainless Steel Pipe Collar — Torch-on Compatible", brand: "Various", categorySlug: "penetration-collars", categoryLabel: "Penetration collars — pre-formed and site-formed", keywords: ["pre-formed", "stainless-steel", "torch-on", "liquid-applied"] },
  { name: "EPDM Rubber Flexible Pipe Collar (Dektite)", brand: "Various", categorySlug: "penetration-collars", categoryLabel: "Penetration collars — pre-formed and site-formed", keywords: ["pre-formed", "epdm-rubber", "dektite", "liquid-applied", "non-standard-diameter"] },
  { name: "Site-formed Collar — ARDEX System", brand: "ARDEX", categorySlug: "penetration-collars", categoryLabel: "Penetration collars — pre-formed and site-formed", keywords: ["site-formed", "ardex", "liquid-applied", "non-standard-diameter"] },
  { name: "Site-formed Collar — Mapei System", brand: "Mapei", categorySlug: "penetration-collars", categoryLabel: "Penetration collars — pre-formed and site-formed", keywords: ["site-formed", "mapei", "liquid-applied", "non-standard-diameter"] },

  // ── Protection boards ─────────────────────────────────────────────────────
  { name: "Foamular XPS Extruded Polystyrene Protection Board", brand: "Various", categorySlug: "protection-boards", categoryLabel: "Protection boards", keywords: ["xps", "extruded-polystyrene", "membrane-protection", "screed-over", "compressive-strength", "moisture-resistant"] },
  { name: "Schlüter DITRA / DITRA-HEAT — Uncoupling Mat", brand: "Schlüter", categorySlug: "protection-boards", categoryLabel: "Protection boards", keywords: ["uncoupling-mat", "polyethylene", "membrane-protection", "tile-over", "vapour-management", "drainage-void"] },
  { name: "Reln Dimple Mat / HDPE Drainage Protection Mat", brand: "Reln / Various", categorySlug: "protection-boards", categoryLabel: "Protection boards", keywords: ["dimple-mat", "hdpe", "drainage-and-protection", "podium", "roof-deck", "root-resistant"] },
  { name: "Alwitra Evalon Protection Board / Composite Root Barrier", brand: "Alwitra / Various", categorySlug: "protection-boards", categoryLabel: "Protection boards", keywords: ["composite-protection", "root-barrier", "podium", "green-roof", "torch-on-compatible"] },
  { name: "Enkadrain / Geocomposite Drainage and Protection Mat", brand: "Colbond / Enka / Various", categorySlug: "protection-boards", categoryLabel: "Protection boards", keywords: ["geocomposite", "filter-fabric", "drainage-and-protection", "podium", "roof-deck", "green-roof"] },
  { name: "ARDEX Protection Board", brand: "ARDEX", categorySlug: "protection-boards", categoryLabel: "Protection boards", keywords: ["fluted-polyethylene", "corflute", "membrane-protection", "screed-over", "below-grade", "lightweight"] },

  // ── Root resistant membrane systems ───────────────────────────────────────
  { name: "ARDEX Root Repell (WPM 1000 RR)", brand: "ARDEX", categorySlug: "root-resistant-membrane-systems", categoryLabel: "Root resistant membrane systems", keywords: ["weldable-sheet", "polypropylene", "root-inhibitor", "preventol-b2", "heat-welded", "planter-box", "green-roof", "as-4654"] },
  { name: "Wolfin IB — Root Resistant", brand: "Projex Group", categorySlug: "root-resistant-membrane-systems", categoryLabel: "Root resistant membrane systems", keywords: ["pvc-sheet", "fll-certified", "root-resistant", "hot-air-welded", "planter-box", "green-roof", "podium"] },
  { name: "Cosmofin FG / FG LL — Root Resistant", brand: "Projex Group", categorySlug: "root-resistant-membrane-systems", categoryLabel: "Root resistant membrane systems", keywords: ["pvc-sheet", "fll-certified", "root-resistant", "fleece-backing", "undertile", "planter-box", "podium", "as-4654"] },
  { name: "Tremco TREMproof 211 + Anti-Root Additive", brand: "Tremco", categorySlug: "root-resistant-membrane-systems", categoryLabel: "Root resistant membrane systems", keywords: ["liquid-applied", "polyurethane", "anti-root", "planter-box", "below-grade", "retaining-wall", "as-4654"] },
  { name: "Soprema Colphene 3000 + Alsan Flashing Quadro", brand: "Soprema / Bayset", categorySlug: "root-resistant-membrane-systems", categoryLabel: "Root resistant membrane systems", keywords: ["self-adhesive-sheet", "sbs", "cold-applied", "flameless", "planter-box", "retaining-wall"] },
  { name: "Torch-on SBS with Anti-Root Cap Sheet", brand: "Tremco", categorySlug: "root-resistant-membrane-systems", categoryLabel: "Root resistant membrane systems", keywords: ["torch-on", "sbs", "anti-root-cap", "planter-box", "green-roof", "podium"] },

  // ── Tapered insulation board systems ──────────────────────────────────────
  { name: "Recticel Eurothane Silver A", brand: "Recticel / WPD Group", categorySlug: "tapered-insulation-board-systems", categoryLabel: "Tapered insulation board systems", keywords: ["pir", "tapered", "warm-roof", "foil-faced", "mechanically-fixed", "podium", "ncc-section-j"] },
  { name: "Fatra PIR Tapered Insulation System", brand: "Fatra Australia", categorySlug: "tapered-insulation-board-systems", categoryLabel: "Tapered insulation board systems", keywords: ["pir", "tapered", "warm-roof", "fully-adhered", "podium", "roof-deck", "ncc-section-j", "falls-creation"] },
  { name: "Enduroflex Tapered Insulation Service", brand: "Enduroflex", categorySlug: "tapered-insulation-board-systems", categoryLabel: "Tapered insulation board systems", keywords: ["pir", "tapered", "warm-roof", "podium", "roof-deck", "ncc-section-j", "nsw"] },
  { name: "XPS Extruded Polystyrene Board — Inverted Roof", brand: "Various", categorySlug: "tapered-insulation-board-systems", categoryLabel: "Tapered insulation board systems", keywords: ["xps", "inverted-roof", "moisture-resistant", "closed-cell", "compressive-strength", "podium", "ballasted", "green-roof"] },
  { name: "Mineral Wool Flat Roof Board", brand: "Rockwool / Knauf / Sika Sikatherm", categorySlug: "tapered-insulation-board-systems", categoryLabel: "Tapered insulation board systems", keywords: ["mineral-wool", "non-combustible", "fire-performance", "warm-roof", "podium", "ncc-section-j"] },
  { name: "Kingspan Thermataper TT46 / TT47", brand: "Kingspan", categorySlug: "tapered-insulation-board-systems", categoryLabel: "Tapered insulation board systems", keywords: ["pir", "tapered", "warm-roof", "foil-faced", "mechanically-fixed", "ncc-section-j", "high-thermal", "roof-deck"] },

  // ── Pedestal systems — adjustable height ──────────────────────────────────
  { name: "Buzon DPH Series", brand: "Pasco Construction Solutions", categorySlug: "pedestal-systems-adjustable-height", categoryLabel: "Pedestal systems — adjustable height", keywords: ["adjustable-pedestal", "slope-correction", "wind-uplift", "high-load", "recycled-polypropylene", "podium", "rooftop", "balcony", "stone-pavers", "porcelain-pavers", "timber-decking"] },
  { name: "Elmich VersiPave GP", brand: "Elmich Australia", categorySlug: "pedestal-systems-adjustable-height", categoryLabel: "Pedestal systems — adjustable height", keywords: ["adjustable-pedestal", "wind-uplift", "sound-reduction", "roof-garden", "pool-surrounds", "balcony", "podium", "porcelain-pavers", "stone-pavers"] },
  { name: "Keksia NM / PR / Star.T Series", brand: "TradieCart / keksia.com.au", categorySlug: "pedestal-systems-adjustable-height", categoryLabel: "Pedestal systems — adjustable height", keywords: ["adjustable-pedestal", "slope-correction", "wind-uplift", "anti-noise", "sound-reduction", "self-levelling-head", "low-profile", "balcony", "podium", "porcelain-pavers", "timber-decking"] },
  { name: "Maximus Pedestal Systems", brand: "Maximus (Australian)", categorySlug: "pedestal-systems-adjustable-height", categoryLabel: "Pedestal systems — adjustable height", keywords: ["adjustable-pedestal", "australian-manufacturer", "podium", "rooftop", "balcony", "large-format", "wind-uplift"] },
  { name: "Moonbay POD Series", brand: "TradieCart", categorySlug: "pedestal-systems-adjustable-height", categoryLabel: "Pedestal systems — adjustable height", keywords: ["adjustable-pedestal", "budget", "flat-substrate", "residential", "balcony", "porcelain-pavers", "stone-pavers"] },

  // ── Flood test equipment ──────────────────────────────────────────────────
  { name: "Inflatable Rubber Flood Test Balloon Plug", brand: "H2O Supplies / The Waterproofing Shop", categorySlug: "flood-test-equipment", categoryLabel: "Flood test equipment and plugs", keywords: ["inflatable-rubber", "50mm", "75mm", "100mm", "reusable", "flood-test"] },
  { name: "Mechanical Expansion Test Plug — Aluminium", brand: "Plumboss / Drainchem", categorySlug: "flood-test-equipment", categoryLabel: "Flood test equipment and plugs", keywords: ["mechanical-expansion", "38mm", "100mm", "reusable", "flood-test", "plumbing"] },
  { name: "Plumtest Inflatable Test Plug", brand: "Plumtest / Plumbers Choice", categorySlug: "flood-test-equipment", categoryLabel: "Flood test equipment and plugs", keywords: ["inflatable-rubber", "50mm", "100mm", "reusable", "flood-test"] },
  { name: "Stormtech 100FLEX — Integrated Flood Test Plug", brand: "Stormtech", categorySlug: "flood-test-equipment", categoryLabel: "Flood test equipment and plugs", keywords: ["integrated-plug", "100mm", "codemark", "flood-test", "waterproofing"] },
  { name: "Water Level Gauge / Depth Marker", brand: "Various / site-fabricated", categorySlug: "flood-test-equipment", categoryLabel: "Flood test equipment and plugs", keywords: ["water-level", "depth-marker", "site-fabricated", "flood-test"] },

  // ── Balcony edge trims ────────────────────────────────────────────────────
  { name: "Demtech BET Series", brand: "Demtech", categorySlug: "gutter-lining-systems", categoryLabel: "Balcony edge trims", keywords: ["edge-trim", "aluminium", "powder-coat", "concealed-fastener", "adjustable-projection", "balcony-edge", "membrane-termination"] },
  { name: "Schlüter BARA-RAK / BARA-RAKO", brand: "Schlüter Systems", categorySlug: "gutter-lining-systems", categoryLabel: "Balcony edge trims", keywords: ["edge-trim", "aluminium", "anodised", "tile-anchor", "balcony-perimeter", "schluter", "bara"] },
  { name: "Amark All-Edge Trim", brand: "Amark", categorySlug: "gutter-lining-systems", categoryLabel: "Balcony edge trims", keywords: ["edge-trim", "aluminium", "concealed-fix", "balcony-edge", "membrane-termination"] },
  { name: "Anodised Aluminium Drip Angle", brand: "Trade supply — various", categorySlug: "gutter-lining-systems", categoryLabel: "Balcony edge trims", keywords: ["edge-trim", "aluminium", "anodised", "drip-angle", "membrane-termination", "soffit", "slab-edge"] },
  { name: "Custom 316 Stainless Steel Edge Trim", brand: "Custom fabrication", categorySlug: "gutter-lining-systems", categoryLabel: "Balcony edge trims", keywords: ["edge-trim", "316-stainless", "stainless-steel", "marine-grade", "coastal", "custom-fabricated", "316L"] },

  // ── Flashing compound systems ─────────────────────────────────────────────
  { name: "Soprema Alsan Flashing", brand: "Soprema", categorySlug: "flashing-compound-systems", categoryLabel: "Flashing compound systems — roofs and balconies", keywords: ["flashing-compound", "pu-bitumen", "liquid-flashing", "uv-resistant", "exposed", "upstand", "parapet", "soprema", "alsan", "bituminous-compatible", "no-primer"] },
  { name: "Soprema Alsan Flashing Quadro", brand: "Soprema", categorySlug: "flashing-compound-systems", categoryLabel: "Flashing compound systems — roofs and balconies", keywords: ["flashing-compound", "polyurethane", "liquid-flashing", "cold-applied", "flameless", "no-hot-work", "upstand", "parapet", "soprema", "alsan-quadro", "dark-grey"] },
  { name: "Soprema Alsan Flashing Jardin", brand: "Soprema", categorySlug: "flashing-compound-systems", categoryLabel: "Flashing compound systems — roofs and balconies", keywords: ["flashing-compound", "pu-bitumen", "root-resistant", "rhizome-resistant", "green-roof", "planter-box", "soprema", "alsan-jardin", "upstand"] },
  { name: "Tremco Brushable Hydroseal", brand: "Tremco", categorySlug: "flashing-compound-systems", categoryLabel: "Flashing compound systems — roofs and balconies", keywords: ["flashing-compound", "bituminous", "fibre-reinforced", "brushable", "rust-inhibiting", "lap-sealing", "joint-sealing", "tremco", "upstand", "heavy-body"] },
  { name: "ARDEX Flashing Tape", brand: "ARDEX", categorySlug: "flashing-compound-systems", categoryLabel: "Flashing compound systems — roofs and balconies", keywords: ["flashing-tape", "self-adhesive", "weldtec", "ardex", "joint-sealing", "pipe-flashing", "100mm", "system-specific"] },
  { name: "Tremco PermAFab", brand: "Tremco", categorySlug: "flashing-compound-systems", categoryLabel: "Flashing compound systems — roofs and balconies", keywords: ["flashing-tape", "self-adhesive", "reinforced", "tremco", "lap-sealing", "joint-bridging", "pipe-flashing", "bowens"] },
  { name: "Generic Butyl / Aluminium Flashing Tape", brand: "Crommelin / Gripset / various", categorySlug: "flashing-compound-systems", categoryLabel: "Flashing compound systems — roofs and balconies", keywords: ["flashing-tape", "self-adhesive", "butyl-rubber", "aluminium-faced", "joint-sealing", "pipe-flashing", "crommelin", "gripset", "trade-supply", "repair"] },
];
