import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

type Pillar = { title: string; text: string };

// Concept B values: the one golden band on the page — the mission as a
// statement and the pillars as soft cards.
export function SunValues({
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
    <section className="bg-sun py-20 text-primary sm:py-28 lg:py-36">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/70">{title}</p>
          <p className="mt-6 font-serif text-2xl font-normal leading-[1.25] sm:text-3xl">{mission}</p>
        </Reveal>

        <ol className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-3 md:gap-6">
          {pillars.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 150} className="h-full rounded-[2rem] bg-surface/70 p-7 sm:p-9">
                <span className="font-serif text-4xl font-medium text-clay">0{i + 1}</span>
                <h3 className="mt-5 font-serif text-2xl font-medium leading-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground/75">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={450} className="mt-12">
          <TextLink href={link.href}>{link.label}</TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
