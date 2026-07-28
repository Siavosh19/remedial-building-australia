"use client";

// The whole module (OpenLayers included) is code-split behind next/dynamic with
// ssr:false, so `ol` never enters the main RBA bundle — it loads only when this
// map route opens.
//
// UI skin: Remedial Estimating design system — sky-blue primary (#0369a1),
// navy dark chrome (#082f49 / #0c2b3f), white surfaces, red destructive
// (#dc2626). The map engine (SIX Maps imagery/cadastre, geocoding, geodesic
// measurement) is unchanged from the approved version.
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
import { createBox } from "ol/interaction/Draw";
import { fromLonLat, toLonLat } from "ol/proj";
import { getLength, getArea } from "ol/sphere";
import { createEmpty, extend as extendExtent, isEmpty as extentIsEmpty } from "ol/extent";
import { Style, Stroke, Fill, Circle as CircleStyle, Text as TextStyle, Icon } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import Overlay from "ol/Overlay";
import Polygon, { fromCircle } from "ol/geom/Polygon";
import LineString from "ol/geom/LineString";
import type CircleGeom from "ol/geom/Circle";
import { defaults as defaultControls, FullScreen, Attribution } from "ol/control";
import type { FeatureLike } from "ol/Feature";
import "ol/ol.css";

import {
  MousePointer2, Move, Ruler, Spline, Pentagon, MapPin, Undo2, Redo2, Trash2, Maximize2, Plus, Loader2, Check, Eye, EyeOff,
  Camera, Copy, Navigation, X, Search, Settings2, Folder, Minus, Save, RotateCcw, ChevronDown, Layers, Map as MapIcon, Crosshair,
} from "lucide-react";
import { TAKEOFF_COLOURS, type MeasurementType } from "@/types/measuremap";
import * as api from "./api";

const MAP_PROJ = "EPSG:3857";
const geojson = new GeoJSON();

// Nearmap-style downward teardrop pin (sky-blue), anchored at its tip.
const PIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">' +
  '<path d="M14 39 C14 39 25 22 25 14 A11 11 0 1 0 3 14 C3 22 14 39 14 39 Z" fill="#0369a1" stroke="#ffffff" stroke-width="2.5"/>' +
  '<circle cx="14" cy="14" r="4.5" fill="#ffffff"/></svg>';
const PIN_SRC = "data:image/svg+xml;utf8," + encodeURIComponent(PIN_SVG);

type Tool = "select" | "pan" | "length" | "perimeter" | "area" | "count" | "rectangle" | "circle";
type Item = api.ApiItem;
type SaveStatus = "idle" | "saving" | "saved" | "error";
type Snapshot = { measurementId: string; itemId: string; gj: unknown; quantity: number; unit: string; label: string | null; idx?: number; mtype: string };

const DRAW_TYPE: Record<"length" | "perimeter" | "area" | "count", "LineString" | "Polygon" | "Point"> = {
  length: "LineString", perimeter: "LineString", area: "Polygon", count: "Point",
};

// Friendly labels + the list grouping order used by the left panel.
const TYPE_LABEL: Record<MeasurementType, string> = { area: "Area", length: "Distance", perimeter: "Perimeter", count: "Count" };
const GROUP_ORDER: MeasurementType[] = ["area", "length", "perimeter", "count"];

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

