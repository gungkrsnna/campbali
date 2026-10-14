import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/get-dictionary";
import { buildWhatsAppUrl } from "@/lib/inquiry";
import { localePath } from "@/lib/paths";
import { ComingSoon } from "@/components/sections/ComingSoon";

type NavKey = keyof Dictionary["nav"];

/** Metadata for a page that is not built yet: its title, kept out of search. */
export async function comingSoonMetadata(page: NavKey): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav[page], robots: { index: false } };
}

/** Renders the shared "coming soon" screen for a nav page (or a custom label). */
export async function ComingSoonPage({ page, label }: { page: NavKey; label?: string }) {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.comingSoon;

  return (
    <ComingSoon
      page={label ?? dict.nav[page]}
      title={t.title}
      text={t.text}
      home={{ href: localePath(locale), label: t.home }}
      whatsapp={{ href: buildWhatsAppUrl(t.message), label: t.whatsapp }}
    />
  );
}
