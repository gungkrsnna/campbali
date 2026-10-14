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
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-normal leading-[1.05] sm:text-6xl">{title}</h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-muted">{intro}</p>
          </div>
          <TextLink href={link.href}>{link.label}</TextLink>
        </Reveal>

        <ul className={`mt-14 grid gap-x-4 gap-y-12 sm:mt-20 sm:gap-x-8 ${wide ? "md:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}>
          {products.map((p, i) => {
            const href = localePath(locale, `/products/${p.slug}`);
            return (
              <li key={p.slug}>
                <Reveal delay={i * 100} className="group/card flex h-full flex-col">
                  <Link href={href} className={`relative block overflow-hidden ${wide ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
                    <ProductImage product={p} locale={locale} tone="dark" sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} />
                  </Link>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted">
                    {p.variants.map((v) => v.size).join(" · ")}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-normal leading-tight sm:text-2xl">
                    <Link href={href} className="transition-colors hover:text-accent">
                      {p.name[locale]}
                    </Link>
                  </h3>
                  <p className="mt-2 hidden flex-1 text-sm font-light leading-relaxed text-muted sm:block">
                    {p.summary[locale]}
                  </p>
                  <div className="mt-auto pt-5">
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
