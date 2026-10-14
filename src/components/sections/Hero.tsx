import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { TextLink } from "@/components/ui/TextLink";

type HeroProps = {
  titleLead: string;
  titleAccent: string;
  tagline: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

// Editorial hero: centred typography on a soft, colour-only backdrop.
// Elements fade up in sequence on load (skipped for reduced motion).
// On scroll, each layer drifts at its own speed — lower layers lag more, so the
// content gently spreads apart while fading out. Parallax lives on wrapper
// layers because the fade-up animation already owns the inner transforms.
export function Hero({
  titleLead,
  titleAccent,
  tagline,
  primary,
  secondary,
}: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-24">
      {/* Colour-only backdrop: cream with faint brand glows — palm green from
          the top-left, warm terracotta from the bottom-right — and a lighter
          centre behind the copy. The bottom fades back to the page colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 50% 45% at 50% 45%, color-mix(in oklab, var(--color-surface) 70%, transparent), transparent 70%)",
            "radial-gradient(ellipse 60% 55% at 0% 0%, color-mix(in oklab, var(--color-primary) 13%, transparent), transparent 70%)",
            "radial-gradient(ellipse 60% 55% at 100% 100%, color-mix(in oklab, var(--color-accent) 13%, transparent), transparent 70%)",
            "var(--color-background)",
          ].join(", "),
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container className="relative flex flex-col items-center text-center">
        <ParallaxLayer speed={0.2}>
          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-primary sm:text-7xl xl:text-8xl">
            <span className="block motion-safe:animate-fade-up">{titleLead}</span>
            <span className="block italic text-primary/85 motion-safe:animate-fade-up [animation-delay:120ms]">
              {titleAccent}
            </span>
          </h1>
        </ParallaxLayer>

        <ParallaxLayer speed={0.35} className="flex flex-col items-center">
          <span
            aria-hidden
            className="mt-10 h-px w-16 bg-accent motion-safe:animate-fade-up [animation-delay:260ms]"
          />
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg motion-safe:animate-fade-up [animation-delay:340ms]">
            {tagline}
          </p>
        </ParallaxLayer>

        <ParallaxLayer speed={0.5} fadeOver={0.45}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 motion-safe:animate-fade-up [animation-delay:440ms]">
            <Link href={primary.href} className={`${buttonClass()} px-7 py-3`}>
              {primary.label}
            </Link>
            <TextLink href={secondary.href}>{secondary.label}</TextLink>
          </div>
        </ParallaxLayer>
      </Container>

      {/* Scroll cue: a thin track with a dot gliding down it; fades out quickly. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-8 flex justify-center motion-safe:animate-fade-up [animation-delay:700ms]"
      >
        <ParallaxLayer speed={0} fadeOver={0.15}>
          <span className="relative block h-14 w-1.5">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
            <span className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-scroll-dot" />
          </span>
        </ParallaxLayer>
      </div>
    </section>
  );
}
