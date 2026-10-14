import { ComingSoonPage, comingSoonMetadata } from "@/lib/coming-soon";

// Placeholder while the home page concepts are being compared.
export const generateMetadata = () => comingSoonMetadata("story");

export default function OurStoryPage() {
  return <ComingSoonPage page="story" />;
}
