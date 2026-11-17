// Email-safe HTML helpers.
//
// Every sample email in /emails/templates is built from these pieces so the
// output follows the techniques that survive real inboxes:
//   - table layout (role="presentation"), 600px container, Outlook ghost tables
//   - inline styles on every element; one <style> block only for media queries
//     and client resets (clients that strip <style> still get a usable email)
//   - hybrid ("spongy") columns: inline-block divs with max-width, so they stack
//     on narrow screens even where media queries are ignored (Gmail app with
//     non-Google accounts), plus mso tables for Outlook on Windows
//   - bulletproof buttons: VML roundrect for Outlook, padded <a> elsewhere
//   - images with width, height, alt and display:block; JPG/PNG only
//   - no JavaScript, no external CSS, no forms, no SVG

export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const style = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${v}`)
    .join(";");

export const WIDTH = 600;

/**
 * The whole document.
 * @param {object} o
 * @param {string} o.title       <title>, also what "view in browser" shows
 * @param {string} o.preheader   inbox preview text after the subject
 * @param {string} o.bg          outer background colour
 * @param {string} o.body        rows (<tr>…</tr>) for the 600px container
 * @param {string} [o.fonts]     Google Fonts CSS URL (loaded by Apple Mail, iOS, Samsung; others use the fallbacks)
 * @param {string} [o.css]       extra CSS appended inside the media-query style block
 * @param {string} [o.outerPad]  space around the 600px container (class "outer", so phones can override it)
 */
export function layout({ title, preheader, bg, body, fonts, css = "", containerBg = "transparent", outerPad = "24px 12px" }) {
  // Pad the preheader so the inbox preview doesn't pull in body text.
  const filler = "&#8199;&#65279;&#847; ".repeat(60);
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>td,th,div,p,a,h1,h2,h3{font-family:Arial,Helvetica,sans-serif !important;}</style>
<![endif]-->
${fonts ? `<!--[if !mso]><!--><link href="${fonts}" rel="stylesheet"><!--<![endif]-->` : ""}
<style>
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
  a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important;}
  u + #body a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}
  #MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit;}
  @media screen and (max-width:620px){
    .container{width:100% !important;}
    .px{padding-left:24px !important;padding-right:24px !important;}
    .stack{display:block !important;width:100% !important;max-width:100% !important;}
    .img-fluid{width:100% !important;height:auto !important;}
    .h1{font-size:34px !important;line-height:40px !important;}
    .h2{font-size:24px !important;line-height:30px !important;}
    .center-m{text-align:center !important;}
    .hide-m{display:none !important;max-height:0 !important;overflow:hidden !important;}
    .pb-m{padding-bottom:24px !important;}
    ${css}
  }
</style>
</head>
<body id="body" style="margin:0;padding:0;width:100%;background-color:${bg};">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${esc(preheader)}${filler}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${bg};">
<tr>
<td align="center" class="outer" style="padding:${outerPad};">
<!--[if mso]><table role="presentation" width="${WIDTH}" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" class="container" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:${WIDTH}px;max-width:${WIDTH}px;background-color:${containerBg};">
${body}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td>
</tr>
</table>
</body>
</html>
`;
}

/** One full-width row. `pad` is CSS padding; `cls` adds classes (e.g. "px"). */
export function row(inner, { bg, pad = "0", align = "left", cls = "px", radius, extra = {} } = {}) {
  const s = style({
    padding: pad,
    backgroundColor: bg,
    borderRadius: radius,
    ...extra,
  });
  return `<tr><td class="${cls}" align="${align}" ${bg ? `bgcolor="${bg}"` : ""} style="${s}">${inner}</td></tr>`;
}

export const spacer = (h, bg) =>
  `<tr><td ${bg ? `bgcolor="${bg}"` : ""} style="height:${h}px;line-height:${h}px;font-size:${h}px;${bg ? `background-color:${bg};` : ""}">&nbsp;</td></tr>`;

