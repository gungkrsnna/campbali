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
    <section className="relative isolate overflow-hidden py-16 sm:py-32 lg:py-40">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="-z-20 object-cover object-bottom" />
      <div className="absolute inset-0 -z-10 bg-background/80" />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-balance font-serif text-4xl font-normal leading-[1.1] sm:mt-6 sm:text-6xl">{title}</h2>
          <p className="mt-6 font-light leading-relaxed text-muted">{intro}</p>
        </Reveal>
        <ol className="mt-10 grid gap-8 sm:mt-24 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-foreground/15">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 120} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 text-left sm:block sm:text-center lg:px-8">
                <span className="row-span-2 font-serif text-2xl italic text-accent">{numerals[i]}</span>
                <h3 className="font-serif text-2xl font-normal sm:mt-4">{step.title}</h3>
                <p className="col-start-2 mt-2 font-light leading-relaxed text-foreground/75 sm:mx-auto sm:mt-3 sm:max-w-xs">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
