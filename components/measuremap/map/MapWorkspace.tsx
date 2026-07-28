"use client";

// The whole module (OpenLayers included) is code-split behind next/dynamic with
// ssr:false, so `ol` never enters the main RBA bundle — it loads only when this
// map route opens.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileArcGISRest from "ol/source/TileArcGISRest";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import type Geometry from "ol/geom/Geometry";
import { Draw, Modify, Select } from "ol/interaction";
import { fromLonLat } from "ol/proj";
import { getLength, getArea } from "ol/sphere";
import { Style, Stroke, Fill, Circle as CircleStyle, Text as TextStyle } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import Overlay from "ol/Overlay";
import Polygon from "ol/geom/Polygon";
import LineString from "ol/geom/LineString";
import { defaults as defaultControls, FullScreen, Attribution } from "ol/control";
import type { FeatureLike } from "ol/Feature";
import "ol/ol.css";

import {
  MousePointer2, Hand, Ruler, Spline, Pentagon, MapPin, Undo2, Redo2, Trash2, Maximize, Layers, Plus, Loader2, Check, Eye, EyeOff, ChevronRight, ChevronDown,
} from "lucide-react";
import { TAKEOFF_COLOURS, type MeasurementType } from "@/types/measuremap";
import * as api from "./api";

const MAP_PROJ = "EPSG:3857";
const geojson = new GeoJSON();

type Tool = "select" | "pan" | "length" | "perimeter" | "area" | "count";
type Item = api.ApiItem;
type SaveStatus = "idle" | "saving" | "saved" | "error";
type Snapshot = { measurementId: string; itemId: string; gj: unknown; quantity: number; unit: string; label: string | null; idx?: number; mtype: string };

const DRAW_TYPE: Record<Exclude<Tool, "select" | "pan">, "LineString" | "Polygon" | "Point"> = {
  length: "LineString", perimeter: "LineString", area: "Polygon", count: "Point",
};

function computeQuantity(geom: Geometry, type: MeasurementType): number {
  if (type === "count") return 1;
  if (type === "area") return getArea(geom, { projection: MAP_PROJ });
  return getLength(geom, { projection: MAP_PROJ }); // length + perimeter (geodesic metres)
}

function fmt(q: number, type: string): string {
  if (type === "count") return `${Math.round(q)} ea`;
  if (type === "area") return `${q.toFixed(2)} m²`;
  return `${q.toFixed(2)} m`;
}

function itemTotal(it: Item): number {
  if (it.measurement_type === "count") return it.measurements.length;
  return it.measurements.reduce((s, m) => s + m.calculated_quantity, 0);
}

