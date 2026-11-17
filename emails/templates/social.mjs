// Social-inspired concepts: a photo post, a thread, a video announcement.
// Original layouts that borrow the shape of a social feed, not any brand's assets.
import { layout, row, text, heading, link, image, button, avatar, pill, cells } from "../lib.mjs";

const INTER = "'Inter',Helvetica,Arial,sans-serif";
const INTER_FONT = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";

// ── 1. Photo post ───────────────────────────────────────────────────────────
const crumb = (() => {
  const URL = "https://littleember.example";
  const meta = { slug: "ember-social-post", from: "Little Ember Bakehouse", subject: "Saturday's tray is out of the oven", preheader: "Cardamom buns, hazelnut tarts and the first plum galettes." };
  const muted = "#737373";
  const body = [
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border:1px solid #e5e5e5;border-radius:16px;background-color:#ffffff;"><tr><td style="padding:14px 16px;">` +
        cells([avatar("LE", { bg: "#c2410c", size: 38, font: INTER }), text(`<b style="color:#111;">littleemberbakehouse</b><br><span style="color:${muted};font-size:12px;">Leith, Edinburgh</span>`, { font: INTER, size: 14, lh: 18 }), `<p style="margin:0;text-align:right;font-family:${INTER};font-size:22px;line-height:22px;color:#111;">&middot;&middot;&middot;</p>`], { widths: [50, null, 40], gap: 10 }) +
        `</td></tr><tr><td style="padding:0;">${image({ src: "img/crumb-post.jpg", alt: "Bowls of nuts and a pastry on a dark wooden table", width: 520 })}</td></tr><tr><td style="padding:14px 16px 4px;">` +
        `<p style="margin:0;font-family:${INTER};font-size:22px;line-height:24px;color:#111;letter-spacing:6px;">&#9825; &#9711; &#10148;</p>` +
        text("1,284 likes", { font: INTER, size: 14, lh: 20, color: "#111", weight: 700, mt: 10 }) +
        text(`<b>littleemberbakehouse</b> Saturday's tray: cardamom buns, hazelnut tarts and the first plum galettes of the season. Out of the oven at 8. <span style="color:#00376b;">#saturdaybake #cardamombuns</span>`, { font: INTER, size: 14, lh: 21, color: "#111", mt: 4 }) +
        text(link("View all 96 comments", `${URL}/post`, { color: muted, weight: 400 }), { font: INTER, size: 14, lh: 20, mt: 6 }) +
        text(`<b>mairi.bakes</b> The galettes last week were unreal`, { font: INTER, size: 14, lh: 20, color: "#111", mt: 4 }) +
        text(`<b>tom_in_leith</b> Saving two cardamom buns for me please`, { font: INTER, size: 14, lh: 20, color: "#111", mt: 2 }) +
        text("2 hours ago", { font: INTER, size: 11, lh: 16, color: muted, mt: 8, mb: 12, ls: "0.04em", transform: "uppercase" }) +
        `</td></tr></table>`,
      { pad: "8px 40px 0" },
    ),
    row(button({ label: "See the full post", href: `${URL}/post`, bg: "#111111", radius: 10, width: 200, font: INTER, align: "center" }) + text(link("Order for Saturday collection", `${URL}/order`, { color: "#c2410c" }), { font: INTER, size: 14, lh: 20, align: "center", mt: 14 }), { pad: "24px 40px 8px", align: "center" }),
    row(text(`You follow Little Ember on our mailing list. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: muted, underline: true, weight: 400 })}`, { font: INTER, size: 12, lh: 18, color: muted, align: "center" }), { pad: "20px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#fafafa", body, fonts: INTER_FONT }) };
})();

