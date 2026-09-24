"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

const FIELD =
  "w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-slate-500";

export type Member = {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  status: string;
  lot_number: string | null;
  accepted_at: string | null;
};

const ROLE_LABEL: Record<string, string> = {
  chair: "Chairperson",
  treasurer: "Treasurer",
  secretary: "Secretary",
  committee: "Committee member",
  owner: "Owner (read only)",
};

export default function MembersClient({
  schemeId,
  members,
  lots,
  canManage,
  committeeLabel,
}: {
  schemeId: number;
  members: Member[];
  lots: { id: number; lot_number: string }[];
  canManage: boolean;
  committeeLabel: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualLink, setManualLink] = useState<string | null>(null);

  async function invite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setManualLink(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch(`/api/client/strata/${schemeId}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not send the invitation.");
      return;
    }
    if (!json.emailed && json.link) setManualLink(json.link);
    form.reset();
    router.refresh();
  }

  async function remove(m: Member) {
    const verb = m.status === "invited" ? "Withdraw the invitation for" : "Remove";
    if (!confirm(`${verb} ${m.email}?`)) return;
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/client/strata/${schemeId}/members/${m.id}`, { method: "DELETE" });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Could not remove.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Person</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Lot</th>
              <th className="px-4 py-3">Status</th>
              {canManage && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-900">{m.full_name ?? m.email}</span>
                  {m.full_name && <span className="ml-2 text-xs text-slate-500">{m.email}</span>}
                </td>
                <td className="px-4 py-3 text-slate-700">{ROLE_LABEL[m.role] ?? m.role}</td>
                <td className="px-4 py-3 text-slate-500">{m.lot_number ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      m.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {m.status === "active" ? "Active" : "Invited"}
                  </span>
                </td>
                {canManage && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => remove(m)}
                        disabled={busy}
                        title={m.status === "invited" ? "Withdraw invitation" : "Remove"}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      {manualLink && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">The invitation could not be emailed.</p>
          <p className="mt-1">Send this link to them yourself — it only works for the address you invited:</p>
          <p className="mt-2 break-all font-mono text-xs">{manualLink}</p>
        </div>
      )}

      {canManage && (
        <form onSubmit={invite} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Invite someone</h2>
          <p className="mt-1 text-sm text-slate-500">
            They will be asked to sign in and accept before they can see anything. Nothing about the scheme is
            shared until they do.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="full_name">Name</label>
              <input id="full_name" name="full_name" className={`${FIELD} mt-1.5`} />
            </div>
            <div>
              <label className={LABEL} htmlFor="role">Role on the {committeeLabel.toLowerCase()}</label>
              <select id="role" name="role" defaultValue="committee" className={`${FIELD} mt-1.5`}>
                <option value="chair">Chairperson</option>
                <option value="treasurer">Treasurer</option>
                <option value="secretary">Secretary</option>
                <option value="committee">Committee member</option>
                <option value="owner">Owner (read only)</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="lot_id">Lot (optional)</label>
              <select id="lot_id" name="lot_id" defaultValue="" className={`${FIELD} mt-1.5`}>
                <option value="">—</option>
                {lots.map((l) => (
                  <option key={l.id} value={l.id}>
                    Lot {l.lot_number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-5 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
          >
            {busy ? "Sending…" : "Send invitation"}
          </button>
        </form>
      )}
    </div>
  );
}
