// Server-safe (no "use client"): called by the root layout.

/** Concept page path segment → theme name. */
export const conceptThemes = { "concept-b": "sun", "concept-c": "luxe", "concept-d": "motion" } as const;

/**
 * Inline <head> script: on a fresh load of a concept page, set the theme
 * before first paint so it doesn't flash the default palette.
 */
export function conceptBootScript(prefixedLocales: readonly string[]) {
  // e.g. ^/(?:(?:id)/)?(concept-[a-z]+)/?$  — built with RegExp to avoid escaping slashes.
  const pattern = `^/(?:(?:${prefixedLocales.join("|")})/)?(concept-[a-z]+)/?$`;
  return `(function(){var m=location.pathname.match(new RegExp(${JSON.stringify(pattern)}));var t=m&&${JSON.stringify(conceptThemes)}[m[1]];if(t)document.documentElement.dataset.concept=t;})();`;
}
