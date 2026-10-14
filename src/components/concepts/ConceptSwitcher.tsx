import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/paths";

const concepts = [
  { id: "a", name: "Editorial", path: "" },
  { id: "b", name: "Sun & Earth", path: "/concept-b" },
  { id: "c", name: "Green Luxe", path: "/concept-c" },
  { id: "d", name: "Motion", path: "/concept-d" },
] as const;

// Temporary: a pill pinned bottom-centre (bottom-left on phones, clear of the
// content and of the floating list button) to flip between the home page
// concepts while they are being compared. Remove once one is chosen.
export function ConceptSwitcher({ locale, active }: { locale: Locale; active: (typeof concepts)[number]["id"] }) {
  return (
    <nav
      aria-label="Design concept"
      className="fixed bottom-4 left-4 z-30 flex gap-0.5 rounded-full border border-border bg-surface/90 p-1 text-xs font-medium shadow-lg shadow-black/5 backdrop-blur sm:bottom-8 sm:left-1/2 sm:-translate-x-1/2 sm:gap-1"
    >
      {concepts.map((c) => (
        <Link
          key={c.id}
          href={localePath(locale, c.path)}
          aria-current={c.id === active ? "page" : undefined}
          title={c.name}
          className={`whitespace-nowrap rounded-full px-2.5 py-1.5 transition-colors sm:px-3.5 sm:py-2 ${
            c.id === active ? "bg-primary text-primary-foreground" : "text-muted hover:text-primary"
          }`}
        >
          {/* Phones: just the letter, so all concepts fit on one line. */}
          {c.id.toUpperCase()}
          <span className="hidden sm:inline"> · {c.name}</span>
        </Link>
      ))}
    </nav>
  );
}
