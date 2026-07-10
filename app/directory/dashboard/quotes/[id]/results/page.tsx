import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { findResultsForRequest, type ResultBusiness } from "@/lib/quote-matching";
import ResultsClient from "./ResultsClient";

export const dynamic = "force-dynamic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// Reuse the directory search engine (synonym + category-intent aware) so the
// results match the same businesses the public directory shows for that trade —
// not just the exact category record the client happened to pick.
async function searchBusinesses(r: {
  categoryName: string;
  suburb: string;
  postcode: string;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
}): Promise<ResultBusiness[]> {
  const sp = new URLSearchParams();
  sp.set("q", r.categoryName);
  if (r.latitude != null && r.longitude != null) {
    sp.set("lat", String(r.latitude));
    sp.set("lng", String(r.longitude));
    if (r.state) sp.set("locationState", r.state);
  }
  if (r.suburb) sp.set("suburb", r.suburb);
  if (r.postcode) sp.set("postcode", r.postcode);
  if (r.state) sp.set("state", r.state);

  const res = await fetch(`${SITE}/api/directory/search?${sp.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("search failed");
  const data = await res.json();
  type SC = {
    id: number; slug: string; name: string; description: string | null; plan_type?: string; logo_url?: string | null;
    distance_km?: number | null; main_category?: { name: string } | null;
    locations?: { suburb: string | null; state: string; services_statewide?: boolean; services_nationwide?: boolean }[];
  };
  const companies: SC[] = data.companies ?? [];
  return companies.map((c) => {
    const plan = c.plan_type ?? "basic";
    const tier = plan === "featured" ? "gold" : plan === "claimed" ? "silver" : "free";
    const loc = c.locations?.[0];
    return {
      company_id: c.id, slug: c.slug, name: c.name, logo_url: c.logo_url ?? null,
      plan_type: plan, tier,
      category: c.main_category?.name ?? null,
      description: c.description ?? null,
      suburb: loc?.suburb ?? null, state: loc?.state ?? null,
      distance_km: c.distance_km ?? null,
      services_statewide: loc?.services_statewide ?? false,
      services_nationwide: loc?.services_nationwide ?? false,
      can_request: plan === "featured" || plan === "claimed",
    };
  });
}

export default async function QuoteRequestResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/directory/dashboard/quotes");

  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId)) notFound();

  const r = await prisma.clientQuoteRequest.findFirst({
    where: { id: requestId, client_user_id: user.id },
    include: { work_category: { select: { name: true } }, deliveries: { select: { company_id: true } } },
  });
  if (!r) notFound();

  // Primary: directory search engine (synonym-aware). Fall back to exact-category
  // matching if the search call fails for any reason.
  let businesses: ResultBusiness[] = [];
  try {
    businesses = await searchBusinesses({
      categoryName: r.work_category?.name ?? "",
      suburb: r.suburb, postcode: r.postcode, state: r.state, latitude: r.latitude, longitude: r.longitude,
    });
  } catch {
    businesses = await findResultsForRequest({
      work_category_id: r.work_category_id, work_subcategory_id: r.work_subcategory_id,
      suburb: r.suburb, postcode: r.postcode, state: r.state, latitude: r.latitude, longitude: r.longitude,
    });
  }

  const alreadySent = r.deliveries.map((d) => d.company_id);

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/directory/dashboard/quotes/${r.id}`} className="text-lg font-bold text-slate-900 hover:text-black">
          &larr; Back to request
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Choose who to request quotes from</h1>
        <p className="mt-1 text-sm text-slate-500">
          {r.work_category?.name ?? "Building works"} · {r.suburb} {r.postcode} · {businesses.length} {businesses.length === 1 ? "business" : "businesses"} service your area.
          Send your request to up to 5 — they&rsquo;ll contact you directly.
        </p>
      </div>

      <ResultsClient requestId={r.id} businesses={businesses} alreadySent={alreadySent} />
    </div>
  );
}
