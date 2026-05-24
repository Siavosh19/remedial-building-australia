"use client";

import { useRef, useState } from "react";
import { MapPin, CheckCircle, Loader2 } from "lucide-react";
import type { ProjectData } from "@/lib/scope-builder-types";
import {
  CONSTRUCTION_TYPES,
  ROOF_TYPES,
  EXTERNAL_WALL_TYPES,
} from "@/lib/scope-builder-data";

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
  // Address autocomplete state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(!!data.address);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function set<K extends keyof ProjectData>(key: K, value: ProjectData[K]) {
    onChange({ ...data, [key]: value });
  }

  function handleAddressInput(value: string) {
    set("address", value);
    setAddressConfirmed(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 4) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoadingAddress(true);
      try {
        const res = await fetch(
          `/api/address-lookup?q=${encodeURIComponent(value)}`
        );
        const results: string[] = await res.json();
        setSuggestions(results);
        setShowDropdown(results.length > 0);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setLoadingAddress(false);
      }
    }, 400);
  }

  function selectAddress(addr: string) {
    set("address", addr);
    setAddressConfirmed(true);
    setShowDropdown(false);
    setSuggestions([]);
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
    <div className="space-y-8">

      {/* ── Section: Property & Client ── */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full bg-red-700" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-950">
            Property & Client
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Project Name */}
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>Project Name / Reference</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Oceana Apartments — Balcony Rectification"
              className={INPUT_CLS}
            />
          </div>

          {/* Address with autocomplete */}
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>
              Property Address <span className="text-red-700">*</span>
            </label>
            <div className="relative">
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => handleAddressInput(e.target.value)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 180)}
                  onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                  placeholder="Start typing the street address…"
                  className={`${INPUT_CLS} pl-9 pr-10`}
                  autoComplete="off"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {loadingAddress ? (
                    <Loader2 size={14} className="animate-spin text-slate-400" />
                  ) : addressConfirmed && data.address ? (
                    <CheckCircle size={14} className="text-green-600" />
                  ) : null}
                </div>
              </div>

              {/* Dropdown suggestions */}
              {showDropdown && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  {suggestions.map((addr, i) => (
                    <button
                      key={i}
                      type="button"
                      onMouseDown={() => selectAddress(addr)}
                      className="flex w-full items-start gap-2.5 px-4 py-3 text-left text-sm text-slate-700 hover:bg-sky-50 border-b border-slate-100 last:border-0"
                    >
                      <MapPin
                        size={13}
                        className="mt-0.5 shrink-0 text-red-600"
                      />
                      <span className="line-clamp-2 text-xs">{addr}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {addressConfirmed && data.address && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-green-700">
                <CheckCircle size={12} /> Address confirmed
              </p>
            )}
            {!addressConfirmed && data.address && data.address.length > 3 && !loadingAddress && (
              <p className="mt-1.5 text-xs text-slate-400">
                Select an address from the dropdown or type the full address manually.
              </p>
            )}
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
              {boolBtn(data.coastalExposure, "Yes — within 1km of coast", () => set("coastalExposure", true))}
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
              placeholder="e.g. Oceana Owners Corporation SP12345"
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
        </div>
      </div>

      {/* ── Section: Building Construction ── */}
      <div className="border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full bg-red-700" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-950">
            Building Construction
          </h3>
        </div>
        <p className="mb-4 text-xs leading-5 text-slate-500">
          Construction type informs which defects are most likely and which repair systems are appropriate.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Construction Type */}
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>Structural Construction Type</label>
            <select
              value={data.constructionType}
              onChange={(e) => set("constructionType", e.target.value)}
              className={INPUT_CLS}
            >
              <option value="">— Select construction type —</option>
              {CONSTRUCTION_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Roof Type */}
          <div>
            <label className={LABEL_CLS}>Roof Type</label>
            <select
              value={data.roofType}
              onChange={(e) => set("roofType", e.target.value)}
              className={INPUT_CLS}
            >
              <option value="">— Select roof type —</option>
              {ROOF_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* External Wall Type */}
          <div>
            <label className={LABEL_CLS}>External Wall Type</label>
            <select
              value={data.externalWallType}
              onChange={(e) => set("externalWallType", e.target.value)}
              className={INPUT_CLS}
            >
              <option value="">— Select external wall type —</option>
              {EXTERNAL_WALL_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Section: Notes ── */}
      <div className="border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full bg-red-700" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-950">
            Additional Notes
          </h3>
        </div>
        <textarea
          value={data.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          placeholder="Relevant history, previous investigation reports, special site conditions, authority requirements, or known constraints not covered above…"
          className={INPUT_CLS}
        />
      </div>
    </div>
  );
}
