import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Step = { title: string; text: string };

// Concept B process: four golden "sun" discs joined by a dashed path —
// a journey from village to bottle. Vertical path on mobile.
export function SunProcess({
  title,
  intro,
  steps,
}: {
  title: string;
  intro: string;
  steps: Step[];
}) {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[2.5rem] font-normal leading-[1] text-primary sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 leading-relaxed text-muted">{intro}</p>
        </Reveal>

        <ol className="relative mt-14 grid gap-12 sm:mt-20 md:grid-cols-4 md:gap-8">
          {/* Dashed path behind the discs: vertical on mobile, horizontal from md. */}
          <span
            aria-hidden
            className="absolute bottom-10 left-8 top-10 border-l-2 border-dashed border-clay/40 md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-8 md:border-l-0 md:border-t-2"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i * 150} className="flex gap-6 md:flex-col md:items-center md:text-center">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-sun font-serif text-2xl font-medium text-primary ring-8 ring-background">
                  {i + 1}
                </span>
                <div className="pt-2 md:pt-6">
                  <h3 className="font-serif text-2xl font-medium text-primary">{step.title}</h3>
                  <p className="mt-2 max-w-xs leading-relaxed text-muted">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
