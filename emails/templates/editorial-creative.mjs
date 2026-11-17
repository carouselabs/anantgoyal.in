// Editorial, experimental, lifestyle and special concepts: a newspaper digest,
// a neo-brutalist sale, a Swiss typographic event, a restaurant menu card,
// a year in review and a one-question survey.
import { layout, row, text, heading, link, image, button, pill, cells, columns, box } from "../lib.mjs";

const gap = (h) => `<div style="height:${h}px;line-height:${h}px;font-size:${h}px;">&nbsp;</div>`;
const hr = (color, h = 1) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="${h}" bgcolor="${color}" style="height:${h}px;background-color:${color};font-size:0;line-height:0;">&nbsp;</td></tr></table>`;

// ── 12. Newspaper digest ───────────────────────────────────────────────────
const newspaper = (() => {
  const URL = "https://dailyfold.example";
  const PF = "'Playfair Display',Georgia,'Times New Roman',serif";
  const BODY = "Georgia,'Times New Roman',serif";
  const SANS = "Helvetica,Arial,sans-serif";
  const INK = "#151412";
  const meta = { slug: "daily-fold-digest", from: "The Daily Fold", subject: "Saturday: the streets that rebuilt a city", preheader: "Your morning edition in five minutes." };
  const story = (img, alt, kicker, title, copy, href) =>
    image({ src: img, alt, width: 264 }) +
    text(kicker, { font: SANS, size: 11, lh: 16, color: "#a3201a", weight: 700, ls: "0.12em", transform: "uppercase", mt: 12, mb: 4 }) +
    heading(`<a href="${href}" style="color:${INK};text-decoration:none;">${title}</a>`, { level: 3, font: PF, size: 21, lh: 26, color: INK, weight: 700, mb: 6 }) +
    text(copy, { font: BODY, size: 15, lh: 23, color: "#3d3a35" });
  const brief = (title, copy) => heading(title, { level: 3, font: PF, size: 16, lh: 21, color: INK, weight: 700, mb: 4 }) + text(copy, { font: BODY, size: 14, lh: 21, color: "#3d3a35" });
  const body = [
    row(
      text("Saturday 8 November 2026 &nbsp;&middot;&nbsp; Edition 214 &nbsp;&middot;&nbsp; Morning", { font: SANS, size: 11, lh: 16, color: "#6b665e", ls: "0.08em", transform: "uppercase", align: "center", mb: 10 }) +
        hr(INK, 3) +
        heading("The Daily Fold", { font: PF, size: 54, lh: 62, color: INK, weight: 900, align: "center", ls: "-0.01em", cls: "h1", mt: 8, mb: 6 }) +
        hr(INK, 1) +
        gap(2) +
        hr(INK, 1),
      { bg: "#f4f1ea", pad: "28px 24px 0", align: "center" },
    ),
    row(
      image({ src: "img/fold-lead.jpg", alt: "A narrow cobbled alley between ochre and terracotta walls", width: 552 }) +
        text("Cities", { font: SANS, size: 11, lh: 16, color: "#a3201a", weight: 700, ls: "0.12em", transform: "uppercase", mt: 16, mb: 6 }) +
        heading(`<a href="${URL}/cities/streets" style="color:${INK};text-decoration:none;">The streets that rebuilt a city, one courtyard at a time</a>`, { level: 2, font: PF, size: 32, lh: 38, color: INK, weight: 700, cls: "h2", mb: 10 }) +
        text("How a dozen neighbours turned empty lanes into the most walked corner of town, without a plan, a budget or permission.", { font: BODY, size: 17, lh: 27, color: "#3d3a35", italic: true, mb: 10 }) +
        text("By Ines Marlowe &nbsp;&middot;&nbsp; 9 min read", { font: SANS, size: 12, lh: 18, color: "#6b665e" }),
      { bg: "#f4f1ea", pad: "22px 24px 22px" },
    ),
    row(hr("#cfc8ba"), { bg: "#f4f1ea", pad: "0 24px" }),
    columns(
      [
        { html: story("img/fold-side.jpg", "Colourful houses with laundry hung between them", "Design", "Why every new flat is painted the same grey", "A short history of the most popular colour nobody chose.", `${URL}/design/grey`) },
        { html: story("img/fold-roofs.jpg", "Snow-dusted rooftops of an old town", "Weather", "The first snow is early. Here's what changes", "Trains, schools and the bakery queue: the week ahead.", `${URL}/weather/first-snow`) },
      ],
      { total: 552, gap: 24, pad: "22px 24px 6px", bg: "#f4f1ea" },
    ),
    row(hr("#cfc8ba") + text("In brief", { font: SANS, size: 11, lh: 16, color: INK, weight: 700, ls: "0.12em", transform: "uppercase", mt: 14 }), { bg: "#f4f1ea", pad: "8px 24px 4px" }),
    columns(
      [
        { html: brief("Libraries stay open late", "Six branches add Thursday evenings from December.") },
        { html: brief("A new ferry route", "Mornings only for now, with bikes carried free.") },
        { html: brief("Market moves indoors", "The Sunday market takes the old tram depot until March.") },
      ],
      { total: 552, gap: 20, pad: "10px 24px 18px", bg: "#f4f1ea" },
    ),
    row(button({ label: "Read today's edition", href: `${URL}/today`, bg: INK, color: "#f4f1ea", radius: 0, width: 230, font: SANS, align: "center" }), { bg: "#f4f1ea", pad: "8px 24px 34px", align: "center" }),
    row(text(`${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#6b665e", underline: true, weight: 400 })} &nbsp;&middot;&nbsp; ${link("Weekday editions", `${URL}/settings`, { color: "#6b665e", underline: true, weight: 400 })}`, { font: SANS, size: 12, lh: 18, color: "#6b665e", align: "center" }), { pad: "18px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#e7e2d7", body, fonts: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap" }) };
})();

