// ──────────────────────────────────────────────────────────────────────────────
// Liquid-applied PU / PU-hybrid waterproofing membranes — hand-authored selection
// cards (balcony / wet-area / podium waterproofing). Values from the CURRENT
// AUSTRALIAN manufacturer source (product page / TDS); "CONFIRM (… AU TDS)" = not
// stated on the AU source — never guessed. Selection discriminators differ from
// concrete repair: chemistry & carrier (moisture-cured vs water-based vs solvent),
// AS 4858 elongation class, AS 4654 external rating, build/DFT, UV/exposure class.
//
// appInfo carries the comparison columns: Chemistry · AS 4858 class · External
// (AS 4654) · Build · Coverage · Finish/exposure · Primer.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Chemistry", "AS 4858 class", "External (AS 4654)", "Build", "Coverage", "Finish / exposure", "Primer", "Class 2 / NCC tested", "Warranty"];
// Class 2 / NCC tested = documented AU test evidence (named CSIRO/BRANZ report,
// CodeMark, or CSIRO assessment) to AS 4858 / AS 4654 / AS 3740 — defaults to "N/A"
// (= not confirmed, never a claim). Warranty defaults to a CONFIRM (warranty terms
// are usually system/applicator-based) — filled during the end certification pass.
const DEFAULTS: Record<number, string> = { 7: "N/A", 8: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "N/A" }));

