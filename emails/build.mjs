// Builds every sample email into public/emails/<slug>.html (plus a plain
// "before" version) and writes public/emails/manifest.json.
//
//   npm run emails:build
//
// Image paths in the built files are relative (img/…) so they work on this
// site. Before sending a template for real, upload the images to your ESP or
// CDN and replace "img/" with that absolute URL.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { plainHtml } from "./plain.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "emails");
mkdirSync(out, { recursive: true });

// Every file in emails/templates is picked up. A file exports either one
// email ({ meta, html }) or several ({ emails: [{ meta, html }, ...] }).
// The original seven come first, in this order; the rest follow by file name.
const FIRST = ["graphwell", "brookfold", "pocketlane", "farewind", "morrow", "margin", "tandemly"];
const files = readdirSync(path.join(root, "emails", "templates")).filter((f) => f.endsWith(".mjs")).map((f) => f.replace(/\.mjs$/, ""));
const TEMPLATES = [...FIRST.filter((f) => files.includes(f)), ...files.filter((f) => !FIRST.includes(f)).sort()];

const manifest = [];
for (const name of TEMPLATES) {
  const mod = await import(`./templates/${name}.mjs`);
  for (const { meta, html } of mod.emails ?? [{ meta: mod.meta, html: mod.html }]) {
  writeFileSync(path.join(out, `${meta.slug}.html`), html);
  writeFileSync(path.join(out, `${meta.slug}-plain.html`), plainHtml(meta.slug, meta.subject, meta.preheader));
  manifest.push({ ...meta, bytes: Buffer.byteLength(html) });
  console.log(`${meta.slug}.html  ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
  }
}
// Keep entries you added by hand for your own emails (any slug not built here).
const manifestPath = path.join(out, "manifest.json");
if (existsSync(manifestPath)) {
  const built = new Set(manifest.map((m) => m.slug));
  for (const entry of JSON.parse(readFileSync(manifestPath, "utf8"))) if (!built.has(entry.slug)) manifest.push(entry);
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

// Preview copies for the site's studio and project viewer: identical, except
// that links can't be clicked (they are sample links). Made for every .html in
// public/emails, so your own emails dropped in there get one too.
const previewDir = path.join(out, "preview");
mkdirSync(previewDir, { recursive: true });
const PREVIEW_CSS = "<style>a{pointer-events:none !important;cursor:default !important;}</style>";
for (const file of readdirSync(out).filter((f) => f.endsWith(".html"))) {
  // The copies sit one folder deeper: point relative image paths back up.
  const html = readFileSync(path.join(out, file), "utf8").replace(/(src|href)="img\//g, '$1="../img/');
  const copy = html.includes("</head>") ? html.replace("</head>", `${PREVIEW_CSS}
</head>`) : PREVIEW_CSS + html;
  writeFileSync(path.join(previewDir, file), copy);
}
console.log(`preview copies: ${readdirSync(previewDir).length}`);