// ── 13. Neo-brutalist sale ─────────────────────────────────────────────────
const brutalist = (() => {
  const URL = "https://gridgoods.example";
  const MONO = "'Space Mono','Courier New',monospace";
  const B = "#000000";
  const meta = { slug: "grid-goods-brutalist", from: "Grid Goods", subject: "SALE. 40% OFF. NO, REALLY.", preheader: "Mugs, prints and stickers. Two days only." };
  // Hard "shadow": thick right and bottom borders, no box-shadow (Outlook ignores it).
  const slab = (inner, bg) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td bgcolor="${bg}" style="background-color:${bg};border:3px solid ${B};border-right-width:9px;border-bottom-width:9px;padding:22px;">${inner}</td></tr></table>`;
  const tick = (n, l) => `<td align="center" style="padding:0 4px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td align="center" bgcolor="#ffffff" style="background-color:#ffffff;border:3px solid ${B};padding:10px 4px;font-family:${MONO};"><span style="font-size:30px;line-height:34px;font-weight:700;color:${B};">${n}</span><br><span style="font-size:11px;line-height:14px;color:${B};">${l}</span></td></tr></table></td>`;
  const body = [
    row(cells([text(`<b style="color:${B};">GRID/GOODS</b>`, { font: MONO, size: 16, lh: 22 }), `<p style="margin:0;text-align:right;">${pill("2 DAYS ONLY", { bg: "#ff6bcb", color: B, font: MONO })}</p>`]), { pad: "8px 28px 20px" }),
    row(slab(heading("SALE.<br>40% OFF.<br>NO, REALLY.", { font: MONO, size: 46, lh: 50, color: B, weight: 700, cls: "h1", mb: 14 }) + text("Every mug, print and sticker sheet. Ends Sunday at midnight, or when it's gone.", { font: MONO, size: 15, lh: 23, color: B, mb: 20 }) + button({ label: "SHOP THE SALE", href: `${URL}/sale`, bg: "#ff6bcb", color: B, radius: 0, width: 220, font: MONO, border: `3px solid ${B}` }), "#ffe94e"), { pad: "0 28px 22px" }),
    row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td style="border:3px solid ${B};border-right-width:9px;border-bottom-width:9px;padding:0;">${image({ src: "img/grid-mugs.jpg", alt: "Enamel mugs and a teapot on a wooden table", width: 528 })}</td></tr></table>`, { pad: "0 28px 22px" }),
    row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${tick("01", "DAY")}${tick("14", "HRS")}${tick("22", "MIN")}</tr></table>` + text("Time left when we sent this.", { font: MONO, size: 11, lh: 16, color: B, align: "center", mt: 10 }), { pad: "0 24px 22px", align: "center" }),
    row(slab(cells([text(`<b>FREE SHIPPING</b><br>over $40`, { font: MONO, size: 14, lh: 20, color: B }), text(`<b>NO CODE</b><br>prices are cut`, { font: MONO, size: 14, lh: 20, color: B })], { gap: 16 }), "#4d7cff"), { pad: "0 28px 26px" }),
    row(text(`${link("UNSUBSCRIBE", `${URL}/unsubscribe`, { color: B, underline: true, weight: 700 })} / ${link("FEWER EMAILS", `${URL}/settings`, { color: B, underline: true, weight: 700 })}`, { font: MONO, size: 11, lh: 18, color: B, align: "center" }), { pad: "8px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#f2efe6", body, fonts: "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" }) };
})();

