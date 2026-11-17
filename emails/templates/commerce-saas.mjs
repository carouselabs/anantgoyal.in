// E-commerce and SaaS concepts: a shipping tracker, a minimal product launch,
// a security alert, a weekly usage report and a developer changelog.
import { layout, row, text, heading, link, image, button, avatar, pill, cells, box } from "../lib.mjs";

const INTER = "'Inter',Helvetica,Arial,sans-serif";
const INTER_FONT = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap";
const gap = (h) => `<div style="height:${h}px;line-height:${h}px;font-size:${h}px;">&nbsp;</div>`;

// ── 7. Shipping update with a tracker ──────────────────────────────────────
const shipping = (() => {
  const SERIF = "'Fraunces',Georgia,serif";
  const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
  const URL = "https://brookfold.example";
  const C = { ink: "#2a2421", clay: "#b4532a", body: "#5c524c", line: "#e6ddd2" };
  const meta = { slug: "brookfold-shipping", from: "Brookfold", subject: "Your order is on its way", preheader: "Shipped today. Arriving Thursday 13 November." };
  const steps = [
    ["Ordered", "Mon 10", true],
    ["Packed", "Tue 11", true],
    ["Shipped", "Today", true],
    ["Delivered", "Thu 13", false],
  ];
  const stepCell = ([label, when, done], i) =>
    `<td width="25%" align="center" valign="top" style="width:25%;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin:0 auto;"><tr><td align="center" valign="middle" width="28" height="28" bgcolor="${done ? C.clay : "#ffffff"}" style="width:28px;height:28px;border-radius:28px;background-color:${done ? C.clay : "#ffffff"};border:2px solid ${done ? C.clay : C.line};color:#ffffff;font-family:${SANS};font-size:13px;font-weight:700;line-height:24px;">${done ? "&#10003;" : "&nbsp;"}</td></tr></table>
<p style="margin:8px 0 0 0;font-family:${SANS};font-size:13px;line-height:16px;color:${done ? C.ink : "#9a8f87"};font-weight:${i === 2 ? 700 : 400};">${label}</p><p style="margin:2px 0 0 0;font-family:${SANS};font-size:11px;line-height:14px;color:#9a8f87;">${when}</p></td>`;
  const item = (img, alt, name, price) => cells([image({ src: img, alt, width: 64, radius: 6, fluid: false }), text(`<b style="color:${C.ink};">${name}</b><br><span style="color:#9a8f87;">Qty 1</span>`, { font: SANS, size: 14, lh: 20 }), `<p style="margin:0;text-align:right;font-family:${SANS};font-size:14px;color:${C.ink};">${price}</p>`], { widths: [80, null, 70], gap: 14 });
  const body = [
    row(heading("Brookfold", { font: SERIF, size: 26, lh: 30, color: C.ink, weight: 600, align: "center" }), { pad: "8px 24px 22px", align: "center" }),
    row(
      text("Order #BF-30418", { font: SANS, size: 13, lh: 18, color: C.clay, weight: 700, align: "center", mb: 8 }) +
        heading("Your order is on its way", { font: SERIF, size: 36, lh: 42, color: C.ink, weight: 500, align: "center", cls: "h1", mb: 8 }) +
        text("It left our studio this morning and should arrive on <b>Thursday 13 November</b>.", { font: SANS, size: 16, lh: 25, color: C.body, align: "center", mb: 28 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0 12%;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="66%" height="3" bgcolor="${C.clay}" style="height:3px;background-color:${C.clay};font-size:0;line-height:0;">&nbsp;</td><td height="3" bgcolor="${C.line}" style="height:3px;background-color:${C.line};font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr></table>` +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:-17px;"><tr>${steps.map(stepCell).join("")}</tr></table>` +
        gap(28) +
        button({ label: "Track your parcel", href: `${URL}/orders/bf-30418/track`, bg: C.clay, radius: 999, width: 210, font: SANS, align: "center" }),
      { bg: "#fffdf9", pad: "34px 36px 36px", radius: "18px 18px 0 0", align: "center" },
    ),
    row(heading("In this parcel", { level: 2, font: SERIF, size: 20, lh: 26, color: C.ink, weight: 600, mb: 14 }) + item("img/brookfold-lamp.jpg", "Cream ceramic table lamp", "Ceramic table lamp", "$96.00") + gap(12) + item("img/brookfold-mugs.jpg", "Enamel mugs and a teapot", "Enamel breakfast set", "$63.00"), { bg: "#fffdf9", pad: "8px 36px 18px" }),
    row(box(text(`<b style="color:${C.ink};">Delivering to</b><br>Sam Reid, Flat 2, Elm Row, Edinburgh<br>${link("Change delivery", `${URL}/orders/bf-30418/delivery`, { color: C.clay })}`, { font: SANS, size: 14, lh: 22, color: C.body }), { bg: "#f6f1ea", pad: "18px 20px", radius: 12 }), { bg: "#fffdf9", pad: "0 36px 32px", radius: "0 0 18px 18px" }),
    row(text(`Questions about your order? ${link("Contact us", `${URL}/help`, { color: C.body, underline: true, weight: 400 })}`, { font: SANS, size: 12, lh: 18, color: "#8a7f77", align: "center" }), { pad: "20px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#f6f1ea", body, fonts: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" }) };
})();

// ── 8. Minimal product launch ──────────────────────────────────────────────
const minimal = (() => {
  const URL = "https://nordlys.example";
  const meta = { slug: "nordlys-launch", from: "Nordlys", subject: "Introducing Halo.", preheader: "A lamp that follows the light outside." };
  const spec = (big, small) => text(`<span style="font-size:22px;line-height:28px;color:#1d1d1f;font-weight:600;">${big}</span><br>${small}`, { font: INTER, size: 13, lh: 18, color: "#6e6e73", align: "center" });
  const body = [
    row(text("NORDLYS", { font: INTER, size: 13, lh: 18, color: "#1d1d1f", weight: 600, ls: "0.3em", align: "center" }), { bg: "#ffffff", pad: "40px 40px 0", align: "center", radius: "20px 20px 0 0" }),
    row(heading("Halo.", { font: INTER, size: 64, lh: 66, color: "#1d1d1f", weight: 600, ls: "-0.04em", align: "center", mb: 8 }) + text("Light that follows the sun.", { font: INTER, size: 22, lh: 30, color: "#1d1d1f", weight: 300, align: "center", mb: 20 }) + cells([button({ label: "Buy", href: `${URL}/buy/halo`, bg: "#0071e3", radius: 999, width: 100, height: 40, size: 15, font: INTER, align: "right" }), text(link("Learn more &rsaquo;", `${URL}/halo`, { color: "#0066cc", weight: 400 }), { font: INTER, size: 16, lh: 22 })], { gap: 18, widths: ["50%", "50%"] }), { bg: "#ffffff", pad: "40px 40px 10px", align: "center" }),
    row(image({ src: "img/nordlys-lamp.jpg", alt: "The Halo lamp: a cream ceramic table lamp in low sunlight", width: 440, align: "center" }), { bg: "#ffffff", pad: "30px 40px 40px", align: "center" }),
    row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="33%" style="width:33%;">${spec("3", "light temperatures")}</td><td width="34%" style="width:34%;">${spec("1%", "lowest dim")}</td><td width="33%" style="width:33%;">${spec("Hand", "glazed base")}</td></tr></table>`, { bg: "#f5f5f7", pad: "34px 24px" }),
    row(text("From $189. Free delivery and returns.", { font: INTER, size: 17, lh: 26, color: "#1d1d1f", align: "center" }) + text(link("Find a stockist &rsaquo;", `${URL}/stockists`, { color: "#0066cc", weight: 400 }), { font: INTER, size: 15, lh: 22, align: "center", mt: 6 }), { bg: "#ffffff", pad: "34px 40px 40px", align: "center", radius: "0 0 20px 20px" }),
    row(text(`${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#86868b", underline: true, weight: 400 })} &nbsp;&middot;&nbsp; Nordlys Studio`, { font: INTER, size: 12, lh: 18, color: "#86868b", align: "center" }), { pad: "20px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#f5f5f7", body, fonts: INTER_FONT }) };
})();

// ── 9. Security alert ──────────────────────────────────────────────────────
const security = (() => {
  const URL = "https://ledgerline.example";
  const RED = "#c62828";
  const meta = { slug: "ledgerline-security", from: "Ledgerline Security", subject: "New sign-in to your Ledgerline account", preheader: "Chrome on Windows, Pune. If this wasn't you, secure your account now." };
  const rowKV = (k, v) => `<tr><td width="34%" style="width:34%;padding:10px 0;border-bottom:1px solid #eceff1;font-family:${INTER};font-size:14px;color:#607080;">${k}</td><td style="padding:10px 0;border-bottom:1px solid #eceff1;font-family:${INTER};font-size:14px;color:#102030;font-weight:600;">${v}</td></tr>`;
  const body = [
    row(text(`<b style="color:#102030;">Ledgerline</b>`, { font: INTER, size: 18, lh: 24 }), { pad: "8px 32px 18px" }),
    row(
      cells([`<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td align="center" valign="middle" width="44" height="44" bgcolor="#fdecea" style="width:44px;height:44px;border-radius:44px;background-color:#fdecea;color:${RED};font-family:${INTER};font-size:22px;font-weight:700;line-height:44px;">!</td></tr></table>`, heading("New sign-in to your account", { font: INTER, size: 24, lh: 30, color: "#102030", weight: 700 })], { widths: [58, null], gap: 14 }) +
        text("We noticed a sign-in from a device we haven't seen before. If this was you, there's nothing to do.", { font: INTER, size: 15, lh: 24, color: "#405060", mt: 16, mb: 16 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowKV("Device", "Chrome on Windows")}${rowKV("Location", "Pune, India (approximate)")}${rowKV("Time", "8 Nov 2026, 21:14 IST")}${rowKV("IP address", `<span style="font-family:'Courier New',monospace;">203.0.113.42</span>`)}</table>` +
        gap(24) +
        button({ label: "Secure my account", href: `${URL}/security/review`, bg: RED, radius: 8, width: 210, font: INTER }) +
        text(link("Yes, this was me", `${URL}/security/confirm`, { color: "#1a5fb4" }), { font: INTER, size: 14, lh: 20, mt: 14 }),
      { bg: "#ffffff", pad: "30px 32px", radius: "12px" },
    ),
    row(text("Ledgerline will never ask for your password, PIN or one-time code by email or phone.", { font: INTER, size: 13, lh: 20, color: "#607080" }), { pad: "18px 32px 4px" }),
    row(text(`This is a security notice about your account, so it can't be turned off. ${link("Security settings", `${URL}/settings/security`, { color: "#607080", underline: true, weight: 400 })}`, { font: INTER, size: 12, lh: 18, color: "#8090a0" }), { pad: "8px 32px 8px" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#eef1f4", body, fonts: INTER_FONT }) };
})();

// ── 10. Weekly usage report (a dashboard in an email) ──────────────────────
const weekly = (() => {
  const URL = "https://taskfold.example";
  const V = "#5b3df5";
  const meta = { slug: "taskfold-weekly", from: "Taskfold", subject: "Your week: 42 tasks done", preheader: "Your busiest day, your top project and a five-day streak." };
  const days = [["M", 52], ["T", 78], ["W", 96], ["T", 64], ["F", 88], ["S", 18], ["S", 10]];
  const bar = ([d, h]) => `<td align="center" valign="bottom" style="padding:0 5px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td height="${h}" bgcolor="${h === 96 ? V : "#d9d3ff"}" style="height:${h}px;background-color:${h === 96 ? V : "#d9d3ff"};border-radius:6px 6px 2px 2px;font-size:0;line-height:0;">&nbsp;</td></tr></table><p style="margin:6px 0 0 0;font-family:${INTER};font-size:12px;color:#6b6890;">${d}</p></td>`;
  const tile = (n, l, d) => box(text(`<span style="font-size:24px;line-height:30px;font-weight:700;color:#16133a;">${n}</span><br>${l}${d ? `<br><span style="color:#16a34a;font-weight:600;">${d}</span>` : ""}`, { font: INTER, size: 12, lh: 17, color: "#6b6890" }), { bg: "#f5f4fb", pad: "12px 10px", radius: 12 });
  const proj = (name, pct) => `<tr><td style="padding:8px 0;font-family:${INTER};font-size:14px;color:#16133a;">${name}</td><td width="45%" style="width:45%;padding:8px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="${pct}%" height="6" bgcolor="${V}" style="height:6px;background-color:${V};border-radius:6px;font-size:0;line-height:0;">&nbsp;</td><td height="6" bgcolor="#ece9fb" style="height:6px;background-color:#ece9fb;font-size:0;line-height:0;">&nbsp;</td></tr></table></td><td width="44" align="right" style="width:44px;padding:8px 0;font-family:${INTER};font-size:13px;color:#6b6890;">${pct}%</td></tr>`;
  const body = [
    row(cells([text(`<b style="color:#16133a;font-size:18px;">Taskfold</b>`, { font: INTER, size: 18, lh: 24 }), `<p style="margin:0;text-align:right;">${pill("Week 46", { bg: "#ece9fb", color: V, font: INTER })}</p>`]), { pad: "8px 32px 18px" }),
    row(
      heading("Your week in Taskfold", { font: INTER, size: 28, lh: 34, color: "#16133a", weight: 700, ls: "-0.02em", cls: "h2", mb: 4 }) +
        text("3 to 9 November &middot; Sam Reid", { font: INTER, size: 14, lh: 20, color: "#6b6890", mb: 20 }) +
        cells([tile("42", "tasks done", "+8 vs last week"), tile("6", "active projects"), tile("3.5h", "focus time")], { gap: 10, valign: "top" }) +
        gap(22) +
        heading("Tasks finished each day", { level: 2, font: INTER, size: 15, lh: 20, color: "#16133a", weight: 700, mb: 12 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="height:120px;"><tr>${days.map(bar).join("")}</tr></table>` +
        text("Wednesday was your busiest day.", { font: INTER, size: 13, lh: 18, color: "#6b6890", mt: 10 }) +
        gap(18) +
        heading("Projects", { level: 2, font: INTER, size: 15, lh: 20, color: "#16133a", weight: 700, mb: 4 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${proj("Website relaunch", 82)}${proj("Q4 hiring", 55)}${proj("Customer research", 30)}</table>` +
        gap(22) +
        `<p style="margin:0 0 14px 0;">${pill("&#9733; 5-day streak", { bg: "#fff4db", color: "#8a5a00", font: INTER })}</p>` +
        button({ label: "Open your dashboard", href: `${URL}/dashboard`, bg: V, radius: 10, width: 220, font: INTER }),
      { bg: "#ffffff", pad: "30px 32px", radius: "16px" },
    ),
    row(text(`Sent every Monday. ${link("Change how often", `${URL}/settings/reports`, { color: "#6b6890", underline: true, weight: 400 })}`, { font: INTER, size: 12, lh: 18, color: "#8d8aae", align: "center" }), { pad: "20px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#f1effa", body, fonts: INTER_FONT }) };
})();

// ── 11. Developer changelog ────────────────────────────────────────────────
const changelog = (() => {
  const URL = "https://stackbeam.example";
  const MONO = "'JetBrains Mono','Courier New',monospace";
  const G = "#3fb950";
  const meta = { slug: "stackbeam-changelog", from: "Stackbeam", subject: "v2.8.0: edge caching and a faster CLI", preheader: "Added, improved and fixed in this release." };
  const code = (lines) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td bgcolor="#161b22" style="background-color:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;font-family:${MONO};font-size:13px;line-height:20px;color:#c9d1d9;">${lines}</td></tr></table>`;
  const section = (title, sign, color, items) =>
    text(`<span style="color:${color};">${title}</span>`, { font: MONO, size: 13, lh: 18, weight: 700, ls: "0.08em", transform: "uppercase", mt: 22, mb: 8 }) +
    items.map((i) => text(`<span style="color:${color};">${sign}</span>&nbsp; ${i}`, { font: MONO, size: 14, lh: 22, color: "#c9d1d9", mb: 4 })).join("");
  const body = [
    row(cells([text(`<span style="color:${G};">&#9650;</span> <b style="color:#f0f6fc;">stackbeam</b>`, { font: MONO, size: 16, lh: 22 }), `<p style="margin:0;text-align:right;">${pill("v2.8.0", { bg: "#1f6feb", color: "#ffffff", font: MONO })}</p>`]), { pad: "8px 32px 20px" }),
    row(
      text("$ stackbeam changelog --latest", { font: MONO, size: 13, lh: 18, color: "#8b949e", mb: 12 }) +
        heading("Edge caching and a faster CLI", { font: "'Inter',Helvetica,Arial,sans-serif", size: 30, lh: 36, color: "#f0f6fc", weight: 700, ls: "-0.02em", cls: "h2", mb: 8 }) +
        text("Released 6 November 2026 &middot; 14 changes &middot; no breaking changes", { font: MONO, size: 12, lh: 18, color: "#8b949e" }) +
        section("Added", "+", G, ["Edge caching for API routes, on by default", "<code>stackbeam logs --follow</code> for live logs", "Preview URLs for every pull request"]) +
        section("Improved", "~", "#d29922", ["CLI start-up is 3x faster on large projects", "Clearer errors when an environment variable is missing"]) +
        section("Fixed", "-", "#f85149", ["Deploys no longer hang when a build cache is empty"]) +
        gap(20) +
        code(`<span style="color:#8b949e;"># upgrade</span><br>npm install stackbeam@2.8.0<br><br><span style="color:#8b949e;"># stackbeam.config.js</span><br><span style="color:#ff7b72;">export default</span> { cache: { edge: <span style="color:#79c0ff;">true</span> } }`) +
        gap(24) +
        cells([button({ label: "Read the full changelog", href: `${URL}/changelog/2.8.0`, bg: "#238636", radius: 6, width: 240, font: MONO, size: 14 }), text(link("Upgrade guide &rarr;", `${URL}/docs/upgrade`, { color: "#58a6ff" }), { font: MONO, size: 13, lh: 18 })], { widths: [260, null], gap: 12 }),
      { bg: "#0d1117", pad: "30px 32px 34px", radius: "12px" },
    ),
    row(text(`You get release notes because you use Stackbeam. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#8b949e", underline: true, weight: 400 })}`, { font: MONO, size: 11, lh: 18, color: "#8b949e", align: "center" }), { pad: "20px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#010409", body, fonts: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@700&display=swap", css: "td.stack{display:block !important;width:auto !important;}" }) };
})();

export const emails = [shipping, minimal, security, weekly, changelog];
