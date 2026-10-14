import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/config";

// The default locale (English) lives at the root, other locales are prefixed:
//   /products       → served from /en/products (rewrite, URL stays clean)
//   /en/products    → 308 redirect to /products (one canonical URL)
//   /id/products    → served as is
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (hasLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, favicon…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
