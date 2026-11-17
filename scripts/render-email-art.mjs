// Renders the email artwork and photo crops into public/emails/img.
//
//   npm run emails:art
//
// 1. Each emails/art/<name>.html scene is screenshotted at 2x (its #art
//    element) and flattened onto the colour it sits on in the email, then saved
//    as JPG: email clients don't all support WebP, and JPG keeps gradients small.
// 2. Each stand-in photograph in emails/assets/img is cropped to the slot it
//    fills in the email, at 2x for sharp retina rendering.
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artDir = path.join(root, "emails", "art");
const photoDir = path.join(root, "emails", "assets", "img");
const outDir = path.join(root, "public", "emails", "img");
mkdirSync(outDir, { recursive: true });

// name → colour behind it in the email
const ART = {
  "graphwell-hero": "#0B1B3F",
  "graphwell-reports": "#FFFFFF",
  "graphwell-alerts": "#FFFFFF",
  "pocketlane-hero": "#0E0F1A",
  "pocketlane-split": "#0E0F1A",
  "tandemly-hero": "#F1EFFA",
};

// Parameterised scenes rendered from emails/art/scene.html: name → [query, colour behind it]
const SCENES = {
  "nightreel-hero": ["mode=hero&w=600&h=340&photo=461&kicker=New%20series&title=The%20Long%20North&sub=All%20six%20episodes%20from%20Friday", "#0b0b10"],
  "nightreel-canyon": ["mode=poster&w=176&h=250&photo=564&kicker=Film&title=Red%20Canyon", "#0b0b10"],
  "nightreel-water": ["mode=poster&w=176&h=250&photo=306&kicker=Documentary&title=Still%20Water", "#0b0b10"],
  "nightreel-rain": ["mode=poster&w=176&h=250&photo=115&kicker=Series&title=After%20Rain", "#0b0b10"],
  "bloom-thumb": ["mode=thumb&w=552&h=310&photo=c96&title=The%204-minute%20pour-over&dur=12:48", "#ffffff"],
  "satellites-album": ["mode=album&w=520&h=520&kicker=Paper%20Satellites&title=Night%20Signals", "#111018"],
};

// output name → [library id, width, height] (CSS px; written at 2x)
const PHOTOS = {
  "brookfold-hero": ["m61777177", 600, 380],
  "brookfold-lamp": ["d88", 264, 300],
  "brookfold-mugs": ["635", 264, 300],
  "brookfold-bowl": ["326", 264, 300],
  "brookfold-honey": ["312", 264, 300],
  "morrow-hero": ["c70", 600, 340],
  "morrow-latte": ["c7", 264, 200],
  "morrow-roast": ["m147143963", 264, 200],
  "morrow-pourover": ["c96", 520, 260],
  "margin-lead": ["24", 520, 300],
  "margin-books": ["c877", 120, 120],
  "margin-notebook": ["d183", 120, 120],
  "margin-tea": ["365", 120, 120],
  "farewind-hero": ["702", 600, 320],
  "farewind-lisbon": ["308", 264, 176],
  "farewind-bergen": ["188", 264, 176],
  "farewind-madeira": ["323", 264, 176],
  "crumb-post": ["999", 520, 520],
  "pantry-bowl": ["488", 220, 150],
  "saffron-veg": ["292", 552, 300],
  "saffron-bowl": ["488", 264, 200],
  "fold-lead": ["322", 552, 300],
  "fold-side": ["308", 264, 170],
  "fold-roofs": ["188", 264, 170],
  "grid-mugs": ["635", 552, 330],
  "nordlys-lamp": ["d88", 440, 520],
};

function sourceFor(id) {
  for (const f of [`photo-${id}.jpg`, `photo-${id}-960.jpg`, `photo-${id}-500.jpg`]) {
    const p = path.join(photoDir, f);
    if (existsSync(p)) return p;
  }
  throw new Error(`no source photo for ${id}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 800, height: 600 } });
for (const [name, bg] of Object.entries(ART)) {
  await page.goto(pathToFileURL(path.join(artDir, `${name}.html`)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.locator("#art").screenshot({ omitBackground: true });
  const out = path.join(outDir, `${name}.jpg`);
  await sharp(png).flatten({ background: bg }).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log("art  ", name);
}
for (const [name, [query, bg]] of Object.entries(SCENES)) {
  await page.goto(pathToFileURL(path.join(artDir, "scene.html")).href + "?" + query, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.locator("#art").screenshot();
  await sharp(png).flatten({ background: bg }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(outDir, `${name}.jpg`));
  console.log("scene", name);
}
await browser.close();

for (const [name, [id, w, h]] of Object.entries(PHOTOS)) {
  const out = path.join(outDir, `${name}.jpg`);
  await sharp(sourceFor(id))
    .resize(w * 2, h * 2, { fit: "cover", position: "attention" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(out);
  console.log("photo", name, `(${id})`);
}
