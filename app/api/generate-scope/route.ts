import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { ProjectData, Defect, OutputType, ProjectDataV2, WorkItemState } from "@/lib/scope-builder-types";

export const maxDuration = 120;

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

// ── V2 types ──────────────────────────────────────────────────────────────────

interface WorkItemPayload {
  id: string;
  label: string;
  state: WorkItemState;
}

interface ScopeRequestV2 {
  version: 2;
  projectData: ProjectDataV2;
  constructionTypes: string[];
  workItems: WorkItemPayload[];
  outputFormat: string;
  consultantNotes: string;
  prelimClauses: string[];
}

const OUTPUT_INSTRUCTIONS_V2: Record<string, string> = {
  consultant:
    "Write a full technical consultant-level scope of works with: detailed repair methodology for each work item, relevant Australian Standards references (AS 3600, AS 3740, AS/NZS 4654, AS 2990 as applicable), hold points and QA inspection requirements, material categories with performance requirements, flood testing requirements for waterproofing, and workmanship warranty notes.",
  builder:
    "Write a scope formatted for builders to price. Include: clear work breakdown per item with trade sequence, quantities where provided, access method notes, and a blank schedule of rates table at the end for pricing. Use practical construction language.",
  strata:
    "Write a plain-language summary for building owners and strata committees. Avoid technical jargon. Explain what is wrong, what will be done, how long each stage will take (use general ranges), how residents will be affected, and what to expect at each stage. Use clear, simple Australian English.",
  methodology:
    "Write a technical methodology statement describing repair methods and processes only — no commercial information, pricing, or marketing language. Include substrate preparation, material application sequence, hold points and testing. Suitable for inclusion in a building contract specification.",
  builder_old:
    "Write a scope formatted for builders to price with clear work breakdown, quantities, and a schedule of rates template.",
  tender:
    "Write a formal tender scope of works with: project overview, general conditions, numbered scope items with quantities (use 'PC Sum' or 'Allow' where quantities are unknown), material specification categories, QA and inspection requirements, and a schedule of rates template table.",
};

