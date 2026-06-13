"use client";

import { useRef, useState } from "react";
import FileUploadZone from "./FileUploadZone";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20";

export default function DefectEntryList() {
  const [ids, setIds] = useState<number[]>([1]);
  const nextRef = useRef(2);

  function add() {
    if (ids.length >= 10) return;
    setIds((prev) => [...prev, nextRef.current++]);
  }

  function remove(id: number) {
    setIds((prev) => prev.filter((i) => i !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Defects to Assess</p>
        <span className="text-xs text-slate-400">{ids.length} / 10</span>
      </div>

      {ids.map((id, index) => {
        const n = index + 1;
        return (
          <div key={id} className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Defect {n}
              </span>
              {ids.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(id)}
                  className="text-xs font-semibold text-slate-400 transition hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Location</label>
                <input
                  type="text"
                  name={`defect${n}Location`}
                  className={fieldClass}
                  placeholder="e.g. Balcony, bathroom, roof, external wall"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Visible Issue</label>
                <input
                  type="text"
                  name={`defect${n}Type`}
                  className={fieldClass}
                  placeholder="e.g. Water stain, crack, spalling, mould"
                />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Photos for defect {n}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <FileUploadZone
                  name={`defect${n}CloseupPhotos`}
                  label="Close-up Photos"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  hint="Close shots showing the defect detail"
                  maxFiles={2}
                />
                <FileUploadZone
                  name={`defect${n}WidePhotos`}
                  label="Wide-angle Photos"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  hint="Photos from further back showing the full area"
                  maxFiles={2}
                />
              </div>
            </div>

          </div>
        );
      })}

      {ids.length < 10 && (
        <button
          type="button"
          onClick={add}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white py-3 text-sm font-semibold text-slate-500 transition hover:border-sky-400 hover:text-sky-700"
        >
          <span className="text-lg leading-none">+</span>
          Add another defect
        </button>
      )}
    </div>
  );
}
