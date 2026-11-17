import { projects as emails } from "@/content/projects";
import type { Design } from "../types";

// The first seven concepts. Their details live in content/projects.ts (they
// also power the homepage gallery and studio); this adds their library tags.
const TAGS: Record<string, Pick<Design, "collection" | "purposes" | "aesthetics" | "industries"> & { featured?: boolean }> = {
  "graphwell-newsletter": { collection: "saas", purposes: ["newsletter", "launch"], aesthetics: ["ui", "dark"], industries: ["saas"], featured: true },
  "brookfold-winter-edit": { collection: "commerce", purposes: ["promotion"], aesthetics: ["photographic", "warm", "editorial"], industries: ["ecommerce"] },
  "pocketlane-launch": { collection: "saas", purposes: ["launch"], aesthetics: ["dark", "ui", "bold"], industries: ["saas", "finance"] },
  "farewind-fare-sale": { collection: "lifestyle", purposes: ["promotion"], aesthetics: ["photographic", "bold"], industries: ["travel"] },
  "morrow-welcome": { collection: "lifestyle", purposes: ["welcome"], aesthetics: ["warm", "photographic"], industries: ["food", "ecommerce"] },
  "sunday-margin-issue-48": { collection: "editorial", purposes: ["newsletter"], aesthetics: ["editorial", "typographic", "minimal"], industries: ["media"] },
  "tandemly-early-access": { collection: "saas", purposes: ["launch", "promotion"], aesthetics: ["bold", "ui"], industries: ["saas"] },
};

export const originals: Design[] = emails.map((e) => ({
  slug: e.slug,
  title: e.name,
  summary: e.description,
  ...TAGS[e.slug],
  from: e.from,
  subject: e.subject,
  preheader: e.preheader,
  modules: e.modules,
  added: "2026-11-08",
  concept: true,
}));
