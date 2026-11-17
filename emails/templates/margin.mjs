// Sample: editorial newsletter for a fictional weekly reading letter.
import { layout, row, spacer, text, heading, link, image, rule, box } from "../lib.mjs";

const SERIF = "'Newsreader',Georgia,'Times New Roman',serif";
const SANS = "Helvetica,Arial,sans-serif";
const C = { paper: "#FAF7F0", ink: "#1B1A17", body: "#45413A", red: "#C2412D", muted: "#857F74", line: "#DCD5C7" };
const URL = "https://sundaymargin.example";

export const meta = {
  slug: "sunday-margin-issue-48",
  from: "The Sunday Margin",
  subject: "Issue 48: The case for reading one book slowly",
  preheader: "Plus three short reads and what we're reading this week.",
};

const item = (img, alt, kicker, title, copy, href) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="120" valign="top" style="width:120px;padding-right:20px;">${image({ src: img, alt, width: 120, fluid: false })}</td>
<td valign="top">` +
  text(kicker, { font: SANS, size: 11, lh: 16, color: C.red, weight: 700, ls: "0.1em", transform: "uppercase", mb: 4 }) +
  heading(`<a href="${href}" style="color:${C.ink};text-decoration:none;">${title}</a>`, { level: 3, font: SERIF, size: 20, lh: 26, color: C.ink, weight: 600, mb: 4 }) +
  text(copy, { font: SERIF, size: 16, lh: 24, color: C.body }) +
  `</td></tr></table>`;

const gap = (h) => `<div style="height:${h}px;line-height:${h}px;font-size:${h}px;">&nbsp;</div>`;

const body = [
  row(
    text(`Issue 48 &nbsp;&middot;&nbsp; 8 November 2026 &nbsp;&middot;&nbsp; ${link("Read online", `${URL}/48`, { color: C.muted, weight: 400, underline: true })}`, { font: SANS, size: 12, lh: 18, color: C.muted, align: "center", mb: 16 }) +
      heading("The Sunday Margin", { font: SERIF, size: 52, lh: 56, color: C.ink, weight: 500, align: "center", ls: "-0.02em", cls: "h1", mb: 10 }) +
      text("A weekly letter about books, reading and the time it takes.", { font: SERIF, size: 17, lh: 24, color: C.body, align: "center", italic: true }),
    { bg: C.paper, pad: "40px 40px 28px", align: "center" },
  ),
  `<tr><td class="px" bgcolor="${C.paper}" style="padding:0 40px;background-color:${C.paper};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:2px solid ${C.ink};font-size:0;line-height:0;height:3px;">&nbsp;</td></tr><tr><td style="border-top:1px solid ${C.ink};font-size:0;line-height:0;height:1px;">&nbsp;</td></tr></table></td></tr>`,
  row(
    image({ src: "img/margin-lead.jpg", alt: "An open book lying on a wooden table in soft light", width: 520 }) +
      text("Essay", { font: SANS, size: 11, lh: 16, color: C.red, weight: 700, ls: "0.1em", transform: "uppercase", mt: 24, mb: 8 }) +
      heading("The case for reading one book slowly", { level: 2, font: SERIF, size: 34, lh: 40, color: C.ink, weight: 600, ls: "-0.01em", cls: "h2", mb: 14 }) +
      text("We finished fewer books this year and remembered more of them. A short argument for a reading pace that leaves room for the margins: underlining, rereading, and putting the book down to think.", { font: SERIF, size: 18, lh: 29, color: C.body, mb: 18 }) +
      text(link("Continue reading &rarr;", `${URL}/48/one-book-slowly`, { color: C.red }), { font: SANS, size: 14, lh: 20 }),
    { bg: C.paper, pad: "32px 40px 36px" },
  ),
  rule(C.line, { pad: "0 40px" }).replace("<td class", `<td bgcolor="${C.paper}" class`).replace('style="padding:0 40px;"', `style="padding:0 40px;background-color:${C.paper};"`),
  row(
    heading("Also this week", { level: 2, font: SANS, size: 13, lh: 18, color: C.ink, weight: 700, ls: "0.08em", mb: 22 }) +
      item("img/margin-books.jpg", "A stack of books seen from the side", "Reading list", "Six short novels for long evenings", "Each under 200 pages, each worth a second read.", `${URL}/48/short-novels`) +
      gap(22) +
      item("img/margin-notebook.jpg", "An open blank notebook with a pencil", "Habit", "Keeping a reading notebook", "One page per book, three questions, no rules beyond that.", `${URL}/48/notebook`) +
      gap(22) +
      item("img/margin-tea.jpg", "A cup of tea on an open notebook", "From readers", "Where you read on Sundays", "Your replies to last week's question, from kitchens to night buses.", `${URL}/48/where-you-read`),
    { bg: C.paper, pad: "32px 40px 36px" },
  ),
  row(
    box(
      text("A note from the editor", { font: SANS, size: 11, lh: 16, color: C.red, weight: 700, ls: "0.1em", transform: "uppercase", mb: 10 }) +
        text("Next week is our 49th issue and the first with a guest essay. If there is a book you keep coming back to, reply and tell us why. We read every answer.", { font: SERIF, size: 17, lh: 27, color: C.body, italic: true }),
      { bg: "#F1ECE1", pad: "26px 28px", radius: 0, border: `1px solid ${C.line}` },
    ),
    { bg: C.paper, pad: "0 40px 40px" },
  ),
  row(
    text(`${link("Forward to a friend", `${URL}/forward`, { color: C.ink, underline: true, weight: 400 })} &nbsp;&middot;&nbsp; ${link("Unsubscribe", `${URL}/unsubscribe`, { color: C.ink, underline: true, weight: 400 })}`, { font: SANS, size: 12, lh: 20, color: C.muted, align: "center", mb: 6 }) +
      text("The Sunday Margin is written and edited by two readers and sent every Sunday morning.", { font: SANS, size: 12, lh: 19, color: C.muted, align: "center" }),
    { pad: "24px 40px 8px", align: "center" },
  ),
].join("\n");

export const html = layout({
  title: meta.subject,
  preheader: meta.preheader,
  bg: "#EFEBE2",
  body,
  fonts: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,400&display=swap",
});
