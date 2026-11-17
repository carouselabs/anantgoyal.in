"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

// Stop sample links from navigating the preview. Attached once per document,
// as soon as the email's HTML is parsed (before its images finish loading).
const guarded = new WeakSet<Document>();
function guard(doc: Document) {
  if (guarded.has(doc)) return;
  guarded.add(doc);
  doc.addEventListener(
    "click",
    (e) => {
      if ((e.target as Element | null)?.closest?.("a")) e.preventDefault();
    },
    true,
  );
}

/**
 * Shows a real email (its HTML file) at its true width — 680px for a desktop
 * inbox, 375px for a phone — scaled down to fit the box it sits in. Because
 * the iframe really is that wide, the email's own media queries decide its
 * layout, exactly as in a mail app. The email scrolls inside the frame.
 *
 * Links inside the email are sample links, so clicks on them are ignored
 * (the portfolio's interactions stay outside the email).
 */
export function EmailFrame({ src, title, width, className, onLoaded }: { src: string; title: string; width: number; className?: string; onLoaded?: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setScale(Math.min(1, w / width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const handleLoad = () => {
    setLoadedSrc(src);
    onLoaded?.();
    try {
      const doc = frame.current?.contentDocument;
      if (doc) guard(doc);
    } catch {
      // Cross-origin (a replaced email hosted elsewhere): links stay live.
    }
  };

  // The first frame is in the server-rendered HTML, so it can finish loading
  // before React attaches onLoad. Watch the document directly as well.
  useEffect(() => {
    const f = frame.current;
    if (!f) return;
    let stopped = false;
    let tries = 0;
    let timer = 0;
    const tick = () => {
      if (stopped) return;
      try {
        const doc = f.contentDocument;
        if (doc && doc.URL !== "about:blank" && doc.readyState !== "loading") {
          guard(doc);
          setLoadedSrc(src);
          return;
        }
      } catch {
        return;
      }
      if (++tries < 300) timer = window.setTimeout(tick, 50);
    };
    tick();
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [src]);

  return (
    <div ref={box} className={clsx("relative overflow-hidden", className)}>
      <iframe
        ref={frame}
        key={src}
        src={src}
        title={title}
        loading="lazy"
        onLoad={handleLoad}
        className={clsx("absolute left-0 top-0 origin-top-left border-0 bg-white transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
        style={{ width, height: `${100 / scale}%`, transform: `scale(${scale})` }}
      />
      {!loaded ? <div aria-hidden className="absolute inset-0 animate-pulse bg-[linear-gradient(180deg,#f4f3fc,#ebe8fa)]" /> : null}
    </div>
  );
}
