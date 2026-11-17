// Runs after `next build`. Next's static export writes each route's prefetch
// data as `__next.<route>.<segment>.txt`; on Windows this version nests them in
// folders instead (`__next.work/$d$slug/__PAGE__.txt`), so the browser's
// prefetch requests 404 and links fall back to full page loads. This writes
// the flat copies next to them. Where the names are already flat (Linux,
// Vercel) there is nothing to do.
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
let written = 0;

function filesUnder(dir, rel = []) {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? filesUnder(p, [...rel, name]) : [[p, [...rel, name]]];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const [file, parts] of filesUnder(p)) {
        const flat = path.join(dir, [name, ...parts].join("."));
        if (!existsSync(flat)) {
          writeFileSync(flat, readFileSync(file));
          written++;
        }
      }
    } else if (name !== "_next") {
      walk(p);
    }
  }
}

if (existsSync(out)) walk(out);
console.log(`fix-export: ${written} prefetch file(s) flattened`);
