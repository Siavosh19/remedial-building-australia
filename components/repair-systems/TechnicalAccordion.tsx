"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function TechnicalAccordion({ children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
      >
        <div>
          <p className="text-base font-extrabold text-sky-950">
            System Technical Reference
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            Applications, selection criteria, limitations, standards, suitable defects and substrates
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
          {open ? (
            <>Hide detail <ChevronUp size={14} /></>
          ) : (
            <>Show detail <ChevronDown size={14} /></>
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-7 pb-7 pt-6">
          {children}
        </div>
      )}
    </div>
  );
}
