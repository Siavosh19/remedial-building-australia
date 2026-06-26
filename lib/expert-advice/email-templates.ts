// ─────────────────────────────────────────────────────────────────────────────
// Expert Remedial Advice — per-service notification email templates.
//
// Each service can have its own tailored template that mirrors the fields shown
// on that service's request page. renderEmail() dispatches on `service`; any
// service without a dedicated template falls back to renderGeneric().
//
// Files are shown two ways for reliability:
//   • images render inline (Supabase public URLs) AND link to the full file
//   • documents (PDF/DOC) render as a clickable "open" link
// Files are also attached to the email by the API route (base64-encoded), but
// the inline links always work even if an email client strips attachments.
// ─────────────────────────────────────────────────────────────────────────────

export type SubmittedFile = {
  key: string;          // form field name, e.g. "defect1CloseupPhotos"
  label: string;        // human label, e.g. "Defect 1 — Close-up Photos"
  filename: string;
  contentType: string;
  url: string;          // Supabase public URL ("" if upload failed)
  isImage: boolean;
};

export type Submission = {
  service: string;
  serviceName: string;
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  address: string;
  description: string;
  urgency: string;
  /** All extra (non-common) text fields, in submission order. */
  extraFields: { key: string; label: string; value: string }[];
  /** Quick lookup of extra text fields by form field name. */
  fieldMap: Record<string, string>;
  files: SubmittedFile[];
  requestId: string | null;
  submittedAt: string;
  ipAddress: string | null;
  disclaimerVersion: string;
};

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── Shared HTML building blocks ──────────────────────────────────────────────

const C = {
  ink: "#0f172a",
  sub: "#64748b",
  line: "#e2e8f0",
  panel: "#f8fafc",
  link: "#1d4ed8",
};

