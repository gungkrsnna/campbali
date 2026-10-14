import Image from "next/image";
import type { Product } from "@/content/products";
import type { Locale } from "@/i18n/config";

/**
 * Product photo that fills its (relatively positioned) parent, or an elegant
 * typographic placeholder until real photography arrives. Zooms gently when
 * an ancestor with `group/card` is hovered.
 */
export function ProductImage({
  product,
  locale,
  sizes,
  priority = false,
  tone = "light",
}: {
  product: Product;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  /** Placeholder colours; "dark" for the green brand background. */
  tone?: "light" | "dark";
}) {
  const name = product.name[locale];
  const zoom = "transition-transform duration-700 ease-out group-hover/card:scale-[1.04]";

  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={name}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${zoom}`}
      />
    );
  }

  return (
    <span
      className={`absolute inset-0 grid place-items-center p-6 text-center font-serif text-xl italic sm:text-2xl lg:text-3xl ${zoom} ${
        tone === "dark"
          ? "bg-gradient-to-br from-primary-foreground/15 to-primary-foreground/5 text-primary-foreground/40"
          : "bg-gradient-to-br from-primary/10 via-background to-accent/10 text-primary/30"
      }`}
    >
      {name}
    </span>
  );
}
