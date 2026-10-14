"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Buttery smooth scrolling (Lenis) driven by GSAP's ticker, so scroll-linked
 * animations stay in sync. Torn down when the page unmounts or is hidden —
 * other concepts keep native scrolling. Off for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09 });
    const unsubscribe = lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout settles once fonts/images arrive; re-measure pinned sections.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      unsubscribe();
      lenis.destroy();
    };
  }, []);

  return null;
}
