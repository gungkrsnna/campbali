import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: string; label: string };

// Concept C: key facts between hairlines — gold serif numbers, small caps labels.
export function LuxeStats({ stats }: { stats: Stat[] }) {
  return (
    <section>
      <Container>
        <dl className="grid grid-cols-2 gap-y-10 border-y border-border py-12 sm:py-14 md:grid-cols-4 md:divide-x md:divide-border">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="px-2 text-center md:px-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-[2rem] font-normal italic leading-none text-accent sm:text-5xl">
                  {s.value}
                </span>
                <span className="mx-auto mt-4 block max-w-[12rem] text-[11px] uppercase leading-relaxed tracking-[0.2em] text-muted">
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
