"use client";

// The whole module (OpenLayers included) is code-split behind next/dynamic with
// ssr:false, so `ol` never enters the main RBA bundle — it loads only here.
//
// UI skin: MapMeasure design system — sky-blue primary (#0369a1), navy dark
// chrome (#082f49 / #0c2b3f), white surfaces, red destructive (#dc2626).
// Data: the shared estimating model — work categories → items → measurements
// (migration 002). The SIX Maps imagery/cadastre + geodesic measurement engine
// is unchanged from the approved version.
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
import { Draw, Select, Translate } from "ol/interaction";
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
  MousePointer2, Move, Ruler, Spline, Pentagon, MapPin, Trash2, Maximize2, Plus, Loader2, Check, Eye, EyeOff,
  Camera, Copy, Search, Layers, Map as MapIcon, Crosshair, MoreVertical, FolderPlus, ChevronDown, ChevronRight, Pencil, Palette, FolderInput, List, X,
  Shapes, Type, Minus, ArrowUpRight, Square, Circle, Triangle,
} from "lucide-react";
import * as api from "./api";

const MAP_PROJ = "EPSG:3857";
const geojson = new GeoJSON();

// Sky-blue teardrop pin, anchored at its tip.
const PIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">' +
  '<path d="M14 39 C14 39 25 22 25 14 A11 11 0 1 0 3 14 C3 22 14 39 14 39 Z" fill="#0369a1" stroke="#ffffff" stroke-width="2.5"/>' +
  '<circle cx="14" cy="14" r="4.5" fill="#ffffff"/></svg>';
const PIN_SRC = "data:image/svg+xml;utf8," + encodeURIComponent(PIN_SVG);

// Construction-markup palette for items/measurements.
const COLOURS = ["#0369a1", "#7c3aed", "#dc2626", "#0f7a4d", "#b45309", "#0891b2", "#db2777", "#4f46e5", "#65a30d", "#334155"];

// A right-pointing arrowhead in the item colour, placed + rotated at a line end
// so distance measurements read as dimension lines (←——→).
function arrowStyle(colour: string, coord: number[], rotation: number): Style {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>` +
    `<path d='M8 3 L14 9 L8 15' fill='none' stroke='${colour}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
  return new Style({
    geometry: new Point(coord),
    image: new Icon({ src: "data:image/svg+xml;utf8," + encodeURIComponent(svg), anchor: [0.8, 0.5], rotateWithView: true, rotation: -rotation }),
  });
}

type MType = "area" | "linear" | "perimeter" | "count";
type MarkupKind = "text" | "line" | "arrow" | "rect" | "rectfill" | "circle" | "circlefill" | "triangle";
type Tool = "select" | "pan" | MType | `mk-${MarkupKind}`;
type Item = api.ApiItem;
type Category = api.ApiCategory;
type Annotation = api.ApiAnnotation;
type SaveStatus = "idle" | "saving" | "saved" | "error";

const MARKUP_TOOLS: { id: `mk-${MarkupKind}`; label: string; Icon: typeof Ruler }[] = [
  { id: "mk-text", label: "Text", Icon: Type },
  { id: "mk-line", label: "Line", Icon: Minus },
  { id: "mk-arrow", label: "Arrow", Icon: ArrowUpRight },
  { id: "mk-rect", label: "Box", Icon: Square },
  { id: "mk-rectfill", label: "Box fill", Icon: Square },
  { id: "mk-circle", label: "Circle", Icon: Circle },
  { id: "mk-circlefill", label: "Circle fill", Icon: Circle },
  { id: "mk-triangle", label: "Polygon", Icon: Triangle },
];

const DRAW_TYPE: Record<MType, "LineString" | "Polygon" | "Point"> = {
  linear: "LineString", perimeter: "LineString", area: "Polygon", count: "Point",
};
const TYPE_LABEL: Record<MType, string> = { area: "Area", linear: "Distance", perimeter: "Perimeter", count: "Count" };
const UNIT_FOR: Record<MType, string> = { area: "m2", linear: "m", perimeter: "m", count: "ea" };

