// Builds the cold-outreach email for Anant Goyal's email design services.
//
//   node outreach/build.mjs          builds outreach/dist/ (HTML email, plain-text version, preview page)
//   node outreach/build.mjs --art    also re-renders the hero picture and avatar into
//                                    public/email-assets/outreach/ (publish the site afterwards so
//                                    https://anantgoyal.in/email-assets/outreach/... serves them)
//
// To change the words, links or button: edit CONTENT below and run the build again.
// Built from emails/lib.mjs, the same email-safe pieces as the 24 portfolio designs:
// table layout, Outlook ghost tables, stacking columns, a VML button for Outlook.
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { layout, row, text, heading, image, button, media, esc } from "../emails/lib.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const dist = path.join(here, "dist");

// ── CONTENT: everything you might want to change ───────────────────────────
const CONTENT = {
  subject: "Still sending plain-text emails?",
  preheader: "I design and develop beautiful, responsive HTML emails that make your brand stand out in the inbox.",

  eyebrow: "Still sending plain-text emails?",
  headline: "Stop sending",
  headlineAccent: "boring emails.",
  supporting: "I design and develop beautiful, responsive HTML emails that make your brand stand out in the inbox.",

  // {{firstName}} is a merge tag: change it to your sending tool's syntax, or write "Hi there,".
  greeting: "Hi {{firstName}},",
  intro:
    "I'm Anant. I design emails that look great, send them to thousands of people and make each one feel personal. You focus on your business; I handle your emails, from the design to the send.",

  servicesEyebrow: "What I do",
  servicesTitle: "Everything your emails need,",
  servicesAccent: "from design to delivery.",
  // [icon, title, line]. Icons: design, reach, track, personal, software (made by outreach/gen-icons.mjs).
  services: [
    ["design", "Email design", "Beautiful, on-brand HTML emails, hand-coded and checked in Gmail, Outlook and Apple Mail."],
    ["reach", "Reach thousands, safely", "Warmed-up domains, SPF, DKIM and DMARC, and steady volumes: set up to reach inboxes, not spam folders."],
    ["track", "Track every email", "See who opened, clicked and replied, for each campaign and each person."],
    ["personal", "Super-personalised emails", "Every person gets their own subject and message, so each email reads like you wrote it just for them."],
    ["software", "Your own email software", "A custom platform to send, track and manage your emails, built around how you work."],
  ],

  ctaKicker: "anantgoyal.in",
  ctaTitle: "See what your emails",
  ctaAccent: "could look like.",
  ctaText: "Browse email designs for product launches, updates, newsletters and more.",
  ctaLabel: "Explore My Work",
  ctaUrl: "https://anantgoyal.in",

  // The finale: the closing line and one button. It opens a reply to you with
  // replyBody already written: they add their brand, how to reach them and a
  // time to connect. Works for anyone, website or not.
  closing: "Let's make your next email",
  closingAccent: "impossible to ignore.",
  replyLabel: "Connect &rarr;",
  replyBody:
    "Hey Anant,\n\nLet's make my emails impossible to ignore.\n\nMy brand: \nWhere to find me (website, Instagram, phone or WhatsApp): \nA good time to connect: \n\nTalk soon,\n",

  name: "Anant Goyal",
  role: "Email design & development",
  website: "https://anantgoyal.in",
  websiteLabel: "anantgoyal.in",
  email: "hello@anantgoyal.in",
  linkedin: "https://www.linkedin.com/in/anantgoyal45/",

  footer: "You're getting this because I thought your emails could look even better. Not interested? Reply “no thanks” and I won't email you again.",
  // For recipients in the US (CAN-SPAM), commercial email must show a postal address. Add yours here, e.g. "Anant Goyal · City, Country".
  postalAddress: "",
};

