import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { ProductImage } from "./ProductImage";

// Home: the cold-pressed oils on a full-width brand-green band — a colour
// break in the cream page. Four products side by side (two per row on mobile).
export function OilsCollection({
  title,
  intro,
  link,
  products,
  locale,
  t,
}: {
  title: string;
  intro: string;
  link: { href: string; label: string };
  products: Product[];
  locale: Locale;
  t: Dictionary["products"];
}) {
  return (
    <section className="bg-primary py-20 text-primary-foreground sm:py-28 lg:py-36">
      <Container>
        <SectionHeader title={title} intro={intro} link={link} tone="dark" />

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:mt-20 sm:gap-x-6 md:grid-cols-4 lg:gap-x-10">
          {products.map((p, i) => {
            const href = localePath(locale, `/products/${p.slug}`);
            return (
              <li key={p.slug}>
                <Reveal delay={i * 120} className="group/card flex h-full flex-col">
                  <Link href={href} className="relative block aspect-[3/4] overflow-hidden rounded-sm">
                    <ProductImage
                      product={p}
                      locale={locale}
                      sizes="(min-width: 768px) 25vw, 50vw"
                      tone="dark"
                    />
                  </Link>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground/60">
                    {p.variants.map((v) => v.size).join(" · ")}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-medium leading-tight sm:text-2xl">
                    <Link href={href} className="transition-opacity hover:opacity-70">
                      {p.name[locale]}
                    </Link>
                  </h3>
                  <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-primary-foreground/70 sm:block">
                    {p.summary[locale]}
                  </p>
                  {/* mt-auto: keeps actions aligned across a row when names wrap. */}
                  <div className="mt-auto pt-4 sm:pt-5">
                    <AddToListButton
                      variants={p.variants}
                      variant="text"
                      tone="dark"
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
