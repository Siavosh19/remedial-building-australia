// Penetration collars. Hardware → no Class-2/warranty. Lighter treatment.
// appInfo: Type · Material · Pipe size / format · Membrane connection · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Pipe size / format", "Membrane connection", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));
const card = (brand: string, rangeName: string, shortType: string, vals: string[], bestFor: string[], avoidWhere: string[], warnings: string[], description: string, techExtra: { label: string; value: string; source?: string }[] = []): RefCard => ({
  brand, rangeName, shortType, badges: [{ label: "Penetration collar", tone: "navy" }],
  appInfo: kp(vals), bestFor, avoidWhere, warnings,
  advanced: { description, designCriteria: "", techData: [{ label: "Type", value: vals[0], source: brand }, { label: "Material", value: vals[1], source: brand }, ...techExtra] },
});

export const PENETRATION_COLLAR_CARDS: RefCard[] = [
  card("ARDEX Australia", "ARDEX Pre-formed PVC Pipe Collar", "Pre-formed PVC flanged pipe collar — ARDEX systems",
    ["Pre-formed flanged collar", "PVC", "Standard round pipe diameters (confirm OD)", "Membrane laps over and bonds to the flat PVC flange", "Specified within ARDEX liquid-applied membrane systems"],
    ["Sealing standard round pipe penetrations where an ARDEX liquid-applied PU / hybrid / cementitious membrane bonds to the PVC flange"],
    ["Torch-on sheet systems — PVC cannot be heat-bonded (use stainless or brass)"],
    ["Confirm pipe OD against available collar sizes, the membrane overlap onto the flange, and primer requirements with ARDEX technical"],
    "ARDEX pre-formed PVC pipe collars are factory-made flanged collars for sealing standard round pipe penetrations within ARDEX liquid-applied membrane systems, with the membrane lapped over and bonded to the flat PVC flange. Confirm pipe OD, overlap and primer requirements with ARDEX Australia."),
  card("Mapei Australia", "Mapei Pre-formed Pipe Collar", "Pre-formed PVC flanged pipe collar — Mapei systems",
    ["Pre-formed flanged collar", "PVC", "Standard round pipe diameters (confirm OD)", "Membrane laps over the collar flange (Mapelastic range)", "Specified within Mapei liquid-applied membrane systems"],
    ["Sealing standard round pipe penetrations within Mapei membrane systems (e.g. Mapelastic, Mapelastic AquaDefense)"],
    ["Torch-on sheet systems — PVC cannot be heat-bonded"],
    ["Confirm pipe OD, the specific collar product and overlap against the current Mapei system specification with Mapei technical"],
    "Mapei pre-formed pipe collars are factory-made PVC flanged collars for sealing standard round pipe penetrations within Mapei membrane systems, with the membrane lapped over the collar flange. Confirm pipe OD, the collar product and overlap against the current Mapei system specification."),
  card("Various — confirm with supplier", "Stainless Steel Pipe Collar", "Pre-formed stainless flanged collar — torch-on compatible",
    ["Pre-formed flanged collar", "Stainless steel 304 / 316", "Standard round pipe diameters (confirm OD)", "Torch-on sheet heat-bonded to the stainless flange; also liquid-applied", "Required for torch-on systems; Grade 316 for coastal"],
    ["Sealing pipe penetrations where torch-on modified-bitumen sheet must heat-bond to a metal flange", "Liquid-applied systems where stainless is specified or preferred"],
    [],
    ["Specify Grade 316 for coastal/chloride exposure; confirm pipe OD and the heat-bonding method at the flange with the membrane manufacturer"],
    "Pre-formed stainless steel pipe collars are required where torch-on sheet membranes must heat-bond to a metal flange, and are also compatible with liquid-applied systems. Specify Grade 316 for coastal exposure and confirm pipe OD and the bonding method with the supplier and membrane manufacturer.",
    [{ label: "Grade", value: "304 / 316 (confirm)", source: "Supplier" }]),
  card("Dektite / various — confirm distributor", "EPDM Rubber Flexible Pipe Collar (Dektite)", "Flexible EPDM compression collar — round & square pipe",
    ["Pre-formed flexible collar", "EPDM rubber", "Range of diameters; round and square sections", "Compression fit to pipe; base flange lapped/bonded by the membrane (confirm)", "For non-standard, irregular or square sections where a rigid collar won't fit"],
    ["Penetrations where a rigid PVC/stainless collar does not fit — square downpipes, non-standard diameters, irregular sections, roof and terrace"],
    ["Torch-on sheet systems without specific membrane-manufacturer detailing"],
    ["Compression fit to the pipe is not the seal — confirm the base-flange bonding method and primer with the membrane manufacturer; EPDM is not compatible with all liquid-applied membranes"],
    "EPDM rubber flexible pipe collars (e.g. Dektite) compress over a range of pipe diameters and both round and square sections, with the base flange lapped or bonded by the membrane. They suit non-standard and irregular penetrations — confirm the base-flange bonding method and membrane compatibility before applying.",
    [{ label: "Pipe section", value: "Round and square", source: "Supplier" }]),
  card("ARDEX Australia", "Site-formed Collar — ARDEX Components", "Site-formed collar — ARDEX liquid membrane + fabric",
    ["Site-formed collar (built in situ)", "Liquid membrane + reinforcing fabric", "Any — non-standard and existing penetrations", "Membrane and embedded fabric built up around the pipe", "ARDEX system only; applicator skill and a hold-point inspection required"],
    ["Non-standard pipe sizes, irregular sections and existing penetrations within an ARDEX system where no pre-formed collar fits"],
    ["Standard round pipes where a pre-formed collar is available — not a cost shortcut"],
    ["Confirm the membrane, fabric, lap dimensions and primer against the current ARDEX system specification; inspect as a hold point before covering"],
    "Where no pre-formed collar fits, an ARDEX site-formed collar is built in situ from ARDEX liquid membrane and reinforcing fabric, encapsulating the penetration perimeter. It suits non-standard and existing penetrations within an ARDEX system — confirm method and lap dimensions with the current ARDEX specification and inspect as a hold point."),
  card("Mapei Australia", "Site-formed Collar — Mapei Components", "Site-formed collar — Mapei liquid membrane + fabric",
    ["Site-formed collar (built in situ)", "Liquid membrane + reinforcing fabric", "Any — non-standard and existing penetrations", "Membrane and embedded fabric built up around the pipe", "Mapei system only; applicator skill and a hold-point inspection required"],
    ["Non-standard pipe sizes, irregular sections and existing penetrations within a Mapei system where no pre-formed collar fits"],
    ["Standard round pipes where a pre-formed collar is available — not a cost shortcut"],
    ["Method, lap dimensions and primer vary across Mapei systems — confirm against the current Mapei system specification; inspect as a hold point before covering"],
    "Within Mapei systems, a site-formed collar is built in situ from Mapei liquid membrane and reinforcing fabric to form a continuous collar around non-standard penetrations. Confirm the method, lap dimensions and primer against the current Mapei system specification and inspect as a hold point before covering."),
];
