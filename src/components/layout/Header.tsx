"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { navItems, site } from "@/content/site";
import { localePath } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "@/components/ui/LogoMark";

/** Hides the header while scrolling down and reveals it on scroll up. */
function useHideOnScroll(pathname: string, threshold = 80) {
  const [state, setState] = useState({ pathname, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      // Ignore tiny jitters (e.g. trackpad, iOS bounce).
      if (Math.abs(delta) > 4) {
        setState({ pathname, hidden: delta > 0 && y > threshold });
        lastY = y;
      }
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname, threshold]);

  const routeChanged = state.pathname !== pathname;
  return { hidden: !routeChanged && state.hidden, routeChanged };
}

export function Header({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Dictionary["nav"];
}) {
  const pathname = usePathname();
  const [menu, setMenu] = useState({ pathname, open: false, closedByNavigation: false });
  if (menu.pathname !== pathname) {
    setMenu({ pathname, open: false, closedByNavigation: true });
  }
  const open = menu.pathname === pathname && menu.open;
  const menuNavigated = menu.closedByNavigation || menu.pathname !== pathname;
  const scroll = useHideOnScroll(pathname);
  const hidden = scroll.hidden && !open;

  // While the full-screen menu is open: lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu({ pathname, open: false, closedByNavigation: false });
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenu({ pathname, open: false, closedByNavigation: false });
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open, pathname]);

  const isActive = (href: string) => {
    const full = localePath(locale, href);
    return href === "" ? pathname === full : pathname.startsWith(full);
  };

  // Desktop: an underline grows from the left on hover; the active page keeps it.
  const desktopLinks = navItems.map((item) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.key}
        href={localePath(locale, item.href)}
        aria-current={active ? "page" : undefined}
        className={`group relative py-2 text-sm font-medium transition-colors duration-200 ${
          active ? "text-primary" : "text-foreground/70 hover:text-primary"
        }`}
      >
        {labels[item.key]}
        <span
          aria-hidden
          className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300 ease-out ${
            active
              ? "scale-x-100 bg-primary"
              : "scale-x-0 bg-accent group-hover:scale-x-100"
          }`}
        />
      </Link>
    );
  });

  // Mobile: large serif links that fade up one after another when the menu opens.
  const mobileLinks = navItems.map((item, i) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.key}
        href={localePath(locale, item.href)}
        onNavigate={() => {
          if (pathname === localePath(locale, item.href)) setMenu({ pathname, open: false, closedByNavigation: false });
        }}
        aria-current={active ? "page" : undefined}
        style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
        className={`inline-flex min-h-11 items-center font-serif text-4xl transition-[opacity,translate,color] duration-500 ease-out ${
          open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } ${active ? "text-primary" : "text-foreground/50 hover:text-primary"}`}
      >
        {labels[item.key]}
      </Link>
    );
  });

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`sticky top-0 z-40 border-b bg-background/90 backdrop-blur ${scroll.routeChanged ? "transition-none" : "transition-transform duration-300 ease-out"} ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${open ? "border-transparent" : "border-border"}`}
      >
        <Container className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link
            href={localePath(locale)}
            onNavigate={() => {
              if (pathname === localePath(locale)) setMenu({ pathname, open: false, closedByNavigation: false });
            }}
            className="flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap font-serif text-xl font-semibold text-primary sm:gap-2.5 sm:text-2xl"
          >
            <LogoMark className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
            {site.name}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">{desktopLinks}</nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <LanguageSwitcher locale={locale} label={labels.language} />
            <button
              type="button"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-md lg:hidden"
              aria-label={open ? labels.closeMenu : labels.openMenu}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setMenu({ pathname, open: !open, closedByNavigation: false })}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Rendered outside <header>: its transform would trap a fixed child. */}
      <nav
        id="mobile-navigation"
        aria-label={labels.openMenu}
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col overflow-y-auto overscroll-contain bg-background px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 ${menuNavigated ? "transition-none" : "transition-opacity duration-300"} lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="my-auto flex w-full shrink-0 flex-col items-center gap-4 sm:gap-5">{mobileLinks}</div>
      </nav>
    </>
  );
}
