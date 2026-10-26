import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import Link from "next/link";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { hasWhatsApp, site } from "@/content/site";
import { localePath } from "@/lib/paths";
import { Eyebrow } from "@/components/concept-luxe/Bleed";
import { ContactForm } from "@/components/contact/ContactForm";
import { Accordion } from "@/components/ui/Accordion";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.contact.title,
    description: dict.contact.description,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale, "/contact")])),
    },
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.contact;
  const whatsappNumber = hasWhatsApp ? site.whatsappNumber : null;
  const email = site.email && !site.email.endsWith(".example") ? site.email : null;

  return (
    <PageTransition>
      <section aria-labelledby="contact-title">
        <Container className="pb-16 pt-12 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
          <div className="grid gap-10 md:gap-14 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 lg:col-span-6">
              <Eyebrow className="motion-safe:animate-fade-up">{t.title}</Eyebrow>
              <h1 id="contact-title" className="mt-7 text-balance font-serif text-[clamp(2.5rem,10vw,4rem)] font-normal leading-[1.08] lg:text-6xl xl:text-7xl motion-safe:animate-fade-up [animation-delay:100ms]">
                {t.heroLead}<span className="mt-1 block italic text-accent">{t.heroAccent}</span>
              </h1>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted sm:mt-8 sm:text-lg motion-safe:animate-fade-up [animation-delay:200ms]">{t.intro}</p>

              <div className="mt-9 max-w-md border-t border-border pt-7 sm:mt-12 sm:pt-8">
                <h2 className="text-[11px] uppercase tracking-[0.25em] text-accent">{t.directLabel}</h2>
                <dl className="mt-5 divide-y divide-border">
                  {whatsappNumber && (
                    <div className="pb-5">
                      <dt className="text-xs text-muted">WhatsApp</dt>
                      <dd className="mt-2">
                        <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.quickMessage)}`} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-3 text-lg transition-colors hover:text-accent">
                          {t.whatsapp}<span aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                        </a>
                        <p className="mt-1 text-sm font-light leading-relaxed text-muted">{t.whatsappText}</p>
                      </dd>
                    </div>
                  )}
                  {email && (
                    <div className="py-5 first:pt-0">
                      <dt className="text-xs text-muted">{t.email}</dt>
                      <dd className="mt-2">
                        <a href={`mailto:${email}`} className="inline-flex min-h-11 max-w-full items-center break-all text-lg transition-colors hover:text-accent">{email}</a>
                        <p className="mt-1 text-sm font-light leading-relaxed text-muted">{t.emailText}</p>
                      </dd>
                    </div>
                  )}
                  <div className="pt-5 first:pt-0">
                    <dt className="text-xs text-muted">{t.location}</dt>
                    <dd className="mt-3">
                      <p className="font-serif text-2xl font-normal">{t.locationValue}</p>
                      <p className="mt-2 text-sm font-light leading-relaxed text-muted">{t.locationText}</p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-6">
              <ContactForm labels={t} whatsappNumber={whatsappNumber} />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="contact-order-title" className="border-y border-border bg-surface/30 py-12 sm:py-16">
        <Container className="grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-7">
            <Eyebrow>{t.orderLabel}</Eyebrow>
            <h2 id="contact-order-title" className="mt-5 text-balance font-serif text-3xl font-normal leading-tight sm:text-4xl">{t.orderTitle}</h2>
            <p className="mt-4 max-w-xl font-light leading-relaxed text-muted">{t.orderText}</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 lg:col-span-5 lg:justify-end">
            <Link href={localePath(locale, "/products")} className={`${buttonClass("outline")} w-full px-7 py-3 sm:w-auto`}>{dict.inquiry.browse}</Link>
            <TextLink href={localePath(locale, "/inquiry")} className="sm:min-h-11">{dict.nav.inquiry}</TextLink>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="contact-questions-title" className="py-16 sm:py-24 lg:py-28">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-5">
            <Eyebrow>{t.questionsLabel}</Eyebrow>
            <h2 id="contact-questions-title" className="mt-5 max-w-md text-balance font-serif text-4xl font-normal leading-[1.15] sm:text-5xl">{t.questionsTitle}</h2>
          </Reveal>
          <Reveal delay={100} className="min-w-0 lg:col-span-6 lg:col-start-7">
            <Accordion items={t.questions} />
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}
