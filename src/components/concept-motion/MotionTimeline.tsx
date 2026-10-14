"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

type Milestone = { year: string; title: string; text: string };

// Concept D: the client's milestone timeline. A rail on the left fills with
// terracotta as you scroll through it; each milestone (huge year + text)
// slides in as it is reached. Static for reduced motion.
export function MotionTimeline({ label, milestones }: { label: string; milestones: Milestone[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".rail-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".rail", start: "top 70%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>(".milestone").forEach((el) => {
        gsap.from(el, {
          x: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-5 pb-28 sm:px-10 sm:pb-40">
      <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">{label}</h2>
      <ol className="rail relative mt-12 space-y-16 pl-8 sm:space-y-24 sm:pl-16">
        {/* Rail: faint track + terracotta fill that grows with scroll. */}
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border" />
        <span aria-hidden className="rail-fill absolute bottom-0 left-0 top-0 w-px origin-top bg-accent" />
        {milestones.map((m) => (
          <li key={m.year} className="milestone grid gap-4 md:grid-cols-12 md:items-baseline md:gap-10">
            <p className="font-serif text-[clamp(2.5rem,11vw,6rem)] font-bold leading-none md:col-span-6">
              {m.year}
            </p>
            <div className="md:col-span-6">
              <h3 className="font-serif text-2xl font-bold uppercase sm:text-3xl">{m.title}</h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">{m.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
