"use client";

// On-plan takeoff — OpenLayers in a pixel projection over the plan image.
// PDFs are rasterised with pdf.js. Scale (pixels-per-metre) is calibrated via a
// dialog + traced dimension; measurements convert to real units and save into
// the shared estimating model (source_type='drawing'). The left panel mirrors
// Map Measure: categories, active category, name/colour on new measurement.
import { useCallback, useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Map from "ol/Map";
import View from "ol/View";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";
import Projection from "ol/proj/Projection";
import { getCenter, createEmpty, extend as extendExtent, isEmpty as extentIsEmpty } from "ol/extent";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import type Geometry from "ol/geom/Geometry";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import { Draw, Select, Modify, Translate, Snap, DragPan, DragBox, defaults as defaultInteractions } from "ol/interaction";
import { Style, Stroke, Fill, Circle as CircleStyle, Text as TextStyle, Icon } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import { defaults as defaultControls } from "ol/control";
import type { FeatureLike } from "ol/Feature";
import "ol/ol.css";
import {
  MousePointer2, Move, ArrowLeftRight, Pentagon, Spline, MapPin, PencilRuler, Trash2, Eye, EyeOff, Loader2, Check,
  Maximize2, ZoomIn, ZoomOut, RotateCw, Undo2, Redo2, FolderPlus, ChevronDown, ChevronRight, X, MoreVertical, Pencil, Copy, PanelLeftClose, PanelLeftOpen, GripVertical,
} from "lucide-react";
import * as api from "../map/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

type MType = "area" | "linear" | "perimeter" | "count";
type Tool = "select" | "pan" | "scale" | "dimension" | "area" | "linear" | "count";
type Item = api.ApiItem;
type Category = api.ApiCategory;
type Drawing = { id: string; filename: string; mime_type: string | null; url: string | null };
type Page = { id: string; page_number: number; pixels_per_metre: number | null; scale_status: string };
type Snapshot = { measurementId: string; itemId: string; gj: unknown; qty: number; unit: string; mtype: MType; idx?: number };

const geojson = new GeoJSON();
const COLOURS = ["#0369a1", "#7c3aed", "#dc2626", "#0f7a4d", "#b45309", "#0891b2", "#db2777", "#4f46e5", "#65a30d", "#334155"];
// PDFs are rasterised at this scale (must match loadImage's getViewport scale).
const RASTER_SCALE = 2;
const PX_PER_MM = (RASTER_SCALE * 72) / 25.4; // ~5.67 px per paper-mm on the rasterised page
const TYPE_LABEL: Record<MType, string> = { area: "Area", linear: "Distance", perimeter: "Linear", count: "Count" };
const UNIT_FOR: Record<MType, string> = { area: "m2", linear: "m", perimeter: "m", count: "ea" };
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
function orthoPoint(a: number[], b: number[]): number[] {
  return Math.abs(b[0] - a[0]) >= Math.abs(b[1] - a[1]) ? [b[0], a[1]] : [a[0], b[1]];
}

// AutoCAD-style object snap for raster plans: detect endpoints, corners and
// intersections in the dark linework and return them as OpenLayers coordinates
// (y-up, so image row `r` → y = h - r). Snap then latches the cursor onto these.
function detectCorners(data: ImageData): number[][] {
  const w = data.width, h = data.height, px = data.data;
  const dark = (x: number, y: number) => { const i = (y * w + x) * 4; if (px[i + 3] < 40) return false; return px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114 < 150; };
  const N = 24, R = 4, TWO_PI = Math.PI * 2;
  const cos: number[] = [], sin: number[] = [];
  for (let k = 0; k < N; k++) { const a = (TWO_PI * k) / N; cos.push(Math.round(Math.cos(a) * R)); sin.push(Math.round(Math.sin(a) * R)); }
  const cell = 8, cols = Math.ceil(w / cell);
  const best = new globalThis.Map<number, { x: number; y: number; s: number }>();
  const hits: boolean[] = new Array(N);
  for (let y = R + 1; y < h - R - 1; y += 2) {
    for (let x = R + 1; x < w - R - 1; x += 2) {
      if (!dark(x, y)) continue;
      let cnt = 0;
      for (let k = 0; k < N; k++) { const ok = dark(x + cos[k], y + sin[k]); hits[k] = ok; if (ok) cnt++; }
      if (cnt === 0 || cnt >= N * 0.6) continue; // isolated speck or solid fill
      let arcs = 0; const centers: number[] = [];
      for (let k = 0; k < N; k++) {
        if (hits[k] && !hits[(k + N - 1) % N]) {
          arcs++; let len = 0, sum = 0, kk = k;
          while (hits[kk % N] && len <= N) { sum += kk; len++; kk++; }
          centers.push(((sum / len) % N) * (TWO_PI / N));
        }
      }
      if (arcs === 0) continue;
      if (arcs === 2) { let d = Math.abs(centers[0] - centers[1]); if (d > Math.PI) d = TWO_PI - d; if (Math.abs(d - Math.PI) < 0.44) continue; } // ~straight line → not a corner
      const score = arcs >= 3 ? 3 : arcs === 2 ? 2 : 1; // junction > corner > endpoint
      const b = Math.floor(y / cell) * cols + Math.floor(x / cell);
      const cur = best.get(b);
      if (!cur || score > cur.s) best.set(b, { x, y, s: score });
    }
  }
  const out: number[][] = [];
  best.forEach((p) => out.push([p.x, h - p.y]));
  return out;
}
function arrowStyle(colour: string, coord: number[], rotation: number): Style {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'><path d='M8 3 L14 9 L8 15' fill='none' stroke='${colour}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
  return new Style({ geometry: new Point(coord), image: new Icon({ src: "data:image/svg+xml;utf8," + encodeURIComponent(svg), anchor: [0.8, 0.5], rotateWithView: true, rotation: -rotation }) });
}

async function loadImage(d: Drawing, pageNumber: number): Promise<{ url: string; width: number; height: number; data?: ImageData } | null> {
  if (!d.url) return null;
  const isPdf = (d.mime_type ?? "").includes("pdf") || /\.pdf$/i.test(d.filename);
  if (isPdf) {
    const pdf = await pdfjsLib.getDocument({ url: d.url }).promise;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    await page.render({ canvasContext: ctx, viewport }).promise;
    let data: ImageData | undefined;
    try { data = ctx.getImageData(0, 0, canvas.width, canvas.height); } catch { /* skip snap */ }
    return { url: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height, data };
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let data: ImageData | undefined;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) { ctx.drawImage(img, 0, 0); data = ctx.getImageData(0, 0, canvas.width, canvas.height); }
      } catch { /* cross-origin taint → snap to takeoffs only */ }
      resolve({ url: d.url as string, width: img.naturalWidth, height: img.naturalHeight, data });
    };
    img.onerror = () => resolve(null);
    img.src = d.url as string;
  });
}

