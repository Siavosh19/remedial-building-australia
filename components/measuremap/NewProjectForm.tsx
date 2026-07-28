"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { MapPin, Check, Loader2 } from "lucide-react";
import { createProjectAction, type CreateProjectState } from "@/app/measuremap/(workspace)/actions";

type Suggestion = { id: string; label: string };

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Create project &amp; open map
    </button>
  );
}

export default function NewProjectForm() {
  const [state, formAction] = useActionState<CreateProjectState, FormData>(createProjectAction, {});
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [chosen, setChosen] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (chosen && query === chosen.label) return; // don't re-search the confirmed value
    if (timer.current) clearTimeout(timer.current);
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/measuremap/geocode?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
        setOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query, chosen]);

  function pick(s: Suggestion) {
    setChosen(s);
    setQuery(s.label);
    setOpen(false);
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Address (required, must be confirmed) */}
      <div>
        <label className="block text-sm font-semibold text-slate-800">
          Property address <span className="text-red-600">*</span>
        </label>
        <p className="mb-2 text-xs text-slate-500">Search and select the address. A project can&apos;t be created without a confirmed address.</p>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            autoComplete="off"
            onChange={(e) => {
              setQuery(e.target.value);
              setChosen(null);
            }}
            onFocus={() => suggestions.length && setOpen(true)}
            placeholder="e.g. 12 Smith Street, Bondi NSW 2026"
            className="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-9 pr-9 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
          {loading && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-slate-400" />}
          {chosen && !loading && <Check className="absolute right-3 top-3 h-4 w-4 text-green-600" />}

          {open && suggestions.length > 0 && (
            <ul className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg">
              {suggestions.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => pick(s)}
                    className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {chosen && (
          <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-green-700">
            <Check className="h-3.5 w-3.5" /> Address confirmed
          </p>
        )}
        <input type="hidden" name="address_id" value={chosen?.id ?? ""} />
      </div>

      {/* Optional details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-800">Project name <span className="font-normal text-slate-400">(optional)</span></label>
          <input name="project_name" type="text" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800">Reference <span className="font-normal text-slate-400">(optional)</span></label>
          <input name="project_reference" type="text" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-800">Notes <span className="font-normal text-slate-400">(optional)</span></label>
        <textarea name="notes" rows={3} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200" />
      </div>

      {state.error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      <div className="flex items-center gap-3">
        <SubmitButton disabled={!chosen} />
        <a href="/measuremap" className="text-sm font-medium text-slate-500 hover:text-slate-800">Cancel</a>
      </div>
    </form>
  );
}