/** Text block. Use inside a row. */
export function text(content, { font, size = 16, lh = 26, color = "#333", weight = 400, align = "left", mt = 0, mb = 0, cls = "", ls, transform, italic } = {}) {
  const s = style({
    margin: `${mt}px 0 ${mb}px 0`,
    fontFamily: font,
    fontSize: `${size}px`,
    lineHeight: `${lh}px`,
    color,
    fontWeight: weight,
    textAlign: align,
    letterSpacing: ls,
    textTransform: transform,
    fontStyle: italic ? "italic" : undefined,
    msoLineHeightRule: "exactly",
  });
  return `<p ${cls ? `class="${cls}"` : ""} style="${s}">${content}</p>`;
}

export function heading(content, { level = 1, ...opts } = {}) {
  const tag = `h${level}`;
  const { font, size = 32, lh = 40, color = "#111", weight = 700, align = "left", mt = 0, mb = 0, cls = "", ls } = opts;
  const s = style({
    margin: `${mt}px 0 ${mb}px 0`,
    fontFamily: font,
    fontSize: `${size}px`,
    lineHeight: `${lh}px`,
    color,
    fontWeight: weight,
    textAlign: align,
    letterSpacing: ls,
    msoLineHeightRule: "exactly",
  });
  return `<${tag} ${cls ? `class="${cls}"` : ""} style="${s}">${content}</${tag}>`;
}

export const link = (label, href, { color, weight = 600, underline = false } = {}) =>
  `<a href="${href}" style="${style({ color, fontWeight: weight, textDecoration: underline ? "underline" : "none" })}">${label}</a>`;

/** Image. `fluid` makes it scale down in narrow screens. */
export function image({ src, alt, width, height, radius = 0, fluid = true, align, href, bg }) {
  const s = style({
    display: "block",
    width: `${width}px`,
    maxWidth: "100%",
    height: "auto",
    border: 0,
    borderRadius: radius ? (typeof radius === "number" ? `${radius}px` : radius) : undefined,
    backgroundColor: bg,
    margin: align === "center" ? "0 auto" : undefined,
  });
  const img = `<img src="${src}" width="${width}" ${height ? `height="${height}"` : ""} alt="${esc(alt)}" ${fluid ? 'class="img-fluid"' : ""} style="${s}">`;
  return href ? `<a href="${href}" style="display:block;">${img}</a>` : img;
}

/**
 * Bulletproof button: VML for Outlook on Windows, padded link everywhere else.
 */
