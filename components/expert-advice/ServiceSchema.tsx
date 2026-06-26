const SITE_URL = "https://www.remedialbuildingaustralia.com.au";

/**
 * Service + BreadcrumbList structured data (JSON-LD) for an Expert Remedial
 * Advice service page. Rendered once per service page. Visual output: none.
 */
export default function ServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  /** e.g. "/expert-remedial-advice/preliminary-defect-assessment" */
  path: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name,
        description,
        serviceType: name,
        url: `${SITE_URL}${path}`,
        areaServed: "AU",
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Expert Remedial Advice", item: `${SITE_URL}/expert-remedial-advice` },
          { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${path}` },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
