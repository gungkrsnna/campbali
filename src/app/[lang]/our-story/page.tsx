import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import Image from "next/image";
import Link from "next/link";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";
import { Eyebrow } from "@/components/concept-luxe/Bleed";
import { LuxeTimeline } from "@/components/concept-luxe/LuxeTimeline";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export async function generateMetadata(): Promise<Metadata> {
  const { story } = await getDictionary();

  return {
    title: story.title,
    description: story.description,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale, "/our-story")])),
    },
  };
}

export default async function OurStoryPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.story;

  return (
    <PageTransition>
      <section aria-labelledby="story-title" className="pt-20 sm:pt-28 lg:pt-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow className="motion-safe:animate-fade-up">{t.title}</Eyebrow>
            <h1
              id="story-title"
              className="mt-8 text-balance font-serif text-5xl font-normal leading-[1.08] sm:text-7xl lg:text-8xl motion-safe:animate-fade-up [animation-delay:100ms]"
            >
              {t.titleLead}
              <span className="mt-1 block italic text-accent">{t.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-muted motion-safe:animate-fade-up [animation-delay:200ms]">
              {t.intro}
            </p>
            <a
              href="#origins"
              className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-accent transition-colors hover:text-foreground motion-safe:animate-fade-up [animation-delay:300ms]"
            >
              {t.discover}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </Container>

        <figure className="relative mt-16 h-72 overflow-hidden sm:mt-20 sm:h-96 lg:h-[30rem]">
          <Image
            src="/images/home/symmetrical/coconut-grove.webp"
            alt={dict.home.processImageAlt}
            fill
            sizes="100vw"
            preload
            className="object-cover object-bottom"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0">
            <Container className="flex flex-wrap items-end justify-between gap-4 py-8 sm:py-10">
              <span className="text-[11px] uppercase tracking-[0.3em] text-foreground">{t.landscapeCaption}</span>
              <span className="font-serif text-xl italic text-accent">{t.since}</span>
            </Container>
          </figcaption>
        </figure>
      </section>

      <section id="origins" aria-labelledby="origins-title" className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
        <Container className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-4">
            <Eyebrow>{t.since}</Eyebrow>
            <h2 id="origins-title" className="mt-6 font-serif text-4xl font-normal leading-tight sm:text-5xl">
              {t.originsTitle}
            </h2>
            <span aria-hidden className="mt-8 block h-px w-16 bg-accent/60" />
          </Reveal>
          <Reveal delay={150} className="space-y-7 text-lg font-light leading-relaxed text-muted md:col-span-7 md:col-start-6">
            {t.origins.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </Container>
      </section>

      <LuxeTimeline label={t.timelineTitle} milestones={t.timeline} controls={t.timelineControls} />

      <section aria-labelledby="purpose-title" className="border-y border-border bg-surface/40">
        <Container className="grid gap-12 py-16 sm:py-24 md:grid-cols-2 md:items-center lg:gap-24 lg:py-28">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/home/coconut-oil-elegant-still-life.webp"
                  alt={t.productImageAlt}
                  fill
                  sizes="(min-width: 1440px) 560px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted">
                {dict.home.vcoLabel}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={150}>
            <Eyebrow>{t.purposeLabel}</Eyebrow>
            <h2 id="purpose-title" className="mt-6 text-balance font-serif text-4xl font-normal leading-[1.15] sm:text-5xl lg:text-6xl">
              {dict.ethos.title}
            </h2>
            <p className="mt-8 text-lg font-light leading-relaxed text-muted">{dict.ethos.intro}</p>
            <div className="mt-10">
              <TextLink href={localePath(locale, "/ethos")}>{dict.home.ethosLink}</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="story-mission-title" className="py-24 sm:py-32 lg:py-40">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 id="story-mission-title" className="text-[11px] font-medium uppercase tracking-[0.35em] text-accent">
              {dict.ethos.missionTitle}
            </h2>
            <p className="mt-8 text-balance font-serif text-3xl font-normal italic leading-[1.35] sm:text-4xl lg:text-5xl">
              {dict.ethos.mission}
            </p>
            <span aria-hidden className="mx-auto mt-10 block h-px w-16 bg-accent/60" />
            <p className="mx-auto mt-8 max-w-lg font-light leading-relaxed text-muted">{t.closing}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              <Link href={localePath(locale, "/products")} className={`${buttonClass()} px-8 py-3.5`}>
                {dict.home.ctaProducts}
              </Link>
              <TextLink href={localePath(locale, "/ethos")}>{dict.home.ethosLink}</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}
