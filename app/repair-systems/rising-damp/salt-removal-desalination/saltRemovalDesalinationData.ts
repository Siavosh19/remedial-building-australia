// ──────────────────────────────────────────────────────────────────────────────
// Salt removal & desalination — poultices / compresses (rising damp / salt attack).
// Hand-authored selection cards. Values from each product's manufacturer / AU
// source (cited per field). Desalination is a small product category — values not
// stated on the cited source are written "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Active material · Standard · Application ·
// Salts targeted · Treatment cycles · Substrate · Supply.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Active material", "Standard", "Application", "Salts targeted", "Treatment cycles", "Substrate", "Supply"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SALT_REMOVAL_CARDS: RefCard[] = [
  {
    brand: "Remmers Australia",
    rangeName: "Remmers Desalting Compress",
    shortType: "Mineral + cellulose desalting compress — WTA 3-13-01",
    badges: [{ label: "WTA 3-13-01", tone: "amber" }, { label: "Compress / poultice", tone: "navy" }, { label: "Mineral + cellulose", tone: "blue" }],
    appInfo: kp([
      "Capillary-active desalting compress (poultice)",
      "Active mineral constituents + cellulose",
      "WTA Code of Practice 3-13-01",
      "Mixed with water, applied wet; salts migrate into the compress and crystallise; removed mechanically when dry",
      "Soluble chloride / nitrate / sulfate",
      "Multiple cycles for heavy contamination",
      "Masonry, brick, stone",
      "Remmers Australia — CONFIRM AU pack",
    ]),
    bestFor: [
      "Non-destructive salt reduction to WTA Code of Practice 3-13-01 — a documented, specifiable method",
      "Capillary-active mineral/cellulose blend draws chloride, nitrate and sulfate salts into the compress, not back into the wall",
    ],
    avoidWhere: [
      "As a moisture treatment — address the rising damp / water source first (e.g. chemical DPC)",
      "Single application on heavily contaminated masonry — several cycles are usually needed",
    ],
    warnings: [
      "Reduces but does not fully eliminate salt — pre-test salt levels and re-test after treatment",
      "Carried out before renovation (WTA) plaster or breathable render — confirm mix ratio, thickness, dwell time and cycles from the Remmers TDS",
    ],
    advanced: {
      description:
        "Remmers Desalting Compress is a capillary-active poultice of active mineral constituents and cellulose for non-destructive reduction of soluble salt content in masonry, brick and stone, to WTA Code of Practice 3-13-01. Mixed with water and applied wet over the salt-affected substrate; as it dries, salt-laden pore water migrates into the more capillary-active compress where the salts crystallise, and the spent compress is removed mechanically. Multiple cycles may be required on heavily contaminated masonry. Desalting precedes renovation (WTA) plaster or breathable render. CONFIRM mix ratio, layer thickness, dwell time, number of cycles and current AU pack with Remmers Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Capillary-active desalting compress (poultice)", source: "Remmers — Desalting Compress (AU: Remmers Australia)" },
        { label: "Active material", value: "Active mineral constituents + cellulose", source: "Remmers — Desalting Compress" },
        { label: "Standard", value: "WTA Code of Practice 3-13-01", source: "Remmers — Desalting Compress" },
        { label: "Salts targeted", value: "Soluble chloride / nitrate / sulfate", source: "Remmers — Desalting Compress" },
        { label: "Substrate", value: "Masonry, brick, stone", source: "Remmers — Desalting Compress" },
        { label: "Mix ratio / thickness / dwell", value: "CONFIRM — not stated on the cited Remmers source" },
        { label: "AU pack", value: "CONFIRM — not stated (Remmers Australia)" },
      ],
    },
  },
  {
    brand: "Westox",
    rangeName: "Westox Cocoon",
    shortType: "Desalination poultice — masonry, brick, stone (AU)",
    badges: [{ label: "Desalination poultice", tone: "navy" }, { label: "AU supplier", tone: "amber" }, { label: "CONFIRM specs", tone: "rose" }],
    appInfo: kp([
      "Desalination poultice",
      "CONFIRM — composition not published (westox.com)",
      "CONFIRM — not stated (westox.com)",
      "Applied wet; draws soluble salts into the poultice as it dries; removed with the extracted salts",
      "Soluble salts (chloride / nitrate / sulfate)",
      "Multiple cycles for heavy contamination",
      "Brick, masonry, stone",
      "Westox / Westlegate (AU)",
    ]),
    bestFor: [
      "Australian-supplied desalination poultice for salt extraction from masonry, brick and stone facades",
      "Used before renovation plaster or coating to reduce salt contamination in the substrate",
    ],
    avoidWhere: [
      "As a substitute for treating the moisture source — rising damp / ingress must be treated first",
      "Single application on severely salt-contaminated substrates — multiple applications may be needed",
    ],
    warnings: [
      "Confirm current formulation, application method, coverage and number of cycles from the Westox Cocoon TDS",
      "Desalination reduces but does not eliminate salts in severely affected substrates",
    ],
    advanced: {
      description:
        "Westox Cocoon is a desalination poultice for salt removal from masonry, brick and stone, used to reduce chloride and sulfate salt concentrations in walls affected by rising damp, marine exposure or historical salt contamination before renovation plaster or coating. Applied wet, it draws soluble salts into the poultice as it dries and is then removed with the extracted salts; multiple applications may be required. Westox is an Australian supplier (Westlegate Pty Ltd). The product page does not publish composition, coverage or cycle detail — CONFIRM with Westox technical.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Desalination poultice", source: "westox.com — Westox Cocoon" },
        { label: "Salts targeted", value: "Soluble chloride / sulfate", source: "westox.com — Westox Cocoon" },
        { label: "Substrate", value: "Brick, masonry, stone", source: "westox.com — Westox Cocoon" },
        { label: "AU supplier", value: "Westox / Westlegate Pty Ltd", source: "westox.com" },
        { label: "Composition", value: "CONFIRM — not published on westox.com" },
        { label: "Application / coverage / cycles", value: "CONFIRM — not stated on westox.com" },
      ],
    },
  },
  {
    brand: "Conservation method",
    rangeName: "Traditional Clay / Cellulose Poultice (site-mixed)",
    shortType: "Site-mixed desalination poultice — conservation method",
    badges: [{ label: "Site-mixed", tone: "navy" }, { label: "Clay / cellulose", tone: "blue" }, { label: "Heritage", tone: "amber" }],
    appInfo: kp([
      "Site-mixed poultice (conservation method)",
      "Fine sepiolite / attapulgite clay and/or cellulose (paper-pulp) fibre",
      "No proprietary standard — conservation practice",
      "Applied wet; capillary draw of salt-laden pore water into the poultice as it dries; removed when dry",
      "Soluble salts (chloride / nitrate / sulfate)",
      "Multiple applications; long dwell (often weeks)",
      "Brick, masonry, stone",
      "Heritage / conservation material suppliers",
    ]),
    bestFor: [
      "Tailorable to the substrate — pore structure matched to the wall so drying (and salt transport) occurs into the poultice",
      "Used where proprietary compresses are unavailable or a bespoke conservation mix is preferred",
    ],
    avoidWhere: [
      "Where a documented, specifiable proprietary method is required — use a WTA compress (Remmers)",
      "Without treating the moisture source first — rising damp / ingress must be addressed",
    ],
    warnings: [
      "Performance is mix- and workmanship-dependent — requires conservation experience to tune to the substrate",
      "Pre- and post-treatment salt sampling recommended to confirm reduction",
    ],
    advanced: {
      description:
        "The traditional conservation method for desalinating brick and stone is a site-mixed poultice of fine clay (sepiolite or attapulgite) and/or cellulose (paper-pulp) fibre — sometimes with talc, chalk or lime — applied wet to the salt-affected surface. As it dries it draws salt-laden pore water outward by capillary action and the salts crystallise within the poultice rather than the masonry; the dried poultice is then removed. Effectiveness depends on matching the poultice pore size to the substrate. Used in heritage / conservation work before renovation plaster or lime render reinstatement. Pre- and post-treatment salt sampling is recommended.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Site-mixed poultice (conservation method)", source: "conservation practice (e.g. buildingconservation.com)" },
        { label: "Active material", value: "Sepiolite / attapulgite clay and/or cellulose (paper pulp)", source: "conservation practice" },
        { label: "Mechanism", value: "Capillary draw of salt-laden pore water into the poultice; salts crystallise in the poultice", source: "conservation practice" },
        { label: "Substrate", value: "Brick, masonry, stone", source: "conservation practice" },
        { label: "Standard", value: "No proprietary standard — conservation practice" },
        { label: "Mix / dwell / cycles", value: "CONFIRM — tailored per conservation specification" },
      ],
    },
  },
];