// ── The website's design system ────────────────────────────────────────────
const ASSETS = "https://anantgoyal.in/email-assets/outreach";
const FONTS = "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap";
const SANS = "'Instrument Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const SERIF = "'Instrument Serif',Georgia,'Times New Roman',serif";
const C = { ink: "#100C33", ink2: "#46426B", ink3: "#5C5884", mist: "#F4F3FC", line: "#E5E2F4", white: "#FFFFFF", blue: "#2F4BFF", violet: "#7B3AEE", lav: "#EDEBFF", night: "#0B0920", night2: "#15122F", lime: "#D4FF5C", soft: "#C9C6E6" };
const accent = (s, color = C.violet) => `<span style="font-family:${SERIF};font-style:italic;font-weight:400;letter-spacing:-0.3px;color:${color};">${esc(s)}</span>`;

// ── Pictures (rendered from outreach/art/hero.html and assets/anant-goyal.png) ──
async function renderArt() {
  const out = path.join(root, "public", "email-assets", "outreach");
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 552, height: 300 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(path.join(here, "art", "hero.html")).href, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
  });
  const shot = await page.screenshot({ type: "png" });
  await sharp(shot).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(out, "hero.jpg"));
  await browser.close();

  // Round avatar on the site's blue-violet sphere, transparent corners, 2x for a 48px display.
  const S = 96;
  const sphere = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><defs><radialGradient id="g" cx="0.36" cy="0.3" r="0.85"><stop offset="0" stop-color="#b4c4ff"/><stop offset="0.45" stop-color="#5b5bff"/><stop offset="0.8" stop-color="#6a2be8"/><stop offset="1" stop-color="#2c0a77"/></radialGradient></defs><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="url(#g)"/></svg>`);
  const H = Math.round(S * 0.94);
  const head = await sharp(path.join(root, "assets", "anant-goyal.png")).extract({ left: 20, top: 0, width: 460, height: 460 }).resize(H, H).png().toBuffer();
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="#fff"/></svg>`);
  await sharp(sphere)
    .composite([{ input: head, left: Math.round((S - H) / 2), top: Math.round(S * 0.1) }, { input: mask, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(out, "avatar.png"));
  console.log("rendered public/email-assets/outreach/hero.jpg and avatar.png (icons: node outreach/gen-icons.mjs)");
}

// ── The email ──────────────────────────────────────────────────────────────
// The services: one clean list on a soft panel, an icon tile beside each line.
function servicesList(services) {
  const rows = services
    .map(([icon, title, desc], i) => {
      const divider = i ? `border-top:1px solid ${C.line};` : "";
      // The icon column has its own classes so phones can make it smaller (more room for the words).
      return `<tr><td style="padding:18px 0 18px 0;${divider}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="icon-td" width="56" valign="top" style="width:56px;padding-right:16px;"><img class="icon" src="${ASSETS}/icon-3d-${icon}.png" width="56" height="56" alt="" style="display:block;width:56px;height:56px;border:0;"></td>
<td valign="top">${text(esc(title), { font: SANS, size: 17, lh: 24, color: C.ink, weight: 600, ls: "-0.2px" })}
${text(esc(desc), { font: SANS, size: 15, lh: 23, color: C.ink2, mt: 3 })}</td>
</tr></table></td></tr>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
<tr><td bgcolor="${C.mist}" class="list-pad" style="background-color:${C.mist};border:1px solid ${C.line};border-radius:22px;padding:6px 22px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
</td></tr></table>`;
}

/**
 * The finale card: the closing line and one lime button that opens a reply
 * already written. Soft lavender like the site's light panels, lime like its accents.
 */
function replyCard(k, replyHref) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
<tr><td bgcolor="#EFEBFF" class="reply-pad" style="background-color:#EFEBFF;background-image:linear-gradient(150deg,#E7EBFF 0%,#F3ECFF 55%,#FFEFF6 100%);border:1px solid #E1DAFB;border-radius:22px;padding:32px 30px 32px 30px;">
${heading(`${esc(k.closing)} ${accent(k.closingAccent)}`, { level: 2, font: SANS, size: 26, lh: 33, color: C.ink, weight: 600, ls: "-0.6px", cls: "h2" })}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-top:22px;">${button({ label: k.replyLabel, href: esc(replyHref), bg: C.lime, color: C.ink, font: SANS, radius: 25, width: 168, height: 50, size: 16 })}</td></tr></table>
</td></tr></table>`;
}

/** The Reply button's link: a reply to you, subject and message filled in (CRLF line breaks, RFC 6068). */
export function replyMailto(k = CONTENT) {
  const q = (s) => encodeURIComponent(s.replace(/\r?\n/g, "\r\n"));
  return `mailto:${k.email}?subject=${q(`Re: ${k.subject}`)}&body=${q(k.replyBody)}`;
}

// replyHref: where the Reply button goes. The standalone email replies to you;
// CarouseLabs' copy has its "__REPLY_LINK__" placeholder, filled in with the
// campaign's reply address when it's sent.
function buildHtml({ replyHref = replyMailto() } = {}) {
  const k = CONTENT;
  const avatar = (size) => image({ src: `${ASSETS}/avatar.png`, alt: k.name, width: size, height: size, radius: size, fluid: false });
  const white = (inner, pad, extra = {}) => row(inner, { bg: C.white, pad, ...extra });

  const body = [
    // 1. Branded header
    `<!-- EDIT: header (name and website) -->`,
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle">${media({ icon: avatar(40), iconWidth: 40, gap: 12, valign: "middle", html: text(esc(k.name), { font: SANS, size: 17, lh: 22, color: C.ink, weight: 600, ls: "-0.2px" }) })}</td>
<td valign="middle" align="right" style="font-family:${SANS};font-size:14px;line-height:20px;"><a href="${k.website}" style="color:${C.ink3};text-decoration:none;font-weight:500;">${esc(k.websiteLabel)}</a></td>
</tr></table>`,
      { pad: "4px 16px 16px 16px" },
    ),

    // 2. Hero panel: eyebrow, headline, supporting line, picture
    `<!-- EDIT: hero (eyebrow, headline, supporting line) -->`,
    white(
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td bgcolor="${C.lav}" style="background-color:${C.lav};border-radius:999px;padding:6px 14px;font-family:${SANS};font-size:13px;line-height:18px;font-weight:600;color:${C.violet};">${esc(k.eyebrow)}</td></tr></table>
${heading(`${esc(k.headline)} ${accent(k.headlineAccent)}`, { font: SANS, size: 46, lh: 50, color: C.ink, weight: 600, ls: "-1.4px", mt: 20, cls: "h1" })}
${text(esc(k.supporting), { font: SANS, size: 18, lh: 28, color: C.ink2, mt: 16 })}`,
      "36px 32px 0 32px",
      { radius: "28px 28px 0 0" },
    ),
    white(image({ src: `${ASSETS}/hero.jpg`, alt: "A founder's plain-text launch email next to a beautifully designed one", width: 568, height: 309, radius: 20, bg: "#4A2EE6" }), "24px 16px 0 16px"),

    // 3. Short introduction
    `<!-- EDIT: greeting and introduction -->`,
    white(
      `${text(esc(k.greeting), { font: SANS, size: 16, lh: 26, color: C.ink, weight: 600 })}
${text(esc(k.intro), { font: SANS, size: 16, lh: 27, color: C.ink2, mt: 10 })}`,
      "32px 32px 0 32px",
    ),

    // 4. Services
    `<!-- EDIT: services -->`,
    white(
      `${text(esc(k.servicesEyebrow), { font: SANS, size: 12, lh: 16, color: C.violet, weight: 700, ls: "1.4px", transform: "uppercase" })}
${heading(`${esc(k.servicesTitle)}<br>${accent(k.servicesAccent)}`, { level: 2, font: SANS, size: 28, lh: 34, color: C.ink, weight: 600, ls: "-0.8px", mt: 8, cls: "h2" })}`,
      "36px 32px 18px 32px",
    ),
    white(servicesList(k.services), "0 16px 0 16px"),

    // 5. Call to action
    `<!-- EDIT: call to action (button text and link) -->`,
    white(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
<tr><td bgcolor="${C.night2}" class="cta-pad" style="background-color:${C.night2};background-image:linear-gradient(135deg,#2a1f86 0%,${C.night2} 52%,${C.night} 100%);border-radius:22px;padding:34px 30px 36px 30px;">
${text(`<span style="color:${C.lime};">&#9679;</span>&nbsp; ${esc(k.ctaKicker)}`, { font: SANS, size: 13, lh: 18, color: C.lime, weight: 600 })}
${heading(`${esc(k.ctaTitle)} ${accent(k.ctaAccent, C.white)}`, { level: 2, font: SANS, size: 28, lh: 34, color: C.white, weight: 600, ls: "-0.8px", mt: 12, cls: "h2" })}
${text(esc(k.ctaText), { font: SANS, size: 15, lh: 24, color: C.soft, mt: 10, mb: 26 })}
${button({ label: esc(k.ctaLabel), href: k.ctaUrl, bg: C.white, color: C.ink, font: SANS, radius: 25, width: 210, height: 50, size: 16 })}
</td></tr></table>`,
      "16px 16px 0 16px",
    ),

    // 6. The finale: "Your move", the reply already written
    `<!-- EDIT: the reply card (closing line, the reply peek, the button) -->`,
    white(replyCard(k, replyHref), "16px 16px 0 16px"),

    // 7. Signature
    `<!-- EDIT: signature -->`,
    white(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid ${C.line};font-size:0;line-height:0;height:1px;">&nbsp;</td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-top:24px;">
${media({
  icon: avatar(52),
  iconWidth: 52,
  gap: 14,
  valign: "middle",
  html: `${text(esc(k.name), { font: SANS, size: 17, lh: 22, color: C.ink, weight: 700, ls: "-0.2px" })}
${text(esc(k.role), { font: SANS, size: 14, lh: 20, color: C.ink3, mt: 2 })}
${text(`<a href="${k.website}" style="color:${C.violet};text-decoration:none;font-weight:600;">${esc(k.websiteLabel)}</a>&nbsp;&nbsp;&middot;&nbsp; <a href="mailto:${k.email}" style="color:${C.violet};text-decoration:none;font-weight:600;">${esc(k.email)}</a>&nbsp;&nbsp;&middot;&nbsp; <a href="${k.linkedin}" style="color:${C.violet};text-decoration:none;font-weight:600;">LinkedIn</a>`, { font: SANS, size: 14, lh: 22, color: C.ink3, mt: 6 })}`,
})}
</td></tr></table>`,
      "32px 32px 36px 32px",
      { radius: "0 0 28px 28px" },
    ),

    // Footer
    `<!-- EDIT: footer (opt-out line; add your postal address in CONTENT.postalAddress) -->`,
    row(
      `${text(esc(k.footer), { font: SANS, size: 12, lh: 19, color: C.ink3, align: "center" })}
${k.postalAddress ? text(esc(k.postalAddress), { font: SANS, size: 12, lh: 19, color: C.ink3, align: "center", mt: 6 }) : ""}`,
      { pad: "20px 24px 8px 24px", align: "center" },
    ),
  ].join("\n");

  return layout({
    title: k.subject,
    preheader: k.preheader,
    bg: C.mist,
    fonts: FONTS,
    body,
    outerPad: "20px 8px",
    // Phones: little space outside the panel, 16px inside it, a smaller icon column.
    css: `.outer{padding:8px 6px !important;}
    .reply-pad{padding:26px 20px 24px 20px !important;}
    .px{padding-left:16px !important;padding-right:16px !important;}
    .cta-pad{padding:28px 20px 30px 20px !important;}
    .list-pad{padding:4px 14px !important;}
    .icon-td{width:40px !important;padding-right:12px !important;}
    .icon{width:40px !important;height:40px !important;}`,
  });
}

