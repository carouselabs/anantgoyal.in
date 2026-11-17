// Sample: promotional email (a 48-hour sale) for a fictional travel booking brand.
import { layout, row, spacer, text, heading, link, image, button, columns, box } from "../lib.mjs";

const D = "'Archivo','Helvetica Neue',Helvetica,Arial,sans-serif";
const C = { sea: "#0F5C63", deep: "#0A3D42", coral: "#FF5A36", sand: "#FFF4E8", ink: "#13201F", body: "#4A5856", line: "#F0DCC6" };
const URL = "https://farewind.example";

export const meta = {
  slug: "farewind-fare-sale",
  from: "Farewind",
  subject: "48 hours only: up to 30% off spring trips",
  preheader: "Lisbon, Bergen, Madeira and more. Sale ends Sunday at midnight.",
};

const dest = (img, alt, city, line, price) =>
  image({ src: img, alt, width: 264, radius: 14 }) +
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;"><tr>
<td valign="top">${heading(city, { level: 3, font: D, size: 20, lh: 24, color: C.ink, weight: 800, mb: 2 })}${text(line, { font: D, size: 13, lh: 18, color: C.body })}</td>
<td valign="top" align="right" style="white-space:nowrap;">${text("from", { font: D, size: 12, lh: 14, color: C.body, align: "right" })}${text(price, { font: D, size: 22, lh: 26, color: C.coral, weight: 800, align: "right" })}</td>
</tr></table>`;

const body = [
  row(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="font-family:${D};font-size:22px;line-height:26px;font-weight:800;color:${C.sea};letter-spacing:-0.02em;">farewind<span style="color:${C.coral};">.</span></td>
<td align="right" style="font-family:${D};font-size:12px;line-height:16px;color:${C.body};">${link("View online", `${URL}/sale`, { color: C.body, weight: 500 })}</td>
</tr></table>`,
    { pad: "8px 32px 20px" },
  ),
  row(
    text("Ends Sunday at 23:59 &nbsp;&middot;&nbsp; Fares per person, return", { font: D, size: 13, lh: 18, color: "#FFFFFF", weight: 700, align: "center", ls: "0.02em" }),
    { bg: C.coral, pad: "11px 24px", align: "center", radius: "16px 16px 0 0" },
  ),
  row(image({ src: "img/farewind-hero.jpg", alt: "A steep green mountainside above a white sand bay with turquoise surf", width: 600 }), { pad: "0", cls: "" }),
  row(
    text("48-hour fare sale", { font: D, size: 14, lh: 20, color: "#9FE3DA", weight: 700, mb: 10 }) +
      heading("Up to 30% off<br>spring trips", { font: D, size: 54, lh: 54, color: "#FFFFFF", weight: 800, ls: "-0.03em", cls: "h1", mb: 18 }) +
      text("Book flights and stays for April and May before Sunday night. Free changes up to 14 days before you leave.", { font: D, size: 17, lh: 27, color: "#D3ECE9", mb: 28 }) +
      button({ label: "See all deals", href: `${URL}/sale`, bg: C.coral, radius: 12, width: 200, font: D }),
    { bg: C.sea, pad: "40px 40px 44px", radius: "0 0 16px 16px" },
  ),
  spacer(32),
  row(heading("Where people are going", { level: 2, font: D, size: 26, lh: 32, color: C.ink, weight: 800, ls: "-0.02em", cls: "h2" }), { pad: "0 24px 18px" }),
  columns(
    [
      { html: dest("img/farewind-lisbon.jpg", "A narrow street of colourful houses with laundry hung between them", "Lisbon", "3 nights, old town", "$289") },
      { html: dest("img/farewind-bergen.jpg", "Snow-dusted rooftops of an old town seen from above", "Bergen", "4 nights, harbour view", "$412") },
    ],
    { total: 552, gap: 24, pad: "0 24px 8px" },
  ),
  columns(
    [
      { html: dest("img/farewind-madeira.jpg", "Steep green headlands dropping into a deep blue bay", "Madeira", "5 nights, sea view", "$468") },
      {
        html: box(
          heading("Not sure where?", { level: 3, font: D, size: 22, lh: 28, color: "#FFFFFF", weight: 800, mb: 8 }) +
            text("Tell us your dates and budget and we will send three trips that fit.", { font: D, size: 15, lh: 23, color: "#D3ECE9", mb: 18 }) +
            text(link("Plan my trip &rarr;", `${URL}/plan`, { color: "#FFFFFF" }), { font: D, size: 15, lh: 22 }),
          { bg: C.deep, pad: "28px 24px", radius: 14 },
        ),
      },
    ],
    { total: 552, gap: 24, pad: "0 24px 24px" },
  ),
  row(
    box(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="stack" valign="middle" style="padding-right:16px;">${heading("Price drop alerts", { level: 3, font: D, size: 18, lh: 24, color: C.ink, weight: 800, mb: 4 })}${text("Watch a route and we email you when the fare falls.", { font: D, size: 14, lh: 21, color: C.body })}</td>
<td class="stack" valign="middle" align="right" style="padding-top:4px;">${button({ label: "Watch a route", href: `${URL}/alerts`, bg: C.ink, radius: 10, width: 170, height: 44, size: 15, font: D, align: "left" })}</td>
</tr></table>`,
      { bg: C.sand, pad: "22px 24px", radius: 14, border: `1px solid ${C.line}` },
    ),
    { pad: "0 24px 32px" },
  ),
  row(
    text(`You subscribed to Farewind deals. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: C.body, underline: true, weight: 400 })} &nbsp;&middot;&nbsp; ${link("Email preferences", `${URL}/preferences`, { color: C.body, underline: true, weight: 400 })}<br>Prices include taxes and fees. Limited seats at each price.`, {
      font: D,
      size: 12,
      lh: 19,
      color: "#6E7B79",
      align: "center",
    }),
    { pad: "0 40px 8px", align: "center" },
  ),
].join("\n");

export const html = layout({
  title: meta.subject,
  preheader: meta.preheader,
  bg: "#EAF4F2",
  body,
  fonts: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&display=swap",
  css: "td.stack{display:block !important;width:auto !important;text-align:left !important;padding:0 0 12px 0 !important;}",
});
