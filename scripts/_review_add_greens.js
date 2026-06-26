#!/usr/bin/env node
// Generate + insert conservative, compile-safe Product cards for the GREEN
// recommendations into their PRODUCTS arrays. Content mirrors the existing
// "confirm current ... with <brand> technical" tone; hard specs are marked TODO.
const fs = require("fs");
const path = require("path");
const RS = path.join(__dirname, "..", "app", "repair-systems");

function insertIntoArray(file, varName, block) {
  let src = fs.readFileSync(file, "utf8");
  const re = new RegExp("\\b" + varName + "\\b[^=]*=\\s*\\[");
  const m = re.exec(src);
  if (!m) throw new Error(`array ${varName} not found in ${file}`);
  const open = src.indexOf("[", m.index + m[0].length - 1);
  let depth = 0, close = -1;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === "[") depth++;
    else if (c === "]") { depth--; if (depth === 0) { close = i; break; } }
  }
  let p = close - 1;
  while (p > open && /\s/.test(src[p])) p--;
  const lead = src[p] === "[" || src[p] === "," ? "\n  " : ",\n  ";
  src = src.slice(0, p + 1) + lead + block + "\n" + src.slice(p + 1, close) + src.slice(close);
  fs.writeFileSync(file, src);
}

function chipOf(type) { return type.split(/[—(]/)[0].trim().slice(0, 30); }

function productObj(d) {
  const sys = `${d.name} is a ${d.type}. ${d.purpose} Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with ${d.brandShort} technical before specifying. TODO: verify specific performance figures from the current ${d.brandShort} TDS.`;
  const tech = [
    `${d.type}`,
    `${d.purpose}`,
    `Confirm key performance values (strength / coverage / application) from the current ${d.brandShort} TDS — TODO`,
    `Australian-market product — confirm current availability and pack sizes with ${d.brandShort}`,
  ];
  const lim = [
    `Confirm current product formulation and system suitability with ${d.brandShort} technical before specifying`,
    `TODO: confirm application limits, substrate preparation and temperature range from the current TDS`,
    `Verify current Australian availability and pack sizes with ${d.brandShort}`,
  ];
  const j = JSON.stringify;
  return `{
    fullLabel: ${j(d.fullLabel)},
    brandUrl: ${j(d.url)},
    accentColor: ${j(d.accent)},
    name: ${j(d.name)},
    descriptionLine: ${j(`${d.type} — confirm current specification and Australian availability with ${d.brandShort} technical before specifying`)},
    productType: ${j(d.type)},
    filterTags: [${d.tags.map(j).join(", ")}],
    techChips: [
      { label: ${j(chipOf(d.type))}, cls: "bg-slate-100 text-slate-700" },
      { label: ${j(d.brandShort + " — AU supply")}, cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      ${j(sys)},
    technicalProperties: [
      ${tech.map(j).join(",\n      ")},
    ],
    limitations: [
      ${lim.map(j).join(",\n      ")},
    ],
    procurementSources: [
      { name: ${j(d.brandShort + " — Australian trade supply")}, url: ${j(d.url)} },
    ],
  }`;
}

const U = { sika: "https://aus.sika.com", parchem: "https://www.parchem.com.au", mapei: "https://www.mapei.com/au", ardex: "https://ardexaustralia.com", tremco: "https://www.tremco.com.au", ramset: "https://www.ramset.com.au" };
const A = { sika: "#be123c", parchem: "#7c2d12", mapei: "#1d4ed8", ardex: "#0369a1", tremco: "#0f766e", other: "#475569" };

const E = [
  // ── concrete-spalling ──
  ["concrete-spalling/curing-compounds/CuringCompoundsProductSection.tsx", "Tremco", "Tremco", U.tremco, A.tremco, "Tremco Evencure AC", "Water-based acrylic membrane-forming curing compound (AS 3799)", ["Acrylic","Spray-applied","Water-based","Walls","Floors"], "Spray-applied immediately after finishing to retard moisture loss and reduce plastic shrinkage; it is a bond breaker and must be removed before overcoating."],
  ["concrete-spalling/curing-compounds/CuringCompoundsProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika Antisol AC", "Water-based resin membrane-forming curing compound (AS 3799)", ["Acrylic","Spray-applied","Water-based","Walls","Floors"], "One of the current Sika Australia curing compounds; spray-applied after finishing and removed before overcoating."],
  ["concrete-spalling/structural-grouts/StructuralGroutsProductSection.tsx", "Fosroc / Parchem", "Fosroc", U.parchem, A.parchem, "Fosroc Conbextra GP", "General-purpose shrinkage-compensated cementitious grout (~65 MPa)", ["Structural-grout","Cementitious","Non-shrink","Free-flow","Pre-bagged"], "Free-flow grout for base plates, anchors and void filling where dimensional stability and load transfer are required."],
  ["concrete-spalling/structural-grouts/StructuralGroutsProductSection.tsx", "Fosroc / Parchem", "Fosroc", U.parchem, A.parchem, "Fosroc Conbextra HF", "High-flow dual-expansion cementitious precision grout", ["Structural-grout","Cementitious","Non-shrink","Free-flow","Pre-bagged","High-strength"], "High-flow precision grout for congested base plates and deeper pours requiring controlled expansion."],
  ["concrete-spalling/structural-grouts/StructuralGroutsProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika SikaGrout-212 HP", "Non-shrink dual-expansion high-performance cementitious structural grout", ["Structural-grout","Cementitious","Non-shrink","Free-flow","Pre-bagged","High-strength"], "Non-shrink high-performance grout for structural base plates, anchors and machinery bases."],
  ["concrete-spalling/micro-concrete/MicroConcreteProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika MonoTop-436N", "Pourable self-compacting R4 micro-concrete repair mortar", ["Micro-concrete","Free-flow","Pre-bagged","Structural","Deep-section"], "Pourable, self-compacting micro-concrete for deep-section structural reinstatement placed into formwork without vibration."],
  ["concrete-spalling/fairing-finishing-coats/FairingFinishingProductSection.tsx", "Fosroc / Parchem", "Fosroc", U.parchem, A.parchem, "Fosroc Renderoc FC", "Cementitious fairing coat (<=3 mm) for fair-faced finish", ["Fairing-coat","Finishing-coat","Cementitious","Pre-bagged","Hand-applied","Fine-finish"], "Thin cosmetic fairing coat to blowhole-fill and level a completed structural repair before a protective coating."],
  ["concrete-spalling/fairing-finishing-coats/FairingFinishingProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Mapefinish", "Two-component cementitious fairing / finishing coat", ["Fairing-coat","Finishing-coat","Cementitious","Pre-bagged","Hand-applied","Fine-finish"], "Two-component skim coat for fine finishing and levelling of repaired concrete before coating."],
  ["concrete-spalling/epoxy-repair-mortars/EpoxyMortarsProductSection.tsx", "Fosroc / Parchem Construction Supplies", "Fosroc", U.parchem, A.parchem, "Fosroc Nitomortar S", "Standard multi-part epoxy repair mortar", ["Epoxy","3-part","High-strength","Chemical-resistant"], "High-strength epoxy mortar for localised repair where chemical resistance and rapid strength gain are required."],
  ["concrete-spalling/epoxy-repair-mortars/EpoxyMortarsProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Eporip", "Solvent-free 2-part epoxy adhesive for old-to-new concrete bonding", ["Epoxy","2-part","High-strength"], "Structural epoxy bonding agent for old-to-new concrete and for sealing dormant cracks."],
  ["concrete-spalling/rebar-primers-inhibitors/RebarPrimersProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Mapefer 1K", "Single-component cementitious corrosion-inhibiting rebar primer", ["MCI-corrosion-inhibitor","Brush-applied","St2-surface","Carbonation","Chloride"], "Brush-applied anti-corrosion coating to exposed reinforcement before placing the repair mortar."],
  ["concrete-spalling/rebar-primers-inhibitors/RebarPrimersProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika MonoTop-1010", "Bonding primer and reinforcement corrosion-protection slurry", ["MCI-corrosion-inhibitor","Brush-applied","St2-surface","Carbonation","Chloride"], "Dual-purpose rebar corrosion-protection coat and bonding primer within the Sika MonoTop repair system."],
  ["concrete-spalling/bonding-agents-sbr-latex/BondingAgentsSBRProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Planicrete", "SBR synthetic-rubber latex bonding agent / mortar admixture", ["SBR-latex","Brush-applied","Roller-applied","Porous-concrete","Admixture","Slurry-coat"], "SBR latex gauging/bonding agent to improve adhesion and flexibility of site-mixed repair mortars and bonding slurries."],
  ["concrete-spalling/bonding-agents-sbr-latex/BondingAgentsSBRProductSection.tsx", "Fosroc / Parchem", "Fosroc", U.parchem, A.parchem, "Fosroc Nitobond EP", "Two-component epoxy bonding agent", ["Epoxy-bond","Brush-applied","Roller-applied","Dense-concrete"], "Two-component epoxy bonding bridge for old-to-new concrete where a high-strength structural bond is required."],
  // cementitious PRODUCTS mirror (also added to CARDS separately)
  ["concrete-spalling/cementitious-repair-mortars/CementitiousMortarsProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika MonoTop-412 NFG", "R4 fibre-reinforced structural repair mortar with corrosion inhibitor", ["Cementitious","Pre-bagged","Hand-applied","Trowel-grade"], "EN 1504-3 R4 structural patch repair mortar with an integral corrosion inhibitor for hand/trowel application."],
  ["concrete-spalling/cementitious-repair-mortars/CementitiousMortarsProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika MonoTop-352 NFG", "R3 fibre-reinforced lightweight hand-applied repair mortar", ["Cementitious","Pre-bagged","Hand-applied","Trowel-grade"], "EN 1504-3 R3 lightweight fibre-reinforced repair mortar for general hand-applied patching."],
  ["concrete-spalling/cementitious-repair-mortars/CementitiousMortarsProductSection.tsx", "Fosroc / Parchem", "Fosroc", U.parchem, A.parchem, "Fosroc Renderoc HB40", "High-build cementitious repair mortar, R3, ~45 MPa", ["Cementitious","Pre-bagged","Hand-applied","Trowel-grade"], "EN 1504-3 R3 high-build structural repair mortar for vertical and overhead patching."],
  ["concrete-spalling/cementitious-repair-mortars/CementitiousMortarsProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Mapegrout T60", "R4 sulphate-resistant fibre-reinforced thixotropic repair mortar", ["Cementitious","Pre-bagged","Hand-applied","Trowel-grade"], "EN 1504-3 R4 sulphate-resistant thixotropic repair mortar for structural reinstatement on vertical and overhead surfaces."],
  // ── reinforcement-corrosion ──
  ["reinforcement-corrosion/rebar-primers-inhibitors/RebarPrimersProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika Armatec 1C", "1-component cementitious bonding primer and rebar corrosion protection", ["1-part-cementitious","Bonding-agent","Rebar-primer","Brush-applied","Carbonation","Chloride"], "Single-component cementitious coat providing reinforcement corrosion protection and a bonding bridge for the repair mortar."],
  ["reinforcement-corrosion/epoxy-anchoring-adhesives/EpoxyAnchoringAdhesivesProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Mapefix EP 100", "Pure epoxy chemical anchor for rebar and threaded rod", ["AS-5216","Epoxy","Starter-bar","Threaded-rod","Cracked-concrete"], "Pure-epoxy injection anchor for post-installed starter bars and threaded rod (replaces the previously listed, non-existent Mapefox EW)."],
  ["reinforcement-corrosion/corrosion-inhibitors-mci/CorrosionInhibitorsMCIProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika FerroGard-901", "Corrosion-inhibiting concrete admixture (integral MCI)", ["Admixture","Amine-alcohol","Carbonation","Chloride"], "Integral amino-alcohol corrosion-inhibiting admixture added to repair mortar or concrete to slow reinforcement corrosion."],
  ["reinforcement-corrosion/cathodic-protection/CathodicProtectionProductSection.tsx", "Fosroc / Parchem", "Fosroc", U.parchem, A.parchem, "Fosroc Vector Galvashield XP2", "Embedded zinc galvanic discrete anode (higher output)", ["Galvanic-discrete","Chloride","Marine","Carpark","No-power"], "Embedded sacrificial zinc anode for incipient-anode (ring/halo) corrosion control around patch repairs, with higher output than XP."],
  ["reinforcement-corrosion/repair-mortars-polymer-modified/RepairMortarsPMRCProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Mapegrout T40", "Polymer-modified structural repair mortar (EN 1504-3 R3)", ["EN-1504-R3","1-component","Thixotropic","Vertical","Corrosion-repair"], "EN 1504-3 R3 thixotropic structural repair mortar for hand-applied patch repair on vertical surfaces."],
  // ── concrete-cracking ──
  ["concrete-cracking/injection-resins-epoxy-rigid/InjectionResinsEpoxyRigidProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Epojet LV", "Very-low-viscosity 2-component epoxy injection resin", ["Structural","Low-Viscosity","2-Component","Fine-Crack"], "Very-low-viscosity structural epoxy for injecting fine dormant cracks, including into slightly damp substrates."],
  ["concrete-cracking/injection-resins-epoxy-rigid/InjectionResinsEpoxyRigidProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika Sikadur-52 LP", "Long-pot-life low-viscosity 2-component epoxy injection resin", ["Structural","Low-Viscosity","2-Component","Fine-Crack"], "Long-pot-life low-viscosity structural epoxy for injecting fine to medium dormant cracks in larger sections."],
  ["concrete-cracking/injection-resins-pu-flexible/InjectionResinsPUFlexibleProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika Injection-111 + Injection-111C", "1-component hydrophobic water-reactive PU foam (with catalyst)", ["Hydrophobic","1-Component","Water-Active","Foaming","Flexible"], "Water-reactive hydrophobic PU foam (with Injection-111C catalyst) for sealing actively leaking cracks and water ingress."],
  ["concrete-cracking/injection-resins-pu-flexible/InjectionResinsPUFlexibleProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Resfoam 1KM", "1-component water-reactive foaming PU injection resin", ["Hydrophilic","1-Component","Water-Active","Foaming","Flexible"], "Water-reactive foaming PU resin for rapid water cut-off in wet, actively leaking cracks."],
  ["concrete-cracking/sealants-polyurethane/SealantsPUProductSection.tsx", "Fosroc / Parchem", "Fosroc", U.parchem, A.parchem, "Fosroc Nitoseal PU400", "1-component polyurethane trafficable expansion-joint sealant", ["PU-Sealant","1-Component","Exterior","Floor-Joint","Traffickable"], "Trafficable single-component PU joint sealant for movement and expansion joints, including AS 4020 potable-water contact (confirm)."],
  ["concrete-cracking/epoxy-anchoring-adhesives/EpoxyAnchoringAdhesivesCCProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika AnchorFix-3030", "2-part pure-epoxy injectable anchoring adhesive (AS 5216)", ["AS-5216","Epoxy","Dry-Hole","Damp-Hole","Crack-Stitching","Rebar-Dowelling"], "High-performance pure-epoxy injection adhesive for crack-stitching dowels and rebar dowelling per AS 5216."],
  ["concrete-cracking/epoxy-anchoring-adhesives/EpoxyAnchoringAdhesivesCCProductSection.tsx", "Ramset", "Ramset", U.ramset, A.other, "Ramset ChemSet Reo502 XTREM", "High-strength pure-epoxy anchoring adhesive (seismic C1/C2)", ["AS-5216","Epoxy","Dry-Hole","Damp-Hole","Crack-Stitching","Rebar-Dowelling"], "Pure-epoxy seismic-rated (C1/C2) anchoring adhesive for rebar dowelling and crack-stitching in cracked concrete."],
  ["concrete-cracking/repair-mortars-polymer-modified/RepairMortarsPMProductSection.tsx", "Sika Australia", "Sika", U.sika, A.sika, "Sika MonoTop-412 NFG", "1-component polymer-modified fibre-reinforced structural repair mortar (EN 1504-3 R4)", ["Crack-Fill","Vertical-Apply","High-Strength"], "EN 1504-3 R4 fibre-reinforced structural repair mortar for vertical patch repair around cracked/spalled zones."],
  ["concrete-cracking/repair-mortars-polymer-modified/RepairMortarsPMProductSection.tsx", "Ardex Australia", "Ardex", U.ardex, A.ardex, "ARDEX BR 340", "Polymer-modified cementitious concrete repair / patching mortar", ["Crack-Fill","Vertical-Apply","High-Strength"], "Polymer-modified fibre-reinforced repair/patching mortar for vertical and overhead concrete reinstatement."],
  // ── magnesite-flooring-deterioration ──
  ["magnesite-flooring-deterioration/floor-patching-compounds/FloorPatchingCompoundsProductSection.tsx", "Fosroc / Parchem", "Fosroc", U.parchem, A.parchem, "Fosroc Renderoc HB40", "Polymer-modified high-build cementitious repair mortar (EN 1504-3 R3)", ["Floor-Patching","Polymer-Modified","Magnesite","Pre-SLC"], "High-build polymer-modified mortar to reinstate deeper losses in an encapsulated magnesite floor before a levelling underlayment."],
  ["magnesite-flooring-deterioration/floor-patching-compounds/FloorPatchingCompoundsProductSection.tsx", "Ardex Australia", "Ardex", U.ardex, A.ardex, "Ardex A 38", "Rapid-set cementitious patching / screed mortar", ["Floor-Patching","Rapid-Set","Magnesite","Pre-SLC"], "Rapid-set cementitious patching/screed mortar for fast reinstatement and ramping before overlaying."],
  ["magnesite-flooring-deterioration/self-levelling-underlayments/SelfLevellingUnderlayProductSection.tsx", "Parchem", "Parchem", U.parchem, A.parchem, "Parchem Durafloor Leveltop Rapid", "Rapid trowellable / self-smoothing floor levelling underlayment", ["Cementitious","Rapid-Set","Floor-Levelling","Magnesite","3-20mm"], "Rapid self-smoothing underlayment to level an encapsulated/primed magnesite substrate before floor finishes."],
  ["magnesite-flooring-deterioration/self-levelling-underlayments/SelfLevellingUnderlayProductSection.tsx", "Ardex Australia", "Ardex", U.ardex, A.ardex, "Ardex K 55", "Rapid-drying cementitious self-levelling and smoothing compound", ["Cementitious","Rapid-Set","Floor-Levelling","Magnesite","3-20mm"], "Rapid-drying self-levelling compound for smoothing primed magnesite substrates ahead of resilient or tiled finishes."],
  // moisture-suppression PRODUCTS mirror (also added to MS_CARDS separately)
  ["magnesite-flooring-deterioration/moisture-suppression-primers/MoistureSupprimersPrimersProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Mapeproof Primer", "Two-part epoxy moisture barrier / DPM primer", ["2-Part-Epoxy","High-RH","Moisture-Control","Magnesite"], "Two-part epoxy moisture-vapour barrier over high-RH or encapsulated magnesite substrates before levelling."],
  ["magnesite-flooring-deterioration/moisture-suppression-primers/MoistureSupprimersPrimersProductSection.tsx", "Mapei Australia", "Mapei", U.mapei, A.mapei, "Mapei Triblock P", "Three-component epoxy-cementitious moisture / DPM primer", ["2-Part-Epoxy","High-RH","Moisture-Control","Magnesite"], "Three-component epoxy-cementitious moisture-tolerant primer/DPM for damp and high-RH floor substrates."],
  ["magnesite-flooring-deterioration/moisture-suppression-primers/MoistureSupprimersPrimersProductSection.tsx", "Ardex Australia", "Ardex", U.ardex, A.ardex, "Ardex WPM 300", "Two-part epoxy moisture vapour barrier", ["2-Part-Epoxy","High-RH","Moisture-Control","Magnesite"], "Two-part epoxy moisture-vapour barrier to control residual moisture before applying levelling compounds."],
];

let n = 0;
for (const e of E) {
  const [rel, fullLabel, brandShort, url, accent, name, type, tags, purpose] = e;
  const d = { fullLabel, brandShort, url, accent, name, type, tags, purpose };
  insertIntoArray(path.join(RS, rel), "PRODUCTS", productObj(d));
  n++;
  console.error(`+ ${name}  ->  ${rel}`);
}
console.error(`\nInserted ${n} product cards.`);
