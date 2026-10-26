import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Quote = { quote: string; name: string; role: string };

// Home: short customer quotes in serif, three across (stacked on mobile),
// each opened by a large terracotta quotation mark.
export function Testimonials({ title, quotes }: { title: string; quotes: Quote[] }) {
  return (
    <section className="py-16 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <h2 className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
            {title}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-10 sm:mt-16 sm:gap-14 md:grid-cols-3 md:gap-10 lg:gap-16">
          {quotes.map((q, i) => (
            <li key={q.name}>
              <Reveal delay={i * 150}>
                <figure className="flex h-full flex-col">
                  <span aria-hidden className="font-serif text-7xl leading-[0.6] text-accent">
                    “
                  </span>
                  <blockquote className="mt-4 flex-1 font-serif text-2xl leading-snug text-primary">
                    {q.quote}
                  </blockquote>
                  <figcaption className="mt-8 border-t border-border pt-5">
                    <span className="block text-sm font-medium text-foreground">{q.name}</span>
                    <span className="mt-1 block text-sm text-muted">{q.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