function tableRow(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:7px 12px;background:${C.panel};font-size:12px;font-weight:bold;color:${C.sub};vertical-align:top;width:200px;border:1px solid ${C.line};">${esc(label)}</td>
    <td style="padding:7px 12px;font-size:14px;color:${C.ink};border:1px solid ${C.line};white-space:pre-wrap;">${esc(value)}</td>
  </tr>`;
}

function sectionTitle(t: string): string {
  return `<p style="margin:26px 0 12px;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:${C.sub};">${esc(t)}</p>`;
}

function fileHtml(f: SubmittedFile): string {
  if (f.isImage && f.url) {
    return `<a href="${f.url}" style="display:inline-block;margin:0 8px 8px 0;text-decoration:none;">
      <img src="${f.url}" alt="${esc(f.filename)}" style="display:block;max-width:240px;max-height:200px;border-radius:8px;border:1px solid ${C.line};" />
      <span style="display:block;margin-top:4px;font-size:11px;color:${C.link};max-width:240px;word-break:break-all;">${esc(f.filename)}</span>
    </a>`;
  }
  if (f.url) {
    return `<a href="${f.url}" style="display:inline-block;margin:0 8px 8px 0;padding:8px 12px;border:1px solid ${C.line};border-radius:8px;font-size:13px;font-weight:bold;color:${C.link};text-decoration:none;">📄 ${esc(f.filename)} — open</a>`;
  }
  return `<span style="display:inline-block;margin:0 8px 8px 0;padding:8px 12px;border:1px solid ${C.line};border-radius:8px;font-size:13px;color:${C.sub};">${esc(f.filename)} (attached to this email)</span>`;
}

function fileGroup(title: string, files: SubmittedFile[]): string {
  if (!files.length) return "";
  return `<p style="margin:10px 0 6px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.6px;color:${C.sub};">${esc(title)}</p>
    <div style="margin-bottom:8px;">${files.map(fileHtml).join("")}</div>`;
}

function shell(sub: Submission, bodyInner: string): string {
  return `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:720px;margin:0 auto;color:${C.ink};">
  <div style="background:#0f1f3d;padding:20px 28px;border-bottom:3px solid #b91c1c;">
    <p style="margin:0;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">Expert Advice Request</p>
    <p style="margin:4px 0 0;font-size:18px;font-weight:bold;color:#ffffff;">${esc(sub.serviceName)}</p>
    <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">${esc(sub.submittedAt)}${sub.requestId ? ` · Request #${esc(sub.requestId)}` : ""}</p>
  </div>
  <div style="padding:28px;background:#ffffff;border:1px solid ${C.line};border-top:none;">
    ${bodyInner}
    ${disclaimerBox(sub)}
    <hr style="border:none;border-top:1px solid ${C.line};margin:22px 0 14px;" />
    <p style="margin:0;font-size:12px;color:#94a3b8;">Submitted via remedialbuildingaustralia.com.au · Reply to: <a href="mailto:${esc(sub.email)}" style="color:#94a3b8;">${esc(sub.email)}</a></p>
  </div>
</div>`;
}

function disclaimerBox(sub: Submission): string {
  return `<div style="background:#fefce8;border:1px solid #fde047;border-radius:8px;padding:16px;margin-top:24px;">
    <p style="margin:0 0 8px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#92400e;">Disclaimer Acceptance</p>
    <table style="width:100%;border-collapse:collapse;">
      ${tableRow("Disclaimer accepted", "Yes")}
      ${tableRow("Accepted at", sub.submittedAt)}
      ${tableRow("Disclaimer version", sub.disclaimerVersion || "1.0")}
      ${sub.ipAddress ? tableRow("IP address", sub.ipAddress) : ""}
    </table>
  </div>`;
}

function customerDetails(sub: Submission): string {
  return `${sectionTitle("Customer Details")}
    <table style="width:100%;border-collapse:collapse;">
      ${sub.requestId ? tableRow("Request ID", sub.requestId) : ""}
      ${tableRow("Name", sub.name)}
      ${tableRow("Email", sub.email)}
      ${tableRow("Phone", sub.phone)}
      ${tableRow("Property type", sub.propertyType)}
      ${tableRow("Building address / suburb", sub.address)}
      ${tableRow("Urgency", sub.urgency)}
    </table>`;
}

function descriptionBlock(sub: Submission, label = "Description of the Issue"): string {
  if (!sub.description) return "";
  return `${sectionTitle(label)}
    <div style="background:${C.panel};border:1px solid ${C.line};border-radius:6px;padding:14px;font-size:14px;line-height:1.7;color:${C.ink};white-space:pre-wrap;">${esc(sub.description)}</div>`;
}

// ─── Helpers for grouping files / leftover fields ─────────────────────────────

function filesByKey(sub: Submission, key: string): SubmittedFile[] {
  return sub.files.filter((f) => f.key === key);
}

function leftoverFields(sub: Submission, handled: Set<string>): string {
  const rows = sub.extraFields
    .filter((f) => !handled.has(f.key))
    .map((f) => tableRow(f.label, f.value))
    .join("");
  if (!rows) return "";
  return `${sectionTitle("Additional Information")}<table style="width:100%;border-collapse:collapse;">${rows}</table>`;
}

// ─── Service: Preliminary Defect Assessment ───────────────────────────────────

function renderPreliminaryDefect(sub: Submission): { html: string; text: string } {
  const handled = new Set<string>();

  // Discover defect numbers from any defect-prefixed text field or file key.
  const defectNums = new Set<number>();
  const reField = /^defect(\d+)(Location|Type)$/;
  for (const f of sub.extraFields) {
    const m = reField.exec(f.key);
    if (m) defectNums.add(Number(m[1]));
  }
  const reFile = /^defect(\d+)(CloseupPhotos|WidePhotos)$/;
  for (const f of sub.files) {
    const m = reFile.exec(f.key);
    if (m) defectNums.add(Number(m[1]));
  }
  const ordered = [...defectNums].sort((a, b) => a - b);

  // ── Defects HTML ──
  const defectsHtml = ordered
    .map((n) => {
      const loc = sub.fieldMap[`defect${n}Location`] ?? "";
      const type = sub.fieldMap[`defect${n}Type`] ?? "";
      const closeup = filesByKey(sub, `defect${n}CloseupPhotos`);
      const wide = filesByKey(sub, `defect${n}WidePhotos`);
      [`defect${n}Location`, `defect${n}Type`].forEach((k) => handled.add(k));
      if (!loc && !type && !closeup.length && !wide.length) return "";
      return `<div style="border:1px solid ${C.line};border-radius:10px;padding:16px;margin-bottom:14px;">
        <p style="margin:0 0 10px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.8px;color:#b91c1c;">Defect ${n}</p>
        <table style="width:100%;border-collapse:collapse;">
          ${tableRow("Location", loc)}
          ${tableRow("Visible issue", type)}
        </table>
        ${fileGroup("Close-up photos", closeup)}
        ${fileGroup("Wide-angle photos", wide)}
      </div>`;
    })
    .join("");

  // ── Timeline ──
  const whenStarted = sub.fieldMap["whenIssueStarted"] ?? "";
  const rain = sub.fieldMap["rainPattern"] ?? "";
  handled.add("whenIssueStarted");
  handled.add("rainPattern");
  const timelineHtml =
    whenStarted || rain
      ? `${sectionTitle("Issue Timeline")}<table style="width:100%;border-collapse:collapse;">
          ${tableRow("When did the issue start?", whenStarted)}
          ${tableRow("During rain or all the time?", rain)}
        </table>`
      : "";

  // ── Strata plan + documents ──
  const strata = filesByKey(sub, "strataPlan");
  const documents = filesByKey(sub, "documents");
  const docsHtml =
    strata.length || documents.length
      ? `${sectionTitle("Plans & Documents")}
          ${fileGroup("Strata plan", strata)}
          ${fileGroup("Additional documents", documents)}`
      : "";

  const body = [
    customerDetails(sub),
    descriptionBlock(sub),
    defectsHtml ? `${sectionTitle("Defects to Assess")}${defectsHtml}` : "",
    timelineHtml,
    docsHtml,
    leftoverFields(sub, handled),
  ].join("");

  // ── Plain-text version ──
  const lines: string[] = [
    `Expert Advice Request — ${sub.serviceName}`,
    `Submitted: ${sub.submittedAt}`,
    sub.requestId ? `Request ID: ${sub.requestId}` : "",
    ``,
    `CUSTOMER DETAILS`,
    `Name: ${sub.name}`,
    `Email: ${sub.email}`,
    sub.phone ? `Phone: ${sub.phone}` : "",
    sub.propertyType ? `Property type: ${sub.propertyType}` : "",
    `Building address: ${sub.address}`,
    sub.urgency ? `Urgency: ${sub.urgency}` : "",
    ``,
    `DESCRIPTION`,
    sub.description,
    ``,
  ];
  for (const n of ordered) {
    const loc = sub.fieldMap[`defect${n}Location`] ?? "";
    const type = sub.fieldMap[`defect${n}Type`] ?? "";
    const closeup = filesByKey(sub, `defect${n}CloseupPhotos`);
    const wide = filesByKey(sub, `defect${n}WidePhotos`);
    if (!loc && !type && !closeup.length && !wide.length) continue;
    lines.push(`DEFECT ${n}`);
    if (loc) lines.push(`  Location: ${loc}`);
    if (type) lines.push(`  Visible issue: ${type}`);
    [...closeup, ...wide].forEach((f) =>
      lines.push(`  Photo: ${f.filename}${f.url ? ` — ${f.url}` : " (attached)"}`),
    );
    lines.push("");
  }
  if (whenStarted) lines.push(`When did the issue start: ${whenStarted}`);
  if (rain) lines.push(`During rain or all the time: ${rain}`);
  if (whenStarted || rain) lines.push("");
  [...strata, ...documents].forEach((f) =>
    lines.push(`Document: ${f.filename}${f.url ? ` — ${f.url}` : " (attached)"}`),
  );
  lines.push("", `Disclaimer accepted: Yes (version ${sub.disclaimerVersion || "1.0"})`);

  return {
    html: shell(sub, body),
    text: lines.filter((l) => l !== undefined).join("\n"),
  };
}

// ─── Generic fallback (used by services without a dedicated template yet) ──────

function renderGeneric(sub: Submission): { html: string; text: string } {
  const handled = new Set<string>();
  const allFiles = sub.files;
  const filesHtml = allFiles.length
    ? `${sectionTitle("Uploaded Files")}<div>${allFiles.map(fileHtml).join("")}</div>`
    : "";

  const body = [
    customerDetails(sub),
    descriptionBlock(sub),
    leftoverFields(sub, handled),
    filesHtml,
  ].join("");

  const text = [
    `Expert Advice Request — ${sub.serviceName}`,
    `Submitted: ${sub.submittedAt}`,
    sub.requestId ? `Request ID: ${sub.requestId}` : "",
    ``,
    `Name: ${sub.name}`,
    `Email: ${sub.email}`,
    sub.phone ? `Phone: ${sub.phone}` : "",
    sub.propertyType ? `Property type: ${sub.propertyType}` : "",
    `Building address: ${sub.address}`,
    sub.urgency ? `Urgency: ${sub.urgency}` : "",
    ``,
    `Description:`,
    sub.description,
    ``,
    ...sub.extraFields.map((f) => `${f.label}: ${f.value}`),
    ``,
    ...allFiles.map((f) => `File (${f.label}): ${f.filename}${f.url ? ` — ${f.url}` : " (attached)"}`),
    ``,
    `Disclaimer accepted: Yes (version ${sub.disclaimerVersion || "1.0"})`,
  ]
    .filter((l) => l !== "")
    .join("\n");

  return { html: shell(sub, body), text };
}

// ─── Spec-driven templates (one per service, mirroring its request form) ──────
//
// Each service declares its fields/files in the SAME order they appear on the
// page. renderFromSpec walks the spec so the email reads as a copy of the form.

type SpecEntry =
  | { kind: "field"; key: string; label: string }
  | { kind: "file"; key: string; label: string };

interface ServiceSpec {
  descriptionLabel?: string;
  entries: SpecEntry[];
}

const SERVICE_SPECS: Record<string, ServiceSpec> = {
  "scope-quote-tender-review": {
    entries: [
      { kind: "file", key: "scopeDocument", label: "Scope / Quote / Tender Document" },
      { kind: "field", key: "quoteCount", label: "Number of quotes being reviewed" },
      { kind: "field", key: "reviewPurpose", label: "Purpose of review" },
      { kind: "field", key: "worksStarted", label: "Have the works started?" },
      { kind: "field", key: "mainConcern", label: "Main concern" },
      { kind: "file", key: "strataPlan", label: "Strata plan" },
    ],
  },
  "remedial-budget-estimate": {
    descriptionLabel: "Description of Works Needing Budget Estimate",
    entries: [
      { kind: "field", key: "accessRequirement", label: "Access requirement" },
      { kind: "field", key: "purpose", label: "Purpose" },
      { kind: "file", key: "strataPlan", label: "Strata plan" },
      { kind: "file", key: "photos", label: "Photos" },
      { kind: "file", key: "drawingsPlans", label: "Drawings & plans" },
      { kind: "file", key: "reportsDocuments", label: "Reports & documents" },
    ],
  },
  "building-repair-strategy-advice": {
    entries: [
      { kind: "field", key: "identifiedDefect", label: "Identified defect" },
      { kind: "file", key: "reportsInvestigation", label: "Reports / investigation results" },
      { kind: "field", key: "proposedRepairOptions", label: "Proposed repair options" },
      { kind: "field", key: "previousRepairHistory", label: "Previous repair history" },
      { kind: "field", key: "mainDecisionNeeded", label: "Main decision needed" },
      { kind: "field", key: "urgencySafetyConcern", label: "Urgency or safety concern" },
      { kind: "file", key: "strataPlan", label: "Strata plan" },
    ],
  },
  "pre-purchase-apartment-defect-review": {
    entries: [
      { kind: "file", key: "strataReport", label: "Strata report" },
      { kind: "file", key: "agmMinutes", label: "AGM / committee minutes" },
      { kind: "file", key: "capitalWorksFund", label: "Capital works fund / levy information" },
      { kind: "file", key: "buildingInspectionReport", label: "Building inspection report" },
      { kind: "field", key: "listingLink", label: "Listing link" },
      { kind: "field", key: "auctionDeadline", label: "Auction / offer deadline" },
      { kind: "field", key: "mainConcern", label: "Main concern" },
      { kind: "file", key: "strataPlan", label: "Strata plan" },
    ],
  },
  "capital-works-forecast": {
    entries: [
      { kind: "field", key: "numberOfLots", label: "Number of lots / units" },
      { kind: "field", key: "buildingAge", label: "Approximate building age" },
      { kind: "file", key: "capitalWorksPlan", label: "Existing capital works plan" },
      { kind: "file", key: "defectReports", label: "Defect reports" },
      { kind: "file", key: "engineeringReports", label: "Engineering reports" },
      { kind: "file", key: "waterproofingReports", label: "Waterproofing reports" },
      { kind: "field", key: "knownUpcomingWorks", label: "Known upcoming works" },
      { kind: "field", key: "mainPurpose", label: "Main purpose" },
      { kind: "file", key: "strataPlan", label: "Strata plan" },
    ],
  },
};

function renderFromSpec(sub: Submission, spec: ServiceSpec): { html: string; text: string } {
  const handled = new Set<string>();
  const htmlBlocks: string[] = [];
  const textLines: string[] = [];

  const entries = spec.entries;
  let i = 0;
  while (i < entries.length) {
    const entry = entries[i];
    if (entry.kind === "field") {
      // Group consecutive fields into one table.
      const rows: string[] = [];
      while (i < entries.length && entries[i].kind === "field") {
        const e = entries[i] as Extract<SpecEntry, { kind: "field" }>;
        handled.add(e.key);
        const v = sub.fieldMap[e.key] ?? "";
        if (v) {
          rows.push(tableRow(e.label, v));
          textLines.push(`${e.label}: ${v}`);
        }
        i++;
      }
      if (rows.length) {
        htmlBlocks.push(`<table style="width:100%;border-collapse:collapse;margin-bottom:10px;">${rows.join("")}</table>`);
      }
    } else {
      handled.add(entry.key);
      const files = filesByKey(sub, entry.key);
      if (files.length) {
        htmlBlocks.push(fileGroup(entry.label, files));
        files.forEach((f) =>
          textLines.push(`${entry.label}: ${f.filename}${f.url ? ` — ${f.url}` : " (attached)"}`),
        );
      }
      i++;
    }
  }

  // Catch-all for any uploaded files whose key wasn't declared in the spec.
  const extraFiles = sub.files.filter((f) => !handled.has(f.key));
  if (extraFiles.length) {
    htmlBlocks.push(fileGroup("Other files", extraFiles));
    extraFiles.forEach((f) =>
      textLines.push(`Other file: ${f.filename}${f.url ? ` — ${f.url}` : " (attached)"}`),
    );
  }

  const descLabel = spec.descriptionLabel ?? "Description of the Issue";
  const body = [
    customerDetails(sub),
    descriptionBlock(sub, descLabel),
    htmlBlocks.length ? `${sectionTitle("Request Details")}${htmlBlocks.join("")}` : "",
    leftoverFields(sub, handled),
  ].join("");

  const leftoverText = sub.extraFields
    .filter((f) => !handled.has(f.key))
    .map((f) => `${f.label}: ${f.value}`);

  const text = [
    `Expert Advice Request — ${sub.serviceName}`,
    `Submitted: ${sub.submittedAt}`,
    sub.requestId ? `Request ID: ${sub.requestId}` : "",
    ``,
    `CUSTOMER DETAILS`,
    `Name: ${sub.name}`,
    `Email: ${sub.email}`,
    sub.phone ? `Phone: ${sub.phone}` : "",
    sub.propertyType ? `Property type: ${sub.propertyType}` : "",
    `Building address: ${sub.address}`,
    sub.urgency ? `Urgency: ${sub.urgency}` : "",
    ``,
    descLabel.toUpperCase(),
    sub.description,
    ``,
    `REQUEST DETAILS`,
    ...textLines,
    ...leftoverText,
    ``,
    `Disclaimer accepted: Yes (version ${sub.disclaimerVersion || "1.0"})`,
  ]
    .filter((l) => l !== "")
    .join("\n");

  return { html: shell(sub, body), text };
}

// ─── Dispatch ─────────────────────────────────────────────────────────────────

export function renderEmail(sub: Submission): { html: string; text: string } {
  if (sub.service === "preliminary-defect-assessment") return renderPreliminaryDefect(sub);
  const spec = SERVICE_SPECS[sub.service];
  if (spec) return renderFromSpec(sub, spec);
  return renderGeneric(sub);
}
