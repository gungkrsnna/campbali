import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Milestone = { year: string; title: string; text: string };

// Concept C: the client's milestone timeline — four centred columns divided
// by hairlines, years in gold italic.
export function LuxeTimeline({ label, milestones }: { label: string; milestones: Milestone[] }) {
  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <Reveal className="text-center">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-accent">{label}</h2>
        </Reveal>
        <ol className="mt-12 grid border-y border-border md:grid-cols-4 md:divide-x md:divide-border">
          {milestones.map((m, i) => (
            <li key={m.year} className="border-b border-border last:border-b-0 md:border-b-0">
              <Reveal delay={i * 120} className="px-4 py-10 text-center md:px-6 md:py-12">
                <p className="font-serif text-3xl font-normal italic text-accent sm:text-4xl">{m.year}</p>
                <h3 className="mt-4 font-serif text-xl font-normal sm:text-2xl">{m.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm font-light leading-relaxed text-muted">{m.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
