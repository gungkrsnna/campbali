import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Arch } from "./Arch";

type Img = { src: string; alt: string; position?: string };

// Concept B hero: centred warm headline, then three arched "windows" —
// a taller one in the middle flanked by two lower, smaller ones.
export function SunHero({
  titleLead,
  titleAccent,
  tagline,
  primary,
  secondary,
  images,
}: {
  titleLead: string;
  titleAccent: string;
  tagline: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  /** [left, centre, right] */
  images: [Img, Img, Img];
}) {
  const [left, centre, right] = images;

  return (
    <section className="overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-24 lg:pt-28">
      <Container>
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <h1 className="font-serif text-[2.75rem] font-normal leading-[1] tracking-tight text-primary sm:text-6xl lg:text-7xl motion-safe:animate-fade-up">
            {titleLead}{" "}
            {/* Always breaks after the comma. */}
            <span className="block italic text-clay">{titleAccent}</span>
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted motion-safe:animate-fade-up [animation-delay:150ms]">
            {tagline}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 motion-safe:animate-fade-up [animation-delay:300ms]">
            <Link href={primary.href} className={`${buttonClass()} px-8 py-3.5 text-base`}>
              {primary.label}
            </Link>
            <TextLink href={secondary.href}>{secondary.label}</TextLink>
          </div>
        </div>

        {/* `translate-y` (CSS translate) and the fade-up (transform) don't clash. */}
        <div className="mx-auto mt-14 flex max-w-5xl items-end justify-center gap-3 sm:mt-16 sm:gap-6 lg:max-w-3xl lg:gap-6">
          <div className="w-[27%] translate-y-6 motion-safe:animate-fade-up [animation-delay:450ms] sm:translate-y-10">
            <Arch src={left.src} alt={left.alt} position={left.position} sizes="(min-width: 1024px) 210px, 27vw" />
          </div>
          <div className="w-[38%] motion-safe:animate-fade-up [animation-delay:350ms]">
            <Arch
              src={centre.src}
              alt={centre.alt}
              position={centre.position}
              sizes="(min-width: 1024px) 300px, 38vw"
              preload
              className="border-[6px] border-surface shadow-xl shadow-primary/10 sm:border-[10px]"
            />
          </div>
          <div className="w-[27%] translate-y-6 motion-safe:animate-fade-up [animation-delay:550ms] sm:translate-y-10">
            <Arch src={right.src} alt={right.alt} position={right.position} sizes="(min-width: 1024px) 210px, 27vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}
