// Shared locale config — safe to import from both Server and Client Components.
// To add a language: add its code here and create dictionaries/<code>.json.
export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
