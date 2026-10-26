import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/lib/paths";
import { Header } from "@/components/layout/Header";
import { NavigationEffects } from "@/components/layout/NavigationEffects";
import { Footer } from "@/components/layout/Footer";
import { FloatingListButton } from "@/components/inquiry/FloatingListButton";
import "../globals.css";

// Deep Green Luxe: high-contrast serif headings and geometric sans body text.
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], style: ["normal", "italic"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });

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
      className={`${bodoni.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <NavigationEffects />
        <Header locale={locale} labels={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <FloatingListButton locale={locale} label={dict.nav.inquiry} />
      </body>
    </html>
  );
}
