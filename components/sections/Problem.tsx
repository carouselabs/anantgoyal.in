import { ArrowRight } from "lucide-react";
import { BeforeAfter } from "@/components/email/BeforeAfter";
import { InboxWindow } from "@/components/email/Frames";
import { Orb } from "@/components/three-d/Objects";
import { previewSrc, previewSrcSet, projectBySlug } from "@/content/projects";

const PAIRS = [
  { before: "Default fonts and blue links", after: "Your type, colours and logo" },
  { before: "One long block of text", after: "A clear order: headline, story, action" },
  { before: "Shrinks to unreadable on a phone", after: "Columns that stack, buttons sized for a thumb" },
];

export function Problem() {
  const p = projectBySlug("graphwell-newsletter")!;
  return (
    <section id="problem" aria-labelledby="problem-h" className="relative overflow-hidden bg-mist px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
        <div className="min-w-0">
          <h2 id="problem-h" className="max-w-[14ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            Still sending emails that look like everyone else&rsquo;s?
          </h2>
          <p className="mt-6 max-w-[34rem] text-lg leading-[1.6] text-ink-2">
            A plain email says nothing about who sent it. Same default font, same blue links, same grey wall of text as the ten messages above it. Your product, your voice and the care you put into everything else get lost before anyone reads a word.
          </p>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {PAIRS.map((pair) => (
              <li key={pair.before} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 py-4 text-[15px] sm:gap-5">
                <span className="text-ink-2 line-through decoration-ink/30">{pair.before}</span>
                <ArrowRight aria-hidden className="size-4 text-violet" />
                <span className="font-medium text-ink">{pair.after}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-w-0">
          <Orb variant="pearl" size={120} className="-right-6 -top-10 z-10 hidden sm:block" />
          <Orb variant="blue" size={56} className="-bottom-5 -left-4 z-10" />
          <InboxWindow from={p.from} subject={p.subject} className="relative shadow-[var(--shadow-float)]">
            <BeforeAfter
              height="clamp(420px, 62vh, 620px)"
              before={{ src: previewSrc(p.slug, "plain"), srcSet: previewSrcSet(p.slug, "plain"), alt: "The Graphwell update as a plain email: default font, blue links, no layout", width: 1020, height: 1350 }}
              after={{ src: previewSrc(p.slug, "desktop"), srcSet: previewSrcSet(p.slug, "desktop"), alt: "The same Graphwell update as a designed HTML email with a dark hero and product screenshot", width: 1020, height: 2805 }}
            />
          </InboxWindow>
        </div>
      </div>
    </section>
  );
}
