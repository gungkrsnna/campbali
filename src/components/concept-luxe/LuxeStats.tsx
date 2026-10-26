import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: string; label: string };

// Deep Green Luxe facts: cream serif values on forest green, with quiet labels.
export function LuxeStats({ stats }: { stats: Stat[] }) {
  return (
    <section id="camp-bali-in-numbers" className="scroll-mt-24 border-y border-border bg-surface/40 text-foreground">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:gap-x-10 sm:py-12 md:grid-cols-4 md:gap-x-8 md:py-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="flex min-w-0 flex-col items-start">
              <dt className="order-2 mt-3 max-w-56 text-sm leading-relaxed text-muted">
                {s.label}
              </dt>
              <dd className="order-1 font-serif text-[clamp(2rem,9vw,3rem)] font-normal leading-none tracking-[-0.02em] tabular-nums sm:text-5xl md:text-[clamp(2rem,4.2vw,4rem)]">
                {s.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
