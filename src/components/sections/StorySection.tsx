import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

// Home: who we are, right after the hero. A single focal point — a very large
// year and the achievement it stands for — beside a short story.
export function StorySection({
  label,
  year,
  highlight,
  story,
  storyLink,
}: {
  label: string;
  year: string;
  highlight: string;
  story: string[];
  storyLink: { href: string; label: string };
}) {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{label}</p>
        </Reveal>

        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12 md:items-end md:gap-8">
          <Reveal className="md:col-span-6 lg:col-span-5">
            <p className="font-serif text-[7rem] font-medium italic leading-[0.85] tracking-tight text-accent sm:text-[9rem] lg:text-[11rem]">
              {year}
            </p>
            <span aria-hidden className="mt-8 block h-px w-16 bg-accent" />
            <h2 className="mt-8 max-w-sm font-serif text-4xl font-medium leading-[1.1] text-primary sm:text-5xl">
              {highlight}
            </h2>
          </Reveal>

          <Reveal delay={150} className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
            <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
              {story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <TextLink href={storyLink.href} className="mt-8">
              {storyLink.label}
            </TextLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
