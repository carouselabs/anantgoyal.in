// Sample: startup marketing email (early access) for a fictional scheduling app.
import { layout, row, spacer, text, heading, link, image, button, columns, box, badge, media } from "../lib.mjs";

const F = "'Plus Jakarta Sans','Helvetica Neue',Helvetica,Arial,sans-serif";
const C = { bg: "#F1EFFA", ink: "#16133A", body: "#55527A", violet: "#5B3DF5", coral: "#FF6B4A", teal: "#16B8A6", amber: "#FFB83D", line: "#E4E1F3" };
const URL = "https://tandemly.example";

export const meta = {
  slug: "tandemly-early-access",
  from: "Tandemly",
  subject: "Early access is open: team schedules that plan themselves",
  preheader: "Join before 30 November and your first three months are free.",
};

const logo = `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="12" height="24" bgcolor="${C.coral}" style="width:12px;height:24px;border-radius:12px 0 0 12px;background-color:${C.coral};font-size:0;line-height:0;">&nbsp;</td>
<td width="12" height="24" bgcolor="${C.violet}" style="width:12px;height:24px;border-radius:0 12px 12px 0;background-color:${C.violet};font-size:0;line-height:0;">&nbsp;</td>
<td style="padding-left:10px;font-family:${F};font-size:18px;line-height:24px;font-weight:800;color:${C.ink};">Tandemly</td>
</tr></table>`;

const benefit = (glyph, bg, title, copy) =>
  media({
    icon: badge(glyph, { bg, color: "#FFFFFF", size: 40, radius: 12, font: F, fontSize: 17 }),
    html: heading(title, { level: 3, font: F, size: 17, lh: 24, color: C.ink, weight: 700, mb: 3 }) + text(copy, { font: F, size: 15, lh: 23, color: C.body }),
  });

const stepCol = (n, title, copy) =>
  text(n, { font: F, size: 13, lh: 18, color: C.violet, weight: 800, mb: 8 }) +
  heading(title, { level: 3, font: F, size: 16, lh: 22, color: C.ink, weight: 700, mb: 4 }) +
  text(copy, { font: F, size: 14, lh: 21, color: C.body });

const gap = (h) => `<div style="height:${h}px;line-height:${h}px;font-size:${h}px;">&nbsp;</div>`;

const body = [
  row(logo, { pad: "8px 32px 24px" }),
  row(image({ src: "img/tandemly-hero.jpg", alt: "A team calendar for the week, planned automatically", width: 600, radius: "24px 24px 0 0" }), { pad: "0", cls: "" }),
  row(
    text("Early access", { font: F, size: 13, lh: 18, color: C.coral, weight: 800, mb: 12 }) +
      heading("Team schedules that plan themselves", { font: F, size: 40, lh: 46, color: C.ink, weight: 800, ls: "-0.02em", cls: "h1", mb: 16 }) +
      text("Tell Tandemly who needs to meet and how much focus time each person wants. It finds the slots, books the rooms and moves things when plans change.", { font: F, size: 17, lh: 27, color: C.body, mb: 28 }) +
      button({ label: "Claim early access", href: `${URL}/early-access`, bg: C.violet, radius: 12, width: 220, font: F }) +
      text("Free for three months for teams who join before 30 November.", { font: F, size: 13, lh: 20, color: C.body, mt: 14 }),
    { bg: "#FFFFFF", pad: "40px 48px 44px", radius: "0 0 24px 24px" },
  ),
  spacer(20),
  row(
    heading("Why teams switch", { level: 2, font: F, size: 24, lh: 30, color: C.ink, weight: 800, cls: "h2", mb: 24 }) +
      benefit("&#9679;", C.violet, "No more calendar ping-pong", "Tandemly checks everyone's hours and time zones before it suggests a slot.") +
      gap(20) +
      benefit("&#9632;", C.teal, "Focus time that stays put", "Each person sets the hours they want free. Meetings plan around them.") +
      gap(20) +
      benefit("&#9650;", C.coral, "Changes handled for you", "Someone is out sick? The week rearranges and everyone gets one update."),
    { bg: "#FFFFFF", pad: "36px 48px", radius: "24px" },
  ),
  spacer(20),
  row(heading("Set up in an afternoon", { level: 2, font: F, size: 24, lh: 30, color: C.ink, weight: 800, cls: "h2" }), { pad: "8px 32px 18px" }),
  columns(
    [
      { html: stepCol("01", "Connect calendars", "Google or Outlook, for the whole team at once.") },
      { html: stepCol("02", "Set the rules", "Working hours, focus time and the meetings you repeat.") },
      { html: stepCol("03", "Let it plan", "Review next week on Friday and send it with one click.") },
    ],
    { total: 536, gap: 24, pad: "0 32px 12px" },
  ),
  row(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td bgcolor="${C.violet}" style="background-color:${C.violet};background-image:linear-gradient(120deg,${C.coral} 0%,${C.violet} 55%,#3D5AFE 100%);border-radius:24px;padding:36px 32px;text-align:center;">` +
      heading("Three months free for early teams", { level: 2, font: F, size: 26, lh: 32, color: "#FFFFFF", weight: 800, align: "center", cls: "h2", mb: 10 }) +
      text("Join before 30 November. No card needed until the trial ends.", { font: F, size: 15, lh: 24, color: "#ECE8FF", align: "center", mb: 22 }) +
      button({ label: "Claim early access", href: `${URL}/early-access`, bg: "#FFFFFF", color: C.violet, radius: 12, width: 220, font: F, align: "center" }) +
      `</td></tr></table>`,
    { pad: "16px 32px 32px", align: "center" },
  ),
  row(
    text(`You&rsquo;re on the Tandemly waitlist. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: C.body, underline: true, weight: 400 })} &nbsp;&middot;&nbsp; ${link("Privacy", `${URL}/privacy`, { color: C.body, underline: true, weight: 400 })}`, {
      font: F,
      size: 12,
      lh: 20,
      color: "#8D8AAE",
      align: "center",
    }),
    { pad: "0 40px 8px", align: "center" },
  ),
].join("\n");

export const html = layout({
  title: meta.subject,
  preheader: meta.preheader,
  bg: C.bg,
  body,
  fonts: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap",
});
