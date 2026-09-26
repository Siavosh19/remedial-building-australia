"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Eraser, Send, Sparkles, X } from "lucide-react";

type Message = { id: number | string; role: string; content: string };
type Allowance = { used: number; allowance: number; remaining: number; exhausted: boolean };

/** Which page the conversation belongs to, so each keeps its own thread. */
function topicFor(pathname: string, schemeId: number): { topic: string; label: string } {
  const base = `/client/strata/${schemeId}`;
  const rest = pathname.startsWith(base) ? pathname.slice(base.length).replace(/^\//, "") : "";
  const first = rest.split("/")[0] || "overview";

  const labels: Record<string, string> = {
    overview: "this scheme",
    lots: "the strata roll",
    budget: "the budget",
    levies: "levies",
    arrears: "arrears",
    defects: "defects",
    "work-orders": "work orders",
    contractors: "businesses",
    expenses: "expenses",
    compliance: "compliance",
    "capital-works": "capital works",
    financials: "the financials",
    meetings: "meetings",
    records: "the records",
    members: "people",
  };

  const topic = labels[first] ? first : "overview";
  return { topic, label: labels[topic] };
}

const SUGGESTIONS: Record<string, string[]> = {
  overview: ["What should the committee be worrying about?", "Summarise where this scheme stands."],
  lots: ["Check the entitlements add up.", "Which lots have no service address recorded?"],
  budget: ["Is anything obviously missing from this budget?", "What does this work out to per lot?"],
  levies: ["Which lots have not paid?", "Explain how this quarter was worked out."],
  arrears: ["Draft a reminder for the worst lot.", "How much is owed and for how long?"],
  defects: ["Write a scope of works for the newest defect.", "Which defects have been open longest?"],
  "work-orders": ["Which jobs have no price agreed?", "Summarise what is in progress."],
  contractors: ["Whose insurance is out of date?", "Who mows the lawns?"],
  expenses: ["Which budget lines are overspent?", "What is still unpaid?"],
  compliance: ["What is due in the next 60 days?", "What has been missed?"],
  "capital-works": ["When does the fund run short, and why?", "What is the biggest job coming up?"],
  financials: ["Explain these statements in plain words.", "Why is the surplus what it is?"],
  meetings: ["What is still outstanding from past meetings?", "Draft an agenda from the open actions."],
  records: ["What correspondence is waiting on us?", "Summarise the open breaches."],
  members: ["Who can change things in this scheme?", "Who has not accepted their invitation?"],
};

export default function AiPanel({ schemeId }: { schemeId: number }) {
  const pathname = usePathname();
  const { topic, label } = topicFor(pathname, schemeId);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [allowance, setAllowance] = useState<Allowance | null>(null);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Load this page's thread when the panel is opened, and whenever the page
  // behind it changes while the panel is still open.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setError(null);
    fetch(`/api/client/strata/${schemeId}/ai?topic=${encodeURIComponent(topic)}`)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        setMessages(json.messages ?? []);
        setAllowance(json.allowance ?? null);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load the conversation.");
      });
    return () => {
      cancelled = true;
    };
  }, [open, topic, schemeId]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const asked = text.trim();
    if (!asked || busy) return;

    setBusy(true);
    setError(null);
    setQuestion("");
    setMessages((prev) => [...prev, { id: `local-${Date.now()}`, role: "user", content: asked }]);

    const res = await fetch(`/api/client/strata/${schemeId}/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, question: asked }),
    });
    const json = await res.json().catch(() => ({}));

    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "That did not work.");
      if (json.allowance) setAllowance(json.allowance);
      return;
    }
    setMessages((prev) => [...prev, { id: `reply-${Date.now()}`, role: "assistant", content: json.reply }]);
    if (json.allowance) setAllowance(json.allowance);
  }

  async function clearThread() {
    if (!confirm("Clear this conversation?")) return;
    await fetch(`/api/client/strata/${schemeId}/ai?topic=${encodeURIComponent(topic)}`, { method: "DELETE" });
    setMessages([]);
  }

  const used = allowance ? Math.min(100, Math.round((allowance.used / allowance.allowance) * 100)) : 0;

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-sky-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-800 print:hidden"
        >
          <Sparkles size={16} /> AI
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 print:hidden" onClick={() => setOpen(false)}>
          <aside
            className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-950 text-white">
                <Sparkles size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">Ask about {label}</p>
                <p className="text-xs text-slate-500">Reads this scheme&apos;s records. Does not act.</p>
              </div>
              {messages.length > 0 && (
                <button onClick={clearThread} title="Clear conversation" className="text-slate-400 hover:text-slate-700">
                  <Eraser size={16} />
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-500">
                    It answers from what this scheme has recorded — the roll, the levies, the invoices, the
                    registers. It will not tell you what the law requires; for that it points you at your state
                    authority.
                  </p>
                  <div className="space-y-2">
                    {(SUGGESTIONS[topic] ?? []).map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-8 bg-sky-950 text-white"
                      : "mr-4 border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  {m.content}
                </div>
              ))}

              {busy && (
                <div className="mr-4 rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-400">
                  Reading the records…
                </div>
              )}

              {error && <p className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700">{error}</p>}

              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(question);
              }}
              className="border-t border-slate-200 px-4 py-3"
            >
              {allowance && (
                <div className="mb-2">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full ${used >= 100 ? "bg-red-600" : used > 80 ? "bg-amber-500" : "bg-sky-700"}`}
                      style={{ width: `${used}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {allowance.remaining.toLocaleString("en-AU")} of{" "}
                    {allowance.allowance.toLocaleString("en-AU")} tokens left this month
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={`Ask about ${label}…`}
                  disabled={busy || allowance?.exhausted}
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-700 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-50"
                />
                <button
                  type="submit"
                  disabled={busy || !question.trim() || allowance?.exhausted}
                  className="rounded-xl bg-red-700 px-3.5 py-2.5 text-white transition hover:bg-red-800 disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}
