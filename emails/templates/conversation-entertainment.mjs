// Messaging and entertainment concepts: a chat recap, a streaming
// recommendation email, an album release.
import { layout, row, text, heading, link, image, button, avatar, pill, cells } from "../lib.mjs";

const INTER = "'Inter',Helvetica,Arial,sans-serif";
const SG = "'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif";
const ARCHIVO = "'Archivo','Arial Black',Helvetica,Arial,sans-serif";
const SERIF = "'Instrument Serif',Georgia,serif";

// ── 4. Chat recap ───────────────────────────────────────────────────────────
const chat = (() => {
  const URL = "https://pantrypop.example";
  const GREEN = "#15803d";
  const meta = { slug: "pantry-chat", from: "Pantrypop", subject: "Malik is on the way with your order", preheader: "Your rider's messages, and your order arriving at 11:00." };
  const bubble = (side, html, time, ticks = false) => {
    const mine = side === "out";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${mine ? "right" : "left"}" style="padding:4px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;max-width:78%;"><tr><td bgcolor="${mine ? "#dcf3dc" : "#ffffff"}" style="background-color:${mine ? "#dcf3dc" : "#ffffff"};border-radius:${mine ? "14px 4px 14px 14px" : "4px 14px 14px 14px"};padding:9px 12px 6px;font-family:${INTER};font-size:15px;line-height:21px;color:#111b21;">${html}<p style="margin:2px 0 0 0;text-align:right;font-size:11px;line-height:14px;color:#667781;">${time}${ticks ? ` <span style="color:#3b82f6;">&#10003;&#10003;</span>` : ""}</p></td></tr></table>
</td></tr></table>`;
  };
  const body = [
    row(cells([avatar("PP", { bg: GREEN, size: 40, font: INTER }), text(`<b style="color:#111b21;">Malik from Pantrypop</b><br><span style="color:${GREEN};font-size:13px;">on the way to you</span>`, { font: INTER, size: 15, lh: 20 }), `<p style="margin:0;text-align:right;">${pill("Live", { bg: "#dcfce7", color: GREEN, font: INTER })}</p>`], { widths: [52, null, 70], gap: 10 }), { bg: "#ffffff", pad: "16px 24px", radius: "16px 16px 0 0" }),
    row(
      `<p style="margin:0 0 8px 0;text-align:center;">${pill("Today", { bg: "#ffffff", color: "#54656f", font: INTER })}</p>` +
        bubble("in", "Hi Sam, I've picked up your order from the store. All 12 items are there.", "10:41") +
        bubble("in", `${image({ src: "img/pantry-bowl.jpg", alt: "A colourful salad bowl", width: 220, radius: 10 })}<p style="margin:6px 0 0 0;">Your salad kit is packed cold.</p>`, "10:42") +
        bubble("out", "Great! Can you leave it with the concierge?", "10:43", true) +
        bubble("in", "Will do. About 15 minutes away.", "10:44") +
        bubble("in", `<span style="color:#667781;letter-spacing:3px;">&#9679; &#9679; &#9679;</span>`, "typing"),
      { bg: "#efeae2", pad: "16px 20px 20px" },
    ),
    row(
      cells([text(`<b style="color:#111b21;">Order #PP-2210</b><br>12 items &middot; arriving 11:00`, { font: INTER, size: 14, lh: 20, color: "#54656f" }), `<p style="margin:0;text-align:right;font-family:${INTER};font-size:18px;font-weight:700;color:#111b21;">$64.20</p>`]) +
        `<div style="height:18px;line-height:18px;font-size:18px;">&nbsp;</div>` +
        button({ label: "Track your order", href: `${URL}/orders/pp-2210`, bg: GREEN, radius: 12, width: 200, font: INTER }) +
        text(link("Message Malik in the app", `${URL}/orders/pp-2210/chat`, { color: GREEN }), { font: INTER, size: 14, lh: 20, mt: 12 }),
      { bg: "#ffffff", pad: "20px 24px 26px", radius: "0 0 16px 16px" },
    ),
    row(text(`Sent because you have an order on the way. ${link("Notification settings", `${URL}/settings`, { color: "#54656f", underline: true, weight: 400 })}`, { font: INTER, size: 12, lh: 18, color: "#667781", align: "center" }), { pad: "20px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#f0f2f5", body, fonts: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" }) };
})();

// ── 5. Streaming recommendations ────────────────────────────────────────────
const streaming = (() => {
  const URL = "https://nightreel.example";
  const RED = "#ff4d5a";
  const meta = { slug: "nightreel-streaming", from: "Nightreel", subject: "The Long North starts Friday", preheader: "Plus three picks because you watched The Quiet Coast." };
  const poster = (src, alt, title) => `${image({ src, alt, width: 176, radius: 8, href: `${URL}/title/${title}` })}`;
  const body = [
    row(`<p style="margin:0;font-family:${ARCHIVO};font-size:26px;line-height:28px;font-weight:900;letter-spacing:-0.02em;color:${RED};">nightreel</p>`, { pad: "8px 32px 18px" }),
    row(image({ src: "img/nightreel-hero.jpg", alt: "The Long North: new series, all six episodes from Friday", width: 600, href: `${URL}/title/the-long-north` }), { pad: "0", cls: "" }),
    row(
      text("A crew of four. One winter. No way back until spring.", { font: SG, size: 17, lh: 26, color: "#d6d6de", mb: 20 }) +
        cells([button({ label: "Play episode 1", href: `${URL}/watch/the-long-north/1`, bg: "#ffffff", color: "#0b0b10", radius: 6, width: 190, font: SG }), text(link("+ My list", `${URL}/my-list/add/the-long-north`, { color: "#ffffff" }), { font: SG, size: 15, lh: 20 })], { widths: [210, null], gap: 16 }),
      { pad: "22px 32px 30px" },
    ),
    row(heading("Because you watched The Quiet Coast", { level: 2, font: SG, size: 18, lh: 24, color: "#ffffff", weight: 700, mb: 14 }) + cells([poster("img/nightreel-canyon.jpg", "Red Canyon, a film", "red-canyon"), poster("img/nightreel-water.jpg", "Still Water, a documentary", "still-water"), poster("img/nightreel-rain.jpg", "After Rain, a series", "after-rain")], { gap: 12, valign: "top" }), { pad: "8px 24px 28px" }),
    row(
      heading("Continue watching", { level: 2, font: SG, size: 18, lh: 24, color: "#ffffff", weight: 700, mb: 12 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td bgcolor="#16161f" style="background-color:#16161f;border-radius:10px;padding:14px 16px;">` +
        cells([text(`<b style="color:#fff;">The Quiet Coast</b><br><span style="color:#8e8e9a;">Season 2, episode 5 &middot; 23 min left</span>`, { font: SG, size: 14, lh: 20 }), `<p style="margin:0;text-align:right;">${link("Resume &#9654;", `${URL}/watch/the-quiet-coast/2/5`, { color: RED })}</p>`]) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;"><tr><td width="62%" height="4" bgcolor="${RED}" style="height:4px;background-color:${RED};font-size:0;line-height:0;">&nbsp;</td><td height="4" bgcolor="#33333f" style="height:4px;background-color:#33333f;font-size:0;line-height:0;">&nbsp;</td></tr></table>` +
        `</td></tr></table>`,
      { pad: "0 24px 30px" },
    ),
    row(text(`${link("Manage email", `${URL}/settings/email`, { color: "#8e8e9a", underline: true, weight: 400 })} &nbsp;&middot;&nbsp; ${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#8e8e9a", underline: true, weight: 400 })}`, { font: SG, size: 12, lh: 18, color: "#8e8e9a", align: "center" }), { pad: "8px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#0b0b10", body, fonts: "https://fonts.googleapis.com/css2?family=Archivo:wght@900&family=Space+Grotesk:wght@400;700&display=swap" }) };
})();

// ── 6. Album release ────────────────────────────────────────────────────────
const release = (() => {
  const URL = "https://papersatellites.example";
  const CORAL = "#ff5a7a";
  const meta = { slug: "satellites-release", from: "Paper Satellites", subject: "Night Signals is out now", preheader: "Ten songs, one long drive. Listen anywhere." };
  const tracks = [
    ["1", "Low Orbit", "3:42", true],
    ["2", "Night Signals", "4:05", false],
    ["3", "Static Garden", "3:18", false],
    ["4", "Glasshouse", "4:51", false],
    ["5", "Westbound, 2am", "3:57", false],
  ];
  const body = [
    row(text("New album", { font: SG, size: 13, lh: 18, color: CORAL, weight: 700, ls: "0.18em", transform: "uppercase", align: "center", mb: 6 }) + heading("Paper Satellites", { font: SG, size: 40, lh: 44, color: "#ffffff", weight: 700, ls: "-0.03em", align: "center", cls: "h1" }) + text("Night Signals", { font: SERIF, size: 34, lh: 38, color: "#f5c7d2", align: "center", italic: true }), { pad: "16px 40px 24px", align: "center" }),
    row(image({ src: "img/satellites-album.jpg", alt: "Album artwork for Night Signals by Paper Satellites", width: 520, radius: 6, align: "center" }), { pad: "0 40px", align: "center" }),
    row(button({ label: "Listen now", href: `${URL}/listen`, bg: CORAL, color: "#111018", radius: 999, width: 180, font: SG, align: "center" }) + text(link("Choose your music app", `${URL}/listen/apps`, { color: "#ffffff" }), { font: SG, size: 14, lh: 20, align: "center", mt: 14 }), { pad: "28px 40px 8px", align: "center" }),
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${tracks
        .map(([n, t, d, single]) => `<tr><td width="32" style="width:32px;padding:12px 0;border-bottom:1px solid #2a2836;font-family:${SG};font-size:14px;color:#8d89a6;">${n}</td><td style="padding:12px 0;border-bottom:1px solid #2a2836;font-family:${SG};font-size:16px;color:#ffffff;font-weight:700;">${t}${single ? ` &nbsp;${pill("Single", { bg: CORAL, color: "#111018", font: SG, size: 10 })}` : ""}</td><td align="right" style="padding:12px 0;border-bottom:1px solid #2a2836;font-family:${SG};font-size:14px;color:#8d89a6;">${d}</td></tr>`)
        .join("")}</table>` + text(link("See all ten songs &rarr;", `${URL}/album`, { color: "#f5c7d2" }), { font: SG, size: 14, lh: 20, mt: 12 }),
      { pad: "28px 40px 8px" },
    ),
    row(
      heading("On tour this spring", { level: 2, font: SG, size: 18, lh: 24, color: "#ffffff", weight: 700, mb: 10 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${[
          ["12 Apr", "Manchester"],
          ["15 Apr", "Glasgow"],
          ["19 Apr", "Dublin"],
        ]
          .map(([d, c]) => `<tr><td width="80" style="width:80px;padding:8px 0;font-family:${SG};font-size:14px;color:${CORAL};font-weight:700;">${d}</td><td style="padding:8px 0;font-family:${SG};font-size:15px;color:#ffffff;">${c}</td><td align="right" style="padding:8px 0;font-family:${SG};font-size:14px;">${link("Tickets", `${URL}/tour`, { color: "#ffffff" })}</td></tr>`)
          .join("")}</table>`,
      { pad: "24px 40px 28px" },
    ),
    row(text(`You signed up for news from Paper Satellites. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#8d89a6", underline: true, weight: 400 })}`, { font: SG, size: 12, lh: 18, color: "#8d89a6", align: "center" }), { pad: "8px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#111018", body, fonts: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Instrument+Serif:ital@1&display=swap" }) };
})();

export const emails = [chat, streaming, release];
