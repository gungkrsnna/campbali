import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

type Item = { question: string; answer: string };

// Home: common questions. Heading + WhatsApp nudge on the left, a smooth
// accordion on the right.
export function FaqSection({
  title,
  intro,
  items,
  more,
}: {
  title: string;
  intro: string;
  items: Item[];
  more: { href: string; label: string };
}) {
  return (
    <section className="border-t border-border py-16 sm:py-28 lg:py-36">
      <Container className="grid gap-8 sm:gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="min-w-0 md:col-span-5 lg:col-span-4">
          <h2 className="text-balance font-serif text-4xl font-medium leading-[1.1] tracking-tight text-primary sm:text-5xl xl:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted">{intro}</p>
          <a
            href={more.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
          >
            <span className="border-b border-primary/30 pb-0.5 transition-colors group-hover:border-primary">
              {more.label}
            </span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={150} className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <Accordion items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
