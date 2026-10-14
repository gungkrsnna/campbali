import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Fraunces, Inter, Jost, Manrope, Nunito, Syne } from "next/font/google";
import { defaultLocale, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingListButton } from "@/components/inquiry/FloatingListButton";
import { conceptBootScript } from "@/components/concepts/concept-boot";
import "../globals.css";

// Headings: elegant serif. Body & UI: warm, highly legible sans.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

// Concept B ("Sun & Earth"): warm soft serif + rounded sans. Not preloaded —
// only the /concept-b page uses them.
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], preload: false });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], preload: false });

// Concept C ("Deep Green Luxe"): high-contrast didone + thin geometric sans.
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], style: ["normal", "italic"], preload: false });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], preload: false });

// Concept D ("Motion"): expressive display sans + neutral UI sans.
const syne = Syne({ variable: "--font-syne", subsets: ["latin"], preload: false });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], preload: false });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: { default: dict.meta.title, template: "%s | Camp Bali" },
    description: dict.meta.description,
    icons: { icon: "/icon.svg" },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l)])),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html
      lang={locale}
      // The concept boot script may set data-concept before hydration.
      suppressHydrationWarning
      className={`${manrope.variable} ${cormorant.variable} ${fraunces.variable} ${nunito.variable} ${bodoni.variable} ${jost.variable} ${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: conceptBootScript(locales.filter((l) => l !== defaultLocale)),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Header locale={locale} labels={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <FloatingListButton locale={locale} label={dict.nav.inquiry} />
      </body>
    </html>
  );
}
