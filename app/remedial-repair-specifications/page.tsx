import type { Metadata } from "next";
import SeoLandingPage, { type SeoLandingConfig } from "@/components/pages/SeoLandingPage";

export const metadata: Metadata = {
  title: "Remedial Repair Specifications | Remedial Building Australia",
  description:
    "Remedial repair specifications for Australian buildings — what a remedial specification should include, the standards involved, and tools to help you write a clear scope of works.",
  alternates: { canonical: "/remedial-repair-specifications" },
};

const config: SeoLandingConfig = {
  path: "/remedial-repair-specifications",
  eyebrow: "Remedial Repair Specifications",
  h1: "Remedial Repair Specifications",
  intro:
    "A remedial repair specification sets out exactly how a defect is to be repaired — the scope, the materials, the standards and the method. A clear specification is the foundation of a fair tender and a durable repair. Remedial Building Australia explains what specifications should cover and provides tools to help you prepare them.",
  primaryCta: { label: "Open the AI Scope Builder", href: "/ai-scope-builder" },
  sections: [
    {
      heading: "What a remedial repair specification includes",
      paragraphs: [
        "A good specification describes the defect and its location, the repair method, the products or systems to be used, surface preparation, application requirements and the relevant Australian Standards. It should also make exclusions and assumptions explicit so that quotes can be compared on equal terms.",
        "Vague or incomplete specifications are a common source of variations, disputes and underperforming repairs. The more precisely the work is defined, the easier it is to price, deliver and verify.",
      ],
    },
    {
      heading: "Writing specifications and scopes",
      paragraphs: [
        "The AI Scope Builder helps you assemble a structured scope of works from defects, repair systems, materials and clauses — producing a consultant, builder, strata or tender-ready document.",
        "The Repair Systems reference and Materials & Products Index provide the technical detail behind each clause, so specifications reflect appropriate, available repair systems.",
      ],
    },
    {
      heading: "Standards and independent review",
      paragraphs: [
        "Specifications should reference the appropriate standards for the repair type and building. If you would like an independent check before issuing a specification or tender, our expert remedial advice includes scope, quote and tender review.",
      ],
    },
  ],
  links: [
    { label: "AI Scope Builder", href: "/ai-scope-builder", description: "Generate a consultant, builder or strata-ready scope of works." },
    { label: "Repair Systems", href: "/repair-systems", description: "Technical reference for concrete repair, waterproofing, crack injection and coatings." },
    { label: "Expert Remedial Advice", href: "/expert-remedial-advice", description: "Independent desktop review of defects, scopes, quotes and tenders." },
    { label: "Defect Library", href: "/defect-library", description: "Causes, risks and repair pathways for common Class 2 building defects." },
  ],
  relatedLinks: [
    { label: "Remedial Building Services", href: "/remedial-building-services" },
    { label: "Building Remediation", href: "/building-remediation" },
    { label: "Remedial Building Solutions", href: "/remedial-building-solutions" },
    { label: "Remedial Builders", href: "/remedial-builders" },
  ],
};

export default function RemedialRepairSpecificationsPage() {
  return <SeoLandingPage config={config} />;
}
