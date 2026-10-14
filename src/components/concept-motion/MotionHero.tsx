"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, onReady } from "./gsap";
import { Magnetic } from "./Magnetic";

/** Splits a line into per-letter spans inside per-word masks (for the reveal). */
function Letters({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span aria-hidden className={`block ${className}`}>
      {text.split(" ").map((word, w) => (
        <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          {[...word].map((ch, c) => (
            <span key={c} className="char inline-block will-change-transform">
              {ch}
            </span>
          ))}
          {/* keep the space outside the mask so words wrap normally */}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

// Concept D hero. On load (after the preloader) the headline's letters rise
// in one by one. On scroll the section pins: the small photo card grows to
// fill the screen while the headline drifts up and fades.
export function MotionHero({
  titleLead,
  titleAccent,
  tagline,
  primary,
  scrollLabel,
  image,
}: {
  titleLead: string;
  titleAccent: string;
  tagline: string;
  primary: { href: string; label: string };
  scrollLabel: string;
  image: { src: string; alt: string };
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) return;

      // Intro: hidden until the preloader lifts.
      gsap.set(".char", { yPercent: 110 });
      gsap.set(".fade-in", { opacity: 0, y: 20 });
      // contextSafe: the intro belongs to this hero (cleaned up with it).
      const intro = contextSafe!(() =>
        gsap
          .timeline()
          .to(".char", { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.025 })
          .to(".fade-in", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.6"),
      );
      const stopWaiting = onReady(intro);

      // Scroll: pin and grow the photo to full screen.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "+=120%", scrub: 1, pin: true },
          })
          .to(".hero-photo", { width: "100vw", height: "100svh", borderRadius: 0, opacity: 1, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -40, opacity: 0, ease: "none" }, 0);
      });
      ScrollTrigger.refresh();

      return stopWaiting;
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden px-5 pb-10 pt-16 md:h-[calc(100svh-4rem)] md:pb-0 md:pt-0">
      <div className="hero-copy relative z-10 text-center">
        <h1
          aria-label={`${titleLead} ${titleAccent}`}
          className="font-serif text-[8.5vw] font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-[7.5rem]"
        >
          <Letters text={titleLead} />
          <Letters text={titleAccent} className="text-accent" />
        </h1>
        <p className="fade-in mx-auto mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">{tagline}</p>
        <div className="fade-in mt-8">
          <Magnetic>
            <Link
              href={primary.href}
              className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground"
            >
              {primary.label} <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Desktop: a faint centred card behind the headline that grows to full
          screen (and full opacity) on scroll. Below the copy on mobile. */}
      <div className="hero-photo relative mt-10 h-64 w-full max-w-sm overflow-hidden rounded-3xl md:absolute md:left-1/2 md:top-[42%] md:z-0 md:mt-0 md:h-[28vh] md:w-[24vw] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2 md:opacity-30">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" preload className="object-cover" />
      </div>

      <p className="fade-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted md:block">
        {scrollLabel}
      </p>
    </section>
  );
}
