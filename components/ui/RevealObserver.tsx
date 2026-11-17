"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page. Any element with `data-reveal` rises into
 * place the first time it enters the viewport. Without JS (no `html.js`) or
 * under reduced motion the CSS never hides anything, so nothing depends on this.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => {
      // Anything already on screen (or above it) shows at once.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) el.setAttribute("data-shown", "");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
