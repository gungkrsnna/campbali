"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

type Stat = { value: string; label: string };

// Concept D story: the story text lights up word by word as you scroll
// through it; below, the key numbers count up when they come into view.
export function StoryReveal({
  label,
  text,
  stats,
  link,
}: {
  label: string;
  text: string;
  stats: Stat[];
  link: { href: string; label: string };
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".word",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".words", start: "top 75%", end: "bottom 45%", scrub: true },
        },
      );

      // Count up the numeric part of each stat ("~20" → 0…20, "100%" → 0…100).
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const match = el.dataset.value?.match(/^(\D*)(\d+)(.*)$/);
        if (!match) return;
        const [, pre, num, post] = match;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: Number(num),
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = `${pre}${Math.round(counter.v)}${post}`;
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-5 py-28 sm:px-10 sm:py-40">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">{label}</p>
      <p className="words mt-10 max-w-6xl font-serif text-3xl font-semibold leading-[1.15] sm:text-5xl lg:text-6xl">
        {text.split(" ").map((w, i) => (
          <span key={i} className="word">
            {w}{" "}
          </span>
        ))}
      </p>
      <Link href={link.href} className="mt-12 inline-block border-b border-accent pb-1 text-sm font-semibold uppercase tracking-widest text-accent">
        {link.label} →
      </Link>

      <dl className="mt-24 grid grid-cols-2 gap-y-12 border-t border-border pt-12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="pr-4">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span data-value={s.value} className="stat-num block font-serif text-[clamp(1.5rem,8vw,4.5rem)] font-bold leading-none">
                {s.value}
              </span>
              <span className="mt-4 block max-w-[12rem] text-sm leading-snug text-muted">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
