"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { localePath } from "@/lib/paths";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { ProductImage } from "@/components/sections/ProductImage";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

// Concept D product gallery. Desktop: the section pins and vertical scrolling
// moves the whole range sideways. Mobile / reduced motion: a native
// swipeable row. Images show a "View" cursor.
export function HorizontalGallery({
  eyebrow,
  title,
  intro,
  scrollHint,
  products,
  locale,
  t,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  scrollHint: string;
  products: Product[];
  locale: Locale;
  t: Dictionary["products"];
}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden pt-20 md:flex md:h-svh md:items-center md:pt-0">
      {/* Phones: the intro sits above the swipeable row. */}
      <div className="px-5 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
        <h2 className="mt-6 font-serif text-5xl font-bold uppercase leading-[0.95]">{title}</h2>
        <p className="mt-6 max-w-sm leading-relaxed text-muted">{intro}</p>
      </div>
      <div
        ref={track}
        className="flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-20 pt-10 [scrollbar-width:none] md:snap-none md:gap-10 md:overflow-visible md:px-10 md:py-0 [&::-webkit-scrollbar]:hidden"
      >
        {/* Desktop: the intro is the first panel of the sliding row. Only one of
            the two intros is ever displayed, so there is one visible <h2>. */}
        <div className="hidden w-[32vw] shrink-0 flex-col justify-end md:flex">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
          <h2 className="mt-6 font-serif text-5xl font-bold uppercase leading-[0.95] sm:text-6xl lg:text-7xl">{title}</h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted">{intro}</p>
          <p aria-hidden className="mt-10 hidden text-xs uppercase tracking-[0.4em] text-muted md:block">
            {scrollHint}
          </p>
        </div>

        {products.map((p, i) => {
          const href = localePath(locale, `/products/${p.slug}`);
          return (
            <article key={p.slug} className="group/card flex w-[72vw] shrink-0 snap-start flex-col sm:w-[44vw] md:w-[24vw]">
              <Link href={href} data-cursor="View" className="relative block aspect-[3/4] overflow-hidden rounded-2xl">
                <ProductImage product={p} locale={locale} tone="dark" sizes="(min-width: 768px) 24vw, 72vw" />
              </Link>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="font-serif text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  {p.variants.map((v) => v.size).join(" · ")}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight">
                <Link href={href} className="transition-colors hover:text-accent">
                  {p.name[locale]}
                </Link>
              </h3>
              <div className="mt-4">
                <AddToListButton
                  variants={p.variants}
                  variant="text"
                  labels={{ addToList: t.addToList, inList: t.inList, size: t.size }}
                />
              </div>
            </article>
          );
        })}
        {/* trailing space so the last card can reach the centre */}
        <div aria-hidden className="w-[10vw] shrink-0" />
      </div>
    </section>
  );
}
