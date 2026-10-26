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
    <section className="py-16 sm:py-32 lg:py-40">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>{title}</Eyebrow>
          <p className="mt-6 text-balance font-serif text-3xl font-normal italic leading-[1.3] sm:mt-8 sm:text-4xl">{mission}</p>
        </Reveal>
        <ol className="mt-10 grid border-y border-border sm:mt-24 md:grid-cols-3 md:divide-x md:divide-border">
          {pillars.map((p, i) => (
            <li key={p.title} className="border-b border-border last:border-b-0 md:border-b-0">
              <Reveal delay={i * 150} className="py-7 text-left sm:px-4 sm:py-10 md:px-10 md:py-14 md:text-center">
                <h3 className="font-serif text-2xl font-normal">{p.title}</h3>
                <p className="mt-3 font-light leading-relaxed text-muted sm:mt-4 md:mx-auto md:max-w-xs">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={450} className="mt-7 text-center sm:mt-12">
          <TextLink href={link.href}>{link.label}</TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
