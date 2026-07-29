"use client";

// On-plan takeoff — OpenLayers in a pixel projection over the plan image.
// PDFs are rasterised to a canvas with pdf.js. A scale (pixels-per-metre) is
// calibrated by tracing a known dimension; measurements then convert to real
// units and save into the shared estimating model (source_type='drawing').
import { useCallback, useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Map from "ol/Map";
import View from "ol/View";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";
import Projection from "ol/proj/Projection";
import { getCenter } from "ol/extent";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import type Geometry from "ol/geom/Geometry";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import { Draw, Select, Modify } from "ol/interaction";
import { Style, Stroke, Fill, Circle as CircleStyle, Text as TextStyle, Icon } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import { defaults as defaultControls } from "ol/control";
import type { FeatureLike } from "ol/Feature";
import "ol/ol.css";
import {
  MousePointer2, Move, Ruler, ArrowLeftRight, Pentagon, Spline, MapPin, PencilRuler, Trash2, Eye, EyeOff, Loader2, Check,
  Maximize2, ZoomIn, ZoomOut, RotateCw, Undo2, Redo2,
} from "lucide-react";
import * as api from "../map/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

type MType = "area" | "linear" | "perimeter" | "count";
type Tool = "select" | "pan" | "scale" | "dimension" | "area" | "linear" | "count";
type Item = api.ApiItem;
type Plan = { id: string; filename: string; mime_type: string | null; url: string | null; page: { id: string; pixels_per_metre: number | null; scale_status: string } | null };
type Snapshot = { measurementId: string; itemId: string; gj: unknown; qty: number; unit: string; mtype: MType; idx?: number };

const geojson = new GeoJSON();
const COLOURS = ["#0369a1", "#7c3aed", "#dc2626", "#0f7a4d", "#b45309", "#0891b2", "#db2777", "#4f46e5", "#65a30d", "#334155"];
const TYPE_LABEL: Record<MType, string> = { area: "Area", linear: "Distance", perimeter: "Linear", count: "Count" };
const UNIT_FOR: Record<MType, string> = { area: "m2", linear: "m", perimeter: "m", count: "ea" };
// tool → geometry + stored measurement_type
const TOOL_META: Record<"dimension" | "area" | "linear" | "count", { geom: "LineString" | "Polygon" | "Point"; maxPoints?: number; type: MType }> = {
  dimension: { geom: "LineString", maxPoints: 2, type: "linear" },
  linear: { geom: "LineString", type: "perimeter" },
  area: { geom: "Polygon", type: "area" },
  count: { geom: "Point", type: "count" },
};

function fmt(q: number, type: string): string {
  if (type === "count") return `${Math.round(q)} ea`;
  if (type === "area") return `${q.toFixed(2)} m²`;
  return `${q.toFixed(2)} m`;
}
function itemTotal(it: Item): number {
  if (it.measurement_type === "count") return it.measurements.length;
  return it.measurements.reduce((s, m) => s + m.calculated_quantity, 0);
}
// Arrowhead for dimension lines.
function arrowStyle(colour: string, coord: number[], rotation: number): Style {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'><path d='M8 3 L14 9 L8 15' fill='none' stroke='${colour}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
  return new Style({ geometry: new Point(coord), image: new Icon({ src: "data:image/svg+xml;utf8," + encodeURIComponent(svg), anchor: [0.8, 0.5], rotateWithView: true, rotation: -rotation }) });
}

async function loadImage(plan: Plan): Promise<{ url: string; width: number; height: number } | null> {
  if (!plan.url) return null;
  const isPdf = (plan.mime_type ?? "").includes("pdf") || /\.pdf$/i.test(plan.filename);
  if (isPdf) {
    const pdf = await pdfjsLib.getDocument({ url: plan.url }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    await page.render({ canvasContext: ctx, viewport }).promise;
    return { url: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height };
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ url: plan.url as string, width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = plan.url as string;
  });
}

export default function PlanTakeoff({ projectId, plan }: { projectId: string; plan: Plan }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const sourceRef = useRef<VectorSource>(new VectorSource());
  const drawRef = useRef<Draw | null>(null);
  const selectRef = useRef<Select | null>(null);
  const modifyRef = useRef<Modify | null>(null);
  const ppmRef = useRef<number | null>(plan.page?.pixels_per_metre ?? null);
  const undoRef = useRef<Snapshot[]>([]);
  const redoRef = useRef<Snapshot[]>([]);

  const [items, setItems] = useState<Item[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>("select");
  const [ppm, setPpm] = useState<number | null>(plan.page?.pixels_per_metre ?? null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const itemsRef = useRef(items); itemsRef.current = items;
  const activeIdRef = useRef(activeItemId); activeIdRef.current = activeItemId;
  const selRef = useRef(selectedMeasurementId); selRef.current = selectedMeasurementId;
  ppmRef.current = ppm;
  const pageId = plan.page?.id ?? null;
  const refreshUndo = () => { setCanUndo(undoRef.current.length > 0); setCanRedo(redoRef.current.length > 0); };

  const styleFor = useCallback((feature: FeatureLike): Style | Style[] | undefined => {
    const itemId = feature.get("itemId") as string;
    const it = itemsRef.current.find((i) => i.id === itemId);
    if (it && !it.is_visible) return undefined;
    const colour = it?.colour ?? "#0369a1";
    const mtype = (feature.get("mtype") as string) ?? "linear";
    const selected = feature.get("measurementId") === selRef.current;
    const qty = feature.get("qty") as number | undefined;
    const idx = feature.get("idx") as number | undefined;
    const text = new TextStyle({
      text: mtype === "count" ? String(idx ?? "") : qty != null ? fmt(qty, mtype) : "",
      font: "600 12px system-ui, sans-serif", fill: new Fill({ color: "#0f172a" }),
      stroke: new Stroke({ color: "#fff", width: 3 }), offsetY: mtype === "count" ? -12 : 0, overflow: true,
    });
    if (mtype === "count") return new Style({ image: new CircleStyle({ radius: selected ? 7 : 5, fill: new Fill({ color: colour }), stroke: new Stroke({ color: "#fff", width: 2 }) }), text });
    const base = new Style({ stroke: new Stroke({ color: colour, width: selected ? 4 : 2.5 }), fill: mtype === "area" ? new Fill({ color: colour + "33" }) : undefined, text });
    if (mtype === "linear" && feature.get("dimension")) {
      const g = feature.getGeometry();
      if (g instanceof LineString) {
        const c = g.getCoordinates();
        if (c.length >= 2) { const s = c[0], e = c[c.length - 1]; const rot = Math.atan2(e[1] - s[1], e[0] - s[0]); return [base, arrowStyle(colour, e, rot), arrowStyle(colour, s, rot + Math.PI)]; }
      }
    }
    return base;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const img = await loadImage(plan).catch((e) => { console.error("[measuremap] plan load", e); return null; });
      if (cancelled) return;
      if (!img || !mapEl.current) { setError("Couldn't load this plan (PDF worker or file issue)."); setLoading(false); return; }
      const extent = [0, 0, img.width, img.height];
      const projection = new Projection({ code: "plan-px", units: "pixels", extent });
      const imageLayer = new ImageLayer({ source: new Static({ url: img.url, projection, imageExtent: extent }) });
      const vector = new VectorLayer({ source: sourceRef.current, style: styleFor as never });
      const map = new Map({
        target: mapEl.current, layers: [imageLayer, vector],
        controls: defaultControls({ zoom: false, attribution: false }),
        view: new View({ projection, center: getCenter(extent), zoom: 1, maxZoom: 8, extent }),
      });
      map.getView().fit(extent, { padding: [20, 20, 20, 20] });
      mapRef.current = map;
      setLoading(false);
      try {
        const res = await fetch(`/api/measuremap/projects/${projectId}/drawings/${plan.id}/takeoffs`);
        const data = await res.json();
        const loaded: Item[] = data.items ?? [];
        setItems(loaded);
        for (const it of loaded) for (const m of it.measurements) addFeature(it, m);
      } catch { /* none */ }
    })();
    return () => { cancelled = true; mapRef.current?.setTarget(undefined); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFeature(it: Item, m: api.ApiMeasurement, idx?: number) {
    try {
      const g = geojson.readGeometry(m.geometry as object);
      const f = new Feature(g);
      const mtype = (it.measurement_type ?? m.measurement_type) as string;
      f.setId(m.id); f.set("measurementId", m.id); f.set("itemId", it.id);
      f.set("mtype", mtype); f.set("qty", m.calculated_quantity);
      if (mtype === "linear") f.set("dimension", true);
      if (idx != null) f.set("idx", idx);
      else if (mtype === "count") f.set("idx", it.measurements.indexOf(m) + 1);
      sourceRef.current.addFeature(f);
    } catch { /* skip */ }
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (drawRef.current) { map.removeInteraction(drawRef.current); drawRef.current = null; }
    if (selectRef.current) { map.removeInteraction(selectRef.current); selectRef.current = null; }
    if (modifyRef.current) { map.removeInteraction(modifyRef.current); modifyRef.current = null; }

    if (tool === "select") {
      const select = new Select({ style: styleFor as never, hitTolerance: 8 });
      select.on("select", (e) => { const f = e.selected[0]; setSelectedMeasurementId(f ? (f.get("measurementId") as string) : null); if (f?.get("itemId")) setActiveItemId(f.get("itemId") as string); });
      const modify = new Modify({ source: sourceRef.current });
      modify.on("modifyend", (e) => e.features.forEach((f) => void persistGeometry(f)));
      map.addInteraction(select); map.addInteraction(modify);
      selectRef.current = select; modifyRef.current = modify;
      return;
    }
    if (tool === "pan") return;

    if (tool === "scale") {
      const draw = new Draw({ source: new VectorSource(), type: "LineString", maxPoints: 2 });
      draw.on("drawend", (e) => { void handleScaleEnd(e.feature); });
      map.addInteraction(draw); drawRef.current = draw;
      return;
    }

    const meta = TOOL_META[tool];
    const draw = new Draw({ source: sourceRef.current, type: meta.geom, ...(meta.maxPoints ? { maxPoints: meta.maxPoints } : {}) });
    draw.on("drawend", (e) => { void handleDrawEnd(tool as "dimension" | "area" | "linear" | "count", e.feature); });
    map.addInteraction(draw); drawRef.current = draw;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, loading]);

  async function handleScaleEnd(feature: Feature<Geometry>) {
    const g = feature.getGeometry();
    if (!(g instanceof LineString)) { setTool("select"); return; }
    const px = g.getLength();
    const input = window.prompt(`That line is ${px.toFixed(0)} px.\nHow long is it in real metres? (e.g. 10)`);
    setTool("select");
    const metres = input ? parseFloat(input) : NaN;
    if (!Number.isFinite(metres) || metres <= 0) return;
    const newPpm = px / metres;
    setPpm(newPpm); ppmRef.current = newPpm;
    setSaveStatus("saving");
    try { await fetch(`/api/measuremap/projects/${projectId}/drawings/${plan.id}/scale`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pixels_per_metre: newPpm }) }); setSaveStatus("saved"); } catch { setSaveStatus("error"); }
  }

  function qtyFor(geom: Geometry, mtype: MType): number {
    const p = ppmRef.current ?? 1;
    if (mtype === "count") return 1;
    if (mtype === "area") return (geom as Polygon).getArea() / (p * p);
    return (geom as LineString).getLength() / p;
  }

  async function ensureItem(mtype: MType): Promise<Item | null> {
    const active = itemsRef.current.find((i) => i.id === activeIdRef.current);
    if (active && active.measurement_type === mtype) return active;
    const n = itemsRef.current.filter((i) => i.measurement_type === mtype).length + 1;
    try {
      const created = await api.createItem(projectId, { name: `${TYPE_LABEL[mtype]} ${n}`, measurement_type: mtype, colour: COLOURS[itemsRef.current.length % COLOURS.length], unit: UNIT_FOR[mtype], sort_order: itemsRef.current.length });
      setItems((prev) => [...prev, created]); setActiveItemId(created.id);
      return created;
    } catch { setSaveStatus("error"); return null; }
  }

  async function handleDrawEnd(t: "dimension" | "area" | "linear" | "count", feature: Feature<Geometry>) {
    const geom = feature.getGeometry();
    if (!geom) return;
    if (!ppmRef.current) { sourceRef.current.removeFeature(feature); setTool("select"); alert("Set the scale first: pick “Scale”, trace a known dimension, and enter its real length."); return; }
    const mtype = TOOL_META[t].type;
    const item = await ensureItem(mtype);
    if (!item) { sourceRef.current.removeFeature(feature); setTool("select"); return; }
    const qty = qtyFor(geom, mtype);
    const gj = geojson.writeGeometryObject(geom);
    const idx = mtype === "count" ? item.measurements.length + 1 : undefined;
    feature.set("itemId", item.id); feature.set("mtype", mtype); feature.set("qty", qty);
    if (t === "dimension") feature.set("dimension", true);
    if (idx != null) feature.set("idx", idx);
    setSaveStatus("saving");
    try {
      const { id } = await api.createMeasurement(projectId, { estimate_item_id: item.id, category_id: item.category_id, geometry: gj, calculated_quantity: qty, unit: item.unit, measurement_type: mtype, measurement_mode: item.category_id ? "structured" : "free", label: idx != null ? String(idx) : null, source_type: "drawing", plan_id: plan.id, plan_page_id: pageId, sort_order: item.measurements.length });
      feature.setId(id); feature.set("measurementId", id);
      setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, measurements: [...i.measurements, { id, estimate_item_id: item.id, category_id: item.category_id, measurement_mode: "free", measurement_type: mtype, source_type: "drawing", name: null, colour: item.colour, geometry: gj, calculated_quantity: qty, unit: item.unit, label: idx != null ? String(idx) : null, is_visible: true, sort_order: i.measurements.length }] } : i));
      undoRef.current.push({ measurementId: id, itemId: item.id, gj, qty, unit: item.unit, mtype, idx }); redoRef.current = []; refreshUndo();
      setSaveStatus("saved");
    } catch { setSaveStatus("error"); sourceRef.current.removeFeature(feature); }
    if (mtype !== "count") setTool("select");
  }

  async function persistGeometry(feature: FeatureLike) {
    const id = feature.get("measurementId") as string;
    const itemId = feature.get("itemId") as string;
    const it = itemsRef.current.find((i) => i.id === itemId);
    const g = (feature as Feature<Geometry>).getGeometry();
    if (!id || !it || !g) return;
    const qty = qtyFor(g, (it.measurement_type ?? "area") as MType);
    const gj = geojson.writeGeometryObject(g);
    (feature as Feature).set("qty", qty);
    setSaveStatus("saving");
    try { await api.patchMeasurement(projectId, id, { geometry: gj, calculated_quantity: qty }); setItems((prev) => prev.map((i) => i.id === itemId ? { ...i, measurements: i.measurements.map((m) => m.id === id ? { ...m, geometry: gj, calculated_quantity: qty } : m) } : i)); setSaveStatus("saved"); } catch { setSaveStatus("error"); }
  }

  useEffect(() => { sourceRef.current.changed(); }, [items, selectedMeasurementId]);

  async function removeMeasurement(id: string) {
    selectRef.current?.getFeatures().clear();
    const f = sourceRef.current.getFeatureById(id);
    if (f) sourceRef.current.removeFeature(f);
    setSelectedMeasurementId(null);
    try { await api.removeMeasurement(projectId, id); setItems((prev) => prev.map((i) => ({ ...i, measurements: i.measurements.filter((m) => m.id !== id) })).filter((i) => i.measurements.length > 0)); } catch { setSaveStatus("error"); }
  }
  async function undo() {
    const s = undoRef.current.pop();
    if (!s) return;
    const f = sourceRef.current.getFeatureById(s.measurementId);
    if (f) sourceRef.current.removeFeature(f);
    setItems((prev) => prev.map((i) => i.id === s.itemId ? { ...i, measurements: i.measurements.filter((m) => m.id !== s.measurementId) } : i));
    try { await api.removeMeasurement(projectId, s.measurementId); redoRef.current.push(s); refreshUndo(); } catch { setSaveStatus("error"); }
  }
  async function redo() {
    const s = redoRef.current.pop();
    if (!s) return;
    try {
      const { id } = await api.createMeasurement(projectId, { estimate_item_id: s.itemId, geometry: s.gj, calculated_quantity: s.qty, unit: s.unit, measurement_type: s.mtype, source_type: "drawing", plan_id: plan.id, plan_page_id: pageId, label: s.idx != null ? String(s.idx) : null });
      const g = geojson.readGeometry(s.gj as object);
      const f = new Feature(g); f.setId(id); f.set("measurementId", id); f.set("itemId", s.itemId); f.set("mtype", s.mtype); f.set("qty", s.qty);
      if (s.mtype === "linear") f.set("dimension", true);
      if (s.idx != null) f.set("idx", s.idx);
      sourceRef.current.addFeature(f);
      setItems((prev) => prev.map((i) => i.id === s.itemId ? { ...i, measurements: [...i.measurements, { id, estimate_item_id: s.itemId, category_id: null, measurement_mode: "free", measurement_type: s.mtype, source_type: "drawing", name: null, colour: null, geometry: s.gj, calculated_quantity: s.qty, unit: s.unit, label: null, is_visible: true, sort_order: i.measurements.length }] } : i));
      undoRef.current.push({ ...s, measurementId: id }); refreshUndo();
    } catch { setSaveStatus("error"); }
  }
  async function deleteItem(it: Item) {
    if (!confirm(`Delete “${it.name}” and its ${it.measurements.length} measurement(s)?`)) return;
    it.measurements.forEach((m) => { const f = sourceRef.current.getFeatureById(m.id); if (f) sourceRef.current.removeFeature(f); });
    setItems((prev) => prev.filter((i) => i.id !== it.id));
    try { await api.removeItem(projectId, it.id); } catch { setSaveStatus("error"); }
  }
  async function toggleVisible(it: Item) {
    setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, is_visible: !i.is_visible } : i));
    try { await api.patchItem(projectId, it.id, { is_visible: !it.is_visible }); } catch { /* visual */ }
  }
  function zoomBy(d: number) { const v = mapRef.current?.getView(); if (v) v.animate({ zoom: (v.getZoom() ?? 1) + d, duration: 150 }); }
  function rotate() { const v = mapRef.current?.getView(); if (v) v.animate({ rotation: (v.getRotation() ?? 0) + Math.PI / 2, duration: 200 }); }
  function fit() { const m = mapRef.current; if (m) { const ext = sourceRef.current.getExtent(); if (sourceRef.current.getFeatures().length && ext && Number.isFinite(ext[0])) m.getView().fit(ext, { padding: [40, 40, 40, 40], maxZoom: 8, duration: 200 }); } }

  return (
    <div className="flex h-full flex-col">
      {/* Ribbon toolbar */}
      <div className="flex shrink-0 items-stretch gap-0 border-b border-[#D5DADD] bg-white px-2 py-1">
        <Group label="Zoom / Pan">
          <TBtn label="Fit" Icon={Maximize2} onClick={fit} />
          <TBtn label="In" Icon={ZoomIn} onClick={() => zoomBy(1)} />
          <TBtn label="Out" Icon={ZoomOut} onClick={() => zoomBy(-1)} />
          <TBtn label="Pan" Icon={Move} active={tool === "pan"} onClick={() => setTool("pan")} />
        </Group>
        <Group label="Measure">
          <TBtn label="Scale" Icon={PencilRuler} active={tool === "scale"} onClick={() => setTool("scale")} />
          <TBtn label="Dimension" Icon={ArrowLeftRight} active={tool === "dimension"} onClick={() => setTool("dimension")} />
        </Group>
        <Group label="Takeoff">
          <TBtn label="Area" Icon={Pentagon} active={tool === "area"} onClick={() => setTool("area")} />
          <TBtn label="Linear" Icon={Spline} active={tool === "linear"} onClick={() => setTool("linear")} />
          <TBtn label="Count" Icon={MapPin} active={tool === "count"} onClick={() => setTool("count")} />
        </Group>
        <Group label="Edit" last>
          <TBtn label="Select" Icon={MousePointer2} active={tool === "select"} onClick={() => setTool("select")} />
          <TBtn label="Rotate" Icon={RotateCw} onClick={rotate} />
          <TBtn label="Undo" Icon={Undo2} onClick={() => void undo()} disabled={!canUndo} />
          <TBtn label="Redo" Icon={Redo2} onClick={() => void redo()} disabled={!canRedo} />
          <TBtn label="Delete" Icon={Trash2} onClick={() => selectedMeasurementId && void removeMeasurement(selectedMeasurementId)} disabled={!selectedMeasurementId} />
        </Group>
        <div className="ml-auto flex items-center gap-2 pr-2 text-[11px]">
          <span className={`flex items-center gap-1 rounded px-2 py-1 font-medium ${ppm ? "bg-[#E6F5EE] text-[#0f7a4d]" : "bg-[#FDF3E3] text-[#b45309]"}`}>
            <PencilRuler size={12} /> {ppm ? `Scale ${ppm.toFixed(1)} px/m` : "Scale not set"}
          </span>
          {saveStatus === "saving" && <span className="flex items-center gap-1 text-[#586066]"><Loader2 className="h-3 w-3 animate-spin" /> Saving</span>}
          {saveStatus === "saved" && <span className="flex items-center gap-1 text-[#0369a1]"><Check className="h-3 w-3" /> Saved</span>}
          {saveStatus === "error" && <span className="text-[#dc2626]">Save failed</span>}
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Takeoff list */}
        <aside className="flex w-[240px] shrink-0 flex-col border-r border-[#D7DCE0] bg-white">
          <div className="border-b border-[#E2E5E7] px-3 py-2.5"><h3 className="text-[12px] font-semibold uppercase tracking-wide text-[#383E42]">Takeoffs</h3></div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {items.length === 0 && <p className="px-2 py-6 text-center text-[12px] text-[#8A9196]">No takeoffs yet. Set the scale, then measure on the plan.</p>}
            {items.map((it) => (
              <div key={it.id} className="group mb-1 flex items-center gap-2 rounded px-2 py-1.5 hover:bg-[#F5F6F7]">
                <span className="h-[10px] w-[10px] shrink-0 rounded-sm" style={{ backgroundColor: it.colour }} />
                <button onClick={() => { setActiveItemId(it.id); fit(); }} className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-[12px] font-medium text-[#30363A]">{it.name}</span>
                  <span className="block text-[10px] text-[#8A9196]">{fmt(itemTotal(it), it.measurement_type ?? "area")}</span>
                </button>
                <button onClick={() => toggleVisible(it)} className="text-[#586066] hover:text-[#30363A]">{it.is_visible ? <Eye size={13} /> : <EyeOff size={13} />}</button>
                <button onClick={() => deleteItem(it)} className="text-[#8A9196] opacity-0 hover:text-[#dc2626] group-hover:opacity-100"><Trash2 size={13} /></button>
              </div>
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <section className="relative min-w-0 flex-1 bg-[#0c2b3f]">
          {tool === "scale" && <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-md bg-white px-3 py-1.5 text-[12px] font-medium text-[#30363A] shadow-lg">Trace a known dimension (2 clicks), then enter its real length.</div>}
          {loading && <div className="absolute inset-0 z-10 flex items-center justify-center text-white/80"><Loader2 className="h-6 w-6 animate-spin" /><span className="ml-2 text-sm">Loading plan…</span></div>}
          {error && <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-white/70"><span className="text-sm">{error}</span></div>}
          <div ref={mapEl} className={`h-full w-full ${tool === "pan" ? "cursor-grab" : tool === "select" ? "cursor-default" : "cursor-crosshair"}`} />
        </section>
      </div>
    </div>
  );
}

function Group({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`flex flex-col items-center px-2 ${last ? "" : "border-r border-[#E7EAEC]"}`}>
      <div className="flex items-stretch gap-0.5">{children}</div>
      <span className="mt-0.5 text-[9px] uppercase tracking-wide text-[#9AA0A5]">{label}</span>
    </div>
  );
}

function TBtn({ label, Icon, onClick, active, disabled }: { label: string; Icon: typeof Ruler; onClick: () => void; active?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} title={label}
      className={["flex w-[52px] flex-col items-center justify-center gap-0.5 rounded py-1 text-[9px] transition", active ? "bg-[#0369a1] text-white" : "text-[#343A3E] hover:bg-[#F1F3F4]", disabled ? "opacity-30" : ""].join(" ")}>
      <Icon size={17} /><span>{label}</span>
    </button>
  );
}
