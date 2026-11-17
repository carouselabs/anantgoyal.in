"use client";

import { NAV_LINKS, navHref } from "@/components/site/navLinks";
import { Wordmark } from "@/components/site/Wordmark";

import clsx from "clsx";
import { Menu, Pause, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";


function useMotionPref() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    // The head script already applied a saved choice to <html>; mirror it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPaused(document.documentElement.getAttribute("data-motion") === "paused");
  }, []);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    const root = document.documentElement;
    if (next) root.setAttribute("data-motion", "paused");
    else root.removeAttribute("data-motion");
    try {
      localStorage.setItem("motion", next ? "paused" : "on");
    } catch {}
    window.dispatchEvent(new CustomEvent("motionchange", { detail: { paused: next } }));
  };
  return { paused, toggle };
}

export function Nav({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const { paused, toggle } = useMotionPref();
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const MotionIcon = paused ? Play : Pause;

  // The open menu locks page scroll; unlock it before jumping to the section.
  const goTo = (e: React.MouseEvent, href: string) => {
    const target = home && href.startsWith("#") ? document.querySelector(href) : null;
    if (!target) {
      document.body.style.removeProperty("overflow");
      setOpen(false);
      return;
    }
    e.preventDefault();
    document.body.style.removeProperty("overflow");
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", href);
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink focus:shadow-lg">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 md:px-6">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 rounded-full border border-white/50 bg-white/75 pl-4 pr-2 shadow-[0_10px_40px_-18px_rgba(20,10,90,0.45)] backdrop-blur-xl sm:pl-5">
          <a href={home ? "#top" : "/"} className="rounded-full" aria-label={home ? `${site.name}, back to top` : `${site.name}, home`}>
            <Wordmark />
          </a>
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={navHref(l.href, home)} className="inline-flex h-11 items-center rounded-full px-4 text-[15px] font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggle}
              aria-pressed={paused}
              aria-label={paused ? "Play background animations" : "Pause background animations"}
              title={paused ? "Play animations" : "Pause animations"}
              className="btn grid size-11 place-items-center rounded-full text-ink-2 hover:bg-ink/5 hover:text-ink"
            >
              <MotionIcon aria-hidden className="size-4" strokeWidth={2.2} />
            </button>
            <span className="hidden sm:block">
              <ButtonLink href={navHref("#contact", home)}>Start a project</ButtonLink>
            </span>
            <button
              ref={menuBtn}
              type="button"
              className="btn grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </nav>
      </header>
      <div
        id="mobile-menu"
        className={clsx(
          "canvas fixed inset-0 z-40 flex flex-col px-6 pb-8 pt-28 transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={navHref(l.href, home)} tabIndex={open ? 0 : -1} onClick={(e) => goTo(e, l.href)} className="block py-3 text-4xl font-semibold tracking-[-0.03em] text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink href={navHref("#contact", home)} onClick={(e) => goTo(e, "#contact")} variant="light" size="lg" arrow="right" tabIndex={open ? 0 : -1} className="mt-auto w-full">
          Start a project
        </ButtonLink>
      </div>
    </>
  );
}

export { NAV_LINKS, navHref, Wordmark };
