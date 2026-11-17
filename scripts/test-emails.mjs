// Checks every built email for the techniques real inboxes need, then renders
// each one at phone and desktop widths in Chromium.
//
//   npm run emails:test
//
// What this can and cannot tell you: it proves the HTML follows email-safe
// rules and lays out correctly in a WebKit/Blink-style renderer at 320–680px.
// It does not replace a render test in real clients (Outlook for Windows uses
// Word's engine, Gmail rewrites CSS). Before a real send, run the file through
// Litmus or Email on Acid, or send tests to Gmail, Outlook and Apple Mail.
import { chromium } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "emails");
const manifest = JSON.parse(readFileSync(path.join(dir, "manifest.json"), "utf8"));

let failures = 0;
const fail = (slug, msg) => {
  failures++;
  console.log(`  FAIL ${slug}: ${msg}`);
};

// ── Static checks ───────────────────────────────────────────────────────────
for (const { slug } of manifest) {
  const html = readFileSync(path.join(dir, `${slug}.html`), "utf8");
  const kb = Buffer.byteLength(html) / 1024;
  if (kb > 102) fail(slug, `${kb.toFixed(1)} KB: Gmail clips messages over 102 KB`);
  if (/<script/i.test(html)) fail(slug, "contains <script> (stripped by every client)");
  if (/<form/i.test(html)) fail(slug, "contains <form>");
  if (/<svg/i.test(html)) fail(slug, "contains inline SVG (Gmail and Outlook drop it)");
  if (!/<meta name="viewport"/.test(html)) fail(slug, "no viewport meta");
  if (!/@media screen and \(max-width:/.test(html)) fail(slug, "no responsive media query");
  if (!/display:none;[^"]*max-height:0/.test(html)) fail(slug, "no hidden preheader");
  const links = html.match(/<link [^>]*>/g) || [];
  for (const l of links) if (!/fonts\.googleapis\.com/.test(l)) fail(slug, `external stylesheet: ${l}`);
  const styles = html.match(/style="[^"]*"/g) || [];
  for (const s of styles) {
    if (/display:\s*(flex|grid)/.test(s)) fail(slug, `flex/grid layout in inline style: ${s.slice(0, 80)}`);
    if (/position:\s*(absolute|fixed|relative)/.test(s)) fail(slug, `positioning in inline style: ${s.slice(0, 80)}`);
  }
  const tables = html.match(/<table[^>]*>/g) || [];
  for (const t of tables) if (!/role="presentation"/.test(t)) fail(slug, `layout table without role="presentation": ${t.slice(0, 80)}`);
  const imgs = html.match(/<img [^>]*>/g) || [];
  for (const img of imgs) {
    if (!/ alt="[^"]+"/.test(img)) fail(slug, `image without alt text: ${img.slice(0, 80)}`);
    if (!/ width="\d+"/.test(img)) fail(slug, `image without a width attribute: ${img.slice(0, 80)}`);
    const src = img.match(/src="([^"]+)"/)?.[1];
    if (src && !/^https?:/.test(src) && !existsSync(path.join(dir, src))) fail(slug, `missing image file ${src}`);
    if (src && /\.(webp|svg)$/i.test(src)) fail(slug, `${src}: use JPG/PNG/GIF (Outlook for Windows shows no WebP)`);
  }
  const buttons = (html.match(/<!--\[if !mso\]><!--><a /g) || []).length;
  const vml = (html.match(/<v:roundrect/g) || []).length;
  if (buttons !== vml) fail(slug, `${buttons} buttons but ${vml} Outlook VML fallbacks`);
  console.log(`ok   ${slug}  ${kb.toFixed(1)} KB, ${imgs.length} images, ${buttons} buttons with VML, ${tables.length} tables`);
}

// ── Render checks ───────────────────────────────────────────────────────────
const browser = await chromium.launch();
for (const width of [320, 375, 600, 680]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const { slug } of manifest) {
    await page.goto(pathToFileURL(path.join(dir, `${slug}.html`)).href, { waitUntil: "networkidle" });
    const r = await page.evaluate(() => {
      const broken = [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src"));
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const stacks = [...document.querySelectorAll("div.stack")].map((d) => Math.round(d.getBoundingClientRect().width));
      return { broken, overflow, stacks };
    });
    if (r.broken.length) fail(slug, `${width}px: broken images ${r.broken.join(", ")}`);
    if (r.overflow > 0) fail(slug, `${width}px: page scrolls sideways by ${r.overflow}px`);
    if (width <= 375 && r.stacks.length) {
      // Columns must stack: each column as wide as the content area, not side by side.
      const narrow = r.stacks.filter((w) => w < width - 80);
      if (narrow.length) fail(slug, `${width}px: ${narrow.length} column(s) did not stack (${narrow.join(", ")}px)`);
    }
  }
  await page.close();
  console.log(`ok   rendered all emails at ${width}px`);
}
await browser.close();

console.log(failures ? `\n${failures} problem(s)` : "\nall email checks passed");
process.exit(failures ? 1 : 0);
