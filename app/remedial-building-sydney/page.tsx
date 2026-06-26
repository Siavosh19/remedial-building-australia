import type { Metadata } from "next";
import SeoLandingPage, { type SeoLandingConfig } from "@/components/pages/SeoLandingPage";

export const metadata: Metadata = {
  title: "Remedial Building Sydney | Remedial Building Australia",
  description:
    "Remedial building in Sydney — guidance on common apartment and strata defects across NSW, repair systems and specifications, and a directory of Sydney remedial specialists.",
  alternates: { canonical: "/remedial-building-sydney" },
};

const config: SeoLandingConfig = {
  path: "/remedial-building-sydney",
  eyebrow: "Remedial Building Sydney",
  h1: "Remedial Building in Sydney",
  intro:
    "Sydney has one of Australia's largest stocks of apartment and strata buildings, and with it a significant need for remedial building work. Remedial Building Australia provides defect guidance, repair system information and a directory of specialists to help Sydney owners and committees address building defects.",
  primaryCta: { label: "Find Sydney Specialists", href: "/directory" },
  sections: [
    {
      heading: "Remedial building across Sydney and NSW",
      paragraphs: [
        "Sydney's coastal climate, ageing apartment stock and dense strata housing make waterproofing failure, concrete deterioration and façade defects especially common. Remediation in NSW also sits within an active regulatory environment for residential apartment buildings.",
        "Understanding the defect and the correct repair pathway is the first step, whether the building is in the CBD, the eastern suburbs, the inner west or greater Sydney.",
      ],
    },
    {
      heading: "Common defects in Sydney apartments",
      paragraphs: [
        "Balcony and podium leaks, basement water ingress, façade cracking, render delamination and concrete spalling are among the defects most often seen in Sydney apartment buildings. The Defect Library explains each by cause, risk and repair pathway, and the Repair Systems reference covers the methods and materials used to fix them.",
      ],
    },
    {
      heading: "Find Sydney remedial specialists",
      paragraphs: [
        "Our national directory lists remedial consultants, contractors and specialists, so you can search for providers in Sydney and across New South Wales. For an independent view before committing to works, expert remedial advice offers desktop reviews of defects, scopes and budgets.",
      ],
    },
  ],
  links: [
    { label: "Business Directory", href: "/directory", description: "Search remedial specialists in Sydney and across Australia." },
    { label: "Defect Library", href: "/defect-library", description: "Causes, risks and repair pathways for common Class 2 building defects." },
    { label: "Repair Systems", href: "/repair-systems", description: "Technical reference for concrete repair, waterproofing, crack injection and coatings." },
    { label: "Expert Remedial Advice", href: "/expert-remedial-advice", description: "Independent desktop advice on defects, scopes, budgets and strata planning." },
  ],
  relatedLinks: [
    { label: "Remedial Building Services", href: "/remedial-building-services" },
    { label: "Building Remediation", href: "/building-remediation" },
    { label: "Remedial Builders", href: "/remedial-builders" },
    { label: "Remedial Building Solutions", href: "/remedial-building-solutions" },
  ],
};

export default function RemedialBuildingSydneyPage() {
  return <SeoLandingPage config={config} />;
}
