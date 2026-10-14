"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Endless ticker of phrases. Runs on its own and speeds up / reverses with
 * the scroll direction and velocity. Static row for reduced motion.
 */
export function Marquee({
  items,
  className = "",
  itemClassName = "font-serif text-5xl font-bold uppercase sm:text-7xl",
  speed = 40,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  /** Seconds for one full loop. */
  speed?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.to(".track", { xPercent: -50, duration: speed, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity() / 300;
          gsap.to(loop, { timeScale: gsap.utils.clamp(-4, 4, self.direction * (1 + Math.abs(v))), duration: 0.3, overwrite: true });
        },
      });
    },
    { scope: root },
  );

  const row = (copy: number) =>
    items.map((item, i) => (
      <span key={`${copy}-${i}`} aria-hidden={copy > 0} className={`flex shrink-0 items-center whitespace-nowrap ${itemClassName}`}>
        {item}
        <span aria-hidden className="mx-8 text-accent sm:mx-12">✦</span>
      </span>
    ));

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      {/* Two identical halves: moving the track by -50% loops seamlessly. */}
      <div className="track flex w-max">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
