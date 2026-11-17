// Generates the services-list icons with OpenAI's image model (the same model the
// CarouseLabs app uses) and cuts them out onto a transparent background.
//
//   node outreach/gen-icons.mjs              generate all five (costs OpenAI credit)
//   node outreach/gen-icons.mjs reach track  generate only these
//   node outreach/gen-icons.mjs --cut        no API calls: re-cut the saved originals
//
// Originals are kept in outreach/art/ai/<id>.png, so re-cutting never costs anything.
// Output: public/email-assets/outreach/icon-3d-<id>.png (112 x 112, for a 56px display).
// The key is read from the CarouseLabs .env.local (OPENAI_API_KEY) and never printed.
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const rawDir = path.join(here, "art", "ai");
const outDir = path.join(root, "public", "email-assets", "outreach");
mkdirSync(rawDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

const STYLE =
  "A single premium 3D icon, rendered like a high-end tech product website illustration. " +
  "Smooth glossy materials (polished plastic and soft glass) with gentle specular highlights and subtle iridescent reflections. " +
  "Colour palette only: royal blue #2F4BFF, indigo #4B30EE, violet #7B3AEE, purple #A445F0, light periwinkle #B4C4FF highlights, " +
  "white details, and one small lime #D4FF5C accent. Soft studio lighting from the top-left. Three-quarter view, slightly from above. " +
  "The object is centred and fills about 70% of the frame, with clear empty space around it. " +
  "Isolated on a perfectly flat, pure white #FFFFFF background: no floor, no ground shadow, no reflection, no gradient, no border, no frame. " +
  "Clean simple rounded shapes, friendly and modern, not cartoonish. No text, letters, numbers or logos.";

const ICONS = {
  design: "The object: a glossy 3D envelope in blue and violet, slightly open, with a white letter rising out of it that shows a tiny colourful email layout (a small picture block, two short bars and a small lime pill button).",
  reach: "The object: a glossy 3D paper plane in blue and violet, mid-flight and tilted upward, with three small glossy dots trailing behind it.",
  track: "The object: a glossy 3D bar chart of three rounded bars rising from left to right (periwinkle, violet, royal blue) on a small rounded base, with a small round lime badge holding a white check mark.",
  personal: "The object: a glossy 3D round badge in violet and purple containing a simple person shape (round head and shoulders) in white, with a small lime four-pointed sparkle at its top-right.",
  software: "The object: a glossy 3D floating app window in indigo and blue with rounded corners, showing a tiny dashboard (a small line chart and two toggle switches, one lime), with a small glossy violet gear beside its lower corner.",
};

function openaiKey() {
  const env = readFileSync("C:/Users/anant/carouselabs/.env.local", "utf8");
  const m = env.match(/^OPENAI_API_KEY=(.*)$/m);
  if (!m) throw new Error("OPENAI_API_KEY not found in carouselabs/.env.local");
  return m[1].trim().replace(/^["']|["']$/g, "");
}

async function generate(id) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${openaiKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-image-2", prompt: `${STYLE} ${ICONS[id]}`, n: 1, size: "1024x1024", quality: "high" }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${id}: OpenAI ${res.status} ${json?.error?.message ?? ""}`);
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${id}: no image in the reply`);
  writeFileSync(path.join(rawDir, `${id}.png`), Buffer.from(b64, "base64"));
  console.log(`generated ${id}`);
}

// Removes the flat white background: flood-fill from the edges through near-white pixels,
// then soften the rim (partial alpha + white fringe removed) so it sits cleanly on any colour.
async function cut(id) {
  const { data, info } = await sharp(path.join(rawDir, `${id}.png`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const px = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
  // The model's background is neutral near-white (about 253,253,253); white parts of the
  // objects (the letter, highlights) are slightly blue-tinted, so only neutral white counts.
  const nearWhite = (i) => {
    const [r, g, b] = px(i);
    return Math.min(r, g, b) >= 249 && Math.max(r, g, b) - Math.min(r, g, b) <= 4;
  };
  const bg = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (bg[p] || !nearWhite(p)) continue;
    bg[p] = 1;
    const x = p % w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (p >= w) stack.push(p - w);
    if (p < w * (h - 1)) stack.push(p + w);
  }
  const out = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    let [r, g, b] = px(p);
    let a = 255;
    if (bg[p]) a = 0;
    else {
      const x = p % w;
      const rim = (x > 0 && bg[p - 1]) || (x < w - 1 && bg[p + 1]) || (p >= w && bg[p - w]) || (p < w * (h - 1) && bg[p + w]);
      if (rim) {
        // Edge pixel blended with white: estimate coverage from how far it is from white, un-mix the white.
        const cover = Math.min(1, Math.max(0.15, (255 - Math.min(r, g, b)) / 120));
        a = Math.round(cover * 255);
        const un = (c) => Math.max(0, Math.min(255, Math.round((c - 255 * (1 - cover)) / cover)));
        [r, g, b] = [un(r), un(g), un(b)];
      }
    }
    out[p * 4] = r;
    out[p * 4 + 1] = g;
    out[p * 4 + 2] = b;
    out[p * 4 + 3] = a;
  }
  // Trim to the object, pad a little, square it, size for a 56px display at 2x.
  const trimmed = await sharp(out, { raw: { width: w, height: h, channels: 4 } }).png().trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const side = Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 1.08);
  await sharp(trimmed.data)
    .resize(side, side, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(112, 112, { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, `icon-3d-${id}.png`));
  console.log(`cut icon-3d-${id}.png`);
}

const args = process.argv.slice(2);
const cutOnly = args.includes("--cut");
const ids = args.filter((a) => a in ICONS);
const todo = ids.length ? ids : Object.keys(ICONS);
if (!cutOnly) {
  const results = await Promise.allSettled(todo.map(generate));
  for (const r of results) if (r.status === "rejected") console.log("FAILED", r.reason.message);
}
for (const id of todo) if (existsSync(path.join(rawDir, `${id}.png`))) await cut(id);