function computeQuantity(geom: Geometry, type: MType): number {
  if (type === "count") return 1;
  if (type === "area") return getArea(geom, { projection: MAP_PROJ });
  return getLength(geom, { projection: MAP_PROJ });
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

function uiQty(it: Item): string {
  if (it.measurement_type === "count") return `${it.measurements.length} ea`;
  const total = itemTotal(it);
  const unit = it.measurement_type === "area" ? "m²" : "m";
  return `${total.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${unit}`;
}

export default function MapWorkspace({
  project,
  initialItems,
  initialCategories,
  initialAnnotations,
}: {
  project: { id: string; latitude: number | null; longitude: number | null; full_address: string };
  initialItems: Item[];
  initialCategories: Category[];
  initialAnnotations: Annotation[];
}) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const sourceRef = useRef<VectorSource>(new VectorSource());
  const parcelSourceRef = useRef<VectorSource>(new VectorSource());
  const markerSourceRef = useRef<VectorSource>(new VectorSource());
  const annotationSourceRef = useRef<VectorSource>(new VectorSource());
  const annotationLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const markerFeatureRef = useRef<Feature | null>(null);
  const cadastreRef = useRef<TileLayer<TileArcGISRest> | null>(null);
  const drawRef = useRef<Draw | null>(null);
  const translateRef = useRef<Translate | null>(null);
  const selectRef = useRef<Select | null>(null);
  const lastCountRef = useRef(0);
  const measureTipRef = useRef<HTMLDivElement>(null);
  const measureOverlayRef = useRef<Overlay | null>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const zoomRef = useRef<HTMLSpanElement>(null);
  const scaleRef = useRef<HTMLSpanElement>(null);

  const [items, setItems] = useState<Item[]>(initialItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(initialCategories[0]?.id ?? null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>("select");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showCadastre, setShowCadastre] = useState(false);
  const [showSiteDetails, setShowSiteDetails] = useState(true);
  const [showMeasList, setShowMeasList] = useState(true);
  const [namePopupOpen, setNamePopupOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColour, setNewColour] = useState(COLOURS[0]);
  const pendingRef = useRef<{ name: string; colour: string } | null>(null);
  const [markupOpen, setMarkupOpen] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [markupColour, setMarkupColour] = useState("#dc2626");
  const markupColourRef = useRef(markupColour); markupColourRef.current = markupColour;
  const [parcelInfo, setParcelInfo] = useState<{ lotId: string | null; planLabel: string | null } | null>(null);
  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: project.latitude, lng: project.longitude });
  const [placing, setPlacing] = useState(false);
  const placingRef = useRef(false); placingRef.current = placing;
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [menuFor, setMenuFor] = useState<{ kind: "item" | "category"; id: string } | null>(null);
  const [renaming, setRenaming] = useState<{ kind: "item" | "category"; id: string } | null>(null);
  const [colourFor, setColourFor] = useState<string | null>(null);
  const [moveFor, setMoveFor] = useState<string | null>(null);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; id: string; itemId: string | null; kind: "measurement" | "annotation" } | null>(null);

  // Latest-state refs so OL callbacks read current values without rebinding.
  const itemsRef = useRef(items); itemsRef.current = items;
  const activeItemIdRef = useRef(activeItemId); activeItemIdRef.current = activeItemId;
  const activeCatRef = useRef(activeCategoryId); activeCatRef.current = activeCategoryId;
  const toolRef = useRef(tool); toolRef.current = tool;
  const showMeasRef = useRef(showMeasurements); showMeasRef.current = showMeasurements;
  const showLabelsRef = useRef(showLabels); showLabelsRef.current = showLabels;
  const selMeasRef = useRef(selectedMeasurementId); selMeasRef.current = selectedMeasurementId;

  const styleFor = useCallback((feature: FeatureLike): Style | Style[] | undefined => {
    if (!showMeasRef.current) return undefined;
    const itemId = feature.get("itemId") as string;
    const it = itemsRef.current.find((i) => i.id === itemId);
    if (it && !it.is_visible) return undefined;
    const colour = it?.colour ?? "#0369a1";
    const mtype = (feature.get("mtype") as string) ?? "linear";
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
    const base = new Style({ stroke, fill: mtype === "area" ? new Fill({ color: colour + "33" }) : undefined, text });
    // Distance lines get an arrowhead at each end (dimension-line look).
    if (mtype === "linear") {
      const g = feature.getGeometry();
      if (g instanceof LineString) {
        const c = g.getCoordinates();
        if (c.length >= 2) {
          const s = c[0], e = c[c.length - 1];
          const rot = Math.atan2(e[1] - s[1], e[0] - s[0]);
          return [base, arrowStyle(colour, e, rot), arrowStyle(colour, s, rot + Math.PI)];
        }
      }
    }
    return base;
  }, []);

  // Style for visual-only annotations (markup layer).
  const annStyle = useCallback((feature: FeatureLike): Style | Style[] | undefined => {
    const annType = (feature.get("annType") as string) ?? "text";
    const colour = (feature.get("annColour") as string) ?? "#dc2626";
    const name = (feature.get("annName") as string) ?? null;
    const selected = feature.get("measurementId") === selMeasRef.current;
    const stroke = new Stroke({ color: colour, width: selected ? 4 : 2.5 });
    const label = name
      ? new TextStyle({ text: name, font: "600 12px system-ui, sans-serif", fill: new Fill({ color: "#0f172a" }), stroke: new Stroke({ color: "#fff", width: 3 }), overflow: true })
      : undefined;
    if (annType === "text") {
      return new Style({ text: new TextStyle({ text: name ?? "", font: "700 14px system-ui, sans-serif", fill: new Fill({ color: colour }), stroke: new Stroke({ color: "#fff", width: 4 }), overflow: true }) });
    }
    if (annType === "arrow") {
      const g = feature.getGeometry();
      if (g instanceof LineString) {
        const c = g.getCoordinates();
        if (c.length >= 2) { const s = c[0], e = c[c.length - 1]; const rot = Math.atan2(e[1] - s[1], e[0] - s[0]); return [new Style({ stroke, text: label }), arrowStyle(colour, e, rot)]; }
      }
      return new Style({ stroke, text: label });
    }
    if (annType === "line") return new Style({ stroke, text: label });
    const filled = annType.endsWith("fill");
    return new Style({ stroke, fill: filled ? new Fill({ color: colour + "44" }) : undefined, text: label });
  }, []);

  // ── Map init (once) ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    const imagery = new TileLayer({
      source: new TileArcGISRest({
        url: "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Imagery/MapServer",
        attributions: "Imagery © NSW Spatial Services (CC BY 4.0)",
        crossOrigin: "anonymous",
      }),
    });
    const cadastre = new TileLayer({
      source: new TileArcGISRest({
        url: "https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Cadastre/MapServer",
        params: { TRANSPARENT: true },
        crossOrigin: "anonymous",
      }),
      visible: false,
      opacity: 0.9,
    });
    cadastreRef.current = cadastre;

    const parcelLayer = new VectorLayer({
      source: parcelSourceRef.current,
      style: new Style({
        stroke: new Stroke({ color: "#0369a1", width: 3, lineDash: [8, 6] }),
        fill: new Fill({ color: "rgba(3,105,161,0.08)" }),
      }),
    });

    const vector = new VectorLayer({ source: sourceRef.current, style: styleFor as never });
    const annotationLayer = new VectorLayer({ source: annotationSourceRef.current, style: annStyle as never });
    annotationLayerRef.current = annotationLayer;

    const centre = fromLonLat([project.longitude ?? 151.21, project.latitude ?? -33.87]);
    const map = new Map({
      target: mapEl.current,
      layers: [imagery, cadastre, parcelLayer, vector, annotationLayer],
      controls: defaultControls({ attribution: false, zoom: false }).extend([
        new FullScreen(),
        new Attribution({ collapsible: true }),
      ]),
      view: new View({ center: centre, zoom: 19, maxZoom: 22 }),
    });
    mapRef.current = map;

    if (measureTipRef.current) {
      const ov = new Overlay({ element: measureTipRef.current, offset: [12, 0], positioning: "center-left", stopEvent: false });
      map.addOverlay(ov);
      measureOverlayRef.current = ov;
    }

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

    map.on("singleclick", (e) => {
      if (!placingRef.current) return;
      const [lng, lat] = toLonLat(e.coordinate);
      void setPropertyAt(lat, lng, e.coordinate);
    });

    // Right-click a measurement/markup on the map → rename / delete menu.
    mapEl.current.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      let hit: FeatureLike | undefined;
      map.forEachFeatureAtPixel(map.getEventPixel(ev), (f) => { if (f.get("measurementId")) { hit = f; return true; } return false; }, { hitTolerance: 6 });
      if (hit) {
        const mid = hit.get("measurementId") as string;
        setSelectedMeasurementId(mid);
        setCtxMenu({ x: ev.clientX, y: ev.clientY, id: mid, itemId: (hit.get("itemId") as string) ?? null, kind: hit.get("kind") === "annotation" ? "annotation" : "measurement" });
      } else {
        setCtxMenu(null);
      }
    });

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
        const mpp = res * Math.cos((lat * Math.PI) / 180);
        scaleRef.current.textContent = `1 : ${Math.round((mpp * 96) / 0.0254).toLocaleString("en-AU")}`;
      }
    };
    map.on("moveend", updateStatus);
    updateStatus();

    for (const it of initialItems) {
      for (const m of it.measurements) addFeatureFromMeasurement(it, m);
    }
    for (const a of initialAnnotations) addAnnotationFeature(a);

    return () => { map.setTarget(undefined); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFeatureFromMeasurement(it: Item, m: api.ApiMeasurement, idx?: number) {
    try {
      const g = geojson.readGeometry(m.geometry, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
      const f = new Feature(g);
      f.setId(m.id);
      f.set("measurementId", m.id);
      f.set("itemId", it.id);
      f.set("mtype", it.measurement_type ?? m.measurement_type);
      f.set("qty", m.calculated_quantity);
      if (idx != null) f.set("idx", idx);
      else if ((it.measurement_type ?? m.measurement_type) === "count") f.set("idx", it.measurements.indexOf(m) + 1);
      sourceRef.current.addFeature(f);
    } catch (e) {
      console.error("[measuremap] failed to load measurement geometry", e);
    }
  }

  function addAnnotationFeature(a: Annotation) {
    try {
      const g = geojson.readGeometry(a.geometry, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
      const f = new Feature(g);
      f.setId(a.id);
      f.set("measurementId", a.id);
      f.set("kind", "annotation");
      f.set("annType", a.annotation_type);
      f.set("annName", a.name);
      f.set("annColour", a.colour);
      annotationSourceRef.current.addFeature(f);
    } catch (e) { console.error("[measuremap] failed to load annotation", e); }
  }

  // ── Tool wiring ────────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (drawRef.current) { map.removeInteraction(drawRef.current); drawRef.current = null; }
    if (translateRef.current) { map.removeInteraction(translateRef.current); translateRef.current = null; }
    if (selectRef.current) { map.removeInteraction(selectRef.current); selectRef.current = null; }

    if (tool === "select") {
      const select = new Select({ hitTolerance: 8, style: ((f: FeatureLike) => (f.get("kind") === "annotation" ? annStyle(f) : styleFor(f))) as never });
      select.on("select", (e) => {
        const f = e.selected[0];
        const id = f ? (f.get("measurementId") as string) : null;
        setSelectedMeasurementId(id);
        if (f) {
          const itemId = f.get("itemId") as string;
          if (itemId) setActiveItemId(itemId);
        }
      });
      // Drag a selected measurement to move the whole shape (no vertex handles).
      const translate = new Translate({ features: select.getFeatures() });
      translate.on("translateend", (e) => { e.features.forEach((f) => void persistGeometry(f)); });
      map.addInteraction(select);
      map.addInteraction(translate);
      selectRef.current = select;
      translateRef.current = translate;
      return;
    }

    // Markup (annotation) tools draw into the annotation layer.
    if (tool.startsWith("mk-")) {
      const kind = tool.slice(3) as MarkupKind;
      const dtype: "Point" | "LineString" | "Polygon" | "Circle" =
        kind === "text" ? "Point"
          : kind === "line" || kind === "arrow" ? "LineString"
            : kind === "triangle" ? "Polygon"
              : "Circle";
      const draw = new Draw({
        source: annotationSourceRef.current,
        type: dtype,
        ...(kind === "line" || kind === "arrow" ? { maxPoints: 2 } : {}),
        ...(kind === "rect" || kind === "rectfill" ? { geometryFunction: createBox() } : {}),
      });
      draw.on("drawend", (e) => { void handleAnnotationEnd(kind, e.feature); });
      map.addInteraction(draw);
      drawRef.current = draw;
      return;
    }

    if (tool !== "pan") {
      const mtype = tool as MType;
      const draw = new Draw({
        source: sourceRef.current,
        type: DRAW_TYPE[mtype],
        ...(mtype === "linear" ? { maxPoints: 2 } : {}),
      });
      const tip = measureTipRef.current;
      const ov = measureOverlayRef.current;
      if (mtype !== "count" && tip && ov) {
        draw.on("drawstart", (e) => {
          const g = e.feature.getGeometry();
          if (!g) return;
          g.on("change", () => {
            let text = "", coord: number[] | undefined;
            if (g instanceof Polygon) { text = fmt(getArea(g, { projection: MAP_PROJ }), "area"); coord = g.getInteriorPoint().getCoordinates(); }
            else if (g instanceof LineString) { text = fmt(getLength(g, { projection: MAP_PROJ }), mtype); coord = g.getLastCoordinate(); }
            tip.textContent = text;
            tip.style.display = text ? "block" : "none";
            if (coord) ov.setPosition(coord);
          });
        });
        const hideTip = () => { tip.style.display = "none"; ov.setPosition(undefined); };
        draw.on("drawend", hideTip);
        draw.on("drawabort", hideTip);
      }
      draw.on("drawend", (e) => { void handleDrawEnd(mtype, e.feature); });
      map.addInteraction(draw);
      drawRef.current = draw;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool]);

  // Ensure an item to draw into. A pending (name, colour) from the "new
  // measurement" popup forces a fresh item; otherwise reuse the active item of
  // the same type/category (e.g. continuous count) or fall back to a default.
  async function ensureItem(mtype: MType): Promise<Item | null> {
    const pending = pendingRef.current;
    if (!pending) {
      const active = itemsRef.current.find((i) => i.id === activeItemIdRef.current);
      if (active && active.measurement_type === mtype && (active.category_id ?? null) === (activeCatRef.current ?? null)) return active;
    }
    const n = itemsRef.current.filter((i) => i.measurement_type === mtype).length + 1;
    const name = pending?.name?.trim() || `${TYPE_LABEL[mtype]} ${n}`;
    const colour = pending?.colour ?? COLOURS[itemsRef.current.length % COLOURS.length];
    pendingRef.current = null;
    setNamePopupOpen(false);
    try {
      const created = await api.createItem(project.id, {
        name, measurement_type: mtype, colour, unit: UNIT_FOR[mtype],
        category_id: activeCatRef.current, sort_order: itemsRef.current.length,
      });
      setItems((prev) => [...prev, created]);
      setActiveItemId(created.id);
      return created;
    } catch { setSaveStatus("error"); return null; }
  }

  // Picking a draw tool opens the name/colour chooser for a NEW measurement.
  // Select/Pan just switch mode. The chooser can be closed to draw with defaults.
  function pickTool(t: Tool) {
    setMarkupOpen(false);
    if (t === "select" || t === "pan") { setNamePopupOpen(false); pendingRef.current = null; setTool(t); return; }
    const mtype = t as MType;
    const n = items.filter((i) => i.measurement_type === mtype).length + 1;
    const name = `${TYPE_LABEL[mtype]} ${n}`;
    const colour = COLOURS[items.length % COLOURS.length];
    pendingRef.current = { name, colour };
    setNewName(name);
    setNewColour(colour);
    setNamePopupOpen(true);
    setActiveItemId(null);
    setTool(t);
  }

  async function handleDrawEnd(mtype: MType, feature: Feature<Geometry>) {
    const geom = feature.getGeometry();
    if (!geom) return;
    // Count is continuous: keep dropping points until a double-click (two clicks
    // within 350ms) — the second click is discarded and we return to Select.
    if (mtype === "count") {
      const now = Date.now();
      if (now - lastCountRef.current < 350) {
        sourceRef.current.removeFeature(feature);
        lastCountRef.current = 0;
        setTool("select");
        return;
      }
      lastCountRef.current = now;
    }
    const item = await ensureItem(mtype);
    if (!item) { sourceRef.current.removeFeature(feature); setTool("select"); return; }

    const quantity = computeQuantity(geom, mtype);
    const gj = geojson.writeGeometryObject(geom, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
    const idx = mtype === "count" ? item.measurements.length + 1 : undefined;

    feature.set("itemId", item.id);
    feature.set("mtype", mtype);
    feature.set("qty", quantity);
    if (idx != null) feature.set("idx", idx);

    setSaveStatus("saving");
    try {
      const { id } = await api.createMeasurement(project.id, {
        estimate_item_id: item.id,
        category_id: item.category_id,
        geometry: gj,
        calculated_quantity: quantity,
        unit: item.unit,
        measurement_type: mtype,
        measurement_mode: item.category_id ? "structured" : "free",
        label: idx != null ? String(idx) : null,
        source_type: "map",
        sort_order: item.measurements.length,
      });
      feature.setId(id);
      feature.set("measurementId", id);
      setItems((prev) => prev.map((i) => i.id === item.id
        ? { ...i, measurements: [...i.measurements, { id, estimate_item_id: item.id, category_id: item.category_id, measurement_mode: item.category_id ? "structured" : "free", measurement_type: mtype, source_type: "map", name: null, colour: item.colour, geometry: gj, calculated_quantity: quantity, unit: item.unit, label: idx != null ? String(idx) : null, is_visible: true, sort_order: i.measurements.length }] }
        : i));
      setSelectedMeasurementId(id);
      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      sourceRef.current.removeFeature(feature);
    }
    // Line/area/perimeter finish on double-click → back to Select.
    // Count stays active for continuous placing (double-click finishes it).
    if (mtype !== "count") setTool("select");
  }

  // Visual-only markup — saved as an annotation (no item/category/quantity).
  async function handleAnnotationEnd(kind: MarkupKind, feature: Feature<Geometry>) {
    let geom = feature.getGeometry();
    if (!geom) return;
    if ((kind === "circle" || kind === "circlefill") && geom.getType() === "Circle") {
      const poly = fromCircle(geom as CircleGeom);
      feature.setGeometry(poly);
      geom = poly;
    }
    let name: string | null = null;
    if (kind === "text") {
      const t = window.prompt("Text / comment:");
      if (t == null || !t.trim()) { annotationSourceRef.current.removeFeature(feature); return; }
      name = t.trim();
    }
    const colour = markupColourRef.current;
    feature.set("kind", "annotation");
    feature.set("annType", kind);
    feature.set("annName", name);
    feature.set("annColour", colour);
    const gj = geojson.writeGeometryObject(geom, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
    setSaveStatus("saving");
    try {
      const { id } = await api.createAnnotation(project.id, { annotation_type: kind, name, colour, geometry: gj });
      feature.setId(id);
      feature.set("measurementId", id);
      setSaveStatus("saved");
    } catch { annotationSourceRef.current.removeFeature(feature); setSaveStatus("error"); }
    // Stay in the markup tool for continuous markup (Esc or Select to stop).
  }

  async function persistGeometry(feature: FeatureLike) {
    const id = feature.get("measurementId") as string;
    const gAll = (feature as Feature<Geometry>).getGeometry();
    if (id && feature.get("kind") === "annotation" && gAll) {
      const gj = geojson.writeGeometryObject(gAll, { dataProjection: "EPSG:4326", featureProjection: MAP_PROJ });
      setSaveStatus("saving");
      try { await api.patchMeasurement(project.id, id, { geometry: gj }); setSaveStatus("saved"); } catch { setSaveStatus("error"); }
      return;
    }
    const itemId = feature.get("itemId") as string;
    const it = itemsRef.current.find((i) => i.id === itemId);
    const g = (feature as Feature<Geometry>).getGeometry();
    if (!id || !it || !g) return;
    const mtype = (it.measurement_type ?? "area") as MType;
    const quantity = computeQuantity(g, mtype);
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

  // Remove a measurement/annotation completely: clear the OL select overlay
  // (else the removed feature keeps drawing), remove the feature from its
  // source, delete the record, and drop the parent item if it's now empty.
  const removeById = useCallback(async (id: string) => {
    selectRef.current?.getFeatures().clear();
    let feat = sourceRef.current.getFeatureById(id);
    const isAnnotation = !feat;
    if (feat) sourceRef.current.removeFeature(feat);
    else { feat = annotationSourceRef.current.getFeatureById(id); if (feat) annotationSourceRef.current.removeFeature(feat); }
    const itemId = feat?.get("itemId") as string | undefined;
    if (selMeasRef.current === id) setSelectedMeasurementId(null);
    setSaveStatus("saving");
    try {
      await api.removeMeasurement(project.id, id);
      if (!isAnnotation && itemId) {
        const it = itemsRef.current.find((i) => i.id === itemId);
        const willEmpty = it ? it.measurements.filter((m) => m.id !== id).length === 0 : false;
        setItems((prev) => {
          const mapped = prev.map((i) => i.id === itemId ? { ...i, measurements: i.measurements.filter((m) => m.id !== id) } : i);
          return willEmpty ? mapped.filter((i) => i.id !== itemId) : mapped;
        });
        if (willEmpty) { try { await api.removeItem(project.id, itemId); } catch { /* item cleanup best-effort */ } }
      } else {
        setItems((prev) => prev.map((i) => ({ ...i, measurements: i.measurements.filter((m) => m.id !== id) })));
      }
      setSaveStatus("saved");
    } catch { setSaveStatus("error"); }
  }, [project.id]);

  const deleteSelected = useCallback(() => { const id = selMeasRef.current; if (id) void removeById(id); }, [removeById]);

  async function renameFromCtx() {
    if (!ctxMenu) return;
    if (ctxMenu.kind === "annotation") {
      const f = annotationSourceRef.current.getFeatureById(ctxMenu.id);
      const cur = (f?.get("annName") as string) ?? "";
      const t = window.prompt("Edit text / comment:", cur);
      if (t == null) return;
      const name = t.trim() || null;
      if (f) { f.set("annName", name); annotationSourceRef.current.changed(); }
      try { await api.patchMeasurement(project.id, ctxMenu.id, { name: name ?? "" }); } catch { setSaveStatus("error"); }
    } else if (ctxMenu.itemId) {
      const it = items.find((i) => i.id === ctxMenu.itemId);
      const t = window.prompt("Rename measurement:", it?.name ?? "");
      if (t == null || !t.trim()) return;
      void renameItem(ctxMenu.itemId, t.trim());
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selMeasRef.current) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault(); void deleteSelected();
      }
      if (e.key === "Escape") { drawRef.current?.abortDrawing(); setMenuFor(null); setColourFor(null); setMoveFor(null); setCtxMenu(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteSelected]);

  useEffect(() => { sourceRef.current.changed(); annotationSourceRef.current.changed(); }, [items, showMeasurements, showLabels, selectedMeasurementId]);
  useEffect(() => { cadastreRef.current?.setVisible(showCadastre); }, [showCadastre]);
  useEffect(() => { annotationLayerRef.current?.setVisible(showAnnotations); }, [showAnnotations]);

  // Parcel highlight for the project address.
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
        const ext = g.getExtent();
        if (ext && Number.isFinite(ext[0]) && mapRef.current) {
          mapRef.current.getView().fit(ext, { padding: [90, 90, 90, 90], maxZoom: 20, duration: 400 });
        }
      } catch { /* best-effort */ }
    })();
    return () => { cancelled = true; };
  }, [project.id]);

  function fitToScreen() {
    const map = mapRef.current;
    if (!map) return;
    const ext = sourceRef.current.getExtent();
    if (ext && sourceRef.current.getFeatures().length && Number.isFinite(ext[0])) {
      map.getView().fit(ext, { padding: [60, 60, 60, 60], maxZoom: 21, duration: 250 });
    } else recenter();
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

  function screenshot() {
    const map = mapRef.current;
    if (!map) return;
    map.once("rendercomplete", () => {
      const size = map.getSize();
      if (!size) return;
      const out = document.createElement("canvas");
      out.width = size[0]; out.height = size[1];
      const ctx = out.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#e5e7eb"; ctx.fillRect(0, 0, size[0], size[1]);
      map.getViewport().querySelectorAll<HTMLCanvasElement>(".ol-layer canvas, canvas.ol-layer").forEach((canvas) => {
        if (canvas.width === 0) return;
        const parent = canvas.parentNode as HTMLElement | null;
        const op = parent?.style?.opacity ?? canvas.style.opacity;
        ctx.globalAlpha = op === "" ? 1 : Number(op);
        const tf = canvas.style.transform.match(/^matrix\(([^)]+)\)$/);
        if (tf) { const t = tf[1].split(",").map(Number); ctx.setTransform(t[0], t[1], t[2], t[3], t[4], t[5]); }
        ctx.drawImage(canvas, 0, 0);
      });
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
      try {
        const link = document.createElement("a");
        link.download = "mapmeasure.png"; link.href = out.toDataURL("image/png"); link.click();
      } catch (err) { console.error("[measuremap] screenshot failed:", err); setSaveStatus("error"); }
    });
    map.renderSync();
  }

  function copyCoords() {
    if (coords.lat == null || coords.lng == null) return;
    navigator.clipboard?.writeText(`${coords.lat}, ${coords.lng}`).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  }

  function openStreetView() {
    const url = coords.lat != null && coords.lng != null
      ? `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coords.lat},${coords.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.full_address)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function setPropertyAt(lat: number, lng: number, coordinate: number[]) {
    if (markerFeatureRef.current) markerFeatureRef.current.setGeometry(new Point(coordinate));
    else {
      const mf = new Feature(new Point(coordinate));
      markerFeatureRef.current = mf;
      markerSourceRef.current.addFeature(mf);
    }
    setCoords({ lat, lng });
    setPlacing(false);
    setSaveStatus("saving");
    try {
      const res = await fetch(`/api/measuremap/projects/${project.id}/parcel`, {
        method: "POST", headers: { "Content-Type": "application/json" },
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
        if (ext && Number.isFinite(ext[0]) && mapRef.current) mapRef.current.getView().fit(ext, { padding: [90, 90, 90, 90], maxZoom: 20, duration: 400 });
      } else setParcelInfo(null);
      setSaveStatus("saved");
    } catch { setSaveStatus("error"); }
  }

  // ── Category actions ───────────────────────────────────────────────────────
  async function addCategory(name: string, description: string) {
    if (!name.trim()) return;
    setSaveStatus("saving");
    try {
      const cat = await api.createCategory(project.id, { name, description: description || null });
      setCategories((prev) => [...prev, cat]);
      setActiveCategoryId(cat.id);
      setAddingCategory(false);
      setSaveStatus("saved");
    } catch { setSaveStatus("error"); }
  }

  async function renameCategory(id: string, name: string) {
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, name } : c));
    setRenaming(null);
    try { await api.patchCategory(project.id, id, { name }); } catch { setSaveStatus("error"); }
  }

  async function deleteCategory(id: string) {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    if (!confirm(`Delete category “${cat.name}”? Its items become uncategorised (measurements are kept).`)) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setItems((prev) => prev.map((i) => i.category_id === id ? { ...i, category_id: null } : i));
    if (activeCategoryId === id) setActiveCategoryId(null);
    setMenuFor(null);
    try { await api.removeCategory(project.id, id); } catch { setSaveStatus("error"); }
  }

  // ── Item actions ───────────────────────────────────────────────────────────
  async function renameItem(id: string, name: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, name } : i));
    setRenaming(null);
    try { await api.patchItem(project.id, id, { name }); } catch { setSaveStatus("error"); }
  }

  async function recolourItem(id: string, colour: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, colour } : i));
    setColourFor(null);
    sourceRef.current.changed();
    try { await api.patchItem(project.id, id, { colour }); } catch { setSaveStatus("error"); }
  }

  async function moveItem(id: string, categoryId: string | null) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, category_id: categoryId } : i));
    setMoveFor(null); setMenuFor(null);
    try { await api.patchItem(project.id, id, { category_id: categoryId }); } catch { setSaveStatus("error"); }
  }

  async function toggleItemVisible(it: Item) {
    setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, is_visible: !i.is_visible } : i));
    try { await api.patchItem(project.id, it.id, { is_visible: !it.is_visible }); } catch { /* visual only */ }
  }

  async function deleteItem(it: Item) {
    if (!confirm(`Delete “${it.name}” and its ${it.measurements.length} measurement(s)?`)) return;
    it.measurements.forEach((m) => { const f = sourceRef.current.getFeatureById(m.id); if (f) sourceRef.current.removeFeature(f); });
    setItems((prev) => prev.filter((i) => i.id !== it.id));
    if (activeItemId === it.id) setActiveItemId(null);
    setMenuFor(null);
    try { await api.removeItem(project.id, it.id); } catch { setSaveStatus("error"); }
  }

  async function clearFreeItems() {
    const free = items.filter((i) => !i.category_id);
    if (free.length === 0) return;
    if (!confirm(`Remove all ${free.length} uncategorised (free) measurement(s)?`)) return;
    free.forEach((it) => it.measurements.forEach((m) => { const f = sourceRef.current.getFeatureById(m.id); if (f) sourceRef.current.removeFeature(f); }));
    const ids = new Set(free.map((i) => i.id));
    setItems((prev) => prev.filter((i) => !ids.has(i.id)));
    setMenuFor(null);
    try { await Promise.all(free.map((it) => api.removeItem(project.id, it.id))); } catch { setSaveStatus("error"); }
  }

  function selectItem(it: Item) {
    setActiveItemId(it.id);
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

  const toolBtns = useMemo(() => ([
    { id: "select", label: "Select", Icon: MousePointer2 },
    { id: "pan", label: "Pan", Icon: Move },
    { id: "linear", label: "Distance", Icon: Ruler },
    { id: "perimeter", label: "Perimeter", Icon: Spline },
    { id: "area", label: "Area", Icon: Pentagon },
    { id: "count", label: "Count", Icon: MapPin },
  ] as { id: Tool; label: string; Icon: typeof Ruler }[]), []);

  // Derived groupings for the left panel.
  const q = search.trim().toLowerCase();
  const visibleItems = q ? items.filter((i) => i.name.toLowerCase().includes(q)) : items;
  const measCount = items.reduce((s, i) => s + i.measurements.length, 0);
  const uncategorised = visibleItems.filter((i) => !i.category_id);
  const cursorClass = tool === "pan" ? "cursor-grab active:cursor-grabbing" : tool === "select" ? "cursor-default" : "cursor-crosshair";

  return (
    <div className="flex h-full" onClick={() => { setMenuFor(null); setColourFor(null); setMoveFor(null); setCtxMenu(null); }}>
      {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
      <aside className={`flex shrink-0 flex-col border-r border-[#D7DCE0] bg-white ${showMeasList ? "w-[300px]" : "w-[212px]"}`}>
        {/* Map Layers */}
        <section className="border-b border-[#E2E5E7] px-4 py-3">
          <div className="mb-1 flex items-center gap-2 text-[13px] font-bold text-[#212121]">
            <MapIcon size={16} className="text-[#0369a1]" /> Aerial View
            <span className="ml-auto rounded bg-[#EAF3FA] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#0369a1]">On</span>
          </div>
          <div className="mt-2 space-y-0.5">
            <LayerToggle label="Site Details" Icon={MapPin} checked={showSiteDetails} onToggle={() => setShowSiteDetails((v) => !v)} />
            <LayerToggle label="Measurement List" Icon={List} checked={showMeasList} onToggle={() => setShowMeasList((v) => !v)} />
            <LayerToggle label="Measurements" Icon={Eye} checked={showMeasurements} onToggle={() => setShowMeasurements((v) => !v)} />
            <LayerToggle label="Markup" Icon={Shapes} checked={showAnnotations} onToggle={() => setShowAnnotations((v) => !v)} />
            <LayerToggle label="Labels" Icon={Ruler} checked={showLabels} onToggle={() => setShowLabels((v) => !v)} />
            <LayerToggle label="Property Boundaries" Icon={Layers} checked={showCadastre} onToggle={() => setShowCadastre((v) => !v)} />
          </div>
        </section>

        {showMeasList && (<>
        {/* Measurements / categories */}
        <div className="flex items-center justify-between px-4 pt-3">
          <h2 className="text-[12px] font-semibold uppercase tracking-wide text-[#383E42]">Measurements</h2>
          <span className="text-[10px] text-[#8A9196]">{measCount} total</span>
        </div>

        <div className="px-4 pt-3">
          <button
            onClick={() => setAddingCategory((v) => !v)}
            className="flex h-9 w-full items-center justify-center gap-2 rounded bg-[#0369a1] text-[13px] font-semibold text-white transition hover:bg-[#075985]"
          >
            <FolderPlus size={16} /> Add Category
          </button>
          {addingCategory && <AddCategoryForm onAdd={addCategory} onCancel={() => setAddingCategory(false)} />}

          <div className="mt-3 flex h-9 items-center rounded border border-[#D7DCE0] px-3">
            <Search size={15} className="mr-2 text-[#747B80]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent text-[12px] outline-none" placeholder="Search measurements" />
          </div>
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto px-3 pb-4">
          {categories.length === 0 && items.length === 0 && (
            <p className="px-1 py-6 text-center text-[12px] text-[#8A9196]">
              No measurements yet. Add a category to file work, or just pick a tool and measure freely.
            </p>
          )}

          {categories.map((cat) => (
            <CategoryGroup
              key={cat.id}
              category={cat}
              items={visibleItems.filter((i) => i.category_id === cat.id)}
              active={activeCategoryId === cat.id}
              activeItemId={activeItemId}
              renaming={renaming}
              menuFor={menuFor}
              colourFor={colourFor}
              moveFor={moveFor}
              categories={categories}
              onSetActive={() => setActiveCategoryId(activeCategoryId === cat.id ? null : cat.id)}
              onStartRename={(kind, id) => setRenaming({ kind, id })}
              onRenameCategory={renameCategory}
              onRenameItem={renameItem}
              onOpenMenu={(kind, id) => setMenuFor({ kind, id })}
              onDeleteCategory={deleteCategory}
              onDeleteItem={deleteItem}
              onOpenColour={setColourFor}
              onRecolour={recolourItem}
              onOpenMove={setMoveFor}
              onMoveItem={moveItem}
              onToggleVisible={toggleItemVisible}
              onSelectItem={selectItem}
            />
          ))}

          {/* Uncategorised / free */}
          {uncategorised.length > 0 && (
            <CategoryGroup
              category={{ id: "__free__", name: "Uncategorised (free)", description: null, sort_order: 999 }}
              items={uncategorised}
              active={activeCategoryId === null}
              activeItemId={activeItemId}
              renaming={renaming}
              menuFor={menuFor}
              colourFor={colourFor}
              moveFor={moveFor}
              categories={categories}
              isFree
              onSetActive={() => setActiveCategoryId(null)}
              onClearFree={clearFreeItems}
              onStartRename={(kind, id) => setRenaming({ kind, id })}
              onRenameCategory={renameCategory}
              onRenameItem={renameItem}
              onOpenMenu={(kind, id) => setMenuFor({ kind, id })}
              onDeleteCategory={() => {}}
              onDeleteItem={deleteItem}
              onOpenColour={setColourFor}
              onRecolour={recolourItem}
              onOpenMove={setMoveFor}
              onMoveItem={moveItem}
              onToggleVisible={toggleItemVisible}
              onSelectItem={selectItem}
            />
          )}
        </div>

        {/* Active-context footer */}
        <div className="border-t border-[#E1E5E7] px-4 py-2.5 text-[11px]">
          {activeCategoryId
            ? <span className="flex items-center gap-1.5 text-[#0369a1]"><Check size={13} /> Measuring into <b className="font-semibold">{categories.find((c) => c.id === activeCategoryId)?.name}</b></span>
            : <span className="text-[#8A9196]">Measuring freely — pick a category above to file measurements.</span>}
        </div>
        </>)}
      </aside>

      {/* ── CENTRE: toolbar + map ─────────────────────────────────────────── */}
      <section className="relative min-w-0 flex-1 overflow-hidden bg-[#0c2b3f]">
        <div className="absolute left-4 top-4 z-20 flex h-[52px] items-stretch rounded-md border border-white/15 bg-[#082f49]/95 p-1 shadow-xl backdrop-blur">
          {toolBtns.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => pickTool(id)} title={label}
              className={["flex w-[54px] flex-col items-center justify-center gap-0.5 rounded text-[9px] text-white transition", tool === id ? "bg-[#0369a1]" : "hover:bg-white/10"].join(" ")}>
              <Icon size={17} /><span>{label}</span>
            </button>
          ))}
          <div className="mx-1 w-px bg-white/15" />
          <TB label="Fit" Icon={Maximize2} onClick={fitToScreen} />
          <TB label="Export" Icon={Camera} onClick={screenshot} />
          <div className="mx-1 w-px bg-white/15" />
          <button
            onClick={() => { setNamePopupOpen(false); setMarkupOpen((v) => { const nv = !v; if (!nv) setTool("select"); return nv; }); }}
            title="Markup (visual annotations)"
            className={["flex w-[54px] flex-col items-center justify-center gap-0.5 rounded text-[9px] text-white transition", markupOpen ? "bg-[#0369a1]" : "hover:bg-white/10"].join(" ")}
          >
            <Shapes size={17} /><span>Markup</span>
          </button>
        </div>

        {/* Markup palette — visual annotations, nothing to do with measurements */}
        {markupOpen && (
          <div className="absolute left-4 top-[64px] z-30 w-[214px] rounded-md border border-[#D5DADD] bg-white p-2.5 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#383E42]">Markup</span>
              <button onClick={() => { setMarkupOpen(false); setTool("select"); }} className="grid h-5 w-5 place-items-center rounded text-[#8A9196] hover:bg-[#F1F3F4]"><X size={13} /></button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {MARKUP_TOOLS.map(({ id, label, Icon }) => {
                const active = tool === id;
                const isFill = id.endsWith("fill");
                return (
                  <button key={id} onClick={() => { setNamePopupOpen(false); setTool(id); }} title={label}
                    className={["flex h-[46px] flex-col items-center justify-center gap-0.5 rounded text-[8px]", active ? "bg-[#0369a1] text-white" : "text-[#30363A] hover:bg-[#F1F3F4]"].join(" ")}>
                    <Icon size={16} fill={isFill ? "currentColor" : "none"} />
                    <span className="leading-none">{label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-[#EEF0F1] pt-2">
              <span className="mr-0.5 text-[10px] text-[#586066]">Colour</span>
              {COLOURS.map((c) => (
                <button key={c} onClick={() => setMarkupColour(c)} className={`h-5 w-5 rounded-full border-2 ${markupColour === c ? "border-[#212121]" : "border-transparent"}`} style={{ backgroundColor: c }} aria-label={c} />
              ))}
            </div>
            <p className="mt-2 text-[10px] leading-tight text-[#8A9196]">Pick a shape and draw on the map. Text prompts for a comment. Esc or Select to stop. Visual only — never counted.</p>
          </div>
        )}

        {/* New-measurement name + colour chooser (near the toolbar) */}
        {namePopupOpen && tool !== "select" && tool !== "pan" && (
          <div className="absolute left-1/2 top-[72px] z-30 w-[280px] -translate-x-1/2 rounded-md border border-[#7dd3fc] bg-white p-3 shadow-lg">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#383E42]">New {TYPE_LABEL[tool as MType]} measurement</span>
              <button onClick={() => setNamePopupOpen(false)} className="grid h-5 w-5 place-items-center rounded text-[#8A9196] hover:bg-[#F1F3F4]"><X size={13} /></button>
            </div>
            <input autoFocus value={newName}
              onChange={(e) => { setNewName(e.target.value); if (pendingRef.current) pendingRef.current.name = e.target.value; }}
              onKeyDown={(e) => { if (e.key === "Enter") setNamePopupOpen(false); }}
              placeholder="Measurement name"
              className="w-full rounded border border-[#D3D9DD] px-2 py-1.5 text-[12px] outline-none focus:border-[#0369a1]" />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {COLOURS.map((c) => (
                <button key={c} onClick={() => { setNewColour(c); if (pendingRef.current) pendingRef.current.colour = c; }}
                  className={`h-6 w-6 rounded-full border-2 ${newColour === c ? "border-[#212121]" : "border-transparent"}`} style={{ backgroundColor: c }} aria-label={c} />
              ))}
            </div>
            <button onClick={() => setNamePopupOpen(false)} className="mt-3 h-8 w-full rounded bg-[#0369a1] text-[12px] font-semibold text-white hover:bg-[#075985]">Start measuring</button>
            <p className="mt-1.5 text-center text-[10px] text-[#8A9196]">Or just start drawing — close to use defaults.</p>
          </div>
        )}

        {/* Compact address card (moved left to clear the top-right map control) */}
        {showSiteDetails && (
        <div className="absolute right-14 top-3 z-20 w-[224px] overflow-hidden rounded-md border border-[#D5DADD] bg-white shadow-lg">
          <div className="flex items-start gap-2 px-3 py-2">
            <MapPin size={15} className="mt-0.5 shrink-0 text-[#0369a1]" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] leading-snug text-[#212121]">{project.full_address}</p>
              {parcelInfo?.lotId && (
                <p className="mt-0.5 text-[11px] text-[#5D6469]">Lot/DP <span className="font-semibold text-[#0c4a6e]">{parcelInfo.lotId}</span></p>
              )}
            </div>
            <button onClick={() => setShowSiteDetails(false)} className="grid h-5 w-5 shrink-0 place-items-center rounded text-[#8A9196] hover:bg-[#F1F3F4]" title="Hide (re-open via Site Details)"><X size={13} /></button>
          </div>
          <div className="grid grid-cols-3 border-t border-[#E2E5E7] text-[#586066]">
            <button onClick={recenter} className="flex h-8 items-center justify-center gap-1 text-[10px] hover:bg-[#F4F5F6]" title="Re-centre"><Crosshair size={12} /> Centre</button>
            <button onClick={openStreetView} className="flex h-8 items-center justify-center gap-1 border-l border-[#E2E5E7] text-[10px] hover:bg-[#F4F5F6]" title="Street View"><Eye size={12} /> Street</button>
            <button onClick={copyCoords} className="flex h-8 items-center justify-center gap-1 border-l border-[#E2E5E7] text-[10px] hover:bg-[#F4F5F6]" title="Copy coordinates">{copied ? <Check size={12} className="text-[#0369a1]" /> : <Copy size={12} />} Copy</button>
          </div>
          <button onClick={() => { if (!placing) setTool("select"); setPlacing((v) => !v); }}
            className={["flex h-7 w-full items-center justify-center gap-1 border-t border-[#E2E5E7] text-[10px] font-medium", placing ? "bg-[#0369a1] text-white" : "text-[#586066] hover:bg-[#F4F5F6]"].join(" ")}>
            <MapPin size={11} /> {placing ? "Click the map…" : "Set / correct pin"}
          </button>
        </div>
        )}

        {placing && (
          <div className="absolute left-1/2 top-[72px] z-30 -translate-x-1/2 rounded-md bg-[#0369a1] px-3 py-1.5 text-[12px] font-semibold text-white shadow-lg">
            Click your property on the map to set it
          </div>
        )}

        {/* Zoom */}
        <div className="absolute bottom-[54px] right-4 z-20 flex flex-col overflow-hidden rounded border border-white/20 bg-[#082f49]/90 text-white shadow-lg">
          <button onClick={() => zoomBy(1)} className="grid h-9 w-9 place-items-center border-b border-white/15 hover:bg-white/10" aria-label="Zoom in"><Plus size={17} /></button>
          <button onClick={() => zoomBy(-1)} className="grid h-9 w-9 place-items-center hover:bg-white/10" aria-label="Zoom out">−</button>
        </div>

        {/* North indicator */}
        <div className="absolute bottom-[58px] left-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-[#082f49]/90 text-white shadow-lg">
          <div className="flex flex-col items-center leading-none">
            <span className="text-[13px]">▲</span>
            <span className="text-[9px] font-bold">N</span>
          </div>
        </div>

        {/* Save status */}
        <div className="absolute bottom-[54px] left-[68px] z-20 rounded bg-white/90 px-2 py-1 text-[11px] shadow-sm">
          {saveStatus === "saving" && <span className="flex items-center gap-1 text-[#586066]"><Loader2 className="h-3 w-3 animate-spin" /> Saving…</span>}
          {saveStatus === "saved" && <span className="flex items-center gap-1 text-[#0369a1]"><Check className="h-3 w-3" /> Saved</span>}
          {saveStatus === "error" && <span className="text-[#dc2626]">Save failed — retry</span>}
          {saveStatus === "idle" && <span className="text-[#8A9196]">Ready</span>}
        </div>

        <div ref={measureTipRef} style={{ display: "none" }} className="pointer-events-none whitespace-nowrap rounded bg-[#082f49] px-1.5 py-0.5 text-[12px] font-semibold text-white shadow" />

        <div ref={mapEl} className={`h-full w-full bg-[#0c2b3f] ${cursorClass}`} />

        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[42px] items-center bg-[#082f49]/95 px-5 text-[11px] text-white/90 backdrop-blur">
          <span>Scale <span ref={scaleRef} className="font-medium text-white">—</span></span>
          <span className="mx-4 h-4 w-px bg-white/20" />
          <span>Zoom <span ref={zoomRef} className="font-medium text-white">—</span></span>
          <span className="mx-4 h-4 w-px bg-white/20" />
          <span className="hidden sm:inline">Cursor <span ref={cursorRef} className="font-medium text-white">—</span></span>
          <span className="ml-auto">Measurements: <span className="font-medium text-white">{measCount}</span></span>
        </div>
      </section>

      {/* Right-click context menu (rename / delete) */}
      {ctxMenu && (
        <div style={{ left: ctxMenu.x, top: ctxMenu.y }} onClick={(e) => e.stopPropagation()}
          className="fixed z-50 w-[160px] overflow-hidden rounded-md border border-[#D7DCE0] bg-white py-1 shadow-lg">
          <MenuItem Icon={Pencil} label={ctxMenu.kind === "annotation" ? "Edit text" : "Rename"} onClick={() => { void renameFromCtx(); setCtxMenu(null); }} />
          <MenuItem Icon={Trash2} label="Delete" danger onClick={() => { void removeById(ctxMenu.id); setCtxMenu(null); }} />
        </div>
      )}
    </div>
  );
}

function TB({ label, Icon, onClick }: { label: string; Icon: typeof Ruler; onClick: () => void }) {
  return (
    <button onClick={onClick} title={label} className="flex w-[54px] flex-col items-center justify-center gap-0.5 rounded text-[9px] text-white transition hover:bg-white/10">
      <Icon size={17} /><span>{label}</span>
    </button>
  );
}

function LayerToggle({ label, Icon, checked, onToggle }: { label: string; Icon: typeof Ruler; checked: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex h-8 w-full items-center text-[12px] text-[#30363A]">
      <Icon size={15} className="mr-2.5 text-[#586066]" /><span>{label}</span>
      <span className={["ml-auto grid h-[17px] w-[17px] place-items-center rounded border", checked ? "border-[#0369a1] bg-[#0369a1] text-white" : "border-[#AEB5BA] bg-white"].join(" ")}>
        {checked && <Check size={11} strokeWidth={3} />}
      </span>
    </button>
  );
}

function AddCategoryForm({ onAdd, onCancel }: { onAdd: (name: string, description: string) => void; onCancel: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className="mt-2 rounded-md border border-[#D7DCE0] bg-[#F7F9FB] p-3">
      <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name (e.g. Demolition)"
        onKeyDown={(e) => { if (e.key === "Enter") onAdd(name, desc); }}
        className="w-full rounded border border-[#D3D9DD] px-2 py-1.5 text-[12px] outline-none focus:border-[#0369a1]" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe this section (optional)"
        className="mt-2 h-[52px] w-full resize-none rounded border border-[#D3D9DD] px-2 py-1.5 text-[11px] outline-none focus:border-[#0369a1]" />
      <div className="mt-2 flex gap-2">
        <button onClick={() => onAdd(name, desc)} className="flex-1 rounded bg-[#0369a1] px-2 py-1.5 text-[12px] font-semibold text-white hover:bg-[#075985]">Add category</button>
        <button onClick={onCancel} className="rounded px-2 py-1.5 text-[12px] font-medium text-[#586066] hover:text-[#212121]">Cancel</button>
      </div>
    </div>
  );
}

type GroupProps = {
  category: Category;
  items: Item[];
  active: boolean;
  activeItemId: string | null;
  renaming: { kind: "item" | "category"; id: string } | null;
  menuFor: { kind: "item" | "category"; id: string } | null;
  colourFor: string | null;
  moveFor: string | null;
  categories: Category[];
  isFree?: boolean;
  onSetActive: () => void;
  onStartRename: (kind: "item" | "category", id: string) => void;
  onRenameCategory: (id: string, name: string) => void;
  onRenameItem: (id: string, name: string) => void;
  onOpenMenu: (kind: "item" | "category", id: string) => void;
  onDeleteCategory: (id: string) => void;
  onDeleteItem: (it: Item) => void;
  onOpenColour: (id: string | null) => void;
  onRecolour: (id: string, colour: string) => void;
  onOpenMove: (id: string | null) => void;
  onMoveItem: (id: string, categoryId: string | null) => void;
  onToggleVisible: (it: Item) => void;
  onSelectItem: (it: Item) => void;
  onClearFree?: () => void;
};

function CategoryGroup(p: GroupProps) {
  const [open, setOpen] = useState(true);
  const { category: cat, items, active, isFree } = p;
  const catTotal = items.length;

  return (
    <section className="mb-1">
      <div
        onClick={p.onSetActive}
        className={["group flex items-center gap-1.5 rounded px-2 py-1.5 text-left transition", active ? "bg-[#EAF3FA]" : "hover:bg-[#F5F6F7]"].join(" ")}
      >
        <button onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }} className="text-[#8A9196] hover:text-[#30363A]">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {p.renaming?.kind === "category" && p.renaming.id === cat.id ? (
          <input autoFocus defaultValue={cat.name} onClick={(e) => e.stopPropagation()}
            onBlur={(e) => p.onRenameCategory(cat.id, e.target.value.trim() || cat.name)}
            onKeyDown={(e) => { if (e.key === "Enter") p.onRenameCategory(cat.id, (e.target as HTMLInputElement).value.trim() || cat.name); }}
            className="min-w-0 flex-1 rounded border border-[#0369a1] px-1 py-0.5 text-[12px] outline-none" />
        ) : (
          <span
            onDoubleClick={(e) => { if (isFree) return; e.stopPropagation(); p.onStartRename("category", cat.id); }}
            className={["min-w-0 flex-1 truncate text-[12px] font-semibold", active ? "text-[#0c4a6e]" : "text-[#30363A]"].join(" ")}
          >
            {cat.name}
          </span>
        )}
        {active && <span className="rounded bg-[#0369a1] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">Active</span>}
        <span className="rounded bg-[#ECEFF1] px-1.5 py-0.5 text-[9px] text-[#5D656A]">{catTotal}</span>
        {isFree && catTotal > 0 && (
          <button onClick={(e) => { e.stopPropagation(); p.onClearFree?.(); }} title="Remove all free measurements"
            className="grid h-6 w-6 place-items-center rounded text-[#8A9196] opacity-0 transition hover:bg-[#E8EBED] hover:text-[#dc2626] group-hover:opacity-100">
            <Trash2 size={13} />
          </button>
        )}
        {!isFree && (
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); p.onOpenMenu("category", cat.id); }} className="grid h-6 w-6 place-items-center rounded text-[#8A9196] opacity-0 transition hover:bg-[#E8EBED] group-hover:opacity-100">
              <MoreVertical size={13} />
            </button>
            {p.menuFor?.kind === "category" && p.menuFor.id === cat.id && (
              <Menu onClick={(e) => e.stopPropagation()}>
                <MenuItem Icon={Pencil} label="Rename" onClick={() => p.onStartRename("category", cat.id)} />
                <MenuItem Icon={Trash2} label="Delete category" danger onClick={() => p.onDeleteCategory(cat.id)} />
              </Menu>
            )}
          </div>
        )}
      </div>

      {open && (
        <div className="ml-4 border-l border-[#EAECEE] pl-1">
          {items.length === 0 && <p className="px-2 py-1.5 text-[10px] text-[#A2A8AC]">No measurements yet.</p>}
          {items.map((it) => (
            <ItemRow key={it.id} it={it} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function ItemRow({ it, p }: { it: Item; p: GroupProps }) {
  const isActive = p.activeItemId === it.id;
  return (
    <div
      onClick={() => p.onSelectItem(it)}
      onContextMenu={(e) => { e.preventDefault(); p.onOpenMenu("item", it.id); }}
      className={["group relative grid grid-cols-[14px_minmax(0,1fr)_auto_22px_22px] items-center gap-1.5 rounded px-1 py-1 text-left transition", isActive ? "bg-[#EAF3FA]" : "hover:bg-[#F5F6F7]"].join(" ")}
    >
      {/* colour swatch → picker */}
      <div className="relative">
        <button onClick={(e) => { e.stopPropagation(); p.onOpenColour(p.colourFor === it.id ? null : it.id); }} title="Change colour"
          className="h-[11px] w-[11px] rounded-sm ring-1 ring-black/10" style={{ backgroundColor: it.colour }} />
        {p.colourFor === it.id && (
          <div onClick={(e) => e.stopPropagation()} className="absolute left-0 top-5 z-30 flex w-[132px] flex-wrap gap-1 rounded-md border border-[#D7DCE0] bg-white p-2 shadow-lg">
            {COLOURS.map((c) => (
              <button key={c} onClick={() => p.onRecolour(it.id, c)} className={`h-5 w-5 rounded-full border-2 ${it.colour === c ? "border-[#212121]" : "border-transparent"}`} style={{ backgroundColor: c }} aria-label={c} />
            ))}
          </div>
        )}
      </div>

      {p.renaming?.kind === "item" && p.renaming.id === it.id ? (
        <input autoFocus defaultValue={it.name} onClick={(e) => e.stopPropagation()}
          onBlur={(e) => p.onRenameItem(it.id, e.target.value.trim() || it.name)}
          onKeyDown={(e) => { if (e.key === "Enter") p.onRenameItem(it.id, (e.target as HTMLInputElement).value.trim() || it.name); }}
          className="col-span-1 min-w-0 rounded border border-[#0369a1] px-1 py-0.5 text-[12px] outline-none" />
      ) : (
        <span onDoubleClick={(e) => { e.stopPropagation(); p.onStartRename("item", it.id); }}
          className={`min-w-0 truncate text-[12px] ${isActive ? "font-semibold text-[#0c4a6e]" : "text-[#30363A]"}`}>{it.name}</span>
      )}

      <span className="whitespace-nowrap text-right text-[10px] text-[#586066]">{uiQty(it)}</span>

      <button onClick={(e) => { e.stopPropagation(); p.onToggleVisible(it); }} className="grid h-6 w-6 place-items-center rounded text-[#586066] hover:bg-[#E8EBED]" title="Toggle visibility">
        {it.is_visible ? <Eye size={13} /> : <EyeOff size={13} />}
      </button>

      <div className="relative">
        <button onClick={(e) => { e.stopPropagation(); p.onOpenMenu("item", it.id); }} className="grid h-6 w-6 place-items-center rounded text-[#8A9196] opacity-0 transition hover:bg-[#E8EBED] group-hover:opacity-100">
          <MoreVertical size={13} />
        </button>
        {p.menuFor?.kind === "item" && p.menuFor.id === it.id && (
          <Menu onClick={(e) => e.stopPropagation()}>
            <MenuItem Icon={Pencil} label="Rename" onClick={() => p.onStartRename("item", it.id)} />
            <MenuItem Icon={Palette} label="Change colour" onClick={() => p.onOpenColour(it.id)} />
            <MenuItem Icon={FolderInput} label="Move to category" onClick={() => p.onOpenMove(p.moveFor === it.id ? null : it.id)} />
            {p.moveFor === it.id && (
              <div className="border-t border-[#EEF0F1] py-1">
                {p.categories.map((c) => (
                  <button key={c.id} onClick={() => p.onMoveItem(it.id, c.id)} className="block w-full truncate px-3 py-1 text-left text-[11px] text-[#30363A] hover:bg-[#F5F6F7]">{c.name}</button>
                ))}
                <button onClick={() => p.onMoveItem(it.id, null)} className="block w-full px-3 py-1 text-left text-[11px] text-[#586066] hover:bg-[#F5F6F7]">Uncategorised</button>
              </div>
            )}
            <MenuItem Icon={Trash2} label="Delete" danger onClick={() => p.onDeleteItem(it)} />
          </Menu>
        )}
      </div>
    </div>
  );
}

function Menu({ children, onClick }: { children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <div onClick={onClick} className="absolute right-0 top-6 z-40 w-[170px] overflow-hidden rounded-md border border-[#D7DCE0] bg-white py-1 shadow-lg">
      {children}
    </div>
  );
}

function MenuItem({ Icon, label, onClick, danger }: { Icon: typeof Ruler; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] hover:bg-[#F5F6F7] ${danger ? "text-[#dc2626]" : "text-[#30363A]"}`}>
      <Icon size={13} /> {label}
    </button>
  );
}
