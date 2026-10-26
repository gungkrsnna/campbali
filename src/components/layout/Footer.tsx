import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { hasWhatsApp, navItems, site } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/inquiry";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";

const heading = "text-[11px] font-medium uppercase tracking-[0.3em] text-primary-foreground/50";
const link = "text-primary-foreground/80 transition-colors hover:text-primary-foreground";

// Four columns: brand · explore · contact · follow & language.
// Stacks to two columns on tablet and one on mobile.
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.footer;

  return (
    <footer className="mt-auto border-t border-primary-foreground/10 bg-primary text-primary-foreground">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="flex items-center gap-3 font-serif text-3xl font-medium">
            <LogoMark className="h-10 w-10 shrink-0" />
            {site.name}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            {t.tagline}
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-primary-foreground/50">
            {t.motto}
          </p>
        </div>

        <nav className="lg:col-span-2 lg:col-start-6">
          <h2 className={heading}>{t.explore}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={localePath(locale, item.href)} className={link}>
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={heading}>{t.contactTitle}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {hasWhatsApp && (
              <li>
                <a
                  href={buildWhatsAppUrl(dict.home.faqMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  {t.whatsapp}
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className={link}>
                  {site.email}
                </a>
              </li>
            )}
            <li className="text-primary-foreground/80">{site.location}</li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className={heading}>{t.follow}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                {t.instagram}
              </a>
            </li>
          </ul>
          <h2 className={`${heading} mt-8`}>{dict.nav.language}</h2>
          <ul className="mt-5 flex gap-4 text-sm">
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={localePath(l)}
                  hrefLang={l}
                  title={localeLabels[l]}
                  aria-current={l === locale ? "true" : undefined}
                  className={`uppercase ${l === locale ? "text-primary-foreground" : "text-primary-foreground/50 hover:text-primary-foreground"}`}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="border-t border-primary-foreground/15 py-6 text-xs text-primary-foreground/60">
        © {site.name}. {t.rights}
      </Container>
    </footer>
  );
}
