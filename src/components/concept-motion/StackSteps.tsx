"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

type Step = { title: string; text: string };

// Where each card sticks: below the header, each one 24px lower than the last
// so the edges of the cards beneath stay visible as a stack.
const STICKY_TOP = 96;
const STACK_STEP = 24;
const stickyTop = (i: number) => STICKY_TOP + i * STACK_STEP;

// Concept D process: full-width cards that stick and stack on top of each
// other as you scroll (CSS sticky); each one below gently shrinks back and
// dims (brightness, not opacity — cards stay opaque so text never shows
// through) only while the next one slides over it.
export function StackSteps({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: Step[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        // Only once the next card is actually closing in (its top in the
        // upper half of the screen) until it settles on its sticky spot —
        // the card being read stays bright and full size until then.
        // Explicit start values: GSAP would read `filter: none` as brightness(0).
        gsap.fromTo(card, { scale: 1, filter: "brightness(1)" }, {
          scale: 0.95,
          filter: "brightness(0.7)",
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 60%",
            end: `top ${stickyTop(i + 1)}px`,
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-5 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-40">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
      <h2 className="mt-6 max-w-4xl font-serif text-5xl font-bold uppercase leading-[0.95] sm:text-7xl">{title}</h2>

      <ol className="mt-16 space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="sticky" style={{ top: `${stickyTop(i)}px` }}>
            <div className="stack-card origin-top rounded-3xl border border-border bg-surface p-8 sm:p-12 md:flex md:min-h-[22rem] md:items-end md:justify-between md:gap-12">
              <span className="block font-serif text-7xl font-bold leading-none text-accent sm:text-9xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-8 max-w-md md:mt-0">
                <h3 className="font-serif text-3xl font-bold uppercase sm:text-4xl">{step.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{step.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
