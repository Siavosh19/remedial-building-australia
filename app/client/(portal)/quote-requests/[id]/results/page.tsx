import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentClientUser } from "@/lib/directory-auth";
import { findResultsForRequest } from "@/lib/quote-matching";
import ResultsClient from "./ResultsClient";

export const dynamic = "force-dynamic";

export default async function QuoteRequestResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentClientUser();
  if (!user) redirect("/directory/login");

  const { id } = await params;
  const requestId = Number(id);
  if (!Number.isInteger(requestId)) notFound();

  const r = await prisma.clientQuoteRequest.findFirst({
    where: { id: requestId, client_user_id: user.id },
    include: { work_category: { select: { name: true } }, deliveries: { select: { company_id: true } } },
  });
  if (!r) notFound();

  const businesses = await findResultsForRequest({
    work_category_id: r.work_category_id,
    work_subcategory_id: r.work_subcategory_id,
    suburb: r.suburb,
    postcode: r.postcode,
    state: r.state,
    latitude: r.latitude,
    longitude: r.longitude,
  });

  const alreadySent = r.deliveries.map((d) => d.company_id);

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/client/quote-requests/${r.id}`} className="text-sm text-slate-500 hover:text-slate-800">
          &larr; Back to request
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Choose who to request quotes from</h1>
        <p className="mt-1 text-sm text-slate-500">
          {r.work_category?.name ?? "Building works"} · {r.suburb} {r.postcode} · {businesses.length} businesses service your area.
          Send your request to up to 5 — they&rsquo;ll contact you directly.
        </p>
      </div>

      <ResultsClient requestId={r.id} businesses={businesses} alreadySent={alreadySent} />
    </div>
  );
}
