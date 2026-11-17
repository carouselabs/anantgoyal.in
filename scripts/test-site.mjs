// Smoke-tests the built site (npm run build first) in Chromium.
//
//   npm run test:site
//   SITE_URL=https://anantgoyal.in npm run test:site   (the live site)
import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".json": "application/json", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml", ".ico": "image/x-icon" };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(root, p);
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
  } catch {
    file = path.join(root, "404.html");
    res.statusCode = 404;
  }
  try {
    res.setHeader("content-type", TYPES[path.extname(file)] || "application/octet-stream");
    res.end(await readFile(file));
  } catch {
    res.statusCode = 404;
    res.end("not found");
  }
}).listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
// SITE_URL=https://anantgoyal.in npm run test:site runs the same checks on the live site.
const base = (process.env.SITE_URL || `http://127.0.0.1:${server.address().port}`).replace(/\/$/, "");

let failures = 0;
// Smooth scrolling is on (html scroll-behavior): wait until the page stops moving.
async function settle(page) {
  let last = -1;
  for (let i = 0; i < 40; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (y === last) return;
    last = y;
    await page.waitForTimeout(150);
  }
}

const check = (ok, msg) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${msg}`);
  if (!ok) failures++;
};

const browser = await chromium.launch();
// Over the internet pages take longer to go quiet than from disk: give them time.
if (process.env.SITE_URL) {
  const newContext = browser.newContext.bind(browser);
  browser.newContext = async (options) => {
    const ctx = await newContext(options);
    ctx.setDefaultTimeout(90_000);
    ctx.setDefaultNavigationTimeout(90_000);
    return ctx;
  };
}

// 1. Desktop: no console errors, viewer, studio, slider, motion switch.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  check(errors.length === 0, `no console errors on load${errors.length ? ": " + errors.join(" | ") : ""}`);
  check((await page.locator("h1").innerText()).replace(/\s+/g, " ").includes("Your brand is beautiful. Why aren’t your emails?"), "hero headline reads in full, with spaces");

  // Project viewer
  const firstCard = page.locator("#work li button").first();
  await firstCard.scrollIntoViewIfNeeded();
  await firstCard.click();
  const dialog = page.locator("dialog.viewer");
  await dialog.waitFor({ state: "visible" });
  check(await dialog.evaluate((d) => d.open), "View design opens the project viewer");
  check((await page.locator("#viewer-title").innerText()) === "Graphwell monthly update", "viewer shows the first project");
  const frames = dialog.locator("iframe");
  check((await frames.count()) === 2, "viewer loads the desktop and the mobile email");
  const deskSrc = await frames.first().getAttribute("src");
  check(deskSrc === "/emails/preview/graphwell-newsletter.html", "desktop frame loads the real HTML email (preview copy)");
  check((await dialog.getByRole("link", { name: /Open the email in a new tab/ }).getAttribute("href")) === "/emails/graphwell-newsletter.html", "Open in a new tab points at the untouched email");
  await page.waitForFunction(() => {
    const f = document.querySelectorAll("dialog.viewer iframe");
    return f.length === 2 && [...f].every((x) => x.contentDocument && x.contentDocument.readyState === "complete" && x.contentDocument.body && x.contentDocument.body.scrollHeight > 1000);
  });
  await page.waitForFunction(() => [...document.querySelectorAll("dialog.viewer iframe")].every((f) => f.contentDocument.readyState === "complete"));
  const broken = await frames.evaluateAll((fs) => fs.flatMap((f) => [...f.contentDocument.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src"))));
  check(broken.length === 0, `every image inside the previewed email loads${broken.length ? ": " + broken.join(", ") : ""}`);
  const widths = await frames.evaluateAll((fs) => fs.map((f) => f.contentWindow.innerWidth));
  check(widths[0] === 680 && widths[1] === 375, `emails render at their true widths (${widths.join(" / ")}px)`);
  const stacked = await frames.nth(1).evaluate((f) => getComputedStyle(f.contentDocument.querySelector("div.stack")).display);
  check(stacked === "block", "the phone frame triggers the email's own mobile layout (columns stack)");
  await page.keyboard.press("ArrowRight");
  check((await page.locator("#viewer-title").innerText()) === "Brookfold winter edit", "Arrow Right goes to the next project");
  await page.getByRole("button", { name: /Previous project/ }).click();
  check((await page.locator("#viewer-title").innerText()) === "Graphwell monthly update", "Previous button goes back");
  await page.keyboard.press("Escape");
  check(!(await dialog.evaluate((d) => d.open)), "Escape closes the viewer");
  check(await firstCard.evaluate((el) => el === document.activeElement), "focus returns to the card that opened it");

  // Studio
  const studio = page.locator("#studio");
  await studio.scrollIntoViewIfNeeded();
  const studioFrame = studio.locator("iframe");
  await studio.getByRole("button", { name: "Mobile", exact: true }).click();
  check((await studioFrame.evaluate((f) => f.style.width)) === "375px", "Mobile switches the studio to a 375px email");
  await studio.getByRole("button", { name: "Before", exact: true }).click();
  check((await studioFrame.getAttribute("src")).endsWith("-plain.html"), "Before shows the plain version");
  await studio.getByRole("button", { name: /Morrow Roast/ }).click();
  check((await studioFrame.getAttribute("src")) === "/emails/preview/morrow-welcome-plain.html", "choosing a campaign loads that email");
  await studio.getByRole("button", { name: "Designed", exact: true }).click();
  await studio.getByRole("button", { name: "Desktop", exact: true }).click();
  check((await studioFrame.getAttribute("src")) === "/emails/preview/morrow-welcome.html" && (await studioFrame.evaluate((f) => f.style.width)) === "680px", "Designed + Desktop restores the full email");
  // A click on a link inside the email must not navigate the frame away.
  // A real mouse click on a link inside the email must not navigate the frame.
  const link = page.frameLocator("#studio iframe").locator("a").first();
  await link.waitFor({ state: "attached" });
  await link.click({ force: true });
  await page.waitForTimeout(400);
  const path = await studioFrame.evaluate((f) => {
    try {
      return f.contentWindow.location.pathname;
    } catch {
      return "navigated to another site";
    }
  });
  check(path === "/emails/preview/morrow-welcome.html", `clicking a link inside a preview does not navigate away (${path})`);

  // Before/after slider by keyboard
  const range = page.locator("#problem input[type=range]");
  await range.focus();
  await range.evaluate((el) => {
    el.value = "50";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowLeft");
  check((await range.inputValue()) === "40", "arrow keys move the before/after handle");

  // Motion switch persists
  await page.getByRole("button", { name: "Pause background animations" }).click();
  check((await page.evaluate(() => document.documentElement.dataset.motion)) === "paused", "pause button pauses the ambient motion");
  await page.reload({ waitUntil: "networkidle" });
  check((await page.evaluate(() => document.documentElement.dataset.motion)) === "paused", "the pause choice is remembered after reload");
  check(await page.getByRole("button", { name: "Play background animations" }).isVisible(), "the button then offers Play");
  await ctx.close();
}

// 1b. Contact form.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  check((await page.locator("header").getByRole("link", { name: "Start a project" }).getAttribute("href")) === "#contact", "nav Start a project leads to the contact form");
  check((await page.locator("#top").getByRole("link", { name: /work together/ }).getAttribute("href")) === "#contact", "hero Let's work together leads to the contact form");
  check((await page.locator("#contact a[href^='mailto:hello@anantgoyal.in']").count()) >= 1, "the contact section links to hello@anantgoyal.in");

  const form = page.locator("#contact form");
  await form.scrollIntoViewIfNeeded();
  const send = form.getByRole("button", { name: "Send project details" });

  // Empty: three errors, focus on the first field.
  await send.click();
  check((await form.locator("p[id$='-error']").count()) === 3, "an empty form shows an error under each required field");
  check(await page.evaluate(() => document.activeElement?.id === "contact-name"), "focus moves to the first field to fix");
  check((await form.locator("#contact-email").getAttribute("aria-invalid")) === "true" && (await form.locator("#contact-email").getAttribute("aria-describedby")) === "contact-email-error", "errors are tied to their fields for screen readers");

  // Bad email.
  await form.getByLabel("Your name").fill("Test Person");
  await form.getByLabel("Email", { exact: true }).fill("not-an-email");
  await form.getByLabel("About the email").fill("A monthly newsletter for our customers, about 600 people.");
  await send.click();
  check((await form.locator("#contact-email-error").innerText()).startsWith("Check the email address"), "a malformed address gets its own message");
  check((await form.locator("p[id$='-error']").count()) === 1, "fixed fields lose their errors");

  // No server set (endpoint empty): hands over to the visitor's email app with everything filled in.
  check((await form.getAttribute("data-endpoint")) === "/api/contact/", "the form sends to the site's own /api/contact");
  await form.evaluate((f) => (f.dataset.endpoint = ""));
  await form.getByLabel("Email", { exact: true }).fill("test@example.com");
  await form.getByText("Newsletter", { exact: true }).click();
  await send.click();
  const again = form.getByRole("link", { name: "Open it again" });
  await again.waitFor();
  const href = decodeURIComponent(await again.getAttribute("href"));
  check(href.startsWith("mailto:hello@anantgoyal.in?subject=New email project from Test Person"), "without a form key the email app opens, addressed to you");
  check(href.includes("Email: test@example.com") && href.includes("Kind of email: Newsletter") && href.includes("A monthly newsletter for our customers"), "the drafted email carries every answer");
  check((await page.getByText("Message sent successfully").count()) === 0, "no 'sent' message or banner before anything was really sent");

  // Through /api/contact (mocked here: tests never send real email): confirms only on success.
  await form.evaluate((f) => (f.dataset.endpoint = "/api/contact/"));
  let posted = null;
  await page.route("**/api/contact/", async (route) => {
    posted = JSON.parse(route.request().postData());
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
  });
  await send.click();
  await page.getByRole("heading", { name: "Message sent successfully." }).waitFor();
  check(!("access_key" in (posted ?? {})) && posted?.email === "test@example.com" && posted?.name === "Test Person" && posted?.kind_of_email === "Newsletter" && posted?.message.startsWith("A monthly newsletter"), "the server receives the reply-to address and every answer, and no key");
  check((await page.locator("#contact").innerText()).includes("Your message has reached hello@anantgoyal.in. I’ll reply to test@example.com as soon as possible."), "the confirmation says it arrived and names the address you will reply to");
  check(await page.evaluate(() => document.activeElement?.textContent === "Message sent successfully."), "focus moves to the confirmation");
  // The banner: on screen, under the nav, above everything, and dismissable.
  const sentBanner = page.getByRole("status").filter({ hasText: "Message sent successfully" });
  const bb = await sentBanner.boundingBox();
  const navBottom = await page.locator("header").evaluate((h) => h.firstElementChild.getBoundingClientRect().bottom);
  check(bb && bb.y >= navBottom && bb.y + bb.height < 900 && (await sentBanner.innerText()).includes("Thanks, Test Person. I’ll reply as soon as possible."), `a banner confirms it at the top of the screen (top ${bb ? Math.round(bb.y) : "?"}px, nav ends ${Math.round(navBottom)}px)`);
  const onTop = await sentBanner.evaluate((el) => { const r = el.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return el.contains(hit); });
  check(onTop, "nothing covers the banner");
  await sentBanner.getByRole("button", { name: "Dismiss" }).click();
  check((await sentBanner.count()) === 0 && (await page.getByRole("heading", { name: "Message sent successfully." }).count()) === 1, "Dismiss hides the banner; the confirmation stays");

  // Service down: says so and offers the email route.
  await page.getByRole("button", { name: "Send another message" }).click();
  const form2 = page.locator("#contact form");
  await page.unroute("**/api/contact/");
  await page.route("**/api/contact/", (route) => route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ success: false, error: "could not send" }) }));
  await form2.getByLabel("Your name").fill("Test Person");
  await form2.getByLabel("Email", { exact: true }).fill("test@example.com");
  await form2.getByLabel("About the email").fill("A launch email for our new app version.");
  await form2.getByRole("button", { name: "Send project details" }).click();
  const alert = form2.getByRole("alert");
  await alert.waitFor();
  check((await alert.innerText()).startsWith("The message did not send"), "a failed send says so");
  check((await alert.getByRole("link").getAttribute("href")).startsWith("mailto:hello@anantgoyal.in"), "and offers to email it instead");
  check((await page.getByText("Message sent successfully").count()) === 0, "a failed send shows no success banner");

  // Bot trap: a filled hidden field sends nothing.
  let botPosts = 0;
  await page.unroute("**/api/contact/");
  await page.route("**/api/contact/", (route) => {
    botPosts++;
    return route.fulfill({ status: 200, body: "{}" });
  });
  await form2.locator("#contact-website").evaluate((el) => (el.value = "spam.example"));
  await form2.getByRole("button", { name: "Send project details" }).click();
  await page.waitForTimeout(300);
  check(botPosts === 0, "a bot that fills the hidden field sends nothing");
  check(errors.length === 0, `no script errors while using the form${errors.length ? ": " + errors.join(" | ") : ""}`);
  await ctx.close();
}

// 1b-phone. After sending on a phone, the confirmation is not hidden behind the nav or banner.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.route("**/api/contact/", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) }));
  const form = page.locator("#contact form");
  await form.scrollIntoViewIfNeeded();
  await form.getByLabel("Your name").fill("Test Person");
  await form.getByLabel("Email", { exact: true }).fill("test@example.com");
  await form.getByLabel("About the email").fill("A welcome email for new customers.");
  await form.getByRole("button", { name: "Send project details" }).scrollIntoViewIfNeeded();
  await form.getByRole("button", { name: "Send project details" }).click();
  await page.getByRole("heading", { name: "Message sent successfully." }).waitFor();
  await page.waitForTimeout(500);
  await settle(page);
  const pos = await page.evaluate(() => {
    const h = [...document.querySelectorAll("h3")].find((x) => x.textContent === "Message sent successfully.").getBoundingClientRect();
    const b = [...document.querySelectorAll("[role=status]")].find((x) => x.textContent.includes("Message sent successfully")).getBoundingClientRect();
    return { heading: Math.round(h.top), bottom: Math.round(h.bottom), bannerBottom: Math.round(b.bottom), vh: window.innerHeight };
  });
  check(pos.heading > pos.bannerBottom && pos.bottom < pos.vh, `on a phone the confirmation sits below the banner, on screen (heading ${pos.heading}px, banner ends ${pos.bannerBottom}px)`);
  await ctx.close();
}

// 1c. The design + outreach expansion: original hero and CTAs kept, new sections work.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/", { waitUntil: "networkidle" });

  // Original hero copy and buttons, unchanged.
  const hero = page.locator("#top");
  check((await hero.locator("h1").innerText()).replace(/\s+/g, " ") === "Your brand is beautiful. Why aren’t your emails?", "hero headline unchanged");
  check((await hero.getByRole("link", { name: "Let’s work together" }).count()) === 1 && (await hero.getByRole("link", { name: "Explore my work" }).getAttribute("href")) === "#work", "hero buttons unchanged");
  check((await hero.innerText()).includes("From beautifully crafted HTML emails to custom email software and scalable outreach infrastructure, I help businesses design, send and manage better email experiences."), "hero carries the new supporting line");
  check((await page.locator("header").getByRole("link", { name: "Start a project" }).count()) === 1 && (await page.locator("#contact").getByRole("button", { name: "Send project details" }).count()) === 1, "Start a project and the contact form are still there");

  // Name and photo.
  check((await page.locator("header").innerText()).includes("Anant Goyal"), "nav shows Anant Goyal");
  const photos = await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img[src*="anant-goyal"]')];
    for (const i of imgs) {
      i.loading = "eager";
      if (!i.complete) await new Promise((r) => i.addEventListener("load", r, { once: true }));
    }
    return imgs.map((i) => ({ ok: i.naturalWidth > 0, alt: i.alt }));
  });
  check(photos.length >= 4 && photos.every((p) => p.ok), `every photo of you loads (${photos.length})`);
  check(photos.some((p) => p.alt === "Anant Goyal"), "the portrait is named for screen readers");

  // Nav reaches the new outreach section.
  check((await page.locator("header").getByRole("link", { name: "Outreach" }).getAttribute("href")) === "#outreach" && (await page.locator("#outreach h2").count()) === 1, "nav Outreach link has its section");
  check((await page.locator("#capabilities h3").allInnerTexts()).join("|") === "Beautiful HTML email experiences|Custom email software and dashboards|Build your email infrastructure before you scale|Scalable outreach and campaign management", "the four capability areas are shown");
  for (const id of ["software", "infrastructure", "outreach", "about"]) check((await page.locator(`#${id} h2`).count()) === 1, `section #${id} is on the page`);
  check((await page.locator("#about h2").innerText()).replace(/\s+/g, " ") === "Designer by thinking. Builder by execution.", "About has the new headline");
  check((await page.locator("#software").getByText("Illustrative data").count()) === 1 && (await page.locator("#infrastructure").innerText()).includes("It does not guarantee the inbox."), "software data is labelled illustrative; warm-up promises nothing");

  // Outreach: honest by construction.
  const outreach = page.locator("#outreach");
  check((await outreach.getByText("Example data").count()) === 1, "the dashboard is labelled as example data");
  check((await outreach.innerText()).includes("no setup can guarantee the inbox"), "the section says plainly that nothing guarantees the inbox");
  const body = (await page.locator("body").innerText()).toLowerCase();
  check(!/guaranteed (inbox|delivery|placement)|never (land|go) in spam|100% (inbox|delivery)/.test(body), "no guaranteed-delivery promise anywhere on the page");

  // Process: switch tracks by click and by arrow key.
  const proc = page.locator("#process");
  await proc.scrollIntoViewIfNeeded();
  const outreachTab = proc.getByRole("tab", { name: "Email outreach" });
  await outreachTab.click();
  check((await outreachTab.getAttribute("aria-selected")) === "true" && (await proc.locator("ol h3").first().innerText()) === "Understand the campaign goals", "Email outreach tab shows the outreach steps");
  await page.keyboard.press("ArrowLeft");
  const designTab = proc.getByRole("tab", { name: "Email design" });
  check((await designTab.getAttribute("aria-selected")) === "true" && (await designTab.evaluate((el) => el === document.activeElement)) && (await proc.locator("ol h3").first().innerText()) === "Understand the brief", "arrow keys switch back to the design steps");

  // Gallery: seven projects, viewer wraps from first to last.
  check((await page.locator("#work li button").count()) === 7, "gallery shows seven projects");
  await page.locator("#work li button").first().click();
  await page.locator("dialog.viewer").waitFor({ state: "visible" });
  await page.keyboard.press("ArrowLeft");
  check((await page.locator("#viewer-title").innerText()) === "Tandemly early access", "viewer wraps from the first project to the last");
  await page.keyboard.press("Escape");
  check((await page.locator("#studio [aria-label='Campaigns'] li").count()) === 7, "the studio inbox lists all seven campaigns");
  check(errors.length === 0, `no script errors${errors.length ? ": " + errors.join(" | ") : ""}`);
  await ctx.close();
}

