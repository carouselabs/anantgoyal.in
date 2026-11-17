// Sample: welcome email for a fictional coffee subscription.
import { layout, row, spacer, text, heading, link, image, button, columns, box, media } from "../lib.mjs";

const SERIF = "'DM Serif Display',Georgia,'Times New Roman',serif";
const SANS = "'DM Sans','Helvetica Neue',Helvetica,Arial,sans-serif";
const C = { cream: "#FBF6EE", paper: "#FFFFFF", espresso: "#3B2618", caramel: "#C9893F", sage: "#59705A", body: "#5E4B3E", line: "#EADFD0" };
const URL = "https://morrowroast.example";

export const meta = {
  slug: "morrow-welcome",
  from: "Morrow Roast",
  subject: "Welcome to the club, Sam",
  preheader: "Your first bag ships on Monday. Here's how the club works.",
};

const step = (n, title, copy) =>
  media({
    icon: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td align="center" valign="middle" width="38" height="38" style="width:38px;height:38px;border-radius:50%;border:1.5px solid ${C.caramel};font-family:${SERIF};font-size:18px;line-height:36px;color:${C.caramel};">${n}</td></tr></table>`,
    iconWidth: 38,
    html:
      heading(title, { level: 3, font: SANS, size: 17, lh: 24, color: C.espresso, weight: 700, mb: 2 }) +
      text(copy, { font: SANS, size: 15, lh: 23, color: C.body }),
  });

const gap = (h) => `<div style="height:${h}px;line-height:${h}px;font-size:${h}px;">&nbsp;</div>`;

const body = [
  row(
    heading("Morrow Roast", { font: SERIF, size: 28, lh: 32, color: C.espresso, weight: 400, align: "center", mb: 2 }) +
      text("Roast Club", { font: SANS, size: 12, lh: 16, color: C.caramel, weight: 700, align: "center", ls: "0.14em" }),
    { pad: "12px 24px 28px", align: "center" },
  ),
  row(image({ src: "img/morrow-hero.jpg", alt: "Three white bowls of coffee beans from dark to light roast", width: 600, radius: "18px 18px 0 0" }), { pad: "0", cls: "" }),
  row(
    heading("Welcome to the club, Sam.", { font: SERIF, size: 42, lh: 48, color: C.espresso, weight: 400, cls: "h1", mb: 14 }) +
      text("Your first bag ships on Monday, roasted the Friday before. Until then, here is how the club works and how to make it yours.", { font: SANS, size: 17, lh: 27, color: C.body, mb: 30 }) +
      step("1", "Pick your grind", "Whole bean, or ground for filter, espresso or a cafetiere.") +
      gap(18) +
      step("2", "Choose how often", "Every one, two or four weeks. Skip or pause from your account.") +
      gap(18) +
      step("3", "Rate each bag", "Tell us what you liked and the next roast will lean that way.") +
      gap(32) +
      button({ label: "Set up my first delivery", href: `${URL}/account/setup`, bg: C.espresso, color: C.cream, radius: 6, width: 260, font: SANS }),
    { bg: C.paper, pad: "40px 48px 44px", radius: "0 0 18px 18px" },
  ),
  spacer(28),
  row(heading("What lands at your door", { level: 2, font: SERIF, size: 28, lh: 34, color: C.espresso, weight: 400, cls: "h2" }), { pad: "0 24px 18px" }),
  columns(
    [
      {
        html:
          image({ src: "img/morrow-latte.jpg", alt: "A latte with rosetta art in a white cup", width: 264, radius: 12 }) +
          heading("Seasonal single origins", { level: 3, font: SANS, size: 16, lh: 22, color: C.espresso, weight: 700, mt: 14, mb: 4 }) +
          text("A new coffee every delivery, with tasting notes and where it was grown.", { font: SANS, size: 14, lh: 22, color: C.body }),
      },
      {
        html:
          image({ src: "img/morrow-roast.jpg", alt: "Freshly roasted beans pouring into a cooling tray", width: 264, radius: 12 }) +
          heading("Roasted to order", { level: 3, font: SANS, size: 16, lh: 22, color: C.espresso, weight: 700, mt: 14, mb: 4 }) +
          text("We roast on Fridays and post on Mondays, so the beans are days old, not months.", { font: SANS, size: 14, lh: 22, color: C.body }),
      },
    ],
    { total: 552, gap: 24, pad: "0 24px 12px" },
  ),
  row(
    box(
      image({ src: "img/morrow-pourover.jpg", alt: "Water poured from a copper kettle into a pour-over dripper", width: 520, radius: 10 }) +
        heading("Your first brew guide", { level: 3, font: SERIF, size: 24, lh: 30, color: C.espresso, weight: 400, mt: 18, mb: 6 }) +
        text("A four-minute pour-over that works with any bag we send. No scales needed.", { font: SANS, size: 15, lh: 24, color: C.body, mb: 12 }) +
        text(link("Read the guide &rarr;", `${URL}/brew/pour-over`, { color: C.sage }), { font: SANS, size: 15, lh: 22 }),
      { bg: C.paper, pad: "16px 16px 24px", radius: 18 },
    ),
    { pad: "8px 24px 16px" },
  ),
  row(
    text(`Morrow Roast &middot; Roasted in small batches<br>${link("Manage subscription", `${URL}/account`, { color: C.body, underline: true, weight: 400 })} &nbsp;&middot;&nbsp; ${link("Unsubscribe", `${URL}/unsubscribe`, { color: C.body, underline: true, weight: 400 })}`, {
      font: SANS,
      size: 12,
      lh: 20,
      color: "#8B7869",
      align: "center",
    }),
    { pad: "20px 40px 8px", align: "center" },
  ),
].join("\n");

export const html = layout({
  title: meta.subject,
  preheader: meta.preheader,
  bg: C.cream,
  body,
  fonts: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=DM+Serif+Display&display=swap",
});
