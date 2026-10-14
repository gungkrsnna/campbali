import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { Eyebrow } from "./Bleed";

// Concept C story: centred — a quiet label and year, the achievement as a
// large serif line, the story in two short columns beneath.
export function LuxeStory({
  label,
  year,
  highlight,
  story,
  link,
}: {
  label: string;
  year: string;
  highlight: string;
  story: string[];
  link: { href: string; label: string };
}) {
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>
            {label} · {year}
          </Eyebrow>
          <h2 className="mt-8 font-serif text-4xl font-normal leading-[1.1] sm:text-6xl">{highlight}</h2>
          <span aria-hidden className="mx-auto mt-10 block h-px w-16 bg-accent/60" />
        </Reveal>
        <Reveal delay={150} className="mx-auto mt-12 grid max-w-4xl gap-8 text-lg font-light leading-relaxed text-muted md:grid-cols-2 md:gap-12">
          {story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={250} className="mt-12 text-center">
          <TextLink href={link.href}>{link.label}</TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
