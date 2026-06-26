import type { Metadata } from "next";
import SeoLandingPage, { type SeoLandingConfig } from "@/components/pages/SeoLandingPage";

export const metadata: Metadata = {
  title: "Building Remediation | Remedial Building Australia",
  description:
    "Building remediation guidance for Australian strata and apartment buildings — understand defects, repair systems and remediation works, and find specialists to carry them out.",
  alternates: { canonical: "/building-remediation" },
};

const config: SeoLandingConfig = {
  path: "/building-remediation",
  eyebrow: "Building Remediation",
  h1: "Building Remediation",
  intro:
    "Building remediation is the process of correcting defects and deterioration in an existing building to restore its performance, safety and durability. Remedial Building Australia is a knowledge platform that explains how remediation works, what it involves and where to find the right specialists.",
  primaryCta: { label: "Explore the Defect Library", href: "/defect-library" },
  sections: [
    {
      heading: "What building remediation involves",
      paragraphs: [
        "Remediation usually starts with investigation — establishing why a defect is occurring before any repair is specified. Treating the symptom without addressing the cause is one of the most common reasons remediation works fail or need to be repeated.",
        "From there, the work moves to scoping, selecting an appropriate repair system, carrying out the works and verifying the outcome. On apartment buildings this is often staged across common property and coordinated with owners and strata managers.",
      ],
    },
    {
      heading: "Common remediation works",
      paragraphs: [
        "Typical building remediation covers waterproofing and water ingress, concrete repair and remedial construction, façade and balcony rectification, basement waterproofing and crack injection. Each has its own causes, repair methods and material systems.",
        "The Defect Library sets out these defects by category, cause, risk and repair pathway, and the Repair Systems reference covers the products and methods used to remediate them.",
      ],
    },
    {
      heading: "Planning a remediation project",
      paragraphs: [
        "A well-defined scope keeps a remediation project on track and makes quotes comparable. The AI Scope Builder helps you structure a scope of works, and independent expert advice can review defects, scopes and budgets before you commit.",
      ],
    },
  ],
  links: [
    { label: "Defect Library", href: "/defect-library", description: "Causes, risks and repair pathways for common Class 2 building defects." },
    { label: "Repair Systems", href: "/repair-systems", description: "Technical reference for concrete repair, waterproofing, crack injection and coatings." },
    { label: "Expert Remedial Advice", href: "/expert-remedial-advice", description: "Independent desktop advice on defects, scopes, budgets and strata planning." },
    { label: "Business Directory", href: "/directory", description: "Find remedial building specialists across Australia." },
  ],
  relatedLinks: [
    { label: "Remedial Building Services", href: "/remedial-building-services" },
    { label: "Remedial Repair Specifications", href: "/remedial-repair-specifications" },
    { label: "Remedial Building Solutions", href: "/remedial-building-solutions" },
    { label: "Remedial Builders", href: "/remedial-builders" },
  ],
};

export default function BuildingRemediationPage() {
  return <SeoLandingPage config={config} />;
}
