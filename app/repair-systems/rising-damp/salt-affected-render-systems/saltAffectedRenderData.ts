// ──────────────────────────────────────────────────────────────────────────────
// Salt-affected render systems (rising damp / salt attack). Hand-authored
// selection card. Values from the AU manufacturer source (cited per field); not-
// stated values are written "CONFIRM — <field> not stated on <url>". For the
// WTA-certified renovation plaster systems (Remmers SP, Mapei Mape-Antique) see
// the Renovating salt-resistant plaster page.
//
// appInfo comparison columns: Type · Binder · Salt tolerance · Application ·
// Coat thickness · Standard · Substrate · Pack.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Binder", "Salt tolerance", "Application", "Coat thickness", "Standard", "Substrate", "Pack"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SALT_AFFECTED_RENDER_CARDS: RefCard[] = [
  {
    brand: "Westox",
    rangeName: "Westox Plastalite Rehabilitation Render",
    shortType: "Pre-bagged rehabilitation render — salt-affected masonry (AU)",
    badges: [{ label: "Rehabilitation render", tone: "navy" }, { label: "Salt-tolerant", tone: "blue" }, { label: "CONFIRM specs", tone: "rose" }],
    appInfo: kp([
      "Pre-bagged rehabilitation render",
      "CONFIRM — binder not published (westox.com)",
      "Tolerates residual salts migrating through the wall after DPC treatment",
      "Hand-applied after chemical DPC injection + substrate prep; strip old salt-contaminated render first",
      "CONFIRM — coat thickness not published (westox.com)",
      "CONFIRM — not stated (westox.com)",
      "Masonry, brick (salt-affected)",
      "20 kg pre-bagged",
    ]),
    bestFor: [
      "Australian-supplied pre-bagged rehabilitation render for salt-affected masonry — tolerates residual salts that keep migrating after DPC treatment",
      "Reduces efflorescence and render failure caused by salt crystallisation pressure on treated walls",
    ],
    avoidWhere: [
      "Over salt-contaminated substrates without prior salt removal and substrate preparation",
      "Before the rising-damp source is treated (chemical DPC injection)",
    ],
    warnings: [
      "Confirm binder, water ratio, coat thickness, coverage and primer requirements from the Westox Plastalite TDS before specifying",
      "For a WTA 2-9-04 certified renovation plaster system, see the Renovating salt-resistant plaster page (Remmers SP, Mapei Mape-Antique)",
    ],
    advanced: {
      description:
        "Westox Plastalite Rehabilitation Render is a pre-bagged (20 kg) renovation render for masonry and brick affected by salt contamination from rising damp, marine exposure or ground salts. It is formulated to tolerate residual salts migrating through the wall after treatment, reducing efflorescence and render failure from salt crystallisation pressure. Applied after chemical DPC injection and substrate preparation, with old salt-contaminated render removed first. Westox is an Australian supplier; the product page does not publish binder, water ratio, coat thickness, coverage or primer detail — CONFIRM with Westox technical. For a WTA-certified renovation plaster, see the Renovating salt-resistant plaster page.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Pre-bagged rehabilitation render", source: "westox.com — Westox Plastalite" },
        { label: "Salt tolerance", value: "Tolerates residual salts migrating after DPC treatment", source: "westox.com — Westox Plastalite" },
        { label: "Application", value: "Hand-applied after DPC injection + substrate prep", source: "westox.com — Westox Plastalite" },
        { label: "Substrate", value: "Masonry, brick (salt-affected)", source: "westox.com — Westox Plastalite" },
        { label: "Pack", value: "20 kg pre-bagged", source: "westox.com — Westox Plastalite" },
        { label: "Binder", value: "CONFIRM — not published on westox.com" },
        { label: "Coat thickness / coverage / primer", value: "CONFIRM — not published on westox.com" },
        { label: "Standard", value: "CONFIRM — WTA / EN 998-1 status not stated on westox.com" },
      ],
    },
  },
];

export const SALT_AFFECTED_RENDER_SELECTORS = [
  {
    product_id: "westox_plastalite_rehabilitation_render",
    category: "salt-affected-render-systems",
    type: "rehabilitation_render",
    binder: null,
    salt_tolerant: true,
    application: "hand_applied",
    coat_thickness_mm: null,
    standard: [],
    substrate: ["brick", "masonry"],
    pack_size: "20 kg",
    requires_dpc_first: true,
    au_distributor: "Westox / Westlegate Pty Ltd (AU)",
    source_tds_url: "https://www.westox.com.au",
    confidence: "needs_confirmation",
  },
];
