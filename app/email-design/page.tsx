import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { CtaBand } from "@/components/site/CtaBand";
import { DesignIndex } from "@/components/portfolio/DesignIndex";
import { PersonalisedBanner } from "@/components/portfolio/PersonalisedBanner";
import { Orb, Torus } from "@/components/three-d/Objects";
import { allDesigns } from "@/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Email Design · ${site.name}`,
  description: "Exploring what's possible when email meets creativity: social posts, conversations, releases, shop and product emails, editorial and experimental layouts.",
  alternates: { canonical: "/email-design/" },
};

export default function EmailDesignPage() {
  return (
    <>
      <Nav home={false} />
      <main id="main">
        <section aria-labelledby="design-page-h" className="canvas relative isolate overflow-hidden px-3 pb-3 pt-[88px] sm:px-4 sm:pb-4 md:px-6 md:pb-6">
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-white px-5 py-10 shadow-[0_40px_120px_-40px_rgba(16,6,90,0.65)] sm:rounded-[40px] sm:px-10 sm:py-14 lg:px-14">
            <Torus size={200} className="-right-10 -top-6 hidden opacity-90 md:block" />
            <Orb variant="iris" size={64} className="right-[22%] top-[52%] hidden md:block" />
            <Orb variant="blue" size={120} className="-bottom-10 right-[6%] hidden md:block" />
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-ink-2 hover:text-ink">
              <ArrowLeft aria-hidden className="size-4" /> Home
            </Link>
            <h1 id="design-page-h" className="mt-4 max-w-[15ch] text-[clamp(2.5rem,1.2rem+4.2vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
              Email <span className="font-serif font-normal italic tracking-[-0.02em] text-violet">Design</span>
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-[1.6] text-ink-2">Exploring what&rsquo;s possible when email meets creativity.</p>
          </div>
        </section>

        <section aria-label="Designs" className="bg-mist px-4 pb-14 pt-8 sm:px-6 md:pb-24 md:pt-10">
          <div className="mx-auto max-w-[1400px] lg:px-8">
            <PersonalisedBanner />
            <DesignIndex designs={allDesigns} />
          </div>
        </section>
      </main>
      <CtaBand />
    </>
  );
}
