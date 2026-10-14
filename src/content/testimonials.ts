import type { Locale } from "@/i18n/config";

type Localized = Record<Locale, string>;

export type Testimonial = { quote: Localized; name: string; role: Localized };

// ⚠️ PLACEHOLDER — invented examples to show the layout.
// Replace with real quotes (with permission) before the site goes live;
// publishing made-up testimonials as genuine would mislead customers.
export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "Our therapists noticed the difference straight away — light, clean and gentle on the skin. It has become our house oil.",
      id: "Terapis kami langsung merasakan bedanya — ringan, bersih, dan lembut di kulit. Kini menjadi minyak andalan spa kami.",
    },
    name: "Spa owner",
    role: { en: "Ubud · placeholder", id: "Ubud · contoh" },
  },
  {
    quote: {
      en: "We order the 20-litre containers for our kitchen. Consistent quality, and we always get a real person on WhatsApp.",
      id: "Kami memesan jeriken 20 liter untuk dapur. Kualitasnya konsisten, dan selalu dibalas orang sungguhan di WhatsApp.",
    },
    name: "Café manager",
    role: { en: "Canggu · placeholder", id: "Canggu · contoh" },
  },
  {
    quote: {
      en: "I love knowing the coconuts come from Balinese villages. It is the only coconut oil we use at home now.",
      id: "Saya senang tahu kelapanya berasal dari desa-desa di Bali. Sekarang hanya ini minyak kelapa yang kami pakai di rumah.",
    },
    name: "Home customer",
    role: { en: "Denpasar · placeholder", id: "Denpasar · contoh" },
  },
];
