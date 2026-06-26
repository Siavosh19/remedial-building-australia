// ──────────────────────────────────────────────────────────────────────────────
// Corrosion Inhibitors (MCI) — hand-authored selection cards (reinforcement corrosion).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated
// on the cited AU source. Key discriminator: surface-applied (treats existing
// concrete) vs admixture (built into new concrete/mortar).
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Application", "Type / chemistry", "Mechanism", "Use case", "Coverage / dosage", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const CORROSION_INHIBITOR_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika FerroGard-903+",
    shortType: "Surface-applied migrating corrosion inhibitor (impregnation)",
    badges: [],
    appInfo: kp(["Surface-applied (impregnation)", "Mixed migrating corrosion inhibitor", "Migrates to the bar — monomolecular protective layer", "Existing reinforced concrete (remedial)", "CONFIRM (Sika AU TDS)", "20 L"]),
    bestFor: [
      "Treats EXISTING reinforced concrete without breakout — brushed/sprayed impregnation",
      "Delays onset and reduces the rate of corrosion; up to +15 years service life within a Sika repair/protection system",
      "Migrates through the pore structure to reach the reinforcement",
    ],
    avoidWhere: [
      "Not an admixture — for new concrete/mortar use FerroGard-901",
      "Effectiveness depends on penetration — confirm substrate condition and coverage per the TDS",
    ],
    warnings: [
      "Confirm coverage rate and number of applications against the current Sika Australia TDS",
      "Specified as part of a complete concrete repair / protection system",
    ],
    advanced: {
      description:
        "Sika FerroGard-903+ is a surface-applied, mixed migrating corrosion inhibitor for impregnation of existing steel-reinforced concrete. It penetrates the concrete and forms a protective monomolecular layer on the reinforcement, delaying the onset and reducing the rate of corrosion — up to +15 years added service life within a complete Sika repair/protection system. CONFIRM coverage rate against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Application", value: "Surface-applied (impregnation)", source: "aus.sika.com TDS" },
        { label: "Type", value: "Mixed migrating corrosion inhibitor", source: "aus.sika.com TDS" },
        { label: "Mechanism", value: "Migrates to rebar — monomolecular protective layer", source: "aus.sika.com TDS" },
        { label: "Use case", value: "Existing reinforced concrete (remedial)", source: "aus.sika.com TDS" },
        { label: "Coverage / dosage", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "20 L", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika FerroGard-901 S",
    shortType: "Corrosion-inhibiting admixture for new concrete / mortar",
    badges: [],
    appInfo: kp(["Admixture (into new concrete/mortar)", "Liquid corrosion-inhibiting admixture", "Reduces anodic + cathodic reactions; film on steel", "New concrete / repair mortar (integral)", "Dosed by % cement — CONFIRM", "CONFIRM (Sika AU TDS)"]),
    bestFor: [
      "Builds corrosion protection into new concrete or repair mortar at the mixer",
      "Reduces both the anodic and cathodic reactions of the corrosion process",
    ],
    avoidWhere: [
      "For NEW concrete/mortar (admixture) — not for treating existing hardened concrete (use FerroGard-903+)",
      "Confirm the dosage for the chloride risk before specifying",
    ],
    warnings: [
      "Dosed at the mixer — not surface-applied",
      "Confirm dosage against the current Sika Australia FerroGard-901 S TDS",
    ],
    advanced: {
      description:
        "Sika FerroGard-901 is a liquid corrosion-inhibiting admixture for reinforced concrete and mortar, dosed at the mixer. It reduces both the anodic and cathodic reactions of the electrochemical corrosion process and forms a film on the steel that delays the onset of corrosion. CONFIRM dosage and current Australian availability with Sika Australia.",
      designCriteria: "",
      techData: [
        { label: "Application", value: "Admixture (into new concrete/mortar)", source: "Sika FerroGard-901 TDS — AU CONFIRM" },
        { label: "Type", value: "Liquid corrosion-inhibiting admixture", source: "Sika FerroGard-901 TDS — AU CONFIRM" },
        { label: "Mechanism", value: "Reduces anodic + cathodic reactions; film on steel", source: "Sika FerroGard-901 TDS — AU CONFIRM" },
        { label: "Use case", value: "New concrete / repair mortar (integral)", source: "Sika FerroGard-901 TDS — AU CONFIRM" },
        { label: "Coverage / dosage", value: "Dosed by % cement — CONFIRM", source: "Sika FerroGard-901 TDS — AU CONFIRM" },
        { label: "Pack size", value: "CONFIRM (Sika AU TDS)", source: "Sika FerroGard-901 TDS — AU CONFIRM" },
      ],
    },
  },
  {
    brand: "Cortec",
    rangeName: "Cortec MCI-2020",
    shortType: "Surface-applied migrating corrosion inhibitor (liquid + vapour phase)",
    badges: [],
    appInfo: kp(["Surface-applied (impregnation)", "Migrating corrosion inhibitor (amine carboxylate)", "Liquid + vapour-phase migration to the bar", "Existing concrete — carbonation + chloride", "CONFIRM (Cortec AU distributor)", "CONFIRM (Cortec AU distributor)"]),
    bestFor: [
      "Liquid and vapour-phase migration — penetrates concrete, mortar and limestone to protect embedded steel",
      "Protects against both carbonation and chloride-induced corrosion",
    ],
    avoidWhere: [
      "Confirm the current Australian distributor and availability before specifying",
      "Surface-applied to existing concrete — not an admixture",
    ],
    warnings: [
      "Australian availability is via distributors — CONFIRM before specifying",
      "Confirm coverage rate and application method against the current Cortec TDS",
    ],
    advanced: {
      description:
        "Cortec MCI-2020 is a surface-applied Migrating Corrosion Inhibitor that penetrates cementitious materials (concrete, mortar, limestone) in both liquid and vapour phases, forming a protective molecular layer on embedded reinforcement and protecting against carbonation, chlorides and other contaminants. CONFIRM the current Australian distributor, coverage rate and application method.",
      designCriteria: "",
      techData: [
        { label: "Application", value: "Surface-applied (impregnation)", source: "cortecvci.com TDS — AU distributor CONFIRM" },
        { label: "Type", value: "Migrating corrosion inhibitor (amine carboxylate)", source: "cortecvci.com TDS — AU distributor CONFIRM" },
        { label: "Mechanism", value: "Liquid + vapour-phase migration to the bar", source: "cortecvci.com TDS — AU distributor CONFIRM" },
        { label: "Use case", value: "Existing concrete — carbonation + chloride", source: "cortecvci.com TDS — AU distributor CONFIRM" },
        { label: "Coverage / dosage", value: "CONFIRM (Cortec AU distributor)", source: "cortecvci.com TDS — AU distributor CONFIRM" },
        { label: "Pack size", value: "CONFIRM (Cortec AU distributor)", source: "cortecvci.com TDS — AU distributor CONFIRM" },
      ],
    },
  },
];
