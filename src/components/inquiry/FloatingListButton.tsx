"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { useInquiryList } from "@/lib/inquiry-store";
import { localePath } from "@/lib/paths";

/**
 * The way into the inquiry list: a pill pinned bottom-right that slides in
 * once the list has items. Hidden on the list page itself.
 */
export function FloatingListButton({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const count = useInquiryList().reduce((sum, i) => sum + i.qty, 0);
  const href = localePath(locale, "/inquiry");
  const visible = count > 0 && pathname !== href;

  return (
    <Link
      href={href}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-5 right-5 z-30 inline-flex items-center gap-3 rounded-full bg-primary py-3 pl-5 pr-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-[opacity,translate] duration-500 ease-out hover:opacity-95 sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
      {label}
      <span className="grid h-6 min-w-6 place-items-center rounded-full bg-accent px-1.5 text-xs">
        {count}
      </span>
    </Link>
  );
}