// Panel-friendly quantity (thousands separators, unit split out).
function uiQty(it: Item): { value: string; unit: string } {
  if (it.measurement_type === "count") return { value: String(it.measurements.length), unit: "" };
  const total = itemTotal(it);
  return {
    value: total.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    unit: it.measurement_type === "area" ? "m²" : "m",
  };
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
  const markerSourceRef = useRef<VectorSource>(new VectorSource());
  const markerFeatureRef = useRef<Feature | null>(null);
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
  // Status-bar spans updated imperatively (avoids a React re-render per mousemove).
  const cursorRef = useRef<HTMLSpanElement>(null);
  const zoomRef = useRef<HTMLSpanElement>(null);
  const scaleRef = useRef<HTMLSpanElement>(null);

  const [items, setItems] = useState<Item[]>(initialItems);
  const [activeItemId, setActiveItemId] = useState<string | null>(initialItems[0]?.id ?? null);
  const [tool, setTool] = useState<Tool>("pan");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showCadastre, setShowCadastre] = useState(false); // ALL-lots overlay off by default; we highlight only the project's parcel
  const [colourPickerFor, setColourPickerFor] = useState<string | null>(null);
  const [parcelInfo, setParcelInfo] = useState<{ lotId: string | null; planLabel: string | null } | null>(null);
  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: project.latitude, lng: project.longitude });
  const [placing, setPlacing] = useState(false);
  const placingRef = useRef(false); placingRef.current = placing;
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [draftName, setDraftName] = useState("");
  const [wastePct, setWastePct] = useState("0");

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
    const colour = it?.colour ?? "#0369a1";
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
        crossOrigin: "anonymous", // allows screenshot export without tainting the canvas
      }),
    });
    const cadastre = new TileLayer({
      source: new TileArcGISRest({
        url: "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer",
        params: { TRANSPARENT: true },
        crossOrigin: "anonymous",
      }),
      visible: false, // optional "all boundaries" overlay (toggle in Map Layers)
      opacity: 0.9,
    });
    cadastreRef.current = cadastre;

    // Highlight for THE project's parcel (populated by the parcel fetch below).
    const parcelLayer = new VectorLayer({
      source: parcelSourceRef.current,
      style: new Style({
        // Dashed highlight of THE property parcel (sky-blue).
        stroke: new Stroke({ color: "#0369a1", width: 3, lineDash: [8, 6] }),
        fill: new Fill({ color: "rgba(3,105,161,0.08)" }),
      }),
    });

    const vector = new VectorLayer({ source: sourceRef.current, style: styleFor as never });

    const centre = fromLonLat([project.longitude ?? 151.21, project.latitude ?? -33.87]);
    const map = new Map({
      target: mapEl.current,
      layers: [imagery, cadastre, parcelLayer, vector],
      controls: defaultControls({ attribution: false, zoom: false }).extend([
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

    // Project marker (ref'd so click-to-select can move it).
    const markerLayer = new VectorLayer({
      source: markerSourceRef.current,
      style: new Style({ image: new Icon({ src: PIN_SRC, anchor: [0.5, 1], scale: 1 }) }),
    });
    map.addLayer(markerLayer);
    if (project.latitude != null && project.longitude != null) {
      const mf = new Feature(new Point(centre));
      markerFeatureRef.current = mf;
      markerSourceRef.current.addFeature(mf);
    }

    // Click-to-select: when in "Set property" mode, a click sets the property.
    map.on("singleclick", (e) => {
      if (!placingRef.current) return;
      const [lng, lat] = toLonLat(e.coordinate);
      void setPropertyAt(lat, lng, e.coordinate);
    });

    // Status bar: live cursor coordinate + zoom + nominal scale.
    map.on("pointermove", (e) => {
      if (e.dragging) return;
      const [lng, lat] = toLonLat(e.coordinate);
      if (cursorRef.current) cursorRef.current.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    });
    const updateStatus = () => {
      const v = map.getView();
      const z = v.getZoom();
      if (zoomRef.current && z != null) zoomRef.current.textContent = z.toFixed(1);
      const res = v.getResolution();
      const center = v.getCenter();
      if (res && scaleRef.current) {
        const lat = center ? toLonLat(center)[1] : -33.87;
        const mpp = res * Math.cos((lat * Math.PI) / 180); // web-mercator scale correction
        const scale = Math.round((mpp * 96) / 0.0254);
        scaleRef.current.textContent = `1 : ${scale.toLocaleString("en-AU")}`;
      }
    };
    map.on("moveend", updateStatus);
    updateStatus();

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
      const isRect = tool === "rectangle";
      const isCircle = tool === "circle";
      const drawType = isRect || isCircle ? "Circle" : DRAW_TYPE[tool as Exclude<Tool, "select" | "pan" | "rectangle" | "circle">];
      const draw = new Draw({
        source: sourceRef.current,
        type: drawType,
        ...(isRect ? { geometryFunction: createBox() } : {}),
        ...(tool === "length" ? { maxPoints: 2 } : {}),
      });
      const tip = measureTipRef.current;
      const ov = measureOverlayRef.current;
      const mtype = active.measurement_type as MeasurementType;
      if (tool !== "count" && !isCircle && tip && ov) {
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
      draw.on("drawend", (e) => {
        // Circle geometry has no geodesic area; convert to a polygon first.
        if (isCircle) {
          const g = e.feature.getGeometry();
          if (g && g.getType() === "Circle") e.feature.setGeometry(fromCircle(g as CircleGeom));
        }
        void handleDrawEnd(active, e.feature);
      });
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

  // Seed the details form when the active item changes.
  useEffect(() => {
    setDraftName(activeItem?.name ?? "");
    setWastePct("0");
    setColourPickerFor(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItemId]);

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
        // Frame the map on the single property so it's the focus.
        const ext = g.getExtent();
        if (ext && Number.isFinite(ext[0]) && mapRef.current) {
          mapRef.current.getView().fit(ext, { padding: [90, 90, 90, 90], maxZoom: 20, duration: 400 });
        }
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

  function recenter() {
    const map = mapRef.current;
    if (!map) return;
    const pext = parcelSourceRef.current.getExtent();
    if (parcelSourceRef.current.getFeatures().length && pext && Number.isFinite(pext[0])) {
      map.getView().fit(pext, { padding: [90, 90, 90, 90], maxZoom: 20, duration: 300 });
    } else if (project.latitude != null && project.longitude != null) {
      map.getView().animate({ center: fromLonLat([project.longitude, project.latitude]), zoom: 19, duration: 300 });
    }
  }

  function zoomBy(delta: number) {
    const v = mapRef.current?.getView();
    if (!v) return;
    v.animate({ zoom: (v.getZoom() ?? 19) + delta, duration: 200 });
  }

  function finishDrawing() { drawRef.current?.finishDrawing(); }
  function cancelDrawing() { drawRef.current?.abortDrawing(); setTool("pan"); }

  // Export the current map view as a PNG (imagery tiles use crossOrigin so the
  // canvas isn't tainted). Composites all OL layer canvases into one.
  function screenshot() {
    const map = mapRef.current;
    if (!map) return;
    map.once("rendercomplete", () => {
      const size = map.getSize();
      if (!size) return;
      const out = document.createElement("canvas");
      out.width = size[0];
      out.height = size[1];
      const ctx = out.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#e5e7eb";
      ctx.fillRect(0, 0, size[0], size[1]);
      map.getViewport().querySelectorAll<HTMLCanvasElement>(".ol-layer canvas, canvas.ol-layer").forEach((canvas) => {
        if (canvas.width === 0) return;
        const parent = canvas.parentNode as HTMLElement | null;
        const op = parent?.style?.opacity ?? canvas.style.opacity;
        ctx.globalAlpha = op === "" ? 1 : Number(op);
        const tf = canvas.style.transform.match(/^matrix\(([^)]+)\)$/);
        if (tf) {
          const t = tf[1].split(",").map(Number);
          ctx.setTransform(t[0], t[1], t[2], t[3], t[4], t[5]);
        }
        ctx.drawImage(canvas, 0, 0);
      });
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
      try {
        const link = document.createElement("a");
        link.download = "measuremap.png";
        link.href = out.toDataURL("image/png");
        link.click();
      } catch (err) {
        console.error("[measuremap] screenshot failed:", err);
        setSaveStatus("error");
      }
    });
    map.renderSync();
  }

  function copyCoords() {
    if (coords.lat == null || coords.lng == null) return;
    navigator.clipboard?.writeText(`${coords.lat}, ${coords.lng}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  }

  function openStreetView() {
    const url = coords.lat != null && coords.lng != null
      ? `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coords.lat},${coords.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.full_address)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openGoogleMaps() {
    const q = coords.lat != null && coords.lng != null ? `${coords.lat},${coords.lng}` : project.full_address;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, "_blank", "noopener,noreferrer");
  }

  // ── Takeoff item actions ──────────────────────────────────────────────────
  async function addItem(name: string, type: MeasurementType, colour: string, toolAfter?: Tool) {
    setSaveStatus("saving");
    try {
      const created = await api.createItem(project.id, { name, measurement_type: type, colour, source_type: "map", sort_order: items.length });
      setItems((prev) => [...prev, created]);
      setActiveItemId(created.id);
      setShowDetails(true);
      setTool(toolAfter ?? type);
      setSaveStatus("saved");
      setAdding(false);
    } catch { setSaveStatus("error"); }
  }

  function selectItem(it: Item) {
    setActiveItemId(it.id);
    setShowDetails(true);
    const map = mapRef.current;
    if (!map) return;
    const ext = createEmpty();
    sourceRef.current.getFeatures().forEach((f) => {
      if (f.get("itemId") !== it.id) return;
      const g = f.getGeometry();
      if (g) extendExtent(ext, g.getExtent());
    });
    if (!extentIsEmpty(ext)) map.getView().fit(ext, { padding: [80, 80, 80, 80], maxZoom: 21, duration: 250 });
  }

  async function toggleItemVisible(it: Item) {
    setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, is_visible: !i.is_visible } : i));
    try { await api.patchItem(project.id, it.id, { is_visible: !it.is_visible }); } catch { /* visual only */ }
  }

  // Click-to-select the correct property. The clicked point is inside the lot,
  // so the parcel query is exact (no geocoder guesswork). Saves the coordinates.
  async function setPropertyAt(lat: number, lng: number, coordinate: number[]) {
    if (markerFeatureRef.current) {
      markerFeatureRef.current.setGeometry(new Point(coordinate));
    } else {
      const mf = new Feature(new Point(coordinate));
      markerFeatureRef.current = mf;
      markerSourceRef.current.addFeature(mf);
    }
    setCoords({ lat, lng });
    setPlacing(false);
    setSaveStatus("saving");
    try {
      const res = await fetch(`/api/measuremap/projects/${project.id}/parcel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: lat, longitude: lng }),
      });
      if (!res.ok) throw new Error("save failed");
      const { parcel } = await res.json();
      parcelSourceRef.current.clear();
      if (parcel?.geometry) {
        const g = geojson.readGeometry(parcel.geometry, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
        parcelSourceRef.current.addFeature(new Feature(g));
        setParcelInfo({ lotId: parcel.lotId, planLabel: parcel.planLabel });
        const ext = g.getExtent();
        if (ext && Number.isFinite(ext[0]) && mapRef.current) {
          mapRef.current.getView().fit(ext, { padding: [90, 90, 90, 90], maxZoom: 20, duration: 400 });
        }
      } else {
        setParcelInfo(null);
      }
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }

  async function changeItemColour(it: Item, colour: string) {
    setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, colour } : i));
    setColourPickerFor(null);
    sourceRef.current.changed(); // restyle existing geometry immediately
    try { await api.patchItem(project.id, it.id, { colour }); } catch { setSaveStatus("error"); }
  }

  async function saveDetails() {
    const it = activeItem;
    if (!it) return;
    const name = draftName.trim() || it.name;
    setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, name } : i));
    setSaveStatus("saving");
    try { await api.patchItem(project.id, it.id, { name }); setSaveStatus("saved"); }
    catch { setSaveStatus("error"); }
  }

  function duplicateItem() {
    const it = activeItem;
    if (!it) return;
    void addItem(`${it.name} copy`, it.measurement_type as MeasurementType, it.colour, "pan");
  }

  async function deleteItem(it: Item) {
    if (!confirm(`Delete “${it.name}” and its ${it.measurements.length} measurement(s)?`)) return;
    it.measurements.forEach((m) => { const f = sourceRef.current.getFeatureById(m.id); if (f) sourceRef.current.removeFeature(f); });
    setItems((prev) => prev.filter((i) => i.id !== it.id));
    if (activeItemId === it.id) setActiveItemId(null);
    try { await api.removeItem(project.id, it.id); } catch { setSaveStatus("error"); }
  }

  const toolBtns = useMemo(() => ([
    { id: "select", label: "Select", Icon: MousePointer2 },
    { id: "pan", label: "Pan", Icon: Move },
    { id: "length", label: "Distance", Icon: Ruler },
    { id: "perimeter", label: "Perimeter", Icon: Spline },
    { id: "area", label: "Area", Icon: Pentagon },
    { id: "count", label: "Count", Icon: MapPin },
  ] as { id: Tool; label: string; Icon: typeof Ruler }[]), []);

  function pickTool(t: Tool) {
    const drawTools = ["length", "perimeter", "area", "count", "rectangle", "circle"];
    if (drawTools.includes(t)) {
      // rectangle & circle produce AREA measurements.
      const neededType: MeasurementType = t === "rectangle" || t === "circle" ? "area" : (t as MeasurementType);
      if (!activeItem || activeItem.measurement_type !== neededType) {
        // Auto-create a matching item so there is always something to draw into.
        const count = items.filter((i) => i.measurement_type === neededType).length + 1;
        const name = `${TYPE_LABEL[neededType]} ${count}`;
        void addItem(name, neededType, TAKEOFF_COLOURS[items.length % TAKEOFF_COLOURS.length], t);
        return;
      }
    }
    setTool(t);
  }

  // Derived list data for the left panel.
  const q = search.trim().toLowerCase();
  const visibleItems = q ? items.filter((i) => i.name.toLowerCase().includes(q)) : items;
  const groups = GROUP_ORDER.map((type) => ({ type, list: visibleItems.filter((i) => i.measurement_type === type) }));
  const measCount = items.reduce((s, i) => s + i.measurements.length, 0);
  const isDrawing = tool === "length" || tool === "perimeter" || tool === "area" || tool === "count";

  return (
    <div className="flex h-full">
      {/* ── LEFT: Map Layers + Measurements (288px) ─────────────────────── */}
      <aside className="flex w-[288px] shrink-0 flex-col border-r border-[#D7DCE0] bg-white">
        <section className="border-b border-[#E2E5E7] px-4 py-4">
          <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#383E42]">Map Layers</h2>
          <LayerRow label="Satellite" Icon={MapIcon} checked locked />
          <LayerRow label="Measurements" Icon={Eye} checked={showMeasurements} onToggle={() => setShowMeasurements((v) => !v)} />
          <LayerRow label="Labels" Icon={Ruler} checked={showLabels} onToggle={() => setShowLabels((v) => !v)} />
          <LayerRow label="Property Boundaries" Icon={Layers} checked={showCadastre} onToggle={() => setShowCadastre((v) => !v)} />
        </section>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="px-4 pt-4">
            <h2 className="text-[12px] font-semibold uppercase tracking-wide text-[#383E42]">Measurements</h2>

            <button
              onClick={() => setAdding((v) => !v)}
              className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded bg-[#0369a1] text-[13px] font-semibold text-white transition hover:bg-[#075985]"
            >
              <Plus size={16} /> New Measurement
            </button>

            <div className="mt-3 flex gap-2">
              <div className="flex h-9 min-w-0 flex-1 items-center rounded border border-[#D7DCE0] px-3">
                <Search size={15} className="mr-2 text-[#747B80]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="min-w-0 flex-1 border-0 bg-transparent text-[12px] outline-none"
                  placeholder="Search measurements"
                />
              </div>
              <button className="grid h-9 w-9 place-items-center rounded border border-[#D7DCE0] text-[#586066]" title="List settings">
                <Settings2 size={15} />
              </button>
            </div>
          </div>

          {adding && <AddItemForm onAdd={addItem} onCancel={() => setAdding(false)} usedColours={items.map((i) => i.colour)} />}

          <div className="mt-3 min-h-0 flex-1 overflow-y-auto px-4 pb-4">
            {items.length === 0 && !adding && (
              <p className="py-6 text-center text-[12px] text-[#8A9196]">
                No measurements yet. Add one, or pick a tool to start drawing.
              </p>
            )}

            {groups.map(({ type, list }) => list.length > 0 && (
              <section key={type} className="mt-4 first:mt-1">
                <h3 className="mb-1 text-[11px] font-semibold text-[#484F54]">
                  {TYPE_LABEL[type].toUpperCase()} ({list.length})
                </h3>
                {list.map((it) => {
                  const active = it.id === activeItemId;
                  const { value, unit } = uiQty(it);
                  return (
                    <button
                      key={it.id}
                      onClick={() => selectItem(it)}
                      className={[
                        "grid h-9 w-full grid-cols-[12px_minmax(0,1fr)_auto_24px] items-center gap-2 rounded px-1 text-left transition",
                        active ? "bg-[#EAF3FA]" : "hover:bg-[#F5F6F7]",
                      ].join(" ")}
                    >
                      <span className="h-[10px] w-[10px] rounded-sm" style={{ backgroundColor: it.colour }} />
                      <span className={`truncate text-[12px] ${active ? "font-semibold text-[#0c4a6e]" : "text-[#30363A]"}`}>{it.name}</span>
                      <span className="whitespace-nowrap text-right text-[11px] text-[#586066]">
                        {value}{unit && ` ${unit}`}
                      </span>
                      <span
                        role="button"
                        tabIndex={-1}
                        onClick={(e) => { e.stopPropagation(); void toggleItemVisible(it); }}
                        className="grid h-7 w-7 place-items-center rounded text-[#586066] hover:bg-[#E8EBED]"
                        title="Toggle visibility"
                      >
                        {it.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </span>
                    </button>
                  );
                })}
              </section>
            ))}
          </div>

          <div className="border-t border-[#E1E5E7] p-4">
            <button className="flex h-9 w-full items-center justify-center gap-2 rounded border border-[#C9D0D4] bg-white text-[12px] font-semibold text-[#4B5155]" title="Coming soon" disabled>
              <Folder size={15} /> Import Measurements
            </button>
          </div>
        </section>
      </aside>

      {/* ── CENTRE: toolbar + live map + status bar ─────────────────────── */}
      <section className="relative min-w-0 flex-1 overflow-hidden bg-[#0c2b3f]">
        {/* Floating toolbar (top-left) */}
        <div className="absolute left-4 top-4 z-20 flex h-[58px] items-stretch rounded-md border border-white/15 bg-[#082f49]/95 p-1 shadow-xl backdrop-blur">
          {toolBtns.map(({ id, label, Icon }) => {
            const active = tool === id;
            return (
              <button
                key={id}
                onClick={() => pickTool(id)}
                title={label}
                className={[
                  "flex w-[62px] flex-col items-center justify-center gap-1 rounded text-[10px] text-white transition",
                  active ? "bg-[#0369a1]" : "hover:bg-white/10",
                ].join(" ")}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            );
          })}

          <div className="mx-1 w-px bg-white/15" />
          <ToolbarBtn label="Undo" Icon={Undo2} onClick={() => void undo()} disabled={!canUndo} />
          <ToolbarBtn label="Redo" Icon={Redo2} onClick={() => void redo()} disabled={!canRedo} />
          <div className="mx-1 w-px bg-white/15" />
          <ToolbarBtn label="Fit" Icon={Maximize2} onClick={fitToScreen} />
          <ToolbarBtn label="Export" Icon={Camera} onClick={screenshot} />
        </div>

        {/* Drawing hint bar */}
        {isDrawing && (
          <div className="absolute left-1/2 top-[86px] z-30 flex -translate-x-1/2 items-center gap-3 rounded-md border border-[#7dd3fc] bg-white px-4 py-2 shadow-lg">
            <span className="text-[12px] font-medium text-[#30363A]">
              Click points on the map to draw the {TYPE_LABEL[tool as MeasurementType].toLowerCase()}.
            </span>
            <button onClick={finishDrawing} className="h-8 rounded bg-[#0369a1] px-4 text-[12px] font-semibold text-white hover:bg-[#075985]">
              Finish
            </button>
            <button onClick={cancelDrawing} className="h-8 rounded border border-[#C9CFD3] px-3 text-[12px] text-[#4B5155]">
              Cancel
            </button>
          </div>
        )}

        {/* Address / property card (top-right) */}
        <div className="absolute right-4 top-4 z-20 w-[272px] overflow-hidden rounded-md border border-[#D5DADD] bg-white shadow-lg">
          <div className="flex items-start gap-2 px-3 py-2.5">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#0369a1]" />
            <div className="min-w-0">
              <p className="text-[12px] font-medium leading-snug text-[#212121]">{project.full_address}</p>
              {parcelInfo?.lotId && (
                <p className="mt-0.5 text-[11px] text-[#5D6469]">Lot/DP <span className="font-semibold text-[#0c4a6e]">{parcelInfo.lotId}</span></p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-[#E2E5E7]">
            <button onClick={recenter} className="flex h-9 items-center justify-center gap-1.5 text-[11px] font-medium text-[#30363A] hover:bg-[#F4F5F6]">
              <Crosshair size={13} /> Re-centre
            </button>
            <button onClick={openStreetView} className="flex h-9 items-center justify-center gap-1.5 border-l border-[#E2E5E7] text-[11px] font-medium text-[#30363A] hover:bg-[#F4F5F6]">
              <Eye size={13} /> Street View
            </button>
          </div>
          <div className="grid grid-cols-3 border-t border-[#E2E5E7] text-[#586066]">
            <button onClick={copyCoords} className="flex h-8 items-center justify-center gap-1 text-[10px] hover:bg-[#F4F5F6]" title="Copy coordinates">
              {copied ? <Check size={12} className="text-[#0369a1]" /> : <Copy size={12} />} Copy
            </button>
            <button onClick={openGoogleMaps} className="flex h-8 items-center justify-center gap-1 border-l border-[#E2E5E7] text-[10px] hover:bg-[#F4F5F6]" title="Open in Google Maps">
              <Navigation size={12} /> Maps
            </button>
            <button
              onClick={() => { if (!placing) setTool("pan"); setPlacing((v) => !v); }}
              className={[
                "flex h-8 items-center justify-center gap-1 border-l border-[#E2E5E7] text-[10px]",
                placing ? "bg-[#0369a1] text-white" : "hover:bg-[#F4F5F6]",
              ].join(" ")}
              title="Click the map to correct the property pin"
            >
              <MapPin size={12} /> Set pin
            </button>
          </div>
        </div>

        {placing && (
          <div className="absolute left-1/2 top-[86px] z-30 -translate-x-1/2 rounded-md bg-[#0369a1] px-3 py-1.5 text-[12px] font-semibold text-white shadow-lg">
            Click your property on the map to set it
          </div>
        )}

        {/* Zoom controls (bottom-right, above status bar) */}
        <div className="absolute bottom-[54px] right-4 z-20 flex flex-col overflow-hidden rounded border border-white/20 bg-[#082f49]/90 text-white shadow-lg">
          <button onClick={() => zoomBy(1)} className="grid h-10 w-10 place-items-center border-b border-white/15 hover:bg-white/10" aria-label="Zoom in">
            <Plus size={18} />
          </button>
          <button onClick={() => zoomBy(-1)} className="grid h-10 w-10 place-items-center hover:bg-white/10" aria-label="Zoom out">
            <Minus size={18} />
          </button>
        </div>

        {/* Save status (bottom-left, above status bar) */}
        <div className="absolute bottom-[54px] left-4 z-20 rounded bg-white/90 px-2 py-1 text-[11px] shadow-sm">
          {saveStatus === "saving" && <span className="flex items-center gap-1 text-[#586066]"><Loader2 className="h-3 w-3 animate-spin" /> Saving…</span>}
          {saveStatus === "saved" && <span className="flex items-center gap-1 text-[#0369a1]"><Check className="h-3 w-3" /> Saved</span>}
          {saveStatus === "error" && <span className="text-[#dc2626]">Save failed — retry</span>}
          {saveStatus === "idle" && <span className="text-[#8A9196]">Ready</span>}
        </div>

        {/* Reopen Details tab when panel is closed */}
        {!showDetails && activeItem && (
          <button
            onClick={() => setShowDetails(true)}
            className="absolute right-0 top-1/2 z-20 flex h-10 -translate-y-1/2 items-center gap-1.5 rounded-l-md bg-white px-3 text-[12px] font-semibold text-[#30363A] shadow-lg"
          >
            <ChevronDown className="rotate-90" size={15} /> Details
          </button>
        )}

        {/* Live measurement tooltip (moved onto the map by an OL overlay) */}
        <div
          ref={measureTipRef}
          style={{ display: "none" }}
          className="pointer-events-none whitespace-nowrap rounded bg-[#082f49] px-1.5 py-0.5 text-[12px] font-semibold text-white shadow"
        />

        {/* The live SIX Maps / OpenLayers canvas */}
        <div ref={mapEl} className="h-full w-full bg-[#0c2b3f]" />

        {/* Bottom status bar (42px) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[42px] items-center bg-[#082f49]/95 px-5 text-[11px] text-white/90 backdrop-blur">
          <span>Scale <span ref={scaleRef} className="font-medium text-white">—</span></span>
          <span className="mx-4 h-4 w-px bg-white/20" />
          <span>Zoom <span ref={zoomRef} className="font-medium text-white">—</span></span>
          <span className="mx-4 h-4 w-px bg-white/20" />
          <span className="hidden sm:inline">Cursor <span ref={cursorRef} className="font-medium text-white">—</span></span>
          <span className="ml-auto">Measurements: <span className="font-medium text-white">{measCount}</span></span>
        </div>
      </section>

      {/* ── RIGHT: Measurement Details (310px) ──────────────────────────── */}
      {showDetails && activeItem && (
        <MeasurementDetails
          item={activeItem}
          draftName={draftName}
          onNameChange={setDraftName}
          wastePct={wastePct}
          onWasteChange={setWastePct}
          colourPickerOpen={colourPickerFor === activeItem.id}
          onToggleColourPicker={() => setColourPickerFor((v) => (v === activeItem.id ? null : activeItem.id))}
          onPickColour={(c) => changeItemColour(activeItem, c)}
          onSave={saveDetails}
          onDuplicate={duplicateItem}
          onDelete={() => deleteItem(activeItem)}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}

function ToolbarBtn({ label, Icon, onClick, disabled = false }: { label: string; Icon: typeof Ruler; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className="flex w-[62px] flex-col items-center justify-center gap-1 rounded text-[10px] text-white transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}

function LayerRow({
  label,
  Icon,
  checked = false,
  locked = false,
  onToggle,
}: {
  label: string;
  Icon: typeof Ruler;
  checked?: boolean;
  locked?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={locked}
      className="flex h-9 w-full items-center text-[13px] text-[#30363A] disabled:cursor-default"
    >
      <Icon size={16} className="mr-3 text-[#586066]" />
      <span>{label}</span>
      <span
        className={[
          "ml-auto grid h-[18px] w-[18px] place-items-center rounded border",
          checked ? "border-[#0369a1] bg-[#0369a1] text-white" : "border-[#AEB5BA] bg-white",
        ].join(" ")}
      >
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
    </button>
  );
}

function MeasurementDetails({
  item,
  draftName,
  onNameChange,
  wastePct,
  onWasteChange,
  colourPickerOpen,
  onToggleColourPicker,
  onPickColour,
  onSave,
  onDuplicate,
  onDelete,
  onClose,
}: {
  item: Item;
  draftName: string;
  onNameChange: (v: string) => void;
  wastePct: string;
  onWasteChange: (v: string) => void;
  colourPickerOpen: boolean;
  onToggleColourPicker: () => void;
  onPickColour: (c: string) => void;
  onSave: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const { value, unit } = uiQty(item);
  const isCount = item.measurement_type === "count";
  const waste = Number(wastePct) || 0;
  const adjusted = isCount
    ? value
    : (itemTotal(item) * (1 + waste / 100)).toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <aside className="flex w-[310px] shrink-0 flex-col border-l border-[#D7DCE0] bg-white">
      <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-[#E2E5E7] px-4">
        <h2 className="text-[12px] font-semibold uppercase tracking-wide text-[#383E42]">Measurement Details</h2>
        <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded text-[#586066] hover:bg-[#F1F3F4]">
          <X size={17} />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-6 w-6 rounded" style={{ backgroundColor: item.colour }} />
          <h3 className="truncate text-[14px] font-semibold text-[#212121]">{item.name}</h3>
        </div>

        <Field label="Name">
          <input
            value={draftName}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-9 w-full rounded border border-[#D3D9DD] px-3 text-[12px] outline-none focus:border-[#0369a1]"
          />
        </Field>

        <Field label="Measurement Type">
          <div className="flex h-9 items-center rounded border border-[#D3D9DD] bg-[#F7F8F9] px-3 text-[12px] text-[#4B5155]">
            {TYPE_LABEL[item.measurement_type as MeasurementType]}
          </div>
        </Field>

        <Field label="Colour">
          <div className="relative">
            <button
              onClick={onToggleColourPicker}
              className="h-8 w-20 rounded border border-[#D3D9DD]"
              style={{ backgroundColor: item.colour }}
              aria-label="Change colour"
            />
            {colourPickerOpen && (
              <div className="absolute left-0 top-9 z-30 flex w-40 flex-wrap gap-1.5 rounded-md border border-[#D7DCE0] bg-white p-2 shadow-lg">
                {TAKEOFF_COLOURS.map((c) => (
                  <button
                    key={c}
                    onClick={() => onPickColour(c)}
                    className={`h-6 w-6 rounded-full border-2 ${item.colour === c ? "border-[#212121]" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                    aria-label={c}
                  />
                ))}
              </div>
            )}
          </div>
        </Field>

        <Field label="Quantity">
          <div className="grid grid-cols-[1fr_64px]">
            <div className="flex h-9 items-center rounded-l border border-[#D3D9DD] bg-[#F7F8F9] px-3 text-[12px] font-semibold text-[#212121]">
              {value}
            </div>
            <div className="grid h-9 place-items-center rounded-r border-y border-r border-[#D3D9DD] bg-[#F7F8F9] text-[12px] text-[#4B5155]">
              {unit || "No."}
            </div>
          </div>
        </Field>

        {!isCount && (
          <>
            <Field label="Waste %">
              <div className="grid grid-cols-[1fr_50px]">
                <input
                  value={wastePct}
                  onChange={(e) => onWasteChange(e.target.value.replace(/[^0-9.]/g, ""))}
                  inputMode="decimal"
                  className="h-9 rounded-l border border-[#D3D9DD] px-3 text-[12px] outline-none focus:border-[#0369a1]"
                />
                <div className="grid h-9 place-items-center rounded-r border-y border-r border-[#D3D9DD] text-[12px] text-[#4B5155]">%</div>
              </div>
            </Field>

            <div className="mb-5 border-b border-[#E3E6E8] pb-4">
              <div className="text-[11px] text-[#666D72]">Adjusted Quantity</div>
              <div className="mt-1 text-[13px] font-semibold text-[#212121]">{adjusted} {unit}</div>
            </div>
          </>
        )}
      </div>

      <footer className="grid shrink-0 grid-cols-2 gap-3 border-t border-[#DDE1E4] bg-white p-4">
        <button onClick={onDuplicate} className="flex h-9 items-center justify-center gap-2 rounded border border-[#C9D0D4] text-[12px] font-semibold text-[#30363A] hover:bg-[#F5F6F7]">
          <RotateCcw size={14} /> Duplicate
        </button>
        <button onClick={onSave} className="flex h-9 items-center justify-center gap-2 rounded bg-[#0369a1] text-[12px] font-semibold text-white hover:bg-[#075985]">
          <Save size={14} /> Save
        </button>
        <button onClick={onDelete} className="col-span-2 flex h-9 items-center justify-center gap-2 rounded border border-[#dc2626] bg-white text-[12px] font-semibold text-[#dc2626] hover:bg-[#FEF2F2]">
          <Trash2 size={14} /> Delete Measurement
        </button>
      </footer>
    </aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-[11px] font-medium text-[#5D6469]">{label}</span>
      {children}
    </label>
  );
}

