"use client";

import { useRef, useState } from "react";
import { MapPin, CheckCircle, Loader2 } from "lucide-react";
import type { ProjectDataV2 } from "@/lib/scope-builder-types";

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const BUILDING_CLASSES = [
  "Class 2 residential strata",
  "Class 3",
  "Class 5 commercial",
  "Class 6 retail",
  "Other",
];

const INPUT_CLS =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-sky-950 outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition";

const LABEL_CLS =
  "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400";

interface Props {
  data: ProjectDataV2;
  onChange: (data: ProjectDataV2) => void;
}

export function ProjectSetupForm({ data, onChange }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(!!data.address);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function set<K extends keyof ProjectDataV2>(key: K, value: ProjectDataV2[K]) {
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

      {/* ── Section: Property ── */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full bg-red-700" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-950">
            Property Details
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Building Name */}
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>Building Name or Strata Plan Number</label>
            <input
              type="text"
              value={data.buildingName}
              onChange={(e) => set("buildingName", e.target.value)}
              placeholder="e.g. Oceana Apartments or SP12345"
              className={INPUT_CLS}
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>
              Street Address <span className="text-red-700">*</span>
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

              {showDropdown && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  {suggestions.map((addr, i) => (
                    <button
                      key={i}
                      type="button"
                      onMouseDown={() => selectAddress(addr)}
                      className="flex w-full items-start gap-2.5 border-b border-slate-100 px-4 py-3 text-left text-sm text-slate-700 hover:bg-sky-50 last:border-0"
                    >
                      <MapPin size={13} className="mt-0.5 shrink-0 text-red-600" />
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

          {/* Suburb */}
          <div>
            <label className={LABEL_CLS}>Suburb</label>
            <input
              type="text"
              value={data.suburb}
              onChange={(e) => set("suburb", e.target.value)}
              placeholder="e.g. Bondi Beach"
              className={INPUT_CLS}
            />
          </div>

          {/* State */}
          <div>
            <label className={LABEL_CLS}>State</label>
            <select
              value={data.state}
              onChange={(e) => set("state", e.target.value)}
              className={INPUT_CLS}
            >
              {AU_STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Building Class */}
          <div>
            <label className={LABEL_CLS}>Building Class</label>
            <select
              value={data.buildingClass}
              onChange={(e) => set("buildingClass", e.target.value)}
              className={INPUT_CLS}
            >
              {BUILDING_CLASSES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Storeys */}
          <div>
            <label className={LABEL_CLS}>Number of Storeys</label>
            <input
              type="number"
              min={1}
              value={data.storeys}
              onChange={(e) => set("storeys", e.target.value)}
              placeholder="e.g. 12"
              className={INPUT_CLS}
            />
          </div>

          {/* Year of Construction */}
          <div>
            <label className={LABEL_CLS}>Approximate Year of Construction</label>
            <input
              type="number"
              min={1900}
              max={2030}
              value={data.yearOfConstruction}
              onChange={(e) => set("yearOfConstruction", e.target.value)}
              placeholder="e.g. 1992"
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

          {/* Coastal */}
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>Coastal Location (within 1km of coastline)?</label>
            <div className="flex gap-2">
              {boolBtn(data.coastal, "Yes — coastal", () => set("coastal", true))}
              {boolBtn(!data.coastal, "No", () => set("coastal", false))}
            </div>
          </div>

          {/* Occupied */}
          <div>
            <label className={LABEL_CLS}>Occupied During Works?</label>
            <div className="flex gap-2">
              {boolBtn(data.occupied, "Occupied", () => set("occupied", true))}
              {boolBtn(!data.occupied, "Unoccupied", () => set("occupied", false))}
            </div>
          </div>

          {/* Hazmat */}
          <div>
            <label className={LABEL_CLS}>Known Hazardous Materials?</label>
            <div className="flex gap-2">
              {boolBtn(data.hazmat, "Yes", () => set("hazmat", true))}
              {boolBtn(!data.hazmat, "No", () => set("hazmat", false))}
            </div>
          </div>

          {/* Hazmat Notes */}
          {data.hazmat && (
            <div className="sm:col-span-2">
              <label className={LABEL_CLS}>Hazardous Materials Notes</label>
              <textarea
                value={data.hazmatNotes}
                onChange={(e) => set("hazmatNotes", e.target.value)}
                rows={3}
                placeholder="Describe known ACM locations, asbestos register status, lead paint, etc."
                className={INPUT_CLS}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Section: Consultant ── */}
      <div className="border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full bg-red-700" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-950">
            Consultant
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>Consultant Name</label>
            <input
              type="text"
              value={data.consultantName}
              onChange={(e) => set("consultantName", e.target.value)}
              placeholder="e.g. John Smith, Remedial Building Consultant"
              className={INPUT_CLS}
            />
          </div>
        </div>
      </div>

      {/* ── Section: AI Notes ── */}
      <div className="border-t border-slate-100 pt-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full bg-red-700" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-950">
            AI Context Notes
          </h3>
        </div>
        <p className="mb-3 text-xs leading-5 text-slate-500">
          Provide any additional project context, site observations, or background information for the AI. This is used throughout the scope generation process.
        </p>
        <textarea
          value={data.aiNotes}
          onChange={(e) => set("aiNotes", e.target.value)}
          rows={5}
          placeholder="e.g. Previous investigation found extensive delamination on north and west balconies. Building was constructed in 1988 with original torch-on membrane still in situ. Previous repairs were carried out circa 2012 with variable quality. Client has reported water ingress to units 301, 302 and 401 during heavy rain events…"
          className={INPUT_CLS}
        />
      </div>
    </div>
  );
}
