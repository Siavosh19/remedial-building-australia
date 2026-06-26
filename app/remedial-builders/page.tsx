import type { Metadata } from "next";
import SeoLandingPage, { type SeoLandingConfig } from "@/components/pages/SeoLandingPage";

export const metadata: Metadata = {
  title: "Remedial Builders | Remedial Building Australia",
  description:
    "Find remedial builders across Australia. Understand what remedial builders do, how to choose one, and search a national directory of remedial contractors and specialists.",
  alternates: { canonical: "/remedial-builders" },
};

const config: SeoLandingConfig = {
  path: "/remedial-builders",
  eyebrow: "Remedial Builders",
  h1: "Remedial Builders",
  intro:
    "Remedial builders specialise in repairing and restoring existing buildings rather than constructing new ones. Their work covers concrete repair, waterproofing, façade rectification and structural remediation, often on strata and apartment buildings. Remedial Building Australia helps you understand the trade and find specialists.",
  primaryCta: { label: "Find Remedial Builders", href: "/directory" },
  sections: [
    {
      heading: "What remedial builders do",
      paragraphs: [
        "Remedial builders carry out the physical repair works that bring a building back to a safe, durable and compliant condition. This includes concrete repair and remedial construction, waterproofing, crack injection, façade and balcony rectification, and coordinating specialist trades.",
        "Because remedial work deals with existing structures, experience matters — diagnosing the real cause of a defect and applying the correct repair system is what separates a lasting repair from a recurring problem.",
      ],
    },
    {
      heading: "Choosing a remedial builder",
      paragraphs: [
        "When comparing remedial builders, look for relevant experience with your defect type and building, appropriate licensing, and a clear understanding of the specified repair systems. A well-defined scope makes it far easier to compare builders fairly.",
        "Our national directory lets you search remedial contractors and specialists by location and area of expertise.",
      ],
    },
    {
      heading: "Supporting your project",
      paragraphs: [
        "Before engaging a builder, it helps to have a clear scope and an independent view. The AI Scope Builder structures a scope of works, and expert remedial advice can review scopes, quotes and tenders so you can engage a builder with confidence.",
      ],
    },
  ],
  links: [
    { label: "Business Directory", href: "/directory", description: "Search remedial contractors and specialists across Australia." },
    { label: "Expert Remedial Advice", href: "/expert-remedial-advice", description: "Independent review of scopes, quotes and tenders before you engage a builder." },
    { label: "AI Scope Builder", href: "/ai-scope-builder", description: "Generate a consultant, builder or strata-ready scope of works." },
    { label: "Defect Library", href: "/defect-library", description: "Causes, risks and repair pathways for common Class 2 building defects." },
  ],
  relatedLinks: [
    { label: "Remedial Building Services", href: "/remedial-building-services" },
    { label: "Building Remediation", href: "/building-remediation" },
    { label: "Remedial Repair Specifications", href: "/remedial-repair-specifications" },
    { label: "Remedial Building Solutions", href: "/remedial-building-solutions" },
  ],
};

export default function RemedialBuildersPage() {
  return <SeoLandingPage config={config} />;
}
