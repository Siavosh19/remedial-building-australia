import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const maxDuration = 60;

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY ?? "";

export interface DefectDetail {
  type: string;
  locations: string;
  severity: string;
  access: string;
  area: string;
  notes: string;
}

export interface ScopeRequest {
  projectAddress: string;
  buildingName: string;
  buildingType: string;
  storeys: string;
  lots: string;
  clientName: string;
  preparedBy: string;
  reportDate: string;
  defects: DefectDetail[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ScopeRequest = await request.json();

    if (!body.projectAddress || body.defects.length === 0) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!ANTHROPIC_KEY) {
      return NextResponse.json({ error: "AI service not configured." }, { status: 503 });
    }

    const defectLines = body.defects
      .map(
        (d, i) =>
          `Defect ${i + 1}: ${d.type}
  Locations affected: ${d.locations || "Not specified"}
  Severity: ${d.severity}
  Access method: ${d.access}
  Estimated area/extent: ${d.area || "Not specified"}
  Additional notes: ${d.notes || "None"}`
      )
      .join("\n\n");

    const prompt = `You are an expert remedial building consultant in Australia, specialising in Class 2 buildings (strata and multi-residential apartments). Your task is to write a professional, detailed Scope of Works document.

PROJECT INFORMATION:
Address: ${body.projectAddress}
${body.buildingName ? `Building Name: ${body.buildingName}` : ""}
Building Type: ${body.buildingType}
Number of Storeys: ${body.storeys || "Not specified"}
Number of Lots/Units: ${body.lots || "Not specified"}
Client: ${body.clientName || "Not specified"}
Prepared By: ${body.preparedBy || "Remedial Building Australia"}
Date: ${body.reportDate || new Date().toLocaleDateString("en-AU")}

IDENTIFIED DEFECTS:
${defectLines}

Write a professional Scope of Works document with the following structure. Use Australian English throughout. Be specific, technical, and actionable.

---

## Project Overview

Write 2–3 sentences summarising the building, the inspection findings, and the purpose of this scope.

## General Conditions & Preliminaries

Include a bulleted list covering:
- Site access requirements and traffic management
- Protection of residents/property during works
- OH&S and Safe Work Method Statements (SWMS)
- Approval of materials and samples prior to commencement
- Hold points, progress inspections, and defect rectification inspections
- Cleaning up and making good upon completion
- Compliance with NCC, Australian Standards, and manufacturer specifications

## Scope of Works

For EACH defect listed above, write a dedicated section with:

### [Defect Type] — [Locations affected]

**1. Preparatory Works**
Detail all surface preparation, removal of failed materials, probing, testing, and cleaning required before repair.

**2. Repair Method**
Describe the recommended repair system step by step: primers, membranes, screeds, coatings, sealants, or structural repairs as applicable. Reference relevant Australian Standards (e.g. AS 3740 for waterproofing, AS 3600 for concrete structures) and NCC requirements where appropriate.

**3. Materials**
List the material types and product categories required (e.g. polyurethane membrane, cementitious repair mortar, epoxy injection resin). Do not specify brand names.

**4. Quality Control**
List hold points, testing requirements (e.g. flood testing, pull-off tests, moisture readings), and inspection requirements at each stage.

**5. Defect Liability**
State the expected workmanship warranty period for this repair type (typically 5–10 years depending on system) and any ongoing maintenance obligations.

## Exclusions

List any items that are explicitly excluded from this scope of works (e.g. items not inspected, works to be carried out by others, latent conditions).

## General Notes

Include notes on: authority approvals if required, strata by-law compliance, notification to owners/tenants, and any recommended further investigation items.

---

Write the full document now. Use Markdown formatting with headers (##, ###), bold for sub-headings, and bullet points for lists.`;

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
      return NextResponse.json({ error: "AI generation failed. Please try again." }, { status: 502 });
    }

    const aiData = await res.json();
    const scopeText: string = aiData.content?.[0]?.text ?? "";

    if (!scopeText) {
      return NextResponse.json({ error: "AI returned an empty response." }, { status: 502 });
    }

    // Save to Supabase (fire and forget — don't block the response)
    void (async () => {
      try {
        await supabase.from("scope_requests").insert({
          project_address: body.projectAddress,
          building_name: body.buildingName || null,
          building_type: body.buildingType,
          storeys: body.storeys || null,
          lots: body.lots || null,
          client_name: body.clientName || null,
          prepared_by: body.preparedBy || null,
          report_date: body.reportDate || null,
          defects: body.defects,
          generated_scope: scopeText,
          created_at: new Date().toISOString(),
        });
      } catch {
        // Non-fatal — scope still returned to client
      }
    })();

    return NextResponse.json({ scope: scopeText });
  } catch (err) {
    console.error("generate-scope error:", err);
    return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
  }
}
