import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Milestone = { year: string; title: string; text: string };

// Concept A: the client's milestone timeline (brief, Option 2). Desktop: four
// milestones strung along a hairline with terracotta dots. Mobile: vertical,
// hairline on the left.
export function TimelineSection({ label, milestones }: { label: string; milestones: Milestone[] }) {
  return (
    <section className="pb-20 sm:pb-28 lg:pb-36">
      <Container>
        <Reveal>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{label}</h2>
        </Reveal>
        <ol className="relative mt-10 grid gap-10 border-l border-border pl-8 md:grid-cols-4 md:gap-8 md:border-l-0 md:border-t md:pl-0 md:pt-10">
          {milestones.map((m, i) => (
            <li key={m.year} className="relative">
              {/* Dot on the hairline: left edge on mobile, top edge on desktop. */}
              <span
                aria-hidden
                className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background md:-top-[45px] md:left-0"
              />
              <Reveal delay={i * 120}>
                <p className="font-serif text-3xl font-medium italic text-accent sm:text-4xl">{m.year}</p>
                <h3 className="mt-4 font-serif text-2xl font-medium leading-tight text-primary">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
