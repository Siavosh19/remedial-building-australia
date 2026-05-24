import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { ProjectData, Defect, OutputType } from "@/lib/scope-builder-types";

export const maxDuration = 60;

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY ?? "";

// Legacy types kept for backwards compatibility
export interface DefectDetail {
  type: string;
  locations: string;
  severity: string;
  access: string;
  area: string;
  notes: string;
}

export interface ScopeRequest {
  // New structured format
  project?: ProjectData;
  defects?: Defect[];
  selectedRepairSystems?: string[];
  selectedMaterials?: string[];
  selectedClauses?: string[];
  outputType?: OutputType;
  missingInfo?: string[];
  // Legacy format fields (still accepted)
  projectAddress?: string;
  buildingName?: string;
  buildingType?: string;
  storeys?: string;
  lots?: string;
  clientName?: string;
  preparedBy?: string;
  reportDate?: string;
}

const OUTPUT_INSTRUCTIONS: Record<OutputType, string> = {
  consultant:
    "Write a full technical consultant-level scope with: detailed methodology for each repair, relevant Australian Standards references, hold points and QA requirements, material categories, flood testing requirements, workmanship warranty expectations (do not quote specific figures unless certain), and defect liability notes.",
  builder:
    "Write a scope formatted for builders to price. Include: clear work breakdown per defect/location, quantities where provided, access method notes, trade sequence, and a summary schedule of works. Use practical construction language. Include a blank schedule of rates table at the end for pricing.",
  strata:
    "Write a plain-language summary for building owners and strata committees. Avoid jargon. Explain: what is wrong, what will be done, how long each stage will take (use general ranges), how residents will be affected, and what to expect at each stage. Use simple, clear Australian English.",
  methodology:
    "Write a technical methodology statement. Describe the repair method and process only — no commercial information, pricing, warranty claims or marketing language. Include: substrate preparation, material application sequence, hold points and testing requirements. Suitable for inclusion in a building contract or specification.",
  tender:
    "Write a formal tender scope of works. Include: project overview, general conditions, scope items with quantities (use 'PC' or 'allow' where quantities are unknown), material specification categories, QA and inspection requirements, and a schedule of rates template table. Format as a numbered tender document.",
};

