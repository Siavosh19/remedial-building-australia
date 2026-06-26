// ──────────────────────────────────────────────────────────────────────────────
// Epoxy Laminating / Structural-Bonding Resins (CFRP strengthening) — hand-authored.
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated on
// the cited AU source. NOTE: plate-bonding adhesives vs fabric saturants differ —
// flagged per product.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Use", "Consistency", "Application temp", "Substrates", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const EPOXY_LAMINATING_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikadur-30",
    shortType: "2-part thixotropic epoxy adhesive for bonding CFRP plates",
    badges: [],
    appInfo: kp(["2-part epoxy structural adhesive (plate bonding)", "Bonds Sika CarboDur CFRP plates as externally-bonded reinforcement", "Thixotropic — non-sag (vertical / overhead)", "+8 to +35 °C (use Sikadur-30 LP for elevated temp)", "Concrete, steel, masonry, timber, CarboDur plates", "CONFIRM (Sika AU TDS)"]),
    bestFor: [
      "The plate-bonding adhesive for the Sika CarboDur CFRP flexural-strengthening system",
      "Thixotropic, non-sag — bonds plates on vertical and overhead soffits without slump",
      "High strength, hardens without shrinkage; cure not affected by high humidity",
    ],
    avoidWhere: [
      "Application below +8 °C or at elevated temperatures (use Sikadur-30 LP for hot conditions)",
      "Saturating CFRP fabric (use a wet-layup saturant such as Sikadur-330)",
      "Without an engineered CFRP strengthening design",
    ],
    warnings: [
      "Strengthening design and surface preparation must follow the engineer's CFRP scheme",
      "Observe the +8 to +35 °C application window; confirm pack size against the current Sika AU TDS",
    ],
    advanced: {
      description:
        "Sika Sikadur-30 is a two-part, thixotropic epoxy adhesive for bonding Sika CarboDur CFRP plates to concrete, steel, masonry and timber as externally-bonded reinforcement. Non-sag for vertical/overhead work, high strength, cures without shrinkage and is unaffected by high humidity; application +8 to +35 °C (Sikadur-30 LP for elevated temperatures). CONFIRM pack size against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part epoxy structural adhesive (plate bonding)", source: "aus.sika.com TDS" },
        { label: "Use", value: "Bonds Sika CarboDur CFRP plates (EBR)", source: "aus.sika.com TDS" },
        { label: "Consistency", value: "Thixotropic — non-sag V/OH", source: "aus.sika.com TDS" },
        { label: "Application temp", value: "+8 to +35 °C (LP grade for elevated temp)", source: "aus.sika.com TDS" },
        { label: "Substrates", value: "Concrete, steel, masonry, timber, CarboDur plates", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Adesilex PG1",
    shortType: "2-part thixotropic epoxy structural-bonding adhesive",
    badges: [],
    appInfo: kp(["2-part thixotropic epoxy structural adhesive", "Bonds CFRP / steel plates to concrete; seals large cracks", "Thixotropic — non-sag", "CONFIRM (Mapei AU TDS)", "Concrete, steel, CFRP plates", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Structural bonding of CFRP plates and steel plates to concrete (external strengthening)",
      "Also used to bond rigid precast elements and to seal large cracks",
      "Thixotropic — non-sag on vertical and overhead work",
    ],
    avoidWhere: [
      "Saturating CFRP fabric (use a wet-layup saturant such as Mapei MapeWrap 31)",
      "Without an engineered CFRP / plate-bonding design",
      "Outside the application temperature window (confirm on the AU TDS)",
    ],
    warnings: [
      "Confirm the application temperature window against the current Mapei Australia TDS",
      "Strengthening design and surface preparation must follow the engineer's scheme",
    ],
    advanced: {
      description:
        "Mapei Adesilex PG1 is a two-part, thixotropic epoxy structural-bonding adhesive (epoxy resins + fine aggregate) for bonding CFRP and steel plates to concrete, bonding rigid precast elements, and sealing large cracks. Non-sag for vertical/overhead work. CONFIRM Australian availability, application temperature window and pack size against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part thixotropic epoxy structural adhesive", source: "mapei.com/au TDS — AU CONFIRM" },
        { label: "Use", value: "Bonds CFRP / steel plates to concrete; seals large cracks", source: "mapei.com/au TDS — AU CONFIRM" },
        { label: "Consistency", value: "Thixotropic — non-sag", source: "mapei.com/au TDS — AU CONFIRM" },
        { label: "Substrates", value: "Concrete, steel, CFRP plates", source: "mapei.com/au TDS — AU CONFIRM" },
        { label: "Pack size", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS — AU CONFIRM" },
      ],
    },
  },
];
