"use client";

export default function AIScopeActions({ userId, status }: { userId: number; status: string }) {
  async function doAction(action: string) {
    await fetch("/api/directory/admin/ai-scope-users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, action }),
    });
    window.location.reload();
  }

  if (status === "pending") {
    return (
      <div className="flex gap-1">
        <button onClick={() => doAction("approve")} className="rounded px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition">Approve</button>
        <button onClick={() => doAction("disable")} className="rounded px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition">Reject</button>
      </div>
    );
  }
  if (["active", "approved", "trial"].includes(status)) {
    return (
      <button onClick={() => doAction("disable")} className="rounded px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition">
        Disable
      </button>
    );
  }
  return <span className="text-xs text-slate-400">—</span>;
}
