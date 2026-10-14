import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { BleedImage, Eyebrow } from "./Bleed";

// Concept C hero: copy on deep green at the left, an emerald editorial photo
// bleeding off the right edge, full screen height on desktop.
export function LuxeHero({
  eyebrow,
  titleLead,
  titleAccent,
  tagline,
  primary,
  secondary,
  image,
}: {
  eyebrow: string;
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
        <div className="py-20 sm:py-24 md:pr-12 lg:pr-20">
          <Eyebrow className="motion-safe:animate-fade-up">{eyebrow}</Eyebrow>
          <h1 className="mt-8 font-serif text-5xl font-normal leading-[1.05] sm:text-6xl lg:text-7xl motion-safe:animate-fade-up [animation-delay:100ms]">
            {titleLead}
            <span className="block italic text-accent">{titleAccent}</span>
          </h1>
          <span aria-hidden className="mt-10 block h-px w-16 bg-accent/60 motion-safe:animate-fade-up [animation-delay:200ms]" />
          <p className="mt-8 max-w-sm text-lg font-light leading-relaxed text-muted motion-safe:animate-fade-up [animation-delay:260ms]">
            {tagline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 motion-safe:animate-fade-up [animation-delay:340ms]">
            <Link href={primary.href} className={`${buttonClass()} px-8 py-3.5`}>
              {primary.label}
            </Link>
            <TextLink href={secondary.href}>{secondary.label}</TextLink>
          </div>
        </div>
      </Container>
      <BleedImage src={image.src} alt={image.alt} side="right" position="50% 20%" preload />
    </section>
  );
}
