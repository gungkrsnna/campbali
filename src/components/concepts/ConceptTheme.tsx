"use client";

import { useLayoutEffect } from "react";

/**
 * Switches the whole document to a concept palette by setting
 * <html data-concept> while this component is shown (see globals.css).
 *
 * Why not a CSS :has() check for a marker element: Next.js keeps visited
 * pages mounted but hidden for instant back/forward, so the marker would
 * linger and leak the theme into other pages. Effects, however, are cleaned
 * up when a page is hidden — so the attribute comes off reliably.
 * On a fresh load, `conceptBootScript` (concept-boot.ts, in the root layout's
 * <head>) sets it before first paint.
 */
export function ConceptTheme({ concept }: { concept: string }) {
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.dataset.concept = concept;
    return () => {
      delete html.dataset.concept;
    };
  }, [concept]);

  return null;
}
