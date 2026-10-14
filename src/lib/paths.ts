import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";

/**
 * Public URL for an app path in a locale. The default locale has no prefix:
 * ("en", "/products") → "/products", ("id", "/products") → "/id/products",
 * ("en") → "/", ("id") → "/id".
 */
export const localePath = (locale: Locale, path = "") =>
  locale === defaultLocale ? path || "/" : `/${locale}${path}`;

/** The same page in another locale: "/products" ↔ "/id/products". */
export function switchLocalePath(pathname: string, locale: Locale) {
  const first = pathname.split("/")[1] ?? "";
  const rest = hasLocale(first) ? pathname.slice(first.length + 1) : pathname;
  return localePath(locale, rest === "/" ? "" : rest);
}
