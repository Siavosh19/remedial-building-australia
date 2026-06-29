import { permanentRedirect } from "next/navigation";

// Clean business URL alias. The canonical profile lives at
// /directory/company/[slug]; this 308-redirects there to preserve link equity.
export default async function BusinessAlias({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/directory/company/${slug}`);
}
