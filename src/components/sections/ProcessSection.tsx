import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Step = { title: string; text: string };

// Thin line icons for the four steps: palm, drop, bottle, hand.
const icons = [
  <path key="palm" d="M12 21v-9m0 0c-1-3-4-4.5-7-4 2-2 5-2 7 0Zm0 0c1-3 4-4.5 7-4-2-2-5-2-7 0Zm0 0c-2-1-5 0-6 3m6-3c2-1 5 0 6 3M12 12c0-3 1-5 3-7" />,
  <path key="drop" d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Zm-2.5 11.5a2.5 2.5 0 0 0 2.5 2.5" />,
  <path key="bottle" d="M10 3h4v3l1.5 2.5V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V8.5L10 6V3Zm-1.5 8h7" />,
  <path key="hand" d="M4 14h3l3.5 2.5a1.5 1.5 0 0 0 2-2.2L10 12.5h4l5-2a1.6 1.6 0 0 1 1 3l-7 4.5H8l-4 1M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
];

// Home: how the products are made, from village to bottle. A wide misty
// grove banner sets the place; four numbered steps with line icons follow.
export function ProcessSection({
  title,
  intro,
  steps,
  image,
}: {
  title: string;
  intro: string;
  steps: Step[];
  image: { src: string; alt: string };
}) {
  return (
    <section className="border-t border-border py-20 sm:py-28 lg:py-36">
      <Container>
        <SectionHeader title={title} intro={intro} />

        <Reveal className="relative mt-12 aspect-[2/1] overflow-hidden rounded-sm sm:mt-16 sm:aspect-[5/2]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1440px) 1312px, 100vw"
            // Zoom towards the bottom: the photo is mostly empty sky.
            className="origin-bottom scale-[1.6] object-cover object-bottom sm:scale-[1.35]"
          />
        </Reveal>

        <ol className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 120} className="border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl italic text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="text-primary/70"
                  >
                    {icons[i % icons.length]}
                  </svg>
                </div>
                <h3 className="mt-5 font-serif text-[1.75rem] font-medium leading-tight text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
