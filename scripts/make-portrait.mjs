// Makes the site's two versions of the portrait in assets/anant-goyal.png
// (a cut-out with a transparent background):
//   public/images/anant-goyal.webp         the cut-out, for the contact section
//   public/images/anant-goyal-avatar.webp  a round avatar on the site's
//                                          blue-violet sphere, for nav and hero
//
//   node scripts/make-portrait.mjs
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "assets", "anant-goyal.png");
const out = (f) => path.join(root, "public", "images", f);

// 1. Cut-out, transparent background kept.
await sharp(src).webp({ quality: 88, alphaQuality: 95 }).toFile(out("anant-goyal.webp"));

// 2. Avatar: head and shoulders over a glossy sphere in the site's colours.
const S = 192;
const sphere = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <defs>
    <radialGradient id="g" cx="0.36" cy="0.3" r="0.85">
      <stop offset="0" stop-color="#b4c4ff"/>
      <stop offset="0.45" stop-color="#5b5bff"/>
      <stop offset="0.8" stop-color="#6a2be8"/>
      <stop offset="1" stop-color="#2c0a77"/>
    </radialGradient>
  </defs>
  <circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="url(#g)"/>
</svg>`);
// Crop around the head (the source is 500x500, face left of centre).
const H = Math.round(S * 0.94);
const head = await sharp(src).extract({ left: 20, top: 0, width: 460, height: 460 }).resize(H, H).png().toBuffer();
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="#fff"/></svg>`);
await sharp(sphere)
  .composite([{ input: head, left: Math.round((S - H) / 2), top: Math.round(S * 0.1) }, { input: mask, blend: "dest-in" }])
  .webp({ quality: 88, alphaQuality: 95 })
  .toFile(out("anant-goyal-avatar.webp"));

console.log("wrote public/images/anant-goyal.webp and anant-goyal-avatar.webp");
