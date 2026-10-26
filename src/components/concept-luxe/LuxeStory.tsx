import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { Eyebrow } from "./Bleed";

// An editorial opening chapter: photography and the founding milestone beside
// the story on desktop; heading, photograph and copy in reading order on mobile.
export function LuxeStory({
  label,
  year,
  milestone,
  highlight,
  story,
  link,
  image,
}: {
  label: string;
  year: string;
  milestone: string;
  highlight: string;
  story: string[];
  link: { href: string; label: string };
  image: { src: string; alt: string };
}) {
  return (
    <section id="our-beginnings" aria-labelledby="beginnings-title" className="scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <Container className="grid gap-8 md:grid-cols-12 md:gap-x-10 md:gap-y-0 lg:gap-x-16">
        <Reveal className="min-w-0 md:col-span-7 md:col-start-6 md:row-start-1 lg:col-span-6 lg:col-start-7">
          <div className="flex items-center gap-5">
            <Eyebrow>{label}</Eyebrow>
            <span aria-hidden className="h-px flex-1 bg-border" />
          </div>
          <h2 id="beginnings-title" className="mt-6 max-w-xl text-balance font-serif text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl">
            {highlight}
          </h2>
        </Reveal>

        <Reveal delay={100} className="min-w-0 md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1">
          <figure>
            <div className="relative aspect-[5/4] overflow-hidden bg-surface md:aspect-[4/5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1440px) 520px, (min-width: 768px) 42vw, 100vw"
                className="object-cover object-right"
              />
              <span aria-hidden className="pointer-events-none absolute inset-3 border border-background/15 sm:inset-4" />
            </div>
            <figcaption className="flex items-center gap-5 border-b border-border py-5 sm:gap-6 sm:py-6">
              <span className="shrink-0 font-serif text-4xl font-normal italic leading-none text-accent sm:text-5xl">{year}</span>
              <span aria-hidden className="h-10 w-px shrink-0 bg-border" />
              <span className="max-w-48 text-[11px] uppercase leading-relaxed tracking-[0.15em] text-muted">{milestone}</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={200} className="min-w-0 md:col-span-7 md:col-start-6 md:row-start-2 md:pt-7 lg:col-span-6 lg:col-start-7">
          <div className="max-w-xl space-y-5 text-base font-light leading-relaxed text-muted sm:space-y-6 lg:text-lg">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-7 border-t border-border pt-5 sm:mt-8 sm:pt-6">
            <TextLink href={link.href}>{link.label}</TextLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
