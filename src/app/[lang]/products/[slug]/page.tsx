import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "@/i18n/get-dictionary";
import { getProduct, products } from "@/content/products";
import { ComingSoonPage } from "@/lib/coming-soon";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const locale = await getLocale();
  return { title: product.name[locale], robots: { index: false } };
}

// Placeholder while the home page concepts are being compared.
export default async function ProductPage({
  params,
}: PageProps<"/[lang]/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const locale = await getLocale();
  return <ComingSoonPage page="products" label={product.name[locale]} />;
}
