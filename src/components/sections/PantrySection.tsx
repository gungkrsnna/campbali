import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "./ProductCard";

// Home: the pantry products — only a couple, so they sit side by side, large.
export function PantrySection({
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
    <section className="py-20 sm:py-28 lg:py-36">
      <Container>
        <SectionHeader title={title} intro={intro} link={link} />

        <ul className="mt-12 grid gap-14 sm:mt-20 md:grid-cols-2 md:gap-8 lg:gap-12">
          {products.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 150} className="h-full">
                <ProductCard product={p} locale={locale} t={t} aspect="aspect-[4/3]" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
