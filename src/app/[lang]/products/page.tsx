import { ComingSoonPage, comingSoonMetadata } from "@/lib/coming-soon";

// Placeholder while the home page concepts are being compared.
export const generateMetadata = () => comingSoonMetadata("products");

export default function ProductsPage() {
  return <ComingSoonPage page="products" />;
}
