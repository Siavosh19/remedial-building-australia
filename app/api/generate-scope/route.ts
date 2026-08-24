import { NextResponse } from "next/server";

// The AI Scope Builder was withdrawn on 2026-08-24.
//
// Generating a scope of works or specification for Class 2 remedial building
// work risks engaging the Design and Building Practitioners Act 2020 (NSW),
// which requires such designs to be produced by a registered design
// practitioner with a compliance declaration. RBA is not registered, so the
// endpoint is retired rather than gated.
//
// The previous implementation is preserved in
// backups/ai-scope-builder-removed-20260824.tar.gz.

const GONE = {
  error: "withdrawn",
  message:
    "The AI Scope Builder has been withdrawn. For a review of a scope of works, quote or specification, use the expert remedial advice service.",
  see: "/expert-remedial-advice",
};

export async function POST() {
  return NextResponse.json(GONE, { status: 410 });
}

export async function GET() {
  return NextResponse.json(GONE, { status: 410 });
}
