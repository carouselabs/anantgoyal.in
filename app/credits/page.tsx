import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import photoCredits from "@/content/photo-credits.json";
import iconCredits from "@/content/icon-credits.json";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Credits · ${site.name}`,
  description: "Sources and licences for the photographs and logos used in the sample emails on this site.",
  alternates: { canonical: "/credits/" },
  robots: { index: false },
};

export default function Credits() {
  const photos = photoCredits.photos;
  return (
    <main id="main" className="min-h-svh bg-mist px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[760px]">
        <Link href="/" className="btn inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-medium text-ink shadow-sm ring-1 ring-ink/5">
          <ArrowLeft aria-hidden className="size-4" /> Back to the site
        </Link>
        <h1 className="mt-10 text-4xl font-semibold tracking-[-0.03em] text-ink">Credits</h1>
        <p className="mt-4 text-lg leading-[1.6] text-ink-2">
          The sample emails on this site are designed for fictional brands. The photographs inside them are used under the licences below.
        </p>

        <h2 className="mt-12 text-xl font-semibold text-ink">Photographs</h2>
        <ul className="mt-4 divide-y divide-line rounded-2xl bg-white ring-1 ring-ink/5">
          {photos.map((p) => (
            <li key={p.id} className="p-4 text-[15px] leading-[1.5]">
              <span className="text-ink">{p.alt}</span>
              <span className="block text-ink-3">
                {p.by} ·{" "}
                <a href={p.page} className="underline decoration-ink/25 underline-offset-2 hover:decoration-ink" rel="noopener">
                  {p.source}
                </a>{" "}
                ·{" "}
                <a href={p.licenceUrl} className="underline decoration-ink/25 underline-offset-2 hover:decoration-ink" rel="noopener license">
                  {p.licence}
                </a>
              </span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl font-semibold text-ink">Logos</h2>
        <p className="mt-2 text-[15px] text-ink-2">Product names and logos are trademarks of their owners.</p>
        <ul className="mt-4 divide-y divide-line rounded-2xl bg-white ring-1 ring-ink/5">
          {iconCredits.map((i) => (
            <li key={i.file} className="p-4 text-[15px] leading-[1.5]">
              <span className="text-ink">{i.name}</span>
              <span className="block text-ink-3">
                {i.author} ·{" "}
                <a href={i.url} className="underline decoration-ink/25 underline-offset-2 hover:decoration-ink" rel="noopener">
                  {i.licence}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
