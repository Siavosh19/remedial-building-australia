import type { Metadata } from "next";
import SeoLandingPage, { type SeoLandingConfig } from "@/components/pages/SeoLandingPage";

export const metadata: Metadata = {
  title: "Remedial Building Solutions | Remedial Building Australia",
  description:
    "Remedial building solutions for common building defects — repair systems, materials and methods matched to the defect, plus independent advice and a directory of specialists.",
  alternates: { canonical: "/remedial-building-solutions" },
};

const config: SeoLandingConfig = {
  path: "/remedial-building-solutions",
  eyebrow: "Remedial Building Solutions",
  h1: "Remedial Building Solutions",
  intro:
    "Remedial building solutions are the repair systems, materials and methods used to put a building defect right and keep it that way. The right solution depends on the defect, the substrate and the building. Remedial Building Australia helps you match solutions to defects with structured, independent information.",
  primaryCta: { label: "Browse Repair Systems", href: "/repair-systems" },
  sections: [
    {
      heading: "Matching solutions to defects",
      paragraphs: [
        "There is rarely a single answer for a given defect — the appropriate solution depends on the cause, the exposure, the substrate and the constraints of the building. Choosing well means understanding the defect first, then selecting a repair system suited to it.",
        "The Defect Library connects each defect to its likely causes and repair pathways, which is the natural starting point for selecting a solution.",
      ],
    },
    {
      heading: "Repair systems and materials",
      paragraphs: [
        "The Repair Systems reference covers concrete repair mortars, corrosion inhibitors, waterproofing membranes, crack injection and protective coatings, structured for Australian remedial practice. The Materials & Products Index lets you browse the products behind those systems by brand, material type and application.",
      ],
    },
    {
      heading: "Independent advice and specialists",
      paragraphs: [
        "If you would like help choosing between options, expert remedial advice offers building repair strategy advice and independent reviews. When you are ready to engage someone, the directory lists specialists who deliver these solutions across Australia.",
      ],
    },
  ],
  links: [
    { label: "Repair Systems", href: "/repair-systems", description: "Technical reference for concrete repair, waterproofing, crack injection and coatings." },
    { label: "Materials & Products Index", href: "/materials-products-index", description: "Browse products by brand, material type, application and repair system." },
    { label: "Expert Remedial Advice", href: "/expert-remedial-advice", description: "Independent desktop advice on defects, repair strategy and budgets." },
    { label: "Business Directory", href: "/directory", description: "Find remedial building specialists across Australia." },
  ],
  relatedLinks: [
    { label: "Remedial Building Services", href: "/remedial-building-services" },
    { label: "Building Remediation", href: "/building-remediation" },
    { label: "Remedial Repair Specifications", href: "/remedial-repair-specifications" },
    { label: "Remedial Builders", href: "/remedial-builders" },
  ],
};

export default function RemedialBuildingSolutionsPage() {
  return <SeoLandingPage config={config} />;
}
