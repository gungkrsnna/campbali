import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: string; label: string };

// Concept B: key facts between hairlines on the sand page, a small sun-gold
// dot before each number.
export function SunStats({ stats }: { stats: Stat[] }) {
  return (
    <section>
      <Container>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-10 border-y border-border py-12 sm:py-14 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="flex items-center gap-2 font-serif text-[2rem] font-medium leading-none text-primary sm:text-5xl">
                  <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-sun" />
                  {s.value}
                </span>
                <span className="mt-3 block max-w-[13rem] text-sm leading-snug text-muted">
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
