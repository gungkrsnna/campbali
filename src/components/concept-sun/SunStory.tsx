import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

// Concept B story: the year sits inside a golden sun disc beside the text.
export function SunStory({
  label,
  year,
  highlight,
  story,
  link,
}: {
  label: string;
  year: string;
  highlight: string;
  story: string[];
  link: { href: string; label: string };
}) {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <Container className="grid items-center gap-14 md:grid-cols-12 md:gap-8">
        <Reveal className="mx-auto w-full max-w-xs md:col-span-5 md:max-w-sm">
          <div className="relative grid aspect-square place-items-center rounded-full bg-sun">
            {/* Thin concentric ring, like the logo's outer crescent. */}
            <span aria-hidden className="absolute inset-4 rounded-full border border-primary/25" />
            <p className="font-serif text-7xl font-medium leading-none text-primary sm:text-8xl">
              {year}
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} className="md:col-span-6 md:col-start-7">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-clay">{label}</p>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-[1.1] text-primary sm:text-4xl">
            {highlight}
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
            {story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <TextLink href={link.href} className="mt-8">
            {link.label}
          </TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
