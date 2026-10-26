"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export function NavigationEffects() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPath.current !== pathname) {
      // The page crossfade replaces the delayed hero entrance after navigation.
      document.documentElement.dataset.pageNavigated = "true";
      previousPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