function AddItemForm({ onAdd, onCancel, usedColours }: { onAdd: (name: string, type: MeasurementType, colour: string) => void; onCancel: () => void; usedColours: string[] }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<MeasurementType>("area");
  const firstFree = TAKEOFF_COLOURS.find((c) => !usedColours.includes(c)) ?? TAKEOFF_COLOURS[0];
  const [colour, setColour] = useState(firstFree);

  return (
    <div className="mx-4 mt-3 rounded-md border border-[#D7DCE0] bg-[#F7F9FB] p-3">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (e.g. Roof membrane area)"
        className="w-full rounded border border-[#D3D9DD] px-2 py-1.5 text-[12px] outline-none focus:border-[#0369a1]"
      />
      <div className="mt-2 grid grid-cols-4 gap-1">
        {(["area", "length", "perimeter", "count"] as MeasurementType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded px-1.5 py-1 text-[11px] font-medium ${type === t ? "bg-[#0369a1] text-white" : "bg-white text-[#586066] hover:bg-[#EAF3FA]"}`}
          >
            {TYPE_LABEL[t]}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {TAKEOFF_COLOURS.map((c) => (
          <button
            key={c}
            onClick={() => setColour(c)}
            className={`h-5 w-5 rounded-full border-2 ${colour === c ? "border-[#212121]" : "border-transparent"}`}
            style={{ backgroundColor: c }}
            aria-label={c}
          />
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={() => onAdd(name.trim() || `${TYPE_LABEL[type]} item`, type, colour)} className="flex-1 rounded bg-[#0369a1] px-2 py-1.5 text-[12px] font-semibold text-white hover:bg-[#075985]">
          Add
        </button>
        <button onClick={onCancel} className="rounded px-2 py-1.5 text-[12px] font-medium text-[#586066] hover:text-[#212121]">Cancel</button>
      </div>
    </div>
  );
}
