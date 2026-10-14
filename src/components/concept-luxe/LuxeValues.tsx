import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { Eyebrow } from "./Bleed";

type Pillar = { title: string; text: string };

// Concept C values: the mission as a centred italic statement, then the
// pillars in three columns divided by hairlines.
export function LuxeValues({
  title,
  mission,
  pillars,
  link,
}: {
  title: string;
  mission: string;
  pillars: Pillar[];
  link: { href: string; label: string };
}) {
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>{title}</Eyebrow>
          <p className="mt-8 font-serif text-3xl font-normal italic leading-[1.3] sm:text-4xl">{mission}</p>
        </Reveal>
        <ol className="mt-16 grid border-y border-border sm:mt-24 md:grid-cols-3 md:divide-x md:divide-border">
          {pillars.map((p, i) => (
            <li key={p.title} className="border-b border-border last:border-b-0 md:border-b-0">
              <Reveal delay={i * 150} className="px-4 py-10 text-center md:px-10 md:py-14">
                <h3 className="font-serif text-2xl font-normal">{p.title}</h3>
                <p className="mx-auto mt-4 max-w-xs font-light leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={450} className="mt-12 text-center">
          <TextLink href={link.href}>{link.label}</TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
