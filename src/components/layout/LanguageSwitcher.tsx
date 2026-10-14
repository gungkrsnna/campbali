"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/lib/paths";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium uppercase hover:border-primary hover:text-primary"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        {locale}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 min-w-44 overflow-hidden rounded-xl border border-border bg-surface py-1 text-sm shadow-lg">
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={switchLocalePath(pathname, l)}
                hrefLang={l}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-4 px-4 py-2 hover:bg-primary/5 ${
                  l === locale ? "font-semibold text-primary" : "text-foreground/80"
                }`}
              >
                <span>
                  {localeLabels[l]}
                  <span className="ml-2 text-xs uppercase text-muted">{l}</span>
                </span>
                {l === locale && <span aria-hidden>✓</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
