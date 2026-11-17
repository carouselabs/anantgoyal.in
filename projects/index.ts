// The email design library registry. Add designs in projects/email-design/*.ts.
import { originals } from "./email-design/originals";
import { library } from "./email-design/library";
import { AESTHETICS, COLLECTIONS, INDUSTRIES, PURPOSES, type CollectionId, type Design } from "./types";

/** Every design, in the order added. */
export const allDesigns: Design[] = [...originals, ...library];
export const allProjects = allDesigns;

export const designBySlug = (slug: string) => allDesigns.find((d) => d.slug === slug);
export const projectBySlug = designBySlug;
export const featuredDesigns = allDesigns.filter((d) => d.featured);

/** Where a design's page lives. */
export const designHref = (slug: string) => `/email-design/${slug}/`;

const labelOf = <T extends readonly { id: string; label: string }[]>(list: T, id: string) => list.find((x) => x.id === id)?.label ?? id;
export const collectionLabel = (id: CollectionId) => labelOf(COLLECTIONS, id);
export const purposeLabel = (id: string) => labelOf(PURPOSES, id);
export const aestheticLabel = (id: string) => labelOf(AESTHETICS, id);
export const industryLabel = (id: string) => labelOf(INDUSTRIES, id);

export type Query = { q?: string; collection?: string; purpose?: string; style?: string; industry?: string; sort?: "featured" | "newest" | "az" };

/** Everything a search can match, in one lower-case string per design. */
const haystack = new Map(
  allDesigns.map((d) => [
    d.slug,
    [d.title, d.summary, d.from, d.subject, collectionLabel(d.collection), ...d.purposes.map(purposeLabel), ...d.aesthetics.map(aestheticLabel), ...d.industries.map(industryLabel)].join(" ").toLowerCase(),
  ]),
);

/** Filter and sort the library. Words in `q` must all match (any order). */
export function searchDesigns(query: Query, designs: Design[] = allDesigns) {
  const words = (query.q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const order = new Map(allDesigns.map((d, i) => [d.slug, i]));
  const out = designs.filter(
    (d) =>
      (!query.collection || d.collection === query.collection) &&
      (!query.purpose || d.purposes.includes(query.purpose as never)) &&
      (!query.style || d.aesthetics.includes(query.style as never)) &&
      (!query.industry || d.industries.includes(query.industry as never)) &&
      words.every((w) => haystack.get(d.slug)?.includes(w)),
  );
  const sort = query.sort ?? "featured";
  return out.sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "newest") return b.added.localeCompare(a.added) || order.get(b.slug)! - order.get(a.slug)!;
    return Number(!!b.featured) - Number(!!a.featured) || order.get(a.slug)! - order.get(b.slug)!;
  });
}

/** Designs in the same collection first, then ones sharing a style. */
export function relatedDesigns(design: Design, count = 3) {
  return allDesigns
    .filter((d) => d.slug !== design.slug)
    .map((d) => ({ d, score: (d.collection === design.collection ? 3 : 0) + d.aesthetics.filter((a) => design.aesthetics.includes(a)).length + d.purposes.filter((p) => design.purposes.includes(p)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.d);
}
export const relatedProjects = relatedDesigns;

export { AESTHETICS, COLLECTIONS, INDUSTRIES, PURPOSES };
export type { Design };
