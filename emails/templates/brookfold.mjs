// Sample: e-commerce promotional email for a fictional homeware shop.
import { layout, row, spacer, text, heading, link, image, button, columns, box } from "../lib.mjs";

const SERIF = "'Fraunces',Georgia,'Times New Roman',serif";
const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const C = { cream: "#F6F1EA", paper: "#FFFDF9", clay: "#B4532A", ink: "#2A2421", body: "#5C524C", sage: "#8A9A7B", line: "#E6DDD2" };
const URL = "https://brookfold.example";

export const meta = {
  slug: "brookfold-winter-edit",
  from: "Brookfold",
  subject: "The winter edit: 25% off throws, lamps and stoneware",
  preheader: "Until Sunday night. Free delivery over $80.",
};

const product = (img, alt, name, was, now) =>
  image({ src: img, alt, width: 264, radius: 4, bg: "#EDE6DC" }) +
  text(name, { font: SANS, size: 15, lh: 22, color: C.ink, weight: 600, mt: 14, mb: 2 }) +
  text(`<span style="text-decoration:line-through;color:#9A8F87;">${was}</span>&nbsp;&nbsp;<span style="color:${C.clay};font-weight:700;">${now}</span>`, { font: SANS, size: 14, lh: 20, color: C.body, mb: 4 }) +
  text(link("Shop now &rarr;", `${URL}/shop`, { color: C.ink }), { font: SANS, size: 13, lh: 20 });

const navLink = (label, href) =>
  `<a href="${href}" style="font-family:${SANS};font-size:13px;line-height:18px;color:${C.ink};text-decoration:none;padding:0 10px;">${label}</a>`;

const body = [
  row(text("Free delivery on orders over $80 &nbsp;&middot;&nbsp; Ends Sunday", { font: SANS, size: 12, lh: 16, color: C.cream, align: "center", ls: "0.04em" }), {
    bg: C.ink,
    pad: "10px 24px",
    align: "center",
  }),
  row(
    heading("Brookfold", { font: SERIF, size: 30, lh: 36, color: C.ink, weight: 600, align: "center", ls: "-0.01em", mb: 14 }) +
      `<p style="margin:0;text-align:center;">${navLink("Bedding", `${URL}/bedding`)}${navLink("Lighting", `${URL}/lighting`)}${navLink("Kitchen", `${URL}/kitchen`)}${navLink("Sale", `${URL}/sale`)}</p>`,
    { bg: C.paper, pad: "28px 24px 24px", align: "center" },
  ),
  row(image({ src: "img/brookfold-hero.jpg", alt: "A stack of folded wool throws in grey, lime and cream", width: 600 }), { bg: C.paper, pad: "0", cls: "" }),
  row(
    text("Winter sale", { font: SANS, size: 13, lh: 18, color: C.clay, weight: 700, align: "center", ls: "0.08em", mb: 10 }) +
      heading("The winter edit", { font: SERIF, size: 48, lh: 52, color: C.ink, weight: 500, align: "center", ls: "-0.02em", cls: "h1", mb: 14 }) +
      text("25% off throws, lamps and stoneware for the colder months. Until Sunday at midnight.", { font: SANS, size: 17, lh: 27, color: C.body, align: "center", mb: 28 }) +
      button({ label: "Shop the edit", href: `${URL}/winter`, bg: C.clay, color: "#FFFFFF", radius: 999, width: 200, font: SANS, align: "center" }),
    { bg: C.paper, pad: "40px 48px 48px", align: "center" },
  ),
  row(heading("Picked for the season", { level: 2, font: SERIF, size: 26, lh: 32, color: C.ink, weight: 500, align: "center", cls: "h2" }), { bg: C.paper, pad: "8px 24px 24px", align: "center" }),
  columns(
    [
      { html: product("img/brookfold-lamp.jpg", "Cream ceramic table lamp", "Ceramic table lamp", "$128", "$96") },
      { html: product("img/brookfold-mugs.jpg", "Enamel mugs and a teapot on a wooden table", "Enamel breakfast set", "$84", "$63") },
    ],
    { total: 552, gap: 24, pad: "0 24px 8px", bg: C.paper },
  ),
  columns(
    [
      { html: product("img/brookfold-bowl.jpg", "A white stoneware bowl held in one hand", "Stoneware serving bowl", "$46", "$34") },
      { html: product("img/brookfold-honey.jpg", "A white ceramic bowl of honey with a wooden dipper", "Small dipping bowls, set of 4", "$38", "$28") },
    ],
    { total: 552, gap: 24, pad: "0 24px 24px", bg: C.paper },
  ),
  row(
    box(
      text("Use this code at checkout", { font: SANS, size: 13, lh: 18, color: C.body, align: "center", mb: 6 }) +
        text("WINTER25", { font: SERIF, size: 30, lh: 36, color: C.ink, weight: 600, align: "center", ls: "0.12em" }),
      { bg: C.cream, pad: "22px", radius: 6, border: `1.5px dashed ${C.clay}` },
    ),
    { bg: C.paper, pad: "8px 48px 48px", align: "center" },
  ),
  row(
    text(`${link("Instagram", `${URL}/instagram`, { color: C.ink })} &nbsp;&middot;&nbsp; ${link("Pinterest", `${URL}/pinterest`, { color: C.ink })} &nbsp;&middot;&nbsp; ${link("Our shop", URL, { color: C.ink })}`, { font: SANS, size: 13, lh: 20, color: C.ink, align: "center", mb: 14 }) +
      text(`You signed up for Brookfold news. ${link("Unsubscribe", `${URL}/unsubscribe`, { color: C.body, underline: true, weight: 400 })} or ${link("change how often we write", `${URL}/preferences`, { color: C.body, underline: true, weight: 400 })}.`, {
        font: SANS,
        size: 12,
        lh: 19,
        color: "#8A7F77",
        align: "center",
      }),
    { pad: "28px 40px 8px", align: "center" },
  ),
].join("\n");

export const html = layout({
  title: meta.subject,
  preheader: meta.preheader,
  bg: C.cream,
  body,
  fonts: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap",
});
