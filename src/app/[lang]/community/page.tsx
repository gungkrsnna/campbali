import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import Image from "next/image";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { buildWhatsAppUrl } from "@/lib/inquiry";
import { localePath } from "@/lib/paths";
import { Eyebrow } from "@/components/concept-luxe/Bleed";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.community.title,
    description: dict.community.description,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale, "/community")])),
    },
  };
}

export default async function CommunityPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.community;

  return (
    <PageTransition>
      <section aria-labelledby="community-title">
        <Container className="pb-12 pt-12 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
          <Eyebrow className="motion-safe:animate-fade-up">{t.title}</Eyebrow>
          <div className="mt-7 grid gap-7 md:grid-cols-12 md:items-end md:gap-10">
            <h1
              id="community-title"
              className="min-w-0 text-balance font-serif text-[clamp(2.5rem,10vw,4rem)] font-normal leading-[1.08] md:col-span-7 lg:text-7xl xl:text-8xl motion-safe:animate-fade-up [animation-delay:100ms]"
            >
              {t.heroLead}
              <span className="mt-1 block italic text-accent">{t.heroAccent}</span>
            </h1>
            <div className="min-w-0 md:col-span-5 md:pb-1 motion-safe:animate-fade-up [animation-delay:200ms]">
              <p className="max-w-md text-base font-light leading-relaxed text-muted sm:text-lg">{t.heroIntro}</p>
              <a href="#village-connections" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-medium transition-colors hover:text-accent sm:mt-7">
                <span className="border-b border-current/30 pb-0.5">{t.discover}</span>
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
          <figure className="mt-10 sm:mt-14 lg:mt-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-[16/7]">
              <Image
                src="/images/home/symmetrical/coconut-grove.webp"
                alt={t.landscapeAlt}
                fill
                preload
                sizes="(min-width: 1440px) 2296px, (min-width: 1280px) calc(175vw - 224px), (min-width: 1024px) calc(175vw - 168px), (min-width: 640px) calc(175vw - 112px), calc(175vw - 70px)"
                className="origin-bottom scale-[1.75] object-cover object-bottom"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-muted sm:mt-5 sm:text-[11px]">
              <span>{t.landscapeCaption}</span>
              <span className="inline-flex items-center gap-3"><span aria-hidden className="h-px w-6 bg-accent/60" />{dict.contact.locationValue}</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section id="village-connections" aria-labelledby="community-people-title" className="scroll-mt-24 pb-16 pt-4 sm:pb-24 sm:pt-8 lg:pb-28">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <Eyebrow>{t.peopleLabel}</Eyebrow>
              <h2 id="community-people-title" className="mt-5 max-w-xl text-balance font-serif text-4xl font-normal leading-[1.15] sm:text-5xl">{t.peopleTitle}</h2>
            </div>
            <p className="max-w-xl text-base font-light leading-relaxed text-muted lg:col-span-5 lg:col-start-8">{t.intro}</p>
          </Reveal>
          <ul className="mt-9 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-5 lg:gap-8">
            {t.partners.map((partner, index) => (
              <li key={partner.title} className="min-w-0 border-t border-accent/40 bg-surface/40">
                <Reveal delay={index * 100} className="px-6 py-7 sm:px-7 sm:py-8 md:px-5 lg:p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">{partner.label}</p>
                  <h3 className="mt-5 font-serif text-3xl font-normal leading-tight">{partner.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-muted">{partner.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="community-purpose-title" className="border-y border-border bg-surface/30 py-16 sm:py-24 lg:py-28">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-6">
            <Eyebrow>{t.purposeLabel}</Eyebrow>
            <h2 id="community-purpose-title" className="mt-6 text-balance font-serif text-4xl font-normal leading-[1.2] sm:text-5xl lg:text-[3.25rem]">
              {t.purposeLead}
              <span className="mt-1 block italic text-accent">{t.purposeAccent}</span>
            </h2>
            <span aria-hidden className="mt-7 block h-px w-16 bg-accent/60 sm:mt-9" />
          </Reveal>
          <Reveal delay={150} className="min-w-0 lg:col-span-5 lg:col-start-8 lg:pt-1">
            <h3 className="font-serif text-2xl font-normal sm:text-3xl">{t.purposeTitle}</h3>
            <p className="mt-5 font-light leading-relaxed text-muted">{t.purposeText}</p>
            <p className="mt-4 font-light leading-relaxed text-muted">{t.futureText}</p>
            <TextLink href={localePath(locale, "/ethos")} className="mt-6 sm:mt-8">{t.ethosLink}</TextLink>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="community-next-title" className="py-16 sm:py-24 lg:py-28">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t.closingLabel}</Eyebrow>
            <h2 id="community-next-title" className="mt-6 text-balance font-serif text-4xl font-normal leading-[1.15] sm:text-5xl lg:text-6xl">{t.closingTitle}</h2>
            <p className="mx-auto mt-6 max-w-md font-light leading-relaxed text-muted">{t.closingText}</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:justify-center sm:gap-7">
              <a href={buildWhatsAppUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={`${buttonClass()} w-full px-7 py-3 sm:w-auto`}>{dict.contact.whatsapp}</a>
              <TextLink href={localePath(locale, "/products")} className="min-h-11 sm:min-h-11">{dict.home.ctaProducts}</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}
