// ─────────────────────────────────────────────────────────────────────────
// The email design library: the shape of one design and its taxonomy.
//
// A design is two things:
//   1. its HTML, in emails/templates/*.mjs (built to public/emails/<slug>.html)
//   2. one entry in projects/email-design/*.ts describing it (this type)
// The library page, search, filters and the design's own page read the entry.
// New collections, purposes, styles or industries are one line each below.
// ─────────────────────────────────────────────────────────────────────────

export const COLLECTIONS = [
  { id: "social", label: "Social-inspired", blurb: "Posts, threads and video, shaped like the feeds people scroll." },
  { id: "messaging", label: "Messaging", blurb: "Bubbles, timestamps and conversations." },
  { id: "entertainment", label: "Video and entertainment", blurb: "Cinematic artwork, releases and premieres." },
  { id: "commerce", label: "E-commerce", blurb: "Products, sales, orders and deliveries." },
  { id: "saas", label: "SaaS and technology", blurb: "Updates, reports, alerts and changelogs." },
  { id: "editorial", label: "Editorial", blurb: "Newsletters and digests set like print." },
  { id: "experimental", label: "Experimental", blurb: "Brutalist, Swiss and other strong points of view." },
  { id: "lifestyle", label: "Lifestyle and industry", blurb: "Restaurants, travel, coffee and more." },
  { id: "special", label: "Special concepts", blurb: "Recaps, surveys and formats beyond the usual." },
] as const;

export const PURPOSES = [
  { id: "welcome", label: "Welcome" },
  { id: "newsletter", label: "Newsletter" },
  { id: "promotion", label: "Promotion and sale" },
  { id: "launch", label: "Launch and announcement" },
  { id: "transactional", label: "Transactional" },
  { id: "notification", label: "Notification" },
  { id: "event", label: "Event" },
  { id: "engagement", label: "Engagement" },
  { id: "survey", label: "Survey and feedback" },
] as const;

export const AESTHETICS = [
  { id: "minimal", label: "Minimal" },
  { id: "editorial", label: "Editorial" },
  { id: "photographic", label: "Photographic" },
  { id: "dark", label: "Dark mode" },
  { id: "bold", label: "Bold colour" },
  { id: "typographic", label: "Typographic" },
  { id: "cinematic", label: "Cinematic" },
  { id: "playful", label: "Playful" },
  { id: "brutalist", label: "Brutalist" },
  { id: "warm", label: "Warm and earthy" },
  { id: "ui", label: "Interface-inspired" },
] as const;

export const INDUSTRIES = [
  { id: "saas", label: "SaaS" },
  { id: "ecommerce", label: "Retail and e-commerce" },
  { id: "food", label: "Food and drink" },
  { id: "travel", label: "Travel" },
  { id: "media", label: "Media and publishing" },
  { id: "music", label: "Music and streaming" },
  { id: "finance", label: "Finance" },
  { id: "events", label: "Events" },
  { id: "developer", label: "Developer tools" },
  { id: "delivery", label: "Delivery" },
] as const;

export type CollectionId = (typeof COLLECTIONS)[number]["id"];
export type PurposeId = (typeof PURPOSES)[number]["id"];
export type AestheticId = (typeof AESTHETICS)[number]["id"];
export type IndustryId = (typeof INDUSTRIES)[number]["id"];

/** A picture of the design. */
export type Visual =
  /** One of the HTML emails in public/emails: desktop and phone previews, live on its page. */
  | { kind: "email"; slug: string }
  /** A screenshot of a design you only have as an image. `small` is an optional ~720px copy. */
  | { kind: "image"; src: string; small?: string; alt: string; width: number; height: number };

export type Design = {
  /** Matches public/emails/<slug>.html and public/previews/<slug>-*.webp. */
  slug: string;
  title: string;
  /** One or two sentences for cards and search. */
  summary: string;
  collection: CollectionId;
  purposes: PurposeId[];
  aesthetics: AestheticId[];
  industries: IndustryId[];
  /** As it shows in an inbox. */
  from: string;
  subject: string;
  preheader: string;
  /** What is in the design, one plain line each. */
  modules: string[];
  /** How it stays email-safe: anything special about this design. */
  notes?: string[];
  featured?: boolean;
  /** YYYY-MM-DD. Newer designs go at the end of their file. */
  added: string;
  /** A concept for a fictional brand rather than client work. */
  concept?: boolean;
  thumbnail?: Visual;
  /** Extra pictures shown on the design's page. */
  gallery?: Visual[];
};

/** @deprecated kept for older imports; a Project is a Design. */
export type Project = Design;
