// Sample: product announcement for a fictional budgeting app (dark design).
import { layout, row, spacer, text, heading, link, image, button, columns, box, badge } from "../lib.mjs";

const F = "'Manrope','Helvetica Neue',Helvetica,Arial,sans-serif";
const C = { bg: "#0E0F1A", card: "#171A2B", lime: "#C6F432", lilac: "#9C8CFF", coral: "#FF8A65", text: "#F2F3FA", soft: "#A6AAC6", line: "#262A40" };
const URL = "https://pocketlane.example";

export const meta = {
  slug: "pocketlane-launch",
  from: "Pocketlane",
  subject: "Pocketlane 3.0: budgets you can share",
  preheader: "Shared budgets, bill splitting and a monthly recap. Update the app to try them.",
};

const logo = `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="26" height="26" bgcolor="${C.lime}" style="width:26px;height:26px;border-radius:50%;background-color:${C.lime};font-size:0;line-height:0;">&nbsp;</td>
<td style="padding-left:10px;font-family:${F};font-size:18px;line-height:26px;font-weight:800;color:${C.text};">Pocketlane</td>
</tr></table>`;

const featureCol = (glyph, bg, title, copy) =>
  box(
    badge(glyph, { bg, color: "#0E0F1A", size: 40, radius: 12, font: F, fontSize: 18 }) +
      heading(title, { level: 3, font: F, size: 17, lh: 24, color: C.text, weight: 800, mt: 16, mb: 6 }) +
      text(copy, { font: F, size: 14, lh: 22, color: C.soft }),
    { bg: C.card, pad: "22px 20px", radius: 18 },
  );

const body = [
  row(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td>${logo}</td><td align="right" style="font-family:${F};font-size:12px;font-weight:700;color:${C.lime};">Version 3.0</td></tr></table>`,
    { pad: "8px 32px 32px" },
  ),
  row(
    text("New in Pocketlane", { font: F, size: 14, lh: 20, color: C.lime, weight: 700, align: "center", mb: 12 }) +
      heading("Budgets you can share", { font: F, size: 46, lh: 52, color: C.text, weight: 800, ls: "-0.03em", align: "center", cls: "h1", mb: 16 }) +
      text("Plan a home budget with your partner or flatmates, split bills in two taps and get a short recap at the end of every month.", { font: F, size: 17, lh: 27, color: C.soft, align: "center", mb: 28 }) +
      button({ label: "Update the app", href: `${URL}/update`, bg: C.lime, color: "#0E0F1A", radius: 14, width: 200, font: F, align: "center" }),
    { pad: "8px 48px 36px", align: "center" },
  ),
  row(image({ src: "img/pocketlane-hero.jpg", alt: "Two phone screens: a shared home budget and a monthly recap", width: 600 }), { pad: "0", cls: "" }),
  spacer(36),
  row(heading("What&rsquo;s new in 3.0", { level: 2, font: F, size: 26, lh: 32, color: C.text, weight: 800, cls: "h2" }), { pad: "0 32px 20px" }),
  columns(
    [
      { html: featureCol("&#9679;", C.lime, "Shared budgets", "Invite one person or a whole flat. Everyone sees the same numbers.") },
      { html: featureCol("&divide;", C.lilac, "Split bills", "Add a bill, pick who was there, send requests. Pocketlane does the maths.") },
      { html: featureCol("&#9650;", C.coral, "Monthly recap", "A short summary of where the money went, sent on the first of the month.") },
    ],
    { total: 536, gap: 16, pad: "0 32px 20px" },
  ),
  row(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td bgcolor="${C.card}" style="background-color:${C.card};border-radius:24px;padding:0;">` +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>` +
      `<td class="stack" width="260" valign="top" style="padding:24px 0 24px 24px;">${image({ src: "img/pocketlane-split.jpg", alt: "Splitting a $126.40 team dinner between three people", width: 236, radius: 16 })}</td>` +
      `<td class="stack px" valign="middle" style="padding:24px 28px;">` +
      heading("Split a bill in two taps", { level: 3, font: F, size: 24, lh: 30, color: C.text, weight: 800, mb: 10 }) +
      text("Pocketlane splits to the cent and reminds people for you. Payments land straight in the shared budget.", { font: F, size: 15, lh: 24, color: C.soft, mb: 18 }) +
      text(link("How splitting works &rarr;", `${URL}/split`, { color: C.lime }), { font: F, size: 15, lh: 22 }) +
      `</td></tr></table></td></tr></table>`,
    { pad: "0 32px 40px" },
  ),
  row(
    box(
      heading("Update today", { level: 2, font: F, size: 24, lh: 30, color: "#0E0F1A", weight: 800, align: "center", mb: 8 }) +
        text("Version 3.0 is free for everyone on iPhone and Android.", { font: F, size: 15, lh: 24, color: "#2B3300", align: "center", mb: 20 }) +
        button({ label: "Update the app", href: `${URL}/update`, bg: "#0E0F1A", color: C.lime, radius: 14, width: 200, font: F, align: "center" }),
      { bg: C.lime, pad: "32px 24px", radius: 24 },
    ),
    { pad: "0 32px 40px", align: "center" },
  ),
  row(
    text(`Questions? Reply to this email and a real person will answer.<br>${link("Unsubscribe", `${URL}/unsubscribe`, { color: C.soft, underline: true, weight: 400 })} &nbsp;&middot;&nbsp; ${link("Privacy", `${URL}/privacy`, { color: C.soft, underline: true, weight: 400 })}`, {
      font: F,
      size: 12,
      lh: 20,
      color: "#7D82A3",
      align: "center",
    }),
    { pad: "0 40px 16px", align: "center" },
  ),
].join("\n");

export const html = layout({
  title: meta.subject,
  preheader: meta.preheader,
  bg: C.bg,
  body,
  fonts: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap",
  css: ".stack img{width:100% !important;height:auto !important;} td.stack{display:block !important;width:auto !important;padding:20px !important;}",
});
