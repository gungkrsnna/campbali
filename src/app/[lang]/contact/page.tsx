import { ComingSoonPage, comingSoonMetadata } from "@/lib/coming-soon";

// Placeholder while the home page concepts are being compared.
export const generateMetadata = () => comingSoonMetadata("contact");

export default function ContactPage() {
  return <ComingSoonPage page="contact" />;
}
