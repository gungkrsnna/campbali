import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { BleedImage, Eyebrow } from "./Bleed";

// Concept C signature product: the product photo bleeds off the left edge,
// the story and sizes sit on the darker surface at the right.
export function LuxeVco({
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
  return (
    <section className="relative bg-surface">
      <BleedImage src={product.image!} alt={product.name[locale]} side="left" position="50% 55%" />
      <Container className="md:grid md:min-h-[44rem] md:grid-cols-2 md:items-center">
        <Reveal className="min-w-0 py-12 sm:py-24 md:col-start-2 md:pl-12 lg:pl-20">
          <Eyebrow>{label}</Eyebrow>
          <h2 className="mt-6 text-balance font-serif text-4xl font-normal leading-[1.1] sm:mt-8 sm:text-6xl">
            {product.name[locale]}
          </h2>
          <p className="mt-6 max-w-md font-light leading-relaxed text-muted sm:mt-8">
            {product.description[locale]}
          </p>
          <div className="mt-8 sm:mt-10">
            <AddToListButton
              variants={product.variants}
              labels={{ addToList: t.addToList, inList: t.inList, size: t.size }}
            />
          </div>
          <TextLink href={localePath(locale, `/products/${product.slug}`)} className="mt-8">
            {detailsLabel}
          </TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
