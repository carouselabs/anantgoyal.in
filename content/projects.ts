// ─────────────────────────────────────────────────────────────────────────
// Selected work.
//
// These six projects are sample designs made for this site, for fictional
// brands. Replace them with your own work:
//   1. Put your email's HTML at  public/emails/<slug>.html
//      (and a plain "before" version at public/emails/<slug>-plain.html, optional)
//   2. Put screenshots at        public/previews/<slug>-desktop.webp  (680px wide email)
//                                public/previews/<slug>-mobile.webp   (375px wide email)
//                                public/previews/<slug>-plain.webp    (optional)
//      `npm run emails:previews` makes all three from the HTML files listed in
//      public/emails/manifest.json.
//   3. Edit the entry below.
// ─────────────────────────────────────────────────────────────────────────

export type Project = {
  /** File name used for the HTML and preview images. */
  slug: string;
  /** Project title on the site. */
  name: string;
  /** Who the email is from, as it shows in an inbox. */
  from: string;
  category: string;
  description: string;
  subject: string;
  preheader: string;
  /** What the design contains, shown in the project viewer. */
  modules: string[];
  /** Colours for the project's card stage and inbox avatar. */
  tint: { a: string; b: string; ink: string };
  /** Time label in the studio inbox. */
  time: string;
  /** Whether a plain "before" version exists. */
  hasPlain: boolean;
};

export const projects: Project[] = [
  {
    slug: "graphwell-newsletter",
    name: "Graphwell monthly update",
    from: "Graphwell",
    category: "SaaS newsletter",
    description: "A product newsletter for an analytics app. One lead story, three short features and a dashboard screenshot that stays readable on a phone.",
    subject: "What shipped in November: dashboards that explain themselves",
    preheader: "Written summaries on every chart, scheduled reports and Slack alerts.",
    modules: ["Dark hero with product screenshot", "Numbered feature list", "Two cards that stack on phones", "Outlook-safe button"],
    tint: { a: "#dfe6ff", b: "#b9c8ff", ink: "#0b1b3f" },
    time: "9:41",
    hasPlain: true,
  },
  {
    slug: "brookfold-winter-edit",
    name: "Brookfold winter edit",
    from: "Brookfold",
    category: "E-commerce campaign",
    description: "A seasonal sale for a homeware shop: warm photography, a serif headline, a four-product grid and a discount code nobody can miss.",
    subject: "The winter edit: 25% off throws, lamps and stoneware",
    preheader: "Until Sunday night. Free delivery over $80.",
    modules: ["Announcement bar", "Full-width photo hero", "Product grid with sale prices", "Dashed discount code box"],
    tint: { a: "#f6ede2", b: "#e7cfb5", ink: "#2a2421" },
    time: "8:15",
    hasPlain: true,
  },
  {
    slug: "pocketlane-launch",
    name: "Pocketlane 3.0 launch",
    from: "Pocketlane",
    category: "Product announcement",
    description: "A dark launch email for a budgeting app, built around two phone screens and a single action: update the app.",
    subject: "Pocketlane 3.0: budgets you can share",
    preheader: "Shared budgets, bill splitting and a monthly recap. Update the app to try them.",
    modules: ["Dark theme with lime accents", "Phone-screen hero", "Three feature cards", "Split image and text panel"],
    tint: { a: "#1c1f33", b: "#2e2a5a", ink: "#f2f3fa" },
    time: "Yesterday",
    hasPlain: true,
  },
  {
    slug: "farewind-fare-sale",
    name: "Farewind spring fare sale",
    from: "Farewind",
    category: "Promotional email",
    description: "A 48-hour sale for a travel booking brand: a deadline bar up top, one bold offer, destination cards with prices and a second reason to click.",
    subject: "48 hours only: up to 30% off spring trips",
    preheader: "Lisbon, Bergen, Madeira and more. Sale ends Sunday at midnight.",
    modules: ["Deadline bar", "Photo hero with offer panel", "Destination cards with prices", "Alert sign-up strip"],
    tint: { a: "#dff3ef", b: "#ffd8c9", ink: "#13201f" },
    time: "Thu",
    hasPlain: true,
  },
  {
    slug: "morrow-welcome",
    name: "Morrow Roast welcome",
    from: "Morrow Roast",
    category: "Welcome email",
    description: "The first email after sign-up for a coffee subscription: three steps to set up, then what arrives at the door.",
    subject: "Welcome to the club, Sam",
    preheader: "Your first bag ships on Monday. Here's how the club works.",
    modules: ["Personal greeting", "Three-step setup", "Two-photo feature row", "Brew guide card"],
    tint: { a: "#f8efe2", b: "#e2c7a3", ink: "#3b2618" },
    time: "Mon",
    hasPlain: true,
  },
  {
    slug: "sunday-margin-issue-48",
    name: "The Sunday Margin, issue 48",
    from: "The Sunday Margin",
    category: "Editorial newsletter",
    description: "A reading letter set like a printed page: masthead, a lead essay, a short list of reads and a note from the editor.",
    subject: "Issue 48: The case for reading one book slowly",
    preheader: "Plus three short reads and what we're reading this week.",
    modules: ["Serif masthead with double rule", "Lead story with photo", "Thumbnail reading list", "Editor's note"],
    tint: { a: "#f7f3ea", b: "#e3dccb", ink: "#1b1a17" },
    time: "Sun",
    hasPlain: true,
  },
  {
    slug: "tandemly-early-access",
    name: "Tandemly early access",
    from: "Tandemly",
    category: "Startup marketing",
    description: "A waitlist email for a scheduling startup: a calendar hero, three reasons to switch and an offer with a clear end date.",
    subject: "Early access is open: team schedules that plan themselves",
    preheader: "Join before 30 November and your first three months are free.",
    modules: ["Gradient calendar hero", "Benefit list with icons", "Three-step setup row", "Gradient offer panel"],
    tint: { a: "#ffe3da", b: "#d9d0ff", ink: "#16133a" },
    time: "Fri",
    hasPlain: true,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const emailSrc = (slug: string, plain = false) => `/emails/${slug}${plain ? "-plain" : ""}.html`;
/** The same email with its sample links switched off, for in-page previews (made by `npm run emails:build`). */
export const previewEmailSrc = (slug: string, plain = false) => `/emails/preview/${slug}${plain ? "-plain" : ""}.html`;
export const previewSrc = (slug: string, kind: "desktop" | "mobile" | "plain") => `/previews/${slug}-${kind}.webp`;
/** srcset with the small copy (520px desktop and plain / 300px mobile) and the full one. */
export const previewSrcSet = (slug: string, kind: "desktop" | "mobile" | "plain") =>
  kind === "mobile" ? `/previews/${slug}-mobile-sm.webp 300w, /previews/${slug}-mobile.webp 750w` : `/previews/${slug}-${kind}-sm.webp 520w, /previews/${slug}-${kind}.webp 1020w`;
