import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { localePath } from "@/lib/paths";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { ProductImage } from "./ProductImage";

// Borderless editorial card: tall image, small category caps, serif name,
// one-line summary, quiet "add to list" text action.
export function ProductCard({
  product,
  locale,
  t,
  aspect = "aspect-[4/5]",
}: {
  product: Product;
  locale: Locale;
  t: Dictionary["products"];
  /** Tailwind aspect class for the image, e.g. "aspect-[4/3]" for wide layouts. */
  aspect?: string;
}) {
  const href = localePath(locale, `/products/${product.slug}`);

  return (
    <article className="group/card flex h-full flex-col">
      <Link href={href} className={`relative block ${aspect} overflow-hidden rounded-sm`}>
        <ProductImage product={product} locale={locale} sizes="(min-width: 768px) 33vw, 80vw" />
      </Link>

      <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-muted">
        {t.categories[product.category]}
        <span className="mx-2 text-border">/</span>
        {product.variants.map((v) => v.size).join(" · ")}
      </p>
      <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-primary sm:text-[1.75rem]">
        <Link href={href} className="transition-colors hover:text-accent">
          {product.name[locale]}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.summary[locale]}</p>
      <div className="mt-5">
        <AddToListButton
          variants={product.variants}
          variant="text"
          labels={{ addToList: t.addToList, inList: t.inList, size: t.size }}
        />
      </div>
    </article>
  );
}
