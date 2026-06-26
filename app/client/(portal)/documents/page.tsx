import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentClientUser } from "@/lib/directory-auth";
import { FILE_TYPE_OPTIONS } from "@/lib/quote-options";

export const dynamic = "force-dynamic";

const FILE_TYPE_LABELS = Object.fromEntries(FILE_TYPE_OPTIONS.map((o) => [o.id, o.label]));

export default async function ClientDocumentsPage() {
  const user = await getCurrentClientUser();
  if (!user) redirect("/directory/login");

  const files = await prisma.quoteRequestFile.findMany({
    where: { request: { client_user_id: user.id } },
    orderBy: { created_at: "desc" },
    include: { request: { select: { id: true, suburb: true, work_category: { select: { name: true } } } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Documents</h1>
        <p className="mt-1 text-sm text-slate-500">Every file you've attached to a quote request, in one place.</p>
      </div>

      {files.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-sm text-slate-500">You haven't uploaded any documents yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">File</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Request</th>
                <th className="px-5 py-3 font-semibold">Uploaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {files.map((f) => (
                <tr key={f.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-800 hover:text-sky-600">
                      {f.filename ?? "File"}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{FILE_TYPE_LABELS[f.file_type] ?? f.file_type}</td>
                  <td className="px-5 py-4">
                    <Link href={`/client/quote-requests/${f.request.id}`} className="text-sky-800 hover:text-sky-600">
                      {f.request.work_category?.name ?? "Building works"} · {f.request.suburb}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{new Date(f.created_at).toLocaleDateString("en-AU")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
