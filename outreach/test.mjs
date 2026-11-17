// Checks the cold-outreach email: the same email-safe rules as the portfolio emails
// (scripts/test-emails.mjs), renders at phone and desktop widths, and every link and
// image answering on the live site.
//
//   node outreach/test.mjs        (after node outreach/build.mjs)
//
// It cannot replace a send test: before a campaign, send it to your own Gmail and
// Outlook (or run it through Litmus / Email on Acid).
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(here, "dist", "cold-outreach.html");
const html = readFileSync(file, "utf8");
let failures = 0;
const check = (ok, msg) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${msg}`);
  if (!ok) failures++;
};

// ── Email-safe rules ────────────────────────────────────────────────────────
const kb = Buffer.byteLength(html) / 1024;
check(kb < 102, `${kb.toFixed(1)} KB, under Gmail's 102 KB clipping limit`);
check(!/<script|<form|<svg|<video|<iframe/i.test(html), "no script, form, svg, video or iframe");
check(/<meta name="viewport"/.test(html) && /@media screen and \(max-width:/.test(html), "viewport meta and a responsive media query");
check(/display:none;[^"]*max-height:0/.test(html), "hidden preheader");
const styles = html.match(/style="[^"]*"/g) || [];
check(!styles.some((s) => /display:\s*(flex|grid)|position:\s*(absolute|fixed|relative)/.test(s)), "no flex, grid or positioning in inline styles");
const tables = html.match(/<table[^>]*>/g) || [];
check(tables.every((t) => /role="presentation"/.test(t)), `every layout table has role="presentation" (${tables.length} tables)`);
const imgs = html.match(/<img [^>]*>/g) || [];
check(imgs.every((i) => / alt="[^"]*"/.test(i) && / width="\d+"/.test(i)), `every image has an alt attribute and a width (${imgs.length} images)`);
// Decorative icons sit beside their own titles (empty alt is right); the picture and the photo need words.
check(imgs.filter((i) => !/icon-/.test(i)).every((i) => / alt="[^"]+"/.test(i)), "the hero picture and the photo have alt text");
check(imgs.every((i) => !/\.(webp|svg)"/i.test(i)), "images are JPG/PNG (Outlook for Windows shows no WebP)");
check(imgs.every((i) => /src="https:\/\//.test(i)), "images load from https addresses");
const buttons = (html.match(/<!--\[if !mso\]><!--><a /g) || []).length;
const vml = (html.match(/<v:roundrect/g) || []).length;
check(buttons === 2 && vml === 2, "two buttons (Explore My Work, Connect), each with its Outlook VML fallback");
// Connect: a reply to hello@anantgoyal.in, with the subject and a message asking how to reach them and when.
const reply = html.match(/href="(mailto:hello@anantgoyal\.in\?[^"]+)"/)?.[1]?.replace(/&amp;/g, "&");
const replyUrl = reply ? new URL(reply) : null;
check(
  !!replyUrl &&
    replyUrl.searchParams.get("subject") === "Re: Still sending plain-text emails?" &&
    /^Hey Anant,\r\n\r\nLet's make my emails impossible to ignore\.\r\n/.test(replyUrl.searchParams.get("body") ?? "") &&
    (replyUrl.searchParams.get("body") ?? "").includes("Where to find me (website, Instagram, phone or WhatsApp): ") &&
    (replyUrl.searchParams.get("body") ?? "").includes("A good time to connect: "),
  "Connect opens a reply to hello@anantgoyal.in: their brand, how to reach them, a time to connect",
);
const forCarouselabs = readFileSync(path.join(here, "dist", "cold-outreach.carouselabs.html"), "utf8");
check((forCarouselabs.match(/href="__REPLY_LINK__"/g) || []).length === 2 && !forCarouselabs.includes("mailto:hello@anantgoyal.in?subject"), "CarouseLabs' copy leaves the reply address to the campaign (__REPLY_LINK__)");
const links = [...new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).filter((h) => !h.startsWith("https://fonts.")))];
check(links.includes("https://anantgoyal.in") && html.includes(">Explore My Work<"), "Explore My Work goes to https://anantgoyal.in");
const text = html
  .replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&#39;/g, "'")
  .replace(/&nbsp;|&#\d+;|&\w+;/g, " ")
  .replace(/\s+/g, " ");
for (const words of ["Still sending plain-text emails?", "Stop sending boring emails.", "Let's make your next email impossible to ignore.", "Connect", "Anant Goyal", "You focus on your business", "Email design", "Reach thousands, safely", "Track every email", "Super-personalised emails", "Your own email software"]) {
  check(text.includes(words), `says "${words}"`);
}
check(/no thanks/.test(text), "has a way to opt out");
check(!/solo founder/i.test(text), "speaks to everyone, not only solo founders");
check(!/guarantee|never (lands?|goes|go) (in|to) spam|100% (inbox|delivery)|without (landing|going) (in|to) spam/i.test(text), "promises nothing about inbox placement");

// ── Links and images answer ────────────────────────────────────────────────
for (const href of links.filter((h) => h.startsWith("http"))) {
  const res = await fetch(href, { method: "GET", redirect: "follow" }).catch(() => null);
  // LinkedIn answers automated requests with 999; anything but a 404/5xx means the page exists.
  const ok = res && (res.ok || res.status === 999);
  check(ok, `link ${href} answers (${res ? res.status : "no answer"})`);
}
check(links.some((h) => h === "mailto:hello@anantgoyal.in"), "email link goes to hello@anantgoyal.in");
for (const src of imgs.map((i) => i.match(/src="([^"]+)"/)[1])) {
  const res = await fetch(src).catch(() => null);
  check(res && res.ok && /image\/(png|jpeg)/.test(res.headers.get("content-type") ?? ""), `image ${src} is live (${res ? res.status : "no answer"})`);
}

// ── Renders ────────────────────────────────────────────────────────────────
const browser = await chromium.launch();
for (const width of [320, 375, 600, 680]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  // "load" waits for every image; a slow connection gets two minutes.
  await page.goto(pathToFileURL(file).href, { waitUntil: "load", timeout: 120_000 });
  const r = await page.evaluate(() => ({
    broken: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    stacks: [...document.querySelectorAll("div.stack")].map((d) => Math.round(d.getBoundingClientRect().width)),
    h1: Math.round(parseFloat(getComputedStyle(document.querySelector("h1")).fontSize)),
  }));
  // The phone layout (one column, smaller headline) applies up to 620px, like the portfolio emails.
  const phone = width <= 620;
  const layoutOk = phone ? r.stacks.every((w) => w >= width - 90) && r.h1 === 34 : r.stacks.every((w) => w < 300) && r.h1 === 46;
  check(r.broken === 0 && r.overflow <= 0 && layoutOk, `${width}px: images load, nothing runs sideways, services ${phone ? "stack" : "sit two by two"} (headline ${r.h1}px)`);
  await page.close();
}
await browser.close();

console.log(failures ? `\n${failures} failure(s)` : "\nall outreach email checks passed");
process.exit(failures ? 1 : 0);
