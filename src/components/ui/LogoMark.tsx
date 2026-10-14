// The Camp Bali spiral, redrawn as a single-colour vector from the original
// 2008 logo (public/images/client): nested circles, each with an off-centre
// hole, read as a spiral of crescents. Inherits colour from `currentColor`.
export const LOGO_MARK_PATH =
  "M0.00 50.00a50 50 0 1 0 100.00 0a50 50 0 1 0 -100.00 0M17.60 49.35a40.09 40.09 0 1 0 80.18 0a40.09 40.09 0 1 0 -80.18 0M19.23 49.35a24.12 24.12 0 1 0 48.24 0a24.12 24.12 0 1 0 -48.24 0M19.95 49.35a13.3 13.3 0 1 0 26.60 0a13.3 13.3 0 1 0 -26.60 0M30.64 48.96a7.69 7.69 0 1 0 15.38 0a7.69 7.69 0 1 0 -15.38 0M32.07 49.09a5.74 5.74 0 1 0 11.48 0a5.74 5.74 0 1 0 -11.48 0M32.46 49.22a3.39 3.39 0 1 0 6.78 0a3.39 3.39 0 1 0 -6.78 0M34.03 49.22a1.43 1.43 0 1 0 2.86 0a1.43 1.43 0 1 0 -2.86 0";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <path fill="currentColor" fillRule="evenodd" d={LOGO_MARK_PATH} />
    </svg>
  );
}
