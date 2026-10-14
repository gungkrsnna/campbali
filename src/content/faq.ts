import type { Locale } from "@/i18n/config";

type Localized = Record<Locale, string>;

export type Faq = { question: Localized; answer: Localized };

// ⚠️ PLACEHOLDER answers — confirm minimums, delivery areas, payment methods
// and sample policy with the team before launch.
export const faqs: Faq[] = [
  {
    question: {
      en: "Is there a minimum order?",
      id: "Apakah ada minimal pemesanan?",
    },
    answer: {
      en: "No minimum for retail orders. For wholesale pricing, tell us the volumes you need and we will suggest the best sizes.",
      id: "Tidak ada minimal untuk pembelian eceran. Untuk harga grosir, beri tahu kami volume yang Anda butuhkan dan kami sarankan ukuran terbaik.",
    },
  },
  {
    question: {
      en: "Where do you deliver?",
      id: "Pengiriman ke mana saja?",
    },
    answer: {
      en: "We deliver across Bali and ship throughout Indonesia. For international orders, message us and we will check the options.",
      id: "Kami mengantar ke seluruh Bali dan mengirim ke seluruh Indonesia. Untuk pesanan luar negeri, hubungi kami dan kami cek pilihannya.",
    },
  },
  {
    question: {
      en: "How do I pay?",
      id: "Bagaimana cara membayar?",
    },
    answer: {
      en: "Once we confirm your list on WhatsApp, we send the total and payment details — usually bank transfer.",
      id: "Setelah daftar Anda kami konfirmasi lewat WhatsApp, kami kirimkan total dan detail pembayaran — biasanya transfer bank.",
    },
  },
  {
    question: {
      en: "Why are prices not shown on the website?",
      id: "Mengapa harga tidak ditampilkan di website?",
    },
    answer: {
      en: "Prices depend on size and volume, and wholesale partners receive different rates. We reply with an exact quote for your list.",
      id: "Harga bergantung pada ukuran dan volume, dan mitra grosir mendapat harga berbeda. Kami membalas dengan penawaran pasti untuk daftar Anda.",
    },
  },
  {
    question: {
      en: "How should I store Virgin Coconut Oil?",
      id: "Bagaimana cara menyimpan Virgin Coconut Oil?",
    },
    answer: {
      en: "Keep it closed, away from direct sunlight. Below about 24°C it turns solid and white — that is natural; it melts again in the warmth.",
      id: "Simpan tertutup dan jauh dari sinar matahari langsung. Di bawah sekitar 24°C minyak akan membeku dan memutih — itu alami; akan mencair lagi saat hangat.",
    },
  },
  {
    question: {
      en: "Can hotels and spas get samples?",
      id: "Bisakah hotel dan spa mendapatkan sampel?",
    },
    answer: {
      en: "Yes — for businesses considering regular supply, ask us about a sample on WhatsApp.",
      id: "Bisa — untuk bisnis yang mempertimbangkan pasokan rutin, tanyakan sampel kepada kami lewat WhatsApp.",
    },
  },
];