export default function PlanTakeoff({ projectId, drawing, page }: { projectId: string; drawing: Drawing; page: Page }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const sourceRef = useRef<VectorSource>(new VectorSource());
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const drawRef = useRef<Draw | null>(null);
  const selectRef = useRef<Select | null>(null);
  const modifyRef = useRef<Modify | null>(null);
  const translateRef = useRef<Translate | null>(null);
  const dragBoxRef = useRef<DragBox | null>(null);
  const panRef = useRef<DragPan | null>(null);
  const selectedIdsRef = useRef<Set<string>>(new Set());
  const deleteSelectedRef = useRef<(id?: string) => void>(() => {});
  const ppmRef = useRef<number | null>(page.pixels_per_metre ?? null);
  const undoRef = useRef<Snapshot[]>([]);
  const redoRef = useRef<Snapshot[]>([]);
  const imageExtentRef = useRef<number[]>([0, 0, 1000, 1000]);
  const pendingRef = useRef<{ name: string; colour: string } | null>(null);
  const pendingScaleRef = useRef<number | null>(null); // real metres for the next scale line
  const snapRef = useRef<Snap | null>(null);
  const cornerSnapRef = useRef<Snap | null>(null);
  const cornerSourceRef = useRef<VectorSource>(new VectorSource());
  const orthoRef = useRef(false);
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const hBarRef = useRef<HTMLDivElement>(null); // bottom scrollbar thumb
  const vBarRef = useRef<HTMLDivElement>(null); // right scrollbar thumb
  const [snapOn, setSnapOn] = useState(true);
  const [orthoOn, setOrthoOn] = useState(false);
  const [showMeas, setShowMeas] = useState(true);
  orthoRef.current = orthoOn;

  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>("select");
  const [ppm, setPpm] = useState<number | null>(page.pixels_per_metre ?? null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [catCollapsed, setCatCollapsed] = useState(false);
  const [catW, setCatW] = useState(300);
  const [namePopupOpen, setNamePopupOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColour, setNewColour] = useState(COLOURS[0]);
  const [pendingType, setPendingType] = useState<"dimension" | "area" | "linear" | "count" | null>(null);
  const [scaleOpen, setScaleOpen] = useState(false);
  const [scaleValue, setScaleValue] = useState("");
  const [scaleUnit, setScaleUnit] = useState<"m" | "cm" | "mm">("m");
  const [colourFor, setColourFor] = useState<string | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);

  function startPopupDrag(e: React.MouseEvent) {
    e.preventDefault();
    const parent = (e.currentTarget as HTMLElement).closest("section")?.getBoundingClientRect();
    const base = popupPos ?? { x: parent ? parent.width - 296 : 12, y: 12 };
    const startX = e.clientX, startY = e.clientY;
    const onMove = (ev: MouseEvent) => setPopupPos({ x: base.x + ev.clientX - startX, y: base.y + ev.clientY - startY });
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
  }

  const itemsRef = useRef(items); itemsRef.current = items;
  const activeIdRef = useRef(activeItemId); activeIdRef.current = activeItemId;
  const activeCatRef = useRef(activeCategoryId); activeCatRef.current = activeCategoryId;
  const selRef = useRef(selectedMeasurementId); selRef.current = selectedMeasurementId;
  ppmRef.current = ppm;
  const pageId = page.id;
  const refreshUndo = () => { setCanUndo(undoRef.current.length > 0); setCanRedo(redoRef.current.length > 0); };

  const styleFor = useCallback((feature: FeatureLike): Style | Style[] | undefined => {
    const itemId = feature.get("itemId") as string;
    const it = itemsRef.current.find((i) => i.id === itemId);
    if (it && !it.is_visible) return undefined;
    const colour = it?.colour ?? "#0369a1";
    const mtype = (feature.get("mtype") as string) ?? "linear";
    const mid = feature.get("measurementId") as string;
    const selected = mid === selRef.current || selectedIdsRef.current.has(mid);
    const anySel = !!selRef.current || selectedIdsRef.current.size > 0;
    const dim = anySel && !selected;
    const strokeColour = dim ? colour + "59" : colour;
    const qty = feature.get("qty") as number | undefined;
    const idx = feature.get("idx") as number | undefined;
    const text = new TextStyle({ text: mtype === "count" ? String(idx ?? "") : qty != null ? fmt(qty, mtype) : "", font: "600 12px system-ui, sans-serif", fill: new Fill({ color: "#0f172a" }), stroke: new Stroke({ color: "#fff", width: 3 }), offsetY: mtype === "count" ? -12 : 0, overflow: true });
    if (mtype === "count") return new Style({ image: new CircleStyle({ radius: selected ? 7 : 5, fill: new Fill({ color: strokeColour }), stroke: new Stroke({ color: "#fff", width: 2 }) }), text });
    const base = new Style({ stroke: new Stroke({ color: strokeColour, width: selected ? 4 : 2.5 }), fill: mtype === "area" ? new Fill({ color: colour + (dim ? "14" : "33") }) : undefined, text });
    if (mtype === "linear" && feature.get("dimension")) {
      const g = feature.getGeometry();
      if (g instanceof LineString) { const c = g.getCoordinates(); if (c.length >= 2) { const s = c[0], e = c[c.length - 1]; const rot = Math.atan2(e[1] - s[1], e[0] - s[0]); return [base, arrowStyle(strokeColour, e, rot), arrowStyle(strokeColour, s, rot + Math.PI)]; } }
    }
    return base;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const img = await loadImage(drawing, page.page_number).catch((e) => { console.error("[measuremap] plan load", e); return null; });
      if (cancelled) return;
      if (!img || !mapEl.current) { setError("Couldn't load this plan (PDF worker or file issue)."); setLoading(false); return; }
      const extent = [0, 0, img.width, img.height];
      imageExtentRef.current = extent;
      const projection = new Projection({ code: "plan-px", units: "pixels", extent });
      const imageLayer = new ImageLayer({ source: new Static({ url: img.url, projection, imageExtent: extent }) });
      // Solid frame around the page.
      const borderSource = new VectorSource();
      borderSource.addFeature(new Feature(new Polygon([[[0, 0], [extent[2], 0], [extent[2], extent[3]], [0, extent[3]], [0, 0]]])));
      const borderLayer = new VectorLayer({ source: borderSource, style: new Style({ stroke: new Stroke({ color: "#1f2937", width: 2 }) }) });
      const vector = new VectorLayer({ source: sourceRef.current, style: styleFor as never });
      vectorLayerRef.current = vector;
      const map = new Map({
        target: mapEl.current, layers: [imageLayer, borderLayer, vector],
        controls: defaultControls({ zoom: false, attribution: false }),
        interactions: defaultInteractions({ dragPan: false, mouseWheelZoom: false }), // left-drag = box-select; pan via middle-mouse / trackpad swipe; pinch = zoom
        view: new View({ projection, center: getCenter(extent), zoom: 1, maxZoom: 8 }), // no extent lock → free zoom-out
      });
      // Middle mouse button (scroll-wheel press-drag) pans.
      map.addInteraction(new DragPan({ condition: (mbe) => { const oe = mbe.originalEvent as unknown as MouseEvent; return oe.button === 1 || oe.buttons === 4; } }));
      map.getView().fit(extent, { padding: [40, 40, 40, 40] });
      mapRef.current = map;
      // Trackpad two-finger swipe / wheel scroll → pan; pinch (ctrl+wheel) → zoom.
      map.getViewport().addEventListener("wheel", (e) => {
        e.preventDefault();
        const view = map.getView();
        if (e.ctrlKey) { // pinch-zoom (and ctrl+wheel)
          const z = view.getZoom() ?? 1;
          view.setZoom(z - e.deltaY * 0.01);
          return;
        }
        const res = view.getResolution() ?? 1;
        const c = view.getCenter();
        if (c) view.setCenter([c[0] + e.deltaX * res, c[1] - e.deltaY * res]); // y is up in the pixel projection
      }, { passive: false });
      // Crosshair guides (full-width/height) + live cursor readout in metres.
      map.on("pointermove", (e) => {
        if (hLineRef.current) hLineRef.current.style.top = `${e.pixel[1]}px`;
        if (vLineRef.current) vLineRef.current.style.left = `${e.pixel[0]}px`;
        if (reticleRef.current) reticleRef.current.style.transform = `translate(${e.pixel[0]}px, ${e.pixel[1]}px)`;
        if (cursorRef.current) cursorRef.current.textContent = ppmRef.current ? `${(e.coordinate[0] / ppmRef.current).toFixed(2)}, ${(e.coordinate[1] / ppmRef.current).toFixed(2)} m` : `${Math.round(e.coordinate[0])}, ${Math.round(e.coordinate[1])} px`;
      });
      // Object-snap points from the plan's own linework (endpoints/corners/intersections).
      if (img.data) {
        try { const feats = detectCorners(img.data).map((c) => new Feature(new Point(c))); cornerSourceRef.current.clear(); cornerSourceRef.current.addFeatures(feats); }
        catch (err) { console.error("[measuremap] corner detect failed", err); }
      }
      // Scrollbar thumbs reflect the visible window vs the whole page.
      const updateBars = () => {
        const size = map.getSize(); if (!size) return;
        const ext = map.getView().calculateExtent(size);
        const [iminx, iminy, imaxx, imaxy] = imageExtentRef.current;
        const iw = imaxx - iminx, ih = imaxy - iminy; if (iw <= 0 || ih <= 0) return;
        const clamp = (n: number) => Math.max(0, Math.min(1, n));
        const hx = clamp((ext[0] - iminx) / iw), hw = clamp((ext[2] - ext[0]) / iw);
        const vy = clamp((imaxy - ext[3]) / ih), vh = clamp((ext[3] - ext[1]) / ih); // OL y-up → top-based
        if (hBarRef.current) { hBarRef.current.style.left = `${hx * 100}%`; hBarRef.current.style.width = `${Math.max(hw * 100, 3)}%`; }
        if (vBarRef.current) { vBarRef.current.style.top = `${vy * 100}%`; vBarRef.current.style.height = `${Math.max(vh * 100, 3)}%`; }
      };
      map.on("postrender", updateBars); updateBars();
      // Right-click deletes the takeoff under the cursor (or the current selection).
      mapEl.current.addEventListener("contextmenu", (ev) => {
        ev.preventDefault();
        const m = mapRef.current; if (!m) return;
        const px = m.getEventPixel(ev);
        let hit: string | undefined;
        m.forEachFeatureAtPixel(px, (f) => { const id = f.get("measurementId") as string | undefined; if (id) { hit = id; return true; } return false; }, { layerFilter: (l) => l === vectorLayerRef.current, hitTolerance: 8 });
        const hasSel = !!selRef.current || selectedIdsRef.current.size > 0 || (selectRef.current?.getFeatures().getLength() ?? 0) > 0;
        if (hit) deleteSelectedRef.current(hit);
        else if (hasSel) deleteSelectedRef.current();
      });
      setLoading(false);
      try {
        const [tk, cats] = await Promise.all([
          fetch(`/api/measuremap/projects/${projectId}/drawings/${drawing.id}/takeoffs?pageId=${page.id}`).then((r) => r.json()),
          api.listCategories(projectId),
        ]);
        const loaded: Item[] = tk.items ?? [];
        setItems(loaded); setCategories(cats); setActiveCategoryId(cats[0]?.id ?? null);
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
      f.setId(m.id); f.set("measurementId", m.id); f.set("itemId", it.id); f.set("mtype", mtype); f.set("qty", m.calculated_quantity);
      if (mtype === "linear") f.set("dimension", true);
      if (idx != null) f.set("idx", idx); else if (mtype === "count") f.set("idx", it.measurements.indexOf(m) + 1);
      sourceRef.current.addFeature(f);
    } catch { /* skip */ }
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (drawRef.current) { map.removeInteraction(drawRef.current); drawRef.current = null; }
    if (selectRef.current) { map.removeInteraction(selectRef.current); selectRef.current = null; }
    if (modifyRef.current) { map.removeInteraction(modifyRef.current); modifyRef.current = null; }
    if (translateRef.current) { map.removeInteraction(translateRef.current); translateRef.current = null; }
    if (snapRef.current) { map.removeInteraction(snapRef.current); snapRef.current = null; }
    if (cornerSnapRef.current) { map.removeInteraction(cornerSnapRef.current); cornerSnapRef.current = null; }
    if (dragBoxRef.current) { map.removeInteraction(dragBoxRef.current); dragBoxRef.current = null; }
    if (panRef.current) { map.removeInteraction(panRef.current); panRef.current = null; }

    // Ortho: constrain the floating vertex to horizontal/vertical while drawing.
    const attachOrtho = (draw: Draw) => draw.on("drawstart", (e) => {
      const g = e.feature.getGeometry();
      let busy = false;
      g?.on("change", () => {
        if (busy || !orthoRef.current) return;
        busy = true;
        try {
          if (g instanceof LineString) { const c = g.getCoordinates(); if (c.length >= 2) { c[c.length - 1] = orthoPoint(c[c.length - 2], c[c.length - 1]); g.setCoordinates(c); } }
          else if (g instanceof Polygon) { const r = g.getCoordinates()[0]; if (r.length >= 3) { r[r.length - 2] = orthoPoint(r[r.length - 3], r[r.length - 2]); g.setCoordinates([r]); } }
        } finally { busy = false; }
      });
    });
    const addSnap = () => { if (snapOn) { const snap = new Snap({ source: sourceRef.current }); map.addInteraction(snap); snapRef.current = snap; } };

    if (tool === "select") {
      const select = new Select({ style: styleFor as never, hitTolerance: 8, layers: (l) => l === vectorLayerRef.current });
      select.on("select", (e) => { selectedIdsRef.current.clear(); const f = e.selected[0]; setSelectedMeasurementId(f ? (f.get("measurementId") as string) : null); if (f?.get("itemId")) setActiveItemId(f.get("itemId") as string); sourceRef.current.changed(); });
      // Marquee (box) select: hold left button and drag across takeoffs.
      const dragBox = new DragBox();
      dragBox.on("boxend", () => {
        const ext = dragBox.getGeometry().getExtent();
        const ids = new Set<string>();
        const feats = select.getFeatures();
        feats.clear();
        sourceRef.current.forEachFeatureInExtent(ext, (f) => { const id = f.get("measurementId") as string; if (id) { ids.add(id); feats.push(f); } });
        selectedIdsRef.current = ids;
        const arr = Array.from(ids);
        setSelectedMeasurementId(arr.length ? arr[arr.length - 1] : null);
        sourceRef.current.changed(); // repaint with highlight
      });
      const modify = new Modify({ source: sourceRef.current });
      modify.on("modifyend", (e) => e.features.forEach((f) => void persistGeometry(f)));
      const translate = new Translate({ features: select.getFeatures() });
      translate.on("translateend", (e) => e.features.forEach((f) => void persistGeometry(f)));
      map.addInteraction(select); map.addInteraction(dragBox); map.addInteraction(modify); map.addInteraction(translate);
      selectRef.current = select; dragBoxRef.current = dragBox; modifyRef.current = modify; translateRef.current = translate;
      return;
    }
    if (tool === "pan") { const dp = new DragPan(); map.addInteraction(dp); panRef.current = dp; return; }

    if (tool === "scale") {
      const draw = new Draw({ source: new VectorSource(), type: "LineString", maxPoints: 2 });
      attachOrtho(draw);
      draw.on("drawend", (e) => { void handleScaleEnd(e.feature); });
      map.addInteraction(draw); drawRef.current = draw; addSnap();
      return;
    }

    const meta = TOOL_META[tool];
    const draw = new Draw({ source: sourceRef.current, type: meta.geom, ...(meta.maxPoints ? { maxPoints: meta.maxPoints } : {}) });
    attachOrtho(draw);
    draw.on("drawend", (e) => { void handleDrawEnd(tool as "dimension" | "area" | "linear" | "count", e.feature); });
    map.addInteraction(draw); drawRef.current = draw; addSnap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, loading, snapOn]);

  // Escape aborts + returns to Select; Delete removes selection.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "Escape") { drawRef.current?.abortDrawing(); setTool("select"); setNamePopupOpen(false); setColourFor(null); selectedIdsRef.current.clear(); setSelectedMeasurementId(null); sourceRef.current.changed(); }
      if ((e.key === "Delete" || e.key === "Backspace") && tag !== "INPUT" && tag !== "TEXTAREA") {
        const hasSel = !!selRef.current || selectedIdsRef.current.size > 0 || (selectRef.current?.getFeatures().getLength() ?? 0) > 0;
        if (hasSel) { e.preventDefault(); deleteSelectedRef.current(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleScaleEnd(feature: Feature<Geometry>) {
    const g = feature.getGeometry();
    setTool("select");
    if (!(g instanceof LineString) || !pendingScaleRef.current) return;
    const px = g.getLength();
    const metres = pendingScaleRef.current;
    pendingScaleRef.current = null;
    if (!(metres > 0) || !(px > 0)) return;
    const newPpm = px / metres;
    setPpm(newPpm); ppmRef.current = newPpm;
    setSaveStatus("saving");
    try { await fetch(`/api/measuremap/projects/${projectId}/drawings/${drawing.id}/scale`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page_id: page.id, pixels_per_metre: newPpm }) }); setSaveStatus("saved"); } catch { setSaveStatus("error"); }
  }

  function qtyFor(geom: Geometry, mtype: MType): number {
    const p = ppmRef.current ?? 1;
    if (mtype === "count") return 1;
    if (mtype === "area") return (geom as Polygon).getArea() / (p * p);
    return (geom as LineString).getLength() / p;
  }

  async function ensureItem(mtype: MType): Promise<Item | null> {
    const pending = pendingRef.current;
    if (!pending) { const active = itemsRef.current.find((i) => i.id === activeIdRef.current); if (active && active.measurement_type === mtype && (active.category_id ?? null) === (activeCatRef.current ?? null)) return active; }
    const n = itemsRef.current.filter((i) => i.measurement_type === mtype).length + 1;
    const name = pending?.name?.trim() || `${TYPE_LABEL[mtype]} ${n}`;
    const colour = pending?.colour ?? COLOURS[itemsRef.current.length % COLOURS.length];
    pendingRef.current = null; setNamePopupOpen(false);
    try { const created = await api.createItem(projectId, { name, measurement_type: mtype, colour, unit: UNIT_FOR[mtype], category_id: activeCatRef.current, sort_order: itemsRef.current.length }); setItems((prev) => [...prev, created]); setActiveItemId(created.id); return created; } catch { setSaveStatus("error"); return null; }
  }

  async function handleDrawEnd(t: "dimension" | "area" | "linear" | "count", feature: Feature<Geometry>) {
    const geom = feature.getGeometry();
    if (!geom) return;
    if (!ppmRef.current) { sourceRef.current.removeFeature(feature); setTool("select"); alert("Set the scale first: pick “Scale”, enter a known length, then trace it on the plan."); return; }
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
      const { id } = await api.createMeasurement(projectId, { estimate_item_id: item.id, category_id: item.category_id, geometry: gj, calculated_quantity: qty, unit: item.unit, measurement_type: mtype, measurement_mode: item.category_id ? "structured" : "free", label: idx != null ? String(idx) : null, source_type: "drawing", plan_id: drawing.id, plan_page_id: pageId, sort_order: item.measurements.length });
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
  useEffect(() => { vectorLayerRef.current?.setVisible(showMeas); }, [showMeas]);
  useEffect(() => { const t = setTimeout(() => mapRef.current?.updateSize(), 30); return () => clearTimeout(t); }, [catCollapsed, catW]);

  async function removeMeasurement(id: string) {
    selectRef.current?.getFeatures().clear();
    const f = sourceRef.current.getFeatureById(id); if (f) sourceRef.current.removeFeature(f);
    setSelectedMeasurementId(null);
    try { await api.removeMeasurement(projectId, id); setItems((prev) => prev.map((i) => ({ ...i, measurements: i.measurements.filter((m) => m.id !== id) })).filter((i) => i.measurements.length > 0)); } catch { setSaveStatus("error"); }
  }
  // Delete the current selection (single or marquee), optionally including a right-clicked feature.
  async function deleteSelected(extraId?: string) {
    const ids = new Set<string>();
    selectRef.current?.getFeatures().forEach((f) => { const id = f.get("measurementId") as string; if (id) ids.add(id); });
    selectedIdsRef.current.forEach((id) => ids.add(id));
    if (extraId) ids.add(extraId);
    if (!ids.size && selRef.current) ids.add(selRef.current);
    if (!ids.size) return;
    selectRef.current?.getFeatures().clear();
    selectedIdsRef.current.clear();
    setSelectedMeasurementId(null);
    ids.forEach((id) => { const f = sourceRef.current.getFeatureById(id); if (f) sourceRef.current.removeFeature(f); });
    setItems((prev) => prev.map((i) => ({ ...i, measurements: i.measurements.filter((m) => !ids.has(m.id)) })).filter((i) => i.measurements.length > 0));
    for (const id of ids) { try { await api.removeMeasurement(projectId, id); } catch { setSaveStatus("error"); } }
  }
  deleteSelectedRef.current = (id?: string) => void deleteSelected(id);
  async function undo() { const s = undoRef.current.pop(); if (!s) return; const f = sourceRef.current.getFeatureById(s.measurementId); if (f) sourceRef.current.removeFeature(f); setItems((prev) => prev.map((i) => i.id === s.itemId ? { ...i, measurements: i.measurements.filter((m) => m.id !== s.measurementId) } : i)); try { await api.removeMeasurement(projectId, s.measurementId); redoRef.current.push(s); refreshUndo(); } catch { setSaveStatus("error"); } }
  async function redo() {
    const s = redoRef.current.pop(); if (!s) return;
    try {
      const { id } = await api.createMeasurement(projectId, { estimate_item_id: s.itemId, geometry: s.gj, calculated_quantity: s.qty, unit: s.unit, measurement_type: s.mtype, source_type: "drawing", plan_id: drawing.id, plan_page_id: pageId, label: s.idx != null ? String(s.idx) : null });
      const g = geojson.readGeometry(s.gj as object); const f = new Feature(g); f.setId(id); f.set("measurementId", id); f.set("itemId", s.itemId); f.set("mtype", s.mtype); f.set("qty", s.qty);
      if (s.mtype === "linear") f.set("dimension", true); if (s.idx != null) f.set("idx", s.idx);
      sourceRef.current.addFeature(f);
      setItems((prev) => prev.map((i) => i.id === s.itemId ? { ...i, measurements: [...i.measurements, { id, estimate_item_id: s.itemId, category_id: null, measurement_mode: "free", measurement_type: s.mtype, source_type: "drawing", name: null, colour: null, geometry: s.gj, calculated_quantity: s.qty, unit: s.unit, label: null, is_visible: true, sort_order: i.measurements.length }] } : i));
      undoRef.current.push({ ...s, measurementId: id }); refreshUndo();
    } catch { setSaveStatus("error"); }
  }
  async function deleteItem(it: Item) { if (!confirm(`Delete “${it.name}” and its ${it.measurements.length} measurement(s)?`)) return; it.measurements.forEach((m) => { const f = sourceRef.current.getFeatureById(m.id); if (f) sourceRef.current.removeFeature(f); }); setItems((prev) => prev.filter((i) => i.id !== it.id)); try { await api.removeItem(projectId, it.id); } catch { setSaveStatus("error"); } }
  async function toggleVisible(it: Item) { setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, is_visible: !i.is_visible } : i)); try { await api.patchItem(projectId, it.id, { is_visible: !it.is_visible }); } catch { /* visual */ } }
  async function recolour(it: Item, colour: string) { setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, colour } : i)); setColourFor(null); sourceRef.current.changed(); try { await api.patchItem(projectId, it.id, { colour }); } catch { setSaveStatus("error"); } }
  async function rename(it: Item, name: string) { setItems((prev) => prev.map((i) => i.id === it.id ? { ...i, name } : i)); setRenaming(null); try { await api.patchItem(projectId, it.id, { name }); } catch { setSaveStatus("error"); } }
  function selectItem(it: Item) { setActiveItemId(it.id); const map = mapRef.current; if (!map) return; const ext = createEmpty(); sourceRef.current.getFeatures().forEach((f) => { if (f.get("itemId") !== it.id) return; const g = f.getGeometry(); if (g) extendExtent(ext, g.getExtent()); }); if (!extentIsEmpty(ext)) map.getView().fit(ext, { padding: [60, 60, 60, 60], maxZoom: 8, duration: 200 }); }

  async function addCategory(name: string, description: string) { if (!name.trim()) return; try { const cat = await api.createCategory(projectId, { name, description: description || null }); setCategories((prev) => [...prev, cat]); setActiveCategoryId(cat.id); setAddingCategory(false); } catch { setSaveStatus("error"); } }
  async function renameCategory(c: Category) { const n = window.prompt("Rename category:", c.name); if (n == null || !n.trim()) return; setCategories((prev) => prev.map((x) => x.id === c.id ? { ...x, name: n.trim() } : x)); try { await api.patchCategory(projectId, c.id, { name: n.trim() }); } catch { setSaveStatus("error"); } }
  async function deleteCategoryC(c: Category) { if (!confirm(`Delete category “${c.name}”? Its items become uncategorised.`)) return; setCategories((prev) => prev.filter((x) => x.id !== c.id)); setItems((prev) => prev.map((i) => i.category_id === c.id ? { ...i, category_id: null } : i)); if (activeCategoryId === c.id) setActiveCategoryId(null); try { await api.removeCategory(projectId, c.id); } catch { setSaveStatus("error"); } }
  async function duplicateCategory(c: Category) { try { const cat = await api.createCategory(projectId, { name: `${c.name} copy` }); setCategories((prev) => [...prev, cat]); } catch { setSaveStatus("error"); } }

  function pickTool(t: Tool) {
    if (t === "select" || t === "pan") { setNamePopupOpen(false); pendingRef.current = null; setTool(t); return; }
    if (t === "scale") { setScaleOpen(true); return; }
    const mtype = TOOL_META[t as "dimension" | "area" | "linear" | "count"].type;
    const n = items.filter((i) => i.measurement_type === mtype).length + 1;
    const name = `${TYPE_LABEL[mtype]} ${n}`; const colour = COLOURS[items.length % COLOURS.length];
    pendingRef.current = { name, colour }; setNewName(name); setNewColour(colour); setPendingType(t as "dimension" | "area" | "linear" | "count"); setPopupPos(null); setNamePopupOpen(true); setActiveItemId(null); setTool(t);
  }
  function confirmScale() {
    const v = parseFloat(scaleValue);
    if (!(v > 0)) return;
    const metres = scaleUnit === "mm" ? v / 1000 : scaleUnit === "cm" ? v / 100 : v;
    pendingScaleRef.current = metres; setScaleOpen(false); setTool("scale");
  }
  function applyRatio(R: number) {
    const p = (PX_PER_MM * 1000) / R; // pixels per real metre at scale 1:R
    setPpm(p); ppmRef.current = p; setScaleOpen(false); setSaveStatus("saving");
    fetch(`/api/measuremap/projects/${projectId}/drawings/${drawing.id}/scale`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page_id: page.id, pixels_per_metre: p }) }).then(() => setSaveStatus("saved")).catch(() => setSaveStatus("error"));
  }
  function clearScale() {
    setPpm(null); ppmRef.current = null; setScaleOpen(false); setSaveStatus("saving");
    fetch(`/api/measuremap/projects/${projectId}/drawings/${drawing.id}/scale`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page_id: page.id, reset: true }) }).then(() => setSaveStatus("saved")).catch(() => setSaveStatus("error"));
  }

  function zoomBy(d: number) { const v = mapRef.current?.getView(); if (v) v.animate({ zoom: (v.getZoom() ?? 1) + d, duration: 150 }); }
  function rotate() { const v = mapRef.current?.getView(); if (v) v.animate({ rotation: (v.getRotation() ?? 0) + Math.PI / 2, duration: 200 }); }
  function fitPage() { const m = mapRef.current; if (m) m.getView().fit(imageExtentRef.current, { padding: [40, 40, 40, 40], duration: 200 }); }
  function startCatResize(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX, startW = catW;
    const onMove = (ev: MouseEvent) => setCatW(Math.min(560, Math.max(220, startW + ev.clientX - startX)));
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); mapRef.current?.updateSize(); };
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
  }

  const groups = categories.map((c) => ({ category: c, list: items.filter((i) => i.category_id === c.id) }));
  const uncategorised = items.filter((i) => !i.category_id);

  return (
    <div className="flex h-full flex-col gap-3" onClick={() => { setColourFor(null); }}>
      {/* Ribbon */}
      <div className="flex shrink-0 items-stretch rounded-xl border border-[#D5DADD] bg-white px-3 py-2 shadow-[0_2px_10px_rgba(15,23,42,0.10)]" onClick={(e) => e.stopPropagation()}>
        <Group label="Zoom / Pan" tone="#343A3E"><TBtn tone="#343A3E" label="Fit" Icon={Maximize2} onClick={fitPage} /><TBtn tone="#343A3E" label="In" Icon={ZoomIn} onClick={() => zoomBy(0.5)} /><TBtn tone="#343A3E" label="Out" Icon={ZoomOut} onClick={() => zoomBy(-0.5)} /><TBtn tone="#343A3E" label="Pan" Icon={Move} active={tool === "pan"} onClick={() => pickTool("pan")} /></Group>
        <Group label="Measure" tone="#0369a1"><TBtn tone="#0369a1" label="Scale" Icon={PencilRuler} active={tool === "scale"} onClick={() => pickTool("scale")} /><TBtn tone="#0369a1" label="Dimension" Icon={ArrowLeftRight} active={tool === "dimension"} onClick={() => pickTool("dimension")} /></Group>
        <Group label="Takeoff" tone="#0f7a4d"><TBtn tone="#0f7a4d" label="Area" Icon={Pentagon} active={tool === "area"} onClick={() => pickTool("area")} /><TBtn tone="#0f7a4d" label="Linear" Icon={Spline} active={tool === "linear"} onClick={() => pickTool("linear")} /><TBtn tone="#0f7a4d" label="Count" Icon={MapPin} active={tool === "count"} onClick={() => pickTool("count")} /></Group>
        <Group label="Edit" tone="#dc2626" last><TBtn tone="#dc2626" label="Select" Icon={MousePointer2} active={tool === "select"} onClick={() => pickTool("select")} /><TBtn tone="#dc2626" label="Rotate" Icon={RotateCw} onClick={rotate} /><TBtn tone="#dc2626" label="Undo" Icon={Undo2} onClick={() => void undo()} disabled={!canUndo} /><TBtn tone="#dc2626" label="Redo" Icon={Redo2} onClick={() => void redo()} disabled={!canRedo} /><TBtn tone="#dc2626" label="Delete" Icon={Trash2} onClick={() => deleteSelectedRef.current()} disabled={!selectedMeasurementId} /></Group>
        <div className="ml-auto flex items-center gap-2 pr-2 text-[13px]">
          <span className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-bold ${ppm ? "bg-[#E6F5EE] text-[#0f7a4d]" : "bg-[#FDF3E3] text-[#b45309]"}`}><PencilRuler size={14} /> {ppm ? `SCALED 1:${Math.round(5669.29 / ppm)}` : "NOT SCALED"}</span>
          {saveStatus === "error" && <span className="text-[#dc2626]">Save failed</span>}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        {/* Left panel — categories + items (Map Measure parity). Collapsible. */}
        {catCollapsed ? (
          <aside className="flex w-11 shrink-0 flex-col items-center gap-3 rounded-xl border border-[#D7DCE0] bg-white py-3 shadow-[0_2px_10px_rgba(15,23,42,0.10)]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setCatCollapsed(false)} title="Show categories" className="grid h-8 w-8 place-items-center rounded-lg text-[#0369a1] hover:bg-[#EAF3FA]"><PanelLeftOpen size={20} /></button>
            <span className="mt-1 rotate-180 text-[12px] font-bold uppercase tracking-wide text-[#586066] [writing-mode:vertical-rl]">Categories</span>
          </aside>
        ) : (
        <div className="relative flex shrink-0" style={{ width: catW }} onClick={(e) => e.stopPropagation()}>
        <aside className="flex w-full flex-col overflow-hidden rounded-xl border border-[#D7DCE0] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.10)]">
          <div className="px-3 pt-3">
            <button onClick={() => setAddingCategory((v) => !v)} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0369a1] text-[15px] font-bold text-white hover:bg-[#075985]"><FolderPlus size={18} /> Add Category</button>
            {addingCategory && <AddCategoryForm onAdd={addCategory} onCancel={() => setAddingCategory(false)} />}
          </div>
          <div className="mt-2 min-h-0 flex-1 overflow-y-auto px-2 pb-3">
            {items.length === 0 && categories.length === 0 && <p className="px-2 py-6 text-center text-[13px] text-[#8A9196]">No takeoffs yet. Set scale, add a category or just pick a tool and measure.</p>}
            {groups.map(({ category, list }) => (
              <PlanCategory key={category.id} category={category} list={list} active={activeCategoryId === category.id} activeItemId={activeItemId} colourFor={colourFor} renaming={renaming}
                onSetActive={() => setActiveCategoryId(activeCategoryId === category.id ? null : category.id)} onSelectItem={selectItem} onToggleVisible={toggleVisible} onDeleteItem={deleteItem} onOpenColour={setColourFor} onRecolour={recolour} onStartRename={setRenaming} onRename={rename}
                onRenameCategory={renameCategory} onDeleteCategory={deleteCategoryC} onDuplicateCategory={duplicateCategory} />
            ))}
            {uncategorised.length > 0 && (
              <PlanCategory category={{ id: "__free__", name: "Uncategorised", description: null, sort_order: 999 }} list={uncategorised} active={activeCategoryId === null} activeItemId={activeItemId} colourFor={colourFor} renaming={renaming} isFree
                onSetActive={() => setActiveCategoryId(null)} onSelectItem={selectItem} onToggleVisible={toggleVisible} onDeleteItem={deleteItem} onOpenColour={setColourFor} onRecolour={recolour} onStartRename={setRenaming} onRename={rename} />
            )}
          </div>
          <div className="border-t border-[#E1E5E7] px-3 py-2.5 text-[12px]">
            {activeCategoryId ? <span className="flex items-center gap-1.5 font-medium text-[#0369a1]"><Check size={14} /> Filing into <b>{categories.find((c) => c.id === activeCategoryId)?.name}</b></span> : <span className="text-[#8A9196]">Uncategorised — pick a category to file measurements.</span>}
          </div>
        </aside>
        <div onMouseDown={startCatResize} title="Drag to resize" className="group absolute -right-1.5 top-0 z-10 flex h-full w-3 cursor-col-resize items-center justify-center">
          <GripVertical size={14} className="text-[#B7BEC3] opacity-0 group-hover:opacity-100" />
        </div>
        <button onClick={() => setCatCollapsed(true)} title="Collapse panel" className="absolute right-0 top-1/2 z-20 grid h-14 w-5 -translate-y-1/2 place-items-center rounded-l-md border border-r-0 border-[#D7DCE0] bg-white text-[#586066] shadow-sm hover:bg-[#EAF3FA] hover:text-[#0369a1]"><PanelLeftClose size={15} /></button>
        </div>
        )}

        {/* Canvas */}
        <section className="relative min-w-0 flex-1 overflow-hidden rounded-xl bg-[#565b5e] shadow-[0_2px_10px_rgba(15,23,42,0.10)]" onClick={(e) => e.stopPropagation()}>
          {namePopupOpen && pendingType && (
            <div style={popupPos ? { left: popupPos.x, top: popupPos.y } : undefined} className={`absolute z-30 w-[280px] rounded-md border border-[#7dd3fc] bg-white p-3 shadow-lg ${popupPos ? "" : "right-3 top-3"}`}>
              <div onMouseDown={startPopupDrag} className="mb-2 flex cursor-move items-center justify-between"><span className="text-[11px] font-semibold uppercase tracking-wide text-[#383E42]">New {TYPE_LABEL[TOOL_META[pendingType].type]} measurement</span><button onMouseDown={(e) => e.stopPropagation()} onClick={() => setNamePopupOpen(false)} className="grid h-5 w-5 place-items-center rounded text-[#8A9196] hover:bg-[#F1F3F4]"><X size={13} /></button></div>
              <input autoFocus value={newName} onChange={(e) => { setNewName(e.target.value); if (pendingRef.current) pendingRef.current.name = e.target.value; }} onKeyDown={(e) => { if (e.key === "Enter") setNamePopupOpen(false); }} placeholder="Measurement name" className="w-full rounded border border-[#D3D9DD] px-2 py-1.5 text-[12px] outline-none focus:border-[#0369a1]" />
              <div className="mt-2 flex flex-wrap gap-1.5">{COLOURS.map((c) => <button key={c} onClick={() => { setNewColour(c); if (pendingRef.current) pendingRef.current.colour = c; }} className={`h-6 w-6 rounded-full border-2 ${newColour === c ? "border-[#212121]" : "border-transparent"}`} style={{ backgroundColor: c }} aria-label={c} />)}</div>
              <button onClick={() => setNamePopupOpen(false)} className="mt-3 h-8 w-full rounded bg-[#0369a1] text-[12px] font-semibold text-white hover:bg-[#075985]">Start measuring</button>
              <p className="mt-1.5 text-center text-[10px] text-[#8A9196]">Or just draw — close to use defaults.</p>
            </div>
          )}
          {loading && <div className="absolute inset-0 z-10 flex items-center justify-center text-white/90"><Loader2 className="h-6 w-6 animate-spin" /><span className="ml-2 text-sm">Loading plan…</span></div>}
          {error && <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-white/80"><span className="text-sm">{error}</span></div>}
          {/* Sniper reticle: red crosshair guides + tracking ring/dot */}
          <div ref={hLineRef} className="pointer-events-none absolute left-0 right-0 z-20 h-px" style={{ top: 0, backgroundColor: "rgba(220,38,38,0.85)" }} />
          <div ref={vLineRef} className="pointer-events-none absolute bottom-0 top-0 z-20 w-px" style={{ left: 0, backgroundColor: "rgba(220,38,38,0.85)" }} />
          <div ref={reticleRef} className="pointer-events-none absolute left-0 top-0 z-20" style={{ transform: "translate(-200px, -200px)" }}>
            <div className="absolute h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: "rgba(220,38,38,0.9)" }} />
            <div className="absolute h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: "rgba(220,38,38,0.95)" }} />
            <div className="absolute h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: "rgba(220,38,38,1)" }} />
          </div>
          <div ref={mapEl} className={`h-full w-full ${tool === "pan" ? "cursor-grab" : "cursor-none"}`} />
          {/* Scroll indicators (zoom/pan position within the whole page) */}
          <div className="pointer-events-none absolute bottom-[38px] left-1 right-3 z-20 h-1.5 rounded-full bg-black/20">
            <div ref={hBarRef} className="absolute top-0 h-full rounded-full bg-white/70" style={{ left: "0%", width: "100%" }} />
          </div>
          <div className="pointer-events-none absolute bottom-[46px] right-0.5 top-1 z-20 w-1.5 rounded-full bg-black/20">
            <div ref={vBarRef} className="absolute left-0 w-full rounded-full bg-white/70" style={{ top: "0%", height: "100%" }} />
          </div>
          {/* Status bar: Ortho / Snap / cursor */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex h-9 items-center gap-2 bg-[#082f49]/95 px-3 text-[13px] text-white/90 backdrop-blur">
            <button onClick={() => setOrthoOn((v) => !v)} title="Constrain to horizontal/vertical" className={["rounded px-2.5 py-1 font-bold", orthoOn ? "bg-[#0369a1] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"].join(" ")}>Ortho</button>
            <button onClick={() => setSnapOn((v) => !v)} title="Snap to existing points/edges" className={["rounded px-2.5 py-1 font-bold", snapOn ? "bg-[#0369a1] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"].join(" ")}>Snap</button>
            <button onClick={() => setShowMeas((v) => !v)} title="Show/hide all takeoffs on this page" className={["rounded px-2.5 py-1 font-bold", showMeas ? "bg-[#0369a1] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"].join(" ")}>Takeoffs</button>
            <span className="ml-auto">Cursor <span ref={cursorRef} className="font-semibold text-white">—</span></span>
          </div>
        </section>
      </div>

      {/* Scale dialog */}
      {scaleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setScaleOpen(false)}>
          <div className="w-[360px] rounded-lg border border-[#D7DCE0] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between rounded-t-lg border-b border-[#E2E5E7] bg-[#F7F9FB] px-4 py-3"><h3 className="text-[14px] font-bold text-[#0c2b3f]">Set Scale</h3><button onClick={() => setScaleOpen(false)} className="grid h-6 w-6 place-items-center rounded text-[#8A9196] hover:bg-[#EEF0F1]"><X size={15} /></button></div>
            <div className="p-4">
              <p className="mb-3 text-[12px] text-[#586066]">Enter a known real-world length, click OK, then <b>trace that dimension</b> on the plan (2 clicks).</p>
              <div className="flex gap-2">
                <input autoFocus type="number" value={scaleValue} onChange={(e) => setScaleValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") confirmScale(); }} placeholder="e.g. 10" className="h-9 flex-1 rounded border border-[#D3D9DD] px-3 text-[13px] outline-none focus:border-[#0369a1]" />
                <select value={scaleUnit} onChange={(e) => setScaleUnit(e.target.value as "m" | "cm" | "mm")} className="h-9 w-[80px] rounded border border-[#D3D9DD] px-2 text-[13px] outline-none"><option value="m">m</option><option value="cm">cm</option><option value="mm">mm</option></select>
              </div>
              {ppm && <p className="mt-3 text-[11px] text-[#0f7a4d]">Currently SCALED.</p>}
              {((drawing.mime_type ?? "").includes("pdf") || /\.pdf$/i.test(drawing.filename)) && (
                <div className="mt-4 border-t border-[#EEF0F1] pt-3">
                  <p className="mb-2 text-[11px] font-semibold text-[#586066]">Or set by the drawing&apos;s stated ratio</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[50, 100, 200, 500].map((R) => (
                      <button key={R} onClick={() => applyRatio(R)} className="rounded border border-[#CCD2D6] px-2.5 py-1 text-[12px] font-medium hover:bg-[#EAF3FA]">1:{R}</button>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-[#8A9196]">Assumes the PDF is at true paper size — verify against a known dimension.</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-[#E2E5E7] px-4 py-3">
              <button onClick={clearScale} className="h-9 rounded border border-[#CCD2D6] px-3 text-[12px] font-semibold text-[#586066] hover:bg-[#F5F6F7]">Clear Scale</button>
              <div className="flex gap-2">
                <button onClick={() => setScaleOpen(false)} className="h-9 rounded border border-[#CCD2D6] px-4 text-[12px] font-semibold text-[#30363A] hover:bg-[#F5F6F7]">Cancel</button>
                <button onClick={confirmScale} className="h-9 rounded bg-[#0369a1] px-5 text-[12px] font-semibold text-white hover:bg-[#075985]">OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Group({ label, children, last, tone }: { label: string; children: React.ReactNode; last?: boolean; tone?: string }) {
  return <div className={`flex flex-col items-center px-2.5 ${last ? "" : "border-r border-[#E7EAEC]"}`}><div className="flex items-stretch gap-0.5">{children}</div><span className="mt-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: tone ?? "#9AA0A5" }}>{label}</span></div>;
}
function TBtn({ label, Icon, onClick, active, disabled, tone }: { label: string; Icon: typeof MapPin; onClick: () => void; active?: boolean; disabled?: boolean; tone?: string }) {
  const t = tone ?? "#343A3E";
  return <button onClick={onClick} disabled={disabled} title={label} style={active ? { backgroundColor: t, color: "#fff" } : { color: t }} className={["flex w-[62px] flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-semibold transition", active ? "" : "hover:bg-[#F1F3F4]", disabled ? "opacity-30" : ""].join(" ")}><Icon size={22} /><span>{label}</span></button>;
}

function AddCategoryForm({ onAdd, onCancel }: { onAdd: (n: string, d: string) => void; onCancel: () => void }) {
  const [name, setName] = useState(""); const [desc, setDesc] = useState("");
  return (
    <div className="mt-2 rounded-md border border-[#D7DCE0] bg-[#F7F9FB] p-3">
      <input autoFocus value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") onAdd(name, desc); }} placeholder="Category name" className="w-full rounded border border-[#D3D9DD] px-2 py-1.5 text-[12px] outline-none focus:border-[#0369a1]" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description (optional)" className="mt-2 h-[44px] w-full resize-none rounded border border-[#D3D9DD] px-2 py-1.5 text-[11px] outline-none focus:border-[#0369a1]" />
      <div className="mt-2 flex gap-2"><button onClick={() => onAdd(name, desc)} className="flex-1 rounded bg-[#0369a1] px-2 py-1.5 text-[12px] font-semibold text-white hover:bg-[#075985]">Add</button><button onClick={onCancel} className="rounded px-2 py-1.5 text-[12px] font-medium text-[#586066]">Cancel</button></div>
    </div>
  );
}

type CatProps = {
  category: Category; list: Item[]; active: boolean; activeItemId: string | null; colourFor: string | null; renaming: string | null; isFree?: boolean;
  onSetActive: () => void; onSelectItem: (it: Item) => void; onToggleVisible: (it: Item) => void; onDeleteItem: (it: Item) => void;
  onOpenColour: (id: string | null) => void; onRecolour: (it: Item, c: string) => void; onStartRename: (id: string | null) => void; onRename: (it: Item, n: string) => void;
  onRenameCategory?: (c: Category) => void; onDeleteCategory?: (c: Category) => void; onDuplicateCategory?: (c: Category) => void;
};
function PlanCategory(p: CatProps) {
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState(false);
  return (
    <section className="mb-1">
      <div onClick={p.onSetActive} className={["group flex items-center gap-1.5 rounded-lg px-2 py-2", p.active ? "bg-[#EAF3FA]" : "hover:bg-[#F5F6F7]"].join(" ")}>
        <button onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }} className="text-[#8A9196]">{open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</button>
        <span className={["min-w-0 flex-1 truncate text-[15px] font-bold", p.active ? "text-[#0c4a6e]" : "text-[#30363A]"].join(" ")}>{p.category.name}</span>
        {p.active && <span className="rounded bg-[#0369a1] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Active</span>}
        <span className="rounded bg-[#ECEFF1] px-1.5 py-0.5 text-[11px] font-semibold text-[#5D656A]">{p.list.length}</span>
        {!p.isFree && (
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setMenu((v) => !v); }} className="grid h-6 w-6 place-items-center rounded text-[#8A9196] opacity-0 transition hover:bg-[#E8EBED] group-hover:opacity-100"><MoreVertical size={13} /></button>
            {menu && (
              <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-6 z-40 w-[150px] overflow-hidden rounded-md border border-[#D7DCE0] bg-white py-1 shadow-lg">
                <button onClick={() => { setMenu(false); p.onRenameCategory?.(p.category); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] text-[#30363A] hover:bg-[#F5F6F7]"><Pencil size={13} /> Rename</button>
                <button onClick={() => { setMenu(false); p.onDuplicateCategory?.(p.category); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] text-[#30363A] hover:bg-[#F5F6F7]"><Copy size={13} /> Duplicate</button>
                <button onClick={() => { setMenu(false); p.onDeleteCategory?.(p.category); }} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] text-[#dc2626] hover:bg-[#FEF2F2]"><Trash2 size={13} /> Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
      {open && (
        <div className="ml-4 border-l border-[#EAECEE] pl-1">
          {p.list.length === 0 && <p className="px-2 py-1 text-[12px] text-[#A2A8AC]">No takeoffs yet.</p>}
          {p.list.map((it) => (
            <div key={it.id} onClick={() => p.onSelectItem(it)} className={["group relative grid grid-cols-[14px_minmax(0,1fr)_auto_26px_26px] items-center gap-1.5 rounded-lg px-1.5 py-1.5", p.activeItemId === it.id ? "bg-[#EAF3FA]" : "hover:bg-[#F5F6F7]"].join(" ")}>
              <div className="relative">
                <button onClick={(e) => { e.stopPropagation(); p.onOpenColour(p.colourFor === it.id ? null : it.id); }} className="h-[14px] w-[14px] rounded-sm ring-1 ring-black/10" style={{ backgroundColor: it.colour }} />
                {p.colourFor === it.id && <div onClick={(e) => e.stopPropagation()} className="absolute left-0 top-5 z-30 flex w-[132px] flex-wrap gap-1 rounded-md border border-[#D7DCE0] bg-white p-2 shadow-lg">{COLOURS.map((c) => <button key={c} onClick={() => p.onRecolour(it, c)} className={`h-5 w-5 rounded-full border-2 ${it.colour === c ? "border-[#212121]" : "border-transparent"}`} style={{ backgroundColor: c }} />)}</div>}
              </div>
              {p.renaming === it.id ? (
                <input autoFocus defaultValue={it.name} onClick={(e) => e.stopPropagation()} onBlur={(e) => p.onRename(it, e.target.value.trim() || it.name)} onKeyDown={(e) => { if (e.key === "Enter") p.onRename(it, (e.target as HTMLInputElement).value.trim() || it.name); }} className="min-w-0 rounded border border-[#0369a1] px-1 py-0.5 text-[14px] outline-none" />
              ) : (
                <span onDoubleClick={(e) => { e.stopPropagation(); p.onStartRename(it.id); }} className={`min-w-0 truncate text-[14px] ${p.activeItemId === it.id ? "font-bold text-[#0c4a6e]" : "font-medium text-[#30363A]"}`}>{it.name}</span>
              )}
              <span className="whitespace-nowrap text-right text-[12px] font-semibold text-[#586066]">{fmt(itemTotal(it), it.measurement_type ?? "area")}</span>
              <button onClick={(e) => { e.stopPropagation(); p.onToggleVisible(it); }} className="grid h-7 w-7 place-items-center rounded text-[#586066] hover:bg-[#E8EBED]">{it.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}</button>
              <button onClick={(e) => { e.stopPropagation(); p.onDeleteItem(it); }} className="grid h-7 w-7 place-items-center rounded text-[#8A9196] opacity-0 hover:text-[#dc2626] group-hover:opacity-100"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
