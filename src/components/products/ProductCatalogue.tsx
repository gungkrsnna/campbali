"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, type Product, type ProductCategory } from "@/content/products";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";
import { AddToListButton } from "@/components/inquiry/AddToListButton";
import { ProductImage } from "@/components/sections/ProductImage";

export function ProductCatalogue({
  products,
  locale,
  labels,
}: {
  products: Product[];
  locale: Locale;
  labels: Dictionary["products"];
}) {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const count = products.filter((product) => category === "all" || product.category === category).length;

  return (
    <>
      <div className="border-y border-border py-5 sm:py-6">
        <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2 sm:gap-3">
          {(["all", ...categories] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={category === value}
              aria-controls="product-grid"
              onClick={() => setCategory(value)}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-sm transition-colors sm:px-5 ${
                category === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted hover:border-accent/60 hover:text-foreground"
              }`}
            >
              {value === "all" ? labels.all : labels.categories[value]}
            </button>
          ))}
        </div>
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="mb-7 mt-5 text-sm text-muted sm:mb-9 sm:mt-6">
        {count} {count === 1 ? labels.productSingular : labels.productPlural}
      </p>

      <ul id="product-grid" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8">
        {products.map((product, index) => {
          const href = localePath(locale, `/products/${product.slug}`);

          return (
            <li
              key={product.slug}
              hidden={category !== "all" && product.category !== category}
              className="group/card flex min-w-0 flex-col"
            >
              <Link href={href} aria-label={`${labels.viewProduct}: ${product.name[locale]}`} className="relative block aspect-square overflow-hidden bg-surface sm:aspect-[4/5]">
                <ProductImage
                  product={product}
                  locale={locale}
                  sizes="(min-width: 1440px) 395px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  priority={index === 0}
                />
                <span aria-hidden className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-foreground/25 bg-background/80 text-lg text-foreground backdrop-blur-sm transition-colors group-hover/card:bg-background">
                  ↗
                </span>
              </Link>
              <div className="flex flex-1 flex-col pt-5 sm:pt-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{labels.categories[product.category]}</p>
                <h3 className="mt-3 font-serif text-2xl font-normal leading-tight sm:text-[1.7rem]">
                  <Link href={href} className="transition-colors hover:text-accent">{product.name[locale]}</Link>
                </h3>
                <p className="mb-6 mt-3 text-sm font-light leading-relaxed text-muted">{product.summary[locale]}</p>
                <div className="mt-auto border-t border-border pt-5">
                  {product.variants.length === 1 && (
                    <p className="mb-3 text-sm text-muted">{labels.size} <span className="ml-2 text-foreground">{product.variants[0].size}</span></p>
                  )}
                  <AddToListButton variants={product.variants} labels={labels} variant="text" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