// 1d. Email design: the services groups, the homepage gallery, /email-design and every design page.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + "/", { waitUntil: "networkidle" });

  // Services: every kind of email, no number in the heading.
  const sh = (await page.locator("#services h2").innerText()).replace(/\s+/g, " ");
  check(sh === "Every kind of email, designed and coded." && !/\d|seven/i.test(sh), "services heading has no number");
  const types = await page.locator("#services ul button").allInnerTexts();
  const need = ["Welcome and onboarding", "Newsletters and editorial", "Promotional and marketing campaigns", "Product launches and announcements", "Transactional emails", "Abandoned cart", "Retention and re-engagement", "Lead nurturing and drip campaigns", "SaaS product updates and notifications", "Event invitations and follow-ups", "Personalised and automated sequences", "Customer support and service", "Internal and business communication", "E-commerce campaigns"];
  const missing = need.filter((t) => !types.some((x) => x.startsWith(t)));
  check(missing.length === 0, `services cover all 14 kinds of email${missing.length ? ` (missing: ${missing.join(", ")})` : ""}`);
  check((await page.locator("#services h3").count()) === 4, "the kinds are grouped into four panels");
  const cart = page.locator("#services ul button", { hasText: "Abandoned cart" });
  await cart.scrollIntoViewIfNeeded();
  await cart.hover();
  check((await cart.getAttribute("aria-pressed")) === "true" && (await cart.innerText()).includes("left behind"), "pointing at a type opens it");
  await page.locator("#services ul button", { hasText: "Customer support and service" }).focus();
  check((await page.locator("#services ul button", { hasText: "Customer support and service" }).getAttribute("aria-pressed")) === "true", "keyboard focus opens a type too");

  // Nav and the homepage gallery.
  check((await page.locator("header").getByRole("link", { name: "Design", exact: true }).getAttribute("href")) === "/email-design/", "nav Design goes to /email-design");
  check((await page.locator("#portfolio").count()) === 0, "no personal-projects section on the homepage");
  const lib = page.locator("#work").getByRole("link", { name: "Explore more email design" });
  check((await lib.count()) === 1 && (await lib.getAttribute("href")) === "/email-design/", "the gallery leads on to Email Design");
  const promo = /personalised design|build your own|email design library/i;
  check(!promo.test(await page.locator("#work").innerText()), "no personalised-design or library wording in the gallery");
  await lib.click();
  await page.waitForURL("**/email-design/");
  await settle(page);

  // Email Design: a showcase, not a finite catalogue.
  const cards = page.locator("main ul li a[href^='/email-design/']");
  check((await page.locator("h1").innerText()).replace(/\s+/g, " ") === "Email Design", "the page is titled Email Design");
  const mainText = await page.locator("main").innerText();
  check(mainText.includes("Exploring what\u2019s possible when email meets creativity."), "one short supporting line");
  check((await page.locator("main input").count()) === 0 && (await page.locator("main select").count()) === 0, "no search box or form fields");
  check(!/\d+\s*(designs?|collections?|directions?|styles?)\b|\d+\s+of\s+\d+|showing\s+\d|\(\d+\)|designs across/i.test(mainText), "no design or collection counts anywhere on the page");
  check(!/library|fictional|concept|build your own|email-safe html/i.test(mainText), "none of the removed wording comes back");
  // One personalised-design banner, seen before any scrolling.
  const banner = page.locator("main aside").filter({ hasText: "Make your own personalised design." });
  const personal = page.locator("main").getByRole("link", { name: "Get your personalised design" });
  const pb = await personal.boundingBox();
  check((await banner.count()) === 1 && (await personal.count()) === 1 && (await personal.getAttribute("href")) === "/?design=personalised#contact", "one banner: Make your own personalised design, linking to the contact form");
  check(pb && pb.y >= 0 && pb.y + pb.height <= 900, `the banner's button is visible without scrolling (bottom at ${pb ? Math.round(pb.y + pb.height) : "?"}px of 900)`);
  const bannerFirst = await page.evaluate(() => {
    const a = document.querySelector("main aside");
    const firstCard = document.querySelector("main ul li a[href^='/email-design/']");
    return !!a && !!firstCard && a.getBoundingClientRect().top < firstCard.getBoundingClientRect().top;
  });
  check(bannerFirst, "the banner sits above the designs");
  check((await page.locator('main [aria-label="Collections"]').count()) === 0 && (await page.locator("main button").count()) === 1, "no filter bar; the only control is Keep exploring");
  const sizes = await cards.evaluateAll((as) => as.map((a) => { const r = a.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }));
  check(new Set(sizes).size >= 3, `compositions come in different sizes (${[...new Set(sizes)].join(", ")})`);
  check((await cards.count()) === 14, `the first stretch shows 14 designs (${await cards.count()})`);
  await page.getByRole("button", { name: "Keep exploring" }).click();
  check((await cards.count()) === 24 && (await page.getByRole("button", { name: "Keep exploring" }).count()) === 0, "Keep exploring brings in the rest");
  await page.goto(base + "/email-design/?collection=social", { waitUntil: "networkidle" });
  const social = await cards.evaluateAll((as) => as.map((a) => a.getAttribute("href")).sort());
  check(social.join(",") === "/email-design/bloom-video/,/email-design/ember-social-post/,/email-design/ferncastle-thread/", `a collection link from a design page opens filtered (${social.join(", ")})`);
  await page.getByRole("button", { name: "Remove filter: Social-inspired" }).click();
  check((await cards.count()) === 14 && !page.url().includes("collection="), "clearing it shows everything again");
  await page.locator("main").getByRole("link", { name: "Get your personalised design" }).click();
  await page.waitForURL("**/?design=personalised#contact");
  // Over a real network the page arrives first and scrolls to #contact after.
  await page.waitForFunction(() => { const r = document.querySelector("#contact-message")?.getBoundingClientRect(); return r && r.top > 0 && r.top < window.innerHeight; }, null, { timeout: 15_000 }).catch(() => {});
  await settle(page);
  check((await page.locator("#contact-message").inputValue()).startsWith("I'd like a personalised email design, made for my brand."), "the banner opens the contact form with the request noted");
  const formTop = await page.locator("#contact-message").evaluate((el) => el.getBoundingClientRect().top);
  check(formTop > 0 && formTop < 900, `the page lands on the contact form (message box at ${Math.round(formTop)}px)`);

  // Tags picked on a design page arrive as removable chips.
  await page.goto(base + "/email-design/?collection=social&style=photographic", { waitUntil: "networkidle" });
  const socialPhoto = await cards.evaluateAll((as) => as.map((a) => a.getAttribute("href")).sort());
  check(socialPhoto.join(",") === "/email-design/bloom-video/,/email-design/ember-social-post/", `a style tag narrows a collection (${socialPhoto.join(", ")})`);
  await page.getByRole("button", { name: "Remove filter: Photographic" }).click();
  check((await cards.count()) === 3 && !page.url().includes("style="), "removing the tag chip widens it again");
  await page.goto(base + "/email-design/?collection=messaging", { waitUntil: "networkidle" });
  check((await cards.count()) === 1 && (await cards.first().getAttribute("href")) === "/email-design/pantry-chat/", "a link to ?collection=messaging opens filtered");
  await page.goto(base + "/email-design/?collection=messaging&style=brutalist", { waitUntil: "networkidle" });
  check((await page.getByText("Nothing here yet.").count()) === 1, "an empty combination says so");

  // A design page: controls, tags, the start-from action.
  await page.goto(base + "/email-design/nightreel-streaming/", { waitUntil: "networkidle" });
  check((await page.locator("h1").innerText()) === "Nightreel new series", "a design page opens");
  await page.waitForFunction(() => [...document.querySelectorAll("main iframe")].every((f) => f.contentDocument?.readyState === "complete"));
  const vis = async () => page.locator("main iframe").evaluateAll((fs) => fs.map((f) => (f.getBoundingClientRect().width > 0 ? f.contentWindow.innerWidth : 0)));
  check((await vis()).join(",") === "680,375", "Both shows the desktop and phone versions");
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  check((await vis()).join(",") === "0,375", "Mobile shows only the phone version");
  await page.getByRole("button", { name: "Desktop", exact: true }).click();
  check((await vis()).join(",") === "680,0", "Desktop shows only the desktop version");
  check((await page.getByRole("link", { name: "Cinematic" }).getAttribute("href")) === "/email-design/?style=cinematic", "style tags link to the filtered view");
  const start = page.getByRole("link", { name: /Start from this design/ });
  check((await start.getAttribute("href")) === "/?design=nightreel-streaming#contact", "Start from this design points at the form");
  await start.click();
  await page.waitForURL("**/?design=nightreel-streaming#contact");
  await page.waitForTimeout(400);
  check((await page.locator("#contact-message").inputValue()).includes("Nightreel new series"), "the form arrives with the design noted");

  // Every design page.
  const slugs = ["graphwell-newsletter", "brookfold-winter-edit", "pocketlane-launch", "farewind-fare-sale", "morrow-welcome", "sunday-margin-issue-48", "tandemly-early-access", "ember-social-post", "ferncastle-thread", "bloom-video", "pantry-chat", "nightreel-streaming", "satellites-release", "brookfold-shipping", "nordlys-launch", "ledgerline-security", "taskfold-weekly", "stackbeam-changelog", "daily-fold-digest", "grid-goods-brutalist", "type-forum-swiss", "saffron-menu", "margin-year-recap", "pocketlane-survey"];
  let ok = 0;
  for (const slug of slugs) {
    const res = await page.goto(`${base}/email-design/${slug}/`, { waitUntil: "domcontentloaded" });
    if (res.status() === 200 && (await page.locator("h1").count()) === 1 && (await page.getByRole("link", { name: "Email Design", exact: true }).count()) === 1 && !/personalised design|build your own|library/i.test(await page.locator("main").innerText())) ok++;
  }
  check(ok === slugs.length, `all ${slugs.length} design pages load (${ok})`);

  // No personal projects and no client names anywhere.
  for (const url of ["/", "/email-design/", "/email-design/morrow-welcome/", "/credits/"]) {
    await page.goto(base + url, { waitUntil: "domcontentloaded" });
    const text = await page.locator("body").innerText();
    check(!/dharma/i.test(text), `no "Dharma" on ${url}`);
  }
  const gone = await page.goto(base + "/work/");
  check(gone.status() === 404, "the old /work page is gone");
  check(errors.filter((e) => !e.includes("404")).length === 0, `no script errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
  await ctx.close();
}

// 2. No sideways scroll at any width.
for (const url of ["/", "/email-design/", "/email-design/farewind-fare-sale/", "/email-design/nightreel-streaming/"]) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base + url, { waitUntil: "networkidle" });
    // The body clips sideways overflow, so look for any visible text or
    // control that runs past the screen edge (unless a container that fits
    // on screen clips it, like a truncated subject line).
    const off = await page.evaluate(() => {
      const W = window.innerWidth + 1;
      return [...document.querySelectorAll("main p, main h1, main h2, main h3, main h4, main a, main button, main li")]
        .filter((el) => {
          if (el.closest('[aria-hidden="true"]')) return false;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height || r.right <= W) return false;
          for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
            if (/(hidden|clip|auto|scroll)/.test(getComputedStyle(a).overflowX) && a.getBoundingClientRect().right <= W) return false;
          }
          return true;
        })
        .map((el) => (el.textContent || el.tagName).trim().slice(0, 40));
    });
    check(off.length === 0, `nothing runs off screen on ${url} at ${width}px${off.length ? `: ${off.slice(0, 3).join(" | ")}` : ""}`);
    await page.close();
  }
}

// 3. Phone menu.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const btn = page.getByRole("button", { name: "Open menu" });
  await btn.click();
  check((await page.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded")) === "true", "menu button reports its state");
  await page.locator("#mobile-menu a", { hasText: "Outreach" }).click();
  // Wait for the smooth scroll to settle.
  let last = -1;
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(150);
    const y = await page.evaluate(() => window.scrollY);
    if (y === last) break;
    last = y;
  }
  check((await page.locator("#mobile-menu").getAttribute("aria-hidden")) === "true", "choosing a link closes the menu");
  const top = await page.locator("#outreach").evaluate((el) => el.getBoundingClientRect().top);
  check(Math.abs(top - 96) < 60, `the link scrolls to its section (top at ${Math.round(top)}px)`);
  await page.close();
}

// 4. Without JavaScript everything is visible.
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "load" });
  const hidden = await page.evaluate(() => [...document.querySelectorAll("[data-reveal], .hero-word, [data-enter-fade]")].filter((el) => getComputedStyle(el).opacity !== "1").length);
  check(hidden === 0, "with JavaScript off nothing is left hidden");
  await ctx.close();
}

// 5. The credits page exists.
{
  const page = await browser.newPage();
  const res = await page.goto(base + "/credits/");
  check(res.status() === 200 && (await page.locator("h1").innerText()) === "Credits", "credits page loads");
  await page.close();
}

// 6. LinkedIn: in the footer (with its icon) and the contact section, opening in a new tab; in the search data.
{
  const LI = "https://www.linkedin.com/in/anantgoyal45/";
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  const footer = page.locator("footer").getByRole("link", { name: "LinkedIn" });
  // On the homepage the footer sits inside #contact: the contact-section link is the one outside the footer.
  const contact = page.locator("#contact").getByRole("link", { name: "LinkedIn" }).first();
  check((await footer.getAttribute("href")) === LI && (await footer.getAttribute("target")) === "_blank" && (await footer.locator("img[src='/icons/linkedin-icon.svg']").count()) === 1, "the footer links to your LinkedIn, with its icon, in a new tab");
  check((await contact.getAttribute("href")) === LI && (await contact.getAttribute("rel")).includes("noopener") && (await contact.evaluate((a) => !a.closest("footer"))), "the contact section links to your LinkedIn");
  // The long photo-credit sentence is gone; a short Credits link keeps the CC BY photo credits reachable.
  check((await page.getByText("Photographs in the sample emails").count()) === 0 && (await page.locator("footer").getByRole("link", { name: "Credits", exact: true }).getAttribute("href")) === "/credits/", "the footer has a short Credits link instead of the photo sentence");
  const ld = JSON.parse(await page.locator("script[type='application/ld+json']").first().textContent());
  check(Array.isArray(ld.sameAs) && ld.sameAs.includes(LI) && ld.founder.sameAs.includes(LI), "search engines are told the LinkedIn profile is yours");
  check((await page.locator("footer a").filter({ hasText: /Dribbble|Behance|Instagram|^X$/ }).count()) === 0, "profiles without a link stay hidden");
  await page.goto(base + "/email-design/", { waitUntil: "domcontentloaded" });
  check((await page.locator("footer").getByRole("link", { name: "LinkedIn" }).getAttribute("href")) === LI, "the LinkedIn link is in the footer on other pages too");
  await page.close();
}

await browser.close();
server.close();
console.log(failures ? `\n${failures} failure(s)` : "\nall site checks passed");
process.exit(failures ? 1 : 0);