export function button({ label, href, bg, color = "#fff", font = "Arial,Helvetica,sans-serif", radius = 8, width = 220, height = 48, size = 16, align = "left", border }) {
  const arc = Math.round((radius / height) * 100);
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${align}" style="margin:${align === "center" ? "0 auto" : "0"};">
<tr><td align="center" bgcolor="${bg}" style="border-radius:${radius}px;background-color:${bg};${border ? `border:${border};` : ""}">
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arc}%" stroke="f" fillcolor="${bg}">
<w:anchorlock/>
<center style="color:${color};font-family:Arial,sans-serif;font-size:${size}px;font-weight:bold;">${label}</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!--><a href="${href}" style="display:inline-block;padding:${Math.round((height - size * 1.25) / 2)}px 28px;font-family:${font};font-size:${size}px;line-height:${Math.round(size * 1.25)}px;font-weight:700;color:${color};text-decoration:none;border-radius:${radius}px;background-color:${bg};mso-hide:all;">${label}</a><!--<![endif]-->
</td></tr></table>`;
}

/**
 * Hybrid columns. `cols` is a list of { html, width } where width is the column's
 * share of `total` in px. Columns sit side by side when there is room and stack
 * when there isn't, with or without media queries.
 */
export function columns(cols, { total = 552, gap = 24, valign = "top", pad = "0 24px", bg, cls = "px" } = {}) {
  const n = cols.length;
  const inner = cols
    .map((c, i) => {
      const w = c.width ?? Math.floor((total - gap * (n - 1)) / n);
      const msoOpen = i === 0 ? `<!--[if mso]><table role="presentation" width="${total}" cellpadding="0" cellspacing="0" border="0"><tr><td width="${w}" valign="${valign}"><![endif]-->` : `<!--[if mso]></td><td width="${gap}" style="font-size:0;line-height:0;">&nbsp;</td><td width="${w}" valign="${valign}"><![endif]-->`;
      const div = `<div class="stack" style="display:inline-block;width:100%;max-width:${w}px;vertical-align:${valign};${i < n - 1 ? `margin-right:${gap}px;` : ""}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0 0 ${n > 1 ? 16 : 0}px 0;font-size:16px;">${c.html}</td></tr></table></div>`;
      return msoOpen + div;
    })
    .join("");
  return `<tr><td class="${cls}" ${bg ? `bgcolor="${bg}"` : ""} style="padding:${pad};font-size:0;text-align:left;${bg ? `background-color:${bg};` : ""}">${inner}<!--[if mso]></td></tr></table><![endif]--></td></tr>`;
}

/** A coloured box (table cell) around content, e.g. a card or callout. */
export function box(inner, { bg = "#fff", pad = "24px", radius = 12, border, width = "100%" } = {}) {
  return `<table role="presentation" width="${width}" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td bgcolor="${bg}" style="${style({ padding: pad, backgroundColor: bg, borderRadius: `${radius}px`, border })}">${inner}</td></tr></table>`;
}

/** A thin rule. */
export const rule = (color = "#e5e5e5", { pad = "0 40px", cls = "px" } = {}) =>
  `<tr><td class="${cls}" style="padding:${pad};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid ${color};font-size:0;line-height:0;height:1px;">&nbsp;</td></tr></table></td></tr>`;

/** A small coloured badge with a number or glyph, drawn with a table cell (no image). */
export function badge(content, { bg, color = "#fff", size = 36, radius = 10, font = "Arial,Helvetica,sans-serif", fontSize = 15 } = {}) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="${size}" height="${size}" bgcolor="${bg}" style="width:${size}px;height:${size}px;border-radius:${radius}px;background-color:${bg};color:${color};font-family:${font};font-size:${fontSize}px;font-weight:700;line-height:${size}px;">${content}</td></tr></table>`;
}

/** Icon-and-text pair laid out with a table (stays side by side on phones). */
export function media({ icon, html, gap = 16, valign = "top", iconWidth = 40 }) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="${iconWidth}" valign="${valign}" style="width:${iconWidth}px;padding-right:${gap}px;">${icon}</td><td valign="${valign}">${html}</td></tr></table>`;
}

/** A round avatar with initials, drawn with a table cell (no image needed). */
export function avatar(initials, { bg = "#4766ff", color = "#fff", size = 40, font = "Arial,Helvetica,sans-serif" } = {}) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td align="center" valign="middle" width="${size}" height="${size}" bgcolor="${bg}" style="width:${size}px;height:${size}px;border-radius:${size}px;background-color:${bg};color:${color};font-family:${font};font-size:${Math.round(size * 0.38)}px;font-weight:700;line-height:${size}px;">${initials}</td></tr></table>`;
}

/** A small rounded label. */
export function pill(label, { bg = "#eef0ff", color = "#3358ff", font = "Arial,Helvetica,sans-serif", size = 12 } = {}) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;display:inline-table;"><tr><td bgcolor="${bg}" style="background-color:${bg};border-radius:999px;padding:4px 10px;font-family:${font};font-size:${size}px;line-height:${size + 4}px;font-weight:700;color:${color};">${label}</td></tr></table>`;
}

/** A row of cells laid out side by side that never stack (icons, stats, tabs). */
export function cells(items, { gap = 8, valign = "middle", widths } = {}) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${items
    .map((html, i) => `<td valign="${valign}" ${widths ? `width="${widths[i]}"` : ""} style="${i < items.length - 1 ? `padding-right:${gap}px;` : ""}">${html}</td>`)
    .join("")}</tr></table>`;
}
