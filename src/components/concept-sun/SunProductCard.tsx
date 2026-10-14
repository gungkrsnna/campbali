import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Product } from "@/content/products";
import { localePath } from "@/lib/paths";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { ProductImage } from "@/components/sections/ProductImage";

// Concept B product card: soft rounded card, arched image (or a warm
// placeholder), size pills and a quiet add-to-list action.
export function SunProductCard({
  product,
  locale,
  t,
}: {
  product: Product;
  locale: Locale;
  t: Dictionary["products"];
}) {
  const href = localePath(locale, `/products/${product.slug}`);

  return (
    <article className="group/card flex h-full flex-col rounded-[2rem] bg-surface p-4 sm:p-5">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden rounded-t-full bg-sun/30">
        {product.image ? (
          <ProductImage product={product} locale={locale} sizes="(min-width: 768px) 25vw, 50vw" />
        ) : (
          // Warm placeholder: the product's initial in big serif.
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center font-serif text-7xl font-medium text-primary/25 transition-transform duration-700 group-hover/card:scale-110"
          >
            {product.name[locale].replace(/^(Virgin|Minyak)\s+/, "").charAt(0)}
          </span>
        )}
      </Link>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {product.variants.map((v) => (
          <span key={v.code} className="rounded-full bg-background px-2.5 py-0.5 text-xs font-semibold text-muted">
            {v.size}
          </span>
        ))}
      </div>
      <h3 className="mt-3 font-serif text-xl font-medium leading-tight text-primary sm:text-2xl">
        <Link href={href} className="transition-colors hover:text-clay">
          {product.name[locale]}
        </Link>
      </h3>
      <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-muted sm:block">
        {product.summary[locale]}
      </p>
      <div className="mt-auto pt-4">
        <AddToListButton
          variants={product.variants}
          variant="text"
          labels={{ addToList: t.addToList, inList: t.inList, size: t.size }}
        />
      </div>
    </article>
  );
}