function buildText() {
  const k = CONTENT;
  return [
    `${k.headline} ${k.headlineAccent}`,
    "",
    k.greeting,
    "",
    k.intro,
    "",
    `${k.servicesTitle} ${k.servicesAccent}`,
    ...k.services.map(([, t, d]) => `- ${t}: ${d}`),
    "",
    `${k.ctaTitle} ${k.ctaAccent}`,
    `${k.ctaLabel}: ${k.ctaUrl}`,
    "",
    `${k.closing} ${k.closingAccent}`,
    `Just reply with your brand, where to find you (website, Instagram, phone or WhatsApp) and a good time to connect.`,
    "",
    "--",
    k.name,
    k.role,
    `${k.websiteLabel} | ${k.email} | ${k.linkedin}`,
    "",
    k.footer,
    k.postalAddress,
  ]
    .join("\n")
    .trim() + "\n";
}

// The preview page: the email at desktop and phone width side by side.
async function buildPreview(htmlFile) {
  const browser = await chromium.launch();
  const heights = {};
  for (const w of [680, 375]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(pathToFileURL(htmlFile).href, { waitUntil: "networkidle" });
    heights[w] = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.close();
  }
  await browser.close();
  const k = CONTENT;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Preview: ${esc(k.subject)}</title>
<link href="${FONTS}" rel="stylesheet">
<style>
  body{margin:0;background:${C.mist};font-family:${SANS};color:${C.ink};}
  header{padding:32px 40px 8px;max-width:1180px;margin:0 auto;}
  h1{margin:0;font-size:28px;letter-spacing:-0.6px;font-weight:600;}
  h1 em{font-family:${SERIF};font-weight:400;color:${C.violet};}
  .inbox{margin-top:16px;display:inline-block;background:#fff;border:1px solid ${C.line};border-radius:14px;padding:12px 16px;font-size:14px;line-height:20px;max-width:100%;}
  .inbox b{display:block;} .inbox span{color:${C.ink3};}
  main{display:flex;gap:40px;flex-wrap:wrap;justify-content:center;padding:24px 24px 64px;max-width:1180px;margin:0 auto;}
  figure{margin:0;} figcaption{font-size:13px;font-weight:600;color:${C.ink3};margin:0 0 10px 4px;}
  .desk iframe{width:680px;height:${heights[680]}px;border:0;border-radius:16px;background:${C.mist};box-shadow:0 30px 60px -30px rgba(32,16,110,.45);}
  .phone{padding:10px;background:#14112c;border-radius:44px;box-shadow:0 30px 60px -30px rgba(32,16,110,.6);}
  .phone iframe{width:375px;height:760px;border:0;border-radius:34px;background:${C.mist};display:block;}
</style></head>
<body>
<header>
  <h1>Cold outreach email <em>preview</em></h1>
  <div class="inbox"><b>${esc(k.subject)}</b><span>${esc(k.preheader)}</span></div>
</header>
<main>
  <figure class="desk"><figcaption>Desktop (680px)</figcaption><iframe src="cold-outreach.html" title="Desktop preview"></iframe></figure>
  <figure><figcaption>Phone (375px), scroll inside</figcaption><div class="phone"><iframe src="cold-outreach.html" title="Phone preview"></iframe></div></figure>
</main>
</body></html>
`;
}

if (process.argv.includes("--art")) await renderArt();
mkdirSync(dist, { recursive: true });
const htmlFile = path.join(dist, "cold-outreach.html");
writeFileSync(htmlFile, buildHtml());
// For CarouseLabs (scripts/ready-email-from-html.mjs there): the Reply button replies to the campaign's address.
writeFileSync(path.join(dist, "cold-outreach.carouselabs.html"), buildHtml({ replyHref: "__REPLY_LINK__" }));
// The Reply button's message, for CarouseLabs to fill in the same way.
writeFileSync(path.join(dist, "cold-outreach.reply.txt"), CONTENT.replyBody);
writeFileSync(path.join(dist, "cold-outreach.txt"), buildText());
writeFileSync(path.join(dist, "preview.html"), await buildPreview(htmlFile));
console.log(`built outreach/dist/cold-outreach.html (${(Buffer.byteLength(buildHtml()) / 1024).toFixed(1)} KB), cold-outreach.txt, preview.html`);
