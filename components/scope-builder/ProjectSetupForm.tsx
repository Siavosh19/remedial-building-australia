"use client";

import type { ProjectData } from "@/lib/scope-builder-types";

const BUILDING_TYPES = [
  "Residential Apartment (Class 2)",
  "Mixed Use (Class 2/5/6)",
  "Commercial (Class 5/6)",
  "Aged Care (Class 9c)",
  "Student Accommodation",
  "Hotel / Serviced Apartments",
  "Other",
];

const ACCESS_CONSTRAINTS = [
  "No significant constraints",
  "Ground level only",
  "Boom lift / EWP required",
  "Scaffolding required",
  "Rope access required",
  "Mixed access methods",
  "Confined space access",
];

const INPUT_CLS =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition";

const LABEL_CLS = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400";

interface Props {
  data: ProjectData;
  onChange: (data: ProjectData) => void;
}

export function ProjectSetupForm({ data, onChange }: Props) {
  function set<K extends keyof ProjectData>(key: K, value: ProjectData[K]) {
    onChange({ ...data, [key]: value });
  }

  const boolBtn = (active: boolean, label: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
        active
          ? "border-sky-950 bg-sky-950 text-white"
          : "border-slate-200 bg-white text-slate-500 hover:border-sky-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Project Name */}
      <div className="sm:col-span-2">
        <label className={LABEL_CLS}>Project Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Oceana Apartments — Balcony Waterproofing Rectification"
          className={INPUT_CLS}
        />
      </div>

      {/* Address */}
      <div className="sm:col-span-2">
        <label className={LABEL_CLS}>
          Property Address <span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder="e.g. 42 Marine Parade, Manly NSW 2095"
          className={INPUT_CLS}
        />
      </div>

      {/* Building Type */}
      <div>
        <label className={LABEL_CLS}>Building Type</label>
        <select
          value={data.buildingType}
          onChange={(e) => set("buildingType", e.target.value)}
          className={INPUT_CLS}
        >
          {BUILDING_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Class 2 */}
      <div>
        <label className={LABEL_CLS}>Class 2 Building?</label>
        <div className="flex gap-2">
          {boolBtn(data.isClass2, "Yes — Class 2", () => set("isClass2", true))}
          {boolBtn(!data.isClass2, "No", () => set("isClass2", false))}
        </div>
      </div>

      {/* Occupied */}
      <div>
        <label className={LABEL_CLS}>Occupancy During Works</label>
        <div className="flex gap-2">
          {boolBtn(data.occupied, "Occupied", () => set("occupied", true))}
          {boolBtn(!data.occupied, "Unoccupied", () => set("occupied", false))}
        </div>
      </div>

      {/* Coastal */}
      <div>
        <label className={LABEL_CLS}>Coastal Exposure?</label>
        <div className="flex gap-2">
          {boolBtn(data.coastalExposure, "Yes — Within 1km of coast", () => set("coastalExposure", true))}
          {boolBtn(!data.coastalExposure, "No", () => set("coastalExposure", false))}
        </div>
      </div>

      {/* Levels */}
      <div>
        <label className={LABEL_CLS}>Number of Levels</label>
        <input
          type="text"
          value={data.levels}
          onChange={(e) => set("levels", e.target.value)}
          placeholder="e.g. 12"
          className={INPUT_CLS}
        />
      </div>

      {/* Lots */}
      <div>
        <label className={LABEL_CLS}>Number of Lots / Units</label>
        <input
          type="text"
          value={data.lots}
          onChange={(e) => set("lots", e.target.value)}
          placeholder="e.g. 48"
          className={INPUT_CLS}
        />
      </div>

      {/* Client Name */}
      <div>
        <label className={LABEL_CLS}>Client Name</label>
        <input
          type="text"
          value={data.clientName}
          onChange={(e) => set("clientName", e.target.value)}
          placeholder="e.g. Oceana Strata Plan SP12345"
          className={INPUT_CLS}
        />
      </div>

      {/* Prepared By */}
      <div>
        <label className={LABEL_CLS}>Prepared By</label>
        <input
          type="text"
          value={data.preparedBy}
          onChange={(e) => set("preparedBy", e.target.value)}
          placeholder="e.g. John Smith, Remedial Consultant"
          className={INPUT_CLS}
        />
      </div>

      {/* Report Date */}
      <div>
        <label className={LABEL_CLS}>Report Date</label>
        <input
          type="date"
          value={data.reportDate}
          onChange={(e) => set("reportDate", e.target.value)}
          className={INPUT_CLS}
        />
      </div>

      {/* Access Constraints */}
      <div>
        <label className={LABEL_CLS}>Access Constraints</label>
        <select
          value={data.accessConstraints}
          onChange={(e) => set("accessConstraints", e.target.value)}
          className={INPUT_CLS}
        >
          {ACCESS_CONSTRAINTS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div className="sm:col-span-2">
        <label className={LABEL_CLS}>Additional Project Notes</label>
        <textarea
          value={data.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          placeholder="Any relevant background, history of defects, previous repairs, or special considerations…"
          className={INPUT_CLS}
        />
      </div>
    </div>
  );
}
