import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { BleedImage } from "./Bleed";

// Concept C hero: copy on deep green at the left, an emerald editorial photo
// bleeding off the right edge, full screen height on desktop.
export function LuxeHero({
  titleLead,
  titleAccent,
  tagline,
  primary,
  secondary,
  image,
}: {
  titleLead: string;
  titleAccent: string;
  tagline: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  image: { src: string; alt: string };
}) {
  return (
    <section className="relative">
      <Container className="md:grid md:min-h-[calc(100svh-4rem)] md:grid-cols-2 md:items-center">
        <div className="mx-auto max-w-xl py-12 text-center sm:py-20 md:mx-0 md:min-w-0 md:max-w-none md:py-24 md:pr-12 md:text-left lg:pr-20">
          <h1 className="text-balance font-serif text-[clamp(2.125rem,10vw,3.25rem)] font-normal leading-[1.08] sm:text-6xl md:text-[clamp(2.75rem,5.5vw,4.5rem)] lg:text-7xl motion-safe:animate-fade-up">
            {titleLead}
            <span className="block italic text-accent">{titleAccent}</span>
          </h1>
          <span aria-hidden className="mx-auto mt-6 block h-px w-12 bg-accent/60 sm:mt-10 sm:w-16 md:mx-0 motion-safe:animate-fade-up [animation-delay:200ms]" />
          <p className="mx-auto mt-5 max-w-sm text-base font-light leading-relaxed text-muted sm:mt-8 sm:text-lg md:mx-0 motion-safe:animate-fade-up [animation-delay:260ms]">
            {tagline}
          </p>
          <div className="mt-7 flex flex-col items-center gap-2 min-[400px]:flex-row min-[400px]:justify-center min-[400px]:gap-6 sm:mt-10 md:flex-wrap md:justify-start md:gap-x-8 md:gap-y-4 motion-safe:animate-fade-up [animation-delay:340ms]">
            <Link href={primary.href} className={`${buttonClass()} w-full max-w-xs px-8 py-3.5 min-[400px]:w-auto`}>
              {primary.label}
            </Link>
            <TextLink href={secondary.href}>{secondary.label}</TextLink>
          </div>
        </div>
      </Container>
      <BleedImage src={image.src} alt={image.alt} side="right" position="50% 20%" mobileAspect="landscape" preload />
    </section>
  );
}
