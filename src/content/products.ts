import type { Locale } from "@/i18n/config";

export type ProductCategory = "vco" | "oils" | "foods";

type Localized = Record<Locale, string>;

/** One orderable size. `code` is the SKU from the price list. */
export type Variant = { code: string; size: string };

export type Product = {
  slug: string;
  category: ProductCategory;
  name: Localized;
  summary: Localized;
  description: Localized;
  /** Ordered smallest → largest. */
  variants: Variant[];
  /** Path under /public, e.g. "/images/products/vco.jpg". */
  image?: string;
};

export const categories: ProductCategory[] = ["vco", "oils", "foods"];

// Source: docs/2026 Price List.xlsx (prices intentionally not published).
export const products: Product[] = [
  {
    slug: "virgin-coconut-oil",
    category: "vco",
    name: { en: "Virgin Coconut Oil", id: "Virgin Coconut Oil" },
    summary: {
      en: "Cold-pressed, non-RBD virgin coconut oil — the product that started Camp Bali.",
      id: "Virgin coconut oil cold-pressed tanpa proses RBD — produk yang mengawali Camp Bali.",
    },
    description: {
      en: "Bali's first Virgin Coconut Oil. Cold-pressed from fresh coconuts and never refined, bleached or deodorised (non-RBD), so it keeps its natural aroma. Available from a 100 ml bottle up to a 20-litre container for kitchens, spas and resellers.",
      id: "Virgin Coconut Oil pertama di Bali. Diperas dingin dari kelapa segar tanpa dimurnikan, diputihkan, atau dihilangkan aromanya (non-RBD), sehingga aroma alaminya tetap terjaga. Tersedia dari botol 100 ml hingga jeriken 20 liter untuk dapur, spa, dan reseller.",
    },
    variants: [
      { code: "VCOS", size: "100 ml" },
      { code: "VCOM", size: "300 ml" },
      { code: "VCOL", size: "1 L" },
      { code: "VCO XL", size: "20 L" },
    ],
    image: "/images/home/coconut-oil-elegant-still-life.webp",
  },
  {
    slug: "kukui-nut-oil",
    category: "oils",
    name: { en: "Virgin Kukui (Kemiri) Nut Oil", id: "Minyak Kemiri (Kukui) Virgin" },
    summary: {
      en: "Cold-pressed oil from kemiri, the candlenut of Indonesian kitchens.",
      id: "Minyak kemiri cold-pressed, dari kemiri yang akrab di dapur Indonesia.",
    },
    description: {
      en: "A cold-pressed, non-RBD oil made from kemiri (kukui nut / candlenut), a traditional Indonesian ingredient.",
      id: "Minyak cold-pressed non-RBD dari kemiri (kukui nut), bahan tradisional khas Indonesia.",
    },
    variants: [{ code: "VKNO", size: "1 L" }],
    image: "/images/products/kukui-nut-oil.webp",
  },
  {
    slug: "sesame-oil",
    category: "oils",
    name: { en: "Virgin Sesame Oil", id: "Minyak Wijen Virgin" },
    summary: {
      en: "Cold-pressed sesame oil with a rich, nutty character.",
      id: "Minyak wijen cold-pressed dengan karakter gurih yang kaya.",
    },
    description: {
      en: "A cold-pressed, non-RBD virgin sesame oil with a rich, nutty character.",
      id: "Minyak wijen virgin cold-pressed non-RBD dengan karakter gurih yang kaya.",
    },
    variants: [{ code: "VSO", size: "1 L" }],
    image: "/images/products/sesame-oil.webp",
  },
  {
    slug: "flaxseed-oil",
    category: "oils",
    name: { en: "Flaxseed Oil", id: "Minyak Biji Rami (Flaxseed)" },
    summary: {
      en: "Cold-pressed oil from golden flaxseed.",
      id: "Minyak cold-pressed dari biji rami.",
    },
    description: {
      en: "A cold-pressed, non-RBD flaxseed oil.",
      id: "Minyak biji rami (flaxseed) cold-pressed non-RBD.",
    },
    variants: [{ code: "FLO", size: "1 L" }],
    image: "/images/products/flaxseed-oil.webp",
  },
  {
    slug: "sacha-inchi-oil",
    category: "oils",
    name: { en: "Sacha Inchi Oil", id: "Minyak Sacha Inchi" },
    summary: {
      en: "Cold-pressed oil from sacha inchi seeds.",
      id: "Minyak cold-pressed dari biji sacha inchi.",
    },
    description: {
      en: "A cold-pressed, non-RBD oil made from sacha inchi seeds.",
      id: "Minyak cold-pressed non-RBD dari biji sacha inchi.",
    },
    variants: [{ code: "SCO", size: "1 L" }],
    image: "/images/products/sacha-inchi-oil.webp",
  },
  {
    slug: "dried-coconut",
    category: "foods",
    name: { en: "Dried Coconut", id: "Kelapa Kering" },
    summary: {
      en: "Dried coconut for baking, cooking and snacking.",
      id: "Kelapa kering untuk kue, masakan, dan camilan.",
    },
    description: {
      en: "Dried coconut from Balinese coconuts — for baking, cooking and snacking.",
      id: "Kelapa kering dari kelapa Bali — untuk kue, masakan, dan camilan.",
    },
    variants: [{ code: "DCO", size: "1 kg" }],
    image: "/images/products/dried-coconut.webp",
  },
  {
    slug: "green-banana-flour",
    category: "foods",
    name: { en: "Green Banana Flour", id: "Tepung Pisang Hijau" },
    summary: {
      en: "Flour milled from green bananas — naturally gluten-free.",
      id: "Tepung dari pisang hijau — secara alami bebas gluten.",
    },
    description: {
      en: "Flour milled from green (unripe) bananas. A naturally gluten-free alternative for baking and cooking.",
      id: "Tepung dari pisang hijau (mentah). Alternatif alami bebas gluten untuk kue dan masakan.",
    },
    variants: [{ code: "GBF", size: "500 g" }],
    image: "/images/products/green-banana-flour.webp",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsIn = (category: ProductCategory) =>
  products.filter((p) => p.category === category);

/** Looks up a product and its variant by SKU code. */
export function findByCode(code: string) {
  for (const product of products) {
    const variant = product.variants.find((v) => v.code === code);
    if (variant) return { product, variant };
  }
  return undefined;
}