function buildPrompt(body: ScopeRequest): string {
  const hasMissingInfo =
    body.missingInfo && body.missingInfo.length > 0;

  // ── Project block ──
  let projectBlock: string;
  if (body.project) {
    const p = body.project;
    projectBlock = `Address: ${p.address || "Not specified"}
Building Name / Project: ${p.name || "Not specified"}
Building Type: ${p.buildingType || "Not specified"}
Class 2 Building: ${p.isClass2 ? "Yes" : "No"}
Occupied During Works: ${p.occupied ? "Yes — occupied building" : "No — unoccupied"}
Number of Levels: ${p.levels || "Not specified"}
Number of Lots / Units: ${p.lots || "Not specified"}
Client: ${p.clientName || "Not specified"}
Prepared By: ${p.preparedBy || "Not specified"}
Date: ${p.reportDate ? new Date(p.reportDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : new Date().toLocaleDateString("en-AU")}
Access Constraints: ${p.accessConstraints || "Not specified"}
Coastal Exposure: ${p.coastalExposure ? "Yes — within 1km of coastline" : "No"}
Structural Construction Type: ${p.constructionType || "Not specified"}
Roof Type: ${p.roofType || "Not specified"}
External Wall Type: ${p.externalWallType || "Not specified"}
Notes: ${p.notes || "None"}`;
  } else {
    projectBlock = `Address: ${body.projectAddress || "Not specified"}
Building Name: ${body.buildingName || "Not specified"}
Building Type: ${body.buildingType || "Not specified"}
Storeys: ${body.storeys || "Not specified"}
Lots: ${body.lots || "Not specified"}
Client: ${body.clientName || "Not specified"}
Prepared By: ${body.preparedBy || "Not specified"}
Date: ${body.reportDate || new Date().toLocaleDateString("en-AU")}`;
  }

  // ── Defects block ──
  const defectsBlock = body.defects && body.defects.length > 0
    ? body.defects
        .map(
          (d, i) =>
            `Defect ${i + 1}:
  Category: ${d.category}
  Type: ${d.defectType || "Not specified"}
  Location: ${d.location || "Not specified"}
  Severity: ${d.severity}
  Quantity / Extent: ${d.quantity || "Not specified"}
  Suspected Cause: ${d.suspectedCause || "Not specified"}
  Diagnostic Observations: ${d.diagnosticNotes?.trim() || "None provided"}
  Notes: ${d.notes || "None"}`
        )
        .join("\n\n")
    : "No defects specified.";

  // ── Repair systems block ──
  const repairBlock =
    body.selectedRepairSystems && body.selectedRepairSystems.length > 0
      ? body.selectedRepairSystems.join(", ")
      : "Not specified — use best-practice methods appropriate to each defect.";

  // ── Materials block ──
  const materialsBlock =
    body.selectedMaterials && body.selectedMaterials.length > 0
      ? body.selectedMaterials.join("; ")
      : "No specific products selected — refer to material categories only, do not name specific brands.";

  // ── Clauses block ──
  const clausesBlock =
    body.selectedClauses && body.selectedClauses.length > 0
      ? body.selectedClauses.join(", ")
      : "Standard clauses";

  const outputType = body.outputType ?? "consultant";
  const outputInstruction = OUTPUT_INSTRUCTIONS[outputType] ?? OUTPUT_INSTRUCTIONS.consultant;

  return `You are an expert remedial building consultant in Australia, specialising in Class 2 residential apartment buildings (strata). Your task is to write a ${outputType.toUpperCase()} scope of works document.

CRITICAL RULES — YOU MUST FOLLOW THESE:
1. Do NOT invent specific product names, brand names, or proprietary systems not listed in "Selected Materials" below.
2. Do NOT assert specific warranty periods, compliance certificates, or quantified test results unless directly provided in the project data.
3. Do NOT reference specific Australian Standard clauses by number unless you are certain they apply to the defect type (e.g., AS 3740 for wet area waterproofing, AS 3600 for concrete, AS/NZS 4654 for above-ground waterproofing).
4. If key information is missing, include this warning IMMEDIATELY at the start of the document (before any other content):
   ⚠ More project information is required before this scope can be relied upon. Missing: [list the missing items].
5. Only reference the materials listed in "Selected Materials" — do not add other products.
6. Use Australian English throughout.
7. Do not include warranties, PI insurance requirements, or statutory compliance claims that go beyond what is reasonably implied by best practice.

PROJECT INFORMATION:
${projectBlock}

IDENTIFIED DEFECTS (${(body.defects ?? []).length}):
${defectsBlock}

SELECTED REPAIR SYSTEMS:
${repairBlock}

SELECTED MATERIALS:
${materialsBlock}

STANDARD CLAUSES TO INCLUDE:
${clausesBlock}

OUTPUT FORMAT: ${outputType.toUpperCase()}
${outputInstruction}

DOCUMENT STRUCTURE:
Use Markdown formatting:
- ## for main sections
- ### for defect-specific sections
- **Bold** for sub-headings and emphasis
- Bullet points for lists
- Numbered lists for sequential steps
- --- for section dividers

Write the full scope document now. Be professional, specific, and technically accurate. Do not pad with generic filler content.`;
}

export async function POST(request: NextRequest) {
  try {
    const body: ScopeRequest = await request.json();

    // Validate minimum required data
    const hasAddress = body.project?.address || body.projectAddress;
    const hasDefects =
      (body.defects && body.defects.length > 0);

    if (!hasAddress) {
      return NextResponse.json(
        { error: "Project address is required." },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_KEY) {
      return NextResponse.json(
        { error: "AI service not configured." },
        { status: 503 }
      );
    }

    const prompt = buildPrompt(body);

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic error:", err);
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 502 }
      );
    }

    const aiData = await res.json();
    const scopeText: string = aiData.content?.[0]?.text ?? "";

    if (!scopeText) {
      return NextResponse.json(
        { error: "AI returned an empty response." },
        { status: 502 }
      );
    }

    // Save to Supabase (fire and forget)
    void (async () => {
      try {
        await supabase.from("scope_requests").insert({
          project_address:
            body.project?.address ?? body.projectAddress ?? null,
          building_name: body.project?.name ?? body.buildingName ?? null,
          building_type:
            body.project?.buildingType ?? body.buildingType ?? null,
          defects: body.defects ?? [],
          output_type: body.outputType ?? "consultant",
          generated_scope: scopeText,
          created_at: new Date().toISOString(),
        });
      } catch {
        // Non-fatal
      }
    })();

    return NextResponse.json({ scope: scopeText });
  } catch (err) {
    console.error("generate-scope error:", err);
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 }
    );
  }
}
