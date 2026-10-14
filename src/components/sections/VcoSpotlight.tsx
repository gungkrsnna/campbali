import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { ProductImage } from "./ProductImage";

// Home: the signature product gets its own stage — large image beside its
// story, with sizes that can be added to the list right here.
export function VcoSpotlight({
  product,
  label,
  detailsLabel,
  locale,
  t,
}: {
  product: Product;
  label: string;
  detailsLabel: string;
  locale: Locale;
  t: Dictionary["products"];
}) {
  const href = localePath(locale, `/products/${product.slug}`);

  // No top padding: the values section above already ends with its own.
  return (
    <section className="pb-20 sm:pb-28 lg:pb-36">
      <Container className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-6">
          <Link
            href={href}
            className="group/card relative block aspect-[4/5] overflow-hidden rounded-sm"
          >
            <ProductImage product={product} locale={locale} sizes="(min-width: 768px) 50vw, 100vw" />
          </Link>
        </Reveal>

        <Reveal delay={150} className="md:col-span-5 md:col-start-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">{label}</p>
          <h2 className="mt-5 font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-primary sm:text-6xl lg:text-7xl">
            {product.name[locale]}
          </h2>
          <span aria-hidden className="mt-8 block h-px w-16 bg-accent" />
          <p className="mt-8 max-w-md leading-relaxed text-muted">
            {product.description[locale]}
          </p>
          <div className="mt-10">
            <AddToListButton
              variants={product.variants}
              labels={{ addToList: t.addToList, inList: t.inList, size: t.size }}
            />
          </div>
          <TextLink href={href} className="mt-8">
            {detailsLabel}
          </TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
