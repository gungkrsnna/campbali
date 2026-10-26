import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { products } from "@/content/products";
import { localePath } from "@/lib/paths";
import { Eyebrow } from "@/components/concept-luxe/Bleed";
import { ProductCatalogue } from "@/components/products/ProductCatalogue";
import { ProductOrdering } from "@/components/products/ProductOrdering";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.products.title,
    description: dict.products.description,
    alternates: {
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale, "/products")])),
    },
  };
}

export default async function ProductsPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.products;

  return (
    <PageTransition>
      <section aria-labelledby="products-title">
        <Container className="pb-12 pt-12 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
          <Eyebrow className="motion-safe:animate-fade-up">{t.title}</Eyebrow>
          <div className="mt-7 grid gap-7 md:grid-cols-12 md:items-end md:gap-10">
            <h1 id="products-title" className="text-balance font-serif text-[clamp(2.5rem,10vw,4rem)] font-normal leading-[1.08] md:col-span-7 lg:text-7xl xl:text-8xl motion-safe:animate-fade-up [animation-delay:100ms]">
              {t.heroLead}<span className="mt-1 block italic text-accent">{t.heroAccent}</span>
            </h1>
            <div className="min-w-0 md:col-span-5 md:pb-1 motion-safe:animate-fade-up [animation-delay:200ms]">
              <p className="max-w-md text-base font-light leading-relaxed text-muted sm:text-lg">{t.heroIntro}</p>
              <TextLink href={localePath(locale, "/inquiry")} className="mt-5 sm:mt-7">{dict.nav.inquiry}</TextLink>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="catalogue-title" className="pb-16 sm:pb-24 lg:pb-28">
        <Container>
          <h2 id="catalogue-title" className="sr-only">{t.catalogue}</h2>
          <ProductCatalogue products={products} locale={locale} labels={t} />
        </Container>
      </section>
      <ProductOrdering locale={locale} dict={dict} />
    </PageTransition>
  );
}