export const PU_MEMBRANE_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 157",
    shortType: "1-component moisture-cured polyurethane membrane",
    badges: [{ label: "Moisture-cured PU", tone: "navy" }, { label: "AS 4858 + AS 4654", tone: "blue" }],
    appInfo: kp([
      "1-component moisture-cured polyurethane",
      "CONFIRM (Ardex AU TDS)",
      "Yes — AS 4654 compliant",
      "1.2 mm total DFT — coats CONFIRM",
      "1.04 kg/m² (~9–10 m² / 20 kg)",
      "Under tile / screed; continuous-UV CONFIRM",
      "Mandatory — ARDEX WPM 300 or WPM 270",
      "AS 4858 (III) + AS 4654.1 — CSIRO/BRANZ test reports",
    ]),
    bestFor: [
      "Dual AS 4858 (wet-area) + AS 4654 (external above-ground) compliance — one membrane for balcony and wet-area use",
      "Fast 4–6 h recoat and 24 h return to service — programme advantage on occupied strata",
    ],
    avoidWhere: [
      "Application to an unprimed substrate — WPM 300 / WPM 270 primer is mandatory",
      "Continuous-UV / fully-exposed trafficable use — confirm suitability against the current Ardex AU TDS",
    ],
    warnings: [
      "Moisture-cured PU — NOT water-based; confirm ventilation / VOC for enclosed spaces from the SDS",
      "Achieve the full 1.2 mm DFT — under-thickness fails AS 4858; confirm reinforcing fabric/tape at junctions",
    ],
    advanced: {
      description:
        "ARDEX WPM 157 is a single-component, moisture-cured polyurethane waterproofing membrane compliant to AS 4858 (wet area) and AS 4654 (external above-ground), applied over an ARDEX WPM 300 or WPM 270 primer to a total 1.2 mm dry film thickness (≈1.04 kg/m², ~9–10 m² per 20 kg pail). Recoat 4–6 h; return to service 24 h. CONFIRM AS 4858 class, coat count and continuous-UV/trafficable suitability against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-component moisture-cured polyurethane", source: "ardexaustralia.com WPM 157" },
        { label: "Standards", value: "AS 4858 (wet area) + AS 4654 (external)", source: "ardexaustralia.com WPM 157" },
        { label: "AS 4858 class", value: "CONFIRM — see AS 4858 BRANZ report", source: "ardexaustralia.com WPM 157" },
        { label: "Total DFT", value: "1.2 mm", source: "ardexaustralia.com WPM 157" },
        { label: "Consumption", value: "1.04 kg/m² (~9–10 m² / 20 kg)", source: "ardexaustralia.com WPM 157" },
        { label: "Recoat", value: "4–6 h", source: "ardexaustralia.com WPM 157" },
        { label: "Return to service", value: "24 h", source: "ardexaustralia.com WPM 157" },
        { label: "Primer", value: "WPM 300 or WPM 270 (mandatory)", source: "ardexaustralia.com WPM 157" },
        { label: "Pack / colour", value: "20 kg pail (15.4 L) · grey", source: "ardexaustralia.com WPM 157" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 155 Rapid Plus",
    shortType: "1-part water-based PU-acrylic hybrid — rapid recoat",
    badges: [{ label: "Water-based PU-acrylic", tone: "blue" }, { label: "Class III", tone: "navy" }],
    appInfo: kp([
      "1-part water-based PU-acrylic hybrid",
      "Class III (AS/NZS 4858)",
      "Yes — AS 4654 + AS 4858",
      "Coats / DFT CONFIRM (Ardex AU TDS)",
      "~1.1 m²/L (15 L → 17.5 m²)",
      "Under tile (rapid recoat)",
      "CONFIRM (Ardex AU TDS)",
      "AS 4858 (III) + AS 4654 — BRANZ test reports",
    ]),
    bestFor: [
      "Class III membrane with a ~4 h dry — rapid recoat for programme-critical occupied strata",
      "STB tape detailing eliminates the need for a separate bond-breaker at junctions",
    ],
    avoidWhere: [
      "Specifications calling for pure polyurethane elongation — this is a PU-acrylic hybrid, not pure PU",
      "Conditions outside the AS 4858 wet-area / AS 4654 external scope — confirm exposure on the TDS",
    ],
    warnings: [
      "PU-ACRYLIC HYBRID (not pure PU) — corrects prior labelling; confirm movement/elongation suits the design",
      "Confirm primer, coat count and total DFT against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 155 Rapid Plus is a single-part, water-based polyurethane-acrylic hybrid membrane, Class III to AS/NZS 4858 and compliant with AS 4654, with a rapid ~4 h dry (at 23 °C). Coverage ≈1.1 m²/L (15 L → ~17.5 m²); STB tape removes the need for a bond breaker. Packs 5.3 kg (~4 L) and 20 kg (~15 L). CONFIRM primer, coat count and DFT against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-part water-based PU-acrylic hybrid", source: "ardexaustralia.com WPM 155 Rapid Plus" },
        { label: "AS 4858 class", value: "Class III", source: "ardexaustralia.com WPM 155 Rapid Plus" },
        { label: "External", value: "AS 4654 compliant", source: "ardexaustralia.com WPM 155 Rapid Plus" },
        { label: "Coverage", value: "~1.1 m²/L (15 L → 17.5 m²)", source: "ardexaustralia.com WPM 155 Rapid Plus" },
        { label: "Dry time", value: "~4 h @ 23 °C", source: "ardexaustralia.com WPM 155 Rapid Plus" },
        { label: "Detailing", value: "STB tape — no bond breaker needed", source: "ardexaustralia.com WPM 155 Rapid Plus" },
        { label: "Pack / colour", value: "5.3 kg (~4 L) / 20 kg (~15 L) · CONFIRM colour", source: "ardexaustralia.com WPM 155 Rapid Plus" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 130 Builders Express",
    shortType: "1-part water-based modified PU-acrylic — undertile",
    badges: [{ label: "Water-based PU-acrylic", tone: "blue" }, { label: "Class III", tone: "navy" }],
    appInfo: kp([
      "1-part water-based modified PU-acrylic",
      "Class III (AS/NZS 4858)",
      "CONFIRM (Ardex AU TDS)",
      "1.0 mm; tile over within ~4 h",
      "CONFIRM (Ardex AU TDS)",
      "Under tile (domestic / light commercial)",
      "CONFIRM (Ardex AU TDS)",
      "AS 4858 (III) + AS 4654 — BRANZ test reports",
    ]),
    bestFor: [
      "Class III undertile membrane that can be tiled over within ~4 h — fast domestic/light-commercial turnaround",
      "Easy single-part water-based application",
    ],
    avoidWhere: [
      "High-movement or fully-exposed external decks — confirm external/AS 4654 scope on the TDS",
      "Where a pure-PU high-elongation membrane is specified",
    ],
    warnings: [
      "PU-acrylic hybrid — lower elongation than pure PU; confirm against the design movement",
      "Confirm primer, coverage and external rating against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 130 Builders Express is a single-part, water-based modified polyurethane-acrylic undertile membrane, Class III to AS/NZS 4858, applied at 1.0 mm and tileable within ~4 h, for domestic and light-commercial wet areas and balconies. CONFIRM external (AS 4654) rating, primer and coverage against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-part water-based modified PU-acrylic", source: "ardexaustralia.com WPM 130" },
        { label: "AS 4858 class", value: "Class III", source: "ardexaustralia.com WPM 130" },
        { label: "Build", value: "1.0 mm; tile over within ~4 h", source: "ardexaustralia.com WPM 130" },
        { label: "External (AS 4654)", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com WPM 130" },
        { label: "Primer / coverage", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com WPM 130" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikalastic-487",
    shortType: "1-component solvent-based moisture-cured PU — under-screed",
    badges: [{ label: "Solvent moisture-cured PU", tone: "navy" }, { label: "Class III >300%", tone: "blue" }],
    appInfo: kp([
      "1-component solvent-based moisture-cured PU",
      "Class III (>300% elongation)",
      "Yes — AS 4654.1",
      "1.2 mm DFT / 2 coats (680 µm WFT/coat)",
      "CONFIRM (per 1.2 mm; 15 L pail)",
      "Under-screed / podium / deck — NON-UV",
      "Sikalastic PU Primer / Moisture Seal",
    ]),
    bestFor: [
      "High elongation (Class III, >300%) with high resistance to stagnant water — strong crack-bridging under screeds",
      "Tensile >2 MPa; light foot traffic and screed application after 24 h",
    ],
    avoidWhere: [
      "Continuous UV exposure — this is a NON-UV (covered/under-screed) membrane",
      "Damp substrates above ~5% moisture content",
    ],
    warnings: [
      "SOLVENT-BASED (VOC 180 g/L) — confirm ventilation / occupied-space suitability from the SDS",
      "Requires a Sika primer (PU Primer / Moisture Seal); substrate ≤5% moisture, +5 to +35 °C",
    ],
    advanced: {
      description:
        "Sika Sikalastic-487 is a single-pack, solvent-based moisture-curing elastomeric polyurethane, Class III (>300% elongation) to AS/NZS 4858 and AS 4654.1, with high resistance to stagnant water and tensile >2 MPa. Applied by brush/roller in 2 coats (680 µm WFT/coat) to 1.2 mm DFT over a Sika PU Primer / Moisture Seal; substrate ≤5% moisture, +5 to +35 °C. NON-UV — for under-screed wet areas, balconies, podiums and decks. VOC 180 g/L; 15 L; grey; shelf life 9 months.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-component solvent-based moisture-cured PU", source: "aus.sika.com Sikalastic-487" },
        { label: "AS 4858 class", value: "Class III (>300% elongation)", source: "aus.sika.com Sikalastic-487" },
        { label: "External", value: "AS 4654.1", source: "aus.sika.com Sikalastic-487" },
        { label: "Tensile", value: ">2 MPa", source: "aus.sika.com Sikalastic-487" },
        { label: "Build", value: "1.2 mm DFT / 2 coats (680 µm WFT/coat)", source: "aus.sika.com Sikalastic-487" },
        { label: "Cure", value: "Full cure 24 h; light traffic/screed after 24 h", source: "aus.sika.com Sikalastic-487" },
        { label: "Primer", value: "Sikalastic PU Primer / Moisture Seal / diluted 487", source: "aus.sika.com Sikalastic-487" },
        { label: "Substrate / temp", value: "≤5% moisture · +5 to +35 °C", source: "aus.sika.com Sikalastic-487" },
        { label: "VOC / pack", value: "180 g/L · 15 L · grey · shelf 9 months", source: "aus.sika.com Sikalastic-487" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "SikaTile-110 Secure Proof",
    shortType: "Fibre-reinforced water-based PU — undertile (RTU)",
    badges: [{ label: "Water-based PU", tone: "blue" }, { label: "Fibre-reinforced Class III", tone: "navy" }],
    appInfo: kp([
      "Fibre-reinforced water-based PU (ready-to-use)",
      "Class III",
      "Yes — AS 4654:2012 + AS 4858:2004",
      "1.0 mm DFT / ≥2 coats (0.75 mm WFT/coat)",
      "~10 m² / 15 L",
      "Under tile / stone — walls & floors",
      "CONFIRM (Sika AU TDS)",
      "AS 4858 + AS 4654.1 — BRANZ certs (DCDC13205-003 / DC14429-03)",
    ]),
    bestFor: [
      "Fibre-reinforced, ready-to-use water-based PU — simple undertile application on walls and floors",
      "Dual AS 4654:2012 + AS 4858:2004 compliance, internal and external",
    ],
    avoidWhere: [
      "Exposed UV / trafficable finishes — this is an undertile membrane",
      "Below the minimum 1.0 mm DFT (≥2 coats) — under-thickness fails AS 4858",
    ],
    warnings: [
      "Confirm primer requirement and substrate prep against the current Sika Australia TDS",
      "Achieve the full 1.0 mm DFT in ≥2 coats at 0.75 mm WFT per coat",
    ],
    advanced: {
      description:
        "SikaTile-110 Secure Proof is a Class III, fibre-reinforced, ready-to-use, water-based polyurethane undertile membrane complying with AS/NZS 4654:2012 and AS 4858:2004, for internal and external walls and floors under tile and stone. Minimum 1.0 mm DFT in ≥2 coats (0.75 mm WFT/coat); a 15 L pail covers ~10 m². CONFIRM primer requirement against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Fibre-reinforced water-based PU (RTU)", source: "aus.sika.com SikaTile-110 Secure Proof" },
        { label: "AS 4858 class", value: "Class III", source: "aus.sika.com SikaTile-110 Secure Proof" },
        { label: "Standards", value: "AS 4654:2012 + AS 4858:2004", source: "aus.sika.com SikaTile-110 Secure Proof" },
        { label: "Build", value: "1.0 mm DFT / ≥2 coats (0.75 mm WFT/coat)", source: "aus.sika.com SikaTile-110 Secure Proof" },
        { label: "Coverage", value: "~10 m² / 15 L", source: "aus.sika.com SikaTile-110 Secure Proof" },
        { label: "Use", value: "Under tile/stone — walls & floors, int/ext", source: "aus.sika.com SikaTile-110 Secure Proof" },
        { label: "Pack / colour", value: "15 L · grey", source: "aus.sika.com SikaTile-110 Secure Proof" },
      ],
    },
  },
  {
    brand: "Davco / Sika Australia",
    rangeName: "Davco K10 Plus",
    shortType: "Water-based polyurethane — premixed undertile (RTU)",
    badges: [{ label: "Water-based PU", tone: "blue" }, { label: "Class III", tone: "navy" }],
    appInfo: kp([
      "Water-based polyurethane (premixed RTU)",
      "Class III",
      "Yes — internal & external",
      "≥1.0 mm dried; coats 1–2 h apart at 90°",
      "CONFIRM (Davco AU TDS)",
      "Under tile / stone & resilient finishes",
      "CONFIRM (Davco AU TDS)",
      "AS 4858 + AS 4654.1 — BRANZ reports (DC13205-001 / DC14429-04)",
    ]),
    bestFor: [
      "Premixed, ready-to-use water-based PU — fast, low-skill undertile application",
      "Class III flexibility for internal and external wet areas, terraces, balconies, roofs and walkways",
    ],
    avoidWhere: [
      "Exposed UV trafficable use without a tile/stone or resilient finish over it",
      "Below the minimum 1.0 mm dried thickness",
    ],
    warnings: [
      "Confirm primer requirement and coverage against the current Davco / Sika Australia TDS",
      "Apply coats at 90° to each other, 1–2 h apart; allow 6–8 h drying before tiling",
    ],
    advanced: {
      description:
        "Davco K10 Plus is a premium, flexible, premixed ready-to-use, water-based polyurethane Class III waterproofing membrane for under tile, stone and resilient finishes, internal and external (wet areas, terraces, balconies, roofs, walkways). Apply coats ~1–2 h apart at 90° to a minimum dried thickness of 1.0 mm; 6–8 h drying before tiling. CONFIRM primer and coverage against the current Davco / Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Water-based polyurethane (premixed RTU)", source: "aus.sika.com Davco K10 Plus" },
        { label: "AS 4858 class", value: "Class III", source: "aus.sika.com Davco K10 Plus" },
        { label: "Build", value: "≥1.0 mm dried; coats 1–2 h apart at 90°", source: "aus.sika.com Davco K10 Plus" },
        { label: "Tile over", value: "6–8 h drying before tiling", source: "aus.sika.com Davco K10 Plus" },
        { label: "Use", value: "Under tile/stone & resilient — int/ext", source: "aus.sika.com Davco K10 Plus" },
        { label: "Primer / coverage", value: "CONFIRM (Davco AU TDS)", source: "aus.sika.com Davco K10 Plus" },
      ],
    },
  },
  {
    brand: "Bostik Australia",
    rangeName: "Bostik Dampfix PU",
    shortType: "1-component polyurethane — bitumen-free undertile",
    badges: [{ label: "Polyurethane (bitumen-free)", tone: "navy" }, { label: "Class III", tone: "blue" }],
    appInfo: kp([
      "1-component polyurethane (no bitumen)",
      "Class III",
      "CONFIRM (Bostik AU TDS)",
      "2-coat system — DFT CONFIRM",
      "CONFIRM (Bostik AU TDS)",
      "Under tile — primed porous & non-porous",
      "Required — Bostik primer (CONFIRM)",
    ]),
    bestFor: [
      "Highly elastic Class III PU with no bitumen — broad substrate range (concrete, render, FC sheet, plasterboard, structural ply)",
      "Two-coat system over primed porous and non-porous substrates",
    ],
    avoidWhere: [
      "Unprimed substrates — primer required on porous and non-porous alike",
      "Exposed UV trafficable use — confirm external scope on the TDS",
    ],
    warnings: [
      "Confirm AS 4654 external rating, DFT, coverage and primer against the current Bostik Australia TDS",
      "Two-coat minimum — confirm wet/dry film thickness per coat",
    ],
    advanced: {
      description:
        "Bostik Dampfix PU is a one-component, highly elastic, Class III polyurethane waterproofing membrane that contains no bitumen and complies with AS/NZS 4858. It is a 2-coat system applied over primed porous and non-porous substrates (concrete, cement-rendered masonry, FC sheeting, plasterboard, structural plywood). CONFIRM external (AS 4654) rating, DFT, coverage and the specific Bostik primer against the current Bostik Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-component polyurethane (bitumen-free)", source: "bostik.com AU Dampfix PU" },
        { label: "AS 4858 class", value: "Class III", source: "bostik.com AU Dampfix PU" },
        { label: "Build", value: "2-coat system — DFT CONFIRM", source: "bostik.com AU Dampfix PU" },
        { label: "Substrates", value: "Primed concrete / render / FC / plasterboard / ply", source: "bostik.com AU Dampfix PU" },
        { label: "External / primer / coverage", value: "CONFIRM (Bostik AU TDS)", source: "bostik.com AU Dampfix PU" },
      ],
    },
  },
  {
    brand: "Bostik Australia",
    rangeName: "Bostik Dampfix Platinum",
    shortType: "1-part water-based PU — rapid-drying, UV-resistant",
    badges: [{ label: "Water-based PU (rapid)", tone: "blue" }, { label: "Class III", tone: "navy" }],
    appInfo: kp([
      "1-part water-based polyurethane (rapid-dry)",
      "Class III",
      "Yes — internal & external",
      "Recoat 1–2 h; DFT CONFIRM",
      "CONFIRM (Bostik AU TDS)",
      "Under tile; UV-resistant; bridges cracks to 2 mm",
      "CONFIRM (Bostik AU TDS)",
      "AS 4858 / AS 3740 — BRANZ certified",
    ]),
    bestFor: [
      "Rapid 1–2 h recoat — fast all-in-one water-based PU for programme-critical work",
      "UV-resistant and crack-bridging to 2 mm; internal and external; low VOC",
    ],
    avoidWhere: [
      "Where a solvent/pure-PU high-elongation membrane is specified for heavy movement",
      "Below the required DFT — fast dry does not compensate for thin film",
    ],
    warnings: [
      "Confirm DFT, coats, coverage and primer against the current Bostik Australia TDS",
      "Meets AS 3740 via AS/NZS 4858 — confirm the wet-area system detailing",
    ],
    advanced: {
      description:
        "Bostik Dampfix Platinum is an all-in-one, one-component, rapid-drying water-based polyurethane Class III membrane meeting AS 3740 through AS/NZS 4858, with a 1–2 h recoat, UV resistance, low VOC and crack-bridging up to 2 mm, for internal and external use with good adhesion to concrete, cement sheeting and plasterboard. CONFIRM DFT, coverage and primer against the current Bostik Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-part water-based polyurethane (rapid-dry)", source: "bostik.com AU Dampfix Platinum TDS" },
        { label: "AS 4858 class", value: "Class III (meets AS 3740 via AS/NZS 4858)", source: "bostik.com AU Dampfix Platinum TDS" },
        { label: "Recoat", value: "1–2 h", source: "bostik.com AU Dampfix Platinum TDS" },
        { label: "Crack-bridging", value: "Up to 2 mm", source: "bostik.com AU Dampfix Platinum TDS" },
        { label: "Use", value: "Internal & external; UV-resistant; low VOC", source: "bostik.com AU Dampfix Platinum TDS" },
        { label: "DFT / primer / coverage", value: "CONFIRM (Bostik AU TDS)", source: "bostik.com AU Dampfix Platinum TDS" },
      ],
    },
  },
  {
    brand: "Tremco CPG Australia",
    rangeName: "Tremco Vulkem 350R",
    shortType: "Exposed UV-stable PU deck-coating system (trafficable)",
    badges: [{ label: "UV-stable PU system", tone: "navy" }, { label: "AS 4654.1 exposed", tone: "blue" }],
    appInfo: kp([
      "Polyurethane deck-coating system (rollable)",
      "CONFIRM — tested to AS 4654.1",
      "Yes — AS 4654.1 (exposed)",
      "Multi-coat (base / wear / top) — DFT CONFIRM",
      "CONFIRM (Tremco AU TDS)",
      "EXPOSED, UV-stable, light pedestrian traffic",
      "CONFIRM (Tremco AU TDS)",
    ]),
    bestFor: [
      "UV-stable, exposed trafficable deck system — for moderate pedestrian traffic without a tile/screed cover",
      "Tough multi-coat build (flexible base + aggregate wear coat + UV-stable top); return to service ~12 h",
    ],
    avoidWhere: [
      "Undertile wet-area use where an AS 4858 Class membrane is specified (different use class)",
      "Heavy vehicular trafficking unless confirmed by Tremco for the loading",
    ],
    warnings: [
      "This is an exposed deck COATING SYSTEM, not an undertile membrane — confirm the full coat build and primer",
      "Confirm AS 4858 applicability, DFT and coverage against the current Tremco Australia TDS",
    ],
    advanced: {
      description:
        "Tremco Vulkem 350R is a rollable, low-VOC, UV-stable polyurethane waterproofing deck-coating system for exposed surfaces with moderate pedestrian traffic — a flexible polyurethane base coat, an aggregate-laden wear coat and a UV-stable top coat. Return to service ~12 h; tested to AS 4654.1 for external waterproofing under the NCC. CONFIRM the full coat build, DFT, coverage, primer and any AS 4858 applicability against the current Tremco Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "PU deck-coating system (base/wear/top)", source: "tremco.com.au Vulkem 350R" },
        { label: "External", value: "Tested to AS 4654.1", source: "tremco.com.au Vulkem 350R" },
        { label: "Exposure", value: "Exposed, UV-stable, moderate foot traffic", source: "tremco.com.au Vulkem 350R" },
        { label: "Return to service", value: "~12 h", source: "tremco.com.au Vulkem 350R" },
        { label: "Build / coverage / primer", value: "CONFIRM (Tremco AU TDS)", source: "tremco.com.au Vulkem 350R" },
      ],
    },
  },
  {
    brand: "Gripset Industries",
    rangeName: "Gripset P39",
    shortType: "Fibre-enhanced hybrid PU — undertile or exposed light-traffic",
    badges: [{ label: "Hybrid PU (fibre)", tone: "navy" }, { label: "Class III >300%", tone: "blue" }],
    appInfo: kp([
      "Fibre-enhanced hybrid polyurethane",
      "Class III (>300%)",
      "Yes — AS 4654.1",
      "Coats / DFT CONFIRM; tile after 24 h",
      "CONFIRM (Gripset AU TDS)",
      "Under-tile OR exposed light-trafficable",
      "Required — primed surfaces",
    ]),
    bestFor: [
      "Withstands early water ponding and permanently-wet conditions without re-emulsification — strong for wet planters/podiums",
      "Class III (>300%) fibre-enhanced hybrid; low vapour transmission (WVTR 1.6 g/m²/24 h); under-tile or exposed light-trafficable",
    ],
    avoidWhere: [
      "Application to unprimed surfaces — P39 requires a primed substrate",
      "Heavy trafficking — rated for light foot traffic only when exposed",
    ],
    warnings: [
      "Confirm coats, DFT, coverage and the correct Gripset primer against the current Gripset AU TDS",
      "Minimum 24 h dry before tiling",
    ],
    advanced: {
      description:
        "Gripset P39 is a fibre-enhanced hybrid polyurethane membrane, Class III (>300% elongation) to AS 4858 and AS 4654.1, with a low water-vapour transmission rate (1.6 g/m²/24 h) and the ability to withstand early water ponding and permanently-wet conditions without re-emulsification. Used under tile or as an exposed, light-trafficable membrane over primed surfaces; minimum 24 h before tiling; 15 L pail (grey). CONFIRM coats, DFT, coverage and primer against the current Gripset Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Fibre-enhanced hybrid polyurethane", source: "gripset.com Gripset P39" },
        { label: "AS 4858 class", value: "Class III (>300%)", source: "gripset.com Gripset P39" },
        { label: "External", value: "AS 4654.1", source: "gripset.com Gripset P39" },
        { label: "WVTR", value: "1.6 g/m²/24 h", source: "gripset.com Gripset P39" },
        { label: "Wet performance", value: "Early ponding + permanently-wet, no re-emulsification", source: "gripset.com Gripset P39" },
        { label: "Use / tile over", value: "Under-tile or exposed light-traffic; 24 h before tiling", source: "gripset.com Gripset P39" },
        { label: "Primer / pack", value: "Primed surfaces · 15 L · grey · coverage CONFIRM", source: "gripset.com Gripset P39" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikalastic WPU",
    shortType: "Water-based polyurethane membrane",
    badges: [{ label: "Water-based PU", tone: "blue" }],
    appInfo: kp([
      "Water-based polyurethane",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
    ]),
    bestFor: [
      "Water-based polyurethane membrane in the Sika liquid-applied range — low-odour water-based application",
    ],
    avoidWhere: [
      "Specification without confirming the current data — most values not retrievable from the AU page at time of writing",
    ],
    warnings: [
      "All performance values CONFIRM against the current Sika Australia Sikalastic WPU TDS before specifying",
    ],
    advanced: {
      description:
        "Sika Sikalastic WPU is a water-based polyurethane waterproofing membrane in Sika Australia's water-based membrane range. The current AU product page/PDF was not retrievable at time of writing — CONFIRM chemistry detail, AS 4858 class, AS 4654 rating, build/DFT, coverage, primer and pack sizes against the current Sika Australia Sikalastic WPU TDS before specifying.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Water-based polyurethane", source: "aus.sika.com Sikalastic WPU (range)" },
        { label: "All other fields", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com Sikalastic WPU — AU page CONFIRM" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitoproof 750",
    shortType: "1-component moisture-cured polyurethane membrane",
    badges: [{ label: "Moisture-cured PU", tone: "navy" }],
    appInfo: kp([
      "1-component moisture-cured polyurethane",
      "CONFIRM (Fosroc AU TDS)",
      "Yes — AS 4654.1 (CSIRO tested)",
      "CONFIRM (Fosroc AU TDS)",
      "CONFIRM (Fosroc AU TDS)",
      "CONFIRM (Fosroc AU TDS)",
      "CONFIRM (Fosroc AU TDS)",
      "AS 4654.1 — CSIRO test report SW8554",
    ]),
    bestFor: [
      "Single-component moisture-cured PU that cures by reaction with atmospheric moisture to a tough elastomeric membrane",
    ],
    avoidWhere: [
      "Enclosed/poorly-ventilated spaces without confirming carrier/VOC (moisture-cured PU is typically solvent-borne)",
    ],
    warnings: [
      "Confirm AS 4858 class, AS 4654.1 rating, build/DFT, coverage and primer against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitoproof 750 is a single-component polyurethane liquid that cures by reaction with atmospheric moisture to give a tough elastomeric waterproof membrane (Parchem Construction Supplies, AU). CONFIRM AS 4858 class, AS 4654.1 rating, DFT, coverage, primer and pack sizes against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-component moisture-cured polyurethane", source: "fosroc.com.au Nitoproof 750" },
        { label: "Standards / build / primer", value: "CONFIRM (Fosroc AU TDS)", source: "fosroc.com.au Nitoproof 750" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitoproof 810",
    shortType: "1-component water-based polyurethane membrane",
    badges: [{ label: "Water-based PU", tone: "blue" }, { label: "AS 4654.1", tone: "navy" }],
    appInfo: kp([
      "1-component water-based polyurethane",
      "CONFIRM (Fosroc AU TDS)",
      "Yes — AS 4654.1",
      "1.5 mm total WFT / 2 coats @ 0.75 mm",
      "1.5 L/m² (2 coats)",
      "CONFIRM (Fosroc AU TDS)",
      "CONFIRM (Fosroc AU TDS)",
      "AS 4858 + AS 4654.1 — test certificates",
    ]),
    bestFor: [
      "Single-component water-based PU complying with AS 4654.1 for external above-ground waterproofing",
      "Defined build: 1.5 L/m² in 2 coats at 0.75 mm to a 1.5 mm total wet film thickness",
    ],
    avoidWhere: [
      "Where an AS 4858 wet-area Class rating is required — confirm classification on the TDS",
    ],
    warnings: [
      "Confirm AS 4858 class, primer, finish/exposure and substrate prep against the current Fosroc / Parchem TDS",
      "Apply the full 1.5 mm WFT (2 coats @ 0.75 mm) — under-thickness fails AS 4654.1",
    ],
    advanced: {
      description:
        "Fosroc Nitoproof 810 is a water-based, single-component polyurethane membrane for a wide range of waterproofing applications, complying with AS/NZS 4654.1:2012, applied in 2 coats at 0.75 mm to a total minimum 1.5 mm WFT (1.5 L/m²). CONFIRM AS 4858 class, primer, finish/exposure and pack sizes against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-component water-based polyurethane", source: "fosroc.com.au Nitoproof 810" },
        { label: "External", value: "AS 4654.1:2012", source: "fosroc.com.au Nitoproof 810" },
        { label: "Build", value: "1.5 mm total WFT / 2 coats @ 0.75 mm", source: "fosroc.com.au Nitoproof 810" },
        { label: "Coverage", value: "1.5 L/m² (2 coats)", source: "fosroc.com.au Nitoproof 810" },
        { label: "AS 4858 class / primer", value: "CONFIRM (Fosroc AU TDS)", source: "fosroc.com.au Nitoproof 810" },
      ],
    },
  },
];
