import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

type Pillar = { title: string; text: string };

const numerals = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];

// Home: our values on the green brand band — centred heading and mission,
// then the pillars side by side, separated by faint vertical hairlines
// (stacked with horizontal hairlines on mobile).
export function ValuesBand({
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
    <section className="bg-primary py-20 text-primary-foreground sm:py-28 lg:py-36">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            {title}
          </h2>
          <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-primary-foreground/40" />
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
            {mission}
          </p>
        </Reveal>

        <ol className="mt-14 grid divide-y divide-primary-foreground/15 border-y border-primary-foreground/15 sm:mt-20 md:grid-cols-3 md:divide-x md:divide-y-0">
          {pillars.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 150} className="py-10 text-center md:px-8 md:py-14 lg:px-12">
                <span className="font-serif text-2xl italic text-primary-foreground/50">
                  {numerals[i]}
                </span>
                <h3 className="mt-4 font-serif text-[1.75rem] font-medium leading-tight sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mx-auto mt-4 max-w-xs leading-relaxed text-primary-foreground/70">
                  {p.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={450} className="mt-12 text-center sm:mt-16">
          <TextLink href={link.href} tone="dark">
            {link.label}
          </TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
