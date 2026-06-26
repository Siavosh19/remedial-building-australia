import type { Metadata } from "next";
import SeoLandingPage, { type SeoLandingConfig } from "@/components/pages/SeoLandingPage";

export const metadata: Metadata = {
  title: "Remedial Building Services | Remedial Building Australia",
  description:
    "Remedial building services for strata and apartment buildings — defect investigation, repair systems, specifications and a national directory of specialists.",
  alternates: { canonical: "/remedial-building-services" },
};

const config: SeoLandingConfig = {
  path: "/remedial-building-services",
  eyebrow: "Remedial Building Services",
  h1: "Remedial Building Services in Australia",
  intro:
    "Remedial building services cover the investigation, specification and repair of defects in existing buildings — from concrete repair and waterproofing to façade rectification. Remedial Building Australia brings this together in one place: technical guidance, repair system references and a national directory of specialists.",
  primaryCta: { label: "Browse the Directory", href: "/directory" },
  sections: [
    {
      heading: "What remedial building services involve",
      paragraphs: [
        "Remedial building work is the diagnosis and repair of defects in buildings that are already in use. It typically begins with identifying the cause of a problem — water ingress, concrete deterioration, failed waterproofing or façade defects — and then setting out the right repair method for that defect and building.",
        "Most of this work happens on strata and apartment buildings, where defects affect common property and need to be documented, scoped and repaired in a coordinated way. Clear information at each stage helps owners, committees and consultants make confident decisions.",
      ],
    },
    {
      heading: "Find and compare specialists",
      paragraphs: [
        "Our national directory lists remedial consultants, contractors, waterproofers, façade specialists and testing providers across Australia, so you can compare specialists by location and area of expertise.",
        "If you need an independent view before committing to works, our expert remedial advice services offer desktop reviews of defects, scopes, quotes and budgets.",
      ],
    },
    {
      heading: "Plan the works with confidence",
      paragraphs: [
        "Once you understand the defect, the next step is a clear scope. The Defect Library explains causes, risks and repair pathways, the Repair Systems reference covers the products and methods involved, and the AI Scope Builder helps structure a consultant, builder or strata-ready scope of works.",
      ],
    },
  ],
  links: [
    { label: "Business Directory", href: "/directory", description: "Find remedial building specialists across Australia." },
    { label: "Expert Remedial Advice", href: "/expert-remedial-advice", description: "Independent desktop advice on defects, scopes, budgets and strata planning." },
    { label: "Defect Library", href: "/defect-library", description: "Causes, risks and repair pathways for common Class 2 building defects." },
    { label: "Repair Systems", href: "/repair-systems", description: "Technical reference for concrete repair, waterproofing, crack injection and coatings." },
  ],
  relatedLinks: [
    { label: "Building Remediation", href: "/building-remediation" },
    { label: "Remedial Repair Specifications", href: "/remedial-repair-specifications" },
    { label: "Remedial Building Solutions", href: "/remedial-building-solutions" },
    { label: "Remedial Builders", href: "/remedial-builders" },
  ],
};

export default function RemedialBuildingServicesPage() {
  return <SeoLandingPage config={config} />;
}
