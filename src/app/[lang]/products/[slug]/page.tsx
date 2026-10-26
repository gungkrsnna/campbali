import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getProduct, products } from "@/content/products";
import { localePath } from "@/lib/paths";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { ProductOrdering } from "@/components/products/ProductOrdering";
import { ProductImage } from "@/components/sections/ProductImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const locale = await getLocale();
  return {
    title: product.name[locale],
    description: product.summary[locale],
    alternates: {
      languages: Object.fromEntries(locales.map((language) => [language, localePath(language, `/products/${slug}`)])),
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.products;
  const related = products.filter((item) => item.slug !== slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);

  return (
    <PageTransition>
      <section aria-labelledby="product-title">
        <Container className="pb-16 pt-6 sm:pb-24 sm:pt-10 lg:pb-28">
          <Link href={localePath(locale, "/products")} className="mb-6 inline-flex min-h-11 items-center gap-3 text-sm text-muted transition-colors hover:text-foreground sm:mb-8">
            <span aria-hidden>←</span>{t.back}
          </Link>
          <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10 lg:items-center lg:gap-16">
            <div className="relative aspect-square overflow-hidden bg-surface md:aspect-[4/5]">
              {product.image && <Image src={product.image} alt={product.name[locale]} fill preload sizes="(min-width: 1440px) 608px, (min-width: 768px) 46vw, 100vw" className="object-cover" />}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent">{t.categories[product.category]}</p>
              <h1 id="product-title" className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.12] sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">{product.name[locale]}</h1>
              <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-muted lg:text-lg">{product.description[locale]}</p>
              <div className="mt-7 border-t border-border pt-6 sm:mt-9 sm:pt-8">
                {product.variants.length === 1 && (
                  <p className="mb-6 text-sm text-muted">{t.availableSizes} <span className="ml-3 text-foreground">{product.variants[0].size}</span></p>
                )}
                <AddToListButton variants={product.variants} labels={t} />
                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted">{t.inquiryNote}</p>
                <TextLink href={localePath(locale, "/inquiry")} className="mt-5">{dict.nav.inquiry}</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="related-products-title" className="border-t border-border py-16 sm:py-24">
        <Container>
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-8">
            <h2 id="related-products-title" className="text-balance font-serif text-4xl font-normal leading-[1.15] sm:text-5xl">{t.relatedTitle}</h2>
            <TextLink href={localePath(locale, "/products")} className="shrink-0">{dict.inquiry.browse}</TextLink>
          </Reveal>
          <ul className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:gap-8">
            {related.map((item, index) => (
              <li key={item.slug} className="group/card min-w-0">
                <Reveal delay={index * 100}>
                  <Link href={localePath(locale, `/products/${item.slug}`)} className="block">
                    <div className="relative aspect-square overflow-hidden bg-surface sm:aspect-[4/5]">
                      <ProductImage product={item} locale={locale} sizes="(min-width: 1440px) 395px, (min-width: 640px) 30vw, 100vw" />
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-normal leading-tight transition-colors group-hover/card:text-accent">{item.name[locale]}</h3>
                    <p className="mt-2 text-sm text-muted">{item.variants.map((variant) => variant.size).join(" / ")}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ProductOrdering locale={locale} dict={dict} />
    </PageTransition>
  );
}
