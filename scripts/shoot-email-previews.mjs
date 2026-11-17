// Screenshots every built email into public/previews as WebP:
//   <slug>-desktop.webp  full length at 680px wide (the desktop inbox width)
//   <slug>-mobile.webp   full length at 375px wide (an iPhone screen)
//   <slug>-plain.webp    the plain "before" version at 680px
// The gallery, service cards and hero use these images, so the page stays
// light; the studio and the project modal load the real HTML in an iframe.
//
//   npm run emails:previews
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { existsSync, readFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const emails = path.join(root, "public", "emails");
const out = path.join(root, "public", "previews");
mkdirSync(out, { recursive: true });
const manifest = JSON.parse(readFileSync(path.join(emails, "manifest.json"), "utf8"));

const SHOTS = [
  { suffix: "desktop", width: 680, scale: 1.5, file: (s) => `${s}.html` },
  { suffix: "mobile", width: 375, scale: 2, file: (s) => `${s}.html` },
  { suffix: "plain", width: 680, scale: 1.5, file: (s) => `${s}-plain.html` },
];

const SMALL = { desktop: 520, mobile: 300, plain: 520 };

const browser = await chromium.launch();
for (const shot of SHOTS) {
  const page = await browser.newPage({ viewport: { width: shot.width, height: 900 }, deviceScaleFactor: shot.scale });
  for (const { slug } of manifest) {
    if (!existsSync(path.join(emails, shot.file(slug)))) {
      console.log(`skip ${shot.file(slug)} (no file)`);
      continue;
    }
    await page.goto(pathToFileURL(path.join(emails, shot.file(slug))).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ fullPage: true });
    const meta = await sharp(png).metadata();
    const file = path.join(out, `${slug}-${shot.suffix}.webp`);
    // Thumbnails never show more than ~1.5x their CSS width: scale to 1.5x of 680/375.
    await sharp(png)
      .resize({ width: Math.round(shot.width * (shot.suffix === "mobile" ? 2 : 1.5)) })
      .webp({ quality: 78 })
      .toFile(file);
    // A small copy for cards and thumbnails (picked through srcset).
    {
      await sharp(png)
        .resize({ width: SMALL[shot.suffix] })
        .webp({ quality: 76 })
        .toFile(file.replace(/\.webp$/, "-sm.webp"));
    }
    console.log(`${slug}-${shot.suffix}.webp  ${meta.width}x${meta.height}`);
  }
  await page.close();
}
await browser.close();
