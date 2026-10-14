export const site = {
  name: "Camp Bali",
  /** International format, digits only (e.g. 6281234567890). Set in .env.local. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  email: "hello@campbali.example", // PLACEHOLDER
  location: "Bali, Indonesia",
  instagram: "https://instagram.com/", // PLACEHOLDER — the brand account
};

export const navItems = [
  { href: "", key: "home" },
  { href: "/our-story", key: "story" },
  { href: "/ethos", key: "ethos" },
  { href: "/products", key: "products" },
  { href: "/community", key: "community" },
  { href: "/contact", key: "contact" },
] as const;
