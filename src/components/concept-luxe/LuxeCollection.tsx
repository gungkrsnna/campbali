import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { ProductImage } from "@/components/sections/ProductImage";
import { Eyebrow } from "./Bleed";

// Concept C product group: gallery-like — tall frameless photos, small caps
// sizes, serif names, a quiet add-to-list. Two-product groups go wider.
export function LuxeCollection({
  eyebrow,
  title,
  intro,
  link,
  products,
  locale,
  t,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  link: { href: string; label: string };
  products: Product[];
  locale: Locale;
  t: Dictionary["products"];
}) {
  const wide = products.length <= 2;

  return (
    <section className="py-16 sm:py-32">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-5 sm:gap-8">
          <div className="min-w-0">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.1] sm:mt-6 sm:text-6xl">{title}</h2>
            <p className="mt-5 max-w-md font-light leading-relaxed text-muted sm:mt-6">{intro}</p>
          </div>
          <TextLink href={link.href}>{link.label}</TextLink>
        </Reveal>

        <ul className={`mt-8 grid grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 sm:mt-20 sm:gap-x-8 sm:gap-y-12 ${wide ? "md:grid-cols-2" : "md:grid-cols-4"}`}>
          {products.map((p, i) => {
            const href = localePath(locale, `/products/${p.slug}`);
            return (
              <li key={p.slug} className="min-w-0">
                <Reveal delay={i * 100} className="group/card flex h-full flex-col">
                  <Link href={href} className={`relative block overflow-hidden ${wide ? "aspect-[4/3] min-[360px]:aspect-[3/4] md:aspect-[4/3]" : "aspect-[4/3] min-[360px]:aspect-[3/4]"}`}>
                    <ProductImage product={p} locale={locale} tone="dark" sizes={wide ? "(min-width: 768px) 50vw, (min-width: 360px) 50vw, 100vw" : "(min-width: 768px) 25vw, (min-width: 360px) 50vw, 100vw"} />
                  </Link>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.15em] text-muted sm:mt-6 sm:tracking-[0.25em]">
                    {p.variants.map((v) => v.size).join(" · ")}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-normal leading-tight sm:mt-3 sm:text-2xl">
                    <Link href={href} className="transition-colors hover:text-accent">
                      {p.name[locale]}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-muted">
                    {p.summary[locale]}
                  </p>
                  <div className="mt-auto pt-3 sm:pt-5">
                    <AddToListButton
                      variants={p.variants}
                      variant="text"
                      labels={{ addToList: t.addToList, inList: t.inList, size: t.size }}
                    />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
