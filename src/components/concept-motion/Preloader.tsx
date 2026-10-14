"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion, markReady } from "./gsap";

const SEEN_KEY = "campbali-motion-intro";

/**
 * Intro curtain: a 0→100 counter, then the panel lifts away and the page
 * marks the page ready (the hero waits for it). Shown once per browser session;
 * skipped for reduced motion.
 */
export function Preloader({ brand }: { brand: string }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        // Storage blocked — just play the intro.
      }
      // Only remember the intro once it has actually finished playing.
      const finish = () => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        setDone(true);
        markReady();
      };
      if (seen || prefersReducedMotion()) {
        finish();
        return;
      }

      const counter = { v: 0 };
      gsap
        .timeline({ onComplete: finish })
        .to(counter, {
          v: 100,
          duration: 1.3,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v));
          },
        })
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.15");
    },
    { scope: root },
  );

  if (done) return null;
  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[90] flex items-end justify-between bg-background px-5 pb-8 sm:px-10 sm:pb-12"
    >
      <span className="font-serif text-2xl font-semibold uppercase tracking-tight sm:text-4xl">{brand}</span>
      <span className="font-serif text-7xl font-bold leading-none tabular-nums text-accent sm:text-[10rem]">
        <span ref={count}>0</span>
      </span>
    </div>
  );
}
