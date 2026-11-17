// Sample: SaaS product newsletter for a fictional analytics app.
import { layout, row, spacer, text, heading, link, image, button, columns, box, badge, media } from "../lib.mjs";

const F = "'Inter',Helvetica,Arial,sans-serif";
const C = { navy: "#0B1B3F", blue: "#3358FF", mint: "#39D3A0", bg: "#EEF2FB", body: "#4A5573", soft: "#C5CEE6", line: "#E3E8F4" };
const URL = "https://graphwell.example";

export const meta = {
  slug: "graphwell-newsletter",
  from: "Graphwell",
  subject: "What shipped in November: dashboards that explain themselves",
  preheader: "Written summaries on every chart, scheduled reports and Slack alerts.",
};

const logo = `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td width="28" height="28" bgcolor="${C.blue}" style="width:28px;height:28px;border-radius:8px;background-color:${C.blue};font-size:0;line-height:0;">&nbsp;</td>
<td style="padding-left:10px;font-family:${F};font-size:18px;line-height:28px;font-weight:700;color:${C.navy};letter-spacing:-0.01em;">Graphwell</td>
</tr></table>`;

const feature = (n, title, copy, href) =>
  media({
    icon: badge(n, { bg: "#E8EEFF", color: C.blue, size: 36, radius: 10, font: F }),
    html:
      heading(title, { level: 3, font: F, size: 18, lh: 26, color: C.navy, weight: 700, mb: 4 }) +
      text(copy, { font: F, size: 15, lh: 24, color: C.body, mb: 6 }) +
      text(link("Read the changelog &rarr;", href, { color: C.blue }), { font: F, size: 14, lh: 22 }),
  });

const card = (img, alt, title, copy) =>
  box(
    image({ src: img, alt, width: 228, radius: 10 }) +
      heading(title, { level: 3, font: F, size: 17, lh: 24, color: C.navy, mt: 16, mb: 6 }) +
      text(copy, { font: F, size: 14, lh: 22, color: C.body }),
    { bg: "#FFFFFF", pad: "12px 12px 20px", radius: 16 },
  );

const body = [
  row(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td>${logo}</td><td align="right" style="font-family:${F};font-size:12px;line-height:16px;color:${C.body};">${link("View in browser", `${URL}/updates/november`, { color: C.body, weight: 500 })}</td></tr></table>`,
    { pad: "4px 8px 20px", cls: "" },
  ),
  row(
    text("Product update &middot; November 2026", { font: F, size: 13, lh: 18, color: C.mint, weight: 600, mb: 14 }) +
      heading("Dashboards that explain themselves", { font: F, size: 40, lh: 46, color: "#FFFFFF", weight: 700, ls: "-0.02em", cls: "h1", mb: 16 }) +
      text("Every chart in Graphwell now comes with a short written summary of what changed and why, so the whole team reads the same story.", { font: F, size: 16, lh: 26, color: C.soft, mb: 28 }) +
      button({ label: "See what&rsquo;s new", href: `${URL}/whats-new`, bg: C.blue, radius: 10, width: 190, font: F }),
    { bg: C.navy, pad: "44px 40px 32px", radius: "20px 20px 0 0" },
  ),
  row(image({ src: "img/graphwell-hero.jpg", alt: "Graphwell revenue dashboard with a written summary next to the chart", width: 520, radius: 14 }), {
    bg: C.navy,
    pad: "0 40px 40px",
    radius: "0 0 20px 20px",
  }),
  spacer(16),
  row(
    heading("Three things we shipped", { level: 2, font: F, size: 24, lh: 32, color: C.navy, ls: "-0.01em", cls: "h2", mb: 24 }) +
      feature("1", "Written summaries", "Open any chart and read two sentences on what moved. Edit them before you share.", `${URL}/changelog#summaries`) +
      `<div style="height:20px;line-height:20px;font-size:20px;">&nbsp;</div>` +
      feature("2", "Scheduled reports", "Send a dashboard to a team or a channel every Monday at 9:00, as a PDF or a link.", `${URL}/changelog#reports`) +
      `<div style="height:20px;line-height:20px;font-size:20px;">&nbsp;</div>` +
      feature("3", "Alerts in Slack", "Pick a metric, set a limit, and Graphwell posts in the channel you choose when it crosses it.", `${URL}/changelog#alerts`),
    { bg: "#FFFFFF", pad: "36px 40px", radius: "20px" },
  ),
  spacer(16),
  columns(
    [
      { html: card("img/graphwell-reports.jpg", "A weekly report scheduled for two teams", "Reports on a schedule", "Set it once. The right people get the numbers before their first meeting.") },
      { html: card("img/graphwell-alerts.jpg", "Two Graphwell alert messages in Slack", "Alerts where you work", "Limits for sign-ups, refunds or anything you track, posted where the team already talks.") },
    ],
    { total: 576, gap: 24, pad: "0", cls: "" },
  ),
  spacer(8),
  row(
    heading("Coming in December", { level: 2, font: F, size: 20, lh: 28, color: C.navy, mb: 10 }) +
      text("&bull;&nbsp; Goals you can track on any chart<br>&bull;&nbsp; A shared notes panel for each dashboard<br>&bull;&nbsp; CSV export for every table", { font: F, size: 15, lh: 26, color: C.body }),
    { bg: "#E5F8F1", pad: "28px 40px", radius: "20px" },
  ),
  row(
    text(`You&rsquo;re getting this email because you have a Graphwell account.<br>${link("Email preferences", `${URL}/preferences`, { color: C.body, underline: true, weight: 400 })} &nbsp;&middot;&nbsp; ${link("Unsubscribe", `${URL}/unsubscribe`, { color: C.body, underline: true, weight: 400 })}`, {
      font: F,
      size: 12,
      lh: 20,
      color: "#7A86A3",
      align: "center",
    }),
    { pad: "32px 40px 8px", align: "center" },
  ),
].join("\n");

export const html = layout({
  title: meta.subject,
  preheader: meta.preheader,
  bg: C.bg,
  body,
  fonts: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
});