export const SALT_REMOVAL_SELECTORS = [
  { product_id: "remmers_desalting_compress", category: "salt-removal-desalination", type: "compress_poultice", active_material: "mineral_cellulose", standard: ["WTA_3-13-01"], salts_targeted: ["chloride", "nitrate", "sulfate"], cycles: "multiple", substrate: ["brick", "masonry", "stone"], au_distributor: "Remmers Australia", source_tds_url: "https://en.remmers.com/en_IN/building-floor-protection/building-preservation-and-monument-conservation/desalination/desalting-compress", confidence: "confirmed" },
  { product_id: "westox_cocoon", category: "salt-removal-desalination", type: "poultice", active_material: null, standard: [], salts_targeted: ["chloride", "sulfate"], cycles: "multiple", substrate: ["brick", "masonry", "stone"], au_distributor: "Westox / Westlegate Pty Ltd", source_tds_url: "https://westox.com/product/westox-cocoon/", confidence: "needs_confirmation" },
  { product_id: "traditional_clay_cellulose_poultice", category: "salt-removal-desalination", type: "site_mixed_poultice", active_material: "sepiolite_attapulgite_cellulose", standard: [], salts_targeted: ["chloride", "nitrate", "sulfate"], cycles: "multiple", substrate: ["brick", "masonry", "stone"], au_distributor: "conservation suppliers", source_tds_url: "https://www.buildingconservation.com/articles/poultices/poultice.htm", confidence: "needs_confirmation" },
];
