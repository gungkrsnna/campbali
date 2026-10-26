import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import Image from "next/image";
import Link from "next/link";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";
import { Eyebrow } from "@/components/concept-luxe/Bleed";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.ethos.title,
    description: dict.ethos.description,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale, "/ethos")])),
    },
  };
}

export default async function EthosPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.ethos;

  return (
    <PageTransition>
      <section aria-labelledby="ethos-title">
        <Container className="grid gap-10 pb-16 pt-12 sm:gap-14 sm:py-24 md:grid-cols-12 md:items-center md:gap-8 lg:py-28">
          <div className="min-w-0 md:col-span-6">
            <Eyebrow className="motion-safe:animate-fade-up">{dict.nav.ethos}</Eyebrow>
            <h1
              id="ethos-title"
              className="mt-7 text-balance font-serif text-[clamp(2.5rem,10vw,4rem)] font-normal leading-[1.08] sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl motion-safe:animate-fade-up [animation-delay:100ms]"
            >
              {t.heroLead}
              <span className="mt-1 block italic text-accent">{t.heroAccent}</span>
            </h1>
            <span aria-hidden className="mt-7 block h-px w-12 bg-accent/60 sm:mt-9 sm:w-16 motion-safe:animate-fade-up [animation-delay:200ms]" />
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted sm:text-lg motion-safe:animate-fade-up [animation-delay:250ms]">
              {t.heroIntro}
            </p>
            <a
              href="#our-belief"
              className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-accent motion-safe:animate-fade-up [animation-delay:300ms]"
            >
              <span className="border-b border-current/30 pb-0.5">{t.discover}</span>
              <span aria-hidden>↓</span>
            </a>
          </div>

          <figure className="min-w-0 md:col-span-5 md:col-start-8">
            <div className="relative aspect-[5/4] max-h-[36rem] overflow-hidden bg-surface md:aspect-[4/5]">
              <Image
                src="/images/home/variants/coconut-grove.webp"
                alt={t.heroImageAlt}
                fill
                sizes="(min-width: 1440px) 520px, (min-width: 768px) 42vw, 100vw"
                preload
                className="object-cover object-right"
              />
              <span aria-hidden className="pointer-events-none absolute inset-3 border border-background/15 sm:inset-4" />
            </div>
            <figcaption className="mt-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-muted sm:mt-5">
              <span aria-hidden className="h-px w-8 bg-accent/60" />
              {dict.contact.locationValue}
            </figcaption>
          </figure>
        </Container>
      </section>

      <section id="our-belief" aria-labelledby="belief-title" className="scroll-mt-24 border-y border-border bg-surface/30 py-16 sm:py-24 lg:py-28">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-4">
            <h2 id="belief-title" className="text-balance font-serif text-4xl font-normal leading-[1.15] sm:text-5xl">
              {t.beliefTitle}
            </h2>
          </Reveal>
          <Reveal delay={150} className="min-w-0 lg:col-span-7 lg:col-start-6">
            <p className="max-w-2xl text-lg font-light leading-relaxed text-muted sm:text-xl">{t.intro}</p>
          </Reveal>
        </Container>
      </section>

      <section id="our-pillars" aria-labelledby="pillars-title" className="scroll-mt-24 py-16 sm:py-24 lg:py-32">
        <Container>
          <Reveal className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
            <h2 id="pillars-title" className="text-balance font-serif text-4xl font-normal leading-[1.12] sm:text-5xl">{t.pillarsTitle}</h2>
            <p className="max-w-md font-light leading-relaxed text-muted">{t.pillarsIntro}</p>
          </Reveal>
          <ol className="mt-10 border-t border-border sm:mt-14">
            {t.pillars.map((pillar, index) => (
              <li key={pillar.title} className="border-b border-border">
                <Reveal delay={index * 100} className="grid gap-5 py-8 sm:gap-6 sm:py-12 md:grid-cols-12 lg:gap-10">
                  <span aria-hidden className="text-xs font-medium tracking-[0.2em] text-accent md:col-span-1 md:pt-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 md:col-span-5 lg:col-span-4">
                    <h3 className="text-balance font-serif text-3xl font-normal leading-tight sm:text-4xl">{pillar.title}</h3>
                    <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-muted">{pillar.text}</p>
                  </div>
                  <p className="max-w-xl text-base font-light leading-relaxed text-muted md:col-span-6 md:pt-1 lg:col-span-6 lg:col-start-7 lg:text-lg">
                    {pillar.detail}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="ethos-mission-title" className="border-y border-border bg-surface/40 py-16 sm:py-24 lg:py-28">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 id="ethos-mission-title" className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">{t.missionTitle}</h2>
            <p className="mt-7 text-balance font-serif text-3xl font-normal italic leading-[1.35] sm:mt-9 sm:text-4xl lg:text-5xl">{t.mission}</p>
            <span aria-hidden className="mx-auto mt-9 block h-px w-16 bg-accent/60" />
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="ethos-next-title" className="py-16 sm:py-24 lg:py-28">
        <Container className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <Eyebrow>{t.closingLabel}</Eyebrow>
            <h2 id="ethos-next-title" className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.12] sm:text-5xl">{t.closingTitle}</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-md font-light leading-relaxed text-muted">{t.closingText}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link href={localePath(locale, "/products")} className={`${buttonClass()} w-full px-7 py-3 sm:w-auto`}>
                {dict.home.ctaProducts}
              </Link>
              <TextLink href={localePath(locale, "/our-story")}>{dict.home.ctaStory}</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}
