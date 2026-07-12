import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AuditLogPage({ searchParams }: { searchParams: { page?: string; entity_type?: string } }) {
  const page = Math.max(1, Number(searchParams.page ?? "1"));
  const entityType = searchParams.entity_type;
  const take = 50;
  const skip = (page - 1) * take;

  const where = entityType ? { entity_type: entityType } : {};

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip,
      take,
    }),
    prisma.auditLog.count({ where }),
  ]);

  const totalPages = Math.ceil(total / take);

  const entityTypes = ["supplier", "supplier_product", "user", "company"];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Audit Log</h1>
        <p className="text-sm text-slate-500 mt-1">{total} total entries</p>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <a href="/directory/admin/audit-log" className={`rounded-full px-3 py-1 text-xs font-semibold transition ${!entityType ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          All
        </a>
        {entityTypes.map(t => (
          <a key={t} href={`/directory/admin/audit-log?entity_type=${t}`} className={`rounded-full px-3 py-1 text-xs font-semibold transition ${entityType === t ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {t}
          </a>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Time</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Entity</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Action</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Previous</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">New</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Actor</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{new Date(log.created_at).toLocaleString("en-AU", { dateStyle: "short", timeStyle: "short" })}</td>
                <td className="px-4 py-3">
                  <div className="text-xs font-mono text-slate-600">{log.entity_type}</div>
                  <div className="text-xs text-slate-400">#{log.entity_id}</div>
                </td>
                <td className="px-4 py-3 text-xs font-mono text-slate-700">{log.action}</td>
                <td className="px-4 py-3 text-xs text-slate-400 max-w-[200px] truncate">
                  {log.previous_value ? JSON.stringify(log.previous_value).slice(0, 60) : "—"}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 max-w-[200px] truncate">
                  {log.new_value ? JSON.stringify(log.new_value).slice(0, 60) : "—"}
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">{log.actor_id ?? "system"}</td>
              </tr>
            ))}
            {!logs.length && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No audit entries</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {page > 1 && (
            <a href={`/directory/admin/audit-log?page=${page - 1}${entityType ? `&entity_type=${entityType}` : ""}`} className="rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">← Prev</a>
          )}
          <span className="rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-sm text-slate-500">{page} / {totalPages}</span>
          {page < totalPages && (
            <a href={`/directory/admin/audit-log?page=${page + 1}${entityType ? `&entity_type=${entityType}` : ""}`} className="rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">Next →</a>
          )}
        </div>
      )}
    </div>
  );
}