// ── 14. Swiss typographic event ────────────────────────────────────────────
const swiss = (() => {
  const URL = "https://typeforum.example";
  const H = "'Inter Tight','Helvetica Neue',Helvetica,Arial,sans-serif";
  const RED = "#e3120b";
  const meta = { slug: "type-forum-swiss", from: "Type Forum", subject: "Type Forum 27: programme and tickets", preheader: "Two days, twelve talks, one grid. Basel, 14 and 15 May." };
  const line = (k, v) => `<tr><td width="34%" valign="top" style="width:34%;padding:12px 0;border-top:1px solid #111111;font-family:${H};font-size:12px;line-height:16px;color:${RED};font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">${k}</td><td valign="top" style="padding:12px 0;border-top:1px solid #111111;font-family:${H};font-size:16px;line-height:22px;color:#111111;">${v}</td></tr>`;
  const body = [
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top" style="font-family:${H};font-size:16px;line-height:20px;color:#111111;font-weight:700;">Type<br>Forum</td><td align="right" valign="top" style="font-family:${H};font-size:120px;line-height:96px;color:${RED};font-weight:800;letter-spacing:-0.06em;">27</td></tr></table>` +
        gap(30) +
        heading("Two days about letters, grids and the people who draw them.", { font: H, size: 34, lh: 38, color: "#111111", weight: 700, ls: "-0.02em", cls: "h2", mb: 30 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${line("Date", "14 and 15 May 2027")}${line("Place", "Basel, Volkshaus")}${line("Talks", "12 talks, 4 workshops")}${line("Tickets", "From CHF 180, students CHF 60")}</table>` +
        hr("#111111") +
        gap(30) +
        text("Programme", { font: H, size: 12, lh: 16, color: RED, weight: 700, ls: "0.06em", transform: "uppercase", mb: 8 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${[
          ["09:30", "Opening: the grid after the grid"],
          ["11:00", "Drawing a sans for twelve scripts"],
          ["14:00", "Workshop: setting a newspaper by hand"],
          ["16:30", "Panel: type on small screens"],
        ]
          .map(([t, s]) => `<tr><td width="64" valign="top" style="width:64px;padding:8px 0;font-family:${H};font-size:16px;color:#111111;font-weight:700;">${t}</td><td style="padding:8px 0;font-family:${H};font-size:16px;line-height:22px;color:#111111;">${s}</td></tr>`)
          .join("")}</table>` +
        gap(30) +
        button({ label: "Register now", href: `${URL}/tickets`, bg: RED, radius: 0, width: 200, font: H }) +
        text(link("Full programme &rarr;", `${URL}/programme`, { color: "#111111" }), { font: H, size: 15, lh: 22, mt: 14 }),
      { bg: "#ffffff", pad: "40px 40px 44px" },
    ),
    row(text(`Type Forum, Basel &nbsp;/&nbsp; ${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#666666", underline: true, weight: 400 })}`, { font: H, size: 12, lh: 18, color: "#666666" }), { pad: "18px 40px 8px" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#f2f2f2", body, fonts: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;700;800&display=swap" }) };
})();

// ── 15. Restaurant menu card ───────────────────────────────────────────────
const menu = (() => {
  const URL = "https://saffronrow.example";
  const CG = "'Cormorant Garamond',Georgia,serif";
  const SANS = "Helvetica,Arial,sans-serif";
  const GREEN = "#1f3d2b";
  const GOLD = "#c8a14a";
  const meta = { slug: "saffron-menu", from: "Saffron Row", subject: "This week's tasting menu", preheader: "Five courses from the autumn market. Tables from Thursday." };
  const course = (n, name, desc) => text(n, { font: SANS, size: 11, lh: 16, color: GOLD, weight: 700, ls: "0.2em", align: "center", mb: 2 }) + heading(name, { level: 3, font: CG, size: 26, lh: 30, color: "#f4ecd8", weight: 600, align: "center", mb: 2 }) + text(desc, { font: CG, size: 17, lh: 24, color: "#cbd7cd", align: "center", italic: true, mb: 18 });
  const body = [
    row(text("&#10022;", { font: CG, size: 20, lh: 24, color: GOLD, align: "center", mb: 6 }) + heading("Saffron Row", { font: CG, size: 40, lh: 44, color: "#f4ecd8", weight: 600, align: "center", ls: "0.02em" }) + text("Kitchen &amp; wine bar", { font: SANS, size: 11, lh: 16, color: GOLD, weight: 700, ls: "0.24em", transform: "uppercase", align: "center", mt: 6 }), { bg: GREEN, pad: "36px 32px 26px", align: "center", radius: "14px 14px 0 0" }),
    row(image({ src: "img/saffron-veg.jpg", alt: "Fresh vegetables, red onion and peppercorns on a wooden board", width: 552 }), { bg: GREEN, pad: "0 24px" }),
    row(
      heading("This week's tasting menu", { level: 2, font: CG, size: 32, lh: 38, color: "#f4ecd8", weight: 600, align: "center", italic: true, mb: 6 }) +
        text("Five courses &nbsp;&middot;&nbsp; &pound;68 &nbsp;&middot;&nbsp; wine pairing &pound;42", { font: SANS, size: 13, lh: 18, color: GOLD, align: "center", mb: 26 }) +
        course("I", "Beetroot, smoked curd", "hazelnut, sorrel") +
        course("II", "Roast squash broth", "brown butter, sage") +
        course("III", "Hake, mussels", "leek, saffron cream") +
        course("IV", "Venison, celeriac", "blackberry, juniper") +
        course("V", "Pear tarte fine", "creme fraiche, honey") +
        button({ label: "Book a table", href: `${URL}/book`, bg: GOLD, color: GREEN, radius: 0, width: 200, font: SANS, align: "center" }),
      { bg: GREEN, pad: "34px 32px 36px", align: "center" },
    ),
    row(text(`<b style="color:${GREEN};">Thursday to Sunday</b> &nbsp;&middot;&nbsp; Two sittings, 18:00 and 20:30`, { font: SANS, size: 13, lh: 20, color: "#4b5a4f", align: "center" }) + text(link("See the full menu &rarr;", `${URL}/menu`, { color: GREEN }), { font: SANS, size: 13, lh: 20, align: "center", mt: 6 }), { bg: "#f4ecd8", pad: "20px 32px", align: "center", radius: "0 0 14px 14px" }),
    row(text(`You signed up at Saffron Row. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#6b6f68", underline: true, weight: 400 })}`, { font: SANS, size: 12, lh: 18, color: "#6b6f68", align: "center" }), { pad: "18px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#e9e4d6", body, fonts: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&display=swap" }) };
})();

// ── 16. Year in review ─────────────────────────────────────────────────────
const recap = (() => {
  const URL = "https://sundaymargin.example";
  const SG = "'Space Grotesk',Helvetica,Arial,sans-serif";
  const SERIF = "'Instrument Serif',Georgia,serif";
  const meta = { slug: "margin-year-recap", from: "The Sunday Margin", subject: "Your 2026 in reading", preheader: "48 issues, one long streak and the essay you came back to." };
  const block = (bg, color, kicker, big, small, radius) =>
    row(text(kicker, { font: SG, size: 12, lh: 16, color, weight: 700, ls: "0.16em", transform: "uppercase", mb: 10 }) + heading(big, { font: SERIF, size: 64, lh: 64, color, weight: 400, ls: "-0.02em", cls: "h1", mb: 10 }) + text(small, { font: SG, size: 16, lh: 24, color }), { bg, pad: "36px 36px", radius });
  const body = [
    row(text("The Sunday Margin &nbsp;&middot;&nbsp; 2026 in review", { font: SG, size: 13, lh: 18, color: "#1b1a17", weight: 700 }), { pad: "8px 36px 18px" }),
    block("#c2412d", "#fff6ef", "This year you read", "48 issues", "That's every Sunday but four. Your longest run was 19 weeks in a row.", "18px 18px 0 0"),
    block("#f3e3c3", "#2a1d10", "The essay you came back to", "&ldquo;Reading one book slowly&rdquo;", "You opened it three times. So did a lot of other readers."),
    block("#1d2a44", "#e9eefb", "Your Sundays, in minutes", "312", "About six minutes a week, mostly before 9am."),
    row(heading("Thank you for reading.", { level: 2, font: SERIF, size: 34, lh: 38, color: "#1b1a17", weight: 400, cls: "h2", mb: 10 }) + text("Issue 49 lands next Sunday with our first guest essay. Your full year, with every issue you opened, is one click away.", { font: SG, size: 16, lh: 25, color: "#45413a", mb: 22 }) + button({ label: "See your full year", href: `${URL}/2026`, bg: "#1b1a17", color: "#faf7f0", radius: 999, width: 210, font: SG }), { bg: "#faf7f0", pad: "34px 36px 38px", radius: "0 0 18px 18px" }),
    row(text(`${link("Unsubscribe", `${URL}/unsubscribe`, { color: "#857f74", underline: true, weight: 400 })}`, { font: SG, size: 12, lh: 18, color: "#857f74", align: "center" }), { pad: "18px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#efebe2", body, fonts: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Instrument+Serif&display=swap" }) };
})();

// ── 17. One-question survey ────────────────────────────────────────────────
const survey = (() => {
  const URL = "https://pocketlane.example";
  const F = "'Manrope',Helvetica,Arial,sans-serif";
  const LIME = "#c6f432";
  const meta = { slug: "pocketlane-survey", from: "Pocketlane", subject: "One question, ten seconds", preheader: "How likely are you to recommend Pocketlane?" };
  // Each score is a real link: no forms or scripts, which most inboxes block.
  const score = (n) => `<td align="center" style="padding:3px;"><a href="${URL}/survey/nps?score=${n}" style="display:block;background-color:${n >= 9 ? LIME : "#1e2133"};color:${n >= 9 ? "#0e0f1a" : "#f2f3fa"};border-radius:10px;font-family:${F};font-size:16px;font-weight:800;line-height:44px;text-align:center;text-decoration:none;">${n}</a></td>`;
  const body = [
    row(text(`<b style="color:#f2f3fa;">Pocketlane</b>`, { font: F, size: 18, lh: 24 }), { pad: "8px 32px 22px" }),
    row(
      text("One question, ten seconds", { font: F, size: 13, lh: 18, color: LIME, weight: 700, mb: 10 }) +
        heading("How likely are you to recommend Pocketlane to a friend?", { font: F, size: 28, lh: 34, color: "#f2f3fa", weight: 800, ls: "-0.02em", cls: "h2", mb: 22 }) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>${[0, 1, 2, 3, 4, 5].map(score).join("")}</tr></table>` +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>${[6, 7, 8, 9, 10].map(score).join("")}</tr></table>` +
        cells([text("0 = not likely", { font: F, size: 12, lh: 16, color: "#a6aac6" }), text("10 = very likely", { font: F, size: 12, lh: 16, color: "#a6aac6", align: "right" })]) +
        gap(20) +
        text(`Pressing a number records your answer. ${link("Tell us more instead", `${URL}/survey/nps/comment`, { color: LIME })}`, { font: F, size: 14, lh: 22, color: "#a6aac6" }),
      { bg: "#171a2b", pad: "30px 28px 32px", radius: "18px" },
    ),
    row(text(`You get product surveys a few times a year. ${link("No more surveys", `${URL}/settings/surveys`, { color: "#a6aac6", underline: true, weight: 400 })}`, { font: F, size: 12, lh: 18, color: "#7d82a3", align: "center" }), { pad: "20px 40px 8px", align: "center" }),
  ].join("\n");
  return { meta, html: layout({ title: meta.subject, preheader: meta.preheader, bg: "#0e0f1a", body, fonts: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap" }) };
})();

export const emails = [newspaper, brutalist, swiss, menu, recap, survey];