// ── 2. Thread ───────────────────────────────────────────────────────────────
const thread = (() => {
  const URL = "https://ferncastle.example";
  const meta = { slug: "ferncastle-thread", from: "Rowan Vale, Ferncastle", subject: "What a four-day week did to our team (a thread)", preheader: "Four posts on output, hiring and the meetings we cut." };
  const posts = [
    ["We moved the whole team to a four-day week last spring. Here's what happened, in four posts.", "48", "210", "1.2K"],
    ["1/ Output held. We cut two recurring meetings and moved status updates into writing, which gave back more time than Friday took.", "31", "96", "640"],
    ["2/ Hiring got easier. Every candidate asked about it, and two told us it was why they applied.", "22", "74", "512"],
    ["3/ The hard part was support. We now rotate one person on Fridays, and they take a Monday off instead.", "40", "58", "433"],
  ];
  const line = `<tr><td width="40" align="center" style="width:40px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="2" height="18" bgcolor="#cfd9de" style="width:2px;height:18px;background-color:#cfd9de;font-size:0;line-height:0;">&nbsp;</td></tr></table></td><td></td></tr>`;
  const post = ([t, r, rt, l], i) =>
    `<tr><td width="40" valign="top" style="width:40px;">${avatar("RV", { bg: "#0f766e", size: 40, font: INTER })}</td><td valign="top" style="padding-left:12px;">` +
    text(`<b style="color:#0f1419;">Rowan Vale</b> <span style="color:#536471;">@rowanvale &middot; ${i === 0 ? "2h" : "2h"}</span>`, { font: INTER, size: 15, lh: 20 }) +
    text(t, { font: INTER, size: 16, lh: 24, color: "#0f1419", mt: 2 }) +
    text(`&#128172; ${r} &nbsp;&nbsp; &#8635; ${rt} &nbsp;&nbsp; &#9825; ${l}`, { font: INTER, size: 13, lh: 18, color: "#536471", mt: 8 }) +
    `</td></tr>`;
  const body = [
    row(text(`A thread from <b>Rowan Vale</b>, founder of Ferncastle`, { font: INTER, size: 13, lh: 18, color: "#536471" }), { pad: "8px 40px 16px" }),
    row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${posts.map((p, i) => post(p, i) + (i < posts.length - 1 ? line : "")).join("")}</table>`, { bg: "#ffffff", pad: "24px 28px", radius: "16px" }),
    row(button({ label: "Read the full thread", href: `${URL}/four-day-week`, bg: "#0f1419", radius: 999, width: 220, font: INTER }) + text(`Or reply to this email: Rowan reads every one.`, { font: INTER, size: 14, lh: 20, color: "#536471", mt: 14 }), { pad: "24px 40px 8px" }),
    row(text(`You subscribed to Rowan's posts by email. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#536471", underline: true, weight: 400 })}`, { font: INTER, size: 12, lh: 18, color: "#536471" }), { pad: "20px 40px 8px" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#f7f9f9", body, fonts: INTER_FONT }) };
})();

// ── 3. Video announcement ───────────────────────────────────────────────────
const video = (() => {
  const URL = "https://bloomandpour.example";
  const RED = "#e5282d";
  const meta = { slug: "bloom-video", from: "Bloom & Pour", subject: "New video: the 4-minute pour-over", preheader: "Twelve minutes, one kettle, any coffee." };
  const chapters = [
    ["0:00", "What you need"],
    ["1:42", "The bloom"],
    ["4:10", "The pour"],
    ["9:30", "Tasting it side by side"],
  ];
  const body = [
    row(cells([avatar("B", { bg: "#111111", size: 36, font: INTER }), text(`<b style="color:#0f0f0f;">Bloom &amp; Pour</b><br><span style="color:#606060;font-size:12px;">New on the channel</span>`, { font: INTER, size: 14, lh: 18 }), `<p style="margin:0;text-align:right;">${pill("New video", { bg: RED, color: "#fff", font: INTER })}</p>`], { widths: [46, null, 120], gap: 10 }), { bg: "#ffffff", pad: "20px 24px", radius: "16px 16px 0 0" }),
    row(image({ src: "img/bloom-thumb.jpg", alt: "Video thumbnail: The 4-minute pour-over, 12 minutes 48 seconds, with a play button", width: 552, radius: 12, href: `${URL}/watch/pour-over` }), { bg: "#ffffff", pad: "0 24px" }),
    row(
      heading("The 4-minute pour-over that works with any coffee", { font: INTER, size: 26, lh: 32, color: "#0f0f0f", weight: 700, ls: "-0.01em", cls: "h2", mt: 18, mb: 6 }) +
        text("Bloom &amp; Pour &middot; 12:48 &middot; Out now", { font: INTER, size: 13, lh: 18, color: "#606060", mb: 14 }) +
        text("One kettle, one dripper and no scales. We brew the same beans three ways and show which small change makes the biggest difference.", { font: INTER, size: 15, lh: 24, color: "#272727", mb: 16 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${chapters.map(([t, c]) => `<tr><td width="56" style="width:56px;padding:6px 0;font-family:'Courier New',monospace;font-size:14px;color:#065fd4;">${link(t, `${URL}/watch/pour-over?t=${t}`, { color: "#065fd4", weight: 700 })}</td><td style="padding:6px 0;font-family:${INTER};font-size:14px;color:#0f0f0f;border-bottom:1px solid #eeeeee;">${c}</td></tr>`).join("")}</table>` +
        `<div style="height:22px;line-height:22px;font-size:22px;">&nbsp;</div>` +
        button({ label: "Watch the video", href: `${URL}/watch/pour-over`, bg: RED, radius: 999, width: 200, font: INTER }) +
        text("The video plays on our channel; the picture above links straight to it.", { font: INTER, size: 12, lh: 18, color: "#606060", mt: 12 }),
      { bg: "#ffffff", pad: "0 24px 28px", radius: "0 0 16px 16px" },
    ),
    row(text(`You subscribed to new videos from Bloom &amp; Pour. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#606060", underline: true, weight: 400 })}`, { font: INTER, size: 12, lh: 18, color: "#606060", align: "center" }), { pad: "20px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#f2f2f2", body, fonts: INTER_FONT }) };
})();

export const emails = [crumb, thread, video];
