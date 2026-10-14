import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: string; label: string };

// Home: a quiet row of key facts right under the hero — a first, scannable
// anchor of credibility before the story. 2×2 on mobile, one row from md.
export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section>
      <Container>
        <dl className="grid grid-cols-2 gap-y-10 border-y border-border py-10 sm:py-12 md:grid-cols-4 md:divide-x md:divide-border">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="px-2 text-center md:px-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-4xl font-medium italic leading-none text-primary sm:text-6xl">
                  {s.value}
                </span>
                <span className="mx-auto mt-4 block max-w-[12rem] text-sm leading-snug text-muted">
                  {s.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
