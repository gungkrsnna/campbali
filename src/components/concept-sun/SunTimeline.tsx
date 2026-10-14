import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Milestone = { year: string; title: string; text: string };

// Concept B: the client's milestone timeline as four soft rounded cards on a
// light terracotta tint, years in large clay serif.
export function SunTimeline({ label, milestones }: { label: string; milestones: Milestone[] }) {
  return (
    <section className="bg-clay/10 py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="font-serif text-[2.5rem] font-normal leading-[1] text-primary sm:text-5xl">{label}</h2>
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {milestones.map((m, i) => (
            <li key={m.year}>
              <Reveal delay={i * 120} className="h-full rounded-[2rem] bg-surface p-7 sm:p-8">
                <p className="font-serif text-4xl font-normal italic leading-none text-clay">{m.year}</p>
                <h3 className="mt-5 font-serif text-2xl font-normal leading-tight text-primary">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