export default function MapWorkspace({
  project,
  initialItems,
}: {
  project: { id: string; latitude: number | null; longitude: number | null; full_address: string };
  initialItems: Item[];
}) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const sourceRef = useRef<VectorSource>(new VectorSource());
  const parcelSourceRef = useRef<VectorSource>(new VectorSource());
  const cadastreRef = useRef<TileLayer<TileArcGISRest> | null>(null);
  const drawRef = useRef<Draw | null>(null);
  const modifyRef = useRef<Modify | null>(null);
  const selectRef = useRef<Select | null>(null);
  // Undo/redo track created measurements (the common "oops, remove that" case).
  const undoStackRef = useRef<Snapshot[]>([]);
  const redoStackRef = useRef<Snapshot[]>([]);
  // Live measurement tooltip shown while drawing.
  const measureTipRef = useRef<HTMLDivElement>(null);
  const measureOverlayRef = useRef<Overlay | null>(null);

  const [items, setItems] = useState<Item[]>(initialItems);
  const [activeItemId, setActiveItemId] = useState<string | null>(initialItems[0]?.id ?? null);
  const [tool, setTool] = useState<Tool>("pan");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showCadastre, setShowCadastre] = useState(true); // property/lot boundaries on by default
  const [colourPickerFor, setColourPickerFor] = useState<string | null>(null);
  const [parcelInfo, setParcelInfo] = useState<{ lotId: string | null; planLabel: string | null } | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const refreshUndoFlags = useCallback(() => {
    setCanUndo(undoStackRef.current.length > 0);
    setCanRedo(redoStackRef.current.length > 0);
  }, []);

  // Latest-state refs so OL callbacks/style fns read current values without rebinding.
  const itemsRef = useRef(items); itemsRef.current = items;
  const activeIdRef = useRef(activeItemId); activeIdRef.current = activeItemId;
  const showMeasRef = useRef(showMeasurements); showMeasRef.current = showMeasurements;
  const showLabelsRef = useRef(showLabels); showLabelsRef.current = showLabels;
  const selMeasRef = useRef(selectedMeasurementId); selMeasRef.current = selectedMeasurementId;

  const activeItem = items.find((i) => i.id === activeItemId) ?? null;

  const styleFor = useCallback((feature: FeatureLike): Style | undefined => {
    if (!showMeasRef.current) return undefined;
    const itemId = feature.get("itemId") as string;
    const it = itemsRef.current.find((i) => i.id === itemId);
    if (it && !it.is_visible) return undefined;
    const colour = it?.colour ?? "#e11d48";
    const mtype = (feature.get("mtype") as string) ?? "length";
    const selected = feature.get("measurementId") === selMeasRef.current;
    const qty = feature.get("qty") as number | undefined;
    const idx = feature.get("idx") as number | undefined;

    const stroke = new Stroke({ color: colour, width: selected ? 4 : 2 });
    const text = showLabelsRef.current
      ? new TextStyle({
          text: mtype === "count" ? String(idx ?? "") : qty != null ? fmt(qty, mtype) : "",
          font: "600 11px system-ui, sans-serif",
          fill: new Fill({ color: "#0f172a" }),
          stroke: new Stroke({ color: "#ffffff", width: 3 }),
          offsetY: mtype === "count" ? -14 : 0,
          overflow: true,
        })
      : undefined;

    if (mtype === "count") {
      return new Style({
        image: new CircleStyle({ radius: selected ? 7 : 5, fill: new Fill({ color: colour }), stroke: new Stroke({ color: "#fff", width: 2 }) }),
        text,
      });
    }
    return new Style({
      stroke,
      fill: mtype === "area" ? new Fill({ color: colour + "33" }) : undefined,
      text,
    });
  }, []);

  // ── Map init (once) ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    const imagery = new TileLayer({
      source: new TileArcGISRest({
        url: "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer",
        attributions: "Imagery © NSW Spatial Services (CC BY 4.0)",
      }),
    });
    const cadastre = new TileLayer({
      source: new TileArcGISRest({
        url: "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer",
        params: { TRANSPARENT: true },
      }),
      visible: true, // property/lot boundaries on by default (toggle top-right)
      opacity: 0.9,
    });
    cadastreRef.current = cadastre;

    // Highlight for THE project's parcel (populated by the parcel fetch below).
    const parcelLayer = new VectorLayer({
      source: parcelSourceRef.current,
      style: new Style({
        // Nearmap-style dashed highlight of THE property parcel.
        stroke: new Stroke({ color: "#f59e0b", width: 3, lineDash: [8, 6] }),
        fill: new Fill({ color: "rgba(245,158,11,0.08)" }),
      }),
    });

    const vector = new VectorLayer({ source: sourceRef.current, style: styleFor as never });

    const centre = fromLonLat([project.longitude ?? 151.21, project.latitude ?? -33.87]);
    const map = new Map({
      target: mapEl.current,
      layers: [imagery, cadastre, parcelLayer, vector],
      controls: defaultControls({ attribution: false }).extend([
        new FullScreen(),
        new Attribution({ collapsible: true }),
      ]),
      view: new View({ center: centre, zoom: 19, maxZoom: 22 }),
    });
    mapRef.current = map;

    // Live-measurement tooltip overlay (positioned while drawing).
    if (measureTipRef.current) {
      const ov = new Overlay({ element: measureTipRef.current, offset: [12, 0], positioning: "center-left", stopEvent: false });
      map.addOverlay(ov);
      measureOverlayRef.current = ov;
    }

    // Project marker.
    if (project.latitude != null && project.longitude != null) {
      const markerLayer = new VectorLayer({
        source: new VectorSource({ features: [new Feature(new Point(centre))] }),
        style: new Style({
          image: new CircleStyle({ radius: 7, fill: new Fill({ color: "#f97316" }), stroke: new Stroke({ color: "#fff", width: 2 }) }),
        }),
      });
      map.addLayer(markerLayer);
    }

    // Load existing measurements as features.
    for (const it of initialItems) {
      for (const m of it.measurements) {
        addFeatureFromMeasurement(it, m);
      }
    }

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFeatureFromMeasurement(it: Item, m: api.ApiMeasurement, idx?: number) {
    try {
      const g = geojson.readGeometry(m.geometry, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
      const f = new Feature(g);
      f.setId(m.id);
      f.set("measurementId", m.id);
      f.set("itemId", it.id);
      f.set("mtype", it.measurement_type);
      f.set("qty", m.calculated_quantity);
      if (idx != null) f.set("idx", idx);
      else if (it.measurement_type === "count") f.set("idx", it.measurements.indexOf(m) + 1);
      sourceRef.current.addFeature(f);
    } catch (e) {
      console.error("[measuremap] failed to load measurement geometry", e);
    }
  }

  // ── Tool / active-item wiring ─────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Tear down previous interactions.
    if (drawRef.current) { map.removeInteraction(drawRef.current); drawRef.current = null; }
    if (modifyRef.current) { map.removeInteraction(modifyRef.current); modifyRef.current = null; }
    if (selectRef.current) { map.removeInteraction(selectRef.current); selectRef.current = null; }

    if (tool === "select") {
      const select = new Select({ style: styleFor as never });
      select.on("select", (e) => {
        const f = e.selected[0];
        setSelectedMeasurementId(f ? (f.get("measurementId") as string) : null);
      });
      const modify = new Modify({ source: sourceRef.current });
      modify.on("modifyend", (e) => {
        e.features.forEach((f) => void persistGeometry(f));
      });
      map.addInteraction(select);
      map.addInteraction(modify);
      selectRef.current = select;
      modifyRef.current = modify;
      return;
    }

    if (tool !== "pan") {
      const active = itemsRef.current.find((i) => i.id === activeIdRef.current);
      if (!active) return; // no active item → nothing to draw into
      const draw = new Draw({
        source: sourceRef.current,
        type: DRAW_TYPE[tool],
        ...(tool === "length" ? { maxPoints: 2 } : {}),
      });
      const tip = measureTipRef.current;
      const ov = measureOverlayRef.current;
      const mtype = active.measurement_type as MeasurementType;
      if (tool !== "count" && tip && ov) {
        draw.on("drawstart", (e) => {
          const g = e.feature.getGeometry();
          if (!g) return;
          g.on("change", () => {
            let text = "", coord: number[] | undefined;
            if (g instanceof Polygon) {
              text = fmt(getArea(g, { projection: MAP_PROJ }), "area");
              coord = g.getInteriorPoint().getCoordinates();
            } else if (g instanceof LineString) {
              text = fmt(getLength(g, { projection: MAP_PROJ }), mtype);
              coord = g.getLastCoordinate();
            }
            tip.textContent = text;
            tip.style.display = text ? "block" : "none";
            if (coord) ov.setPosition(coord);
          });
        });
        const hideTip = () => { tip.style.display = "none"; ov.setPosition(undefined); };
        draw.on("drawend", hideTip);
        draw.on("drawabort", hideTip);
      }
      draw.on("drawend", (e) => void handleDrawEnd(active, e.feature));
      map.addInteraction(draw);
      drawRef.current = draw;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, activeItemId, items.length]);

  async function handleDrawEnd(item: Item, feature: Feature<Geometry>) {
    const geom = feature.getGeometry();
    if (!geom) return;
    const quantity = computeQuantity(geom, item.measurement_type as MeasurementType);
    const gj = geojson.writeGeometryObject(geom, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
    const idx = item.measurement_type === "count" ? item.measurements.length + 1 : undefined;

    feature.set("itemId", item.id);
    feature.set("mtype", item.measurement_type);
    feature.set("qty", quantity);
    if (idx != null) feature.set("idx", idx);

    setSaveStatus("saving");
    try {
      const { id } = await api.createMeasurement(project.id, {
        takeoff_item_id: item.id,
        geometry: gj,
        calculated_quantity: quantity,
        unit: item.unit,
        label: idx != null ? String(idx) : null,
        source_type: "map",
        sort_order: item.measurements.length,
      });
      feature.setId(id);
      feature.set("measurementId", id);
      setItems((prev) => prev.map((i) => i.id === item.id
        ? { ...i, measurements: [...i.measurements, { id, takeoff_item_id: item.id, geometry: gj, calculated_quantity: quantity, unit: item.unit, label: idx != null ? String(idx) : null, sort_order: i.measurements.length }] }
        : i));
      undoStackRef.current.push({ measurementId: id, itemId: item.id, gj, quantity, unit: item.unit, label: idx != null ? String(idx) : null, idx, mtype: item.measurement_type });
      redoStackRef.current = [];
      refreshUndoFlags();
      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      sourceRef.current.removeFeature(feature); // don't keep an unsaved ghost
    }
  }

  async function persistGeometry(feature: FeatureLike) {
    const id = feature.get("measurementId") as string;
    const itemId = feature.get("itemId") as string;
    const it = itemsRef.current.find((i) => i.id === itemId);
    const g = (feature as Feature<Geometry>).getGeometry();
    if (!id || !it || !g) return;
    const quantity = computeQuantity(g, it.measurement_type as MeasurementType);
    const gj = geojson.writeGeometryObject(g, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
    (feature as Feature).set("qty", quantity);
    setSaveStatus("saving");
    try {
      await api.patchMeasurement(project.id, id, { geometry: gj, calculated_quantity: quantity });
      setItems((prev) => prev.map((i) => i.id === itemId
        ? { ...i, measurements: i.measurements.map((m) => m.id === id ? { ...m, geometry: gj, calculated_quantity: quantity } : m) }
        : i));
      setSaveStatus("saved");
    } catch { setSaveStatus("error"); }
  }

  const deleteSelected = useCallback(async () => {
    const id = selMeasRef.current;
    if (!id) return;
    const f = sourceRef.current.getFeatureById(id);
    if (f) sourceRef.current.removeFeature(f);
    setSelectedMeasurementId(null);
    setSaveStatus("saving");
    try {
      await api.removeMeasurement(project.id, id);
      setItems((prev) => prev.map((i) => ({ ...i, measurements: i.measurements.filter((m) => m.id !== id) })));
      setSaveStatus("saved");
    } catch { setSaveStatus("error"); }
  }, [project.id]);

  const undo = useCallback(async () => {
    const s = undoStackRef.current.pop();
    if (!s) return;
    const f = sourceRef.current.getFeatureById(s.measurementId);
    if (f) sourceRef.current.removeFeature(f);
    setItems((prev) => prev.map((i) => i.id === s.itemId ? { ...i, measurements: i.measurements.filter((m) => m.id !== s.measurementId) } : i));
    setSaveStatus("saving");
    try {
      await api.removeMeasurement(project.id, s.measurementId);
      redoStackRef.current.push(s);
      refreshUndoFlags();
      setSaveStatus("saved");
    } catch { setSaveStatus("error"); }
  }, [project.id, refreshUndoFlags]);

  const redo = useCallback(async () => {
    const s = redoStackRef.current.pop();
    if (!s) return;
    setSaveStatus("saving");
    try {
      const { id } = await api.createMeasurement(project.id, {
        takeoff_item_id: s.itemId, geometry: s.gj, calculated_quantity: s.quantity, unit: s.unit, label: s.label, source_type: "map",
      });
      const g = geojson.readGeometry(s.gj as object, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
      const f = new Feature(g);
      f.setId(id); f.set("measurementId", id); f.set("itemId", s.itemId); f.set("mtype", s.mtype); f.set("qty", s.quantity);
      if (s.idx != null) f.set("idx", s.idx);
      sourceRef.current.addFeature(f);
      setItems((prev) => prev.map((i) => i.id === s.itemId
        ? { ...i, measurements: [...i.measurements, { id, takeoff_item_id: s.itemId, geometry: s.gj, calculated_quantity: s.quantity, unit: s.unit, label: s.label, sort_order: i.measurements.length }] }
        : i));
      undoStackRef.current.push({ ...s, measurementId: id });
      refreshUndoFlags();
      setSaveStatus("saved");
    } catch { setSaveStatus("error"); }
  }, [project.id, refreshUndoFlags]);

  // Keyboard: Delete removes selection, Escape aborts an in-progress draw.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selMeasRef.current) { e.preventDefault(); void deleteSelected(); }
      if (e.key === "Escape" && drawRef.current) drawRef.current.abortDrawing();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteSelected]);

  // Redraw when style-affecting state changes.
  useEffect(() => { sourceRef.current.changed(); }, [items, showMeasurements, showLabels, selectedMeasurementId]);

  useEffect(() => { cadastreRef.current?.setVisible(showCadastre); }, [showCadastre]);

  // Highlight the specific parcel that contains the project address.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/measuremap/projects/${project.id}/parcel`);
        if (!res.ok) return;
        const { parcel } = await res.json();
        if (cancelled || !parcel?.geometry) return;
        const g = geojson.readGeometry(parcel.geometry, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
        parcelSourceRef.current.clear();
        parcelSourceRef.current.addFeature(new Feature(g));
        setParcelInfo({ lotId: parcel.lotId, planLabel: parcel.planLabel });
      } catch { /* boundary highlight is best-effort */ }
    })();
    return () => { cancelled = true; };
  }, [project.id]);

  function fitToScreen() {
    const map = mapRef.current;
    if (!map) return;
    const ext = sourceRef.current.getExtent();
    if (ext && sourceRef.current.getFeatures().length && Number.isFinite(ext[0])) {
      map.getView().fit(ext, { padding: [60, 60, 60, 60], maxZoom: 21, duration: 250 });
    } else if (project.latitude != null && project.longitude != null) {
      map.getView().animate({ center: fromLonLat([project.longitude, project.latitude]), zoom: 19, duration: 250 });
    }
  }

  // ── Takeoff item actions ──────────────────────────────────────────────────
  async function addItem(name: string, type: MeasurementType, colour: string) {
    setSaveStatus("saving");
    try {
      const created = await api.createItem(project.id, { name, measurement_type: type, colour, source_type: "map", sort_order: items.length });
      setItems((prev) => [...prev, created]);
      setActiveItemId(created.id);
      setTool(type);
      setSaveStatus("saved");
      setAdding(false);
    } catch { setSaveStatus("error"); }
  }

  async function selectMeasurementFromPanel(id: string) {
    setSelectedMeasurementId(id);
    const f = sourceRef.current.getFeatureById(id);
    const map = mapRef.current;
    if (f && map) {
      const g = f.getGeometry();
      if (g) map.getView().fit(g.getExtent(), { padding: [80, 80, 80, 80], maxZoom: 21, duration: 250 });
    }
  }

  async function toggleItemVisible(it: Item) {
    setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, is_visible: !i.is_visible } : i));
    try { await api.patchItem(project.id, it.id, { is_visible: !it.is_visible }); } catch { /* visual only */ }
  }

  async function changeItemColour(it: Item, colour: string) {
    setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, colour } : i));
    setColourPickerFor(null);
    sourceRef.current.changed(); // restyle existing geometry immediately
    try { await api.patchItem(project.id, it.id, { colour }); } catch { setSaveStatus("error"); }
  }

  async function deleteItem(it: Item) {
    if (!confirm(`Delete takeoff item “${it.name}” and its ${it.measurements.length} measurement(s)?`)) return;
    it.measurements.forEach((m) => { const f = sourceRef.current.getFeatureById(m.id); if (f) sourceRef.current.removeFeature(f); });
    setItems((prev) => prev.filter((i) => i.id !== it.id));
    if (activeItemId === it.id) setActiveItemId(null);
    try { await api.removeItem(project.id, it.id); } catch { setSaveStatus("error"); }
  }

  const toolBtns = useMemo(() => ([
    { id: "select", label: "Select", Icon: MousePointer2 },
    { id: "pan", label: "Pan", Icon: Hand },
    { id: "length", label: "Length", Icon: Ruler },
    { id: "perimeter", label: "Perimeter", Icon: Spline },
    { id: "area", label: "Area", Icon: Pentagon },
    { id: "count", label: "Count", Icon: MapPin },
  ] as { id: Tool; label: string; Icon: typeof Ruler }[]), []);

  function pickTool(t: Tool) {
    if (["length", "perimeter", "area", "count"].includes(t)) {
      if (!activeItem || activeItem.measurement_type !== t) {
        // Auto-create a matching item so there is always something to draw into.
        const count = items.filter((i) => i.measurement_type === t).length + 1;
        const labels: Record<MeasurementType, string> = { length: "Length", perimeter: "Perimeter", area: "Area", count: "Count" };
        const name = labels[t as MeasurementType] + " " + count;
        void addItem(name, t as MeasurementType, TAKEOFF_COLOURS[items.length % TAKEOFF_COLOURS.length]);
        return;
      }
    }
    setTool(t);
  }

  return (
    <div className="flex h-full">
      {/* LEFT QUANTITY PANEL */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
        {/* Property panel — which property this project is about (Nearmap-style) */}
        <div className="border-b border-slate-200 bg-sky-50/60 px-3 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-sky-700">Property</p>
          <p className="mt-0.5 text-sm font-semibold leading-snug text-sky-950">{project.full_address}</p>
          {project.latitude != null && project.longitude != null && (
            <p className="mt-0.5 text-[11px] text-slate-500">
              {project.latitude.toFixed(6)}, {project.longitude.toFixed(6)}
            </p>
          )}
          {parcelInfo?.lotId && (
            <p className="mt-1 text-xs text-slate-600">Parcel <span className="font-semibold text-sky-950">{parcelInfo.lotId}</span></p>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Takeoff items</span>
          <button onClick={() => setAdding((v) => !v)} className="inline-flex items-center gap-1 rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>

        {adding && <AddItemForm onAdd={addItem} onCancel={() => setAdding(false)} usedColours={items.map((i) => i.colour)} />}

        <div className="min-h-0 flex-1 overflow-auto">
          {items.length === 0 && !adding && (
            <p className="px-3 py-6 text-center text-xs text-slate-400">No items yet. Add one, or pick a measurement tool to start.</p>
          )}
          {items.map((it) => {
            const isOpen = expanded[it.id];
            return (
              <div key={it.id} className={`border-b border-slate-100 ${activeItemId === it.id ? "bg-blue-50" : ""}`}>
                <div className="flex items-center gap-1.5 px-2 py-2">
                  <button onClick={() => setExpanded((e) => ({ ...e, [it.id]: !e[it.id] }))} className="text-slate-400 hover:text-slate-700">
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setColourPickerFor((v) => (v === it.id ? null : it.id))}
                      title="Change colour"
                      className="h-4 w-4 rounded-sm ring-1 ring-slate-300 ring-offset-1 transition hover:scale-110"
                      style={{ backgroundColor: it.colour }}
                    />
                    {colourPickerFor === it.id && (
                      <div className="absolute left-0 top-6 z-30 flex w-32 flex-wrap gap-1 rounded-md border border-slate-200 bg-white p-2 shadow-lg">
                        {TAKEOFF_COLOURS.map((c) => (
                          <button
                            key={c}
                            onClick={() => changeItemColour(it, c)}
                            className={`h-5 w-5 rounded-full border-2 ${it.colour === c ? "border-slate-900" : "border-transparent"}`}
                            style={{ backgroundColor: c }}
                            aria-label={c}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => { setActiveItemId(it.id); setTool(it.measurement_type as Tool); }} className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-sm font-medium text-sky-950">{it.name}</span>
                    <span className="block text-[11px] text-slate-400">{it.measurement_type} · {it.measurements.length}</span>
                  </button>
                  <span className="shrink-0 text-xs font-semibold text-slate-700">{fmt(itemTotal(it), it.measurement_type)}</span>
                  <button onClick={() => toggleItemVisible(it)} className="text-slate-400 hover:text-slate-700" title="Toggle visibility">
                    {it.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button onClick={() => deleteItem(it)} className="text-slate-400 hover:text-red-600" title="Delete item">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {isOpen && (
                  <ul className="pb-1 pl-9 pr-2">
                    {it.measurements.map((m, i) => (
                      <li key={m.id}>
                        <button
                          onClick={() => selectMeasurementFromPanel(m.id)}
                          className={`flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs ${selectedMeasurementId === m.id ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}
                        >
                          <span>{it.measurement_type === "count" ? `Point ${i + 1}` : `${it.measurement_type} ${i + 1}`}</span>
                          <span className="font-medium">{fmt(it.measurement_type === "count" ? 1 : m.calculated_quantity, it.measurement_type)}</span>
                        </button>
                      </li>
                    ))}
                    {it.measurements.length === 0 && <li className="px-2 py-1 text-[11px] text-slate-400">No measurements yet</li>}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* CENTRE: toolbar + map */}
      <div className="relative min-w-0 flex-1">
        {/* Toolbar */}
        <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center gap-1 rounded-lg border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur">
          {toolBtns.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => pickTool(id)}
              title={label}
              className={`flex h-8 w-8 items-center justify-center rounded-md transition ${tool === id ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <span className="mx-1 h-6 w-px bg-slate-200" />
          <button onClick={() => void undo()} disabled={!canUndo} title="Undo" className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-30">
            <Undo2 className="h-4 w-4" />
          </button>
          <button onClick={() => void redo()} disabled={!canRedo} title="Redo" className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-30">
            <Redo2 className="h-4 w-4" />
          </button>
          <button onClick={() => void deleteSelected()} disabled={!selectedMeasurementId} title="Delete selected" className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-30">
            <Trash2 className="h-4 w-4" />
          </button>
          <button onClick={fitToScreen} title="Fit to screen" className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100">
            <Maximize className="h-4 w-4" />
          </button>
        </div>

        {/* Right controls */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
          <ToggleChip active={showCadastre} onClick={() => setShowCadastre((v) => !v)} Icon={Layers} label="Boundaries" />
          <ToggleChip active={showMeasurements} onClick={() => setShowMeasurements((v) => !v)} Icon={showMeasurements ? Eye : EyeOff} label="Measurements" />
          <ToggleChip active={showLabels} onClick={() => setShowLabels((v) => !v)} Icon={Ruler} label="Labels" />
        </div>

        {/* Save status */}
        <div className="absolute bottom-2 left-3 z-10 rounded bg-white/90 px-2 py-1 text-xs shadow-sm">
          {saveStatus === "saving" && <span className="flex items-center gap-1 text-slate-500"><Loader2 className="h-3 w-3 animate-spin" /> Saving…</span>}
          {saveStatus === "saved" && <span className="flex items-center gap-1 text-green-600"><Check className="h-3 w-3" /> Saved</span>}
          {saveStatus === "error" && <span className="text-red-600">Save failed — retry</span>}
          {saveStatus === "idle" && <span className="text-slate-400">Ready</span>}
        </div>

        {/* Disclaimer */}
        <div className="absolute bottom-2 right-3 z-10 max-w-xs rounded bg-amber-50/95 px-2 py-1 text-[10px] leading-tight text-amber-800 shadow-sm">
          Aerial measurements are approximate and must be verified against drawings or onsite conditions.
        </div>

        {/* Live measurement tooltip (moved onto the map by an OL overlay) */}
        <div
          ref={measureTipRef}
          style={{ display: "none" }}
          className="pointer-events-none whitespace-nowrap rounded bg-slate-900 px-1.5 py-0.5 text-xs font-semibold text-white shadow"
        />

        <div ref={mapEl} className="h-full w-full bg-slate-200" />
      </div>
    </div>
  );
}

function ToggleChip({ active, onClick, Icon, label }: { active: boolean; onClick: () => void; Icon: typeof Ruler; label: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium shadow-sm transition ${active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white/95 text-slate-600 hover:bg-slate-50"}`}>
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function AddItemForm({ onAdd, onCancel, usedColours }: { onAdd: (name: string, type: MeasurementType, colour: string) => void; onCancel: () => void; usedColours: string[] }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<MeasurementType>("area");
  const firstFree = TAKEOFF_COLOURS.find((c) => !usedColours.includes(c)) ?? TAKEOFF_COLOURS[0];
  const [colour, setColour] = useState(firstFree);

  return (
    <div className="border-b border-slate-200 bg-slate-50 p-3">
      <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name (e.g. Roof membrane area)" className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500" />
      <div className="mt-2 grid grid-cols-4 gap-1">
        {(["length", "perimeter", "area", "count"] as MeasurementType[]).map((t) => (
          <button key={t} onClick={() => setType(t)} className={`rounded px-1.5 py-1 text-[11px] font-medium capitalize ${type === t ? "bg-blue-600 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {TAKEOFF_COLOURS.map((c) => (
          <button key={c} onClick={() => setColour(c)} className={`h-5 w-5 rounded-full border-2 ${colour === c ? "border-slate-900" : "border-transparent"}`} style={{ backgroundColor: c }} aria-label={c} />
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => onAdd(name.trim() || `${type} item`, type, colour)} className="flex-1 rounded bg-blue-600 px-2 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Add item</button>
        <button onClick={onCancel} className="rounded px-2 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800">Cancel</button>
      </div>
    </div>
  );
}
