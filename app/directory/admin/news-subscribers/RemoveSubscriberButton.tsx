"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

// Removes one address from the newsletter list. Deleting a subscriber is not
// recoverable from the UI, so it confirms first and records who did it in the
// audit log server-side.
export default function RemoveSubscriberButton({ email, name }: { email: string; name: string | null }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    const who = name ? `${name} (${email})` : email;
    if (!confirm(`Remove ${who} from the newsletter list? They will stop receiving the Weekly Remedial Building Update.`)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/directory/admin/news-subscribers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(result.error ?? "Could not remove that subscriber. Please try again.");
        setBusy(false);
        return;
      }
      router.refresh();
    } catch {
      alert("Could not reach the server. Please try again.");
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      title={`Remove ${email}`}
      aria-label={`Remove ${email}`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
