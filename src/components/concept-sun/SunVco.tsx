import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { Arch } from "./Arch";

// Concept B signature product: a large rounded golden panel holding an arched
// photo and the product story, with sizes to add right here.
export function SunVco({
  product,
  label,
  detailsLabel,
  image,
  locale,
  t,
}: {
  product: Product;
  label: string;
  detailsLabel: string;
  image: { src: string; alt: string };
  locale: Locale;
  t: Dictionary["products"];
}) {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal className="grid items-center gap-10 rounded-[2.5rem] bg-sun/25 p-6 sm:p-10 md:grid-cols-12 md:gap-8 lg:p-16">
          <div className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none">
            <Arch
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 768px) 40vw, 90vw"
              position="50% 50%"
              className="border-[10px] border-surface"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">{label}</p>
            <h2 className="mt-5 font-serif text-[2.5rem] font-normal leading-[1] text-primary sm:text-5xl lg:text-6xl">
              {product.name[locale]}
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-foreground/80">
              {product.description[locale]}
            </p>
            <div className="mt-10">
              <AddToListButton
                variants={product.variants}
                labels={{ addToList: t.addToList, inList: t.inList, size: t.size }}
              />
            </div>
            <TextLink href={localePath(locale, `/products/${product.slug}`)} className="mt-8">
              {detailsLabel}
            </TextLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
