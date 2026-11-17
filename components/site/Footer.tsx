import clsx from "clsx";
import { site, visibleSocials } from "@/content/site";
import { NAV_LINKS, navHref } from "@/components/site/navLinks";
import { Wordmark } from "@/components/site/Wordmark";

// Real logos for the profiles that have one in public/icons.
const ICONS: Record<string, string> = { LinkedIn: "/icons/linkedin-icon.svg" };

/** The site footer, on the gradient. Used by the homepage and the email design pages. */
export function Footer({ home = true, className }: { home?: boolean; className?: string }) {
  const year = 2026;
  return (
    <footer className={clsx("relative mx-auto max-w-[1400px] border-t border-white/20 py-10 lg:px-8", className)}>
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Wordmark tone="white" />
          <p className="mt-2 text-[14px] text-white/90">{site.role}</p>
          {visibleSocials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {visibleSocials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener me"
                    className="btn inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-[14px] font-medium text-white ring-1 ring-white/25 hover:bg-white/20"
                  >
                    {ICONS[s.label] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={ICONS[s.label]} alt="" width={16} height={16} className="size-4 rounded-[3px] bg-white" />
                    ) : null}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <nav aria-label="Footer">
          <ul className="-mx-3 flex flex-wrap gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={navHref(l.href, home)} className="inline-flex h-11 items-center rounded-full px-3 text-[15px] text-white/90 hover:text-white">
                  <span className="link-draw">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-8 flex flex-col gap-2 text-[13px] text-white/90 md:flex-row md:justify-between">
        <p>
          &copy; {year} {site.name}
        </p>
        {/* Some sample-email photos are CC BY / CC BY-SA, which require credit: keep a link to /credits/. */}
        <p>
          <a href="/credits/" className="inline-flex min-h-11 items-center text-white/90 hover:text-white">
            <span className="link-draw">Credits</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
