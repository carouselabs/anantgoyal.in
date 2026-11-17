import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { CtaBand } from "@/components/site/CtaBand";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { LiveEmail } from "@/components/portfolio/LiveEmail";
import { Orb } from "@/components/three-d/Objects";
import { aestheticLabel, allDesigns, collectionLabel, designBySlug, designHref, industryLabel, purposeLabel, relatedDesigns } from "@/projects";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allDesigns.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = designBySlug(slug);
  if (!d) return {};
  return {
    title: `${d.title} · ${site.name}`,
    description: d.summary,
    alternates: { canonical: designHref(d.slug) },
    openGraph: { title: `${d.title} · ${site.name}`, description: d.summary, images: [`/previews/${d.slug}-desktop.webp`] },
  };
}

// What every design in the library does to survive real inboxes.
const SAFE = ["Table layout, 600px wide, with Outlook ghost tables", "Inline styles, with media queries only as an extra", "Buttons with VML fallbacks for Outlook on Windows", "Images with width, height and alt text", "No scripts, forms or embedded video"];

function Chips({ label, items, param, toLabel }: { label: string; items: string[]; param: string; toLabel: (id: string) => string }) {
  return (
    <div>
      <dt className="text-[13px] text-ink-3">{label}</dt>
      <dd className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((id) => (
          <Link key={id} href={`/email-design/?${param}=${id}`} className="inline-flex min-h-8 items-center rounded-full bg-mist px-3 text-[13px] font-medium text-ink-2 hover:text-ink">
            {toLabel(id)}
          </Link>
        ))}
      </dd>
    </div>
  );
}

export default async function DesignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = designBySlug(slug);
  if (!d) notFound();
  const related = relatedDesigns(d, 3);

  return (
    <>
      <Nav home={false} />
      <main id="main">
        <section aria-labelledby="design-h" className="canvas relative isolate overflow-hidden px-3 pb-3 pt-[88px] sm:px-4 sm:pb-4 md:px-6 md:pb-6">
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_120px_-40px_rgba(16,6,90,0.65)] sm:rounded-[40px]">
            <Orb variant="violet" size={160} className="-right-12 -top-12 hidden md:block" />
            <div className="relative px-5 pt-8 sm:px-10 sm:pt-12 lg:px-14">
              <Link href="/email-design/" className="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-ink-2 hover:text-ink">
                <ArrowLeft aria-hidden className="size-4" /> Email Design
              </Link>
              <p className="mt-3">
                <Link href={`/email-design/?collection=${d.collection}`} className="text-[14px] font-medium text-violet">
                  {collectionLabel(d.collection)}
                </Link>
              </p>
              <h1 id="design-h" className="mt-2 max-w-[18ch] text-[clamp(2.4rem,1.2rem+4vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
                {d.title}
              </h1>
              <p className="mt-5 max-w-[44rem] text-[19px] leading-[1.55] text-ink-2">{d.summary}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={`/?design=${d.slug}#contact`} className="btn inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-white hover:bg-[#1d1850]">
                  Start from this design
                  <ArrowRight aria-hidden className="btn-arrow size-4" />
                </Link>
                <span className="text-[13px] text-ink-3">Opens the project form with this design noted.</span>
              </div>

              <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1.3fr]">
                <div>
                  <dt className="text-[13px] text-ink-3">From</dt>
                  <dd className="mt-1 text-[15.5px] font-medium text-ink">{d.from}</dd>
                </div>
                <div>
                  <dt className="text-[13px] text-ink-3">Subject line</dt>
                  <dd className="mt-1 text-[15.5px] font-medium text-ink">{d.subject}</dd>
                </div>
                <div>
                  <dt className="text-[13px] text-ink-3">Preview text</dt>
                  <dd className="mt-1 text-[15px] text-ink-2">{d.preheader}</dd>
                </div>
                <Chips label="Purpose" items={d.purposes} param="purpose" toLabel={purposeLabel} />
                <Chips label="Style" items={d.aesthetics} param="style" toLabel={aestheticLabel} />
                <Chips label="Industry" items={d.industries} param="industry" toLabel={industryLabel} />
              </dl>
            </div>

            <div className="relative mx-3 mb-3 mt-10 overflow-hidden rounded-[22px] bg-[linear-gradient(150deg,#e3e8ff,#f0e6ff)] px-4 py-6 sm:mx-4 sm:mb-4 sm:rounded-[30px] sm:px-10 sm:py-10">
              <LiveEmail design={d} />
            </div>
          </div>
        </section>

        <section aria-label="About this design" className="bg-mist px-4 py-16 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-2 lg:px-8">
            <div className="rounded-[24px] bg-white p-6 ring-1 ring-ink/5 sm:p-8">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">What&rsquo;s in it</h2>
              <ol className="mt-4 space-y-2.5">
                {d.modules.map((m, i) => (
                  <li key={m} className="flex gap-3 text-[15.5px] leading-[1.5] text-ink-2">
                    <span className="mt-0.5 font-mono text-[12.5px] font-medium text-violet">{String(i + 1).padStart(2, "0")}</span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[24px] bg-white p-6 ring-1 ring-ink/5 sm:p-8">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">How it stays email-safe</h2>
              <ul className="mt-4 space-y-2.5">
                {[...(d.notes ?? []), ...SAFE].map((n) => (
                  <li key={n} className="flex gap-3 text-[15px] leading-[1.5] text-ink-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-go" />
                    {n}
                  </li>
                ))}
              </ul>
              {d.concept ? (
                <p className="mt-5 flex items-start gap-2 text-[13.5px] leading-[1.5] text-ink-3">
                  <Info aria-hidden className="mt-0.5 size-4 shrink-0" /> One of many directions in Email Design: exploring what&rsquo;s possible when email meets creativity.
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section aria-labelledby="related-h" className="bg-white px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-[1400px] lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-h" className="text-[clamp(1.8rem,1.2rem+2vw,3rem)] font-semibold tracking-[-0.04em] text-ink">
                More like this
              </h2>
              <Link href="/email-design/" className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink">
                <span className="link-draw">Back to Email Design</span>
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProjectCard project={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <CtaBand />
    </>
  );
}
