import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "./Bleed";

type Step = { title: string; text: string };

const numerals = ["I", "II", "III", "IV", "V", "VI"];

// Concept C process: the misty coconut grove full-bleed under a deep green
// veil, the four steps laid over it, separated by hairlines.
export function LuxeProcess({
  eyebrow,
  title,
  intro,
  steps,
  image,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  steps: Step[];
  image: { src: string; alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="-z-20 object-cover object-bottom" />
      <div className="absolute inset-0 -z-10 bg-background/80" />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 font-serif text-5xl font-normal leading-[1.05] sm:text-6xl">{title}</h2>
          <p className="mt-6 font-light leading-relaxed text-muted">{intro}</p>
        </Reveal>
        <ol className="mt-16 grid gap-10 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-foreground/15">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 120} className="text-center lg:px-8">
                <span className="font-serif text-2xl italic text-accent">{numerals[i]}</span>
                <h3 className="mt-4 font-serif text-2xl font-normal">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs font-light leading-relaxed text-foreground/75">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
