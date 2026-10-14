"use client";

import { useEffect, useRef } from "react";

/**
 * Drifts its content down at `speed` × scroll distance and fades it out,
 * so it scrolls slower than the page. Meant for above-the-fold content.
 * Writes styles directly (no re-renders); disabled for reduced motion.
 */
export function ParallaxLayer({
  speed,
  fadeOver = 0.6,
  className = "",
  children,
}: {
  /** 0 = scrolls normally, 0.5 = moves at half the page speed. */
  speed: number;
  /** Fraction of the viewport height over which it fades to 0. */
  fadeOver?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = Math.min(window.scrollY, vh * 1.5); // nothing to do past the hero
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      el.style.opacity = String(Math.max(0, 1 - y / (vh * fadeOver)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, fadeOver]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