function buildPromptV2(body: ScopeRequestV2): string {
  const p = body.projectData;

  const formattedDate = p.reportDate
    ? new Date(p.reportDate).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-AU");

  const projectBlock = `Building Name: ${p.buildingName || "Not specified"}
Address: ${p.address || "Not specified"}
Suburb: ${p.suburb || "Not specified"}
State: ${p.state || "NSW"}
Building Class: ${p.buildingClass || "Not specified"}
Number of Storeys: ${p.storeys || "Not specified"}
Approximate Year of Construction: ${p.yearOfConstruction || "Not specified"}
Coastal Location (within 1km): ${p.coastal ? "YES — coastal environment" : "No"}
Occupied During Works: ${p.occupied ? "Yes — occupied building, consider resident impact" : "No — unoccupied"}
Known Hazardous Materials: ${p.hazmat ? `YES — ${p.hazmatNotes || "refer hazmat notes"}` : "No"}
Consultant: ${p.consultantName || "Not specified"}
Report Date: ${formattedDate}`;

  const constructionBlock =
    body.constructionTypes.length > 0
      ? body.constructionTypes.join(", ")
      : "Not specified";

  // Build work items block with checklist detail
  const workItemsBlock = body.workItems
    .map((item, i) => {
      const state = item.state;
      const lines: string[] = [`${i + 1}. ${item.label}`];

      // Checked sub-items
      if (state.checked && state.checked.length > 0) {
        lines.push(`   Confirmed scope items:`);
        state.checked.forEach((checkId) => {
          const qty = state.quantities?.[checkId];
          lines.push(`   - ${checkId}${qty ? ` (${qty})` : ""}`);
        });
      }

      // Quantity fields without a corresponding checkbox
      if (state.quantities) {
        const qtyEntries = Object.entries(state.quantities).filter(
          ([k]) => !state.checked?.includes(k)
        );
        if (qtyEntries.length > 0) {
          qtyEntries.forEach(([, v]) => {
            if (v.trim()) lines.push(`   Quantity/note: ${v}`);
          });
        }
      }

      // Free-text notes
      if (state.notes?.trim()) {
        lines.push(`   Notes: ${state.notes.trim()}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");

  const prelimBlock =
    body.prelimClauses.length > 0
      ? body.prelimClauses.map((c, i) => `${i + 1}. ${c}`).join("\n")
      : "Standard preliminary clauses";

  const outputFormat = body.outputFormat || "consultant";
  const outputInstruction =
    OUTPUT_INSTRUCTIONS_V2[outputFormat] ?? OUTPUT_INSTRUCTIONS_V2.consultant;

  // Auto-modifiers
  const coastalNote = p.coastal
    ? "\nCOASTAL MODIFIER: This building is within 1km of the coastline. All metal components (flashings, fixings, lintels, balustrades, anchors) must be specified as stainless steel grade 316 or hot-dip galvanised minimum. Corrosion protection requirements must be elevated throughout. Sealant and coating products must be specified for marine / coastal exposure."
    : "";

  const hazmatNote = p.hazmat
    ? `\nHAZARDOUS MATERIALS MODIFIER: Hazardous materials (including suspected asbestos-containing materials) have been identified or are suspected. All works must include: SafeWork-compliant SWMS for ACM, licensed asbestos removalist where removal is required, air monitoring during friable ACM removal, waste disposal to licensed facility, and clearance certificate before re-occupation. Reference: SafeWork Australia Code of Practice for Asbestos.${p.hazmatNotes ? ` Site-specific notes: ${p.hazmatNotes}` : ""}`
    : "";

  return `You are an expert remedial building consultant in Australia, specialising in residential apartment buildings (Class 2 strata) and commercial buildings. Your task is to write a ${outputFormat.toUpperCase()} scope of works document.

CRITICAL RULES — YOU MUST FOLLOW THESE:
1. Do NOT invent specific product names or brand names — refer to material categories and performance specifications only.
2. Do NOT assert specific warranty periods, compliance certificates, or quantified test results unless directly provided.
3. Reference Australian Standards only where you are certain they apply (AS 3600 concrete, AS 3740 wet areas, AS/NZS 4654 above-ground waterproofing, AS 2990 curing, NCC current edition).
4. Use Australian English throughout.
5. Do not include warranties, PI insurance requirements, or statutory compliance claims beyond what is reasonably implied by best practice.
6. The CONSULTANT NOTES below are the most important input — weight them heavily in shaping the scope.
${coastalNote}${hazmatNote}

PROJECT INFORMATION:
${projectBlock}

CONSTRUCTION TYPES PRESENT:
${constructionBlock}

CONSULTANT NOTES (most important — use to shape all scope content):
${body.consultantNotes || "No additional consultant notes provided."}

WORK ITEMS TO SCOPE (${body.workItems.length} items):
${workItemsBlock}

PRELIMINARY CLAUSES TO INCLUDE:
${prelimBlock}

OUTPUT FORMAT: ${outputFormat.toUpperCase()}
${outputInstruction}

DOCUMENT STRUCTURE:
Use Markdown formatting:
- Start with a ## PRELIMINARY CLAUSES section listing all preliminary clauses
- ## for each main work item section
- ### for sub-items and methodology steps
- **Bold** for sub-headings and critical requirements
- Bullet points for lists
- Numbered lists for sequential work steps
- --- for section dividers
- Include quantities from the checklist data where provided

Write the complete scope document now. Be professional, specific, and technically accurate. Do not pad with generic filler content. Tailor every section to the specific project details and consultant notes provided.`;
}

// ── V3 types ──────────────────────────────────────────────────────────────────

interface DefectPayloadV3 {
  defect: string;
  severity: string;
  extent: string;
  probableCause: string;
  notes: string;
}

interface AreaPayloadV3 {
  area: string;
  constructionTypes: string[];
  defects: DefectPayloadV3[];
}

interface ScopeRequestV3 {
  version: 3;
  projectData: ProjectDataV2;
  areas: AreaPayloadV3[];
  workItems: { id: string; label: string; state: WorkItemState }[];
  accessConstraints: string[];
  complianceTriggers: string[];
  investigations: string[];
  outputFormat: string;
  consultantNotes: string;
  prelimClauses: string[];
}

const OUTPUT_INSTRUCTIONS_V3: Record<string, string> = {
  consultant:
    "Write a full technical consultant-level scope of works. For each work item: detailed repair methodology, Australian Standards references (AS 3600 concrete, AS 3740 wet areas, AS/NZS 4654 above-ground waterproofing, AS 2990 curing, NCC 2022 as applicable), hold points, QA inspection requirements, flood testing where relevant, material performance categories. Reference access constraints and compliance triggers throughout. Include an Investigations section if investigations are listed.",
  builder:
    "Write a scope formatted for builders to price. Clear work breakdown per item, trade sequence, quantities where provided, access method references, material categories. Include a blank schedule of rates table at the end.",
  strata:
    "Write a plain-language summary for building owners and strata committees. No jargon. Explain what is wrong per area, what will be done, expected duration (use general ranges), how residents will be affected, and what to expect at each stage. Clear, simple Australian English.",
  methodology:
    "Write a technical methodology statement: repair methods and process only — no commercial information, no pricing. Substrate preparation, material application sequence, hold points and testing requirements per work item. Suitable for inclusion in a building contract.",
  tender:
    "Write a formal tender scope. Project overview, general conditions, numbered scope items with quantities (use 'PC Sum' or 'Allow' where unknown), material specification categories (not brand names), QA requirements, and a schedule of rates template. Formal document structure.",
};

function buildPromptV3(body: ScopeRequestV3): string {
  const p = body.projectData;

  const formattedDate = p.reportDate
    ? new Date(p.reportDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("en-AU");

  const projectBlock = `Building Name: ${p.buildingName || "Not specified"}
Address: ${p.address || "Not specified"}, ${p.suburb || ""}, ${p.state || "NSW"}
Building Class: ${p.buildingClass || "Not specified"}
Number of Storeys: ${p.storeys || "Not specified"}
Approximate Year of Construction: ${p.yearOfConstruction || "Not specified"}
Coastal Location (within 1km): ${p.coastal ? "YES — coastal environment" : "No"}
Occupied During Works: ${p.occupied ? "Yes — occupied building, resident impact must be addressed" : "No — unoccupied"}
Known Hazardous Materials: ${p.hazmat ? `YES — ${p.hazmatNotes || "refer hazmat notes"}` : "No"}
Consultant: ${p.consultantName || "Not specified"}
Report Date: ${formattedDate}`;

  const areasBlock = body.areas.length > 0
    ? body.areas.map((a) => {
        const ctLine = a.constructionTypes.length > 0
          ? `  Construction: ${a.constructionTypes.join(", ")}`
          : "";
        const defLines = a.defects.length > 0
          ? a.defects.map((d) =>
              `  • ${d.defect}\n    Severity: ${d.severity} | Extent: ${d.extent} | Probable Cause: ${d.probableCause}${d.notes ? `\n    Notes: ${d.notes}` : ""}`
            ).join("\n")
          : "  No defects specified";
        return `${a.area}:\n${ctLine ? ctLine + "\n" : ""}  Observed Defects:\n${defLines}`;
      }).join("\n\n")
    : "No area/defect data provided.";

  const workItemsBlock = body.workItems.map((item, i) => {
    const state = item.state;
    const lines: string[] = [`${i + 1}. ${item.label}`];
    if (state.checked && state.checked.length > 0) {
      lines.push("   Confirmed scope items:");
      state.checked.forEach((checkId) => {
        const qty = state.quantities?.[checkId];
        lines.push(`   - ${checkId}${qty ? ` (${qty})` : ""}`);
      });
    }
    if (state.quantities) {
      Object.entries(state.quantities)
        .filter(([k]) => !state.checked?.includes(k))
        .forEach(([, v]) => { if (v.trim()) lines.push(`   Quantity/note: ${v}`); });
    }
    if (state.notes?.trim()) lines.push(`   Notes: ${state.notes.trim()}`);
    return lines.join("\n");
  }).join("\n\n");

  const accessBlock = body.accessConstraints.length > 0
    ? body.accessConstraints.join(", ")
    : "Not specified";

  const complianceBlock = body.complianceTriggers.length > 0
    ? body.complianceTriggers.map((c) => `- ${c}`).join("\n")
    : "None identified";

  const investigationsBlock = body.investigations.length > 0
    ? body.investigations.map((i) => `- ${i}`).join("\n")
    : "None specified";

  const prelimBlock = body.prelimClauses.length > 0
    ? body.prelimClauses.map((c, i) => `${i + 1}. ${c}`).join("\n")
    : "Standard preliminary clauses";

  const outputFormat = body.outputFormat || "consultant";
  const outputInstruction = OUTPUT_INSTRUCTIONS_V3[outputFormat] ?? OUTPUT_INSTRUCTIONS_V3.consultant;

  const coastalNote = p.coastal
    ? "\nCOASTAL MODIFIER: This building is within 1km of the coastline. All metal components (flashings, fixings, lintels, balustrades, anchors) must be specified as stainless steel grade 316 or hot-dip galvanised minimum. Corrosion protection requirements must be elevated throughout. Sealant and coating products must be rated for marine/coastal exposure."
    : "";

  const hazmatNote = p.hazmat
    ? `\nHAZARDOUS MATERIALS MODIFIER: Hazardous materials (including suspected asbestos-containing materials) have been identified or suspected. All works must include: SafeWork-compliant SWMS for ACM, licensed asbestos removalist where required, air monitoring during friable ACM removal, waste disposal to licensed facility, and clearance certificate before re-occupation.${p.hazmatNotes ? ` Site notes: ${p.hazmatNotes}` : ""}`
    : "";

  return `You are an expert remedial building consultant in Australia, specialising in Class 2 residential apartment buildings (strata) and commercial buildings. Your task is to write a ${outputFormat.toUpperCase()} scope of works document.

CRITICAL RULES:
1. Do NOT invent specific product names or brand names — refer to material categories and performance specifications only.
2. Do NOT assert specific warranty periods, compliance certificates or quantified test results unless directly provided.
3. Reference Australian Standards only where you are certain they apply.
4. Use Australian English throughout.
5. Do not include warranties, PI insurance or statutory compliance claims beyond what best practice implies.
6. The CONSULTANT NOTES below are the most important input — weight them heavily in every section.
${coastalNote}${hazmatNote}

PROJECT INFORMATION:
${projectBlock}

CONSULTANT NOTES (most important — shapes all scope content):
${body.consultantNotes || "No additional consultant notes provided."}

BUILDING AREAS, CONSTRUCTION TYPES AND OBSERVED DEFECTS:
${areasBlock}

ACCESS CONSTRAINTS:
${accessBlock}

COMPLIANCE TRIGGERS:
${complianceBlock}

RECOMMENDED INVESTIGATIONS:
${investigationsBlock}

WORK ITEMS TO SCOPE (${body.workItems.length} items):
${workItemsBlock}

PRELIMINARY CLAUSES TO INCLUDE:
${prelimBlock}

OUTPUT FORMAT: ${outputFormat.toUpperCase()}
${outputInstruction}

DOCUMENT STRUCTURE:
Use Markdown formatting:
- Start with ## PROJECT OVERVIEW section
- ## PRELIMINARY CLAUSES section
${body.investigations.length > 0 ? "- ## RECOMMENDED INVESTIGATIONS section listing all investigations with purpose\n" : ""}- ## for each work item / area section
- ### for sub-items and methodology steps
- **Bold** for critical requirements and hold points
- Numbered lists for sequential work steps
- Bullet points for checklists
- --- for section dividers
- Include quantities from checklist data where provided

Write the complete scope document now. Be professional, specific, technically accurate, and tailor every section to the defects, construction types and consultant notes provided. Do not pad with generic content.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!ANTHROPIC_KEY) {
      return NextResponse.json(
        { error: "AI service not configured." },
        { status: 503 }
      );
    }

    // ── V3 path (streaming) ──
    if (body.version === 3) {
      const v3Body = body as ScopeRequestV3;

      if (!v3Body.projectData?.address) {
        return NextResponse.json({ error: "Project address is required." }, { status: 400 });
      }

      const prompt = buildPromptV3(v3Body);

      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 8192,
          stream: true,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!anthropicRes.ok) {
        const err = await anthropicRes.text();
        console.error("Anthropic V3 error:", anthropicRes.status, err);
        return NextResponse.json(
          { error: anthropicRes.status === 429 ? "AI service is currently busy. Please try again in a moment." : "AI generation failed. Please try again." },
          { status: 502 }
        );
      }

      // Extract plain text from Anthropic SSE stream and pipe to client
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      let sseBuffer = "";

      const extractStream = new TransformStream({
        transform(chunk: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>) {
          sseBuffer += decoder.decode(chunk, { stream: true });
          const lines = sseBuffer.split("\n");
          sseBuffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const json = line.slice(6).trim();
            if (!json || json === "[DONE]") continue;
            try {
              const event = JSON.parse(json);
              if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
                controller.enqueue(encoder.encode(event.delta.text));
              }
            } catch { /* ignore malformed SSE */ }
          }
        },
        flush(controller: TransformStreamDefaultController<Uint8Array>) {
          // Process any remaining buffer content
          if (sseBuffer.startsWith("data: ")) {
            const json = sseBuffer.slice(6).trim();
            if (json) {
              try {
                const event = JSON.parse(json);
                if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
                  controller.enqueue(encoder.encode(event.delta.text));
                }
              } catch { /* ignore */ }
            }
          }
        },
      });

      return new Response(anthropicRes.body!.pipeThrough(extractStream), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "X-Accel-Buffering": "no",
        },
      });
    }

    // ── V2 path ──
    if (body.version === 2) {
      const v2Body = body as ScopeRequestV2;

      if (!v2Body.projectData?.address) {
        return NextResponse.json(
          { error: "Project address is required." },
          { status: 400 }
        );
      }

      const prompt = buildPromptV2(v2Body);

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
        console.error("Anthropic V2 error:", err);
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
            project_address: v2Body.projectData.address,
            building_name: v2Body.projectData.buildingName || null,
            building_type: v2Body.projectData.buildingClass || null,
            defects: [],
            output_type: v2Body.outputFormat || "consultant",
            generated_scope: scopeText,
            created_at: new Date().toISOString(),
          });
        } catch {
          // Non-fatal
        }
      })();

      return NextResponse.json({ scope: scopeText });
    }

    // ── V1 (legacy) path ──
    const v1Body = body as ScopeRequest;

    const hasAddress = v1Body.project?.address || v1Body.projectAddress;
    if (!hasAddress) {
      return NextResponse.json(
        { error: "Project address is required." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(v1Body);

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
            v1Body.project?.address ?? v1Body.projectAddress ?? null,
          building_name: v1Body.project?.name ?? v1Body.buildingName ?? null,
          building_type:
            v1Body.project?.buildingType ?? v1Body.buildingType ?? null,
          defects: v1Body.defects ?? [],
          output_type: v1Body.outputType ?? "consultant",
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
